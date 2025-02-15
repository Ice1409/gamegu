const cacheName = 'unity-game-cache-v1';
const filesToCache = [
  '/',
  'index.html',
  'Build/webbuild.loader.js',
  'Build/webbuild.data',
  'Build/webbuild.framework.js',
  'Build/webbuild.wasm',
  'TemplateData/style.css',
  'TemplateData/favicon.ico',
  // อาจจะมีไฟล์อื่นๆ ที่ต้องการให้โหลด offline
];

// Install service worker and cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(filesToCache);
      })
  );
});

// Fetch request and serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If we have a cached response, return it. Otherwise, fetch from network
        return response || fetch(event.request);
      })
  );
});
