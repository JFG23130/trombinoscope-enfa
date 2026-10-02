self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  const chemin = new URL(event.request.url).pathname;
  if (!chemin.includes("/fiches/") || !chemin.endsWith(".vcf")) return;
  event.respondWith(
    caches.open("fiches-contact").then(cache => cache.match(event.request.url)).then(reponse => {
      if (reponse) return reponse;
      return new Response("BEGIN:VCARD\r\nVERSION:3.0\r\nEND:VCARD\r\n", {
        headers: { "Content-Type": "text/vcard;charset=utf-8" }
      });
    })
  );
});
