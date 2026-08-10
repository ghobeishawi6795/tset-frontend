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
    if (!fullname || !username || !password || !email) { setError("همه فیلدها را پر کنید."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("ایمیل معتبر نیست."); return; }
    if (password.length < 8) { setError("رمز عبور باید حداقل ۸ کاراکتر باشد."); return; }
    if (existingUsernames.includes(username.trim())) { setError("این نام کاربری قبلاً استفاده شده است."); return; }
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
  const handleKeyDown = (e) => { if (e.key === "Enter") submit(); };

  return (
    <div>
      <Field label="نام و نام‌خانوادگی معلم">
        <TextInput value={fullname} onChange={(e) => setFullname(e.target.value)} onKeyDown={handleKeyDown} placeholder="مثلاً: زهرا احمدی" />
      </Field>
      <Field label="نام کاربری">
        <TextInput value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} placeholder="یک نام کاربری یکتا" />
      </Field>
      <Field label="رمز عبور اولیه">
        <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} placeholder="رمز عبور" />
      </Field>
      <Field label="ایمیل">
        <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} placeholder="برای بازیابی رمز عبور معلم استفاده می‌شود" />
      </Field>
      {error && <div style={{ color: "#DC2626", fontSize: 13, marginBottom: 14 }}>{error}</div>}
      <Button type="button" onClick={submit} style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }} disabled={loading}>
        {loading ? "در حال ساخت..." : "ساخت حساب معلم"}
      </Button>
    </div>
  );
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
    setError(""); setSaved(false);
    if (!fullname || !email) { setError("نام و ایمیل نباید خالی باشند."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("ایمیل معتبر نیست."); return; }
    if (newPassword && newPassword.length < 8) { setError("رمز عبور جدید باید حداقل ۸ کاراکتر باشد."); return; }
    setLoading(true);
    const updated = { ...teacher, fullname: fullname.trim(), email: email.trim(), active };
    if (newPassword) updated.password = await hashPassword(newPassword);
    await setJSON(`teacher:${teacher.username}`, updated);
    setLoading(false);
    setNewPassword("");
    setSaved(true);
    onSaved(updated);
  };
  const handleKeyDown = (e) => { if (e.key === "Enter") submit(); };

  return (
    <div>
      <Field label="نام کاربری">
        <TextInput value={teacher.username} disabled style={{ background: "#F8FAFC", color: "#94A3B8" }} />
      </Field>
      <Field label="نام و نام‌خانوادگی">
        <TextInput value={fullname} onChange={(e) => setFullname(e.target.value)} onKeyDown={handleKeyDown} />
      </Field>
      <Field label="ایمیل">
        <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} />
      </Field>
      <Field label="رمز عبور جدید (اختیاری)">
        <TextInput type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} onKeyDown={handleKeyDown} placeholder="برای تغییر ندادن، خالی بگذارید" />
      </Field>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <input type="checkbox" id="teacher-active-toggle" checked={active} onChange={(e) => setActive(e.target.checked)} style={{ width: 16, height: 16 }} />
        <label htmlFor="teacher-active-toggle" style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.7 }}>
          حساب فعال است — اگه غیرفعال بشه، این معلم دیگه نمی‌تونه وارد بشه (کلاس‌ها، آزمون‌ها و نتایجش دست‌نخورده می‌مونه)
        </label>
      </div>
      {error && <div style={{ color: "#DC2626", fontSize: 13, marginBottom: 14 }}>{error}</div>}
      {saved && <div style={{ color: "#16A34A", fontSize: 13, marginBottom: 14 }}>تغییرات ذخیره شد.</div>}
      <Button type="button" onClick={submit} style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }} disabled={loading}>
        {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </Button>
    </div>
  );
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
        const updated = { ...teacher, avatar_updated_at: data.updated_at };
        onSaved(updated);
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
        onSaved(updated);
      } else {
        setAvatarError("حذف عکس ناموفق بود");
      }
    } catch {
      setAvatarError("اتصال برقرار نشد");
    }
    setAvatarBusy(false);
  };

  const saveProfile = async () => {
    setError(""); setSaved(false);
    if (!fullname || !email) { setError("نام و ایمیل نباید خالی باشند."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("ایمیل معتبر نیست."); return; }
    setLoading(true);
    const updated = { ...teacher, fullname: fullname.trim(), email: email.trim() };
    await setJSON(`teacher:${teacher.username}`, updated);
    setLoading(false);
    setSaved(true);
    onSaved(updated);
  };

  const changePassword = async () => {
    setPwError(""); setPwSaved(false);
    if (!curPw || !newPw || !newPw2) { setPwError("همه فیلدها را پر کنید."); return; }
    if (newPw.length < 8) { setPwError("رمز عبور جدید باید حداقل ۸ کاراکتر باشد."); return; }
    if (newPw !== newPw2) { setPwError("رمز عبور جدید و تکرار آن یکسان نیستند."); return; }
    setPwLoading(true);
    // رمز فعلی سمت سرور چک می‌شه (نه محلی) چون سرور از الان رمز رو نمکی‌شده
    // نگه می‌داره و دیگه قابل مقایسه‌ی مستقیم سمت کلاینت نیست.
    const curCheck = await fetch("/api/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: teacher.username, passwordHash: await hashPassword(curPw) }),
    }).then((r) => r.json()).catch(() => ({ ok: false }));
    if (!curCheck.ok) { setPwLoading(false); setPwError("رمز عبور فعلی اشتباه است."); return; }
    await setJSON(`teacher:${teacher.username}`, { ...teacher, password: await hashPassword(newPw) });
    const fresh = await getJSON(`teacher:${teacher.username}`);
    saveSession(fresh.username, fresh.password, getAuthToken());
    setPwLoading(false);
    setCurPw(""); setNewPw(""); setNewPw2("");
    setPwSaved(true);
    onSaved(fresh);
  };

  return (
    <Modal title="تنظیمات حساب مدیر" onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
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

      <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>اطلاعات حساب</div>
      <Field label="نام کاربری">
        <TextInput value={teacher.username} disabled style={{ background: "#F8FAFC", color: "#94A3B8" }} />
      </Field>
      <Field label="نام و نام‌خانوادگی">
        <TextInput value={fullname} onChange={(e) => setFullname(e.target.value)} />
      </Field>
      <Field label="ایمیل">
        <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      {error && <div style={{ color: "#DC2626", fontSize: 13, marginBottom: 14 }}>{error}</div>}
      {saved && <div style={{ color: "#16A34A", fontSize: 13, marginBottom: 14 }}>ذخیره شد.</div>}
      <Button type="button" onClick={saveProfile} style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15, marginBottom: 22 }} disabled={loading}>
        {loading ? "در حال ذخیره..." : "ذخیره اطلاعات"}
      </Button>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18 }}>
        <div
          onClick={() => setShowPwSection((v) => !v)}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: showPwSection ? 12 : 0 }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B" }}>تغییر رمز عبور</div>
          <span style={{ fontSize: 12.5, color: "#2563EB", fontWeight: 700 }}>{showPwSection ? "بستن" : "تغییر"}</span>
        </div>
        {showPwSection && (
          <React.Fragment>
            <Field label="رمز عبور فعلی">
              <TextInput type="password" value={curPw} onChange={(e) => setCurPw(e.target.value)} />
            </Field>
            <Field label="رمز عبور جدید">
              <TextInput type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
            </Field>
            <Field label="تکرار رمز عبور جدید">
              <TextInput type="password" value={newPw2} onChange={(e) => setNewPw2(e.target.value)} />
            </Field>
            {pwError && <div style={{ color: "#DC2626", fontSize: 13, marginBottom: 14 }}>{pwError}</div>}
            {pwSaved && <div style={{ color: "#16A34A", fontSize: 13, marginBottom: 14 }}>رمز عبور تغییر کرد.</div>}
            <Button type="button" onClick={changePassword} style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }} disabled={pwLoading}>
              {pwLoading ? "در حال ذخیره..." : "تغییر رمز عبور"}
            </Button>
          </React.Fragment>
        )}
      </div>
    </Modal>
  );
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
    if (!editName.trim() || editName.trim() === m.fullname) { cancelEditMember(); return; }
    setSavingEdit(true);
    const updated = { ...m, fullname: editName.trim() };
    updateLocalRoster && updateLocalRoster(updated);
    await setJSON(`roster:${m.id}`, updated);
    setSavingEdit(false);
    cancelEditMember();
  };

  const addStudent = async () => {
    if (!name.trim()) return;
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
        id, class_id: cls.id, teacher_id: classTeacherIds(cls)[0] || null, school_id: schoolId,
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
    if (added > 0) setBulkText("");
  };

  // آپلود فایل اکسل: فقط ستون اول شیت اول رو می‌خونه (اسم دانش‌آموز)،
  // ردیف اول رو اگه شبیه هدر بود (مثلاً «نام») نادیده می‌گیره، و بقیه رو
  // توی همون textarea گروهی می‌ریزه تا معلم قبل از ثبت نهایی مرورش کنه.
  const [excelMsg, setExcelMsg] = useState("");
  const handleExcelFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setExcelMsg("در حال خواندن فایل...");
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const firstSheet = wb.Sheets[wb.SheetNames[0]];
      const grid = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      let names = grid.map((row) => String(row[0] ?? "").trim()).filter(Boolean);
      if (names.length && /^(نام|name|fullname|نام دانش.آموز)$/i.test(names[0])) names = names.slice(1);
      if (names.length === 0) { setExcelMsg("هیچ نامی توی فایل پیدا نشد."); return; }
      setBulkText((prev) => (prev.trim() ? prev.trim() + "\n" + names.join("\n") : names.join("\n")));
      setExcelMsg(`${names.length} نام از فایل خونده شد — قبل از «افزودن همه» مرورشون کن.`);
    } catch (err) {
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
    if (!window.confirm(`«${member.fullname}» از این کلاس حذف شود؟`)) return;
    removeLocalRoster && removeLocalRoster(member.id);
    await deleteKey(`roster:${member.id}`);
  };

  return (
    <Modal title={`دانش‌آموزان — ${cls.name}`} onClose={onClose}>
      {groupLoginCode && (
        <div style={{ background: "#EFF6FF", borderRadius: 10, border: "1px solid #BFDBFE", padding: "10px 12px", marginBottom: 14, fontSize: 12, color: "#1E3A8A", display: "flex", alignItems: "center", gap: 8 }}>
          کد مدرسه (برای ورود دانش‌آموزها):
          <span style={{ fontFamily: "monospace", fontWeight: 800, letterSpacing: 2 }}>{groupLoginCode}</span>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B" }}>افزودن دانش‌آموز</div>
        <span onClick={() => setShowBulk((s) => !s)} style={{ fontSize: 12, color: "#2563EB", fontWeight: 700, cursor: "pointer" }}>
          {showBulk ? "افزودن تکی" : "افزودن گروهی"}
        </span>
      </div>
      {showBulk ? (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: "#64748B", marginBottom: 10, lineHeight: 1.8 }}>
            اسم هر دانش‌آموز را در یک خط جدا بنویسید (یا با ویرگول جدا کنید)، یا از فایل اکسل بارگذاری کنید.
          </div>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#2563EB", fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>
            <Upload size={14} />بارگذاری نام‌ها از فایل اکسل (.xlsx / .csv)
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleExcelFile} style={{ display: "none" }} />
          </label>
          {excelMsg && <div style={{ fontSize: 12, color: "#64748B", marginBottom: 10 }}>{excelMsg}</div>}
          <textarea value={bulkText} onChange={(e) => setBulkText(e.target.value)} rows={6}
            placeholder={"علی رضایی\nمریم احمدی\n..."}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", marginBottom: 10 }} />
          {bulkMsg && <div style={{ fontSize: 12, color: "#2563EB", marginBottom: 10 }}>{bulkMsg}</div>}
          <Button type="button" onClick={addBulkStudents} disabled={bulkSaving} style={{ width: "100%", justifyContent: "center" }}>
            <Plus size={16} />{bulkSaving ? "در حال افزودن..." : "افزودن همه"}
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="نام دانش‌آموز" onKeyDown={(e) => e.key === "Enter" && addStudent()} />
          <Button type="button" onClick={addStudent} disabled={saving}><Plus size={16} />{saving ? "..." : "افزودن"}</Button>
        </div>
      )}

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 14, maxHeight: 320, overflowY: "auto" }}>
        {members.length === 0 ? (
          <div style={{ fontSize: 13, color: "#94A3B8", textAlign: "center", padding: "16px 0" }}>هنوز دانش‌آموزی اضافه نشده است.</div>
        ) : (
          members.map((m) => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 4px", borderBottom: "1px solid #F5F7FA", gap: 8 }}>
              {editingMemberId === m.id ? (
                <div style={{ display: "flex", gap: 6, flex: 1 }}>
                  <TextInput
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveEditMember(m); if (e.key === "Escape") cancelEditMember(); }}
                    style={{ fontSize: 13, padding: "7px 10px" }}
                  />
                  <Button type="button" style={{ fontSize: 12, padding: "7px 10px" }} onClick={() => saveEditMember(m)} disabled={savingEdit}>ذخیره</Button>
                  <Button type="button" variant="ghost" style={{ fontSize: 12, padding: "7px 10px" }} onClick={cancelEditMember}>انصراف</Button>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E293B" }}>{m.fullname}</div>
                  <span onClick={() => startEditMember(m)} style={{ display: "flex", cursor: "pointer", color: "#94A3B8", padding: 3 }} title="ویرایش نام">
                    <Edit2 size={13} />
                  </span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 800, color: "#2563EB", letterSpacing: 1 }}>{m.code}</span>
                <span onClick={() => regenerateCodeFor(m)} style={{ fontSize: 11.5, color: "#64748B", cursor: "pointer" }}>کد جدید</span>
                <div onClick={() => removeStudent(m)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7, background: "#FEF2F2", cursor: "pointer" }}>
                  <Trash2 size={14} color="#DC2626" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}

function CreateClassForm({ onCreate, error }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const ok = await onCreate(name);
    setSaving(false);
    if (ok) setName("");
  };
  return (
    <div>
      <Field label="نام کلاس">
        <TextInput value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="مثلاً: هفتم الف" />
      </Field>
      {error && <div style={{ color: "#DC2626", fontSize: 12.5, marginBottom: 10 }}>{error}</div>}
      <Button type="button" onClick={submit} style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }} disabled={saving}>
        {saving ? "در حال ساخت..." : "ساخت کلاس"}
      </Button>
    </div>
  );
}

function AdminSidebar({ active, onNavigate, onSettings, onHelp, onLogout, adminName, brandColor, logoUrl, badges }) {
  const accent = brandColor || "#2563EB";
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
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>پنل مدیریت</span>
          </div>
          {isMobile && <X size={20} color="#AAB8D1" style={{ cursor: "pointer" }} onClick={() => setMobileOpen(false)} />}
        </div>
        <div style={{ padding: "14px 12px", flex: 1 }}>
          {items.map((it, i) => {
            const isActive = active === it.key;
            const IconCmp = it.icon;
            const badgeCount = badges && badges[it.key];
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
                    fontSize: 14, fontWeight: 600,
                  }}
                >
                  <IconCmp size={17} />
                  {it.label}
                  {badgeCount > 0 && (
                    <span style={{
                      marginRight: "auto", background: "#EF4444", color: "#fff", fontSize: 10.5, fontWeight: 800,
                      borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {badgeCount}
                    </span>
                  )}
                </div>
              </React.Fragment>
            );
          })}
          <SidebarDivider />
          <div
            className="sidebar-item"
            onClick={() => { onSettings(); setMobileOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", marginBottom: 4, color: "#AAB8D1", fontSize: 14, fontWeight: 600 }}
          >
            <Settings size={17} />
            تنظیمات حساب
          </div>
          <div
            className="sidebar-item"
            onClick={() => { onHelp(); setMobileOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", marginBottom: 4, color: "#AAB8D1", fontSize: 14, fontWeight: 600 }}
          >
            <HelpCircle size={17} />
            راهنما
          </div>
        </div>
        <div style={{ padding: 12, borderTop: "1px solid #22385F" }}>
          <div style={{ fontSize: 12, color: "#7C8CAE", padding: "6px 14px 12px" }}>{adminName}</div>
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
    if (!teacher.school_id) return;
    let cancelled = false;
    getJSON(`school:${teacher.school_id}`).then((s) => { if (!cancelled) setMySchool(s); });
    return () => { cancelled = true; };
  }, [teacher.school_id]);

  // پیام‌رسانی دوطرفه با مدیر کل — تنظیم سراسری «آیا ادمین‌ها اجازه‌ی
  // فرستادن پیام به مدیر سایت رو دارن یا نه» رو یک‌بار می‌خونیم؛ پیش‌فرض
  // (وقتی هنوز ساخته نشده) دوطرفه (مجاز) است.
  const [allowAdminToSuperAdmin, setAllowAdminToSuperAdmin] = useState(true);
  useEffect(() => {
    let cancelled = false;
    getJSON("settings:global").then((s) => { if (!cancelled) setAllowAdminToSuperAdmin(s?.allow_admin_to_superadmin_messages !== false); });
    return () => { cancelled = true; };
  }, []);
  const [saThreadText, setSaThreadText] = useState("");
  const [saThreadSending, setSaThreadSending] = useState(false);
  const superAdminThread = (messages || [])
    .filter((m) => m.channel === "admin_superadmin" && m.school_id === teacher.school_id)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const unreadSaCount = superAdminThread.filter((m) => m.sender_role === "super_admin" && new Date(m.created_at) > new Date(teacher.sa_thread_last_read_at || 0)).length;
  useEffect(() => {
    if (view !== "messages" || unreadSaCount === 0) return;
    const updated = { ...teacher, sa_thread_last_read_at: new Date().toISOString() };
    setJSON(`teacher:${teacher.username}`, updated).then(() => { onUpdateSelf && onUpdateSelf(updated); });
  }, [view, unreadSaCount]);
  const sendToSuperAdmin = async () => {
    if (!saThreadText.trim()) return;
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
    if (sharedClasses.length > 0) confirmMsg += `\n(${sharedClasses.length} کلاس مشترک با معلم‌های دیگر فقط از این معلم جدا می‌شود و خودش باقی می‌ماند.)`;
    confirmMsg += " این کار قابل بازگشت نیست.";
    if (!window.confirm(confirmMsg)) return;

    const soloClassIds = new Set(soloClasses.map((c) => c.id));
    const deletions = [deleteKey(`teacher:${t.username}`)];
    soloClasses.forEach((c) => deletions.push(deleteKey(`class:${c.id}`)));
    roster.filter((r) => soloClassIds.has(r.class_id)).forEach((r) => deletions.push(deleteKey(`roster:${r.id}`)));
    const updates = sharedClasses.map((c) =>
      setJSON(`class:${c.id}`, { ...c, teacher_ids: classTeacherIds(c).filter((u) => u !== t.username) })
    );
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
    if (!result.ok) { setCreateClassError(result.error); return false; }
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
    if (!window.confirm(`کلاس «${cls.name}» حذف شود؟${members.length ? ` ${members.length} دانش‌آموز این کلاس نیز حذف می‌شوند.` : ""} این کار قابل بازگشت نیست.`)) return;
    removeLocalClass && removeLocalClass(cls.id);
    const deletions = [deleteKey(`class:${cls.id}`), ...members.map((r) => deleteKey(`roster:${r.id}`))];
    await Promise.all(deletions);
  };

  const startEditClass = (c) => { setEditingClassId(c.id); setEditClassName(c.name); };
  const cancelEditClass = () => { setEditingClassId(null); setEditClassName(""); };
  const saveEditClass = async (c) => {
    if (!editClassName.trim() || editClassName.trim() === c.name) { cancelEditClass(); return; }
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
    if (!announceText.trim()) return;
    if (announceAudience === "class" && !announceClassId) return;
    if (announceAudience === "student" && !announceStudentId) return;
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
    if (m.audience === "teachers") return "همه معلمان";
    if (m.audience === "students") return "همه دانش‌آموزان";
    if (m.audience === "class") { const c = classById[m.target_id]; return c ? `کلاس: ${c.name}` : "کلاس حذف‌شده"; }
    if (m.audience === "student") { const s = roster.find((r) => r.id === m.target_id); return s ? `دانش‌آموز: ${s.fullname}` : "دانش‌آموز حذف‌شده"; }
    return "—";
  };

  const now = new Date();
  const examStatus = (exam) => {
    const opens = exam.opens_at ? new Date(exam.opens_at) : null;
    const closes = exam.closes_at ? new Date(exam.closes_at) : null;
    if (closes && closes < now) return { label: "پایان‌یافته", tone: "gray" };
    if (opens && opens > now) return { label: "پیش‌رو", tone: "blue" };
    if (opens || closes) return { label: "در حال برگزاری", tone: "green" };
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
    if (!window.confirm(`آزمون «${exam.title}» حذف شود؟ ${qCount} سوال و همه‌ی نتایج این آزمون نیز حذف می‌شوند. این کار قابل بازگشت نیست.`)) return;
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
    if (!editStudentName.trim() || editStudentName.trim() === m.fullname) { cancelEditStudent(); return; }
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
    if (!window.confirm(`«${m.fullname}» حذف شود؟`)) return;
    removeLocalRoster && removeLocalRoster(m.id);
    await deleteKey(`roster:${m.id}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", minHeight: "100vh", background: "#F8FAFC" }}>
      <AdminSidebar
        active={view}
        onNavigate={setView}
        onSettings={() => setShowOwnSettings(true)}
        onHelp={() => setShowHelp(true)}
        onLogout={onLogout}
        adminName={teacher.fullname}
        brandColor={mySchool?.color}
        logoUrl={mySchool?.logo_data_url}
        badges={{ messages: unreadSaCount }}
      />

      <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
        <TopBar title={viewTitles[view]} teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />

        {view === "dashboard" && (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <StatCard icon={Users} label="تعداد معلمان" value={teachers.length} color="#2563EB" />
            <StatCard icon={FileText} label="تعداد آزمون‌ها (کل مدرسه)" value={exams.length} color="#8B5CF6" />
            <StatCard icon={Users} label="تعداد کلاس‌ها (کل مدرسه)" value={classes.length} color="#0EA5E9" />
            <StatCard icon={BarChart3} label="تعداد دانش‌آموزان (کل مدرسه)" value={students.length} color="#16A34A" />
          </div>
        )}

        {view === "teachers" && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B" }}>معلمان مدرسه</div>
              <div style={{ display: "flex", gap: 10, flex: 1, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <TextInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجوی معلم..." style={{ maxWidth: 220 }} />
                <Button onClick={() => setShowCreate(true)}><Plus size={16} />افزودن معلم</Button>
              </div>
            </div>

            {visibleTeachers.length === 0 ? (
              <EmptyState text="هنوز معلمی اضافه نشده است." actionLabel="افزودن معلم" onAction={() => setShowCreate(true)} />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EEF1F6", textAlign: "right" }}>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>نام معلم</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>نام کاربری</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>وضعیت</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>کلاس‌ها</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>آزمون‌ها</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>دانش‌آموزان</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>تاریخ عضویت</th>
                      <th style={{ padding: "10px 6px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTeachers.map((t) => {
                      const s = statsFor(t.username);
                      const isActive = t.active !== false;
                      return (
                        <tr key={t.username} style={{ borderBottom: "1px solid #F5F7FA" }}>
                          <td style={{ padding: "12px 6px", fontWeight: 700, color: "#1E293B" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <Avatar username={t.username} name={t.fullname} updatedAt={t.avatar_updated_at} size={30} />
                              {t.fullname}
                            </div>
                          </td>
                          <td style={{ padding: "12px 6px", color: "#64748B" }}>{t.username}</td>
                          <td style={{ padding: "12px 6px" }}>
                            <span style={{
                              fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                              background: isActive ? "#DCFCE7" : "#FEF2F2", color: isActive ? "#16A34A" : "#DC2626",
                            }}>
                              {isActive ? "فعال" : "غیرفعال"}
                            </span>
                          </td>
                          <td style={{ padding: "12px 6px", color: "#475569" }}>{s.classCount}</td>
                          <td style={{ padding: "12px 6px", color: "#475569" }}>{s.examCount}</td>
                          <td style={{ padding: "12px 6px", color: "#475569" }}>{s.studentCount}</td>
                          <td style={{ padding: "12px 6px", color: "#94A3B8" }}>{t.created_at ? new Date(t.created_at).toLocaleDateString("fa-IR") : "—"}</td>
                          <td style={{ padding: "12px 6px" }}>
                            <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                              <div
                                onClick={() => setEditingTeacher(t)}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#EFF6FF", cursor: "pointer" }}
                              >
                                <Edit2 size={16} color="#2563EB" />
                              </div>
                              <div
                                onClick={() => removeTeacher(t)}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#FEF2F2", cursor: "pointer" }}
                              >
                                <Trash2 size={16} color="#DC2626" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {view === "classes" && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B" }}>کلاس‌بندی مدرسه</div>
              <div style={{ display: "flex", gap: 10, flex: 1, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <TextInput value={classSearch} onChange={(e) => setClassSearch(e.target.value)} placeholder="جستجوی کلاس..." style={{ maxWidth: 220 }} />
                <Button onClick={() => setShowCreateClass(true)}><Plus size={16} />کلاس جدید</Button>
              </div>
            </div>

            {schoolClasses.filter((c) => !classSearch || c.name.includes(classSearch)).length === 0 ? (
              <EmptyState text="هنوز کلاسی ساخته نشده است." actionLabel="کلاس جدید" onAction={() => setShowCreateClass(true)} />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EEF1F6", textAlign: "right" }}>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>نام کلاس</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>معلم‌ها</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>دانش‌آموزان</th>
                      <th style={{ padding: "10px 6px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {schoolClasses.filter((c) => !classSearch || c.name.includes(classSearch)).map((c) => (
                      <tr key={c.id} style={{ borderBottom: "1px solid #F5F7FA" }}>
                        <td style={{ padding: "12px 6px", fontWeight: 700, color: "#1E293B" }}>
                          {editingClassId === c.id ? (
                            <div style={{ display: "flex", gap: 6 }}>
                              <TextInput
                                autoFocus
                                value={editClassName}
                                onChange={(e) => setEditClassName(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") saveEditClass(c); if (e.key === "Escape") cancelEditClass(); }}
                                style={{ fontSize: 13, padding: "7px 10px", maxWidth: 140 }}
                              />
                              <Button type="button" style={{ fontSize: 12, padding: "7px 10px" }} onClick={() => saveEditClass(c)} disabled={savingClassName}>ذخیره</Button>
                              <Button type="button" variant="ghost" style={{ fontSize: 12, padding: "7px 10px" }} onClick={cancelEditClass}>انصراف</Button>
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              {c.name}
                              <span onClick={() => startEditClass(c)} style={{ display: "flex", cursor: "pointer", color: "#94A3B8", padding: 3 }} title="ویرایش نام کلاس">
                                <Edit2 size={13} />
                              </span>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "12px 6px", position: "relative" }}>
                          {(() => {
                            const ids = classTeacherIds(c);
                            const names = ids.map((u) => teachers.find((t) => t.username === u)?.fullname || u);
                            return (
                              <div
                                onClick={() => setTeacherPickerClassId((cur) => (cur === c.id ? null : c.id))}
                                style={{
                                  display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 10px",
                                  borderRadius: 8, border: "1.5px solid #E2E8F0", cursor: "pointer",
                                  fontSize: 12.5, color: names.length ? "#334155" : "#94A3B8", maxWidth: 200,
                                }}
                              >
                                {names.length ? names.join("، ") : "— بدون معلم —"}
                              </div>
                            );
                          })()}
                          {teacherPickerClassId === c.id && (
                            <div style={{
                              position: "absolute", top: "100%", right: 0, zIndex: 20, marginTop: 4,
                              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10,
                              boxShadow: "0 8px 24px rgba(15,23,42,.12)", padding: 10, minWidth: 200,
                              maxHeight: 220, overflowY: "auto",
                            }}>
                              {teachers.length === 0 ? (
                                <div style={{ fontSize: 12, color: "#94A3B8" }}>هنوز معلمی نساخته‌ای.</div>
                              ) : teachers.map((t) => {
                                const checked = classTeacherIds(c).includes(t.username);
                                return (
                                  <div
                                    key={t.username}
                                    onClick={() => toggleClassTeacher(c, t.username)}
                                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", cursor: "pointer" }}
                                  >
                                    {checked ? <CheckCircle2 size={15} color="#2563EB" /> : <Circle size={15} color="#CBD5E1" />}
                                    <span style={{ fontSize: 12.5, color: "#334155" }}>{t.fullname}</span>
                                  </div>
                                );
                              })}
                              <div style={{ borderTop: "1px solid #F1F5F9", marginTop: 6, paddingTop: 6, textAlign: "left" }}>
                                <span onClick={() => setTeacherPickerClassId(null)} style={{ fontSize: 11.5, color: "#2563EB", cursor: "pointer" }}>بستن</span>
                              </div>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "12px 6px", color: "#475569" }}>{roster.filter((r) => r.class_id === c.id).length}</td>
                        <td style={{ padding: "12px 6px" }}>
                          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                            <Button variant="ghost" style={{ fontSize: 12.5, padding: "7px 10px" }} onClick={() => setManagingRosterClass(c)}>
                              <Users size={14} />دانش‌آموزان
                            </Button>
                            <div
                              onClick={() => removeClass(c)}
                              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#FEF2F2", cursor: "pointer" }}
                            >
                              <Trash2 size={16} color="#DC2626" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {view === "exams" && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B" }}>آزمون‌های مدرسه</div>
              <TextInput value={examSearch} onChange={(e) => setExamSearch(e.target.value)} placeholder="جستجوی آزمون..." style={{ maxWidth: 220 }} />
            </div>

            {schoolExams.length === 0 ? (
              <EmptyState text="هنوز آزمونی ساخته نشده است." />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EEF1F6", textAlign: "right" }}>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>عنوان آزمون</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>معلم</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>تعداد سوال</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>شرکت‌کنندگان</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>تاریخ ساخت</th>
                      <th style={{ padding: "10px 6px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {schoolExams.map((exam) => {
                      const t = teacherByUsername[exam.teacher_id];
                      const qCount = questions.filter((q) => q.exam_id === exam.id).length;
                      const sCount = students.filter((s) => s.exam_id === exam.id).length;
                      return (
                        <tr key={exam.id} style={{ borderBottom: "1px solid #F5F7FA" }}>
                          <td style={{ padding: "12px 6px", fontWeight: 700, color: "#1E293B" }}>{exam.title}</td>
                          <td style={{ padding: "12px 6px", color: "#64748B" }}>{t ? t.fullname : "—"}</td>
                          <td style={{ padding: "12px 6px", color: "#475569" }}>{qCount}</td>
                          <td style={{ padding: "12px 6px", color: "#475569" }}>{sCount}</td>
                          <td style={{ padding: "12px 6px", color: "#94A3B8" }}>{exam.created_at ? new Date(exam.created_at).toLocaleDateString("fa-IR") : "—"}</td>
                          <td style={{ padding: "12px 6px" }}>
                            <div
                              onClick={() => removeExam(exam)}
                              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#FEF2F2", cursor: "pointer" }}
                            >
                              <Trash2 size={16} color="#DC2626" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {view === "results" && (
          <AdminResultsScreen
            exams={exams}
            teachers={teachers}
            teacherByUsername={teacherByUsername}
            classes={classes}
            roster={roster}
            students={students}
            questions={questions}
            answers={answers}
            teacherFilter={resultsTeacherFilter}
            onTeacherFilterChange={setResultsTeacherFilter}
            adminTeacher={teacher}
            refresh={refresh}
            aiAllowed={!!(mySchool && mySchool.features && mySchool.features.ai_assistant)}
          />
        )}

        {view === "backup" && <AdminBackupScreen refresh={refresh} teacher={teacher} onUpdateSelf={onUpdateSelf} mySchool={mySchool} setMySchool={setMySchool} />}

        {view === "students" && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B" }}>دانش‌آموزان مدرسه</div>
              <TextInput value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} placeholder="جستجوی دانش‌آموز..." style={{ maxWidth: 220 }} />
            </div>

            {schoolRoster.length === 0 ? (
              <EmptyState text="هنوز دانش‌آموزی اضافه نشده است." />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EEF1F6", textAlign: "right" }}>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>نام دانش‌آموز</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>کلاس</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>معلم</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>کد ورود</th>
                      <th style={{ padding: "10px 6px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {schoolRoster.map((m) => {
                      const cls = classById[m.class_id];
                      const t = teacherByUsername[m.teacher_id];
                      return (
                        <tr key={m.id} style={{ borderBottom: "1px solid #F5F7FA" }}>
                          <td style={{ padding: "12px 6px", fontWeight: 700, color: "#1E293B" }}>
                            {editingStudentId === m.id ? (
                              <div style={{ display: "flex", gap: 6 }}>
                                <TextInput
                                  autoFocus
                                  value={editStudentName}
                                  onChange={(e) => setEditStudentName(e.target.value)}
                                  onKeyDown={(e) => { if (e.key === "Enter") saveEditStudent(m); if (e.key === "Escape") cancelEditStudent(); }}
                                  style={{ fontSize: 13, padding: "7px 10px", maxWidth: 150 }}
                                />
                                <Button type="button" style={{ fontSize: 12, padding: "7px 10px" }} onClick={() => saveEditStudent(m)} disabled={savingStudentName}>ذخیره</Button>
                                <Button type="button" variant="ghost" style={{ fontSize: 12, padding: "7px 10px" }} onClick={cancelEditStudent}>انصراف</Button>
                              </div>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                {m.fullname}
                                <span onClick={() => startEditStudent(m)} style={{ display: "flex", cursor: "pointer", color: "#94A3B8", padding: 3 }} title="ویرایش نام">
                                  <Edit2 size={13} />
                                </span>
                              </div>
                            )}
                          </td>
                          <td style={{ padding: "12px 6px", color: "#64748B" }}>{cls ? cls.name : "—"}</td>
                          <td style={{ padding: "12px 6px", color: "#64748B" }}>{t ? t.fullname : "—"}</td>
                          <td style={{ padding: "12px 6px" }}>
                            <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 800, color: "#2563EB", letterSpacing: 1 }}>{m.code}</span>
                          </td>
                          <td style={{ padding: "12px 6px" }}>
                            <div style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "flex-end" }}>
                              <span onClick={() => regenerateStudentCode(m)} style={{ fontSize: 11.5, color: "#64748B", cursor: "pointer" }}>کد جدید</span>
                              <div
                                onClick={() => removeSchoolStudent(m)}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 7, background: "#FEF2F2", cursor: "pointer" }}
                              >
                                <Trash2 size={14} color="#DC2626" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {view === "messages" && (
          <div>
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
              {allowAdminToSuperAdmin ? (
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

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 16 }}>ارسال اعلان جدید</div>
              <Field label="گیرنده">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { key: "teachers", label: "همه معلمان" },
                    { key: "students", label: "همه دانش‌آموزان مدرسه" },
                    { key: "class", label: "یک کلاس خاص" },
                    { key: "student", label: "یک دانش‌آموز خاص" },
                  ].map((opt) => (
                    <div key={opt.key} onClick={() => { setAnnounceAudience(opt.key); setAnnounceClassId(""); setAnnounceStudentId(""); }} style={{
                      padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700,
                      background: announceAudience === opt.key ? "#2563EB" : "#F1F5F9", color: announceAudience === opt.key ? "#fff" : "#475569",
                    }}>{opt.label}</div>
                  ))}
                </div>
              </Field>
              {(announceAudience === "class" || announceAudience === "student") && (
                <Field label="انتخاب کلاس">
                  <select
                    value={announceClassId}
                    onChange={(e) => { setAnnounceClassId(e.target.value); setAnnounceStudentId(""); }}
                    style={{ ...inputStyle }}
                  >
                    <option value="">— انتخاب کن —</option>
                    {schoolClasses.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </Field>
              )}
              {announceAudience === "student" && announceClassId && (
                <Field label="انتخاب دانش‌آموز">
                  <select
                    value={announceStudentId}
                    onChange={(e) => setAnnounceStudentId(e.target.value)}
                    style={{ ...inputStyle }}
                  >
                    <option value="">— انتخاب کن —</option>
                    {roster.filter((r) => r.class_id === announceClassId).map((r) => (
                      <option key={r.id} value={r.id}>{r.fullname}</option>
                    ))}
                  </select>
                </Field>
              )}
              <Field label="متن اعلان">
                <textarea value={announceText} onChange={(e) => setAnnounceText(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} placeholder="مثلاً: جلسه هماهنگی معلمان روز شنبه ساعت ۱۰" />
              </Field>
              <Button onClick={sendAnnouncement} disabled={announceSending || (announceAudience === "class" && !announceClassId) || (announceAudience === "student" && !announceStudentId)}>
                <Plus size={16} />{announceSending ? "در حال ارسال..." : "ارسال اعلان"}
              </Button>
            </div>

            <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>اعلانات ارسال‌شده</div>
            {adminAnnouncements.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6" }}>
                <EmptyState text="هنوز اعلانی نفرستاده‌ای." />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {adminAnnouncements.map((m) => (
                  <div key={m.id} style={{ background: "#fff", border: "1px solid #EEF1F6", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 13, color: "#334155", marginBottom: 6, whiteSpace: "pre-wrap" }}>{m.text}</div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Badge tone="blue">{describeAudience(m)}</Badge>
                        <span style={{ fontSize: 11, color: "#94A3B8" }}>{new Date(m.created_at).toLocaleString("fa-IR")}</span>
                      </div>
                    </div>
                    <div
                      onClick={() => removeAnnouncement(m.id)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 7, background: "#FEF2F2", cursor: "pointer", flexShrink: 0 }}
                    >
                      <Trash2 size={14} color="#DC2626" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "schedule" && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 16 }}>برنامه امتحانات مدرسه</div>
            {scheduledExams.length === 0 ? (
              <EmptyState text="هنوز آزمونی ساخته نشده است." />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EEF1F6", textAlign: "right" }}>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>عنوان آزمون</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>معلم</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>شروع</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>پایان</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>مدت (دقیقه)</th>
                      <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledExams.map((exam) => {
                      const t = teacherByUsername[exam.teacher_id];
                      const st = examStatus(exam);
                      return (
                        <tr key={exam.id} style={{ borderBottom: "1px solid #F5F7FA" }}>
                          <td style={{ padding: "12px 6px", fontWeight: 700, color: "#1E293B" }}>{exam.title}</td>
                          <td style={{ padding: "12px 6px", color: "#64748B" }}>{t ? t.fullname : "—"}</td>
                          <td style={{ padding: "12px 6px", color: "#475569" }}>{exam.opens_at ? new Date(exam.opens_at).toLocaleString("fa-IR") : "—"}</td>
                          <td style={{ padding: "12px 6px", color: "#475569" }}>{exam.closes_at ? new Date(exam.closes_at).toLocaleString("fa-IR") : "—"}</td>
                          <td style={{ padding: "12px 6px", color: "#475569" }}>{exam.duration_minutes || "—"}</td>
                          <td style={{ padding: "12px 6px" }}><Badge tone={st.tone}>{st.label}</Badge></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 26, fontSize: 11, color: "#94A3B8" }}>
          © {new Date().getFullYear()} ghobeishawi — تمامی حقوق محفوظ است
        </div>
      </div>

      {showCreate && (
        <Modal title="افزودن حساب معلم جدید" onClose={() => setShowCreate(false)}>
          <CreateTeacherForm
            existingUsernames={teachers.map((t) => t.username)}
            schoolId={teacher.school_id}
            onCreated={async (teacher, emailResult) => {
              setShowCreate(false);
              await refresh();
              if (emailResult && !emailResult.sent) window.alert(`حساب معلم ساخته شد، ولی ایمیل خوش‌آمد ارسال نشد:\n${emailResult.note}`);
            }}
          />
        </Modal>
      )}

      {managingRosterClass && (
        <AdminRosterModal
          cls={managingRosterClass}
          roster={roster}
          onClose={() => setManagingRosterClass(null)}
          refresh={refresh}
          addLocalRoster={addLocalRoster}
          addLocalRosterMany={addLocalRosterMany}
          updateLocalRoster={updateLocalRoster}
          removeLocalRoster={removeLocalRoster}
          schoolId={teacher.school_id}
          groupLoginCode={mySchool?.login_code}
        />
      )}

      {showCreateClass && (
        <Modal title="ساخت کلاس جدید" onClose={() => { setShowCreateClass(false); setCreateClassError(""); }}>
          <CreateClassForm onCreate={createClass} error={createClassError} />
        </Modal>
      )}

      {editingTeacher && (
        <Modal title={`ویرایش حساب: ${editingTeacher.fullname}`} onClose={() => setEditingTeacher(null)}>
          <EditTeacherForm
            teacher={editingTeacher}
            onSaved={async (updated) => { setEditingTeacher(updated); await refresh(); }}
          />
        </Modal>
      )}

      {showHelp && (
        <Modal title="راهنمای پنل مدیریت" onClose={() => setShowHelp(false)}>
          <div style={{ fontSize: 13.5, color: "#334155", lineHeight: 2.1 }}>
            <b>معلمان:</b> از این بخش برای هر معلم مدرسه یک حساب کاربری بساز. هر معلم فقط کلاس‌ها و آزمون‌های خودش را می‌بیند.
            <br /><br />
            <b>کلاس‌بندی:</b> کلاس‌های مدرسه را اینجا تعریف کن و هرکدام را به یک معلم بسپار. دانش‌آموزان هر کلاس هم از همین بخش (دکمه «دانش‌آموزان») اضافه می‌شوند — یکی‌یکی، با پیست کردن چند اسم با هم، یا با بارگذاری مستقیم یک فایل اکسل (.xlsx/.csv) که فقط ستون اول آن (نام دانش‌آموز) خوانده می‌شود.
            <br /><br />
            <b>آزمون‌ها و دانش‌آموزان:</b> نمای کلی از همه‌ی آزمون‌ها و دانش‌آموزان مدرسه، صرف‌نظر از اینکه مال کدام معلم است.
            <br /><br />
            <b>برنامه امتحانات:</b> فهرست همه‌ی آزمون‌های زمان‌بندی‌شده‌ی مدرسه (معلم، تاریخ شروع/پایان، مدت، وضعیت برگزاری) در یک نگاه.
            <br /><br />
            <b>نتایج و گزارش‌ها:</b> میانگین نمرات و مقایسه‌ی عملکرد به تفکیک معلم و کلاس، حضور و غیاب، و امکان دیدن نتایج ریز هر آزمون — درست مثل صفحه‌ی نتایج خودِ معلم، شامل روند نمرات هر دانش‌آموز در چند آزمون، نقاط ضعفش بر اساس برچسب سوال‌ها، پیشنهاد تمرین با هوش مصنوعی، و دانلود کارنامه‌ی او به‌صورت PDF. از صفحه‌ی «نتایج» هر معلم می‌توان خروجی Excel هم گرفت: نمره‌ی هر سوال به تفکیک برای یک آزمون خاص، یا خلاصه‌ی نمرات یک کلاس در همه‌ی آزمون‌هایش.
            <br /><br />
            <b>چت کلاسی و هوش مصنوعی:</b> معلم‌های مدرسه می‌توانند با دانش‌آموزان هر کلاس چت گروهی داشته باشند و از تولید سوال/تصحیح با هوش مصنوعی استفاده کنند. فعال یا غیرفعال بودن این دو قابلیت برای کل مدرسه‌ی شما (پلن مدرسه) توسط مدیر سایت تعیین می‌شود؛ اگر غیرفعال است، برای فعال‌سازی با مدیر سایت تماس بگیرید.
            <br /><br />
            <b>پیام به مدیر سایت:</b> از بخش «پیام‌ها» می‌توانید مستقیماً با مدیر سایت گفتگو کنید — مثلاً برای درخواست افزایش سقف کلاس/آزمون یا فعال‌سازی یک قابلیت.
            <br /><br />
            <b>پشتیبان‌گیری و بازیابی:</b> دانلود یک فایل شامل کل داده‌ی مدرسه، و بازیابی از روی آن در صورت نیاز. دکمه‌ی «انتقال به D1» یک ابزار فنی برای سرعت‌بخشیدن به پایگاه‌داده‌ی مدرسه است — معمولاً نیازی به استفاده از آن نیست مگر کسی که پروژه را برایتان راه‌اندازی کرده توضیح خاصی داده باشد.
            <br /><br />
            <b>بازیابی رمز عبور:</b> اگر معلمی رمز عبورش را فراموش کند، لینک بازیابی به ایمیل ثبت‌شده‌ی او ارسال می‌شود؛ برای این کار ایمیل هر معلم باید در سامانه صحیح ثبت شده باشد.
            <br /><br />
            برای خروج از حساب یا تغییر رمز عبور، از پایین همین منو استفاده کن.
          </div>
        </Modal>
      )}

      {showOwnSettings && (
        <AdminProfileModal
          teacher={teacher}
          onClose={() => setShowOwnSettings(false)}
          onSaved={(updated) => { onUpdateSelf && onUpdateSelf(updated); }}
        />
      )}
    </div>
  );
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

  return (
    <div>
      <div style={{ marginBottom: 18, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "#64748B" }}>فیلتر معلم:</span>
        <select
          value={teacherFilter}
          onChange={(e) => { onTeacherFilterChange(e.target.value); setDrillExamId(null); }}
          style={{ ...inputStyle, width: "auto", padding: "8px 12px" }}
        >
          <option value="">همه معلمان</option>
          {teachers.map((t) => <option key={t.username} value={t.username}>{t.fullname}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
        <StatCard icon={TrendingUp} label="میانگین نمره (کل)" value={`${avg}%`} color="#2563EB" />
        <StatCard icon={CheckCircle2} label="درصد قبولی" value={`${passRate}%`} color="#8B5CF6" />
        <StatCard icon={Users} label="تعداد شرکت‌ها" value={attemptRows.length} color="#0EA5E9" />
        <StatCard icon={FileText} label="آزمون‌های برگزارشده" value={examsHeldCount} color="#16A34A" />
      </div>

      {attemptRows.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
          <EmptyState text="هنوز هیچ دانش‌آموزی در آزمونی شرکت نکرده است." />
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
            <div style={{ flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 14 }}>مقایسه معلمان</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {teacherRankings.map((t) => (
                  <div key={t.username}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#334155", marginBottom: 4 }}>
                      <span>{t.name} <span style={{ color: "#94A3B8", fontSize: 11 }}>({t.participantCount} شرکت، {t.examCount} آزمون)</span></span>
                      <span style={{ fontWeight: 800, color: t.avg >= 50 ? "#16A34A" : "#DC2626" }}>{t.avg}%</span>
                    </div>
                    <div style={{ height: 7, background: "#EEF1F6", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${t.avg}%`, height: "100%", background: t.avg >= 50 ? "#16A34A" : "#DC2626" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: "1 1 320px", background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 14 }}>مقایسه کلاس‌ها</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {classRankings.map((c) => (
                  <div key={c.cls}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#334155", marginBottom: 4 }}>
                      <span>{c.cls} <span style={{ color: "#94A3B8", fontSize: 11 }}>({c.participantCount} شرکت)</span></span>
                      <span style={{ fontWeight: 800, color: c.avg >= 50 ? "#16A34A" : "#DC2626" }}>{c.avg}%</span>
                    </div>
                    <div style={{ height: 7, background: "#EEF1F6", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${c.avg}%`, height: "100%", background: c.avg >= 50 ? "#16A34A" : "#DC2626" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 14 }}>نتایج ریز یک آزمون</div>
            {!drillExamId ? (
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "#64748B" }}>انتخاب آزمون:</span>
                <select
                  value=""
                  onChange={(e) => setDrillExamId(e.target.value)}
                  style={{ ...inputStyle, width: "auto", padding: "8px 12px" }}
                >
                  <option value="" disabled>یک آزمون را انتخاب کن...</option>
                  {visibleExams.map((e) => (
                    <option key={e.id} value={e.id}>{e.title} — {teacherByUsername[e.teacher_id]?.fullname || "—"}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <div
                  onClick={() => setDrillExamId(null)}
                  style={{ fontSize: 12.5, color: "#2563EB", cursor: "pointer", fontWeight: 700, marginBottom: 10 }}
                >
                  ← بازگشت به لیست آزمون‌ها
                </div>
                <ResultsScreen
                  teacher={adminTeacher}
                  exams={exams}
                  questions={questions}
                  students={students}
                  answers={answers}
                  roster={roster}
                  classes={classes}
                  examsOverride={visibleExams}
                  examLabelFn={(e) => `${e.title} — ${teacherByUsername[e.teacher_id]?.fullname || "—"}`}
                  initialExamId={drillExamId}
                  hideTopBar
                  refresh={refresh}
                  aiAllowed={aiAllowed}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
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
    if (!ok) throw new Error("save failed");
    setMySchool(updated);
  };

  const [loginCodeBusy, setLoginCodeBusy] = useState(false);
  const regenerateLoginCode = async () => {
    if (!window.confirm("کد ورود فعلیِ مدرسه از کار می‌افتد و باید کد جدید به همه‌ی معلم‌ها و دانش‌آموزها اطلاع داده شود. ادامه می‌دهید؟")) return;
    setLoginCodeBusy(true);
    const { login_code, ...rest } = mySchool;
    const result = await setJSONReturn(`school:${teacher.school_id}`, rest);
    if (result.ok && result.v) {
      setMySchool(result.v);
      setMsg("کد جدید ساخته شد.");
      setMsgTone("green");
    } else {
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
    } catch {
      setMsg("خطا در ساخت فایل پشتیبان.");
      setMsgTone("red");
    }
    setBusy(false);
  };

  const pickFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
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
    } catch {
      setMsg("فایل نامعتبر است.");
      setMsgTone("red");
    }
  };

  const doRestore = async () => {
    if (!confirmingRestore) return;
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
    } catch {
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
      } else {
        setSaMsg(`انجام شد. حساب «${saUsername.trim()}» به‌عنوان مدیر سایت ساخته شد — از این پس با همون وارد شو تا مدرسه‌های دیگه رو هم مدیریت کنی.`);
        setSaMsgTone("green");
        const updatedSelf = await getJSON(`teacher:${teacher.username}`);
        if (updatedSelf) onUpdateSelf && onUpdateSelf(updatedSelf);
        await refresh();
      }
    } catch {
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
      } else {
        const breakdown = Object.entries(data.migrated || {}).map(([k, v]) => `${k} ${v}`).join(" — ");
        const total = Object.values(data.migrated || {}).reduce((s, n) => s + n, 0);
        const errCount = (data.errors || []).length;
        if (errCount > 0) {
          setD1Msg(`${total} مورد پردازش شد، ولی ${errCount} مورد خطا داشت:\n${data.errors.join("\n")}`);
          setD1MsgTone("red");
        } else {
          setD1Msg(`${total} مورد منتقل شد. (${breakdown})`);
          setD1MsgTone("green");
        }
      }
    } catch {
      setD1Msg("اتصال برقرار نشد.");
      setD1MsgTone("red");
    }
    setD1Busy(false);
  };

  const toneColor = { blue: "#2563EB", green: "#16A34A", red: "#DC2626" }[msgTone] || "#2563EB";
  const d1ToneColor = { blue: "#2563EB", green: "#16A34A", red: "#DC2626" }[d1MsgTone] || "#2563EB";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 520 }}>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>دانلود پشتیبان کامل مدرسه</div>
        <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 16 }}>
          یک فایل شامل همه‌ی داده‌های مدرسه می‌سازه: حساب‌های معلمان، کلاس‌بندی، دانش‌آموزان، آزمون‌ها، سوالات و نتایج. توصیه می‌شه هر چند وقت یک‌بار (مثلاً قبل از تغییرات بزرگ) یک نسخه دانلود و جایی امن نگه‌داری بشه.
        </div>
        <Button onClick={exportBackup} disabled={busy}><Download size={15} />دانلود فایل پشتیبان</Button>
      </div>

      {teacher.school_id && mySchool && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>کد ورود مدرسه</div>
          <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 16 }}>
            دانش‌آموزهای این مدرسه برای ورود به پرتال یا چت کلاسی، این کد را همراه با کد شخصی خودشان وارد می‌کنند. این کد بین همه‌ی کلاس‌های مدرسه مشترک است.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 800, color: "#2563EB", letterSpacing: 3, background: "#EFF6FF", padding: "8px 16px", borderRadius: 10 }}>
              {mySchool.login_code || "—"}
            </span>
            <span onClick={loginCodeBusy ? undefined : regenerateLoginCode} style={{ fontSize: 12, color: loginCodeBusy ? "#94A3B8" : "#DC2626", fontWeight: 700, cursor: loginCodeBusy ? "default" : "pointer" }}>
              {loginCodeBusy ? "در حال ساخت..." : "کد جدید"}
            </span>
          </div>
        </div>
      )}

      {teacher.school_id && mySchool && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>لوگو و رنگ اختصاصی مدرسه</div>
          <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 16 }}>
            بعد از ورود، پنل مدرسه‌ی خودت (سایدبار و لوگو) با این رنگ و لوگو نشون داده می‌شه. صفحه‌ی ورود مشترک بین همه‌ی مدرسه‌هاست و تغییر نمی‌کنه.
          </div>
          <SchoolBrandingEditor school={mySchool} onSave={saveBranding} />
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>انتقال داده‌های قدیمی به D1 (یک‌بار مصرف)</div>
        <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 16 }}>
          داده‌های جدید از این به بعد خودکار هم در D1 ذخیره می‌شن تا صفحه‌ی آزمون و ورود دانش‌آموزان سریع‌تر و سبک‌تر بشه. اما داده‌های قدیمی‌تر (قبل از این بروزرسانی) باید یک‌بار با همین دکمه منتقل بشن. اجرای دوباره‌ش هم مشکلی نداره.
        </div>
        <Button onClick={migrateToD1} disabled={d1Busy}>انتقال به D1</Button>
        {d1Msg && <div style={{ fontSize: 13, color: d1ToneColor, fontWeight: 600, marginTop: 10, whiteSpace: "pre-wrap" }}>{d1Msg}</div>}
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>بازیابی از فایل پشتیبان</div>
        <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 16 }}>
          هر چیزی که در فایل باشه بازنویسی می‌شه (روی داده‌ی فعلی می‌شینه). چیزهایی که در فایل نیستن حذف نمی‌شن. این کار قابل بازگشت نیست، مگر اینکه خودت هم از وضعیت فعلی یک پشتیبان جدا داشته باشی.
        </div>
        <label style={{
          display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10,
          fontSize: 14, fontWeight: 700, cursor: busy ? "default" : "pointer", background: "#fff", color: "#334155",
          border: "1.5px solid #E2E8F0", opacity: busy ? 0.6 : 1,
        }}>
          انتخاب فایل پشتیبان
          <input type="file" accept="application/json" onChange={pickFile} disabled={busy} style={{ display: "none" }} />
        </label>
      </div>

      {!teacher.school_id && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #FDE68A", padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>ارتقا به سامانه‌ی چند مدرسه‌ای (یک‌بار مصرف)</div>
          <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 16, lineHeight: 1.9 }}>
            این نصب هنوز به مدل «چند مدرسه» منتقل نشده. با تکمیل فرم زیر، یک مدرسه با تمام داده‌های فعلی (معلمان، کلاس‌ها، آزمون‌ها و...) ساخته می‌شه و یک حساب مستقل «مدیر سایت» می‌سازیم که می‌تونه بعداً مدرسه‌های بیشتری هم اضافه کنه. حساب فعلی همین‌جوری به مدیریت همین مدرسه ادامه می‌ده.
          </div>
          <Field label="نام مدرسه"><TextInput value={saSchoolName} onChange={(e) => setSaSchoolName(e.target.value)} /></Field>
          <Field label="نام و نام‌خانوادگی مدیر سایت"><TextInput value={saFullname} onChange={(e) => setSaFullname(e.target.value)} /></Field>
          <Field label="نام کاربری مدیر سایت"><TextInput value={saUsername} onChange={(e) => setSaUsername(e.target.value)} /></Field>
          <Field label="رمز عبور مدیر سایت"><TextInput type="password" value={saPassword} onChange={(e) => setSaPassword(e.target.value)} /></Field>
          <Field label="ایمیل مدیر سایت"><TextInput type="email" value={saEmail} onChange={(e) => setSaEmail(e.target.value)} /></Field>
          <Button onClick={migrateToSchools} disabled={saBusy}>ساخت مدرسه و حساب مدیر سایت</Button>
          {saMsg && <div style={{ fontSize: 13, color: saToneColor, fontWeight: 600, marginTop: 10, whiteSpace: "pre-wrap" }}>{saMsg}</div>}
        </div>
      )}

      {msg && <div style={{ fontSize: 13, color: toneColor, fontWeight: 600 }}>{msg}</div>}

      {confirmingRestore && (
        <Modal onClose={() => setConfirmingRestore(null)} title="تأیید بازیابی">
          <div style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.9, marginBottom: 18 }}>
            این فایل شامل <b>{confirmingRestore.keys.length}</b> مورد داده‌ست. با ادامه، این داده‌ها جایگزین نسخه‌ی فعلی‌شون در مدرسه می‌شن. این کار قابل بازگشت نیست. مطمئنی؟
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={doRestore} disabled={busy}>بله، بازیابی کن</Button>
            <Button variant="ghost" onClick={() => setConfirmingRestore(null)}>انصراف</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
