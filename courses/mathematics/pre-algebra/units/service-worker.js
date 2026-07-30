"use strict";

const CACHE_VERSION = "khaemenes-high-unit04-v7";
const PRECACHE_FILES = [
  "./",
  "./index.html",
  "./README.md",
  "./LICENSE",
  "./SECURITY.md",
  "./CONTRIBUTING.md",
  "./manifest.webmanifest",
  "./grades/grade-09/",
  "./grades/grade-09/index.html",
  "./grades/grade-09/course-catalog.json",
  "./grades/grade-09/planner.json",
  "./courses/mathematics/pre-algebra/",
  "./courses/mathematics/pre-algebra/index.html",
  "./courses/mathematics/pre-algebra/course-map.json",
  "./courses/mathematics/pre-algebra/diagnostic/",
  "./courses/mathematics/pre-algebra/diagnostic/index.html",
  "./courses/mathematics/pre-algebra/units/unit-01/",
  "./courses/mathematics/pre-algebra/units/unit-01/README.md",
  "./courses/mathematics/pre-algebra/units/unit-01/assessment/answer-key.json",
  "./courses/mathematics/pre-algebra/units/unit-01/assessment/mastery-check.html",
  "./courses/mathematics/pre-algebra/units/unit-01/assets/assessment-engine.js",
  "./courses/mathematics/pre-algebra/units/unit-01/assets/lesson-engine.js",
  "./courses/mathematics/pre-algebra/units/unit-01/assets/unit-dashboard.js",
  "./courses/mathematics/pre-algebra/units/unit-01/assets/unit.css",
  "./courses/mathematics/pre-algebra/units/unit-01/family-guide.html",
  "./courses/mathematics/pre-algebra/units/unit-01/index.html",
  "./courses/mathematics/pre-algebra/units/unit-01/lessons/lesson-01-number-systems.html",
  "./courses/mathematics/pre-algebra/units/unit-01/lessons/lesson-02-factors-multiples.html",
  "./courses/mathematics/pre-algebra/units/unit-01/lessons/lesson-03-primes-divisibility.html",
  "./courses/mathematics/pre-algebra/units/unit-01/lessons/lesson-04-gcf-lcm.html",
  "./courses/mathematics/pre-algebra/units/unit-01/lessons/lesson-05-order-operations.html",
  "./courses/mathematics/pre-algebra/units/unit-01/lessons/lesson-06-estimation-reasonableness.html",
  "./courses/mathematics/pre-algebra/units/unit-01/practice/core.html",
  "./courses/mathematics/pre-algebra/units/unit-01/practice/extended.html",
  "./courses/mathematics/pre-algebra/units/unit-01/practice/foundation.html",
  "./courses/mathematics/pre-algebra/units/unit-01/projects/number-systems-investigation.html",
  "./courses/mathematics/pre-algebra/units/unit-01/standards-map.json",
  "./courses/mathematics/pre-algebra/units/unit-01/teacher-guide.html",
  "./courses/mathematics/pre-algebra/units/unit-01/unit-map.json",
  "./courses/mathematics/pre-algebra/units/unit-01/vocabulary.json",
  "./courses/mathematics/pre-algebra/units/unit-02/",
  "./courses/mathematics/pre-algebra/units/unit-02/README.md",
  "./courses/mathematics/pre-algebra/units/unit-02/assessment/answer-key.json",
  "./courses/mathematics/pre-algebra/units/unit-02/assessment/mastery-check.html",
  "./courses/mathematics/pre-algebra/units/unit-02/assets/assessment-engine.js",
  "./courses/mathematics/pre-algebra/units/unit-02/assets/lesson-engine.js",
  "./courses/mathematics/pre-algebra/units/unit-02/assets/unit-dashboard.js",
  "./courses/mathematics/pre-algebra/units/unit-02/assets/unit.css",
  "./courses/mathematics/pre-algebra/units/unit-02/family-guide.html",
  "./courses/mathematics/pre-algebra/units/unit-02/index.html",
  "./courses/mathematics/pre-algebra/units/unit-02/lessons/lesson-01-integers-in-context.html",
  "./courses/mathematics/pre-algebra/units/unit-02/lessons/lesson-02-opposites-absolute-value.html",
  "./courses/mathematics/pre-algebra/units/unit-02/lessons/lesson-03-compare-order-integers.html",
  "./courses/mathematics/pre-algebra/units/unit-02/lessons/lesson-04-adding-integers.html",
  "./courses/mathematics/pre-algebra/units/unit-02/lessons/lesson-05-subtracting-integers.html",
  "./courses/mathematics/pre-algebra/units/unit-02/lessons/lesson-06-multiply-divide-integers.html",
  "./courses/mathematics/pre-algebra/units/unit-02/lessons/lesson-07-coordinate-plane-signed-change.html",
  "./courses/mathematics/pre-algebra/units/unit-02/lessons/lesson-08-multi-step-integer-applications.html",
  "./courses/mathematics/pre-algebra/units/unit-02/practice/core.html",
  "./courses/mathematics/pre-algebra/units/unit-02/practice/extended.html",
  "./courses/mathematics/pre-algebra/units/unit-02/practice/foundation.html",
  "./courses/mathematics/pre-algebra/units/unit-02/projects/signed-data-investigation.html",
  "./courses/mathematics/pre-algebra/units/unit-02/standards-map.json",
  "./courses/mathematics/pre-algebra/units/unit-02/teacher-guide.html",
  "./courses/mathematics/pre-algebra/units/unit-02/unit-map.json",
  "./courses/mathematics/pre-algebra/units/unit-02/vocabulary.json",
  "./courses/mathematics/pre-algebra/units/unit-03/README.md",
  "./courses/mathematics/pre-algebra/units/unit-03/assessment/answer-key.json",
  "./courses/mathematics/pre-algebra/units/unit-03/assessment/mastery-check.html",
  "./courses/mathematics/pre-algebra/units/unit-03/assets/assessment-engine.js",
  "./courses/mathematics/pre-algebra/units/unit-03/assets/lesson-engine.js",
  "./courses/mathematics/pre-algebra/units/unit-03/assets/unit-dashboard.js",
  "./courses/mathematics/pre-algebra/units/unit-03/assets/unit.css",
  "./courses/mathematics/pre-algebra/units/unit-03/family-guide.html",
  "./courses/mathematics/pre-algebra/units/unit-03/index.html",
  "./courses/mathematics/pre-algebra/units/unit-03/lessons/lesson-01-rational-numbers-fraction-meaning.html",
  "./courses/mathematics/pre-algebra/units/unit-03/lessons/lesson-02-equivalent-fractions-simplifying.html",
  "./courses/mathematics/pre-algebra/units/unit-03/lessons/lesson-03-compare-order-rational-numbers.html",
  "./courses/mathematics/pre-algebra/units/unit-03/lessons/lesson-04-add-subtract-rational-numbers.html",
  "./courses/mathematics/pre-algebra/units/unit-03/lessons/lesson-05-multiply-fractions-mixed-numbers.html",
  "./courses/mathematics/pre-algebra/units/unit-03/lessons/lesson-06-divide-fractions-complex-fractions.html",
  "./courses/mathematics/pre-algebra/units/unit-03/lessons/lesson-07-decimal-operations-repeating-decimals.html",
  "./courses/mathematics/pre-algebra/units/unit-03/lessons/lesson-08-conversions-estimation-applications.html",
  "./courses/mathematics/pre-algebra/units/unit-03/practice/core.html",
  "./courses/mathematics/pre-algebra/units/unit-03/practice/extended.html",
  "./courses/mathematics/pre-algebra/units/unit-03/practice/foundation.html",
  "./courses/mathematics/pre-algebra/units/unit-03/projects/rational-quantity-investigation.html",
  "./courses/mathematics/pre-algebra/units/unit-03/standards-map.json",
  "./courses/mathematics/pre-algebra/units/unit-03/teacher-guide.html",
  "./courses/mathematics/pre-algebra/units/unit-03/unit-map.json",
  "./courses/mathematics/pre-algebra/units/unit-03/vocabulary.json",
  "./courses/mathematics/pre-algebra/units/unit-04/README.md",
  "./courses/mathematics/pre-algebra/units/unit-04/assessment/answer-key.json",
  "./courses/mathematics/pre-algebra/units/unit-04/assessment/mastery-check.html",
  "./courses/mathematics/pre-algebra/units/unit-04/assets/assessment-engine.js",
  "./courses/mathematics/pre-algebra/units/unit-04/assets/lesson-engine.js",
  "./courses/mathematics/pre-algebra/units/unit-04/assets/unit-dashboard.js",
  "./courses/mathematics/pre-algebra/units/unit-04/assets/unit.css",
  "./courses/mathematics/pre-algebra/units/unit-04/family-guide.html",
  "./courses/mathematics/pre-algebra/units/unit-04/index.html",
  "./courses/mathematics/pre-algebra/units/unit-04/lessons/lesson-01-ratio-meaning-equivalent-ratios.html",
  "./courses/mathematics/pre-algebra/units/unit-04/lessons/lesson-02-ratio-tables-double-number-lines.html",
  "./courses/mathematics/pre-algebra/units/unit-04/lessons/lesson-03-rates-unit-rates-fair-comparisons.html",
  "./courses/mathematics/pre-algebra/units/unit-04/lessons/lesson-04-proportional-tables-graphs-equations.html",
  "./courses/mathematics/pre-algebra/units/unit-04/lessons/lesson-05-solving-proportions-direct-variation.html",
  "./courses/mathematics/pre-algebra/units/unit-04/lessons/lesson-06-scale-drawings-maps-similar-figures.html",
  "./courses/mathematics/pre-algebra/units/unit-04/lessons/lesson-07-proportional-vs-nonproportional.html",
  "./courses/mathematics/pre-algebra/units/unit-04/lessons/lesson-08-conversions-multistep-proportional-modelling.html",
  "./courses/mathematics/pre-algebra/units/unit-04/practice/core.html",
  "./courses/mathematics/pre-algebra/units/unit-04/practice/extended.html",
  "./courses/mathematics/pre-algebra/units/unit-04/practice/foundation.html",
  "./courses/mathematics/pre-algebra/units/unit-04/projects/community-scale-rate-investigation.html",
  "./courses/mathematics/pre-algebra/units/unit-04/standards-map.json",
  "./courses/mathematics/pre-algebra/units/unit-04/teacher-guide.html",
  "./courses/mathematics/pre-algebra/units/unit-04/unit-map.json",
  "./courses/mathematics/pre-algebra/units/unit-04/vocabulary.json"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => Promise.allSettled(PRECACHE_FILES.map(path => cache.add(new Request(path, { cache: "reload" }))))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("khaemenes-high-") && key !== CACHE_VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

function fallbackFor(url) {
  const path = url.pathname;
  if (path.includes("/units/unit-04")) return "./courses/mathematics/pre-algebra/units/unit-04/index.html";
  if (path.includes("/units/unit-03")) return "./courses/mathematics/pre-algebra/units/unit-03/index.html";
  if (path.includes("/units/unit-02")) return "./courses/mathematics/pre-algebra/units/unit-02/index.html";
  if (path.includes("/units/unit-01")) return "./courses/mathematics/pre-algebra/units/unit-01/index.html";
  if (path.includes("/courses/mathematics/pre-algebra/diagnostic")) return "./courses/mathematics/pre-algebra/diagnostic/index.html";
  if (path.includes("/courses/mathematics/pre-algebra")) return "./courses/mathematics/pre-algebra/index.html";
  if (path.includes("/grades/grade-09")) return "./grades/grade-09/index.html";
  return "./index.html";
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(response => { if (response && response.ok) { const copy = response.clone(); caches.open(CACHE_VERSION).then(cache => cache.put(request, copy)); } return response; }).catch(async () => (await caches.match(request)) || (await caches.match(fallbackFor(url))) || caches.match("./index.html")));
    return;
  }
  event.respondWith(caches.match(request).then(cached => { const network = fetch(request).then(response => { if (response && response.ok) { const copy = response.clone(); caches.open(CACHE_VERSION).then(cache => cache.put(request, copy)); } return response; }).catch(() => cached); return cached || network; }));
});

self.addEventListener("message", event => { if (event.data === "SKIP_WAITING") self.skipWaiting(); });
