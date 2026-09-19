import Link from "next/link";

export const metadata = {
  title: "MDSBU EtherCAT Analyzer Demo",
  description: "Waveform and analysis demos for the MDSBU EtherCAT Analyzer.",
};

const demos = [
  {
    number: "01",
    title: "Waveform",
    src: "/demos/mdsbu-ethercat-analyzer/waveform.mp4",
    aspectRatio: "2552 / 1380",
  },
  {
    number: "02",
    title: "Analyze",
    src: "/demos/mdsbu-ethercat-analyzer/analyze.mp4",
    aspectRatio: "1248 / 952",
  },
] as const;

export default function MdsbuEthercatAnalyzerDemo() {
  return (
    <main className="full-bleed relative min-h-svh bg-[#0b0e12] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <header className="grid gap-8 border-b border-white/16 pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#ff7548]">
              Delta Electronics / Internship demo
            </p>
            <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              EtherCAT Analyzer demos
            </h1>
          </div>
          <Link
            href="/#experience"
            className="w-fit border-b border-white/30 pb-1 text-sm text-white/65 transition-colors hover:border-[#2f59ff] hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Back to experience
          </Link>
        </header>

        <div className="divide-y divide-white/16">
          {demos.map((demo) => (
            <section key={demo.title} aria-labelledby={`demo-${demo.number}`} className="grid gap-6 py-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10 lg:py-14">
              <div className="flex items-baseline justify-between gap-5 lg:block">
                <p className="font-mono text-xs tracking-[0.16em] text-[#5f7cff]">{demo.number}</p>
                <h2 id={`demo-${demo.number}`} className="font-display mt-3 text-3xl tracking-[-0.025em] sm:text-4xl">
                  {demo.title}
                </h2>
              </div>
              <video
                controls
                playsInline
                preload="none"
                style={{ aspectRatio: demo.aspectRatio }}
                className="w-full bg-black object-contain shadow-[0_24px_80px_rgb(0_0_0/0.36)]"
                aria-label={`${demo.title} demo video`}
              >
                <source src={demo.src} type="video/mp4" />
                Your browser does not support MP4 video playback.
              </video>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
