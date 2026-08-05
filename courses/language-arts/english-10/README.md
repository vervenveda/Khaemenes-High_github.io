# Khaemenes High — 10th Grade Language Arts / English II

A self-contained, repository-ready, vanilla HTML/CSS/JavaScript course package designed to mirror the modular architecture of the existing English 9 course.

## Course at a glance

- 36 instructional weeks
- 12 units, three weeks per unit
- 180 Monday–Friday lessons
- 36 repeatable weekly quizzes
- 12 repeatable unit assessments
- Diagnostic assessment
- Cumulative midterm after Week 18
- Cumulative final after Week 36
- Major teacher-scored performance product in every unit
- Portfolio, reading log, attendance log, gradebook, annual calendar, rubrics, and certificate
- Local browser progress with JSON backup and CSV gradebook export
- Light/dark themes, responsive layout, print styles, and offline-capable static architecture

## Intended repository path

```text
courses/language-arts/english-10/
```

## Primary entry point

```text
courses/language-arts/english-10/index.html
```

## Architecture

```text
english-10/
├── index.html
├── curriculum.json
├── manifest.webmanifest
├── service-worker.js
├── assets/
│   ├── course.css
│   ├── course.js
│   └── curriculum-data.js
├── units/unit-01/ ... unit-12/
├── weeks/week-01/ ... week-36/
├── assessments/
│   ├── diagnostic/
│   ├── unit-01/ ... unit-12/
│   ├── midterm/
│   └── final/
├── records/
├── rubrics/
├── portfolio/
├── grades/grade-10/
├── reading-list.html
├── standards.html
└── teacher-guide.html
```

## Installation

1. Upload the entire `english-10` directory to `courses/language-arts/`.
2. Preserve all folder names and relative paths.
3. Add an English 10 link to `courses/language-arts/index.html`.
4. Add the course route to the repository service worker if the root service worker uses a fixed cache list.
5. Open `courses/language-arts/english-10/index.html`.
6. Test Week 1, a unit assessment, the gradebook, exports, printing, and mobile layout.

## Local records

Student progress is stored in `localStorage` under:

```text
khae-ela10-state-v1
```

Use **Export Backup** regularly. Browser clearing, private browsing, device changes, or storage policies can remove local records.

## Assessment note

Because this is a static GitHub Pages course, selected-response answer keys are visible in page source. Use adult supervision, alternate source passages, oral conferences, written performance tasks, and rubric scoring when independent test security matters.

## Compliance note

This is a curriculum and recordkeeping aid. Verify current requirements with the applicable district, umbrella school, private school, scholarship program, public school, state agency, homeschool evaluator, or other governing institution.
