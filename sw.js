;
const CACHE_NAME='V1_cache_programador_uap';
urlsToCache = [
    './',
    './img/favicon.png',
    'https://getbootstrap.com/docs/5.2/examples/cover/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css',
    './cover.css',
    './manifest.json',
    'https://getbootstrap.com/',
    'https://twitter.com/mdo',
    './script.js'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
          return cache.addAll(urlsToCache)
          .then(()=>self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if (cacheWhitelist.indexOf(cacheName)=== -1){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', e => {
   e.respondWith(
    caches.match(e.request)
    .then(res => {
        if(res){
            return res
        }
           return fetch(e.request)
    })
   )
})
