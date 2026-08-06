# Future High School Profile Integration

The Geometry landing page stores its pin in:

- storage key: `khaemenes-high-pinned-courses-v2`
- course ID: `geometry`

When the High School portal is refreshed, add this catalog entry:

```js
{
  id: "geometry",
  title: "Geometry & Spatial Design",
  href: "courses/mathematics/geometry/",
  subject: "Mathematics",
  level: "Open-Age · Placement-Based",
  description: "36-week visual, printable Geometry course with proof, CAD, Arcade labs, assessment, and records."
}
```

No temporary profile bridge is required before that planned refresh.
