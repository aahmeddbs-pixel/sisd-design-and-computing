/* Study Plus · Islamic Education · question bank for new challenge sets (d: 1 Core, 2 Extended, 3 Challenge). */
(function(S){
  const P = (id, L) => { const t = S.islamic && S.islamic.topics.find(x => x.id === id); if (t) t.pool = (t.pool || []).concat(L); };
  P("pillars", [
    { d:1, k:"mcq", q:"What is the Shahadah?", o:["The declaration of faith","The fast of Ramadan","The pilgrimage","Charity"], a:0, x:"The Shahadah declares that there is no god but Allah and that Muhammad ﷺ is His Messenger. It is the first pillar." },
    { d:1, k:"mcq", q:"Which pillar of Islam is fasting in Ramadan?", o:["Sawm","Salah","Zakah","Hajj"], a:0, x:"Sawm = fasting. Salah = prayer. Zakah = obligatory charity. Hajj = pilgrimage." },
    { d:1, k:"num", q:"How many daily obligatory prayers are there?", a:5, x:"Fajr, Dhuhr, Asr, Maghrib and Isha." },
    { d:2, k:"mcq", q:"Which book was revealed to Prophet Isa (AS)?", o:["The Injeel","The Tawrah","The Zabur","The Quran"], a:0, x:"Tawrah to Musa, Zabur to Dawud, Injeel to Isa, Quran to Muhammad ﷺ." },
    { d:2, k:"mcq", q:"Belief in the Day of Judgement means believing that…", o:["All people will be raised and held accountable for their deeds","Life has no purpose","Only some actions matter","There is no life after death"], a:0, x:"Belief in the Last Day is one of the six pillars of Iman." },
    { d:2, k:"mcq", q:"In which city is Hajj performed?", o:["Makkah","Madinah","Jerusalem","Taif"], a:0, x:"Hajj takes place in and around Makkah in the month of Dhul Hijjah." },
    { d:2, k:"tf", q:"True or false: Zakah is only paid by Muslims whose wealth is above a minimum amount (nisab).", a:true, x:"Zakah is due on eligible wealth above the nisab, held for a full lunar year." },
    { d:3, k:"mcq", q:"In the hadith of Jibreel, what three levels of the religion are taught?", o:["Islam, Iman and Ihsan","Salah, Sawm and Hajj","Quran, Sunnah and Ijma","Tawheed, Risalah and Akhirah only"], a:0, x:"Islam (actions), Iman (beliefs) and Ihsan (worshipping Allah as if you see Him)." },
    { d:3, k:"mcq", q:"What is Risalah?", o:["Belief in Allah's messengers and prophets","Belief in angels","Fasting","The Day of Judgement"], a:0, x:"Risalah means prophethood: Allah sent messengers to guide people." },
    { d:3, k:"mcq", q:"How does belief in angels recording deeds affect a Muslim's behaviour?", o:["It encourages them to act well even when no one is watching","It makes actions unimportant","It means only public actions count","It replaces prayer"], a:0, x:"Knowing every deed is recorded encourages sincerity and good character at all times." }
  ]);
  P("seerah", [
    { d:1, k:"mcq", q:"What was the name of the Prophet's ﷺ mother?", o:["Aminah","Khadijah","Fatimah","Aishah"], a:0, x:"Aminah bint Wahb was his mother; she died when he was about six." },
    { d:1, k:"mcq", q:"In which cave did the first revelation come?", o:["Cave Hira","Cave Thawr","Cave Uhud","Cave Badr"], a:0, x:"The first verses of Surah Al-Alaq were revealed in Cave Hira on Jabal an-Nur." },
    { d:1, k:"mcq", q:"Who was the Prophet's ﷺ first wife?", o:["Khadijah (RA)","Aishah (RA)","Hafsah (RA)","Zaynab (RA)"], a:0, x:"Khadijah (RA) was also the first person to accept Islam." },
    { d:2, k:"mcq", q:"Which uncle protected the Prophet ﷺ in Makkah but did not become Muslim?", o:["Abu Talib","Abu Lahab","Hamzah","Al-Abbas"], a:0, x:"Abu Talib raised and protected him. His death and Khadijah's were the 'Year of Sorrow'." },
    { d:2, k:"mcq", q:"What was the first migration (hijrah) of Muslims, to escape persecution?", o:["To Abyssinia (Ethiopia)","To Madinah","To Taif","To Syria"], a:0, x:"A group of Muslims found protection with the just Christian king An-Najashi in Abyssinia." },
    { d:2, k:"mcq", q:"What happened at the Battle of Uhud?", o:["The Muslims suffered losses after archers left their positions","The Muslims won easily","Makkah was conquered","A treaty was signed"], a:0, x:"Uhud teaches the importance of obeying instructions; the archers left their post too early." },
    { d:2, k:"mcq", q:"What was the Battle of the Trench (Al-Khandaq)?", o:["A trench was dug to defend Madinah, on the advice of Salman al-Farisi","A battle at sea","The conquest of Makkah","A battle in Taif"], a:0, x:"The trench stopped the large army of the confederates from entering Madinah." },
    { d:3, k:"mcq", q:"How did the Prophet ﷺ treat the people of Makkah after its conquest in 8 AH?", o:["He forgave them","He punished all of them","He forced them to leave","He ignored them"], a:0, x:"He declared a general pardon, showing mercy to those who had opposed him." },
    { d:3, k:"mcq", q:"What was the Farewell Sermon (Khutbat al-Wada')?", o:["The Prophet's ﷺ speech during his last Hajj, teaching equality and rights","His first speech","A letter to kings","A speech at Badr"], a:0, x:"It taught that no Arab is better than a non-Arab except by piety, and stressed the rights of women and the sanctity of life and property." },
    { d:3, k:"mcq", q:"What was the brotherhood (mu'akhat) in Madinah?", o:["Pairing each Muhajir with an Ansari to share and support","A military unit","A trade deal with Makkah","A school"], a:0, x:"The Ansar shared homes and wealth with the Muhajirun, building a united community." }
  ]);
  P("quran", [
    { d:1, k:"mcq", q:"In which language was the Quran revealed?", o:["Arabic","Persian","Hebrew","Greek"], a:0, x:"The Quran was revealed in Arabic." },
    { d:1, k:"mcq", q:"What is a verse of the Quran called?", o:["Ayah","Surah","Juz'","Hadith"], a:0, x:"An ayah is a verse; a surah is a chapter." },
    { d:1, k:"mcq", q:"Which surah is recited in every rak'ah of prayer?", o:["Al-Fatihah","Al-Ikhlas","Al-Baqarah","Yasin"], a:0, x:"Al-Fatihah, 'The Opening', is recited in every rak'ah." },
    { d:2, k:"mcq", q:"What is a Madani surah?", o:["One revealed after the Hijrah","One revealed in Makkah","The shortest surah","A surah about Madinah only"], a:0, x:"Madani surahs often deal with laws and community life; Makki surahs focus more on belief." },
    { d:2, k:"mcq", q:"Who was the scribe Abu Bakr (RA) asked to collect the Quran?", o:["Zayd ibn Thabit (RA)","Bilal (RA)","Khalid ibn al-Walid (RA)","Salman (RA)"], a:0, x:"Zayd ibn Thabit, a scribe of revelation, led the collection into one volume." },
    { d:2, k:"mcq", q:"Which is the shortest surah of the Quran?", o:["Al-Kawthar","Al-Fatihah","Al-Ikhlas","An-Nas"], a:0, x:"Al-Kawthar has three short verses." },
    { d:2, k:"tf", q:"True or false: a person who has memorised the whole Quran is called a hafiz.", a:true, x:"Hafiz (or hafizah for a woman) = someone who has memorised the Quran." },
    { d:3, k:"mcq", q:"What is tafsir?", o:["Explanation and interpretation of the Quran","Recitation rules","A type of prayer","A collection of hadith"], a:0, x:"Tafsir explains meanings, context and lessons of verses." },
    { d:3, k:"mcq", q:"Ayat al-Kursi, the Verse of the Throne, is in which surah?", o:["Al-Baqarah","Al-Ikhlas","Yasin","Al-Mulk"], a:0, x:"Ayat al-Kursi is verse 255 of Surah Al-Baqarah." },
    { d:3, k:"mcq", q:"The Quran was revealed gradually over about 23 years. What is one wisdom of this?", o:["It responded to events and helped believers learn and apply it step by step","It was too long to send at once","It was forgotten","It was written in advance"], a:0, x:"Gradual revelation strengthened the believers and linked guidance to real situations." }
  ]);
  P("akhlaq", [
    { d:1, k:"mcq", q:"What does 'sabr' mean?", o:["Patience","Charity","Prayer","Honesty"], a:0, x:"Sabr is patience and perseverance, especially in difficulty." },
    { d:1, k:"mcq", q:"What should a Muslim say after sneezing?", o:["Alhamdulillah","Bismillah","Insha'Allah","Subhanallah"], a:0, x:"After sneezing, say 'Alhamdulillah'; the listener replies 'Yarhamuk Allah'." },
    { d:1, k:"mcq", q:"What does 'sadaqah' mean?", o:["Voluntary charity","Obligatory fasting","Pilgrimage","Prayer"], a:0, x:"Sadaqah is voluntary charity, beyond the obligatory Zakah." },
    { d:2, k:"mcq", q:"Which is an example of good manners when visiting someone's home?", o:["Ask permission and greet with salam","Walk straight in","Look through windows","Stay without asking"], a:0, x:"Islam teaches seeking permission (isti'dhan) and greeting before entering." },
    { d:2, k:"mcq", q:"What is 'haya'?", o:["Modesty and a sense of shame from wrongdoing","Anger","Pride","Laziness"], a:0, x:"The Prophet ﷺ taught that haya is a branch of faith." },
    { d:2, k:"mcq", q:"What is 'tawadu'?", o:["Humility","Boasting","Wealth","Strength"], a:0, x:"Tawadu is humility: not thinking you are better than others." },
    { d:2, k:"tf", q:"True or false: lying is acceptable if it is a small joke that hurts no one.", a:false, x:"The Prophet ﷺ warned against lying even to make people laugh." },
    { d:3, k:"mcq", q:"How should a Muslim respond to someone who is rude to them?", o:["Respond with patience and good words","Be rude back","Spread rumours","Ignore all people"], a:0, x:"The Quran teaches to repel evil with what is better (Surah Fussilat 41:34)." },
    { d:3, k:"mcq", q:"What is the meaning of 'Ihsan' in daily life?", o:["Doing everything with excellence and sincerity","Doing the minimum","Being famous","Only praying"], a:0, x:"Ihsan means excellence: worshipping Allah as if you see Him, and doing every task well." },
    { d:3, k:"mcq", q:"Why does Islam forbid backbiting (gheebah)?", o:["It harms people's honour and breaks trust in the community","It is too quiet","It wastes paper","It is only forbidden in Ramadan"], a:0, x:"The Quran compares backbiting to eating the flesh of a dead brother (Al-Hujurat 49:12)." }
  ]);
  P("fiqh", [
    { d:1, k:"num", q:"How many rak'ahs are in the Fajr prayer?", a:2, x:"Fajr has 2 obligatory rak'ahs." },
    { d:1, k:"mcq", q:"What is wudu?", o:["Ritual washing before prayer","A type of fast","A charity","The call to prayer"], a:0, x:"Wudu washes the hands, mouth, nose, face, arms, head, ears and feet in order." },
    { d:1, k:"mcq", q:"What is the adhan?", o:["The call to prayer","The first chapter of the Quran","The end of prayer","A greeting"], a:0, x:"The adhan is called by the mu'adhin to announce the time of each prayer." },
    { d:2, k:"num", q:"How many rak'ahs are in the Isha prayer?", a:4, x:"Isha has 4 obligatory rak'ahs. Dhuhr and Asr also have 4; Maghrib has 3; Fajr has 2." },
    { d:2, k:"mcq", q:"What is suhoor?", o:["The meal before dawn during fasting","The meal at sunset","A night prayer","A charity"], a:0, x:"Suhoor is eaten before Fajr; iftar breaks the fast at Maghrib." },
    { d:2, k:"mcq", q:"What is tayammum?", o:["Dry purification with clean earth when water is not available","A type of prayer","A fast","The call to prayer"], a:0, x:"Tayammum replaces wudu when water can't be found or used." },
    { d:2, k:"mcq", q:"Which prayer can be combined with Asr when travelling?", o:["Dhuhr","Fajr","Maghrib","Isha"], a:0, x:"Travellers may combine Dhuhr with Asr, and Maghrib with Isha." },
    { d:3, k:"num", q:"Zakah is 2.5%. How much zakah is due on 40 000 AED of eligible savings held for a full year, in AED?", a:1000, x:"2.5% of 40 000 = 40 000 × 0.025 = 1 000 AED." },
    { d:3, k:"mcq", q:"Who is excused from fasting in Ramadan?", o:["People who are ill or travelling (they make up the days later)","Anyone who is busy","People who are hungry","Everyone on weekends"], a:0, x:"The Quran (Al-Baqarah 2:184) allows the sick and travellers to make up missed fasts later." },
    { d:3, k:"mcq", q:"What is the sujud as-sahw?", o:["Two prostrations of forgetfulness to correct a mistake in prayer","An extra night prayer","The Eid prayer","A prayer for rain"], a:0, x:"If you forget part of the prayer, you perform two sajdahs of forgetfulness." }
  ]);
  P("prophets", [
    { d:1, k:"mcq", q:"Which prophet was given the Zabur?", o:["Dawud (AS)","Musa (AS)","Isa (AS)","Nuh (AS)"], a:0, x:"The Zabur (Psalms) was revealed to Prophet Dawud (AS)." },
    { d:1, k:"mcq", q:"Which prophet could understand the speech of animals and birds?", o:["Sulayman (AS)","Yunus (AS)","Hud (AS)","Adam (AS)"], a:0, x:"Prophet Sulayman (AS) understood the ant and the hoopoe." },
    { d:1, k:"mcq", q:"Who was the father of Prophet Ismail (AS)?", o:["Ibrahim (AS)","Ishaq (AS)","Yaqub (AS)","Nuh (AS)"], a:0, x:"Ibrahim (AS) was the father of both Ismail and Ishaq (AS)." },
    { d:2, k:"mcq", q:"Which prophet was thrown into a well by his brothers?", o:["Yusuf (AS)","Musa (AS)","Yunus (AS)","Ayyub (AS)"], a:0, x:"Yusuf (AS) was later raised to a high position in Egypt and forgave his brothers." },
    { d:2, k:"mcq", q:"Which prophet split the sea by Allah's permission?", o:["Musa (AS)","Isa (AS)","Ibrahim (AS)","Nuh (AS)"], a:0, x:"Musa (AS) struck the sea with his staff, and the Children of Israel crossed safely." },
    { d:2, k:"mcq", q:"Which prophet was sent to the people of 'Ad?", o:["Hud (AS)","Salih (AS)","Shu'ayb (AS)","Lut (AS)"], a:0, x:"Hud (AS) was sent to 'Ad; Salih (AS) to Thamud, with the she-camel as a sign." },
    { d:2, k:"mcq", q:"Who was the mother of Prophet Isa (AS)?", o:["Maryam (AS)","Asiyah","Hajar","Sarah"], a:0, x:"Maryam (AS) has a whole surah named after her." },
    { d:3, k:"mcq", q:"What lesson does the story of Yunus (AS) in the whale teach?", o:["Turning to Allah in repentance, never giving up hope","Never travel by sea","Fish are dangerous","Only prophets pray"], a:0, x:"His du'a 'La ilaha illa anta, subhanaka, inni kuntu min adh-dhalimin' shows sincere repentance." },
    { d:3, k:"mcq", q:"What is the main message shared by all prophets?", o:["Worship Allah alone (Tawheed)","Build cities","Gain wealth","Fight wars"], a:0, x:"Every prophet called people to the Oneness of Allah." },
    { d:3, k:"mcq", q:"Which prophet is known as Khalilullah (the close friend of Allah)?", o:["Ibrahim (AS)","Musa (AS)","Isa (AS)","Adam (AS)"], a:0, x:"Ibrahim (AS) is called Khalilullah. Musa (AS) is called Kalimullah (the one Allah spoke to)." }
  ]);
  P("caliphs", [
    { d:1, k:"mcq", q:"Which caliph was known as Al-Farooq (the one who distinguishes truth from falsehood)?", o:["Umar (RA)","Abu Bakr (RA)","Uthman (RA)","Ali (RA)"], a:0, x:"Umar ibn al-Khattab (RA) was given the title Al-Farooq." },
    { d:1, k:"mcq", q:"Which caliph was known as Dhun-Nurayn (possessor of two lights)?", o:["Uthman (RA)","Ali (RA)","Umar (RA)","Abu Bakr (RA)"], a:0, x:"Uthman (RA) married two daughters of the Prophet ﷺ, one after the other." },
    { d:1, k:"mcq", q:"Who was the fourth caliph?", o:["Ali (RA)","Uthman (RA)","Umar (RA)","Abu Bakr (RA)"], a:0, x:"The order is Abu Bakr, Umar, Uthman, Ali (RA)." },
    { d:2, k:"mcq", q:"What were the Ridda wars under Abu Bakr (RA)?", o:["Campaigns against tribes that refused zakah or left Islam after the Prophet's ﷺ death","Battles against Rome only","The conquest of Spain","Wars in India"], a:0, x:"Abu Bakr (RA) kept the Muslim community united after the Prophet's ﷺ death." },
    { d:2, k:"mcq", q:"Which city was captured peacefully under Umar (RA), who travelled there to receive its keys?", o:["Jerusalem","Baghdad","Cairo","Damascus"], a:0, x:"Umar (RA) received Jerusalem in 637 CE and guaranteed the safety of its people." },
    { d:2, k:"mcq", q:"Which city did Ali (RA) make his capital?", o:["Kufa","Madinah","Makkah","Damascus"], a:0, x:"Ali (RA) moved the capital to Kufa in Iraq." },
    { d:2, k:"tf", q:"True or false: Umar (RA) was known for walking the streets at night to check on people's needs.", a:true, x:"His concern for justice and the poor is famous." },
    { d:3, k:"mcq", q:"Why is the Hijri calendar counted from the Hijrah, as Umar (RA) decided?", o:["It marked the start of the first Muslim community and state in Madinah","It was the Prophet's ﷺ birth","It was the first revelation","It was the conquest of Makkah"], a:0, x:"The Hijrah (622 CE) was a turning point for the Muslim community." },
    { d:3, k:"mcq", q:"Which caliph is especially known for his generosity, such as buying the well of Rumah for the Muslims?", o:["Uthman (RA)","Ali (RA)","Abu Bakr (RA)","Umar (RA)"], a:0, x:"Uthman (RA) bought the well and gave its water freely to everyone." },
    { d:3, k:"mcq", q:"What made the four caliphs 'Rightly Guided' (Rashidun)?", o:["They followed the Quran and Sunnah closely and ruled with justice and consultation (shura)","They were all kings by birth","They conquered the most land","They lived the longest"], a:0, x:"They were close companions who led by the Prophet's ﷺ example." }
  ]);
})(window.STUDY = window.STUDY || {});
