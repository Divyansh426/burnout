import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import { Reveal } from "@/components/Reveal";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";

function rankStyle(rank: number) {
  if (rank === 1) return "bg-[#d2ff00] text-[#12140e]";
  if (rank === 2) return "bg-[#c9ccb8] text-[#12140e]";
  if (rank === 3) return "bg-[#b0793a] text-[#12140e]";
  return "bg-[#1c2013] text-[#b4b8a5]";
}

export default function Leaderboard() {
  const { data: board, isLoading, dataUpdatedAt } = trpc.leaderboard.list.useQuery(undefined, {
    refetchInterval: 30000,
  });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <PageLayout>
      <PageHeader
        kicker="Live Standings"
        title="Leader"
        accent="Board"
        subtitle={`Race control updates standings as results come in. Auto-refreshes every 30s · Last update ${new Date(dataUpdatedAt).toLocaleTimeString()}`}
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          {isLoading && <div className="h-64 animate-pulse border border-border bg-[#171a10]" />}

          {board?.length === 0 && (
            <p className="border border-dashed border-border p-12 text-center text-[#6b705c]">
              The grid is empty — scores appear here once race control publishes results.
            </p>
          )}

          {/* header row */}
          {board && board.length > 0 && (
            <div className="hidden grid-cols-[64px_1fr_110px_110px] gap-4 border-b border-border px-5 pb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b705c] sm:grid">
              <span>Rank</span>
              <span>Team</span>
              <span className="text-right">Rounds</span>
              <span className="text-right">Total / 325</span>
            </div>
          )}

          <div className="mt-2 space-y-2">
            {board?.map((t, i) => {
              const open = expanded === t.id;
              return (
                <Reveal key={t.id} delay={Math.min(i, 8) * 60}>
                  <div className="border border-border bg-[#171a10]">
                    <button
                      onClick={() => setExpanded(open ? null : t.id)}
                      className="grid w-full grid-cols-[48px_1fr_auto] items-center gap-3 px-4 py-4 text-left sm:grid-cols-[64px_1fr_110px_110px] sm:gap-4 sm:px-5"
                    >
                      <span
                        className={`font-display flex h-10 w-10 items-center justify-center text-lg ${rankStyle(t.rank)}`}
                      >
                        {t.rank}
                      </span>
                      <span className="flex items-center gap-2">
                        {t.rank === 1 && <Trophy className="h-4 w-4 text-[#d2ff00]" />}
                        <span className="font-display text-lg uppercase tracking-wide text-[#f4f4ed] sm:text-xl">
                          {t.teamName}
                        </span>
                      </span>
                      <span className="hidden text-right text-xs uppercase tracking-wider text-[#6b705c] sm:block">
                        {t.prefinalQualified ? "Pre ✓" : "Pre —"} · {t.finalQualified ? "Final ✓" : "Final —"}
                      </span>
                      <span className="flex items-center justify-end gap-2">
                        <span className="font-display text-2xl text-[#d2ff00] sm:text-3xl">{t.total}</span>
                        {open ? (
                          <ChevronUp className="h-4 w-4 text-[#6b705c]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[#6b705c]" />
                        )}
                      </span>
                    </button>

                    {open && (
                      <div className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
                        {[
                             ["Pre-Final", t.prefinalPoints, 100, t.prefinalPosition ? `P${t.prefinalPosition}` : "—"],
   ["Final", t.finalPoints, 75, t.finalPosition ? `P${t.finalPosition}` : "—"],
   ["Durability", t.durability, 50, ""],
   ["Manoeuvr.", t.manoeuvrability, 50, ""],
   ["Tech Insp.", t.technical, 40, ""],
   ["Mixed Bonus", t.mixedBonus, 10, ""],
                        ].map(([label, val, max, pos]) => (
                          <div key={label as string} className="bg-[#12140e] p-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b705c]">
                              {label}
                            </p>
                            <p className="font-display mt-1 text-xl text-[#f4f4ed]">
                              {val}
                              <span className="text-sm text-[#6b705c]">/{max}</span>
                            </p>
                            {pos ? (
                              <p className="text-[10px] uppercase tracking-wider text-[#d2ff00]">{pos}</p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
