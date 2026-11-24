/* Study Plus UK · Exam practice papers with instant feedback.
   Original exam-style papers in each board's format (command words, marks). The student types an answer and presses
   Assess: the answer is checked against the mark scheme's creditworthy points, and the feedback shows the marks gained,
   what earned them, what was missing, how the answer was structured, and a better structure for that command word.
   Kinds: "long" (mark-scheme points), "num" (final answer + method marks), "write" (extended writing, criteria estimate). */
(function(){
"use strict";
const X = window.UK_EXAM = window.UK_EXAM || { papers:{}, areaOf:{} };

/* ---------- authoring helpers used by uk/exam-y8.js and uk/exam-y10.js ---------- */
X.paper = (area, id, title, info, qs, board) => { (X.papers[area] = X.papers[area] || []).push({ area, id, title, info, board: board || "", qs: qs.map((q, i) => Object.assign({ id: id + "-" + (i + 1), n: i + 1 }, q)) }); };
/* q(topic, command, marks, question, points, model, extra) — points: [[marks, "alt|alt&alt", "what earns it"], ...] */
X.q = (t, c, m, q, p, a, ex) => Object.assign({ t, c, m, q, p, a, k:"long" }, ex || {});
/* n(topic, marks, question, value, tolerance, unit, methodPoints, model) */
X.n = (t, m, q, v, tol, unit, p, a, ex) => Object.assign({ t, c:"calculate", m, q, v, tol, unit, p, a, k:"num" }, ex || {});
/* w(topic, marks, task, form, words[min,max], features [[pattern,label]], model) */
X.w = (t, m, q, form, words, f, a) => ({ t, c:"write", m, q, form, words, f, a, k:"write" });
X.map = (area, keys) => keys.forEach(k => X.areaOf[k] = area);

/* ---------- text normalising and matching ---------- */
const words = s => " " + String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’‘`']/g, " ").replace(/(\d),(\d{3})/g, "$1$2").replace(/(\d)\.(\d)/g, "$1·$2").replace(/[^a-z0-9·%'؀-ۿ]+/g, " ").replace(/·/g, ".").replace(/\s+/g, " ") + " ";
const compact = s => String(s || "").toLowerCase().replace(/[−–—]/g, "-").replace(/(\d)\s*[x×·∙]\s*(?=\d|\()/g, "$1*").replace(/×/g, "*").replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => "^" + [...m].map(c => "⁻⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c) === 0 ? "-" : String("⁻⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c) - 1)).join("")).replace(/÷/g, "/").replace(/\s+/g, "");
function has(text, alt){ alt = alt.trim().toLowerCase(); if (!alt) return false;
  if (/[*^=+\/()<>]|\d[a-z]|^-/.test(alt)) return text.c.indexOf(compact(alt)) >= 0;
  return text.w.indexOf(" " + words(alt).trim()) >= 0; }
/* pattern: "a&b|c" = (a AND b) OR c; brackets group alternatives: "x&(y|z)" */
function splitTop(s, ch){ const out = []; let d = 0, cur = ""; for (const c of s){ if (c === "(") d++; if (c === ")") d--; if (c === ch && d === 0){ out.push(cur); cur = ""; } else cur += c; } out.push(cur); return out; }
const unwrap = g => /^\(.*\)$/.test(g) && (g.includes("|") || /^\([a-z\s'-]+\)$/i.test(g)) ? g.slice(1, -1) : g;
const matches = (text, pat) => splitTop(String(pat), "|").some(alt => splitTop(alt, "&").every(g => { g = unwrap(g.trim()); return g.includes("|") ? splitTop(g, "|").some(a => has(text, a)) : has(text, g); }));
const T = s => ({ w: words(s), c: compact(s), raw: String(s || "") });
function numbersIn(s){ const out = []; String(s || "").replace(/[−–]/g, "-").replace(/(\d),(\d{3})/g, "$1$2").replace(/(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)|(-?\d*\.?\d+)/g, (m, a, b, c) => { out.push(a != null ? +a / +b : +c); return m; }); return out.filter(v => isFinite(v)); }

/* ---------- structure: what each command word needs ---------- */
const CMD = {
  state:   { tip:"Short and precise: one fact per mark. No need for full sentences or explanation.", tpl:"Fact 1. Fact 2." },
  give:    { tip:"Short and precise: one fact per mark.", tpl:"Fact 1. Fact 2." },
  name:    { tip:"Just the name or term, spelled correctly.", tpl:"The term." },
  identify:{ tip:"Pick out the exact thing asked for: a word, a feature, a quotation.", tpl:"The feature." },
  define:  { tip:"A precise meaning, ideally with the key scientific / subject term.", tpl:"X is … (key term), for example …" },
  describe:{ tip:"Say what it is like or what happens: one clear detail per mark, with key terms. You don't need to explain why.", tpl:"Detail 1 (key term) → detail 2 → detail 3, using figures or examples where you can." },
  outline: { tip:"Brief summary of the main points, one per mark.", tpl:"Point 1. Point 2. Point 3." },
  explain: { tip:"Give reasons. Every point needs a 'because' / 'so' / 'this means' that shows HOW or WHY.", tpl:"Point → because … → so / this means … (repeat for each mark pair)." },
  suggest: { tip:"Apply what you know to a new situation and give a reason for each suggestion.", tpl:"Suggestion → because …" },
  compare: { tip:"Say how BOTH things are similar AND/OR different, in the same sentence, using comparison words.", tpl:"A is … whereas B is … Both A and B … However, A … more/less than B." },
  calculate:{ tip:"Show every step of working, then the final answer with units. Method marks are given even if the final answer is wrong.", tpl:"Formula → substitute the numbers → work it out → answer with units (and rounding asked for)." },
  analyse: { tip:"Point, Evidence (a short quotation), Explain the effect of specific words/techniques on the reader.", tpl:"The writer shows … → \"short quote\" → the word '…' / the technique … suggests … → the reader feels …" },
  evaluate:{ tip:"Look at both sides, back each with evidence, then give a clear judgement with a reason.", tpl:"Argument for + evidence → argument against + evidence → \"Overall, I think … because …\"" },
  discuss: { tip:"Explore different points of view with evidence, then conclude.", tpl:"Point of view 1 + evidence → point of view 2 + evidence → conclusion." },
  justify: { tip:"Make a decision and support it with reasons and evidence (and say why the alternative is weaker).", tpl:"My choice is … because … Evidence … This is better than … because …" },
  "how far": { tip:"A judgement on 'how far' / 'to what extent': agree, then disagree, then decide with a reason.", tpl:"To some extent … because … However … because … Overall, to a large / small extent because …" },
  translate:{ tip:"Every word counts: keep the tense, the subject and small words (articles, possessives).", tpl:"Word-for-word meaning, then make it sound natural." },
  write:   { tip:"Plan, then write in paragraphs with a clear opening and ending, varied sentences and ambitious vocabulary.", tpl:"Opening hook → 3–4 developed paragraphs (topic sentence + detail) → strong ending." }
};
const ALIAS = { list:"state", what:"state", which:"identify", label:"name", find:"identify", select:"identify", show:"calculate", "work out":"calculate", "how many":"calculate", assess:"evaluate", "to what extent":"how far", examine:"analyse", consider:"discuss", recommend:"justify", predict:"suggest", complete:"give", deduce:"suggest", interpret:"analyse" };
const cmdOf = c => CMD[c] ? c : CMD[ALIAS[c]] ? ALIAS[c] : "describe";
const RE = {
  reason: /\b(because|so that|so |therefore|this means|which means|this leads|which leads|leading to|as a result|due to|this causes|causing|resulting|in order to|since|thus|hence|consequently|meaning that)\b/gi,
  compare: /\b(whereas|while|however|both|similarly|unlike|compared|more than|less than|than|on the other hand|in contrast|likewise)\b/gi,
  judge: /\b(overall|in conclusion|to conclude|on balance|most important|the main reason|to a (large|great|small|limited) extent|i (think|believe|agree|disagree)|therefore)\b/gi,
  balance: /\b(however|on the other hand|but|although|although|despite|nevertheless|whereas|alternatively)\b/gi,
  example: /\b(for example|for instance|such as|e\.g\.|eg|like when)\b/gi,
  effect: /\b(suggests?|implies|shows?|emphasi[sz]es|highlights?|creates?|makes the reader|reader|conveys|connotations?|evokes?|reflects)\b/gi,
  technique: /\b(metaphor|simile|personification|alliteration|onomatopoeia|repetition|rhetorical question|hyperbole|imagery|adjective|verb|adverb|noun|semantic field|contrast|juxtaposition|list|triplet|rule of three|short sentence|emotive|first person|tone|pathetic fallacy|sibilance|direct address|statistic|fact|opinion)\b/gi,
  units: /(\b(cm|mm|m|km|kg|g|mg|s|ms|min|h|n|j|kj|w|kw|v|a|pa|kpa|°c|k|mol|dm|cm3|cm\^3|m\/s|m\/s2|g\/cm3|kg\/m3|%)\b|£|\$|°|cm²|m²|cm³|m³)/gi
};
const count = (s, re) => (String(s).match(re) || []).length;

function structure(q, ans){
  const c = cmdOf(q.c), C = CMD[c], text = String(ans || "").trim(), wc = (text.match(/\S+/g) || []).length;
  const sents = text.split(/(?<=[.!?])\s+|\n+/).filter(x => x.trim().length > 2).length, good = [], fix = [];
  const wordy = ["describe","outline","explain","suggest","compare","analyse","evaluate","discuss","justify","how far"].includes(c);
  const expect = q.k === "write" ? (q.words || [250, 400])[0] : (q.m <= 2 || !wordy) ? 0 : Math.round(q.m * (["explain","evaluate","discuss","how far","analyse","justify","compare"].includes(c) ? 14 : 9));
  if (expect && wc < expect * 0.45) fix.push(`It's too short for ${q.m} marks: aim for about ${expect}+ words so you can make enough points.`);
  else if (expect && wc >= expect * 0.8) good.push("Good length for the marks available.");
  if (["state","give","name","identify","define"].includes(c) && wc > 30 * q.m + 15) fix.push("This only needs short answers: long explanations waste time in the exam.");
  if (["describe","outline"].includes(c)){ if (q.m >= 3 && sents < Math.ceil(q.m / 2)) fix.push(`Add more separate details: about one detail per mark (${q.m} marks).`); else if (sents) good.push("Clear separate details."); }
  if (["explain","suggest","justify"].includes(c) || (c === "evaluate") || c === "how far" || c === "discuss"){
    const r = count(text, RE.reason);
    if (r >= Math.max(1, Math.floor(q.m / 3))) good.push(`You linked points to reasons (${r} × because/so/this means).`);
    else fix.push("Link each point to a reason with 'because', 'so' or 'this means' to show HOW or WHY: that's where the explain marks are.");
  }
  if (c === "compare"){ if (count(text, RE.compare)) good.push("You used comparison words."); else fix.push("Use comparison words (whereas, both, however, more/less than) and talk about both things in the same sentence."); }
  if (["evaluate","discuss","how far","justify"].includes(c)){
    if (count(text, RE.balance)) good.push("You considered more than one side."); else fix.push("Show the other side too ('However…', 'On the other hand…').");
    if (count(text, RE.judge)) good.push("You gave a judgement."); else fix.push("Finish with a clear judgement: 'Overall, … because …'.");
  }
  if (c === "analyse"){
    if (/["“”'‘’]/.test(text) && /["“”].{2,}["“”]|'.{3,}'/.test(text)) good.push("You used quotations as evidence."); else fix.push("Back each point with a short quotation in \"quotation marks\".");
    if (count(text, RE.technique)) good.push("You named language features / techniques."); else fix.push("Name the technique or word class (e.g. verb, simile, short sentence).");
    if (count(text, RE.effect)) good.push("You explained the effect on the reader."); else fix.push("Explain the effect: what the word 'suggests' and how it makes the reader feel.");
  }
  if (c === "calculate" && q.k === "num"){
    const steps = (text.match(/=/g) || []).length + (text.match(/\n/g) || []).length;
    if (steps >= 1 || numbersIn(text).length >= 3) good.push("You showed working."); else fix.push("Show your working (formula, substitution, steps): method marks can be won even if the final answer is wrong.");
    if (q.unit && !count(text, RE.units) && !text.toLowerCase().includes(q.unit.toLowerCase())) fix.push(`Give the units (${q.unit}).`);
  }
  if (q.m >= 4 && count(text, RE.example) === 0 && ["describe","explain","evaluate","discuss","how far","justify","suggest"].includes(c)) fix.push("Add a specific example or piece of evidence (for example…, such as…).");
  return { c, good, fix, tip: C.tip, tpl: C.tpl, wc };
}

/* ---------- the assessor ---------- */
function assess(q, ans){
  const text = T(ans), raw = String(ans || "").trim();
  if (!raw) return { got:0, m:q.m, blank:true, hit:[], miss:(q.p || []).map(p => p[2]), S:structure(q, ""), note:"" };
  if (q.k === "write") return assessWriting(q, raw);
  const hit = [], miss = []; let got = 0, note = "";
  if (q.k === "num"){
    const nums = numbersIn(raw), last = nums.length ? nums[nums.length - 1] : NaN, tol = q.tol || 1e-9;
    const lit = (String(raw).replace(/[−–]/g, "-").replace(/(\d),(\d{3})/g, "$1$2").match(/-?\d*\.?\d+/g) || []).map(Number);
    const ok = isFinite(last) && Math.abs(last - q.v) <= tol, anyOk = lit.some(v => Math.abs(v - q.v) <= tol);
    if (ok){ got = q.m; hit.push(`Correct final answer: ${fmtNum(q.v)}${q.unit ? " " + q.unit : ""}`); (q.p || []).forEach(p => hit.push(p[2])); }
    else {
      (q.p || []).forEach(p => { if (got + p[0] <= q.m - 1 && matches(text, p[1])){ got += p[0]; hit.push(p[2]); } else if (!matches(text, p[1])) miss.push(p[2]); });
      if (anyOk){ note = `The right value (${fmtNum(q.v)}) is in your working, but it isn't your final answer: make the final line your answer.`; got = Math.max(got, q.m - 1); }
      miss.push(`Final answer: ${fmtNum(q.v)}${q.unit ? " " + q.unit : ""}`);
    }
  } else {
    (q.p || []).forEach(p => { if (matches(text, p[1])){ if (got < q.m){ got = Math.min(q.m, got + p[0]); hit.push(p[2]); } } else miss.push(p[2]); });
  }
  return { got, m:q.m, hit, miss, S:structure(q, raw), note };
}
const fmtNum = v => Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : String(+v.toFixed(3));

function assessWriting(q, raw){
  const wc = (raw.match(/\S+/g) || []).length, paras = raw.split(/\n\s*\n|\n(?=\s*\S)/).filter(p => p.trim().split(/\s+/).length > 12).length;
  const sents = raw.split(/(?<=[.!?])\s+/).map(s => (s.match(/\S+/g) || []).length).filter(n => n > 0), avg = sents.reduce((a, b) => a + b, 0) / Math.max(1, sents.length);
  const varied = sents.length > 3 && Math.sqrt(sents.reduce((a, n) => a + (n - avg) ** 2, 0) / sents.length) > 4, short = sents.some(n => n <= 5);
  const punct = [/,/, /;/, /:/, /[—–-]\s/, /\(/, /\?/, /!/, /["“]/].filter(r => r.test(raw)).length;
  const W = raw.toLowerCase().match(/[a-zà-ÿ']+/g) || [], longW = W.filter(w => w.length >= 8).length / Math.max(1, W.length), uniq = new Set(W).size / Math.max(1, W.length);
  const conn = count(raw, /\b(firstly|secondly|furthermore|moreover|however|in addition|consequently|therefore|meanwhile|finally|in conclusion|despite|although|nevertheless|on the other hand)\b/gi);
  const lowerStart = (raw.match(/[.!?]\s+[a-z]/g) || []).length + (/(^|\s)i(\s|')/.test(raw) ? 1 : 0);
  const feats = (q.f || []).map(f => ({ ok: matches(T(raw), f[0]), label: f[1] }));
  const [lo, hi] = q.words || [250, 400], c = [];
  const score = [ wc >= lo ? 1 : wc / lo, paras >= 4 ? 1 : paras / 4, varied ? 1 : .5, short ? 1 : .6, Math.min(1, punct / 5), Math.min(1, longW / .12), Math.min(1, conn / 4), feats.length ? feats.filter(f => f.ok).length / feats.length : 1, Math.max(0, 1 - lowerStart / 4) ];
  const pct = score.reduce((a, b) => a + b, 0) / score.length, got = Math.round(q.m * Math.min(1, pct) * (wc < lo * .4 ? .5 : 1));
  const hit = [], miss = [];
  (wc >= lo ? hit : miss).push(wc >= lo ? `Length: ${wc} words (target ${lo}–${hi})` : `Write more: ${wc} words, aim for ${lo}–${hi}`);
  (paras >= 4 ? hit : miss).push(paras >= 4 ? `${paras} paragraphs: well organised` : `Use at least 4 paragraphs (you have ${paras}): opening, 2–3 developed middles, ending`);
  (varied && short ? hit : miss).push(varied && short ? "Varied sentence lengths, including short ones for effect" : "Vary your sentences: mix short punchy sentences with longer complex ones");
  (punct >= 5 ? hit : miss).push(punct >= 5 ? "A good range of punctuation" : "Use a wider range of punctuation: ; : — ( ) ? ! as well as commas");
  (longW >= .12 ? hit : miss).push(longW >= .12 ? "Ambitious vocabulary" : "Use more ambitious, precise vocabulary (e.g. 'devastating', 'meticulous', 'exhilarating')");
  (conn >= 4 ? hit : miss).push(conn >= 4 ? "Clear linking between ideas" : "Link paragraphs with connectives: furthermore, however, consequently, in conclusion");
  feats.forEach(f => (f.ok ? hit : miss).push((f.ok ? "" : "Add: ") + f.label));
  if (lowerStart) miss.push("Check capital letters at the start of sentences and for 'I'");
  const S = structure(q, raw); S.good = []; S.fix = [];
  return { got, m:q.m, hit, miss, S, note:"This is an estimate from the features of your writing (length, organisation, sentence variety, punctuation, vocabulary, form). Your teacher will mark content and ideas in full.", writing:true };
}
X.assess = assess;

/* ---------- the page ---------- */
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const BADGE = { state:"State", give:"Give", name:"Name", identify:"Identify", define:"Define", describe:"Describe", outline:"Outline", explain:"Explain", suggest:"Suggest", compare:"Compare", calculate:"Calculate", analyse:"Analyse", evaluate:"Evaluate", discuss:"Discuss", justify:"Justify", "how far":"How far / To what extent", translate:"Translate", write:"Extended writing" };
X.list = s => X.papers[X.areaOf[s]] || [];
X.find = (s, pid) => X.list(s).find(p => p.id === pid);
X.key = (s, pid) => "paper:" + (X.areaOf[s] || s) + "/" + pid;

function feedbackHtml(q, r){
  const pct = r.m ? Math.round(r.got / r.m * 100) : 0, col = pct >= 70 ? "ok" : pct >= 40 ? "warn" : "bad";
  const need = r.m - r.got;
  return `<div class="exfb ${col}">
    <div class="exscore"><b>${r.got} / ${r.m} mark${r.m > 1 ? "s" : ""}</b><span class="bar"><i style="width:${pct}%"></i></span></div>
    ${r.blank ? `<p>Type your answer above, then press Assess.</p>` : ""}
    ${r.note ? `<p class="small"><b>Note:</b> ${esc(r.note)}</p>` : ""}
    ${r.hit.length ? `<p class="small" style="margin-top:6px"><b>✅ What earned marks</b></p><ul class="exl">${r.hit.map(h => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
    ${need > 0 && r.miss.length ? `<p class="small" style="margin-top:6px"><b>➕ To gain ${need} more mark${need > 1 ? "s" : ""}</b>${!r.writing && r.miss.length > need ? ` (any ${need} of these)` : ""}</p><ul class="exl">${r.miss.map(h => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
    ${r.blank ? "" : `<p class="small" style="margin-top:6px"><b>🧱 Structure</b> <span class="pill">${esc(BADGE[r.S.c] || r.S.c)}</span> · ${r.S.wc} words</p>
    <ul class="exl">${r.S.good.map(g => `<li>👍 ${esc(g)}</li>`).join("")}${r.S.fix.map(f => `<li>🔧 ${esc(f)}</li>`).join("")}</ul>
    <p class="small"><b>A better structure for "${esc(BADGE[r.S.c] || r.S.c)}":</b> ${esc(r.S.tip)}<br><span class="muted">${esc(r.S.tpl)}</span></p>`}
    <details style="margin-top:6px"><summary class="small" style="font-weight:800;cursor:pointer">📗 Model answer</summary><p class="small" style="white-space:pre-wrap;margin-top:6px">${esc(q.a)}</p></details>
  </div>`;
}

X.render = function(app, s, pid, C){
  const P = X.find(s, pid); if (!P) return C.back();
  const k = X.key(s, pid), st = C.DB.topics[k] = C.DB.topics[k] || { ans:{}, res:{}, ms:0, read:true, opened: Date.now() };
  st.ans = st.ans || {}; st.res = st.res || {};
  let t0 = Date.now(); const tick = () => { const now = Date.now(); st.ms = (st.ms || 0) + Math.min(now - t0, 5 * 60000); t0 = now; };
  const total = P.qs.reduce((a, q) => a + q.m, 0);
  const sumUp = () => { const done = P.qs.filter(q => st.res[q.id]), got = done.reduce((a, q) => a + st.res[q.id].got, 0); return { done: done.length, got, max: done.reduce((a, q) => a + q.m, 0) }; };
  app.innerHTML = `<button class="back" id="bk">← ${esc(C.S[s].name)}</button>
  <div class="card stack" style="border-top:6px solid ${C.S[s].colour}">
    <div><div class="eyebrow">Exam practice${P.board ? " · " + esc(P.board) : ""}</div><h1>📄 ${esc(P.title)}</h1><p class="muted">${esc(P.info)} · ${total} marks</p>
    <p class="small muted">An original exam-style paper written in the format of your exam. Type each answer, then press <b>Assess</b> for instant feedback on your marks and how to structure it better. You can improve your answer and assess again.</p></div>
    ${P.qs.map(q => `<div class="exq" id="q-${q.id}">
      <div class="row" style="justify-content:space-between;align-items:baseline"><b>Question ${q.n}</b><span class="pill">${q.m} mark${q.m > 1 ? "s" : ""}</span></div>
      <p class="muted small">${esc(q.t)} · <b>${esc(BADGE[cmdOf(q.c)] || q.c)}</b></p>
      ${q.src ? `<blockquote class="exsrc">${esc(q.src)}</blockquote>` : ""}
      <p style="white-space:pre-wrap;margin:6px 0">${esc(q.q)}</p>
      <textarea class="exa" data-q="${q.id}" rows="${q.k === "write" ? 14 : q.m <= 2 ? 2 : Math.min(10, 2 + q.m)}" placeholder="${q.k === "num" ? "Show your working, then write your final answer on the last line" : q.k === "write" ? "Plan, then write your answer here" : "Type your answer"}">${esc(st.ans[q.id] || "")}</textarea>
      <div class="row" style="justify-content:flex-end;margin-top:6px"><button class="btn sm" data-as="${q.id}">Assess ✓</button></div>
      <div class="exout" id="fb-${q.id}">${st.res[q.id] ? feedbackHtml(q, st.res[q.id]) : ""}</div>
    </div>`).join("")}
    <div class="exsum" id="exsum"></div>
  </div>`;
  const summary = () => { const U = sumUp(), el = app.querySelector("#exsum"); if (!el) return;
    const byT = {}; P.qs.forEach(q => { const r = st.res[q.id]; if (!r) return; const b = byT[q.t] = byT[q.t] || { got:0, m:0 }; b.got += r.got; b.m += q.m; });
    const weak = Object.entries(byT).filter(([, b]) => b.got / b.m < .6).map(([t]) => t);
    el.innerHTML = `<h2>📊 Your paper so far: ${U.got} / ${U.max} marks${U.done < P.qs.length ? ` <span class="muted small">(${U.done} of ${P.qs.length} questions assessed)</span>` : ""}</h2>
      ${Object.keys(byT).length ? `<table class="extab"><tr><th>Topic</th><th>Marks</th></tr>${Object.entries(byT).map(([t, b]) => `<tr><td>${esc(t)}</td><td><b>${b.got}/${b.m}</b> ${b.got / b.m >= .7 ? "✅" : b.got / b.m >= .4 ? "🟠" : "🔴"}</td></tr>`).join("")}</table>` : ""}
      ${weak.length ? `<p class="small" style="margin-top:8px"><b>Revise next:</b> ${weak.map(esc).join(", ")}. Open the topic's Learn page, then try these questions again.</p>` : ""}
      ${U.done === P.qs.length ? `<button class="btn" id="exdone" style="margin-top:10px">${st.sent ? "Send my updated result ✉" : "Finish paper and send my result ✉"}</button>` : `<p class="small muted" style="margin-top:8px">Assess every question to finish the paper.</p>`}`;
    const b = app.querySelector("#exdone"); if (b) b.onclick = () => { tick(); C.report(P, st, U, byT); st.sent = Date.now(); C.save(); b.textContent = "Sent ✓"; b.disabled = true; };
  };
  app.querySelector("#bk").onclick = () => { tick(); C.save(); C.back(); };
  app.querySelectorAll(".exa").forEach(ta => ta.oninput = () => { st.ans[ta.dataset.q] = ta.value; clearTimeout(ta._t); ta._t = setTimeout(C.save, 800); });
  app.querySelectorAll("[data-as]").forEach(b => b.onclick = () => { const q = P.qs.find(x => x.id === b.dataset.as), v = app.querySelector(`.exa[data-q="${q.id}"]`).value;
    st.ans[q.id] = v; const r = assess(q, v); if (!r.blank){ st.res[q.id] = r; st.tries = st.tries || {}; st.tries[q.id] = (st.tries[q.id] || 0) + 1; }
    tick(); C.save(); app.querySelector("#fb-" + q.id).innerHTML = feedbackHtml(q, r); summary(); });
  summary();
};
})();
