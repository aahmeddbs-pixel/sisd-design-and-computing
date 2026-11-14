/* Study Plus · Science · question bank for new challenge sets (d: 1 Core, 2 Extended, 3 Challenge). */
(function(S){
  const P = (id, L) => { const t = S.science && S.science.topics.find(x => x.id === id); if (t) t.pool = (t.pool || []).concat(L); };
  P("cells", [
    { d:1, k:"mcq", q:"What is the job of the cell membrane?", o:["Controls what enters and leaves the cell","Makes food by photosynthesis","Stores genetic material","Gives the cell a rigid shape"], a:0, x:"The membrane is a thin barrier that controls what moves in and out." },
    { d:1, k:"mcq", q:"Where does respiration release energy in a cell?", o:["Mitochondria","Nucleus","Cell wall","Vacuole"], a:0, x:"Mitochondria are where aerobic respiration releases energy from glucose." },
    { d:1, k:"tf", q:"True or false: animal cells have a cell wall.", a:false, x:"Only plant cells (and fungi and bacteria) have a cell wall. Animal cells have just a membrane." },
    { d:2, k:"mcq", q:"Put these in order from smallest to largest.", o:["Cell → tissue → organ → organ system","Organ → cell → tissue → system","Tissue → cell → organ → system","Cell → organ → tissue → system"], a:0, x:"Similar cells form tissues, tissues form organs, organs work together in organ systems." },
    { d:2, k:"mcq", q:"Why does a sperm cell have a tail?", o:["To swim to the egg","To store food","To carry oxygen","To make it heavier"], a:0, x:"The tail (flagellum) lets the sperm swim; it also has many mitochondria for energy." },
    { d:2, k:"mcq", q:"What is the cytoplasm?", o:["A jelly where most chemical reactions happen","The cell's control centre","A tough outer layer","A green structure"], a:0, x:"Cytoplasm fills the cell; many reactions happen in it." },
    { d:2, k:"mcq", q:"Which specialised cell carries oxygen and has no nucleus?", o:["Red blood cell","Nerve cell","Sperm cell","Palisade cell"], a:0, x:"Losing the nucleus leaves more room for haemoglobin, which carries oxygen." },
    { d:3, k:"mcq", q:"Why are palisade cells near the top surface of a leaf packed with chloroplasts?", o:["They receive the most light, so they can photosynthesise most","They need to store water","They make the leaf heavy","They release oxygen into the soil"], a:0, x:"Palisade cells are where light hits first, so lots of chloroplasts mean lots of photosynthesis." },
    { d:3, k:"mcq", q:"What is diffusion?", o:["Movement of particles from a high to a low concentration","Movement of water only, through a membrane","Movement from low to high using energy","Cell division"], a:0, x:"Diffusion is the net spreading of particles from where there are many to where there are few. Oxygen enters cells this way." },
    { d:3, k:"mcq", q:"A student sees a cell with a cell wall, a vacuole and no chloroplasts. Where could it come from?", o:["A plant root","Human skin","A red blood cell","A muscle"], a:0, x:"Cell wall and vacuole mean plant. No chloroplasts means it is from a part with no light, like a root." }
  ]);
  P("matter", [
    { d:1, k:"mcq", q:"In which state are particles packed closely in a regular pattern?", o:["Solid","Liquid","Gas","Plasma"], a:0, x:"Solid particles are close together in fixed, regular rows and only vibrate." },
    { d:1, k:"mcq", q:"What is the change from liquid to gas called?", o:["Evaporation (boiling)","Melting","Freezing","Condensation"], a:0, x:"Liquid → gas is evaporating (or boiling at the boiling point)." },
    { d:1, k:"num", q:"At what temperature does pure water boil at sea level, in °C?", a:100, x:"Pure water boils at 100 °C and freezes at 0 °C at sea level." },
    { d:2, k:"mcq", q:"Why can gases be compressed easily?", o:["There are big spaces between the particles","The particles are very small","The particles stop moving","Gases are heavy"], a:0, x:"Gas particles are far apart, so they can be pushed closer together." },
    { d:2, k:"mcq", q:"What is it called when a solid turns straight into a gas?", o:["Sublimation","Condensation","Melting","Freezing"], a:0, x:"Sublimation skips the liquid state: dry ice (solid CO₂) sublimes." },
    { d:2, k:"mcq", q:"Why does a puddle disappear on a hot day?", o:["Water particles gain energy and evaporate","The water soaks into the sun","The water freezes","The particles shrink"], a:0, x:"Heat gives surface particles enough energy to escape as water vapour." },
    { d:2, k:"tf", q:"True or false: particles in a solid do not move at all.", a:false, x:"They vibrate about fixed positions. Heating makes them vibrate more." },
    { d:3, k:"mcq", q:"Why does a balloon get bigger in hot weather?", o:["Gas particles move faster and hit the walls harder and more often","The rubber grows","More air enters by itself","The particles get bigger"], a:0, x:"Hotter particles move faster, so pressure inside increases and pushes the balloon out." },
    { d:3, k:"mcq", q:"What is diffusion in gases, such as smelling perfume across a room?", o:["Particles spread out by moving randomly from high to low concentration","Particles are pushed by the wind only","Particles change into liquid","Particles disappear"], a:0, x:"Gas particles move randomly and spread from where there are many to where there are few." },
    { d:3, k:"mcq", q:"During melting, the temperature of ice stays at 0 °C even though it is heated. Why?", o:["The energy is used to break the forces between particles","The thermometer is broken","Heat is not reaching the ice","Ice cannot gain energy"], a:0, x:"While changing state, energy goes into overcoming the attraction between particles, not raising temperature." }
  ]);
  P("mixtures", [
    { d:1, k:"mcq", q:"Which of these is a compound?", o:["Water (H₂O)","Oxygen (O₂)","Iron (Fe)","Gold (Au)"], a:0, x:"A compound has two or more different elements chemically joined. Water has hydrogen and oxygen." },
    { d:1, k:"mcq", q:"Which method separates large stones from sand?", o:["Sieving","Evaporation","Chromatography","Distillation"], a:0, x:"A sieve lets the small sand grains through and keeps the large stones." },
    { d:1, k:"tf", q:"True or false: salt dissolves in water to make a solution.", a:true, x:"Salt is soluble; it spreads out evenly in water to form a solution." },
    { d:2, k:"mcq", q:"How do you get salt back from salt water?", o:["Evaporation","Filtration","A magnet","Sieving"], a:0, x:"Heat the solution; the water evaporates and the salt crystals are left." },
    { d:2, k:"mcq", q:"Which method separates the different coloured inks in a felt-tip pen?", o:["Chromatography","Filtration","Distillation","Sieving"], a:0, x:"In chromatography, the dyes travel different distances up the paper." },
    { d:2, k:"mcq", q:"What is the chemical symbol for sodium?", o:["Na","So","S","Sd"], a:0, x:"Sodium's symbol Na comes from its Latin name, natrium." },
    { d:2, k:"mcq", q:"What is the difference between a mixture and a compound?", o:["A compound's elements are chemically joined; a mixture's are not","They are the same","A mixture is always a liquid","A compound can be separated by filtering"], a:0, x:"Mixtures can be separated by physical methods. Compounds need chemical reactions." },
    { d:3, k:"mcq", q:"Which method gets pure water from sea water?", o:["Distillation","Filtration","Chromatography","Using a magnet"], a:0, x:"Distillation boils the water, then cools the steam back into pure liquid, leaving the salt behind." },
    { d:3, k:"mcq", q:"How many atoms are in one molecule of CO₂?", o:["3","2","1","4"], a:0, x:"One carbon atom plus two oxygen atoms = 3 atoms." },
    { d:3, k:"mcq", q:"Iron filings and sulfur are mixed. How could you separate them?", o:["Use a magnet","Filter them","Evaporate them","Heat them strongly"], a:0, x:"Iron is magnetic; sulfur isn't. (Heating them would react them into iron sulfide, a compound.)" }
  ]);
  P("forces", [
    { d:1, k:"mcq", q:"What unit are forces measured in?", o:["Newtons (N)","Kilograms (kg)","Metres (m)","Joules (J)"], a:0, x:"Forces are measured in newtons using a forcemeter (newton meter)." },
    { d:1, k:"mcq", q:"Which force slows down a moving bike on a road?", o:["Friction","Magnetism","Upthrust","Gravity only"], a:0, x:"Friction acts against motion between surfaces in contact (and air resistance acts too)." },
    { d:1, k:"tf", q:"True or false: gravity pulls objects towards the centre of the Earth.", a:true, x:"Gravity is an attractive force between masses. On Earth it pulls things down." },
    { d:2, k:"mcq", q:"If the forces on an object are balanced, the object…", o:["Stays still or keeps moving at the same speed","Always speeds up","Always slows down","Changes shape"], a:0, x:"Balanced forces mean no change in motion." },
    { d:2, k:"mcq", q:"Why does a parachute slow a skydiver down?", o:["It increases air resistance","It reduces gravity","It adds upthrust from water","It makes the person lighter"], a:0, x:"The large surface area pushes against more air, increasing air resistance." },
    { d:2, k:"mcq", q:"What is upthrust?", o:["The upward push of a liquid or gas on an object","A force from magnets","The pull of the Earth","Friction in water"], a:0, x:"Upthrust helps things float. If upthrust equals weight, the object floats." },
    { d:2, k:"mcq", q:"Your mass on the Moon compared with on Earth is…", o:["The same","Smaller","Bigger","Zero"], a:0, x:"Mass (amount of matter) doesn't change. Weight is smaller on the Moon because gravity is weaker." },
    { d:3, k:"mcq", q:"A car's driving force is 2000 N and resistive forces are 2000 N. What happens?", o:["It moves at a steady speed","It speeds up","It slows down","It stops immediately"], a:0, x:"Equal forces are balanced: the car keeps the same speed." },
    { d:3, k:"mcq", q:"On a distance–time graph, what does a horizontal line show?", o:["The object is stationary","The object is speeding up","Constant speed","It is going backwards"], a:0, x:"Distance doesn't change with time, so the object isn't moving." },
    { d:3, k:"mcq", q:"Why do tyres have treads?", o:["To increase grip (friction) on wet roads","To reduce weight","To make them faster","To look nice"], a:0, x:"Treads push water away so the rubber keeps contact with the road, keeping friction high." }
  ]);
  P("energy", [
    { d:1, k:"mcq", q:"In a food chain, what do the arrows show?", o:["The direction energy flows","Who eats whom backwards","The size of animals","Where animals live"], a:0, x:"Arrows point from the food to the eater, showing the flow of energy." },
    { d:1, k:"mcq", q:"What is a producer?", o:["A plant that makes its own food by photosynthesis","An animal that eats plants","An animal that eats meat","A decomposer"], a:0, x:"Producers (green plants) start almost every food chain." },
    { d:1, k:"mcq", q:"Which energy store does food have?", o:["Chemical","Kinetic","Sound","Light"], a:0, x:"Food stores energy in chemical bonds." },
    { d:2, k:"mcq", q:"What do plants need for photosynthesis?", o:["Carbon dioxide, water and light","Oxygen and glucose","Soil only","Nitrogen and heat"], a:0, x:"Carbon dioxide + water → glucose + oxygen, using light energy (absorbed by chlorophyll)." },
    { d:2, k:"mcq", q:"What do decomposers such as fungi do?", o:["Break down dead material and return nutrients to the soil","Make food from sunlight","Hunt other animals","Pollinate flowers"], a:0, x:"Decomposers recycle nutrients so plants can use them again." },
    { d:2, k:"mcq", q:"A solar panel changes light energy into…", o:["Electrical energy","Chemical energy","Sound energy","Nuclear energy"], a:0, x:"Solar (photovoltaic) cells transfer energy from light into electricity." },
    { d:2, k:"tf", q:"True or false: energy can be created and destroyed.", a:false, x:"Energy is conserved: it can only be transferred from one store to another." },
    { d:3, k:"mcq", q:"Why are food chains rarely longer than five links?", o:["So much energy is lost at each level that little is left","Animals stop eating","Plants grow too slowly","There aren't enough animals"], a:0, x:"Only about 10% passes on at each step; the rest is lost as heat, movement and waste." },
    { d:3, k:"mcq", q:"If all the foxes in a food web disappeared, what would most likely happen to the rabbits first?", o:["Their numbers would increase","They would also disappear","Nothing","They would become predators"], a:0, x:"With fewer predators, more rabbits survive, so the population grows (until food runs short)." },
    { d:3, k:"mcq", q:"Which is a renewable energy resource?", o:["Wind","Coal","Natural gas","Oil"], a:0, x:"Renewable resources won't run out: wind, solar, hydro, tidal. Fossil fuels will." }
  ]);
  P("body", [
    { d:1, k:"mcq", q:"Which organ pumps blood around the body?", o:["Heart","Lungs","Stomach","Liver"], a:0, x:"The heart is a muscular pump." },
    { d:1, k:"mcq", q:"Which organ controls the body and sends messages through nerves?", o:["Brain","Heart","Kidney","Stomach"], a:0, x:"The brain and spinal cord form the central nervous system." },
    { d:1, k:"mcq", q:"What do bones do?", o:["Support, protect and help movement","Digest food","Pump blood","Make oxygen"], a:0, x:"The skeleton supports the body, protects organs (skull protects the brain) and works with muscles for movement." },
    { d:2, k:"mcq", q:"Which blood vessels carry blood AWAY from the heart?", o:["Arteries","Veins","Capillaries","Alveoli"], a:0, x:"Arteries carry blood away from the heart; veins carry it back." },
    { d:2, k:"mcq", q:"What is the job of the kidneys?", o:["Filter the blood and make urine","Pump blood","Digest protein","Exchange gases"], a:0, x:"Kidneys remove waste such as urea and excess water from the blood." },
    { d:2, k:"mcq", q:"Muscles work in pairs. When the biceps contracts, the triceps…", o:["Relaxes","Contracts too","Breaks","Grows"], a:0, x:"Antagonistic pairs: one contracts while the other relaxes, so the arm bends." },
    { d:2, k:"mcq", q:"What are the four main parts of blood?", o:["Red cells, white cells, platelets and plasma","Bones, muscles, skin and fat","Oxygen, water, salt and sugar","Arteries, veins, capillaries and heart"], a:0, x:"Red cells carry oxygen, white cells fight infection, platelets help clotting, plasma carries everything." },
    { d:3, k:"mcq", q:"Why do we breathe faster during exercise?", o:["Muscles need more oxygen and must remove more carbon dioxide","The lungs get smaller","To cool the brain","Because the heart stops"], a:0, x:"Respiration speeds up to release more energy, so more oxygen is needed and more CO₂ is made." },
    { d:3, k:"mcq", q:"What does the enzyme amylase in saliva do?", o:["Breaks starch into sugars","Breaks fat into fatty acids","Kills bacteria only","Makes protein"], a:0, x:"Enzymes speed up digestion. Amylase breaks down starch." },
    { d:3, k:"mcq", q:"Why does the left side of the heart have a thicker muscle wall?", o:["It pumps blood all around the body, which needs more pressure","It holds more blood","It pumps to the lungs only","It is older"], a:0, x:"The left ventricle pumps blood to the whole body, so it needs more force than the right side, which pumps to the lungs." }
  ]);
  P("waves", [
    { d:1, k:"mcq", q:"How does light travel?", o:["In straight lines","In circles","Only around corners","It doesn't travel"], a:0, x:"Light travels in straight lines, which is why shadows form." },
    { d:1, k:"mcq", q:"What do we call an object that gives out its own light?", o:["Luminous","Opaque","Transparent","Reflective"], a:0, x:"Luminous objects, like the Sun or a lamp, produce light. The Moon only reflects it." },
    { d:1, k:"mcq", q:"Sound is made by…", o:["Vibrations","Light","Magnets","Heat"], a:0, x:"All sounds are caused by something vibrating." },
    { d:2, k:"mcq", q:"Why can't sound travel through space?", o:["There are no particles to vibrate","It is too cold","Space is too dark","Sound is too slow"], a:0, x:"Sound needs a medium (solid, liquid or gas). Space is a vacuum." },
    { d:2, k:"mcq", q:"What is the law of reflection?", o:["Angle of incidence = angle of reflection","Light always bends","Angle of reflection is double","Light is absorbed"], a:0, x:"Measured from the normal, the angles are equal." },
    { d:2, k:"mcq", q:"A higher-pitched sound has…", o:["A higher frequency","A lower frequency","A bigger amplitude","No vibrations"], a:0, x:"Pitch depends on frequency (vibrations per second, Hz). Loudness depends on amplitude." },
    { d:2, k:"mcq", q:"What is refraction?", o:["Light bending as it passes into a different material","Light bouncing off a mirror","Light being absorbed","Sound echoing"], a:0, x:"Light changes speed when it enters glass or water, so it bends." },
    { d:3, k:"mcq", q:"Why do we see lightning before we hear thunder?", o:["Light travels much faster than sound","Sound is made later","Our ears are slow","Light is louder"], a:0, x:"Light travels at about 300 000 km/s; sound at about 340 m/s in air." },
    { d:3, k:"mcq", q:"A red apple looks red in white light because…", o:["It reflects red light and absorbs the other colours","It absorbs red light","It makes red light","It reflects all colours"], a:0, x:"Coloured objects reflect their own colour and absorb the rest." },
    { d:3, k:"num", q:"Sound travels at 340 m/s. You hear thunder 3 seconds after the lightning. How far away is the storm, in metres?", a:1020, x:"Distance = speed × time = 340 × 3 = 1020 m (about 1 km)." }
  ]);
})(window.STUDY = window.STUDY || {});
