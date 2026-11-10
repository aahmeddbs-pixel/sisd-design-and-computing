/* Study Plus · Sciences · IB MYP 2 (Grade 7) */
(window.STUDY = window.STUDY || {}).science = {
  name: "Science", icon: "⚗", colour: "#1E8A55",
  blurb: "MYP 2 biology, chemistry and physics",
  topics: [
    {
      id: "cells", title: "Cells and organisation", strand: "MYP 2 · Biology",
      learn: {
        ideas: [
          "All living things are made of cells. Cells → tissues → organs → organ systems → organism.",
          "Animal and plant cells both have a nucleus (controls the cell), cell membrane (controls what goes in and out), cytoplasm (where reactions happen) and mitochondria (respiration releases energy).",
          "Only plant cells have a cell wall (strength), chloroplasts (photosynthesis) and a large permanent vacuole (holds cell sap).",
          "Specialised cells have features for their job: red blood cells have no nucleus and lots of haemoglobin to carry oxygen.",
          "Microscope magnification = eyepiece lens × objective lens."
        ],
        example: "Why can't an onion root cell photosynthesise?\nRoot cells are underground with no light, so they have no chloroplasts. No chloroplasts means no photosynthesis."
      },
      tasks: [
        { k:"mcq", q:"Which part controls the activities of the cell?", o:["Cell membrane","Nucleus","Cytoplasm","Vacuole"], a:1, x:"The nucleus contains the genetic material (DNA) that controls what the cell does. Think of it as the cell's control centre." },
        { k:"mcq", q:"Which structure is found in plant cells but NOT in animal cells?", o:["Nucleus","Cell membrane","Chloroplast","Mitochondria"], a:2, x:"Chloroplasts (and the cell wall and permanent vacuole) are only in plant cells. Both cell types have a nucleus, membrane and mitochondria." },
        { k:"mcq", q:"Where does aerobic respiration take place?", o:["Chloroplasts","Mitochondria","Cell wall","Vacuole"], a:1, x:"Mitochondria release energy from glucose in respiration. Very active cells, like muscle cells, have lots of them." },
        { k:"mcq", q:"What is the correct order of organisation, from smallest to largest?", o:["Organ → tissue → cell → system","Cell → tissue → organ → organ system","Tissue → cell → organ → system","Cell → organ → tissue → system"], a:1, x:"Similar cells form a tissue, tissues form an organ (like the heart), organs work together in an organ system (like the circulatory system)." },
        { k:"num", q:"A microscope has a ×10 eyepiece and a ×40 objective lens. What is the total magnification?", a:400, x:"Total magnification = eyepiece × objective = 10 × 40 = ×400." },
        { k:"mcq", q:"Why does a red blood cell have no nucleus?", o:["It is a plant cell","To make more room for haemoglobin to carry oxygen","So it can divide faster","To make it heavier"], a:1, x:"Without a nucleus there is more space for haemoglobin, the protein that carries oxygen. This is an adaptation to its job." },
        { k:"mcq", q:"What does the cell wall do in a plant cell?", o:["Makes food","Gives strength and support","Controls the cell","Releases energy"], a:1, x:"The cell wall is made of cellulose. It keeps the cell's shape and stops it bursting when it fills with water." },
        { k:"tf", q:"True or false: The cell membrane controls what substances enter and leave the cell.", a:true, x:"The membrane is partially permeable: it lets some substances, like oxygen and glucose, through but not others." }
      ]
    },
    {
      id: "matter", title: "Particles and states of matter", strand: "MYP 2 · Chemistry",
      learn: {
        ideas: [
          "Solids: particles packed tightly in a regular pattern, vibrating in place. Fixed shape and volume.",
          "Liquids: particles close together but able to move past each other. Fixed volume, take the shape of the container.",
          "Gases: particles far apart, moving fast in all directions. No fixed shape or volume; can be compressed.",
          "Melting (solid → liquid), boiling/evaporation (liquid → gas), condensation (gas → liquid), freezing (liquid → solid), sublimation (solid → gas).",
          "Diffusion is the spreading of particles from high concentration to low concentration. It is faster in gases and when hotter."
        ],
        example: "Why can you smell perfume across a room?\nPerfume particles evaporate and diffuse through the air, moving from where there are many of them (near the bottle) to where there are few (the rest of the room)."
      },
      tasks: [
        { k:"mcq", q:"In which state are particles far apart and moving quickly in all directions?", o:["Solid","Liquid","Gas","All three"], a:2, x:"Gas particles have lots of energy and big gaps between them, so they move fast and spread to fill any container." },
        { k:"mcq", q:"What is the change from gas to liquid called?", o:["Evaporation","Condensation","Melting","Sublimation"], a:1, x:"Condensation: the gas cools, particles lose energy, slow down and move closer to form a liquid. Example: water droplets on a cold glass." },
        { k:"mcq", q:"Why can a gas be compressed (squashed) but a solid cannot?", o:["Gas particles are smaller","Gas particles have big spaces between them","Solids are heavier","Gas particles do not move"], a:1, x:"There is lots of empty space between gas particles, so they can be pushed closer. Solid particles are already touching." },
        { k:"mcq", q:"Dry ice (solid carbon dioxide) turns straight into a gas. What is this called?", o:["Melting","Boiling","Sublimation","Freezing"], a:2, x:"Changing directly from a solid to a gas, without becoming a liquid, is sublimation." },
        { k:"mcq", q:"In which situation would diffusion happen fastest?", o:["Ink in cold water","Ink in hot water","Ink in ice","It is always the same"], a:1, x:"Hotter particles have more energy and move faster, so they spread out more quickly." },
        { k:"num", q:"Pure water boils at what temperature in °C (at normal air pressure)?", a:100, x:"Pure water boils at 100 °C and melts/freezes at 0 °C at normal atmospheric pressure. Impurities like salt change these temperatures." },
        { k:"tf", q:"True or false: When a solid melts, its particles gain energy and start to move past each other.", a:true, x:"Heating gives the particles enough energy to break out of their fixed positions, so they can slide past each other as a liquid." },
        { k:"mcq", q:"Which statement about liquids is correct?", o:["They have a fixed shape","They can be easily compressed","They take the shape of their container but keep their volume","Their particles are far apart"], a:2, x:"Liquid particles are close together (so the volume is fixed) but can move past each other (so the shape changes)." }
      ]
    },
    {
      id: "mixtures", title: "Elements, compounds and mixtures", strand: "MYP 2 · Chemistry",
      learn: {
        ideas: [
          "An element contains only one type of atom (e.g. oxygen O, iron Fe). Elements are listed in the Periodic Table.",
          "A compound has two or more elements chemically joined (e.g. water H₂O, carbon dioxide CO₂). It can only be split by a chemical reaction.",
          "A mixture has substances that are not chemically joined (e.g. air, salty water) and can be separated by physical methods.",
          "Separation methods: filtration (insoluble solid from liquid), evaporation (dissolved solid from solution), distillation (liquid from solution), chromatography (different dyes or inks), magnet (magnetic metals).",
          "A solute dissolves in a solvent to make a solution."
        ],
        example: "How do you get salt from salty sand?\n1. Add water and stir: the salt dissolves.\n2. Filter: the sand stays in the filter paper.\n3. Evaporate the water: salt crystals are left."
      },
      tasks: [
        { k:"mcq", q:"Which of these is an element?", o:["Water","Carbon dioxide","Iron","Salt"], a:2, x:"Iron (Fe) contains only iron atoms. Water (H₂O), carbon dioxide (CO₂) and salt (NaCl) are compounds of two or more elements." },
        { k:"mcq", q:"Which is a mixture?", o:["Oxygen","Air","Gold","Water"], a:1, x:"Air is a mixture of gases (mainly nitrogen and oxygen) that are not chemically joined." },
        { k:"mcq", q:"Which method separates sand from water?", o:["Evaporation","Filtration","Chromatography","Distillation"], a:1, x:"Sand is insoluble, so the filter paper traps it while the water passes through." },
        { k:"mcq", q:"Which method separates the different coloured dyes in black ink?", o:["Filtration","Magnet","Chromatography","Sieving"], a:2, x:"In chromatography, dyes travel different distances up the paper with the solvent, so they separate into bands." },
        { k:"mcq", q:"How can you get pure drinking water from sea water?", o:["Filtration","Distillation","Chromatography","Using a magnet"], a:1, x:"Distillation boils the water, the steam is cooled and condensed, and the salt is left behind. The UAE uses desalination plants based on ideas like this." },
        { k:"text", q:"Write the chemical formula for water.", a:["H2O","H₂O"], x:"Water is H₂O: two hydrogen atoms bonded to one oxygen atom." },
        { k:"mcq", q:"Sugar dissolves in tea. Which word describes the sugar?", o:["Solvent","Solute","Solution","Residue"], a:1, x:"The solute is the substance that dissolves (sugar). The solvent does the dissolving (water in the tea), and together they make a solution." },
        { k:"tf", q:"True or false: Iron filings can be separated from sulfur powder using a magnet.", a:true, x:"Iron is magnetic and sulfur is not, so a magnet pulls out the iron. This works because they are a mixture, not a compound (iron sulfide)." }
      ]
    },
    {
      id: "forces", title: "Forces and motion", strand: "MYP 2 · Physics",
      learn: {
        ideas: [
          "A force is a push or a pull, measured in newtons (N) with a newton meter.",
          "Balanced forces: the object stays still or keeps moving at the same speed. Unbalanced forces: it speeds up, slows down or changes direction.",
          "Resultant force = the overall force after adding forces in the same direction and subtracting opposite ones.",
          "Friction and air resistance oppose motion. Weight = mass × gravitational field strength (10 N/kg on Earth).",
          "Speed = distance ÷ time."
        ],
        example: "A box is pushed with 30 N to the right while friction is 12 N to the left.\nResultant = 30 − 12 = 18 N to the right, so the box speeds up to the right."
      },
      tasks: [
        { k:"mcq", q:"What is the unit of force?", o:["Kilogram","Newton","Joule","Metre"], a:1, x:"Force is measured in newtons (N), named after Isaac Newton. Kilograms measure mass and joules measure energy." },
        { k:"num", q:"A cyclist travels 600 m in 120 s. What is the speed in m/s?", a:5, x:"Speed = distance ÷ time = 600 ÷ 120 = 5 m/s." },
        { k:"num", q:"A trolley has 50 N pushing it forwards and 20 N of friction backwards. What is the resultant force in N?", a:30, x:"Forces in opposite directions are subtracted: 50 − 20 = 30 N forwards." },
        { k:"num", q:"What is the weight in N of a 45 kg student on Earth? (g = 10 N/kg)", a:450, x:"Weight = mass × g = 45 × 10 = 450 N. Mass stays 45 kg everywhere; weight changes with gravity." },
        { k:"mcq", q:"A car moves at a steady 60 km/h in a straight line. What can you say about the forces on it?", o:["They are unbalanced","They are balanced","There are no forces","Only friction acts"], a:1, x:"Constant speed in a straight line means the driving force exactly balances the resistive forces: the resultant is zero." },
        { k:"mcq", q:"Why do skydivers open a parachute?", o:["To increase their weight","To increase air resistance and slow down","To reduce gravity","To go faster"], a:1, x:"The large parachute pushes against much more air, so air resistance increases and they slow to a safe speed." },
        { k:"tf", q:"True or false: An astronaut's mass is smaller on the Moon than on Earth.", a:false, x:"Mass is the amount of matter and does not change. Their WEIGHT is smaller on the Moon because the Moon's gravity is weaker (about 1.6 N/kg)." },
        { k:"num", q:"A train travels at 25 m/s for 40 s. How far does it go in metres?", a:1000, x:"Rearrange speed = distance ÷ time: distance = speed × time = 25 × 40 = 1000 m." }
      ]
    },
    {
      id: "energy", title: "Energy and ecosystems", strand: "MYP 2 · Physics and Biology",
      learn: {
        ideas: [
          "Energy is stored in stores (kinetic, gravitational potential, chemical, thermal, elastic) and transferred by heating, forces, electricity and light or sound.",
          "Energy cannot be created or destroyed, only transferred (conservation of energy). Some is always wasted, usually as heat.",
          "Efficiency = useful energy out ÷ total energy in × 100%.",
          "In a food chain, arrows show the direction energy flows: grass → gazelle → cheetah.",
          "Producers (plants) make food by photosynthesis; consumers eat other organisms. Only about 10% of energy passes to the next level."
        ],
        example: "A lamp uses 200 J and gives out 50 J of light.\nEfficiency = 50 ÷ 200 × 100 = 25%. The other 150 J is wasted as heat."
      },
      tasks: [
        { k:"mcq", q:"Which energy store does a stretched elastic band have?", o:["Kinetic","Elastic potential","Thermal","Nuclear"], a:1, x:"Stretching or squashing something stores energy in its elastic potential store. When released, it transfers to kinetic energy." },
        { k:"mcq", q:"A ball falls from a shelf. Which energy change happens as it falls?", o:["Kinetic → chemical","Gravitational potential → kinetic","Thermal → elastic","Kinetic → gravitational potential"], a:1, x:"As height decreases, gravitational potential energy decreases and the ball speeds up, so kinetic energy increases." },
        { k:"num", q:"A motor uses 400 J of energy and does 300 J of useful work. What is its efficiency in %?", a:75, x:"Efficiency = useful ÷ total × 100 = 300 ÷ 400 × 100 = 75%." },
        { k:"tf", q:"True or false: Energy can be destroyed when a car brakes.", a:false, x:"Energy is never destroyed. When braking, kinetic energy is transferred to the thermal store of the brakes and surroundings." },
        { k:"mcq", q:"In the food chain grass → grasshopper → lizard → hawk, which is the producer?", o:["Hawk","Lizard","Grass","Grasshopper"], a:2, x:"Producers make their own food by photosynthesis. Grass is the producer; all the others are consumers." },
        { k:"mcq", q:"What do the arrows in a food chain show?", o:["Who is bigger","The direction energy is transferred","Where animals live","Who eats faster"], a:1, x:"Arrows point from the food to the eater, showing energy moving along the chain: grass → grasshopper means the grasshopper eats the grass." },
        { k:"mcq", q:"Why are there usually fewer top predators than herbivores?", o:["Predators live longer","Energy is lost at each level, so less is available higher up","Herbivores are smaller","Predators don't need energy"], a:1, x:"Only about 10% of energy passes on at each step; the rest is used in movement, heat and waste. Less energy can support fewer animals." },
        { k:"mcq", q:"Which gas do plants take in for photosynthesis?", o:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], a:2, x:"Photosynthesis: carbon dioxide + water → glucose + oxygen, using light energy absorbed by chlorophyll." }
      ]
    }
  ]
};
