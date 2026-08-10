/* ---------------------------------------------------------
   آزمون‌ساز معلم — Worker backend
   © ghobeishawi - All rights reserved.
---------------------------------------------------------- */

// ==========================================
// توابع کمکی
// ==========================================
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function uid() {
  // ترکیب timestamp (پایه ۳۶) + رشته تصادفی برای کاهش شدید احتمال تکرار
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

// ==========================================
// امنیت رمز عبور — هش سمت سرور با salt
// ==========================================
// کلاینت همیشه SHA-256 خودِ رمز رو می‌فرسته (نه متن خام رمز)، این بخش
// درست همون‌جا شروع می‌شه: قبل از ذخیره، روی همون مقدار یک salt
// اختصاصیِ هر حساب + PBKDF2 با تعداد تکرار بالا اعمال می‌کنیم. با این کار
// حتی اگه کل دیتای KV/D1 لو بره، مقادیر ذخیره‌شده نه با rainbow table
// قابل شکستنن و نه به‌تنهایی معادل «کلید ورود»ان (برخلاف قبل که
// SHA-256 خام مستقیم مقایسه می‌شد).
const PASSWORD_ALGO = "pbkdf2-sha256-100k";
const PASSWORD_PBKDF2_ITERATIONS = 100000;

function bytesToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function hexToBytes(hex) {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < arr.length; i++) arr[i] = parseInt(hex.substr(i * 2, 2), 16);
  return arr;
}
function randomSaltHex() {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
}
async function derivePasswordHash(clientHash, saltHex) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(clientHash), { name: "PBKDF2" }, false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: hexToBytes(saltHex), iterations: PASSWORD_PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial, 256
  );
  return bytesToHex(new Uint8Array(bits));
}
// یک رکورد رمزِ نمکی‌شده‌ی تازه از روی هش خام کلاینت می‌سازه — همونی که
// موقع ثبت‌نام/تغییر رمز/بازنشانی باید جایگزین password خام بشه.
async function makeSaltedPassword(clientHash) {
  const salt = randomSaltHex();
  return { password: await derivePasswordHash(clientHash, salt), password_salt: salt, password_algo: PASSWORD_ALGO };
}
// تشخیص می‌ده رمز واردشده درسته یا نه؛ اگه حساب هنوز فرمت قدیمیِ
// بدون‌salt داشته باشه (از قبل این تغییر ساخته شده) و رمز درست باشه،
// همون لحظه بی‌سروصدا به فرمت جدید ارتقا می‌ده (migration کاهلانه، بدون
// نیاز به هیچ اقدام دستی از کاربر یا مدیر).
async function verifyPassword(kv, env, teacher, clientHash) {
  if (teacher.password_salt && teacher.password_algo === PASSWORD_ALGO) {
    const computed = await derivePasswordHash(clientHash, teacher.password_salt);
    return computed === teacher.password;
  }
  const legacyMatch = teacher.password === clientHash;
  if (legacyMatch) {
    const upgraded = { ...teacher, ...(await makeSaltedPassword(clientHash)) };
    await kv.put(`teacher:${teacher.username}`, JSON.stringify(upgraded));
    await syncToD1(env, `teacher:${teacher.username}`, upgraded);
  }
  return legacyMatch;
}

// یک PRNG ساده و قطعی (deterministic) — با یک seed یکسان همیشه همون
// دنباله رو تولید می‌کنه. برای «بانک سؤال تصادفی»: seed از ترکیب
// examId+نام دانش‌آموز ساخته می‌شه، پس هر دانش‌آموز همیشه (حتی بعد از
// رفرش صفحه یا رجوع به پیش‌نویس) دقیقاً همون زیرمجموعه‌ی سؤال رو می‌گیره،
// ولی دانش‌آموزهای مختلف زیرمجموعه‌های متفاوتی می‌گیرن.
function seedFromString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededSelectQuestions(questions, seedStr, count) {
  if (!count || count <= 0 || count >= questions.length) return questions;
  const rand = mulberry32(seedFromString(seedStr));
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function getKV(env) {
  return env.KV || env.Kv || env.kv;
}

function getDB(env) {
  return env.DB || null;
}

// ==========================================
// Durable Object «ExamRoom» (v72) — یک نمونه به‌ازای هر examId.
// پیشرفت دوره‌ای دانش‌آموزهای یک آزمون رو تو حافظه بافر می‌کنه (بدون
// نوشتن روی D1 به‌ازای هر درخواست) و هر چند دقیقه یک‌بار، با یک ردیف
// واحد (فارغ از تعداد دانش‌آموز)، روی جدول examdrafts فلاش می‌کنه.
// نوشتن‌های D1 اینجا مستقل از تعداد دانش‌آموزهای هم‌زمانه — فقط به تعداد
// «بازه‌های فلاش» بستگی داره، نه تعداد نفرات.
class ExamRoom {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.buffer = null; // {studentName: {selections,current,qOrder,optOrder,savedAt}}
    this.flushMs = null;
    this.lastActivity = 0;
  }

  async ensureLoaded() {
    if (this.buffer === null) {
      this.buffer = (await this.ctx.storage.get("buffer")) || {};
    }
  }

  async fetch(request) {
    await this.ensureLoaded();
    const body = await request.json().catch(() => ({}));
    const { examId, studentName, durationMinutes, saveCount, selections, current, qOrder, optOrder, bufferKey } = body;
    if (!examId || !studentName) return json({ error: "اطلاعات ناقص" }, 400);

    // v76.1: قبلاً کلید همیشه studentName بود — دو دانش‌آموز هم‌نام می‌تونستن
    // پیشرفت همدیگه رو overwrite کنن. حالا handleDraftSave یک bufferKey
    // یکتاتر (roster_id-based وقتی موجوده) محاسبه و ارسال می‌کنه؛ اگه به هر
    // دلیلی نیومده باشه (نباید پیش بیاد، ولی محض احتیاط) به studentName
    // برمی‌گردیم تا کلاً از کار نیفته.
    const key = bufferKey || studentName;
    this.buffer[key] = { selections, current, qOrder, optOrder, savedAt: Date.now() };
    this.lastActivity = Date.now();
    // تو حافظه‌ی خود DO هم یه نسخه نگه می‌داریم (نه D1) تا اگه DO بین دو
    // فلاش evict/ری‌استارت بشه، بافر جمع‌شده از دست نره — این یک نوشتن
    // Durable Object storage است (سهمیه‌ی جدا از D1)، نه یک نوشتن D1.
    await this.ctx.storage.put("buffer", this.buffer);

    // بازه‌ی فلاش = مدت آزمون ÷ تعداد ذخیره‌ی دوره‌ای (پیش‌فرض ۵، قابل‌تنظیم
    // توسط مدیرکل) — حداقل ۳ دقیقه. فقط یک‌بار برای این DO محاسبه می‌شه.
    if (!this.flushMs) {
      const count = Math.max(2, Math.min(10, Math.round(saveCount || 5)));
      const mins = Math.max(3, Math.round((durationMinutes || 60) / count));
      this.flushMs = mins * 60 * 1000;
    }
    const currentAlarm = await this.ctx.storage.getAlarm();
    if (!currentAlarm) {
      await this.ctx.storage.setAlarm(Date.now() + this.flushMs);
    }
    return json({ ok: true });
  }

  async alarm() {
    await this.ensureLoaded();
    const db = getDB(this.env);
    const hasData = this.buffer && Object.keys(this.buffer).length > 0;
    if (hasData && db) {
      try {
        // این یک ردیف واحد برای کل آزمونه — مستقل از تعداد دانش‌آموز.
        await db.prepare(
          "INSERT INTO examdrafts (exam_id, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(exam_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at"
        ).bind(this.ctx.id.name, JSON.stringify(this.buffer), new Date().toISOString()).run();
      } catch (err) {
        console.error("ExamRoom alarm flush failed:", err);
      }
    }
    // اگه طی ۲ بازه‌ی اخیر هیچ فعالیتی نبوده (احتمالاً آزمون تموم شده)،
    // دیگه alarm بعدی رو زمان‌بندی نمی‌کنیم — این DO آروم می‌گیره.
    const idleFor = Date.now() - this.lastActivity;
    if (this.flushMs && idleFor < this.flushMs * 2) {
      await this.ctx.storage.setAlarm(Date.now() + this.flushMs);
    }
  }
}

// ==========================================
// مهاجرت/همگام‌سازی به D1 — KV همچنان منبع اصلی حقیقته؛ D1 فقط یک
// آینه‌ی خوانده‌شونده و ایندکس‌خورده از همون داده‌ست تا اندپوینت‌های
// پرترافیک (شروع آزمون، ثبت پاسخ، بررسی تکراری بودن، پرتال دانش‌آموز)
// به‌جای خوندن *همه‌ی* رکوردهای یک نوع در کل مدرسه، فقط با یک شرط
// WHERE دقیقاً همون چندتا ردیف لازم رو از D1 بخونن.
// اگه D1 هنوز بایند/migrate نشده باشه (getDB برگردونه null یا کوئری
// خطا بده)، این تابع فقط بی‌سروصدا لاگ می‌کنه و ادامه می‌ده — هیچ‌وقت
// مسیر اصلی KV رو (که همیشه درست کار می‌کنه) خراب نمی‌کنه.
// ==========================================
async function syncToD1(env, key, value) {
  const db = getDB(env);
  if (!db) return { ok: false, error: "D1 (env.DB) not bound" };
  try {
    const data = JSON.stringify(value ?? null);
    if (key.startsWith("teacher:")) {
      const username = key.slice("teacher:".length);
      await db.prepare(
        `INSERT INTO teachers (username, role, data) VALUES (?, ?, ?)
         ON CONFLICT(username) DO UPDATE SET role=excluded.role, data=excluded.data`
      ).bind(username, value?.role || null, data).run();
    } else if (key.startsWith("exam:")) {
      const id = key.slice("exam:".length);
      await db.prepare(
        `INSERT INTO exams (id, teacher_id, data) VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET teacher_id=excluded.teacher_id, data=excluded.data`
      ).bind(id, value?.teacher_id || null, data).run();
    } else if (key.startsWith("question:")) {
      const id = key.slice("question:".length);
      await db.prepare(
        `INSERT INTO questions (id, exam_id, data) VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET exam_id=excluded.exam_id, data=excluded.data`
      ).bind(id, value?.exam_id || null, data).run();
    } else if (key.startsWith("class:")) {
      const id = key.slice("class:".length);
      await db.prepare(
        `INSERT INTO classes (id, teacher_id, school_id, data) VALUES (?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET teacher_id=excluded.teacher_id, school_id=excluded.school_id, data=excluded.data`
      ).bind(id, value?.teacher_id || null, value?.school_id || null, data).run();
    } else if (key.startsWith("roster:")) {
      const id = key.slice("roster:".length);
      await db.prepare(
        `INSERT INTO roster (id, teacher_id, class_id, code, data) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET teacher_id=excluded.teacher_id, class_id=excluded.class_id, code=excluded.code, data=excluded.data`
      ).bind(id, value?.teacher_id || null, value?.class_id || null, value?.code || null, data).run();
    } else if (key.startsWith("student:")) {
      const id = key.slice("student:".length);
      await db.prepare(
        `INSERT INTO students (id, teacher_id, fullname, roster_id, data) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET teacher_id=excluded.teacher_id, fullname=excluded.fullname, roster_id=excluded.roster_id, data=excluded.data`
      ).bind(id, value?.teacher_id || null, (value?.fullname || "").trim(), value?.roster_id || null, data).run();
    } else if (key.startsWith("message:")) {
      const id = key.slice("message:".length);
      await db.prepare(
        `INSERT INTO messages (id, teacher_id, data) VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET teacher_id=excluded.teacher_id, data=excluded.data`
      ).bind(id, value?.teacher_id || value?.sender || null, data).run();
    } else if (key.startsWith("cheatalert:")) {
      const id = key.slice("cheatalert:".length);
      await db.prepare(
        `INSERT INTO cheatalerts (id, exam_id, data) VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET exam_id=excluded.exam_id, data=excluded.data`
      ).bind(id, value?.exam_id || null, data).run();
    } else if (key.startsWith("answers:")) {
      // یک کلید answers:<studentId> در KV، آرایه‌ی همه‌ی پاسخ‌های همون
      // آزمون رو نگه می‌داره؛ در D1 هر پاسخ یک ردیف جداست، پس اول
      // ردیف‌های قبلی همون دانش‌آموز پاک و بعد از نو درج می‌شن (idempotent).
      // از ON CONFLICT DO UPDATE استفاده می‌کنیم (نه INSERT ساده) چون بعضی
      // رکوردهای قدیمی‌تر (قبل از رفع باگ تصادفی‌بودن uid) ممکنه id تکراری
      // داشته باشن؛ با INSERT ساده، تکراری‌بودن یکی، کل batch رو fail
      // می‌کرد و هیچ ردیفی از اون کلید ذخیره نمی‌شد.
      const studentId = key.slice("answers:".length);
      const arr = Array.isArray(value) ? value : [];
      const seenIds = new Set();
      const stmts = [db.prepare("DELETE FROM answers WHERE student_id = ?").bind(studentId)];
      for (const a of arr) {
        if (!a) continue;
        let id = a.id || uid();
        while (seenIds.has(id)) id = uid(); // یکتا کردن id تکراری در همون batch
        seenIds.add(id);
        stmts.push(
          db.prepare(
            `INSERT INTO answers (id, student_id, exam_id, question_id, data) VALUES (?, ?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET student_id=excluded.student_id, exam_id=excluded.exam_id, question_id=excluded.question_id, data=excluded.data`
          ).bind(id, studentId, a.exam_id || null, a.question_id || null, JSON.stringify(a))
        );
      }
      await db.batch(stmts);
    }
    return { ok: true };
  } catch (err) {
    console.error("syncToD1 failed for key", key, err);
    return { ok: false, error: String(err && err.message ? err.message : err) };
  }
}

async function deleteFromD1(env, key) {
  const db = getDB(env);
  if (!db) return;
  try {
    if (key.startsWith("teacher:")) await db.prepare("DELETE FROM teachers WHERE username=?").bind(key.slice("teacher:".length)).run();
    else if (key.startsWith("exam:")) await db.prepare("DELETE FROM exams WHERE id=?").bind(key.slice("exam:".length)).run();
    else if (key.startsWith("question:")) await db.prepare("DELETE FROM questions WHERE id=?").bind(key.slice("question:".length)).run();
    else if (key.startsWith("class:")) await db.prepare("DELETE FROM classes WHERE id=?").bind(key.slice("class:".length)).run();
    else if (key.startsWith("roster:")) await db.prepare("DELETE FROM roster WHERE id=?").bind(key.slice("roster:".length)).run();
    else if (key.startsWith("student:")) await db.prepare("DELETE FROM students WHERE id=?").bind(key.slice("student:".length)).run();
    else if (key.startsWith("message:")) await db.prepare("DELETE FROM messages WHERE id=?").bind(key.slice("message:".length)).run();
    else if (key.startsWith("cheatalert:")) await db.prepare("DELETE FROM cheatalerts WHERE id=?").bind(key.slice("cheatalert:".length)).run();
    else if (key.startsWith("answers:")) await db.prepare("DELETE FROM answers WHERE student_id=?").bind(key.slice("answers:".length)).run();
  } catch (err) {
    console.error("deleteFromD1 failed for key", key, err);
  }
}

// یک‌بار (به‌درخواست ادمین) همه‌ی داده‌ی از قبل موجود در KV رو به D1
// می‌بره — لازم چون syncToD1 فقط از این‌به‌بعد، روی نوشتن‌های جدید
// اجرا می‌شه؛ داده‌ی قدیمی‌تر از قبل از این تغییر باید یک‌بار دستی
// backfill بشه. اجرای دوباره‌ش هم بی‌خطره (upsert، نه append).
// پیش‌نویس پاسخ‌های حین امتحان — پرتکرارترین نوع نوشتنه (تقریباً هر چند
// ثانیه یک‌بار برای هر دانش‌آموز فعال)، پس مستقیم روی D1 ذخیره می‌شه، نه KV
// (سقف رایگان نوشتن KV فقط ۱۰۰۰ در روزه، D1 صدهزارتاست). اگه D1 هنوز
// bind/migrate نشده باشه، خودش false/undefined برمی‌گردونه تا صدازننده به KV برگرده.
async function draftPutD1(env, key, value) {
  const db = getDB(env);
  if (!db) return false;
  try {
    await db.prepare(
      `INSERT INTO drafts (key, data) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET data=excluded.data`
    ).bind(key, JSON.stringify(value)).run();
    return true;
  } catch (err) {
    console.error("draftPutD1 failed for", key, err);
    return false;
  }
}
async function draftGetD1(env, key) {
  const db = getDB(env);
  if (!db) return undefined; // یعنی «امتحان نشد» — نه اینکه پیدا نشد
  try {
    const row = await db.prepare("SELECT data FROM drafts WHERE key = ?").bind(key).first();
    return row ? JSON.parse(row.data) : null; // null یعنی واقعاً پیدا نشد
  } catch (err) {
    console.error("draftGetD1 failed for", key, err);
    return undefined;
  }
}
async function draftDeleteD1(env, key) {
  const db = getDB(env);
  if (!db) return false;
  try {
    await db.prepare("DELETE FROM drafts WHERE key = ?").bind(key).run();
    return true;
  } catch (err) {
    console.error("draftDeleteD1 failed for", key, err);
    return false;
  }
}


// معادلِ خواندنِ syncToD1/deleteFromD1 — فقط برای همون سه نوعی لازمه که
// دیگه در نقطه‌ی پرحجم (ثبت آزمون، پایین‌تر در handleSubmitAnswers) به KV
// نوشته نمی‌شن: student:, answers:, cheatalert:. برای بقیه‌ی انواع، KV
// همچنان منبع اصلیه و نیازی به این تابع نیست.
// برمی‌گردونه: undefined اگه D1 بایند نشده/کوئری خطا داد (صدازننده باید
// به KV برگرده)، null اگه واقعاً پیدا نشد، یا مقدار parse‌شده.
async function getFromD1(env, key) {
  const db = getDB(env);
  if (!db) return undefined;
  try {
    if (key.startsWith("student:")) {
      const row = await db.prepare("SELECT data FROM students WHERE id = ?").bind(key.slice("student:".length)).first();
      return row ? JSON.parse(row.data) : null;
    }
    if (key.startsWith("cheatalert:")) {
      const row = await db.prepare("SELECT data FROM cheatalerts WHERE id = ?").bind(key.slice("cheatalert:".length)).first();
      return row ? JSON.parse(row.data) : null;
    }
    if (key.startsWith("answers:")) {
      const rows = await db.prepare("SELECT data FROM answers WHERE student_id = ?").bind(key.slice("answers:".length)).all();
      if (!rows.results || rows.results.length === 0) return null;
      return rows.results.map((r) => JSON.parse(r.data));
    }
    return undefined;
  } catch (err) {
    console.error("getFromD1 failed for key", key, err);
    return undefined;
  }
}

// کوئری‌های IN(...) رو تکه‌تکه می‌کنه چون D1 سقف ۱۰۰ پارامتر به‌ازای هر
// کوئری داره؛ مدرسه‌ای با بیش از ~۹۰ آزمون/معلم یه‌دفعه به این سقف می‌خورد.
async function d1SelectByIn(db, table, column, ids, selectCol = "data") {
  if (!ids.length) return [];
  const CHUNK = 90;
  const out = [];
  for (let i = 0; i < ids.length; i += CHUNK) {
    const chunk = ids.slice(i, i + CHUNK);
    const placeholders = chunk.map(() => "?").join(",");
    const rows = await db.prepare(`SELECT ${selectCol} FROM ${table} WHERE ${column} IN (${placeholders})`).bind(...chunk).all();
    if (selectCol === "data") out.push(...rows.results.map((r) => JSON.parse(r.data)));
    else out.push(...rows.results.map((r) => r[selectCol]));
  }
  return out;
}

async function handleMigrateToD1(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const db = getDB(env);
  if (!db) return json({ error: "D1 binding (DB) missing — schema.sql رو روی D1 اجرا کن و در wrangler.toml بایندش کن" }, 500);
  const session = await getSession(request, env);
  if (!session || (session.role !== "admin" && session.role !== "super_admin")) return json({ error: "فقط مدیر اجازه‌ی این کار رو داره" }, 403);

  const prefixes = ["teacher:", "exam:", "question:", "class:", "roster:", "student:", "answers:", "message:", "cheatalert:"];
  const counts = {};
  const errors = [];
  for (const prefix of prefixes) {
    let cursor, total = 0;
    do {
      const res = await kv.list({ prefix, cursor });
      for (const k of res.keys) {
        const raw = await kv.get(k.name);
        if (raw === null) continue;
        const result = await syncToD1(env, k.name, JSON.parse(raw));
        if (result && !result.ok && errors.length < 10) errors.push(`${k.name}: ${result.error}`);
        total++;
      }
      cursor = res.list_complete ? null : res.cursor;
    } while (cursor);
    counts[prefix] = total;
  }

  // پیش‌نویس‌های در حال انجام (اگه کسی دقیقاً وسط امتحان بوده، از دست نره)
  let draftTotal = 0, draftCursor;
  do {
    const res = await kv.list({ prefix: "draft:", cursor: draftCursor });
    for (const k of res.keys) {
      const raw = await kv.get(k.name);
      if (raw === null) continue;
      const ok = await draftPutD1(env, k.name, JSON.parse(raw));
      if (!ok && errors.length < 10) errors.push(`${k.name}: draft sync failed`);
      draftTotal++;
    }
    draftCursor = res.list_complete ? null : res.cursor;
  } while (draftCursor);
  counts["draft:"] = draftTotal;

  return json({ ok: true, migrated: counts, errors });
}

// ---------------------------------------------------------
// مهاجرت یک‌بارمصرف برای نصب‌های قدیمی‌تر (قبل از وجود مفهوم «مدرسه»):
// یک نصب قدیمی فقط یک حساب «admin» و چند «teacher» زیرش داشت، همه بدون
// school_id. این اندپوینت:
//   1) یک مدرسه‌ی پیش‌فرض می‌سازه و همه‌ی معلم‌ها (و خودِ admin) رو بهش
//      وصل می‌کنه (school_id می‌گیرن) — تا داده‌ی موجود گم/قفل نشه،
//   2) یک حساب «مدیر کل» تازه (جدا از admin موجود) می‌سازه، چون از این
//      به بعد مدیر کل باید یه حساب مستقل داشته باشه که به همه‌ی
//      مدرسه‌ها (نه فقط همین یکی) دسترسی داره.
// فقط یک‌بار قابل اجراست (وقتی هنوز هیچ «school:»ای وجود نداره) و فقط
// با یک حساب admin موجود قابل فراخوانیه — امن‌ترین حالت برای این‌که یه
// غریبه نتونه صداش بزنه.
// ---------------------------------------------------------
async function handleMigrateToSchools(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session || session.role !== "admin") {
    return json({ error: "فقط با یک حساب مدیر مدرسه‌ی موجود قابل انجام است" }, 403);
  }

  const existingSchools = await kv.list({ prefix: "school:", limit: 1 });
  if (existingSchools.keys.length > 0) {
    return json({ error: "این مهاجرت قبلاً انجام شده است" }, 409);
  }

  const body = await request.json().catch(() => ({}));
  const schoolName = (body.schoolName || "مدرسه").trim();
  const sa = body.superAdmin || {};
  if (!sa.username || !sa.fullname || !sa.email || !sa.passwordHash) {
    return json({ error: "اطلاعات حساب مدیر سایت کامل نیست" }, 400);
  }
  const saExisting = await kv.get(`teacher:${sa.username}`);
  if (saExisting) return json({ error: "این نام کاربری قبلاً استفاده شده است" }, 409);

  // ۱) ساخت مدرسه‌ی پیش‌فرض
  const schoolId = uid();
  const school = { id: schoolId, name: schoolName, created_at: new Date().toISOString(), created_by: sa.username };
  await kv.put(`school:${schoolId}`, JSON.stringify(school));

  // ۲) وصل‌کردن همه‌ی معلم‌ها (و خودِ admin موجود) به همین مدرسه
  const teacherKeys = await kv.list({ prefix: "teacher:" });
  for (const k of teacherKeys.keys) {
    const raw = await kv.get(k.name);
    if (!raw) continue;
    const t = JSON.parse(raw);
    if (t.school_id) continue; // از قبل تگ خورده (اجرای دوباره‌ی امن)
    t.school_id = schoolId;
    await kv.put(k.name, JSON.stringify(t));
    await syncToD1(env, k.name, t);
  }

  // ۳) وصل‌کردن اطلاعیه‌های همون‌مدیر (message با sender=admin) به همین مدرسه
  const messageKeys = await kv.list({ prefix: "message:" });
  for (const k of messageKeys.keys) {
    const raw = await kv.get(k.name);
    if (!raw) continue;
    const m = JSON.parse(raw);
    if (m.sender === "admin" && !m.school_id) {
      m.school_id = schoolId;
      await kv.put(k.name, JSON.stringify(m));
      await syncToD1(env, k.name, m);
    }
  }

  // ۴) ساخت حساب مستقل «مدیر کل»
  const superAdmin = {
    username: sa.username, fullname: sa.fullname, email: sa.email,
    ...(await makeSaltedPassword(sa.passwordHash)), role: "super_admin", created_at: new Date().toISOString(),
  };
  await kv.put(`teacher:${sa.username}`, JSON.stringify(superAdmin));
  await syncToD1(env, `teacher:${sa.username}`, superAdmin);

  return json({ ok: true, schoolId });
}


// کلیدهایی که فقط داخلی هستن و هیچ‌وقت نباید از طریق KV عمومی خونده/نوشته بشن،
// حتی برای یک کاربر لاگین‌کرده
const INTERNAL_ONLY_PREFIXES = ["session:", "resettoken:", "loginfail:", "hubtoken:"];
function isInternalKey(key) {
  return INTERNAL_ONLY_PREFIXES.some((p) => key.startsWith(p));
}

// سشن کاربر را از هدر Authorization می‌خواند. هیچ اندپوینتی که داده‌ی واقعی
// (امتحان، دانش‌آموز، معلم و ...) برمی‌گردونه بدون سشن معتبر اجرا نمی‌شه —
// این همون چیزیه که قبلاً باعث می‌شد هر بازدیدکننده‌ی ناشناس بتونه مستقیم
// از /api/kv و /api/list کل دیتابیس رو بخونه یا بنویسه.
async function getSession(request, env) {
  const kv = getKV(env);
  if (!kv) return null;
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;
  const raw = await kv.get(`session:${token}`);
  if (!raw) return null;
  const session = JSON.parse(raw);
  // اگه حساب یا مدرسه‌ش بعد از ورود غیرفعال شده باشه، سشن رو همون لحظه
  // بی‌اعتبار می‌کنیم — نه فقط دفعه‌ی بعدی ورود (سشن‌ها تا ۳۰ روز زنده‌ن).
  const teacherRaw = await kv.get(`teacher:${session.username}`);
  const teacher = teacherRaw ? JSON.parse(teacherRaw) : null;
  if (!teacher || teacher.active === false) return null;
  if (teacher.role !== "super_admin" && teacher.school_id) {
    const schoolRaw = await kv.get(`school:${teacher.school_id}`);
    const school = schoolRaw ? JSON.parse(schoolRaw) : null;
    if (school && school.active === false) return null;
  }
  return session;
}

// همون بررسیِ «حساب یا مدرسه‌ش غیرفعال شده» که getSession برای معلم/مدیر
// انجام می‌ده، ولی برای اندپوینت‌های عمومیِ دانش‌آموزی (بدون سشن — فقط با
// exam_id یا کد roster) که تا الان این چک رو نداشتن: وقتی مدیر سایت یک
// مدرسه رو غیرفعال می‌کنه، دانش‌آموزهاش هم دیگه نباید بتونن آزمون بدن یا
// چت کنن، نه فقط این‌که معلم/مدیرش نتونه لاگین کنه.
async function accountAndSchoolActive(kv, teacherUsername) {
  if (!teacherUsername) return false;
  const teacherRaw = await kv.get(`teacher:${teacherUsername}`);
  const teacher = teacherRaw ? JSON.parse(teacherRaw) : null;
  if (!teacher || teacher.active === false) return false;
  if (teacher.school_id) {
    const schoolRaw = await kv.get(`school:${teacher.school_id}`);
    const school = schoolRaw ? JSON.parse(schoolRaw) : null;
    if (school && school.active === false) return false;
  }
  return true;
}

// حالت مؤثر چت کلاسی برای یک دانش‌آموز خاص: اول override شخصی خودش (اگه
// معلم جداگانه براش تنظیم کرده باشه)، وگرنه حالت کلی کلاس (پیش‌فرض «باز»
// یعنی دوطرفه، تا وقتی معلم عمداً ببندتش).
function effectiveClassChatMode(cls, rosterId) {
  const overrides = (cls && cls.chat_overrides) || {};
  if (rosterId && overrides[rosterId]) return overrides[rosterId];
  return (cls && cls.chat_mode) || "open";
}

// ==========================================
// ورود دانش‌آموزی دو-کدی: «کد مدرسه» (یا کد معلم مستقل) + «کد شخصی»
// ==========================================
// چون قراره چند صد مدرسه زیر یک نمونه فعال باشن، یک کد ۶ رقمیِ شخصی به‌تنهایی
// (که فقط در حد یک معلم/کلاس یکتا بود) دیگه کافی نیست — با تعداد کافی
// دانش‌آموز، طبق مسئله‌ی تولد، دیر یا زود بین دو مدرسه‌ی مختلف تکرار می‌شه و
// جستجوی سراسری کد، دانش‌آموزِ مدرسه‌ی اشتباه رو برمی‌گردونه. راه‌حل: هر
// مدرسه (یا معلم مستقل) یک «کد گروه» ثابت و یکتا در کل سیستم داره؛ دانش‌آموز
// هر دو کد رو وارد می‌کنه، و جستجوی کد شخصی فقط داخل همون یک گروه انجام
// می‌شه — نه در کل کشور — پس تصادم بین مدرسه‌ها از نظر ساختاری غیرممکنه.
const LOGIN_CODE_ALPHABET = "0123456789"; // فقط عددی — طبق درخواست کاربر
function generateLoginCodeRaw() {
  let s = "";
  for (let i = 0; i < 5; i++) s += LOGIN_CODE_ALPHABET[Math.floor(Math.random() * LOGIN_CODE_ALPHABET.length)];
  return s;
}

// یک کد گروه که هنوز نه هیچ مدرسه‌ای و نه هیچ معلم مستقلی ازش استفاده نمی‌کنه
// — این دو نوع رکورد یک فضای کد مشترک دارن چون دانش‌آموز موقع ورود فرقی
// نمی‌ذاره پشتش یک مدرسه‌ست یا یک معلم مستقل.
async function generateUniqueLoginCode(kv) {
  for (let attempt = 0; attempt < 25; attempt++) {
    const code = generateLoginCodeRaw();
    if (!(await findLoginGroupByCodeKV(kv, code))) return code;
  }
  return generateLoginCodeRaw() + generateLoginCodeRaw(); // عملاً هیچ‌وقت به اینجا نمی‌رسه
}

async function findLoginGroupByCodeKV(kv, codeRaw) {
  const code = (codeRaw || "").trim().toUpperCase();
  if (!code) return null;
  const schoolKeys = await kv.list({ prefix: "school:" });
  for (const sk of schoolKeys.keys) {
    const raw = await kv.get(sk.name);
    if (!raw) continue;
    const school = JSON.parse(raw);
    if ((school.login_code || "").toUpperCase() === code) return { type: "school", school };
  }
  const teacherKeys = await kv.list({ prefix: "teacher:" });
  for (const tk of teacherKeys.keys) {
    const raw = await kv.get(tk.name);
    if (!raw) continue;
    const t = JSON.parse(raw);
    if (!t.school_id && (t.login_code || "").toUpperCase() === code) return { type: "teacher", teacher: t };
  }
  return null;
}
async function findLoginGroupByCode(env, code) {
  const kv = getKV(env);
  if (!kv) return null;
  return findLoginGroupByCodeKV(kv, code);
}

// نام‌کاربری همه‌ی معلم‌های یک گروه ورود (اعضای یک مدرسه، یا خودِ همون یک
// معلم مستقل) — برای اسکوپ‌کردن جستجوی کد شخصیِ روستر بهش.
async function loginGroupTeacherUsernames(kv, group) {
  if (!group) return new Set();
  if (group.type === "teacher") return new Set([group.teacher.username]);
  const teacherKeys = await kv.list({ prefix: "teacher:" });
  const usernames = new Set();
  for (const tk of teacherKeys.keys) {
    const raw = await kv.get(tk.name);
    if (!raw) continue;
    const t = JSON.parse(raw);
    if (t.school_id === group.school.id) usernames.add(t.username);
  }
  return usernames;
}

// گروه ورودی که یک معلم خاص بهش تعلق داره — برای اسکوپ‌کردن یکتاییِ کد
// شخصیِ روستر موقع ساختش (پایین‌تر، در handleKV).
async function resolveLoginGroupForTeacher(kv, teacherUsername) {
  const raw = await kv.get(`teacher:${teacherUsername}`);
  const teacher = raw ? JSON.parse(raw) : null;
  if (!teacher) return null;
  if (teacher.school_id) {
    const schoolRaw = await kv.get(`school:${teacher.school_id}`);
    const school = schoolRaw ? JSON.parse(schoolRaw) : null;
    return school ? { type: "school", school } : null;
  }
  return { type: "teacher", teacher };
}

// آیا این کد شخصیِ روستر، همین الان توسط یک دانش‌آموز *دیگه‌ی همین گروه*
// استفاده شده؟ (نه فقط همون یک معلمی که این‌بار داره می‌سازتش — چون چند
// معلمِ یک مدرسه مستقل از هم کد می‌سازن و باید در کل مدرسه یکتا باشه)
async function rosterCodeTakenInGroup(kv, code, teacherUsernames, excludeId) {
  const rosterKeys = await kv.list({ prefix: "roster:" });
  for (const rk of rosterKeys.keys) {
    const id = rk.name.slice("roster:".length);
    if (id === excludeId) continue;
    const raw = await kv.get(rk.name);
    if (!raw) continue;
    const r = JSON.parse(raw);
    if (r.code === code && teacherUsernames.has(r.teacher_id)) return true;
  }
  return false;
}
async function generateUniqueRosterCode(kv, teacherUsernames) {
  for (let attempt = 0; attempt < 25; attempt++) {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    if (!(await rosterCodeTakenInGroup(kv, code, teacherUsernames, null))) return code;
  }
  return String(Math.floor(100000 + Math.random() * 900000)) + String(Math.floor(Math.random() * 10));
}

// امتحان می‌کنه کد دانش‌آموزی داده‌شده متعلق به کدوم roster/کلاسه — دقیقاً
// همون منطق handleStudentLookup برای پیدا کردن roster، جدا شده تا
// اندپوینت‌های چت هم بتونن بدون تکرار کد ازش استفاده کنن. اگه teacherUsernames
// داده بشه، فقط بین roster هایی که به همون گروه (مدرسه/معلم مستقل) تعلق
// دارن جستجو می‌کنه — نه در کل سیستم — تا کد یک مدرسه هیچ‌وقت دانش‌آموز
// مدرسه‌ی دیگه‌ای رو برنگردونه.
async function findRosterByCode(env, code, teacherUsernames) {
  const kv = getKV(env);
  if (!kv || !code) return null;
  const db = getDB(env);
  let candidates = null;
  if (db) {
    try {
      const rows = await db.prepare("SELECT data FROM roster WHERE code = ?").bind(code).all();
      candidates = rows.results.map((r) => JSON.parse(r.data));
    } catch (err) {
      console.error("findRosterByCode via D1 failed, falling back to KV:", err);
    }
  }
  if (candidates === null) {
    const rosterKeys = await kv.list({ prefix: "roster:" });
    const rosterRecords = (await Promise.all(rosterKeys.keys.map((k) => kv.get(k.name))))
      .filter(Boolean).map((r) => JSON.parse(r));
    candidates = rosterRecords.filter((r) => r.code === code);
  }
  if (!teacherUsernames) return candidates[0] || null;
  return candidates.find((r) => teacherUsernames.has(r.teacher_id)) || null;
}

const CHAT_REACTION_WHITELIST = ["👍", "❤️", "😂", "😮", "😢"];

// جلوی اسپم توی چت کلاسی رو می‌گیره — سقفِ تعداد پیام/واکنشِ هر دانش‌آموز
// (بر اساس کد rosterش) توی یک بازه‌ی زمانی کوتاه. برخلاف قفل ورود (که بعد
// از N تلاش ناموفق قفل می‌کنه)، این یه محدودیت نرخ ساده‌ست: وقتی به سقف
// می‌رسه، تا پایان همون بازه رد می‌شه، بدون این‌که خودِ تلاش‌های ردشده
// دوباره تایمر رو ریست کنن (چون فقط attempt های مجاز TTL رو تازه می‌کنن).
const CHAT_RATE_LIMIT_MAX = 15;
const CHAT_RATE_LIMIT_WINDOW_SECONDS = 60;
async function checkChatRateLimit(kv, rateKey) {
  const key = `chatrate:${rateKey}`;
  const raw = await kv.get(key);
  const rec = raw ? JSON.parse(raw) : { count: 0 };
  if (rec.count >= CHAT_RATE_LIMIT_MAX) return false;
  rec.count += 1;
  await kv.put(key, JSON.stringify(rec), { expirationTtl: CHAT_RATE_LIMIT_WINDOW_SECONDS });
  return true;
}

// چت کلاسی — دانش‌آموز با کد خودش، بدون لاگین، پیام‌های گروه‌چت کلاسش را
// می‌خواند. هر بار که این اندپوینت خونده می‌شه، پیام‌های معلم که هنوز
// «دیده‌شده» توسط همین دانش‌آموز نبودن، به‌عنوان دیده‌شده علامت می‌خورن
// (مثل تیک خوندن چت‌های معمول).
async function handleStudentChatGet(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const url = new URL(request.url);
  const schoolCode = (url.searchParams.get("schoolCode") || "").trim();
  const code = (url.searchParams.get("code") || "").trim();
  if (!schoolCode || !code) return json({ error: "کد لازم است" }, 400);
  const group = await findLoginGroupByCode(env, schoolCode);
  if (!group) return json({ found: false });
  const teacherUsernames = await loginGroupTeacherUsernames(kv, group);
  const roster = await findRosterByCode(env, code, teacherUsernames);
  if (!roster) return json({ found: false });
  if (!(await accountAndSchoolActive(kv, roster.teacher_id))) return json({ found: false });

  const classChatAllowed = await classChatAllowedForTeacherUsername(kv, roster.teacher_id);
  if (!classChatAllowed) return json({ found: true, classChatAllowed: false, messages: [] });

  const classRaw = await kv.get(`class:${roster.class_id}`);
  const cls = classRaw ? JSON.parse(classRaw) : null;
  const className = cls ? cls.name : "—";
  const mode = effectiveClassChatMode(cls, roster.id);

  const teacherRaw = await kv.get(`teacher:${roster.teacher_id}`);
  const teacherName = teacherRaw ? JSON.parse(teacherRaw).fullname || "معلم" : "معلم";

  const db = getDB(env);
  let msgs = [];
  if (db) {
    try {
      const rows = await db.prepare(
        "SELECT data FROM messages WHERE teacher_id = ? AND json_extract(data,'$.kind') = 'class_chat' AND json_extract(data,'$.class_id') = ?"
      ).bind(roster.teacher_id, roster.class_id).all();
      msgs = rows.results.map((r) => JSON.parse(r.data));
    } catch (err) {
      console.error("handleStudentChatGet D1 path failed, falling back to KV:", err);
      msgs = undefined;
    }
  }
  if (!db || msgs === undefined) {
    const messageKeys = await kv.list({ prefix: "message:" });
    const allMsgs = (await Promise.all(messageKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
    msgs = allMsgs.filter((m) => m.kind === "class_chat" && m.teacher_id === roster.teacher_id && m.class_id === roster.class_id);
  }
  msgs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  // علامت‌زدن پیام‌های معلم به‌عنوان «دیده‌شده توسط همین دانش‌آموز»
  const toMark = msgs.filter((m) => m.sender_role === "teacher" && !(m.seen_by || []).includes(roster.id));
  if (toMark.length > 0) {
    await Promise.all(toMark.map(async (m) => {
      m.seen_by = [...(m.seen_by || []), roster.id];
      await kv.put(`message:${m.id}`, JSON.stringify(m));
      await syncToD1(env, `message:${m.id}`, m);
    }));
  }

  return json({ found: true, classChatAllowed: true, className, teacherName, mode, messages: msgs.slice(-300) });
}

// ارسال پیام چت توسط دانش‌آموز — فقط وقتی حالت مؤثر چت کلاسش «باز»ه.
async function handleStudentChatSend(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const body = await request.json().catch(() => ({}));
  const schoolCode = (body.schoolCode || "").trim();
  const code = (body.code || "").trim();
  const text = (body.text || "").trim();
  if (!schoolCode || !code || !text) return json({ error: "کد و متن پیام لازم است" }, 400);
  if (text.length > 2000) return json({ error: "پیام خیلی طولانی است" }, 400);
  const group = await findLoginGroupByCode(env, schoolCode);
  if (!group) return json({ error: "کد نامعتبر است" }, 404);
  const teacherUsernames = await loginGroupTeacherUsernames(kv, group);
  const roster = await findRosterByCode(env, code, teacherUsernames);
  if (!roster) return json({ error: "کد نامعتبر است" }, 404);
  if (!(await accountAndSchoolActive(kv, roster.teacher_id))) return json({ error: "این کلاس در حال حاضر در دسترس نیست" }, 403);
  if (!(await checkChatRateLimit(kv, `${schoolCode}:${code}`))) {
    return json({ error: "تعداد پیام‌های شما در این بازه زیاد بوده — کمی صبر کنید." }, 429);
  }
  if (!(await classChatAllowedForTeacherUsername(kv, roster.teacher_id))) {
    return json({ error: "قابلیت چت کلاسی برای این کلاس غیرفعال شده است" }, 403);
  }
  const classRaw = await kv.get(`class:${roster.class_id}`);
  const cls = classRaw ? JSON.parse(classRaw) : null;
  const mode = effectiveClassChatMode(cls, roster.id);
  if (mode !== "open") return json({ error: "چت این کلاس در حالت اطلاع‌رسانی (یک‌طرفه) است و امکان ارسال پیام وجود ندارد" }, 403);

  const id = uid();
  const message = {
    id, teacher_id: roster.teacher_id, kind: "class_chat", class_id: roster.class_id,
    sender_role: "student", sender_roster_id: roster.id, sender_name: roster.fullname,
    text, created_at: new Date().toISOString(), seen_by: [], reactions: {},
  };
  await kv.put(`message:${id}`, JSON.stringify(message));
  await syncToD1(env, `message:${id}`, message);
  return json({ ok: true, message });
}

// واکنش (ایموجی) روی پیام معلم — جایگزین سبک‌تر برای تایپ، مخصوصاً وقتی
// چت در حالت اطلاع‌رسانیه. دوباره زدن همون ایموجی، واکنش رو برمی‌داره.
async function handleStudentChatReact(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const body = await request.json().catch(() => ({}));
  const schoolCode = (body.schoolCode || "").trim();
  const code = (body.code || "").trim();
  const messageId = (body.messageId || "").trim();
  const emoji = (body.emoji || "").trim();
  if (!schoolCode || !code || !messageId || !CHAT_REACTION_WHITELIST.includes(emoji)) return json({ error: "درخواست نامعتبر" }, 400);
  const group = await findLoginGroupByCode(env, schoolCode);
  if (!group) return json({ error: "کد نامعتبر است" }, 404);
  const teacherUsernames = await loginGroupTeacherUsernames(kv, group);
  const roster = await findRosterByCode(env, code, teacherUsernames);
  if (!roster) return json({ error: "کد نامعتبر است" }, 404);
  if (!(await accountAndSchoolActive(kv, roster.teacher_id))) return json({ error: "این کلاس در حال حاضر در دسترس نیست" }, 403);
  if (!(await checkChatRateLimit(kv, `${schoolCode}:${code}`))) {
    return json({ error: "تعداد درخواست‌های شما در این بازه زیاد بوده — کمی صبر کنید." }, 429);
  }
  if (!(await classChatAllowedForTeacherUsername(kv, roster.teacher_id))) {
    return json({ error: "قابلیت چت کلاسی برای این کلاس غیرفعال شده است" }, 403);
  }
  const raw = await kv.get(`message:${messageId}`);
  if (!raw) return json({ error: "پیام پیدا نشد" }, 404);
  const message = JSON.parse(raw);
  if (message.kind !== "class_chat" || message.class_id !== roster.class_id) return json({ error: "دسترسی مجاز نیست" }, 403);
  const reactions = { ...(message.reactions || {}) };
  if (reactions[roster.id] === emoji) delete reactions[roster.id];
  else reactions[roster.id] = emoji;
  message.reactions = reactions;
  await kv.put(`message:${messageId}`, JSON.stringify(message));
  await syncToD1(env, `message:${messageId}`, message);
  return json({ ok: true, reactions });
}

// این نوع کلیدها متعلق به یک معلم مشخصن (فیلد teacher_id مستقیم دارن)
const DIRECT_OWNER_PREFIXES = ["exam:", "student:", "class:", "roster:", "cheatalert:", "message:"];
// این‌ها مالکیتشون غیرمستقیمه — باید از طریق آزمون (exam_id) به معلم برسیم
const EXAM_LINKED_PREFIXES = ["question:", "answers:", "draft:", "note:"];

// exam_id مربوط به یک کلید غیرمستقیم رو استخراج می‌کنه
function examIdFromKey(key, value) {
  if (key.startsWith("question:")) return value?.exam_id || null;
  if (key.startsWith("answers:")) return Array.isArray(value) ? value[0]?.exam_id || null : null;
  if (key.startsWith("draft:") || key.startsWith("note:")) return key.split(":")[1] || null;
  return null;
}

// مالک واقعی (username معلم) یک کلید رو برمی‌گردونه، یا null اگه قابل تشخیص/عمومی نباشه.
// یک کش کوچیک از exam_id -> teacher_id می‌گیره تا برای لیست‌های بزرگ، exam یکسان
// چندبار از KV خونده نشه.
// همه‌ی نام‌کاربری معلم‌های یک کلاس رو برمی‌گردونه — از فیلد جدید
// teacher_ids (آرایه، چون حالا یه کلاس می‌تونه چند معلم داشته باشه) یا،
// برای رکوردهای قدیمی‌تر که هنوز migrate نشدن، از teacher_id تکی قدیمی.
function classTeacherIds(cls) {
  if (!cls) return [];
  if (Array.isArray(cls.teacher_ids)) return cls.teacher_ids;
  return cls.teacher_id ? [cls.teacher_id] : [];
}

// روز تقویمی (به وقت تهران) یک تاریخ ISO رو به شکل YYYY-MM-DD برمی‌گردونه —
// برای مقایسه‌ی «همون روز» بین دو امتحان، بدون درگیر شدن با افست UTC سرور.
function tehranDateKey(iso) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tehran" }).format(new Date(iso));
  } catch {
    return String(iso).slice(0, 10);
  }
}

// آیا این معلم به این رکورد دسترسی داره؟ برای بیشتر انواع، همون قانون قدیمی
// «فقط صاحبش» (ownerOf) کافیه؛ ولی «کلاس» و «لیست دانش‌آموزهای کلاس» حالا
// بین چند معلم مشترکن، پس عضویت توی آرایه‌ی teacher_ids چک می‌شه (برای
// roster، از طریق خودِ کلاسش).
async function teacherCanAccess(kv, key, value, username, caches) {
  if (key.startsWith("class:")) {
    return classTeacherIds(value).includes(username);
  }
  if (key.startsWith("roster:")) {
    const classId = value?.class_id;
    if (!classId) return false;
    const { rosterClassCache } = caches || {};
    let cls;
    if (rosterClassCache && rosterClassCache.has(classId)) {
      cls = rosterClassCache.get(classId);
    } else {
      const raw = await kv.get(`class:${classId}`);
      cls = raw ? JSON.parse(raw) : null;
      if (rosterClassCache) rosterClassCache.set(classId, cls);
    }
    return classTeacherIds(cls).includes(username);
  }
  const owner = await ownerOf(kv, key, value, caches?.examOwnerCache);
  return owner === username;
}

async function ownerOf(kv, key, value, examOwnerCache) {
  if (key.startsWith("teacher:")) return value?.username || key.slice("teacher:".length);
  for (const p of DIRECT_OWNER_PREFIXES) {
    if (key.startsWith(p)) return value?.teacher_id || null;
  }
  // بانک سوال مستقل از آزمون (exam_id خالی — یعنی سوال بانک، نه سوال یک
  // آزمون خاص): مالکیتش مستقیم روی owner_id خودشه، نه از طریق exam_id
  // (که این‌جا اصلاً وجود نداره). قبل از این تغییر این حالت به اشتباه
  // می‌افتاد توی حلقه‌ی EXAM_LINKED_PREFIXES پایین و چون exam_id نداشت،
  // ownerOf همیشه null برمی‌گردوند — یعنی «بانک سوال شخصی» عملاً هیچ‌وقت
  // از سمت سرور قابل ذخیره/خوندن نبود.
  if (key.startsWith("question:") && !value?.exam_id) {
    return value?.owner_id || null;
  }
  for (const p of EXAM_LINKED_PREFIXES) {
    if (key.startsWith(p)) {
      const examId = examIdFromKey(key, value);
      if (!examId) return null;
      if (examOwnerCache && examOwnerCache.has(examId)) return examOwnerCache.get(examId);
      const examRaw = await kv.get(`exam:${examId}`);
      const owner = examRaw ? JSON.parse(examRaw).teacher_id || null : null;
      if (examOwnerCache) examOwnerCache.set(examId, owner);
      return owner;
    }
  }
  return null; // پیشوند ناشناخته — به‌صورت پیش‌فرض غیرمجاز برای غیر ادمین
}

// school_id مربوط به یک نام‌کاربری معلم رو برمی‌گردونه (با کش، چون توی
// یک درخواست ممکنه چندین‌بار برای معلم‌های یکسان لازم بشه)
async function teacherSchoolId(kv, teacherUsername, teacherSchoolCache) {
  if (!teacherUsername) return null;
  if (teacherSchoolCache && teacherSchoolCache.has(teacherUsername)) return teacherSchoolCache.get(teacherUsername);
  const raw = await kv.get(`teacher:${teacherUsername}`);
  const schoolId = raw ? (JSON.parse(raw).school_id || null) : null;
  if (teacherSchoolCache) teacherSchoolCache.set(teacherUsername, schoolId);
  return schoolId;
}

// مدرسه‌ای که یک کلید بهش تعلق داره رو برمی‌گردونه (برای اسکوپ‌کردن نقش
// «مدیر مدرسه» — که برخلاف «مدیر کل»، فقط باید دیتای مدرسه‌ی خودش رو ببینه).
// اگه خودِ رکورد یک school_id مستقیم داشته باشه (معلم/مدیر، پیام‌های
// اطلاعیه‌ی ادمین، یا کلاس/دانش‌آموزی که هنوز به معلمی اختصاص داده نشده)
// همون استفاده می‌شه؛ در غیر این‌صورت از طریق teacher_id (و برای
// question/answers/draft از طریق exam) به معلم و بعد مدرسه‌ش می‌رسیم.
async function schoolOf(kv, key, value, caches) {
  const { teacherSchoolCache, examOwnerCache } = caches || {};
  if (key.startsWith("school:")) return key.slice("school:".length);
  if (value && typeof value === "object" && value.school_id) return value.school_id;
  if (key.startsWith("teacher:")) return null;
  let teacherId = null;
  for (const p of DIRECT_OWNER_PREFIXES) {
    if (key.startsWith(p)) { teacherId = value?.teacher_id || null; break; }
  }
  if (teacherId === null) {
    for (const p of EXAM_LINKED_PREFIXES) {
      if (key.startsWith(p)) {
        const examId = examIdFromKey(key, value);
        if (!examId) return null;
        let examOwner;
        if (examOwnerCache && examOwnerCache.has(examId)) {
          examOwner = examOwnerCache.get(examId);
        } else {
          const examRaw = await kv.get(`exam:${examId}`);
          examOwner = examRaw ? JSON.parse(examRaw).teacher_id || null : null;
          if (examOwnerCache) examOwnerCache.set(examId, examOwner);
        }
        teacherId = examOwner;
        break;
      }
    }
  }
  if (!teacherId) return null;
  return teacherSchoolId(kv, teacherId, teacherSchoolCache);
}

// ==========================================
// مدیریت KV (برای معلمان و تنظیمات)
// ==========================================
// دسترسیِ خوندن/حذفِ یک رکورد رو برای مدیر مدرسه (بر اساس مدرسه) یا معلم
// (بر اساس مالکیت/عضویت در کلاس) چک می‌کنه — یک نسخه‌ی مشترک به‌جای این‌که
// همین ۵ خط جدا جدا توی GET، DELETE و handleList تکرار بشه.
async function canAccessRecord(kv, key, value, session, isAdmin, caches) {
  if (isAdmin) {
    const school = await schoolOf(kv, key, value, caches);
    return !!school && school === session.school_id;
  }
  return teacherCanAccess(kv, key, value, session.username, caches);
}

async function handleKV(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const url = new URL(request.url);

  // پیش‌نویس پاسخ‌های دانش‌آموز حین امتحان — دانش‌آموز هیچ‌وقت لاگین نمی‌کنه،
  // پس این کلید باید بدون سشن هم در دسترس باشه (دقیقاً مثل exam-session و
  // answers/submit). داده‌ش فقط پاسخ‌های ناتمام خودِ همون دانش‌آموز روی یک
  // امتحانه، چیز حساسی نیست.
  const draftKey = request.method === "DELETE" || request.method === "GET"
    ? url.searchParams.get("key") : null;
  const isDraftGetOrDelete = draftKey && draftKey.startsWith("draft:");

  if (request.method === "POST" && !isDraftGetOrDelete) {
    const peek = await request.clone().json().catch(() => ({}));
    if (peek && typeof peek.k === "string" && peek.k.startsWith("draft:")) {
      const { k, v } = peek;
      const savedToD1 = await draftPutD1(env, k, v);
      if (!savedToD1) await kv.put(k, JSON.stringify(v)); // فقط وقتی D1 هنوز bind/migrate نشده
      return json({ ok: true });
    }
  }
  if (isDraftGetOrDelete) {
    if (request.method === "GET") {
      const fromD1 = await draftGetD1(env, draftKey);
      if (fromD1 !== undefined) {
        if (fromD1 === null) return json({ error: "not found" }, 404);
        return json({ v: fromD1 });
      }
      const raw = await kv.get(draftKey);
      if (raw === null) return json({ error: "not found" }, 404);
      return json({ v: JSON.parse(raw) });
    }
    const deletedFromD1 = await draftDeleteD1(env, draftKey);
    if (!deletedFromD1) await kv.delete(draftKey);
    return json({ ok: true });
  }

  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);
  const isSuperAdmin = session.role === "super_admin";
  const isAdmin = session.role === "admin";
  const caches = { teacherSchoolCache: new Map(), examOwnerCache: new Map(), rosterClassCache: new Map() };

  if (request.method === "GET") {
    const key = url.searchParams.get("key");
    if (!key || isInternalKey(key)) return json({ error: "key required" }, 400);
    let value;
    const raw = await kv.get(key);
    if (raw !== null) {
      value = JSON.parse(raw);
    } else if (key.startsWith("student:") || key.startsWith("answers:") || key.startsWith("cheatalert:")) {
      // این سه نوع دیگه در handleSubmitAnswers فقط روی D1 نوشته می‌شن، پس
      // نبودنشون توی KV به‌معنی «واقعاً پیدا نشد» نیست — باید D1 رو هم چک کنیم.
      const fromD1 = await getFromD1(env, key);
      if (fromD1 === undefined || fromD1 === null) return json({ error: "not found" }, 404);
      value = fromD1;
    } else {
      return json({ error: "not found" }, 404);
    }
    if (!isSuperAdmin) {
      if (key.startsWith("settings:")) {
        // تنظیمات سراسری (مثل روشن/خاموش بودن پیام‌رسانی ادمین به مدیرکل) برای
        // هر کاربر واردشده‌ای قابل خوندنه — نوشتنش (پایین‌تر، مسیر POST) فقط با مدیر کل مجازه.
      } else if (isAdmin) {
        const can = await canAccessRecord(kv, key, value, session, true, caches);
        if (!can) return json({ error: "دسترسی غیرمجاز" }, 403);
      } else {
        const can = await canAccessRecord(kv, key, value, session, false, caches);
        if (!can) return json({ error: "دسترسی غیرمجاز" }, 403);
      }
    }
    return json({ v: value });
  }

  if (request.method === "POST") {
    const body = await request.json();
    const { k, v } = body || {};
    if (!k || isInternalKey(k)) return json({ error: "k required" }, 400);
    if (!isSuperAdmin) {
      if (k.startsWith("school:")) {
        // ساخت مدرسه‌ی جدید، یا تغییر فیلدهای حساس (فعال/غیرفعال، سقف‌ها، پلن
        // قابلیت‌ها)، فقط با مدیر کل مجازه. اما مدیرِ خودِ همون مدرسه اجازه داره
        // رکورد مدرسه‌ی خودش رو برای کارهای خودمدیریتی ویرایش کنه — برندینگ
        // (لوگو/رنگ/نام) و ساخت کد ورود جدید (که با حذف login_code از v و
        // اساین خودکارِ سرور انجام می‌شه، پایین‌تر در همین تابع).
        if (!isAdmin || k !== `school:${session.school_id}`) {
          return json({ error: "دسترسی غیرمجاز" }, 403);
        }
        const existingRaw = await kv.get(k);
        if (!existingRaw) return json({ error: "دسترسی غیرمجاز" }, 403);
        const existing = JSON.parse(existingRaw);
        const PROTECTED_SCHOOL_FIELDS = ["id", "active", "max_classes", "max_exams_per_class_per_day", "features"];
        for (const f of PROTECTED_SCHOOL_FIELDS) {
          const newVal = v ? v[f] : undefined;
          const oldVal = existing[f];
          if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
            return json({ error: "دسترسی غیرمجاز — این فیلد فقط با مدیر سایت قابل تغییره" }, 403);
          }
        }
      } else if (isAdmin) {
        if (k.startsWith("teacher:")) {
          if (k === `teacher:${session.username}`) {
            // مدیرِ مدرسه فقط می‌تونه رکورد خودش رو ویرایش کنه، نه نقش یا مدرسه‌ش رو
            if (!v || v.username !== session.username || v.role !== session.role || v.school_id !== session.school_id) {
              return json({ error: "دسترسی غیرمجاز" }, 403);
            }
          } else {
            // ساخت/ویرایش حساب معلم — باید نقشش «معلم» و مدرسه‌ش همون مدرسه‌ی این ادمین باشه
            if (!v || v.role !== "teacher" || v.school_id !== session.school_id) {
              return json({ error: "دسترسی غیرمجاز" }, 403);
            }
            const existingRaw = await kv.get(k);
            if (existingRaw) {
              const existing = JSON.parse(existingRaw);
              if (existing.role !== "teacher" || existing.school_id !== session.school_id) {
                return json({ error: "دسترسی غیرمجاز" }, 403);
              }
            }
          }
        } else {
          const claimedSchool = await schoolOf(kv, k, v, caches);
          if (!claimedSchool || claimedSchool !== session.school_id) return json({ error: "دسترسی غیرمجاز" }, 403);
          const existingRaw = await kv.get(k);
          if (existingRaw) {
            const existingSchool = await schoolOf(kv, k, JSON.parse(existingRaw), caches);
            if (existingSchool !== session.school_id) return json({ error: "دسترسی غیرمجاز" }, 403);
          }
          // سقف تعداد کلاس‌های هر مدرسه — فقط موقع ساختِ کلاس *جدید* چک می‌شه
          if (k.startsWith("class:") && !existingRaw) {
            const schoolRaw = await kv.get(`school:${session.school_id}`);
            const schoolRec = schoolRaw ? JSON.parse(schoolRaw) : null;
            const maxClasses = Number(schoolRec?.max_classes) > 0 ? Number(schoolRec.max_classes) : 16;
            const classKeysList = await kv.list({ prefix: "class:" });
            let count = 0;
            for (const ck of classKeysList.keys) {
              const raw = await kv.get(ck.name);
              if (!raw) continue;
              if (JSON.parse(raw).school_id === session.school_id) count++;
            }
            if (count >= maxClasses) {
              return json({ error: `سقف تعداد کلاس‌های این مدرسه (${maxClasses} کلاس) پر شده است. برای افزایش سقف با مدیر سایت تماس بگیرید.` }, 400);
            }
          }
        }
      } else {
        if (k.startsWith("teacher:")) {
          // معلم فقط می‌تونه رکورد خودش رو ویرایش کنه، و نمی‌تونه نقش خودش رو ارتقا بده
          if (k !== `teacher:${session.username}` || !v || v.username !== session.username || v.role !== session.role) {
            return json({ error: "دسترسی غیرمجاز" }, 403);
          }
        } else if (k.startsWith("class:")) {
          if (session.school_id) {
            // معلم عضو یک مدرسه نمی‌تونه کلاس بسازه یا ویرایش کنه — این کار فقط با مدیر مدرسه‌ست
            return json({ error: "دسترسی غیرمجاز" }, 403);
          }
          // معلم مستقل (بدون مدرسه) خودش مدیر صفحه‌ی خودشه — فقط اجازه داره
          // کلاسی بسازه/ویرایش کنه که صرفاً به خودش تعلق داره (تک‌عضوی)
          const ids = classTeacherIds(v);
          if (!v || v.school_id || ids.length !== 1 || ids[0] !== session.username) {
            return json({ error: "دسترسی غیرمجاز" }, 403);
          }
          const existingClassRaw = await kv.get(k);
          if (existingClassRaw) {
            const existingIds = classTeacherIds(JSON.parse(existingClassRaw));
            if (existingIds.length !== 1 || existingIds[0] !== session.username) {
              return json({ error: "دسترسی غیرمجاز" }, 403);
            }
          } else {
            // سقف تعداد کلاس‌های این معلم مستقل — فقط موقع ساختِ کلاس *جدید* چک می‌شه
            const selfRaw = await kv.get(`teacher:${session.username}`);
            const selfRec = selfRaw ? JSON.parse(selfRaw) : null;
            const maxOwnClasses = Number(selfRec?.max_classes) > 0 ? Number(selfRec.max_classes) : 3;
            const classKeysList = await kv.list({ prefix: "class:" });
            let ownCount = 0;
            for (const ck of classKeysList.keys) {
              const raw = await kv.get(ck.name);
              if (!raw) continue;
              const cIds = classTeacherIds(JSON.parse(raw));
              if (cIds.length === 1 && cIds[0] === session.username) ownCount++;
            }
            if (ownCount >= maxOwnClasses) {
              return json({ error: `سقف تعداد کلاس‌های شما (${maxOwnClasses} کلاس) پر شده است. برای افزایش سقف با مدیر سایت تماس بگیرید.` }, 400);
            }
          }
        } else if (k.startsWith("roster:")) {
          const can = await teacherCanAccess(kv, k, v, session.username, caches);
          if (!can) return json({ error: "دسترسی غیرمجاز" }, 403);
          const existingRaw = await kv.get(k);
          if (existingRaw) {
            const existingCan = await teacherCanAccess(kv, k, JSON.parse(existingRaw), session.username, caches);
            if (!existingCan) return json({ error: "دسترسی غیرمجاز" }, 403);
          }
        } else if (k.startsWith("exam:") && !session.school_id) {
          // معلم مستقل: سقف کلیِ تعداد آزمون (نه به‌ازای هر کلاس/روز) —
          // فقط موقع ساختِ آزمونِ *جدید* چک می‌شه، نه ویرایش آزمون موجود.
          const claimedOwner = await ownerOf(kv, k, v);
          if (claimedOwner !== session.username) return json({ error: "دسترسی غیرمجاز" }, 403);
          const existingRaw = await kv.get(k);
          if (existingRaw) {
            const existingOwner = await ownerOf(kv, k, JSON.parse(existingRaw));
            if (existingOwner !== session.username) return json({ error: "دسترسی غیرمجاز" }, 403);
          } else {
            const selfRaw = await kv.get(`teacher:${session.username}`);
            const selfRec = selfRaw ? JSON.parse(selfRaw) : null;
            const maxExams = Number(selfRec?.max_exams) > 0 ? Number(selfRec.max_exams) : 0;
            if (maxExams > 0) {
              const examKeysList = await kv.list({ prefix: "exam:" });
              let ownExamCount = 0;
              for (const ek of examKeysList.keys) {
                const raw = await kv.get(ek.name);
                if (!raw) continue;
                if (JSON.parse(raw).teacher_id === session.username) ownExamCount++;
              }
              if (ownExamCount >= maxExams) {
                return json({ error: `سقف کل تعداد آزمون‌های شما (${maxExams} آزمون) پر شده است. برای افزایش سقف با مدیر سایت تماس بگیرید.` }, 400);
              }
            }
          }
        } else if (k.startsWith("question:") && v && !v.exam_id) {
          // بانک سوال (خصوصی/مدرسه‌ای/عمومی): owner_id و school_id همیشه
          // همین‌جا از روی خودِ سشن ست می‌شن، نه از چیزی که کلاینت فرستاده —
          // وگرنه یه معلم می‌تونست با فرستادن school_id مدرسه‌ی یکی دیگه،
          // سوالش رو جوری جا بزنه که انگار توی اون مدرسه به اشتراک گذاشته شده.
          v.owner_id = session.username;
          v.school_id = session.school_id || null;
          if (v.visibility === "school" && !session.school_id) {
            return json({ error: "فقط معلم‌های عضو یک مدرسه می‌توانند سوال را با «مدرسه» به اشتراک بگذارند." }, 400);
          }
          if (!["private", "school", "global"].includes(v.visibility)) v.visibility = "private";
          const existingRaw = await kv.get(k);
          if (existingRaw) {
            const existing = JSON.parse(existingRaw);
            if ((existing.owner_id || null) !== session.username) return json({ error: "دسترسی غیرمجاز" }, 403);
          }
        } else {
          // برای بقیه‌ی انواع، مقدار جدید باید متعلق به همین معلم باشه...
          const claimedOwner = await ownerOf(kv, k, v);
          if (claimedOwner !== session.username) return json({ error: "دسترسی غیرمجاز" }, 403);
          // ...و اگه کلید از قبل وجود داشته، نباید مال یه معلم دیگه بوده باشه (جلوگیری از ربودن رکورد)
          const existingRaw = await kv.get(k);
          if (existingRaw) {
            const existingOwner = await ownerOf(kv, k, JSON.parse(existingRaw));
            if (existingOwner !== session.username) return json({ error: "دسترسی غیرمجاز" }, 403);
          }
        }
      }
    }

    // چت کلاسی: اگه مدیر سایت/مدیر مدرسه این قابلیت رو برای این معلم یا
    // مدرسه‌ش قفل کرده باشه، حتی نوشتن مستقیم به KV هم رد می‌شه (نه فقط
    // مخفی‌کردن دکمه توی رابط کاربری).
    if (k.startsWith("message:") && v && v.kind === "class_chat" && !isSuperAdmin) {
      if (!(await classChatAllowedForSession(kv, session))) {
        return json({ error: "قابلیت چت کلاسی برای حساب شما فعال نشده است — از مدیر سایت بخواهید آن را فعال کند." }, 403);
      }
    }

    // یکتایی کد شخصیِ روستر در کل گروه ورود (مدرسه یا معلم مستقل) — نه فقط
    // بین همون یک معلمی که این‌بار می‌سازتش. چون چند معلمِ یک مدرسه مستقل از
    // هم کد می‌سازن، این تنها جایی‌ست که واقعاً می‌شه یکتایی رو تضمین کرد. اگه
    // کد پیشنهادیِ کلاینت توی گروه تکراری بود، همین‌جا سمت سرور با یک کد
    // واقعاً یکتا جایگزین می‌شه — کلاینت مقدار نهایی رو از پاسخ (v) می‌گیره.
    if (k.startsWith("roster:") && v && v.teacher_id && v.code) {
      const group = await resolveLoginGroupForTeacher(kv, v.teacher_id);
      if (group) {
        const groupUsernames = await loginGroupTeacherUsernames(kv, group);
        const rosterId = k.slice("roster:".length);
        if (await rosterCodeTakenInGroup(kv, v.code, groupUsernames, rosterId)) {
          v.code = await generateUniqueRosterCode(kv, groupUsernames);
        }
      }
    }

    // کد گروه ورود (کد مدرسه / کد معلم مستقل) — اگه هنوز نداره، همین‌جا یک
    // کد یکتا در کل سیستم براش می‌سازیم؛ هم موقع ساختِ مدرسه/معلمِ جدید، هم
    // وقتی خودِ کاربر دکمه‌ی «کد جدید» رو می‌زنه و مقدار قبلی رو خالی می‌فرسته.
    if (k.startsWith("school:") && v && !v.login_code) {
      v.login_code = await generateUniqueLoginCode(kv);
    }
    if (k.startsWith("teacher:") && v && !v.school_id && !v.login_code) {
      v.login_code = await generateUniqueLoginCode(kv);
    }

    // هر کلاس فقط می‌تونه روزی حداکثر N امتحانِ محدودشده‌به‌همون‌کلاس داشته باشه
    // (N = سقف قابل‌تنظیم هر مدرسه، پیش‌فرض ۱) — صرف‌نظر از این‌که کدوم معلم
    // امتحان رو ساخته (چون یک کلاس می‌تونه چند معلم داشته باشه). فقط وقتی چک
    // می‌شه که امتحان به کلاس(های) خاصی محدود شده و تاریخ بازشدن مشخصی داره.
    if (k.startsWith("exam:") && v && Array.isArray(v.restrict_class_ids) && v.restrict_class_ids.length > 0 && v.opens_at) {
      const newDateKey = tehranDateKey(v.opens_at);
      if (newDateKey) {
        const examSchoolId = await schoolOf(kv, k, v, caches);
        let maxPerDay = 1;
        if (examSchoolId) {
          const schoolRaw = await kv.get(`school:${examSchoolId}`);
          const schoolRec = schoolRaw ? JSON.parse(schoolRaw) : null;
          maxPerDay = Number(schoolRec?.max_exams_per_class_per_day) > 0 ? Number(schoolRec.max_exams_per_class_per_day) : 1;
        }
        const examKeysList = await kv.list({ prefix: "exam:" });
        // برای هر کلاسِ درگیر در این امتحان، تعداد امتحان‌های دیگه‌ی همون روز رو می‌شماریم
        const countPerClass = new Map();
        for (const ek of examKeysList.keys) {
          if (ek.name === k) continue;
          const raw = await kv.get(ek.name);
          if (!raw) continue;
          const other = JSON.parse(raw);
          if (!other.opens_at || !Array.isArray(other.restrict_class_ids) || other.restrict_class_ids.length === 0) continue;
          if (tehranDateKey(other.opens_at) !== newDateKey) continue;
          for (const cid of v.restrict_class_ids) {
            if (other.restrict_class_ids.includes(cid)) {
              countPerClass.set(cid, (countPerClass.get(cid) || 0) + 1);
            }
          }
        }
        for (const cid of v.restrict_class_ids) {
          const existingCount = countPerClass.get(cid) || 0;
          if (existingCount + 1 > maxPerDay) {
            const clsRaw = await kv.get(`class:${cid}`);
            const clsName = clsRaw ? (JSON.parse(clsRaw).name || "این کلاس") : "این کلاس";
            return json({ error: `کلاس «${clsName}» به سقف مجاز امتحان در این روز (${maxPerDay} امتحان) رسیده است.` }, 400);
          }
        }
      }
    }

    // امنیت رمز عبور: این تنها نقطه‌ی مشترکیه که همه‌ی مسیرهای تغییر رمز
    // (ساخت معلم توسط مدیر، بازنشانی رمز توسط مدیر/مدیر سایت، تغییر رمز
    // خودِ کاربر) از توش رد می‌شن — پس همین‌جا هش خامِ کلاینت رو با یک salt
    // اختصاصی و PBKDF2 جایگزین می‌کنیم. فقط وقتی واقعاً *عوض* شده این کار
    // انجام می‌شه (با مقایسه به مقدار فعلیِ ذخیره‌شده)، وگرنه یک آپدیت
    // بی‌ربط به رکورد معلم (مثل تغییر عکس یا قابلیت‌ها) هربار رمزِ از قبل
    // هش‌شده رو دوباره هش می‌کرد و لاگین رو خراب می‌کرد.
    if (k.startsWith("teacher:") && v && typeof v.password === "string") {
      const existingForPw = await kv.get(k);
      const existingPw = existingForPw ? JSON.parse(existingForPw).password : null;
      if (v.password !== existingPw) {
        Object.assign(v, await makeSaltedPassword(v.password));
      }
    }

    await kv.put(k, JSON.stringify(v));
    await syncToD1(env, k, v);
    return json({ ok: true, v });
  }

  if (request.method === "DELETE") {
    const key = url.searchParams.get("key");
    if (!key || isInternalKey(key)) return json({ error: "key required" }, 400);
    if (!isSuperAdmin) {
      const existingRaw = await kv.get(key);
      let existingValue = existingRaw ? JSON.parse(existingRaw) : null;
      if (!existingValue && (key.startsWith("student:") || key.startsWith("answers:") || key.startsWith("cheatalert:"))) {
        const fromD1 = await getFromD1(env, key);
        if (fromD1 !== undefined && fromD1 !== null) existingValue = fromD1;
      }
      if (existingValue) {
        if (isAdmin) {
          const can = await canAccessRecord(kv, key, existingValue, session, true, caches);
          if (!can) return json({ error: "دسترسی غیرمجاز" }, 403);
        } else if (key.startsWith("class:")) {
          if (session.school_id) {
            // معلم عضو یک مدرسه نمی‌تونه کلاس حذف کنه — این کار فقط با مدیر مدرسه‌ست
            return json({ error: "دسترسی غیرمجاز" }, 403);
          }
          const can = await teacherCanAccess(kv, key, existingValue, session.username, caches);
          if (!can) return json({ error: "دسترسی غیرمجاز" }, 403);
        } else {
          const can = await teacherCanAccess(kv, key, existingValue, session.username, caches);
          if (!can) return json({ error: "دسترسی غیرمجاز" }, 403);
        }
      } else if (isAdmin && key.startsWith("school:")) {
        return json({ error: "دسترسی غیرمجاز" }, 403);
      }
    }
    await kv.delete(key);
    await deleteFromD1(env, key);
    return json({ ok: true });
  }

  return json({ error: "method not allowed" }, 405);
}

// سوالات بانکِ به‌اشتراک‌گذاشته‌شده (مدرسه‌ای یا عمومی بین همه‌ی مدارس) —
// این‌ها برخلاف بقیه‌ی داده‌ها، عمداً «مالکیت‌محور» نیستن: باید بین چند
// معلم (یا حتی همه‌ی معلم‌های سیستم) قابل‌دیدن باشن، پس نمی‌شه از همون
// مدل owner-only که /api/list استفاده می‌کنه براشون استفاده کرد — یک
// اندپوینت جدا لازم داره. خودِ سوالِ خصوصی (visibility نداشته یا
// "private") هیچ‌وقت این‌جا برنمی‌گرده، فقط از /api/list (لود شخصی خودِ
// معلم) میاد.
async function handleQuestionBankShared(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);

  let all = null;
  const db = getDB(env);
  if (db) {
    try {
      const rows = await db.prepare("SELECT data FROM questions WHERE exam_id IS NULL").all();
      all = rows.results.map((r) => JSON.parse(r.data));
    } catch (err) {
      console.error("handleQuestionBankShared D1 path failed, falling back to KV:", err);
    }
  }
  if (all === null) {
    // نسخه‌ی جایگزین با KV — فقط وقتی D1 هنوز migrate/bind نشده یا کوئری خطا داد
    const qKeys = await kv.list({ prefix: "question:" });
    all = (await Promise.all(qKeys.keys.map((k) => kv.get(k.name))))
      .filter(Boolean).map((r) => JSON.parse(r)).filter((q) => !q.exam_id);
  }

  const school = session.school_id
    ? all.filter((q) => q.visibility === "school" && q.school_id === session.school_id && q.owner_id !== session.username)
    : [];
  const global = all.filter((q) => q.visibility === "global" && q.owner_id !== session.username);

  const ownerUsernames = [...new Set([...school, ...global].map((q) => q.owner_id).filter(Boolean))];
  const ownerNames = {};
  await Promise.all(ownerUsernames.map(async (uname) => {
    const raw = await kv.get(`teacher:${uname}`);
    if (raw) ownerNames[uname] = JSON.parse(raw).fullname || uname;
  }));

  return json({ school, global, ownerNames });
}

// دیتای عمده‌ی داشبورد معلم (دانش‌آموزها، پاسخ‌ها، هشدارهای تقلب) —
// چون این سه نوع دیگه در handleSubmitAnswers فقط روی D1 نوشته می‌شن (نه
// KV، برای صرفه‌جویی در سهمیه‌ی نوشتنِ تنگِ KV)، دیگه نمی‌شه با همون الگوی
// قدیمیِ «لیست‌کردن KV با پیشوند» (handleList/loadAll) به این‌ها رسید —
// چون در KV اصلاً وجود ندارن. این تابع مستقیم از D1 با اسکوپِ درست
// (فقط دانش‌آموزها/پاسخ‌های معلم‌های مجاز) می‌خونه؛ اگه D1 هنوز
// bind/migrate نشده باشه یا کوئری خطا بده، به همون روش قدیمیِ اسکن KV
// برمی‌گرده (کندتر ولی درست). هم handleTeacherDashboardData هم
// handleFullDashboardData ازین استفاده می‌کنن (فاکتور شده در راند v76).
async function loadStudentsAnswersAlerts(env, session) {
  const kv = getKV(env);
  const isSuperAdmin = session.role === "super_admin";
  const isAdmin = session.role === "admin";
  const db = getDB(env);
  if (db) {
    try {
      let teacherIds = null; // null یعنی بدون فیلتر (فقط مدیر سایت)
      if (!isSuperAdmin) {
        if (isAdmin) {
          const allTeachers = await db.prepare("SELECT data FROM teachers").all();
          teacherIds = allTeachers.results
            .map((r) => { try { return JSON.parse(r.data); } catch { return null; } })
            .filter((t) => t && t.school_id === session.school_id)
            .map((t) => t.username);
        } else {
          teacherIds = [session.username];
        }
      }

      let students, examIds;
      if (teacherIds === null) {
        const rows = await db.prepare("SELECT data FROM students").all();
        students = rows.results.map((r) => JSON.parse(r.data));
        const examRows = await db.prepare("SELECT id FROM exams").all();
        examIds = examRows.results.map((r) => r.id);
      } else {
        students = teacherIds.length ? await d1SelectByIn(db, "students", "teacher_id", teacherIds) : [];
        examIds = teacherIds.length ? await d1SelectByIn(db, "exams", "teacher_id", teacherIds, "id") : [];
      }
      const answersFlat = examIds.length ? await d1SelectByIn(db, "answers", "exam_id", examIds) : [];
      const cheatalerts = examIds.length ? await d1SelectByIn(db, "cheatalerts", "exam_id", examIds) : [];

      return { students, answers: answersFlat, cheatalerts };
    } catch (err) {
      console.error("loadStudentsAnswersAlerts D1 path failed, falling back to KV:", err);
    }
  }

  // نسخه‌ی جایگزین با KV — همون منطق اسکوپ‌بندیِ handleList، ولی این‌بار
  // مقدار کامل رکوردها هم برگردونده می‌شه، نه فقط اسم کلیدها.
  const caches = { teacherSchoolCache: new Map(), examOwnerCache: new Map(), rosterClassCache: new Map() };
  async function scopedRecords(prefix) {
    const keys = [];
    let cursor;
    do {
      const res = await kv.list({ prefix, cursor });
      keys.push(...res.keys.map((k) => k.name));
      cursor = res.list_complete ? null : res.cursor;
    } while (cursor);
    if (isSuperAdmin) {
      const vals = await Promise.all(keys.map((k) => kv.get(k)));
      return vals.filter(Boolean).map((r) => JSON.parse(r));
    }
    const out = [];
    const CONCURRENCY = 25;
    for (let i = 0; i < keys.length; i += CONCURRENCY) {
      const batch = keys.slice(i, i + CONCURRENCY);
      const results = await Promise.all(batch.map(async (key) => {
        const raw = await kv.get(key);
        if (raw === null) return null;
        const value = JSON.parse(raw);
        const can = isAdmin
          ? await canAccessRecord(kv, key, value, session, true, caches)
          : await teacherCanAccess(kv, key, value, session.username, caches);
        return can ? value : null;
      }));
      for (const v of results) if (v) out.push(v);
    }
    return out;
  }
  const [students, answerBatches, cheatalerts] = await Promise.all([
    scopedRecords("student:"), scopedRecords("answers:"), scopedRecords("cheatalert:"),
  ]);
  return { students, answers: answerBatches.flat().filter(Boolean), cheatalerts };
}

async function handleTeacherDashboardData(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);
  return json(await loadStudentsAnswersAlerts(env, session));
}

// همون منطق اسکوپ‌بندیِ handleList (کلید-به-کلید، برحسب مالکیت/مدرسه)،
// فاکتور شده تا هم handleList هم handleFullDashboardData ازش استفاده کنن.
async function makeScopedRecordsFn(kv, session) {
  const isSuperAdmin = session.role === "super_admin";
  const isAdmin = session.role === "admin";
  const caches = { teacherSchoolCache: new Map(), examOwnerCache: new Map(), rosterClassCache: new Map() };
  return async function scopedValues(prefix) {
    const keys = [];
    let cursor;
    do {
      const res = await kv.list({ prefix, cursor });
      keys.push(...res.keys.map((k) => k.name));
      cursor = res.list_complete ? null : res.cursor;
    } while (cursor);
    if (isSuperAdmin) {
      const vals = await Promise.all(keys.map((k) => kv.get(k)));
      return vals.filter(Boolean).map((r) => JSON.parse(r));
    }
    const out = [];
    const CONCURRENCY = 25;
    for (let i = 0; i < keys.length; i += CONCURRENCY) {
      const batch = keys.slice(i, i + CONCURRENCY);
      const results = await Promise.all(batch.map(async (key) => {
        const raw = await kv.get(key);
        if (raw === null) return null;
        const value = JSON.parse(raw);
        const can = isAdmin
          ? await canAccessRecord(kv, key, value, session, true, caches)
          : await teacherCanAccess(kv, key, value, session.username, caches);
        return can ? value : null;
      }));
      for (const v of results) if (v) out.push(v);
    }
    return out;
  };
}

// v75/v76: به‌جای این‌که refresh() سمت کلاینت با 5× loadAll(...) +
// loadAll("teacher:") + loadTeacherDashboardData() ده‌ها تا صدها درخواست
// جدا بزنه (همون علت اصلی اتمام سریع سهمیه‌ی رایگان Workers)، همه‌چیزِ
// لازم برای بارگذاری اولیه‌ی داشبورد معلم/ادمین رو یک‌جا برمی‌گردونه.
// دسترسی/مالکیت هیچ تغییری نکرده — همون منطق قبلی (makeScopedRecordsFn +
// loadStudentsAnswersAlerts)، فقط تعداد درخواست کم شده. سه محل کوچیک‌تر
// دیگه (screens-admin.js/screens-classes.js/screens-superadmin.js) که
// هنوز از loadAll/loadTeacherDashboardData استفاده می‌کنن عمداً دست‌نخورده
// موندن (کم‌ترافیک‌تر، ریسک تغییرشون بیشتر از فایده‌ش بود).
async function handleFullDashboardData(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);

  const scopedValues = await makeScopedRecordsFn(kv, session);
  const [exams, questions, classes, roster, messages, teachers, saa] = await Promise.all([
    scopedValues("exam:"), scopedValues("question:"), scopedValues("class:"),
    scopedValues("roster:"), scopedValues("message:"), scopedValues("teacher:"),
    loadStudentsAnswersAlerts(env, session),
  ]);
  return json({
    exams, questions, classes, roster, messages, teachers,
    students: saa.students, answers: saa.answers, cheatalerts: saa.cheatalerts,
  });
}

// ==========================================
// پایش زنده‌ی یک آزمون خاص — برخلاف handleTeacherDashboardData (که کل
// دیتای حساب معلم رو برمی‌گردونه و برای polling هر چند ثانیه‌یک‌بار سنگینه)،
// این اندپوینت فقط مال یک examId مشخصه: کدوم دانش‌آموزها الان وسط آزمونن
// (از روی draft، که همون‌طور که در schema.sql توضیح داده شده، تقریباً هر
// چند ثانیه یک‌بار در D1 آپدیت می‌شه)، کدوم‌ها تمام کرده‌ان (از answers)، و
// هشدارهای تقلب همین آزمون. برای polling سبک طراحی شده.
async function handleExamLive(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);
  const url = new URL(request.url);
  const examId = url.searchParams.get("examId");
  if (!examId) return json({ error: "examId لازم است" }, 400);

  const examRaw = await kv.get(`exam:${examId}`);
  if (!examRaw) return json({ error: "آزمون یافت نشد" }, 404);
  const exam = JSON.parse(examRaw);

  const isSuperAdmin = session.role === "super_admin";
  const isAdmin = session.role === "admin";
  if (!isSuperAdmin) {
    const caches = { teacherSchoolCache: new Map(), examOwnerCache: new Map() };
    const can = await canAccessRecord(kv, `exam:${examId}`, exam, session, isAdmin, caches);
    if (!can) return json({ error: "دسترسی ندارید" }, 403);
  }

  const db = getDB(env);
  let inProgress = null;
  let submitted = null;
  let cheatalerts = null;
  if (db) {
    try {
      // «_» و «%» توی LIKE معنی خاص دارن؛ examId خودش همیشه با uid() ساخته
      // می‌شه (فقط حروف/عدد)، ولی محض احتیاط escape می‌کنیم.
      const likePattern = `draft:${examId.replace(/[%_]/g, "\\$&")}:%`;
      const draftRows = await db.prepare("SELECT key, data FROM drafts WHERE key LIKE ? ESCAPE '\\'").bind(likePattern).all();
      const prefixLen = `draft:${examId}:`.length;
      inProgress = draftRows.results.map((r) => {
        let d;
        try { d = JSON.parse(r.data); } catch { return null; }
        return { name: r.key.slice(prefixLen), current: (d.current || 0) + 1, total: (d.qOrder || []).length, savedAt: d.savedAt || null, reentries: d.reentries || 0 };
      }).filter(Boolean);

      const answerRows = await db.prepare(
        "SELECT student_id, MAX(json_extract(data, '$.answered_at')) as submitted_at FROM answers WHERE exam_id = ? GROUP BY student_id"
      ).bind(examId).all();
      const submittedAtById = {};
      answerRows.results.forEach((r) => { submittedAtById[r.student_id] = r.submitted_at; });
      const studentIds = Object.keys(submittedAtById);
      const studentRecords = studentIds.length ? await d1SelectByIn(db, "students", "id", studentIds) : [];
      submitted = studentRecords.map((s) => ({ name: s.fullname, submittedAt: submittedAtById[s.id] || null }));

      const alertRows = await db.prepare("SELECT data FROM cheatalerts WHERE exam_id = ?").bind(examId).all();
      cheatalerts = alertRows.results.map((r) => { try { return JSON.parse(r.data); } catch { return null; } }).filter(Boolean);
    } catch (err) {
      console.error("handleExamLive D1 path failed, falling back to KV:", err);
    }
  }
  if (inProgress === null) {
    // نسخه‌ی جایگزین با KV — فقط وقتی D1 هنوز migrate/bind نشده یا کوئری خطا داد
    const draftPrefix = `draft:${examId}:`;
    const draftKeys = [];
    let cursor;
    do {
      const res = await kv.list({ prefix: draftPrefix, cursor });
      draftKeys.push(...res.keys.map((k) => k.name));
      cursor = res.list_complete ? null : res.cursor;
    } while (cursor);
    const draftVals = await Promise.all(draftKeys.map((k) => kv.get(k)));
    inProgress = draftVals.map((raw, i) => {
      if (!raw) return null;
      try {
        const d = JSON.parse(raw);
        return { name: draftKeys[i].slice(draftPrefix.length), current: (d.current || 0) + 1, total: (d.qOrder || []).length, savedAt: d.savedAt || null, reentries: d.reentries || 0 };
      } catch { return null; }
    }).filter(Boolean);

    const answerKeys = await kv.list({ prefix: "answers:" });
    const answerVals = await Promise.all(answerKeys.keys.map((k) => kv.get(k.name)));
    const byStudent = {};
    answerVals.forEach((raw, i) => {
      if (!raw) return;
      let arr;
      try { arr = JSON.parse(raw); } catch { return; }
      if (!Array.isArray(arr) || !arr.length || arr[0]?.exam_id !== examId) return;
      const studentId = answerKeys.keys[i].name.slice("answers:".length);
      const latest = arr.reduce((max, a) => (a.answered_at && (!max || a.answered_at > max) ? a.answered_at : max), null);
      byStudent[studentId] = latest;
    });
    const studentIds = Object.keys(byStudent);
    const studentVals = await Promise.all(studentIds.map((id) => kv.get(`student:${id}`)));
    submitted = studentVals.map((raw, i) => {
      if (!raw) return null;
      try { return { name: JSON.parse(raw).fullname, submittedAt: byStudent[studentIds[i]] || null }; } catch { return null; }
    }).filter(Boolean);

    const alertKeys = await kv.list({ prefix: "cheatalert:" });
    const alertVals = await Promise.all(alertKeys.keys.map((k) => kv.get(k.name)));
    cheatalerts = alertVals.filter(Boolean).map((r) => { try { return JSON.parse(r); } catch { return null; } })
      .filter((a) => a && a.exam_id === examId);
  }

  cheatalerts.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  return json({ examTitle: exam.title, inProgress, submitted, cheatalerts });
}

async function handleList(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);
  const isSuperAdmin = session.role === "super_admin";
  const isAdmin = session.role === "admin";
  const url = new URL(request.url);
  const prefix = url.searchParams.get("prefix") || "";
  if (isInternalKey(prefix) || prefix === "") return json({ keys: [] });
  const keys = [];
  let cursor;
  do {
    const res = await kv.list({ prefix, cursor });
    keys.push(...res.keys.map((k) => k.name));
    cursor = res.list_complete ? null : res.cursor;
  } while (cursor);

  if (isSuperAdmin) return json({ keys });

  // برای مدیر مدرسه و معلم، فقط کلیدهایی که واقعاً مال خودشون/مدرسه‌ی
  // خودشونه برگردونده می‌شه — این همون تکه‌ای بود که قبلاً نبود: هر
  // کاربر لاگین‌کرده کل دیتای بقیه رو هم می‌گرفت چون این اندپوینت فقط
  // اسم کلیدها رو برمی‌گردوند، بدون توجه به این‌که واقعاً مال همون
  // کاربره یا مدرسه‌ش یا نه.
  // خواندن و بررسی مالکیت هر کلید یه رفت‌وبرگشت جدا به KV داره؛ اگه این کارو
  // یکی‌یکی و پشت‌سرهم انجام بدیم، برای مدرسه‌ای با صدها رکورد چندین ثانیه
  // طول می‌کشه. به‌جاش دسته‌دسته (هم‌زمان) پردازش می‌کنیم تا سریع بمونه، بدون
  // اینکه فشار زیادی روی KV بذاریم.
  const caches = { teacherSchoolCache: new Map(), examOwnerCache: new Map(), rosterClassCache: new Map() };
  const owned = [];
  const CONCURRENCY = 25;
  for (let i = 0; i < keys.length; i += CONCURRENCY) {
    const batch = keys.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (key) => {
        const raw = await kv.get(key);
        if (raw === null) return null;
        const value = JSON.parse(raw);
        if (isAdmin) {
          const can = await canAccessRecord(kv, key, value, session, true, caches);
          return can ? key : null;
        }
        const can = await teacherCanAccess(kv, key, value, session.username, caches);
        return can ? key : null;
      })
    );
    for (const key of results) if (key) owned.push(key);
  }
  return json({ keys: owned });
}

// ==========================================
// تایید یک‌باره‌ی مجوز مدل تصویری (Meta License) — Cloudflare قبل از اولین
// استفاده از llama-3.2-11b-vision-instruct، نیاز به یه درخواست با
// prompt: "agree" داره. این اندپوینت همون کارو انجام می‌ده، فقط برای اینکه
// از رابط Playground (که موبایل‌فرندلی نیست) بی‌نیاز باشیم. فقط ادمین
// می‌تونه صداش بزنه، و بعد از تایید موفق دیگه لازم نیست دوباره استفاده بشه.
// آیا این حساب اجازه‌ی استفاده از قابلیت‌های هوش مصنوعی رو داره؟ — مدیر کل
// همیشه مجازه. برای حساب‌های متعلق به یک مدرسه (مدیر مدرسه + همه‌ی معلم‌های
// زیرمجموعه‌ش)، این یه «پلن مدرسه»ست: یا کل مدرسه فعاله یا نیست — روی
// school.features ذخیره می‌شه، مستقل از این‌که کدوم مدیر/معلم درخواست داده
// (یعنی غیرفعال کردنش برای مدرسه، خودکار همه‌ی زیرمجموعه رو هم قطع می‌کنه).
// معلم مستقل (بدون school_id) قابلیتش رو جدا و شخصی داره، روی خودِ
// teacher.features.
async function aiAllowedForSession(kv, session) {
  if (session.role === "super_admin") return true;
  if (session.school_id) {
    const raw = await kv.get(`school:${session.school_id}`);
    if (!raw) return false;
    const s = JSON.parse(raw);
    return !!(s.features && s.features.ai_assistant);
  }
  const raw = await kv.get(`teacher:${session.username}`);
  if (!raw) return false;
  const t = JSON.parse(raw);
  return !!(t.features && t.features.ai_assistant);
}

// چت کلاسی (برخلاف هوش مصنوعی) از قبل برای همه فعال بوده، پس این قفل باید
// «پیش‌فرض روشن» باشه — یعنی تا وقتی صریحاً false نشده، مجازه. همون مدل
// مدرسه‌ای/تکی که برای هوش مصنوعی هست (مدیر مدرسه یا معلم مستقل).
function classChatFeatureEnabled(features) {
  if (!features || features.class_chat === undefined) return true;
  return !!features.class_chat;
}
async function classChatAllowedForSession(kv, session) {
  if (session.role === "super_admin") return true;
  if (session.school_id) {
    const raw = await kv.get(`school:${session.school_id}`);
    if (!raw) return false;
    return classChatFeatureEnabled(JSON.parse(raw).features);
  }
  const raw = await kv.get(`teacher:${session.username}`);
  if (!raw) return false;
  return classChatFeatureEnabled(JSON.parse(raw).features);
}
// همون بررسی، ولی وقتی سشن نداریم (دانش‌آموز، از طریق کد roster) — کلید
// از روی نام‌کاربری معلم صاحبِ کلاس انجام می‌شه.
async function classChatAllowedForTeacherUsername(kv, teacherUsername) {
  const raw = await kv.get(`teacher:${teacherUsername}`);
  if (!raw) return false;
  const t = JSON.parse(raw);
  if (t.school_id) {
    const sraw = await kv.get(`school:${t.school_id}`);
    if (!sraw) return false;
    return classChatFeatureEnabled(JSON.parse(sraw).features);
  }
  return classChatFeatureEnabled(t.features);
}

// ==========================================
// پیشنهاد نمره برای پاسخ تشریحی با هوش مصنوعی — فقط یه پیشنهاده؛ معلم
// خودش باید نمره رو تایید/ویرایش و ثبت کنه، چیزی خودکار ذخیره نمی‌شه.
// ==========================================
async function handleGradeEssay(request, env) {
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);
  if (!env.AI) return json({ error: "قابلیت هوش مصنوعی برای این پروژه فعال نیست" }, 500);
  if (!(await aiAllowedForSession(getKV(env), session))) return json({ error: "قابلیت هوش مصنوعی برای حساب شما فعال نشده است — از مدیر سایت بخواهید آن را فعال کند." }, 403);

  const body = await request.json().catch(() => ({}));
  const questionText = (body.question_text || "").trim();
  const modelAnswer = (body.model_answer || "").trim();
  const keywords = Array.isArray(body.keywords) ? body.keywords : [];
  const studentAnswer = (body.student_answer || "").trim();
  const mark = Number(body.mark) || 1;
  if (!questionText || !studentAnswer) return json({ error: "متن سوال و پاسخ دانش‌آموز لازمه" }, 400);

  const hasReference = !!(modelAnswer || keywords.length > 0);
  const prompt = `تو یه معلم منصفی که پاسخ تشریحی دانش‌آموز رو تصحیح می‌کنی.
سوال: ${questionText}
نمره‌ی کامل این سوال: ${mark}
${modelAnswer ? `پاسخ نمونه‌ی معلم: ${modelAnswer}` : "پاسخ نمونه‌ای ثبت نشده."}
${keywords.length > 0 ? `کلمات کلیدی موردانتظار: ${keywords.join("، ")}` : ""}

پاسخ دانش‌آموز: ${studentAnswer.slice(0, 4000)}

بر اساس میزان تطابق پاسخ دانش‌آموز با پاسخ نمونه/کلمات کلیدی بالا، یه نمره‌ی منصفانه بین ۰ تا ${mark} بده — فقط از این مقادیر استفاده کن: مضرب‌های ۰.۲۵ (یعنی ۰، ۰.۲۵، ۰.۵، ۰.۷۵، ۱ و به همین ترتیب)، نه هر عدد اعشاری دیگه. یه بازخورد خیلی کوتاه (حداکثر ۲ جمله، به فارسی) هم بده.
خروجی رو دقیقاً و فقط با این فرمت بده، بدون هیچ توضیح اضافه:
SCORE: <عدد>
FEEDBACK: <بازخورد کوتاه>`;

  try {
    const result = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });
    const raw = (result && (result.response || result.result || "")) || "";
    const scoreMatch = raw.match(/SCORE:\s*([\d.]+)/i);
    const feedbackMatch = raw.match(/FEEDBACK:\s*([\s\S]*)/i);
    if (!scoreMatch) return json({ error: "هوش مصنوعی خروجی قابل‌فهمی نداد. دوباره امتحان کن." }, 502);
    let score = parseFloat(scoreMatch[1]);
    if (Number.isNaN(score)) score = 0;
    score = Math.max(0, Math.min(mark, score));
    score = Math.round(score * 4) / 4; // به نزدیک‌ترین ۰.۲۵ گرد می‌شه (۰، ۰.۲۵، ۰.۵، ۰.۷۵، ۱، ...)
    const feedback = feedbackMatch ? feedbackMatch[1].trim().split("\n")[0] : "";
    return json({ ok: true, score, feedback, hasReference });
  } catch (err) {
    console.error("handleGradeEssay failed:", err);
    return json({ error: `پیشنهاد نمره با خطا مواجه شد: ${err.message || err}` }, 500);
  }
}

// ==========================================
// تایید یک‌باره‌ی مجوز مدل تصویری (Meta License) — Cloudflare قبل از اولین
// استفاده از llama-3.2-11b-vision-instruct، نیاز به یه درخواست با
// prompt: "agree" داره. این اندپوینت همون کارو انجام می‌ده، فقط برای اینکه
// از رابط Playground (که موبایل‌فرندلی نیست) بی‌نیاز باشیم.
async function handleAcceptAiLicense(request, env) {
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);
  if (!env.AI) return json({ error: "AI binding فعال نیست" }, 500);
  try {
    const result = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", { prompt: "agree" });
    return json({ ok: true, result });
  } catch (err) {
    return json({ error: err.message || String(err) }, 500);
  }
}

// ==========================================
// تولید سوال با هوش مصنوعی (Cloudflare Workers AI — رایگان، بدون نیاز به
// حساب یا کلید جداگانه). خروجی مدل عمداً در همون قالب متنی‌ای خواسته می‌شه
// که ابزار «ورود گروهی سوال» از قبل می‌فهمه (Q:/A)/ANSWER:/MARK:)، تا
// معلم قبل از ذخیره‌ی نهایی، متن رو ببینه و ویرایش کنه — هیچ سوالی خودکار
// و بدون تایید معلم ذخیره نمی‌شه.
// ==========================================
const AI_PROMPT_INSTRUCTIONS = `شما دستیار طراحی سوال امتحان هستی. بر اساس محتوای داده‌شده، سوال امتحانی به زبان فارسی بساز.
خروجی باید دقیقاً و فقط در این قالب باشه (بدون هیچ توضیح اضافه‌ی قبل یا بعدش):

برای سوال چهارگزینه‌ای:
Q: متن سوال
A) گزینه یک
B) گزینه دو
C) گزینه سه
D) گزینه چهار
ANSWER: <حرف گزینه‌ی صحیح، مثلاً A>
MARK: 1

برای سوال تشریحی:
Q: متن سوال
TYPE: essay
ANSWER: پاسخ نمونه
MARK: 1

بین هر سوال و سوال بعدی، دقیقاً یک خط خالی بذار. هیچ متن دیگه‌ای (مثل مقدمه یا جمع‌بندی) توی خروجی نباشه.`;

async function handleAIGenerateQuestions(request, env) {
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);
  if (!env.AI) return json({ error: "قابلیت هوش مصنوعی برای این پروژه فعال نیست (باید binding با نام AI به wrangler.toml اضافه بشه)" }, 500);
  if (!(await aiAllowedForSession(getKV(env), session))) return json({ error: "قابلیت هوش مصنوعی برای حساب شما فعال نشده است — از مدیر سایت بخواهید آن را فعال کند." }, 403);

  const body = await request.json().catch(() => ({}));
  const { mode, sourceText, imageBase64, count, questionType } = body;
  const n = Math.min(Math.max(Number(count) || 5, 1), 15);
  const typeHint = questionType === "essay" ? "فقط سوال تشریحی"
    : questionType === "mixed" ? "ترکیبی از چهارگزینه‌ای و تشریحی"
    : "فقط سوال چهارگزینه‌ای";
  const instructions = `${AI_PROMPT_INSTRUCTIONS}\n\nتعداد سوال موردنیاز: ${n} عدد. نوع سوال: ${typeHint}.`;

  try {
    let result;
    let debugOcrText = null;
    if (mode === "image") {
      if (!imageBase64) return json({ error: "تصویری ارسال نشده" }, 400);
      // مدل‌های تصویری Workers AI معمولاً بایت‌های خام تصویر رو به‌صورت آرایه می‌خوان
      const binary = Uint8Array.from(atob(imageBase64), (c) => c.charCodeAt(0));
      // قدم اول: مدل تصویری فقط متن داخل عکس رو استخراج می‌کنه (کار ساده‌تر و
      // قابل‌اعتمادتر). اگه هم‌زمان از مدل بخوایم عکس رو بخونه، فارسی جواب بده،
      // و فرمت خاص رو رعایت کنه، مدل‌های سبک تصویری زیاد توی یه حلقه‌ی تکراری
      // گیر می‌کنن. قدم دوم رو به همون مدل قوی متنی می‌سپاریم که از قبل خوب کار می‌کرد.
      const ocrResult = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {
        prompt: "You are an OCR engine, not an image describer. Output ONLY the exact words/sentences printed or written in this image, verbatim, preserving line breaks. Do NOT describe the image, its colors, its layout, or its language — only transcribe the actual text content, in whatever language it is written in. If there is no readable text, reply with exactly: NO_TEXT_FOUND",
        image: Array.from(binary),
        max_tokens: 2048,
      });
      const extractedText = (ocrResult && (ocrResult.response || ocrResult.result || "")) || "";
      debugOcrText = extractedText;
      // اگه مدل به‌جای رونویسی متن، توضیح داده (مثلاً درباره‌ی رنگ یا زبان تصویر)،
      // معمولاً نتیجه خیلی کوتاهه — بهتره این‌جا جلوش رو بگیریم تا سوال بی‌ربط تولید نشه.
      if (!extractedText.trim() || extractedText.includes("NO_TEXT_FOUND") || extractedText.trim().length < 40) {
        return json({ error: "متن قابل استفاده‌ای از تصویر خونده نشد (شاید متن خیلی کوچیک یا کم‌واضح بود). یه عکس واضح‌تر و با نور بهتر امتحان کن، یا نزدیک‌تر از متن عکس بگیر.", debugOcrText: extractedText }, 502);
      }
      result = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages: [
          { role: "system", content: instructions },
          { role: "user", content: `این متن رو بخون و از روش سوال بساز:\n\n${extractedText.slice(0, 12000)}` },
        ],
        max_tokens: 3000,
      });
    } else {
      if (!sourceText || !sourceText.trim()) return json({ error: "متنی ارسال نشده" }, 400);
      result = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages: [
          { role: "system", content: instructions },
          { role: "user", content: `این متن رو بخون و از روش سوال بساز:\n\n${sourceText.slice(0, 12000)}` },
        ],
        max_tokens: 3000,
      });
    }
    const outputText = (result && (result.response || result.result || "")) || "";
    if (!outputText.trim()) return json({ error: "هوش مصنوعی خروجی برنگردوند، دوباره امتحان کن." }, 502);
    return json({ ok: true, text: outputText.trim(), debugOcrText });
  } catch (err) {
    console.error("handleAIGenerateQuestions failed:", err);
    return json({ error: `تولید سوال با خطا مواجه شد: ${err.message || err}` }, 500);
  }
}

// ==========================================
// پیشنهاد تمرین با هوش مصنوعی بر اساس نقاط ضعف — تشخیصِ خودِ نقاط ضعف
// (کدوم برچسب‌ها ضعیف‌ترن) کاملاً سمت کلاینته (computeWeakTopics در ui.js،
// از answers/questionsِ از قبل لودشده، بدون نیاز به کوئری جدید)؛ این
// اندپوینت فقط قدم دوم رو انجام می‌ده: گرفتن یه پیشنهاد تمرینِ کوتاه و
// عملی از هوش مصنوعی برای همون برچسب‌های ضعیف. مثل بقیه‌ی اندپوینت‌های
// AI، پشت پرچم aiAllowedForSession (مدرسه/معلم) قفله.
// ==========================================
async function handleWeakTopicsSuggestion(request, env) {
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);
  if (!env.AI) return json({ error: "قابلیت هوش مصنوعی برای این پروژه فعال نیست" }, 500);
  if (!(await aiAllowedForSession(getKV(env), session))) return json({ error: "قابلیت هوش مصنوعی برای حساب شما فعال نشده است — از مدیر سایت بخواهید آن را فعال کند." }, 403);

  const body = await request.json().catch(() => ({}));
  const studentName = (body.studentName || "").trim();
  const weakTopics = Array.isArray(body.weakTopics) ? body.weakTopics.slice(0, 5) : [];
  const cleaned = weakTopics
    .map((t) => ({ tag: String(t?.tag || "").trim().slice(0, 60), pct: Number(t?.pct) }))
    .filter((t) => t.tag && !Number.isNaN(t.pct));
  if (cleaned.length === 0) return json({ error: "نقطه‌ضعفی برای این دانش‌آموز ثبت نشده" }, 400);

  const topicsList = cleaned.map((t) => `- ${t.tag} (درصد پاسخ درست تا الان: ٪${t.pct})`).join("\n");
  const prompt = `تو یه دستیار آموزشی هستی که به معلم کمک می‌کنی برای یک دانش‌آموز خاص برنامه‌ی تمرینِ هدفمند بسازه.
دانش‌آموز: ${studentName || "این دانش‌آموز"}
نقاط ضعفِ این دانش‌آموز بر اساس برچسبِ سوال‌هایی که در امتحان‌های قبلی اشتباه جواب داده، به ترتیب ضعیف‌ترین:
${topicsList}

یه پیشنهاد تمرینِ کوتاه، عملی و مشخص به فارسی بنویس (حداکثر ۵-۶ خط، به‌صورت چند خط جدا نه یک پاراگراف طولانی) که:
- برای هر برچسب ضعیف، یک پیشنهاد مشخص و کوتاه بده (نه توضیح کلی)
- لحن دوستانه و کاربردی برای معلم داشته باشه، نه رسمی و پیچیده
- هیچ مقدمه یا جمع‌بندی اضافه‌ای نداشته باشه — فقط خودِ پیشنهادها`;

  try {
    const result = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });
    const suggestion = (result && (result.response || result.result || "")) || "";
    if (!suggestion.trim()) return json({ error: "هوش مصنوعی خروجی برنگردوند، دوباره امتحان کن." }, 502);
    return json({ ok: true, suggestion: suggestion.trim() });
  } catch (err) {
    console.error("handleWeakTopicsSuggestion failed:", err);
    return json({ error: `دریافت پیشنهاد با خطا مواجه شد: ${err.message || err}` }, 500);
  }
}

// آیا این دانش‌آموز قبلاً همین امتحان رو داده؟ — به‌جای این‌که کل لیست
// دانش‌آموزها و پاسخ‌های همه‌ی مدرسه به مرورگر دانش‌آموز بیاد، این فقط
// یک true/false برمی‌گردونه.
async function handleExamAttempted(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ already: false });
  const url = new URL(request.url);
  const examId = url.searchParams.get("examId");
  const name = (url.searchParams.get("name") || "").trim();
  if (!examId || !name) return json({ already: false });

  const examRaw = await kv.get(`exam:${examId}`);
  if (!examRaw) return json({ already: false });
  const exam = JSON.parse(examRaw);

  const db = getDB(env);
  if (db) {
    try {
      const studentRows = await db.prepare("SELECT id FROM students WHERE teacher_id = ? AND fullname = ?")
        .bind(exam.teacher_id, name).all();
      const matchingIds = studentRows.results.map((r) => r.id);
      if (matchingIds.length === 0) return json({ already: false });
      const placeholders = matchingIds.map(() => "?").join(",");
      const answerRow = await db.prepare(
        `SELECT 1 FROM answers WHERE exam_id = ? AND student_id IN (${placeholders}) LIMIT 1`
      ).bind(examId, ...matchingIds).first();
      return json({ already: !!answerRow });
    } catch (err) {
      console.error("handleExamAttempted D1 path failed, falling back to KV:", err);
    }
  }

  // نسخه‌ی جایگزین با KV — فقط وقتی D1 هنوز migrate/bind نشده یا کوئری خطا داد
  const [studentKeys, answersKeys] = await Promise.all([
    kv.list({ prefix: "student:" }), kv.list({ prefix: "answers:" }),
  ]);
  const students = (await Promise.all(studentKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
  const matchingIds = students
    .filter((s) => s.teacher_id === exam.teacher_id && (s.fullname || "").trim() === name)
    .map((s) => s.id);
  if (matchingIds.length === 0) return json({ already: false });

  const answerBatches = (await Promise.all(answersKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
  const already = answerBatches.flat().some((a) => a && matchingIds.includes(a.student_id) && a.exam_id === examId);
  return json({ already });
}
async function handleTeacherExists(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ exists: false });
  const res = await kv.list({ prefix: "teacher:", limit: 1 });
  return json({ exists: res.keys.length > 0 });
}

// ثبت‌نام فقط برای ساخت اولین حساب (مدیر کل) مجاز است — این چک حالا سمت
// سرور انجام می‌شه، نه فقط با یک state در فرانت‌اند که قابل دور زدن بود.
// این حساب هیچ مدرسه‌ای نداره (school_id ندارد) چون مدیر کل روی همه‌ی
// مدرسه‌ها دسترسی داره؛ مدیرهای هر مدرسه رو خودِ همین حساب از پنل
// «مدیر کل» می‌سازه (نگاه کن به مسیر school:/api/kv برای super_admin).
async function handleRegister(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const existing = await kv.list({ prefix: "teacher:", limit: 1 });
  if (existing.keys.length > 0) return json({ error: "امکان ثبت‌نام وجود ندارد" }, 403);

  const { username, fullname, email, passwordHash } = await request.json();
  if (!username || !fullname || !email || !passwordHash) {
    return json({ error: "همه فیلدها لازم است" }, 400);
  }
  const teacher = { username, fullname, email, ...(await makeSaltedPassword(passwordHash)), role: "super_admin", created_at: new Date().toISOString() };
  await kv.put(`teacher:${username}`, JSON.stringify(teacher));
  await syncToD1(env, `teacher:${username}`, teacher);

  const token = uid() + uid() + uid();
  await kv.put(`session:${token}`, JSON.stringify({ username, role: "super_admin", school_id: null }), { expirationTtl: 60 * 60 * 24 * 30 });
  return json({ ok: true, token, teacher });
}

// بعد از چند تلاش ناموفق پشت سر هم برای یک نام کاربری، ورود رو برای چند
// دقیقه قفل می‌کنه — جلوی حدس زدن نامحدود رمز عبور رو می‌گیره.
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_LOCKOUT_SECONDS = 10 * 60;

async function handleLogin(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const { username, passwordHash } = await request.json();
  if (!username || !passwordHash) return json({ error: "نام کاربری و رمز عبور لازم است" }, 400);

  const failKey = `loginfail:${username}`;
  const failRaw = await kv.get(failKey);
  const fail = failRaw ? JSON.parse(failRaw) : { count: 0 };
  if (fail.count >= LOGIN_MAX_ATTEMPTS) {
    return json({ error: "به‌دلیل تلاش‌های ناموفق زیاد، چند دقیقه صبر کنید و دوباره امتحان کنید." }, 429);
  }

  const raw = await kv.get(`teacher:${username}`);
  const teacher = raw ? JSON.parse(raw) : null;
  if (!teacher || !(await verifyPassword(kv, env, teacher, passwordHash))) {
    await kv.put(failKey, JSON.stringify({ count: fail.count + 1 }), { expirationTtl: LOGIN_LOCKOUT_SECONDS });
    return json({ error: "نام کاربری یا رمز عبور اشتباه است" }, 401);
  }
  if (teacher.active === false) {
    return json({ error: "این حساب غیرفعال شده است. با مدیر مدرسه تماس بگیرید." }, 403);
  }
  if (teacher.role !== "super_admin" && teacher.school_id) {
    const schoolRaw = await kv.get(`school:${teacher.school_id}`);
    const school = schoolRaw ? JSON.parse(schoolRaw) : null;
    if (school && school.active === false) {
      return json({ error: "دسترسی مدرسه‌ی شما موقتاً غیرفعال شده است. با مدیر سایت تماس بگیرید." }, 403);
    }
  }
  await kv.delete(failKey);
  const token = uid() + uid() + uid();
  await kv.put(`session:${token}`, JSON.stringify({ username: teacher.username, role: teacher.role || "teacher", school_id: teacher.school_id || null }), { expirationTtl: 60 * 60 * 24 * 30 });

  // ثبت آخرین ورود و تعداد ورودها — برای گزارش «عملکرد/میزان استفاده»
  // مدیرهای مدرسه و معلم‌های مستقل که مدیر سایت می‌بینه. دوباره از KV
  // می‌خونیم (نه از متغیر `teacher` بالا) چون ممکنه verifyPassword همین
  // چند خط قبل، رکورد رو برای مهاجرت به هش نمکی آپدیت کرده باشه و
  // نمی‌خوایم اون تغییر رو با یه نسخه‌ی قدیمی‌تر بازنویسی کنیم.
  const freshRaw = await kv.get(`teacher:${username}`);
  const freshTeacher = freshRaw ? JSON.parse(freshRaw) : teacher;
  const loggedInTeacher = { ...freshTeacher, last_login_at: new Date().toISOString(), login_count: (freshTeacher.login_count || 0) + 1 };
  await kv.put(`teacher:${username}`, JSON.stringify(loggedInTeacher));
  await syncToD1(env, `teacher:${username}`, loggedInTeacher);

  return json({ ok: true, token, teacher: loggedInTeacher });
}

async function handleLogout(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ ok: true });
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (token) await kv.delete(`session:${token}`);
  return json({ ok: true });
}

async function handleForgotPassword(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const { username } = await request.json();
  const uname = (username || "").trim();
  if (!uname) return json({ ok: true }); // پاسخ عمومی، حتی برای ورودی خالی

  const raw = await kv.get(`teacher:${uname}`);
  const teacher = raw ? JSON.parse(raw) : null;
  // همیشه پاسخ یکسان (ok:true) برمی‌گردونیم تا نشه فهمید کدوم نام کاربری ثبت شده
  if (!teacher || !teacher.email) return json({ ok: true });

  const token = uid() + uid();
  await kv.put(`resettoken:${token}`, JSON.stringify({ username: teacher.username }), {
    expirationTtl: 3600,
  });

  const url = new URL(request.url);
  const resetLink = `${url.origin}/?reset=${token}`;

  if (env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.RESEND_FROM || "onboarding@resend.dev",
          to: teacher.email,
          subject: "بازیابی رمز عبور — آزمون‌ساز معلم",
          html: `
            <div dir="rtl" style="font-family:Tahoma,sans-serif;font-size:15px;line-height:1.9">
              <p>سلام ${teacher.fullname || ""}،</p>
              <p>برای تنظیم رمز عبور جدید روی لینک زیر بزن. این لینک تا ۱ ساعت دیگر معتبر است.</p>
              <p><a href="${resetLink}">${resetLink}</a></p>
              <p>اگر این درخواست را نداده‌ای، این ایمیل را نادیده بگیر.</p>
            </div>`,
        }),
      });
    } catch (e) {
      // خطای ایمیل نادیده گرفته می‌شود
    }
  }
  return json({ ok: true });
}

// وقتی یه حساب معلم/مدیر تازه ساخته می‌شه، سازنده‌ش (مدیر مدرسه یا مدیر
// کل) یه رمز اولیه براش تعیین می‌کنه — ولی اون رمز رو باید جداگانه و
// دستی به فرد بگه که اصلاً امن و راحت نیست. این اندپوینت یه ایمیل
// خوش‌آمد می‌فرسته با لینکی که فرد بتونه رمز عبور خودشو مستقیماً تنظیم
// کنه، دقیقاً با همون مکانیزم «فراموشی رمز عبور» ولی با عمر بیشتر (چون
// ممکنه فرد چند روز بعد ایمیلشو چک کنه، نه فوری).
//
// نکته‌ی مهم: اطلاعات حساب (fullname/email/role) رو مستقیماً از بدنه‌ی
// درخواست می‌گیریم، نه با یه kv.get بلافاصله بعد از ساخت حساب — چون
// نوشتن روی KV فوراً و همه‌جا یکسان قابل‌خوندن نیست (تا حدود ۶۰ ثانیه
// طول می‌کشه تا روی همه‌ی edge locationها پخش بشه)، و اگه این درخواست
// به یه edge دیگه بیفته که هنوز نوشته‌ی تازه رو ندیده، ایمیل بی‌صدا
// (چون fire-and-forget بود) ارسال نمی‌شد. چون سازنده همین الان خودش
// همین مقادیر رو برای ساخت حساب فرستاده، امنیتاً مشکلی نداره از همونا
// استفاده کنیم به‌جای خوندن دوباره از KV.
async function handleSendWelcomeEmail(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "لازم است دوباره وارد شوید" }, 401);
  if (session.role !== "super_admin" && session.role !== "admin") {
    return json({ error: "دسترسی غیرمجاز" }, 403);
  }

  const body = await request.json().catch(() => ({}));
  const username = (body.username || "").trim();
  const fullname = (body.fullname || "").trim();
  const email = (body.email || "").trim();
  let role = (body.role || "teacher").trim();
  if (!username || !email) return json({ error: "username و email لازم است" }, 400);
  // مدیر مدرسه فقط برای معلم دعوت می‌فرسته، صرف‌نظر از هرچی که فرانت‌اند فرستاده
  if (session.role === "admin") role = "teacher";

  const roleLabel = role === "admin" ? "مدیر مدرسه" : role === "super_admin" ? "مدیر سایت" : "معلم";
  const token = uid() + uid();
  await kv.put(`resettoken:${token}`, JSON.stringify({ username }), {
    expirationTtl: 7 * 24 * 60 * 60, // ۷ روز — بیشتر از توکن معمولِ فراموشی رمز
  });
  const url = new URL(request.url);
  const setLink = `${url.origin}/?reset=${token}`;

  if (env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: env.RESEND_FROM || "onboarding@resend.dev",
          to: email,
          subject: "حساب شما در آزمون‌ساز معلم ساخته شد",
          html: `
            <div dir="rtl" style="font-family:Tahoma,sans-serif;font-size:15px;line-height:1.9">
              <p>سلام ${fullname},</p>
              <p>یک حساب با نقش «${roleLabel}» برایت در سامانه‌ی آزمون‌ساز ساخته شده است.</p>
              <p>نام کاربری: <b dir="ltr">${username}</b></p>
              <p>برای تنظیم رمز عبور دلخواه خودت، روی لینک زیر بزن (تا ۷ روز معتبر است):</p>
              <p><a href="${setLink}">${setLink}</a></p>
              <p>اگر ترجیح می‌دهی، می‌توانی از همان رمزی که هنگام ساخت حساب برایت مشخص شده هم استفاده کنی.</p>
            </div>`,
        }),
      });
      if (!r.ok) {
        const errText = await r.text().catch(() => "");
        console.error("handleSendWelcomeEmail Resend API error:", r.status, errText);
        return json({ ok: true, sent: false, reason: "resend-error", status: r.status });
      }
    } catch (e) {
      console.error("handleSendWelcomeEmail fetch failed:", e);
      return json({ ok: true, sent: false, reason: "email-failed" });
    }
    return json({ ok: true, sent: true });
  }
  return json({ ok: true, sent: false, reason: "resend-not-configured" });
}

async function handleResetPassword(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const { token, newPassword } = await request.json();
  if (!token || !newPassword) return json({ error: "token and newPassword required" }, 400);

  const raw = await kv.get(`resettoken:${token}`);
  if (!raw) return json({ error: "invalid or expired token" }, 400);
  const { username } = JSON.parse(raw);

  const teacherRaw = await kv.get(`teacher:${username}`);
  if (!teacherRaw) return json({ error: "teacher not found" }, 404);
  const teacher = JSON.parse(teacherRaw);
  Object.assign(teacher, await makeSaltedPassword(newPassword));
  await kv.put(`teacher:${username}`, JSON.stringify(teacher));
  await syncToD1(env, `teacher:${username}`, teacher);
  await kv.delete(`resettoken:${token}`);

  return json({ ok: true });
}

// پرتال دانش‌آموزی — با کد شخصی، فقط نتایج و پیام‌های خودِ همون دانش‌آموز
// برمی‌گرده، نه کل دیتابیس مدرسه.
async function handleStudentLookup(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const db = getDB(env);
  const url = new URL(request.url);
  const schoolCode = (url.searchParams.get("schoolCode") || "").trim();
  const code = (url.searchParams.get("code") || "").trim();
  if (!schoolCode || !code) return json({ error: "کد لازم است" }, 400);

  const group = await findLoginGroupByCode(env, schoolCode);
  if (!group) return json({ found: false });
  const teacherUsernames = await loginGroupTeacherUsernames(kv, group);
  const activeRoster = await findRosterByCode(env, code, teacherUsernames);
  if (!activeRoster) return json({ found: false });
  if (!(await accountAndSchoolActive(kv, activeRoster.teacher_id))) return json({ found: false });

  const classRaw = await kv.get(`class:${activeRoster.class_id}`);
  const className = classRaw ? JSON.parse(classRaw).name : "—";
  // مدرسه‌ی همین دانش‌آموز — برای اینکه اطلاعیه‌های «مدیر» فقط از مدیرِ
  // همین مدرسه دیده بشه، نه اطلاعیه‌ی مدیرِ یک مدرسه‌ی دیگه (وقتی چند
  // مدرسه روی یک نمونه فعالن).
  const studentSchoolId = await teacherSchoolId(kv, activeRoster.teacher_id, null);

  let myAnswers, exams, myMessages;
  let usedD1 = false;
  if (db) {
    try {
      const fullname = (activeRoster.fullname || "").trim();
      const [studentRows, examRows, messageRows] = await Promise.all([
        db.prepare("SELECT id FROM students WHERE teacher_id = ? AND fullname = ?").bind(activeRoster.teacher_id, fullname).all(),
        db.prepare("SELECT data FROM exams WHERE teacher_id = ?").bind(activeRoster.teacher_id).all(),
        db.prepare("SELECT data FROM messages WHERE teacher_id = ? OR (teacher_id = 'admin' AND json_extract(data, '$.school_id') = ?)")
          .bind(activeRoster.teacher_id, studentSchoolId).all(),
      ]);
      const myStudentIds = studentRows.results.map((r) => r.id);
      let answerRows = { results: [] };
      if (myStudentIds.length > 0) {
        const placeholders = myStudentIds.map(() => "?").join(",");
        answerRows = await db.prepare(`SELECT data FROM answers WHERE student_id IN (${placeholders})`).bind(...myStudentIds).all();
      }
      myAnswers = answerRows.results.map((r) => JSON.parse(r.data));
      exams = examRows.results.map((r) => JSON.parse(r.data));
      myMessages = messageRows.results.map((r) => JSON.parse(r.data));
      usedD1 = true;
    } catch (err) {
      console.error("handleStudentLookup D1 path failed, falling back to KV:", err);
    }
  }

  if (!usedD1) {
    // نسخه‌ی جایگزین با KV — فقط وقتی D1 هنوز migrate/bind نشده یا کوئری خطا داد
    const [studentKeys, examKeys, answersKeys, messageKeys] = await Promise.all([
      kv.list({ prefix: "student:" }), kv.list({ prefix: "exam:" }),
      kv.list({ prefix: "answers:" }), kv.list({ prefix: "message:" }),
    ]);
    const students = (await Promise.all(studentKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
    const myStudentIds = students
      .filter((s) => s.teacher_id === activeRoster.teacher_id && (s.fullname || "").trim() === (activeRoster.fullname || "").trim())
      .map((s) => s.id);
    const answerBatches = (await Promise.all(answersKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
    myAnswers = answerBatches.flat().filter((a) => a && myStudentIds.includes(a.student_id));
    exams = (await Promise.all(examKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
    const messages = (await Promise.all(messageKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
    myMessages = messages.filter((m) => m.teacher_id === activeRoster.teacher_id
      || (m.sender === "admin" && m.school_id === studentSchoolId));
  }

  const byExam = {};
  myAnswers.forEach((a) => { (byExam[a.exam_id] = byExam[a.exam_id] || []).push(a); });
  const results = Object.entries(byExam).map(([examId, list]) => {
    const exam = exams.find((e) => e.id === examId);
    const totalMarks = list.reduce((s, a) => s + (a.mark || 1), 0);
    const gotMarks = list.reduce((s, a) => s + (a.awarded_mark != null ? a.awarded_mark : (a.is_correct ? a.mark : 0)), 0);
    const pendingCount = list.filter((a) => a.is_correct === null && a.awarded_mark == null).length;
    const pct = totalMarks ? Math.round((gotMarks / totalMarks) * 1000) / 10 : 0;
    const date = list[0]?.answered_at || null;
    return { examId, title: exam?.title || "—", pct, pendingCount, date };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  myMessages = myMessages.filter((m) => {
    if (m.sender === "admin") {
      if (m.audience === "students") return true;
      if (m.audience === "class" && m.target_id === activeRoster.class_id) return true;
      if (m.audience === "student" && m.target_id === activeRoster.id) return true;
      return false;
    }
    return m.teacher_id === activeRoster.teacher_id &&
      (m.target_type === "all" || (m.target_type === "class" && m.target_id === activeRoster.class_id) || (m.target_type === "student" && m.target_id === activeRoster.id));
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  let teacherName = "معلم";
  const teacherRaw = await kv.get(`teacher:${activeRoster.teacher_id}`);
  if (teacherRaw) teacherName = JSON.parse(teacherRaw).fullname || teacherName;

  return json({
    found: true,
    roster: { fullname: activeRoster.fullname, id: activeRoster.id, class_id: activeRoster.class_id },
    className, results, messages: myMessages, teacherName,
  });
}
// برخلاف /api/kv و /api/list (که هر کلیدی رو خام برمی‌گردونن)، این اندپوینت
// مخصوص لینک آزمون دانش‌آموزه: فقط داده‌ی لازم برای همون آزمون رو برمی‌گردونه
// و فیلدهای پاسخ صحیح (correct_answer / correct_answers) رو قبل از ارسال حذف می‌کنه.
// v72: پیشرفت دوره‌ای رو (به‌جای نوشتن مستقیم روی D1) به Durable Object
// همون examId می‌فرسته — نوشتن روی D1 اونجا بافر و batch می‌شه.
// v76.1: کلید ذخیره‌ی هر دانش‌آموز داخل بافر Durable Object (و examdrafts)
// قبلاً خودِ studentName بود — یعنی دو دانش‌آموز واقعاً هم‌نام (اتفاق رایج)
// می‌تونستن پیشرفت همدیگه رو overwrite کنن. حالا وقتی ورود با کد شخصی بوده
// (roster_id داریم، مورد رایج/حساس‌تر)، از اون استفاده می‌شه که یکتاست؛
// برای ورود با نام هنوز هویت بهتری از خودِ نام نداریم (محدودیت ذاتیِ اون
// حالت، نه چیزی که این تغییر معرفی کرده).
function draftBufferKey(attempt) {
  return attempt.roster_id ? `r:${attempt.roster_id}` : `n:${attempt.student_name}`;
}

async function handleDraftSave(request, env) {
  if (!env.EXAM_ROOM) return json({ error: "Durable Object binding (EXAM_ROOM) در wrangler.toml نیست" }, 500);
  const body = await request.json().catch(() => null);
  if (!body || !body.examId || !body.studentName) return json({ error: "اطلاعات ناقص" }, 400);
  // v76: قبلاً فقط examId+studentName لازم بود — یعنی کسی می‌تونست draft
  // یک دانش‌آموز دیگه رو overwrite کنه. حالا token همون examId+نامی که
  // موقع ورود تأیید شده رو باید تأیید کنه.
  const attempt = await verifyAttemptToken(body.token, env);
  if (!attempt || attempt.exam_id !== body.examId || attempt.student_name !== body.studentName) {
    return json({ error: "نشست شرکت در آزمون معتبر نیست" }, 403);
  }
  const forwardBody = { ...body, bufferKey: draftBufferKey(attempt) };
  const id = env.EXAM_ROOM.idFromName(body.examId);
  const stub = env.EXAM_ROOM.get(id);
  return stub.fetch("https://exam-room/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(forwardBody) });
}

// v72: برای وقتی دانش‌آموز از یه دستگاه دیگه دوباره وارد می‌شه — آخرین
// بسته‌ی فلاش‌شده‌ی این آزمون رو از D1 می‌خونه (فقط یک ردیف، ارزون) و
// فقط سهم همون دانش‌آموز رو برمی‌گردونه. ممکنه چند دقیقه قدیمی‌تر از
// آخرین جواب واقعیش باشه (بین دو فلاش) — این جزو همون تعادل شناخته‌شده‌ست.
async function handleExamDraftRead(request, env) {
  const db = getDB(env);
  if (!db) return json({ data: null });
  const url = new URL(request.url);
  const examId = url.searchParams.get("examId");
  const studentName = url.searchParams.get("name") || "";
  if (!examId) return json({ error: "examId لازم است" }, 400);
  // v76: این‌جا هم قبلاً هرکسی examId+اسم رو می‌دونست می‌تونست جواب‌های
  // در-حال-تایپ یک دانش‌آموز دیگه رو بخونه؛ حالا هم به token نیاز داره.
  const attempt = await verifyAttemptToken(url.searchParams.get("token"), env);
  if (!attempt || attempt.exam_id !== examId || attempt.student_name !== studentName) {
    return json({ data: null });
  }
  try {
    const row = await db.prepare("SELECT data FROM examdrafts WHERE exam_id = ?").bind(examId).first();
    if (!row) return json({ data: null });
    const all = JSON.parse(row.data);
    return json({ data: all[draftBufferKey(attempt)] || null });
  } catch (err) {
    console.error("handleExamDraftRead failed:", err);
    return json({ data: null });
  }
}

// ─── v76 امنیتی: توکن کوتاه‌عمر شرکت در آزمون ───────────────────────────
// دانش‌آموزها لاگین واقعی ندارن. تا اینجا submit/آپلود عکس/draft-save فقط
// به فیلدهایی که خودِ کلاینت می‌فرستاد (student_id، student، examId+name)
// اعتماد می‌کردن — یعنی هرکسی می‌تونست دستی request بسازه و جای دانش‌آموز
// دیگه‌ای جا بزنه، یا محدودیت کلاس/کد دسترسی آزمون رو دور بزنه (چون فقط
// فرانت‌اند چکشون می‌کرد). حالا بعد از تأیید موفق (در handleExamStart) یک
// توکن امضاشده (HMAC-SHA256، بدون نیاز به ذخیره‌سازی سمت سرور) صادر می‌شه
// که این مسیرها بررسیش می‌کنن. secret از یک wrangler secret جدید به اسم
// EXAM_TOKEN_SECRET خونده می‌شه — اگه ست نشده باشه، صدور توکن (و درنتیجه
// کل مسیر شرکت در آزمون) با خطای واضح متوقف می‌شه تا کسی متوجه نشه.
function b64urlEncode(str) {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(str) {
  const pad = str.length % 4 ? "=".repeat(4 - (str.length % 4)) : "";
  return decodeURIComponent(escape(atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad)));
}
async function hmacSignB64url(secret, message) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function signAttemptToken(payload, env) {
  if (!env.EXAM_TOKEN_SECRET) return null;
  const body = b64urlEncode(JSON.stringify(payload));
  const sig = await hmacSignB64url(env.EXAM_TOKEN_SECRET, body);
  return `${body}.${sig}`;
}
async function verifyAttemptToken(token, env) {
  if (!env.EXAM_TOKEN_SECRET || !token || typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  const expectedSig = await hmacSignB64url(env.EXAM_TOKEN_SECRET, body);
  if (expectedSig.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < expectedSig.length; i++) diff |= expectedSig.charCodeAt(i) ^ sig.charCodeAt(i);
  if (diff !== 0) return null;
  try {
    const payload = JSON.parse(b64urlDecode(body));
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

// جلوی brute-force حدس زدن کد شخصی دانش‌آموز رو با تلاش‌های زیاد از یک IP
// می‌گیره (همون الگوی checkChatRateLimit بالاتر، فقط کلید بر اساس IP).
const CODE_CHECK_RATE_LIMIT_MAX = 20;
const CODE_CHECK_RATE_LIMIT_WINDOW_SECONDS = 60;
async function checkCodeVerifyRateLimit(kv, ip) {
  const key = `codeverifyrate:${ip || "unknown"}`;
  const raw = await kv.get(key);
  const rec = raw ? JSON.parse(raw) : { count: 0 };
  if (rec.count >= CODE_CHECK_RATE_LIMIT_MAX) return false;
  rec.count += 1;
  await kv.put(key, JSON.stringify(rec), { expirationTtl: CODE_CHECK_RATE_LIMIT_WINDOW_SECONDS });
  return true;
}

// همون منطق scopeClasses داخل handleExamSession، جدا شده تا هم اونجا هم
// verify-code/exam-start بتونن ازش استفاده کنن — کلاس‌های مجاز مدرسه/معلمِ
// همین آزمون رو برمی‌گردونه (بدون فیلتر آرایه‌ای teacher_ids، که همون‌جا
// روی نتیجه اعمال می‌شه).
async function getScopedClassesForExam(env, exam, examSchoolId) {
  const kv = getKV(env);
  const db = getDB(env);
  const scopeClasses = (allClasses) => {
    if (examSchoolId) return allClasses.filter((c) => c.school_id === examSchoolId);
    return allClasses.filter((c) => !c.school_id && classTeacherIds(c).includes(exam.teacher_id));
  };
  if (db) {
    try {
      const classRows = examSchoolId
        ? await db.prepare("SELECT data FROM classes WHERE school_id = ?").bind(examSchoolId).all()
        : await db.prepare("SELECT data FROM classes WHERE school_id IS NULL").all();
      return scopeClasses(classRows.results.map((r) => JSON.parse(r.data)));
    } catch (err) {
      console.error("getScopedClassesForExam D1 path failed, falling back to KV:", err);
    }
  }
  const classKeys = await kv.list({ prefix: "class:" });
  const allClasses = (await Promise.all(classKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
  return scopeClasses(allClasses);
}

// یک کد شخصیِ واردشده رو فقط در محدوده‌ی کلاس‌های همین مدرسه/معلم پیدا
// می‌کنه (نه کل KV/D1) — دقیقاً همون scoping که handleExamSession قبلاً
// روی کل roster اعمال می‌کرد، اما این‌بار به‌جای برگردوندن کل roster به
// کلاینت، فقط یک رکورد (اگه کد درست باشه) سمت سرور مصرف می‌شه.
async function findRosterForExamCode(env, exam, examSchoolId, code) {
  const kv = getKV(env);
  const db = getDB(env);
  const classes = await getScopedClassesForExam(env, exam, examSchoolId);
  const classIds = new Set(classes.map((c) => c.id));
  let roster = null;
  if (db) {
    try {
      const row = await db.prepare("SELECT data FROM roster WHERE code = ?").bind(code).first();
      if (row) {
        const r = JSON.parse(row.data);
        if (classIds.has(r.class_id)) roster = r;
      }
    } catch (err) {
      console.error("findRosterForExamCode D1 path failed, falling back to KV:", err);
    }
  }
  if (!roster) {
    const rosterKeys = await kv.list({ prefix: "roster:" });
    const allRoster = (await Promise.all(rosterKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
    roster = allRoster.find((r) => r.code === code && classIds.has(r.class_id)) || null;
  }
  if (!roster) return { roster: null, cls: null };
  return { roster, cls: classes.find((c) => c.id === roster.class_id) || null };
}

// بازخورد آنی هنگام تایپ کد («خوش آمدی، NAME») — بدون توکن، فقط نام/نام
// کلاس/عدم‌تطابق کلاس رو برمی‌گردونه، rate-limit شده روی IP تا حدس‌زدن
// دسته‌ای کدها عملی نباشه.
async function handleExamVerifyCode(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const url = new URL(request.url);
  const examId = url.searchParams.get("examId");
  const code = (url.searchParams.get("code") || "").trim();
  if (!examId || !code) return json({ ok: false });
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (!(await checkCodeVerifyRateLimit(kv, ip))) return json({ ok: false, rateLimited: true }, 429);

  const examRaw = await kv.get(`exam:${examId}`);
  if (!examRaw) return json({ ok: false });
  const exam = JSON.parse(examRaw);
  const teacherRaw = await kv.get(`teacher:${exam.teacher_id}`);
  const teacherRecord = teacherRaw ? JSON.parse(teacherRaw) : null;
  const examSchoolId = teacherRecord?.school_id || null;

  const { roster, cls } = await findRosterForExamCode(env, exam, examSchoolId, code);
  if (!roster) return json({ ok: false });
  const allowedClassIds = exam.restrict_class_ids || (exam.restrict_class_id ? [exam.restrict_class_id] : []);
  const mismatch = allowedClassIds.length > 0 && !allowedClassIds.includes(roster.class_id);
  return json({ ok: true, fullname: roster.fullname, className: cls?.name || "", mismatch });
}

// نقطه‌ی واقعیِ «ورود» به آزمون — همه‌ی چیزهایی که قبلاً فقط فرانت‌اند
// چک می‌کرد (کد دسترسی آزمون، تطابق کد شخصی با کلاس مجاز) اینجا دوباره
// سمت سرور enforce می‌شه، و در صورت موفقیت یک attempt token صادر می‌شه که
// submit/آپلود عکس/draft-save بهش نیاز دارن.
async function handleExamStart(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const body = await request.json().catch(() => null);
  if (!body || !body.examId) return json({ error: "اطلاعات ناقص" }, 400);
  const { examId, entryMode } = body;
  const code = (body.code || "").trim();
  const studentName = (body.studentName || "").trim();
  const accessCode = (body.accessCode || "").trim();

  const examRaw = await kv.get(`exam:${examId}`);
  if (!examRaw) return json({ error: "آزمون پیدا نشد" }, 404);
  const exam = JSON.parse(examRaw);

  const now = new Date();
  if (exam.opens_at && now < new Date(exam.opens_at)) {
    return json({ error: `این آزمون هنوز باز نشده. زمان شروع: ${new Date(exam.opens_at).toLocaleString("fa-IR")}` }, 403);
  }
  if (exam.closes_at && now > new Date(exam.closes_at)) {
    return json({ error: `مهلت شرکت در این آزمون به پایان رسیده. زمان پایان: ${new Date(exam.closes_at).toLocaleString("fa-IR")}` }, 403);
  }
  if (exam.access_code && accessCode !== exam.access_code) {
    return json({ error: "کد دسترسی اشتباه است." }, 403);
  }

  const teacherRaw = await kv.get(`teacher:${exam.teacher_id}`);
  const teacherRecord = teacherRaw ? JSON.parse(teacherRaw) : null;
  const examSchoolId = teacherRecord?.school_id || null;
  if (!teacherRecord || !(await accountAndSchoolActive(kv, exam.teacher_id))) {
    return json({ error: "این آزمون در حال حاضر در دسترس نیست" }, 403);
  }

  let resolvedName, rosterId = null, className = "";
  if (entryMode === "code") {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (!(await checkCodeVerifyRateLimit(kv, ip))) return json({ error: "تعداد تلاش زیاد بود، کمی بعد دوباره امتحان کن" }, 429);
    if (!code) return json({ error: "کد وارد نشده" }, 400);
    const { roster, cls } = await findRosterForExamCode(env, exam, examSchoolId, code);
    if (!roster) return json({ error: "کد وارد شده معتبر نیست." }, 404);
    const allowedClassIds = exam.restrict_class_ids || (exam.restrict_class_id ? [exam.restrict_class_id] : []);
    if (allowedClassIds.length > 0 && !allowedClassIds.includes(roster.class_id)) {
      return json({ error: "این کد متعلق به کلاس دیگری است و اجازه‌ی شرکت در این آزمون را ندارد." }, 403);
    }
    resolvedName = roster.fullname;
    rosterId = roster.id;
    className = cls?.name || "";
  } else {
    if (!studentName) return json({ error: "نام وارد نشده" }, 400);
    resolvedName = studentName;
  }

  const durationMs = (exam.duration_minutes ? exam.duration_minutes * 60 * 1000 : 60 * 60 * 1000);
  let exp = Date.now() + durationMs + 3 * 60 * 60 * 1000; // ۳ ساعت بافر برای ورود مجدد/تأخیر
  // v76.1: اگه آزمون closes_at داره، توکن نباید ازش فراتر بره (به‌علاوه یه
  // بازه‌ی کوتاه برای ارسال نهایی) — وگرنه دانش‌آموزی که درست قبل از پایان
  // مهلت شروع کرده می‌تونست ساعت‌ها بعد از closes_at هم submit کنه.
  if (exam.closes_at) {
    exp = Math.min(exp, new Date(exam.closes_at).getTime() + 10 * 60 * 1000);
  }
  const token = await signAttemptToken({ exam_id: examId, roster_id: rosterId, student_name: resolvedName, exp }, env);
  if (!token) {
    return json({ error: "EXAM_TOKEN_SECRET روی سرور تنظیم نشده — این یک wrangler secret جدید است که باید یک‌بار ست شود." }, 500);
  }
  return json({ ok: true, token, studentName: resolvedName, className, rosterId });
}

async function handleExamSession(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const url = new URL(request.url);
  const examId = url.searchParams.get("examId");
  if (!examId) return json({ error: "examId required" }, 400);
  const studentName = (url.searchParams.get("name") || "").trim();
  const rosterIdParam = url.searchParams.get("rosterId") || "";

  const examRaw = await kv.get(`exam:${examId}`);
  if (!examRaw) return json({ error: "exam not found" }, 404);
  const exam = JSON.parse(examRaw);

  const now = new Date();
  if (exam.opens_at && now < new Date(exam.opens_at)) {
    return json({ error: `این آزمون هنوز باز نشده. زمان شروع: ${new Date(exam.opens_at).toLocaleString("fa-IR")}` }, 403);
  }
  if (exam.closes_at && now > new Date(exam.closes_at)) {
    return json({ error: `مهلت شرکت در این آزمون به پایان رسیده. زمان پایان: ${new Date(exam.closes_at).toLocaleString("fa-IR")}` }, 403);
  }

  const teacherRaw = await kv.get(`teacher:${exam.teacher_id}`);
  const teacherRecord = teacherRaw ? JSON.parse(teacherRaw) : null;
  const examSchoolId = teacherRecord?.school_id || null;
  if (!teacherRecord || !(await accountAndSchoolActive(kv, exam.teacher_id))) {
    return json({ error: "این آزمون در حال حاضر در دسترس نیست" }, 403);
  }
  const examWithExtras = {
    ...exam,
    finish_messages: Array.isArray(teacherRecord?.finish_messages) ? teacherRecord.finish_messages : [],
  };

  // اگه این آزمون «بانک سؤال تصادفی» فعال داره: قبل از این‌که اسم
  // دانش‌آموز معلوم بشه، هیچ سؤالی برنمی‌گردونیم (تا کل بانک از طریق
  // network tab لو نره)؛ وقتی اسم اومد، یک زیرمجموعه‌ی قطعی (نه واقعاً
  // تصادفیِ هر بار) براساس همون اسم انتخاب می‌شه.
  const applyRandomPool = (questions) => {
    if (!exam.random_pool_count || exam.random_pool_count <= 0) return questions;
    if (!studentName) return [];
    // v76.1: تا اینجا seed فقط بر اساس اسم بود — دو دانش‌آموز هم‌نام (رایج،
    // چون این فقط یک رشته‌ی آزادِ تایپ‌شده‌ست) دقیقاً همون زیرمجموعه سؤال
    // رو می‌گرفتن. وقتی ورود با کد شخصی بوده (rosterId داریم)، حالا seed
    // رو با rosterId (یکتا) عوض می‌کنیم؛ برای ورود با نام همچنان جایگزین
    // بهتری نداریم (خودِ نام تنها هویتیه که وجود داره).
    return seededSelectQuestions(questions, `${examId}:${rosterIdParam || studentName}`, exam.random_pool_count);
  };

  // توجه: کلاس و لیست دانش‌آموزها حالا بین چند معلمِ یک مدرسه مشترک می‌شن،
  // پس دیگه نمی‌شه فقط با teacher_id سازنده‌ی امتحان فیلتر کرد — باید کل
  // کلاس‌ها/دانش‌آموزهای همون مدرسه رو در نظر گرفت. برای معلم مستقل
  // (بدون مدرسه) هم، کلاس‌هایی که فقط خودش عضوشونه در نظر گرفته می‌شه.
  // روی رکورد roster همیشه school_id ذخیره نمی‌شه (مثلاً وقتی خودِ معلم از
  // صفحه‌ی کلاسش دانش‌آموز اضافه می‌کنه)، پس roster رو از طریق class_id به
  // همون مجموعه‌ی کلاس‌ها اسکوپ می‌کنیم، نه یک فیلد school_id مستقیم روش.
  const scopeClasses = (allClasses) => {
    if (examSchoolId) return allClasses.filter((c) => c.school_id === examSchoolId);
    return allClasses.filter((c) => !c.school_id && classTeacherIds(c).includes(exam.teacher_id));
  };
  const db = getDB(env);
  if (db) {
    try {
      const [qRows, classRows] = await Promise.all([
        db.prepare("SELECT data FROM questions WHERE exam_id = ?").bind(examId).all(),
        // مدرسه‌دار: فقط کلاس‌های همون مدرسه. معلم مستقل: فقط کلاس‌های بدون
        // مدرسه (عضویت دقیق آرایه‌ای هنوز با scopeClasses در جاوااسکریپت
        // چک می‌شه، چون class.teacher_ids یک آرایه‌ی داخل data ست، نه ستون).
        examSchoolId
          ? db.prepare("SELECT data FROM classes WHERE school_id = ?").bind(examSchoolId).all()
          : db.prepare("SELECT data FROM classes WHERE school_id IS NULL").all(),
      ]);
      let questions = qRows.results
        .map((r) => JSON.parse(r.data))
        .map(({ correct_answer, correct_answers, ...safe }) => safe); // حذف پاسخ صحیح
      questions = applyRandomPool(questions);
      const classes = scopeClasses(classRows.results.map((r) => JSON.parse(r.data)));
      // v76: دیگه roster (که شامل کد شخصی دانش‌آموزهاست) اینجا برنمی‌گرده —
      // قبلاً هر کسی که examId رو می‌دونست می‌تونست کل کدهای دانش‌آموزها رو
      // از این endpoint بگیره. تطبیق کد حالا سمت سرور، در handleExamStart/
      // handleExamVerifyCode انجام می‌شه.
      return json({ exam: examWithExtras, questions, classes });
    } catch (err) {
      console.error("handleExamSession D1 path failed, falling back to KV:", err);
    }
  }

  // نسخه‌ی جایگزین با KV — فقط وقتی D1 هنوز migrate/بند نشده یا کوئری خطا داد
  const [qKeys, classKeys] = await Promise.all([
    kv.list({ prefix: "question:" }),
    kv.list({ prefix: "class:" }),
  ]);

  const allQuestions = (await Promise.all(qKeys.keys.map((k) => kv.get(k.name))))
    .filter(Boolean).map((r) => JSON.parse(r));
  let questions = allQuestions
    .filter((q) => q.exam_id === examId)
    .map(({ correct_answer, correct_answers, ...safe }) => safe); // حذف پاسخ صحیح
  questions = applyRandomPool(questions);

  const allClasses = (await Promise.all(classKeys.keys.map((k) => kv.get(k.name))))
    .filter(Boolean).map((r) => JSON.parse(r));
  const classes = scopeClasses(allClasses);

  return json({ exam: examWithExtras, questions, classes });
}

// ذخیره‌ی نهایی پاسخ‌ها — نمره‌دهی سؤالات تستی همیشه سمت سرور محاسبه می‌شه،
// نه با اعتماد به مقادیر is_correct/awarded_mark ارسالی از کلاینت.
// عکس پاسخ دست‌نویس (برای سؤالات تشریحی) — این یه اندپوینت عمومیه چون
// دانش‌آموز حین امتحان لاگین نیست. عکس (بعد از فشرده‌سازی سمت مرورگر)
// مستقیم توی D1 (نه R2 — چون R2 نیاز به روش پرداخت داره) ذخیره می‌شه.
// چون فضای D1 برخلاف سهمیه‌ی روزانه‌ی خواندن/نوشتن، «تجمعی و همیشگی»
// است، این عکس‌ها خودکار بعد از ۲ روز پاک می‌شن (نگاه کن به
// handleScheduledCleanup) تا فضا پر نشه؛ معلم باید ظرف همون بازه تصحیح کنه.
const MAX_PHOTO_BYTES = 700 * 1024; // ~700KB بعد از فشرده‌سازی سمت مرورگر
async function handleUploadAnswerPhoto(request, env) {
  const db = getDB(env);
  if (!db) return json({ error: "آپلود عکس روی این سرور فعال نیست (D1 bind نشده)" }, 500);
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);

  const url = new URL(request.url);
  const examId = url.searchParams.get("examId");
  if (!examId) return json({ error: "examId لازم است" }, 400);
  // v76: قبلاً این endpoint هیچ احرازی نداشت — هرکسی که examId رو می‌دونست
  // می‌تونست عکس آپلود کنه (storage spam). حالا همون attempt token لازم
  // است که موقع ورود به آزمون صادر شده.
  const attempt = await verifyAttemptToken(url.searchParams.get("token"), env);
  if (!attempt || attempt.exam_id !== examId) {
    return json({ error: "نشست شرکت در آزمون معتبر نیست" }, 403);
  }
  const examRaw = await kv.get(`exam:${examId}`);
  if (!examRaw) return json({ error: "آزمون پیدا نشد" }, 404);

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.startsWith("image/")) return json({ error: "فقط فایل تصویر مجاز است" }, 400);
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_PHOTO_BYTES) return json({ error: "حجم عکس زیاد است، دوباره امتحان کن" }, 400);

  const bytes = await request.arrayBuffer();
  if (bytes.byteLength > MAX_PHOTO_BYTES) return json({ error: "حجم عکس زیاد است، دوباره امتحان کن" }, 400);

  const key = `${examId}/${uid()}`;
  // ذخیره‌ی باینری به‌صورت base64 در ستون متنی (D1 ستون BLOB اختصاصی نداره)
  let binary = "";
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]);
  const b64 = btoa(binary);
  try {
    await db.prepare(
      "INSERT INTO answer_photos (key, exam_id, content_type, data_b64, created_at) VALUES (?, ?, ?, ?, ?)"
    ).bind(key, examId, contentType, b64, new Date().toISOString()).run();
  } catch (err) {
    console.error("handleUploadAnswerPhoto D1 insert failed:", err);
    return json({ error: "ذخیره‌ی عکس ناموفق بود" }, 500);
  }
  return json({ ok: true, key });
}

// فقط معلمِ صاحب همون آزمون (یا ادمین) اجازه‌ی دیدن عکس پاسخ رو داره.
async function handleGetAnswerPhoto(request, env) {
  const db = getDB(env);
  if (!db) return json({ error: "D1 binding missing" }, 500);
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "نیاز به ورود دارید" }, 401);

  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "";
  // کلید همیشه به شکل <examId>/<uid> ساخته می‌شه
  const m = key.match(/^([^/]+)\/[^/]+$/);
  if (!m) return json({ error: "کلید نامعتبر است" }, 400);
  const examId = m[1];
  const examRaw = await kv.get(`exam:${examId}`);
  if (!examRaw) return json({ error: "آزمون پیدا نشد" }, 404);
  const exam = JSON.parse(examRaw);
  const allowed = session.role === "super_admin"
    || session.username === exam.teacher_id
    || (session.role === "admin" && session.school_id && await teacherSchoolId(kv, exam.teacher_id, null) === session.school_id);
  if (!allowed) {
    return json({ error: "دسترسی غیرمجاز" }, 403);
  }

  const row = await db.prepare("SELECT content_type, data_b64 FROM answer_photos WHERE key = ?").bind(key).first();
  if (!row) return json({ error: "عکس پیدا نشد (شاید بیش از ۲ روز از آپلودش گذشته و خودکار پاک شده)" }, 404);
  const binary = atob(row.data_b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Response(bytes, {
    headers: { "Content-Type": row.content_type || "image/jpeg", "Cache-Control": "private, max-age=3600" },
  });
}

// هر روز یک‌بار (طبق Cron Trigger در wrangler.toml) اجرا می‌شه و عکس‌های
// قدیمی‌تر از ۲ روز رو پاک می‌کنه تا فضای D1 (که برخلاف سهمیه‌ی روزانه‌ی
// خواندن/نوشتن، سقفش تجمعی و همیشگیه) پر نشه.
async function handleScheduledCleanup(env) {
  const db = getDB(env);
  if (!db) return;
  const cutoff = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  try {
    await db.prepare("DELETE FROM answer_photos WHERE created_at < ?").bind(cutoff).run();
  } catch (err) {
    console.error("handleScheduledCleanup failed:", err);
  }
}

// ==========================================
// عکس پروفایل (معلم / مدیر مدرسه / مدیر کل)
// برخلاف عکس پاسخ دانش‌آموز، اینا خودکار پاک نمی‌شن — هر کاربر فقط عکس
// خودش رو می‌تونه آپلود/حذف کنه، ولی همکاران هم‌مدرسه‌ای (و مدیر کل)
// اجازه‌ی دیدنش رو دارن.
// ==========================================
const MAX_AVATAR_BYTES = 300 * 1024; // ~300KB بعد از فشرده‌سازی سمت مرورگر

async function handleUploadProfilePhoto(request, env) {
  const db = getDB(env);
  if (!db) return json({ error: "آپلود عکس روی این سرور فعال نیست (D1 bind نشده)" }, 500);
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "نیاز به ورود دارید" }, 401);

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.startsWith("image/")) return json({ error: "فقط فایل تصویر مجاز است" }, 400);
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_AVATAR_BYTES) return json({ error: "حجم عکس زیاد است، دوباره امتحان کن" }, 400);

  const bytes = await request.arrayBuffer();
  if (bytes.byteLength > MAX_AVATAR_BYTES) return json({ error: "حجم عکس زیاد است، دوباره امتحان کن" }, 400);

  let binary = "";
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]);
  const b64 = btoa(binary);
  const updatedAt = new Date().toISOString();
  try {
    await db.prepare(
      "INSERT INTO profile_photos (username, content_type, data_b64, updated_at) VALUES (?, ?, ?, ?) " +
      "ON CONFLICT(username) DO UPDATE SET content_type = excluded.content_type, data_b64 = excluded.data_b64, updated_at = excluded.updated_at"
    ).bind(session.username, contentType, b64, updatedAt).run();
  } catch (err) {
    console.error("handleUploadProfilePhoto D1 upsert failed:", err);
    return json({ error: "ذخیره‌ی عکس ناموفق بود" }, 500);
  }

  // teacher:<username> رو هم به‌روز می‌کنیم تا فرانت‌اند بدونه عکس داره و
  // کی آخرین‌بار عوض شده (برای cache-busting)
  const teacherRaw = await kv.get(`teacher:${session.username}`);
  if (teacherRaw) {
    const t = JSON.parse(teacherRaw);
    t.avatar_updated_at = updatedAt;
    await kv.put(`teacher:${session.username}`, JSON.stringify(t));
    await syncToD1(env, `teacher:${session.username}`, t);
  }

  return json({ ok: true, updated_at: updatedAt });
}

async function handleGetProfilePhoto(request, env) {
  const db = getDB(env);
  if (!db) return json({ error: "D1 binding missing" }, 500);
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "نیاز به ورود دارید" }, 401);

  const url = new URL(request.url);
  const username = url.searchParams.get("username") || "";
  if (!username) return json({ error: "username لازم است" }, 400);

  const allowed = session.username === username
    || session.role === "super_admin"
    || (session.school_id && await teacherSchoolId(kv, username, null) === session.school_id);
  if (!allowed) return json({ error: "دسترسی غیرمجاز" }, 403);

  const row = await db.prepare("SELECT content_type, data_b64 FROM profile_photos WHERE username = ?").bind(username).first();
  if (!row) return json({ error: "عکسی ثبت نشده" }, 404);
  const binary = atob(row.data_b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Response(bytes, {
    headers: { "Content-Type": row.content_type || "image/jpeg", "Cache-Control": "private, max-age=3600" },
  });
}

async function handleDeleteProfilePhoto(request, env) {
  const db = getDB(env);
  if (!db) return json({ error: "D1 binding missing" }, 500);
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const session = await getSession(request, env);
  if (!session) return json({ error: "نیاز به ورود دارید" }, 401);

  try {
    await db.prepare("DELETE FROM profile_photos WHERE username = ?").bind(session.username).run();
  } catch (err) {
    console.error("handleDeleteProfilePhoto D1 delete failed:", err);
  }
  const teacherRaw = await kv.get(`teacher:${session.username}`);
  if (teacherRaw) {
    const t = JSON.parse(teacherRaw);
    delete t.avatar_updated_at;
    await kv.put(`teacher:${session.username}`, JSON.stringify(t));
    await syncToD1(env, `teacher:${session.username}`, t);
  }
  return json({ ok: true });
}


// از همون منطق handleExamAttempted استفاده می‌کنه، با یه بهبود: اگه attempt
// یک roster_id معتبر داره (یعنی ورود با کد شخصی بوده)، اول از اون استفاده
// می‌کنیم (دقیق‌تر از تطبیق اسم)؛ برای ورود با نام، همون تطبیق قدیمیِ
// (teacher_id + fullname) به‌کار می‌ره — هویت بهتری برای اون حالت وجود نداره.
async function hasExistingAttempt(env, examId, teacherId, attempt) {
  const db = getDB(env);
  if (db) {
    try {
      const studentRows = attempt.roster_id
        ? await db.prepare("SELECT id FROM students WHERE roster_id = ?").bind(attempt.roster_id).all()
        : await db.prepare("SELECT id FROM students WHERE teacher_id = ? AND fullname = ?").bind(teacherId, attempt.student_name).all();
      const matchingIds = studentRows.results.map((r) => r.id);
      if (matchingIds.length === 0) return false;
      const placeholders = matchingIds.map(() => "?").join(",");
      const answerRow = await db.prepare(
        `SELECT 1 FROM answers WHERE exam_id = ? AND student_id IN (${placeholders}) LIMIT 1`
      ).bind(examId, ...matchingIds).first();
      return !!answerRow;
    } catch (err) {
      console.error("hasExistingAttempt D1 path failed, falling back to KV:", err);
    }
  }
  const kv = getKV(env);
  const [studentKeys, answersKeys] = await Promise.all([
    kv.list({ prefix: "student:" }), kv.list({ prefix: "answers:" }),
  ]);
  const students = (await Promise.all(studentKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
  const matchingIds = students
    .filter((s) => attempt.roster_id ? s.roster_id === attempt.roster_id : (s.teacher_id === teacherId && (s.fullname || "").trim() === attempt.student_name))
    .map((s) => s.id);
  if (matchingIds.length === 0) return false;
  const answerBatches = (await Promise.all(answersKeys.keys.map((k) => kv.get(k.name)))).filter(Boolean).map((r) => JSON.parse(r));
  return answerBatches.flat().some((a) => a && matchingIds.includes(a.student_id) && a.exam_id === examId);
}

async function handleSubmitAnswers(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const { student, exam_id, answers, cheat_alert, token } = await request.json();
  if (!exam_id || !Array.isArray(answers)) {
    return json({ error: "اطلاعات ارسالی معتبر نیست" }, 400);
  }
  // v76: دیگه به exam_id/student ارسالی از کلاینت به‌تنهایی اعتماد نمی‌کنیم —
  // باید یک attempt token معتبر (که فقط بعد از تأیید موفق در handleExamStart
  // صادر می‌شه) برای همین examId ارائه بشه؛ وگرنه هرکسی می‌تونست جای یک
  // دانش‌آموز دیگه request بسازه یا محدودیت کلاس/کد دسترسی آزمون رو دور بزنه.
  const attempt = await verifyAttemptToken(token, env);
  if (!attempt || attempt.exam_id !== exam_id) {
    return json({ error: "نشست شرکت در آزمون معتبر نیست — لطفاً دوباره وارد آزمون شو." }, 403);
  }
  // v76.1: student_id قبلاً مستقیم از کلاینت گرفته می‌شد — یعنی اگه کسی id
  // یک attempt واقعی رو حدس/پیدا می‌کرد، می‌تونست با submit دوباره اون رکورد
  // رو overwrite کنه. حالا همیشه سرور خودش یک id تازه می‌سازه؛ چون هر submit
  // یک رکورد جدیده (نه آپدیت یک هویت ثابت — پیگیری چند-تلاشی از قبل با
  // roster_id انجام می‌شه، نه با این id)، این کاملاً امنه.
  const student_id = uid();

  const examRaw = await kv.get(`exam:${exam_id}`);
  if (!examRaw) return json({ error: "exam not found" }, 404);
  const exam = JSON.parse(examRaw);
  if (!(await accountAndSchoolActive(kv, exam.teacher_id))) {
    return json({ error: "این آزمون در حال حاضر در دسترس نیست" }, 403);
  }
  // v76.1: قبلاً فقط expiry توکن (که تا ۳ ساعت بعد از duration معتبره)
  // چک می‌شد، نه closes_at خودِ آزمون — یعنی دانش‌آموزی که درست قبل از
  // مهلت شروع کرده بود می‌تونست ساعت‌ها بعدش هم submit کنه. حالا اینجا هم
  // دوباره enforce می‌شه (علاوه بر این‌که handleExamStart دیگه اصلاً همچین
  // توکنی صادر نمی‌کنه — این یک لایه‌ی دوم دفاعیه، برای وقتی مثلاً معلم
  // closes_at رو بعد از صدور توکن زودتر کرده باشه).
  if (exam.closes_at && new Date() > new Date(exam.closes_at)) {
    return json({ error: `مهلت شرکت در این آزمون به پایان رسیده. زمان پایان: ${new Date(exam.closes_at).toLocaleString("fa-IR")}` }, 403);
  }
  // v76.1: «شرکت چندباره» قبلاً فقط سمت کلاینت (با یک GET غیرالزامی به
  // exam-attempted) چک می‌شد — کسی که مستقیم به این endpoint request می‌زد
  // می‌تونست از محدودیتش رد بشه. حالا سمت سرور هم enforce می‌شه. توجه: این
  // یک چک-قبل-از-نوشتن است، نه یک قید یکتای دیتابیسی — در تئوری یک ریسِ
  // خیلی سریع (دو submit همزمان از همون attempt) هنوز ممکنه از زیرش رد بشه؛
  // برای این اپ (نه یک سیستم بانکی) این سطح از سخت‌گیری کافیه.
  if (!exam.allow_retake) {
    const already = await hasExistingAttempt(env, exam_id, exam.teacher_id, attempt);
    if (already) {
      return json({ error: "شما قبلاً در این آزمون شرکت کرده‌اید." }, 409);
    }
  }

  let allQuestions = null;
  const db = getDB(env);
  if (db) {
    try {
      const qRows = await db.prepare("SELECT data FROM questions WHERE exam_id = ?").bind(exam_id).all();
      allQuestions = qRows.results.map((r) => JSON.parse(r.data));
    } catch (err) {
      console.error("handleSubmitAnswers D1 path failed, falling back to KV:", err);
    }
  }
  if (allQuestions === null) {
    // نسخه‌ی جایگزین با KV — فقط وقتی D1 هنوز migrate/bind نشده یا کوئری خطا داد
    const qKeys = await kv.list({ prefix: "question:" });
    allQuestions = (await Promise.all(qKeys.keys.map((k) => kv.get(k.name))))
      .filter(Boolean).map((r) => JSON.parse(r)).filter((q) => q.exam_id === exam_id);
  }
  const qMap = new Map(allQuestions.map((q) => [q.id, q]));

  let correctCount = 0;
  let pendingEssays = 0;
  const graded = answers.map((a) => {
    const q = qMap.get(a.question_id);
    if (!q) return null; // سوال نامعتبر/متعلق به آزمون دیگر — نادیده گرفته می‌شود
    const base = {
      id: uid(), student_id, exam_id, question_id: q.id,
      selected_option: a.selected_option, mark: q.mark,
      time_taken: a.time_taken || null, answered_at: new Date().toISOString(),
    };
    if (q.type === "essay") {
      if (a.selected_option) pendingEssays++;
      return { ...base, is_correct: null, awarded_mark: null };
    }
    if (q.type === "mc_multi") {
      const selArr = Array.isArray(a.selected_option) ? [...a.selected_option].sort()
        : String(a.selected_option || "").split(",").filter(Boolean).sort();
      const correctArr = [...(q.correct_answers || [])].sort();
      const isCorrect = selArr.length > 0 && selArr.length === correctArr.length && selArr.every((v, i) => v === correctArr[i]);
      if (isCorrect) correctCount++;
      return { ...base, selected_option: selArr.join(","), is_correct: isCorrect };
    }
    const isCorrect = a.selected_option === q.correct_answer;
    if (isCorrect) correctCount++;
    return { ...base, is_correct: isCorrect };
  }).filter(Boolean);

  if (student) {
    // v76: fullname/roster_id رو از خودِ token (که سرور موقع verify کد
    // شخصی صادر کرده) می‌گیریم، نه از فیلدهای دلخواه کلاینت — وگرنه یک
    // دانش‌آموز با کد معتبر خودش می‌تونست جای یک نفر دیگه جا بزنه.
    const studentRecord = { ...student, id: student_id, fullname: attempt.student_name, roster_id: attempt.roster_id || null };
    const studentD1 = await syncToD1(env, `student:${student_id}`, studentRecord);
    if (!studentD1.ok) await kv.put(`student:${student_id}`, JSON.stringify(studentRecord)); // فقط وقتی D1 هنوز bind/migrate نشده
  }
  const answersD1 = await syncToD1(env, `answers:${student_id}`, graded);
  if (!answersD1.ok) await kv.put(`answers:${student_id}`, JSON.stringify(graded));
  if (cheat_alert && cheat_alert.id) {
    const alertRecord = { ...cheat_alert, exam_id, seen: false };
    const alertD1 = await syncToD1(env, `cheatalert:${cheat_alert.id}`, alertRecord);
    if (!alertD1.ok) await kv.put(`cheatalert:${cheat_alert.id}`, JSON.stringify(alertRecord));
  }

  const totalQuestions = graded.length;
  const totalMarks = graded.reduce((s, a) => s + (qMap.get(a.question_id)?.mark || 0), 0);
  const gotMarks = graded.reduce((s, a) => s + (a.is_correct ? a.mark : 0), 0);
  const pct = totalMarks ? Math.round((gotMarks / totalMarks) * 1000) / 10 : 0;

  return json({
    ok: true,
    correctCount, total: totalQuestions, pct, pendingEssays,
    // پاسخ‌های صحیح فقط وقتی برگردونده می‌شن که خود معلم گزینه‌ی «نمایش پاسخ‌ها» رو فعال کرده باشه
    reveal: exam.show_answers ? graded.map((a) => ({ ...a, correct_answer: qMap.get(a.question_id)?.correct_answer, correct_answers: qMap.get(a.question_id)?.correct_answers })) : null,
  });
}



// ==========================================
// Hub Proxy — ورود امن از اتاق کنترل مرکزی (هاب)، بدون نیاز به رمز عبور.
// هاب با یک کلید مخفی مشترک (HUB_SECRET، در Settings این Worker به‌عنوان
// Secret تنظیم می‌شود) درخواست می‌دهد و یک توکن یک‌بارمصرف ۶۰ثانیه‌ای
// می‌گیرد؛ فرانت‌اند همان توکن را با /api/hub/consume تاخت می‌زند و یک
// session واقعی super_admin (دقیقاً مثل لاگین عادی) دریافت می‌کند.
// ==========================================
async function handleHubProxy(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!env.HUB_SECRET || !token || token !== env.HUB_SECRET) {
    return json({ error: "دسترسی مجاز نیست" }, 401);
  }
  const body = await request.json().catch(() => ({}));
  const action = body.action;

  if (action === "create_impersonation_token") {
    const db = getDB(env);
    let superAdminUsername = null;
    if (db) {
      try {
        const row = await db.prepare("SELECT username FROM teachers WHERE role = 'super_admin' LIMIT 1").first();
        if (row) superAdminUsername = row.username;
      } catch (err) {
        console.error("handleHubProxy D1 lookup failed:", err);
      }
    }
    if (!superAdminUsername) {
      const teacherKeys = await kv.list({ prefix: "teacher:" });
      for (const k of teacherKeys.keys) {
        const raw = await kv.get(k.name);
        if (!raw) continue;
        const t = JSON.parse(raw);
        if (t.role === "super_admin") { superAdminUsername = t.username; break; }
      }
    }
    if (!superAdminUsername) return json({ error: "هیچ حساب مدیر کلی روی این سرور یافت نشد" }, 404);

    const hubToken = uid() + uid() + uid();
    await kv.put(`hubtoken:${hubToken}`, JSON.stringify({ username: superAdminUsername }), { expirationTtl: 60 });
    return json({ ok: true, token: hubToken });
  }

  return json({ error: "اکشن ناشناخته: " + action }, 400);
}

async function handleHubConsume(request, env) {
  const kv = getKV(env);
  if (!kv) return json({ error: "KV binding missing" }, 500);
  const body = await request.json().catch(() => ({}));
  const hubToken = (body.token || "").trim();
  if (!hubToken) return json({ error: "توکن لازم است" }, 400);
  const raw = await kv.get(`hubtoken:${hubToken}`);
  if (!raw) return json({ error: "توکن نامعتبر یا منقضی‌شده است" }, 400);
  await kv.delete(`hubtoken:${hubToken}`); // یک‌بارمصرف

  const { username } = JSON.parse(raw);
  const teacherRaw = await kv.get(`teacher:${username}`);
  if (!teacherRaw) return json({ error: "حساب یافت نشد" }, 404);
  const teacher = JSON.parse(teacherRaw);
  if (teacher.active === false) return json({ error: "این حساب غیرفعال است" }, 403);

  const sessionToken = uid() + uid() + uid();
  await kv.put(`session:${sessionToken}`, JSON.stringify({ username: teacher.username, role: teacher.role || "teacher", school_id: teacher.school_id || null }), { expirationTtl: 60 * 60 * 24 * 30 });
  return json({ ok: true, token: sessionToken, teacher });
}

export { ExamRoom };

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleScheduledCleanup(env));
  },
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/ai/grade-essay" && request.method === "POST") return handleGradeEssay(request, env);
    if (url.pathname === "/api/ai/accept-license" && request.method === "POST") return handleAcceptAiLicense(request, env);
    if (url.pathname === "/api/ai/generate-questions" && request.method === "POST") return handleAIGenerateQuestions(request, env);
    if (url.pathname === "/api/ai/weak-topics-suggestion" && request.method === "POST") return handleWeakTopicsSuggestion(request, env);
    if (url.pathname === "/api/exam-attempted" && request.method === "GET") return handleExamAttempted(request, env);
    if (url.pathname === "/api/draft-save" && request.method === "POST") return handleDraftSave(request, env);
    if (url.pathname === "/api/exam-draft" && request.method === "GET") return handleExamDraftRead(request, env);
    if (url.pathname === "/api/admin/migrate-to-d1" && request.method === "POST") return handleMigrateToD1(request, env);
    if (url.pathname === "/api/admin/migrate-to-schools" && request.method === "POST") return handleMigrateToSchools(request, env);
    if (url.pathname === "/api/teacher-exists" && request.method === "GET") return handleTeacherExists(request, env);
    if (url.pathname === "/api/register" && request.method === "POST") return handleRegister(request, env);
    if (url.pathname === "/api/login" && request.method === "POST") return handleLogin(request, env);
    if (url.pathname === "/api/logout" && request.method === "POST") return handleLogout(request, env);
    if (url.pathname === "/api/student-lookup" && request.method === "GET") return handleStudentLookup(request, env);
    if (url.pathname === "/api/student-chat" && request.method === "GET") return handleStudentChatGet(request, env);
    if (url.pathname === "/api/student-chat-send" && request.method === "POST") return handleStudentChatSend(request, env);
    if (url.pathname === "/api/student-chat-react" && request.method === "POST") return handleStudentChatReact(request, env);
    if (url.pathname === "/api/exam-session" && request.method === "GET") return handleExamSession(request, env);
    if (url.pathname === "/api/exam-verify-code" && request.method === "GET") return handleExamVerifyCode(request, env);
    if (url.pathname === "/api/exam-start" && request.method === "POST") return handleExamStart(request, env);
    if (url.pathname === "/api/answers/submit" && request.method === "POST") return handleSubmitAnswers(request, env);
    if (url.pathname === "/api/upload-answer-photo" && request.method === "POST") return handleUploadAnswerPhoto(request, env);
    if (url.pathname === "/api/answer-photo" && request.method === "GET") return handleGetAnswerPhoto(request, env);
    if (url.pathname === "/api/upload-profile-photo" && request.method === "POST") return handleUploadProfilePhoto(request, env);
    if (url.pathname === "/api/profile-photo" && request.method === "GET") return handleGetProfilePhoto(request, env);
    if (url.pathname === "/api/profile-photo" && request.method === "DELETE") return handleDeleteProfilePhoto(request, env);
    if (url.pathname === "/api/hub/proxy" && request.method === "POST") return handleHubProxy(request, env);
    if (url.pathname === "/api/hub/consume" && request.method === "POST") return handleHubConsume(request, env);

    // مسیرهای قدیمی KV
    if (url.pathname === "/api/kv") return handleKV(request, env);
    if (url.pathname === "/api/list") return handleList(request, env);
    if (url.pathname === "/api/teacher-dashboard-data") return handleTeacherDashboardData(request, env);
    if (url.pathname === "/api/full-dashboard-data") return handleFullDashboardData(request, env);
    if (url.pathname === "/api/exam-live") return handleExamLive(request, env);
    if (url.pathname === "/api/question-bank-shared") return handleQuestionBankShared(request, env);
    if (url.pathname === "/api/forgot-password" && request.method === "POST") return handleForgotPassword(request, env);
    if (url.pathname === "/api/send-welcome-email" && request.method === "POST") return handleSendWelcomeEmail(request, env);
    if (url.pathname === "/api/reset-password" && request.method === "POST") return handleResetPassword(request, env);

    if (url.pathname.startsWith("/api/")) return json({ error: "not found" }, 404);

    return env.ASSETS.fetch(request);
  },
};
