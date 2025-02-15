const CACHE_NAME = "unity-game-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/Build/build.wasm",
  "/Build/build.data",
  "/Build/build.js"
];

// ติดตั้ง Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ดึงข้อมูลจาก Cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
