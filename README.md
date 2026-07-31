# Immediate Repair Package

Restore these files at the exact paths shown:

```text
courses/mathematics/pre-algebra/course-ui.css

courses/mathematics/pre-algebra/assessments/assets/
  assessment-suite.css
  exam-engine.js

service-worker.js
```

The service worker cache name is:

```text
khaemenes-high-design-v20
```

Assessment pages should load:

```html
<link rel="stylesheet" href="../course-ui.css">
<link rel="stylesheet" href="assets/assessment-suite.css">
<script src="assets/exam-engine.js" defer></script>
```

Adjust the `course-ui.css` relative path when the assessment page is nested
deeper than the main `assessments/` folder.
