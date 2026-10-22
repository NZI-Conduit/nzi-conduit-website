-- =====================================================================
-- NZI Conduit — Intake Bot Database Schema
-- Rev 1 · PostgreSQL 14+ · Feeds n8n workflows (S1–S12) and the dashboard
--
-- Apply:   psql -d nzi -f nzi-schema.sql
-- Re-runnable: drops and recreates the nzi schema. DO NOT re-run on a
--              database holding real data — it deletes everything in it.
-- =====================================================================

BEGIN;

DROP SCHEMA IF EXISTS nzi CASCADE;
CREATE SCHEMA nzi;
SET search_path = nzi;

-- ---------------------------------------------------------------------
-- Shared trigger: keep updated_at current
-- ---------------------------------------------------------------------
CREATE FUNCTION touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END $$;

-- ---------------------------------------------------------------------
-- contacts — every person who reaches out (email, call, form)
-- ---------------------------------------------------------------------
CREATE TABLE contacts (
  id               bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name             text,
  email            text,
  phone            text,                 -- E.164, e.g. +12065550123
  business_name    text,
  location         text,
  source           text CHECK (source IN ('email','call','form','referral','search','social','other')),
  status           text NOT NULL DEFAULT 'new' CHECK (status IN (
                     'new',             -- first contact, nothing sent yet
                     'intake_sent',     -- S3 sent the form; S6 clock running
                     'intake_complete', -- S7 received the form
                     'escalated',       -- S4 waiting on DJ
                     'qualified',      -- DJ reviewed; call booked/scoping
                     'client',          -- has an active project
                     'cold',            -- S6 ran out of nudges
                     'closed',          -- not a fit / declined / done
                     'do_not_contact'   -- asked to stop; never message again
                   )),
  intake_sent_at   timestamptz,
  followups_sent   smallint NOT NULL DEFAULT 0 CHECK (followups_sent BETWEEN 0 AND 3),
  last_followup_at timestamptz,
  email_opt_out_at timestamptz,          -- unsubscribed from email nudges
  sms_opt_out_at   timestamptz,          -- replied STOP
  notes            text,                 -- DJ's private notes; never sent to LLM replies
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contact_reachable CHECK (email IS NOT NULL OR phone IS NOT NULL),
  CONSTRAINT email_shape CHECK (email IS NULL OR email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT phone_shape CHECK (phone IS NULL OR phone ~ '^\+[1-9][0-9]{6,14}$')
);
CREATE UNIQUE INDEX contacts_email_uq ON contacts (lower(email)) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX contacts_phone_uq ON contacts (phone)        WHERE phone IS NOT NULL;
CREATE INDEX contacts_status_idx ON contacts (status);
CREATE TRIGGER contacts_touch BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ---------------------------------------------------------------------
-- interactions — every inbound/outbound message and bot decision (S12)
-- ---------------------------------------------------------------------
CREATE TABLE interactions (
  id                bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contact_id        bigint NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  channel           text NOT NULL CHECK (channel IN ('email','sms','call','voicemail','form','system')),
  direction         text NOT NULL CHECK (direction IN ('inbound','outbound')),
  skill             text NOT NULL CHECK (skill IN ('S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','manual')),
  thread_id         text,                -- email thread / conversation key
  message_id        text,                -- provider Message-ID; dedupes webhook retries
  subject           text,
  body              text,                -- inbound text, or the outbound message sent
  category          text CHECK (category IN ('web','seo','video','general','existing_client','spam')),
  decision          text CHECK (decision IN ('ANSWER','ESCALATE','TEMPLATE','DROP')),
  escalation_reason text,
  hot_flags         text[] NOT NULL DEFAULT '{}',   -- bundle_interest, time_sensitive, recurring, intake_submitted
  kb_sections_used  text[] NOT NULL DEFAULT '{}',
  is_bot_reply      boolean NOT NULL DEFAULT false, -- counts toward the 2-reply cap
  sender_auth_pass  boolean,             -- SPF/DKIM/DMARC result (inbound email; required for S9)
  llm_model         text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT hot_flags_valid CHECK (hot_flags <@ ARRAY['bundle_interest','time_sensitive','recurring','intake_submitted']::text[])
);
CREATE UNIQUE INDEX interactions_message_uq ON interactions (message_id) WHERE message_id IS NOT NULL;
CREATE INDEX interactions_contact_idx ON interactions (contact_id, created_at DESC);
CREATE INDEX interactions_thread_idx  ON interactions (thread_id) WHERE thread_id IS NOT NULL;
CREATE INDEX interactions_created_idx ON interactions (created_at);

-- ---------------------------------------------------------------------
-- escalations — S4 queue; open until DJ resolves
-- ---------------------------------------------------------------------
CREATE TABLE escalations (
  id             bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contact_id     bigint NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  interaction_id bigint REFERENCES interactions(id) ON DELETE SET NULL,
  reason         text NOT NULL,
  status         text NOT NULL DEFAULT 'open' CHECK (status IN ('open','resolved')),
  resolution     text,
  created_at     timestamptz NOT NULL DEFAULT now(),
  resolved_at    timestamptz,
  CONSTRAINT resolved_has_time CHECK ((status = 'resolved') = (resolved_at IS NOT NULL))
);
CREATE INDEX escalations_open_idx ON escalations (created_at) WHERE status = 'open';

-- ---------------------------------------------------------------------
-- intakes — S7 form submissions
-- ---------------------------------------------------------------------
CREATE TABLE intakes (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contact_id   bigint NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  form_version text NOT NULL,
  services     text[] NOT NULL CHECK (cardinality(services) > 0
                 AND services <@ ARRAY['web','seo','video','unsure']::text[]),
  budget_fit   text NOT NULL CHECK (budget_fit IN ('fits','stretch','not_now')),
  timeline     text NOT NULL CHECK (timeline IN ('asap','month','quarter','flexible')),
  answers      jsonb NOT NULL,           -- full validated payload (minus turnstile token)
  flags        text[] NOT NULL DEFAULT '{}',  -- derived: bundle_interest, time_sensitive, recurring, budget_mismatch
  red_flags    text[] NOT NULL DEFAULT '{}',  -- scope notes from the spec's red-flag table
  brief_draft  text,                     -- LLM-drafted brief for DJ; never sent to client
  reviewed_at  timestamptz,              -- DJ has read it
  submitted_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX intakes_contact_idx ON intakes (contact_id);
CREATE INDEX intakes_unreviewed_idx ON intakes (submitted_at) WHERE reviewed_at IS NULL;

-- ---------------------------------------------------------------------
-- contractors — who can post S10 status updates (via n8n form only)
-- ---------------------------------------------------------------------
CREATE TABLE contractors (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text NOT NULL,
  email      text NOT NULL,
  token_hash text NOT NULL,              -- sha256 of the contractor's form token; never store the raw token
  active     boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX contractors_email_uq ON contractors (lower(email));

-- ---------------------------------------------------------------------
-- projects — signed work; S9 reads, S10 updates
-- ---------------------------------------------------------------------
CREATE TABLE projects (
  id              bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contact_id      bigint NOT NULL REFERENCES contacts(id) ON DELETE RESTRICT,
  intake_id       bigint REFERENCES intakes(id) ON DELETE SET NULL,
  reference       text NOT NULL UNIQUE,  -- client-facing ID, e.g. NZI-2026-014 (S9 matches on this)
  package         text NOT NULL CHECK (package IN ('launch_site','local_seo','reel_batch','growth_partner','custom')),
  kind            text NOT NULL CHECK (kind IN ('one_time','retainer')),  -- separate capacity pools
  assigned_to     bigint REFERENCES contractors(id) ON DELETE SET NULL,
  status          text NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','blocked','complete','cancelled')),
  phase           text NOT NULL DEFAULT 'kickoff',
  percent         smallint NOT NULL DEFAULT 0 CHECK (percent BETWEEN 0 AND 100),
  next_milestone  text,
  last_update_at  timestamptz,
  started_at      timestamptz NOT NULL DEFAULT now(),
  due_at          timestamptz,
  completed_at    timestamptz,
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX projects_contact_idx ON projects (contact_id);
CREATE INDEX projects_active_idx  ON projects (status) WHERE status IN ('active','paused','blocked');
CREATE TRIGGER projects_touch BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ---------------------------------------------------------------------
-- status_updates — S10 contractor posts; append-only
-- ---------------------------------------------------------------------
CREATE TABLE status_updates (
  id             bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id     bigint NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  contractor_id  bigint REFERENCES contractors(id) ON DELETE SET NULL,  -- NULL = DJ
  phase          text NOT NULL,
  percent        smallint NOT NULL CHECK (percent BETWEEN 0 AND 100),
  blocked        boolean NOT NULL DEFAULT false,
  next_milestone text,
  note           text CHECK (length(note) <= 2000),
  created_at     timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX status_updates_project_idx ON status_updates (project_id, created_at DESC);

-- Enforce: a contractor can only update projects assigned to them, and only while active.
-- Then roll the update up onto the project row.
CREATE FUNCTION apply_status_update() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE p projects%ROWTYPE;
BEGIN
  SELECT * INTO p FROM projects WHERE id = NEW.project_id FOR UPDATE;
  IF NEW.contractor_id IS NOT NULL THEN
    IF p.assigned_to IS DISTINCT FROM NEW.contractor_id THEN
      RAISE EXCEPTION 'contractor % is not assigned to project %', NEW.contractor_id, NEW.project_id;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM contractors WHERE id = NEW.contractor_id AND active) THEN
      RAISE EXCEPTION 'contractor % is inactive', NEW.contractor_id;
    END IF;
  END IF;
  IF p.status IN ('complete','cancelled') THEN
    RAISE EXCEPTION 'project % is closed (%)', NEW.project_id, p.status;
  END IF;

  UPDATE projects SET
    phase          = NEW.phase,
    percent        = NEW.percent,
    next_milestone = COALESCE(NEW.next_milestone, next_milestone),
    status         = CASE WHEN NEW.blocked THEN 'blocked'
                          WHEN status = 'blocked' THEN 'active'
                          ELSE status END,
    last_update_at = NEW.created_at
  WHERE id = NEW.project_id;
  RETURN NEW;
END $$;
CREATE TRIGGER status_updates_apply AFTER INSERT ON status_updates
  FOR EACH ROW EXECUTE FUNCTION apply_status_update();

-- ---------------------------------------------------------------------
-- notifications — audit of [HOT]/[ESC]/[DIGEST] emails to DJ
-- ---------------------------------------------------------------------
CREATE TABLE notifications (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kind       text NOT NULL CHECK (kind IN ('HOT','ESC','DIGEST','BLOCKED')),
  contact_id bigint REFERENCES contacts(id) ON DELETE SET NULL,
  subject    text NOT NULL,
  sent_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX notifications_sent_idx ON notifications (sent_at);

-- =====================================================================
-- Workflow helpers (called from n8n)
-- =====================================================================

-- S1 guardrail: bot replies already sent in a thread (cap = 2)
CREATE FUNCTION bot_replies_in_thread(p_thread text) RETURNS int
LANGUAGE sql STABLE AS $$
  SELECT count(*)::int FROM interactions
  WHERE thread_id = p_thread AND direction = 'outbound' AND is_bot_reply;
$$;

-- S1 routing tag: new / prospect / client
CREATE FUNCTION contact_tag(p_email text) RETURNS text
LANGUAGE sql STABLE AS $$
  SELECT CASE
    WHEN c.id IS NULL THEN 'new'
    WHEN EXISTS (SELECT 1 FROM projects p WHERE p.contact_id = c.id
                 AND p.status IN ('active','paused','blocked')) THEN 'client'
    ELSE 'prospect' END
  FROM (SELECT NULL) d
  LEFT JOIN contacts c ON lower(c.email) = lower(p_email);
$$;

-- S8 guardrail: may we text this number? (not opted out, none sent in last 7 days)
CREATE FUNCTION can_text(p_phone text) RETURNS boolean
LANGUAGE sql STABLE AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM contacts c
    WHERE c.phone = p_phone AND (c.sms_opt_out_at IS NOT NULL OR c.status = 'do_not_contact')
  ) AND NOT EXISTS (
    SELECT 1 FROM interactions i JOIN contacts c ON c.id = i.contact_id
    WHERE c.phone = p_phone AND i.channel = 'sms' AND i.direction = 'outbound'
      AND i.created_at > now() - interval '7 days'
  );
$$;

-- =====================================================================
-- Views — workflow selectors
-- =====================================================================

-- S6: who gets a nudge today, and which one (days 2 / 5 / 10)
CREATE VIEW v_followup_due AS
SELECT c.id AS contact_id, c.name, c.email, c.followups_sent + 1 AS nudge_number,
       CASE c.followups_sent WHEN 0 THEN 'reminder' WHEN 1 THEN 'still_interested' ELSE 'last_call' END AS template
FROM contacts c
WHERE c.status = 'intake_sent'
  AND c.email IS NOT NULL
  AND c.email_opt_out_at IS NULL
  AND c.followups_sent < 3
  AND now() >= c.intake_sent_at + (CASE c.followups_sent WHEN 0 THEN 2 WHEN 1 THEN 5 ELSE 10 END) * interval '1 day'
  -- stop if they replied after the form went out
  AND NOT EXISTS (SELECT 1 FROM interactions i
                  WHERE i.contact_id = c.id AND i.direction = 'inbound'
                    AND i.created_at > c.intake_sent_at);

-- S6: contacts to mark cold (3 nudges sent, 1+ day since the last)
CREATE VIEW v_going_cold AS
SELECT id AS contact_id FROM contacts
WHERE status = 'intake_sent' AND followups_sent >= 3
  AND last_followup_at < now() - interval '1 day';

-- S9: what the bot may tell a verified client — nothing else
CREATE VIEW v_client_status AS
SELECT c.email, p.reference, p.package, p.phase, p.percent, p.next_milestone,
       p.last_update_at, p.status,
       (p.last_update_at IS NULL OR p.last_update_at < now() - interval '7 days') AS stale
FROM projects p JOIN contacts c ON c.id = p.contact_id
WHERE p.status IN ('active','paused','blocked');

-- =====================================================================
-- Views — dashboard and S11 digest
-- =====================================================================

CREATE VIEW v_pipeline AS
SELECT status, count(*) AS contacts FROM contacts GROUP BY status;

CREATE VIEW v_inquiries_weekly AS
SELECT date_trunc('week', created_at)::date AS week, count(*) AS new_contacts,
       count(*) FILTER (WHERE source = 'call')  AS via_call,
       count(*) FILTER (WHERE source = 'email') AS via_email,
       count(*) FILTER (WHERE source = 'form')  AS via_form
FROM contacts GROUP BY 1 ORDER BY 1 DESC;

CREATE VIEW v_open_escalations AS
SELECT e.id, e.created_at, now() - e.created_at AS age, c.name, c.email, e.reason
FROM escalations e JOIN contacts c ON c.id = e.contact_id
WHERE e.status = 'open' ORDER BY e.created_at;

-- intake_sent -> intake_complete conversion, by week the form went out
CREATE VIEW v_intake_conversion AS
SELECT date_trunc('week', c.intake_sent_at)::date AS week,
       count(*) AS forms_sent,
       count(i.contact_id) AS forms_completed,
       round(100.0 * count(i.contact_id) / NULLIF(count(*),0), 1) AS pct
FROM contacts c
LEFT JOIN (SELECT DISTINCT contact_id FROM intakes) i ON i.contact_id = c.id
WHERE c.intake_sent_at IS NOT NULL
GROUP BY 1 ORDER BY 1 DESC;

CREATE VIEW v_by_service AS
SELECT s AS service, count(*) AS intakes,
       count(*) FILTER (WHERE budget_fit = 'fits')    AS budget_fits,
       count(*) FILTER (WHERE budget_fit = 'stretch') AS budget_stretch,
       count(*) FILTER (WHERE budget_fit = 'not_now') AS budget_no
FROM intakes, unnest(services) s GROUP BY s;

-- time from a contact's first inbound message to the first outbound reply
CREATE VIEW v_response_times AS
WITH firsts AS (
  SELECT contact_id,
         min(created_at) FILTER (WHERE direction = 'inbound')  AS first_in,
         min(created_at) FILTER (WHERE direction = 'outbound') AS first_out
  FROM interactions GROUP BY contact_id
)
SELECT contact_id, first_in, first_out, first_out - first_in AS response_time
FROM firsts WHERE first_in IS NOT NULL AND first_out >= first_in;

-- capacity: one-time builds and retainers tracked as separate pools
CREATE VIEW v_capacity AS
SELECT kind, count(*) AS active_projects
FROM projects WHERE status IN ('active','paused','blocked') GROUP BY kind;

CREATE VIEW v_stale_projects AS
SELECT p.reference, p.package, p.phase, p.status, ct.name AS contractor,
       COALESCE(p.last_update_at, p.started_at) AS last_activity
FROM projects p LEFT JOIN contractors ct ON ct.id = p.assigned_to
WHERE p.status IN ('active','paused','blocked')
  AND COALESCE(p.last_update_at, p.started_at) < now() - interval '3 days';

-- S11 digest: everything from the last 24 hours that DJ should see
CREATE VIEW v_digest_24h AS
SELECT 'intake' AS item, i.submitted_at AS at, c.name, c.email,
       array_to_string(i.services, ', ') AS detail, i.brief_draft AS extra
FROM intakes i JOIN contacts c ON c.id = i.contact_id
WHERE i.submitted_at > now() - interval '24 hours'
UNION ALL
SELECT 'new_contact', c.created_at, c.name, c.email, c.source, NULL
FROM contacts c WHERE c.created_at > now() - interval '24 hours'
UNION ALL
SELECT 'missed_call', x.created_at, c.name, c.phone, x.channel, x.body
FROM interactions x JOIN contacts c ON c.id = x.contact_id
WHERE x.channel IN ('call','voicemail') AND x.direction = 'inbound'
  AND x.created_at > now() - interval '24 hours'
UNION ALL
SELECT 'followup_sent', x.created_at, c.name, c.email, x.subject, NULL
FROM interactions x JOIN contacts c ON c.id = x.contact_id
WHERE x.skill = 'S6' AND x.created_at > now() - interval '24 hours'
ORDER BY at;

-- =====================================================================
-- Roles — least privilege
--   nzi_n8n        : the workflow engine (read/write data, no DDL)
--   nzi_dashboard  : Metabase/Grafana (read-only, views only)
-- Contractors get NO database role. S10 goes through n8n.
-- Set passwords after applying:  ALTER ROLE nzi_n8n PASSWORD '...';
-- =====================================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'nzi_n8n') THEN
    CREATE ROLE nzi_n8n LOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'nzi_dashboard') THEN
    CREATE ROLE nzi_dashboard LOGIN;
  END IF;
END $$;

GRANT USAGE ON SCHEMA nzi TO nzi_n8n, nzi_dashboard;

GRANT SELECT, INSERT, UPDATE ON contacts, interactions, escalations, intakes,
                                projects, notifications TO nzi_n8n;
GRANT SELECT, INSERT ON status_updates TO nzi_n8n;          -- append-only
GRANT SELECT ON contractors TO nzi_n8n;                    -- token check only
GRANT SELECT ON ALL TABLES IN SCHEMA nzi TO nzi_n8n;       -- views
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA nzi TO nzi_n8n;
-- n8n never deletes. Deletion (e.g., a client's data-removal request) is a manual DJ action.

GRANT SELECT ON v_pipeline, v_inquiries_weekly, v_open_escalations, v_intake_conversion,
                v_by_service, v_response_times, v_capacity, v_stale_projects
             TO nzi_dashboard;

COMMIT;
