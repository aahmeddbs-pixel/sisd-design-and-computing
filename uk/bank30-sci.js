/* Study Plus UK · extra revision questions (sciences), so every topic has at least 30.
   Line format: m<d>|question|RIGHT|wrong|wrong|wrong|explanation  (options are shuffled on screen)
                n<d>|question|number(~tolerance)|explanation   t<d>|statement|T or F|explanation   x<d>|question|answer/alternative|explanation
   Appended to the END of each topic's pool (pools are append-only). */
(function(){
window.SPBANK = window.SPBANK || function(U, key, txt){ const [s, t] = key.split("/"), S = U && U[s]; if (!S || !S.topics) return; const T = S.topics.find(x => x && x.id === t); if (!T) return; T.pool = T.pool || [];
  txt.trim().split("\n").forEach(l => { l = l.trim(); if (!l) return; const f = l.split("|"), k = f[0][0], d = +f[0].slice(1) || 1; let q = null;
    if (k === "m") q = { d, k:"mcq", q:f[1], o:f.slice(2, -1), a:0, x:f[f.length - 1] };
    else if (k === "n"){ const [v, tol] = f[2].split("~"); q = { d, k:"num", q:f[1], a:+v, x:f[3] }; if (tol) q.tol = +tol; }
    else if (k === "t") q = { d, k:"tf", q:f[1], a:f[2] === "T", x:f[3] };
    else if (k === "x"){ const a = f[2].split("/"); q = { d, k:"text", q:f[1], a:a.concat(a.map(v => v.toLowerCase())), best:a[0], x:f[3] }; }
    if (q && q.q) T.pool.push(q); }); };
const B = (k, t) => window.SPBANK(window.UK, k, t);

B("y8biology/cells", `
m1|Which organelle controls the cell's activities?|Nucleus|Cell membrane|Vacuole|Cell wall|The nucleus contains genetic material that controls the cell.
m1|Where do most chemical reactions in a cell happen?|Cytoplasm|Nucleus|Cell wall|Vacuole|Cytoplasm is the jelly where reactions take place.
m1|Which part controls what enters and leaves a cell?|Cell membrane|Cell wall|Nucleus|Chloroplast|The membrane is partially permeable.
m1|Which structure is found in plant cells but NOT animal cells?|Cell wall|Nucleus|Cytoplasm|Mitochondria|Plant cells also have chloroplasts and a permanent vacuole.
m2|What is the job of mitochondria?|Release energy by respiration|Make food|Store water|Control the cell|Aerobic respiration happens in mitochondria.
m2|What does a microscope's objective lens do?|Magnifies the specimen|Holds the slide|Lights the slide|Focuses the eyepiece only|Objective lenses (x4, x10, x40) sit just above the slide.
n2|An eyepiece is x10 and the objective is x40. What is the total magnification?|400|10 × 40 = 400.
m2|Why is a root hair cell long and thin?|Large surface area to absorb water|To store food|To photosynthesise|To protect the root|More surface means faster absorption.
m2|Why do red blood cells have no nucleus?|More room to carry oxygen|They are dead|To divide faster|To make energy|The space is filled with haemoglobin.
m3|Why are stains like iodine used on slides?|To make cell parts easier to see|To kill the cells|To magnify them|To keep them wet|Stains add contrast.
m3|What is a tissue?|A group of similar cells working together|A single cell|A group of organs|A whole organism|Cells → tissues → organs → organ systems → organism.
m3|Which order is correct?|Cell, tissue, organ, organ system|Tissue, cell, organ, system|Organ, cell, tissue, system|Cell, organ, tissue, system|Levels of organisation go from small to large.
x2|What is the green pigment in chloroplasts called?|chlorophyll|It absorbs light for photosynthesis.
`);
B("y8biology/body", `
m1|Which organ pumps blood around the body?|Heart|Lungs|Liver|Kidney|The heart is a muscular pump.
m1|Which blood vessels carry blood away from the heart?|Arteries|Veins|Capillaries|Nerves|Arteries have thick, muscular walls.
m1|Where does gas exchange happen in the lungs?|Alveoli|Trachea|Bronchi|Diaphragm|Alveoli are tiny air sacs with thin walls.
m2|Which gas passes from the blood into the alveoli?|Carbon dioxide|Oxygen|Nitrogen|Hydrogen|CO₂ is breathed out.
m2|What happens to the diaphragm when you breathe in?|It contracts and flattens|It relaxes and domes up|Nothing|It moves sideways|This increases chest volume so air rushes in.
m2|Which joint allows movement in all directions?|Ball and socket (e.g. shoulder)|Hinge (e.g. knee)|Fixed (e.g. skull)|Pivot only|Hinge joints move in one plane.
m3|Why do muscles work in antagonistic pairs?|Muscles can only pull, so one bends a joint and the other straightens it|Muscles push and pull|To save energy|They don't|Biceps and triceps are an example.
m3|Why does smoking reduce fitness?|Carbon monoxide reduces oxygen carried and tar damages alveoli|It makes muscles bigger|It speeds up breathing efficiency|It has no effect|Less oxygen reaches the muscles.
t2|Veins have valves to stop blood flowing backwards.|T|Blood in veins is at low pressure.
`);
B("y8biology/plants", `
m1|What gas do plants take in for photosynthesis?|Carbon dioxide|Oxygen|Nitrogen|Hydrogen|CO₂ enters through stomata.
m1|What is the word equation for photosynthesis?|Carbon dioxide + water → glucose + oxygen|Glucose + oxygen → carbon dioxide + water|Water + oxygen → glucose|Carbon dioxide → oxygen|Light energy is needed.
m1|Which part of the flower makes pollen?|Anther|Stigma|Ovary|Petal|The anther is on top of the filament (the stamen).
m2|What is pollination?|Transfer of pollen from anther to stigma|Seed spreading|Fertilisation of the ovule|Growth of a seed|Fertilisation happens afterwards.
m2|Why do wind-pollinated flowers have feathery stigmas?|To catch pollen from the air|To attract insects|To make nectar|To protect the seed|They are usually small and dull too.
m2|Which mineral is needed for healthy leaf growth?|Nitrates|Iron|Calcium|Sodium|Nitrates are used to make proteins.
m3|Why does a plant in the dark use up its starch store?|It can't photosynthesise but still respires|It photosynthesises faster|It stops respiring|Starch turns to oxygen|Respiration never stops.
m3|What are stomata?|Tiny pores in leaves that let gases in and out|Root hairs|Flower parts|Veins in leaves|Guard cells open and close them.
t2|Seeds are dispersed so new plants don't compete with the parent.|T|They compete less for light, water and minerals.
`);
B("y8biology/ecology", `
m1|What does a food chain arrow show?|The direction energy flows|What eats the arrow|Which is bigger|The order of size|Arrows point to the eater.
m1|What is a producer?|An organism that makes its own food (a plant)|An animal that eats plants|A decomposer|A predator|Producers start food chains.
m1|What is a predator?|An animal that hunts and eats other animals|A plant|Prey|A decomposer|Its food is called prey.
m2|Rabbits are removed from a food web. What may happen to the grass?|It increases|It decreases|Nothing|It dies out|Fewer herbivores eat it.
m2|What is an adaptation?|A feature that helps an organism survive in its habitat|A disease|A food chain|A type of soil|E.g. thick fur in cold places.
m2|What do decomposers do?|Break down dead material and recycle nutrients|Make food|Hunt prey|Pollinate|Bacteria and fungi are decomposers.
m3|Why can pesticides build up in top predators?|They aren't broken down and pass up the food chain (bioaccumulation)|Predators eat pesticides directly|Plants make them|They evaporate|Concentrations increase at each level.
m3|What is interdependence?|Organisms in an ecosystem depend on each other|Living alone|Only plants depend on soil|Animals competing|A change to one population affects others.
t2|Competition happens when organisms need the same limited resource.|T|For example light, water, food or mates.
`);
B("y8chemistry/particles", `
m1|In which state are particles closest together and vibrating?|Solid|Liquid|Gas|Plasma|They are in fixed positions.
m1|Which state takes the shape of its container but keeps its volume?|Liquid|Solid|Gas|None|Liquid particles slide past each other.
m1|What is diffusion?|Particles spreading from high to low concentration|Particles stopping|Melting|Freezing|It happens in liquids and gases.
m2|Why does diffusion happen faster when it is warmer?|Particles move faster|Particles grow|Particles stop|The container shrinks|More energy, more movement.
m2|What is gas pressure caused by?|Particles hitting the container walls|Particles sticking|Heat only|Gravity|More collisions = more pressure.
m2|Which change of state releases energy?|Freezing|Melting|Boiling|Evaporating|Energy is given out as bonds form.
m2|What is a pure substance?|A single element or compound with nothing mixed in|Any mixture|Tap water|Air|Pure substances have fixed melting points.
m3|Why does a pure substance melt at one exact temperature?|All its particles are identical, needing the same energy to separate|It is hot|It has impurities|It is a gas|Impurities widen the melting range.
m3|Why does a gas expand when heated?|Particles move faster and push further apart|Particles grow bigger|More particles appear|It loses mass|The number of particles stays the same.
m3|Why do solids not diffuse easily?|Particles are fixed in place|Particles are too fast|They are too light|They are hot|They can only vibrate.
t1|Mass is conserved when a substance changes state.|T|No particles are created or destroyed.
x2|What is the change from gas straight to solid called?|deposition|It is the opposite of sublimation.
`);
B("y8chemistry/acids", `
m1|What is the pH of a neutral solution?|7|0|14|1|Pure water has pH 7.
m1|Which pH is strongly acidic?|1|7|10|14|Lower pH = more acidic.
m1|What colour is universal indicator in a strong alkali?|Purple|Red|Green|Yellow|Green is neutral; red is strong acid.
m1|Which is an alkali?|Sodium hydroxide|Hydrochloric acid|Vinegar|Lemon juice|Alkalis are soluble bases.
m2|What is neutralisation?|An acid reacts with a base to form a salt and water|An acid boils|A base melts|A metal rusts|Acid + base → salt + water.
m2|What salt is made from hydrochloric acid?|A chloride|A sulfate|A nitrate|A carbonate|Sulfuric → sulfate, nitric → nitrate.
m2|Acid + metal → ?|Salt + hydrogen|Salt + water|Salt + carbon dioxide|Water only|Test: a lighted splint 'squeaky pops'.
m2|Acid + carbonate → ?|Salt + water + carbon dioxide|Salt + hydrogen|Water only|Oxygen|The fizzing gas turns limewater milky.
m3|Why do farmers add lime to fields?|To neutralise acidic soil|To make soil acidic|To kill weeds|To add water|Most crops grow best near pH 7.
m3|How is indigestion treated?|An antacid (a base) neutralises excess stomach acid|Drinking acid|Eating sugar|Adding salt|E.g. magnesium hydroxide tablets.
m3|Which salt forms from sulfuric acid and zinc?|Zinc sulfate|Zinc chloride|Zinc nitrate|Zinc oxide|Hydrogen gas is also made.
t2|Acids produce H⁺ ions in water.|T|Alkalis produce OH⁻ ions.
x1|What is the test result for hydrogen?|squeaky pop/a squeaky pop/pop|A lighted splint gives a squeaky pop.
`);
B("y8chemistry/earth", `
m1|Which type of rock forms from cooled magma or lava?|Igneous|Sedimentary|Metamorphic|Limestone|E.g. granite and basalt.
m1|Which rock type often contains fossils?|Sedimentary|Igneous|Metamorphic|Granite|Layers of sediment bury remains.
m1|What turns rocks into metamorphic rocks?|Heat and pressure|Weathering|Cooling lava|Erosion only|E.g. limestone → marble.
m2|Why does granite have large crystals?|Magma cooled slowly underground|It cooled quickly|It was squashed|It formed in water|Basalt cooled fast, so small crystals.
m2|What is weathering?|Breaking down rocks where they are|Moving rock pieces|Melting rock|Depositing sediment|Erosion moves the pieces away.
m2|What is freeze-thaw weathering?|Water in cracks freezes, expands and splits the rock|Rain dissolves rock|Plants grow|Wind blows sand|Ice takes up about 9% more space.
m2|Which layer of the Earth is liquid?|Outer core|Crust|Mantle|Inner core|The inner core is solid due to pressure.
m3|What is the rock cycle?|Rocks slowly change from one type to another over millions of years|A bike|Only erosion|A volcano|Processes include melting, weathering and compaction.
m3|What gas did the early atmosphere have lots of?|Carbon dioxide|Oxygen|Argon|Helium|Volcanoes released it; plants later added oxygen.
m3|About what percentage of today's air is nitrogen?|78%|21%|1%|50%|Oxygen is about 21%.
t2|Sedimentary rocks form by compaction and cementation of sediments.|T|Layers press down over time.
`);
B("y8physics/waves", `
m1|What does the amplitude of a sound wave affect?|Loudness|Pitch|Speed|Colour|Bigger amplitude = louder.
m1|What does frequency affect for sound?|Pitch|Loudness|Speed|Echo|Higher frequency = higher pitch.
m1|Can sound travel through a vacuum?|No|Yes|Only fast|Only loud sounds|Sound needs particles to travel.
m2|What is an echo?|A reflected sound|A refracted sound|A louder sound|A light wave|Hard flat surfaces reflect sound well.
m2|Why do we see lightning before hearing thunder?|Light travels much faster than sound|Sound is faster|They happen at different times|Eyes are quicker|Light ≈ 300 000 km/s; sound ≈ 340 m/s.
m2|What is the unit of frequency?|Hertz (Hz)|Decibel (dB)|Metre (m)|Newton (N)|1 Hz = 1 wave per second.
m3|What range of frequencies can humans hear?|About 20 Hz to 20 000 Hz|1 to 100 Hz|1 000 000 Hz|0 Hz only|Higher than this is ultrasound.
t2|Light is a transverse wave.|T|Its vibrations are at right angles to its direction.
`);

B("y10biology/variety", `
m1|What is the main way fungi feed?|Saprotrophic nutrition|Photosynthesis|Hunting|Filter feeding|They digest food outside their hyphae.
m1|Which group includes Mucor and yeast?|Fungi|Plants|Bacteria|Protoctists|Mucor is a mould; yeast is single-celled.
m1|Which organism is a plant used as a protoctist example?|Chlorella|Amoeba|Plasmodium|Mucor|Chlorella is a single-celled protoctist with chloroplasts.
m1|What do all bacteria lack?|A nucleus|DNA|A cell membrane|Cytoplasm|Their DNA is loose in the cytoplasm.
m2|Which is an example of a flowering plant?|Maize|Mucor|Amoeba|Lactobacillus|Peas and maize are cereals/legumes.
m2|How do animals usually coordinate their bodies?|Nervous system|Chloroplasts|Hyphae|Cell walls|Plants rely on hormones.
m2|Which feature do plant and fungal cells share?|A cell wall|Chloroplasts|Chitin|Glycogen storage only|Plant walls are cellulose; fungal walls are chitin.
m2|What does a virus contain?|DNA or RNA in a protein coat|A nucleus|Cytoplasm and ribosomes|Chloroplasts|Viruses are particles, not cells.
m2|Which pathogen causes pneumonia?|Pneumococcus (a bacterium)|Plasmodium|Mucor|Chlorella|Pneumococcus is a bacterium.
m3|What is the function of the slime capsule of some bacteria?|Protection|Photosynthesis|Reproduction|Digestion|It helps them avoid drying out and immune cells.
m3|Why are protoctists a varied group?|Some are plant-like and some are animal-like|They are all fungi|They are all viruses|They have no nucleus|Chlorella photosynthesises; Amoeba moves and feeds.
m3|Which life process is NOT shown by a virus outside a cell?|Any of them: nutrition, respiration, growth|Only reproduction|Only movement|They show all processes|They depend completely on host cells.
m3|HIV is a virus that infects…|White blood cells|Plant leaves|Bacteria|Red blood cells|It weakens the immune system.
t2|Fungi can be multicellular or single-celled.|T|Mucor is multicellular; yeast is single-celled.
x2|What is the network of fungal hyphae called?|mycelium|Hyphae branch to form a mycelium.
x1|Which carbohydrate do plants store?|starch|Animals and fungi store glycogen.
`);
B("y10biology/cells", `
m1|What are ribosomes for?|Making proteins|Respiration|Photosynthesis|Storing sap|Ribosomes join amino acids.
m1|What is diffusion?|Net movement of particles from high to low concentration|Movement against a gradient|Water only moving|Using energy to move|It is passive.
m2|What is osmosis?|Net movement of water through a partially permeable membrane from dilute to concentrated solution|Movement of salt|Active transport|Diffusion of gases|Water moves to where there is less water.
m2|What does active transport need?|Energy from respiration|No energy|Light|Water only|It moves substances against a gradient.
m2|A potato piece in salty water gets lighter. Why?|Water left by osmosis|Salt entered|It respired|It grew|Concentrated salt solution draws water out.
m2|What is a stem cell?|An unspecialised cell that can become different cell types|A dead cell|A red blood cell|A nerve cell only|Embryonic stem cells can become any type.
m3|How does surface area to volume ratio affect diffusion?|Larger ratio = faster diffusion|Smaller ratio = faster|No effect|Only temperature matters|Small cells exchange quickly.
m3|Why do plant cells not burst in pure water?|The cell wall resists expansion|They have no membrane|They lose water|They are dead|They become turgid.
m3|In mitosis the daughter cells are…|Genetically identical and diploid|Different and haploid|Four in number|Gametes|Mitosis is for growth and repair.
t2|Root hair cells absorb mineral ions by active transport.|T|Ions are more concentrated in the root than the soil.
`);
B("y10biology/organisation", `
m1|What do enzymes do?|Speed up reactions without being used up|Slow down reactions|Make DNA|Store energy|They are biological catalysts.
m2|Why does an enzyme stop working at high temperature?|Its active site changes shape (denatures)|It gets tired|It dissolves|It freezes|The substrate no longer fits.
m2|Which blood vessel has the thinnest walls?|Capillary|Artery|Vein|Aorta|One cell thick for fast exchange.
m2|What is the role of platelets?|Clotting blood|Carrying oxygen|Fighting infection|Carrying CO₂|They form scabs.
m3|What carries water up a plant?|Xylem|Phloem|Stomata|Root hair|Phloem carries sugars (translocation).
m3|What increases the rate of transpiration?|Higher temperature, wind and light|High humidity|Darkness|Cold, still air|Faster evaporation from leaves.
t2|The right ventricle pumps blood to the lungs.|T|The left ventricle pumps to the body.
`);
B("y10biology/infection", `
m1|Which type of pathogen is treated with antibiotics?|Bacteria|Viruses|All pathogens|Fungi only|Antibiotics don't work on viruses.
m1|How does the skin defend against pathogens?|It acts as a physical barrier|It makes antibiotics|It eats bacteria|It makes vaccines|Cuts are sealed by clots.
m2|What do lymphocytes produce?|Antibodies|Antibiotics|Hormones|Platelets|Antibodies bind to antigens on pathogens.
m2|What do phagocytes do?|Engulf and digest pathogens|Make antibodies|Clot blood|Carry oxygen|This is phagocytosis.
m2|What is in a vaccine?|Dead or weakened pathogens (or their antigens)|Antibiotics|Antibodies only|White blood cells|It triggers memory cells to form.
m2|Why is a second infection usually milder?|Memory cells make antibodies quickly|The pathogen is weaker|Antibiotics remain|The body is warmer|This is immunity.
m3|Why are doctors careful prescribing antibiotics?|Overuse leads to resistant bacteria|They are too cheap|They cure viruses|They make vaccines fail|Finish the full course too.
m3|How does mucus in the trachea help?|It traps pathogens; cilia sweep it away|It kills viruses|It makes antibodies|It warms the blood|Then it is swallowed.
m3|Why do antibodies only work against one pathogen?|They fit a specific antigen shape|They are general|They are enzymes|They are hormones|Each antigen has a unique shape.
t2|Herd immunity protects people who cannot be vaccinated.|T|The pathogen can't spread easily.
`);
B("y10biology/bioenergetics", `
m1|Where does photosynthesis happen?|Chloroplasts|Mitochondria|Nucleus|Ribosomes|Chlorophyll absorbs light.
m1|What does aerobic respiration need?|Glucose and oxygen|Only glucose|Carbon dioxide and water|Light|It releases energy, CO₂ and water.
m2|What is the product of anaerobic respiration in muscles?|Lactic acid|Ethanol|Oxygen|Glucose|Yeast makes ethanol and CO₂.
m2|Why does anaerobic respiration release less energy?|Glucose isn't fully broken down|It uses more oxygen|It is faster|It happens in plants only|It's used when oxygen is short.
m2|What is a limiting factor?|A factor in short supply that limits the rate|The fastest factor|A type of enzyme|An organ|E.g. light, CO₂ or temperature.
m3|What is oxygen debt?|Extra oxygen needed after exercise to break down lactic acid|Breathing slowly|Low oxygen in air|A disease|You keep breathing hard after exercise.
m3|What is the word equation for respiration in yeast without oxygen?|Glucose → ethanol + carbon dioxide|Glucose → lactic acid|Glucose + oxygen → CO₂ + water|Ethanol → glucose|Used in bread and brewing.
m3|How do leaves get carbon dioxide?|Through stomata by diffusion|Through roots|From water|From glucose|Air spaces in the leaf help diffusion.
m3|What is the test for starch in a leaf?|Boil, remove chlorophyll with ethanol, add iodine (blue-black)|Benedict's|Biuret|Limewater|Only parts that photosynthesised turn blue-black.
t2|Respiration happens in all living cells all the time.|T|Photosynthesis only happens in the light.
`);
B("y10biology/inheritance", `
m1|What is a gene?|A section of DNA that codes for a protein|A whole chromosome|A cell|An organism|Genes are on chromosomes.
m1|What shape is DNA?|A double helix|A single straight line|A circle only|A square|Two strands twisted together.
m1|How many pairs of chromosomes do humans have?|23|46|12|32|46 chromosomes in total.
m1|What is fertilisation?|Fusion of male and female gametes|Cell division|Pollination|Growth|It forms a zygote.
m2|What does homozygous mean?|Two identical alleles (e.g. BB or bb)|Two different alleles|One allele|No alleles|Heterozygous means two different alleles.
m2|In which organ does meiosis happen in males?|Testes|Ovaries|Heart|Brain|Meiosis makes sperm there.
m2|What is a mutation?|A random change in DNA|A new species|Mitosis|Fertilisation|Most have no effect; some are harmful or useful.
m2|Tt × tt. What fraction of offspring are tt?|1/2|1/4|3/4|0|Offspring: Tt, Tt, tt, tt.
n2|Bb × Bb gives 80 offspring. About how many show the recessive phenotype?|20|1/4 of 80 = 20.
m2|What is natural selection?|Organisms best suited to the environment survive and reproduce more|Choosing parents|Mutation only|Cloning|Their alleles become more common.
m3|What is a test cross used for?|To find whether a dominant phenotype is homozygous or heterozygous|To make clones|To find the sex|To count chromosomes|Cross with a homozygous recessive individual.
m3|What is a zygote?|The diploid cell formed at fertilisation|A gamete|A gene|A chromosome|It divides by mitosis to form an embryo.
m3|Why do plants that reproduce asexually all suffer from one new disease?|They are genetically identical, so none are resistant|They are too old|They grow too fast|They are diploid|No variation to survive the change.
m3|In plants, which part of the flower contains the female gametes?|Ovules in the ovary|Anther|Pollen|Petal|Pollen contains male gametes.
t2|Variation can be caused by genes, the environment, or both.|T|E.g. height depends on genes and diet.
x2|What is the name for a diagram of a family's inheritance?|family pedigree/pedigree/pedigree diagram/family tree|Shaded shapes show affected people.
x1|What is the genotype of a homozygous recessive blue-eyed person (B/b)?|bb|Two recessive alleles.
`);
B("y10biology/ecology", `
m1|What is a community?|All the populations living in an area|One species|The weather|Soil only|Community + environment = ecosystem.
m1|What is biodiversity?|The variety of species in an area|The number of one species|Plant growth|A type of pollution|High biodiversity makes ecosystems stable.
m1|Which process removes CO₂ from the air?|Photosynthesis|Respiration|Combustion|Decomposition|Plants use it to make glucose.
m2|What is a quadrat used for?|Sampling plants or slow animals in an area|Catching fish|Measuring rain|Testing soil pH|Place quadrats randomly.
m2|Why are quadrats placed randomly?|To avoid bias|To save time|To count faster|For neatness|Random sampling gives fairer estimates.
m2|What does a decomposer release into the soil?|Mineral ions (nutrients)|Oxygen|Glucose|Light|Nutrients are recycled.
m2|What is the role of nitrifying bacteria?|Convert ammonium into nitrates|Turn nitrates into nitrogen gas|Fix carbon|Cause disease|Plants absorb nitrates.
m2|Which gas from rice paddies and cattle is a greenhouse gas?|Methane|Oxygen|Argon|Nitrogen|It traps heat strongly.
m2|What is a trophic level?|A feeding level in a food chain|A type of soil|A habitat|A population|Producers are level 1.
m3|Why do food chains rarely have more than five levels?|Too little energy is left at higher levels|Animals get too big|Plants stop growing|Predators run out of prey only|About 90% is lost at each step.
m3|Why do lakes lose biodiversity during eutrophication?|Oxygen falls so many organisms die|Light increases|Water gets cleaner|Fish multiply|Bacteria use the oxygen.
m3|How can leaching of fertilisers be reduced?|Use the right amount at the right time; leave field margins|Use more fertiliser|Plough more|Cut hedges|Less runs off into rivers.
m3|What are CFCs blamed for?|Damaging the ozone layer|Acid rain|Eutrophication|Smog|They were used in fridges and aerosols.
m3|Which effect of global warming affects biodiversity?|Species' ranges shift and some cannot adapt|More rain only|Nothing|Fewer predators everywhere|Habitats change faster than species can move.
t2|Pyramids of biomass are almost always triangle shaped.|T|Biomass decreases at each trophic level.
x2|What is the name for the place where an organism lives?|habitat|Habitat = home; niche = role.
x2|What process in the nitrogen cycle is done by lightning and bacteria in root nodules?|nitrogen fixation/fixation|Nitrogen gas becomes nitrogen compounds.
`);
B("y10biology/resources", `
m1|Which microorganism is used to make bread?|Yeast|Lactobacillus|Mucor|Plasmodium|Yeast respires and produces CO₂.
m1|What does fertiliser add to soil?|Minerals such as nitrates, phosphates and potassium|Water only|Pesticides|Oxygen|They help crops grow.
m2|What is the role of ligase?|Joining DNA pieces together|Cutting DNA|Copying DNA|Breaking down fat|It seals the gene into the plasmid.
m2|What is a transgenic organism?|One containing a gene from another species|A clone|A hybrid|A mutant|E.g. bacteria with the human insulin gene.
m2|Why are GM crops made pest-resistant?|To reduce crop losses and pesticide use|To make them taste worse|To make them smaller|For colour|Yield increases.
m2|Why is the temperature in a fermenter controlled?|So enzymes in the microbes work at their optimum|To kill microbes|To make it cold|To add CO₂|Respiration releases heat, so cooling is needed.
m2|In brewing, what does yeast turn sugar into?|Ethanol and carbon dioxide|Lactic acid|Oxygen|Starch|Anaerobic respiration (fermentation).
m3|How was Dolly the sheep cloned?|A body cell nucleus was put into an enucleated egg cell|By selective breeding|By IVF only|By grafting|An electric shock started division.
m3|Why add milk bacteria at 40–45 °C when making yoghurt?|It's the optimum temperature for Lactobacillus enzymes|To kill them|To freeze milk|To add oxygen|The bacteria produce lactic acid, thickening the milk.
m3|One concern about GM crops is…|Genes may spread to wild plants|They grow too slowly|They need no water|They are clones|Long-term effects are debated.
m3|Why might fish farms affect the environment?|Waste and disease can spread to wild fish|They clean water|They plant trees|They use no food|Escaped fish can also compete.
m3|What is the benefit of using biological control over pesticides?|It targets the pest and leaves no chemical residue|It is instant|It kills everything|It's always cheap|The control species may become a pest, though.
t1|Selective breeding takes many generations.|T|Desired features are bred over time.
x2|Which hormone do GM bacteria produce for people with diabetes?|insulin|The human insulin gene is put into bacteria.
`);

B("y10chemistry/atoms", `
m1|What is the charge on a proton?|+1|−1|0|+2|Electrons are −1, neutrons 0.
m1|Where is most of an atom's mass?|In the nucleus|In the electrons|Spread evenly|Outside the atom|Protons and neutrons are heavy.
m2|What are isotopes?|Atoms of the same element with different numbers of neutrons|Different elements|Ions|Molecules|E.g. carbon-12 and carbon-14.
n2|Chlorine has 17 protons and a mass number of 35. How many neutrons?|18|35 − 17 = 18.
m2|What is the electron arrangement of sodium (11 electrons)?|2.8.1|2.8.2|2.9|8.2.1|Shells fill 2, then 8, then 8.
m2|Why are elements in the same group similar?|Same number of outer-shell electrons|Same mass|Same number of neutrons|Same colour|Outer electrons decide reactions.
m3|Why does relative atomic mass of chlorine = 35.5?|It's an average of isotopes 35 and 37 by abundance|Half neutrons|It's a mistake|Electrons add 0.5|75% Cl-35 and 25% Cl-37.
t2|The atomic number is the number of protons.|T|It also equals electrons in a neutral atom.
`);
B("y10chemistry/bonding", `
m1|Ionic bonding happens between…|A metal and a non-metal|Two non-metals|Two metals|Noble gases|Electrons are transferred.
m1|Covalent bonds involve…|Shared pairs of electrons|Transferred electrons|Free electrons|No electrons|Between non-metal atoms.
m2|What charge does a magnesium ion have?|2+|1+|2−|3+|Mg loses its two outer electrons.
m2|What is the formula of magnesium oxide?|MgO|Mg₂O|MgO₂|Mg₂O₃|Mg²⁺ and O²⁻ balance 1:1.
m2|Why do ionic compounds have high melting points?|Strong electrostatic forces between oppositely charged ions in a lattice|Weak forces|They are gases|Shared electrons|Lots of energy is needed.
m2|Why do metals conduct electricity?|Delocalised electrons move through the structure|Ions move|Protons move|They have no electrons|A 'sea' of electrons.
m3|Why does graphite conduct but diamond does not?|Each carbon in graphite has one delocalised electron|Diamond is ionic|Graphite is a metal|Diamond has no electrons|In diamond all 4 electrons are bonded.
m3|Why do simple molecular substances have low boiling points?|Weak intermolecular forces are easily overcome|Covalent bonds break easily|They are ionic|They contain metals|The covalent bonds don't break on boiling.
m3|When can ionic compounds conduct electricity?|When molten or dissolved|When solid|Never|Only when cold|Ions are free to move.
m3|What is the formula of aluminium oxide?|Al₂O₃|AlO|Al₃O₂|AlO₂|Al³⁺ × 2 = 6+, O²⁻ × 3 = 6−.
t2|Ions form so that atoms get a full outer shell.|T|Like a noble gas arrangement.
`);
B("y10chemistry/changes", `
m1|Which metal is most reactive?|Potassium|Copper|Gold|Iron|Group 1 metals are very reactive.
m1|What is made when a metal reacts with oxygen?|A metal oxide|A salt and hydrogen|Water|Carbon dioxide|E.g. magnesium oxide.
m2|What is a displacement reaction?|A more reactive metal pushes a less reactive metal out of its compound|Two metals combining|A metal melting|Burning|E.g. iron + copper sulfate.
m2|How is iron extracted from its ore?|Reduction with carbon in a blast furnace|Electrolysis|Heating alone|Dissolving|Iron is less reactive than carbon.
m2|Why is aluminium extracted by electrolysis?|It is more reactive than carbon|It's cheap|It's a liquid|It's unreactive|Carbon can't reduce it.
m2|What is reduction (in terms of oxygen)?|Loss of oxygen|Gain of oxygen|Gain of electrons only|Burning|Oxidation is gain of oxygen.
m2|During electrolysis, which ions move to the cathode?|Positive ions (cations)|Negative ions|Electrons|Neutrons|Metals or hydrogen form at the cathode.
m3|What forms at the anode in the electrolysis of molten lead bromide?|Bromine|Lead|Hydrogen|Oxygen|Negative bromide ions are oxidised.
m3|Why is rusting prevented by zinc coating (galvanising)?|Zinc is more reactive and corrodes first (sacrificial protection)|Zinc is unreactive|It looks nice|It removes oxygen|Even scratched, iron is protected.
m3|What does OIL RIG stand for?|Oxidation Is Loss, Reduction Is Gain (of electrons)|Oil and gas|Oxygen in lungs|Oxides in liquid|It's about electrons.
m3|Which gas is made at the cathode when aqueous sodium chloride is electrolysed?|Hydrogen|Sodium|Chlorine|Oxygen|Sodium is more reactive than hydrogen.
m3|How do you make a soluble salt from an insoluble base?|Add excess base to acid, filter, then crystallise|Mix two solutions|Electrolysis|Burn the base|Excess ensures all acid reacts.
t2|Copper does not react with dilute acids.|T|It is below hydrogen in the reactivity series.
`);
B("y10chemistry/rates", `
m1|Which reaction is fastest?|Powdered magnesium in warm, concentrated acid|A lump in cold dilute acid|A lump in cold water|Ribbon in dilute cold acid|All factors favour fast reaction.
m1|What is activation energy?|The minimum energy needed for particles to react|Energy released|The total energy|Heat lost|Collisions need at least this energy.
m1|Which gas is made when marble chips react with acid?|Carbon dioxide|Hydrogen|Oxygen|Chlorine|Marble is calcium carbonate.
m2|Why does a gas syringe help measure rate?|It measures volume of gas produced over time|It adds acid|It heats the flask|It cools it|Readings every 10 s give a graph.
m2|Why does mass go down when marble reacts with acid in an open flask?|Carbon dioxide escapes|Acid evaporates|The flask gets lighter|Mass is destroyed|Mass is conserved overall.
m2|How do enzymes relate to rates?|They are biological catalysts|They slow reactions|They are reactants|They are products|They lower activation energy.
n2|60 cm³ of gas is produced in 30 s. What is the mean rate in cm³/s?|2|60 ÷ 30 = 2 cm³/s.
n2|A reaction loses 1.2 g of mass in 40 s. Mean rate in g/s?|0.03~0.001|1.2 ÷ 40 = 0.03 g/s.
m2|In the 'disappearing cross' experiment, what makes the solution cloudy?|A sulfur precipitate|Bubbles|Heat|Colour change of indicator|Sodium thiosulfate reacts with acid.
m2|Why are catalysts important in industry?|Reactions are faster at lower temperatures, saving energy and money|They are used up|They make more product|They are cheap to replace each time|They can be reused.
m3|Why is the gradient steepest at the start of a rate graph?|Reactant concentration is highest|Products are highest|Temperature is lowest|Catalyst runs out|Concentration falls as it reacts.
m3|What does doubling concentration usually do to the number of collisions?|Roughly doubles them|Halves them|No change|Quadruples them always|Twice as many particles in the same volume.
m3|In an endothermic reversible reaction, the reverse reaction is…|Exothermic|Also endothermic|Neutral|Impossible|The same energy is transferred in the opposite direction.
m3|Ammonium chloride ⇌ ammonia + hydrogen chloride. What happens on cooling the gases?|Ammonium chloride reforms (white solid)|Nothing|It explodes|It turns blue|The reaction reverses.
m3|What is a closed system?|Nothing can enter or leave|Open to air|A system with no reactants|A heated flask|Needed for dynamic equilibrium.
m3|Why does a fine powder of flour in air explode?|Huge surface area gives an extremely fast reaction|It contains a catalyst|It is hot|It is a liquid|Flour mills ban sparks.
t2|A catalyst is chemically unchanged at the end of a reaction.|T|It can be used again.
x2|What word describes an experiment variable you change on purpose?|independent variable/independent|The dependent variable is what you measure.
`);
B("y10chemistry/organic", `
m1|What is crude oil?|A mixture of hydrocarbons|A pure compound|A single alkane|An element|It is separated by fractional distillation.
m1|Which fraction is used as aircraft fuel?|Kerosene|Bitumen|Fuel oil|Refinery gases|Kerosene is also called paraffin.
m1|What is the formula of methane?|CH₄|C₂H₆|CH₃|C₂H₄|The simplest alkane.
m1|Where do the shortest fractions leave the column?|At the top|At the bottom|In the middle|They don't leave|The column is cooler at the top.
m2|What is ethene's formula?|C₂H₄|C₂H₆|CH₄|C₃H₆|An alkene with a C=C double bond.
m2|Which fraction is used for car fuel?|Gasoline (petrol)|Bitumen|Fuel oil|Kerosene|Diesel is also used for cars and lorries.
n2|How many hydrogen atoms are in an alkene with 4 carbons?|8|Alkenes CₙH₂ₙ: 2 × 4 = 8 (butene).
m2|What is a homologous series?|Compounds with the same general formula and similar chemical properties|Mixtures of oil|Isomers|Polymers only|E.g. alkanes.
m2|Why is soot a problem?|It blackens buildings and can cause breathing problems|It warms the Earth only|It's a greenhouse gas|It's toxic like CO|Particulates harm lungs.
m2|What are isomers?|Same molecular formula, different structure|Same structure, different formula|Polymers|Ions|E.g. butane and methylpropane.
m3|What are the products of cracking decane (C₁₀H₂₂) into octane and ethene?|C₈H₁₈ + C₂H₄|C₈H₁₆ + C₂H₆|C₁₀H₂₀ + H₂|CO₂ + H₂O|Atoms must balance: 10 C, 22 H.
m3|What type of reaction is bromine water + ethene?|Addition|Substitution|Combustion|Cracking|Bromine adds across the double bond.
m3|What forms when methane reacts with chlorine in UV light?|Chloromethane and hydrogen chloride|Ethene|Carbon dioxide|Methanol|This is substitution.
m3|Why does incomplete combustion happen in faulty gas boilers?|Not enough oxygen reaches the flame|Too much oxygen|The fuel is cold|It uses water|A CO alarm detects the danger.
m3|Why is sulfur dioxide made when some fuels burn?|The fuel contains sulfur impurities|Air contains sulfur|Water contains sulfur|Nitrogen reacts|Removing sulfur reduces acid rain.
m3|What forms nitrogen oxides in car engines?|Nitrogen and oxygen from air react at high temperature|Fuel contains nitrogen|Water vapour|Carbon monoxide|Catalytic converters reduce them.
t2|Alkanes are fairly unreactive except for burning.|T|They only have single bonds.
x2|What is the name of the alkane C₃H₈?|propane|Meth-, eth-, prop-, but-.
`);
B("y10chemistry/groups", `
m1|What are Group 1 metals called?|Alkali metals|Halogens|Noble gases|Transition metals|They form alkaline solutions.
m1|What are the Group 7 elements called?|Halogens|Alkali metals|Noble gases|Metalloids|Fluorine, chlorine, bromine, iodine.
m1|Why are noble gases unreactive?|They have full outer shells|They are metals|They are heavy|They are liquids|They don't need to lose or gain electrons.
m2|What happens to reactivity going down Group 1?|It increases|It decreases|No change|It stops|The outer electron is lost more easily.
m2|What happens to reactivity going down Group 7?|It decreases|It increases|No change|It doubles|An electron is gained less easily.
m2|Sodium + water → ?|Sodium hydroxide + hydrogen|Sodium oxide + water|Sodium chloride|Salt + oxygen|It fizzes and floats.
m2|What colour is chlorine gas?|Pale green|Purple|Orange-brown|Colourless|Bromine is orange-brown; iodine forms purple vapour.
m3|Chlorine water is added to potassium bromide. What happens?|Bromine is displaced (orange solution)|No reaction|Chlorine is displaced|Iodine forms|Chlorine is more reactive than bromine.
m3|What is the test for chlorine?|It bleaches damp blue litmus paper (turns red first)|Squeaky pop|Relights a splint|Limewater milky|Chlorine is acidic and a bleach.
m3|Why are transition metals useful as catalysts?|They can form ions with different charges|They are soft|They float|They are unreactive|E.g. iron in the Haber process.
t2|Lithium is less reactive than potassium.|T|Potassium is lower in Group 1.
`);
B("y10physics/atomic", `
m1|What is an alpha particle?|2 protons and 2 neutrons (a helium nucleus)|An electron|An electromagnetic wave|A neutron|Alpha is the most ionising.
m1|What can stop beta radiation?|A few mm of aluminium|Paper|Nothing|Air only|Gamma needs thick lead or concrete.
m1|What is background radiation?|Radiation always around us from natural and man-made sources|Only from nuclear power|Sunlight|Radio waves|E.g. radon gas, rocks, cosmic rays.
m2|What is half-life?|The time for half the radioactive nuclei in a sample to decay|Half the mass of an atom|Half the speed|Time to decay completely|It's constant for an isotope.
n2|A sample's activity is 800 Bq. Its half-life is 2 days. Activity after 6 days?|100|800 → 400 → 200 → 100 (3 half-lives).
m2|What is nuclear fission?|Splitting a large nucleus into smaller ones, releasing energy|Joining small nuclei|Radioactive decay only|Burning uranium|Uranium-235 absorbs a neutron.
m3|What is a chain reaction in fission?|Neutrons released go on to split more nuclei|Electrons orbit|Gamma rays cool|Alpha decays|Control rods absorb neutrons to control it.
m3|What is nuclear fusion?|Light nuclei joining to make a heavier nucleus|Splitting uranium|Beta decay|Mining|It powers the Sun.
m3|Why is irradiation of food safe to eat?|The food does not become radioactive|It kills nutrients|It adds radiation|It's not safe|Gamma rays kill microbes.
t2|Gamma radiation has no mass and no charge.|T|It is an electromagnetic wave.
`);

B("y8revscience/nutrients", `
m1|Which nutrient insulates the body and stores energy?|Fat (lipid)|Protein|Fibre|Water|Fat is stored under the skin.
m1|Which food is rich in protein?|Eggs|Rice|Butter|Apples|Meat, fish, beans and eggs give protein.
m1|Which food is rich in carbohydrate?|Pasta|Fish|Cheese|Oil|Bread, rice and potatoes are carbohydrates too.
m1|Which vitamin is found in citrus fruit?|Vitamin C|Vitamin D|Vitamin A|Vitamin K|It prevents scurvy.
m1|Which mineral is needed for strong bones and teeth?|Calcium|Iron|Sodium|Zinc|Milk and cheese are good sources.
m2|What happens if you don't eat enough fibre?|Constipation|Scurvy|Rickets|Anaemia|Fibre keeps food moving.
m2|What does Benedict's solution turn with sugar after heating?|Brick red (or orange)|Blue-black|Purple|Cloudy white|It starts blue.
m2|What colour does biuret go if there is no protein?|Stays blue|Purple|Red|Black|Purple means protein.
m2|What is malnutrition?|Not having a balanced diet (too little or too much of nutrients)|Only eating too much|Eating vegetables|A vitamin|It includes both undernutrition and obesity.
m2|Which person needs the most energy per day?|A builder doing heavy work|A child|An office worker|A sleeping adult|Activity level increases energy needs.
m2|Why do pregnant women need extra iron and calcium?|To build the baby's blood and bones|To store fat|To slow digestion|They don't|Folic acid is also important.
m3|How is energy in food measured?|In kilojoules (kJ) or kilocalories|In grams|In metres|In newtons|Food labels show kJ.
m3|Why is a diet high in salt harmful?|It can raise blood pressure|It causes scurvy|It reduces energy|It's a vitamin|Too much sodium affects the heart.
m3|A food label shows 20 g fat per 100 g. How much fat is in 50 g?|10 g|20 g|5 g|40 g|Half of 100 g → half of 20 g.
t2|Vitamins and minerals are needed only in small amounts.|T|But lacking them causes deficiency diseases.
x1|Which nutrient helps keep food moving through the gut?|fibre/fiber|Found in wholegrains, fruit and vegetables.
`);
B("y8revscience/digestion", `
m1|What is the job of the teeth?|Mechanical digestion: breaking food into smaller pieces|Absorbing food|Making bile|Storing faeces|Bigger surface area helps enzymes.
m1|Where is faeces stored before leaving the body?|Rectum|Stomach|Liver|Oesophagus|It leaves through the anus.
m2|What is peristalsis?|Muscle waves that push food along the gut|Chewing|Absorption|An enzyme|It happens all along the gut.
m2|Which organ produces enzymes and releases them into the small intestine?|Pancreas|Liver|Heart|Rectum|It makes amylase, protease and lipase.
m2|Starch → ? (by amylase)|Sugars (glucose)|Amino acids|Fatty acids|Glycerol only|Sugars are small and soluble.
m2|What substance in saliva starts digesting starch?|Amylase|Bile|Protease|Acid|Chew bread and it tastes sweet.
m3|Why do enzymes work best at 37 °C in the body?|That's body temperature, their optimum|They are cold|They like heat|They denature at 37 °C|Too hot and they denature.
m3|What carries absorbed food molecules to the cells?|The blood|The lungs|Bile|The rectum|Capillaries in villi take them away.
m3|Which model can show digestion and absorption?|Visking tubing with starch and amylase in warm water|A balloon|A test tube of oil|A magnet|Small sugar molecules pass through; starch can't.
t2|The stomach churns food with acid and enzymes.|T|Churning is mechanical; enzymes are chemical.
`);
B("y8revscience/burning", `
m1|What do we call a reaction that gives out heat?|Exothermic|Endothermic|Neutral|Physical|Burning is exothermic.
m1|Which fuel is a fossil fuel?|Coal|Wood|Biogas|Hydrogen|Fossil fuels formed from ancient organisms.
m1|What does a fire need besides fuel and heat?|Oxygen|Water|Nitrogen|Carbon dioxide|Remember the fire triangle.
m1|Which word describes iron rusting?|Oxidation|Reduction|Melting|Dissolving|Iron gains oxygen.
m2|Hydrogen + oxygen → ?|Water|Carbon dioxide|Hydrogen oxide gas only|Methane|Hydrogen is a clean fuel.
m2|Why does a candle go out under a jar?|The oxygen is used up|The jar is cold|The wax melts|Carbon dioxide is fuel|No oxygen, no fire.
m2|Which product of burning turns cobalt chloride paper from blue to pink?|Water|Carbon dioxide|Oxygen|Soot|Cobalt chloride tests for water.
m2|What is incomplete combustion?|Burning with too little oxygen|Burning with lots of oxygen|Melting|Freezing|It makes CO and soot.
m2|Copper + oxygen → ?|Copper oxide|Copper carbonate|Copper hydroxide|Copper chloride|Copper turns black when heated.
m3|Why is a blue Bunsen flame better for heating?|It's hotter and cleaner (complete combustion)|It's safer to see|It's cooler|It makes soot|The yellow flame is easy to see, so it's the safety flame.
m3|Why do fuels need a spark or flame to start burning?|To provide activation energy|To add oxygen|To cool them|To remove fuel|Then the reaction keeps itself going.
m3|What is the formula for carbon dioxide?|CO₂|CO|C₂O|O₂C₂|One carbon, two oxygens.
m3|Methane burns. Which two products show complete combustion?|Carbon dioxide and water|Carbon monoxide and soot|Hydrogen and carbon|Oxygen and water|Plenty of oxygen is needed.
t2|In a closed container, mass stays the same when something burns.|T|Mass is conserved.
x2|Which gas test gives a 'squeaky pop'?|hydrogen|Oxygen relights a glowing splint.
`);
B("y8revscience/pollution", `
m1|What does the greenhouse effect do?|Traps heat in the atmosphere|Cools the Earth|Makes rain|Creates oxygen|It keeps Earth warm enough for life.
m1|Which gas is released by cars and is toxic?|Carbon monoxide|Oxygen|Nitrogen|Water vapour|It stops blood carrying oxygen.
m1|Which energy source does NOT release carbon dioxide when used?|Solar power|Coal|Oil|Natural gas|Renewables reduce emissions.
m2|How does acid rain affect lakes?|Fish and plants can die|Water gets cleaner|More fish grow|Nothing|Aluminium is released from soil too.
m2|What is a carbon footprint?|The total greenhouse gases caused by a person or activity|A footprint in soil|Coal mining|A type of fossil|Flying and eating meat add to it.
m2|Why does cutting forests add to global warming?|Fewer trees absorb CO₂ and burning releases it|Trees make CO₂|It cools the planet|Soil absorbs heat|Forests are carbon stores.
m2|What should you do first if clothes catch fire?|Stop, drop and roll|Run|Throw water on electrics|Open windows|Rolling smothers the flames.
m2|Why are smoke alarms important?|They give early warning of fire|They put out fires|They remove smoke|They cool the room|Test them regularly.
m3|Why has the amount of CO₂ in the air risen since 1800?|Burning more fossil fuels and deforestation|More volcanoes only|More plants|Less traffic|Industrial activity increased emissions.
m3|What is one effect of climate change on weather?|More extreme events such as floods and droughts|Always colder|No change|Less wind always|Weather patterns shift.
m3|What does a scrubber in a power station chimney remove?|Sulfur dioxide|Oxygen|Water|Nitrogen|It reduces acid rain.
m3|Why might electric cars still cause pollution?|The electricity may come from fossil fuel power stations|They burn petrol|They release SO₂|They don't|It depends on the energy source.
m3|What are particulates linked to?|Asthma and heart and lung disease|Stronger bones|Acid rain only|The ozone layer|Diesel engines release them.
t2|Water should never be used on an oil fire.|T|Use a fire blanket or a foam/powder extinguisher.
x2|What layer of gas high up protects us from UV light?|ozone/ozone layer|CFCs damaged it.
`);
B("y8revscience/particles", `
m1|Which state has particles moving quickly in all directions?|Gas|Solid|Liquid|None|Gas particles are far apart.
m1|What is freezing?|Liquid → solid|Solid → liquid|Gas → liquid|Liquid → gas|Water freezes at 0 °C.
m1|At what temperature does pure ice melt?|0 °C|100 °C|−10 °C|37 °C|Melting point of water.
m1|Which state has a fixed shape?|Solid|Liquid|Gas|All of them|Particles are held in place.
m2|What is boiling?|A liquid turning to gas throughout, at its boiling point|Evaporating at the surface|Melting|Freezing|Bubbles form inside the liquid.
m2|Why can liquids flow?|Particles can move past each other|Particles are fixed|Particles are far apart|Particles don't move|But they stay touching.
m2|What happens to particles when a solid is heated?|They vibrate more|They stop|They shrink|They disappear|Eventually they break free and it melts.
m2|Why does a metal railway track have gaps?|The metal expands in hot weather|To save metal|To drain water|For trains to slow down|Particles vibrate more and take more space.
m2|What is the melting point of a substance?|The temperature at which it changes from solid to liquid|Where it boils|Where it freezes into gas|Room temperature|Same as its freezing point.
m3|Wax is heated: it melts at 55 °C and boils at 300 °C. What state is it at 100 °C?|Liquid|Solid|Gas|Plasma|Between melting and boiling points.
m3|Why does steam cause worse burns than boiling water at the same temperature?|Steam releases extra energy when it condenses on skin|Steam is hotter|Water is colder|Steam is wet|Condensing releases energy.
m3|What is a heating curve flat section showing?|A change of state (temperature stays constant)|Cooling|Faster heating|An error|Energy is breaking forces between particles.
m3|Why does perfume smell spread faster in a warm room?|Particles move faster in warmer air|The perfume gets bigger|The room is larger|Air stops moving|Diffusion speeds up.
t2|Gases have no fixed volume.|T|They spread out to fill any container.
x2|What is the change from liquid to gas at the surface, below boiling point, called?|evaporation/evaporating|Puddles dry by evaporation.
`);

B("y8biology/body", `
m1|What do the kidneys do?|Filter waste from the blood to make urine|Pump blood|Digest food|Make bile|Urine is stored in the bladder.
m2|What carries oxygen in red blood cells?|Haemoglobin|Plasma|Platelets|Antibodies|It turns bright red with oxygen.
m3|Why do we have ribs and intercostal muscles?|To protect the lungs and help breathing|To digest food|To pump blood|To make blood cells only|Intercostals raise the ribs when breathing in.
`);
B("y10biology/organisation", `
m2|What is the pacemaker of the heart?|A group of cells in the right atrium that controls heart rate|A valve|The aorta|The left ventricle|Artificial pacemakers can replace it.
m2|What is coronary heart disease?|Fatty deposits narrowing the coronary arteries|A heart valve leak|Low blood sugar|An infection of the lungs|Treated with stents or statins.
m3|Why does a leaf have a large surface area?|To absorb more light and gases|To store water|To protect the plant|To hold more stomata only|Thin too, for short diffusion distances.
m3|What is translocation?|Movement of sugars through the phloem|Water moving up xylem|Loss of water from leaves|Root hairs absorbing minerals|It goes up and down the plant.
`);
B("y10biology/resources", `
m2|What is a GM crop?|A crop with genes changed or added from another organism|A crop grown organically|A hybrid only|A crop grown in water|E.g. Bt maize.
m3|Why are greenhouses heated in winter?|Warmth speeds up enzyme-controlled photosynthesis|To kill pests|To add water|For light only|Temperature can be a limiting factor.
m3|Why are antibiotics sometimes added to fish farms, and why is that a concern?|To prevent disease, but it can lead to resistant bacteria|To feed fish|To clean water|It is never a concern|Overuse breeds resistance.
`);
B("y10chemistry/atoms", `
m1|What is the charge on a neutron?|0|+1|−1|+2|Neutrons are neutral.
m1|What is the mass number?|Protons + neutrons|Protons only|Electrons only|Protons + electrons|Shown at the top of the symbol.
n2|Sodium has atomic number 11 and mass number 23. How many neutrons?|12|23 − 11 = 12.
m2|How many electrons can the second shell hold?|8|2|18|4|The first shell holds 2.
m3|What did Rutherford's gold foil experiment show?|Atoms have a tiny, dense, positive nucleus|Atoms are solid balls|Electrons are in a cloud only|Atoms have no charge|Most alpha particles passed straight through.
`);
})();
