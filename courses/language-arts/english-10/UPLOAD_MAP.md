# English 10 Upload Map

Upload this folder exactly as:

```text
courses/language-arts/english-10/
```

Do not flatten the folders.

## Minimum integration links

Add or update the Grade 10 / English II destination in:

```text
courses/language-arts/index.html
```

Target:

```text
./english-10/index.html
```

Optional grade alias:

```text
./english-10/grades/grade-10/index.html
```

## Root-level integration

If the high-school home links directly to courses, use:

```text
courses/language-arts/english-10/index.html
```

## Service worker

This package contains a course-scoped service worker. If the repository root already controls the course path, merge the course URLs into the root cache or use only one controlling service worker to avoid stale-cache conflicts.
