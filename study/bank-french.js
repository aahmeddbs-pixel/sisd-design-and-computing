/* Study Plus · French · question bank for new challenge sets (d: 1 Core, 2 Extended, 3 Challenge). Numbers also get fresh generated questions. */
(function(S){
  const P = (id, L) => { const t = S.french && S.french.topics.find(x => x.id === id); if (t) t.pool = (t.pool || []).concat(L); };
  P("greetings", [
    { d:1, k:"mcq", q:"What does 'Bonsoir' mean?", o:["Good evening","Good morning","Goodbye","Good night"], a:0, x:"Bonsoir = good evening. Bonjour = hello / good morning. Bonne nuit = good night." },
    { d:1, k:"mcq", q:"How do you say 'See you soon'?", o:["À bientôt","Bonjour","Merci","Pardon"], a:0, x:"À bientôt = see you soon. À demain = see you tomorrow." },
    { d:1, k:"text", q:"Type the French for 'yes'.", a:["oui"], x:"Oui = yes. Non = no." },
    { d:2, k:"mcq", q:"How do you ask a friend 'How old are you?'", o:["Tu as quel âge ?","Tu t'appelles comment ?","Où habites-tu ?","Ça va ?"], a:0, x:"In French you 'have' years: J'ai douze ans. Tu as quel âge ?" },
    { d:2, k:"mcq", q:"Which means 'I speak English and French'?", o:["Je parle anglais et français.","Je suis anglais et français.","J'ai anglais et français.","Je parles anglais et français."], a:0, x:"Parler (to speak) with je → je parle. Languages take no capital letter in French." },
    { d:2, k:"mcq", q:"'Je suis né le 3 mars.' What does it mean?", o:["I was born on 3 March.","I am 3 years old.","I live in March.","It is 3 o'clock."], a:0, x:"Je suis né(e) = I was born. A girl writes 'née'." },
    { d:2, k:"text", q:"Complete with the right verb: 'Je ___ Mikaeel.' (I'm called Mikaeel) — type: m'appelle", a:["m'appelle","m’appelle"], x:"Je m'appelle = I am called / my name is." },
    { d:3, k:"mcq", q:"Choose the correct sentence: 'She is Emirati.'", o:["Elle est émirienne.","Elle est émirien.","Il est émirienne.","Elle es émirienne."], a:0, x:"Nationalities agree with the person: émirien (m), émirienne (f)." },
    { d:3, k:"mcq", q:"Which question uses inversion correctly?", o:["Comment t'appelles-tu ?","Comment tu-appelles ?","Appelles comment tu ?","Tu comment t'appelles ?"], a:0, x:"Inversion swaps the pronoun and verb with a hyphen: t'appelles-tu ?" },
    { d:3, k:"mcq", q:"How do you introduce a friend formally: 'I'd like to introduce Sara.'", o:["Je vous présente Sara.","Je suis Sara.","Je m'appelle Sara.","Tu es Sara."], a:0, x:"Présenter = to introduce. Je vous présente… is polite; Je te présente… is informal." }
  ]);
  P("numbers", [
    { d:1, k:"mcq", q:"Which month is 'juillet'?", o:["July","June","January","April"], a:0, x:"Juin = June, juillet = July. Months have no capital letter in French." },
    { d:1, k:"mcq", q:"'Il est midi.' What time is it?", o:["12 noon","Midnight","12:30","Half past one"], a:0, x:"Midi = midday. Minuit = midnight." },
    { d:2, k:"mcq", q:"'Il est trois heures et quart.' What time is it?", o:["3:15","3:45","2:45","3:30"], a:0, x:"Et quart = quarter past. Moins le quart = quarter to." },
    { d:2, k:"mcq", q:"How do you say 'my birthday is on 25 December'?", o:["Mon anniversaire est le vingt-cinq décembre.","Mon anniversaire est le décembre vingt-cinq.","Mon anniversaire est vingt-cinq de décembre.","Mon anniversaire le vingt-cinq."], a:0, x:"French dates: le + number + month." },
    { d:3, k:"mcq", q:"'Il est vingt heures trente.' What time is it on a 12-hour clock?", o:["8:30 pm","10:30 pm","8:30 am","12:30 pm"], a:0, x:"The 24-hour clock is common in French: 20 h 30 = 8:30 pm." },
    { d:3, k:"mcq", q:"Which date is written correctly in French?", o:["le premier janvier","le un janvier","le première janvier","le janvier premier"], a:0, x:"For the 1st, French uses 'premier'. Other dates use normal numbers: le deux, le trois…" }
  ]);
  P("family", [
    { d:1, k:"mcq", q:"What does 'la sœur' mean?", o:["Sister","Brother","Aunt","Mother"], a:0, x:"La sœur = sister. Le frère = brother." },
    { d:1, k:"mcq", q:"What does 'J'ai les yeux bleus' mean?", o:["I have blue eyes.","I have blue hair.","I am blue.","My eyes are big."], a:0, x:"Les yeux = eyes. Les cheveux = hair." },
    { d:1, k:"text", q:"Type the French for 'my father' (mon ___).", a:["mon père","mon pere","père","pere"], prefix:"mon ", best:"père", x:"Le père = father, so 'mon père'. La mère = mother, so 'ma mère'." },
    { d:2, k:"mcq", q:"Choose the right possessive: '___ parents sont gentils.' (my)", o:["Mes","Mon","Ma","Me"], a:0, x:"Plural nouns take 'mes' whatever their gender." },
    { d:2, k:"mcq", q:"Choose the correct form: 'Mon frère a les cheveux ___.' (short)", o:["courts","courte","court","courtes"], a:0, x:"Les cheveux is masculine plural, so the adjective takes -s: courts." },
    { d:2, k:"mcq", q:"What does 'Elle est fille unique' mean?", o:["She is an only child.","She is a unique girl.","She has one sister.","She is the oldest."], a:0, x:"Fils unique / fille unique = only child." },
    { d:2, k:"mcq", q:"How do you say 'his sister' (Ali's sister)?", o:["sa sœur","son sœur","ses sœur","sa frère"], a:0, x:"The possessive agrees with the noun (sœur is feminine): sa sœur, whoever owns her." },
    { d:3, k:"mcq", q:"Choose the correct sentence: 'My grandmother is old but very active.'", o:["Ma grand-mère est vieille mais très active.","Mon grand-mère est vieux mais très actif.","Ma grand-mère est vieux mais très actif.","Ma grand-mère est vieille mais très actif."], a:0, x:"Feminine forms: vieille, active. Grand-mère takes 'ma'." },
    { d:3, k:"mcq", q:"Which adjective is irregular in the feminine?", o:["beau → belle","grand → grande","petit → petite","noir → noire"], a:0, x:"Beau becomes belle; most adjectives just add -e." },
    { d:3, k:"mcq", q:"Translate: 'We get on well with our cousins.'", o:["Nous nous entendons bien avec nos cousins.","Nous entendons bien nos cousins.","Nous sommes bien avec notre cousins.","On s'entend bien avec notre cousins."], a:0, x:"S'entendre bien avec = to get on well with. 'Nos' is plural of 'notre'." }
  ]);
  P("routine", [
    { d:1, k:"mcq", q:"What does 'le déjeuner' mean in France?", o:["Lunch","Breakfast","Dinner","Snack"], a:0, x:"Le petit-déjeuner = breakfast, le déjeuner = lunch, le dîner = dinner." },
    { d:1, k:"mcq", q:"What is 'les sciences'?", o:["Science","History","Art","Sport"], a:0, x:"School subjects: les maths, l'anglais, l'histoire, les sciences, l'EPS (PE)." },
    { d:1, k:"text", q:"Conjugate 'jouer' with 'je': je ______", a:["joue"], prefix:"je ", x:"-er verbs with je end in -e: je joue." },
    { d:2, k:"mcq", q:"What does 'Je me couche à dix heures' mean?", o:["I go to bed at ten.","I get up at ten.","I wash at ten.","I eat at ten."], a:0, x:"Se coucher = to go to bed. Se lever = to get up." },
    { d:2, k:"mcq", q:"Choose the correct form: 'Vous ___ le français.' (étudier)", o:["étudiez","étudions","étudient","étudie"], a:0, x:"-er verbs with vous end in -ez: vous étudiez." },
    { d:2, k:"mcq", q:"Choose the correct form of 'faire': 'Nous ___ nos devoirs.'", o:["faisons","faites","font","fais"], a:0, x:"Faire: je fais, tu fais, il fait, nous faisons, vous faites, ils font." },
    { d:2, k:"mcq", q:"How do you say 'I prefer art because it is creative'?", o:["Je préfère le dessin parce que c'est créatif.","Je préfère le dessin car c'est ennuyeux.","Je déteste le dessin parce que c'est créatif.","J'aime le dessin mais c'est créatif."], a:0, x:"Parce que / car = because. Créatif = creative." },
    { d:3, k:"mcq", q:"Choose the correct reflexive form: 'Elle ___ les dents.' (to brush)", o:["se brosse","me brosse","te brosses","nous brossons"], a:0, x:"Reflexive pronoun for elle is 'se': elle se brosse les dents." },
    { d:3, k:"mcq", q:"Which sentence is in the near future?", o:["Demain, je vais faire du vélo.","Hier, j'ai fait du vélo.","Je fais du vélo.","Je faisais du vélo."], a:0, x:"Near future = aller (present) + infinitive: je vais faire." },
    { d:3, k:"mcq", q:"Make it negative: 'Nous nous levons tôt.'", o:["Nous ne nous levons pas tôt.","Nous nous ne levons pas tôt.","Ne nous levons pas nous tôt.","Nous nous levons ne pas tôt."], a:0, x:"With reflexive verbs, 'ne' goes before the reflexive pronoun and 'pas' after the verb." }
  ]);
  P("food", [
    { d:1, k:"mcq", q:"What is 'le poulet'?", o:["Chicken","Fish","Bread","Cheese"], a:0, x:"Le poulet = chicken. Le poisson = fish. Le fromage = cheese." },
    { d:1, k:"mcq", q:"What is 'un gâteau'?", o:["A cake","A glass","A fork","An apple"], a:0, x:"Un gâteau = a cake." },
    { d:1, k:"mcq", q:"What does 'J'ai faim' mean?", o:["I am hungry.","I am thirsty.","I am full.","I am tired."], a:0, x:"In French you 'have' hunger: j'ai faim. J'ai soif = I'm thirsty." },
    { d:2, k:"mcq", q:"Choose the correct article: 'Je voudrais ___ salade.' (some)", o:["de la","du","des","de l'"], a:0, x:"Salade is feminine: de la salade." },
    { d:2, k:"mcq", q:"Choose the correct article: 'Il mange ___ riz.' (some)", o:["du","de la","des","de"], a:0, x:"Riz is masculine: du riz." },
    { d:2, k:"mcq", q:"How do you say 'The bill, please'?", o:["L'addition, s'il vous plaît.","Le menu, merci.","La table, s'il vous plaît.","Bon appétit."], a:0, x:"L'addition = the bill." },
    { d:2, k:"mcq", q:"What does 'un kilo de tomates' mean?", o:["a kilo of tomatoes","a few tomatoes","a can of tomatoes","tomato soup"], a:0, x:"After quantities, 'de' is used alone: un kilo de, une bouteille de, un paquet de." },
    { d:3, k:"mcq", q:"Make it negative: 'Je bois du lait.'", o:["Je ne bois pas de lait.","Je ne bois pas du lait.","Je bois pas lait.","Je ne bois du lait pas."], a:0, x:"After a negative, du / de la / des become 'de'." },
    { d:3, k:"mcq", q:"Translate: 'I would like a chocolate ice cream.'", o:["Je voudrais une glace au chocolat.","Je veux un glace de chocolat.","J'aime une glace chocolat.","Je voudrais un chocolat glace."], a:0, x:"Flavours use 'à la / au': une glace au chocolat, une tarte aux pommes." },
    { d:3, k:"mcq", q:"'Pour moi, le poisson grillé avec des légumes.' Who would say this?", o:["A customer ordering in a restaurant","A shopkeeper","A chef reading a recipe","A teacher"], a:0, x:"'Pour moi…' is a natural way to order: For me, grilled fish with vegetables." }
  ]);
  P("town", [
    { d:1, k:"mcq", q:"What is 'la gare'?", o:["The train station","The beach","The bank","The garden"], a:0, x:"La gare = train station. La gare routière = bus station." },
    { d:1, k:"mcq", q:"What does 'à gauche' mean?", o:["On the left","On the right","Straight on","Behind"], a:0, x:"À gauche = left. À droite = right. Tout droit = straight on." },
    { d:1, k:"mcq", q:"What is 'la piscine'?", o:["The swimming pool","The library","The shop","The school"], a:0, x:"La piscine = swimming pool. La bibliothèque = library." },
    { d:2, k:"mcq", q:"Choose the correct form: 'Je vais ___ piscine.'", o:["à la","au","aux","à le"], a:0, x:"À + la = à la (feminine). À + le = au. À + les = aux." },
    { d:2, k:"mcq", q:"How do you ask 'Where is the bank?'", o:["Où est la banque ?","Qui est la banque ?","Quand est la banque ?","Comment est la banque ?"], a:0, x:"Où = where. Où est… ? = Where is…?" },
    { d:2, k:"mcq", q:"What does 'à côté de l'hôpital' mean?", o:["next to the hospital","opposite the hospital","behind the hospital","far from the hospital"], a:0, x:"À côté de = next to. En face de = opposite. Derrière = behind." },
    { d:2, k:"mcq", q:"What does 'C'est loin ?' mean?", o:["Is it far?","Is it near?","Is it open?","Is it big?"], a:0, x:"Loin = far. Près = near." },
    { d:3, k:"mcq", q:"Translate: 'In my town there are lots of shops but there isn't a museum.'", o:["Dans ma ville il y a beaucoup de magasins mais il n'y a pas de musée.","Dans ma ville il y a beaucoup des magasins mais il y a pas un musée.","Ma ville a magasins mais pas musée.","Dans ma ville il est beaucoup de magasins."], a:0, x:"Beaucoup de (not des). After 'il n'y a pas', un/une become 'de'." },
    { d:3, k:"mcq", q:"Choose the correct sentence: 'We are going to the shops.'", o:["Nous allons aux magasins.","Nous allons au magasins.","Nous allons à les magasins.","Nous allez aux magasins."], a:0, x:"À + les = aux; nous allons." },
    { d:3, k:"mcq", q:"Which sentence gives a balanced opinion?", o:["J'aime mon quartier car c'est calme, mais il n'y a rien pour les jeunes.","Mon quartier.","C'est une ville.","J'habite ici."], a:0, x:"Give an opinion, a reason (car), and a contrast (mais) to show range." }
  ]);
  P("past", [
    { d:1, k:"mcq", q:"What does 'J'ai mangé une pizza' mean?", o:["I ate a pizza.","I eat a pizza.","I will eat a pizza.","I like pizza."], a:0, x:"Passé composé = avoir/être + past participle: j'ai mangé = I ate / I have eaten." },
    { d:1, k:"mcq", q:"What is the past participle of 'finir'?", o:["fini","finé","finu","finit"], a:0, x:"-ir verbs: drop -ir, add -i: finir → fini." },
    { d:1, k:"text", q:"Give the past participle of 'jouer'.", a:["joué","joue"], best:"joué", x:"-er verbs: drop -er, add -é: jouer → joué." },
    { d:2, k:"mcq", q:"What is the past participle of 'voir'?", o:["vu","voi","voiré","vit"], a:0, x:"Voir is irregular: j'ai vu = I saw." },
    { d:2, k:"mcq", q:"Which verb takes 'être' in the passé composé?", o:["partir","manger","regarder","finir"], a:0, x:"Verbs of movement like aller, venir, partir, arriver, sortir take être." },
    { d:2, k:"mcq", q:"Choose the correct form: 'Elles ___ allées au parc.'", o:["sont","ont","est","sommes"], a:0, x:"Aller takes être; with elles, the participle agrees: elles sont allées." },
    { d:2, k:"mcq", q:"What does 'Le week-end dernier' mean?", o:["Last weekend","Next weekend","Every weekend","This weekend"], a:0, x:"Dernier = last. Prochain = next." },
    { d:3, k:"mcq", q:"Choose the correct sentence: 'Sara went out with her friends.'", o:["Sara est sortie avec ses amies.","Sara a sorti avec ses amies.","Sara est sorti avec ses amies.","Sara sort avec ses amies."], a:0, x:"Sortir takes être, so the participle agrees with Sara: sortie." },
    { d:3, k:"mcq", q:"What is the past participle of 'boire'?", o:["bu","boiré","bois","bue only"], a:0, x:"Boire → bu: j'ai bu un jus d'orange." },
    { d:3, k:"mcq", q:"Which sentence shows three time frames (past, present, future)?", o:["Hier j'ai joué au foot, aujourd'hui je joue au tennis et demain je vais nager.","Hier j'ai joué au foot.","Je joue au foot et au tennis.","Demain je vais nager."], a:0, x:"Using past, present and near future shows a high level of language." }
  ]);
})(window.STUDY = window.STUDY || {});
