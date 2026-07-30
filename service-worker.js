"use strict";

const CACHE_VERSION = "khaemenes-high-grade9-v3";
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
  "./courses/mathematics/pre-algebra/diagnostic/index.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => Promise.allSettled(
        PRECACHE_FILES.map(path => cache.add(new Request(path, { cache: "reload" })))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith("khaemenes-high-") && key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

function fallbackFor(url) {
  const path = url.pathname;
  if (path.includes("/courses/mathematics/pre-algebra/diagnostic")) {
    return "./courses/mathematics/pre-algebra/diagnostic/index.html";
  }
  if (path.includes("/courses/mathematics/pre-algebra")) {
    return "./courses/mathematics/pre-algebra/index.html";
  }
  if (path.includes("/grades/grade-09")) {
    return "./grades/grade-09/index.html";
  }
  return "./index.html";
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          return (await caches.match(request)) ||
                 (await caches.match(fallbackFor(url))) ||
                 caches.match("./index.html");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
