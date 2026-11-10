# SISD Design and Computing

One sign-in page for SISD's Computer Science (Python Pathways), Design and IT courses.

**Student link:** https://aahmeddbs-pixel.github.io/sisd-design-and-computing/
**Admin:** https://aahmeddbs-pixel.github.io/sisd-design-and-computing/admin.html

- Students choose Computer Science, Design or IT (Grade 10 only) and only see that course.
- Sign-up asks for course and grade; only the admin can change a student's course, grade, level or teacher.
- Every sign-in is logged to the teacher with the course chosen; wrong-course attempts are stopped and logged.
- The admin page emails the top 5 House Points after each lesson (a lesson ends when the class has been quiet for 15 minutes).

## Study Plus (private)
- A private "Other subjects" space (`study.html`) seen only by the student(s) named in `sdc.js → STUDY_PLUS` (currently anyone whose name or email starts with "mikhail").
- In Computer Science or Design, the **Change course** menu shows **✦ Other subjects (Study Plus)** for that student only. Study Plus has a switcher back to Computer Science and Design.
- 7 MYP 2 subjects (Maths, English, Science, I&S, Islamic, French, Arabic), 36 topics, 288 auto-marked tasks in `study/*.js`. Each topic: key knowledge pop-up, tasks, Check, explanation pop-up (even when right), self-rating, corrections and "Fix my mistakes".
- Active work time only (stops after 60 s idle or when the page is hidden). Effort = 60% score + 20% tasks finished + 20% focus.
- Each finished topic logs to the teacher log (super admin → ✦ Study Plus tab) and emails aahmed.dbs@gmail.com via `verify-script.gs` (needs the script redeployed once).
