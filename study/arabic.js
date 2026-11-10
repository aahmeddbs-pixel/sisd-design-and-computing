/* Study Plus · Arabic (Language Acquisition) · IB MYP 2 (Grade 7)
   Questions are in English with Arabic words; options are tapped, so no Arabic keyboard is needed. */
(window.STUDY = window.STUDY || {}).arabic = {
  name: "Arabic", icon: "ع", colour: "#8A5A00", rtl: true,
  blurb: "MYP 2 Arabic: letters, greetings, numbers, family and school",
  topics: [
    {
      id: "letters", title: "Letters and sounds", strand: "MYP 2 · Phase 1–2 · Reading and writing",
      learn: {
        ideas: [
          "Arabic is written and read from right to left. The alphabet has 28 letters.",
          "Most letters join to the next letter and change shape slightly at the start, middle or end of a word.",
          "Six letters never join to the letter after them: ا د ذ ر ز و",
          "Short vowels are small marks: fatha ( َ ) = a, kasra ( ِ ) = i, damma ( ُ ) = u. Sukun ( ْ ) means no vowel.",
          "ة (taa marbuta) at the end of a word usually shows it is feminine: معلم (mu'allim, male teacher) → معلمة (mu'allima, female teacher)."
        ],
        example: "كَتَبَ  = ka-ta-ba (he wrote)\nEach letter has a fatha ( َ ), so each one is read with the sound 'a'."
      },
      tasks: [
        { k:"mcq", q:"In which direction is Arabic written?", o:["Left to right","Right to left","Top to bottom","Bottom to top"], a:1, x:"Arabic is written and read from right to left, so books open from what English readers think of as the back." },
        { k:"num", q:"How many letters are in the Arabic alphabet?", a:28, x:"There are 28 letters. Hamza (ء) is sometimes counted separately." },
        { k:"mcq", q:"Which letter is 'b' (baa')?", o:["ت","ب","ث","ن"], a:1, x:"ب (baa') has one dot BELOW. ت (taa') has two dots above, ث (thaa') three dots above, ن (noon) one dot above." },
        { k:"mcq", q:"Which letter makes the 'm' sound (meem)?", o:["م","ل","ك","ف"], a:0, x:"م is meem (m). ل is laam (l), ك is kaaf (k), ف is faa' (f)." },
        { k:"mcq", q:"Which of these letters does NOT join to the letter after it?", o:["ب","س","د","م"], a:2, x:"د (daal) is one of the six non-joining letters: ا د ذ ر ز و. The others join on both sides." },
        { k:"mcq", q:"What sound does the fatha ( َ ) give?", o:["a","i","u","no vowel"], a:0, x:"Fatha (a small line above) = 'a'. Kasra (line below) = 'i'. Damma (small و shape above) = 'u'." },
        { k:"mcq", q:"Which word is feminine?", o:["طالب","معلم","مدرسة","قلم"], a:2, x:"مدرسة (madrasa, school) ends in ة (taa marbuta), the usual sign of a feminine noun." },
        { k:"mcq", q:"How do you read بَيْت ?", o:["bayt","bita","buyt","tayb"], a:0, x:"ب with fatha = ba, يْ with sukun = y, then ت = t: bayt (house). Remember to read from right to left." }
      ]
    },
    {
      id: "greetings", title: "Greetings and introductions", strand: "MYP 2 · Phase 1–2 · Identity",
      learn: {
        ideas: [
          "السلام عليكم (as-salamu alaykum) = peace be upon you. Reply: وعليكم السلام (wa alaykum as-salam).",
          "مرحبا (marhaban) = hello. صباح الخير (sabah al-khayr) = good morning → reply صباح النور (sabah an-noor).",
          "كيف حالك؟ (kayfa haluk?) = how are you? → أنا بخير، الحمد لله (ana bikhayr, alhamdulillah) = I'm fine, praise be to God.",
          "ما اسمك؟ (ma ismuk?) = what is your name? → اسمي ... (ismi …) = my name is …",
          "شكراً (shukran) = thank you → عفواً ('afwan) = you're welcome. مع السلامة (ma'a as-salama) = goodbye."
        ],
        example: "— صباح الخير! ما اسمك؟\n— صباح النور! اسمي ميخائيل.\n(Good morning! What's your name? — Good morning! My name is Mikhail.)"
      },
      tasks: [
        { k:"mcq", q:"What is the reply to السلام عليكم ?", o:["صباح النور","وعليكم السلام","شكراً","مع السلامة"], a:1, x:"The reply is وعليكم السلام (wa alaykum as-salam) = and upon you be peace." },
        { k:"mcq", q:"What does صباح الخير mean?", o:["Good night","Good morning","Goodbye","Thank you"], a:1, x:"صباح (sabah) = morning, الخير (al-khayr) = goodness. So 'good morning'. Reply: صباح النور." },
        { k:"mcq", q:"How do you ask 'What is your name?'", o:["كيف حالك؟","ما اسمك؟","أين تسكن؟","كم عمرك؟"], a:1, x:"ما اسمك؟ (ma ismuk?) = what is your name? كيف حالك = how are you, أين تسكن = where do you live, كم عمرك = how old are you." },
        { k:"mcq", q:"Which word means 'thank you'?", o:["عفواً","مرحبا","شكراً","نعم"], a:2, x:"شكراً (shukran) = thank you. عفواً ('afwan) = you're welcome, مرحبا = hello, نعم = yes." },
        { k:"mcq", q:"Someone asks كيف حالك؟ Which is the best reply?", o:["اسمي علي","أنا بخير، الحمد لله","مع السلامة","صباح الخير"], a:1, x:"كيف حالك؟ = how are you? Reply أنا بخير، الحمد لله = I'm fine, praise be to God." },
        { k:"mcq", q:"What does مع السلامة mean?", o:["Hello","Goodbye","Please","Welcome"], a:1, x:"مع السلامة (ma'a as-salama) = goodbye (literally 'with safety')." },
        { k:"mcq", q:"How do you say 'My name is Sara'?", o:["اسمك سارة","اسمي سارة","سارة اسم","هذه سارة"], a:1, x:"اسمي (ismi) = my name. The ـي ending means 'my'. اسمك = your name." },
        { k:"mcq", q:"What does أهلاً وسهلاً mean?", o:["Welcome","Sorry","Good night","How much?"], a:0, x:"أهلاً وسهلاً (ahlan wa sahlan) = welcome. You often hear it when arriving at someone's home or a shop." }
      ]
    },
    {
      id: "numbers", title: "Numbers and colours", strand: "MYP 2 · Phase 1–2 · Daily life",
      learn: {
        ideas: [
          "1–10: واحد، اثنان، ثلاثة، أربعة، خمسة، ستة، سبعة، ثمانية، تسعة، عشرة",
          "The digits used in many Arab countries: ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ١٠ (1–10). Numbers are written left to right even inside Arabic text.",
          "Colours (masculine): أحمر red, أزرق blue, أخضر green, أصفر yellow, أبيض white, أسود black.",
          "Colours change for feminine nouns: أحمر → حمراء, أزرق → زرقاء. سيارة حمراء = a red car.",
          "Adjectives come AFTER the noun in Arabic: قلم أزرق = a blue pen (literally 'pen blue')."
        ],
        example: "عندي ثلاثة أقلام: قلم أحمر وقلم أزرق وقلم أخضر.\n(I have three pens: a red pen, a blue pen and a green pen.)"
      },
      tasks: [
        { k:"mcq", q:"What number is خمسة ?", o:["3","5","7","9"], a:1, x:"خمسة (khamsa) = 5. ثلاثة = 3, سبعة = 7, تسعة = 9." },
        { k:"num", q:"What number is written as ٧ ?", a:7, x:"٧ is the Arabic-Indic digit for 7. It looks like a V. ٨ (8) is the same shape upside down." },
        { k:"num", q:"What number is ثمانية ?", a:8, x:"ثمانية (thamaniya) = 8." },
        { k:"mcq", q:"What colour is أخضر ?", o:["Red","Green","Yellow","Black"], a:1, x:"أخضر (akhdar) = green. It is the colour of the UAE flag's top stripe." },
        { k:"mcq", q:"How do you say 'white'?", o:["أسود","أبيض","أصفر","أزرق"], a:1, x:"أبيض (abyad) = white. أسود (aswad) = black." },
        { k:"mcq", q:"Which is correct for 'a red car' (سيارة is feminine)?", o:["سيارة أحمر","سيارة حمراء","حمراء سيارة","أحمر سيارة"], a:1, x:"سيارة is feminine (ends in ة), so the colour takes its feminine form حمراء, and it comes after the noun." },
        { k:"num", q:"Work out: ثلاثة + أربعة = ? (type the digits)", a:7, x:"ثلاثة = 3 and أربعة = 4. 3 + 4 = 7 (سبعة)." },
        { k:"mcq", q:"What is عشرة ?", o:["2","10","20","12"], a:1, x:"عشرة ('ashara) = 10, written ١٠." }
      ]
    },
    {
      id: "family", title: "Family and home", strand: "MYP 2 · Phase 1–2 · Relationships",
      learn: {
        ideas: [
          "أب (ab) father, أم (umm) mother, أخ (akh) brother, أخت (ukht) sister, جد (jadd) grandfather, جدة (jadda) grandmother.",
          "عائلة / أسرة = family. بيت = house, غرفة = room, مطبخ = kitchen.",
          "Add ـي to mean 'my': أمي (my mother), أخي (my brother), بيتي (my house).",
          "Add ـك to mean 'your': بيتك (your house).",
          "هذا (this, masculine) / هذه (this, feminine): هذا أخي، هذه أختي."
        ],
        example: "عائلتي صغيرة. عندي أخ واحد وأخت واحدة.\n(My family is small. I have one brother and one sister.)"
      },
      tasks: [
        { k:"mcq", q:"What does أم mean?", o:["Father","Mother","Sister","Aunt"], a:1, x:"أم (umm) = mother. أب (ab) = father." },
        { k:"mcq", q:"How do you say 'my brother'?", o:["أخي","أختي","أخك","أبي"], a:0, x:"أخ (brother) + ـي (my) = أخي (akhi). أختي = my sister, أبي = my father." },
        { k:"mcq", q:"What does بيت mean?", o:["Room","School","House","Car"], a:2, x:"بيت (bayt) = house. غرفة = room, مدرسة = school, سيارة = car." },
        { k:"mcq", q:"Choose the correct word: '___ أختي' (This is my sister)", o:["هذا","هذه","هو","أنا"], a:1, x:"أخت is feminine, so use هذه (hadhihi): هذه أختي. For masculine, use هذا: هذا أخي." },
        { k:"mcq", q:"What is مطبخ ?", o:["Bedroom","Garden","Kitchen","Bathroom"], a:2, x:"مطبخ (matbakh) = kitchen. It comes from the verb طبخ (to cook)." },
        { k:"mcq", q:"What does جدتي mean?", o:["My grandfather","My grandmother","My aunt","My cousin"], a:1, x:"جدة (jadda) = grandmother, + ـي = my grandmother (جدتي). The ة becomes ت before the ending." },
        { k:"mcq", q:"What does عائلتي كبيرة mean?", o:["My family is big","My house is big","My family is small","My school is big"], a:0, x:"عائلتي = my family, كبيرة = big (feminine, matching عائلة)." },
        { k:"mcq", q:"How do you say 'your house'?", o:["بيتي","بيتك","بيوت","البيت"], a:1, x:"ـك = your: بيتك (baytuk). بيتي = my house, البيت = the house, بيوت = houses." }
      ]
    },
    {
      id: "school", title: "School and daily routine", strand: "MYP 2 · Phase 1–2 · Daily life",
      learn: {
        ideas: [
          "مدرسة school, صف / فصل classroom, معلم / معلمة teacher (m/f), طالب / طالبة student (m/f), كتاب book, قلم pen, دفتر notebook.",
          "Days: الأحد Sun, الاثنين Mon, الثلاثاء Tue, الأربعاء Wed, الخميس Thu, الجمعة Fri, السبت Sat.",
          "'I' verbs start with أ: أذهب (I go), أكتب (I write), أقرأ (I read), ألعب (I play), أدرس (I study).",
          "إلى = to: أذهب إلى المدرسة (I go to school).",
          "ال = 'the': كتاب (a book) → الكتاب (the book)."
        ],
        example: "يوم الاثنين أذهب إلى المدرسة. أقرأ كتاباً وأكتب في دفتري.\n(On Monday I go to school. I read a book and write in my notebook.)"
      },
      tasks: [
        { k:"mcq", q:"What does مدرسة mean?", o:["Teacher","School","Student","Classroom"], a:1, x:"مدرسة (madrasa) = school. It comes from the root د ر س, linked to studying." },
        { k:"mcq", q:"Which word means 'book'?", o:["قلم","دفتر","كتاب","باب"], a:2, x:"كتاب (kitab) = book. قلم = pen, دفتر = notebook, باب = door." },
        { k:"mcq", q:"Which day is الجمعة ?", o:["Monday","Wednesday","Friday","Sunday"], a:2, x:"الجمعة (al-jum'a) = Friday, the day of the weekly congregational prayer." },
        { k:"mcq", q:"What does أكتب mean?", o:["I read","I write","I play","I go"], a:1, x:"أكتب (aktub) = I write. The أ at the start shows 'I'. أقرأ = I read." },
        { k:"mcq", q:"How do you say 'I go to school'?", o:["أذهب إلى المدرسة","ألعب في المدرسة","المدرسة كبيرة","أنا مدرسة"], a:0, x:"أذهب (I go) + إلى (to) + المدرسة (the school)." },
        { k:"mcq", q:"What is a female teacher?", o:["معلم","معلمة","طالب","طالبة"], a:1, x:"معلمة (mu'allima) = female teacher. The ة makes it feminine. طالبة = female student." },
        { k:"mcq", q:"Which day comes after الأحد (Sunday)?", o:["السبت","الاثنين","الخميس","الثلاثاء"], a:1, x:"Sunday → Monday: الاثنين (al-ithnayn). Its name comes from اثنان (two): the second day of the Arabic week." },
        { k:"mcq", q:"How do you say 'the pen'?", o:["قلم","القلم","أقلام","قلمي"], a:1, x:"Add ال to make 'the': قلم (a pen) → القلم (the pen). قلمي = my pen, أقلام = pens." }
      ]
    }
  ]
};
