/* Study Plus · English (Language and Literature) · IB MYP 2 (Grade 7) */
(window.STUDY = window.STUDY || {}).english = {
  name: "English", icon: "Aa", colour: "#7A3E9D",
  blurb: "MYP 2 grammar, punctuation, figurative and persuasive language, reading",
  topics: [
    {
      id: "grammar", title: "Grammar: word classes and sentences", strand: "MYP 2 · Criterion D: Using language",
      learn: {
        ideas: [
          "Nouns name things, verbs show actions or states, adjectives describe nouns, adverbs describe verbs (often ending in -ly).",
          "A simple sentence has one main clause. A compound sentence joins two main clauses with and, but, or, so.",
          "A complex sentence has a main clause plus a subordinate clause that starts with words like because, although, when, if.",
          "The subject and verb must agree: 'The team is…', 'The players are…'.",
          "Keep to one tense in a paragraph unless the time actually changes."
        ],
        example: "Although it was raining, the students played outside.\n'the students played outside' is the main clause (it makes sense alone).\n'Although it was raining' is the subordinate clause, so this is a complex sentence."
      },
      tasks: [
        { k:"mcq", q:"In the sentence 'The tired runner slowly crossed the line', which word is an adverb?", o:["tired","runner","slowly","crossed"], a:2, x:"'Slowly' tells us how the runner crossed, so it describes the verb: it is an adverb. 'Tired' is an adjective because it describes the noun 'runner'." },
        { k:"mcq", q:"Which sentence is a complex sentence?", o:["I like tea.","I like tea and she likes coffee.","Because it was late, we took a taxi.","Run!"], a:2, x:"'Because it was late' is a subordinate clause attached to the main clause 'we took a taxi'. That makes it complex. The second option is compound (two main clauses joined by 'and')." },
        { k:"mcq", q:"Choose the correct verb: 'Neither of the boys ___ finished the work.'", o:["have","has","are","were"], a:1, x:"'Neither' is singular (it means 'not either one'), so it takes the singular verb 'has'." },
        { k:"mcq", q:"Which word is a conjunction?", o:["quickly","beneath","although","bright"], a:2, x:"Conjunctions join clauses. 'Although' joins a subordinate clause to a main clause. 'Beneath' is a preposition, 'quickly' an adverb, 'bright' an adjective." },
        { k:"tf", q:"True or false: 'Yesterday I go to the mall and buy a new phone' uses the correct tense.", a:false, x:"'Yesterday' tells us it is in the past, so the verbs should be past tense: 'Yesterday I went to the mall and bought a new phone.'" },
        { k:"mcq", q:"Which word is a pronoun in: 'Sara gave her brother the keys because he had lost his.'?", o:["gave","keys","he","because"], a:2, x:"'He' replaces the noun 'brother', so it is a pronoun. 'Her' and 'his' are also pronoun forms (possessive)." },
        { k:"mcq", q:"Which is the best way to join: 'The match was cancelled. It was raining heavily.'", o:["The match was cancelled, it was raining heavily.","The match was cancelled because it was raining heavily.","The match was cancelled it was raining heavily.","Cancelled the match, raining."], a:1, x:"'Because' shows the reason and joins the clauses correctly. Joining two main clauses with only a comma is an error called a comma splice." },
        { k:"mcq", q:"Which sentence uses the active voice?", o:["The window was broken by the ball.","The cake was eaten.","The ball broke the window.","The report was written by Omar."], a:2, x:"In the active voice the subject does the action: 'The ball (subject) broke (verb) the window'. The others are passive: the action is done to the subject." }
      ]
    },
    {
      id: "punctuation", title: "Punctuation", strand: "MYP 2 · Criterion D: Using language",
      learn: {
        ideas: [
          "Commas separate items in a list and mark off extra information: 'My cousin, who lives in Abu Dhabi, is visiting.'",
          "Apostrophes show possession (Sara's bag, the students' bags) or missing letters (don't, it's = it is).",
          "'Its' with no apostrophe means 'belonging to it': 'The cat licked its paw.'",
          "A semicolon joins two closely related main clauses: 'It was late; we went home.'",
          "Speech marks go around the words spoken, and punctuation goes inside them: \"Wait for me,\" she said."
        ],
        example: "the students bags were left in the hall said mr ahmed\n→ \"The students' bags were left in the hall,\" said Mr Ahmed.\n(Plural possession: students'. Comma inside the speech marks. Capitals for names.)"
      },
      tasks: [
        { k:"mcq", q:"Which is correct?", o:["The dog wagged it's tail.","The dog wagged its tail.","The dog wagged its' tail.","The dog wagged it is tail."], a:1, x:"'Its' (no apostrophe) shows belonging. 'It's' always means 'it is' or 'it has'. Test: 'The dog wagged it is tail' makes no sense, so no apostrophe." },
        { k:"mcq", q:"Several girls share one changing room. Which is correct?", o:["the girl's changing room","the girls changing room","the girls' changing room","the girls's changing room"], a:2, x:"The owners are plural and the plural already ends in -s, so the apostrophe goes after the s: girls'." },
        { k:"mcq", q:"Which sentence uses commas correctly?", o:["I bought apples, bananas and, grapes.","I bought apples bananas, and grapes.","I bought apples, bananas and grapes.","I, bought apples bananas and grapes."], a:2, x:"Commas separate the items in a list. In British English you normally do not need a comma before the final 'and'." },
        { k:"mcq", q:"Where should the semicolon go? 'I revised all week I felt ready for the test'", o:["I revised; all week I felt ready for the test","I revised all week; I felt ready for the test","I revised all week I felt; ready for the test","I; revised all week I felt ready for the test"], a:1, x:"A semicolon joins two complete main clauses that are closely linked: 'I revised all week' and 'I felt ready for the test'." },
        { k:"mcq", q:"Which line of speech is punctuated correctly?", o:["\"Close the door\" said Omar.","\"Close the door,\" said Omar.","\"Close the door\", said Omar.","Close the door, \"said Omar.\""], a:1, x:"The comma goes inside the closing speech marks, before the reporting clause 'said Omar'." },
        { k:"text", q:"Write the short form of 'they are' with an apostrophe.", a:["they're"], x:"The apostrophe replaces the missing letter 'a': they are → they're. Do not confuse it with 'their' (belonging) or 'there' (place)." },
        { k:"tf", q:"True or false: A colon can introduce a list, as in 'You will need: a ruler, a pencil and a rubber.'", a:true, x:"A colon introduces a list or an explanation. Strictly, the words before the colon should be a full clause: 'You will need three things: a ruler, a pencil and a rubber.'" },
        { k:"mcq", q:"Which sentence needs a question mark?", o:["I wonder where she went","Where did she go","She asked where I went","Tell me where she went"], a:1, x:"Only a direct question needs a question mark: 'Where did she go?' The others report or command a question, so they end with a full stop." }
      ]
    },
    {
      id: "figurative", title: "Figurative language and poetry", strand: "MYP 2 · Criterion A: Analysing",
      learn: {
        ideas: [
          "A simile compares using 'like' or 'as': 'as brave as a lion'.",
          "A metaphor says something IS something else: 'The classroom was a zoo.'",
          "Personification gives human qualities to non-human things: 'The wind whispered.'",
          "Alliteration repeats the same first sound: 'silent snakes slid'. Onomatopoeia is a word that sounds like its meaning: buzz, crash.",
          "When you analyse, explain the EFFECT: what the reader pictures or feels, and why the writer chose it."
        ],
        example: "'The city was a sleeping giant.'\nTechnique: metaphor.\nEffect: it makes the city seem huge and powerful but quiet for now, as if it could wake up at any moment."
      },
      tasks: [
        { k:"mcq", q:"'Her smile was as bright as the sun.' Which technique is this?", o:["Metaphor","Simile","Personification","Onomatopoeia"], a:1, x:"It compares using 'as … as', so it is a simile." },
        { k:"mcq", q:"'The old car coughed and groaned up the hill.' Which technique is this?", o:["Personification","Alliteration","Simile","Hyperbole"], a:0, x:"Cars cannot really cough or groan: those are human actions. Giving a machine human qualities is personification. It makes the car seem tired and old." },
        { k:"mcq", q:"'Time is a thief.' Which technique is this?", o:["Simile","Metaphor","Onomatopoeia","Rhyme"], a:1, x:"It says time IS a thief (no 'like' or 'as'), so it is a metaphor. The effect: time secretly takes things away from us." },
        { k:"mcq", q:"Which line uses alliteration?", o:["The bees buzzed.","Wild winds whipped the waves.","The night was cold.","He ran like the wind."], a:1, x:"'Wild winds whipped the waves' repeats the 'w' sound at the start of nearby words. ('Buzzed' is onomatopoeia.)" },
        { k:"mcq", q:"'I've told you a million times!' Which technique is this?", o:["Hyperbole","Simile","Personification","Alliteration"], a:0, x:"Hyperbole is deliberate exaggeration for effect. Nobody has really said it a million times; it shows frustration." },
        { k:"mcq", q:"Which word is an example of onomatopoeia?", o:["gloomy","sizzle","enormous","quietly"], a:1, x:"'Sizzle' sounds like the noise food makes in a hot pan, so it is onomatopoeia." },
        { k:"mcq", q:"'The darkness swallowed the town.' What is the best explanation of the effect?", o:["It tells us the time.","It makes the darkness seem alive, powerful and threatening, as if it eats the town.","It shows the town is small.","It is a simile comparing darkness to food."], a:1, x:"Good analysis names the effect: the verb 'swallowed' personifies the darkness as a creature that consumes everything, creating fear and a sense of power." },
        { k:"tf", q:"True or false: A stanza is a group of lines in a poem, like a paragraph in prose.", a:true, x:"Poems are organised into stanzas. Poets use stanza breaks to shift time, mood or idea, just as writers use paragraphs." }
      ]
    },
    {
      id: "persuasive", title: "Persuasive language and media", strand: "MYP 2 · Criteria A and C",
      learn: {
        ideas: [
          "Writers persuade with techniques you can remember as AFOREST: Alliteration, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triplets (rule of three).",
          "A rhetorical question does not expect an answer; it makes the reader think: 'Do we really want a dirtier city?'",
          "Emotive language uses words that create strong feelings: 'helpless', 'devastating', 'innocent'.",
          "A fact can be proved; an opinion is what someone believes.",
          "In adverts, look at the audience, purpose and the effect of images, colours and slogans."
        ],
        example: "'Every single day, thousands of helpless animals suffer. Can you really look away?'\nTechniques: emotive language ('helpless', 'suffer'), a rhetorical question.\nEffect: makes the reader feel guilty and responsible, pushing them to act."
      },
      tasks: [
        { k:"mcq", q:"'Isn't it time we protected our oceans?' Which technique is this?", o:["Statistic","Rhetorical question","Triplet","Alliteration"], a:1, x:"It is a question the writer doesn't expect you to answer aloud; it pushes you to agree. That is a rhetorical question." },
        { k:"mcq", q:"Which is a fact rather than an opinion?", o:["Football is the best sport.","Dubai is a fantastic city.","The Burj Khalifa is over 800 metres tall.","Homework is boring."], a:2, x:"A fact can be checked and proved: the Burj Khalifa is about 828 m tall. The others are personal views." },
        { k:"mcq", q:"'It is quick, cheap and easy.' Which technique is this?", o:["Rule of three (triplet)","Hyperbole","Statistic","Onomatopoeia"], a:0, x:"Three adjectives grouped together form a triplet. Lists of three sound complete and memorable, which is why speakers and adverts use them." },
        { k:"mcq", q:"Which phrase is the most emotive?", o:["some trees were removed","the forest was cut down","the ancient forest was brutally destroyed","the trees are gone"], a:2, x:"'Ancient' and 'brutally destroyed' carry strong feelings of loss and anger. Emotive language is chosen to make the reader feel something." },
        { k:"mcq", q:"'9 out of 10 dentists recommend Sparkle toothpaste.' Why do adverts use this?", o:["To tell a story","To make the product seem trustworthy using numbers and expert opinion","To describe the taste","To be funny"], a:1, x:"Statistics and experts give an impression of proof and authority. A careful reader asks: how many dentists were asked, and who paid for the survey?" },
        { k:"mcq", q:"What is the PURPOSE of a persuasive speech?", o:["To entertain with a story","To give instructions","To convince the audience to agree or act","To describe a place"], a:2, x:"Persuasive texts aim to change what the audience thinks or does: to vote, buy, support or stop something." },
        { k:"tf", q:"True or false: Using 'we' and 'us' in a speech can make the audience feel included and on the speaker's side.", a:true, x:"Direct address and inclusive pronouns ('we', 'together', 'our school') build a sense of team, which makes agreeing feel natural." },
        { k:"mcq", q:"Which is the strongest opening line for a speech persuading students to recycle?", o:["Recycling is a thing.","I am going to talk about recycling.","Every minute, a truckload of plastic enters our oceans. What will you do about it?","Some people recycle and some don't."], a:2, x:"It hooks the audience with a striking fact and a rhetorical question, and it speaks directly to them ('you'). Avoid flat openings like 'I am going to talk about…'." }
      ]
    },
    {
      id: "reading", title: "Reading: inference and text structure", strand: "MYP 2 · Criterion A: Analysing",
      learn: {
        ideas: [
          "Inference means working out what is meant but not said directly, using clues in the text.",
          "Use PEE / PEEL paragraphs: Point, Evidence (a short quotation), Explain, Link back to the question.",
          "Narratives often follow: exposition → rising action → climax → falling action → resolution.",
          "First person uses 'I'; third person uses 'he', 'she', 'they'. The narrator's viewpoint affects what we know.",
          "Tone is the writer's attitude (angry, hopeful, humorous); mood is the feeling the reader gets."
        ],
        example: "Text: 'Jamal slammed the door and threw his bag across the room.'\nInference: Jamal is angry or upset.\nEvidence: 'slammed' and 'threw' are forceful verbs.\nExplain: these violent actions show strong emotion he cannot control."
      },
      tasks: [
        { k:"mcq", q:"'Layla stared at her shoes, cheeks burning, as the class laughed.' What can you infer?", o:["Layla is proud","Layla is embarrassed","Layla is bored","Layla is excited"], a:1, x:"Clues: staring at her shoes (avoiding eye contact), burning cheeks (blushing) and the class laughing all suggest embarrassment." },
        { k:"mcq", q:"In which part of a story does the most tense, turning-point moment happen?", o:["Exposition","Rising action","Climax","Resolution"], a:2, x:"The climax is the peak of tension, where the main conflict comes to a head. The resolution comes after and ties things up." },
        { k:"mcq", q:"'I never trusted the house on the hill.' Which narrative viewpoint is this?", o:["First person","Second person","Third person","No narrator"], a:0, x:"The narrator uses 'I', so it is first person. We only know what this narrator knows and feels." },
        { k:"mcq", q:"In a PEEL paragraph, what does the E for Evidence usually mean?", o:["An example from your life","A short quotation from the text","Your opinion","A summary of the whole story"], a:1, x:"Evidence should be a short, embedded quotation from the text that supports your point. Then you Explain it." },
        { k:"mcq", q:"'The empty playground creaked in the wind; a single swing moved back and forth.' What mood is created?", o:["Cheerful","Eerie and lonely","Busy and noisy","Funny"], a:1, x:"'Empty', 'creaked' and a swing moving on its own suggest absence and something slightly unsettling, so the mood is eerie and lonely." },
        { k:"mcq", q:"Why might a writer use a very short sentence like 'Silence.' in a story?", o:["They ran out of ideas","To create tension or impact and slow the pace","Short sentences are always wrong","To give lots of information"], a:1, x:"A one-word sentence stands out. It forces the reader to pause, creating drama, tension or emphasis." },
        { k:"tf", q:"True or false: The exposition is where the reader is introduced to the characters and setting.", a:true, x:"The exposition sets the scene: who, where and when, before the main problem begins in the rising action." },
        { k:"mcq", q:"'\"Lovely weather,\" muttered Dad, as rain poured through the tent.' What is Dad's tone?", o:["Sincere and happy","Sarcastic","Scared","Confused"], a:1, x:"He says the opposite of what he means: the weather is terrible. Saying the opposite to show annoyance is sarcasm. 'Muttered' adds to it." }
      ]
    }
  ]
};
