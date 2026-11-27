# SISD Design and Computing

One sign-in page for SISD's Computer Science (Python Pathways), Design and IT courses.

**Student link:** https://aahmeddbs-pixel.github.io/sisd-design-and-computing/
**Admin:** https://aahmeddbs-pixel.github.io/sisd-design-and-computing/admin.html

- Students choose Computer Science, Design or IT (Grade 10 only) and only see that course.
- Sign-up asks for course and grade; only the admin can change a student's course, grade, level or teacher.
- Every sign-in is logged to the teacher with the course chosen; wrong-course attempts are stopped and logged.
- The top 5 House Points of every lesson are emailed automatically to aahmed.dbs@gmail.com by the email script (`verify-script.gs`, a 10-minute timer), about 15 minutes after the class goes quiet, even when nobody has the admin page open. The admin page switches the timer on by itself once the script has been redeployed (or run `setupHousePoints` once in Apps Script).
- Dark mode: `sdc.js` checks every page and switches any text that is too close in colour to its box to dark or light ink, so everything stays readable.

## Sync sheet (26 Nov 2026)
- Students' saved work, accounts and keys go to a Google Form whose linked sheet is read back by the site. A sheet stops taking rows once it is full: **SDC Sync 1** filled on 16 Nov, **SDC Sync 2** on 24 Nov at 11:54 (no work was saved online after that).
- New rows now go to **SDC Sync 3** (form and sheet owned by sisd.design.computing1@gmail.com; the sheet is "anyone with the link can view", and everything in it is scrambled). Sync 1 and Sync 2 are still read, so nothing saved before is lost.
- **New sheets are made automatically** by `sync-rotator.gs`, an Apps Script project ("SDC Sync Rotator") in sisd.design.computing1@gmail.com with a 30-minute timer. It moves to a new form + sheet ("SDC Sync 4", 5, …) when the current one reaches 35,000 rows or about 80 MB of text, or straight away if two test rows in a row fail to arrive. It emails aahmed.dbs@gmail.com each time.
- Every sync spreadsheet from Sync 3 on has a **Directory** tab listing all the sync sheets (newest last, the one in use marked "current"); a full sheet's Directory points on to the next. `sdc.js` follows it from the newest sheet it knows, remembers it on the computer (`sdc_syncdir_v1`) and checks again every 30 minutes; Python Pathways (`pp-sync.js`) and the Design course use the same list. Rows queued for an older form are sent to the current one. Until the Directory tab exists, the sheets written in the code are used.
- The sheets written in the code (`SYNC`/`SYNC_OLD` in `sdc.js`, `CFG` in `python-pathways/pp-sync.js`, `syncForm`/`syncSheet`/`syncOld` in the Design course's `index.html`) are only the starting point and never need changing again.
- Design and IT now send a full copy of a student's work at most once a minute while they type (it was every 10 seconds plus every time they left a box), and always straight away when they leave or switch away from the page. This keeps the sheet from filling up so fast.

## Private sections
- Some private, locked sections exist for named users only. They are visible to the super admin only; details are not kept in this public file.

## Grade 7 Game Development unit (MakeCode Arcade)
- A 9-week Computer Science unit (+ optional showcase week) in `/python-pathways/game-dev.html`, with its content in `/python-pathways/game-dev-data.js`.
- Off by default. Super admin → 🔀 Switches → **Computer Science units**: switch on **Unit** (Grade 7 CS students then see a card above their Python lessons) and open each of the four stages when the class is ready. Stored in the signed switches state as `unlocks.cs7gd = { on, s1, s2, s3, s4 }`.
- Stages: 1 Game Idea (research, proposal, pixel sprite, success criteria), 2 Level Design (a map and full write-up for every level, game flow, code plan, test plan), 3 Build & Test (share link, milestones, diary, test log), 4 Playtest & Evaluate. Submit unlocks only when every checklist item is complete.
- Work saves on the computer and, locked with the student's Computer Science key, online ("W" rows). Submissions go to the teacher log (`gamedev`) and appear in the dashboard's **🎮 G7 Game Dev** tab with feedback and PDF.

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

## 📍 Class progress, Design and IT (Nov 2026)
- On the dashboard's **Students & progress** tab, **📍 Class progress** opens one view per grade (G6, G7, G8, G10 DES, G10 IT, with a class picker where a grade has more than one class).
- It shows where every student is working (criterion and strand), a count of students at each place, and a grid of Criteria A–D, strands i–iv: ✓ complete, ● started, 📍 the strand they are on.
- 🟢 means the student has that strand open right now (from live view); otherwise the place comes from their latest saved work. It refreshes by itself every 30 seconds.
- The super admin sees every class; a teacher sees only the students who chose them.

## Criterion feedback and the integrity check, Design and IT (Nov 2026)
- **Send feedback** stays in every Design and IT student's window, all grades (Computer Science unchanged).
- Strengths, Improvements and Student developments are written **strand by strand**: each line names the strand and the exact part of the task, says what the student did or still needs to do, and quotes their own words where it helps. Practice ("Exercise") questions are never assessed.
- **Grades 10–11:** in depth, with MYP command terms (justify, evaluate, judgement, the level 7–8 descriptor). **Grades 6–9:** detailed, in easy words.
- **Before every criterion feedback PDF** (one student or a whole class) an **academic integrity check** runs on the assessed work and its brief is printed at the bottom, marked teacher only. It is also in the student's feedback window (🔎).
- Methods: typed vs pasted characters per answer (the Design course records this from 27 Nov 2026), typing volume vs saved work, AI-typical wording, formatting from other tools (markdown, em dashes, smart quotes, US spellings), sentence rhythm, vocabulary for the grade, style shift, similarity with classmates' answers to the same task (names the student and quotes the shared words), and copied task wording. Indicators, not proof.
