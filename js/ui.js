/* ---------------------------------------------------------
   Shared utilities (KV helpers) + shared UI primitives
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
function omit(obj, keys) {
  const out = {};
  Object.keys(obj).forEach((k) => {
    if (keys.indexOf(k) === -1) out[k] = obj[k];
  });
  return out;
}

/* ---------------------------------------------------------
   Password hashing (SHA-256, client-side via Web Crypto).
   Stored passwords are a 64-char hex digest, never plain text.
   verifyPassword() also transparently accepts an old plain-text
   password (from accounts created before hashing was added) so
   nobody gets locked out — see comment inside.
--------------------------------------------------------- */
async function hashPassword(plain) {
  const bytes = new TextEncoder().encode(plain);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function looksHashed(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/.test(value);
}
// Returns true if `entered` matches the stored password, whether the
// stored value is already a hash (normal case) or still plain text
// (a legacy account from before this feature existed).
// NOTE: no longer called anywhere as of the server-side salted-password
// change — "current password" checks now go through a real /api/login
// round-trip instead, since the server stores a salted PBKDF2 derivative
// that can't be reproduced/compared client-side. Left in place only in
// case some other flow still needs a quick local hash comparison.
async function verifyPassword(storedPassword, entered) {
  if (looksHashed(storedPassword)) {
    return storedPassword === (await hashPassword(entered));
  }
  return storedPassword === entered; // legacy plain-text account
}

/* ---------------------------------------------------------
   Persistent login ("stay signed in across refresh").
   We store the username + the CURRENT password hash (never the
   plain password) in localStorage. On app load we look this up,
   re-fetch the teacher record, and only auto-login if the stored
   hash still matches teacher.password — so changing the password
   invalidates any stale saved sessions elsewhere automatically.
--------------------------------------------------------- */
const SESSION_KEY = "eduexam_session";
const SESSION_DAYS = 30;
function saveSession(username, passwordHash, token) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      username, passwordHash, token, expires_at: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
    }));
  } catch { /* localStorage unavailable — session just won't persist */ }
}
function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s || !s.username || !s.passwordHash || Date.now() > s.expires_at) return null;
    return s;
  } catch {
    return null;
  }
}
function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
}
// Revokes the session token on the server (so it can't be reused even if
// someone got hold of it) and then clears the local copy.
async function performLogout() {
  const token = getAuthToken();
  try {
    if (token) await fetch("/api/logout", { method: "POST", headers: authHeaders() });
  } catch { /* best-effort — clear locally regardless */ }
  clearSession();
}
// The token issued by /api/login or /api/register — sent as a Bearer header
// on every KV/list request so the server can tell who's asking (and refuse
// anyone who isn't). Without this, /api/kv and /api/list would have to be
// left open to anyone on the internet, which is exactly the hole we're closing.
function getAuthToken() {
  return loadSession()?.token || null;
}
function authHeaders(extra) {
  const token = getAuthToken();
  return { ...(extra || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

async function getJSON(key) {
  try {
    const r = await fetch(`/api/kv?key=${encodeURIComponent(key)}`, { headers: authHeaders() });
    if (r.status === 404) return null;
    if (!r.ok) return null;
    const data = await r.json();
    return data.v;
  } catch {
    return null;
  }
}

async function setJSON(key, value) {
  try {
    const r = await fetch("/api/kv", {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ k: key, v: value }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

// مثل setJSON، ولی به‌جای فقط true/false، پیام خطای واقعی سرور رو هم
// برمی‌گردونه — برای جاهایی که سرور ممکنه رد کنه و باید دلیلش به کاربر
// نشون داده بشه (مثلاً سقف تعداد کلاس، یا تداخل امتحان دو کلاس در یک روز).
async function setJSONChecked(key, value) {
  try {
    const r = await fetch("/api/kv", {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ k: key, v: value }),
    });
    if (r.ok) return { ok: true };
    const body = await r.json().catch(() => ({}));
    return { ok: false, error: body.error || "خطا در ذخیره‌سازی." };
  } catch {
    return { ok: false, error: "خطا در ارتباط با سرور." };
  }
}

// مثل setJSON، ولی مقدار نهایی‌ای که واقعاً سرور ذخیره کرده رو هم برمی‌گردونه
// — برای جاهایی که ممکنه سرور خودش یک فیلد رو تغییر بده (مثلاً یک کد ورود
// یکتا) و کلاینت باید همون مقدار واقعی رو نشون بده، نه چیزی که خودش حدس زده بود.
async function setJSONReturn(key, value) {
  try {
    const r = await fetch("/api/kv", {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ k: key, v: value }),
    });
    if (!r.ok) {
      const body = await r.json().catch(() => ({}));
      return { ok: false, error: body.error || "خطا در ذخیره‌سازی." };
    }
    const body = await r.json().catch(() => ({}));
    return { ok: true, v: body.v };
  } catch {
    return { ok: false, error: "خطا در ارتباط با سرور." };
  }
}

// همه‌ی نام‌کاربری معلم‌های یک کلاس رو برمی‌گردونه — از فیلد جدید
// teacher_ids (آرایه، چون یه کلاس می‌تونه چند معلم داشته باشه) یا، برای
// رکوردهای قدیمی‌تر، از teacher_id تکی سابق.
function classTeacherIds(cls) {
  if (!cls) return [];
  if (Array.isArray(cls.teacher_ids)) return cls.teacher_ids;
  return cls.teacher_id ? [cls.teacher_id] : [];
}

async function deleteKey(key) {
  try {
    await fetch(`/api/kv?key=${encodeURIComponent(key)}`, { method: "DELETE", headers: authHeaders() });
  } catch {
    /* ignore */
  }
}

async function listPrefix(prefix) {
  try {
    const r = await fetch(`/api/list?prefix=${encodeURIComponent(prefix)}`, { headers: authHeaders() });
    if (!r.ok) return [];
    const data = await r.json();
    return data.keys || [];
  } catch {
    return [];
  }
}

async function loadAll(prefix) {
  const keys = await listPrefix(prefix);
  const items = await Promise.all(keys.map((k) => getJSON(k)));
  return items.filter(Boolean);
}

// دانش‌آموزها/پاسخ‌ها/هشدارهای تقلب رو یک‌جا از /api/teacher-dashboard-data
// می‌گیره (نه با loadAll، چون این سه نوع دیگه فقط روی D1 نوشته می‌شن، نه
// KV — بخش «سهمیه‌ی نوشتن KV» رو ببین). پاسخ‌ها همیشه یک آرایه‌ی «تخت» از
// رکوردهای تک‌تک پاسخه، نه دسته‌بندی‌شده بر اساس دانش‌آموز.
async function loadTeacherDashboardData() {
  try {
    const r = await fetch("/api/teacher-dashboard-data", { headers: authHeaders() });
    if (!r.ok) return { students: [], answers: [], cheatalerts: [] };
    const data = await r.json();
    return {
      students: data.students || [],
      answers: data.answers || [],
      cheatalerts: data.cheatalerts || [],
    };
  } catch {
    return { students: [], answers: [], cheatalerts: [] };
  }
}

// v75/v76: نسخه‌ی یکجای refresh() اصلی — به‌جای ۵ تا loadAll جدا +
// loadAll("teacher:") + loadTeacherDashboardData() (که هرکدوم به‌ازای هر
// کلید یک درخواست جدا می‌زد)، همه‌چیز رو با یک درخواست می‌گیره. اگه به هر
// دلیلی fail بشه، null برمی‌گردونه تا فراخوان (app.js) به روش قدیمی
// fallback کنه.
async function loadFullDashboardData() {
  try {
    const r = await fetch("/api/full-dashboard-data", { headers: authHeaders() });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

// وقتی حساب معلم/مدیر تازه‌ای ساخته می‌شه، این تابع ایمیل خوش‌آمد رو
// صدا می‌زنه. برخلاف نسخه‌ی قبلی‌ش دیگه خطا رو بی‌صدا قورت نمی‌ده — یه
// پیام قابل‌فهم برمی‌گردونه که فراخوان می‌تونه (اگه خواست) به کاربر نشون بده.
async function sendWelcomeEmail({ username, fullname, email, role }) {
  try {
    const r = await fetch("/api/send-welcome-email", {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ username, fullname, email, role }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.warn("send-welcome-email failed:", r.status, data);
      return { sent: false, note: data.error || `خطای سرور (${r.status})` };
    }
    if (data.sent) return { sent: true, note: "" };
    const reasons = {
      "resend-not-configured": "سرویس ایمیل (RESEND_API_KEY) روی این Worker تنظیم نشده است.",
      "resend-error": `سرویس ایمیل (Resend) درخواست را رد کرد (کد ${data.status || "؟"}) — احتمالاً چون آدرس فرستنده‌ی onboarding@resend.dev فقط اجازه‌ی ارسال به ایمیل خودِ حساب Resend را می‌دهد؛ برای ارسال به هر آدرسی باید یک دامنه در Resend وریفای و RESEND_FROM تنظیم شود.`,
      "email-failed": "اتصال به سرویس ایمیل برقرار نشد.",
    };
    console.warn("send-welcome-email not sent:", data);
    return { sent: false, note: reasons[data.reason] || "ایمیل ارسال نشد." };
  } catch (e) {
    console.warn("send-welcome-email network error:", e);
    return { sent: false, note: "اتصال به سرور برقرار نشد." };
  }
}

/* ---------------------------------------------------------
   OFFLINE SUBMISSION QUEUE
   When a student finishes an exam with no internet connection
   (or a KV write fails mid-submission), the full submission is
   saved here instead of being lost. Once connectivity returns,
   flushOfflineQueue() replays every queued submission against
   the real KV API and removes it from the queue on success.
--------------------------------------------------------- */
const OFFLINE_QUEUE_KEY = "eduexam_offline_queue";

function getOfflineQueue() {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOfflineQueue(queue) {
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    /* localStorage full/unavailable — nothing more we can do client-side */
  }
}

function queueOfflineSubmission(submission) {
  const queue = getOfflineQueue();
  queue.push(submission);
  saveOfflineQueue(queue);
}

// Attempts to send every queued submission to the real backend. Returns the
// number of submissions successfully synced. Safe to call repeatedly (e.g.
// on an 'online' event or a periodic timer) — already-synced items are
// removed from the queue, so nothing is ever double-submitted.
async function flushOfflineQueue() {
  const queue = getOfflineQueue();
  if (queue.length === 0) return 0;
  const stillPending = [];
  let syncedCount = 0;
  for (const sub of queue) {
    try {
      const r = await fetch("/api/answers/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: sub.studentRecord.id,
          student: sub.studentRecord,
          exam_id: sub.examId,
          answers: sub.answerRecords.map((a) => ({
            question_id: a.question_id, selected_option: a.selected_option, time_taken: a.time_taken,
          })),
          cheat_alert: sub.cheatAlert,
          token: sub.token, // v76: attempt token صادرشده موقع ورود — ممکنه اگه خیلی دیر sync بشه منقضی شده باشه (بافر ۳ ساعته)
        }),
      });
      const ok = r.ok;
      if (ok) {
        if (sub.draftKeyToDelete) {
          await deleteKey(sub.draftKeyToDelete);
          deleteLocalDraft(sub.draftKeyToDelete);
        }
        syncedCount++;
      } else {
        stillPending.push(sub);
      }
    } catch {
      stillPending.push(sub);
    }
  }
  saveOfflineQueue(stillPending);
  return syncedCount;
}

/* ---------------------------------------------------------
   LOCAL EXAM-DRAFT STORAGE
   In-progress exam answers (selections/current/qOrder/optOrder)
   are normally autosaved to the server via setJSON on `draft:*`
   keys, throttled to once every few seconds to spare the KV
   write quota. That's fine online, but if the student is
   *offline* mid-exam and reloads the page, that server draft
   can't be reached at all — the SW's EXAM_CACHE_NAME only caches
   the exam questions/session, not the student's own answers.
   To close that gap, every draft change is ALSO written here,
   synchronously, to localStorage — no network needed, so it
   survives an offline reload. Each saved draft carries a
   `savedAt` timestamp so the loader (TakeExamScreen.startExam)
   can pick whichever of {local, server} copy is actually newer,
   since either one could be stale depending on connectivity.
--------------------------------------------------------- */
const LOCAL_DRAFT_PREFIX = "eduexam_local_draft:";

function saveLocalDraft(key, value) {
  try {
    localStorage.setItem(LOCAL_DRAFT_PREFIX + key, JSON.stringify(value));
  } catch {
    /* localStorage full/unavailable — the throttled server-side save is our only fallback then */
  }
}

function getLocalDraft(key) {
  try {
    const raw = localStorage.getItem(LOCAL_DRAFT_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function deleteLocalDraft(key) {
  try {
    localStorage.removeItem(LOCAL_DRAFT_PREFIX + key);
  } catch {
    /* ignore */
  }
}

// Works for both multiple-choice answers (mark if correct) and essay answers
// that have been manually graded (awarded_mark set by the teacher).

function awardedMarkOf(a) {
  if (a.awarded_mark != null) return a.awarded_mark;
  return a.is_correct ? a.mark : 0;
}

// نقاط ضعف یک دانش‌آموز (با roster_id) بر اساس برچسبِ سوال‌هایی که تا حالا
// جواب داده — کاملاً سمت کلاینت، بدون نیاز به اندپوینت جدید، چون answers/
// questions از قبل توی state لود شده‌ن (دقیقاً مثل نمودار روند نمرات).
// سوال‌های بدون برچسب، اگه «درس» داشته باشن از همون به‌جای برچسب استفاده
// می‌شه؛ سوال‌هایی که هنوز تصحیح نشدن (is_correct هنوز null — تشریحیِ
// درحال‌تصحیح) نادیده گرفته می‌شن. برای جلوگیری از نویز آماری، برچسبی که
// کمتر از ۲ بار جواب داده شده نمایش داده نمی‌شه.
function computeWeakTopics(rosterId, students, answers, questions) {
  const studentIds = students.filter((s) => s.roster_id === rosterId).map((s) => s.id);
  const relevantAnswers = answers.filter((a) => studentIds.includes(a.student_id) && a.is_correct !== null && a.is_correct !== undefined);
  const stats = {};
  relevantAnswers.forEach((a) => {
    const q = questions.find((qq) => qq.id === a.question_id);
    const tags = q && Array.isArray(q.tags) && q.tags.length > 0 ? q.tags : q && q.subject ? [q.subject] : [];
    tags.forEach((tag) => {
      if (!stats[tag]) stats[tag] = { correct: 0, total: 0 };
      stats[tag].total += 1;
      if (a.is_correct) stats[tag].correct += 1;
    });
  });
  return Object.entries(stats)
    .map(([tag, s]) => ({ tag, correct: s.correct, total: s.total, pct: Math.round((s.correct / s.total) * 100) }))
    .filter((t) => t.total >= 2)
    .sort((a, b) => a.pct - b.pct);
}

// Sorts a copy of `arr` alphabetically (Persian-aware) by the string keyFn(item) returns.
function sortByFa(arr, keyFn) {
  return [...arr].sort((a, b) => (keyFn(a) || "").localeCompare(keyFn(b) || "", "fa"));
}

function downloadTextFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// یه فایل عکس رو کوچیک و فشرده می‌کنه (حداکثر بُعد ۱۴۰۰px، JPEG با کیفیت
// نزولی) تا زیر maxBytes بشه — برای اینکه عکس پاسخ دست‌نویس با حجم معقول
// در D1 (به‌جای R2) جا بشه. اگه فشرده‌سازی ممکن نشد (مرورگر قدیمی و...)،
// خودِ فایل اصلی رو برمی‌گردونه.
async function compressImageToBlob(file, maxBytes = 700 * 1024, maxDim = 1400) {
  try {
    const bitmap = await createImageBitmap(file);
    let { width, height } = bitmap;
    if (width > maxDim || height > maxDim) {
      const scale = maxDim / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, width, height);
    for (const quality of [0.7, 0.5, 0.35, 0.2]) {
      const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
      if (blob && blob.size <= maxBytes) return blob;
    }
    // حتی با کمترین کیفیت هم بزرگه؛ همون آخرین (کوچیک‌ترین) نسخه رو بده
    return await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.2));
  } catch {
    return file;
  }
}

// یه Blob رو به data URL (base64) تبدیل می‌کنه — برای ذخیره‌ی مستقیمِ لوگوی
// مدرسه توی رکورد KV مدرسه (بدون نیاز به دانلود جداگانه‌ی احرازهویت‌شده،
// چون این باید حتی روی سایدبار قبل از هر فچ دیگه‌ای در دسترس باشه).
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("خواندن فایل ممکن نشد"));
    reader.readAsDataURL(blob);
  });
}

// می‌گیره یه آرایه از { name, rows } (هرکدوم یه شیت) و یه فایل xlsx واقعی
// می‌سازه (با کتابخانه‌ی SheetJS که توی index.html اضافه شده)، نه فقط یه CSV
// با پسوند xlsx. rows هر شیت باید آرایه‌ای از آبجکت‌های ساده باشه (کلید = اسم ستون).
function downloadExcelWorkbook(filename, sheets) {
  const wb = XLSX.utils.book_new();
  sheets.forEach(({ name, rows }) => {
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, name.slice(0, 31)); // اسم شیت حداکثر ۳۱ کاراکتر مجازه
  });
  const arrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  downloadTextFile(filename, arrayBuffer, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
}

/* ---------------------------------------------------------
   Small UI atoms
--------------------------------------------------------- */

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#3A4A63", marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1.5px solid #E2E8F0",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
  background: "#fff",
  color: "#1E293B",
  transition: "border-color .15s",
};

function TextInput(props) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => { setFocus(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocus(false); props.onBlur?.(e); }}
      style={{ ...inputStyle, borderColor: focus ? "#2563EB" : "#E2E8F0", ...(props.style || {}) }}
    />
  );
}

function Button(props) {
  const children = props.children;
  const variant = props.variant || "primary";
  const style = props.style;
  const rest = {};
  Object.keys(props).forEach((k) => {
    if (k !== "children" && k !== "variant" && k !== "style") rest[k] = props[k];
  });
  const variants = {
    primary: { background: "#2563EB", color: "#fff", border: "none" },
    ghost: { background: "#fff", color: "#334155", border: "1.5px solid #E2E8F0" },
    danger: { background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" },
    success: { background: "#16A34A", color: "#fff", border: "none" },
  };
  return (
    <button
      {...rest}
      style={{
        ...variants[variant],
        padding: "10px 18px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "filter .15s, transform .1s",
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

function StatCard({ icon: IconCmp, label, value, delta, color }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "20px 22px", flex: 1,
      border: "1px solid #EEF1F6", minWidth: 180,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600, marginBottom: 10 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#1E293B" }}>{value}</div>
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: 12, background: color + "1A",
          display: "flex", alignItems: "center", justifyContent: "center", color,
        }}>
          <IconCmp size={20} />
        </div>
      </div>
      {delta && <div style={{ fontSize: 12, color: "#16A34A", marginTop: 10, fontWeight: 600 }}>{delta}</div>}
    </div>
  );
}

function Badge({ children, tone = "blue" }) {
  const tones = {
    blue: { bg: "#EFF6FF", fg: "#2563EB" },
    green: { bg: "#F0FDF4", fg: "#16A34A" },
    orange: { bg: "#FFFBEB", fg: "#D97706" },
    red: { bg: "#FEF2F2", fg: "#DC2626" },
    gray: { bg: "#F1F5F9", fg: "#475569" },
  };
  const t = tones[tone];
  return (
    <span style={{
      background: t.bg, color: t.fg, fontSize: 12, fontWeight: 700,
      padding: "4px 10px", borderRadius: 999, display: "inline-block",
    }}>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------
   Math formula support (KaTeX) — for math/physics teachers.
   Text anywhere in the app can contain $inline$ or $$block$$
   LaTeX, which MathText renders as a real formula. MathTextarea
   pairs a textarea with a symbol toolbar (MathToolbar) so a
   teacher who doesn't know LaTeX syntax can still build a
   formula by tapping buttons (fraction, power, root, integral...).
--------------------------------------------------------- */

// Splits raw text into { type: 'text' | 'math', content, display } segments.
// $$...$$ renders as display (block) math, $...$ as inline math.
function splitMathSegments(text) {
  if (!text) return [];
  const parts = [];
  const regex = /\$\$([^$]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0, m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push({ type: "text", content: text.slice(lastIndex, m.index) });
    if (m[1] !== undefined) parts.push({ type: "math", content: m[1], display: true });
    else parts.push({ type: "math", content: m[2], display: false });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push({ type: "text", content: text.slice(lastIndex) });
  return parts;
}

// Renders text that may contain $...$ / $$...$$ LaTeX formulas.
// Falls back to plain text (and never throws) if KaTeX isn't loaded
// or a formula has a syntax error.
function MathText({ text, style }) {
  if (!text) return null;
  const segments = splitMathSegments(String(text));
  return (
    <span style={{ whiteSpace: "pre-wrap", ...style }}>
      {segments.map((seg, i) => {
        if (seg.type === "text") return <React.Fragment key={i}>{seg.content}</React.Fragment>;
        let html;
        try {
          html = window.katex
            ? window.katex.renderToString(seg.content, { throwOnError: false, displayMode: !!seg.display })
            : null;
        } catch { html = null; }
        if (html == null) return <React.Fragment key={i}>{"$" + seg.content + "$"}</React.Fragment>;
        return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </span>
  );
}

// Common math/physics symbols. Inserted wrapped as $...$.
const MATH_SYMBOLS = [
  { label: "کسر", tex: "\\frac{a}{b}" },
  { label: "توان", tex: "x^{n}" },
  { label: "اندیس", tex: "x_{n}" },
  { label: "رادیکال", tex: "\\sqrt{x}" },
  { label: "ریشه n‌ام", tex: "\\sqrt[n]{x}" },
  { label: "∑ مجموع", tex: "\\sum_{i=1}^{n}" },
  { label: "∫ انتگرال", tex: "\\int_{a}^{b}" },
  { label: "درجه °", tex: "90^\\circ" },
  { label: "π پی", tex: "\\pi" },
  { label: "× ضرب", tex: "\\times" },
  { label: "÷ تقسیم", tex: "\\div" },
  { label: "≤", tex: "\\leq" },
  { label: "≥", tex: "\\geq" },
  { label: "≠", tex: "\\neq" },
  { label: "Δ دلتا", tex: "\\Delta" },
  { label: "θ تتا", tex: "\\theta" },
  { label: "بردار", tex: "\\vec{v}" },
  { label: "Ω اهم", tex: "\\Omega" },
];

// Common chemistry notation (via the KaTeX mhchem extension).
// Inserted wrapped as $\ce{...}$.
const CHEM_SYMBOLS = [
  { label: "فرمول (H₂O)", tex: "H2O" },
  { label: "یون مثبت (Na⁺)", tex: "Na+" },
  { label: "یون منفی (Cl⁻)", tex: "Cl-" },
  { label: "یون چندبار (SO₄²⁻)", tex: "SO4^2-" },
  { label: "فلش واکنش →", tex: "A -> B" },
  { label: "فلش تعادل ⇌", tex: "A <=> B" },
  { label: "فلش با شرط (مثلاً حرارت)", tex: "A ->[\\Delta] B" },
  { label: "جامد (s)", tex: "(s)" },
  { label: "مایع (l)", tex: "(l)" },
  { label: "گاز (g)", tex: "(g)" },
  { label: "محلول (aq)", tex: "(aq)" },
  { label: "رسوب ↓", tex: "v" },
  { label: "گاز خروجی ↑", tex: "^" },
];

function insertAtCursor(el, setValue, snippet) {
  if (!el) return;
  const current = el.value ?? "";
  const start = el.selectionStart ?? current.length;
  const end = el.selectionEnd ?? current.length;
  const newValue = current.slice(0, start) + snippet + current.slice(end);
  setValue(newValue);
  requestAnimationFrame(() => {
    try {
      el.focus();
      const pos = start + snippet.length;
      el.setSelectionRange(pos, pos);
    } catch { /* ignore */ }
  });
}

// One collapsible row of tappable symbol buttons that insert LaTeX
// into whichever field last had focus (tracked via targetRef) at the
// cursor position. Collapsed behind a small toggle by default — a
// teacher who never needs formulas (e.g. history, literature) never
// sees a cluttered toolbar; a math/physics/chemistry teacher taps
// once to reveal the group they need.
function SymbolToolbarGroup({ targetRef, setValue, symbols, toggleLabel, wrap }) {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "5px 10px", fontSize: 12, borderRadius: 7, border: "1px dashed #CBD5E1",
          background: "#fff", color: "#64748B", cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
        }}
      >
        {toggleLabel}
      </button>
    );
  }
  return (
    <div style={{ marginBottom: 2 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 5 }}>
        {symbols.map((s) => (
          <button
            key={s.label}
            type="button"
            title={s.label}
            onClick={() => insertAtCursor(targetRef.current, setValue, wrap(s.tex))}
            style={{
              padding: "4px 9px", fontSize: 12, borderRadius: 7, border: "1px solid #DBEAFE",
              background: "#F8FAFC", color: "#1E3A8A", cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <span onClick={() => setOpen(false)} style={{ fontSize: 11, color: "#94A3B8", cursor: "pointer" }}>
        بستن نوار نمادها
      </span>
    </div>
  );
}

// Combines the math/physics group and the chemistry group above a field.
function MathToolbar({ targetRef, setValue }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 7 }}>
      <SymbolToolbarGroup
        targetRef={targetRef} setValue={setValue} symbols={MATH_SYMBOLS}
        toggleLabel="∑ افزودن فرمول ریاضی/فیزیک" wrap={(tex) => `$${tex}$`}
      />
      <SymbolToolbarGroup
        targetRef={targetRef} setValue={setValue} symbols={CHEM_SYMBOLS}
        toggleLabel="⚗ افزودن فرمول شیمی" wrap={(tex) => `$\\ce{${tex}}$`}
      />
    </div>
  );
}

// A textarea for math-friendly free text: symbol toolbar on top,
// live formula preview below (only shown once the field contains "$").
function MathTextarea({ value, onChange, rows, placeholder, style }) {
  const ref = useRef(null);
  const setValue = (v) => onChange({ target: { value: v } });
  return (
    <div>
      <MathToolbar targetRef={ref} setValue={setValue} />
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        rows={rows || 3}
        placeholder={placeholder}
        style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", ...(style || {}) }}
      />
      {value && value.includes("$") && (
        <div style={{ marginTop: 7, padding: "9px 12px", background: "#F8FAFC", borderRadius: 8, border: "1px dashed #DBEAFE" }}>
          <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4, fontWeight: 600 }}>پیش‌نمایش:</div>
          <MathText text={value} />
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Sidebar (shared across teacher screens)
--------------------------------------------------------- */

// زیر این عرض، هر سه سایدبار (معلم/مدیر مدرسه/مدیر سایت) به‌جای ستون ثابت
// ۲۳۰px، به یه کشوی روی صفحه با دکمه‌ی همبرگری تبدیل می‌شن — قبلاً هیچ
// حالت موبایلی نداشتن و نصف عرض گوشی رو اشغال می‌کردن.
const MOBILE_SIDEBAR_BREAKPOINT = 860;
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth < MOBILE_SIDEBAR_BREAKPOINT : false));
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_SIDEBAR_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

// دکمه‌ی همبرگریِ ثابت گوشه‌ی صفحه — فقط وقتی کشو بسته‌ست نشون داده می‌شه
// (وقتی بازه، خودِ سایدبار یه دکمه‌ی ضربدر برای بستن داره).
function MobileMenuButton({ onClick, accent }) {
  return (
    <button
      onClick={onClick}
      aria-label="باز کردن منو"
      style={{
        position: "fixed", top: 14, right: 14, zIndex: 10001,
        width: 42, height: 42, borderRadius: 12, border: "none",
        background: accent || "#2563EB", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,.22)", cursor: "pointer", padding: 0,
      }}
    >
      <Menu size={20} />
    </button>
  );
}

// پس‌زمینه‌ی نیم‌شفافِ پشتِ کشوی باز — با زدنش کشو بسته می‌شه.
function MobileSidebarBackdrop({ onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.45)", zIndex: 9998 }}
    />
  );
}

// خط جداکننده‌ی کم‌رنگ بین گروه‌های منو (مثلاً «محتوا» از «افراد» از
// «ارتباط»)، برای اسکن راحت‌تر چشم روی فهرست ۹-۱۰ آیتمی.
function SidebarDivider() {
  return <div style={{ height: 1, background: "#22385F", margin: "8px 8px 10px" }} />;
}

function Sidebar({ active, onNavigate, onLogout, teacherName, onHelp, brandColor, logoUrl, badges, hiddenKeys }) {
  const accent = brandColor || "#2563EB";
  // اگه رنگ برند مدرسه خیلی روشن باشه (مثلاً زرد)، متن سفیدِ آیتم فعال
  // خوانا نمی‌مونه — با این تخمینِ سادهٔ روشنایی، برای رنگ‌های روشن به‌جای
  // سفید از متن تیره استفاده می‌کنیم.
  const activeTextColor = (() => {
    const hex = (accent || "").replace("#", "");
    if (hex.length !== 6) return "#fff";
    const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 175 ? "#1E293B" : "#fff";
  })();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = [
    { key: "dashboard", label: "داشبورد", icon: LayoutDashboard, group: "overview" },
    { key: "exams", label: "آزمون‌ها", icon: FileText, group: "content" },
    { key: "questionbank", label: "بانک سوال", icon: Library, group: "content" },
    { key: "classes", label: "کلاس‌ها", icon: Users, group: "people" },
    { key: "students", label: "دانش‌آموزان", icon: GraduationCap, group: "people" },
    { key: "messages", label: "پیام‌ها", icon: MessageSquare, group: "comm" },
    { key: "classchat", label: "چت با دانش‌آموزان", icon: MessageCircle, group: "comm" },
    { key: "results", label: "نتایج", icon: BarChart3, group: "insights" },
    { key: "settings", label: "تنظیمات", icon: Settings, group: "account" },
  ].filter((it) => !(hiddenKeys && hiddenKeys.includes(it.key)));
  const navigate = (key) => {
    onNavigate(key);
    setMobileOpen(false);
  };
  if (isMobile && !mobileOpen) {
    return <MobileMenuButton onClick={() => setMobileOpen(true)} accent={accent} />;
  }
  return (
    <>
      {isMobile && <MobileSidebarBackdrop onClick={() => setMobileOpen(false)} />}
      <div style={{
        width: 230, background: "#132A52", minHeight: "100%", display: "flex",
        flexDirection: "column", flexShrink: 0,
        ...(isMobile ? { position: "fixed", top: 0, bottom: 0, right: 0, zIndex: 9999, boxShadow: "-8px 0 24px rgba(0,0,0,.25)", overflowY: "auto" } : {}),
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "22px 20px", borderBottom: "1px solid #22385F" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: accent, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {logoUrl ? <img src={logoUrl} alt="لوگو" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <GraduationCap size={19} color="#fff" />}
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>آزمون‌ساز</span>
          </div>
          {isMobile && (
            <X size={20} color="#AAB8D1" style={{ cursor: "pointer" }} onClick={() => setMobileOpen(false)} />
          )}
        </div>
        <div style={{ padding: "14px 12px", flex: 1 }}>
          {items.map((it, i) => {
            const isActive = active === it.key;
            const IconCmp = it.icon;
            const showDivider = i > 0 && items[i - 1].group !== it.group;
            return (
              <React.Fragment key={it.key}>
                {showDivider && <SidebarDivider />}
                <div
                  className="sidebar-item"
                  onClick={() => navigate(it.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
                    borderRadius: 10, cursor: "pointer", marginBottom: 4,
                    background: isActive ? accent : "transparent",
                    color: isActive ? activeTextColor : "#AAB8D1",
                    fontSize: 14, fontWeight: 600, transition: "background .15s",
                  }}
                >
                  <IconCmp size={17} />
                  {it.label}
                  {badges && badges[it.key] > 0 && (
                    <span style={{
                      marginRight: "auto", background: "#EF4444", color: "#fff", fontSize: 10.5, fontWeight: 800,
                      borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {badges[it.key]}
                    </span>
                  )}
                </div>
              </React.Fragment>
            );
          })}
          {onHelp && (
            <div
              className="sidebar-item"
              onClick={() => { onHelp(); setMobileOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", marginBottom: 4, color: "#AAB8D1", fontSize: 14, fontWeight: 600 }}
            >
              <HelpCircle size={17} />
              راهنما
            </div>
          )}
        </div>
        <div style={{ padding: 12, borderTop: "1px solid #22385F" }}>
          <div style={{ fontSize: 12, color: "#7C8CAE", padding: "6px 14px 12px" }}>{teacherName}</div>
          <div
            className="sidebar-item"
            onClick={onLogout}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", color: "#F87171", fontSize: 14, fontWeight: 600 }}
          >
            <LogOut size={17} />
            خروج
          </div>
          <div style={{ fontSize: 10, color: "#4B5C81", textAlign: "center", padding: "10px 14px 2px", letterSpacing: 0.3 }}>
            © {new Date().getFullYear()} ghobeishawi — تمامی حقوق محفوظ است
          </div>
        </div>
      </div>
    </>
  );
}

// عکس پروفایل رو با هدر Authorization می‌گیره (چون <img src> نمی‌تونه هدر
// بفرسته) و به‌صورت object URL محلی نشون می‌ده؛ اگه عکسی ثبت نشده باشه یا
// خطا بخوره، یک دایره‌ی رنگی با حرف اول اسم نشون داده می‌شه.
function Avatar({ username, name, size = 38, updatedAt, color = "#2563EB" }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    if (!username || !updatedAt) { setSrc(null); return; }
    let objectUrl = null;
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`/api/profile-photo?username=${encodeURIComponent(username)}&v=${encodeURIComponent(updatedAt)}`, { headers: authHeaders() });
        if (!r.ok) throw new Error();
        const blob = await r.blob();
        objectUrl = URL.createObjectURL(blob);
        if (!cancelled) setSrc(objectUrl);
      } catch {
        if (!cancelled) setSrc(null);
      }
    })();
    return () => { cancelled = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [username, updatedAt]);

  if (src) {
    return (
      <img
        src={src}
        alt={name || username || "کاربر"}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: color, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
      fontSize: Math.round(size * 0.37), flexShrink: 0,
    }}>
      {name?.[0] || "م"}
    </div>
  );
}

function TopBar({ title, teacherName, avatarUsername, avatarUpdatedAt }) {
  const today = new Date().toLocaleDateString("fa-IR");
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1E293B", margin: 0 }}>{title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 13, color: "#64748B" }}>{today}</span>
        <Avatar username={avatarUsername} name={teacherName} updatedAt={avatarUpdatedAt} size={38} />
      </div>
    </div>
  );
}

// ویرایشگر مشترک «لوگو + رنگ اختصاصی مدرسه» — هم توی پنل مدیر کل (روی هر
// مدرسه‌ای) و هم توی پنل خودِ مدیر مدرسه (روی مدرسه‌ی خودش) استفاده می‌شه.
// لوگو به data URL تبدیل و مستقیم توی رکورد KV مدرسه ذخیره می‌شه (نه D1)
// چون باید بدون فچ جداگانه‌ی احرازهویت‌شده، سریع روی سایدبار نشون داده بشه.
function SchoolBrandingEditor({ school, onSave }) {
  const [color, setColor] = useState(school.color || "#2563EB");
  const [logoDataUrl, setLogoDataUrl] = useState(school.logo_data_url || null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const pickLogo = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setMsg("");
    try {
      const blob = await compressImageToBlob(file, 150 * 1024, 400);
      const dataUrl = await blobToDataUrl(blob);
      setLogoDataUrl(dataUrl);
    } catch {
      setMsg("بارگذاری لوگو ممکن نشد.");
    }
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      await onSave({ color, logo_data_url: logoDataUrl });
      setMsg("ذخیره شد.");
    } catch {
      setMsg("خطا در ذخیره‌سازی.");
    }
    setSaving(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12, background: "#F1F5F9", border: "1.5px solid #E2E8F0",
          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0,
        }}>
          {logoDataUrl ? (
            <img src={logoDataUrl} alt="لوگوی مدرسه" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          ) : (
            <GraduationCap size={26} color="#94A3B8" />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
            fontSize: 12.5, fontWeight: 700, cursor: "pointer", background: "#fff", color: "#334155",
            border: "1.5px solid #E2E8F0", width: "fit-content",
          }}>
            انتخاب لوگو
            <input type="file" accept="image/*" onChange={pickLogo} style={{ display: "none" }} />
          </label>
          {logoDataUrl && (
            <span onClick={() => setLogoDataUrl(null)} style={{ fontSize: 11.5, color: "#DC2626", cursor: "pointer" }}>حذف لوگو</span>
          )}
        </div>
      </div>
      <Field label="رنگ اختصاصی مدرسه">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: 44, height: 38, borderRadius: 8, border: "1.5px solid #E2E8F0", padding: 2, cursor: "pointer" }}
          />
          <TextInput value={color} onChange={(e) => setColor(e.target.value)} style={{ maxWidth: 140 }} />
        </div>
      </Field>
      {msg && <div style={{ fontSize: 12.5, color: msg === "ذخیره شد." ? "#16A34A" : "#DC2626", marginBottom: 10 }}>{msg}</div>}
      <Button onClick={save} disabled={saving}>{saving ? "در حال ذخیره..." : "ذخیره‌ی برندینگ"}</Button>
    </div>
  );
}

/* ---------------------------------------------------------
   AUTH SCREENS
--------------------------------------------------------- */

function EmptyState({ text, actionLabel, onAction }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 14, color: "#64748B", marginBottom: 16 }}>{text}</div>
      {actionLabel && <Button onClick={onAction}><Plus size={16} />{actionLabel}</Button>}
    </div>
  );
}

/* ---------------------------------------------------------
   EXAMS LIST + CREATE
--------------------------------------------------------- */

/* ---------------------------------------------------------
   LINE CHART — یک wrapper سبک روی Chart.js (از CDN، در index.html)
   برای نمودار روند نمره در طول ترم. کتابخونه‌ی چارت جدا ایمپورت نمی‌شه
   (این پروژه build tool نداره)، بلکه از window.Chart که با تگ اسکریپت
   لود شده استفاده می‌کنه؛ اگه به هر دلیلی لود نشده باشه (مثلاً آفلاین)،
   یه پیام جایگزین ساده نشون داده می‌شه، نه کرش.
--------------------------------------------------------- */
function LineChartCanvas({ labels, values, height = 220, color = "#2563EB" }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || typeof window === "undefined" || !window.Chart) return;
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    chartRef.current = new window.Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [{
          data: values, borderColor: color, backgroundColor: color + "22",
          fill: true, tension: 0.3, pointRadius: 4, pointBackgroundColor: color,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 0, max: 100, ticks: { callback: (v) => v + "%" } } },
      },
    });
    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, [JSON.stringify(labels), JSON.stringify(values), color]);

  if (typeof window === "undefined" || !window.Chart) {
    return <div style={{ color: "#94A3B8", fontSize: 13, textAlign: "center", padding: 20 }}>نمودار در دسترس نیست (اتصال اینترنت لازم است).</div>;
  }
  return <div style={{ height }}><canvas ref={canvasRef} /></div>;
}

function Modal({ title, children, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 26, width: "100%", maxWidth: 420, maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#1E293B" }}>{title}</div>
          <div
            onClick={onClose}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, cursor: "pointer", marginLeft: -8 }}
          >
            <X size={18} color="#94A3B8" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   STUDENT PICKER — searchable, grouped by class (used anywhere
   a teacher needs to pick one student out of a long roster)
--------------------------------------------------------- */
function StudentPicker({ classes, roster, value, onChange, placeholder = "— انتخاب دانش‌آموز —" }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const selected = roster.find((r) => r.id === value);
  const selectedClass = selected ? classes.find((c) => c.id === selected.class_id) : null;
  const matches = (s) => s.fullname.toLowerCase().includes(q.trim().toLowerCase());

  const groups = classes
    .map((c) => ({ id: c.id, name: c.name, students: roster.filter((r) => r.class_id === c.id && matches(r)) }))
    .filter((g) => g.students.length > 0);
  const noClassStudents = roster.filter((r) => !classes.some((c) => c.id === r.class_id) && matches(r));

  const close = () => { setOpen(false); setQ(""); };
  const pick = (id) => { onChange(id); close(); };

  const Row = ({ s }) => (
    <div
      onClick={() => pick(s.id)}
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: 8, cursor: "pointer",
        background: value === s.id ? "#EFF6FF" : "transparent",
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%", border: `2px solid ${value === s.id ? "#2563EB" : "#CBD5E1"}`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {value === s.id && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#2563EB" }} />}
      </div>
      <span style={{ fontSize: 14, color: "#1E293B" }}>{s.fullname}</span>
    </div>
  );

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{ ...inputStyle, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <span style={{ color: selected ? "#1E293B" : "#94A3B8" }}>
          {selected ? `${selected.fullname}${selectedClass ? ` (${selectedClass.name})` : ""}` : placeholder}
        </span>
        <ChevronLeft size={16} style={{ color: "#94A3B8" }} />
      </div>
      {open && (
        <Modal title="انتخاب دانش‌آموز" onClose={close}>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <Search size={15} style={{ position: "absolute", top: 12, right: 12, color: "#94A3B8" }} />
            <input
              autoFocus value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="جستجوی نام دانش‌آموز..." style={{ ...inputStyle, paddingRight: 36 }}
            />
          </div>
          <div style={{ maxHeight: 360, overflowY: "auto" }}>
            {groups.length === 0 && noClassStudents.length === 0 && (
              <div style={{ fontSize: 13, color: "#94A3B8", textAlign: "center", padding: "20px 0" }}>دانش‌آموزی پیدا نشد.</div>
            )}
            {groups.map((g) => (
              <div key={g.id} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#64748B", marginBottom: 6, padding: "0 4px" }}>{g.name}</div>
                {g.students.map((s) => <Row key={s.id} s={s} />)}
              </div>
            ))}
            {noClassStudents.length > 0 && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#64748B", marginBottom: 6, padding: "0 4px" }}>بدون کلاس</div>
                {noClassStudents.map((s) => <Row key={s.id} s={s} />)}
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}


/* ---------------------------------------------------------
   QUESTION MANAGEMENT (add question w/ live preview)
--------------------------------------------------------- */

function parseBulkQuestions(text) {
  const blocks = text.split(/\n\s*(?:---)?\s*\n/).map((b) => b.trim()).filter(Boolean);
  const parsed = [];
  const errors = [];
  blocks.forEach((block, idx) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const qLine = lines.find((l) => /^Q:/i.test(l));
    const typeLine = lines.find((l) => /^TYPE:/i.test(l));
    const isEssay = typeLine && /essay|تشریحی/i.test(typeLine.replace(/^TYPE:/i, "").trim());
    const markLine = lines.find((l) => /^MARK:/i.test(l));
    if (!qLine) { errors.push(idx + 1); return; }
    if (isEssay) {
      const keywordsLine = lines.find((l) => /^KEYWORDS:/i.test(l));
      const answerLine = lines.find((l) => /^ANSWER:/i.test(l));
      parsed.push({
        type: "essay",
        question_text: qLine.replace(/^Q:/i, "").trim(),
        model_answer: answerLine ? answerLine.replace(/^ANSWER:/i, "").trim() : "",
        keywords: keywordsLine ? keywordsLine.replace(/^KEYWORDS:/i, "").trim() : "",
        mark: markLine ? Number(markLine.replace(/^MARK:/i, "").trim()) || 1 : 1,
      });
      return;
    }
    const optA = lines.find((l) => /^A\)/i.test(l));
    const optB = lines.find((l) => /^B\)/i.test(l));
    const optC = lines.find((l) => /^C\)/i.test(l));
    const optD = lines.find((l) => /^D\)/i.test(l));
    const ansLine = lines.find((l) => /^ANSWER:/i.test(l));
    if (!optA || !optB || !optC || !optD || !ansLine) { errors.push(idx + 1); return; }
    const answers = ansLine.replace(/^ANSWER:/i, "").trim().toUpperCase().split(/[,\s]+/).filter(Boolean);
    parsed.push({
      type: answers.length > 1 ? "mc_multi" : "mc",
      question_text: qLine.replace(/^Q:/i, "").trim(),
      option_a: optA.replace(/^A\)/i, "").trim(),
      option_b: optB.replace(/^B\)/i, "").trim(),
      option_c: optC.replace(/^C\)/i, "").trim(),
      option_d: optD.replace(/^D\)/i, "").trim(),
      correct_answer: answers.length === 1 ? answers[0] : undefined,
      correct_answers: answers.length > 1 ? answers : undefined,
      mark: markLine ? Number(markLine.replace(/^MARK:/i, "").trim()) || 1 : 1,
    });
  });
  return { parsed, errors };
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function LegendDot({ color, label }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 9, height: 9, borderRadius: 3, background: color, display: "inline-block" }} />
      {label}
    </span>
  );
}

/* ---------------------------------------------------------
   RESULTS
--------------------------------------------------------- */

function generateCode(existingCodes) {
  let code;
  do {
    code = String(Math.floor(100000 + Math.random() * 900000));
  } while (existingCodes.includes(code));
  return code;
}

/* ---------------------------------------------------------
   ERROR BOUNDARY
   قبلاً اپ هیچ Error Boundary نداشت — یعنی هر خطای رندرِ جاوااسکریپتی،
   هر جای اپ که پیش می‌اومد، کل درخت React رو بی‌صدا خالی می‌کرد (نه فقط
   همون بخش)، و چون هیچ‌جا لاگ/نمایش داده نمی‌شد، هیچ سرنخی از علتش
   نمی‌موند. این کامپوننت (کلاسیه، چون componentDidCatch فقط با کلاس
   می‌شه — معادل Hook نداره) دور کل اپ می‌شینه: اگه رندر جایی خطا بده،
   به‌جای صفحه‌ی کاملاً مرده، یه پیام «مشکلی پیش اومد» با دو دکمه نشون
   می‌ده، و متن دقیق خطا رو هم توی کنسول لاگ می‌کنه هم توی خودِ صفحه
   (بخش «جزئیات فنی») می‌ذاره تا کاربر بتونه مستقیم کپی/اسکرین‌شات کنه.
--------------------------------------------------------- */
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("خطای رندر گرفته‌نشده:", error, info && info.componentStack);
    this.setState({ info });
  }
  render() {
    if (this.state.error) {
      const detail = [
        this.state.error && (this.state.error.stack || this.state.error.message || String(this.state.error)),
        this.state.info && this.state.info.componentStack,
      ].filter(Boolean).join("\n\n");
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", padding: 24 }}>
          <div style={{ maxWidth: 480, width: "100%", background: "#fff", border: "1px solid #FCA5A5", borderRadius: 16, padding: 26, textAlign: "center" }}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>⚠️</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 8 }}>مشکلی در نمایش این صفحه پیش اومد</div>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 18, lineHeight: 1.9 }}>
              می‌تونی اول «تلاش دوباره» رو بزنی؛ اگه دوباره همین صفحه اومد، «بارگذاری کامل» رو بزن. اگه باز هم تکرار شد، متن پایین رو برای پشتیبانی بفرست.
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 }}>
              <button onClick={() => this.setState({ error: null, info: null })} style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                تلاش دوباره
              </button>
              <button onClick={() => window.location.reload()} style={{ background: "#F1F5F9", color: "#334155", border: "none", borderRadius: 10, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                بارگذاری کامل
              </button>
            </div>
            {detail && (
              <details style={{ textAlign: "left", direction: "ltr", fontSize: 11, color: "#94A3B8", background: "#F8FAFC", borderRadius: 8, padding: 10 }}>
                <summary style={{ cursor: "pointer", marginBottom: 6 }}>جزئیات فنی خطا (برای پشتیبانی)</summary>
                <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{detail}</div>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
