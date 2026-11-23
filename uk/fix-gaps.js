/* Study Plus UK · targeted practice from student reports (auto update, 23 Nov 2026).
   Built from the "What to improve" lists in the Year 8 Term 1 Revision reports of 20–22 Nov:
   Digestion and absorption (what each enzyme makes; what the large intestine absorbs),
   Calculations with density (volume = mass ÷ density; g/cm³ ↔ kg/m³).
   Adds worked examples (learn.more) and new questions to the END of each pool.
   Loaded after study/expand.js so every earlier pool position stays the same (pools are append-only). */
(function(){
const U = window.UK; if (!U) return;
const topic = (subj, id) => U[subj] && (U[subj].topics || []).find(t => t && t.id === id);
const ex = (q, steps, a) => ({ q, steps, a });
const more = (subj, id, L) => { const T = topic(subj, id); if (!T) return; T.learn = T.learn || {}; T.learn.more = (T.learn.more || []).concat(L); };
const pool = (subj, id, L) => { const T = topic(subj, id); if (!T) return; T.pool = T.pool || []; const seen = new Set(T.pool.concat(T.tasks || []).map(q => q && q.q)); L.forEach(q => { if (!seen.has(q.q)) { T.pool.push(q); seen.add(q.q); } }); };
const m = (d, q, right, wrong, x) => ({ d, k:"mcq", q, o:[right].concat(wrong), a:0, x });
const n = (d, q, a, x, tol) => (tol ? { d, k:"num", q, a, x, tol } : { d, k:"num", q, a, x });
const tf = (d, q, a, x) => ({ d, k:"tf", q, a, x });

/* ---------- Year 8 Science revision · Digestion and absorption ---------- */
more("y8revscience", "digestion", [
  ex("Which enzyme makes which product?", ["Amylase breaks starch → sugars (glucose). Made in the salivary glands, pancreas and small intestine.", "Protease breaks protein → amino acids. Made in the stomach, pancreas and small intestine.", "Lipase breaks fats (lipids) → fatty acids and glycerol. Made in the pancreas and small intestine.", "Bile is NOT an enzyme: it breaks fat into small droplets (emulsifies) so lipase works faster."], "Starch → sugars; protein → amino acids; fat → fatty acids + glycerol"),
  ex("What happens in the large intestine?", ["Most digested food has already been absorbed in the small intestine.", "The large intestine absorbs WATER from the leftover material.", "This turns the waste into solid faeces.", "Faeces are stored in the rectum and leave through the anus (egestion)."], "The large intestine mainly absorbs water")
]);
pool("y8revscience", "digestion", [
  m(1, "What does protease break proteins into?", "Amino acids", ["Fatty acids", "Sugars", "Glycerol only"], "Protease → amino acids. Remember: PROTein → amino acids (the building blocks of protein)."),
  m(1, "What does lipase break fats into?", "Fatty acids and glycerol", ["Amino acids", "Sugars", "Starch"], "Lip- means fat: lipase → fatty acids and glycerol."),
  m(1, "What does amylase break starch into?", "Sugars", ["Amino acids", "Fatty acids", "Protein"], "Amylase → sugars (glucose). This is why bread tastes sweet if you chew it for a long time."),
  m(1, "What does the large intestine mainly absorb?", "Water", ["Amino acids", "Glucose", "Fatty acids"], "Food molecules are absorbed in the small intestine; the large intestine takes back water."),
  tf(2, "True or false: Lipase breaks fats into amino acids.", false, "Lipase makes fatty acids and glycerol. Amino acids come from protein, made by protease."),
  tf(2, "True or false: Protease breaks proteins into amino acids.", true, "Correct: protein → amino acids."),
  tf(2, "True or false: The large intestine mainly absorbs water.", true, "Correct: the small intestine absorbs digested food; the large intestine absorbs water."),
  m(2, "Match the enzyme to its product: protease →", "Amino acids", ["Fatty acids and glycerol", "Sugars", "Bile"], "Protease breaks protein into amino acids."),
  m(3, "A meal of chicken (protein) and chips fried in oil (starch and fat) is digested. Which set of products is made?", "Amino acids, sugars, fatty acids and glycerol", ["Only sugars", "Amino acids and starch", "Fatty acids and protein"], "Protein → amino acids; starch → sugars; fat → fatty acids and glycerol.")
]);

/* ---------- Year 8 Science revision · Calculations with density ---------- */
more("y8revscience", "density", [
  ex("A metal has a density of 2.7 g/cm³. What volume does 8.1 g of it have?", ["Write the formula you need: volume = mass ÷ density.", "Put in the numbers: volume = 8.1 ÷ 2.7.", "Volume = 3 cm³.", "Sense check: the mass is only 3 times the density, so the volume is small. Multiplying (8.1 × 2.7 = 21.87) gives the wrong formula."], "3 cm³"),
  ex("How do you change g/cm³ into kg/m³?", ["1 m³ = 100 × 100 × 100 = 1 000 000 cm³.", "1 kg = 1000 g.", "So 1 g/cm³ = 1 000 000 g per m³ = 1000 kg/m³.", "Rule: g/cm³ × 1000 = kg/m³. Water: 1 g/cm³ = 1000 kg/m³."], "Multiply by 1000")
]);
pool("y8revscience", "density", [
  n(1, "A metal has a density of 2.7 g/cm³. What volume does 5.4 g of it have, in cm³?", 2, "Volume = mass ÷ density = 5.4 ÷ 2.7 = 2 cm³."),
  n(2, "A metal has a density of 8 g/cm³. What volume does 40 g of it have, in cm³?", 5, "Volume = mass ÷ density = 40 ÷ 8 = 5 cm³."),
  n(2, "A liquid has a density of 1.2 g/cm³. What volume does 36 g of it have, in cm³?", 30, "Volume = mass ÷ density = 36 ÷ 1.2 = 30 cm³."),
  n(2, "Convert 2.5 g/cm³ into kg/m³.", 2500, "Multiply by 1000: 2.5 × 1000 = 2500 kg/m³."),
  n(3, "Convert 7800 kg/m³ (steel) into g/cm³.", 7.8, "Divide by 1000: 7800 ÷ 1000 = 7.8 g/cm³."),
  m(1, "1 g/cm³ is equal to…", "1000 kg/m³", ["1 kg/m³", "100 kg/m³", "0.001 kg/m³"], "1 g/cm³ × 1000 = 1000 kg/m³ (the density of water)."),
  m(2, "Which formula gives the volume?", "volume = mass ÷ density", ["volume = mass × density", "volume = density ÷ mass", "volume = mass + density"], "Cover V in the triangle: m over ρ, so V = m ÷ ρ.")
]);
})();
