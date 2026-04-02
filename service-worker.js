/* ══════════════════════════════════════
   KasirGO — service-worker.js
   PWA Service Worker v1.0
   Strategi: Cache-First untuk aset statis
             Network-First untuk halaman utama
   ══════════════════════════════════════ */

const CACHE_NAME     = 'kasirgo-v1.0.0';
const OFFLINE_URL    = '/offline.html';

// Aset yang di-cache saat install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/offline.html',
  '/manifest.json',
  // Bootstrap
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  // Font Awesome
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  // jQuery
  'https://code.jquery.com/jquery-3.6.0.min.js',
  // SweetAlert2
  'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  // Chart.js
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  // DataTables
  'https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css',
  'https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js',
  'https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js',
];

// ═══ INSTALL ═══
self.addEventListener('install', event => {
  console.log('[SW] Install KasirGO Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching assets...');
        // Cache aset lokal dulu (lebih penting, tidak boleh gagal)
        return cache.addAll(['/', '/index.html', '/style.css', '/app.js', '/offline.html', '/manifest.json'])
          .then(() => {
            // Cache CDN secara paralel, abaikan jika gagal
            const cdnAssets = PRECACHE_ASSETS.filter(url => url.startsWith('http'));
            return Promise.allSettled(cdnAssets.map(url =>
              cache.add(url).catch(err => console.warn('[SW] CDN cache miss:', url, err.message))
            ));
          });
      })
      .then(() => {
        console.log('[SW] Cache selesai, skip waiting...');
        return self.skipWaiting();
      })
      .catch(err => console.error('[SW] Install error:', err))
  );
});

// ═══ ACTIVATE ═══
self.addEventListener('activate', event => {
  console.log('[SW] Activate KasirGO Service Worker');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Menghapus cache lama:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// ═══ FETCH ═══
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Abaikan request non-GET dan chrome-extension
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Strategi untuk navigasi halaman utama: Network-First
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache response terbaru
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // Offline: coba dari cache, fallback ke offline.html
          return caches.match(request)
            .then(cached => cached || caches.match(OFFLINE_URL));
        })
    );
    return;
  }

  // Strategi untuk aset statis: Cache-First
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        // Tersedia di cache, gunakan langsung
        // Update cache di background (stale-while-revalidate)
        fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
          }
        }).catch(() => {/* Offline, tidak masalah */});
        return cachedResponse;
      }

      // Tidak ada di cache: ambil dari network
      return fetch(request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
          return networkResponse;
        }
        // Simpan ke cache untuk berikutnya
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return networkResponse;
      }).catch(() => {
        // Jika gambar gagal, kembalikan placeholder
        if (request.destination === 'image') {
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#e8f1fc"/><text x="50" y="55" text-anchor="middle" fill="#4a90e2" font-size="30">📦</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
        return new Response('Konten tidak tersedia offline', { status: 503 });
      });
    })
  );
});

// ═══ BACKGROUND SYNC (opsional, untuk transaksi offline) ═══
self.addEventListener('sync', event => {
  if (event.tag === 'sync-transaksi') {
    console.log('[SW] Background sync: transaksi');
    // Implementasi sinkronisasi jika diperlukan di masa depan
  }
});

// ═══ PUSH NOTIFICATION (opsional) ═══
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const options = {
    body:    data.body    || 'Ada notifikasi dari KasirGO',
    icon:    '/icons/icon-192.png',
    badge:   '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data:    { url: data.url || '/' },
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'KasirGO', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || '/'));
});

console.log('[SW] KasirGO Service Worker loaded ✅');
