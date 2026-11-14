# SISD Design and Computing

One sign-in page for SISD's Computer Science (Python Pathways), Design and IT courses.

**Student link:** https://aahmeddbs-pixel.github.io/sisd-design-and-computing/
**Admin:** https://aahmeddbs-pixel.github.io/sisd-design-and-computing/admin.html

- Students choose Computer Science, Design or IT (Grade 10 only) and only see that course.
- Sign-up asks for course and grade; only the admin can change a student's course, grade, level or teacher.
- Every sign-in is logged to the teacher with the course chosen; wrong-course attempts are stopped and logged.
- The top 5 House Points of every lesson are emailed automatically to aahmed.dbs@gmail.com by the email script (`verify-script.gs`, a 10-minute timer), about 15 minutes after the class goes quiet, even when nobody has the admin page open. The admin page switches the timer on by itself once the script has been redeployed (or run `setupHousePoints` once in Apps Script).
- Dark mode: `sdc.js` checks every page and switches any text that is too close in colour to its box to dark or light ink, so everything stays readable.

## Study Plus (private)
- A private "Other subjects" space (`study.html`) seen only by the student(s) named in `sdc.js → STUDY_PLUS` (currently Mikaeel Ahmed: first and last name, or mikaeel.ahmed@sisd.ae). He signs in once, in Computer Science, and switches to Design and Study Plus without signing in again.
- In Computer Science or Design, the **Change course** menu shows **✦ Other subjects (Study Plus)** for that student only. Study Plus has a switcher back to Computer Science and Design.
- 7 MYP 2 subjects (Maths, English, Science, I&S, Islamic, French, Arabic), 50 topics, 572 auto-marked tasks (Core, Extended, Challenge) in `study/*.js` and `study/plus-*.js`. Each topic: key knowledge pop-up, tasks, Check, explanation pop-up (even when right), self-rating, corrections and "Fix my mistakes".
- Active work time only (stops after 60 s idle or when the page is hidden). Effort = 60% score + 20% tasks finished + 20% focus.
- Each finished topic logs to the teacher log (super admin → ✦ Study Plus tab) and emails aahmed.dbs@gmail.com via `verify-script.gs` (needs the script redeployed once).

### Study Plus: saved everywhere, and a new challenge set every visit
- Progress is saved on the device and, locked (AES-256, key made from the student's Computer Science secret), as scrambled "Y" rows in the sync sheet. Signing in on any computer loads it; each topic keeps whichever copy changed most recently.
- Question bank: `study/bank-*.js` adds 456 new questions (Core / Extended / Challenge) that are not in Set 1. `study/gen.js` makes brand-new questions with fresh numbers for every Maths topic and for Science (forces, matter, cells, energy), I&S (maps, population, economics) and French numbers. Banks are append-only: saved sets point at question positions.
- Every new sign-in (or after 4 hours away), each finished topic gets its next set of 8: up to 2 review questions on last set's gaps (asked a different way), then new questions ordered Core → Challenge. The level moves up 0.5 (85%+), up 0.25 (65–84%), stays (50–64%) or drops 0.5 (under 50%). Students can also start a new set straight away.
- All earlier sets stay reviewable under 📚 My sets. Reports show "Set N (level)" in the super admin tab and the Gmail report.

## Study Plus UK (uk.html): Year 8 and Year 10, National Curriculum in England
- Same engine as Study Plus: key knowledge, checked tasks with explanations, self-rating, corrections, saved progress online, a new levelled challenge set for every finished topic on each return, and "📚 My sets" review.
- Subjects: Year 8 (KS3) Maths, Biology, Chemistry, Physics; Year 10 (GCSE Maths, AQA Combined Science Trilogy Paper 1 topics) Maths, Biology, Chemistry, Physics. 50 topics, 683 written questions in `uk/y8.js` and `uk/y10.js`, plus fresh generated questions (`uk/gen.js`) for every maths topic and the calculation topics in physics and chemistry.
- Sign-in: shared class login (only its SHA-256 hash is in the page), then each student's first name + their own 4-digit PIN. A name already registered must use its PIN ("Z" rows: scrambled name → PIN hash). Progress is locked with a key made from the login, name and PIN ("Y" rows).
- Reports go to the staff dashboard (✦ Study Plus tab, tagged Study Plus UK) and to the Gmail report, as "Mahaira20 · <name>".

### Update: more subjects, Learn pages and hints
- Study Plus UK now has 16 subjects: Year 8 and Year 10 Maths, Biology, Chemistry, Physics, English, History, Geography and Computing (82 topics, 1,194 written questions plus generators). `uk/y8-more.js`, `uk/y10-more.js`; extra worked examples in `uk/learn-extra.js`.
- Each topic opens a Learn page: 1. key ideas, 2. worked example with steps, 3. more worked examples ("how to work it out", including fresh generated ones), 4. practice.
- Hints (Study Plus and Study Plus UK): after 35–60 s on a question a pop-up offers a hint; a 💡 Hint button is always there. 3 hints per question (key idea → method or ruling out options → nearly there / answer range), then the full solution. Using the solution counts the question as not correct. Hints used are saved and reported.
