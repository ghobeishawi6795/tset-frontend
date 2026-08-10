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
  const [studentExamId, setStudentExamId] = useState(
    () => new URLSearchParams(window.location.search).get("exam")
  );
  // If the URL is a password-reset link (?reset=TOKEN), show the reset screen.
  const [resetToken, setResetToken] = useState(
    () => new URLSearchParams(window.location.search).get("reset")
  );
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
      if (saved && typeof saved.top === "number" && typeof saved.left === "number") return saved;
    } catch { /* use default below */ }
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
    if (!draggingRef.current) return;
    dragMovedRef.current = true;
    const btn = 44;
    const maxLeft = window.innerWidth - btn - 6;
    const maxTop = window.innerHeight - btn - 6;
    const left = Math.min(Math.max(clientX - dragOffsetRef.current.x, 6), maxLeft);
    const top = Math.min(Math.max(clientY - dragOffsetRef.current.y, 6), maxTop);
    setAlertBtnPos({ top, left });
  };
  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try { localStorage.setItem("eduexam_alertbtn_pos", JSON.stringify(alertBtnPos)); } catch { /* ignore */ }
  };
  useEffect(() => {
    const onMouseMove = (e) => onDragMove(e.clientX, e.clientY);
    const onTouchMove = (e) => { if (draggingRef.current && e.touches[0]) { e.preventDefault(); onDragMove(e.touches[0].clientX, e.touches[0].clientY); } };
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
        } catch { /* fall through to normal session-restore below */ }
      }

      const session = loadSession();
      if (session) {
        const t = await getJSON(`teacher:${session.username}`);
        if (t && t.password === session.passwordHash) {
          setTeacher(t);
        } else {
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
      ex = full.exams || []; qs = full.questions || []; cl = full.classes || [];
      ro = full.roster || []; msg = full.messages || []; allTeachers = full.teachers || [];
      st = full.students || []; an = full.answers || []; alerts = full.cheatalerts || [];
    } else {
      const [ex2, qs2, cl2, ro2, msg2, allTeachers2, dashData] = await Promise.all([
        loadAll("exam:"), loadAll("question:"),
        loadAll("class:"), loadAll("roster:"), loadAll("message:"),
        loadAll("teacher:"), loadTeacherDashboardData(),
      ]);
      ex = ex2; qs = qs2; cl = cl2; ro = ro2; msg = msg2; allTeachers = allTeachers2;
      st = dashData.students; an = dashData.answers; alerts = dashData.cheatalerts;
    }
    setStudents(st); setAnswers(an);
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
      if (!r.ok) { setExams([]); return; }
      const data = await r.json();
      setExams([data.exam]);
      setQuestions(data.questions || []);
      // v76: این endpoint دیگه roster (شامل کد شخصی دانش‌آموزها) رو
      // برنمی‌گردونه — تطبیق کد حالا سمت سرور در handleExamStart/
      // handleExamVerifyCode انجام می‌شه. roster اینجا همیشه خالیه.
      setRoster([]);
      setClasses(sortByFa(data.classes || [], (c) => c.name));
    } catch {
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
      if (!r.ok) return [];
      const data = await r.json();
      setQuestions(data.questions || []);
      return data.questions || [];
    } catch {
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
      } catch { /* ignore — defaults to false, register screen offered */ }
      setReady(true);
    })();
  }, [studentExamId, loadStudentSession]);

  // Load the full authenticated dataset once a teacher is actually logged in
  // (fresh login, or a restored session) — never before, since /api/kv and
  // /api/list now require a valid session token.
  useEffect(() => {
    if (teacher && !studentExamId && teacher.role !== "super_admin") refresh();
  }, [teacher, studentExamId, refresh]);

  // Teacher-role sidebar branding (school's logo + accent color), fetched
  // separately since it's not part of the teacher's own KV record.
  useEffect(() => {
    if (!teacher || teacher.role !== "teacher" || !teacher.school_id) { setMySchool(null); return; }
    let cancelled = false;
    getJSON(`school:${teacher.school_id}`).then((s) => { if (!cancelled) setMySchool(s); });
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
        if (studentExamId) loadStudentSession(studentExamId);
        else if (teacher) refresh();
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
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", fontFamily: "inherit", color: "#64748B" }}>
        در حال بارگذاری...
      </div>
    );
  }

  // Student is taking an exam — separate full-screen flow, no auth needed.
  if (studentExamId) {
    const exam = exams.find((e) => e.id === studentExamId);
    if (!exam) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          آزمون یافت نشد.
        </div>
      );
    }
    return (
      <TakeExamScreen
        exam={exam}
        questions={questions}
        roster={roster}
        classes={classes}
        fetchQuestionsForName={fetchExamQuestionsForName}
        onFinish={() => loadStudentSession(studentExamId)}
        onExit={() => {
          setStudentExamId(null);
          const url = new URL(window.location.href);
          url.searchParams.delete("exam");
          window.history.replaceState({}, "", url);
        }}
      />
    );
  }

  // Password-reset link (?reset=TOKEN) — shown regardless of login state.
  if (resetToken) {
    return (
      <ResetPasswordScreen
        token={resetToken}
        onDone={() => {
          setResetToken(null);
          const url = new URL(window.location.href);
          url.searchParams.delete("reset");
          window.history.replaceState({}, "", url);
        }}
      />
    );
  }

  if (!teacher) {
    const showRegister = authView === "register" && !teacherExists;
    const showForgot = authView === "forgot";
    if (showForgot) {
      return <ForgotPasswordScreen goLogin={() => setAuthView("login")} />;
    }
    return showRegister ? (
      <RegisterScreen
        onRegistered={(t) => { setTeacher(t); setTeacherExists(true); }}
        goLogin={() => setAuthView("login")}
      />
    ) : (
      <LoginScreen
        onLogin={setTeacher}
        goRegister={() => setAuthView("register")}
        goForgot={() => setAuthView("forgot")}
        allowRegister={!teacherExists}
        portalMode={portalMode}
        setPortalMode={setPortalMode}
        portalData={{ roster, students, answers, exams, questions, classes, messages }}
      />
    );
  }

  // مدیر کل حسابی کاملاً جدا داره — روی هیچ مدرسه‌ی خاصی محدود نیست،
  // فقط مدرسه‌ها رو می‌سازه و برای هرکدوم یک مدیر تعیین می‌کنه.
  if (teacher.role === "super_admin") {
    return (
      <SuperAdminDashboardScreen
        teacher={teacher}
        onLogout={() => { performLogout(); setTeacher(null); setView("dashboard"); }}
        onUpdateSelf={(updated) => { setTeacher(updated); saveSession(updated.username, updated.password, getAuthToken()); }}
      />
    );
  }

  // Admin accounts get a completely separate screen — they manage teacher
  // accounts for the whole school rather than owning classes/exams themselves.
  if (teacher.role === "admin") {
    return (
      <AdminDashboardScreen
        teacher={teacher}
        teachers={teachers.filter((t) => t.role !== "admin" && t.role !== "super_admin")}
        exams={exams}
        classes={classes}
        roster={roster}
        students={students}
        questions={questions}
        answers={answers}
        messages={messages}
        cheatAlerts={cheatAlerts}
        onLogout={() => { performLogout(); setTeacher(null); setView("dashboard"); }}
        onUpdateSelf={(updated) => { setTeacher(updated); saveSession(updated.username, updated.password, getAuthToken()); }}
        refresh={refresh}
        addLocalClass={addLocalClass}
        removeLocalClass={removeLocalClass}
        updateLocalClass={updateLocalClass}
        addLocalRoster={addLocalRoster}
        addLocalRosterMany={addLocalRosterMany}
        updateLocalRoster={updateLocalRoster}
        removeLocalRoster={removeLocalRoster}
        addLocalQuestion={addLocalQuestion}
        addLocalQuestionMany={addLocalQuestionMany}
        updateLocalQuestion={updateLocalQuestion}
        removeLocalQuestion={removeLocalQuestion}
        removeLocalQuestionMany={removeLocalQuestionMany}
        removeLocalExam={removeLocalExam}
      />
    );
  }

  const activeExam = exams.find((e) => e.id === activeExamId);
  const activeClass = classes.find((c) => c.id === activeClassId);
  const myAlerts = cheatAlerts.filter((a) => a.teacher_id === teacher.username)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const unseenAlertCount = myAlerts.filter((a) => !a.seen).length;
  const markAlertsSeen = async () => {
    const unseen = myAlerts.filter((a) => !a.seen);
    await Promise.all(unseen.map((a) => setJSON(`cheatalert:${a.id}`, { ...a, seen: true })));
    if (unseen.length > 0) await refresh();
  };
  const dismissAlert = async (id) => {
    await deleteKey(`cheatalert:${id}`);
    await refresh();
  };

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: alertBtnPos.top, left: alertBtnPos.left, zIndex: 50 }}>
        <div
          onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
          onTouchStart={(e) => { const t = e.touches[0]; if (t) startDrag(t.clientX, t.clientY); }}
          onClick={() => {
            if (dragMovedRef.current) { dragMovedRef.current = false; return; } // was a drag, not a tap
            const next = !showAlerts; setShowAlerts(next); if (next) markAlertsSeen();
          }}
          style={{
            width: 44, height: 44, borderRadius: "50%", background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,.14)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "grab", position: "relative",
            touchAction: "none", userSelect: "none",
          }}
        >
          <AlertTriangle size={20} color={unseenAlertCount > 0 ? "#DC2626" : "#94A3B8"} />
          {unseenAlertCount > 0 && (
            <div style={{
              position: "absolute", top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, background: "#DC2626",
              color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
            }}>{unseenAlertCount}</div>
          )}
        </div>
        {showAlerts && (
          <div style={{
            position: "absolute", top: 52, left: 0, width: 320, maxHeight: 380, overflowY: "auto",
            background: "#fff", borderRadius: 14, boxShadow: "0 10px 30px rgba(0,0,0,.18)", padding: 14,
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 10 }}>هشدارهای تخلف در آزمون</div>
            {myAlerts.length === 0 ? (
              <div style={{ fontSize: 12, color: "#94A3B8" }}>موردی ثبت نشده است.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {myAlerts.map((a) => (
                  <div key={a.id} style={{ border: "1px solid #EEF1F6", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{a.student_name}</div>
                        <div style={{ fontSize: 12, color: "#64748B" }}>{a.exam_title}</div>
                        <div style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}>{a.tab_switches} بار خروج از صفحه‌ی آزمون</div>
                      </div>
                      <div onClick={() => dismissAlert(a.id)} style={{ cursor: "pointer", color: "#94A3B8", fontSize: 16, lineHeight: 1 }}>×</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 6 }}>{new Date(a.created_at).toLocaleString("fa-IR")}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Sidebar
        active={view}
        onNavigate={(v) => { setView(v); setActiveExamId(null); setActiveClassId(null); }}
        onLogout={() => { performLogout(); setTeacher(null); setView("dashboard"); }}
        teacherName={teacher.fullname}
        onHelp={() => setShowHelp(true)}
        brandColor={mySchool?.color}
        logoUrl={mySchool?.logo_data_url}
        badges={{ classchat: unreadClassChatCount, messages: unreadSaThreadCount }}
        hiddenKeys={classChatAllowed ? [] : ["classchat"]}
      />
      {showHelp && (
        <Modal title="راهنمای آزمون‌ساز" onClose={() => setShowHelp(false)}>
          <div style={{ fontSize: 13.5, color: "#334155", lineHeight: 2.1 }}>
            <b>آزمون‌ها:</b> از این بخش آزمون جدید بساز، سوال‌هایش را اضافه کن (تکی، با پیست کردن چند سوال با هم، با بارگذاری از بانک سوال، یا با تولید خودکار توسط هوش مصنوعی — اگر برای حساب شما فعال باشد)، و لینک/کد ورود را در اختیار دانش‌آموزان بگذار.
            <br /><br />
            <b>بانک سوال:</b> سوال‌هایی که ممکن است در چند آزمون استفاده شوند را اینجا نگه‌داری کن؛ از همین‌جا هم می‌توان سوال جدید ساخت، از فایل متنی وارد کرد، یا با فایل اکسل به‌صورت گروهی اضافه کرد. از تب‌های بالای صفحه می‌توانی سوال‌هایت را با «معلم‌های مدرسه» یا به‌صورت «عمومی» با همه‌ی معلم‌های سامانه به اشتراک بگذاری، و سوال‌های اشتراکی‌ای که بقیه به اشتراک گذاشته‌اند را به بانک خودت اضافه کنی.
            <br /><br />
            {teacher.school_id ? (
              <React.Fragment>
                <b>کلاس‌ها و دانش‌آموزان:</b> دانش‌آموزان کلاس‌های خودت را می‌بینی. اگر مدیر مدرسه به تو کلاسی نسپرده باشد، اینجا خالی می‌ماند — برای افزودن یا جابه‌جایی دانش‌آموز باید مدیر مدرسه اقدام کند.
              </React.Fragment>
            ) : (
              <React.Fragment>
                <b>کلاس‌ها و دانش‌آموزان:</b> چون حساب تو مستقل است (وابسته به هیچ مدرسه‌ای نیست)، خودت مستقیماً کلاس می‌سازی و دانش‌آموزانش را اضافه می‌کنی — تکی، با پیست چند اسم با هم، یا با بارگذاری فایل اکسل.
              </React.Fragment>
            )}
            <br /><br />
            <b>نتایج:</b> نمرات هر آزمون، تحلیل سوال‌به‌سوال، حضور و غیاب دانش‌آموزان، و امکان تصحیح دستی یا با کمک هوش مصنوعی برای سوال‌های تشریحی. کنار نام هر دانش‌آموزی که با کد شخصی (نه با تایپ اسم) وارد شده، دکمه‌ی «روند» هست — روند نمرات او در همه‌ی آزمون‌ها، نقاط ضعف بر اساس برچسب سوال‌ها، پیشنهاد تمرین با هوش مصنوعی (اگر برای حساب شما فعال باشد)، و دانلود کارنامه‌ی کامل او به‌صورت PDF. از همین صفحه می‌توان خروجی Excel هم گرفت: نمره‌ی هر سوال برای یک آزمون خاص، یا خلاصه‌ی نمرات یک کلاس در همه‌ی آزمون‌هایش.
            <br /><br />
            <b>چت با دانش‌آموزان:</b> برای هر کلاس یک چت گروهی مشترک با همه‌ی دانش‌آموزانش داری (اگر این قابلیت برای حساب تو فعال باشد). از بالای صفحه‌ی چت می‌توانی حالت کلاس را بین «چت دوطرفه» و «کانال اطلاع‌رسانی یک‌طرفه» عوض کنی، و حتی برای یک دانش‌آموز خاص جدا از بقیه‌ی کلاس تصمیم بگیری.
            <br /><br />
            <b>پیام‌ها:</b> ارسال پیام یا اعلان به دانش‌آموزان یا کلاس‌ها{teacher.school_id ? "." : "، و همچنین گفتگوی مستقیم با مدیر سایت سامانه (چون حساب تو مستقل است)."}
            <br /><br />
            <b>تنظیمات:</b> تغییر رمز عبور و اطلاعات حساب خودت. اگر رمز عبورت را فراموش کردی، از صفحه‌ی ورود گزینه‌ی «فراموشی رمز عبور» را بزن — لینک بازیابی به همان ایمیلی ارسال می‌شود که {teacher.school_id ? "مدیر مدرسه" : "مدیر سایت"} برایت ثبت کرده است.
          </div>
        </Modal>
      )}
      <div style={{ flex: 1, background: "#F8FAFC", minHeight: "100vh" }}>
        {view === "dashboard" && (
          <DashboardScreen
            teacher={teacher} exams={exams} questions={questions} students={students} answers={answers}
            onNavigate={setView}
            onOpenExam={(id) => { setActiveExamId(id); setView("manageQuestions"); }}
          />
        )}
        {view === "exams" && (
          <ExamsScreen
            teacher={teacher} exams={exams} questions={questions} answers={answers} classes={classes}
            onNavigate={(v, examId) => { setView(v); if (examId) setActiveExamId(examId); }}
            onOpenExam={(id) => { setActiveExamId(id); setView("manageQuestions"); }}
            refresh={refresh}
            addLocalExam={addLocalExam}
            updateLocalExam={updateLocalExam}
            removeLocalExam={removeLocalExam}
            addLocalQuestionMany={addLocalQuestionMany}
            removeLocalQuestionMany={removeLocalQuestionMany}
          />
        )}
        {view === "manageQuestions" && activeExam && (
          <QuestionsScreen
            exam={activeExam} questions={questions} exams={exams} teacher={teacher}
            onBack={() => setView("exams")}
            refresh={refresh}
            addLocalQuestion={addLocalQuestion}
            addLocalQuestionMany={addLocalQuestionMany}
            updateLocalQuestion={updateLocalQuestion}
            removeLocalQuestion={removeLocalQuestion}
            aiAllowed={aiAllowed}
          />
        )}
        {view === "examLive" && activeExam && (
          <ExamLiveScreen
            exam={activeExam} teacher={teacher}
            onBack={() => setView("exams")}
          />
        )}
        {view === "questionbank" && (
          <QuestionBankScreen
            teacher={teacher} questions={questions} exams={exams}
            refresh={refresh}
            addLocalQuestion={addLocalQuestion}
            addLocalQuestionMany={addLocalQuestionMany}
            updateLocalQuestion={updateLocalQuestion}
            removeLocalQuestion={removeLocalQuestion}
            aiAllowed={aiAllowed}
          />
        )}
        {view === "results" && (
          <ResultsScreen
            teacher={teacher} exams={exams} questions={questions} students={students} answers={answers}
            roster={roster} classes={classes}
            initialExamId={activeExamId}
            onBack={() => setView("exams")}
            refresh={refresh}
            aiAllowed={aiAllowed}
          />
        )}
        {view === "classes" && (
          <ClassesScreen
            teacher={teacher} classes={classes} roster={roster}
            onOpenClass={(id) => { setActiveClassId(id); setView("manageRoster"); }}
            refresh={refresh}
            addLocalClass={addLocalClass}
            removeLocalClass={removeLocalClass}
            updateLocalClass={updateLocalClass}
          />
        )}
        {view === "manageRoster" && activeClass && (
          <RosterScreen
            classroom={activeClass} roster={roster} teacher={teacher}
            onBack={() => setView("classes")}
            refresh={refresh}
            addLocalRoster={addLocalRoster}
            addLocalRosterMany={addLocalRosterMany}
            updateLocalRoster={updateLocalRoster}
            removeLocalRoster={removeLocalRoster}
            groupLoginCode={teacher.school_id ? mySchool?.login_code : teacher.login_code}
          />
        )}
        {view === "students" && (
          <StudentsScreen teacher={teacher} students={students} exams={exams} answers={answers} questions={questions} refresh={refresh} />
        )}
        {view === "messages" && (
          <MessagesScreen teacher={teacher} classes={classes} roster={roster} messages={messages} refresh={refresh} addLocalMessage={addLocalMessage} removeLocalMessage={removeLocalMessage} onUpdateSelf={setTeacher} />
        )}
        {view === "classchat" && (
          classChatAllowed ? (
            <ClassChatScreen teacher={teacher} classes={classes} roster={roster} messages={messages} refresh={refresh} refreshMessages={refreshMessages} onUpdateSelf={setTeacher} addLocalMessage={addLocalMessage} />
          ) : (
            <div style={{ flex: 1, padding: "30px 34px" }}>
              <TopBar title="چت با دانش‌آموزان" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, color: "#94A3B8", fontSize: 13.5 }}>
                این قابلیت برای حساب شما فعال نیست — از مدیر سایت بخواهید آن را فعال کند.
              </div>
            </div>
          )
        )}
        {view === "settings" && (
          <SettingsScreen teacher={teacher} onUpdate={setTeacher} refresh={refresh} exams={exams} students={students} />
        )}

        {/* Quick access: preview the student exam-taking flow for any exam you own */}
        {(view === "exams" || view === "dashboard") && exams.some(e => e.teacher_id === teacher.username) && (
          <div style={{ position: "fixed", bottom: 22, left: 22 }}>
            <select
              defaultValue=""
              onChange={(e) => {
                if (!e.target.value) return;
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
              }}
              style={{ ...inputStyle, padding: "10px 14px", boxShadow: "0 6px 20px rgba(0,0,0,.12)" }}
            >
              <option value="" disabled>پیش‌نمایش آزمون به‌عنوان دانش‌آموز</option>
              {exams.filter(e => e.teacher_id === teacher.username).map(e => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

console.log(
  "%cآزمون‌ساز معلم%c\n© ghobeishawi - تمامی حقوق محفوظ است",
  "font-weight:bold;font-size:14px;color:#2563EB;",
  "color:#64748B;font-size:12px;"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppErrorBoundary><EduExamApp /></AppErrorBoundary>);
