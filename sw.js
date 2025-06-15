const CACHE_NAME = 'tanvir-studio-v1';

// List of essential files to cache for the app to work offline
const URLS_to_cache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/images/icons/icon-192x192.png' // An example icon
    // Add other important assets like logo, main background image etc.
];

// 1. Install the Service Worker and cache the app shell
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching App Shell');
                return cache.addAll(URLS_to_cache);
            })
    );
});

// 2. Activate the Service Worker and clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. Intercept fetch requests and serve from cache if available
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // If the request is in the cache, return it
                if (response) {
                    return response;
                }
                // Otherwise, fetch it from the network
                return fetch(event.request);
            })
    );
});
