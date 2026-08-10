-- ---------------------------------------------------------
-- D1 schema — read-scaling mirror of the KV store.
--
-- KV (env.KV) stays the source of truth for every write; every
-- entity mutation that goes through POST /api/kv (or the register/
-- reset-password/submit-answers endpoints) also mirrors into these
-- tables (see syncToD1 / deleteFromD1 in worker.js). The four
-- read-heavy endpoints (exam-session, answers/submit, exam-attempted,
-- student-lookup) then query D1 with a WHERE clause scoped to the
-- one exam/teacher/student that matters, instead of listing every
-- key of a type in the whole school and filtering in JavaScript.
--
-- Each table keeps the full original JSON in a `data` column (so no
-- field the app already relies on is ever lost or needs modeling
-- here) plus a few plain columns used only for indexed filtering.
--
-- IMPORTANT — one-time setup:
--   1) Apply this schema to the D1 database bound as `DB`:
--        npx wrangler d1 execute exam_db --remote --file=./schema.sql
--   2) Backfill existing KV data into these tables by calling, once,
--      as a logged-in admin:  POST /api/admin/migrate-to-d1
--      (safe to re-run; it's an upsert, not append)
-- ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS teachers (
  username TEXT PRIMARY KEY,
  role TEXT,
  data TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS exams (
  id TEXT PRIMARY KEY,
  teacher_id TEXT,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_exams_teacher ON exams(teacher_id);

CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  exam_id TEXT,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_questions_exam ON questions(exam_id);

-- نکته‌ی مهاجرت: اگه دیتابیس شما از قبل جدول classes رو داره (بدون ستون
-- school_id)، این CREATE TABLE IF NOT EXISTS اون رو تغییر نمی‌ده — باید
-- یک‌بار این دستور رو دستی توی کنسول D1 اجرا کنید:
--   ALTER TABLE classes ADD COLUMN school_id TEXT;
--   CREATE INDEX IF NOT EXISTS idx_classes_school ON classes(school_id);
-- و بعدش یک‌بار POST /api/admin/migrate-to-d1 رو به‌عنوان مدیر کل صدا بزنید
-- تا school_id برای ردیف‌های موجود هم پر بشه (idempotent، بی‌خطر برای اجرای دوباره).
CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY,
  teacher_id TEXT,
  school_id TEXT,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_school ON classes(school_id);

-- Enrolled students (persistent identity + personal lookup code for
-- the student portal). Distinct from `students`, which are created
-- fresh per exam attempt.
CREATE TABLE IF NOT EXISTS roster (
  id TEXT PRIMARY KEY,
  teacher_id TEXT,
  class_id TEXT,
  code TEXT,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_roster_teacher ON roster(teacher_id);
CREATE INDEX IF NOT EXISTS idx_roster_code ON roster(code);

-- نکته‌ی مهاجرت: اگه دیتابیس شما از قبل جدول students رو داره، این
-- CREATE TABLE IF NOT EXISTS ستون تازه رو اضافه نمی‌کنه — یک‌بار دستی اجرا کنید:
--   ALTER TABLE students ADD COLUMN roster_id TEXT;
--   CREATE INDEX IF NOT EXISTS idx_students_roster ON students(roster_id);
-- One row per exam attempt (created when a student submits an exam).
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  teacher_id TEXT,
  fullname TEXT,
  roster_id TEXT,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_students_teacher_name ON students(teacher_id, fullname);
CREATE INDEX IF NOT EXISTS idx_students_roster ON students(roster_id);

CREATE TABLE IF NOT EXISTS answers (
  id TEXT PRIMARY KEY,
  student_id TEXT,
  exam_id TEXT,
  question_id TEXT,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_answers_student ON answers(student_id);
CREATE INDEX IF NOT EXISTS idx_answers_exam ON answers(exam_id);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  teacher_id TEXT,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_messages_teacher ON messages(teacher_id);

CREATE TABLE IF NOT EXISTS cheatalerts (
  id TEXT PRIMARY KEY,
  exam_id TEXT,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cheatalerts_exam ON cheatalerts(exam_id);

-- In-progress exam autosaves (key already looks like "draft:<examId>:<studentName>",
-- so no extra scoping columns are needed — the key itself is the lookup).
-- Moved here from KV because this is by far the most frequent write during an
-- exam (roughly one save every few seconds of student activity), and KV's free
-- tier only allows 1,000 writes/day for the whole account, while D1 allows
-- 100,000 writes/day — this alone was the real ceiling on how many students
-- could sit an exam on the same day.
CREATE TABLE IF NOT EXISTS drafts (
  key TEXT PRIMARY KEY,
  data TEXT NOT NULL
);

-- v72: پیشرفت دوره‌ای دانش‌آموزها حین امتحان — به‌جای یک ردیف جدا برای
-- هر دانش‌آموز (که با تعداد دانش‌آموز ضرب می‌شد و سهمیه رو زود می‌سوزوند)،
-- یک Durable Object («ExamRoom»، به‌ازای هر examId) پیشرفت همه‌ی
-- دانش‌آموزهای همون آزمون رو تو حافظه بافر می‌کنه و هر چند دقیقه یک‌بار
-- همه‌شون رو با هم، در یک ردیف واحد اینجا، می‌نویسه — نوشتن مستقل از
-- تعداد دانش‌آموز. ستون data یک JSON شامل «{studentName: {...}}» است.
CREATE TABLE IF NOT EXISTS examdrafts (
  exam_id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  updated_at TEXT
);

-- عکس پاسخ دست‌نویس سؤالات تشریحی (فشرده‌شده سمت مرورگر قبل از آپلود).
-- چون R2 نیاز به روش پرداخت داشت و در دسترس نبود، عکس این‌جا (به‌صورت
-- base64 در یک ستون متنی) نگه‌داری می‌شه. چون این فضا برخلاف سهمیه‌ی
-- روزانه‌ی خواندن/نوشتن، تجمعی و همیشگیه، یک Cron Trigger روزانه
-- (نگاه کن به handleScheduledCleanup در worker.js) ردیف‌های قدیمی‌تر
-- از ۲ روز رو خودکار پاک می‌کنه.
CREATE TABLE IF NOT EXISTS answer_photos (
  key TEXT PRIMARY KEY,
  exam_id TEXT,
  content_type TEXT,
  data_b64 TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_answer_photos_exam ON answer_photos(exam_id);
CREATE INDEX IF NOT EXISTS idx_answer_photos_created ON answer_photos(created_at);

-- عکس پروفایل معلم/مدیر/مدیر کل — برخلاف answer_photos هیچ‌وقت خودکار پاک
-- نمی‌شه (نگاه کن به handleScheduledCleanup که فقط answer_photos رو پاک می‌کنه)
CREATE TABLE IF NOT EXISTS profile_photos (
  username TEXT PRIMARY KEY,
  content_type TEXT,
  data_b64 TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
