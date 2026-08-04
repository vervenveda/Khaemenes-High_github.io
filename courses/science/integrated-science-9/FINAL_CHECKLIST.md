# Science 9 — Final Two Items

## 1. Replace Unit 01 Controller

Upload this file from the repository root:

```text
courses/science/integrated-science-9/units/unit-01/unit01.js
```

This is the reversible synchronization version. It retains:

- Unit 01 portal-navigation repair
- Shared light/dark theme loader
- Existing storage key
- Existing questions, scores, exports, and progress
- Add-on-complete behavior
- Remove-on-incomplete behavior
- Initial-load reconciliation
- Full-course completion recalculation

## 2. Add the Theme Loader to Four Assessment Gateways

In each file below, add this exact line immediately before the existing inline `<script>`:

```html
<script src="../../science-theme-loader.js" defer></script>
```

Files:

```text
courses/science/integrated-science-9/assessments/units-01-04/index.html
courses/science/integrated-science-9/assessments/units-05-07/index.html
courses/science/integrated-science-9/assessments/units-08-09/index.html
courses/science/integrated-science-9/assessments/final-exam/index.html
```

Expected section:

```html
<meta content="dark light" name="color-scheme"/>
<title>...</title>
<script src="../../science-theme-loader.js" defer></script>
<script>
  document.addEventListener("DOMContentLoaded", ...
```

Do not remove or replace the existing inline assessment script.
