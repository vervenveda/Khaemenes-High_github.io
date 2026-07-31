/* Khaemenes High Service Worker · Design v20 */
const CACHE_NAME = "khaemenes-high-design-v20";

const APP_SHELL = [
  "./",
  "./index.html",
  "./courses/mathematics/pre-algebra/course-ui.css",
  "./courses/mathematics/pre-algebra/assessments/assets/assessment-suite.css",
  "./courses/mathematics/pre-algebra/assessments/assets/exam-engine.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request)
        .then(response => {
          if (
            response &&
            response.status === 200 &&
            response.type !== "opaque"
          ) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, copy);
            });
          }

          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
