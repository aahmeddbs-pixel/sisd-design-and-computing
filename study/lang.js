/* Study Plus + Study Plus UK · shared language tools
   1. Speech: reads French (or Arabic) words in a French (or Arabic) voice and English in an English voice, even inside one sentence.
      Buttons: <button data-spx="text" data-spxl="fr"> are wired automatically (🔊 normal, data-spxslow for 🐢 slow).
   2. Verb lab: SPX.VERBS (28 key French verbs) and SPX.verbsHTML(ids, level) → cards with every form, how it sounds,
      when to use it, example sentences and the common mistake, each with an audio button.
   3. Further learning: SPX.linksHTML({...}) → YouTube, BBC Bitesize, Khan Academy and verb-conjugation links for a topic. */
window.SPX = (function(){
"use strict";
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let SLOW = false;
try { SLOW = localStorage.getItem("spx_slow") === "1"; } catch(e){}

/* ---------------- voices ---------------- */
let VOICES = [];
function loadVoices(){ try { VOICES = speechSynthesis.getVoices() || []; } catch(e){ VOICES = []; } }
try { loadVoices(); speechSynthesis.addEventListener("voiceschanged", loadVoices); } catch(e){}
const PREF = { fr:/Google fran|Amélie|Amelie|Thomas|Audrey|Marie|Denise|Henri|Natural|Enhanced|Premium/i, ar:/Google|Maged|Laila|Hamed|Zariyah|Natural/i, en:/Google UK|Daniel|Serena|Kate|Libby|Ryan|Sonia|Natural|Enhanced/i };
function voiceFor(lang){
  if (!VOICES.length) loadVoices();
  const want = { fr:"fr", ar:"ar", en:"en" }[lang] || "en";
  const L = VOICES.filter(v => String(v.lang || "").toLowerCase().replace("_", "-").startsWith(want));
  if (!L.length) return null;
  const order = want === "fr" ? ["fr-fr","fr-ca","fr-be","fr-ch"] : want === "en" ? ["en-gb","en-ie","en-au","en-us"] : [];
  L.sort((a, b) => { const la = String(a.lang).toLowerCase().replace("_", "-"), lb = String(b.lang).toLowerCase().replace("_", "-");
    const oa = order.indexOf(la), ob = order.indexOf(lb); if (oa !== ob) return (oa < 0 ? 9 : oa) - (ob < 0 ? 9 : ob);
    return (PREF[want].test(b.name) ? 1 : 0) - (PREF[want].test(a.name) ? 1 : 0); });
  return L[0];
}
function hasVoice(lang){ return !!voiceFor(lang); }

/* ---------------- which language is this piece of text? ---------------- */
const FRW = new Set(("je j tu il elle elles ils nous vous le la les l un une des du de d au aux et est sont suis es ai as avons avez ont ne n pas plus jamais rien " +
  "mon ma mes ton ta tes son sa ses notre nos votre vos leur leurs ce cet cette ces c qu que qui quoi où avec pour dans sur sous chez très bien merci bonjour salut oui non " +
  "mais parce car alors aussi beaucoup peu y en m t s me te se lui eux moi toi voici voilà quel quelle quels quelles comment combien pourquoi quand ça fait faire va vais vont " +
  "allons allez aller avoir être était j'ai c'est il y hier demain aujourd'hui toujours souvent après avant puis ensuite enfin chaque tous toute toutes tout " +
  "foot parc bus basket ski vélo week-end weekend shopping cinéma restaurant sandwich pizza hamburger chocolat orange salade sport sports tennis golf rugby hockey").split(" "));
const ENW = new Set(("the is are am was were be been you he she it we they them his her its our their my your and or but of to in at for with from by this that these those " +
  "what which who how why when where choose correct means mean word words sentence translate type answer true false do does did not because use used after before " +
  "with if then than so as into about give write make made making each every one two three first second third verb verbs noun adjective form forms tense past present " +
  "future like likes go goes going went play plays eat drink have has had would will can could should must there here i i'm it's don't doesn't let's me us an").split(" "));
const ENX = new Set(("hello hi bye goodbye good morning evening night afternoon please thank thanks yes no name names years year old young live lives love hate school family mother mum dad father " +
  "sister brother friend friends day days week weekend time food water house home town city big small tall short very much many some all any here now also only just more most other " +
  "new says said means literally never always often sometimes usually informal formal polite plural singular feminine masculine add remove ending endings letter letters capital " +
  "same different another example examples remember note silent sound sounds say saying pronounce become becomes becoming before after negative question questions ask asking " +
  "reply answer right wrong left straight turn take took want wanted need needs get got put see saw look watch watched listen read write wrote speak spoke learn learned " +
  "people person girl boy man woman child children teacher student class lesson lessons subject subjects maths science english french arabic history geography art music sport sports " +
  "football tennis basketball swimming cinema beach park station shop shops bank market mall mosque street opposite next behind between near far hot cold sunny rainy weather " +
  "breakfast lunch dinner bread cheese chicken fish meat apple apples juice tea coffee milk cake ice cream bill price cost costs euros money buy bought sell sold cheap expensive " +
  "tired hungry thirsty happy sad funny kind lazy shy sporty clever boring interesting easy difficult great fun useful favourite because although however also then first last next " +
  "yesterday today tomorrow morning o'clock half quarter past to minute minutes hour hours monday sunday month months birthday born nationality languages language speak spoken " +
  "would could should might shall can't won't isn't aren't wasn't weren't i'd you're we're they're who's that's what's there's here's " +
  "introduce yourself myself describe tell ask using both whole ones meaning opinion opinions reason reasons phrase phrases sentences adjective adjectives noun nouns pronoun pronouns " +
  "subject object agree agrees agreement endings adds change changes irregular regular tenses conditional imperfect pluperfect subjunctive perfect near uses height hair eyes " +
  "personality relationships relationship around ago own way ways stays stay keep keeps given show shows shown first second part parts list words " +
  "learn by heart need needed important useful common mistake mistakes listen hear heard out loud slow slowly fast quickly carefully then still already even really quite").split(" "));
const ACC = /[àâçéèêëîïôûùüÿœæ]/i;
const FRM = /(eau|oir|eux|aux|ais$|ait$|ez$|ons$|qu|ou|oi|ille|gn|ette|ière|ée$|eur$|eille|^l'|^d'|^j'|^qu'|^c'|^n'|^s'|^m'|^t')/, ENM = /(ing$|ght|th|wh|w|k|y$|ee|oo|sh|ck|ness$|ful$|ly$|ed$)/;
function wordLang(w){
  const parts = w.split(/['’]/);
  if (ACC.test(w)) return "fr";
  if (parts.length > 1 && /^(j|l|d|n|qu|c|s|m|t|jusqu|lorsqu|puisqu)$/.test(parts[0])) return "fr";
  const inF = FRW.has(w), inE = ENW.has(w) || ENX.has(w);
  if (inF && !inE) return "fr"; if (inE && !inF) return "en";
  if (inF && inE) return null;
  const f = FRM.test(w), e = ENM.test(w);
  return f && !e ? "fr" : e && !f ? "en" : null;
}
function langOf(t){
  const words = String(t || "").toLowerCase().match(/[a-zàâçéèêëîïôûùüÿœæ]+(?:['’][a-zàâçéèêëîïôûùüÿœæ]+)?/g) || [];
  let fr = 0, en = 0; words.forEach(w => { const l = wordLang(w); if (l === "fr") fr++; else if (l === "en") en++; });
  return fr > en ? "fr" : en > fr ? "en" : null;
}
const AR = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
/* split a mixed sentence into [{t, l}] pieces: chunks at quotes, = → ( ) and sentence ends, then runs of French / English words */
function runs(chunk, prevL, hint){
  const toks = chunk.match(/[A-Za-zÀ-ÿœæŒÆ]+(?:[-'’][A-Za-zÀ-ÿœæŒÆ]+)*['’]?|[^A-Za-zÀ-ÿœæŒÆ]+/g) || [];
  const L = toks.map((t, i) => { if (!/[A-Za-zÀ-ÿ]/.test(t)) return "punct"; const w = t.toLowerCase().replace(/['’]$/, "'"), l = wordLang(w);
    if (w === "a" || w === "on"){ const prev = (toks.slice(0, i).reverse().find(z => /[A-Za-zÀ-ÿ]/.test(z)) || "").toLowerCase();
      const nx = (toks.slice(i + 1).find(z => /[A-Za-zÀ-ÿ]/.test(z)) || "").toLowerCase();
      if (ENW.has(nx) || ENX.has(nx)) return "en";
      if (w === "a") return /^(y|il|elle|on|qui|ça|cela|n'y|l'on)$/.test(prev) ? "fr" : null;
      return FRW.has(nx) || ACC.test(nx) || /^(est|a|va|fait|peut|doit|joue|mange|parle|aime|habite|s'|n')/.test(nx) ? "fr" : null; }
    return (/^[A-ZÀ-Ý]/.test(t) && i > 0 && !FRW.has(w) && !ENW.has(w) && !ENX.has(w) && !ACC.test(t)) ? null : l; });
  if (hint) for (let i = 0; i < L.length; i++) if (L[i] === null) L[i] = hint;
  // unknown words take the language of the nearest known word before them (or after, at the start)
  let last = null; for (let i = 0; i < L.length; i++){ if (L[i] === "fr" || L[i] === "en") last = L[i]; else if (L[i] === null) L[i] = last; }
  let next = null; for (let i = L.length - 1; i >= 0; i--){ if (L[i] === "fr" || L[i] === "en") next = L[i]; else if (L[i] === null) L[i] = next || prevL || "en"; }
  const out = []; let cur = null;
  toks.forEach((t, i) => { const l = L[i] === "punct" ? (cur ? cur.l : null) : L[i];
    if (!cur || (l && l !== cur.l)) { if (cur && cur.t.trim()) out.push(cur); cur = { t:"", l: l || prevL || "en" }; }
    cur.t += t; });
  if (cur && cur.t.trim()) out.push(cur);
  // a lone one-word English run between French words (e.g. a name) stays French, and vice versa
  return out.map(p => ({ t:p.t.trim(), l:p.l })).filter(p => /[A-Za-zÀ-ÿ0-9]/.test(p.t));
}
function pieces(text, base){
  let s = String(text || "").replace(/([a-zà-ÿ])\((e|ne|le|te|s|es|x)\)/gi, "$1").replace(/_{2,}/g, " … ").replace(/[✓✗→←⟶]/g, m => m === "→" || m === "⟶" ? " \u0002 " : " ").replace(/\s+\/\s+/g, ", ");
  if (base === "ar"){
    const out = []; let cur = "", curL = null;
    for (const ch of s){ const l = AR.test(ch) ? "ar" : /[A-Za-z]/.test(ch) ? "en" : null;
      if (l && curL && l !== curL){ if (cur.trim()) out.push({ t:cur, l:curL }); cur = ""; }
      if (l) curL = l; cur += ch; }
    if (cur.trim()) out.push({ t:cur, l:curL || "en" });
    return out.map(p => ({ t:p.t.replace(/\u0002/g, " "), l:p.l }));
  }
  if (base !== "fr") return [{ t:s.replace(/\u0002/g, ". "), l:"en" }];
  s = s.replace(/(^|[\s(\[])['‘"“«]/g, "$1\u0001\u0005").replace(/['’"”»](?=[\s.,;:!?)\]]|$)/g, "\u0001").replace(/\(/g, "\u0001\u0006").replace(/\)/g, "\u0001");
  const raw = s.split(/[\u0001\u0002=;\[\]\n]|(?<=[.!?:])\s+|\s[-–—]\s/).map(x => x.trim()).filter(x => x && /[A-Za-zÀ-ÿœ0-9]/.test(x));
  const out = []; let last = "en";
  raw.forEach(x => { const hint = x.indexOf("\u0005") >= 0 ? "fr" : x.indexOf("\u0006") >= 0 ? "en" : null; x = x.replace(/[\u0005\u0006]/g, "").trim(); if (!x) return;
    runs(x, last, hint).forEach(p => { last = p.l; const prev = out[out.length - 1];
    if (prev && prev.l === p.l) prev.t += (/[.!?:,…]$/.test(prev.t) ? " " : ", ") + p.t; else out.push({ t:p.t, l:p.l }); }); });
  return out;
}
function speak(text, base, opts){
  opts = opts || {};
  try {
    speechSynthesis.cancel();
    const P = opts.only ? [{ t:String(text), l:opts.only }] : pieces(text, base || "en");
    P.forEach(p => {
      const u = new SpeechSynthesisUtterance(p.t), v = voiceFor(p.l);
      u.lang = p.l === "fr" ? "fr-FR" : p.l === "ar" ? "ar-SA" : "en-GB"; if (v) u.voice = v;
      const slow = opts.slow != null ? opts.slow : SLOW;
      u.rate = p.l === "en" ? .95 : (slow ? .62 : .88);
      speechSynthesis.speak(u);
    });
    if ((base === "fr" || opts.only === "fr") && !hasVoice("fr")) noVoiceNote("fr");
  } catch(e){}
}
function hush(){ try { speechSynthesis.cancel(); } catch(e){} }
let noted = false;
function noVoiceNote(l){ if (noted) return; noted = true;
  const d = document.createElement("div"); d.className = "toast";
  d.textContent = "Tip: this device has no French voice installed, so the accent may sound English. On Windows: Settings → Time & language → Speech → Add voices → Français. On iPad: Settings → Accessibility → Spoken Content → Voices → French.";
  d.style.maxWidth = "560px"; document.body.appendChild(d); setTimeout(() => d.remove(), 9000); }

/* buttons: data-spx holds the text; data-spxl = fr | ar | en | mix-fr (mixed, French base) */
function btn(text, lang, label, cls){ return `<button type="button" class="spxb ${cls || ""}" data-spx="${esc(text)}" data-spxl="${lang || "mix-fr"}" title="Listen">${label || "🔊"}</button>`; }
function slowBtn(text, lang){ return `<button type="button" class="spxb" data-spx="${esc(text)}" data-spxl="${lang || "mix-fr"}" data-spxslow="1" title="Listen slowly">🐢</button>`; }
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-spx]"); if (!b) return;
  e.preventDefault(); e.stopPropagation();
  const l = b.dataset.spxl || "mix-fr", t = b.dataset.spx, slow = b.dataset.spxslow === "1";
  if (l === "fr" || l === "ar" || l === "en") speak(t, l, { only:l, slow: slow || null });
  else speak(t, l.replace("mix-", ""), { slow: slow || null });
  b.classList.add("on"); setTimeout(() => b.classList.remove("on"), 600);
}, true);
document.addEventListener("change", e => { if (e.target && e.target.id === "spxSlow"){ SLOW = e.target.checked; try { localStorage.setItem("spx_slow", SLOW ? "1" : "0"); } catch(x){} } });
function slowToggle(){ return `<label class="spxslow"><input type="checkbox" id="spxSlow"${SLOW ? " checked" : ""}> 🐢 Slow French audio</label>`; }

/* ---------------- 28 key French verbs ----------------
   forms: [display, sounds-like]. "sounds like" uses English spelling: zh = the 's' in 'measure', (n) = a nasal sound (don't say the n),
   uh = the 'a' in 'about', ew = say 'ee' with rounded lips. */
const V = {};
function verb(id, inf, en, kind, sound, forms, t, use, ex, trap){ V[id] = { id, inf, en, kind, sound, forms, t, use, ex, trap }; }
const P3 = "il/elle/on", P6 = "ils/elles";
verb("etre","être","to be","Irregular · the most important verb","EH-truh",
  [["je suis","zhuh swee"],["tu es","tew eh"],[P3+" est","eel eh / el eh / oh(n) neh"],["nous sommes","noo som"],["vous êtes","voo zet"],[P6+" sont","eel soh(n) / el soh(n)"]],
  { pc:["j'ai été","I was / I have been"], fp:["je vais être","I am going to be"], imp:["j'étais","I was / I used to be"], fut:["je serai","I will be"], cond:["je serais","I would be"] },
  "Use être for describing people and things (personality, nationality, jobs, where something is). It is also the helping verb for about 17 verbs in the passé composé (je suis allé).",
  [["Je suis grand et sportif.","I am tall and sporty."],["Ma sœur est très gentille.","My sister is very kind."],["Nous sommes à Dubaï.","We are in Dubai."]],
  "Don't use être for age: say j'ai douze ans (I have 12 years), never je suis douze ans.");
verb("avoir","avoir","to have","Irregular · the second most important verb","ah-VWAHR",
  [["j'ai","zhay"],["tu as","tew ah"],[P3+" a","eel ah / el ah / oh(n) nah"],["nous avons","noo zah-voh(n)"],["vous avez","voo zah-vay"],[P6+" ont","eel zoh(n) / el zoh(n)"]],
  { pc:["j'ai eu","I had (sounds like 'zhay ew')"], fp:["je vais avoir","I am going to have"], imp:["j'avais","I had / I used to have"], fut:["j'aurai","I will have"], cond:["j'aurais","I would have"] },
  "Use avoir for owning things, for age (j'ai treize ans) and for feelings like hunger, thirst, fear and heat: j'ai faim, j'ai soif, j'ai peur, j'ai chaud. Most verbs use avoir as the helping verb in the passé composé (j'ai mangé).",
  [["J'ai deux frères et une sœur.","I have two brothers and a sister."],["Tu as quel âge ? J'ai douze ans.","How old are you? I am twelve."],["Nous avons faim !","We are hungry!"]],
  "Ils ont (they have: 'eel zoh(n)', with a z sound) and ils sont (they are: 'eel soh(n)', with an s sound) sound different. Listen carefully!");
verb("aller","aller","to go","Irregular · takes être in the past","ah-LAY",
  [["je vais","zhuh veh"],["tu vas","tew vah"],[P3+" va","eel vah"],["nous allons","noo zah-loh(n)"],["vous allez","voo zah-lay"],[P6+" vont","eel voh(n)"]],
  { pc:["je suis allé(e)","I went (add -e if you are a girl)"], fp:["je vais aller","I am going to go"], imp:["j'allais","I was going / I used to go"], fut:["j'irai","I will go"], cond:["j'irais","I would go"] },
  "Use aller + à + place: je vais au parc, à la plage, aux magasins. Aller + an infinitive makes the near future: je vais jouer (I am going to play). Also: Comment ça va ? (How are you?)",
  [["Je vais à l'école en bus.","I go to school by bus."],["Ce week-end, nous allons à la plage.","This weekend we are going to the beach."],["Demain, je vais regarder un film.","Tomorrow I am going to watch a film."]],
  "In the past it uses être, not avoir: je suis allé, never j'ai allé.");
verb("faire","faire","to do / to make","Irregular","FAIR",
  [["je fais","zhuh feh"],["tu fais","tew feh"],[P3+" fait","eel feh"],["nous faisons","noo fuh-zoh(n)"],["vous faites","voo fet"],[P6+" font","eel foh(n)"]],
  { pc:["j'ai fait","I did / I made"], fp:["je vais faire","I am going to do"], imp:["je faisais","I was doing / I used to do"], fut:["je ferai","I will do"], cond:["je ferais","I would do"] },
  "Use faire for many activities: faire du vélo (cycle), faire de la natation (swim), faire mes devoirs (do my homework), faire les magasins (go shopping). For weather: il fait beau (it's nice), il fait chaud (it's hot).",
  [["Je fais mes devoirs après l'école.","I do my homework after school."],["Il fait très chaud à Dubaï en été.","It is very hot in Dubai in summer."],["Le samedi, nous faisons du vélo.","On Saturdays we go cycling."]],
  "Vous faites is irregular: never 'vous faisez'. And 'nous faisons' sounds like 'fuh-zoh(n)', not 'fay-zoh(n)'.");
verb("parler","parler","to speak","Regular -er verb · the pattern for most French verbs","par-LAY",
  [["je parle","zhuh parl"],["tu parles","tew parl"],[P3+" parle","eel parl"],["nous parlons","noo par-loh(n)"],["vous parlez","voo par-lay"],[P6+" parlent","eel parl"]],
  { pc:["j'ai parlé","I spoke / I have spoken"], fp:["je vais parler","I am going to speak"], imp:["je parlais","I was speaking / I used to speak"], fut:["je parlerai","I will speak"], cond:["je parlerais","I would speak"] },
  "Every regular -er verb works like parler: take off -er and add -e, -es, -e, -ons, -ez, -ent. The forms je, tu, il and ils all SOUND the same: only nous (-ons) and vous (-ez) sound different. Other -er verbs: jouer, regarder, écouter, habiter, aimer, détester, travailler.",
  [["Je parle anglais, arabe et un peu français.","I speak English, Arabic and a little French."],["Nous parlons avec le professeur.","We are talking with the teacher."],["Ils parlent trop vite !","They speak too fast!"]],
  "The -ent ending of ils parlent is SILENT: say 'eel parl', not 'eel par-lent'.");
verb("finir","finir","to finish","Regular -ir verb","fee-NEER",
  [["je finis","zhuh fee-nee"],["tu finis","tew fee-nee"],[P3+" finit","eel fee-nee"],["nous finissons","noo fee-nee-soh(n)"],["vous finissez","voo fee-nee-say"],[P6+" finissent","eel fee-neess"]],
  { pc:["j'ai fini","I finished"], fp:["je vais finir","I am going to finish"], imp:["je finissais","I was finishing"], fut:["je finirai","I will finish"], cond:["je finirais","I would finish"] },
  "Regular -ir verbs: take off -ir and add -is, -is, -it, -issons, -issez, -issent. Others like it: choisir (to choose), remplir (to fill), réussir (to succeed).",
  [["Je finis l'école à trois heures.","I finish school at three o'clock."],["Nous finissons nos devoirs ensemble.","We finish our homework together."],["Les cours finissent à quinze heures.","Lessons finish at 3 pm."]],
  "Don't forget the -iss- in the plural: nous finissons, not 'nous finons'.");
verb("vendre","vendre","to sell","Regular -re verb","VOH(N)-druh",
  [["je vends","zhuh voh(n)"],["tu vends","tew voh(n)"],[P3+" vend","eel voh(n)"],["nous vendons","noo voh(n)-doh(n)"],["vous vendez","voo voh(n)-day"],[P6+" vendent","eel voh(n)d"]],
  { pc:["j'ai vendu","I sold"], fp:["je vais vendre","I am going to sell"], imp:["je vendais","I was selling / I used to sell"], fut:["je vendrai","I will sell"], cond:["je vendrais","I would sell"] },
  "Regular -re verbs: take off -re and add -s, -s, (nothing), -ons, -ez, -ent. Others like it: attendre (to wait), répondre (to answer), entendre (to hear), perdre (to lose).",
  [["Le boulanger vend du pain frais.","The baker sells fresh bread."],["J'attends le bus devant l'école.","I wait for the bus in front of school."],["Vous répondez aux questions.","You answer the questions."]],
  "Il vend has no ending at all: never 'il vende'. The final d is silent: 'eel voh(n)'.");
verb("prendre","prendre","to take / to have (food)","Irregular","PROH(N)-druh",
  [["je prends","zhuh proh(n)"],["tu prends","tew proh(n)"],[P3+" prend","eel proh(n)"],["nous prenons","noo pruh-noh(n)"],["vous prenez","voo pruh-nay"],[P6+" prennent","eel pren"]],
  { pc:["j'ai pris","I took / I had"], fp:["je vais prendre","I am going to take"], imp:["je prenais","I was taking / I used to take"], fut:["je prendrai","I will take"], cond:["je prendrais","I would take"] },
  "Use prendre for transport (prendre le bus), food and drink (je prends un sandwich = I'll have a sandwich) and for taking things. Apprendre (to learn) and comprendre (to understand) follow the same pattern.",
  [["Je prends le bus pour aller à l'école.","I take the bus to go to school."],["Pour le déjeuner, je prends une salade.","For lunch I'm having a salad."],["Tu comprends la question ?","Do you understand the question?"]],
  "Ils prennent has a double n and sounds like 'pren'. The past participle is irregular: pris (j'ai pris), never 'prendu'.");
verb("vouloir","vouloir","to want","Irregular · modal verb","voo-LWAHR",
  [["je veux","zhuh vuh"],["tu veux","tew vuh"],[P3+" veut","eel vuh"],["nous voulons","noo voo-loh(n)"],["vous voulez","voo voo-lay"],[P6+" veulent","eel vuhl"]],
  { pc:["j'ai voulu","I wanted"], fp:["je vais vouloir","I am going to want"], imp:["je voulais","I wanted / I used to want"], fut:["je voudrai","I will want"], cond:["je voudrais","I would like (polite!)"] },
  "Vouloir + infinitive: je veux jouer (I want to play). To ask politely, use the conditional: je voudrais un jus d'orange, s'il vous plaît (I would like…). Je veux can sound rude when ordering.",
  [["Je veux devenir médecin.","I want to become a doctor."],["Je voudrais un croissant, s'il vous plaît.","I would like a croissant, please."],["Tu veux venir au cinéma ?","Do you want to come to the cinema?"]],
  "After vouloir, the next verb stays in the infinitive: je veux manger, never 'je veux mange'.");
verb("pouvoir","pouvoir","to be able to / can","Irregular · modal verb","poo-VWAHR",
  [["je peux","zhuh puh"],["tu peux","tew puh"],[P3+" peut","eel puh"],["nous pouvons","noo poo-voh(n)"],["vous pouvez","voo poo-vay"],[P6+" peuvent","eel puhv"]],
  { pc:["j'ai pu","I was able to / I could"], fp:["je vais pouvoir","I am going to be able to"], imp:["je pouvais","I could / I used to be able to"], fut:["je pourrai","I will be able to"], cond:["je pourrais","I could / I would be able to"] },
  "Pouvoir + infinitive: je peux nager (I can swim). Use it to ask permission: Est-ce que je peux aller aux toilettes ? (Can I go to the toilet?)",
  [["Je peux venir chez toi samedi ?","Can I come to your house on Saturday?"],["On peut faire du ski à Dubaï !","You can ski in Dubai!"],["Vous pouvez répéter, s'il vous plaît ?","Can you repeat, please?"]],
  "Keep the second verb in the infinitive: on peut aller, never 'on peut va'.");
verb("devoir","devoir","to have to / must","Irregular · modal verb","duh-VWAHR",
  [["je dois","zhuh dwah"],["tu dois","tew dwah"],[P3+" doit","eel dwah"],["nous devons","noo duh-voh(n)"],["vous devez","voo duh-vay"],[P6+" doivent","eel dwahv"]],
  { pc:["j'ai dû","I had to"], fp:["je vais devoir","I am going to have to"], imp:["je devais","I had to / I was supposed to"], fut:["je devrai","I will have to"], cond:["je devrais","I should"] },
  "Devoir + infinitive: je dois faire mes devoirs (I must do my homework). The conditional je devrais means 'I should': on devrait recycler (we should recycle). Useful for environment and health topics.",
  [["Je dois porter un uniforme.","I have to wear a uniform."],["On doit protéger la planète.","We must protect the planet."],["Tu devrais manger plus de légumes.","You should eat more vegetables."]],
  "Don't confuse les devoirs (homework, a noun) with devoir (to have to, a verb).");
verb("venir","venir","to come","Irregular · takes être in the past","vuh-NEER",
  [["je viens","zhuh vya(n)"],["tu viens","tew vya(n)"],[P3+" vient","eel vya(n)"],["nous venons","noo vuh-noh(n)"],["vous venez","voo vuh-nay"],[P6+" viennent","eel vyen"]],
  { pc:["je suis venu(e)","I came"], fp:["je vais venir","I am going to come"], imp:["je venais","I was coming / I used to come"], fut:["je viendrai","I will come"], cond:["je viendrais","I would come"] },
  "Venir de + place = to come from: je viens du Maroc. Venir de + infinitive = to have just done something: je viens de manger (I have just eaten). Devenir (to become) follows the same pattern.",
  [["Je viens de Russie, mais j'habite à Dubaï.","I come from Russia, but I live in Dubai."],["Tu viens avec nous ?","Are you coming with us?"],["Je viens de finir mes devoirs.","I have just finished my homework."]],
  "Past tense uses être and agrees: elle est venue, ils sont venus.");
verb("manger","manger","to eat","-er verb with a spelling change","moh(n)-ZHAY",
  [["je mange","zhuh moh(n)zh"],["tu manges","tew moh(n)zh"],[P3+" mange","eel moh(n)zh"],["nous mangeons","noo moh(n)-zhoh(n)"],["vous mangez","voo moh(n)-zhay"],[P6+" mangent","eel moh(n)zh"]],
  { pc:["j'ai mangé","I ate"], fp:["je vais manger","I am going to eat"], imp:["je mangeais","I was eating / I used to eat"], fut:["je mangerai","I will eat"], cond:["je mangerais","I would eat"] },
  "Manger is regular except nous mangeons: the extra e keeps the 'zh' sound before o. Use it with du / de la / des: je mange du poulet, de la salade, des fruits.",
  [["Je mange des céréales au petit-déjeuner.","I eat cereal for breakfast."],["Nous mangeons à la cantine.","We eat in the canteen."],["Hier, j'ai mangé une pizza.","Yesterday I ate a pizza."]],
  "nous mangeons, not 'nous mangons' (which would sound like 'mon-gon').");
verb("aimer","aimer","to like / to love","Regular -er verb · for opinions","eh-MAY",
  [["j'aime","zhem"],["tu aimes","tew em"],[P3+" aime","eel em"],["nous aimons","noo zeh-moh(n)"],["vous aimez","voo zeh-may"],[P6+" aiment","eel zem"]],
  { pc:["j'ai aimé","I liked"], fp:["je vais aimer","I am going to like"], imp:["j'aimais","I liked / I used to like"], fut:["j'aimerai","I will like"], cond:["j'aimerais","I would like"] },
  "Use aimer for opinions: j'aime le foot (I like football). Aimer + infinitive: j'aime lire (I like reading). Je n'aime pas = I don't like. Stronger: j'adore (I love), je déteste (I hate). Add a reason: parce que c'est intéressant.",
  [["J'aime les maths parce que c'est logique.","I like maths because it's logical."],["Je n'aime pas nager.","I don't like swimming."],["J'aimerais visiter Paris un jour.","I would like to visit Paris one day."]],
  "After aimer use 'le / la / les', not 'du / de la': j'aime le chocolat (I like chocolate), never 'j'aime du chocolat'.");
verb("jouer","jouer","to play","Regular -er verb","zhoo-AY",
  [["je joue","zhuh zhoo"],["tu joues","tew zhoo"],[P3+" joue","eel zhoo"],["nous jouons","noo zhoo-oh(n)"],["vous jouez","voo zhoo-ay"],[P6+" jouent","eel zhoo"]],
  { pc:["j'ai joué","I played"], fp:["je vais jouer","I am going to play"], imp:["je jouais","I was playing / I used to play"], fut:["je jouerai","I will play"], cond:["je jouerais","I would play"] },
  "Jouer à + sport or game: je joue au foot, au tennis, aux échecs (chess). Jouer de + instrument: je joue du piano, de la guitare.",
  [["Je joue au basket le mercredi.","I play basketball on Wednesdays."],["Ma sœur joue du violon.","My sister plays the violin."],["Nous avons joué aux jeux vidéo.","We played video games."]],
  "Sport = jouer à (au foot); music = jouer de (du piano). Mixing them up is a very common mistake.");
verb("habiter","habiter","to live (in a place)","Regular -er verb","ah-bee-TAY",
  [["j'habite","zha-beet"],["tu habites","tew ah-beet"],[P3+" habite","ee-la-beet"],["nous habitons","noo za-bee-toh(n)"],["vous habitez","voo za-bee-tay"],[P6+" habitent","eel za-beet"]],
  { pc:["j'ai habité","I lived"], fp:["je vais habiter","I am going to live"], imp:["j'habitais","I lived / I used to live"], fut:["j'habiterai","I will live"], cond:["j'habiterais","I would live"] },
  "Habiter à + city: j'habite à Dubaï. Habiter en / au + country: j'habite aux Émirats arabes unis. The h is silent, so je becomes j'.",
  [["J'habite à Dubaï depuis trois ans.","I have lived in Dubai for three years."],["Mes grands-parents habitent en France.","My grandparents live in France."],["Où est-ce que tu habites ?","Where do you live?"]],
  "Write j'habite, never 'je habite'. The h is never pronounced in French.");
verb("sappeler","s'appeler","to be called","Reflexive -er verb with double l","sah-puh-LAY",
  [["je m'appelle","zhuh ma-pel"],["tu t'appelles","tew ta-pel"],[P3+" s'appelle","eel sa-pel"],["nous nous appelons","noo noo za-puh-loh(n)"],["vous vous appelez","voo voo za-puh-lay"],[P6+" s'appellent","eel sa-pel"]],
  { pc:["je me suis appelé(e)","I was called"], fp:["je vais m'appeler","I am going to be called"], imp:["je m'appelais","I was called / I used to be called"], fut:["je m'appellerai","I will be called"], cond:["je m'appellerais","I would be called"] },
  "Use it to give names: Je m'appelle Mikaeel (My name is Mikaeel). Literally 'I call myself'. Ask a friend: Comment tu t'appelles ? Ask an adult: Comment vous appelez-vous ?",
  [["Je m'appelle Sara et j'ai douze ans.","My name is Sara and I'm twelve."],["Mon chat s'appelle Mimi.","My cat is called Mimi."],["Comment s'appellent tes parents ?","What are your parents called?"]],
  "Double l (-elle) when the ending is silent: je m'appelle, ils s'appellent. Single l with nous and vous: nous nous appelons.");
verb("selever","se lever","to get up","Reflexive verb (routine)","suh luh-VAY",
  [["je me lève","zhuh muh lev"],["tu te lèves","tew tuh lev"],[P3+" se lève","eel suh lev"],["nous nous levons","noo noo luh-voh(n)"],["vous vous levez","voo voo luh-vay"],[P6+" se lèvent","eel suh lev"]],
  { pc:["je me suis levé(e)","I got up"], fp:["je vais me lever","I am going to get up"], imp:["je me levais","I was getting up / I used to get up"], fut:["je me lèverai","I will get up"], cond:["je me lèverais","I would get up"] },
  "Reflexive verbs have an extra pronoun (me, te, se, nous, vous, se). Daily routine: je me réveille (I wake up), je me lève, je me douche, je m'habille, je me couche (I go to bed). In the past they all use être.",
  [["Je me lève à six heures et demie.","I get up at half past six."],["Le week-end, nous nous levons tard.","At the weekend we get up late."],["Hier, elle s'est levée à sept heures.","Yesterday she got up at seven."]],
  "The negative goes around the pronoun AND the verb: je ne me lève pas tôt.");
verb("boire","boire","to drink","Irregular","BWAHR",
  [["je bois","zhuh bwah"],["tu bois","tew bwah"],[P3+" boit","eel bwah"],["nous buvons","noo bew-voh(n)"],["vous buvez","voo bew-vay"],[P6+" boivent","eel bwahv"]],
  { pc:["j'ai bu","I drank"], fp:["je vais boire","I am going to drink"], imp:["je buvais","I was drinking / I used to drink"], fut:["je boirai","I will drink"], cond:["je boirais","I would drink"] },
  "Boire + du / de la / de l' / des: je bois de l'eau (I drink water). In the negative: je ne bois pas de café.",
  [["Je bois beaucoup d'eau quand il fait chaud.","I drink lots of water when it's hot."],["Qu'est-ce que tu bois ?","What are you drinking?"],["Nous buvons du thé à la menthe.","We drink mint tea."]],
  "Nous buvons and vous buvez change their stem: not 'nous boivons'.");
verb("voir","voir","to see","Irregular","VWAHR",
  [["je vois","zhuh vwah"],["tu vois","tew vwah"],[P3+" voit","eel vwah"],["nous voyons","noo vwah-yoh(n)"],["vous voyez","voo vwah-yay"],[P6+" voient","eel vwah"]],
  { pc:["j'ai vu","I saw"], fp:["je vais voir","I am going to see"], imp:["je voyais","I was seeing / I used to see"], fut:["je verrai","I will see"], cond:["je verrais","I would see"] },
  "Use it for seeing and watching events: voir un film (to see a film), voir mes amis. Regarder means 'to watch' (regarder la télé).",
  [["Je vois mes cousins le week-end.","I see my cousins at the weekend."],["Hier, nous avons vu un match de foot.","Yesterday we saw a football match."],["Tu vois la tour Burj Khalifa ?","Can you see the Burj Khalifa tower?"]],
  "The past participle is vu (j'ai vu), and the future is je verrai with a double r.");
verb("sortir","sortir","to go out","Irregular · takes être in the past","sor-TEER",
  [["je sors","zhuh sor"],["tu sors","tew sor"],[P3+" sort","eel sor"],["nous sortons","noo sor-toh(n)"],["vous sortez","voo sor-tay"],[P6+" sortent","eel sort"]],
  { pc:["je suis sorti(e)","I went out"], fp:["je vais sortir","I am going to go out"], imp:["je sortais","I was going out / I used to go out"], fut:["je sortirai","I will go out"], cond:["je sortirais","I would go out"] },
  "Sortir avec des amis = to go out with friends. Partir (to leave) and dormir (to sleep) follow the same pattern: je pars, je dors.",
  [["Je sors avec mes amis le vendredi.","I go out with my friends on Fridays."],["Samedi, nous sommes sortis au restaurant.","On Saturday we went out to a restaurant."],["À quelle heure tu sors de l'école ?","What time do you leave school?"]],
  "Singular forms drop the t: je sors, tu sors, il sort (t only in il). Past: je suis sorti(e), with être.");
verb("partir","partir","to leave","Irregular · takes être in the past","par-TEER",
  [["je pars","zhuh par"],["tu pars","tew par"],[P3+" part","eel par"],["nous partons","noo par-toh(n)"],["vous partez","voo par-tay"],[P6+" partent","eel part"]],
  { pc:["je suis parti(e)","I left"], fp:["je vais partir","I am going to leave"], imp:["je partais","I was leaving"], fut:["je partirai","I will leave"], cond:["je partirais","I would leave"] },
  "Partir en vacances = to go on holiday. Partir de = to leave from. Use it for travel and holidays.",
  [["Je pars à l'école à sept heures.","I leave for school at seven."],["L'été prochain, nous allons partir en France.","Next summer we are going to go to France."],["Le train est parti à l'heure.","The train left on time."]],
  "Past uses être: elle est partie. Don't confuse partir (to leave) with partager (to share).");
verb("mettre","mettre","to put / to put on","Irregular","MET-ruh",
  [["je mets","zhuh meh"],["tu mets","tew meh"],[P3+" met","eel meh"],["nous mettons","noo meh-toh(n)"],["vous mettez","voo meh-tay"],[P6+" mettent","eel met"]],
  { pc:["j'ai mis","I put / I put on"], fp:["je vais mettre","I am going to put"], imp:["je mettais","I was putting / I used to put on"], fut:["je mettrai","I will put"], cond:["je mettrais","I would put"] },
  "Use it for clothes: je mets un pull (I put on a jumper) and for putting things somewhere: mettre la table (set the table).",
  [["Je mets mon uniforme le matin.","I put on my uniform in the morning."],["Il met ses livres dans son sac.","He puts his books in his bag."],["J'ai mis mes baskets.","I put on my trainers."]],
  "Past participle is mis: j'ai mis, never 'j'ai metté'.");
verb("lire","lire","to read","Irregular","LEER",
  [["je lis","zhuh lee"],["tu lis","tew lee"],[P3+" lit","eel lee"],["nous lisons","noo lee-zoh(n)"],["vous lisez","voo lee-zay"],[P6+" lisent","eel leez"]],
  { pc:["j'ai lu","I read (past)"], fp:["je vais lire","I am going to read"], imp:["je lisais","I was reading / I used to read"], fut:["je lirai","I will read"], cond:["je lirais","I would read"] },
  "Use it for books, magazines and messages: je lis des romans (I read novels), j'aime lire.",
  [["Je lis un livre avant de dormir.","I read a book before sleeping."],["Nous lisons un poème en classe.","We are reading a poem in class."],["Le week-end dernier, j'ai lu une BD.","Last weekend I read a comic."]],
  "Past participle is lu (j'ai lu), not 'j'ai lisé'.");
verb("ecrire","écrire","to write","Irregular","ay-KREER",
  [["j'écris","zhay-kree"],["tu écris","tew ay-kree"],[P3+" écrit","ee-lay-kree"],["nous écrivons","noo zay-kree-voh(n)"],["vous écrivez","voo zay-kree-vay"],[P6+" écrivent","eel zay-kreev"]],
  { pc:["j'ai écrit","I wrote"], fp:["je vais écrire","I am going to write"], imp:["j'écrivais","I was writing / I used to write"], fut:["j'écrirai","I will write"], cond:["j'écrirais","I would write"] },
  "Écrire à quelqu'un = to write to someone: j'écris à ma correspondante (I write to my penfriend).",
  [["J'écris un e-mail à mon ami.","I am writing an email to my friend."],["Vous écrivez la date au tableau.","You write the date on the board."],["Elle a écrit une histoire.","She wrote a story."]],
  "Remember the v in the plural: nous écrivons, ils écrivent.");
verb("dire","dire","to say / to tell","Irregular","DEER",
  [["je dis","zhuh dee"],["tu dis","tew dee"],[P3+" dit","eel dee"],["nous disons","noo dee-zoh(n)"],["vous dites","voo deet"],[P6+" disent","eel deez"]],
  { pc:["j'ai dit","I said"], fp:["je vais dire","I am going to say"], imp:["je disais","I was saying / I used to say"], fut:["je dirai","I will say"], cond:["je dirais","I would say"] },
  "Dire que… = to say that…: Mon prof dit que je travaille bien. Comment dit-on… en français ? = How do you say… in French?",
  [["Comment dit-on 'homework' en français ?","How do you say 'homework' in French?"],["Ma mère dit que je dois ranger ma chambre.","My mum says I have to tidy my room."],["Qu'est-ce que tu as dit ?","What did you say?"]],
  "Vous dites is irregular, like vous faites and vous êtes: never 'vous disez'.");
verb("acheter","acheter","to buy","-er verb with an accent change","ash-TAY",
  [["j'achète","zha-shet"],["tu achètes","tew ah-shet"],[P3+" achète","ee-la-shet"],["nous achetons","noo zash-toh(n)"],["vous achetez","voo zash-tay"],[P6+" achètent","eel za-shet"]],
  { pc:["j'ai acheté","I bought"], fp:["je vais acheter","I am going to buy"], imp:["j'achetais","I was buying / I used to buy"], fut:["j'achèterai","I will buy"], cond:["j'achèterais","I would buy"] },
  "Acheter adds a grave accent (è) when the ending is silent: j'achète but nous achetons. Useful for shopping: J'ai acheté un cadeau pour ma mère.",
  [["J'achète du pain à la boulangerie.","I buy bread at the bakery."],["Nous achetons des souvenirs.","We are buying souvenirs."],["Qu'est-ce que tu as acheté au centre commercial ?","What did you buy at the mall?"]],
  "Write the accent: j'achète (zha-shet). Without it, the e would be silent and the word would be hard to say.");
verb("savoir","savoir","to know (a fact / how to)","Irregular · modal-type verb","sa-VWAHR",
  [["je sais","zhuh seh"],["tu sais","tew seh"],[P3+" sait","eel seh"],["nous savons","noo sa-voh(n)"],["vous savez","voo sa-vay"],[P6+" savent","eel sav"]],
  { pc:["j'ai su","I knew / I found out"], fp:["je vais savoir","I am going to know"], imp:["je savais","I knew"], fut:["je saurai","I will know"], cond:["je saurais","I would know"] },
  "Savoir = to know a fact or how to do something: je sais nager (I know how to swim). Connaître = to know a person or place: je connais Paris.",
  [["Je ne sais pas.","I don't know."],["Tu sais parler arabe ?","Can you speak Arabic? (Do you know how to?)"],["Nous savons que le recyclage est important.","We know that recycling is important."]],
  "Je sais (a fact) vs je connais (a person or place): je connais ton frère, never 'je sais ton frère'.");
verb("dormir","dormir","to sleep","Irregular (like sortir)","dor-MEER",
  [["je dors","zhuh dor"],["tu dors","tew dor"],[P3+" dort","eel dor"],["nous dormons","noo dor-moh(n)"],["vous dormez","voo dor-may"],[P6+" dorment","eel dorm"]],
  { pc:["j'ai dormi","I slept"], fp:["je vais dormir","I am going to sleep"], imp:["je dormais","I was sleeping / I used to sleep"], fut:["je dormirai","I will sleep"], cond:["je dormirais","I would sleep"] },
  "Health topic: il faut dormir huit heures (you need to sleep eight hours). Unlike sortir and partir, dormir uses avoir in the past: j'ai dormi.",
  [["Je dors huit heures par nuit.","I sleep eight hours a night."],["Le bébé dort.","The baby is sleeping."],["J'ai mal dormi hier soir.","I slept badly last night."]],
  "Dormir uses AVOIR in the past (j'ai dormi), even though sortir and partir use être.");
const LEVEL_TENSES = { core:["pc","fp"], ks3:["pc","fp","imp"], igcse:["pc","fp","imp","fut","cond"] };
const TENSE_NAME = { pc:"Past (passé composé)", fp:"Near future (aller + infinitive)", imp:"Imperfect (was …ing / used to)", fut:"Future (will)", cond:"Conditional (would)" };
function speakForm(display){
  const m = String(display).match(/^([a-zé]+(?:\/[a-zé]+)+)\s+(.*)$/i);
  return m ? m[1].split("/").map(p => p + " " + m[2]).join(", ") : display;
}
function verbHTML(v, level){
  const ts = LEVEL_TENSES[level] || LEVEL_TENSES.core, all = v.forms.map(f => speakForm(f[0])).join(". ");
  return `<details class="spxv"><summary><span class="spxv-h"><b lang="fr">${esc(v.inf)}</b> <span class="muted">= ${esc(v.en)}</span></span><span class="spxv-k">${esc(v.kind)}</span></summary>
    <div class="spxv-b">
      <div class="row" style="gap:6px;flex-wrap:wrap;align-items:center"><span class="muted small">Sounds like: <b>${esc(v.sound)}</b></span>${btn(v.inf, "fr")}${slowBtn(v.inf, "fr")}</div>
      <table class="spxt"><thead><tr><th>Present tense</th><th></th><th>Sounds like</th></tr></thead><tbody>
      ${v.forms.map(f => `<tr><td lang="fr"><b>${esc(f[0].replace(/\//g, " / "))}</b></td><td style="white-space:nowrap">${btn(speakForm(f[0]), "fr")}</td><td class="muted small">${esc(f[1])}</td></tr>`).join("")}</tbody></table>
      <div class="row" style="gap:6px;margin-top:6px">${btn(all, "fr", "🔊 Hear all six")}${slowBtn(all, "fr")}</div>
      <div class="spxv-n"><b>Other tenses</b><ul>${ts.filter(k => v.t[k]).map(k => `<li><span class="muted small">${TENSE_NAME[k]}:</span> <b lang="fr">${esc(v.t[k][0])}</b> = ${esc(v.t[k][1])} ${btn(v.t[k][0].replace(/\(e\)/g, ""), "fr")}</li>`).join("")}</ul></div>
      <div class="spxv-n"><b>📘 How to use it</b><p>${esc(v.use)}</p></div>
      <div class="spxv-n"><b>💬 Example sentences</b>${v.ex.map(e => `<div class="spxex"><span lang="fr"><b>${esc(e[0])}</b></span> ${btn(e[0], "fr", "🔊 Read")}${slowBtn(e[0], "fr")}<div class="muted small">${esc(e[1])}</div></div>`).join("")}</div>
      <div class="spxv-n spxwarn"><b>⚠️ Watch out</b><p>${esc(v.trap)}</p></div>
      <div class="small" style="margin-top:6px">📺 <a href="https://www.youtube.com/results?search_query=${encodeURIComponent("how to conjugate " + v.inf + " in French present tense pronunciation")}" target="_blank" rel="noopener">Videos on ${esc(v.inf)}</a> · <a href="https://www.wordreference.com/conj/frverbs.aspx?v=${encodeURIComponent(v.inf)}" target="_blank" rel="noopener">Full conjugation table</a></div>
    </div></details>`;
}
function verbsHTML(ids, level, title){
  const L = (ids || []).map(i => V[i]).filter(Boolean); if (!L.length) return "";
  return `<div class="spxvl"><div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px"><b>🗣️ ${esc(title || "Verb lab: the verbs you need for this topic")}</b>${slowToggle()}</div>
    <p class="muted small" style="margin:4px 0 8px">Tap a verb to open it. 🔊 plays the French; 🐢 plays it slowly. Say each form out loud after you hear it.</p>${L.map(v => verbHTML(v, level)).join("")}</div>`;
}

/* ---------------- further learning links ---------------- */
const enc = encodeURIComponent;
function linksHTML(o){
  o = o || {};
  const q = [o.level, o.subject, o.topic].filter(Boolean).join(" "), L = [];
  L.push(["📺", "YouTube videos: " + o.topic, "https://www.youtube.com/results?search_query=" + enc(o.yt || (q + (o.lang === "fr" ? " French lesson" : " explained")))]);
  if (o.bitesize !== false) L.push(["📗", "BBC Bitesize", "https://www.bbc.co.uk/bitesize/search?q=" + enc((o.bbc || o.topic) + (o.lang === "fr" ? " French" : ""))]);
  if (o.khan) L.push(["🎓", "Khan Academy", "https://www.khanacademy.org/search?page_search_query=" + enc(o.khan === true ? o.topic : o.khan)]);
  if (o.lang === "fr") L.push(["🗣️", "Hear French pronunciation (Forvo)", "https://forvo.com/languages/fr/"]);
  (o.extra || []).forEach(x => L.push(x));
  return `<div class="spxlinks"><b>🔗 Learn more</b><div>${L.map(l => `<a href="${esc(l[2])}" target="_blank" rel="noopener">${l[0]} ${esc(l[1])}</a>`).join("")}</div><p class="muted small" style="margin-top:4px">Links open in a new tab. Ask an adult before watching videos you haven't seen.</p></div>`;
}

/* ---------------- styles ---------------- */
const css = `.spxb{border:1px solid var(--line,#d8deea);background:var(--card,#fff);color:var(--ink,#16223a);border-radius:999px;padding:2px 9px;font-size:.85rem;font-weight:700;cursor:pointer;line-height:1.4;vertical-align:middle;margin:0 2px}
.spxb:hover{border-color:var(--navy,#1b2d4e)}.spxb.on{background:var(--soft,#e9edf5);transform:scale(.96)}
.spxslow{font-size:.85rem;display:inline-flex;gap:6px;align-items:center;cursor:pointer}
.spxvl{border:2px solid var(--line,#d8deea);border-radius:14px;padding:12px;margin-top:12px;background:var(--card,#fff)}
.spxv{border:1px solid var(--line,#d8deea);border-radius:12px;margin-top:8px;background:var(--card,#fff)}
.spxv>summary{cursor:pointer;padding:10px 12px;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;list-style:none}
.spxv>summary::-webkit-details-marker{display:none}.spxv>summary::before{content:"▸";margin-right:6px;color:var(--red,#dc2b3e)}.spxv[open]>summary::before{content:"▾"}
.spxv-h{flex:1}.spxv-k{font-size:.78rem;font-weight:700;color:var(--muted,#5b6782);background:var(--soft,#e9edf5);border-radius:999px;padding:2px 9px}
.spxv-b{padding:0 12px 12px}.spxt{width:100%;border-collapse:collapse;margin-top:8px;font-size:.95rem}.spxt td,.spxt th{border-bottom:1px solid var(--line,#d8deea);padding:5px 6px;text-align:left}
.spxt th{font-size:.78rem;color:var(--muted,#5b6782)}.spxv-n{margin-top:10px}.spxv-n p{margin-top:2px}.spxv-n ul{margin:4px 0 0 18px;display:grid;gap:4px}
.spxex{background:var(--soft,#e9edf5);border-radius:10px;padding:7px 10px;margin-top:6px}.spxwarn{background:var(--warnbg,#fff2dc);border-radius:10px;padding:8px 10px}
.spxlinks{border-top:1px dashed var(--line,#d8deea);margin-top:12px;padding-top:10px}.spxlinks>div{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.spxlinks a{border:1px solid var(--line,#d8deea);border-radius:999px;padding:4px 11px;font-size:.88rem;font-weight:700;text-decoration:none;color:var(--ink,#16223a);background:var(--card,#fff)}
.spxlinks a:hover{border-color:var(--red,#dc2b3e)}.spxidea{display:flex;gap:6px;align-items:flex-start}.spxidea>span{flex:1}
.spxpron{background:var(--soft,#e9edf5);border-radius:12px;padding:10px 12px;margin-top:10px}`;
try { const st = document.createElement("style"); st.textContent = css; (document.head || document.documentElement).appendChild(st); } catch(e){}

return { speak, hush, pieces, langOf, btn, slowBtn, slowToggle, VERBS:V, verbsHTML, verbHTML, linksHTML, hasVoice, speakForm, esc };
})();
