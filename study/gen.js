/* Study Plus · question generators.
   Each generator makes a brand-new question on its topic at the level asked for (1 Core, 2 Extended, 3 Challenge),
   using a seed, so the same seed always rebuilds the same question (progress reloads exactly) and a new seed gives new numbers.
   Used by study.html when it builds a new challenge set. */
(function(){
"use strict";
function rng(seed){ let a = seed >>> 0 || 1; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const kit = r => {
  const int = (lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
  const nz = (lo, hi) => { let v = 0; while (!v) v = int(lo, hi); return v; };
  const pick = L => L[Math.floor(r() * L.length)];
  const shuffle = L => { const a = L.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  /* multiple choice from a right answer and distractors: puts the right answer at a random place */
  const mcq = (q, right, wrong, x, d) => { const o = shuffle([right].concat(uniq(wrong.filter(w => String(w) !== String(right))).slice(0, 3))); return { d, k:"mcq", q, o:o.map(String), a:o.indexOf(right), x }; };
  return { int, nz, pick, shuffle, mcq };
};
const uniq = L => L.filter((v, i) => L.map(String).indexOf(String(v)) === i);
const sgn = n => n < 0 ? "−" + Math.abs(n) : String(n);
const par = n => n < 0 ? "(" + sgn(n) + ")" : String(n);
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b){ [a, b] = [b, a % b]; } return a || 1; };
const frac = (n, d) => { const g = gcd(n, d); n /= g; d /= g; if (d < 0){ n = -n; d = -d; } return d === 1 ? String(n) : n + "/" + d; };
const r2 = v => Math.round(v * 100) / 100;
const fmt = v => String(r2(v));

const G = {};

/* ================= MATHEMATICS ================= */
G["maths/integers"] = (d, r) => { const K = kit(r);
  if (d === 1){ const a = K.nz(-15, 15), b = K.nz(-15, 15), op = K.pick(["+", "−"]); const v = op === "+" ? a + b : a - b;
    return { d, k:"num", q:`Work out: ${sgn(a)} ${op} ${par(b)}`, a:v, x:`${op === "−" && b < 0 ? "Subtracting a negative is the same as adding: " + sgn(a) + " + " + Math.abs(b) + ". " : op === "+" && b < 0 ? "Adding a negative is the same as subtracting: " + sgn(a) + " − " + Math.abs(b) + ". " : ""}Use a number line: start at ${sgn(a)} and move ${Math.abs(op === "+" ? b : -b)} ${(op === "+" ? b : -b) > 0 ? "right" : "left"}. Answer: ${sgn(v)}.` }; }
  if (d === 2){ const a = K.nz(-12, 12), b = K.nz(-12, 12);
    if (r() < .5) return { d, k:"num", q:`Work out: ${par(a)} × ${par(b)}`, a:a * b, x:`${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}. ${(a < 0) === (b < 0) ? "Same signs give a positive" : "Different signs give a negative"}, so the answer is ${sgn(a * b)}.` };
    const p = a * b; return { d, k:"num", q:`Work out: ${sgn(p)} ÷ ${par(b)}`, a:a, x:`${Math.abs(p)} ÷ ${Math.abs(b)} = ${Math.abs(a)}. ${(p < 0) === (b < 0) ? "Same signs give a positive" : "Different signs give a negative"}, so the answer is ${sgn(a)}.` }; }
  const kind = K.int(0, 2);
  if (kind === 0){ const a = K.nz(-5, -2), n = K.pick([2, 3]), b = K.nz(-9, 9), c = K.nz(-6, 6); const v = Math.pow(a, n) - b * c;
    return { d, k:"num", q:`Work out: ${par(a)}${n === 2 ? "²" : "³"} − ${par(b)} × ${par(c)}`, a:v, x:`Powers first: ${par(a)}${n === 2 ? "²" : "³"} = ${sgn(Math.pow(a, n))} (${n === 2 ? "an even power of a negative is positive" : "an odd power of a negative stays negative"}). Then multiply: ${par(b)} × ${par(c)} = ${sgn(b * c)}. Finally ${sgn(Math.pow(a, n))} − ${par(b * c)} = ${sgn(v)}.` }; }
  if (kind === 1){ const t0 = K.int(-12, -3), rate = K.int(2, 4), h = K.int(3, 7); const v = t0 + rate * h;
    return { d, k:"num", q:`At 5 am the temperature was ${sgn(t0)} °C. It rose ${rate} °C every hour. What was the temperature ${h} hours later, in °C?`, a:v, x:`It rose ${h} × ${rate} = ${rate * h} °C in total. ${sgn(t0)} + ${rate * h} = ${sgn(v)} °C.` }; }
  const dep = K.int(20, 90), up = K.int(5, 40); const v = -dep + up;
  return { d, k:"num", q:`A diver is ${dep} m below sea level (−${dep} m). She rises ${up} m. What is her new position in metres? (use a minus sign for below sea level)`, a:v, x:`Start at −${dep} and move up ${up}: −${dep} + ${up} = ${sgn(v)} m.` };
};
G["maths/fdp"] = (d, r) => { const K = kit(r);
  if (d === 1){ if (r() < .5){ const den = K.pick([4, 5, 8, 10]), num = K.int(1, den - 1), amt = den * K.int(3, 12);
      return { d, k:"num", q:`Work out ${num}/${den} of ${amt}`, a:amt / den * num, x:`Divide by the bottom, multiply by the top: ${amt} ÷ ${den} = ${amt / den}, then × ${num} = ${amt / den * num}.` }; }
    const p = K.pick([10, 20, 25, 50, 75, 5, 15]), amt = K.int(2, 20) * 20; const v = amt * p / 100;
    return { d, k:"num", q:`Find ${p}% of ${amt} AED (just the number)`, a:v, x:`${p}% = ${p}/100. ${amt} ÷ 100 × ${p} = ${fmt(v)}. Tip: 10% is ${amt / 10}, then build up.` }; }
  if (d === 2){ if (r() < .5){ const a = K.pick([2, 3, 4, 5, 6]), b = K.pick([3, 4, 5, 6, 8].filter(x => x !== a)), n1 = K.int(1, a - 1), n2 = K.int(1, b - 1);
      const den = a * b / gcd(a, b), num = n1 * (den / a) + n2 * (den / b), ans = frac(num, den);
      const alts = [ans]; if (num / den > 1){ const g = gcd(num, den), N = num / g, D = den / g; alts.push(Math.floor(N / D) + " " + (N % D) + "/" + D); }
      return { d, k:"text", q:`Work out ${n1}/${a} + ${n2}/${b}. Give your answer as a fraction in its simplest form (like 7/12 or 5/4).`, a:alts.concat([fmt(num / den)]), best:ans, x:`Use a common denominator of ${den}: ${n1}/${a} = ${n1 * den / a}/${den} and ${n2}/${b} = ${n2 * den / b}/${den}. Add the tops: ${num}/${den}${frac(num, den) !== num + "/" + den ? " = " + ans + " in simplest form" : ""}.` }; }
    const p = K.pick([5, 10, 15, 20, 25, 30, 40]), amt = K.int(4, 30) * 10, up = r() < .5; const v = amt * (up ? 1 + p / 100 : 1 - p / 100);
    return { d, k:"num", q:`A price of ${amt} AED is ${up ? "increased" : "decreased"} by ${p}%. What is the new price in AED?`, a:r2(v), tol:0.01, x:`Use a multiplier: ${up ? "1 + " : "1 − "}${p / 100} = ${fmt(up ? 1 + p / 100 : 1 - p / 100)}. ${amt} × ${fmt(up ? 1 + p / 100 : 1 - p / 100)} = ${fmt(v)} AED.` }; }
  if (r() < .5){ const p = K.pick([10, 20, 25, 50]), orig = K.int(4, 30) * 20, now = orig * (1 + p / 100);
    return { d, k:"num", q:`After a ${p}% increase, a bike costs ${fmt(now)} AED. What was the original price in AED?`, a:orig, x:`New price = original × ${fmt(1 + p / 100)}, so original = ${fmt(now)} ÷ ${fmt(1 + p / 100)} = ${orig} AED. Taking ${p}% off the new price would give the wrong answer.` }; }
  const p1 = K.pick([10, 20, 25]), p2 = K.pick([10, 20, 50]), amt = K.int(2, 10) * 100; const v = amt * (1 - p1 / 100) * (1 - p2 / 100);
  return { d, k:"num", q:`A ${amt} AED tablet is reduced by ${p1}%, then the sale price is reduced by a further ${p2}%. What is the final price in AED?`, a:r2(v), tol:0.01, x:`Multiply by each multiplier in turn: ${amt} × ${fmt(1 - p1 / 100)} = ${fmt(amt * (1 - p1 / 100))}, then × ${fmt(1 - p2 / 100)} = ${fmt(v)} AED. It is NOT a ${p1 + p2}% discount.` };
};
G["maths/algebra"] = (d, r) => { const K = kit(r);
  if (d === 1){ if (r() < .5){ const a = K.int(2, 9), b = K.int(1, 15), x = K.int(-5, 9); const v = a * x + b;
      return { d, k:"num", q:`If x = ${sgn(x)}, find the value of ${a}x + ${b}`, a:v, x:`Replace x with ${sgn(x)}: ${a} × ${par(x)} + ${b} = ${sgn(a * x)} + ${b} = ${sgn(v)}.` }; }
    const a = K.int(2, 9), x = K.int(-6, 12), b = a * x; return { d, k:"num", q:`Solve ${a}x = ${sgn(b)}`, a:x, x:`Divide both sides by ${a}: x = ${sgn(b)} ÷ ${a} = ${sgn(x)}.` }; }
  if (d === 2){ if (r() < .5){ const a = K.int(2, 9), x = K.int(-5, 12), b = K.nz(-15, 15), c = a * x + b;
      return { d, k:"num", q:`Solve ${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${sgn(c)}`, a:x, x:`${b < 0 ? "Add " + Math.abs(b) : "Subtract " + b} on both sides: ${a}x = ${sgn(c - b)}. Divide by ${a}: x = ${sgn(x)}.` }; }
    const a = K.int(2, 7), b = K.nz(-9, 9); const right = `${a}x ${a * b < 0 ? "−" : "+"} ${Math.abs(a * b)}`;
    return K.mcq(`Expand ${a}(x ${b < 0 ? "−" : "+"} ${Math.abs(b)})`, right, [`${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)}`, `x ${a * b < 0 ? "−" : "+"} ${Math.abs(a * b)}`, `${a}x ${a * b < 0 ? "+" : "−"} ${Math.abs(a * b)}`, `${a + Math.abs(b)}x`], `Multiply EVERY term inside the bracket by ${a}: ${a} × x = ${a}x and ${a} × ${par(b)} = ${sgn(a * b)}. So ${right}.`, d); }
  if (r() < .5){ const x = K.int(-4, 10), a = K.int(4, 9), c = K.int(1, a - 1), b = K.int(-10, 10), dd = (a - c) * x + b;
    return { d, k:"num", q:`Solve ${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${c}x ${dd < 0 ? "−" : "+"} ${Math.abs(dd)}`, a:x, x:`Subtract ${c}x from both sides: ${a - c}x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${sgn(dd)}. ${b < 0 ? "Add " + Math.abs(b) : "Subtract " + b}: ${a - c}x = ${sgn(dd - b)}. Divide by ${a - c}: x = ${sgn(x)}.` }; }
  const w = K.int(3, 15), extra = K.int(2, 9), P = 2 * (2 * w + extra);
  return { d, k:"num", q:`A rectangle is x cm wide and (x + ${extra}) cm long. Its perimeter is ${P} cm. Find x.`, a:w, x:`Perimeter = 2(x + x + ${extra}) = 4x + ${2 * extra} = ${P}. So 4x = ${P - 2 * extra} and x = ${w}. The rectangle is ${w} cm by ${w + extra} cm.` };
};
G["maths/ratio"] = (d, r) => { const K = kit(r);
  if (d === 1){ if (r() < .5){ const a = K.int(1, 7), b = K.int(1, 9), m = K.int(2, 9); const g = gcd(a, b), A = a / g, B = b / g;
      return { d, k:"text", q:`Simplify the ratio ${a * m} : ${b * m}`, a:[A + ":" + B, A + " : " + B], best:A + " : " + B, x:`Divide both parts by their highest common factor, ${m * g}: ${a * m} ÷ ${m * g} = ${A} and ${b * m} ÷ ${m * g} = ${B}. So ${A} : ${B}.` }; }
    const a = K.int(1, 5), b = K.int(1, 5), part = K.int(3, 20) * 2, tot = (a + b) * part;
    return { d, k:"num", q:`Share ${tot} AED in the ratio ${a} : ${b}. How much is the first share?`, a:a * part, x:`${a} + ${b} = ${a + b} parts. One part = ${tot} ÷ ${a + b} = ${part}. First share = ${a} × ${part} = ${a * part} AED.` }; }
  if (d === 2){ if (r() < .5){ const a = K.int(1, 4), b = K.int(1, 5), c = K.int(2, 6), part = K.int(4, 25), tot = (a + b + c) * part;
      return { d, k:"num", q:`Share ${tot} AED in the ratio ${a} : ${b} : ${c}. How much is the largest share?`, a:Math.max(a, b, c) * part, x:`${a} + ${b} + ${c} = ${a + b + c} parts. One part = ${tot} ÷ ${a + b + c} = ${part}. Largest = ${Math.max(a, b, c)} × ${part} = ${Math.max(a, b, c) * part} AED.` }; }
    const n = K.int(3, 8), cost = n * K.int(3, 15) / 2, m = K.int(9, 20);
    return { d, k:"num", q:`${n} notebooks cost ${fmt(cost)} AED. How much do ${m} notebooks cost, in AED?`, a:r2(cost / n * m), tol:0.01, x:`Find one first (unitary method): ${fmt(cost)} ÷ ${n} = ${fmt(cost / n)} AED. Then × ${m} = ${fmt(cost / n * m)} AED.` }; }
  if (r() < .5){ const w = K.pick([2, 3, 4, 6]), days = K.pick([3, 4, 6, 8, 12]), total = w * days, w2 = K.pick([1, 2, 3, 4, 6, 8, 12, 24].filter(x => x !== w && total % x === 0));
    return { d, k:"num", q:`${w} workers paint a school in ${days} days. How many days would ${w2} workers take at the same rate?`, a:total / w2, x:`Inverse proportion: total work = ${w} × ${days} = ${total} worker-days. ${total} ÷ ${w2} = ${total / w2} days.` }; }
  const a = K.int(3, 8), b = K.int(1, a - 1), part = K.int(2, 15), diff = (a - b) * part;
  return { d, k:"num", q:`Boys and girls in a club are in the ratio ${a} : ${b}. There are ${diff} more boys than girls. How many members are there altogether?`, a:(a + b) * part, x:`The difference is ${a} − ${b} = ${a - b} parts = ${diff}, so 1 part = ${part}. Total = ${a + b} parts = ${(a + b) * part}.` };
};
G["maths/geometry"] = (d, r) => { const K = kit(r);
  if (d === 1){ const k = K.int(0, 2);
    if (k === 0){ const a = K.int(20, 160); return { d, k:"num", q:`Two angles sit on a straight line. One is ${a}°. What is the other, in degrees?`, a:180 - a, x:`Angles on a straight line add up to 180°. 180 − ${a} = ${180 - a}°.` }; }
    if (k === 1){ const a = K.int(25, 80), b = K.int(25, 150 - a); return { d, k:"num", q:`A triangle has angles of ${a}° and ${b}°. What is the third angle, in degrees?`, a:180 - a - b, x:`Angles in a triangle add up to 180°. 180 − ${a} − ${b} = ${180 - a - b}°.` }; }
    const w = K.int(3, 15), l = K.int(4, 20); return { d, k:"num", q:`Find the area of a rectangle ${l} cm by ${w} cm, in cm².`, a:l * w, x:`Area = length × width = ${l} × ${w} = ${l * w} cm².` }; }
  if (d === 2){ const k = K.int(0, 2);
    if (k === 0){ const b = K.int(4, 20), h = K.int(3, 15); return { d, k:"num", q:`A triangle has base ${b} cm and perpendicular height ${h} cm. Find its area in cm².`, a:b * h / 2, x:`Area of a triangle = ½ × base × height = ½ × ${b} × ${h} = ${fmt(b * h / 2)} cm².` }; }
    if (k === 1){ const a = K.int(3, 10), b = K.int(a + 1, 16), h = K.int(2, 10); return { d, k:"num", q:`A trapezium has parallel sides ${a} cm and ${b} cm, and height ${h} cm. Find its area in cm².`, a:(a + b) * h / 2, x:`Area = ½ × (a + b) × h = ½ × (${a} + ${b}) × ${h} = ${fmt((a + b) * h / 2)} cm².` }; }
    const a = K.int(60, 120), b = K.int(60, 120), c = K.int(60, 110); return { d, k:"num", q:`Three angles of a quadrilateral are ${a}°, ${b}° and ${c}°. Find the fourth angle, in degrees.`, a:360 - a - b - c, x:`Angles in a quadrilateral add up to 360°. 360 − ${a} − ${b} − ${c} = ${360 - a - b - c}°.` }; }
  const k = K.int(0, 2);
  if (k === 0){ const rad = K.int(2, 12); return { d, k:"num", q:`Find the area of a circle with radius ${rad} cm. Use π = 3.14 and give the answer in cm².`, a:r2(3.14 * rad * rad), tol:0.05, x:`Area = πr² = 3.14 × ${rad}² = 3.14 × ${rad * rad} = ${fmt(3.14 * rad * rad)} cm².` }; }
  if (k === 1){ const n = K.pick([5, 6, 8, 9, 10, 12]); return { d, k:"num", q:`What is each interior angle of a regular polygon with ${n} sides, in degrees?`, a:(n - 2) * 180 / n, x:`Sum of interior angles = (n − 2) × 180 = ${n - 2} × 180 = ${(n - 2) * 180}°. Divide by ${n}: ${fmt((n - 2) * 180 / n)}°.` }; }
  const b = K.int(3, 10), h = K.int(2, 8), len = K.int(5, 15); return { d, k:"num", q:`A triangular prism has a triangle face with base ${b} cm and height ${h} cm. The prism is ${len} cm long. Find its volume in cm³.`, a:b * h / 2 * len, x:`Volume of a prism = area of cross-section × length. Triangle area = ½ × ${b} × ${h} = ${fmt(b * h / 2)} cm². × ${len} = ${fmt(b * h / 2 * len)} cm³.` };
};
G["maths/stats"] = (d, r) => { const K = kit(r);
  const list = (n, lo, hi) => Array.from({ length:n }, () => K.int(lo, hi));
  if (d === 1){ const L = list(K.pick([5, 6, 7]), 1, 20), k = K.int(0, 2);
    if (k === 0){ const sum = L.reduce((a, b) => a + b, 0), mean = sum / L.length; return { d, k:"num", q:`Find the mean of: ${L.join(", ")} (round to 1 decimal place if needed)`, a:r2(mean), tol:0.06, x:`Add them: ${sum}. Divide by how many there are (${L.length}): ${sum} ÷ ${L.length} = ${fmt(mean)}.` }; }
    if (k === 1){ const S = L.slice().sort((a, b) => a - b); return { d, k:"num", q:`Find the range of: ${L.join(", ")}`, a:S[S.length - 1] - S[0], x:`Range = largest − smallest = ${S[S.length - 1]} − ${S[0]} = ${S[S.length - 1] - S[0]}.` }; }
    const S = L.slice().sort((a, b) => a - b), n = S.length, med = n % 2 ? S[(n - 1) / 2] : (S[n / 2 - 1] + S[n / 2]) / 2;
    return { d, k:"num", q:`Find the median of: ${L.join(", ")}`, a:med, x:`Put them in order: ${S.join(", ")}. ${n % 2 ? "The middle value is " + med : "The middle two are " + S[n / 2 - 1] + " and " + S[n / 2] + ", halfway between is " + fmt(med)}.` }; }
  if (d === 2){ if (r() < .5){ const n = K.int(4, 6), mean = K.int(5, 15), L = list(n - 1, 2, 2 * mean), need = mean * n - L.reduce((a, b) => a + b, 0);
      if (need > 0) return { d, k:"num", q:`The mean of ${n} numbers is ${mean}. ${n - 1} of them are ${L.join(", ")}. What is the missing number?`, a:need, x:`The total must be ${n} × ${mean} = ${mean * n}. The others add to ${L.reduce((a, b) => a + b, 0)}. Missing = ${mean * n} − ${L.reduce((a, b) => a + b, 0)} = ${need}.` }; }
    const red = K.int(1, 9), blue = K.int(1, 9), green = K.int(1, 9), T = red + blue + green, c = K.pick(["red", "blue", "green"]), v = { red, blue, green }[c];
    return { d, k:"text", q:`A bag holds ${red} red, ${blue} blue and ${green} green counters. One is picked at random. What is P(${c})? Give a fraction in simplest form.`, a:[frac(v, T), fmt(v / T)], best:frac(v, T), x:`P = number of ${c} ÷ total = ${v}/${T}${frac(v, T) !== v + "/" + T ? " = " + frac(v, T) : ""}.` }; }
  if (r() < .5){ const vals = [0, 1, 2, 3, 4], f = vals.map(() => K.int(1, 9)), n = f.reduce((a, b) => a + b, 0), tot = vals.reduce((a, v, i) => a + v * f[i], 0);
    return { d, k:"num", q:`Number of pets owned by students:\n${vals.map((v, i) => v + (v === 1 ? " pet: " : " pets: ") + f[i] + " students").join("\n")}\nFind the mean number of pets (1 decimal place).`, a:r2(tot / n), tol:0.06, x:`Multiply each value by its frequency and add: ${vals.map((v, i) => v + "×" + f[i]).join(" + ")} = ${tot}. Total students = ${n}. Mean = ${tot} ÷ ${n} = ${fmt(tot / n)}.` }; }
  const p = K.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6]), q2 = K.pick([0.5, 0.1, 0.2, 0.25]);
  return { d, k:"num", q:`The probability it rains on Monday is ${p}. The probability Ali's bus is late is ${q2}. The two are independent. What is the probability that it rains AND the bus is late? (as a decimal)`, a:r2(p * q2 * 10000) / 10000, tol:0.0005, x:`For independent events multiply: ${p} × ${q2} = ${p * q2}.` };
};
G["maths/sequences"] = (d, r) => { const K = kit(r);
  const a = K.int(-5, 12), s = K.nz(-6, 9), T = n => a + (n - 1) * s, seq = [1, 2, 3, 4, 5].map(T).map(sgn).join(", ");
  if (d === 1) return { d, k:"num", q:`What is the next term? ${seq}, …`, a:T(6), x:`The term-to-term rule is ${s > 0 ? "add " + s : "subtract " + Math.abs(s)}. ${sgn(T(5))} ${s > 0 ? "+ " + s : "− " + Math.abs(s)} = ${sgn(T(6))}.` };
  const c = a - s, rule = `${s === 1 ? "" : s === -1 ? "−" : sgn(s)}n${c ? (c > 0 ? " + " + c : " − " + Math.abs(c)) : ""}`;
  if (d === 2){ const n = K.int(10, 40); return { d, k:"num", q:`The sequence ${seq}, … has nth term ${rule}. What is the ${n}th term?`, a:T(n), x:`Put n = ${n} into ${rule}: ${sgn(s)} × ${n}${c ? (c > 0 ? " + " + c : " − " + Math.abs(c)) : ""} = ${sgn(T(n))}.` }; }
  if (r() < .5){ const alts = [rule.replace(/\s/g, ""), rule]; if (c > 0 && s > 0) alts.push(c + "+" + (s === 1 ? "" : s) + "n");
    return { d, k:"text", q:`Find the nth term of: ${seq}, … (for example 3n + 2)`, a:alts, best:rule, x:`The difference is ${sgn(s)}, so it starts ${sgn(s)}n. When n = 1, ${sgn(s)}n = ${sgn(s)} but the first term is ${sgn(a)}, so ${c >= 0 ? "add " + c : "subtract " + Math.abs(c)}: ${rule}.` }; }
  const sPos = Math.abs(s), aa = K.int(1, 9), n = K.int(12, 40), target = aa + (n - 1) * sPos;
  return { d, k:"num", q:`The sequence ${[1, 2, 3, 4].map(k => aa + (k - 1) * sPos).join(", ")}, … continues. Which term number is ${target}?`, a:n, x:`nth term = ${sPos}n ${aa - sPos >= 0 ? "+ " + (aa - sPos) : "− " + (sPos - aa)}. Solve ${sPos}n ${aa - sPos >= 0 ? "+ " + (aa - sPos) : "− " + (sPos - aa)} = ${target}: ${sPos}n = ${target - aa + sPos}, n = ${n}.` };
};
G["maths/transform"] = (d, r) => { const K = kit(r);
  const pt = (x, y) => "(" + sgn(x) + ", " + sgn(y) + ")", ans = (x, y) => ["(" + x + "," + y + ")", x + "," + y];
  const x = K.nz(-8, 8), y = K.nz(-8, 8);
  if (d === 1){ if (r() < .5){ const a = K.nz(-6, 6), b = K.nz(-6, 6);
      return { d, k:"text", q:`The point ${pt(x, y)} is translated ${Math.abs(a)} ${a > 0 ? "right" : "left"} and ${Math.abs(b)} ${b > 0 ? "up" : "down"}. Where does it end up? Type it like (3, -2).`, a:ans(x + a, y + b), best:pt(x + a, y + b), x:`Add to x: ${sgn(x)} ${a > 0 ? "+" : "−"} ${Math.abs(a)} = ${sgn(x + a)}. Add to y: ${sgn(y)} ${b > 0 ? "+" : "−"} ${Math.abs(b)} = ${sgn(y + b)}. Answer ${pt(x + a, y + b)}.` }; }
    const ax = K.pick(["x", "y"]); const X = ax === "y" ? -x : x, Y = ax === "x" ? -y : y;
    return { d, k:"text", q:`Reflect the point ${pt(x, y)} in the ${ax}-axis. Type the new point like (3, -2).`, a:ans(X, Y), best:pt(X, Y), x:`Reflecting in the ${ax}-axis keeps ${ax === "x" ? "x" : "y"} the same and changes the sign of ${ax === "x" ? "y" : "x"}: ${pt(X, Y)}.` }; }
  if (d === 2){ if (r() < .5) return { d, k:"text", q:`Rotate the point ${pt(x, y)} by 180° about the origin. Type the new point like (3, -2).`, a:ans(-x, -y), best:pt(-x, -y), x:`A 180° rotation about the origin changes the sign of both coordinates: ${pt(-x, -y)}.` };
    const x2 = x + 2 * K.nz(-4, 4), y2 = y + 2 * K.nz(-4, 4);
    return { d, k:"text", q:`Find the midpoint of ${pt(x, y)} and ${pt(x2, y2)}. Type it like (3, -2).`, a:ans((x + x2) / 2, (y + y2) / 2), best:pt((x + x2) / 2, (y + y2) / 2), x:`Average the x values and the y values: ((${x} + ${x2}) ÷ 2, (${y} + ${y2}) ÷ 2) = ${pt((x + x2) / 2, (y + y2) / 2)}.` }; }
  if (r() < .5){ const m = K.nz(-4, 4), dx = K.int(1, 5), x2 = x + dx, y2 = y + m * dx;
    return { d, k:"num", q:`Find the gradient of the line through ${pt(x, y)} and ${pt(x2, y2)}.`, a:m, x:`Gradient = change in y ÷ change in x = (${y2} − ${par(y)}) ÷ (${x2} − ${par(x)}) = ${y2 - y} ÷ ${dx} = ${sgn(m)}.` }; }
  const k = K.pick([2, 3]), px = K.int(-4, 4), py = K.int(-4, 4);
  return { d, k:"text", q:`Enlarge the point ${pt(px, py)} by scale factor ${k} with centre the origin. Type the new point like (3, -2).`, a:ans(k * px, k * py), best:pt(k * px, k * py), x:`From the origin, multiply both coordinates by ${k}: ${pt(k * px, k * py)}.` };
};

/* ================= SCIENCE ================= */
G["science/forces"] = (d, r) => { const K = kit(r);
  if (d === 1){ const s = K.int(2, 30), t = K.int(2, 20); return { d, k:"num", q:`A cyclist travels ${s * t} m in ${t} s. What is the average speed in m/s?`, a:s, x:`Speed = distance ÷ time = ${s * t} ÷ ${t} = ${s} m/s.` }; }
  if (d === 2){ if (r() < .5){ const s = K.int(2, 25), t = K.int(3, 40); return { d, k:"num", q:`A car moves at ${s} m/s for ${t} s. How far does it travel, in metres?`, a:s * t, x:`Distance = speed × time = ${s} × ${t} = ${s * t} m.` }; }
    const f1 = K.int(10, 90), f2 = K.int(10, 90); return { d, k:"num", q:`Two people push a box: one pushes right with ${f1} N, the other pushes left with ${f2} N. What is the size of the resultant force in N?`, a:Math.abs(f1 - f2), x:`Opposite forces subtract: ${Math.max(f1, f2)} − ${Math.min(f1, f2)} = ${Math.abs(f1 - f2)} N${f1 === f2 ? " (balanced)" : ", towards the " + (f1 > f2 ? "right" : "left")}.` }; }
  if (r() < .5){ const d1 = K.int(2, 12) * 10, t1 = K.int(2, 6), d2 = K.int(2, 12) * 10, t2 = K.int(2, 6);
    return { d, k:"num", q:`A runner covers ${d1} m in ${t1 * 10} s, then ${d2} m in ${t2 * 10} s. What is the average speed for the whole run in m/s? (2 decimal places)`, a:r2((d1 + d2) / ((t1 + t2) * 10)), tol:0.011, x:`Average speed = total distance ÷ total time = ${d1 + d2} ÷ ${(t1 + t2) * 10} = ${fmt((d1 + d2) / ((t1 + t2) * 10))} m/s. Don't just average the two speeds.` }; }
  const m = K.int(2, 60), g = 10; return { d, k:"num", q:`On Earth, g = 10 N/kg. What is the weight of a ${m} kg object, in newtons?`, a:m * g, x:`Weight = mass × gravitational field strength = ${m} × 10 = ${m * g} N. Mass is in kg; weight is a force in N.` };
};
G["science/matter"] = (d, r) => { const K = kit(r);
  if (d === 1){ const den = K.pick([0.5, 0.8, 1, 2, 2.5, 3, 7, 8, 11]), v = K.int(2, 20); return { d, k:"num", q:`A block has a mass of ${fmt(den * v)} g and a volume of ${v} cm³. What is its density in g/cm³?`, a:den, tol:0.01, x:`Density = mass ÷ volume = ${fmt(den * v)} ÷ ${v} = ${fmt(den)} g/cm³.` }; }
  if (d === 2){ const den = K.pick([0.9, 1.2, 2.7, 7.9, 19.3]), v = K.int(2, 15); return { d, k:"num", q:`A material has a density of ${den} g/cm³. What is the mass of ${v} cm³ of it, in grams?`, a:r2(den * v), tol:0.01, x:`Mass = density × volume = ${den} × ${v} = ${fmt(den * v)} g.` }; }
  const den = K.pick([0.6, 0.8, 0.92, 1.3, 2.7, 7.9]), v = K.int(2, 20), m = r2(den * v), floats = den < 1;
  return { d, k:"tf", q:`An object has mass ${m} g and volume ${v} cm³. True or false: it will float in water (density 1 g/cm³).`, a:floats, x:`Its density is ${m} ÷ ${v} = ${fmt(den)} g/cm³. That is ${floats ? "less" : "more"} than water's 1 g/cm³, so it ${floats ? "floats" : "sinks"}.` };
};
G["science/cells"] = (d, r) => { const K = kit(r);
  if (d === 1){ const e = K.pick([5, 10, 15]), o = K.pick([4, 10, 40, 100]); return { d, k:"num", q:`A microscope has a ×${e} eyepiece and a ×${o} objective lens. What is the total magnification?`, a:e * o, x:`Total magnification = eyepiece × objective = ${e} × ${o} = ×${e * o}.` }; }
  if (d === 2){ const act = K.pick([0.01, 0.02, 0.05, 0.1, 0.2]), mag = K.pick([40, 100, 400]); return { d, k:"num", q:`A cell is ${act} mm wide. Under a microscope it is magnified ×${mag}. How wide is the image, in mm?`, a:r2(act * mag), tol:0.01, x:`Image size = actual size × magnification = ${act} × ${mag} = ${fmt(act * mag)} mm.` }; }
  const mag = K.pick([100, 200, 400, 500]), img = K.int(5, 40); return { d, k:"num", q:`In a drawing magnified ×${mag}, a cell measures ${img} mm. What is its actual size in micrometres (µm)? (1 mm = 1000 µm)`, a:r2(img / mag * 1000), tol:0.01, x:`Actual = image ÷ magnification = ${img} ÷ ${mag} = ${img / mag} mm. × 1000 = ${fmt(img / mag * 1000)} µm.` };
};
G["science/energy"] = (d, r) => { const K = kit(r);
  const p = K.int(2, 9) * 10000;
  if (d === 1) return { d, k:"num", q:`Producers in a food chain store ${p} kJ of energy. About 10% passes to the primary consumers. How many kJ is that?`, a:p / 10, x:`10% of ${p} = ${p} ÷ 10 = ${p / 10} kJ. The rest is lost as heat, movement and waste.` };
  if (d === 2) return { d, k:"num", q:`Grass stores ${p} kJ. With 10% passed on at each step, how much energy reaches the secondary consumers (two steps up), in kJ?`, a:p / 100, x:`Step 1: ${p} ÷ 10 = ${p / 10} kJ. Step 2: ${p / 10} ÷ 10 = ${p / 100} kJ.` };
  const inJ = K.int(2, 10) * 100, useful = inJ * K.pick([0.1, 0.2, 0.25, 0.4, 0.6, 0.75]);
  return { d, k:"num", q:`A lamp takes in ${inJ} J of electrical energy and gives out ${useful} J of light. What is its efficiency as a percentage?`, a:r2(useful / inJ * 100), tol:0.01, x:`Efficiency = useful output ÷ total input × 100 = ${useful} ÷ ${inJ} × 100 = ${fmt(useful / inJ * 100)}%. The rest is wasted as heat.` };
};

/* ================= INDIVIDUALS AND SOCIETIES ================= */
G["ins/maps"] = (d, r) => { const K = kit(r);
  if (d === 1){ const sc = K.pick([1, 2, 5, 10]), cm = K.int(2, 12); return { d, k:"num", q:`On a map, 1 cm represents ${sc} km. Two towns are ${cm} cm apart on the map. How far apart are they in real life, in km?`, a:sc * cm, x:`Multiply the map distance by the scale: ${cm} × ${sc} = ${sc * cm} km.` }; }
  if (d === 2){ const n = K.pick([25000, 50000, 100000]), cm = K.int(2, 15); return { d, k:"num", q:`A map has a scale of 1 : ${n.toLocaleString("en-GB")}. Two points are ${cm} cm apart on the map. What is the real distance in km?`, a:r2(cm * n / 100000), tol:0.01, x:`${cm} × ${n.toLocaleString("en-GB")} = ${(cm * n).toLocaleString("en-GB")} cm. ÷ 100 000 (cm in a km) = ${fmt(cm * n / 100000)} km.` }; }
  const sc = K.pick([2, 4, 5]), km = sc * K.int(3, 20); return { d, k:"num", q:`On a map, 1 cm represents ${sc} km. A real road is ${km} km long. How long is it on the map, in cm?`, a:km / sc, x:`Divide the real distance by the scale: ${km} ÷ ${sc} = ${km / sc} cm.` };
};
G["ins/population"] = (d, r) => { const K = kit(r);
  if (d === 1){ const a = K.int(20, 200), den = K.int(5, 300); return { d, k:"num", q:`A region of ${a} km² has ${a * den} people. What is its population density (people per km²)?`, a:den, x:`Population density = people ÷ area = ${a * den} ÷ ${a} = ${den} people per km².` }; }
  if (d === 2){ const b = K.int(10, 40), dr = K.int(3, 15); return { d, k:"num", q:`A country's birth rate is ${b} per 1000 and its death rate is ${dr} per 1000. What is the natural increase per 1000 people? (use a minus sign if it falls)`, a:b - dr, x:`Natural increase = birth rate − death rate = ${b} − ${dr} = ${sgn(b - dr)} per 1000. Migration is not included.` }; }
  const p0 = K.int(2, 9) * 1000000, pct = K.pick([1, 2, 3, 5]), v = p0 * (1 + pct / 100);
  return { d, k:"num", q:`A city of ${p0.toLocaleString("en-GB")} people grows by ${pct}% in a year. What is its new population?`, a:v, x:`Multiply by 1.${String(pct).padStart(2, "0")}: ${p0.toLocaleString("en-GB")} × ${fmt(1 + pct / 100)} = ${v.toLocaleString("en-GB")}.` };
};
G["ins/economics"] = (d, r) => { const K = kit(r);
  if (d === 1){ const inc = K.int(5, 20) * 10, sp = K.int(1, inc / 10 - 1) * 10; return { d, k:"num", q:`Sara gets ${inc} AED pocket money a month and spends ${sp} AED. How much does she save each month?`, a:inc - sp, x:`Savings = income − spending = ${inc} − ${sp} = ${inc - sp} AED.` }; }
  if (d === 2){ const price = K.int(10, 60), cost = K.int(3, price - 2), n = K.int(10, 80); return { d, k:"num", q:`A student business sells ${n} bracelets at ${price} AED each. Each costs ${cost} AED to make. What is the total profit in AED?`, a:n * (price - cost), x:`Profit per item = ${price} − ${cost} = ${price - cost} AED. × ${n} = ${n * (price - cost)} AED.` }; }
  const save = K.int(2, 10) * 25, goal = save * K.int(4, 14); return { d, k:"num", q:`Omar saves ${save} AED every month. How many months until he has ${goal} AED for a new bike?`, a:goal / save, x:`${goal} ÷ ${save} = ${goal / save} months.` };
};

/* ================= FRENCH ================= */
const FR = ["zéro","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize"];
function frNum(n){
  if (n <= 16) return FR[n];
  if (n < 20) return "dix-" + FR[n - 10];
  const T = { 2:"vingt", 3:"trente", 4:"quarante", 5:"cinquante", 6:"soixante" };
  if (n < 70){ const t = Math.floor(n / 10), u = n % 10; return T[t] + (u === 0 ? "" : u === 1 ? " et un" : "-" + FR[u]); }
  if (n < 80){ const u = n - 60; return "soixante" + (u === 11 ? " et onze" : "-" + frNum(u)); }
  if (n === 80) return "quatre-vingts";
  if (n < 100) return "quatre-vingt-" + frNum(n - 80);
  return "cent";
}
G["french/numbers"] = (d, r) => { const K = kit(r);
  const n = d === 1 ? K.int(0, 20) : d === 2 ? K.int(21, 69) : K.int(70, 99), w = frNum(n);
  if (r() < .5) return K.mcq(`Which French word is the number ${n}?`, w, [frNum(Math.min(99, n + 1)), frNum(Math.max(0, n - 1)), frNum((n + 10) % 100), frNum((n + 7) % 100)], `${n} = ${w}.${n >= 70 ? " Remember: 70 = soixante-dix (60 + 10), 80 = quatre-vingts (4 × 20), 90 = quatre-vingt-dix (4 × 20 + 10)." : n > 20 && n % 10 === 1 ? " Numbers ending in 1 up to 61 use 'et un'." : ""}`, d);
  return { d, k:"num", q:`Type this French number in digits: ${w}`, a:n, x:`${w} = ${n}.${n >= 70 ? " Break it down: " + (n < 80 ? "soixante (60) + " + frNum(n - 60) : "quatre-vingt (80) + " + frNum(n - 80)) + "." : ""}` };
};

window.STUDY_GEN = { make(key, d, seed){ const g = G[key]; if (!g) return null; try { const t = g(d, rng(seed)); if (t && t.k === "mcq" && (t.a < 0 || t.o.length < 2)) return null; return t; } catch(e){ return null; } }, has: key => !!G[key], keys: Object.keys(G), rng };
})();
