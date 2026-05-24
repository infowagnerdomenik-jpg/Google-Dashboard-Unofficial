// Minimaler Service Worker, um PWA-Installierbarkeit zu gewährleisten
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  // Kein Offline-Caching: Wir leiten alle Anfragen einfach durch.
  event.respondWith(fetch(event.request));
});
