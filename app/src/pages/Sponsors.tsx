
import { trpc } from "@/providers/trpc";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import { Reveal } from "@/components/Reveal";
import { Handshake, ExternalLink, Mail } from "lucide-react";

export default function Sponsors() {
  const { data: sponsors, isLoading } =
    trpc.content.sponsors.useQuery();

  const big = sponsors?.filter((s) => s.tier === "big") ?? [];
  const small = sponsors?.filter((s) => s.tier === "small") ?? [];

  const SponsorCard = ({
    s,
    large = false,
  }: {
    s: NonNullable<typeof sponsors>[number];
    large?: boolean;
  }) => (
    <a
      href={s.link && s.link !== "#" ? s.link : undefined}
      target="_blank"
      rel="noreferrer"
      className={`group flex flex-col items-center justify-center border border-border bg-[#171a10] p-8 text-center transition-colors hover:border-[#d2ff00]/60 ${
        large ? "min-h-[220px]" : "min-h-[160px]"
      }`}
    >
      <span
        className={`font-display uppercase leading-tight text-[#f4f4ed] transition-colors group-hover:text-[#d2ff00] ${
          large ? "text-3xl" : "text-xl"
        }`}
      >
        {s.name}
      </span>

      <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#d2ff00]">
        {s.category}
      </span>

      {s.tagline && (
        <span className="mt-2 text-sm text-[#6b705c]">
          {s.tagline}
        </span>
      )}

      {s.link && s.link !== "#" && (
        <ExternalLink className="mt-3 h-4 w-4 text-[#6b705c] group-hover:text-[#d2ff00]" />
      )}
    </a>
  );

  return (
    <PageLayout>
      <PageHeader
        kicker="Our Fuel"
        title="Spon"
        accent="Sors"
        subtitle="The partners who keep Burnout on track — and why your brand belongs on this grid."
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Big Sponsors */}
          <h2 className="font-display text-2xl uppercase text-[#f4f4ed]">
            Big <span className="text-[#d2ff00]">Sponsors</span>
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Loading placeholders */}
            {isLoading &&
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-52 animate-pulse border border-border bg-[#171a10]"
                />
              ))}

            {/* Sponsors loaded from the database */}
            {big.map((s, i) => (
              <Reveal key={s.id} delay={i * 90}>
                <SponsorCard s={s} large />
              </Reveal>
            ))}

            {/* Demo sponsor — independent of database data */}
            <Reveal>
              <article className="group flex min-h-[220px] flex-col items-center justify-center border border-dashed border-[#d2ff00]/40 bg-[#171a10] p-8 text-center transition-colors hover:border-[#d2ff00]/60">
                <img
                  src="/images/apex-motors.svg"
                  alt="Apex Motors logo"
                  className="mb-5 h-16 max-w-[180px] object-contain"
                />

                <span className="font-display text-3xl uppercase leading-tight text-[#f4f4ed] transition-colors group-hover:text-[#d2ff00]">
                  Apex Motors
                </span>

                <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#d2ff00]">
                  Example Sponsor
                </span>

                <span className="mt-2 text-sm text-[#6b705c]">
                  Demo entry — not an official sponsor
                </span>
              </article>
            </Reveal>
          </div>

          {/* Small Sponsors */}
          <h2 className="font-display mt-16 text-2xl uppercase text-[#f4f4ed]">
            Small <span className="text-[#d2ff00]">Sponsors</span>
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {small.map((s, i) => (
              <Reveal key={s.id} delay={i * 90}>
                <SponsorCard s={s} />
              </Reveal>
            ))}
          </div>

          {/* Why Sponsor */}
          <div className="mt-20 grid gap-10 border border-border bg-[#0c0e09] p-8 sm:p-12 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="font-display text-3xl uppercase leading-tight text-[#f4f4ed]">
                Why sponsor{" "}
                <span className="text-[#d2ff00]">us?</span>
              </h2>

              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[#b4b8a5]">
                <li>
                  → 1000+ live footfall at TechSrijan — engineering students,
                  faculty and motorsport fans.
                </li>
                <li>
                  → Logo placement on track banners, certificates, team kits
                  and event livestream.
                </li>
                <li>
                  → Direct access to MMMUT's mechanical, electrical, and CS
                  talent pool.
                </li>
                <li>
                  → Amplification across SAE MMMUT and TechSrijan social
                  channels.
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-center border-l-0 border-border lg:border-l lg:pl-10">
              <Handshake className="h-10 w-10 text-[#d2ff00]" />

              <p className="font-display mt-4 text-xl uppercase text-[#f4f4ed]">
                Join the grid
              </p>

              <p className="mt-2 text-sm text-[#b4b8a5]">
                Reach our sponsorship coordinators — Shreyansh Singh Sengar &amp;
                Kabir.
              </p>

              <a
                href="mailto:abhinavpratapsingh010@gmail.com"
                className="mt-5 inline-flex items-center gap-2 bg-[#d2ff00] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e] transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}