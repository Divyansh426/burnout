import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import { Reveal } from "@/components/Reveal";
import { CheckCircle2, Clock, XCircle, Upload, Copy, Loader2 } from "lucide-react";

const BRANCHES = [
  "Mechanical Engineering",
  "Electrical Engineering",
  "Electronics and Communication Engineering",
  "Computer Science and Engineering",
  "Information Technology",
  "Civil Engineering",
  "Chemical Engineering",
  "Other",
];

const inputCls =
  "h-12 w-full border border-border bg-[#12140e] px-4 text-sm text-[#f4f4ed] outline-none placeholder:text-[#6b705c] focus:border-[#d2ff00]";
const labelCls = "mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#b4b8a5]";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve((r.result as string).split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function Register() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const { data: myReg, isLoading: regLoading } = trpc.registrations.mine.useQuery(undefined, {
    enabled: isAuthenticated,
    retry: false,
  });
  const { data: pay } = trpc.registrations.paymentSettings.useQuery();

  const submit = trpc.registrations.submit.useMutation({
    onSuccess: () => utils.registrations.mine.invalidate(),
  });
  const uploadShot = trpc.uploads.paymentScreenshot.useMutation();

  const [form, setForm] = useState({
    teamName: "",
    leaderName: "",
    leaderRoll: "",
    leaderBranch: BRANCHES[0],
    leaderPhone: "",
    leaderEmail: "",
    member1Name: "",
    member1Roll: "",
    member2Name: "",
    member2Roll: "",
    member3Name: "",
    member3Roll: "",
    member4Name: "",
    member4Roll: "",
    transactionRef: "",
  });
  const [shot, setShot] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  const memberCount = useMemo(
    () => [form.member1Name, form.member2Name, form.member3Name, form.member4Name].filter(Boolean).length,
    [form]
  );

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^\d{10}$/.test(form.leaderPhone)) {
      setError("Leader phone must be exactly 10 digits.");
      return;
    }
    try {
      setUploading(true);
      let paymentScreenshotKey: string | undefined;
      if (shot) {
        const contentBase64 = await fileToBase64(shot);
        const saved = await uploadShot.mutateAsync({
          fileName: `payments/${Date.now()}-${shot.name}`,
          contentBase64,
          contentType: shot.type,
        });
        paymentScreenshotKey = saved.key;
      }
      await submit.mutateAsync({ ...form, paymentScreenshotKey });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || (isAuthenticated && regLoading)) {
    return (
      <PageLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#d2ff00]" />
        </div>
      </PageLayout>
    );
  }

  const statusBadge = (status: string) =>
    status === "verified" ? (
      <span className="flex items-center gap-2 bg-[#d2ff00] px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#12140e]">
        <CheckCircle2 className="h-4 w-4" /> Verified
      </span>
    ) : status === "rejected" ? (
      <span className="flex items-center gap-2 bg-[#ff6b4a] px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#12140e]">
        <XCircle className="h-4 w-4" /> Rejected
      </span>
    ) : (
      <span className="flex items-center gap-2 border border-[#d2ff00]/50 px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#d2ff00]">
        <Clock className="h-4 w-4" /> Pending review
      </span>
    );

  return (
    <PageLayout>
      <PageHeader
        kicker="Grid Entry"
        title="Regis"
        accent="Ter"
        subtitle="Sign in, fill your crew details, pay via UPI and upload the payment proof. Race control verifies every entry."
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {!isAuthenticated ? (
            <Reveal>
              <div className="border border-border bg-[#171a10] p-10 text-center">
                <h2 className="font-display text-2xl uppercase text-[#f4f4ed]">Sign in to enter the grid</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-[#b4b8a5]">
                  Team registration needs a signed-in account so you can track your status later.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-6 bg-[#d2ff00] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e]"
                >
                  Sign in 
                </button>
              </div>
            </Reveal>
          ) : myReg ? (
            /* ---------- existing registration status ---------- */
            <Reveal>
              <div className="border border-border bg-[#171a10]">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b705c]">My Registration</p>
                    <h2 className="font-display mt-1 text-3xl uppercase text-[#f4f4ed]">{myReg.teamName}</h2>
                  </div>
                  {statusBadge(myReg.status)}
                </div>
                <div className="grid gap-px bg-border sm:grid-cols-2">
                  <div className="bg-[#12140e] p-6">
                    <p className={labelCls}>Team Leader</p>
                    <p className="text-[#f4f4ed]">{myReg.leaderName}</p>
                    <p className="mt-1 text-sm text-[#6b705c]">
                      {myReg.leaderRoll} · {myReg.leaderBranch}
                    </p>
                    <p className="text-sm text-[#6b705c]">{myReg.leaderPhone}</p>
                  </div>
                  <div className="bg-[#12140e] p-6">
                    <p className={labelCls}>Crew Members</p>
                    {[myReg.member1Name, myReg.member2Name, myReg.member3Name, myReg.member4Name]
                      .filter(Boolean)
                      .map((m) => (
                        <p key={m} className="text-[#f4f4ed]">{m}</p>
                      ))}
                    {!myReg.member1Name && <p className="text-sm text-[#6b705c]">No additional members</p>}
                  </div>
                </div>
                {myReg.adminNote && (
                  <div className="border-t border-border p-6">
                    <p className={labelCls}>Race Control Note</p>
                    <p className="text-sm text-[#b4b8a5]">{myReg.adminNote}</p>
                  </div>
                )}
                {myReg.paymentScreenshotUrl && (
                  <div className="border-t border-border p-6">
                    <p className={labelCls}>Payment Proof</p>
                    <a href={myReg.paymentScreenshotUrl} target="_blank" rel="noreferrer">
                      <img src={myReg.paymentScreenshotUrl} alt="Payment screenshot" className="max-h-48 border border-border" />
                    </a>
                  </div>
                )}
                <p className="border-t border-border px-6 py-4 text-xs uppercase tracking-wider text-[#6b705c]">
                  Submitted {new Date(myReg.createdAt).toLocaleString()} · ID #{myReg.id}
                </p>
              </div>
            </Reveal>
          ) : (
            /* ---------- registration form ---------- */
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              <Reveal>
                <form onSubmit={onSubmit} className="border border-border bg-[#171a10] p-6 sm:p-8">
                  <h2 className="font-display text-2xl uppercase text-[#f4f4ed]">Team Details</h2>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className={labelCls}>Team Name *</label>
                      <input required className={inputCls} value={form.teamName} onChange={set("teamName")} placeholder="e.g. Throttle Titans" />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>Leader Name *</label>
                        <input required className={inputCls} value={form.leaderName} onChange={set("leaderName")} />
                      </div>
                      <div>
                        <label className={labelCls}>Leader Roll Number *</label>
                        <input required className={inputCls} value={form.leaderRoll} onChange={set("leaderRoll")} />
                      </div>
                      <div>
                        <label className={labelCls}>Leader Branch *</label>
                        <select className={inputCls} value={form.leaderBranch} onChange={set("leaderBranch")}>
                          {BRANCHES.map((b) => (
                            <option key={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Leader Phone *</label>
                        <input
                          required
                          className={inputCls}
                          value={form.leaderPhone}
                          onChange={set("leaderPhone")}
                          placeholder="10-digit phone"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Leader Email</label>
                      <input type="email" className={inputCls} value={form.leaderEmail} onChange={set("leaderEmail")} placeholder={user?.email ?? "you@example.com"} />
                    </div>

                    <div className="border-t border-border pt-5">
                      <p className={labelCls}>Crew Members (optional, up to 4) — {memberCount}/4 added</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {([1, 2, 3, 4] as const).map((n) => (
                          <div key={n} className="space-y-2 border border-border/60 p-3">
                            <input
                              className={inputCls}
                              placeholder={`Member ${n} name`}
                              value={form[`member${n}Name` as keyof typeof form]}
                              onChange={set(`member${n}Name` as keyof typeof form)}
                            />
                            <input
                              className={inputCls}
                              placeholder={`Member ${n} roll no.`}
                              value={form[`member${n}Roll` as keyof typeof form]}
                              onChange={set(`member${n}Roll` as keyof typeof form)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border pt-5">
                      <label className={labelCls}>Transaction Reference / UTR</label>
                      <input className={inputCls} value={form.transactionRef} onChange={set("transactionRef")} placeholder="UPI transaction ID" />
                    </div>

                    <div>
                      <label className={labelCls}>Payment Screenshot *</label>
                      <label className="flex h-28 cursor-pointer flex-col items-center justify-center border border-dashed border-border bg-[#12140e] text-[#6b705c] transition-colors hover:border-[#d2ff00]/60 hover:text-[#d2ff00]">
                        <Upload className="h-5 w-5" />
                        <span className="mt-2 text-xs uppercase tracking-wider">
                          {shot ? shot.name : "Upload screenshot (max 5 MB)"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setShot(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>

                    {error && (
                      <p className="border border-[#ff6b4a]/40 bg-[#1a1410] px-4 py-3 text-sm text-[#ffb199]">{error}</p>
                    )}
                    {submit.isSuccess && (
                      <p className="border border-[#d2ff00]/40 bg-[#141a08] px-4 py-3 text-sm text-[#d2ff00]">
                        Registration submitted! Race control will verify your payment shortly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={uploading || submit.isPending}
                      className="flex w-full items-center justify-center gap-2 bg-[#d2ff00] py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e] disabled:opacity-50"
                    >
                      {(uploading || submit.isPending) && <Loader2 className="h-4 w-4 animate-spin" />}
                      {uploading ? "Uploading…" : submit.isPending ? "Submitting…" : "Submit registration"}
                    </button>
                  </div>
                </form>
              </Reveal>

              {/* payment panel */}
              <Reveal delay={120}>
                <aside className="border border-border bg-[#0c0e09] p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6b705c]">Payment Bay</p>
                  <p className="font-display mt-2 text-3xl text-[#d2ff00]">
                    {pay?.registrationFee ?? "₹3000"}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#6b705c]">registration fee</p>

                  {pay?.qrUrl ? (
                    <img src={pay.qrUrl} alt="UPI QR code" className="mt-5 w-full border border-border" />
                  ) : (
                    <div className="speedlines mt-5 flex h-44 items-center justify-center border border-border text-xs uppercase tracking-wider text-[#6b705c]">
                      QR published by admin
                    </div>
                  )}

                  <div className="mt-5 space-y-3 text-sm">
                    {pay?.upiId && (
                      <div className="flex items-center justify-between border border-border bg-[#12140e] px-3 py-2.5">
                        <span className="truncate text-[#f4f4ed]">{pay.upiId}</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(pay.upiId ?? "");
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1500);
                          }}
                          className="ml-2 flex items-center gap-1 text-xs font-bold uppercase text-[#d2ff00]"
                        >
                          <Copy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    )}
                    {pay?.accountNumber && (
                      <p className="text-[#b4b8a5]">
                        A/C <span className="text-[#f4f4ed]">{pay.accountNumber}</span>
                        {pay.ifsc ? ` · IFSC ${pay.ifsc}` : ""}
                      </p>
                    )}
                    {pay?.bankName && <p className="text-xs text-[#6b705c]">{pay.bankName}{pay.accountHolder ? ` · ${pay.accountHolder}` : ""}</p>}
                  </div>
                  <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-[#6b705c]">
                    Pay first, then attach the screenshot and transaction reference in the form.
                    Registrations without valid proof stay pending.
                  </p>
                </aside>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
