const staticCache = "Static-cache-v7";
const dynamicCache = "Dynamic-cache-v7";


const assets = [
    "/",
    "/index.html",
    "/pages/fallback.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/app.css",
    "/img/recipe.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
];

//Cache Size Limit
const limitCacheSize =(name, size) => {
    caches.open(name).then((cache) => {
        cache.keys().then((keys) => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};
self.addEventListener("install", function(event) {
    console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
        caches.open(staticCache).then(function (cache) {
        console.log("SW: Precaching App shell");
       // cache.add('/js/app.js')
       cache.addAll(assets);
    })
    );
});

self.addEventListener("activate", function(event){
    // console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
        caches.keys().then((keys) => {
        return Promise.all(
            keys
            .filter((key) => key !== staticCache && key !== dynamicCache)
            .map((key) => caches.delete(key))
        );
    })
    );
});

  self.addEventListener("fetch", function (event) {
  //  console.log(`SW: Fetching: ${event.request.url}`);
  if (!(event.request.url.indexOf('http') === 0)) return; //14:50 of video 13
    event.respondWith(
      caches.match(event.request).then((response) => {
          return (
              response || 
          fetch(event.request).then((fetchRes) => {
              return caches.open(dynamicCache).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(dynamicCache, 3);
                return fetchRes;
              });
          })
          );
      }).catch(() => caches.match("pages/fallback.html"))
    );
});