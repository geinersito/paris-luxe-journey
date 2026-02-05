
// Basic service worker for PWA support
const CACHE_NAME = 'paris-luxe-v2';

// Archivos para pre-cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Error in cache.addAll:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Solo procesar peticiones HTTP/HTTPS
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // No interceptar peticiones a la API o chrome-extension
  if (
    event.request.url.includes('/api/') ||
    event.request.url.includes('chrome-extension')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request.clone())
          .then((response) => {
            // No cachear errores o respuestas no válidas
            if (!response || response.status !== 200) {
              return response;
            }

            // Verificar si es un recurso que queremos cachear
            const isAsset = /\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i.test(event.request.url);
            if (!isAsset) {
              return response;
            }

            // Clonar la respuesta antes de cachear
            const responseToCache = response.clone();

            // Intentar cachear solo si es una petición GET
            if (event.request.method === 'GET') {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                })
                .catch((error) => {
                  console.error('Error caching response:', error);
                });
            }

            return response;
          })
          .catch((error) => {
            console.error('Fetch failed:', error);
            // Intentar devolver una versión cacheada como fallback
            return caches.match(event.request);
          });
      })
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
