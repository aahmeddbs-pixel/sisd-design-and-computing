/* gfSend: post answers to a Google Form exactly like the form's own Submit button does
   (the hidden fields a real submission carries, sent both by fetch and by a hidden form in a hidden frame). */
if (!window.gfSend) window.gfSend = (function(){
  let chain = Promise.resolve(), n = 0;
  function full(body){
    const p = new URLSearchParams(body instanceof URLSearchParams ? body : String(body || ""));
    const z = "-" + Math.floor(Math.random() * 9e18).toString();
    if (!p.has("fvv")) p.append("fvv", "1");
    if (!p.has("pageHistory")) p.append("pageHistory", "0");
    if (!p.has("fbzx")) p.append("fbzx", z);
    if (!p.has("partialResponse")) p.append("partialResponse", JSON.stringify([null, null, z]));
    return p;
  }
  function viaFrame(action, p){
    return new Promise(res => {
      try {
        if (!document.body) return res(false);
        const name = "gfsink" + (++n), fr = document.createElement("iframe");
        fr.name = name; fr.title = "sync"; fr.setAttribute("aria-hidden", "true"); fr.tabIndex = -1;
        fr.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0";
        const f = document.createElement("form"); f.method = "POST"; f.action = action; f.target = name; f.acceptCharset = "UTF-8"; f.style.display = "none";
        p.forEach((v, k) => { const i = document.createElement("textarea"); i.name = k; i.value = v; f.appendChild(i); });
        let done = false; const end = ok => { if (done) return; done = true; setTimeout(() => { try { fr.remove(); f.remove(); } catch(e){} }, 1500); res(ok); };
        fr.onload = () => end(true); setTimeout(() => end(true), 6000);
        document.body.appendChild(fr); document.body.appendChild(f); f.submit();
      } catch(e){ res(false); }
    });
  }
  return function gfSend(action, body, keep){
    const p = full(body);
    const viaFetch = fetch(action, { method:"POST", mode:"no-cors", body:p, keepalive: !!keep && p.toString().length < 60000 }).then(() => true, () => false);
    if (keep === "unload") return viaFetch;
    const framed = chain = chain.then(() => viaFrame(action, p));
    return Promise.all([viaFetch, framed]).then(([x, y]) => x || y);
  };
})();

/* SISD Design and Computing: shared platform layer for Python Pathways (Computer Science) and
   MYP Design Curriculum Pathways (Design and IT).
   - The portal page sets a "gate" for this browser tab: which course the student chose.
     Each course page only opens for the course chosen at the portal.
   - Each student account is registered to one course and grade. Only the admin can change it,
     with an assignment row signed by the admin key (students' browsers check the signature).
   - Sign-ins, wrong-course attempts and completed tasks are logged to the teacher's private log form.
   The sync sheet only ever holds scrambled IDs plus course/grade codes: never names or emails. */
window.SDC = (function(){
"use strict";
const PORTAL = "/sisd-design-and-computing/";
const COURSES = {
  cs:     { id:"cs",     name:"Computer Science", short:"CS",     icon:"</>", app:"/python-pathways/",                 grades:["6","7","8","11","12"], blurb:"Python coding: lessons, exercises and practice" },
  design: { id:"design", name:"Design",           short:"Design", icon:"✎",   app:"/myp-design-curriculum-pathways/", grades:["6","7","8","10"],      blurb:"IB MYP Design: Criteria A to D design projects" },
  it:     { id:"it",     name:"IT",               short:"IT",     icon:"⇄",   app:"/myp-design-curriculum-pathways/", grades:["10"],                  blurb:"Grade 10 IT: Networks and network security" }
};
// Teacher's private log (the same Google Form as the Python Pathways Log): type, student, email, teacher, data
const LOG = { url:"https://docs.google.com/forms/d/e/1FAIpQLSfFnVZORF6176gPE9a2zGNpivDuklLFF5cHzdQz1YxfAxThRA/formResponse",
  entries:{ type:"entry.1355322393", student:"entry.1753714859", email:"entry.1091945433", teacher:"entry.1559320258", data:"entry.145790134" } };
// Registry and admin assignments live in the Python Pathways Sync form/sheet as scrambled PPS2 rows
const SYNC = { action:"https://docs.google.com/forms/d/e/1FAIpQLSdGZGdrzAvN_21zfKHufKcba8003hZIeUhzTKQJ3Mun53trlQ/formResponse", entry:"entry.544835510",
  id:"12_g1ySZtyUX-rXTuOHcZ7_vUzCkdhXV_T7KF5NjBFa0", gid:"1433531983" };
const SIG_PUB = {"key_ops":["verify"],"ext":true,"kty":"EC","x":"g6JG87cYBkusgs-I5KvQKNdcS2VGwCu4FP9lJYIvu58","y":"Tc06F7jM1RaDT6RsO7UTPumlWm7d3MNQNtqky5ygZAE","crv":"P-256"};
const GATE_KEY = "sdc_gate", Q_KEY = "sdc_q", GATE_HOURS = 12;
const TE = new TextEncoder();

/* ---------- small helpers ---------- */
const e64 = u8 => { let s = ""; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
const d64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const u8ToB64Text = t => e64(TE.encode(t)), b64ToText = s => new TextDecoder().decode(d64(s));
const hex = u8 => [...u8].map(v => v.toString(16).padStart(2, "0")).join("");
const normEmail = e => String(e || "").trim().toLowerCase();
/* ---------- school years: every student moves up a grade on 1 September ----------
   ay(t) = the school year a moment belongs to (2026 means September 2026 to August 2027). */
function ay(t){ const d = new Date(t == null ? Date.now() : t); if (isNaN(d)) return ay(); return d.getMonth() >= 8 ? d.getFullYear() : d.getFullYear() - 1; }
/* a grade that was right at moment `since`, moved up one for every 1 September since then */
function rolled(g, since){ const n = parseInt(g, 10); if (!/^\d+$/.test(String(g || "")) || isNaN(n)) return g; const yrs = Math.max(0, ay() - ay(since || Date.now())); return String(n + yrs); }
/* switches set in an earlier school year are off again from 1 September, until the teacher opens them */
const freshSwitches = st => !!(st && st.t && ay(Date.parse(st.t)) >= ay());
/* the teacher's test student: can enter every course and see every grade, level and criterion */
const TESTERS = ["test@sisd.ae"];
const isTester = e => TESTERS.indexOf(normEmail(e)) >= 0;
const TEST_PW = "b6fbc936080011b082b40a66fa98641e0c132ae742d915f7c1baaed0e4a92577";   // SHA-256 of the test student's password
async function testerPw(email, pw){
  if (!isTester(email) || !(window.crypto && crypto.subtle)) return false;
  const h = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode("sdc-test|" + normEmail(email) + "|" + String(pw || ""))));
  return [...h].map(v => v.toString(16).padStart(2, "0")).join("") === TEST_PW;
}
/* accounts the super admin asked to delete straight away (no 30-day wait) */
const DELETED = [{ email:"ahmed.dbs@gmail.com", at:Date.parse("2026-11-02T14:50:00Z") }, { email:"aahmed.dbs@gmail.com", at:Date.parse("2026-11-02T14:50:00Z") }];
const fixedDeletion = e => DELETED.find(d => d.email === normEmail(e)) || null;
const normName = n => String(n || "").trim().toLowerCase().replace(/\s+/g, " ");
function keyOf(email, name){ const e = normEmail(email); return e ? "e:" + e : "n:" + normName(name); }
async function idOf(email, name){ return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", TE.encode("sdc|" + keyOf(email, name))))).slice(0, 32); }
const course = c => COURSES[c] || null;
function courseLabel(c, grade){ const C = course(c); return C ? (grade ? "G" + grade + " " : "") + C.name : String(c || ""); }
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- the gate: which course this tab is allowed to open ---------- */
function gate(){
  try { const g = JSON.parse(sessionStorage.getItem(GATE_KEY) || "null");
    if (g && course(g.course) && Date.now() - (g.at || 0) < GATE_HOURS * 3600000) return g; } catch(e){}
  return null;
}
function setGate(g){ try { sessionStorage.setItem(GATE_KEY, JSON.stringify(Object.assign({ at:Date.now() }, g))); } catch(e){} }
function patchGate(p){ const g = gate(); if (g) setGate(Object.assign(g, p)); }
function clearGate(){ try { sessionStorage.removeItem(GATE_KEY); } catch(e){} }
const offline = () => location.protocol === "file:";
/* Called by a course page. Returns the gate, or sends the student to the portal. */
function require(allowed){
  const g = gate();
  if (g && allowed.indexOf(g.course) >= 0) return g;
  if (offline()) return null;               // opened from a file on a teacher's computer: no portal
  document.documentElement.style.visibility = "hidden";
  location.replace(PORTAL + (g ? "?m=wrongapp" : ""));
  return null;
}
function leave(code){ clearGate(); location.href = PORTAL + (code ? "?m=" + encodeURIComponent(code) : ""); }

/* ---------- posting to Google Forms (queued while offline) ---------- */
function getQ(){ try { return JSON.parse(localStorage.getItem(Q_KEY)) || []; } catch(e){ return []; } }
function setQ(q){ try { while (q.length > 200) q.shift(); localStorage.setItem(Q_KEY, JSON.stringify(q)); } catch(e){} }
async function post(action, fields, keep){
  const p = new URLSearchParams(); Object.keys(fields).forEach(k => p.append(k, fields[k]));
  try { return await gfSend(action, p, keep); } catch(e){ return false; }
}
let flushing = false;
async function flush(){
  if (flushing || offline()) return; flushing = true;
  try { let q = getQ();
    while (q.length){ const it = q[0]; if (!(await post(it.a, it.f, true))) break; q = getQ(); if (q.length && JSON.stringify(q[0]) === JSON.stringify(it)) q.shift(); setQ(q); if (q.length) await new Promise(r => setTimeout(r, 300)); }
  } finally { flushing = false; }
}
function enqueue(action, fields){ const q = getQ(); q.push({ a:action, f:fields }); setQ(q); flush(); }
window.addEventListener("online", flush); setTimeout(flush, 4000);

/* ---------- reading scrambled rows back from the sync sheet ---------- */
function gviz(tq, sheet){
  return new Promise((res, rej) => {
    const cb = "__sdc" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7), sc = document.createElement("script");
    const done = () => { clearTimeout(t); try { delete window[cb]; } catch(e){ window[cb] = undefined; } sc.remove(); };
    const t = setTimeout(() => { done(); rej(new Error("timeout")); }, 15000);
    window[cb] = r => { done(); if (!r || r.status === "error") return rej(new Error("read")); res(r); };
    sc.onerror = () => { done(); rej(new Error("reach")); };
    const where = sheet ? "sheet=" + encodeURIComponent(sheet) + "&" : "gid=" + SYNC.gid + "&";
    sc.src = `https://docs.google.com/spreadsheets/d/${SYNC.id}/gviz/tq?${where}headers=1&tqx=out:json;responseHandler:${cb}&tq=${encodeURIComponent(tq)}&_=${Date.now()}`;
    document.head.appendChild(sc);
  });
}
let COL = null;
/* every tab that holds sync rows: the linked tab plus any "Form responses N" tab (a re-linked form writes to a new tab) */
async function column(){
  if (COL) return COL;
  const locs = [];
  for (const sheet of ["", ...[1,2,3,4,5,6].map(n => "Form responses " + n), "Form Responses 1", "Form Responses 2"]){
    let r; try { r = await gviz("select * limit 30", sheet); } catch(e){ if (!sheet) throw e; continue; }
    const cols = (r.table && r.table.cols) || [], rws = (r.table && r.table.rows) || [];
    let i = cols.findIndex((x, j) => rws.some(row => String(((row.c || [])[j] || {}).v || "").startsWith("PPS2|")));
    if (i < 0) i = cols.findIndex(x => /^\s*data\s*$/i.test(x.label || ""));
    if (i >= 0) locs.push({ col: cols[i].id, time: cols[0].id, sheet });
  }
  if (!locs.length) locs.push({ col: "B", time: "A", sheet: "" });
  return (COL = locs);
}
async function rows(kind, id, limit){
  const out = [], seen = new Set();
  for (const c of await column()){
    let r; try { r = await gviz(`select ${c.col} where ${c.col} starts with 'PPS2|${kind}|${id}|' order by ${c.time} desc limit ${limit || 30}`, c.sheet); } catch(e){ if (!c.sheet) throw e; continue; }
    ((r.table && r.table.rows) || []).forEach(row => { const v = String(((row.c || [])[0] || {}).v || ""); if (seen.has(v)) return; seen.add(v);
      const p = v.split("|"); if (p.length >= 7) out.push({ ver:+p[3], text:p.slice(6).join("|") }); });
  }
  return out.sort((a, b) => b.ver - a.ver);   // newest first
}
const sendRow = (kind, id, text) => enqueue(SYNC.action, { [SYNC.entry]: ["PPS2", kind, id, String(Date.now()), 0, 1, text].join("|") });

/* ---------- admin assignments (signed) ---------- */
let pubKey = null;
async function verify(text){
  const [b, s] = String(text).split(".");
  if (!b || !s) return null;
  try {
    pubKey = pubKey || await crypto.subtle.importKey("jwk", SIG_PUB, { name:"ECDSA", namedCurve:"P-256" }, false, ["verify"]);
    const json = b64ToText(b);
    if (!(await crypto.subtle.verify({ name:"ECDSA", hash:"SHA-256" }, pubKey, d64(s), TE.encode(json)))) return null;
    return JSON.parse(json);
  } catch(e){ return null; }
}
/* Look up one student: their registered course (first registration wins) and the admin's latest assignment. */
async function lookup(email, name){
  const id = await idOf(email, name);
  const [S, G] = await Promise.all([rows("S", id, 20), rows("G", id, 50)]);
  let assign = null;
  for (const r of S){ const o = await verify(r.text); if (o && o.k === id){ assign = o; break; } }
  const fd = fixedDeletion(email); if (fd && (!assign || !(assign.at > fd.at))) assign = { k:id, del:true, at:fd.at };
  let reg = null;
  for (const r of G){ try { const o = JSON.parse(r.text); if (o && course(o.c) && (!reg || r.ver < reg.ver)) reg = Object.assign({ ver:r.ver }, o); } catch(e){} }
  return { id, assign, reg };
}
function register(email, name, c, grade){
  idOf(email, name).then(id => sendRow("G", id, JSON.stringify({ c, g:String(grade || "") }))).catch(() => {});
}

/* ---------- the teacher's log ---------- */
function acctOf(a){ return { name:a.name || "", email:normEmail(a.email), grade:String(a.grade || ""), teacher:a.teacher || "", course:a.course || "", level:a.level || "", cls:a.cls || "" }; }
function log(type, a, extra){
  const acct = acctOf(a || {});
  const data = Object.assign({ sdc:1, v:1, type, at:new Date().toISOString(), acct }, extra || {});
  enqueue(LOG.url, { [LOG.entries.type]:"sdc-" + type, [LOG.entries.student]:acct.name, [LOG.entries.email]:acct.email, [LOG.entries.teacher]:acct.teacher, [LOG.entries.data]:JSON.stringify(data) });
}
/* one completed task, for the end-of-lesson House Points ranking. w = difficulty weight */
function task(a, title, w, kind){ const wk = work(); log("task", a, { task:{ t:String(title || "").slice(0, 120), w:+w || 1, kind:kind || "task" }, sid: wk && wk.sid, mins: wk ? Math.floor(wk.ms / 60000) : 0 }); }

/* ---------- staff: the signed course state (criteria switches + approved teachers) ----------
   Published by the super admin to the Design Studio Switches form and signed with the admin key, so nobody else
   can add a teacher or change a switch. The same state is used by the Design course. */
const CONTROL = { csv:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRDyFCmLL1Z2lWea0WLF5surkagyB_Ad6-Cij4lCBhpvCeybt_pQB15xClmQoIRg8LMUWeFwuCUYy0f/pub?gid=480761896&single=true&output=csv",
  form:"https://docs.google.com/forms/d/e/1FAIpQLSeNJCgUXw7lCX1gPayZYtyZbmSyXnkDMGJzCpjtIYui_FnhTQ/formResponse", entry:"entry.1255814967" };
function canon(v){ return Array.isArray(v) ? "[" + v.map(canon).join(",") + "]" : v && typeof v === "object" ? "{" + Object.keys(v).sort().map(k => JSON.stringify(k) + ":" + canon(v[k])).join(",") + "}" : JSON.stringify(v); }
async function verifyState(d){
  try { if (!d || !d.sig || !d.t) return false;
    pubKey = pubKey || await crypto.subtle.importKey("jwk", SIG_PUB, { name:"ECDSA", namedCurve:"P-256" }, false, ["verify"]);
    const body = { unlocks: d.unlocks, teachers: d.teachers || [], declined: d.declined || [], t: d.t };
    return await crypto.subtle.verify({ name:"ECDSA", hash:"SHA-256" }, pubKey, d64(d.sig), TE.encode(canon(body)));
  } catch(e){ return false; }
}
function csvRows(t){
  const R = []; let row = [], cur = "", q = false;
  for (let i = 0; i < t.length; i++){ const c = t[i];
    if (q){ if (c === '"'){ if (t[i + 1] === '"'){ cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true; else if (c === ","){ row.push(cur); cur = ""; } else if (c === "\n" || c === "\r"){ if (c === "\r" && t[i + 1] === "\n") i++; row.push(cur); R.push(row); row = []; cur = ""; } else cur += c; }
  if (cur || row.length){ row.push(cur); R.push(row); }
  return R;
}
/* latest admin-signed state + teacher access requests */
async function loadState(csvUrl){
  const url = csvUrl || CONTROL.csv, r = await fetch(url + (url.includes("?") ? "&" : "?") + "cb=" + Date.now(), { cache:"no-store" });
  if (!r.ok) throw new Error("The switches sheet could not be read.");
  const rows = csvRows(await r.text()); let state = null; const reqs = [];
  for (let i = 1; i < rows.length; i++){
    const cell = rows[i].slice(1).find(v => v && v.trim().startsWith("{")); if (!cell) continue;
    try { const d = JSON.parse(cell);
      if (d.unlocks){ if (await verifyState(d) && (!state || String(d.t) > String(state.t))) state = d; }
      else if (d.request && /@sisd\.ae$/i.test(String(d.request.email || ""))) reqs.push(d.request);
    } catch(e){}
  }
  return { state, requests: reqs };
}
/* which teacher a student chose: matched on surname, so "Ms. Abdelaziz" and "Miss Abdelaziz" are the same person */
const surname = n => String(n || "").toLowerCase().replace(/[^a-z\s'-]/g, " ").trim().split(/\s+/).pop() || "";
function sameTeacher(a, b){ const x = surname(a), y = surname(b); return !!x && x === y; }
async function teacherNames(){
  try { const { state } = await loadState(); return ((state && state.teachers) || []).map(t => t.name).filter(Boolean); } catch(e){ return []; }
}

/* ---------- teacher feedback to students ----------
   Stored in the sync sheet under the student's scrambled ID (no names or emails). */
function sendFeedback(student, fb){
  return idOf(student.email, student.name).then(id => { sendRow("F", id, JSON.stringify(Object.assign({ at: Date.now() }, fb))); flush(); return true; });
}
async function getFeedback(email, name){
  const id = await idOf(email, name), out = [];
  (await rows("F", id, 60)).forEach(r => { try { const o = JSON.parse(r.text); if (o && (o.s || o.i || o.n || o.note)) out.push(Object.assign({ ver: r.ver }, o)); } catch(e){} });
  return out.sort((a, b) => (b.at || b.ver) - (a.at || a.ver));
}
const SEEN_FB = "sdc_fb_seen";
function fbButton(){ return document.getElementById("sdcFb"); }
async function showFeedbackButton(){
  const g = gate(); if (!g || !g.who || offline()) return;
  let list = []; try { list = await getFeedback(g.who.email, g.who.name); } catch(e){ return; }
  const mine = list.filter(f => !f.course || f.course === g.course || (f.course === "design" && g.course === "it") || (f.course === "it" && g.course === "design"));
  const strip = document.getElementById("sdcStrip"); if (!strip || !mine.length) return;
  let seen = {}; try { seen = JSON.parse(localStorage.getItem(SEEN_FB)) || {}; } catch(e){}
  const unread = mine.filter(f => !seen[f.at]).length;
  let b = fbButton();
  if (!b){ b = document.createElement("button"); b.type = "button"; b.id = "sdcFb";
    b.setAttribute("style", "background:#DC2B3E;border:0;color:#fff;border-radius:999px;padding:4px 12px;font:inherit;font-weight:800;cursor:pointer");
    const slot = strip.querySelector("span[style*='margin-left:auto']"); (slot || strip).insertBefore(b, slot ? slot.firstChild : null); }
  b.textContent = "📝 Feedback from your teacher" + (unread ? " (" + unread + " new)" : "");
  b.onclick = () => {
    mine.forEach(f => seen[f.at] = 1); try { localStorage.setItem(SEEN_FB, JSON.stringify(seen)); } catch(e){}
    b.textContent = "📝 Feedback from your teacher";
    const bg = document.createElement("div"); bg.setAttribute("style", "position:fixed;inset:0;background:rgba(8,15,30,.6);z-index:2147483600;display:flex;align-items:flex-start;justify-content:center;padding:60px 16px;overflow:auto");
    const sec = (h, t) => t ? `<h4 style="margin:12px 0 4px;font-size:14px;color:#1B2D4E">${esc(h)}</h4><p style="margin:0;white-space:pre-wrap">${esc(t)}</p>` : "";
    bg.innerHTML = `<div role="dialog" aria-label="Feedback" style="background:#fff;color:#16223A;border-radius:14px;max-width:640px;width:100%;padding:22px;font:15px/1.55 Arial,Helvetica,sans-serif">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><h3 style="margin:0;font-size:20px">Feedback from your teacher</h3><button type="button" data-x style="border:1px solid #D8DEEA;background:#fff;border-radius:8px;padding:6px 12px;font-weight:700;cursor:pointer">Close</button></div>
      ${mine.map(f => `<div class="sdcFbItem" style="border:1px solid #D8DEEA;border-left:4px solid #DC2B3E;border-radius:10px;padding:12px 14px;margin-top:14px">
        <div style="font-size:12.5px;color:#5B6782;font-weight:700">${esc(f.about || "")}${f.about ? " · " : ""}${esc(new Date(f.at || f.ver).toLocaleDateString("en-GB", { day:"numeric", month:"short" }))}${f.from ? " · " + esc(f.from) : ""}</div>
        ${f.lvl ? `<div style="margin-top:6px;font-weight:800">Suggested level: ${esc(f.lvl)} / 8</div>` : ""}
        ${sec("Strengths", f.s)}${sec("Improvements", f.i)}${sec("Next steps", f.n)}${sec("Note", f.note)}</div>`).join("")}</div>`;
    document.body.appendChild(bg);
    bg.onclick = e => { if (e.target === bg || e.target.hasAttribute("data-x")) bg.remove(); };
  };
}

/* ---------- active work time ----------
   Counts only while the student is actually working: the page is open and they typed, clicked or ran something
   in the last 2 minutes. Being signed in and idle does not count. One session = one sign-in, on one day. */
const IDLE_MS = 120000, WORK_GOAL_MIN = 30;
let lastAct = 0;
const dayNow = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
["keydown", "input", "pointerdown", "change"].forEach(ev => window.addEventListener(ev, e => { if (e.isTrusted !== false) lastAct = Date.now(); }, true));
function work(){
  const g = gate(); if (!g || !g.who) return null;
  if (!g.sid || g.day !== dayNow()){ const sid = Math.random().toString(36).slice(2, 10); patchGate({ sid, day: dayNow(), work: 0, told30: false }); return { sid, ms: 0 }; }
  return { sid: g.sid, ms: g.work || 0 };
}
let workTick = Date.now();
setInterval(() => {
  const now = Date.now(), dt = Math.min(now - workTick, 10000); workTick = now;
  const g = gate(); if (!g || !g.who || document.hidden || now - lastAct > IDLE_MS) return;
  const w = work(); if (!w) return;
  const ms = w.ms + dt; patchGate({ work: ms });
  if (ms >= WORK_GOAL_MIN * 60000 && !gate().told30){ patchGate({ told30: true }); log("work", Object.assign({ course: g.course }, g.acct || g.who), { sid: w.sid, mins: Math.floor(ms / 60000) }); }
}, 5000);
window.addEventListener("pagehide", () => { const g = gate(), w = work(); if (g && w && w.ms > 60000) log("work", Object.assign({ course: g.course }, g.acct || g.who), { sid: w.sid, mins: Math.floor(w.ms / 60000), end: true }); });

/* ---------- checks used by the course pages ---------- */
const MSG = {
  other: (c, by) => `This account is registered for <b>${esc(courseLabel(c))}</b>${by ? " by your teacher" : ""}, not the course you chose. You can only see the course you are registered for. If this is wrong, ask your teacher: only they can change your course.`,
  deleted: () => `<b>This account was deleted</b> by your teacher. Use <b>Sign up</b> to make a new account.`,
  grade: g => `IT is only for Grade 10, and this account is registered for Grade ${esc(g)}. Sign out and choose your own course.`
};
/* After a successful sign-in or sign-up inside a course page.
   a = {course, email, name, grade, teacher, level, cls}; signup = true right after creating the account.
   Resolves {ok:true, assign} (assign = the admin's latest settings, to apply) or {ok:false, msg}. */
async function confirm(a, signup){
  const g = gate();
  const c = a.course || (g && g.course);
  if (offline()) return { ok:true, assign:null };
  if (isTester(a.email)){   // test student: every course, every grade
    patchGate({ who:{ email:normEmail(a.email), name:a.name }, acct: acctOf(Object.assign({}, a, { course:c })) }); work();
    if (!(g && g.logged)){ log(signup ? "signup" : "signin", Object.assign({}, a, { course:c }), { gate:g && g.mode, test:true }); patchGate({ logged:true }); }
    return { ok:true, assign:null };
  }
  { const fd = fixedDeletion(a.email); if (fd && !(createdMs(a) > fd.at)){ log("deletedsignin", Object.assign({}, a, { course:c }), {}); try { if (window.SDC_forget) window.SDC_forget(a); } catch(e){} return { ok:false, deleted:true, msg:MSG.deleted() }; } }
  let L = null;
  try { L = await lookup(a.email, a.name); } catch(e){ L = null; }
  if (!L){ // sheet unreachable: let them in, it is checked again next time (new sign-ups must still verify)
    const vm = await verifyGate(a.email, "student", !!signup); if (vm){ log("unverified", Object.assign({}, a, { course:c }), { signup:!!signup }); return { ok:false, verify:true, msg:vm }; }
    patchGate({ who:{ email:normEmail(a.email), name:a.name } });
    if (!(g && g.logged)) { log("signin", Object.assign({}, a, { course:c }), { gate:g && g.mode, unchecked:true }); patchGate({ logged:true }); }
    return { ok:true, assign:null };
  }
  let A = L.assign;
  if (A && A.del){   // the super admin deleted an inactive account
    if (!(createdMs(a) > A.at)){
      log("deletedsignin", Object.assign({}, a, { course:c }), {});
      try { if (window.SDC_forget) window.SDC_forget(a); } catch(e){}
      return { ok:false, deleted:true, msg:MSG.deleted() };
    }
    A = null; if (L.reg && L.reg.ver <= L.assign.at) L.reg = null;   // a new account made after the deletion: start fresh
  }
  if (A && A.c !== c){ log("wrongcourse", Object.assign({}, a, { course:c }), { registered:A.c, byAdmin:true }); return { ok:false, msg:MSG.other(A.c, true), registered:A.c }; }
  if (!A && L.reg && L.reg.c !== c){ log("wrongcourse", Object.assign({}, a, { course:c }), { registered:L.reg.c }); return { ok:false, msg:MSG.other(L.reg.c, false), registered:L.reg.c }; }
  if (!L.reg) register(a.email, a.name, c, (A && A.g) || a.grade);
  const isNew = !!signup || (!!L.reg && L.reg.ver >= sinceMs());
  const vm = await verifyGate(a.email, "student", isNew);
  if (vm){ log("unverified", Object.assign({}, a, { course:c }), { signup:!!signup }); return { ok:false, verify:true, msg:vm }; }
  patchGate({ who:{ email:normEmail(a.email), name:a.name }, acct: acctOf(Object.assign({}, a, { course: c })) }); work(); setTimeout(showFeedbackButton, 800);
  if (!(g && g.logged)){ log(signup ? "signup" : "signin", Object.assign({}, a, { course:c }), { gate:g && g.mode }); patchGate({ logged:true }); }
  return { ok:true, assign:A };
}
/* ---------- email verification ----------
   New accounts (students and staff) must click a link sent to their @sisd.ae email before they can get in.
   The email is sent by the school's verification script (Google Apps Script). Accounts made before
   verification was switched on (VERIFY.since) keep working. Off while VERIFY.url is empty. */
const VERIFY = { url: "https://script.google.com/macros/s/AKfycbzYaxjHSKBzuhLJ3nkL7Qqb2BNL6nFHy7ojFnMTb_D2ZE5LbYRY2VnL5F_6gPGEbtqjsQ/exec", since: "2026-11-03T03:24:00Z" };
const verifyOn = () => !!VERIFY.url && !offline();
const sinceMs = () => Date.parse(VERIFY.since) || 0;
function jsonp(params, timeout){
  return new Promise((res, rej) => {
    const cb = "__sdv" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7), sc = document.createElement("script");
    const done = () => { clearTimeout(t); try { delete window[cb]; } catch(e){ window[cb] = undefined; } sc.remove(); };
    const t = setTimeout(() => { done(); rej(new Error("timeout")); }, timeout || 20000);
    window[cb] = r => { done(); res(r); }; sc.onerror = () => { done(); rej(new Error("reach")); };
    sc.src = VERIFY.url + (VERIFY.url.includes("?") ? "&" : "?") + new URLSearchParams(Object.assign({}, params, { cb, _: Date.now() })).toString();
    document.head.appendChild(sc);
  });
}
const VKEY = e => "sdc_ver_" + normEmail(e);
async function isVerified(email){
  try { if (localStorage.getItem(VKEY(email)) === "1") return true; } catch(e){}
  const r = await jsonp({ a:"status", e:normEmail(email) });
  if (r && r.verified){ try { localStorage.setItem(VKEY(email), "1"); } catch(e){} return true; }
  return false;
}
async function verifyStatuses(emails){ if (!verifyOn() || !emails.length) return {}; try { return await jsonp({ a:"statuses", list: emails.map(normEmail).slice(0, 60).join(",") }); } catch(e){ return {}; } }
async function startVerify(email, kind){ try { return await jsonp({ a:"start", e:normEmail(email), k:kind || "student" }, 30000); } catch(e){ return { ok:false, reason:"reach" }; } }
function verifyMsg(email, r){
  const e = `<b>${esc(normEmail(email))}</b>`;
  if (r && r.ok && r.sent) return `📧 <b>Check your SISD email.</b> We've sent a verification link to ${e}. Open it, press <b>Verify my email</b>, then come back and sign in. (Check your Junk folder if you can't see it.)`;
  if (r && r.ok && r.already) return `Your email is verified. Please sign in again.`;
  if (r && r.reason === "wait") return `📧 <b>Your email isn't verified yet.</b> A link was already sent to ${e} in the last hour. Open it and press <b>Verify my email</b>, then sign in.`;
  if (r && r.reason === "quota") return `Your email isn't verified yet, and no more verification emails can be sent today. Try again tomorrow, or ask your teacher.`;
  if (r && r.reason === "domain") return `Only SISD email addresses (ending in @sisd.ae) can be used.`;
  return `Your email isn't verified yet, and the verification email couldn't be sent just now. Check your internet connection and try again.`;
}
/* returns null when the person may continue, or a message explaining what to do */
async function verifyGate(email, kind, isNew){
  if (!verifyOn() || !isNew) return null;
  if (!/@sisd\.ae$/i.test(normEmail(email))) return verifyMsg(email, { reason:"domain" });
  let v = false; try { v = await isVerified(email); } catch(e){ return `Your email verification couldn't be checked just now. Check your internet connection and try again.`; }
  if (v) return null;
  return verifyMsg(email, await startVerify(email, kind));
}

/* Before creating an account: is this email free to sign up for this course? */
const createdMs = a => { const v = a && a.created; return typeof v === "number" ? v : Date.parse(v || "") || 0; };
/* has the super admin deleted this (old) account? Then signing up again is allowed and starts fresh */
async function isDeleted(email, name){ try { const L = await lookup(email, name); return !!(L.assign && L.assign.del); } catch(e){ return false; } }
async function canSignUp(email, name, c){
  if (offline() || isTester(email)) return { ok:true };
  let L = null; try { L = await lookup(email, name); } catch(e){ return { ok:true }; }
  if (L.assign && L.assign.del){ if (!L.reg || L.reg.ver <= L.assign.at) return { ok:true, deleted:true }; L.assign = null; }
  if (L.assign && L.assign.c !== c){ log("wrongcourse", { email, name, course:c }, { registered:L.assign.c, byAdmin:true, signup:true }); return { ok:false, msg:MSG.other(L.assign.c, true) }; }
  if (!L.assign && L.reg && L.reg.c !== c){ log("wrongcourse", { email, name, course:c }, { registered:L.reg.c, signup:true }); return { ok:false, msg:MSG.other(L.reg.c, false) }; }
  return { ok:true, assign:L.assign };
}

/* ---------- language: one choice for the portal, both courses and the admin pages ----------
   Uses Google's website translator. The choice is shared across all pages of the site (cookie on path /). */
const LANGS = { en:"English", fr:"Français", ru:"Русский", es:"Español" };
function getLang(){
  let c = null; try { c = localStorage.getItem("sdc_lang"); } catch(e){}
  if (!LANGS[c]){ const m = document.cookie.match(/googtrans=\/en\/([a-z]+)/); c = m && LANGS[m[1]] ? m[1] : "en"; }
  return c;
}
function langCookie(code){
  const exp = code === "en" ? "; expires=Thu, 01 Jan 1970 00:00:00 GMT" : "", v = code === "en" ? "" : "/en/" + code;
  document.cookie = `googtrans=${v}; path=/${exp}`;
  try { document.cookie = `googtrans=${v}; path=/; domain=${location.hostname}${exp}`; } catch(e){}
}
let gtLoaded = false;
function loadTranslator(){
  if (gtLoaded || offline()) return; gtLoaded = true;
  let host = document.getElementById("gtHost"); if (!host){ host = document.createElement("div"); host.id = "gtHost"; document.body.appendChild(host); }
  window.googleTranslateElementInit = () => { try { new google.translate.TranslateElement({ pageLanguage:"en", includedLanguages:"en,fr,ru,es", autoDisplay:false }, "gtHost"); } catch(e){} };
  const sc = document.createElement("script"); sc.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; document.body.appendChild(sc);
}
function setLang(code, first){
  if (!LANGS[code]) code = "en";
  try { localStorage.setItem("sdc_lang", code); } catch(e){}
  document.documentElement.lang = code; langCookie(code);
  document.querySelectorAll(".sdcLang select").forEach(x => { x.value = code; });
  if (code === "en"){ if (!first && gtLoaded) location.reload(); return; }
  loadTranslator();
  let tries = 0; const t = setInterval(() => { const sel = document.querySelector(".goog-te-combo");
    if (sel){ if (sel.value !== code){ sel.value = code; sel.dispatchEvent(new Event("change")); } clearInterval(t); } else if (++tries > 40) clearInterval(t); }, 250);
}
/* never translate code, program output, names typed by students or the language list itself */
const KEEP = "code,pre,textarea,.editor,.ed-wrap,.console,.gutter,.snip,#whoPill,.sdcLang,.notranslate-auto";
function protect(root){ (root || document).querySelectorAll(KEEP).forEach(e => { if (!e.classList.contains("notranslate")){ e.classList.add("notranslate"); e.setAttribute("translate", "no"); } }); }
function langPicker(dark){
  const c = dark ? "#fff" : "inherit", bd = dark ? "rgba(255,255,255,.35)" : "var(--line,#D8DEEA)";
  return `<label class="sdcLang notranslate" translate="no" title="Language" style="display:inline-flex;align-items:center;gap:5px;border:1px solid ${bd};border-radius:999px;padding:3px 10px;font:700 13px Arial,Helvetica,sans-serif;color:${c};cursor:pointer"><span aria-hidden="true">🌐</span><select aria-label="Language" style="background:transparent;border:0;color:${c};font:inherit;cursor:pointer;outline:none;padding:0;margin:0;min-height:0;height:auto;width:auto;box-shadow:none;border-radius:0">${Object.keys(LANGS).map(k => `<option value="${k}" style="color:#16223A" ${k === getLang() ? "selected" : ""}>${LANGS[k]}</option>`).join("")}</select></label>`;
}
function bindPickers(){ document.querySelectorAll(".sdcLang select").forEach(x => { if (!x.dataset.b){ x.dataset.b = 1; x.onchange = () => { if (typeof window.SDC_onLang === "function") window.SDC_onLang(x.value); else setLang(x.value); }; } }); }
(function initLang(){
  const css = document.createElement("style");
  css.textContent = "#gtHost,.goog-te-banner-frame,.skiptranslate>iframe,#goog-gt-tt,.goog-te-balloon-frame,.VIpgJd-ZVi9od-ORHb-OEVmcd,.VIpgJd-ZVi9od-aZ2wEe-wOHMyf{display:none!important}body{top:0!important}.goog-text-highlight{background:none!important;box-shadow:none!important}";
  document.head.appendChild(css);
  const start = () => {
    protect(); bindPickers();
    new MutationObserver(ms => { ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1 && !(n.classList && n.classList.contains("sdcTmp"))){ if (n.matches && n.matches(KEEP)) protect(n.parentNode || n); else protect(n); } })); bindPickers(); }).observe(document.body, { childList:true, subtree:true });
    if (!window.SDC_ownLang && getLang() !== "en") setLang(getLang(), true);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();

/* ---------- read aloud: any text section, in the chosen language ----------
   Reads the text as it is on screen, so after translation it reads the translated words, with a voice for that language. */
const VOICE = { en:"en-GB", fr:"fr-FR", ru:"ru-RU", es:"es-ES" };
const canSpeak = () => { try { return "speechSynthesis" in window; } catch(e){ return false; } };
let voices = {};
try { speechSynthesis.onvoiceschanged = () => { voices = {}; }; speechSynthesis.getVoices(); } catch(e){}
function voiceFor(code){
  try { if (voices[code] !== undefined) return voices[code];
    const want = VOICE[code] || "en-GB", base = want.slice(0, 2), vs = speechSynthesis.getVoices();
    // the most human-sounding voice this device offers: neural/natural voices first (Edge, Windows 11, Android),
    // then premium/enhanced Apple voices and Google's voices; robotic engines last
    const score = v => { const l = String(v.lang || "").replace("_", "-"), nm = String(v.name || ""); let n = l === want ? 20 : l.slice(0, 2) === base ? 12 : -999;
      if (/natural|neural|online/i.test(nm)) n += 40;
      if (/premium|enhanced|siri/i.test(nm)) n += 30;
      if (/^google/i.test(nm)) n += 22;
      if (/(samantha|daniel|serena|kate|karen|moira|tessa|libby|sonia|ryan|thomas|amelie|monica|jorge|paulina|milena|yuri)/i.test(nm)) n += 12;
      if (/espeak|robot|compact|novelty|whisper|bad news|bells|zarvox|trinoids|albert|bahh|boing|bubbles|cellos|deranged|hysterical|organ|superstar|jester|wobble|fred|junior|ralph|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i.test(nm)) n -= 60;
      if (!v.localService) n += 4;
      return n; };
    const best = vs.map(v => [score(v), v]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0])[0];
    return (voices[code] = best ? best[1] : null); } catch(e){ return null; }
}
function humanise(t){
  return String(t)
    .replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu, " ")   // emoji
    .replace(/([A-Za-z_][\w.]*)\(\)/g, "$1")                       // print() -> print
    .replace(/[→←↑↓•·|▶✓✔✗✘⬜⬛#*_~^`]+/g, ", ")
    .replace(/\s*[-–—]\s+/g, ", ").replace(/\.{3}|…/g, ". ")
    .replace(/\(([^)]*)\)/g, ", $1, ")                                // brackets become a short pause
    .replace(/\s*,\s*(,\s*)+/g, ", ").replace(/,\s*([.!?])/g, "$1")
    .replace(/\s+/g, " ").replace(/\s+([,.!?;:])/g, "$1").replace(/^[,\s]+/, "").trim();
}
function chunksOf(text){
  const parts = String(text).replace(/\s+/g, " ").trim().match(/[^.!?;:]+[.!?;:]*\s*/g) || [];
  const out = []; let cur = "";
  parts.forEach(p => { if ((cur + p).length > 220 && cur){ out.push(cur); cur = ""; } cur += p; });
  if (cur.trim()) out.push(cur); return out;
}
let readTok = 0, readBtn = null;
function setBtn(b, on){ if (!b) return; b.setAttribute("aria-pressed", on ? "true" : "false"); if (b.classList.contains("sdcListen")) b.innerHTML = (on ? STOP_ICON : SPEAKER) + (b.classList.contains("sdcPage") ? `<span class="sdcLt">${on ? "Stop" : "Read to me"}</span>` : ""); b.title = on ? "Stop reading" : (b.dataset.label || "Read this aloud"); const t = b.querySelector(".sdcLt"); if (t && !b.classList.contains("sdcPage")) t.textContent = on ? "Stop" : (b.dataset.label || "Listen"); }
function stopReading(){ readTok++; narrTok++; try { speechSynthesis.cancel(); } catch(e){} setBtn(readBtn, false); readBtn = null; }
function speak(text, onend){
  if (!canSpeak()) return false;
  const my = ++readTok; try { speechSynthesis.cancel(); } catch(e){}
  const code = getLang(), v = voiceFor(code), list = chunksOf(humanise(text)); let i = 0;
  const next = () => { if (my !== readTok) return; if (i >= list.length){ onend && onend(); return; }
    const u = new SpeechSynthesisUtterance(list[i++]); u.lang = VOICE[code] || "en-GB"; if (v) u.voice = v; u.rate = /natural|neural|online|premium|enhanced/i.test(v ? v.name : "") ? 1 : 0.93; u.pitch = 1;
    let done = false; const fin = () => { if (!done){ done = true; setTimeout(next, 220); } }; u.onend = fin; u.onerror = fin; setTimeout(fin, Math.max(8000, u.text.length * 120));   // a short breath between sentences
    speechSynthesis.speak(u); };
  next(); return true;
}
const SKIP = ".sdcNoRead,.nav,.actions,.counter,.dots,.steps,.pts,.tag,#stepBody > div.muted,.sdcPageBar,button,.sdcListen,.sdcLang,input,select,textarea,svg,img,canvas,video,script,style,.console,.editor,.ed-wrap,.gutter,.snip,.listen,[aria-hidden=true],.hidden,[hidden]";
function textOf(el){
  const c = el.cloneNode(true); c.querySelectorAll(SKIP).forEach(n => n.remove());
  const box = document.createElement("div"); box.className = "sdcTmp notranslate"; box.setAttribute("translate", "no"); box.setAttribute("aria-hidden", "true");
  box.style.cssText = "position:absolute;left:-10000px;top:0;width:700px"; box.appendChild(c); document.body.appendChild(box);
  const t = box.innerText; box.remove(); return t.replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu, " ");
}
/* ---------- narrator for the course videos ----------
   A calm, natural voice: the best neural/natural voice on the device (male or female, the student's choice),
   spoken sentence by sentence with short breaths between them, at an easy pace, in the chosen language. */
const NARR_KEY = "sdc_narrator";
const MALE = /(guy|ryan|thomas|andrew|brian|christopher|eric|roger|steffan|davis|tony|jason|william|liam|elliot|alfie|oliver|noah|ethan|daniel|arthur|aaron|fred|alex|tom|rishi|lee|george|henri|remy|jorge|alvaro|dmitry|pavel|google uk english male|\bmale\b)/i;
const FEMALE = /(aria|jenny|sonia|libby|maisie|emma|ava|michelle|natasha|clara|hollie|abbi|bella|samantha|serena|kate|karen|moira|tessa|martha|stephanie|denise|elvira|svetlana|dariya|amelie|monica|paulina|google uk english female|google us english|\bfemale\b)/i;
function narrator(){ try { return localStorage.getItem(NARR_KEY) === "female" ? "female" : "male"; } catch(e){ return "male"; } }
function setNarrator(g){ try { localStorage.setItem(NARR_KEY, g === "female" ? "female" : "male"); } catch(e){} narrVoices = {}; }
let narrVoices = {};
try { speechSynthesis.addEventListener("voiceschanged", () => { narrVoices = {}; }); } catch(e){}
function narrVoice(code){
  const g = narrator(), key = code + "|" + g;
  try { if (narrVoices[key] !== undefined) return narrVoices[key];
    const want = VOICE[code] || "en-GB", base = want.slice(0, 2), vs = speechSynthesis.getVoices();
    const score = v => { const l = String(v.lang || "").replace("_", "-"), nm = String(v.name || ""); let n = l === want ? 20 : l.slice(0, 2) === base ? 12 : -999;
      if (/natural|neural/i.test(nm)) n += 60; else if (/online/i.test(nm)) n += 40;
      if (/premium|enhanced|siri/i.test(nm)) n += 45;
      if (/^google/i.test(nm)) n += 25;
      if ((g === "male" ? MALE : FEMALE).test(nm)) n += 30; else if ((g === "male" ? FEMALE : MALE).test(nm)) n -= 10;
      if (/espeak|robot|compact|novelty|whisper|bad news|bells|zarvox|trinoids|albert|bahh|boing|bubbles|cellos|deranged|hysterical|organ|superstar|jester|wobble|junior|ralph|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i.test(nm)) n -= 80;
      if (!v.localService) n += 4;
      return n; };
    const best = vs.map(v => [score(v), v]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0])[0];
    return (narrVoices[key] = best ? best[1] : null); } catch(e){ return null; }
}
let narrTok = 0;
function stopNarrating(){ narrTok++; try { speechSynthesis.cancel(); } catch(e){} }
/* narrate(text, {onend}) → true if speaking. Translates first when another language is chosen. */
function narrate(text, opts){
  opts = opts || {};
  if (!canSpeak() || !String(text || "").trim()){ opts.onend && opts.onend(); return false; }
  stopReading(); const my = ++narrTok;
  const code = getLang();
  const go = tt => {
    if (my !== narrTok) return;
    const v = narrVoice(code), natural = /natural|neural|online|premium|enhanced|siri|^google/i.test(v ? v.name : "");
    const list = []; chunksOf(humanise(tt)).forEach(c => (c.match(/[^.!?]+[.!?]*\s*/g) || [c]).forEach(x => { if (x.trim()) list.push(x.trim()); }));
    let i = 0;
    const next = () => { if (my !== narrTok) return; if (i >= list.length){ opts.onend && opts.onend(); return; }
      const t = list[i++], u = new SpeechSynthesisUtterance(t); u.lang = VOICE[code] || "en-GB"; if (v) u.voice = v;
      u.rate = (natural ? 0.97 : 0.92) * (opts.rate || 1); u.pitch = natural ? 1 : (narrator() === "male" ? 0.92 : 1.02); u.volume = 1;
      const pause = /[?!]$/.test(t) ? 420 : /[.]$/.test(t) ? 360 : 200;   // a breath between sentences, like a person talking
      let done = false; const fin = () => { if (!done){ done = true; setTimeout(next, pause); } }; u.onend = fin; u.onerror = fin; setTimeout(fin, Math.max(7000, t.length * 130));
      speechSynthesis.speak(u); };
    next();
  };
  if (code === "en") go(text); else translateText(humanise(text), code).catch(() => text).then(go);
  return true;
}
/* Speak in the chosen language: the text is translated first (not just read in English with a foreign voice).
   Uses Google's translation service directly, so it works even if the page itself hasn't finished translating. */
const TCACHE = new Map();
async function translateText(text, code){
  if (code === "en" || !text.trim()) return text;
  const parts = String(text).replace(/\s+/g, " ").match(/[^.!?]+[.!?]*\s*/g) || [text], batches = []; let cur = "";
  parts.forEach(p => { if ((cur + p).length > 1200 && cur){ batches.push(cur); cur = ""; } cur += p; }); if (cur) batches.push(cur);
  const out = [];
  for (const q of batches){
    const key = code + "|" + q;
    if (!TCACHE.has(key)){
      const r = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${code}&dt=t&q=${encodeURIComponent(q)}`);
      if (!r.ok) throw new Error("translate");
      const j = await r.json(); TCACHE.set(key, ((j && j[0]) || []).map(x => x && x[0] || "").join(""));
    }
    out.push(TCACHE.get(key));
  }
  return out.join(" ");
}
function readEl(el, b){
  if (b && b.getAttribute("aria-pressed") === "true"){ stopReading(); return; }
  try { if (typeof window.SDC_beforeRead === "function") window.SDC_beforeRead(); } catch(e){}
  stopReading();
  const h = el.previousElementSibling, head = h && /^H[1-4]$/.test(h.tagName) && !h.querySelector(".sdcListen") ? textOf(h).trim() : "";
  const t = (head ? head + ". " : "") + textOf(el); if (!t.trim()) return;
  readBtn = b; setBtn(b, true);
  const my = readTok, code = getLang(), done = () => { setBtn(b, false); if (readBtn === b) readBtn = null; };
  translateText(humanise(t), code).catch(() => t).then(tt => { if (my !== readTok) return; if (!speak(tt, done)) done(); });
}
const STOP_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor"/></svg>';
const SPEAKER = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
function listenButton(inButton){
  // inside a clickable card the speaker is a span, so it never opens the card
  const b = document.createElement(inButton ? "span" : "button"); if (!inButton) b.type = "button"; else { b.setAttribute("role", "button"); b.tabIndex = 0; }
  b.className = "sdcListen notranslate"; b.setAttribute("translate", "no"); b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-label", "Read this aloud"); b.title = "Read this aloud";
  b.innerHTML = SPEAKER; return b;
}
let LISTEN_SEL = null, LISTEN_FINE = "", LISTEN_WHOLE = false;
let scanning = false;
function addListen(root){
  if (!LISTEN_SEL || !canSpeak() || scanning) return;
  scanning = true;
  try {
    const els = new Map();   // element -> fine (allowed inside a section that already reads itself, e.g. one question of a task)
    const add = (list, fine) => String(list || "").split(",").map(x => x.trim()).filter(Boolean).forEach(sel => { try { root.querySelectorAll(sel).forEach(e => { if (!els.has(e) || fine) els.set(e, fine); }); } catch(e){} });   // one bad selector never stops the rest
    add(LISTEN_SEL, false); add(LISTEN_FINE, true);
    const matches = el => String(LISTEN_SEL || "").split(",").some(x => { try { return x.trim() && el.matches(x.trim()); } catch(e){ return false; } });
    document.querySelectorAll(".sdcPageBar").forEach(bar => { const t = bar.nextElementSibling; if (!t || !matches(t)){ if (readBtn && bar.contains(readBtn)) stopReading(); bar.remove(); } });
    document.querySelectorAll(".sdcListen.sdcPage").forEach(b => { if (b.closest(".sdcPageBar")) return; const t = b.parentElement; if (t && !matches(t)){ if (readBtn === b) stopReading(); b.remove(); } });
    els.forEach((fine, el) => {
      if (el.closest("#sdcStrip,.sdcTmp,pre,code,textarea") || el.querySelector(":scope > .sdcListen") || el.querySelector(":scope > .listen")) return;
      if (el.previousElementSibling && el.previousElementSibling.classList.contains("sdcPageBar")) return;
      if (!LISTEN_WHOLE && (el.hasAttribute("data-read") || el.querySelector("[data-read]"))) return;   // the Design course reads these sections with its own speaker
      if (!LISTEN_WHOLE && !fine && el.closest("[data-read]")) return;
      if (String(el.textContent || "").replace(/\s+/g, " ").trim().length < (fine ? 12 : 25)) return;
      const inBtn = el.tagName === "BUTTON" || !!el.closest("button"), b = listenButton(inBtn);
      if (LISTEN_WHOLE){ b.classList.add("sdcPage"); b.dataset.label = "Read this page to me"; b.innerHTML = SPEAKER + '<span class="sdcLt">Read to me</span>'; }
      const go = e => { e.stopPropagation(); e.preventDefault(); readEl(el, b); };
      b.addEventListener("click", go); b.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") go(e); });
      if (LISTEN_WHOLE === "bar"){   // a page button sits in its own row just above the page content, so it never squeezes the layout
        const bar = document.createElement("div"); bar.className = "sdcPageBar notranslate"; bar.setAttribute("translate", "no"); bar.appendChild(b);
        if (el.parentNode) el.parentNode.insertBefore(bar, el); return; }
      el.prepend(b);
    });
  } finally { scanning = false; }
}
/* sels: CSS selectors of text sections that get their own Listen button */
/* whole = true: one speaker per page (the selectors name each page's main content) */
function listen(sels, fine, whole){
  LISTEN_SEL = sels; LISTEN_FINE = fine || ""; LISTEN_WHOLE = whole === "bar" ? "bar" : !!whole;
  const css = document.createElement("style");
  css.textContent = ".sdcListen{float:right;margin:0 0 6px 10px;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:1px solid rgba(27,45,78,.25);background:#E9EDF5;color:#1B2D4E;border-radius:50%;cursor:pointer;line-height:1;position:relative;z-index:2;flex:none}.sdcPageBar{display:flex;justify-content:flex-end;margin:0 0 8px}.sdcPageBar .sdcListen{float:none;margin:0}.sdcListen.sdcPage{width:auto;height:36px;padding:0 14px 0 12px;border-radius:999px;gap:7px;font:800 13.5px Arial,Helvetica,sans-serif;background:#1B2D4E;color:#fff;border-color:#1B2D4E}.sdcListen.sdcPage .sdcLt{display:inline}.sdcListen:hover{background:#1B2D4E;color:#fff}.sdcListen[aria-pressed=true]{background:#DC2B3E;border-color:#DC2B3E;color:#fff;animation:sdcPulse 1.2s ease-in-out infinite}@keyframes sdcPulse{50%{box-shadow:0 0 0 6px rgba(220,43,62,.18)}}.sdcListen:focus-visible{outline:3px solid #DC2B3E;outline-offset:2px}.sdcListen[aria-pressed=true]{background:#DC2B3E;border-color:#DC2B3E;color:#fff}@media (prefers-color-scheme: dark){.sdcListen{background:#1D2A47;color:#E7ECF6;border-color:#2A3858}}";
  document.head.appendChild(css);
  const ours = n => n.nodeType !== 1 || (n.classList && (n.classList.contains("sdcTmp") || n.classList.contains("sdcListen") || n.classList.contains("sdcPageBar")));
  const run = () => { addListen(document); let t = null;
    new MutationObserver(ms => { if (scanning || ms.every(m => [...m.addedNodes, ...m.removedNodes].every(ours))) return;   // ignore our own changes
      clearTimeout(t); t = setTimeout(() => addListen(document), 250); }).observe(document.body, { childList:true, subtree:true }); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  window.addEventListener("pagehide", stopReading);
}

/* ---------- the strip at the top of each course page ---------- */
function strip(c, onSignOut, noLang, mainSel){
  if (document.getElementById("sdcStrip")) return;
  const C = course(c); if (!C) return;
  const d = document.createElement("div"); d.id = "sdcStrip";
  d.setAttribute("style", "background:#0f1c33;color:#fff;font:600 13px/1.3 Arial,Helvetica,sans-serif;padding:6px 14px;display:flex;gap:8px 10px;align-items:center;flex-wrap:wrap;position:fixed;top:0;left:0;right:0;z-index:2147483000;box-shadow:0 1px 4px rgba(0,0,0,.25)");
  d.innerHTML = `<style>@media(max-width:560px){#sdcStrip .sdcHide{display:none}}</style><span style="background:#DC2B3E;border-radius:5px;padding:2px 7px;font-weight:900;letter-spacing:.04em">SISD</span><span class="sdcHide">Design and Computing</span><span class="sdcHide" style="opacity:.6">·</span><span>You are in: <b>${esc(C.name)}</b></span>
    <span style="margin-left:auto;display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap">${noLang ? "" : langPicker(true)}</span><button type="button" id="sdcLeave" style="background:none;border:1px solid rgba(255,255,255,.35);color:#fff;border-radius:999px;padding:3px 10px;font:inherit;cursor:pointer">Change course / sign out</button>`;
  document.body.insertBefore(d, document.body.firstChild); bindPickers(); setTimeout(showFeedbackButton, 1500);
  const rp = document.getElementById("sdcReadPage");
  if (rp) rp.onclick = () => { const m = [...document.querySelectorAll(mainSel || "main, #app")].find(e => e.offsetParent !== null) || document.body; readEl(m, rp); };
  // the strip stays fixed at the top of every page: push the page (and its own sticky header) down by its height
  const css = document.createElement("style"); document.head.appendChild(css);
  const sticky = [...document.querySelectorAll("body *")].filter(e => e !== d && !d.contains(e) && /sticky|fixed/.test(getComputedStyle(e).position) && getComputedStyle(e).top === "0px" && e.getBoundingClientRect().height < 220);
  sticky.forEach(e => e.classList.add("sdc-under"));
  const fit = () => { const h = Math.ceil(d.getBoundingClientRect().height); css.textContent = `body{padding-top:${h}px!important}.sdc-under{top:${h}px!important}html{scroll-padding-top:${h + 70}px}`; };
  fit(); try { new ResizeObserver(fit).observe(d); } catch(e){ window.addEventListener("resize", fit); }
  document.getElementById("sdcLeave").onclick = () => { if (onSignOut) onSignOut(); else leave("out"); };
}
function signedOutNotice(msg, kind){ try { sessionStorage.setItem("sdc_msg", JSON.stringify({ msg, kind: kind || "bad" })); } catch(e){} }

return { PORTAL, COURSES, course, courseLabel, gate, setGate, patchGate, clearGate, require, leave, ay, rolled, freshSwitches, confirm, canSignUp, isDeleted, isTester, testerPw, TESTERS, DELETED, lookup, register,
  log, task, strip, signedOutNotice, VERIFY, verifyOn, isVerified, verifyStatuses, startVerify, verifyMsg, verifyGate, sinceMs, work, WORK_GOAL_MIN, CONTROL, canon, verifyState, loadState, csvRows, surname, sameTeacher, teacherNames, sendFeedback, getFeedback, showFeedbackButton, LANGS, getLang, setLang, langPicker, listen, stopReading, speak, narrate, stopNarrating, narrator, setNarrator, idOf, keyOf, rows, sendRow, verify, flush, esc, offline, _internal:{ e64, d64, u8ToB64Text, b64ToText, SYNC, LOG } };
})();
