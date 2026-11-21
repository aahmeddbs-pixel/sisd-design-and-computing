/* UK Study Plus · Year 8 Term 1 Summative revision, part 2 (Dubai Scholars, 2026–27 content document).
   Adds: English Paper 1 (reading) and Paper 2 (writing) topics, French, MSCS, Arabic, and Islamic Education
   (with the teacher's three revision answer keys shown as page images, so the Qur'anic Arabic is exactly as printed).
   Question generators (fact banks, French verb tables, word roots) give hundreds of different questions.
   Loads after uk/y8-revision.js. */
(function(U){
"use strict";
const GEN = window.UK_GEN; if (!GEN) return;
const R = "Term 1 Revision";
const rng = seed => { let a = seed >>> 0 || 1; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const kit = r => ({ int:(a, b) => a + Math.floor(r() * (b - a + 1)), pick:L => L[Math.floor(r() * L.length)], shuffle:L => { const a = L.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; } });
const mcq = (d, q, right, wrong, x) => { const o = [right].concat(wrong.filter(w => w !== right)).filter((v, i, A) => A.indexOf(v) === i).slice(0, 4); return { d, k:"mcq", q, o, a:0, x }; };
const strip = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const tx = (d, q, a, x) => { const A = [].concat(a); return { d, k:"text", q, a:A, best:A[0], x }; };   /* uk.html already accepts answers typed without accents (and points out the missing accent) */

/* ---------- generator registry ---------- */
const G2 = {};
if (!GEN.__rev2){ const M0 = GEN.make, H0 = GEN.has;
  GEN.make = (key, d, seed) => { const g = G2[key]; if (!g) return M0(key, d, seed); try { const t = g(d, rng(seed >>> 0)); if (!t || (t.k === "mcq" && (t.a < 0 || !t.o || t.o.length < 2 || new Set(t.o).size !== t.o.length))) return null; t.d = t.d || d; return t; } catch(e){ return null; } };
  GEN.has = key => !!G2[key] || H0(key); GEN.__rev2 = true; }
const gen = (key, levels, base) => levels.split("").map((d, i) => GEN.make(key, +d, base + i * 977)).filter(Boolean);
/* fact bank: [d, question, right, [wrong…], explanation, true statement, false statement] → multiple choice or true/false */
const factGen = F => (d, r) => { const K = kit(r); let L = F.filter(f => f[0] === d); if (!L.length) L = F; const f = K.pick(L);
  if ((f[5] || f[6]) && K.int(0, 2) === 0){ const truth = f[6] ? K.int(0, 1) === 1 : true; return { d, k:"tf", q:"True or false?\n" + (truth ? f[5] : f[6]), a:truth, x:(truth ? "True. " : "False. ") + f[4] }; }
  return mcq(d, f[1], f[2], K.shuffle(f[3]).slice(0, 3), f[4]); };
const ex = (q, steps, a) => ({ q, steps, a });
const T = o => ({ id:o.id, title:o.title, strand:o.strand, focus:!!o.focus, learn:{ ideas:o.ideas, example:o.example, more:o.more || [], fun:o.fun, trick:o.trick, videos:o.videos, sheets:o.sheets }, tasks:o.tasks, pool:o.pool || [] });
const VID = (file, title) => ({ mp4:"uk/videos/" + file + ".mp4", poster:"uk/videos/" + file + ".jpg", title });

/* =====================================================================================
   ENGLISH · Paper 1 Reading (Wed 25 Nov) and Paper 2 Writing (Wed 18 Nov)
   ===================================================================================== */
G2["y8revenglish/diary"] = factGen([
 [1, "Who wrote 'The Diary of a Young Girl'?", "Anne Frank", ["Otto Frank", "Malala Yousafzai", "Miep Gies"], "Anne Frank, a Jewish girl, wrote it while hiding from the Nazis in Amsterdam.", "The Diary of a Young Girl was written by Anne Frank.", "The Diary of a Young Girl was written by her father, Otto Frank."],
 [1, "In which city did Anne Frank's family hide?", "Amsterdam", ["Berlin", "Paris", "London"], "They hid in the 'Secret Annex' behind her father's business in Amsterdam, the Netherlands.", "Anne Frank's family hid in Amsterdam.", "Anne Frank's family hid in London."],
 [1, "What name did Anne give her diary?", "Kitty", ["Margot", "Peter", "Diary"], "She wrote her entries as letters beginning 'Dear Kitty'.", "Anne wrote her diary entries to 'Kitty'.", "Anne called her diary 'Margot'."],
 [1, "What is the hiding place in the diary called?", "The Secret Annex", ["The Attic Room", "The Cellar", "The Old Barn"], "In Dutch, 'Het Achterhuis' — rooms at the back of the building, hidden behind a bookcase.", "The family hid in the Secret Annex.", "The family hid in a farmhouse in the countryside."],
 [2, "Why did the Frank family go into hiding in 1942?", "To escape Nazi persecution of Jewish people during the Second World War", ["They had lost their house", "They were on holiday", "They owed money"], "The Nazis occupied the Netherlands and began deporting Jewish people to camps.", "The Franks hid to escape Nazi persecution.", "The Franks hid because they wanted a quiet holiday."],
 [2, "How did Anne receive her diary?", "As a present for her 13th birthday in June 1942", ["She bought it in hiding", "Her teacher gave it to her", "She found it in the annex"], "She received it on 12 June 1942, shortly before the family went into hiding.", "Anne got her diary for her 13th birthday.", "Anne found her diary in the Secret Annex."],
 [2, "What is the main PURPOSE of a diary like Anne's?", "To record personal thoughts, feelings and daily events", ["To persuade readers to buy something", "To give instructions", "To report news to the public"], "Diaries are personal and reflective, written in the first person.", "A diary records personal thoughts and feelings.", "A diary is written to give instructions."],
 [2, "What narrative voice does Anne's diary use?", "First person ('I')", ["Third person ('she')", "Second person ('you')", "No narrator"], "First person lets us see events through Anne's own eyes.", "Anne's diary is written in the first person.", "Anne's diary is written in the third person."],
 [3, "Why is Anne's diary such an important historical source?", "It gives a personal, eyewitness view of life in hiding during the Holocaust", ["It is a novel made up by Anne", "It lists every battle of the war", "It was written by a soldier"], "Primary sources like diaries show how events felt to real people.", "Anne's diary is a primary source about the Holocaust.", "Anne's diary is a fictional story."],
 [3, "What happened to the people in the Secret Annex in August 1944?", "They were discovered and arrested", ["They escaped to America", "The war ended", "They moved to a bigger house"], "They were betrayed and deported; Anne died in Bergen-Belsen in early 1945. Only her father, Otto, survived and published the diary.", "The people in the annex were arrested in 1944.", "Anne Frank survived the war and published her diary herself."],
 [3, "Which word best describes the tone when Anne writes about longing to be outside?", "Wistful (sad and longing)", ["Angry", "Bored", "Boastful"], "Tone = the writer's attitude or feeling; Anne often longs for freedom and nature.", "Anne's writing about the outdoors often has a longing tone.", "Anne's diary never shows any feelings."],
 [3, "Why do diary writers often use rhetorical questions and exclamations?", "To show strong emotions and inner thoughts", ["To give facts", "To list steps", "To sound like a news report"], "Diaries are emotional and personal.", "Diaries often use exclamations to show feelings.", "Diaries never include questions."]]);
G2["y8revenglish/mahsuri"] = factGen([
 [1, "Where does the Legend of Mahsuri come from?", "Langkawi, Malaysia", ["Bali, Indonesia", "Kerala, India", "Mindanao, Philippines"], "It is the best-known legend of the island of Langkawi.", "The Legend of Mahsuri comes from Langkawi, Malaysia.", "The Legend of Mahsuri comes from Japan."],
 [1, "What was Mahsuri famous for in the village?", "Her beauty and kindness", ["Her wealth", "Her fighting skill", "Her singing"], "Her beauty made some villagers jealous.", "Mahsuri was known for her beauty and kindness.", "Mahsuri was known as a fierce warrior."],
 [2, "What was Mahsuri wrongly accused of?", "Being unfaithful to her husband while he was away at war", ["Stealing rice", "Starting a fire", "Spying for an enemy"], "Jealous villagers spread false rumours about her and a traveller.", "Mahsuri was falsely accused while her husband was at war.", "Mahsuri admitted to the crime she was accused of."],
 [2, "What sign proved Mahsuri was innocent?", "White blood flowed from her wound", ["A rainbow appeared", "The sea turned red", "Her husband returned"], "In the legend, white blood was a sign of her purity and innocence.", "White blood was the sign of Mahsuri's innocence.", "Red roses grew where Mahsuri stood."],
 [2, "What did Mahsuri say would happen to Langkawi?", "It would suffer bad luck (a curse) for seven generations", ["It would become rich forever", "It would sink into the sea", "It would be ruled by her son"], "Many people link Langkawi's later prosperity to the end of the seven generations.", "Mahsuri cursed Langkawi for seven generations.", "Mahsuri blessed Langkawi with seven years of good harvests."],
 [3, "What genre is the Legend of Mahsuri?", "A legend: a traditional story that may be based on real people but includes supernatural events", ["A news report", "A science fiction story", "A diary"], "Legends mix history and fantasy and are passed down through generations.", "A legend may be based on real people and places.", "A legend is always completely true."],
 [3, "What is a key message (moral) of the Legend of Mahsuri?", "Jealousy and false rumours can cause terrible injustice", ["Always travel alone", "Money brings happiness", "Never get married"], "The story warns against gossip and judging without evidence.", "The legend warns against jealousy and gossip.", "The legend teaches that rumours are always true."],
 [3, "Why is the legend culturally significant to Langkawi today?", "Mahsuri's tomb is a historic site and the story is part of the island's identity", ["It is not known there", "It is only a film", "It is taught as maths"], "Makam Mahsuri (her tomb) is visited by tourists and locals.", "Mahsuri's tomb is a visitor site in Langkawi.", "No one in Malaysia knows the story of Mahsuri."],
 [2, "Why was Mahsuri's husband away when she was accused?", "He had gone to fight in a war", ["He was on holiday", "He was studying abroad", "He was lost at sea"], "His absence let the jealous villagers spread lies.", "Mahsuri's husband was away at war.", "Mahsuri's husband was at home when she was accused."],
 [3, "How does the legend show the danger of gossip?", "A false rumour led to an innocent woman's death", ["Gossip helped the village", "Nobody believed the rumour", "The rumour was true"], "The story warns readers to look for evidence before judging.", "In the legend, gossip led to injustice.", "In the legend, the rumours turned out to be true."],
 [3, "What do legends and myths have in common?", "They are traditional stories passed down through generations", ["They are always true", "They are written as reports", "They have no characters"], "Both were often told orally before being written down.", "Myths and legends are passed down through generations.", "Myths and legends are always written by one modern author."]]);
G2["y8revenglish/ramsita"] = factGen([
 [1, "Which great Hindu epic tells the story of Rama and Sita?", "The Ramayana", ["The Odyssey", "Beowulf", "The Iliad"], "The Ramayana is traditionally said to be written by the sage Valmiki.", "The story of Rama and Sita comes from the Ramayana.", "The story of Rama and Sita comes from Greek mythology."],
 [1, "Who kidnapped Sita?", "Ravana, the demon king of Lanka", ["Hanuman", "Lakshmana", "King Dasharatha"], "Ravana is often shown with ten heads.", "Ravana, the demon king, kidnapped Sita.", "Hanuman kidnapped Sita."],
 [1, "Who helped Rama to find Sita?", "Hanuman, the monkey god/general, and his army", ["Ravana", "A dragon", "The Pharaoh"], "Hanuman leapt across the sea to Lanka and found Sita.", "Hanuman helped Rama find Sita.", "Rama found Sita without any help."],
 [2, "Why were Rama and Sita living in the forest?", "Rama had been banished (exiled) from his kingdom for 14 years", ["They were on holiday", "They were hunting", "They were lost"], "His stepmother, Queen Kaikeyi, wanted her own son Bharata to be king.", "Rama was exiled for 14 years.", "Rama chose to live in the forest for fun."],
 [2, "How did Ravana trick Rama away from Sita?", "With a beautiful golden deer", ["With a magic sword", "With a storm", "With a letter"], "While Rama chased the golden deer, Ravana captured Sita.", "A golden deer was used to trick Rama.", "Ravana tricked Rama with a flying carpet."],
 [2, "Which brother went with Rama into exile?", "Lakshmana", ["Ravana", "Hanuman", "Bharata"], "Lakshmana stayed loyal to Rama throughout.", "Lakshmana went into exile with Rama.", "Bharata went into exile with Rama."],
 [2, "Which festival celebrates Rama and Sita's return home?", "Diwali, the festival of lights", ["Eid al-Fitr", "Christmas", "Chinese New Year"], "People lit lamps (diyas) to guide Rama and Sita home.", "Diwali celebrates Rama and Sita's return.", "Holi celebrates Rama and Sita's return."],
 [3, "What does the story symbolise?", "The victory of good over evil (light over darkness)", ["The power of money", "The importance of travel", "The danger of forests only"], "Rama represents goodness and duty; Ravana represents evil and pride.", "The story symbolises good defeating evil.", "The story shows evil defeating good."],
 [3, "How did Rama's army reach Lanka?", "They built a bridge of stones across the sea", ["By aeroplane", "By swimming", "By tunnel"], "The monkey army built the bridge to the island of Lanka.", "Rama's army built a bridge to Lanka.", "Rama's army sailed to Lanka on a ship."],
 [3, "Why is the story of Rama and Sita culturally significant?", "It teaches values like duty, loyalty and courage and is celebrated every year at Diwali", ["It is only a modern film", "It has no message", "It is a science textbook"], "It is retold in dance, theatre and art across South and South-East Asia.", "The story is celebrated every year at Diwali.", "The story is only known in Europe."]]);
G2["y8revenglish/readskills"] = (d, r) => { const K = kit(r), c = K.int(0, 3);
  if (c === 0){ const S = K.pick([["The weather was <b>dreadful</b>: rain lashed down and the wind howled.", "dreadful", "very bad", ["very good", "slightly warm", "quiet"]], ["After running the marathon, she was utterly <b>exhausted</b> and collapsed on the grass.", "exhausted", "extremely tired", ["full of energy", "very hungry", "angry"]], ["The room was so <b>cramped</b> that eight people could barely move.", "cramped", "small and crowded", ["huge and empty", "clean", "noisy"]], ["Anne felt <b>isolated</b>, cut off from her friends and the outside world.", "isolated", "alone and separated", ["popular", "excited", "lost in a city"]], ["The villagers were <b>envious</b> of Mahsuri's beauty and spread rumours.", "envious", "jealous", ["proud", "scared", "kind"]], ["The king's <b>decree</b> was read out: everyone must obey the new law.", "decree", "an official order", ["a party", "a meal", "a song"]], ["The ancient temple was <b>dilapidated</b>, with crumbling walls and a collapsed roof.", "dilapidated", "falling apart", ["brand new", "beautifully painted", "very tall"]], ["He gave a <b>reluctant</b> nod, clearly not wanting to agree.", "reluctant", "unwilling", ["eager", "happy", "quick"]]]);
    return mcq(d, `Use the context to work out the meaning of '${S[1]}':\n"${S[0].replace(/<\/?b>/g, "")}"`, S[2], S[3], `Clues in the sentence help: ${S[0].replace(/<b>.*?<\/b>/, "___").replace(/<\/?b>/g, "")} → '${S[1]}' means ${S[2]}.`); }
  if (c === 1){ const S = K.pick([["The Taj Mahal is in Agra, India.", "Fact"], ["The Taj Mahal is the most beautiful building in the world.", "Opinion"], ["Water boils at 100 °C at sea level.", "Fact"], ["Maths is the most boring subject.", "Opinion"], ["Anne Frank received her diary in 1942.", "Fact"], ["Everyone should read Anne Frank's diary.", "Opinion"], ["Langkawi is an island in Malaysia.", "Fact"], ["Legends are more exciting than novels.", "Opinion"], ["Diwali is called the festival of lights.", "Fact"], ["Diwali is the best festival of the year.", "Opinion"], ["The school has 1,200 students.", "Fact"], ["Our school has the friendliest students.", "Opinion"]]);
    return mcq(d, `Fact or opinion?\n"${S[0]}"`, S[1], [S[1] === "Fact" ? "Opinion" : "Fact"], S[1] === "Fact" ? "A fact can be checked and proved true." : "An opinion is what someone thinks or feels; it can't be proved. Words like best, most, should and beautiful often show opinions."); }
  if (c === 2){ const S = K.pick([["Buy now! Only three left — don't miss out!", "To persuade", ["To inform", "To entertain", "To instruct"]], ["First, preheat the oven. Next, mix the flour and eggs.", "To instruct", ["To persuade", "To entertain", "To argue"]], ["The River Thames is 346 km long and flows through London.", "To inform", ["To entertain", "To persuade", "To advise"]], ["Once upon a time, a dragon guarded a golden egg…", "To entertain", ["To inform", "To instruct", "To persuade"]], ["If you feel stressed before exams, try taking short breaks and sleeping well.", "To advise", ["To entertain", "To persuade", "To describe"]], ["Dear Kitty, today I felt so lonely I could cry.", "To express feelings", ["To instruct", "To advertise", "To report news"]]]);
    return mcq(d, `What is the writer's main purpose?\n"${S[0]}"`, S[1], S[2], "Think: what does the writer want the reader to do or feel? Inform, persuade, entertain, instruct, advise, express feelings."); }
  const S = K.pick([["'The streets were silent; even the birds had stopped singing.'", "Eerie and tense", ["Joyful", "Funny", "Angry"]], ["'Hooray! We won the cup at last!'", "Excited and joyful", ["Sad", "Calm", "Frightening"]], ["'It is outrageous that the council has ignored our letters for months.'", "Angry and critical", ["Relaxed", "Humorous", "Nostalgic"]], ["'I still remember Grandma's kitchen, warm and smelling of fresh bread.'", "Nostalgic and warm", ["Furious", "Scientific", "Threatening"]], ["'The results show that 70% of students walk to school.'", "Neutral and factual", ["Emotional", "Sarcastic", "Desperate"]]]);
  return mcq(d, `What is the TONE of this sentence?\n${S[0]}`, S[1], S[2], "Tone is the writer's attitude or mood. Look at word choices and punctuation (exclamation marks, short sentences, emotive words).");
};
const ROOTS = [["bio", "life", ["biology", "biography", "antibiotic"]], ["geo", "earth", ["geography", "geology", "geometry"]], ["graph", "write / draw", ["autograph", "paragraph", "photograph"]], ["tele", "far", ["telephone", "telescope", "television"]], ["port", "carry", ["transport", "portable", "export"]], ["aud", "hear", ["audience", "audio", "audible"]], ["vis / vid", "see", ["visible", "video", "vision"]], ["dict", "say", ["dictionary", "predict", "contradict"]], ["struct", "build", ["construct", "structure", "instruct"]], ["micro", "small", ["microscope", "microphone", "microchip"]], ["phon", "sound", ["phonics", "microphone", "symphony"]], ["chron", "time", ["chronological", "chronicle", "synchronise"]], ["scrib / script", "write", ["describe", "script", "manuscript"]], ["aqua", "water", ["aquarium", "aquatic", "aqueduct"]], ["auto", "self", ["autobiography", "automatic", "autograph"]], ["ject", "throw", ["eject", "project", "reject"]], ["rupt", "break", ["erupt", "interrupt", "disrupt"]], ["spect", "look", ["inspect", "spectator", "respect"]]];
const PREF = [["un", "not", "unhappy"], ["dis", "not / opposite", "disagree"], ["re", "again", "rewrite"], ["pre", "before", "preview"], ["mis", "wrongly", "misunderstand"], ["sub", "under", "submarine"], ["inter", "between", "international"], ["trans", "across", "transport"], ["anti", "against", "antisocial"], ["super", "above / beyond", "superhuman"]];
G2["y8revenglish/roots"] = (d, r) => { const K = kit(r);
  if (d === 1){ const R0 = K.pick(ROOTS); return mcq(1, `What does the root '${R0[0]}' mean? (as in ${R0[2].join(", ")})`, R0[1], K.shuffle(ROOTS.filter(x => x !== R0)).slice(0, 3).map(x => x[1]), `'${R0[0]}' means ${R0[1]}: ${R0[2].map(w => w).join(", ")}.`); }
  if (d === 2){ const P = K.pick(PREF); return mcq(2, `What does the prefix '${P[0]}-' mean? (e.g. ${P[2]})`, P[1], K.shuffle(PREF.filter(x => x !== P)).slice(0, 3).map(x => x[1]), `'${P[0]}-' means ${P[1]}, so '${P[2]}' = ${P[1]} + ${P[2].slice(P[0].length)}.`); }
  const R0 = K.pick(ROOTS), w = K.pick(R0[2]), others = K.shuffle(ROOTS.filter(x => x !== R0)).slice(0, 3).map(x => K.pick(x[2]));
  return mcq(3, `Which word belongs to the same word family (shares the root '${R0[0]}' = ${R0[1]}) as '${R0[2].find(x => x !== w)}'?`, w, others, `'${w}' contains '${R0[0]}' (${R0[1]}).`); };
G2["y8revenglish/nonfiction"] = factGen([
 [1, "Which feature is typical of a report?", "Headings and subheadings", ["Dialogue between characters", "Rhyme", "A 'Dear Kitty' greeting"], "Reports organise facts under clear headings.", "Reports usually use headings and subheadings.", "Reports are written as rhyming poems."],
 [1, "What tense is a diary entry mostly written in?", "Past tense (about what happened), with present tense for feelings now", ["Future tense only", "No tense", "Command form"], "'Today I went…', 'I feel…'.", "Diaries mostly use the past tense to describe events.", "Diary entries are written only in the future tense."],
 [1, "Which is formal register?", "I am writing to inform you that the event has been postponed.", ["Hey! The party's off lol.", "Gonna be late, sorry!", "OMG you won't believe it"], "Formal language avoids slang and contractions.", "Formal writing avoids slang.", "Formal letters should use 'lol' and emojis."],
 [2, "Who is the audience for a formal report?", "Someone who needs information, e.g. a head teacher or council", ["Your best friend only", "Yourself only", "Nobody"], "Audience decides register.", "A report is written for someone who needs the information.", "Reports are always written for close friends."],
 [2, "Which is the best opening for a diary entry?", "Dear Diary, today was the strangest day of my life…", ["Introduction: This report will examine…", "Ingredients: 2 eggs", "Buy now while stocks last!"], "Diaries are personal and chatty.", "Diary entries often begin 'Dear Diary'.", "Diary entries begin with a list of ingredients."],
 [2, "Which features show informal register?", "Contractions (I'm, don't), chatty tone, exclamations", ["Passive voice and technical terms", "Numbered recommendations", "Formal sign-off 'Yours faithfully'"], "Informal = friendly and relaxed.", "Contractions are a feature of informal writing.", "Informal writing never uses contractions."],
 [3, "What should the conclusion of a report contain?", "A summary of findings and recommendations", ["A cliffhanger", "A new story", "A joke"], "E.g. 'It is recommended that…'.", "Reports often end with recommendations.", "Reports end with a cliffhanger."],
 [3, "Which sentence is written in the impersonal style of a report?", "It was found that most students prefer outdoor lessons.", ["I reckon everyone loves outdoor lessons!", "You'll love outdoor lessons!", "OMG outdoor lessons rock"], "Reports often use the passive and avoid 'I'.", "Reports often use impersonal phrases like 'It was found that'.", "Reports must use slang."],
 [3, "Why do diaries use emotive language and rhetorical questions?", "To reveal the writer's private feelings and thoughts", ["To give instructions", "To sound official", "To sell a product"], "Diaries reflect on events and feelings.", "Diaries reveal private feelings.", "Diaries should never show feelings."],
 [2, "Which sign-off goes with a formal letter that starts 'Dear Mrs Khan'?", "Yours sincerely", ["Love from", "See ya", "Cheers"], "Use 'Yours faithfully' with 'Dear Sir or Madam'.", "'Yours sincerely' is used when you know the name.", "A formal letter ends with 'See ya'."]]);
G2["y8revenglish/myth"] = factGen([
 [1, "What is a myth?", "A traditional story that explains natural events or beliefs, often with gods or supernatural beings", ["A true news report", "A recipe", "A scientific report"], "E.g. Greek myths explaining thunder (Zeus).", "Myths often explain natural events.", "Myths are always modern news reports."],
 [1, "What is a legend?", "A traditional story about a hero or real place that mixes history with fantasy", ["A dictionary entry", "A diary", "A shopping list"], "E.g. King Arthur, Mahsuri.", "Legends can be based on real people.", "Legends are always about aliens."],
 [2, "Which feature is typical of myths and legends?", "A hero who faces a challenge or quest", ["Bullet-point instructions", "Graphs and tables", "A bibliography"], "Heroes, villains, magic, a quest and a moral.", "Myths and legends often have a hero and a quest.", "Myths never have heroes."],
 [2, "How could you make a myth 'modern'?", "Set it in today's world with modern objects and problems, but keep the myth features", ["Remove the hero", "Write it as a recipe", "Use only facts"], "E.g. a goddess of the internet who punishes cyberbullies.", "A modern myth uses a modern setting.", "A modern myth must be set 3000 years ago."],
 [3, "What gives a myth a satisfying ending?", "The challenge is resolved and a lesson (moral) or explanation is shown", ["It stops mid-sentence", "Nothing happens", "A list of facts"], "E.g. '…and that is why the city lights never go out.'", "Myths often end with a moral or explanation.", "Myths never have a moral."],
 [3, "Which opening best suits a modern myth?", "Long ago — well, last Tuesday actually — the god of Wi-Fi grew very, very angry.", ["Report on Wi-Fi usage 2026.", "Dear Sir, I am writing to complain.", "Step 1: switch on the router."], "It blends a traditional myth opening with a modern twist.", "A modern myth can blend old and new.", "A modern myth must start 'Dear Sir'."],
 [1, "Which of these is a famous Greek myth?", "Theseus and the Minotaur", ["The Diary of a Young Girl", "Oliver Twist", "A school report"], "Theseus defeats the half-bull, half-man Minotaur in the labyrinth.", "Theseus and the Minotaur is a Greek myth.", "Theseus and the Minotaur is a modern news story."],
 [2, "What is a 'quest' in a myth?", "A difficult journey or task the hero must complete", ["A question at the end", "A type of monster", "The title"], "Quests test the hero's courage and character.", "A quest is a journey or task for the hero.", "A quest is the name of the villain."],
 [2, "What is a 'moral'?", "The lesson the story teaches", ["The first sentence", "The villain's weapon", "The setting"], "E.g. greed leads to downfall.", "A moral is the lesson of a story.", "A moral is a type of monster."],
 [2, "Which technique would build tension in a myth's climax?", "Short sentences and a dash for a dramatic pause", ["A list of facts", "Bullet points", "A formal greeting"], "'The door creaked. Silence — then a roar.'", "Short sentences can build tension.", "Long lists of facts build the most tension."],
 [3, "Why do myths often include supernatural beings?", "To explain things people couldn't understand and to show power beyond humans", ["Because they are science reports", "To give instructions", "They never do"], "E.g. gods causing storms, seasons or the sunrise.", "Myths use supernatural beings to explain the world.", "Myths never include gods or monsters."],
 [3, "What makes a strong villain in a modern myth?", "A clear motive and a threat that connects to today's world", ["No reason for their actions", "Being exactly like the hero", "Not appearing at all"], "E.g. a pollution monster created by waste.", "A good villain has a clear motive.", "A villain should have no motive at all."]]);

const ENG = U.y8revenglish;
if (ENG){ ENG.blurb = "Paper 1 Reading (Wed 25 Nov) and Paper 2 Writing: texts, reading skills, writing forms, punctuation and spelling";
  ENG.exam = "Paper 1 Reading: Wed 25 Nov · 40 marks · 1h 30m";
  ENG.topics.unshift(
  T({ id:"diary", focus:true, title:"📔 Anne Frank: The Diary of a Young Girl", strand:R + " · Paper 1 · Ch 2 Express Yourself (Extracts 1 and 2)",
    ideas:["Anne Frank was a Jewish girl who hid with her family and four others in the 'Secret Annex' in Amsterdam (1942–1944) to escape Nazi persecution.",
      "She received the diary for her 13th birthday (12 June 1942) and wrote to it as 'Dear Kitty'.",
      "It is a first-person, autobiographical, non-fiction text: a primary source about the Holocaust.",
      "Typical diary features: dates, first person, past tense for events, present tense for feelings, emotive language, rhetorical questions, informal tone.",
      "Themes: fear, isolation, growing up, hope, family tension, longing for freedom.",
      "The annex was discovered in August 1944; Anne died in Bergen-Belsen in early 1945. Her father Otto, the only survivor, published the diary."],
    example:"Question: How does Anne show her feelings about being in hiding?\nPoint: Anne shows that she feels trapped and lonely.\nEvidence: she longs to 'ride a bike, dance, whistle' (example of a list of everyday freedoms).\nExplain: the list of simple activities emphasises how much ordinary life she has lost.\nLink: this makes the reader sympathise with her isolation.",
    more:[ ex("How do you answer a 'writer's language' question on the diary?", ["Pick a short quotation.", "Name the technique (e.g. rhetorical question, emotive word, list).", "Explain what it shows about Anne's feelings.", "Explain the effect on the reader (sympathy, sadness, admiration)."], "Quote → technique → feeling → effect") ],
    videos:[ VID("english-fact-opinion", "Fact, opinion, purpose and tone (1 minute)") ],
    fun:"Anne's original diary was a red-and-white checked autograph book. It is displayed in the Anne Frank House in Amsterdam, which welcomes over a million visitors a year.",
    trick:"Diary = D-I-A-R-Y: Dates, I (first person), Attitudes and feelings, Reflection, Your private voice.",
    tasks: gen("y8revenglish/diary", "111122223333", 81011), pool: gen("y8revenglish/diary", "1122331122331", 81501) }),
  T({ id:"readskills", focus:true, title:"🔎 Reading skills: word meaning, fact/opinion, purpose and tone", strand:R + " · Paper 1 · Unfamiliar words, fact and opinion, purpose and tone, language choices",
    ideas:["Meaning from context: read the whole sentence, look for clues (synonyms, examples, contrasts) and try a replacement word.",
      "A FACT can be proved true. An OPINION is a belief or feeling — look for words like best, worst, should, beautiful, I think.",
      "Purpose (why it was written): inform, persuade, entertain, instruct, advise, describe, express feelings.",
      "Tone (the writer's attitude): e.g. angry, joyful, sad, nostalgic, sarcastic, neutral. Find the words and punctuation that create it.",
      "Language analysis: quote a word or phrase → name the technique → explain the effect on the reader (PEE)."],
    example:"\"This shocking decision is a disgrace and must be reversed immediately!\"\nFact or opinion? Opinion ('shocking', 'disgrace').\nPurpose: to persuade.\nTone: angry and urgent (emotive words, exclamation mark, 'immediately').",
    more:[ ex("Work out 'meticulous': \"She was meticulous, checking every answer three times.\"", ["Read the clue after the comma: she checks every answer three times.", "Someone who does this is very careful.", "Try a replacement: 'She was very careful' — it makes sense.", "Meticulous = very careful and precise."], "very careful") ],
    videos:[ VID("english-fact-opinion", "Fact, opinion, purpose and tone (1 minute)") ],
    fun:"English has borrowed words from over 350 languages — 'shampoo' comes from Hindi and 'algebra' from Arabic!",
    trick:"PAT the text: Purpose, Audience, Tone.",
    tasks: gen("y8revenglish/readskills", "111122223333", 82011), pool: gen("y8revenglish/readskills", "1122331122331", 82501) }),
  T({ id:"mahsuri", title:"🏝️ Myths and legends: The Legend of Mahsuri", strand:R + " · Paper 1 · Ch 3 Myths and Legends · cultural context",
    ideas:["The Legend of Mahsuri is a Malaysian legend from the island of Langkawi.",
      "Mahsuri, admired for her beauty and kindness, was falsely accused of being unfaithful while her husband was away at war.",
      "When she was executed, white blood flowed from her wound — a sign of her innocence.",
      "With her dying words she cursed Langkawi to seven generations of bad luck.",
      "Themes: jealousy, injustice, gossip and rumours, innocence. Her tomb (Makam Mahsuri) is a heritage site today.",
      "Cultural significance: legends keep a community's history, values and identity alive."],
    example:"How does the writer make us sympathise with Mahsuri?\nShe is described as kind and beautiful (positive character).\nThe villagers' jealousy and rumours are shown as unfair.\nThe white blood proves her innocence, so the reader feels anger at the injustice.",
    fun:"Langkawi did suffer an invasion and hard times after Mahsuri's death — many islanders believe the island's tourism boom began once the seven generations had passed!",
    trick:"Mahsuri: Jealousy → Lies → White blood → Curse (7 generations).",
    tasks: gen("y8revenglish/mahsuri", "111122223333", 83011), pool: gen("y8revenglish/mahsuri", "1122331122331", 83501) }),
  T({ id:"ramsita", title:"🪔 Myths and legends: Ram and Sita", strand:R + " · Paper 1 · Ch 3 Myths and Legends (Parts 1 and 2)",
    ideas:["Ram (Rama) and Sita come from the Ramayana, an ancient Hindu epic.",
      "Prince Rama is banished for 14 years and lives in the forest with his wife Sita and brother Lakshmana.",
      "The demon king Ravana tricks Rama with a golden deer and kidnaps Sita, taking her to Lanka.",
      "Hanuman and the monkey army help Rama; they build a bridge to Lanka and Rama defeats Ravana.",
      "Rama and Sita return home, and people light lamps (diyas) to guide them — the origin of Diwali, the festival of lights.",
      "Themes: good versus evil, loyalty, duty, courage, light over darkness."],
    example:"Explain the cultural significance of Ram and Sita.\nIt is a sacred story for Hindus, retold for thousands of years.\nIt is celebrated each year at Diwali with lamps, fireworks and sweets.\nIts values (loyalty, duty, good defeating evil) are taught to children through dance, theatre and art.",
    fun:"The Ramayana has about 24,000 verses — roughly four times longer than the Odyssey!",
    trick:"Ram and Sita: Exile → Golden deer → Ravana → Hanuman → Bridge → Victory → Diwali lights.",
    tasks: gen("y8revenglish/ramsita", "111122223333", 84011), pool: gen("y8revenglish/ramsita", "1122331122331", 84501) }),
  T({ id:"roots", title:"🌱 Spelling: word families and roots", strand:R + " · Paper 1 · Spelling: word families, roots",
    ideas:["A root is the core part of a word that carries its meaning, often from Latin or Greek.",
      "Words that share a root belong to the same word family: bio (life) → biology, biography, antibiotic.",
      "Prefixes go at the front and change meaning: un-, dis-, re-, pre-, mis-, sub-, inter-, trans-.",
      "Suffixes go at the end and change the word class: -tion, -ment, -ness, -ful, -less, -able.",
      "Knowing roots helps you spell AND work out meanings of unfamiliar words in the exam."],
    example:"Work out 'transatlantic'.\ntrans- = across.\nAtlantic = the Atlantic Ocean.\n-ic = to do with.\nSo transatlantic = across the Atlantic Ocean.",
    fun:"'Television' mixes Greek 'tele' (far) with Latin 'visio' (seeing) — a word built from two languages!",
    trick:"Break it down: PREFIX + ROOT + SUFFIX.",
    tasks: gen("y8revenglish/roots", "111122223333", 85011), pool: gen("y8revenglish/roots", "1122331122331", 85501) }),
  T({ id:"nonfiction", title:"📝 Writing: report, diary entry and register", strand:R + " · Paper 2 · Report writing, diary entry, formal and informal language",
    ideas:["Report: title, introduction, subheadings, facts and statistics, formal and impersonal language ('It was found that…'), conclusion with recommendations.",
      "Diary entry: date, 'Dear Diary', first person, past tense for events, feelings and reflections, informal and emotive.",
      "Register = how formal or informal your language is. Match it to your audience and purpose.",
      "Formal: no slang or contractions, full sentences, polite tone. Informal: contractions, chatty tone, exclamations.",
      "Plan: Purpose, Audience, Form (PAF) before writing."],
    example:"Task: Write a report for your head teacher about lunchtime clubs.\nTitle: Report on Lunchtime Clubs at Dubai Scholars.\nIntroduction: This report examines which clubs students attend and suggests improvements.\nSubheadings: Current clubs / Student views / Recommendations.\nConclusion: It is recommended that a coding club is introduced on Wednesdays.",
    fun:"Samuel Pepys' diary (1660s) is one of the most famous ever written — he described the Great Fire of London and even buried his cheese to save it!",
    trick:"PAF before you write: Purpose, Audience, Form.",
    tasks: gen("y8revenglish/nonfiction", "111122223333", 86011), pool: gen("y8revenglish/nonfiction", "1122331122331", 86501) }),
  T({ id:"myth", title:"🐉 Writing: a modern myth or legend", strand:R + " · Paper 2 · Ch 3 Writing a modern myth/legend",
    ideas:["Myths explain the natural world or beliefs; legends tell of heroes, often based on real places or people.",
      "Features: a hero, a villain or monster, a challenge or quest, magic or gods, a moral or explanation.",
      "A modern myth keeps these features but sets them in today's world (phones, cities, the internet, climate change).",
      "Structure: opening (setting and hero) → problem → quest → climax → resolution and moral.",
      "Use descriptive techniques: similes, metaphors, personification, varied sentences, dashes for drama."],
    example:"Plan for 'Why the Wi-Fi drops every evening'.\nHero: Zara, a student who loves gaming.\nProblem: Gigabyte, the greedy god of data, steals the evening signal.\nQuest: Zara solves three riddles in the Server Kingdom.\nResolution and moral: Gigabyte shares the signal but takes one hour each night — a reminder to rest.",
    fun:"Many modern superhero stories borrow from ancient myths — Thor is a Norse god, and Wonder Woman comes from Greek mythology!",
    trick:"Myth recipe: Hero + Monster + Quest + Magic + Moral.",
    tasks: gen("y8revenglish/myth", "111122223333", 87011), pool: gen("y8revenglish/myth", "1122331122331", 87501) }));
}

/* =====================================================================================
   FRENCH (Tue 24 Nov · 60 marks · 1h 30m) · Unit 1 Jeunes sans frontières
   ===================================================================================== */
const SUBJ = ["je", "tu", "il", "elle", "nous", "vous", "ils", "elles"], IDX = { je:0, tu:1, il:2, elle:2, on:2, nous:3, vous:4, ils:5, elles:5 };
const REG = { er:["parler", "jouer", "regarder", "aimer", "habiter", "écouter", "danser", "travailler", "chanter", "détester", "adorer", "visiter"], ir:["finir", "choisir", "remplir", "réussir", "grandir"], re:["vendre", "attendre", "répondre", "entendre", "perdre"] };
const END = { er:["e", "es", "e", "ons", "ez", "ent"], ir:["is", "is", "it", "issons", "issez", "issent"], re:["s", "s", "", "ons", "ez", "ent"] };
const IRR = { être:["suis", "es", "est", "sommes", "êtes", "sont"], avoir:["ai", "as", "a", "avons", "avez", "ont"], aller:["vais", "vas", "va", "allons", "allez", "vont"], faire:["fais", "fais", "fait", "faisons", "faites", "font"], prendre:["prends", "prends", "prend", "prenons", "prenez", "prennent"], vouloir:["veux", "veux", "veut", "voulons", "voulez", "veulent"], pouvoir:["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"], venir:["viens", "viens", "vient", "venons", "venez", "viennent"], sortir:["sors", "sors", "sort", "sortons", "sortez", "sortent"], dormir:["dors", "dors", "dort", "dormons", "dormez", "dorment"], lire:["lis", "lis", "lit", "lisons", "lisez", "lisent"], écrire:["écris", "écris", "écrit", "écrivons", "écrivez", "écrivent"], boire:["bois", "bois", "boit", "buvons", "buvez", "boivent"], voir:["vois", "vois", "voit", "voyons", "voyez", "voient"] };
const EXC = { manger:["mange", "manges", "mange", "mangeons", "mangez", "mangent", "keep the e before -ons: mangeons"], nager:["nage", "nages", "nage", "nageons", "nagez", "nagent", "keep the e before -ons: nageons"], voyager:["voyage", "voyages", "voyage", "voyageons", "voyagez", "voyagent", "keep the e before -ons: voyageons"], commencer:["commence", "commences", "commence", "commençons", "commencez", "commencent", "c becomes ç before -ons: commençons"], acheter:["achète", "achètes", "achète", "achetons", "achetez", "achètent", "add a grave accent (è) except with nous and vous"], préférer:["préfère", "préfères", "préfère", "préférons", "préférez", "préfèrent", "é becomes è except with nous and vous"], appeler:["appelle", "appelles", "appelle", "appelons", "appelez", "appellent", "double the l except with nous and vous"], jeter:["jette", "jettes", "jette", "jetons", "jetez", "jettent", "double the t except with nous and vous"], essayer:["essaie", "essaies", "essaie", "essayons", "essayez", "essaient", "y becomes i except with nous and vous"], envoyer:["envoie", "envoies", "envoie", "envoyons", "envoyez", "envoient", "y becomes i except with nous and vous"] };
const MEAN = { parler:"to speak", jouer:"to play", regarder:"to watch", aimer:"to like/love", habiter:"to live", écouter:"to listen", danser:"to dance", travailler:"to work", chanter:"to sing", détester:"to hate", adorer:"to love", visiter:"to visit", finir:"to finish", choisir:"to choose", remplir:"to fill", réussir:"to succeed", grandir:"to grow up", vendre:"to sell", attendre:"to wait", répondre:"to answer", entendre:"to hear", perdre:"to lose", être:"to be", avoir:"to have", aller:"to go", faire:"to do/make", prendre:"to take", vouloir:"to want", pouvoir:"to be able to", venir:"to come", sortir:"to go out", dormir:"to sleep", lire:"to read", écrire:"to write", boire:"to drink", voir:"to see", manger:"to eat", nager:"to swim", voyager:"to travel", commencer:"to start", acheter:"to buy", préférer:"to prefer", appeler:"to call", jeter:"to throw", essayer:"to try", envoyer:"to send" };
const subjForm = (s, v) => (s === "je" && /^[aeiouéèêh]/i.test(v)) ? "j'" + v : s + " " + v;
const conj = v => { if (IRR[v]) return { f:IRR[v], why:`${v} is irregular: learn it by heart (${IRR[v].map((x, i) => subjForm(["je", "tu", "il", "nous", "vous", "ils"][i], x)).join(", ")}).` };
  if (EXC[v]) return { f:EXC[v].slice(0, 6), why:`${v} is a first-group verb with a spelling change: ${EXC[v][6]}.` };
  const g = v.endsWith("er") ? "er" : v.endsWith("ir") ? "ir" : "re", st = v.slice(0, -2); return { f:END[g].map(e => st + e), why:`Regular -${g} verb: take off -${g} (stem '${st}') and add ${END[g].map(e => "-" + (e || "(nothing)")).join(", ")}.` }; };
G2["y8revfrench/present"] = (d, r) => { const K = kit(r);
  const pool = d === 1 ? REG.er.concat(REG.ir, REG.re) : d === 2 ? Object.keys(IRR) : Object.keys(EXC).concat(["être", "avoir", "aller", "faire"]);
  const v = K.pick(pool), s = K.pick(SUBJ), C = conj(v), ans = C.f[IDX[s]];
  if (K.int(0, 2) === 0){ const wrong = K.shuffle(C.f.filter(x => x !== ans)).slice(0, 3); return mcq(d, `Choose the correct present tense form:\n${s} ___ (${v} — ${MEAN[v]})`, ans, wrong, C.why); }
  return tx(d, `Write the present tense form (just the verb):\n${s} ___ (${v} — ${MEAN[v]})`, ans, C.why); };
const REFL = [["se lever", "lève", "lèves", "lève", "levons", "levez", "lèvent", "to get up"], ["se laver", "lave", "laves", "lave", "lavons", "lavez", "lavent", "to wash (oneself)"], ["se réveiller", "réveille", "réveilles", "réveille", "réveillons", "réveillez", "réveillent", "to wake up"], ["s'habiller", "habille", "habilles", "habille", "habillons", "habillez", "habillent", "to get dressed"], ["se coucher", "couche", "couches", "couche", "couchons", "couchez", "couchent", "to go to bed"], ["se doucher", "douche", "douches", "douche", "douchons", "douchez", "douchent", "to have a shower"], ["s'amuser", "amuse", "amuses", "amuse", "amusons", "amusez", "amusent", "to have fun"], ["se brosser (les dents)", "brosse", "brosses", "brosse", "brossons", "brossez", "brossent", "to brush (one's teeth)"], ["s'entendre (avec)", "entends", "entends", "entend", "entendons", "entendez", "entendent", "to get on (with)"], ["se disputer (avec)", "dispute", "disputes", "dispute", "disputons", "disputez", "disputent", "to argue (with)"]];
const RP = ["me", "te", "se", "nous", "vous", "se"];
const reflForm = (R0, i) => { const v = R0[1 + i], p = RP[i]; return (/^[aeiouéèh]/i.test(v) && i !== 3 && i !== 4 ? p.slice(0, 1) + "'" : p + " ") + v; };
G2["y8revfrench/reflexive"] = (d, r) => { const K = kit(r), R0 = K.pick(REFL), s = K.pick(SUBJ), i = IDX[s], ans = reflForm(R0, i);
  if (d === 3 && K.int(0, 1)){ const pc = { "se lever":"levé", "se laver":"lavé", "se réveiller":"réveillé", "s'habiller":"habillé", "se coucher":"couché", "se doucher":"douché", "s'amuser":"amusé", "se brosser (les dents)":"brossé", "se disputer (avec)":"disputé" }[R0[0]]; if (pc){ const subj = K.pick([["il", "s'est", ""], ["elle", "s'est", "e"], ["ils", "se sont", "s"], ["elles", "se sont", "es"]]); return tx(3, `Perfect tense (reflexive verbs use être):\n${subj[0]} ___ hier soir. (${R0[0]} — ${R0[8 - 1]})`, `${subj[1]} ${pc}${subj[2]}`, `Reflexive verbs take être in the perfect tense: ${subj[0]} ${subj[1]} ${pc}${subj[2]}. The past participle agrees with the subject (${subj[2] ? "add -" + subj[2] : "no change"}).`); } }
  if (d === 1){ const wrong = K.shuffle(RP.filter((p, j) => p !== RP[i])).slice(0, 3).map(p => p + " " + R0[1 + i]).filter(w => w !== ans); return mcq(1, `Choose the correct reflexive pronoun and verb:\n${s} ___ (${R0[0]} — ${R0[7]})`, ans, wrong, `With ${s}, the pronoun is ${RP[i]}${/^[aeiouéèh]/i.test(R0[1 + i]) && i !== 3 && i !== 4 ? " (shortened to " + RP[i][0] + "' before a vowel)" : ""}: ${s} ${ans}.`); }
  return tx(d, `Write the pronoun and verb in the present tense:\n${s} ___ (${R0[0]} — ${R0[7]})`, ans, `Reflexive pronouns: je me, tu te, il/elle se, nous nous, vous vous, ils/elles se (m', t', s' before a vowel). ${s} ${ans}.`); };
const AV = [["jouer", "joué", "played"], ["regarder", "regardé", "watched"], ["manger", "mangé", "ate"], ["visiter", "visité", "visited"], ["écouter", "écouté", "listened to"], ["finir", "fini", "finished"], ["choisir", "choisi", "chose"], ["vendre", "vendu", "sold"], ["attendre", "attendu", "waited"], ["faire", "fait", "did/made"], ["prendre", "pris", "took"], ["boire", "bu", "drank"], ["voir", "vu", "saw"], ["lire", "lu", "read"], ["écrire", "écrit", "wrote"], ["avoir", "eu", "had"], ["être", "été", "was"], ["acheter", "acheté", "bought"]];
const ET = [["aller", "allé", "went"], ["venir", "venu", "came"], ["arriver", "arrivé", "arrived"], ["partir", "parti", "left"], ["sortir", "sorti", "went out"], ["entrer", "entré", "entered"], ["rester", "resté", "stayed"], ["tomber", "tombé", "fell"], ["monter", "monté", "went up"], ["descendre", "descendu", "went down"], ["rentrer", "rentré", "went home"], ["retourner", "retourné", "returned"], ["naître", "né", "was born"]];
const AVF = ["ai", "as", "a", "avons", "avez", "ont"], ETF = ["suis", "es", "est", "sommes", "êtes", "sont"];
G2["y8revfrench/perfect"] = (d, r) => { const K = kit(r);
  if (d === 1){ const V = K.pick(AV), s = K.pick(SUBJ), i = IDX[s], ans = (s === "je" ? "j'" + AVF[i] : AVF[i]) + " " + V[1];
    if (K.int(0, 1)) return mcq(1, `Which auxiliary does '${V[0]}' take in the perfect tense?`, "avoir", ["être"], `${V[0]} is not a MRS VANDERTRAMP verb or reflexive, so it uses avoir: j'ai ${V[1]}.`);
    return tx(1, `Perfect tense with avoir:\n${s} ___ (${V[0]} — ${V[2]})`, [AVF[i] + " " + V[1], ans], `avoir (${AVF[i]}) + past participle (${V[1]}). ${s === "je" ? "j'" : s + " "}${AVF[i]} ${V[1]}.`); }
  if (d === 2){ if (K.int(0, 1)){ const V = K.pick(AV.concat(ET)); return tx(2, `What is the past participle of '${V[0]}' (${V[2]})?`, V[1], `-er → -é, -ir → -i, -re → -u; irregulars must be learnt (faire → fait, prendre → pris, boire → bu, voir → vu, avoir → eu, être → été, naître → né).`); }
    const V = K.pick(ET.concat(AV.slice(0, 6))), isE = ET.includes(V); return mcq(2, `Which auxiliary does '${V[0]}' take in the perfect tense?`, isE ? "être" : "avoir", [isE ? "avoir" : "être"], isE ? `${V[0]} is a MRS VANDERTRAMP (movement) verb, so it uses être.` : `${V[0]} uses avoir, like most verbs.`); }
  const V = K.pick(ET), S0 = K.pick([["il", "est", ""], ["elle", "est", "e"], ["nous (Paul et Marc)", "sommes", "s"], ["ils", "sont", "s"], ["elles", "sont", "es"], ["je (Sophie)", "suis", "e"], ["je (Tom)", "suis", ""], ["vous (Léa et Inès)", "êtes", "es"]]);
  const pp = V[1] + S0[2], ans = S0[1] + " " + pp;
  return tx(3, `Perfect tense with être (remember agreement!):\n${S0[0]} ___ (${V[0]} — ${V[2]})`, ans, `${V[0]} uses être: ${S0[1]}. The past participle agrees with the subject: ${V[1]} + ${S0[2] ? "-" + S0[2] : "nothing"} = ${pp}.`); };
const ADJ = [["petit", "petite", "petits", "petites", "small"], ["grand", "grande", "grands", "grandes", "tall/big"], ["intelligent", "intelligente", "intelligents", "intelligentes", "intelligent"], ["bavard", "bavarde", "bavards", "bavardes", "chatty"], ["marrant", "marrante", "marrants", "marrantes", "funny"], ["sportif", "sportive", "sportifs", "sportives", "sporty"], ["actif", "active", "actifs", "actives", "active"], ["heureux", "heureuse", "heureux", "heureuses", "happy"], ["sérieux", "sérieuse", "sérieux", "sérieuses", "serious"], ["paresseux", "paresseuse", "paresseux", "paresseuses", "lazy"], ["gentil", "gentille", "gentils", "gentilles", "kind"], ["beau", "belle", "beaux", "belles", "beautiful/handsome"], ["nouveau", "nouvelle", "nouveaux", "nouvelles", "new"], ["vieux", "vieille", "vieux", "vieilles", "old"], ["blanc", "blanche", "blancs", "blanches", "white"], ["long", "longue", "longs", "longues", "long"], ["timide", "timide", "timides", "timides", "shy"], ["drôle", "drôle", "drôles", "drôles", "funny"], ["sympa", "sympa", "sympas", "sympas", "nice"]];
const NOUNS = [["Mon frère est", 0, "my brother (masculine singular)"], ["Ma sœur est", 1, "my sister (feminine singular)"], ["Mes cousins sont", 2, "my cousins (masculine plural)"], ["Mes cousines sont", 3, "my cousins (feminine plural)"], ["Ma mère est", 1, "my mother (feminine singular)"], ["Mon père est", 0, "my father (masculine singular)"], ["Mes parents sont", 2, "my parents (masculine plural)"], ["Mes amies sont", 3, "my (girl) friends (feminine plural)"], ["Ma meilleure amie est", 1, "my best friend (feminine singular)"], ["Mon grand-père est", 0, "my grandfather (masculine singular)"]];
G2["y8revfrench/adjectives"] = (d, r) => { const K = kit(r), A = K.pick(ADJ), N = K.pick(NOUNS), ans = A[N[1]];
  const rule = ans === A[0] ? "masculine singular: no change" : `${N[2]}: ${["", "add -e (or the special feminine form)", "add -s (-x for -eau/-eux)", "feminine + -s"][N[1]]}`;
  if (d === 1) return mcq(1, `Choose the correct adjective:\n${N[0]} ___. (${A[0]} — ${A[4]})`, ans, A.slice(0, 4).filter(x => x !== ans), `Adjectives agree with the noun: ${rule} → ${ans}.`);
  if (d === 2) return tx(2, `Make the adjective agree:\n${N[0]} ___. (${A[0]} — ${A[4]})`, ans, `${N[0]} … → ${rule} → ${ans}.`);
  if (K.int(0, 1)) return mcq(3, "Which adjectives usually go BEFORE the noun?", "BAGS adjectives: Beauty, Age, Goodness, Size (beau, jeune, vieux, bon, petit, grand…)", ["Colour adjectives (rouge, bleu)", "Nationality adjectives (français)", "All adjectives"], "Most French adjectives go after the noun (un chat noir), but BAGS adjectives go before (un petit chat).");
  return tx(3, `Translate into French: 'my sister is sporty and kind'`, ["ma sœur est sportive et gentille", "ma soeur est sportive et gentille"], "Sœur is feminine: sportif → sportive, gentil → gentille.");
};
G2["y8revfrench/vocab"] = factGen([
 [1, "What does 'je m'entends bien avec mon père' mean?", "I get on well with my dad", ["I argue with my dad", "I look like my dad", "I listen to my dad"], "s'entendre bien avec = to get on well with.", "'Je m'entends bien avec' means 'I get on well with'.", "'Je m'entends bien avec' means 'I argue with'."],
 [1, "What does 'je me dispute avec ma sœur' mean?", "I argue with my sister", ["I play with my sister", "I get on with my sister", "I share with my sister"], "se disputer = to argue.", "'Se disputer' means 'to argue'.", "'Se disputer' means 'to get on well'."],
 [1, "What does 'il m'énerve' mean?", "He annoys me", ["He helps me", "He calls me", "He loves me"], "énerver = to annoy / get on someone's nerves.", "'Il m'énerve' means 'he annoys me'.", "'Il m'énerve' means 'he cheers me up'."],
 [1, "What is 'le week-end dernier'?", "last weekend", ["next weekend", "every weekend", "the weekend after"], "dernier = last; prochain = next.", "'Le week-end dernier' means last weekend.", "'Le week-end dernier' means next weekend."],
 [1, "What does 'mon jour préféré' mean?", "my favourite day", ["my birthday", "my day off", "my first day"], "préféré = favourite.", "'Mon jour préféré' means 'my favourite day'.", "'Mon jour préféré' means 'my worst day'."],
 [1, "How do you say 'I have a brother and two sisters'?", "J'ai un frère et deux sœurs.", ["Je suis un frère et deux sœurs.", "J'ai une frère et deux sœur.", "Il a un frère et deux sœurs."], "avoir for family members; plural sœurs.", "", ""],
 [2, "What does 'agaçant' mean?", "annoying", ["amazing", "angry", "aggressive"], "Mon petit frère est agaçant = my little brother is annoying.", "'Agaçant' means annoying.", "'Agaçant' means generous."],
 [2, "How do you say 'On Saturday I went to the cinema with my friends'?", "Samedi, je suis allé(e) au cinéma avec mes amis.", ["Samedi, j'ai allé au cinéma avec mes amis.", "Samedi, je vais au cinéma avec mes amis.", "Samedi, je suis aller au cinéma avec mes amis."], "aller takes être in the perfect tense.", "", ""],
 [2, "Which connective means 'because'?", "parce que", ["mais", "aussi", "ensuite"], "mais = but, aussi = also, ensuite = then.", "'Parce que' means because.", "'Parce que' means but."],
 [2, "Which phrase gives an opinion in the past?", "C'était génial !", ["C'est génial !", "Ce sera génial !", "Ça va."], "C'était = it was (imperfect).", "'C'était' means 'it was'.", "'C'était' means 'it will be'."],
 [3, "Which is the best 'favourite day' sentence for top marks?", "Mon jour préféré, c'est le samedi parce que je peux faire la grasse matinée et sortir avec mes copains.", ["Samedi bien.", "J'aime samedi.", "Le samedi est un jour."], "Opinion + reason + detail + connectives = higher marks.", "", ""],
 [3, "What does 'je fais la grasse matinée' mean?", "I have a lie-in", ["I eat a big breakfast", "I go to the gym", "I get up early"], "A useful idiom for weekends!", "'Faire la grasse matinée' means to have a lie-in.", "'Faire la grasse matinée' means to get up very early."]].map(f => f[5] === "" ? [f[0], f[1], f[2], f[3], f[4]] : f));

U.y8revfrench = { name:"French: Term 1 Revision", short:"French", year:8, revision:true, icon:"🇫🇷", colour:"#2B4FA0", exam:"Tue 24 Nov · 60 marks written + 10 speaking · 1h 30m",
  blurb:"Unit 1 Jeunes sans frontières: family, relationships, hobbies, last weekend, favourite day; present, reflexive and perfect tenses; adjectives", topics:[
 T({ id:"present", focus:true, title:"🟦 Present tense: regular, irregular and first-group exceptions", strand:R + " · GIA pp. 5–8",
   ideas:["Regular -er: stem + e, es, e, ons, ez, ent (je joue, nous jouons). -ir: is, is, it, issons, issez, issent. -re: s, s, –, ons, ez, ent.",
     "Key irregulars: être (suis, es, est, sommes, êtes, sont), avoir (ai, as, a, avons, avez, ont), aller (vais, vas, va, allons, allez, vont), faire (fais, fais, fait, faisons, faites, font).",
     "First-group exceptions: manger/nager → nous mangeons (keep e); commencer → nous commençons (ç).",
     "acheter → j'achète, préférer → je préfère (accent change), appeler → j'appelle, jeter → je jette (double consonant) — but NOT with nous and vous.",
     "essayer/envoyer → j'essaie, j'envoie (y → i) except nous and vous.",
     "je becomes j' before a vowel or h: j'aime, j'habite."],
   example:"Conjugate 'manger' with nous.\nStem: mang-.\nEnding for nous: -ons.\nmang + ons would sound 'mangons' (hard g), so keep the e: nous mangeons.",
   more:[ ex("Conjugate 'acheter' with je and with nous.", ["je: add the grave accent → j'achète.", "nous: no accent change → nous achetons.", "Rule: the accent appears in the 'boot' (je, tu, il, ils), not with nous/vous."], "j'achète, nous achetons") ],
   videos:[ VID("french-perfect", "The perfect tense with avoir and être (1 minute)") ],
   fun:"Nearly 90% of French verbs are regular -er verbs — learn one and you know thousands!",
   trick:"The 'boot': je, tu, il/elle, ils/elles change; nous and vous (outside the boot) stay regular.",
   tasks: gen("y8revfrench/present", "1111222233333", 91011), pool: gen("y8revfrench/present", "1122331122331123", 91501) }),
 T({ id:"reflexive", title:"🪞 Reflexive verbs (daily routine)", strand:R + " · GIA pp. 11–12",
   ideas:["Reflexive verbs have an extra pronoun: je me, tu te, il/elle se, nous nous, vous vous, ils/elles se.",
     "Before a vowel or h: m', t', s' (je m'habille, il s'amuse).",
     "Daily routine: se réveiller, se lever, se doucher, s'habiller, se brosser les dents, se coucher.",
     "Relationships: s'entendre bien avec (get on well with), se disputer avec (argue with).",
     "Negative: je ne me lève pas. Perfect tense uses être: je me suis levé(e)."],
   example:"Say 'I get up at 7 o'clock'.\nVerb: se lever → je me lève (accent è in the boot).\nAdd the time: à sept heures.\nJe me lève à sept heures.",
   fun:"In French you don't just 'wash' — you 'wash yourself' (se laver). The reflexive pronoun shows the action is done to yourself!",
   trick:"Me, te, se, nous, vous, se — say it like a rhythm.",
   tasks: gen("y8revfrench/reflexive", "111122223333", 92011), pool: gen("y8revfrench/reflexive", "1122331122331", 92501) }),
 T({ id:"perfect", focus:true, title:"⏪ Perfect tense (passé composé) with avoir and être", strand:R + " · GIA pp. 13–19",
   ideas:["Perfect tense = auxiliary (avoir or être) in the present + past participle: j'ai joué = I played / I have played.",
     "Past participles: -er → -é (joué), -ir → -i (fini), -re → -u (vendu). Irregular: faire → fait, prendre → pris, boire → bu, voir → vu, lire → lu, écrire → écrit, avoir → eu, être → été.",
     "Most verbs use avoir. Movement verbs (MRS VANDERTRAMP: monter, rester, sortir, venir, aller, naître, descendre, entrer, rentrer, tomber, retourner, arriver, mourir, partir) and ALL reflexive verbs use être.",
     "With être, the past participle agrees with the subject: elle est allée, ils sont allés, elles sont allées.",
     "Negative: je n'ai pas joué, je ne suis pas allé(e)."],
   example:"Write: 'Last weekend my sister went to the beach and played volleyball.'\nWent: aller uses être → elle est allée (add -e for feminine).\nPlayed: jouer uses avoir → elle a joué.\nLe week-end dernier, ma sœur est allée à la plage et elle a joué au volley.",
   more:[ ex("Which is correct: 'nous avons allé' or 'nous sommes allés'?", ["aller is a movement (MRS VANDERTRAMP) verb.", "So it takes être, not avoir.", "nous → sommes; plural masculine → allés.", "nous sommes allés."], "nous sommes allés") ],
   videos:[ VID("french-perfect", "The perfect tense with avoir and être (1 minute)") ],
   fun:"MRS VANDERTRAMP is a memory trick — but some teachers use 'the House of Être', where every verb is something you do in a house: arrive, enter, go up the stairs, fall, go down…",
   trick:"Movement and reflexive → être (and agree!). Everything else → avoir.",
   tasks: gen("y8revfrench/perfect", "111122223333", 93011), pool: gen("y8revfrench/perfect", "1122331122331", 93501) }),
 T({ id:"adjectives", title:"🎨 Adjectives: agreement and position", strand:R + " · GIA pp. 9–10",
   ideas:["Adjectives agree with the noun: masculine (petit), feminine + e (petite), masculine plural + s (petits), feminine plural + es (petites).",
     "Special feminines: -if → -ive (sportive), -eux → -euse (heureuse), -il → -ille (gentille), beau → belle, nouveau → nouvelle, vieux → vieille, blanc → blanche, long → longue.",
     "Adjectives ending in -e don't change for feminine (timide, drôle).",
     "Most adjectives go AFTER the noun (un chien noir), but BAGS adjectives go BEFORE: Beauty, Age, Goodness, Size (une belle maison, un petit frère).",
     "Use intensifiers: très (very), assez (quite), un peu (a bit), trop (too)."],
   example:"Describe 'my mother is very kind and quite funny'.\nmère is feminine: gentil → gentille; marrant → marrante.\nMa mère est très gentille et assez marrante.",
   fun:"In French, 'un grand homme' means a great man, but 'un homme grand' means a tall man — position can change meaning!",
   trick:"BAGS go before: Beauty, Age, Goodness, Size.",
   tasks: gen("y8revfrench/adjectives", "111122223333", 94011), pool: gen("y8revfrench/adjectives", "1122331122331", 94501) }),
 T({ id:"vocab", title:"👨‍👩‍👧 Unit 1 vocabulary and writing: me, family, weekend, favourite day", strand:R + " · Jeunes sans frontières · pp. 6–7, 14–17 · speaking",
   ideas:["Family: mon père, ma mère, mon frère, ma sœur, mes grands-parents, mon oncle, ma tante, mon cousin/ma cousine, fils/fille unique.",
     "Relationships: je m'entends bien avec… (I get on well with), je me dispute avec… (I argue with), il/elle m'énerve (annoys me), parce qu'il/elle est… (because he/she is…).",
     "Last weekend (perfect tense): samedi, je suis allé(e)…, j'ai joué…, j'ai regardé…, c'était génial/nul.",
     "Favourite day: mon jour préféré, c'est le samedi parce que…; je fais la grasse matinée (have a lie-in).",
     "Top marks: opinions with reasons, connectives (et, mais, aussi, parce que, ensuite), three tenses, adjectives that agree.",
     "Speaking: one-minute description of a person: name, age, appearance (il/elle a les yeux…, les cheveux…), personality, why you like/admire them."],
   example:"Model paragraph (80–100 words, extract):\nJe m'appelle Sara et j'ai treize ans. J'ai un frère qui s'appelle Omar. Je m'entends bien avec lui parce qu'il est drôle, mais il est parfois agaçant.\nLe week-end dernier, je suis allée au centre commercial avec ma mère et j'ai acheté un livre. C'était génial !\nMon jour préféré, c'est le vendredi parce que je fais la grasse matinée.",
   fun:"French teenagers' slang: 'trop bien' = really good, 'c'est nul' = it's rubbish — both are fine to use in speaking!",
   trick:"For writing: Opinion + Reason + Connective + Tense = higher mark (ORCT).",
   tasks: gen("y8revfrench/vocab", "111122223333", 95011), pool: gen("y8revfrench/vocab", "1122331122331", 95501) })
]};

/* =====================================================================================
   MSCS (Fri 27 Nov · 25 marks · 1h)
   ===================================================================================== */
G2["y8revmscs/duties"] = factGen([
 [1, "What is a responsibility?", "Something you are expected to do or take care of", ["A reward", "A punishment", "A type of right"], "E.g. doing homework, looking after a pet.", "A responsibility is something you are expected to do.", "A responsibility is a reward for good behaviour."],
 [1, "What is the difference between a right and a duty?", "A right is something you are entitled to; a duty is something you must do", ["They are the same", "A right is a punishment", "A duty is optional"], "E.g. the right to education and the duty to attend school and respect others.", "Rights and duties go together.", "Rights and duties mean exactly the same thing."],
 [1, "Which is a duty of a student?", "Respecting teachers and classmates", ["Skipping homework", "Bullying others", "Arriving late"], "Students have duties towards their school community.", "Respecting others is a student's duty.", "Students have no duties."],
 [2, "What is a moral obligation?", "Something you feel you should do because it is right, even if no law forces you", ["A law with a fine", "A school rule only", "A hobby"], "E.g. helping someone who is hurt.", "Moral obligations come from our sense of right and wrong.", "Moral obligations are always written in law."],
 [2, "Which is an example of a duty to your family?", "Helping at home and caring for parents and siblings", ["Ignoring family", "Only asking for things", "Never talking"], "Families depend on each member's contribution.", "Helping at home is a duty to your family.", "Children have no duties at home."],
 [2, "Which is a citizen's duty in the UAE?", "Obeying the law and respecting the country's culture and values", ["Damaging public property", "Ignoring the law", "Littering"], "Citizens and residents share responsibility for a safe, respectful society.", "Obeying the law is a citizen's duty.", "Citizens are allowed to damage public property."],
 [2, "What does 'accountability' mean?", "Accepting responsibility for your actions and their consequences", ["Blaming others", "Counting money", "Avoiding work"], "Owning up to mistakes builds trust.", "Being accountable means owning your actions.", "Being accountable means blaming others."],
 [3, "Why do rights come with responsibilities?", "Because our freedom must not harm the rights of others", ["They don't", "So that rules can be ignored", "Only adults have responsibilities"], "E.g. freedom of speech comes with the responsibility not to spread hate or lies.", "Our rights must not harm others' rights.", "Having rights means you can do anything."],
 [3, "A classmate is being bullied online. What is your moral obligation?", "Support them and report it to a trusted adult", ["Share the posts", "Ignore it", "Join in"], "Bystanders have a responsibility to act safely.", "Reporting online bullying is the right thing to do.", "Ignoring online bullying is a moral obligation."],
 [3, "What is the difference between a legal duty and a moral duty?", "A legal duty is enforced by law; a moral duty comes from conscience and values", ["They are identical", "Moral duties are punished by police", "Legal duties are optional"], "Some actions are legal but wrong, or right but not required by law.", "Moral duties come from our values.", "Every moral duty is a law."],
 [3, "Why is volunteering an example of social responsibility?", "It helps the community without expecting reward", ["It is a paid job", "It is required by law", "It only helps yourself"], "E.g. beach clean-ups, charity drives, helping the elderly.", "Volunteering shows social responsibility.", "Volunteering is a legal duty with a fine."]]);
G2["y8revmscs/eastasia"] = factGen([
 [1, "Which country has the largest population in East Asia?", "China", ["Japan", "Mongolia", "South Korea"], "China has about 1.4 billion people.", "China has the largest population in East Asia.", "Mongolia has the largest population in East Asia."],
 [1, "Which country is an island nation in East Asia?", "Japan", ["Mongolia", "China", "North Korea"], "Japan is made up of four main islands and thousands of smaller ones.", "Japan is an island country.", "Mongolia is an island country."],
 [1, "Which is the longest river in Asia?", "The Yangtze (Chang Jiang)", ["The Yellow River", "The Nile", "The Mekong"], "About 6,300 km long, flowing through China to the East China Sea.", "The Yangtze is the longest river in Asia.", "The Thames is the longest river in Asia."],
 [1, "Which desert lies in Mongolia and northern China?", "The Gobi Desert", ["The Sahara", "The Thar Desert", "The Rub' al Khali"], "The Gobi is a cold desert with very hot summers and freezing winters.", "The Gobi Desert is in Mongolia and China.", "The Sahara is in Mongolia."],
 [2, "Why is the Yellow River (Huang He) called 'China's Sorrow'?", "Its floods have killed millions over history", ["It is very cold", "It is very short", "It has no fish"], "Its yellow silt makes the land fertile but also raises the river bed, causing floods.", "The Yellow River's floods earned it the name 'China's Sorrow'.", "The Yellow River has never flooded."],
 [2, "Which mountain range lies on China's south-western border?", "The Himalayas", ["The Alps", "The Andes", "The Rockies"], "Mount Everest (8,849 m) is on the China–Nepal border.", "The Himalayas border south-west China.", "The Alps are in China."],
 [2, "Why does Japan have many earthquakes and volcanoes?", "It lies on the Pacific 'Ring of Fire' where tectonic plates meet", ["It is very flat", "It is in the middle of a plate", "Because of its cold winters"], "Mount Fuji is an active volcano.", "Japan lies on the Ring of Fire.", "Japan has no earthquakes."],
 [2, "What is the monsoon in East Asia?", "A seasonal wind that brings heavy summer rain", ["A type of mountain", "A desert", "A winter festival"], "Summer monsoon rain is vital for rice farming.", "Monsoon winds bring summer rain.", "The monsoon brings snow in summer."],
 [2, "Which is the capital of South Korea?", "Seoul", ["Tokyo", "Beijing", "Pyongyang"], "Pyongyang is the capital of North Korea.", "Seoul is the capital of South Korea.", "Tokyo is the capital of South Korea."],
 [3, "Why do most of China's people live in the east?", "Fertile river plains, a milder climate and coasts for trade, compared with deserts and mountains in the west", ["The west is too crowded", "The east has no rivers", "It is random"], "Physical geography shapes population distribution.", "Most people in China live in the east.", "Most people in China live in the western deserts."],
 [3, "What is the Tibetan Plateau known as?", "'The Roof of the World' — the highest plateau on Earth", ["The Bottom of the World", "The Great Plain", "The Green Valley"], "Average height over 4,500 m; source of great rivers like the Yangtze.", "The Tibetan Plateau is called the Roof of the World.", "The Tibetan Plateau is below sea level."],
 [3, "What are typhoons?", "Powerful tropical storms in the western Pacific that hit East Asia", ["Earthquakes", "Desert winds", "Snowstorms"], "They are the same as hurricanes, with strong winds and heavy rain.", "Typhoons are tropical storms.", "Typhoons are a type of volcano."]]);
G2["y8revmscs/china"] = factGen([
 [1, "Why was the Great Wall of China built?", "To protect China from invaders from the north", ["To hold back the sea", "As a road for trade only", "As a palace"], "It was built and rebuilt over centuries; the first emperor Qin Shi Huang joined earlier walls.", "The Great Wall protected China from northern invaders.", "The Great Wall was built to keep out the sea."],
 [1, "Who was the first emperor to unite China (221 BCE)?", "Qin Shi Huang", ["Kublai Khan", "Confucius", "Mao Zedong"], "He standardised writing, money and weights and measures.", "Qin Shi Huang was the first emperor of a united China.", "Confucius was the first emperor of China."],
 [1, "What is the Terracotta Army?", "Thousands of life-size clay soldiers buried with Qin Shi Huang", ["A modern army", "A pottery shop", "A mountain range"], "Discovered by farmers in 1974 near Xi'an.", "The Terracotta Army was buried with the first emperor.", "The Terracotta Army is made of gold."],
 [2, "What was the Grand Canal used for?", "Transporting rice and goods between north and south China", ["Swimming", "Defending against invaders", "Making electricity"], "Begun in early times and greatly extended under the Sui dynasty (c. 600 CE), it is the world's longest canal.", "The Grand Canal linked northern and southern China.", "The Grand Canal was built in the 20th century."],
 [2, "What was the Dujiangyan irrigation system (c. 256 BCE)?", "An engineering project that controlled the Min River to prevent floods and water farms", ["A palace", "A temple", "A city wall"], "Designed by Li Bing, it still works today without a dam.", "Dujiangyan is still used for irrigation today.", "Dujiangyan was built last century."],
 [2, "Why was the Silk Road important?", "It linked China with Central Asia, the Middle East and Europe for trade and the exchange of ideas", ["It was only for soldiers", "It was a single road in one city", "It carried only water"], "Silk, spices, paper and ideas travelled along it.", "The Silk Road connected China with the West.", "The Silk Road only connected two Chinese villages."],
 [3, "How did the Great Wall show the power of the emperors?", "It needed enormous organisation of workers, materials and money", ["It was built by one person", "It was very cheap", "It was built in a week"], "Hundreds of thousands of labourers worked on it.", "Building the Great Wall needed huge organisation.", "The Great Wall was built quickly by a few workers."],
 [3, "Why did ancient Chinese civilisations develop along rivers like the Yellow River?", "Fertile soil and water for farming supported large populations", ["Rivers were dry", "To avoid farming", "For snow sports"], "Like Egypt (Nile) and Mesopotamia (Tigris and Euphrates).", "Early Chinese civilisation grew along the Yellow River.", "Early Chinese civilisation began in the Gobi Desert."],
 [1, "Which city is the Terracotta Army near?", "Xi'an", ["Beijing", "Shanghai", "Hong Kong"], "It was found by farmers digging a well in 1974.", "The Terracotta Army is near Xi'an.", "The Terracotta Army is in Hong Kong."],
 [2, "Which things did Qin Shi Huang standardise across China?", "Writing, money, weights and measures", ["Clothes and music only", "Nothing", "Football rules"], "Standardisation helped trade and government across the empire.", "Qin Shi Huang standardised writing and money.", "Qin Shi Huang let every region use different money."]]);
G2["y8revmscs/tech"] = factGen([
 [1, "What are China's 'Four Great Inventions'?", "Paper, printing, gunpowder and the compass", ["The wheel, fire, glass and steel", "Electricity, cars, planes and phones", "Rice, tea, silk and porcelain"], "These inventions changed the world.", "Paper, printing, gunpowder and the compass are the Four Great Inventions.", "The car is one of China's Four Great Inventions."],
 [1, "Who is credited with improving papermaking around 105 CE?", "Cai Lun", ["Confucius", "Zhang Heng", "Bi Sheng"], "He used tree bark, rags and hemp in the Han dynasty.", "Cai Lun improved papermaking.", "Papermaking was invented in Europe in 1900."],
 [1, "What was the magnetic compass first used for at sea?", "Navigation: finding direction", ["Telling the time", "Measuring rain", "Cooking"], "It helped sailors navigate in cloudy weather.", "The compass helped sailors navigate.", "The compass was used to measure temperature."],
 [2, "Who invented movable type printing (about 1040 CE)?", "Bi Sheng", ["Cai Lun", "Johannes Gutenberg", "Qin Shi Huang"], "He used clay characters about 400 years before Gutenberg.", "Bi Sheng invented movable type in China.", "Bi Sheng invented the compass."],
 [2, "Gunpowder was discovered by Chinese alchemists searching for…", "An elixir (medicine) for long life", ["A new paint", "Gold", "A cure for rain"], "First used in fireworks, later in weapons.", "Gunpowder was discovered while searching for an elixir of life.", "Gunpowder was invented to make bread."],
 [2, "What did Zhang Heng invent in 132 CE?", "A seismoscope that detected earthquakes", ["A telescope", "A clock tower", "Paper money"], "A ball dropped from a dragon's mouth into a toad's mouth to show the direction of the quake.", "Zhang Heng invented an earthquake detector.", "Zhang Heng invented the aeroplane."],
 [2, "What is acupuncture?", "A traditional Chinese medicine using fine needles at points on the body", ["A type of surgery with knives", "A herbal tea", "A martial art"], "Based on the idea of qi (energy) flowing through the body.", "Acupuncture uses fine needles.", "Acupuncture uses X-rays."],
 [3, "What is the idea of yin and yang in Chinese medicine?", "Health depends on balancing opposite forces in the body", ["Eating only rice", "Sleeping all day", "Avoiding water"], "Doctors aimed to restore balance with herbs, diet and acupuncture.", "Yin and yang are about balance.", "Yin and yang are two kinds of medicine bottles."],
 [3, "How did Chinese inventions spread to the West?", "Along trade routes like the Silk Road and by sea", ["By aeroplane", "They never spread", "By internet"], "Papermaking reached the Islamic world in the 8th century and later Europe.", "Chinese inventions spread along trade routes.", "Chinese inventions never left China."],
 [3, "Which material, made by heating fine clay at very high temperatures, was a famous Chinese invention?", "Porcelain ('china')", ["Plastic", "Steel", "Concrete"], "It was so famous that in English it is still called 'china'.", "Porcelain is called 'china' in English.", "Porcelain was invented in America."]]);
U.y8revmscs = { name:"MSCS: Term 1 Revision", short:"MSCS", year:8, revision:true, icon:"🧭", colour:"#7A4B9C", exam:"Fri 27 Nov · 25 marks · 1h",
  blurb:"Moral, Social and Cultural Studies: responsibilities and duties, East Asia, ancient Chinese engineering, technology and medicine", topics:[
 T({ id:"duties", title:"🤝 Individual responsibilities, duties and moral obligations", strand:R + " · MSCS 1",
   ideas:["A right is something you are entitled to (e.g. education, safety). A duty or responsibility is something you are expected to do (e.g. respect others, obey laws).",
     "Rights and responsibilities go together: my freedom must not harm someone else's rights.",
     "Moral obligations come from conscience and values (honesty, kindness, fairness), even when no law requires them.",
     "We have duties to ourselves (health, learning), family (respect, helping), school (effort, respect), community and country (laws, environment, volunteering).",
     "Accountability means owning your actions and their consequences."],
   example:"Scenario: You find a wallet with money in the school corridor.\nLegal duty: it is not yours, so keeping it would be stealing.\nMoral obligation: honesty — return it or hand it to the office.\nResponsibility to the community: it builds a culture of trust.",
   fun:"The UAE has a Ministry of Tolerance and Coexistence — one of the first countries in the world to have one!",
   trick:"Rights you GET, duties you GIVE.",
   tasks: gen("y8revmscs/duties", "111122223333", 96011), pool: gen("y8revmscs/duties", "1122331122331", 96501) }),
 T({ id:"eastasia", title:"🗾 The geography of East Asia", strand:R + " · MSCS 2",
   ideas:["East Asia includes China, Japan, North Korea, South Korea, Mongolia and Taiwan.",
     "Physical features: the Himalayas and Tibetan Plateau ('Roof of the World'), the Gobi Desert, the Yangtze (longest river in Asia) and Yellow River.",
     "Japan is an island nation on the Pacific Ring of Fire: earthquakes, tsunamis and volcanoes (Mount Fuji).",
     "Climate: monsoon winds bring heavy summer rain; typhoons hit coasts; the north and west have cold, dry deserts.",
     "Most people live in the fertile eastern river plains and coasts; the west is mountainous and dry."],
   example:"Explain why eastern China is densely populated.\nFertile soil from the Yangtze and Yellow Rivers supports rice farming.\nA milder, wetter monsoon climate.\nFlat land and coasts for cities, ports and trade.\nThe west has high mountains and deserts, which are hard to live in.",
   fun:"China uses one time zone for the whole country, even though it is as wide as five time zones — so in the far west the sun can rise at 10 a.m.!",
   trick:"East Asia's 'big three' features: Himalayas (high), Gobi (dry), Yangtze (long).",
   tasks: gen("y8revmscs/eastasia", "111122223333", 97011), pool: gen("y8revmscs/eastasia", "1122331122331", 97501) }),
 T({ id:"china", title:"🏯 Engineering and civilisation in ancient China", strand:R + " · MSCS 3",
   ideas:["Ancient Chinese civilisation grew along the Yellow River with fertile soil for farming.",
     "Qin Shi Huang united China in 221 BCE, standardised writing, money and measurements, and joined walls into the Great Wall.",
     "The Terracotta Army (about 8,000 clay soldiers) was buried with him near Xi'an.",
     "Engineering: the Dujiangyan irrigation system (c. 256 BCE, still used), the Grand Canal (world's longest canal), the Great Wall.",
     "The Silk Road linked China to the Middle East and Europe for trade and ideas."],
   example:"Why was the Grand Canal a great engineering achievement?\nIt connected rivers across north and south China over about 1,800 km.\nIt allowed grain to feed the capital and armies.\nIt needed thousands of workers, locks and careful planning.\nParts of it are still used today.",
   fun:"Each soldier in the Terracotta Army has a different face — some historians think they were modelled on real soldiers!",
   trick:"Qin's 3 Ws: Wall, Warriors (terracotta), Writing (standardised).",
   tasks: gen("y8revmscs/china", "111122223333", 98011), pool: gen("y8revmscs/china", "1122331122331", 98501) }),
 T({ id:"tech", title:"🧭 Chinese technology, science and medicine", strand:R + " · MSCS 4",
   ideas:["The Four Great Inventions: paper (improved by Cai Lun, c. 105 CE), printing (woodblock, then movable type by Bi Sheng, c. 1040), gunpowder (by alchemists seeking an elixir of life), and the magnetic compass (used for navigation).",
     "Science: Zhang Heng's seismoscope (132 CE) detected distant earthquakes; Chinese astronomers recorded comets and eclipses.",
     "Other inventions: silk, porcelain ('china'), paper money, the wheelbarrow, kites.",
     "Traditional Chinese medicine: herbal remedies, acupuncture, balancing yin and yang and the flow of qi.",
     "Ideas spread west along the Silk Road and sea routes, e.g. papermaking reached the Islamic world in the 700s."],
   example:"Explain how one Chinese invention changed the world.\nInvention: paper and printing.\nBefore: writing on bamboo or silk was heavy or expensive.\nAfter: books became cheaper and knowledge spread faster.\nLong term: helped education, religion, science and government across the world.",
   fun:"Gunpowder was discovered by alchemists trying to make a potion for eternal life — instead they made fireworks!",
   trick:"The 4 great inventions: 'Please Print Good Compasses' — Paper, Printing, Gunpowder, Compass.",
   tasks: gen("y8revmscs/tech", "111122223333", 99011), pool: gen("y8revmscs/tech", "1122331122331", 99501) })
]};

/* =====================================================================================
   ARABIC (Fri 20 Nov — done) · ISLAMIC EDUCATION (Thu 19 Nov — done)
   ===================================================================================== */
G2["y8revarabic/grammar"] = (d, r) => { const K = kit(r);
  if (d === 1){ const Q = K.pick([["ماذا", "What?"], ["مَن", "Who?"], ["متى", "When?"], ["أين", "Where?"], ["كيف", "How?"], ["لماذا", "Why?"], ["كم", "How many/much?"], ["هل", "Yes/no question word"], ["ماذا تعمل؟", "What do you do (as a job)?"], ["أين تسكن؟", "Where do you live?"], ["متى تستيقظ؟", "When do you wake up?"], ["كيف حالك؟", "How are you?"], ["لماذا تحب العطلة؟", "Why do you like the holiday?"], ["مَن معلمك؟", "Who is your teacher?"]]); return mcq(1, `What does the question word '${Q[0]}' mean?`, Q[1], (Q[0].includes("؟") ? ["What do you do (as a job)?", "Where do you live?", "When do you wake up?", "How are you?", "Why do you like the holiday?", "Who is your teacher?"] : ["What?", "Who?", "When?", "Where?", "How?", "Why?", "How many/much?"]).filter(x => x !== Q[1]).slice(0, 3), `${Q[0]} = ${Q[1]}.`); }
  if (d === 2){ const S = K.pick([["الطالبُ مجتهدٌ", "Nominal sentence (جملة اسمية)"], ["البيتُ كبيرٌ", "Nominal sentence (جملة اسمية)"], ["المعلمةُ في الصف", "Nominal sentence (جملة اسمية)"], ["ذهبَ الولدُ إلى المدرسة", "Verbal sentence (جملة فعلية)"], ["يكتبُ الطالبُ الدرسَ", "Verbal sentence (جملة فعلية)"], ["سافرَ أبي إلى دبي", "Verbal sentence (جملة فعلية)"], ["الطبيبُ في المستشفى", "Nominal sentence (جملة اسمية)"], ["الهاتفُ مفيدٌ", "Nominal sentence (جملة اسمية)"], ["يعملُ المهندسُ في الشركة", "Verbal sentence (جملة فعلية)"], ["لعبَ أخي كرةَ القدم", "Verbal sentence (جملة فعلية)"]]);
    return mcq(2, `What type of sentence is this?\n${S[0]}`, S[1], [S[1].startsWith("Nominal") ? "Verbal sentence (جملة فعلية)" : "Nominal sentence (جملة اسمية)"], "A nominal sentence starts with a noun (مبتدأ + خبر); a verbal sentence starts with a verb (فعل + فاعل)."); }
  const V = K.pick([["كتبَ", "Past (الماضي)"], ["يكتبُ", "Present (المضارع)"], ["سيكتبُ", "Future (المستقبل)"], ["لعبَ", "Past (الماضي)"], ["يلعبُ", "Present (المضارع)"], ["سوف يلعبُ", "Future (المستقبل)"], ["درسَ", "Past (الماضي)"], ["يدرسُ", "Present (المضارع)"], ["سيدرسُ", "Future (المستقبل)"]]);
  return mcq(3, `Which tense is '${V[0]}'?`, V[1], ["Past (الماضي)", "Present (المضارع)", "Future (المستقبل)"].filter(x => x !== V[1]), "Past: no prefix (كتبَ). Present: starts with ي/ت/أ/ن (يكتبُ). Future: سـ or سوف + present (سيكتبُ)."); };
G2["y8revarabic/vocab"] = (d, r) => { const K = kit(r), J = [["طبيب", "doctor"], ["مهندس", "engineer"], ["معلم", "teacher"], ["شرطي", "police officer"], ["طيار", "pilot"], ["ممرضة", "nurse"], ["مزارع", "farmer"], ["طباخ", "cook/chef"], ["نجار", "carpenter"], ["محامي", "lawyer"], ["مكتب", "office"], ["عمل", "work"], ["راتب", "salary"], ["شركة", "company"], ["مستشفى", "hospital"], ["هاتف", "phone"], ["تطبيق", "app"], ["عطلة", "holiday"]], w = K.pick(J);
  if (K.int(0, 1)) return mcq(d, `What does '${w[0]}' mean?`, w[1], K.shuffle(J.filter(x => x !== w)).slice(0, 3).map(x => x[1]), `${w[0]} = ${w[1]}.`);
  return mcq(d, `Which Arabic word means '${w[1]}'?`, w[0], K.shuffle(J.filter(x => x !== w)).slice(0, 3).map(x => x[0]), `${w[1]} = ${w[0]}.`); };
U.y8revarabic = { name:"Arabic: Term 1 Revision", short:"Arabic", year:8, revision:true, icon:"ض", colour:"#00796B", exam:"Written Fri 20 Nov (done) · speaking in class",
  blurb:"Unit 1 Work vocabulary, question words, nominal and verbal sentences, past, present and future tense, speaking practice", topics:[
 T({ id:"grammar", title:"🔤 Question words, sentence types and tenses", strand:R + " · Grammar",
   ideas:["Question words: ماذا (what), مَن (who), متى (when), أين (where), كيف (how), لماذا (why), كم (how many), هل (yes/no).",
     "Nominal sentence (جملة اسمية): starts with a noun — مبتدأ + خبر: البيتُ كبيرٌ.",
     "Verbal sentence (جملة فعلية): starts with a verb — فعل + فاعل: ذهبَ الولدُ.",
     "Past (الماضي): كتبَ. Present (المضارع): يكتبُ. Future (المستقبل): سيكتبُ / سوف يكتبُ.",
     "Speaking: one minute about your summer holiday (where, when, how, what, why) OR the advantages and disadvantages of mobile phones."],
   example:"Turn 'الطالبُ يكتبُ الدرسَ' into a verbal sentence.\nIt starts with a noun (الطالب), so it is nominal.\nMove the verb to the start: يكتبُ الطالبُ الدرسَ.\nNow it starts with a verb: a verbal sentence.",
   fun:"Arabic is written right to left, but its numbers are written left to right!",
   trick:"Future = سـ + present (سيكتب) — just add 'sa'!",
   tasks: gen("y8revarabic/grammar", "111122223333", 102011), pool: gen("y8revarabic/grammar", "1122331122331", 102501) }),
 T({ id:"vocab", title:"💼 Unit 1 vocabulary: work, holidays and phones", strand:R + " · Reading and writing (80–100 words)",
   ideas:["Jobs: طبيب (doctor), مهندس (engineer), معلم (teacher), شرطي (police officer), طيار (pilot), ممرضة (nurse), مزارع (farmer), طباخ (cook), نجار (carpenter), محامي (lawyer).",
     "Work words: عمل (work), مكتب (office), شركة (company), راتب (salary), مستشفى (hospital).",
     "Holiday writing: أين؟ متى؟ مع مَن؟ ماذا فعلت؟ لماذا أحببتها؟ (where, when, with whom, what you did, why you liked it).",
     "Mobile phones: هاتف (phone), تطبيق (app); advantages (التواصل, التعلم) and disadvantages (إضاعة الوقت, قلة النوم).",
     "Use connectives: و (and), لكن (but), لأن (because), ثم (then)."],
   example:"Writing frame (holiday):\nفي العطلة الصيفية سافرتُ مع عائلتي إلى …\nزرنا … وأكلنا …\nكانت العطلة ممتعة لأن …",
   fun:"Many English words come from Arabic: coffee (قهوة), sugar (سكر), algebra (الجبر) and zero (صفر)!",
   trick:"Writing = WH questions: where, when, who with, what, why.",
   tasks: gen("y8revarabic/vocab", "111122223333", 103011), pool: gen("y8revarabic/vocab", "1122331122331", 103501) })
]};

/* Islamic Education: built from the teacher's answer keys (Revision Worksheets 1–3) */
const KEY = (n, pages) => Array.from({ length:pages }, (_, i) => ({ src:`uk/keys/isl-ws${n}-${i + 1}.jpg`, title:`Answer key · Revision Worksheet ${n} · page ${i + 1}` }));
G2["y8revislamic/qaf"] = (d, r) => { const K = kit(r);
  const V = [["Qaf. By the glorious Quran.", 1], ["But they are amazed that a warner has come to them from among themselves, so the disbelievers say, 'This is a strange thing.'", 2], ["When we have died and become dust (will we be brought back to life)? That is a far-fetched return.", 3], ["We know exactly what the earth takes away from them, and with Us is a Book that preserves everything.", 4], ["But they denied the truth when it came to them, so they are in a confused state.", 5], ["Have they not looked at the sky above them – how We built it and beautified it, and it has no cracks in it?", 6], ["And the earth – We spread it out, placed firm mountains on it, and made every kind of beautiful plant grow in pairs on it,", 7], ["As an insight and a reminder for every servant who turns back to Allah.", 8], ["And We sent down blessed water from the sky and with it We grew gardens and grain that is harvested,", 9], ["And tall palm trees with fruit-clusters arranged in layers.", 10]];
  const W = [["المجيد", "al-majeed", "The Glorious / the Honourable", 1], ["عجيب", "'ajeeb", "Strange / amazing", 2], ["منذر", "mundhir", "A warner", 2], ["حفيظ", "hafeez", "Preserving / keeps a full record", 4], ["كذبوا", "kadhdhabu", "They denied", 5], ["فروج", "furooj", "Cracks / rifts / gaps", 6], ["رواسي", "rawasiya", "Firm (anchoring) mountains", 7], ["والنخل", "wan-nakhl", "And the palm trees", 10], ["باسقات", "basiqat", "Tall / lofty", 10]];
  if (d === 1){ const w = K.pick(W); return mcq(1, `Surah Qaf vocabulary: what does '${w[0]}' (${w[1]}, verse ${w[3]}) mean?`, w[2], K.shuffle(W.filter(x => x !== w)).slice(0, 3).map(x => x[2]), `${w[0]} (verse ${w[3]}) = ${w[2]}.`); }
  if (d === 2 && K.int(0, 2) === 0){ const w = K.pick(W); return mcq(2, `Which Arabic word from Surah Qaf means '${w[2]}'?`, `${w[0]} (${w[1]})`, K.shuffle(W.filter(x => x !== w)).slice(0, 3).map(x => `${x[0]} (${x[1]})`), `${w[2]} = ${w[0]} (verse ${w[3]}).`); }
  if (d === 2){ const v = K.pick(V); return mcq(2, `Which verse of Surah Qaf (1–10) has this meaning?\n"${v[0]}"`, "Verse " + v[1], K.shuffle(V.filter(x => x !== v)).slice(0, 3).map(x => "Verse " + x[1]), `This is the meaning of verse ${v[1]}.`); }
  const v = K.pick(V.slice(1)), prev = V[v[1] - 2]; return mcq(3, `Which meaning comes straight AFTER this one?\n"${prev[0]}"`, v[0], K.shuffle(V.filter(x => x !== v && x !== prev)).slice(0, 3).map(x => x[0]), `Verse ${prev[1]} is followed by verse ${v[1]}.`); };
G2["y8revislamic/prayer"] = factGen([
 [1, "Which prayer is 'the middle prayer' (Salat al-Wusta) according to most scholars?", "Asr", ["Fajr", "Maghrib", "Isha"], "Hadith: 'They kept us busy from the middle prayer – the Asr prayer…' (Bukhari & Muslim).", "Most scholars say the middle prayer is Asr.", "The middle prayer is Isha."],
 [1, "'Guard strictly the prayers, especially the middle prayer…' is from which surah?", "Surah Al-Baqarah 2:238", ["Surah Qaf 50:18", "Surah An-Nisa 4:103", "Surah Al-Ankabut 29:45"], "Al-Baqarah 2:238.", "", ""],
 [1, "'Indeed, prayer prevents immorality and wrongdoing.' Where is this ayah?", "Surah Al-Ankabut 29:45", ["Surah Al-Baqarah 2:43", "Surah Ar-Ra'd 13:28", "Surah At-Tawbah 9:18"], "It shows how regular prayer improves behaviour.", "", ""],
 [1, "How much better is prayer in congregation than praying alone?", "Twenty-seven degrees better", ["Two times", "Ten times", "The same"], "Bukhari & Muslim, narrated by Ibn Umar (RA). (25–27 in different narrations.)", "Congregational prayer is 27 degrees better.", "Congregational prayer is no better than praying alone."],
 [2, "What does the hadith of the river at the door teach?", "The five daily prayers wipe away sins like bathing removes dirt", ["Rivers are holy", "Bathing replaces prayer", "Prayer is only on Fridays"], "Bukhari & Muslim, narrated by Abu Hurairah (RA).", "The five prayers wipe away sins like washing in a river.", "The hadith says bathing replaces prayer."],
 [2, "'Verily, in the remembrance of Allah do hearts find rest' (Ar-Ra'd 13:28) is evidence for…", "Prayer bringing peace of mind", ["Fasting in Ramadan", "Zakah", "Hajj"], "Regular prayer and dhikr bring calm to the heart.", "", ""],
 [2, "Which ayah tells believers to hurry to the Friday prayer and leave trade?", "Surah Al-Jumu'ah 62:9", ["Surah Qaf 50:16", "Surah Al-Baqarah 2:164", "Surah Hud 11:88"], "'O you who believe, when the call is made for prayer on Friday, hurry to the remembrance of Allah…'", "", ""],
 [2, "What should you do when you hear the Adhan?", "Repeat what the mu'adhdhin says", ["Talk louder", "Leave the room", "Stay silent and ignore it"], "Bukhari & Muslim, narrated by Abu Sa'id al-Khudri (RA).", "We repeat the words of the Adhan when we hear it.", "We should ignore the Adhan."],
 [3, "What is the first deed a person will be asked about on the Day of Resurrection?", "Prayer", ["Fasting", "Charity", "Hajj"], "Jami' at-Tirmidhi, narrated by Abu Hurairah (RA): if it is sound, he will succeed.", "The first deed to be judged is prayer.", "The first deed to be judged is Hajj."],
 [3, "'Indeed, prayer has been made obligatory on the believers at fixed times' is from…", "Surah An-Nisa 4:103", ["Surah Qaf 50:18", "Surah Al-Ankabut 29:45", "Surah Az-Zalzalah 99:7"], "This shows the obligatory (fard) prayers have fixed times.", "", ""],
 [3, "What reward is mentioned for walking to the masjid for an obligatory prayer?", "One step wipes away a sin and the other raises a degree", ["Nothing", "Only exercise", "A gift of money"], "Sahih Muslim, narrated by Abu Hurairah (RA).", "Each step to the masjid wipes a sin or raises a degree.", "Walking to the masjid has no reward."],
 [3, "'Not a word does he utter except that there is a watcher ready (to record it)' — which ayah?", "Surah Qaf 50:18", ["Surah Qaf 50:16", "Surah Al-Baqarah 2:238", "Surah At-Talaq 65:3"], "Evidence for accountability: every word is recorded by the angels Raqib and Atid.", "", ""],
 [2, "What does 'khushu'' mean in prayer?", "Focus and humility", ["Speed", "Loud recitation", "Wearing new clothes"], "Ways to gain khushu': learn the meanings, pray calmly, switch off distractions.", "Khushu' means focus and humility in prayer.", "Khushu' means praying as fast as possible."],
 [2, "What is tuma'ninah?", "Staying calm and still in each position of the prayer", ["Rushing", "Talking in prayer", "Skipping positions"], "It helps Omar (Worksheet 2, Q3) pray with focus.", "Tuma'ninah means calmness in each position.", "Tuma'ninah means praying quickly."],
 [3, "Which ayah says 'And establish prayer, give zakah, and bow down with those who bow down'?", "Surah Al-Baqarah 2:43", ["Surah An-Nisa 4:103", "Surah Al-Jumu'ah 62:9", "Surah Qaf 50:18"], "Evidence for praying in congregation.", "", ""]].map(f => f[5] === "" ? [f[0], f[1], f[2], f[3], f[4]] : f));
G2["y8revislamic/belief"] = factGen([
 [1, "What is Fitrah?", "The natural, pure nature Allah created in every human that recognises One Creator", ["A type of charity", "A prayer time", "A festival"], "'Every child is born upon the fitrah…' (Bukhari & Muslim).", "Fitrah is the natural belief in One Creator.", "Fitrah is a kind of fasting."],
 [1, "What is Tawheed?", "Believing in the Oneness of Allah", ["Believing in many gods", "A type of prayer mat", "A pilgrimage"], "The core belief of Islam.", "Tawheed means the Oneness of Allah.", "Tawheed means believing in many gods."],
 [1, "What is Tawakkul?", "Doing your best and trusting Allah with the result", ["Doing nothing", "Worrying about the future", "Relying on lucky charms"], "'Whoever relies on Allah, He is sufficient for him' (At-Talaq 65:3).", "Tawakkul means trusting Allah after doing your best.", "Tawakkul means not trying at all."],
 [2, "Why is relying on a 'lucky bracelet' against Islamic belief?", "Only Allah brings benefit or protects from harm; trusting charms is a form of shirk", ["It is too expensive", "It is not fashionable", "It is allowed"], "'Whoever hangs an amulet has committed shirk' (Musnad Ahmad).", "Trusting lucky charms goes against Tawheed.", "Lucky charms are part of Islamic belief."],
 [2, "A student says 'I passed only because I studied — Allah had nothing to do with it.' What is the correct view?", "Hard work is the means, but success comes from Allah", ["Allah is not involved", "Studying is pointless", "Luck decides everything"], "'And my success is only by Allah' (Hud 11:88).", "", ""],
 [2, "What is shirk?", "Associating partners with Allah", ["Giving charity", "Fasting", "Praying in congregation"], "The opposite of Tawheed.", "Shirk is associating partners with Allah.", "Shirk is a type of prayer."],
 [3, "Which ayah lists signs like night and day, ships, rain and winds?", "Surah Al-Baqarah 2:164", ["Surah Qaf 50:1", "Surah Al-Jumu'ah 62:9", "Surah Hud 11:88"], "These signs point to One Creator; with more than one god there would be disorder (Al-Anbiya 21:22).", "", ""],
 [3, "What does Surah Qaf 50:16 teach ('We are closer to him than his jugular vein')?", "Allah knows even our thoughts, so we should watch our words and actions", ["Allah is far away", "Only actions matter, not thoughts", "Angels don't record anything"], "Together with 50:18, it shows we are accountable every day.", "", ""],
 [3, "What does JERAC stand for in evaluation questions?", "Judgement, Evidence, Reasoning, Application, Conclusion", ["Just Eat Rice And Chicken", "Judge, Explain, Repeat, Answer, Copy", "Journal, Essay, Report, Article, Chart"], "Give a judgement, support with Quran/Hadith, explain, apply to life, conclude.", "", ""],
 [1, "Which ayah says 'Whoever relies on Allah, He is sufficient for him'?", "Surah At-Talaq 65:3", ["Surah Hud 11:88", "Surah Qaf 50:16", "Surah Al-Baqarah 2:164"], "Evidence for tawakkul.", "", ""],
 [2, "Ali does his best and leaves the result to Allah; Sara is always anxious. Who has more inner peace?", "Ali, because tawakkul brings calm and contentment", ["Sara, because worry helps", "Both feel the same", "Neither"], "Worksheet 2, Q5.", "Tawakkul brings inner peace.", "Constant worry shows strong tawakkul."],
 [2, "Which ayah is linked to Fitrah (the natural way Allah created people)?", "Surah Ar-Rum 30:30", ["Surah Qaf 50:1", "Surah Al-Jumu'ah 62:9", "Surah An-Nisa 4:103"], "Fitrah is linked directly to Tawheed.", "", ""],
 [3, "Why does perfect order in creation point to ONE Creator?", "With more than one god there would be conflict and disorder", ["Because the universe has no order", "Because nature makes itself", "Because of luck"], "Al-Anbiya 21:22.", "Order in the universe points to one Creator.", "Disorder in nature proves many gods."]].map(f => f[5] === "" ? [f[0], f[1], f[2], f[3], f[4]] : f));
G2["y8revislamic/trench"] = factGen([
 [1, "Who suggested digging the trench (khandaq)?", "Salman al-Farisi", ["Abu Bakr", "Umar", "Ali"], "He knew the Persian technique of defending cities with a trench.", "Salman al-Farisi suggested the trench.", "Khalid ibn al-Walid suggested the trench."],
 [1, "What is the Battle of the Trench also called?", "The Battle of the Confederates (Al-Ahzab)", ["The Battle of Badr", "The Battle of Uhud", "The Conquest of Makkah"], "The confederate tribes joined together to attack Madinah. Surah Al-Ahzab is named after them.", "The Battle of the Trench is also called Al-Ahzab.", "The Battle of the Trench is also called Badr."],
 [1, "Which city did the Muslims defend with the trench?", "Madinah", ["Makkah", "Taif", "Jerusalem"], "The trench protected the open northern side of Madinah.", "The trench defended Madinah.", "The trench defended Makkah."],
 [2, "How many times did the Prophet ﷺ strike the huge rock?", "Three times", ["Once", "Seven times", "Ten times"], "Each strike broke part of it and gave good news.", "The Prophet ﷺ struck the rock three times.", "The Prophet ﷺ struck the rock once."],
 [2, "Which lands were mentioned in the good news when the rock was struck?", "Sham (Syria), Persia and Yemen", ["Egypt, India and China", "Spain, Rome and Africa", "Iraq, Oman and Bahrain"], "Musnad Ahmad & Sunan an-Nasa'i. The prophecies were fulfilled later.", "", ""],
 [2, "Which leadership quality did the Prophet ﷺ show by digging himself?", "Leading by example and humility", ["Giving orders only", "Staying away", "Resting"], "He carried soil and shared the hunger of the companions.", "The Prophet ﷺ led by example at the trench.", "The Prophet ﷺ did not take part in digging."],
 [2, "Which quality did the Prophet ﷺ show by accepting Salman's idea?", "Consultation (shura)", ["Pride", "Ignoring advice", "Secrecy"], "Good leaders listen to good ideas from anyone.", "", ""],
 [3, "How did the good news at the rock affect the Muslims?", "It filled them with hope and courage despite hunger, cold and fear", ["It made them give up", "It made them leave Madinah", "It had no effect"], "It strengthened their trust in Allah's promise (tawakkul).", "", ""],
 [3, "Salman al-Farisi came from which land, and what did he search for?", "Persia; he searched for the true religion", ["Egypt; he searched for gold", "Yemen; he searched for land", "Rome; he searched for fame"], "His journey took him through several teachers until he met the Prophet ﷺ in Madinah.", "Salman al-Farisi was originally from Persia.", "Salman al-Farisi was born in Makkah."],
 [1, "What did the Prophet ﷺ say before striking the rock?", "Bismillah", ["Nothing", "Goodbye", "Hello"], "He took the pickaxe and said 'Bismillah', then struck it.", "", ""],
 [2, "What hardship showed the Prophet ﷺ shared the companions' hunger?", "He had tied a stone to his stomach", ["He ate a feast", "He stayed at home", "He rode a horse"], "He shared the same hardship as everyone else.", "The Prophet ﷺ shared the companions' hunger.", "The Prophet ﷺ ate while the companions were hungry."],
 [2, "How can a class leader apply the Prophet's ﷺ example at the trench today?", "Work alongside the team, listen to ideas and keep everyone positive", ["Give orders and rest", "Ignore others' ideas", "Take all the credit"], "Leading by example, shura and encouragement.", "", ""],
 [3, "When were the lands promised at the trench opened to Islam?", "In the time of the Rightly Guided Caliphs", ["Never", "1,000 years later", "The same day"], "Allah's promise came true, teaching trust in His plan.", "", ""]].map(f => f[5] === "" ? [f[0], f[1], f[2], f[3], f[4]] : f));
G2["y8revislamic/purity"] = factGen([
 [1, "Minor ritual purity is achieved through…", "Wudu (ablution)", ["Ghusl", "Tayammum only", "Siwak"], "Worksheet 3, Section C.", "Wudu removes minor impurity.", "Ghusl is only for minor impurity."],
 [1, "Major ritual impurity is removed through…", "Ghusl (full bath)", ["Wudu", "Siwak", "Masah"], "Worksheet 3, Section C.", "Ghusl removes major impurity.", "Wudu removes major impurity."],
 [1, "What would the Prophet ﷺ have ordered his nation to use for every prayer (if not for hardship)?", "Siwak", ["Perfume", "A prayer mat", "A cap"], "Siwak cleans the teeth and mouth.", "The Prophet ﷺ encouraged using siwak.", "The Prophet ﷺ discouraged using siwak."],
 [1, "Where was Surah Qaf revealed?", "Makkah", ["Madinah", "Taif", "Jerusalem"], "It is a Makki surah, focusing on belief and the Hereafter.", "Surah Qaf was revealed in Makkah.", "Surah Qaf was revealed in Madinah."],
 [2, "When is Tayammum allowed?", "When there is no water (or it can't be used)", ["Always", "Only on Fridays", "Only in Ramadan"], "Dry ablution with clean earth.", "Tayammum is used when there is no water.", "Tayammum is used instead of water even when water is available."],
 [2, "How will believers be called on the Day of Resurrection because of wudu?", "With brightly shining faces and limbs", ["With dark faces", "Without names", "In silence"], "Hadith about the traces of wudu.", "", ""],
 [2, "What is Masah in wudu?", "Wiping (e.g. over the head)", ["Washing the feet", "Rinsing the mouth", "Washing the face"], "'…and make Masah (wipe) of your heads…'", "Masah means wiping.", "Masah means washing the face."],
 [2, "In tajweed, what does 'Idgham' mean?", "To merge / combine", ["To show clearly", "To change", "To hide"], "Idgham: noon sakinah or tanween merges into the next letter.", "Idgham means to merge.", "Idgham means to pronounce clearly."],
 [3, "Tanween followed by a throat letter (e.g. ع) is read with…", "Izhar (clear pronunciation)", ["Iqlab", "Ikhfa", "Idgham"], "e.g. شيءٌ عجيب (Worksheet 3, Q23).", "", ""],
 [3, "Tanween or noon sakinah followed by ب is read with…", "Iqlab (changed to a meem sound)", ["Izhar", "Idgham", "Ikhfa"], "e.g. رجعٌ بعيد (Worksheet 3, Q24).", "", ""],
 [3, "Noon sakinah followed by ف (e.g. من فروج) is read with…", "Ikhfa (hidden, with ghunnah)", ["Izhar", "Iqlab", "Idgham"], "Worksheet 3, Q25.", "", ""],
 [3, "Tanween followed by م (e.g. منذرٌ منهم) is read with…", "Idgham with ghunnah", ["Izhar", "Iqlab", "Ikhfa"], "Worksheet 3, Q22.", "", ""],
 [3, "Which two letters cause Idgham WITHOUT ghunnah?", "ل and ر", ["ب and م", "ع and ح", "ي and و"], "Worksheet 3, Q21.", "", ""],
 [1, "Which word from the word search means the call to prayer?", "ADHAN", ["IMAM", "QIBLA", "SIWAK"], "IQAMAH is the second call just before the prayer starts.", "The Adhan is the call to prayer.", "The Qibla is the call to prayer."],
 [1, "What is the Qibla?", "The direction of the Ka'bah that Muslims face in prayer", ["The call to prayer", "A tooth stick", "A prayer leader"], "It is one of the word search words.", "The Qibla is the direction of prayer.", "The Qibla is the person who leads prayer."]].map(f => f[5] === "" ? [f[0], f[1], f[2], f[3], f[4]] : f));
U.y8revislamic = { name:"Islamic Education: Term 1 Revision", short:"Islamic", year:8, revision:true, icon:"☪", colour:"#1B6E54", exam:"Written Thu 19 Nov (done) · 50 + orals 10",
  blurb:"Surah Qaf 1–10 (translation and vocabulary), prayer evidence, Tawheed and Fitrah, the Battle of the Trench and Salman al-Farisi, purity and tajweed — with your teacher's answer keys", topics:[
 T({ id:"qaf", focus:true, title:"📖 Surah Qaf (1–10): translation and vocabulary", strand:R + " · Revision Worksheet 1, Sections A and B",
   ideas:["Surah Qaf (50) is a Makki surah about belief in Allah, the Resurrection and accountability.",
     "Verses 1–5: the disbelievers were amazed that a warner came from among them and denied the Resurrection; Allah knows what the earth takes from their bodies and has a Book that preserves everything.",
     "Verses 6–10: signs of Allah's power — the sky built with no cracks, the earth spread out with firm mountains, plants in pairs, blessed rain, gardens, grain and tall palm trees.",
     "Key words: المجيد (glorious), عجيب (strange), منذر (a warner), حفيظ (preserving), كذبوا (they denied), فروج (cracks), رواسي (firm mountains), والنخل (palm trees), باسقات (tall).",
     "Open the answer-key pages below to see the Arabic text of every verse with its translation."],
   example:"Verse 6: 'Have they not looked at the sky above them – how We built it and beautified it, and it has no cracks in it?'\nKey word: فروج = cracks / rifts.\nLesson: the perfect sky is a sign of One Creator.",
   trick:"Verses 1–5 = the DENIAL. Verses 6–10 = the SIGNS (sky, earth, rain, palms).",
   sheets: KEY(1, 2),
   tasks: gen("y8revislamic/qaf", "111122223333", 104011), pool: gen("y8revislamic/qaf", "1122331122331", 104501) }),
 T({ id:"prayer", title:"🕌 Prayer: Quran and Hadith evidence", strand:R + " · Revision Worksheet 1, Section C (Topics 1–7)",
   ideas:["Guarding the prayers and the middle prayer (Asr): Al-Baqarah 2:238; hadith of the Battle of the Trench.",
     "Prayer improves behaviour: Al-Ankabut 29:45; hadith of the river at the door; peace of heart: Ar-Ra'd 13:28.",
     "Accountability: Qaf 50:18 (every word recorded); Az-Zalzalah 99:7–8; the five questions on the Day of Resurrection (Tirmidhi).",
     "Adhan and Iqamah: Al-Jumu'ah 62:9; repeat what the mu'adhdhin says (Bukhari & Muslim).",
     "Congregation: Al-Baqarah 2:43; 27 degrees better (Bukhari & Muslim). Fard prayers: An-Nisa 4:103; prayer is the first deed judged (Tirmidhi). Walking to the masjid: At-Tawbah 9:18; Sahih Muslim."],
   example:"Q: Why is Asr given special importance?\nAyah: 'Guard strictly the prayers, especially the middle prayer' (2:238).\nHadith: 'Whoever misses the Asr prayer, it is as if he has lost his family and his wealth' (Bukhari & Muslim).\nApplication: pray Asr on time even when busy after school.",
   trick:"For every answer: Ayah + Hadith + Application.",
   sheets: KEY(1, 4).slice(2),
   tasks: gen("y8revislamic/prayer", "111122223333", 105011), pool: gen("y8revislamic/prayer", "1122331122331", 105501) }),
 T({ id:"belief", title:"🌙 Tawheed, Fitrah and Tawakkul (and JERAC answers)", strand:R + " · Revision Worksheet 2 (Q2, Q5–Q8)",
   ideas:["Tawheed: Allah alone creates, gives success and protects; lucky charms and superstitions are against Tawheed (shirk).",
     "Hard work is the means, but success is from Allah: 'And my success is only by Allah' (Hud 11:88).",
     "Fitrah: the natural belief in One Creator in every human — 'Every child is born upon the fitrah' (Bukhari & Muslim); Ar-Rum 30:30.",
     "Tawakkul: do your best and trust Allah's plan — 'Whoever relies on Allah, He is sufficient for him' (At-Talaq 65:3).",
     "Signs of creation (Al-Baqarah 2:164): heavens and earth, night and day, ships, rain, creatures, winds, clouds — perfect order shows One Creator.",
     "JERAC: Judgement, Evidence (Quran and Hadith), Reasoning, Application, Conclusion."],
   example:"JERAC: 'Surah Qaf is only about life after death.'\nJ: Incorrect.\nE: Qaf 50:18 (every word recorded); Qaf 50:16 (Allah is closer than the jugular vein).\nR: we are accountable for every word, so belief in the Hereafter shapes daily life.\nA: avoid lying, backbiting and bad language, online and in class.\nC: Surah Qaf directly shapes our daily behaviour.",
   trick:"JERAC = Judge, Evidence, Reason, Apply, Conclude.",
   sheets: KEY(2, 4),
   tasks: gen("y8revislamic/belief", "111122223333", 106011), pool: gen("y8revislamic/belief", "1122331122331", 106501) }),
 T({ id:"trench", title:"⛏️ The Battle of the Trench and Salman al-Farisi", strand:R + " · Revision Worksheet 2 (Q4) · Biography",
   ideas:["The Battle of the Trench (Al-Khandaq), also called the Battle of the Confederates (Al-Ahzab): many tribes united to attack Madinah.",
     "Salman al-Farisi (from Persia) suggested digging a trench; the Prophet ﷺ accepted his idea (shura).",
     "The Prophet ﷺ struck a huge rock three times: good news of the keys of Sham, Persia and Yemen (Musnad Ahmad, an-Nasa'i).",
     "Leadership qualities: leading by example, humility, consultation, sharing hardship, giving hope.",
     "Salman's biography: he left Persia searching for the truth, travelled through many teachers and lands, and found Islam in Madinah."],
   example:"Q: How can a class captain apply the Prophet's ﷺ leadership at the trench?\nWork alongside the team, not just give orders.\nListen to everyone's ideas (shura, like accepting Salman's plan).\nStay positive and give hope when things are hard.",
   trick:"Trench = Salman's idea + 3 strikes + Sham, Persia, Yemen.",
   sheets: KEY(2, 4).slice(1, 3),
   tasks: gen("y8revislamic/trench", "111122223333", 107011), pool: gen("y8revislamic/trench", "1122331122331", 107501) }),
 T({ id:"purity", title:"💧 Purity, wudu and tajweed", strand:R + " · Revision Worksheet 3 (word search, MCQ, matching, tajweed)",
   ideas:["Wudu (ablution) removes minor impurity; ghusl (full bath) removes major impurity; tayammum when there is no water.",
     "Wudu steps from the Quran: wash the face, the arms to the elbows, wipe (masah) the head, wash the feet.",
     "Siwak is a sunnah before prayer; believers will come with shining faces and limbs from the traces of wudu.",
     "Tajweed rules for noon sakinah and tanween: Izhar (clear, before throat letters), Idgham (merge; with ghunnah, or without ghunnah before ل and ر), Iqlab (change to meem before ب), Ikhfa (hide, e.g. before ف).",
     "Word search words: GHUSL, QIBLA, IMAM, ADHAN, IQAMAH, KHANDAQ, SALMAN, SIWAK, WUDU."],
   example:"Which rule applies in رجعٌ بعيد?\nTanween (ٌ) is followed by ب.\nBefore ب the rule is Iqlab: the noon sound changes to a meem.\nSo it is read 'raj'um ba'eed'.",
   trick:"Noon rules = 'I I I I': Izhar, Idgham, Iqlab, Ikhfa.",
   sheets: KEY(3, 3),
   tasks: gen("y8revislamic/purity", "111122223333", 108011), pool: gen("y8revislamic/purity", "1122331122331", 108501) })
]};

/* exam dates on the existing revision subjects and video lessons for the hardest units */
const setExam = (k, e) => { if (U[k]) U[k].exam = e; };
setExam("y8revscience", "Mon 23 Nov · 60 marks · 1h 15m"); setExam("y8revmaths", "Mon 30 Nov · 60 marks · 1h 30m");
if (U.y8revhistory) U.y8revhistory.exam = "Thu 26 Nov · 30 marks · 1h 15m"; if (U.y8revgeography) U.y8revgeography.exam = "Mon 7 Dec · 30 marks · 1h 15m";
const addVid = (k, t, v) => { const S = U[k], X = S && S.topics.find(x => x.id === t); if (X){ X.learn.videos = (X.learn.videos || []).concat(v); } };
addVid("y8revmaths", "primes", VID("maths-prime-factors", "Prime factor decomposition with a factor tree (1 minute)"));
addVid("y8revmaths", "expand", VID("maths-expand-factorise", "Expanding and factorising brackets (1 minute)"));
addVid("y8revmaths", "angles", VID("maths-parallel-angles", "Angles and parallel lines: Z, F and C (1 minute)"));
addVid("y8revmaths", "charts", VID("maths-pie-charts", "Drawing and reading pie charts (1 minute)"));
addVid("y8revscience", "density", VID("science-density", "Density calculations (1 minute)"));
addVid("y8revscience", "burning", VID("science-combustion", "Combustion: the fire triangle and burning fuels (1 minute)"));
addVid("y8revhistory", "trial", VID("history-charles", "Why was Charles I sentenced to death? (1 minute)"));
addVid("y8revgeography", "shape", VID("geography-waterfall", "How rivers shape the land: waterfalls and ox-bow lakes (1 minute)"));
})(window.UK = window.UK || {});
