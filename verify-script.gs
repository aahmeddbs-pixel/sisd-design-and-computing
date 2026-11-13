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
  if (a === "hpsetup"){ hpTeachersIn_(String(p.tm || "")); return out_(e, hpSetup_(String(p.sheet || ""))); }
  if (a === "hpstatus") return out_(e, hpStatus_());
  if (a === "hptest") return out_(e, hpTest_());
  if (a === "vstatus") return out_(e, vstatus_(String(p.id || "")));
  if (a === "cstatus") return out_(e, cstatus_(String(p.id || "")));
  if (a === "start"){
    const lock = LockService.getScriptLock(); lock.waitLock(20000);
    try { return out_(e, start_(email, String(p.k || "student").slice(0, 20))); } finally { lock.releaseLock(); }
  }
  return out_(e, { ok: false, reason: "unknown" });
}

/* ---------- students' finished videos (Design Grade 7, Criterion C strand ii) ----------
   The course sends the video in 4 MB pieces; each piece goes straight into a Google Drive upload, so nothing big is held
   in memory. Videos land in the Drive folder "SISD student videos" (one sub-folder per class) and anyone with the link can view. */
const VIDEO_FOLDER = "SISD student videos";
const VIDEO_MAX = 300 * 1024 * 1024;
function doPost(e){
  let p = null; try { p = JSON.parse(e.postData.contents); } catch(err){ return out_(null, { ok: false, reason: "bad" }); }
  if (p && p.a === "vchunk") return out_(null, vchunk_(p));
  if (p && p.a === "study") return out_(null, study_(p));
  if (p && (p.a === "code" || p.a === "check")){
    const rid = String(p.rid || "").replace(/[^\w-]/g, "").slice(0, 40); if (!rid) return out_(null, { ok: false, reason: "bad" });
    const lock = LockService.getScriptLock(); lock.waitLock(20000);
    let r; try { r = p.a === "code" ? code_(p) : check_(p); } catch(err){ r = { ok: false, reason: "error" }; } finally { lock.releaseLock(); }
    CacheService.getScriptCache().put("cr:" + rid, JSON.stringify(r), 600);
    return out_(null, { ok: true });
  }
  return out_(null, { ok: false, reason: "unknown" });
}
const vid_ = id => String(id || "").replace(/[^\w-]/g, "").slice(0, 48);
function vstatus_(id){ id = vid_(id); const st = id && JSON.parse(CacheService.getScriptCache().get("vu:" + id) || "null"); return st ? { ok: true, next: st.next, done: !!st.done, url: st.url || "", err: st.err || "" } : { ok: true, next: 0 }; }
function videoFolder_(cls){
  const it = DriveApp.getFoldersByName(VIDEO_FOLDER), top = it.hasNext() ? it.next() : DriveApp.createFolder(VIDEO_FOLDER);
  const name = String(cls || "Other").replace(/[\\/:*?"<>|]/g, " ").slice(0, 60) || "Other", sub = top.getFoldersByName(name);
  return sub.hasNext() ? sub.next() : top.createFolder(name);
}
function vchunk_(p){
  const id = vid_(p.id), i = +p.i, total = +p.size, type = String(p.type || "");
  if (!id || !(total > 0 && total <= VIDEO_MAX) || !/^video\//.test(type)) return { ok: false, reason: "type" };
  const cache = CacheService.getScriptCache(), key = "vu:" + id;
  let st = JSON.parse(cache.get(key) || "null");
  if (!st){
    if (i !== 0) return { ok: false, reason: "start" };
    const ext = (String(p.name || "").match(/\.(\w{2,4})$/) || [, "mp4"])[1];
    const name = [String(p.who || "Student").slice(0, 60), String(p.w || "").slice(0, 60), Utilities.formatDate(new Date(), "Asia/Dubai", "yyyy-MM-dd HH.mm")].filter(Boolean).join(" - ") + "." + ext;
    const meta = { name: name, mimeType: type, parents: [videoFolder_(p.cls).getId()] };
    const r = UrlFetchApp.fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id", { method: "post", contentType: "application/json; charset=UTF-8", payload: JSON.stringify(meta),
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken(), "X-Upload-Content-Type": type, "X-Upload-Content-Length": String(total) }, muteHttpExceptions: true });
    const h = r.getHeaders(), loc = h.Location || h.location;
    if (!loc){ cache.put(key, JSON.stringify({ next: 0, err: "drive " + r.getResponseCode() }), 3600); return { ok: false, reason: "drive" }; }
    st = { loc: loc, got: 0, next: 0 };
  }
  if (st.done || i !== st.next) return { ok: i < st.next, next: st.next, done: !!st.done, url: st.url || "" };   // a piece sent twice is fine
  const bytes = Utilities.base64Decode(String(p.data || "")), start = st.got, end = start + bytes.length - 1;
  const r = UrlFetchApp.fetch(st.loc, { method: "put", payload: bytes, contentType: type, headers: { "Content-Range": "bytes " + start + "-" + end + "/" + total }, muteHttpExceptions: true });
  const code = r.getResponseCode();
  if (code === 308 || code === 200 || code === 201){ st.got = end + 1; st.next = i + 1; st.err = ""; }
  else { st.err = "upload " + code; cache.put(key, JSON.stringify(st), 21600); return { ok: false, reason: "put" }; }
  if (code === 200 || code === 201){
    const f = DriveApp.getFileById(JSON.parse(r.getContentText()).id);
    try { f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch(err){}
    st.url = f.getUrl(); st.done = true; delete st.loc;
  }
  cache.put(key, JSON.stringify(st), 21600);
  return { ok: true, next: st.next, done: !!st.done, url: st.url || "" };
}

/* ---------- Grade 10 sign-up: a 6-digit code to the student's SISD email ----------
   The email address is used only to send the code and is never kept: nothing is written to a sheet, the check is held
   for 15 minutes under a scrambled key, and the sent copy is moved out of this account's Sent folder.
   The address and code travel in the body of a POST, never in a web address; the page reads the result by a random id. */
const CODE_MIN = 15;
function cstatus_(id){ id = String(id || "").replace(/[^\w-]/g, "").slice(0, 40); const r = id && CacheService.getScriptCache().get("cr:" + id); return r ? JSON.parse(r) : { ok: false, pending: true }; }
function code_(p){
  const email = String(p.e || "").trim().toLowerCase(), first = String(p.n || "").replace(/[<>&"]/g, "").slice(0, 40);
  if (!DOMAIN.test(email)) return { ok: false, reason: "domain" };
  const cache = CacheService.getScriptCache(), hk = "code:" + hash_("sdc-code|" + email), n = +(cache.get("codes-count") || 0);
  if (n >= 150) return { ok: false, reason: "busy" };
  const prev = JSON.parse(cache.get(hk) || "null");
  if (prev && Date.now() - prev.at < 45000) return { ok: false, reason: "soon" };
  if (MailApp.getRemainingDailyQuota() < 1) return { ok: false, reason: "quota" };
  const code = String(100000 + (parseInt(Utilities.getUuid().replace(/-/g, "").slice(0, 8), 16) % 900000));
  cache.put(hk, JSON.stringify({ h: hash_("sdc-code|" + code), at: Date.now(), tries: 0 }), CODE_MIN * 60);
  cache.put("codes-count", String(n + 1), 3600);
  const subject = "Your SISD Design and Computing sign-up code: " + code;
  MailApp.sendEmail({ to: email, name: "SISD Design and Computing", subject: subject,
    htmlBody: '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#16223A;max-width:520px">' +
      '<div style="background:#1B2D4E;color:#fff;padding:14px 18px;border-bottom:4px solid #DC2B3E;font-weight:bold">SISD Design and Computing</div>' +
      '<p>Hi ' + (first || "there") + ',</p><p>Type this code on the sign-up page to confirm it\'s you:</p>' +
      '<p style="font-size:30px;font-weight:bold;letter-spacing:6px;background:#EEF1F7;border-radius:8px;padding:12px 18px;display:inline-block;font-family:Consolas,monospace">' + code + '</p>' +
      '<p>The code works for ' + CODE_MIN + ' minutes. After that you sign in with your <b>username</b> and password. Your email address is not kept.</p>' +
      '<p style="color:#5B6782;font-size:13px">If you did not sign up, ignore this email: nothing will happen.</p></div>' });
  try { Utilities.sleep(1500); GmailApp.search('in:sent subject:"' + subject + '"', 0, 5).forEach(t => t.moveToTrash()); } catch(err){}   // keep no copy of the address in Sent
  return { ok: true };
}
function check_(p){
  const email = String(p.e || "").trim().toLowerCase(), code = String(p.c || "").replace(/\D/g, "").slice(0, 6);
  if (!DOMAIN.test(email) || code.length !== 6) return { ok: false, reason: "bad" };
  const cache = CacheService.getScriptCache(), hk = "code:" + hash_("sdc-code|" + email), st = JSON.parse(cache.get(hk) || "null");
  if (!st) return { ok: false, reason: "expired" };
  if (st.tries >= 5){ cache.remove(hk); return { ok: false, reason: "tries" }; }
  if (st.h !== hash_("sdc-code|" + code)){ st.tries++; cache.put(hk, JSON.stringify(st), CODE_MIN * 60); return { ok: false, reason: "wrong", left: 5 - st.tries }; }
  cache.remove(hk);
  return { ok: true };
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
  const kind = String(p.k || "");
  if (kind === "slow-student") return slow_(p);
  if (kind === "reset-request") return resetRequest_(p);
  if (kind === "reset-done") return resetDone_(p);
  if (kind !== "teacher-request" && kind !== "student-request") return { ok: false, reason: "unknown" };
  const student = kind === "student-request";
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
    subject: (student ? "New student waiting for approval: " : "New teacher access request: ") + (name || email),
    htmlBody: '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#16223A;max-width:520px">' +
      '<div style="background:#1B2D4E;color:#fff;padding:14px 18px;border-bottom:4px solid #DC2B3E;font-weight:bold">SISD Design and Computing</div>' +
      (student ? '<p>A new student has signed up and is waiting for approval:</p>' : '<p>A teacher has asked for staff access:</p>') + '<table style="font-size:15px">' +
      '<tr><td style="color:#5B6782;padding-right:12px">Name</td><td><b>' + h(name) + '</b></td></tr>' +
      '<tr><td style="color:#5B6782;padding-right:12px">Email</td><td>' + h(email) + '</td></tr>' +
      (as ? '<tr><td style="color:#5B6782;padding-right:12px">Students see</td><td>' + h(as) + '</td></tr>' : '') +
      (where ? '<tr><td style="color:#5B6782;padding-right:12px">' + (student ? 'Course' : 'Asked from') + '</td><td>' + h(where) + '</td></tr>' : '') +
      '<tr><td style="color:#5B6782;padding-right:12px">When</td><td>' + h(new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" })) + '</td></tr></table>' +
      '<p><a href="' + admin + '" style="display:inline-block;background:#DC2B3E;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">Open the staff dashboard</a></p>' +
      '<p style="color:#5B6782;font-size:13px">' + (student ? 'Open Students &amp; progress and press Approve in the "Waiting for approval" box (their teacher can do this too).' : 'Sign in as super admin and open the Teachers tab to approve or decline.') + ' If you don\'t know this person, don\'t approve.</p></div>'
  });
  return { ok: true, sent: true };
}

/* where every "student needs help" email goes (as well as the class teacher) */
const SLOW_TO = "abdulaziz.ahmed@sisd.ae";
/* a student has been stuck on one task for a long time: email their class teacher (and you) */
function slow_(p){
  const email = String(p.e || "").trim().toLowerCase().slice(0, 120), te = String(p.te || "").trim().toLowerCase().slice(0, 120);
  const who = email || String(p.n || "").trim().toLowerCase().slice(0, 80);
  if (!who) return { ok: false, reason: "who" };
  const cache = CacheService.getScriptCache(), n = +(cache.get("slow-count") || 0);
  if (n >= 40) return { ok: false, reason: "wait" };                      // at most 40 of these an hour
  if (cache.get("slow:" + who)) return { ok: true, already: true };       // one per student per 45 minutes
  cache.put("slow-count", String(n + 1), 3600); cache.put("slow:" + who, "1", 2700);
  const h = s => String(s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const name = String(p.n || "").slice(0, 80), where = String(p.w || "").slice(0, 160), me = SLOW_TO;
  const body = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#16223A;max-width:520px">' +
    '<div style="background:#1B2D4E;color:#fff;padding:14px 18px;border-bottom:4px solid #E0A100;font-weight:bold">SISD Design and Computing · Student needs help</div>' +
    '<p><b>' + h(name || email) + '</b> has been on the same task for a long time and has already had two reminders on screen.</p>' +
    '<p style="background:#FFF6DA;border-radius:8px;padding:10px 12px">' + h(where) + '</p>' +
    '<p>Please check in with them in class. It also shows in the staff dashboard under Students &amp; progress → "Needs help".</p>' +
    '<p><a href="' + SITE + 'admin.html" style="display:inline-block;background:#DC2B3E;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">Open the staff dashboard</a></p></div>';
  const subject = "Student needs help: " + (name || email);
  let teacherSent = false;
  if (te && DOMAIN.test(te) && te !== me){ try { MailApp.sendEmail({ to: te, name: "SISD Design and Computing", subject: subject, htmlBody: body }); teacherSent = true; } catch(err){} }
  MailApp.sendEmail({ to: me, name: "SISD Design and Computing", subject: subject + (te === me ? "" : te ? (teacherSent ? " (also sent to " + te + ")" : " (could not email " + te + ")") : " (teacher email unknown)"), htmlBody: body });
  return { ok: true, sent: true, teacher: teacherSent };
}

/* ---------- forgot PIN / password ----------
   The student presses "Forgot…" on the sign-in page: they get an email explaining what happens next, and you (and their
   teacher, when known) get an email with a link to the staff dashboard, where one click resets it. Then the student gets
   a second email with the new PIN or password. Emails only ever go to @sisd.ae addresses, from fixed wording. */
function mailBox_(title, bodyHtml){
  return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#16223A;max-width:540px">' +
    '<div style="background:#1B2D4E;color:#fff;padding:14px 18px;border-bottom:4px solid #DC2B3E;font-weight:bold">SISD Design and Computing · ' + title + '</div>' + bodyHtml + '</div>';
}
const escH_ = s => String(s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const courseName_ = c => c === "cs" ? "Computer Science" : c === "it" ? "Information Technology" : "Design";
function resetRequest_(p){
  const email = String(p.e || "").trim().toLowerCase().slice(0, 120), te = String(p.te || "").trim().toLowerCase().slice(0, 120);
  const isUser = /^[a-z][a-z0-9]{2,40}$/.test(email);   // Grade 10 accounts use a username, not an email
  if (!DOMAIN.test(email) && !isUser) return { ok: false, reason: "domain" };
  const cache = CacheService.getScriptCache(), n = +(cache.get("reset-count") || 0);
  if (n >= 40) return { ok: false, reason: "wait" };
  if (cache.get("reset:" + email)) return { ok: true, already: true };     // one request per student per 30 minutes
  cache.put("reset-count", String(n + 1), 3600); cache.put("reset:" + email, "1", 1800);
  const c = String(p.c || "") === "cs" ? "cs" : String(p.c || "") === "it" ? "it" : "design", cs = c === "cs";
  const name = String(p.n || "").slice(0, 80), first = name.split(" ")[0] || "there", what = cs ? "PIN" : "password";
  const tips = cs
    ? '<li>Your PIN is the 4 numbers you chose when you signed up.</li><li>Type your name exactly as you did when you signed up (first and last name).</li><li>If you signed up on another device (for example an iPad), try signing in there once: that puts your work online.</li>'
    : '<li>Use your full school email (ending in @sisd.ae).</li><li>Passwords are case-sensitive: check Caps Lock.</li><li>If you also take Computer Science, you can sign in to Design with your school email and your Computer Science PIN.</li>';
  if (!isUser) try { MailApp.sendEmail({ to: email, name: "SISD Design and Computing", subject: "Your " + courseName_(c) + " " + what + " reset request",
    htmlBody: mailBox_("Reset request", '<p>Hi ' + escH_(first) + ',</p><p>We have received your request to reset your <b>' + courseName_(c) + ' ' + what + '</b>.</p>' +
      '<p><b>What happens next:</b> your teacher will reset it on the staff dashboard. As soon as they do, you will get another email with your new ' + what + '. Your saved work is kept.</p>' +
      '<p><b>While you wait, check these:</b></p><ul>' + tips + '</ul>' +
      '<p><a href="' + SITE + '" style="display:inline-block;background:#DC2B3E;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">Open SISD Design and Computing</a></p>' +
      '<p style="color:#5B6782;font-size:13px">If you did not ask for this, you can ignore this email. Your ' + what + ' has not been changed.</p>') }); } catch(err){}
  const staff = mailBox_("Reset request", '<p><b>' + escH_(name || email) + '</b> (' + (isUser ? "username " : "") + escH_(email) + ') has asked for a new <b>' + courseName_(c) + ' ' + what + '</b>.</p>' +
    '<p>Open the staff dashboard → Students &amp; progress. The request is in the <b>Reset requests</b> box: press <b>Reset now</b>. ' + (isUser ? "Give the student the temporary password it shows; they then create their own password." : "The new " + what + " is emailed to the student automatically.") + '</p>' +
    '<p><a href="' + SITE + 'admin.html" style="display:inline-block;background:#DC2B3E;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">Open the staff dashboard</a></p>');
  const subject = "Reset request: " + (name || email) + " (" + courseName_(c) + ")";
  if (te && DOMAIN.test(te) && te !== SLOW_TO){ try { MailApp.sendEmail({ to: te, name: "SISD Design and Computing", subject: subject, htmlBody: staff }); } catch(err){} }
  MailApp.sendEmail({ to: SLOW_TO, name: "SISD Design and Computing", subject: subject, htmlBody: staff });
  return { ok: true, sent: true };
}
function resetDone_(p){
  const email = String(p.e || "").trim().toLowerCase().slice(0, 120), c = String(p.c || "") === "cs" ? "cs" : String(p.c || "") === "it" ? "it" : "design", cs = c === "cs";
  const secret = String(p.s || "");
  if (!DOMAIN.test(email)) return { ok: false, reason: "domain" };
  if (cs ? !/^\d{4}$/.test(secret) : !/^(TEMP-[A-Z0-9]{4}-[A-Z0-9]{4}|[A-Za-z0-9]{8,40})$/.test(secret)) return { ok: false, reason: "bad" };
  const temp = /^TEMP-/.test(secret);
  const cache = CacheService.getScriptCache(), n = +(cache.get("done-count") || 0), k = "done:" + email, m = +(cache.get(k) || 0);
  if (n >= 60 || m >= 3) return { ok: false, reason: "wait" };
  cache.put("done-count", String(n + 1), 3600); cache.put(k, String(m + 1), 3600);
  const name = String(p.n || "").slice(0, 80), first = name.split(" ")[0] || "there", what = cs ? "PIN" : "password";
  const how = cs
    ? '<ol><li>Open SISD Design and Computing and choose <b>Computer Science</b>.</li><li>Type your name: <b>' + escH_(name) + '</b></li><li>Type your new PIN.</li></ol><p>You can then change it to a PIN of your own choice.</p>'
    : '<ol><li>Open SISD Design and Computing and choose <b>' + courseName_(c) + '</b>.</li><li>Type your school email: <b>' + escH_(email) + '</b></li><li>Type your new password exactly as shown (capital letters matter).</li>' + (temp ? '<li>Create your own new password when asked. You will use it from then on.</li>' : '') + '</ol>';
  MailApp.sendEmail({ to: email, name: "SISD Design and Computing", subject: "Your new " + courseName_(c) + " " + what,
    htmlBody: mailBox_("New " + what, '<p>Hi ' + escH_(first) + ',</p><p>Your teacher has reset your <b>' + courseName_(c) + ' ' + what + '</b>. Your new ' + what + ' is:</p>' +
      '<p style="font-size:26px;font-weight:bold;letter-spacing:2px;background:#EEF1F7;border-radius:8px;padding:12px 16px;display:inline-block;font-family:Consolas,monospace">' + escH_(secret) + '</p>' +
      '<p><b>How to sign in</b> (works on any device, and your work is kept):</p>' + how +
      '<p><a href="' + SITE + '" style="display:inline-block;background:#DC2B3E;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">Sign in now</a></p>' +
      '<p style="color:#5B6782;font-size:13px">Keep your ' + what + ' private. Don\'t share it with other students.</p>') });
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


/* ---------- Study Plus: one email to you after every finished topic ----------
   Goes only to STUDY_TO (fixed here, never taken from the page). Says how long the student actually worked
   (active time, not just signed in), the score, effort, what went well and what to improve. */
const STUDY_TO = "aahmed.dbs@gmail.com";
function study_(p){
  const d = p && p.d; if (!d || typeof d !== "object") return { ok: false, reason: "bad" };
  const cache = CacheService.getScriptCache(), n = +(cache.get("study-count") || 0);
  if (n >= 30) return { ok: false, reason: "wait" };                         // at most 30 of these an hour
  const once = "study:" + Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, String(p.e || p.n) + "|" + d.sid + "|" + d.tid + "|" + (d.retry ? "r" : "f") + "|" + d.score + "|" + d.secs));
  if (cache.get(once)) return { ok: true, already: true };                   // the same report twice (double click, retry)
  cache.put("study-count", String(n + 1), 3600); cache.put(once, "1", 21600);
  const h = escH_, num = v => Math.max(0, Math.round(+v || 0));
  const name = String(p.n || "").slice(0, 80) || String(p.e || "").slice(0, 120) || "Student";
  const score = num(d.score), effort = num(d.effort), mins = num(d.mins), col = score >= 70 ? "#1E8A55" : score >= 50 ? "#B26A00" : "#C0283A";
  const li = a => (a || []).slice(0, 8).map(x => "<li style=\"margin-bottom:4px\">" + x + "</li>").join("");
  const well = li((d.well || []).map(q => h(String(q).slice(0, 140))));
  const imp = li((d.improve || []).map(x => h(String(x.q || "").slice(0, 140)) + '<br><span style="color:#5B6782;font-size:13px">' +
    (x.unsure ? "Right, but not confident yet. " : "Answered: " + h(String(x.given || "—").slice(0, 80)) + ". ") + "Correct: <b>" + h(String(x.right || "").slice(0, 80)) + "</b>" + (x.fixed ? " · fixed on retry ✓" : "") + "</span>"));
  const cell = (label, value, c) => '<td style="padding:10px;text-align:center;background:#F3F5F9;border-radius:8px"><div style="font-size:22px;font-weight:bold;color:' + (c || "#16223A") + '">' + value + '</div><div style="font-size:11px;color:#5B6782;text-transform:uppercase;letter-spacing:.05em">' + label + '</div></td>';
  const body = mailBox_("Study Plus report",
    '<p><b>' + h(name) + '</b> ' + (d.retry ? 'fixed mistakes in' : 'finished') + ' <b>' + h(d.subject) + ': ' + h(d.topic) + '</b> <span style="color:#5B6782">(' + h(d.strand || "MYP 2") + ')</span>.</p>' +
    '<table style="width:100%;border-collapse:separate;border-spacing:6px"><tr>' + cell("Active work", mins + " min") + cell("Score", score + "%", col) + cell("Right first time", num(d.right) + "/" + num(d.n)) + cell("Effort", effort + "%") + '</tr></table>' +
    (d.retry ? '<p>On the retry they fixed <b>' + num(d.fixed) + '</b> of their mistakes.</p>' : '') +
    '<p style="color:#5B6782;font-size:13px">Self-rating: 😀 got it ' + num(d.got) + ' · 🤔 partly ' + num(d.unsure) + ' · 😟 need help ' + num(d.need) + '. Focus ' + num(d.focus) + '% (real working time compared with about 40 seconds a task). Total Study Plus work time so far: ' + num((+d.totalMs || 0) / 60000) + ' min.</p>' +
    '<h3 style="color:#1E8A55;font-size:16px;margin:16px 0 6px">What went well</h3>' + (well ? '<ul style="padding-left:18px;margin:0">' + well + '</ul>' : '<p style="color:#5B6782">No tasks were both correct and rated "I\'ve got it" this time.</p>') +
    '<h3 style="color:#C0283A;font-size:16px;margin:16px 0 6px">What to improve</h3>' + (imp ? '<ul style="padding-left:18px;margin:0">' + imp + '</ul>' : '<p style="color:#5B6782">No knowledge gaps in this topic.</p>') +
    '<p style="color:#5B6782;font-size:13px;margin-top:16px">Effort = 60% score + 20% tasks finished + 20% focus. Full history: staff dashboard → ✦ Study Plus.</p>' +
    '<p><a href="' + SITE + 'admin.html" style="display:inline-block;background:#DC2B3E;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">Open the staff dashboard</a></p>');
  MailApp.sendEmail({ to: STUDY_TO, name: "SISD Design and Computing", subject: "Study Plus: " + name + " · " + String(d.subject || "") + " · " + String(d.topic || "") + " · " + score + "%" + (d.retry ? " (retry)" : ""), htmlBody: body });
  return { ok: true, sent: true };
}


/* ---------- House Points: email the top 5 after every lesson, automatically ----------
   Runs by itself every 10 minutes (a time trigger), so the email arrives even when nobody has the admin page open.
   Reads the platform log sheet (the Google Sheet of the Python Pathways Log form). A lesson = a class's completed
   tasks with no gap of more than 15 minutes; it has ended once the class has been quiet for 15 minutes, and it only
   counts when at least 3 students worked (so home learning isn't emailed). Top 5 = most new tasks, weighted by
   difficulty, among students who worked actively for at least 30 minutes. One email per lesson, to HP_TO.
   Set-up happens by itself: the admin page sends the log sheet's link here once (any account's sheet, as long as it can be read). */
const HP_TO = "aahmed.dbs@gmail.com";
const HP_QUIET_MIN = 15, HP_MIN_STUDENTS = 3, HP_WORK_MIN = 30, HP_CATCHUP_H = 24, HP_EVERY_MIN = 10;
const HP_TESTERS = ["test@sisd.ae"];
const HP_LEVELS = { beginner:"Beginner", intermediate:"Intermediate", advanced:"Advanced", dp_beginner:"IB DP Beginner", dp_intermediate:"IB DP Intermediate", dp_advanced:"IB DP Advanced" };
function hpProps_(){ return PropertiesService.getScriptProperties(); }
function hpSetup_(link){
  const id = (String(link).match(/[a-zA-Z0-9_-]{25,}/) || [])[0];
  if (!id) return { ok: false, reason: "sheet" };
  const P = hpProps_(), cur = P.getProperty("HP_SHEET");
  if (cur !== id){
    // the log sheet may belong to another Google account: it only has to be readable (opened here, or "Anyone with the link: Viewer")
    if (cur && hpData_(cur, 0)) return hpStatus_();                    // already working with a log sheet: keep it
    const data = hpData_(id, 0);
    if (!data) return { ok: false, reason: "can't read the log sheet: set Share → Anyone with the link: Viewer" };
    if (!data.some(t => t.indexOf('"sdc":1') >= 0)) return { ok: false, reason: "that sheet isn't the platform log" };
    P.setProperty("HP_SHEET", id);
  }
  try { hpTrigger_(); } catch(err){ return { ok: false, reason: "trigger", msg: String(err).slice(0, 200) }; }
  return hpStatus_();
}
/* the Data column of the log sheet (JSON strings), for rows since `since` (0 = a quick sample). null = can't read it. */
function hpData_(id, since){
  try {                                                                // 1. the script's own account can open it
    const sh = SpreadsheetApp.openById(id).getSheets()[0], last = sh.getLastRow(), cols = sh.getLastColumn();
    if (last < 2) return [];
    const head = sh.getRange(1, 1, 1, cols).getValues()[0].map(x => String(x).toLowerCase());
    const di = head.findIndex(x => x.indexOf("data") === 0); if (di < 0) return null;
    let first = Math.max(2, last - 199);
    if (since){ first = 2; const CH = 1500;
      for (let end = last; end >= 2; end -= CH){                       // walk up the timestamp column until we pass "since"
        const start = Math.max(2, end - CH + 1), ts = sh.getRange(start, 1, end - start + 1, 1).getValues();
        const k = ts.findIndex(r => r[0] instanceof Date && r[0].getTime() >= since);
        if (k !== 0){ first = k < 0 ? end + 1 : start + k; break; }
        first = start;
      }
      if (first > last) return [];
    }
    return sh.getRange(first, di + 1, last - first + 1, 1).getValues().map(r => String(r[0] || ""));
  } catch(err){}
  try {                                                                // 2. through its view-only link
    const base = "https://docs.google.com/spreadsheets/d/" + id + "/gviz/tq?tqx=out:csv&headers=1";
    const after = Utilities.formatDate(new Date((since || Date.now() - 86400000) - 14 * 3600000), "UTC", "yyyy-MM-dd HH:mm:ss");
    const urls = [base + "&tq=" + encodeURIComponent("select * where A > datetime '" + after + "'"), base, "https://docs.google.com/spreadsheets/d/" + id + "/export?format=csv"];
    for (const u of urls){
      const r = UrlFetchApp.fetch(u, { muteHttpExceptions: true, followRedirects: true });
      const t = r.getContentText(); if (r.getResponseCode() !== 200 || /^\s*<(!doctype|html)/i.test(t.slice(0, 300))) continue;
      const R = Utilities.parseCsv(t); if (!R.length) continue;
      const di = R[0].map(x => String(x).trim().toLowerCase()).findIndex(x => x.indexOf("data") === 0); if (di < 0) continue;
      return R.slice(1).map(r => String(r[di] || ""));
    }
  } catch(err){}
  return null;
}
function hpTrigger_(){
  if (ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === "hpTick")) return;
  ScriptApp.newTrigger("hpTick").timeBased().everyMinutes(HP_EVERY_MIN).create();
}
function hpSent_(){ try { return JSON.parse(hpProps_().getProperty("HP_SENT") || "{}"); } catch(err){ return {}; } }
function hpStatus_(){
  let on = false; try { on = ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === "hpTick"); } catch(err){}
  const P = hpProps_();
  return { ok: true, on: on && !!P.getProperty("HP_SHEET"), sent: hpSent_(), last: +(P.getProperty("HP_LAST") || 0), to: HP_TO.replace(/^(.).*(@.*)$/, "$1…$2"),
    teachers: Object.keys(hpTeachers_()).length, teacherCopies: hpCanCopy_(), sender: (hpOwner_().split("@")[1] || "unknown") };
}
/* Run this once from the Apps Script editor if the admin page can't switch it on: it asks for permission and starts the timer. */
function setupHousePoints(){ hpTrigger_(); hpTick(); }

const hpNorm_ = e => String(e || "").trim().toLowerCase();
const hpKeyOf_ = (email, name) => { const e = hpNorm_(email); return e ? "e:" + e : "n:" + String(name || "").trim().toLowerCase().replace(/\s+/g, " "); };
const hpClassKey_ = a => [a.course, a.grade, a.teacher, a.cls || ""].join("|");
const hpLabel_ = a => "G" + a.grade + " " + courseName_(a.course) + (a.cls ? " · " + a.cls : "") + " (" + (a.teacher || "no teacher") + ")";
/* the log rows of the last day and a bit, newest last (reads only the bottom of the sheet) */
function hpRows_(){
  const id = hpProps_().getProperty("HP_SHEET"); if (!id) return null;
  const since = Date.now() - (HP_CATCHUP_H + 4) * 3600000;
  const vals = hpData_(id, since); if (!vals) return null;
  const seen = {}, rows = [];
  vals.forEach(t => { if (!t || seen[t]) return; seen[t] = 1;          // each save arrives twice
    let d = null; try { d = JSON.parse(t); } catch(err){ return; }
    if (!d || !d.sdc || !d.acct) return; d.when = Date.parse(d.at) || 0; if (d.when < since) return; rows.push(d); });
  rows.sort((a, b) => a.when - b.when);
  return rows;
}
function hpLessons_(rows){
  const byClass = {}, out = [];
  rows.filter(r => r.type === "task" && r.task && HP_TESTERS.indexOf(hpNorm_(r.acct.email)) < 0).forEach(r => { const k = hpClassKey_(r.acct); (byClass[k] = byClass[k] || []).push(r); });
  Object.keys(byClass).forEach(k => {
    let cur = null;
    byClass[k].forEach(r => {
      if (cur && r.when - cur.last > HP_QUIET_MIN * 60000){ out.push(cur); cur = null; }
      if (!cur) cur = { key: k + "|" + new Date(r.when).toISOString().slice(0, 16), cls: r.acct, start: r.when, last: r.when, students: {} };
      cur.last = r.when;
      const sk = hpKeyOf_(r.acct.email, r.acct.name), st = cur.students[sk] = cur.students[sk] || { name: r.acct.name, level: r.acct.level, course: r.acct.course, tasks: 0, score: 0, last: 0, seen: {}, mins: 0 };
      st.mins = Math.max(st.mins, +r.mins || 0);
      const tk = r.task.t; if (st.seen[tk]) return; st.seen[tk] = 1;
      st.tasks++; st.score += +r.task.w || 1; st.last = r.when;
    });
    if (cur) out.push(cur);
  });
  const now = Date.now();
  out.forEach(L => {
    L.n = Object.keys(L.students).length; L.ended = now - L.last >= HP_QUIET_MIN * 60000; L.end = L.last;
    rows.forEach(r => { if (r.type !== "work" || r.when < L.start - 3600000 || r.when > L.end + 20 * 60000) return; const st = L.students[hpKeyOf_(r.acct.email, r.acct.name)]; if (st) st.mins = Math.max(st.mins, +r.mins || 0); });
    const all = Object.keys(L.students).map(k => L.students[k]);
    L.short = all.filter(x => x.mins < HP_WORK_MIN);
    L.top = all.filter(x => x.mins >= HP_WORK_MIN).sort((a, b) => b.score - a.score || b.tasks - a.tasks || a.last - b.last).slice(0, 5);
  });
  return out;
}
function hpEmail_(L){
  const h = escH_, t = ms => Utilities.formatDate(new Date(ms), "Asia/Dubai", "HH:mm"), d = ms => Utilities.formatDate(new Date(ms), "Asia/Dubai", "EEE d MMM");
  const sc = n => Math.round(n * 10) / 10, lv = s => s.course === "cs" ? (HP_LEVELS[s.level] || s.level || "") : "";
  const medal = ["🥇", "🥈", "🥉", "4.", "5."];
  const rows = L.top.map((s, i) => '<tr><td style="padding:6px 10px;font-size:18px">' + medal[i] + '</td><td style="padding:6px 10px"><b>' + h(s.name) + '</b>' + (lv(s) ? '<br><span style="color:#5B6782;font-size:13px">' + h(lv(s)) + '</span>' : '') +
    '</td><td style="padding:6px 10px">' + s.tasks + ' task' + (s.tasks === 1 ? '' : 's') + '</td><td style="padding:6px 10px">score ' + sc(s.score) + '</td><td style="padding:6px 10px">' + s.mins + ' min</td></tr>').join("");
  return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#16223A;max-width:620px">' +
    '<div style="background:#1B2D4E;color:#fff;padding:14px 18px;border-bottom:4px solid #DC2B3E;font-weight:bold">SISD Design and Computing · House Points</div>' +
    '<h2 style="margin:16px 0 4px;font-size:20px">' + h(hpLabel_(L.cls)) + '</h2>' +
    '<p style="margin:0 0 12px;color:#5B6782">' + d(L.start) + ', ' + t(L.start) + '–' + t(L.end) + ' · ' + L.n + ' student' + (L.n === 1 ? '' : 's') + ' completed work</p>' +
    (L.top.length ? '<p style="margin:0 0 6px"><b>Top ' + L.top.length + ': one House Point each</b></p><table style="border-collapse:collapse;background:#F3F5F9;border-radius:10px;font-size:15px">' + rows + '</table>'
      : '<p>Nobody worked actively for ' + HP_WORK_MIN + ' minutes in this lesson, so no House Points this time.</p>') +
    (L.short.length ? '<p style="color:#5B6782;font-size:13px;margin-top:12px">Not eligible (under ' + HP_WORK_MIN + ' minutes of active work): ' + L.short.map(s => h(s.name) + ' (' + s.mins + ' min)').join(', ') + '</p>' : '') +
    '<p style="color:#5B6782;font-size:12.5px;margin-top:14px">Most new tasks in the lesson, weighted by difficulty: Python Beginner ×1, Intermediate ×1.5, Advanced ×3 per exercise; Design/IT practice ×1, criterion submitted ×2, strand ×3. Only students with ' + HP_WORK_MIN + '+ minutes of active work. Sent automatically ' + HP_QUIET_MIN + ' minutes after the class went quiet.</p>' +
    '<p><a href="' + SITE + 'admin.html" style="color:#DC2B3E;font-weight:bold">Open the House Points tab</a></p></div>';
}
/* ---------- copies for class teachers ----------
   After each lesson, the class's teacher gets their own summary from "Mr. Ahmed" (sent from this school account,
   reply-to the school address: the super admin's private email never appears). It has the House Points, who
   achieved the lesson's expectations, and who worked below expectation and needs encouraging next lesson.
   Teachers' school emails come from the admin page (approved teachers). An address is only accepted when it is an
   @sisd.ae address that contains the teacher's surname, so nobody can redirect a class's data elsewhere. */
const HP_FROM_NAME = "Mr. Ahmed", HP_REPLY_TO = "abdulaziz.ahmed@sisd.ae";
const hpSurname_ = n => String(n || "").toLowerCase().replace(/[^a-z\s'-]/g, " ").trim().split(/\s+/).pop() || "";
function hpTeachers_(){ try { return JSON.parse(hpProps_().getProperty("HP_TEACHERS") || "{}"); } catch(err){ return {}; } }
function hpTeachersIn_(json){
  if (!json) return;
  let m = null; try { m = JSON.parse(json); } catch(err){ return; }
  if (!m || typeof m !== "object") return;
  const out = {};
  Object.keys(m).slice(0, 40).forEach(name => { const em = String(m[name] || "").trim().toLowerCase(), sn = hpSurname_(name);
    if (sn.length >= 3 && DOMAIN.test(em) && em.split("@")[0].replace(/[^a-z]/g, "").indexOf(sn.replace(/[^a-z]/g, "")) >= 0) out[sn] = em; });
  if (Object.keys(out).length) hpProps_().setProperty("HP_TEACHERS", JSON.stringify(out));
}
/* the account this script sends from (cached): only a school account may send the teachers' copies */
function hpOwner_(){
  const P = hpProps_(); let em = P.getProperty("HP_OWNER") || "";
  if (em) return em;
  try { em = Session.getEffectiveUser().getEmail() || ""; } catch(err){}
  if (!em){ try { const th = GmailApp.search("in:sent", 0, 1); if (th.length){ const f = th[0].getMessages()[0].getFrom(), m = f.match(/[^\s<>"]+@[^\s<>"]+/); if (m) em = m[0]; } } catch(err){} }
  em = String(em || "").toLowerCase(); if (em) P.setProperty("HP_OWNER", em);
  return em;
}
function hpCanCopy_(){ return DOMAIN.test(hpOwner_()); }   // only from the school account
function hpTeacherEmail_(L, rows){
  const h = escH_, t = ms => Utilities.formatDate(new Date(ms), "Asia/Dubai", "HH:mm"), d = ms => Utilities.formatDate(new Date(ms), "Asia/Dubai", "EEEE d MMMM");
  const lv = s => s.course === "cs" ? (HP_LEVELS[s.level] || s.level || "") : "";
  const all = Object.keys(L.students).map(k => L.students[k]);
  const tasks = all.map(s => s.tasks).sort((a, b) => a - b), med = tasks.length ? tasks[Math.floor((tasks.length - 1) / 2)] : 0;
  const topSet = {}; L.top.forEach(s => topSet[s.name] = 1);
  // signed in for this class during the lesson but completed nothing
  const inClass = a => a && a.course === L.cls.course && String(a.grade) === String(L.cls.grade) && hpSurname_(a.teacher) === hpSurname_(L.cls.teacher);
  const idle = {}; rows.forEach(r => { if ((r.type === "signin" || r.type === "signup") && r.when >= L.start - 15 * 60000 && r.when <= L.end && inClass(r.acct) && !L.students[hpKeyOf_(r.acct.email, r.acct.name)]) idle[hpKeyOf_(r.acct.email, r.acct.name)] = r.acct.name; });
  const below = [], achieved = [];
  all.forEach(s => {
    const why = [];
    if (s.mins < HP_WORK_MIN) why.push("only " + s.mins + " min of active work");
    if (med >= 2 && s.tasks <= Math.floor(med / 2)) why.push(s.tasks + " task" + (s.tasks === 1 ? "" : "s") + " (class middle: " + med + ")");
    (why.length ? below : achieved).push({ s, why });
  });
  Object.keys(idle).forEach(k => below.push({ s: { name: idle[k], tasks: 0, mins: 0, course: L.cls.course }, why: ["signed in but completed no tasks"] }));
  achieved.sort((a, b) => b.s.score - a.s.score); below.sort((a, b) => a.s.tasks - b.s.tasks);
  const row = (cells, bg) => '<tr' + (bg ? ' style="background:' + bg + '"' : '') + '>' + cells.map(c => '<td style="padding:6px 10px;border-bottom:1px solid #E3E8F0;vertical-align:top">' + c + '</td>').join("") + '</tr>';
  const tbl = (head, body) => '<table style="border-collapse:collapse;width:100%;font-size:14px;margin:6px 0 14px"><tr>' + head.map(x => '<th style="text-align:left;padding:6px 10px;background:#EEF2F7;font-size:12.5px;color:#5B6782">' + x + '</th>').join("") + '</tr>' + body + '</table>';
  const medal = ["🥇", "🥈", "🥉", "4.", "5."];
  return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#16223A;max-width:640px">' +
    '<div style="background:#1B2D4E;color:#fff;padding:14px 18px;border-bottom:4px solid #DC2B3E;font-weight:bold">SISD Design and Computing · Lesson summary</div>' +
    '<p style="margin:14px 0 4px">Dear ' + h(L.cls.teacher || "colleague") + ',</p>' +
    '<p style="margin:0 0 10px">Here is the summary of your <b>' + h(hpLabel_(L.cls)) + '</b> lesson on ' + d(L.start) + ' (' + t(L.start) + '–' + t(L.end) + '). ' + all.length + ' student' + (all.length === 1 ? '' : 's') + ' completed work' + (Object.keys(idle).length ? ' and ' + Object.keys(idle).length + ' signed in without completing a task' : '') + '.</p>' +
    '<h3 style="margin:16px 0 2px;font-size:17px">🏠 House Points</h3>' +
    (L.top.length ? tbl(["", "Student", "Tasks", "Active work"], L.top.map((s, i) => row([medal[i], '<b>' + h(s.name) + '</b>' + (lv(s) ? '<br><span style="color:#5B6782;font-size:12.5px">' + h(lv(s)) + '</span>' : ''), s.tasks, s.mins + ' min'])).join("")) + '<p style="margin:-6px 0 10px;font-size:13px;color:#5B6782">One House Point each. Please add them to the house system.</p>'
      : '<p style="margin:4px 0 12px">No House Points this lesson: nobody worked actively for ' + HP_WORK_MIN + ' minutes.</p>') +
    '<h3 style="margin:16px 0 2px;font-size:17px">✅ Achieved the lesson expectations (' + achieved.length + ')</h3>' +
    (achieved.length ? tbl(["Student", "Tasks", "Active work"], achieved.map(x => row([h(x.s.name) + (topSet[x.s.name] ? ' 🏠' : '') + (lv(x.s) ? ' <span style="color:#5B6782;font-size:12.5px">· ' + h(lv(x.s)) + '</span>' : ''), x.s.tasks, x.s.mins + ' min'])).join("")) : '<p style="margin:4px 0 12px">None this lesson.</p>') +
    '<h3 style="margin:16px 0 2px;font-size:17px">⚠️ Working below expectation: please encourage next lesson (' + below.length + ')</h3>' +
    (below.length ? tbl(["Student", "Why", "Tasks"], below.map(x => row([h(x.s.name), h(x.why.join("; ")), x.s.tasks], "#FFF7E8")).join("")) : '<p style="margin:4px 0 12px">Everyone met the expectations. Well done!</p>') +
    '<p style="color:#5B6782;font-size:12.5px;margin-top:10px">Expectations: at least ' + HP_WORK_MIN + ' minutes of active work and at least half as many new tasks as the middle of the class. House Points go to the top 5 by new tasks weighted by difficulty (Python Beginner ×1, Intermediate ×1.5, Advanced ×3; Design/IT practice ×1, criterion submitted ×2, strand ×3).</p>' +
    '<p><a href="' + SITE + 'admin.html" style="color:#DC2B3E;font-weight:bold">Open your class on the staff dashboard</a></p>' +
    '<p style="margin-top:14px">Regards,<br>Mr. Ahmed</p></div>';
}
/* a sample teacher summary (made-up students), sent only to the school address, so you can see what teachers receive */
function hpTest_(){
  const P = hpProps_(), last = +(P.getProperty("HP_TEST") || 0);
  if (Date.now() - last < 10 * 60000) return { ok: false, reason: "wait" };
  if (!hpCanCopy_()) return { ok: false, reason: "account", sender: hpOwner_().split("@")[1] || "unknown" };
  P.setProperty("HP_TEST", String(Date.now()));
  const now = Date.now(), st = now - 50 * 60000, cls = { course: "design", grade: "7", teacher: "Miss Abdelaziz", cls: "7X" };
  const S = (name, tasks, mins) => ({ name: name, course: "design", tasks: tasks, score: tasks, mins: mins, last: st, seen: {} });
  const studs = { a: S("Sample Student A", 8, 42), b: S("Sample Student B", 6, 38), c: S("Sample Student C", 5, 33), d: S("Sample Student D", 1, 12) };
  const L = { key: "test", cls: cls, start: st, end: now - 5 * 60000, students: studs, n: 4 };
  L.top = [studs.a, studs.b, studs.c];
  const rows = [{ type: "signin", when: st + 60000, acct: { name: "Sample Student E", email: "", course: "design", grade: "7", teacher: "Miss Abdelaziz" } }];
  MailApp.sendEmail({ to: HP_REPLY_TO, name: HP_FROM_NAME, replyTo: HP_REPLY_TO, subject: "TEST · Lesson summary and House Points: " + hpLabel_(cls), htmlBody: '<p style="font-family:Arial;color:#B4580B"><b>This is a test with made-up students.</b> It is what a class teacher receives after each lesson.</p>' + hpTeacherEmail_(L, rows) });
  return { ok: true, sent: true, to: HP_REPLY_TO };
}
function hpTick(){
  const lock = LockService.getScriptLock(); if (!lock.tryLock(5000)) return;
  try {
    const P = hpProps_(); P.setProperty("HP_LAST", String(Date.now()));
    const rows = hpRows_(); if (!rows || !rows.length) return;
    const sent = hpSent_(), now = Date.now();
    rows.filter(r => r.type === "hpsent" && r.lesson).forEach(r => { sent[r.lesson] = sent[r.lesson] || r.when; });   // already emailed from the admin page
    hpLessons_(rows).forEach(L => {
      if (!L.ended || L.n < HP_MIN_STUDENTS || sent[L.key] || now - L.end > HP_CATCHUP_H * 3600000) return;
      if (MailApp.getRemainingDailyQuota() < 2) return;
      MailApp.sendEmail({ to: HP_TO, name: "SISD Design and Computing", subject: "🏠 House Points top 5: " + hpLabel_(L.cls) + " · " + Utilities.formatDate(new Date(L.start), "Asia/Dubai", "EEE d MMM HH:mm"), htmlBody: hpEmail_(L) });
      sent[L.key] = now;
      // the same lesson's summary for the class teacher, from Mr. Ahmed
      const te = hpTeachers_()[hpSurname_(L.cls.teacher)];
      if (te && te !== HP_REPLY_TO && hpCanCopy_() && MailApp.getRemainingDailyQuota() > 1){
        try { MailApp.sendEmail({ to: te, name: HP_FROM_NAME, replyTo: HP_REPLY_TO, subject: "Lesson summary and House Points: " + hpLabel_(L.cls) + " · " + Utilities.formatDate(new Date(L.start), "Asia/Dubai", "EEE d MMM HH:mm"), htmlBody: hpTeacherEmail_(L, rows) }); } catch(err){}
      }
    });
    Object.keys(sent).forEach(k => { if (now - sent[k] > 7 * 86400000) delete sent[k]; });   // keep a week
    P.setProperty("HP_SENT", JSON.stringify(sent));
  } finally { lock.releaseLock(); }
}
