/* ===== icons.js ===== */
"use strict";
/* ---------------------------------------------------------
   Icons (self-contained SVG replacements for lucide-react)
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
const { useState, useEffect, useCallback, useRef } = React;
function Icon({ size = 24, color = "currentColor", style, children, ...rest }) {
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: style, ...rest }, children));
}
const GraduationCap = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M22 10 12 5 2 10l10 5 10-5Z" }),
    React.createElement("path", { d: "M6 12.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" }),
    React.createElement("path", { d: "M22 10v6" })));
const LayoutDashboard = (p) => (React.createElement(Icon, { ...p },
    React.createElement("rect", { x: "3", y: "3", width: "7", height: "9", rx: "1" }),
    React.createElement("rect", { x: "14", y: "3", width: "7", height: "5", rx: "1" }),
    React.createElement("rect", { x: "14", y: "12", width: "7", height: "9", rx: "1" }),
    React.createElement("rect", { x: "3", y: "16", width: "7", height: "5", rx: "1" })));
const FileText = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" }),
    React.createElement("path", { d: "M14 2v6h6" }),
    React.createElement("path", { d: "M9 13h6M9 17h6M9 9h1" })));
const HelpCircle = (p) => (React.createElement(Icon, { ...p },
    React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
    React.createElement("path", { d: "M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4" }),
    React.createElement("path", { d: "M12 17h.01" })));
const Users = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
    React.createElement("circle", { cx: "9", cy: "7", r: "4" }),
    React.createElement("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
    React.createElement("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })));
const BarChart3 = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M3 3v18h18" }),
    React.createElement("rect", { x: "7", y: "12", width: "3", height: "6" }),
    React.createElement("rect", { x: "12", y: "8", width: "3", height: "10" }),
    React.createElement("rect", { x: "17", y: "5", width: "3", height: "13" })));
const Settings = (p) => (React.createElement(Icon, { ...p },
    React.createElement("circle", { cx: "12", cy: "12", r: "3" }),
    React.createElement("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.13.36.35.68.62.94.28.28.6.5.96.62.36.13.75.13 1.02.13H22a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" })));
const LogOut = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
    React.createElement("path", { d: "M16 17l5-5-5-5" }),
    React.createElement("path", { d: "M21 12H9" })));
const Eye = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" }),
    React.createElement("circle", { cx: "12", cy: "12", r: "3" })));
const EyeOff = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.06-6.06M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a20.5 20.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" }),
    React.createElement("path", { d: "M1 1l22 22" })));
const Plus = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M12 5v14M5 12h14" })));
const Trash2 = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M3 6h18" }),
    React.createElement("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
    React.createElement("path", { d: "M10 11v6M14 11v6" })));
const Clock = (p) => (React.createElement(Icon, { ...p },
    React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
    React.createElement("path", { d: "M12 6v6l4 2" })));
const ChevronLeft = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M15 18l-6-6 6-6" })));
const ChevronRight = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M9 18l6-6-6-6" })));
const CheckCircle2 = (p) => (React.createElement(Icon, { ...p },
    React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
    React.createElement("path", { d: "M9 12l2 2 4-4" })));
const Circle = (p) => (React.createElement(Icon, { ...p },
    React.createElement("circle", { cx: "12", cy: "12", r: "10" })));
const Sparkles = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" }),
    React.createElement("path", { d: "M12 8l1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2z" })));
const Download = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    React.createElement("path", { d: "M7 10l5 5 5-5" }),
    React.createElement("path", { d: "M12 15V3" })));
const Upload = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    React.createElement("path", { d: "M17 8l-5-5-5 5" }),
    React.createElement("path", { d: "M12 3v12" })));
const ArrowRight = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M5 12h14M13 6l6 6-6 6" })));
const Award = (p) => (React.createElement(Icon, { ...p },
    React.createElement("circle", { cx: "12", cy: "8", r: "6" }),
    React.createElement("path", { d: "M8.7 13.9 7 22l5-3 5 3-1.7-8.1" })));
const TrendingUp = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M23 6l-9.5 9.5-5-5L1 18" }),
    React.createElement("path", { d: "M17 6h6v6" })));
const ListChecks = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M3.5 5.5 5 7l2.5-2.5" }),
    React.createElement("path", { d: "M3.5 12.5 5 14l2.5-2.5" }),
    React.createElement("path", { d: "M3.5 19.5 5 21l2.5-2.5" }),
    React.createElement("path", { d: "M11 6h10M11 12h10M11 18h10" })));
const Percent = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M19 5 5 19" }),
    React.createElement("circle", { cx: "6.5", cy: "6.5", r: "2.5" }),
    React.createElement("circle", { cx: "17.5", cy: "17.5", r: "2.5" })));
const X = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })));
const Menu = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M4 6h16M4 12h16M4 18h16" })));
const Check = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M20 6 9 17l-5-5" })));
const Edit2 = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" })));
const AlertTriangle = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" }),
    React.createElement("path", { d: "M12 9v4M12 17h.01" })));
const MessageSquare = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })));
const MessageCircle = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" })));
const Megaphone = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "m3 11 18-5v12L3 14v-3z" }),
    React.createElement("path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" })));
const Library = (p) => (React.createElement(Icon, { ...p },
    React.createElement("path", { d: "M3 4h4v17H3z" }),
    React.createElement("path", { d: "M9 4h4v17H9z" }),
    React.createElement("path", { d: "m16 4 3.5 1-2 16.5-3.5-1z" })));
const Search = (p) => (React.createElement(Icon, { ...p },
    React.createElement("circle", { cx: "11", cy: "11", r: "8" }),
    React.createElement("path", { d: "m21 21-4.35-4.35" })));

/* ===== ui.js ===== */
"use strict";
/* ---------------------------------------------------------
   Shared utilities (KV helpers) + shared UI primitives
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
function omit(obj, keys) {
    const out = {};
    Object.keys(obj).forEach((k) => {
        if (keys.indexOf(k) === -1)
            out[k] = obj[k];
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
    }
    catch { /* localStorage unavailable — session just won't persist */ }
}
function loadSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw)
            return null;
        const s = JSON.parse(raw);
        if (!s || !s.username || !s.passwordHash || Date.now() > s.expires_at)
            return null;
        return s;
    }
    catch {
        return null;
    }
}
function clearSession() {
    try {
        localStorage.removeItem(SESSION_KEY);
    }
    catch { /* ignore */ }
}
// Revokes the session token on the server (so it can't be reused even if
// someone got hold of it) and then clears the local copy.
async function performLogout() {
    const token = getAuthToken();
    try {
        if (token)
            await fetch("/api/logout", { method: "POST", headers: authHeaders() });
    }
    catch { /* best-effort — clear locally regardless */ }
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
        if (r.status === 404)
            return null;
        if (!r.ok)
            return null;
        const data = await r.json();
        return data.v;
    }
    catch {
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
    }
    catch {
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
        if (r.ok)
            return { ok: true };
        const body = await r.json().catch(() => ({}));
        return { ok: false, error: body.error || "خطا در ذخیره‌سازی." };
    }
    catch {
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
    }
    catch {
        return { ok: false, error: "خطا در ارتباط با سرور." };
    }
}
// همه‌ی نام‌کاربری معلم‌های یک کلاس رو برمی‌گردونه — از فیلد جدید
// teacher_ids (آرایه، چون یه کلاس می‌تونه چند معلم داشته باشه) یا، برای
// رکوردهای قدیمی‌تر، از teacher_id تکی سابق.
function classTeacherIds(cls) {
    if (!cls)
        return [];
    if (Array.isArray(cls.teacher_ids))
        return cls.teacher_ids;
    return cls.teacher_id ? [cls.teacher_id] : [];
}
async function deleteKey(key) {
    try {
        await fetch(`/api/kv?key=${encodeURIComponent(key)}`, { method: "DELETE", headers: authHeaders() });
    }
    catch {
        /* ignore */
    }
}
async function listPrefix(prefix) {
    try {
        const r = await fetch(`/api/list?prefix=${encodeURIComponent(prefix)}`, { headers: authHeaders() });
        if (!r.ok)
            return [];
        const data = await r.json();
        return data.keys || [];
    }
    catch {
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
        if (!r.ok)
            return { students: [], answers: [], cheatalerts: [] };
        const data = await r.json();
        return {
            students: data.students || [],
            answers: data.answers || [],
            cheatalerts: data.cheatalerts || [],
        };
    }
    catch {
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
        if (!r.ok)
            return null;
        return await r.json();
    }
    catch {
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
        if (data.sent)
            return { sent: true, note: "" };
        const reasons = {
            "resend-not-configured": "سرویس ایمیل (RESEND_API_KEY) روی این Worker تنظیم نشده است.",
            "resend-error": `سرویس ایمیل (Resend) درخواست را رد کرد (کد ${data.status || "؟"}) — احتمالاً چون آدرس فرستنده‌ی onboarding@resend.dev فقط اجازه‌ی ارسال به ایمیل خودِ حساب Resend را می‌دهد؛ برای ارسال به هر آدرسی باید یک دامنه در Resend وریفای و RESEND_FROM تنظیم شود.`,
            "email-failed": "اتصال به سرویس ایمیل برقرار نشد.",
        };
        console.warn("send-welcome-email not sent:", data);
        return { sent: false, note: reasons[data.reason] || "ایمیل ارسال نشد." };
    }
    catch (e) {
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
    }
    catch {
        return [];
    }
}
function saveOfflineQueue(queue) {
    try {
        localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    }
    catch {
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
    if (queue.length === 0)
        return 0;
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
            }
            else {
                stillPending.push(sub);
            }
        }
        catch {
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
    }
    catch {
        /* localStorage full/unavailable — the throttled server-side save is our only fallback then */
    }
}
function getLocalDraft(key) {
    try {
        const raw = localStorage.getItem(LOCAL_DRAFT_PREFIX + key);
        return raw ? JSON.parse(raw) : null;
    }
    catch {
        return null;
    }
}
function deleteLocalDraft(key) {
    try {
        localStorage.removeItem(LOCAL_DRAFT_PREFIX + key);
    }
    catch {
        /* ignore */
    }
}
// Works for both multiple-choice answers (mark if correct) and essay answers
// that have been manually graded (awarded_mark set by the teacher).
function awardedMarkOf(a) {
    if (a.awarded_mark != null)
        return a.awarded_mark;
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
            if (!stats[tag])
                stats[tag] = { correct: 0, total: 0 };
            stats[tag].total += 1;
            if (a.is_correct)
                stats[tag].correct += 1;
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
            if (blob && blob.size <= maxBytes)
                return blob;
        }
        // حتی با کمترین کیفیت هم بزرگه؛ همون آخرین (کوچیک‌ترین) نسخه رو بده
        return await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.2));
    }
    catch {
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
    return (React.createElement("div", { style: { marginBottom: 16 } },
        React.createElement("label", { style: { display: "block", fontSize: 13, fontWeight: 600, color: "#3A4A63", marginBottom: 6 } }, label),
        children));
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
    return (React.createElement("input", { ...props, onFocus: (e) => { setFocus(true); props.onFocus?.(e); }, onBlur: (e) => { setFocus(false); props.onBlur?.(e); }, style: { ...inputStyle, borderColor: focus ? "#2563EB" : "#E2E8F0", ...(props.style || {}) } }));
}
function Button(props) {
    const children = props.children;
    const variant = props.variant || "primary";
    const style = props.style;
    const rest = {};
    Object.keys(props).forEach((k) => {
        if (k !== "children" && k !== "variant" && k !== "style")
            rest[k] = props[k];
    });
    const variants = {
        primary: { background: "#2563EB", color: "#fff", border: "none" },
        ghost: { background: "#fff", color: "#334155", border: "1.5px solid #E2E8F0" },
        danger: { background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" },
        success: { background: "#16A34A", color: "#fff", border: "none" },
    };
    return (React.createElement("button", { ...rest, style: {
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
        }, onMouseDown: (e) => (e.currentTarget.style.transform = "scale(0.98)"), onMouseUp: (e) => (e.currentTarget.style.transform = "scale(1)") }, children));
}
function StatCard({ icon: IconCmp, label, value, delta, color }) {
    return (React.createElement("div", { style: {
            background: "#fff", borderRadius: 16, padding: "20px 22px", flex: 1,
            border: "1px solid #EEF1F6", minWidth: 180,
        } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 13, color: "#64748B", fontWeight: 600, marginBottom: 10 } }, label),
                React.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: "#1E293B" } }, value)),
            React.createElement("div", { style: {
                    width: 42, height: 42, borderRadius: 12, background: color + "1A",
                    display: "flex", alignItems: "center", justifyContent: "center", color,
                } },
                React.createElement(IconCmp, { size: 20 }))),
        delta && React.createElement("div", { style: { fontSize: 12, color: "#16A34A", marginTop: 10, fontWeight: 600 } }, delta)));
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
    return (React.createElement("span", { style: {
            background: t.bg, color: t.fg, fontSize: 12, fontWeight: 700,
            padding: "4px 10px", borderRadius: 999, display: "inline-block",
        } }, children));
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
    if (!text)
        return [];
    const parts = [];
    const regex = /\$\$([^$]+?)\$\$|\$([^$\n]+?)\$/g;
    let lastIndex = 0, m;
    while ((m = regex.exec(text)) !== null) {
        if (m.index > lastIndex)
            parts.push({ type: "text", content: text.slice(lastIndex, m.index) });
        if (m[1] !== undefined)
            parts.push({ type: "math", content: m[1], display: true });
        else
            parts.push({ type: "math", content: m[2], display: false });
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length)
        parts.push({ type: "text", content: text.slice(lastIndex) });
    return parts;
}
// Renders text that may contain $...$ / $$...$$ LaTeX formulas.
// Falls back to plain text (and never throws) if KaTeX isn't loaded
// or a formula has a syntax error.
function MathText({ text, style }) {
    if (!text)
        return null;
    const segments = splitMathSegments(String(text));
    return (React.createElement("span", { style: { whiteSpace: "pre-wrap", ...style } }, segments.map((seg, i) => {
        if (seg.type === "text")
            return React.createElement(React.Fragment, { key: i }, seg.content);
        let html;
        try {
            html = window.katex
                ? window.katex.renderToString(seg.content, { throwOnError: false, displayMode: !!seg.display })
                : null;
        }
        catch {
            html = null;
        }
        if (html == null)
            return React.createElement(React.Fragment, { key: i }, "$" + seg.content + "$");
        return React.createElement("span", { key: i, dangerouslySetInnerHTML: { __html: html } });
    })));
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
    if (!el)
        return;
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
        }
        catch { /* ignore */ }
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
        return (React.createElement("button", { type: "button", onClick: () => setOpen(true), style: {
                padding: "5px 10px", fontSize: 12, borderRadius: 7, border: "1px dashed #CBD5E1",
                background: "#fff", color: "#64748B", cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
            } }, toggleLabel));
    }
    return (React.createElement("div", { style: { marginBottom: 2 } },
        React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 5 } }, symbols.map((s) => (React.createElement("button", { key: s.label, type: "button", title: s.label, onClick: () => insertAtCursor(targetRef.current, setValue, wrap(s.tex)), style: {
                padding: "4px 9px", fontSize: 12, borderRadius: 7, border: "1px solid #DBEAFE",
                background: "#F8FAFC", color: "#1E3A8A", cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
            } }, s.label)))),
        React.createElement("span", { onClick: () => setOpen(false), style: { fontSize: 11, color: "#94A3B8", cursor: "pointer" } }, "\u0628\u0633\u062A\u0646 \u0646\u0648\u0627\u0631 \u0646\u0645\u0627\u062F\u0647\u0627")));
}
// Combines the math/physics group and the chemistry group above a field.
function MathToolbar({ targetRef, setValue }) {
    return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 7 } },
        React.createElement(SymbolToolbarGroup, { targetRef: targetRef, setValue: setValue, symbols: MATH_SYMBOLS, toggleLabel: "\u2211 \u0627\u0641\u0632\u0648\u062F\u0646 \u0641\u0631\u0645\u0648\u0644 \u0631\u06CC\u0627\u0636\u06CC/\u0641\u06CC\u0632\u06CC\u06A9", wrap: (tex) => `$${tex}$` }),
        React.createElement(SymbolToolbarGroup, { targetRef: targetRef, setValue: setValue, symbols: CHEM_SYMBOLS, toggleLabel: "\u2697 \u0627\u0641\u0632\u0648\u062F\u0646 \u0641\u0631\u0645\u0648\u0644 \u0634\u06CC\u0645\u06CC", wrap: (tex) => `$\\ce{${tex}}$` })));
}
// A textarea for math-friendly free text: symbol toolbar on top,
// live formula preview below (only shown once the field contains "$").
function MathTextarea({ value, onChange, rows, placeholder, style }) {
    const ref = useRef(null);
    const setValue = (v) => onChange({ target: { value: v } });
    return (React.createElement("div", null,
        React.createElement(MathToolbar, { targetRef: ref, setValue: setValue }),
        React.createElement("textarea", { ref: ref, value: value, onChange: onChange, rows: rows || 3, placeholder: placeholder, style: { ...inputStyle, resize: "vertical", fontFamily: "inherit", ...(style || {}) } }),
        value && value.includes("$") && (React.createElement("div", { style: { marginTop: 7, padding: "9px 12px", background: "#F8FAFC", borderRadius: 8, border: "1px dashed #DBEAFE" } },
            React.createElement("div", { style: { fontSize: 11, color: "#94A3B8", marginBottom: 4, fontWeight: 600 } }, "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634:"),
            React.createElement(MathText, { text: value })))));
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
    return (React.createElement("button", { onClick: onClick, "aria-label": "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0645\u0646\u0648", style: {
            position: "fixed", top: 14, right: 14, zIndex: 10001,
            width: 42, height: 42, borderRadius: 12, border: "none",
            background: accent || "#2563EB", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,.22)", cursor: "pointer", padding: 0,
        } },
        React.createElement(Menu, { size: 20 })));
}
// پس‌زمینه‌ی نیم‌شفافِ پشتِ کشوی باز — با زدنش کشو بسته می‌شه.
function MobileSidebarBackdrop({ onClick }) {
    return (React.createElement("div", { onClick: onClick, style: { position: "fixed", inset: 0, background: "rgba(15,23,42,.45)", zIndex: 9998 } }));
}
// خط جداکننده‌ی کم‌رنگ بین گروه‌های منو (مثلاً «محتوا» از «افراد» از
// «ارتباط»)، برای اسکن راحت‌تر چشم روی فهرست ۹-۱۰ آیتمی.
function SidebarDivider() {
    return React.createElement("div", { style: { height: 1, background: "#22385F", margin: "8px 8px 10px" } });
}
function Sidebar({ active, onNavigate, onLogout, teacherName, onHelp, brandColor, logoUrl, badges, hiddenKeys }) {
    const accent = brandColor || "#2563EB";
    // اگه رنگ برند مدرسه خیلی روشن باشه (مثلاً زرد)، متن سفیدِ آیتم فعال
    // خوانا نمی‌مونه — با این تخمینِ سادهٔ روشنایی، برای رنگ‌های روشن به‌جای
    // سفید از متن تیره استفاده می‌کنیم.
    const activeTextColor = (() => {
        const hex = (accent || "").replace("#", "");
        if (hex.length !== 6)
            return "#fff";
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
        return React.createElement(MobileMenuButton, { onClick: () => setMobileOpen(true), accent: accent });
    }
    return (React.createElement(React.Fragment, null,
        isMobile && React.createElement(MobileSidebarBackdrop, { onClick: () => setMobileOpen(false) }),
        React.createElement("div", { style: {
                width: 230, background: "#132A52", minHeight: "100%", display: "flex",
                flexDirection: "column", flexShrink: 0,
                ...(isMobile ? { position: "fixed", top: 0, bottom: 0, right: 0, zIndex: 9999, boxShadow: "-8px 0 24px rgba(0,0,0,.25)", overflowY: "auto" } : {}),
            } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "22px 20px", borderBottom: "1px solid #22385F" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                    React.createElement("div", { style: { width: 34, height: 34, borderRadius: 9, background: accent, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" } }, logoUrl ? React.createElement("img", { src: logoUrl, alt: "\u0644\u0648\u06AF\u0648", style: { width: "100%", height: "100%", objectFit: "contain" } }) : React.createElement(GraduationCap, { size: 19, color: "#fff" })),
                    React.createElement("span", { style: { color: "#fff", fontWeight: 800, fontSize: 17 } }, "\u0622\u0632\u0645\u0648\u0646\u200C\u0633\u0627\u0632")),
                isMobile && (React.createElement(X, { size: 20, color: "#AAB8D1", style: { cursor: "pointer" }, onClick: () => setMobileOpen(false) }))),
            React.createElement("div", { style: { padding: "14px 12px", flex: 1 } },
                items.map((it, i) => {
                    const isActive = active === it.key;
                    const IconCmp = it.icon;
                    const showDivider = i > 0 && items[i - 1].group !== it.group;
                    return (React.createElement(React.Fragment, { key: it.key },
                        showDivider && React.createElement(SidebarDivider, null),
                        React.createElement("div", { className: "sidebar-item", onClick: () => navigate(it.key), style: {
                                display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
                                borderRadius: 10, cursor: "pointer", marginBottom: 4,
                                background: isActive ? accent : "transparent",
                                color: isActive ? activeTextColor : "#AAB8D1",
                                fontSize: 14, fontWeight: 600, transition: "background .15s",
                            } },
                            React.createElement(IconCmp, { size: 17 }),
                            it.label,
                            badges && badges[it.key] > 0 && (React.createElement("span", { style: {
                                    marginRight: "auto", background: "#EF4444", color: "#fff", fontSize: 10.5, fontWeight: 800,
                                    borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px", display: "flex", alignItems: "center", justifyContent: "center",
                                } }, badges[it.key])))));
                }),
                onHelp && (React.createElement("div", { className: "sidebar-item", onClick: () => { onHelp(); setMobileOpen(false); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", marginBottom: 4, color: "#AAB8D1", fontSize: 14, fontWeight: 600 } },
                    React.createElement(HelpCircle, { size: 17 }),
                    "\u0631\u0627\u0647\u0646\u0645\u0627"))),
            React.createElement("div", { style: { padding: 12, borderTop: "1px solid #22385F" } },
                React.createElement("div", { style: { fontSize: 12, color: "#7C8CAE", padding: "6px 14px 12px" } }, teacherName),
                React.createElement("div", { className: "sidebar-item", onClick: onLogout, style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", color: "#F87171", fontSize: 14, fontWeight: 600 } },
                    React.createElement(LogOut, { size: 17 }),
                    "\u062E\u0631\u0648\u062C"),
                React.createElement("div", { style: { fontSize: 10, color: "#4B5C81", textAlign: "center", padding: "10px 14px 2px", letterSpacing: 0.3 } },
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " ghobeishawi \u2014 \u062A\u0645\u0627\u0645\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A")))));
}
// عکس پروفایل رو با هدر Authorization می‌گیره (چون <img src> نمی‌تونه هدر
// بفرسته) و به‌صورت object URL محلی نشون می‌ده؛ اگه عکسی ثبت نشده باشه یا
// خطا بخوره، یک دایره‌ی رنگی با حرف اول اسم نشون داده می‌شه.
function Avatar({ username, name, size = 38, updatedAt, color = "#2563EB" }) {
    const [src, setSrc] = useState(null);
    useEffect(() => {
        if (!username || !updatedAt) {
            setSrc(null);
            return;
        }
        let objectUrl = null;
        let cancelled = false;
        (async () => {
            try {
                const r = await fetch(`/api/profile-photo?username=${encodeURIComponent(username)}&v=${encodeURIComponent(updatedAt)}`, { headers: authHeaders() });
                if (!r.ok)
                    throw new Error();
                const blob = await r.blob();
                objectUrl = URL.createObjectURL(blob);
                if (!cancelled)
                    setSrc(objectUrl);
            }
            catch {
                if (!cancelled)
                    setSrc(null);
            }
        })();
        return () => { cancelled = true; if (objectUrl)
            URL.revokeObjectURL(objectUrl); };
    }, [username, updatedAt]);
    if (src) {
        return (React.createElement("img", { src: src, alt: name || username || "کاربر", style: { width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 } }));
    }
    return (React.createElement("div", { style: {
            width: size, height: size, borderRadius: "50%", background: color, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
            fontSize: Math.round(size * 0.37), flexShrink: 0,
        } }, name?.[0] || "م"));
}
function TopBar({ title, teacherName, avatarUsername, avatarUpdatedAt }) {
    const today = new Date().toLocaleDateString("fa-IR");
    return (React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 } },
        React.createElement("h1", { style: { fontSize: 24, fontWeight: 800, color: "#1E293B", margin: 0 } }, title),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } },
            React.createElement("span", { style: { fontSize: 13, color: "#64748B" } }, today),
            React.createElement(Avatar, { username: avatarUsername, name: teacherName, updatedAt: avatarUpdatedAt, size: 38 }))));
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
        if (!file)
            return;
        setMsg("");
        try {
            const blob = await compressImageToBlob(file, 150 * 1024, 400);
            const dataUrl = await blobToDataUrl(blob);
            setLogoDataUrl(dataUrl);
        }
        catch {
            setMsg("بارگذاری لوگو ممکن نشد.");
        }
    };
    const save = async () => {
        setSaving(true);
        setMsg("");
        try {
            await onSave({ color, logo_data_url: logoDataUrl });
            setMsg("ذخیره شد.");
        }
        catch {
            setMsg("خطا در ذخیره‌سازی.");
        }
        setSaving(false);
    };
    return (React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 18 } },
            React.createElement("div", { style: {
                    width: 56, height: 56, borderRadius: 12, background: "#F1F5F9", border: "1.5px solid #E2E8F0",
                    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0,
                } }, logoDataUrl ? (React.createElement("img", { src: logoDataUrl, alt: "\u0644\u0648\u06AF\u0648\u06CC \u0645\u062F\u0631\u0633\u0647", style: { width: "100%", height: "100%", objectFit: "contain" } })) : (React.createElement(GraduationCap, { size: 26, color: "#94A3B8" }))),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
                React.createElement("label", { style: {
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
                        fontSize: 12.5, fontWeight: 700, cursor: "pointer", background: "#fff", color: "#334155",
                        border: "1.5px solid #E2E8F0", width: "fit-content",
                    } },
                    "\u0627\u0646\u062A\u062E\u0627\u0628 \u0644\u0648\u06AF\u0648",
                    React.createElement("input", { type: "file", accept: "image/*", onChange: pickLogo, style: { display: "none" } })),
                logoDataUrl && (React.createElement("span", { onClick: () => setLogoDataUrl(null), style: { fontSize: 11.5, color: "#DC2626", cursor: "pointer" } }, "\u062D\u0630\u0641 \u0644\u0648\u06AF\u0648")))),
        React.createElement(Field, { label: "\u0631\u0646\u06AF \u0627\u062E\u062A\u0635\u0627\u0635\u06CC \u0645\u062F\u0631\u0633\u0647" },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                React.createElement("input", { type: "color", value: color, onChange: (e) => setColor(e.target.value), style: { width: 44, height: 38, borderRadius: 8, border: "1.5px solid #E2E8F0", padding: 2, cursor: "pointer" } }),
                React.createElement(TextInput, { value: color, onChange: (e) => setColor(e.target.value), style: { maxWidth: 140 } }))),
        msg && React.createElement("div", { style: { fontSize: 12.5, color: msg === "ذخیره شد." ? "#16A34A" : "#DC2626", marginBottom: 10 } }, msg),
        React.createElement(Button, { onClick: save, disabled: saving }, saving ? "در حال ذخیره..." : "ذخیره‌ی برندینگ")));
}
/* ---------------------------------------------------------
   AUTH SCREENS
--------------------------------------------------------- */
function EmptyState({ text, actionLabel, onAction }) {
    return (React.createElement("div", { style: { textAlign: "center", padding: "40px 20px" } },
        React.createElement("div", { style: { fontSize: 14, color: "#64748B", marginBottom: 16 } }, text),
        actionLabel && React.createElement(Button, { onClick: onAction },
            React.createElement(Plus, { size: 16 }),
            actionLabel)));
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
        if (!canvasRef.current || typeof window === "undefined" || !window.Chart)
            return;
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
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
        return () => { if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        } };
    }, [JSON.stringify(labels), JSON.stringify(values), color]);
    if (typeof window === "undefined" || !window.Chart) {
        return React.createElement("div", { style: { color: "#94A3B8", fontSize: 13, textAlign: "center", padding: 20 } }, "\u0646\u0645\u0648\u062F\u0627\u0631 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A (\u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A).");
    }
    return React.createElement("div", { style: { height } },
        React.createElement("canvas", { ref: canvasRef }));
}
function Modal({ title, children, onClose }) {
    return (React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(15,23,42,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }, onClick: onClose },
        React.createElement("div", { style: { background: "#fff", borderRadius: 18, padding: 26, width: "100%", maxWidth: 420, maxHeight: "88vh", overflowY: "auto" }, onClick: (e) => e.stopPropagation() },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 } },
                React.createElement("div", { style: { fontSize: 17, fontWeight: 800, color: "#1E293B" } }, title),
                React.createElement("div", { onClick: onClose, style: { display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, cursor: "pointer", marginLeft: -8 } },
                    React.createElement(X, { size: 18, color: "#94A3B8" }))),
            children)));
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
    const Row = ({ s }) => (React.createElement("div", { onClick: () => pick(s.id), style: {
            display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: 8, cursor: "pointer",
            background: value === s.id ? "#EFF6FF" : "transparent",
        } },
        React.createElement("div", { style: {
                width: 18, height: 18, borderRadius: "50%", border: `2px solid ${value === s.id ? "#2563EB" : "#CBD5E1"}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            } }, value === s.id && React.createElement("div", { style: { width: 9, height: 9, borderRadius: "50%", background: "#2563EB" } })),
        React.createElement("span", { style: { fontSize: 14, color: "#1E293B" } }, s.fullname)));
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { onClick: () => setOpen(true), style: { ...inputStyle, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" } },
            React.createElement("span", { style: { color: selected ? "#1E293B" : "#94A3B8" } }, selected ? `${selected.fullname}${selectedClass ? ` (${selectedClass.name})` : ""}` : placeholder),
            React.createElement(ChevronLeft, { size: 16, style: { color: "#94A3B8" } })),
        open && (React.createElement(Modal, { title: "\u0627\u0646\u062A\u062E\u0627\u0628 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632", onClose: close },
            React.createElement("div", { style: { position: "relative", marginBottom: 14 } },
                React.createElement(Search, { size: 15, style: { position: "absolute", top: 12, right: 12, color: "#94A3B8" } }),
                React.createElement("input", { autoFocus: true, value: q, onChange: (e) => setQ(e.target.value), placeholder: "\u062C\u0633\u062A\u062C\u0648\u06CC \u0646\u0627\u0645 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632...", style: { ...inputStyle, paddingRight: 36 } })),
            React.createElement("div", { style: { maxHeight: 360, overflowY: "auto" } },
                groups.length === 0 && noClassStudents.length === 0 && (React.createElement("div", { style: { fontSize: 13, color: "#94A3B8", textAlign: "center", padding: "20px 0" } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.")),
                groups.map((g) => (React.createElement("div", { key: g.id, style: { marginBottom: 14 } },
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 800, color: "#64748B", marginBottom: 6, padding: "0 4px" } }, g.name),
                    g.students.map((s) => React.createElement(Row, { key: s.id, s: s }))))),
                noClassStudents.length > 0 && (React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 800, color: "#64748B", marginBottom: 6, padding: "0 4px" } }, "\u0628\u062F\u0648\u0646 \u06A9\u0644\u0627\u0633"),
                    noClassStudents.map((s) => React.createElement(Row, { key: s.id, s: s })))))))));
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
        if (!qLine) {
            errors.push(idx + 1);
            return;
        }
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
        if (!optA || !optB || !optC || !optD || !ansLine) {
            errors.push(idx + 1);
            return;
        }
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
    return (React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 5 } },
        React.createElement("span", { style: { width: 9, height: 9, borderRadius: 3, background: color, display: "inline-block" } }),
        label));
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
            return (React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", padding: 24 } },
                React.createElement("div", { style: { maxWidth: 480, width: "100%", background: "#fff", border: "1px solid #FCA5A5", borderRadius: 16, padding: 26, textAlign: "center" } },
                    React.createElement("div", { style: { fontSize: 38, marginBottom: 10 } }, "\u26A0\uFE0F"),
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 8 } }, "\u0645\u0634\u06A9\u0644\u06CC \u062F\u0631 \u0646\u0645\u0627\u06CC\u0634 \u0627\u06CC\u0646 \u0635\u0641\u062D\u0647 \u067E\u06CC\u0634 \u0627\u0648\u0645\u062F"),
                    React.createElement("div", { style: { fontSize: 13, color: "#64748B", marginBottom: 18, lineHeight: 1.9 } }, "\u0645\u06CC\u200C\u062A\u0648\u0646\u06CC \u0627\u0648\u0644 \u00AB\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647\u00BB \u0631\u0648 \u0628\u0632\u0646\u06CC\u061B \u0627\u06AF\u0647 \u062F\u0648\u0628\u0627\u0631\u0647 \u0647\u0645\u06CC\u0646 \u0635\u0641\u062D\u0647 \u0627\u0648\u0645\u062F\u060C \u00AB\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0627\u0645\u0644\u00BB \u0631\u0648 \u0628\u0632\u0646. \u0627\u06AF\u0647 \u0628\u0627\u0632 \u0647\u0645 \u062A\u06A9\u0631\u0627\u0631 \u0634\u062F\u060C \u0645\u062A\u0646 \u067E\u0627\u06CC\u06CC\u0646 \u0631\u0648 \u0628\u0631\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0628\u0641\u0631\u0633\u062A."),
                    React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 } },
                        React.createElement("button", { onClick: () => this.setState({ error: null, info: null }), style: { background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" } }, "\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647"),
                        React.createElement("button", { onClick: () => window.location.reload(), style: { background: "#F1F5F9", color: "#334155", border: "none", borderRadius: 10, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" } }, "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0627\u0645\u0644")),
                    detail && (React.createElement("details", { style: { textAlign: "left", direction: "ltr", fontSize: 11, color: "#94A3B8", background: "#F8FAFC", borderRadius: 8, padding: 10 } },
                        React.createElement("summary", { style: { cursor: "pointer", marginBottom: 6 } }, "\u062C\u0632\u0626\u06CC\u0627\u062A \u0641\u0646\u06CC \u062E\u0637\u0627 (\u0628\u0631\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC)"),
                        React.createElement("div", { style: { whiteSpace: "pre-wrap", wordBreak: "break-word" } }, detail))))));
        }
        return this.props.children;
    }
}

/* ===== auth-screens.js ===== */
"use strict";
/* ---------------------------------------------------------
   AUTH SCREENS (login / register / password reset)
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
function ForgotPasswordScreen({ goLogin }) {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const submit = async () => {
        setError("");
        if (!username) {
            setError("نام کاربری را وارد کنید.");
            return;
        }
        setLoading(true);
        try {
            await fetch("/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });
        }
        catch {
            /* ignore — always show the same generic message */
        }
        setLoading(false);
        setSent(true);
    };
    const handleKeyDown = (e) => { if (e.key === "Enter")
        submit(); };
    return (React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#132A52,#1D3E73)", padding: 20 } },
        React.createElement("div", { style: { width: "100%", maxWidth: 420, background: "#fff", borderRadius: 22, padding: "40px 36px", boxShadow: "0 20px 60px rgba(19,42,82,.35)" } },
            React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631"),
            sent ? (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { fontSize: 13, color: "#334155", lineHeight: 1.9, marginBottom: 22 } }, "\u0627\u06AF\u0631 \u0627\u06CC\u0646 \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u062F\u0631 \u0633\u0627\u0645\u0627\u0646\u0647 \u062B\u0628\u062A \u0634\u062F\u0647 \u0628\u0627\u0634\u062F\u060C \u0627\u06CC\u0645\u06CC\u0644\u06CC \u062D\u0627\u0648\u06CC \u0644\u06CC\u0646\u06A9 \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0631\u0627\u06CC \u0634\u0645\u0627 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F. \u0635\u0646\u062F\u0648\u0642 \u0627\u06CC\u0645\u06CC\u0644 \u062E\u0648\u062F \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646\u06CC\u062F (\u067E\u0648\u0634\u0647\u200C\u06CC \u0627\u0633\u067E\u0645 \u0631\u0627 \u0647\u0645 \u0686\u06A9 \u06A9\u0646\u06CC\u062F)."),
                React.createElement(Button, { type: "button", onClick: goLogin, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 } }, "\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0648\u0631\u0648\u062F"))) : (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { fontSize: 13, color: "#64748B", marginBottom: 26 } }, "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F \u062A\u0627 \u0644\u06CC\u0646\u06A9 \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0628\u0647 \u0627\u06CC\u0645\u06CC\u0644 \u062B\u0628\u062A\u200C\u0634\u062F\u0647\u200C\u062A\u0627\u0646 \u0627\u0631\u0633\u0627\u0644 \u0634\u0648\u062F."),
                React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" },
                    React.createElement(TextInput, { value: username, onChange: (e) => setUsername(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" })),
                error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
                React.createElement(Button, { type: "button", onClick: submit, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: loading }, loading ? "در حال ارسال..." : "ارسال لینک بازیابی"),
                React.createElement("div", { style: { textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748B" } },
                    React.createElement("span", { onClick: goLogin, style: { color: "#2563EB", fontWeight: 700, cursor: "pointer" } }, "\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0648\u0631\u0648\u062F")))))));
}
function ResetPasswordScreen({ token, onDone }) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // null | "ok" | "invalid"
    const submit = async () => {
        setError("");
        if (!password || !confirm) {
            setError("هر دو فیلد را پر کنید.");
            return;
        }
        if (password.length < 8) {
            setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        if (password !== confirm) {
            setError("رمز عبور و تکرار آن یکسان نیستند.");
            return;
        }
        setLoading(true);
        try {
            const r = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword: await hashPassword(password) }),
            });
            setStatus(r.ok ? "ok" : "invalid");
        }
        catch {
            setStatus("invalid");
        }
        setLoading(false);
    };
    return (React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#132A52,#1D3E73)", padding: 20 } },
        React.createElement("div", { style: { width: "100%", maxWidth: 420, background: "#fff", borderRadius: 22, padding: "40px 36px", boxShadow: "0 20px 60px rgba(19,42,82,.35)" } },
            React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u062A\u0646\u0638\u06CC\u0645 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F"),
            status === "ok" ? (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { fontSize: 13, color: "#16A34A", lineHeight: 1.9, marginBottom: 22 } }, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F. \u062D\u0627\u0644\u0627 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC\u062F \u0628\u0627 \u0631\u0645\u0632 \u062C\u062F\u06CC\u062F \u0648\u0627\u0631\u062F \u0634\u0648\u06CC\u062F."),
                React.createElement(Button, { type: "button", onClick: onDone, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 } }, "\u0648\u0631\u0648\u062F \u0628\u0647 \u0633\u0627\u0645\u0627\u0646\u0647"))) : status === "invalid" ? (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { fontSize: 13, color: "#DC2626", lineHeight: 1.9, marginBottom: 22 } }, "\u0644\u06CC\u0646\u06A9 \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A \u06CC\u0627 \u0645\u0646\u0642\u0636\u06CC \u0634\u062F\u0647. \u062F\u0648\u0628\u0627\u0631\u0647 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u062F\u0647\u06CC\u062F."),
                React.createElement(Button, { type: "button", onClick: onDone, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 } }, "\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0648\u0631\u0648\u062F"))) : (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { fontSize: 13, color: "#64748B", marginBottom: 26 } }, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F."),
                React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" },
                    React.createElement(TextInput, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" })),
                React.createElement(Field, { label: "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" },
                    React.createElement(TextInput, { type: "password", value: confirm, onChange: (e) => setConfirm(e.target.value), placeholder: "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" })),
                error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
                React.createElement(Button, { type: "button", onClick: submit, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: loading }, loading ? "در حال ثبت..." : "ثبت رمز عبور جدید"))))));
}
/* ---------------------------------------------------------
   Backend: Cloudflare Pages Functions + KV
   These call same-origin /api/kv and /api/list endpoints
   (see functions/api/kv.js and functions/api/list.js).
   No config needed here — the KV binding is set up on the
   Cloudflare Pages project dashboard, not in this file.
--------------------------------------------------------- */
function LoginScreen({ onLogin, goRegister, allowRegister, goForgot, portalMode, setPortalMode, portalData }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const isMobile = useIsMobile();
    const submit = async () => {
        setError("");
        if (!username || !password) {
            setError("نام کاربری و رمز عبور را وارد کنید.");
            return;
        }
        setLoading(true);
        let teacher = null;
        let errMsg = "";
        try {
            const passwordHash = await hashPassword(password);
            const r = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, passwordHash }),
            });
            const data = await r.json().catch(() => ({}));
            if (r.ok) {
                teacher = data.teacher;
                saveSession(teacher.username, teacher.password, data.token);
            }
            else {
                errMsg = data.error || "";
            }
        }
        catch { /* handled by teacher===null below */ }
        setLoading(false);
        if (!teacher) {
            setError(errMsg || "نام کاربری یا رمز عبور اشتباه است.");
            return;
        }
        onLogin(teacher);
    };
    const handleKeyDown = (e) => { if (e.key === "Enter")
        submit(); };
    return (React.createElement("div", { style: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#132A52,#1D3E73)", padding: isMobile ? 14 : 20 } },
        React.createElement("div", { style: { display: "flex", flexDirection: isMobile ? "column" : "row", width: "100%", maxWidth: 860, background: "#fff", borderRadius: 22, overflow: "hidden", boxShadow: "0 20px 60px rgba(19,42,82,.35)" } },
            React.createElement("div", { style: {
                    flex: isMobile ? "none" : 1, minWidth: isMobile ? "auto" : 260,
                    height: isMobile ? 130 : "auto",
                    backgroundImage: "url('assets/login-hero.jpg')",
                    backgroundSize: "cover", backgroundPosition: "center",
                } }),
            React.createElement("div", { style: { flex: isMobile ? "none" : 1.15, padding: isMobile ? "24px 20px" : "44px 40px", display: "flex", flexDirection: "column" } },
                React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: isMobile ? 18 : 24 } },
                    React.createElement("div", { onClick: () => setPortalMode && setPortalMode("teacher"), style: {
                            flex: 1, textAlign: "center", padding: "10px 4px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700,
                            background: portalMode !== "student" ? "#2563EB" : "#F1F5F9", color: portalMode !== "student" ? "#fff" : "#475569",
                        } }, "\u0648\u0631\u0648\u062F \u0645\u0639\u0644\u0645"),
                    React.createElement("div", { onClick: () => setPortalMode && setPortalMode("student"), style: {
                            flex: 1, textAlign: "center", padding: "10px 4px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700,
                            background: portalMode === "student" ? "#2563EB" : "#F1F5F9", color: portalMode === "student" ? "#fff" : "#475569",
                        } }, "\u067E\u0631\u062A\u0627\u0644 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC")),
                portalMode === "student" ? (React.createElement(StudentPortalScreen, { ...portalData })) : (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { fontSize: 13, color: "#64748B", marginBottom: 26 } }, "\u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0645 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646."),
                    React.createElement("div", null,
                        React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" },
                            React.createElement(TextInput, { value: username, onChange: (e) => setUsername(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0645\u062B\u0644\u0627\u064B: ali_teacher" })),
                        React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631" },
                            React.createElement("div", { style: { position: "relative" } },
                                React.createElement(TextInput, { type: showPw ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", style: { paddingLeft: 40 } }),
                                React.createElement("span", { onClick: () => setShowPw((s) => !s), style: { position: "absolute", left: 12, top: 12, cursor: "pointer", color: "#94A3B8" } }, showPw ? React.createElement(EyeOff, { size: 17 }) : React.createElement(Eye, { size: 17 })))),
                        React.createElement("div", { style: { textAlign: "left", marginBottom: 14, marginTop: -6 } },
                            React.createElement("span", { onClick: goForgot, style: { color: "#2563EB", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0641\u0631\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F\u061F")),
                        error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
                        React.createElement(Button, { type: "button", onClick: submit, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: loading }, loading ? "در حال ورود..." : "ورود")),
                    allowRegister && (React.createElement("div", { style: { textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748B" } },
                        "\u062D\u0633\u0627\u0628 \u0646\u062F\u0627\u0631\u06CC\u061F",
                        " ",
                        React.createElement("span", { onClick: goRegister, style: { color: "#2563EB", fontWeight: 700, cursor: "pointer" } }, "\u062B\u0628\u062A\u200C\u0646\u0627\u0645"))))))),
        React.createElement("div", { style: { textAlign: "center", marginTop: 16, fontSize: 11, color: "#8FA3C9", letterSpacing: 0.3 } },
            "\u00A9 ",
            new Date().getFullYear(),
            " ghobeishawi \u2014 \u062A\u0645\u0627\u0645\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A")));
}
function RegisterScreen({ onRegistered, goLogin }) {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        setError("");
        if (!fullname || !username || !password || !email) {
            setError("همه فیلدها را پر کنید.");
            return;
        }
        if (password.length < 8) {
            setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("ایمیل معتبر نیست.");
            return;
        }
        setLoading(true);
        let teacher = null;
        let errMsg = "";
        try {
            const passwordHash = await hashPassword(password);
            const r = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, fullname, email, passwordHash }),
            });
            const data = await r.json().catch(() => ({}));
            if (r.ok) {
                teacher = data.teacher;
                saveSession(teacher.username, teacher.password, data.token);
            }
            else {
                errMsg = data.error || "";
            }
        }
        catch { /* handled by teacher===null below */ }
        setLoading(false);
        if (!teacher) {
            setError(errMsg || "این نام کاربری قبلاً ثبت شده است.");
            return;
        }
        onRegistered(teacher);
    };
    const handleKeyDown = (e) => { if (e.key === "Enter")
        submit(); };
    return (React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#132A52,#1D3E73)", padding: 20 } },
        React.createElement("div", { style: { width: "100%", maxWidth: 420, background: "#fff", borderRadius: 22, padding: "40px 36px", boxShadow: "0 20px 60px rgba(19,42,82,.35)" } },
            React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u0645\u062F\u06CC\u0631 \u0645\u062F\u0631\u0633\u0647 (\u0641\u0642\u0637 \u06CC\u06A9\u200C\u0628\u0627\u0631)"),
            React.createElement("div", { style: { fontSize: 13, color: "#64748B", marginBottom: 26 } }, "\u0627\u06CC\u0646 \u062D\u0633\u0627\u0628\u060C \u062D\u0633\u0627\u0628 \u0645\u062F\u06CC\u0631 \u0645\u062F\u0631\u0633\u0647 \u0627\u0633\u062A. \u0627\u0632 \u0627\u06CC\u0646 \u062D\u0633\u0627\u0628 \u0628\u0631\u0627\u06CC \u0633\u0627\u062E\u062A\u0646 \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0645\u0627\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0628\u0639\u062F \u0627\u0632 \u0633\u0627\u062E\u062A\u060C \u0627\u0645\u06A9\u0627\u0646 \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u062F\u06CC\u06AF\u0631 \u0628\u0633\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."),
            React.createElement("div", null,
                React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC" },
                    React.createElement(TextInput, { value: fullname, onChange: (e) => setFullname(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0632\u0647\u0631\u0627 \u0627\u062D\u0645\u062F\u06CC" })),
                React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" },
                    React.createElement(TextInput, { value: username, onChange: (e) => setUsername(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u06CC\u06A9 \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u06CC\u06A9\u062A\u0627" })),
                React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631" },
                    React.createElement(TextInput, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631" })),
                React.createElement(Field, { label: "\u0627\u06CC\u0645\u06CC\u0644" },
                    React.createElement(TextInput, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0628\u0631\u0627\u06CC \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F" })),
                error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
                React.createElement(Button, { type: "button", onClick: submit, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: loading }, loading ? "در حال ثبت..." : "ثبت‌نام")),
            React.createElement("div", { style: { textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748B" } },
                "\u0642\u0628\u0644\u0627\u064B \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0631\u062F\u06CC\u061F",
                " ",
                React.createElement("span", { onClick: goLogin, style: { color: "#2563EB", fontWeight: 700, cursor: "pointer" } }, "\u0648\u0631\u0648\u062F")))));
}
/* ---------------------------------------------------------
   DASHBOARD
--------------------------------------------------------- */

/* ===== screens-exams.js ===== */
"use strict";
/* ---------------------------------------------------------
   DASHBOARD, EXAMS LIST, QUESTIONS, QUESTION BANK
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
function DashboardScreen({ teacher, exams, questions, students, answers, onNavigate, onOpenExam }) {
    const myExams = exams.filter((e) => e.teacher_id === teacher.username);
    const myExamIds = new Set(myExams.map((e) => e.id));
    const myQuestions = questions.filter((q) => myExamIds.has(q.exam_id));
    const myAnswerGroups = {};
    answers.forEach((a) => {
        if (!myExamIds.has(a.exam_id))
            return;
        const k = a.exam_id + "|" + a.student_id;
        myAnswerGroups[k] = myAnswerGroups[k] || [];
        myAnswerGroups[k].push(a);
    });
    const scores = Object.values(myAnswerGroups).map((list) => {
        const total = list.reduce((s, a) => s + (a.mark || 1), 0);
        const got = list.reduce((s, a) => s + awardedMarkOf(a), 0);
        return total ? (got / total) * 100 : 0;
    });
    const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "—";
    const sorted = [...myExams].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u062F\u0627\u0634\u0628\u0648\u0631\u062F \u0645\u0639\u0644\u0645", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 } },
            React.createElement(StatCard, { icon: FileText, label: "\u062A\u0639\u062F\u0627\u062F \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627", value: myExams.length, color: "#2563EB" }),
            React.createElement(StatCard, { icon: Users, label: "\u062A\u0639\u062F\u0627\u062F \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646", value: students.filter(s => s.teacher_id === teacher.username).length, color: "#0EA5E9" }),
            React.createElement(StatCard, { icon: ListChecks, label: "\u062A\u0639\u062F\u0627\u062F \u0633\u0648\u0627\u0644\u0627\u062A", value: myQuestions.length, color: "#8B5CF6" }),
            React.createElement(StatCard, { icon: Percent, label: "\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0646\u0645\u0631\u0627\u062A", value: avgScore === "—" ? "—" : `${avgScore}%`, color: "#16A34A" })),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } },
                React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B" } }, "\u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631"),
                React.createElement(Button, { variant: "ghost", onClick: () => onNavigate("exams") }, "\u0645\u0634\u0627\u0647\u062F\u0647 \u0647\u0645\u0647")),
            sorted.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0622\u0632\u0645\u0648\u0646\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC. \u0627\u0648\u0644\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646\u062A \u0631\u0627 \u0628\u0633\u0627\u0632.", actionLabel: "\u0633\u0627\u062E\u062A \u0622\u0632\u0645\u0648\u0646 \u062C\u062F\u06CC\u062F", onAction: () => onNavigate("exams") })) : (React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } },
                React.createElement("thead", null,
                    React.createElement("tr", { style: { textAlign: "right", color: "#64748B", fontSize: 12, fontWeight: 700 } },
                        React.createElement("th", { style: { padding: "8px 6px" } }, "\u0639\u0646\u0648\u0627\u0646 \u0622\u0632\u0645\u0648\u0646"),
                        React.createElement("th", { style: { padding: "8px 6px" } }, "\u062A\u0639\u062F\u0627\u062F \u0633\u0648\u0627\u0644"),
                        React.createElement("th", { style: { padding: "8px 6px" } }, "\u062A\u0627\u0631\u06CC\u062E \u0633\u0627\u062E\u062A"),
                        React.createElement("th", { style: { padding: "8px 6px" } }))),
                React.createElement("tbody", null, sorted.map((ex) => (React.createElement("tr", { key: ex.id, style: { borderTop: "1px solid #F1F5F9", fontSize: 14 } },
                    React.createElement("td", { style: { padding: "12px 6px", fontWeight: 700, color: "#1E293B" } }, ex.title),
                    React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, questions.filter((q) => q.exam_id === ex.id).length),
                    React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, new Date(ex.created_at).toLocaleDateString("fa-IR")),
                    React.createElement("td", { style: { padding: "12px 6px" } },
                        React.createElement("span", { onClick: () => onOpenExam(ex.id), style: { color: "#2563EB", cursor: "pointer", fontWeight: 700, fontSize: 13 } }, "\u0645\u062F\u06CC\u0631\u06CC\u062A")))))))))));
}
function ExamsScreen({ teacher, exams, questions, answers, classes = [], onNavigate, onOpenExam, refresh, addLocalExam, updateLocalExam, removeLocalExam, addLocalQuestionMany, removeLocalQuestionMany }) {
    const [showCreate, setShowCreate] = useState(false);
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [opensAt, setOpensAt] = useState("");
    const [closesAt, setClosesAt] = useState("");
    const [randomPoolCount, setRandomPoolCount] = useState("");
    const [restrictClassIds, setRestrictClassIds] = useState([]);
    const [nameOnlyEntry, setNameOnlyEntry] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);
    const [noGoingBack, setNoGoingBack] = useState(false);
    const [shuffleQuestions, setShuffleQuestions] = useState(false);
    const [shuffleOptions, setShuffleOptions] = useState(false);
    const [allowRetake, setAllowRetake] = useState(false);
    const [requireFullscreen, setRequireFullscreen] = useState(false);
    const [noCopyPaste, setNoCopyPaste] = useState(false);
    const [saving, setSaving] = useState(false);
    const [cloningId, setCloningId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const copyExamLink = async (examId) => {
        const link = `${window.location.origin}${window.location.pathname}?exam=${examId}`;
        try {
            await navigator.clipboard.writeText(link);
        }
        catch {
            window.prompt("این لینک را کپی کن:", link);
        }
        setCopiedId(examId);
        setTimeout(() => setCopiedId((c) => (c === examId ? null : c)), 2000);
    };
    const myExams = exams.filter((e) => e.teacher_id === teacher.username)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const myClasses = classes.filter((c) => classTeacherIds(c).includes(teacher.username));
    const [createError, setCreateError] = useState("");
    const [cloneError, setCloneError] = useState("");
    const createExam = async () => {
        if (!title.trim())
            return;
        setSaving(true);
        setCreateError("");
        const id = uid();
        const record = {
            id, title: title.trim(), teacher_id: teacher.username,
            duration_minutes: Number(duration) > 0 ? Number(duration) : null,
            access_code: accessCode.trim() || null,
            opens_at: opensAt ? new Date(opensAt).toISOString() : null,
            closes_at: closesAt ? new Date(closesAt).toISOString() : null,
            random_pool_count: Number(randomPoolCount) > 0 ? Number(randomPoolCount) : null,
            restrict_class_ids: nameOnlyEntry ? [] : restrictClassIds,
            entry_mode: nameOnlyEntry ? "name_only" : "code",
            show_answers: showAnswers,
            no_going_back: noGoingBack,
            shuffle_questions: shuffleQuestions,
            shuffle_options: shuffleOptions,
            allow_retake: allowRetake,
            require_fullscreen: requireFullscreen,
            no_copy_paste: noCopyPaste,
            created_at: new Date().toISOString(),
        };
        // برخلاف قبل، اول باید مطمئن بشیم سرور رد نمی‌کنه (مثلاً به‌خاطر تداخل
        // «یک امتحان در روز برای هر کلاس») — پس دیگه نمی‌تونیم قبل از پاسخ سرور
        // خوش‌بینانه به لیست محلی اضافه‌ش کنیم.
        const result = await setJSONChecked(`exam:${id}`, record);
        setSaving(false);
        if (!result.ok) {
            setCreateError(result.error);
            return;
        }
        addLocalExam && addLocalExam(record);
        setTitle("");
        setDuration("");
        setAccessCode("");
        setOpensAt("");
        setClosesAt("");
        setRandomPoolCount("");
        setRestrictClassIds([]);
        setNameOnlyEntry(false);
        setShowAnswers(false);
        setNoGoingBack(false);
        setShuffleQuestions(false);
        setShuffleOptions(false);
        setAllowRetake(false);
        setRequireFullscreen(false);
        setNoCopyPaste(false);
        setShowCreate(false);
        onOpenExam(id);
    };
    const removeExam = async (examId) => {
        const qs = questions.filter((q) => q.exam_id === examId);
        removeLocalExam && removeLocalExam(examId);
        removeLocalQuestionMany && removeLocalQuestionMany(qs.map((q) => q.id));
        await deleteKey(`exam:${examId}`);
        await Promise.all(qs.map((q) => deleteKey(`question:${q.id}`)));
        const ansStudentIds = new Set(answers.filter((a) => a.exam_id === examId).map((a) => a.student_id));
        await Promise.all([...ansStudentIds].map((sid) => deleteKey(`answers:${sid}`)));
    };
    const cloneExam = async (ex) => {
        setCloningId(ex.id);
        setCloneError("");
        const newId = uid();
        const newExam = { ...ex, id: newId, title: ex.title + " (کپی)", created_at: new Date().toISOString() };
        const qs = questions.filter((q) => q.exam_id === ex.id);
        const newQs = qs.map((q) => ({ ...q, id: uid(), exam_id: newId }));
        // مثل createExam، اول باید مطمئن بشیم سرور رد نمی‌کنه (مثلاً به‌خاطر سقف
        // تعداد آزمون) — پس نمی‌تونیم قبل از پاسخ سرور خوش‌بینانه به لیست اضافه‌ش کنیم.
        const result = await setJSONChecked(`exam:${newId}`, newExam);
        if (!result.ok) {
            setCloneError(result.error);
            setCloningId(null);
            return;
        }
        addLocalExam && addLocalExam(newExam);
        addLocalQuestionMany && addLocalQuestionMany(newQs);
        await Promise.all(newQs.map((q) => setJSON(`question:${q.id}`, q)));
        setCloningId(null);
    };
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { marginBottom: 18 } },
            React.createElement(Button, { onClick: () => setShowCreate(true) },
                React.createElement(Plus, { size: 16 }),
                "\u0633\u0627\u062E\u062A \u0622\u0632\u0645\u0648\u0646 \u062C\u062F\u06CC\u062F")),
        myExams.length === 0 ? (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6" } },
            React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0622\u0632\u0645\u0648\u0646\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC.", actionLabel: "\u0633\u0627\u062E\u062A \u0622\u0632\u0645\u0648\u0646 \u062C\u062F\u06CC\u062F", onAction: () => setShowCreate(true) }))) : (React.createElement(React.Fragment, null,
            cloneError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12.5, marginBottom: 10 } }, cloneError),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 16 } }, myExams.map((ex) => {
                const qCount = questions.filter((q) => q.exam_id === ex.id).length;
                return (React.createElement("div", { key: ex.id, style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 20 } },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, ex.title),
                        React.createElement(Badge, { tone: qCount > 0 ? "green" : "orange" }, qCount > 0 ? "آماده" : "بدون سوال")),
                    React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 10 } },
                        qCount,
                        " \u0633\u0648\u0627\u0644",
                        ex.duration_minutes ? ` · ${ex.duration_minutes} دقیقه` : "",
                        " \u00B7 \u0633\u0627\u062E\u062A\u0647\u200C\u0634\u062F\u0647 ",
                        new Date(ex.created_at).toLocaleDateString("fa-IR")),
                    React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 } },
                        ex.access_code && React.createElement(Badge, { tone: "blue" }, "\u062F\u0627\u0631\u0627\u06CC \u06A9\u062F \u062F\u0633\u062A\u0631\u0633\u06CC"),
                        ex.entry_mode === "name_only" && React.createElement(Badge, { tone: "gray" }, "\u0628\u062F\u0648\u0646 \u06A9\u062F \u2014 \u0648\u0631\u0648\u062F \u0628\u0627 \u0646\u0627\u0645"),
                        (ex.restrict_class_ids || (ex.restrict_class_id ? [ex.restrict_class_id] : [])).length > 0 && (React.createElement(Badge, { tone: "blue" },
                            "\u0641\u0642\u0637 \u06A9\u0644\u0627\u0633\u200C\u0647\u0627: ",
                            (ex.restrict_class_ids || [ex.restrict_class_id]).map((id) => classes.find((c) => c.id === id)?.name || "حذف‌شده").join("، "))),
                        (ex.opens_at || ex.closes_at) && React.createElement(Badge, { tone: "blue" }, "\u062F\u0627\u0631\u0627\u06CC \u0628\u0627\u0632\u0647\u200C\u06CC \u0632\u0645\u0627\u0646\u06CC"),
                        ex.random_pool_count > 0 && React.createElement(Badge, { tone: "orange" },
                            "\u062A\u0635\u0627\u062F\u0641\u06CC: ",
                            ex.random_pool_count,
                            " \u0633\u0648\u0627\u0644 \u0627\u0632 \u0647\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632"),
                        ex.show_answers && React.createElement(Badge, { tone: "gray" }, "\u0646\u0645\u0627\u06CC\u0634 \u067E\u0627\u0633\u062E \u0628\u0639\u062F \u0627\u0632 \u0622\u0632\u0645\u0648\u0646"),
                        ex.no_going_back && React.createElement(Badge, { tone: "orange" }, "\u0628\u062F\u0648\u0646 \u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0633\u0648\u0627\u0644 \u0642\u0628\u0644"),
                        ex.shuffle_questions && React.createElement(Badge, { tone: "gray" }, "\u062A\u0631\u062A\u06CC\u0628 \u062A\u0635\u0627\u062F\u0641\u06CC \u0633\u0648\u0627\u0644"),
                        ex.shuffle_options && React.createElement(Badge, { tone: "gray" }, "\u062A\u0631\u062A\u06CC\u0628 \u062A\u0635\u0627\u062F\u0641\u06CC \u06AF\u0632\u06CC\u0646\u0647"),
                        ex.allow_retake && React.createElement(Badge, { tone: "gray" }, "\u0634\u0631\u06A9\u062A \u0686\u0646\u062F\u0628\u0627\u0631\u0647 \u0645\u062C\u0627\u0632"),
                        ex.require_fullscreen && React.createElement(Badge, { tone: "gray" }, "\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647")),
                    React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
                        React.createElement(Button, { variant: "ghost", style: { fontSize: 13, padding: "8px 12px" }, onClick: () => onOpenExam(ex.id) }, "\u0645\u062F\u06CC\u0631\u06CC\u062A \u0633\u0648\u0627\u0644\u0627\u062A"),
                        React.createElement(Button, { variant: "ghost", style: { fontSize: 13, padding: "8px 12px" }, onClick: () => onNavigate("results", ex.id) }, "\u0646\u062A\u0627\u06CC\u062C"),
                        React.createElement(Button, { variant: "ghost", style: { fontSize: 13, padding: "8px 12px" }, onClick: () => onNavigate("examLive", ex.id), disabled: qCount === 0, title: qCount === 0 ? "اول یک سوال اضافه کن" : "دیدن وضعیت زنده‌ی دانش‌آموزانی که الان دارن این آزمون رو می‌دن" },
                            React.createElement(Eye, { size: 14 }),
                            "\u067E\u0627\u06CC\u0634 \u0632\u0646\u062F\u0647"),
                        React.createElement(Button, { variant: copiedId === ex.id ? "primary" : "ghost", style: { fontSize: 13, padding: "8px 12px" }, onClick: () => copyExamLink(ex.id), disabled: qCount === 0, title: qCount === 0 ? "اول یک سوال اضافه کن" : "کپی لینک آزمون برای دانش‌آموزان" }, copiedId === ex.id ? "کپی شد ✓" : "کپی لینک آزمون"),
                        React.createElement(Button, { variant: "ghost", style: { fontSize: 13, padding: "8px 10px" }, onClick: () => cloneExam(ex), disabled: cloningId === ex.id }, cloningId === ex.id ? "..." : "کپی آزمون"),
                        React.createElement(Button, { variant: "danger", style: { fontSize: 13, padding: "8px 10px" }, onClick: () => removeExam(ex.id) },
                            React.createElement(Trash2, { size: 14 })))));
            })))),
        showCreate && (React.createElement(Modal, { onClose: () => setShowCreate(false), title: "\u0633\u0627\u062E\u062A \u0622\u0632\u0645\u0648\u0646 \u062C\u062F\u06CC\u062F" },
            React.createElement(Field, { label: "\u0639\u0646\u0648\u0627\u0646 \u0622\u0632\u0645\u0648\u0646" },
                React.createElement(TextInput, { autoFocus: true, value: title, onChange: (e) => setTitle(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0631\u06CC\u0627\u0636\u06CC \u0641\u0635\u0644 \u06F4", onKeyDown: (e) => e.key === "Enter" && createExam() })),
            React.createElement(Field, { label: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0622\u0632\u0645\u0648\u0646 \u0628\u0647 \u062F\u0642\u06CC\u0642\u0647 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631 \u0628\u0631\u0627\u06CC \u0628\u062F\u0648\u0646 \u0645\u062D\u062F\u0648\u062F\u06CC\u062A)" },
                React.createElement(TextInput, { type: "number", min: 1, value: duration, onChange: (e) => setDuration(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u06F2\u06F0" })),
            React.createElement(Field, { label: "\u06A9\u062F \u062F\u0633\u062A\u0631\u0633\u06CC (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0628\u0627\u06CC\u062F \u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u062F)" },
                React.createElement(TextInput, { value: accessCode, onChange: (e) => setAccessCode(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: 1404" })),
            React.createElement(Field, { label: "\u0632\u0645\u0627\u0646 \u0628\u0627\u0632 \u0634\u062F\u0646 \u0622\u0632\u0645\u0648\u0646 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" },
                React.createElement(TextInput, { type: "datetime-local", value: opensAt, onChange: (e) => setOpensAt(e.target.value) })),
            React.createElement(Field, { label: "\u0632\u0645\u0627\u0646 \u0628\u0633\u062A\u0647 \u0634\u062F\u0646 \u0622\u0632\u0645\u0648\u0646 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" },
                React.createElement(TextInput, { type: "datetime-local", value: closesAt, onChange: (e) => setClosesAt(e.target.value) })),
            React.createElement(Field, { label: "\u062A\u0639\u062F\u0627\u062F \u0633\u0624\u0627\u0644 \u062A\u0635\u0627\u062F\u0641\u06CC \u0628\u0631\u0627\u06CC \u0647\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631 \u0628\u0631\u0627\u06CC \u0647\u0645\u0627\u0646 \u062A\u0639\u062F\u0627\u062F \u06A9\u0627\u0645\u0644 \u0633\u0648\u0627\u0644\u0627\u062A \u0628\u0631\u0627\u06CC \u0647\u0645\u0647)" },
                React.createElement(TextInput, { type: "number", min: 1, value: randomPoolCount, onChange: (e) => setRandomPoolCount(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: 20 (\u0627\u0632 \u06CC\u06A9 \u0628\u0627\u0646\u06A9 40 \u062A\u0627\u06CC\u06CC)" })),
            React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginTop: -8, marginBottom: 12 } }, "\u0627\u06AF\u0647 \u067E\u0631 \u06A9\u0646\u06CC\u060C \u0647\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u06CC\u06A9 \u0632\u06CC\u0631\u0645\u062C\u0645\u0648\u0639\u0647\u200C\u06CC \u062A\u0635\u0627\u062F\u0641\u06CC \u0648 \u0645\u062A\u0641\u0627\u0648\u062A \u0627\u0632 \u06A9\u0644 \u0633\u0648\u0627\u0644\u0627\u062A \u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u062F (\u062A\u0642\u0644\u0628 \u0628\u06CC\u0646 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u0633\u062E\u062A\u200C\u062A\u0631 \u0645\u06CC\u200C\u0634\u0648\u062F). \u0628\u0627\u06CC\u062F \u062A\u0639\u062F\u0627\u062F \u06A9\u0644 \u0633\u0648\u0627\u0644\u0627\u062A \u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u0627\u06CC\u0646 \u0639\u062F\u062F \u0628\u0627\u0634\u062F."),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }, onClick: () => setNameOnlyEntry((s) => !s) },
                nameOnlyEntry ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, "\u0628\u062F\u0648\u0646 \u06A9\u062F \u2014 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 (\u06CC\u0627 \u0647\u0631\u06A9\u0633\u06CC) \u0641\u0642\u0637 \u0628\u0627 \u0646\u0627\u0645 \u0648\u0627\u0631\u062F \u0634\u0648\u0646\u062F (\u0645\u0646\u0627\u0633\u0628 \u067E\u0631\u0633\u0634\u0646\u0627\u0645\u0647)")),
            !nameOnlyEntry && (React.createElement(Field, { label: "\u0645\u062D\u062F\u0648\u062F \u06A9\u0631\u062F\u0646 \u0628\u0647 \u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u06CC \u062E\u0627\u0635 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0686\u0646\u062F \u06A9\u0644\u0627\u0633 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC)" },
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, background: "#F8FAFC", borderRadius: 10, padding: 10 } },
                    myClasses.length === 0 && (React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8" } }, "\u0647\u0646\u0648\u0632 \u06A9\u0644\u0627\u0633\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC\u061B \u0627\u0648\u0644 \u0627\u0632 \u0628\u062E\u0634 \u00AB\u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u00BB \u06CC\u06A9 \u06A9\u0644\u0627\u0633 \u0648 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646\u0634 \u0631\u0627 \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646.")),
                    myClasses.map((c) => {
                        const checked = restrictClassIds.includes(c.id);
                        return (React.createElement("div", { key: c.id, onClick: () => setRestrictClassIds((ids) => checked ? ids.filter((x) => x !== c.id) : [...ids, c.id]), style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" } },
                            checked ? React.createElement(CheckCircle2, { size: 16, color: "#2563EB" }) : React.createElement(Circle, { size: 16, color: "#CBD5E1" }),
                            React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, c.name)));
                    })),
                React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginTop: 6 } }, "\u0627\u06AF\u0631 \u0647\u06CC\u0686 \u06A9\u0644\u0627\u0633\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u06A9\u0646\u06CC\u060C \u0647\u0645\u0647\u200C\u06CC \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u0628\u0627 \u06A9\u062F \u062E\u0648\u062F\u0634\u0627\u0646 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u0646\u062F \u0634\u0631\u06A9\u062A \u06A9\u0646\u0646\u062F."))),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }, onClick: () => setShowAnswers((s) => !s) },
                showAnswers ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, "\u0646\u0645\u0627\u06CC\u0634 \u067E\u0627\u0633\u062E\u200C\u0647\u0627\u06CC \u0635\u062D\u06CC\u062D \u0628\u0647 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0628\u0639\u062F \u0627\u0632 \u067E\u0627\u06CC\u0627\u0646 \u0622\u0632\u0645\u0648\u0646")),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }, onClick: () => setNoGoingBack((s) => !s) },
                noGoingBack ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, "\u0639\u062F\u0645 \u0627\u0645\u06A9\u0627\u0646 \u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0633\u0648\u0627\u0644\u0627\u062A \u0642\u0628\u0644\u06CC")),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }, onClick: () => setShuffleQuestions((s) => !s) },
                shuffleQuestions ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, "\u062A\u0631\u062A\u06CC\u0628 \u0633\u0648\u0627\u0644\u0627\u062A \u0628\u0631\u0627\u06CC \u0647\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u062A\u0635\u0627\u062F\u0641\u06CC \u0628\u0627\u0634\u062F")),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }, onClick: () => setShuffleOptions((s) => !s) },
                shuffleOptions ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, "\u062A\u0631\u062A\u06CC\u0628 \u06AF\u0632\u06CC\u0646\u0647\u200C\u0647\u0627 \u0628\u0631\u0627\u06CC \u0647\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u062A\u0635\u0627\u062F\u0641\u06CC \u0628\u0627\u0634\u062F")),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }, onClick: () => setAllowRetake((s) => !s) },
                allowRetake ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, "\u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u0634\u0631\u06A9\u062A \u0686\u0646\u062F\u0628\u0627\u0631\u0647 \u0628\u0627 \u06CC\u06A9 \u0646\u0627\u0645")),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }, onClick: () => setNoCopyPaste((s) => !s) },
                noCopyPaste ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0631\u062F\u0646 \u06A9\u067E\u06CC/\u067E\u06CC\u0633\u062A \u062D\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646")),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 16, cursor: "pointer" }, onClick: () => setRequireFullscreen((s) => !s) },
                requireFullscreen ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, "\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062D\u0627\u0644\u062A \u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647 \u0647\u0646\u06AF\u0627\u0645 \u0634\u0631\u0648\u0639 (\u0628\u0627\u0632\u062F\u0627\u0631\u0646\u062F\u0647\u060C \u0646\u0647 \u062A\u0636\u0645\u06CC\u0646\u06CC)")),
            createError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12.5, marginBottom: 10 } }, createError),
            React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 } },
                React.createElement(Button, { variant: "ghost", onClick: () => { setShowCreate(false); setCreateError(""); } }, "\u0627\u0646\u0635\u0631\u0627\u0641"),
                React.createElement(Button, { onClick: createExam, disabled: saving }, saving ? "در حال ساخت..." : "ادامه و افزودن سوال"))))));
}
// ==========================================
// پایش زنده‌ی آزمون — هر ۵ ثانیه از سرور می‌پرسه چه کسی الان وسط آزمونه
// (از روی draft، که با فاصله‌ی چند ثانیه‌ای در حین آزمون آپدیت می‌شه)، چه
// کسی تمام کرده، و آیا هشدار تقلبی (خروج از تمام‌صفحه) ثبت شده یا نه.
// ==========================================
function timeAgoFa(iso) {
    if (!iso)
        return null;
    const diffSec = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
    if (diffSec < 60)
        return `${diffSec} ثانیه پیش`;
    const diffMin = Math.round(diffSec / 60);
    if (diffMin < 60)
        return `${diffMin} دقیقه پیش`;
    const diffHour = Math.round(diffMin / 60);
    return `${diffHour} ساعت پیش`;
}
function ExamLiveScreen({ exam, teacher, onBack }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const r = await fetch(`/api/exam-live?examId=${encodeURIComponent(exam.id)}`, { headers: authHeaders() });
                const d = await r.json().catch(() => ({}));
                if (cancelled)
                    return;
                if (!r.ok) {
                    setError(d.error || "خطا در دریافت اطلاعات");
                }
                else {
                    setData(d);
                    setError("");
                }
            }
            catch {
                if (!cancelled)
                    setError("خطا در ارتباط با سرور");
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        };
        load();
        const t = setInterval(load, 5000);
        return () => { cancelled = true; clearInterval(t); };
    }, [exam.id]);
    const inProgress = data?.inProgress || [];
    const submitted = data?.submitted || [];
    const cheatalerts = data?.cheatalerts || [];
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748B", marginBottom: 6, cursor: "pointer" }, onClick: onBack },
            React.createElement(ArrowRight, { size: 15 }),
            " \u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627"),
        React.createElement(TopBar, { title: `پایش زنده — ${exam.title}`, teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        loading && !data && React.createElement("div", { style: { color: "#94A3B8", fontSize: 13.5 } }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC..."),
        error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
        data && (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 } },
                React.createElement("div", { style: { background: "#fff", borderRadius: 14, border: "1px solid #EEF1F6", padding: "16px 22px", minWidth: 140 } },
                    React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: "#2563EB" } }, inProgress.length),
                    React.createElement("div", { style: { fontSize: 12.5, color: "#64748B" } }, "\u062F\u0631 \u062D\u0627\u0644 \u0622\u0632\u0645\u0648\u0646")),
                React.createElement("div", { style: { background: "#fff", borderRadius: 14, border: "1px solid #EEF1F6", padding: "16px 22px", minWidth: 140 } },
                    React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: "#16A34A" } }, submitted.length),
                    React.createElement("div", { style: { fontSize: 12.5, color: "#64748B" } }, "\u062A\u06A9\u0645\u06CC\u0644\u200C\u0634\u062F\u0647")),
                React.createElement("div", { style: { background: "#fff", borderRadius: 14, border: "1px solid #EEF1F6", padding: "16px 22px", minWidth: 140 } },
                    React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: cheatalerts.length > 0 ? "#DC2626" : "#94A3B8" } }, cheatalerts.length),
                    React.createElement("div", { style: { fontSize: 12.5, color: "#64748B" } }, "\u0647\u0634\u062F\u0627\u0631 \u062A\u0642\u0644\u0628"))),
            inProgress.length === 0 && submitted.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0647\u06CC\u0686 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u0648\u0627\u0631\u062F \u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A." })) : (React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 } },
                React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 18 } },
                    React.createElement("div", { style: { fontWeight: 700, fontSize: 14, marginBottom: 12, color: "#1E293B" } },
                        "\u062F\u0631 \u062D\u0627\u0644 \u0622\u0632\u0645\u0648\u0646 (",
                        inProgress.length,
                        ")"),
                    inProgress.length === 0 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 13 } }, "\u0627\u0644\u0627\u0646 \u06A9\u0633\u06CC \u0648\u0633\u0637 \u0622\u0632\u0645\u0648\u0646 \u0646\u06CC\u0633\u062A.")) : inProgress
                        .slice()
                        .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0))
                        .map((s) => {
                        // توجه: از وقتی ذخیره‌ی خودکار سمت سرور فقط یک‌بار موقع
                        // شروع نوشته می‌شه (نه هر ۶۰ ثانیه — برای صرفه‌جویی در
                        // سهمیه‌ی رایگان D1)، دیگه نمی‌تونیم پیشرفت لحظه‌ای
                        // («سوال X از Y») یا وضعیت فعال/غیرفعال واقعی رو نشون
                        // بدیم — فقط می‌دونیم چه زمانی شروع کرده. تکمیل واقعی
                        // فقط موقع ثبت نهایی معلوم می‌شه (لیست «تکمیل‌شده» پایین).
                        return (React.createElement("div", { key: s.name, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #F1F5F9" } },
                            React.createElement("div", null,
                                React.createElement("div", { style: { fontSize: 13.5, fontWeight: 600, color: "#1E293B" } }, s.name),
                                React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8" } }, s.savedAt ? `شروع: ${timeAgoFa(new Date(s.savedAt).toISOString())}` : "—")),
                            s.reentries > 0 ? (React.createElement(Badge, { tone: "orange" },
                                "\u0648\u0631\u0648\u062F \u0645\u062C\u062F\u062F (",
                                s.reentries,
                                "\u00D7)")) : (React.createElement(Badge, { tone: "green" }, "\u0634\u0631\u0648\u0639 \u06A9\u0631\u062F\u0647"))));
                    })),
                React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 18 } },
                    React.createElement("div", { style: { fontWeight: 700, fontSize: 14, marginBottom: 12, color: "#1E293B" } },
                        "\u062A\u06A9\u0645\u06CC\u0644\u200C\u0634\u062F\u0647 (",
                        submitted.length,
                        ")"),
                    submitted.length === 0 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 13 } }, "\u0647\u0646\u0648\u0632 \u06A9\u0633\u06CC \u0622\u0632\u0645\u0648\u0646 \u0631\u0627 \u062A\u062D\u0648\u06CC\u0644 \u0646\u062F\u0627\u062F\u0647 \u0627\u0633\u062A.")) : submitted
                        .slice()
                        .sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0))
                        .map((s, i) => (React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #F1F5F9" } },
                        React.createElement("div", { style: { fontSize: 13.5, fontWeight: 600, color: "#1E293B" } }, s.name),
                        React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8" } }, timeAgoFa(s.submittedAt) || "—"))))))),
            cheatalerts.length > 0 && (React.createElement("div", { style: { background: "#FEF2F2", borderRadius: 16, border: "1px solid #FECACA", padding: 18, marginTop: 16 } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 14, marginBottom: 12, color: "#991B1B", display: "flex", alignItems: "center", gap: 6 } },
                    React.createElement(AlertTriangle, { size: 16 }),
                    " \u0647\u0634\u062F\u0627\u0631\u0647\u0627\u06CC \u062A\u0642\u0644\u0628"),
                cheatalerts.map((a) => (React.createElement("div", { key: a.id, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #FEE2E2" } },
                    React.createElement("div", { style: { fontSize: 13.5, color: "#7F1D1D" } },
                        a.student_name,
                        " \u2014 ",
                        a.tab_switches,
                        " \u0628\u0627\u0631 \u062E\u0631\u0648\u062C \u0627\u0632 \u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647"),
                    React.createElement("div", { style: { fontSize: 11.5, color: "#B91C1C" } }, timeAgoFa(a.created_at) || "—"))))))))));
}
function QuestionsScreen({ exam, questions, exams, teacher, onBack, refresh, addLocalQuestion, addLocalQuestionMany, updateLocalQuestion, removeLocalQuestion, aiAllowed }) {
    const examQuestions = questions.filter((q) => q.exam_id === exam.id);
    const [qType, setQType] = useState("mc"); // 'mc' | 'mc_multi' | 'tf' | 'fill_blank' | 'essay'
    const [qText, setQText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const optRefs = useRef([]);
    const activeOptIndexRef = useRef(0);
    const [correct, setCorrect] = useState(0); // single-answer index (mc); also reused 0/1 for tf (0=غلط, 1=درست)
    const [correctMulti, setCorrectMulti] = useState([]); // multi-answer indices
    const [blankAnswers, setBlankAnswers] = useState([""]); // fill_blank: one entry per "___" in qText, each "/"-separated for multiple accepted spellings
    const [pairs, setPairs] = useState([{ left: "", right: "" }, { left: "", right: "" }]); // matching: left/right column pairs
    const [modelAnswer, setModelAnswer] = useState("");
    const [keywords, setKeywords] = useState("");
    const [mark, setMark] = useState(1);
    const [tags, setTags] = useState("");
    const [section, setSection] = useState("");
    const [saving, setSaving] = useState(false);
    const [filterTag, setFilterTag] = useState("");
    const [filterSection, setFilterSection] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [showBulkImport, setShowBulkImport] = useState(false);
    const [bulkText, setBulkText] = useState("");
    const [bulkError, setBulkError] = useState("");
    const [showCopyFrom, setShowCopyFrom] = useState(false);
    const [copySourceExam, setCopySourceExam] = useState("");
    const [copySelected, setCopySelected] = useState([]);
    const [showAddFromBank, setShowAddFromBank] = useState(false);
    const [bankSelected, setBankSelected] = useState([]);
    const [aiMode, setAiMode] = useState("text"); // 'text' | 'image'
    const [aiSourceText, setAiSourceText] = useState("");
    const [aiImageData, setAiImageData] = useState(""); // base64 (no data-url prefix)
    const [aiImageName, setAiImageName] = useState("");
    const [aiCount, setAiCount] = useState(5);
    const [aiQType, setAiQType] = useState("mc"); // 'mc' | 'essay' | 'mixed'
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");
    const [aiLicenseLoading, setAiLicenseLoading] = useState(false);
    const [aiLicenseMsg, setAiLicenseMsg] = useState("");
    const acceptAiLicense = async () => {
        setAiLicenseMsg("");
        setAiLicenseLoading(true);
        try {
            const r = await fetch("/api/ai/accept-license", { method: "POST", headers: authHeaders() });
            const data = await r.json().catch(() => ({}));
            setAiLicenseMsg(r.ok ? "انجام شد — حالا «تولید سوال» رو دوباره امتحان کن." : (data.error || "فعال‌سازی با خطا مواجه شد."));
        }
        catch {
            setAiLicenseMsg("اتصال برقرار نشد.");
        }
        setAiLicenseLoading(false);
    };
    const [aiOcrDebug, setAiOcrDebug] = useState("");
    const generateWithAI = async () => {
        setAiError("");
        setAiOcrDebug("");
        if (aiMode === "text" && !aiSourceText.trim()) {
            setAiError("یه متن وارد کن.");
            return;
        }
        if (aiMode === "image" && !aiImageData) {
            setAiError("یه تصویر انتخاب کن.");
            return;
        }
        setAiLoading(true);
        try {
            const r = await fetch("/api/ai/generate-questions", {
                method: "POST",
                headers: authHeaders({ "Content-Type": "application/json" }),
                body: JSON.stringify({
                    mode: aiMode,
                    sourceText: aiMode === "text" ? aiSourceText : undefined,
                    imageBase64: aiMode === "image" ? aiImageData : undefined,
                    count: aiCount,
                    questionType: aiQType,
                }),
            });
            const data = await r.json().catch(() => ({}));
            if (data.debugOcrText !== undefined)
                setAiOcrDebug(data.debugOcrText || "(چیزی برنگشت)");
            if (!r.ok) {
                setAiError(data.error || "تولید سوال با خطا مواجه شد.");
                setAiLoading(false);
                return;
            }
            setBulkText((prev) => (prev ? prev + "\n\n" : "") + data.text);
        }
        catch {
            setAiError("اتصال برقرار نشد. دوباره امتحان کن.");
        }
        setAiLoading(false);
    };
    const letters = ["A", "B", "C", "D"];
    const blankCount = (qText.match(/___/g) || []).length; // تعداد جای‌خالی‌ها از روی متن سوال
    const resetForm = () => {
        setQType("mc");
        setQText("");
        setImageUrl("");
        setOptions(["", "", "", ""]);
        setCorrect(0);
        setCorrectMulti([]);
        setBlankAnswers([""]);
        setPairs([{ left: "", right: "" }, { left: "", right: "" }]);
        setModelAnswer("");
        setKeywords("");
        setMark(1);
        setTags("");
        setSection("");
        setEditingId(null);
    };
    const startEdit = (q) => {
        setEditingId(q.id);
        setQType(q.type || "mc");
        setQText(q.question_text);
        setImageUrl(q.image_url || "");
        setOptions([q.option_a || "", q.option_b || "", q.option_c || "", q.option_d || ""]);
        setCorrect(q.type === "tf" ? (q.correct_answer === "true" ? 1 : 0)
            : (["A", "B", "C", "D"].indexOf(q.correct_answer) >= 0 ? ["A", "B", "C", "D"].indexOf(q.correct_answer) : 0));
        setCorrectMulti((q.correct_answers || []).map((l) => ["A", "B", "C", "D"].indexOf(l)).filter((i) => i >= 0));
        setBlankAnswers(q.type === "fill_blank" && (q.correct_blanks || []).length > 0
            ? q.correct_blanks.map((arr) => (arr || []).join("/")) : [""]);
        if (q.type === "matching" && (q.left_items || []).length > 0) {
            const rightById = Object.fromEntries((q.right_items || []).map((r) => [r.id, r.text]));
            setPairs(q.left_items.map((l) => ({ left: l.text, right: rightById[(q.correct_map || {})[l.id]] || "" })));
        }
        else {
            setPairs([{ left: "", right: "" }, { left: "", right: "" }]);
        }
        setModelAnswer(q.model_answer || "");
        setKeywords((q.keywords || []).join(", "));
        setMark(q.mark || 1);
        setTags((q.tags || []).join(", "));
        setSection(q.section || "");
    };
    const setBlankAnswerAt = (i, val) => {
        setBlankAnswers((arr) => {
            const next = [...arr];
            while (next.length <= i)
                next.push("");
            next[i] = val;
            return next;
        });
    };
    const setPairAt = (i, side, val) => {
        setPairs((arr) => {
            const next = [...arr];
            next[i] = { ...next[i], [side]: val };
            return next;
        });
    };
    const addPairRow = () => setPairs((arr) => [...arr, { left: "", right: "" }]);
    const removePairRow = (i) => setPairs((arr) => arr.length > 2 ? arr.filter((_, idx) => idx !== i) : arr);
    const toggleCorrectMulti = (i) => {
        setCorrectMulti((arr) => arr.includes(i) ? arr.filter((x) => x !== i) : [...arr, i]);
    };
    const saveQuestion = async () => {
        if (!qText.trim())
            return;
        if ((qType === "mc" || qType === "mc_multi") && options.some((o) => !o.trim()))
            return;
        if (qType === "mc_multi" && correctMulti.length === 0)
            return;
        if (qType === "fill_blank" && (blankCount === 0 || blankAnswers.slice(0, blankCount).some((b) => !b.trim())))
            return;
        if (qType === "matching" && pairs.filter((p) => p.left.trim() && p.right.trim()).length < 2)
            return;
        setSaving(true);
        const id = editingId || uid();
        const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
        const payload = {
            id, exam_id: exam.id,
            type: qType,
            question_text: qText.trim(),
            image_url: imageUrl.trim() || null,
            mark: Number(mark) || 1,
            tags: tagList,
            section: section.trim() || null,
        };
        if (qType === "mc") {
            payload.option_a = options[0];
            payload.option_b = options[1];
            payload.option_c = options[2];
            payload.option_d = options[3];
            payload.correct_answer = ["A", "B", "C", "D"][correct];
        }
        else if (qType === "mc_multi") {
            payload.option_a = options[0];
            payload.option_b = options[1];
            payload.option_c = options[2];
            payload.option_d = options[3];
            payload.correct_answers = correctMulti.map((i) => ["A", "B", "C", "D"][i]);
        }
        else if (qType === "tf") {
            payload.correct_answer = correct === 1 ? "true" : "false";
        }
        else if (qType === "fill_blank") {
            payload.correct_blanks = blankAnswers.slice(0, blankCount).map((b) => b.split("/").map((x) => x.trim()).filter(Boolean));
        }
        else if (qType === "matching") {
            const validPairs = pairs.filter((p) => p.left.trim() && p.right.trim());
            const leftItems = validPairs.map((p) => ({ id: uid(), text: p.left.trim() }));
            const rightItemsOrdered = validPairs.map((p) => ({ id: uid(), text: p.right.trim() }));
            const correctMap = {};
            leftItems.forEach((l, i) => { correctMap[l.id] = rightItemsOrdered[i].id; });
            payload.left_items = leftItems;
            payload.right_items = shuffleArray(rightItemsOrdered);
            payload.correct_map = correctMap;
        }
        else {
            payload.model_answer = modelAnswer.trim() || null;
            payload.keywords = keywords.split(",").map((k) => k.trim()).filter(Boolean);
        }
        if (editingId)
            updateLocalQuestion && updateLocalQuestion(payload);
        else
            addLocalQuestion && addLocalQuestion(payload);
        await setJSON(`question:${id}`, payload);
        setSaving(false);
        resetForm();
    };
    const removeQuestion = async (id) => {
        removeLocalQuestion && removeLocalQuestion(id);
        await deleteKey(`question:${id}`);
        if (editingId === id)
            resetForm();
    };
    // Bulk import format, one block per question separated by a blank line or "---":
    //   Q: question text
    //   A) option
    //   B) option
    //   C) option
    //   D) option
    //   ANSWER: B
    //   MARK: 2
    const parseBulk = (text) => {
        const blocks = text.split(/\n\s*(?:---)?\s*\n/).map((b) => b.trim()).filter(Boolean);
        const parsed = [];
        const errors = [];
        blocks.forEach((block, idx) => {
            const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
            const qLine = lines.find((l) => /^Q:/i.test(l));
            const typeLine = lines.find((l) => /^TYPE:/i.test(l));
            const isEssay = typeLine && /essay|تشریحی/i.test(typeLine.replace(/^TYPE:/i, "").trim());
            const isTF = typeLine && /^(tf|true.?false|صحیح.?غلط)/i.test(typeLine.replace(/^TYPE:/i, "").trim());
            const isFill = typeLine && /^(fill|blank|جای.?خالی)/i.test(typeLine.replace(/^TYPE:/i, "").trim());
            const isMatch = typeLine && /^(match|matching|تطبیق)/i.test(typeLine.replace(/^TYPE:/i, "").trim());
            const markLine = lines.find((l) => /^MARK:/i.test(l));
            const sectionLine = lines.find((l) => /^SECTION:/i.test(l));
            const sectionVal = sectionLine ? sectionLine.replace(/^SECTION:/i, "").trim() : null;
            if (!qLine) {
                errors.push(idx + 1);
                return;
            }
            if (isFill) {
                const qTextVal = qLine.replace(/^Q:/i, "").trim();
                const blankLines = lines.filter((l) => /^BLANK\d*:/i.test(l)).map((l) => l.replace(/^BLANK\d*:/i, "").trim());
                const expectedBlanks = (qTextVal.match(/___/g) || []).length;
                if (blankLines.length === 0 || blankLines.length !== expectedBlanks) {
                    errors.push(idx + 1);
                    return;
                }
                parsed.push({
                    type: "fill_blank",
                    question_text: qTextVal,
                    correct_blanks: blankLines.map((b) => b.split("/").map((x) => x.trim()).filter(Boolean)),
                    mark: markLine ? Number(markLine.replace(/^MARK:/i, "").trim()) || 1 : 1,
                    section: sectionVal,
                });
                return;
            }
            if (isMatch) {
                const pairLines = lines.filter((l) => /^PAIR:/i.test(l)).map((l) => l.replace(/^PAIR:/i, "").trim());
                const pairsParsed = pairLines.map((l) => l.split("|").map((x) => x.trim())).filter((p) => p.length === 2 && p[0] && p[1]);
                if (pairsParsed.length < 2) {
                    errors.push(idx + 1);
                    return;
                }
                const leftItems = pairsParsed.map((p) => ({ id: uid(), text: p[0] }));
                const rightItemsOrdered = pairsParsed.map((p) => ({ id: uid(), text: p[1] }));
                const correctMap = {};
                leftItems.forEach((l, i) => { correctMap[l.id] = rightItemsOrdered[i].id; });
                parsed.push({
                    type: "matching",
                    question_text: qLine.replace(/^Q:/i, "").trim(),
                    left_items: leftItems,
                    right_items: shuffleArray(rightItemsOrdered),
                    correct_map: correctMap,
                    mark: markLine ? Number(markLine.replace(/^MARK:/i, "").trim()) || 1 : 1,
                    section: sectionVal,
                });
                return;
            }
            if (isTF) {
                const ansLine = lines.find((l) => /^ANSWER:/i.test(l));
                const ansVal = ansLine ? ansLine.replace(/^ANSWER:/i, "").trim().toLowerCase() : "";
                parsed.push({
                    type: "tf",
                    question_text: qLine.replace(/^Q:/i, "").trim(),
                    correct_answer: /^(t|true|درست|صحیح|1)/i.test(ansVal) ? "true" : "false",
                    mark: markLine ? Number(markLine.replace(/^MARK:/i, "").trim()) || 1 : 1,
                    section: sectionVal,
                });
                return;
            }
            if (isEssay) {
                const keywordsLine = lines.find((l) => /^KEYWORDS:/i.test(l));
                const answerLine = lines.find((l) => /^ANSWER:/i.test(l));
                parsed.push({
                    type: "essay",
                    question_text: qLine.replace(/^Q:/i, "").trim(),
                    model_answer: answerLine ? answerLine.replace(/^ANSWER:/i, "").trim() : "",
                    keywords: keywordsLine ? keywordsLine.replace(/^KEYWORDS:/i, "").trim() : "",
                    mark: markLine ? Number(markLine.replace(/^MARK:/i, "").trim()) || 1 : 1,
                    section: sectionVal,
                });
                return;
            }
            const optA = lines.find((l) => /^A\)/i.test(l));
            const optB = lines.find((l) => /^B\)/i.test(l));
            const optC = lines.find((l) => /^C\)/i.test(l));
            const optD = lines.find((l) => /^D\)/i.test(l));
            const ansLine = lines.find((l) => /^ANSWER:/i.test(l));
            if (!optA || !optB || !optC || !optD || !ansLine) {
                errors.push(idx + 1);
                return;
            }
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
                section: sectionVal,
            });
        });
        return { parsed, errors };
    };
    const runBulkImport = async () => {
        const { parsed, errors } = parseBulk(bulkText);
        if (parsed.length === 0) {
            setBulkError("هیچ سوال معتبری پیدا نشد. فرمت را بررسی کن.");
            return;
        }
        // نکته: قبلاً برای هر سوال uid() دوبار صدا زده می‌شد (یکی برای کلید KV،
        // یکی برای فیلد id خود رکورد)، که باعث می‌شد این دو شناسه با هم فرق
        // کنن — الان یه‌بار صدا زده می‌شه و همون‌جا نگه داشته می‌شه.
        const newQs = parsed.map((p) => ({ id: uid(), exam_id: exam.id, tags: [], ...p }));
        addLocalQuestionMany && addLocalQuestionMany(newQs);
        await Promise.all(newQs.map((q) => setJSON(`question:${q.id}`, q)));
        setBulkError(errors.length > 0 ? `${parsed.length} سوال اضافه شد؛ ${errors.length} بلوک نامعتبر نادیده گرفته شد.` : "");
        setBulkText("");
        if (errors.length === 0)
            setShowBulkImport(false);
    };
    const otherExams = (exams || []).filter((e) => e.teacher_id === teacher.username && e.id !== exam.id);
    const sourceQuestions = copySourceExam ? questions.filter((q) => q.exam_id === copySourceExam) : [];
    const bankQuestions = questions.filter((q) => !q.exam_id && q.owner_id === teacher.username);
    const runCopyFrom = async () => {
        const toCopy = sourceQuestions.filter((q) => copySelected.includes(q.id));
        const newQs = toCopy.map((q) => {
            const { id, exam_id, ...rest } = q;
            return { id: uid(), exam_id: exam.id, ...rest };
        });
        addLocalQuestionMany && addLocalQuestionMany(newQs);
        await Promise.all(newQs.map((q) => setJSON(`question:${q.id}`, q)));
        setShowCopyFrom(false);
        setCopySelected([]);
        setCopySourceExam("");
    };
    const runAddFromBank = async () => {
        const toAdd = bankQuestions.filter((q) => bankSelected.includes(q.id));
        const newQs = toAdd.map((q) => {
            // school_id/visibility فقط برای سوال‌های بانک معنی دارن، نه سوال‌های
            // متعلق به یک آزمون — اگه اینجا پاک نشن، روی رکورد جدید (که دیگه
            // متعلق به این آزمونه) می‌مونن، و اگه بعداً همین سوال از داخل آزمون
            // دوباره به بانک کپی بشه (runCopyFromExam)، دسترسیِ «مدرسه‌ای/عمومی»ِ
            // قدیمی بدون این‌که هیچ‌جا از کاربر پرسیده بشه دوباره روش می‌شینه.
            const { id, exam_id, owner_id, school_id, visibility: _v, ...rest } = q;
            return { id: uid(), exam_id: exam.id, ...rest };
        });
        addLocalQuestionMany && addLocalQuestionMany(newQs);
        await Promise.all(newQs.map((q) => setJSON(`question:${q.id}`, q)));
        setShowAddFromBank(false);
        setBankSelected([]);
    };
    const printExamPaper = () => {
        const win = window.open("", "_blank");
        if (!win)
            return;
        const printSections = [...new Set(examQuestions.map((q) => q.section || null))];
        const hasSections = printSections.some((s) => s);
        let counter = 0;
        const rows = printSections.map((sec) => {
            const items = examQuestions.filter((q) => (q.section || null) === sec);
            const header = hasSections ? `<div style="font-weight:800;font-size:15px;margin:18px 0 10px;padding-bottom:6px;border-bottom:1px solid #ccc">${sec || "سایر سوالات"}</div>` : "";
            const body = items.map((q) => {
                counter += 1;
                const opts = (q.type === "essay" || q.type === "fill_blank") ? "" : q.type === "tf" ? `
          <div style="margin-top:6px;line-height:2">☐ درست &nbsp;&nbsp;&nbsp;&nbsp; ☐ غلط</div>` : q.type === "matching" ? `
          <div style="margin-top:8px;display:flex;gap:24px">
            <div style="flex:1">${(q.left_items || []).map((l, i) => `<div style="margin-bottom:6px">${i + 1}) ${l.text} &nbsp; (____)</div>`).join("")}</div>
            <div style="flex:1">${(q.right_items || []).map((r, i) => `<div style="margin-bottom:6px">${letters[i] || i + 1}) ${r.text}</div>`).join("")}</div>
          </div>` : `
          <div style="margin-top:6px;line-height:2">
            ${["A", "B", "C", "D"].map((L, i) => `<div>${letters[i]}) ${[q.option_a, q.option_b, q.option_c, q.option_d][i] || ""}</div>`).join("")}
          </div>`;
                const printQText = q.type === "fill_blank" ? q.question_text.split("___").join("__________") : q.question_text;
                return `<div style="margin-bottom:22px;page-break-inside:avoid">
          <div style="font-weight:700">${counter}. ${printQText} <span style="font-weight:400;color:#666">(${q.mark} نمره)</span></div>
          ${opts}
          ${q.type === "essay" ? '<div style="border-bottom:1px solid #999;height:70px;margin-top:8px"></div>' : ""}
        </div>`;
            }).join("");
            return header + body;
        }).join("");
        win.document.write(`<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>${exam.title}</title>
      <style>body{font-family:Tahoma,sans-serif;padding:30px;color:#111}h1{font-size:20px;border-bottom:2px solid #111;padding-bottom:10px}</style>
      </head><body><h1>${exam.title}</h1><p>نام و نام‌خانوادگی: ......................................</p>${rows}</body></html>`);
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 300);
    };
    const allTags = [...new Set(examQuestions.flatMap((q) => q.tags || []))];
    const allSections = [...new Set(examQuestions.map((q) => q.section).filter(Boolean))];
    const visibleQuestions = examQuestions
        .filter((q) => !filterTag || (q.tags || []).includes(filterTag))
        .filter((q) => !filterSection || q.section === filterSection);
    const sectionOrder = [...new Set(visibleQuestions.map((q) => q.section || null))];
    const groupedQuestions = sectionOrder.map((sec) => ({
        section: sec,
        items: visibleQuestions.filter((q) => (q.section || null) === sec),
    }));
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748B", marginBottom: 6, cursor: "pointer" }, onClick: onBack },
            React.createElement(ArrowRight, { size: 15 }),
            " \u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627"),
        React.createElement(TopBar, { title: `سوالات — ${exam.title}`, teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 } },
            React.createElement(Button, { variant: "ghost", style: { fontSize: 13 }, onClick: () => setShowBulkImport(true) },
                React.createElement(Plus, { size: 14 }),
                "\u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0646 \u062F\u0633\u062A\u0647\u200C\u0627\u06CC"),
            otherExams.length > 0 && (React.createElement(Button, { variant: "ghost", style: { fontSize: 13 }, onClick: () => setShowCopyFrom(true) },
                React.createElement(Download, { size: 14 }),
                "\u06A9\u067E\u06CC \u0633\u0648\u0627\u0644 \u0627\u0632 \u0622\u0632\u0645\u0648\u0646 \u062F\u06CC\u06AF\u0631")),
            bankQuestions.length > 0 && (React.createElement(Button, { variant: "ghost", style: { fontSize: 13 }, onClick: () => setShowAddFromBank(true) },
                React.createElement(Library, { size: 14 }),
                "\u0627\u0641\u0632\u0648\u062F\u0646 \u0627\u0632 \u0628\u0627\u0646\u06A9 \u0633\u0648\u0627\u0644")),
            examQuestions.length > 0 && (React.createElement(Button, { variant: "ghost", style: { fontSize: 13 }, onClick: printExamPaper },
                React.createElement(FileText, { size: 14 }),
                "\u0686\u0627\u067E \u0628\u0631\u06AF\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646"))),
        React.createElement("div", { style: { display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" } },
            React.createElement("div", { style: { flex: "1 1 420px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B" } }, editingId ? "ویرایش سوال" : "افزودن سوال جدید"),
                    editingId && React.createElement("span", { onClick: resetForm, style: { fontSize: 12, color: "#64748B", cursor: "pointer" } }, "\u0644\u063A\u0648 \u0648\u06CC\u0631\u0627\u06CC\u0634")),
                React.createElement(Field, { label: "\u0646\u0648\u0639 \u0633\u0648\u0627\u0644" },
                    React.createElement("div", { style: { display: "flex", gap: 8 } },
                        React.createElement("div", { onClick: () => setQType("mc"), style: {
                                flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                background: qType === "mc" ? "#2563EB" : "#F1F5F9", color: qType === "mc" ? "#fff" : "#475569",
                            } }, "\u0686\u0647\u0627\u0631\u06AF\u0632\u06CC\u0646\u0647\u200C\u0627\u06CC"),
                        React.createElement("div", { onClick: () => setQType("mc_multi"), style: {
                                flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                background: qType === "mc_multi" ? "#2563EB" : "#F1F5F9", color: qType === "mc_multi" ? "#fff" : "#475569",
                            } }, "\u0686\u0646\u062F\u062C\u0648\u0627\u0628\u06CC"),
                        React.createElement("div", { onClick: () => setQType("tf"), style: {
                                flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                background: qType === "tf" ? "#2563EB" : "#F1F5F9", color: qType === "tf" ? "#fff" : "#475569",
                            } }, "\u0635\u062D\u06CC\u062D/\u063A\u0644\u0637"),
                        React.createElement("div", { onClick: () => setQType("fill_blank"), style: {
                                flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                background: qType === "fill_blank" ? "#2563EB" : "#F1F5F9", color: qType === "fill_blank" ? "#fff" : "#475569",
                            } }, "\u062C\u0627\u06CC\u200C\u062E\u0627\u0644\u06CC"),
                        React.createElement("div", { onClick: () => setQType("matching"), style: {
                                flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                background: qType === "matching" ? "#2563EB" : "#F1F5F9", color: qType === "matching" ? "#fff" : "#475569",
                            } }, "\u062A\u0637\u0628\u06CC\u0642\u06CC"),
                        React.createElement("div", { onClick: () => setQType("essay"), style: {
                                flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                background: qType === "essay" ? "#2563EB" : "#F1F5F9", color: qType === "essay" ? "#fff" : "#475569",
                            } }, "\u062A\u0634\u0631\u06CC\u062D\u06CC"))),
                React.createElement(Field, { label: "\u0645\u062A\u0646 \u0633\u0648\u0627\u0644" },
                    React.createElement(MathTextarea, { value: qText, onChange: (e) => setQText(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u062D\u0627\u0635\u0644 2\u00D73+5 \u0686\u0642\u062F\u0631 \u0627\u0633\u062A\u061F (\u0628\u0631\u0627\u06CC \u0641\u0631\u0645\u0648\u0644 \u0627\u0632 \u0646\u0648\u0627\u0631 \u0627\u0628\u0632\u0627\u0631 \u0628\u0627\u0644\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646)", rows: 3 }),
                    qType === "fill_blank" && (React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginTop: 6 } },
                        "\u0628\u0631\u0627\u06CC \u0647\u0631 \u062C\u0627\u06CC \u062E\u0627\u0644\u06CC\u060C \u0633\u0647 \u0632\u06CC\u0631\u062E\u0637 ",
                        React.createElement("b", null, "___"),
                        " \u062F\u0627\u062E\u0644 \u0645\u062A\u0646 \u0633\u0648\u0627\u0644 \u0628\u06AF\u0630\u0627\u0631 \u2014 \u0645\u062B\u0644\u0627\u064B: \u00AB\u067E\u0627\u06CC\u062A\u062E\u062A \u0641\u0631\u0627\u0646\u0633\u0647 ___ \u0627\u0633\u062A.\u00BB"))),
                React.createElement(Field, { label: "\u0622\u062F\u0631\u0633 \u062A\u0635\u0648\u06CC\u0631 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" },
                    React.createElement(TextInput, { value: imageUrl, onChange: (e) => setImageUrl(e.target.value), placeholder: "\u0644\u06CC\u0646\u06A9 \u06CC\u06A9 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0633\u0648\u0627\u0644" })),
                qType === "tf" ? (React.createElement(Field, { label: "\u067E\u0627\u0633\u062E \u0635\u062D\u06CC\u062D" },
                    React.createElement("div", { style: { display: "flex", gap: 8 } },
                        React.createElement("div", { onClick: () => setCorrect(1), style: {
                                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 4px", borderRadius: 10, cursor: "pointer",
                                border: "1.5px solid " + (correct === 1 ? "#16A34A" : "#E2E8F0"), background: correct === 1 ? "#F0FDF4" : "#fff",
                            } },
                            correct === 1 ? React.createElement(CheckCircle2, { size: 18, color: "#16A34A" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                            React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#334155" } }, "\u062F\u0631\u0633\u062A")),
                        React.createElement("div", { onClick: () => setCorrect(0), style: {
                                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 4px", borderRadius: 10, cursor: "pointer",
                                border: "1.5px solid " + (correct === 0 ? "#16A34A" : "#E2E8F0"), background: correct === 0 ? "#F0FDF4" : "#fff",
                            } },
                            correct === 0 ? React.createElement(CheckCircle2, { size: 18, color: "#16A34A" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                            React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#334155" } }, "\u063A\u0644\u0637"))))) : qType === "fill_blank" ? (React.createElement(Field, { label: `پاسخ‌های قابل قبول (${blankCount} جای خالی پیدا شد)` }, blankCount === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: "#B45309", background: "#FFFBEB", borderRadius: 8, padding: "8px 10px" } }, "\u0647\u0646\u0648\u0632 \u062F\u0627\u062E\u0644 \u0645\u062A\u0646 \u0633\u0648\u0627\u0644 \u00AB___\u00BB \u0646\u0646\u0648\u0634\u062A\u06CC.")) : (Array.from({ length: blankCount }).map((_, i) => (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
                    React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#64748B", width: 60, flexShrink: 0 } },
                        "\u062C\u0627\u06CC \u062E\u0627\u0644\u06CC ",
                        i + 1),
                    React.createElement("input", { value: blankAnswers[i] || "", onChange: (e) => setBlankAnswerAt(i, e.target.value), placeholder: "\u067E\u0627\u0633\u062E \u062F\u0631\u0633\u062A \u2014 \u0628\u0631\u0627\u06CC \u0686\u0646\u062F \u062D\u0627\u0644\u062A \u0628\u0627 / \u062C\u062F\u0627 \u06A9\u0646\u060C \u0645\u062B\u0644\u0627\u064B: \u067E\u0627\u0631\u06CC\u0633/paris", style: inputStyle }))))))) : qType === "matching" ? (React.createElement(Field, { label: "\u062C\u0641\u062A\u200C\u0647\u0627\u06CC \u062A\u0637\u0628\u06CC\u0642\u06CC (\u0633\u062A\u0648\u0646 \u0686\u067E \u2194 \u0633\u062A\u0648\u0646 \u0631\u0627\u0633\u062A)" },
                    pairs.map((p, i) => (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
                        React.createElement("input", { value: p.left, onChange: (e) => setPairAt(i, "left", e.target.value), placeholder: `مورد چپ ${i + 1}`, style: { ...inputStyle, flex: 1 } }),
                        React.createElement("span", { style: { color: "#94A3B8", flexShrink: 0 } }, "\u2194"),
                        React.createElement("input", { value: p.right, onChange: (e) => setPairAt(i, "right", e.target.value), placeholder: `مورد راست ${i + 1}`, style: { ...inputStyle, flex: 1 } }),
                        pairs.length > 2 && (React.createElement("span", { onClick: () => removePairRow(i), style: { cursor: "pointer", color: "#DC2626", flexShrink: 0 } },
                            React.createElement(Trash2, { size: 16 })))))),
                    React.createElement("div", { onClick: addPairRow, style: { display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", color: "#2563EB", fontSize: 12.5, fontWeight: 700, marginTop: 4 } },
                        React.createElement(Plus, { size: 14 }),
                        " \u0627\u0641\u0632\u0648\u062F\u0646 \u062C\u0641\u062A"),
                    React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginTop: 8 } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0645\u0648\u0627\u0631\u062F \u0633\u062A\u0648\u0646 \u0631\u0627\u0633\u062A \u0631\u0627 (\u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062F\u0631\u0647\u0645\u200C\u0631\u06CC\u062E\u062A\u0647) \u0645\u06CC\u200C\u0628\u06CC\u0646\u062F \u0648 \u0628\u0627\u06CC\u062F \u0647\u0631\u06A9\u062F\u0627\u0645 \u0631\u0627 \u0628\u0647 \u0645\u0648\u0631\u062F \u062F\u0631\u0633\u062A \u0633\u062A\u0648\u0646 \u0686\u067E \u0648\u0635\u0644 \u06A9\u0646\u062F."))) : qType !== "essay" ? (React.createElement(Field, { label: qType === "mc_multi" ? "گزینه‌ها (همه‌ی پاسخ‌های صحیح را انتخاب کن)" : "گزینه‌ها (پاسخ صحیح را انتخاب کن)" },
                    React.createElement(MathToolbar, { targetRef: { get current() { return optRefs.current[activeOptIndexRef.current]; } }, setValue: (v) => { const arr = [...options]; arr[activeOptIndexRef.current] = v; setOptions(arr); } }),
                    options.map((opt, i) => (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
                        React.createElement("span", { onClick: () => qType === "mc_multi" ? toggleCorrectMulti(i) : setCorrect(i), style: { cursor: "pointer", color: (qType === "mc_multi" ? correctMulti.includes(i) : correct === i) ? "#16A34A" : "#CBD5E1", flexShrink: 0 } }, (qType === "mc_multi" ? correctMulti.includes(i) : correct === i) ? React.createElement(CheckCircle2, { size: 20 }) : React.createElement(Circle, { size: 20 })),
                        React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#64748B", width: 16 } }, letters[i]),
                        React.createElement("input", { ref: (el) => { optRefs.current[i] = el; }, onFocus: () => { activeOptIndexRef.current = i; }, value: opt, onChange: (e) => {
                                const arr = [...options];
                                arr[i] = e.target.value;
                                setOptions(arr);
                            }, placeholder: `گزینه ${letters[i]}`, style: inputStyle })))),
                    options.some((o) => o && o.includes("$")) && (React.createElement("div", { style: { marginTop: 4, padding: "9px 12px", background: "#F8FAFC", borderRadius: 8, border: "1px dashed #DBEAFE" } },
                        React.createElement("div", { style: { fontSize: 11, color: "#94A3B8", marginBottom: 4, fontWeight: 600 } }, "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u06AF\u0632\u06CC\u0646\u0647\u200C\u0647\u0627:"),
                        options.map((opt, i) => opt ? React.createElement("div", { key: i, style: { fontSize: 13, marginBottom: 3 } },
                            letters[i],
                            ". ",
                            React.createElement(MathText, { text: opt })) : null))))) : (React.createElement(React.Fragment, null,
                    React.createElement(Field, { label: "\u067E\u0627\u0633\u062E \u0646\u0645\u0648\u0646\u0647 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0645\u0631\u0648\u0631 \u062E\u0648\u062F\u062A\u060C \u062F\u0631 \u062A\u0635\u062D\u06CC\u062D \u062F\u0633\u062A\u06CC \u0645\u06CC\u200C\u0628\u06CC\u0646\u06CC)" },
                        React.createElement(MathTextarea, { value: modelAnswer, onChange: (e) => setModelAnswer(e.target.value), rows: 3 })),
                    React.createElement(Field, { label: "\u06A9\u0644\u0645\u0627\u062A \u06A9\u0644\u06CC\u062F\u06CC \u0628\u0631\u0627\u06CC \u062A\u0635\u062D\u06CC\u062D \u062E\u0648\u062F\u06A9\u0627\u0631 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u0628\u0627 \u0648\u06CC\u0631\u06AF\u0648\u0644 \u062C\u062F\u0627 \u06A9\u0646)" },
                        React.createElement(TextInput, { value: keywords, onChange: (e) => setKeywords(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0641\u062A\u0648\u0633\u0646\u062A\u0632, \u06A9\u0644\u0631\u0648\u0641\u06CC\u0644, \u0646\u0648\u0631 \u062E\u0648\u0631\u0634\u06CC\u062F" }),
                        React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginTop: 6 } }, "\u0647\u0646\u06AF\u0627\u0645 \u062A\u0635\u062D\u06CC\u062D\u060C \u0633\u06CC\u0633\u062A\u0645 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0628\u0631 \u0627\u0633\u0627\u0633 \u062A\u0639\u062F\u0627\u062F \u0627\u06CC\u0646 \u06A9\u0644\u0645\u0627\u062A \u06A9\u0647 \u062F\u0631 \u067E\u0627\u0633\u062E \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u0634\u0648\u062F\u060C \u0646\u0645\u0631\u0647\u200C\u06CC \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u06CC \u0628\u062F\u0647\u062F\u061B \u0646\u0645\u0631\u0647\u200C\u06CC \u0646\u0647\u0627\u06CC\u06CC \u0647\u0645\u06CC\u0634\u0647 \u0628\u0627 \u062E\u0648\u062F\u062A \u0627\u0633\u062A.")))),
                React.createElement(Field, { label: "\u0646\u0645\u0631\u0647 \u0627\u06CC\u0646 \u0633\u0648\u0627\u0644" },
                    React.createElement(TextInput, { type: "number", min: 1, value: mark, onChange: (e) => setMark(e.target.value), style: { maxWidth: 120 } })),
                React.createElement(Field, { label: "\u0628\u062E\u0634 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u0645\u062B\u0644\u0627\u064B: \u0642\u0644\u0645\u0631\u0648 \u0632\u0628\u0627\u0646\u06CC)" },
                    React.createElement(TextInput, { value: section, onChange: (e) => setSection(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0642\u0644\u0645\u0631\u0648 \u0632\u0628\u0627\u0646\u06CC", list: "section-suggestions" }),
                    allSections.length > 0 && (React.createElement("datalist", { id: "section-suggestions" }, allSections.map((s) => React.createElement("option", { key: s, value: s })))),
                    React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginTop: 6 } }, "\u0633\u0648\u0627\u0644\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u062E\u0634 \u06CC\u06A9\u0633\u0627\u0646 \u062F\u0627\u0631\u0646\u062F \u062F\u0631 \u0622\u0632\u0645\u0648\u0646 \u0648 \u0646\u062A\u0627\u06CC\u062C \u0632\u06CC\u0631 \u06CC\u06A9 \u0639\u0646\u0648\u0627\u0646 \u06AF\u0631\u0648\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.")),
                React.createElement(Field, { label: "\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u0628\u0627 \u0648\u06CC\u0631\u06AF\u0648\u0644 \u062C\u062F\u0627 \u06A9\u0646)" },
                    React.createElement(TextInput, { value: tags, onChange: (e) => setTags(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u062C\u0628\u0631, \u0641\u0635\u0644 \u06F4" })),
                React.createElement(Button, { onClick: saveQuestion, disabled: saving, style: { width: "100%", justifyContent: "center" } },
                    editingId ? React.createElement(Check, { size: 16 }) : React.createElement(Plus, { size: 16 }),
                    saving ? "در حال ذخیره..." : editingId ? "ذخیره تغییرات" : "افزودن سوال")),
            React.createElement("div", { style: { flex: "0 1 320px", background: "#F8FAFC", borderRadius: 16, border: "1px dashed #CBD5E1", padding: 22 } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#64748B", marginBottom: 12 } }, "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0633\u0648\u0627\u0644"),
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 12, minHeight: 40 } }, qText ? React.createElement(MathText, { text: qText }) : "متن سوال اینجا نمایش داده می‌شود..."),
                imageUrl && (React.createElement("img", { src: imageUrl, alt: "", style: { width: "100%", borderRadius: 10, marginBottom: 12, display: "block" }, onError: (e) => { e.target.style.display = "none"; } })),
                qType === "tf" ? (["درست", "غلط"].map((label, i) => {
                    const idx = i === 0 ? 1 : 0;
                    const isCorrect = correct === idx;
                    return (React.createElement("div", { key: label, style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, marginBottom: 6, background: isCorrect ? "#F0FDF4" : "#fff", border: "1px solid " + (isCorrect ? "#BBF7D0" : "#E2E8F0") } },
                        isCorrect ? React.createElement(CheckCircle2, { size: 16, color: "#16A34A" }) : React.createElement(Circle, { size: 16, color: "#CBD5E1" }),
                        React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, label)));
                })) : qType === "fill_blank" ? (React.createElement("div", { style: { fontSize: 13, color: "#334155", lineHeight: 2 } }, qText.split("___").map((seg, i, arr) => (React.createElement(React.Fragment, { key: i },
                    React.createElement(MathText, { text: seg }),
                    i < arr.length - 1 && (React.createElement("span", { style: { display: "inline-block", minWidth: 70, borderBottom: "2px solid #2563EB", color: "#2563EB", fontWeight: 700, textAlign: "center", margin: "0 4px" } }, (blankAnswers[i] || "").split("/")[0].trim() || "___"))))))) : qType === "matching" ? (React.createElement("div", null, pairs.map((p, i) => (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13, color: "#334155" } },
                    React.createElement("span", { style: { flex: 1 } }, p.left || "—"),
                    React.createElement("span", { style: { color: "#16A34A" } }, "\u2194"),
                    React.createElement("span", { style: { flex: 1 } }, p.right || "—")))))) : qType !== "essay" ? options.map((opt, i) => {
                    const isCorrect = qType === "mc_multi" ? correctMulti.includes(i) : correct === i;
                    return (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, marginBottom: 6, background: isCorrect ? "#F0FDF4" : "#fff", border: "1px solid " + (isCorrect ? "#BBF7D0" : "#E2E8F0") } },
                        isCorrect ? React.createElement(CheckCircle2, { size: 16, color: "#16A34A" }) : React.createElement(Circle, { size: 16, color: "#CBD5E1" }),
                        React.createElement("span", { style: { fontSize: 13, color: "#334155" } },
                            letters[i],
                            ". ",
                            opt ? React.createElement(MathText, { text: opt }) : "—")));
                }) : (React.createElement("div", { style: { fontSize: 12, color: "#94A3B8", padding: "10px 0" } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0645\u062A\u0646\u06CC \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u06A9\u0646\u062F (\u062A\u0635\u062D\u06CC\u062D \u062F\u0633\u062A\u06CC).")))),
        React.createElement("div", { style: { marginTop: 24 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B" } },
                    "\u0633\u0648\u0627\u0644\u0627\u062A \u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646 (",
                    examQuestions.length,
                    ")"),
                React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
                    allSections.length > 0 && (React.createElement("select", { value: filterSection, onChange: (e) => setFilterSection(e.target.value), style: { ...inputStyle, width: "auto", padding: "6px 10px", fontSize: 12 } },
                        React.createElement("option", { value: "" }, "\u0647\u0645\u0647 \u0628\u062E\u0634\u200C\u0647\u0627"),
                        allSections.map((s) => React.createElement("option", { key: s, value: s }, s)))),
                    allTags.length > 0 && (React.createElement("select", { value: filterTag, onChange: (e) => setFilterTag(e.target.value), style: { ...inputStyle, width: "auto", padding: "6px 10px", fontSize: 12 } },
                        React.createElement("option", { value: "" }, "\u0647\u0645\u0647 \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627"),
                        allTags.map((t) => React.createElement("option", { key: t, value: t }, t)))))),
            visibleQuestions.length === 0 ? (React.createElement("div", { style: { fontSize: 13, color: "#94A3B8" } }, "\u0647\u0646\u0648\u0632 \u0633\u0648\u0627\u0644\u06CC \u0627\u0636\u0627\u0641\u0647 \u0646\u0634\u062F\u0647.")) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } }, groupedQuestions.map(({ section: sec, items }) => (React.createElement("div", { key: sec || "__none__" },
                allSections.length > 0 && (React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #EEF1F6" } },
                    React.createElement("span", { style: { fontSize: 13.5, fontWeight: 800, color: "#2563EB" } }, sec || "بدون بخش"),
                    React.createElement("span", { style: { fontSize: 11.5, color: "#94A3B8" } },
                        items.length,
                        " \u0633\u0648\u0627\u0644 \u00B7 ",
                        items.reduce((s, q) => s + (q.mark || 0), 0),
                        " \u0646\u0645\u0631\u0647"))),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, items.map((q) => (React.createElement("div", { key: q.id, style: { background: "#fff", border: "1px solid #EEF1F6", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B" } },
                            visibleQuestions.indexOf(q) + 1,
                            ". ",
                            React.createElement(MathText, { text: q.question_text })),
                        React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginTop: 4 } },
                            q.type === "essay" ? "پاسخ تشریحی" : q.type === "mc_multi" ? `پاسخ‌های صحیح: ${(q.correct_answers || []).join("، ")}` : q.type === "tf" ? `پاسخ صحیح: ${q.correct_answer === "true" ? "درست" : "غلط"}` : q.type === "fill_blank" ? `پاسخ‌های صحیح: ${(q.correct_blanks || []).map((arr) => (arr || []).join("/")).join(" ، ")}` : q.type === "matching" ? `${(q.left_items || []).length} جفت تطبیقی` : `پاسخ صحیح: ${q.correct_answer}`,
                            " \u00B7 \u0646\u0645\u0631\u0647: ",
                            q.mark),
                        React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 } },
                            q.type === "essay" && React.createElement(Badge, { tone: "blue" }, "\u062A\u0634\u0631\u06CC\u062D\u06CC"),
                            q.type === "mc_multi" && React.createElement(Badge, { tone: "blue" }, "\u0686\u0646\u062F\u062C\u0648\u0627\u0628\u06CC"),
                            q.type === "tf" && React.createElement(Badge, { tone: "blue" }, "\u0635\u062D\u06CC\u062D/\u063A\u0644\u0637"),
                            q.type === "fill_blank" && React.createElement(Badge, { tone: "blue" }, "\u062C\u0627\u06CC\u200C\u062E\u0627\u0644\u06CC"),
                            q.type === "matching" && React.createElement(Badge, { tone: "blue" }, "\u062A\u0637\u0628\u06CC\u0642\u06CC"),
                            q.image_url && React.createElement(Badge, { tone: "gray" }, "\u062F\u0627\u0631\u0627\u06CC \u062A\u0635\u0648\u06CC\u0631"),
                            (q.tags || []).map((t) => React.createElement(Badge, { key: t, tone: "gray" }, t)))),
                    React.createElement("div", { style: { display: "flex", gap: 14, flexShrink: 0 } },
                        React.createElement(Edit2, { size: 16, style: { cursor: "pointer", color: "#64748B" }, onClick: () => startEdit(q) }),
                        React.createElement(Trash2, { size: 16, style: { cursor: "pointer", color: "#F87171" }, onClick: () => removeQuestion(q.id) })))))))))))),
        showBulkImport && (React.createElement(Modal, { title: "\u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0646 \u062F\u0633\u062A\u0647\u200C\u0627\u06CC \u0633\u0648\u0627\u0644", onClose: () => setShowBulkImport(false) },
            aiAllowed ? (React.createElement("div", { style: { border: "1px solid #DBEAFE", background: "#EFF6FF", borderRadius: 10, padding: 12, marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E3A8A", marginBottom: 8 } }, "\u2728 \u062A\u0648\u0644\u06CC\u062F \u0633\u0648\u0627\u0644 \u0628\u0627 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC"),
                React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 8 } },
                    React.createElement("button", { type: "button", onClick: () => setAiMode("text"), style: { flex: 1, padding: "6px 0", borderRadius: 8, border: "1px solid #BFDBFE", background: aiMode === "text" ? "#2563EB" : "#fff", color: aiMode === "text" ? "#fff" : "#1E3A8A", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, "\u0627\u0632 \u0645\u062A\u0646"),
                    React.createElement("button", { type: "button", onClick: () => setAiMode("image"), style: { flex: 1, padding: "6px 0", borderRadius: 8, border: "1px solid #BFDBFE", background: aiMode === "image" ? "#2563EB" : "#fff", color: aiMode === "image" ? "#fff" : "#1E3A8A", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, "\u0627\u0632 \u0639\u06A9\u0633 (\u0627\u0633\u06A9\u0646 \u0635\u0641\u062D\u0647)")),
                aiMode === "text" ? (React.createElement("textarea", { value: aiSourceText, onChange: (e) => setAiSourceText(e.target.value), rows: 5, style: { ...inputStyle, resize: "vertical", fontSize: 12.5, marginBottom: 8 }, placeholder: "\u0645\u062A\u0646 \u062F\u0631\u0633 \u06CC\u0627 \u062C\u0632\u0648\u0647 \u0631\u0648 \u0627\u06CC\u0646\u200C\u062C\u0627 \u067E\u06CC\u0633\u062A \u06A9\u0646..." })) : (React.createElement("div", { style: { marginBottom: 8 } },
                    React.createElement("label", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: "#2563EB", cursor: "pointer" } },
                        React.createElement(Upload, { size: 14 }),
                        aiImageName || "انتخاب عکس صفحه",
                        React.createElement("input", { type: "file", accept: "image/*", style: { display: "none" }, onChange: (e) => {
                                const file = e.target.files && e.target.files[0];
                                if (!file)
                                    return;
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                    const dataUrl = String(ev.target.result || "");
                                    setAiImageData(dataUrl.split(",")[1] || "");
                                    setAiImageName(file.name);
                                };
                                reader.readAsDataURL(file);
                                e.target.value = "";
                            } })),
                    React.createElement("div", { style: { marginTop: 8 } },
                        React.createElement("button", { type: "button", onClick: acceptAiLicense, disabled: aiLicenseLoading, style: { fontSize: 11.5, color: "#2563EB", background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline" } }, aiLicenseLoading ? "در حال فعال‌سازی..." : "اگه اولین باره از عکس استفاده می‌کنی و خطا گرفتی، اول این‌جا رو بزن (فعال‌سازی یک‌باره)"),
                        aiLicenseMsg && React.createElement("div", { style: { fontSize: 11.5, color: "#64748B", marginTop: 4 } }, aiLicenseMsg)))),
                React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10 } },
                    React.createElement("select", { value: aiQType, onChange: (e) => setAiQType(e.target.value), style: { ...inputStyle, flex: 1, fontSize: 12.5 } },
                        React.createElement("option", { value: "mc" }, "\u0686\u0647\u0627\u0631\u06AF\u0632\u06CC\u0646\u0647\u200C\u0627\u06CC"),
                        React.createElement("option", { value: "essay" }, "\u062A\u0634\u0631\u06CC\u062D\u06CC"),
                        React.createElement("option", { value: "mixed" }, "\u062A\u0631\u06A9\u06CC\u0628\u06CC")),
                    React.createElement("select", { value: aiCount, onChange: (e) => setAiCount(Number(e.target.value)), style: { ...inputStyle, width: 90, fontSize: 12.5 } }, [3, 5, 8, 10, 15].map((n) => React.createElement("option", { key: n, value: n },
                        n,
                        " \u0633\u0648\u0627\u0644")))),
                aiError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12, marginBottom: 8 } }, aiError),
                aiOcrDebug && (React.createElement("div", { style: { fontSize: 11, color: "#64748B", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 8, marginBottom: 8, maxHeight: 140, overflowY: "auto", whiteSpace: "pre-wrap" } },
                    React.createElement("div", { style: { fontWeight: 700, marginBottom: 4 } }, "\u0645\u062A\u0646\u06CC \u06A9\u0647 \u0627\u0632 \u0639\u06A9\u0633 \u062E\u0648\u0646\u062F\u0647 \u0634\u062F (\u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC):"),
                    aiOcrDebug)),
                React.createElement(Button, { type: "button", onClick: generateWithAI, disabled: aiLoading, style: { width: "100%", justifyContent: "center" } }, aiLoading ? "در حال تولید..." : "تولید سوال"),
                React.createElement("div", { style: { fontSize: 11, color: "#64748B", marginTop: 6 } }, "\u0633\u0648\u0627\u0644\u200C\u0647\u0627\u06CC \u062A\u0648\u0644\u06CC\u062F\u0634\u062F\u0647 \u067E\u0627\u06CC\u06CC\u0646 \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0646 \u2014 \u0642\u0628\u0644 \u0627\u0632 \u00AB\u0627\u0641\u0632\u0648\u062F\u0646 \u0633\u0648\u0627\u0644\u0627\u062A\u00BB \u062D\u062A\u0645\u0627\u064B \u0628\u0627\u0632\u0628\u06CC\u0646\u06CC\u200C\u0634\u0648\u0646 \u06A9\u0646\u060C \u0686\u0648\u0646 \u0645\u0645\u06A9\u0646\u0647 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u0627\u0634\u062A\u0628\u0627\u0647 \u06A9\u0646\u0647."))) : (React.createElement("div", { style: { border: "1px solid #E2E8F0", background: "#F8FAFC", borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 12.5, color: "#64748B" } }, "\u0642\u0627\u0628\u0644\u06CC\u062A \u062A\u0648\u0644\u06CC\u062F \u0633\u0648\u0627\u0644 \u0628\u0627 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u0628\u0631\u0627\u06CC \u062D\u0633\u0627\u0628 \u0634\u0645\u0627 \u0641\u0639\u0627\u0644 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A. \u0628\u0631\u0627\u06CC \u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0628\u0627 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.")),
            React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 10, lineHeight: 1.8, background: "#F8FAFC", padding: 10, borderRadius: 8 } },
                "\u0628\u0631\u0627\u06CC \u0633\u0648\u0627\u0644 \u0686\u0646\u062F\u06AF\u0632\u06CC\u0646\u0647\u200C\u0627\u06CC:",
                React.createElement("pre", { style: { whiteSpace: "pre-wrap", fontSize: 11, marginTop: 6 } }, `Q: متن سوال
A) گزینه یک
B) گزینه دو
C) گزینه سه
D) گزینه چهار
ANSWER: B
MARK: 2
SECTION: قلمرو زبانی`),
                "\u0628\u0631\u0627\u06CC \u0633\u0648\u0627\u0644 \u062A\u0634\u0631\u06CC\u062D\u06CC:",
                React.createElement("pre", { style: { whiteSpace: "pre-wrap", fontSize: 11, marginTop: 6 } }, `Q: متن سوال
TYPE: ESSAY
ANSWER: پاسخ نمونه (اختیاری)
KEYWORDS: کلمه۱, کلمه۲ (اختیاری)
MARK: 2
SECTION: قلمرو زبانی`),
                "\u062E\u0637 SECTION \u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u0627\u0633\u062A. \u0628\u06CC\u0646 \u0647\u0631 \u062F\u0648 \u0633\u0648\u0627\u0644 \u06CC\u06A9 \u062E\u0637 \u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631."),
            React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 8 } },
                React.createElement("label", { style: { fontSize: 12.5, fontWeight: 700, color: "#2563EB", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 } },
                    React.createElement(Upload, { size: 14 }),
                    "\u0622\u067E\u0644\u0648\u062F \u0641\u0627\u06CC\u0644 \u0645\u062A\u0646\u06CC",
                    React.createElement("input", { type: "file", accept: ".txt,text/plain", style: { display: "none" }, onChange: (e) => {
                            const file = e.target.files && e.target.files[0];
                            if (!file)
                                return;
                            const reader = new FileReader();
                            reader.onload = (ev) => setBulkText((prev) => (prev ? prev + "\n\n" : "") + String(ev.target.result || ""));
                            reader.readAsText(file, "UTF-8");
                            e.target.value = "";
                        } }))),
            React.createElement("textarea", { value: bulkText, onChange: (e) => setBulkText(e.target.value), rows: 10, style: { ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: 12 }, placeholder: "\u0633\u0648\u0627\u0644\u0627\u062A \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u067E\u06CC\u0633\u062A \u06A9\u0646\u060C \u06CC\u0627 \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u06CC \u0628\u0627\u0644\u0627 \u06CC\u06A9 \u0641\u0627\u06CC\u0644 \u0645\u062A\u0646\u06CC \u0622\u067E\u0644\u0648\u062F \u06A9\u0646..." }),
            bulkError && React.createElement("div", { style: { color: "#D97706", fontSize: 12, marginTop: 8 } }, bulkError),
            React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 } },
                React.createElement(Button, { variant: "ghost", onClick: () => setShowBulkImport(false) }, "\u0627\u0646\u0635\u0631\u0627\u0641"),
                React.createElement(Button, { onClick: runBulkImport }, "\u0627\u0641\u0632\u0648\u062F\u0646 \u0633\u0648\u0627\u0644\u0627\u062A")))),
        showCopyFrom && (React.createElement(Modal, { title: "\u06A9\u067E\u06CC \u0633\u0648\u0627\u0644 \u0627\u0632 \u0622\u0632\u0645\u0648\u0646 \u062F\u06CC\u06AF\u0631", onClose: () => setShowCopyFrom(false) },
            React.createElement(Field, { label: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0622\u0632\u0645\u0648\u0646 \u0645\u0628\u062F\u0623" },
                React.createElement("select", { value: copySourceExam, onChange: (e) => { setCopySourceExam(e.target.value); setCopySelected([]); }, style: { ...inputStyle } },
                    React.createElement("option", { value: "" }, "\u2014 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u2014"),
                    otherExams.map((e) => React.createElement("option", { key: e.id, value: e.id }, e.title)))),
            sourceQuestions.length > 0 && (React.createElement("div", { style: { maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 } }, sourceQuestions.map((q) => (React.createElement("div", { key: q.id, onClick: () => setCopySelected((s) => s.includes(q.id) ? s.filter((x) => x !== q.id) : [...s, q.id]), style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, cursor: "pointer", background: copySelected.includes(q.id) ? "#EFF6FF" : "#F8FAFC" } },
                copySelected.includes(q.id) ? React.createElement(CheckCircle2, { size: 16, color: "#2563EB" }) : React.createElement(Circle, { size: 16, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } },
                    React.createElement(MathText, { text: q.question_text }))))))),
            React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
                React.createElement(Button, { variant: "ghost", onClick: () => setShowCopyFrom(false) }, "\u0627\u0646\u0635\u0631\u0627\u0641"),
                React.createElement(Button, { onClick: runCopyFrom, disabled: copySelected.length === 0 },
                    "\u0627\u0641\u0632\u0648\u062F\u0646 ",
                    copySelected.length > 0 ? `(${copySelected.length})` : "")))),
        showAddFromBank && (React.createElement(Modal, { title: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0627\u0632 \u0628\u0627\u0646\u06A9 \u0633\u0648\u0627\u0644", onClose: () => setShowAddFromBank(false) },
            bankQuestions.length === 0 ? (React.createElement("div", { style: { fontSize: 13, color: "#64748B" } }, "\u0628\u0627\u0646\u06A9 \u0633\u0648\u0627\u0644 \u062A\u0648 \u062E\u0627\u0644\u06CC\u0647.")) : (React.createElement("div", { style: { maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 } }, bankQuestions.map((q) => (React.createElement("div", { key: q.id, onClick: () => setBankSelected((s) => s.includes(q.id) ? s.filter((x) => x !== q.id) : [...s, q.id]), style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, cursor: "pointer", background: bankSelected.includes(q.id) ? "#EFF6FF" : "#F8FAFC" } },
                bankSelected.includes(q.id) ? React.createElement(CheckCircle2, { size: 16, color: "#2563EB" }) : React.createElement(Circle, { size: 16, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } },
                    React.createElement(MathText, { text: q.question_text }))))))),
            React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
                React.createElement(Button, { variant: "ghost", onClick: () => setShowAddFromBank(false) }, "\u0627\u0646\u0635\u0631\u0627\u0641"),
                React.createElement(Button, { onClick: runAddFromBank, disabled: bankSelected.length === 0 },
                    "\u0627\u0641\u0632\u0648\u062F\u0646 ",
                    bankSelected.length > 0 ? `(${bankSelected.length})` : ""))))));
}
/* ---------------------------------------------------------
   QUESTION BANK (questions independent of any exam)
--------------------------------------------------------- */
function QuestionBankScreen({ teacher, questions, exams, refresh, addLocalQuestion, addLocalQuestionMany, updateLocalQuestion, removeLocalQuestion, aiAllowed }) {
    const bankQuestions = questions.filter((q) => !q.exam_id && q.owner_id === teacher.username);
    const [activeTab, setActiveTab] = useState("mine"); // 'mine' | 'school' | 'global'
    const [sharedLoading, setSharedLoading] = useState(false);
    const [sharedError, setSharedError] = useState("");
    const [sharedSchool, setSharedSchool] = useState([]);
    const [sharedGlobal, setSharedGlobal] = useState([]);
    const [ownerNames, setOwnerNames] = useState({});
    const [importedIds, setImportedIds] = useState([]);
    const loadShared = async () => {
        setSharedLoading(true);
        setSharedError("");
        try {
            const r = await fetch("/api/question-bank-shared", { headers: authHeaders() });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setSharedError(data.error || "بارگذاری بانک مشترک با خطا مواجه شد.");
                setSharedLoading(false);
                return;
            }
            setSharedSchool(data.school || []);
            setSharedGlobal(data.global || []);
            setOwnerNames(data.ownerNames || {});
        }
        catch {
            setSharedError("اتصال برقرار نشد.");
        }
        setSharedLoading(false);
    };
    useEffect(() => { loadShared(); }, []);
    const importToMyBank = async (q) => {
        const { id, exam_id, owner_id, school_id, visibility: _v, ...rest } = q;
        const copy = { id: uid(), exam_id: null, owner_id: teacher.username, school_id: teacher.school_id || null, visibility: "private", ...rest };
        addLocalQuestion && addLocalQuestion(copy);
        await setJSON(`question:${copy.id}`, copy);
        setImportedIds((prev) => [...prev, q.id]);
    };
    const [qType, setQType] = useState("mc");
    const [qText, setQText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const optRefs = useRef([]);
    const activeOptIndexRef = useRef(0);
    const [correct, setCorrect] = useState(0);
    const [correctMulti, setCorrectMulti] = useState([]);
    const [blankAnswers, setBlankAnswers] = useState([""]);
    const [pairs, setPairs] = useState([{ left: "", right: "" }, { left: "", right: "" }]);
    const [modelAnswer, setModelAnswer] = useState("");
    const [keywords, setKeywords] = useState("");
    const [mark, setMark] = useState(1);
    const [tags, setTags] = useState("");
    const [subject, setSubject] = useState("");
    const [visibility, setVisibility] = useState("private"); // 'private' | 'school' | 'global'
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const [filterSubject, setFilterSubject] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [showBulkImport, setShowBulkImport] = useState(false);
    const [bulkText, setBulkText] = useState("");
    const [bulkError, setBulkError] = useState("");
    const [showAddToExam, setShowAddToExam] = useState(false);
    const [addToExamPool, setAddToExamPool] = useState([]);
    const [targetExam, setTargetExam] = useState("");
    const [addSelected, setAddSelected] = useState([]);
    const [showCopyFromExam, setShowCopyFromExam] = useState(false);
    const [copySourceExam, setCopySourceExam] = useState("");
    const [copySelected, setCopySelected] = useState([]);
    const [aiMode, setAiMode] = useState("text"); // 'text' | 'image'
    const [aiSourceText, setAiSourceText] = useState("");
    const [aiImageData, setAiImageData] = useState(""); // base64 (no data-url prefix)
    const [aiImageName, setAiImageName] = useState("");
    const [aiCount, setAiCount] = useState(5);
    const [aiQType, setAiQType] = useState("mc"); // 'mc' | 'essay' | 'mixed'
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");
    const [aiLicenseLoading, setAiLicenseLoading] = useState(false);
    const [aiLicenseMsg, setAiLicenseMsg] = useState("");
    const [aiOcrDebug, setAiOcrDebug] = useState("");
    const acceptAiLicense = async () => {
        setAiLicenseMsg("");
        setAiLicenseLoading(true);
        try {
            const r = await fetch("/api/ai/accept-license", { method: "POST", headers: authHeaders() });
            const data = await r.json().catch(() => ({}));
            setAiLicenseMsg(r.ok ? "انجام شد — حالا «تولید سوال» رو دوباره امتحان کن." : (data.error || "فعال‌سازی با خطا مواجه شد."));
        }
        catch {
            setAiLicenseMsg("اتصال برقرار نشد.");
        }
        setAiLicenseLoading(false);
    };
    const generateWithAI = async () => {
        setAiError("");
        setAiOcrDebug("");
        if (aiMode === "text" && !aiSourceText.trim()) {
            setAiError("یه متن وارد کن.");
            return;
        }
        if (aiMode === "image" && !aiImageData) {
            setAiError("یه تصویر انتخاب کن.");
            return;
        }
        setAiLoading(true);
        try {
            const r = await fetch("/api/ai/generate-questions", {
                method: "POST",
                headers: authHeaders({ "Content-Type": "application/json" }),
                body: JSON.stringify({
                    mode: aiMode,
                    sourceText: aiMode === "text" ? aiSourceText : undefined,
                    imageBase64: aiMode === "image" ? aiImageData : undefined,
                    count: aiCount,
                    questionType: aiQType,
                }),
            });
            const data = await r.json().catch(() => ({}));
            if (data.debugOcrText !== undefined)
                setAiOcrDebug(data.debugOcrText || "(چیزی برنگشت)");
            if (!r.ok) {
                setAiError(data.error || "تولید سوال با خطا مواجه شد.");
                setAiLoading(false);
                return;
            }
            setBulkText((prev) => (prev ? prev + "\n\n" : "") + data.text);
        }
        catch {
            setAiError("اتصال برقرار نشد. دوباره امتحان کن.");
        }
        setAiLoading(false);
    };
    const letters = ["A", "B", "C", "D"];
    const blankCount = (qText.match(/___/g) || []).length;
    const myExams = (exams || []).filter((e) => e.teacher_id === teacher.username);
    const resetForm = () => {
        setQType("mc");
        setQText("");
        setImageUrl("");
        setOptions(["", "", "", ""]);
        setCorrect(0);
        setCorrectMulti([]);
        setBlankAnswers([""]);
        setPairs([{ left: "", right: "" }, { left: "", right: "" }]);
        setModelAnswer("");
        setKeywords("");
        setMark(1);
        setTags("");
        setSubject("");
        setVisibility("private");
        setEditingId(null);
    };
    const startEdit = (q) => {
        setEditingId(q.id);
        setQType(q.type || "mc");
        setQText(q.question_text);
        setImageUrl(q.image_url || "");
        setOptions([q.option_a || "", q.option_b || "", q.option_c || "", q.option_d || ""]);
        setCorrect(q.type === "tf" ? (q.correct_answer === "true" ? 1 : 0)
            : (["A", "B", "C", "D"].indexOf(q.correct_answer) >= 0 ? ["A", "B", "C", "D"].indexOf(q.correct_answer) : 0));
        setCorrectMulti((q.correct_answers || []).map((l) => ["A", "B", "C", "D"].indexOf(l)).filter((i) => i >= 0));
        setBlankAnswers(q.type === "fill_blank" && (q.correct_blanks || []).length > 0
            ? q.correct_blanks.map((arr) => (arr || []).join("/")) : [""]);
        if (q.type === "matching" && (q.left_items || []).length > 0) {
            const rightById = Object.fromEntries((q.right_items || []).map((r) => [r.id, r.text]));
            setPairs(q.left_items.map((l) => ({ left: l.text, right: rightById[(q.correct_map || {})[l.id]] || "" })));
        }
        else {
            setPairs([{ left: "", right: "" }, { left: "", right: "" }]);
        }
        setModelAnswer(q.model_answer || "");
        setKeywords((q.keywords || []).join(", "));
        setMark(q.mark || 1);
        setTags((q.tags || []).join(", "));
        setSubject(q.subject || "");
        setVisibility(q.visibility === "school" || q.visibility === "global" ? q.visibility : "private");
    };
    const setBlankAnswerAt = (i, val) => {
        setBlankAnswers((arr) => {
            const next = [...arr];
            while (next.length <= i)
                next.push("");
            next[i] = val;
            return next;
        });
    };
    const setPairAt = (i, side, val) => {
        setPairs((arr) => {
            const next = [...arr];
            next[i] = { ...next[i], [side]: val };
            return next;
        });
    };
    const addPairRow = () => setPairs((arr) => [...arr, { left: "", right: "" }]);
    const removePairRow = (i) => setPairs((arr) => arr.length > 2 ? arr.filter((_, idx) => idx !== i) : arr);
    const toggleCorrectMulti = (i) => {
        setCorrectMulti((arr) => arr.includes(i) ? arr.filter((x) => x !== i) : [...arr, i]);
    };
    const saveQuestion = async () => {
        if (!qText.trim())
            return;
        if ((qType === "mc" || qType === "mc_multi") && options.some((o) => !o.trim()))
            return;
        if (qType === "mc_multi" && correctMulti.length === 0)
            return;
        if (qType === "fill_blank" && (blankCount === 0 || blankAnswers.slice(0, blankCount).some((b) => !b.trim())))
            return;
        if (qType === "matching" && pairs.filter((p) => p.left.trim() && p.right.trim()).length < 2)
            return;
        setSaving(true);
        setSaveError("");
        const id = editingId || uid();
        const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
        const payload = {
            id, exam_id: null, owner_id: teacher.username, school_id: teacher.school_id || null,
            visibility: teacher.school_id ? visibility : (visibility === "school" ? "private" : visibility),
            type: qType,
            question_text: qText.trim(),
            image_url: imageUrl.trim() || null,
            mark: Number(mark) || 1,
            tags: tagList,
            subject: subject.trim() || null,
        };
        if (qType === "mc") {
            payload.option_a = options[0];
            payload.option_b = options[1];
            payload.option_c = options[2];
            payload.option_d = options[3];
            payload.correct_answer = ["A", "B", "C", "D"][correct];
        }
        else if (qType === "mc_multi") {
            payload.option_a = options[0];
            payload.option_b = options[1];
            payload.option_c = options[2];
            payload.option_d = options[3];
            payload.correct_answers = correctMulti.map((i) => ["A", "B", "C", "D"][i]);
        }
        else if (qType === "tf") {
            payload.correct_answer = correct === 1 ? "true" : "false";
        }
        else if (qType === "fill_blank") {
            payload.correct_blanks = blankAnswers.slice(0, blankCount).map((b) => b.split("/").map((x) => x.trim()).filter(Boolean));
        }
        else if (qType === "matching") {
            const validPairs = pairs.filter((p) => p.left.trim() && p.right.trim());
            const leftItems = validPairs.map((p) => ({ id: uid(), text: p.left.trim() }));
            const rightItemsOrdered = validPairs.map((p) => ({ id: uid(), text: p.right.trim() }));
            const correctMap = {};
            leftItems.forEach((l, i) => { correctMap[l.id] = rightItemsOrdered[i].id; });
            payload.left_items = leftItems;
            payload.right_items = shuffleArray(rightItemsOrdered);
            payload.correct_map = correctMap;
        }
        else {
            payload.model_answer = modelAnswer.trim() || null;
            payload.keywords = keywords.split(",").map((k) => k.trim()).filter(Boolean);
        }
        // قبلاً اینجا از setJSON (که فقط true/false برمی‌گردوند و نتیجه‌ش
        // اصلاً چک نمی‌شد) استفاده می‌شد — یعنی اگه سرور رد می‌کرد (مثلاً به
        // هر دلیلی دسترسی «مدرسه»/«عمومی» نداشت)، فرم همچنان resetForm()
        // می‌شد و به کاربر انگار موفق بوده نشون داده می‌شد، بدون هیچ خطایی.
        // با setJSONChecked پیام خطای واقعی سرور رو می‌گیریم و فقط در صورت
        // موفقیت state محلی رو آپدیت و فرم رو ریست می‌کنیم.
        const result = await setJSONChecked(`question:${id}`, payload);
        if (!result.ok) {
            setSaving(false);
            setSaveError(result.error);
            return;
        }
        if (editingId)
            updateLocalQuestion && updateLocalQuestion(payload);
        else
            addLocalQuestion && addLocalQuestion(payload);
        setSaving(false);
        resetForm();
    };
    const removeQuestion = async (id) => {
        removeLocalQuestion && removeLocalQuestion(id);
        await deleteKey(`question:${id}`);
        if (editingId === id)
            resetForm();
    };
    const parseBulkQuestions = (text) => {
        const blocks = text.split(/\n\s*(?:---)?\s*\n/).map((b) => b.trim()).filter(Boolean);
        const parsed = [];
        const errors = [];
        blocks.forEach((block, idx) => {
            const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
            const qLine = lines.find((l) => /^Q:/i.test(l));
            const typeLine = lines.find((l) => /^TYPE:/i.test(l));
            const isEssay = typeLine && /essay|تشریحی/i.test(typeLine.replace(/^TYPE:/i, "").trim());
            const isTF = typeLine && /^(tf|true.?false|صحیح.?غلط)/i.test(typeLine.replace(/^TYPE:/i, "").trim());
            const isFill = typeLine && /^(fill|blank|جای.?خالی)/i.test(typeLine.replace(/^TYPE:/i, "").trim());
            const isMatch = typeLine && /^(match|matching|تطبیق)/i.test(typeLine.replace(/^TYPE:/i, "").trim());
            const markLine = lines.find((l) => /^MARK:/i.test(l));
            if (!qLine) {
                errors.push(idx + 1);
                return;
            }
            if (isFill) {
                const qTextVal = qLine.replace(/^Q:/i, "").trim();
                const blankLines = lines.filter((l) => /^BLANK\d*:/i.test(l)).map((l) => l.replace(/^BLANK\d*:/i, "").trim());
                const expectedBlanks = (qTextVal.match(/___/g) || []).length;
                if (blankLines.length === 0 || blankLines.length !== expectedBlanks) {
                    errors.push(idx + 1);
                    return;
                }
                parsed.push({
                    type: "fill_blank",
                    question_text: qTextVal,
                    correct_blanks: blankLines.map((b) => b.split("/").map((x) => x.trim()).filter(Boolean)),
                    mark: markLine ? Number(markLine.replace(/^MARK:/i, "").trim()) || 1 : 1,
                });
                return;
            }
            if (isMatch) {
                const pairLines = lines.filter((l) => /^PAIR:/i.test(l)).map((l) => l.replace(/^PAIR:/i, "").trim());
                const pairsParsed = pairLines.map((l) => l.split("|").map((x) => x.trim())).filter((p) => p.length === 2 && p[0] && p[1]);
                if (pairsParsed.length < 2) {
                    errors.push(idx + 1);
                    return;
                }
                const leftItems = pairsParsed.map((p) => ({ id: uid(), text: p[0] }));
                const rightItemsOrdered = pairsParsed.map((p) => ({ id: uid(), text: p[1] }));
                const correctMap = {};
                leftItems.forEach((l, i) => { correctMap[l.id] = rightItemsOrdered[i].id; });
                parsed.push({
                    type: "matching",
                    question_text: qLine.replace(/^Q:/i, "").trim(),
                    left_items: leftItems,
                    right_items: shuffleArray(rightItemsOrdered),
                    correct_map: correctMap,
                    mark: markLine ? Number(markLine.replace(/^MARK:/i, "").trim()) || 1 : 1,
                });
                return;
            }
            if (isTF) {
                const ansLine = lines.find((l) => /^ANSWER:/i.test(l));
                const ansVal = ansLine ? ansLine.replace(/^ANSWER:/i, "").trim().toLowerCase() : "";
                parsed.push({
                    type: "tf",
                    question_text: qLine.replace(/^Q:/i, "").trim(),
                    correct_answer: /^(t|true|درست|صحیح|1)/i.test(ansVal) ? "true" : "false",
                    mark: markLine ? Number(markLine.replace(/^MARK:/i, "").trim()) || 1 : 1,
                });
                return;
            }
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
            if (!optA || !optB || !optC || !optD || !ansLine) {
                errors.push(idx + 1);
                return;
            }
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
    };
    const runBulkImport = async () => {
        const { parsed, errors } = parseBulkQuestions(bulkText);
        if (parsed.length === 0) {
            setBulkError("هیچ سوال معتبری پیدا نشد. فرمت را بررسی کن.");
            return;
        }
        const newQs = parsed.map((p) => ({ id: uid(), exam_id: null, owner_id: teacher.username, tags: [], ...p }));
        addLocalQuestionMany && addLocalQuestionMany(newQs);
        await Promise.all(newQs.map((q) => setJSON(`question:${q.id}`, q)));
        setBulkError(errors.length > 0 ? `${parsed.length} سوال اضافه شد؛ ${errors.length} بلوک نامعتبر نادیده گرفته شد.` : "");
        setBulkText("");
        if (errors.length === 0)
            setShowBulkImport(false);
    };
    const runAddToExam = async () => {
        if (!targetExam || addSelected.length === 0)
            return;
        const toAdd = addToExamPool.filter((q) => addSelected.includes(q.id));
        const newQs = toAdd.map((q) => {
            const { id, exam_id, owner_id, school_id, visibility: _v, ...rest } = q;
            return { id: uid(), exam_id: targetExam, ...rest };
        });
        addLocalQuestionMany && addLocalQuestionMany(newQs);
        await Promise.all(newQs.map((q) => setJSON(`question:${q.id}`, q)));
        setShowAddToExam(false);
        setAddSelected([]);
        setTargetExam("");
        setAddToExamPool([]);
    };
    const sourceQuestions = copySourceExam ? questions.filter((q) => q.exam_id === copySourceExam) : [];
    const runCopyFromExam = async () => {
        const toCopy = sourceQuestions.filter((q) => copySelected.includes(q.id));
        const newQs = toCopy.map((q) => {
            // دفاع دوم در برابر همون نشتِ visibility/school_id — حتی اگه یه‌جای
            // دیگه (مثل runAddFromBank قبل از فیکسش) این فیلدها رو پاک نکرده
            // باشه، اینجا هم صریحاً پاک می‌شن و visibility همیشه «خصوصی» شروع
            // می‌شه، چون این مسیر (کپی از آزمون به بانک) اصلاً گزینه‌ی انتخاب
            // دسترسی رو به کاربر نشون نمی‌ده.
            const { id, exam_id, school_id, visibility: _v, ...rest } = q;
            return { id: uid(), exam_id: null, owner_id: teacher.username, visibility: "private", ...rest };
        });
        addLocalQuestionMany && addLocalQuestionMany(newQs);
        await Promise.all(newQs.map((q) => setJSON(`question:${q.id}`, q)));
        setShowCopyFromExam(false);
        setCopySelected([]);
        setCopySourceExam("");
    };
    const DEFAULT_SUBJECTS = ["ریاضی", "علوم", "فارسی", "ادبیات فارسی", "عربی", "زبان انگلیسی", "دینی", "تاریخ", "جغرافیا", "مطالعات اجتماعی", "فیزیک", "شیمی", "زیست‌شناسی"];
    const mySubjects = [...new Set(bankQuestions.map((q) => q.subject).filter(Boolean))];
    const schoolSubjects = [...new Set(sharedSchool.map((q) => q.subject).filter(Boolean))];
    const globalSubjects = [...new Set(sharedGlobal.map((q) => q.subject).filter(Boolean))];
    const allSubjects = sortByFa([...new Set([...DEFAULT_SUBJECTS, ...mySubjects, ...schoolSubjects, ...globalSubjects])], (s) => s);
    const allTags = [...new Set(bankQuestions.flatMap((q) => q.tags || []))];
    const visibleQuestions = bankQuestions
        .filter((q) => !filterTag || (q.tags || []).includes(filterTag))
        .filter((q) => !filterSubject || q.subject === filterSubject);
    const visibleSharedSchool = sharedSchool.filter((q) => !filterSubject || q.subject === filterSubject);
    const visibleSharedGlobal = sharedGlobal.filter((q) => !filterSubject || q.subject === filterSubject);
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u0628\u0627\u0646\u06A9 \u0633\u0648\u0627\u0644", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { fontSize: 13, color: "#64748B", marginBottom: 18, marginTop: -12 } }, "\u0633\u0648\u0627\u0644\u0627\u062A\u06CC \u06A9\u0647 \u0627\u06CC\u0646\u062C\u0627 \u0645\u06CC\u200C\u0633\u0627\u0632\u06CC \u0628\u0647 \u0647\u06CC\u0686 \u0622\u0632\u0645\u0648\u0646\u06CC \u0648\u0627\u0628\u0633\u062A\u0647 \u0646\u06CC\u0633\u062A\u0646\u061B \u0647\u0631 \u0648\u0642\u062A \u062E\u0648\u0627\u0633\u062A\u06CC \u0645\u06CC\u200C\u062A\u0648\u0646\u06CC \u0627\u0648\u0646\u0627 \u0631\u0648 \u0628\u0647 \u0647\u0631 \u0622\u0632\u0645\u0648\u0646\u06CC \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646\u06CC."),
        activeTab === "mine" && (React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 } },
            React.createElement(Button, { variant: "ghost", style: { fontSize: 13 }, onClick: () => setShowBulkImport(true) },
                React.createElement(Plus, { size: 14 }),
                "\u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0646 \u062F\u0633\u062A\u0647\u200C\u0627\u06CC"),
            myExams.length > 0 && React.createElement(Button, { variant: "ghost", style: { fontSize: 13 }, onClick: () => setShowCopyFromExam(true) },
                React.createElement(Download, { size: 14 }),
                "\u06A9\u067E\u06CC \u0633\u0648\u0627\u0644 \u0627\u0632 \u06CC\u06A9 \u0622\u0632\u0645\u0648\u0646"),
            myExams.length > 0 && bankQuestions.length > 0 && (React.createElement(Button, { variant: "ghost", style: { fontSize: 13 }, onClick: () => { setAddToExamPool(bankQuestions); setShowAddToExam(true); } },
                React.createElement(Download, { size: 14 }),
                "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0622\u0632\u0645\u0648\u0646")))),
        React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18, borderBottom: "1px solid #EEF1F6" } }, [
            { key: "mine", label: `بانک من (${bankQuestions.length})` },
            ...(teacher.school_id ? [{ key: "school", label: `بانک مدرسه (${sharedSchool.length})` }] : []),
            { key: "global", label: `بانک عمومی (${sharedGlobal.length})` },
        ].map((t) => (React.createElement("div", { key: t.key, onClick: () => { setActiveTab(t.key); setFilterSubject(""); }, style: {
                padding: "10px 4px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                color: activeTab === t.key ? "#2563EB" : "#64748B",
                borderBottom: activeTab === t.key ? "2px solid #2563EB" : "2px solid transparent",
            } }, t.label)))),
        activeTab === "mine" && (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" } },
                React.createElement("div", { style: { flex: "1 1 420px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } },
                        React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B" } }, editingId ? "ویرایش سوال" : "افزودن سوال جدید به بانک"),
                        editingId && React.createElement("span", { onClick: resetForm, style: { fontSize: 12, color: "#64748B", cursor: "pointer" } }, "\u0644\u063A\u0648 \u0648\u06CC\u0631\u0627\u06CC\u0634")),
                    React.createElement(Field, { label: "\u0646\u0648\u0639 \u0633\u0648\u0627\u0644" },
                        React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement("div", { onClick: () => setQType("mc"), style: {
                                    flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                    background: qType === "mc" ? "#2563EB" : "#F1F5F9", color: qType === "mc" ? "#fff" : "#475569",
                                } }, "\u0686\u0647\u0627\u0631\u06AF\u0632\u06CC\u0646\u0647\u200C\u0627\u06CC"),
                            React.createElement("div", { onClick: () => setQType("mc_multi"), style: {
                                    flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                    background: qType === "mc_multi" ? "#2563EB" : "#F1F5F9", color: qType === "mc_multi" ? "#fff" : "#475569",
                                } }, "\u0686\u0646\u062F\u062C\u0648\u0627\u0628\u06CC"),
                            React.createElement("div", { onClick: () => setQType("tf"), style: {
                                    flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                    background: qType === "tf" ? "#2563EB" : "#F1F5F9", color: qType === "tf" ? "#fff" : "#475569",
                                } }, "\u0635\u062D\u06CC\u062D/\u063A\u0644\u0637"),
                            React.createElement("div", { onClick: () => setQType("fill_blank"), style: {
                                    flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                    background: qType === "fill_blank" ? "#2563EB" : "#F1F5F9", color: qType === "fill_blank" ? "#fff" : "#475569",
                                } }, "\u062C\u0627\u06CC\u200C\u062E\u0627\u0644\u06CC"),
                            React.createElement("div", { onClick: () => setQType("matching"), style: {
                                    flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                    background: qType === "matching" ? "#2563EB" : "#F1F5F9", color: qType === "matching" ? "#fff" : "#475569",
                                } }, "\u062A\u0637\u0628\u06CC\u0642\u06CC"),
                            React.createElement("div", { onClick: () => setQType("essay"), style: {
                                    flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                    background: qType === "essay" ? "#2563EB" : "#F1F5F9", color: qType === "essay" ? "#fff" : "#475569",
                                } }, "\u062A\u0634\u0631\u06CC\u062D\u06CC"))),
                    React.createElement(Field, { label: "\u0645\u062A\u0646 \u0633\u0648\u0627\u0644" },
                        React.createElement(MathTextarea, { value: qText, onChange: (e) => setQText(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u062D\u0627\u0635\u0644 2\u00D73+5 \u0686\u0642\u062F\u0631 \u0627\u0633\u062A\u061F (\u0628\u0631\u0627\u06CC \u0641\u0631\u0645\u0648\u0644 \u0627\u0632 \u0646\u0648\u0627\u0631 \u0627\u0628\u0632\u0627\u0631 \u0628\u0627\u0644\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646)", rows: 3 }),
                        qType === "fill_blank" && (React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginTop: 6 } },
                            "\u0628\u0631\u0627\u06CC \u0647\u0631 \u062C\u0627\u06CC \u062E\u0627\u0644\u06CC\u060C \u0633\u0647 \u0632\u06CC\u0631\u062E\u0637 ",
                            React.createElement("b", null, "___"),
                            " \u062F\u0627\u062E\u0644 \u0645\u062A\u0646 \u0633\u0648\u0627\u0644 \u0628\u06AF\u0630\u0627\u0631 \u2014 \u0645\u062B\u0644\u0627\u064B: \u00AB\u067E\u0627\u06CC\u062A\u062E\u062A \u0641\u0631\u0627\u0646\u0633\u0647 ___ \u0627\u0633\u062A.\u00BB"))),
                    React.createElement(Field, { label: "\u0622\u062F\u0631\u0633 \u062A\u0635\u0648\u06CC\u0631 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" },
                        React.createElement(TextInput, { value: imageUrl, onChange: (e) => setImageUrl(e.target.value), placeholder: "\u0644\u06CC\u0646\u06A9 \u06CC\u06A9 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0633\u0648\u0627\u0644" })),
                    qType === "tf" ? (React.createElement(Field, { label: "\u067E\u0627\u0633\u062E \u0635\u062D\u06CC\u062D" },
                        React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement("div", { onClick: () => setCorrect(1), style: {
                                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 4px", borderRadius: 10, cursor: "pointer",
                                    border: "1.5px solid " + (correct === 1 ? "#16A34A" : "#E2E8F0"), background: correct === 1 ? "#F0FDF4" : "#fff",
                                } },
                                correct === 1 ? React.createElement(CheckCircle2, { size: 18, color: "#16A34A" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                                React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#334155" } }, "\u062F\u0631\u0633\u062A")),
                            React.createElement("div", { onClick: () => setCorrect(0), style: {
                                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 4px", borderRadius: 10, cursor: "pointer",
                                    border: "1.5px solid " + (correct === 0 ? "#16A34A" : "#E2E8F0"), background: correct === 0 ? "#F0FDF4" : "#fff",
                                } },
                                correct === 0 ? React.createElement(CheckCircle2, { size: 18, color: "#16A34A" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                                React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#334155" } }, "\u063A\u0644\u0637"))))) : qType === "fill_blank" ? (React.createElement(Field, { label: `پاسخ‌های قابل قبول (${blankCount} جای خالی پیدا شد)` }, blankCount === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: "#B45309", background: "#FFFBEB", borderRadius: 8, padding: "8px 10px" } }, "\u0647\u0646\u0648\u0632 \u062F\u0627\u062E\u0644 \u0645\u062A\u0646 \u0633\u0648\u0627\u0644 \u00AB___\u00BB \u0646\u0646\u0648\u0634\u062A\u06CC.")) : (Array.from({ length: blankCount }).map((_, i) => (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
                        React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#64748B", width: 60, flexShrink: 0 } },
                            "\u062C\u0627\u06CC \u062E\u0627\u0644\u06CC ",
                            i + 1),
                        React.createElement("input", { value: blankAnswers[i] || "", onChange: (e) => setBlankAnswerAt(i, e.target.value), placeholder: "\u067E\u0627\u0633\u062E \u062F\u0631\u0633\u062A \u2014 \u0628\u0631\u0627\u06CC \u0686\u0646\u062F \u062D\u0627\u0644\u062A \u0628\u0627 / \u062C\u062F\u0627 \u06A9\u0646\u060C \u0645\u062B\u0644\u0627\u064B: \u067E\u0627\u0631\u06CC\u0633/paris", style: inputStyle }))))))) : qType === "matching" ? (React.createElement(Field, { label: "\u062C\u0641\u062A\u200C\u0647\u0627\u06CC \u062A\u0637\u0628\u06CC\u0642\u06CC (\u0633\u062A\u0648\u0646 \u0686\u067E \u2194 \u0633\u062A\u0648\u0646 \u0631\u0627\u0633\u062A)" },
                        pairs.map((p, i) => (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
                            React.createElement("input", { value: p.left, onChange: (e) => setPairAt(i, "left", e.target.value), placeholder: `مورد چپ ${i + 1}`, style: { ...inputStyle, flex: 1 } }),
                            React.createElement("span", { style: { color: "#94A3B8", flexShrink: 0 } }, "\u2194"),
                            React.createElement("input", { value: p.right, onChange: (e) => setPairAt(i, "right", e.target.value), placeholder: `مورد راست ${i + 1}`, style: { ...inputStyle, flex: 1 } }),
                            pairs.length > 2 && (React.createElement("span", { onClick: () => removePairRow(i), style: { cursor: "pointer", color: "#DC2626", flexShrink: 0 } },
                                React.createElement(Trash2, { size: 16 })))))),
                        React.createElement("div", { onClick: addPairRow, style: { display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", color: "#2563EB", fontSize: 12.5, fontWeight: 700, marginTop: 4 } },
                            React.createElement(Plus, { size: 14 }),
                            " \u0627\u0641\u0632\u0648\u062F\u0646 \u062C\u0641\u062A"),
                        React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginTop: 8 } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0645\u0648\u0627\u0631\u062F \u0633\u062A\u0648\u0646 \u0631\u0627\u0633\u062A \u0631\u0627 (\u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062F\u0631\u0647\u0645\u200C\u0631\u06CC\u062E\u062A\u0647) \u0645\u06CC\u200C\u0628\u06CC\u0646\u062F \u0648 \u0628\u0627\u06CC\u062F \u0647\u0631\u06A9\u062F\u0627\u0645 \u0631\u0627 \u0628\u0647 \u0645\u0648\u0631\u062F \u062F\u0631\u0633\u062A \u0633\u062A\u0648\u0646 \u0686\u067E \u0648\u0635\u0644 \u06A9\u0646\u062F."))) : qType !== "essay" ? (React.createElement(Field, { label: qType === "mc_multi" ? "گزینه‌ها (همه‌ی پاسخ‌های صحیح را انتخاب کن)" : "گزینه‌ها (پاسخ صحیح را انتخاب کن)" },
                        React.createElement(MathToolbar, { targetRef: { get current() { return optRefs.current[activeOptIndexRef.current]; } }, setValue: (v) => { const arr = [...options]; arr[activeOptIndexRef.current] = v; setOptions(arr); } }),
                        options.map((opt, i) => (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
                            React.createElement("span", { onClick: () => qType === "mc_multi" ? toggleCorrectMulti(i) : setCorrect(i), style: { cursor: "pointer", color: (qType === "mc_multi" ? correctMulti.includes(i) : correct === i) ? "#16A34A" : "#CBD5E1", flexShrink: 0 } }, (qType === "mc_multi" ? correctMulti.includes(i) : correct === i) ? React.createElement(CheckCircle2, { size: 20 }) : React.createElement(Circle, { size: 20 })),
                            React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#64748B", width: 16 } }, letters[i]),
                            React.createElement("input", { ref: (el) => { optRefs.current[i] = el; }, onFocus: () => { activeOptIndexRef.current = i; }, value: opt, onChange: (e) => {
                                    const arr = [...options];
                                    arr[i] = e.target.value;
                                    setOptions(arr);
                                }, placeholder: `گزینه ${letters[i]}`, style: inputStyle })))),
                        options.some((o) => o && o.includes("$")) && (React.createElement("div", { style: { marginTop: 4, padding: "9px 12px", background: "#F8FAFC", borderRadius: 8, border: "1px dashed #DBEAFE" } },
                            React.createElement("div", { style: { fontSize: 11, color: "#94A3B8", marginBottom: 4, fontWeight: 600 } }, "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u06AF\u0632\u06CC\u0646\u0647\u200C\u0647\u0627:"),
                            options.map((opt, i) => opt ? React.createElement("div", { key: i, style: { fontSize: 13, marginBottom: 3 } },
                                letters[i],
                                ". ",
                                React.createElement(MathText, { text: opt })) : null))))) : (React.createElement(React.Fragment, null,
                        React.createElement(Field, { label: "\u067E\u0627\u0633\u062E \u0646\u0645\u0648\u0646\u0647 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0645\u0631\u0648\u0631 \u062E\u0648\u062F\u062A\u060C \u062F\u0631 \u062A\u0635\u062D\u06CC\u062D \u062F\u0633\u062A\u06CC \u0645\u06CC\u200C\u0628\u06CC\u0646\u06CC)" },
                            React.createElement(MathTextarea, { value: modelAnswer, onChange: (e) => setModelAnswer(e.target.value), rows: 3 })),
                        React.createElement(Field, { label: "\u06A9\u0644\u0645\u0627\u062A \u06A9\u0644\u06CC\u062F\u06CC \u0628\u0631\u0627\u06CC \u062A\u0635\u062D\u06CC\u062D \u062E\u0648\u062F\u06A9\u0627\u0631 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u0628\u0627 \u0648\u06CC\u0631\u06AF\u0648\u0644 \u062C\u062F\u0627 \u06A9\u0646)" },
                            React.createElement(TextInput, { value: keywords, onChange: (e) => setKeywords(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0641\u062A\u0648\u0633\u0646\u062A\u0632, \u06A9\u0644\u0631\u0648\u0641\u06CC\u0644, \u0646\u0648\u0631 \u062E\u0648\u0631\u0634\u06CC\u062F" })))),
                    React.createElement(Field, { label: "\u0646\u0645\u0631\u0647 \u0627\u06CC\u0646 \u0633\u0648\u0627\u0644" },
                        React.createElement(TextInput, { type: "number", min: 1, value: mark, onChange: (e) => setMark(e.target.value), style: { maxWidth: 120 } })),
                    React.createElement(Field, { label: "\u062F\u0631\u0633" },
                        React.createElement(TextInput, { value: subject, onChange: (e) => setSubject(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0631\u06CC\u0627\u0636\u06CC \u2014 \u0645\u06CC\u200C\u062A\u0648\u0646\u06CC \u062F\u0631\u0633 \u062C\u062F\u06CC\u062F \u0647\u0645 \u062A\u0627\u06CC\u067E \u06A9\u0646\u06CC", list: "subject-suggestions" }),
                        React.createElement("datalist", { id: "subject-suggestions" }, allSubjects.map((s) => React.createElement("option", { key: s, value: s })))),
                    React.createElement(Field, { label: "\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC \u2014 \u0628\u0627 \u0648\u06CC\u0631\u06AF\u0648\u0644 \u062C\u062F\u0627 \u06A9\u0646)" },
                        React.createElement(TextInput, { value: tags, onChange: (e) => setTags(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u062C\u0628\u0631, \u0641\u0635\u0644 \u06F4" })),
                    React.createElement(Field, { label: "\u062F\u0633\u062A\u0631\u0633\u06CC \u0627\u06CC\u0646 \u0633\u0648\u0627\u0644" },
                        React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement("div", { onClick: () => setVisibility("private"), style: {
                                    flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                    background: visibility === "private" ? "#2563EB" : "#F1F5F9", color: visibility === "private" ? "#fff" : "#475569",
                                } }, "\u062E\u0635\u0648\u0635\u06CC (\u0641\u0642\u0637 \u062E\u0648\u062F\u0645)"),
                            teacher.school_id && (React.createElement("div", { onClick: () => setVisibility("school"), style: {
                                    flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                    background: visibility === "school" ? "#2563EB" : "#F1F5F9", color: visibility === "school" ? "#fff" : "#475569",
                                } }, "\u0645\u0639\u0644\u0645\u200C\u0647\u0627\u06CC \u0645\u062F\u0631\u0633\u0647")),
                            React.createElement("div", { onClick: () => setVisibility("global"), style: {
                                    flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700,
                                    background: visibility === "global" ? "#2563EB" : "#F1F5F9", color: visibility === "global" ? "#fff" : "#475569",
                                } }, "\u0647\u0645\u0647\u200C\u06CC \u0645\u0639\u0644\u0645\u200C\u0647\u0627 (\u0639\u0645\u0648\u0645\u06CC)")),
                        React.createElement("div", { style: { fontSize: 11, color: "#94A3B8", marginTop: 6 } },
                            visibility === "private" && "فقط خودت این سوال را در بانکت می‌بینی.",
                            visibility === "school" && "همه‌ی معلم‌های مدرسه‌ی تو می‌توانند این سوال را ببینند و در آزمون خودشان استفاده کنند.",
                            visibility === "global" && "همه‌ی معلم‌های سامانه (در هر مدرسه‌ای) می‌توانند این سوال را ببینند و استفاده کنند.")),
                    saveError && (React.createElement("div", { style: { color: "#DC2626", fontSize: 12.5, marginBottom: 10, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "8px 10px" } }, saveError)),
                    React.createElement(Button, { onClick: saveQuestion, disabled: saving, style: { width: "100%", justifyContent: "center" } },
                        editingId ? React.createElement(Check, { size: 16 }) : React.createElement(Plus, { size: 16 }),
                        saving ? "در حال ذخیره..." : editingId ? "ذخیره تغییرات" : "افزودن به بانک")),
                React.createElement("div", { style: { flex: "0 1 320px", background: "#F8FAFC", borderRadius: 16, border: "1px dashed #CBD5E1", padding: 22 } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#64748B", marginBottom: 12 } }, "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0633\u0648\u0627\u0644"),
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 12, minHeight: 40 } }, qText ? React.createElement(MathText, { text: qText }) : "متن سوال اینجا نمایش داده می‌شود..."),
                    imageUrl && (React.createElement("img", { src: imageUrl, alt: "", style: { width: "100%", borderRadius: 10, marginBottom: 12, display: "block" }, onError: (e) => { e.target.style.display = "none"; } })),
                    qType === "tf" ? (["درست", "غلط"].map((label, i) => {
                        const idx = i === 0 ? 1 : 0;
                        const isCorrect = correct === idx;
                        return (React.createElement("div", { key: label, style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, marginBottom: 6, background: isCorrect ? "#F0FDF4" : "#fff", border: "1px solid " + (isCorrect ? "#BBF7D0" : "#E2E8F0") } },
                            isCorrect ? React.createElement(CheckCircle2, { size: 16, color: "#16A34A" }) : React.createElement(Circle, { size: 16, color: "#CBD5E1" }),
                            React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, label)));
                    })) : qType === "fill_blank" ? (React.createElement("div", { style: { fontSize: 13, color: "#334155", lineHeight: 2 } }, qText.split("___").map((seg, i, arr) => (React.createElement(React.Fragment, { key: i },
                        React.createElement(MathText, { text: seg }),
                        i < arr.length - 1 && (React.createElement("span", { style: { display: "inline-block", minWidth: 70, borderBottom: "2px solid #2563EB", color: "#2563EB", fontWeight: 700, textAlign: "center", margin: "0 4px" } }, (blankAnswers[i] || "").split("/")[0].trim() || "___"))))))) : qType === "matching" ? (React.createElement("div", null, pairs.map((p, i) => (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13, color: "#334155" } },
                        React.createElement("span", { style: { flex: 1 } }, p.left || "—"),
                        React.createElement("span", { style: { color: "#16A34A" } }, "\u2194"),
                        React.createElement("span", { style: { flex: 1 } }, p.right || "—")))))) : qType !== "essay" ? options.map((opt, i) => {
                        const isCorrect = qType === "mc_multi" ? correctMulti.includes(i) : correct === i;
                        return (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, marginBottom: 6, background: isCorrect ? "#F0FDF4" : "#fff", border: "1px solid " + (isCorrect ? "#BBF7D0" : "#E2E8F0") } },
                            isCorrect ? React.createElement(CheckCircle2, { size: 16, color: "#16A34A" }) : React.createElement(Circle, { size: 16, color: "#CBD5E1" }),
                            React.createElement("span", { style: { fontSize: 13, color: "#334155" } },
                                letters[i],
                                ". ",
                                opt ? React.createElement(MathText, { text: opt }) : "—")));
                    }) : (React.createElement("div", { style: { fontSize: 12, color: "#94A3B8", padding: "10px 0" } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0645\u062A\u0646\u06CC \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u06A9\u0646\u062F (\u062A\u0635\u062D\u06CC\u062D \u062F\u0633\u062A\u06CC).")))),
            React.createElement("div", { style: { marginTop: 24 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B" } },
                        "\u0633\u0648\u0627\u0644\u0627\u062A \u0628\u0627\u0646\u06A9 (",
                        bankQuestions.length,
                        ")"),
                    React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
                        mySubjects.length > 0 && (React.createElement("select", { value: filterSubject, onChange: (e) => setFilterSubject(e.target.value), style: { ...inputStyle, width: "auto", padding: "6px 10px", fontSize: 12 } },
                            React.createElement("option", { value: "" }, "\u0647\u0645\u0647 \u062F\u0631\u0633\u200C\u0647\u0627"),
                            mySubjects.map((s) => React.createElement("option", { key: s, value: s }, s)))),
                        allTags.length > 0 && (React.createElement("select", { value: filterTag, onChange: (e) => setFilterTag(e.target.value), style: { ...inputStyle, width: "auto", padding: "6px 10px", fontSize: 12 } },
                            React.createElement("option", { value: "" }, "\u0647\u0645\u0647 \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627"),
                            allTags.map((t) => React.createElement("option", { key: t, value: t }, t)))))),
                visibleQuestions.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0633\u0648\u0627\u0644\u06CC \u0628\u0647 \u0628\u0627\u0646\u06A9 \u0627\u0636\u0627\u0641\u0647 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC.", actionLabel: null, onAction: null })) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, visibleQuestions.map((q, idx) => (React.createElement("div", { key: q.id, style: { background: "#fff", border: "1px solid #EEF1F6", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B" } },
                            idx + 1,
                            ". ",
                            React.createElement(MathText, { text: q.question_text })),
                        React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginTop: 4 } },
                            q.type === "essay" ? "پاسخ تشریحی" : q.type === "mc_multi" ? `پاسخ‌های صحیح: ${(q.correct_answers || []).join("، ")}` : q.type === "tf" ? `پاسخ صحیح: ${q.correct_answer === "true" ? "درست" : "غلط"}` : q.type === "fill_blank" ? `پاسخ‌های صحیح: ${(q.correct_blanks || []).map((arr) => (arr || []).join("/")).join(" ، ")}` : q.type === "matching" ? `${(q.left_items || []).length} جفت تطبیقی` : `پاسخ صحیح: ${q.correct_answer}`,
                            " \u00B7 \u0646\u0645\u0631\u0647: ",
                            q.mark),
                        React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 } },
                            q.subject && React.createElement(Badge, { tone: "orange" }, q.subject),
                            q.type === "essay" && React.createElement(Badge, { tone: "blue" }, "\u062A\u0634\u0631\u06CC\u062D\u06CC"),
                            q.type === "mc_multi" && React.createElement(Badge, { tone: "blue" }, "\u0686\u0646\u062F\u062C\u0648\u0627\u0628\u06CC"),
                            q.type === "tf" && React.createElement(Badge, { tone: "blue" }, "\u0635\u062D\u06CC\u062D/\u063A\u0644\u0637"),
                            q.type === "fill_blank" && React.createElement(Badge, { tone: "blue" }, "\u062C\u0627\u06CC\u200C\u062E\u0627\u0644\u06CC"),
                            q.type === "matching" && React.createElement(Badge, { tone: "blue" }, "\u062A\u0637\u0628\u06CC\u0642\u06CC"),
                            q.image_url && React.createElement(Badge, { tone: "gray" }, "\u062F\u0627\u0631\u0627\u06CC \u062A\u0635\u0648\u06CC\u0631"),
                            q.visibility === "school" && React.createElement(Badge, { tone: "green" }, "\u0628\u0627 \u0645\u062F\u0631\u0633\u0647 \u0645\u0634\u062A\u0631\u06A9"),
                            q.visibility === "global" && React.createElement(Badge, { tone: "green" }, "\u0639\u0645\u0648\u0645\u06CC"),
                            (q.tags || []).map((t) => React.createElement(Badge, { key: t, tone: "gray" }, t)))),
                    React.createElement("div", { style: { display: "flex", gap: 14, flexShrink: 0 } },
                        React.createElement(Edit2, { size: 16, style: { cursor: "pointer", color: "#64748B" }, onClick: () => startEdit(q) }),
                        React.createElement(Trash2, { size: 16, style: { cursor: "pointer", color: "#F87171" }, onClick: () => removeQuestion(q.id) })))))))))),
        (activeTab === "school" || activeTab === "global") && (React.createElement("div", null,
            sharedError && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, sharedError),
            sharedLoading ? (React.createElement("div", { style: { fontSize: 13, color: "#64748B" } }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC...")) : (React.createElement(React.Fragment, null,
                (activeTab === "school" ? schoolSubjects : globalSubjects).length > 0 && (React.createElement("div", { style: { marginBottom: 14 } },
                    React.createElement("select", { value: filterSubject, onChange: (e) => setFilterSubject(e.target.value), style: { ...inputStyle, width: "auto", padding: "6px 10px", fontSize: 12 } },
                        React.createElement("option", { value: "" }, "\u0647\u0645\u0647 \u062F\u0631\u0633\u200C\u0647\u0627"),
                        (activeTab === "school" ? schoolSubjects : globalSubjects).map((s) => React.createElement("option", { key: s, value: s }, s))))),
                (activeTab === "school" ? visibleSharedSchool : visibleSharedGlobal).length === 0 ? (React.createElement(EmptyState, { text: activeTab === "school" ? "هنوز هیچ معلم دیگری از مدرسه‌ی شما سوالی به‌اشتراک نگذاشته است." : "هنوز هیچ سوال عمومی‌ای در سامانه به‌اشتراک گذاشته نشده است.", actionLabel: null, onAction: null })) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, (activeTab === "school" ? visibleSharedSchool : visibleSharedGlobal).map((q, idx) => (React.createElement("div", { key: q.id, style: { background: "#fff", border: "1px solid #EEF1F6", borderRadius: 12, padding: "14px 16px" } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B" } },
                        idx + 1,
                        ". ",
                        React.createElement(MathText, { text: q.question_text })),
                    React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginTop: 4 } },
                        q.type === "essay" ? "پاسخ تشریحی" : q.type === "mc_multi" ? `پاسخ‌های صحیح: ${(q.correct_answers || []).join("، ")}` : q.type === "tf" ? `پاسخ صحیح: ${q.correct_answer === "true" ? "درست" : "غلط"}` : q.type === "fill_blank" ? `پاسخ‌های صحیح: ${(q.correct_blanks || []).map((arr) => (arr || []).join("/")).join(" ، ")}` : q.type === "matching" ? `${(q.left_items || []).length} جفت تطبیقی` : `پاسخ صحیح: ${q.correct_answer}`,
                        " \u00B7 \u0646\u0645\u0631\u0647: ",
                        q.mark,
                        " · ",
                        "\u0633\u0627\u062E\u062A\u0647\u200C\u06CC ",
                        ownerNames[q.owner_id] || q.owner_id),
                    React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 } },
                        q.subject && React.createElement(Badge, { tone: "orange" }, q.subject),
                        q.type === "essay" && React.createElement(Badge, { tone: "blue" }, "\u062A\u0634\u0631\u06CC\u062D\u06CC"),
                        q.type === "mc_multi" && React.createElement(Badge, { tone: "blue" }, "\u0686\u0646\u062F\u062C\u0648\u0627\u0628\u06CC"),
                        q.type === "tf" && React.createElement(Badge, { tone: "blue" }, "\u0635\u062D\u06CC\u062D/\u063A\u0644\u0637"),
                        q.type === "fill_blank" && React.createElement(Badge, { tone: "blue" }, "\u062C\u0627\u06CC\u200C\u062E\u0627\u0644\u06CC"),
                        q.type === "matching" && React.createElement(Badge, { tone: "blue" }, "\u062A\u0637\u0628\u06CC\u0642\u06CC"),
                        q.image_url && React.createElement(Badge, { tone: "gray" }, "\u062F\u0627\u0631\u0627\u06CC \u062A\u0635\u0648\u06CC\u0631"),
                        (q.tags || []).map((t) => React.createElement(Badge, { key: t, tone: "gray" }, t))),
                    React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 12 } },
                        React.createElement(Button, { variant: "ghost", style: { fontSize: 12.5 }, disabled: importedIds.includes(q.id), onClick: () => importToMyBank(q) }, importedIds.includes(q.id) ? React.createElement(React.Fragment, null,
                            React.createElement(Check, { size: 14 }),
                            "\u0627\u0636\u0627\u0641\u0647 \u0634\u062F \u0628\u0647 \u0628\u0627\u0646\u06A9 \u0645\u0646") : React.createElement(React.Fragment, null,
                            React.createElement(Plus, { size: 14 }),
                            "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0628\u0627\u0646\u06A9 \u0645\u0646")),
                        myExams.length > 0 && (React.createElement(Button, { variant: "ghost", style: { fontSize: 12.5 }, onClick: () => { setAddToExamPool([q]); setAddSelected([q.id]); setShowAddToExam(true); } },
                            React.createElement(Download, { size: 14 }),
                            "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0622\u0632\u0645\u0648\u0646")))))))))))),
        showBulkImport && (React.createElement(Modal, { title: "\u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0646 \u062F\u0633\u062A\u0647\u200C\u0627\u06CC \u0633\u0648\u0627\u0644 \u0628\u0647 \u0628\u0627\u0646\u06A9", onClose: () => setShowBulkImport(false) },
            aiAllowed ? (React.createElement("div", { style: { border: "1px solid #DBEAFE", background: "#EFF6FF", borderRadius: 10, padding: 12, marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E3A8A", marginBottom: 8 } }, "\u2728 \u062A\u0648\u0644\u06CC\u062F \u0633\u0648\u0627\u0644 \u0628\u0627 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC"),
                React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 8 } },
                    React.createElement("button", { type: "button", onClick: () => setAiMode("text"), style: { flex: 1, padding: "6px 0", borderRadius: 8, border: "1px solid #BFDBFE", background: aiMode === "text" ? "#2563EB" : "#fff", color: aiMode === "text" ? "#fff" : "#1E3A8A", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, "\u0627\u0632 \u0645\u062A\u0646"),
                    React.createElement("button", { type: "button", onClick: () => setAiMode("image"), style: { flex: 1, padding: "6px 0", borderRadius: 8, border: "1px solid #BFDBFE", background: aiMode === "image" ? "#2563EB" : "#fff", color: aiMode === "image" ? "#fff" : "#1E3A8A", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, "\u0627\u0632 \u0639\u06A9\u0633 (\u0627\u0633\u06A9\u0646 \u0635\u0641\u062D\u0647)")),
                aiMode === "text" ? (React.createElement("textarea", { value: aiSourceText, onChange: (e) => setAiSourceText(e.target.value), rows: 5, style: { ...inputStyle, resize: "vertical", fontSize: 12.5, marginBottom: 8 }, placeholder: "\u0645\u062A\u0646 \u062F\u0631\u0633 \u06CC\u0627 \u062C\u0632\u0648\u0647 \u0631\u0648 \u0627\u06CC\u0646\u200C\u062C\u0627 \u067E\u06CC\u0633\u062A \u06A9\u0646..." })) : (React.createElement("div", { style: { marginBottom: 8 } },
                    React.createElement("label", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: "#2563EB", cursor: "pointer" } },
                        React.createElement(Upload, { size: 14 }),
                        aiImageName || "انتخاب عکس صفحه",
                        React.createElement("input", { type: "file", accept: "image/*", style: { display: "none" }, onChange: (e) => {
                                const file = e.target.files && e.target.files[0];
                                if (!file)
                                    return;
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                    const dataUrl = String(ev.target.result || "");
                                    setAiImageData(dataUrl.split(",")[1] || "");
                                    setAiImageName(file.name);
                                };
                                reader.readAsDataURL(file);
                                e.target.value = "";
                            } })),
                    React.createElement("div", { style: { marginTop: 8 } },
                        React.createElement("button", { type: "button", onClick: acceptAiLicense, disabled: aiLicenseLoading, style: { fontSize: 11.5, color: "#2563EB", background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline" } }, aiLicenseLoading ? "در حال فعال‌سازی..." : "اگه اولین باره از عکس استفاده می‌کنی و خطا گرفتی، اول این‌جا رو بزن (فعال‌سازی یک‌باره)"),
                        aiLicenseMsg && React.createElement("div", { style: { fontSize: 11.5, color: "#64748B", marginTop: 4 } }, aiLicenseMsg)))),
                React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10 } },
                    React.createElement("select", { value: aiQType, onChange: (e) => setAiQType(e.target.value), style: { ...inputStyle, flex: 1, fontSize: 12.5 } },
                        React.createElement("option", { value: "mc" }, "\u0686\u0647\u0627\u0631\u06AF\u0632\u06CC\u0646\u0647\u200C\u0627\u06CC"),
                        React.createElement("option", { value: "essay" }, "\u062A\u0634\u0631\u06CC\u062D\u06CC"),
                        React.createElement("option", { value: "mixed" }, "\u062A\u0631\u06A9\u06CC\u0628\u06CC")),
                    React.createElement("select", { value: aiCount, onChange: (e) => setAiCount(Number(e.target.value)), style: { ...inputStyle, width: 90, fontSize: 12.5 } }, [3, 5, 8, 10, 15].map((n) => React.createElement("option", { key: n, value: n },
                        n,
                        " \u0633\u0648\u0627\u0644")))),
                aiError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12, marginBottom: 8 } }, aiError),
                aiOcrDebug && (React.createElement("div", { style: { fontSize: 11, color: "#64748B", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 8, marginBottom: 8, maxHeight: 140, overflowY: "auto", whiteSpace: "pre-wrap" } },
                    React.createElement("div", { style: { fontWeight: 700, marginBottom: 4 } }, "\u0645\u062A\u0646\u06CC \u06A9\u0647 \u0627\u0632 \u0639\u06A9\u0633 \u062E\u0648\u0646\u062F\u0647 \u0634\u062F (\u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC):"),
                    aiOcrDebug)),
                React.createElement(Button, { type: "button", onClick: generateWithAI, disabled: aiLoading, style: { width: "100%", justifyContent: "center" } }, aiLoading ? "در حال تولید..." : "تولید سوال"),
                React.createElement("div", { style: { fontSize: 11, color: "#64748B", marginTop: 6 } }, "\u0633\u0648\u0627\u0644\u200C\u0647\u0627\u06CC \u062A\u0648\u0644\u06CC\u062F\u0634\u062F\u0647 \u067E\u0627\u06CC\u06CC\u0646 \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0646 \u2014 \u0642\u0628\u0644 \u0627\u0632 \u00AB\u0627\u0641\u0632\u0648\u062F\u0646 \u0633\u0648\u0627\u0644\u0627\u062A\u00BB \u062D\u062A\u0645\u0627\u064B \u0628\u0627\u0632\u0628\u06CC\u0646\u06CC\u200C\u0634\u0648\u0646 \u06A9\u0646\u060C \u0686\u0648\u0646 \u0645\u0645\u06A9\u0646\u0647 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u0627\u0634\u062A\u0628\u0627\u0647 \u06A9\u0646\u0647."))) : (React.createElement("div", { style: { border: "1px solid #E2E8F0", background: "#F8FAFC", borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 12.5, color: "#64748B" } }, "\u0642\u0627\u0628\u0644\u06CC\u062A \u062A\u0648\u0644\u06CC\u062F \u0633\u0648\u0627\u0644 \u0628\u0627 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u0628\u0631\u0627\u06CC \u062D\u0633\u0627\u0628 \u0634\u0645\u0627 \u0641\u0639\u0627\u0644 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A. \u0628\u0631\u0627\u06CC \u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0628\u0627 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.")),
            React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 10, lineHeight: 1.8, background: "#F8FAFC", padding: 10, borderRadius: 8 } },
                "\u0628\u0631\u0627\u06CC \u0633\u0648\u0627\u0644 \u0686\u0646\u062F\u06AF\u0632\u06CC\u0646\u0647\u200C\u0627\u06CC:",
                React.createElement("pre", { style: { whiteSpace: "pre-wrap", fontSize: 11, marginTop: 6 } }, `Q: متن سوال
A) گزینه یک
B) گزینه دو
C) گزینه سه
D) گزینه چهار
ANSWER: B
MARK: 2`),
                "\u0628\u0631\u0627\u06CC \u0633\u0648\u0627\u0644 \u062A\u0634\u0631\u06CC\u062D\u06CC:",
                React.createElement("pre", { style: { whiteSpace: "pre-wrap", fontSize: 11, marginTop: 6 } }, `Q: متن سوال
TYPE: ESSAY
ANSWER: پاسخ نمونه (اختیاری)
KEYWORDS: کلمه۱, کلمه۲ (اختیاری)
MARK: 2`),
                "\u0628\u06CC\u0646 \u0647\u0631 \u062F\u0648 \u0633\u0648\u0627\u0644 \u06CC\u06A9 \u062E\u0637 \u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631."),
            React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 8 } },
                React.createElement("label", { style: { fontSize: 12.5, fontWeight: 700, color: "#2563EB", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 } },
                    React.createElement(Upload, { size: 14 }),
                    "\u0622\u067E\u0644\u0648\u062F \u0641\u0627\u06CC\u0644 \u0645\u062A\u0646\u06CC",
                    React.createElement("input", { type: "file", accept: ".txt,text/plain", style: { display: "none" }, onChange: (e) => {
                            const file = e.target.files && e.target.files[0];
                            if (!file)
                                return;
                            const reader = new FileReader();
                            reader.onload = (ev) => setBulkText((prev) => (prev ? prev + "\n\n" : "") + String(ev.target.result || ""));
                            reader.readAsText(file, "UTF-8");
                            e.target.value = "";
                        } }))),
            React.createElement("textarea", { value: bulkText, onChange: (e) => setBulkText(e.target.value), rows: 10, style: { ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: 12 }, placeholder: "\u0633\u0648\u0627\u0644\u0627\u062A \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u067E\u06CC\u0633\u062A \u06A9\u0646\u060C \u06CC\u0627 \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u06CC \u0628\u0627\u0644\u0627 \u06CC\u06A9 \u0641\u0627\u06CC\u0644 \u0645\u062A\u0646\u06CC \u0622\u067E\u0644\u0648\u062F \u06A9\u0646..." }),
            bulkError && React.createElement("div", { style: { color: "#D97706", fontSize: 12, marginTop: 8 } }, bulkError),
            React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 } },
                React.createElement(Button, { variant: "ghost", onClick: () => setShowBulkImport(false) }, "\u0627\u0646\u0635\u0631\u0627\u0641"),
                React.createElement(Button, { onClick: runBulkImport }, "\u0627\u0641\u0632\u0648\u062F\u0646 \u0633\u0648\u0627\u0644\u0627\u062A")))),
        showCopyFromExam && (React.createElement(Modal, { title: "\u06A9\u067E\u06CC \u0633\u0648\u0627\u0644 \u0627\u0632 \u06CC\u06A9 \u0622\u0632\u0645\u0648\u0646 \u0628\u0647 \u0628\u0627\u0646\u06A9", onClose: () => setShowCopyFromExam(false) },
            React.createElement(Field, { label: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0622\u0632\u0645\u0648\u0646 \u0645\u0628\u062F\u0623" },
                React.createElement("select", { value: copySourceExam, onChange: (e) => { setCopySourceExam(e.target.value); setCopySelected([]); }, style: { ...inputStyle } },
                    React.createElement("option", { value: "" }, "\u2014 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u2014"),
                    myExams.map((e) => React.createElement("option", { key: e.id, value: e.id }, e.title)))),
            sourceQuestions.length > 0 && (React.createElement("div", { style: { maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 } }, sourceQuestions.map((q) => (React.createElement("div", { key: q.id, onClick: () => setCopySelected((s) => s.includes(q.id) ? s.filter((x) => x !== q.id) : [...s, q.id]), style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, cursor: "pointer", background: copySelected.includes(q.id) ? "#EFF6FF" : "#F8FAFC" } },
                copySelected.includes(q.id) ? React.createElement(CheckCircle2, { size: 16, color: "#2563EB" }) : React.createElement(Circle, { size: 16, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } },
                    React.createElement(MathText, { text: q.question_text }))))))),
            React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
                React.createElement(Button, { variant: "ghost", onClick: () => setShowCopyFromExam(false) }, "\u0627\u0646\u0635\u0631\u0627\u0641"),
                React.createElement(Button, { onClick: runCopyFromExam, disabled: copySelected.length === 0 },
                    "\u0627\u0641\u0632\u0648\u062F\u0646 ",
                    copySelected.length > 0 ? `(${copySelected.length})` : "")))),
        showAddToExam && (React.createElement(Modal, { title: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0633\u0648\u0627\u0644\u0627\u062A \u0628\u0627\u0646\u06A9 \u0628\u0647 \u0622\u0632\u0645\u0648\u0646", onClose: () => { setShowAddToExam(false); setAddToExamPool([]); setAddSelected([]); } },
            React.createElement(Field, { label: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0622\u0632\u0645\u0648\u0646 \u0645\u0642\u0635\u062F" },
                React.createElement("select", { value: targetExam, onChange: (e) => setTargetExam(e.target.value), style: { ...inputStyle } },
                    React.createElement("option", { value: "" }, "\u2014 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u2014"),
                    myExams.map((e) => React.createElement("option", { key: e.id, value: e.id }, e.title)))),
            addToExamPool.length > 0 && (React.createElement("div", { style: { maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 } }, addToExamPool.map((q) => (React.createElement("div", { key: q.id, onClick: () => setAddSelected((s) => s.includes(q.id) ? s.filter((x) => x !== q.id) : [...s, q.id]), style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, cursor: "pointer", background: addSelected.includes(q.id) ? "#EFF6FF" : "#F8FAFC" } },
                addSelected.includes(q.id) ? React.createElement(CheckCircle2, { size: 16, color: "#2563EB" }) : React.createElement(Circle, { size: 16, color: "#CBD5E1" }),
                React.createElement("span", { style: { fontSize: 13, color: "#334155" } },
                    React.createElement(MathText, { text: q.question_text }))))))),
            React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
                React.createElement(Button, { variant: "ghost", onClick: () => { setShowAddToExam(false); setAddToExamPool([]); setAddSelected([]); } }, "\u0627\u0646\u0635\u0631\u0627\u0641"),
                React.createElement(Button, { onClick: runAddToExam, disabled: !targetExam || addSelected.length === 0 },
                    "\u0627\u0641\u0632\u0648\u062F\u0646 ",
                    addSelected.length > 0 ? `(${addSelected.length})` : ""))))));
}
/* ---------------------------------------------------------
   TAKE EXAM (student flow)
--------------------------------------------------------- */

/* ===== screens-taking.js ===== */
"use strict";
/* ---------------------------------------------------------
   STUDENT EXAM-TAKING FLOW + RESULTS + ESSAY GRADING
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
// Shown to students after they submit an exam, picked at random each time.
// Falls back to this built-in list if the teacher hasn't customized it in Settings.
const DEFAULT_FINISH_MESSAGES = [
    "موفق باشی! 🌟",
    "آفرین، به خوبی تمومش کردی.",
    "دستت درد نکنه، خسته نباشی!",
    "عالی بود، منتظر نتیجه باش.",
];
function TakeExamScreen({ exam, questions, roster = [], classes = [], fetchQuestionsForName, onFinish, onExit }) {
    const [stage, setStage] = useState("enter"); // enter -> exam -> done
    const [studentName, setStudentName] = useState("");
    const [classCode, setClassCode] = useState("");
    const nameOnly = exam.entry_mode === "name_only";
    const allowedClassIds = exam.restrict_class_ids || (exam.restrict_class_id ? [exam.restrict_class_id] : []);
    const restricted = !nameOnly && allowedClassIds.length > 0;
    // v76: روستر (شامل کد شخصی دانش‌آموزها) دیگه هیچ‌وقت به کلاینت فرستاده
    // نمی‌شه، پس نمی‌شه از roster.length برای تصمیم پیش‌فرض تب "کد" استفاده
    // کرد. classes.length یه تخمین معقوله (اگه مدرسه کلاس تعریف کرده، احتمالاً
    // روستر هم داره) — در بدترین حالت دانش‌آموز خودش رو "ورود با نام" می‌زنه.
    const [entryMode, setEntryMode] = useState(nameOnly ? "name" : ((classes.length > 0 || restricted) ? "code" : "name"));
    const [codeInput, setCodeInput] = useState("");
    // تطبیق کد حالا سمت سرور انجام می‌شه (handleExamVerifyCode) نه محلی —
    // null: هنوز چک نشده، "notfound": کد پیدا نشد، وگرنه {fullname, className, mismatch}
    const [codeCheck, setCodeCheck] = useState(null);
    const [codeChecking, setCodeChecking] = useState(false);
    useEffect(() => {
        const trimmed = codeInput.trim();
        if (entryMode !== "code" || !trimmed) {
            setCodeCheck(null);
            return;
        }
        let cancelled = false;
        setCodeChecking(true);
        const t = setTimeout(async () => {
            try {
                const r = await fetch(`/api/exam-verify-code?examId=${encodeURIComponent(exam.id)}&code=${encodeURIComponent(trimmed)}`);
                const d = await r.json().catch(() => ({ ok: false }));
                if (!cancelled)
                    setCodeCheck(d.ok ? { fullname: d.fullname, className: d.className, mismatch: d.mismatch } : "notfound");
            }
            catch {
                if (!cancelled)
                    setCodeCheck("notfound");
            }
            finally {
                if (!cancelled)
                    setCodeChecking(false);
            }
        }, 400);
        return () => { cancelled = true; clearTimeout(t); };
    }, [codeInput, entryMode, exam.id]);
    const matchedRoster = codeCheck && codeCheck !== "notfound" ? codeCheck : null;
    const classMismatch = !!(matchedRoster && matchedRoster.mismatch);
    const restrictedClassName = restricted ? allowedClassIds.map((id) => classes.find((c) => c.id === id)?.name || "").filter(Boolean).join("، ") : "";
    // token شرکت در آزمون که handleExamStart بعد از تأیید موفق صادر می‌کنه —
    // submit/آپلود عکس پاسخ/draft-save بهش نیاز دارن. state نیست چون توی
    // effect/تابع‌های جدا (نه رندر) استفاده می‌شه.
    const attemptTokenRef = useRef(null);
    const rosterIdRef = useRef(null);
    const examQuestions = questions.filter((q) => q.exam_id === exam.id);
    const [current, setCurrent] = useState(0);
    const [selections, setSelections] = useState({}); // qid -> 'A'..'D' | [letters] | text
    const [photoKeys, setPhotoKeys] = useState({}); // qid -> R2 key of uploaded handwritten-answer photo
    const [photoPreviews, setPhotoPreviews] = useState({}); // qid -> local object URL for instant preview
    const [photoUploading, setPhotoUploading] = useState({}); // qid -> bool
    const [photoError, setPhotoError] = useState({}); // qid -> error message
    const [visited, setVisited] = useState({});
    const [startedAt, setStartedAt] = useState(null);
    const reentriesRef = useRef(0); // how many times this student re-entered an already-started exam (device swap / possible link-sharing) — surfaced to the teacher's live-monitoring screen
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [accessCodeInput, setAccessCodeInput] = useState("");
    const [enterError, setEnterError] = useState("");
    const [checking, setChecking] = useState(false);
    const [qOrder, setQOrder] = useState(null); // array of question ids, display order
    const [optOrder, setOptOrder] = useState({}); // qid -> [origLetter,...] display order
    const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
    const [finishMessages, setFinishMessages] = useState(DEFAULT_FINISH_MESSAGES);
    // The teacher's custom end-of-exam messages (set in Settings), if any —
    // included directly on the exam object by /api/exam-session.
    useEffect(() => {
        if (Array.isArray(exam.finish_messages) && exam.finish_messages.length > 0) {
            setFinishMessages(exam.finish_messages);
        }
    }, [exam]);
    const orderedQuestions = qOrder
        ? qOrder.map((id) => examQuestions.find((q) => q.id === id)).filter(Boolean)
        : examQuestions;
    const totalSeconds = exam.duration_minutes ? exam.duration_minutes * 60 : null;
    // v72: تعداد دفعات ذخیره‌ی دوره‌ای در طول امتحان — قابل‌تنظیم توسط مدیرکل
    // (SuperAdminDashboardScreen)، پیش‌فرض ۵. یک‌بار موقع ورود دانش‌آموز خونده می‌شه.
    const [draftSaveCount, setDraftSaveCount] = useState(5);
    useEffect(() => {
        let cancelled = false;
        getJSON("settings:global").then((s) => { if (!cancelled)
            setDraftSaveCount(s?.draft_save_count || 5); });
        return () => { cancelled = true; };
    }, []);
    const [remaining, setRemaining] = useState(totalSeconds);
    const autoSubmittedRef = useRef(false);
    const [tabSwitches, setTabSwitches] = useState(0);
    const [isOnline, setIsOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine);
    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);
        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);
        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);
    const letters = ["A", "B", "C", "D"];
    // Anti-cheat: count how many times the student leaves this tab/window during the exam.
    useEffect(() => {
        if (stage !== "exam")
            return;
        const onVisibility = () => {
            if (document.hidden)
                setTabSwitches((c) => c + 1);
        };
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, [stage]);
    const startExam = async () => {
        // بررسی‌های آنی سمت کلاینت فقط برای UX سریع‌ترن — تصمیم واقعی و تنها
        // منبع مورد اعتماد همیشه پاسخ /api/exam-start سمت سرورِه (v76).
        if (entryMode === "code" && (!matchedRoster || classMismatch)) {
            setEnterError(classMismatch ? "این کد متعلق به کلاس دیگری است و اجازه‌ی شرکت در این آزمون را ندارد." : "کد وارد شده معتبر نیست.");
            return;
        }
        if (entryMode === "name" && !studentName.trim())
            return;
        setEnterError("");
        setChecking(true);
        let startResp;
        try {
            const r = await fetch("/api/exam-start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    examId: exam.id,
                    entryMode,
                    code: entryMode === "code" ? codeInput.trim() : undefined,
                    studentName: entryMode === "name" ? studentName.trim() : undefined,
                    accessCode: accessCodeInput.trim(),
                }),
            });
            startResp = await r.json().catch(() => ({}));
            if (!r.ok || !startResp.ok) {
                setChecking(false);
                setEnterError(startResp.error || "ورود به آزمون ناموفق بود.");
                return;
            }
        }
        catch {
            setChecking(false);
            setEnterError("اتصال برقرار نشد.");
            return;
        }
        const resolvedName = startResp.studentName;
        const resolvedClass = entryMode === "code" ? (startResp.className || "") : classCode.trim();
        attemptTokenRef.current = startResp.token;
        rosterIdRef.current = startResp.rosterId || null;
        const nameNorm = resolvedName;
        setStudentName(resolvedName);
        setClassCode(resolvedClass);
        let already = false;
        try {
            const r = await fetch(`/api/exam-attempted?examId=${encodeURIComponent(exam.id)}&name=${encodeURIComponent(nameNorm)}`);
            if (r.ok) {
                const d = await r.json();
                already = !!d.already;
            }
        }
        catch { /* if the check fails, fall through and let them attempt — better than blocking a legit student */ }
        if (already && !exam.allow_retake) {
            setChecking(false);
            setEnterError("شما قبلاً در این آزمون شرکت کرده‌اید.");
            return;
        }
        const draftKeyForLoad = `draft:${exam.id}:${nameNorm}`;
        const [remoteDraft, localDraft, examDraftResp] = await Promise.all([
            getJSON(draftKeyForLoad),
            Promise.resolve(getLocalDraft(draftKeyForLoad)),
            // v72: آخرین بسته‌ی دوره‌ای که Durable Object این آزمون فلاش کرده —
            // ممکنه چند دقیقه قدیمی‌تر از جواب واقعی باشه (بین دو فلاش)، ولی
            // این تنها راهیه که جواب‌ها بین دو دستگاه مختلف منتقل بشن.
            fetch(`/api/exam-draft?examId=${encodeURIComponent(exam.id)}&name=${encodeURIComponent(nameNorm)}&token=${encodeURIComponent(attemptTokenRef.current || "")}`)
                .then((r) => (r.ok ? r.json() : { data: null })).catch(() => ({ data: null })),
        ]);
        const serverAnswerDraft = examDraftResp?.data || null;
        const bestServerDraft = (serverAnswerDraft && (!remoteDraft || (serverAnswerDraft.savedAt || 0) >= (remoteDraft.savedAt || 0))) ? serverAnswerDraft : remoteDraft;
        // Prefer whichever copy is actually newer — the server one is only
        // written at exam start (see below) and the local one might not
        // exist yet (first time on this device) or might be from an older
        // session than the one that has the freshest save (e.g. a different device).
        const draft = (localDraft && (!bestServerDraft || (localDraft.savedAt || 0) > (bestServerDraft.savedAt || 0))) ? localDraft : bestServerDraft;
        // اگه این آزمون بانک سؤال تصادفی داره، تا الان (قبل از معلوم‌شدن اسم)
        // سرور هیچ سؤالی نفرستاده بود؛ الان با اسم دوباره می‌گیریم تا همون
        // زیرمجموعه‌ی مخصوص همین دانش‌آموز (قطعی، نه هر بار متفاوت) بیاد.
        let effectiveQuestions = examQuestions;
        if (exam.random_pool_count > 0 && fetchQuestionsForName) {
            const fetched = await fetchQuestionsForName(exam.id, nameNorm, rosterIdRef.current);
            if (fetched.length > 0)
                effectiveQuestions = fetched;
        }
        // امنیت زمان‌بندی: زمان شروع باید فقط یک‌بار — همین اولین ورود واقعی —
        // روی سرور ثبت بشه، نه هر بار که دانش‌آموز (یا هر کس دیگه‌ای با همین
        // لینک) صفحه رو رفرش/دستگاه عوض می‌کنه. اگه از قبل رکورد سرور startedAt
        // داشته باشه، یعنی این ورود دومه — همون startedAt قدیمی رو حفظ می‌کنیم
        // (تایمر از همون‌جا ادامه پیدا می‌کنه، نه از نو) و شمارنده‌ی ورود مجدد
        // رو بالا می‌بریم تا معلم تو «پایش زنده» ببینتش (نشونه‌ی احتمالی تقلب:
        // اشتراک لینک با یه نفر دیگه، یا تلاش برای گرفتن زمان اضافه).
        const serverStartedAt = remoteDraft?.startedAt || Date.now();
        const reentryCount = remoteDraft?.startedAt ? (remoteDraft.reentries || 0) + 1 : 0;
        reentriesRef.current = reentryCount;
        if (!remoteDraft?.startedAt) {
            // اولین ورود واقعی — همین یک درخواست، زمان شروع رو رسمی می‌کنه.
            setJSON(draftKeyForLoad, { selections: draft?.selections || {}, current: draft?.current || 0, qOrder: draft?.qOrder || null, optOrder: draft?.optOrder || null, savedAt: Date.now(), startedAt: serverStartedAt, reentries: 0 }).catch(() => { });
        }
        else if (reentryCount > 0) {
            // ورود دوم به بعد — فقط شمارنده رو به‌روزرسانی می‌کنیم (بدون تغییر startedAt).
            setJSON(draftKeyForLoad, { ...draft, startedAt: serverStartedAt, savedAt: draft?.savedAt || Date.now(), reentries: reentryCount }).catch(() => { });
        }
        let order, options;
        if (draft && draft.qOrder) {
            setSelections(draft.selections || {});
            setCurrent(draft.current || 0);
            order = draft.qOrder;
            options = draft.optOrder || {};
        }
        else {
            order = exam.shuffle_questions ? shuffleArray(effectiveQuestions.map((q) => q.id)) : effectiveQuestions.map((q) => q.id);
            options = {};
            effectiveQuestions.forEach((q) => {
                options[q.id] = q.type === "matching" ? shuffleArray((q.right_items || []).map((_, i) => i))
                    : (q.type === "mc" && exam.shuffle_options) ? shuffleArray(["A", "B", "C", "D"]) : ["A", "B", "C", "D"];
            });
        }
        setQOrder(order);
        setOptOrder(options);
        setChecking(false);
        setStartedAt(serverStartedAt);
        // اگه این ورود دوم/سومه (تلاش برای گرفتن زمان اضافه با رفرش/تعویض
        // دستگاه)، زمان باقی‌مونده رو بر اساس همون startedAt واقعیِ سرور
        // حساب می‌کنیم، نه از نو کامل — این همون چیزیه که جلوی سوءاستفاده
        // از تایمر رو می‌گیره.
        if (totalSeconds !== null) {
            const elapsedSec = Math.max(0, Math.round((Date.now() - serverStartedAt) / 1000));
            setRemaining(Math.max(0, totalSeconds - elapsedSec));
        }
        setVisited({ 0: true });
        setStage("exam");
        if (exam.require_fullscreen && document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => { });
        }
    };
    // Autosave answers as the student works through the exam, so a refresh doesn't lose progress.
    // Local storage (every change, free) is the primary safety net on the SAME device.
    // For cross-device recovery (v72), a periodic batched save (see effect below) also
    // reaches the server — but via a Durable Object that batches ALL students of this
    // exam into one shared D1 row per flush, not one row per student, so it stays cheap
    // even at scale. See /areas/exam-app-schools.md items 46 (why per-student writes
    // were removed) and 47 (how batched writes bring cross-device safety back cheaply).
    const latestDraftRef = useRef(null);
    useEffect(() => {
        if (stage !== "exam")
            return;
        const draftValue = { selections, current, qOrder, optOrder, savedAt: Date.now(), startedAt, reentries: reentriesRef.current };
        latestDraftRef.current = draftValue;
        saveLocalDraft(`draft:${exam.id}:${studentName.trim()}`, draftValue);
    }, [selections, current, stage, qOrder, optOrder]);
    // v72: هر «مدت آزمون ÷ ۵» دقیقه (حداقل ۳ دقیقه) یک بار، آخرین وضعیت رو
    // به Durable Object همین آزمون می‌فرسته — نه مستقیم به D1. چند تا از
    // این‌ها که با هم جمع بشن، فقط یک نوشتن روی D1 مصرف می‌کنن، نه یکی
    // به‌ازای هر دانش‌آموز.
    useEffect(() => {
        if (stage !== "exam")
            return;
        const mins = Math.max(3, Math.round((exam.duration_minutes || 60) / draftSaveCount));
        const intervalMs = mins * 60 * 1000;
        const t = setInterval(() => {
            const d = latestDraftRef.current;
            if (!d)
                return;
            fetch("/api/draft-save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    examId: exam.id, studentName: studentName.trim(), durationMinutes: exam.duration_minutes, saveCount: draftSaveCount,
                    selections: d.selections, current: d.current, qOrder: d.qOrder, optOrder: d.optOrder,
                    token: attemptTokenRef.current,
                }),
            }).catch(() => { });
        }, intervalMs);
        return () => clearInterval(t);
    }, [stage, exam.id, exam.duration_minutes, draftSaveCount]);
    // Countdown ticker — starts once the exam stage begins, only when the exam has a time limit.
    useEffect(() => {
        if (stage !== "exam" || totalSeconds === null)
            return;
        const t = setInterval(() => {
            setRemaining((r) => {
                if (r === null)
                    return r;
                if (r <= 1) {
                    clearInterval(t);
                    return 0;
                }
                return r - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [stage]);
    const fmtClock = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };
    const selectOption = (qid, letter) => {
        setSelections((s) => ({ ...s, [qid]: letter }));
    };
    const toggleMultiOption = (qid, letter) => {
        setSelections((s) => {
            const cur = Array.isArray(s[qid]) ? s[qid] : [];
            const next = cur.includes(letter) ? cur.filter((l) => l !== letter) : [...cur, letter];
            return { ...s, [qid]: next };
        });
    };
    const setBlankAnswer = (qid, blankIndex, value) => {
        setSelections((s) => {
            const cur = Array.isArray(s[qid]) ? [...s[qid]] : [];
            while (cur.length <= blankIndex)
                cur.push("");
            cur[blankIndex] = value;
            return { ...s, [qid]: cur };
        });
    };
    const setMatchAnswer = (qid, leftId, rightId) => {
        setSelections((s) => {
            const cur = (s[qid] && typeof s[qid] === "object" && !Array.isArray(s[qid])) ? { ...s[qid] } : {};
            if (rightId == null || rightId === "")
                delete cur[leftId];
            else
                cur[leftId] = rightId;
            return { ...s, [qid]: cur };
        });
    };
    const goTo = (i) => {
        if (exam.no_going_back && i < current)
            return;
        setCurrent(i);
        setVisited((v) => ({ ...v, [i]: true }));
    };
    const MAX_PHOTO_MB = 15; // سقف فایل خام قبل از فشرده‌سازی (خروجی نهایی خیلی کوچیک‌تره)
    const uploadAnswerPhoto = async (qid, file) => {
        if (!file)
            return;
        if (!file.type.startsWith("image/")) {
            setPhotoError((e) => ({ ...e, [qid]: "فقط فایل تصویر مجاز است" }));
            return;
        }
        if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
            setPhotoError((e) => ({ ...e, [qid]: `حجم عکس نباید بیشتر از ${MAX_PHOTO_MB} مگابایت باشد` }));
            return;
        }
        setPhotoError((e) => ({ ...e, [qid]: "" }));
        setPhotoUploading((u) => ({ ...u, [qid]: true }));
        setPhotoPreviews((p) => ({ ...p, [qid]: URL.createObjectURL(file) }));
        try {
            const compressed = await compressImageToBlob(file);
            const r = await fetch(`/api/upload-answer-photo?examId=${encodeURIComponent(exam.id)}&token=${encodeURIComponent(attemptTokenRef.current || "")}`, {
                method: "POST",
                headers: { "Content-Type": "image/jpeg" },
                body: compressed,
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok || !data.key) {
                setPhotoError((e) => ({ ...e, [qid]: data.error || "آپلود عکس ناموفق بود" }));
            }
            else {
                setPhotoKeys((k) => ({ ...k, [qid]: data.key }));
            }
        }
        catch {
            setPhotoError((e) => ({ ...e, [qid]: "اتصال برقرار نشد" }));
        }
        setPhotoUploading((u) => ({ ...u, [qid]: false }));
    };
    const removeAnswerPhoto = (qid) => {
        setPhotoKeys((k) => { const n = { ...k }; delete n[qid]; return n; });
        setPhotoPreviews((p) => { const n = { ...p }; delete n[qid]; return n; });
        setPhotoError((e) => { const n = { ...e }; delete n[qid]; return n; });
    };
    const submitExam = async () => {
        setSubmitting(true);
        const studentId = uid();
        const timeTakenSec = Math.round((Date.now() - startedAt) / 1000);
        const rawAnswers = orderedQuestions.map((q) => {
            const sel = selections[q.id] || null;
            let selected_option;
            if (q.type === "matching") {
                selected_option = JSON.stringify(sel && typeof sel === "object" && !Array.isArray(sel) ? sel : {});
            }
            else if (Array.isArray(sel)) {
                selected_option = q.type === "fill_blank" ? JSON.stringify(sel) : sel.join(",");
            }
            else {
                selected_option = sel;
            }
            if (q.type === "essay" && photoKeys[q.id]) {
                selected_option = `photo:${photoKeys[q.id]}`;
            }
            return { question_id: q.id, selected_option, time_taken: timeTakenSec };
        });
        const studentRecord = {
            id: studentId, fullname: studentName.trim(), class_code: classCode.trim(),
            teacher_id: exam.teacher_id, tab_switches: tabSwitches,
            roster_id: entryMode === "code" ? rosterIdRef.current : null,
        };
        const draftKey = `draft:${exam.id}:${studentName.trim()}`;
        let cheatAlert = null;
        if (tabSwitches > 0) {
            cheatAlert = {
                id: uid(), teacher_id: exam.teacher_id, exam_id: exam.id, exam_title: exam.title,
                student_name: studentName.trim(), tab_switches: tabSwitches, seen: false,
                created_at: new Date().toISOString(),
            };
        }
        // Try to submit for real first (only if we appear to have a connection —
        // no point waiting on doomed requests). If anything fails or we're
        // offline, queue the whole submission locally so nothing is lost; it
        // gets sent automatically once the connection comes back. Grading
        // (is_correct / awarded_mark) is always computed server-side from the
        // real answer key — never trusted from this client.
        let synced = false;
        let summary = null;
        let rejectMessage = null;
        if (typeof navigator === "undefined" || navigator.onLine) {
            try {
                const r = await fetch("/api/answers/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ student_id: studentId, student: studentRecord, exam_id: exam.id, answers: rawAnswers, cheat_alert: cheatAlert, token: attemptTokenRef.current }),
                });
                if (r.ok) {
                    summary = await r.json();
                    await deleteKey(draftKey);
                    deleteLocalDraft(draftKey);
                    synced = true;
                }
                else if (r.status >= 400 && r.status < 500) {
                    // v76.1: یک رد قطعی سمت سرور (مثلاً «قبلاً شرکت کردی» یا «مهلت
                    // آزمون تموم شده») — نه یک مشکل شبکه‌ای. صف‌کردن برای تلاش مجدد
                    // فقط باعث تکرار همون خطا می‌شه؛ اینجا مستقیم به دانش‌آموز نشون
                    // می‌دیم و دیگه صف نمی‌کنیم.
                    const errBody = await r.json().catch(() => ({}));
                    rejectMessage = errBody.error || "ارسال پاسخ‌ها رد شد.";
                    synced = true;
                    deleteLocalDraft(draftKey);
                }
            }
            catch {
                synced = false;
            }
        }
        if (!synced) {
            queueOfflineSubmission({
                id: uid(), examId: exam.id, studentRecord,
                answerRecords: rawAnswers.map((a) => ({ ...a })),
                cheatAlert, draftKeyToDelete: draftKey, createdAt: new Date().toISOString(),
                token: attemptTokenRef.current,
            });
            // Answers are now safely captured in the offline queue itself — the
            // draft (local or server) has served its purpose and can be cleared.
            deleteLocalDraft(draftKey);
        }
        const list = finishMessages.length > 0 ? finishMessages : DEFAULT_FINISH_MESSAGES;
        const finishMsg = list[Math.floor(Math.random() * list.length)];
        setResult({
            correctCount: summary?.correctCount ?? null,
            total: orderedQuestions.length,
            pct: summary?.pct ?? null,
            timeTakenSec,
            pendingEssays: summary?.pendingEssays ?? null,
            finishMsg,
            offlineQueued: !synced,
            rejectMessage,
            reveal: summary?.reveal || null,
        });
        setSubmitting(false);
        setStage("done");
        onFinish();
    };
    useEffect(() => {
        if (stage === "exam" && remaining === 0 && !autoSubmittedRef.current) {
            autoSubmittedRef.current = true;
            submitExam();
        }
    }, [remaining, stage]);
    if (stage === "enter") {
        return (React.createElement("div", { style: { minHeight: "100vh", background: "linear-gradient(135deg,#132A52,#1D3E73)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } },
            React.createElement("div", { style: { background: "#fff", borderRadius: 20, padding: 36, width: "100%", maxWidth: 400 } },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#2563EB", marginBottom: 6 } }, "\u0648\u0631\u0648\u062F \u0628\u0647 \u0622\u0632\u0645\u0648\u0646"),
                React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: "#1E293B", marginBottom: 20 } }, exam.title),
                restricted && (React.createElement("div", { style: { fontSize: 12, color: "#2563EB", background: "#EFF6FF", borderRadius: 8, padding: "8px 10px", marginBottom: 14 } },
                    "\u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u06A9\u0644\u0627\u0633(\u0647\u0627\u06CC) \u00AB",
                    restrictedClassName,
                    "\u00BB \u0627\u0633\u062A.")),
                entryMode === "code" ? (React.createElement(React.Fragment, null,
                    React.createElement(Field, { label: "\u06A9\u062F \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC" },
                        React.createElement(TextInput, { value: codeInput, onChange: (e) => setCodeInput(e.target.value.replace(/\D/g, "")), placeholder: "\u06A9\u062F\u06CC \u06A9\u0647 \u0645\u0639\u0644\u0645 \u0628\u0647 \u062A\u0648 \u062F\u0627\u062F\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646", style: { fontSize: 18, letterSpacing: 3, textAlign: "center", fontWeight: 700 }, maxLength: 6 })),
                    codeInput.trim() && !codeChecking && (matchedRoster ? (classMismatch ? (React.createElement("div", { style: { fontSize: 12, color: "#DC2626", marginBottom: 14 } }, "\u0627\u06CC\u0646 \u06A9\u062F \u0645\u062A\u0639\u0644\u0642 \u0628\u0647 \u06A9\u0644\u0627\u0633 \u062F\u06CC\u06AF\u0631\u06CC \u0627\u0633\u062A \u0648 \u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u0634\u0631\u06A9\u062A \u062F\u0631 \u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646 \u0631\u0627 \u0646\u062F\u0627\u0631\u062F.")) : (React.createElement("div", { style: { fontSize: 13, color: "#16A34A", background: "#F0FDF4", borderRadius: 8, padding: "8px 12px", marginBottom: 14 } },
                        "\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u060C ",
                        matchedRoster.fullname,
                        matchedRoster.className ? ` (${matchedRoster.className})` : ""))) : (React.createElement("div", { style: { fontSize: 12, color: "#DC2626", marginBottom: 14 } }, "\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F."))),
                    !restricted && !nameOnly && (React.createElement("div", { onClick: () => setEntryMode("name"), style: { fontSize: 12, color: "#94A3B8", cursor: "pointer", marginBottom: 14 } }, "\u06A9\u062F \u0646\u062F\u0627\u0631\u06CC\u061F \u0648\u0631\u0648\u062F \u0628\u0627 \u0646\u0627\u0645")))) : (React.createElement(React.Fragment, null,
                    React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC" },
                        React.createElement(TextInput, { value: studentName, onChange: (e) => setStudentName(e.target.value), placeholder: "\u0646\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646" })),
                    React.createElement(Field, { label: "\u06A9\u062F \u06A9\u0644\u0627\u0633 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" },
                        React.createElement(TextInput, { value: classCode, onChange: (e) => setClassCode(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u062F\u0647\u0645-\u0627\u0644\u0641" })),
                    !nameOnly && (React.createElement("div", { onClick: () => setEntryMode("code"), style: { fontSize: 12, color: "#94A3B8", cursor: "pointer", marginBottom: 14 } }, "\u06A9\u062F \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u062F\u0627\u0631\u06CC\u061F \u0648\u0631\u0648\u062F \u0628\u0627 \u06A9\u062F")))),
                exam.access_code && (React.createElement(Field, { label: "\u06A9\u062F \u062F\u0633\u062A\u0631\u0633\u06CC \u0622\u0632\u0645\u0648\u0646" },
                    React.createElement(TextInput, { value: accessCodeInput, onChange: (e) => setAccessCodeInput(e.target.value), placeholder: "\u06A9\u062F \u0631\u0627 \u0627\u0632 \u0645\u0639\u0644\u0645 \u0628\u06AF\u06CC\u0631" }))),
                React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 18 } },
                    exam.random_pool_count > 0
                        ? `هر شرکت‌کننده ${exam.random_pool_count} سؤال تصادفی از بانک این آزمون دریافت می‌کند.`
                        : `${examQuestions.length} سوال در این آزمون وجود دارد.`,
                    totalSeconds !== null && ` زمان مجاز: ${exam.duration_minutes} دقیقه.`,
                    exam.no_going_back && " امکان بازگشت به سوالات قبلی وجود ندارد."),
                (exam.opens_at || exam.closes_at) && (React.createElement("div", { style: { fontSize: 12, color: "#2563EB", background: "#EFF6FF", borderRadius: 8, padding: "8px 10px", marginBottom: 14 } },
                    exam.opens_at && `از ${new Date(exam.opens_at).toLocaleString("fa-IR")} `,
                    exam.closes_at && `تا ${new Date(exam.closes_at).toLocaleString("fa-IR")}`,
                    " قابل شرکت است.")),
                enterError && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, enterError),
                React.createElement(Button, { onClick: startExam, disabled: (exam.random_pool_count > 0 ? false : examQuestions.length === 0) || checking || (entryMode === "code" && (!matchedRoster || classMismatch)), style: { width: "100%", justifyContent: "center" } }, checking ? "در حال بررسی..." : "شروع آزمون"),
                exam.random_pool_count <= 0 && examQuestions.length === 0 && React.createElement("div", { style: { fontSize: 12, color: "#DC2626", marginTop: 10 } }, "\u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646 \u0647\u0646\u0648\u0632 \u0633\u0648\u0627\u0644\u06CC \u0646\u062F\u0627\u0631\u062F."),
                React.createElement("div", { onClick: onExit, style: { textAlign: "center", marginTop: 16, fontSize: 12, color: "#94A3B8", cursor: "pointer" } }, "\u0628\u0627\u0632\u06AF\u0634\u062A"))));
    }
    if (stage === "done" && result) {
        return (React.createElement("div", { style: { minHeight: "100vh", background: "linear-gradient(135deg,#132A52,#1D3E73)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } },
            React.createElement("div", { style: { background: "#fff", borderRadius: 20, padding: 40, width: "100%", maxWidth: 480, textAlign: "center" } },
                React.createElement("div", { style: { width: 68, height: 68, borderRadius: "50%", background: result.rejectMessage ? "#FEF2F2" : "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" } },
                    React.createElement(Award, { size: 32, color: result.rejectMessage ? "#DC2626" : "#16A34A" })),
                result.rejectMessage ? (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { fontSize: 14, color: "#64748B", marginBottom: 6 } }, "\u067E\u0627\u0633\u062E\u200C\u0647\u0627 \u062B\u0628\u062A \u0646\u0634\u062F"),
                    React.createElement("div", { style: { fontSize: 14.5, fontWeight: 700, color: "#DC2626", background: "#FEF2F2", borderRadius: 10, padding: "10px 14px", marginBottom: 18 } }, result.rejectMessage))) : (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { fontSize: 14, color: "#64748B", marginBottom: 6 } }, "\u0622\u0632\u0645\u0648\u0646 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062B\u0628\u062A \u0634\u062F"),
                    React.createElement("div", { style: { fontSize: 38, fontWeight: 900, color: "#1E293B", marginBottom: 6 } }, result.pct != null ? `${result.pct}%` : "—"),
                    React.createElement("div", { style: { fontSize: 13, color: "#64748B", marginBottom: 10 } }, result.correctCount != null ? `${result.correctCount} پاسخ صحیح از ${result.total} سوال` : "پاسخ‌ها ذخیره شد؛ نمره پس از اتصال به اینترنت محاسبه می‌شود."),
                    result.offlineQueued && (React.createElement("div", { style: { fontSize: 12.5, color: "#D97706", background: "#FFFBEB", borderRadius: 10, padding: "10px 12px", marginBottom: 14, lineHeight: 1.9 } }, "\u0686\u0648\u0646 \u062F\u0631 \u0644\u062D\u0638\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0648\u0635\u0644 \u0646\u0628\u0648\u062F\u06CC\u060C \u067E\u0627\u0633\u062E\u200C\u0647\u0627\u06CC\u062A \u0631\u0648\u06CC \u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F. \u0628\u0647\u200C\u0645\u062D\u0636 \u0648\u0635\u0644 \u0634\u062F\u0646 \u0627\u06CC\u0646 \u06AF\u0648\u0634\u06CC \u0628\u0647 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A (\u0647\u0645\u06CC\u0646 \u0627\u067E \u0631\u0648 \u0628\u0627\u0632 \u0646\u06AF\u0647\u200C\u062F\u0627\u0631 \u06CC\u0627 \u0628\u0639\u062F\u0627\u064B \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0627\u0632 \u06A9\u0646)\u060C \u067E\u0627\u0633\u062E\u200C\u0647\u0627 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0631\u0627\u06CC \u0645\u0639\u0644\u0645 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0646.")),
                    result.finishMsg && (React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", borderRadius: 10, padding: "10px 14px", marginBottom: 14 } }, result.finishMsg)),
                    result.pendingEssays > 0 && (React.createElement("div", { style: { fontSize: 12, color: "#D97706", background: "#FFFBEB", borderRadius: 10, padding: "8px 12px", marginBottom: 12 } },
                        "\u0646\u0645\u0631\u0647\u200C\u06CC \u0646\u0647\u0627\u06CC\u06CC \u0645\u0648\u0642\u062A \u0627\u0633\u062A \u2014 ",
                        result.pendingEssays,
                        " \u0633\u0648\u0627\u0644 \u062A\u0634\u0631\u06CC\u062D\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0635\u062D\u06CC\u062D \u062A\u0648\u0633\u0637 \u0645\u0639\u0644\u0645 \u0627\u0633\u062A.")),
                    result.reveal && (React.createElement("div", { style: { textAlign: "right", marginBottom: 22, maxHeight: 320, overflowY: "auto" } }, examQuestions.map((q, idx) => {
                        const optsMap = { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d };
                        const revealed = result.reveal.find((r) => r.question_id === q.id);
                        if (!revealed || q.type === "essay")
                            return null;
                        const sel = selections[q.id];
                        const ok = revealed.is_correct;
                        const tfLabel = (v) => v === "true" ? "درست" : v === "false" ? "غلط" : "بدون پاسخ";
                        if (q.type === "fill_blank") {
                            const studentBlanks = Array.isArray(sel) ? sel : [];
                            const correctBlanks = revealed.correct_blanks || [];
                            return (React.createElement("div", { key: q.id, style: { border: "1px solid #EEF1F6", borderRadius: 10, padding: 12, marginBottom: 8 } },
                                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 6 } },
                                    idx + 1,
                                    ". ",
                                    React.createElement(MathText, { text: q.question_text.split("___").join("______") }),
                                    !ok && React.createElement("span", { style: { fontWeight: 400, color: "#94A3B8" } }, " (\u0646\u0645\u0631\u0647\u200C\u06CC \u062C\u0632\u0626\u06CC \u06AF\u0631\u0641\u062A\u0647 \u0634\u062F\u0647)")),
                                correctBlanks.map((accepted, bi) => {
                                    const studentVal = String(studentBlanks[bi] || "").trim();
                                    const isBlankOk = studentVal && (accepted || []).some((a) => String(a || "").trim().toLowerCase() === studentVal.toLowerCase());
                                    return (React.createElement("div", { key: bi, style: { fontSize: 12, color: isBlankOk ? "#16A34A" : "#DC2626", marginBottom: 2 } },
                                        "\u062C\u0627\u06CC \u062E\u0627\u0644\u06CC ",
                                        bi + 1,
                                        " \u2014 \u067E\u0627\u0633\u062E \u0634\u0645\u0627: ",
                                        studentVal || "بدون پاسخ",
                                        !isBlankOk && React.createElement("span", null,
                                            " \u00B7 \u067E\u0627\u0633\u062E \u0635\u062D\u06CC\u062D: ",
                                            (accepted || []).join("/"))));
                                })));
                        }
                        if (q.type === "matching") {
                            const studentMap = (sel && typeof sel === "object" && !Array.isArray(sel)) ? sel : {};
                            const correctMap = revealed.correct_map || {};
                            const rightById = Object.fromEntries((q.right_items || []).map((r) => [r.id, r.text]));
                            return (React.createElement("div", { key: q.id, style: { border: "1px solid #EEF1F6", borderRadius: 10, padding: 12, marginBottom: 8 } },
                                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 6 } },
                                    idx + 1,
                                    ". ",
                                    React.createElement(MathText, { text: q.question_text }),
                                    !ok && React.createElement("span", { style: { fontWeight: 400, color: "#94A3B8" } }, " (\u0646\u0645\u0631\u0647\u200C\u06CC \u062C\u0632\u0626\u06CC \u06AF\u0631\u0641\u062A\u0647 \u0634\u062F\u0647)")),
                                (q.left_items || []).map((l) => {
                                    const chosenId = studentMap[l.id];
                                    const isPairOk = chosenId && chosenId === correctMap[l.id];
                                    return (React.createElement("div", { key: l.id, style: { fontSize: 12, color: isPairOk ? "#16A34A" : "#DC2626", marginBottom: 2 } },
                                        l.text,
                                        " \u2014 \u067E\u0627\u0633\u062E \u0634\u0645\u0627: ",
                                        chosenId ? (rightById[chosenId] || "؟") : "بدون پاسخ",
                                        !isPairOk && React.createElement("span", null,
                                            " \u00B7 \u067E\u0627\u0633\u062E \u0635\u062D\u06CC\u062D: ",
                                            rightById[correctMap[l.id]] || "؟")));
                                })));
                        }
                        return (React.createElement("div", { key: q.id, style: { border: "1px solid #EEF1F6", borderRadius: 10, padding: 12, marginBottom: 8 } },
                            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 6 } },
                                idx + 1,
                                ". ",
                                React.createElement(MathText, { text: q.question_text })),
                            React.createElement("div", { style: { fontSize: 12, color: ok ? "#16A34A" : "#DC2626" } },
                                "\u067E\u0627\u0633\u062E \u0634\u0645\u0627: ",
                                q.type === "tf" ? tfLabel(sel) : (sel ? `${Array.isArray(sel) ? sel.join("، ") : sel}. ${Array.isArray(sel) ? sel.map((l) => optsMap[l]).join("، ") : optsMap[sel]}` : "بدون پاسخ")),
                            !ok && (React.createElement("div", { style: { fontSize: 12, color: "#16A34A" } },
                                "\u067E\u0627\u0633\u062E \u0635\u062D\u06CC\u062D: ",
                                q.type === "mc_multi"
                                    ? (revealed.correct_answers || []).map((l) => `${l}. ${optsMap[l]}`).join("، ")
                                    : q.type === "tf" ? tfLabel(revealed.correct_answer)
                                        : `${revealed.correct_answer}. ${optsMap[revealed.correct_answer]}`))));
                    }))))),
                React.createElement(Button, { onClick: onExit, style: { width: "100%", justifyContent: "center" } }, "\u0628\u0627\u0632\u06AF\u0634\u062A"))));
    }
    const q = orderedQuestions[current];
    const answeredCount = Object.keys(selections).filter((qid) => {
        const v = selections[qid];
        if (Array.isArray(v))
            return v.some((x) => x);
        if (v && typeof v === "object")
            return Object.keys(v).length > 0;
        return !!v;
    }).length;
    const progressPct = orderedQuestions.length ? Math.round((answeredCount / orderedQuestions.length) * 100) : 0;
    const unansweredCount = orderedQuestions.length - answeredCount;
    return (React.createElement("div", { style: { minHeight: "100vh", background: "#F8FAFC", padding: 24, ...(exam.no_copy_paste ? { userSelect: "none", WebkitUserSelect: "none" } : {}) }, onCopy: (e) => exam.no_copy_paste && e.preventDefault(), onPaste: (e) => exam.no_copy_paste && e.preventDefault(), onCut: (e) => exam.no_copy_paste && e.preventDefault(), onContextMenu: (e) => exam.no_copy_paste && e.preventDefault() },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 } },
            React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: "#1E293B" } }, exam.title),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } },
                !isOnline && (React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#B45309", background: "#FFFBEB", borderRadius: 8, padding: "6px 10px" } }, "\u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0642\u0637\u0639 \u0627\u0633\u062A \u2014 \u067E\u0627\u0633\u062E\u200C\u0647\u0627 \u0628\u0639\u062F\u0627\u064B \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F")),
                React.createElement("div", { style: { fontSize: 13, color: "#64748B", display: "flex", alignItems: "center", gap: 6 } },
                    React.createElement(Clock, { size: 15 }),
                    " ",
                    studentName),
                remaining !== null && (React.createElement("div", { style: {
                        display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 800,
                        padding: "7px 14px", borderRadius: 10,
                        color: remaining <= 120 ? "#DC2626" : "#1E293B",
                        background: remaining <= 120 ? "#FEF2F2" : "#F1F5F9",
                    } },
                    React.createElement(Clock, { size: 15 }),
                    " ",
                    fmtClock(remaining))),
                React.createElement(Button, { variant: "success", onClick: () => (unansweredCount > 0 ? setShowConfirmSubmit(true) : submitExam()), disabled: submitting }, submitting ? "در حال ثبت..." : "پایان و ثبت آزمون"))),
        tabSwitches > 0 && (React.createElement("div", { style: {
                display: "flex", alignItems: "center", gap: 8, background: "#FFFBEB", color: "#B45309",
                border: "1px solid #FDE68A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16,
            } },
            React.createElement(AlertTriangle, { size: 16 }),
            "\u0647\u0634\u062F\u0627\u0631: \u062E\u0631\u0648\u062C \u0627\u0632 \u0635\u0641\u062D\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646 ",
            tabSwitches,
            " \u0628\u0627\u0631 \u062B\u0628\u062A \u0634\u062F. \u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u0628\u0631\u0627\u06CC \u0645\u0639\u0644\u0645 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.")),
        React.createElement("div", { style: { display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" } },
            React.createElement("div", { style: { flex: "1 1 480px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B", marginBottom: 8 } },
                    React.createElement("span", null,
                        "\u0633\u0648\u0627\u0644 ",
                        current + 1,
                        " \u0627\u0632 ",
                        orderedQuestions.length),
                    React.createElement("span", null,
                        progressPct,
                        "%")),
                React.createElement("div", { style: { height: 6, background: "#EEF1F6", borderRadius: 4, marginBottom: 22, overflow: "hidden" } },
                    React.createElement("div", { style: { width: `${progressPct}%`, height: "100%", background: "#2563EB", borderRadius: 4, transition: "width .2s" } })),
                q.section && (React.createElement("div", { style: { display: "inline-block", fontSize: 11.5, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", borderRadius: 6, padding: "3px 10px", marginBottom: 10 } }, q.section)),
                q.type !== "fill_blank" && (React.createElement("div", { style: { fontSize: 17, fontWeight: 700, color: "#1E293B", marginBottom: 16, lineHeight: 1.7 } },
                    React.createElement(MathText, { text: q.question_text }))),
                "          ",
                q.image_url && (React.createElement("img", { src: q.image_url, alt: "", style: { maxWidth: "100%", borderRadius: 12, marginBottom: 18, display: "block" }, onError: (e) => { e.target.style.display = "none"; } })),
                q.type === "essay" ? (React.createElement("div", null,
                    React.createElement("textarea", { value: selections[q.id] || "", onChange: (e) => selectOption(q.id, e.target.value), placeholder: "\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0628\u0646\u0648\u06CC\u0633 \u06CC\u0627 \u0639\u06A9\u0633 \u067E\u0627\u0633\u062E \u062F\u0633\u062A\u200C\u0646\u0648\u06CC\u0633 \u0631\u0627 \u067E\u0627\u06CC\u06CC\u0646 \u0622\u067E\u0644\u0648\u062F \u06A9\u0646...", rows: 6, style: { ...inputStyle, resize: "vertical", fontFamily: "inherit" } }),
                    React.createElement("div", { style: { marginTop: 10 } },
                        photoPreviews[q.id] ? (React.createElement("div", { style: { position: "relative", display: "inline-block" } },
                            React.createElement("img", { src: photoPreviews[q.id], alt: "", style: { maxWidth: "100%", maxHeight: 260, borderRadius: 10, display: "block", border: "1px solid #E2E8F0" } }),
                            photoUploading[q.id] && (React.createElement("div", { style: { position: "absolute", inset: 0, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "#334155" } }, "\u062F\u0631 \u062D\u0627\u0644 \u0622\u067E\u0644\u0648\u062F...")),
                            !photoUploading[q.id] && photoKeys[q.id] && (React.createElement("button", { type: "button", onClick: () => removeAnswerPhoto(q.id), style: { position: "absolute", top: 6, left: 6, background: "#DC2626", color: "#fff", border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, "\u062D\u0630\u0641 \u0639\u06A9\u0633")))) : (React.createElement("label", { style: {
                                display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10,
                                fontSize: 13, fontWeight: 700, cursor: "pointer", background: "#F8FAFC", color: "#334155", border: "1.5px dashed #CBD5E1",
                            } },
                            "\uD83D\uDCF7 \u0622\u067E\u0644\u0648\u062F \u0639\u06A9\u0633 \u067E\u0627\u0633\u062E \u062F\u0633\u062A\u200C\u0646\u0648\u06CC\u0633",
                            React.createElement("input", { type: "file", accept: "image/*", capture: "environment", onChange: (e) => uploadAnswerPhoto(q.id, e.target.files?.[0]), style: { display: "none" } }))),
                        photoError[q.id] && React.createElement("div", { style: { fontSize: 12, color: "#DC2626", marginTop: 6 } }, photoError[q.id])))) : q.type === "tf" ? (React.createElement("div", { style: { display: "flex", gap: 10 } }, [{ val: "true", label: "درست" }, { val: "false", label: "غلط" }].map(({ val, label }) => {
                    const isSelected = selections[q.id] === val;
                    return (React.createElement("div", { key: val, onClick: () => selectOption(q.id, val), style: {
                            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "18px 16px", borderRadius: 12,
                            border: "1.5px solid " + (isSelected ? "#2563EB" : "#E2E8F0"),
                            background: isSelected ? "#EFF6FF" : "#fff", cursor: "pointer",
                        } },
                        isSelected ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                        React.createElement("span", { style: { fontSize: 15, fontWeight: 700, color: "#334155" } }, label)));
                }))) : q.type === "fill_blank" ? (React.createElement("div", { style: { fontSize: 17, fontWeight: 700, color: "#1E293B", lineHeight: 2.4 } }, q.question_text.split("___").map((seg, i, arr) => (React.createElement(React.Fragment, { key: i },
                    React.createElement(MathText, { text: seg }),
                    i < arr.length - 1 && (React.createElement("input", { value: (Array.isArray(selections[q.id]) ? selections[q.id][i] : "") || "", onChange: (e) => setBlankAnswer(q.id, i, e.target.value), style: {
                            display: "inline-block", width: 140, margin: "0 6px", padding: "6px 10px", borderRadius: 8,
                            border: "1.5px solid #CBD5E1", fontSize: 15, fontWeight: 700, color: "#2563EB", textAlign: "center",
                        } }))))))) : q.type === "matching" ? (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, (q.left_items || []).map((l) => {
                    const rightOrder = optOrder[q.id] || (q.right_items || []).map((_, i) => i);
                    const selMap = (selections[q.id] && typeof selections[q.id] === "object" && !Array.isArray(selections[q.id])) ? selections[q.id] : {};
                    const selVal = selMap[l.id] || "";
                    return (React.createElement("div", { key: l.id, style: { display: "flex", alignItems: "center", gap: 10 } },
                        React.createElement("div", { style: { flex: 1, fontSize: 14, fontWeight: 600, color: "#334155" } },
                            React.createElement(MathText, { text: l.text })),
                        React.createElement("select", { value: selVal, onChange: (e) => setMatchAnswer(q.id, l.id, e.target.value || null), style: { flex: 1, padding: "10px 12px", borderRadius: 8, border: "1.5px solid #CBD5E1", fontSize: 14, background: "#fff" } },
                            React.createElement("option", { value: "" }, "\u2014 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u2014"),
                            rightOrder.map((ri) => {
                                const r = (q.right_items || [])[ri];
                                return r ? React.createElement("option", { key: r.id, value: r.id }, r.text) : null;
                            }))));
                }))) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                    q.type === "mc_multi" && (React.createElement("div", { style: { fontSize: 12, color: "#94A3B8", marginBottom: -4 } }, "\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0628\u06CC\u0634 \u0627\u0632 \u06CC\u06A9 \u06AF\u0632\u06CC\u0646\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC.")),
                    (optOrder[q.id] || ["A", "B", "C", "D"]).map((origLetter, i) => {
                        const optText = { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d }[origLetter];
                        const isMulti = q.type === "mc_multi";
                        const selVal = selections[q.id];
                        const isSelected = isMulti ? (Array.isArray(selVal) && selVal.includes(origLetter)) : selVal === origLetter;
                        const onPick = () => isMulti ? toggleMultiOption(q.id, origLetter) : selectOption(q.id, origLetter);
                        return (React.createElement("div", { key: origLetter, onClick: onPick, style: {
                                display: "flex", alignItems: "center", gap: 10, padding: "13px 16px", borderRadius: 12,
                                border: "1.5px solid " + (isSelected ? "#2563EB" : "#E2E8F0"),
                                background: isSelected ? "#EFF6FF" : "#fff", cursor: "pointer",
                            } },
                            isSelected ? React.createElement(CheckCircle2, { size: 18, color: "#2563EB" }) : React.createElement(Circle, { size: 18, color: "#CBD5E1" }),
                            React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#64748B" } },
                                letters[i],
                                "."),
                            React.createElement("span", { style: { fontSize: 14, color: "#334155" } },
                                React.createElement(MathText, { text: optText }))));
                    }))),
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 26 } },
                    React.createElement(Button, { variant: "ghost", onClick: () => goTo(Math.max(0, current - 1)), disabled: current === 0 || exam.no_going_back },
                        React.createElement(ChevronRight, { size: 16 }),
                        " \u0642\u0628\u0644\u06CC"),
                    React.createElement(Button, { onClick: () => goTo(Math.min(orderedQuestions.length - 1, current + 1)), disabled: current === orderedQuestions.length - 1 },
                        "\u0628\u0639\u062F\u06CC ",
                        React.createElement(ChevronLeft, { size: 16 })))),
            React.createElement("div", { style: { width: 260, background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 20, flexShrink: 0 } },
                React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: "#1E293B", marginBottom: 14 } }, "\u067E\u0627\u0644\u062A \u0633\u0648\u0627\u0644\u0627\u062A"),
                React.createElement("div", { style: { display: "flex", gap: 12, fontSize: 11, color: "#64748B", marginBottom: 14, flexWrap: "wrap" } },
                    React.createElement(LegendDot, { color: "#16A34A", label: "\u067E\u0627\u0633\u062E \u062F\u0627\u062F\u0647" }),
                    React.createElement(LegendDot, { color: "#F59E0B", label: "\u0645\u0634\u0627\u0647\u062F\u0647 \u0634\u062F\u0647" }),
                    React.createElement(LegendDot, { color: "#E2E8F0", label: "\u0628\u062F\u0648\u0646 \u067E\u0627\u0633\u062E" })),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 } }, orderedQuestions.map((qq, i) => {
                    let bg = "#F1F5F9", fg = "#475569";
                    const v = selections[qq.id];
                    const answered = Array.isArray(v) ? v.some((x) => x) : (v && typeof v === "object") ? Object.keys(v).length > 0 : !!v;
                    if (answered) {
                        bg = "#16A34A";
                        fg = "#fff";
                    }
                    else if (visited[i]) {
                        bg = "#F59E0B";
                        fg = "#fff";
                    }
                    if (i === current) {
                        bg = "#2563EB";
                        fg = "#fff";
                    }
                    const locked = exam.no_going_back && i < current;
                    return (React.createElement("div", { key: qq.id, onClick: () => goTo(i), style: {
                            width: 34, height: 34, borderRadius: 8, background: locked ? "#F1F5F9" : bg, color: locked ? "#CBD5E1" : fg,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 13, fontWeight: 700, cursor: locked ? "not-allowed" : "pointer",
                        } }, i + 1));
                })))),
        showConfirmSubmit && (React.createElement(Modal, { title: "\u062B\u0628\u062A \u0646\u0647\u0627\u06CC\u06CC \u0622\u0632\u0645\u0648\u0646", onClose: () => setShowConfirmSubmit(false) },
            React.createElement("div", { style: { fontSize: 14, color: "#334155", marginBottom: 20, lineHeight: 1.8 } },
                unansweredCount,
                " \u0633\u0648\u0627\u0644 \u0628\u06CC\u200C\u067E\u0627\u0633\u062E \u062F\u0627\u0631\u06CC. \u0628\u0639\u062F \u0627\u0632 \u062B\u0628\u062A \u0646\u0647\u0627\u06CC\u06CC \u062F\u06CC\u06AF\u0631 \u0627\u0645\u06A9\u0627\u0646 \u062A\u063A\u06CC\u06CC\u0631 \u067E\u0627\u0633\u062E\u200C\u0647\u0627 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F. \u0645\u0637\u0645\u0626\u0646\u06CC \u0645\u06CC\u200C\u062E\u0648\u0627\u06CC \u062B\u0628\u062A \u06A9\u0646\u06CC\u061F"),
            React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
                React.createElement(Button, { variant: "ghost", onClick: () => setShowConfirmSubmit(false) }, "\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0622\u0632\u0645\u0648\u0646"),
                React.createElement(Button, { variant: "success", onClick: () => { setShowConfirmSubmit(false); submitExam(); }, disabled: submitting }, submitting ? "در حال ثبت..." : "ثبت نهایی"))))));
}
// روند نمرات یک دانش‌آموز مشخص (با شناسه‌ی ثابت roster_id) در طول ترم —
// همه‌ی attemptهایی که roster_id یکسان دارن (یعنی همون دانش‌آموز واقعی،
// نه فقط اسم مشابه) رو پیدا می‌کنه، درصد هر کدوم رو حساب می‌کنه، و به
// ترتیب تاریخ روی یک نمودار خطی نشون می‌ده. فقط برای attemptهایی که با
// کد روستر وارد شدن کار می‌کنه (نه ورود آزاد با اسم) — چون فقط اون‌جا
// شناسه‌ی ثابت داریم؛ attemptهای قدیمی‌تر (قبل از این فیچر) هم چون
// roster_id ندارن، در این روند دیده نمی‌شن.
function StudentProgressModal({ rosterId, studentName, students, answers, questions, exams, onClose, aiAllowed }) {
    const attempts = students
        .filter((s) => s.roster_id === rosterId)
        .map((s) => {
        const list = answers.filter((a) => a.student_id === s.id);
        const totalMarks = list.reduce((sum, a) => sum + (a.mark || 1), 0);
        const gotMarks = list.reduce((sum, a) => sum + awardedMarkOf(a), 0);
        const pct = totalMarks ? Math.round((gotMarks / totalMarks) * 1000) / 10 : 0;
        const exam = exams.find((e) => e.id === list[0]?.exam_id);
        const date = list[0]?.answered_at ? new Date(list[0].answered_at) : null;
        return { examTitle: exam?.title || "—", pct, date };
    })
        .filter((a) => a.date)
        .sort((a, b) => a.date - b.date);
    const weakTopics = computeWeakTopics(rosterId, students, answers, questions);
    const [aiSuggestion, setAiSuggestion] = useState("");
    const [aiSuggestLoading, setAiSuggestLoading] = useState(false);
    const [aiSuggestError, setAiSuggestError] = useState("");
    const getAiSuggestion = async () => {
        setAiSuggestLoading(true);
        setAiSuggestError("");
        setAiSuggestion("");
        try {
            const r = await fetch("/api/ai/weak-topics-suggestion", {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify({
                    studentName,
                    weakTopics: weakTopics.slice(0, 5).map((t) => ({ tag: t.tag, pct: t.pct })),
                }),
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok)
                setAiSuggestError(data.error || "خطا در دریافت پیشنهاد");
            else
                setAiSuggestion(data.suggestion || "");
        }
        catch {
            setAiSuggestError("اتصال برقرار نشد.");
        }
        setAiSuggestLoading(false);
    };
    // خروجی «کارنامه» به‌صورت PDF — عمداً از چاپ مرورگر استفاده می‌کنیم (نه
    // یک کتابخونه‌ی جاوااسکریپتیِ PDF مثل jsPDF)، چون این کتابخونه‌ها متن
    // فارسی/راست‌به‌چپ رو درست نمی‌چسبونن (حروف بی‌ربط چاپ می‌شن) مگر با
    // فونت و شکل‌دهنده‌ی حروفِ جداگانه که پیچیدگی زیادی اضافه می‌کنه؛ چاپ
    // مرورگر همون موتور رندرِ HTML رو استفاده می‌کنه که فارسی رو کاملاً درست
    // نشون می‌ده، و کاربر با «ذخیره به‌عنوان PDF» توی پنجره‌ی چاپ، فایل PDF
    // واقعی می‌گیره — دقیقاً همون الگویی که printStudentReport (کارنامه‌ی
    // تک‌آزمون در ResultsScreen) و خروجی حضور/غیاب از قبل استفاده می‌کنن.
    const printFullReportCard = () => {
        const win = window.open("", "_blank");
        if (!win)
            return;
        const avgPct = attempts.length ? Math.round((attempts.reduce((s, a) => s + a.pct, 0) / attempts.length) * 10) / 10 : 0;
        const trendRows = attempts.map((a) => `<div class="row"><span>${a.examTitle}</span><b>٪${a.pct}</b></div>`).join("");
        const weakRows = weakTopics.slice(0, 8).map((t) => {
            const color = t.pct < 50 ? "#DC2626" : t.pct < 75 ? "#D97706" : "#16A34A";
            return `<div class="row"><span>${t.tag}</span><b style="color:${color}">${t.correct}/${t.total} (٪${t.pct})</b></div>`;
        }).join("");
        win.document.write(`<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>کارنامه ${studentName || ""}</title>
      <style>body{font-family:Tahoma,sans-serif;padding:40px;color:#111}
      .box{border:2px solid #111;border-radius:10px;padding:24px;max-width:520px}
      h1{font-size:18px;margin:0 0 4px}
      h2{font-size:14px;margin:20px 0 8px;border-top:1px solid #eee;padding-top:14px}
      .row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #eee;font-size:13px}
      .score{font-size:34px;font-weight:bold;text-align:center;margin:14px 0}
      .suggestion{margin-top:10px;background:#EFF6FF;border:1px solid #DBEAFE;border-radius:8px;padding:10px;font-size:12.5px;white-space:pre-wrap}
      .empty{color:#94A3B8;font-size:12.5px;padding:6px 0}</style>
      </head><body><div class="box">
      <h1>کارنامه‌ی جامع دانش‌آموز</h1>
      <div style="color:#666;font-size:13px;margin-bottom:12px">${studentName || ""}</div>
      <div class="score">${attempts.length ? `٪${avgPct}` : "—"}</div>
      <div style="text-align:center;color:#666;font-size:12px;margin-top:-8px">میانگین درصد در ${attempts.length} آزمون</div>
      ${attempts.length > 0 ? `<h2>روند نمرات</h2>${trendRows}` : ""}
      ${weakTopics.length > 0 ? `<h2>نقاط ضعف (بر اساس برچسب سوال‌ها)</h2>${weakRows}` : ""}
      ${aiSuggestion ? `<h2>پیشنهاد تمرین (هوش مصنوعی)</h2><div class="suggestion">${aiSuggestion.replace(/</g, "&lt;")}</div>` : ""}
      </div></body></html>`);
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 300);
    };
    return (React.createElement(Modal, { title: `روند نمرات ${studentName || ""}`, onClose: onClose },
        React.createElement("div", { style: { textAlign: "left", marginBottom: 14 } },
            React.createElement(Button, { variant: "ghost", style: { fontSize: 12.5 }, onClick: printFullReportCard },
                React.createElement(Download, { size: 14 }),
                "\u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0627\u0631\u0646\u0627\u0645\u0647 (PDF)")),
        attempts.length < 2 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 13, textAlign: "center", padding: 20 } },
            "\u0627\u06CC\u0646 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0641\u0642\u0637 \u062F\u0631 ",
            attempts.length === 1 ? "یک آزمون" : "هیچ آزمونی",
            " \u0628\u0627 \u06A9\u062F \u0631\u0648\u0633\u062A\u0631 \u0634\u0631\u06A9\u062A \u06A9\u0631\u062F\u0647 \u2014 \u0628\u0631\u0627\u06CC \u0646\u0645\u0648\u062F\u0627\u0631 \u0631\u0648\u0646\u062F \u062D\u062F\u0627\u0642\u0644 \u062F\u0648 \u0622\u0632\u0645\u0648\u0646 \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.")) : (React.createElement(React.Fragment, null,
            React.createElement(LineChartCanvas, { labels: attempts.map((a) => a.examTitle), values: attempts.map((a) => a.pct) }),
            React.createElement("div", { style: { marginTop: 14, fontSize: 12.5, color: "#64748B" } }, attempts.map((a, i) => (React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: i < attempts.length - 1 ? "1px solid #F5F7FA" : "none" } },
                React.createElement("span", null, a.examTitle),
                React.createElement("span", { style: { fontWeight: 700, color: "#1E293B" } },
                    "\u066A",
                    a.pct))))))),
        weakTopics.length > 0 && (React.createElement("div", { style: { marginTop: 20, paddingTop: 16, borderTop: "1px solid #EEF1F6" } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 10 } }, "\u0646\u0642\u0627\u0637 \u0636\u0639\u0641 (\u0628\u0631 \u0627\u0633\u0627\u0633 \u0628\u0631\u0686\u0633\u0628 \u0633\u0648\u0627\u0644\u200C\u0647\u0627)"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, weakTopics.slice(0, 6).map((t) => (React.createElement("div", { key: t.tag },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 3 } },
                    React.createElement("span", { style: { fontWeight: 700, color: "#1E293B" } }, t.tag),
                    React.createElement("span", { style: { color: t.pct < 50 ? "#DC2626" : t.pct < 75 ? "#D97706" : "#16A34A", fontWeight: 700 } },
                        t.correct,
                        "/",
                        t.total,
                        " (\u066A",
                        t.pct,
                        ")")),
                React.createElement("div", { style: { height: 6, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" } },
                    React.createElement("div", { style: { width: `${t.pct}%`, height: "100%", background: t.pct < 50 ? "#DC2626" : t.pct < 75 ? "#D97706" : "#16A34A" } })))))),
            aiAllowed && (React.createElement("div", { style: { marginTop: 14 } },
                React.createElement(Button, { variant: "ghost", style: { fontSize: 12.5 }, onClick: getAiSuggestion, disabled: aiSuggestLoading },
                    React.createElement(Sparkles, { size: 14 }),
                    aiSuggestLoading ? "در حال دریافت پیشنهاد..." : "پیشنهاد تمرین با هوش مصنوعی"),
                aiSuggestError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12, marginTop: 8 } }, aiSuggestError),
                aiSuggestion && (React.createElement("div", { style: { marginTop: 10, background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 10, padding: 12, fontSize: 12.5, color: "#1E3A8A", whiteSpace: "pre-wrap" } }, aiSuggestion))))))));
}
function ResultsScreen({ teacher, exams, questions, students, answers, roster = [], classes = [], initialExamId, onBack, refresh, examsOverride, examLabelFn, headerTitle, hideTopBar, aiAllowed }) {
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("");
    const [notes, setNotes] = useState({});
    const [expandedId, setExpandedId] = useState(null);
    const [progressRosterId, setProgressRosterId] = useState(null); // { id, name } | null
    const [showAttendance, setShowAttendance] = useState(false);
    const myExams = examsOverride || exams.filter((e) => e.teacher_id === teacher.username);
    const [examId, setExamId] = useState(initialExamId || myExams[0]?.id || null);
    const exam = myExams.find((e) => e.id === examId);
    useEffect(() => {
        if (myExams.length === 0) {
            if (examId !== null)
                setExamId(null);
            return;
        }
        if (!myExams.some((e) => e.id === examId))
            setExamId(myExams[0].id);
    }, [myExams.map((e) => e.id).join(",")]);
    useEffect(() => {
        if (!examId)
            return;
        (async () => {
            const keys = await listPrefix(`note:${examId}:`);
            const entries = await Promise.all(keys.map(async (k) => {
                const v = await getJSON(k);
                return [k.replace(`note:${examId}:`, ""), v];
            }));
            setNotes(Object.fromEntries(entries));
        })();
    }, [examId]);
    const saveNote = async (studentId, text) => {
        setNotes((n) => ({ ...n, [studentId]: text }));
        if (text.trim())
            await setJSON(`note:${examId}:${studentId}`, text);
        else
            await deleteKey(`note:${examId}:${studentId}`);
    };
    if (!exam) {
        return (React.createElement("div", { style: hideTopBar ? {} : { flex: 1, padding: "30px 34px" } },
            !hideTopBar && React.createElement(TopBar, { title: headerTitle || "نتایج", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
            React.createElement(EmptyState, { text: myExams.length === 0 && examsOverride ? "هنوز آزمونی در مدرسه برگزار نشده است." : "ابتدا یک آزمون بساز تا نتایج آن را اینجا ببینی." })));
    }
    const examAnswers = answers.filter((a) => a.exam_id === examId);
    const byStudent = {};
    examAnswers.forEach((a) => {
        byStudent[a.student_id] = byStudent[a.student_id] || [];
        byStudent[a.student_id].push(a);
    });
    const examQuestionsList = questions.filter((q) => q.exam_id === examId);
    const examSections = [...new Set(examQuestionsList.map((q) => q.section).filter(Boolean))];
    const sectionOf = Object.fromEntries(examQuestionsList.map((q) => [q.id, q.section || null]));
    const rows = Object.entries(byStudent).map(([studentId, list]) => {
        const student = students.find((s) => s.id === studentId) || { fullname: "—", class_code: "" };
        const totalMarks = list.reduce((s, a) => s + (a.mark || 1), 0);
        const gotMarks = list.reduce((s, a) => s + awardedMarkOf(a), 0);
        const pendingCount = list.filter((a) => a.is_correct === null && a.awarded_mark == null).length;
        const pct = totalMarks ? Math.round((gotMarks / totalMarks) * 1000) / 10 : 0;
        const correctCount = list.filter((a) => a.is_correct).length;
        const timeTaken = list[0]?.time_taken || 0;
        const date = list[0]?.answered_at ? new Date(list[0].answered_at).toLocaleDateString("fa-IR") : "—";
        const sections = {};
        examSections.forEach((sec) => {
            const secList = list.filter((a) => sectionOf[a.question_id] === sec);
            const secTotal = secList.reduce((s, a) => s + (a.mark || 1), 0);
            const secGot = secList.reduce((s, a) => s + awardedMarkOf(a), 0);
            sections[sec] = secTotal ? Math.round((secGot / secTotal) * 1000) / 10 : null;
        });
        return {
            studentId, name: student.fullname, cls: student.class_code, pct, correctCount,
            total: list.length, timeTaken, date, pendingCount, tabSwitches: student.tab_switches || 0, sections,
            rosterId: student.roster_id || null,
        };
    }).sort((a, b) => b.pct - a.pct);
    // حضور و غیاب — فقط برای آزمون‌هایی که به یک یا چند کلاس محدود شده‌ن
    // (چون فقط اونجا یک «فهرست انتظار» مشخص از روی roster وجود داره؛ آزمونِ
    // بدون محدودیت کلاس، هرکسی با لینک می‌تونه بده، پس «غایب» بی‌معنی می‌شه).
    // تشخیص «حاضر بوده» با تطبیق نام دانش‌آموزِ roster با نامی که موقع پاسخ
    // دادن ثبت شده — دقیقاً همون منطقی که سرور برای «آیا قبلاً شرکت کرده»
    // استفاده می‌کنه (handleExamAttempted در worker.js).
    const normalizeName = (s) => (s || "").trim().replace(/\s+/g, " ");
    const attendanceClassIds = exam.restrict_class_ids || (exam.restrict_class_id ? [exam.restrict_class_id] : []);
    const presentNames = new Set(Object.keys(byStudent).map((sid) => normalizeName(students.find((s) => s.id === sid)?.fullname)));
    const expectedRoster = attendanceClassIds.length > 0
        ? roster.filter((r) => attendanceClassIds.includes(r.class_id))
        : [];
    const attendanceRows = expectedRoster
        .map((r) => ({
        id: r.id,
        name: r.fullname,
        className: classes.find((c) => c.id === r.class_id)?.name || "",
        present: presentNames.has(normalizeName(r.fullname)),
    }))
        .sort((a, b) => (a.present === b.present ? a.name.localeCompare(b.name, "fa") : a.present ? 1 : -1));
    const presentCount = attendanceRows.filter((r) => r.present).length;
    const absentCount = attendanceRows.length - presentCount;
    const displayRows = rows
        .filter((r) => !search.trim() || (r.name + " " + (r.cls || "")).toLowerCase().includes(search.trim().toLowerCase()))
        .filter((r) => !classFilter || r.cls === classFilter);
    const classList = [...new Set(rows.map((r) => r.cls).filter(Boolean))];
    const avg = rows.length ? (rows.reduce((s, r) => s + r.pct, 0) / rows.length).toFixed(1) : "0";
    const highest = rows.length ? Math.max(...rows.map((r) => r.pct)) : 0;
    const lowest = rows.length ? Math.min(...rows.map((r) => r.pct)) : 0;
    const passRate = rows.length ? Math.round((rows.filter((r) => r.pct >= 50).length / rows.length) * 100) : 0;
    const fmtTime = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };
    const medals = ["🥇", "🥈", "🥉"];
    // Score distribution buckets
    const buckets = [
        { label: "۰-۴۹", min: 0, max: 49 },
        { label: "۵۰-۵۹", min: 50, max: 59 },
        { label: "۶۰-۶۹", min: 60, max: 69 },
        { label: "۷۰-۷۹", min: 70, max: 79 },
        { label: "۸۰-۸۹", min: 80, max: 89 },
        { label: "۹۰-۱۰۰", min: 90, max: 100 },
    ].map((b) => ({ ...b, count: rows.filter((r) => r.pct >= b.min && r.pct <= b.max).length }));
    const maxBucketCount = Math.max(1, ...buckets.map((b) => b.count));
    // Per-question analysis — سخت‌ترین سؤالات (کمترین درصد پاسخ صحیح) بالاتر
    const questionStats = examQuestionsList.map((q) => {
        const qAnswers = examAnswers.filter((a) => a.question_id === q.id);
        const correctN = qAnswers.filter((a) => a.is_correct).length;
        const pct = qAnswers.length ? Math.round((correctN / qAnswers.length) * 100) : null;
        return { id: q.id, text: q.question_text, answered: qAnswers.length, correctN, pct };
    }).sort((a, b) => {
        if (a.pct === null)
            return 1; // بدون پاسخ ثبت‌شده (مثلاً تشریحی درحال تصحیح) بره آخر
        if (b.pct === null)
            return -1;
        return a.pct - b.pct; // کمترین درصد پاسخ صحیح (سخت‌ترین) اول
    });
    const hardestPct = questionStats.find((qs) => qs.pct !== null)?.pct ?? null;
    // Section averages (across all students)
    const sectionStats = examSections.map((sec) => {
        const qIds = new Set(examQuestionsList.filter((q) => q.section === sec).map((q) => q.id));
        const secAnswers = examAnswers.filter((a) => qIds.has(a.question_id));
        const totalMarks = secAnswers.reduce((s, a) => s + (a.mark || 1), 0);
        const gotMarks = secAnswers.reduce((s, a) => s + awardedMarkOf(a), 0);
        const pct = totalMarks ? Math.round((gotMarks / totalMarks) * 1000) / 10 : 0;
        return { name: sec, pct };
    });
    const printStudentReport = (r) => {
        const win = window.open("", "_blank");
        if (!win)
            return;
        win.document.write(`<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>کارنامه ${r.name}</title>
      <style>body{font-family:Tahoma,sans-serif;padding:40px;color:#111}
      .box{border:2px solid #111;border-radius:10px;padding:24px;max-width:480px}
      h1{font-size:18px;margin:0 0 4px}
      .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}
      .score{font-size:36px;font-weight:bold;text-align:center;margin:16px 0}</style>
      </head><body><div class="box">
      <h1>کارنامه‌ی آزمون</h1>
      <div style="color:#666;font-size:13px;margin-bottom:16px">${exam.title}</div>
      <div class="row"><span>نام دانش‌آموز</span><b>${r.name}</b></div>
      <div class="row"><span>کلاس</span><b>${r.cls || "—"}</b></div>
      <div class="row"><span>پاسخ صحیح</span><b>${r.correctCount} از ${r.total}</b></div>
      <div class="row"><span>زمان صرف‌شده</span><b>${fmtTime(r.timeTaken)}</b></div>
      <div class="row"><span>تاریخ</span><b>${r.date}</b></div>
      ${examSections.map((sec) => `<div class="row"><span>${sec}</span><b>${r.sections[sec] === null ? "—" : r.sections[sec] + "%"}</b></div>`).join("")}
      <div class="score">${r.pct}%</div>
      </div></body></html>`);
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 300);
    };
    const exportCSV = () => {
        const header = ["رتبه", "نام", "کلاس", "نمره", "پاسخ صحیح", "زمان", "تاریخ", ...examSections];
        const lines = [header.join(",")];
        rows.forEach((r, i) => {
            lines.push([i + 1, r.name, r.cls || "", r.pct, `${r.correctCount}/${r.total}`, fmtTime(r.timeTaken), r.date, ...examSections.map((sec) => r.sections[sec] === null ? "" : r.sections[sec])]
                .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
        });
        downloadTextFile(`${exam.title}-نتایج.csv`, "\uFEFF" + lines.join("\n"), "text/csv;charset=utf-8;");
    };
    // خروجی Excel همین امتحان — یک ردیف به ازای هر دانش‌آموز، یک ستون به ازای
    // هر سوال (نمره‌ی همون سوال) به‌علاوه‌ی جمع کل و درصد.
    const exportExcelExam = () => {
        const sheetRows = rows.map((r, i) => {
            const list = byStudent[r.studentId] || [];
            const row = { "رتبه": i + 1, "نام دانش‌آموز": r.name, "کلاس": r.cls || "" };
            examQuestionsList.forEach((q, qi) => {
                const a = list.find((x) => x.question_id === q.id);
                row[`سوال ${qi + 1} (از ${q.mark})`] = a ? awardedMarkOf(a) : "";
            });
            row["جمع نمره"] = list.reduce((s, a) => s + awardedMarkOf(a), 0);
            row["از کل"] = list.reduce((s, a) => s + (a.mark || 1), 0);
            row["درصد"] = r.pct;
            return row;
        });
        downloadExcelWorkbook(`${exam.title}-نمرات.xlsx`, [{ name: "نمرات", rows: sheetRows }]);
    };
    // خروجی Excel کل کلاس روی همه‌ی امتحان‌های اون کلاس — یه شیت به ازای هر
    // امتحان (با ریز نمره‌ی هر سوال) به‌علاوه‌ی یه شیت خلاصه که درصد هر
    // دانش‌آموز رو توی همه‌ی امتحان‌ها کنار هم می‌ذاره.
    const exportExcelClass = () => {
        if (!classFilter)
            return;
        const classExams = myExams.filter((e) => answers.some((a) => a.exam_id === e.id && students.find((s) => s.id === a.student_id)?.class_code === classFilter));
        const sheets = [];
        const summaryByStudent = {};
        classExams.forEach((e) => {
            const qList = questions.filter((q) => q.exam_id === e.id);
            const eAnswers = answers.filter((a) => a.exam_id === e.id);
            const byS = {};
            eAnswers.forEach((a) => { (byS[a.student_id] = byS[a.student_id] || []).push(a); });
            const sheetRows = Object.entries(byS)
                .map(([sid, list]) => ({ sid, student: students.find((s) => s.id === sid) || { fullname: "—" }, list }))
                .filter(({ student }) => student.class_code === classFilter)
                .map(({ student, list }) => {
                const row = { "نام دانش‌آموز": student.fullname };
                qList.forEach((q, qi) => {
                    const a = list.find((x) => x.question_id === q.id);
                    row[`سوال ${qi + 1} (از ${q.mark})`] = a ? awardedMarkOf(a) : "";
                });
                const got = list.reduce((s, a) => s + awardedMarkOf(a), 0);
                const total = list.reduce((s, a) => s + (a.mark || 1), 0);
                const pct = total ? Math.round((got / total) * 1000) / 10 : 0;
                row["جمع نمره"] = got;
                row["از کل"] = total;
                row["درصد"] = pct;
                summaryByStudent[student.fullname] = summaryByStudent[student.fullname] || {};
                summaryByStudent[student.fullname][e.title] = pct;
                return row;
            });
            if (sheetRows.length > 0)
                sheets.push({ name: e.title || "آزمون", rows: sheetRows });
        });
        const summaryRows = Object.entries(summaryByStudent).map(([name, byExam]) => {
            const row = { "نام دانش‌آموز": name };
            classExams.forEach((e) => { row[e.title] = byExam[e.title] ?? ""; });
            return row;
        });
        downloadExcelWorkbook(`کلاس-${classFilter}-همه-آزمون‌ها.xlsx`, [{ name: "خلاصه", rows: summaryRows }, ...sheets]);
    };
    return (React.createElement("div", { style: hideTopBar ? {} : { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        !hideTopBar && React.createElement(TopBar, { title: headerTitle || "نتایج آزمون", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { marginBottom: 18, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" } },
            React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" } },
                React.createElement("span", { style: { fontSize: 13, color: "#64748B" } }, "\u0627\u0646\u062A\u062E\u0627\u0628 \u0622\u0632\u0645\u0648\u0646:"),
                React.createElement("select", { value: examId, onChange: (e) => setExamId(e.target.value), style: { ...inputStyle, width: "auto", padding: "8px 12px" } }, myExams.map((e) => React.createElement("option", { key: e.id, value: e.id }, examLabelFn ? examLabelFn(e) : e.title))),
                rows.length > 0 && (React.createElement(TextInput, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "\u062C\u0633\u062A\u062C\u0648\u06CC \u0646\u0627\u0645 \u06CC\u0627 \u06A9\u0644\u0627\u0633...", style: { width: 200, padding: "8px 12px" } })),
                classList.length > 1 && (React.createElement("select", { value: classFilter, onChange: (e) => setClassFilter(e.target.value), style: { ...inputStyle, width: "auto", padding: "8px 12px" } },
                    React.createElement("option", { value: "" }, "\u0647\u0645\u0647 \u06A9\u0644\u0627\u0633\u200C\u0647\u0627"),
                    classList.map((c) => React.createElement("option", { key: c, value: c }, c)))),
                attendanceClassIds.length > 0 && (React.createElement(Button, { variant: "ghost", onClick: () => setShowAttendance(true) },
                    React.createElement(Users, { size: 15 }),
                    "\u062D\u0636\u0648\u0631 \u0648 \u063A\u06CC\u0627\u0628 (",
                    presentCount,
                    "/",
                    attendanceRows.length,
                    ")"))),
            rows.length > 0 && (React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
                React.createElement(Button, { variant: "ghost", onClick: exportCSV },
                    React.createElement(Download, { size: 15 }),
                    "\u062E\u0631\u0648\u062C\u06CC CSV"),
                React.createElement(Button, { variant: "ghost", onClick: exportExcelExam },
                    React.createElement(Download, { size: 15 }),
                    "\u062E\u0631\u0648\u062C\u06CC Excel \u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646"),
                classFilter && (React.createElement(Button, { variant: "ghost", onClick: exportExcelClass },
                    React.createElement(Download, { size: 15 }),
                    "\u062E\u0631\u0648\u062C\u06CC Excel \u06A9\u0644 \u06A9\u0644\u0627\u0633 ",
                    classFilter))))),
        React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 } },
            React.createElement(StatCard, { icon: TrendingUp, label: "\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0646\u0645\u0631\u0647", value: `${avg}%`, color: "#2563EB" }),
            React.createElement(StatCard, { icon: Award, label: "\u0628\u0627\u0644\u0627\u062A\u0631\u06CC\u0646 \u0646\u0645\u0631\u0647", value: `${highest}%`, color: "#16A34A" }),
            React.createElement(StatCard, { icon: BarChart3, label: "\u067E\u0627\u06CC\u06CC\u0646\u200C\u062A\u0631\u06CC\u0646 \u0646\u0645\u0631\u0647", value: `${lowest}%`, color: "#DC2626" }),
            React.createElement(StatCard, { icon: CheckCircle2, label: "\u062F\u0631\u0635\u062F \u0642\u0628\u0648\u0644\u06CC", value: `${passRate}%`, color: "#8B5CF6" }),
            React.createElement(StatCard, { icon: Users, label: "\u062A\u0639\u062F\u0627\u062F \u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u0647", value: rows.length, color: "#0EA5E9" })),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } }, rows.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u062F\u0631 \u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646 \u0634\u0631\u06A9\u062A \u0646\u06A9\u0631\u062F\u0647 \u0627\u0633\u062A." })) : displayRows.length === 0 ? (React.createElement(EmptyState, { text: "\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u062C\u0633\u062A\u062C\u0648 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F." })) : (React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } },
            React.createElement("thead", null,
                React.createElement("tr", { style: { textAlign: "right", color: "#64748B", fontSize: 12, fontWeight: 700 } },
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u0631\u062A\u0628\u0647"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u0646\u0627\u0645 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u06A9\u0644\u0627\u0633"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u0646\u0645\u0631\u0647"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u067E\u0627\u0633\u062E \u0635\u062D\u06CC\u062D"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u0632\u0645\u0627\u0646"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u062A\u0627\u0631\u06CC\u062E"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u0648\u0636\u0639\u06CC\u062A"),
                    examSections.length > 0 && React.createElement("th", { style: { padding: "8px 6px" } }, "\u0628\u062E\u0634\u200C\u0647\u0627"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u06CC\u0627\u062F\u062F\u0627\u0634\u062A"),
                    React.createElement("th", { style: { padding: "8px 6px" } }))),
            React.createElement("tbody", null, displayRows.map((r, i) => (React.createElement(React.Fragment, { key: r.studentId },
                React.createElement("tr", { style: { borderTop: "1px solid #F1F5F9", fontSize: 14 } },
                    React.createElement("td", { style: { padding: "12px 6px" } }, medals[i] || i + 1),
                    React.createElement("td", { style: { padding: "12px 6px", fontWeight: 700, color: "#1E293B" } }, r.name),
                    React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, r.cls || "—"),
                    React.createElement("td", { style: { padding: "12px 6px", fontWeight: 800, color: r.pct >= 50 ? "#16A34A" : "#DC2626" } },
                        r.pct,
                        "%"),
                    React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } },
                        r.correctCount,
                        " / ",
                        r.total),
                    React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, fmtTime(r.timeTaken)),
                    React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, r.date),
                    React.createElement("td", { style: { padding: "12px 6px" } },
                        React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
                            r.pendingCount > 0 && React.createElement(Badge, { tone: "orange" },
                                r.pendingCount,
                                " \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0635\u062D\u06CC\u062D"),
                            r.tabSwitches > 0 && (React.createElement(Badge, { tone: "red" },
                                React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 3 } },
                                    React.createElement(AlertTriangle, { size: 11 }),
                                    " ",
                                    r.tabSwitches,
                                    " \u062E\u0631\u0648\u062C"))),
                            r.pendingCount === 0 && r.tabSwitches === 0 && React.createElement("span", { style: { fontSize: 12, color: "#94A3B8" } }, "\u2014"))),
                    examSections.length > 0 && (React.createElement("td", { style: { padding: "12px 6px" } },
                        React.createElement("span", { onClick: () => setExpandedId(expandedId === r.studentId ? null : r.studentId), style: { fontSize: 12, color: "#2563EB", cursor: "pointer", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 3 } }, expandedId === r.studentId ? "بستن" : "نمایش"))),
                    React.createElement("td", { style: { padding: "12px 6px" } },
                        React.createElement(TextInput, { defaultValue: notes[r.studentId] || "", onBlur: (e) => saveNote(r.studentId, e.target.value), placeholder: "\u06CC\u0627\u062F\u062F\u0627\u0634\u062A...", style: { width: 140, padding: "6px 8px", fontSize: 12 } })),
                    React.createElement("td", { style: { padding: "12px 6px" } },
                        React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } },
                            React.createElement(FileText, { size: 16, style: { cursor: "pointer", color: "#64748B" }, onClick: () => printStudentReport(r) }),
                            r.rosterId && (React.createElement(TrendingUp, { size: 16, style: { cursor: "pointer", color: "#2563EB" }, onClick: () => setProgressRosterId({ id: r.rosterId, name: r.name }) }))))),
                examSections.length > 0 && expandedId === r.studentId && (React.createElement("tr", { style: { background: "#F8FAFC" } },
                    React.createElement("td", { colSpan: 11, style: { padding: "10px 14px" } },
                        React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" } }, examSections.map((sec) => (React.createElement("div", { key: sec, style: { fontSize: 12.5, color: "#334155" } },
                            React.createElement("span", { style: { color: "#64748B" } },
                                sec,
                                ": "),
                            React.createElement("span", { style: { fontWeight: 800, color: r.sections[sec] === null ? "#94A3B8" : r.sections[sec] >= 50 ? "#16A34A" : "#DC2626" } }, r.sections[sec] === null ? "—" : `${r.sections[sec]}%`))))))))))))))),
        React.createElement(EssayGrading, { examId: examId, questions: questions, answers: answers, students: students, refresh: refresh, aiAllowed: aiAllowed }),
        rows.length > 0 && (React.createElement("div", { style: { display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 } },
            React.createElement("div", { style: { flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 16 } }, "\u062A\u0648\u0632\u06CC\u0639 \u0646\u0645\u0631\u0627\u062A"),
                React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 10, height: 140 } }, buckets.map((b) => (React.createElement("div", { key: b.label, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } },
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#1E293B" } }, b.count),
                    React.createElement("div", { style: {
                            width: "100%", borderRadius: "6px 6px 0 0", background: "#2563EB",
                            height: `${Math.max(4, (b.count / maxBucketCount) * 100)}px`,
                        } }),
                    React.createElement("div", { style: { fontSize: 11, color: "#64748B" } }, b.label)))))),
            React.createElement("div", { style: { flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 4 } }, "\u062A\u062D\u0644\u06CC\u0644 \u0633\u0648\u0627\u0644\u0627\u062A"),
                React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginBottom: 12 } }, "\u0633\u062E\u062A\u200C\u062A\u0631\u06CC\u0646 \u0633\u0648\u0627\u0644\u0627\u062A (\u06A9\u0645\u062A\u0631\u06CC\u0646 \u062F\u0631\u0635\u062F \u067E\u0627\u0633\u062E \u0635\u062D\u06CC\u062D) \u0628\u0627\u0644\u0627\u062A\u0631 \u0646\u0634\u0627\u0646 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F"),
                questionStats.length === 0 ? (React.createElement("div", { style: { fontSize: 13, color: "#94A3B8" } }, "\u0633\u0648\u0627\u0644\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0622\u0632\u0645\u0648\u0646 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.")) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, maxHeight: 220, overflowY: "auto" } }, questionStats.map((qs, i) => (React.createElement("div", { key: qs.id },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12, color: "#334155", marginBottom: 4 } },
                        React.createElement("span", null,
                            qs.pct !== null && qs.pct === hardestPct && qs.pct < 50 ? "🔥 " : "",
                            qs.text.length > 40 ? qs.text.slice(0, 40) + "…" : qs.text),
                        React.createElement("span", { style: { fontWeight: 700, color: qs.pct === null ? "#94A3B8" : qs.pct >= 50 ? "#16A34A" : "#DC2626" } }, qs.pct === null ? "—" : `${qs.pct}%`)),
                    React.createElement("div", { style: { height: 6, background: "#EEF1F6", borderRadius: 4, overflow: "hidden" } },
                        React.createElement("div", { style: { width: `${qs.pct || 0}%`, height: "100%", background: qs.pct !== null && qs.pct >= 50 ? "#16A34A" : "#DC2626" } })))))))),
            examSections.length > 0 && (React.createElement("div", { style: { flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 16 } }, "\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0646\u0645\u0631\u0647 \u0628\u0647 \u062A\u0641\u06A9\u06CC\u06A9 \u0628\u062E\u0634"),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, sectionStats.map((ss) => (React.createElement("div", { key: ss.name },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "#334155", marginBottom: 4 } },
                        React.createElement("span", null, ss.name),
                        React.createElement("span", { style: { fontWeight: 700, color: ss.pct >= 50 ? "#16A34A" : "#DC2626" } },
                            ss.pct,
                            "%")),
                    React.createElement("div", { style: { height: 8, background: "#EEF1F6", borderRadius: 4, overflow: "hidden" } },
                        React.createElement("div", { style: { width: `${ss.pct}%`, height: "100%", background: ss.pct >= 50 ? "#16A34A" : "#DC2626" } })))))))))),
        showAttendance && (React.createElement(Modal, { title: `حضور و غیاب — ${exam.title}`, onClose: () => setShowAttendance(false) },
            React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 16 } },
                React.createElement("div", { style: { flex: 1, background: "#F0FDF4", borderRadius: 10, padding: "10px 14px", textAlign: "center" } },
                    React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: "#16A34A" } }, presentCount),
                    React.createElement("div", { style: { fontSize: 11.5, color: "#15803D" } }, "\u062D\u0627\u0636\u0631")),
                React.createElement("div", { style: { flex: 1, background: "#FEF2F2", borderRadius: 10, padding: "10px 14px", textAlign: "center" } },
                    React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: "#DC2626" } }, absentCount),
                    React.createElement("div", { style: { fontSize: 11.5, color: "#B91C1C" } }, "\u063A\u0627\u06CC\u0628"))),
            attendanceRows.length === 0 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 13, textAlign: "center", padding: 20 } }, "\u0627\u06CC\u0646 \u06A9\u0644\u0627\u0633 \u0647\u0646\u0648\u0632 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u0646\u062F\u0627\u0631\u062F.")) : (React.createElement("div", { style: { maxHeight: 380, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 } }, attendanceRows.map((r) => (React.createElement("div", { key: r.id, style: {
                    display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px",
                    borderRadius: 8, background: r.present ? "#F8FAFC" : "#FEF2F2",
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#1E293B" } }, r.name),
                    attendanceClassIds.length > 1 && React.createElement("div", { style: { fontSize: 11, color: "#94A3B8" } }, r.className)),
                React.createElement("span", { style: {
                        fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                        background: r.present ? "#DCFCE7" : "#FEE2E2", color: r.present ? "#15803D" : "#B91C1C",
                    } }, r.present ? "حاضر" : "غایب")))))),
            attendanceRows.length > 0 && (React.createElement("div", { style: { marginTop: 14, textAlign: "left" } },
                React.createElement(Button, { variant: "ghost", onClick: () => {
                        const header = ["نام", "کلاس", "وضعیت"];
                        const lines = [header.join(",")];
                        attendanceRows.forEach((r) => {
                            lines.push([r.name, r.className, r.present ? "حاضر" : "غایب"].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
                        });
                        downloadTextFile(`${exam.title}-حضور-و-غیاب.csv`, "\uFEFF" + lines.join("\n"), "text/csv;charset=utf-8;");
                    } },
                    React.createElement(Download, { size: 15 }),
                    "\u062E\u0631\u0648\u062C\u06CC CSV"))))),
        progressRosterId && (React.createElement(StudentProgressModal, { rosterId: progressRosterId.id, studentName: progressRosterId.name, students: students, answers: answers, questions: questions, exams: exams, onClose: () => setProgressRosterId(null), aiAllowed: aiAllowed }))));
}
/* ---------------------------------------------------------
   ESSAY GRADING — manual correction for open-answer questions
--------------------------------------------------------- */
// عکس پاسخ دست‌نویس رو با هدر Authorization می‌گیره (چون <img src> نمی‌تونه
// هدر بفرسته) و به‌صورت یک object URL محلی نشون می‌ده.
function AnswerPhoto({ photoKey }) {
    const [src, setSrc] = useState(null);
    const [error, setError] = useState(false);
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        let objectUrl = null;
        let cancelled = false;
        (async () => {
            try {
                const r = await fetch(`/api/answer-photo?key=${encodeURIComponent(photoKey)}`, { headers: authHeaders() });
                if (!r.ok)
                    throw new Error();
                const blob = await r.blob();
                objectUrl = URL.createObjectURL(blob);
                if (!cancelled)
                    setSrc(objectUrl);
            }
            catch {
                if (!cancelled)
                    setError(true);
            }
        })();
        return () => { cancelled = true; if (objectUrl)
            URL.revokeObjectURL(objectUrl); };
    }, [photoKey]);
    if (error)
        return React.createElement("div", { style: { fontSize: 12, color: "#DC2626" } }, "\u0639\u06A9\u0633 \u067E\u0627\u0633\u062E \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0646\u0634\u062F.");
    if (!src)
        return React.createElement("div", { style: { fontSize: 12, color: "#94A3B8" } }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0639\u06A9\u0633...");
    return (React.createElement(React.Fragment, null,
        React.createElement("img", { src: src, alt: "\u067E\u0627\u0633\u062E \u062F\u0633\u062A\u200C\u0646\u0648\u06CC\u0633", onClick: () => setExpanded(true), style: { maxWidth: "100%", maxHeight: 400, borderRadius: 10, display: "block", cursor: "zoom-in" } }),
        expanded && (React.createElement("div", { onClick: () => setExpanded(false), style: {
                position: "fixed", inset: 0, background: "rgba(15,23,42,0.9)", zIndex: 1000,
                display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "zoom-out",
            } },
            React.createElement("img", { src: src, alt: "\u067E\u0627\u0633\u062E \u062F\u0633\u062A\u200C\u0646\u0648\u06CC\u0633 (\u0628\u0632\u0631\u06AF)", style: { maxWidth: "100%", maxHeight: "100%", borderRadius: 10 } })))));
}
function EssayGrading({ examId, questions, answers, students, refresh, aiAllowed }) {
    const essayQuestions = questions.filter((q) => q.exam_id === examId && q.type === "essay");
    const [drafts, setDrafts] = useState({}); // answerId -> input value
    const [savingId, setSavingId] = useState(null);
    const [aiGradingId, setAiGradingId] = useState(null);
    const [aiFeedback, setAiFeedback] = useState({}); // answerId -> { feedback, hasReference }
    const [aiGradeError, setAiGradeError] = useState({}); // answerId -> error text
    if (essayQuestions.length === 0)
        return null;
    const items = [];
    essayQuestions.forEach((q) => {
        answers.filter((a) => a.question_id === q.id && a.selected_option).forEach((a) => {
            const student = students.find((s) => s.id === a.student_id);
            items.push({ answer: a, question: q, studentName: student?.fullname || "—" });
        });
    });
    if (items.length === 0)
        return null;
    const pending = items.filter((it) => it.answer.awarded_mark == null);
    const graded = items.filter((it) => it.answer.awarded_mark != null);
    const grade = async (answerId, questionMark) => {
        const raw = drafts[answerId];
        let val = Number(raw);
        if (Number.isNaN(val))
            return;
        if (val < 0)
            val = 0;
        if (val > questionMark)
            val = questionMark;
        setSavingId(answerId);
        // Answers are stored batched per exam attempt (one "answers:<studentId>" key
        // holding all of that attempt's answer records) — find which student this
        // answer belongs to, then update it inside that batch and write it back.
        const owningAnswer = answers.find((a) => a.id === answerId);
        if (owningAnswer) {
            const batch = (await getJSON(`answers:${owningAnswer.student_id}`)) || [];
            const updatedBatch = batch.map((a) => a.id === answerId ? { ...a, awarded_mark: val, is_correct: val >= questionMark } : a);
            await setJSON(`answers:${owningAnswer.student_id}`, updatedBatch);
        }
        setSavingId(null);
        await refresh();
    };
    // Suggests a score by checking how many of the question's keywords appear
    // in the student's answer text. Only fills the draft field — the teacher
    // still has to press "ثبت نمره" to actually save it.
    const suggestFromKeywords = (answerId, question, answerText) => {
        const kws = question.keywords || [];
        if (kws.length === 0)
            return;
        const text = (answerText || "").toLowerCase();
        const matched = kws.filter((k) => text.includes(k.toLowerCase())).length;
        const suggested = Math.round((matched / kws.length) * question.mark * 4) / 4;
        setDrafts((d) => ({ ...d, [answerId]: String(suggested) }));
    };
    // Asks the AI to suggest a score + short feedback for one essay answer.
    // Never saves anything itself — just fills the draft field for the
    // teacher to review, edit, and confirm with the existing "ثبت نمره" button.
    const suggestWithAI = async (answerId, question, answerText) => {
        setAiGradeError((e) => ({ ...e, [answerId]: "" }));
        setAiGradingId(answerId);
        try {
            const r = await fetch("/api/ai/grade-essay", {
                method: "POST",
                headers: authHeaders({ "Content-Type": "application/json" }),
                body: JSON.stringify({
                    question_text: question.question_text,
                    model_answer: question.model_answer || "",
                    keywords: question.keywords || [],
                    student_answer: answerText,
                    mark: question.mark,
                }),
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setAiGradeError((e) => ({ ...e, [answerId]: data.error || "پیشنهاد نمره با خطا مواجه شد." }));
            }
            else {
                setDrafts((d) => ({ ...d, [answerId]: String(data.score) }));
                setAiFeedback((f) => ({ ...f, [answerId]: { feedback: data.feedback, hasReference: data.hasReference } }));
            }
        }
        catch {
            setAiGradeError((e) => ({ ...e, [answerId]: "اتصال برقرار نشد." }));
        }
        setAiGradingId(null);
    };
    return (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginTop: 20 } },
        React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 4 } }, "\u062A\u0635\u062D\u06CC\u062D \u067E\u0627\u0633\u062E\u200C\u0647\u0627\u06CC \u062A\u0634\u0631\u06CC\u062D\u06CC"),
        React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 16 } }, pending.length > 0 ? `${pending.length} پاسخ در انتظار تصحیح` : "همه‌ی پاسخ‌ها تصحیح شده‌اند."),
        items.some((it) => (it.answer.selected_option || "").startsWith("photo:")) && (React.createElement("div", { style: { fontSize: 12, color: "#B45309", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: "8px 12px", marginBottom: 16 } }, "\u23F3 \u0639\u06A9\u0633\u200C\u0647\u0627\u06CC \u067E\u0627\u0633\u062E \u062F\u0633\u062A\u200C\u0646\u0648\u06CC\u0633 \u0641\u0642\u0637 \u062A\u0627 \u06F2 \u0631\u0648\u0632 \u0628\u0639\u062F \u0627\u0632 \u062B\u0628\u062A \u0646\u06AF\u0647\u200C\u062F\u0627\u0631\u06CC \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u2014 \u0644\u0637\u0641\u0627\u064B \u0638\u0631\u0641 \u0647\u0645\u06CC\u0646 \u0628\u0627\u0632\u0647 \u062A\u0635\u062D\u06CC\u062D \u06A9\u0646\u06CC\u062F.")),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [...pending, ...graded].map(({ answer, question, studentName }) => (React.createElement("div", { key: answer.id, style: { border: "1px solid #EEF1F6", borderRadius: 12, padding: 14 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B" } }, studentName),
                    React.createElement("div", { style: { fontSize: 12, color: "#64748B" } },
                        React.createElement(MathText, { text: question.question_text }))),
                answer.awarded_mark != null && React.createElement(Badge, { tone: answer.awarded_mark >= question.mark ? "green" : "orange" },
                    "\u0646\u0645\u0631\u0647\u200C\u062F\u0627\u062F\u0647\u200C\u0634\u062F\u0647: ",
                    answer.awarded_mark,
                    " \u0627\u0632 ",
                    question.mark)),
            React.createElement("div", { style: { background: "#F8FAFC", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#334155", marginBottom: 10, whiteSpace: "pre-wrap" } }, (answer.selected_option || "").startsWith("photo:")
                ? React.createElement(AnswerPhoto, { photoKey: answer.selected_option.slice("photo:".length) })
                : answer.selected_option),
            question.model_answer && (React.createElement("div", { style: { fontSize: 12, color: "#16A34A", marginBottom: 10 } },
                "\u067E\u0627\u0633\u062E \u0646\u0645\u0648\u0646\u0647: ",
                React.createElement(MathText, { text: question.model_answer }))),
            (question.keywords || []).length > 0 && !(answer.selected_option || "").startsWith("photo:") && (React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 10 } },
                "\u06A9\u0644\u0645\u0627\u062A \u06A9\u0644\u06CC\u062F\u06CC: ",
                question.keywords.map((k) => {
                    const found = (answer.selected_option || "").toLowerCase().includes(k.toLowerCase());
                    return React.createElement("span", { key: k, style: { color: found ? "#16A34A" : "#CBD5E1", fontWeight: found ? 700 : 400, marginInlineEnd: 8 } }, k);
                }))),
            React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } },
                (question.keywords || []).length > 0 && !(answer.selected_option || "").startsWith("photo:") && (React.createElement(Button, { variant: "ghost", style: { fontSize: 12, padding: "8px 12px" }, onClick: () => suggestFromKeywords(answer.id, question, answer.selected_option) }, "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0646\u0645\u0631\u0647 (\u062E\u0648\u062F\u06A9\u0627\u0631)")),
                aiAllowed && !(answer.selected_option || "").startsWith("photo:") && (React.createElement(Button, { variant: "ghost", style: { fontSize: 12, padding: "8px 12px" }, onClick: () => suggestWithAI(answer.id, question, answer.selected_option), disabled: aiGradingId === answer.id }, aiGradingId === answer.id ? "در حال بررسی..." : "✨ پیشنهاد نمره با هوش مصنوعی")),
                React.createElement(TextInput, { type: "number", min: 0, max: question.mark, placeholder: `نمره از ${question.mark}`, value: drafts[answer.id] ?? (answer.awarded_mark ?? ""), onChange: (e) => setDrafts((d) => ({ ...d, [answer.id]: e.target.value })), style: { width: 120 } }),
                React.createElement(Button, { variant: "ghost", style: { fontSize: 13, padding: "8px 14px" }, onClick: () => grade(answer.id, question.mark), disabled: savingId === answer.id }, savingId === answer.id ? "..." : "ثبت نمره")),
            aiGradeError[answer.id] && (React.createElement("div", { style: { fontSize: 12, color: "#DC2626", marginTop: 8 } }, aiGradeError[answer.id])),
            aiFeedback[answer.id] && (React.createElement("div", { style: { fontSize: 12, color: "#1E3A8A", background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 8, padding: 10, marginTop: 8 } },
                React.createElement("div", null,
                    "\u2728 \u0646\u0638\u0631 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC: ",
                    aiFeedback[answer.id].feedback),
                !aiFeedback[answer.id].hasReference && (React.createElement("div", { style: { color: "#B45309", marginTop: 4 } }, "\u26A0\uFE0F \u0686\u0648\u0646 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0633\u0648\u0627\u0644 \u067E\u0627\u0633\u062E \u0646\u0645\u0648\u0646\u0647/\u06A9\u0644\u0645\u0627\u062A \u06A9\u0644\u06CC\u062F\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647\u060C \u0627\u06CC\u0646 \u0641\u0642\u0637 \u06CC\u0647 \u062D\u062F\u0633\u0647 \u2014 \u062D\u062A\u0645\u0627\u064B \u062E\u0648\u062F\u062A \u0647\u0645 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646."))))))))));
}
/* ---------------------------------------------------------
   CLASSES + ROSTER — teacher pre-registers students per class
   and assigns each a login code, so students don't type their
   name when starting an exam.
--------------------------------------------------------- */

/* ===== screens-classes.js ===== */
"use strict";
/* ---------------------------------------------------------
   CLASSES / ROSTER / STUDENTS / MESSAGES / STUDENT PORTAL / SETTINGS
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
function ClassesScreen({ teacher, classes, roster, onOpenClass, addLocalClass, removeLocalClass }) {
    const myClasses = classes.filter((c) => classTeacherIds(c).includes(teacher.username))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    // معلم مستقل (بدون مدرسه) خودش مدیر صفحه‌ی خودشه — چون هیچ مدیر مدرسه‌ای
    // نداره که براش کلاس بسازه، این بخش خودِ ساخت/حذف کلاس رو به همچین
    // معلمی می‌ده (فقط برای کلاس‌های خودش، با سقفی که مدیر کل تعیین می‌کنه).
    const isStandalone = !teacher.school_id;
    const [showCreate, setShowCreate] = useState(false);
    const [newClassName, setNewClassName] = useState("");
    const [createBusy, setCreateBusy] = useState(false);
    const [createError, setCreateError] = useState("");
    const createOwnClass = async () => {
        if (!newClassName.trim())
            return;
        setCreateBusy(true);
        setCreateError("");
        const id = uid();
        const record = { id, name: newClassName.trim(), teacher_ids: [teacher.username], school_id: null, created_at: new Date().toISOString() };
        const result = await setJSONChecked(`class:${id}`, record);
        setCreateBusy(false);
        if (!result.ok) {
            setCreateError(result.error);
            return;
        }
        addLocalClass && addLocalClass(record);
        setNewClassName("");
        setShowCreate(false);
    };
    const removeOwnClass = async (cls) => {
        const members = roster.filter((r) => r.class_id === cls.id);
        if (!window.confirm(`کلاس «${cls.name}» حذف شود؟${members.length ? ` ${members.length} دانش‌آموز این کلاس نیز حذف می‌شوند.` : ""} این کار قابل بازگشت نیست.`))
            return;
        removeLocalClass && removeLocalClass(cls.id);
        await Promise.all([deleteKey(`class:${cls.id}`), ...members.map((r) => deleteKey(`roster:${r.id}`))]);
    };
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u06A9\u0644\u0627\u0633\u200C\u0647\u0627", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { fontSize: 12.5, color: "#94A3B8", marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" } },
            React.createElement("span", null, isStandalone ? "کلاس‌های خودتان را از همین‌جا بسازید و مدیریت کنید." : "کلاس‌بندی و افزودن/حذف دانش‌آموز توسط مدیر مدرسه انجام می‌شود."),
            isStandalone && React.createElement(Button, { onClick: () => setShowCreate(true) },
                React.createElement(Plus, { size: 15 }),
                "\u0633\u0627\u062E\u062A \u06A9\u0644\u0627\u0633 \u062C\u062F\u06CC\u062F")),
        isStandalone && showCreate && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 18, marginBottom: 18 } },
            React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0644\u0627\u0633" },
                React.createElement(TextInput, { value: newClassName, onChange: (e) => setNewClassName(e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0646\u0647\u0645 \u06F1" })),
            createError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12.5, marginBottom: 10 } }, createError),
            React.createElement("div", { style: { display: "flex", gap: 8 } },
                React.createElement(Button, { onClick: createOwnClass, disabled: createBusy }, createBusy ? "در حال ساخت..." : "ساخت کلاس"),
                React.createElement(Button, { variant: "ghost", onClick: () => { setShowCreate(false); setCreateError(""); } }, "\u0627\u0646\u0635\u0631\u0627\u0641")))),
        myClasses.length === 0 ? (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6" } },
            React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u06A9\u0644\u0627\u0633\u06CC \u0628\u0631\u0627\u06CC \u0634\u0645\u0627 \u062A\u0639\u0631\u06CC\u0641 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.", actionLabel: isStandalone ? "ساخت کلاس جدید" : undefined, onAction: isStandalone ? () => setShowCreate(true) : undefined }))) : (React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 16 } }, myClasses.map((c) => {
            const count = roster.filter((r) => r.class_id === c.id).length;
            return (React.createElement("div", { key: c.id, style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 20 } },
                React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, c.name),
                React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 16 } },
                    count,
                    " \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632"),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement(Button, { variant: "ghost", style: { fontSize: 13, padding: "8px 12px" }, onClick: () => onOpenClass(c.id) }, "\u0645\u0634\u0627\u0647\u062F\u0647 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646"),
                    isStandalone && (React.createElement(Button, { variant: "ghost", style: { fontSize: 13, padding: "8px 12px", color: "#DC2626" }, onClick: () => removeOwnClass(c) },
                        React.createElement(Trash2, { size: 14 }),
                        "\u062D\u0630\u0641")))));
        })))));
}
function RosterScreen({ classroom, roster, teacher, onBack, refresh, addLocalRoster, addLocalRosterMany, updateLocalRoster, removeLocalRoster, groupLoginCode }) {
    const members = roster.filter((r) => r.class_id === classroom.id);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [showBulk, setShowBulk] = useState(false);
    const [bulkText, setBulkText] = useState("");
    const [bulkSaving, setBulkSaving] = useState(false);
    const [bulkMsg, setBulkMsg] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const addStudent = async () => {
        if (!name.trim())
            return;
        setSaving(true);
        const allCodes = roster.map((r) => r.code);
        const id = uid();
        const code = generateCode(allCodes);
        const record = {
            id, class_id: classroom.id, teacher_id: teacher.username,
            fullname: name.trim(), code, created_at: new Date().toISOString(),
        };
        // Show it in the list immediately — KV's list endpoint can lag a few
        // seconds behind a just-written key, so we don't wait for refresh().
        addLocalRoster && addLocalRoster(record);
        // سرور خودش یک بار دیگه یکتایی کد رو در کل مدرسه (نه فقط کلاس‌های خودِ
        // این معلم) چک می‌کنه و در صورت تصادف، کد رو عوض می‌کنه — پس مقدار
        // نهایی رو از پاسخ سرور می‌گیریم، نه چیزی که خودمون همین بالا حدس زدیم.
        const result = await setJSONReturn(`roster:${id}`, record);
        if (result.ok && result.v && result.v.code !== code) {
            updateLocalRoster && updateLocalRoster(result.v);
        }
        setSaving(false);
        setName("");
        refresh();
    };
    // Bulk add: one student per line (or comma-separated). Blank lines are ignored,
    // duplicate names already in this class are skipped, and every new student gets
    // its own unique auto-generated code.
    const addBulkStudents = async () => {
        const names = bulkText
            .split(/[\n,]/)
            .map((n) => n.trim())
            .filter(Boolean);
        if (names.length === 0) {
            setBulkMsg("نامی برای افزودن پیدا نشد.");
            return;
        }
        setBulkSaving(true);
        const existingNames = new Set(members.map((m) => m.fullname.trim()));
        const usedCodes = roster.map((r) => r.code);
        let added = 0, skipped = 0;
        const newRecords = [];
        for (const n of names) {
            if (existingNames.has(n)) {
                skipped++;
                continue;
            }
            existingNames.add(n);
            const id = uid();
            const code = generateCode(usedCodes);
            usedCodes.push(code);
            const record = {
                id, class_id: classroom.id, teacher_id: teacher.username,
                fullname: n, code, created_at: new Date().toISOString(),
            };
            const result = await setJSONReturn(`roster:${id}`, record);
            newRecords.push(result.ok && result.v ? result.v : record);
            if (result.ok && result.v)
                usedCodes.push(result.v.code);
            added++;
        }
        if (newRecords.length > 0)
            addLocalRosterMany && addLocalRosterMany(newRecords);
        setBulkSaving(false);
        setBulkMsg(`${added} دانش‌آموز اضافه شد${skipped > 0 ? ` — ${skipped} مورد تکراری نادیده گرفته شد.` : "."}`);
        if (added > 0) {
            setBulkText("");
            refresh();
        }
    };
    const regenerateCode = async (member) => {
        const allCodes = roster.filter((r) => r.id !== member.id).map((r) => r.code);
        const code = generateCode(allCodes);
        const updated = { ...member, code };
        updateLocalRoster && updateLocalRoster(updated);
        const result = await setJSONReturn(`roster:${member.id}`, updated);
        if (result.ok && result.v && result.v.code !== code) {
            updateLocalRoster && updateLocalRoster(result.v);
        }
        refresh();
    };
    const removeStudent = async (id) => {
        if (!window.confirm("این دانش‌آموز از کلاس حذف شود؟"))
            return;
        setDeletingId(id);
        // Remove from the visible list right away instead of waiting on a
        // KV list refresh (which can take a few seconds to catch up).
        removeLocalRoster && removeLocalRoster(id);
        await deleteKey(`roster:${id}`);
        setDeletingId(null);
        refresh();
    };
    const printCodes = () => {
        const win = window.open("", "_blank");
        if (!win)
            return;
        const cards = members.map((m) => `
      <div style="border:1.5px dashed #999;border-radius:10px;padding:14px;text-align:center;width:150px;display:inline-block;margin:6px">
        <div style="font-size:12px;color:#666">${classroom.name}</div>
        <div style="font-size:14px;font-weight:bold;margin:6px 0">${m.fullname}</div>
        ${groupLoginCode ? `<div style="font-size:11px;color:#888;margin-bottom:2px">کد مدرسه: <b>${groupLoginCode}</b></div>` : ""}
        <div style="font-size:22px;font-weight:bold;letter-spacing:2px">${m.code}</div>
      </div>`).join("");
        win.document.write(`<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>کدهای ${classroom.name}</title>
      <style>body{font-family:Tahoma,sans-serif;padding:20px}</style></head><body>${cards}</body></html>`);
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 300);
    };
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748B", marginBottom: 6, cursor: "pointer" }, onClick: onBack },
            React.createElement(ArrowRight, { size: 15 }),
            " \u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u06A9\u0644\u0627\u0633\u200C\u0647\u0627"),
        React.createElement(TopBar, { title: `دانش‌آموزان — ${classroom.name}`, teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { background: "#FFFBEB", borderRadius: 16, border: "1px solid #FDE68A", padding: 16, marginBottom: 20, fontSize: 12.5, color: "#92400E" } }, "\u0627\u0641\u0632\u0648\u062F\u0646 \u0648 \u062D\u0630\u0641 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631 \u0645\u062F\u0631\u0633\u0647 \u0627\u0646\u062C\u0627\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F."),
        groupLoginCode && (React.createElement("div", { style: { background: "#EFF6FF", borderRadius: 16, border: "1px solid #BFDBFE", padding: "14px 16px", marginBottom: 20, fontSize: 12.5, color: "#1E3A8A", display: "flex", alignItems: "center", gap: 10 } },
            "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0647\u0627 \u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0647\u0645\u0631\u0627\u0647 \u0628\u0627 \u06A9\u062F \u0634\u062E\u0635\u06CC \u062E\u0648\u062F\u0634\u0627\u0646 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u06A9\u0646\u0646\u062F:",
            React.createElement("span", { style: { fontFamily: "monospace", fontSize: 15, fontWeight: 800, letterSpacing: 2 } }, groupLoginCode))),
        members.length > 0 && (React.createElement("div", { style: { marginBottom: 14 } },
            React.createElement(Button, { variant: "ghost", onClick: printCodes },
                React.createElement(FileText, { size: 15 }),
                "\u0686\u0627\u067E \u06A9\u0627\u0631\u062A \u06A9\u062F\u0647\u0627 \u0628\u0631\u0627\u06CC \u067E\u062E\u0634 \u0628\u06CC\u0646 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646"))),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } }, members.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u0628\u0647 \u0627\u06CC\u0646 \u06A9\u0644\u0627\u0633 \u0627\u0636\u0627\u0641\u0647 \u0646\u0634\u062F\u0647." })) : (React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } },
            React.createElement("thead", null,
                React.createElement("tr", { style: { textAlign: "right", color: "#64748B", fontSize: 12, fontWeight: 700 } },
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u0646\u0627\u0645"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u06A9\u062F \u0648\u0631\u0648\u062F"))),
            React.createElement("tbody", null, members.map((m) => (React.createElement("tr", { key: m.id, style: { borderTop: "1px solid #F1F5F9", fontSize: 14 } },
                React.createElement("td", { style: { padding: "12px 6px", fontWeight: 700, color: "#1E293B" } }, m.fullname),
                React.createElement("td", { style: { padding: "12px 6px" } },
                    React.createElement("span", { style: { fontFamily: "monospace", fontSize: 16, fontWeight: 800, color: "#2563EB", letterSpacing: 2 } }, m.code)))))))))));
}
/* ---------------------------------------------------------
   STUDENTS + SETTINGS (simple)
--------------------------------------------------------- */
function StudentsScreen({ teacher, students, exams, answers, questions, refresh }) {
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState(null);
    const [deletingKey, setDeletingKey] = useState(null);
    const myStudents = students.filter((s) => s.teacher_id === teacher.username);
    const removeStudentRecord = async (ids) => {
        if (!window.confirm("سوابق شرکت این دانش‌آموز در همه‌ی آزمون‌ها حذف شود؟ این کار قابل بازگشت نیست."))
            return;
        setDeletingKey(ids.join(","));
        await Promise.all(ids.map((id) => deleteKey(`answers:${id}`)));
        await Promise.all(ids.map((id) => deleteKey(`student:${id}`)));
        setDeletingKey(null);
        if (refresh)
            await refresh();
    };
    // Group by name since each exam attempt creates a separate student record.
    const byName = {};
    myStudents.forEach((s) => {
        const key = s.fullname.trim().toLowerCase();
        byName[key] = byName[key] || { fullname: s.fullname, class_code: s.class_code, ids: [] };
        byName[key].ids.push(s.id);
    });
    const rows = Object.values(byName).map((g) => {
        const myAnswers = answers.filter((a) => g.ids.includes(a.student_id));
        const examIds = [...new Set(myAnswers.map((a) => a.exam_id))];
        const trend = examIds.map((examId) => {
            const list = myAnswers.filter((a) => a.exam_id === examId);
            const totalMarks = list.reduce((s, a) => s + (a.mark || 1), 0);
            const gotMarks = list.reduce((s, a) => s + awardedMarkOf(a), 0);
            const pct = totalMarks ? Math.round((gotMarks / totalMarks) * 1000) / 10 : 0;
            const exam = exams.find((e) => e.id === examId);
            const date = list[0]?.answered_at || null;
            return { examId, title: exam?.title || "—", pct, date };
        }).sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
        return { ...g, examCount: examIds.length, trend };
    });
    const displayRows = search.trim()
        ? rows.filter((s) => (s.fullname + " " + (s.class_code || "")).toLowerCase().includes(search.trim().toLowerCase()))
        : rows;
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        rows.length > 0 && (React.createElement("div", { style: { marginBottom: 16 } },
            React.createElement(TextInput, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "\u062C\u0633\u062A\u062C\u0648\u06CC \u0646\u0627\u0645 \u06CC\u0627 \u06A9\u0644\u0627\u0633...", style: { maxWidth: 260 } }))),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } }, rows.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u062F\u0631 \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u06CC \u062A\u0648 \u0634\u0631\u06A9\u062A \u0646\u06A9\u0631\u062F\u0647 \u0627\u0633\u062A." })) : displayRows.length === 0 ? (React.createElement(EmptyState, { text: "\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u062C\u0633\u062A\u062C\u0648 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F." })) : (React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } },
            React.createElement("thead", null,
                React.createElement("tr", { style: { textAlign: "right", color: "#64748B", fontSize: 12, fontWeight: 700 } },
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u0646\u0627\u0645"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u06A9\u062F \u06A9\u0644\u0627\u0633"),
                    React.createElement("th", { style: { padding: "8px 6px" } }, "\u062A\u0639\u062F\u0627\u062F \u0622\u0632\u0645\u0648\u0646 \u0634\u0631\u06A9\u062A\u200C\u06A9\u0631\u062F\u0647"),
                    React.createElement("th", { style: { padding: "8px 6px" } }),
                    React.createElement("th", { style: { padding: "8px 6px" } }))),
            React.createElement("tbody", null, displayRows.map((s) => (React.createElement(React.Fragment, { key: s.fullname },
                React.createElement("tr", { style: { borderTop: "1px solid #F1F5F9", fontSize: 14, cursor: s.trend.length > 1 ? "pointer" : "default" } },
                    React.createElement("td", { style: { padding: "12px 6px", fontWeight: 700, color: "#1E293B" }, onClick: () => s.trend.length > 1 && setExpanded((e) => e === s.fullname ? null : s.fullname) }, s.fullname),
                    React.createElement("td", { style: { padding: "12px 6px", color: "#475569" }, onClick: () => s.trend.length > 1 && setExpanded((e) => e === s.fullname ? null : s.fullname) }, s.class_code || "—"),
                    React.createElement("td", { style: { padding: "12px 6px", color: "#475569" }, onClick: () => s.trend.length > 1 && setExpanded((e) => e === s.fullname ? null : s.fullname) }, s.examCount),
                    React.createElement("td", { style: { padding: "12px 6px", color: "#2563EB", fontSize: 12 }, onClick: () => s.trend.length > 1 && setExpanded((e) => e === s.fullname ? null : s.fullname) }, s.trend.length > 1 && (expanded === s.fullname ? "بستن روند ▲" : "روند نمرات ▼")),
                    React.createElement("td", { style: { padding: "12px 6px" } },
                        React.createElement(Trash2, { size: 16, style: { cursor: "pointer", color: "#F87171", opacity: deletingKey === s.ids.join(",") ? 0.4 : 1 }, onClick: () => removeStudentRecord(s.ids) }))),
                expanded === s.fullname && (React.createElement("tr", null,
                    React.createElement("td", { colSpan: 5, style: { padding: "6px 6px 18px" } },
                        React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 14, height: 110, background: "#F8FAFC", borderRadius: 10, padding: "14px 18px", overflowX: "auto" } }, s.trend.map((t) => (React.createElement("div", { key: t.examId, title: t.title, style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 46 } },
                            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#1E293B" } },
                                t.pct,
                                "%"),
                            React.createElement("div", { style: { width: 22, borderRadius: "4px 4px 0 0", background: t.pct >= 50 ? "#16A34A" : "#DC2626", height: `${Math.max(4, t.pct * 0.6)}px` } }),
                            React.createElement("div", { style: { fontSize: 10, color: "#94A3B8", maxWidth: 60, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, t.title)))))))))))))))));
}
/* ---------------------------------------------------------
   MESSAGES — teacher broadcasts announcements to all students,
   one class, or a single student; shown in the student portal.
--------------------------------------------------------- */
function MessagesScreen({ teacher, classes, roster, messages, refresh, addLocalMessage, removeLocalMessage, onUpdateSelf }) {
    const [targetType, setTargetType] = useState("all"); // 'all' | 'class' | 'student'
    const [targetClassId, setTargetClassId] = useState("");
    const [targetStudentId, setTargetStudentId] = useState("");
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const myClasses = classes.filter((c) => classTeacherIds(c).includes(teacher.username));
    const myRoster = roster; // roster از سرور از قبل به کلاس‌های همین معلم محدود شده
    const myMessages = messages.filter((m) => m.teacher_id === teacher.username)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    // معلم مستقل (بدون مدرسه) با مدیر سایت گفتگوی مستقیم داره — دقیقاً مثل
    // گفتگوی مدیر مدرسه با مدیر سایت، فقط thread-key اینجا teacher_id خودشه.
    const isStandalone = !teacher.school_id;
    const [saThreadText, setSaThreadText] = useState("");
    const [saThreadSending, setSaThreadSending] = useState(false);
    const [allowToSuperAdmin, setAllowToSuperAdmin] = useState(true);
    useEffect(() => {
        if (!isStandalone)
            return;
        let cancelled = false;
        getJSON("settings:global").then((s) => { if (!cancelled)
            setAllowToSuperAdmin(s?.allow_admin_to_superadmin_messages !== false); });
        return () => { cancelled = true; };
    }, [isStandalone]);
    const superAdminThread = isStandalone
        ? messages.filter((m) => m.channel === "admin_superadmin" && m.teacher_id === teacher.username)
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        : [];
    const unreadSaCount = superAdminThread.filter((m) => m.sender_role === "super_admin" && new Date(m.created_at) > new Date(teacher.sa_thread_last_read_at || 0)).length;
    useEffect(() => {
        if (!isStandalone || unreadSaCount === 0)
            return;
        const updated = { ...teacher, sa_thread_last_read_at: new Date().toISOString() };
        setJSON(`teacher:${teacher.username}`, updated).then(() => { onUpdateSelf && onUpdateSelf(updated); });
    }, [isStandalone, unreadSaCount]);
    const sendToSuperAdmin = async () => {
        if (!saThreadText.trim())
            return;
        setSaThreadSending(true);
        const id = uid();
        const record = {
            id, channel: "admin_superadmin", sender_role: "teacher", sender_name: teacher.fullname,
            teacher_id: teacher.username, text: saThreadText.trim(), created_at: new Date().toISOString(),
        };
        await setJSON(`message:${id}`, record);
        addLocalMessage && addLocalMessage(record);
        setSaThreadSending(false);
        setSaThreadText("");
        await refresh();
    };
    const send = async () => {
        if (!text.trim())
            return;
        if (targetType === "class" && !targetClassId)
            return;
        if (targetType === "student" && !targetStudentId)
            return;
        setSending(true);
        const id = uid();
        const record = {
            id, teacher_id: teacher.username,
            target_type: targetType,
            target_id: targetType === "class" ? targetClassId : targetType === "student" ? targetStudentId : null,
            text: text.trim(),
            created_at: new Date().toISOString(),
        };
        await setJSON(`message:${id}`, record);
        addLocalMessage && addLocalMessage(record); // KV list ممکنه چند ثانیه دیر برسه؛ فوری نشون بده
        setSending(false);
        setText("");
        await refresh();
    };
    const removeMessage = async (id) => {
        setDeletingId(id);
        await deleteKey(`message:${id}`);
        removeLocalMessage && removeLocalMessage(id);
        setDeletingId(null);
        await refresh();
    };
    const describeTarget = (m) => {
        if (m.target_type === "all")
            return "همه‌ی دانش‌آموزان";
        if (m.target_type === "class")
            return `کلاس: ${classes.find((c) => c.id === m.target_id)?.name || "حذف‌شده"}`;
        return `دانش‌آموز: ${roster.find((r) => r.id === m.target_id)?.fullname || "حذف‌شده"}`;
    };
    const adminAnnouncements = messages.filter((m) => m.sender === "admin" && m.audience === "teachers")
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u067E\u06CC\u0627\u0645\u200C\u0647\u0627", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        isStandalone && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginBottom: 20 } },
            React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 4 } }, "\u067E\u06CC\u0627\u0645 \u0628\u0647 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A"),
            React.createElement("div", { style: { fontSize: 12, color: "#94A3B8", marginBottom: 14 } }, "\u06AF\u0641\u062A\u06AF\u0648\u06CC \u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u06CC\u0646 \u0634\u0645\u0627 \u0648 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0633\u0627\u0645\u0627\u0646\u0647."),
            React.createElement("div", { style: {
                    maxHeight: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8,
                    background: "#F8FAFC", borderRadius: 10, padding: superAdminThread.length ? 12 : 0, marginBottom: 14,
                } }, superAdminThread.length === 0 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 12.5, padding: 14, textAlign: "center" } }, "\u0647\u0646\u0648\u0632 \u067E\u06CC\u0627\u0645\u06CC \u0631\u062F \u0648 \u0628\u062F\u0644 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.")) : superAdminThread.map((m) => (React.createElement("div", { key: m.id, style: {
                    alignSelf: m.sender_role === "super_admin" ? "flex-start" : "flex-end",
                    maxWidth: "80%", background: m.sender_role === "super_admin" ? "#EFF6FF" : "#F5F3FF",
                    border: `1px solid ${m.sender_role === "super_admin" ? "#DBEAFE" : "#DDD6FE"}`,
                    borderRadius: 10, padding: "8px 12px",
                } },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: m.sender_role === "super_admin" ? "#2563EB" : "#7C3AED", marginBottom: 3 } }, m.sender_role === "super_admin" ? "🛡️ مدیر سایت" : m.sender_name || "شما"),
                React.createElement("div", { style: { fontSize: 13, color: "#334155", whiteSpace: "pre-wrap" } }, m.text),
                React.createElement("div", { style: { fontSize: 10.5, color: "#94A3B8", marginTop: 3 } }, new Date(m.created_at).toLocaleString("fa-IR")))))),
            allowToSuperAdmin ? (React.createElement("div", { style: { display: "flex", gap: 8 } },
                React.createElement(TextInput, { value: saThreadText, onChange: (e) => setSaThreadText(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                        sendToSuperAdmin(); }, placeholder: "\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u06CC\u062F...", style: { flex: 1 } }),
                React.createElement(Button, { onClick: sendToSuperAdmin, disabled: saThreadSending || !saThreadText.trim() }, saThreadSending ? "..." : "ارسال"))) : (React.createElement("div", { style: { fontSize: 12.5, color: "#94A3B8", background: "#F8FAFC", borderRadius: 8, padding: "10px 12px" } }, "\u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0628\u0647 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0631\u0627 \u0645\u0648\u0642\u062A\u0627\u064B \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0631\u062F\u0647 \u0627\u0633\u062A.")))),
        adminAnnouncements.length > 0 && (React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: "#1E293B", marginBottom: 10 } }, "\u0627\u0639\u0644\u0627\u0646\u0627\u062A \u0645\u062F\u06CC\u0631 \u0645\u062F\u0631\u0633\u0647"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, adminAnnouncements.map((m) => (React.createElement("div", { key: m.id, style: { background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 10, padding: "10px 14px" } },
                React.createElement("div", { style: { fontSize: 13, color: "#4C1D95", whiteSpace: "pre-wrap", marginBottom: 4 } }, m.text),
                React.createElement("div", { style: { fontSize: 11, color: "#7C3AED" } }, new Date(m.created_at).toLocaleString("fa-IR")))))))),
        React.createElement("div", { style: { fontSize: 13, color: "#64748B", marginBottom: 16 } }, "\u067E\u06CC\u0627\u0645\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u06CC\u0646\u062C\u0627 \u0645\u06CC\u200C\u0641\u0631\u0633\u062A\u06CC\u060C \u062F\u0631 \u067E\u0631\u062A\u0627\u0644 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC (\u0648\u0642\u062A\u06CC \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0628\u0627 \u06A9\u062F \u062E\u0648\u062F\u0634 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u0634\u0648\u062F) \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F."),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginBottom: 20 } },
            React.createElement(Field, { label: "\u06AF\u06CC\u0631\u0646\u062F\u0647" },
                React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, [
                    { key: "all", label: "همه‌ی دانش‌آموزان" },
                    { key: "class", label: "یک کلاس خاص" },
                    { key: "student", label: "یک دانش‌آموز خاص" },
                ].map((opt) => (React.createElement("div", { key: opt.key, onClick: () => setTargetType(opt.key), style: {
                        padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700,
                        background: targetType === opt.key ? "#2563EB" : "#F1F5F9", color: targetType === opt.key ? "#fff" : "#475569",
                    } }, opt.label))))),
            targetType === "class" && (React.createElement(Field, { label: "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0644\u0627\u0633" },
                React.createElement("select", { value: targetClassId, onChange: (e) => setTargetClassId(e.target.value), style: inputStyle },
                    React.createElement("option", { value: "" }, "\u2014 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u2014"),
                    myClasses.map((c) => React.createElement("option", { key: c.id, value: c.id }, c.name))))),
            targetType === "student" && (React.createElement(Field, { label: "\u0627\u0646\u062A\u062E\u0627\u0628 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632" },
                React.createElement(StudentPicker, { classes: myClasses, roster: myRoster, value: targetStudentId, onChange: setTargetStudentId }))),
            React.createElement(Field, { label: "\u0645\u062A\u0646 \u067E\u06CC\u0627\u0645" },
                React.createElement("textarea", { value: text, onChange: (e) => setText(e.target.value), rows: 4, style: { ...inputStyle, resize: "vertical", fontFamily: "inherit" }, placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0641\u0631\u062F\u0627 \u0627\u0645\u062A\u062D\u0627\u0646 \u0641\u0635\u0644 \u06F5 \u0628\u0631\u06AF\u0632\u0627\u0631 \u0645\u06CC\u200C\u0634\u0648\u062F." })),
            React.createElement(Button, { onClick: send, disabled: sending },
                React.createElement(Plus, { size: 16 }),
                sending ? "در حال ارسال..." : "ارسال پیام")),
        React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 12 } }, "\u067E\u06CC\u0627\u0645\u200C\u0647\u0627\u06CC \u0627\u0631\u0633\u0627\u0644\u200C\u0634\u062F\u0647"),
        myMessages.length === 0 ? (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6" } },
            React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u067E\u06CC\u0627\u0645\u06CC \u0646\u0641\u0631\u0633\u062A\u0627\u062F\u0647\u200C\u0627\u06CC." }))) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, myMessages.map((m) => (React.createElement("div", { key: m.id, style: { background: "#fff", border: "1px solid #EEF1F6", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 } },
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 13, color: "#334155", marginBottom: 6, whiteSpace: "pre-wrap" } }, m.text),
                React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
                    React.createElement(Badge, { tone: "blue" }, describeTarget(m)),
                    React.createElement("span", { style: { fontSize: 11, color: "#94A3B8" } }, new Date(m.created_at).toLocaleString("fa-IR")))),
            React.createElement(Trash2, { size: 16, style: { cursor: "pointer", color: "#F87171", flexShrink: 0, opacity: deletingId === m.id ? 0.4 : 1 }, onClick: () => removeMessage(m.id) }))))))));
}
/* ---------------------------------------------------------
   CLASS CHAT — a live group chat between the teacher and every
   student of one class (shared thread). Teacher can flip the
   class between "open" (two-way) and "channel" (broadcast-only,
   students can still react/see-receipt but not type) and can
   override that per individual student.
--------------------------------------------------------- */
function ClassChatScreen({ teacher, classes, roster, messages, refresh, refreshMessages, onUpdateSelf, addLocalMessage }) {
    const myClasses = classes.filter((c) => classTeacherIds(c).includes(teacher.username));
    const [selectedClassId, setSelectedClassId] = useState(myClasses[0]?.id || null);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const [showOverrides, setShowOverrides] = useState(false);
    // KV گاهی بلافاصله بعد از نوشتن، مقدار قدیمی رو برمی‌گردونه؛ تا وقتی
    // refresh() نسخه‌ی واقعی سرور رو تأیید کنه، همین override محلی نمایش داده می‌شه.
    const [localModeOverride, setLocalModeOverride] = useState({}); // classId -> mode
    const [localStudentOverride, setLocalStudentOverride] = useState({}); // classId -> {rosterId: mode}
    const bottomRef = useRef(null);
    useEffect(() => {
        if (!selectedClassId && myClasses.length > 0)
            setSelectedClassId(myClasses[0].id);
    }, [myClasses.length]);
    // چت زنده‌تر به‌نظر بیاد: هر چند ثانیه، تا وقتی این صفحه بازه، از سرور تازه می‌کنیم.
    // فقط پیام‌ها رو (نه کل حساب — آزمون/سوال/کلاس/روستر/معلم‌ها) چون این
    // polling مکرره؛ refresh() کامل هر چند ثانیه یعنی صدها درخواست اضافه به
    // سرور در دقیقه که سهمیه‌ی رایگان Workers رو خیلی سریع مصرف می‌کنه.
    useEffect(() => {
        const poll = refreshMessages || refresh;
        const interval = setInterval(() => { poll(); }, 8000);
        return () => clearInterval(interval);
    }, [refresh, refreshMessages]);
    const selectedClass = classes.find((c) => c.id === selectedClassId) || null;
    const classRoster = selectedClassId ? roster.filter((r) => r.class_id === selectedClassId) : [];
    const thread = selectedClassId
        ? messages.filter((m) => m.kind === "class_chat" && m.class_id === selectedClassId && m.teacher_id === teacher.username)
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        : [];
    const lastReadMap = teacher.class_chat_last_read || {};
    const unreadCountFor = (classId) => messages.filter((m) => m.kind === "class_chat" && m.class_id === classId
        && m.teacher_id === teacher.username && m.sender_role === "student"
        && (!lastReadMap[classId] || new Date(m.created_at) > new Date(lastReadMap[classId]))).length;
    useEffect(() => {
        if (!selectedClassId)
            return;
        if (unreadCountFor(selectedClassId) === 0)
            return;
        const updatedMap = { ...lastReadMap, [selectedClassId]: new Date().toISOString() };
        const updatedTeacher = { ...teacher, class_chat_last_read: updatedMap };
        setJSON(`teacher:${teacher.username}`, updatedTeacher).then(() => { onUpdateSelf && onUpdateSelf(updatedTeacher); });
    }, [selectedClassId, messages.length]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: "nearest" });
    }, [thread.length, selectedClassId]);
    const effectiveMode = selectedClassId
        ? (localModeOverride[selectedClassId] || (selectedClass && selectedClass.chat_mode) || "open")
        : "open";
    const send = async () => {
        if (!text.trim() || !selectedClassId)
            return;
        setSending(true);
        const id = uid();
        const record = {
            id, teacher_id: teacher.username, kind: "class_chat", class_id: selectedClassId,
            sender_role: "teacher", sender_name: teacher.fullname,
            text: text.trim(), created_at: new Date().toISOString(), seen_by: [], reactions: {},
        };
        await setJSON(`message:${id}`, record);
        addLocalMessage && addLocalMessage(record); // KV list ممکنه چند ثانیه دیر برسه؛ فوری نشون بده
        setSending(false);
        setText("");
        await (refreshMessages || refresh)();
    };
    const toggleClassMode = async () => {
        if (!selectedClassId || !selectedClass)
            return;
        const next = effectiveMode === "open" ? "channel" : "open";
        setLocalModeOverride((prev) => ({ ...prev, [selectedClassId]: next }));
        await setJSON(`class:${selectedClassId}`, { ...selectedClass, chat_mode: next });
        await refresh();
    };
    const setStudentOverride = async (rosterId, mode) => {
        if (!selectedClassId || !selectedClass)
            return;
        const overrides = { ...(localStudentOverride[selectedClassId] || selectedClass.chat_overrides || {}) };
        if (mode)
            overrides[rosterId] = mode;
        else
            delete overrides[rosterId];
        setLocalStudentOverride((prev) => ({ ...prev, [selectedClassId]: overrides }));
        await setJSON(`class:${selectedClassId}`, { ...selectedClass, chat_overrides: overrides });
        await refresh();
    };
    const effectiveStudentOverrides = selectedClassId
        ? (localStudentOverride[selectedClassId] || (selectedClass && selectedClass.chat_overrides) || {})
        : {};
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u0686\u062A \u0628\u0627 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        myClasses.length === 0 ? (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6" } },
            React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u06A9\u0644\u0627\u0633\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC." }))) : (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", display: "flex", minHeight: 480, overflow: "hidden" } },
            React.createElement("div", { style: { width: 220, borderLeft: "1px solid #EEF1F6", overflowY: "auto", flexShrink: 0 } }, myClasses.map((c) => {
                const unread = unreadCountFor(c.id);
                return (React.createElement("div", { key: c.id, onClick: () => setSelectedClassId(c.id), style: {
                        padding: "13px 16px", cursor: "pointer", borderBottom: "1px solid #F5F7FA",
                        background: selectedClassId === c.id ? "#EFF6FF" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                    } },
                    React.createElement("span", { style: { fontSize: 13.5, fontWeight: 700, color: "#1E293B" } }, c.name),
                    unread > 0 && (React.createElement("span", { style: {
                            flexShrink: 0, background: "#EF4444", color: "#fff", fontSize: 10.5, fontWeight: 800,
                            borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px", display: "flex", alignItems: "center", justifyContent: "center",
                        } }, unread))));
            })),
            React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", padding: 18, minWidth: 0 } }, !selectedClass ? (React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", fontSize: 13.5 } }, "\u06CC\u06A9 \u06A9\u0644\u0627\u0633 \u0631\u0627 \u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F.")) : (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #F5F7FA", flexWrap: "wrap", gap: 10 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B" } }, selectedClass.name),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                        React.createElement("span", { onClick: () => setShowOverrides((v) => !v), style: { fontSize: 12, color: "#2563EB", fontWeight: 700, cursor: "pointer" } }, "\u062A\u0646\u0638\u06CC\u0645 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647\u200C\u06CC \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646"),
                        React.createElement("div", { onClick: toggleClassMode, style: {
                                display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 999, cursor: "pointer",
                                background: effectiveMode === "open" ? "#DCFCE7" : "#FEF3C7", color: effectiveMode === "open" ? "#15803D" : "#B45309",
                                fontSize: 12.5, fontWeight: 700,
                            } },
                            effectiveMode === "open" ? React.createElement(MessageCircle, { size: 14 }) : React.createElement(Megaphone, { size: 14 }),
                            effectiveMode === "open" ? "چت دوطرفه (باز)" : "کانال اطلاع‌رسانی (یک‌طرفه)"))),
                showOverrides && (React.createElement("div", { style: { background: "#F8FAFC", border: "1px solid #EEF1F6", borderRadius: 12, padding: 14, marginBottom: 14 } },
                    React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 10 } }, "\u0628\u0631\u0627\u06CC \u0647\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u062C\u062F\u0627 \u0627\u0632 \u062D\u0627\u0644\u062A \u06A9\u0644\u06CC \u06A9\u0644\u0627\u0633 \u062A\u0635\u0645\u06CC\u0645 \u0628\u06AF\u06CC\u0631\u06CC \u2014 \u0645\u062B\u0644\u0627\u064B \u06A9\u0644\u0627\u0633 \u0628\u0627\u0632 \u0628\u0627\u0634\u062F \u0648\u0644\u06CC \u06CC\u06A9 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u062E\u0627\u0635 \u0645\u0633\u062F\u0648\u062F \u0634\u0648\u062F\u060C \u06CC\u0627 \u0628\u0631\u0639\u06A9\u0633."),
                    classRoster.length === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: "#94A3B8" } }, "\u0627\u06CC\u0646 \u06A9\u0644\u0627\u0633 \u0647\u0646\u0648\u0632 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u0646\u062F\u0627\u0631\u062F.")) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, classRoster.map((r) => {
                        const ov = effectiveStudentOverrides[r.id] || "";
                        return (React.createElement("div", { key: r.id, style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } },
                            React.createElement("span", { style: { fontSize: 13, color: "#334155" } }, r.fullname),
                            React.createElement("select", { value: ov, onChange: (e) => setStudentOverride(r.id, e.target.value || null), style: { ...inputStyle, width: 170, padding: "6px 10px", fontSize: 12.5 } },
                                React.createElement("option", { value: "" },
                                    "\u067E\u06CC\u0631\u0648\u06CC \u0627\u0632 \u06A9\u0644\u0627\u0633 (",
                                    effectiveMode === "open" ? "باز" : "کانال",
                                    ")"),
                                React.createElement("option", { value: "open" }, "\u0647\u0645\u06CC\u0634\u0647 \u0628\u0627\u0632 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0646\u0641\u0631"),
                                React.createElement("option", { value: "channel" }, "\u0647\u0645\u06CC\u0634\u0647 \u0645\u0633\u062F\u0648\u062F \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0646\u0641\u0631"))));
                    }))))),
                React.createElement("div", { style: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 } },
                    thread.length === 0 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 12.5, padding: 14, textAlign: "center" } }, "\u0647\u0646\u0648\u0632 \u067E\u06CC\u0627\u0645\u06CC \u062F\u0631 \u0627\u06CC\u0646 \u06A9\u0644\u0627\u0633 \u0631\u062F \u0648 \u0628\u062F\u0644 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.")) : thread.map((m) => (React.createElement("div", { key: m.id, style: {
                            alignSelf: m.sender_role === "teacher" ? "flex-end" : "flex-start",
                            maxWidth: "75%", background: m.sender_role === "teacher" ? "#EFF6FF" : "#F1F5F9",
                            border: `1px solid ${m.sender_role === "teacher" ? "#DBEAFE" : "#E2E8F0"}`,
                            borderRadius: 10, padding: "8px 12px",
                        } },
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: m.sender_role === "teacher" ? "#2563EB" : "#334155", marginBottom: 3 } }, m.sender_role === "teacher" ? "شما" : (m.sender_name || "دانش‌آموز")),
                        React.createElement("div", { style: { fontSize: 13, color: "#334155", whiteSpace: "pre-wrap" } }, m.text),
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 3 } },
                            React.createElement("span", { style: { fontSize: 10.5, color: "#94A3B8" } }, new Date(m.created_at).toLocaleString("fa-IR")),
                            m.sender_role === "teacher" && (React.createElement("span", { style: { fontSize: 10.5, color: "#94A3B8" } },
                                "\u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647 \u062A\u0648\u0633\u0637 ",
                                (m.seen_by || []).length,
                                " \u0627\u0632 ",
                                classRoster.length,
                                " \u0646\u0641\u0631")),
                            m.reactions && Object.keys(m.reactions).length > 0 && (React.createElement("span", { style: { fontSize: 12 } }, Object.values(m.reactions).join(" "))))))),
                    React.createElement("div", { ref: bottomRef })),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement(TextInput, { value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                            send(); }, placeholder: "\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633...", style: { flex: 1 } }),
                    React.createElement(Button, { onClick: send, disabled: sending || !text.trim() }, sending ? "..." : "ارسال")))))))));
}
/* ---------------------------------------------------------
   STUDENT PORTAL — a student enters their roster code to see
   their own exam results and any messages from the teacher.
   No teacher login required; reachable from the login screen.
--------------------------------------------------------- */
function StudentPortalScreen() {
    const [schoolCodeInput, setSchoolCodeInput] = useState("");
    const [codeInput, setCodeInput] = useState("");
    const [activeRoster, setActiveRoster] = useState(null);
    const [className, setClassName] = useState("");
    const [results, setResults] = useState([]);
    const [myMessages, setMyMessages] = useState([]);
    const [teacherName, setTeacherName] = useState("معلم");
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState("results"); // 'results' | 'messages' | 'chat'
    const lookup = async () => {
        const schoolCode = schoolCodeInput.trim();
        const code = codeInput.trim();
        if (!schoolCode || !code)
            return;
        setLoading(true);
        setNotFound(false);
        try {
            const r = await fetch(`/api/student-lookup?schoolCode=${encodeURIComponent(schoolCode)}&code=${encodeURIComponent(code)}`);
            const data = await r.json();
            if (r.ok && data.found) {
                setActiveRoster(data.roster);
                setClassName(data.className);
                setResults(data.results || []);
                setMyMessages(data.messages || []);
                setTeacherName(data.teacherName || "معلم");
            }
            else {
                setActiveRoster(null);
                setNotFound(true);
            }
        }
        catch {
            setActiveRoster(null);
            setNotFound(true);
        }
        setLoading(false);
    };
    if (!activeRoster) {
        return (React.createElement("div", { style: { flex: 1.15, padding: "44px 40px" } },
            React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u067E\u0631\u062A\u0627\u0644 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC"),
            React.createElement("div", { style: { fontSize: 13, color: "#64748B", marginBottom: 26 } }, "\u062F\u0648 \u06A9\u062F\u06CC \u06A9\u0647 \u0645\u0639\u0644\u0645\u062A \u0628\u0647 \u062A\u0648 \u062F\u0627\u062F\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u0646\u0645\u0631\u0627\u062A \u0648 \u067E\u06CC\u0627\u0645\u200C\u0647\u0627\u06CC \u062E\u0648\u062F\u062A \u0631\u0627 \u0628\u0628\u06CC\u0646\u06CC."),
            React.createElement(Field, { label: "\u06A9\u062F \u0645\u062F\u0631\u0633\u0647" },
                React.createElement(TextInput, { value: schoolCodeInput, onChange: (e) => setSchoolCodeInput(e.target.value.toUpperCase()), onKeyDown: (e) => e.key === "Enter" && lookup(), placeholder: "\u06A9\u062F \u0645\u062F\u0631\u0633\u0647 \u06CC\u0627 \u0645\u0639\u0644\u0645", style: { fontSize: 18, letterSpacing: 3, textAlign: "center", fontWeight: 700 }, maxLength: 10 })),
            React.createElement(Field, { label: "\u06A9\u062F \u0634\u062E\u0635\u06CC" },
                React.createElement(TextInput, { value: codeInput, onChange: (e) => setCodeInput(e.target.value.replace(/\D/g, "")), onKeyDown: (e) => e.key === "Enter" && lookup(), placeholder: "\u06A9\u062F \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646", style: { fontSize: 18, letterSpacing: 3, textAlign: "center", fontWeight: 700 }, maxLength: 6 })),
            notFound && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, "\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0627\u0632 \u0645\u0639\u0644\u0645 \u062E\u0648\u062F \u0628\u067E\u0631\u0633."),
            React.createElement(Button, { type: "button", onClick: lookup, disabled: loading, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 } }, loading ? "در حال جستجو..." : "ورود")));
    }
    return (React.createElement("div", { style: { flex: 1.15, padding: "44px 40px", maxHeight: "80vh", overflowY: "auto" } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 } },
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#1E293B" } }, activeRoster.fullname),
                React.createElement("div", { style: { fontSize: 13, color: "#64748B" } },
                    "\u06A9\u0644\u0627\u0633: ",
                    className)),
            React.createElement("span", { onClick: () => { setActiveRoster(null); setCodeInput(""); setSchoolCodeInput(""); }, style: { fontSize: 12, color: "#2563EB", fontWeight: 700, cursor: "pointer" } }, "\u062E\u0631\u0648\u062C")),
        React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 20, borderBottom: "1px solid #EEF1F6" } }, [
            { key: "results", label: "نمرات" },
            { key: "messages", label: "پیام‌ها" },
            { key: "chat", label: "💬 گفتگو با معلم" },
        ].map((t) => (React.createElement("div", { key: t.key, onClick: () => setTab(t.key), style: {
                padding: "8px 4px", marginBottom: -1, cursor: "pointer", fontSize: 13.5, fontWeight: 700,
                color: tab === t.key ? "#2563EB" : "#94A3B8",
                borderBottom: tab === t.key ? "2px solid #2563EB" : "2px solid transparent",
            } }, t.label)))),
        tab === "results" && (results.length === 0 ? (React.createElement("div", { style: { fontSize: 13, color: "#94A3B8" } }, "\u0647\u0646\u0648\u0632 \u062F\u0631 \u0622\u0632\u0645\u0648\u0646\u06CC \u0634\u0631\u06A9\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC.")) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, results.map((r) => (React.createElement("div", { key: r.examId, style: { border: "1px solid #EEF1F6", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B" } }, r.title),
                React.createElement("div", { style: { fontSize: 11, color: "#94A3B8" } }, r.date ? new Date(r.date).toLocaleDateString("fa-IR") : "—")),
            React.createElement("div", { style: { textAlign: "left" } },
                React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: r.pct >= 50 ? "#16A34A" : "#DC2626" } },
                    r.pct,
                    "%"),
                r.pendingCount > 0 && React.createElement("div", { style: { fontSize: 10, color: "#D97706" } }, "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0635\u062D\u06CC\u062D")))))))),
        tab === "messages" && (myMessages.length === 0 ? (React.createElement("div", { style: { fontSize: 13, color: "#94A3B8" } }, "\u067E\u06CC\u0627\u0645\u06CC \u0628\u0631\u0627\u06CC \u062A\u0648 \u062B\u0628\u062A \u0646\u0634\u062F\u0647.")) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, myMessages.map((m) => (React.createElement("div", { key: m.id, style: { background: "#F8FAFC", borderRadius: 10, padding: "10px 14px" } },
            React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: m.sender === "admin" ? "#7C3AED" : "#2563EB", marginBottom: 4 } }, m.sender === "admin" ? "🏫 مدیر مدرسه" : teacherName),
            React.createElement("div", { style: { fontSize: 13, color: "#334155", whiteSpace: "pre-wrap", marginBottom: 4 } }, m.text),
            React.createElement("div", { style: { fontSize: 11, color: "#94A3B8" } }, new Date(m.created_at).toLocaleString("fa-IR")))))))),
        tab === "chat" && (React.createElement(StudentClassChat, { schoolCode: schoolCodeInput, code: codeInput, teacherName: teacherName, myRosterId: activeRoster.id, myName: activeRoster.fullname }))));
}
/* ---------------------------------------------------------
   STUDENT-SIDE live chat panel — polls the public chat endpoint
   every few seconds while open; input is hidden (replaced by
   quick reactions) when the teacher has switched the class to
   channel/broadcast mode.
--------------------------------------------------------- */
function StudentClassChat({ schoolCode, code, teacherName, myRosterId, myName }) {
    const [msgs, setMsgs] = useState([]);
    const [mode, setMode] = useState("open");
    const [allowed, setAllowed] = useState(true);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const bottomRef = useRef(null);
    const load = async () => {
        try {
            const r = await fetch(`/api/student-chat?schoolCode=${encodeURIComponent(schoolCode)}&code=${encodeURIComponent(code)}`);
            const data = await r.json();
            if (data.found) {
                setAllowed(data.classChatAllowed !== false);
                setMsgs(data.messages || []);
                setMode(data.mode || "open");
            }
        }
        catch { /* اتصال موقتاً قطع بود — دور بعدی دوباره تلاش می‌شود */ }
    };
    useEffect(() => {
        load();
        const interval = setInterval(load, 4000);
        return () => clearInterval(interval);
    }, [schoolCode, code]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: "nearest" });
    }, [msgs.length]);
    const send = async () => {
        if (!text.trim())
            return;
        setSending(true);
        setError("");
        try {
            const r = await fetch("/api/student-chat-send", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ schoolCode, code, text: text.trim() }),
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setError(data.error || "ارسال ناموفق بود");
            }
            else {
                setText("");
                if (data.message)
                    setMsgs((prev) => [...prev, data.message]); // فوری نشون بده، منتظر دور بعدی poll نمون
            }
            await load();
        }
        catch {
            setError("اتصال برقرار نشد");
        }
        setSending(false);
    };
    const react = async (messageId, emoji) => {
        setMsgs((prev) => prev.map((m) => {
            if (m.id !== messageId)
                return m;
            const reactions = { ...(m.reactions || {}) };
            if (reactions[myRosterId] === emoji)
                delete reactions[myRosterId];
            else
                reactions[myRosterId] = emoji;
            return { ...m, reactions };
        }));
        try {
            await fetch("/api/student-chat-react", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ schoolCode, code, messageId, emoji }),
            });
            await load();
        }
        catch { /* بی‌خطر — دفعه‌ی بعدی sync دوباره امتحان می‌شود */ }
    };
    const REACTION_SET = ["👍", "❤️", "😂", "😮", "😢"];
    if (!allowed) {
        return (React.createElement("div", { style: { border: "1px solid #EEF1F6", borderRadius: 12, padding: 24, textAlign: "center", color: "#94A3B8", fontSize: 13 } }, "\u0627\u06CC\u0646 \u0642\u0627\u0628\u0644\u06CC\u062A \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u06A9\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u0646\u06CC\u0633\u062A."));
    }
    return (React.createElement("div", { style: { display: "flex", flexDirection: "column", height: 440, border: "1px solid #EEF1F6", borderRadius: 12, overflow: "hidden" } },
        mode !== "open" && (React.createElement("div", { style: { background: "#FEF3C7", color: "#B45309", fontSize: 12, fontWeight: 700, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 } },
            React.createElement(Megaphone, { size: 14 }),
            " \u0627\u06CC\u0646 \u0686\u062A \u0627\u0644\u0627\u0646 \u0641\u0642\u0637 \u0627\u0637\u0644\u0627\u0639\u200C\u0631\u0633\u0627\u0646\u06CC\u0647 \u2014 \u0645\u0639\u0644\u0645 \u0647\u0646\u0648\u0632 \u0627\u062C\u0627\u0632\u0647 \u0646\u062F\u0627\u062F\u0647 \u062C\u0648\u0627\u0628 \u0628\u062F\u06CC\u060C \u0648\u0644\u06CC \u0645\u06CC\u200C\u062A\u0648\u0646\u06CC \u0648\u0627\u06A9\u0646\u0634 \u0646\u0634\u0648\u0646 \u0628\u062F\u06CC.")),
        React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 8, background: "#F8FAFC" } },
            msgs.length === 0 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 12.5, textAlign: "center", marginTop: 20 } }, "\u0647\u0646\u0648\u0632 \u06AF\u0641\u062A\u06AF\u0648\u06CC\u06CC \u0634\u0631\u0648\u0639 \u0646\u0634\u062F\u0647. \u0633\u0644\u0627\u0645 \u06A9\u0646!")) : msgs.map((m) => {
                const isMine = m.sender_role === "student" && m.sender_roster_id === myRosterId;
                const myReaction = (m.reactions || {})[myRosterId] || "";
                return (React.createElement("div", { key: m.id, style: {
                        alignSelf: isMine ? "flex-end" : "flex-start", maxWidth: "78%",
                        background: isMine ? "#DBEAFE" : "#fff", border: `1px solid ${isMine ? "#BFDBFE" : "#EEF1F6"}`,
                        borderRadius: 10, padding: "8px 12px",
                    } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: isMine ? "#1D4ED8" : "#334155", marginBottom: 3 } }, m.sender_role === "teacher" ? teacherName : isMine ? "تو" : (m.sender_name || "دانش‌آموز")),
                    React.createElement("div", { style: { fontSize: 13, color: "#334155", whiteSpace: "pre-wrap" } }, m.text),
                    m.sender_role === "teacher" && (React.createElement("div", { style: { display: "flex", gap: 4, marginTop: 6 } }, REACTION_SET.map((e) => (React.createElement("span", { key: e, onClick: () => react(m.id, e), style: {
                            cursor: "pointer", fontSize: 13, padding: "1px 4px", borderRadius: 6,
                            background: myReaction === e ? "#FDE68A" : "transparent",
                        } }, e))))),
                    React.createElement("div", { style: { fontSize: 10, color: "#94A3B8", marginTop: 3 } }, new Date(m.created_at).toLocaleString("fa-IR"))));
            }),
            React.createElement("div", { ref: bottomRef })),
        mode === "open" ? (React.createElement("div", { style: { display: "flex", gap: 8, padding: 12, borderTop: "1px solid #EEF1F6", background: "#fff" } },
            React.createElement(TextInput, { value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                    send(); }, placeholder: "\u067E\u06CC\u0627\u0645\u062A \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633...", style: { flex: 1 } }),
            React.createElement(Button, { onClick: send, disabled: sending || !text.trim() }, sending ? "..." : "ارسال"))) : null,
        error && React.createElement("div", { style: { color: "#DC2626", fontSize: 12, padding: "0 14px 10px" } }, error)));
}
function SettingsScreen({ teacher, onUpdate, refresh, exams, students }) {
    const [fullname, setFullname] = useState(teacher.fullname);
    const [email, setEmail] = useState(teacher.email || "");
    const [saved, setSaved] = useState(false);
    const [importMsg, setImportMsg] = useState("");
    const [avatarUpdatedAt, setAvatarUpdatedAt] = useState(teacher.avatar_updated_at || null);
    const [avatarBusy, setAvatarBusy] = useState(false);
    const [avatarError, setAvatarError] = useState("");
    const uploadAvatar = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file)
            return;
        if (!file.type.startsWith("image/")) {
            setAvatarError("فقط فایل تصویر مجاز است.");
            return;
        }
        setAvatarError("");
        setAvatarBusy(true);
        try {
            const compressed = await compressImageToBlob(file, 250 * 1024, 512);
            const r = await fetch("/api/upload-profile-photo", {
                method: "POST",
                headers: authHeaders({ "Content-Type": "image/jpeg" }),
                body: compressed,
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setAvatarError(data.error || "آپلود عکس ناموفق بود");
            }
            else {
                setAvatarUpdatedAt(data.updated_at);
                onUpdate({ ...teacher, avatar_updated_at: data.updated_at });
            }
        }
        catch {
            setAvatarError("اتصال برقرار نشد");
        }
        setAvatarBusy(false);
    };
    const removeAvatar = async () => {
        setAvatarBusy(true);
        setAvatarError("");
        try {
            const r = await fetch("/api/profile-photo", { method: "DELETE", headers: authHeaders() });
            if (r.ok) {
                setAvatarUpdatedAt(null);
                const updated = { ...teacher };
                delete updated.avatar_updated_at;
                onUpdate(updated);
            }
            else {
                setAvatarError("حذف عکس ناموفق بود");
            }
        }
        catch {
            setAvatarError("اتصال برقرار نشد");
        }
        setAvatarBusy(false);
    };
    const save = async () => {
        const updated = { ...teacher, fullname, email };
        await setJSON(`teacher:${teacher.username}`, updated);
        onUpdate(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };
    const [finishMessages, setFinishMessages] = useState((teacher.finish_messages && teacher.finish_messages.length > 0) ? teacher.finish_messages : DEFAULT_FINISH_MESSAGES);
    const [msgSaved, setMsgSaved] = useState(false);
    const updateMessageAt = (i, val) => {
        setFinishMessages((list) => list.map((m, idx) => (idx === i ? val : m)));
    };
    const addMessage = () => setFinishMessages((list) => [...list, ""]);
    const removeMessage = (i) => setFinishMessages((list) => list.filter((_, idx) => idx !== i));
    const saveMessages = async () => {
        const cleaned = finishMessages.map((m) => m.trim()).filter(Boolean);
        const list = cleaned.length > 0 ? cleaned : DEFAULT_FINISH_MESSAGES;
        const updated = { ...teacher, finish_messages: list };
        await setJSON(`teacher:${teacher.username}`, updated);
        onUpdate(updated);
        setFinishMessages(list);
        setMsgSaved(true);
        setTimeout(() => setMsgSaved(false), 2000);
    };
    const [curPw, setCurPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newPw2, setNewPw2] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwSaved, setPwSaved] = useState(false);
    const changePassword = async () => {
        setPwError("");
        setPwSaved(false);
        if (!curPw || !newPw || !newPw2) {
            setPwError("همه فیلدها را پر کنید.");
            return;
        }
        if (newPw.length < 8) {
            setPwError("رمز عبور جدید باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        if (newPw !== newPw2) {
            setPwError("رمز عبور جدید و تکرار آن یکسان نیستند.");
            return;
        }
        // رمز فعلی سمت سرور چک می‌شه (نه محلی) چون سرور از الان رمز رو نمکی‌شده
        // نگه می‌داره و دیگه قابل مقایسه‌ی مستقیم سمت کلاینت نیست.
        const curCheck = await fetch("/api/login", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: teacher.username, passwordHash: await hashPassword(curPw) }),
        }).then((r) => r.json()).catch(() => ({ ok: false }));
        if (!curCheck.ok) {
            setPwError("رمز عبور فعلی اشتباه است.");
            return;
        }
        await setJSON(`teacher:${teacher.username}`, { ...teacher, password: await hashPassword(newPw) });
        const fresh = await getJSON(`teacher:${teacher.username}`);
        saveSession(fresh.username, fresh.password, getAuthToken());
        onUpdate(fresh);
        setCurPw("");
        setNewPw("");
        setNewPw2("");
        setPwSaved(true);
        setTimeout(() => setPwSaved(false), 2500);
    };
    const exportBackup = async () => {
        // Scoped to this teacher's own data only — previously this pulled every
        // key in the whole KV namespace (all teachers' data, password hashes
        // included), which was fine when the app was single-teacher but is a
        // data leak now that multiple teachers share one school.
        const data = {};
        data[`teacher:${teacher.username}`] = teacher;
        const allExams = await loadAll("exam:");
        const myExams = allExams.filter((ex) => ex.teacher_id === teacher.username);
        const myExamIds = new Set(myExams.map((ex) => ex.id));
        myExams.forEach((ex) => { data[`exam:${ex.id}`] = ex; });
        const allQuestions = await loadAll("question:");
        allQuestions.filter((q) => myExamIds.has(q.exam_id)).forEach((q) => { data[`question:${q.id}`] = q; });
        const dashData = await loadTeacherDashboardData(); // از قبل روی سرور فقط دیتای همین معلمه
        const myStudents = dashData.students.filter((s) => s.teacher_id === teacher.username);
        myStudents.forEach((s) => { data[`student:${s.id}`] = s; });
        for (const s of myStudents) {
            const ans = await getJSON(`answers:${s.id}`);
            if (ans)
                data[`answers:${s.id}`] = ans;
        }
        downloadTextFile("edu-exam-backup.json", JSON.stringify(data, null, 2), "application/json");
    };
    const importBackup = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setImportMsg("در حال بازیابی...");
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            // Only restore keys that belong to this teacher — a teacher's backup
            // file should never be able to overwrite another teacher's or the
            // admin's data, even if the uploaded file contains such keys.
            const myExamIds = new Set(exams.filter((ex) => ex.teacher_id === teacher.username).map((ex) => ex.id));
            const myStudentIds = new Set(students.filter((s) => s.teacher_id === teacher.username).map((s) => s.id));
            let restored = 0;
            for (const k of Object.keys(data)) {
                const v = data[k];
                const isOwnTeacher = k === `teacher:${teacher.username}`;
                const isOwnExam = k.startsWith("exam:") && (v?.teacher_id === teacher.username || myExamIds.has(k.slice(5)));
                const isOwnQuestion = k.startsWith("question:") && v?.exam_id && (myExamIds.has(v.exam_id) || (data[`exam:${v.exam_id}`]?.teacher_id === teacher.username));
                const isOwnStudent = k.startsWith("student:") && (v?.teacher_id === teacher.username || myStudentIds.has(k.slice(8)));
                const isOwnAnswers = k.startsWith("answers:") && (myStudentIds.has(k.slice(8)) || (data[`student:${k.slice(8)}`]?.teacher_id === teacher.username));
                if (isOwnTeacher || isOwnExam || isOwnQuestion || isOwnStudent || isOwnAnswers) {
                    await setJSON(k, v);
                    restored++;
                }
            }
            await refresh();
            setImportMsg(restored > 0 ? `${restored} مورد با موفقیت بازیابی شد.` : "این فایل شامل داده‌ی مربوط به حساب تو نبود.");
        }
        catch {
            setImportMsg("فایل نامعتبر است.");
        }
        e.target.value = "";
    };
    const [loginCodeBusy, setLoginCodeBusy] = useState(false);
    const regenerateLoginCode = async () => {
        if (!window.confirm("کد ورود فعلی از کار می‌افتد و باید کد جدید به دانش‌آموزهایت اطلاع داده شود. ادامه می‌دهید؟"))
            return;
        setLoginCodeBusy(true);
        const { login_code, ...rest } = teacher;
        const result = await setJSONReturn(`teacher:${teacher.username}`, rest);
        if (result.ok && result.v)
            onUpdate(result.v);
        setLoginCodeBusy(false);
    };
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px" } },
        React.createElement(TopBar, { title: "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 } },
            React.createElement(Avatar, { username: teacher.username, name: teacher.fullname, updatedAt: avatarUpdatedAt, size: 64 }),
            React.createElement("div", null,
                React.createElement("label", { style: {
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
                        fontSize: 13, fontWeight: 700, cursor: avatarBusy ? "default" : "pointer", background: "#fff", color: "#334155",
                        border: "1.5px solid #E2E8F0", opacity: avatarBusy ? 0.6 : 1, marginLeft: 8,
                    } },
                    avatarBusy ? "در حال آپلود..." : "تغییر عکس پروفایل",
                    React.createElement("input", { type: "file", accept: "image/*", onChange: uploadAvatar, disabled: avatarBusy, style: { display: "none" } })),
                avatarUpdatedAt && (React.createElement(Button, { variant: "ghost", onClick: removeAvatar, disabled: avatarBusy, style: { fontSize: 13, padding: "8px 12px" } }, "\u062D\u0630\u0641 \u0639\u06A9\u0633")),
                avatarError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12.5, marginTop: 6 } }, avatarError))),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20 } },
            React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" },
                React.createElement(TextInput, { value: teacher.username, disabled: true, style: { background: "#F8FAFC", color: "#94A3B8" } })),
            React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC" },
                React.createElement(TextInput, { value: fullname, onChange: (e) => setFullname(e.target.value) })),
            React.createElement(Field, { label: "\u0627\u06CC\u0645\u06CC\u0644 (\u0628\u0631\u0627\u06CC \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631)" },
                React.createElement(TextInput, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "\u0627\u06CC\u0645\u06CC\u0644" })),
            React.createElement(Button, { onClick: save },
                React.createElement(Check, { size: 16 }),
                "\u0630\u062E\u06CC\u0631\u0647 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A"),
            saved && React.createElement("div", { style: { color: "#16A34A", fontSize: 13, marginTop: 10 } }, "\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.")),
        !teacher.school_id && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u06A9\u062F \u0648\u0631\u0648\u062F \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646"),
            React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 16 } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0647\u0627\u06CC\u062A \u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F \u0628\u0647 \u067E\u0631\u062A\u0627\u0644 \u06CC\u0627 \u0686\u062A \u06A9\u0644\u0627\u0633\u06CC\u060C \u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0647\u0645\u0631\u0627\u0647 \u0628\u0627 \u06A9\u062F \u0634\u062E\u0635\u06CC \u062E\u0648\u062F\u0634\u0627\u0646 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u06A9\u0646\u0646\u062F."),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
                React.createElement("span", { style: { fontFamily: "monospace", fontSize: 20, fontWeight: 800, color: "#2563EB", letterSpacing: 3, background: "#EFF6FF", padding: "8px 16px", borderRadius: 10 } }, teacher.login_code || "—"),
                React.createElement("span", { onClick: loginCodeBusy ? undefined : regenerateLoginCode, style: { fontSize: 12, color: loginCodeBusy ? "#94A3B8" : "#DC2626", fontWeight: 700, cursor: loginCodeBusy ? "default" : "pointer" } }, loginCodeBusy ? "در حال ساخت..." : "کد جدید")))),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 16 } }, "\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631"),
            React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0641\u0639\u0644\u06CC" },
                React.createElement(TextInput, { type: "password", value: curPw, onChange: (e) => setCurPw(e.target.value), placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0641\u0639\u0644\u06CC" })),
            React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" },
                React.createElement(TextInput, { type: "password", value: newPw, onChange: (e) => setNewPw(e.target.value), placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" })),
            React.createElement(Field, { label: "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" },
                React.createElement(TextInput, { type: "password", value: newPw2, onChange: (e) => setNewPw2(e.target.value), placeholder: "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" })),
            pwError && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 10 } }, pwError),
            React.createElement(Button, { onClick: changePassword },
                React.createElement(Check, { size: 16 }),
                "\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631"),
            pwSaved && React.createElement("div", { style: { color: "#16A34A", fontSize: 13, marginTop: 10 } }, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F.")),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u067E\u06CC\u0627\u0645\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646 \u0622\u0632\u0645\u0648\u0646"),
            React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 16 } }, "\u0628\u0639\u062F \u0627\u0632 \u062B\u0628\u062A \u0622\u0632\u0645\u0648\u0646 \u062A\u0648\u0633\u0637 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u060C \u06CC\u06A9\u06CC \u0627\u0632 \u0627\u06CC\u0646 \u067E\u06CC\u0627\u0645\u200C\u0647\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062A\u0635\u0627\u062F\u0641\u06CC \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 } }, finishMessages.map((m, i) => (React.createElement("div", { key: i, style: { display: "flex", gap: 8, alignItems: "center" } },
                React.createElement(TextInput, { value: m, onChange: (e) => updateMessageAt(i, e.target.value), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0645\u0648\u0641\u0642 \u0628\u0627\u0634\u06CC!", style: { flex: 1 } }),
                React.createElement("div", { onClick: () => removeMessage(i), style: { cursor: "pointer", color: "#DC2626", fontSize: 20, padding: "0 6px", lineHeight: 1 } }, "\u00D7"))))),
            React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } },
                React.createElement(Button, { variant: "ghost", onClick: addMessage },
                    React.createElement(Plus, { size: 15 }),
                    "\u0627\u0641\u0632\u0648\u062F\u0646 \u067E\u06CC\u0627\u0645"),
                React.createElement(Button, { onClick: saveMessages },
                    React.createElement(Check, { size: 16 }),
                    "\u0630\u062E\u06CC\u0631\u0647 \u067E\u06CC\u0627\u0645\u200C\u0647\u0627")),
            msgSaved && React.createElement("div", { style: { color: "#16A34A", fontSize: 13, marginTop: 10 } }, "\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.")),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0627\u0632 \u062F\u0627\u062F\u0647\u200C\u0647\u0627"),
            React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 16 } }, "\u06CC\u06A9 \u0646\u0633\u062E\u0647 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0627\u0632 \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u060C \u0633\u0648\u0627\u0644\u0627\u062A \u0648 \u0646\u062A\u0627\u06CC\u062C \u062E\u0648\u062F\u062A (\u0646\u0647 \u06A9\u0644 \u0645\u062F\u0631\u0633\u0647) \u0645\u06CC\u200C\u06AF\u06CC\u0631\u0647."),
            React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } },
                React.createElement(Button, { variant: "ghost", onClick: exportBackup },
                    React.createElement(Download, { size: 15 }),
                    "\u062F\u0627\u0646\u0644\u0648\u062F \u0641\u0627\u06CC\u0644 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646"),
                React.createElement("label", { style: {
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10,
                        fontSize: 14, fontWeight: 700, cursor: "pointer", background: "#fff", color: "#334155", border: "1.5px solid #E2E8F0",
                    } },
                    "\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0627\u0632 \u0641\u0627\u06CC\u0644",
                    React.createElement("input", { type: "file", accept: "application/json", onChange: importBackup, style: { display: "none" } }))),
            importMsg && React.createElement("div", { style: { fontSize: 13, color: "#2563EB", marginTop: 10 } }, importMsg))));
}
/* ---------------------------------------------------------
   ROOT APP
--------------------------------------------------------- */

/* ===== screens-admin.js ===== */
"use strict";
/* ---------------------------------------------------------
   ADMIN DASHBOARD (school-wide, multi-teacher)
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
function CreateTeacherForm({ onCreated, existingUsernames, schoolId }) {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        setError("");
        if (!fullname || !username || !password || !email) {
            setError("همه فیلدها را پر کنید.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("ایمیل معتبر نیست.");
            return;
        }
        if (password.length < 8) {
            setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        if (existingUsernames.includes(username.trim())) {
            setError("این نام کاربری قبلاً استفاده شده است.");
            return;
        }
        setLoading(true);
        const existing = await getJSON(`teacher:${username}`);
        if (existing) {
            setLoading(false);
            setError("این نام کاربری قبلاً ثبت شده است.");
            return;
        }
        const teacher = {
            username: username.trim(),
            password: await hashPassword(password),
            fullname: fullname.trim(),
            email: email.trim(),
            role: "teacher",
            school_id: schoolId,
            created_at: new Date().toISOString(),
        };
        await setJSON(`teacher:${teacher.username}`, teacher);
        const emailResult = await sendWelcomeEmail({ username: teacher.username, fullname: teacher.fullname, email: teacher.email, role: "teacher" });
        setLoading(false);
        onCreated(teacher, emailResult);
    };
    const handleKeyDown = (e) => { if (e.key === "Enter")
        submit(); };
    return (React.createElement("div", null,
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0645\u0639\u0644\u0645" },
            React.createElement(TextInput, { value: fullname, onChange: (e) => setFullname(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0632\u0647\u0631\u0627 \u0627\u062D\u0645\u062F\u06CC" })),
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" },
            React.createElement(TextInput, { value: username, onChange: (e) => setUsername(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u06CC\u06A9 \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u06CC\u06A9\u062A\u0627" })),
        React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0648\u0644\u06CC\u0647" },
            React.createElement(TextInput, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631" })),
        React.createElement(Field, { label: "\u0627\u06CC\u0645\u06CC\u0644" },
            React.createElement(TextInput, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0628\u0631\u0627\u06CC \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0645\u0639\u0644\u0645 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F" })),
        error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
        React.createElement(Button, { type: "button", onClick: submit, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: loading }, loading ? "در حال ساخت..." : "ساخت حساب معلم")));
}
function EditTeacherForm({ teacher, onSaved }) {
    const [fullname, setFullname] = useState(teacher.fullname);
    const [email, setEmail] = useState(teacher.email || "");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [active, setActive] = useState(teacher.active !== false);
    const submit = async () => {
        setError("");
        setSaved(false);
        if (!fullname || !email) {
            setError("نام و ایمیل نباید خالی باشند.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("ایمیل معتبر نیست.");
            return;
        }
        if (newPassword && newPassword.length < 8) {
            setError("رمز عبور جدید باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        setLoading(true);
        const updated = { ...teacher, fullname: fullname.trim(), email: email.trim(), active };
        if (newPassword)
            updated.password = await hashPassword(newPassword);
        await setJSON(`teacher:${teacher.username}`, updated);
        setLoading(false);
        setNewPassword("");
        setSaved(true);
        onSaved(updated);
    };
    const handleKeyDown = (e) => { if (e.key === "Enter")
        submit(); };
    return (React.createElement("div", null,
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" },
            React.createElement(TextInput, { value: teacher.username, disabled: true, style: { background: "#F8FAFC", color: "#94A3B8" } })),
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC" },
            React.createElement(TextInput, { value: fullname, onChange: (e) => setFullname(e.target.value), onKeyDown: handleKeyDown })),
        React.createElement(Field, { label: "\u0627\u06CC\u0645\u06CC\u0644" },
            React.createElement(TextInput, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: handleKeyDown })),
        React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" },
            React.createElement(TextInput, { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0628\u0631\u0627\u06CC \u062A\u063A\u06CC\u06CC\u0631 \u0646\u062F\u0627\u062F\u0646\u060C \u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC\u062F" })),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 } },
            React.createElement("input", { type: "checkbox", id: "teacher-active-toggle", checked: active, onChange: (e) => setActive(e.target.checked), style: { width: 16, height: 16 } }),
            React.createElement("label", { htmlFor: "teacher-active-toggle", style: { fontSize: 12.5, color: "#334155", lineHeight: 1.7 } }, "\u062D\u0633\u0627\u0628 \u0641\u0639\u0627\u0644 \u0627\u0633\u062A \u2014 \u0627\u06AF\u0647 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0628\u0634\u0647\u060C \u0627\u06CC\u0646 \u0645\u0639\u0644\u0645 \u062F\u06CC\u06AF\u0647 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0647 \u0648\u0627\u0631\u062F \u0628\u0634\u0647 (\u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u060C \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627 \u0648 \u0646\u062A\u0627\u06CC\u062C\u0634 \u062F\u0633\u062A\u200C\u0646\u062E\u0648\u0631\u062F\u0647 \u0645\u06CC\u200C\u0645\u0648\u0646\u0647)")),
        error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
        saved && React.createElement("div", { style: { color: "#16A34A", fontSize: 13, marginBottom: 14 } }, "\u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F."),
        React.createElement(Button, { type: "button", onClick: submit, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: loading }, loading ? "در حال ذخیره..." : "ذخیره تغییرات")));
}
function AdminProfileModal({ teacher, onSaved, onClose }) {
    const [fullname, setFullname] = useState(teacher.fullname);
    const [email, setEmail] = useState(teacher.email || "");
    const [curPw, setCurPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newPw2, setNewPw2] = useState("");
    const [error, setError] = useState("");
    const [pwError, setPwError] = useState("");
    const [loading, setLoading] = useState(false);
    const [pwLoading, setPwLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [pwSaved, setPwSaved] = useState(false);
    const [avatarUpdatedAt, setAvatarUpdatedAt] = useState(teacher.avatar_updated_at || null);
    const [avatarBusy, setAvatarBusy] = useState(false);
    const [avatarError, setAvatarError] = useState("");
    const [showPwSection, setShowPwSection] = useState(false);
    const uploadAvatar = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file)
            return;
        if (!file.type.startsWith("image/")) {
            setAvatarError("فقط فایل تصویر مجاز است.");
            return;
        }
        setAvatarError("");
        setAvatarBusy(true);
        try {
            const compressed = await compressImageToBlob(file, 250 * 1024, 512);
            const r = await fetch("/api/upload-profile-photo", {
                method: "POST",
                headers: authHeaders({ "Content-Type": "image/jpeg" }),
                body: compressed,
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setAvatarError(data.error || "آپلود عکس ناموفق بود");
            }
            else {
                setAvatarUpdatedAt(data.updated_at);
                const updated = { ...teacher, avatar_updated_at: data.updated_at };
                onSaved(updated);
            }
        }
        catch {
            setAvatarError("اتصال برقرار نشد");
        }
        setAvatarBusy(false);
    };
    const removeAvatar = async () => {
        setAvatarBusy(true);
        setAvatarError("");
        try {
            const r = await fetch("/api/profile-photo", { method: "DELETE", headers: authHeaders() });
            if (r.ok) {
                setAvatarUpdatedAt(null);
                const updated = { ...teacher };
                delete updated.avatar_updated_at;
                onSaved(updated);
            }
            else {
                setAvatarError("حذف عکس ناموفق بود");
            }
        }
        catch {
            setAvatarError("اتصال برقرار نشد");
        }
        setAvatarBusy(false);
    };
    const saveProfile = async () => {
        setError("");
        setSaved(false);
        if (!fullname || !email) {
            setError("نام و ایمیل نباید خالی باشند.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("ایمیل معتبر نیست.");
            return;
        }
        setLoading(true);
        const updated = { ...teacher, fullname: fullname.trim(), email: email.trim() };
        await setJSON(`teacher:${teacher.username}`, updated);
        setLoading(false);
        setSaved(true);
        onSaved(updated);
    };
    const changePassword = async () => {
        setPwError("");
        setPwSaved(false);
        if (!curPw || !newPw || !newPw2) {
            setPwError("همه فیلدها را پر کنید.");
            return;
        }
        if (newPw.length < 8) {
            setPwError("رمز عبور جدید باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        if (newPw !== newPw2) {
            setPwError("رمز عبور جدید و تکرار آن یکسان نیستند.");
            return;
        }
        setPwLoading(true);
        // رمز فعلی سمت سرور چک می‌شه (نه محلی) چون سرور از الان رمز رو نمکی‌شده
        // نگه می‌داره و دیگه قابل مقایسه‌ی مستقیم سمت کلاینت نیست.
        const curCheck = await fetch("/api/login", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: teacher.username, passwordHash: await hashPassword(curPw) }),
        }).then((r) => r.json()).catch(() => ({ ok: false }));
        if (!curCheck.ok) {
            setPwLoading(false);
            setPwError("رمز عبور فعلی اشتباه است.");
            return;
        }
        await setJSON(`teacher:${teacher.username}`, { ...teacher, password: await hashPassword(newPw) });
        const fresh = await getJSON(`teacher:${teacher.username}`);
        saveSession(fresh.username, fresh.password, getAuthToken());
        setPwLoading(false);
        setCurPw("");
        setNewPw("");
        setNewPw2("");
        setPwSaved(true);
        onSaved(fresh);
    };
    return (React.createElement(Modal, { title: "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0633\u0627\u0628 \u0645\u062F\u06CC\u0631", onClose: onClose },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 } },
            React.createElement(Avatar, { username: teacher.username, name: teacher.fullname, updatedAt: avatarUpdatedAt, size: 64 }),
            React.createElement("div", null,
                React.createElement("label", { style: {
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
                        fontSize: 13, fontWeight: 700, cursor: avatarBusy ? "default" : "pointer", background: "#fff", color: "#334155",
                        border: "1.5px solid #E2E8F0", opacity: avatarBusy ? 0.6 : 1, marginLeft: 8,
                    } },
                    avatarBusy ? "در حال آپلود..." : "تغییر عکس پروفایل",
                    React.createElement("input", { type: "file", accept: "image/*", onChange: uploadAvatar, disabled: avatarBusy, style: { display: "none" } })),
                avatarUpdatedAt && (React.createElement(Button, { variant: "ghost", onClick: removeAvatar, disabled: avatarBusy, style: { fontSize: 13, padding: "8px 12px" } }, "\u062D\u0630\u0641 \u0639\u06A9\u0633")),
                avatarError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12.5, marginTop: 6 } }, avatarError))),
        React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 12 } }, "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628"),
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" },
            React.createElement(TextInput, { value: teacher.username, disabled: true, style: { background: "#F8FAFC", color: "#94A3B8" } })),
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC" },
            React.createElement(TextInput, { value: fullname, onChange: (e) => setFullname(e.target.value) })),
        React.createElement(Field, { label: "\u0627\u06CC\u0645\u06CC\u0644" },
            React.createElement(TextInput, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })),
        error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
        saved && React.createElement("div", { style: { color: "#16A34A", fontSize: 13, marginBottom: 14 } }, "\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F."),
        React.createElement(Button, { type: "button", onClick: saveProfile, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15, marginBottom: 22 }, disabled: loading }, loading ? "در حال ذخیره..." : "ذخیره اطلاعات"),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18 } },
            React.createElement("div", { onClick: () => setShowPwSection((v) => !v), style: { display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: showPwSection ? 12 : 0 } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B" } }, "\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631"),
                React.createElement("span", { style: { fontSize: 12.5, color: "#2563EB", fontWeight: 700 } }, showPwSection ? "بستن" : "تغییر")),
            showPwSection && (React.createElement(React.Fragment, null,
                React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0641\u0639\u0644\u06CC" },
                    React.createElement(TextInput, { type: "password", value: curPw, onChange: (e) => setCurPw(e.target.value) })),
                React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" },
                    React.createElement(TextInput, { type: "password", value: newPw, onChange: (e) => setNewPw(e.target.value) })),
                React.createElement(Field, { label: "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F" },
                    React.createElement(TextInput, { type: "password", value: newPw2, onChange: (e) => setNewPw2(e.target.value) })),
                pwError && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, pwError),
                pwSaved && React.createElement("div", { style: { color: "#16A34A", fontSize: 13, marginBottom: 14 } }, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F."),
                React.createElement(Button, { type: "button", onClick: changePassword, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: pwLoading }, pwLoading ? "در حال ذخیره..." : "تغییر رمز عبور"))))));
}
function AdminRosterModal({ cls, roster, onClose, refresh, addLocalRoster, addLocalRosterMany, updateLocalRoster, removeLocalRoster, schoolId, groupLoginCode }) {
    const members = roster.filter((r) => r.class_id === cls.id);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [showBulk, setShowBulk] = useState(false);
    const [bulkText, setBulkText] = useState("");
    const [bulkSaving, setBulkSaving] = useState(false);
    const [bulkMsg, setBulkMsg] = useState("");
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [editName, setEditName] = useState("");
    const [savingEdit, setSavingEdit] = useState(false);
    const startEditMember = (m) => { setEditingMemberId(m.id); setEditName(m.fullname); };
    const cancelEditMember = () => { setEditingMemberId(null); setEditName(""); };
    const saveEditMember = async (m) => {
        if (!editName.trim() || editName.trim() === m.fullname) {
            cancelEditMember();
            return;
        }
        setSavingEdit(true);
        const updated = { ...m, fullname: editName.trim() };
        updateLocalRoster && updateLocalRoster(updated);
        await setJSON(`roster:${m.id}`, updated);
        setSavingEdit(false);
        cancelEditMember();
    };
    const addStudent = async () => {
        if (!name.trim())
            return;
        setSaving(true);
        const allCodes = roster.map((r) => r.code);
        const id = uid();
        const code = generateCode(allCodes);
        const record = {
            id, class_id: cls.id, teacher_id: classTeacherIds(cls)[0] || null, school_id: schoolId,
            fullname: name.trim(), code, created_at: new Date().toISOString(),
        };
        addLocalRoster && addLocalRoster(record);
        // سرور خودش یک بار دیگه یکتایی کد رو در کل مدرسه چک می‌کنه و در صورت
        // تصادف (مثلاً با کدِ یک کلاسِ معلمِ دیگه) عوضش می‌کنه — مقدار نهایی رو
        // از پاسخ سرور می‌گیریم.
        const result = await setJSONReturn(`roster:${id}`, record);
        if (result.ok && result.v && result.v.code !== code) {
            updateLocalRoster && updateLocalRoster(result.v);
        }
        setSaving(false);
        setName("");
    };
    const addBulkStudents = async () => {
        const names = bulkText.split(/[\n,]/).map((n) => n.trim()).filter(Boolean);
        if (names.length === 0) {
            setBulkMsg("نامی برای افزودن پیدا نشد.");
            return;
        }
        setBulkSaving(true);
        const existingNames = new Set(members.map((m) => m.fullname.trim()));
        const usedCodes = roster.map((r) => r.code);
        let added = 0, skipped = 0;
        const newRecords = [];
        for (const n of names) {
            if (existingNames.has(n)) {
                skipped++;
                continue;
            }
            existingNames.add(n);
            const id = uid();
            const code = generateCode(usedCodes);
            usedCodes.push(code);
            const record = {
                id, class_id: cls.id, teacher_id: classTeacherIds(cls)[0] || null, school_id: schoolId,
                fullname: n, code, created_at: new Date().toISOString(),
            };
            const result = await setJSONReturn(`roster:${id}`, record);
            newRecords.push(result.ok && result.v ? result.v : record);
            if (result.ok && result.v)
                usedCodes.push(result.v.code);
            added++;
        }
        if (newRecords.length > 0)
            addLocalRosterMany && addLocalRosterMany(newRecords);
        setBulkSaving(false);
        setBulkMsg(`${added} دانش‌آموز اضافه شد${skipped > 0 ? ` — ${skipped} مورد تکراری نادیده گرفته شد.` : "."}`);
        if (added > 0)
            setBulkText("");
    };
    // آپلود فایل اکسل: فقط ستون اول شیت اول رو می‌خونه (اسم دانش‌آموز)،
    // ردیف اول رو اگه شبیه هدر بود (مثلاً «نام») نادیده می‌گیره، و بقیه رو
    // توی همون textarea گروهی می‌ریزه تا معلم قبل از ثبت نهایی مرورش کنه.
    const [excelMsg, setExcelMsg] = useState("");
    const handleExcelFile = async (e) => {
        const file = e.target.files && e.target.files[0];
        e.target.value = "";
        if (!file)
            return;
        setExcelMsg("در حال خواندن فایل...");
        try {
            const buf = await file.arrayBuffer();
            const wb = XLSX.read(buf, { type: "array" });
            const firstSheet = wb.Sheets[wb.SheetNames[0]];
            const grid = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            let names = grid.map((row) => String(row[0] ?? "").trim()).filter(Boolean);
            if (names.length && /^(نام|name|fullname|نام دانش.آموز)$/i.test(names[0]))
                names = names.slice(1);
            if (names.length === 0) {
                setExcelMsg("هیچ نامی توی فایل پیدا نشد.");
                return;
            }
            setBulkText((prev) => (prev.trim() ? prev.trim() + "\n" + names.join("\n") : names.join("\n")));
            setExcelMsg(`${names.length} نام از فایل خونده شد — قبل از «افزودن همه» مرورشون کن.`);
        }
        catch (err) {
            setExcelMsg("خواندن فایل اکسل با خطا مواجه شد. مطمئن شو فایل .xlsx یا .csv سالم است.");
        }
    };
    const regenerateCodeFor = async (member) => {
        const allCodes = roster.filter((r) => r.id !== member.id).map((r) => r.code);
        const code = generateCode(allCodes);
        const updated = { ...member, code };
        updateLocalRoster && updateLocalRoster(updated);
        const result = await setJSONReturn(`roster:${member.id}`, updated);
        if (result.ok && result.v && result.v.code !== code) {
            updateLocalRoster && updateLocalRoster(result.v);
        }
    };
    const removeStudent = async (member) => {
        if (!window.confirm(`«${member.fullname}» از این کلاس حذف شود؟`))
            return;
        removeLocalRoster && removeLocalRoster(member.id);
        await deleteKey(`roster:${member.id}`);
    };
    return (React.createElement(Modal, { title: `دانش‌آموزان — ${cls.name}`, onClose: onClose },
        groupLoginCode && (React.createElement("div", { style: { background: "#EFF6FF", borderRadius: 10, border: "1px solid #BFDBFE", padding: "10px 12px", marginBottom: 14, fontSize: 12, color: "#1E3A8A", display: "flex", alignItems: "center", gap: 8 } },
            "\u06A9\u062F \u0645\u062F\u0631\u0633\u0647 (\u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0647\u0627):",
            React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 800, letterSpacing: 2 } }, groupLoginCode))),
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B" } }, "\u0627\u0641\u0632\u0648\u062F\u0646 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632"),
            React.createElement("span", { onClick: () => setShowBulk((s) => !s), style: { fontSize: 12, color: "#2563EB", fontWeight: 700, cursor: "pointer" } }, showBulk ? "افزودن تکی" : "افزودن گروهی")),
        showBulk ? (React.createElement("div", { style: { marginBottom: 18 } },
            React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 10, lineHeight: 1.8 } }, "\u0627\u0633\u0645 \u0647\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0631\u0627 \u062F\u0631 \u06CC\u06A9 \u062E\u0637 \u062C\u062F\u0627 \u0628\u0646\u0648\u06CC\u0633\u06CC\u062F (\u06CC\u0627 \u0628\u0627 \u0648\u06CC\u0631\u06AF\u0648\u0644 \u062C\u062F\u0627 \u06A9\u0646\u06CC\u062F)\u060C \u06CC\u0627 \u0627\u0632 \u0641\u0627\u06CC\u0644 \u0627\u06A9\u0633\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646\u06CC\u062F."),
            React.createElement("label", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#2563EB", fontWeight: 700, cursor: "pointer", marginBottom: 10 } },
                React.createElement(Upload, { size: 14 }),
                "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0646\u0627\u0645\u200C\u0647\u0627 \u0627\u0632 \u0641\u0627\u06CC\u0644 \u0627\u06A9\u0633\u0644 (.xlsx / .csv)",
                React.createElement("input", { type: "file", accept: ".xlsx,.xls,.csv", onChange: handleExcelFile, style: { display: "none" } })),
            excelMsg && React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 10 } }, excelMsg),
            React.createElement("textarea", { value: bulkText, onChange: (e) => setBulkText(e.target.value), rows: 6, placeholder: "علی رضایی\nمریم احمدی\n...", style: { ...inputStyle, resize: "vertical", fontFamily: "inherit", marginBottom: 10 } }),
            bulkMsg && React.createElement("div", { style: { fontSize: 12, color: "#2563EB", marginBottom: 10 } }, bulkMsg),
            React.createElement(Button, { type: "button", onClick: addBulkStudents, disabled: bulkSaving, style: { width: "100%", justifyContent: "center" } },
                React.createElement(Plus, { size: 16 }),
                bulkSaving ? "در حال افزودن..." : "افزودن همه"))) : (React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18 } },
            React.createElement(TextInput, { value: name, onChange: (e) => setName(e.target.value), placeholder: "\u0646\u0627\u0645 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632", onKeyDown: (e) => e.key === "Enter" && addStudent() }),
            React.createElement(Button, { type: "button", onClick: addStudent, disabled: saving },
                React.createElement(Plus, { size: 16 }),
                saving ? "..." : "افزودن"))),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 14, maxHeight: 320, overflowY: "auto" } }, members.length === 0 ? (React.createElement("div", { style: { fontSize: 13, color: "#94A3B8", textAlign: "center", padding: "16px 0" } }, "\u0647\u0646\u0648\u0632 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u0627\u0636\u0627\u0641\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.")) : (members.map((m) => (React.createElement("div", { key: m.id, style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 4px", borderBottom: "1px solid #F5F7FA", gap: 8 } },
            editingMemberId === m.id ? (React.createElement("div", { style: { display: "flex", gap: 6, flex: 1 } },
                React.createElement(TextInput, { autoFocus: true, value: editName, onChange: (e) => setEditName(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                        saveEditMember(m); if (e.key === "Escape")
                        cancelEditMember(); }, style: { fontSize: 13, padding: "7px 10px" } }),
                React.createElement(Button, { type: "button", style: { fontSize: 12, padding: "7px 10px" }, onClick: () => saveEditMember(m), disabled: savingEdit }, "\u0630\u062E\u06CC\u0631\u0647"),
                React.createElement(Button, { type: "button", variant: "ghost", style: { fontSize: 12, padding: "7px 10px" }, onClick: cancelEditMember }, "\u0627\u0646\u0635\u0631\u0627\u0641"))) : (React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "#1E293B" } }, m.fullname),
                React.createElement("span", { onClick: () => startEditMember(m), style: { display: "flex", cursor: "pointer", color: "#94A3B8", padding: 3 }, title: "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0646\u0627\u0645" },
                    React.createElement(Edit2, { size: 13 })))),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } },
                React.createElement("span", { style: { fontFamily: "monospace", fontSize: 14, fontWeight: 800, color: "#2563EB", letterSpacing: 1 } }, m.code),
                React.createElement("span", { onClick: () => regenerateCodeFor(m), style: { fontSize: 11.5, color: "#64748B", cursor: "pointer" } }, "\u06A9\u062F \u062C\u062F\u06CC\u062F"),
                React.createElement("div", { onClick: () => removeStudent(m), style: { display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7, background: "#FEF2F2", cursor: "pointer" } },
                    React.createElement(Trash2, { size: 14, color: "#DC2626" }))))))))));
}
function CreateClassForm({ onCreate, error }) {
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const submit = async () => {
        if (!name.trim())
            return;
        setSaving(true);
        const ok = await onCreate(name);
        setSaving(false);
        if (ok)
            setName("");
    };
    return (React.createElement("div", null,
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0644\u0627\u0633" },
            React.createElement(TextInput, { value: name, onChange: (e) => setName(e.target.value), onKeyDown: (e) => e.key === "Enter" && submit(), placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0647\u0641\u062A\u0645 \u0627\u0644\u0641" })),
        error && React.createElement("div", { style: { color: "#DC2626", fontSize: 12.5, marginBottom: 10 } }, error),
        React.createElement(Button, { type: "button", onClick: submit, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: saving }, saving ? "در حال ساخت..." : "ساخت کلاس")));
}
function AdminSidebar({ active, onNavigate, onSettings, onHelp, onLogout, adminName, brandColor, logoUrl, badges }) {
    const accent = brandColor || "#2563EB";
    const activeTextColor = (() => {
        const hex = (accent || "").replace("#", "");
        if (hex.length !== 6)
            return "#fff";
        const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 175 ? "#1E293B" : "#fff";
    })();
    const isMobile = useIsMobile();
    const [mobileOpen, setMobileOpen] = useState(false);
    const items = [
        { key: "dashboard", label: "داشبورد", icon: LayoutDashboard, group: "overview" },
        { key: "teachers", label: "معلمان", icon: Users, group: "people" },
        { key: "students", label: "دانش‌آموزان", icon: GraduationCap, group: "people" },
        { key: "classes", label: "کلاس‌بندی", icon: Library, group: "academic" },
        { key: "exams", label: "آزمون‌ها", icon: FileText, group: "academic" },
        { key: "schedule", label: "برنامه امتحانات", icon: Clock, group: "academic" },
        { key: "results", label: "نتایج و گزارش‌ها", icon: BarChart3, group: "reports" },
        { key: "backup", label: "پشتیبان‌گیری و بازیابی", icon: Download, group: "reports" },
        { key: "messages", label: "اعلانات و پیام‌ها", icon: MessageSquare, group: "comm" },
    ];
    const navigate = (key) => { onNavigate(key); setMobileOpen(false); };
    if (isMobile && !mobileOpen) {
        return React.createElement(MobileMenuButton, { onClick: () => setMobileOpen(true), accent: accent });
    }
    return (React.createElement(React.Fragment, null,
        isMobile && React.createElement(MobileSidebarBackdrop, { onClick: () => setMobileOpen(false) }),
        React.createElement("div", { style: {
                width: 230, background: "#132A52", minHeight: "100%", display: "flex",
                flexDirection: "column", flexShrink: 0,
                ...(isMobile ? { position: "fixed", top: 0, bottom: 0, right: 0, zIndex: 9999, boxShadow: "-8px 0 24px rgba(0,0,0,.25)", overflowY: "auto" } : {}),
            } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "22px 20px", borderBottom: "1px solid #22385F" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                    React.createElement("div", { style: { width: 34, height: 34, borderRadius: 9, background: accent, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" } }, logoUrl ? React.createElement("img", { src: logoUrl, alt: "\u0644\u0648\u06AF\u0648", style: { width: "100%", height: "100%", objectFit: "contain" } }) : React.createElement(GraduationCap, { size: 19, color: "#fff" })),
                    React.createElement("span", { style: { color: "#fff", fontWeight: 800, fontSize: 17 } }, "\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A")),
                isMobile && React.createElement(X, { size: 20, color: "#AAB8D1", style: { cursor: "pointer" }, onClick: () => setMobileOpen(false) })),
            React.createElement("div", { style: { padding: "14px 12px", flex: 1 } },
                items.map((it, i) => {
                    const isActive = active === it.key;
                    const IconCmp = it.icon;
                    const badgeCount = badges && badges[it.key];
                    const showDivider = i > 0 && items[i - 1].group !== it.group;
                    return (React.createElement(React.Fragment, { key: it.key },
                        showDivider && React.createElement(SidebarDivider, null),
                        React.createElement("div", { className: "sidebar-item", onClick: () => navigate(it.key), style: {
                                display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
                                borderRadius: 10, cursor: "pointer", marginBottom: 4,
                                background: isActive ? accent : "transparent",
                                color: isActive ? activeTextColor : "#AAB8D1",
                                fontSize: 14, fontWeight: 600,
                            } },
                            React.createElement(IconCmp, { size: 17 }),
                            it.label,
                            badgeCount > 0 && (React.createElement("span", { style: {
                                    marginRight: "auto", background: "#EF4444", color: "#fff", fontSize: 10.5, fontWeight: 800,
                                    borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px", display: "flex", alignItems: "center", justifyContent: "center",
                                } }, badgeCount)))));
                }),
                React.createElement(SidebarDivider, null),
                React.createElement("div", { className: "sidebar-item", onClick: () => { onSettings(); setMobileOpen(false); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", marginBottom: 4, color: "#AAB8D1", fontSize: 14, fontWeight: 600 } },
                    React.createElement(Settings, { size: 17 }),
                    "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0633\u0627\u0628"),
                React.createElement("div", { className: "sidebar-item", onClick: () => { onHelp(); setMobileOpen(false); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", marginBottom: 4, color: "#AAB8D1", fontSize: 14, fontWeight: 600 } },
                    React.createElement(HelpCircle, { size: 17 }),
                    "\u0631\u0627\u0647\u0646\u0645\u0627")),
            React.createElement("div", { style: { padding: 12, borderTop: "1px solid #22385F" } },
                React.createElement("div", { style: { fontSize: 12, color: "#7C8CAE", padding: "6px 14px 12px" } }, adminName),
                React.createElement("div", { className: "sidebar-item", onClick: onLogout, style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", color: "#F87171", fontSize: 14, fontWeight: 600 } },
                    React.createElement(LogOut, { size: 17 }),
                    "\u062E\u0631\u0648\u062C"),
                React.createElement("div", { style: { fontSize: 10, color: "#4B5C81", textAlign: "center", padding: "10px 14px 2px", letterSpacing: 0.3 } },
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " ghobeishawi \u2014 \u062A\u0645\u0627\u0645\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A")))));
}
function AdminDashboardScreen({ teacher, teachers, exams, classes, roster, students, questions, answers, messages, cheatAlerts, onLogout, onUpdateSelf, refresh, addLocalClass, removeLocalClass, updateLocalClass, addLocalRoster, addLocalRosterMany, updateLocalRoster, removeLocalRoster, addLocalQuestion, addLocalQuestionMany, updateLocalQuestion, removeLocalQuestion, removeLocalQuestionMany, removeLocalExam }) {
    const [view, setView] = useState("dashboard");
    const [showCreate, setShowCreate] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [showOwnSettings, setShowOwnSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [search, setSearch] = useState("");
    const [showCreateClass, setShowCreateClass] = useState(false);
    const [teacherPickerClassId, setTeacherPickerClassId] = useState(null);
    const [classSearch, setClassSearch] = useState("");
    const [managingRosterClass, setManagingRosterClass] = useState(null);
    const [editingClassId, setEditingClassId] = useState(null);
    const [editClassName, setEditClassName] = useState("");
    const [savingClassName, setSavingClassName] = useState(false);
    const [examSearch, setExamSearch] = useState("");
    const [studentSearch, setStudentSearch] = useState("");
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [editStudentName, setEditStudentName] = useState("");
    const [savingStudentName, setSavingStudentName] = useState(false);
    const [announceAudience, setAnnounceAudience] = useState("teachers");
    const [announceClassId, setAnnounceClassId] = useState("");
    const [announceStudentId, setAnnounceStudentId] = useState("");
    const [announceText, setAnnounceText] = useState("");
    const [announceSending, setAnnounceSending] = useState(false);
    const [resultsTeacherFilter, setResultsTeacherFilter] = useState("");
    const [mySchool, setMySchool] = useState(null);
    useEffect(() => {
        if (!teacher.school_id)
            return;
        let cancelled = false;
        getJSON(`school:${teacher.school_id}`).then((s) => { if (!cancelled)
            setMySchool(s); });
        return () => { cancelled = true; };
    }, [teacher.school_id]);
    // پیام‌رسانی دوطرفه با مدیر کل — تنظیم سراسری «آیا ادمین‌ها اجازه‌ی
    // فرستادن پیام به مدیر سایت رو دارن یا نه» رو یک‌بار می‌خونیم؛ پیش‌فرض
    // (وقتی هنوز ساخته نشده) دوطرفه (مجاز) است.
    const [allowAdminToSuperAdmin, setAllowAdminToSuperAdmin] = useState(true);
    useEffect(() => {
        let cancelled = false;
        getJSON("settings:global").then((s) => { if (!cancelled)
            setAllowAdminToSuperAdmin(s?.allow_admin_to_superadmin_messages !== false); });
        return () => { cancelled = true; };
    }, []);
    const [saThreadText, setSaThreadText] = useState("");
    const [saThreadSending, setSaThreadSending] = useState(false);
    const superAdminThread = (messages || [])
        .filter((m) => m.channel === "admin_superadmin" && m.school_id === teacher.school_id)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const unreadSaCount = superAdminThread.filter((m) => m.sender_role === "super_admin" && new Date(m.created_at) > new Date(teacher.sa_thread_last_read_at || 0)).length;
    useEffect(() => {
        if (view !== "messages" || unreadSaCount === 0)
            return;
        const updated = { ...teacher, sa_thread_last_read_at: new Date().toISOString() };
        setJSON(`teacher:${teacher.username}`, updated).then(() => { onUpdateSelf && onUpdateSelf(updated); });
    }, [view, unreadSaCount]);
    const sendToSuperAdmin = async () => {
        if (!saThreadText.trim())
            return;
        setSaThreadSending(true);
        const id = uid();
        await setJSON(`message:${id}`, {
            id, channel: "admin_superadmin", sender_role: "admin", sender_name: teacher.fullname,
            school_id: teacher.school_id, text: saThreadText.trim(), created_at: new Date().toISOString(),
        });
        setSaThreadSending(false);
        setSaThreadText("");
        await refresh();
    };
    const statsFor = (username) => ({
        classCount: classes.filter((c) => classTeacherIds(c).includes(username)).length,
        examCount: exams.filter((e) => e.teacher_id === username).length,
        studentCount: students.filter((s) => s.teacher_id === username).length,
    });
    const visibleTeachers = teachers
        .filter((t) => !search || t.fullname.includes(search) || t.username.includes(search))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const removeTeacher = async (t) => {
        const myClasses = classes.filter((c) => classTeacherIds(c).includes(t.username));
        // کلاسی که فقط همین معلم روشه، کامل حذف می‌شه؛ کلاسی که معلم‌های دیگه‌ای
        // هم داره فقط این معلم ازش جدا می‌شه — خودِ کلاس و دانش‌آموزهاش برای
        // بقیه‌ی معلم‌ها دست‌نخورده می‌مونن.
        const soloClasses = myClasses.filter((c) => classTeacherIds(c).length <= 1);
        const sharedClasses = myClasses.filter((c) => classTeacherIds(c).length > 1);
        const relatedExamIds = exams.filter((e) => e.teacher_id === t.username).map((e) => e.id);
        const counts = {
            classes: soloClasses.length,
            exams: relatedExamIds.length,
            students: students.filter((s) => s.teacher_id === t.username).length,
        };
        let confirmMsg = `حساب معلم «${t.fullname}» حذف شود؟\nهمراه آن ${counts.classes} کلاس، ${counts.exams} آزمون و ${counts.students} دانش‌آموز این معلم نیز برای همیشه حذف می‌شوند.`;
        if (sharedClasses.length > 0)
            confirmMsg += `\n(${sharedClasses.length} کلاس مشترک با معلم‌های دیگر فقط از این معلم جدا می‌شود و خودش باقی می‌ماند.)`;
        confirmMsg += " این کار قابل بازگشت نیست.";
        if (!window.confirm(confirmMsg))
            return;
        const soloClassIds = new Set(soloClasses.map((c) => c.id));
        const deletions = [deleteKey(`teacher:${t.username}`)];
        soloClasses.forEach((c) => deletions.push(deleteKey(`class:${c.id}`)));
        roster.filter((r) => soloClassIds.has(r.class_id)).forEach((r) => deletions.push(deleteKey(`roster:${r.id}`)));
        const updates = sharedClasses.map((c) => setJSON(`class:${c.id}`, { ...c, teacher_ids: classTeacherIds(c).filter((u) => u !== t.username) }));
        students.filter((s) => s.teacher_id === t.username).forEach((s) => deletions.push(deleteKey(`student:${s.id}`)));
        (messages || []).filter((m) => m.teacher_id === t.username).forEach((m) => deletions.push(deleteKey(`message:${m.id}`)));
        (cheatAlerts || []).filter((a) => a.teacher_id === t.username).forEach((a) => deletions.push(deleteKey(`cheatalert:${a.id}`)));
        (questions || []).filter((q) => relatedExamIds.includes(q.exam_id) || q.owner_id === t.username).forEach((q) => deletions.push(deleteKey(`question:${q.id}`)));
        const relatedAnswerStudentIds = new Set((answers || []).filter((a) => relatedExamIds.includes(a.exam_id)).map((a) => a.student_id));
        relatedAnswerStudentIds.forEach((sid) => deletions.push(deleteKey(`answers:${sid}`)));
        exams.filter((e) => e.teacher_id === t.username).forEach((e) => deletions.push(deleteKey(`exam:${e.id}`)));
        await Promise.all([...deletions, ...updates]);
        await refresh();
    };
    const schoolClasses = classes.slice().sort((a, b) => a.name.localeCompare(b.name, "fa"));
    // چک‌باکس یک معلم رو برای یک کلاس روشن/خاموش می‌کنه — چون حالا هر کلاس
    // می‌تونه چند معلم داشته باشه، نه فقط یکی.
    const toggleClassTeacher = async (cls, username) => {
        const current = classTeacherIds(cls);
        const nextIds = current.includes(username) ? current.filter((u) => u !== username) : [...current, username];
        const updatedClass = { ...cls, teacher_ids: nextIds };
        delete updatedClass.teacher_id; // فیلد قدیمی تک‌معلمه دیگه لازم نیست
        updateLocalClass && updateLocalClass(updatedClass);
        await setJSON(`class:${cls.id}`, updatedClass);
    };
    const [createClassError, setCreateClassError] = useState("");
    const createClass = async (name) => {
        const id = uid();
        const record = { id, name: name.trim(), teacher_ids: [], school_id: teacher.school_id, created_at: new Date().toISOString() };
        const result = await setJSONChecked(`class:${id}`, record);
        if (!result.ok) {
            setCreateClassError(result.error);
            return false;
        }
        setCreateClassError("");
        // مثل افزودن دانش‌آموز، لیست /api/list ممکنه چند ثانیه طول بکشه تا کلید
        // تازه‌نوشته‌شده رو نشون بده — بدون این خط، کلاس جدید انگار «اضافه نشده»
        // به‌نظر می‌رسید و کاربر دوباره می‌زد، که باعث دوتا شدنش می‌شد.
        addLocalClass && addLocalClass(record);
        setShowCreateClass(false);
        return true;
    };
    const removeClass = async (cls) => {
        const members = roster.filter((r) => r.class_id === cls.id);
        if (!window.confirm(`کلاس «${cls.name}» حذف شود؟${members.length ? ` ${members.length} دانش‌آموز این کلاس نیز حذف می‌شوند.` : ""} این کار قابل بازگشت نیست.`))
            return;
        removeLocalClass && removeLocalClass(cls.id);
        const deletions = [deleteKey(`class:${cls.id}`), ...members.map((r) => deleteKey(`roster:${r.id}`))];
        await Promise.all(deletions);
    };
    const startEditClass = (c) => { setEditingClassId(c.id); setEditClassName(c.name); };
    const cancelEditClass = () => { setEditingClassId(null); setEditClassName(""); };
    const saveEditClass = async (c) => {
        if (!editClassName.trim() || editClassName.trim() === c.name) {
            cancelEditClass();
            return;
        }
        setSavingClassName(true);
        const updated = { ...c, name: editClassName.trim() };
        updateLocalClass && updateLocalClass(updated);
        await setJSON(`class:${c.id}`, updated);
        setSavingClassName(false);
        cancelEditClass();
    };
    const viewTitles = { dashboard: "داشبورد مدیریت", teachers: "معلمان مدرسه", classes: "کلاس‌بندی مدرسه", exams: "آزمون‌های مدرسه", results: "نتایج و گزارش‌ها", backup: "پشتیبان‌گیری و بازیابی", students: "دانش‌آموزان مدرسه", messages: "اعلانات و پیام‌ها", schedule: "برنامه امتحانات" };
    const adminAnnouncements = (messages || []).filter((m) => m.sender === "admin")
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const sendAnnouncement = async () => {
        if (!announceText.trim())
            return;
        if (announceAudience === "class" && !announceClassId)
            return;
        if (announceAudience === "student" && !announceStudentId)
            return;
        setAnnounceSending(true);
        const id = uid();
        const target_type = announceAudience === "class" ? "class" : announceAudience === "student" ? "student" : null;
        const target_id = announceAudience === "class" ? announceClassId : announceAudience === "student" ? announceStudentId : null;
        await setJSON(`message:${id}`, {
            id, sender: "admin", sender_name: teacher.fullname, school_id: teacher.school_id,
            audience: announceAudience, target_type, target_id,
            text: announceText.trim(),
            created_at: new Date().toISOString(),
        });
        setAnnounceSending(false);
        setAnnounceText("");
        setAnnounceClassId("");
        setAnnounceStudentId("");
        await refresh();
    };
    const removeAnnouncement = async (id) => {
        await deleteKey(`message:${id}`);
        await refresh();
    };
    const describeAudience = (m) => {
        if (m.audience === "teachers")
            return "همه معلمان";
        if (m.audience === "students")
            return "همه دانش‌آموزان";
        if (m.audience === "class") {
            const c = classById[m.target_id];
            return c ? `کلاس: ${c.name}` : "کلاس حذف‌شده";
        }
        if (m.audience === "student") {
            const s = roster.find((r) => r.id === m.target_id);
            return s ? `دانش‌آموز: ${s.fullname}` : "دانش‌آموز حذف‌شده";
        }
        return "—";
    };
    const now = new Date();
    const examStatus = (exam) => {
        const opens = exam.opens_at ? new Date(exam.opens_at) : null;
        const closes = exam.closes_at ? new Date(exam.closes_at) : null;
        if (closes && closes < now)
            return { label: "پایان‌یافته", tone: "gray" };
        if (opens && opens > now)
            return { label: "پیش‌رو", tone: "blue" };
        if (opens || closes)
            return { label: "در حال برگزاری", tone: "green" };
        return { label: "بدون زمان‌بندی", tone: "gray" };
    };
    const scheduledExams = exams
        .slice()
        .sort((a, b) => {
        const da = a.opens_at ? new Date(a.opens_at) : new Date(8640000000000000);
        const db = b.opens_at ? new Date(b.opens_at) : new Date(8640000000000000);
        return da - db;
    });
    const teacherByUsername = {};
    teachers.forEach((t) => { teacherByUsername[t.username] = t; });
    const classById = {};
    classes.forEach((c) => { classById[c.id] = c; });
    const schoolExams = exams
        .filter((e) => !examSearch || e.title.includes(examSearch))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const removeExam = async (exam) => {
        const qCount = questions.filter((q) => q.exam_id === exam.id).length;
        if (!window.confirm(`آزمون «${exam.title}» حذف شود؟ ${qCount} سوال و همه‌ی نتایج این آزمون نیز حذف می‌شوند. این کار قابل بازگشت نیست.`))
            return;
        const qIds = questions.filter((q) => q.exam_id === exam.id).map((q) => q.id);
        removeLocalExam && removeLocalExam(exam.id);
        removeLocalQuestionMany && removeLocalQuestionMany(qIds);
        const deletions = [deleteKey(`exam:${exam.id}`)];
        qIds.forEach((qid) => deletions.push(deleteKey(`question:${qid}`)));
        const examAnswerStudentIds = new Set(answers.filter((a) => a.exam_id === exam.id).map((a) => a.student_id));
        examAnswerStudentIds.forEach((sid) => deletions.push(deleteKey(`answers:${sid}`)));
        students.filter((s) => s.exam_id === exam.id).forEach((s) => deletions.push(deleteKey(`student:${s.id}`)));
        await Promise.all(deletions);
    };
    const schoolRoster = roster
        .filter((r) => !studentSearch || r.fullname.includes(studentSearch))
        .sort((a, b) => a.fullname.localeCompare(b.fullname, "fa"));
    const startEditStudent = (m) => { setEditingStudentId(m.id); setEditStudentName(m.fullname); };
    const cancelEditStudent = () => { setEditingStudentId(null); setEditStudentName(""); };
    const saveEditStudent = async (m) => {
        if (!editStudentName.trim() || editStudentName.trim() === m.fullname) {
            cancelEditStudent();
            return;
        }
        setSavingStudentName(true);
        const updated = { ...m, fullname: editStudentName.trim() };
        updateLocalRoster && updateLocalRoster(updated);
        await setJSON(`roster:${m.id}`, updated);
        setSavingStudentName(false);
        cancelEditStudent();
    };
    const regenerateStudentCode = async (m) => {
        const code = generateCode(roster.filter((r) => r.id !== m.id).map((r) => r.code));
        const updated = { ...m, code };
        updateLocalRoster && updateLocalRoster(updated);
        const result = await setJSONReturn(`roster:${m.id}`, updated);
        if (result.ok && result.v && result.v.code !== code) {
            updateLocalRoster && updateLocalRoster(result.v);
        }
    };
    const removeSchoolStudent = async (m) => {
        if (!window.confirm(`«${m.fullname}» حذف شود؟`))
            return;
        removeLocalRoster && removeLocalRoster(m.id);
        await deleteKey(`roster:${m.id}`);
    };
    return (React.createElement("div", { style: { display: "flex", flexDirection: "row-reverse", minHeight: "100vh", background: "#F8FAFC" } },
        React.createElement(AdminSidebar, { active: view, onNavigate: setView, onSettings: () => setShowOwnSettings(true), onHelp: () => setShowHelp(true), onLogout: onLogout, adminName: teacher.fullname, brandColor: mySchool?.color, logoUrl: mySchool?.logo_data_url, badges: { messages: unreadSaCount } }),
        React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
            React.createElement(TopBar, { title: viewTitles[view], teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
            view === "dashboard" && (React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" } },
                React.createElement(StatCard, { icon: Users, label: "\u062A\u0639\u062F\u0627\u062F \u0645\u0639\u0644\u0645\u0627\u0646", value: teachers.length, color: "#2563EB" }),
                React.createElement(StatCard, { icon: FileText, label: "\u062A\u0639\u062F\u0627\u062F \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627 (\u06A9\u0644 \u0645\u062F\u0631\u0633\u0647)", value: exams.length, color: "#8B5CF6" }),
                React.createElement(StatCard, { icon: Users, label: "\u062A\u0639\u062F\u0627\u062F \u06A9\u0644\u0627\u0633\u200C\u0647\u0627 (\u06A9\u0644 \u0645\u062F\u0631\u0633\u0647)", value: classes.length, color: "#0EA5E9" }),
                React.createElement(StatCard, { icon: BarChart3, label: "\u062A\u0639\u062F\u0627\u062F \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 (\u06A9\u0644 \u0645\u062F\u0631\u0633\u0647)", value: students.length, color: "#16A34A" }))),
            view === "teachers" && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B" } }, "\u0645\u0639\u0644\u0645\u0627\u0646 \u0645\u062F\u0631\u0633\u0647"),
                    React.createElement("div", { style: { display: "flex", gap: 10, flex: 1, justifyContent: "flex-end", flexWrap: "wrap" } },
                        React.createElement(TextInput, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "\u062C\u0633\u062A\u062C\u0648\u06CC \u0645\u0639\u0644\u0645...", style: { maxWidth: 220 } }),
                        React.createElement(Button, { onClick: () => setShowCreate(true) },
                            React.createElement(Plus, { size: 16 }),
                            "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0639\u0644\u0645"))),
                visibleTeachers.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0645\u0639\u0644\u0645\u06CC \u0627\u0636\u0627\u0641\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.", actionLabel: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0639\u0644\u0645", onAction: () => setShowCreate(true) })) : (React.createElement("div", { style: { overflowX: "auto" } },
                    React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } },
                        React.createElement("thead", null,
                            React.createElement("tr", { style: { borderBottom: "1px solid #EEF1F6", textAlign: "right" } },
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0646\u0627\u0645 \u0645\u0639\u0644\u0645"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0648\u0636\u0639\u06CC\u062A"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u06A9\u0644\u0627\u0633\u200C\u0647\u0627"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u062A\u0627\u0631\u06CC\u062E \u0639\u0636\u0648\u06CC\u062A"),
                                React.createElement("th", { style: { padding: "10px 6px" } }))),
                        React.createElement("tbody", null, visibleTeachers.map((t) => {
                            const s = statsFor(t.username);
                            const isActive = t.active !== false;
                            return (React.createElement("tr", { key: t.username, style: { borderBottom: "1px solid #F5F7FA" } },
                                React.createElement("td", { style: { padding: "12px 6px", fontWeight: 700, color: "#1E293B" } },
                                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                                        React.createElement(Avatar, { username: t.username, name: t.fullname, updatedAt: t.avatar_updated_at, size: 30 }),
                                        t.fullname)),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#64748B" } }, t.username),
                                React.createElement("td", { style: { padding: "12px 6px" } },
                                    React.createElement("span", { style: {
                                            fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                                            background: isActive ? "#DCFCE7" : "#FEF2F2", color: isActive ? "#16A34A" : "#DC2626",
                                        } }, isActive ? "فعال" : "غیرفعال")),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, s.classCount),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, s.examCount),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, s.studentCount),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#94A3B8" } }, t.created_at ? new Date(t.created_at).toLocaleDateString("fa-IR") : "—"),
                                React.createElement("td", { style: { padding: "12px 6px" } },
                                    React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end" } },
                                        React.createElement("div", { onClick: () => setEditingTeacher(t), style: { display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#EFF6FF", cursor: "pointer" } },
                                            React.createElement(Edit2, { size: 16, color: "#2563EB" })),
                                        React.createElement("div", { onClick: () => removeTeacher(t), style: { display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#FEF2F2", cursor: "pointer" } },
                                            React.createElement(Trash2, { size: 16, color: "#DC2626" }))))));
                        }))))))),
            view === "classes" && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B" } }, "\u06A9\u0644\u0627\u0633\u200C\u0628\u0646\u062F\u06CC \u0645\u062F\u0631\u0633\u0647"),
                    React.createElement("div", { style: { display: "flex", gap: 10, flex: 1, justifyContent: "flex-end", flexWrap: "wrap" } },
                        React.createElement(TextInput, { value: classSearch, onChange: (e) => setClassSearch(e.target.value), placeholder: "\u062C\u0633\u062A\u062C\u0648\u06CC \u06A9\u0644\u0627\u0633...", style: { maxWidth: 220 } }),
                        React.createElement(Button, { onClick: () => setShowCreateClass(true) },
                            React.createElement(Plus, { size: 16 }),
                            "\u06A9\u0644\u0627\u0633 \u062C\u062F\u06CC\u062F"))),
                schoolClasses.filter((c) => !classSearch || c.name.includes(classSearch)).length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u06A9\u0644\u0627\u0633\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.", actionLabel: "\u06A9\u0644\u0627\u0633 \u062C\u062F\u06CC\u062F", onAction: () => setShowCreateClass(true) })) : (React.createElement("div", { style: { overflowX: "auto" } },
                    React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } },
                        React.createElement("thead", null,
                            React.createElement("tr", { style: { borderBottom: "1px solid #EEF1F6", textAlign: "right" } },
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0646\u0627\u0645 \u06A9\u0644\u0627\u0633"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0645\u0639\u0644\u0645\u200C\u0647\u0627"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646"),
                                React.createElement("th", { style: { padding: "10px 6px" } }))),
                        React.createElement("tbody", null, schoolClasses.filter((c) => !classSearch || c.name.includes(classSearch)).map((c) => (React.createElement("tr", { key: c.id, style: { borderBottom: "1px solid #F5F7FA" } },
                            React.createElement("td", { style: { padding: "12px 6px", fontWeight: 700, color: "#1E293B" } }, editingClassId === c.id ? (React.createElement("div", { style: { display: "flex", gap: 6 } },
                                React.createElement(TextInput, { autoFocus: true, value: editClassName, onChange: (e) => setEditClassName(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                                        saveEditClass(c); if (e.key === "Escape")
                                        cancelEditClass(); }, style: { fontSize: 13, padding: "7px 10px", maxWidth: 140 } }),
                                React.createElement(Button, { type: "button", style: { fontSize: 12, padding: "7px 10px" }, onClick: () => saveEditClass(c), disabled: savingClassName }, "\u0630\u062E\u06CC\u0631\u0647"),
                                React.createElement(Button, { type: "button", variant: "ghost", style: { fontSize: 12, padding: "7px 10px" }, onClick: cancelEditClass }, "\u0627\u0646\u0635\u0631\u0627\u0641"))) : (React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                                c.name,
                                React.createElement("span", { onClick: () => startEditClass(c), style: { display: "flex", cursor: "pointer", color: "#94A3B8", padding: 3 }, title: "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0646\u0627\u0645 \u06A9\u0644\u0627\u0633" },
                                    React.createElement(Edit2, { size: 13 }))))),
                            React.createElement("td", { style: { padding: "12px 6px", position: "relative" } },
                                (() => {
                                    const ids = classTeacherIds(c);
                                    const names = ids.map((u) => teachers.find((t) => t.username === u)?.fullname || u);
                                    return (React.createElement("div", { onClick: () => setTeacherPickerClassId((cur) => (cur === c.id ? null : c.id)), style: {
                                            display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 10px",
                                            borderRadius: 8, border: "1.5px solid #E2E8F0", cursor: "pointer",
                                            fontSize: 12.5, color: names.length ? "#334155" : "#94A3B8", maxWidth: 200,
                                        } }, names.length ? names.join("، ") : "— بدون معلم —"));
                                })(),
                                teacherPickerClassId === c.id && (React.createElement("div", { style: {
                                        position: "absolute", top: "100%", right: 0, zIndex: 20, marginTop: 4,
                                        background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10,
                                        boxShadow: "0 8px 24px rgba(15,23,42,.12)", padding: 10, minWidth: 200,
                                        maxHeight: 220, overflowY: "auto",
                                    } },
                                    teachers.length === 0 ? (React.createElement("div", { style: { fontSize: 12, color: "#94A3B8" } }, "\u0647\u0646\u0648\u0632 \u0645\u0639\u0644\u0645\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC.")) : teachers.map((t) => {
                                        const checked = classTeacherIds(c).includes(t.username);
                                        return (React.createElement("div", { key: t.username, onClick: () => toggleClassTeacher(c, t.username), style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", cursor: "pointer" } },
                                            checked ? React.createElement(CheckCircle2, { size: 15, color: "#2563EB" }) : React.createElement(Circle, { size: 15, color: "#CBD5E1" }),
                                            React.createElement("span", { style: { fontSize: 12.5, color: "#334155" } }, t.fullname)));
                                    }),
                                    React.createElement("div", { style: { borderTop: "1px solid #F1F5F9", marginTop: 6, paddingTop: 6, textAlign: "left" } },
                                        React.createElement("span", { onClick: () => setTeacherPickerClassId(null), style: { fontSize: 11.5, color: "#2563EB", cursor: "pointer" } }, "\u0628\u0633\u062A\u0646"))))),
                            React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, roster.filter((r) => r.class_id === c.id).length),
                            React.createElement("td", { style: { padding: "12px 6px" } },
                                React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end" } },
                                    React.createElement(Button, { variant: "ghost", style: { fontSize: 12.5, padding: "7px 10px" }, onClick: () => setManagingRosterClass(c) },
                                        React.createElement(Users, { size: 14 }),
                                        "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646"),
                                    React.createElement("div", { onClick: () => removeClass(c), style: { display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#FEF2F2", cursor: "pointer" } },
                                        React.createElement(Trash2, { size: 16, color: "#DC2626" }))))))))))))),
            view === "exams" && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B" } }, "\u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u06CC \u0645\u062F\u0631\u0633\u0647"),
                    React.createElement(TextInput, { value: examSearch, onChange: (e) => setExamSearch(e.target.value), placeholder: "\u062C\u0633\u062A\u062C\u0648\u06CC \u0622\u0632\u0645\u0648\u0646...", style: { maxWidth: 220 } })),
                schoolExams.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0622\u0632\u0645\u0648\u0646\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A." })) : (React.createElement("div", { style: { overflowX: "auto" } },
                    React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } },
                        React.createElement("thead", null,
                            React.createElement("tr", { style: { borderBottom: "1px solid #EEF1F6", textAlign: "right" } },
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0639\u0646\u0648\u0627\u0646 \u0622\u0632\u0645\u0648\u0646"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0645\u0639\u0644\u0645"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u062A\u0639\u062F\u0627\u062F \u0633\u0648\u0627\u0644"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u062A\u0627\u0631\u06CC\u062E \u0633\u0627\u062E\u062A"),
                                React.createElement("th", { style: { padding: "10px 6px" } }))),
                        React.createElement("tbody", null, schoolExams.map((exam) => {
                            const t = teacherByUsername[exam.teacher_id];
                            const qCount = questions.filter((q) => q.exam_id === exam.id).length;
                            const sCount = students.filter((s) => s.exam_id === exam.id).length;
                            return (React.createElement("tr", { key: exam.id, style: { borderBottom: "1px solid #F5F7FA" } },
                                React.createElement("td", { style: { padding: "12px 6px", fontWeight: 700, color: "#1E293B" } }, exam.title),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#64748B" } }, t ? t.fullname : "—"),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, qCount),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, sCount),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#94A3B8" } }, exam.created_at ? new Date(exam.created_at).toLocaleDateString("fa-IR") : "—"),
                                React.createElement("td", { style: { padding: "12px 6px" } },
                                    React.createElement("div", { onClick: () => removeExam(exam), style: { display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#FEF2F2", cursor: "pointer" } },
                                        React.createElement(Trash2, { size: 16, color: "#DC2626" })))));
                        }))))))),
            view === "results" && (React.createElement(AdminResultsScreen, { exams: exams, teachers: teachers, teacherByUsername: teacherByUsername, classes: classes, roster: roster, students: students, questions: questions, answers: answers, teacherFilter: resultsTeacherFilter, onTeacherFilterChange: setResultsTeacherFilter, adminTeacher: teacher, refresh: refresh, aiAllowed: !!(mySchool && mySchool.features && mySchool.features.ai_assistant) })),
            view === "backup" && React.createElement(AdminBackupScreen, { refresh: refresh, teacher: teacher, onUpdateSelf: onUpdateSelf, mySchool: mySchool, setMySchool: setMySchool }),
            view === "students" && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B" } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u0645\u062F\u0631\u0633\u0647"),
                    React.createElement(TextInput, { value: studentSearch, onChange: (e) => setStudentSearch(e.target.value), placeholder: "\u062C\u0633\u062A\u062C\u0648\u06CC \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632...", style: { maxWidth: 220 } })),
                schoolRoster.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u0627\u0636\u0627\u0641\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A." })) : (React.createElement("div", { style: { overflowX: "auto" } },
                    React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } },
                        React.createElement("thead", null,
                            React.createElement("tr", { style: { borderBottom: "1px solid #EEF1F6", textAlign: "right" } },
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0646\u0627\u0645 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u06A9\u0644\u0627\u0633"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0645\u0639\u0644\u0645"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u06A9\u062F \u0648\u0631\u0648\u062F"),
                                React.createElement("th", { style: { padding: "10px 6px" } }))),
                        React.createElement("tbody", null, schoolRoster.map((m) => {
                            const cls = classById[m.class_id];
                            const t = teacherByUsername[m.teacher_id];
                            return (React.createElement("tr", { key: m.id, style: { borderBottom: "1px solid #F5F7FA" } },
                                React.createElement("td", { style: { padding: "12px 6px", fontWeight: 700, color: "#1E293B" } }, editingStudentId === m.id ? (React.createElement("div", { style: { display: "flex", gap: 6 } },
                                    React.createElement(TextInput, { autoFocus: true, value: editStudentName, onChange: (e) => setEditStudentName(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                                            saveEditStudent(m); if (e.key === "Escape")
                                            cancelEditStudent(); }, style: { fontSize: 13, padding: "7px 10px", maxWidth: 150 } }),
                                    React.createElement(Button, { type: "button", style: { fontSize: 12, padding: "7px 10px" }, onClick: () => saveEditStudent(m), disabled: savingStudentName }, "\u0630\u062E\u06CC\u0631\u0647"),
                                    React.createElement(Button, { type: "button", variant: "ghost", style: { fontSize: 12, padding: "7px 10px" }, onClick: cancelEditStudent }, "\u0627\u0646\u0635\u0631\u0627\u0641"))) : (React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                                    m.fullname,
                                    React.createElement("span", { onClick: () => startEditStudent(m), style: { display: "flex", cursor: "pointer", color: "#94A3B8", padding: 3 }, title: "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0646\u0627\u0645" },
                                        React.createElement(Edit2, { size: 13 }))))),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#64748B" } }, cls ? cls.name : "—"),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#64748B" } }, t ? t.fullname : "—"),
                                React.createElement("td", { style: { padding: "12px 6px" } },
                                    React.createElement("span", { style: { fontFamily: "monospace", fontSize: 14, fontWeight: 800, color: "#2563EB", letterSpacing: 1 } }, m.code)),
                                React.createElement("td", { style: { padding: "12px 6px" } },
                                    React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", justifyContent: "flex-end" } },
                                        React.createElement("span", { onClick: () => regenerateStudentCode(m), style: { fontSize: 11.5, color: "#64748B", cursor: "pointer" } }, "\u06A9\u062F \u062C\u062F\u06CC\u062F"),
                                        React.createElement("div", { onClick: () => removeSchoolStudent(m), style: { display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 7, background: "#FEF2F2", cursor: "pointer" } },
                                            React.createElement(Trash2, { size: 14, color: "#DC2626" }))))));
                        }))))))),
            view === "messages" && (React.createElement("div", null,
                React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginBottom: 20 } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 4 } }, "\u067E\u06CC\u0627\u0645 \u0628\u0647 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A"),
                    React.createElement("div", { style: { fontSize: 12, color: "#94A3B8", marginBottom: 14 } }, "\u06AF\u0641\u062A\u06AF\u0648\u06CC \u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u06CC\u0646 \u0634\u0645\u0627 \u0648 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0633\u0627\u0645\u0627\u0646\u0647."),
                    React.createElement("div", { style: {
                            maxHeight: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8,
                            background: "#F8FAFC", borderRadius: 10, padding: superAdminThread.length ? 12 : 0, marginBottom: 14,
                        } }, superAdminThread.length === 0 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 12.5, padding: 14, textAlign: "center" } }, "\u0647\u0646\u0648\u0632 \u067E\u06CC\u0627\u0645\u06CC \u0631\u062F \u0648 \u0628\u062F\u0644 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.")) : superAdminThread.map((m) => (React.createElement("div", { key: m.id, style: {
                            alignSelf: m.sender_role === "super_admin" ? "flex-start" : "flex-end",
                            maxWidth: "80%", background: m.sender_role === "super_admin" ? "#EFF6FF" : "#F5F3FF",
                            border: `1px solid ${m.sender_role === "super_admin" ? "#DBEAFE" : "#DDD6FE"}`,
                            borderRadius: 10, padding: "8px 12px",
                        } },
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: m.sender_role === "super_admin" ? "#2563EB" : "#7C3AED", marginBottom: 3 } }, m.sender_role === "super_admin" ? "🛡️ مدیر سایت" : m.sender_name || "شما"),
                        React.createElement("div", { style: { fontSize: 13, color: "#334155", whiteSpace: "pre-wrap" } }, m.text),
                        React.createElement("div", { style: { fontSize: 10.5, color: "#94A3B8", marginTop: 3 } }, new Date(m.created_at).toLocaleString("fa-IR")))))),
                    allowAdminToSuperAdmin ? (React.createElement("div", { style: { display: "flex", gap: 8 } },
                        React.createElement(TextInput, { value: saThreadText, onChange: (e) => setSaThreadText(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                                sendToSuperAdmin(); }, placeholder: "\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u06CC\u062F...", style: { flex: 1 } }),
                        React.createElement(Button, { onClick: sendToSuperAdmin, disabled: saThreadSending || !saThreadText.trim() }, saThreadSending ? "..." : "ارسال"))) : (React.createElement("div", { style: { fontSize: 12.5, color: "#94A3B8", background: "#F8FAFC", borderRadius: 8, padding: "10px 12px" } }, "\u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0628\u0647 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0631\u0627 \u0645\u0648\u0642\u062A\u0627\u064B \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0631\u062F\u0647 \u0627\u0633\u062A."))),
                React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginBottom: 20 } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 16 } }, "\u0627\u0631\u0633\u0627\u0644 \u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F"),
                    React.createElement(Field, { label: "\u06AF\u06CC\u0631\u0646\u062F\u0647" },
                        React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, [
                            { key: "teachers", label: "همه معلمان" },
                            { key: "students", label: "همه دانش‌آموزان مدرسه" },
                            { key: "class", label: "یک کلاس خاص" },
                            { key: "student", label: "یک دانش‌آموز خاص" },
                        ].map((opt) => (React.createElement("div", { key: opt.key, onClick: () => { setAnnounceAudience(opt.key); setAnnounceClassId(""); setAnnounceStudentId(""); }, style: {
                                padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700,
                                background: announceAudience === opt.key ? "#2563EB" : "#F1F5F9", color: announceAudience === opt.key ? "#fff" : "#475569",
                            } }, opt.label))))),
                    (announceAudience === "class" || announceAudience === "student") && (React.createElement(Field, { label: "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0644\u0627\u0633" },
                        React.createElement("select", { value: announceClassId, onChange: (e) => { setAnnounceClassId(e.target.value); setAnnounceStudentId(""); }, style: { ...inputStyle } },
                            React.createElement("option", { value: "" }, "\u2014 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u2014"),
                            schoolClasses.map((c) => (React.createElement("option", { key: c.id, value: c.id }, c.name)))))),
                    announceAudience === "student" && announceClassId && (React.createElement(Field, { label: "\u0627\u0646\u062A\u062E\u0627\u0628 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632" },
                        React.createElement("select", { value: announceStudentId, onChange: (e) => setAnnounceStudentId(e.target.value), style: { ...inputStyle } },
                            React.createElement("option", { value: "" }, "\u2014 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u2014"),
                            roster.filter((r) => r.class_id === announceClassId).map((r) => (React.createElement("option", { key: r.id, value: r.id }, r.fullname)))))),
                    React.createElement(Field, { label: "\u0645\u062A\u0646 \u0627\u0639\u0644\u0627\u0646" },
                        React.createElement("textarea", { value: announceText, onChange: (e) => setAnnounceText(e.target.value), rows: 4, style: { ...inputStyle, resize: "vertical", fontFamily: "inherit" }, placeholder: "\u0645\u062B\u0644\u0627\u064B: \u062C\u0644\u0633\u0647 \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u0645\u0639\u0644\u0645\u0627\u0646 \u0631\u0648\u0632 \u0634\u0646\u0628\u0647 \u0633\u0627\u0639\u062A \u06F1\u06F0" })),
                    React.createElement(Button, { onClick: sendAnnouncement, disabled: announceSending || (announceAudience === "class" && !announceClassId) || (announceAudience === "student" && !announceStudentId) },
                        React.createElement(Plus, { size: 16 }),
                        announceSending ? "در حال ارسال..." : "ارسال اعلان")),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 12 } }, "\u0627\u0639\u0644\u0627\u0646\u0627\u062A \u0627\u0631\u0633\u0627\u0644\u200C\u0634\u062F\u0647"),
                adminAnnouncements.length === 0 ? (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6" } },
                    React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u0641\u0631\u0633\u062A\u0627\u062F\u0647\u200C\u0627\u06CC." }))) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, adminAnnouncements.map((m) => (React.createElement("div", { key: m.id, style: { background: "#fff", border: "1px solid #EEF1F6", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 13, color: "#334155", marginBottom: 6, whiteSpace: "pre-wrap" } }, m.text),
                        React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
                            React.createElement(Badge, { tone: "blue" }, describeAudience(m)),
                            React.createElement("span", { style: { fontSize: 11, color: "#94A3B8" } }, new Date(m.created_at).toLocaleString("fa-IR")))),
                    React.createElement("div", { onClick: () => removeAnnouncement(m.id), style: { display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 7, background: "#FEF2F2", cursor: "pointer", flexShrink: 0 } },
                        React.createElement(Trash2, { size: 14, color: "#DC2626" }))))))))),
            view === "schedule" && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 16 } }, "\u0628\u0631\u0646\u0627\u0645\u0647 \u0627\u0645\u062A\u062D\u0627\u0646\u0627\u062A \u0645\u062F\u0631\u0633\u0647"),
                scheduledExams.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0622\u0632\u0645\u0648\u0646\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A." })) : (React.createElement("div", { style: { overflowX: "auto" } },
                    React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } },
                        React.createElement("thead", null,
                            React.createElement("tr", { style: { borderBottom: "1px solid #EEF1F6", textAlign: "right" } },
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0639\u0646\u0648\u0627\u0646 \u0622\u0632\u0645\u0648\u0646"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0645\u0639\u0644\u0645"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0634\u0631\u0648\u0639"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u067E\u0627\u06CC\u0627\u0646"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0645\u062F\u062A (\u062F\u0642\u06CC\u0642\u0647)"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0648\u0636\u0639\u06CC\u062A"))),
                        React.createElement("tbody", null, scheduledExams.map((exam) => {
                            const t = teacherByUsername[exam.teacher_id];
                            const st = examStatus(exam);
                            return (React.createElement("tr", { key: exam.id, style: { borderBottom: "1px solid #F5F7FA" } },
                                React.createElement("td", { style: { padding: "12px 6px", fontWeight: 700, color: "#1E293B" } }, exam.title),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#64748B" } }, t ? t.fullname : "—"),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, exam.opens_at ? new Date(exam.opens_at).toLocaleString("fa-IR") : "—"),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, exam.closes_at ? new Date(exam.closes_at).toLocaleString("fa-IR") : "—"),
                                React.createElement("td", { style: { padding: "12px 6px", color: "#475569" } }, exam.duration_minutes || "—"),
                                React.createElement("td", { style: { padding: "12px 6px" } },
                                    React.createElement(Badge, { tone: st.tone }, st.label))));
                        }))))))),
            React.createElement("div", { style: { textAlign: "center", marginTop: 26, fontSize: 11, color: "#94A3B8" } },
                "\u00A9 ",
                new Date().getFullYear(),
                " ghobeishawi \u2014 \u062A\u0645\u0627\u0645\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A")),
        showCreate && (React.createElement(Modal, { title: "\u0627\u0641\u0632\u0648\u062F\u0646 \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0645 \u062C\u062F\u06CC\u062F", onClose: () => setShowCreate(false) },
            React.createElement(CreateTeacherForm, { existingUsernames: teachers.map((t) => t.username), schoolId: teacher.school_id, onCreated: async (teacher, emailResult) => {
                    setShowCreate(false);
                    await refresh();
                    if (emailResult && !emailResult.sent)
                        window.alert(`حساب معلم ساخته شد، ولی ایمیل خوش‌آمد ارسال نشد:\n${emailResult.note}`);
                } }))),
        managingRosterClass && (React.createElement(AdminRosterModal, { cls: managingRosterClass, roster: roster, onClose: () => setManagingRosterClass(null), refresh: refresh, addLocalRoster: addLocalRoster, addLocalRosterMany: addLocalRosterMany, updateLocalRoster: updateLocalRoster, removeLocalRoster: removeLocalRoster, schoolId: teacher.school_id, groupLoginCode: mySchool?.login_code })),
        showCreateClass && (React.createElement(Modal, { title: "\u0633\u0627\u062E\u062A \u06A9\u0644\u0627\u0633 \u062C\u062F\u06CC\u062F", onClose: () => { setShowCreateClass(false); setCreateClassError(""); } },
            React.createElement(CreateClassForm, { onCreate: createClass, error: createClassError }))),
        editingTeacher && (React.createElement(Modal, { title: `ویرایش حساب: ${editingTeacher.fullname}`, onClose: () => setEditingTeacher(null) },
            React.createElement(EditTeacherForm, { teacher: editingTeacher, onSaved: async (updated) => { setEditingTeacher(updated); await refresh(); } }))),
        showHelp && (React.createElement(Modal, { title: "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A", onClose: () => setShowHelp(false) },
            React.createElement("div", { style: { fontSize: 13.5, color: "#334155", lineHeight: 2.1 } },
                React.createElement("b", null, "\u0645\u0639\u0644\u0645\u0627\u0646:"),
                " \u0627\u0632 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0628\u0631\u0627\u06CC \u0647\u0631 \u0645\u0639\u0644\u0645 \u0645\u062F\u0631\u0633\u0647 \u06CC\u06A9 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0628\u0633\u0627\u0632. \u0647\u0631 \u0645\u0639\u0644\u0645 \u0641\u0642\u0637 \u06A9\u0644\u0627\u0633\u200C\u0647\u0627 \u0648 \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u06CC \u062E\u0648\u062F\u0634 \u0631\u0627 \u0645\u06CC\u200C\u0628\u06CC\u0646\u062F.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u06A9\u0644\u0627\u0633\u200C\u0628\u0646\u062F\u06CC:"),
                " \u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u06CC \u0645\u062F\u0631\u0633\u0647 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u062A\u0639\u0631\u06CC\u0641 \u06A9\u0646 \u0648 \u0647\u0631\u06A9\u062F\u0627\u0645 \u0631\u0627 \u0628\u0647 \u06CC\u06A9 \u0645\u0639\u0644\u0645 \u0628\u0633\u067E\u0627\u0631. \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u0647\u0631 \u06A9\u0644\u0627\u0633 \u0647\u0645 \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0628\u062E\u0634 (\u062F\u06A9\u0645\u0647 \u00AB\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646\u00BB) \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u2014 \u06CC\u06A9\u06CC\u200C\u06CC\u06A9\u06CC\u060C \u0628\u0627 \u067E\u06CC\u0633\u062A \u06A9\u0631\u062F\u0646 \u0686\u0646\u062F \u0627\u0633\u0645 \u0628\u0627 \u0647\u0645\u060C \u06CC\u0627 \u0628\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0645\u0633\u062A\u0642\u06CC\u0645 \u06CC\u06A9 \u0641\u0627\u06CC\u0644 \u0627\u06A9\u0633\u0644 (.xlsx/.csv) \u06A9\u0647 \u0641\u0642\u0637 \u0633\u062A\u0648\u0646 \u0627\u0648\u0644 \u0622\u0646 (\u0646\u0627\u0645 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632) \u062E\u0648\u0627\u0646\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627 \u0648 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646:"),
                " \u0646\u0645\u0627\u06CC \u06A9\u0644\u06CC \u0627\u0632 \u0647\u0645\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627 \u0648 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u0645\u062F\u0631\u0633\u0647\u060C \u0635\u0631\u0641\u200C\u0646\u0638\u0631 \u0627\u0632 \u0627\u06CC\u0646\u06A9\u0647 \u0645\u0627\u0644 \u06A9\u062F\u0627\u0645 \u0645\u0639\u0644\u0645 \u0627\u0633\u062A.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0628\u0631\u0646\u0627\u0645\u0647 \u0627\u0645\u062A\u062D\u0627\u0646\u0627\u062A:"),
                " \u0641\u0647\u0631\u0633\u062A \u0647\u0645\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u06CC \u0632\u0645\u0627\u0646\u200C\u0628\u0646\u062F\u06CC\u200C\u0634\u062F\u0647\u200C\u06CC \u0645\u062F\u0631\u0633\u0647 (\u0645\u0639\u0644\u0645\u060C \u062A\u0627\u0631\u06CC\u062E \u0634\u0631\u0648\u0639/\u067E\u0627\u06CC\u0627\u0646\u060C \u0645\u062F\u062A\u060C \u0648\u0636\u0639\u06CC\u062A \u0628\u0631\u06AF\u0632\u0627\u0631\u06CC) \u062F\u0631 \u06CC\u06A9 \u0646\u06AF\u0627\u0647.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0646\u062A\u0627\u06CC\u062C \u0648 \u06AF\u0632\u0627\u0631\u0634\u200C\u0647\u0627:"),
                " \u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0646\u0645\u0631\u0627\u062A \u0648 \u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u0639\u0645\u0644\u06A9\u0631\u062F \u0628\u0647 \u062A\u0641\u06A9\u06CC\u06A9 \u0645\u0639\u0644\u0645 \u0648 \u06A9\u0644\u0627\u0633\u060C \u062D\u0636\u0648\u0631 \u0648 \u063A\u06CC\u0627\u0628\u060C \u0648 \u0627\u0645\u06A9\u0627\u0646 \u062F\u06CC\u062F\u0646 \u0646\u062A\u0627\u06CC\u062C \u0631\u06CC\u0632 \u0647\u0631 \u0622\u0632\u0645\u0648\u0646 \u2014 \u062F\u0631\u0633\u062A \u0645\u062B\u0644 \u0635\u0641\u062D\u0647\u200C\u06CC \u0646\u062A\u0627\u06CC\u062C \u062E\u0648\u062F\u0650 \u0645\u0639\u0644\u0645\u060C \u0634\u0627\u0645\u0644 \u0631\u0648\u0646\u062F \u0646\u0645\u0631\u0627\u062A \u0647\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u062F\u0631 \u0686\u0646\u062F \u0622\u0632\u0645\u0648\u0646\u060C \u0646\u0642\u0627\u0637 \u0636\u0639\u0641\u0634 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0628\u0631\u0686\u0633\u0628 \u0633\u0648\u0627\u0644\u200C\u0647\u0627\u060C \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u062A\u0645\u0631\u06CC\u0646 \u0628\u0627 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC\u060C \u0648 \u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0627\u0631\u0646\u0627\u0645\u0647\u200C\u06CC \u0627\u0648 \u0628\u0647\u200C\u0635\u0648\u0631\u062A PDF. \u0627\u0632 \u0635\u0641\u062D\u0647\u200C\u06CC \u00AB\u0646\u062A\u0627\u06CC\u062C\u00BB \u0647\u0631 \u0645\u0639\u0644\u0645 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646 \u062E\u0631\u0648\u062C\u06CC Excel \u0647\u0645 \u06AF\u0631\u0641\u062A: \u0646\u0645\u0631\u0647\u200C\u06CC \u0647\u0631 \u0633\u0648\u0627\u0644 \u0628\u0647 \u062A\u0641\u06A9\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u06CC\u06A9 \u0622\u0632\u0645\u0648\u0646 \u062E\u0627\u0635\u060C \u06CC\u0627 \u062E\u0644\u0627\u0635\u0647\u200C\u06CC \u0646\u0645\u0631\u0627\u062A \u06CC\u06A9 \u06A9\u0644\u0627\u0633 \u062F\u0631 \u0647\u0645\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u06CC\u0634.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0686\u062A \u06A9\u0644\u0627\u0633\u06CC \u0648 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC:"),
                " \u0645\u0639\u0644\u0645\u200C\u0647\u0627\u06CC \u0645\u062F\u0631\u0633\u0647 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u0646\u062F \u0628\u0627 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u0647\u0631 \u06A9\u0644\u0627\u0633 \u0686\u062A \u06AF\u0631\u0648\u0647\u06CC \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u0646\u062F \u0648 \u0627\u0632 \u062A\u0648\u0644\u06CC\u062F \u0633\u0648\u0627\u0644/\u062A\u0635\u062D\u06CC\u062D \u0628\u0627 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646\u0646\u062F. \u0641\u0639\u0627\u0644 \u06CC\u0627 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0628\u0648\u062F\u0646 \u0627\u06CC\u0646 \u062F\u0648 \u0642\u0627\u0628\u0644\u06CC\u062A \u0628\u0631\u0627\u06CC \u06A9\u0644 \u0645\u062F\u0631\u0633\u0647\u200C\u06CC \u0634\u0645\u0627 (\u067E\u0644\u0646 \u0645\u062F\u0631\u0633\u0647) \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u062A\u0639\u06CC\u06CC\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0627\u0633\u062A\u060C \u0628\u0631\u0627\u06CC \u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0628\u0627 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u067E\u06CC\u0627\u0645 \u0628\u0647 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A:"),
                " \u0627\u0632 \u0628\u062E\u0634 \u00AB\u067E\u06CC\u0627\u0645\u200C\u0647\u0627\u00BB \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC\u062F \u0645\u0633\u062A\u0642\u06CC\u0645\u0627\u064B \u0628\u0627 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u06AF\u0641\u062A\u06AF\u0648 \u06A9\u0646\u06CC\u062F \u2014 \u0645\u062B\u0644\u0627\u064B \u0628\u0631\u0627\u06CC \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0627\u0641\u0632\u0627\u06CC\u0634 \u0633\u0642\u0641 \u06A9\u0644\u0627\u0633/\u0622\u0632\u0645\u0648\u0646 \u06CC\u0627 \u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u06CC\u06A9 \u0642\u0627\u0628\u0644\u06CC\u062A.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC:"),
                " \u062F\u0627\u0646\u0644\u0648\u062F \u06CC\u06A9 \u0641\u0627\u06CC\u0644 \u0634\u0627\u0645\u0644 \u06A9\u0644 \u062F\u0627\u062F\u0647\u200C\u06CC \u0645\u062F\u0631\u0633\u0647\u060C \u0648 \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0627\u0632 \u0631\u0648\u06CC \u0622\u0646 \u062F\u0631 \u0635\u0648\u0631\u062A \u0646\u06CC\u0627\u0632. \u062F\u06A9\u0645\u0647\u200C\u06CC \u00AB\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u0647 D1\u00BB \u06CC\u06A9 \u0627\u0628\u0632\u0627\u0631 \u0641\u0646\u06CC \u0628\u0631\u0627\u06CC \u0633\u0631\u0639\u062A\u200C\u0628\u062E\u0634\u06CC\u062F\u0646 \u0628\u0647 \u067E\u0627\u06CC\u06AF\u0627\u0647\u200C\u062F\u0627\u062F\u0647\u200C\u06CC \u0645\u062F\u0631\u0633\u0647 \u0627\u0633\u062A \u2014 \u0645\u0639\u0645\u0648\u0644\u0627\u064B \u0646\u06CC\u0627\u0632\u06CC \u0628\u0647 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0622\u0646 \u0646\u06CC\u0633\u062A \u0645\u06AF\u0631 \u06A9\u0633\u06CC \u06A9\u0647 \u067E\u0631\u0648\u0698\u0647 \u0631\u0627 \u0628\u0631\u0627\u06CC\u062A\u0627\u0646 \u0631\u0627\u0647\u200C\u0627\u0646\u062F\u0627\u0632\u06CC \u06A9\u0631\u062F\u0647 \u062A\u0648\u0636\u06CC\u062D \u062E\u0627\u0635\u06CC \u062F\u0627\u062F\u0647 \u0628\u0627\u0634\u062F.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631:"),
                " \u0627\u06AF\u0631 \u0645\u0639\u0644\u0645\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\u0634 \u0631\u0627 \u0641\u0631\u0627\u0645\u0648\u0634 \u06A9\u0646\u062F\u060C \u0644\u06CC\u0646\u06A9 \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0628\u0647 \u0627\u06CC\u0645\u06CC\u0644 \u062B\u0628\u062A\u200C\u0634\u062F\u0647\u200C\u06CC \u0627\u0648 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u06A9\u0627\u0631 \u0627\u06CC\u0645\u06CC\u0644 \u0647\u0631 \u0645\u0639\u0644\u0645 \u0628\u0627\u06CC\u062F \u062F\u0631 \u0633\u0627\u0645\u0627\u0646\u0647 \u0635\u062D\u06CC\u062D \u062B\u0628\u062A \u0634\u062F\u0647 \u0628\u0627\u0634\u062F.",
                React.createElement("br", null),
                React.createElement("br", null),
                "\u0628\u0631\u0627\u06CC \u062E\u0631\u0648\u062C \u0627\u0632 \u062D\u0633\u0627\u0628 \u06CC\u0627 \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\u060C \u0627\u0632 \u067E\u0627\u06CC\u06CC\u0646 \u0647\u0645\u06CC\u0646 \u0645\u0646\u0648 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646."))),
        showOwnSettings && (React.createElement(AdminProfileModal, { teacher: teacher, onClose: () => setShowOwnSettings(false), onSaved: (updated) => { onUpdateSelf && onUpdateSelf(updated); } }))));
}
/* ---------------------------------------------------------
   ADMIN RESULTS & REPORTS — school-wide performance overview
--------------------------------------------------------- */
function AdminResultsScreen({ exams, teachers, teacherByUsername, classes, roster, students, questions, answers, teacherFilter, onTeacherFilterChange, adminTeacher, refresh, aiAllowed }) {
    const [drillExamId, setDrillExamId] = useState(null);
    const visibleExams = teacherFilter ? exams.filter((e) => e.teacher_id === teacherFilter) : exams;
    const visibleExamIds = new Set(visibleExams.map((e) => e.id));
    const visibleAnswers = answers.filter((a) => visibleExamIds.has(a.exam_id));
    // One row per exam attempt (student), with its overall percentage — mirrors
    // the per-exam grouping ResultsScreen uses, but across every visible exam at once.
    const byAttempt = {};
    visibleAnswers.forEach((a) => {
        const key = a.student_id;
        byAttempt[key] = byAttempt[key] || [];
        byAttempt[key].push(a);
    });
    const attemptRows = Object.entries(byAttempt).map(([studentId, list]) => {
        const student = students.find((s) => s.id === studentId);
        const exam = exams.find((e) => e.id === list[0].exam_id);
        const totalMarks = list.reduce((s, a) => s + (a.mark || 1), 0);
        const gotMarks = list.reduce((s, a) => s + awardedMarkOf(a), 0);
        const pct = totalMarks ? Math.round((gotMarks / totalMarks) * 1000) / 10 : 0;
        return {
            studentId, pct, teacherId: exam?.teacher_id, examId: exam?.id,
            classCode: student?.class_code || null,
        };
    }).filter((r) => r.teacherId);
    const avg = attemptRows.length ? Math.round((attemptRows.reduce((s, r) => s + r.pct, 0) / attemptRows.length) * 10) / 10 : 0;
    const passRate = attemptRows.length ? Math.round((attemptRows.filter((r) => r.pct >= 50).length / attemptRows.length) * 100) : 0;
    const examsHeldCount = new Set(attemptRows.map((r) => r.examId)).size;
    const byTeacher = {};
    attemptRows.forEach((r) => {
        byTeacher[r.teacherId] = byTeacher[r.teacherId] || [];
        byTeacher[r.teacherId].push(r);
    });
    const teacherRankings = Object.entries(byTeacher).map(([username, rows]) => ({
        username,
        name: teacherByUsername[username]?.fullname || username,
        avg: Math.round((rows.reduce((s, r) => s + r.pct, 0) / rows.length) * 10) / 10,
        participantCount: rows.length,
        examCount: new Set(rows.map((r) => r.examId)).size,
    })).sort((a, b) => b.avg - a.avg);
    const byClass = {};
    attemptRows.forEach((r) => {
        const key = r.classCode || "بدون کلاس";
        byClass[key] = byClass[key] || [];
        byClass[key].push(r);
    });
    const classRankings = Object.entries(byClass).map(([cls, rows]) => ({
        cls,
        avg: Math.round((rows.reduce((s, r) => s + r.pct, 0) / rows.length) * 10) / 10,
        participantCount: rows.length,
    })).sort((a, b) => b.avg - a.avg);
    const drillExam = exams.find((e) => e.id === drillExamId);
    return (React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 18, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" } },
            React.createElement("span", { style: { fontSize: 13, color: "#64748B" } }, "\u0641\u06CC\u0644\u062A\u0631 \u0645\u0639\u0644\u0645:"),
            React.createElement("select", { value: teacherFilter, onChange: (e) => { onTeacherFilterChange(e.target.value); setDrillExamId(null); }, style: { ...inputStyle, width: "auto", padding: "8px 12px" } },
                React.createElement("option", { value: "" }, "\u0647\u0645\u0647 \u0645\u0639\u0644\u0645\u0627\u0646"),
                teachers.map((t) => React.createElement("option", { key: t.username, value: t.username }, t.fullname)))),
        React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 } },
            React.createElement(StatCard, { icon: TrendingUp, label: "\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0646\u0645\u0631\u0647 (\u06A9\u0644)", value: `${avg}%`, color: "#2563EB" }),
            React.createElement(StatCard, { icon: CheckCircle2, label: "\u062F\u0631\u0635\u062F \u0642\u0628\u0648\u0644\u06CC", value: `${passRate}%`, color: "#8B5CF6" }),
            React.createElement(StatCard, { icon: Users, label: "\u062A\u0639\u062F\u0627\u062F \u0634\u0631\u06A9\u062A\u200C\u0647\u0627", value: attemptRows.length, color: "#0EA5E9" }),
            React.createElement(StatCard, { icon: FileText, label: "\u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u06CC \u0628\u0631\u06AF\u0632\u0627\u0631\u0634\u062F\u0647", value: examsHeldCount, color: "#16A34A" })),
        attemptRows.length === 0 ? (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
            React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0647\u06CC\u0686 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u062F\u0631 \u0622\u0632\u0645\u0648\u0646\u06CC \u0634\u0631\u06A9\u062A \u0646\u06A9\u0631\u062F\u0647 \u0627\u0633\u062A." }))) : (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 } },
                React.createElement("div", { style: { flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 14 } }, "\u0645\u0642\u0627\u06CC\u0633\u0647 \u0645\u0639\u0644\u0645\u0627\u0646"),
                    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, teacherRankings.map((t) => (React.createElement("div", { key: t.username },
                        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#334155", marginBottom: 4 } },
                            React.createElement("span", null,
                                t.name,
                                " ",
                                React.createElement("span", { style: { color: "#94A3B8", fontSize: 11 } },
                                    "(",
                                    t.participantCount,
                                    " \u0634\u0631\u06A9\u062A\u060C ",
                                    t.examCount,
                                    " \u0622\u0632\u0645\u0648\u0646)")),
                            React.createElement("span", { style: { fontWeight: 800, color: t.avg >= 50 ? "#16A34A" : "#DC2626" } },
                                t.avg,
                                "%")),
                        React.createElement("div", { style: { height: 7, background: "#EEF1F6", borderRadius: 4, overflow: "hidden" } },
                            React.createElement("div", { style: { width: `${t.avg}%`, height: "100%", background: t.avg >= 50 ? "#16A34A" : "#DC2626" } }))))))),
                React.createElement("div", { style: { flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 14 } }, "\u0645\u0642\u0627\u06CC\u0633\u0647 \u06A9\u0644\u0627\u0633\u200C\u0647\u0627"),
                    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, classRankings.map((c) => (React.createElement("div", { key: c.cls },
                        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#334155", marginBottom: 4 } },
                            React.createElement("span", null,
                                c.cls,
                                " ",
                                React.createElement("span", { style: { color: "#94A3B8", fontSize: 11 } },
                                    "(",
                                    c.participantCount,
                                    " \u0634\u0631\u06A9\u062A)")),
                            React.createElement("span", { style: { fontWeight: 800, color: c.avg >= 50 ? "#16A34A" : "#DC2626" } },
                                c.avg,
                                "%")),
                        React.createElement("div", { style: { height: 7, background: "#EEF1F6", borderRadius: 4, overflow: "hidden" } },
                            React.createElement("div", { style: { width: `${c.avg}%`, height: "100%", background: c.avg >= 50 ? "#16A34A" : "#DC2626" } })))))))),
            React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 14 } }, "\u0646\u062A\u0627\u06CC\u062C \u0631\u06CC\u0632 \u06CC\u06A9 \u0622\u0632\u0645\u0648\u0646"),
                !drillExamId ? (React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" } },
                    React.createElement("span", { style: { fontSize: 13, color: "#64748B" } }, "\u0627\u0646\u062A\u062E\u0627\u0628 \u0622\u0632\u0645\u0648\u0646:"),
                    React.createElement("select", { value: "", onChange: (e) => setDrillExamId(e.target.value), style: { ...inputStyle, width: "auto", padding: "8px 12px" } },
                        React.createElement("option", { value: "", disabled: true }, "\u06CC\u06A9 \u0622\u0632\u0645\u0648\u0646 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646..."),
                        visibleExams.map((e) => (React.createElement("option", { key: e.id, value: e.id },
                            e.title,
                            " \u2014 ",
                            teacherByUsername[e.teacher_id]?.fullname || "—")))))) : (React.createElement("div", null,
                    React.createElement("div", { onClick: () => setDrillExamId(null), style: { fontSize: 12.5, color: "#2563EB", cursor: "pointer", fontWeight: 700, marginBottom: 10 } }, "\u2190 \u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0644\u06CC\u0633\u062A \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627"),
                    React.createElement(ResultsScreen, { teacher: adminTeacher, exams: exams, questions: questions, students: students, answers: answers, roster: roster, classes: classes, examsOverride: visibleExams, examLabelFn: (e) => `${e.title} — ${teacherByUsername[e.teacher_id]?.fullname || "—"}`, initialExamId: drillExamId, hideTopBar: true, refresh: refresh, aiAllowed: aiAllowed }))))))));
}
/* ---------------------------------------------------------
   ADMIN BACKUP & RESTORE — full school-wide data snapshot
--------------------------------------------------------- */
function AdminBackupScreen({ refresh, teacher, onUpdateSelf, mySchool, setMySchool }) {
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgTone, setMsgTone] = useState("blue");
    const [confirmingRestore, setConfirmingRestore] = useState(null); // holds the parsed file data awaiting confirmation
    // مدرسه از AdminDashboardScreen (والد) گرفته می‌شه، نه با یه fetch جدا —
    // چون همون state هم برای رنگ/لوگوی سایدبار استفاده می‌شه؛ اگه اینجا یه
    // کپی محلی جدا نگه می‌داشتیم، بعد از ذخیره‌ی برندینگ، سایدبار (که از
    // state جدای خودش می‌خوند) هیچ‌وقت به‌روز نمی‌شد و انگار «تغییر برنمی‌گشت».
    const saveBranding = async (fields) => {
        const updated = { ...mySchool, ...fields };
        const ok = await setJSON(`school:${teacher.school_id}`, updated);
        if (!ok)
            throw new Error("save failed");
        setMySchool(updated);
    };
    const [loginCodeBusy, setLoginCodeBusy] = useState(false);
    const regenerateLoginCode = async () => {
        if (!window.confirm("کد ورود فعلیِ مدرسه از کار می‌افتد و باید کد جدید به همه‌ی معلم‌ها و دانش‌آموزها اطلاع داده شود. ادامه می‌دهید؟"))
            return;
        setLoginCodeBusy(true);
        const { login_code, ...rest } = mySchool;
        const result = await setJSONReturn(`school:${teacher.school_id}`, rest);
        if (result.ok && result.v) {
            setMySchool(result.v);
            setMsg("کد جدید ساخته شد.");
            setMsgTone("green");
        }
        else {
            setMsg(result.error || "خطا در ساخت کد جدید.");
            setMsgTone("red");
        }
        setLoginCodeBusy(false);
    };
    const ALL_PREFIXES = ["teacher:", "exam:", "question:", "class:", "roster:", "message:"];
    const exportBackup = async () => {
        setBusy(true);
        setMsg("در حال آماده‌سازی فایل پشتیبان...");
        setMsgTone("blue");
        try {
            const data = {};
            let count = 0;
            for (const p of ALL_PREFIXES) {
                const keys = await listPrefix(p);
                for (const k of keys) {
                    data[k] = await getJSON(k);
                    count++;
                }
            }
            // دانش‌آموزها/پاسخ‌ها/هشدارهای تقلب دیگه در KV نیستن (فقط D1) — پس
            // به‌جای listPrefix، از همون endpoint اسکوپ‌شده‌ی داشبورد می‌گیریمشون.
            const dashData = await loadTeacherDashboardData();
            dashData.students.forEach((s) => { data[`student:${s.id}`] = s; count++; });
            const answersByStudent = {};
            dashData.answers.forEach((a) => { (answersByStudent[a.student_id] = answersByStudent[a.student_id] || []).push(a); });
            Object.entries(answersByStudent).forEach(([sid, batch]) => { data[`answers:${sid}`] = batch; count++; });
            dashData.cheatalerts.forEach((a) => { data[`cheatalert:${a.id}`] = a; count++; });
            const stamp = new Date().toISOString().slice(0, 10);
            downloadTextFile(`majazi-backup-${stamp}.json`, JSON.stringify(data, null, 2), "application/json");
            setMsg(`پشتیبان کامل مدرسه دانلود شد (${count} مورد).`);
            setMsgTone("green");
        }
        catch {
            setMsg("خطا در ساخت فایل پشتیبان.");
            setMsgTone("red");
        }
        setBusy(false);
    };
    const pickFile = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file)
            return;
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            const keys = Object.keys(data);
            const hasTeacher = keys.some((k) => k.startsWith("teacher:"));
            if (keys.length === 0 || !hasTeacher) {
                setMsg("این فایل یک پشتیبان معتبر مجازی به نظر نمی‌رسد.");
                setMsgTone("red");
                return;
            }
            setConfirmingRestore({ data, keys });
        }
        catch {
            setMsg("فایل نامعتبر است.");
            setMsgTone("red");
        }
    };
    const doRestore = async () => {
        if (!confirmingRestore)
            return;
        setBusy(true);
        setMsg("در حال بازیابی...");
        setMsgTone("blue");
        try {
            const { data, keys } = confirmingRestore;
            for (const k of keys) {
                await setJSON(k, data[k]);
            }
            setConfirmingRestore(null);
            await refresh();
            setMsg(`${keys.length} مورد با موفقیت بازیابی شد.`);
            setMsgTone("green");
        }
        catch {
            setMsg("خطایی در بازیابی رخ داد.");
            setMsgTone("red");
        }
        setBusy(false);
    };
    const [d1Busy, setD1Busy] = useState(false);
    const [d1Msg, setD1Msg] = useState("");
    const [d1MsgTone, setD1MsgTone] = useState("blue");
    // --- مهاجرت یک‌بارمصرف به مدل «مدرسه‌ها» (فقط تا وقتی این حساب admin
    // هنوز school_id نداره نمایش داده می‌شه — یعنی نصب هنوز قدیمیه) ---
    const [saBusy, setSaBusy] = useState(false);
    const [saMsg, setSaMsg] = useState("");
    const [saMsgTone, setSaMsgTone] = useState("blue");
    const [saSchoolName, setSaSchoolName] = useState("مدرسه من");
    const [saFullname, setSaFullname] = useState("");
    const [saUsername, setSaUsername] = useState("");
    const [saPassword, setSaPassword] = useState("");
    const [saEmail, setSaEmail] = useState("");
    const migrateToSchools = async () => {
        setSaMsg("");
        if (!saSchoolName.trim() || !saFullname.trim() || !saUsername.trim() || !saPassword || !saEmail.trim()) {
            setSaMsg("همه فیلدها را پر کنید.");
            setSaMsgTone("red");
            return;
        }
        if (saPassword.length < 8) {
            setSaMsg("رمز عبور مدیر سایت باید حداقل ۸ کاراکتر باشد.");
            setSaMsgTone("red");
            return;
        }
        setSaBusy(true);
        setSaMsg("در حال مهاجرت...");
        setSaMsgTone("blue");
        try {
            const r = await fetch("/api/admin/migrate-to-schools", {
                method: "POST",
                headers: authHeaders({ "Content-Type": "application/json" }),
                body: JSON.stringify({
                    schoolName: saSchoolName.trim(),
                    superAdmin: {
                        fullname: saFullname.trim(),
                        username: saUsername.trim(),
                        email: saEmail.trim(),
                        passwordHash: await hashPassword(saPassword),
                    },
                }),
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setSaMsg(data.error || "مهاجرت با خطا مواجه شد.");
                setSaMsgTone("red");
            }
            else {
                setSaMsg(`انجام شد. حساب «${saUsername.trim()}» به‌عنوان مدیر سایت ساخته شد — از این پس با همون وارد شو تا مدرسه‌های دیگه رو هم مدیریت کنی.`);
                setSaMsgTone("green");
                const updatedSelf = await getJSON(`teacher:${teacher.username}`);
                if (updatedSelf)
                    onUpdateSelf && onUpdateSelf(updatedSelf);
                await refresh();
            }
        }
        catch {
            setSaMsg("اتصال برقرار نشد.");
            setSaMsgTone("red");
        }
        setSaBusy(false);
    };
    const saToneColor = { blue: "#2563EB", green: "#16A34A", red: "#DC2626" }[saMsgTone] || "#2563EB";
    const migrateToD1 = async () => {
        setD1Busy(true);
        setD1Msg("در حال انتقال داده‌ها به D1...");
        setD1MsgTone("blue");
        try {
            const r = await fetch("/api/admin/migrate-to-d1", { method: "POST", headers: authHeaders() });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setD1Msg(data.error || "انتقال با خطا مواجه شد.");
                setD1MsgTone("red");
            }
            else {
                const breakdown = Object.entries(data.migrated || {}).map(([k, v]) => `${k} ${v}`).join(" — ");
                const total = Object.values(data.migrated || {}).reduce((s, n) => s + n, 0);
                const errCount = (data.errors || []).length;
                if (errCount > 0) {
                    setD1Msg(`${total} مورد پردازش شد، ولی ${errCount} مورد خطا داشت:\n${data.errors.join("\n")}`);
                    setD1MsgTone("red");
                }
                else {
                    setD1Msg(`${total} مورد منتقل شد. (${breakdown})`);
                    setD1MsgTone("green");
                }
            }
        }
        catch {
            setD1Msg("اتصال برقرار نشد.");
            setD1MsgTone("red");
        }
        setD1Busy(false);
    };
    const toneColor = { blue: "#2563EB", green: "#16A34A", red: "#DC2626" }[msgTone] || "#2563EB";
    const d1ToneColor = { blue: "#2563EB", green: "#16A34A", red: "#DC2626" }[d1MsgTone] || "#2563EB";
    return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20, maxWidth: 520 } },
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u062F\u0627\u0646\u0644\u0648\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u06A9\u0627\u0645\u0644 \u0645\u062F\u0631\u0633\u0647"),
            React.createElement("div", { style: { fontSize: 12.5, color: "#64748B", marginBottom: 16 } }, "\u06CC\u06A9 \u0641\u0627\u06CC\u0644 \u0634\u0627\u0645\u0644 \u0647\u0645\u0647\u200C\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u062F\u0631\u0633\u0647 \u0645\u06CC\u200C\u0633\u0627\u0632\u0647: \u062D\u0633\u0627\u0628\u200C\u0647\u0627\u06CC \u0645\u0639\u0644\u0645\u0627\u0646\u060C \u06A9\u0644\u0627\u0633\u200C\u0628\u0646\u062F\u06CC\u060C \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646\u060C \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u060C \u0633\u0648\u0627\u0644\u0627\u062A \u0648 \u0646\u062A\u0627\u06CC\u062C. \u062A\u0648\u0635\u06CC\u0647 \u0645\u06CC\u200C\u0634\u0647 \u0647\u0631 \u0686\u0646\u062F \u0648\u0642\u062A \u06CC\u06A9\u200C\u0628\u0627\u0631 (\u0645\u062B\u0644\u0627\u064B \u0642\u0628\u0644 \u0627\u0632 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u0628\u0632\u0631\u06AF) \u06CC\u06A9 \u0646\u0633\u062E\u0647 \u062F\u0627\u0646\u0644\u0648\u062F \u0648 \u062C\u0627\u06CC\u06CC \u0627\u0645\u0646 \u0646\u06AF\u0647\u200C\u062F\u0627\u0631\u06CC \u0628\u0634\u0647."),
            React.createElement(Button, { onClick: exportBackup, disabled: busy },
                React.createElement(Download, { size: 15 }),
                "\u062F\u0627\u0646\u0644\u0648\u062F \u0641\u0627\u06CC\u0644 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646")),
        teacher.school_id && mySchool && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u06A9\u062F \u0648\u0631\u0648\u062F \u0645\u062F\u0631\u0633\u0647"),
            React.createElement("div", { style: { fontSize: 12.5, color: "#64748B", marginBottom: 16 } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0647\u0627\u06CC \u0627\u06CC\u0646 \u0645\u062F\u0631\u0633\u0647 \u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F \u0628\u0647 \u067E\u0631\u062A\u0627\u0644 \u06CC\u0627 \u0686\u062A \u06A9\u0644\u0627\u0633\u06CC\u060C \u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0647\u0645\u0631\u0627\u0647 \u0628\u0627 \u06A9\u062F \u0634\u062E\u0635\u06CC \u062E\u0648\u062F\u0634\u0627\u0646 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u06A9\u0646\u0646\u062F. \u0627\u06CC\u0646 \u06A9\u062F \u0628\u06CC\u0646 \u0647\u0645\u0647\u200C\u06CC \u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u06CC \u0645\u062F\u0631\u0633\u0647 \u0645\u0634\u062A\u0631\u06A9 \u0627\u0633\u062A."),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
                React.createElement("span", { style: { fontFamily: "monospace", fontSize: 20, fontWeight: 800, color: "#2563EB", letterSpacing: 3, background: "#EFF6FF", padding: "8px 16px", borderRadius: 10 } }, mySchool.login_code || "—"),
                React.createElement("span", { onClick: loginCodeBusy ? undefined : regenerateLoginCode, style: { fontSize: 12, color: loginCodeBusy ? "#94A3B8" : "#DC2626", fontWeight: 700, cursor: loginCodeBusy ? "default" : "pointer" } }, loginCodeBusy ? "در حال ساخت..." : "کد جدید")))),
        teacher.school_id && mySchool && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u0644\u0648\u06AF\u0648 \u0648 \u0631\u0646\u06AF \u0627\u062E\u062A\u0635\u0627\u0635\u06CC \u0645\u062F\u0631\u0633\u0647"),
            React.createElement("div", { style: { fontSize: 12.5, color: "#64748B", marginBottom: 16 } }, "\u0628\u0639\u062F \u0627\u0632 \u0648\u0631\u0648\u062F\u060C \u067E\u0646\u0644 \u0645\u062F\u0631\u0633\u0647\u200C\u06CC \u062E\u0648\u062F\u062A (\u0633\u0627\u06CC\u062F\u0628\u0627\u0631 \u0648 \u0644\u0648\u06AF\u0648) \u0628\u0627 \u0627\u06CC\u0646 \u0631\u0646\u06AF \u0648 \u0644\u0648\u06AF\u0648 \u0646\u0634\u0648\u0646 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0647. \u0635\u0641\u062D\u0647\u200C\u06CC \u0648\u0631\u0648\u062F \u0645\u0634\u062A\u0631\u06A9 \u0628\u06CC\u0646 \u0647\u0645\u0647\u200C\u06CC \u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627\u0633\u062A \u0648 \u062A\u063A\u06CC\u06CC\u0631 \u0646\u0645\u06CC\u200C\u06A9\u0646\u0647."),
            React.createElement(SchoolBrandingEditor, { school: mySchool, onSave: saveBranding }))),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u0627\u0646\u062A\u0642\u0627\u0644 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC \u0628\u0647 D1 (\u06CC\u06A9\u200C\u0628\u0627\u0631 \u0645\u0635\u0631\u0641)"),
            React.createElement("div", { style: { fontSize: 12.5, color: "#64748B", marginBottom: 16 } }, "\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u062C\u062F\u06CC\u062F \u0627\u0632 \u0627\u06CC\u0646 \u0628\u0647 \u0628\u0639\u062F \u062E\u0648\u062F\u06A9\u0627\u0631 \u0647\u0645 \u062F\u0631 D1 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0646 \u062A\u0627 \u0635\u0641\u062D\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646 \u0648 \u0648\u0631\u0648\u062F \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u0633\u0631\u06CC\u0639\u200C\u062A\u0631 \u0648 \u0633\u0628\u06A9\u200C\u062A\u0631 \u0628\u0634\u0647. \u0627\u0645\u0627 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 (\u0642\u0628\u0644 \u0627\u0632 \u0627\u06CC\u0646 \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC) \u0628\u0627\u06CC\u062F \u06CC\u06A9\u200C\u0628\u0627\u0631 \u0628\u0627 \u0647\u0645\u06CC\u0646 \u062F\u06A9\u0645\u0647 \u0645\u0646\u062A\u0642\u0644 \u0628\u0634\u0646. \u0627\u062C\u0631\u0627\u06CC \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u0634 \u0647\u0645 \u0645\u0634\u06A9\u0644\u06CC \u0646\u062F\u0627\u0631\u0647."),
            React.createElement(Button, { onClick: migrateToD1, disabled: d1Busy }, "\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u0647 D1"),
            d1Msg && React.createElement("div", { style: { fontSize: 13, color: d1ToneColor, fontWeight: 600, marginTop: 10, whiteSpace: "pre-wrap" } }, d1Msg)),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0627\u0632 \u0641\u0627\u06CC\u0644 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646"),
            React.createElement("div", { style: { fontSize: 12.5, color: "#64748B", marginBottom: 16 } }, "\u0647\u0631 \u0686\u06CC\u0632\u06CC \u06A9\u0647 \u062F\u0631 \u0641\u0627\u06CC\u0644 \u0628\u0627\u0634\u0647 \u0628\u0627\u0632\u0646\u0648\u06CC\u0633\u06CC \u0645\u06CC\u200C\u0634\u0647 (\u0631\u0648\u06CC \u062F\u0627\u062F\u0647\u200C\u06CC \u0641\u0639\u0644\u06CC \u0645\u06CC\u200C\u0634\u06CC\u0646\u0647). \u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u062F\u0631 \u0641\u0627\u06CC\u0644 \u0646\u06CC\u0633\u062A\u0646 \u062D\u0630\u0641 \u0646\u0645\u06CC\u200C\u0634\u0646. \u0627\u06CC\u0646 \u06A9\u0627\u0631 \u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A \u0646\u06CC\u0633\u062A\u060C \u0645\u06AF\u0631 \u0627\u06CC\u0646\u06A9\u0647 \u062E\u0648\u062F\u062A \u0647\u0645 \u0627\u0632 \u0648\u0636\u0639\u06CC\u062A \u0641\u0639\u0644\u06CC \u06CC\u06A9 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u062C\u062F\u0627 \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u06CC."),
            React.createElement("label", { style: {
                    display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10,
                    fontSize: 14, fontWeight: 700, cursor: busy ? "default" : "pointer", background: "#fff", color: "#334155",
                    border: "1.5px solid #E2E8F0", opacity: busy ? 0.6 : 1,
                } },
                "\u0627\u0646\u062A\u062E\u0627\u0628 \u0641\u0627\u06CC\u0644 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646",
                React.createElement("input", { type: "file", accept: "application/json", onChange: pickFile, disabled: busy, style: { display: "none" } }))),
        !teacher.school_id && (React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1.5px solid #FDE68A", padding: 24 } },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u0627\u0631\u062A\u0642\u0627 \u0628\u0647 \u0633\u0627\u0645\u0627\u0646\u0647\u200C\u06CC \u0686\u0646\u062F \u0645\u062F\u0631\u0633\u0647\u200C\u0627\u06CC (\u06CC\u06A9\u200C\u0628\u0627\u0631 \u0645\u0635\u0631\u0641)"),
            React.createElement("div", { style: { fontSize: 12.5, color: "#64748B", marginBottom: 16, lineHeight: 1.9 } }, "\u0627\u06CC\u0646 \u0646\u0635\u0628 \u0647\u0646\u0648\u0632 \u0628\u0647 \u0645\u062F\u0644 \u00AB\u0686\u0646\u062F \u0645\u062F\u0631\u0633\u0647\u00BB \u0645\u0646\u062A\u0642\u0644 \u0646\u0634\u062F\u0647. \u0628\u0627 \u062A\u06A9\u0645\u06CC\u0644 \u0641\u0631\u0645 \u0632\u06CC\u0631\u060C \u06CC\u06A9 \u0645\u062F\u0631\u0633\u0647 \u0628\u0627 \u062A\u0645\u0627\u0645 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0641\u0639\u0644\u06CC (\u0645\u0639\u0644\u0645\u0627\u0646\u060C \u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u060C \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627 \u0648...) \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0647 \u0648 \u06CC\u06A9 \u062D\u0633\u0627\u0628 \u0645\u0633\u062A\u0642\u0644 \u00AB\u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A\u00BB \u0645\u06CC\u200C\u0633\u0627\u0632\u06CC\u0645 \u06A9\u0647 \u0645\u06CC\u200C\u062A\u0648\u0646\u0647 \u0628\u0639\u062F\u0627\u064B \u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627\u06CC \u0628\u06CC\u0634\u062A\u0631\u06CC \u0647\u0645 \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646\u0647. \u062D\u0633\u0627\u0628 \u0641\u0639\u0644\u06CC \u0647\u0645\u06CC\u0646\u200C\u062C\u0648\u0631\u06CC \u0628\u0647 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0647\u0645\u06CC\u0646 \u0645\u062F\u0631\u0633\u0647 \u0627\u062F\u0627\u0645\u0647 \u0645\u06CC\u200C\u062F\u0647."),
            React.createElement(Field, { label: "\u0646\u0627\u0645 \u0645\u062F\u0631\u0633\u0647" },
                React.createElement(TextInput, { value: saSchoolName, onChange: (e) => setSaSchoolName(e.target.value) })),
            React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A" },
                React.createElement(TextInput, { value: saFullname, onChange: (e) => setSaFullname(e.target.value) })),
            React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A" },
                React.createElement(TextInput, { value: saUsername, onChange: (e) => setSaUsername(e.target.value) })),
            React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A" },
                React.createElement(TextInput, { type: "password", value: saPassword, onChange: (e) => setSaPassword(e.target.value) })),
            React.createElement(Field, { label: "\u0627\u06CC\u0645\u06CC\u0644 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A" },
                React.createElement(TextInput, { type: "email", value: saEmail, onChange: (e) => setSaEmail(e.target.value) })),
            React.createElement(Button, { onClick: migrateToSchools, disabled: saBusy }, "\u0633\u0627\u062E\u062A \u0645\u062F\u0631\u0633\u0647 \u0648 \u062D\u0633\u0627\u0628 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A"),
            saMsg && React.createElement("div", { style: { fontSize: 13, color: saToneColor, fontWeight: 600, marginTop: 10, whiteSpace: "pre-wrap" } }, saMsg))),
        msg && React.createElement("div", { style: { fontSize: 13, color: toneColor, fontWeight: 600 } }, msg),
        confirmingRestore && (React.createElement(Modal, { onClose: () => setConfirmingRestore(null), title: "\u062A\u0623\u06CC\u06CC\u062F \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC" },
            React.createElement("div", { style: { fontSize: 13.5, color: "#334155", lineHeight: 1.9, marginBottom: 18 } },
                "\u0627\u06CC\u0646 \u0641\u0627\u06CC\u0644 \u0634\u0627\u0645\u0644 ",
                React.createElement("b", null, confirmingRestore.keys.length),
                " \u0645\u0648\u0631\u062F \u062F\u0627\u062F\u0647\u200C\u0633\u062A. \u0628\u0627 \u0627\u062F\u0627\u0645\u0647\u060C \u0627\u06CC\u0646 \u062F\u0627\u062F\u0647\u200C\u0647\u0627 \u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646 \u0646\u0633\u062E\u0647\u200C\u06CC \u0641\u0639\u0644\u06CC\u200C\u0634\u0648\u0646 \u062F\u0631 \u0645\u062F\u0631\u0633\u0647 \u0645\u06CC\u200C\u0634\u0646. \u0627\u06CC\u0646 \u06A9\u0627\u0631 \u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A \u0646\u06CC\u0633\u062A. \u0645\u0637\u0645\u0626\u0646\u06CC\u061F"),
            React.createElement("div", { style: { display: "flex", gap: 10 } },
                React.createElement(Button, { onClick: doRestore, disabled: busy }, "\u0628\u0644\u0647\u060C \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u06A9\u0646"),
                React.createElement(Button, { variant: "ghost", onClick: () => setConfirmingRestore(null) }, "\u0627\u0646\u0635\u0631\u0627\u0641"))))));
}

/* ===== screens-superadmin.js ===== */
"use strict";
/* ---------------------------------------------------------
   SUPER-ADMIN DASHBOARD (top tier — creates schools, and one
   admin account per school; has no single-school data of its own)
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
// فهرست «قابلیت‌های» قابل‌کنترل به‌صورت شخصی برای هر مدیر مدرسه یا معلم مستقل —
// برای افزودن قابلیت جدید در آینده، فقط کافیه یک آیتم دیگه به این آرایه اضافه بشه.
const FEATURE_DEFS = [
    { key: "ai_assistant", label: "استفاده از هوش مصنوعی", defaultOn: false },
    { key: "class_chat", label: "چت کلاسی (گفتگوی معلم و دانش‌آموزان)", defaultOn: true },
];
function FeatureTogglePanel({ features, onToggle }) {
    return (React.createElement("div", { style: { background: "#F8FAFC", borderRadius: 10, padding: 12, marginTop: 8, display: "flex", flexDirection: "column", gap: 8 } }, FEATURE_DEFS.map((f) => {
        const stored = features ? features[f.key] : undefined;
        const enabled = stored === undefined ? !!f.defaultOn : !!stored;
        return (React.createElement("label", { key: f.key, style: { display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "#334155", cursor: "pointer" } },
            React.createElement("input", { type: "checkbox", checked: enabled, onChange: () => onToggle(f.key, !enabled), style: { width: 16, height: 16 } }),
            f.label));
    })));
}
function BulkActionBar({ count, onActivate, onDeactivate, capFields, onApplyCap, onClear, busy }) {
    const [capValues, setCapValues] = useState({});
    if (count === 0)
        return null;
    return (React.createElement("div", { style: {
            display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
            background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 12, padding: "10px 14px", marginBottom: 14,
        } },
        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B" } },
            count,
            " \u0645\u0648\u0631\u062F \u0627\u0646\u062A\u062E\u0627\u0628 \u0634\u062F\u0647"),
        React.createElement(Button, { variant: "ghost", onClick: onActivate, disabled: busy, style: { fontSize: 12.5, padding: "6px 12px" } }, "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u06AF\u0631\u0648\u0647\u06CC"),
        React.createElement(Button, { variant: "ghost", onClick: onDeactivate, disabled: busy, style: { fontSize: 12.5, padding: "6px 12px" } }, "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u06AF\u0631\u0648\u0647\u06CC"),
        capFields.map((f) => (React.createElement("div", { key: f.key, style: { display: "flex", alignItems: "center", gap: 6 } },
            React.createElement("input", { type: "number", min: "1", placeholder: f.label, value: capValues[f.key] ?? "", onChange: (e) => setCapValues((p) => ({ ...p, [f.key]: e.target.value })), style: { width: 74, padding: "6px 8px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12.5 } }),
            React.createElement(Button, { variant: "ghost", onClick: () => { const v = Number(capValues[f.key]); if (v > 0)
                    onApplyCap(f.key, v); }, disabled: busy || !(Number(capValues[f.key]) > 0), style: { fontSize: 12.5, padding: "6px 10px" } },
                "\u0627\u0639\u0645\u0627\u0644 ",
                f.label)))),
        React.createElement("div", { onClick: onClear, style: { marginRight: "auto", fontSize: 12, color: "#64748B", cursor: "pointer" } }, "\u0644\u063A\u0648 \u0627\u0646\u062A\u062E\u0627\u0628")));
}
function CreateSchoolForm({ onCreated, existingUsernames }) {
    const [schoolName, setSchoolName] = useState("");
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        setError("");
        if (!schoolName.trim() || !fullname.trim() || !username.trim() || !password || !email.trim()) {
            setError("همه فیلدها را پر کنید.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("ایمیل معتبر نیست.");
            return;
        }
        if (password.length < 8) {
            setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        if (existingUsernames.includes(username.trim())) {
            setError("این نام کاربری قبلاً استفاده شده است.");
            return;
        }
        setLoading(true);
        const existing = await getJSON(`teacher:${username.trim()}`);
        if (existing) {
            setLoading(false);
            setError("این نام کاربری قبلاً ثبت شده است.");
            return;
        }
        const schoolId = uid();
        const school = { id: schoolId, name: schoolName.trim(), created_at: new Date().toISOString() };
        const admin = {
            username: username.trim(),
            password: await hashPassword(password),
            fullname: fullname.trim(),
            email: email.trim(),
            role: "admin",
            school_id: schoolId,
            created_at: new Date().toISOString(),
        };
        await setJSON(`school:${schoolId}`, school);
        await setJSON(`teacher:${admin.username}`, admin);
        // سرور همین بالا یک «کد ورود» یکتا برای مدرسه ساخته (چون رکورد محلی
        // بالا هنوز login_code نداشت) — برای نشون دادنش به مدیر سایت، رکورد
        // واقعی ذخیره‌شده رو دوباره می‌خونیم.
        const savedSchool = (await getJSON(`school:${schoolId}`)) || school;
        const emailResult = await sendWelcomeEmail({ username: admin.username, fullname: admin.fullname, email: admin.email, role: "admin" });
        setLoading(false);
        onCreated(savedSchool, admin, emailResult);
    };
    const handleKeyDown = (e) => { if (e.key === "Enter")
        submit(); };
    return (React.createElement("div", null,
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u0645\u062F\u0631\u0633\u0647" },
            React.createElement(TextInput, { value: schoolName, onChange: (e) => setSchoolName(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0645\u062B\u0644\u0627\u064B: \u062F\u0628\u06CC\u0631\u0633\u062A\u0627\u0646 \u0634\u0647\u06CC\u062F \u0628\u0647\u0634\u062A\u06CC" })),
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0645\u062F\u06CC\u0631 \u0645\u062F\u0631\u0633\u0647" },
            React.createElement(TextInput, { value: fullname, onChange: (e) => setFullname(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0639\u0644\u06CC \u0631\u0636\u0627\u06CC\u06CC" })),
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0645\u062F\u06CC\u0631" },
            React.createElement(TextInput, { value: username, onChange: (e) => setUsername(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u06CC\u06A9 \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u06CC\u06A9\u062A\u0627" })),
        React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0648\u0644\u06CC\u0647\u200C\u06CC \u0645\u062F\u06CC\u0631" },
            React.createElement(TextInput, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631" })),
        React.createElement(Field, { label: "\u0627\u06CC\u0645\u06CC\u0644 \u0645\u062F\u06CC\u0631" },
            React.createElement(TextInput, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0628\u0631\u0627\u06CC \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0645\u062F\u06CC\u0631 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F" })),
        error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
        React.createElement(Button, { type: "button", onClick: submit, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: loading }, loading ? "در حال ساخت..." : "ساخت مدرسه و حساب مدیر")));
}
function SchoolDetailModal({ school, admins, teacherCount, existingUsernames, onClose, onChanged }) {
    // یه نسخه‌ی محلی از مدرسه نگه می‌داریم و بعد از هر ذخیره بلافاصله
    // به‌روزش می‌کنیم — چون اگه فقط به prop «school» (که از refresh() والد
    // میاد) تکیه کنیم، ممکنه بلافاصله بعد از نوشتن توی KV یه بار دیگه از KV
    // خونده بشه و به‌خاطر تأخیر انتشار جهانی KV (eventual consistency)
    // نسخه‌ی قدیمی برگرده و انگار تغییر «برگشت خورده».
    const [schoolState, setSchoolState] = useState(school);
    const [name, setName] = useState(school.name);
    const [active, setActive] = useState(school.active !== false);
    const [maxClasses, setMaxClasses] = useState(school.max_classes || 16);
    const [maxExamsPerClassPerDay, setMaxExamsPerClassPerDay] = useState(school.max_exams_per_class_per_day || 1);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    const saveDetails = async () => {
        if (!name.trim()) {
            setMsg("نام مدرسه نمی‌تواند خالی باشد.");
            return;
        }
        const mc = Number(maxClasses);
        if (!mc || mc < 1) {
            setMsg("سقف تعداد کلاس باید حداقل ۱ باشد.");
            return;
        }
        const mepd = Number(maxExamsPerClassPerDay);
        if (!mepd || mepd < 1) {
            setMsg("سقف تعداد امتحان روزانه‌ی هر کلاس باید حداقل ۱ باشد.");
            return;
        }
        setSaving(true);
        setMsg("");
        const updated = { ...schoolState, name: name.trim(), active, max_classes: mc, max_exams_per_class_per_day: mepd };
        await setJSON(`school:${schoolState.id}`, updated);
        setSchoolState(updated);
        setSaving(false);
        setMsg("ذخیره شد.");
        onChanged();
    };
    const [regenBusy, setRegenBusy] = useState(false);
    const regenerateLoginCode = async () => {
        if (!window.confirm("کد ورود فعلیِ مدرسه از کار می‌افتد و باید کد جدید به همه‌ی معلم‌ها و دانش‌آموزها اطلاع داده شود. ادامه می‌دهید؟"))
            return;
        setRegenBusy(true);
        const { login_code, ...rest } = schoolState;
        const result = await setJSONReturn(`school:${schoolState.id}`, rest);
        if (result.ok && result.v)
            setSchoolState(result.v);
        setRegenBusy(false);
        onChanged();
    };
    const saveBranding = async (fields) => {
        const updated = { ...schoolState, name: name.trim() || schoolState.name, active, max_classes: Number(maxClasses) || 16, max_exams_per_class_per_day: Number(maxExamsPerClassPerDay) || 1, ...fields };
        await setJSON(`school:${schoolState.id}`, updated);
        setSchoolState(updated);
        onChanged();
    };
    const [showAddAdmin, setShowAddAdmin] = useState(false);
    const [afullname, setAFullname] = useState("");
    const [ausername, setAUsername] = useState("");
    const [apassword, setAPassword] = useState("");
    const [aemail, setAEmail] = useState("");
    const [aerror, setAError] = useState("");
    const [abusy, setABusy] = useState(false);
    const addAdmin = async () => {
        setAError("");
        if (!afullname.trim() || !ausername.trim() || !apassword || !aemail.trim()) {
            setAError("همه فیلدها را پر کنید.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aemail)) {
            setAError("ایمیل معتبر نیست.");
            return;
        }
        if (apassword.length < 8) {
            setAError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        if (existingUsernames.includes(ausername.trim())) {
            setAError("این نام کاربری قبلاً استفاده شده است.");
            return;
        }
        setABusy(true);
        const existing = await getJSON(`teacher:${ausername.trim()}`);
        if (existing) {
            setABusy(false);
            setAError("این نام کاربری قبلاً ثبت شده است.");
            return;
        }
        const admin = {
            username: ausername.trim(), password: await hashPassword(apassword), fullname: afullname.trim(),
            email: aemail.trim(), role: "admin", school_id: school.id, created_at: new Date().toISOString(),
        };
        await setJSON(`teacher:${admin.username}`, admin);
        const emailResult = await sendWelcomeEmail({ username: admin.username, fullname: admin.fullname, email: admin.email, role: "admin" });
        setABusy(false);
        setShowAddAdmin(false);
        setAFullname("");
        setAUsername("");
        setAPassword("");
        setAEmail("");
        onChanged();
        if (!emailResult.sent)
            window.alert(`مدیر ساخته شد، ولی ایمیل خوش‌آمد ارسال نشد:\n${emailResult.note}`);
    };
    const removeAdmin = async (a) => {
        if (!window.confirm(`حساب مدیر «${a.fullname}» حذف شود؟\nاین کار فقط همین حساب مدیریتی رو حذف می‌کنه؛ داده‌های خود مدرسه (معلم‌ها، کلاس‌ها، آزمون‌ها) دست‌نخورده می‌مونن.`))
            return;
        await deleteKey(`teacher:${a.username}`);
        onChanged();
    };
    const toggleAdminActive = async (a) => {
        await setJSON(`teacher:${a.username}`, { ...a, active: a.active === false ? true : false });
        onChanged();
    };
    const [resettingUsername, setResettingUsername] = useState(null);
    const [resetPassword, setResetPassword] = useState("");
    const [resetError, setResetError] = useState("");
    const [resetBusy, setResetBusy] = useState(false);
    const savePasswordReset = async (a) => {
        setResetError("");
        if (resetPassword.length < 8) {
            setResetError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        setResetBusy(true);
        const updated = { ...a, password: await hashPassword(resetPassword) };
        await setJSON(`teacher:${a.username}`, updated);
        setResetBusy(false);
        setResettingUsername(null);
        setResetPassword("");
        onChanged();
    };
    const deleteSchool = async () => {
        if (admins.length > 0 || teacherCount > 0)
            return;
        if (!window.confirm(`مدرسه‌ی «${schoolState.name}» برای همیشه حذف شود؟`))
            return;
        await deleteKey(`school:${schoolState.id}`);
        onChanged();
        onClose();
    };
    const canDeleteSchool = admins.length === 0 && teacherCount === 0;
    return (React.createElement(Modal, { title: `مدیریت مدرسه «${schoolState.name}»`, onClose: onClose },
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u0645\u062F\u0631\u0633\u0647" },
            React.createElement(TextInput, { value: name, onChange: (e) => setName(e.target.value) })),
        React.createElement(Field, { label: "\u0633\u0642\u0641 \u062A\u0639\u062F\u0627\u062F \u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u06CC \u0627\u06CC\u0646 \u0645\u062F\u0631\u0633\u0647" },
            React.createElement(TextInput, { type: "number", min: "1", value: maxClasses, onChange: (e) => setMaxClasses(e.target.value), style: { maxWidth: 120 } })),
        React.createElement(Field, { label: "\u0633\u0642\u0641 \u062A\u0639\u062F\u0627\u062F \u0627\u0645\u062A\u062D\u0627\u0646 \u0647\u0631 \u06A9\u0644\u0627\u0633 \u062F\u0631 \u0631\u0648\u0632" },
            React.createElement(TextInput, { type: "number", min: "1", value: maxExamsPerClassPerDay, onChange: (e) => setMaxExamsPerClassPerDay(e.target.value), style: { maxWidth: 120 } })),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 } },
            React.createElement("input", { type: "checkbox", id: "school-active-toggle", checked: active, onChange: (e) => setActive(e.target.checked), style: { width: 16, height: 16 } }),
            React.createElement("label", { htmlFor: "school-active-toggle", style: { fontSize: 12.5, color: "#334155", lineHeight: 1.7 } }, "\u0645\u062F\u0631\u0633\u0647 \u0641\u0639\u0627\u0644 \u0627\u0633\u062A \u2014 \u0627\u06AF\u0647 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0628\u0634\u0647\u060C \u0645\u062F\u06CC\u0631 \u0648 \u0647\u0645\u0647\u200C\u06CC \u0645\u0639\u0644\u0645\u200C\u0647\u0627\u06CC \u0627\u06CC\u0646 \u0645\u062F\u0631\u0633\u0647 \u062F\u06CC\u06AF\u0647 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0646 \u0648\u0627\u0631\u062F \u0633\u0627\u0645\u0627\u0646\u0647 \u0628\u0634\u0646 (\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u0634\u0648\u0646 \u062F\u0633\u062A\u200C\u0646\u062E\u0648\u0631\u062F\u0647 \u0645\u06CC\u200C\u0645\u0648\u0646\u0647)")),
        msg && React.createElement("div", { style: { color: "#16A34A", fontSize: 13, marginBottom: 12 } }, msg),
        React.createElement(Button, { onClick: saveDetails, disabled: saving, style: { marginBottom: 22 } }, saving ? "در حال ذخیره..." : "ذخیره تغییرات"),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 22 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4 } }, "\u06A9\u062F \u0648\u0631\u0648\u062F \u0645\u062F\u0631\u0633\u0647"),
            React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginBottom: 10, lineHeight: 1.8 } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0647\u0627\u06CC \u0627\u06CC\u0646 \u0645\u062F\u0631\u0633\u0647 \u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0647\u0645\u0631\u0627\u0647 \u0628\u0627 \u06A9\u062F \u0634\u062E\u0635\u06CC \u062E\u0648\u062F\u0634\u0627\u0646 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u06A9\u0646\u0646\u062F. \u0627\u06CC\u0646 \u06A9\u062F \u0628\u06CC\u0646 \u0647\u0645\u0647\u200C\u06CC \u06A9\u0644\u0627\u0633\u200C\u0647\u0627/\u0645\u0639\u0644\u0645\u200C\u0647\u0627\u06CC \u0627\u06CC\u0646 \u0645\u062F\u0631\u0633\u0647 \u0645\u0634\u062A\u0631\u06A9 \u0627\u0633\u062A \u0648 \u0645\u0627\u0646\u0639 \u0642\u0627\u0637\u06CC\u200C\u0634\u062F\u0646 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0647\u0627\u06CC \u062F\u0648 \u0645\u062F\u0631\u0633\u0647\u200C\u06CC \u0645\u062E\u062A\u0644\u0641 \u0645\u06CC\u200C\u0634\u0648\u062F."),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
                React.createElement("span", { style: { fontFamily: "monospace", fontSize: 20, fontWeight: 800, color: "#2563EB", letterSpacing: 3, background: "#EFF6FF", padding: "8px 16px", borderRadius: 10 } }, schoolState.login_code || "—"),
                React.createElement("span", { onClick: regenBusy ? undefined : regenerateLoginCode, style: { fontSize: 12, color: regenBusy ? "#94A3B8" : "#DC2626", fontWeight: 700, cursor: regenBusy ? "default" : "pointer" } }, regenBusy ? "در حال ساخت..." : "کد جدید"))),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 22 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4 } }, "\u0642\u0627\u0628\u0644\u06CC\u062A\u200C\u0647\u0627\u06CC \u0645\u062F\u0631\u0633\u0647"),
            React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginBottom: 4 } }, "\u067E\u0644\u0646 \u0627\u06CC\u0646 \u0645\u062F\u0631\u0633\u0647\u200C\u0633\u062A \u2014 \u0631\u0648\u06CC \u0645\u062F\u06CC\u0631 \u0648 \u0647\u0645\u0647\u200C\u06CC \u0645\u0639\u0644\u0645\u200C\u0647\u0627\u06CC \u0632\u06CC\u0631\u0645\u062C\u0645\u0648\u0639\u0647 \u06CC\u06A9\u0633\u0627\u0646 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0647."),
            React.createElement(FeatureTogglePanel, { features: schoolState.features, onToggle: async (key, value) => {
                    const updated = { ...schoolState, features: { ...(schoolState.features || {}), [key]: value } };
                    await setJSON(`school:${schoolState.id}`, updated);
                    setSchoolState(updated);
                    onChanged();
                } })),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 22 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 12 } }, "\u0644\u0648\u06AF\u0648 \u0648 \u0631\u0646\u06AF \u0627\u062E\u062A\u0635\u0627\u0635\u06CC \u0645\u062F\u0631\u0633\u0647"),
            React.createElement(SchoolBrandingEditor, { school: schoolState, onSave: saveBranding })),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 8 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 12 } }, "\u0645\u062F\u06CC\u0631\u0627\u0646 \u0627\u06CC\u0646 \u0645\u062F\u0631\u0633\u0647"),
            admins.length === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: "#94A3B8", marginBottom: 14 } }, "\u0647\u06CC\u0686 \u0645\u062F\u06CC\u0631\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0645\u062F\u0631\u0633\u0647 \u062B\u0628\u062A \u0646\u0634\u062F\u0647.")) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 } }, admins.map((a) => {
                const isActive = a.active !== false;
                return (React.createElement("div", { key: a.username },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 } },
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                            React.createElement(Avatar, { username: a.username, name: a.fullname, updatedAt: a.avatar_updated_at, size: 30 }),
                            React.createElement("div", null,
                                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B", display: "flex", alignItems: "center", gap: 8 } },
                                    a.fullname,
                                    React.createElement("span", { style: {
                                            fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                                            background: isActive ? "#DCFCE7" : "#FEF2F2", color: isActive ? "#16A34A" : "#DC2626",
                                        } }, isActive ? "فعال" : "غیرفعال")),
                                React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8" } }, a.username))),
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexShrink: 0 } },
                            React.createElement("div", { onClick: () => toggleAdminActive(a), title: isActive ? "غیرفعال کردن حساب" : "فعال کردن حساب", style: { cursor: "pointer", width: 30, height: 30, borderRadius: 8, background: isActive ? "#FFFBEB" : "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center" } },
                                React.createElement(Circle, { size: 14, color: isActive ? "#D97706" : "#16A34A" })),
                            React.createElement("div", { onClick: () => { setResettingUsername(resettingUsername === a.username ? null : a.username); setResetPassword(""); setResetError(""); }, title: "\u062A\u0646\u0638\u06CC\u0645 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F", style: { cursor: "pointer", width: 30, height: 30, borderRadius: 8, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" } },
                                React.createElement(Edit2, { size: 14, color: "#2563EB" })),
                            React.createElement("div", { onClick: () => removeAdmin(a), style: { cursor: "pointer", width: 30, height: 30, borderRadius: 8, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" } },
                                React.createElement(Trash2, { size: 14, color: "#DC2626" })))),
                    resettingUsername === a.username && (React.createElement("div", { style: { background: "#F8FAFC", borderRadius: 10, padding: 12, marginTop: 8 } },
                        React.createElement(TextInput, { type: "password", value: resetPassword, onChange: (e) => setResetPassword(e.target.value), placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F (\u062D\u062F\u0627\u0642\u0644 \u06F8 \u06A9\u0627\u0631\u0627\u06A9\u062A\u0631)", style: { marginBottom: 8 } }),
                        resetError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12, marginBottom: 8 } }, resetError),
                        React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement(Button, { onClick: () => savePasswordReset(a), disabled: resetBusy, style: { fontSize: 12.5, padding: "7px 14px" } }, resetBusy ? "در حال ذخیره..." : "ذخیره رمز جدید"),
                            React.createElement(Button, { variant: "ghost", onClick: () => setResettingUsername(null), style: { fontSize: 12.5, padding: "7px 14px" } }, "\u0627\u0646\u0635\u0631\u0627\u0641"))))));
            }))),
            showAddAdmin ? (React.createElement("div", { style: { background: "#F8FAFC", borderRadius: 12, padding: 16 } },
                React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC" },
                    React.createElement(TextInput, { value: afullname, onChange: (e) => setAFullname(e.target.value) })),
                React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" },
                    React.createElement(TextInput, { value: ausername, onChange: (e) => setAUsername(e.target.value) })),
                React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0648\u0644\u06CC\u0647" },
                    React.createElement(TextInput, { type: "password", value: apassword, onChange: (e) => setAPassword(e.target.value) })),
                React.createElement(Field, { label: "\u0627\u06CC\u0645\u06CC\u0644" },
                    React.createElement(TextInput, { type: "email", value: aemail, onChange: (e) => setAEmail(e.target.value) })),
                aerror && React.createElement("div", { style: { color: "#DC2626", fontSize: 12.5, marginBottom: 10 } }, aerror),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement(Button, { onClick: addAdmin, disabled: abusy }, abusy ? "در حال ساخت..." : "افزودن مدیر"),
                    React.createElement(Button, { variant: "ghost", onClick: () => setShowAddAdmin(false) }, "\u0627\u0646\u0635\u0631\u0627\u0641")))) : (React.createElement(Button, { variant: "ghost", onClick: () => setShowAddAdmin(true) },
                React.createElement(Plus, { size: 15 }),
                "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u062F\u06CC\u0631 \u062F\u06CC\u06AF\u0631"))),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18, marginTop: 18 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#DC2626", marginBottom: 8 } }, "\u062D\u0630\u0641 \u0645\u062F\u0631\u0633\u0647"),
            React.createElement("div", { style: { fontSize: 12, color: "#64748B", marginBottom: 12, lineHeight: 1.8 } }, canDeleteSchool
                ? "این مدرسه هیچ مدیر یا معلمی نداره، پس حذفش کاملاً بی‌خطره."
                : "چون این مدرسه هنوز مدیر یا معلم فعال داره، حذف کامل امکان‌پذیر نیست — اول همه‌ی مدیرها رو حذف کن، یا به‌جاش از گزینه‌ی «غیرفعال کردن» بالا استفاده کن."),
            React.createElement(Button, { variant: "ghost", onClick: deleteSchool, disabled: !canDeleteSchool, style: { color: "#DC2626" } },
                React.createElement(Trash2, { size: 15 }),
                "\u062D\u0630\u0641 \u0647\u0645\u06CC\u0634\u06AF\u06CC \u0645\u062F\u0631\u0633\u0647"))));
}
function CreateStandaloneTeacherForm({ onCreated, existingUsernames }) {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [maxClasses, setMaxClasses] = useState(3);
    const [maxExams, setMaxExams] = useState(5);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        setError("");
        if (!fullname.trim() || !username.trim() || !password || !email.trim()) {
            setError("همه فیلدها را پر کنید.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("ایمیل معتبر نیست.");
            return;
        }
        if (password.length < 8) {
            setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        const mc = Number(maxClasses);
        if (!mc || mc < 1) {
            setError("سقف تعداد کلاس باید حداقل ۱ باشد.");
            return;
        }
        const me = Number(maxExams) || 0;
        if (me < 0) {
            setError("سقف تعداد آزمون نمی‌تواند منفی باشد.");
            return;
        }
        if (existingUsernames.includes(username.trim())) {
            setError("این نام کاربری قبلاً استفاده شده است.");
            return;
        }
        setLoading(true);
        const existing = await getJSON(`teacher:${username.trim()}`);
        if (existing) {
            setLoading(false);
            setError("این نام کاربری قبلاً ثبت شده است.");
            return;
        }
        const rec = {
            username: username.trim(), password: await hashPassword(password), fullname: fullname.trim(),
            email: email.trim(), role: "teacher", school_id: null, max_classes: mc, max_exams: me, created_at: new Date().toISOString(),
        };
        await setJSON(`teacher:${rec.username}`, rec);
        const savedTeacher = (await getJSON(`teacher:${rec.username}`)) || rec;
        const emailResult = await sendWelcomeEmail({ username: rec.username, fullname: rec.fullname, email: rec.email, role: "teacher" });
        setLoading(false);
        onCreated(savedTeacher, emailResult);
    };
    const handleKeyDown = (e) => { if (e.key === "Enter")
        submit(); };
    return (React.createElement("div", null,
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645\u200C\u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0645\u0639\u0644\u0645" },
            React.createElement(TextInput, { value: fullname, onChange: (e) => setFullname(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0645\u062B\u0644\u0627\u064B: \u0632\u0647\u0631\u0627 \u0627\u062D\u0645\u062F\u06CC" })),
        React.createElement(Field, { label: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" },
            React.createElement(TextInput, { value: username, onChange: (e) => setUsername(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u06CC\u06A9 \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u06CC\u06A9\u062A\u0627" })),
        React.createElement(Field, { label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0648\u0644\u06CC\u0647" },
            React.createElement(TextInput, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), onKeyDown: handleKeyDown })),
        React.createElement(Field, { label: "\u0627\u06CC\u0645\u06CC\u0644" },
            React.createElement(TextInput, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0628\u0631\u0627\u06CC \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F" })),
        React.createElement(Field, { label: "\u0633\u0642\u0641 \u062A\u0639\u062F\u0627\u062F \u06A9\u0644\u0627\u0633 \u0627\u06CC\u0646 \u0645\u0639\u0644\u0645" },
            React.createElement(TextInput, { type: "number", min: "1", value: maxClasses, onChange: (e) => setMaxClasses(e.target.value), style: { maxWidth: 120 } })),
        React.createElement(Field, { label: "\u0633\u0642\u0641 \u06A9\u0644 \u062A\u0639\u062F\u0627\u062F \u0622\u0632\u0645\u0648\u0646 \u0627\u06CC\u0646 \u0645\u0639\u0644\u0645 (\u06F0 = \u0628\u062F\u0648\u0646 \u0645\u062D\u062F\u0648\u062F\u06CC\u062A)" },
            React.createElement(TextInput, { type: "number", min: "0", value: maxExams, onChange: (e) => setMaxExams(e.target.value), style: { maxWidth: 120 } })),
        error && React.createElement("div", { style: { color: "#DC2626", fontSize: 13, marginBottom: 14 } }, error),
        React.createElement(Button, { type: "button", onClick: submit, style: { width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }, disabled: loading }, loading ? "در حال ساخت..." : "ساخت حساب معلم مستقل")));
}
function StandaloneTeacherDetailModal({ teacher, onClose, onChanged }) {
    // همون منطق «نسخه‌ی محلی» که در SchoolDetailModal توضیح داده شده، اینجا
    // هم لازمه تا تأخیر انتشار KV باعث نشه ذخیره‌ها «برگشت‌خورده» به‌نظر برسن.
    const [teacherState, setTeacherState] = useState(teacher);
    const [maxClasses, setMaxClasses] = useState(teacher.max_classes || 3);
    const [maxExams, setMaxExams] = useState(teacher.max_exams || 0);
    const [active, setActive] = useState(teacher.active !== false);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    const toggleFeature = async (key, value) => {
        const updated = { ...teacherState, features: { ...(teacherState.features || {}), [key]: value } };
        await setJSON(`teacher:${teacherState.username}`, updated);
        setTeacherState(updated);
        onChanged();
    };
    const saveDetails = async () => {
        const mc = Number(maxClasses);
        if (!mc || mc < 1) {
            setMsg("سقف تعداد کلاس باید حداقل ۱ باشد.");
            return;
        }
        const me = Number(maxExams) || 0;
        if (me < 0) {
            setMsg("سقف تعداد آزمون نمی‌تواند منفی باشد.");
            return;
        }
        setSaving(true);
        setMsg("");
        const updated = { ...teacherState, max_classes: mc, max_exams: me, active };
        await setJSON(`teacher:${teacherState.username}`, updated);
        setTeacherState(updated);
        setSaving(false);
        setMsg("ذخیره شد.");
        onChanged();
    };
    const [showReset, setShowReset] = useState(false);
    const [resetPassword, setResetPassword] = useState("");
    const [resetError, setResetError] = useState("");
    const [resetBusy, setResetBusy] = useState(false);
    const savePasswordReset = async () => {
        setResetError("");
        if (resetPassword.length < 8) {
            setResetError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        setResetBusy(true);
        const updated = { ...teacherState, password: await hashPassword(resetPassword) };
        await setJSON(`teacher:${teacherState.username}`, updated);
        setTeacherState(updated);
        setResetBusy(false);
        setShowReset(false);
        setResetPassword("");
    };
    const [loginCodeBusy, setLoginCodeBusy] = useState(false);
    const regenerateLoginCode = async () => {
        if (!window.confirm("کد ورود فعلیِ این معلم از کار می‌افتد. ادامه می‌دهید؟"))
            return;
        setLoginCodeBusy(true);
        const { login_code, ...rest } = teacherState;
        const result = await setJSONReturn(`teacher:${teacherState.username}`, rest);
        if (result.ok && result.v)
            setTeacherState(result.v);
        setLoginCodeBusy(false);
        onChanged();
    };
    const deleteTeacher = async () => {
        if (!window.confirm(`حساب معلم «${teacherState.fullname}» حذف شود؟\nاین کار فقط همین حساب رو حذف می‌کنه؛ کلاس‌ها و آزمون‌های ساخته‌شده‌ی این معلم دست‌نخورده می‌مونن ولی چون دیگه نمی‌تونه وارد بشه، عملاً غیرقابل‌دسترس می‌شن.`))
            return;
        await deleteKey(`teacher:${teacherState.username}`);
        onChanged();
        onClose();
    };
    return (React.createElement(Modal, { title: `مدیریت معلم مستقل «${teacherState.fullname}»`, onClose: onClose },
        React.createElement("div", { style: { fontSize: 12, color: "#94A3B8", marginBottom: 14 } }, teacherState.username),
        React.createElement(Field, { label: "\u0633\u0642\u0641 \u062A\u0639\u062F\u0627\u062F \u06A9\u0644\u0627\u0633 \u0627\u06CC\u0646 \u0645\u0639\u0644\u0645" },
            React.createElement(TextInput, { type: "number", min: "1", value: maxClasses, onChange: (e) => setMaxClasses(e.target.value), style: { maxWidth: 120 } })),
        React.createElement(Field, { label: "\u0633\u0642\u0641 \u06A9\u0644 \u062A\u0639\u062F\u0627\u062F \u0622\u0632\u0645\u0648\u0646 \u0627\u06CC\u0646 \u0645\u0639\u0644\u0645 (\u06F0 = \u0628\u062F\u0648\u0646 \u0645\u062D\u062F\u0648\u062F\u06CC\u062A)" },
            React.createElement(TextInput, { type: "number", min: "0", value: maxExams, onChange: (e) => setMaxExams(e.target.value), style: { maxWidth: 120 } })),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 } },
            React.createElement("input", { type: "checkbox", id: "standalone-active-toggle", checked: active, onChange: (e) => setActive(e.target.checked), style: { width: 16, height: 16 } }),
            React.createElement("label", { htmlFor: "standalone-active-toggle", style: { fontSize: 12.5, color: "#334155", lineHeight: 1.7 } }, "\u062D\u0633\u0627\u0628 \u0641\u0639\u0627\u0644 \u0627\u0633\u062A \u2014 \u0627\u06AF\u0647 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0628\u0634\u0647\u060C \u0627\u06CC\u0646 \u0645\u0639\u0644\u0645 \u062F\u06CC\u06AF\u0647 \u0646\u0645\u06CC\u200C\u062A\u0648\u0646\u0647 \u0648\u0627\u0631\u062F \u0633\u0627\u0645\u0627\u0646\u0647 \u0628\u0634\u0647 (\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u0634 \u062F\u0633\u062A\u200C\u0646\u062E\u0648\u0631\u062F\u0647 \u0645\u06CC\u200C\u0645\u0648\u0646\u0647)")),
        msg && React.createElement("div", { style: { color: "#16A34A", fontSize: 13, marginBottom: 12 } }, msg),
        React.createElement(Button, { onClick: saveDetails, disabled: saving, style: { marginBottom: 22 } }, saving ? "در حال ذخیره..." : "ذخیره تغییرات"),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 22 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4 } }, "\u06A9\u062F \u0648\u0631\u0648\u062F \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC"),
            React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginBottom: 10, lineHeight: 1.8 } }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0647\u0627\u06CC \u0627\u06CC\u0646 \u0645\u0639\u0644\u0645 \u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0647\u0645\u0631\u0627\u0647 \u0628\u0627 \u06A9\u062F \u0634\u062E\u0635\u06CC \u062E\u0648\u062F\u0634\u0627\u0646 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u06A9\u0646\u0646\u062F."),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
                React.createElement("span", { style: { fontFamily: "monospace", fontSize: 20, fontWeight: 800, color: "#2563EB", letterSpacing: 3, background: "#EFF6FF", padding: "8px 16px", borderRadius: 10 } }, teacherState.login_code || "—"),
                React.createElement("span", { onClick: loginCodeBusy ? undefined : regenerateLoginCode, style: { fontSize: 12, color: loginCodeBusy ? "#94A3B8" : "#DC2626", fontWeight: 700, cursor: loginCodeBusy ? "default" : "pointer" } }, loginCodeBusy ? "در حال ساخت..." : "کد جدید"))),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 8 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4 } }, "\u0642\u0627\u0628\u0644\u06CC\u062A\u200C\u0647\u0627\u06CC \u0627\u062E\u062A\u0635\u0627\u0635\u06CC"),
            React.createElement(FeatureTogglePanel, { features: teacherState.features, onToggle: toggleFeature })),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 8 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 12 } }, "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631"),
            showReset ? (React.createElement("div", { style: { background: "#F8FAFC", borderRadius: 10, padding: 12 } },
                React.createElement(TextInput, { type: "password", value: resetPassword, onChange: (e) => setResetPassword(e.target.value), placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F (\u062D\u062F\u0627\u0642\u0644 \u06F8 \u06A9\u0627\u0631\u0627\u06A9\u062A\u0631)", style: { marginBottom: 8 } }),
                resetError && React.createElement("div", { style: { color: "#DC2626", fontSize: 12, marginBottom: 8 } }, resetError),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement(Button, { onClick: savePasswordReset, disabled: resetBusy, style: { fontSize: 12.5, padding: "7px 14px" } }, resetBusy ? "در حال ذخیره..." : "ذخیره رمز جدید"),
                    React.createElement(Button, { variant: "ghost", onClick: () => setShowReset(false), style: { fontSize: 12.5, padding: "7px 14px" } }, "\u0627\u0646\u0635\u0631\u0627\u0641")))) : (React.createElement(Button, { variant: "ghost", onClick: () => { setShowReset(true); setResetPassword(""); setResetError(""); } },
                React.createElement(Edit2, { size: 15 }),
                "\u062A\u0646\u0638\u06CC\u0645 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F"))),
        React.createElement("div", { style: { borderTop: "1px solid #EEF1F6", paddingTop: 18, marginTop: 18 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#DC2626", marginBottom: 8 } }, "\u062D\u0630\u0641 \u062D\u0633\u0627\u0628"),
            React.createElement(Button, { variant: "ghost", onClick: deleteTeacher, style: { color: "#DC2626" } },
                React.createElement(Trash2, { size: 15 }),
                "\u062D\u0630\u0641 \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0645"))));
}
function ActivityReportScreen({ teacher, schools, teachers, loading }) {
    const [exams, setExams] = useState([]);
    const [classes, setClasses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [students, setStudents] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [adminSort, setAdminSort] = useState("last_login"); // 'last_login' | 'login_count' | 'created_at'
    const [teacherSort, setTeacherSort] = useState("last_login");
    useEffect(() => {
        (async () => {
            const [ex, cl, qs, dashData] = await Promise.all([loadAll("exam:"), loadAll("class:"), loadAll("question:"), loadTeacherDashboardData()]);
            setExams(ex);
            setClasses(cl);
            setQuestions(qs);
            setStudents(dashData.students);
            setDataLoading(false);
        })();
    }, []);
    const usernameToSchool = {};
    teachers.forEach((t) => { usernameToSchool[t.username] = t.school_id || null; });
    const daysSince = (iso) => (iso ? Math.floor((Date.now() - new Date(iso).getTime()) / 86400000) : null);
    const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString("fa-IR") : "—");
    const ActivityBadge = ({ lastLogin }) => {
        const d = daysSince(lastLogin);
        if (d === null)
            return React.createElement(Badge, { tone: "red" }, "\u0647\u0631\u06AF\u0632 \u0648\u0627\u0631\u062F \u0646\u0634\u062F\u0647");
        if (d === 0)
            return React.createElement(Badge, { tone: "green" }, "\u0627\u0645\u0631\u0648\u0632");
        if (d <= 7)
            return React.createElement(Badge, { tone: "green" },
                d,
                " \u0631\u0648\u0632 \u067E\u06CC\u0634");
        if (d <= 30)
            return React.createElement(Badge, { tone: "orange" },
                d,
                " \u0631\u0648\u0632 \u067E\u06CC\u0634");
        return React.createElement(Badge, { tone: "red" },
            d,
            " \u0631\u0648\u0632 \u067E\u06CC\u0634");
    };
    const sortByActivity = (arr, sortKey) => [...arr].sort((a, b) => {
        if (sortKey === "login_count")
            return (b.login_count || 0) - (a.login_count || 0);
        if (sortKey === "created_at")
            return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        const da = a.last_login_at ? new Date(a.last_login_at).getTime() : -1;
        const db_ = b.last_login_at ? new Date(b.last_login_at).getTime() : -1;
        return da - db_; // بدون ورود یا قدیمی‌تر اول — برای اینکه غیرفعال‌ترین‌ها زودتر دیده بشن
    });
    const admins = teachers.filter((t) => t.role === "admin").map((a) => {
        const teacherCount = teachers.filter((t) => t.school_id === a.school_id && t.role === "teacher").length;
        const school = schools.find((s) => s.id === a.school_id);
        const classCount = classes.filter((c) => classTeacherIds(c).some((u) => usernameToSchool[u] === a.school_id)).length;
        const examCount = exams.filter((e) => usernameToSchool[e.teacher_id] === a.school_id).length;
        const questionCount = questions.filter((q) => !q.exam_id && usernameToSchool[q.owner_id] === a.school_id).length;
        return { ...a, schoolName: school?.name || "—", teacherCount, classCount, examCount, questionCount };
    });
    const standaloneTeachers = teachers.filter((t) => t.role === "teacher" && !t.school_id).map((t) => {
        const classCount = classes.filter((c) => classTeacherIds(c).includes(t.username)).length;
        const examCount = exams.filter((e) => e.teacher_id === t.username).length;
        const questionCount = questions.filter((q) => !q.exam_id && q.owner_id === t.username).length;
        const studentCount = students.filter((s) => s.teacher_id === t.username).length;
        return { ...t, classCount, examCount, questionCount, studentCount };
    });
    const sortedAdmins = sortByActivity(admins, adminSort);
    const sortedTeachers = sortByActivity(standaloneTeachers, teacherSort);
    const allRows = [...admins, ...standaloneTeachers];
    const neverLoggedInCount = allRows.filter((t) => !t.last_login_at).length;
    const inactive30Count = allRows.filter((t) => { const d = daysSince(t.last_login_at); return d !== null && d > 30; }).length;
    const isLoading = loading || dataLoading;
    const sortSelectStyle = { ...inputStyle, width: "auto", padding: "6px 10px", fontSize: 12 };
    const thStyle = { padding: "8px 6px", fontWeight: 700 };
    const tdStyle = { padding: "10px 6px", color: "#64748B" };
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u06AF\u0632\u0627\u0631\u0634 \u0639\u0645\u0644\u06A9\u0631\u062F", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { fontSize: 12.5, color: "#94A3B8", marginBottom: 18 } }, "\u0645\u06CC\u0632\u0627\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u0645\u062F\u06CC\u0631\u0627\u0646 \u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627 \u0648 \u0645\u0639\u0644\u0645\u0627\u0646 \u0645\u0633\u062A\u0642\u0644 \u0627\u0632 \u0633\u0627\u0645\u0627\u0646\u0647 \u2014 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0622\u062E\u0631\u06CC\u0646 \u0648\u0631\u0648\u062F \u0648 \u062A\u0639\u062F\u0627\u062F \u062F\u0641\u0639\u0627\u062A \u0648\u0631\u0648\u062F. \u0622\u0645\u0627\u0631 \u0648\u0631\u0648\u062F \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0627\u0644\u0627\u0646 \u0628\u0647 \u0628\u0639\u062F \u062B\u0628\u062A \u0645\u06CC\u200C\u0634\u0647\u061B \u062D\u0633\u0627\u0628\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0642\u0628\u0644\u0627\u064B \u0628\u062F\u0648\u0646 \u0627\u06CC\u0646 \u0642\u0627\u0628\u0644\u06CC\u062A \u0648\u0627\u0631\u062F \u0634\u062F\u0647 \u0628\u0648\u062F\u0646 \u062A\u0627 \u0627\u0648\u0644\u06CC\u0646 \u0648\u0631\u0648\u062F \u0628\u0639\u062F\u06CC\u0634\u0648\u0646 \u00AB\u0647\u0631\u06AF\u0632 \u0648\u0627\u0631\u062F \u0646\u0634\u062F\u0647\u00BB \u0646\u0634\u0648\u0646 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0646."),
        React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 } },
            React.createElement(StatCard, { icon: AlertTriangle, label: "\u0647\u06CC\u0686\u200C\u0648\u0642\u062A \u0648\u0627\u0631\u062F \u0646\u0634\u062F\u0647\u200C\u0627\u0646\u062F", value: neverLoggedInCount, color: "#DC2626" }),
            React.createElement(StatCard, { icon: Clock, label: "\u0628\u06CC\u0634 \u0627\u0632 \u06F3\u06F0 \u0631\u0648\u0632 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644", value: inactive30Count, color: "#D97706" })),
        isLoading ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 13.5, padding: 20, textAlign: "center" } }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC...")) : (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginBottom: 20 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B" } },
                        "\u0645\u062F\u06CC\u0631\u0627\u0646 \u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627 (",
                        admins.length,
                        ")"),
                    React.createElement("select", { value: adminSort, onChange: (e) => setAdminSort(e.target.value), style: sortSelectStyle },
                        React.createElement("option", { value: "last_login" }, "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC: \u0622\u062E\u0631\u06CC\u0646 \u0648\u0631\u0648\u062F (\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u062A\u0631\u06CC\u0646 \u0627\u0648\u0644)"),
                        React.createElement("option", { value: "login_count" }, "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC: \u062A\u0639\u062F\u0627\u062F \u0648\u0631\u0648\u062F"),
                        React.createElement("option", { value: "created_at" }, "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC: \u062A\u0627\u0631\u06CC\u062E \u0639\u0636\u0648\u06CC\u062A"))),
                admins.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0645\u062F\u06CC\u0631 \u0645\u062F\u0631\u0633\u0647\u200C\u0627\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.", actionLabel: null, onAction: null })) : (React.createElement("div", { style: { overflowX: "auto" } },
                    React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 12.5 } },
                        React.createElement("thead", null,
                            React.createElement("tr", { style: { borderBottom: "1px solid #EEF1F6", color: "#94A3B8", textAlign: "right" } },
                                React.createElement("th", { style: thStyle }, "\u0645\u062F\u06CC\u0631"),
                                React.createElement("th", { style: thStyle }, "\u0645\u062F\u0631\u0633\u0647"),
                                React.createElement("th", { style: thStyle }, "\u0648\u0636\u0639\u06CC\u062A \u0648\u0631\u0648\u062F"),
                                React.createElement("th", { style: thStyle }, "\u062A\u0639\u062F\u0627\u062F \u0648\u0631\u0648\u062F"),
                                React.createElement("th", { style: thStyle }, "\u0639\u0636\u0648\u06CC\u062A"),
                                React.createElement("th", { style: thStyle }, "\u0645\u0639\u0644\u0645"),
                                React.createElement("th", { style: thStyle }, "\u06A9\u0644\u0627\u0633"),
                                React.createElement("th", { style: thStyle }, "\u0622\u0632\u0645\u0648\u0646"))),
                        React.createElement("tbody", null, sortedAdmins.map((a) => (React.createElement("tr", { key: a.username, style: { borderBottom: "1px solid #F5F7FA" } },
                            React.createElement("td", { style: { ...tdStyle, fontWeight: 700, color: "#1E293B" } }, a.fullname),
                            React.createElement("td", { style: tdStyle }, a.schoolName),
                            React.createElement("td", { style: tdStyle },
                                React.createElement(ActivityBadge, { lastLogin: a.last_login_at })),
                            React.createElement("td", { style: tdStyle }, a.login_count || 0),
                            React.createElement("td", { style: { ...tdStyle, color: "#94A3B8" } }, fmtDate(a.created_at)),
                            React.createElement("td", { style: tdStyle }, a.teacherCount),
                            React.createElement("td", { style: tdStyle }, a.classCount),
                            React.createElement("td", { style: tdStyle }, a.examCount))))))))),
            React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B" } },
                        "\u0645\u0639\u0644\u0645\u0627\u0646 \u0645\u0633\u062A\u0642\u0644 (",
                        standaloneTeachers.length,
                        ")"),
                    React.createElement("select", { value: teacherSort, onChange: (e) => setTeacherSort(e.target.value), style: sortSelectStyle },
                        React.createElement("option", { value: "last_login" }, "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC: \u0622\u062E\u0631\u06CC\u0646 \u0648\u0631\u0648\u062F (\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u062A\u0631\u06CC\u0646 \u0627\u0648\u0644)"),
                        React.createElement("option", { value: "login_count" }, "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC: \u062A\u0639\u062F\u0627\u062F \u0648\u0631\u0648\u062F"),
                        React.createElement("option", { value: "created_at" }, "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC: \u062A\u0627\u0631\u06CC\u062E \u0639\u0636\u0648\u06CC\u062A"))),
                standaloneTeachers.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0645\u0639\u0644\u0645 \u0645\u0633\u062A\u0642\u0644\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.", actionLabel: null, onAction: null })) : (React.createElement("div", { style: { overflowX: "auto" } },
                    React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 12.5 } },
                        React.createElement("thead", null,
                            React.createElement("tr", { style: { borderBottom: "1px solid #EEF1F6", color: "#94A3B8", textAlign: "right" } },
                                React.createElement("th", { style: thStyle }, "\u0645\u0639\u0644\u0645"),
                                React.createElement("th", { style: thStyle }, "\u0648\u0636\u0639\u06CC\u062A \u0648\u0631\u0648\u062F"),
                                React.createElement("th", { style: thStyle }, "\u062A\u0639\u062F\u0627\u062F \u0648\u0631\u0648\u062F"),
                                React.createElement("th", { style: thStyle }, "\u0639\u0636\u0648\u06CC\u062A"),
                                React.createElement("th", { style: thStyle }, "\u06A9\u0644\u0627\u0633"),
                                React.createElement("th", { style: thStyle }, "\u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632"),
                                React.createElement("th", { style: thStyle }, "\u0622\u0632\u0645\u0648\u0646"),
                                React.createElement("th", { style: thStyle }, "\u0628\u0627\u0646\u06A9 \u0633\u0648\u0627\u0644"))),
                        React.createElement("tbody", null, sortedTeachers.map((t) => (React.createElement("tr", { key: t.username, style: { borderBottom: "1px solid #F5F7FA" } },
                            React.createElement("td", { style: { ...tdStyle, fontWeight: 700, color: "#1E293B" } }, t.fullname),
                            React.createElement("td", { style: tdStyle },
                                React.createElement(ActivityBadge, { lastLogin: t.last_login_at })),
                            React.createElement("td", { style: tdStyle }, t.login_count || 0),
                            React.createElement("td", { style: { ...tdStyle, color: "#94A3B8" } }, fmtDate(t.created_at)),
                            React.createElement("td", { style: tdStyle }, t.classCount),
                            React.createElement("td", { style: tdStyle }, t.studentCount),
                            React.createElement("td", { style: tdStyle }, t.examCount),
                            React.createElement("td", { style: tdStyle }, t.questionCount)))))))))))));
}
function StandaloneTeachersScreen({ teacher, teachers, loading, onChanged }) {
    const [showCreate, setShowCreate] = useState(false);
    const [managingTeacher, setManagingTeacher] = useState(null);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [bulkBusy, setBulkBusy] = useState(false);
    const standalone = teachers.filter((t) => t.role === "teacher" && !t.school_id)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const toggleSelect = (username) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(username))
                next.delete(username);
            else
                next.add(username);
            return next;
        });
    };
    const toggleSelectAll = () => {
        setSelectedIds((prev) => (prev.size === standalone.length ? new Set() : new Set(standalone.map((t) => t.username))));
    };
    const bulkSetActive = async (active) => {
        setBulkBusy(true);
        await Promise.all([...selectedIds].map((username) => {
            const t = standalone.find((x) => x.username === username);
            return t ? setJSON(`teacher:${username}`, { ...t, active }) : null;
        }));
        setBulkBusy(false);
        setSelectedIds(new Set());
        await onChanged();
    };
    const bulkApplyCap = async (key, value) => {
        setBulkBusy(true);
        await Promise.all([...selectedIds].map((username) => {
            const t = standalone.find((x) => x.username === username);
            return t ? setJSON(`teacher:${username}`, { ...t, [key]: value }) : null;
        }));
        setBulkBusy(false);
        setSelectedIds(new Set());
        await onChanged();
    };
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u0645\u0639\u0644\u0645\u0627\u0646 \u0645\u0633\u062A\u0642\u0644", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: { fontSize: 12.5, color: "#94A3B8", marginBottom: 18 } }, "\u062D\u0633\u0627\u0628\u200C\u0647\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC \u0645\u0639\u0644\u0645\u0627\u0646\u06CC \u06A9\u0647 \u0645\u062F\u0631\u0633\u0647\u200C\u0634\u0648\u0646 \u0647\u0646\u0648\u0632 \u0627\u0632 \u0627\u06CC\u0646 \u0633\u0627\u0645\u0627\u0646\u0647 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0646\u0645\u06CC\u200C\u06A9\u0646\u0647 \u2014 \u0627\u06CC\u0646 \u0645\u0639\u0644\u0645\u200C\u0647\u0627 \u062E\u0648\u062F\u0634\u0648\u0646 \u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u06CC \u062E\u0648\u062F\u0634\u0648\u0646 \u0631\u0648 \u0645\u06CC\u200C\u0633\u0627\u0632\u0646."),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" } },
                React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B" } }, "\u0641\u0647\u0631\u0633\u062A \u0645\u0639\u0644\u0645\u0627\u0646 \u0645\u0633\u062A\u0642\u0644"),
                React.createElement(Button, { onClick: () => setShowCreate(true) },
                    React.createElement(Plus, { size: 16 }),
                    "\u0633\u0627\u062E\u062A \u0645\u0639\u0644\u0645 \u0645\u0633\u062A\u0642\u0644 \u062C\u062F\u06CC\u062F")),
            loading ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 13.5, padding: 20, textAlign: "center" } }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC...")) : standalone.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0645\u0639\u0644\u0645 \u0645\u0633\u062A\u0642\u0644\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.", actionLabel: "\u0633\u0627\u062E\u062A \u0645\u0639\u0644\u0645 \u0645\u0633\u062A\u0642\u0644 \u062C\u062F\u06CC\u062F", onAction: () => setShowCreate(true) })) : (React.createElement("div", null,
                React.createElement(BulkActionBar, { count: selectedIds.size, busy: bulkBusy, onActivate: () => bulkSetActive(true), onDeactivate: () => bulkSetActive(false), capFields: [
                        { key: "max_classes", label: "سقف کلاس" },
                        { key: "max_exams", label: "سقف آزمون" },
                    ], onApplyCap: bulkApplyCap, onClear: () => setSelectedIds(new Set()) }),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "6px 6px 10px", borderBottom: "1px solid #F5F7FA" } },
                    React.createElement("input", { type: "checkbox", checked: standalone.length > 0 && selectedIds.size === standalone.length, onChange: toggleSelectAll, style: { width: 15, height: 15 } }),
                    React.createElement("span", { style: { fontSize: 12, color: "#94A3B8" } }, "\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0645\u0647")),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, standalone.map((t) => {
                    const isActive = t.active !== false;
                    return (React.createElement("div", { key: t.username, style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 6px", borderBottom: "1px solid #F5F7FA" } },
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                            React.createElement("input", { type: "checkbox", checked: selectedIds.has(t.username), onChange: () => toggleSelect(t.username), style: { width: 15, height: 15 } }),
                            React.createElement(Avatar, { username: t.username, name: t.fullname, updatedAt: t.avatar_updated_at, size: 32 }),
                            React.createElement("div", null,
                                React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "#1E293B", display: "flex", alignItems: "center", gap: 8 } },
                                    t.fullname,
                                    React.createElement("span", { style: {
                                            fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                                            background: isActive ? "#DCFCE7" : "#FEF2F2", color: isActive ? "#16A34A" : "#DC2626",
                                        } }, isActive ? "فعال" : "غیرفعال")),
                                React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8" } },
                                    t.username,
                                    " \u2014 \u0633\u0642\u0641 ",
                                    t.max_classes || 3,
                                    " \u06A9\u0644\u0627\u0633\u060C \u0633\u0642\u0641 ",
                                    t.max_exams > 0 ? t.max_exams : "نامحدود",
                                    " \u0622\u0632\u0645\u0648\u0646"))),
                        React.createElement("div", { onClick: () => setManagingTeacher(t), style: { display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#EFF6FF", cursor: "pointer" } },
                            React.createElement(Settings, { size: 16, color: "#2563EB" }))));
                }))))),
        showCreate && (React.createElement(Modal, { title: "\u0633\u0627\u062E\u062A \u0645\u0639\u0644\u0645 \u0645\u0633\u062A\u0642\u0644 \u062C\u062F\u06CC\u062F", onClose: () => setShowCreate(false) },
            React.createElement(CreateStandaloneTeacherForm, { existingUsernames: teachers.map((t) => t.username), onCreated: async (rec, emailResult) => {
                    setShowCreate(false);
                    await onChanged();
                    if (emailResult && !emailResult.sent)
                        window.alert(`حساب معلم ساخته شد، ولی ایمیل خوش‌آمد ارسال نشد:\n${emailResult.note}`);
                    setManagingTeacher(rec);
                } }))),
        managingTeacher && (React.createElement(StandaloneTeacherDetailModal, { teacher: teachers.find((t) => t.username === managingTeacher.username) || managingTeacher, onClose: () => setManagingTeacher(null), onChanged: onChanged }))));
}
function SuperAdminMessagesScreen({ teacher, schools, teachers, messages, loading, refresh, onUpdateSelf }) {
    const [kind, setKind] = useState("schools"); // 'schools' | 'standalone'
    const [selectedId, setSelectedId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [sending, setSending] = useState(false);
    const [allowTwoWay, setAllowTwoWay] = useState(true);
    const [togglingAllow, setTogglingAllow] = useState(false);
    const standaloneTeachers = (teachers || []).filter((t) => t.role === "teacher" && !t.school_id);
    const lastReadMap = teacher.sa_thread_last_read || {};
    const unreadCountFor = (id, senderRole) => messages.filter((m) => (senderRole === "admin" ? m.school_id === id : m.teacher_id === id)
        && m.sender_role === senderRole && (!lastReadMap[id] || new Date(m.created_at) > new Date(lastReadMap[id]))).length;
    useEffect(() => {
        if (!selectedId)
            return;
        const senderRole = kind === "schools" ? "admin" : "teacher";
        if (unreadCountFor(selectedId, senderRole) === 0)
            return;
        const updatedMap = { ...lastReadMap, [selectedId]: new Date().toISOString() };
        const updatedTeacher = { ...teacher, sa_thread_last_read: updatedMap };
        setJSON(`teacher:${teacher.username}`, updatedTeacher).then(() => { onUpdateSelf && onUpdateSelf(updatedTeacher); });
    }, [selectedId, kind, messages.length]);
    useEffect(() => {
        let cancelled = false;
        getJSON("settings:global").then((s) => { if (!cancelled)
            setAllowTwoWay(s?.allow_admin_to_superadmin_messages !== false); });
        return () => { cancelled = true; };
    }, []);
    const toggleAllowTwoWay = async () => {
        setTogglingAllow(true);
        const next = !allowTwoWay;
        const current = (await getJSON("settings:global")) || {};
        await setJSON("settings:global", { ...current, allow_admin_to_superadmin_messages: next });
        setAllowTwoWay(next);
        setTogglingAllow(false);
    };
    // مدرسه‌ها/معلم‌های مستقلی که حداقل یک پیام دارن اول، بقیه بعدش — همه‌ی
    // آیتم‌ها همیشه توی لیست هستن چون مدیر سایت باید بتونه به هرکدوم، حتی
    // بدون پیام قبلی، پیام بده.
    const threadFor = (id) => messages.filter((m) => (kind === "schools" ? m.school_id === id : m.teacher_id === id))
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const lastMessageAt = (id) => { const t = threadFor(id); return t.length ? t[t.length - 1].created_at : null; };
    const entities = kind === "schools" ? schools : standaloneTeachers;
    const entityId = (e) => (kind === "schools" ? e.id : e.username);
    const entityName = (e) => (kind === "schools" ? e.name : e.fullname);
    const sortedEntities = [...entities].sort((a, b) => {
        const la = lastMessageAt(entityId(a)), lb = lastMessageAt(entityId(b));
        if (la && lb)
            return new Date(lb) - new Date(la);
        if (la)
            return -1;
        if (lb)
            return 1;
        return (entityName(a) || "").localeCompare(entityName(b) || "");
    });
    const selectedEntity = entities.find((e) => entityId(e) === selectedId) || null;
    const thread = selectedId ? threadFor(selectedId) : [];
    const peerSenderRole = kind === "schools" ? "admin" : "teacher";
    const peerLabel = kind === "schools" ? "مدیر مدرسه" : "معلم مستقل";
    const sendReply = async () => {
        if (!replyText.trim() || !selectedId)
            return;
        setSending(true);
        const id = uid();
        await setJSON(`message:${id}`, {
            id, channel: "admin_superadmin", sender_role: "super_admin", sender_name: teacher.fullname,
            text: replyText.trim(), created_at: new Date().toISOString(),
            ...(kind === "schools" ? { school_id: selectedId } : { teacher_id: selectedId }),
        });
        setSending(false);
        setReplyText("");
        await refresh();
    };
    return (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
        React.createElement(TopBar, { title: "\u067E\u06CC\u0627\u0645\u200C\u0647\u0627", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
        React.createElement("div", { style: {
                background: "#fff", borderRadius: 14, border: "1px solid #EEF1F6", padding: "14px 18px",
                marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
            } },
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 13.5, fontWeight: 800, color: "#1E293B" } }, "\u067E\u06CC\u0627\u0645\u200C\u0631\u0633\u0627\u0646\u06CC \u062F\u0648\u0637\u0631\u0641\u0647 \u0628\u0627 \u0645\u062F\u06CC\u0631\u0627\u0646 \u0645\u062F\u0631\u0633\u0647 \u0648 \u0645\u0639\u0644\u0645\u0627\u0646 \u0645\u0633\u062A\u0642\u0644"),
                React.createElement("div", { style: { fontSize: 12, color: "#94A3B8", marginTop: 2 } }, allowTwoWay ? "مدیران مدرسه‌ها و معلمان مستقل می‌توانند برای شما پیام بفرستند." : "فقط شما می‌توانید پیام بفرستید؛ ارسال پیام به شما برای مدیران و معلمان مستقل غیرفعال است.")),
            React.createElement("div", { onClick: togglingAllow ? undefined : toggleAllowTwoWay, style: {
                    width: 46, height: 26, borderRadius: 999, background: allowTwoWay ? "#16A34A" : "#CBD5E1",
                    position: "relative", cursor: togglingAllow ? "default" : "pointer", opacity: togglingAllow ? 0.6 : 1, flexShrink: 0,
                } },
                React.createElement("div", { style: {
                        width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3,
                        [allowTwoWay ? "right" : "left"]: 3, transition: "all .15s",
                    } }))),
        React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 14 } }, [{ key: "schools", label: "مدارس" }, { key: "standalone", label: "معلمان مستقل" }].map((t) => (React.createElement("div", { key: t.key, onClick: () => { setKind(t.key); setSelectedId(null); }, style: {
                padding: "8px 16px", borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 700,
                background: kind === t.key ? "#7C3AED" : "#F1F5F9", color: kind === t.key ? "#fff" : "#64748B",
            } }, t.label)))),
        React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", display: "flex", minHeight: 460, overflow: "hidden" } },
            React.createElement("div", { style: { width: 260, borderLeft: "1px solid #EEF1F6", overflowY: "auto", flexShrink: 0 } }, loading ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 13, padding: 20, textAlign: "center" } }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC...")) : sortedEntities.length === 0 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 13, padding: 20, textAlign: "center" } }, kind === "schools" ? "هنوز مدرسه‌ای ثبت نشده است." : "هنوز معلم مستقلی ثبت نشده است.")) : sortedEntities.map((e) => {
                const id = entityId(e);
                const t = threadFor(id);
                const last = t[t.length - 1];
                const unread = unreadCountFor(id, peerSenderRole);
                return (React.createElement("div", { key: id, onClick: () => setSelectedId(id), style: {
                        padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #F5F7FA",
                        background: selectedId === id ? "#F5F3FF" : "transparent",
                        display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8,
                    } },
                    React.createElement("div", { style: { minWidth: 0, flex: 1 } },
                        React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "#1E293B" } }, entityName(e)),
                        React.createElement("div", { style: { fontSize: 11.5, color: "#94A3B8", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, last ? `${last.sender_role === "super_admin" ? "شما: " : ""}${last.text}` : "بدون پیام")),
                    unread > 0 && (React.createElement("span", { style: {
                            flexShrink: 0, background: "#EF4444", color: "#fff", fontSize: 10.5, fontWeight: 800,
                            borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                        } }, unread))));
            })),
            React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", padding: 18 } }, !selectedEntity ? (React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", fontSize: 13.5 } }, kind === "schools" ? "یک مدرسه را از فهرست انتخاب کنید." : "یک معلم مستقل را از فهرست انتخاب کنید.")) : (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #F5F7FA" } }, entityName(selectedEntity)),
                React.createElement("div", { style: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 } }, thread.length === 0 ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 12.5, padding: 14, textAlign: "center" } }, "\u0647\u0646\u0648\u0632 \u067E\u06CC\u0627\u0645\u06CC \u0631\u062F \u0648 \u0628\u062F\u0644 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.")) : thread.map((m) => (React.createElement("div", { key: m.id, style: {
                        alignSelf: m.sender_role === "super_admin" ? "flex-end" : "flex-start",
                        maxWidth: "75%", background: m.sender_role === "super_admin" ? "#EFF6FF" : "#F5F3FF",
                        border: `1px solid ${m.sender_role === "super_admin" ? "#DBEAFE" : "#DDD6FE"}`,
                        borderRadius: 10, padding: "8px 12px",
                    } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: m.sender_role === "super_admin" ? "#2563EB" : "#7C3AED", marginBottom: 3 } }, m.sender_role === "super_admin" ? "شما" : (m.sender_name || peerLabel)),
                    React.createElement("div", { style: { fontSize: 13, color: "#334155", whiteSpace: "pre-wrap" } }, m.text),
                    React.createElement("div", { style: { fontSize: 10.5, color: "#94A3B8", marginTop: 3 } }, new Date(m.created_at).toLocaleString("fa-IR")))))),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement(TextInput, { value: replyText, onChange: (e) => setReplyText(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                            sendReply(); }, placeholder: "\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u06CC\u062F...", style: { flex: 1 } }),
                    React.createElement(Button, { onClick: sendReply, disabled: sending || !replyText.trim() }, sending ? "..." : "ارسال"))))))));
}
function SuperAdminSidebar({ onLogout, onSettings, onHelp, name, activeTab, onTab, badges }) {
    const accent = "#7C3AED";
    const isMobile = useIsMobile();
    const [mobileOpen, setMobileOpen] = useState(false);
    const tabs = [
        { key: "schools", label: "مدرسه‌ها", icon: Library, group: "manage" },
        { key: "standalone", label: "معلمان مستقل", icon: Users, group: "manage" },
        { key: "activity", label: "گزارش عملکرد", icon: BarChart3, group: "reports" },
        { key: "messages", label: "پیام‌ها", icon: MessageSquare, badgeKey: "messages", group: "comm" },
    ];
    const goTab = (key) => { onTab(key); setMobileOpen(false); };
    if (isMobile && !mobileOpen) {
        return React.createElement(MobileMenuButton, { onClick: () => setMobileOpen(true), accent: accent });
    }
    return (React.createElement(React.Fragment, null,
        isMobile && React.createElement(MobileSidebarBackdrop, { onClick: () => setMobileOpen(false) }),
        React.createElement("div", { style: {
                width: 230, background: "#0F1E3D", minHeight: "100%", display: "flex",
                flexDirection: "column", flexShrink: 0,
                ...(isMobile ? { position: "fixed", top: 0, bottom: 0, right: 0, zIndex: 9999, boxShadow: "-8px 0 24px rgba(0,0,0,.25)", overflowY: "auto" } : {}),
            } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "22px 20px", borderBottom: "1px solid #22385F" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                    React.createElement("div", { style: { width: 34, height: 34, borderRadius: 9, background: accent, display: "flex", alignItems: "center", justifyContent: "center" } },
                        React.createElement(GraduationCap, { size: 19, color: "#fff" })),
                    React.createElement("span", { style: { color: "#fff", fontWeight: 800, fontSize: 17 } }, "\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A")),
                isMobile && React.createElement(X, { size: 20, color: "#AAB8D1", style: { cursor: "pointer" }, onClick: () => setMobileOpen(false) })),
            React.createElement("div", { style: { padding: "14px 12px", flex: 1 } },
                tabs.map((t, i) => {
                    const IconCmp = t.icon;
                    const badgeCount = t.badgeKey && badges && badges[t.badgeKey];
                    const showDivider = i > 0 && tabs[i - 1].group !== t.group;
                    return (React.createElement(React.Fragment, { key: t.key },
                        showDivider && React.createElement(SidebarDivider, null),
                        React.createElement("div", { className: "sidebar-item", onClick: () => goTab(t.key), style: {
                                display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, marginBottom: 4, cursor: "pointer",
                                background: activeTab === t.key ? accent : "transparent", color: activeTab === t.key ? "#fff" : "#AAB8D1", fontSize: 14, fontWeight: 600,
                            } },
                            React.createElement(IconCmp, { size: 17 }),
                            t.label,
                            badgeCount > 0 && (React.createElement("span", { style: {
                                    marginRight: "auto", background: "#EF4444", color: "#fff", fontSize: 10.5, fontWeight: 800,
                                    borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px", display: "flex", alignItems: "center", justifyContent: "center",
                                } }, badgeCount)))));
                }),
                React.createElement(SidebarDivider, null),
                React.createElement("div", { className: "sidebar-item", onClick: () => { onSettings(); setMobileOpen(false); }, style: {
                        display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, marginBottom: 4, cursor: "pointer",
                        color: "#AAB8D1", fontSize: 14, fontWeight: 600,
                    } },
                    React.createElement(Settings, { size: 17 }),
                    "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0633\u0627\u0628"),
                React.createElement("div", { className: "sidebar-item", onClick: () => { onHelp(); setMobileOpen(false); }, style: {
                        display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, marginBottom: 4, cursor: "pointer",
                        color: "#AAB8D1", fontSize: 14, fontWeight: 600,
                    } },
                    React.createElement(HelpCircle, { size: 17 }),
                    "\u0631\u0627\u0647\u0646\u0645\u0627")),
            React.createElement("div", { style: { padding: 12, borderTop: "1px solid #22385F" } },
                React.createElement("div", { style: { fontSize: 12, color: "#7C8CAE", padding: "6px 14px 12px" } }, name),
                React.createElement("div", { className: "sidebar-item", onClick: onLogout, style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", color: "#F87171", fontSize: 14, fontWeight: 600 } },
                    React.createElement(LogOut, { size: 17 }),
                    "\u062E\u0631\u0648\u062C"),
                React.createElement("div", { style: { fontSize: 10, color: "#4B5C81", textAlign: "center", padding: "10px 14px 2px", letterSpacing: 0.3 } },
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " ghobeishawi \u2014 \u062A\u0645\u0627\u0645\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A")))));
}
function SuperAdminDashboardScreen({ teacher, onLogout, onUpdateSelf }) {
    const [schools, setSchools] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [showOwnSettings, setShowOwnSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [managingSchool, setManagingSchool] = useState(null);
    const [activeTab, setActiveTab] = useState("schools");
    const [selectedSchoolIds, setSelectedSchoolIds] = useState(new Set());
    const [bulkBusy, setBulkBusy] = useState(false);
    const [d1Busy, setD1Busy] = useState(false);
    const [d1Msg, setD1Msg] = useState("");
    const [d1MsgTone, setD1MsgTone] = useState("blue");
    const d1ToneColor = { blue: "#2563EB", green: "#16A34A", red: "#DC2626" }[d1MsgTone] || "#2563EB";
    // تعداد دفعات ذخیره‌ی دوره‌ای در طول هر آزمون (v72: Durable Object این
    // عدد رو برای محاسبه‌ی فاصله‌ی زمانی فلاش استفاده می‌کنه — پیش‌فرض ۵).
    // فقط مدیرکل می‌بینه/تغییرش می‌ده؛ در settings:global ذخیره می‌شه.
    const [draftSaveCount, setDraftSaveCount] = useState(5);
    const [draftSaveBusy, setDraftSaveBusy] = useState(false);
    const [draftSaveMsg, setDraftSaveMsg] = useState("");
    useEffect(() => {
        let cancelled = false;
        getJSON("settings:global").then((s) => { if (!cancelled)
            setDraftSaveCount(s?.draft_save_count || 5); });
        return () => { cancelled = true; };
    }, []);
    const saveDraftSaveCount = async () => {
        setDraftSaveBusy(true);
        setDraftSaveMsg("");
        const n = Math.max(2, Math.min(10, Math.round(Number(draftSaveCount) || 5)));
        const current = (await getJSON("settings:global")) || {};
        const result = await setJSONChecked("settings:global", { ...current, draft_save_count: n });
        setDraftSaveCount(n);
        setDraftSaveMsg(result.ok ? "ذخیره شد." : (result.error || "ذخیره ناموفق بود."));
        setDraftSaveBusy(false);
    };
    const migrateToD1 = async () => {
        setD1Busy(true);
        setD1Msg("در حال انتقال داده‌ها به D1...");
        setD1MsgTone("blue");
        try {
            const r = await fetch("/api/admin/migrate-to-d1", { method: "POST", headers: authHeaders() });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setD1Msg(data.error || "انتقال با خطا مواجه شد.");
                setD1MsgTone("red");
            }
            else {
                const breakdown = Object.entries(data.migrated || {}).map(([k, v]) => `${k} ${v}`).join(" — ");
                const total = Object.values(data.migrated || {}).reduce((s, n) => s + n, 0);
                const errCount = (data.errors || []).length;
                if (errCount > 0) {
                    setD1Msg(`${total} مورد پردازش شد، ولی ${errCount} مورد خطا داشت:\n${data.errors.join("\n")}`);
                    setD1MsgTone("red");
                }
                else {
                    setD1Msg(`${total} مورد منتقل شد. (${breakdown})`);
                    setD1MsgTone("green");
                }
            }
        }
        catch {
            setD1Msg("اتصال برقرار نشد.");
            setD1MsgTone("red");
        }
        setD1Busy(false);
    };
    const toggleSchoolSelect = (id) => {
        setSelectedSchoolIds((prev) => {
            const next = new Set(prev);
            if (next.has(id))
                next.delete(id);
            else
                next.add(id);
            return next;
        });
    };
    const toggleSelectAllSchools = () => {
        setSelectedSchoolIds((prev) => (prev.size === schools.length ? new Set() : new Set(schools.map((s) => s.id))));
    };
    const bulkSetSchoolsActive = async (active) => {
        setBulkBusy(true);
        await Promise.all([...selectedSchoolIds].map((id) => {
            const s = schools.find((x) => x.id === id);
            return s ? setJSON(`school:${id}`, { ...s, active }) : null;
        }));
        setBulkBusy(false);
        setSelectedSchoolIds(new Set());
        await refresh();
    };
    const bulkApplySchoolCap = async (key, value) => {
        setBulkBusy(true);
        await Promise.all([...selectedSchoolIds].map((id) => {
            const s = schools.find((x) => x.id === id);
            return s ? setJSON(`school:${id}`, { ...s, [key]: value }) : null;
        }));
        setBulkBusy(false);
        setSelectedSchoolIds(new Set());
        await refresh();
    };
    const [messages, setMessages] = useState([]);
    const refresh = useCallback(async () => {
        const [sc, tc, msg] = await Promise.all([loadAll("school:"), loadAll("teacher:"), loadAll("message:")]);
        setSchools(sc.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        setTeachers(tc);
        setMessages(msg.filter((m) => m.channel === "admin_superadmin"));
        setLoading(false);
    }, []);
    useEffect(() => { refresh(); }, [refresh]);
    const lastReadMap = teacher.sa_thread_last_read || {};
    const unreadTotal = messages.filter((m) => (m.sender_role === "admin" || m.sender_role === "teacher")
        && (!lastReadMap[m.sender_role === "admin" ? m.school_id : m.teacher_id] || new Date(m.created_at) > new Date(lastReadMap[m.sender_role === "admin" ? m.school_id : m.teacher_id]))).length;
    const countsFor = (schoolId) => {
        const inSchool = teachers.filter((t) => t.school_id === schoolId);
        return {
            admins: inSchool.filter((t) => t.role === "admin").length,
            teachers: inSchool.filter((t) => t.role === "teacher").length,
        };
    };
    return (React.createElement("div", { style: { display: "flex", flexDirection: "row-reverse", minHeight: "100vh", background: "#F8FAFC" } },
        React.createElement(SuperAdminSidebar, { onLogout: onLogout, onSettings: () => setShowOwnSettings(true), onHelp: () => setShowHelp(true), name: teacher.fullname, activeTab: activeTab, onTab: setActiveTab, badges: { messages: unreadTotal } }),
        activeTab === "standalone" ? (React.createElement(StandaloneTeachersScreen, { teacher: teacher, teachers: teachers, loading: loading, onChanged: refresh })) : activeTab === "activity" ? (React.createElement(ActivityReportScreen, { teacher: teacher, schools: schools, teachers: teachers, loading: loading })) : activeTab === "messages" ? (React.createElement(SuperAdminMessagesScreen, { teacher: teacher, schools: schools, teachers: teachers, messages: messages, loading: loading, refresh: refresh, onUpdateSelf: onUpdateSelf })) : (React.createElement("div", { style: { flex: 1, padding: "30px 34px", overflowY: "auto" } },
            React.createElement(TopBar, { title: "\u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
            React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 } },
                React.createElement(StatCard, { icon: Library, label: "\u062A\u0639\u062F\u0627\u062F \u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627", value: schools.length, color: "#7C3AED" }),
                React.createElement(StatCard, { icon: Users, label: "\u062A\u0639\u062F\u0627\u062F \u0645\u062F\u06CC\u0631\u0627\u0646 \u0645\u062F\u0631\u0633\u0647", value: teachers.filter((t) => t.role === "admin").length, color: "#2563EB" }),
                React.createElement(StatCard, { icon: GraduationCap, label: "\u062A\u0639\u062F\u0627\u062F \u0645\u0639\u0644\u0645\u0627\u0646 (\u06A9\u0644)", value: teachers.filter((t) => t.role === "teacher").length, color: "#16A34A" })),
            React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" } },
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: "#1E293B" } }, "\u0641\u0647\u0631\u0633\u062A \u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627"),
                    React.createElement(Button, { onClick: () => setShowCreate(true) },
                        React.createElement(Plus, { size: 16 }),
                        "\u0633\u0627\u062E\u062A \u0645\u062F\u0631\u0633\u0647 \u062C\u062F\u06CC\u062F")),
                loading ? (React.createElement("div", { style: { color: "#94A3B8", fontSize: 13.5, padding: 20, textAlign: "center" } }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC...")) : schools.length === 0 ? (React.createElement(EmptyState, { text: "\u0647\u0646\u0648\u0632 \u0645\u062F\u0631\u0633\u0647\u200C\u0627\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.", actionLabel: "\u0633\u0627\u062E\u062A \u0645\u062F\u0631\u0633\u0647 \u062C\u062F\u06CC\u062F", onAction: () => setShowCreate(true) })) : (React.createElement("div", { style: { overflowX: "auto" } },
                    React.createElement(BulkActionBar, { count: selectedSchoolIds.size, busy: bulkBusy, onActivate: () => bulkSetSchoolsActive(true), onDeactivate: () => bulkSetSchoolsActive(false), capFields: [
                            { key: "max_classes", label: "سقف کلاس" },
                            { key: "max_exams_per_class_per_day", label: "سقف امتحان روزانه" },
                        ], onApplyCap: bulkApplySchoolCap, onClear: () => setSelectedSchoolIds(new Set()) }),
                    React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } },
                        React.createElement("thead", null,
                            React.createElement("tr", { style: { borderBottom: "1px solid #EEF1F6", textAlign: "right" } },
                                React.createElement("th", { style: { padding: "10px 6px" } },
                                    React.createElement("input", { type: "checkbox", checked: schools.length > 0 && selectedSchoolIds.size === schools.length, onChange: toggleSelectAllSchools, style: { width: 15, height: 15 } })),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0646\u0627\u0645 \u0645\u062F\u0631\u0633\u0647"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0648\u0636\u0639\u06CC\u062A"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0645\u062F\u06CC\u0631\u0627\u0646"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u0645\u0639\u0644\u0645\u0627\u0646"),
                                React.createElement("th", { style: { padding: "10px 6px", color: "#94A3B8", fontWeight: 700 } }, "\u062A\u0627\u0631\u06CC\u062E \u0633\u0627\u062E\u062A"),
                                React.createElement("th", { style: { padding: "10px 6px" } }))),
                        React.createElement("tbody", null, schools.map((s) => {
                            const c = countsFor(s.id);
                            const schoolAdmins = teachers.filter((t) => t.school_id === s.id && t.role === "admin");
                            const isActive = s.active !== false;
                            return (React.createElement("tr", { key: s.id, style: { borderBottom: "1px solid #F5F7FA" } },
                                React.createElement("td", { style: { padding: "10px 6px" } },
                                    React.createElement("input", { type: "checkbox", checked: selectedSchoolIds.has(s.id), onChange: () => toggleSchoolSelect(s.id), style: { width: 15, height: 15 } })),
                                React.createElement("td", { style: { padding: "10px 6px", fontWeight: 700, color: "#1E293B" } }, s.name),
                                React.createElement("td", { style: { padding: "10px 6px" } },
                                    React.createElement("span", { style: {
                                            fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                                            background: isActive ? "#DCFCE7" : "#FEF2F2", color: isActive ? "#16A34A" : "#DC2626",
                                        } }, isActive ? "فعال" : "غیرفعال")),
                                React.createElement("td", { style: { padding: "10px 6px" } }, schoolAdmins.length === 0 ? (c.admins) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, schoolAdmins.map((a) => (React.createElement("div", { key: a.username, style: { display: "flex", alignItems: "center", gap: 8 } },
                                    React.createElement(Avatar, { username: a.username, name: a.fullname, updatedAt: a.avatar_updated_at, size: 26 }),
                                    React.createElement("span", null, a.fullname))))))),
                                React.createElement("td", { style: { padding: "10px 6px" } }, c.teachers),
                                React.createElement("td", { style: { padding: "10px 6px", color: "#64748B" } }, s.created_at ? new Date(s.created_at).toLocaleDateString("fa-IR") : "—"),
                                React.createElement("td", { style: { padding: "10px 6px" } },
                                    React.createElement("div", { onClick: () => setManagingSchool(s), style: { display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#EFF6FF", cursor: "pointer" } },
                                        React.createElement(Settings, { size: 16, color: "#2563EB" })))));
                        })))))),
            React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, marginTop: 22 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u0627\u0646\u062A\u0642\u0627\u0644 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC \u0628\u0647 D1 (\u06CC\u06A9\u200C\u0628\u0627\u0631 \u0645\u0635\u0631\u0641)"),
                React.createElement("div", { style: { fontSize: 12.5, color: "#64748B", marginBottom: 16 } }, "\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u062C\u062F\u06CC\u062F \u0627\u0632 \u0627\u06CC\u0646 \u0628\u0647 \u0628\u0639\u062F \u062E\u0648\u062F\u06A9\u0627\u0631 \u0647\u0645 \u062F\u0631 D1 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0646 \u062A\u0627 \u0635\u0641\u062D\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646 \u0648 \u0648\u0631\u0648\u062F \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u0633\u0631\u06CC\u0639\u200C\u062A\u0631 \u0648 \u0633\u0628\u06A9\u200C\u062A\u0631 \u0628\u0634\u0647. \u0627\u0645\u0627 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 (\u0642\u0628\u0644 \u0627\u0632 \u0627\u06CC\u0646 \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC\u060C \u0628\u0631\u0627\u06CC \u0647\u0645\u0647\u200C\u06CC \u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627) \u0628\u0627\u06CC\u062F \u06CC\u06A9\u200C\u0628\u0627\u0631 \u0628\u0627 \u0647\u0645\u06CC\u0646 \u062F\u06A9\u0645\u0647 \u0645\u0646\u062A\u0642\u0644 \u0628\u0634\u0646. \u0627\u062C\u0631\u0627\u06CC \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u0634 \u0647\u0645 \u0645\u0634\u06A9\u0644\u06CC \u0646\u062F\u0627\u0631\u0647."),
                React.createElement(Button, { onClick: migrateToD1, disabled: d1Busy }, "\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u0647 D1"),
                d1Msg && React.createElement("div", { style: { fontSize: 13, color: d1ToneColor, fontWeight: 600, marginTop: 10, whiteSpace: "pre-wrap" } }, d1Msg)),
            React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, marginTop: 22 } },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 } }, "\u0630\u062E\u06CC\u0631\u0647\u200C\u06CC \u062F\u0648\u0631\u0647\u200C\u0627\u06CC \u067E\u0627\u0633\u062E\u200C\u0647\u0627 \u062D\u06CC\u0646 \u0627\u0645\u062A\u062D\u0627\u0646"),
                React.createElement("div", { style: { fontSize: 12.5, color: "#64748B", marginBottom: 16 } }, "\u062F\u0631 \u0637\u0648\u0644 \u0647\u0631 \u0627\u0645\u062A\u062D\u0627\u0646\u060C \u067E\u0627\u0633\u062E\u200C\u0647\u0627\u06CC \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0647\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062F\u0648\u0631\u0647\u200C\u0627\u06CC \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0647\u0645 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0646 (\u0628\u0631\u0627\u06CC \u0648\u0642\u062A\u06CC \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0645\u062C\u0628\u0648\u0631 \u0628\u0634\u0647 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0639\u0648\u0636 \u06A9\u0646\u0647). \u0627\u06CC\u0646 \u0639\u062F\u062F \u06CC\u0639\u0646\u06CC \u0686\u0646\u062F \u0628\u0627\u0631 \u0627\u06CC\u0646 \u0630\u062E\u06CC\u0631\u0647\u200C\u06CC \u062F\u0648\u0631\u0647\u200C\u0627\u06CC \u062F\u0631 \u0637\u0648\u0644 \u06A9\u0644 \u0645\u062F\u062A \u0647\u0631 \u0627\u0645\u062A\u062D\u0627\u0646 \u0627\u0646\u062C\u0627\u0645 \u0628\u0634\u0647 \u2014 \u0639\u062F\u062F \u0628\u06CC\u0634\u062A\u0631 \u06CC\u0639\u0646\u06CC \u0627\u0645\u0646\u06CC\u062A \u062C\u0648\u0627\u0628\u200C\u0647\u0627 \u0628\u06CC\u0634\u062A\u0631 \u0648\u0644\u06CC \u0645\u0635\u0631\u0641 \u0633\u0647\u0645\u06CC\u0647\u200C\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u06A9\u0644\u0627\u062F\u0641\u0644\u0631 \u0647\u0645 \u0628\u06CC\u0634\u062A\u0631\u061B \u0639\u062F\u062F \u06A9\u0645\u062A\u0631 \u0628\u0631\u0639\u06A9\u0633. \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u06CC: \u06F5."),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                    React.createElement("input", { type: "number", min: 2, max: 10, value: draftSaveCount, onChange: (e) => setDraftSaveCount(e.target.value), style: { width: 80, padding: "8px 10px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 14, textAlign: "center" } }),
                    React.createElement(Button, { onClick: saveDraftSaveCount, disabled: draftSaveBusy }, "\u0630\u062E\u06CC\u0631\u0647"),
                    draftSaveMsg && React.createElement("span", { style: { fontSize: 12.5, color: "#16A34A", fontWeight: 600 } }, draftSaveMsg))))),
        showCreate && (React.createElement(Modal, { title: "\u0633\u0627\u062E\u062A \u0645\u062F\u0631\u0633\u0647\u200C\u06CC \u062C\u062F\u06CC\u062F", onClose: () => setShowCreate(false) },
            React.createElement(CreateSchoolForm, { existingUsernames: teachers.map((t) => t.username), onCreated: async (school, admin, emailResult) => {
                    setShowCreate(false);
                    await refresh();
                    if (emailResult && !emailResult.sent)
                        window.alert(`مدرسه و حساب مدیر ساخته شد، ولی ایمیل خوش‌آمد ارسال نشد:\n${emailResult.note}`);
                    setManagingSchool(school);
                } }))),
        managingSchool && (React.createElement(SchoolDetailModal, { school: schools.find((s) => s.id === managingSchool.id) || managingSchool, admins: teachers.filter((t) => t.school_id === managingSchool.id && t.role === "admin"), teacherCount: teachers.filter((t) => t.school_id === managingSchool.id && t.role === "teacher").length, existingUsernames: teachers.map((t) => t.username), onClose: () => setManagingSchool(null), onChanged: refresh })),
        showHelp && (React.createElement(Modal, { title: "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A", onClose: () => setShowHelp(false) },
            React.createElement("div", { style: { fontSize: 13.5, color: "#334155", lineHeight: 2.1 } },
                React.createElement("b", null, "\u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627:"),
                " \u0627\u0632 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0645\u062F\u0631\u0633\u0647\u200C\u06CC \u062C\u062F\u06CC\u062F \u0628\u0633\u0627\u0632 (\u0647\u0645\u0631\u0627\u0647 \u0628\u0627 \u06CC\u06A9 \u062D\u0633\u0627\u0628 \u0645\u062F\u06CC\u0631 \u0645\u062F\u0631\u0633\u0647)\u060C \u0645\u062F\u0631\u0633\u0647 \u0631\u0627 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644/\u0641\u0639\u0627\u0644 \u06A9\u0646\u060C \u0633\u0642\u0641 \u062A\u0639\u062F\u0627\u062F \u06A9\u0644\u0627\u0633\u200C\u0647\u0627/\u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u06CC \u0631\u0648\u0632\u0627\u0646\u0647\u200C\u0634 \u0631\u0627 \u062A\u0646\u0638\u06CC\u0645 \u06A9\u0646\u060C \u0628\u0631\u0627\u06CC \u0647\u0631 \u0645\u062F\u0631\u0633\u0647 \u0686\u0646\u062F \u0645\u062F\u06CC\u0631 \u0628\u06AF\u0630\u0627\u0631\u060C \u0648 \u0627\u0632 \u062F\u0627\u062E\u0644 \u062C\u0632\u0626\u06CC\u0627\u062A \u0647\u0631 \u0645\u062F\u0631\u0633\u0647 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0645\u062F\u06CC\u0631 \u06CC\u0627 \u0645\u0639\u0644\u0645\u200C\u0647\u0627\u06CC\u0634 \u0631\u0627 \u062F\u0631 \u0635\u0648\u0631\u062A \u0646\u06CC\u0627\u0632 \u0645\u0633\u062A\u0642\u06CC\u0645\u0627\u064B \u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u06A9\u0646. \u062F\u06A9\u0645\u0647\u200C\u06CC \u00AB\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u0647 D1\u00BB \u06CC\u06A9 \u0627\u0628\u0632\u0627\u0631 \u0641\u0646\u06CC \u0628\u0631\u0627\u06CC \u0633\u0631\u0639\u062A\u200C\u0628\u062E\u0634\u06CC\u062F\u0646 \u0628\u0647 \u067E\u0627\u06CC\u06AF\u0627\u0647\u200C\u062F\u0627\u062F\u0647 \u0627\u0633\u062A\u061B \u0645\u0639\u0645\u0648\u0644\u0627\u064B \u0646\u06CC\u0627\u0632\u06CC \u0628\u0647 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0622\u0646 \u0646\u06CC\u0633\u062A.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0642\u0627\u0628\u0644\u06CC\u062A\u200C\u0647\u0627\u06CC \u0645\u062F\u0631\u0633\u0647 (\u067E\u0644\u0646):"),
                " \u0627\u0632 \u062F\u0627\u062E\u0644 \u062C\u0632\u0626\u06CC\u0627\u062A \u0647\u0631 \u0645\u062F\u0631\u0633\u0647\u060C \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u0648 \u0686\u062A \u06A9\u0644\u0627\u0633\u06CC \u0631\u0627 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0628\u0631\u0627\u06CC \u06A9\u0644 \u0645\u062F\u0631\u0633\u0647 (\u06CC\u0639\u0646\u06CC \u0645\u062F\u06CC\u0631 + \u0647\u0645\u0647\u200C\u06CC \u0645\u0639\u0644\u0645\u200C\u0647\u0627\u06CC\u0634) \u0631\u0648\u0634\u0646 \u06CC\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u06CC \u2014 \u0627\u06CC\u0646 \u06CC\u06A9 \u0633\u0648\u06CC\u06CC\u0686 \u0633\u0631\u0627\u0633\u0631\u06CC \u0628\u0631\u0627\u06CC \u0647\u0645\u0627\u0646 \u0645\u062F\u0631\u0633\u0647 \u0627\u0633\u062A\u060C \u0646\u0647 \u0628\u0631\u0627\u06CC \u0647\u0631 \u0645\u0639\u0644\u0645 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0645\u0639\u0644\u0645\u0627\u0646 \u0645\u0633\u062A\u0642\u0644:"),
                " \u062D\u0633\u0627\u0628\u200C\u0647\u0627\u06CC \u0645\u0639\u0644\u0645\u06CC \u06A9\u0647 \u0628\u0647 \u0647\u06CC\u0686 \u0645\u062F\u0631\u0633\u0647\u200C\u0627\u06CC \u0648\u0635\u0644 \u0646\u06CC\u0633\u062A\u0646\u062F \u0648 \u062E\u0648\u062F\u0634\u0627\u0646 \u06A9\u0644\u0627\u0633/\u0622\u0632\u0645\u0648\u0646 \u062E\u0648\u062F\u0634\u0627\u0646 \u0631\u0627 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0645\u06CC\u200C\u06A9\u0646\u0646\u062F. \u0627\u06CC\u0646\u062C\u0627 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0633\u0642\u0641 \u062A\u0639\u062F\u0627\u062F \u06A9\u0644\u0627\u0633 \u0648 \u0622\u0632\u0645\u0648\u0646\u0634\u0627\u0646 \u0631\u0627 \u062A\u0646\u0638\u06CC\u0645 \u06A9\u0646\u06CC\u060C \u0641\u0639\u0627\u0644/\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0634\u0627\u0646 \u06A9\u0646\u06CC\u060C \u0648 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC/\u0686\u062A \u06A9\u0644\u0627\u0633\u06CC \u0631\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0634\u062E\u0635\u06CC (\u0646\u0647 \u06AF\u0631\u0648\u0647\u06CC) \u0628\u0631\u0627\u06CC \u0647\u0631\u06A9\u062F\u0627\u0645 \u0631\u0648\u0634\u0646 \u06CC\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u06CC.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u06AF\u0632\u0627\u0631\u0634 \u0639\u0645\u0644\u06A9\u0631\u062F:"),
                " \u0641\u0647\u0631\u0633\u062A \u0647\u0645\u0647\u200C\u06CC \u0645\u062F\u06CC\u0631\u0627\u0646 \u0645\u062F\u0631\u0633\u0647 \u0648 \u0645\u0639\u0644\u0645\u0627\u0646 \u0645\u0633\u062A\u0642\u0644 \u0628\u0647 \u0647\u0645\u0631\u0627\u0647 \u0622\u062E\u0631\u06CC\u0646 \u0648\u0631\u0648\u062F\u060C \u062A\u0639\u062F\u0627\u062F \u062F\u0641\u0639\u0627\u062A \u0648\u0631\u0648\u062F\u060C \u0648 \u062A\u0627\u0631\u06CC\u062E \u0639\u0636\u0648\u06CC\u062A \u2014 \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0627\u06CC\u0646\u06A9\u0647 \u06A9\u062F\u0627\u0645 \u062D\u0633\u0627\u0628\u200C\u0647\u0627 \u0641\u0639\u0627\u0644\u200C\u0627\u0646\u062F \u0648 \u06A9\u062F\u0627\u0645\u200C\u0647\u0627 \u0645\u062F\u062A\u06CC \u0627\u0633\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0646\u0634\u062F\u0647\u200C\u0627\u0646\u062F.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u067E\u06CC\u0627\u0645\u200C\u0647\u0627:"),
                " \u06AF\u0641\u062A\u06AF\u0648\u06CC \u062F\u0648\u0637\u0631\u0641\u0647\u200C\u06CC \u0645\u0633\u062A\u0642\u06CC\u0645 \u062A\u0648 \u0628\u0627 \u0645\u062F\u06CC\u0631\u0627\u0646 \u0645\u062F\u0631\u0633\u0647\u200C\u0647\u0627 \u0648 \u0647\u0645\u0686\u0646\u06CC\u0646 \u0645\u0639\u0644\u0645\u0627\u0646 \u0645\u0633\u062A\u0642\u0644 \u2014 \u0627\u0632 \u0628\u0627\u0644\u0627\u06CC \u0635\u0641\u062D\u0647 \u0628\u06CC\u0646 \u0627\u06CC\u0646 \u062F\u0648 \u062F\u0633\u062A\u0647 \u062C\u0627\u0628\u0647\u200C\u062C\u0627 \u0634\u0648. \u0628\u0627 \u06A9\u0644\u06CC\u062F \u0628\u0627\u0644\u0627\u06CC \u0635\u0641\u062D\u0647 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0627\u0632 \u0637\u0631\u0641 \u0622\u0646\u200C\u0647\u0627 \u0628\u0647 \u062A\u0648 \u0631\u0627 \u06A9\u0644\u0627\u064B \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0646\u06CC (\u062E\u0648\u062F\u062A \u0647\u0645\u06CC\u0634\u0647 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u06CC).",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0639\u0645\u0644\u06CC\u0627\u062A \u06AF\u0631\u0648\u0647\u06CC:"),
                " \u0628\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0686\u0646\u062F \u0645\u062F\u0631\u0633\u0647 \u06CC\u0627 \u0686\u0646\u062F \u0645\u0639\u0644\u0645 \u0645\u0633\u062A\u0642\u0644 \u0628\u0627 \u062A\u06CC\u06A9\u060C \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0647\u0645\u0647 \u0631\u0627 \u0628\u0627 \u0647\u0645 \u0641\u0639\u0627\u0644/\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0646\u06CC \u06CC\u0627 \u06CC\u06A9 \u0633\u0642\u0641 \u0645\u0634\u062A\u0631\u06A9 \u0628\u0631\u0627\u06CC\u0634\u0627\u0646 \u062A\u0646\u0638\u06CC\u0645 \u06A9\u0646\u06CC.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0633\u0627\u0628:"),
                " \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0648 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628 \u062E\u0648\u062F\u062A."))),
        showOwnSettings && (React.createElement(AdminProfileModal, { teacher: teacher, onClose: () => setShowOwnSettings(false), onSaved: (updated) => { onUpdateSelf && onUpdateSelf(updated); } }))));
}

/* ===== app.js ===== */
"use strict";
/* ---------------------------------------------------------
   ROOT APP
   © ghobeishawi - All rights reserved.
--------------------------------------------------------- */
function EduExamApp() {
    const [authView, setAuthView] = useState("login"); // login | register | forgot
    const [portalMode, setPortalMode] = useState("teacher"); // teacher | student
    const [teacher, setTeacher] = useState(null);
    const [view, setView] = useState("dashboard");
    const [activeExamId, setActiveExamId] = useState(null);
    const [showHelp, setShowHelp] = useState(false);
    const [activeClassId, setActiveClassId] = useState(null);
    // If the URL is a student exam link (?exam=ID), jump straight into it, no login needed.
    const [studentExamId, setStudentExamId] = useState(() => new URLSearchParams(window.location.search).get("exam"));
    // If the URL is a password-reset link (?reset=TOKEN), show the reset screen.
    const [resetToken, setResetToken] = useState(() => new URLSearchParams(window.location.search).get("reset"));
    const [teacherExists, setTeacherExists] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [exams, setExams] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [students, setStudents] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [roster, setRoster] = useState([]);
    const [messages, setMessages] = useState([]);
    const [cheatAlerts, setCheatAlerts] = useState([]);
    const [mySchool, setMySchool] = useState(null);
    const [ready, setReady] = useState(false);
    const [sessionChecked, setSessionChecked] = useState(false);
    const [showAlerts, setShowAlerts] = useState(false);
    const [alertBtnPos, setAlertBtnPos] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("eduexam_alertbtn_pos"));
            if (saved && typeof saved.top === "number" && typeof saved.left === "number")
                return saved;
        }
        catch { /* use default below */ }
        return { top: 22, left: 22 };
    });
    const draggingRef = useRef(false);
    const dragMovedRef = useRef(false);
    const dragOffsetRef = useRef({ x: 0, y: 0 });
    const startDrag = (clientX, clientY) => {
        draggingRef.current = true;
        dragMovedRef.current = false;
        dragOffsetRef.current = { x: clientX - alertBtnPos.left, y: clientY - alertBtnPos.top };
    };
    const onDragMove = (clientX, clientY) => {
        if (!draggingRef.current)
            return;
        dragMovedRef.current = true;
        const btn = 44;
        const maxLeft = window.innerWidth - btn - 6;
        const maxTop = window.innerHeight - btn - 6;
        const left = Math.min(Math.max(clientX - dragOffsetRef.current.x, 6), maxLeft);
        const top = Math.min(Math.max(clientY - dragOffsetRef.current.y, 6), maxTop);
        setAlertBtnPos({ top, left });
    };
    const endDrag = () => {
        if (!draggingRef.current)
            return;
        draggingRef.current = false;
        try {
            localStorage.setItem("eduexam_alertbtn_pos", JSON.stringify(alertBtnPos));
        }
        catch { /* ignore */ }
    };
    useEffect(() => {
        const onMouseMove = (e) => onDragMove(e.clientX, e.clientY);
        const onTouchMove = (e) => { if (draggingRef.current && e.touches[0]) {
            e.preventDefault();
            onDragMove(e.touches[0].clientX, e.touches[0].clientY);
        } };
        const onUp = () => endDrag();
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("mouseup", onUp);
        window.addEventListener("touchend", onUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mouseup", onUp);
            window.removeEventListener("touchend", onUp);
        };
    }, [alertBtnPos]);
    // Restore a "remembered" login (see saveSession/loadSession in ui.js) so
    // refreshing the page doesn't force a re-login. Only trusts the saved
    // session if the stored password hash still matches the current one on
    // the teacher record — so changing the password anywhere invalidates
    // any other saved sessions automatically.
    //
    // Hub login: if the URL carries ?hub_token=... (set by the central hub's
    // "ورود به مدیریت" button), exchange it for a real session via
    // /api/hub/consume instead of the normal login form. The exchanged token
    // is saved through the exact same saveSession() path as a normal login,
    // so everything downstream (getAuthToken/authHeaders/session restore on
    // future refreshes) treats it identically. The one-time hub_token is
    // stripped from the URL immediately so it never lingers in history.
    useEffect(() => {
        (async () => {
            const hubToken = new URLSearchParams(window.location.search).get("hub_token");
            if (hubToken) {
                const cleanUrl = window.location.pathname + window.location.hash;
                window.history.replaceState({}, "", cleanUrl);
                try {
                    const r = await fetch("/api/hub/consume", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token: hubToken }),
                    });
                    const data = await r.json().catch(() => ({}));
                    if (r.ok && data.ok && data.teacher) {
                        saveSession(data.teacher.username, data.teacher.password, data.token);
                        setTeacher(data.teacher);
                        setSessionChecked(true);
                        return;
                    }
                }
                catch { /* fall through to normal session-restore below */ }
            }
            const session = loadSession();
            if (session) {
                const t = await getJSON(`teacher:${session.username}`);
                if (t && t.password === session.passwordHash) {
                    setTeacher(t);
                }
                else {
                    clearSession();
                }
            }
            setSessionChecked(true);
        })();
    }, []);
    // شناسه‌ی چیزهایی که همین الان (توسط خود کاربر) حذف شدن رو چند ثانیه نگه
    // می‌داریم؛ چون لیست KV ممکنه هنوز نسخه‌ی حذف‌نشده رو برگردونه و باعث بشه
    // چیزی که حذف کردیم دوباره ظاهر بشه.
    const deletedClassIdsRef = useRef(new Set());
    const deletedRosterIdsRef = useRef(new Set());
    const deletedQuestionIdsRef = useRef(new Set());
    const deletedExamIdsRef = useRef(new Set());
    const deletedMessageIdsRef = useRef(new Set());
    const refresh = useCallback(async () => {
        // v75/v76: یک درخواست یک‌جا به‌جای 5×loadAll + loadAll("teacher:") +
        // loadTeacherDashboardData() (ده‌ها تا صدها درخواست جدا، دلیل اصلی
        // اتمام سریع سهمیه‌ی رایگان Workers — آیتم ۴۴). اگه fail بشه، به روش
        // قدیمی fallback می‌کنیم تا داشبورد کامل از کار نیفته.
        const full = await loadFullDashboardData();
        let ex, qs, cl, ro, msg, allTeachers, st, an, alerts;
        if (full) {
            ex = full.exams || [];
            qs = full.questions || [];
            cl = full.classes || [];
            ro = full.roster || [];
            msg = full.messages || [];
            allTeachers = full.teachers || [];
            st = full.students || [];
            an = full.answers || [];
            alerts = full.cheatalerts || [];
        }
        else {
            const [ex2, qs2, cl2, ro2, msg2, allTeachers2, dashData] = await Promise.all([
                loadAll("exam:"), loadAll("question:"),
                loadAll("class:"), loadAll("roster:"), loadAll("message:"),
                loadAll("teacher:"), loadTeacherDashboardData(),
            ]);
            ex = ex2;
            qs = qs2;
            cl = cl2;
            ro = ro2;
            msg = msg2;
            allTeachers = allTeachers2;
            st = dashData.students;
            an = dashData.answers;
            alerts = dashData.cheatalerts;
        }
        setStudents(st);
        setAnswers(an);
        // برای کلاس/دانش‌آموز/سوال/آزمون، به‌جای جایگزینی کامل با نسخه‌ی سرور (که
        // ممکنه چند ثانیه عقب‌تر باشه و باعث بشه چیزی که تازه اضافه کردیم
        // ناپدید به‌نظر برسه)، نسخه‌ی سرور رو با هرچی که همین الان توی رابط
        // کاربری داریم و سرور هنوز نشونش نداده «ادغام» می‌کنیم.
        setExams((prev) => {
            const fresh = ex.filter((e) => !deletedExamIdsRef.current.has(e.id));
            const freshIds = new Set(fresh.map((e) => e.id));
            const extra = prev.filter((e) => !freshIds.has(e.id) && !deletedExamIdsRef.current.has(e.id));
            return [...fresh, ...extra];
        });
        setClasses((prev) => {
            const fresh = cl.filter((c) => !deletedClassIdsRef.current.has(c.id));
            const freshIds = new Set(fresh.map((c) => c.id));
            const extra = prev.filter((c) => !freshIds.has(c.id) && !deletedClassIdsRef.current.has(c.id));
            return sortByFa([...fresh, ...extra], (c) => c.name);
        });
        setRoster((prev) => {
            const fresh = ro.filter((r) => !deletedRosterIdsRef.current.has(r.id));
            const freshIds = new Set(fresh.map((r) => r.id));
            const extra = prev.filter((r) => !freshIds.has(r.id) && !deletedRosterIdsRef.current.has(r.id));
            return sortByFa([...fresh, ...extra], (r) => r.fullname);
        });
        setQuestions((prev) => {
            const fresh = qs.filter((q) => !deletedQuestionIdsRef.current.has(q.id));
            const freshIds = new Set(fresh.map((q) => q.id));
            const extra = prev.filter((q) => !freshIds.has(q.id) && !deletedQuestionIdsRef.current.has(q.id));
            return [...fresh, ...extra];
        });
        setMessages((prev) => {
            const fresh = msg.filter((m) => !deletedMessageIdsRef.current.has(m.id));
            const freshIds = new Set(fresh.map((m) => m.id));
            const extra = prev.filter((m) => !freshIds.has(m.id) && !deletedMessageIdsRef.current.has(m.id));
            return [...fresh, ...extra];
        });
        setCheatAlerts(alerts);
        setTeachers(allTeachers);
    }, []);
    // نسخه‌ی سبک refresh() — فقط پیام‌ها رو دوباره می‌خونه، نه کل حساب
    // (آزمون‌ها، سوال‌ها، کلاس‌ها، روستر، معلم‌ها). چون این تابع هر چند
    // ثانیه یک‌بار توی صفحه‌ی چت زنده صدا زده می‌شه، استفاده از refresh()
    // کامل اون‌جا یعنی ده‌ها/صدها درخواست اضافه به سرور در هر بار polling —
    // که می‌تونه خیلی سریع سهمیه‌ی رایگان Workers رو ته بکشه (کشف‌شده وقتی
    // کاربر بدون هیچ دانش‌آموز واقعی‌ای، فقط با باز نگه‌داشتن صفحه‌ی چت حین
    // تست، به ۵۰٪ سهمیه‌ی روزانه رسید).
    const refreshMessages = useCallback(async () => {
        const msg = await loadAll("message:");
        setMessages((prev) => {
            const fresh = msg.filter((m) => !deletedMessageIdsRef.current.has(m.id));
            const freshIds = new Set(fresh.map((m) => m.id));
            const extra = prev.filter((m) => !freshIds.has(m.id) && !deletedMessageIdsRef.current.has(m.id));
            return [...fresh, ...extra];
        });
    }, []);
    // Used instead of refresh() for the student exam-link flow (?exam=ID).
    // refresh() pulls the *entire* database — every teacher's password hash,
    // every exam's answer key, every student's records — which is fine for a
    // logged-in teacher's own dashboard but must never be sent to an anonymous
    // student. This hits a dedicated endpoint that returns only the one exam's
    // data, with correct answers stripped out server-side.
    const loadStudentSession = useCallback(async (examId) => {
        try {
            const r = await fetch(`/api/exam-session?examId=${encodeURIComponent(examId)}`);
            if (!r.ok) {
                setExams([]);
                return;
            }
            const data = await r.json();
            setExams([data.exam]);
            setQuestions(data.questions || []);
            // v76: این endpoint دیگه roster (شامل کد شخصی دانش‌آموزها) رو
            // برنمی‌گردونه — تطبیق کد حالا سمت سرور در handleExamStart/
            // handleExamVerifyCode انجام می‌شه. roster اینجا همیشه خالیه.
            setRoster([]);
            setClasses(sortByFa(data.classes || [], (c) => c.name));
        }
        catch {
            setExams([]);
        }
    }, []);
    // برای آزمون‌هایی که «بانک سؤال تصادفی» فعاله: تا اسم دانش‌آموز معلوم
    // نشه، سرور هیچ سؤالی برنمی‌گردونه (که کل بانک از network tab لو نره).
    // این تابع با اسم دوباره صدا زده می‌شه تا همون زیرمجموعه‌ی مخصوص همین
    // دانش‌آموز رو بگیره؛ هم state کلی رو آپدیت می‌کنه هم مستقیم برمی‌گردونه
    // (چون فراخوان معمولاً بلافاصله بعدش به همون آرایه نیاز داره، نه به
    // یک رندر بعدی).
    const fetchExamQuestionsForName = useCallback(async (examId, name, rosterId) => {
        try {
            const r = await fetch(`/api/exam-session?examId=${encodeURIComponent(examId)}&name=${encodeURIComponent(name)}${rosterId ? `&rosterId=${encodeURIComponent(rosterId)}` : ""}`);
            if (!r.ok)
                return [];
            const data = await r.json();
            setQuestions(data.questions || []);
            return data.questions || [];
        }
        catch {
            return [];
        }
    }, []);
    useEffect(() => {
        (async () => {
            if (studentExamId) {
                await loadStudentSession(studentExamId);
                setReady(true);
                return;
            }
            // Whether a teacher account exists yet decides whether the login screen
            // offers "register" — this has to work before anyone is logged in, so
            // it's a small dedicated public endpoint rather than the authenticated
            // refresh() below.
            try {
                const r = await fetch("/api/teacher-exists");
                if (r.ok) {
                    const d = await r.json();
                    setTeacherExists(!!d.exists);
                }
            }
            catch { /* ignore — defaults to false, register screen offered */ }
            setReady(true);
        })();
    }, [studentExamId, loadStudentSession]);
    // Load the full authenticated dataset once a teacher is actually logged in
    // (fresh login, or a restored session) — never before, since /api/kv and
    // /api/list now require a valid session token.
    useEffect(() => {
        if (teacher && !studentExamId && teacher.role !== "super_admin")
            refresh();
    }, [teacher, studentExamId, refresh]);
    // Teacher-role sidebar branding (school's logo + accent color), fetched
    // separately since it's not part of the teacher's own KV record.
    useEffect(() => {
        if (!teacher || teacher.role !== "teacher" || !teacher.school_id) {
            setMySchool(null);
            return;
        }
        let cancelled = false;
        getJSON(`school:${teacher.school_id}`).then((s) => { if (!cancelled)
            setMySchool(s); });
        return () => { cancelled = true; };
    }, [teacher]);
    // پیام‌های خوانده‌نشده از مدیر سایت (فقط معلم مستقل) برای نشان روی «پیام‌ها»
    const unreadSaThreadCount = (teacher && !teacher.school_id)
        ? messages.filter((m) => m.channel === "admin_superadmin" && m.teacher_id === teacher.username
            && m.sender_role === "super_admin" && new Date(m.created_at) > new Date(teacher.sa_thread_last_read_at || 0)).length
        : 0;
    // قابلیت هوش مصنوعی: برای معلم زیرمجموعه‌ی یک مدرسه، «پلن مدرسه»ست (روی
    // mySchool.features که بالا خونده شد)؛ برای معلم مستقل، شخصیه (روی خودِ
    // teacher.features). پیش‌فرض خاموشه (باید صراحتاً روشن بشه).
    const aiAllowed = teacher && teacher.school_id
        ? !!(mySchool && mySchool.features && mySchool.features.ai_assistant)
        : !!(teacher && teacher.features && teacher.features.ai_assistant);
    // چت کلاسی هم مثل هوش مصنوعی قفل‌شدنیه، ولی برخلافش پیش‌فرض روشنه (چون
    // از قبل بدون این قفل شیپ شده بود) — فقط با false صریح خاموش می‌شه.
    const classChatFeatureOn = (features) => !features || features.class_chat === undefined ? true : !!features.class_chat;
    const classChatAllowed = teacher && teacher.school_id
        ? classChatFeatureOn(mySchool && mySchool.features)
        : classChatFeatureOn(teacher && teacher.features);
    // نشان تعداد پیام‌های خوانده‌نشده‌ی چت کلاسی (از دانش‌آموزها) برای نوار کناری معلم.
    const unreadClassChatCount = teacher
        ? (() => {
            const lastReadMap = teacher.class_chat_last_read || {};
            return messages.filter((m) => m.kind === "class_chat" && m.teacher_id === teacher.username && m.sender_role === "student"
                && (!lastReadMap[m.class_id] || new Date(m.created_at) > new Date(lastReadMap[m.class_id]))).length;
        })()
        : 0;
    // Auto-sync any exam submissions that were queued locally because the
    // student had no internet connection at the time. Retried whenever the
    // browser reports it's back online, and periodically as a fallback (the
    // 'online' event isn't always reliable on flaky mobile connections).
    useEffect(() => {
        const trySync = async () => {
            const synced = await flushOfflineQueue();
            if (synced > 0) {
                if (studentExamId)
                    loadStudentSession(studentExamId);
                else if (teacher)
                    refresh();
            }
        };
        trySync();
        window.addEventListener("online", trySync);
        const interval = setInterval(trySync, 20000);
        return () => {
            window.removeEventListener("online", trySync);
            clearInterval(interval);
        };
    }, [refresh, studentExamId, loadStudentSession, teacher]);
    // Optimistic local-state helpers for classes/roster — KV's list endpoint
    // is only eventually consistent, so a just-written/deleted key can take
    // a few seconds to show up (or disappear) via refresh(). These update the
    // UI immediately; refresh() still runs afterward to stay in sync.
    const addLocalExam = useCallback((record) => {
        setExams((prev) => [...prev, record]);
    }, []);
    const updateLocalExam = useCallback((record) => {
        setExams((prev) => prev.map((e) => (e.id === record.id ? record : e)));
    }, []);
    const removeLocalExam = useCallback((id) => {
        deletedExamIdsRef.current.add(id);
        setTimeout(() => deletedExamIdsRef.current.delete(id), 20000);
        setExams((prev) => prev.filter((e) => e.id !== id));
    }, []);
    const addLocalMessage = useCallback((record) => {
        setMessages((prev) => [...prev, record]);
    }, []);
    const removeLocalMessage = useCallback((id) => {
        deletedMessageIdsRef.current.add(id);
        setTimeout(() => deletedMessageIdsRef.current.delete(id), 20000);
        setMessages((prev) => prev.filter((m) => m.id !== id));
    }, []);
    const addLocalClass = useCallback((record) => {
        setClasses((prev) => sortByFa([...prev, record], (c) => c.name));
    }, []);
    const removeLocalClass = useCallback((id) => {
        deletedClassIdsRef.current.add(id);
        setTimeout(() => deletedClassIdsRef.current.delete(id), 20000);
        setClasses((prev) => prev.filter((c) => c.id !== id));
        setRoster((prev) => prev.filter((r) => r.class_id !== id));
    }, []);
    const updateLocalClass = useCallback((record) => {
        setClasses((prev) => sortByFa(prev.map((c) => (c.id === record.id ? record : c)), (c) => c.name));
    }, []);
    const addLocalRoster = useCallback((record) => {
        setRoster((prev) => sortByFa([...prev, record], (r) => r.fullname));
    }, []);
    const addLocalRosterMany = useCallback((records) => {
        setRoster((prev) => sortByFa([...prev, ...records], (r) => r.fullname));
    }, []);
    const updateLocalRoster = useCallback((record) => {
        setRoster((prev) => sortByFa(prev.map((r) => (r.id === record.id ? record : r)), (r) => r.fullname));
    }, []);
    const removeLocalRoster = useCallback((id) => {
        deletedRosterIdsRef.current.add(id);
        setTimeout(() => deletedRosterIdsRef.current.delete(id), 20000);
        setRoster((prev) => prev.filter((r) => r.id !== id));
    }, []);
    const addLocalQuestion = useCallback((record) => {
        setQuestions((prev) => [...prev, record]);
    }, []);
    const addLocalQuestionMany = useCallback((records) => {
        setQuestions((prev) => [...prev, ...records]);
    }, []);
    const updateLocalQuestion = useCallback((record) => {
        setQuestions((prev) => prev.map((q) => (q.id === record.id ? record : q)));
    }, []);
    const removeLocalQuestion = useCallback((id) => {
        deletedQuestionIdsRef.current.add(id);
        setTimeout(() => deletedQuestionIdsRef.current.delete(id), 20000);
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    }, []);
    const removeLocalQuestionMany = useCallback((ids) => {
        ids.forEach((id) => {
            deletedQuestionIdsRef.current.add(id);
            setTimeout(() => deletedQuestionIdsRef.current.delete(id), 20000);
        });
        const idSet = new Set(ids);
        setQuestions((prev) => prev.filter((q) => !idSet.has(q.id)));
    }, []);
    if (!ready || !sessionChecked) {
        return (React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", fontFamily: "inherit", color: "#64748B" } }, "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC..."));
    }
    // Student is taking an exam — separate full-screen flow, no auth needed.
    if (studentExamId) {
        const exam = exams.find((e) => e.id === studentExamId);
        if (!exam) {
            return (React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" } }, "\u0622\u0632\u0645\u0648\u0646 \u06CC\u0627\u0641\u062A \u0646\u0634\u062F."));
        }
        return (React.createElement(TakeExamScreen, { exam: exam, questions: questions, roster: roster, classes: classes, fetchQuestionsForName: fetchExamQuestionsForName, onFinish: () => loadStudentSession(studentExamId), onExit: () => {
                setStudentExamId(null);
                const url = new URL(window.location.href);
                url.searchParams.delete("exam");
                window.history.replaceState({}, "", url);
            } }));
    }
    // Password-reset link (?reset=TOKEN) — shown regardless of login state.
    if (resetToken) {
        return (React.createElement(ResetPasswordScreen, { token: resetToken, onDone: () => {
                setResetToken(null);
                const url = new URL(window.location.href);
                url.searchParams.delete("reset");
                window.history.replaceState({}, "", url);
            } }));
    }
    if (!teacher) {
        const showRegister = authView === "register" && !teacherExists;
        const showForgot = authView === "forgot";
        if (showForgot) {
            return React.createElement(ForgotPasswordScreen, { goLogin: () => setAuthView("login") });
        }
        return showRegister ? (React.createElement(RegisterScreen, { onRegistered: (t) => { setTeacher(t); setTeacherExists(true); }, goLogin: () => setAuthView("login") })) : (React.createElement(LoginScreen, { onLogin: setTeacher, goRegister: () => setAuthView("register"), goForgot: () => setAuthView("forgot"), allowRegister: !teacherExists, portalMode: portalMode, setPortalMode: setPortalMode, portalData: { roster, students, answers, exams, questions, classes, messages } }));
    }
    // مدیر کل حسابی کاملاً جدا داره — روی هیچ مدرسه‌ی خاصی محدود نیست،
    // فقط مدرسه‌ها رو می‌سازه و برای هرکدوم یک مدیر تعیین می‌کنه.
    if (teacher.role === "super_admin") {
        return (React.createElement(SuperAdminDashboardScreen, { teacher: teacher, onLogout: () => { performLogout(); setTeacher(null); setView("dashboard"); }, onUpdateSelf: (updated) => { setTeacher(updated); saveSession(updated.username, updated.password, getAuthToken()); } }));
    }
    // Admin accounts get a completely separate screen — they manage teacher
    // accounts for the whole school rather than owning classes/exams themselves.
    if (teacher.role === "admin") {
        return (React.createElement(AdminDashboardScreen, { teacher: teacher, teachers: teachers.filter((t) => t.role !== "admin" && t.role !== "super_admin"), exams: exams, classes: classes, roster: roster, students: students, questions: questions, answers: answers, messages: messages, cheatAlerts: cheatAlerts, onLogout: () => { performLogout(); setTeacher(null); setView("dashboard"); }, onUpdateSelf: (updated) => { setTeacher(updated); saveSession(updated.username, updated.password, getAuthToken()); }, refresh: refresh, addLocalClass: addLocalClass, removeLocalClass: removeLocalClass, updateLocalClass: updateLocalClass, addLocalRoster: addLocalRoster, addLocalRosterMany: addLocalRosterMany, updateLocalRoster: updateLocalRoster, removeLocalRoster: removeLocalRoster, addLocalQuestion: addLocalQuestion, addLocalQuestionMany: addLocalQuestionMany, updateLocalQuestion: updateLocalQuestion, removeLocalQuestion: removeLocalQuestion, removeLocalQuestionMany: removeLocalQuestionMany, removeLocalExam: removeLocalExam }));
    }
    const activeExam = exams.find((e) => e.id === activeExamId);
    const activeClass = classes.find((c) => c.id === activeClassId);
    const myAlerts = cheatAlerts.filter((a) => a.teacher_id === teacher.username)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const unseenAlertCount = myAlerts.filter((a) => !a.seen).length;
    const markAlertsSeen = async () => {
        const unseen = myAlerts.filter((a) => !a.seen);
        await Promise.all(unseen.map((a) => setJSON(`cheatalert:${a.id}`, { ...a, seen: true })));
        if (unseen.length > 0)
            await refresh();
    };
    const dismissAlert = async (id) => {
        await deleteKey(`cheatalert:${id}`);
        await refresh();
    };
    return (React.createElement("div", { style: { display: "flex", flexDirection: "row-reverse", minHeight: "100vh" } },
        React.createElement("div", { style: { position: "fixed", top: alertBtnPos.top, left: alertBtnPos.left, zIndex: 50 } },
            React.createElement("div", { onMouseDown: (e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }, onTouchStart: (e) => { const t = e.touches[0]; if (t)
                    startDrag(t.clientX, t.clientY); }, onClick: () => {
                    if (dragMovedRef.current) {
                        dragMovedRef.current = false;
                        return;
                    } // was a drag, not a tap
                    const next = !showAlerts;
                    setShowAlerts(next);
                    if (next)
                        markAlertsSeen();
                }, style: {
                    width: 44, height: 44, borderRadius: "50%", background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,.14)",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "grab", position: "relative",
                    touchAction: "none", userSelect: "none",
                } },
                React.createElement(AlertTriangle, { size: 20, color: unseenAlertCount > 0 ? "#DC2626" : "#94A3B8" }),
                unseenAlertCount > 0 && (React.createElement("div", { style: {
                        position: "absolute", top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, background: "#DC2626",
                        color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
                    } }, unseenAlertCount))),
            showAlerts && (React.createElement("div", { style: {
                    position: "absolute", top: 52, left: 0, width: 320, maxHeight: 380, overflowY: "auto",
                    background: "#fff", borderRadius: 14, boxShadow: "0 10px 30px rgba(0,0,0,.18)", padding: 14,
                } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 10 } }, "\u0647\u0634\u062F\u0627\u0631\u0647\u0627\u06CC \u062A\u062E\u0644\u0641 \u062F\u0631 \u0622\u0632\u0645\u0648\u0646"),
                myAlerts.length === 0 ? (React.createElement("div", { style: { fontSize: 12, color: "#94A3B8" } }, "\u0645\u0648\u0631\u062F\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.")) : (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, myAlerts.map((a) => (React.createElement("div", { key: a.id, style: { border: "1px solid #EEF1F6", borderRadius: 10, padding: "10px 12px" } },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 } },
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E293B" } }, a.student_name),
                            React.createElement("div", { style: { fontSize: 12, color: "#64748B" } }, a.exam_title),
                            React.createElement("div", { style: { fontSize: 12, color: "#DC2626", marginTop: 4 } },
                                a.tab_switches,
                                " \u0628\u0627\u0631 \u062E\u0631\u0648\u062C \u0627\u0632 \u0635\u0641\u062D\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646")),
                        React.createElement("div", { onClick: () => dismissAlert(a.id), style: { cursor: "pointer", color: "#94A3B8", fontSize: 16, lineHeight: 1 } }, "\u00D7")),
                    React.createElement("div", { style: { fontSize: 11, color: "#94A3B8", marginTop: 6 } }, new Date(a.created_at).toLocaleString("fa-IR")))))))))),
        React.createElement(Sidebar, { active: view, onNavigate: (v) => { setView(v); setActiveExamId(null); setActiveClassId(null); }, onLogout: () => { performLogout(); setTeacher(null); setView("dashboard"); }, teacherName: teacher.fullname, onHelp: () => setShowHelp(true), brandColor: mySchool?.color, logoUrl: mySchool?.logo_data_url, badges: { classchat: unreadClassChatCount, messages: unreadSaThreadCount }, hiddenKeys: classChatAllowed ? [] : ["classchat"] }),
        showHelp && (React.createElement(Modal, { title: "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u0622\u0632\u0645\u0648\u0646\u200C\u0633\u0627\u0632", onClose: () => setShowHelp(false) },
            React.createElement("div", { style: { fontSize: 13.5, color: "#334155", lineHeight: 2.1 } },
                React.createElement("b", null, "\u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627:"),
                " \u0627\u0632 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0622\u0632\u0645\u0648\u0646 \u062C\u062F\u06CC\u062F \u0628\u0633\u0627\u0632\u060C \u0633\u0648\u0627\u0644\u200C\u0647\u0627\u06CC\u0634 \u0631\u0627 \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646 (\u062A\u06A9\u06CC\u060C \u0628\u0627 \u067E\u06CC\u0633\u062A \u06A9\u0631\u062F\u0646 \u0686\u0646\u062F \u0633\u0648\u0627\u0644 \u0628\u0627 \u0647\u0645\u060C \u0628\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0627\u0632 \u0628\u0627\u0646\u06A9 \u0633\u0648\u0627\u0644\u060C \u06CC\u0627 \u0628\u0627 \u062A\u0648\u0644\u06CC\u062F \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0648\u0633\u0637 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u2014 \u0627\u06AF\u0631 \u0628\u0631\u0627\u06CC \u062D\u0633\u0627\u0628 \u0634\u0645\u0627 \u0641\u0639\u0627\u0644 \u0628\u0627\u0634\u062F)\u060C \u0648 \u0644\u06CC\u0646\u06A9/\u06A9\u062F \u0648\u0631\u0648\u062F \u0631\u0627 \u062F\u0631 \u0627\u062E\u062A\u06CC\u0627\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u0628\u06AF\u0630\u0627\u0631.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0628\u0627\u0646\u06A9 \u0633\u0648\u0627\u0644:"),
                " \u0633\u0648\u0627\u0644\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0645\u0645\u06A9\u0646 \u0627\u0633\u062A \u062F\u0631 \u0686\u0646\u062F \u0622\u0632\u0645\u0648\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0634\u0648\u0646\u062F \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0646\u06AF\u0647\u200C\u062F\u0627\u0631\u06CC \u06A9\u0646\u061B \u0627\u0632 \u0647\u0645\u06CC\u0646\u200C\u062C\u0627 \u0647\u0645 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646 \u0633\u0648\u0627\u0644 \u062C\u062F\u06CC\u062F \u0633\u0627\u062E\u062A\u060C \u0627\u0632 \u0641\u0627\u06CC\u0644 \u0645\u062A\u0646\u06CC \u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u060C \u06CC\u0627 \u0628\u0627 \u0641\u0627\u06CC\u0644 \u0627\u06A9\u0633\u0644 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u06AF\u0631\u0648\u0647\u06CC \u0627\u0636\u0627\u0641\u0647 \u06A9\u0631\u062F. \u0627\u0632 \u062A\u0628\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u06CC \u0635\u0641\u062D\u0647 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0633\u0648\u0627\u0644\u200C\u0647\u0627\u06CC\u062A \u0631\u0627 \u0628\u0627 \u00AB\u0645\u0639\u0644\u0645\u200C\u0647\u0627\u06CC \u0645\u062F\u0631\u0633\u0647\u00BB \u06CC\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u00AB\u0639\u0645\u0648\u0645\u06CC\u00BB \u0628\u0627 \u0647\u0645\u0647\u200C\u06CC \u0645\u0639\u0644\u0645\u200C\u0647\u0627\u06CC \u0633\u0627\u0645\u0627\u0646\u0647 \u0628\u0647 \u0627\u0634\u062A\u0631\u0627\u06A9 \u0628\u06AF\u0630\u0627\u0631\u06CC\u060C \u0648 \u0633\u0648\u0627\u0644\u200C\u0647\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9\u06CC\u200C\u0627\u06CC \u06A9\u0647 \u0628\u0642\u06CC\u0647 \u0628\u0647 \u0627\u0634\u062A\u0631\u0627\u06A9 \u06AF\u0630\u0627\u0634\u062A\u0647\u200C\u0627\u0646\u062F \u0631\u0627 \u0628\u0647 \u0628\u0627\u0646\u06A9 \u062E\u0648\u062F\u062A \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646\u06CC.",
                React.createElement("br", null),
                React.createElement("br", null),
                teacher.school_id ? (React.createElement(React.Fragment, null,
                    React.createElement("b", null, "\u06A9\u0644\u0627\u0633\u200C\u0647\u0627 \u0648 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646:"),
                    " \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u06A9\u0644\u0627\u0633\u200C\u0647\u0627\u06CC \u062E\u0648\u062F\u062A \u0631\u0627 \u0645\u06CC\u200C\u0628\u06CC\u0646\u06CC. \u0627\u06AF\u0631 \u0645\u062F\u06CC\u0631 \u0645\u062F\u0631\u0633\u0647 \u0628\u0647 \u062A\u0648 \u06A9\u0644\u0627\u0633\u06CC \u0646\u0633\u067E\u0631\u062F\u0647 \u0628\u0627\u0634\u062F\u060C \u0627\u06CC\u0646\u062C\u0627 \u062E\u0627\u0644\u06CC \u0645\u06CC\u200C\u0645\u0627\u0646\u062F \u2014 \u0628\u0631\u0627\u06CC \u0627\u0641\u0632\u0648\u062F\u0646 \u06CC\u0627 \u062C\u0627\u0628\u0647\u200C\u062C\u0627\u06CC\u06CC \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u0628\u0627\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0645\u062F\u0631\u0633\u0647 \u0627\u0642\u062F\u0627\u0645 \u06A9\u0646\u062F.")) : (React.createElement(React.Fragment, null,
                    React.createElement("b", null, "\u06A9\u0644\u0627\u0633\u200C\u0647\u0627 \u0648 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646:"),
                    " \u0686\u0648\u0646 \u062D\u0633\u0627\u0628 \u062A\u0648 \u0645\u0633\u062A\u0642\u0644 \u0627\u0633\u062A (\u0648\u0627\u0628\u0633\u062A\u0647 \u0628\u0647 \u0647\u06CC\u0686 \u0645\u062F\u0631\u0633\u0647\u200C\u0627\u06CC \u0646\u06CC\u0633\u062A)\u060C \u062E\u0648\u062F\u062A \u0645\u0633\u062A\u0642\u06CC\u0645\u0627\u064B \u06A9\u0644\u0627\u0633 \u0645\u06CC\u200C\u0633\u0627\u0632\u06CC \u0648 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646\u0634 \u0631\u0627 \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC \u2014 \u062A\u06A9\u06CC\u060C \u0628\u0627 \u067E\u06CC\u0633\u062A \u0686\u0646\u062F \u0627\u0633\u0645 \u0628\u0627 \u0647\u0645\u060C \u06CC\u0627 \u0628\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0641\u0627\u06CC\u0644 \u0627\u06A9\u0633\u0644.")),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0646\u062A\u0627\u06CC\u062C:"),
                " \u0646\u0645\u0631\u0627\u062A \u0647\u0631 \u0622\u0632\u0645\u0648\u0646\u060C \u062A\u062D\u0644\u06CC\u0644 \u0633\u0648\u0627\u0644\u200C\u0628\u0647\u200C\u0633\u0648\u0627\u0644\u060C \u062D\u0636\u0648\u0631 \u0648 \u063A\u06CC\u0627\u0628 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646\u060C \u0648 \u0627\u0645\u06A9\u0627\u0646 \u062A\u0635\u062D\u06CC\u062D \u062F\u0633\u062A\u06CC \u06CC\u0627 \u0628\u0627 \u06A9\u0645\u06A9 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u0628\u0631\u0627\u06CC \u0633\u0648\u0627\u0644\u200C\u0647\u0627\u06CC \u062A\u0634\u0631\u06CC\u062D\u06CC. \u06A9\u0646\u0627\u0631 \u0646\u0627\u0645 \u0647\u0631 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u06CC \u06A9\u0647 \u0628\u0627 \u06A9\u062F \u0634\u062E\u0635\u06CC (\u0646\u0647 \u0628\u0627 \u062A\u0627\u06CC\u067E \u0627\u0633\u0645) \u0648\u0627\u0631\u062F \u0634\u062F\u0647\u060C \u062F\u06A9\u0645\u0647\u200C\u06CC \u00AB\u0631\u0648\u0646\u062F\u00BB \u0647\u0633\u062A \u2014 \u0631\u0648\u0646\u062F \u0646\u0645\u0631\u0627\u062A \u0627\u0648 \u062F\u0631 \u0647\u0645\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u060C \u0646\u0642\u0627\u0637 \u0636\u0639\u0641 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0628\u0631\u0686\u0633\u0628 \u0633\u0648\u0627\u0644\u200C\u0647\u0627\u060C \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u062A\u0645\u0631\u06CC\u0646 \u0628\u0627 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC (\u0627\u06AF\u0631 \u0628\u0631\u0627\u06CC \u062D\u0633\u0627\u0628 \u0634\u0645\u0627 \u0641\u0639\u0627\u0644 \u0628\u0627\u0634\u062F)\u060C \u0648 \u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0627\u0631\u0646\u0627\u0645\u0647\u200C\u06CC \u06A9\u0627\u0645\u0644 \u0627\u0648 \u0628\u0647\u200C\u0635\u0648\u0631\u062A PDF. \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0635\u0641\u062D\u0647 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646 \u062E\u0631\u0648\u062C\u06CC Excel \u0647\u0645 \u06AF\u0631\u0641\u062A: \u0646\u0645\u0631\u0647\u200C\u06CC \u0647\u0631 \u0633\u0648\u0627\u0644 \u0628\u0631\u0627\u06CC \u06CC\u06A9 \u0622\u0632\u0645\u0648\u0646 \u062E\u0627\u0635\u060C \u06CC\u0627 \u062E\u0644\u0627\u0635\u0647\u200C\u06CC \u0646\u0645\u0631\u0627\u062A \u06CC\u06A9 \u06A9\u0644\u0627\u0633 \u062F\u0631 \u0647\u0645\u0647\u200C\u06CC \u0622\u0632\u0645\u0648\u0646\u200C\u0647\u0627\u06CC\u0634.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u0686\u062A \u0628\u0627 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646:"),
                " \u0628\u0631\u0627\u06CC \u0647\u0631 \u06A9\u0644\u0627\u0633 \u06CC\u06A9 \u0686\u062A \u06AF\u0631\u0648\u0647\u06CC \u0645\u0634\u062A\u0631\u06A9 \u0628\u0627 \u0647\u0645\u0647\u200C\u06CC \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646\u0634 \u062F\u0627\u0631\u06CC (\u0627\u06AF\u0631 \u0627\u06CC\u0646 \u0642\u0627\u0628\u0644\u06CC\u062A \u0628\u0631\u0627\u06CC \u062D\u0633\u0627\u0628 \u062A\u0648 \u0641\u0639\u0627\u0644 \u0628\u0627\u0634\u062F). \u0627\u0632 \u0628\u0627\u0644\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u06CC \u0686\u062A \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u062D\u0627\u0644\u062A \u06A9\u0644\u0627\u0633 \u0631\u0627 \u0628\u06CC\u0646 \u00AB\u0686\u062A \u062F\u0648\u0637\u0631\u0641\u0647\u00BB \u0648 \u00AB\u06A9\u0627\u0646\u0627\u0644 \u0627\u0637\u0644\u0627\u0639\u200C\u0631\u0633\u0627\u0646\u06CC \u06CC\u06A9\u200C\u0637\u0631\u0641\u0647\u00BB \u0639\u0648\u0636 \u06A9\u0646\u06CC\u060C \u0648 \u062D\u062A\u06CC \u0628\u0631\u0627\u06CC \u06CC\u06A9 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632 \u062E\u0627\u0635 \u062C\u062F\u0627 \u0627\u0632 \u0628\u0642\u06CC\u0647\u200C\u06CC \u06A9\u0644\u0627\u0633 \u062A\u0635\u0645\u06CC\u0645 \u0628\u06AF\u06CC\u0631\u06CC.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u067E\u06CC\u0627\u0645\u200C\u0647\u0627:"),
                " \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u06CC\u0627 \u0627\u0639\u0644\u0627\u0646 \u0628\u0647 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646 \u06CC\u0627 \u06A9\u0644\u0627\u0633\u200C\u0647\u0627",
                teacher.school_id ? "." : "، و همچنین گفتگوی مستقیم با مدیر سایت سامانه (چون حساب تو مستقل است).",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A:"),
                " \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0648 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628 \u062E\u0648\u062F\u062A. \u0627\u06AF\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\u062A \u0631\u0627 \u0641\u0631\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u06CC\u060C \u0627\u0632 \u0635\u0641\u062D\u0647\u200C\u06CC \u0648\u0631\u0648\u062F \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \u00AB\u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\u00BB \u0631\u0627 \u0628\u0632\u0646 \u2014 \u0644\u06CC\u0646\u06A9 \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0628\u0647 \u0647\u0645\u0627\u0646 \u0627\u06CC\u0645\u06CC\u0644\u06CC \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F \u06A9\u0647 ",
                teacher.school_id ? "مدیر مدرسه" : "مدیر سایت",
                " \u0628\u0631\u0627\u06CC\u062A \u062B\u0628\u062A \u06A9\u0631\u062F\u0647 \u0627\u0633\u062A."))),
        React.createElement("div", { style: { flex: 1, background: "#F8FAFC", minHeight: "100vh" } },
            view === "dashboard" && (React.createElement(DashboardScreen, { teacher: teacher, exams: exams, questions: questions, students: students, answers: answers, onNavigate: setView, onOpenExam: (id) => { setActiveExamId(id); setView("manageQuestions"); } })),
            view === "exams" && (React.createElement(ExamsScreen, { teacher: teacher, exams: exams, questions: questions, answers: answers, classes: classes, onNavigate: (v, examId) => { setView(v); if (examId)
                    setActiveExamId(examId); }, onOpenExam: (id) => { setActiveExamId(id); setView("manageQuestions"); }, refresh: refresh, addLocalExam: addLocalExam, updateLocalExam: updateLocalExam, removeLocalExam: removeLocalExam, addLocalQuestionMany: addLocalQuestionMany, removeLocalQuestionMany: removeLocalQuestionMany })),
            view === "manageQuestions" && activeExam && (React.createElement(QuestionsScreen, { exam: activeExam, questions: questions, exams: exams, teacher: teacher, onBack: () => setView("exams"), refresh: refresh, addLocalQuestion: addLocalQuestion, addLocalQuestionMany: addLocalQuestionMany, updateLocalQuestion: updateLocalQuestion, removeLocalQuestion: removeLocalQuestion, aiAllowed: aiAllowed })),
            view === "examLive" && activeExam && (React.createElement(ExamLiveScreen, { exam: activeExam, teacher: teacher, onBack: () => setView("exams") })),
            view === "questionbank" && (React.createElement(QuestionBankScreen, { teacher: teacher, questions: questions, exams: exams, refresh: refresh, addLocalQuestion: addLocalQuestion, addLocalQuestionMany: addLocalQuestionMany, updateLocalQuestion: updateLocalQuestion, removeLocalQuestion: removeLocalQuestion, aiAllowed: aiAllowed })),
            view === "results" && (React.createElement(ResultsScreen, { teacher: teacher, exams: exams, questions: questions, students: students, answers: answers, roster: roster, classes: classes, initialExamId: activeExamId, onBack: () => setView("exams"), refresh: refresh, aiAllowed: aiAllowed })),
            view === "classes" && (React.createElement(ClassesScreen, { teacher: teacher, classes: classes, roster: roster, onOpenClass: (id) => { setActiveClassId(id); setView("manageRoster"); }, refresh: refresh, addLocalClass: addLocalClass, removeLocalClass: removeLocalClass, updateLocalClass: updateLocalClass })),
            view === "manageRoster" && activeClass && (React.createElement(RosterScreen, { classroom: activeClass, roster: roster, teacher: teacher, onBack: () => setView("classes"), refresh: refresh, addLocalRoster: addLocalRoster, addLocalRosterMany: addLocalRosterMany, updateLocalRoster: updateLocalRoster, removeLocalRoster: removeLocalRoster, groupLoginCode: teacher.school_id ? mySchool?.login_code : teacher.login_code })),
            view === "students" && (React.createElement(StudentsScreen, { teacher: teacher, students: students, exams: exams, answers: answers, questions: questions, refresh: refresh })),
            view === "messages" && (React.createElement(MessagesScreen, { teacher: teacher, classes: classes, roster: roster, messages: messages, refresh: refresh, addLocalMessage: addLocalMessage, removeLocalMessage: removeLocalMessage, onUpdateSelf: setTeacher })),
            view === "classchat" && (classChatAllowed ? (React.createElement(ClassChatScreen, { teacher: teacher, classes: classes, roster: roster, messages: messages, refresh: refresh, refreshMessages: refreshMessages, onUpdateSelf: setTeacher, addLocalMessage: addLocalMessage })) : (React.createElement("div", { style: { flex: 1, padding: "30px 34px" } },
                React.createElement(TopBar, { title: "\u0686\u062A \u0628\u0627 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632\u0627\u0646", teacherName: teacher.fullname, avatarUsername: teacher.username, avatarUpdatedAt: teacher.avatar_updated_at }),
                React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, color: "#94A3B8", fontSize: 13.5 } }, "\u0627\u06CC\u0646 \u0642\u0627\u0628\u0644\u06CC\u062A \u0628\u0631\u0627\u06CC \u062D\u0633\u0627\u0628 \u0634\u0645\u0627 \u0641\u0639\u0627\u0644 \u0646\u06CC\u0633\u062A \u2014 \u0627\u0632 \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0628\u062E\u0648\u0627\u0647\u06CC\u062F \u0622\u0646 \u0631\u0627 \u0641\u0639\u0627\u0644 \u06A9\u0646\u062F.")))),
            view === "settings" && (React.createElement(SettingsScreen, { teacher: teacher, onUpdate: setTeacher, refresh: refresh, exams: exams, students: students })),
            (view === "exams" || view === "dashboard") && exams.some(e => e.teacher_id === teacher.username) && (React.createElement("div", { style: { position: "fixed", bottom: 22, left: 22 } },
                React.createElement("select", { defaultValue: "", onChange: (e) => {
                        if (!e.target.value)
                            return;
                        // مهم: قبل از تنظیم studentExamId، exams/roster فعلی (که مال
                        // خودِ معلمه، نه مخصوص همین آزمون) رو خالی می‌کنیم. وگرنه
                        // TakeExamScreen بلافاصله با روستر قدیمیِ معلم (که خالی
                        // نیست) مانت می‌شه و حالت ورودش رو برای همیشه روی «کد» قفل
                        // می‌کنه — حتی وقتی روستر واقعیِ همین آزمون خالیه و باید
                        // حالت «ورود با نام» باشه. با خالی‌کردنشون، TakeExamScreen
                        // تا رسیدن داده‌ی درست از loadStudentSession اصلاً مانت
                        // نمی‌شه، و وقتی مانت می‌شه، از همون اول داده‌ی درست رو داره.
                        setExams([]);
                        setRoster([]);
                        setStudentExamId(e.target.value);
                    }, style: { ...inputStyle, padding: "10px 14px", boxShadow: "0 6px 20px rgba(0,0,0,.12)" } },
                    React.createElement("option", { value: "", disabled: true }, "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0622\u0632\u0645\u0648\u0646 \u0628\u0647\u200C\u0639\u0646\u0648\u0627\u0646 \u062F\u0627\u0646\u0634\u200C\u0622\u0645\u0648\u0632"),
                    exams.filter(e => e.teacher_id === teacher.username).map(e => (React.createElement("option", { key: e.id, value: e.id }, e.title)))))))));
}
console.log("%cآزمون‌ساز معلم%c\n© ghobeishawi - تمامی حقوق محفوظ است", "font-weight:bold;font-size:14px;color:#2563EB;", "color:#64748B;font-size:12px;");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(AppErrorBoundary, null,
    React.createElement(EduExamApp, null)));

