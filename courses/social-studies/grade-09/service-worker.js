const CACHE='khaemenes-global-studies-9-v1';
const SHELL=['./','./index.html','./styles.css','./app.js','./course-data.js','./offline.html','./manifest.webmanifest','./assets/global-studies-seal.svg','./resources/index.html','./teacher/index.html','./teacher/teacher.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return response;
  }).catch(()=>event.request.mode==='navigate'?caches.match('./offline.html'):undefined)));
});