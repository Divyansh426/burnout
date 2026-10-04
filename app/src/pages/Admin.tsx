import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import {
  LayoutDashboard,
  Flag,
  Users,
  Trophy,
  QrCode,
  Trash2,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

const inputCls =
  "h-11 w-full border border-border bg-[#12140e] px-3 text-sm text-[#f4f4ed] outline-none placeholder:text-[#6b705c] focus:border-[#d2ff00]";
const labelCls = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#b4b8a5]";

type Tab = "dashboard" | "events" | "registrations" | "points" | "payment";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function validateImage(file: File): string | null {
  if (!file.type.startsWith("image/")) return "Please choose an image file.";
  if (file.size > MAX_IMAGE_SIZE) return "Image must be 5 MB or smaller.";
  return null;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong. Please try again.";
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const result = typeof r.result === "string" ? r.result : "";
      const base64 = result.split(",")[1];
      if (!base64) {
        reject(new Error("Could not read this image. Please choose it again."));
        return;
      }
      resolve(base64);
    };
    r.onerror = () => reject(new Error("Could not read this image. Please try again."));
    r.readAsDataURL(file);
  });
}

export default function Admin() {
  const { user, isLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#d2ff00]" />
        </div>
      </PageLayout>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <PageLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="font-display text-4xl uppercase text-[#f4f4ed]">Race control only</h1>
          <p className="mt-3 max-w-md text-[#b4b8a5]">
            This pit lane is restricted to admins. Sign in with an organiser account to continue.
          </p>
        </div>
      </PageLayout>
    );
  }

  const tabs: [Tab, string, React.ReactNode][] = [
    ["dashboard", "Dashboard", <LayoutDashboard className="h-4 w-4" />],
    ["events", "Hot Events", <Flag className="h-4 w-4" />],
    ["registrations", "Registrations", <Users className="h-4 w-4" />],
    ["points", "Points", <Trophy className="h-4 w-4" />],
    ["payment", "QR & UPI", <QrCode className="h-4 w-4" />],
  ];

  return (
    <PageLayout>
      <PageHeader kicker="Race Control" title="Ad" accent="min" subtitle="Manage events, registrations, scoring and payment settings." />
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {tabs.map(([key, label, icon]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex h-11 items-center gap-2 px-5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                  tab === key
                    ? "bg-[#d2ff00] text-[#12140e]"
                    : "border border-border bg-[#0c0e09] text-[#b4b8a5] hover:text-[#f4f4ed]"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {tab === "dashboard" && <Dashboard />}
            {tab === "events" && <EventsAdmin />}
            {tab === "registrations" && <RegistrationsAdmin />}
            {tab === "points" && <PointsAdmin />}
            {tab === "payment" && <PaymentAdmin />}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

/* ================= DASHBOARD ================= */
function Dashboard() {
  const { data: regs } = trpc.registrations.listAll.useQuery();
  const { data: events } = trpc.events.list.useQuery();
  const { data: board } = trpc.leaderboard.list.useQuery();

  const stats = [
    { label: "Registrations", value: regs?.length ?? "—" },
    { label: "Pending review", value: regs?.filter((r) => r.status === "pending").length ?? "—" },
    { label: "Verified teams", value: regs?.filter((r) => r.status === "verified").length ?? "—" },
    { label: "Hot events", value: events?.length ?? "—" },
    { label: "Teams on board", value: board?.length ?? "—" },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="border border-border bg-[#171a10] p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6b705c]">{s.label}</p>
            <p className="font-display mt-2 text-4xl text-[#d2ff00]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-border bg-[#171a10]">
        <p className="border-b border-border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6b705c]">
          Latest registrations
        </p>
        {(regs ?? []).slice(0, 6).map((r) => (
          <div key={r.id} className="flex items-center justify-between border-b border-border/50 px-5 py-3 last:border-0">
            <div>
              <p className="font-display uppercase text-[#f4f4ed]">{r.teamName}</p>
              <p className="text-xs text-[#6b705c]">{r.leaderName} · {r.leaderBranch}</p>
            </div>
            <StatusPill status={r.status} />
          </div>
        ))}
        {regs?.length === 0 && <p className="px-5 py-8 text-center text-sm text-[#6b705c]">No registrations yet.</p>}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  if (status === "verified")
    return (
      <span className="flex items-center gap-1.5 bg-[#d2ff00] px-3 py-1 text-[11px] font-bold uppercase text-[#12140e]">
        <CheckCircle2 className="h-3.5 w-3.5" /> Verified
      </span>
    );
  if (status === "rejected")
    return (
      <span className="flex items-center gap-1.5 bg-[#ff6b4a] px-3 py-1 text-[11px] font-bold uppercase text-[#12140e]">
        <XCircle className="h-3.5 w-3.5" /> Rejected
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 border border-[#d2ff00]/50 px-3 py-1 text-[11px] font-bold uppercase text-[#d2ff00]">
      <Clock className="h-3.5 w-3.5" /> Pending
    </span>
  );
}

/* ================= EVENTS ================= */
function EventsAdmin() {
  const utils = trpc.useUtils();
  const { data: events } = trpc.events.list.useQuery();
  const create = trpc.events.create.useMutation({ onSuccess: () => utils.events.invalidate() });
  const remove = trpc.events.remove.useMutation({ onSuccess: () => utils.events.invalidate() });
  const uploadPoster = trpc.uploads.eventPoster.useMutation({ onSuccess: () => utils.events.invalidate() });

  const [form, setForm] = useState({ name: "", description: "", instagramReel: "", eventDate: "", venue: "", showOnHomepage: true });
  const [poster, setPoster] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");
    setSuccessMessage("");

    if (poster) {
      const validationError = validateImage(poster);
      if (validationError) {
        setUploadError(validationError);
        return;
      }
    }

    setBusy(true);
    try {
      const { id } = await create.mutateAsync(form);
      if (poster) {
        const contentBase64 = await fileToBase64(poster);
        await uploadPoster.mutateAsync({
          eventId: id,
          fileName: poster.name,
          contentBase64,
          contentType: poster.type,
        });
      }
      setForm({ name: "", description: "", instagramReel: "", eventDate: "", venue: "", showOnHomepage: true });
      setPoster(null);
      setSuccessMessage(poster ? "Event created and poster uploaded." : "Event created.");
    } catch (error) {
      setUploadError(getErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form onSubmit={submit} className="h-fit border border-border bg-[#171a10] p-6">
        <h3 className="font-display text-xl uppercase text-[#f4f4ed]">Add hot event</h3>
        <div className="mt-5 space-y-4">
          <div>
            <label className={labelCls}>Event name *</label>
            <input required className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Description *</label>
            <textarea
              required
              rows={4}
              className="w-full border border-border bg-[#12140e] px-3 py-2.5 text-sm text-[#f4f4ed] outline-none focus:border-[#d2ff00]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Date / day</label>
              <input className={inputCls} value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} placeholder="Day 1" />
            </div>
            <div>
              <label className={labelCls}>Venue</label>
              <input className={inputCls} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="Track B" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Instagram reel link</label>
            <input className={inputCls} value={form.instagramReel} onChange={(e) => setForm({ ...form, instagramReel: e.target.value })} placeholder="https://instagram.com/reel/…" />
          </div>
          <div>
            <label className={labelCls}>Poster image</label>
            <label className="flex h-20 cursor-pointer items-center justify-center gap-2 border border-dashed border-border text-xs uppercase tracking-wider text-[#6b705c] hover:border-[#d2ff00]/60 hover:text-[#d2ff00]">
              <Upload className="h-4 w-4" /> {poster ? poster.name : "Choose image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setUploadError("");
                  setSuccessMessage("");
                  if (file) {
                    const validationError = validateImage(file);
                    if (validationError) {
                      setPoster(null);
                      setUploadError(validationError);
                      e.target.value = "";
                      return;
                    }
                  }
                  setPoster(file);
                }}
              />
            </label>
            <p className="mt-1 text-[11px] text-[#6b705c]">Image only · maximum 5 MB</p>
          </div>
          {uploadError && <p role="alert" className="text-sm text-[#ff6b4a]">{uploadError}</p>}
          {successMessage && <p role="status" className="text-sm text-[#d2ff00]">{successMessage}</p>}
          <label className="flex items-center gap-3 text-sm text-[#b4b8a5]">
            <input
              type="checkbox"
              checked={form.showOnHomepage}
              onChange={(e) => setForm({ ...form, showOnHomepage: e.target.checked })}
              className="h-4 w-4 accent-[#d2ff00]"
            />
            Show on homepage
          </label>
          <button disabled={busy} className="flex w-full items-center justify-center gap-2 bg-[#d2ff00] py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e] disabled:opacity-50">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Create event
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {(events ?? []).map((e) => (
          <div key={e.id} className="flex items-center gap-4 border border-border bg-[#171a10] p-4">
            {e.posterUrl && <img src={e.posterUrl} alt="" className="h-16 w-16 border border-border object-cover" />}
            <div className="min-w-0 flex-1">
              <p className="font-display truncate uppercase text-[#f4f4ed]">{e.name}</p>
              <p className="truncate text-xs text-[#6b705c]">
                {[e.eventDate, e.venue].filter(Boolean).join(" · ") || "No date"} {e.showOnHomepage ? "· Homepage" : ""}
              </p>
            </div>
            <button
              onClick={() => remove.mutate({ id: e.id })}
              className="flex h-10 w-10 items-center justify-center border border-border text-[#ff6b4a] hover:border-[#ff6b4a]"
              aria-label="Delete event"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {events?.length === 0 && (
          <p className="border border-dashed border-border p-8 text-center text-sm text-[#6b705c]">
            No hot events yet — create the first one.
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= REGISTRATIONS ================= */
function RegistrationsAdmin() {
  const utils = trpc.useUtils();
  const { data: regs, isLoading } = trpc.registrations.listAll.useQuery();
  const review = trpc.registrations.review.useMutation({ onSuccess: () => utils.registrations.invalidate() });
  const [filter, setFilter] = useState<string>("all");

  const filtered = regs?.filter((r) => filter === "all" || r.status === filter) ?? [];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "verified", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`h-10 px-4 text-xs font-bold uppercase tracking-[0.14em] ${
              filter === f ? "bg-[#d2ff00] text-[#12140e]" : "border border-border text-[#b4b8a5]"
            }`}
          >
            {f} {f !== "all" && regs ? `(${regs.filter((r) => r.status === f).length})` : ""}
          </button>
        ))}
      </div>

      {isLoading && <div className="mt-6 h-48 animate-pulse border border-border bg-[#171a10]" />}

      <div className="mt-6 space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="border border-border bg-[#171a10] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg uppercase text-[#f4f4ed]">{r.teamName}</p>
                <p className="mt-1 text-xs text-[#6b705c]">
                  #{r.id} · {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
              <StatusPill status={r.status} />
            </div>
            <div className="mt-4 grid gap-3 text-sm text-[#b4b8a5] sm:grid-cols-2 lg:grid-cols-4">
              <p>Leader: <span className="text-[#f4f4ed]">{r.leaderName}</span></p>
              <p>Roll: <span className="text-[#f4f4ed]">{r.leaderRoll}</span></p>
              <p>Branch: <span className="text-[#f4f4ed]">{r.leaderBranch}</span></p>
              <p>Phone: <span className="text-[#f4f4ed]">{r.leaderPhone}</span></p>
            </div>
            <p className="mt-2 text-sm text-[#b4b8a5]">
              Crew:{" "}
              <span className="text-[#f4f4ed]">
                {[r.member1Name, r.member2Name, r.member3Name, r.member4Name].filter(Boolean).join(", ") || "—"}
              </span>
            </p>
            {r.transactionRef && (
              <p className="mt-1 text-sm text-[#b4b8a5]">UTR: <span className="text-[#f4f4ed]">{r.transactionRef}</span></p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {r.paymentScreenshotUrl ? (
                <a href={r.paymentScreenshotUrl} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-wider text-[#d2ff00] underline underline-offset-4">
                  View payment proof
                </a>
              ) : (
                <span className="text-xs uppercase tracking-wider text-[#ff6b4a]">No payment screenshot</span>
              )}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => review.mutate({ id: r.id, status: "verified" })}
                  className="flex h-10 items-center gap-1.5 bg-[#d2ff00] px-4 text-xs font-bold uppercase text-[#12140e]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verify
                </button>
                <button
                  onClick={() => review.mutate({ id: r.id, status: "rejected" })}
                  className="flex h-10 items-center gap-1.5 bg-[#ff6b4a] px-4 text-xs font-bold uppercase text-[#12140e]"
                >
                  <XCircle className="h-3.5 w-3.5" /> Reject
                </button>
                <button
                  onClick={() => review.mutate({ id: r.id, status: "pending" })}
                  className="flex h-10 items-center gap-1.5 border border-border px-4 text-xs font-bold uppercase text-[#b4b8a5]"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && !isLoading && (
          <p className="border border-dashed border-border p-8 text-center text-sm text-[#6b705c]">
            No registrations in this lane.
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= POINTS ================= */
function PointsAdmin() {
  const utils = trpc.useUtils();
  const { data: board } = trpc.leaderboard.list.useQuery();
  const upsert = trpc.leaderboard.upsert.useMutation({ onSuccess: () => utils.leaderboard.invalidate() });
  const remove = trpc.leaderboard.remove.useMutation({ onSuccess: () => utils.leaderboard.invalidate() });

  const empty = {
    teamName: "",
    prefinalQualified: false,
    prefinalPosition: 0,
    prefinalPoints: 0,
    finalQualified: false,
    finalPosition: 0,
    finalPoints: 0,
    durability: 0,
    manoeuvrability: 0,
    technical: 0,
    mixedBonus: 0,
  };
  const [form, setForm] = useState(empty);

  const num = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: Number(e.target.value) });

  const edit = (t: NonNullable<typeof board>[number]) =>
    setForm({
      teamName: t.teamName,
      prefinalQualified: t.prefinalQualified,
      prefinalPosition: t.prefinalPosition,
      prefinalPoints: t.prefinalPoints,
      finalQualified: t.finalQualified,
      finalPosition: t.finalPosition,
      finalPoints: t.finalPoints,
      durability: t.durability,
      manoeuvrability: t.manoeuvrability,
      technical: t.technical,
      mixedBonus: t.mixedBonus,
    });

  const numField = (label: string, key: keyof typeof empty, max: number) => (
    <div>
      <label className={labelCls}>{label} (max {max})</label>
      <input type="number" min={0} max={max} className={inputCls} value={form[key] as number} onChange={num(key)} />
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          upsert.mutate(form, { onSuccess: () => setForm(empty) });
        }}
        className="h-fit border border-border bg-[#171a10] p-6"
      >
        <h3 className="font-display text-xl uppercase text-[#f4f4ed]">Score a team</h3>
        <p className="mt-1 text-xs text-[#6b705c]">Same team name = update. Max total 325.</p>
        <div className="mt-5 space-y-4">
          <div>
            <label className={labelCls}>Team name *</label>
            <input required className={inputCls} value={form.teamName} onChange={(e) => setForm({ ...form, teamName: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {numField("Pre-final pts", "prefinalPoints", 40)}
            {numField("Pre-final pos", "prefinalPosition", 99)}
            {numField("Final pts", "finalPoints", 100)}
            {numField("Final pos", "finalPosition", 99)}
            {numField("Durability", "durability", 75)}
            {numField("Manoeuvrability", "manoeuvrability", 50)}
            {numField("Technical", "technical", 50)}
            {numField("Mixed bonus", "mixedBonus", 10)}
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-[#b4b8a5]">
              <input type="checkbox" className="h-4 w-4 accent-[#d2ff00]" checked={form.prefinalQualified} onChange={(e) => setForm({ ...form, prefinalQualified: e.target.checked })} />
              Pre-final ✓
            </label>
            <label className="flex items-center gap-2 text-sm text-[#b4b8a5]">
              <input type="checkbox" className="h-4 w-4 accent-[#d2ff00]" checked={form.finalQualified} onChange={(e) => setForm({ ...form, finalQualified: e.target.checked })} />
              Final ✓
            </label>
          </div>
          <button disabled={upsert.isPending} className="flex w-full items-center justify-center gap-2 bg-[#d2ff00] py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e] disabled:opacity-50">
            {upsert.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save score
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {(board ?? []).map((t) => (
          <div key={t.id} className="flex items-center gap-4 border border-border bg-[#171a10] p-4">
            <span className="font-display w-8 text-xl text-[#6b705c]">#{t.rank}</span>
            <div className="min-w-0 flex-1">
              <p className="font-display truncate uppercase text-[#f4f4ed]">{t.teamName}</p>
              <p className="text-xs text-[#6b705c]">
                Pre {t.prefinalPoints} · Final {t.finalPoints} · Dur {t.durability} · Man {t.manoeuvrability} · Tech {t.technical} · Bonus {t.mixedBonus}
              </p>
            </div>
            <span className="font-display text-2xl text-[#d2ff00]">{t.total}</span>
            <button onClick={() => edit(t)} className="h-10 border border-border px-4 text-xs font-bold uppercase text-[#b4b8a5] hover:text-[#d2ff00]">
              Edit
            </button>
            <button
              onClick={() => remove.mutate({ id: t.id })}
              className="flex h-10 w-10 items-center justify-center border border-border text-[#ff6b4a] hover:border-[#ff6b4a]"
              aria-label="Delete team"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {board?.length === 0 && (
          <p className="border border-dashed border-border p-8 text-center text-sm text-[#6b705c]">No teams scored yet.</p>
        )}
      </div>
    </div>
  );
}

/* ================= PAYMENT ================= */
function PaymentAdmin() {
  const utils = trpc.useUtils();
  const { data: pay } = trpc.registrations.paymentSettings.useQuery();
  const update = trpc.registrations.updatePaymentSettings.useMutation({
    onSuccess: () => utils.registrations.paymentSettings.invalidate(),
  });
  const uploadQr = trpc.uploads.paymentQr.useMutation({
    onSuccess: () => utils.registrations.paymentSettings.invalidate(),
  });

  const [form, setForm] = useState<{
    upiId: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
    accountHolder: string;
    registrationFee: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const current = form ?? {
    upiId: pay?.upiId ?? "",
    accountNumber: pay?.accountNumber ?? "",
    ifsc: pay?.ifsc ?? "",
    bankName: pay?.bankName ?? "",
    accountHolder: pay?.accountHolder ?? "",
    registrationFee: pay?.registrationFee ?? "",
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await update.mutateAsync(current);
          setForm(null);
        }}
        className="border border-border bg-[#171a10] p-6"
      >
        <h3 className="font-display text-xl uppercase text-[#f4f4ed]">Bank & UPI details</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {(
            [
              ["UPI ID", "upiId"],
              ["Registration fee", "registrationFee"],
              ["Account number", "accountNumber"],
              ["IFSC", "ifsc"],
              ["Bank name", "bankName"],
              ["Account holder", "accountHolder"],
            ] as [string, keyof typeof current][]
          ).map(([label, key]) => (
            <div key={key}>
              <label className={labelCls}>{label}</label>
              <input className={inputCls} value={current[key]} onChange={(e) => setForm({ ...current, [key]: e.target.value })} />
            </div>
          ))}
        </div>
        <button disabled={update.isPending} className="mt-6 flex items-center gap-2 bg-[#d2ff00] px-8 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e] disabled:opacity-50">
          {update.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save details
        </button>
      </form>

      <aside className="h-fit border border-border bg-[#171a10] p-6">
        <h3 className="font-display text-xl uppercase text-[#f4f4ed]">QR code</h3>
        {pay?.qrUrl ? (
          <img src={pay.qrUrl} alt="Current QR" className="mt-4 w-full border border-border" />
        ) : (
          <div className="speedlines mt-4 flex h-44 items-center justify-center border border-border text-xs uppercase tracking-wider text-[#6b705c]">
            No QR uploaded yet
          </div>
        )}
        {uploadError && <p role="alert" className="mt-3 text-sm text-[#ff6b4a]">{uploadError}</p>}
        {uploadSuccess && <p role="status" className="mt-3 text-sm text-[#d2ff00]">{uploadSuccess}</p>}
        <label className="mt-4 flex h-14 cursor-pointer items-center justify-center gap-2 border border-dashed border-border text-xs uppercase tracking-wider text-[#6b705c] hover:border-[#d2ff00]/60 hover:text-[#d2ff00]">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {busy ? "Uploading…" : "Upload new QR"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;

              setUploadError("");
              setUploadSuccess("");
              const validationError = validateImage(f);
              if (validationError) {
                setUploadError(validationError);
                e.target.value = "";
                return;
              }

              setBusy(true);
              try {
                const contentBase64 = await fileToBase64(f);
                await uploadQr.mutateAsync({
                  fileName: f.name,
                  contentBase64,
                  contentType: f.type,
                });
                setUploadSuccess("QR code uploaded successfully.");
              } catch (error) {
                setUploadError(getErrorMessage(error));
              } finally {
                setBusy(false);
                e.target.value = "";
              }
            }}
          />
        </label>
      </aside>
    </div>
  );
}
