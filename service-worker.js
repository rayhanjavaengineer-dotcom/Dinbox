
const CACHE_NAME = "dinbox-shell-v2";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/responsive.css",
  "./js/storage.js",
  "./js/language.js",
  "./js/theme.js",
  "./js/router.js",
  "./js/dashboard.js",
  "./js/modules.js",
  "./js/calculator.js",
  "./js/backup.js",
  "./js/app.js",
  "./data/bn.json",
  "./data/en.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

// Install: Cache available app files without failing
// the entire installation if one optional file is missing.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.all(
        APP_SHELL.map(async (file) => {
          try {
            const response = await fetch(file, {
              cache: "reload"
            });

            if (response.ok) {
              await cache.put(file, response);
            }
          } catch (error) {
            console.warn("DINBOX cache skipped:", file);
          }
        })
      );

      await self.skipWaiting();
    })
  );
});

// Activate and remove old DINBOX caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("dinbox-shell-") &&
                             key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Network first for pages; cache first for static files.
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put("./index.html", copy));
          }
          return response;
        })
        .catch(async () => {
          return await caches.match("./index.html") ||
                 new Response("DINBOX is offline.", {
                   status: 503,
                   headers: {
                     "Content-Type": "text/plain; charset=utf-8"
                   }
                 });
        })
    );

    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, copy));
        }

        return response;
      });
    })
  );
});
