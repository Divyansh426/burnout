import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatWidget } from "./ChatWidget";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#12140e]">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  accent,
  subtitle,
}: {
  kicker: string;
  title: string;
  accent: string;
  subtitle?: string;
}) {
  return (
    <section className="speedlines relative overflow-hidden border-b border-border bg-[#0c0e09] px-4 pb-14 pt-16 sm:px-6">
      <div className="noise absolute inset-0" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d2ff00]">{kicker}</p>
        <h1 className="font-display mt-3 text-[clamp(3rem,9vw,7rem)] uppercase leading-[0.85] text-[#f4f4ed]">
          {title} <span className="text-stroke">{accent}</span>
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base text-[#b4b8a5]">{subtitle}</p>}
      </div>
    </section>
  );
}
