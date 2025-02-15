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
  'icon-192.png',
  'icon-512.png',
  'manifest.json',
  // อาจมีไฟล์อื่นๆ ที่ต้องการให้โหลด offline
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

// Activate service worker and clear old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];  // Only keep the latest cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch request and serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
