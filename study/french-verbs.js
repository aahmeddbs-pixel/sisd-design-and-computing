/* Study Plus · French · verbs explained in detail, with sound.
   - Every topic gets a Verb lab (learn.verbs → cards from study/lang.js) and pronunciation help (learn.pron).
   - New topic "verbs": the key verbs, their groups, how they sound and when to use them.
   - New topic "hobbies": free time, sport and weather (jouer à / jouer de / faire de, aimer + infinitive, il fait…).
   - Fix: adjective position (most go after the noun, BAGS adjectives such as grand go before).
   Pools are append-only (saved sets point at positions). d: 1 Core, 2 Extended, 3 Challenge. */
(function(S){
  const F = S.french; if (!F) return;
  F.lang = "fr"; F.verbLevel = "core";
  F.blurb = "MYP 2 French with audio: greetings, numbers, family, routine, food, town, hobbies, the past and a verb lab";
  if (S.arabic) S.arabic.lang = "ar";
  const T = id => F.topics.find(t => t.id === id);
  const set = (id, verbs, pron, extra) => { const t = T(id); if (!t) return; t.learn.verbs = verbs; t.learn.pron = pron; if (extra) Object.assign(t, extra); };

  /* fix: 'un frère grand' is wrong — grand is a BAGS adjective and goes before the noun */
  const fam = T("family"); if (fam){ const i = fam.learn.ideas.findIndex(x => /un frère grand/.test(x));
    if (i >= 0) fam.learn.ideas[i] = "Most adjectives go AFTER the noun and agree with it: un ami sportif → une amie sportive → des amis sportifs. Short common adjectives (BAGS: Beauty, Age, Goodness, Size) go BEFORE: un grand frère, une petite sœur, un bon ami, une jeune fille."; }

  set("greetings", ["sappeler","etre","avoir","habiter","parler"], [
    "Bonjour sounds like 'boh(n)-zhoor': the n is not said, it makes the o nasal (through your nose).",
    "Je m'appelle sounds like 'zhuh ma-pel': the final -e is silent.",
    "J'ai douze ans: 'zhay dooz oh(n)'. The s of ans is silent.",
    "Liaison: in vous êtes and nous avons, the s joins the next vowel with a z sound: 'voo zet', 'noo zah-voh(n)'."]);
  set("numbers", ["avoir","etre"], [
    "Final consonants are usually silent: deux ('duh'), trois ('trwah'), vingt ('va(n)').",
    "But you DO hear the final letter of cinq ('sank'), sept ('set'), huit ('weet') and neuf ('nuhf') when they are said alone.",
    "Il est trois heures: 'ee-leh trwah-zuhr'. The s of trois joins heures with a z sound.",
    "Soixante sounds like 'swah-sont': the x sounds like s."]);
  set("family", ["etre","avoir"], [
    "Ma sœur: 'ma suhr'. The œ sounds like the 'u' in 'fur' with rounded lips.",
    "Mon frère: 'moh(n) frair'. The è is an open 'eh' sound.",
    "Feminine adjectives make you HEAR the last consonant: petit ('puh-tee') → petite ('puh-teet'), grand ('groh(n)') → grande ('groh(n)d').",
    "Plural -s is silent: mes parents sounds like 'may pa-roh(n)'."]);
  set("routine", ["selever","aller","faire","parler","finir"], [
    "The endings -e, -es and -ent of -er verbs are SILENT: je joue, tu joues, ils jouent all sound like 'zhoo'.",
    "You hear the ending only with nous (-ons = 'oh(n)') and vous (-ez = 'ay').",
    "Je me lève: 'zhuh muh lev'. The è makes an 'eh' sound.",
    "Informatique: 'a(n)-for-ma-teek'. The final -que sounds like 'k'."]);
  set("food", ["manger","boire","prendre","vouloir","acheter"], [
    "Je voudrais: 'zhuh voo-dreh'. The -ais ending sounds like 'eh'.",
    "S'il vous plaît: 'seel voo pleh'. The t is silent.",
    "Du pain: 'dew pa(n)'. The u in du is a tight 'ee' with rounded lips; pain is nasal.",
    "L'addition: 'la-dee-syoh(n)'. -tion in French sounds like 'syoh(n)', not 'shun'."]);
  set("town", ["aller","prendre","venir"], [
    "À gauche: 'ah gohsh'. À droite: 'ah drwaht'. Tout droit: 'too drwah' (no t sound at the end).",
    "Au cinéma: 'oh see-nay-ma'. Au sounds like 'oh'.",
    "Il y a: 'eel ee ah', said quickly as 'eelya'.",
    "La mosquée: 'la mos-kay'. -ée sounds like 'ay'."]);
  set("past", ["etre","avoir","aller","faire","voir","sortir"], [
    "The past participle -é sounds like 'ay': joué ('zhoo-ay'), regardé ('ruh-gar-day').",
    "Joué (past) and jouer (infinitive) sound the SAME: listen to the helping verb (j'ai joué) to know it's the past.",
    "Je suis allé and je suis allée sound the same: the extra -e for a girl is only seen in writing.",
    "Hier: 'ee-yair'. Le week-end dernier: 'luh week-end dair-nyay'."]);

  F.topics.push(
    { id:"verbs", title:"Verb lab: key verbs and how to say them", strand:"MYP 2 · Phase 1–2 · Language skills",
      bbc:"French verbs present tense", yt:"French verbs être avoir aller faire present tense pronunciation for beginners",
      learn:{
        ideas:[
          "A verb is an action or state word. The infinitive is the 'to…' form you find in a dictionary: parler = to speak, finir = to finish, vendre = to sell.",
          "There are three groups of regular verbs: -er (parler), -ir (finir) and -re (vendre). Most French verbs are -er verbs, so learn that pattern first.",
          "-er verbs: take off -er and add -e, -es, -e, -ons, -ez, -ent. Je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.",
          "Sound rule: the endings -e, -es and -ent are silent, so je parle, tu parles and ils parlent all sound the same ('parl'). Only nous (-ons) and vous (-ez) sound different.",
          "The most important irregular verbs: être (to be), avoir (to have), aller (to go) and faire (to do / make). Learn them by heart: you need them in almost every sentence.",
          "Modal verbs vouloir (want), pouvoir (can) and devoir (must) are followed by an infinitive: je veux jouer, je peux nager, je dois travailler.",
          "Three time frames: present (je joue = I play), near future (je vais jouer = I am going to play) and past (j'ai joué = I played). Using all three raises your MYP level."],
        example:"Je m'appelle Sara. Je suis sportive et j'ai beaucoup d'amis.\nLe samedi, je vais au parc et je joue au tennis.\nHier, j'ai fait mes devoirs et demain, je vais aller à la plage.\n(My name is Sara. I am sporty and I have lots of friends. On Saturdays I go to the park and I play tennis. Yesterday I did my homework and tomorrow I am going to go to the beach.)",
        verbs:["etre","avoir","aller","faire","parler","finir","vendre","prendre","vouloir","pouvoir","devoir","venir"],
        pron:[
          "Silent endings: -e, -es, -ent at the end of a verb are not pronounced (ils parlent = 'eel parl').",
          "-ez and -er both sound like 'ay': vous parlez and parler sound the same.",
          "-ons sounds like 'oh(n)': nasal, through the nose, without saying the n.",
          "Liaison: a silent final consonant links to a following vowel: nous avons = 'noo zah-voh(n)', ils ont = 'eel zoh(n)', vous êtes = 'voo zet'.",
          "Ils ont ('eel zoh(n)', they have) and ils sont ('eel soh(n)', they are) sound different: z versus s."] },
      tasks:[
        { d:1, k:"mcq", q:"What is the infinitive of 'je parle'?", o:["parler","parle","parlons","parlé"], a:0, x:"The infinitive is the dictionary form ending in -er, -ir or -re: parler (to speak)." },
        { d:1, k:"mcq", q:"Which verb means 'to have'?", o:["avoir","être","aller","faire"], a:0, x:"Avoir = to have (j'ai). Être = to be, aller = to go, faire = to do / to make." },
        { d:1, k:"mcq", q:"Choose the correct form: 'Je ___ français.' (parler)", o:["parle","parles","parlons","parlent"], a:0, x:"With je, -er verbs end in -e: je parle. Say it 'zhuh parl': the -e is silent." },
        { d:1, k:"mcq", q:"Choose the correct form of être: 'Tu ___ sympa.'", o:["es","est","suis","êtes"], a:0, x:"Être: je suis, tu es, il est, nous sommes, vous êtes, ils sont. Tu es sounds like 'tew eh'." },
        { d:1, k:"text", q:"Conjugate avoir with 'nous': nous ______", a:["avons"], prefix:"nous ", x:"Nous avons = we have. Say 'noo zah-voh(n)': the s of nous links to avons with a z sound (liaison)." },
        { d:2, k:"mcq", q:"In 'ils parlent', which part is NOT pronounced?", o:["The -ent ending","The p","The r","The l"], a:0, x:"The -ent ending of a verb is silent: ils parlent sounds exactly like il parle ('parl')." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Nous ___ nos devoirs.' (finir)", o:["finissons","finons","finisons","finissez"], a:0, x:"Regular -ir verbs add -iss- in the plural: nous finissons, vous finissez, ils finissent." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Vous ___ du sport ?' (faire)", o:["faites","faisez","fais","font"], a:0, x:"Faire is irregular: vous faites (like vous êtes and vous dites). 'Vous faisez' does not exist." },
        { d:2, k:"mcq", q:"Which sentence is correct?", o:["Je veux jouer au foot.","Je veux joue au foot.","Je veux jouons au foot.","Je veut jouer au foot."], a:0, x:"After vouloir (and pouvoir, devoir, aimer), the second verb stays in the infinitive: je veux jouer. Je veux, tu veux, il veut." },
        { d:3, k:"mcq", q:"Which pair sounds DIFFERENT when you say it?", o:["ils ont / ils sont","je parle / ils parlent","parler / parlez","tu joues / il joue"], a:0, x:"Ils ont has a z sound ('eel zoh(n)') and ils sont has an s sound ('eel soh(n)'). The other pairs sound identical." },
        { d:3, k:"mcq", q:"Translate: 'They are going to sell their bikes.'", o:["Ils vont vendre leurs vélos.","Ils vont vendent leurs vélos.","Ils vendre leurs vélos.","Ils sont vendre leurs vélos."], a:0, x:"Near future = aller (ils vont) + infinitive (vendre). Leurs = their (plural)." },
        { d:3, k:"text", q:"Conjugate prendre with 'ils': ils ______", a:["prennent"], prefix:"ils ", x:"Prendre: je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent (double n, sounds like 'pren')." }
      ],
      pool:[
        { d:1, k:"mcq", q:"Which verb means 'to go'?", o:["aller","venir","sortir","voir"], a:0, x:"Aller = to go (je vais). Venir = to come, sortir = to go out, voir = to see." },
        { d:1, k:"mcq", q:"Choose the correct form of aller: 'Je ___ au cinéma.'", o:["vais","va","vas","allons"], a:0, x:"Aller: je vais ('zhuh veh'), tu vas, il va, nous allons, vous allez, ils vont." },
        { d:1, k:"tf", q:"True or false: 'je joue' and 'tu joues' sound the same.", a:true, x:"The -s of tu joues is silent, so both sound like 'zhoo'." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Ils ___ des glaces.' (vendre)", o:["vendent","vendont","vends","vendez"], a:0, x:"-re verbs with ils/elles end in -ent: ils vendent ('eel voh(n)d')." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Nous ___ à Dubaï.' (habiter)", o:["habitons","habitez","habitent","habite"], a:0, x:"-er verbs with nous end in -ons: nous habitons ('noo za-bee-toh(n)')." },
        { d:2, k:"mcq", q:"What does 'je dois' mean?", o:["I must / I have to","I want","I can","I do"], a:0, x:"Devoir = to have to. Je dois faire mes devoirs = I must do my homework." },
        { d:2, k:"text", q:"Conjugate pouvoir with 'tu': tu ______", a:["peux"], prefix:"tu ", x:"Pouvoir: je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent." },
        { d:3, k:"mcq", q:"Which sentence uses three time frames correctly?", o:["Hier j'ai mangé une pizza, aujourd'hui je mange une salade et demain je vais manger des pâtes.","Hier je mange une pizza et demain j'ai mangé des pâtes.","Aujourd'hui je vais mangé une salade.","Demain j'ai mangé une salade."], a:0, x:"Past (hier: j'ai mangé), present (aujourd'hui: je mange) and near future (demain: je vais manger)." },
        { d:3, k:"mcq", q:"Choose the correct form: 'Nous ___ du poulet.' (manger)", o:["mangeons","mangons","mangez","mangent"], a:0, x:"Manger keeps an e before -ons so the g stays soft ('zh'): nous mangeons." },
        { d:3, k:"mcq", q:"'Je viens de finir mes devoirs.' What does it mean?", o:["I have just finished my homework.","I am coming to finish my homework.","I will finish my homework.","I finish my homework every day."], a:0, x:"Venir de + infinitive = to have just done something: je viens de finir = I have just finished." }
      ] },
    { id:"hobbies", title:"Free time, sport and weather", strand:"MYP 2 · Phase 1–2 · Leisure",
      bbc:"French hobbies and free time", yt:"French hobbies jouer à faire de and weather for beginners",
      learn:{
        ideas:[
          "Jouer à + sport or game: je joue au foot, au tennis, aux échecs (chess). à + le = au, à + les = aux.",
          "Jouer de + instrument: je joue du piano, de la guitare, de la batterie (drums).",
          "Faire de + activity: je fais du vélo (cycling), de la natation (swimming), de l'équitation (horse riding), des randonnées (hikes).",
          "Opinions with an infinitive: j'aime nager (I like swimming), j'adore lire (I love reading), je déteste danser (I hate dancing).",
          "Frequency: toujours (always), souvent (often), quelquefois (sometimes), le week-end (at weekends), une fois par semaine (once a week).",
          "Weather: il fait beau (it's nice), il fait chaud (hot), il fait froid (cold), il y a du soleil (sunny), il y a du vent (windy), il pleut (it's raining).",
          "Link weather and plans: Quand il fait beau, je vais à la plage. (When it's nice, I go to the beach.)"],
        example:"Le week-end, je joue au basket avec mes amis et je fais de la natation. Je joue aussi du piano. Quand il pleut, je reste à la maison et je lis.\n(At the weekend I play basketball with my friends and I go swimming. I also play the piano. When it rains, I stay at home and I read.)",
        verbs:["jouer","faire","aimer","lire","sortir"],
        pron:[
          "Natation: 'na-ta-syoh(n)'. Équitation: 'ay-kee-ta-syoh(n)'. The -tion ending is 'syoh(n)'.",
          "Il pleut: 'eel pluh'. The t is silent.",
          "Il fait chaud: 'eel feh shoh'. The d is silent and au sounds like 'oh'.",
          "Guitare: 'gee-tar' with a hard g, because of the u after it."] },
      tasks:[
        { d:1, k:"mcq", q:"How do you say 'I play football'?", o:["Je joue au foot.","Je joue du foot.","Je fais au foot.","Je joue à le foot."], a:0, x:"Sport uses jouer à. À + le = au: je joue au foot." },
        { d:1, k:"mcq", q:"What does 'il pleut' mean?", o:["It's raining","It's sunny","It's cold","It's windy"], a:0, x:"Il pleut = it's raining (from the verb pleuvoir). Il y a du soleil = it's sunny." },
        { d:1, k:"mcq", q:"What does 'je fais de la natation' mean?", o:["I go swimming","I play tennis","I go cycling","I read"], a:0, x:"Faire de la natation = to swim / go swimming. Natation is feminine, so de la." },
        { d:1, k:"mcq", q:"How do you say 'It's hot'?", o:["Il fait chaud.","Il est chaud.","Il a chaud.","C'est chaud temps."], a:0, x:"Weather uses il fait: il fait chaud, il fait froid, il fait beau. (Il a chaud means 'he feels hot'.)" },
        { d:2, k:"mcq", q:"Choose the correct form: 'Mon frère joue ___ guitare.'", o:["de la","à la","du","au"], a:0, x:"Instruments use jouer de. Guitare is feminine: de la guitare." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Je fais ___ vélo.'", o:["du","de la","au","des"], a:0, x:"Faire de + activity. Vélo is masculine: de + le = du. Je fais du vélo." },
        { d:2, k:"mcq", q:"Translate: 'I like reading.'", o:["J'aime lire.","J'aime lis.","J'aime le lire.","Je lis aime."], a:0, x:"Aimer + infinitive: j'aime lire. The second verb stays in the infinitive." },
        { d:2, k:"mcq", q:"What does 'quelquefois' mean?", o:["sometimes","always","never","often"], a:0, x:"Quelquefois = sometimes. Toujours = always, souvent = often, jamais = never (ne… jamais)." },
        { d:3, k:"mcq", q:"Choose the best sentence: 'When it's cold, I play video games.'", o:["Quand il fait froid, je joue aux jeux vidéo.","Quand il est froid, je joue des jeux vidéo.","Quand il fait froid, je fais aux jeux vidéo.","Il fait froid quand jeux vidéo."], a:0, x:"Il fait froid for weather; games use jouer à, and à + les = aux: aux jeux vidéo." },
        { d:3, k:"mcq", q:"Which answer gives an opinion, a reason and a frequency word?", o:["Je joue souvent au tennis parce que c'est amusant.","Je joue au tennis.","Le tennis.","J'ai un tennis."], a:0, x:"Souvent (frequency) + jouer au tennis + parce que c'est amusant (reason) makes a developed MYP answer." }
      ],
      pool:[
        { d:1, k:"mcq", q:"What is 'la natation'?", o:["Swimming","Cycling","Dancing","Running"], a:0, x:"La natation = swimming. Le vélo = cycling, la danse = dancing, la course = running." },
        { d:1, k:"mcq", q:"What does 'il fait froid' mean?", o:["It's cold","It's hot","It's raining","It's nice"], a:0, x:"Froid = cold. Chaud = hot, beau = nice." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Nous jouons ___ échecs.'", o:["aux","au","à la","des"], a:0, x:"Les échecs (chess) is plural: à + les = aux." },
        { d:2, k:"mcq", q:"Choose the correct form: 'Elle fait ___ équitation.'", o:["de l'","du","de la","des"], a:0, x:"Équitation starts with a vowel: de l'équitation." },
        { d:2, k:"text", q:"Type the French for 'it's windy': il y a du ______", a:["vent"], prefix:"il y a du ", x:"Il y a du vent = it's windy. Il y a du soleil = it's sunny." },
        { d:3, k:"mcq", q:"Translate: 'Last weekend I played tennis.'", o:["Le week-end dernier, j'ai joué au tennis.","Le week-end dernier, je joue au tennis.","Le week-end prochain, j'ai joué au tennis.","Le week-end dernier, j'ai jouer au tennis."], a:0, x:"Past = avoir + past participle: j'ai joué. Dernier = last." },
        { d:3, k:"mcq", q:"Translate: 'Tomorrow I am going to go cycling.'", o:["Demain, je vais faire du vélo.","Demain, je fais du vélo hier.","Demain, j'ai fait du vélo.","Demain, je vais fais du vélo."], a:0, x:"Near future = aller + infinitive: je vais faire du vélo." },
        { d:3, k:"mcq", q:"Which sentence is NOT correct?", o:["Je joue de la tennis.","Je joue au tennis.","Je joue du piano.","Je fais de la danse."], a:0, x:"Tennis is a sport, so it takes jouer au tennis. 'Jouer de' is only for instruments." }
      ] }
  );
})(window.STUDY);
