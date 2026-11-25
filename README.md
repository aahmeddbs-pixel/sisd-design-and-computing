# SISD Design and Computing

One sign-in page for SISD's Computer Science (Python Pathways), Design and IT courses.

**Student link:** https://aahmeddbs-pixel.github.io/sisd-design-and-computing/
**Admin:** https://aahmeddbs-pixel.github.io/sisd-design-and-computing/admin.html

- Students choose Computer Science, Design or IT (Grade 10 only) and only see that course.
- Sign-up asks for course and grade; only the admin can change a student's course, grade, level or teacher.
- Every sign-in is logged to the teacher with the course chosen; wrong-course attempts are stopped and logged.
- The top 5 House Points of every lesson are emailed automatically to aahmed.dbs@gmail.com by the email script (`verify-script.gs`, a 10-minute timer), about 15 minutes after the class goes quiet, even when nobody has the admin page open. The admin page switches the timer on by itself once the script has been redeployed (or run `setupHousePoints` once in Apps Script).
- Dark mode: `sdc.js` checks every page and switches any text that is too close in colour to its box to dark or light ink, so everything stays readable.

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
