/* Study Plus · Mathematics · IB MYP 2 (Grade 7)
   Task kinds: mcq (a = index of right option), num (a = number, tol = allowed difference),
   text (a = list of accepted answers), tf (a = true/false). x = the explanation shown after every check. */
(window.STUDY = window.STUDY || {}).maths = {
  name: "Mathematics", icon: "∑", colour: "#2563A8",
  blurb: "MYP 2 number, algebra, geometry and statistics",
  topics: [
    {
      id: "integers", title: "Integers and directed numbers", strand: "MYP 2 · Number",
      learn: {
        ideas: [
          "Integers are whole numbers that can be positive, negative or zero.",
          "On a number line, numbers get bigger as you move right and smaller as you move left. So −3 is bigger than −8.",
          "Adding a negative is the same as subtracting: 5 + (−3) = 5 − 3 = 2.",
          "Subtracting a negative is the same as adding: 5 − (−3) = 5 + 3 = 8.",
          "Multiplying or dividing: same signs give a positive answer, different signs give a negative answer."
        ],
        example: "Work out −4 × (−6) − 10.\nStep 1: −4 × −6 = +24 (same signs → positive).\nStep 2: 24 − 10 = 14."
      },
      tasks: [
        { k:"mcq", q:"Which number is the largest?", o:["−12","−3","−7","−20"], a:1, x:"On the number line −3 is furthest to the right, so it is the largest. A negative number closer to zero is bigger. Example: −1 is bigger than −100." },
        { k:"num", q:"Work out: −8 + 15", a:7, x:"Start at −8 and move 15 to the right: you pass 0 after 8 steps and have 7 steps left, so the answer is 7." },
        { k:"num", q:"Work out: 6 − (−9)", a:15, x:"Subtracting a negative is the same as adding: 6 − (−9) = 6 + 9 = 15." },
        { k:"num", q:"Work out: −7 × 5", a:-35, x:"Different signs give a negative answer: 7 × 5 = 35, so −7 × 5 = −35." },
        { k:"num", q:"Work out: −48 ÷ (−6)", a:8, x:"Same signs give a positive answer: 48 ÷ 6 = 8, so −48 ÷ −6 = +8." },
        { k:"num", q:"The temperature in Moscow is −11 °C and in Dubai it is 27 °C. How many degrees warmer is Dubai?", a:38, x:"Find the difference: 27 − (−11) = 27 + 11 = 38 degrees. From −11 up to 0 is 11, then 0 up to 27 is 27." },
        { k:"tf", q:"True or false: (−2)³ = 8", a:false, x:"(−2)³ = −2 × −2 × −2. The first two give +4, then 4 × −2 = −8. An odd power of a negative number stays negative." },
        { k:"num", q:"Work out: −3 × (−4) − 20 ÷ 5", a:8, x:"Use BIDMAS: do × and ÷ first. −3 × −4 = 12 and 20 ÷ 5 = 4, then 12 − 4 = 8." }
      ]
    },
    {
      id: "fdp", title: "Fractions, decimals and percentages", strand: "MYP 2 · Number",
      learn: {
        ideas: [
          "Fractions, decimals and percentages are three ways of writing the same amount: ½ = 0.5 = 50%.",
          "To add or subtract fractions, first make the denominators the same.",
          "To multiply fractions, multiply the tops and multiply the bottoms. To divide, flip the second fraction and multiply.",
          "To find a percentage of an amount, change the percentage to a decimal and multiply: 15% of 80 = 0.15 × 80 = 12.",
          "Percentage increase: multiply by (1 + rate). A 10% increase means × 1.10."
        ],
        example: "Work out 2/3 + 1/4.\nCommon denominator 12: 2/3 = 8/12 and 1/4 = 3/12.\n8/12 + 3/12 = 11/12."
      },
      tasks: [
        { k:"mcq", q:"Which is the same as 3/5?", o:["0.35","0.6","35%","0.53"], a:1, x:"3 ÷ 5 = 0.6, which is also 60%. A quick check: 1/5 = 0.2, so 3/5 = 3 × 0.2 = 0.6." },
        { k:"text", q:"Work out 1/2 + 1/3. Give your answer as a fraction, like 4/9.", a:["5/6"], x:"Use the common denominator 6: 1/2 = 3/6 and 1/3 = 2/6. 3/6 + 2/6 = 5/6." },
        { k:"text", q:"Work out 3/4 × 2/9. Give your answer in its simplest form.", a:["1/6","6/36"], best:"1/6", x:"Multiply tops and bottoms: (3 × 2)/(4 × 9) = 6/36. Divide top and bottom by 6 to simplify: 1/6." },
        { k:"num", q:"Find 35% of 240.", a:84, x:"35% = 0.35, and 0.35 × 240 = 84. Or: 10% is 24, so 30% is 72, 5% is 12, and 72 + 12 = 84." },
        { k:"num", q:"Write 7/8 as a percentage (just the number).", a:87.5, tol:0.01, x:"7 ÷ 8 = 0.875. Multiply by 100 to get a percentage: 87.5%." },
        { k:"num", q:"A pair of trainers costs 320 AED. The price goes up by 15%. What is the new price in AED?", a:368, x:"A 15% increase means × 1.15. 320 × 1.15 = 368 AED. Check: 15% of 320 is 48, and 320 + 48 = 368." },
        { k:"mcq", q:"Which list is in order from smallest to largest?", o:["0.4, 3/8, 45%","3/8, 0.4, 45%","45%, 0.4, 3/8","0.4, 45%, 3/8"], a:1, x:"Change everything to decimals: 3/8 = 0.375, 0.4, 45% = 0.45. So the order is 3/8, 0.4, 45%." },
        { k:"text", q:"Work out 2/5 ÷ 4/15. Give your answer as a fraction in its simplest form.", a:["3/2","1 1/2","1.5"], best:"3/2", x:"Flip the second fraction and multiply: 2/5 × 15/4 = 30/20 = 3/2 (which is 1½)." }
      ]
    },
    {
      id: "algebra", title: "Algebra: expressions and equations", strand: "MYP 2 · Algebra",
      learn: {
        ideas: [
          "A term like 3x means 3 × x. Like terms have the same letter part and can be collected: 3x + 5x = 8x.",
          "To expand brackets, multiply everything inside by the number outside: 4(x + 3) = 4x + 12.",
          "Substitute means replace the letter with a number, then calculate.",
          "To solve an equation, do the same inverse operation to both sides until the letter is on its own.",
          "Always check your answer by putting it back into the equation."
        ],
        example: "Solve 3x − 7 = 20.\nAdd 7 to both sides: 3x = 27.\nDivide both sides by 3: x = 9.\nCheck: 3 × 9 − 7 = 27 − 7 = 20 ✓"
      },
      tasks: [
        { k:"mcq", q:"Simplify 4a + 3b − a + 5b", o:["7a + 8b","3a + 8b","3a + 2b","11ab"], a:1, x:"Collect the a terms: 4a − a = 3a. Collect the b terms: 3b + 5b = 8b. Answer: 3a + 8b. You cannot add a's and b's together." },
        { k:"mcq", q:"Expand 5(2x − 3)", o:["10x − 3","7x − 8","10x − 15","10x + 15"], a:2, x:"Multiply both terms inside by 5: 5 × 2x = 10x and 5 × −3 = −15. Answer: 10x − 15." },
        { k:"num", q:"If x = 4 and y = −2, find the value of 3x + 2y.", a:8, x:"Substitute: 3 × 4 + 2 × (−2) = 12 − 4 = 8." },
        { k:"num", q:"Solve: x + 13 = 31. What is x?", a:18, x:"Subtract 13 from both sides: x = 31 − 13 = 18. Check: 18 + 13 = 31 ✓" },
        { k:"num", q:"Solve: 4x − 9 = 27. What is x?", a:9, x:"Add 9 to both sides: 4x = 36. Divide by 4: x = 9. Check: 4 × 9 − 9 = 27 ✓" },
        { k:"num", q:"Solve: 2(x + 5) = 26. What is x?", a:8, x:"Expand: 2x + 10 = 26. Subtract 10: 2x = 16. Divide by 2: x = 8. (Or divide both sides by 2 first: x + 5 = 13.)" },
        { k:"num", q:"Solve: 5x + 3 = 2x + 21. What is x?", a:6, x:"Get the x terms on one side: subtract 2x from both sides → 3x + 3 = 21. Subtract 3 → 3x = 18. Divide by 3 → x = 6." },
        { k:"mcq", q:"A taxi charges 12 AED plus 2 AED per km. Which expression gives the cost for k km?", o:["12k + 2","14k","12 + 2k","2 + 12 + k"], a:2, x:"There is a fixed 12 AED, then 2 AED for each km, so 2 × k. Total: 12 + 2k. For 10 km: 12 + 20 = 32 AED." }
      ]
    },
    {
      id: "ratio", title: "Ratio and proportion", strand: "MYP 2 · Number",
      learn: {
        ideas: [
          "A ratio compares amounts, like 2 : 3. Simplify a ratio by dividing both parts by the same number.",
          "To share an amount in a ratio: add the parts, find one part, then multiply.",
          "Direct proportion: when one amount doubles, the other doubles too. Use the unitary method: find the value of one first.",
          "Speed = distance ÷ time is a rate, a type of ratio."
        ],
        example: "Share 60 AED in the ratio 2 : 3.\nTotal parts = 2 + 3 = 5. One part = 60 ÷ 5 = 12.\nShares: 2 × 12 = 24 AED and 3 × 12 = 36 AED."
      },
      tasks: [
        { k:"mcq", q:"Simplify the ratio 18 : 24", o:["9 : 12","3 : 4","6 : 8","2 : 3"], a:1, x:"The highest common factor of 18 and 24 is 6. 18 ÷ 6 = 3 and 24 ÷ 6 = 4, so 3 : 4. (9 : 12 and 6 : 8 are equal but not fully simplified.)" },
        { k:"num", q:"Share 45 sweets in the ratio 4 : 5. How many does the person with the larger share get?", a:25, x:"Total parts 4 + 5 = 9. One part = 45 ÷ 9 = 5. Larger share = 5 × 5 = 25. Check: 20 + 25 = 45 ✓" },
        { k:"num", q:"5 notebooks cost 35 AED. How much do 8 notebooks cost in AED?", a:56, x:"Unitary method: one notebook = 35 ÷ 5 = 7 AED. Eight notebooks = 8 × 7 = 56 AED." },
        { k:"num", q:"A recipe for 4 people uses 300 g of rice. How many grams are needed for 10 people?", a:750, x:"For 1 person: 300 ÷ 4 = 75 g. For 10 people: 75 × 10 = 750 g." },
        { k:"num", q:"In a class the ratio of boys to girls is 3 : 4. There are 12 boys. How many girls are there?", a:16, x:"3 parts = 12 boys, so 1 part = 4. Girls are 4 parts = 4 × 4 = 16." },
        { k:"num", q:"A car travels 210 km in 3 hours. What is its average speed in km/h?", a:70, x:"Speed = distance ÷ time = 210 ÷ 3 = 70 km/h." },
        { k:"mcq", q:"Which is better value? A: 500 ml for 6 AED. B: 750 ml for 8.25 AED.", o:["A","B","They are the same"], a:1, x:"Price per 100 ml: A = 6 ÷ 5 = 1.20 AED. B = 8.25 ÷ 7.5 = 1.10 AED. B is cheaper per ml, so B is better value." },
        { k:"num", q:"A map uses the scale 1 : 50 000. Two towns are 6 cm apart on the map. How far apart are they in real life, in km?", a:3, x:"6 cm × 50 000 = 300 000 cm. 100 cm = 1 m, so that is 3 000 m, and 1 000 m = 1 km, so 3 km." }
      ]
    },
    {
      id: "geometry", title: "Geometry: angles, area and volume", strand: "MYP 2 · Geometry and trigonometry",
      learn: {
        ideas: [
          "Angles on a straight line add to 180°. Angles around a point add to 360°. Angles in a triangle add to 180°.",
          "Vertically opposite angles are equal.",
          "Area of a rectangle = length × width. Area of a triangle = ½ × base × height. Area of a parallelogram = base × height.",
          "Circle: circumference = π × diameter, area = π × radius².",
          "Volume of a cuboid = length × width × height."
        ],
        example: "A triangle has angles 47° and 68°. Find the third angle.\n180 − 47 − 68 = 65°."
      },
      tasks: [
        { k:"num", q:"Two angles of a triangle are 52° and 71°. What is the third angle in degrees?", a:57, x:"Angles in a triangle add to 180°: 180 − 52 − 71 = 57°." },
        { k:"num", q:"An angle on a straight line is 128°. What is the other angle on the line, in degrees?", a:52, x:"Angles on a straight line add to 180°: 180 − 128 = 52°." },
        { k:"num", q:"Find the area of a triangle with base 12 cm and height 7 cm (in cm²).", a:42, x:"Area = ½ × base × height = ½ × 12 × 7 = 42 cm²." },
        { k:"num", q:"A rectangle has an area of 96 cm² and a length of 12 cm. What is its width in cm?", a:8, x:"Width = area ÷ length = 96 ÷ 12 = 8 cm." },
        { k:"num", q:"Find the volume of a cuboid 5 cm long, 4 cm wide and 3 cm high (in cm³).", a:60, x:"Volume = l × w × h = 5 × 4 × 3 = 60 cm³." },
        { k:"num", q:"A circle has a radius of 5 cm. Find its area to 1 decimal place (use π = 3.14).", a:78.5, tol:0.15, x:"Area = π × r² = 3.14 × 5 × 5 = 3.14 × 25 = 78.5 cm². Remember to square the radius, not the diameter." },
        { k:"mcq", q:"Two straight lines cross. One angle is 35°. What is the angle vertically opposite it?", o:["145°","35°","55°","325°"], a:1, x:"Vertically opposite angles are always equal, so it is also 35°. The angles next to it are 180 − 35 = 145°." },
        { k:"num", q:"The angles of a quadrilateral are 90°, 110° and 75°. Find the fourth angle in degrees.", a:85, x:"Angles in a quadrilateral add to 360° (it splits into two triangles): 360 − 90 − 110 − 75 = 85°." }
      ]
    },
    {
      id: "stats", title: "Statistics and probability", strand: "MYP 2 · Statistics and probability",
      learn: {
        ideas: [
          "Mean = total of the values ÷ how many values there are.",
          "Median = the middle value once the data is in order. Mode = the most common value. Range = largest − smallest.",
          "Probability goes from 0 (impossible) to 1 (certain). P(event) = number of ways it can happen ÷ total number of outcomes.",
          "The probabilities of all possible outcomes add to 1, so P(not A) = 1 − P(A)."
        ],
        example: "Data: 4, 9, 6, 9, 2.\nOrdered: 2, 4, 6, 9, 9. Mean = 30 ÷ 5 = 6. Median = 6. Mode = 9. Range = 9 − 2 = 7."
      },
      tasks: [
        { k:"num", q:"Find the mean of 8, 12, 5, 9, 6.", a:8, x:"Total = 8 + 12 + 5 + 9 + 6 = 40. There are 5 values, so the mean = 40 ÷ 5 = 8." },
        { k:"num", q:"Find the median of 7, 3, 11, 5, 9, 2, 8.", a:7, x:"Put them in order: 2, 3, 5, 7, 8, 9, 11. The middle (4th) value is 7." },
        { k:"num", q:"Find the median of 4, 10, 6, 8.", a:7, x:"In order: 4, 6, 8, 10. With an even number of values the median is halfway between the two middle ones: (6 + 8) ÷ 2 = 7." },
        { k:"num", q:"Find the range of 15, 22, 9, 30, 18.", a:21, x:"Range = largest − smallest = 30 − 9 = 21." },
        { k:"mcq", q:"A fair dice is rolled. What is the probability of rolling a number greater than 4?", o:["1/6","1/3","1/2","2/3"], a:1, x:"Numbers greater than 4 are 5 and 6: 2 outcomes out of 6. P = 2/6 = 1/3." },
        { k:"num", q:"The probability that it rains tomorrow is 0.35. What is the probability that it does not rain?", a:0.65, tol:0.001, x:"P(not rain) = 1 − 0.35 = 0.65. The two probabilities must add to 1." },
        { k:"mcq", q:"A bag has 3 red, 5 blue and 2 green counters. What is the probability of picking blue?", o:["5/10 = 1/2","5/3","1/5","3/10"], a:0, x:"There are 3 + 5 + 2 = 10 counters and 5 are blue. P(blue) = 5/10 = 1/2." },
        { k:"num", q:"The mean of four numbers is 12. Three of them are 10, 15 and 9. What is the fourth number?", a:14, x:"Total of all four = mean × 4 = 48. 10 + 15 + 9 = 34, so the fourth number is 48 − 34 = 14." }
      ]
    }
  ]
};
