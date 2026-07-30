# Khaemenes High

**Khaemenes High** is an international and national secondary-school platform for students in grades 9–12.

The project is being developed as a free, accessible, multilingual, standards-aware learning environment that can support students, families, teachers, counselors, schools, and independent learners across different educational systems.

## Current foundation release

This first release contains the project’s public foundation:

- `index.html` — responsive international high-school landing page
- `manifest.webmanifest` — progressive web application metadata
- `service-worker.js` — offline caching for the foundation files
- `README.md` — project guide
- `LICENSE` — dual license for software and educational content
- `SECURITY.md` — vulnerability reporting and security expectations
- `CONTRIBUTING.md` — contribution standards and workflow

The grade portals, departments, course engines, assessments, portfolios, standards maps, and teacher tools will be added in later development phases.

## Educational scope

Khaemenes High is intended to include complete learning pathways for:

- Grade 9
- Grade 10
- Grade 11
- Grade 12

The academy will support multiple levels within each subject:

- **Foundation** — review, intervention, language support, and careful pacing
- **Core** — complete course-level learning
- **Extended** — honors depth, advanced applications, research, and early college work

Students will be able to move between levels by subject and skill rather than being permanently assigned one label.

## Planned academic departments

1. Mathematics
2. Science
3. Language and Literature
4. History, Civics, Geography, and Social Sciences
5. World Languages
6. Computer Science and Technology
7. Career and Technical Education
8. Visual Arts
9. Music and Performing Arts
10. Health, Wellness, and Physical Education
11. Financial Literacy and Life Skills
12. Global Citizenship and Environmental Stewardship

## Mathematics sequence

The planned mathematics department includes:

- Mathematics Foundations
- Pre-Algebra
- Algebra I
- Geometry
- Algebra II
- Statistics and Probability
- Consumer Mathematics
- Financial Mathematics
- Precalculus
- Calculus
- Mathematical Modelling

Pre-Algebra will serve as a Grade 9 course, diagnostic intervention, summer bridge, and self-paced international mathematics foundation.

## International architecture

Courses will be organized around a shared universal curriculum and linked to standards through separate mappings.

Planned mappings include:

- United States Common Core
- Individual U.S. state standards
- Cambridge Lower Secondary and Upper Secondary pathways
- International Baccalaureate pathways
- International mathematical and scientific literacy frameworks
- Country, province, state, and examination-system overlays

This approach allows the curriculum itself to remain coherent while educators select the standards reports required in their location.

## Accessibility and inclusion

The academy is designed to support:

- Keyboard navigation
- Screen readers
- Adjustable type and contrast
- Reduced-motion preferences
- Right-to-left language layouts
- Multilingual interfaces and course packs
- Printable lessons
- Offline use
- Low-bandwidth devices
- Alternatives to drag-only interaction
- Student-owned progress export and import
- Multiple ways to demonstrate mastery

Initial language architecture:

- English
- Spanish
- French
- Arabic
- Portuguese

## Privacy and local-first learning

The planned student system will use a local-first model whenever possible.

Core principles:

- No advertising
- No sale of student information
- No unnecessary account requirement
- No hidden behavioral tracking
- No collection of sensitive information without a documented educational need
- Progress export and import controlled by the learner or school
- Clear separation between public curriculum and private records

Browser storage is not a substitute for a secure school information system. Any future cloud, classroom, or transcript service must undergo separate privacy and security review.

## Progressive web application

The foundation can be installed as a progressive web application in supported browsers.

The service worker caches the foundation files after the first successful visit. Future course releases will use versioned cache groups so curriculum updates can be delivered safely without leaving students on incompatible files.

### Local testing

Service workers do not operate correctly when a page is opened only as a local `file://` path.

Use a local web server instead:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Planned repository structure

```text
Khaemenes-High_github.io/
├── index.html
├── README.md
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md
├── manifest.webmanifest
├── service-worker.js
├── grades/
│   ├── grade-09/
│   ├── grade-10/
│   ├── grade-11/
│   └── grade-12/
├── departments/
├── courses/
├── portals/
│   ├── student/
│   ├── teacher/
│   ├── family/
│   ├── counselor/
│   └── administrator/
├── standards/
├── locales/
├── shared/
├── data/
└── assets/
```

## Development principles

All contributions should:

- Improve student learning or access
- Use plain, respectful language
- Avoid stereotypes and political or commercial manipulation
- Work on mobile and desktop devices
- Remain usable without a mouse
- Avoid unnecessary third-party dependencies
- Fail safely when internet access is unavailable
- Keep student privacy central
- Document educational sources and standards mappings
- Distinguish verified facts from interpretation
- Include meaningful feedback rather than answer-only grading

## Content quality requirements

Curriculum submissions should include:

1. Learning goals
2. Prerequisite skills
3. Vocabulary
4. Concept instruction
5. Worked examples
6. Guided practice
7. Independent practice
8. Application or modelling
9. Accessibility alternatives
10. Mastery checks
11. Teacher guidance
12. Standards metadata
13. Source and copyright information

## Project status

The high-school repository is in its foundation phase. The immediate next milestones are:

1. Establish the complete repository directory structure
2. Build the Grade 9 portal
3. Build the Pre-Algebra course shell
4. Create the diagnostic and mastery model
5. Create standards and language data formats
6. Add teacher, family, counselor, and student portal shells
7. Add offline curriculum caching and safe update handling
8. Begin complete unit development

## Licensing

Software code is licensed under the MIT License.

Original curriculum, documentation, illustrations, and educational media are licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International unless a file states otherwise.

See `LICENSE` for details.

## Credits

Initiated by **Jennifer Kay Pearl** as part of the Verve N Veda and Khaemenes Academy educational infrastructure.

Project stewardship should preserve free access, learner dignity, educational usefulness, privacy, and international inclusion.
