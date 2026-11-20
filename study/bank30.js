/* Study Plus (MYP 2) · extra revision questions, so every topic has at least 30. Same line format as uk/bank30-sci.js.
   Appended to the END of each topic's pool (pools are append-only). */
(function(){
window.SPBANK = window.SPBANK || function(U, key, txt){ const [s, t] = key.split("/"), S = U && U[s]; if (!S || !S.topics) return; const T = S.topics.find(x => x && x.id === t); if (!T) return; T.pool = T.pool || [];
  txt.trim().split("\n").forEach(l => { l = l.trim(); if (!l) return; const f = l.split("|"), k = f[0][0], d = +f[0].slice(1) || 1; let q = null;
    if (k === "m") q = { d, k:"mcq", q:f[1], o:f.slice(2, -1), a:0, x:f[f.length - 1] };
    else if (k === "n"){ const [v, tol] = f[2].split("~"); q = { d, k:"num", q:f[1], a:+v, x:f[3] }; if (tol) q.tol = +tol; }
    else if (k === "t") q = { d, k:"tf", q:f[1], a:f[2] === "T", x:f[3] };
    else if (k === "x"){ const a = f[2].split("/"); q = { d, k:"text", q:f[1], a:a.concat(a.map(v => v.toLowerCase())), best:a[0], x:f[3] }; }
    if (q && q.q) T.pool.push(q); }); };
const B = (k, t) => window.SPBANK(window.STUDY, k, t);

B("english/grammar", `
m1|Which word is an adjective in: "The ancient castle stood alone."?|ancient|castle|stood|alone|Adjectives describe nouns.
m1|Which is a collective noun?|flock|sheep|run|happy|A word for a group.
m2|Which sentence uses the present perfect tense?|I have finished my homework.|I finished my homework.|I finish my homework.|I will finish my homework.|Have/has + past participle.
m2|Which sentence is a command (imperative)?|Close the door.|The door is closed.|Is the door closed?|What a door!|Commands start with a verb.
m2|In "She sings beautifully", what does 'beautifully' modify?|sings|She|nothing|the song|Adverbs modify verbs.
m3|Which sentence uses a relative clause?|The girl who won the race is my cousin.|The girl won the race.|The girl, tired, won.|Win the race!|'Who won the race' adds information.
m3|Which is the active voice?|The chef cooked the meal.|The meal was cooked by the chef.|The meal was cooked.|The meal has been cooked.|The subject does the action.
m3|Which word is a determiner?|several|quickly|ran|beside|Determiners come before nouns.
m3|What is the object in "Maya kicked the ball"?|the ball|Maya|kicked|nothing|The object receives the action.
t2|'Their', 'there' and 'they're' are homophones.|T|Same sound, different meanings.
`);
B("english/punctuation", `
m1|Which needs an apostrophe for possession?|the dog's bone|the dogs bark|two dogs run|dogs are fun|The bone belongs to the dog.
m1|Which sentence is punctuated correctly?|Where are you going?|Where are you going.|Where are you going!|where are you going?|Questions need a question mark and a capital.
m2|Which shows the bags belonging to several girls?|the girls' bags|the girl's bags|the girls bags'|the girls's bags|Plural ending in s → apostrophe after s.
m2|Which is the correct contraction of 'it is'?|it's|its|its'|it is'|Its (no apostrophe) means 'belonging to it'.
m2|Which uses a semicolon correctly?|I love maths; it's my favourite subject.|I love; maths it's my favourite.|I; love maths.|I love maths it's; my favourite.|It joins two linked main clauses.
m2|Which uses a colon correctly?|Bring these: water, a hat and sun cream.|Bring: these water.|Bring these water: a hat.|Bring these water, a: hat.|Colon introduces a list.
m3|Which uses ellipsis for suspense?|The door slowly opened… and then silence.|The door… slowly… opened…|…The door opened.|The door opened…!|Ellipsis creates a pause.
m3|Which is correct?|The children's toys were everywhere.|The childrens' toys were everywhere.|The childrens toys were everywhere.|The children toy's were everywhere.|'Children' is already plural.
m3|Which uses a hyphen correctly?|a well-known author|a well known-author|a-well known author|a well known author-|Hyphens join compound adjectives.
t2|An exclamation mark can show surprise or strong emotion.|T|Use them sparingly.
`);
B("english/figurative", `
m1|What is a simile?|A comparison using 'like' or 'as'|A comparison without 'like' or 'as'|A sound word|A repeated letter|E.g. as brave as a lion.
m2|Which is alliteration?|Six slippery snails slid slowly.|The sun smiled.|He's a rock.|Bang!|Repeated starting sounds.
m2|Which is a metaphor?|Time is a thief.|Time is like a thief.|Time flies like an arrow.|Tick tock.|It says time IS a thief.
m2|What is an idiom?|A phrase whose meaning isn't literal|A rhyme|A comparison|A question|E.g. 'It's raining cats and dogs.'
m3|What is the effect of 'the leaves danced in the wind'?|Personification makes the scene lively and joyful|It shows leaves can dance|It's a simile|It's onomatopoeia|Human action given to leaves.
m3|What is an oxymoron?|Two opposite words together|A big exaggeration|A sound word|A comparison|E.g. 'deafening silence'.
t2|'The thunder grumbled' is personification.|T|Grumbling is a human action.
`);
B("english/persuasive", `
m1|What is the purpose of persuasive writing?|To convince the reader to agree or act|To tell a story|To describe a place|To give instructions|Adverts, speeches, letters.
m2|What does AFOREST stand for?|Persuasive techniques: Alliteration, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triplets|A forest|A story plan|A grammar rule|A memory aid.
m2|Which is emotive language?|Innocent animals are suffering terribly.|Animals live in zoos.|There are 50 animals.|Zoos open at 9.|Emotive words stir feelings.
m2|Which uses direct address?|You can make a difference today.|People can make a difference.|It makes a difference.|Differences exist.|'You' speaks to the reader.
m3|Why use a counter-argument?|To show you've considered other views and then rebut them|To agree with the other side|To fill space|To confuse|It makes your case stronger.
m3|Which is the strongest persuasive opening?|Imagine a world without clean water.|Water is important.|This is about water.|I will talk about water.|A vivid hook.
m3|What is a 'call to action'?|Telling the reader what to do next|A phone call|A question|A summary|E.g. 'Sign the petition today!'
t2|Statistics can make an argument seem more reliable.|T|Check the source, though.
`);
B("english/reading", `
m2|What is the 'main idea' of a text?|The most important point the writer makes|The first sentence|The longest paragraph|The title only|Supporting details back it up.
m2|What is skimming?|Reading quickly for the general idea|Reading every word slowly|Looking for one fact|Reading aloud|Scanning looks for specific details.
m3|What is a 'bias' in a text?|An unfair preference for one side|A fact|A picture|A heading|Look for one-sided language.
m3|Which question asks for inference?|Why do you think the character hesitated?|What colour was the door?|How many people were there?|What is the title?|Inference = reading between the lines.
t2|Scanning means looking quickly for specific information.|T|E.g. a date or a name.
`);
B("english/vocab", `
m2|What does the prefix 'mis-' mean in 'misunderstand'?|wrongly|again|before|not|Mis- = wrongly.
m3|What does the root 'bio' mean in 'biology' and 'biography'?|life|book|water|light|Greek 'bios' = life.
t2|The suffix '-less' means 'without'.|T|E.g. careless, hopeless.
`);
B("english/writing", `
m1|What is the purpose of a topic sentence?|It introduces the main idea of a paragraph|It ends the essay|It's a quotation|It's the title|Usually the first sentence.
m1|What does 'register' mean in writing?|How formal or informal the language is|The handwriting|The length|The font|Match it to audience and purpose.
m2|Which is formal register?|We regret to inform you that the event is cancelled.|Sorry, the thing's off!|Nope, not happening.|Event's cancelled lol.|Formal writing avoids slang.
m2|What does a conclusion do?|Sums up the main points and gives a final thought|Introduces new ideas|Lists sources|Repeats the title|Leave a strong final impression.
m2|What are discourse markers?|Words that link ideas, like 'however' and 'firstly'|Spelling words|Punctuation marks|Headings|They guide the reader.
m2|Which discourse marker shows contrast?|However|Furthermore|Firstly|Additionally|Others: on the other hand, although.
m3|Why should paragraphs link to each other?|To create a clear, logical flow|To make it longer|To repeat ideas|It isn't needed|Cohesion helps the reader.
m3|What is the best way to plan an essay?|Note main points, order them logically, then write|Start writing immediately|Write the conclusion first only|Copy a model|Plans prevent rambling.
m3|What is an anecdote?|A short personal story used to make a point|A list of facts|A quotation|A rhetorical question|It engages readers.
m3|Why proofread?|To correct errors in spelling, punctuation and grammar|To make it longer|To change topics|It isn't useful|Read it aloud slowly.
t2|An informal email to a friend can use contractions like 'I'm' and 'don't'.|T|Formal letters usually avoid them.
`);

B("science/mixtures", `
m1|What is a mixture?|Two or more substances not chemically joined|A pure element|A compound|A single substance|They can be separated physically.
m1|Which method separates sand from water?|Filtration|Evaporation|Distillation|Chromatography|Sand is insoluble.
m2|Which method gets salt from salt water?|Evaporation|Filtration|Magnetism|Sieving|The water evaporates, leaving salt.
m2|Which method gets pure water from sea water?|Distillation|Filtration|Chromatography|Sieving|Evaporate then condense.
m2|What does chromatography separate?|Different dyes or colours in a mixture|Sand and water|Iron and sulfur|Oil and water|Inks travel up paper at different rates.
m2|What is a solvent?|The liquid a solute dissolves in|The substance that dissolves|A mixture|A solid|Water is a common solvent.
m3|Why does stirring help sugar dissolve faster?|It brings fresh solvent into contact with the solute|It heats the water|It makes sugar smaller|It removes water|Particles spread out faster.
m3|What is a saturated solution?|One where no more solute can dissolve|A very dilute solution|A pure liquid|A suspension|Heating often lets more dissolve.
m3|How could you separate iron filings from sand?|Use a magnet|Filter|Evaporate|Distil|Iron is magnetic.
t2|An alloy is a mixture of a metal with other elements.|T|E.g. steel, brass.
`);
B("science/body", `
m2|Which organ removes waste from the blood and makes urine?|Kidneys|Liver|Lungs|Stomach|Urine is stored in the bladder.
m2|What is the role of the skeleton?|Support, protection and movement|Digestion|Breathing|Making hormones|Bones also make blood cells.
m3|Why do we breathe faster during exercise?|Muscles need more oxygen and must get rid of more CO₂|To cool down|To slow the heart|To digest food|Respiration speeds up.
t2|The heart has four chambers.|T|Two atria and two ventricles.
`);
B("science/waves", `
m2|What is the speed of sound in air (approximately)?|340 m/s|3 m/s|300 000 km/s|34 m/s|Light is much faster.
m2|What does a prism do to white light?|Splits it into a spectrum of colours|Makes it brighter|Turns it into sound|Absorbs all of it|This is dispersion.
m3|Why does a straw look bent in water?|Light refracts as it changes speed between water and air|Water bends straws|Reflection|The straw is bent|Refraction changes direction.
m3|Why does a red apple look red?|It reflects red light and absorbs other colours|It makes red light|It absorbs red light|It reflects all colours|Colour depends on reflected light.
m3|What is the law of reflection?|Angle of incidence = angle of reflection|Light always bends|Light stops at mirrors|Angles add to 180°|Measured from the normal.
t2|Ultrasound has a frequency above 20 000 Hz.|T|It's used for baby scans.
`);

B("ins/climate", `
m1|What is climate?|The average weather of a place over many years|Today's weather|Rain only|Temperature now|Weather is day to day.
m2|Which climate zone is hot all year near the equator?|Tropical|Polar|Temperate|Tundra|The UAE is arid (desert).
m2|What is an arid climate?|Very dry with little rain|Very wet|Cold and snowy|Mild and rainy|E.g. the UAE.
m3|Why are places near the equator hotter?|The Sun's rays are more direct and concentrated|They're closer to the Sun|They have more people|They're higher up|Sunlight spreads out more near the poles.
m3|How does altitude affect temperature?|It gets colder as height increases|It gets hotter|No effect|Only at the poles|About 6.5 °C cooler per 1000 m.
m3|What does a climate graph show?|Average monthly temperature and rainfall|Daily weather|Population|Wind direction only|Bars for rain, a line for temperature.
t2|Coastal areas usually have milder temperatures than inland areas.|T|The sea heats and cools slowly.
`);
B("ins/civilisations", `
m2|Which river was central to Ancient Egyptian civilisation?|The Nile|The Tigris|The Indus|The Amazon|Floods brought fertile soil.
m2|Where was Mesopotamia?|Between the Tigris and Euphrates rivers|In Egypt|In China|In Greece|Today mostly Iraq.
m3|Why did early civilisations grow near rivers?|Water for farming, drinking and transport|Rivers were cold|For mountains|For deserts|Farming surpluses allowed cities to grow.
t2|Cuneiform was an early writing system from Mesopotamia.|T|Wedge-shaped marks on clay tablets.
`);
B("ins/uae", `
m1|In which year was the UAE founded?|1971|1951|1991|1981|2 December 1971, National Day.
m1|How many emirates make up the UAE?|Seven|Five|Six|Nine|Ras Al Khaimah joined in 1972.
m1|What is the capital of the UAE?|Abu Dhabi|Dubai|Sharjah|Al Ain|Abu Dhabi is the largest emirate.
m2|Who was the founding father and first President of the UAE?|Sheikh Zayed bin Sultan Al Nahyan|Sheikh Rashid bin Saeed Al Maktoum|Sheikh Khalifa|Sheikh Mohammed|He led the union in 1971.
m2|What was pearl diving?|A traditional industry collecting pearls from the Gulf seabed|A sport|A festival|A type of boat race|It declined after cultured pearls appeared.
m2|What is a 'dhow'?|A traditional wooden sailing boat|A desert tent|A coffee pot|A type of falcon|Used for trade and pearling.
m3|Why was the discovery of oil important for the UAE?|It funded rapid development of cities, schools and hospitals|It ended trade|It reduced the population|It stopped tourism|Oil was found in Abu Dhabi in 1958.
m3|What is a falaj?|A traditional irrigation channel system|A fort|A desert wind|A market|Used to bring water to farms, e.g. in Al Ain.
t2|Arabic is the official language of the UAE.|T|English is widely used too.
`);

B("islamic/pillars", `
m1|What is the first pillar of Islam?|Shahadah (declaration of faith)|Salah|Zakah|Hajj|Belief in one God and that Muhammad ﷺ is His messenger.
m1|How many times a day do Muslims perform the obligatory prayers?|Five|Three|Two|Seven|Fajr, Dhuhr, Asr, Maghrib, Isha.
m2|What is Zakah?|Giving a set portion of wealth to those in need|Fasting|Pilgrimage|Prayer|Usually 2.5% of savings held for a year.
m2|In which month do Muslims fast?|Ramadan|Shawwal|Muharram|Dhul Hijjah|Fasting from dawn to sunset.
m2|Where do Muslims go for Hajj?|Makkah|Madinah|Jerusalem|Cairo|Once in a lifetime if able.
m3|What is the purpose of fasting in Ramadan?|To grow in taqwa (God-consciousness), self-control and empathy|Only to lose weight|To travel|To pray less|The Qur'an mentions taqwa as its aim.
m3|What is the Qiblah?|The direction of the Ka'bah in Makkah that Muslims face in prayer|A prayer mat|A mosque tower|A call to prayer|Mosques have a mihrab showing it.
t2|Hajj takes place in the month of Dhul Hijjah.|T|Eid al-Adha is celebrated at the end of Hajj.
`);
B("islamic/seerah", `
m2|In which city was the Prophet Muhammad ﷺ born?|Makkah|Madinah|Taif|Jerusalem|In the Year of the Elephant.
m3|What was the Hijrah?|The migration of the Prophet ﷺ and Muslims from Makkah to Madinah|A battle|A pilgrimage|A fast|It marks the start of the Islamic calendar.
t2|The first revelation came in the Cave of Hira.|T|The angel Jibril brought the first verses of Surah Al-Alaq.
`);
B("islamic/quran", `
m2|How many surahs are in the Qur'an?|114|99|30|60|Divided into 30 juz'.
m2|Which is the first surah of the Qur'an?|Al-Fatihah|Al-Baqarah|Al-Ikhlas|An-Nas|It is recited in every unit of prayer.
m3|Which is the longest surah?|Al-Baqarah|Al-Fatihah|Yasin|Al-Kahf|It has 286 verses.
m3|What is a 'juz''?|One of 30 equal parts of the Qur'an|A verse|A surah|A chapter title|Helps with reading it in a month.
t2|The Qur'an was revealed over about 23 years.|T|In Makkah and Madinah.
`);
B("islamic/fiqh", `
m2|What is wudu?|Ritual washing before prayer|A type of prayer|A fast|Charity|It includes washing hands, face, arms, wiping head and washing feet.
m2|What does 'halal' mean?|Permitted|Forbidden|Recommended|Disliked|Haram means forbidden.
m3|What is tayammum?|Dry ablution with clean earth when water isn't available|A prayer|A type of fast|A charity|A concession that makes worship easier.
t2|The Friday congregational prayer is called Jumu'ah.|T|It replaces Dhuhr on Fridays.
`);
B("islamic/prophets", `
m1|Which prophet built the Ark?|Nuh (Noah)|Ibrahim|Musa|Yusuf|He called his people for many years.
m1|Which prophet was swallowed by a whale (big fish)?|Yunus (Jonah)|Musa|Isa|Adam|He prayed in the darkness and was saved.
m2|Which prophet was thrown into a well by his brothers?|Yusuf (Joseph)|Musa|Ibrahim|Ismail|He later became a minister in Egypt.
m2|Which prophet received the Tawrah (Torah)?|Musa (Moses)|Isa|Dawud|Ibrahim|Dawud received the Zabur.
m2|Who was the first prophet?|Adam|Nuh|Ibrahim|Muhammad ﷺ|The first human and prophet.
m2|Which prophet rebuilt the Ka'bah with his son Ismail?|Ibrahim (Abraham)|Musa|Nuh|Yusuf|They raised its foundations.
m3|What quality is the story of Prophet Ayyub (Job) best known for?|Patience (sabr) through hardship|Wealth|Strength|Travelling|He stayed thankful despite illness.
m3|Which prophet could understand the speech of animals and controlled the wind?|Sulaiman (Solomon)|Musa|Isa|Yunus|He heard the ant speak.
m3|Which prophet received the Injil (Gospel)?|Isa (Jesus)|Musa|Dawud|Ibrahim|Muslims believe he was a great prophet.
m3|What lesson does the story of Yusuf teach?|Patience, forgiveness and trust in Allah|Revenge|Greed|Pride|He forgave his brothers.
t2|Prophet Muhammad ﷺ is the final prophet in Islam.|T|Called Khatam an-Nabiyyin (Seal of the Prophets).
`);
B("islamic/caliphs", `
m1|Who was the first Rightly Guided Caliph?|Abu Bakr as-Siddiq|Umar|Uthman|Ali|He was the Prophet's ﷺ closest companion.
m1|Who was the second Caliph?|Umar ibn al-Khattab|Abu Bakr|Uthman|Ali|Known as al-Faruq.
m1|Who was the third Caliph?|Uthman ibn Affan|Ali|Umar|Abu Bakr|Known for his generosity.
m1|Who was the fourth Caliph?|Ali ibn Abi Talib|Uthman|Umar|Abu Bakr|The Prophet's ﷺ cousin and son-in-law.
m2|Which Caliph is linked to compiling a standard written copy of the Qur'an sent to different regions?|Uthman|Abu Bakr only|Ali|Umar|Copies were sent to major cities.
m2|What does 'Caliph' (Khalifah) mean?|Successor or leader of the Muslim community|A prophet|A judge only|A soldier|They led after the Prophet ﷺ.
m2|Which Caliph introduced the Islamic (Hijri) calendar dating from the Hijrah?|Umar|Abu Bakr|Uthman|Ali|It starts with the migration to Madinah.
m3|What was Abu Bakr's nickname 'as-Siddiq' about?|He was truthful and believed the Prophet ﷺ immediately|He was rich|He was strong|He was young|Especially after the Night Journey.
m3|What was Umar known for as a leader?|Justice and care for ordinary people|Wealth|Poetry|Building ships|He walked the streets at night to check on people.
m3|About how long did the four Rightly Guided Caliphs rule in total?|About 30 years|About 300 years|About 5 years|About 100 years|From 632 to 661 CE.
m3|Which city was the first capital of the Caliphate?|Madinah|Damascus|Baghdad|Cairo|Ali later moved the capital to Kufa.
t2|The four Rightly Guided Caliphs were all companions of the Prophet ﷺ.|T|They are called al-Khulafa' ar-Rashidun.
`);

B("french/greetings", `
m1|What does 'Bonsoir' mean?|Good evening|Good morning|Goodbye|Good night|Bonne nuit = good night.
m1|What does 'À bientôt' mean?|See you soon|See you tomorrow|Hello|Thank you|À demain = see you tomorrow.
m1|How do you say 'please' (formal)?|S'il vous plaît|S'il te plaît|Merci|De rien|Te plaît is informal.
m2|What does 'Comment ça va ?' mean?|How are you?|What's your name?|Where do you live?|How old are you?|Ça va bien, merci!
m2|What does 'De rien' mean?|You're welcome|Thank you|Sorry|Excuse me|A reply to merci.
m2|Which greeting is used for a teacher?|Bonjour, madame.|Salut, madame!|Coucou!|Ça va, toi?|Use formal language with adults.
m3|How do you say 'Nice to meet you'?|Enchanté(e)|Bon appétit|Bonne chance|Félicitations|Add -e if you are female.
t2|'Salut' can mean both hi and bye between friends.|T|It's informal.
`);
B("french/family", `
m1|What does 'mon frère' mean?|my brother|my father|my uncle|my son|Frère = brother.
m2|What does 'ma demi-sœur' mean?|my half-sister / stepsister|my twin|my cousin|my aunt|Demi = half.
m2|How do you say 'I have two sisters'?|J'ai deux sœurs.|Je suis deux sœurs.|J'ai deux sœur.|J'ai deux frères.|Plural: sœurs.
m3|Translate: 'My grandparents are very kind.'|Mes grands-parents sont très gentils.|Mon grands-parents est gentil.|Mes grands-parents sont très gentil.|Ma grands-parents sont gentils.|Plural possessive and adjective.
m3|What does 'il est fils unique' mean?|He is an only child|He has a son|He is unique|He is my son|Fille unique for a girl.
t2|'Mon chien' means 'my dog'.|T|Un chat = a cat.
`);
B("french/routine", `
m1|What does 'je me lève' mean?|I get up|I go to bed|I wash|I eat|Se lever = to get up.
m1|What does 'je prends le petit-déjeuner' mean?|I have breakfast|I have lunch|I have dinner|I take the bus|Le déjeuner = lunch.
m2|What does 'à sept heures et demie' mean?|at half past seven|at seven fifteen|at quarter to seven|at seven o'clock|Et demie = half past.
m2|What does 'je me brosse les dents' mean?|I brush my teeth|I brush my hair|I wash my face|I get dressed|Les dents = teeth.
m2|What is 'je m'habille'?|I get dressed|I go home|I wake up|I shower|S'habiller.
m3|Translate: 'I go to school by bus.'|Je vais au collège en bus.|Je vais à collège par bus.|Je vais au collège à bus.|Je suis au collège en bus.|En bus/en voiture; à pied.
m3|Which time is 'midi'?|12 noon|midnight|10 o'clock|1 p.m.|Minuit = midnight.
t2|'D'abord' means 'first of all'.|T|Ensuite = then; enfin = finally.
`);
B("french/food", `
m2|What does 'j'ai faim' mean?|I'm hungry|I'm thirsty|I'm full|I'm tired|J'ai soif = I'm thirsty.
m2|How do you order politely in a café?|Je voudrais un jus d'orange, s'il vous plaît.|Donne-moi jus.|Je veux jus!|Jus maintenant.|Je voudrais = I would like.
m3|Which uses the partitive correctly for 'some water'?|de l'eau|du eau|de la eau|des eau|De l' before a vowel.
t2|'L'addition, s'il vous plaît' means 'the bill, please'.|T|Used in restaurants.
`);
B("french/past", `
m2|Which is the passé composé of 'je regarde'?|j'ai regardé|je suis regardé|je regardais|je regarderai|Avoir + past participle.
m3|Translate: 'We went to the beach.'|Nous sommes allés à la plage.|Nous avons allé à la plage.|Nous allons à la plage.|Nous sommes allé plage.|Aller takes être; agreement -s.
t2|'Hier' means 'yesterday'.|T|Le week-end dernier = last weekend.
`);
B("french/verbs", `
m1|What is the tu form of 'être'?|tu es|tu est|tu suis|tu êtes|Je suis, tu es, il est.
m1|What is the vous form of 'avoir'?|vous avez|vous avons|vous êtes|vous ont|Nous avons, vous avez, ils ont.
m2|What is the ils form of 'aller'?|ils vont|ils allent|ils vas|ils allons|Aller is irregular.
m2|Present tense: 'elle (finir)'?|elle finit|elle fini|elle finis|elle finissent|-ir verbs: -is, -is, -it.
m2|Present tense: 'nous (parler)'?|nous parlons|nous parlez|nous parlent|nous parle|-er verbs: -ons for nous.
m3|Present tense: 'ils (prendre)'?|ils prennent|ils prendent|ils prenent|ils prends|Prendre is irregular.
m3|What is the infinitive of 'je peux'?|pouvoir|peux|vouloir|savoir|I can = je peux.
t2|-er verbs are the most common group of French verbs.|T|E.g. parler, manger, jouer.
`);
B("french/hobbies", `
m1|What does 'je lis' mean?|I read|I play|I listen|I cook|Lire = to read.
m2|What does 'j'écoute de la musique' mean?|I listen to music|I play music|I write music|I dance|Écouter = to listen to.
m2|How do you say 'I love dancing'?|J'adore danser.|J'adore la danse faire.|Je danse adore.|J'aime dansé.|Aimer/adorer + infinitive.
m2|What does 'le week-end' mean?|the weekend|the evening|the holidays|the morning|Le samedi = on Saturdays.
m3|Translate: 'I never play tennis.'|Je ne joue jamais au tennis.|Je joue jamais tennis.|Je ne joue pas jamais au tennis.|Je jamais joue au tennis.|Ne … jamais.
m3|What does 'de temps en temps' mean?|from time to time|all the time|never|every day|Souvent = often.
t2|'Je fais de la natation' means 'I go swimming'.|T|Faire de la + activity.
`);

B("arabic/letters", `
m1|How many letters are in the Arabic alphabet?|28|26|30|22|Written from right to left.
m2|In which direction is Arabic written?|Right to left|Left to right|Top to bottom|Bottom to top|Numbers are written left to right.
m3|Which letters do not join to the letter after them?|ا د ذ ر ز و|ب ت ث|ج ح خ|س ش ص|These six only connect from the right.
t2|Arabic letters can change shape depending on their position in a word.|T|Initial, medial, final and isolated forms.
m2|Which letter is the first letter of the Arabic alphabet?|ا (alif)|ب (baa)|ي (yaa)|م (meem)|Alif comes first; yaa is last.
m2|Which letter has three dots above it?|ث (thaa)|ت (taa)|ب (baa)|ن (noon)|Baa has one dot below; taa has two above.
m3|Which short vowel mark is a small diagonal line above a letter?|Fatha (makes an 'a' sound)|Kasra|Damma|Sukun|Kasra is below the letter; damma looks like a small waw.
`);
B("arabic/numbers", `
m1|What is the Arabic word for 'one'?|واحد (wahid)|اثنان (ithnan)|ثلاثة (thalatha)|عشرة (ashara)|Wahid = 1.
m1|What is the Arabic word for 'three'?|ثلاثة (thalatha)|خمسة (khamsa)|سبعة (sab'a)|اثنان (ithnan)|Thalatha = 3.
m2|What is the Arabic word for 'ten'?|عشرة (ashara)|عشرون (ishrun)|تسعة (tis'a)|ثمانية (thamaniya)|Ashara = 10.
m2|Which Arabic numeral is ٥?|5|6|4|0|Eastern Arabic numerals: ٥ = 5.
m2|Which Arabic numeral is ٧?|7|8|6|2|٧ = 7, ٨ = 8.
m3|What is خمسة عشر (khamsata ashar)?|15|5|50|25|Five + ten.
t2|The number zero is written as a dot (٠) in Eastern Arabic numerals.|T|Our word 'zero' comes from Arabic 'sifr'.
`);

B("science/body", `
m1|Which organ is the main organ of the nervous system?|Brain|Heart|Liver|Kidney|The brain and spinal cord form the CNS.
m1|Which blood cells fight infection?|White blood cells|Red blood cells|Platelets|Plasma|They attack pathogens.
m2|What does plasma carry?|Dissolved food, waste, hormones and CO₂|Only oxygen|Only cells|Nothing|Plasma is the liquid part of blood.
m2|Where is food mostly absorbed into the blood?|Small intestine|Stomach|Large intestine|Mouth|Villi increase surface area.
m2|What do tendons connect?|Muscles to bones|Bone to bone|Muscle to muscle|Skin to bone|Ligaments join bone to bone.
m3|Why is the left ventricle wall thicker than the right?|It pumps blood all around the body at higher pressure|It holds more blood|It is older|It pumps to the lungs|The right side only pumps to the lungs.
m3|What is the job of the alveoli?|Gas exchange between air and blood|Filtering blood|Making sound|Digesting food|Thin walls and a large surface area.
`);
B("science/waves", `
m1|What is a luminous object?|One that gives out its own light|One that reflects light|A mirror|A shadow|E.g. the Sun, a bulb.
m2|How is a shadow formed?|An opaque object blocks light|Light bends|Light reflects|Sound stops|Light travels in straight lines.
m2|What does 'opaque' mean?|No light passes through|All light passes through|Some light passes through|It glows|Translucent lets some light through.
m3|What happens to sound in a vacuum?|It cannot travel|It travels faster|It gets louder|It reflects|No particles to vibrate.
`);
B("ins/trade", `
m2|What is an import?|A good or service bought from another country|A good sold abroad|A tax|A factory|Exports are sold abroad.
m2|What is a trade surplus?|Exports are worth more than imports|Imports are worth more|No trade|A tax on trade|A deficit is the opposite.
`);
B("islamic/seerah", `
m2|What was the name of the Prophet's ﷺ first wife?|Khadijah|Aishah|Fatimah|Maryam|She was the first to believe in him.
m2|In which city is the Prophet ﷺ buried?|Madinah|Makkah|Jerusalem|Taif|In the Prophet's Mosque.
m3|What was the Treaty of Hudaybiyyah (628 CE)?|A peace agreement between the Muslims and Quraysh|A battle|The Hijrah|A pilgrimage|It led to many people accepting Islam.
m3|What happened in 630 CE (8 AH)?|The peaceful conquest of Makkah|The first revelation|The Hijrah|The Prophet's ﷺ birth|He forgave the people of Makkah.
`);
B("french/town", `
m1|What does 'la piscine' mean?|the swimming pool|the library|the market|the church|À la piscine = at/to the pool.
m1|What does 'la bibliothèque' mean?|the library|the bookshop|the school|the museum|La librairie = bookshop.
m1|What does 'le marché' mean?|the market|the supermarket|the station|the park|Le supermarché = supermarket.
m2|What does 'tout droit' mean?|straight on|turn right|turn left|go back|Allez tout droit!
m2|What does 'près de' mean?|near|far from|opposite|between|Loin de = far from.
m2|What does 'à côté de' mean?|next to|behind|in front of|under|À côté de la poste = next to the post office.
m3|Translate: 'The bank is opposite the church.'|La banque est en face de l'église.|La banque est à côté de l'église.|La banque est loin l'église.|La banque en face église.|En face de = opposite.
`);
B("french/past", `
m2|What is the past participle of 'boire'?|bu|buvé|boiré|boit|J'ai bu = I drank.
m2|What is the past participle of 'voir'?|vu|voi|voyé|voit|J'ai vu = I saw.
m3|Translate: 'She arrived late.'|Elle est arrivée en retard.|Elle a arrivé en retard.|Elle est arrivé en retard.|Elle arrive en retard.|Être verb + feminine agreement.
`);
B("arabic/letters", `
m1|Which is the last letter of the Arabic alphabet?|ي (yaa)|ا (alif)|و (waw)|ه (haa)|28 letters from alif to yaa.
m2|Which letter has one dot below it?|ب (baa)|ت (taa)|ث (thaa)|ن (noon)|Taa has two dots above.
m3|What does a shadda ( ّ ) show?|The letter is doubled (stressed)|A short 'u' sound|No vowel|A long 'a'|E.g. محمّد.
`);
})();
