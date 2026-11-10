/* Study Plus · Mathematics · harder tasks for every topic, plus two new MYP 2 topics.
   d = difficulty: 1 Core, 2 Extended, 3 Challenge. New tasks are added at the end so saved progress keeps its place. */
(function(S){
  const M = S.maths, T = id => M.topics.find(t => t.id === id);
  T("integers").tasks.push(
    { d:3, k:"num", q:"Work out (−2)⁴ − 3 × (−5)", a:31, x:"(−2)⁴ = 16 (an even power is positive). 3 × (−5) = −15. 16 − (−15) = 16 + 15 = 31." },
    { d:3, k:"num", q:"At 6 am it was −7 °C. The temperature rose 3 °C every hour. What was it at 11 am, in °C?", a:8, x:"6 am to 11 am is 5 hours, so it rose 5 × 3 = 15 °C. −7 + 15 = 8 °C." },
    { d:2, k:"num", q:"Find the missing number: −6 × ? = 42", a:-7, x:"42 ÷ −6 = −7. Check: −6 × −7 = +42 (same signs give a positive)." },
    { d:3, k:"mcq", q:"Which expression has the greatest value?", o:["−3 × (−4)","−20 ÷ 4","(−2)³","−1 − (−10)"], a:0, x:"Work each out: −3 × −4 = 12, −20 ÷ 4 = −5, (−2)³ = −8, −1 − (−10) = 9. The greatest is 12." }
  );
  T("fdp").tasks.push(
    { d:3, k:"num", q:"A 250 AED jacket is reduced by 20%, then the sale price is reduced by a further 10%. What is the final price in AED?", a:180, x:"Multiply by 0.8 then 0.9: 250 × 0.8 = 200, 200 × 0.9 = 180 AED. It is NOT a 30% discount (that would be 175 AED)." },
    { d:3, k:"text", q:"Work out 2⅓ × 1½. Give your answer as a mixed number like 3 1/4.", a:["3 1/2","7/2","3.5"], best:"3 1/2", x:"Change to improper fractions: 7/3 × 3/2 = 21/6 = 7/2 = 3½." },
    { d:2, k:"num", q:"Write 0.375 as a percentage (just the number).", a:37.5, tol:0.01, x:"Multiply by 100: 0.375 × 100 = 37.5%." },
    { d:3, k:"num", q:"After a 15% increase, a price is 92 AED. What was the original price in AED?", a:80, x:"New price = original × 1.15, so original = 92 ÷ 1.15 = 80 AED. (Taking 15% off 92 gives the wrong answer, 78.20.)" }
  );
  T("algebra").tasks.push(
    { d:3, k:"num", q:"Solve 3(2x − 1) = 2(x + 7). What is x? (decimal allowed)", a:4.25, tol:0.001, x:"Expand: 6x − 3 = 2x + 14. Subtract 2x: 4x − 3 = 14. Add 3: 4x = 17. x = 17 ÷ 4 = 4.25." },
    { d:2, k:"num", q:"Solve x/4 + 3 = 10. What is x?", a:28, x:"Subtract 3: x/4 = 7. Multiply by 4: x = 28." },
    { d:2, k:"mcq", q:"Factorise 6x + 15", o:["3(2x + 5)","6(x + 15)","3(2x + 15)","2(3x + 5)"], a:0, x:"The highest common factor of 6 and 15 is 3. 6x ÷ 3 = 2x and 15 ÷ 3 = 5, so 3(2x + 5). Check by expanding." },
    { d:3, k:"num", q:"A rectangle is x cm wide and (x + 5) cm long. Its perimeter is 46 cm. Find x.", a:9, x:"Perimeter = 2(x + x + 5) = 4x + 10 = 46. 4x = 36, so x = 9. The rectangle is 9 cm by 14 cm." }
  );
  T("ratio").tasks.push(
    { d:3, k:"num", q:"Share 360 AED in the ratio 2 : 3 : 4. How much is the largest share?", a:160, x:"2 + 3 + 4 = 9 parts. One part = 360 ÷ 9 = 40. Largest = 4 × 40 = 160 AED." },
    { d:3, k:"num", q:"4 workers build a wall in 6 days. How many days would 3 workers take at the same rate?", a:8, x:"This is inverse proportion: fewer workers take longer. Total work = 4 × 6 = 24 worker-days. 24 ÷ 3 = 8 days." },
    { d:2, k:"num", q:"Convert 72 km/h into m/s.", a:20, x:"72 km = 72 000 m and 1 hour = 3 600 s. 72 000 ÷ 3 600 = 20 m/s. (Shortcut: divide km/h by 3.6.)" },
    { d:3, k:"num", q:"Red and blue beads are in the ratio 5 : 3. There are 24 more red beads than blue. How many beads are there altogether?", a:96, x:"The difference is 5 − 3 = 2 parts = 24, so 1 part = 12. Total = 8 parts = 96 beads." }
  );
  T("geometry").tasks.push(
    { d:3, k:"num", q:"What is each interior angle of a regular hexagon, in degrees?", a:120, x:"Sum of interior angles = (n − 2) × 180 = 4 × 180 = 720°. Divide by 6 equal angles: 120°." },
    { d:3, k:"num", q:"Find the area of a trapezium with parallel sides 8 cm and 12 cm and height 5 cm (cm²).", a:50, x:"Area = ½ × (a + b) × h = ½ × (8 + 12) × 5 = ½ × 20 × 5 = 50 cm²." },
    { d:2, k:"num", q:"Find the circumference of a circle with diameter 10 cm (π = 3.14).", a:31.4, tol:0.05, x:"Circumference = π × d = 3.14 × 10 = 31.4 cm." },
    { d:3, k:"num", q:"In an isosceles triangle the angle between the two equal sides is 40°. What is each of the other two angles?", a:70, x:"The other two angles are equal: (180 − 40) ÷ 2 = 70° each." }
  );
  T("stats").tasks.push(
    { d:3, k:"num", q:"Two fair coins are flipped. What is the probability of two heads? Give a decimal.", a:0.25, tol:0.001, x:"Outcomes: HH, HT, TH, TT. One of the four is HH, so P = 1/4 = 0.25." },
    { d:3, k:"num", q:"The mean of 5 numbers is 14. A sixth number is added and the mean becomes 15. What is the sixth number?", a:20, x:"Old total = 5 × 14 = 70. New total = 6 × 15 = 90. Sixth number = 90 − 70 = 20." },
    { d:2, k:"mcq", q:"House prices include one very expensive mansion. Which average best shows a typical price?", o:["Mean","Median","Range","None of them"], a:1, x:"The median is not pulled up by an extreme value (an outlier), so it shows a typical price better than the mean." },
    { d:3, k:"num", q:"A spinner has P(red) = 0.3 and P(blue) = 0.45; the rest is green. It is spun 200 times. How many greens would you expect?", a:50, x:"P(green) = 1 − 0.3 − 0.45 = 0.25. Expected = 0.25 × 200 = 50." }
  );
  M.topics.push(
    { id:"sequences", title:"Sequences and patterns", strand:"MYP 2 · Algebra",
      learn:{ ideas:[
        "A sequence is a list of numbers that follows a rule. The term-to-term rule tells you how to get from one term to the next (e.g. +4).",
        "A linear (arithmetic) sequence goes up or down by the same amount each time.",
        "The nth term of a linear sequence is an + b: a is the common difference, b is what you add to fix the start.",
        "Geometric sequences multiply by the same number each time (2, 6, 18, 54 … ×3).",
        "Special sequences: square numbers 1, 4, 9, 16 …; Fibonacci-style sequences add the two previous terms."],
        example:"Find the nth term of 5, 8, 11, 14 …\nThe difference is +3, so start with 3n: 3, 6, 9, 12.\nEach term is 2 more, so nth term = 3n + 2. Check: n = 4 → 14 ✓" },
      tasks:[
        { d:1, k:"num", q:"Find the next term: 5, 9, 13, 17, …", a:21, x:"The rule is +4: 17 + 4 = 21." },
        { d:1, k:"num", q:"Find the next term: 40, 33, 26, 19, …", a:12, x:"The rule is −7: 19 − 7 = 12." },
        { d:2, k:"mcq", q:"What is the nth term of 3, 7, 11, 15, …?", o:["4n − 1","n + 4","4n + 3","3n + 4"], a:0, x:"The difference is 4, so 4n gives 4, 8, 12, 16. Each term is 1 less, so nth term = 4n − 1." },
        { d:2, k:"num", q:"A sequence has nth term 5n − 2. What is the 10th term?", a:48, x:"Substitute n = 10: 5 × 10 − 2 = 48." },
        { d:2, k:"num", q:"Find the next term: 2, 6, 18, 54, …", a:162, x:"This is geometric: × 3 each time. 54 × 3 = 162." },
        { d:2, k:"tf", q:"True or false: 100 is a term in the sequence with nth term 3n + 1.", a:true, x:"Solve 3n + 1 = 100: 3n = 99, n = 33. n is a whole number, so 100 is the 33rd term." },
        { d:3, k:"num", q:"A sequence has nth term 7n + 4. Which term (value of n) is equal to 74?", a:10, x:"7n + 4 = 74 → 7n = 70 → n = 10. So 74 is the 10th term." },
        { d:3, k:"mcq", q:"What is the nth term of 20, 17, 14, 11, …?", o:["23 − 3n","3n + 17","23 − n","20 − 3n"], a:0, x:"The difference is −3, so −3n gives −3, −6, −9 … Add 23 to get 20, 17, 14: nth term = 23 − 3n." },
        { d:3, k:"num", q:"Find the next term: 1, 4, 9, 16, 25, …", a:36, x:"These are square numbers: 1², 2², 3², 4², 5², so the next is 6² = 36." },
        { d:3, k:"num", q:"Each term is the sum of the two before it: 2, 3, 5, 8, 13, … What comes next?", a:21, x:"8 + 13 = 21. This is a Fibonacci-style sequence." }
      ] },
    { id:"transform", title:"Coordinates and transformations", strand:"MYP 2 · Geometry",
      learn:{ ideas:[
        "Coordinates are written (x, y): across first, then up. The four quadrants are numbered anticlockwise from the top right.",
        "Translation slides a shape: (x, y) moved 3 right and 2 down becomes (x + 3, y − 2).",
        "Reflection in the x-axis: (x, y) → (x, −y). Reflection in the y-axis: (x, y) → (−x, y).",
        "Rotation 90° clockwise about the origin: (x, y) → (y, −x).",
        "Enlargement by scale factor k multiplies lengths by k (and areas by k²). Midpoint of two points = average of the x's and of the y's."],
        example:"Reflect (3, −2) in the y-axis.\nThe y-coordinate stays, the x-coordinate changes sign: (−3, −2)." },
      tasks:[
        { d:1, k:"mcq", q:"In which quadrant is the point (−3, 4)?", o:["First","Second","Third","Fourth"], a:1, x:"Negative x (left) and positive y (up) is the top-left: the second quadrant." },
        { d:1, k:"num", q:"What is the x-coordinate of the midpoint of (2, 4) and (8, 10)?", a:5, x:"Average the x-coordinates: (2 + 8) ÷ 2 = 5. (The midpoint is (5, 7).)" },
        { d:2, k:"text", q:"Translate (2, 5) by 3 right and 4 down. Write the new point like (5,1).", a:["(5,1)","5,1"], best:"(5, 1)", x:"Right 3: x = 2 + 3 = 5. Down 4: y = 5 − 4 = 1. New point (5, 1)." },
        { d:2, k:"text", q:"Reflect (4, 3) in the x-axis. Write the new point like (1,-2).", a:["(4,-3)","4,-3"], best:"(4, −3)", x:"Reflecting in the x-axis keeps x and changes the sign of y: (4, −3)." },
        { d:2, k:"text", q:"Reflect (−2, 5) in the y-axis. Write the new point like (1,2).", a:["(2,5)","2,5"], best:"(2, 5)", x:"Reflecting in the y-axis changes the sign of x and keeps y: (2, 5)." },
        { d:2, k:"mcq", q:"Which transformation changes the size of a shape?", o:["Translation","Reflection","Rotation","Enlargement"], a:3, x:"Only enlargement changes size. Translations, reflections and rotations keep the shape congruent (same size and shape)." },
        { d:2, k:"num", q:"A shape with perimeter 12 cm is enlarged by scale factor 3. What is the new perimeter in cm?", a:36, x:"Lengths are multiplied by the scale factor: 12 × 3 = 36 cm." },
        { d:3, k:"mcq", q:"(3, 1) is rotated 90° clockwise about the origin. Where does it go?", o:["(1, −3)","(−1, 3)","(−3, 1)","(3, −1)"], a:0, x:"For 90° clockwise, (x, y) → (y, −x): (3, 1) → (1, −3). Sketch it to check: it moves from the first quadrant to the fourth." },
        { d:3, k:"num", q:"A square of area 4 cm² is enlarged by scale factor 3. What is the new area in cm²?", a:36, x:"The side 2 cm becomes 6 cm, so the area is 36 cm². Areas multiply by the scale factor squared: 4 × 3² = 36." },
        { d:3, k:"num", q:"How far apart are the points (1, 2) and (4, 6)?", a:5, x:"Across 3, up 4. Using Pythagoras: √(3² + 4²) = √25 = 5 units." }
      ] }
  );
})(window.STUDY);
