/* SISD Design and Computing: platform mailer.
   Runs on the platform's own Gmail (sisd.design.computing1@gmail.com), NOT the personal one, so teachers and
   students only ever see this account. It sends only with the secret KEY, and only to SISD school addresses
   and the two Study Plus UK students' own addresses.
   Set-up: script.google.com → New project → paste this file → set KEY → Deploy → New deployment → Web app →
   Execute as: Me, Who has access: Anyone → Deploy → Authorise. */
const KEY = "PASTE_THE_SECRET_KEY_HERE";
const EXTRA = ["maira.mo.ahmed@gmail.com", "mahamohamed27.a@gmail.com"];   // Study Plus UK students' own copies
// No personal sender name and no Reply-To to a school address: a free Gmail "from Mr. Ahmed" that replies to an
// @sisd.ae address looks like impersonation to the school's Microsoft 365 filter, which quarantines it unseen.
const NAMES = ["SISD Design and Computing", "Study Plus"];
function doPost(e){
  let d = null; try { d = JSON.parse(e.postData.contents); } catch(err){ return out_({ ok: false, reason: "bad" }); }
  if (!d || KEY === "PASTE_THE_SECRET_KEY_HERE" || d.key !== KEY) return out_({ ok: false, reason: "key" });
  const to = String(d.to || "").trim().toLowerCase();
  if (!(/^[^\s@,;]+@sisd\.ae$/.test(to) || EXTRA.indexOf(to) >= 0)) return out_({ ok: false, reason: "to" });
  if (MailApp.getRemainingDailyQuota() < 1) return out_({ ok: false, reason: "quota" });
  const subject = String(d.subject || "SISD Design and Computing").slice(0, 200);
  const html = String(d.html || "").slice(0, 200000);
  const text = html.replace(/<(br|\/p|\/tr|\/h\d|\/div|\/li)[^>]*>/gi, "\n").replace(/<\/td>/gi, "  ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\n\s*\n\s*\n+/g, "\n\n").trim();
  MailApp.sendEmail({ to: to, name: NAMES.indexOf(d.name) >= 0 ? d.name : "SISD Design and Computing", subject: subject, body: text, htmlBody: html });   // a plain-text part too: filters trust HTML-only mail less
  if (d.trash){ try { Utilities.sleep(1500); GmailApp.search('in:sent subject:"' + subject.replace(/"/g, "") + '"', 0, 5).forEach(t => t.moveToTrash()); } catch(err){} }   // codes and passwords: no copy kept
  return out_({ ok: true });
}
function doGet(){ return out_({ ok: true, mailer: true }); }
function out_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
/* run once (▶ Run) to give permission to send */
function authorise(){ Logger.log("Emails left today: " + MailApp.getRemainingDailyQuota() + " · Sent folder: " + GmailApp.search("in:sent", 0, 1).length); }
