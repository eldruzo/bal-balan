importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if(workbox) { 
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    {url: "/", revision: "1"},
    {url: "/images/belanda.png", revision: "1"},
    {url: "/images/champion.png", revision: "1"},
    {url: "/images/empty.gif", revision: "1"},
    {url: "/images/favicon.ico", revision: "1"},
    {url: "/images/favorite.jpg", revision: "1"},
    {url: "/images/icon.png", revision: "1"},
    {url: "/images/icon-192.png", revision: "1"},
    {url: "/images/inggris.png", revision: "1"},
    {url: "/images/jerman.png", revision: "1"},
    {url: "/images/league.webp", revision: "1"},
    {url: "/images/loading.gif", revision: "1"},
    {url: "/images/nav-bg.jpg", revision: "1"},
    {url: "/images/no-internet.gif", revision: "1"},
    {url: "/images/prancis.png", revision: "1"},
    {url: "/images/profile.jpg", revision: "1"},
    {url: "/images/spanyol.png", revision: "1"},
    {url: "/images/team-dummy.png", revision: "1"},
    {url: "/images/team.png", revision: "1"},
    {url: "/images/trophy.png", revision: "1"},
    {url: "/pages/about.html", revision: "1"},
    {url: "/pages/favorite.html", revision: "1"},
    {url: "/pages/home.html", revision: "1"},
    {url: "/pages/league-detail.html", revision: "1"},
    {url: "/pages/league.html", revision: "1"},
    {url: "/pages/nav.html", revision: "1"},
    {url: "/pages/sidenav.html", revision: "1"},
    {url: "/pages/team-detail.html", revision: "1"},
    {url: "/pages/team.html", revision: "1"},
    {url: "/index.html", revision: "1"},
    {url: "/index.js", revision: "1"},
    {url: "/manifest.json", revision: "1"},
    {url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1"},
    {url: "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision: "1"}
  ],
  {
    ignoreUrlParametersMatching: [/&*/]
  });

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
  );

  const apiCache = ({cache, request, cachedResponse}) => {
    if(cachedResponse) {
      return cachedResponse;
    }

    const urlToMatch = "https://api.football-data.org/v2/";
    return caches.match(urlToMatch);
  }

  const apiCachingStrategy = workbox.strategies.cacheFirst({
    cacheName: 'api',
    cacheExouration: {
      maxEntries: 100
    },
    cacheableResponse: {statuses: [0, 200]},
    plugins: [{apiCache}]
  })
  workbox.routing.registerRoute(
    new RegExp('^https://api\.football-data\.org/v2/'),
    apiCachingStrategy
  );

  
      

  self.addEventListener('push', (event) => {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'img/notification.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
} else {
  console.log(`Workbox gagal dimuat`);
}