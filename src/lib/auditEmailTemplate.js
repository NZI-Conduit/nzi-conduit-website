import { COMPANY_DETAILS } from "./constants.js";

/**
 * Escapes unsafe HTML characters to prevent XSS / HTML injection in email clients.
 * @param {any} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Validates whether a given URL uses http: or https: protocol strictly.
 * @param {string} urlString
 * @returns {boolean}
 */
export function isValidHttpUrl(urlString) {
  if (!urlString || typeof urlString !== "string") return false;
  try {
    const parsed = new URL(urlString.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Formats a Date object or ISO string into Indian Standard Time (IST - UTC+5:30).
 * e.g. "22 Oct 2026, 6:02 PM IST"
 * @param {Date | string | number} [dateInput]
 * @returns {string}
 */
export function formatISTDate(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(d.getTime())) return "Unknown Date/Time";

  const day   = d.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata", day: "numeric" });
  const month = d.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata", month: "short" });
  const year  = d.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata", year: "numeric" });
  const time  = d.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${day} ${month} ${year}, ${time} IST`;
}

/**
 * Maps raw service keys to friendly labels.
 * @param {string | string[]} services
 * @returns {string}
 */
export function formatServices(services) {
  if (!services || (Array.isArray(services) && services.length === 0)) return "None specified";
  const map = {
    web:    "Website Development",
    seo:    "Local SEO",
    video:  "Short-Form Video",
    unsure: "Not sure yet",
  };
  const list = Array.isArray(services) ? services : [services];
  return list.map((s) => map[s] || s).join(", ");
}

/**
 * Maps raw timeline keys to friendly labels.
 * @param {string} timeline
 * @returns {string}
 */
export function formatTimeline(timeline) {
  if (!timeline) return "Flexible";
  const map = {
    asap:     "ASAP",
    month:    "Within a month",
    quarter:  "1\u20133 months",
    flexible: "Flexible",
  };
  return map[String(timeline).toLowerCase()] || timeline;
}

/**
 * Maps raw budget fit keys to friendly labels.
 * @param {string} budgetFit
 * @returns {string}
 */
export function formatBudgetFit(budgetFit) {
  if (!budgetFit) return "Not specified";
  const map = {
    fits:    "Within budget",
    stretch: "A stretch",
    not_now: "Not right now",
  };
  return map[String(budgetFit).toLowerCase()] || budgetFit;
}

/**
 * Generates both a professional HTML email and a clean plain-text fallback for a
 * Technical Audit Request submission.
 *
 * Delivery (n8n webhook):
 *   The form POSTs JSON containing email_html, email_text, email_subject,
 *   email_reply_to and email_to to an n8n webhook. Inside n8n, use the
 *   "Send Email" node and map:
 *     To         -> {{ $json.email_to }}
 *     Subject    -> {{ $json.email_subject }}
 *     HTML Body  -> {{ $json.email_html }}          <-- MUST use email_html
 *     Text Body  -> {{ $json.email_text }}
 *     Reply-To   -> {{ $json.email_reply_to }}
 *
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.business_name
 * @param {string} [data.current_url]
 * @param {string} data.location
 * @param {string | string[]} data.services
 * @param {string} data.budget_fit
 * @param {string} data.timeline
 * @param {string} [data.notes]
 * @param {Date | string} [data.submitted_at]
 * @returns {{ subject: string, html: string, text: string, replyTo: string, to: string, isAsap: boolean, dateIST: string }}
 */
export function createAuditEmail(data = {}) {
  const name         = (data.name          || "").trim();
  const email        = (data.email         || "").trim();
  const business     = (data.business_name || data.business || "").trim() || "Unspecified Business";
  const currentUrl   = (data.current_url   || "").trim();
  const location     = (data.location      || "").trim() || "Not specified";
  const servicesText = formatServices(data.services);
  const budgetText   = formatBudgetFit(data.budget_fit);
  const timelineText = formatTimeline(data.timeline);
  const notesText    = (data.notes         || "").trim();
  const dateIST      = formatISTDate(data.submitted_at || new Date());

  const isAsap      = /^asap$/i.test(String(data.timeline || "").trim());
  const hasValidUrl = isValidHttpUrl(currentUrl);

  const subject = `NZI Conduit Technical Audit Request: ${business}`;
  const replyTo = email
    ? (name ? `"${name}" <${email}>` : email)
    : (COMPANY_DETAILS.email || "admin@nziconduit.com");
  const to = COMPANY_DETAILS.email || "admin@nziconduit.com";

  // ── HTML-escaped values ──────────────────────────────────────────────────
  const safeName     = escapeHtml(name || "Prospective Client");
  const safeEmail    = escapeHtml(email);
  const safeBusiness = escapeHtml(business);
  const safeLocation = escapeHtml(location);
  const safeServices = escapeHtml(servicesText);
  const safeBudget   = escapeHtml(budgetText);
  const safeTimeline = escapeHtml(timelineText);
  const safeDateIST  = escapeHtml(dateIST);

  // Website: clickable link only for valid http/https; never raw URL as text
  const websiteHtml = hasValidUrl
    ? `<a href="${escapeHtml(currentUrl)}" target="_blank" rel="noopener noreferrer" style="color:#2563EB;font-weight:600;text-decoration:underline;">Open website &rarr;</a>`
    : `<span style="color:#94A3B8;">${currentUrl ? "Invalid URL (http/https only)" : "None provided"}</span>`;

  // Notes: preserve line-breaks; never raw ASCII borders
  const notesHtml = notesText
    ? escapeHtml(notesText).replace(/\r\n|\n|\r/g, "<br />")
    : `<em style="color:#94A3B8;">No notes provided.</em>`;

  // Timeline badge: red for ASAP, neutral otherwise
  const timelineBadgeStyle = isAsap
    ? "background:#FEF2F2;color:#DC2626;border:1px solid #FCA5A5;font-weight:700;"
    : "background:#F1F5F9;color:#334155;border:1px solid #CBD5E1;font-weight:600;";

  const replyMailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: NZI Conduit Technical Audit Request - ${business}`)}`;

  // Shared inline-style fragments for the two-column detail rows
  const labelCell = `width:28%;padding:11px 14px 11px 0;border-bottom:1px solid #E2E8F0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#64748B;vertical-align:top;`;
  const valueCell = `width:72%;padding:11px 0 11px 14px;border-bottom:1px solid #E2E8F0;font-size:15px;font-weight:500;color:#0F172A;vertical-align:top;`;
  const lastLabelCell = `width:28%;padding:11px 14px 11px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#64748B;vertical-align:top;`;
  const lastValueCell = `width:72%;padding:11px 0 11px 14px;font-size:15px;font-weight:600;color:#0F172A;vertical-align:top;`;

  // ── HTML email (table-based, inline CSS, max-width 600px) ─────────────────
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>${escapeHtml(subject)}</title>
  <style type="text/css">
    body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
    table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;}
    body{margin:0!important;padding:0!important;background:#F1F5F9;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}
    @media only screen and (max-width:620px){
      .wrap{width:100%!important;max-width:100%!important;}
      .pad{padding:20px!important;}
    }
  </style>
  <!--[if mso]><noscript><xml>
    <o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings>
  </xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background:#F1F5F9;">

<table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F1F5F9" style="table-layout:fixed;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
      <tr><td align="center" valign="top" width="600">
      <![endif]-->

      <!-- Card -->
      <table class="wrap" border="0" cellpadding="0" cellspacing="0" width="100%"
        style="max-width:600px;background:#FFFFFF;border-radius:12px;border:1px solid #E2E8F0;overflow:hidden;">

        <!-- HEADER -->
        <tr>
          <td bgcolor="#0F172A" style="padding:28px 32px;border-bottom:3px solid #2563EB;">
            <div style="font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#64748B;margin-bottom:6px;">NZI CONDUIT</div>
            <h1 style="margin:0 0 6px 0;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:-0.3px;line-height:1.3;">New Technical Audit Request</h1>
            <div style="font-size:12px;color:#94A3B8;">Received&nbsp;<span style="color:#E2E8F0;font-weight:600;">${safeDateIST}</span></div>
          </td>
        </tr>

        <!-- SUMMARY BADGES -->
        <tr>
          <td bgcolor="#F8FAFC" style="padding:14px 32px;border-bottom:1px solid #E2E8F0;">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:8px;">
                  <div style="background:#FFFFFF;color:#0F172A;border:1px solid #CBD5E1;padding:5px 13px;border-radius:6px;font-size:12px;font-weight:700;display:inline-block;">${safeBusiness}</div>
                </td>
                <td style="padding-right:8px;">
                  <div style="${timelineBadgeStyle}padding:5px 13px;border-radius:6px;font-size:12px;display:inline-block;">${safeTimeline}</div>
                </td>
                <td>
                  <div style="background:#FFFFFF;color:#334155;border:1px solid #CBD5E1;padding:5px 13px;border-radius:6px;font-size:12px;font-weight:600;display:inline-block;">${safeBudget}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td class="pad" style="padding:28px 32px;">

            <!-- CLIENT DETAILS -->
            <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#64748B;margin-bottom:14px;">Client Details</div>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:28px;">
              <tr>
                <td style="${labelCell}">Name</td>
                <td style="${valueCell}">${safeName}</td>
              </tr>
              <tr>
                <td style="${labelCell}">Email</td>
                <td style="${valueCell}"><a href="mailto:${safeEmail}" style="color:#2563EB;font-weight:600;text-decoration:underline;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="${labelCell}">Company</td>
                <td style="${valueCell}">${safeBusiness}</td>
              </tr>
              <tr>
                <td style="${labelCell}">Website</td>
                <td style="${valueCell}">${websiteHtml}</td>
              </tr>
              <tr>
                <td style="${labelCell}">Location</td>
                <td style="${valueCell}">${safeLocation}</td>
              </tr>
              <tr>
                <td style="${lastLabelCell}">Services</td>
                <td style="${lastValueCell}">${safeServices}</td>
              </tr>
            </table>

            <!-- NOTES -->
            <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#64748B;margin-bottom:10px;">Notes</div>

            <table border="0" cellpadding="0" cellspacing="0" width="100%"
              style="border-left:4px solid #2563EB;background:#F8FAFC;border-radius:0 6px 6px 0;margin-bottom:28px;">
              <tr>
                <td style="padding:16px 20px;font-size:14px;line-height:1.65;color:#1E293B;word-break:break-word;">
                  ${notesHtml}
                </td>
              </tr>
            </table>

            <!-- CTA BUTTONS -->
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" bgcolor="#2563EB" style="border-radius:8px;mso-padding-alt:0;">
                  <a href="${replyMailto}" style="font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;display:inline-block;padding:13px 26px;border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">Reply to ${safeName} &rarr;</a>
                </td>
                ${hasValidUrl ? `<td align="center" style="padding-left:10px;">
                  <a href="${escapeHtml(currentUrl)}" target="_blank" rel="noopener noreferrer" style="font-size:14px;font-weight:600;color:#0F172A;text-decoration:none;display:inline-block;padding:12px 22px;border-radius:8px;border:1px solid #CBD5E1;background:#FFFFFF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">Visit Website &#8599;</a>
                </td>` : ""}
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#F8FAFC" style="padding:16px 32px;border-top:1px solid #E2E8F0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94A3B8;">Sent via NZI Conduit audit request form</p>
          </td>
        </tr>

      </table>
      <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>

</body>
</html>`;

  // ── Plain-text fallback (no ASCII borders, no bullet chars, no raw URLs as decoration) ──
  const websiteText = hasValidUrl ? currentUrl : (currentUrl ? "(invalid URL)" : "None provided");

  const text = `NEW TECHNICAL AUDIT REQUEST
Received: ${dateIST}

SUMMARY
Business:   ${business}
Timeline:   ${timelineText}
Budget:     ${budgetText}

CLIENT DETAILS
Name:       ${name || "Prospective Client"}
Email:      ${email || "None provided"}
Company:    ${business}
Website:    ${websiteText}
Location:   ${location}
Services:   ${servicesText}

NOTES
${notesText || "No notes provided."}

Sent via NZI Conduit audit request form
Reply to this email to respond to ${name || "the client"}.`;

  return {
    subject,
    html,
    text,
    replyTo,
    to,
    isAsap,
    dateIST,
  };
}
