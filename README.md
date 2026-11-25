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

## Grade 7 Game Development unit (MakeCode Arcade)
- A 9-week Computer Science unit (+ optional showcase week) in `/python-pathways/game-dev.html`, with its content in `/python-pathways/game-dev-data.js`.
- Off by default. Super admin → 🔀 Switches → **Computer Science units**: switch on **Unit** (Grade 7 CS students then see a card above their Python lessons) and open each of the four stages when the class is ready. Stored in the signed switches state as `unlocks.cs7gd = { on, s1, s2, s3, s4 }`.
- Stages: 1 Game Idea (research, proposal, pixel sprite, success criteria), 2 Level Design (a map and full write-up for every level, game flow, code plan, test plan), 3 Build & Test (share link, milestones, diary, test log), 4 Playtest & Evaluate. Submit unlocks only when every checklist item is complete.
- Work saves on the computer and, locked with the student's Computer Science key, online ("W" rows). Submissions go to the teacher log (`gamedev`) and appear in the dashboard's **🎮 G7 Game Dev** tab with feedback and PDF.

## Study Plus and Study Plus UK: audio, verb lab and further learning (Nov 2026)
- `study/lang.js` (both sites): 🔊 / 🐢 buttons read French in a French voice and English in an English voice, even inside one sentence (Arabic script in an Arabic voice). On key ideas, worked examples, questions, answer options and the explanation pop-up. A "Slow French audio" switch is remembered on the device.
- Verb lab: 28 key French verbs, each with every present-tense form, how it sounds, other tenses, how to use it, three example sentences with audio, and the common mistake. Shown in every French topic (`learn.verbs`, `learn.pron`).
- Every explanation pop-up and learn page has 🔗 Learn more links (YouTube search, BBC Bitesize, Khan Academy for maths and science, Forvo for French).
- Study Plus French: new topics "Verb lab" and "Free time, sport and weather"; adjective-position fix (BAGS).
- Study Plus UK: Year 8 French (KS3) and Year 10 French (Edexcel IGCSE 4FR1, five themes plus grammar); Year 10 Maths vectors, circle theorems, sequences and algebraic fractions; Year 10 Chemistry Groups 1 and 7 and chemical tests; Year 8 Maths transformations, constructions and bearings.
- `uk/explain-fill.js` adds explanations to 409 questions that had none; any question still without one shows the correct answer and the most relevant key idea.

## Download my work (Word), every course (Nov 2026)
- **Design and IT:** each unit on the student's home page (and last year's units under History) has **⬇ Download my work (Word)**, also on the "Download and hand in" step. One .docx with every strand of Criteria A to D: the task wording, then the student's own answers, tables, sketches and screenshots. Criteria with nothing answered are left out.
- **Computer Science (Python Pathways):** **📄 Download my work (Word)** on the lessons page and the Submit step. Every level the student has worked in, each lesson's Exercise 1–3 with the task and the student's code, and whether it was solved.
- **G7 Game Development:** **📄 Download all my work (Word)** under each stage. Every stage with answers, tables, the pixel sprite and level maps as pictures.
- Never included: worked examples, example answers/levels, hints, practice questions. Built in the browser by `python-pathways/work-docx.js` (CS and Game Dev) and the Design course's own report builder.
- **Practice is not assessed:** practice questions no longer appear in strengths, improvements or next steps (student feedback, staff auto-notes, the Design criterion PDF and the text sent to the teacher log). The Python skill level now comes from the three lesson exercises only (Mastered = all three solved without advice). Practice still counts for House Points, weekly rankings and unlocking Submit.

## Grade 10: one login for Design and IT (Nov 2026)
- A Grade 10 student uses the **same username and password** for Design and IT. Choosing either course at the front page and signing in works; the account is no longer blocked as "registered for the other course".
- Once signed in, **Change course ▾** shows **Switch to IT** / **Switch to Design**. Switching saves and sends the current work first and does not ask for a new sign-in.
- Each course keeps its own units and work; the unit last open in each course is remembered. Every switch is logged to the teacher log (`switchcourse`), and the staff dashboard shows "also IT" / "also Design".
- Applies to Grade 10 only (`g10Pair` in `sdc.js`, `g10Both` / `g10Switch` in the Design course). Other grades are unchanged.

## Students see only their own grade and course (Nov 2026)
- Grade 10 Design/IT students: **Change course** offers only Design ⇄ IT (never Computer Science, Study Plus or anything else).
- Computer Science is only for Grades 6–8 and 11–12: a Grade 9 or 10 account is stopped at sign-in and logged (`wronggrade`), both in `SDC.confirm` and straight away in Python Pathways.
- Design/IT: "See what other grades are learning" is gone for students (test student only); a student can't open a unit outside their own grade and course, and the year group is never shown as a fallback.
- Voice Studio opens only for 12 hours after a staff sign-in on the Staff dashboard (cleared by **Lock**).
