import BrandMark from "@/components/portfolio/brand-mark";
import { DATA } from "@/data/resume";
import { ArrowDown } from "lucide-react";

const navigation = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#learning-notes", label: "Learning Notes" },
];

export default function HeroSection() {
  return (
    <section
      id="about"
      aria-labelledby="hero-heading"
      className="full-bleed relative -mt-10 min-h-[100svh] overflow-hidden bg-background sm:-mt-14 lg:-mt-16"
    >
      <div className="hero-dark-plane absolute inset-0 bg-[#171815]" aria-hidden />

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6 sm:px-10 lg:px-14 lg:py-8">
          <a
            href="#about"
            className="hero-copy-left rounded-sm font-mono text-xs font-medium uppercase tracking-[0.22em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#171815]"
          >
            JF / Portfolio
          </a>
          <nav aria-label="Primary navigation" className="hero-copy-right">
            <ul className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-[0.68rem] font-medium uppercase tracking-[0.15em] text-white md:gap-x-7 md:text-foreground">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-sm py-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-rows-[72svh_auto] px-6 sm:px-10 md:grid-cols-[48%_52%] md:grid-rows-1 md:items-center lg:px-14">
        <div className="hero-copy-left flex max-w-sm flex-col items-start pt-32 text-white md:justify-center md:pt-0">
          <div className="flex items-center gap-4">
            <div className="grid size-20 place-items-center rounded-full border border-white/35 bg-white/5 font-mono text-2xl tracking-[0.12em] sm:size-24">
              JF
            </div>
            <BrandMark
              src="/brands/ncku.jpg"
              alt="National Cheng Kung University logo"
              className="border-white/15 bg-white/95"
            />
          </div>
          <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/55">
            Engineering portfolio / 2026
          </p>
          <h1 id="hero-heading" className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Johnson
            <br />
            Fan
          </h1>
          <p className="mt-4 text-lg tracking-wide text-white/68">范舜傑</p>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-white/68">
            Engineering Science
            <br />
            National Cheng Kung University
          </p>
        </div>

        <div className="hero-copy-right flex items-end pb-16 md:items-center md:pb-0 md:pl-[15%] lg:pl-[18%]">
          <div className="max-w-lg">
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-primary">
              About / 01
            </p>
            <p className="mt-6 text-2xl font-medium leading-snug tracking-[-0.025em] text-foreground sm:text-3xl lg:text-[2.15rem]">
              {DATA.heroIntro}
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              Based in {DATA.location}. This archive follows the work, decisions, and lessons behind the systems I build.
            </p>
            <a
              href="#experience"
              className="mt-9 inline-flex items-center gap-3 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              Explore the work
              <ArrowDown className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
