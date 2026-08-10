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
    if (entryMode !== "code" || !trimmed) { setCodeCheck(null); return; }
    let cancelled = false;
    setCodeChecking(true);
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/exam-verify-code?examId=${encodeURIComponent(exam.id)}&code=${encodeURIComponent(trimmed)}`);
        const d = await r.json().catch(() => ({ ok: false }));
        if (!cancelled) setCodeCheck(d.ok ? { fullname: d.fullname, className: d.className, mismatch: d.mismatch } : "notfound");
      } catch {
        if (!cancelled) setCodeCheck("notfound");
      } finally {
        if (!cancelled) setCodeChecking(false);
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
    getJSON("settings:global").then((s) => { if (!cancelled) setDraftSaveCount(s?.draft_save_count || 5); });
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
    if (stage !== "exam") return;
    const onVisibility = () => {
      if (document.hidden) setTabSwitches((c) => c + 1);
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
    if (entryMode === "name" && !studentName.trim()) return;
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
    } catch {
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
      if (r.ok) { const d = await r.json(); already = !!d.already; }
    } catch { /* if the check fails, fall through and let them attempt — better than blocking a legit student */ }
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
      if (fetched.length > 0) effectiveQuestions = fetched;
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
      setJSON(draftKeyForLoad, { selections: draft?.selections || {}, current: draft?.current || 0, qOrder: draft?.qOrder || null, optOrder: draft?.optOrder || null, savedAt: Date.now(), startedAt: serverStartedAt, reentries: 0 }).catch(() => {});
    } else if (reentryCount > 0) {
      // ورود دوم به بعد — فقط شمارنده رو به‌روزرسانی می‌کنیم (بدون تغییر startedAt).
      setJSON(draftKeyForLoad, { ...draft, startedAt: serverStartedAt, savedAt: draft?.savedAt || Date.now(), reentries: reentryCount }).catch(() => {});
    }
    let order, options;
    if (draft && draft.qOrder) {
      setSelections(draft.selections || {});
      setCurrent(draft.current || 0);
      order = draft.qOrder;
      options = draft.optOrder || {};
    } else {
      order = exam.shuffle_questions ? shuffleArray(effectiveQuestions.map((q) => q.id)) : effectiveQuestions.map((q) => q.id);
      options = {};
      effectiveQuestions.forEach((q) => {
        options[q.id] = (q.type === "mc" && exam.shuffle_options) ? shuffleArray(["A", "B", "C", "D"]) : ["A", "B", "C", "D"];
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
      document.documentElement.requestFullscreen().catch(() => {});
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
    if (stage !== "exam") return;
    const draftValue = { selections, current, qOrder, optOrder, savedAt: Date.now(), startedAt, reentries: reentriesRef.current };
    latestDraftRef.current = draftValue;
    saveLocalDraft(`draft:${exam.id}:${studentName.trim()}`, draftValue);
  }, [selections, current, stage, qOrder, optOrder]);

  // v72: هر «مدت آزمون ÷ ۵» دقیقه (حداقل ۳ دقیقه) یک بار، آخرین وضعیت رو
  // به Durable Object همین آزمون می‌فرسته — نه مستقیم به D1. چند تا از
  // این‌ها که با هم جمع بشن، فقط یک نوشتن روی D1 مصرف می‌کنن، نه یکی
  // به‌ازای هر دانش‌آموز.
  useEffect(() => {
    if (stage !== "exam") return;
    const mins = Math.max(3, Math.round((exam.duration_minutes || 60) / draftSaveCount));
    const intervalMs = mins * 60 * 1000;
    const t = setInterval(() => {
      const d = latestDraftRef.current;
      if (!d) return;
      fetch("/api/draft-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: exam.id, studentName: studentName.trim(), durationMinutes: exam.duration_minutes, saveCount: draftSaveCount,
          selections: d.selections, current: d.current, qOrder: d.qOrder, optOrder: d.optOrder,
          token: attemptTokenRef.current,
        }),
      }).catch(() => {});
    }, intervalMs);
    return () => clearInterval(t);
  }, [stage, exam.id, exam.duration_minutes, draftSaveCount]);

  // Countdown ticker — starts once the exam stage begins, only when the exam has a time limit.
  useEffect(() => {
    if (stage !== "exam" || totalSeconds === null) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r === null) return r;
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

  const goTo = (i) => {
    if (exam.no_going_back && i < current) return;
    setCurrent(i);
    setVisited((v) => ({ ...v, [i]: true }));
  };

  const MAX_PHOTO_MB = 15; // سقف فایل خام قبل از فشرده‌سازی (خروجی نهایی خیلی کوچیک‌تره)
  const uploadAnswerPhoto = async (qid, file) => {
    if (!file) return;
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
      } else {
        setPhotoKeys((k) => ({ ...k, [qid]: data.key }));
      }
    } catch {
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
      let selected_option = Array.isArray(sel) ? sel.join(",") : sel;
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
        } else if (r.status >= 400 && r.status < 500) {
          // v76.1: یک رد قطعی سمت سرور (مثلاً «قبلاً شرکت کردی» یا «مهلت
          // آزمون تموم شده») — نه یک مشکل شبکه‌ای. صف‌کردن برای تلاش مجدد
          // فقط باعث تکرار همون خطا می‌شه؛ اینجا مستقیم به دانش‌آموز نشون
          // می‌دیم و دیگه صف نمی‌کنیم.
          const errBody = await r.json().catch(() => ({}));
          rejectMessage = errBody.error || "ارسال پاسخ‌ها رد شد.";
          synced = true;
          deleteLocalDraft(draftKey);
        }
      } catch {
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
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#132A52,#1D3E73)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 36, width: "100%", maxWidth: 400 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", marginBottom: 6 }}>ورود به آزمون</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1E293B", marginBottom: 20 }}>{exam.title}</div>

          {restricted && (
            <div style={{ fontSize: 12, color: "#2563EB", background: "#EFF6FF", borderRadius: 8, padding: "8px 10px", marginBottom: 14 }}>
              این آزمون فقط برای دانش‌آموزان کلاس(های) «{restrictedClassName}» است.
            </div>
          )}
          {entryMode === "code" ? (
            <>
              <Field label="کد دانش‌آموزی">
                <TextInput
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, ""))}
                  placeholder="کدی که معلم به تو داده را وارد کن"
                  style={{ fontSize: 18, letterSpacing: 3, textAlign: "center", fontWeight: 700 }}
                  maxLength={6}
                />
              </Field>
              {codeInput.trim() && !codeChecking && (
                matchedRoster ? (
                  classMismatch ? (
                    <div style={{ fontSize: 12, color: "#DC2626", marginBottom: 14 }}>این کد متعلق به کلاس دیگری است و اجازه‌ی شرکت در این آزمون را ندارد.</div>
                  ) : (
                    <div style={{ fontSize: 13, color: "#16A34A", background: "#F0FDF4", borderRadius: 8, padding: "8px 12px", marginBottom: 14 }}>
                      خوش آمدی، {matchedRoster.fullname}{matchedRoster.className ? ` (${matchedRoster.className})` : ""}
                    </div>
                  )
                ) : (
                  <div style={{ fontSize: 12, color: "#DC2626", marginBottom: 14 }}>کد پیدا نشد.</div>
                )
              )}
              {!restricted && !nameOnly && (
                <div onClick={() => setEntryMode("name")} style={{ fontSize: 12, color: "#94A3B8", cursor: "pointer", marginBottom: 14 }}>کد نداری؟ ورود با نام</div>
              )}
            </>
          ) : (
            <>
              <Field label="نام و نام‌خانوادگی">
                <TextInput value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="نام خود را وارد کن" />
              </Field>
              <Field label="کد کلاس (اختیاری)">
                <TextInput value={classCode} onChange={(e) => setClassCode(e.target.value)} placeholder="مثلاً: دهم-الف" />
              </Field>
              {!nameOnly && (
                <div onClick={() => setEntryMode("code")} style={{ fontSize: 12, color: "#94A3B8", cursor: "pointer", marginBottom: 14 }}>کد دانش‌آموزی داری؟ ورود با کد</div>
              )}
            </>
          )}

          {exam.access_code && (
            <Field label="کد دسترسی آزمون">
              <TextInput value={accessCodeInput} onChange={(e) => setAccessCodeInput(e.target.value)} placeholder="کد را از معلم بگیر" />
            </Field>
          )}
          <div style={{ fontSize: 12, color: "#64748B", marginBottom: 18 }}>
            {exam.random_pool_count > 0
              ? `هر شرکت‌کننده ${exam.random_pool_count} سؤال تصادفی از بانک این آزمون دریافت می‌کند.`
              : `${examQuestions.length} سوال در این آزمون وجود دارد.`}
            {totalSeconds !== null && ` زمان مجاز: ${exam.duration_minutes} دقیقه.`}
            {exam.no_going_back && " امکان بازگشت به سوالات قبلی وجود ندارد."}
          </div>
          {(exam.opens_at || exam.closes_at) && (
            <div style={{ fontSize: 12, color: "#2563EB", background: "#EFF6FF", borderRadius: 8, padding: "8px 10px", marginBottom: 14 }}>
              {exam.opens_at && `از ${new Date(exam.opens_at).toLocaleString("fa-IR")} `}
              {exam.closes_at && `تا ${new Date(exam.closes_at).toLocaleString("fa-IR")}`}
              {" قابل شرکت است."}
            </div>
          )}
          {enterError && <div style={{ color: "#DC2626", fontSize: 13, marginBottom: 14 }}>{enterError}</div>}
          <Button
            onClick={startExam}
            disabled={(exam.random_pool_count > 0 ? false : examQuestions.length === 0) || checking || (entryMode === "code" && (!matchedRoster || classMismatch))}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {checking ? "در حال بررسی..." : "شروع آزمون"}
          </Button>
          {exam.random_pool_count <= 0 && examQuestions.length === 0 && <div style={{ fontSize: 12, color: "#DC2626", marginTop: 10 }}>این آزمون هنوز سوالی ندارد.</div>}
          <div onClick={onExit} style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#94A3B8", cursor: "pointer" }}>بازگشت</div>
        </div>
      </div>
    );
  }

  if (stage === "done" && result) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#132A52,#1D3E73)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 40, width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: result.rejectMessage ? "#FEF2F2" : "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <Award size={32} color={result.rejectMessage ? "#DC2626" : "#16A34A"} />
          </div>
          {result.rejectMessage ? (
            <>
              <div style={{ fontSize: 14, color: "#64748B", marginBottom: 6 }}>پاسخ‌ها ثبت نشد</div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: "#DC2626", background: "#FEF2F2", borderRadius: 10, padding: "10px 14px", marginBottom: 18 }}>
                {result.rejectMessage}
              </div>
            </>
          ) : (
          <>
          <div style={{ fontSize: 14, color: "#64748B", marginBottom: 6 }}>آزمون با موفقیت ثبت شد</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#1E293B", marginBottom: 6 }}>{result.pct != null ? `${result.pct}%` : "—"}</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 10 }}>
            {result.correctCount != null ? `${result.correctCount} پاسخ صحیح از ${result.total} سوال` : "پاسخ‌ها ذخیره شد؛ نمره پس از اتصال به اینترنت محاسبه می‌شود."}
          </div>
          {result.offlineQueued && (
            <div style={{ fontSize: 12.5, color: "#D97706", background: "#FFFBEB", borderRadius: 10, padding: "10px 12px", marginBottom: 14, lineHeight: 1.9 }}>
              چون در لحظه‌ی ارسال به اینترنت وصل نبودی، پاسخ‌هایت روی همین دستگاه ذخیره شد. به‌محض وصل شدن این گوشی به اینترنت (همین اپ رو باز نگه‌دار یا بعداً دوباره باز کن)، پاسخ‌ها خودکار برای معلم ارسال می‌شن.
            </div>
          )}
          {result.finishMsg && (
            <div style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
              {result.finishMsg}
            </div>
          )}
          {result.pendingEssays > 0 && (
            <div style={{ fontSize: 12, color: "#D97706", background: "#FFFBEB", borderRadius: 10, padding: "8px 12px", marginBottom: 12 }}>
              نمره‌ی نهایی موقت است — {result.pendingEssays} سوال تشریحی در انتظار تصحیح توسط معلم است.
            </div>
          )}
          {result.reveal && (
            <div style={{ textAlign: "right", marginBottom: 22, maxHeight: 320, overflowY: "auto" }}>
              {examQuestions.map((q, idx) => {
                const optsMap = { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d };
                const revealed = result.reveal.find((r) => r.question_id === q.id);
                if (!revealed || q.type === "essay") return null;
                const sel = selections[q.id];
                const ok = revealed.is_correct;
                return (
                  <div key={q.id} style={{ border: "1px solid #EEF1F6", borderRadius: 10, padding: 12, marginBottom: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 6 }}>{idx + 1}. <MathText text={q.question_text} /></div>
                    <div style={{ fontSize: 12, color: ok ? "#16A34A" : "#DC2626" }}>
                      پاسخ شما: {sel ? `${Array.isArray(sel) ? sel.join("، ") : sel}. ${Array.isArray(sel) ? sel.map((l) => optsMap[l]).join("، ") : optsMap[sel]}` : "بدون پاسخ"}
                    </div>
                    {!ok && (
                      <div style={{ fontSize: 12, color: "#16A34A" }}>
                        پاسخ صحیح: {q.type === "mc_multi"
                          ? (revealed.correct_answers || []).map((l) => `${l}. ${optsMap[l]}`).join("، ")
                          : `${revealed.correct_answer}. ${optsMap[revealed.correct_answer]}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          </>
          )}
          <Button onClick={onExit} style={{ width: "100%", justifyContent: "center" }}>بازگشت</Button>
        </div>
      </div>
    );
  }

  const q = orderedQuestions[current];
  const answeredCount = Object.keys(selections).filter((qid) => {
    const v = selections[qid];
    return Array.isArray(v) ? v.length > 0 : !!v;
  }).length;
  const progressPct = orderedQuestions.length ? Math.round((answeredCount / orderedQuestions.length) * 100) : 0;
  const unansweredCount = orderedQuestions.length - answeredCount;

  return (
    <div
      style={{ minHeight: "100vh", background: "#F8FAFC", padding: 24, ...(exam.no_copy_paste ? { userSelect: "none", WebkitUserSelect: "none" } : {}) }}
      onCopy={(e) => exam.no_copy_paste && e.preventDefault()}
      onPaste={(e) => exam.no_copy_paste && e.preventDefault()}
      onCut={(e) => exam.no_copy_paste && e.preventDefault()}
      onContextMenu={(e) => exam.no_copy_paste && e.preventDefault()}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#1E293B" }}>{exam.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {!isOnline && (
            <div style={{ fontSize: 12, fontWeight: 700, color: "#B45309", background: "#FFFBEB", borderRadius: 8, padding: "6px 10px" }}>
              اتصال اینترنت قطع است — پاسخ‌ها بعداً خودکار ارسال می‌شوند
            </div>
          )}
          <div style={{ fontSize: 13, color: "#64748B", display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={15} /> {studentName}
          </div>
          {remaining !== null && (
            <div style={{
              display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 800,
              padding: "7px 14px", borderRadius: 10,
              color: remaining <= 120 ? "#DC2626" : "#1E293B",
              background: remaining <= 120 ? "#FEF2F2" : "#F1F5F9",
            }}>
              <Clock size={15} /> {fmtClock(remaining)}
            </div>
          )}
          <Button variant="success" onClick={() => (unansweredCount > 0 ? setShowConfirmSubmit(true) : submitExam())} disabled={submitting}>
            {submitting ? "در حال ثبت..." : "پایان و ثبت آزمون"}
          </Button>
        </div>
      </div>

      {tabSwitches > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: "#FFFBEB", color: "#B45309",
          border: "1px solid #FDE68A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16,
        }}>
          <AlertTriangle size={16} />
          هشدار: خروج از صفحه‌ی آزمون {tabSwitches} بار ثبت شد. این مورد برای معلم نمایش داده می‌شود.
        </div>
      )}

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 480px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B", marginBottom: 8 }}>
            <span>سوال {current + 1} از {orderedQuestions.length}</span>
            <span>{progressPct}%</span>
          </div>
          <div style={{ height: 6, background: "#EEF1F6", borderRadius: 4, marginBottom: 22, overflow: "hidden" }}>
            <div style={{ width: `${progressPct}%`, height: "100%", background: "#2563EB", borderRadius: 4, transition: "width .2s" }} />
          </div>
          {q.section && (
            <div style={{ display: "inline-block", fontSize: 11.5, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", borderRadius: 6, padding: "3px 10px", marginBottom: 10 }}>
              {q.section}
            </div>
          )}
          <div style={{ fontSize: 17, fontWeight: 700, color: "#1E293B", marginBottom: 16, lineHeight: 1.7 }}><MathText text={q.question_text} /></div>
          {q.image_url && (
            <img src={q.image_url} alt="" style={{ maxWidth: "100%", borderRadius: 12, marginBottom: 18, display: "block" }}
              onError={(e) => { e.target.style.display = "none"; }} />
          )}
          {q.type === "essay" ? (
            <div>
              <textarea
                value={selections[q.id] || ""}
                onChange={(e) => selectOption(q.id, e.target.value)}
                placeholder="پاسخ خود را اینجا بنویس یا عکس پاسخ دست‌نویس را پایین آپلود کن..."
                rows={6}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              />
              <div style={{ marginTop: 10 }}>
                {photoPreviews[q.id] ? (
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img src={photoPreviews[q.id]} alt="" style={{ maxWidth: "100%", maxHeight: 260, borderRadius: 10, display: "block", border: "1px solid #E2E8F0" }} />
                    {photoUploading[q.id] && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "#334155" }}>
                        در حال آپلود...
                      </div>
                    )}
                    {!photoUploading[q.id] && photoKeys[q.id] && (
                      <button type="button" onClick={() => removeAnswerPhoto(q.id)}
                        style={{ position: "absolute", top: 6, left: 6, background: "#DC2626", color: "#fff", border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                        حذف عکس
                      </button>
                    )}
                  </div>
                ) : (
                  <label style={{
                    display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10,
                    fontSize: 13, fontWeight: 700, cursor: "pointer", background: "#F8FAFC", color: "#334155", border: "1.5px dashed #CBD5E1",
                  }}>
                    📷 آپلود عکس پاسخ دست‌نویس
                    <input type="file" accept="image/*" capture="environment" onChange={(e) => uploadAnswerPhoto(q.id, e.target.files?.[0])} style={{ display: "none" }} />
                  </label>
                )}
                {photoError[q.id] && <div style={{ fontSize: 12, color: "#DC2626", marginTop: 6 }}>{photoError[q.id]}</div>}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.type === "mc_multi" && (
                <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: -4 }}>می‌توانی بیش از یک گزینه انتخاب کنی.</div>
              )}
              {(optOrder[q.id] || ["A", "B", "C", "D"]).map((origLetter, i) => {
                const optText = { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d }[origLetter];
                const isMulti = q.type === "mc_multi";
                const selVal = selections[q.id];
                const isSelected = isMulti ? (Array.isArray(selVal) && selVal.includes(origLetter)) : selVal === origLetter;
                const onPick = () => isMulti ? toggleMultiOption(q.id, origLetter) : selectOption(q.id, origLetter);
                return (
                  <div key={origLetter} onClick={onPick}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "13px 16px", borderRadius: 12,
                      border: "1.5px solid " + (isSelected ? "#2563EB" : "#E2E8F0"),
                      background: isSelected ? "#EFF6FF" : "#fff", cursor: "pointer",
                    }}>
                    {isSelected ? <CheckCircle2 size={18} color="#2563EB" /> : <Circle size={18} color="#CBD5E1" />}
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>{letters[i]}.</span>
                    <span style={{ fontSize: 14, color: "#334155" }}><MathText text={optText} /></span>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 26 }}>
            <Button variant="ghost" onClick={() => goTo(Math.max(0, current - 1))} disabled={current === 0 || exam.no_going_back}>
              <ChevronRight size={16} /> قبلی
            </Button>
            <Button onClick={() => goTo(Math.min(orderedQuestions.length - 1, current + 1))} disabled={current === orderedQuestions.length - 1}>
              بعدی <ChevronLeft size={16} />
            </Button>
          </div>
        </div>

        <div style={{ width: 260, background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 20, flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#1E293B", marginBottom: 14 }}>پالت سوالات</div>
          <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#64748B", marginBottom: 14, flexWrap: "wrap" }}>
            <LegendDot color="#16A34A" label="پاسخ داده" />
            <LegendDot color="#F59E0B" label="مشاهده شده" />
            <LegendDot color="#E2E8F0" label="بدون پاسخ" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {orderedQuestions.map((qq, i) => {
              let bg = "#F1F5F9", fg = "#475569";
              const v = selections[qq.id];
              const answered = Array.isArray(v) ? v.length > 0 : !!v;
              if (answered) { bg = "#16A34A"; fg = "#fff"; }
              else if (visited[i]) { bg = "#F59E0B"; fg = "#fff"; }
              if (i === current) { bg = "#2563EB"; fg = "#fff"; }
              const locked = exam.no_going_back && i < current;
              return (
                <div key={qq.id} onClick={() => goTo(i)} style={{
                  width: 34, height: 34, borderRadius: 8, background: locked ? "#F1F5F9" : bg, color: locked ? "#CBD5E1" : fg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, cursor: locked ? "not-allowed" : "pointer",
                }}>
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showConfirmSubmit && (
        <Modal title="ثبت نهایی آزمون" onClose={() => setShowConfirmSubmit(false)}>
          <div style={{ fontSize: 14, color: "#334155", marginBottom: 20, lineHeight: 1.8 }}>
            {unansweredCount} سوال بی‌پاسخ داری. بعد از ثبت نهایی دیگر امکان تغییر پاسخ‌ها وجود ندارد. مطمئنی می‌خوای ثبت کنی؟
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setShowConfirmSubmit(false)}>بازگشت به آزمون</Button>
            <Button variant="success" onClick={() => { setShowConfirmSubmit(false); submitExam(); }} disabled={submitting}>
              {submitting ? "در حال ثبت..." : "ثبت نهایی"}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
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
      if (!r.ok) setAiSuggestError(data.error || "خطا در دریافت پیشنهاد");
      else setAiSuggestion(data.suggestion || "");
    } catch {
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
    if (!win) return;
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

  return (
    <Modal title={`روند نمرات ${studentName || ""}`} onClose={onClose}>
      <div style={{ textAlign: "left", marginBottom: 14 }}>
        <Button variant="ghost" style={{ fontSize: 12.5 }} onClick={printFullReportCard}>
          <Download size={14} />دانلود کارنامه (PDF)
        </Button>
      </div>
      {attempts.length < 2 ? (
        <div style={{ color: "#94A3B8", fontSize: 13, textAlign: "center", padding: 20 }}>
          این دانش‌آموز فقط در {attempts.length === 1 ? "یک آزمون" : "هیچ آزمونی"} با کد روستر شرکت کرده — برای نمودار روند حداقل دو آزمون لازم است.
        </div>
      ) : (
        <>
          <LineChartCanvas labels={attempts.map((a) => a.examTitle)} values={attempts.map((a) => a.pct)} />
          <div style={{ marginTop: 14, fontSize: 12.5, color: "#64748B" }}>
            {attempts.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: i < attempts.length - 1 ? "1px solid #F5F7FA" : "none" }}>
                <span>{a.examTitle}</span>
                <span style={{ fontWeight: 700, color: "#1E293B" }}>٪{a.pct}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {weakTopics.length > 0 && (
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #EEF1F6" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 10 }}>نقاط ضعف (بر اساس برچسب سوال‌ها)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {weakTopics.slice(0, 6).map((t) => (
              <div key={t.tag}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>{t.tag}</span>
                  <span style={{ color: t.pct < 50 ? "#DC2626" : t.pct < 75 ? "#D97706" : "#16A34A", fontWeight: 700 }}>
                    {t.correct}/{t.total} (٪{t.pct})
                  </span>
                </div>
                <div style={{ height: 6, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${t.pct}%`, height: "100%", background: t.pct < 50 ? "#DC2626" : t.pct < 75 ? "#D97706" : "#16A34A" }} />
                </div>
              </div>
            ))}
          </div>

          {aiAllowed && (
            <div style={{ marginTop: 14 }}>
              <Button variant="ghost" style={{ fontSize: 12.5 }} onClick={getAiSuggestion} disabled={aiSuggestLoading}>
                <Sparkles size={14} />{aiSuggestLoading ? "در حال دریافت پیشنهاد..." : "پیشنهاد تمرین با هوش مصنوعی"}
              </Button>
              {aiSuggestError && <div style={{ color: "#DC2626", fontSize: 12, marginTop: 8 }}>{aiSuggestError}</div>}
              {aiSuggestion && (
                <div style={{ marginTop: 10, background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 10, padding: 12, fontSize: 12.5, color: "#1E3A8A", whiteSpace: "pre-wrap" }}>
                  {aiSuggestion}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
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
    if (myExams.length === 0) { if (examId !== null) setExamId(null); return; }
    if (!myExams.some((e) => e.id === examId)) setExamId(myExams[0].id);
  }, [myExams.map((e) => e.id).join(",")]);

  useEffect(() => {
    if (!examId) return;
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
    if (text.trim()) await setJSON(`note:${examId}:${studentId}`, text);
    else await deleteKey(`note:${examId}:${studentId}`);
  };

  if (!exam) {
    return (
      <div style={hideTopBar ? {} : { flex: 1, padding: "30px 34px" }}>
        {!hideTopBar && <TopBar title={headerTitle || "نتایج"} teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />}
        <EmptyState text={myExams.length === 0 && examsOverride ? "هنوز آزمونی در مدرسه برگزار نشده است." : "ابتدا یک آزمون بساز تا نتایج آن را اینجا ببینی."} />
      </div>
    );
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
  const presentNames = new Set(
    Object.keys(byStudent).map((sid) => normalizeName(students.find((s) => s.id === sid)?.fullname))
  );
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
    if (a.pct === null) return 1; // بدون پاسخ ثبت‌شده (مثلاً تشریحی درحال تصحیح) بره آخر
    if (b.pct === null) return -1;
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
    if (!win) return;
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
    if (!classFilter) return;
    const classExams = myExams.filter((e) =>
      answers.some((a) => a.exam_id === e.id && students.find((s) => s.id === a.student_id)?.class_code === classFilter)
    );
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
          row["جمع نمره"] = got; row["از کل"] = total; row["درصد"] = pct;
          summaryByStudent[student.fullname] = summaryByStudent[student.fullname] || {};
          summaryByStudent[student.fullname][e.title] = pct;
          return row;
        });
      if (sheetRows.length > 0) sheets.push({ name: e.title || "آزمون", rows: sheetRows });
    });
    const summaryRows = Object.entries(summaryByStudent).map(([name, byExam]) => {
      const row = { "نام دانش‌آموز": name };
      classExams.forEach((e) => { row[e.title] = byExam[e.title] ?? ""; });
      return row;
    });
    downloadExcelWorkbook(`کلاس-${classFilter}-همه-آزمون‌ها.xlsx`, [{ name: "خلاصه", rows: summaryRows }, ...sheets]);
  };

  return (
    <div style={hideTopBar ? {} : { flex: 1, padding: "30px 34px", overflowY: "auto" }}>
      {!hideTopBar && <TopBar title={headerTitle || "نتایج آزمون"} teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />}
      <div style={{ marginBottom: 18, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "#64748B" }}>انتخاب آزمون:</span>
          <select value={examId} onChange={(e) => setExamId(e.target.value)} style={{ ...inputStyle, width: "auto", padding: "8px 12px" }}>
            {myExams.map((e) => <option key={e.id} value={e.id}>{examLabelFn ? examLabelFn(e) : e.title}</option>)}
          </select>
          {rows.length > 0 && (
            <TextInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجوی نام یا کلاس..." style={{ width: 200, padding: "8px 12px" }} />
          )}
          {classList.length > 1 && (
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} style={{ ...inputStyle, width: "auto", padding: "8px 12px" }}>
              <option value="">همه کلاس‌ها</option>
              {classList.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          {attendanceClassIds.length > 0 && (
            <Button variant="ghost" onClick={() => setShowAttendance(true)}>
              <Users size={15} />حضور و غیاب ({presentCount}/{attendanceRows.length})
            </Button>
          )}
        </div>
        {rows.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Button variant="ghost" onClick={exportCSV}><Download size={15} />خروجی CSV</Button>
            <Button variant="ghost" onClick={exportExcelExam}><Download size={15} />خروجی Excel این آزمون</Button>
            {classFilter && (
              <Button variant="ghost" onClick={exportExcelClass}><Download size={15} />خروجی Excel کل کلاس {classFilter}</Button>
            )}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
        <StatCard icon={TrendingUp} label="میانگین نمره" value={`${avg}%`} color="#2563EB" />
        <StatCard icon={Award} label="بالاترین نمره" value={`${highest}%`} color="#16A34A" />
        <StatCard icon={BarChart3} label="پایین‌ترین نمره" value={`${lowest}%`} color="#DC2626" />
        <StatCard icon={CheckCircle2} label="درصد قبولی" value={`${passRate}%`} color="#8B5CF6" />
        <StatCard icon={Users} label="تعداد شرکت‌کننده" value={rows.length} color="#0EA5E9" />
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
        {rows.length === 0 ? (
          <EmptyState text="هنوز دانش‌آموزی در این آزمون شرکت نکرده است." />
        ) : displayRows.length === 0 ? (
          <EmptyState text="نتیجه‌ای با این جستجو پیدا نشد." />
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "right", color: "#64748B", fontSize: 12, fontWeight: 700 }}>
                <th style={{ padding: "8px 6px" }}>رتبه</th>
                <th style={{ padding: "8px 6px" }}>نام دانش‌آموز</th>
                <th style={{ padding: "8px 6px" }}>کلاس</th>
                <th style={{ padding: "8px 6px" }}>نمره</th>
                <th style={{ padding: "8px 6px" }}>پاسخ صحیح</th>
                <th style={{ padding: "8px 6px" }}>زمان</th>
                <th style={{ padding: "8px 6px" }}>تاریخ</th>
                <th style={{ padding: "8px 6px" }}>وضعیت</th>
                {examSections.length > 0 && <th style={{ padding: "8px 6px" }}>بخش‌ها</th>}
                <th style={{ padding: "8px 6px" }}>یادداشت</th>
                <th style={{ padding: "8px 6px" }}></th>
              </tr>
            </thead>
            <tbody>
              {displayRows.map((r, i) => (
                <React.Fragment key={r.studentId}>
                <tr style={{ borderTop: "1px solid #F1F5F9", fontSize: 14 }}>
                  <td style={{ padding: "12px 6px" }}>{medals[i] || i + 1}</td>
                  <td style={{ padding: "12px 6px", fontWeight: 700, color: "#1E293B" }}>{r.name}</td>
                  <td style={{ padding: "12px 6px", color: "#475569" }}>{r.cls || "—"}</td>
                  <td style={{ padding: "12px 6px", fontWeight: 800, color: r.pct >= 50 ? "#16A34A" : "#DC2626" }}>{r.pct}%</td>
                  <td style={{ padding: "12px 6px", color: "#475569" }}>{r.correctCount} / {r.total}</td>
                  <td style={{ padding: "12px 6px", color: "#475569" }}>{fmtTime(r.timeTaken)}</td>
                  <td style={{ padding: "12px 6px", color: "#475569" }}>{r.date}</td>
                  <td style={{ padding: "12px 6px" }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {r.pendingCount > 0 && <Badge tone="orange">{r.pendingCount} در انتظار تصحیح</Badge>}
                      {r.tabSwitches > 0 && (
                        <Badge tone="red">
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                            <AlertTriangle size={11} /> {r.tabSwitches} خروج
                          </span>
                        </Badge>
                      )}
                      {r.pendingCount === 0 && r.tabSwitches === 0 && <span style={{ fontSize: 12, color: "#94A3B8" }}>—</span>}
                    </div>
                  </td>
                  {examSections.length > 0 && (
                    <td style={{ padding: "12px 6px" }}>
                      <span
                        onClick={() => setExpandedId(expandedId === r.studentId ? null : r.studentId)}
                        style={{ fontSize: 12, color: "#2563EB", cursor: "pointer", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 3 }}
                      >
                        {expandedId === r.studentId ? "بستن" : "نمایش"}
                      </span>
                    </td>
                  )}
                  <td style={{ padding: "12px 6px" }}>
                    <TextInput
                      defaultValue={notes[r.studentId] || ""}
                      onBlur={(e) => saveNote(r.studentId, e.target.value)}
                      placeholder="یادداشت..."
                      style={{ width: 140, padding: "6px 8px", fontSize: 12 }}
                    />
                  </td>
                  <td style={{ padding: "12px 6px" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <FileText size={16} style={{ cursor: "pointer", color: "#64748B" }} onClick={() => printStudentReport(r)} />
                      {r.rosterId && (
                        <TrendingUp size={16} style={{ cursor: "pointer", color: "#2563EB" }} onClick={() => setProgressRosterId({ id: r.rosterId, name: r.name })} />
                      )}
                    </div>
                  </td>
                </tr>
                {examSections.length > 0 && expandedId === r.studentId && (
                  <tr style={{ background: "#F8FAFC" }}>
                    <td colSpan={11} style={{ padding: "10px 14px" }}>
                      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        {examSections.map((sec) => (
                          <div key={sec} style={{ fontSize: 12.5, color: "#334155" }}>
                            <span style={{ color: "#64748B" }}>{sec}: </span>
                            <span style={{ fontWeight: 800, color: r.sections[sec] === null ? "#94A3B8" : r.sections[sec] >= 50 ? "#16A34A" : "#DC2626" }}>
                              {r.sections[sec] === null ? "—" : `${r.sections[sec]}%`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <EssayGrading examId={examId} questions={questions} answers={answers} students={students} refresh={refresh} aiAllowed={aiAllowed} />

      {rows.length > 0 && (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 }}>
          <div style={{ flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 16 }}>توزیع نمرات</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140 }}>
              {buckets.map((b) => (
                <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B" }}>{b.count}</div>
                  <div style={{
                    width: "100%", borderRadius: "6px 6px 0 0", background: "#2563EB",
                    height: `${Math.max(4, (b.count / maxBucketCount) * 100)}px`,
                  }} />
                  <div style={{ fontSize: 11, color: "#64748B" }}>{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>تحلیل سوالات</div>
            <div style={{ fontSize: 11.5, color: "#94A3B8", marginBottom: 12 }}>سخت‌ترین سوالات (کمترین درصد پاسخ صحیح) بالاتر نشان داده می‌شوند</div>
            {questionStats.length === 0 ? (
              <div style={{ fontSize: 13, color: "#94A3B8" }}>سوالی برای این آزمون وجود ندارد.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 220, overflowY: "auto" }}>
                {questionStats.map((qs, i) => (
                  <div key={qs.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#334155", marginBottom: 4 }}>
                      <span>
                        {qs.pct !== null && qs.pct === hardestPct && qs.pct < 50 ? "🔥 " : ""}
                        {qs.text.length > 40 ? qs.text.slice(0, 40) + "…" : qs.text}
                      </span>
                      <span style={{ fontWeight: 700, color: qs.pct === null ? "#94A3B8" : qs.pct >= 50 ? "#16A34A" : "#DC2626" }}>
                        {qs.pct === null ? "—" : `${qs.pct}%`}
                      </span>
                    </div>
                    <div style={{ height: 6, background: "#EEF1F6", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${qs.pct || 0}%`, height: "100%", background: qs.pct !== null && qs.pct >= 50 ? "#16A34A" : "#DC2626" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {examSections.length > 0 && (
            <div style={{ flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 16 }}>میانگین نمره به تفکیک بخش</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {sectionStats.map((ss) => (
                  <div key={ss.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "#334155", marginBottom: 4 }}>
                      <span>{ss.name}</span>
                      <span style={{ fontWeight: 700, color: ss.pct >= 50 ? "#16A34A" : "#DC2626" }}>{ss.pct}%</span>
                    </div>
                    <div style={{ height: 8, background: "#EEF1F6", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${ss.pct}%`, height: "100%", background: ss.pct >= 50 ? "#16A34A" : "#DC2626" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showAttendance && (
        <Modal title={`حضور و غیاب — ${exam.title}`} onClose={() => setShowAttendance(false)}>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, background: "#F0FDF4", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#16A34A" }}>{presentCount}</div>
              <div style={{ fontSize: 11.5, color: "#15803D" }}>حاضر</div>
            </div>
            <div style={{ flex: 1, background: "#FEF2F2", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#DC2626" }}>{absentCount}</div>
              <div style={{ fontSize: 11.5, color: "#B91C1C" }}>غایب</div>
            </div>
          </div>
          {attendanceRows.length === 0 ? (
            <div style={{ color: "#94A3B8", fontSize: 13, textAlign: "center", padding: 20 }}>این کلاس هنوز دانش‌آموزی ندارد.</div>
          ) : (
            <div style={{ maxHeight: 380, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
              {attendanceRows.map((r) => (
                <div key={r.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px",
                  borderRadius: 8, background: r.present ? "#F8FAFC" : "#FEF2F2",
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{r.name}</div>
                    {attendanceClassIds.length > 1 && <div style={{ fontSize: 11, color: "#94A3B8" }}>{r.className}</div>}
                  </div>
                  <span style={{
                    fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                    background: r.present ? "#DCFCE7" : "#FEE2E2", color: r.present ? "#15803D" : "#B91C1C",
                  }}>
                    {r.present ? "حاضر" : "غایب"}
                  </span>
                </div>
              ))}
            </div>
          )}
          {attendanceRows.length > 0 && (
            <div style={{ marginTop: 14, textAlign: "left" }}>
              <Button variant="ghost" onClick={() => {
                const header = ["نام", "کلاس", "وضعیت"];
                const lines = [header.join(",")];
                attendanceRows.forEach((r) => {
                  lines.push([r.name, r.className, r.present ? "حاضر" : "غایب"].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
                });
                downloadTextFile(`${exam.title}-حضور-و-غیاب.csv`, "\uFEFF" + lines.join("\n"), "text/csv;charset=utf-8;");
              }}>
                <Download size={15} />خروجی CSV
              </Button>
            </div>
          )}
        </Modal>
      )}
      {progressRosterId && (
        <StudentProgressModal
          rosterId={progressRosterId.id}
          studentName={progressRosterId.name}
          students={students}
          answers={answers}
          questions={questions}
          exams={exams}
          onClose={() => setProgressRosterId(null)}
          aiAllowed={aiAllowed}
        />
      )}
    </div>
  );
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
        if (!r.ok) throw new Error();
        const blob = await r.blob();
        objectUrl = URL.createObjectURL(blob);
        if (!cancelled) setSrc(objectUrl);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => { cancelled = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [photoKey]);
  if (error) return <div style={{ fontSize: 12, color: "#DC2626" }}>عکس پاسخ بارگذاری نشد.</div>;
  if (!src) return <div style={{ fontSize: 12, color: "#94A3B8" }}>در حال بارگذاری عکس...</div>;
  return (
    <>
      <img
        src={src}
        alt="پاسخ دست‌نویس"
        onClick={() => setExpanded(true)}
        style={{ maxWidth: "100%", maxHeight: 400, borderRadius: 10, display: "block", cursor: "zoom-in" }}
      />
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(15,23,42,0.9)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "zoom-out",
          }}
        >
          <img src={src} alt="پاسخ دست‌نویس (بزرگ)" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 10 }} />
        </div>
      )}
    </>
  );
}

function EssayGrading({ examId, questions, answers, students, refresh, aiAllowed }) {
  const essayQuestions = questions.filter((q) => q.exam_id === examId && q.type === "essay");
  const [drafts, setDrafts] = useState({}); // answerId -> input value
  const [savingId, setSavingId] = useState(null);
  const [aiGradingId, setAiGradingId] = useState(null);
  const [aiFeedback, setAiFeedback] = useState({}); // answerId -> { feedback, hasReference }
  const [aiGradeError, setAiGradeError] = useState({}); // answerId -> error text

  if (essayQuestions.length === 0) return null;

  const items = [];
  essayQuestions.forEach((q) => {
    answers.filter((a) => a.question_id === q.id && a.selected_option).forEach((a) => {
      const student = students.find((s) => s.id === a.student_id);
      items.push({ answer: a, question: q, studentName: student?.fullname || "—" });
    });
  });

  if (items.length === 0) return null;

  const pending = items.filter((it) => it.answer.awarded_mark == null);
  const graded = items.filter((it) => it.answer.awarded_mark != null);

  const grade = async (answerId, questionMark) => {
    const raw = drafts[answerId];
    let val = Number(raw);
    if (Number.isNaN(val)) return;
    if (val < 0) val = 0;
    if (val > questionMark) val = questionMark;
    setSavingId(answerId);
    // Answers are stored batched per exam attempt (one "answers:<studentId>" key
    // holding all of that attempt's answer records) — find which student this
    // answer belongs to, then update it inside that batch and write it back.
    const owningAnswer = answers.find((a) => a.id === answerId);
    if (owningAnswer) {
      const batch = (await getJSON(`answers:${owningAnswer.student_id}`)) || [];
      const updatedBatch = batch.map((a) =>
        a.id === answerId ? { ...a, awarded_mark: val, is_correct: val >= questionMark } : a
      );
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
    if (kws.length === 0) return;
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
      } else {
        setDrafts((d) => ({ ...d, [answerId]: String(data.score) }));
        setAiFeedback((f) => ({ ...f, [answerId]: { feedback: data.feedback, hasReference: data.hasReference } }));
      }
    } catch {
      setAiGradeError((e) => ({ ...e, [answerId]: "اتصال برقرار نشد." }));
    }
    setAiGradingId(null);
  };

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginTop: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>تصحیح پاسخ‌های تشریحی</div>
      <div style={{ fontSize: 12, color: "#64748B", marginBottom: 16 }}>
        {pending.length > 0 ? `${pending.length} پاسخ در انتظار تصحیح` : "همه‌ی پاسخ‌ها تصحیح شده‌اند."}
      </div>
      {items.some((it) => (it.answer.selected_option || "").startsWith("photo:")) && (
        <div style={{ fontSize: 12, color: "#B45309", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: "8px 12px", marginBottom: 16 }}>
          ⏳ عکس‌های پاسخ دست‌نویس فقط تا ۲ روز بعد از ثبت نگه‌داری می‌شوند — لطفاً ظرف همین بازه تصحیح کنید.
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[...pending, ...graded].map(({ answer, question, studentName }) => (
          <div key={answer.id} style={{ border: "1px solid #EEF1F6", borderRadius: 12, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{studentName}</div>
                <div style={{ fontSize: 12, color: "#64748B" }}><MathText text={question.question_text} /></div>
              </div>
              {answer.awarded_mark != null && <Badge tone={answer.awarded_mark >= question.mark ? "green" : "orange"}>نمره‌داده‌شده: {answer.awarded_mark} از {question.mark}</Badge>}
            </div>
            <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#334155", marginBottom: 10, whiteSpace: "pre-wrap" }}>
              {(answer.selected_option || "").startsWith("photo:")
                ? <AnswerPhoto photoKey={answer.selected_option.slice("photo:".length)} />
                : answer.selected_option}
            </div>
            {question.model_answer && (
              <div style={{ fontSize: 12, color: "#16A34A", marginBottom: 10 }}>پاسخ نمونه: <MathText text={question.model_answer} /></div>
            )}
            {(question.keywords || []).length > 0 && !(answer.selected_option || "").startsWith("photo:") && (
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 10 }}>
                کلمات کلیدی: {question.keywords.map((k) => {
                  const found = (answer.selected_option || "").toLowerCase().includes(k.toLowerCase());
                  return <span key={k} style={{ color: found ? "#16A34A" : "#CBD5E1", fontWeight: found ? 700 : 400, marginInlineEnd: 8 }}>{k}</span>;
                })}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              {(question.keywords || []).length > 0 && !(answer.selected_option || "").startsWith("photo:") && (
                <Button variant="ghost" style={{ fontSize: 12, padding: "8px 12px" }} onClick={() => suggestFromKeywords(answer.id, question, answer.selected_option)}>
                  پیشنهاد نمره (خودکار)
                </Button>
              )}
              {aiAllowed && !(answer.selected_option || "").startsWith("photo:") && (
                <Button
                  variant="ghost"
                  style={{ fontSize: 12, padding: "8px 12px" }}
                  onClick={() => suggestWithAI(answer.id, question, answer.selected_option)}
                  disabled={aiGradingId === answer.id}
                >
                  {aiGradingId === answer.id ? "در حال بررسی..." : "✨ پیشنهاد نمره با هوش مصنوعی"}
                </Button>
              )}
              <TextInput
                type="number" min={0} max={question.mark}
                placeholder={`نمره از ${question.mark}`}
                value={drafts[answer.id] ?? (answer.awarded_mark ?? "")}
                onChange={(e) => setDrafts((d) => ({ ...d, [answer.id]: e.target.value }))}
                style={{ width: 120 }}
              />
              <Button variant="ghost" style={{ fontSize: 13, padding: "8px 14px" }} onClick={() => grade(answer.id, question.mark)} disabled={savingId === answer.id}>
                {savingId === answer.id ? "..." : "ثبت نمره"}
              </Button>
            </div>
            {aiGradeError[answer.id] && (
              <div style={{ fontSize: 12, color: "#DC2626", marginTop: 8 }}>{aiGradeError[answer.id]}</div>
            )}
            {aiFeedback[answer.id] && (
              <div style={{ fontSize: 12, color: "#1E3A8A", background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 8, padding: 10, marginTop: 8 }}>
                <div>✨ نظر هوش مصنوعی: {aiFeedback[answer.id].feedback}</div>
                {!aiFeedback[answer.id].hasReference && (
                  <div style={{ color: "#B45309", marginTop: 4 }}>⚠️ چون برای این سوال پاسخ نمونه/کلمات کلیدی ثبت نشده، این فقط یه حدسه — حتماً خودت هم بررسی کن.</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CLASSES + ROSTER — teacher pre-registers students per class
   and assigns each a login code, so students don't type their
   name when starting an exam.
--------------------------------------------------------- */
