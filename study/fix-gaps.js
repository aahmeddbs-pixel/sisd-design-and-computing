/* Study Plus · targeted practice from student reports (auto update, 23 Nov 2026).
   Built from the "What to improve" lists in the Study Plus reports of 21–23 Nov:
   Forces and motion (multiplying vs dividing: weight, distance, work done, Hooke's law; mass vs weight),
   Probability basics (adding balls to reach a probability; P = count of that colour ÷ total),
   Elements, compounds and mixtures (spotting mixtures; choosing a separation method),
   Punctuation (plural and irregular-plural possession; semicolons in lists).
   Adds worked examples (learn.more) and new questions to the END of each pool.
   Loaded after study/expand.js so every earlier pool position stays the same (pools are append-only). */
(function(){
const S = window.STUDY; if (!S) return;
const topic = (subj, id) => S[subj] && (S[subj].topics || []).find(t => t && t.id === id);
const ex = (q, steps, a) => ({ q, steps, a });
const more = (subj, id, L) => { const T = topic(subj, id); if (!T) return; T.learn = T.learn || {}; T.learn.more = (T.learn.more || []).concat(L); };
const pool = (subj, id, L) => { const T = topic(subj, id); if (!T) return; T.pool = T.pool || []; const seen = new Set(T.pool.concat(T.tasks || []).map(q => q && q.q)); L.forEach(q => { if (!seen.has(q.q)) { T.pool.push(q); seen.add(q.q); } }); };
const m = (d, q, right, wrong, x) => ({ d, k:"mcq", q, o:[right].concat(wrong), a:0, x });
const n = (d, q, a, x) => ({ d, k:"num", q, a, x });
const tf = (d, q, a, x) => ({ d, k:"tf", q, a, x });

/* ---------- Science · Forces and motion ---------- */
more("science", "forces", [
  ex("Multiply or divide? How do you choose in a physics calculation?", ["Write the formula first, in words: e.g. weight = mass × g.", "Put the numbers in under the words.", "Check the size of your answer: a 45 kg person must weigh MORE than 45 N on Earth (g = 10), so 4.5 N cannot be right.", "If the answer looks too small or too big, you have probably divided when you should multiply."], "Formula in words → numbers in → sense check"),
  ex("What is the weight of a 45 kg student on Earth (g = 10 N/kg)?", ["Formula: weight = mass × gravitational field strength.", "Weight = 45 × 10.", "Weight = 450 N.", "Sense check: on Earth the weight in N is about 10 times the mass in kg."], "450 N"),
  ex("A train moves at 25 m/s for 40 s. How far does it travel?", ["Formula triangle: distance on top, speed × time underneath.", "Distance = speed × time.", "Distance = 25 × 40 = 1000 m.", "Sense check: 25 metres EVERY second for 40 seconds is a long way, not less than 1 m."], "1000 m"),
  ex("A 20 N force pushes a box 5 m. How much work is done?", ["Formula: work done (J) = force (N) × distance (m).", "Work done = 20 × 5.", "Work done = 100 J.", "Never add or divide here: force and distance are multiplied."], "100 J"),
  ex("A spring stretches 2 cm with 4 N. How far with 10 N (Hooke's law)?", ["Hooke's law: extension is proportional to force.", "Find the stretch for 1 N: 2 ÷ 4 = 0.5 cm per newton.", "Multiply by the new force: 0.5 × 10 = 5 cm.", "Sense check: more force (10 N > 4 N) must give MORE stretch than 2 cm."], "5 cm"),
  ex("Does an astronaut's mass change on the Moon?", ["Mass = the amount of matter in you, measured in kg. It does not change from place to place.", "Weight = the pull of gravity on that mass, measured in N.", "The Moon's gravity is weaker (about 1.6 N/kg), so the WEIGHT is smaller.", "So: same mass, smaller weight."], "Mass stays the same; weight goes down")
]);
pool("science", "forces", [
  n(1, "What is the weight in N of a 60 kg person on Earth? (g = 10 N/kg)", 600, "Weight = mass × g = 60 × 10 = 600 N. Multiply: the weight in N is bigger than the mass in kg on Earth."),
  n(1, "What is the weight in N of a 3 kg bag of rice on Earth? (g = 10 N/kg)", 30, "Weight = mass × g = 3 × 10 = 30 N."),
  n(2, "A car travels at 20 m/s for 15 s. How far does it go, in metres?", 300, "Distance = speed × time = 20 × 15 = 300 m."),
  n(2, "A runner moves at 8 m/s for 50 s. How far, in metres?", 400, "Distance = speed × time = 8 × 50 = 400 m."),
  n(2, "A 30 N force pushes a trolley 4 m. How much work is done, in joules?", 120, "Work done = force × distance = 30 × 4 = 120 J."),
  n(2, "A 15 N force lifts a bag 2 m. How much work is done, in joules?", 30, "Work done = force × distance = 15 × 2 = 30 J."),
  n(3, "A spring stretches 3 cm with a 6 N load. Assuming it obeys Hooke's law, how far does it stretch with 10 N, in cm?", 5, "3 ÷ 6 = 0.5 cm per newton. 0.5 × 10 = 5 cm."),
  n(3, "A spring stretches 4 cm with a 2 N load. Assuming it obeys Hooke's law, how far does it stretch with 5 N, in cm?", 10, "4 ÷ 2 = 2 cm per newton. 2 × 5 = 10 cm."),
  n(3, "On the Moon g = 1.6 N/kg. What does a 50 kg astronaut weigh there, in N?", 80, "Weight = mass × g = 50 × 1.6 = 80 N. Their mass is still 50 kg."),
  tf(1, "True or false: Your mass in kg is the same on Earth, on the Moon and in space.", true, "Mass is the amount of matter and never changes with place. Only weight (the pull of gravity) changes."),
  tf(2, "True or false: A 10 kg box weighs 1 N on Earth (g = 10 N/kg).", false, "Weight = 10 × 10 = 100 N. Dividing (10 ÷ 10 = 1) is the common mistake."),
  m(2, "Which formula gives distance travelled?", "distance = speed × time", ["distance = speed ÷ time", "distance = time ÷ speed", "distance = speed + time"], "From speed = distance ÷ time, multiply both sides by time: distance = speed × time.")
]);

/* ---------- Maths · Probability basics ---------- */
more("maths", "probbasics", [
  ex("A bag has 8 orange, 1 purple and 4 black counters. Find P(orange).", ["Total counters = 8 + 1 + 4 = 13.", "Number of orange counters = 8 (the top number is how many of THAT colour).", "P(orange) = 8/13.", "Check: 1/13 would be the chance of one particular counter, not of any orange one."], "8/13"),
  ex("A bag has 4 red and 5 blue balls. How many green balls must be added so that P(red) = 1/5?", ["The number of red balls does not change: still 4.", "P(red) = 1/5 means red is 1 out of every 5 balls, so the total must be 5 × 4 = 20.", "There are 4 + 5 = 9 balls now.", "Add 20 − 9 = 11 green balls. Check: 4/20 = 1/5 ✓"], "11 green balls")
]);
pool("maths", "probbasics", [
  { d:1, k:"num", q:"A bag has 5 yellow, 2 white and 3 red counters. One is taken at random. What is P(yellow)?\n(Give your answer as a fraction, a decimal or a percentage.)", a:0.5, tol:0.0015, prob:true, show:"1/2 = 0.5", x:"Total = 5 + 2 + 3 = 10. P(yellow) = 5/10 = 1/2." },
  { d:2, k:"num", q:"A bag has 7 green, 2 blue and 3 black marbles. One is taken at random. What is P(green)?\n(Give your answer as a fraction, a decimal or a percentage.)", a:Math.round(7 / 12 * 1e6) / 1e6, tol:0.0015, prob:true, show:"7/12", x:"Total = 7 + 2 + 3 = 12. There are 7 green, so P(green) = 7/12." },
  n(3, "A bag has 2 red and 3 blue balls. How many green balls must be added so that P(red) = 1/4?", 3, "Red stays at 2, so the total must be 4 × 2 = 8. There are 5 now, so add 8 − 5 = 3. Check: 2/8 = 1/4 ✓"),
  n(3, "A bag has 3 red and 2 blue balls. How many green balls must be added so that P(red) = 1/3?", 4, "Red stays at 3, so the total must be 3 × 3 = 9. There are 5 now, so add 9 − 5 = 4. Check: 3/9 = 1/3 ✓"),
  n(3, "A bag has 6 red and 4 blue balls. How many green balls must be added so that P(red) = 1/5?", 20, "Red stays at 6, so the total must be 5 × 6 = 30. There are 10 now, so add 30 − 10 = 20. Check: 6/30 = 1/5 ✓")
]);

/* ---------- Science · Elements, compounds and mixtures ---------- */
more("science", "mixtures", [
  ex("How do you tell a mixture from a compound?", ["Mixture: two or more substances NOT chemically joined, e.g. air, sea water, sand and water.", "Compound: elements chemically joined in fixed amounts, with a formula, e.g. water H₂O, carbon dioxide CO₂.", "Ask: can it be separated by a physical method (filtering, magnet, distilling)? Then it is a mixture.", "Air is a mixture of nitrogen, oxygen, argon and carbon dioxide; water is a compound."], "Not joined = mixture; joined with a formula = compound"),
  ex("Which separation method should you choose?", ["Insoluble solid + liquid (sand + water) → filtration.", "Dissolved solid from a solution (salt from salt water) → evaporation or crystallisation.", "Pure liquid from a solution (water from sea water) → distillation.", "Different dyes or colours (black ink) → chromatography. Magnetic metal (iron) → magnet."], "Match the mixture to the method")
]);
pool("science", "mixtures", [
  m(1, "Which of these is a mixture?", "Sea water", ["Water", "Carbon dioxide", "Oxygen"], "Sea water is water with salts dissolved in it, not chemically joined. Water and carbon dioxide are compounds; oxygen is an element."),
  m(1, "Which method separates chalk powder from water?", "Filtration", ["Chromatography", "Evaporation", "A magnet"], "Chalk is insoluble, so the filter paper traps it (the residue) and the water passes through (the filtrate)."),
  m(2, "Which method separates the coloured inks in a felt-tip pen?", "Chromatography", ["Filtration", "Distillation", "A magnet"], "Different dyes travel different distances up the paper, so they separate into spots."),
  m(2, "Which method gets salt crystals from salt water?", "Evaporation (crystallisation)", ["Filtration", "Chromatography", "A magnet"], "Salt is dissolved, so it passes through a filter. Heating evaporates the water and leaves the salt."),
  tf(2, "True or false: Air is a compound because it contains oxygen and nitrogen.", false, "Air is a mixture: the gases are not chemically joined and have no fixed formula."),
  m(3, "Iron filings, sand and salt are mixed. What is the best order to separate them?", "Magnet → add water and filter → evaporate", ["Filter → magnet → chromatography", "Evaporate → filter → magnet", "Chromatography → magnet → filter"], "The magnet removes iron; water dissolves the salt, filtering removes sand; evaporating the filtrate leaves salt.")
]);

/* ---------- English · Punctuation ---------- */
more("english", "punctuation", [
  ex("Where does the apostrophe go: the girls changing room (several girls)?", ["Write the owner word first: girls.", "Does it already end in s? Yes (a plural ending in s).", "Then just add an apostrophe after the s: girls'.", "→ the girls' changing room."], "the girls' changing room"),
  ex("Where does the apostrophe go: the childrens toys?", ["Write the owner word: children (already plural, with no s).", "Plurals that don't end in s add 's, just like one owner.", "children + 's = children's.", "→ the children's toys. (Same for men's, women's, people's.)"], "the children's toys"),
  ex("How do you use semicolons in a list?", ["Use them when the list items already contain commas.", "Keep the commas INSIDE each item: Paris, France.", "Put a semicolon BETWEEN the items: Paris, France; Cairo, Egypt.", "→ I have visited Paris, France; Cairo, Egypt; and Tokyo, Japan."], "Commas inside items, semicolons between them")
]);
pool("english", "punctuation", [
  m(1, "Several boys share one team. Which is correct?", "the boys' team", ["the boy's team", "the boys team", "the boys's team"], "Plural ending in s: add the apostrophe after the s."),
  m(1, "One teacher owns a car. Which is correct?", "the teacher's car", ["the teachers' car", "the teachers car", "the teacher car's"], "One owner: add 's."),
  m(2, "Which is correct for the coats belonging to the women?", "the women's coats", ["the womens' coats", "the women' coats", "the womens coats"], "'Women' is already plural with no s, so add 's."),
  m(2, "Which is correct for the ideas of the people?", "the people's ideas", ["the peoples' ideas", "the people' ideas", "the peoples ideas"], "'People' is plural with no s, so add 's."),
  m(3, "Which sentence uses semicolons in a list correctly?", "The finalists came from Dubai, UAE; Muscat, Oman; and Doha, Qatar.", ["The finalists came from Dubai; UAE, Muscat; Oman, Doha; Qatar.", "The finalists came from; Dubai, UAE, Muscat, Oman and Doha, Qatar.", "The finalists came from Dubai UAE, Muscat Oman; Doha Qatar."], "Commas stay inside each place (city, country); semicolons separate the places."),
  tf(2, "True or false: 'the childrens' books' is correct.", false, "'Children' is already plural without an s, so it is 'the children's books'.")
]);
})();
