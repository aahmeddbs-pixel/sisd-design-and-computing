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
  try { await fetch(action, { method:"POST", mode:"no-cors", body:p, keepalive: !!keep && p.toString().length < 60000 }); return true; } catch(e){ return false; }
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
async function column(){
  if (COL) return COL;
  const r = await gviz("select * limit 30"), cols = (r.table && r.table.cols) || [], rows = (r.table && r.table.rows) || [];
  let i = cols.findIndex((x, j) => rows.some(row => String(((row.c || [])[j] || {}).v || "").startsWith("PPS2|")));
  if (i < 0) i = cols.findIndex(x => /^\s*data\s*$/i.test(x.label || ""));
  if (i < 0) i = Math.min(1, cols.length - 1);
  return (COL = { col: cols[i].id, time: cols[0].id });
}
async function rows(kind, id, limit){
  const c = await column(), r = await gviz(`select ${c.col} where ${c.col} starts with 'PPS2|${kind}|${id}|' order by ${c.time} desc limit ${limit || 30}`);
  const out = [];
  ((r.table && r.table.rows) || []).forEach(row => { const p = String(((row.c || [])[0] || {}).v || "").split("|"); if (p.length >= 7) out.push({ ver:+p[3], text:p.slice(6).join("|") }); });
  return out;   // newest first
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
function task(a, title, w, kind){ log("task", a, { task:{ t:String(title || "").slice(0, 120), w:+w || 1, kind:kind || "task" } }); }

/* ---------- checks used by the course pages ---------- */
const MSG = {
  other: (c, by) => `This account is registered for <b>${esc(courseLabel(c))}</b>${by ? " by your teacher" : ""}, not the course you chose. You can only see the course you are registered for. If this is wrong, ask your teacher: only they can change your course.`,
  grade: g => `IT is only for Grade 10, and this account is registered for Grade ${esc(g)}. Sign out and choose your own course.`
};
/* After a successful sign-in or sign-up inside a course page.
   a = {course, email, name, grade, teacher, level, cls}; signup = true right after creating the account.
   Resolves {ok:true, assign} (assign = the admin's latest settings, to apply) or {ok:false, msg}. */
async function confirm(a, signup){
  const g = gate();
  const c = a.course || (g && g.course);
  if (offline()) return { ok:true, assign:null };
  let L = null;
  try { L = await lookup(a.email, a.name); } catch(e){ L = null; }
  if (!L){ // sheet unreachable: let them in, it is checked again next time
    if (!(g && g.logged)) { log("signin", Object.assign({}, a, { course:c }), { gate:g && g.mode, unchecked:true }); patchGate({ logged:true }); }
    return { ok:true, assign:null };
  }
  const A = L.assign;
  if (A && A.c !== c){ log("wrongcourse", Object.assign({}, a, { course:c }), { registered:A.c, byAdmin:true }); return { ok:false, msg:MSG.other(A.c, true), registered:A.c }; }
  if (!A && L.reg && L.reg.c !== c){ log("wrongcourse", Object.assign({}, a, { course:c }), { registered:L.reg.c }); return { ok:false, msg:MSG.other(L.reg.c, false), registered:L.reg.c }; }
  if (!L.reg) register(a.email, a.name, c, (A && A.g) || a.grade);
  if (!(g && g.logged)){ log(signup ? "signup" : "signin", Object.assign({}, a, { course:c }), { gate:g && g.mode }); patchGate({ logged:true }); }
  return { ok:true, assign:A };
}
/* Before creating an account: is this email free to sign up for this course? */
async function canSignUp(email, name, c){
  if (offline()) return { ok:true };
  let L = null; try { L = await lookup(email, name); } catch(e){ return { ok:true }; }
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
  return `<label class="sdcLang notranslate" translate="no" title="Language" style="display:inline-flex;align-items:center;gap:5px;border:1px solid ${bd};border-radius:999px;padding:3px 10px;font:700 13px Arial,Helvetica,sans-serif;color:${c};cursor:pointer"><span aria-hidden="true">🌐</span><select aria-label="Language" style="background:transparent;border:0;color:${c};font:inherit;cursor:pointer;outline:none">${Object.keys(LANGS).map(k => `<option value="${k}" style="color:#16223A" ${k === getLang() ? "selected" : ""}>${LANGS[k]}</option>`).join("")}</select></label>`;
}
function bindPickers(){ document.querySelectorAll(".sdcLang select").forEach(x => { if (!x.dataset.b){ x.dataset.b = 1; x.onchange = () => { if (typeof window.SDC_onLang === "function") window.SDC_onLang(x.value); else setLang(x.value); }; } }); }
(function initLang(){
  const css = document.createElement("style");
  css.textContent = "#gtHost,.goog-te-banner-frame,.skiptranslate>iframe,#goog-gt-tt,.goog-te-balloon-frame,.VIpgJd-ZVi9od-ORHb-OEVmcd,.VIpgJd-ZVi9od-aZ2wEe-wOHMyf{display:none!important}body{top:0!important}.goog-text-highlight{background:none!important;box-shadow:none!important}";
  document.head.appendChild(css);
  const start = () => {
    protect(); bindPickers();
    new MutationObserver(ms => { ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1){ if (n.matches && n.matches(KEEP)) protect(n.parentNode || n); else protect(n); } })); bindPickers(); }).observe(document.body, { childList:true, subtree:true });
    if (!window.SDC_ownLang && getLang() !== "en") setLang(getLang(), true);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();

/* ---------- the strip at the top of each course page ---------- */
function strip(c, onSignOut, noLang){
  if (document.getElementById("sdcStrip")) return;
  const C = course(c); if (!C) return;
  const d = document.createElement("div"); d.id = "sdcStrip";
  d.setAttribute("style", "background:#0f1c33;color:#fff;font:600 13px/1.3 Arial,Helvetica,sans-serif;padding:6px 14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;position:relative;z-index:30");
  d.innerHTML = `<span style="background:#DC2B3E;border-radius:5px;padding:2px 7px;font-weight:900;letter-spacing:.04em">SISD</span><span>Design and Computing</span><span style="opacity:.6">·</span><span>You are in: <b>${esc(C.name)}</b></span>
    ${noLang ? "" : `<span style="margin-left:auto">${langPicker(true)}</span>`}<button type="button" id="sdcLeave" style="${noLang ? "margin-left:auto;" : ""}background:none;border:1px solid rgba(255,255,255,.35);color:#fff;border-radius:999px;padding:3px 10px;font:inherit;cursor:pointer">Change course / sign out</button>`;
  document.body.insertBefore(d, document.body.firstChild); bindPickers();
  document.getElementById("sdcLeave").onclick = () => { if (onSignOut) onSignOut(); else leave("out"); };
}
function signedOutNotice(msg){ try { sessionStorage.setItem("sdc_msg", msg); } catch(e){} }

return { PORTAL, COURSES, course, courseLabel, gate, setGate, patchGate, clearGate, require, leave, confirm, canSignUp, lookup, register,
  log, task, strip, signedOutNotice, LANGS, getLang, setLang, langPicker, idOf, keyOf, rows, sendRow, verify, flush, esc, offline, _internal:{ e64, d64, u8ToB64Text, b64ToText, SYNC, LOG } };
})();
