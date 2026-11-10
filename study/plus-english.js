/* Study Plus · English · harder tasks for every topic, plus two new MYP 2 topics (d: 1 Core, 2 Extended, 3 Challenge) */
(function(S){
  const E = S.english, T = id => E.topics.find(t => t.id === id);
  T("grammar").tasks.push(
    { d:3, k:"mcq", q:"Which sentence contains a relative clause?", o:["The boy ran home quickly.","The boy who won the race ran home.","The boy ran, and he won.","Run home, boy!"], a:1, x:"'who won the race' is a relative clause: it starts with a relative pronoun (who, which, that, whose) and adds information about the noun 'boy'." },
    { d:3, k:"mcq", q:"Which sentence uses the subjunctive correctly?", o:["If I was you, I'd apologise.","If I were you, I'd apologise.","If I am you, I'd apologise.","If I be you, I'd apologise."], a:1, x:"For imaginary situations, formal English uses 'were' for every subject: 'If I were you…'. This is the subjunctive mood." },
    { d:2, k:"mcq", q:"In 'She carefully placed the fragile vase on the shelf', what is 'on the shelf'?", o:["A prepositional phrase","A relative clause","A main clause","An adverb"], a:0, x:"It begins with the preposition 'on' and tells us where: a prepositional phrase." },
    { d:3, k:"mcq", q:"Which sentence has the correct pronoun?", o:["Between you and I, it was easy.","Between you and me, it was easy.","Between yourself and I, it was easy.","Between you and myself, it was easy."], a:1, x:"After a preposition (between) use the object pronoun: me. Test it by removing 'you and': 'between me'." }
  );
  T("punctuation").tasks.push(
    { d:3, k:"mcq", q:"Which sentence uses brackets (parentheses) correctly?", o:["The Burj Khalifa (the tallest building in the world) is in Dubai.","The Burj Khalifa (is the tallest building) in Dubai.","(The Burj Khalifa) the tallest building is in Dubai.","The Burj Khalifa is (in Dubai."], a:0, x:"Brackets hold extra information that could be removed and the sentence would still make sense." },
    { d:3, k:"mcq", q:"Which sentence uses a dash for dramatic effect correctly?", o:["She opened the door — and screamed.","She — opened the door and screamed.","She opened — the door and screamed.","She opened the door and — screamed —."], a:0, x:"A single dash creates a pause before a surprising or dramatic ending." },
    { d:2, k:"mcq", q:"Which is correct for the toys belonging to the children?", o:["the childrens' toys","the children's toys","the childrens toys","the children' toys"], a:1, x:"'Children' is already plural and doesn't end in -s, so add 's: the children's toys." },
    { d:3, k:"mcq", q:"Which sentence uses a semicolon in a list correctly?", o:["I have visited Paris, France; Cairo, Egypt; and Tokyo, Japan.","I have visited; Paris, Cairo and Tokyo.","I have visited Paris; France, Cairo; Egypt.","I; have visited Paris, Cairo and Tokyo."], a:0, x:"When list items already contain commas, semicolons separate the items so the list stays clear." }
  );
  T("figurative").tasks.push(
    { d:3, k:"mcq", q:"'The classroom was a battlefield.' What is the most precise analysis?", o:["It is a simile showing the room was big.","It is a metaphor suggesting conflict, noise and chaos among students.","It is personification of the desks.","It shows the class was studying history."], a:1, x:"A strong analysis names the device (metaphor) and explains the connotations of 'battlefield': fighting, disorder, danger." },
    { d:3, k:"mcq", q:"What is pathetic fallacy?", o:["Exaggerating for effect","When weather or setting reflects a character's emotions","A comparison using 'like'","Repeating sounds"], a:1, x:"Pathetic fallacy uses weather or surroundings to mirror feelings: a storm as a character becomes furious." },
    { d:2, k:"mcq", q:"'The leaves danced in the autumn wind.' What effect does 'danced' create?", o:["The leaves seem lively and joyful","The leaves seem dead","The wind is silent","It shows it is summer"], a:0, x:"Personifying the leaves as dancing makes the scene feel light, playful and full of movement." },
    { d:3, k:"mcq", q:"What is an oxymoron?", o:["Two contradictory words placed together, like 'deafening silence'","A long metaphor across a whole poem","A word that sounds like its meaning","A question with no answer"], a:0, x:"An oxymoron joins opposites to create a striking idea: 'bitter sweet', 'deafening silence', 'cruel kindness'." }
  );
  T("persuasive").tasks.push(
    { d:3, k:"mcq", q:"What is a counter-argument used for in a persuasive essay?", o:["To confuse the reader","To show the other side and then rebut it, making your argument stronger","To change your opinion","To end the essay"], a:1, x:"Raising and then answering an opposing view ('Some argue… however…') shows you have thought it through and makes you more convincing." },
    { d:3, k:"mcq", q:"'Everyone knows that homework is pointless.' What is the weakness here?", o:["It uses a statistic","It is a sweeping generalisation with no evidence","It is too polite","It uses a rhetorical question"], a:1, x:"'Everyone knows' claims universal agreement without proof. Strong arguments use evidence." },
    { d:2, k:"mcq", q:"Which phrase is best for introducing a counter-argument?", o:["Firstly,","Admittedly, some people believe…","In conclusion,","For example,"], a:1, x:"'Admittedly' or 'Some may argue' signals you are about to consider the opposite view." },
    { d:3, k:"mcq", q:"What is 'ethos' in persuasion?", o:["Appeal to emotions","Appeal to logic and facts","Appeal to the speaker's credibility and trustworthiness","A type of advert"], a:2, x:"Aristotle's three appeals: ethos (credibility), pathos (emotion) and logos (logic)." }
  );
  T("reading").tasks.push(
    { d:3, k:"mcq", q:"What is dramatic irony?", o:["When the audience knows something a character doesn't","When a character tells a joke","When weather matches mood","When the story ends happily"], a:0, x:"In dramatic irony the reader knows more than the character, which builds tension: we know the villain is behind the door; the hero doesn't." },
    { d:3, k:"mcq", q:"A story jumps back to events years earlier. What is this called?", o:["Foreshadowing","Flashback","Climax","Cliffhanger"], a:1, x:"A flashback interrupts the present timeline to show past events. Foreshadowing hints at future events." },
    { d:2, k:"mcq", q:"'Little did she know, this would be her last day in the village.' What technique is this?", o:["Foreshadowing","Simile","Flashback","Onomatopoeia"], a:0, x:"It hints at something important that will happen later, creating suspense: foreshadowing." },
    { d:3, k:"mcq", q:"An unreliable narrator is…", o:["A narrator whose account the reader cannot fully trust","A narrator who speaks in third person","A narrator who is a villain","A narrator who only describes settings"], a:0, x:"An unreliable narrator may lie, be confused or biased, so the reader must read between the lines." }
  );
  E.topics.push(
    { id:"vocab", title:"Vocabulary: roots, prefixes and suffixes", strand:"MYP 2 · Criterion D: Using language",
      learn:{ ideas:[
        "A prefix goes at the start of a word and changes its meaning: un- (not), re- (again), pre- (before), mis- (wrongly), sub- (under).",
        "A suffix goes at the end and often changes the word class: -ful, -less (adjectives), -ly (adverbs), -tion, -ment (nouns).",
        "Many English words have Latin or Greek roots: 'port' = carry (transport), 'graph' = write (autograph), 'bio' = life.",
        "Synonyms mean the same; antonyms mean the opposite.",
        "Use context clues around an unknown word to work out its meaning."],
        example:"'Unbreakable' = un (not) + break + able (can be) = cannot be broken." },
      tasks:[
        { d:1, k:"mcq", q:"What does the prefix 'pre-' mean, as in 'preview'?", o:["After","Before","Again","Not"], a:1, x:"Pre- means before: a preview is seen before the main event." },
        { d:1, k:"mcq", q:"Which word is an antonym of 'generous'?", o:["Kind","Selfish","Giving","Helpful"], a:1, x:"An antonym has the opposite meaning. Generous (willing to give) ↔ selfish." },
        { d:1, k:"mcq", q:"Which suffix turns 'enjoy' into a noun?", o:["-ly","-ment","-ful","-ed"], a:1, x:"Enjoy + ment = enjoyment (a noun). '-ly' makes adverbs, '-ful' adjectives." },
        { d:2, k:"mcq", q:"The Greek root 'graph' means…", o:["Light","Write","Sound","Life"], a:1, x:"Graph = write or draw: autograph (self-writing), biography (life-writing), paragraph." },
        { d:2, k:"mcq", q:"What does 'misinterpret' mean?", o:["Understand again","Understand wrongly","Translate","Explain clearly"], a:1, x:"Mis- means wrongly: to misinterpret is to understand something wrongly." },
        { d:2, k:"mcq", q:"'The scientist was meticulous, checking every result three times.' What does 'meticulous' mean?", o:["Careless","Very careful and precise","Fast","Angry"], a:1, x:"The context clue 'checking every result three times' shows great care and precision." },
        { d:2, k:"mcq", q:"Which is a synonym for 'enormous'?", o:["Tiny","Gigantic","Narrow","Ordinary"], a:1, x:"Synonyms share meaning: enormous and gigantic both mean very large." },
        { d:3, k:"mcq", q:"The Latin root 'port' means 'carry'. Which word does NOT come from it?", o:["Transport","Portable","Import","Portrait"], a:3, x:"Transport, portable and import all involve carrying. 'Portrait' comes from a different root (to draw out / depict)." },
        { d:3, k:"mcq", q:"'Benevolent' contains 'bene' (good). What does it mean?", o:["Kind and well-meaning","Evil","Lazy","Curious"], a:0, x:"Bene = good, vol = wish: benevolent means wishing good for others. Compare 'benefit'. Its antonym is 'malevolent'." },
        { d:3, k:"mcq", q:"Which word means 'not able to be seen'?", o:["Invisible","Visionary","Revisit","Visual"], a:0, x:"In- (not) + vis (see) + -ible (able to be) = invisible." }
      ] },
    { id:"writing", title:"Writing: structure and register", strand:"MYP 2 · Criterion B: Organising",
      learn:{ ideas:[
        "Start a new paragraph for a new idea, time, place, speaker or person (TiPToP).",
        "A good paragraph has a topic sentence, supporting details and a linking sentence.",
        "Connectives guide the reader: however (contrast), furthermore (adding), therefore (result), meanwhile (time).",
        "Register is how formal your language is. Formal: 'I would be grateful if…'. Informal: 'Can you…?'",
        "Match your writing to purpose and audience: a letter to a head teacher is formal; a message to a friend is not."],
        example:"Formal: 'I am writing to request further information about the trip.'\nInformal: 'Hey, what's the plan for the trip?'" },
      tasks:[
        { d:1, k:"mcq", q:"Which connective shows contrast?", o:["Furthermore","However","Therefore","Firstly"], a:1, x:"'However' introduces an opposing idea. 'Furthermore' adds, 'therefore' shows a result." },
        { d:1, k:"mcq", q:"When should you start a new paragraph?", o:["Every two sentences","When there is a new idea, time, place, speaker or person","Only at the end","Never in a story"], a:1, x:"Remember TiPToP: Time, Place, Topic, Person (including a new speaker)." },
        { d:1, k:"mcq", q:"Which opening suits a formal letter to a company?", o:["Hiya!","Dear Sir or Madam,","Yo,","What's up?"], a:1, x:"Formal letters open with 'Dear Sir or Madam' (or a name) and close with 'Yours faithfully/sincerely'." },
        { d:2, k:"mcq", q:"What is a topic sentence?", o:["The last line of a story","The sentence that introduces the main idea of a paragraph","A quotation","The title"], a:1, x:"The topic sentence tells the reader what the paragraph is about; the rest of the paragraph supports it." },
        { d:2, k:"mcq", q:"Which connective shows a result?", o:["Consequently","Although","Meanwhile","Similarly"], a:0, x:"'Consequently' (as a result) shows cause and effect." },
        { d:2, k:"mcq", q:"Which sentence is the most formal?", o:["The food was kinda bad.","The food was awful, no joke.","The quality of the food was disappointing.","Food = terrible."], a:2, x:"Formal register uses complete sentences, precise vocabulary and no slang." },
        { d:2, k:"mcq", q:"How should a formal letter that starts 'Dear Mr Khan' end?", o:["Yours faithfully","Yours sincerely","Love from","Cheers"], a:1, x:"If you name the person, end 'Yours sincerely'. If you start 'Dear Sir or Madam', end 'Yours faithfully'." },
        { d:3, k:"mcq", q:"What is the purpose of a conclusion in an essay?", o:["To introduce new evidence","To sum up the main points and give a final judgement","To repeat the introduction word for word","To list sources only"], a:1, x:"A conclusion pulls the argument together and answers the question; it shouldn't introduce new evidence." },
        { d:3, k:"mcq", q:"Which sentence best varies sentence openings for effect?", o:["I walked. I saw. I ran.","Silently, I crept towards the door.","I walked and I walked and I walked.","The door. The door. The door."], a:1, x:"Opening with an adverb ('Silently,') varies rhythm and creates atmosphere, instead of starting every sentence with 'I'." },
        { d:3, k:"mcq", q:"In a speech to Grade 7 about healthy eating, which register fits best?", o:["Very formal legal language","Friendly but clear, with direct address","Text-speak with emojis","Scientific jargon only"], a:1, x:"For a student audience, a friendly but clear register with 'you' and 'we' keeps them engaged while staying respectful." }
      ] }
  );
})(window.STUDY);
