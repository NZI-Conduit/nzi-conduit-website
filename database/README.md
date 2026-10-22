# NZI Conduit database schema

`nzi-schema.sql` is the PostgreSQL schema used by the planned n8n intake and operations workflows.

## Apply the schema

Run this against a disposable or newly created PostgreSQL 14+ database:

```bash
psql -d nzi -f database/nzi-schema.sql
```

The script drops and recreates the `nzi` schema. **Do not run it against a database containing real data.** Use a migration-based workflow for production changes.

After applying it, set passwords for the roles created by the script:

```sql
ALTER ROLE nzi_n8n PASSWORD 'replace-with-a-private-password';
ALTER ROLE nzi_dashboard PASSWORD 'replace-with-a-private-password';
```

Do not commit passwords, connection strings, or other credentials to this repository.

## Current integration status

The frontend is not connected directly to PostgreSQL. `src/components/IntakeForm.jsx` posts submissions to the external n8n webhook configured with `VITE_INTAKE_WEBHOOK_URL`.

The n8n workflows are not included in this repository yet. When the client supplies the workflows, S7 should validate the incoming payload, verify Turnstile server-side, create or update the contact, and write the intake without persisting the Turnstile token.

## Main schema areas

- `contacts`, `interactions`, `escalations`, and `intakes`: inquiry and intake pipeline
- `contractors`, `projects`, and `status_updates`: delivery and project tracking
- `notifications`: audit log for owner alerts
- `v_*` views: n8n selectors and dashboard reporting
