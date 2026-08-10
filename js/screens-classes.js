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
    if (!newClassName.trim()) return;
    setCreateBusy(true);
    setCreateError("");
    const id = uid();
    const record = { id, name: newClassName.trim(), teacher_ids: [teacher.username], school_id: null, created_at: new Date().toISOString() };
    const result = await setJSONChecked(`class:${id}`, record);
    setCreateBusy(false);
    if (!result.ok) { setCreateError(result.error); return; }
    addLocalClass && addLocalClass(record);
    setNewClassName("");
    setShowCreate(false);
  };

  const removeOwnClass = async (cls) => {
    const members = roster.filter((r) => r.class_id === cls.id);
    if (!window.confirm(`کلاس «${cls.name}» حذف شود؟${members.length ? ` ${members.length} دانش‌آموز این کلاس نیز حذف می‌شوند.` : ""} این کار قابل بازگشت نیست.`)) return;
    removeLocalClass && removeLocalClass(cls.id);
    await Promise.all([deleteKey(`class:${cls.id}`), ...members.map((r) => deleteKey(`roster:${r.id}`))]);
  };

  return (
    <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
      <TopBar title="کلاس‌ها" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />
      <div style={{ fontSize: 12.5, color: "#94A3B8", marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span>{isStandalone ? "کلاس‌های خودتان را از همین‌جا بسازید و مدیریت کنید." : "کلاس‌بندی و افزودن/حذف دانش‌آموز توسط مدیر مدرسه انجام می‌شود."}</span>
        {isStandalone && <Button onClick={() => setShowCreate(true)}><Plus size={15} />ساخت کلاس جدید</Button>}
      </div>

      {isStandalone && showCreate && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 18, marginBottom: 18 }}>
          <Field label="نام کلاس">
            <TextInput value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="مثلاً: نهم ۱" />
          </Field>
          {createError && <div style={{ color: "#DC2626", fontSize: 12.5, marginBottom: 10 }}>{createError}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={createOwnClass} disabled={createBusy}>{createBusy ? "در حال ساخت..." : "ساخت کلاس"}</Button>
            <Button variant="ghost" onClick={() => { setShowCreate(false); setCreateError(""); }}>انصراف</Button>
          </div>
        </div>
      )}

      {myClasses.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6" }}>
          <EmptyState text="هنوز کلاسی برای شما تعریف نشده است." actionLabel={isStandalone ? "ساخت کلاس جدید" : undefined} onAction={isStandalone ? () => setShowCreate(true) : undefined} />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 16 }}>
          {myClasses.map((c) => {
            const count = roster.filter((r) => r.class_id === c.id).length;
            return (
              <div key={c.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#64748B", marginBottom: 16 }}>{count} دانش‌آموز</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button variant="ghost" style={{ fontSize: 13, padding: "8px 12px" }} onClick={() => onOpenClass(c.id)}>مشاهده دانش‌آموزان</Button>
                  {isStandalone && (
                    <Button variant="ghost" style={{ fontSize: 13, padding: "8px 12px", color: "#DC2626" }} onClick={() => removeOwnClass(c)}>
                      <Trash2 size={14} />حذف
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
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
    if (!name.trim()) return;
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
    if (names.length === 0) { setBulkMsg("نامی برای افزودن پیدا نشد."); return; }
    setBulkSaving(true);
    const existingNames = new Set(members.map((m) => m.fullname.trim()));
    const usedCodes = roster.map((r) => r.code);
    let added = 0, skipped = 0;
    const newRecords = [];
    for (const n of names) {
      if (existingNames.has(n)) { skipped++; continue; }
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
      if (result.ok && result.v) usedCodes.push(result.v.code);
      added++;
    }
    if (newRecords.length > 0) addLocalRosterMany && addLocalRosterMany(newRecords);
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
    if (!window.confirm("این دانش‌آموز از کلاس حذف شود؟")) return;
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
    if (!win) return;
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

  return (
    <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748B", marginBottom: 6, cursor: "pointer" }} onClick={onBack}>
        <ArrowRight size={15} /> بازگشت به کلاس‌ها
      </div>
      <TopBar title={`دانش‌آموزان — ${classroom.name}`} teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />

      <div style={{ background: "#FFFBEB", borderRadius: 16, border: "1px solid #FDE68A", padding: 16, marginBottom: 20, fontSize: 12.5, color: "#92400E" }}>
        افزودن و حذف دانش‌آموز توسط مدیر مدرسه انجام می‌شود.
      </div>

      {groupLoginCode && (
        <div style={{ background: "#EFF6FF", borderRadius: 16, border: "1px solid #BFDBFE", padding: "14px 16px", marginBottom: 20, fontSize: 12.5, color: "#1E3A8A", display: "flex", alignItems: "center", gap: 10 }}>
          دانش‌آموزها برای ورود، این کد را همراه با کد شخصی خودشان وارد می‌کنند:
          <span style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 800, letterSpacing: 2 }}>{groupLoginCode}</span>
        </div>
      )}

      {members.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <Button variant="ghost" onClick={printCodes}><FileText size={15} />چاپ کارت کدها برای پخش بین دانش‌آموزان</Button>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
        {members.length === 0 ? (
          <EmptyState text="هنوز دانش‌آموزی به این کلاس اضافه نشده." />
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "right", color: "#64748B", fontSize: 12, fontWeight: 700 }}>
                <th style={{ padding: "8px 6px" }}>نام</th>
                <th style={{ padding: "8px 6px" }}>کد ورود</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} style={{ borderTop: "1px solid #F1F5F9", fontSize: 14 }}>
                  <td style={{ padding: "12px 6px", fontWeight: 700, color: "#1E293B" }}>{m.fullname}</td>
                  <td style={{ padding: "12px 6px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 800, color: "#2563EB", letterSpacing: 2 }}>{m.code}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
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
    if (!window.confirm("سوابق شرکت این دانش‌آموز در همه‌ی آزمون‌ها حذف شود؟ این کار قابل بازگشت نیست.")) return;
    setDeletingKey(ids.join(","));
    await Promise.all(ids.map((id) => deleteKey(`answers:${id}`)));
    await Promise.all(ids.map((id) => deleteKey(`student:${id}`)));
    setDeletingKey(null);
    if (refresh) await refresh();
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

  return (
    <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
      <TopBar title="دانش‌آموزان" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />
      {rows.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <TextInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجوی نام یا کلاس..." style={{ maxWidth: 260 }} />
        </div>
      )}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
        {rows.length === 0 ? (
          <EmptyState text="هنوز دانش‌آموزی در آزمون‌های تو شرکت نکرده است." />
        ) : displayRows.length === 0 ? (
          <EmptyState text="نتیجه‌ای با این جستجو پیدا نشد." />
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "right", color: "#64748B", fontSize: 12, fontWeight: 700 }}>
                <th style={{ padding: "8px 6px" }}>نام</th>
                <th style={{ padding: "8px 6px" }}>کد کلاس</th>
                <th style={{ padding: "8px 6px" }}>تعداد آزمون شرکت‌کرده</th>
                <th style={{ padding: "8px 6px" }}></th>
                <th style={{ padding: "8px 6px" }}></th>
              </tr>
            </thead>
            <tbody>
              {displayRows.map((s) => (
                <React.Fragment key={s.fullname}>
                  <tr style={{ borderTop: "1px solid #F1F5F9", fontSize: 14, cursor: s.trend.length > 1 ? "pointer" : "default" }}>
                    <td style={{ padding: "12px 6px", fontWeight: 700, color: "#1E293B" }} onClick={() => s.trend.length > 1 && setExpanded((e) => e === s.fullname ? null : s.fullname)}>{s.fullname}</td>
                    <td style={{ padding: "12px 6px", color: "#475569" }} onClick={() => s.trend.length > 1 && setExpanded((e) => e === s.fullname ? null : s.fullname)}>{s.class_code || "—"}</td>
                    <td style={{ padding: "12px 6px", color: "#475569" }} onClick={() => s.trend.length > 1 && setExpanded((e) => e === s.fullname ? null : s.fullname)}>{s.examCount}</td>
                    <td style={{ padding: "12px 6px", color: "#2563EB", fontSize: 12 }} onClick={() => s.trend.length > 1 && setExpanded((e) => e === s.fullname ? null : s.fullname)}>
                      {s.trend.length > 1 && (expanded === s.fullname ? "بستن روند ▲" : "روند نمرات ▼")}
                    </td>
                    <td style={{ padding: "12px 6px" }}>
                      <Trash2
                        size={16}
                        style={{ cursor: "pointer", color: "#F87171", opacity: deletingKey === s.ids.join(",") ? 0.4 : 1 }}
                        onClick={() => removeStudentRecord(s.ids)}
                      />
                    </td>
                  </tr>
                  {expanded === s.fullname && (
                    <tr>
                      <td colSpan={5} style={{ padding: "6px 6px 18px" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 110, background: "#F8FAFC", borderRadius: 10, padding: "14px 18px", overflowX: "auto" }}>
                          {s.trend.map((t) => (
                            <div key={t.examId} title={t.title} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 46 }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: "#1E293B" }}>{t.pct}%</div>
                              <div style={{ width: 22, borderRadius: "4px 4px 0 0", background: t.pct >= 50 ? "#16A34A" : "#DC2626", height: `${Math.max(4, t.pct * 0.6)}px` }} />
                              <div style={{ fontSize: 10, color: "#94A3B8", maxWidth: 60, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</div>
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
    </div>
  );
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
    if (!isStandalone) return;
    let cancelled = false;
    getJSON("settings:global").then((s) => { if (!cancelled) setAllowToSuperAdmin(s?.allow_admin_to_superadmin_messages !== false); });
    return () => { cancelled = true; };
  }, [isStandalone]);
  const superAdminThread = isStandalone
    ? messages.filter((m) => m.channel === "admin_superadmin" && m.teacher_id === teacher.username)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    : [];
  const unreadSaCount = superAdminThread.filter((m) => m.sender_role === "super_admin" && new Date(m.created_at) > new Date(teacher.sa_thread_last_read_at || 0)).length;
  useEffect(() => {
    if (!isStandalone || unreadSaCount === 0) return;
    const updated = { ...teacher, sa_thread_last_read_at: new Date().toISOString() };
    setJSON(`teacher:${teacher.username}`, updated).then(() => { onUpdateSelf && onUpdateSelf(updated); });
  }, [isStandalone, unreadSaCount]);
  const sendToSuperAdmin = async () => {
    if (!saThreadText.trim()) return;
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
    if (!text.trim()) return;
    if (targetType === "class" && !targetClassId) return;
    if (targetType === "student" && !targetStudentId) return;
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
    if (m.target_type === "all") return "همه‌ی دانش‌آموزان";
    if (m.target_type === "class") return `کلاس: ${classes.find((c) => c.id === m.target_id)?.name || "حذف‌شده"}`;
    return `دانش‌آموز: ${roster.find((r) => r.id === m.target_id)?.fullname || "حذف‌شده"}`;
  };

  const adminAnnouncements = messages.filter((m) => m.sender === "admin" && m.audience === "teachers")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
      <TopBar title="پیام‌ها" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />

      {isStandalone && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>پیام به مدیر سایت</div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 14 }}>گفتگوی مستقیم بین شما و مدیر سایت سامانه.</div>
          <div style={{
            maxHeight: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8,
            background: "#F8FAFC", borderRadius: 10, padding: superAdminThread.length ? 12 : 0, marginBottom: 14,
          }}>
            {superAdminThread.length === 0 ? (
              <div style={{ color: "#94A3B8", fontSize: 12.5, padding: 14, textAlign: "center" }}>هنوز پیامی رد و بدل نشده است.</div>
            ) : superAdminThread.map((m) => (
              <div key={m.id} style={{
                alignSelf: m.sender_role === "super_admin" ? "flex-start" : "flex-end",
                maxWidth: "80%", background: m.sender_role === "super_admin" ? "#EFF6FF" : "#F5F3FF",
                border: `1px solid ${m.sender_role === "super_admin" ? "#DBEAFE" : "#DDD6FE"}`,
                borderRadius: 10, padding: "8px 12px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: m.sender_role === "super_admin" ? "#2563EB" : "#7C3AED", marginBottom: 3 }}>
                  {m.sender_role === "super_admin" ? "🛡️ مدیر سایت" : m.sender_name || "شما"}
                </div>
                <div style={{ fontSize: 13, color: "#334155", whiteSpace: "pre-wrap" }}>{m.text}</div>
                <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 3 }}>{new Date(m.created_at).toLocaleString("fa-IR")}</div>
              </div>
            ))}
          </div>
          {allowToSuperAdmin ? (
            <div style={{ display: "flex", gap: 8 }}>
              <TextInput value={saThreadText} onChange={(e) => setSaThreadText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendToSuperAdmin(); }}
                placeholder="پیام خود را بنویسید..." style={{ flex: 1 }} />
              <Button onClick={sendToSuperAdmin} disabled={saThreadSending || !saThreadText.trim()}>
                {saThreadSending ? "..." : "ارسال"}
              </Button>
            </div>
          ) : (
            <div style={{ fontSize: 12.5, color: "#94A3B8", background: "#F8FAFC", borderRadius: 8, padding: "10px 12px" }}>
              مدیر سایت ارسال پیام به این بخش را موقتاً غیرفعال کرده است.
            </div>
          )}
        </div>
      )}

      {adminAnnouncements.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#1E293B", marginBottom: 10 }}>اعلانات مدیر مدرسه</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {adminAnnouncements.map((m) => (
              <div key={m.id} style={{ background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 13, color: "#4C1D95", whiteSpace: "pre-wrap", marginBottom: 4 }}>{m.text}</div>
                <div style={{ fontSize: 11, color: "#7C3AED" }}>{new Date(m.created_at).toLocaleString("fa-IR")}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>
        پیام‌هایی که اینجا می‌فرستی، در پرتال دانش‌آموزی (وقتی دانش‌آموز با کد خودش وارد می‌شود) نمایش داده می‌شوند.
      </div>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginBottom: 20 }}>
        <Field label="گیرنده">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { key: "all", label: "همه‌ی دانش‌آموزان" },
              { key: "class", label: "یک کلاس خاص" },
              { key: "student", label: "یک دانش‌آموز خاص" },
            ].map((opt) => (
              <div key={opt.key} onClick={() => setTargetType(opt.key)} style={{
                padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700,
                background: targetType === opt.key ? "#2563EB" : "#F1F5F9", color: targetType === opt.key ? "#fff" : "#475569",
              }}>{opt.label}</div>
            ))}
          </div>
        </Field>
        {targetType === "class" && (
          <Field label="انتخاب کلاس">
            <select value={targetClassId} onChange={(e) => setTargetClassId(e.target.value)} style={inputStyle}>
              <option value="">— انتخاب کن —</option>
              {myClasses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
        )}
        {targetType === "student" && (
          <Field label="انتخاب دانش‌آموز">
            <StudentPicker classes={myClasses} roster={myRoster} value={targetStudentId} onChange={setTargetStudentId} />
          </Field>
        )}
        <Field label="متن پیام">
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} placeholder="مثلاً: فردا امتحان فصل ۵ برگزار می‌شود." />
        </Field>
        <Button onClick={send} disabled={sending}><Plus size={16} />{sending ? "در حال ارسال..." : "ارسال پیام"}</Button>
      </div>

      <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>پیام‌های ارسال‌شده</div>
      {myMessages.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6" }}>
          <EmptyState text="هنوز پیامی نفرستاده‌ای." />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {myMessages.map((m) => (
            <div key={m.id} style={{ background: "#fff", border: "1px solid #EEF1F6", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div>
                <div style={{ fontSize: 13, color: "#334155", marginBottom: 6, whiteSpace: "pre-wrap" }}>{m.text}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Badge tone="blue">{describeTarget(m)}</Badge>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>{new Date(m.created_at).toLocaleString("fa-IR")}</span>
                </div>
              </div>
              <Trash2 size={16} style={{ cursor: "pointer", color: "#F87171", flexShrink: 0, opacity: deletingId === m.id ? 0.4 : 1 }} onClick={() => removeMessage(m.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
    if (!selectedClassId && myClasses.length > 0) setSelectedClassId(myClasses[0].id);
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
    if (!selectedClassId) return;
    if (unreadCountFor(selectedClassId) === 0) return;
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
    if (!text.trim() || !selectedClassId) return;
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
    if (!selectedClassId || !selectedClass) return;
    const next = effectiveMode === "open" ? "channel" : "open";
    setLocalModeOverride((prev) => ({ ...prev, [selectedClassId]: next }));
    await setJSON(`class:${selectedClassId}`, { ...selectedClass, chat_mode: next });
    await refresh();
  };

  const setStudentOverride = async (rosterId, mode) => {
    if (!selectedClassId || !selectedClass) return;
    const overrides = { ...(localStudentOverride[selectedClassId] || selectedClass.chat_overrides || {}) };
    if (mode) overrides[rosterId] = mode; else delete overrides[rosterId];
    setLocalStudentOverride((prev) => ({ ...prev, [selectedClassId]: overrides }));
    await setJSON(`class:${selectedClassId}`, { ...selectedClass, chat_overrides: overrides });
    await refresh();
  };

  const effectiveStudentOverrides = selectedClassId
    ? (localStudentOverride[selectedClassId] || (selectedClass && selectedClass.chat_overrides) || {})
    : {};

  return (
    <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
      <TopBar title="چت با دانش‌آموزان" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />

      {myClasses.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6" }}>
          <EmptyState text="هنوز کلاسی نساخته‌ای." />
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", display: "flex", minHeight: 480, overflow: "hidden" }}>
          <div style={{ width: 220, borderLeft: "1px solid #EEF1F6", overflowY: "auto", flexShrink: 0 }}>
            {myClasses.map((c) => {
              const unread = unreadCountFor(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedClassId(c.id)}
                  style={{
                    padding: "13px 16px", cursor: "pointer", borderBottom: "1px solid #F5F7FA",
                    background: selectedClassId === c.id ? "#EFF6FF" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                  }}
                >
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1E293B" }}>{c.name}</span>
                  {unread > 0 && (
                    <span style={{
                      flexShrink: 0, background: "#EF4444", color: "#fff", fontSize: 10.5, fontWeight: 800,
                      borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{unread}</span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 18, minWidth: 0 }}>
            {!selectedClass ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", fontSize: 13.5 }}>
                یک کلاس را از فهرست انتخاب کنید.
              </div>
            ) : (
              <React.Fragment>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #F5F7FA", flexWrap: "wrap", gap: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B" }}>{selectedClass.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span onClick={() => setShowOverrides((v) => !v)} style={{ fontSize: 12, color: "#2563EB", fontWeight: 700, cursor: "pointer" }}>
                      تنظیم جداگانه‌ی دانش‌آموزان
                    </span>
                    <div onClick={toggleClassMode} style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 999, cursor: "pointer",
                      background: effectiveMode === "open" ? "#DCFCE7" : "#FEF3C7", color: effectiveMode === "open" ? "#15803D" : "#B45309",
                      fontSize: 12.5, fontWeight: 700,
                    }}>
                      {effectiveMode === "open" ? <MessageCircle size={14} /> : <Megaphone size={14} />}
                      {effectiveMode === "open" ? "چت دوطرفه (باز)" : "کانال اطلاع‌رسانی (یک‌طرفه)"}
                    </div>
                  </div>
                </div>

                {showOverrides && (
                  <div style={{ background: "#F8FAFC", border: "1px solid #EEF1F6", borderRadius: 12, padding: 14, marginBottom: 14 }}>
                    <div style={{ fontSize: 12, color: "#64748B", marginBottom: 10 }}>
                      برای هر دانش‌آموز می‌توانی جدا از حالت کلی کلاس تصمیم بگیری — مثلاً کلاس باز باشد ولی یک دانش‌آموز خاص مسدود شود، یا برعکس.
                    </div>
                    {classRoster.length === 0 ? (
                      <div style={{ fontSize: 12.5, color: "#94A3B8" }}>این کلاس هنوز دانش‌آموزی ندارد.</div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {classRoster.map((r) => {
                          const ov = effectiveStudentOverrides[r.id] || "";
                          return (
                            <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                              <span style={{ fontSize: 13, color: "#334155" }}>{r.fullname}</span>
                              <select value={ov} onChange={(e) => setStudentOverride(r.id, e.target.value || null)} style={{ ...inputStyle, width: 170, padding: "6px 10px", fontSize: 12.5 }}>
                                <option value="">پیروی از کلاس ({effectiveMode === "open" ? "باز" : "کانال"})</option>
                                <option value="open">همیشه باز برای این نفر</option>
                                <option value="channel">همیشه مسدود برای این نفر</option>
                              </select>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                  {thread.length === 0 ? (
                    <div style={{ color: "#94A3B8", fontSize: 12.5, padding: 14, textAlign: "center" }}>هنوز پیامی در این کلاس رد و بدل نشده است.</div>
                  ) : thread.map((m) => (
                    <div key={m.id} style={{
                      alignSelf: m.sender_role === "teacher" ? "flex-end" : "flex-start",
                      maxWidth: "75%", background: m.sender_role === "teacher" ? "#EFF6FF" : "#F1F5F9",
                      border: `1px solid ${m.sender_role === "teacher" ? "#DBEAFE" : "#E2E8F0"}`,
                      borderRadius: 10, padding: "8px 12px",
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: m.sender_role === "teacher" ? "#2563EB" : "#334155", marginBottom: 3 }}>
                        {m.sender_role === "teacher" ? "شما" : (m.sender_name || "دانش‌آموز")}
                      </div>
                      <div style={{ fontSize: 13, color: "#334155", whiteSpace: "pre-wrap" }}>{m.text}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                        <span style={{ fontSize: 10.5, color: "#94A3B8" }}>{new Date(m.created_at).toLocaleString("fa-IR")}</span>
                        {m.sender_role === "teacher" && (
                          <span style={{ fontSize: 10.5, color: "#94A3B8" }}>
                            دیده‌شده توسط {(m.seen_by || []).length} از {classRoster.length} نفر
                          </span>
                        )}
                        {m.reactions && Object.keys(m.reactions).length > 0 && (
                          <span style={{ fontSize: 12 }}>{Object.values(m.reactions).join(" ")}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <TextInput value={text} onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                    placeholder="پیام خود را بنویس..." style={{ flex: 1 }} />
                  <Button onClick={send} disabled={sending || !text.trim()}>{sending ? "..." : "ارسال"}</Button>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
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
    if (!schoolCode || !code) return;
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
      } else {
        setActiveRoster(null);
        setNotFound(true);
      }
    } catch {
      setActiveRoster(null);
      setNotFound(true);
    }
    setLoading(false);
  };

  if (!activeRoster) {
    return (
      <div style={{ flex: 1.15, padding: "44px 40px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>پرتال دانش‌آموزی</div>
        <div style={{ fontSize: 13, color: "#64748B", marginBottom: 26 }}>دو کدی که معلمت به تو داده را وارد کن تا نمرات و پیام‌های خودت را ببینی.</div>
        <Field label="کد مدرسه">
          <TextInput
            value={schoolCodeInput}
            onChange={(e) => setSchoolCodeInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && lookup()}
            placeholder="کد مدرسه یا معلم"
            style={{ fontSize: 18, letterSpacing: 3, textAlign: "center", fontWeight: 700 }}
            maxLength={10}
          />
        </Field>
        <Field label="کد شخصی">
          <TextInput
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && lookup()}
            placeholder="کد خود را وارد کن"
            style={{ fontSize: 18, letterSpacing: 3, textAlign: "center", fontWeight: 700 }}
            maxLength={6}
          />
        </Field>
        {notFound && <div style={{ color: "#DC2626", fontSize: 13, marginBottom: 14 }}>کد پیدا نشد. از معلم خود بپرس.</div>}
        <Button type="button" onClick={lookup} disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }}>{loading ? "در حال جستجو..." : "ورود"}</Button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1.15, padding: "44px 40px", maxHeight: "80vh", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#1E293B" }}>{activeRoster.fullname}</div>
          <div style={{ fontSize: 13, color: "#64748B" }}>کلاس: {className}</div>
        </div>
        <span onClick={() => { setActiveRoster(null); setCodeInput(""); setSchoolCodeInput(""); }} style={{ fontSize: 12, color: "#2563EB", fontWeight: 700, cursor: "pointer" }}>خروج</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, borderBottom: "1px solid #EEF1F6" }}>
        {[
          { key: "results", label: "نمرات" },
          { key: "messages", label: "پیام‌ها" },
          { key: "chat", label: "💬 گفتگو با معلم" },
        ].map((t) => (
          <div key={t.key} onClick={() => setTab(t.key)} style={{
            padding: "8px 4px", marginBottom: -1, cursor: "pointer", fontSize: 13.5, fontWeight: 700,
            color: tab === t.key ? "#2563EB" : "#94A3B8",
            borderBottom: tab === t.key ? "2px solid #2563EB" : "2px solid transparent",
          }}>{t.label}</div>
        ))}
      </div>

      {tab === "results" && (
        results.length === 0 ? (
          <div style={{ fontSize: 13, color: "#94A3B8" }}>هنوز در آزمونی شرکت نکرده‌ای.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {results.map((r) => (
              <div key={r.examId} style={{ border: "1px solid #EEF1F6", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: "#94A3B8" }}>{r.date ? new Date(r.date).toLocaleDateString("fa-IR") : "—"}</div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: r.pct >= 50 ? "#16A34A" : "#DC2626" }}>{r.pct}%</div>
                  {r.pendingCount > 0 && <div style={{ fontSize: 10, color: "#D97706" }}>در انتظار تصحیح</div>}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "messages" && (
        myMessages.length === 0 ? (
          <div style={{ fontSize: 13, color: "#94A3B8" }}>پیامی برای تو ثبت نشده.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {myMessages.map((m) => (
              <div key={m.id} style={{ background: "#F8FAFC", borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: m.sender === "admin" ? "#7C3AED" : "#2563EB", marginBottom: 4 }}>
                  {m.sender === "admin" ? "🏫 مدیر مدرسه" : teacherName}
                </div>
                <div style={{ fontSize: 13, color: "#334155", whiteSpace: "pre-wrap", marginBottom: 4 }}>{m.text}</div>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>{new Date(m.created_at).toLocaleString("fa-IR")}</div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "chat" && (
        <StudentClassChat schoolCode={schoolCodeInput} code={codeInput} teacherName={teacherName} myRosterId={activeRoster.id} myName={activeRoster.fullname} />
      )}
    </div>
  );
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
    } catch { /* اتصال موقتاً قطع بود — دور بعدی دوباره تلاش می‌شود */ }
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
    if (!text.trim()) return;
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
      } else {
        setText("");
        if (data.message) setMsgs((prev) => [...prev, data.message]); // فوری نشون بده، منتظر دور بعدی poll نمون
      }
      await load();
    } catch {
      setError("اتصال برقرار نشد");
    }
    setSending(false);
  };

  const react = async (messageId, emoji) => {
    setMsgs((prev) => prev.map((m) => {
      if (m.id !== messageId) return m;
      const reactions = { ...(m.reactions || {}) };
      if (reactions[myRosterId] === emoji) delete reactions[myRosterId]; else reactions[myRosterId] = emoji;
      return { ...m, reactions };
    }));
    try {
      await fetch("/api/student-chat-react", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolCode, code, messageId, emoji }),
      });
      await load();
    } catch { /* بی‌خطر — دفعه‌ی بعدی sync دوباره امتحان می‌شود */ }
  };

  const REACTION_SET = ["👍", "❤️", "😂", "😮", "😢"];

  if (!allowed) {
    return (
      <div style={{ border: "1px solid #EEF1F6", borderRadius: 12, padding: 24, textAlign: "center", color: "#94A3B8", fontSize: 13 }}>
        این قابلیت برای این کلاس فعال نیست.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 440, border: "1px solid #EEF1F6", borderRadius: 12, overflow: "hidden" }}>
      {mode !== "open" && (
        <div style={{ background: "#FEF3C7", color: "#B45309", fontSize: 12, fontWeight: 700, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
          <Megaphone size={14} /> این چت الان فقط اطلاع‌رسانیه — معلم هنوز اجازه نداده جواب بدی، ولی می‌تونی واکنش نشون بدی.
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 8, background: "#F8FAFC" }}>
        {msgs.length === 0 ? (
          <div style={{ color: "#94A3B8", fontSize: 12.5, textAlign: "center", marginTop: 20 }}>هنوز گفتگویی شروع نشده. سلام کن!</div>
        ) : msgs.map((m) => {
          const isMine = m.sender_role === "student" && m.sender_roster_id === myRosterId;
          const myReaction = (m.reactions || {})[myRosterId] || "";
          return (
            <div key={m.id} style={{
              alignSelf: isMine ? "flex-end" : "flex-start", maxWidth: "78%",
              background: isMine ? "#DBEAFE" : "#fff", border: `1px solid ${isMine ? "#BFDBFE" : "#EEF1F6"}`,
              borderRadius: 10, padding: "8px 12px",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: isMine ? "#1D4ED8" : "#334155", marginBottom: 3 }}>
                {m.sender_role === "teacher" ? teacherName : isMine ? "تو" : (m.sender_name || "دانش‌آموز")}
              </div>
              <div style={{ fontSize: 13, color: "#334155", whiteSpace: "pre-wrap" }}>{m.text}</div>
              {m.sender_role === "teacher" && (
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  {REACTION_SET.map((e) => (
                    <span key={e} onClick={() => react(m.id, e)} style={{
                      cursor: "pointer", fontSize: 13, padding: "1px 4px", borderRadius: 6,
                      background: myReaction === e ? "#FDE68A" : "transparent",
                    }}>{e}</span>
                  ))}
                </div>
              )}
              <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 3 }}>{new Date(m.created_at).toLocaleString("fa-IR")}</div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      {mode === "open" ? (
        <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #EEF1F6", background: "#fff" }}>
          <TextInput value={text} onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="پیامت را بنویس..." style={{ flex: 1 }} />
          <Button onClick={send} disabled={sending || !text.trim()}>{sending ? "..." : "ارسال"}</Button>
        </div>
      ) : null}
      {error && <div style={{ color: "#DC2626", fontSize: 12, padding: "0 14px 10px" }}>{error}</div>}
    </div>
  );
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
    if (!file) return;
    if (!file.type.startsWith("image/")) { setAvatarError("فقط فایل تصویر مجاز است."); return; }
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
      } else {
        setAvatarUpdatedAt(data.updated_at);
        onUpdate({ ...teacher, avatar_updated_at: data.updated_at });
      }
    } catch {
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
      } else {
        setAvatarError("حذف عکس ناموفق بود");
      }
    } catch {
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

  const [finishMessages, setFinishMessages] = useState(
    (teacher.finish_messages && teacher.finish_messages.length > 0) ? teacher.finish_messages : DEFAULT_FINISH_MESSAGES
  );
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
    setPwError(""); setPwSaved(false);
    if (!curPw || !newPw || !newPw2) { setPwError("همه فیلدها را پر کنید."); return; }
    if (newPw.length < 8) { setPwError("رمز عبور جدید باید حداقل ۸ کاراکتر باشد."); return; }
    if (newPw !== newPw2) { setPwError("رمز عبور جدید و تکرار آن یکسان نیستند."); return; }
    // رمز فعلی سمت سرور چک می‌شه (نه محلی) چون سرور از الان رمز رو نمکی‌شده
    // نگه می‌داره و دیگه قابل مقایسه‌ی مستقیم سمت کلاینت نیست.
    const curCheck = await fetch("/api/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: teacher.username, passwordHash: await hashPassword(curPw) }),
    }).then((r) => r.json()).catch(() => ({ ok: false }));
    if (!curCheck.ok) { setPwError("رمز عبور فعلی اشتباه است."); return; }
    await setJSON(`teacher:${teacher.username}`, { ...teacher, password: await hashPassword(newPw) });
    const fresh = await getJSON(`teacher:${teacher.username}`);
    saveSession(fresh.username, fresh.password, getAuthToken());
    onUpdate(fresh);
    setCurPw(""); setNewPw(""); setNewPw2("");
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
      if (ans) data[`answers:${s.id}`] = ans;
    }

    downloadTextFile("edu-exam-backup.json", JSON.stringify(data, null, 2), "application/json");
  };

  const importBackup = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
    } catch {
      setImportMsg("فایل نامعتبر است.");
    }
    e.target.value = "";
  };

  const [loginCodeBusy, setLoginCodeBusy] = useState(false);
  const regenerateLoginCode = async () => {
    if (!window.confirm("کد ورود فعلی از کار می‌افتد و باید کد جدید به دانش‌آموزهایت اطلاع داده شود. ادامه می‌دهید؟")) return;
    setLoginCodeBusy(true);
    const { login_code, ...rest } = teacher;
    const result = await setJSONReturn(`teacher:${teacher.username}`, rest);
    if (result.ok && result.v) onUpdate(result.v);
    setLoginCodeBusy(false);
  };

  return (
    <div style={{ flex: 1, padding: "30px 34px" }}>
      <TopBar title="تنظیمات" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
        <Avatar username={teacher.username} name={teacher.fullname} updatedAt={avatarUpdatedAt} size={64} />
        <div>
          <label style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
            fontSize: 13, fontWeight: 700, cursor: avatarBusy ? "default" : "pointer", background: "#fff", color: "#334155",
            border: "1.5px solid #E2E8F0", opacity: avatarBusy ? 0.6 : 1, marginLeft: 8,
          }}>
            {avatarBusy ? "در حال آپلود..." : "تغییر عکس پروفایل"}
            <input type="file" accept="image/*" onChange={uploadAvatar} disabled={avatarBusy} style={{ display: "none" }} />
          </label>
          {avatarUpdatedAt && (
            <Button variant="ghost" onClick={removeAvatar} disabled={avatarBusy} style={{ fontSize: 13, padding: "8px 12px" }}>حذف عکس</Button>
          )}
          {avatarError && <div style={{ color: "#DC2626", fontSize: 12.5, marginTop: 6 }}>{avatarError}</div>}
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20 }}>
        <Field label="نام کاربری">
          <TextInput value={teacher.username} disabled style={{ background: "#F8FAFC", color: "#94A3B8" }} />
        </Field>
        <Field label="نام و نام‌خانوادگی">
          <TextInput value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </Field>
        <Field label="ایمیل (برای بازیابی رمز عبور)">
          <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل" />
        </Field>
        <Button onClick={save}><Check size={16} />ذخیره تغییرات</Button>
        {saved && <div style={{ color: "#16A34A", fontSize: 13, marginTop: 10 }}>ذخیره شد.</div>}
      </div>

      {!teacher.school_id && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>کد ورود دانش‌آموزان</div>
          <div style={{ fontSize: 12, color: "#64748B", marginBottom: 16 }}>
            دانش‌آموزهایت برای ورود به پرتال یا چت کلاسی، این کد را همراه با کد شخصی خودشان وارد می‌کنند.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 800, color: "#2563EB", letterSpacing: 3, background: "#EFF6FF", padding: "8px 16px", borderRadius: 10 }}>
              {teacher.login_code || "—"}
            </span>
            <span onClick={loginCodeBusy ? undefined : regenerateLoginCode} style={{ fontSize: 12, color: loginCodeBusy ? "#94A3B8" : "#DC2626", fontWeight: 700, cursor: loginCodeBusy ? "default" : "pointer" }}>
              {loginCodeBusy ? "در حال ساخت..." : "کد جدید"}
            </span>
          </div>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 16 }}>تغییر رمز عبور</div>
        <Field label="رمز عبور فعلی">
          <TextInput type="password" value={curPw} onChange={(e) => setCurPw(e.target.value)} placeholder="رمز عبور فعلی" />
        </Field>
        <Field label="رمز عبور جدید">
          <TextInput type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="رمز عبور جدید" />
        </Field>
        <Field label="تکرار رمز عبور جدید">
          <TextInput type="password" value={newPw2} onChange={(e) => setNewPw2(e.target.value)} placeholder="تکرار رمز عبور جدید" />
        </Field>
        {pwError && <div style={{ color: "#DC2626", fontSize: 13, marginBottom: 10 }}>{pwError}</div>}
        <Button onClick={changePassword}><Check size={16} />تغییر رمز عبور</Button>
        {pwSaved && <div style={{ color: "#16A34A", fontSize: 13, marginTop: 10 }}>رمز عبور با موفقیت تغییر کرد.</div>}
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>پیام‌های پایان آزمون</div>
        <div style={{ fontSize: 12, color: "#64748B", marginBottom: 16 }}>
          بعد از ثبت آزمون توسط دانش‌آموز، یکی از این پیام‌ها به‌صورت تصادفی نمایش داده می‌شود.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
          {finishMessages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <TextInput value={m} onChange={(e) => updateMessageAt(i, e.target.value)} placeholder="مثلاً: موفق باشی!" style={{ flex: 1 }} />
              <div onClick={() => removeMessage(i)} style={{ cursor: "pointer", color: "#DC2626", fontSize: 20, padding: "0 6px", lineHeight: 1 }}>×</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button variant="ghost" onClick={addMessage}><Plus size={15} />افزودن پیام</Button>
          <Button onClick={saveMessages}><Check size={16} />ذخیره پیام‌ها</Button>
        </div>
        {msgSaved && <div style={{ color: "#16A34A", fontSize: 13, marginTop: 10 }}>ذخیره شد.</div>}
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, maxWidth: 420 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>پشتیبان‌گیری از داده‌ها</div>
        <div style={{ fontSize: 12, color: "#64748B", marginBottom: 16 }}>
          یک نسخه پشتیبان از آزمون‌ها، سوالات و نتایج خودت (نه کل مدرسه) می‌گیره.
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button variant="ghost" onClick={exportBackup}><Download size={15} />دانلود فایل پشتیبان</Button>
          <label style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10,
            fontSize: 14, fontWeight: 700, cursor: "pointer", background: "#fff", color: "#334155", border: "1.5px solid #E2E8F0",
          }}>
            بازیابی از فایل
            <input type="file" accept="application/json" onChange={importBackup} style={{ display: "none" }} />
          </label>
        </div>
        {importMsg && <div style={{ fontSize: 13, color: "#2563EB", marginTop: 10 }}>{importMsg}</div>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   ROOT APP
--------------------------------------------------------- */
