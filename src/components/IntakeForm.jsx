import { useEffect, useMemo, useRef, useState } from "react";
import { SERVICE_PACKAGES } from "../data/servicePackages";
import { COMPANY_DETAILS } from "../lib/constants";

/**
 * NZI Conduit intake form (spec rev 1). Drop-down disclosure -> shared contact
 * section -> service branches -> shared close -> POST to n8n webhook.
 *
 * ENV (Vite):
 *   VITE_INTAKE_WEBHOOK_URL   public Cloudflare Tunnel URL of the n8n webhook path (set later)
 *   VITE_TURNSTILE_SITE_KEY   Cloudflare Turnstile *site* key (public by design)
 * Never put secrets in this file: everything here ships to the browser.
 * Client validation is UX only. n8n must re-validate everything.
 */

const webPackage = SERVICE_PACKAGES.find((pkg) => pkg.id === "pkg-01" || pkg.category === "webdev");
const seoPackage = SERVICE_PACKAGES.find((pkg) => pkg.id === "pkg-02" || pkg.category === "seo");
const videoPackage = SERVICE_PACKAGES.find((pkg) => pkg.id === "pkg-03" || pkg.category === "video");

const PRICE = {
  web: {
    name: webPackage?.name || "Launch Site",
    range: webPackage?.priceFormatted || "$3,500–$5,500",
  },
  seo: {
    name: seoPackage?.name || "Local Visibility SEO",
    range: seoPackage?.priceFormatted || "$900–$1,400/mo",
  },
  video: {
    name: videoPackage?.name || "Reel Batch",
    range: videoPackage?.priceFormatted || "$1,400–$2,200/mo",
  },
};

const SERVICES = [["web", "Website"], ["seo", "Local SEO"], ["video", "Short-form video"], ["unsure", "Not sure yet"]];

const BRANCHES = {
  web: { title: "Website", q: [
    { key: "type", label: "Is this a new site or a replacement?", opts: [["new", "New"], ["redesign", "Redesign of existing"], ["unsure", "Not sure"]] },
    { key: "pages", label: "Roughly how many pages?", opts: [["1-5", "1–5"], ["6-10", "6–10"], ["10+", "10+"], ["unsure", "Not sure"]] },
    { key: "content", label: "Is your text content ready?", opts: [["ready", "Ready"], ["partly", "Partly"], ["need_copy", "Need copywriting"]] },
    { key: "features", label: "Any of these needed?", multi: true, opts: [["booking", "Online booking"], ["ecommerce", "Selling products"], ["member_login", "Member login"], ["none", "None"]] },
  ] },
  seo: { title: "Local SEO", q: [
    { key: "locations", label: "How many physical locations?", opts: [["1", "1"], ["2-3", "2–3"], ["4+", "4+"], ["online_only", "Online only"]] },
    { key: "targets", label: "What services or products do you most want to be found for?", text: true },
    { key: "gbp", label: "Do you have a Google Business Profile?", opts: [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]] },
    { key: "history", label: "Have you done SEO before?", opts: [["none", "No"], ["diy", "Yes, DIY"], ["agency", "Yes, with an agency"]] },
  ] },
  video: { title: "Short-form video", q: [
    { key: "platforms", label: "Where will the videos be posted?", multi: true, opts: [["instagram", "Instagram"], ["tiktok", "TikTok"], ["youtube_shorts", "YouTube Shorts"], ["facebook", "Facebook"], ["linkedin", "LinkedIn"], ["other", "Other"]] },
    { key: "footage", label: "Do you have your own footage?", opts: [["plenty", "Yes, plenty"], ["some", "Some"], ["none", "No (use AI b-roll)"]] },
    { key: "goal", label: "What should the videos accomplish?", opts: [["awareness", "Brand awareness"], ["offers", "Promote offers"], ["educate", "Educate customers"], ["recruit", "Recruit"], ["other", "Other"]] },
    { key: "reference", label: "Link to a video style you like (optional)", text: true, url: true },
  ] },
};

const BUDGET = [["fits", "Fits"], ["stretch", "A stretch"], ["not_now", "Not right now"]];
const TIMELINE = [["asap", "ASAP (under 2 weeks)"], ["month", "Within a month"], ["quarter", "1–3 months"], ["flexible", "Flexible"]];
const SOURCE = [["search", "Search"], ["social", "Social"], ["referral", "Referral"], ["other", "Other"]];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isUrl = (v) => { try { const u = new URL(v); return u.protocol === "http:" || u.protocol === "https:"; } catch { return false; } };

const input = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600";

function Field({ label, error, children, id }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800">{label}</label>
      {children}
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    </div>
  );
}

function Choice({ legend, opts, value, onChange, multi, error, name }) {
  const has = (v) => (multi ? value.includes(v) : value === v);
  const toggle = (v) => {
    if (!multi) return onChange(v);
    let next = has(v) ? value.filter((x) => x !== v) : [...value, v];
    if (v === "none" && !has(v)) next = ["none"]; // "None" is exclusive
    if (v !== "none") next = next.filter((x) => x !== "none");
    onChange(next);
  };
  return (
    <fieldset className="space-y-2" aria-invalid={!!error} data-invalid={!!error}>
      <legend className="text-sm font-semibold text-slate-800">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {opts.map(([v, l]) => (
          <label key={v} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors ${has(v) ? "border-blue-600 bg-blue-50 text-blue-800" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}>
            <input type={multi ? "checkbox" : "radio"} name={name} className="sr-only" checked={has(v)} onChange={() => toggle(v)} />
            {l}
          </label>
        ))}
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    </fieldset>
  );
}

const loadTurnstile = () => new Promise((resolve) => {
  if (window.turnstile) return resolve();
  const s = document.createElement("script");
  s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  s.async = true; s.defer = true; s.onload = () => resolve();
  document.head.appendChild(s);
});

const EMPTY = { name: "", email: "", business_name: "", current_url: "", location: "", services: [], goal: "", budget_fit: "", timeline: "", notes: "", source: "", consent: false, hp: "", web: {}, seo: {}, video: {} };

export default function IntakeForm({ defaultOpen = false, presetService }) {
  const [open, setOpen] = useState(defaultOpen);
  const [d, setD] = useState({ ...EMPTY, services: presetService ? [presetService] : [] });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [token, setToken] = useState("");
  const formRef = useRef(null);
  const tsRef = useRef(null);
  const widgetId = useRef(null);

  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const setBranch = (b, k, v) => setD((p) => ({ ...p, [b]: { ...p[b], [k]: v } }));

  // Services: "Not sure yet" is exclusive.
  const setServices = (next) => {
    const had = d.services.includes("unsure");
    if (next.includes("unsure") && !had) next = ["unsure"];
    else next = next.filter((s) => s !== "unsure");
    set("services", next);
  };

  const selected = d.services.filter((s) => s !== "unsure");
  const multiService = selected.length > 1;
  const unsure = d.services.includes("unsure");

  // Turnstile loads only when the form is opened (keeps third-party JS off the initial page load).
  useEffect(() => {
    const key = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (!open || !key || status === "success") return;
    let cancelled = false;
    loadTurnstile().then(() => {
      if (cancelled || !tsRef.current || widgetId.current != null) return;
      widgetId.current = window.turnstile.render(tsRef.current, {
        sitekey: key, callback: setToken, "expired-callback": () => setToken(""), "error-callback": () => setToken(""),
      });
    });
    return () => { cancelled = true; if (widgetId.current != null && window.turnstile) { window.turnstile.remove(widgetId.current); widgetId.current = null; } };
  }, [open, status]);

  const budgetText = useMemo(() => {
    if (!selected.length) return null;
    const parts = selected.map((s) => `${PRICE[s].name} typically runs ${PRICE[s].range}`);
    return `${parts.join("; ")}. Does that fit your budget?`;
  }, [selected.join(",")]);

  const validate = () => {
    const e = {};
    if (!d.name.trim()) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(d.email.trim())) e.email = "Please enter a valid email address.";
    if (!d.business_name.trim()) e.business_name = "Please enter your business name.";
    if (d.current_url.trim() && !isUrl(d.current_url.trim())) e.current_url = "Enter a full link starting with https://";
    if (!d.location.trim()) e.location = "Please enter your city and country.";
    if (!d.services.length) e.services = "Choose at least one option.";
    if (!d.budget_fit) e.budget_fit = "Please choose one.";
    if (!d.timeline) e.timeline = "Please choose one.";
    if (!d.consent) e.consent = "We need your OK to contact you about this request.";
    if (d.video.reference?.trim() && !isUrl(d.video.reference.trim())) e.video_reference = "Enter a full link starting with https://";
    if (import.meta.env.VITE_TURNSTILE_SITE_KEY && !token) e.turnstile = "Please complete the verification.";
    return e;
  };

  const buildPayload = () => {
    const p = {
      form_version: "1", submitted_at: new Date().toISOString(),
      name: d.name.trim(), email: d.email.trim(), business_name: d.business_name.trim(),
      current_url: d.current_url.trim(), location: d.location.trim(),
      services: d.services, goal: unsure ? d.goal.trim() : "",
      budget_fit: d.budget_fit, timeline: d.timeline, notes: d.notes.trim(),
      source: d.source, consent: true, turnstile_token: token,
    };
    // Only the questions actually shown are sent (first two per branch when 2+ services).
    for (const s of selected) {
      const shown = BRANCHES[s].q.slice(0, multiService ? 2 : undefined);
      p[s] = Object.fromEntries(shown.map((q) => [q.key, d[s][q.key] ?? (q.multi ? [] : "")]));
    }
    return p;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (status === "submitting") return;
    if (d.hp) { setStatus("success"); return; } // honeypot: pretend success, send nothing
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => {
        const firstErrorContainer = formRef.current?.querySelector('[aria-invalid="true"], [data-invalid="true"]');
        if (firstErrorContainer) {
          firstErrorContainer.scrollIntoView({ block: "center", behavior: "smooth" });
          const focusTarget = firstErrorContainer.matches("input, textarea, select, button")
            ? firstErrorContainer
            : firstErrorContainer.querySelector("input, textarea, select, button") || firstErrorContainer;
          focusTarget.focus();
        }
      });
      return;
    }
    const url = import.meta.env.VITE_INTAKE_WEBHOOK_URL;
    const payload = buildPayload();
    if (!url) {
      if (import.meta.env.DEV) { console.info("[intake] no webhook URL set; payload:", payload); setStatus("success"); return; }
      setStatus("error"); return;
    }
    setStatus("submitting");
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 15000);
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: ctl.signal });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch { setStatus("error"); if (window.turnstile && widgetId.current != null) { window.turnstile.reset(widgetId.current); setToken(""); } }
    finally { clearTimeout(t); }
  };

  const renderQ = (b, q) => q.text ? (
    <Field key={q.key} id={`${b}-${q.key}`} label={q.label} error={errors[`${b}_${q.key}`]}>
      <input id={`${b}-${q.key}`} className={input} type={q.url ? "url" : "text"} maxLength={200} value={d[b][q.key] || ""} onChange={(e) => setBranch(b, q.key, e.target.value)} aria-invalid={!!errors[`${b}_${q.key}`]} />
    </Field>
  ) : (
    <Choice key={q.key} name={`${b}-${q.key}`} legend={q.label} opts={q.opts} multi={q.multi} value={d[b][q.key] ?? (q.multi ? [] : "")} onChange={(v) => setBranch(b, q.key, v)} />
  );

  return (
    <section className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="intake-panel"
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span>
          <span className="block text-lg font-semibold text-slate-900">Request your free technical audit</span>
          <span className="block text-sm text-slate-600">About two minutes. A senior engineer reads every request.</span>
        </span>
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
      </button>

      {open && (
        <div id="intake-panel" className="border-t border-slate-200 px-6 py-6">
          {status === "success" ? (
            <div role="status" className="space-y-2 py-6 text-center">
              <h3 className="text-xl font-semibold text-slate-900">Request received</h3>
              <p className="text-slate-700">Thanks, {d.name.split(" ")[0] || "there"}. We’ll email you at {d.email} shortly.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit} noValidate className="space-y-6">
              {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                <label>Company website<input tabIndex={-1} autoComplete="off" value={d.hp} onChange={(e) => set("hp", e.target.value)} /></label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Your name" error={errors.name}><input id="name" className={input} autoComplete="name" maxLength={100} value={d.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} /></Field>
                <Field id="email" label="Email" error={errors.email}><input id="email" type="email" className={input} autoComplete="email" maxLength={200} value={d.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} /></Field>
                <Field id="business_name" label="Business name" error={errors.business_name}><input id="business_name" className={input} autoComplete="organization" maxLength={150} value={d.business_name} onChange={(e) => set("business_name", e.target.value)} aria-invalid={!!errors.business_name} /></Field>
                <Field id="location" label="Where is your business based?" error={errors.location}><input id="location" className={input} placeholder="City, country" maxLength={120} value={d.location} onChange={(e) => set("location", e.target.value)} aria-invalid={!!errors.location} /></Field>
              </div>
              <Field id="current_url" label="Current website or social link (optional)" error={errors.current_url}><input id="current_url" type="url" className={input} placeholder="https://" maxLength={300} value={d.current_url} onChange={(e) => set("current_url", e.target.value)} aria-invalid={!!errors.current_url} /></Field>

              <Choice name="services" legend="What do you need help with?" opts={SERVICES} multi value={d.services} onChange={setServices} error={errors.services} />

              {unsure && (
                <Field id="goal" label="What are you trying to achieve?">
                  <textarea id="goal" rows={3} maxLength={500} className={input} value={d.goal} onChange={(e) => set("goal", e.target.value)} />
                </Field>
              )}

              {selected.map((s) => (
                <div key={s} className="space-y-4 rounded-xl bg-slate-50 p-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-600">{BRANCHES[s].title}</h3>
                  {BRANCHES[s].q.slice(0, multiService ? 2 : undefined).map((q) => renderQ(s, q))}
                </div>
              ))}
              {multiService && <p className="text-sm text-slate-600">We’ll cover the rest of the details on a call.</p>}

              <div className="space-y-4 border-t border-slate-200 pt-6">
                {budgetText && <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-900">{budgetText}</p>}
                <Choice name="budget_fit" legend="Budget check" opts={BUDGET} value={d.budget_fit} onChange={(v) => set("budget_fit", v)} error={errors.budget_fit} />
                <Choice name="timeline" legend="When do you need this?" opts={TIMELINE} value={d.timeline} onChange={(v) => set("timeline", v)} error={errors.timeline} />
                <Field id="notes" label="Anything else we should know? (optional)">
                  <textarea id="notes" rows={3} maxLength={500} className={input} value={d.notes} onChange={(e) => set("notes", e.target.value)} />
                  <p className="text-right text-xs text-slate-600">{d.notes.length}/500</p>
                </Field>
                <Choice name="source" legend="How did you hear about us? (optional)" opts={SOURCE} value={d.source} onChange={(v) => set("source", v)} />

                <div data-invalid={!!errors.consent}>
                  <label className="flex items-start gap-2 text-sm text-slate-800">
                    <input type="checkbox" className="mt-1" checked={d.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} />
                    OK to contact me about this request by email.
                  </label>
                  {errors.consent && <p role="alert" className="text-sm text-red-700">{errors.consent}</p>}
                </div>

                <div ref={tsRef} data-invalid={!!errors.turnstile} />
                {errors.turnstile && <p role="alert" className="text-sm text-red-700">{errors.turnstile}</p>}
              </div>

              {status === "error" && (
                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
                  We couldn’t send your request. Please try again, or email {COMPANY_DETAILS.email || "admin@nziconduit.com"}.
                </p>
              )}

              <button type="submit" disabled={status === "submitting"}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60">
                {status === "submitting" ? "Sending…" : "Send request"}
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
