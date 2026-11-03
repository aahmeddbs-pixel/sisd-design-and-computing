/* SISD Design and Computing: email verification.
   Sends a "Verify my email" link to an @sisd.ae address and records when it is clicked.
   Set-up: paste this whole file into a Google Apps Script project made from a new Google Sheet
   (Extensions → Apps Script), then Deploy → New deployment → Web app → Execute as: Me,
   Who has access: Anyone → Deploy, and send the Web app URL to be connected. */

const SITE = "https://aahmeddbs-pixel.github.io/sisd-design-and-computing/";
const DOMAIN = /^[^\s@]+@sisd\.ae$/i;
const LINK_HOURS = 48;          // a link works for 2 days
const MAX_PER_HOUR = 3;         // emails to one address per hour

function sheet_(){
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName("Verifications");
  if (!sh){ sh = ss.insertSheet("Verifications"); sh.appendRow(["Email", "Kind", "Token hash", "Sent", "Verified"]); sh.setFrozenRows(1); }
  return sh;
}
function rows_(){ const v = sheet_().getDataRange().getValues(); v.shift(); return v; }
function hash_(t){ return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, t)); }
function out_(e, obj){
  const cb = String((e && e.parameter && e.parameter.cb) || "").replace(/[^\w$.]/g, "");
  return ContentService.createTextOutput(cb ? cb + "(" + JSON.stringify(obj) + ");" : JSON.stringify(obj))
    .setMimeType(cb ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}
function isVerified_(email){
  if (!email) return false;
  const cache = CacheService.getScriptCache(), k = "v:" + email;
  if (cache.get(k) === "1") return true;
  const yes = rows_().some(r => String(r[0]).toLowerCase() === email && r[4]);
  if (yes) cache.put(k, "1", 21600);
  return yes;
}

function doGet(e){
  const p = e.parameter || {}, a = p.a || "", email = String(p.e || "").trim().toLowerCase();
  if (a === "verify") return verify_(email, String(p.t || ""));
  if (a === "status") return out_(e, { verified: isVerified_(email) });
  if (a === "statuses"){
    const m = {}; String(p.list || "").toLowerCase().split(",").slice(0, 60).forEach(x => { x = x.trim(); if (x) m[x] = isVerified_(x); });
    return out_(e, m);
  }
  if (a === "notify") return out_(e, notify_(p));
  if (a === "start"){
    const lock = LockService.getScriptLock(); lock.waitLock(20000);
    try { return out_(e, start_(email, String(p.k || "student").slice(0, 20))); } finally { lock.releaseLock(); }
  }
  return out_(e, { ok: false, reason: "unknown" });
}

function start_(email, kind){
  if (!DOMAIN.test(email)) return { ok: false, reason: "domain" };
  if (isVerified_(email)) return { ok: true, already: true };
  const hourAgo = Date.now() - 3600000;
  const recent = rows_().filter(r => String(r[0]).toLowerCase() === email && new Date(r[3]).getTime() > hourAgo).length;
  if (recent >= MAX_PER_HOUR) return { ok: false, reason: "wait" };
  if (MailApp.getRemainingDailyQuota() < 1) return { ok: false, reason: "quota" };
  const token = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
  sheet_().appendRow([email, kind, hash_(token), new Date(), ""]);
  const link = ScriptApp.getService().getUrl() + "?a=verify&e=" + encodeURIComponent(email) + "&t=" + token;
  const who = kind === "staff" ? "staff dashboard" : "course";
  MailApp.sendEmail({
    to: email, name: "SISD Design and Computing",
    subject: "Verify your email for SISD Design and Computing",
    htmlBody: '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#16223A;max-width:520px">' +
      '<div style="background:#1B2D4E;color:#fff;padding:14px 18px;border-bottom:4px solid #DC2B3E;font-weight:bold">SISD Design and Computing</div>' +
      '<p>Hello,</p><p>Someone signed up for the SISD Design and Computing ' + who + ' with this email address. If it was you, press the button to verify your email:</p>' +
      '<p><a href="' + link + '" style="display:inline-block;background:#DC2B3E;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">Verify my email</a></p>' +
      '<p>Then go back to the sign-in page and sign in. The link works for ' + LINK_HOURS + ' hours.</p>' +
      '<p style="color:#5B6782;font-size:13px">If you did not sign up, ignore this email: nothing will happen.</p></div>'
  });
  return { ok: true, sent: true };
}

/* a teacher asked for staff access: email the owner of this script (you) straight away */
function notify_(p){
  if (String(p.k || "") !== "teacher-request") return { ok: false, reason: "unknown" };
  const email = String(p.e || "").trim().toLowerCase().slice(0, 120);
  if (!DOMAIN.test(email)) return { ok: false, reason: "domain" };
  const cache = CacheService.getScriptCache(), n = +(cache.get("notify-count") || 0);
  if (n >= 15) return { ok: false, reason: "wait" };                 // at most 15 emails an hour
  if (cache.get("notify:" + email)) return { ok: true, already: true };   // one email per teacher per 6 hours
  cache.put("notify-count", String(n + 1), 3600); cache.put("notify:" + email, "1", 21600);
  const h = s => String(s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const name = String(p.n || "").slice(0, 80), as = String(p.as || "").slice(0, 60), where = String(p.w || "").slice(0, 40);
  const admin = SITE + "admin.html";
  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(), name: "SISD Design and Computing",
    subject: "New teacher access request: " + (name || email),
    htmlBody: '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#16223A;max-width:520px">' +
      '<div style="background:#1B2D4E;color:#fff;padding:14px 18px;border-bottom:4px solid #DC2B3E;font-weight:bold">SISD Design and Computing</div>' +
      '<p>A teacher has asked for staff access:</p><table style="font-size:15px">' +
      '<tr><td style="color:#5B6782;padding-right:12px">Name</td><td><b>' + h(name) + '</b></td></tr>' +
      '<tr><td style="color:#5B6782;padding-right:12px">Email</td><td>' + h(email) + '</td></tr>' +
      (as ? '<tr><td style="color:#5B6782;padding-right:12px">Students see</td><td>' + h(as) + '</td></tr>' : '') +
      (where ? '<tr><td style="color:#5B6782;padding-right:12px">Asked from</td><td>' + h(where) + '</td></tr>' : '') +
      '<tr><td style="color:#5B6782;padding-right:12px">When</td><td>' + h(new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" })) + '</td></tr></table>' +
      '<p><a href="' + admin + '" style="display:inline-block;background:#DC2B3E;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">Open the staff dashboard</a></p>' +
      '<p style="color:#5B6782;font-size:13px">Sign in as super admin and open the Teachers tab to approve or decline. If you don\'t know this person, decline the request.</p></div>'
  });
  return { ok: true, sent: true };
}

function verify_(email, token){
  const sh = sheet_(), v = sh.getDataRange().getValues(), h = hash_(token), now = Date.now();
  let ok = false;
  for (let i = v.length - 1; i >= 1; i--){
    if (String(v[i][0]).toLowerCase() !== email || v[i][2] !== h) continue;
    if (now - new Date(v[i][3]).getTime() > LINK_HOURS * 3600000) break;
    if (!v[i][4]) sh.getRange(i + 1, 5).setValue(new Date());
    ok = true; break;
  }
  if (ok) CacheService.getScriptCache().put("v:" + email, "1", 21600);
  const msg = ok ? "✅ Your email is verified." : "This link is not valid or has expired.";
  const sub = ok ? "Go back to SISD Design and Computing and sign in." : "Go back to the sign-in page and sign in again: a new link will be sent to your SISD email.";
  return HtmlService.createHtmlOutput('<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:40px auto;color:#16223A">' +
    '<div style="background:#1B2D4E;color:#fff;padding:14px 18px;border-bottom:4px solid #DC2B3E;font-weight:bold">SISD Design and Computing</div>' +
    '<h2 style="margin-top:22px">' + msg + '</h2><p>' + sub + '</p>' +
    '<p><a href="' + SITE + '" target="_top" style="display:inline-block;background:#DC2B3E;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">Go to sign in</a></p></div>')
    .setTitle("SISD Design and Computing");
}
