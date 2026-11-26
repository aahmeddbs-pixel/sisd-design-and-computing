/* SISD Design and Computing: automatic sync sheets ("SDC Sync N").
   Students' work goes to a Google Form whose linked sheet the site reads back. A sheet stops taking rows once it is
   full (SDC Sync 1 on 16 Nov 2026, SDC Sync 2 on 24 Nov 2026). This script checks the current sheet every 30 minutes
   and, well before it is full, makes the next form + sheet by itself.

   How the site finds the newest sheet: every sync spreadsheet from Sync 3 on has a "Directory" tab listing all the
   sync sheets. When a new one is made, it is added to the old sheet's Directory tab too, so a page that knows any
   sheet can follow the list to the newest. Older sheets stay listed and are still read, so no saved work is lost.

   Runs in sisd.design.computing1@gmail.com (owner of SDC Sync 3 and every sheet after it), in its own Apps Script
   project "SDC Sync Rotator". Set-up: paste this file, run setup() once and allow the permissions it asks for. */

const TEACHER = "aahmed.dbs@gmail.com";          // emailed whenever a new sheet is made, or if something needs him
const ROTATE_ROWS = 35000;                       // Sync 2 stopped at 50,828 rows: move on well before that
const ROTATE_BYTES = 80 * 1000 * 1000;           // ... or when the sheet holds about 80 MB of text (Sync 2 held about 190 MB)
const PROBE_WAIT_S = 60;                         // how long a test row may take to show up in the sheet
const DIR_TAB = "Directory";
const HEAD = ["Started", "Name", "Form action", "Entry", "Sheet id", "Tab gid", "Status", "Note"];
const SEED = [   // oldest first
  ["SDC Sync 1", "", "", "12_g1ySZtyUX-rXTuOHcZ7_vUzCkdhXV_T7KF5NjBFa0", "1433531983", "full", "filled up 16 Nov 2026"],
  ["SDC Sync 2", "https://docs.google.com/forms/d/e/1FAIpQLScz4HZXAuqSguFrhRDLAtAV2PxAi6K8uF2Vzx4cPWFCevMYdA/formResponse", "entry.919327250", "1qRTsBkS6MfA7lHEU5ZN3e3cbQAGtjrF8xmSfHGHKEoE", "996219689", "full", "filled up 24 Nov 2026"],
  ["SDC Sync 3", "https://docs.google.com/forms/d/e/1FAIpQLSdMyq_x4TXZ7fWbMEoZsL25Rgbhmgx2b7_n9l9wcoZhT_0GsA/formResponse", "entry.666192810", "1yvhp7MAxKMp6VsUm0nVS7vZ3CbNNfLJCdReJN2TgLWY", "1112428158", "current", "made by hand 26 Nov 2026"]
];
const props = () => PropertiesService.getScriptProperties();

/* ---------- set-up (run once) ---------- */
function setup(){
  if (!props().getProperty("CURRENT_ID")){
    const s3 = SEED[SEED.length - 1];
    writeDir_(s3[3], SEED.map(r => [new Date().toISOString()].concat(r)));
    props().setProperty("CURRENT_ID", s3[3]);
  }
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === "check").forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("check").timeBased().everyMinutes(30).create();
  check();
  status();
}

/* ---------- the Directory tab ---------- */
function readDir_(id){
  const sh = SpreadsheetApp.openById(id).getSheetByName(DIR_TAB); if (!sh) return [];
  const v = sh.getDataRange().getValues(); v.shift(); return v.filter(r => r[4]);
}
function writeDir_(id, rows){
  const ss = SpreadsheetApp.openById(id);
  let sh = ss.getSheetByName(DIR_TAB); if (!sh) sh = ss.insertSheet(DIR_TAB, ss.getSheets().length);   // last tab, never the responses tab
  sh.clearContents(); sh.getRange(1, 1, 1, HEAD.length).setValues([HEAD]);
  if (rows.length) sh.getRange(2, 1, rows.length, HEAD.length).setValues(rows.map(r => r.slice(0, HEAD.length).map(String)));
  sh.setFrozenRows(1);
}
function current_(){
  const id = props().getProperty("CURRENT_ID"), rows = id ? readDir_(id) : [];
  for (let i = rows.length - 1; i >= 0; i--) if (rows[i][6] === "current") return { rows, i, name: rows[i][1], action: rows[i][2], entry: rows[i][3], id: rows[i][4], gid: String(rows[i][5]) };
  return null;
}
function tabOf_(ss, gid){ return ss.getSheets().find(s => String(s.getSheetId()) === String(gid)) || null; }

/* ---------- every 30 minutes ---------- */
function check(){
  const lock = LockService.getScriptLock(); if (!lock.tryLock(10000)) return;
  try {
    const cur = current_(); if (!cur) return mail_("SDC sync: no current sheet", "The sync Directory has no sheet marked current. Nothing was changed.");
    const ss = SpreadsheetApp.openById(cur.id), tab = tabOf_(ss, cur.gid) || ss.getSheets()[0];
    const rows = tab.getLastRow(), bytes = estBytes_(tab, rows);
    const ok = probe_(cur, tab), fails = ok ? 0 : (+props().getProperty("FAILS") || 0) + 1;
    props().setProperty("FAILS", String(fails));
    props().setProperty("LAST", JSON.stringify({ at: new Date().toISOString(), sheet: cur.name, rows, mb: Math.round(bytes / 1e6), probe: ok }));
    let why = "";
    if (rows >= ROTATE_ROWS) why = rows + " rows (limit " + ROTATE_ROWS + ")";
    else if (bytes >= ROTATE_BYTES) why = "about " + Math.round(bytes / 1e6) + " MB of text (limit " + ROTATE_BYTES / 1e6 + " MB)";
    else if (fails >= 2) why = "test rows stopped arriving (" + fails + " checks in a row)";
    if (why) rotate_(cur, why);
  } finally { lock.releaseLock(); }
}
/* size of the sheet: the average length of the newest 200 rows, times the number of rows */
function estBytes_(tab, rows){
  if (rows < 2) return 0;
  const n = Math.min(200, rows - 1), cols = Math.min(Math.max(tab.getLastColumn(), 1), 4);
  const v = tab.getRange(rows - n + 1, 1, n, cols).getValues();
  let len = 0; v.forEach(r => r.forEach(c => len += String(c).length));
  return len / n * rows;
}
/* send a test row through the form and check that it reaches the sheet */
function probe_(f, tab){
  if (!f.action || !f.entry) return true;
  const mark = "PROBE|" + Date.now() + "|" + Utilities.getUuid().slice(0, 8);
  try { UrlFetchApp.fetch(f.action, { method: "post", payload: { [f.entry]: mark }, muteHttpExceptions: true }); } catch(e){ return false; }
  for (let waited = 0; waited < PROBE_WAIT_S; waited += 10){
    Utilities.sleep(10000); SpreadsheetApp.flush();
    const last = tab.getLastRow(); if (last < 2) continue;
    const n = Math.min(40, last - 1), w = Math.max(1, Math.min(tab.getLastColumn(), 4));
    if (tab.getRange(last - n + 1, 1, n, w).getValues().some(r => r.some(c => String(c) === mark))) return true;
  }
  return false;
}

/* ---------- make the next form + sheet ---------- */
function rotate_(cur, why){
  const n = (parseInt(String(cur.name).replace(/\D+/g, ""), 10) || 3) + 1, name = "SDC Sync " + n;
  const made = makeForm_(name);
  if (!made.ok){
    return mail_("SDC sync: could not make " + name, "The current sheet (" + cur.name + ") needs replacing: " + why + ".\n\nMaking " + name + " failed: " + made.err +
      "\n\nNothing was switched, so students still save to " + cur.name + ". It will try again in 30 minutes.");
  }
  const rows = cur.rows.map(r => r.slice()); rows[cur.i][6] = "previous";
  rows.push([new Date().toISOString(), name, made.action, made.entry, made.id, made.gid, "current", why]);
  writeDir_(made.id, rows);      // the new sheet lists everything
  writeDir_(cur.id, rows);       // and the old one points on to it
  props().setProperty("CURRENT_ID", made.id); props().setProperty("FAILS", "0");
  mail_("SDC sync: students now save to " + name, "The sheet " + cur.name + " was getting full: " + why + ".\n\n" +
    name + " has been made, and every page of SISD Design and Computing moves to it by itself within about 30 minutes. " +
    "Older sheets are still read, so no saved work is lost. Nothing for you to do.\n\nForm: " + made.formUrl + "\nSheet: " + made.sheetUrl);
}
function makeForm_(name){
  try {
    const form = FormApp.create(name);
    form.setCollectEmail(false).setAllowResponseEdits(false).setLimitOneResponsePerUser(false).setProgressBar(false).setShowLinkToRespondAgain(false);
    const item = form.addParagraphTextItem().setTitle("Data").setRequired(false);
    if (typeof form.setPublished === "function") form.setPublished(true);
    form.setAcceptingResponses(true);
    let ss = SpreadsheetApp.create(name + " (Responses)");
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    Utilities.sleep(3000); SpreadsheetApp.flush(); ss = SpreadsheetApp.openById(ss.getId());
    const linked = ss.getSheets().find(s => s.getFormUrl()) || ss.getSheets()[ss.getSheets().length - 1];
    ss.getSheets().filter(s => s.getSheetId() !== linked.getSheetId() && s.getLastRow() === 0).forEach(s => { try { ss.deleteSheet(s); } catch(e){} });
    DriveApp.getFileById(ss.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const pre = form.createResponse().withItemResponse(item.createResponse("x")).toPrefilledUrl();
    const entry = (pre.match(/(entry\.\d+)=/) || [])[1], action = form.getPublishedUrl().replace(/\/viewform.*$/, "/formResponse");
    if (!entry || !/\/forms\/d\/e\/[\w-]+\/formResponse$/.test(action)) throw new Error("could not read the new form's links");
    const f = { action, entry, id: ss.getId(), gid: String(linked.getSheetId()), formId: form.getId() };
    if (!probe_(f, linked)) throw new Error("a test row did not reach the new sheet (is the form published to anyone with the link?)");
    return Object.assign({ ok: true, formUrl: form.getPublishedUrl(), sheetUrl: ss.getUrl() }, f);
  } catch(e){ return { ok: false, err: String(e && e.message || e) }; }
}
function mail_(subject, body){ try { MailApp.sendEmail(TEACHER, subject, body, { name: "SISD Design and Computing" }); } catch(e){} }

/* ---------- for checking by hand ---------- */
function status(){ Logger.log(props().getProperty("LAST") || "not checked yet"); const c = current_(); Logger.log(c ? c.name + " " + c.id : "no current sheet"); }
/* makes a throw-away form + sheet the same way a real switch would, checks it works, then bins both */
function testMakeForm(){
  const r = makeForm_("SDC Sync TEST " + new Date().toISOString());
  Logger.log(JSON.stringify(r));
  if (r.ok){ DriveApp.getFileById(r.id).setTrashed(true); DriveApp.getFileById(r.formId).setTrashed(true); }
  return r.ok;
}
