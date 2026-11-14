/* Study Plus · Mathematics · question bank for new challenge sets (d: 1 Core, 2 Extended, 3 Challenge).
   Maths also gets brand-new generated questions for every set (study/gen.js), so this bank adds the reasoning questions. */
(function(S){
  const P = (id, L) => { const t = S.maths && S.maths.topics.find(x => x.id === id); if (t) t.pool = (t.pool || []).concat(L); };
  P("integers", [
    { d:1, k:"tf", q:"True or false: −10 is greater than −2.", a:false, x:"On a number line −2 is to the right of −10, so −2 is greater." },
    { d:2, k:"mcq", q:"Which calculation gives a positive answer?", o:["(−6) × (−3)","(−6) × 3","6 × (−3)","−6 − 3"], a:0, x:"Negative × negative = positive: 18. The others give −18, −18 and −9." },
    { d:2, k:"mcq", q:"Put in order, smallest first: 3, −7, 0, −2, 5", o:["−7, −2, 0, 3, 5","−2, −7, 0, 3, 5","0, −2, −7, 3, 5","−7, 0, −2, 3, 5"], a:0, x:"The most negative number is the smallest." },
    { d:3, k:"mcq", q:"Ali says (−3)² = −9. Is he right?", o:["No: (−3)² = (−3) × (−3) = 9","Yes","No: it is −6","No: it is 6"], a:0, x:"The bracket means the whole −3 is squared. −3² without brackets would be −9." },
    { d:3, k:"mcq", q:"Which expression has the smallest value?", o:["(−2)³","(−2)²","−2 × (−2)","−2 + 2"], a:0, x:"(−2)³ = −8, (−2)² = 4, −2 × −2 = 4, −2 + 2 = 0. The smallest is −8." }
  ]);
  P("fdp", [
    { d:1, k:"mcq", q:"Which is equal to 0.25?", o:["1/4","1/25","2/5","25"], a:0, x:"0.25 = 25/100 = 1/4." },
    { d:2, k:"mcq", q:"Which is the largest?", o:["0.7","2/3","65%","0.07"], a:0, x:"Convert: 0.7, 0.666…, 0.65, 0.07. The largest is 0.7." },
    { d:2, k:"text", q:"Simplify 18/24 fully.", a:["3/4"], x:"Divide top and bottom by the HCF, 6: 18 ÷ 6 = 3 and 24 ÷ 6 = 4." },
    { d:3, k:"mcq", q:"A shop adds 20% to a price, then takes 20% off. Compared with the original price, the final price is…", o:["4% lower","The same","4% higher","20% lower"], a:0, x:"× 1.2 × 0.8 = × 0.96, so it is 4% lower. Percentages of different amounts don't cancel." },
    { d:3, k:"num", q:"Work out 3/4 ÷ 3/8.", a:2, x:"Dividing by a fraction = multiplying by its reciprocal: 3/4 × 8/3 = 24/12 = 2." }
  ]);
  P("algebra", [
    { d:1, k:"mcq", q:"Simplify 3a + 5a − 2a", o:["6a","10a","6","8a − 2"], a:0, x:"Collect like terms: 3 + 5 − 2 = 6, so 6a." },
    { d:2, k:"mcq", q:"Simplify 4x + 3y − x + 2y", o:["3x + 5y","5x + 5y","3x + y","8xy"], a:0, x:"x terms: 4x − x = 3x. y terms: 3y + 2y = 5y." },
    { d:2, k:"mcq", q:"Which expression means 'double n, then add 7'?", o:["2n + 7","2(n + 7)","n² + 7","7n + 2"], a:0, x:"Double n = 2n, then add 7." },
    { d:3, k:"mcq", q:"Factorise fully: 12x² + 8x", o:["4x(3x + 2)","4(3x² + 2x)","2x(6x + 4)","x(12x + 8)"], a:0, x:"The HCF of 12x² and 8x is 4x. Check: 4x × 3x = 12x², 4x × 2 = 8x." },
    { d:3, k:"mcq", q:"Expand and simplify 3(x + 2) − 2(x − 4)", o:["x + 14","x − 2","5x + 14","x + 2"], a:0, x:"3x + 6 − 2x + 8 = x + 14. Careful: −2 × −4 = +8." }
  ]);
  P("ratio", [
    { d:1, k:"mcq", q:"A recipe uses 2 cups of flour for every 1 cup of sugar. What is the ratio of flour to sugar?", o:["2 : 1","1 : 2","3 : 1","2 : 3"], a:0, x:"Flour comes first: 2 : 1." },
    { d:2, k:"mcq", q:"Which is better value?", o:["500 g for 12 AED","250 g for 7 AED","Both the same","Can't tell"], a:0, x:"500 g for 12 AED = 2.40 AED per 100 g. 250 g for 7 AED = 2.80 AED per 100 g." },
    { d:2, k:"mcq", q:"A map has scale 1 : 1000. What real distance is 5 cm on the map?", o:["50 m","5 m","500 m","5 km"], a:0, x:"5 × 1000 = 5000 cm = 50 m." },
    { d:3, k:"mcq", q:"If y is directly proportional to x and y = 12 when x = 3, what is y when x = 10?", o:["40","36","30","4"], a:0, x:"y = 4x (because 12 ÷ 3 = 4). When x = 10, y = 40." },
    { d:3, k:"mcq", q:"Two numbers are in the ratio 3 : 5 and their sum is 64. What is the larger number?", o:["40","24","32","35"], a:0, x:"8 parts = 64, so 1 part = 8. Larger = 5 × 8 = 40." }
  ]);
  P("geometry", [
    { d:1, k:"mcq", q:"What do the angles around a point add up to?", o:["360°","180°","90°","270°"], a:0, x:"A full turn around a point is 360°." },
    { d:2, k:"mcq", q:"Vertically opposite angles are…", o:["Equal","Add to 180°","Add to 90°","Always 45°"], a:0, x:"Where two lines cross, opposite angles are equal." },
    { d:2, k:"mcq", q:"Alternate angles on parallel lines are…", o:["Equal (Z-angles)","Add to 180°","Add to 360°","Always right angles"], a:0, x:"Alternate angles make a Z shape and are equal. Co-interior (C-shape) angles add to 180°." },
    { d:3, k:"mcq", q:"Two squares have sides 3 cm and 6 cm. How do their areas compare?", o:["The larger area is 4 times the smaller","2 times","3 times","The same"], a:0, x:"9 cm² and 36 cm². Doubling the side length multiplies the area by 2² = 4." },
    { d:3, k:"num", q:"A cuboid measures 4 cm × 5 cm × 6 cm. What is its surface area in cm²?", a:148, x:"2(4×5 + 4×6 + 5×6) = 2(20 + 24 + 30) = 2 × 74 = 148 cm²." }
  ]);
  P("stats", [
    { d:1, k:"mcq", q:"Which average is the most common value?", o:["Mode","Mean","Median","Range"], a:0, x:"The mode is the value that appears most often." },
    { d:2, k:"mcq", q:"An event has a probability of 0. It is…", o:["Impossible","Certain","Even chance","Likely"], a:0, x:"Probabilities run from 0 (impossible) to 1 (certain)." },
    { d:2, k:"mcq", q:"Which chart is best for showing how temperature changes over a day?", o:["Line graph","Pie chart","Venn diagram","Tally chart"], a:0, x:"Line graphs show change over time." },
    { d:3, k:"mcq", q:"Salaries in a small company: 4 people earn 5 000 AED and the boss earns 80 000 AED. Which average best represents a typical worker?", o:["Median","Mean","Range","None"], a:0, x:"The mean (20 000) is dragged up by one extreme value. The median (5 000) is more typical." },
    { d:3, k:"mcq", q:"P(rain) = 0.35. What is P(not rain)?", o:["0.65","0.35","1.35","0.5"], a:0, x:"P(not A) = 1 − P(A) = 1 − 0.35 = 0.65." }
  ]);
  P("sequences", [
    { d:1, k:"tf", q:"True or false: 2, 4, 8, 16 is an arithmetic (linear) sequence.", a:false, x:"The terms are multiplied by 2 each time (geometric). Linear sequences add the same amount each time." },
    { d:2, k:"mcq", q:"Which sequence has the nth term 4n − 1?", o:["3, 7, 11, 15","4, 8, 12, 16","−1, 3, 7, 11","5, 9, 13, 17"], a:0, x:"n = 1: 4 − 1 = 3; n = 2: 8 − 1 = 7… so 3, 7, 11, 15." },
    { d:2, k:"mcq", q:"What are the next two square numbers after 49?", o:["64, 81","56, 63","50, 51","64, 72"], a:0, x:"7² = 49, so 8² = 64 and 9² = 81." },
    { d:3, k:"mcq", q:"Is 100 a term in the sequence 3n + 2?", o:["No, because 3n = 98 and 98 isn't a multiple of 3","Yes, the 33rd term","Yes, the 34th term","Yes, the 98th term"], a:0, x:"3n + 2 = 100 gives n = 32.67, not a whole number, so 100 is not a term." },
    { d:3, k:"mcq", q:"What is the next term of the Fibonacci-style sequence 2, 3, 5, 8, 13, …?", o:["21","18","26","20"], a:0, x:"Each term is the sum of the two before: 8 + 13 = 21." }
  ]);
  P("transform", [
    { d:1, k:"mcq", q:"Which quadrant is (−3, 4) in?", o:["Top left (2nd)","Top right (1st)","Bottom left (3rd)","Bottom right (4th)"], a:0, x:"Negative x (left), positive y (up): top left." },
    { d:2, k:"mcq", q:"A triangle is reflected in a mirror line. Which is true about the image?", o:["It is congruent: same size and shape","It is bigger","It is smaller","Its angles change"], a:0, x:"Reflections, rotations and translations keep shapes congruent. Only enlargement changes size." },
    { d:2, k:"mcq", q:"How many lines of symmetry does a regular hexagon have?", o:["6","3","2","12"], a:0, x:"A regular polygon with n sides has n lines of symmetry." },
    { d:3, k:"mcq", q:"A shape is enlarged by scale factor 3. Its perimeter is…", o:["3 times bigger","9 times bigger","the same","6 times bigger"], a:0, x:"Lengths (and perimeter) multiply by 3; area multiplies by 9." },
    { d:3, k:"mcq", q:"The line y = 2x + 1 crosses the y-axis at…", o:["(0, 1)","(1, 0)","(0, 2)","(2, 1)"], a:0, x:"In y = mx + c, c is the y-intercept: (0, 1). The gradient is 2." }
  ]);
})(window.STUDY = window.STUDY || {});
