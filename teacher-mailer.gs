/* SISD Design and Computing: teacher mailer.
   Runs on the platform's own Gmail (NOT the personal one), so teachers only ever see this account.
   Emails can go only to the addresses in ALLOWED, and only with the secret KEY.
   Set-up: script.google.com → New project → paste this file → set KEY → Deploy → New deployment → Web app →
   Execute as: Me, Who has access: Anyone → Deploy → Authorise. Then run "authorise" once (▶ Run). */
const KEY = "PASTE_THE_SECRET_KEY_HERE";
const ALLOWED = ["ciaran.french@sisd.ae", "sahar.abdelaziz@sisd.ae", "abdulaziz.ahmed@sisd.ae"];
const FROM_NAME = "Mr. Ahmed", REPLY_TO = "abdulaziz.ahmed@sisd.ae";
function doPost(e){
  let d = null; try { d = JSON.parse(e.postData.contents); } catch(err){ return out_({ ok: false, reason: "bad" }); }
  if (!d || d.key !== KEY || KEY === "PASTE_THE_SECRET_KEY_HERE") return out_({ ok: false, reason: "key" });
  const to = String(d.to || "").trim().toLowerCase();
  if (ALLOWED.indexOf(to) < 0) return out_({ ok: false, reason: "to" });
  if (MailApp.getRemainingDailyQuota() < 1) return out_({ ok: false, reason: "quota" });
  MailApp.sendEmail({ to: to, name: FROM_NAME, replyTo: REPLY_TO, subject: String(d.subject || "SISD Design and Computing").slice(0, 200), htmlBody: String(d.html || "").slice(0, 200000) });
  return out_({ ok: true });
}
function doGet(){ return out_({ ok: true, mailer: true }); }
function out_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function authorise(){ Logger.log("Emails left today: " + MailApp.getRemainingDailyQuota()); }
