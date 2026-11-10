/* Study Plus · Individuals and Societies · IB MYP 2 (Grade 7) */
(window.STUDY = window.STUDY || {}).ins = {
  name: "Individuals and Societies", icon: "🌍", colour: "#B5651D",
  blurb: "MYP 2 geography, history and economics",
  topics: [
    {
      id: "maps", title: "Map skills", strand: "MYP 2 · Geography",
      learn: {
        ideas: [
          "Latitude lines run east–west and measure how far north or south of the Equator (0°) a place is.",
          "Longitude lines run north–south and measure how far east or west of the Prime Meridian (0°, through Greenwich, London).",
          "Coordinates are written latitude first, then longitude: Dubai is about 25° N, 55° E.",
          "Map scale links map distance to real distance: 1 : 100 000 means 1 cm on the map = 1 km in real life.",
          "On a map, the 8 compass points are N, NE, E, SE, S, SW, W, NW. Contour lines join places of equal height: close together = steep."
        ],
        example: "On a 1 : 25 000 map two schools are 8 cm apart.\n8 × 25 000 = 200 000 cm = 2 000 m = 2 km."
      },
      tasks: [
        { k:"mcq", q:"What is the line of latitude at 0° called?", o:["Prime Meridian","Equator","Tropic of Cancer","Arctic Circle"], a:1, x:"The Equator (0° latitude) divides the Earth into the Northern and Southern Hemispheres." },
        { k:"mcq", q:"Which line passes through Greenwich, London?", o:["Equator","Tropic of Capricorn","Prime Meridian (0° longitude)","International Date Line"], a:2, x:"The Prime Meridian is 0° longitude. Places are measured as degrees east or west of it." },
        { k:"mcq", q:"Which coordinates are closest to Dubai?", o:["25° N, 55° E","55° N, 25° E","25° S, 55° W","0°, 0°"], a:0, x:"Dubai is north of the Equator and east of Greenwich, at roughly 25° N, 55° E. Latitude is always written first." },
        { k:"num", q:"On a map with scale 1 : 50 000, a road is 4 cm long. How long is it in real life in km?", a:2, x:"4 × 50 000 = 200 000 cm. Divide by 100 000 to change cm into km: 2 km." },
        { k:"mcq", q:"On a map, contour lines are very close together. What does this show?", o:["Flat land","A steep slope","A river","A town"], a:1, x:"Contours join points of equal height. When they are close together, the height changes quickly over a short distance: a steep slope." },
        { k:"mcq", q:"Which direction is exactly halfway between north and east?", o:["NW","SE","NE","SW"], a:2, x:"Halfway between north and east is north-east (NE). Opposite it is south-west (SW)." },
        { k:"tf", q:"True or false: Lines of longitude meet at the North and South Poles.", a:true, x:"Lines of longitude run from pole to pole and get closer together until they meet at the Poles. Lines of latitude are parallel and never meet." },
        { k:"mcq", q:"Which of these continents is crossed by the Equator?", o:["Europe","Africa","Antarctica","Australia"], a:1, x:"The Equator crosses Africa (for example Kenya and the DR Congo), as well as South America and parts of Asia's islands." }
      ]
    },
    {
      id: "climate", title: "Weather and climate", strand: "MYP 2 · Geography",
      learn: {
        ideas: [
          "Weather is the day-to-day condition of the atmosphere. Climate is the average weather over a long time (about 30 years).",
          "Factors affecting climate: latitude, altitude (higher = colder), distance from the sea, ocean currents and winds.",
          "The UAE has a hot desert climate: very hot summers, mild winters and very little rain.",
          "Rainfall types: relief (air forced up mountains), convectional (hot ground heats air that rises), frontal (warm air meets cold air).",
          "A climate graph shows temperature as a line and rainfall as bars for each month."
        ],
        example: "Why is the top of Jebel Jais colder than Dubai beach?\nAltitude: temperature drops about 6.5 °C for every 1 000 m you climb. Jebel Jais is about 1 900 m high, so it is around 12 °C cooler."
      },
      tasks: [
        { k:"mcq", q:"Which statement describes CLIMATE rather than weather?", o:["It is raining today.","It will be windy tomorrow afternoon.","Dubai has hot summers and mild winters.","It was 30 °C at noon."], a:2, x:"Climate is the long-term average pattern. The others describe weather at a particular time." },
        { k:"mcq", q:"Why does it get colder as you go higher up a mountain?", o:["You are closer to the Moon","Air is thinner and holds less heat at higher altitude","There is more sunlight","Mountains are made of ice"], a:1, x:"At higher altitude the air is thinner (lower pressure) and holds less heat, so temperature falls by about 6.5 °C per 1 000 m." },
        { k:"mcq", q:"What type of climate does the UAE have?", o:["Tropical rainforest","Polar","Hot desert","Temperate"], a:2, x:"The UAE is a hot desert climate: high temperatures, low rainfall (often under 100 mm a year) and clear skies." },
        { k:"mcq", q:"Which instrument measures air pressure?", o:["Thermometer","Rain gauge","Barometer","Anemometer"], a:2, x:"A barometer measures air pressure. An anemometer measures wind speed and a rain gauge measures rainfall." },
        { k:"mcq", q:"Places near the coast usually have…", o:["Hotter summers and colder winters than inland","Cooler summers and milder winters than inland","No seasons","More snow"], a:1, x:"The sea heats up and cools down slowly, so it keeps coastal temperatures more moderate than inland areas." },
        { k:"mcq", q:"Air is forced to rise over mountains, cools and forms rain. What type of rainfall is this?", o:["Convectional","Frontal","Relief","Acid"], a:2, x:"Relief (orographic) rainfall happens when air rises over high land. The other side of the mountain is often dry: the rain shadow." },
        { k:"tf", q:"True or false: On a climate graph, rainfall is usually shown as bars and temperature as a line.", a:true, x:"That is the standard layout, so you can compare both for each month at a glance." },
        { k:"mcq", q:"Places near the Equator are hot mainly because…", o:["They are closer to the Sun","The Sun's rays hit them more directly and are concentrated on a smaller area","They have more volcanoes","They have more people"], a:1, x:"Near the Equator sunlight strikes almost vertically, concentrating its energy. Near the Poles the same energy is spread over a larger area." }
      ]
    },
    {
      id: "civilisations", title: "Early civilisations", strand: "MYP 2 · History",
      learn: {
        ideas: [
          "Early civilisations grew beside rivers: Mesopotamia (Tigris and Euphrates), Egypt (Nile), the Indus Valley (Indus) and China (Yellow River).",
          "Rivers gave water, fertile soil for farming, fish and transport, so people could stay in one place and build cities.",
          "The Sumerians of Mesopotamia created one of the first writing systems, cuneiform, around 3200 BCE.",
          "Ancient Egyptians used hieroglyphics, built pyramids as tombs for pharaohs, and depended on the yearly Nile flood.",
          "Historians use primary sources (from the time) and secondary sources (written later about it)."
        ],
        example: "Is a clay tablet written in cuneiform a primary or secondary source?\nPrimary: it was made at the time by people who lived then."
      },
      tasks: [
        { k:"mcq", q:"Which two rivers flowed through ancient Mesopotamia?", o:["Nile and Indus","Tigris and Euphrates","Yangtze and Yellow","Amazon and Orinoco"], a:1, x:"Mesopotamia means 'land between the rivers': the Tigris and Euphrates, in what is now mainly Iraq." },
        { k:"mcq", q:"Why did early civilisations develop near rivers?", o:["Rivers kept enemies away completely","Rivers gave water, fertile soil and transport","There was no other land","Rivers were warmer"], a:1, x:"Reliable water and fertile land meant farmers could grow surplus food, which allowed towns, trade and specialised jobs to develop." },
        { k:"mcq", q:"What was the Sumerian writing system called?", o:["Hieroglyphics","Cuneiform","Latin","Sanskrit"], a:1, x:"Cuneiform used wedge-shaped marks pressed into wet clay. Hieroglyphics was the Egyptian system." },
        { k:"mcq", q:"What were the Egyptian pyramids mainly built as?", o:["Palaces","Tombs for pharaohs","Markets","Schools"], a:1, x:"Pyramids were tombs. Egyptians believed in an afterlife, so pharaohs were buried with goods they would need." },
        { k:"mcq", q:"Which of these is a SECONDARY source about ancient Egypt?", o:["A papyrus scroll from 1500 BCE","A mummy","A school textbook written in 2020","A wall painting in a tomb"], a:2, x:"A textbook written today interprets the past, so it is secondary. The others were made at the time, so they are primary." },
        { k:"mcq", q:"Why was the yearly flooding of the Nile important to Egyptians?", o:["It destroyed the cities","It left rich, fertile silt for farming","It brought snow","It stopped trade"], a:1, x:"The flood spread black, fertile silt over the fields. Egyptians called their land Kemet, 'the black land', because of it." },
        { k:"tf", q:"True or false: BCE dates count down, so 3000 BCE is earlier than 2000 BCE.", a:true, x:"BCE means 'before the Common Era'. The bigger the BCE number, the further back in time." },
        { k:"mcq", q:"The Indus Valley civilisation was mainly located in what is now…", o:["Egypt","Pakistan and north-west India","China","Greece"], a:1, x:"Indus cities like Mohenjo-daro and Harappa were in modern Pakistan and north-west India. They had planned streets and drains." }
      ]
    },
    {
      id: "trade", title: "Trade and the Silk Road", strand: "MYP 2 · History and Economics",
      learn: {
        ideas: [
          "The Silk Road was a network of trade routes linking China with Central Asia, the Middle East and Europe, from about 130 BCE.",
          "Goods traded included silk, spices, paper, glass, horses and precious metals. Ideas, religions, inventions and diseases also travelled.",
          "Arabian traders and ports, including those along the Gulf, linked land routes to sea routes across the Indian Ocean.",
          "Supply and demand: when something is scarce and many people want it, its price rises.",
          "Trade creates interdependence: places rely on each other for goods they cannot produce."
        ],
        example: "Why was silk so valuable in Rome?\nOnly China knew how to make it (low supply) and wealthy Romans wanted it (high demand), so the price was very high."
      },
      tasks: [
        { k:"mcq", q:"Which product gave the Silk Road its name?", o:["Spices","Silk from China","Gold","Tea"], a:1, x:"Silk, made in China, was highly valued in the West. The name 'Silk Road' was given by a 19th-century geographer." },
        { k:"mcq", q:"Besides goods, what else spread along the Silk Road?", o:["Nothing else","Ideas, religions, inventions and diseases","Only animals","Only people"], a:1, x:"Trade routes carried culture: paper-making and the compass spread west, while religions and, sadly, diseases like the plague also travelled." },
        { k:"mcq", q:"If demand for a product rises but supply stays the same, the price usually…", o:["Falls","Rises","Stays the same","Becomes zero"], a:1, x:"More buyers competing for the same amount pushes prices up. This is the law of supply and demand." },
        { k:"mcq", q:"What is 'interdependence' in trade?", o:["Countries refusing to trade","Countries relying on each other for goods and services","One country making everything","A tax on imports"], a:1, x:"No country can produce everything. The UAE imports most of its food, and exports oil, gas and re-exported goods: that is interdependence." },
        { k:"mcq", q:"An export is…", o:["A good bought from another country","A good sold to another country","A tax","A type of ship"], a:1, x:"Exports leave a country to be sold abroad; imports come in from abroad." },
        { k:"mcq", q:"Why did traders travel in caravans across deserts?", o:["For safety and to share resources","Because it was faster alone","To avoid paying for camels","It was the law"], a:0, x:"Travelling in groups protected traders from bandits and helped them share water, guides and animals on long, harsh journeys." },
        { k:"tf", q:"True or false: Sea trade routes across the Indian Ocean connected the Arabian Gulf with India and East Africa.", a:true, x:"Monsoon winds helped dhows sail between Arabia, India and East Africa, trading goods like pearls, dates, spices and textiles." },
        { k:"mcq", q:"What invention, spread from China, changed record-keeping and learning in the Islamic world and Europe?", o:["Paper","The wheel","Plastic","Electricity"], a:0, x:"Paper-making reached Samarkand and Baghdad by the 8th century, making books cheaper and helping the spread of knowledge in the Islamic Golden Age." }
      ]
    },
    {
      id: "population", title: "Population and migration", strand: "MYP 2 · Geography",
      learn: {
        ideas: [
          "Population density = number of people ÷ area (people per km²).",
          "Natural increase = birth rate − death rate.",
          "Migration is moving from one place to another to live. Push factors make people leave (war, few jobs); pull factors attract them (jobs, safety, education).",
          "Urbanisation is the growth in the share of people living in towns and cities.",
          "The UAE has a large migrant population that helped build its fast-growing cities."
        ],
        example: "A town has 30 000 people in 15 km².\nDensity = 30 000 ÷ 15 = 2 000 people per km²."
      },
      tasks: [
        { k:"num", q:"A region has 120 000 people and an area of 40 km². What is the population density (people per km²)?", a:3000, x:"Density = people ÷ area = 120 000 ÷ 40 = 3 000 people per km²." },
        { k:"mcq", q:"Which is a PULL factor for migration?", o:["War","Drought","Better-paid jobs","Lack of schools"], a:2, x:"Pull factors attract people to a new place. Better jobs pull people in; war, drought and lack of schools push people away." },
        { k:"mcq", q:"Which is a PUSH factor?", o:["Good healthcare","Safety","Unemployment","Family already living there"], a:2, x:"A lack of jobs pushes people to leave their home area to look for work elsewhere." },
        { k:"num", q:"A country's birth rate is 18 per 1 000 and death rate is 7 per 1 000. What is the natural increase per 1 000?", a:11, x:"Natural increase = birth rate − death rate = 18 − 7 = 11 per 1 000 people." },
        { k:"mcq", q:"What is urbanisation?", o:["People moving from cities to the countryside","An increasing proportion of people living in towns and cities","Building farms","Planting trees in cities"], a:1, x:"Urbanisation is when more and more of a population lives in urban areas, usually because people migrate from rural areas for work." },
        { k:"mcq", q:"Which is a likely problem of very rapid urban growth?", o:["Too much space","Traffic congestion and housing shortages","Fewer jobs in cities","Lower demand for water"], a:1, x:"When cities grow faster than services can be built, there can be traffic, pollution and pressure on housing, water and schools." },
        { k:"tf", q:"True or false: Someone who moves within their own country is an emigrant.", a:false, x:"Moving within a country is internal migration. An emigrant leaves their country; an immigrant arrives in a new country." },
        { k:"mcq", q:"What is a refugee?", o:["Someone who moves for a holiday","Someone forced to leave their country because of danger, such as war or persecution","A tourist","Someone who changes job"], a:1, x:"Refugees are forced migrants. They leave because staying would put their lives or freedom at risk, not by choice." }
      ]
    }
  ]
};
