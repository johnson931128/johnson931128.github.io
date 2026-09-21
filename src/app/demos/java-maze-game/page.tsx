import Link from "next/link";

export const metadata = {
  title: "Java Maze Game Demo",
  description: "Two-player and single-player demos for the Java Maze Game.",
};

const demos = [
  {
    number: "01",
    title: "Two-player mode",
    src: "/demos/java-maze-game/two-player.mp4",
  },
  {
    number: "02",
    title: "Single-player mode",
    src: "/demos/java-maze-game/single-player.mp4",
  },
] as const;

export default function JavaMazeGameDemoPage() {
  return (
    <main className="full-bleed relative min-h-svh bg-[#0b0e12] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <header className="grid gap-8 border-b border-white/16 pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#6f8dff]">
              Java / Swing / Demo
            </p>
            <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Maze game demos
            </h1>
          </div>
          <Link
            href="/#work"
            className="w-fit border-b border-white/30 pb-1 text-sm text-white/65 transition-colors hover:border-[#6f8dff] hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Back to selected work
          </Link>
        </header>

        <div className="divide-y divide-white/16">
          {demos.map((demo) => (
            <section
              key={demo.number}
              aria-labelledby={`demo-${demo.number}`}
              className="grid gap-6 py-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10 lg:py-14"
            >
              <div className="flex items-baseline justify-between gap-5 lg:block">
                <p className="font-mono text-xs tracking-[0.16em] text-[#6f8dff]">{demo.number}</p>
                <h2
                  id={`demo-${demo.number}`}
                  className="font-display mt-3 text-3xl tracking-[-0.025em] sm:text-4xl"
                >
                  {demo.title}
                </h2>
              </div>
              <video
                controls
                playsInline
                preload="none"
                className="aspect-video w-full bg-black object-contain shadow-[0_24px_80px_rgb(0_0_0/0.36)]"
                aria-label={`Java Maze Game ${demo.title} demo video`}
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
