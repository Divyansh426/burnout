import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="speedlines flex min-h-screen flex-col items-center justify-center bg-[#12140e] px-4 text-center">
      <p className="font-display text-[clamp(5rem,20vw,12rem)] uppercase leading-none text-stroke">404</p>
      <p className="font-display mt-2 text-2xl uppercase text-[#f4f4ed]">Off track</p>
      <p className="mt-3 max-w-sm text-sm text-[#b4b8a5]">
        This corner doesn't exist on the Burnout circuit. Head back to the main straight.
      </p>
      <Link
        to="/"
        className="mt-8 bg-[#d2ff00] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e]"
      >
        Back to home
      </Link>
    </div>
  );
}
