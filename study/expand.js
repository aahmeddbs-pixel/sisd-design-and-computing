/* Study Plus question bank top-up (shared by study.html and uk.html).
   Runs after every bank file. For each topic with fewer than MIN distinct questions it adds new practice
   questions built from that topic's own content, appended to the END of the pool (pools are append-only:
   saved sets point at positions). Order of additions is fixed, so positions never change between visits.
   Kinds: fixed generator questions (topics with a generator), name-the-term (reverse of a definition) and
   recall-and-type (short answers). Hand-written top-up banks (study/bank30-*.js, uk/bank30-*.js) load before this. */
(function(){
const MIN = 30;
const BAD_START = /^(which (is|of|one|sentence|word|statement|spelling|option|answer|calculation|best|pair|comparison|plural|value|expression|graph|chart|shape|number|line)|choose|complete|fill|pick|select|what is the (best|correct|right|missing)|find the|work out|calculate|solve|simplify|expand|factorise|how many|true or false)/i;
const clean = s => String(s || "").trim();
const norm = s => clean(s).toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ");
function hash(s){ let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function rightOf(q){ return q && q.k === "mcq" && q.o ? q.o[q.a] : null; }
/* "What is an allele?" → "allele" */
function termOf(q){
  const qq = clean(q.q);
  let m = /^what (?:is|are|was|were) (?:an? |the )?([^?]{2,40}?)\?$/i.exec(qq) || /^what (?:does|do) (?:an? |the )?([^?]{2,40}?) (?:mean|stand for)\?$/i.exec(qq);
  if (!m) return null; let t = m[1].trim();
  if (/\b(you|your|this|these|that|it|they|happens|happen|answer|value|difference|purpose|role|main|result|effect of|cause of|first|best|job|function|used|made|called|meant|like|in|of|for|on|at|to)\b/i.test(t) || /\d/.test(t) || t.split(/\s+/).length > 5) return null;
  const qm = /^(['"‘“])(.*)(['"’”])$/.exec(t); if (qm) t = qm[2];
  if (/['"‘’“”]/.test(t)) return null;
  return t;
}
function topUp(subjects, GEN){
  let added = 0;
  Object.keys(subjects || {}).forEach(k => { const S = subjects[k]; if (!S || !S.topics) return;
    const defs = []; S.topics.forEach(T => T && (T.tasks || []).concat(T.pool || []).forEach(q => { const t = q && q.k === "mcq" && termOf(q), r = rightOf(q); if (t && r && r.length >= 12 && r.length <= 140) defs.push({ T, t, r, q }); }));
    S.topics.forEach(T => { if (!T) return; T.pool = T.pool || [];
      const all = (T.tasks || []).concat(T.pool), seen = new Set(all.map(q => q && norm(q.q)));
      let need = MIN - seen.size; if (need <= 0) return;
      const mcqs = all.filter(q => q && q.k === "mcq" && q.o && q.o.length >= 2 && q.o[q.a] != null && !/true or false/i.test(q.q));
      const out = [], push = q => { const n = norm(q.q); if (seen.has(n) || out.length >= need) return; seen.add(n); out.push(q); };
      /* 0. topics with a question generator: fixed extra questions with new numbers, Core to Challenge */
      const gk = k + "/" + T.id;
      if (GEN && GEN.has && GEN.has(gk)) for (let i = 0; out.length < need && i < need * 25; i++){ const d = 1 + (i % 3), g = GEN.make(gk, d, (hash(gk) + i * 2654435761 + 17) >>> 0); if (g) push(Object.assign({}, g, { gen:"bank" })); }
      /* 1. name the term: the definition is given, choose the word it defines */
      defs.filter(d => d.T === T).forEach(d => {
        const others = defs.filter(e => norm(e.t) !== norm(d.t) && !norm(d.r).includes(norm(e.t)));
        const near = others.filter(e => e.T === T).concat(others.filter(e => e.T !== T));
        const opts = []; near.forEach(e => { if (opts.length < 3 && !opts.some(o => norm(o) === norm(e.t))) opts.push(e.t); });
        if (opts.length < 2) return;
        push({ d: Math.min(3, (d.q.d || 1) + 1), k:"mcq", q:`Which word, term or phrase matches this meaning?\n“${d.r}”`, o:[d.t].concat(opts), a:0, x:`“${d.r}” describes ${d.t}. ${d.q.x || ""}`.trim(), gen:"term" });
      });
      /* 2. recall and type: short, single answers to What/Who/When/Where questions */
      mcqs.forEach(q => { const r = rightOf(q), qq = clean(q.q);
        if (!r || BAD_START.test(qq) || !/^(what|who|when|where|name)\b/i.test(qq) || /\?\s*\S/.test(qq) || /[“”"«»]/.test(qq)) return;
        if (!/^[\p{L}][\p{L}'’ -]{0,22}$/u.test(r) || r.split(/\s+/).length > 2) return;
        const bare = r.replace(/^(the|a|an|le|la|les|l'|un|une)\s+/i, "");
        push({ d: Math.min(3, (q.d || 1) + 1), k:"text", q:`${qq}\n(Type your answer: no options this time!)`, a:[r, r.toLowerCase(), bare, bare.toLowerCase()], best:r, x:`The answer is ${r}. ${q.x || ""}`.trim(), gen:"recall" });
      });
      out.forEach(q => T.pool.push(q)); added += out.length;
    });
  });
  return added;
}
window.STUDY_TOPUP = { topUp, MIN };
if (window.STUDY) window.STUDY_TOPUP.study = topUp(window.STUDY, window.STUDY_GEN);
if (window.UK) window.STUDY_TOPUP.uk = topUp(window.UK, window.UK_GEN);
})();
