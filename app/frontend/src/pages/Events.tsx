import { trpc } from "@/providers/trpc";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import { Reveal } from "@/components/Reveal";
import { Flag, Instagram } from "lucide-react";

export default function Events() {
  const { data: events, isLoading } = trpc.events.list.useQuery();

  return (
    <PageLayout>
      <PageHeader
        kicker="Race Calendar"
        title="Hot"
        accent="Events"
        subtitle="Every showdown on the Burnout program — posters, reels and race-day details."
      />
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            [0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-80 animate-pulse border border-border bg-[#171a10]" />
            ))}
          {events?.map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 100}>
              <article className="group flex h-full flex-col border border-border bg-[#171a10]">
                {e.posterUrl ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={e.posterUrl}
                      alt={e.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="speedlines flex aspect-[4/3] items-center justify-center bg-[#12140e]">
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
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#b4b8a5]">{e.description}</p>
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
          {events?.length === 0 && (
            <p className="col-span-full border border-dashed border-border p-12 text-center text-[#6b705c]">
              No events announced yet — the grid is being set. Check back soon.
            </p>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
