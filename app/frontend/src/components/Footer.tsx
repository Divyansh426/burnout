import { Link } from "react-router";
import { Gauge, Instagram, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[#0c0e09]">
      <div className="track-dash w-full" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#d2ff00]">
              <Gauge
                className="h-5 w-5 text-[#12140e]"
                strokeWidth={2.5}
              />
            </span>

            <span className="font-display text-2xl uppercase text-[#f4f4ed]">
              Burn<span className="text-[#d2ff00]">out</span>
            </span>
          </div>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#b4b8a5]">
            The flagship RC racing event by SAE Collegiate Club MMMUT —
            Society of Automotive Engineers, Madan Mohan Malviya University of
            Technology, Gorakhpur.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg uppercase tracking-wide text-[#f4f4ed]">
            Pit Stops
          </h4>

          <ul className="mt-4 space-y-2 text-sm text-[#b4b8a5]">
            {[
              ["Events", "/events"],
              ["Leaderboard", "/leaderboard"],
              ["Register", "/register"],
              ["About Us", "/about"],
              ["Sponsors", "/sponsors"],
              ["Creators", "/creators"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="transition-colors hover:text-[#d2ff00]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg uppercase tracking-wide text-[#f4f4ed]">
            Race Control
          </h4>

          <ul className="mt-4 space-y-3 text-sm text-[#b4b8a5]">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d2ff00]" />
              MMMUT Campus, Gorakhpur, Uttar Pradesh
            </li>

            <li className="flex items-start gap-2">
              <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-[#d2ff00]" />
              @sae.mmmut
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs uppercase tracking-[0.2em] text-[#6b705c]">
        SAE Collegiate Club MMMUT · Burnout
      </div>
    </footer>
  );
}