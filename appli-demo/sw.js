const CACHE = 'sonigo-fe211d23';
const FILES = ["./", "index.html", "manifest.webmanifest", "01-accueil.jpg", "02-connexion.png", "circ1.jpg", "circ2.jpg", "circ3.jpg", "circ4.jpg", "circ5.jpg", "circ6.jpg", "gdansk.jpg", "grzesiek.jpg", "ines.jpg", "kaska.jpg", "krakow.jpg", "marek.jpg", "monika.jpg", "smok.png", "tomek.jpg", "varsovie.jpg", "zakopane.jpg", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match('index.html'))));
});
