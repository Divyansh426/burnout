import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { PageLayout } from "@/components/PageLayout";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { BookOpen, Download, ExternalLink } from "lucide-react";
import { ArrowRight, Flag, Timer, Trophy, Wrench, Instagram, MapPin, CalendarDays } from "lucide-react";

   const POINTS_SCHEME = [
     { label: "Pre-Final Race", points: 100, note: "Head-to-head groups" },
     { label: "Final Race", points: 75, note: "The grand showdown" },
     { label: "Manoeuvrability", points: 50, note: "8-shaped track" },
     { label: "Durability", points: 50, note: "Ramp jump" },
     { label: "Technical Inspection", points: 40, note: "25 + 15 innovation bonus" },
     { label: "Mixed Team Bonus", points: 10, note: "Min 2 boys & 2 girls" },
   ];

const DIVISIONS = [
  {
    name: "DISCO",
    desc: "The technical division focused on engineering, technical development, and supporting the club's automotive projects.",
  },
  {
    name: "BAJA",
    desc: "Off-road beasts built to survive the roughest terrain. Mud, jumps and punishment — the BAJA division thrives on it.",
  },
  {
    name: "SUPRA",
    desc: "Formula-style machines engineered for speed and precision. Aerodynamics, chassis tuning and driver skill combined.",
  },
  {
    name: "AERO MODELING",
    desc: "RC aircraft that lift engineering into the sky. Lift, thrust and payload — designed, built and flown by students.",
  },
  
];

const WHY_SPONSOR = [
  "Direct reach to 1000+ live footfall of engineering students and motorsport fans",
  "Brand placement on track banners, team kits and the event livestream",
  "Recruitment access to MMMUT's top mechanical, electrical and CS talent",
  "Social media amplification across SAE MMMUT ",
];

export default function Home() {
  const { data: hotEvents } = trpc.events.homepage.useQuery();
  const { data: sponsors } = trpc.content.sponsors.useQuery();

  return (
    <PageLayout>
      {/* ============ HERO ============ */}
      <section className="speedlines noise relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden px-4 sm:px-6">
        {/* ghost word */}
        <div className="font-display pointer-events-none absolute -right-8 top-10 select-none text-[26vw] uppercase leading-none text-stroke-faint">
          Race
        </div>
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="live-dot h-2.5 w-2.5 rounded-full bg-[#d2ff00]" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d2ff00]">
              SAE Collegiate Club · MMMUT 
            </p>
          </div>

          <h1 className="font-display mt-6 text-[clamp(4rem,14vw,12rem)] uppercase leading-[0.82] text-[#f4f4ed]">
            Burn<span className="text-[#d2ff00]">out</span>
          </h1>
          <p className="font-display mt-2 text-[clamp(1.4rem,4vw,3rem)] uppercase leading-tight text-stroke">
            RC Racing · Engineering · Glory
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_320px]">
            <div>
              <p className="max-w-xl text-base leading-relaxed text-[#b4b8a5] sm:text-lg">
                Build it. Tune it. Race it. Burnout is the flagship RC racing showdown of
                SAE Collegiate Club  at Madan Mohan Malviya University of Technology — 325 points of
                speed, durability and pure engineering between you and the podium.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="group flex items-center gap-2 bg-[#d2ff00] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e] transition-transform hover:-translate-y-1"
                >
                  Register your team
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/leaderboard"
                  className="flex items-center gap-2 border border-[#f4f4ed]/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#f4f4ed] transition-colors hover:border-[#d2ff00] hover:text-[#d2ff00]"
                >
                  Live leaderboard
                </Link>
              </div>
            </div>

            {/* event meta panel */}
            <div className="border border-border bg-[#0c0e09]/80 p-6 backdrop-blur">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6b705c]">
                Race telemetry
              </p>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-center gap-3 text-[#f4f4ed]">
                  <CalendarDays className="h-4 w-4 text-[#d2ff00]" /> Annual Tech Fest
                </li>
                <li className="flex items-center gap-3 text-[#f4f4ed]">
                  <MapPin className="h-4 w-4 text-[#d2ff00]" /> MMMUT Campus, Gorakhpur
                </li>
                <li className="flex items-center gap-3 text-[#f4f4ed]">
                  <Flag className="h-4 w-4 text-[#d2ff00]" /> Teams of 2–5 racers
                </li>
                <li className="flex items-center gap-3 text-[#f4f4ed]">
                  <Trophy className="h-4 w-4 text-[#d2ff00]" /> 325 points on the table
                </li>
                <li className="flex items-center gap-3 text-[#f4f4ed]">
                  <Timer className="h-4 w-4 text-[#d2ff00]" /> Qualifiers → Pre-final → Final
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RULEBOOK ============ */}
      <section className="px-4 py-16 sm:px-6">
  <div className="mx-auto grid max-w-7xl gap-8 border border-border bg-[#171a10] p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-center">
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d2ff00]">
        Official Event Document
      </p>

      <h2 className="font-display mt-3 text-3xl uppercase text-[#f4f4ed] sm:text-4xl">
        BURNOUT <span className="text-[#d2ff00]">Rulebook</span>
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#b4b8a5]">
        Read the official OffRoad BURNOUT rulebook for competition
        details, participation requirements, event stages, scoring,
        and rules.
      </p>

      <p className="mt-3 text-xs uppercase tracking-wider text-[#6b705c]">
        SAE Collegiate Club 
      </p>
    </div>

    <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
      <a
        href="/documents/burnout-rulebook.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 border border-[#d2ff00] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#d2ff00] transition-colors hover:bg-[#d2ff00] hover:text-[#12140e]"
      >
        <BookOpen className="h-4 w-4" />
        Open Rulebook
        <ExternalLink className="h-3 w-3" />
      </a>

      <a
        href="/documents/burnout-rulebook.pdf"
        download="BURNOUT-OffRoad-Rulebook.pdf"
        className="inline-flex items-center justify-center gap-2 bg-[#d2ff00] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#12140e] transition-colors hover:bg-[#e2ff66]"
      >
        <Download className="h-4 w-4" />
        Download PDF
      </a>
    </div>
  </div>
      </section>

            
      <Marquee
        items={[
          "Burnout",
          "SAE",
          "MMMUT",
          
          "Disco",
          "BAJA ",
          "SUPRA ",
          "Aero Modeling",
          "325 Points",
        ]}
      />

      {/* ============ ABOUT / DIVISIONS ============ */}
      <section className="relative px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d2ff00]">The Club</p>
            <h2 className="font-display mt-3 max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[0.9] text-[#f4f4ed]">
              Society of Automotive <span className="text-stroke">Engineers</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[#b4b8a5]">
              The SAE Collegiate Club at MMMUT Gorakhpur is where classroom theory meets the
              workshop floor. Four competitive divisions, one obsession: machines that move.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
            {DIVISIONS.map((d, i) => (
              <Reveal key={d.name} delay={i * 120}>
                <div className="group relative flex min-h-[280px] h-full flex-col bg-[#171a10] p-6 transition-colors hover:bg-[#1c2013] sm:p-8 lg:p-10">
                  <span className="font-display text-5xl text-stroke-faint transition-colors group-hover:text-stroke">
                    0{i + 1}
                  </span>
                  <h3 className="font-display mt-8 text-2xl uppercase text-[#f4f4ed]">{d.name}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#b4b8a5] sm:text-base">{d.desc}</p>
                  <div className="mt-auto h-1 w-12 bg-[#d2ff00] transition-all duration-300 group-hover:w-20" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOT EVENTS ============ */}
      <section className="diagonal-top relative bg-[#0c0e09] px-4 pb-24 pt-32 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d2ff00]">On Track</p>
              <h2 className="font-display mt-3 text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[0.9] text-[#f4f4ed]">
                Hot <span className="text-[#d2ff00]">Events</span>
              </h2>
            </div>
            <Link
              to="/events"
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#b4b8a5] hover:text-[#d2ff00]"
            >
              All events
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(hotEvents ?? []).slice(0, 3).map((e, i) => (
              <Reveal key={e.id} delay={i * 120}>
                <article className="group flex h-full flex-col border border-border bg-[#12140e]">
                  {e.posterUrl ? (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={e.posterUrl}
                        alt={e.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="speedlines flex aspect-[4/3] items-center justify-center bg-[#171a10]">
                      <Flag className="h-10 w-10 text-[#d2ff00]/40" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {(e.eventDate || e.venue) && (
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d2ff00]">
                        {[e.eventDate, e.venue].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <h3 className="font-display mt-2 text-xl uppercase leading-tight text-[#f4f4ed]">
                      {e.name}
                    </h3>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm text-[#b4b8a5]">{e.description}</p>
                    {e.instagramReel && (
                      <a
                        href={e.instagramReel}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b4b8a5] hover:text-[#d2ff00]"
                      >
                        <Instagram className="h-4 w-4" /> Watch the reel
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
            {!hotEvents && [0, 1, 2].map((i) => (
              <div key={i} className="h-72 animate-pulse border border-border bg-[#171a10]" />
            ))}
            {hotEvents?.length === 0 && (
              <p className="col-span-3 border border-dashed border-border p-10 text-center text-[#6b705c]">
                Events drop soon — stay on the throttle.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ============ POINTS SCHEME ============ */}
      <section className="relative px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d2ff00]">Scoring</p>
            <h2 className="font-display mt-3 text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[0.9] text-[#f4f4ed]">
              325 Points. <span className="text-stroke">One Winner.</span>
            </h2>
          </Reveal>

          <div className="mt-12 space-y-3">
            {POINTS_SCHEME.map((p, i) => (
              <Reveal key={p.label} delay={i * 70}>
                <div className="group flex items-center gap-4 border border-border bg-[#171a10] px-5 py-4 transition-colors hover:border-[#d2ff00]/60 sm:gap-8 sm:px-8">
                  <span className="font-display w-8 text-lg text-[#6b705c]">0{i + 1}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg uppercase text-[#f4f4ed] sm:text-xl">{p.label}</h3>
                    <p className="text-xs uppercase tracking-wider text-[#6b705c]">{p.note}</p>
                  </div>
                  <div className="hidden h-2 flex-1 overflow-hidden bg-[#0c0e09] md:block">
                    <div
                      className="h-full bg-[#d2ff00] transition-all duration-700 group-hover:brightness-125"
                      style={{ width: `${(p.points / 100) * 100}%` }}
                    />
                  </div>
                  <span className="font-display text-2xl text-[#d2ff00] sm:text-3xl">{p.points}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPONSORS STRIP ============ */}
      {sponsors && sponsors.length > 0 && (
        <section className="border-y border-border bg-[#0c0e09] py-14">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-[#6b705c]">
            Fuelled by our sponsors
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6">
            {sponsors.slice(0, 6).map((s) => (
              <span
                key={s.id}
                className="font-display text-xl uppercase text-[#6b705c] transition-colors hover:text-[#d2ff00]"
              >
                {s.name}
              </span>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/sponsors"
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#b4b8a5] underline-offset-4 hover:text-[#d2ff00] hover:underline"
            >
              Become a sponsor
            </Link>
          </div>
        </section>
      )}

      {/* ============ WHY SPONSOR ============ */}
      <section className="relative px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d2ff00]">Partners</p>
            <h2 className="font-display mt-3 text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[0.9] text-[#f4f4ed]">
              Why sponsor <span className="text-[#d2ff00]">the grid?</span>
            </h2>
            <p className="mt-6 max-w-md text-[#b4b8a5]">
              Burnout puts your brand in front of hundreds of engineers mid-throttle — at
              across campus, and online.
            </p>
            <Link
              to="/sponsors"
              className="group mt-8 inline-flex items-center gap-2 bg-[#d2ff00] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e] transition-transform hover:-translate-y-1"
            >
              Partner with us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="space-y-4">
            {WHY_SPONSOR.map((w, i) => (
              <Reveal key={w} delay={i * 100}>
                <div className="flex items-start gap-4 border-l-2 border-[#d2ff00] bg-[#171a10] p-5">
                  <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-[#d2ff00]" />
                  <p className="text-sm leading-relaxed text-[#f4f4ed]">{w}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="speedlines diagonal-top relative bg-[#d2ff00] px-4 pb-20 pt-32 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.85] text-[#12140e]">
            Start your engine
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-semibold uppercase tracking-[0.15em] text-[#12140e]/70">
            Registrations open · Teams of 2–5 · Limited grid slots
          </p>
          <Link
            to="/register"
            className="mt-9 inline-flex items-center gap-2 bg-[#12140e] px-10 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#d2ff00] transition-transform hover:-translate-y-1"
          >
            Register now <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </PageLayout>
  );
}
