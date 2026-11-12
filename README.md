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
