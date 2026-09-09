"use client";

import ViewportVideo from "@/components/portfolio/viewport-video";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent, type WheelEvent } from "react";

const projectTitles = [
  "AMR Software Stack",
  "CtrlKine-AMR",
  "Verilog FPGA Game",
  "WUWAOS",
  "Java Maze Game",
] as const;

const projects = projectTitles
  .map((title) => DATA.projects.find((project) => project.title === title))
  .filter((project): project is Exclude<(typeof DATA.projects)[number], { private: true }> =>
    Boolean(project && !project.private),
  );

function ProjectMedia({ project }: { project: (typeof projects)[number] }) {
  if (project.video) {
    return <ViewportVideo src={project.video} className="aspect-[16/10] h-full bg-[#15171a]" />;
  }

  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} project preview`}
        width={1280}
        height={800}
        priority={project.title === "AMR Software Stack"}
        draggable={false}
        className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      />
    );
  }

  if (project.title === "Verilog FPGA Game") {
    return (
      <div className="relative grid aspect-[16/10] h-full w-full place-items-center overflow-hidden bg-[#15171a] p-8 text-white">
        <div className="project-grid absolute inset-0 opacity-25" aria-hidden />
        <svg viewBox="0 0 720 420" className="relative w-full max-w-2xl" aria-hidden>
          <g fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.62">
            <path d="M75 210H205M285 210H410M500 210H650" />
            <path d="M245 115V65H455V115M455 305v50H245v-50" />
          </g>
          <g fill="#15171a" stroke="currentColor" strokeWidth="1.5">
            <rect x="75" y="165" width="130" height="90" rx="4" />
            <rect x="205" y="115" width="80" height="190" rx="4" />
            <rect x="410" y="115" width="90" height="190" rx="4" />
            <rect x="500" y="165" width="150" height="90" rx="4" />
          </g>
          <g fill="currentColor" fontFamily="monospace" fontSize="14" letterSpacing="2">
            <text x="105" y="205">KEYPAD</text>
            <text x="105" y="226">INPUT</text>
            <text x="224" y="205">GAME</text>
            <text x="229" y="226">FSM</text>
            <text x="430" y="205">PIXEL</text>
            <text x="430" y="226">LOGIC</text>
            <text x="548" y="205">VGA</text>
            <text x="533" y="226">OUTPUT</text>
          </g>
        </svg>
        <p className="relative mt-4 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
          Basys 3 / signal path
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/10] h-full w-full flex-col justify-between overflow-hidden bg-[#15171a] p-7 font-mono text-white sm:p-10">
      <div className="project-grid absolute inset-0 opacity-15" aria-hidden />
      <div className="relative flex items-center justify-between text-xs uppercase tracking-[0.16em] text-white/45">
        <span>WUWAOS / shell</span>
        <span>C++17</span>
      </div>
      <div className="relative space-y-3 text-sm text-white/80 sm:text-base">
        <p><span className="text-[#6f91ff]">wuwaos$</span> help</p>
        <p><span className="text-[#6f91ff]">wuwaos$</span> run editor 5</p>
        <p><span className="text-[#6f91ff]">wuwaos$</span> ps</p>
        <p><span className="text-[#6f91ff]">wuwaos$</span> step</p>
        <p className="text-[#ff7548]">_</p>
      </div>
      <div className="relative flex flex-wrap gap-2 text-xs uppercase tracking-[0.13em] text-white/45">
        <span>Process model</span><span>/</span><span>Kernel</span><span>/</span><span>FCFS</span>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStart = useRef<number | null>(null);
  const wheelLocked = useRef(false);
  const project = projects[activeIndex];

  const goTo = (nextIndex: number) => {
    setActiveIndex((nextIndex + projects.length) % projects.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const distance = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(distance) < 48) return;
    goTo(activeIndex + (distance < 0 ? 1 : -1));
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 28) return;
    event.preventDefault();
    if (wheelLocked.current) return;
    wheelLocked.current = true;
    goTo(activeIndex + (event.deltaX > 0 ? 1 : -1));
    window.setTimeout(() => { wheelLocked.current = false; }, 450);
  };

  return (
    <div
      id="work"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      data-carousel-interactive
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      className="project-showcase reveal-exp-showcase scroll-mt-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-8 focus-visible:ring-offset-[#eee9dd]"
    >
      <div className="project-showcase-header mb-6 flex items-end justify-between gap-6 border-b border-foreground/20 pb-5">
        <div>
          <p className="section-kicker"><span>03</span> Selected work</p>
          <h2 className="project-showcase-title font-display mt-3 text-4xl leading-none tracking-[-0.035em] sm:text-5xl">Project showcase</h2>
        </div>
        <p className="project-index font-mono text-sm tabular-nums text-foreground" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <article key={project.title} className="showcase-slide-in">
        <figure className="project-media-stage">
          <div
          className="project-media-reveal cursor-grab touch-pan-y select-none overflow-hidden border border-foreground/20 bg-[#15171a] active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { dragStart.current = null; }}
        >
            <ProjectMedia project={project} />
          </div>
          <figcaption className="project-figcaption">
            <span className="text-[#d54b22]">FIG. {String(activeIndex + 1).padStart(2, "0")}</span>
            <span>Selected project / media study</span>
          </figcaption>
        </figure>

        <div className="project-meta mt-7 grid gap-7 border-b border-foreground/20 pb-8 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="project-copy-reveal">
            <h3 className="font-display text-4xl leading-none tracking-[-0.035em] sm:text-5xl">{project.title}</h3>
            <p className="mt-3 text-base font-medium text-primary">{project.subtitle}</p>
            {project.description ? (
              <p className="project-description-reveal mt-5 max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">{project.description}</p>
            ) : null}
          </div>
          <div className="project-actions-reveal flex flex-wrap items-start gap-x-5 gap-y-3 sm:max-w-64 sm:justify-end">
            {project.links.map((link) => (
              <Link
                key={`${project.title}-${link.type}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                download={"download" in link ? link.download : undefined}
                className="project-action-link"
              >
                {link.icon}{link.type}<ArrowUpRight className="size-3" aria-hidden />
              </Link>
            ))}
          </div>
        </div>

        <div className="project-tech-list mt-5 flex flex-wrap gap-x-0 gap-y-2 font-mono text-xs uppercase tracking-[0.1em] text-foreground/55">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </article>

      <div className="project-controls mt-9 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" aria-label="Choose a project slide">
          {projects.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn(
                "project-pagination h-1.5 transition-[width,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none",
                index === activeIndex ? "w-12 bg-primary" : "w-5 bg-foreground/20 hover:bg-primary/45",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous project"
            className="carousel-arrow"
          ><ArrowLeft className="size-4" aria-hidden /></button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next project"
            className="carousel-arrow"
          ><ArrowRight className="size-4" aria-hidden /></button>
        </div>
      </div>
      <p className="mt-4 text-right font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Drag / trackpad / arrow keys
      </p>
    </div>
  );
}
