# Root Shell Validation

## Package

Khaemenes Academy — International Integrated Science 9  
Course code: `KH-SCI-IIS9`

## Automated checks completed

- HTML document structure parsed successfully
- Required root files present
- CSS and JavaScript references resolve within the package
- JavaScript syntax checked with Node.js
- Duplicate HTML IDs checked
- `course-map.json` parsed successfully
- Course duration confirmed at 36 weeks
- Thirteen sections confirmed: readiness section plus Units 01–12
- Every instructional section explicitly marked `planned`
- Planned sections do not create active student routes
- Relative campus and Grade 9 breadcrumb paths follow the existing Khaemenes High course depth
- Light/dark theme controls included
- Keyboard focus styles included
- Reduced-motion support included
- Mobile responsive rules included
- Print rules included
- Local progress export, import, and reset included
- Offline information page included
- No external retail links included
- No repository-browsing links included
- No public answer-key link included

## Manual deployment checks still required

After upload to GitHub Pages:

1. Open the Science 9 course route.
2. Test Campus Home and Grade 9 Portal.
3. Test all six governance-document links.
4. Test theme persistence.
5. Mark and unmark a planned section.
6. Export and re-import progress.
7. Test narrow mobile width.
8. Print preview the course map.
9. Disconnect the network and confirm the root page already open remains usable.
10. Confirm the High School service worker does not serve a stale cached version.
