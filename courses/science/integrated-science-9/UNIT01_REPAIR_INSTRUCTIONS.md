# Science 9 Unit 01 Repair

Upload this ZIP from the **repository root**.

It restores only the files that were missing or placed at the wrong level:

```text
courses/science/integrated-science-9/
├── course-map.json
└── teacher-resources/
    ├── UNIT01_ANSWER_KEY.md
    ├── UNIT01_RUBRICS.md
    ├── UNIT01_STANDARDS_MAPPING.md
    └── UNIT01_TEACHER_GUIDE.md
```

## Important

Allow `courses/science/integrated-science-9/course-map.json` to replace the existing file.

The replacement map:

- marks Unit 00 Open
- marks Unit 01 Open
- keeps Units 02–12 Planned
- preserves the 36-week total
- sets the current release to Unit 01

## Optional cleanup

After the replacement is confirmed, delete this accidental duplicate:

```text
courses/science/integrated-science-9/units/unit-01/course-map.json
```

The duplicate does not control the course landing page, but removing it prevents future confusion.
