import { ArrowLeft, Download, Maximize2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const slideCount = 21;
const slides = Array.from({ length: slideCount }, (_, index) => ({
  number: index + 1,
  src: `/slides/verilog-fpga-game/slide-${index + 1}.png`,
}));

export const metadata: Metadata = {
  title: "Verilog FPGA Game Slides",
  description: "Online presentation for the Basys 3 VGA game project.",
};

export default function VerilogFpgaGameSlidesPage() {
  return (
    <main className="min-h-screen bg-[#0c0d12] px-5 py-10 text-white sm:px-8 sm:py-14 lg:px-12 lg:py-16">
      <header className="mx-auto max-w-5xl border-b border-white/15 pb-8 sm:pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#35d3dd]">
          Verilog / Basys 3 / Presentation
        </p>
        <div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h1 className="font-display text-5xl leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Ping-Pong Game
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">
              Group 7 final project presentation for the Basys 3 VGA game system.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-4 font-mono text-xs uppercase tracking-[0.12em]">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 border-b border-white/25 pb-2 text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35d3dd]"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Back to work
            </Link>
            <a
              href="/slides/verilog-fpga-game.pptx"
              download
              className="inline-flex items-center gap-2 border-b border-white/25 pb-2 text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35d3dd]"
            >
              <Download className="size-3.5" aria-hidden />
              Download PPTX
            </a>
          </div>
        </div>
      </header>

      <ol className="mx-auto mt-10 grid max-w-5xl gap-10 sm:mt-14 sm:gap-14">
        {slides.map((slide, index) => (
          <li key={slide.number} id={`slide-${slide.number}`} className="scroll-mt-6">
            <figure>
              <figcaption className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-white/45">
                <span>Slide {String(slide.number).padStart(2, "0")}</span>
                <span>{String(slide.number).padStart(2, "0")} / {slideCount}</span>
              </figcaption>
              <a
                href={slide.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open slide ${slide.number} at full size`}
                className="group relative block overflow-hidden border border-white/20 bg-[#12131b] shadow-[0_24px_80px_rgba(0,0,0,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35d3dd] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0c0d12]"
              >
                <Image
                  src={slide.src}
                  alt={`Verilog FPGA Game presentation slide ${slide.number} of ${slideCount}`}
                  width={1440}
                  height={810}
                  priority={index === 0}
                  sizes="(max-width: 1023px) calc(100vw - 40px), 1024px"
                  className="h-auto w-full"
                />
                <span className="absolute right-3 top-3 grid size-9 place-items-center bg-black/65 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                  <Maximize2 className="size-4" aria-hidden />
                </span>
              </a>
            </figure>
          </li>
        ))}
      </ol>

      <footer className="mx-auto mt-14 flex max-w-5xl justify-end border-t border-white/15 pt-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35d3dd]"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Back to selected work
        </Link>
      </footer>
    </main>
  );
}
