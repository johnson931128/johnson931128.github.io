import Link from "next/link";

export const metadata = {
  title: "Verilog FPGA Game Demo",
  description: "Video demo for the Basys 3 VGA game project.",
};

export default function VerilogFpgaGameDemoPage() {
  return (
    <main className="full-bleed relative min-h-svh bg-[#0b0e12] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <header className="grid gap-8 border-b border-white/16 pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#35d3dd]">
              Verilog / Basys 3 / Demo
            </p>
            <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              FPGA game demo
            </h1>
          </div>
          <Link
            href="/#work"
            className="w-fit border-b border-white/30 pb-1 text-sm text-white/65 transition-colors hover:border-[#35d3dd] hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Back to selected work
          </Link>
        </header>

        <section
          aria-labelledby="demo-v3"
          className="grid gap-6 py-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10 lg:py-14"
        >
          <div className="flex items-baseline justify-between gap-5 lg:block">
            <p className="font-mono text-xs tracking-[0.16em] text-[#35d3dd]">01</p>
            <h2 id="demo-v3" className="font-display mt-3 text-3xl tracking-[-0.025em] sm:text-4xl">
              Final project — V3
            </h2>
          </div>
          <video
            controls
            playsInline
            preload="none"
            className="aspect-video w-full bg-black object-contain shadow-[0_24px_80px_rgb(0_0_0/0.36)]"
            aria-label="Verilog FPGA Game final project V3 demo video"
          >
            <source src="/demos/verilog-fpga-game/demo-v3.mp4" type="video/mp4" />
            Your browser does not support MP4 video playback.
          </video>
        </section>
      </div>
    </main>
  );
}
