/* ---------------------------------------------------------
   SERVICE WORKER — app-shell caching for offline use.
   Bump CACHE_VERSION any time index.html or js/bundle.js change,
   so returning users get the new files instead of a stale cache.
--------------------------------------------------------- */
const CACHE_VERSION = "v77";
const CACHE_NAME = `eduexam-shell-${CACHE_VERSION}`;

// کش جدا برای داده‌ی خودِ آزمون (سؤال‌ها، لیست کلاس/roster). عمداً از
// CACHE_NAME جداست و به CACHE_VERSION وابسته نیست — چون CACHE_NAME هر
// آپدیت اپ پاک می‌شه (پایین، توی activate)، ولی ممکنه دقیقاً همون لحظه
// یه دانش‌آموز وسط آزمون آفلاین باشه؛ نباید با یه دیپلوی جدید آزمونش رو
// از دست بده. این کش با یه رویداد جدا (که اینجا نداریم) پاک نمی‌شه —
// عمراً؛ فقط با گذشت زمان (کوتای storage مرورگر) ممکنه پاک بشه.
const EXAM_CACHE_NAME = "eduexam-examdata-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./js/bundle.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/login-hero.jpg",
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // addAll fails the whole install if even one request fails (e.g. a
      // flaky CDN request during install) — fetch individually instead so
      // one bad request can't block caching of everything else.
      Promise.all(
        APP_SHELL.map((url) =>
          fetch(url, { cache: "no-cache" })
            .then((res) => (res.ok ? cache.put(url, res) : null))
            .catch(() => null)
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      // EXAM_CACHE_NAME عمداً از این پاک‌سازی مستثناست — نگاه کن به
      // توضیح بالای تعریفش.
      Promise.all(names.filter((n) => n !== CACHE_NAME && n !== EXAM_CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return; // never intercept POST/DELETE (KV writes)

  const url = new URL(req.url);

  // آزمونِ دانش‌آموز: تنها API GET‌ای که عمداً کش می‌کنیم — تا اگه
  // دانش‌آموز وسط آزمون آفلاین بشه، یا صفحه به هر دلیلی (رفرش تصادفی،
  // برگشتن اپ از بک‌گراند) دوباره لود بشه، بازم بتونه ادامه بده؛ نه فقط
  // ثبتِ پاسخ نهایی که از قبل آفلاین کار می‌کرد. استراتژی network-first:
  // وقتی آنلاینه همیشه نسخه‌ی تازه می‌گیره و کش رو آپدیت می‌کنه (چون یه
  // معلم ممکنه بعد از شروع آزمون سؤال رو ویرایش کنه)؛ وقتی آفلاینه از
  // همون کش جواب می‌ده — که حتماً یک‌بار پر شده، چون دانش‌آموز بدون اون
  // اصلاً نمی‌تونست وارد صفحه‌ی آزمون بشه. آدرس با کوئری‌استرینگ کامل
  // (examId + اسم، برای حالت بانک سؤال تصادفی) کلید کش می‌شه، پس هر
  // دانش‌آموز نسخه‌ی مخصوص خودش رو می‌گیره.
  if (url.pathname === "/api/exam-session") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(EXAM_CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // API calls must always go to the network live — never serve stale exam
  // data or KV responses from cache.
  if (url.pathname.startsWith("/api/")) return;

  // App shell + CDN scripts (+ هر عکس/فایل دیگه‌ای که صفحه بارگذاری کنه،
  // مثل تصویر سؤال‌ها): cache-first, falling back to network, and
  // refreshing the cache in the background when the network succeeds.
  // همین رفتار موجود، خودبه‌خود عکس سؤالات رو هم اگه یه‌بار آنلاین دیده
  // شده باشن، برای دفعه‌ی بعد (حتی آفلاین) کش می‌کنه.
  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
