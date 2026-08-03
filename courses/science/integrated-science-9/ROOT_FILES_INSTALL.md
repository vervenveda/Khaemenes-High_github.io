# Root Files Installation

## Destination

Upload the contents of this ZIP directly into:

```text
courses/science/integrated-science-9/
```

Do not create an extra nested `Khaemenes_Science_9_Root_Files` folder in the repository.

## Files

- `index.html`
- `course-ui.css`
- `course-ui.js`
- `course-map.json`
- `offline.html`
- `README.md`
- `COURSE_CHARTER.md`
- `CURRICULUM_MAP.md`
- `STANDARDS_CROSSWALK.md`
- `ASSESSMENT_FRAMEWORK.md`
- `LAB_SAFETY_FRAMEWORK.md`
- `MATERIALS_FRAMEWORK.md`
- `ROOT_FILES_INSTALL.md`
- `ROOT_VALIDATION.md`

## Important status behavior

Every instructional section is currently marked `planned` in `course-map.json`. The landing page therefore displays the course architecture without linking students to nonexistent unit pages.

When a unit package has been uploaded and validated:

1. Open `course-map.json`.
2. Change that unit's `status` from `planned` to `open`.
3. Confirm its `path`.
4. Test the route on the deployed GitHub Pages site.
5. Update the current-release note when appropriate.

## Grade 9 catalog

The Grade 9 catalog should not be changed to `open` until this root route is deployed and tested:

```text
courses/science/integrated-science-9/
```

## Offline note

`offline.html` is included now, but no service-worker update is included in this package. Add the Science 9 route to the campus service worker only after its stable instructional shell and required assets are deployed.
