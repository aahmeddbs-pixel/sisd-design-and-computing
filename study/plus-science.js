/* Study Plus · Science · harder tasks for every topic, plus two new MYP 2 topics (d: 1 Core, 2 Extended, 3 Challenge) */
(function(S){
  const C = S.science, T = id => C.topics.find(t => t.id === id);
  T("cells").tasks.push(
    { d:3, k:"num", q:"A cell is 0.02 mm wide. Under the microscope it looks 8 mm wide. What is the magnification?", a:400, x:"Magnification = image size ÷ actual size = 8 ÷ 0.02 = ×400. Use the same units for both." },
    { d:3, k:"mcq", q:"Why do root hair cells have a long, thin extension?", o:["To make food","To increase surface area for absorbing water and minerals","To carry oxygen","To protect the root"], a:1, x:"A larger surface area means more water and minerals can be absorbed by osmosis and diffusion." },
    { d:2, k:"mcq", q:"Which organelle makes proteins?", o:["Ribosome","Vacuole","Cell wall","Chloroplast"], a:0, x:"Ribosomes (tiny structures in the cytoplasm) build proteins." },
    { d:3, k:"mcq", q:"How are bacterial cells different from animal cells?", o:["They have a nucleus","They have no nucleus; their DNA is free in the cytoplasm","They have chloroplasts","They are much larger"], a:1, x:"Bacteria are prokaryotic: no nucleus. Their DNA is a loop in the cytoplasm, and many have extra rings of DNA called plasmids." }
  );
  T("matter").tasks.push(
    { d:3, k:"mcq", q:"Why does the temperature stay the same while ice is melting?", o:["Heat stops flowing","Energy is used to break the forces between particles, not to raise temperature","Ice is a gas","The thermometer is broken"], a:1, x:"During a change of state, the energy supplied breaks the bonds holding particles in place, so temperature stays flat until all the ice has melted." },
    { d:3, k:"mcq", q:"Why does a balloon shrink when put in a freezer?", o:["Air escapes through the rubber","Gas particles slow down and hit the walls less hard, so pressure and volume drop","The air turns to ice","Cold air is heavier"], a:1, x:"Cooling lowers particle speed, so they collide less often and less hard with the inside of the balloon." },
    { d:2, k:"mcq", q:"What is the difference between evaporation and boiling?", o:["There is none","Evaporation happens only at the surface and at any temperature; boiling happens throughout the liquid at the boiling point","Boiling is slower","Evaporation needs a flame"], a:1, x:"Puddles evaporate on a cool day; boiling needs the boiling point and produces bubbles through the whole liquid." },
    { d:3, k:"mcq", q:"Gas pressure in a closed container is caused by…", o:["Gas particles colliding with the walls","Gravity","Particles being still","Light"], a:0, x:"Each collision pushes on the wall. More collisions or harder ones (higher temperature) mean higher pressure." }
  );
  T("mixtures").tasks.push(
    { d:3, k:"mcq", q:"In chromatography, why do different dyes travel different distances?", o:["They have different colours","They have different solubilities and attraction to the paper","The paper is uneven","They are heavier"], a:1, x:"More soluble dyes that are less attracted to the paper travel further with the solvent." },
    { d:3, k:"num", q:"A dye travels 6 cm and the solvent front travels 10 cm. What is the Rf value?", a:0.6, tol:0.001, x:"Rf = distance moved by dye ÷ distance moved by solvent = 6 ÷ 10 = 0.6." },
    { d:2, k:"mcq", q:"Which is a compound?", o:["Oxygen gas O₂","Sodium chloride NaCl","Iron Fe","Air"], a:1, x:"NaCl has two different elements chemically joined. O₂ is an element (only oxygen atoms) and air is a mixture." },
    { d:3, k:"mcq", q:"Fractional distillation separates crude oil because the parts have different…", o:["Colours","Boiling points","Masses only","Magnetism"], a:1, x:"Liquids with different boiling points condense at different heights in the fractionating column." }
  );
  T("forces").tasks.push(
    { d:3, k:"num", q:"A box weighs 600 N and rests on an area of 2 m². What pressure does it exert in N/m² (Pa)?", a:300, x:"Pressure = force ÷ area = 600 ÷ 2 = 300 Pa." },
    { d:3, k:"num", q:"A 20 N force moves a box 5 m. How much work is done, in joules?", a:100, x:"Work done = force × distance = 20 × 5 = 100 J." },
    { d:2, k:"mcq", q:"Why do sharp knives cut better than blunt ones?", o:["They are heavier","The force acts on a smaller area, giving higher pressure","They are colder","They have more friction"], a:1, x:"Pressure = force ÷ area. A thin edge has a tiny area, so the same push gives much greater pressure." },
    { d:3, k:"num", q:"A spring stretches 2 cm with a 4 N load. Assuming it obeys Hooke's law, how far does it stretch with 10 N, in cm?", a:5, x:"Extension is proportional to force: 4 N → 2 cm means 1 N → 0.5 cm, so 10 N → 5 cm." }
  );
  T("energy").tasks.push(
    { d:3, k:"num", q:"A kettle is 80% efficient and uses 2 000 J. How much energy is wasted, in J?", a:400, x:"Useful = 80% of 2 000 = 1 600 J. Wasted = 2 000 − 1 600 = 400 J." },
    { d:3, k:"mcq", q:"Why does a food web give a better picture of an ecosystem than a food chain?", o:["It is shorter","It shows the many feeding links, so you can predict knock-on effects","It only shows plants","It shows the weather"], a:1, x:"Most animals eat and are eaten by several species. A web shows how a change in one population affects many others." },
    { d:2, k:"mcq", q:"Which energy resource is renewable?", o:["Coal","Natural gas","Solar","Oil"], a:2, x:"Solar energy will not run out. Coal, oil and gas are fossil fuels that took millions of years to form." },
    { d:3, k:"mcq", q:"If all the hawks in a food web died, what would most likely happen first?", o:["Grass would disappear","The populations the hawks ate would increase","Producers would stop photosynthesising","Nothing"], a:1, x:"With their predator gone, prey populations grow; later this can reduce the producers they eat." }
  );
  C.topics.push(
    { id:"body", title:"Human body systems", strand:"MYP 2 · Biology",
      learn:{ ideas:[
        "Digestive system: breaks food into small soluble molecules. Enzymes speed this up. Absorption happens in the small intestine.",
        "Respiratory system: air goes nose → trachea → bronchi → bronchioles → alveoli, where oxygen diffuses into the blood.",
        "Circulatory system: the heart pumps blood. Arteries carry blood away from the heart; veins carry it back; capillaries swap substances with cells.",
        "Aerobic respiration: glucose + oxygen → carbon dioxide + water (+ energy released).",
        "Skeleton and muscles: muscles work in antagonistic pairs (biceps and triceps)."],
        example:"Why are alveoli good for gas exchange?\nThey have a huge surface area, very thin walls and a rich blood supply, so oxygen diffuses in quickly." },
      tasks:[
        { d:1, k:"mcq", q:"Where is most digested food absorbed into the blood?", o:["Stomach","Small intestine","Large intestine","Mouth"], a:1, x:"The small intestine is long with millions of villi, giving a huge surface area for absorption." },
        { d:1, k:"mcq", q:"Which blood vessels carry blood away from the heart?", o:["Veins","Arteries","Capillaries","Nerves"], a:1, x:"Remember: Arteries go Away. They have thick muscular walls to cope with high pressure." },
        { d:1, k:"mcq", q:"Where does gas exchange happen in the lungs?", o:["Trachea","Alveoli","Bronchi","Diaphragm"], a:1, x:"Oxygen and carbon dioxide swap across the thin walls of the alveoli (air sacs)." },
        { d:2, k:"mcq", q:"What is the word equation for aerobic respiration?", o:["Glucose + oxygen → carbon dioxide + water","Carbon dioxide + water → glucose + oxygen","Glucose → lactic acid","Oxygen + water → glucose"], a:0, x:"Respiration releases energy from glucose using oxygen; carbon dioxide and water are produced. Photosynthesis is the reverse." },
        { d:2, k:"mcq", q:"What do enzymes do in digestion?", o:["Slow digestion down","Speed up the breakdown of large molecules","Carry oxygen","Make food larger"], a:1, x:"Enzymes are biological catalysts: for example, amylase breaks starch into sugars." },
        { d:2, k:"mcq", q:"When the biceps contracts, what does the triceps do?", o:["Contracts too","Relaxes","Breaks","Becomes a bone"], a:1, x:"Muscles can only pull, so they work in antagonistic pairs: one contracts while the other relaxes." },
        { d:2, k:"num", q:"How many chambers does the human heart have?", a:4, x:"Two atria (top) and two ventricles (bottom). The left ventricle has the thickest wall because it pumps blood around the whole body." },
        { d:3, k:"mcq", q:"Why do capillary walls need to be only one cell thick?", o:["To be strong","So substances can diffuse quickly between blood and cells","To store blood","To keep blood cold"], a:1, x:"A very short diffusion distance lets oxygen and glucose reach cells, and wastes leave, quickly." },
        { d:3, k:"mcq", q:"Why does your breathing rate rise during exercise?", o:["To cool the lungs","Muscles need more oxygen for respiration and must remove more carbon dioxide","To slow the heart","Because the air is thinner"], a:1, x:"Working muscles respire faster, so they need more oxygen and produce more CO₂, which must be breathed out." },
        { d:3, k:"mcq", q:"Smoking damages cilia in the airways. What problem does this cause?", o:["Mucus and dirt build up, increasing infections","The heart stops","Bones weaken","Food can't be digested"], a:0, x:"Cilia sweep mucus and trapped germs out of the lungs. Without them, mucus collects, causing coughing and chest infections." }
      ] },
    { id:"waves", title:"Light and sound", strand:"MYP 2 · Physics",
      learn:{ ideas:[
        "Light travels in straight lines at about 300 000 km/s. Sound is much slower (about 340 m/s in air) and needs a medium; it can't travel through a vacuum.",
        "Reflection: angle of incidence = angle of reflection (measured from the normal).",
        "Refraction: light bends when it changes speed going into a different material, like air into glass.",
        "White light is a mix of colours (ROYGBIV); a prism splits it (dispersion).",
        "Sound: amplitude decides loudness, frequency (Hz) decides pitch. Humans hear about 20 Hz to 20 000 Hz."],
        example:"You see lightning, then hear thunder 3 s later. How far away is the storm?\nDistance = speed × time = 340 × 3 = 1 020 m (about 1 km)." },
      tasks:[
        { d:1, k:"tf", q:"True or false: Sound can travel through empty space (a vacuum).", a:false, x:"Sound needs particles to vibrate. Space is a vacuum, so there is no sound there; light can still travel through it." },
        { d:1, k:"mcq", q:"What decides the pitch of a sound?", o:["Amplitude","Frequency","Speed","Colour"], a:1, x:"Higher frequency (more vibrations per second) means a higher pitch." },
        { d:1, k:"num", q:"A light ray hits a mirror at 35° to the normal. What is the angle of reflection in degrees?", a:35, x:"The law of reflection: angle of incidence = angle of reflection = 35°." },
        { d:2, k:"mcq", q:"Why does a straw look bent in a glass of water?", o:["Reflection","Refraction: light changes speed and direction at the water surface","The straw is bent","Diffraction"], a:1, x:"Light from the straw bends as it leaves the water into the air, so your brain sees the straw in the wrong place." },
        { d:2, k:"mcq", q:"What colour does a red apple look under green light?", o:["Red","Green","Black (very dark)","White"], a:2, x:"A red object reflects only red light. Under green light there is no red to reflect, so it looks black." },
        { d:2, k:"mcq", q:"What does a louder sound have?", o:["A larger amplitude","A higher frequency","A lower speed","A shorter wavelength"], a:0, x:"Amplitude is the size of the vibration. Bigger vibrations carry more energy and sound louder." },
        { d:2, k:"num", q:"You hear thunder 5 s after seeing lightning. Sound travels at 340 m/s. How far away is the storm, in metres?", a:1700, x:"Distance = speed × time = 340 × 5 = 1 700 m. The light arrives almost instantly." },
        { d:3, k:"num", q:"An echo returns 2 s after a shout at a cliff. Speed of sound 340 m/s. How far away is the cliff, in metres?", a:340, x:"The sound travels there and back: 340 × 2 = 680 m in total, so the cliff is 680 ÷ 2 = 340 m away." },
        { d:3, k:"mcq", q:"Why can we see a rainbow after rain?", o:["Raindrops reflect only blue light","Raindrops refract and split sunlight into its colours","Clouds are coloured","Lightning makes colours"], a:1, x:"Each raindrop acts like a prism: different colours refract by different amounts, spreading white light into a spectrum." },
        { d:3, k:"mcq", q:"Bats find insects using ultrasound. What is ultrasound?", o:["Sound above 20 000 Hz, too high for humans to hear","Very loud sound","Light","Sound below 20 Hz"], a:0, x:"Ultrasound is above human hearing. Bats use its echoes to locate prey; hospitals use it for scans." }
      ] }
  );
})(window.STUDY);
