// A basic service worker to satisfy PWA install requirements
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activated');
});

self.addEventListener('fetch', (e) => {
  // Simple pass-through fetch
  e.respondWith(fetch(e.request).catch(() => new Response('Offline')));
});