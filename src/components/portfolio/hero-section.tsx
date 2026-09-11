import BrandMark from "@/components/portfolio/brand-mark";
import HeroNavigation from "@/components/portfolio/hero-navigation";
import { DATA } from "@/data/resume";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="about"
      aria-labelledby="hero-heading"
      className="hero-section full-bleed relative -mt-10 min-h-[100svh] overflow-hidden bg-background sm:-mt-14 lg:-mt-16"
    >
      <div className="hero-dark-plane absolute inset-0 bg-[#15171a]" aria-hidden />
      <div className="hero-blueprint-line absolute inset-y-0 left-[43%] z-[1] hidden w-px md:block" aria-hidden />
      <div className="hero-exit-plane absolute inset-x-0 bottom-0 z-[2] h-16" aria-hidden />

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6 sm:px-10 lg:px-14 lg:py-8">
          <a
            href="#about"
            className="hero-wordmark hero-copy-left"
          >
            <span>JF</span>
            <span className="text-white/45">Selected works</span>
          </a>
          <HeroNavigation />
        </div>
      </header>

      <div className="hero-layout relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-rows-[72svh_auto] px-6 sm:px-10 md:grid-cols-[48%_52%] md:grid-rows-1 md:items-center lg:px-14">
        <div className="hero-copy-left flex max-w-sm flex-col items-start pt-32 text-white md:justify-center md:pt-0 md:pl-8 2xl:pl-12">
          <div className="hero-identity-mark" aria-label="Johnson Fan identity mark">
            <span className="hero-identity-slash" aria-hidden />
            <span className="hero-identity-letters">JF</span>
            <span className="hero-signal-dot" aria-hidden />
          </div>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white/52">
            Archive no. 01 — 2026
          </p>
          <h1 id="hero-heading" className="font-display mt-4 text-6xl leading-[0.84] tracking-[-0.045em] sm:text-7xl lg:text-[6.5rem]">
            Johnson
            <br />
            Fan
          </h1>
          <p className="mt-5 text-xl tracking-[0.08em] text-white/72">范舜傑</p>
          <div className="mt-8 flex items-center gap-3" aria-label="Education">
            <BrandMark
              src="/brands/ncku.jpg"
              alt="National Cheng Kung University logo"
              className="rounded-none border-white/20 bg-white"
            />
            <div className="leading-tight">
              <p className="whitespace-nowrap text-sm font-medium text-white/70">
                National Cheng Kung University
              </p>
              <p className="mt-1 text-sm text-white/48">Engineering Science</p>
            </div>
          </div>
        </div>

        <div className="hero-copy-right flex items-end pb-16 md:items-center md:pb-0 md:pl-[15%] lg:pl-[18%]">
          <div className="max-w-lg">
            <p className="section-kicker md:ml-[clamp(1.5rem,2vw,2.5rem)]">
              <span>01</span> About
            </p>
            <p className="hero-intro font-display mt-7 text-3xl leading-[1.05] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-[3.35rem]">
              {DATA.heroIntro}
            </p>
            <p className="mt-7 max-w-[34rem] text-base leading-7 text-muted-foreground sm:text-[1.05rem] sm:leading-8">
              Based in {DATA.location}. This archive follows the work, decisions, and lessons behind the systems I build.
            </p>
            <a
              href="#experience"
              data-scene-target="experience"
              className="editorial-link mt-10"
            >
              Explore the work
              <ArrowDown className="editorial-link-arrow size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
