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
