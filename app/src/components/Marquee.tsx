export function Marquee({
  items,
  slow = false,
  className = "",
}: {
  items: string[];
  slow?: boolean;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y border-border bg-[#0c0e09] ${className}`}>
      <div
        className={`flex w-max items-center gap-0 whitespace-nowrap py-3 ${
          slow ? "animate-marquee-slow" : "animate-marquee"
        }`}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-lg uppercase tracking-wide text-[#f4f4ed]">
              {item}
            </span>
            <span className="mx-6 inline-block h-2 w-2 rotate-45 bg-[#d2ff00]" />
          </span>
        ))}
      </div>
    </div>
  );
}
