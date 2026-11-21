/* Study Plus · IB MYP 2 (Grade 7) · Science: understanding sound waves.
   Four topics. Calculation generators (speed of sound, echoes, frequency, wavelength, sonar) and fact generators
   (each fact can come as multiple choice or true/false) give hundreds of different questions.
   Videos: Oak National Academy KS3 'Sound, light and vision' lessons; BBC Bitesize. */
(function(){
"use strict";
const G7 = window.G7, G = window.G7GEN, SC = window.STUDY && window.STUDY.science; if (!G7 || !G || !SC) return;

/* shared fact generator: f = { d, q, a, w:[wrong…], x, t:"true statement", f:"false statement" } */
G7.factGen = (FACTS) => (d, r) => { const K = G7.kit(r); let L = FACTS.filter(f => f.d === d); if (!L.length) L = FACTS; const f = K.pick(L);
  const form = (f.t || f.f) && K.int(0, 2) === 0 ? "tf" : "mcq";
  if (form === "tf"){ const truth = f.f ? K.int(0, 1) === 1 : true; return { d, k:"tf", q:`True or false?\n${truth ? (f.t || f.q + " " + f.a) : f.f}`, a:truth, x:(truth ? "True. " : "False. ") + f.x }; }
  return G7.mcq(d, f.q, f.a, K.shuffle(f.w).slice(0, 3), f.x); };
const F = (d, q, a, w, x, t, f) => ({ d, q, a, w, x, t, f });

/* ================= 1. How sound is made and travels ================= */
const MAKE = [
 F(1, "What causes every sound?", "Vibrations", ["Light", "Magnets", "Heat"], "All sounds are made by something vibrating: a guitar string, your vocal cords, a speaker cone.", "All sounds are caused by vibrations.", "Sounds are caused by light hitting objects."),
 F(1, "What does sound need to travel through?", "A medium (a solid, liquid or gas)", ["Nothing: it travels anywhere", "Only air", "Only water"], "Sound passes from particle to particle, so it needs a medium.", "Sound needs a medium to travel through.", "Sound can travel through empty space."),
 F(1, "Can sound travel through a vacuum (e.g. space)?", "No, there are no particles to pass on the vibrations", ["Yes, faster than in air", "Yes, but quietly", "Only high sounds can"], "A vacuum has no particles, so sound can't travel. Astronauts use radios, which use radio waves, not sound.", "Sound cannot travel through a vacuum.", "Astronauts can shout to each other in space without radios."),
 F(1, "Which part of your body vibrates when you speak?", "Vocal cords (in the voice box/larynx)", ["Eardrum", "Tongue only", "Lungs"], "Air from the lungs makes the vocal cords vibrate.", "Your vocal cords vibrate when you speak.", "Your eardrum makes the sound when you speak."),
 F(1, "What vibrates to make the sound of a drum?", "The drum skin", ["The drumstick only", "The floor", "Your ears"], "Hitting the skin makes it vibrate; it pushes the air particles back and forth.", "Hitting a drum makes the drum skin vibrate.", "A drum makes sound without vibrating."),
 F(2, "What kind of wave is sound?", "Longitudinal", ["Transverse", "Electromagnetic", "Light"], "In a longitudinal wave the particles vibrate backwards and forwards in the SAME direction the wave travels.", "Sound is a longitudinal wave.", "Sound is a transverse wave like light."),
 F(2, "In a sound wave, what is a compression?", "A region where particles are squashed close together", ["A region where particles are spread out", "The top of a wave", "A gap with no particles"], "Compressions (close together) and rarefactions (spread out) travel along.", "Compressions are where particles are close together.", "Compressions are where particles are spread far apart."),
 F(2, "What is a rarefaction?", "A region where particles are spread out", ["A region where particles are squashed", "A loud sound", "A type of echo"], "Rarefactions alternate with compressions in a sound wave.", "A rarefaction is where particles are spread out.", "A rarefaction is the loudest part of a sound."),
 F(2, "In which material does sound travel fastest?", "Steel (a solid)", ["Water", "Air", "A vacuum"], "Particles in solids are closest and strongly bonded, so vibrations pass on fastest (~5000 m/s in steel).", "Sound travels faster in solids than in gases.", "Sound travels fastest in air."),
 F(2, "About how fast does sound travel in air?", "About 340 m/s", ["About 3 m/s", "About 300 000 km/s", "About 34 000 m/s"], "Around 330–340 m/s depending on temperature. Light is nearly a million times faster.", "Sound travels at about 340 m/s in air.", "Sound travels faster than light."),
 F(2, "About how fast does sound travel in water?", "About 1500 m/s", ["About 34 m/s", "About 340 m/s", "About 150 000 m/s"], "Water particles are closer than air particles, so sound travels about 4–5 times faster.", "Sound travels faster in water than in air.", "Sound travels slower in water than in air."),
 F(2, "When a sound wave travels through air, do the air particles travel with it all the way to your ear?", "No: each particle just vibrates back and forth; the energy moves on", ["Yes, they fly to your ear", "Only on windy days", "Yes, at 340 m/s"], "The wave carries energy, not the particles themselves.", "Air particles vibrate on the spot as sound passes.", "Air particles travel all the way from the source to your ear."),
 F(3, "Why do we see lightning before we hear thunder?", "Light travels much faster than sound", ["Thunder happens later", "Sound travels faster but starts later", "Our eyes are closer to the sky"], "They happen together, but light arrives almost instantly while sound takes about 3 seconds per kilometre.", "We see lightning first because light is faster than sound.", "Thunder is made after lightning, which is why we hear it later."),
 F(3, "Why does sound travel faster in solids than in gases?", "Particles are closer together and strongly linked, so vibrations are passed on more quickly", ["Solids are heavier", "Solids are colder", "Gases block sound completely"], "Close, tightly bonded particles pass on vibrations fastest.", "Closer particles pass on vibrations faster.", "Gas particles are closer together than solid particles."),
 F(3, "A bell in a jar is ringing. The air is pumped out. What happens?", "The sound gets quieter and disappears, but you still see the bell moving", ["It gets louder", "Nothing changes", "The bell stops moving"], "With no air (a vacuum) there's nothing to carry the vibrations to your ear.", "As air is removed from a bell jar, the ringing gets quieter.", "Removing the air makes a ringing bell louder.")
];
G["science/soundmaking"] = G7.factGen(MAKE);

/* ================= 2. Pitch, loudness and wave traces ================= */
const PITCHF = [
 F(1, "What does the frequency of a sound wave tell you?", "How many waves (vibrations) pass each second", ["How loud it is", "How far it travels", "How fast it travels"], "Frequency is measured in hertz (Hz): 1 Hz = 1 wave per second.", "Frequency is the number of waves per second.", "Frequency tells you how loud a sound is."),
 F(1, "What is the unit of frequency?", "Hertz (Hz)", ["Decibel (dB)", "Metre (m)", "Newton (N)"], "Named after Heinrich Hertz.", "Frequency is measured in hertz.", "Frequency is measured in decibels."),
 F(1, "A higher frequency gives a…", "Higher pitch", ["Louder sound", "Lower pitch", "Quieter sound"], "More vibrations per second = higher (squeakier) note.", "Higher frequency means higher pitch.", "Higher frequency means a louder sound."),
 F(1, "What does the amplitude of a sound wave affect?", "Loudness (volume)", ["Pitch", "Speed", "Colour"], "Bigger vibrations (larger amplitude) carry more energy = louder.", "A larger amplitude makes a louder sound.", "A larger amplitude makes a higher pitch."),
 F(1, "What is loudness measured in?", "Decibels (dB)", ["Hertz (Hz)", "Metres", "Seconds"], "Whispering is about 30 dB; a rock concert about 110 dB.", "Loudness is measured in decibels.", "Loudness is measured in hertz."),
 F(2, "What is the human hearing range?", "About 20 Hz to 20 000 Hz", ["About 1 Hz to 100 Hz", "About 20 000 Hz to 100 000 Hz", "All frequencies"], "We lose some high frequencies as we get older.", "Humans hear from about 20 Hz to 20 000 Hz.", "Humans can hear all frequencies of sound."),
 F(2, "What is ultrasound?", "Sound with a frequency above 20 000 Hz (too high for humans)", ["Very loud sound", "Sound below 20 Hz", "Sound in space"], "Bats, dolphins and medical scanners use ultrasound.", "Ultrasound is too high for humans to hear.", "Ultrasound is very low-pitched sound."),
 F(2, "What is infrasound?", "Sound below 20 Hz (too low for humans)", ["Sound above 20 000 Hz", "Very quiet sound", "Sound in water only"], "Elephants and whales communicate using infrasound.", "Infrasound is below the human hearing range.", "Infrasound is too high-pitched to hear."),
 F(2, "On a wave diagram, what is the wavelength?", "The distance from one point on a wave to the same point on the next wave", ["The height of the wave", "The number of waves per second", "The time for one wave"], "E.g. crest to crest, or compression to compression.", "Wavelength is the distance between two neighbouring crests.", "Wavelength is the height of a wave."),
 F(2, "On a wave diagram, what is the amplitude?", "The height from the middle line to a crest", ["From a crest to a trough", "The length of one wave", "The number of crests"], "Amplitude is measured from the rest position, not trough to crest.", "Amplitude is measured from the middle line to the top of a wave.", "Amplitude is the distance from one crest to the next."),
 F(3, "Why does a short guitar string give a higher note than a long one?", "It vibrates faster (higher frequency)", ["It vibrates more slowly", "It has a bigger amplitude", "It is louder"], "Shorter, tighter or thinner strings vibrate faster.", "Shorter strings vibrate faster and give higher notes.", "Longer strings give higher notes."),
 F(3, "As frequency increases (same speed), what happens to wavelength?", "It gets shorter", ["It gets longer", "It stays the same", "It becomes zero"], "speed = frequency × wavelength, so if frequency goes up, wavelength must go down.", "Higher frequency sound waves have shorter wavelengths.", "Higher frequency sound waves have longer wavelengths."),
 F(3, "How can you make a ruler twanging on a desk give a higher note?", "Make the overhanging part shorter", ["Make the overhanging part longer", "Flick it harder", "Use a heavier ruler only"], "A shorter part vibrates faster: higher frequency, higher pitch.", "A shorter overhang on a twanging ruler gives a higher note.", "Flicking a ruler harder gives a higher note.")
];
G["science/soundpitch"] = (d, r) => { const K = G7.kit(r);
  if (K.int(0, 2) > 0) return G7.factGen(PITCHF)(d, r);
  const w1 = K.int(2, 6), h1 = K.int(1, 4); let w2 = w1, h2 = h1; const which = K.pick(d === 1 ? ["w", "h"] : ["w", "h", "both"]);
  if (which !== "h") w2 = w1 + K.pick([2, 3, 4]); if (which !== "w") h2 = h1 + K.pick([1, 2]);
  const sw = K.int(0, 1), A = sw ? [w2, h2] : [w1, h1], B = sw ? [w1, h1] : [w2, h2];
  const desc = `Oscilloscope traces (same settings):\nTrace A: ${A[0]} waves across the screen, ${A[1]} squares tall.\nTrace B: ${B[0]} waves across the screen, ${B[1]} squares tall.`;
  const askPitch = which === "w" || (which === "both" && K.int(0, 1));
  if (askPitch){ const hi = A[0] > B[0] ? "A" : "B"; return G7.mcq(d, `${desc}\nWhich sound has the higher pitch?`, `Trace ${hi}`, [`Trace ${hi === "A" ? "B" : "A"}`, "They have the same pitch", "You can't tell from a trace"], `More waves on the screen = higher frequency = higher pitch. Trace ${hi} has more waves. (The height only tells you the loudness.)`); }
  const lo = A[1] > B[1] ? "A" : "B"; return G7.mcq(d, `${desc}\nWhich sound is louder?`, `Trace ${lo}`, [`Trace ${lo === "A" ? "B" : "A"}`, "They are equally loud", "You can't tell from a trace"], `Taller waves = bigger amplitude = louder sound. Trace ${lo} is taller. (The number of waves tells you the pitch.)`);
};

/* ================= 3. Echoes, hearing and using sound ================= */
const HEARF = [
 F(1, "What is an echo?", "A reflected sound", ["A refracted sound", "A very loud sound", "A sound in space"], "Sound bounces off hard surfaces like cliffs and walls.", "An echo is a reflected sound.", "An echo is a sound that has been absorbed."),
 F(1, "Which surfaces reflect sound best?", "Hard, smooth surfaces like tiles and glass", ["Soft surfaces like curtains", "Carpet", "Foam"], "Soft materials absorb sound instead.", "Hard, smooth surfaces reflect sound well.", "Curtains reflect sound better than tiles."),
 F(1, "Which part of the ear vibrates first when sound arrives?", "The eardrum", ["The cochlea", "The auditory nerve", "The ear lobe"], "The eardrum is a thin membrane at the end of the ear canal.", "Sound makes the eardrum vibrate.", "Sound goes straight to the brain without anything vibrating."),
 F(1, "What does the outer ear (pinna) do?", "Collects and funnels sound into the ear canal", ["Turns sound into electrical signals", "Makes sound louder by vibrating", "Balances the body"], "Its shape guides sound waves inwards.", "The outer ear funnels sound into the ear canal.", "The outer ear changes sound into electrical signals."),
 F(2, "What are the three tiny bones in the middle ear called?", "The ossicles (hammer, anvil and stirrup)", ["The vertebrae", "The cochlea and nerve", "The skull bones"], "They pass on and amplify the vibrations from the eardrum to the cochlea.", "The ossicles pass vibrations from the eardrum to the cochlea.", "The ossicles are found in the outer ear."),
 F(2, "What does the cochlea do?", "Changes vibrations into electrical signals using tiny hairs", ["Collects sound", "Holds earwax", "Makes sound louder"], "Hair cells in the fluid-filled cochlea send signals along the auditory nerve to the brain.", "The cochlea turns vibrations into electrical signals.", "The cochlea collects sound from outside."),
 F(2, "What carries the signals from the ear to the brain?", "The auditory nerve", ["The eardrum", "The ear canal", "The ossicles"], "The brain then interprets the signals as sound.", "The auditory nerve carries signals to the brain.", "Blood carries sound signals to the brain."),
 F(2, "How do soft materials like curtains and carpets reduce noise?", "They absorb sound energy", ["They reflect sound", "They make sound faster", "They change its pitch"], "That's why empty rooms with hard floors sound echoey.", "Soft materials absorb sound.", "Soft materials reflect most sound."),
 F(2, "How can very loud sounds damage hearing?", "They can damage the tiny hair cells in the cochlea", ["They melt the eardrum", "They make ears grow", "They can't"], "Hair cells don't grow back, so damage can be permanent. Use ear defenders.", "Very loud sounds can damage hair cells in the cochlea.", "Hair cells in the ear always grow back after damage."),
 F(3, "How do bats find food in the dark?", "Echolocation: they send out ultrasound and listen for echoes", ["They see in the dark", "They use smell only", "They use infrasound to scare insects"], "The time for the echo tells them how far away an object is.", "Bats use echoes of ultrasound to find insects.", "Bats use light to find insects at night."),
 F(3, "What is sonar used for?", "Finding the depth of the sea or locating objects underwater using echoes", ["Measuring temperature", "Making music", "Seeing stars"], "Ships send pulses of sound down and time the echo.", "Ships use sonar echoes to measure sea depth.", "Sonar uses light to measure the depth of the sea."),
 F(3, "Why is ultrasound used to scan unborn babies instead of X-rays?", "It is safe: it doesn't damage cells", ["It is cheaper only", "It shows colours", "It is louder"], "Echoes from different tissues build up a picture.", "Ultrasound scans are safe for unborn babies.", "Ultrasound scans use X-rays."),
 F(3, "Why do concert halls have soft seats and special wall panels?", "To absorb sound and stop too many echoes (reverberation)", ["To make sound louder", "To keep warm", "For decoration only"], "Some reflection is good, but too much makes music blurry.", "Concert halls absorb some sound to reduce echoes.", "Concert halls are designed to reflect every sound as much as possible.")
];
G["science/soundhearing"] = G7.factGen(HEARF);

/* ================= 4. Sound calculations ================= */
const v = 340;
G["science/soundcalc"] = (d, r) => { const K = G7.kit(r);
  if (d === 1){ const k = K.int(0, 2);
    if (k === 0){ const M = K.pick([["air", 340], ["air", 330], ["water", 1500], ["steel", 5000], ["wood", 4000], ["glass", 4500]]), t = K.pick([2, 3, 4, 5, 6, 8, 10, 0.5, 1.5]), D = r6(M[1] * t); return { d:1, k:"num", q:`Sound travels ${D} m through ${M[0]} in ${t} s. What is the speed of sound in ${M[0]}, in m/s?`, a:M[1], x:`Speed = distance ÷ time\n= ${D} ÷ ${t}\n= ${M[1]} m/s.` }; }
    if (k === 1){ const t = K.pick([1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12]); return { d:1, k:"num", q:`Thunder is heard ${t} s after the lightning is seen. Sound travels at 340 m/s. How far away is the storm, in metres?`, a:r6(v * t), x:`Light arrives almost instantly, so the sound took ${t} s.\nDistance = speed × time = 340 × ${t} = ${r6(v * t)} m.` }; }
    const f = K.pick([2, 4, 5, 8, 10, 20, 25, 50, 100, 128, 200, 256, 440, 512]), t = K.int(2, 10); return { d:1, k:"num", q:`A tuning fork vibrates ${f * t} times in ${t} seconds. What is its frequency, in Hz?`, a:f, x:`Frequency = number of vibrations ÷ time\n= ${f * t} ÷ ${t} = ${f} Hz.` }; }
  if (d === 2){ const k = K.int(0, 2);
    if (k === 0){ const t = K.pick([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8]), D = r6(v * t / 2); return { d:2, k:"num", q:`You shout towards a cliff. The echo returns ${t} s later. Speed of sound = 340 m/s. How far away is the cliff, in metres?`, a:D, x:`The sound goes TO the cliff and BACK.\nTotal distance = 340 × ${t} = ${r6(v * t)} m.\nDistance to the cliff = half of that = ${r6(v * t)} ÷ 2 = ${D} m.` }; }
    if (k === 1){ const D = K.pick([85, 170, 255, 340, 425, 510, 680, 850, 1020, 1360, 1700]); return { d:2, k:"num", q:`A wall is ${D} m away. Sound travels at 340 m/s. How long does an echo take to come back, in seconds?`, a:r6(2 * D / v), tol:0.01, x:`The sound travels there and back: 2 × ${D} = ${2 * D} m.\nTime = distance ÷ speed = ${2 * D} ÷ 340 = ${r6(2 * D / v)} s.` }; }
    const s = K.pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6]); return { d:2, k:"num", q:`A thunderclap is heard ${s * 3} s after the lightning. Using the rule '3 seconds per kilometre', how far away is the storm, in km?`, a:s, tol:0.01, x:`Sound travels about 1 km every 3 s (340 m/s ≈ 1/3 km per second).\nDistance ≈ ${s * 3} ÷ 3 = ${s} km.` }; }
  const k = K.int(0, 3);
  if (k === 0){ const f = K.pick([34, 68, 85, 170, 340, 680, 850, 1360, 1700, 3400]); return { d:3, k:"num", q:`A sound has a frequency of ${f} Hz. Speed of sound = 340 m/s. What is its wavelength, in metres? (wave speed = frequency × wavelength)`, a:r6(v / f), tol:0.001, x:`wave speed = frequency × wavelength, so wavelength = speed ÷ frequency\n= 340 ÷ ${f} = ${r6(v / f)} m.` }; }
  if (k === 1){ const lam = K.pick([0.1, 0.2, 0.25, 0.4, 0.5, 0.68, 0.85, 1, 1.7, 2, 3.4, 4]); return { d:3, k:"num", q:`A sound wave in air has a wavelength of ${lam} m. Speed of sound = 340 m/s. What is its frequency, in Hz?`, a:r6(v / lam), x:`frequency = speed ÷ wavelength = 340 ÷ ${lam} = ${r6(v / lam)} Hz.` }; }
  if (k === 2){ const t = K.pick([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1, 1.2, 1.6, 2, 2.4, 3, 4]); return { d:3, k:"num", q:`A ship's sonar pulse returns ${t} s after it is sent. Sound travels at 1500 m/s in water. How deep is the sea, in metres?`, a:r6(1500 * t / 2), x:`The pulse goes down AND back up.\nTotal distance = 1500 × ${t} = ${r6(1500 * t)} m.\nDepth = half = ${r6(1500 * t / 2)} m.` }; }
  const f = K.pick([2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 400, 500, 1000]); return { d:3, k:"num", q:`A sound has a frequency of ${f} Hz. What is the time period (the time for one wave), in milliseconds? (time period = 1 ÷ frequency)`, a:r6(1000 / f), tol:0.01, x:`Time period = 1 ÷ frequency = 1 ÷ ${f} = ${r6(1 / f)} s.\nIn milliseconds: × 1000 = ${r6(1000 / f)} ms.` };
};
const r6 = x => Math.round(x * 1e6) / 1e6;

const mc = G7.mcq, ex = G7.ex, gen = G7.gen;
const OAK = (slug, t) => ({ url:"https://www.thenational.academy/pupils/lessons/" + slug + "/video", title:t, by:"Oak National Academy" });
const BB = ["📗", "BBC Bitesize KS3: waves and sound", "https://www.bbc.co.uk/bitesize/topics/zw982hv"];
const T = o => Object.assign({ strand:"MYP 2 · Physics · Sound", focus:true }, o);
const add = t => { if (!SC.topics.some(x => x.id === t.id)) SC.topics.push(t); };

add(T({ id:"soundmaking", title:"🥁 Sound waves 1: how sound is made and travels",
  learn:{ ideas:["Every sound is made by something vibrating (moving quickly back and forth).",
    "The vibrations push and pull on nearby particles, which pass the vibrations on. This is a sound wave.",
    "Sound is a longitudinal wave: particles vibrate in the same direction the wave travels, making compressions (squashed together) and rarefactions (spread out).",
    "Sound needs a medium (solid, liquid or gas). It cannot travel through a vacuum like space.",
    "Sound travels fastest in solids (steel ~5000 m/s), then liquids (water ~1500 m/s), slowest in gases (air ~340 m/s).",
    "The particles don't travel with the sound — they vibrate on the spot and pass the energy along."],
    example:"Why can you hear a train coming by putting your ear on the rail (never do this on a real railway!)?\nThe rail is a solid: its particles are close together and strongly linked.\nSo vibrations pass along it faster (and with less energy lost) than through air.\nThe sound arrives through the rail before it arrives through the air.",
    more:[ ex("Explain how the sound from a drum reaches your ear.", ["The drum skin vibrates when it is hit.", "It pushes and pulls the air particles next to it, making compressions and rarefactions.", "Each particle passes the vibration to the next one (a longitudinal wave).", "The vibrations reach your ear and make your eardrum vibrate."], "Vibration → particles → wave → eardrum") ],
    videos:[ OAK("sound-vibrations", "Sound vibrations (Oak, Year 7)"), OAK("travelling-vibrations", "Travelling vibrations (Oak, Year 7)"), OAK("travelling-sound", "Travelling sound (Oak, Year 7)") ],
    fun:"In films, spaceships explode with a huge BOOM — but in real space you'd hear nothing at all, because there are no particles to carry the sound!",
    trick:"Solids are Speedy, Gases are Slow. No particles = no sound." },
  links:[ BB ],
  tasks: gen("science/soundmaking", "111122223333", 61011),
  pool: gen("science/soundmaking", "1122331122331", 61501).concat([ mc(2, "Which diagram shows sound travelling in air?", "Particles bunched in compressions and spread in rarefactions along the direction of travel", ["Particles moving up and down like a rope wave", "Particles all moving to the ear", "No particles at all"], "Sound is longitudinal."), mc(3, "Whales can hear each other hundreds of kilometres away. Why does sound travel so far in water?", "Water particles are close together, so vibrations pass on quickly with less energy lost", ["Water is warm", "There is no air in water", "Whales shout very loudly only"], "Liquids carry sound better than gases.") ]) }));

add(T({ id:"soundpitch", title:"🎵 Sound waves 2: pitch, loudness and wave traces",
  learn:{ ideas:["Frequency = number of waves (vibrations) per second, measured in hertz (Hz). Higher frequency → higher pitch.",
    "Amplitude = the size of the vibration (height of the wave from the middle line). Bigger amplitude → louder sound. Loudness is measured in decibels (dB).",
    "Wavelength = the distance from one wave to the same point on the next wave.",
    "An oscilloscope shows sound as a wave on a screen: MORE waves across = higher pitch; TALLER waves = louder.",
    "Humans hear about 20 Hz to 20 000 Hz. Above 20 000 Hz is ultrasound; below 20 Hz is infrasound.",
    "Shorter, tighter or thinner strings vibrate faster and give higher notes."],
    example:"Two oscilloscope traces: A has 4 waves and is 3 squares tall. B has 8 waves and is 3 squares tall.\nPitch: B has more waves → higher frequency → higher pitch.\nLoudness: both are 3 squares tall → same amplitude → equally loud.",
    more:[ ex("A guitarist presses a string halfway along. What happens to the note?", ["The vibrating part of the string is now shorter.", "A shorter string vibrates faster.", "Faster vibrations = higher frequency.", "So the note is higher (in fact, one octave higher)."], "Higher pitch") ],
    videos:[ OAK("sound-vibrations", "Sound vibrations: volume and pitch (Oak)") ],
    fun:"A mosquito's whine is about 600 Hz, a cat can hear up to about 64 000 Hz, and elephants talk using rumbles too low for us to hear!",
    trick:"Frequency = how Fast it vibrates → Pitch. Amplitude = how big the vibration is → Loudness ('Amp it up!')." },
  links:[ BB ],
  tasks: gen("science/soundpitch", "111122223333", 62011),
  pool: gen("science/soundpitch", "1122331122331", 62501).concat([ mc(1, "Which sound has the highest frequency?", "A whistle", ["A bass drum", "Thunder", "A lion's roar"], "A whistle is high-pitched, so its frequency is high."), mc(3, "Two notes are equally loud but one is higher. On an oscilloscope they would…", "Have the same height but different numbers of waves", ["Have different heights and the same number of waves", "Look identical", "Have no waves"], "Same amplitude, different frequency.") ]) }));

add(T({ id:"soundhearing", title:"👂 Sound waves 3: echoes, hearing and uses of sound",
  learn:{ ideas:["Sound reflects off hard, smooth surfaces (an echo) and is absorbed by soft materials (curtains, carpets, foam).",
    "Hearing: the outer ear funnels sound → the eardrum vibrates → three small bones (ossicles: hammer, anvil, stirrup) pass on and amplify the vibrations → the cochlea's hair cells turn them into electrical signals → the auditory nerve carries them to the brain.",
    "Very loud sounds can damage the hair cells permanently. Ear defenders protect hearing.",
    "Echolocation: bats and dolphins send out ultrasound and use the echoes to find food and avoid obstacles.",
    "Uses of ultrasound and echoes: sonar (sea depth), baby scans, cleaning jewellery, finding cracks in metal."],
    example:"Why does your voice sound different in an empty room compared with a furnished one?\nThe empty room has hard walls and floor, which reflect sound → lots of echoes.\nFurniture, curtains and carpets absorb sound → fewer echoes.\nSo the furnished room sounds quieter and clearer.",
    more:[ ex("Put the path of sound through the ear in order.", ["Outer ear (pinna) collects the sound.", "Ear canal carries it to the eardrum, which vibrates.", "Ossicles (hammer, anvil, stirrup) pass the vibrations on.", "Cochlea turns vibrations into electrical signals.", "Auditory nerve carries the signals to the brain."], "Pinna → canal → eardrum → ossicles → cochlea → nerve → brain") ],
    videos:[ OAK("reflecting-and-absorbing-sound", "Reflecting and absorbing sound (Oak, Year 7)"), OAK("travelling-sound", "Travelling sound (Oak, Year 7)") ],
    fun:"The stirrup (stapes) in your ear is the smallest bone in your body — about the size of a grain of rice!",
    trick:"Path of hearing: 'Every Owl Can Now Bounce': Eardrum, Ossicles, Cochlea, Nerve, Brain." },
  links:[ BB ],
  tasks: gen("science/soundhearing", "111122223333", 63011),
  pool: gen("science/soundhearing", "1122331122331", 63501).concat([ mc(2, "Why do people working with loud machines wear ear defenders?", "To absorb sound and protect the hair cells in their cochlea", ["To keep warm", "To hear better", "To reflect sound to others"], "Damage to hair cells can be permanent."), mc(3, "A dolphin's click echo comes back faster than before. What does this tell it?", "The object (e.g. a fish) is now closer", ["The object is further away", "The water is colder", "Nothing"], "Shorter echo time = shorter distance.") ]) }));

add(T({ id:"soundcalc", title:"🧮 Sound waves 4: sound calculations",
  learn:{ ideas:["speed = distance ÷ time (m/s). Rearranged: distance = speed × time; time = distance ÷ speed.",
    "Speed of sound: about 340 m/s in air, 1500 m/s in water.",
    "ECHOES: the sound travels there AND back, so the distance to the object = (speed × time) ÷ 2.",
    "Thunder and lightning: light arrives instantly, so distance = 340 × the delay. Shortcut: about 3 seconds per kilometre.",
    "frequency (Hz) = number of vibrations ÷ time (s). Time period = 1 ÷ frequency.",
    "wave speed = frequency × wavelength (v = f × λ)."],
    example:"A boy claps and hears the echo from a wall 0.5 s later. Speed of sound = 340 m/s. How far away is the wall?\nStep 1: total distance = speed × time = 340 × 0.5 = 170 m.\nStep 2: the sound went there and back, so halve it: 170 ÷ 2 = 85 m.\nThe wall is 85 m away.",
    more:[ ex("Thunder is heard 6 s after lightning. How far away is the storm?", ["Light arrives almost instantly, so the 6 s is just for the sound.", "Distance = speed × time = 340 × 6.", "= 2040 m (about 2 km).", "Quick check with the rule: 6 ÷ 3 = 2 km ✓"], "2040 m"),
      ex("A note of 440 Hz travels at 340 m/s. Find its wavelength.", ["Write the equation: v = f × λ.", "Rearrange: λ = v ÷ f.", "λ = 340 ÷ 440.", "λ ≈ 0.77 m."], "≈ 0.77 m"),
      ex("A sonar pulse returns after 2 s. Sound in water = 1500 m/s. How deep is the sea?", ["Total distance = 1500 × 2 = 3000 m.", "Down and back up, so halve it.", "Depth = 3000 ÷ 2 = 1500 m."], "1500 m") ],
    videos:[ OAK("travelling-sound", "Travelling sound (Oak, Year 7)") ],
    fun:"In 1947 Chuck Yeager became the first pilot to fly faster than sound — about 1100 km/h. The 'sonic boom' is the shock wave of sound bunching up!",
    trick:"Echo? Don't forget to HALVE it! (There and back.)" },
  links:[ BB ],
  tasks: gen("science/soundcalc", "111122223333", 64011),
  pool: gen("science/soundcalc", "1122331122331", 64501).concat([ mc(2, "Why do you halve the distance in an echo calculation?", "The sound travels to the object and back again", ["Sound slows down by half", "Echoes are half as loud", "You don't need to"], "The time measured is for the whole round trip.") ]) }));
})();
