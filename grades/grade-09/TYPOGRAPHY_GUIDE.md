# Pre-Algebra Typography Control Guide

## Current landing page

`index.html` contains the original embedded course layout and course-specific
JavaScript. It controls the hero, course map, unit cards, assessment cards,
practice links, progress controls, and navigation.

The boosted version also loads:

`course-ui.css`

This new shared stylesheet should become the typography source for all
Pre-Algebra pages.

## Files that typically control each area

### Assignments

Files inside:

`assignments/`

Each assignment HTML file controls its own content. Add `course-ui.css` and
wrap the document in:

```html
<main class="assignment-page">
```

### Tests and quizzes

Files inside:

`assessments/`

This includes the diagnostic, unit quizzes, midterm, final examination,
administration guide, and answer keys. Use:

```html
<main class="test-page">
```

For answer keys:

```html
<main class="answer-key-page">
```

### Resources

Files inside:

`resources/`

Use:

```html
<main class="resource-page">
```

### Lessons and unit pages

Files inside:

`units/unit-01/` through `units/unit-13/`

Use:

```html
<main class="lesson-page">
```

### Records and certificates

Files inside:

`records/`

Use:

```html
<main class="record-page">
```

## Shared link

From the Pre-Algebra root `index.html`:

```html
<link rel="stylesheet" href="course-ui.css">
```

From a file one folder deep, such as `assessments/midterm-units-01-07.html`:

```html
<link rel="stylesheet" href="../course-ui.css">
```

From a unit page such as `units/unit-01/index.html`:

```html
<link rel="stylesheet" href="../../course-ui.css">
```

This allows one stylesheet to update typography across the full course.
