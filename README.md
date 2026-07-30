Khaemenes High

Khaemenes High is an international and national secondary-school platform for students in grades 9–12.

The project is being developed as a free, accessible, multilingual, standards-aware learning environment that can support students, families, teachers, counselors, schools, and independent learners across different educational systems.

Current campus release

The project now contains a working public campus foundation and its first student pathway:

index.html — international high-school landing page and connected Verve N Veda learning network

grades/grade-09/ — local-first Grade 9 student portal, course catalog, and 36-week planner

courses/mathematics/pre-algebra/ — complete 36-week Pre-Algebra course map

courses/mathematics/pre-algebra/diagnostic/ — functional 18-question readiness diagnostic

manifest.webmanifest — progressive web application metadata and Grade 9 shortcuts

service-worker.js — route-aware offline caching for the campus, Grade 9, Pre-Algebra, and diagnostic

LICENSE, SECURITY.md, and CONTRIBUTING.md — project governance and protection

Grade 10–12 portals, complete lesson units, standards overlays, translations, portfolios, teacher tools, counselor tools, and family resources remain in development.

Educational scope

Khaemenes High is intended to include complete learning pathways for:

Grade 9

Grade 10

Grade 11

Grade 12

The academy will support multiple levels within each subject:

Foundation — review, intervention, language support, and careful pacing

Core — complete course-level learning

Extended — honors depth, advanced applications, research, and early college work

Students will be able to move between levels by subject and skill rather than being permanently assigned one label.

Planned academic departments

Mathematics

Science

Language and Literature

History, Civics, Geography, and Social Sciences

World Languages

Computer Science and Technology

Career and Technical Education

Visual Arts

Music and Performing Arts

Health, Wellness, and Physical Education

Financial Literacy and Life Skills

Global Citizenship and Environmental Stewardship

Mathematics sequence

The planned mathematics department includes:

Mathematics Foundations

Pre-Algebra

Algebra I

Geometry

Algebra II

Statistics and Probability

Consumer Mathematics

Financial Mathematics

Precalculus

Calculus

Mathematical Modelling

Pre-Algebra will serve as a Grade 9 course, diagnostic intervention, summer bridge, and self-paced international mathematics foundation.

International architecture

Courses will be organized around a shared universal curriculum and linked to standards through separate mappings.

Planned mappings include:

United States Common Core

Individual U.S. state standards

Cambridge Lower Secondary and Upper Secondary pathways

International Baccalaureate pathways

International mathematical and scientific literacy frameworks

Country, province, state, and examination-system overlays

This approach allows the curriculum itself to remain coherent while educators select the standards reports required in their location.

Accessibility and inclusion

The academy is designed to support:

Keyboard navigation

Screen readers

Adjustable type and contrast

Reduced-motion preferences

Right-to-left language layouts

Multilingual interfaces and course packs

Printable lessons

Offline use

Low-bandwidth devices

Alternatives to drag-only interaction

Student-owned progress export and import

Multiple ways to demonstrate mastery

Initial language architecture:

English

Spanish

French

Arabic

Portuguese

Privacy and local-first learning

The planned student system will use a local-first model whenever possible.

Core principles:

No advertising

No sale of student information

No unnecessary account requirement

No hidden behavioral tracking

No collection of sensitive information without a documented educational need

Progress export and import controlled by the learner or school

Clear separation between public curriculum and private records

Browser storage is not a substitute for a secure school information system. Any future cloud, classroom, or transcript service must undergo separate privacy and security review.

Progressive web application

The foundation can be installed as a progressive web application in supported browsers.

The service worker caches the foundation files after the first successful visit. Future course releases will use versioned cache groups so curriculum updates can be delivered safely without leaving students on incompatible files.

Local testing

Service workers do not operate correctly when a page is opened only as a local file:// path.

Use a local web server instead:

python3 -m http.server 8000

Then visit:

http://localhost:8000

Repository structure

Khaemenes-High_github.io/
├── index.html
├── README.md
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md
├── manifest.webmanifest
├── service-worker.js
├── grades/
│   └── grade-09/
│       ├── index.html
│       ├── course-catalog.json
│       └── planner.json
├── courses/
│   └── mathematics/
│       └── pre-algebra/
│           ├── index.html
│           ├── course-map.json
│           └── diagnostic/
│               └── index.html
├── departments/          # planned
├── portals/              # planned
├── standards/            # planned
├── locales/              # planned
├── shared/               # planned
├── data/                 # planned
└── assets/               # planned

Development principles

All contributions should:

Improve student learning or access

Use plain, respectful language

Avoid stereotypes and political or commercial manipulation

Work on mobile and desktop devices

Remain usable without a mouse

Avoid unnecessary third-party dependencies

Fail safely when internet access is unavailable

Keep student privacy central

Document educational sources and standards mappings

Distinguish verified facts from interpretation

Include meaningful feedback rather than answer-only grading

Content quality requirements

Curriculum submissions should include:

Learning goals

Prerequisite skills

Vocabulary

Concept instruction

Worked examples

Guided practice

Independent practice

Application or modelling

Accessibility alternatives

Mastery checks

Teacher guidance

Standards metadata

Source and copyright information

Project status

Completed in the current release:

Public high-school landing page

Searchable connected Verve N Veda learning network

Grade 9 student portal

Structured Grade 9 course catalog and planner

Global Pre-Algebra 36-week course map

Pre-Algebra readiness diagnostic and mastery guidance

Route-aware offline caching

Local plan and progress export

Immediate next milestones:

Build Pre-Algebra Unit 1: Number Systems, Factors, and Estimation

Create lesson, practice, assessment, teacher-guide, and family-guide formats

Create standards and language data schemas

Add shared student portfolio and progress-import tools

Build Grade 9 English, Biology, and World History course shells

Add teacher, family, and counselor portal foundations

Licensing

Software code is licensed under the MIT License.

Original curriculum, documentation, illustrations, and educational media are licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International unless a file states otherwise.

See LICENSE for details.

Credits

Initiated by Jennifer Kay Pearl as part of the Verve N Veda and Khaemenes Academy educational infrastructure.

Project stewardship should preserve free access, learner dignity, educational usefulness, privacy, and international inclusion.
