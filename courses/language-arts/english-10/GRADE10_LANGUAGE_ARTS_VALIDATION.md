# Grade 10 Language Arts Validation

## Structural checks

- [x] 12 unit directories
- [x] 36 week directories
- [x] Diagnostic assessment
- [x] 12 unit assessments
- [x] Midterm assessment
- [x] Final assessment
- [x] Records, rubrics, portfolio, reading list, standards, and teacher guide
- [x] Shared CSS and JavaScript
- [x] Curriculum JSON and JavaScript data bundle
- [x] Relative internal links
- [x] Print and responsive styles
- [x] Local progress, backup, import, and CSV export

## Academic checks

- [x] Literary and informational reading
- [x] Rhetoric and historical American speeches/essays
- [x] Argument and opposing claims
- [x] Poetry, ambiguity, figurative language, mood, and sound
- [x] Classical, mythical, and religious adaptation
- [x] Research, source evaluation, paraphrase, citation, and synthesis
- [x] Expository and argumentative research writing
- [x] Digital publication and presentation
- [x] Drama, Shakespeare, and performance
- [x] Long-form novel study
- [x] Portfolio, midterm, final, corrections, and reflection

## Required repository-side check

After upload, verify the live custom-domain route, root service-worker behavior, language-arts landing-page link, and any cache version updates.

## Automated package validation — August 5, 2026

- JavaScript syntax: passed (`node --check`)
- Curriculum data: 12 units, 36 weeks, 180 daily lessons, and 180 weekly quiz questions parsed successfully
- Assessment answer indexes: passed
- Required unit and week files: passed
- Local relative-link scan: 1,138 links checked; 0 missing targets inside the package
- Parent-repository links: retained intentionally and must be verified after upload
- Browser interaction smoke test: deferred to the live/custom-domain route because local browser navigation is restricted in the build environment
