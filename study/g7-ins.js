/* Study Plus · IB MYP 2 (Grade 7) · Individuals and Societies: medieval times and the Black Death.
   Four topics. Fact generators (multiple choice or true/false) and a dates/timeline generator give hundreds of questions.
   Videos: World History Encyclopedia and National Geographic (checked), Oak National Academy KS3 history lessons. */
(function(){
"use strict";
const G7 = window.G7, G = window.G7GEN, INS = window.STUDY && window.STUDY.ins; if (!G7 || !G || !INS || !G7.factGen) return;
const F = (d, q, a, w, x, t, f) => ({ d, q, a, w, x, t, f });

/* ================= 1. Life in medieval England ================= */
const LIFE = [
 F(1, "In which year was the Battle of Hastings?", "1066", ["1215", "1348", "1381"], "William of Normandy defeated King Harold on 14 October 1066 and became King William I.", "The Battle of Hastings was in 1066.", "The Battle of Hastings was in 1348."),
 F(1, "Who won the Battle of Hastings?", "William, Duke of Normandy (William the Conqueror)", ["King Harold", "King John", "Richard II"], "Harold Godwinson was killed; William was crowned on Christmas Day 1066.", "William the Conqueror won the Battle of Hastings.", "King Harold won the Battle of Hastings."),
 F(1, "Who was at the top of the feudal system?", "The king", ["The knights", "The peasants", "The barons"], "The king owned all the land and granted it to others in return for loyalty and service.", "The king was at the top of the feudal system.", "Peasants were at the top of the feudal system."),
 F(1, "Who was at the bottom of the feudal system?", "Peasants (villeins/serfs)", ["Knights", "Barons", "Bishops"], "Most people were peasants who farmed the land.", "Peasants were at the bottom of the feudal system.", "Knights were at the bottom of the feudal system."),
 F(1, "What did a knight give in return for land?", "Military service (fighting for his lord)", ["Money only", "Nothing", "Food only"], "Barons gave land to knights; knights promised to fight.", "Knights fought for their lord in return for land.", "Knights received land for free with nothing in return."),
 F(1, "Roughly what years do we call the Middle Ages (medieval period) in Europe?", "About 500 to 1500 CE", ["About 1800 to 1900", "About 3000 BCE to 500 BCE", "About 1900 to today"], "'Medieval' comes from Latin for 'middle age' — between the ancient world and the modern world.", "The Middle Ages lasted roughly from 500 to 1500 CE.", "The Middle Ages were in the 1800s."),
 F(2, "What was a villein (serf)?", "A peasant who was not free: he couldn't leave the manor without the lord's permission", ["A rich merchant", "A soldier", "A type of castle"], "Villeins worked the lord's land for several days a week as well as their own strips.", "Villeins needed their lord's permission to leave the manor.", "Villeins were free to move wherever they liked."),
 F(2, "What was the Domesday Book (1086)?", "A huge survey of land, people and animals in England, ordered by William I", ["A book of prayers", "A list of crimes", "A medical book"], "It helped William know how much tax he could collect.", "The Domesday Book was a survey of England ordered by William I.", "The Domesday Book was written about the Black Death."),
 F(2, "What was a tithe?", "One tenth of a peasant's produce, given to the Church", ["A tax on windows", "A type of castle", "A knight's sword"], "The Church was very powerful and wealthy.", "Peasants gave one tenth of their produce to the Church.", "A tithe was paid to the king's army."),
 F(2, "What type of castle did the Normans build quickly after 1066?", "Motte and bailey", ["Concentric stone castle", "Brick palace", "Glass tower"], "A wooden keep on a mound (motte) with an enclosed yard (bailey); later rebuilt in stone.", "The Normans built motte and bailey castles.", "The first Norman castles were made of glass."),
 F(2, "What was homage?", "A ceremony where a vassal publicly swore loyalty to his lord", ["A type of food", "A tax", "A battle"], "Kneeling and promising fealty (loyalty) was central to feudal relationships.", "Paying homage meant swearing loyalty to your lord.", "Homage was a type of medieval medicine."),
 F(2, "Which institution was the most powerful in everyday medieval life, apart from the king?", "The Church", ["Banks", "Newspapers", "Schools for all"], "It ran monasteries, hospitals and schools, and taught that people's souls depended on it.", "The Church was extremely powerful in medieval England.", "Religion was unimportant in the Middle Ages."),
 F(3, "Why did William I use the feudal system?", "To control England by making powerful people owe him loyalty and soldiers", ["To give peasants freedom", "To abolish the Church", "To create democracy"], "Land was granted only in return for loyalty and service.", "The feudal system helped William control England.", "The feudal system was designed to make peasants rich."),
 F(3, "What was Magna Carta (1215)?", "A charter forced on King John that limited the king's power", ["A Norman castle", "A plague cure", "A peasants' song"], "It said the king had to follow the law too; some clauses still matter today.", "Magna Carta limited the power of King John.", "Magna Carta gave King John unlimited power."),
 F(3, "How did most medieval villages farm?", "Strip farming in large open fields shared by the village", ["Huge machines", "Each family had one fenced farm", "No farming at all"], "Fields were often rotated so one was left fallow to recover.", "Medieval villages farmed strips in open fields.", "Medieval peasants used tractors.")
];
G["ins/medievallife"] = G7.factGen(LIFE);

/* ================= 2. The Black Death: causes and spread ================= */
const CAUSE = [
 F(1, "In which year did the Black Death reach England?", "1348", ["1066", "1215", "1666"], "It arrived at a port in Dorset (Melcombe, near Weymouth) in the summer of 1348.", "The Black Death reached England in 1348.", "The Black Death reached England in 1066."),
 F(1, "What was the Black Death?", "A deadly plague (disease) that spread across Asia and Europe in the 1340s–1350s", ["A war", "A famine only", "A volcano"], "It is one of the worst disasters in human history.", "The Black Death was a deadly plague.", "The Black Death was a medieval war."),
 F(1, "Which animals carried the fleas that spread the plague?", "Black rats", ["Cats", "Horses", "Birds"], "Infected fleas bit rats and people, passing on the bacteria.", "Fleas on black rats spread the plague.", "The plague was spread by cats."),
 F(1, "What was the main symptom that gave bubonic plague its name?", "Buboes: painful swellings in the armpits, neck or groin", ["A rash on the feet", "Blue lips only", "Hair loss"], "Victims also had a high fever and dark patches on the skin.", "Bubonic plague caused swellings called buboes.", "Bubonic plague was named after a doctor called Bubo."),
 F(2, "What actually caused the plague (discovered much later)?", "A bacterium called Yersinia pestis", ["A virus from cats", "Bad smells", "The planets"], "It was identified in 1894 by Alexandre Yersin.", "The plague was caused by a bacterium.", "The plague was caused by bad smells."),
 F(2, "Where did the Black Death probably start?", "Central Asia", ["England", "South America", "Australia"], "It spread west along trade routes such as the Silk Road.", "The Black Death probably started in Central Asia.", "The Black Death started in England."),
 F(2, "How did the plague spread from Asia to Europe?", "Along trade routes, including the Silk Road and on merchant ships", ["By aeroplane", "Through the internet", "It didn't reach Europe"], "Rats and fleas travelled in goods and ships; ships brought it to Italy in 1347.", "Trade routes helped spread the plague to Europe.", "The plague could not travel on ships."),
 F(2, "What was pneumonic plague?", "A form of plague that infected the lungs and spread through coughing and sneezing", ["A mild cold", "A plague of insects", "The same as bubonic in every way"], "It spread person to person and was even deadlier.", "Pneumonic plague spread through coughs and sneezes.", "Pneumonic plague only affected the feet."),
 F(2, "Why did the plague spread so quickly in medieval towns?", "Crowded, dirty streets with rubbish and rats, and no understanding of germs", ["Towns were very clean", "People washed every day", "There were too many doctors"], "Waste was thrown into streets and rivers; people lived close together.", "Dirty, crowded towns helped the plague spread.", "Medieval towns had modern sewers."),
 F(3, "What did many medieval people believe caused the plague?", "God's punishment for sin, bad air (miasma) or the position of the planets", ["Germs carried by fleas", "Radiation", "Vitamin deficiency"], "Germ theory didn't exist until the 1860s, so people used religious and supernatural explanations.", "Many people thought the plague was a punishment from God.", "Medieval doctors knew that bacteria caused the plague."),
 F(3, "Who was unfairly blamed for the plague in many European towns?", "Jewish communities, who were falsely accused and attacked", ["Doctors only", "The rats' owners", "Nobody was blamed"], "These accusations were completely false; it is an example of scapegoating in a crisis.", "Jewish communities were falsely blamed for the plague in parts of Europe.", "Medieval people correctly identified the cause of the plague."),
 F(3, "Why didn't medieval doctors stop the plague?", "They didn't know about bacteria, fleas or how disease spread", ["They didn't care", "They had a cure but kept it secret", "The plague wasn't serious"], "Their ideas were based on old theories like the Four Humours.", "Medieval doctors did not know about germs.", "Medieval doctors used antibiotics against the plague.")
];
G["ins/blackdeath"] = G7.factGen(CAUSE);

/* ================= 3. Responses: beliefs, treatments and prevention ================= */
const RESP = [
 F(1, "Why did people carry posies of flowers or sweet herbs?", "They believed sweet smells protected them from 'bad air'", ["As gifts", "To eat", "To attract rats"], "This came from the miasma theory: disease spread through foul-smelling air.", "People carried flowers to protect themselves from bad air.", "People carried flowers to cure the plague bacteria."),
 F(1, "Why did many people pray and go to church during the plague?", "They believed the plague was a punishment from God", ["Churches were hospitals with medicine", "It was the law", "To hide from rats"], "Prayer, fasting and pilgrimages were common responses.", "Many people turned to prayer during the plague.", "Nobody went to church during the plague."),
 F(2, "Who were the flagellants?", "Groups who whipped themselves in public to show God they were sorry for their sins", ["Doctors", "Rat catchers", "Knights"], "They hoped God would end the plague; the Pope later condemned them.", "Flagellants whipped themselves to ask God for forgiveness.", "Flagellants were medieval doctors."),
 F(2, "What did medieval doctors do to 'balance the humours'?", "Bloodletting (draining blood) and making patients vomit", ["Giving antibiotics", "X-rays", "Vaccines"], "They believed illness was caused by an imbalance of the four humours.", "Doctors used bloodletting to try to cure plague.", "Medieval doctors gave plague vaccines."),
 F(2, "What did many rich people do when the plague arrived?", "Fled from towns to the countryside", ["Stayed in crowded towns", "Opened hospitals", "Moved into ships"], "Running away was one of the few things that sometimes worked.", "Some wealthy people fled to the countryside.", "Everyone stayed in towns during the plague."),
 F(2, "What does the word 'quarantine' come from?", "The Italian 'quaranta giorni' — 40 days of isolation", ["A French cheese", "A type of rat", "A Latin prayer"], "Ships arriving at ports like Venice and Ragusa had to wait before landing.", "Quarantine comes from the Italian word for forty.", "Quarantine was invented in the 1900s."),
 F(2, "Which of these was a medieval 'cure' that did NOT work?", "Rubbing a cut-open onion on buboes", ["Antibiotics", "Vaccination", "Killing fleas with insecticide"], "Many strange remedies were tried; none treated the bacteria.", "Many medieval plague remedies did not work.", "Onions cured the plague."),
 F(3, "Did the famous beak-masked 'plague doctor' costume exist during the Black Death of 1348?", "No: it appeared in the 1600s, about 300 years later", ["Yes, everyone wore it", "Yes, but only in England", "It was invented in 2000"], "It is a common myth. The beak held sweet-smelling herbs against 'bad air'.", "The beaked plague doctor mask dates from the 1600s, not 1348.", "Plague doctors wore beaked masks during the Black Death of 1348."),
 F(3, "Which response actually helped reduce the spread?", "Isolating sick people and quarantining arrivals", ["Whipping yourself", "Carrying flowers", "Ringing church bells"], "Keeping people apart reduced contact, even though people didn't know why it worked.", "Isolation helped slow the plague.", "Ringing church bells stopped the plague spreading."),
 F(3, "Why do historians say medieval responses were 'logical' even if they didn't work?", "They made sense based on what people believed caused disease at the time", ["They were random", "They were based on modern science", "They always worked"], "If you believe in miasma, carrying flowers seems sensible.", "Medieval responses made sense given their beliefs.", "Medieval people had no reasons for their responses.")
];
G["ins/blackdeathresponse"] = G7.factGen(RESP);

/* ================= 4. Consequences and the Peasants' Revolt ================= */
const CONS = [
 F(1, "Roughly what fraction of Europe's population died in the Black Death?", "Between a third and a half", ["About 1 in 100", "Everyone", "About 1 in 10"], "Historians estimate tens of millions died in Europe between 1347 and 1351.", "Between a third and a half of Europe's people died.", "Only a few hundred people died in the Black Death."),
 F(1, "What happened to the number of workers after the Black Death?", "There was a big shortage of workers", ["There were too many workers", "Nothing changed", "Everyone became a knight"], "Fewer people meant fields went unharvested.", "There was a shortage of workers after the plague.", "There were more workers after the plague."),
 F(1, "In which year was the Peasants' Revolt?", "1381", ["1066", "1348", "1215"], "Rebels marched on London in June 1381.", "The Peasants' Revolt happened in 1381.", "The Peasants' Revolt happened in 1066."),
 F(1, "Who was king during the Peasants' Revolt?", "Richard II, aged 14", ["William I", "King John", "Henry VIII"], "The young king met the rebels himself.", "Richard II was king during the Peasants' Revolt.", "King John faced the Peasants' Revolt."),
 F(2, "Why could surviving peasants demand higher wages?", "Workers were scarce, so lords competed to hire them", ["The king ordered it", "Money was free", "Lords were kind"], "Supply and demand: fewer workers made labour more valuable.", "Labour shortages let peasants ask for more pay.", "Peasants' wages fell after the Black Death."),
 F(2, "What was the Statute of Labourers (1351)?", "A law trying to keep wages at pre-plague levels and stop peasants moving", ["A law giving peasants freedom", "A plague cure", "A tax on castles"], "It angered peasants and is one long-term cause of the revolt.", "The Statute of Labourers tried to stop wages rising.", "The Statute of Labourers raised peasants' wages."),
 F(2, "What was the trigger (short-term cause) of the Peasants' Revolt?", "A new poll tax (a tax on every adult) in 1380–81", ["The Battle of Hastings", "A plague cure", "A new castle"], "The third poll tax of one shilling per person was hugely unpopular.", "The poll tax triggered the Peasants' Revolt.", "The Peasants' Revolt was triggered by Magna Carta."),
 F(2, "Who led the rebels in the Peasants' Revolt?", "Wat Tyler", ["William Walworth", "Richard II", "John of Gaunt"], "John Ball, a radical priest, inspired them too.", "Wat Tyler led the Peasants' Revolt.", "King Richard II led the rebels."),
 F(2, "Which priest preached 'When Adam delved and Eve span, who was then the gentleman?'", "John Ball", ["Wat Tyler", "Thomas Becket", "William Walworth"], "He meant that God created everyone equal.", "John Ball preached that people were born equal.", "Wat Tyler was a priest."),
 F(3, "What happened to Wat Tyler at Smithfield?", "He was killed by the Mayor of London, William Walworth", ["He became king", "He escaped to France", "He was knighted"], "Richard II then persuaded the rebels to go home with promises he later broke.", "Wat Tyler was killed at Smithfield.", "Wat Tyler was made Lord Mayor."),
 F(3, "How did the Black Death help weaken the feudal system?", "Peasants could bargain for wages and freedom, and many villeins stopped being tied to the land", ["It made serfdom stronger forever", "It had no effect", "It ended the monarchy"], "Over the next century, serfdom slowly faded in England.", "The Black Death helped weaken the feudal system.", "The Black Death made the feudal system stronger forever."),
 F(3, "How did the Black Death affect the Church?", "Many priests died, and some people lost faith because prayers didn't stop the plague", ["It became stronger and more trusted by everyone", "It disappeared", "Nothing happened"], "Some new priests were poorly trained, which caused criticism.", "The plague damaged some people's trust in the Church.", "No priests died in the Black Death."),
 F(3, "Was the Peasants' Revolt a success?", "Short term no (leaders executed, promises broken); long term partly (poll tax dropped, serfdom declined)", ["Yes, the peasants took over England", "Completely, the king was overthrown", "It never happened"], "Historians debate how much it changed.", "The Peasants' Revolt failed in the short term.", "The Peasants' Revolt overthrew Richard II.")
];
G["ins/blackdeathimpact"] = G7.factGen(CONS);

/* dates and timeline generator (mixed into every topic's later sets) */
const DATES = [["The Battle of Hastings", 1066], ["The Domesday Book survey", 1086], ["Magna Carta", 1215], ["The plague reaches Italy by ship", 1347], ["The Black Death reaches England", 1348], ["The Statute of Labourers", 1351], ["The Peasants' Revolt", 1381]];
G["ins/medievaldates"] = (d, r) => { const K = G7.kit(r), e = K.pick(DATES);
  if (d === 1) return G7.mcq(1, `When did this happen: ${e[0]}?`, String(e[1]), K.shuffle(DATES.filter(x => x[1] !== e[1])).slice(0, 3).map(x => String(x[1])), `${e[0]}: ${e[1]}.`);
  if (d === 2) return { d:2, k:"num", q:`Type the year: ${e[0]}.`, a:e[1], x:`${e[0]} happened in ${e[1]}.` };
  const pair = K.shuffle(DATES).slice(0, 2), first = pair[0][1] < pair[1][1] ? pair[0] : pair[1];
  if (K.int(0, 1)) return G7.mcq(3, `Which happened first?`, first[0], [pair.find(x => x !== first)[0]], `${pair[0][0]} (${pair[0][1]}) and ${pair[1][0]} (${pair[1][1]}): ${first[0]} came first.`);
  const a = K.pick(DATES), b = K.pick(DATES.filter(x => x !== a)); return { d:3, k:"num", q:`How many years after ${a[1] < b[1] ? a[0] : b[0]} was ${a[1] < b[1] ? b[0] : a[0]}?`, a:Math.abs(a[1] - b[1]), x:`${Math.max(a[1], b[1])} − ${Math.min(a[1], b[1])} = ${Math.abs(a[1] - b[1])} years.` };
};

const mc = G7.mcq, ex = G7.ex, gen = G7.gen;
const YT = (id, t, by) => ({ yt:id, title:t, by });
const OAK = (slug, t) => ({ url:"https://www.thenational.academy/pupils/lessons/" + slug + "/video", title:t, by:"Oak National Academy" });
const BBC = (q, t) => ["📗", t, "https://www.bbc.co.uk/bitesize/search?q=" + encodeURIComponent(q)];
const T = o => Object.assign({ strand:"MYP 2 · History · Medieval world", focus:true }, o);
const add = t => { if (!INS.topics.some(x => x.id === t.id)) INS.topics.push(t); };
const mix = (k1, lv, base) => gen(k1, lv, base).concat(gen("ins/medievaldates", "123", base + 7));

add(T({ id:"medievallife", title:"🏰 Medieval times: life and the feudal system",
  learn:{ ideas:["The Middle Ages (medieval period) lasted roughly from 500 to 1500 CE. In England it is often dated from the Norman Conquest of 1066.",
    "In 1066 William, Duke of Normandy, won the Battle of Hastings and became King William I ('the Conqueror').",
    "The feudal system: the king owned all the land → barons received land and gave loyalty and knights → knights received land and fought → peasants worked the land and gave labour and food.",
    "Most people were peasants. Villeins (serfs) were not free: they worked the lord's land and needed permission to leave the manor.",
    "The Church was hugely powerful: everyone paid a tithe (a tenth of their produce), and it ran monasteries, schools and hospitals.",
    "The Normans built motte and bailey castles to control England, and William ordered the Domesday Book (1086) to record land and wealth."],
    example:"Why did the feudal system help William control England?\nHe gave land only to people who swore loyalty (homage) to him.\nIn return they had to provide knights for his army.\nSo his most powerful followers depended on him and had to keep the peace for him.",
    more:[ ex("Draw the feudal pyramid and explain what each level gives and gets.", ["King (top): owns the land, gives it to barons; gets loyalty, taxes and soldiers.", "Barons: get land from the king; give loyalty, money and knights.", "Knights: get land from barons; give military service.", "Peasants (bottom, the most people): get a small strip of land and protection; give labour, food and taxes."], "Land flows down; loyalty and service flow up") ],
    videos:[ YT("5Whvf2EPe-g", "What was Feudalism in Medieval Europe?", "World History Encyclopedia"), OAK("the-feudal-system-in-norman-england", "The feudal system in Norman England (Oak)"), OAK("landowning-and-the-feudal-system-chjk0e", "Landowning and the feudal system (Oak, Year 7)") ],
    fun:"Historians in the Middle Ages never used the words 'feudal system' — the term was invented in the 1600s to describe how medieval society worked!",
    trick:"Feudal pyramid, top to bottom: 'King Bob Knows Peasants' — King, Barons, Knights, Peasants." },
  links:[ BBC("KS3 feudal system medieval", "BBC Bitesize: life in medieval England") ],
  tasks: mix("ins/medievallife", "111122223333", 71011),
  pool: gen("ins/medievallife", "1122331122331", 71501).concat([ mc(2, "What is a 'manor'?", "A lord's estate, including his house, village and land", ["A type of armour", "A church service", "A tax"], "Peasants lived and worked on the manor."), mc(3, "What was the 'demesne'?", "The part of the manor's land farmed for the lord", ["A peasant's house", "A castle tower", "A type of tax"], "Villeins had to work on the demesne for free several days a week.") ]) }));

add(T({ id:"blackdeath", title:"🐀 The Black Death: causes and spread",
  learn:{ ideas:["The Black Death was a deadly plague that swept across Asia, the Middle East and Europe between about 1346 and 1353.",
    "It probably began in Central Asia and spread west along trade routes such as the Silk Road, then by merchant ships to Italy (1347). It reached England in 1348.",
    "Cause (discovered in 1894): the bacterium Yersinia pestis, carried by fleas living on black rats. Flea bites passed it to people.",
    "Bubonic plague caused buboes (swellings in the armpits, neck and groin), fever and dark patches. Pneumonic plague infected the lungs and spread through coughs and sneezes.",
    "Crowded, dirty towns with rubbish and rats helped it spread quickly.",
    "Medieval people did not know about germs. They blamed God's punishment, 'bad air' (miasma) or the planets — and in some places unfairly blamed Jewish communities, who were attacked."],
    example:"Explain how trade helped spread the Black Death.\nMerchants travelled long distances along the Silk Road and by sea.\nRats and their infected fleas hid in goods and on ships.\nWhen ships docked in ports like Messina (Sicily) in 1347, the fleas and the disease came ashore and spread inland.",
    more:[ ex("Explain the difference between bubonic and pneumonic plague.", ["Bubonic: spread by flea bites; caused buboes (swellings) and fever.", "Pneumonic: infected the lungs; spread from person to person by coughing and sneezing.", "Pneumonic plague was even more deadly and spread faster in crowded places.", "Both were caused by the same bacterium, Yersinia pestis."], "Same bacterium, different ways of spreading") ],
    videos:[ YT("MYnMXEcHI7U", "Plague 101", "National Geographic"), OAK("the-arrival-of-the-black-death", "The arrival of the Black Death (Oak)"), OAK("the-impact-of-the-black-death-in-europe", "The impact of the Black Death in Europe (Oak)") ],
    fun:"The name 'Black Death' wasn't used at the time — people called it 'the great mortality' or 'the pestilence'. The name came centuries later!",
    trick:"R-F-B: Rats carried Fleas that carried Bacteria." },
  links:[ BBC("Black Death causes and effects", "BBC Bitesize: the Black Death"), ["📖", "World History Encyclopedia: Black Death", "https://www.worldhistory.org/Black_Death/"] ],
  tasks: mix("ins/blackdeath", "111122223333", 72011),
  pool: gen("ins/blackdeath", "1122331122331", 72501).concat([ mc(2, "Which modern discovery finally explained the cause of plague?", "Germ theory (bacteria cause disease)", ["The telescope", "Electricity", "The steam engine"], "Germ theory (Pasteur, 1860s) led to Yersin identifying the plague bacterium in 1894."), mc(3, "Why is 'trade routes' a long-term cause and 'a ship arriving in 1348' a trigger?", "Trade routes created the conditions over years; the ship's arrival actually started the outbreak in England", ["They are the same", "Ships are always long-term causes", "Neither caused it"], "Historians separate long-term causes from immediate triggers.") ]) }));

add(T({ id:"blackdeathresponse", title:"🌿 The Black Death: beliefs, treatments and prevention",
  learn:{ ideas:["Religious responses: praying, fasting, going on pilgrimages, and flagellants who whipped themselves in public to ask God's forgiveness.",
    "Miasma (bad air) responses: carrying posies of flowers or sweet herbs, burning herbs, cleaning streets.",
    "Medical responses based on the Four Humours: bloodletting, making people vomit, lancing (cutting open) buboes, strange remedies like onions or vinegar.",
    "Avoidance: fleeing towns, isolating the sick, quarantine of ships (from Italian 'quaranta' = forty days).",
    "Isolation and quarantine actually helped, even though people didn't know why. Most other remedies did not work.",
    "Myth buster: the famous beaked 'plague doctor' mask comes from the 1600s, not the Black Death of 1348."],
    example:"Why did people carry flowers, and why didn't it work?\nThey believed in miasma: that disease spread through foul-smelling air.\nSweet smells were thought to block the bad air.\nBut the plague was really spread by fleas and coughs, so flowers gave no protection.",
    more:[ ex("Judge: 'Medieval responses to the Black Death were useless.' Do you agree?", ["Agree: most remedies (flowers, bloodletting, flagellants) had no effect on the bacteria.", "Disagree: isolation, quarantine and fleeing reduced contact and saved some lives.", "Context: their responses made sense with their beliefs about God and bad air.", "Judgement: mostly ineffective, but not completely useless."], "A balanced judgement") ],
    videos:[ { url:"https://www.worldhistory.org/video/2808/the-black-death-of-medieval-europe-and-their-cures/", title:"The Black Death of Medieval Europe and Their Cures", by:"World History Encyclopedia" }, OAK("the-arrival-of-the-black-death", "The arrival of the Black Death (Oak)") ],
    fun:"The port of Ragusa (now Dubrovnik, Croatia) made one of the first quarantine laws in 1377 — the idea is still used against diseases today.",
    trick:"Three ways people responded — PMA: Pray (religion), Mask the air (miasma), Avoid (flee and isolate)." },
  links:[ BBC("Black Death treatments medieval", "BBC Bitesize: medieval medicine") ],
  tasks: mix("ins/blackdeathresponse", "111122223333", 73011),
  pool: gen("ins/blackdeathresponse", "1122331122331", 73501).concat([ mc(2, "What were the Four Humours?", "Blood, phlegm, yellow bile and black bile, which doctors believed had to be balanced", ["The four seasons", "Four types of rat", "Four kings of England"], "An ancient Greek idea still used by medieval doctors.") ]) }));

add(T({ id:"blackdeathimpact", title:"⚖️ The Black Death: consequences and the Peasants' Revolt",
  learn:{ ideas:["Between a third and a half of Europe's people died. In England, whole villages were abandoned.",
    "With fewer workers, survivors could demand higher wages and move to better-paid work.",
    "The government tried to stop this with the Ordinance (1349) and Statute of Labourers (1351), fixing wages at old levels — this angered peasants.",
    "In 1381 a new poll tax (a tax on every adult) triggered the Peasants' Revolt, led by Wat Tyler and inspired by the priest John Ball.",
    "Rebels from Kent and Essex marched on London and met the 14-year-old King Richard II. At Smithfield, Wat Tyler was killed; the king's promises were later broken and leaders executed.",
    "Long term: the poll tax was dropped and serfdom slowly declined — the Black Death helped weaken the feudal system."],
    example:"Explain why the Black Death led to the Peasants' Revolt.\nLong-term: the plague killed so many that workers became scarce and peasants expected better pay and freedom.\nThe Statute of Labourers tried to hold wages down, causing resentment.\nTrigger: the unpopular poll tax of 1380–81 pushed angry peasants to rebel.",
    more:[ ex("Was the Peasants' Revolt a success?", ["Short term: failure — Wat Tyler was killed, promises were broken, leaders executed.", "Long term: no more poll taxes for a long time.", "Serfdom faded over the next century as peasants gained bargaining power.", "Judgement: it failed at the time but showed ordinary people could challenge those in power."], "Short-term failure, long-term influence") ],
    videos:[ OAK("the-impact-of-the-black-death-on-england", "The impact of the Black Death on England (Oak)"), OAK("the-statute-of-labourers-and-the-response-to-the-black-death", "The Statute of Labourers (Oak)"), OAK("the-decline-of-the-feudal-system", "The decline of the feudal system (Oak)"), OAK("the-peasants-revolt", "The Peasants' Revolt (Oak)"), OAK("the-causes-of-the-peasants-revolt", "The causes of the Peasants' Revolt (Oak)") ],
    fun:"Richard II was only 14 when he rode out to face thousands of rebels — and he persuaded them to go home!",
    trick:"Plague → fewer workers → higher wages → Statute of Labourers → poll tax → REVOLT (1381)." },
  links:[ BBC("Peasants Revolt 1381", "BBC Bitesize: the Peasants' Revolt") ],
  tasks: mix("ins/blackdeathimpact", "111122223333", 74011),
  pool: gen("ins/blackdeathimpact", "1122331122331", 74501).concat([ mc(2, "What was a poll tax?", "A tax that everyone over a certain age paid, the same amount for rich and poor", ["A tax on land only", "A tax on voting", "A tax on rats"], "This felt very unfair to poor peasants."), mc(3, "Why did lords and the government fear peasants moving to new jobs?", "Lords would lose their workers and have to pay more", ["Peasants would become knights", "Towns would close", "They didn't care"], "It threatened the feudal order.") ]) }));
})();
