/* Study Plus · Individuals and Societies · harder tasks for every topic, plus two new MYP 2 topics (d: 1 Core, 2 Extended, 3 Challenge) */
(function(S){
  const I = S.ins, T = id => I.topics.find(t => t.id === id);
  T("maps").tasks.push(
    { d:3, k:"num", q:"On a 1 : 25 000 map, a path is 12 cm long. How long is it in real life, in km?", a:3, x:"12 × 25 000 = 300 000 cm = 3 000 m = 3 km." },
    { d:3, k:"mcq", q:"A four-figure grid reference gives…", o:["The exact point","The whole grid square: eastings first, then northings","Only the height","The scale"], a:1, x:"Read along the corridor (eastings) then up the stairs (northings). Six figures pinpoint a spot inside the square." },
    { d:2, k:"mcq", q:"You walk from a school heading south-west. Which direction must you face to walk straight back?", o:["North-east","South-east","North-west","South"], a:0, x:"To go back you face the opposite direction: SW ↔ NE." },
    { d:3, k:"num", q:"The Earth rotates 360° in 24 hours. How many degrees of longitude make one hour of time difference?", a:15, x:"360 ÷ 24 = 15°. So a place 60° east is about 4 hours ahead." }
  );
  T("climate").tasks.push(
    { d:3, k:"mcq", q:"What is the main cause of the greenhouse effect getting stronger?", o:["More volcanoes","Extra greenhouse gases like CO₂ from burning fossil fuels trapping more heat","The Sun moving closer","Fewer clouds"], a:1, x:"Burning coal, oil and gas adds CO₂, which traps more outgoing heat, raising global temperatures." },
    { d:3, k:"mcq", q:"Why do coastal places like Dubai feel very humid in summer?", o:["They are high up","Warm sea water evaporates, adding water vapour to the air","There is no wind","It rains every day"], a:1, x:"High temperatures near the warm Gulf mean lots of evaporation, so the air holds a lot of moisture." },
    { d:2, k:"mcq", q:"Which is a likely effect of climate change on the UAE?", o:["Colder winters with snow","Hotter temperatures and rising sea levels on the coast","Rainforests growing","No change"], a:1, x:"Rising temperatures increase heat stress and water demand, and sea-level rise threatens low-lying coastal areas." },
    { d:3, k:"num", q:"A city's temperature falls 6.5 °C for every 1 000 m of height. It is 32 °C at sea level. What is it at 2 000 m?", a:19, x:"2 000 m is 2 × 6.5 = 13 °C cooler: 32 − 13 = 19 °C." }
  );
  T("civilisations").tasks.push(
    { d:3, k:"mcq", q:"Why was the Code of Hammurabi important?", o:["It was the first map","It was one of the earliest written sets of laws, with fixed punishments","It described pyramids","It was a religious song"], a:1, x:"Babylonian King Hammurabi (about 1750 BCE) had laws carved in stone so everyone could know the rules." },
    { d:3, k:"mcq", q:"What does 'surplus' food allow a civilisation to do?", o:["Stop farming","Support people with other jobs, like craftworkers, priests and traders","Move every year","Avoid trade"], a:1, x:"When farmers grow more than they need, others can specialise. Specialisation helped cities, writing and trade develop." },
    { d:2, k:"mcq", q:"Which was a major achievement of the Indus Valley cities?", o:["Pyramids","Planned streets with drains and sewers","Cuneiform","The Great Wall"], a:1, x:"Cities like Mohenjo-daro had grid streets and covered drains: impressive urban planning for around 2500 BCE." },
    { d:3, k:"mcq", q:"How reliable is a pharaoh's carving boasting about a victory as a historical source?", o:["Completely reliable","Useful, but may be biased because it was made to glorify the pharaoh","Useless","Secondary"], a:1, x:"Consider purpose and author: propaganda can exaggerate. Historians cross-check with other sources." }
  );
  T("trade").tasks.push(
    { d:3, k:"mcq", q:"What is a trade deficit?", o:["Exporting more than you import","Importing more than you export","No trade at all","Trading only with neighbours"], a:1, x:"If a country spends more on imports than it earns from exports, it has a trade deficit." },
    { d:3, k:"mcq", q:"Why has Dubai become a major re-export hub?", o:["It has no port","Its location between Asia, Europe and Africa plus big ports, airports and free zones","It grows most of its own food","It has no trade"], a:1, x:"Goods arrive at Jebel Ali and Dubai airport, then are sent on. Location and infrastructure make this efficient." },
    { d:2, k:"mcq", q:"What is a tariff?", o:["A tax on imported goods","A type of ship","A trade route","A currency"], a:0, x:"A tariff makes imported goods more expensive, protecting local producers but raising prices for consumers." },
    { d:3, k:"mcq", q:"Which statement best explains globalisation?", o:["Countries becoming more isolated","Countries becoming more connected through trade, travel, technology and culture","Only online shopping","A single world government"], a:1, x:"Globalisation is growing interconnection: a phone may be designed in one country, made in another and sold everywhere." }
  );
  T("population").tasks.push(
    { d:3, k:"mcq", q:"A population pyramid with a wide base and narrow top shows…", o:["An ageing population","High birth rates and many young people","Few children","Zero population growth"], a:1, x:"A wide base means many children (high birth rate); a narrow top means fewer elderly (lower life expectancy)." },
    { d:3, k:"num", q:"A town grows from 50 000 to 60 000 people. What is the percentage increase?", a:20, x:"Increase = 10 000. 10 000 ÷ 50 000 × 100 = 20%." },
    { d:2, k:"mcq", q:"What is life expectancy?", o:["The number of births","The average number of years a person is expected to live","The age you start school","The death rate"], a:1, x:"Life expectancy rises with better healthcare, nutrition and clean water." },
    { d:3, k:"mcq", q:"Why does the UAE have many more men than women in its population?", o:["More boys are born","Large numbers of male migrant workers came for construction and other jobs","Women emigrate","It is a census error"], a:1, x:"Labour migration, especially for construction, brought many male workers, which shapes the UAE's population pyramid." }
  );
  I.topics.push(
    { id:"uae", title:"The UAE: geography and heritage", strand:"MYP 2 · Geography and History",
      learn:{ ideas:[
        "The UAE was formed on 2 December 1971 (National Day). Ras Al Khaimah joined in February 1972, making seven emirates.",
        "The seven emirates: Abu Dhabi (the capital), Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah.",
        "Sheikh Zayed bin Sultan Al Nahyan was the founding President.",
        "Before oil, the economy relied on pearl diving, fishing, date farming and trade. Oil exports began in the 1960s.",
        "Landscapes include desert dunes, the Hajar Mountains, coastal mangroves and the Gulf of Oman coast (Fujairah)."],
        example:"Why did pearl diving decline in the 1930s?\nCheap cultured pearls from Japan and the Great Depression made natural pearls far less valuable." },
      tasks:[
        { d:1, k:"num", q:"How many emirates make up the UAE?", a:7, x:"Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah." },
        { d:1, k:"mcq", q:"What is the capital of the UAE?", o:["Dubai","Sharjah","Abu Dhabi","Al Ain"], a:2, x:"Abu Dhabi is the capital and the largest emirate by area." },
        { d:1, k:"num", q:"In which year was the UAE formed?", a:1971, x:"The UAE was formed on 2 December 1971, celebrated each year as National Day." },
        { d:2, k:"mcq", q:"Who was the founding President of the UAE?", o:["Sheikh Zayed bin Sultan Al Nahyan","Sheikh Rashid bin Saeed Al Maktoum","Sheikh Khalifa","Sheikh Saqr"], a:0, x:"Sheikh Zayed led the union and was its first President. Sheikh Rashid of Dubai became the first Vice President." },
        { d:2, k:"mcq", q:"Which emirate is on the Gulf of Oman coast rather than the Arabian Gulf?", o:["Ajman","Fujairah","Umm Al Quwain","Dubai"], a:1, x:"Fujairah lies on the east coast, facing the Gulf of Oman, beside the Hajar Mountains." },
        { d:2, k:"mcq", q:"Which industry was most important along the coast before oil?", o:["Car making","Pearl diving","Tourism","Banking"], a:1, x:"Pearling was the main coastal industry for centuries, alongside fishing and trade." },
        { d:2, k:"mcq", q:"Why are mangroves important on the UAE coast?", o:["They produce oil","They protect coasts, store carbon and provide habitats for fish and birds","They are a type of desert","They make sand"], a:1, x:"Mangroves reduce erosion, absorb carbon and act as nurseries for marine life." },
        { d:3, k:"mcq", q:"Which emirate joined the union last, in February 1972?", o:["Fujairah","Ras Al Khaimah","Sharjah","Ajman"], a:1, x:"Ras Al Khaimah joined on 10 February 1972, completing the seven emirates." },
        { d:3, k:"mcq", q:"Why did the UAE invest in diversifying its economy away from oil?", o:["Oil is unlimited","Oil will run out and prices change, so tourism, trade, finance and technology give long-term stability","Oil is illegal","Other countries asked it to"], a:1, x:"Diversification reduces dependence on one resource. Dubai especially grew through trade, aviation, tourism and finance." },
        { d:3, k:"mcq", q:"How did traditional houses with barjeel (wind towers) stay cool?", o:["Air conditioning","The towers caught breezes and pushed cooler air down into rooms","They were underground","They were painted black"], a:1, x:"Wind towers are an early sustainable design: they channel moving air into the house and let hot air escape. You can see them in Al Fahidi, Dubai." }
      ] },
    { id:"economics", title:"Needs, wants and money", strand:"MYP 2 · Economics",
      learn:{ ideas:[
        "Needs are things required to survive (food, water, shelter). Wants are things we would like but can live without.",
        "Scarcity: resources are limited but wants are unlimited, so we must make choices.",
        "Opportunity cost is the next best thing you give up when you make a choice.",
        "A budget compares income and spending. Saving means keeping money for the future.",
        "Goods are physical products; services are actions done for you (a haircut, a lesson)."],
        example:"You have 50 AED and choose a cinema ticket instead of a book.\nThe opportunity cost is the book." },
      tasks:[
        { d:1, k:"mcq", q:"Which is a need, not a want?", o:["A new phone","Clean water","Video games","Designer trainers"], a:1, x:"You cannot survive without clean water; the others are wants." },
        { d:1, k:"mcq", q:"Which is a service?", o:["A sandwich","A bus ride","A pencil","A football"], a:1, x:"A bus ride is something done for you, not an object you keep, so it is a service." },
        { d:1, k:"mcq", q:"What does 'scarcity' mean in economics?", o:["Having too much","Limited resources compared with unlimited wants","Prices falling","Free goods"], a:1, x:"Because resources are scarce, people, businesses and governments must choose how to use them." },
        { d:2, k:"mcq", q:"You spend Saturday revising instead of going to a friend's party. What is the opportunity cost?", o:["The revision","Going to the party","Nothing","Your homework"], a:1, x:"Opportunity cost is the next best alternative you gave up: the party." },
        { d:2, k:"num", q:"Your weekly pocket money is 100 AED. You spend 35 AED on food and 25 AED on transport. How much can you save, in AED?", a:40, x:"Income − spending = 100 − 35 − 25 = 40 AED." },
        { d:2, k:"num", q:"You save 40 AED a week. How many weeks to buy a 360 AED pair of headphones?", a:9, x:"360 ÷ 40 = 9 weeks." },
        { d:2, k:"mcq", q:"What is the main job of a bank?", o:["Making laws","Keeping money safe, lending and paying interest on savings","Growing food","Building roads"], a:1, x:"Banks store deposits, lend money (charging interest) and pay savers interest." },
        { d:3, k:"num", q:"You put 1 000 AED in a savings account paying 5% interest a year. How much do you have after one year, in AED?", a:1050, x:"5% of 1 000 = 50 AED. 1 000 + 50 = 1 050 AED." },
        { d:3, k:"mcq", q:"What usually happens to the price of umbrellas during a sudden rainy week?", o:["It falls, because supply rises","It rises, because demand increases","It becomes free","Nothing"], a:1, x:"Higher demand with the same supply pushes prices up: supply and demand." },
        { d:3, k:"mcq", q:"Inflation means…", o:["Prices generally rising over time, so money buys less","Prices falling","Banks closing","Wages always rising faster than prices"], a:0, x:"If inflation is 3%, something costing 100 AED now costs about 103 AED next year, so savings lose value unless they earn interest." }
      ] }
  );
})(window.STUDY);
