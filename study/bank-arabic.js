/* Study Plus · Arabic · question bank for new challenge sets (d: 1 Core, 2 Extended, 3 Challenge). */
(function(S){
  const P = (id, L) => { const t = S.arabic && S.arabic.topics.find(x => x.id === id); if (t) t.pool = (t.pool || []).concat(L); };
  P("letters", [
    { d:1, k:"mcq", q:"Which letter is 'seen' (s)?", o:["س","ش","ص","ز"], a:0, x:"س = seen (s). ش = sheen (sh), with three dots." },
    { d:1, k:"mcq", q:"Which letter is 'taa'' (t)?", o:["ت","ب","ث","ن"], a:0, x:"ت has two dots above. ب has one dot below; ث has three dots above; ن has one dot above." },
    { d:1, k:"mcq", q:"What sound does the kasra ( ِ ) give?", o:["A short 'i'","A short 'a'","A short 'u'","No vowel"], a:0, x:"Fatha = a, kasra = i (below the letter), damma = u." },
    { d:2, k:"mcq", q:"What does the sukoon ( ْ ) show?", o:["The letter has no vowel","The letter is doubled","A long 'a'","The end of a sentence"], a:0, x:"Sukoon is a small circle meaning the letter is read without a vowel." },
    { d:2, k:"mcq", q:"How do you read قَلَم ?", o:["qalam (pen)","kalam","qulum","qilam"], a:0, x:"ق (q) with fatha, ل with fatha, then م: qa-la-m. It means pen." },
    { d:2, k:"mcq", q:"Which letter does NOT join to the next letter?", o:["د","ب","م","ل"], a:0, x:"The six non-joining letters are ا د ذ ر ز و." },
    { d:2, k:"mcq", q:"What is the taa' marbuta ( ة ) usually a sign of?", o:["A feminine word","A plural","A verb","A question"], a:0, x:"Many feminine nouns end in ة: مدرسة، سيارة، معلمة." },
    { d:3, k:"mcq", q:"In القَمَر (al-qamar, the moon), the ل is pronounced. Why?", o:["ق is a 'moon letter', so the ل is said","ق is a 'sun letter'","The ل is always silent","Because of the shadda"], a:0, x:"With moon letters, the ل of 'al' is pronounced. With sun letters (like ش) it merges into the next letter." },
    { d:3, k:"mcq", q:"How do you read مُدَرِّسَة ?", o:["mudarrisa (female teacher)","madrasa (school)","mudarris (male teacher)","dars (lesson)"], a:0, x:"The shadda doubles the ر, and ة makes it feminine: mudarrisa." },
    { d:3, k:"mcq", q:"Which word has a long 'oo' vowel?", o:["نُور","نَار","نِيل","نَهْر"], a:0, x:"The و after a damma makes a long 'oo': نُور (noor, light)." }
  ]);
  P("greetings", [
    { d:1, k:"mcq", q:"What is the reply to صباح الخير ?", o:["صباح النور","مساء الخير","شكراً","مع السلامة"], a:0, x:"Good morning (sabah al-khayr) → reply sabah an-noor (morning of light)." },
    { d:1, k:"mcq", q:"What does مساء الخير mean?", o:["Good evening","Good morning","Goodbye","Good night"], a:0, x:"مساء = evening." },
    { d:1, k:"mcq", q:"What does نعم mean?", o:["Yes","No","Please","Thank you"], a:0, x:"نعم = yes. لا = no." },
    { d:2, k:"mcq", q:"How does a boy say 'I am fine, thank you'?", o:["أنا بخير، شكراً","أنا جائع","أنا من دبي","أنا طالب"], a:0, x:"بخير = well/fine. شكراً = thank you." },
    { d:2, k:"mcq", q:"What does عفواً mean as a reply to شكراً ?", o:["You're welcome","Goodbye","Sorry I'm late","Hello"], a:0, x:"عفواً = you're welcome (it can also mean excuse me)." },
    { d:2, k:"mcq", q:"How do you ask a girl 'What is your name?'", o:["ما اسمكِ؟","ما اسمكَ؟","كيف حالك؟","من أين أنت؟"], a:0, x:"The ending changes: اسمكَ (ismuka) to a boy, اسمكِ (ismuki) to a girl." },
    { d:2, k:"mcq", q:"What does أنا عمري اثنا عشر عاماً mean?", o:["I am twelve years old.","I have twelve brothers.","It is twelve o'clock.","I live in house twelve."], a:0, x:"عمري = my age. اثنا عشر = twelve. عاماً = years." },
    { d:3, k:"mcq", q:"Which reply to 'Where do you live?' is correct?", o:["أسكن في دبي","أنا من دبي","اسمي دبي","دبي جميل"], a:0, x:"أسكن = I live. أنا من = I am from (origin)." },
    { d:3, k:"mcq", q:"What does تشرفنا mean?", o:["We are honoured (to meet you)","See you tomorrow","Excuse me","Congratulations"], a:0, x:"تشرفنا is a polite phrase when meeting someone: it's an honour." },
    { d:3, k:"mcq", q:"How do you say 'This is my friend Ali'?", o:["هذا صديقي علي","هذه صديقتي علي","هذا صديقك علي","أنا صديق علي"], a:0, x:"هذا (this, masculine) + صديقي (my friend)." }
  ]);
  P("numbers", [
    { d:1, k:"mcq", q:"What number is ثلاثة ?", o:["3","4","8","10"], a:0, x:"واحد 1، اثنان 2، ثلاثة 3، أربعة 4." },
    { d:1, k:"mcq", q:"What number is written as ٩ ?", o:["9","6","7","5"], a:0, x:"Arabic-Indic digits: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩." },
    { d:1, k:"mcq", q:"What colour is أحمر ?", o:["Red","Blue","Green","Black"], a:0, x:"أحمر red، أزرق blue، أخضر green، أسود black، أبيض white." },
    { d:2, k:"mcq", q:"What colour is أصفر ?", o:["Yellow","Brown","Purple","Orange"], a:0, x:"أصفر = yellow." },
    { d:2, k:"mcq", q:"What number is ستة ?", o:["6","7","60","16"], a:0, x:"خمسة 5، ستة 6، سبعة 7." },
    { d:2, k:"num", q:"Type the number written as ٤٨", a:48, x:"٤ = 4 and ٨ = 8, read left to right as digits: 48." },
    { d:2, k:"mcq", q:"Which is correct for 'a green book' (كتاب is masculine)?", o:["كتاب أخضر","كتاب خضراء","كتابة أخضر","أخضر كتاب"], a:0, x:"The adjective comes after the noun and matches it: masculine أخضر, feminine خضراء." },
    { d:3, k:"mcq", q:"What number is ثلاثون ?", o:["30","13","300","3"], a:0, x:"عشرون 20، ثلاثون 30، أربعون 40." },
    { d:3, k:"mcq", q:"Which is correct for 'a black car' (سيارة is feminine)?", o:["سيارة سوداء","سيارة أسود","سيارات أسود","أسود سيارة"], a:0, x:"Colour adjectives have special feminine forms: أسود → سوداء." },
    { d:3, k:"num", q:"Work out: عشرة × ثلاثة = ? (type the digits)", a:30, x:"عشرة = 10, ثلاثة = 3. 10 × 3 = 30 (ثلاثون)." }
  ]);
  P("family", [
    { d:1, k:"mcq", q:"What does أب mean?", o:["Father","Mother","Brother","Uncle"], a:0, x:"أب = father. أم = mother." },
    { d:1, k:"mcq", q:"What does أخت mean?", o:["Sister","Brother","Aunt","Grandmother"], a:0, x:"أخ = brother. أخت = sister." },
    { d:1, k:"mcq", q:"What does غرفة mean?", o:["Room","Kitchen","Garden","Door"], a:0, x:"غرفة = room. غرفة النوم = bedroom." },
    { d:2, k:"mcq", q:"How do you say 'my mother'?", o:["أمي","أمك","أمه","أم"], a:0, x:"Adding ي makes 'my': أم → أمي." },
    { d:2, k:"mcq", q:"What does جدي mean?", o:["My grandfather","My uncle","My father","My cousin"], a:0, x:"جد = grandfather, جدة = grandmother. Add ي for 'my'." },
    { d:2, k:"mcq", q:"What does حديقة mean?", o:["Garden","Kitchen","Bathroom","Roof"], a:0, x:"حديقة = garden." },
    { d:2, k:"mcq", q:"What does خالتي mean?", o:["My aunt (mother's sister)","My aunt (father's sister)","My sister","My niece"], a:0, x:"خالة = mother's sister. عمة = father's sister." },
    { d:3, k:"mcq", q:"How do you say 'his brother'?", o:["أخوه","أخي","أخوك","أخت"], a:0, x:"ه at the end means 'his': أخوه. ـكَ = your." },
    { d:3, k:"mcq", q:"What does بيتنا واسع وجميل mean?", o:["Our house is spacious and beautiful.","My house is small.","Their house is old.","The house is far."], a:0, x:"ـنا = our. واسع = spacious. جميل = beautiful." },
    { d:3, k:"mcq", q:"Choose the correct sentence: 'My grandmother is kind.'", o:["جدتي لطيفة","جدتي لطيف","جدي لطيفة","جدتي لطيفون"], a:0, x:"Feminine noun → feminine adjective with ة: لطيفة." }
  ]);
  P("school", [
    { d:1, k:"mcq", q:"What does قلم mean?", o:["Pen","Book","Bag","Desk"], a:0, x:"قلم = pen. كتاب = book. حقيبة = bag." },
    { d:1, k:"mcq", q:"What does طالب mean?", o:["Student (male)","Teacher","Classroom","Lesson"], a:0, x:"طالب = male student. طالبة = female student." },
    { d:1, k:"mcq", q:"Which day is السبت ?", o:["Saturday","Sunday","Friday","Monday"], a:0, x:"السبت Saturday، الأحد Sunday، الاثنين Monday." },
    { d:2, k:"mcq", q:"What does أقرأ mean?", o:["I read","I write","I draw","I play"], a:0, x:"أقرأ = I read. أكتب = I write. أرسم = I draw." },
    { d:2, k:"mcq", q:"What does الفصل (or الصف) mean?", o:["The classroom / class","The playground","The canteen","The office"], a:0, x:"الفصل or الصف = class / classroom." },
    { d:2, k:"mcq", q:"How do you say 'my favourite subject is science'?", o:["مادتي المفضلة العلوم","أحب الرياضة","أكره العلوم","العلوم صعبة"], a:0, x:"مادتي المفضلة = my favourite subject. العلوم = science." },
    { d:2, k:"mcq", q:"Which day comes after الأربعاء (Wednesday)?", o:["الخميس","الثلاثاء","الجمعة","السبت"], a:0, x:"الثلاثاء Tuesday، الأربعاء Wednesday، الخميس Thursday." },
    { d:3, k:"mcq", q:"What does أذهب إلى المدرسة بالحافلة mean?", o:["I go to school by bus.","I walk to school.","The school is near.","I go home by car."], a:0, x:"بالحافلة = by bus. بالسيارة = by car." },
    { d:3, k:"mcq", q:"What does الرياضيات سهلة ولكن الفيزياء صعبة mean?", o:["Maths is easy but physics is difficult.","Maths is difficult but physics is easy.","I like maths and physics.","Sport is easy."], a:0, x:"سهلة = easy, صعبة = difficult, ولكن = but." },
    { d:3, k:"mcq", q:"How does a girl say 'I am a student in Grade 7'?", o:["أنا طالبة في الصف السابع","أنا طالب في الصف السابع","أنا معلمة في الصف السابع","أنا في السابعة"], a:0, x:"طالبة (feminine). الصف السابع = Grade 7." }
  ]);
  P("food", [
    { d:1, k:"mcq", q:"What is تفاحة ?", o:["An apple","A banana","An orange","A grape"], a:0, x:"تفاحة = apple. موزة = banana. برتقالة = orange." },
    { d:1, k:"mcq", q:"What is عصير ?", o:["Juice","Water","Tea","Milk"], a:0, x:"عصير = juice. ماء = water. شاي = tea." },
    { d:1, k:"mcq", q:"What is عشاء ?", o:["Dinner","Breakfast","Lunch","Snack"], a:0, x:"فطور breakfast، غداء lunch، عشاء dinner." },
    { d:2, k:"mcq", q:"What does أحب الدجاج mean?", o:["I like chicken.","I don't like chicken.","I want fish.","Chicken is hot."], a:0, x:"أحب = I like. الدجاج = chicken." },
    { d:2, k:"mcq", q:"What does أنا عطشان mean (said by a boy)?", o:["I am thirsty.","I am hungry.","I am full.","I am tired."], a:0, x:"عطشان (boy) / عطشانة (girl) = thirsty." },
    { d:2, k:"mcq", q:"How do you say 'I want water, please'?", o:["أريد ماء من فضلك","أحب الماء","لا أريد ماء","الماء بارد"], a:0, x:"أريد = I want. من فضلك = please." },
    { d:2, k:"mcq", q:"What does خبز وجبن mean?", o:["Bread and cheese","Rice and meat","Fish and chips","Milk and eggs"], a:0, x:"خبز = bread. جبن = cheese. و = and." },
    { d:3, k:"mcq", q:"What does الطعام لذيذ جداً mean?", o:["The food is very delicious.","The food is cold.","I am very hungry.","The food is expensive."], a:0, x:"لذيذ = delicious. جداً = very." },
    { d:3, k:"mcq", q:"In a restaurant, what does ماذا تريد أن تأكل؟ mean?", o:["What do you want to eat?","What do you want to drink?","Where do you want to sit?","How much is it?"], a:0, x:"ماذا = what. تريد = you want. أن تأكل = to eat." },
    { d:3, k:"mcq", q:"Which sentence means 'I eat breakfast at seven o'clock'?", o:["أتناول الفطور في الساعة السابعة","أتناول العشاء في الساعة السابعة","أشرب الشاي في الساعة السابعة","الفطور في السابعة لذيذ"], a:0, x:"أتناول = I have/eat. الفطور = breakfast. الساعة السابعة = seven o'clock." }
  ]);
  P("weather", [
    { d:1, k:"mcq", q:"What does بارد mean?", o:["Cold","Hot","Windy","Rainy"], a:0, x:"بارد = cold. حار = hot." },
    { d:1, k:"mcq", q:"Which word means 'summer'?", o:["الصيف","الشتاء","الربيع","الخريف"], a:0, x:"الصيف summer، الشتاء winter، الربيع spring، الخريف autumn." },
    { d:1, k:"mcq", q:"What does اليوم mean?", o:["Today","Tomorrow","Yesterday","Week"], a:0, x:"اليوم today، غداً tomorrow، أمس yesterday." },
    { d:2, k:"mcq", q:"What does الجو غائم mean?", o:["The weather is cloudy.","The weather is sunny.","It is snowing.","It is hot."], a:0, x:"غائم = cloudy. مشمس = sunny." },
    { d:2, k:"mcq", q:"Which season is الخريف ?", o:["Autumn","Spring","Winter","Summer"], a:0, x:"الخريف = autumn." },
    { d:2, k:"mcq", q:"What does الساعة الثالثة mean?", o:["It is three o'clock.","It is half past three.","It is a quarter past three.","It is thirteen o'clock."], a:0, x:"الساعة + ordinal number: الثالثة = the third → three o'clock." },
    { d:2, k:"mcq", q:"What does فيه رياح قوية mean?", o:["There are strong winds.","There is heavy rain.","It is very hot.","There is fog."], a:0, x:"رياح = winds. قوية = strong." },
    { d:3, k:"mcq", q:"What does الساعة الرابعة والربع mean?", o:["Quarter past four","Quarter to four","Half past four","Four o'clock"], a:0, x:"والربع = and a quarter. والنصف = and a half. إلا ربع = quarter to." },
    { d:3, k:"mcq", q:"What does سيكون الجو ممطراً غداً mean?", o:["It will be rainy tomorrow.","It was rainy yesterday.","It is raining now.","It never rains."], a:0, x:"سـ + verb shows the future: سيكون = it will be." },
    { d:3, k:"mcq", q:"Which sentence describes winter in the UAE well?", o:["في الشتاء الجو معتدل ولطيف","في الشتاء الجو حار جداً","في الشتاء يسقط الثلج في دبي","الشتاء أطول فصل"], a:0, x:"UAE winters are mild and pleasant (معتدل ولطيف); snow doesn't fall in Dubai." }
  ]);
})(window.STUDY = window.STUDY || {});
