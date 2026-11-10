/* Study Plus · Arabic · harder tasks for every topic, plus two new MYP 2 topics (d: 1 Core, 2 Extended, 3 Challenge) */
(function(S){
  const A = S.arabic, T = id => A.topics.find(t => t.id === id);
  T("letters").tasks.push(
    { d:2, k:"mcq", q:"Which letter is خ (khaa')?", o:["The letter with one dot above","The letter with one dot below","The letter with no dots","The letter with two dots above"], a:0, x:"ج (jeem) has a dot below, ح (haa') has no dot, خ (khaa') has a dot above. They share the same body shape." },
    { d:3, k:"mcq", q:"In الشمس (ash-shams, the sun), the ل is not pronounced. Why?", o:["ش is a 'sun letter', so the ل of ال blends into it","It is a spelling mistake","ل is never pronounced","Because the word is feminine"], a:0, x:"Before sun letters (like ت د ر س ش ن) the ل of ال is silent and the next letter is doubled: ash-shams. Before moon letters (like ق) it is said: al-qamar." },
    { d:3, k:"mcq", q:"What does the shadda ( ّ ) do?", o:["Doubles the letter's sound","Makes the letter silent","Adds an 'i' sound","Ends the word"], a:0, x:"Shadda doubles a consonant: مدرّسة (mudarrisa) has a doubled ر." },
    { d:3, k:"mcq", q:"How do you read كُتُب ?", o:["kutub (books)","kataba (he wrote)","kaatib (writer)","maktab (office)"], a:0, x:"Damma on ك and ت gives 'ku-tu', then ب: kutub = books. Many words share the root ك ت ب (writing)." }
  );
  T("greetings").tasks.push(
    { d:2, k:"mcq", q:"How do you ask 'How old are you?'", o:["كم عمرك؟","ما اسمك؟","من أين أنت؟","كيف حالك؟"], a:0, x:"كم عمرك؟ (kam 'umruk?) = how old are you? Reply: عمري ... سنة (my age is … years)." },
    { d:3, k:"mcq", q:"What does من أين أنت؟ mean?", o:["Where are you from?","Where do you live?","Who are you?","How are you?"], a:0, x:"من أين (min ayna) = from where. Reply: أنا من روسيا (I am from Russia) or أنا من الإمارات." },
    { d:3, k:"mcq", q:"Which reply means 'I am from the Emirates'?", o:["أنا من الإمارات","أنا في المدرسة","اسمي الإمارات","أنا بخير"], a:0, x:"أنا (I am) + من (from) + الإمارات (the Emirates)." },
    { d:3, k:"mcq", q:"How do you say 'Nice to meet you'?", o:["تشرفنا","مع السلامة","صباح الخير","من فضلك"], a:0, x:"تشرفنا (tasharrafna) = it's an honour / nice to meet you. من فضلك = please." }
  );
  T("numbers").tasks.push(
    { d:2, k:"num", q:"What number is عشرون ?", a:20, x:"عشرون ('ishrun) = 20. Tens end in -ون: ثلاثون 30, أربعون 40." },
    { d:3, k:"num", q:"Type the number written as ٢٥", a:25, x:"٢ = 2 and ٥ = 5, read left to right: 25." },
    { d:3, k:"num", q:"What is خمسة عشر ?", a:15, x:"خمسة (5) + عشر (10) = 15. Numbers 13–19 put the unit first, then عشر." },
    { d:3, k:"mcq", q:"Which is correct for 'a blue bag' (حقيبة is feminine)?", o:["حقيبة زرقاء","حقيبة أزرق","زرقاء حقيبة","حقيبة زرق"], a:0, x:"The feminine of أزرق is زرقاء, and the adjective follows the noun: حقيبة زرقاء." }
  );
  T("family").tasks.push(
    { d:2, k:"mcq", q:"What does عمي mean?", o:["My uncle (father's brother)","My grandfather","My cousin","My son"], a:0, x:"عم ('amm) = paternal uncle; خال (khaal) = maternal uncle. ـي = my." },
    { d:3, k:"mcq", q:"How do you say 'I have two brothers'?", o:["عندي أخوان","عندي أخ","عندي أخت","عندي إخوة كثير"], a:0, x:"عندي = I have. Arabic has a dual form for two: أخوان (two brothers)." },
    { d:3, k:"mcq", q:"What does أين غرفتك؟ mean?", o:["Where is your room?","What is your room like?","Is this your room?","My room is big"], a:0, x:"أين (where) + غرفة (room) + ـك (your). The ة becomes ت before the ending." },
    { d:3, k:"mcq", q:"Choose the correct sentence: 'My sister is tall.'", o:["أختي طويلة","أختي طويل","أخي طويلة","أختك طويل"], a:0, x:"أخت is feminine, so the adjective is feminine too: طويلة." }
  );
  T("school").tasks.push(
    { d:2, k:"mcq", q:"What does أحب الرياضيات mean?", o:["I love maths","I love sport","I study science","I hate maths"], a:0, x:"أحب (uhibbu) = I love/like. الرياضيات = mathematics. (الرياضة = sport.)" },
    { d:3, k:"mcq", q:"What does نحن ندرس العربية mean?", o:["We study Arabic","I study Arabic","They write Arabic","You read Arabic"], a:0, x:"نحن = we. 'We' verbs start with ن: ندرس (we study), نكتب (we write)." },
    { d:3, k:"mcq", q:"Which word means 'library'?", o:["مكتبة","مكتب","كاتب","كتاب"], a:0, x:"All four share the root ك ت ب (writing). مكتبة = library, مكتب = office/desk, كاتب = writer, كتاب = book." },
    { d:3, k:"mcq", q:"How do you say 'Lessons start at eight'?", o:["تبدأ الدروس الساعة الثامنة","الدروس كبيرة","أذهب إلى الدرس","الساعة ثمانية دروس"], a:0, x:"تبدأ (start) + الدروس (the lessons) + الساعة الثامنة (at eight o'clock)." }
  );
  A.topics.push(
    { id:"food", title:"Food and drink", strand:"MYP 2 · Phase 1–2 · Food and health",
      learn:{ ideas:[
        "طعام food, ماء water, خبز bread, حليب milk, أرز rice, دجاج chicken, سمك fish, تفاحة apple, عصير juice.",
        "Meals: فطور breakfast, غداء lunch, عشاء dinner.",
        "أريد … (I want …), من فضلك (please), شكراً (thank you).",
        "أنا جائع / جائعة (I'm hungry, m/f). أنا عطشان / عطشانة (I'm thirsty).",
        "أحب … (I like) / لا أحب … (I don't like): لا أحب السمك."],
        example:"أريد خبزاً وعصير برتقال، من فضلك.\n(I'd like bread and orange juice, please.)" },
      tasks:[
        { d:1, k:"mcq", q:"What is ماء ?", o:["Water","Milk","Juice","Tea"], a:0, x:"ماء (maa') = water. حليب = milk, عصير = juice, شاي = tea." },
        { d:1, k:"mcq", q:"Which word means 'bread'?", o:["خبز","أرز","سمك","دجاج"], a:0, x:"خبز (khubz) = bread. أرز = rice, سمك = fish, دجاج = chicken." },
        { d:1, k:"mcq", q:"What is فطور ?", o:["Breakfast","Lunch","Dinner","Dessert"], a:0, x:"فطور (futoor) = breakfast. In Ramadan, إفطار is the meal that breaks the fast." },
        { d:2, k:"mcq", q:"How do you say 'I want rice, please'?", o:["أريد أرزاً من فضلك","أحب الأرز","أنا أرز","لا أريد أرز"], a:0, x:"أريد (I want) + أرزاً (rice) + من فضلك (please)." },
        { d:2, k:"mcq", q:"What does أنا جائع mean?", o:["I am hungry","I am thirsty","I am tired","I am full"], a:0, x:"جائع = hungry (a girl says جائعة). عطشان = thirsty." },
        { d:2, k:"mcq", q:"What does لا أحب السمك mean?", o:["I don't like fish","I like fish","I want fish","I eat fish every day"], a:0, x:"لا before the verb makes it negative: لا أحب = I don't like." },
        { d:2, k:"mcq", q:"What is غداء ?", o:["Lunch","Breakfast","Dinner","A snack"], a:0, x:"غداء (ghadaa') = lunch. عشاء ('ashaa') = dinner." },
        { d:3, k:"mcq", q:"What does أشرب الحليب كل صباح mean?", o:["I drink milk every morning","I eat bread every morning","I drink water at night","I like milk"], a:0, x:"أشرب = I drink, الحليب = the milk, كل صباح = every morning." },
        { d:3, k:"mcq", q:"How does a girl say 'I am thirsty'?", o:["أنا عطشانة","أنا عطشان","أنا جائع","هي عطشان"], a:0, x:"Add ة for the feminine: عطشانة." },
        { d:3, k:"mcq", q:"In a restaurant, what does الحساب من فضلك mean?", o:["The bill, please","The menu, please","Water, please","Thank you very much"], a:0, x:"الحساب = the bill. قائمة الطعام = the menu." }
      ] },
    { id:"weather", title:"Weather, seasons and time", strand:"MYP 2 · Phase 1–2 · The world around me",
      learn:{ ideas:[
        "الطقس = the weather. حار hot, بارد cold, مشمس sunny, ممطر rainy, غائم cloudy.",
        "Seasons: الصيف summer, الشتاء winter, الربيع spring, الخريف autumn.",
        "كيف الطقس اليوم؟ = What is the weather like today? → الطقس حار ومشمس.",
        "Time: كم الساعة؟ = What time is it? → الساعة الثالثة = It is three o'clock. والنصف = and a half (half past).",
        "اليوم today, غداً tomorrow, أمس yesterday."],
        example:"في الصيف الطقس حار جداً في دبي، وفي الشتاء الطقس معتدل.\n(In summer the weather is very hot in Dubai, and in winter it is mild.)" },
      tasks:[
        { d:1, k:"mcq", q:"What does حار mean?", o:["Hot","Cold","Rainy","Windy"], a:0, x:"حار (haarr) = hot. بارد = cold." },
        { d:1, k:"mcq", q:"Which word means 'winter'?", o:["الشتاء","الصيف","الربيع","الخريف"], a:0, x:"الشتاء (ash-shitaa') = winter. الصيف = summer." },
        { d:1, k:"mcq", q:"What does مشمس mean?", o:["Sunny","Cloudy","Rainy","Snowy"], a:0, x:"مشمس comes from شمس (sun): sunny." },
        { d:2, k:"mcq", q:"How do you ask 'What is the weather like today?'", o:["كيف الطقس اليوم؟","كم الساعة؟","أين الطقس؟","ما اسمك؟"], a:0, x:"كيف (how) + الطقس (the weather) + اليوم (today)." },
        { d:2, k:"mcq", q:"What does كم الساعة؟ mean?", o:["What time is it?","How many hours?","Where is the clock?","Is it late?"], a:0, x:"كم الساعة؟ = What time is it? Reply: الساعة الرابعة (It's four o'clock)." },
        { d:2, k:"mcq", q:"What does غداً mean?", o:["Tomorrow","Yesterday","Today","Tonight"], a:0, x:"غداً = tomorrow, أمس = yesterday, اليوم = today." },
        { d:2, k:"mcq", q:"Which season is الربيع ?", o:["Spring","Autumn","Summer","Winter"], a:0, x:"الربيع (ar-rabee') = spring. الخريف = autumn." },
        { d:3, k:"mcq", q:"What does الساعة الخامسة والنصف mean?", o:["Half past five","Five o'clock","Quarter past five","Half past six"], a:0, x:"الخامسة = fifth (five o'clock), والنصف = and a half: 5:30." },
        { d:3, k:"mcq", q:"What does كان الطقس ممطراً أمس mean?", o:["The weather was rainy yesterday","It will rain tomorrow","It is sunny today","It never rains"], a:0, x:"كان = was (past), ممطراً = rainy, أمس = yesterday." },
        { d:3, k:"mcq", q:"Which sentence describes Dubai in summer correctly?", o:["الطقس حار جداً في الصيف","الطقس بارد جداً في الصيف","الثلج كثير في الصيف","الطقس ممطر كل يوم في الصيف"], a:0, x:"حار جداً = very hot. Summer in Dubai is very hot and dry." }
      ] }
  );
})(window.STUDY);
