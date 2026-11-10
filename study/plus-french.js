/* Study Plus · French · harder tasks for every topic, plus two new MYP 2 topics (d: 1 Core, 2 Extended, 3 Challenge) */
(function(S){
  const F = S.french, T = id => F.topics.find(t => t.id === id);
  T("greetings").tasks.push(
    { d:2, k:"mcq", q:"How do you ask an adult politely 'What is your name?'", o:["Comment tu t'appelles ?","Comment vous appelez-vous ?","Tu t'appelles comment, toi ?","Ça va ?"], a:1, x:"With an adult you don't know, use vous: 'Comment vous appelez-vous ?'" },
    { d:3, k:"mcq", q:"Choose the correct sentence: 'I am Russian and I speak three languages.' (Mikaeel is a boy)", o:["Je suis russe et je parle trois langues.","J'ai russe et je parle trois langues.","Je suis russe et je parles trois langues.","Je russe et parle trois langue."], a:0, x:"Être for nationality (je suis), and parler with je ends in -e (je parle). Langues is plural." },
    { d:3, k:"text", q:"Translate: 'Where do you live?' (to a friend) — Où est-ce que tu ______ ?", a:["habites"], prefix:"Où est-ce que tu ", x:"Habiter with tu ends in -es: tu habites. 'Où est-ce que tu habites ?' = Where do you live?" },
    { d:3, k:"mcq", q:"What does 'Enchanté' mean when you meet someone?", o:["Nice to meet you","Excuse me","See you soon","Good luck"], a:0, x:"'Enchanté(e)' = Pleased / nice to meet you. A girl writes 'enchantée'." }
  );
  T("numbers").tasks.push(
    { d:2, k:"num", q:"Write the number: 'soixante-quinze'", a:75, x:"Soixante-quinze = sixty-fifteen = 75. French counts 70–79 as 60 + 10–19." },
    { d:3, k:"num", q:"Write the number: 'quatre-vingt-dix-sept'", a:97, x:"Quatre-vingt = 4 × 20 = 80, dix-sept = 17, so 80 + 17 = 97." },
    { d:3, k:"mcq", q:"'Il est dix heures moins le quart.' What time is it?", o:["10:15","9:45","10:45","9:15"], a:1, x:"'Moins le quart' = quarter to: a quarter to ten = 9:45." },
    { d:3, k:"mcq", q:"How do you say 'on Mondays' (every Monday)?", o:["le lundi","lundi","au lundi","les lundi"], a:0, x:"'Le lundi' with the article means every Monday. Plain 'lundi' means this (one) Monday." }
  );
  T("family").tasks.push(
    { d:2, k:"mcq", q:"Choose the correct form: 'Mes cousines sont ___.' (funny)", o:["drôle","drôles","drôlees","drôlle"], a:1, x:"Drôle already ends in -e, so feminine plural only adds -s: drôles." },
    { d:3, k:"mcq", q:"Choose the correct form: 'Ma tante est très ___.' (sporty)", o:["sportif","sportive","sportifs","sportives"], a:1, x:"Adjectives ending in -if change to -ive in the feminine: sportif → sportive." },
    { d:3, k:"mcq", q:"Which adjective goes BEFORE the noun?", o:["un frère grand","un grand frère","un frère intelligent","une sœur timide"], a:1, x:"Short common adjectives (BAGS: beauty, age, goodness, size) go before: un grand frère, une petite sœur." },
    { d:3, k:"mcq", q:"Translate: 'Her brother is tall.' (Sara's brother)", o:["Son frère est grand.","Sa frère est grand.","Ses frère est grand.","Son frère est grande."], a:0, x:"The possessive agrees with the noun owned (frère, masculine) not the owner: son frère, even though Sara is a girl." }
  );
  T("routine").tasks.push(
    { d:2, k:"mcq", q:"Choose the correct reflexive verb: 'Nous ___ à sept heures.' (se réveiller)", o:["nous réveillons","se réveillons","me réveille","vous réveillez"], a:0, x:"The reflexive pronoun matches the subject: nous nous réveillons." },
    { d:3, k:"mcq", q:"Which sentence means 'I go to school by bus'?", o:["Je vais à l'école en bus.","Je vais au école en bus.","Je va à l'école en bus.","Je vais à école par le bus."], a:0, x:"Aller with je is 'vais'. Before a vowel, à + l' : à l'école. Transport: en bus, en voiture, à pied." },
    { d:3, k:"text", q:"Conjugate aller (to go) with 'ils': ils ______", a:["vont"], prefix:"ils ", x:"Aller is irregular: je vais, tu vas, il va, nous allons, vous allez, ils vont." },
    { d:3, k:"mcq", q:"How do you say 'I am going to play football' (near future)?", o:["Je vais jouer au foot.","Je joue au foot demain hier.","Je jouerai foot.","Je vais joue au foot."], a:0, x:"Near future = aller (present) + infinitive: je vais jouer." }
  );
  T("food").tasks.push(
    { d:2, k:"mcq", q:"Translate: 'I don't drink coffee.'", o:["Je ne bois pas de café.","Je ne bois pas du café.","Je bois pas café.","Je ne bois café pas."], a:0, x:"After a negative, du becomes de: je ne bois pas de café." },
    { d:3, k:"mcq", q:"Which is a quantity expression meaning 'a bottle of water'?", o:["une bouteille d'eau","une bouteille de l'eau","une bouteille des eaux","une bouteille du eau"], a:0, x:"After quantities use de (d' before a vowel): une bouteille d'eau, un kilo de pommes." },
    { d:3, k:"mcq", q:"In a restaurant, 'Qu'est-ce que vous prenez comme plat principal ?' means…", o:["What would you like as a main course?","Where is the dessert?","How much is the bill?","Are you hungry?"], a:0, x:"Prendre = to take/have. Le plat principal = the main course. L'entrée = starter, le dessert = dessert." },
    { d:3, k:"text", q:"Type the French for 'some apples' (pommes, plural).", a:["des pommes"], x:"Plural partitive = des: des pommes." }
  );
  F.topics.push(
    { id:"town", title:"Places in town and directions", strand:"MYP 2 · Phase 1–2 · Where I live",
      learn:{ ideas:[
        "Places: la gare (station), la plage (beach), le marché (market), la piscine (pool), le centre commercial (mall), la mosquée (mosque).",
        "à + le = au, à + la = à la, à + l' = à l', à + les = aux: Je vais au parc, à la plage, aux magasins.",
        "Il y a… = there is / there are. Il n'y a pas de… = there isn't any…",
        "Directions: tournez à gauche (turn left), tournez à droite (turn right), allez tout droit (go straight on), c'est loin / c'est près (far / near).",
        "Prepositions: à côté de (next to), en face de (opposite), entre (between)."],
        example:"Pour aller à la gare, allez tout droit, puis tournez à gauche. La gare est en face du parc.\n(To get to the station, go straight on, then turn left. The station is opposite the park.)" },
      tasks:[
        { d:1, k:"mcq", q:"What is 'la plage'?", o:["The beach","The station","The pool","The market"], a:0, x:"La plage = the beach. La gare = the station, la piscine = the pool, le marché = the market." },
        { d:1, k:"mcq", q:"What does 'tournez à droite' mean?", o:["Turn left","Turn right","Go straight on","Stop"], a:1, x:"Droite = right, gauche = left, tout droit = straight on." },
        { d:1, k:"mcq", q:"How do you say 'There is a park'?", o:["Il y a un parc.","Il est un parc.","Il a un parc.","C'est parc."], a:0, x:"'Il y a' means there is / there are." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Je vais ___ cinéma.'", o:["à le","au","à la","aux"], a:1, x:"Cinéma is masculine: à + le becomes au. Je vais au cinéma." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Nous allons ___ magasins.'", o:["au","à la","aux","à les"], a:2, x:"Plural: à + les becomes aux. Nous allons aux magasins." },
        { d:2, k:"mcq", q:"What does 'en face de la mosquée' mean?", o:["Next to the mosque","Opposite the mosque","Behind the mosque","Far from the mosque"], a:1, x:"En face de = opposite. À côté de = next to, derrière = behind." },
        { d:2, k:"mcq", q:"How do you say 'There isn't a cinema'?", o:["Il n'y a pas de cinéma.","Il n'y a pas un cinéma.","Il y a pas cinéma.","Il n'y a cinéma pas."], a:0, x:"After the negative 'pas', un/une/des become de: il n'y a pas de cinéma." },
        { d:3, k:"mcq", q:"'La pharmacie est entre la banque et la poste.' Where is the pharmacy?", o:["Behind the bank","Between the bank and the post office","Opposite the post office","Next to the station"], a:1, x:"Entre = between." },
        { d:3, k:"mcq", q:"Translate: 'Go straight on, then take the second street on the left.'", o:["Allez tout droit, puis prenez la deuxième rue à gauche.","Tournez à droite, puis la deuxième rue.","Allez à gauche, puis tout droit.","Prenez la première rue à droite."], a:0, x:"Tout droit = straight on, prenez = take, la deuxième = the second, à gauche = on the left." },
        { d:3, k:"mcq", q:"Which sentence gives an opinion about your town with a reason?", o:["J'aime ma ville parce qu'il y a beaucoup de parcs.","Ma ville.","Il y a.","Je vais en ville."], a:0, x:"Opinion (j'aime) + parce que + reason (il y a beaucoup de parcs) makes a developed answer, which scores higher in MYP speaking and writing." }
      ] },
    { id:"past", title:"My weekend: the past tense", strand:"MYP 2 · Phase 2 · Leisure",
      learn:{ ideas:[
        "The passé composé describes completed actions: J'ai joué au foot (I played football).",
        "Most verbs use avoir + past participle. -er verbs: -er → -é (jouer → joué, regarder → regardé).",
        "Some verbs of movement use être: aller, venir, arriver, partir, sortir, rester… Je suis allé(e) au parc.",
        "With être, the participle agrees with the subject: elle est allée, ils sont allés.",
        "Irregular participles: faire → fait, voir → vu, prendre → pris, boire → bu, lire → lu."],
        example:"Le week-end dernier, j'ai regardé un film et je suis allé à la plage. J'ai mangé une glace.\n(Last weekend, I watched a film and I went to the beach. I ate an ice cream.)" },
      tasks:[
        { d:1, k:"mcq", q:"What does 'J'ai joué au tennis' mean?", o:["I play tennis","I played tennis","I will play tennis","I like tennis"], a:1, x:"J'ai + joué (past participle) = passé composé: I played." },
        { d:1, k:"text", q:"Give the past participle of 'regarder'.", a:["regardé","regarde"], best:"regardé", x:"-er verbs: remove -er and add -é: regardé." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Hier, nous ___ un gâteau.' (manger)", o:["avons mangé","sommes mangé","avons manger","mangeons"], a:0, x:"Manger uses avoir: nous avons mangé." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Je ___ au cinéma.' (aller, past)", o:["ai allé","suis allé","vais allé","suis aller"], a:1, x:"Aller is a movement verb that takes être: je suis allé (allée for a girl)." },
        { d:2, k:"mcq", q:"What is the past participle of 'faire'?", o:["fait","faisé","fairé","fais"], a:0, x:"Faire is irregular: j'ai fait mes devoirs (I did my homework)." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Elle ___ à neuf heures.' (arriver, past)", o:["a arrivé","est arrivée","est arrivé","a arrivée"], a:1, x:"Arriver takes être, and the participle agrees with elle: est arrivée." },
        { d:3, k:"mcq", q:"Make it negative: 'J'ai vu le match.'", o:["Je n'ai pas vu le match.","Je ne vu pas le match.","J'ai ne pas vu le match.","Je n'ai vu pas le match."], a:0, x:"In the passé composé, ne … pas goes around the helping verb: je n'ai pas vu." },
        { d:3, k:"mcq", q:"Choose the correct form: 'Mes amis ___ au parc.' (aller, past)", o:["sont allés","ont allé","sont allé","est allés"], a:0, x:"Être + agreement with a plural masculine subject: ils sont allés." },
        { d:3, k:"mcq", q:"Which past participle is correct for 'prendre'?", o:["prendu","pris","prené","prit"], a:1, x:"Prendre → pris: j'ai pris le bus (I took the bus)." },
        { d:3, k:"mcq", q:"Which sentence mixes past and future time correctly?", o:["Le week-end dernier, j'ai joué au foot et le week-end prochain, je vais nager.","Le week-end dernier, je vais jouer au foot.","Demain, j'ai joué au foot.","Hier, je vais nager."], a:0, x:"Past time words (dernier, hier) take the passé composé; future time words (prochain, demain) take aller + infinitive. Using several tenses raises your MYP language level." }
      ] }
  );
})(window.STUDY);
