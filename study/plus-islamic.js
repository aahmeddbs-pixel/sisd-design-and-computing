/* Study Plus · Islamic Education · harder tasks for every topic, plus two new Grade 7 topics (d: 1 Core, 2 Extended, 3 Challenge) */
(function(S){
  const I = S.islamic, T = id => I.topics.find(t => t.id === id);
  T("pillars").tasks.push(
    { d:2, k:"mcq", q:"Which book was revealed to Prophet Musa (AS)?", o:["Injil","Tawrat","Zabur","Quran"], a:1, x:"The Tawrat (Torah) was revealed to Musa (AS), the Zabur (Psalms) to Dawud (AS), the Injil (Gospel) to Isa (AS) and the Quran to Muhammad ﷺ." },
    { d:3, k:"mcq", q:"The Zabur was revealed to…", o:["Prophet Dawud (AS)","Prophet Isa (AS)","Prophet Musa (AS)","Prophet Ibrahim (AS)"], a:0, x:"The Zabur was given to Prophet Dawud (AS)." },
    { d:3, k:"mcq", q:"Which of these is NOT one of the six pillars of Iman?", o:["Belief in the angels","Belief in the revealed books","Performing Hajj","Belief in the Last Day"], a:2, x:"Hajj is a pillar of Islam (an action). The pillars of Iman are beliefs: Allah, angels, books, messengers, the Last Day and Qadar." },
    { d:3, k:"mcq", q:"In the famous hadith of Jibreel, what is Ihsan?", o:["To worship Allah as if you see Him; and if you do not see Him, He sees you","To give charity","To fast in Ramadan","To travel for knowledge"], a:0, x:"The hadith of Jibreel (Muslim) explains Islam, Iman and Ihsan. Ihsan is the highest level: worship with full awareness of Allah." }
  );
  T("seerah").tasks.push(
    { d:2, k:"mcq", q:"Who accompanied the Prophet ﷺ on the Hijrah to Madinah?", o:["Abu Bakr (RA)","Umar (RA)","Ali (RA)","Bilal (RA)"], a:0, x:"Abu Bakr (RA) travelled with him, and they hid in the Cave of Thawr. Ali (RA) stayed behind in the Prophet's bed and returned people's trusts." },
    { d:3, k:"mcq", q:"During the Isra and Mi'raj, which act of worship was made obligatory?", o:["The five daily prayers","Hajj","Zakah","Fasting in Ramadan"], a:0, x:"The five daily prayers were made obligatory during the Mi'raj, the Prophet's ascension through the heavens." },
    { d:3, k:"mcq", q:"Which was the first major battle between the Muslims and the Quraysh, in 2 AH?", o:["Badr","Uhud","Al-Khandaq (the Trench)","Hunayn"], a:0, x:"At Badr, about 313 Muslims faced a much larger Makkan army and were victorious." },
    { d:3, k:"mcq", q:"What was the Treaty of Al-Hudaybiyyah (6 AH)?", o:["A peace treaty between the Muslims and the Quraysh","A battle in Madinah","The building of a masjid","The first revelation"], a:0, x:"Though its terms seemed hard, the peace allowed Islam to spread quickly; the Quran calls it a clear victory (Surah Al-Fath)." }
  );
  T("quran").tasks.push(
    { d:2, k:"num", q:"Into how many juz' (parts) is the Quran divided?", a:30, x:"There are 30 juz', which helps people read the whole Quran in a month, for example during Ramadan." },
    { d:2, k:"mcq", q:"On which night was the Quran first revealed?", o:["Laylat al-Qadr","The night of Eid","The night of Ashura","The night of the Hijrah"], a:0, x:"Surah Al-Qadr says the Quran was sent down on Laylat al-Qadr, which is better than a thousand months." },
    { d:3, k:"mcq", q:"Which surah does NOT begin with Bismillah?", o:["At-Tawbah","Al-Fatihah","Al-Ikhlas","Al-Mulk"], a:0, x:"Surah At-Tawbah (9) is the only surah without Bismillah at its start." },
    { d:3, k:"mcq", q:"According to hadith (Bukhari), which surah is equal to a third of the Quran?", o:["Al-Ikhlas","Al-Baqarah","Al-Kahf","Ya-Sin"], a:0, x:"Surah Al-Ikhlas, about the Oneness of Allah, is described as equal to a third of the Quran." }
  );
  T("akhlaq").tasks.push(
    { d:2, k:"mcq", q:"What does 'amanah' mean?", o:["Trust: looking after what has been given to you","Fasting","Pilgrimage","Prayer"], a:0, x:"Amanah is trustworthiness: keeping secrets, returning what you borrow and doing your duties properly." },
    { d:3, k:"mcq", q:"In Surah Al-Isra, Muslims are taught not even to say ___ to their parents.", o:["'Uff' (a word of annoyance)","'Salam'","'Thank you'","'Bismillah'"], a:0, x:"Surah Al-Isra (17:23) forbids even a small word of irritation to parents and commands speaking to them kindly and respectfully." },
    { d:3, k:"mcq", q:"Which is an example of israf (wastefulness)?", o:["Leaving the tap running while making wudu","Sharing food","Turning off unused lights","Giving old clothes away"], a:0, x:"Islam forbids waste, even of water during wudu. Using only what you need is part of good character." },
    { d:3, k:"mcq", q:"The Prophet ﷺ taught that smiling at your brother is…", o:["A charity (sadaqah)","A waste of time","Only for Eid","Disrespectful"], a:0, x:"In a hadith (Tirmidhi), smiling in your brother's face is counted as charity: small kind acts are rewarded." }
  );
  T("fiqh").tasks.push(
    { d:2, k:"num", q:"How many rak'ahs are in the Jumu'ah (Friday) prayer?", a:2, x:"Jumu'ah is 2 rak'ahs, prayed in congregation after the khutbah, in place of Dhuhr." },
    { d:3, k:"mcq", q:"When travelling, which prayer can be shortened (qasr) from 4 to 2 rak'ahs?", o:["Maghrib","Fajr","Dhuhr","None of them"], a:2, x:"The 4-rak'ah prayers (Dhuhr, Asr and Isha) can be shortened to 2 when travelling. Fajr and Maghrib stay the same." },
    { d:3, k:"mcq", q:"When must Zakat al-Fitr be paid?", o:["Before the Eid al-Fitr prayer","On Eid al-Adha","Any time in the year","Only during Hajj"], a:0, x:"Zakat al-Fitr is a small charity given at the end of Ramadan, before the Eid prayer, so the poor can also celebrate." },
    { d:3, k:"num", q:"Zakah is 2.5%. Someone has 24 000 AED of eligible savings held for a full lunar year. How much zakah is due, in AED?", a:600, x:"2.5% of 24 000 = 0.025 × 24 000 = 600 AED." }
  );
  I.topics.push(
    { id:"prophets", title:"Stories of the prophets", strand:"Grade 7 · Seerah and Quranic stories",
      learn:{ ideas:[
        "25 prophets are mentioned by name in the Quran. Adam (AS) was the first and Muhammad ﷺ is the last, the Seal of the Prophets.",
        "Nuh (AS) built the ark to save the believers from the flood.",
        "Ibrahim (AS) and his son Isma'il (AS) raised the foundations of the Ka'bah in Makkah.",
        "Musa (AS) was sent to Pharaoh; Allah parted the sea to save the Children of Israel. Isa (AS) was born to Maryam without a father.",
        "Yusuf (AS) could interpret dreams and became a trusted minister in Egypt. Yunus (AS) was swallowed by a great fish and prayed for forgiveness."],
        example:"What lesson does the story of Yusuf (AS) teach?\nPatience (sabr) and forgiveness: after years of hardship he forgave the brothers who had wronged him." },
      tasks:[
        { d:1, k:"mcq", q:"Who was the first prophet?", o:["Adam (AS)","Nuh (AS)","Ibrahim (AS)","Musa (AS)"], a:0, x:"Adam (AS) was the first human and the first prophet." },
        { d:1, k:"mcq", q:"Which prophet built the ark?", o:["Nuh (AS)","Yunus (AS)","Musa (AS)","Isa (AS)"], a:0, x:"Allah commanded Nuh (AS) to build the ark to save the believers and the animals from the flood." },
        { d:1, k:"mcq", q:"Who raised the foundations of the Ka'bah?", o:["Ibrahim (AS) and Isma'il (AS)","Musa (AS) and Harun (AS)","Dawud (AS) and Sulayman (AS)","Adam (AS) alone"], a:0, x:"The Quran (Surah Al-Baqarah 2:127) describes Ibrahim and Isma'il raising the foundations of the House." },
        { d:2, k:"num", q:"How many prophets are mentioned by name in the Quran?", a:25, x:"25 prophets are named in the Quran, though Allah sent many more." },
        { d:2, k:"mcq", q:"Which prophet was swallowed by a great fish?", o:["Yunus (AS)","Yusuf (AS)","Ayyub (AS)","Salih (AS)"], a:0, x:"Yunus (AS) prayed from inside the fish: 'There is no god but You, glory be to You, I have been among the wrongdoers', and Allah saved him." },
        { d:2, k:"mcq", q:"Which prophet interpreted the king's dream about seven fat and seven thin cows?", o:["Yusuf (AS)","Musa (AS)","Ibrahim (AS)","Isa (AS)"], a:0, x:"Yusuf (AS) explained it as seven years of good harvests followed by seven years of famine, and Egypt prepared by storing grain." },
        { d:2, k:"mcq", q:"Which prophet is known for great patience during long illness and loss?", o:["Ayyub (AS)","Hud (AS)","Lut (AS)","Shu'ayb (AS)"], a:0, x:"Ayyub (AS) lost his health, wealth and family but stayed patient and grateful, and Allah restored what he had lost." },
        { d:3, k:"mcq", q:"Prophet Musa (AS) was sent with his brother as a helper. Who was his brother?", o:["Harun (AS)","Isma'il (AS)","Ishaq (AS)","Zakariyya (AS)"], a:0, x:"Musa (AS) asked Allah to make his brother Harun (AS) his helper because Harun spoke more clearly." },
        { d:3, k:"mcq", q:"What does 'Khatam an-Nabiyyin' mean?", o:["The Seal (last) of the Prophets","The first prophet","A type of prayer","A book"], a:0, x:"The Quran (Surah Al-Ahzab 33:40) calls Muhammad ﷺ the Seal of the Prophets: no prophet comes after him." },
        { d:3, k:"mcq", q:"What is the main lesson from Ibrahim (AS) breaking the idols?", o:["Worship Allah alone and use reason against idol worship","Statues are beautiful","Never talk to your people","Leave your home"], a:0, x:"He used his people's own logic (the idols could not even defend themselves) to show only Allah deserves worship." }
      ] },
    { id:"caliphs", title:"The Rightly Guided Caliphs", strand:"Grade 7 · Islamic history",
      learn:{ ideas:[
        "After the Prophet ﷺ died in 632 CE, four caliphs led the Muslims: Abu Bakr, Umar, Uthman and Ali (RA). They are called Al-Khulafa' Ar-Rashidun.",
        "Abu Bakr As-Siddiq (632–634): kept the community united and had the Quran collected into one volume.",
        "Umar Al-Farooq (634–644): the state expanded greatly; he started the Hijri calendar and set up offices (diwan) to organise government.",
        "Uthman Dhun-Nurayn (644–656): had standard copies of the Quran sent to the major cities.",
        "Ali ibn Abi Talib (656–661): the Prophet's cousin and son-in-law, famous for his knowledge and bravery."],
        example:"Why is Uthman (RA) called Dhun-Nurayn ('possessor of two lights')?\nHe married two of the Prophet's daughters, Ruqayyah and then Umm Kulthum (RA)." },
      tasks:[
        { d:1, k:"mcq", q:"Who was the first caliph?", o:["Abu Bakr (RA)","Umar (RA)","Uthman (RA)","Ali (RA)"], a:0, x:"Abu Bakr As-Siddiq (RA) was chosen as the first caliph in 632 CE." },
        { d:1, k:"num", q:"How many Rightly Guided Caliphs were there?", a:4, x:"Abu Bakr, Umar, Uthman and Ali (RA)." },
        { d:1, k:"mcq", q:"Which caliph was the cousin and son-in-law of the Prophet ﷺ?", o:["Ali (RA)","Umar (RA)","Abu Bakr (RA)","Uthman (RA)"], a:0, x:"Ali ibn Abi Talib (RA) was the Prophet's cousin and married his daughter Fatimah (RA)." },
        { d:2, k:"mcq", q:"Which caliph started the Hijri calendar?", o:["Umar (RA)","Abu Bakr (RA)","Ali (RA)","Uthman (RA)"], a:0, x:"Umar (RA) introduced the Hijri calendar, counting from the year of the Hijrah." },
        { d:2, k:"mcq", q:"Which title belongs to Abu Bakr (RA)?", o:["As-Siddiq (the truthful)","Al-Farooq","Dhun-Nurayn","Asadullah"], a:0, x:"He immediately believed the Prophet's account of the Isra and Mi'raj, earning the title As-Siddiq." },
        { d:2, k:"mcq", q:"Who was the second caliph?", o:["Umar ibn Al-Khattab (RA)","Uthman ibn Affan (RA)","Ali ibn Abi Talib (RA)","Khalid ibn Al-Walid (RA)"], a:0, x:"Umar (RA) ruled from 634 to 644 CE and was known as Al-Farooq, the one who distinguishes right from wrong." },
        { d:2, k:"mcq", q:"Under which caliph was the Quran first collected into one volume?", o:["Abu Bakr (RA)","Umar (RA)","Uthman (RA)","Ali (RA)"], a:0, x:"After many memorisers were killed in battle, Abu Bakr (RA) had Zayd ibn Thabit (RA) collect the Quran into one volume." },
        { d:3, k:"mcq", q:"What was the diwan set up by Umar (RA)?", o:["A government office keeping records, such as payments to soldiers and citizens","A type of masjid","A palace","A school for children only"], a:0, x:"The diwan organised the growing state's finances and records: an early example of public administration." },
        { d:3, k:"mcq", q:"Why did Uthman (RA) send standard copies of the Quran to the cities?", o:["To keep everyone reciting the same text as the Muslim world grew","To translate it","To shorten it","To sell it"], a:0, x:"As Islam spread, differences in recitation appeared, so he unified the text and sent official copies to major centres." },
        { d:3, k:"mcq", q:"Put these caliphs in order: Uthman, Abu Bakr, Ali, Umar.", o:["Abu Bakr, Umar, Uthman, Ali","Umar, Abu Bakr, Ali, Uthman","Abu Bakr, Uthman, Umar, Ali","Ali, Umar, Uthman, Abu Bakr"], a:0, x:"Abu Bakr (632), Umar (634), Uthman (644), Ali (656)." }
      ] }
  );
})(window.STUDY);
