/* UK Study Plus · question generators (Year 8 KS3 and Year 10 GCSE).
   Each makes a brand-new question at a level (1 Core, 2 Extended, 3 Challenge) from a seed: the same seed rebuilds
   the same question, a new seed gives new numbers. Year 8 maths also reuses the MYP generators in study/gen.js. */
(function(){
"use strict";
function rng(seed){ let a = seed >>> 0 || 1; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const uniq = L => L.filter((v, i) => L.map(String).indexOf(String(v)) === i);
const kit = r => {
  const int = (lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
  const nz = (lo, hi) => { let v = 0; while (!v) v = int(lo, hi); return v; };
  const pick = L => L[Math.floor(r() * L.length)];
  const shuffle = L => { const a = L.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const mcq = (q, right, wrong, x, d) => { const o = shuffle([right].concat(uniq(wrong.filter(w => String(w) !== String(right))).slice(0, 3))); return { d, k:"mcq", q, o:o.map(String), a:o.indexOf(right), x }; };
  return { int, nz, pick, shuffle, mcq };
};
const sgn = n => n < 0 ? "−" + Math.abs(n) : String(n);
const par = n => n < 0 ? "(" + sgn(n) + ")" : String(n);
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b){ [a, b] = [b, a % b]; } return a || 1; };
const r2 = v => Math.round(v * 100) / 100, r1 = v => Math.round(v * 10) / 10, f = v => String(r2(v));
const term = (c, v, first) => c === 0 ? "" : (first ? (c < 0 ? "−" : "") : (c < 0 ? " − " : " + ")) + (Math.abs(c) === 1 && v ? "" : Math.abs(c)) + v;
const quad = (a, b, c) => (term(a, "x²", true) + term(b, "x") + term(c, "")) || "0";
const MYP = (k, d, seed) => window.STUDY_GEN ? window.STUDY_GEN.make(k, d, seed) : null;
const G = {};

/* ================= YEAR 8 MATHS ================= */
G["y8maths/number"] = (d, r, seed) => { const K = kit(r);
  if (d === 1){ if (r() < .5){ const a = K.int(2, 6) * K.pick([2, 3]), b = a * K.pick([2, 3, 4]) / K.pick([1, 2]), A = Math.round(a), B = Math.round(b) || 18;
      return { d, k:"num", q:`Find the highest common factor (HCF) of ${A} and ${B}.`, a:gcd(A, B), x:`List the factors of each and find the biggest one they share. HCF(${A}, ${B}) = ${gcd(A, B)}.` }; }
    const b = K.int(2, 9), e = K.pick([2, 3]); return { d, k:"num", q:`Work out ${b}${e === 2 ? "²" : "³"}`, a:Math.pow(b, e), x:`${b}${e === 2 ? "²" : "³"} means ${Array(e).fill(b).join(" × ")} = ${Math.pow(b, e)}.` }; }
  if (d === 2){ if (r() < .5){ const a = K.pick([4, 6, 8, 9, 10, 12, 15]), b = K.pick([6, 8, 10, 12, 14, 15, 18].filter(x => x !== a)), l = a * b / gcd(a, b);
      return { d, k:"num", q:`Find the lowest common multiple (LCM) of ${a} and ${b}.`, a:l, x:`List multiples of ${b}: ${b}, ${2 * b}, ${3 * b}… The first one that ${a} also divides is ${l}. (Or LCM = ${a} × ${b} ÷ HCF = ${a * b} ÷ ${gcd(a, b)}.)` }; }
    const b = K.pick([2, 3, 5, 7]), m = K.int(3, 8), n = K.int(2, m - 1), mul = r() < .5, e = mul ? m + n : m - n;
    return K.mcq(`Simplify ${b}${sup(m)} ${mul ? "×" : "÷"} ${b}${sup(n)}`, `${b}${sup(e)}`, [`${b}${sup(m * n)}`, `${b * b}${sup(e)}`, `${b}${sup(mul ? m - n : m + n)}`], `${mul ? "Multiplying powers of the same number: add the indices" : "Dividing powers of the same number: subtract the indices"}. ${m} ${mul ? "+" : "−"} ${n} = ${e}, so ${b}${sup(e)}.`, d); }
  const primes = [2, 3, 5, 7], ex = primes.map(() => 0); let n = 1; for (let k = 0; k < K.int(3, 5); k++){ const i = K.int(0, 3); if (n * primes[i] > 400) break; n *= primes[i]; ex[i]++; }
  if (n < 12){ n *= 12; ex[0] += 2; ex[1] += 1; }
  const right = primes.map((p, i) => ex[i] ? p + (ex[i] > 1 ? sup(ex[i]) : "") : "").filter(Boolean).join(" × ");
  const wrongs = [right.replace("2", "4"), primes.map((p, i) => ex[i] ? p + sup(ex[i] + 1) : "").filter(Boolean).join(" × "), "2 × " + (n / 2)];
  return K.mcq(`Write ${n} as a product of its prime factors (index form).`, right, wrongs, `Use a factor tree, splitting until every branch ends in a prime: ${n} = ${right}.`, d);
};
function sup(n){ const S = "⁰¹²³⁴⁵⁶⁷⁸⁹"; return String(n).split("").map(c => c === "-" ? "⁻" : S[+c]).join(""); }
G["y8maths/fractions"] = (d, r, s) => MYP("maths/fdp", d, s);
G["y8maths/algebra"] = (d, r, s) => { const K = kit(r);
  if (d === 3 && r() < .5){ const a = K.int(2, 6), b = K.nz(-5, 5), c = K.int(2, 6), e = K.nz(-5, 5), X = a + c, C = a * b + c * e;
    const best = X + "x" + (C ? (C > 0 ? " + " : " − ") + Math.abs(C) : ""), flat = X + "x" + (C ? (C > 0 ? "+" : "-") + Math.abs(C) : "");
    return { d, k:"text", q:`Expand and simplify ${a}(x ${b < 0 ? "−" : "+"} ${Math.abs(b)}) + ${c}(x ${e < 0 ? "−" : "+"} ${Math.abs(e)}). Type it like 5x + 7`, a:[flat, flat.replace(/([+-])/g, " $1 ")], best, x:`${a}x ${a * b < 0 ? "−" : "+"} ${Math.abs(a * b)} + ${c}x ${c * e < 0 ? "−" : "+"} ${Math.abs(c * e)}. Collect like terms: ${X}x and ${sgn(C)}, giving ${best}.` }; }
  return MYP("maths/algebra", Math.min(d, 2), s); };
G["y8maths/equations"] = (d, r, s) => { const K = kit(r);
  if (d === 1) return MYP("maths/algebra", 1, s);
  if (d === 2 && r() < .5){ const a = K.int(2, 6), x = K.int(-3, 8), b = K.int(1, 12), c = a * x + b;
    return { d, k:"num", q:`Solve the inequality ${a}x + ${b} > ${c}. What is the smallest WHOLE number x can be?`, a:x + 1, x:`Subtract ${b}: ${a}x > ${c - b}. Divide by ${a}: x > ${x}. The smallest whole number bigger than ${x} is ${x + 1}.` }; }
  return MYP("maths/algebra", d === 2 ? 2 : 3, s); };
G["y8maths/sequences"] = (d, r, s) => { const K = kit(r);
  if (d >= 2 && r() < .4){ const m = K.nz(-4, 5), c = K.int(-6, 9), x = K.int(-3, 6);
    return { d, k:"num", q:`For the line y = ${m === 1 ? "" : m === -1 ? "−" : sgn(m)}x ${c < 0 ? "− " + Math.abs(c) : "+ " + c}, find y when x = ${sgn(x)}.`, a:m * x + c, x:`Substitute: y = ${sgn(m)} × ${par(x)} ${c < 0 ? "− " + Math.abs(c) : "+ " + c} = ${sgn(m * x + c)}.` }; }
  return MYP("maths/sequences", d, s); };
G["y8maths/ratio"] = (d, r, s) => { const K = kit(r);
  if (r() < .35){ const sp = K.pick([4, 5, 6, 8, 12, 15, 20, 40, 60, 80]), t = K.pick([0.5, 1.5, 2, 2.5, 3]);
    if (d === 1) return { d, k:"num", q:`A car travels at ${sp} km/h for ${t} hours. How far does it go, in km?`, a:sp * t, x:`Distance = speed × time = ${sp} × ${t} = ${f(sp * t)} km.` };
    if (d === 2) return { d, k:"num", q:`A cyclist rides ${f(sp * t)} km in ${t} hours. What is the average speed in km/h?`, a:sp, x:`Speed = distance ÷ time = ${f(sp * t)} ÷ ${t} = ${sp} km/h.` };
    const mins = K.pick([15, 20, 30, 45]); return { d, k:"num", q:`A train travels at ${sp * 3} km/h. How far does it go in ${mins} minutes, in km?`, a:r2(sp * 3 * mins / 60), tol:0.01, x:`${mins} minutes = ${mins}/60 = ${f(mins / 60)} hours. ${sp * 3} × ${f(mins / 60)} = ${f(sp * 3 * mins / 60)} km.` }; }
  return MYP("maths/ratio", d, s); };
G["y8maths/geometry"] = (d, r, s) => { const K = kit(r);
  if (d >= 2 && r() < .4){ const a = K.int(35, 140); const kind = K.pick(["alternate", "corresponding", "co-interior"]);
    return { d, k:"num", q:`Two parallel lines are crossed by a straight line. One angle is ${a}°. Its ${kind} angle is…? (degrees)`, a: kind === "co-interior" ? 180 - a : a, x: kind === "co-interior" ? `Co-interior (C-shape) angles add up to 180°: 180 − ${a} = ${180 - a}°.` : `${kind[0].toUpperCase() + kind.slice(1)} angles (${kind === "alternate" ? "Z" : "F"}-shape) are equal: ${a}°.` }; }
  return MYP("maths/geometry", d, s); };
G["y8maths/data"] = (d, r, s) => MYP("maths/stats", d, s);

/* ================= YEAR 10 MATHS (GCSE) ================= */
G["y10maths/number"] = (d, r) => { const K = kit(r);
  if (d === 1){ if (r() < .5){ const m = K.int(11, 99) / 10, e = K.int(3, 7), v = Math.round(m * Math.pow(10, e));
      return { d, k:"mcq", ...K.mcq(`Write ${v.toLocaleString("en-GB")} in standard form.`, `${m} × 10${sup(e)}`, [`${m} × 10${sup(e + 1)}`, `${m * 10} × 10${sup(e - 1)}`, `${m} × 10${sup(e - 1)}`], `Standard form is A × 10ⁿ with 1 ≤ A < 10. Move the decimal point ${e} places: ${m} × 10${sup(e)}.`, d) }; }
    const b = K.int(2, 5), n = K.int(2, 4); return { d, k:"num", q:`Work out ${b}${sup(-n)} as a decimal or fraction. Type the decimal (round to 4 decimal places if needed).`, a:r2(Math.pow(b, -n) * 10000) / 10000, tol:0.00051, x:`A negative power means 1 over: ${b}${sup(-n)} = 1/${b}${sup(n)} = 1/${Math.pow(b, n)} ≈ ${(Math.pow(b, -n)).toFixed(4)}.` }; }
  if (d === 2){ if (r() < .5){ const a = K.int(2, 9), b = K.int(2, 9), e1 = K.int(2, 6), e2 = K.int(2, 5); let m = a * b, e = e1 + e2; if (m >= 10){ m /= 10; e++; }
      return K.mcq(`Work out (${a} × 10${sup(e1)}) × (${b} × 10${sup(e2)}). Give your answer in standard form.`, `${f(m)} × 10${sup(e)}`, [`${a * b} × 10${sup(e1 + e2)}`, `${f(m)} × 10${sup(e1 * e2)}`, `${f(m)} × 10${sup(e - 1)}`], `Multiply the numbers: ${a} × ${b} = ${a * b}. Add the powers: ${e1} + ${e2} = ${e1 + e2}. ${a * b >= 10 ? "Adjust so the first number is between 1 and 10: " : ""}${f(m)} × 10${sup(e)}.`, d); }
    const L = K.int(20, 90), unit = K.pick([1, 10]); return { d, k:"num", q:`A length is ${unit === 1 ? L : L * 10} cm, rounded to the nearest ${unit === 1 ? "cm" : "10 cm"}. What is the LOWER bound, in cm?`, a:(unit === 1 ? L : L * 10) - unit / 2, x:`Half of the rounding unit (${unit} cm) is ${unit / 2} cm. Lower bound = ${unit === 1 ? L : L * 10} − ${unit / 2} = ${(unit === 1 ? L : L * 10) - unit / 2} cm.` }; }
  const sq = K.pick([2, 3, 5, 6, 7]), k = K.pick([2, 3, 4, 5]), n = k * k * sq;
  if (r() < .5) return K.mcq(`Simplify √${n}`, `${k}√${sq}`, [`${sq}√${k}`, `${k * k}√${sq}`, `${k + sq}√${sq}`, `${k}√${sq * k}`, `${2 * k}√${sq}`], `Find the largest square factor: ${n} = ${k * k} × ${sq}. √${n} = √${k * k} × √${sq} = ${k}√${sq}.`, d);
  const base = K.pick([4, 8, 9, 16, 25, 27, 64]), roots = { 4:[2,2], 8:[2,3], 9:[3,2], 16:[4,2], 25:[5,2], 27:[3,3], 64:[4,3] }[base], [rt, idx] = roots, p = K.int(1, 2);
  return { d, k:"num", q:`Work out ${base}^(${p}/${idx})`, a:Math.pow(rt, p), x:`Fractional index: the bottom is the root, the top is the power. ${idx === 2 ? "√" : "∛"}${base} = ${rt}, then to the power ${p}: ${Math.pow(rt, p)}.` };
};
G["y10maths/quadratics"] = (d, r) => { const K = kit(r);
  const p = K.nz(-7, 7), q = K.nz(-7, 7);
  if (d === 1) return K.mcq(`Expand (x ${p < 0 ? "−" : "+"} ${Math.abs(p)})(x ${q < 0 ? "−" : "+"} ${Math.abs(q)})`, quad(1, p + q, p * q), [quad(1, p * q, p + q), quad(1, 0, p * q), quad(1, p + q, p + q), quad(1, -(p + q), p * q)], `Multiply every term (FOIL): x² ${term(q, "x").trim()} ${term(p, "x").trim()} ${term(p * q, "").trim()} = ${quad(1, p + q, p * q)}.`, d);
  if (d === 2){ if (r() < .5) return K.mcq(`Factorise ${quad(1, p + q, p * q)}`, `(x ${p < 0 ? "−" : "+"} ${Math.abs(p)})(x ${q < 0 ? "−" : "+"} ${Math.abs(q)})`, [`(x ${p < 0 ? "+" : "−"} ${Math.abs(p)})(x ${q < 0 ? "+" : "−"} ${Math.abs(q)})`, `(x ${p + q < 0 ? "−" : "+"} ${Math.abs(p + q)})(x + 1)`, `(x ${p * q < 0 ? "−" : "+"} ${Math.abs(p * q)})(x ${p < 0 ? "−" : "+"} 1)`], `Find two numbers that multiply to ${sgn(p * q)} and add to ${sgn(p + q)}: ${sgn(p)} and ${sgn(q)}.`, d);
    const big = Math.max(-p, -q), small = Math.min(-p, -q);
    return { d, k:"num", q:`Solve ${quad(1, p + q, p * q)} = 0. Type the LARGER solution.`, a:big, x:`Factorise: (x ${p < 0 ? "−" : "+"} ${Math.abs(p)})(x ${q < 0 ? "−" : "+"} ${Math.abs(q)}) = 0, so x = ${sgn(-p)} or x = ${sgn(-q)}. The larger is ${sgn(big)}.${small === big ? "" : ""}` }; }
  if (r() < .5){ const a = K.int(2, 3), m = K.nz(-5, 5), n = K.nz(-4, 4), A = a, B = a * n + m, C = m * n;   // (ax + m)(x + n)
    return { d, k:"num", q:`Solve ${quad(A, B, C)} = 0. Type the solution that is a WHOLE number.`, a:-n, x:`Factorise: (${a}x ${m < 0 ? "−" : "+"} ${Math.abs(m)})(x ${n < 0 ? "−" : "+"} ${Math.abs(n)}) = 0. So x = ${sgn(-n)} or x = ${sgn(-m)}/${a}.` }; }
  const b = K.pick([2, 4, 6, 8, -2, -4, -6]), c = K.int(-9, 9), h = b / 2, k2 = c - h * h;
  return K.mcq(`Complete the square: x² ${b < 0 ? "−" : "+"} ${Math.abs(b)}x ${c < 0 ? "−" : "+"} ${Math.abs(c)}`, `(x ${h < 0 ? "−" : "+"} ${Math.abs(h)})² ${k2 < 0 ? "−" : "+"} ${Math.abs(k2)}`, [`(x ${h < 0 ? "−" : "+"} ${Math.abs(b)})² ${k2 < 0 ? "−" : "+"} ${Math.abs(k2)}`, `(x ${h < 0 ? "−" : "+"} ${Math.abs(h)})² ${c + h * h < 0 ? "−" : "+"} ${Math.abs(c + h * h)}`, `(x ${h < 0 ? "+" : "−"} ${Math.abs(h)})² ${k2 < 0 ? "−" : "+"} ${Math.abs(k2)}`], `Halve the x-coefficient: ${sgn(h)}. (x ${h < 0 ? "−" : "+"} ${Math.abs(h)})² = x² ${b < 0 ? "−" : "+"} ${Math.abs(b)}x + ${h * h}, so subtract ${h * h}: ${c} − ${h * h} = ${sgn(k2)}.`, d);
};
G["y10maths/simultaneous"] = (d, r) => { const K = kit(r);
  const x = K.int(-4, 8), y = K.int(-4, 8);
  if (d === 1){ const s = x + y, t = x - y; return { d, k:"num", q:`Solve: x + y = ${sgn(s)} and x − y = ${sgn(t)}. What is x?`, a:x, x:`Add the equations: 2x = ${sgn(s + t)}, so x = ${sgn(x)}. (Then y = ${sgn(y)}.)` }; }
  if (d === 2){ const a = K.int(2, 5), b = K.int(1, 4), c = a * x + b * y, e = K.int(1, 3), g = x + e * y; const ask = K.pick(["x", "y"]);
    return { d, k:"num", q:`Solve: ${a}x + ${b === 1 ? "" : b}y = ${sgn(c)} and x + ${e === 1 ? "" : e}y = ${sgn(g)}. What is ${ask}?`, a: ask === "x" ? x : y, x:`Multiply the second equation by ${a}: ${a}x + ${a * e}y = ${sgn(a * g)}. Subtract the first: ${a * e - b}y = ${sgn(a * g - c)}, so y = ${sgn(y)}. Then x = ${sgn(g)} − ${e === 1 ? "" : e + " × "}${par(y)} = ${sgn(x)}.` }; }
  if (r() < .5){ const a = K.int(2, 4), c = K.int(-3, 5), lo = K.int(-2, 2), hi = lo + K.int(2, 6), L = a * lo + c, H = a * hi + c;
    return { d, k:"num", q:`How many integers n satisfy ${sgn(L)} < ${a}n ${c < 0 ? "−" : "+"} ${Math.abs(c)} ≤ ${sgn(H)}?`, a:hi - lo, x:`${c < 0 ? "Add " + Math.abs(c) : "Subtract " + c} from every part: ${sgn(L - c)} < ${a}n ≤ ${sgn(H - c)}. Divide by ${a}: ${sgn(lo)} < n ≤ ${sgn(hi)}. The integers are ${Array.from({ length: hi - lo }, (_, k) => sgn(lo + 1 + k)).join(", ")}: that's ${hi - lo}.` }; }
  const pa = K.int(2, 6), pb = K.int(3, 9), na = K.int(2, 5), nb = K.int(1, 4), ma = K.int(1, 4); let mb = K.int(2, 5); if (na * mb === nb * ma) mb++;
  return { d, k:"num", q:`${na} pens and ${nb} rulers cost ${na * pa + nb * pb} AED. ${ma} pens and ${mb} rulers cost ${ma * pa + mb * pb} AED. How much is one pen, in AED?`, a:pa, x:`Let p = pen, r = ruler. ${na}p + ${nb}r = ${na * pa + nb * pb} and ${ma}p + ${mb}r = ${ma * pa + mb * pb}. Eliminate r (multiply and subtract) to get p = ${pa} AED, and r = ${pb} AED.` };
};
G["y10maths/graphs"] = (d, r) => { const K = kit(r);
  const m = K.nz(-5, 5), c = K.int(-8, 8);
  if (d === 1) return K.mcq(`What is the gradient of y = ${m === 1 ? "" : m === -1 ? "−" : sgn(m)}x ${c < 0 ? "− " + Math.abs(c) : "+ " + c}?`, sgn(m), [sgn(c), sgn(-m), sgn(m + (m > 0 ? 1 : -1)), "0"], `In y = mx + c, m is the gradient: ${sgn(m)}. c (${sgn(c)}) is the y-intercept.`, d);
  if (d === 2){ if (r() < .5){ const x1 = K.int(-5, 3), x2 = x1 + K.int(1, 4), y1 = m * x1 + c, y2 = m * x2 + c;
      return { d, k:"text", q:`Find the equation of the line through (${sgn(x1)}, ${sgn(y1)}) and (${sgn(x2)}, ${sgn(y2)}). Type it like y = 3x - 2`, a:eqAlts(m, c), best:"y = " + lineStr(m, c), x:`Gradient = (${sgn(y2)} − ${par(y1)}) ÷ (${sgn(x2)} − ${par(x1)}) = ${sgn(m)}. Substitute a point to find c = ${sgn(c)}: y = ${lineStr(m, c)}.` }; }
    const c2 = K.int(-8, 8); return K.mcq(`Which line is parallel to y = ${lineStr(m, c)}?`, "y = " + lineStr(m, c2 === c ? c + 3 : c2), ["y = " + lineStr(-m, c), "y = " + lineStr(c === 0 ? m + 1 : c, m), "y = " + lineStr(m + (m > 0 ? 1 : -1), c)], `Parallel lines have the same gradient (${sgn(m)}).`, d); }
  if (r() < .5){ const p = K.int(-5, 5), q = K.int(-5, 5);  // y = (x - p)(x - q)
    return { d, k:"num", q:`The curve y = ${quad(1, -(p + q), p * q)} crosses the y-axis at (0, k). What is k?`, a:p * q, x:`On the y-axis x = 0, so y = ${sgn(p * q)}.` }; }
  const mp = K.pick([2, 3, 4, 5, -2, -3, -4, -5]);
  return K.mcq(`A line is perpendicular to y = ${lineStr(mp, c)}. What is its gradient?`, fracStr(-1, mp), [sgn(mp), sgn(-mp), fracStr(1, mp)], `Perpendicular gradients multiply to −1, so the new gradient is −1 ÷ ${par(mp)} = ${fracStr(-1, mp)}.`, d);
};
function lineStr(m, c){ return (m === 1 ? "" : m === -1 ? "−" : sgn(m)) + "x" + (c ? (c < 0 ? " − " + Math.abs(c) : " + " + c) : ""); }
function eqAlts(m, c){ const s = lineStr(m, c).replace(/−/g, "-"); return ["y = " + s, "y=" + s.replace(/\s/g, ""), s, s.replace(/\s/g, "")]; }
function fracStr(n, d){ if (d < 0){ n = -n; d = -d; } const g = gcd(n, d); n /= g; d /= g; return d === 1 ? sgn(n) : (n < 0 ? "−" : "") + Math.abs(n) + "/" + d; }
G["y10maths/proportion"] = (d, r) => { const K = kit(r);
  if (d === 1){ const p = K.pick([5, 10, 15, 20, 25, 30, 35]), a = K.int(4, 40) * 10, up = r() < .5, m = up ? 1 + p / 100 : 1 - p / 100;
    return { d, k:"num", q:`${up ? "Increase" : "Decrease"} ${a} by ${p}% using a multiplier. What is the answer?`, a:r2(a * m), tol:0.01, x:`Multiplier = ${up ? "1 + " : "1 − "}${p / 100} = ${f(m)}. ${a} × ${f(m)} = ${f(a * m)}.` }; }
  if (d === 2){ if (r() < .5){ const P = K.int(5, 40) * 100, i = K.pick([2, 3, 4, 5]), n = K.int(2, 4), v = P * Math.pow(1 + i / 100, n);
      return { d, k:"num", q:`${P} AED is invested at ${i}% compound interest per year. What is it worth after ${n} years? (to 2 d.p.)`, a:r2(v), tol:0.011, x:`Value = ${P} × ${f(1 + i / 100)}${sup(n)} = ${f(v)} AED. Compound interest earns interest on the interest too.` }; }
    const p = K.pick([10, 20, 25, 40]), orig = K.int(4, 40) * 10, sale = orig * (1 - p / 100);
    return { d, k:"num", q:`In a ${p}% off sale, a jacket costs ${f(sale)} AED. What was the original price, in AED?`, a:orig, x:`Sale price = original × ${f(1 - p / 100)}. Original = ${f(sale)} ÷ ${f(1 - p / 100)} = ${orig} AED.` }; }
  if (r() < .5){ const k = K.int(2, 6), x1 = K.int(2, 5), x2 = K.int(6, 10);
    return { d, k:"num", q:`y is directly proportional to x². When x = ${x1}, y = ${k * x1 * x1}. Find y when x = ${x2}.`, a:k * x2 * x2, x:`y = kx². ${k * x1 * x1} = k × ${x1 * x1}, so k = ${k}. When x = ${x2}: y = ${k} × ${x2 * x2} = ${k * x2 * x2}.` }; }
  const k = K.pick([12, 24, 36, 48, 60, 72]), x1 = K.pick([2, 3, 4, 6].filter(v => k % v === 0)), x2 = K.pick([2, 3, 4, 6, 8, 12].filter(v => v !== x1 && k % v === 0));
  return { d, k:"num", q:`y is inversely proportional to x. When x = ${x1}, y = ${k / x1}. Find y when x = ${x2}.`, a:k / x2, x:`y = k/x. k = ${x1} × ${k / x1} = ${k}. When x = ${x2}: y = ${k} ÷ ${x2} = ${k / x2}.` };
};
G["y10maths/trig"] = (d, r) => { const K = kit(r);
  const T = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25],[9,12,15]], [a, b, c] = K.pick(T);
  if (d === 1){ if (r() < .5) return { d, k:"num", q:`A right-angled triangle has shorter sides ${a} cm and ${b} cm. Find the hypotenuse, in cm.`, a:c, x:`Pythagoras: c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}. c = √${c * c} = ${c} cm.` };
    return { d, k:"num", q:`A right-angled triangle has hypotenuse ${c} cm and one side ${b} cm. Find the other side, in cm.`, a:a, x:`Shorter side: a² = ${c}² − ${b}² = ${c * c} − ${b * b} = ${a * a}. a = ${a} cm.` }; }
  if (d === 2){ const ang = K.pick([20, 25, 30, 35, 40, 50, 55, 60]), h = K.int(5, 20), fn = K.pick(["sin", "cos", "tan"]), rad = ang * Math.PI / 180;
    const ans = fn === "sin" ? h * Math.sin(rad) : fn === "cos" ? h * Math.cos(rad) : h * Math.tan(rad);
    const q = fn === "sin" ? `the hypotenuse is ${h} cm. Find the side OPPOSITE the angle` : fn === "cos" ? `the hypotenuse is ${h} cm. Find the side ADJACENT to the angle` : `the adjacent side is ${h} cm. Find the side OPPOSITE the angle`;
    return { d, k:"num", q:`In a right-angled triangle one angle is ${ang}° and ${q} (cm, 1 d.p.).`, a:r1(ans), tol:0.06, x:`SOH CAH TOA: use ${fn}. ${fn === "tan" ? "opp = adj × tan" : fn === "sin" ? "opp = hyp × sin" : "adj = hyp × cos"} ${ang}° = ${h} × ${f(fn === "sin" ? Math.sin(rad) : fn === "cos" ? Math.cos(rad) : Math.tan(rad))} ≈ ${r1(ans)} cm.` }; }
  if (r() < .5){ const ang = Math.atan(a / b) * 180 / Math.PI; return { d, k:"num", q:`A right-angled triangle has opposite side ${a} cm and adjacent side ${b} cm. Find the angle, in degrees (1 d.p.).`, a:r1(ang), tol:0.06, x:`tan θ = opp/adj = ${a}/${b}. θ = tan⁻¹(${f(a / b)}) ≈ ${r1(ang)}°.` }; }
  const L = K.int(3, 9), W = K.int(3, 9), H = K.int(3, 9), dg = Math.sqrt(L * L + W * W + H * H);
  return { d, k:"num", q:`A cuboid is ${L} cm × ${W} cm × ${H} cm. Find the length of its longest diagonal (cm, 1 d.p.).`, a:r1(dg), tol:0.06, x:`3D Pythagoras: d² = ${L}² + ${W}² + ${H}² = ${L * L + W * W + H * H}. d = √${L * L + W * W + H * H} ≈ ${r1(dg)} cm.` };
};
G["y10maths/mensuration"] = (d, r) => { const K = kit(r); const pi = Math.PI;
  if (d === 1){ const rad = K.int(2, 12); if (r() < .5) return { d, k:"num", q:`Find the circumference of a circle of radius ${rad} cm (1 d.p.).`, a:r1(2 * pi * rad), tol:0.06, x:`C = 2πr = 2 × π × ${rad} ≈ ${r1(2 * pi * rad)} cm.` };
    return { d, k:"num", q:`Find the area of a circle of radius ${rad} cm (1 d.p.).`, a:r1(pi * rad * rad), tol:0.06, x:`A = πr² = π × ${rad * rad} ≈ ${r1(pi * rad * rad)} cm².` }; }
  if (d === 2){ const rad = K.int(3, 12), ang = K.pick([30, 45, 60, 72, 90, 120, 150]);
    if (r() < .5) return { d, k:"num", q:`Find the area of a sector with radius ${rad} cm and angle ${ang}° (1 d.p.).`, a:r1(ang / 360 * pi * rad * rad), tol:0.06, x:`Sector = (${ang}/360) × πr² = ${f(ang / 360)} × π × ${rad * rad} ≈ ${r1(ang / 360 * pi * rad * rad)} cm².` };
    const h = K.int(3, 15); return { d, k:"num", q:`Find the volume of a cylinder with radius ${rad} cm and height ${h} cm (1 d.p.).`, a:r1(pi * rad * rad * h), tol:0.06, x:`V = πr²h = π × ${rad * rad} × ${h} ≈ ${r1(pi * rad * rad * h)} cm³.` }; }
  const rad = K.int(2, 9), h = K.int(3, 12);
  if (r() < .5) return { d, k:"num", q:`Find the volume of a cone with radius ${rad} cm and height ${h} cm (1 d.p.).`, a:r1(pi * rad * rad * h / 3), tol:0.06, x:`V = ⅓πr²h = ⅓ × π × ${rad * rad} × ${h} ≈ ${r1(pi * rad * rad * h / 3)} cm³.` };
  return { d, k:"num", q:`Find the surface area of a sphere with radius ${rad} cm (1 d.p.).`, a:r1(4 * pi * rad * rad), tol:0.06, x:`Surface area = 4πr² = 4 × π × ${rad * rad} ≈ ${r1(4 * pi * rad * rad)} cm².` };
};
G["y10maths/probability"] = (d, r) => { const K = kit(r);
  if (d === 1){ const red = K.int(2, 9), blue = K.int(2, 9), T = red + blue, g = gcd(blue, T);
    return { d, k:"text", q:`A bag has ${red} red and ${blue} blue balls. One is taken at random. What is P(blue)? Give a fraction in simplest form.`, a:[blue / g + "/" + T / g], x:`P = ${blue}/${T}${g > 1 ? " = " + blue / g + "/" + T / g : ""}.` }; }
  if (d === 2){ const p = K.pick([0.2, 0.3, 0.4, 0.6, 0.7]), q = K.pick([0.5, 0.2, 0.25, 0.8]);
    if (r() < .5) return { d, k:"num", q:`P(A) = ${p} and P(B) = ${q}, and A and B are independent. Find P(A and B).`, a:r2(p * q * 100) / 100, tol:0.0005, x:`Independent: multiply. ${p} × ${q} = ${f(p * q)}.` };
    const n = K.pick([50, 80, 100, 120, 200]); return { d, k:"num", q:`The probability a spinner lands on red is ${p}. It is spun ${n} times. How many reds would you expect?`, a:p * n, x:`Expected frequency = probability × trials = ${p} × ${n} = ${f(p * n)}.` }; }
  const red = K.int(3, 7), blue = K.int(2, 6), T = red + blue, num = red * (red - 1), den = T * (T - 1), g = gcd(num, den);
  return { d, k:"text", q:`A bag has ${red} red and ${blue} blue counters. Two are taken WITHOUT replacement. Find P(both red) as a fraction in simplest form.`, a:[num / g + "/" + den / g], x:`P = ${red}/${T} × ${red - 1}/${T - 1} = ${num}/${den}${g > 1 ? " = " + num / g + "/" + den / g : ""}. The second fraction changes because one counter has gone.` };
};
G["y10maths/statistics"] = (d, r, s) => MYP("maths/stats", d, s);

/* ================= SCIENCE CALCULATIONS ================= */
G["y8physics/energy"] = (d, r) => { const K = kit(r);
  if (d === 1){ const P = K.pick([100, 500, 1000, 2000, 60]), t = K.int(2, 30); return { d, k:"num", q:`A ${P} W device runs for ${t} seconds. How much energy does it transfer, in joules?`, a:P * t, x:`Energy = power × time = ${P} × ${t} = ${P * t} J.` }; }
  if (d === 2){ const kw = K.pick([0.5, 1, 1.5, 2, 3]), h = K.int(1, 6), p = K.pick([20, 25, 30, 34]); return { d, k:"num", q:`A ${kw} kW heater is on for ${h} hours. Electricity costs ${p}p per kWh. What is the cost, in pence?`, a:r2(kw * h * p), tol:0.01, x:`Energy = ${kw} kW × ${h} h = ${f(kw * h)} kWh. Cost = ${f(kw * h)} × ${p}p = ${f(kw * h * p)}p.` }; }
  const inJ = K.int(2, 10) * 100, out = inJ * K.pick([0.15, 0.2, 0.25, 0.4, 0.8]); return { d, k:"num", q:`A motor uses ${inJ} J and transfers ${out} J usefully. What is its efficiency, as a percentage?`, a:r2(out / inJ * 100), tol:0.01, x:`Efficiency = useful ÷ total × 100 = ${out} ÷ ${inJ} × 100 = ${f(out / inJ * 100)}%.` };
};
G["y8physics/forces"] = (d, r) => { const K = kit(r);
  if (d === 1){ const F = K.int(2, 50) * 10, A = K.pick([2, 4, 5, 10]); return { d, k:"num", q:`A force of ${F} N acts on an area of ${A} m². What is the pressure, in N/m² (Pa)?`, a:F / A, x:`Pressure = force ÷ area = ${F} ÷ ${A} = ${f(F / A)} Pa.` }; }
  if (d === 2){ const F = K.int(2, 30) * 5, dd = K.pick([0.2, 0.5, 1, 1.5, 2]); return { d, k:"num", q:`A ${F} N force acts ${dd} m from a pivot. What is the moment, in N m?`, a:r2(F * dd), tol:0.01, x:`Moment = force × perpendicular distance = ${F} × ${dd} = ${f(F * dd)} N m.` }; }
  const w1 = K.int(2, 8) * 10, d1 = K.pick([1, 1.5, 2, 3]), d2 = K.pick([1, 2, 3, 4, 5, 6].filter(x => (w1 * d1) % x === 0 && x !== d1)) || 2;
  return { d, k:"num", q:`A seesaw balances. A ${w1} N child sits ${d1} m from the pivot. How heavy is the child sitting ${d2} m away on the other side, in N?`, a:r2(w1 * d1 / d2), tol:0.01, x:`Balanced: clockwise moment = anticlockwise moment. ${w1} × ${d1} = W × ${d2}, so W = ${f(w1 * d1)} ÷ ${d2} = ${f(w1 * d1 / d2)} N.` };
};
G["y8physics/electricity"] = (d, r) => { const K = kit(r);
  const I = K.pick([0.5, 1, 1.5, 2, 3, 4]), R = K.pick([2, 3, 4, 5, 6, 10, 12]);
  if (d === 1) return { d, k:"num", q:`A current of ${I} A flows through a ${R} Ω resistor. What is the potential difference across it, in volts?`, a:r2(I * R), tol:0.01, x:`V = I × R = ${I} × ${R} = ${f(I * R)} V.` };
  if (d === 2) return { d, k:"num", q:`A ${f(I * R)} V battery is connected to a ${R} Ω resistor. What current flows, in amps?`, a:I, tol:0.01, x:`I = V ÷ R = ${f(I * R)} ÷ ${R} = ${I} A.` };
  const R1 = K.pick([2, 3, 4, 5, 6]), R2 = K.pick([4, 6, 8, 10]), V = (R1 + R2) * K.pick([0.5, 1, 2]);
  return { d, k:"num", q:`Resistors of ${R1} Ω and ${R2} Ω are in SERIES with a ${V} V supply. What is the current, in amps?`, a:r2(V / (R1 + R2)), tol:0.01, x:`In series, resistances add: ${R1} + ${R2} = ${R1 + R2} Ω. I = V ÷ R = ${V} ÷ ${R1 + R2} = ${f(V / (R1 + R2))} A.` };
};
G["y8physics/waves"] = (d, r) => { const K = kit(r);
  if (d === 1){ const t = K.int(2, 6); return { d, k:"num", q:`Sound travels at 340 m/s. You hear thunder ${t} s after seeing lightning. How far away is the storm, in m?`, a:340 * t, x:`Distance = speed × time = 340 × ${t} = ${340 * t} m.` }; }
  if (d === 2){ const t = K.int(2, 8) * 0.5; return { d, k:"num", q:`You shout at a cliff and hear the echo ${t} s later. Sound travels at 340 m/s. How far away is the cliff, in m?`, a:340 * t / 2, x:`The sound goes there AND back: total distance = 340 × ${t} = ${340 * t} m. The cliff is half of that: ${340 * t / 2} m.` }; }
  const fq = K.pick([170, 340, 680, 850, 1700]); return { d, k:"num", q:`A sound wave has frequency ${fq} Hz and travels at 340 m/s. What is its wavelength, in m?`, a:r2(340 / fq), tol:0.01, x:`Wave speed = frequency × wavelength, so λ = 340 ÷ ${fq} = ${f(340 / fq)} m.` };
};
G["y10physics/energy"] = (d, r) => { const K = kit(r);
  if (d === 1){ const m = K.pick([0.5, 1, 2, 4, 10]), v = K.int(2, 12); return { d, k:"num", q:`Find the kinetic energy of a ${m} kg object moving at ${v} m/s, in J.`, a:r2(0.5 * m * v * v), tol:0.01, x:`Eₖ = ½mv² = 0.5 × ${m} × ${v * v} = ${f(0.5 * m * v * v)} J.` }; }
  if (d === 2){ const m = K.pick([0.5, 2, 5, 10, 50]), h = K.int(2, 30); return { d, k:"num", q:`A ${m} kg object is lifted ${h} m (g = 9.8 N/kg). What is its gain in gravitational potential energy, in J?`, a:r2(m * 9.8 * h), tol:0.01, x:`Eₚ = mgh = ${m} × 9.8 × ${h} = ${f(m * 9.8 * h)} J.` }; }
  const m = K.pick([0.5, 1, 2]), c = K.pick([4200, 900, 390, 2100]), dT = K.int(5, 40); return { d, k:"num", q:`How much energy heats ${m} kg of a material (c = ${c} J/kg°C) by ${dT} °C, in J?`, a:m * c * dT, x:`ΔE = mcΔθ = ${m} × ${c} × ${dT} = ${m * c * dT} J.` };
};
G["y10physics/electricity"] = (d, r) => { const K = kit(r);
  if (d === 1) return G["y8physics/electricity"](2, r);
  if (d === 2){ const I = K.pick([0.5, 2, 3, 5, 10, 13]), V = 230; return { d, k:"num", q:`A kettle on the 230 V mains draws ${I} A. What is its power, in W?`, a:r2(I * V), tol:0.01, x:`P = V × I = 230 × ${I} = ${f(I * V)} W.` }; }
  if (r() < .5){ const I = K.pick([2, 3, 5]), t = K.pick([10, 30, 60, 120]); return { d, k:"num", q:`A current of ${I} A flows for ${t} s. How much charge flows, in coulombs?`, a:I * t, x:`Q = I × t = ${I} × ${t} = ${I * t} C.` }; }
  const I = K.pick([0.5, 2, 3, 4]), R = K.pick([5, 10, 20, 50]); return { d, k:"num", q:`A ${R} Ω resistor carries ${I} A. What power is transferred, in W?`, a:r2(I * I * R), tol:0.01, x:`P = I²R = ${I}² × ${R} = ${f(I * I * R)} W.` };
};
G["y10physics/particles"] = (d, r) => { const K = kit(r);
  if (d === 1) return MYPmatter(1, r);
  if (d === 2){ const m = K.pick([0.2, 0.5, 1, 2]), L = K.pick([334000, 2260000]); return { d, k:"num", q:`Specific latent heat of ${L === 334000 ? "fusion of ice is 334 000" : "vaporisation of water is 2 260 000"} J/kg. How much energy is needed to ${L === 334000 ? "melt" : "boil away"} ${m} kg, in J?`, a:m * L, x:`E = mL = ${m} × ${L.toLocaleString("en-GB")} = ${(m * L).toLocaleString("en-GB")} J. The temperature doesn't change during the change of state.` }; }
  const den = K.pick([800, 1000, 2700, 7900]), V = K.pick([0.002, 0.005, 0.01, 0.02]); return { d, k:"num", q:`A block has a density of ${den} kg/m³ and a volume of ${V} m³. What is its mass, in kg?`, a:r2(den * V), tol:0.01, x:`m = ρ × V = ${den} × ${V} = ${f(den * V)} kg.` };
};
function MYPmatter(d, r){ const K = kit(r); const den = K.pick([0.8, 1, 2.7, 7.9, 11.3]), v = K.int(2, 20); return { d, k:"num", q:`A block has mass ${f(den * v)} g and volume ${v} cm³. What is its density in g/cm³?`, a:den, tol:0.01, x:`ρ = m ÷ V = ${f(den * v)} ÷ ${v} = ${den} g/cm³.` }; }
G["y10physics/forces"] = (d, r) => { const K = kit(r);
  if (d === 1){ const m = K.int(2, 80), g = 9.8; return { d, k:"num", q:`What is the weight of a ${m} kg mass on Earth (g = 9.8 N/kg), in N?`, a:r2(m * g), tol:0.01, x:`W = mg = ${m} × 9.8 = ${f(m * g)} N.` }; }
  if (d === 2){ if (r() < .5){ const m = K.int(2, 20) * 50, a = K.pick([0.5, 1, 2, 3]); return { d, k:"num", q:`A ${m} kg car accelerates at ${a} m/s². What is the resultant force, in N?`, a:m * a, x:`F = ma = ${m} × ${a} = ${m * a} N (Newton's second law).` }; }
    const u = K.int(0, 10), v = u + K.int(2, 20), t = K.int(2, 8); return { d, k:"num", q:`A runner speeds up from ${u} m/s to ${v} m/s in ${t} s. What is the acceleration, in m/s²?`, a:r2((v - u) / t), tol:0.01, x:`a = (v − u) ÷ t = (${v} − ${u}) ÷ ${t} = ${f((v - u) / t)} m/s².` }; }
  if (r() < .5){ const F = K.int(2, 50) * 10, s = K.int(2, 20); return { d, k:"num", q:`A ${F} N force pushes a box ${s} m. How much work is done, in J?`, a:F * s, x:`W = F × s = ${F} × ${s} = ${F * s} J.` }; }
  const k = K.pick([20, 25, 40, 50, 100, 200]), e = K.pick([0.02, 0.05, 0.1, 0.2]); return { d, k:"num", q:`A spring has spring constant ${k} N/m and is stretched ${e} m. What force is applied, in N?`, a:r2(k * e), tol:0.01, x:`F = ke = ${k} × ${e} = ${f(k * e)} N (Hooke's law, within the limit of proportionality).` };
};
const AR = { H:1, C:12, N:14, O:16, Na:23, Mg:24, Cl:35.5, Ca:40, S:32, K:39, Fe:56, Cu:63.5, Al:27 };
const CPD = [["H₂O", { H:2, O:1 }], ["CO₂", { C:1, O:2 }], ["NaCl", { Na:1, Cl:1 }], ["MgO", { Mg:1, O:1 }], ["CaCO₃", { Ca:1, C:1, O:3 }], ["H₂SO₄", { H:2, S:1, O:4 }], ["NaOH", { Na:1, O:1, H:1 }], ["NH₃", { N:1, H:3 }], ["CH₄", { C:1, H:4 }], ["CuO", { Cu:1, O:1 }], ["Fe₂O₃", { Fe:2, O:3 }], ["KCl", { K:1, Cl:1 }], ["HCl", { H:1, Cl:1 }], ["Al₂O₃", { Al:2, O:3 }]];
const Mr = c => Object.entries(c).reduce((a, [el, n]) => a + AR[el] * n, 0);
G["y10chemistry/quantitative"] = (d, r) => { const K = kit(r); const [name, c] = K.pick(CPD), M = Mr(c), sum = Object.entries(c).map(([el, n]) => (n > 1 ? n + " × " : "") + AR[el]).join(" + ");
  if (d === 1) return { d, k:"num", q:`Calculate the relative formula mass (Mr) of ${name}. (Ar: ${Object.keys(c).map(el => el + " = " + AR[el]).join(", ")})`, a:M, tol:0.01, x:`Add the Ar of every atom: ${sum} = ${M}.` };
  if (d === 2){ const n = K.pick([0.1, 0.25, 0.5, 2, 3]); if (r() < .5) return { d, k:"num", q:`How many moles are in ${f(n * M)} g of ${name}? (Mr = ${M})`, a:n, tol:0.001, x:`moles = mass ÷ Mr = ${f(n * M)} ÷ ${M} = ${n} mol.` };
    return { d, k:"num", q:`What is the mass of ${n} mol of ${name}, in g? (Mr = ${M})`, a:r2(n * M), tol:0.01, x:`mass = moles × Mr = ${n} × ${M} = ${f(n * M)} g.` }; }
  if (r() < .5){ const el = K.pick(Object.keys(c)), pc = AR[el] * c[el] / M * 100; return { d, k:"num", q:`What is the percentage by mass of ${el} in ${name}? (Mr = ${M}, Ar of ${el} = ${AR[el]}) Give 1 d.p.`, a:r1(pc), tol:0.06, x:`% = (Ar × number of atoms ÷ Mr) × 100 = (${AR[el]} × ${c[el]} ÷ ${M}) × 100 ≈ ${r1(pc)}%.` }; }
  const mg = K.pick([1.2, 2.4, 4.8, 6]), mo = mg / 24 * 40; return { d, k:"num", q:`2Mg + O₂ → 2MgO. What mass of MgO forms from ${mg} g of Mg? (Ar Mg = 24, Mr MgO = 40)`, a:r2(mo), tol:0.01, x:`moles of Mg = ${mg} ÷ 24 = ${f(mg / 24)}. The ratio Mg : MgO is 2 : 2 = 1 : 1, so ${f(mg / 24)} mol MgO. Mass = ${f(mg / 24)} × 40 = ${f(mo)} g.` };
};
G["y10chemistry/energy"] = (d, r) => { const K = kit(r);
  const inE = K.int(5, 30) * 100, out = K.int(5, 30) * 100, dH = inE - out;
  if (d === 1) return K.mcq(`A reaction gives out heat and the temperature of the surroundings rises. What type of reaction is it?`, "Exothermic", ["Endothermic", "Neutral", "Reversible only"], "Exothermic reactions transfer energy to the surroundings, so the temperature rises (combustion, neutralisation).", d);
  if (d === 2) return K.mcq(`Breaking bonds takes in ${inE} kJ and making bonds gives out ${out} kJ. Is the reaction exo- or endothermic?`, dH > 0 ? "Endothermic" : "Exothermic", [dH > 0 ? "Exothermic" : "Endothermic", "Neither", "Can't tell"], `Overall energy change = in − out = ${inE} − ${out} = ${sgn(dH)} kJ. ${dH > 0 ? "Positive: more energy taken in → endothermic." : "Negative: more energy released → exothermic."}`, d);
  return { d, k:"num", q:`Bond energies: breaking bonds needs ${inE} kJ/mol in total; forming new bonds releases ${out} kJ/mol. What is the overall energy change, in kJ/mol? (use a minus sign if negative)`, a:dH, x:`ΔH = energy in (breaking) − energy out (making) = ${inE} − ${out} = ${sgn(dH)} kJ/mol.` };
};
G["y8chemistry/reactions"] = (d, r) => { const K = kit(r);
  if (d === 1){ const a = K.int(5, 40), b = K.int(2, 30); return { d, k:"num", q:`In a closed flask, ${a} g of reactant A reacts completely with ${b} g of reactant B. What is the total mass of the products, in g?`, a:a + b, x:`Mass is conserved: atoms are rearranged, not created or destroyed. ${a} + ${b} = ${a + b} g.` }; }
  if (d === 2){ const mg = K.int(2, 12), o = r2(mg * 16 / 24); return { d, k:"num", q:`${mg} g of magnesium burns in air and makes ${f(mg + o)} g of magnesium oxide. What mass of oxygen joined, in g?`, a:o, tol:0.01, x:`Mass of oxygen = product − magnesium = ${f(mg + o)} − ${mg} = ${f(o)} g. The mass went UP because oxygen from the air was added.` }; }
  return K.mcq(`Which equation is balanced?`, "2H₂ + O₂ → 2H₂O", ["H₂ + O₂ → H₂O", "H₂ + O₂ → 2H₂O", "2H₂ + 2O₂ → H₂O"], "Count atoms on each side: 2H₂ + O₂ → 2H₂O has 4 H and 2 O on both sides.", d);
};

/* ================= COMPUTING: data representation ================= */
const bin = (n, w) => n.toString(2).padStart(w || 8, "0"), hexs = n => n.toString(16).toUpperCase();
G["y8computing/data"] = (d, r) => { const K = kit(r);
  if (d === 1){ const n = K.int(1, 31); return { d, k:"num", q:`Convert the binary number ${bin(n, 5)} to denary.`, a:n, x:`Place values 16, 8, 4, 2, 1. Add the columns with a 1: ${[16,8,4,2,1].filter(v => n & v).join(" + ")} = ${n}.` }; }
  if (d === 2){ const n = K.int(20, 255); return { d, k:"text", q:`Convert ${n} to an 8-bit binary number.`, a:[bin(n)], x:`Use place values 128, 64, 32, 16, 8, 4, 2, 1 and subtract the biggest that fits each time: ${n} = ${[128,64,32,16,8,4,2,1].filter(v => n & v).join(" + ")} → ${bin(n)}.` }; }
  if (r() < .5){ const a = K.int(10, 120), b = K.int(10, 120); return { d, k:"text", q:`Add the binary numbers ${bin(a)} + ${bin(b)}. Give the 8-bit (or 9-bit if it overflows) answer.`, a:[bin(a + b, a + b > 255 ? 9 : 8)], x:`${a} + ${b} = ${a + b} in denary, which is ${bin(a + b, a + b > 255 ? 9 : 8)}.${a + b > 255 ? " That needs 9 bits: an overflow error in an 8-bit register." : ""} Remember 1 + 1 = 10 (write 0, carry 1).` }; }
  const bits = K.int(1, 8); return { d, k:"num", q:`How many different values can be stored using ${bits} bit${bits > 1 ? "s" : ""}?`, a:Math.pow(2, bits), x:`Each extra bit doubles the number of combinations: 2${sup(bits)} = ${Math.pow(2, bits)}.` };
};
G["y10computing/data"] = (d, r) => { const K = kit(r);
  if (d === 1){ const n = K.int(16, 255); return K.mcq(`What is ${n} in hexadecimal?`, hexs(n), [hexs((n + 16) % 256 || 1), hexs(n ^ 1), hexs(Math.floor(n / 2) + 9), String(n).slice(0, 2)], `Divide by 16: ${n} = ${Math.floor(n / 16)} × 16 + ${n % 16}. ${Math.floor(n / 16)} → ${hexs(Math.floor(n / 16))}, ${n % 16} → ${hexs(n % 16)}. So ${hexs(n)}.`, d); }
  if (d === 2){ if (r() < .5){ const n = K.int(16, 255); return { d, k:"num", q:`Convert hexadecimal ${hexs(n)} to denary.`, a:n, x:`${hexs(Math.floor(n / 16))} × 16 + ${hexs(n % 16)} = ${Math.floor(n / 16)} × 16 + ${n % 16} = ${n}.` }; }
    const n = K.int(1, 60), s = K.int(1, 2), left = r() < .5, v = left ? (n << s) & 255 : n >> s; return { d, k:"text", q:`Apply a ${left ? "left" : "right"} logical shift of ${s} place${s > 1 ? "s" : ""} to ${bin(n)}. Give the 8-bit result.`, a:[bin(v)], x:`Move every bit ${s} place${s > 1 ? "s" : ""} ${left ? "left" : "right"} and fill with 0s: ${bin(v)}. A ${left ? "left" : "right"} shift ${left ? "multiplies" : "divides"} by ${Math.pow(2, s)} (${n} → ${v}).` }; }
  if (r() < .5){ const w = K.pick([100, 200, 400, 800]), h = K.pick([100, 200, 300, 600]), cd = K.pick([1, 8, 16, 24]); const bytes = w * h * cd / 8;
    return { d, k:"num", q:`An image is ${w} × ${h} pixels with a colour depth of ${cd} bit${cd > 1 ? "s" : ""}. What is its file size in kilobytes (1 KB = 1000 bytes)?`, a:bytes / 1000, tol:0.01, x:`Size = width × height × colour depth = ${w} × ${h} × ${cd} = ${w * h * cd} bits. ÷ 8 = ${bytes} bytes. ÷ 1000 = ${bytes / 1000} KB.` }; }
  const sr = K.pick([8000, 16000, 44100]), bd = K.pick([8, 16]), t = K.int(2, 10); const bytes = sr * bd * t / 8;
  return { d, k:"num", q:`Sound is sampled ${sr} times a second at a bit depth of ${bd} for ${t} seconds. What is the file size in kilobytes (1 KB = 1000 bytes)?`, a:bytes / 1000, tol:0.01, x:`Size = sample rate × bit depth × seconds = ${sr} × ${bd} × ${t} = ${sr * bd * t} bits = ${bytes} bytes = ${bytes / 1000} KB.` };
};

window.UK_GEN = { make(key, d, seed){ const g = G[key]; if (!g) return null; try { const t = g(d, rng(seed), seed); if (!t) return null; t.d = t.d || d; if (t.k === "mcq" && (t.a < 0 || !t.o || t.o.length < 2)) return null; return t; } catch(e){ return null; } }, has: key => !!G[key], keys: Object.keys(G), rng };
})();
