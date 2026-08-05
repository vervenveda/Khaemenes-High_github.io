# Validation Report — Grade 9 Global Studies Honors

**Validation date:** August 5, 2026

## Passed structural checks
- Weeks: 36
- Daily lessons: 180
- Principal assignments: 108
- Weekly objective quiz questions: 360
- Midterm objective questions: 45
- Final objective questions: 55
- Weekly packet folders: 36
- Midterm question IDs unique: 45 of 45
- Final question IDs unique: 55 of 55
- Duplicate choices within a quiz question: none
- Every answer index points to an existing choice
- Every week contains exactly five lessons, three assignments, ten objective questions, and one constructed response
- Course JSON parses successfully
- `app.js`, `teacher/teacher.js`, and `service-worker.js` pass Node syntax checking
- Internal packet links resolve, except the two intentional breadcrumbs that point to the existing repository root outside this ZIP
- Local static server returned HTTP 200 for the main course page

## Manual post-upload checks
1. Open the department landing page.
2. Open the Grade 9 portal.
3. Add a test student.
4. Mark one lesson complete and refresh.
5. Save one assignment.
6. Complete one quiz and verify scoring.
7. Open the teacher portal with the initial passcode `KHAE09`.
8. Change the passcode.
9. Print a weekly packet and progress report.
10. Export and re-import a JSON backup.
11. Confirm the public domain path and breadcrumbs.
12. Test on a phone or narrow browser window.

## Limitation
The final public URL cannot be tested until the folder is uploaded and GitHub Pages has deployed it. GitHub Pages is static hosting; the teacher passcode is not secure server authentication.
