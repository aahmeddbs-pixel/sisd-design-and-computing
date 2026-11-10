/* Study Plus · French (Language Acquisition, Phase 1–2) · IB MYP 2 (Grade 7)
   Typed answers ignore capital letters and accents are checked loosely (é = e) so a missing accent is flagged, not failed. */
(window.STUDY = window.STUDY || {}).french = {
  name: "French", icon: "Fr", colour: "#1F4E9C",
  blurb: "MYP 2 French: greetings, numbers, family, routine and food",
  topics: [
    {
      id: "greetings", title: "Greetings and introductions", strand: "MYP 2 · Phase 1–2 · Identity",
      learn: {
        ideas: [
          "Bonjour = hello / good morning. Bonsoir = good evening. Salut = hi / bye (informal). Au revoir = goodbye.",
          "Je m'appelle… = My name is… Comment tu t'appelles ? = What is your name?",
          "J'ai … ans = I am … years old (French uses avoir, 'to have', for age).",
          "Comment ça va ? → Ça va bien, merci ! (I'm fine, thank you.)",
          "Use 'tu' with friends and family, and 'vous' with adults you don't know well or with more than one person."
        ],
        example: "— Bonjour ! Comment tu t'appelles ?\n— Je m'appelle Mikhail. J'ai douze ans. J'habite à Dubaï.\n(Hello! What's your name? — My name is Mikhail. I'm 12. I live in Dubai.)"
      },
      tasks: [
        { k:"mcq", q:"How do you say 'goodbye' in French?", o:["Bonjour","Merci","Au revoir","S'il vous plaît"], a:2, x:"'Au revoir' means goodbye. 'Merci' = thank you, 'S'il vous plaît' = please." },
        { k:"mcq", q:"What does 'Je m'appelle Sara' mean?", o:["I am Sara's friend","My name is Sara","I call Sara","Sara is here"], a:1, x:"'Je m'appelle' literally means 'I call myself'. It is how you say 'My name is'." },
        { k:"mcq", q:"How do you say 'I am 12 years old'?", o:["Je suis douze ans","J'ai douze ans","Je douze ans","J'ai douze"], a:1, x:"French uses avoir (to have) for age: 'J'ai douze ans' (literally 'I have twelve years'). Never 'je suis… ans'." },
        { k:"text", q:"Type the French for 'thank you'.", a:["merci"], x:"'Merci' = thank you. 'Merci beaucoup' = thank you very much." },
        { k:"mcq", q:"Which would you use to greet your head teacher politely?", o:["Salut !","Bonjour, monsieur.","Ça va, toi ?","Coucou !"], a:1, x:"'Bonjour, monsieur/madame' is polite. 'Salut' and 'coucou' are informal: use them with friends." },
        { k:"mcq", q:"Someone asks 'Comment ça va ?' Which is a good reply?", o:["Je m'appelle Ali.","Ça va bien, merci.","J'ai treize ans.","Au revoir."], a:1, x:"'Comment ça va ?' means 'How are you?'. Reply 'Ça va bien, merci' (I'm fine, thanks) or 'Pas mal' (not bad)." },
        { k:"text", q:"Complete: 'J'______ à Dubaï.' (I live in Dubai) — type the missing letters of the verb.", a:["habite"], prefix:"J'", x:"'J'habite à Dubaï' = I live in Dubai. The verb is habiter; with je it becomes 'habite', and je shortens to j' before the vowel sound." },
        { k:"tf", q:"True or false: 'vous' can be used to speak politely to one adult or to a group of people.", a:true, x:"'Vous' is both the polite singular 'you' and the plural 'you'. 'Tu' is only for one person you know well." }
      ]
    },
    {
      id: "numbers", title: "Numbers, dates and time", strand: "MYP 2 · Phase 1–2 · Daily life",
      learn: {
        ideas: [
          "1–10: un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix.",
          "11–20: onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt. Then trente (30), quarante (40), cinquante (50), soixante (60).",
          "Days: lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche. They don't take capital letters in French.",
          "Dates use 'le' + number + month: le cinq mars. The 1st is 'le premier'.",
          "Time: Il est trois heures (It's 3 o'clock). et quart = quarter past, et demie = half past, moins le quart = quarter to."
        ],
        example: "Mon anniversaire, c'est le quatorze juillet. (My birthday is on 14 July.)\nIl est huit heures et demie. (It's half past eight.)"
      },
      tasks: [
        { k:"mcq", q:"What is 'quinze'?", o:["5","14","15","50"], a:2, x:"Quinze = 15. Quatorze = 14, cinq = 5, cinquante = 50." },
        { k:"num", q:"Write the number: 'dix-huit'", a:18, x:"Dix-huit = ten-eight = 18. Similarly, dix-sept = 17, dix-neuf = 19." },
        { k:"num", q:"Write the number: 'quarante-trois'", a:43, x:"Quarante = 40, trois = 3, so quarante-trois = 43." },
        { k:"mcq", q:"Which day comes after 'mardi'?", o:["lundi","jeudi","mercredi","dimanche"], a:2, x:"lundi (Mon), mardi (Tue), mercredi (Wed), jeudi (Thu). So after mardi comes mercredi." },
        { k:"mcq", q:"How do you say 'the first of May'?", o:["le un mai","le premier mai","la première mai","le mai un"], a:1, x:"The 1st of the month is 'le premier'. All other dates use the normal number: le deux mai, le trois mai…" },
        { k:"mcq", q:"'Il est sept heures et demie.' What time is it?", o:["7:00","7:15","7:30","6:45"], a:2, x:"'Et demie' = half past, so 7:30. 'Et quart' would be 7:15 and 'moins le quart' 6:45." },
        { k:"text", q:"Type the French word for Sunday (no capital needed).", a:["dimanche"], x:"Dimanche = Sunday. Days of the week are written without a capital letter in French." },
        { k:"mcq", q:"What is 'soixante'?", o:["16","60","70","6"], a:1, x:"Soixante = 60. Seize = 16, six = 6, soixante-dix (literally sixty-ten) = 70." }
      ]
    },
    {
      id: "family", title: "Family and descriptions", strand: "MYP 2 · Phase 1–2 · Relationships",
      learn: {
        ideas: [
          "la mère (mother), le père (father), la sœur (sister), le frère (brother), les grands-parents (grandparents).",
          "Possessives agree with the noun: mon frère, ma sœur, mes parents.",
          "Adjectives usually go AFTER the noun and agree: un frère grand → une sœur grande → des amis grands.",
          "Add -e for feminine and -s for plural (petit → petite → petits → petites). Adjectives already ending in -e don't change for feminine (jeune, timide).",
          "Être (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont."
        ],
        example: "Ma sœur est petite et sportive. Mon frère est grand et timide.\n(My sister is small and sporty. My brother is tall and shy.)"
      },
      tasks: [
        { k:"mcq", q:"What does 'le frère' mean?", o:["Father","Brother","Sister","Friend"], a:1, x:"Le frère = brother. Le père = father, la sœur = sister, l'ami = friend." },
        { k:"mcq", q:"Choose the correct possessive: '___ mère'", o:["mon","ma","mes","me"], a:1, x:"Mère is feminine singular, so it takes 'ma': ma mère. Masculine uses mon (mon père); plural uses mes (mes parents)." },
        { k:"mcq", q:"Choose the correct adjective: 'Ma sœur est ___.' (tall)", o:["grand","grande","grands","grandes"], a:1, x:"Sœur is feminine singular, so add -e: grande." },
        { k:"mcq", q:"Choose the correct verb: 'Nous ___ frères.' (We are brothers)", o:["sommes","sont","êtes","est"], a:0, x:"Être with nous is 'sommes': nous sommes. (Ils sont, vous êtes, il est.)" },
        { k:"mcq", q:"What does 'Mon grand-père est très gentil' mean?", o:["My grandfather is very kind","My big father is nice","My grandmother is very kind","My father is tall"], a:0, x:"Grand-père = grandfather, très = very, gentil = kind." },
        { k:"text", q:"Type the French for 'my parents'.", a:["mes parents"], x:"Parents is plural, so the possessive is 'mes': mes parents." },
        { k:"mcq", q:"Choose the correct sentence.", o:["J'ai une chat noir.","J'ai un chat noir.","J'ai un noir chat.","J'ai une chatte noir."], a:1, x:"Chat is masculine (un chat), and the colour adjective comes after the noun: un chat noir." },
        { k:"tf", q:"True or false: 'timide' stays the same in the feminine: 'Elle est timide.'", a:true, x:"Adjectives that already end in -e (timide, jeune, sympathique) don't add another -e for feminine." }
      ]
    },
    {
      id: "routine", title: "School and daily routine", strand: "MYP 2 · Phase 1–2 · Daily life",
      learn: {
        ideas: [
          "Regular -er verbs in the present: remove -er and add -e, -es, -e, -ons, -ez, -ent. Jouer: je joue, tu joues, il joue, nous jouons, vous jouez, ils jouent.",
          "School subjects: les maths, l'anglais, les sciences, l'histoire-géo, l'EPS (PE), l'informatique (computing).",
          "Opinions: j'aime (I like), j'adore (I love), je n'aime pas (I don't like), je déteste (I hate) + parce que c'est… (because it's…).",
          "Reflexive verbs for routine: je me lève (I get up), je me douche (I shower), je m'habille (I get dressed).",
          "Negatives wrap around the verb: je ne joue pas (I don't play)."
        ],
        example: "Le matin, je me lève à sept heures. J'adore l'informatique parce que c'est intéressant, mais je n'aime pas l'histoire.\n(In the morning I get up at 7. I love computing because it's interesting, but I don't like history.)"
      },
      tasks: [
        { k:"mcq", q:"Choose the correct form: 'Nous ___ au foot.' (jouer)", o:["joue","jouons","jouez","jouent"], a:1, x:"With nous, -er verbs end in -ons: nous jouons." },
        { k:"mcq", q:"Choose the correct form: 'Ils ___ la télé.' (regarder)", o:["regarde","regardons","regardez","regardent"], a:3, x:"With ils/elles, -er verbs end in -ent: ils regardent. The -ent is silent." },
        { k:"text", q:"Conjugate 'parler' with 'tu': tu ______", a:["parles"], prefix:"tu ", x:"Tu parles. Remove -er (parl-) and add -es." },
        { k:"mcq", q:"What does 'l'informatique' mean?", o:["Information","Computing / ICT","Maths","Science"], a:1, x:"L'informatique = computing / computer science." },
        { k:"mcq", q:"Make it negative: 'J'aime les maths.'", o:["Je aime pas les maths.","Je n'aime pas les maths.","Je ne aime les maths pas.","Pas j'aime les maths."], a:1, x:"Put ne … pas around the verb. Ne becomes n' before a vowel: je n'aime pas." },
        { k:"mcq", q:"What does 'Je me lève à six heures et demie' mean?", o:["I go to bed at 6:30","I get up at 6:30","I leave at 6:30","I eat at 6:30"], a:1, x:"Se lever = to get up. Je me lève = I get up. Six heures et demie = 6:30." },
        { k:"mcq", q:"Which phrase means 'because it's boring'?", o:["parce que c'est facile","parce que c'est ennuyeux","parce que c'est génial","parce que c'est utile"], a:1, x:"Ennuyeux = boring. Facile = easy, génial = great, utile = useful." },
        { k:"text", q:"Conjugate 'aimer' with 'vous': vous ______", a:["aimez"], prefix:"vous ", x:"Vous aimez. Remove -er (aim-) and add -ez." }
      ]
    },
    {
      id: "food", title: "Food and ordering", strand: "MYP 2 · Phase 1–2 · Food and health",
      learn: {
        ideas: [
          "Partitive articles mean 'some': du (masculine), de la (feminine), de l' (before a vowel), des (plural). Je mange du pain, de la salade, des fruits.",
          "After a negative, du/de la/des become de (d'): Je ne mange pas de viande.",
          "Ordering: Je voudrais… (I would like…), s'il vous plaît. L'addition, s'il vous plaît (The bill, please).",
          "Meals: le petit-déjeuner (breakfast), le déjeuner (lunch), le dîner (dinner).",
          "Prix (price): Ça coûte combien ? (How much does it cost?) – Ça fait douze euros."
        ],
        example: "Au café: « Bonjour, je voudrais un sandwich au fromage et de l'eau, s'il vous plaît. »\n(Hello, I'd like a cheese sandwich and some water, please.)"
      },
      tasks: [
        { k:"mcq", q:"Choose the correct article: 'Je mange ___ pain.' (le pain)", o:["du","de la","des","de l'"], a:0, x:"Pain is masculine, so 'some bread' = du pain." },
        { k:"mcq", q:"Choose the correct article: 'Je bois ___ eau.' (l'eau)", o:["du","de la","de l'","des"], a:2, x:"Eau starts with a vowel, so use de l': de l'eau." },
        { k:"mcq", q:"Make it negative: 'Je mange de la viande.'", o:["Je ne mange pas de la viande.","Je ne mange pas de viande.","Je mange pas viande.","Je ne mange de viande pas."], a:1, x:"After a negative, de la becomes de: Je ne mange pas de viande." },
        { k:"mcq", q:"What does 'Je voudrais un jus d'orange' mean?", o:["I want to make orange juice","I would like an orange juice","I have an orange","I don't like orange juice"], a:1, x:"Je voudrais = I would like (the polite way to order). Un jus d'orange = an orange juice." },
        { k:"mcq", q:"What is 'le petit-déjeuner'?", o:["Lunch","Dinner","Breakfast","A snack"], a:2, x:"Le petit-déjeuner = breakfast (literally 'the little lunch'). Le déjeuner = lunch, le dîner = dinner." },
        { k:"mcq", q:"How do you ask 'How much does it cost?'", o:["C'est quoi ?","Ça coûte combien ?","Tu as faim ?","Où est-ce ?"], a:1, x:"'Ça coûte combien ?' = How much does it cost? Combien = how much / how many." },
        { k:"text", q:"Type the French for 'please' (formal, to a waiter): s'il vous ______", a:["plaît","plait"], prefix:"s'il vous ", best:"plaît", x:"S'il vous plaît = please (formal). With a friend you'd say s'il te plaît." },
        { k:"mcq", q:"Choose the correct article: 'Il achète ___ pommes.' (les pommes)", o:["du","de la","de l'","des"], a:3, x:"Pommes is plural, so 'some apples' = des pommes." }
      ]
    }
  ]
};
