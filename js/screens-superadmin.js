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
  return (
    <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 12, marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
      {FEATURE_DEFS.map((f) => {
        const stored = features ? features[f.key] : undefined;
        const enabled = stored === undefined ? !!f.defaultOn : !!stored;
        return (
          <label key={f.key} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "#334155", cursor: "pointer" }}>
            <input type="checkbox" checked={enabled} onChange={() => onToggle(f.key, !enabled)} style={{ width: 16, height: 16 }} />
            {f.label}
          </label>
        );
      })}
    </div>
  );
}

function BulkActionBar({ count, onActivate, onDeactivate, capFields, onApplyCap, onClear, busy }) {
  const [capValues, setCapValues] = useState({});
  if (count === 0) return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
      background: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 12, padding: "10px 14px", marginBottom: 14,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{count} مورد انتخاب شده</div>
      <Button variant="ghost" onClick={onActivate} disabled={busy} style={{ fontSize: 12.5, padding: "6px 12px" }}>فعال‌سازی گروهی</Button>
      <Button variant="ghost" onClick={onDeactivate} disabled={busy} style={{ fontSize: 12.5, padding: "6px 12px" }}>غیرفعال‌سازی گروهی</Button>
      {capFields.map((f) => (
        <div key={f.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="number" min="1" placeholder={f.label}
            value={capValues[f.key] ?? ""}
            onChange={(e) => setCapValues((p) => ({ ...p, [f.key]: e.target.value }))}
            style={{ width: 74, padding: "6px 8px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12.5 }}
          />
          <Button
            variant="ghost"
            onClick={() => { const v = Number(capValues[f.key]); if (v > 0) onApplyCap(f.key, v); }}
            disabled={busy || !(Number(capValues[f.key]) > 0)}
            style={{ fontSize: 12.5, padding: "6px 10px" }}
          >
            اعمال {f.label}
          </Button>
        </div>
      ))}
      <div onClick={onClear} style={{ marginRight: "auto", fontSize: 12, color: "#64748B", cursor: "pointer" }}>لغو انتخاب</div>
    </div>
  );
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("ایمیل معتبر نیست."); return; }
    if (password.length < 8) { setError("رمز عبور باید حداقل ۸ کاراکتر باشد."); return; }
    if (existingUsernames.includes(username.trim())) { setError("این نام کاربری قبلاً استفاده شده است."); return; }
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
  const handleKeyDown = (e) => { if (e.key === "Enter") submit(); };

  return (
    <div>
      <Field label="نام مدرسه">
        <TextInput value={schoolName} onChange={(e) => setSchoolName(e.target.value)} onKeyDown={handleKeyDown} placeholder="مثلاً: دبیرستان شهید بهشتی" />
      </Field>
      <Field label="نام و نام‌خانوادگی مدیر مدرسه">
        <TextInput value={fullname} onChange={(e) => setFullname(e.target.value)} onKeyDown={handleKeyDown} placeholder="مثلاً: علی رضایی" />
      </Field>
      <Field label="نام کاربری مدیر">
        <TextInput value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} placeholder="یک نام کاربری یکتا" />
      </Field>
      <Field label="رمز عبور اولیه‌ی مدیر">
        <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} placeholder="رمز عبور" />
      </Field>
      <Field label="ایمیل مدیر">
        <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} placeholder="برای بازیابی رمز عبور مدیر استفاده می‌شود" />
      </Field>
      {error && <div style={{ color: "#DC2626", fontSize: 13, marginBottom: 14 }}>{error}</div>}
      <Button type="button" onClick={submit} style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }} disabled={loading}>
        {loading ? "در حال ساخت..." : "ساخت مدرسه و حساب مدیر"}
      </Button>
    </div>
  );
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
    if (!name.trim()) { setMsg("نام مدرسه نمی‌تواند خالی باشد."); return; }
    const mc = Number(maxClasses);
    if (!mc || mc < 1) { setMsg("سقف تعداد کلاس باید حداقل ۱ باشد."); return; }
    const mepd = Number(maxExamsPerClassPerDay);
    if (!mepd || mepd < 1) { setMsg("سقف تعداد امتحان روزانه‌ی هر کلاس باید حداقل ۱ باشد."); return; }
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
    if (!window.confirm("کد ورود فعلیِ مدرسه از کار می‌افتد و باید کد جدید به همه‌ی معلم‌ها و دانش‌آموزها اطلاع داده شود. ادامه می‌دهید؟")) return;
    setRegenBusy(true);
    const { login_code, ...rest } = schoolState;
    const result = await setJSONReturn(`school:${schoolState.id}`, rest);
    if (result.ok && result.v) setSchoolState(result.v);
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
    if (!afullname.trim() || !ausername.trim() || !apassword || !aemail.trim()) { setAError("همه فیلدها را پر کنید."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aemail)) { setAError("ایمیل معتبر نیست."); return; }
    if (apassword.length < 8) { setAError("رمز عبور باید حداقل ۸ کاراکتر باشد."); return; }
    if (existingUsernames.includes(ausername.trim())) { setAError("این نام کاربری قبلاً استفاده شده است."); return; }
    setABusy(true);
    const existing = await getJSON(`teacher:${ausername.trim()}`);
    if (existing) { setABusy(false); setAError("این نام کاربری قبلاً ثبت شده است."); return; }
    const admin = {
      username: ausername.trim(), password: await hashPassword(apassword), fullname: afullname.trim(),
      email: aemail.trim(), role: "admin", school_id: school.id, created_at: new Date().toISOString(),
    };
    await setJSON(`teacher:${admin.username}`, admin);
    const emailResult = await sendWelcomeEmail({ username: admin.username, fullname: admin.fullname, email: admin.email, role: "admin" });
    setABusy(false);
    setShowAddAdmin(false);
    setAFullname(""); setAUsername(""); setAPassword(""); setAEmail("");
    onChanged();
    if (!emailResult.sent) window.alert(`مدیر ساخته شد، ولی ایمیل خوش‌آمد ارسال نشد:\n${emailResult.note}`);
  };

  const removeAdmin = async (a) => {
    if (!window.confirm(`حساب مدیر «${a.fullname}» حذف شود؟\nاین کار فقط همین حساب مدیریتی رو حذف می‌کنه؛ داده‌های خود مدرسه (معلم‌ها، کلاس‌ها، آزمون‌ها) دست‌نخورده می‌مونن.`)) return;
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
    if (resetPassword.length < 8) { setResetError("رمز عبور باید حداقل ۸ کاراکتر باشد."); return; }
    setResetBusy(true);
    const updated = { ...a, password: await hashPassword(resetPassword) };
    await setJSON(`teacher:${a.username}`, updated);
    setResetBusy(false);
    setResettingUsername(null);
    setResetPassword("");
    onChanged();
  };

  const deleteSchool = async () => {
    if (admins.length > 0 || teacherCount > 0) return;
    if (!window.confirm(`مدرسه‌ی «${schoolState.name}» برای همیشه حذف شود؟`)) return;
    await deleteKey(`school:${schoolState.id}`);
    onChanged();
    onClose();
  };
  const canDeleteSchool = admins.length === 0 && teacherCount === 0;

  return (
    <Modal title={`مدیریت مدرسه «${schoolState.name}»`} onClose={onClose}>
      <Field label="نام مدرسه">
        <TextInput value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="سقف تعداد کلاس‌های این مدرسه">
        <TextInput type="number" min="1" value={maxClasses} onChange={(e) => setMaxClasses(e.target.value)} style={{ maxWidth: 120 }} />
      </Field>
      <Field label="سقف تعداد امتحان هر کلاس در روز">
        <TextInput type="number" min="1" value={maxExamsPerClassPerDay} onChange={(e) => setMaxExamsPerClassPerDay(e.target.value)} style={{ maxWidth: 120 }} />
      </Field>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <input type="checkbox" id="school-active-toggle" checked={active} onChange={(e) => setActive(e.target.checked)} style={{ width: 16, height: 16 }} />
        <label htmlFor="school-active-toggle" style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.7 }}>
          مدرسه فعال است — اگه غیرفعال بشه، مدیر و همه‌ی معلم‌های این مدرسه دیگه نمی‌تونن وارد سامانه بشن (داده‌هاشون دست‌نخورده می‌مونه)
        </label>
      </div>
      {msg && <div style={{ color: "#16A34A", fontSize: 13, marginBottom: 12 }}>{msg}</div>}
      <Button onClick={saveDetails} disabled={saving} style={{ marginBottom: 22 }}>{saving ? "در حال ذخیره..." : "ذخیره تغییرات"}</Button>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>کد ورود مدرسه</div>
        <div style={{ fontSize: 11.5, color: "#94A3B8", marginBottom: 10, lineHeight: 1.8 }}>
          دانش‌آموزهای این مدرسه برای ورود، این کد را همراه با کد شخصی خودشان وارد می‌کنند. این کد بین همه‌ی کلاس‌ها/معلم‌های این مدرسه مشترک است و مانع قاطی‌شدن دانش‌آموزهای دو مدرسه‌ی مختلف می‌شود.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 800, color: "#2563EB", letterSpacing: 3, background: "#EFF6FF", padding: "8px 16px", borderRadius: 10 }}>
            {schoolState.login_code || "—"}
          </span>
          <span onClick={regenBusy ? undefined : regenerateLoginCode} style={{ fontSize: 12, color: regenBusy ? "#94A3B8" : "#DC2626", fontWeight: 700, cursor: regenBusy ? "default" : "pointer" }}>
            {regenBusy ? "در حال ساخت..." : "کد جدید"}
          </span>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>قابلیت‌های مدرسه</div>
        <div style={{ fontSize: 11.5, color: "#94A3B8", marginBottom: 4 }}>پلن این مدرسه‌ست — روی مدیر و همه‌ی معلم‌های زیرمجموعه یکسان اعمال می‌شه.</div>
        <FeatureTogglePanel
          features={schoolState.features}
          onToggle={async (key, value) => {
            const updated = { ...schoolState, features: { ...(schoolState.features || {}), [key]: value } };
            await setJSON(`school:${schoolState.id}`, updated);
            setSchoolState(updated);
            onChanged();
          }}
        />
      </div>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>لوگو و رنگ اختصاصی مدرسه</div>
        <SchoolBrandingEditor school={schoolState} onSave={saveBranding} />
      </div>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>مدیران این مدرسه</div>
        {admins.length === 0 ? (
          <div style={{ fontSize: 12.5, color: "#94A3B8", marginBottom: 14 }}>هیچ مدیری برای این مدرسه ثبت نشده.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
            {admins.map((a) => {
              const isActive = a.active !== false;
              return (
              <div key={a.username}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar username={a.username} name={a.fullname} updatedAt={a.avatar_updated_at} size={30} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", display: "flex", alignItems: "center", gap: 8 }}>
                        {a.fullname}
                        <span style={{
                          fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                          background: isActive ? "#DCFCE7" : "#FEF2F2", color: isActive ? "#16A34A" : "#DC2626",
                        }}>
                          {isActive ? "فعال" : "غیرفعال"}
                        </span>
                      </div>
                      <div style={{ fontSize: 11.5, color: "#94A3B8" }}>{a.username}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <div
                      onClick={() => toggleAdminActive(a)}
                      title={isActive ? "غیرفعال کردن حساب" : "فعال کردن حساب"}
                      style={{ cursor: "pointer", width: 30, height: 30, borderRadius: 8, background: isActive ? "#FFFBEB" : "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Circle size={14} color={isActive ? "#D97706" : "#16A34A"} />
                    </div>
                    <div
                      onClick={() => { setResettingUsername(resettingUsername === a.username ? null : a.username); setResetPassword(""); setResetError(""); }}
                      title="تنظیم رمز عبور جدید"
                      style={{ cursor: "pointer", width: 30, height: 30, borderRadius: 8, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Edit2 size={14} color="#2563EB" />
                    </div>
                    <div
                      onClick={() => removeAdmin(a)}
                      style={{ cursor: "pointer", width: 30, height: 30, borderRadius: 8, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Trash2 size={14} color="#DC2626" />
                    </div>
                  </div>
                </div>
                {resettingUsername === a.username && (
                  <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 12, marginTop: 8 }}>
                    <TextInput
                      type="password"
                      value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      placeholder="رمز عبور جدید (حداقل ۸ کاراکتر)"
                      style={{ marginBottom: 8 }}
                    />
                    {resetError && <div style={{ color: "#DC2626", fontSize: 12, marginBottom: 8 }}>{resetError}</div>}
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button onClick={() => savePasswordReset(a)} disabled={resetBusy} style={{ fontSize: 12.5, padding: "7px 14px" }}>
                        {resetBusy ? "در حال ذخیره..." : "ذخیره رمز جدید"}
                      </Button>
                      <Button variant="ghost" onClick={() => setResettingUsername(null)} style={{ fontSize: 12.5, padding: "7px 14px" }}>انصراف</Button>
                    </div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        )}

        {showAddAdmin ? (
          <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 16 }}>
            <Field label="نام و نام‌خانوادگی"><TextInput value={afullname} onChange={(e) => setAFullname(e.target.value)} /></Field>
            <Field label="نام کاربری"><TextInput value={ausername} onChange={(e) => setAUsername(e.target.value)} /></Field>
            <Field label="رمز عبور اولیه"><TextInput type="password" value={apassword} onChange={(e) => setAPassword(e.target.value)} /></Field>
            <Field label="ایمیل"><TextInput type="email" value={aemail} onChange={(e) => setAEmail(e.target.value)} /></Field>
            {aerror && <div style={{ color: "#DC2626", fontSize: 12.5, marginBottom: 10 }}>{aerror}</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={addAdmin} disabled={abusy}>{abusy ? "در حال ساخت..." : "افزودن مدیر"}</Button>
              <Button variant="ghost" onClick={() => setShowAddAdmin(false)}>انصراف</Button>
            </div>
          </div>
        ) : (
          <Button variant="ghost" onClick={() => setShowAddAdmin(true)}><Plus size={15} />افزودن مدیر دیگر</Button>
        )}
      </div>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18, marginTop: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#DC2626", marginBottom: 8 }}>حذف مدرسه</div>
        <div style={{ fontSize: 12, color: "#64748B", marginBottom: 12, lineHeight: 1.8 }}>
          {canDeleteSchool
            ? "این مدرسه هیچ مدیر یا معلمی نداره، پس حذفش کاملاً بی‌خطره."
            : "چون این مدرسه هنوز مدیر یا معلم فعال داره، حذف کامل امکان‌پذیر نیست — اول همه‌ی مدیرها رو حذف کن، یا به‌جاش از گزینه‌ی «غیرفعال کردن» بالا استفاده کن."}
        </div>
        <Button variant="ghost" onClick={deleteSchool} disabled={!canDeleteSchool} style={{ color: "#DC2626" }}>
          <Trash2 size={15} />حذف همیشگی مدرسه
        </Button>
      </div>
    </Modal>
  );
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
    if (!fullname.trim() || !username.trim() || !password || !email.trim()) { setError("همه فیلدها را پر کنید."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("ایمیل معتبر نیست."); return; }
    if (password.length < 8) { setError("رمز عبور باید حداقل ۸ کاراکتر باشد."); return; }
    const mc = Number(maxClasses);
    if (!mc || mc < 1) { setError("سقف تعداد کلاس باید حداقل ۱ باشد."); return; }
    const me = Number(maxExams) || 0;
    if (me < 0) { setError("سقف تعداد آزمون نمی‌تواند منفی باشد."); return; }
    if (existingUsernames.includes(username.trim())) { setError("این نام کاربری قبلاً استفاده شده است."); return; }
    setLoading(true);
    const existing = await getJSON(`teacher:${username.trim()}`);
    if (existing) { setLoading(false); setError("این نام کاربری قبلاً ثبت شده است."); return; }
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
        <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
      </Field>
      <Field label="ایمیل">
        <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} placeholder="برای بازیابی رمز عبور استفاده می‌شود" />
      </Field>
      <Field label="سقف تعداد کلاس این معلم">
        <TextInput type="number" min="1" value={maxClasses} onChange={(e) => setMaxClasses(e.target.value)} style={{ maxWidth: 120 }} />
      </Field>
      <Field label="سقف کل تعداد آزمون این معلم (۰ = بدون محدودیت)">
        <TextInput type="number" min="0" value={maxExams} onChange={(e) => setMaxExams(e.target.value)} style={{ maxWidth: 120 }} />
      </Field>
      {error && <div style={{ color: "#DC2626", fontSize: 13, marginBottom: 14 }}>{error}</div>}
      <Button type="button" onClick={submit} style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }} disabled={loading}>
        {loading ? "در حال ساخت..." : "ساخت حساب معلم مستقل"}
      </Button>
    </div>
  );
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
    if (!mc || mc < 1) { setMsg("سقف تعداد کلاس باید حداقل ۱ باشد."); return; }
    const me = Number(maxExams) || 0;
    if (me < 0) { setMsg("سقف تعداد آزمون نمی‌تواند منفی باشد."); return; }
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
    if (resetPassword.length < 8) { setResetError("رمز عبور باید حداقل ۸ کاراکتر باشد."); return; }
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
    if (!window.confirm("کد ورود فعلیِ این معلم از کار می‌افتد. ادامه می‌دهید؟")) return;
    setLoginCodeBusy(true);
    const { login_code, ...rest } = teacherState;
    const result = await setJSONReturn(`teacher:${teacherState.username}`, rest);
    if (result.ok && result.v) setTeacherState(result.v);
    setLoginCodeBusy(false);
    onChanged();
  };

  const deleteTeacher = async () => {
    if (!window.confirm(`حساب معلم «${teacherState.fullname}» حذف شود؟\nاین کار فقط همین حساب رو حذف می‌کنه؛ کلاس‌ها و آزمون‌های ساخته‌شده‌ی این معلم دست‌نخورده می‌مونن ولی چون دیگه نمی‌تونه وارد بشه، عملاً غیرقابل‌دسترس می‌شن.`)) return;
    await deleteKey(`teacher:${teacherState.username}`);
    onChanged();
    onClose();
  };

  return (
    <Modal title={`مدیریت معلم مستقل «${teacherState.fullname}»`} onClose={onClose}>
      <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 14 }}>{teacherState.username}</div>
      <Field label="سقف تعداد کلاس این معلم">
        <TextInput type="number" min="1" value={maxClasses} onChange={(e) => setMaxClasses(e.target.value)} style={{ maxWidth: 120 }} />
      </Field>
      <Field label="سقف کل تعداد آزمون این معلم (۰ = بدون محدودیت)">
        <TextInput type="number" min="0" value={maxExams} onChange={(e) => setMaxExams(e.target.value)} style={{ maxWidth: 120 }} />
      </Field>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <input type="checkbox" id="standalone-active-toggle" checked={active} onChange={(e) => setActive(e.target.checked)} style={{ width: 16, height: 16 }} />
        <label htmlFor="standalone-active-toggle" style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.7 }}>
          حساب فعال است — اگه غیرفعال بشه، این معلم دیگه نمی‌تونه وارد سامانه بشه (داده‌هاش دست‌نخورده می‌مونه)
        </label>
      </div>
      {msg && <div style={{ color: "#16A34A", fontSize: 13, marginBottom: 12 }}>{msg}</div>}
      <Button onClick={saveDetails} disabled={saving} style={{ marginBottom: 22 }}>{saving ? "در حال ذخیره..." : "ذخیره تغییرات"}</Button>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>کد ورود دانش‌آموزی</div>
        <div style={{ fontSize: 11.5, color: "#94A3B8", marginBottom: 10, lineHeight: 1.8 }}>
          دانش‌آموزهای این معلم برای ورود، این کد را همراه با کد شخصی خودشان وارد می‌کنند.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 800, color: "#2563EB", letterSpacing: 3, background: "#EFF6FF", padding: "8px 16px", borderRadius: 10 }}>
            {teacherState.login_code || "—"}
          </span>
          <span onClick={loginCodeBusy ? undefined : regenerateLoginCode} style={{ fontSize: 12, color: loginCodeBusy ? "#94A3B8" : "#DC2626", fontWeight: 700, cursor: loginCodeBusy ? "default" : "pointer" }}>
            {loginCodeBusy ? "در حال ساخت..." : "کد جدید"}
          </span>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>قابلیت‌های اختصاصی</div>
        <FeatureTogglePanel features={teacherState.features} onToggle={toggleFeature} />
      </div>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18, marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>رمز عبور</div>
        {showReset ? (
          <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 12 }}>
            <TextInput
              type="password"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              placeholder="رمز عبور جدید (حداقل ۸ کاراکتر)"
              style={{ marginBottom: 8 }}
            />
            {resetError && <div style={{ color: "#DC2626", fontSize: 12, marginBottom: 8 }}>{resetError}</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={savePasswordReset} disabled={resetBusy} style={{ fontSize: 12.5, padding: "7px 14px" }}>
                {resetBusy ? "در حال ذخیره..." : "ذخیره رمز جدید"}
              </Button>
              <Button variant="ghost" onClick={() => setShowReset(false)} style={{ fontSize: 12.5, padding: "7px 14px" }}>انصراف</Button>
            </div>
          </div>
        ) : (
          <Button variant="ghost" onClick={() => { setShowReset(true); setResetPassword(""); setResetError(""); }}><Edit2 size={15} />تنظیم رمز عبور جدید</Button>
        )}
      </div>

      <div style={{ borderTop: "1px solid #EEF1F6", paddingTop: 18, marginTop: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#DC2626", marginBottom: 8 }}>حذف حساب</div>
        <Button variant="ghost" onClick={deleteTeacher} style={{ color: "#DC2626" }}>
          <Trash2 size={15} />حذف حساب معلم
        </Button>
      </div>
    </Modal>
  );
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
      setExams(ex); setClasses(cl); setQuestions(qs); setStudents(dashData.students);
      setDataLoading(false);
    })();
  }, []);

  const usernameToSchool = {};
  teachers.forEach((t) => { usernameToSchool[t.username] = t.school_id || null; });

  const daysSince = (iso) => (iso ? Math.floor((Date.now() - new Date(iso).getTime()) / 86400000) : null);
  const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString("fa-IR") : "—");

  const ActivityBadge = ({ lastLogin }) => {
    const d = daysSince(lastLogin);
    if (d === null) return <Badge tone="red">هرگز وارد نشده</Badge>;
    if (d === 0) return <Badge tone="green">امروز</Badge>;
    if (d <= 7) return <Badge tone="green">{d} روز پیش</Badge>;
    if (d <= 30) return <Badge tone="orange">{d} روز پیش</Badge>;
    return <Badge tone="red">{d} روز پیش</Badge>;
  };

  const sortByActivity = (arr, sortKey) => [...arr].sort((a, b) => {
    if (sortKey === "login_count") return (b.login_count || 0) - (a.login_count || 0);
    if (sortKey === "created_at") return new Date(b.created_at || 0) - new Date(a.created_at || 0);
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

  return (
    <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
      <TopBar title="گزارش عملکرد" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />
      <div style={{ fontSize: 12.5, color: "#94A3B8", marginBottom: 18 }}>
        میزان استفاده‌ی مدیران مدرسه‌ها و معلمان مستقل از سامانه — بر اساس آخرین ورود و تعداد دفعات ورود. آمار ورود از همین الان به بعد ثبت می‌شه؛ حساب‌هایی که قبلاً بدون این قابلیت وارد شده بودن تا اولین ورود بعدیشون «هرگز وارد نشده» نشون داده می‌شن.
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
        <StatCard icon={AlertTriangle} label="هیچ‌وقت وارد نشده‌اند" value={neverLoggedInCount} color="#DC2626" />
        <StatCard icon={Clock} label="بیش از ۳۰ روز غیرفعال" value={inactive30Count} color="#D97706" />
      </div>

      {isLoading ? (
        <div style={{ color: "#94A3B8", fontSize: 13.5, padding: 20, textAlign: "center" }}>در حال بارگذاری...</div>
      ) : (
        <>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B" }}>مدیران مدرسه‌ها ({admins.length})</div>
              <select value={adminSort} onChange={(e) => setAdminSort(e.target.value)} style={sortSelectStyle}>
                <option value="last_login">مرتب‌سازی: آخرین ورود (غیرفعال‌ترین اول)</option>
                <option value="login_count">مرتب‌سازی: تعداد ورود</option>
                <option value="created_at">مرتب‌سازی: تاریخ عضویت</option>
              </select>
            </div>
            {admins.length === 0 ? (
              <EmptyState text="هنوز مدیر مدرسه‌ای ساخته نشده است." actionLabel={null} onAction={null} />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EEF1F6", color: "#94A3B8", textAlign: "right" }}>
                      <th style={thStyle}>مدیر</th>
                      <th style={thStyle}>مدرسه</th>
                      <th style={thStyle}>وضعیت ورود</th>
                      <th style={thStyle}>تعداد ورود</th>
                      <th style={thStyle}>عضویت</th>
                      <th style={thStyle}>معلم</th>
                      <th style={thStyle}>کلاس</th>
                      <th style={thStyle}>آزمون</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAdmins.map((a) => (
                      <tr key={a.username} style={{ borderBottom: "1px solid #F5F7FA" }}>
                        <td style={{ ...tdStyle, fontWeight: 700, color: "#1E293B" }}>{a.fullname}</td>
                        <td style={tdStyle}>{a.schoolName}</td>
                        <td style={tdStyle}><ActivityBadge lastLogin={a.last_login_at} /></td>
                        <td style={tdStyle}>{a.login_count || 0}</td>
                        <td style={{ ...tdStyle, color: "#94A3B8" }}>{fmtDate(a.created_at)}</td>
                        <td style={tdStyle}>{a.teacherCount}</td>
                        <td style={tdStyle}>{a.classCount}</td>
                        <td style={tdStyle}>{a.examCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B" }}>معلمان مستقل ({standaloneTeachers.length})</div>
              <select value={teacherSort} onChange={(e) => setTeacherSort(e.target.value)} style={sortSelectStyle}>
                <option value="last_login">مرتب‌سازی: آخرین ورود (غیرفعال‌ترین اول)</option>
                <option value="login_count">مرتب‌سازی: تعداد ورود</option>
                <option value="created_at">مرتب‌سازی: تاریخ عضویت</option>
              </select>
            </div>
            {standaloneTeachers.length === 0 ? (
              <EmptyState text="هنوز معلم مستقلی ساخته نشده است." actionLabel={null} onAction={null} />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EEF1F6", color: "#94A3B8", textAlign: "right" }}>
                      <th style={thStyle}>معلم</th>
                      <th style={thStyle}>وضعیت ورود</th>
                      <th style={thStyle}>تعداد ورود</th>
                      <th style={thStyle}>عضویت</th>
                      <th style={thStyle}>کلاس</th>
                      <th style={thStyle}>دانش‌آموز</th>
                      <th style={thStyle}>آزمون</th>
                      <th style={thStyle}>بانک سوال</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTeachers.map((t) => (
                      <tr key={t.username} style={{ borderBottom: "1px solid #F5F7FA" }}>
                        <td style={{ ...tdStyle, fontWeight: 700, color: "#1E293B" }}>{t.fullname}</td>
                        <td style={tdStyle}><ActivityBadge lastLogin={t.last_login_at} /></td>
                        <td style={tdStyle}>{t.login_count || 0}</td>
                        <td style={{ ...tdStyle, color: "#94A3B8" }}>{fmtDate(t.created_at)}</td>
                        <td style={tdStyle}>{t.classCount}</td>
                        <td style={tdStyle}>{t.studentCount}</td>
                        <td style={tdStyle}>{t.examCount}</td>
                        <td style={tdStyle}>{t.questionCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
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
      if (next.has(username)) next.delete(username); else next.add(username);
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

  return (
    <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
      <TopBar title="معلمان مستقل" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />
      <div style={{ fontSize: 12.5, color: "#94A3B8", marginBottom: 18 }}>
        حساب‌هایی برای معلمانی که مدرسه‌شون هنوز از این سامانه استفاده نمی‌کنه — این معلم‌ها خودشون کلاس‌های خودشون رو می‌سازن.
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B" }}>فهرست معلمان مستقل</div>
          <Button onClick={() => setShowCreate(true)}><Plus size={16} />ساخت معلم مستقل جدید</Button>
        </div>

        {loading ? (
          <div style={{ color: "#94A3B8", fontSize: 13.5, padding: 20, textAlign: "center" }}>در حال بارگذاری...</div>
        ) : standalone.length === 0 ? (
          <EmptyState text="هنوز معلم مستقلی ساخته نشده است." actionLabel="ساخت معلم مستقل جدید" onAction={() => setShowCreate(true)} />
        ) : (
          <div>
            <BulkActionBar
              count={selectedIds.size}
              busy={bulkBusy}
              onActivate={() => bulkSetActive(true)}
              onDeactivate={() => bulkSetActive(false)}
              capFields={[
                { key: "max_classes", label: "سقف کلاس" },
                { key: "max_exams", label: "سقف آزمون" },
              ]}
              onApplyCap={bulkApplyCap}
              onClear={() => setSelectedIds(new Set())}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 6px 10px", borderBottom: "1px solid #F5F7FA" }}>
              <input type="checkbox" checked={standalone.length > 0 && selectedIds.size === standalone.length} onChange={toggleSelectAll} style={{ width: 15, height: 15 }} />
              <span style={{ fontSize: 12, color: "#94A3B8" }}>انتخاب همه</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {standalone.map((t) => {
                const isActive = t.active !== false;
                return (
                  <div key={t.username} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 6px", borderBottom: "1px solid #F5F7FA" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input type="checkbox" checked={selectedIds.has(t.username)} onChange={() => toggleSelect(t.username)} style={{ width: 15, height: 15 }} />
                      <Avatar username={t.username} name={t.fullname} updatedAt={t.avatar_updated_at} size={32} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E293B", display: "flex", alignItems: "center", gap: 8 }}>
                          {t.fullname}
                          <span style={{
                            fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                            background: isActive ? "#DCFCE7" : "#FEF2F2", color: isActive ? "#16A34A" : "#DC2626",
                          }}>
                            {isActive ? "فعال" : "غیرفعال"}
                          </span>
                        </div>
                        <div style={{ fontSize: 11.5, color: "#94A3B8" }}>{t.username} — سقف {t.max_classes || 3} کلاس، سقف {t.max_exams > 0 ? t.max_exams : "نامحدود"} آزمون</div>
                      </div>
                    </div>
                    <div
                      onClick={() => setManagingTeacher(t)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#EFF6FF", cursor: "pointer" }}
                    >
                      <Settings size={16} color="#2563EB" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {showCreate && (
        <Modal title="ساخت معلم مستقل جدید" onClose={() => setShowCreate(false)}>
          <CreateStandaloneTeacherForm
            existingUsernames={teachers.map((t) => t.username)}
            onCreated={async (rec, emailResult) => {
              setShowCreate(false);
              await onChanged();
              if (emailResult && !emailResult.sent) window.alert(`حساب معلم ساخته شد، ولی ایمیل خوش‌آمد ارسال نشد:\n${emailResult.note}`);
              setManagingTeacher(rec);
            }}
          />
        </Modal>
      )}

      {managingTeacher && (
        <StandaloneTeacherDetailModal
          teacher={teachers.find((t) => t.username === managingTeacher.username) || managingTeacher}
          onClose={() => setManagingTeacher(null)}
          onChanged={onChanged}
        />
      )}
    </div>
  );
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
    if (!selectedId) return;
    const senderRole = kind === "schools" ? "admin" : "teacher";
    if (unreadCountFor(selectedId, senderRole) === 0) return;
    const updatedMap = { ...lastReadMap, [selectedId]: new Date().toISOString() };
    const updatedTeacher = { ...teacher, sa_thread_last_read: updatedMap };
    setJSON(`teacher:${teacher.username}`, updatedTeacher).then(() => { onUpdateSelf && onUpdateSelf(updatedTeacher); });
  }, [selectedId, kind, messages.length]);

  useEffect(() => {
    let cancelled = false;
    getJSON("settings:global").then((s) => { if (!cancelled) setAllowTwoWay(s?.allow_admin_to_superadmin_messages !== false); });
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
    if (la && lb) return new Date(lb) - new Date(la);
    if (la) return -1;
    if (lb) return 1;
    return (entityName(a) || "").localeCompare(entityName(b) || "");
  });

  const selectedEntity = entities.find((e) => entityId(e) === selectedId) || null;
  const thread = selectedId ? threadFor(selectedId) : [];
  const peerSenderRole = kind === "schools" ? "admin" : "teacher";
  const peerLabel = kind === "schools" ? "مدیر مدرسه" : "معلم مستقل";

  const sendReply = async () => {
    if (!replyText.trim() || !selectedId) return;
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

  return (
    <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
      <TopBar title="پیام‌ها" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />

      <div style={{
        background: "#fff", borderRadius: 14, border: "1px solid #EEF1F6", padding: "14px 18px",
        marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
      }}>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: "#1E293B" }}>پیام‌رسانی دوطرفه با مدیران مدرسه و معلمان مستقل</div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>
            {allowTwoWay ? "مدیران مدرسه‌ها و معلمان مستقل می‌توانند برای شما پیام بفرستند." : "فقط شما می‌توانید پیام بفرستید؛ ارسال پیام به شما برای مدیران و معلمان مستقل غیرفعال است."}
          </div>
        </div>
        <div
          onClick={togglingAllow ? undefined : toggleAllowTwoWay}
          style={{
            width: 46, height: 26, borderRadius: 999, background: allowTwoWay ? "#16A34A" : "#CBD5E1",
            position: "relative", cursor: togglingAllow ? "default" : "pointer", opacity: togglingAllow ? 0.6 : 1, flexShrink: 0,
          }}
        >
          <div style={{
            width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3,
            [allowTwoWay ? "right" : "left"]: 3, transition: "all .15s",
          }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[{ key: "schools", label: "مدارس" }, { key: "standalone", label: "معلمان مستقل" }].map((t) => (
          <div key={t.key} onClick={() => { setKind(t.key); setSelectedId(null); }} style={{
            padding: "8px 16px", borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 700,
            background: kind === t.key ? "#7C3AED" : "#F1F5F9", color: kind === t.key ? "#fff" : "#64748B",
          }}>{t.label}</div>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", display: "flex", minHeight: 460, overflow: "hidden" }}>
        <div style={{ width: 260, borderLeft: "1px solid #EEF1F6", overflowY: "auto", flexShrink: 0 }}>
          {loading ? (
            <div style={{ color: "#94A3B8", fontSize: 13, padding: 20, textAlign: "center" }}>در حال بارگذاری...</div>
          ) : sortedEntities.length === 0 ? (
            <div style={{ color: "#94A3B8", fontSize: 13, padding: 20, textAlign: "center" }}>
              {kind === "schools" ? "هنوز مدرسه‌ای ثبت نشده است." : "هنوز معلم مستقلی ثبت نشده است."}
            </div>
          ) : sortedEntities.map((e) => {
            const id = entityId(e);
            const t = threadFor(id);
            const last = t[t.length - 1];
            const unread = unreadCountFor(id, peerSenderRole);
            return (
              <div
                key={id}
                onClick={() => setSelectedId(id)}
                style={{
                  padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #F5F7FA",
                  background: selectedId === id ? "#F5F3FF" : "transparent",
                  display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8,
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E293B" }}>{entityName(e)}</div>
                  <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {last ? `${last.sender_role === "super_admin" ? "شما: " : ""}${last.text}` : "بدون پیام"}
                  </div>
                </div>
                {unread > 0 && (
                  <span style={{
                    flexShrink: 0, background: "#EF4444", color: "#fff", fontSize: 10.5, fontWeight: 800,
                    borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                  }}>
                    {unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 18 }}>
          {!selectedEntity ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", fontSize: 13.5 }}>
              {kind === "schools" ? "یک مدرسه را از فهرست انتخاب کنید." : "یک معلم مستقل را از فهرست انتخاب کنید."}
            </div>
          ) : (
            <React.Fragment>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #F5F7FA" }}>
                {entityName(selectedEntity)}
              </div>
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                {thread.length === 0 ? (
                  <div style={{ color: "#94A3B8", fontSize: 12.5, padding: 14, textAlign: "center" }}>هنوز پیامی رد و بدل نشده است.</div>
                ) : thread.map((m) => (
                  <div key={m.id} style={{
                    alignSelf: m.sender_role === "super_admin" ? "flex-end" : "flex-start",
                    maxWidth: "75%", background: m.sender_role === "super_admin" ? "#EFF6FF" : "#F5F3FF",
                    border: `1px solid ${m.sender_role === "super_admin" ? "#DBEAFE" : "#DDD6FE"}`,
                    borderRadius: 10, padding: "8px 12px",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: m.sender_role === "super_admin" ? "#2563EB" : "#7C3AED", marginBottom: 3 }}>
                      {m.sender_role === "super_admin" ? "شما" : (m.sender_name || peerLabel)}
                    </div>
                    <div style={{ fontSize: 13, color: "#334155", whiteSpace: "pre-wrap" }}>{m.text}</div>
                    <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 3 }}>{new Date(m.created_at).toLocaleString("fa-IR")}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <TextInput value={replyText} onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendReply(); }}
                  placeholder="پاسخ خود را بنویسید..." style={{ flex: 1 }} />
                <Button onClick={sendReply} disabled={sending || !replyText.trim()}>{sending ? "..." : "ارسال"}</Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
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
    return <MobileMenuButton onClick={() => setMobileOpen(true)} accent={accent} />;
  }
  return (
    <>
      {isMobile && <MobileSidebarBackdrop onClick={() => setMobileOpen(false)} />}
      <div style={{
        width: 230, background: "#0F1E3D", minHeight: "100%", display: "flex",
        flexDirection: "column", flexShrink: 0,
        ...(isMobile ? { position: "fixed", top: 0, bottom: 0, right: 0, zIndex: 9999, boxShadow: "-8px 0 24px rgba(0,0,0,.25)", overflowY: "auto" } : {}),
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "22px 20px", borderBottom: "1px solid #22385F" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={19} color="#fff" />
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>پنل مدیر سایت</span>
          </div>
          {isMobile && <X size={20} color="#AAB8D1" style={{ cursor: "pointer" }} onClick={() => setMobileOpen(false)} />}
        </div>
        <div style={{ padding: "14px 12px", flex: 1 }}>
          {tabs.map((t, i) => {
            const IconCmp = t.icon;
            const badgeCount = t.badgeKey && badges && badges[t.badgeKey];
            const showDivider = i > 0 && tabs[i - 1].group !== t.group;
            return (
              <React.Fragment key={t.key}>
                {showDivider && <SidebarDivider />}
                <div
                  className="sidebar-item"
                  onClick={() => goTab(t.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, marginBottom: 4, cursor: "pointer",
                    background: activeTab === t.key ? accent : "transparent", color: activeTab === t.key ? "#fff" : "#AAB8D1", fontSize: 14, fontWeight: 600,
                  }}
                >
                  <IconCmp size={17} />
                  {t.label}
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
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, marginBottom: 4, cursor: "pointer",
              color: "#AAB8D1", fontSize: 14, fontWeight: 600,
            }}
          >
            <Settings size={17} />
            تنظیمات حساب
          </div>
          <div
            className="sidebar-item"
            onClick={() => { onHelp(); setMobileOpen(false); }}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, marginBottom: 4, cursor: "pointer",
              color: "#AAB8D1", fontSize: 14, fontWeight: 600,
            }}
          >
            <HelpCircle size={17} />
            راهنما
          </div>
        </div>
        <div style={{ padding: 12, borderTop: "1px solid #22385F" }}>
          <div style={{ fontSize: 12, color: "#7C8CAE", padding: "6px 14px 12px" }}>{name}</div>
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
    getJSON("settings:global").then((s) => { if (!cancelled) setDraftSaveCount(s?.draft_save_count || 5); });
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

  const toggleSchoolSelect = (id) => {
    setSelectedSchoolIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
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

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", minHeight: "100vh", background: "#F8FAFC" }}>
      <SuperAdminSidebar onLogout={onLogout} onSettings={() => setShowOwnSettings(true)} onHelp={() => setShowHelp(true)} name={teacher.fullname} activeTab={activeTab} onTab={setActiveTab} badges={{ messages: unreadTotal }} />

      {activeTab === "standalone" ? (
        <StandaloneTeachersScreen teacher={teacher} teachers={teachers} loading={loading} onChanged={refresh} />
      ) : activeTab === "activity" ? (
        <ActivityReportScreen teacher={teacher} schools={schools} teachers={teachers} loading={loading} />
      ) : activeTab === "messages" ? (
        <SuperAdminMessagesScreen teacher={teacher} schools={schools} teachers={teachers} messages={messages} loading={loading} refresh={refresh} onUpdateSelf={onUpdateSelf} />
      ) : (
      <div style={{ flex: 1, padding: "30px 34px", overflowY: "auto" }}>
        <TopBar title="مدرسه‌ها" teacherName={teacher.fullname} avatarUsername={teacher.username} avatarUpdatedAt={teacher.avatar_updated_at} />

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
          <StatCard icon={Library} label="تعداد مدرسه‌ها" value={schools.length} color="#7C3AED" />
          <StatCard icon={Users} label="تعداد مدیران مدرسه" value={teachers.filter((t) => t.role === "admin").length} color="#2563EB" />
          <StatCard icon={GraduationCap} label="تعداد معلمان (کل)" value={teachers.filter((t) => t.role === "teacher").length} color="#16A34A" />
        </div>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B" }}>فهرست مدرسه‌ها</div>
            <Button onClick={() => setShowCreate(true)}><Plus size={16} />ساخت مدرسه جدید</Button>
          </div>

          {loading ? (
            <div style={{ color: "#94A3B8", fontSize: 13.5, padding: 20, textAlign: "center" }}>در حال بارگذاری...</div>
          ) : schools.length === 0 ? (
            <EmptyState text="هنوز مدرسه‌ای ساخته نشده است." actionLabel="ساخت مدرسه جدید" onAction={() => setShowCreate(true)} />
          ) : (
            <div style={{ overflowX: "auto" }}>
              <BulkActionBar
                count={selectedSchoolIds.size}
                busy={bulkBusy}
                onActivate={() => bulkSetSchoolsActive(true)}
                onDeactivate={() => bulkSetSchoolsActive(false)}
                capFields={[
                  { key: "max_classes", label: "سقف کلاس" },
                  { key: "max_exams_per_class_per_day", label: "سقف امتحان روزانه" },
                ]}
                onApplyCap={bulkApplySchoolCap}
                onClear={() => setSelectedSchoolIds(new Set())}
              />
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #EEF1F6", textAlign: "right" }}>
                    <th style={{ padding: "10px 6px" }}>
                      <input type="checkbox" checked={schools.length > 0 && selectedSchoolIds.size === schools.length} onChange={toggleSelectAllSchools} style={{ width: 15, height: 15 }} />
                    </th>
                    <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>نام مدرسه</th>
                    <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>وضعیت</th>
                    <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>مدیران</th>
                    <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>معلمان</th>
                    <th style={{ padding: "10px 6px", color: "#94A3B8", fontWeight: 700 }}>تاریخ ساخت</th>
                    <th style={{ padding: "10px 6px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map((s) => {
                    const c = countsFor(s.id);
                    const schoolAdmins = teachers.filter((t) => t.school_id === s.id && t.role === "admin");
                    const isActive = s.active !== false;
                    return (
                      <tr key={s.id} style={{ borderBottom: "1px solid #F5F7FA" }}>
                        <td style={{ padding: "10px 6px" }}>
                          <input type="checkbox" checked={selectedSchoolIds.has(s.id)} onChange={() => toggleSchoolSelect(s.id)} style={{ width: 15, height: 15 }} />
                        </td>
                        <td style={{ padding: "10px 6px", fontWeight: 700, color: "#1E293B" }}>{s.name}</td>
                        <td style={{ padding: "10px 6px" }}>
                          <span style={{
                            fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                            background: isActive ? "#DCFCE7" : "#FEF2F2", color: isActive ? "#16A34A" : "#DC2626",
                          }}>
                            {isActive ? "فعال" : "غیرفعال"}
                          </span>
                        </td>
                        <td style={{ padding: "10px 6px" }}>
                          {schoolAdmins.length === 0 ? (
                            c.admins
                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                              {schoolAdmins.map((a) => (
                                <div key={a.username} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <Avatar username={a.username} name={a.fullname} updatedAt={a.avatar_updated_at} size={26} />
                                  <span>{a.fullname}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "10px 6px" }}>{c.teachers}</td>
                        <td style={{ padding: "10px 6px", color: "#64748B" }}>{s.created_at ? new Date(s.created_at).toLocaleDateString("fa-IR") : "—"}</td>
                        <td style={{ padding: "10px 6px" }}>
                          <div
                            onClick={() => setManagingSchool(s)}
                            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#EFF6FF", cursor: "pointer" }}
                          >
                            <Settings size={16} color="#2563EB" />
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

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, marginTop: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>انتقال داده‌های قدیمی به D1 (یک‌بار مصرف)</div>
          <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 16 }}>
            داده‌های جدید از این به بعد خودکار هم در D1 ذخیره می‌شن تا صفحه‌ی آزمون و ورود دانش‌آموزان سریع‌تر و سبک‌تر بشه. اما داده‌های قدیمی‌تر (قبل از این بروزرسانی، برای همه‌ی مدرسه‌ها) باید یک‌بار با همین دکمه منتقل بشن. اجرای دوباره‌ش هم مشکلی نداره.
          </div>
          <Button onClick={migrateToD1} disabled={d1Busy}>انتقال به D1</Button>
          {d1Msg && <div style={{ fontSize: 13, color: d1ToneColor, fontWeight: 600, marginTop: 10, whiteSpace: "pre-wrap" }}>{d1Msg}</div>}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 24, marginTop: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>ذخیره‌ی دوره‌ای پاسخ‌ها حین امتحان</div>
          <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 16 }}>
            در طول هر امتحان، پاسخ‌های دانش‌آموزها به‌صورت دوره‌ای روی سرور هم ذخیره می‌شن (برای وقتی دانش‌آموز مجبور بشه دستگاه عوض کنه). این عدد یعنی چند بار این ذخیره‌ی دوره‌ای در طول کل مدت هر امتحان انجام بشه — عدد بیشتر یعنی امنیت جواب‌ها بیشتر ولی مصرف سهمیه‌ی رایگان کلادفلر هم بیشتر؛ عدد کمتر برعکس. پیش‌فرض و پیشنهادی: ۵.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="number" min={2} max={10} value={draftSaveCount}
              onChange={(e) => setDraftSaveCount(e.target.value)}
              style={{ width: 80, padding: "8px 10px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 14, textAlign: "center" }}
            />
            <Button onClick={saveDraftSaveCount} disabled={draftSaveBusy}>ذخیره</Button>
            {draftSaveMsg && <span style={{ fontSize: 12.5, color: "#16A34A", fontWeight: 600 }}>{draftSaveMsg}</span>}
          </div>
        </div>
      </div>
      )}

      {showCreate && (
        <Modal title="ساخت مدرسه‌ی جدید" onClose={() => setShowCreate(false)}>
          <CreateSchoolForm
            existingUsernames={teachers.map((t) => t.username)}
            onCreated={async (school, admin, emailResult) => {
              setShowCreate(false);
              await refresh();
              if (emailResult && !emailResult.sent) window.alert(`مدرسه و حساب مدیر ساخته شد، ولی ایمیل خوش‌آمد ارسال نشد:\n${emailResult.note}`);
              setManagingSchool(school);
            }}
          />
        </Modal>
      )}

      {managingSchool && (
        <SchoolDetailModal
          school={schools.find((s) => s.id === managingSchool.id) || managingSchool}
          admins={teachers.filter((t) => t.school_id === managingSchool.id && t.role === "admin")}
          teacherCount={teachers.filter((t) => t.school_id === managingSchool.id && t.role === "teacher").length}
          existingUsernames={teachers.map((t) => t.username)}
          onClose={() => setManagingSchool(null)}
          onChanged={refresh}
        />
      )}

      {showHelp && (
        <Modal title="راهنمای پنل مدیر سایت" onClose={() => setShowHelp(false)}>
          <div style={{ fontSize: 13.5, color: "#334155", lineHeight: 2.1 }}>
            <b>مدرسه‌ها:</b> از این بخش مدرسه‌ی جدید بساز (همراه با یک حساب مدیر مدرسه)، مدرسه را غیرفعال/فعال کن، سقف تعداد کلاس‌ها/آزمون‌های روزانه‌ش را تنظیم کن، برای هر مدرسه چند مدیر بگذار، و از داخل جزئیات هر مدرسه رمز عبور مدیر یا معلم‌هایش را در صورت نیاز مستقیماً بازنشانی کن. دکمه‌ی «انتقال به D1» یک ابزار فنی برای سرعت‌بخشیدن به پایگاه‌داده است؛ معمولاً نیازی به استفاده از آن نیست.
            <br /><br />
            <b>قابلیت‌های مدرسه (پلن):</b> از داخل جزئیات هر مدرسه، هوش مصنوعی و چت کلاسی را می‌توانی برای کل مدرسه (یعنی مدیر + همه‌ی معلم‌هایش) روشن یا خاموش کنی — این یک سوییچ سراسری برای همان مدرسه است، نه برای هر معلم جداگانه.
            <br /><br />
            <b>معلمان مستقل:</b> حساب‌های معلمی که به هیچ مدرسه‌ای وصل نیستند و خودشان کلاس/آزمون خودشان را مدیریت می‌کنند. اینجا می‌توانی سقف تعداد کلاس و آزمونشان را تنظیم کنی، فعال/غیرفعال‌شان کنی، و هوش مصنوعی/چت کلاسی را به‌صورت شخصی (نه گروهی) برای هرکدام روشن یا خاموش کنی.
            <br /><br />
            <b>گزارش عملکرد:</b> فهرست همه‌ی مدیران مدرسه و معلمان مستقل به همراه آخرین ورود، تعداد دفعات ورود، و تاریخ عضویت — برای دیدن اینکه کدام حساب‌ها فعال‌اند و کدام‌ها مدتی است استفاده نشده‌اند.
            <br /><br />
            <b>پیام‌ها:</b> گفتگوی دوطرفه‌ی مستقیم تو با مدیران مدرسه‌ها و همچنین معلمان مستقل — از بالای صفحه بین این دو دسته جابه‌جا شو. با کلید بالای صفحه می‌توانی ارسال پیام از طرف آن‌ها به تو را کلاً غیرفعال کنی (خودت همیشه می‌توانی پیام بفرستی).
            <br /><br />
            <b>عملیات گروهی:</b> با انتخاب چند مدرسه یا چند معلم مستقل با تیک، می‌توانی همه را با هم فعال/غیرفعال کنی یا یک سقف مشترک برایشان تنظیم کنی.
            <br /><br />
            <b>تنظیمات حساب:</b> تغییر رمز عبور و اطلاعات حساب خودت.
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
