# Future High School Profile Integration

The Algebra II course already writes the course ID:

`algebra-2`

to the shared local-storage list:

`khaemenes-high-pinned-courses-v2`

When the High School homepage is refreshed after the next courses are complete, add this catalog entry:

```js
{
  id: "algebra-2",
  icon: "A2",
  title: "Algebra II & Advanced Functions",
  status: "Active",
  url: "courses/mathematics/algebra-2/index.html",
  description: "Open-age advanced algebra, functions, complex numbers, logarithms, trigonometry, probability, statistics, modelling, assessments, and records."
}
```

No temporary profile bridge is required now because the High School page will be rebuilt once the course catalog is larger.
