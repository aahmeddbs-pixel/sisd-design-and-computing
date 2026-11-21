/* Study Plus · IB MYP 2 (Grade 7) · English: literary techniques.
   Four topics. A bank of example sentences for each technique powers a generator that makes hundreds of
   "spot the technique", "which sentence uses…" and "name the technique" questions. Videos: Oak National Academy lessons. */
(function(){
"use strict";
const G7 = window.G7, G = window.G7GEN, E = window.STUDY && window.STUDY.english; if (!G7 || !G || !E) return;

/* technique: [name, definition, effect, accepted typed answers, examples] */
const TECH = {
 simile:["simile", "compares two things using 'like' or 'as'", "helps the reader picture something vividly by linking it to something familiar", ["simile", "a simile"], [
  "Her smile was as bright as the sun.", "He ran like a cheetah across the field.", "The classroom was as quiet as a library at midnight.", "Her hands were as cold as ice.", "The baby slept like a log.",
  "The snow lay on the ground like a thick white blanket.", "He was as brave as a lion.", "The stars sparkled like tiny diamonds.", "The water in the lake was as smooth as glass.", "She moved through the crowd like a ghost."]],
 metaphor:["metaphor", "says one thing IS something else (no 'like' or 'as')", "creates a powerful image by saying something actually is something else", ["metaphor", "a metaphor"], [
  "The classroom was a zoo.", "Time is a thief.", "Her eyes were deep blue oceans.", "My brother is a couch potato.", "He has a heart of stone.",
  "Life is a rollercoaster.", "The exam was a mountain I had to climb.", "The city was a jungle of concrete and glass.", "His words were knives.", "The moon was a silver coin in the sky."]],
 personification:["personification", "gives human qualities or actions to something that is not human", "brings objects and nature to life, making a scene feel alive, friendly or threatening", ["personification"], [
  "The wind howled through the trees.", "The sun smiled down on the beach.", "The old house groaned in the storm.", "The leaves danced in the breeze.", "My alarm clock screamed at me this morning.",
  "The flowers nodded their heads in the garden.", "The car coughed and spluttered before it stopped.", "Opportunity knocked on her door.", "The waves whispered on the shore.", "The hungry fire gobbled up the forest."]],
 hyperbole:["hyperbole", "a deliberate, extreme exaggeration that is not meant to be taken literally", "emphasises a feeling or adds humour", ["hyperbole", "exaggeration"], [
  "I've told you a million times!", "This bag weighs a ton.", "I'm so hungry I could eat a horse.", "I've got a million things to do today.", "It's so hot you could fry an egg on the pavement.",
  "The queue went on forever.", "I nearly died laughing.", "He's the tallest person in the whole universe.", "We walked about a thousand miles to get to the shop.", "My little sister cried a river of tears."]],
 oxymoron:["oxymoron", "puts two opposite words side by side", "highlights a contradiction or a complicated feeling", ["oxymoron", "an oxymoron"], [
  "There was a deafening silence.", "It was an open secret.", "The film had a bittersweet ending.", "The room was full of organised chaos.", "It was an act of cruel kindness.",
  "The wise fool sat in the corner.", "Their friendly fight lasted for hours.", "It was a seriously funny film.", "She gave me a sad smile.", "It was a small crowd of giants."]],
 alliteration:["alliteration", "the same consonant sound repeated at the start of nearby words", "makes phrases memorable and can create rhythm or mood", ["alliteration"], [
  "Peter Piper picked a peck of pickled peppers.", "The big brown bear bounced on the bed.", "Freezing fog filled the field.", "Many mice made a mess.", "The dark, dreary dungeon was damp.",
  "Bright blue birds built big nests.", "Lucy's lovely little lamb lay down.", "Clever cats catch crickets.", "The golden geese gathered in the garden.", "Ten tiny turtles tiptoed to the tank."]],
 sibilance:["sibilance", "repeated 's', 'sh' or soft 'c' sounds", "creates a soft, soothing, whispering or sinister hissing effect", ["sibilance"], [
  "The snake slithered silently through the grass.", "The sails swayed in the soft sea breeze.", "Whispers spread across the silent classroom.", "She sells seashells by the seashore.", "The silent snow settled softly.",
  "Sleepy sailors sighed sadly.", "Soft, sweet music swept across the stage.", "Silky sand slipped through her fingers."]],
 onomatopoeia:["onomatopoeia", "a word that sounds like the noise it describes", "lets the reader hear the scene, making it more vivid", ["onomatopoeia"], [
  "The door creaked open.", "Crash! The plates hit the floor.", "The clock ticked on the wall.", "Bang! The balloon popped.", "The dog woofed at the postman.",
  "The eggs crackled in the pan.", "Thud. The book landed on the floor.", "The cow mooed loudly.", "Water dripped from the tap all night.", "The thunder rumbled overhead."]],
 assonance:["assonance", "the same vowel sound repeated in nearby words", "creates rhythm and a musical, flowing sound", ["assonance"], [
  "Try to light the fire tonight.", "Go slow over the road.", "The rain in Spain falls mainly on the plain.", "I lie by the fire and sigh.", "Hear the mellow wedding bells.", "The cool moon shone on the pool."]],
 repetition:["repetition", "repeating a word or phrase for effect", "emphasises an idea, builds tension or makes it stick in the reader's mind", ["repetition"], [
  "Never, never, never give up.", "Run, run as fast as you can.", "It was cold. So cold. Too cold.", "Water, water, everywhere.", "Again and again and again, the waves hit the wall.",
  "Faster, faster, faster!", "Help me, please, please help me.", "Every day, every hour, every minute, I miss you."]],
 pathetic:["pathetic fallacy", "the weather or setting reflects a character's mood or the atmosphere", "sets the mood and hints at how characters feel or what will happen", ["pathetic fallacy"], [
  "As Tom read the terrible news, dark clouds gathered and rain lashed the windows.", "On the happiest day of her life, the sun shone in a cloudless sky.", "The storm raged outside as the two brothers argued.", "A cold, grey mist hung over the funeral.",
  "Birds sang and the sun sparkled as the friends were reunited.", "Thunder crashed as the villain entered the castle.", "The fog thickened as she became more and more confused."]],
 rhetorical:["rhetorical question", "a question asked for effect, not for an answer", "makes the reader think and agree with the writer's point", ["rhetorical question", "a rhetorical question"], [
  "Do we really want to live in a world without trees?", "Who wouldn't want an extra week of holiday?", "How many more animals must suffer before we act?", "Isn't it time we stood up for what is right?",
  "What kind of person ignores a friend in need?", "Can we really call ourselves kind if we waste so much food?"]],
 three:["rule of three", "a list of three words or phrases", "sounds complete and memorable, adding emphasis", ["rule of three", "triplet", "tricolon", "list of three"], [
  "The hotel was clean, comfortable and cheap.", "Stop, look and listen.", "She was tired, hungry and cold.", "The food was hot, fresh and delicious.",
  "Our new park is safer, greener and bigger.", "We need courage, patience and teamwork."]],
 foreshadowing:["foreshadowing", "a hint or clue about something that will happen later", "builds suspense because the reader senses what is coming", ["foreshadowing"], [
  "Nobody noticed the small crack in the dam that morning.", "'I have a bad feeling about this trip,' Mum whispered.", "The old woman warned him never to open the red door.",
  "If only I had known then how much that one decision would change everything.", "He waved goodbye, not knowing it was the last time he would see her."]],
 cliffhanger:["cliffhanger", "a chapter or story ends at a tense moment with the outcome unknown", "makes the reader desperate to find out what happens next", ["cliffhanger", "a cliffhanger"], [
  "She opened the box — and gasped.", "Just as the bridge began to collapse, the screen went black.", "The footsteps stopped right outside his door…", "And then the phone rang. It was the person she never expected to hear from again.",
  "He reached for the handle. It was already turning."]],
 juxtaposition:["juxtaposition", "placing two contrasting things side by side", "highlights the difference between them", ["juxtaposition", "contrast"], [
  "In the rich side of town, mansions glittered; across the river, families shivered in broken huts.", "The baby laughed as the old man wept.", "Outside, a storm raged; inside, everyone was warm and calm.",
  "The athlete was strong and proud; his rival was tired and beaten.", "The garden was full of life, but the house beside it was silent and dead."]]
};
const GROUPS = { figurative:["simile", "metaphor", "personification", "hyperbole", "oxymoron"], sound:["alliteration", "sibilance", "onomatopoeia", "assonance", "repetition"], structure:["pathetic", "rhetorical", "three", "foreshadowing", "cliffhanger", "juxtaposition"] };
/* pairs that overlap (an example of one may also count as the other), so they never appear as rival answers */
const CLASH = { alliteration:["sibilance"], sibilance:["alliteration", "assonance", "personification"], assonance:["sibilance", "repetition"], repetition:["assonance", "three"], three:["repetition"], hyperbole:["metaphor"], metaphor:["hyperbole", "personification"],
  personification:["pathetic", "juxtaposition", "metaphor", "sibilance"], pathetic:["personification", "onomatopoeia", "juxtaposition"], juxtaposition:["pathetic", "personification"], onomatopoeia:["pathetic"], cliffhanger:["foreshadowing"], foreshadowing:["cliffhanger"] };
const ok = (a, b) => a !== b && !(CLASH[a] || []).includes(b) && !(CLASH[b] || []).includes(a);
TECH.oxymoron[4].pop();   /* keep only clear examples */

function techGen(keys){ return (d, r) => { const K = G7.kit(r), t = K.pick(keys), D = TECH[t], s = K.pick(D[4]);
  if (d === 1){ const rivals = K.shuffle(keys.filter(k => ok(t, k))).slice(0, 3);
    return G7.mcq(1, `Which technique is used here?\n"${s}"`, D[0], rivals.map(k => TECH[k][0]), `Technique: ${D[0]} — ${D[1]}. Effect: it ${D[2]}.`); }
  if (d === 2){ const rivals = K.shuffle(keys.filter(k => ok(t, k))).slice(0, 3).map(k => K.pick(TECH[k][4]));
    return G7.mcq(2, `Which sentence uses ${D[0]}?`, s, rivals, `"${s}" uses ${D[0]} (${D[1]}). The other sentences use different techniques.`); }
  if (K.int(0, 1)) return { d:3, k:"text", q:`Name the technique (type it):\n"${s}"`, a:D[3].concat(D[3].map(x => x.toLowerCase())), best:D[0], x:`Technique: ${D[0]} — ${D[1]}. Effect: it ${D[2]}.` };
  const rivals = K.shuffle(Object.keys(TECH).filter(k => ok(t, k))).slice(0, 3);
  return G7.mcq(3, `"${s}"\nWhat is the effect of the ${D[0]} here?`, `It ${D[2]}`, rivals.map(k => `It ${TECH[k][2]}`), `${D[0][0].toUpperCase() + D[0].slice(1)}: ${D[1]}. So it ${D[2]}.`); }; }
G["english/litfigurative"] = techGen(GROUPS.figurative);
G["english/litsound"] = techGen(GROUPS.sound);
G["english/litstructure"] = techGen(GROUPS.structure);
G["english/litanalysis"] = (d, r) => { const K = G7.kit(r), all = Object.keys(TECH);
  if (d === 3){ const t = K.pick(all), D = TECH[t], s = K.pick(D[4]);
    return G7.mcq(3, `Which is the best analysis of: "${s}"?`, `The writer uses ${D[0]}, which ${D[2]}.`, [`The writer uses ${D[0]} because it is a nice sentence.`, `The sentence has words in it that make it good.`, `The writer uses full stops to end the sentence.`], `A strong analysis names the technique, quotes it and explains its EFFECT on the reader.`); }
  const t = K.pick(all), D = TECH[t];
  const cap = x => x[0].toUpperCase() + x.slice(1);
  if (d === 1) return G7.mcq(1, `What is ${D[0]}?`, cap(D[1]), K.shuffle(all.filter(k => ok(t, k))).slice(0, 3).map(k => cap(TECH[k][1])), `${cap(D[0])}: ${D[1]}. Example: "${D[4][0]}"`);
  return techGen(all)(K.int(1, 2), r);
};

const mc = G7.mcq, ex = G7.ex, gen = G7.gen, tx = (d, q, a, x) => ({ d, k:"text", q, a:[].concat(a), best:[].concat(a)[0], x });
const OAK = (slug, t) => ({ url:"https://www.thenational.academy/pupils/lessons/" + slug + "/video", title:t, by:"Oak National Academy" });
const BBC = (q, t) => ["📗", t, "https://www.bbc.co.uk/bitesize/search?q=" + encodeURIComponent(q)];
const T = o => Object.assign({ strand:"MYP 2 · Criterion A: Analysing", focus:true }, o);
const add = t => { if (!E.topics.some(x => x.id === t.id)) E.topics.push(t); };
const defs = keys => keys.map(k => `${TECH[k][0][0].toUpperCase() + TECH[k][0].slice(1)}: ${TECH[k][1]}. e.g. "${TECH[k][4][0]}"`);

add(T({ id:"litfigurative", title:"🎨 Literary techniques 1: figurative language",
  learn:{ ideas:["Figurative language is not meant literally. It creates pictures and feelings in the reader's mind."].concat(defs(GROUPS.figurative)),
    example:"\"The fog crept through the silent streets like a thief.\"\nPersonification: fog can't 'creep' — it is given a human action.\nSimile: 'like a thief' compares the fog to a criminal.\nEffect: the fog seems sneaky and dangerous, so the street feels threatening.",
    more:[ ex("How do you tell a simile from a metaphor?", ["Look for the words 'like' or 'as'.", "'Her voice was like honey' → uses 'like' → simile.", "'Her voice was honey' → says it IS honey → metaphor.", "Both compare, but only the simile uses like/as."], "Like/as = simile; 'is/was' = metaphor"),
      ex("Explain the effect of: \"The car coughed and spluttered.\"", ["Name it: personification (a car can't cough).", "Quote the key words: 'coughed and spluttered'.", "Explain the picture: the car sounds old and ill, like a sick person.", "Effect: the reader feels it might break down at any moment."], "Point → evidence → effect") ],
    videos:[ OAK("practising-using-figurative-language", "Practising figurative language: similes and personification"), OAK("creative-writing-simile-and-metaphor-6cw3gr", "Creative writing: simile and metaphor") ],
    fun:"Shakespeare invented or popularised hundreds of phrases we still use, like 'heart of gold' and 'wild-goose chase' — many of them are metaphors!",
    trick:"Simile = SIMilar (like/as). Metaphor = it IS. Personification = PERSON-ification (human actions)." },
  links:[ BBC("KS3 similes metaphors personification", "BBC Bitesize: figurative language") ],
  tasks: gen("english/litfigurative", "1111222233", 51011).concat([ mc(2, "Which is the strongest way to start analysing a technique?", "Name it, quote it, then explain its effect on the reader", ["Just name it", "Copy the whole paragraph", "Say it is good"], "Naming alone earns few marks: the effect is what matters."), tx(3, "'The classroom was a zoo.' What technique is this? (type it)", ["metaphor", "a metaphor"], "It says the classroom IS a zoo, without 'like' or 'as'.") ]),
  pool: gen("english/litfigurative", "1122331233", 51501).concat([ mc(1, "Which word signals a simile?", "like", ["is", "and", "but"], "Similes use 'like' or 'as'."), mc(2, "'The thunder grumbled' gives thunder a human action. What is it?", "Personification", ["Simile", "Oxymoron", "Hyperbole"], "Grumbling is something people do."), mc(3, "Why might a writer choose a metaphor instead of a simile?", "It is more direct and forceful: it says something IS something else", ["It is shorter to type", "Similes are wrong", "Metaphors don't create images"], "A metaphor removes 'like/as', so the comparison feels stronger.") ]) }));

add(T({ id:"litsound", title:"🔊 Literary techniques 2: sound and repetition",
  learn:{ ideas:["Writers choose words for how they SOUND as well as what they mean, especially in poetry and speeches."].concat(defs(GROUPS.sound)).concat(["Sibilance is a kind of alliteration using 's' sounds; both are about repeated sounds."]),
    example:"\"Crack! The silver sea slapped and smashed against the rocks.\"\nOnomatopoeia: 'Crack', 'slapped', 'smashed' sound like the noise.\nSibilance: repeated 's' sounds (silver, sea, slapped, smashed).\nEffect: the reader can almost hear the violent, hissing waves.",
    more:[ ex("Find and explain the technique: \"Never, never, never give up.\"", ["Spot the pattern: 'never' is said three times.", "Name it: repetition.", "Effect: it hammers home the message and makes it hard to forget.", "Write: 'The repetition of \"never\" emphasises how determined the speaker is.'"], "Repetition for emphasis") ],
    videos:[ OAK("linguistic-features-of-descriptive-writing", "Linguistic features of descriptive writing"), OAK("creative-writing-simile-and-metaphor-6cw3gr", "Creative writing: simile and metaphor") ],
    fun:"Tongue twisters like 'She sells seashells by the seashore' are hard to say BECAUSE of sibilance and alliteration!",
    trick:"Alliteration = same first Letter sound. Assonance = same vowel (A, E, I, O, U) sound. Onomatopoeia = words that make noises." },
  links:[ BBC("KS3 alliteration onomatopoeia", "BBC Bitesize: sound techniques") ],
  tasks: gen("english/litsound", "1111222233", 52011).concat([ mc(2, "Why do adverts use alliteration (e.g. 'Coca-Cola', 'Dunkin' Donuts')?", "It makes names catchy and memorable", ["It makes them longer", "It is required by law", "It hides the meaning"], "Repeated sounds stick in our memory."), tx(3, "'Buzz', 'sizzle' and 'pop' are examples of which technique? (type it)", ["onomatopoeia"], "They sound like the noises they describe.") ]),
  pool: gen("english/litsound", "1122331233", 52501).concat([ mc(1, "Which word is onomatopoeia?", "splash", ["happy", "table", "quickly"], "'Splash' sounds like the noise water makes."), mc(3, "What mood can sibilance create in a horror story?", "A sinister, hissing, snake-like mood", ["A loud, cheerful mood", "No mood at all", "A funny mood only"], "The 's' sounds can feel menacing, like whispering or hissing.") ]) }));

add(T({ id:"litstructure", title:"📚 Literary techniques 3: mood, persuasion and structure",
  learn:{ ideas:["Some techniques work across a whole sentence, paragraph or story rather than one word."].concat(defs(GROUPS.structure)),
    example:"\"Rain hammered the windows as Sam stared at the letter. Should he open it? He had no idea that this one envelope would change his life forever.\"\nPathetic fallacy: the stormy weather matches Sam's worry.\nRhetorical question: 'Should he open it?' pulls the reader into his dilemma.\nForeshadowing: the last sentence hints at something big to come.",
    more:[ ex("Write a sentence using pathetic fallacy to show a happy mood.", ["Decide the mood: happy.", "Choose matching weather: sunshine, a soft breeze, birdsong.", "Link it to the character: 'As Aisha opened her results, the sun burst through the clouds.'", "Check: the weather mirrors her joy."], "Weather that matches the feeling") ],
    videos:[ OAK("linguistic-features-of-descriptive-writing", "Linguistic features of descriptive writing") ],
    fun:"The term 'pathetic fallacy' was invented by the writer John Ruskin in 1856 — he actually meant it as a criticism of poets who did it too much!",
    trick:"Storms for trouble, sunshine for joy (pathetic fallacy). Questions to make you think (rhetorical). Lists of three to sound complete." },
  links:[ BBC("KS3 pathetic fallacy rhetorical question", "BBC Bitesize: structure and persuasion") ],
  tasks: gen("english/litstructure", "1111222233", 53011).concat([ mc(2, "Why do writers end chapters with cliffhangers?", "To make readers want to keep reading", ["To end the story", "To summarise", "To confuse the plot"], "Suspense keeps people turning pages."), tx(3, "Which technique uses weather to show a character's feelings? (type it)", ["pathetic fallacy"], "Pathetic fallacy: e.g. a storm during an argument.") ]),
  pool: gen("english/litstructure", "1122331233", 53501).concat([ mc(1, "What is a rhetorical question?", "A question asked for effect, not for an answer", ["A question in a maths test", "A question with no question mark", "A question about rhetoric"], "It makes the audience think."), mc(3, "Which persuasive technique is 'Stop, look and listen'?", "Rule of three", ["Onomatopoeia", "Oxymoron", "Pathetic fallacy"], "Three items make it punchy and memorable.") ]) }));

add(T({ id:"litanalysis", title:"✍️ Literary techniques 4: analysing the effect (PEEL)",
  learn:{ ideas:["Spotting a technique is only step one. Marks come from explaining its EFFECT on the reader.",
    "PEEL: Point (what the writer does) → Evidence (a short quotation) → Explain (the technique and its effect) → Link (back to the question).",
    "Zoom in on single words: what do they suggest (connotations)? 'Crept' suggests sneaking and danger.",
    "Useful verbs: suggests, implies, emphasises, creates, conveys, highlights, makes the reader feel…",
    "Avoid 'it makes it interesting' — say HOW and WHY: 'it makes the reader feel nervous because…'"],
    example:"Question: How does the writer make the forest seem frightening?\nP: The writer presents the forest as threatening.\nE: 'The trees clawed at the sky.'\nE: Personification — 'clawed' suggests the trees are like wild animals with sharp claws, ready to attack.\nL: This makes the reader feel the forest is dangerous and alive.",
    more:[ ex("Improve this analysis: 'The writer uses a simile which is good.'", ["Quote the simile: 'as cold as ice'.", "Name it correctly: a simile.", "Explain the effect: it emphasises how freezing and unwelcoming the room is.", "Link: the reader shares the character's discomfort."], "Quote + technique + effect + link") ],
    videos:[ OAK("practising-using-figurative-language", "Practising figurative language") ],
    fun:"Examiners call 'it makes the reader want to read on' the most over-used sentence in English exams — be more specific and you'll stand out!",
    trick:"Don't just SPOT it — say WHAT it makes the reader think, feel or picture, and WHY." },
  links:[ BBC("KS3 PEE paragraph analysing language", "BBC Bitesize: analysing language") ],
  tasks: gen("english/litanalysis", "1112223333", 54011).concat([ mc(1, "What does the second E in PEEL stand for?", "Explain", ["Example", "End", "Edit"], "Point, Evidence, Explain, Link."), mc(2, "Which verb is best for analysis?", "suggests", ["says", "is", "has"], "'Suggests' shows you are interpreting, not retelling.") ]),
  pool: gen("english/litanalysis", "1122331233", 54501).concat([ mc(2, "Which quotation is best for analysis?", "A short, precise one, embedded in your sentence", ["A whole paragraph", "No quotation", "The title only"], "Short quotes let you zoom in on words."), mc(3, "What is a 'connotation'?", "The ideas or feelings a word suggests beyond its dictionary meaning", ["The dictionary definition", "A punctuation mark", "A type of rhyme"], "E.g. 'home' suggests safety and warmth."), mc(3, "Which is the best 'Link' sentence?", "This shows how the writer makes the forest seem dangerous to the reader.", ["The end.", "I like this poem.", "There are lots of trees."], "It ties the point back to the question.") ]) }));
})();
