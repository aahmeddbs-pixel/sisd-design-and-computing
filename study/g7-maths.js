/* Study Plus · IB MYP 2 (Grade 7) · Mathematics: everything about probability.
   Six new topics, each with a question generator (hundreds of different questions at Core, Extended and Challenge level),
   step-by-step worked examples, and video lessons (Corbettmaths videos checked on corbettmaths.com; Oak National Academy lessons).
   Answers can be typed as a fraction (3/8), a decimal (0.375) or a percentage (37.5%): tasks marked prob:true accept all three.
   Loaded after study/gen.js; adds its generators to window.STUDY_GEN. */
(function(){
"use strict";
/* ---------- generator registry (shared by the g7-*.js files) ---------- */
window.G7GEN = window.G7GEN || {};
if (window.STUDY_GEN && !window.STUDY_GEN.__g7){
  const SG = window.STUDY_GEN, make0 = SG.make, has0 = SG.has;
  SG.make = (key, d, seed) => { const g = window.G7GEN[key]; if (!g) return make0(key, d, seed);
    try { const t = g(d, SG.rng(seed >>> 0)); if (!t || (t.k === "mcq" && (t.a < 0 || !t.o || t.o.length < 2 || new Set(t.o).size !== t.o.length))) return null; return t; } catch(e){ return null; } };
  SG.has = key => !!window.G7GEN[key] || has0(key);
  SG.__g7 = true;
}
window.G7 = window.G7 || {};
const G7 = window.G7;
G7.kit = r => ({ int:(a, b) => a + Math.floor(r() * (b - a + 1)), pick:L => L[Math.floor(r() * L.length)],
  shuffle:L => { const a = L.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; } });
G7.gen = (key, levels, base) => levels.split("").map((d, i) => window.STUDY_GEN && window.STUDY_GEN.make(key, +d, base + i * 977)).filter(Boolean);
G7.mcq = (d, q, right, wrong, x, extra) => { const o = [right].concat(wrong.filter(w => String(w) !== String(right))).filter((v, i, A) => A.indexOf(v) === i).slice(0, 4); return Object.assign({ d, k:"mcq", q, o, a:0, x }, extra || {}); };
G7.ex = (q, steps, a) => ({ q, steps, a });

/* ---------- fractions ---------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b){ [a, b] = [b, a % b]; } return a || 1; };
const fr = (n, d) => { const g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : n + "/" + d; };
const r6 = x => Math.round(x * 1e6) / 1e6;
const dec = x => String(r6(x));
const niceDec = (n, d) => { const v = n / d; return Math.abs(v * 1000 - Math.round(v * 1000)) < 1e-9 ? dec(v) : null; };
/* a probability answer: accepts the fraction, the decimal (to 3 dp) or a percentage */
const P = (d, q, n, den, x, extra) => { const nd = niceDec(n, den); return Object.assign({ d, k:"num", q: q + "\n(Give your answer as a fraction, a decimal or a percentage.)", a:r6(n / den), tol:0.0015, prob:true, show: fr(n, den) + (nd != null && den !== 1 && fr(n, den) !== nd ? " (= " + nd + ")" : ""), x }, extra || {}); };
const PD = (d, q, v, x, extra) => Object.assign({ d, k:"num", q: q + "\n(Give your answer as a decimal, fraction or percentage.)", a:r6(v), tol:0.0015, prob:true, show: dec(v), x }, extra || {});
G7.P = P; G7.PD = PD; G7.fr = fr; G7.dec = dec;

const G = window.G7GEN;
const COLOURS = ["red", "blue", "green", "yellow", "purple", "orange", "white", "black"];
const word = p => p === 0 ? "impossible" : p === 1 ? "certain" : p === 0.5 ? "even chance" : p < 0.5 ? "unlikely" : "likely";

/* ================= 1. Probability basics ================= */
G["maths/probbasics"] = (d, r) => { const K = G7.kit(r);
  if (d === 1){ const k = K.int(0, 3);
    if (k === 0){ const cs = K.shuffle(COLOURS).slice(0, 3), n = cs.map(() => K.int(1, 9)), N = n[0] + n[1] + n[2], i = K.int(0, 2);
      return P(1, `A bag has ${cs.map((c, j) => n[j] + " " + c).join(", ")} counters. One counter is taken at random. What is P(${cs[i]})?`, n[i], N,
        `Count the total: ${n.join(" + ")} = ${N} counters.\nCount the ${cs[i]} counters: ${n[i]}.\nP(${cs[i]}) = number of ${cs[i]} ÷ total = ${n[i]}/${N}${fr(n[i], N) !== n[i] + "/" + N ? " = " + fr(n[i], N) + " (simplified)" : ""}.`); }
    if (k === 1){ const E = K.pick([["an even number", [2, 4, 6]], ["an odd number", [1, 3, 5]], ["a prime number", [2, 3, 5]], ["a factor of 6", [1, 2, 3, 6]], ["a multiple of 3", [3, 6]], ["a square number", [1, 4]], ["a number less than 5", [1, 2, 3, 4]], ["a number greater than 4", [5, 6]], ["a 7", []]]);
      return P(1, `A fair six-sided dice is rolled. What is the probability of getting ${E[0]}?`, E[1].length, 6, `There are 6 equally likely outcomes: 1, 2, 3, 4, 5, 6.\nThe outcomes that work: ${E[1].length ? E[1].join(", ") : "none"} → ${E[1].length} of them.\nP = ${E[1].length}/6${E[1].length && fr(E[1].length, 6) !== E[1].length + "/6" ? " = " + fr(E[1].length, 6) : ""}.`); }
    if (k === 2){ const ps = [[0, "0"], [0.1, "0.1"], [0.25, "1/4"], [0.5, "0.5"], [0.75, "75%"], [0.9, "9/10"], [1, "1"]], c = K.pick(ps);
      return G7.mcq(1, `An event has a probability of ${c[1]}. Which word best describes it?`, word(c[0]), ["impossible", "unlikely", "even chance", "likely", "certain"].filter(w => w !== word(c[0])).slice(0, 3).concat([]), `On the probability scale, 0 = impossible, below 0.5 = unlikely, 0.5 = even chance, above 0.5 = likely, 1 = certain. ${c[1]} is ${c[0]} as a decimal, so it is ${word(c[0])}.`); }
    const n = K.pick([4, 5, 8, 10]), t = K.int(1, n - 1);
    return P(1, `A spinner has ${n} equal sections numbered 1 to ${n}. What is the probability it lands on a number less than or equal to ${t}?`, t, n, `The numbers 1 to ${t} work: that is ${t} sections out of ${n}.\nP = ${t}/${n}${fr(t, n) !== t + "/" + n ? " = " + fr(t, n) : ""}.`); }
  if (d === 2){ const k = K.int(0, 3);
    if (k === 0){ const p = K.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.6, 0.65, 0.7, 0.72, 0.8, 0.85, 0.9, 0.04, 0.37]), ev = K.pick(["it rains tomorrow", "a train is late", "Sara wins her match", "a seed grows", "a bus is full"]);
      return PD(2, `The probability that ${ev} is ${dec(p)}. What is the probability that it does NOT happen?`, 1 - p, `All the probabilities add up to 1.\nP(not happening) = 1 − P(happening)\n= 1 − ${dec(p)} = ${dec(1 - p)}.`); }
    if (k === 1){ const W = K.pick(["PROBABILITY", "MATHEMATICS", "STATISTICS", "BANANA", "MISSISSIPPI", "DUBAI", "CALCULATOR", "PARALLELOGRAM"]), L = W.split(""), ch = K.pick(L), c = L.filter(x => x === ch).length;
      return P(2, `Each letter of the word ${W} is written on a card. One card is picked at random. What is P(${ch})?`, c, L.length, `${W} has ${L.length} letters.\nThe letter ${ch} appears ${c} time${c > 1 ? "s" : ""}.\nP(${ch}) = ${c}/${L.length}${fr(c, L.length) !== c + "/" + L.length ? " = " + fr(c, L.length) : ""}.`); }
    if (k === 2){ const W = K.pick(["EDUCATION", "SPREADSHEET", "ENGLAND", "ALGEBRA", "GEOGRAPHY", "EQUATION"]), L = W.split(""), v = L.filter(x => "AEIOU".includes(x)).length;
      return P(2, `A letter is chosen at random from the word ${W}. What is the probability it is a vowel (A, E, I, O, U)?`, v, L.length, `${W} has ${L.length} letters.\nVowels: ${L.filter(x => "AEIOU".includes(x)).join(", ")} → ${v} vowels.\nP(vowel) = ${v}/${L.length}${fr(v, L.length) !== v + "/" + L.length ? " = " + fr(v, L.length) : ""}.`); }
    const cs = K.shuffle(COLOURS).slice(0, 3), n = cs.map(() => K.int(2, 9)), N = n[0] + n[1] + n[2], i = K.int(0, 2);
    return P(2, `A bag has ${cs.map((c, j) => n[j] + " " + c).join(", ")} sweets. A sweet is taken at random. What is the probability it is NOT ${cs[i]}?`, N - n[i], N, `Total = ${N}. Not ${cs[i]} = ${N} − ${n[i]} = ${N - n[i]}.\nP(not ${cs[i]}) = ${N - n[i]}/${N}${fr(N - n[i], N) !== (N - n[i]) + "/" + N ? " = " + fr(N - n[i], N) : ""}.\n(Or: 1 − ${n[i]}/${N}.)`); }
  const k = K.int(0, 2);
  if (k === 0){ const a = K.pick([0.1, 0.15, 0.2, 0.25, 0.3]), b = K.pick([0.05, 0.1, 0.2, 0.25]), c = K.pick([0.1, 0.15, 0.3]); const rest = r6(1 - a - b - c); if (rest <= 0) return G["maths/probbasics"](2, r);
    return PD(3, `A spinner can land on red, blue, green or white.\nP(red) = ${dec(a)}, P(blue) = ${dec(b)}, P(green) = ${dec(c)}.\nWhat is P(white)?`, rest, `The probabilities of all outcomes add up to 1.\n${dec(a)} + ${dec(b)} + ${dec(c)} = ${dec(a + b + c)}.\nP(white) = 1 − ${dec(a + b + c)} = ${dec(rest)}.`); }
  if (k === 1){ const a = K.pick([0.1, 0.2, 0.25, 0.3, 0.4]), b = K.pick([0.05, 0.1, 0.15, 0.2]), m = K.pick([2, 3, 4]); const x = r6((1 - a - b) / (1 + m)); if (x <= 0 || Math.abs(x * 1000 - Math.round(x * 1000)) > 1e-9) return G["maths/probbasics"](3, r);
    return PD(3, `The table shows the probabilities for a biased spinner.\nA: ${dec(a)}   B: ${dec(b)}   C: x   D: ${m}x\nFind the value of x.`, x, `All probabilities add up to 1, so ${dec(a)} + ${dec(b)} + x + ${m}x = 1.\n${dec(a + b)} + ${m + 1}x = 1\n${m + 1}x = ${dec(1 - a - b)}\nx = ${dec(1 - a - b)} ÷ ${m + 1} = ${dec(x)}.`); }
  const red = K.int(2, 6), blue = K.int(1, 6), k2 = K.pick([3, 4, 5]); const total = red * k2, add = total - red - blue; if (add <= 0) return G["maths/probbasics"](3, r);
  return { d:3, k:"num", q:`A bag has ${red} red and ${blue} blue balls. How many green balls must be added so that P(red) = 1/${k2}?`, a:add, x:`If P(red) = 1/${k2}, the total must be ${k2} × ${red} = ${total} balls.\nThere are ${red + blue} balls now, so add ${total} − ${red + blue} = ${add} green balls.\nCheck: ${red}/${total} = 1/${k2} ✓` };
};

/* ================= 2. Relative frequency and expected outcomes ================= */
G["maths/experimental"] = (d, r) => { const K = G7.kit(r);
  if (d === 1){ const k = K.int(0, 2);
    if (k === 0){ const n = K.pick([20, 25, 40, 50, 80, 100, 200]), c = K.int(1, n - 1), ev = K.pick(["heads", "a six", "red", "a goal", "a bullseye"]);
      return P(1, `In an experiment there were ${n} trials. The result was ${ev} ${c} times. What is the relative frequency of ${ev}?`, c, n, `Relative frequency = number of times it happened ÷ number of trials\n= ${c}/${n}${fr(c, n) !== c + "/" + n ? " = " + fr(c, n) : ""}${niceDec(c, n) != null ? " = " + niceDec(c, n) : ""}.`); }
    if (k === 1){ const s = K.pick([2, 4, 5, 6, 8, 10]), n = s * K.int(5, 30);
      return { d:1, k:"num", q:`A fair ${s === 2 ? "coin" : s + "-sided spinner"} is ${s === 2 ? "flipped" : "spun"} ${n} times. How many times would you expect ${s === 2 ? "heads" : "it to land on 1"}?`, a:n / s, x:`P(${s === 2 ? "heads" : "1"}) = 1/${s}.\nExpected number = probability × number of trials = 1/${s} × ${n} = ${n / s}.` }; }
    return G7.mcq(1, "Which gives the most reliable estimate of a probability?", "An experiment with 1000 trials", ["An experiment with 10 trials", "An experiment with 50 trials", "One trial"], "The more trials, the closer the relative frequency usually gets to the true probability.");
  }
  if (d === 2){ const k = K.int(0, 2);
    if (k === 0){ const p = K.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.6, 0.65, 0.7, 0.8]), n = K.pick([20, 40, 60, 80, 100, 120, 200, 300, 400, 500]), ev = K.pick(["a bus is late", "a light is red", "a plant flowers", "a customer buys a drink"]);
      return { d:2, k:"num", q:`The probability that ${ev} is ${dec(p)}. Estimate how many times this happens in ${n} trials.`, a:r6(p * n), tol:0.01, x:`Expected number = probability × number of trials\n= ${dec(p)} × ${n} = ${dec(p * n)}.` }; }
    if (k === 1){ const N = K.pick([20, 30, 40, 50, 60]), n = K.pick([50, 100, 200]), red = K.pick([10, 20, 25, 30, 40, 50]); if (red >= n) return G["maths/experimental"](2, r);
      return { d:2, k:"num", q:`A bag has ${N} counters. A counter is taken out, its colour noted and put back, ${n} times. Red was picked ${red} times. Estimate the number of red counters in the bag.`, a:r6(red / n * N), tol:0.01, x:`Relative frequency of red = ${red}/${n} = ${dec(red / n)}.\nEstimated number of red = ${dec(red / n)} × ${N} = ${dec(red / n * N)}.` }; }
    const n = K.pick([60, 120, 180, 300]), sixes = n / 6 + K.pick([-3, 0, 2, 4, 30, 40]), biased = sixes - n / 6 > 15;
    return G7.mcq(2, `A dice is rolled ${n} times and lands on six ${sixes} times. Expected sixes for a fair dice = ${n} ÷ 6 = ${n / 6}. What can you say?`, biased ? "It may be biased: there are far more sixes than expected" : "It looks fair: the number of sixes is close to what is expected", [biased ? "It looks fair: the number of sixes is close to what is expected" : "It is definitely biased", "Dice can never be biased", "Rolling more times would make no difference"], `Compare with the expected number, ${n / 6}. ${biased ? "The difference is large" : "Small differences are normal"}, and more trials would make you surer.`);
  }
  const k = K.int(0, 1);
  if (k === 0){ const tr = [10, 50, 100, 500], base = K.pick([0.2, 0.3, 0.25, 0.4]), counts = tr.map((t, i) => Math.max(1, Math.round(t * (base + [0.1, -0.06, 0.03, 0.004][i]))));
    return PD(3, `A drawing pin is dropped. Results:\n${tr.map((t, i) => `${t} drops: point up ${counts[i]} times`).join("\n")}\nWhat is the best estimate of P(point up)? Use the largest number of trials.`, counts[3] / 500, `Use the most trials (500), because it is the most reliable.\nRelative frequency = ${counts[3]}/500 = ${dec(counts[3] / 500)}.`); }
  const a = K.pick([0.2, 0.3, 0.4]), b = K.pick([0.15, 0.25, 0.35]), n = K.pick([200, 300, 400, 500]);
  return { d:3, k:"num", q:`A spinner has P(win) = ${dec(a)} and P(free go) = ${dec(b)}. Otherwise you lose. It is spun ${n} times. How many losses do you expect?`, a:r6((1 - a - b) * n), tol:0.01, x:`P(lose) = 1 − ${dec(a)} − ${dec(b)} = ${dec(1 - a - b)}.\nExpected losses = ${dec(1 - a - b)} × ${n} = ${dec((1 - a - b) * n)}.` };
};

/* ================= 3. Sample space diagrams ================= */
const SS = (r) => { const K = G7.kit(r), k = K.int(0, 3);
  if (k === 0) return { A:[1, 2, 3, 4, 5, 6], B:[1, 2, 3, 4, 5, 6], name:"Two fair dice are rolled", la:"dice 1", lb:"dice 2" };
  if (k === 1){ const m = K.pick([3, 4, 5]), n = K.pick([3, 4, 5, 6]); return { A:Array.from({ length:m }, (_, i) => i + 1), B:Array.from({ length:n }, (_, i) => i + 1), name:`A fair spinner numbered 1 to ${m} and a fair spinner numbered 1 to ${n} are spun`, la:"spinner A", lb:"spinner B" }; }
  if (k === 2) return { A:[1, 2, 3, 4], B:[1, 2, 3, 4, 5, 6], name:"A fair four-sided dice (1–4) and a fair six-sided dice are rolled", la:"4-sided dice", lb:"6-sided dice" };
  return { A:[2, 3, 5, 7], B:[1, 2, 3], name:"Spinner A shows 2, 3, 5, 7 and spinner B shows 1, 2, 3 (each fair)", la:"spinner A", lb:"spinner B" };
};
const OPS = { sum:["added", (a, b) => a + b, "total"], product:["multiplied", (a, b) => a * b, "product"], diff:["subtracted (bigger minus smaller)", (a, b) => Math.abs(a - b), "difference"] };
const grid = (S, f) => S.A.map(a => `${a} | ` + S.B.map(b => f(a, b)).join("  ")).join("\n");
G["maths/samplespace"] = (d, r) => { const K = G7.kit(r), S = SS(r), tot = S.A.length * S.B.length;
  if (d === 1){ const k = K.int(0, 2);
    if (k === 0) return { d:1, k:"num", q:`${S.name}. How many different outcomes are there in the sample space?`, a:tot, x:`Each of the ${S.A.length} outcomes for ${S.la} can go with each of the ${S.B.length} outcomes for ${S.lb}.\nNumber of outcomes = ${S.A.length} × ${S.B.length} = ${tot}.` };
    if (k === 1){ const a = K.pick(S.A), b = K.pick(S.B);
      return P(1, `${S.name}. What is the probability of getting ${a} on ${S.la} AND ${b} on ${S.lb}?`, 1, tot, `There are ${S.A.length} × ${S.B.length} = ${tot} equally likely outcomes.\nOnly one of them is (${a}, ${b}).\nP = 1/${tot}.`); }
    const c = K.pick(["heads", "tails"]), n = K.int(1, 6);
    return P(1, `A fair coin is flipped and a fair dice is rolled. What is the probability of ${c} and a ${n}?`, 1, 12, `Sample space: H1 H2 H3 H4 H5 H6 T1 T2 T3 T4 T5 T6 → 12 outcomes.\nOnly ${c[0].toUpperCase()}${n} works.\nP = 1/12.`); }
  const op = d === 2 ? K.pick(["sum", "sum", "product", "diff"]) : K.pick(["sum", "product", "diff"]), O = OPS[op], vals = [];
  S.A.forEach(a => S.B.forEach(b => vals.push(O[1](a, b))));
  let cond, label;
  if (d === 2){ const t = K.pick(vals); if (K.int(0, 1)){ cond = v => v === t; label = `a ${O[2]} of ${t}`; } else { const sorted = vals.slice().sort((x, y) => x - y), t2 = sorted[Math.floor(sorted.length / 2)]; cond = v => v > t2; label = `a ${O[2]} greater than ${t2}`; } }
  else { const c = K.int(0, 3); const isP = n => n > 1 && [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41].includes(n);
    if (c === 0){ cond = isP; label = `a ${O[2]} that is a prime number`; } else if (c === 1){ cond = v => v % 2 === 0; label = `an even ${O[2]}`; } else if (c === 2){ cond = v => v % 3 === 0; label = `a ${O[2]} that is a multiple of 3`; } else { const t = vals.slice().sort((x, y) => x - y)[Math.floor(vals.length / 3)]; cond = v => v <= t; label = `a ${O[2]} of ${t} or less`; } }
  const hit = vals.filter(cond).length;
  if (!hit || hit === tot) return G["maths/samplespace"](d, r);
  return P(d, `${S.name} and the scores are ${O[0]}. What is the probability of ${label}?`, hit, tot,
    `Draw a sample space diagram (rows = ${S.la}, columns = ${S.lb}: ${S.B.join(", ")}):\n${grid(S, O[1])}\nThere are ${tot} outcomes. Count the ones that give ${label}: ${hit}.\nP = ${hit}/${tot}${fr(hit, tot) !== hit + "/" + tot ? " = " + fr(hit, tot) : ""}.`);
};

/* ================= 4. Venn diagrams and two-way tables ================= */
G["maths/venn"] = (d, r) => { const K = G7.kit(r);
  if (K.int(0, 2) < 2){ const sets = K.pick([["football", "basketball"], ["cats", "dogs"], ["maths club", "art club"], ["tea", "coffee"], ["swimming", "running"]]);
    const a = K.int(2, 15), b = K.int(1, 10), c = K.int(2, 15), n = K.int(1, 10), N = a + b + c + n;
    const intro = `${N} students were asked if they like ${sets[0]} (A) and ${sets[1]} (B).\nVenn diagram: only A = ${a}, both A and B = ${b}, only B = ${c}, neither = ${n}.\nA student is chosen at random.`;
    const Q = d === 1 ? K.pick([["P(A)", a + b, `like ${sets[0]}: only A + both = ${a} + ${b} = ${a + b}`], ["P(neither)", n, `like neither: ${n}`], ["P(only B)", c, `like only ${sets[1]}: ${c}`]])
      : d === 2 ? K.pick([["P(A and B)", b, `like both (the overlap): ${b}`], ["P(A or B)", a + b + c, `in A or B or both: ${a} + ${b} + ${c} = ${a + b + c}`], ["P(not B)", a + n, `NOT in B: only A + neither = ${a} + ${n} = ${a + n}`]])
      : null;
    if (Q) return P(d, `${intro}\nWhat is ${Q[0]}?`, Q[1], N, `Total = ${a} + ${b} + ${c} + ${n} = ${N}.\nCount the students who ${Q[2]}.\n${Q[0]} = ${Q[1]}/${N}${fr(Q[1], N) !== Q[1] + "/" + N ? " = " + fr(Q[1], N) : ""}.`);
    return P(3, `${intro}\nGiven that the student likes ${sets[0]}, what is the probability they also like ${sets[1]}?`, b, a + b, `"Given that they like ${sets[0]}" means only look inside circle A: ${a} + ${b} = ${a + b} students.\nOf those, ${b} also like ${sets[1]} (the overlap).\nP = ${b}/${a + b}${fr(b, a + b) !== b + "/" + (a + b) ? " = " + fr(b, a + b) : ""}.`); }
  const g = [K.int(5, 20), K.int(5, 20)], bo = [K.int(5, 20), K.int(5, 20)], act = K.pick([["swim", "don't swim"], ["walk to school", "come by car"], ["have a pet", "have no pet"]]), N = g[0] + g[1] + bo[0] + bo[1];
  const table = `Two-way table:\n          ${act[0]} | ${act[1]}\nGirls:    ${g[0]} | ${g[1]}\nBoys:     ${bo[0]} | ${bo[1]}`;
  if (d === 1) return P(1, `${table}\nA student is picked at random. What is P(girl)?`, g[0] + g[1], N, `Total = ${g[0]} + ${g[1]} + ${bo[0]} + ${bo[1]} = ${N}.\nGirls = ${g[0]} + ${g[1]} = ${g[0] + g[1]}.\nP(girl) = ${g[0] + g[1]}/${N}${fr(g[0] + g[1], N) !== (g[0] + g[1]) + "/" + N ? " = " + fr(g[0] + g[1], N) : ""}.`);
  if (d === 2) return P(2, `${table}\nA student is picked at random. What is the probability they are a boy who ${act[0].replace("have", "has").replace("walk", "walks").replace("swim", "swims")}?`, bo[0], N, `Total = ${N}. Boys who ${act[0]} = ${bo[0]} (one cell of the table).\nP = ${bo[0]}/${N}${fr(bo[0], N) !== bo[0] + "/" + N ? " = " + fr(bo[0], N) : ""}.`);
  return P(3, `${table}\nA girl is picked at random. What is the probability that she does NOT ${act[0].split(" ")[0] === "have" ? "have a pet" : act[0]}?`, g[1], g[0] + g[1], `We only pick from the girls: ${g[0]} + ${g[1]} = ${g[0] + g[1]}.\nGirls in the '${act[1]}' column = ${g[1]}.\nP = ${g[1]}/${g[0] + g[1]}${fr(g[1], g[0] + g[1]) !== g[1] + "/" + (g[0] + g[1]) ? " = " + fr(g[1], g[0] + g[1]) : ""}.`);
};

/* ================= 5. Independent events, AND and OR rules ================= */
G["maths/independent"] = (d, r) => { const K = G7.kit(r);
  if (d === 1){ const k = K.int(0, 2);
    if (k === 0){ const pairs = [["Flipping a coin, then rolling a dice", "Independent"], ["Rolling a dice twice", "Independent"], ["Picking a card, putting it back, then picking again", "Independent"], ["Picking a sweet and eating it, then picking another", "Dependent (not independent)"], ["Picking two people from a class without replacement", "Dependent (not independent)"], ["It raining today and you carrying an umbrella", "Dependent (not independent)"]], c = K.pick(pairs);
      return G7.mcq(1, `Are these events independent or dependent?\n"${c[0]}"`, c[1], c[1] === "Independent" ? ["Dependent (not independent)", "Mutually exclusive"] : ["Independent", "Mutually exclusive"], c[1] === "Independent" ? "The result of the first does not change the probabilities for the second." : "The first event changes the probabilities for the second, so they are dependent."); }
    if (k === 1){ const c = K.pick([["Getting a 2 and getting a 5 on one roll of a dice", "Yes: they can't both happen at once"], ["Getting an even number and getting a 4 on one roll", "No: 4 is even, so both can happen together"], ["Picking a red card and picking a king from one card", "No: the king of hearts is both"], ["Getting heads and getting tails on one flip", "Yes: they can't both happen at once"]]);
      return G7.mcq(1, `Are these events mutually exclusive?\n"${c[0]}"`, c[1], c[1].startsWith("Yes") ? ["No: they can happen at the same time", "Only on Tuesdays"] : ["Yes: they can't both happen at once", "Only if the dice is biased"], "Mutually exclusive events cannot happen at the same time."); }
    const n = K.int(1, 6), c = K.pick(["heads", "tails"]);
    return P(1, `A fair coin is flipped and a fair dice is rolled. Use the AND rule: what is P(${c} AND ${n})?`, 1, 12, `The events are independent, so multiply:\nP(${c}) × P(${n}) = 1/2 × 1/6 = 1/12.`); }
  if (d === 2){ const k = K.int(0, 2);
    if (k === 0){ const a = K.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]), b = K.pick([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9]), w = K.pick([["Ali passes his driving test", "Ben passes his driving test"], ["it snows in Oslo", "it rains in Dubai"], ["Team A wins", "Team B wins its own separate match"]]);
      return PD(2, `P(${w[0]}) = ${dec(a)} and P(${w[1]}) = ${dec(b)}. The events are independent. What is the probability that both happen?`, a * b, `Independent events: AND means multiply.\nP(both) = ${dec(a)} × ${dec(b)} = ${dec(a * b)}.`); }
    if (k === 1){ const a = K.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35]), b = K.pick([0.05, 0.1, 0.2, 0.3, 0.4]);
      return PD(2, `A spinner is spun once. P(red) = ${dec(a)} and P(blue) = ${dec(b)}. What is P(red OR blue)?`, a + b, `Red and blue are mutually exclusive (one spin can't be both), so OR means add.\nP(red or blue) = ${dec(a)} + ${dec(b)} = ${dec(a + b)}.`); }
    const n = K.pick([2, 3]), s = 6;
    return P(2, `A fair dice is rolled ${n} times. What is the probability of getting a six every time?`, 1, Math.pow(s, n), `Each roll is independent, so multiply:\n${Array(n).fill("1/6").join(" × ")} = 1/${Math.pow(s, n)}.`); }
  const k = K.int(0, 2);
  if (k === 0){ const p = K.pick([0.1, 0.2, 0.3, 0.4, 0.5]), n = K.pick([2, 3]);
    return PD(3, `The probability that a bus is late is ${dec(p)}, independently each day. What is the probability that it is late at least once in ${n} days?`, 1 - Math.pow(1 - p, n), `"At least once" = 1 − P(never late).\nP(not late) = 1 − ${dec(p)} = ${dec(1 - p)}.\nP(never late in ${n} days) = ${dec(1 - p)}${n === 2 ? "²" : "³"} = ${dec(Math.pow(1 - p, n))}.\nP(at least once) = 1 − ${dec(Math.pow(1 - p, n))} = ${dec(1 - Math.pow(1 - p, n))}.`); }
  if (k === 1){ const n = K.pick([3, 4]);
    return P(3, `A fair coin is flipped ${n} times. What is the probability of getting at least one head?`, Math.pow(2, n) - 1, Math.pow(2, n), `P(no heads) = P(all tails) = (1/2)${n === 3 ? "³" : "⁴"} = 1/${Math.pow(2, n)}.\nP(at least one head) = 1 − 1/${Math.pow(2, n)} = ${Math.pow(2, n) - 1}/${Math.pow(2, n)}.`); }
  const a = K.pick([0.2, 0.4, 0.5, 0.6]), b = K.pick([0.3, 0.5, 0.25]), both = K.int(0, 1) ? r6(a * b) : r6(a * b + K.pick([0.05, -0.05, 0.1]));
  const ind = Math.abs(both - a * b) < 1e-9;
  return G7.mcq(3, `P(A) = ${dec(a)}, P(B) = ${dec(b)} and P(A and B) = ${dec(both)}. Are A and B independent?`, ind ? "Yes, because P(A) × P(B) = P(A and B)" : "No, because P(A) × P(B) ≠ P(A and B)", [ind ? "No, because P(A) × P(B) ≠ P(A and B)" : "Yes, because P(A) × P(B) = P(A and B)", "Yes, because the probabilities are under 1", "You can never tell"], `Check: P(A) × P(B) = ${dec(a)} × ${dec(b)} = ${dec(a * b)}. ${ind ? "This equals" : "This does not equal"} P(A and B) = ${dec(both)}.`);
};

/* ================= 6. Probability tree diagrams ================= */
G["maths/trees"] = (d, r) => { const K = G7.kit(r), ctx = K.pick([["it rains on Monday", "it rains on Tuesday", "rain", "no rain"], ["Mia passes test 1", "Mia passes test 2", "pass", "fail"], ["the first light is green", "the second light is green", "green", "not green"], ["Leo scores the first penalty", "Leo scores the second penalty", "score", "miss"]]);
  const p = K.pick([0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9]), q = K.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);
  const tree = `Tree diagram:\nFirst: ${ctx[2]} ${dec(p)}, ${ctx[3]} ${dec(1 - p)}\nSecond (on every branch): ${ctx[2]} ${dec(q)}, ${ctx[3]} ${dec(1 - q)}`;
  if (d === 1){ if (K.int(0, 1)) return PD(1, `On a tree diagram, P(${ctx[0]}) = ${dec(p)}. What probability goes on the other branch, P(not)?`, 1 - p, `Branches from one point add up to 1.\n1 − ${dec(p)} = ${dec(1 - p)}.`);
    return PD(1, `P(${ctx[0]}) = ${dec(p)} and P(${ctx[1]}) = ${dec(q)} (independent). Follow the branches: what is the probability of ${ctx[2]} both times?`, p * q, `${tree}\nMultiply ALONG the branches: ${dec(p)} × ${dec(q)} = ${dec(p * q)}.`); }
  if (d === 2){ const c = K.int(0, 2);
    if (c === 0) return PD(2, `P(${ctx[0]}) = ${dec(p)} and P(${ctx[1]}) = ${dec(q)} (independent). What is the probability of ${ctx[3]} both times?`, (1 - p) * (1 - q), `${tree}\nMultiply along the ${ctx[3]}–${ctx[3]} branches: ${dec(1 - p)} × ${dec(1 - q)} = ${dec((1 - p) * (1 - q))}.`);
    if (c === 1) return PD(2, `P(${ctx[0]}) = ${dec(p)} and P(${ctx[1]}) = ${dec(q)} (independent). What is the probability of exactly one ${ctx[2]}?`, p * (1 - q) + (1 - p) * q, `${tree}\nTwo routes give exactly one ${ctx[2]}:\n${ctx[2]} then ${ctx[3]}: ${dec(p)} × ${dec(1 - q)} = ${dec(p * (1 - q))}\n${ctx[3]} then ${ctx[2]}: ${dec(1 - p)} × ${dec(q)} = ${dec((1 - p) * q)}\nAdd the routes (OR): ${dec(p * (1 - q))} + ${dec((1 - p) * q)} = ${dec(p * (1 - q) + (1 - p) * q)}.`);
    return PD(2, `P(${ctx[0]}) = ${dec(p)} and P(${ctx[1]}) = ${dec(q)} (independent). What is the probability of at least one ${ctx[2]}?`, 1 - (1 - p) * (1 - q), `${tree}\nAt least one ${ctx[2]} = 1 − P(${ctx[3]} both times)\n= 1 − ${dec(1 - p)} × ${dec(1 - q)} = 1 − ${dec((1 - p) * (1 - q))} = ${dec(1 - (1 - p) * (1 - q))}.`); }
  const R = K.int(2, 7), Bl = K.int(2, 7), N = R + Bl, c = K.int(0, 2), cl = K.pick([["red", "blue"], ["green", "yellow"], ["milk", "dark"]]);
  const tr = `Without replacement the second branches change:\nFirst: ${cl[0]} ${R}/${N}, ${cl[1]} ${Bl}/${N}\nAfter ${cl[0]}: ${cl[0]} ${R - 1}/${N - 1}, ${cl[1]} ${Bl}/${N - 1}\nAfter ${cl[1]}: ${cl[0]} ${R}/${N - 1}, ${cl[1]} ${Bl - 1}/${N - 1}`;
  const what = cl[2] ? "chocolates" : "balls", kind = cl[0] === "milk" ? "chocolates" : "balls";
  if (c === 0) return P(3, `A box has ${R} ${cl[0]} and ${Bl} ${cl[1]} ${kind}. Two are taken without replacement. What is P(both ${cl[0]})?`, R * (R - 1), N * (N - 1), `${tr}\nP(both ${cl[0]}) = ${R}/${N} × ${R - 1}/${N - 1} = ${R * (R - 1)}/${N * (N - 1)}${fr(R * (R - 1), N * (N - 1)) !== R * (R - 1) + "/" + N * (N - 1) ? " = " + fr(R * (R - 1), N * (N - 1)) : ""}.`);
  if (c === 1) return P(3, `A box has ${R} ${cl[0]} and ${Bl} ${cl[1]} ${kind}. Two are taken without replacement. What is P(one of each kind)?`, 2 * R * Bl, N * (N - 1), `${tr}\n${cl[0]} then ${cl[1]}: ${R}/${N} × ${Bl}/${N - 1} = ${R * Bl}/${N * (N - 1)}\n${cl[1]} then ${cl[0]}: ${Bl}/${N} × ${R}/${N - 1} = ${R * Bl}/${N * (N - 1)}\nAdd: ${2 * R * Bl}/${N * (N - 1)}${fr(2 * R * Bl, N * (N - 1)) !== 2 * R * Bl + "/" + N * (N - 1) ? " = " + fr(2 * R * Bl, N * (N - 1)) : ""}.`);
  return P(3, `A box has ${R} ${cl[0]} and ${Bl} ${cl[1]} ${kind}. Two are taken without replacement. What is P(both the same kind)?`, R * (R - 1) + Bl * (Bl - 1), N * (N - 1), `${tr}\nBoth ${cl[0]}: ${R}/${N} × ${R - 1}/${N - 1} = ${R * (R - 1)}/${N * (N - 1)}\nBoth ${cl[1]}: ${Bl}/${N} × ${Bl - 1}/${N - 1} = ${Bl * (Bl - 1)}/${N * (N - 1)}\nAdd: ${R * (R - 1) + Bl * (Bl - 1)}/${N * (N - 1)}${fr(R * (R - 1) + Bl * (Bl - 1), N * (N - 1)) !== (R * (R - 1) + Bl * (Bl - 1)) + "/" + N * (N - 1) ? " = " + fr(R * (R - 1) + Bl * (Bl - 1), N * (N - 1)) : ""}.`);
};

/* ================= topics ================= */
const M = window.STUDY && window.STUDY.maths; if (!M) return;
const mc = G7.mcq, ex = G7.ex, gen = G7.gen;
const CM = (t, id, by) => ({ yt:id, title:t, by:by || "Corbettmaths" });
const LK = (icon, t, u) => [icon, t, u];
const T = o => Object.assign({ strand:"MYP 2 · Probability", focus:true }, o);
const add = t => { if (!M.topics.some(x => x.id === t.id)) M.topics.push(t); };

add(T({ id:"probbasics", title:"🎲 Probability basics: the scale and P(event)",
  learn:{ ideas:[
    "Probability measures how likely something is to happen, from 0 (impossible) to 1 (certain). It can be written as a fraction, decimal or percentage: 1/2 = 0.5 = 50%.",
    "Key words on the probability scale: impossible (0), unlikely, even chance (0.5), likely, certain (1).",
    "An outcome is one possible result. An event is the outcome (or group of outcomes) we are interested in.",
    "If all outcomes are equally likely: P(event) = number of ways it can happen ÷ total number of outcomes.",
    "The probabilities of all the possible outcomes add up to 1. So P(not A) = 1 − P(A).",
    "Fair means every outcome is equally likely. Biased means some outcomes are more likely than others."],
    example:"A bag has 3 red, 5 blue and 2 green counters. What is P(blue)? What is P(not green)?\nStep 1: total counters = 3 + 5 + 2 = 10.\nStep 2: P(blue) = 5/10 = 1/2.\nStep 3: P(green) = 2/10, so P(not green) = 1 − 2/10 = 8/10 = 4/5.",
    more:[ ex("A fair dice is rolled. Find P(prime number).", ["List all outcomes: 1, 2, 3, 4, 5, 6 (6 equally likely outcomes).", "Pick out the prime numbers: 2, 3 and 5. (1 is NOT prime.)", "That is 3 outcomes out of 6.", "P(prime) = 3/6 = 1/2."], "1/2"),
      ex("P(a train is late) = 0.15. Find P(the train is not late).", ["The train is either late or not late, so the two probabilities add up to 1.", "P(not late) = 1 − 0.15.", "= 0.85."], "0.85"),
      ex("A biased spinner: P(A) = 0.2, P(B) = 0.35, P(C) = x, P(D) = x. Find x.", ["All four probabilities add to 1: 0.2 + 0.35 + x + x = 1.", "0.55 + 2x = 1.", "2x = 0.45.", "x = 0.225."], "x = 0.225") ],
    videos:[ CM("Probability (the basics)", "ur_hHjLrBNo"), CM("The probability scale", "1aGG8KY_GMA"), CM("Probability of an event not happening", "y9T5ol65mSU") ],
    fun:"Casinos, weather forecasters and video-game designers all use probability every day. A 70% chance of rain means it rained on about 70 of every 100 days with similar weather!",
    trick:"Probability = what you WANT ÷ what you CAN get. And 'not' means 1 take away." },
  links:[ LK("✏️", "Corbettmaths practice questions: probability", "https://corbettmaths.com/2019/09/02/probability-practice-questions/") ],
  tasks: gen("maths/probbasics", "111122223333", 41011).concat([ mc(1, "Which of these can NOT be a probability?", "1.2", ["0", "0.75", "1/3"], "Probabilities are always between 0 and 1. 1.2 is bigger than 1, so it is impossible as a probability."), mc(2, "A fair coin landed on heads 5 times in a row. What is P(heads) on the next flip?", "1/2", ["Less than 1/2 because tails is 'due'", "More than 1/2 because heads is 'hot'", "1"], "The coin has no memory. Each flip is independent, so P(heads) is still 1/2.") ]),
  pool: gen("maths/probbasics", "112233123", 41501).concat([ mc(1, "What does 'P(A) = 0' mean?", "Event A is impossible", ["Event A is certain", "Event A is likely", "Event A has an even chance"], "0 is the bottom of the probability scale: impossible."), mc(2, "Which is the same as 3/4?", "75%", ["34%", "0.34", "3.4"], "3 ÷ 4 = 0.75 = 75%."), mc(3, "A bag has only red and blue balls. P(red) = 0.35. There are 40 balls. How many are blue?", "26", ["14", "35", "65"], "P(blue) = 1 − 0.35 = 0.65. 0.65 × 40 = 26.") ]) }));

add(T({ id:"experimental", title:"🧪 Relative frequency and expected outcomes",
  learn:{ ideas:[
    "Theoretical probability is worked out from equally likely outcomes (e.g. P(6) = 1/6 on a fair dice).",
    "Experimental probability (relative frequency) comes from doing an experiment: relative frequency = number of times it happened ÷ number of trials.",
    "The more trials you do, the more reliable the relative frequency is as an estimate of the true probability.",
    "Expected number of times = probability × number of trials. E.g. a fair coin flipped 50 times: expect 1/2 × 50 = 25 heads.",
    "If an experiment's results are very different from what a fair object should give, the object may be biased."],
    example:"A spinner is spun 200 times and lands on blue 46 times.\nRelative frequency of blue = 46/200 = 0.23.\nIf it is spun 1000 times, expected blues ≈ 0.23 × 1000 = 230.",
    more:[ ex("P(a seed grows) = 0.8. How many of 350 seeds do you expect to grow?", ["Expected = probability × number of trials.", "= 0.8 × 350.", "= 280 seeds."], "280"),
      ex("A dice is rolled 300 times. It lands on 4 a total of 95 times. Is it fair?", ["For a fair dice, P(4) = 1/6.", "Expected 4s = 1/6 × 300 = 50.", "95 is almost double the expected 50.", "So the dice may be biased towards 4 (more trials would confirm it)."], "Probably biased") ],
    videos:[ CM("Relative frequency", "MS6lnCTgTSw") ],
    fun:"In the 1700s, the scientist Buffon flipped a coin 4,040 times and got 2,048 heads — a relative frequency of about 0.507, very close to 0.5!",
    trick:"Relative frequency = HAPPENED ÷ TRIED. Expected = PROBABILITY × TRIES." },
  links:[ LK("📄", "Corbettmaths: relative frequency questions", "https://corbettmaths.com/wp-content/uploads/2025/09/Relative-Frequency.pdf") ],
  tasks: gen("maths/experimental", "111122223333", 42011),
  pool: gen("maths/experimental", "112233123", 42501).concat([ mc(2, "Ella flips a coin 10 times and gets 7 heads. She says the coin is biased. Is she right?", "Not necessarily: 10 flips is too few to be sure", ["Yes, 7 is more than 5", "Yes, coins are always biased", "No, the coin must land 5 heads"], "Small experiments vary a lot. She needs many more flips."), mc(3, "Why does the relative frequency of heads get closer to 0.5 as you flip more?", "Random variations even out over many trials", ["The coin learns", "The coin gets heavier", "It doesn't: it moves away"], "This is called the law of large numbers.") ]) }));

add(T({ id:"samplespace", title:"🔢 Sample space diagrams",
  learn:{ ideas:[
    "The sample space is the list of ALL possible outcomes.",
    "When two things happen together (e.g. two dice, or a coin and a spinner), use a sample space diagram: a grid with one event along the top and the other down the side.",
    "Number of outcomes = (outcomes of the 1st) × (outcomes of the 2nd). Two dice: 6 × 6 = 36 outcomes.",
    "Fill each cell with the combined result (e.g. the total, product or pair), then count the cells you want: P = cells you want ÷ total cells.",
    "Listing systematically (in order) makes sure you don't miss or repeat an outcome: H1, H2, … H6, T1, … T6."],
    example:"Two fair dice are rolled and the scores added. Find P(total = 7).\nDraw a 6 × 6 grid: 36 outcomes.\nTotals of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6 cells.\nP(7) = 6/36 = 1/6. (7 is the most likely total!)",
    more:[ ex("A coin is flipped and a dice rolled. Find P(heads and an even number).", ["List the sample space: H1 H2 H3 H4 H5 H6 T1 T2 T3 T4 T5 T6 → 12 outcomes.", "Pick the ones with heads AND an even number: H2, H4, H6.", "That is 3 out of 12.", "P = 3/12 = 1/4."], "1/4"),
      ex("Two spinners 1–3 and 1–4 are spun and the scores multiplied. Find P(product is even).", ["Grid: rows 1, 2, 3; columns 1, 2, 3, 4 → 12 outcomes.", "Row 1: 1 2 3 4. Row 2: 2 4 6 8. Row 3: 3 6 9 12.", "Even products: 2, 4, 2, 4, 6, 8, 6, 12 → 8 cells.", "P(even) = 8/12 = 2/3."], "2/3") ],
    videos:[ CM("Sample space diagrams", "Xqno7W0OUtE"), CM("Listing outcomes", "2iosRT6knXY") ],
    fun:"In the game Monopoly you roll two dice. 7 is the most common total (6 ways out of 36), which is why some board squares are visited more often than others!",
    trick:"Grid first, count second. Total cells = top × side." },
  links:[ LK("✏️", "Corbettmaths practice: sample spaces", "https://corbettmaths.com/2019/09/04/sample-space-practice-questions/"),
    LK("🎥", "Oak National Academy lesson: sample space diagrams and two-way tables", "https://www.thenational.academy/pupils/lessons/list-outcomes-in-a-sample-space-diagram-two-way-table-and-calculate-probabilities-64u68r/video") ],
  tasks: gen("maths/samplespace", "111122223333", 43011),
  pool: gen("maths/samplespace", "112233123", 43501).concat([ mc(1, "How many outcomes when two fair coins are flipped?", "4", ["2", "3", "6"], "HH, HT, TH, TT: 2 × 2 = 4."), mc(2, "Two dice are rolled and added. Which total is most likely?", "7", ["12", "2", "6 and 8 equally, more than 7"], "7 can be made in 6 ways, more than any other total."), mc(3, "Three coins are flipped. How many outcomes are in the sample space?", "8", ["6", "3", "9"], "2 × 2 × 2 = 8: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT.") ]) }));

add(T({ id:"venn", title:"⭕ Venn diagrams and two-way tables",
  learn:{ ideas:[
    "A Venn diagram shows groups (sets) as circles inside a rectangle. The overlap shows things in BOTH groups. Outside the circles = in neither.",
    "Add all the numbers (including 'neither') to find the total.",
    "P(A) uses everything inside circle A (the 'only A' part AND the overlap).",
    "A and B = the overlap. A or B = everything inside at least one circle. Not A = everything outside circle A.",
    "A two-way table shows two kinds of information at once (e.g. boy/girl and walk/car). Use the totals to find probabilities.",
    "'Given that' means you only choose from that group, so the group's total becomes the bottom of the fraction."],
    example:"30 students: only football 12, both 5, only basketball 8, neither 5.\nP(football) = (12 + 5)/30 = 17/30.\nP(both) = 5/30 = 1/6.\nP(football or basketball) = (12 + 5 + 8)/30 = 25/30 = 5/6.",
    more:[ ex("Using the same Venn diagram, a student who plays football is chosen. Find P(they also play basketball).", ["'Given that they play football' → only look inside the football circle.", "Football total = 12 + 5 = 17.", "Of those, 5 also play basketball (the overlap).", "P = 5/17."], "5/17") ],
    videos:[ { url:"https://corbettmaths.com/2016/08/07/venn-diagrams/", title:"Venn diagrams (Corbettmaths video page)", by:"Corbettmaths" }, { url:"http://corbettmaths.com/2012/08/10/two-way-tables/", title:"Two-way tables (Corbettmaths video page)", by:"Corbettmaths" }, { url:"https://www.thenational.academy/pupils/lessons/checking-and-securing-calculating-probabilities-from-diagrams/video", title:"Calculating probabilities from diagrams", by:"Oak National Academy" } ],
    fun:"John Venn, who invented Venn diagrams in 1880, also built a machine for bowling cricket balls!",
    trick:"AND = the overlap. OR = everything inside the circles. Don't forget the number outside!" },
  links:[ LK("✏️", "Corbettmaths practice: two-way tables", "https://corbettmaths.com/2019/09/06/two-way-tables-practice-questions/") ],
  tasks: gen("maths/venn", "111122223333", 44011),
  pool: gen("maths/venn", "112233123", 44501).concat([ mc(1, "In a Venn diagram, what does the overlap show?", "Things in both groups", ["Things in neither group", "Only the first group", "The total"], "The overlap is where the circles share members."), mc(2, "What must you include when finding the total in a Venn diagram?", "Every region, including the number outside the circles", ["Only the circles", "Only the overlap", "Only 'neither'"], "People in neither group are still part of the total.") ]) }));

add(T({ id:"independent", title:"🔗 Independent events: the AND and OR rules",
  learn:{ ideas:[
    "Two events are independent if one happening does NOT change the probability of the other (e.g. a coin and a dice).",
    "AND rule (independent events): P(A and B) = P(A) × P(B).",
    "Mutually exclusive events cannot happen at the same time (e.g. getting a 2 and a 5 on ONE roll).",
    "OR rule (mutually exclusive events): P(A or B) = P(A) + P(B).",
    "'At least one' is easiest as 1 − P(none).",
    "Dependent events: the first result changes the second, e.g. taking sweets out without putting them back."],
    example:"P(Ali wins) = 0.7 and P(Bea wins her separate match) = 0.4.\nBoth win: 0.7 × 0.4 = 0.28 (AND → multiply).\nNeither wins: 0.3 × 0.6 = 0.18.\nAt least one wins: 1 − 0.18 = 0.82.",
    more:[ ex("A coin is flipped 3 times. Find P(three heads).", ["Each flip is independent: P(H) = 1/2 each time.", "AND → multiply: 1/2 × 1/2 × 1/2.", "= 1/8."], "1/8"),
      ex("A spinner: P(red) = 0.25, P(blue) = 0.4. Find P(red or blue).", ["One spin can't be red AND blue, so they are mutually exclusive.", "OR → add: 0.25 + 0.4.", "= 0.65."], "0.65") ],
    videos:[ CM("Independent events (the AND rule)", "mUDqgCe-PAo"), CM("The OR rule", "achhCbzYMdQ") ],
    fun:"The chance of flipping 10 heads in a row is 1/1024 — about the same as a random person in a crowd of a thousand being picked twice in a row!",
    trick:"AND → × (multiply, the answer gets smaller). OR → + (add, the answer gets bigger)." },
  links:[ LK("✏️", "Corbettmaths practice: independent events", "https://corbettmaths.com/2019/09/05/independent-events-practice-questions/") ],
  tasks: gen("maths/independent", "111122223333", 45011),
  pool: gen("maths/independent", "112233123", 45501).concat([ mc(2, "Which rule do you use for P(A and B) when A and B are independent?", "Multiply P(A) × P(B)", ["Add P(A) + P(B)", "Subtract them", "Divide them"], "AND with independent events means multiply."), mc(3, "Why can't you add P(even) + P(a 4) to find P(even or 4) on one dice roll?", "They are not mutually exclusive: 4 is even, so it would be counted twice", ["You can, the answer is 4/6", "Because dice are biased", "Because 4 is prime"], "The OR addition rule only works for mutually exclusive events.") ]) }));

add(T({ id:"trees", title:"🌳 Probability tree diagrams",
  learn:{ ideas:[
    "A tree diagram shows two (or more) events in order. Each event has a set of branches with probabilities written on them.",
    "Branches coming from the same point always add up to 1.",
    "Multiply ALONG the branches to find the probability of a route (AND).",
    "Add the routes together when more than one route works (OR).",
    "With replacement the second-stage probabilities are the same as the first. Without replacement they change: there is one fewer item in total (and one fewer of the colour you took).",
    "Check: the probabilities at the ends of all routes add up to 1."],
    example:"P(rain Monday) = 0.3, P(rain Tuesday) = 0.4 (independent).\nRain both days: 0.3 × 0.4 = 0.12.\nRain on exactly one day: 0.3 × 0.6 + 0.7 × 0.4 = 0.18 + 0.28 = 0.46.\nNo rain: 0.7 × 0.6 = 0.42.\nCheck: 0.12 + 0.46 + 0.42 = 1 ✓",
    more:[ ex("A bag has 4 red and 3 blue sweets. Two are eaten (no replacement). Find P(both red).", ["First pick: P(red) = 4/7.", "One red has gone: 3 red left out of 6 sweets.", "Second pick: P(red) = 3/6.", "Multiply along the branches: 4/7 × 3/6 = 12/42 = 2/7."], "2/7"),
      ex("Same bag: find P(one of each colour).", ["Red then blue: 4/7 × 3/6 = 12/42.", "Blue then red: 3/7 × 4/6 = 12/42.", "Two routes work, so add: 12/42 + 12/42 = 24/42.", "Simplify: 24/42 = 4/7."], "4/7") ],
    videos:[ CM("Tree diagrams", "PYEvSuz1Dxo") ],
    fun:"Doctors use tree diagrams to work out how reliable a medical test is — sometimes the answer is very surprising!",
    trick:"Along = × (multiply). Down (between routes) = + (add)." },
  links:[ LK("📄", "Corbettmaths: tree diagrams questions", "https://corbettmaths.com/wp-content/uploads/2023/11/Tree-Diagrams.pdf") ],
  tasks: gen("maths/trees", "111122223333", 46011),
  pool: gen("maths/trees", "112233123", 46501).concat([ mc(1, "What do the branches from one point on a tree diagram add up to?", "1", ["0", "100", "It depends"], "One of the outcomes must happen, so they add to 1."), mc(2, "A bag has 5 red and 5 blue balls. One red is taken and NOT replaced. What is P(red) for the second ball?", "4/9", ["5/10", "5/9", "4/10"], "4 red are left out of 9 balls."), mc(3, "On a tree diagram, how do you find P(at least one success)?", "1 − P(no successes)", ["Add every branch", "Multiply every branch", "P(success) × 2"], "It is quicker than adding all the routes with a success.") ]) }));
})();
