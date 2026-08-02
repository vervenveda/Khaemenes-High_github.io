# International Integrated Science 9

**Course code:** KH-SCI-IIS9  
**Subtitle:** Life, Matter, Energy and Earth Systems  
**Repository:** `vervenveda/Khaemenes_High.github.io`  
**Path:** `courses/science/international-integrated-science-9/`

This directory is the canonical home of Khaemenes Academy's Grade 9 integrated science course.

## Current status

The root shell now establishes the course architecture, international benchmark model, assessment contract, laboratory safety framework, materials framework, machine-readable course map, responsive landing page, and local progress tools.

No unit should be marked `open` until it has passed content, answer, accessibility, navigation, print, and release validation.

## Design contract

The course preserves the Khaemenes High system:

- Foundation, Core, and Extended pathways
- 36-week structure
- Local-first progress
- Offline and low-bandwidth support
- Print-friendly student records
- Multilingual vocabulary readiness
- Keyboard, screen-reader, reduced-motion, and RTL support
- Definitive answers or explicit evidence-based rubrics
- Separate student, teacher, answer-key, and completion-record resources

## Planned directory structure

```text
international-integrated-science-9/
├── index.html
├── course-map.json
├── course-ui.css
├── course-ui.js
├── diagnostic/
├── units/
│   ├── unit-01/
│   ├── unit-02/
│   ├── ...
│   └── unit-12/
├── assessments/
│   ├── quizzes/
│   ├── unit-exams/
│   ├── midterm/
│   ├── final-exam/
│   ├── capstone/
│   └── assets/
├── laboratories/
├── student-resources/
├── teacher-resources/
├── answer-keys/
├── records/
├── certificate/
└── docs/
```

## Release rule

Build and validate one unit at a time. Preserve a validation file and a release file for every unit.
