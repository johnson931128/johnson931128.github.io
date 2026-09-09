import BrandMark from "@/components/portfolio/brand-mark";
import ProjectShowcase from "@/components/portfolio/project-showcase";
import { DATA } from "@/data/resume";
import { MapPin } from "lucide-react";

export default function ExperienceProjectSection() {
  const experience = DATA.work[0];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="experience-section full-bleed relative scroll-mt-0 overflow-hidden border-y border-border bg-[#eee9dd]"
    >
      <div className="experience-blue-rule absolute inset-x-0 top-0 h-1.5 bg-primary" aria-hidden />
      <p className="experience-watermark font-display" aria-hidden>EXPERIENCE</p>
      <div className="experience-layout relative mx-auto grid max-w-7xl gap-16 px-6 py-24 sm:px-10 sm:py-28 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(0,1.7fr)] lg:gap-20 lg:px-14 lg:py-36">
        <aside className="experience-aside lg:sticky lg:top-16 lg:self-start">
          <p className="section-kicker reveal-exp-kicker">
            <span>02</span> Experience
          </p>
          <div className="reveal-mask mt-4">
            <h2 id="experience-heading" className="font-display reveal-exp-heading text-5xl leading-none tracking-[-0.04em] sm:text-6xl">
              In practice
            </h2>
          </div>

          <div className="experience-details reveal-exp-details mt-12 border-l-2 border-primary pl-6 sm:pl-8">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-[#d54b22]">FIG. 01 / INDUSTRY</p>
            <BrandMark
              src={experience.logoUrl}
              alt={`${experience.company} logo`}
              className="size-16 rounded-none border-foreground/15 bg-white p-2"
            />
            <h3 className="font-display mt-7 text-3xl leading-tight tracking-[-0.025em]">{experience.company}</h3>
            <p className="mt-2 text-base font-medium text-foreground/72">{experience.title}</p>
            <p className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden />
              {experience.location}
            </p>
            <p className="mt-7 max-w-sm text-[0.95rem] leading-7 text-muted-foreground">
              {experience.description}
            </p>
            <p className="mt-7 font-mono text-xs uppercase tracking-[0.14em] text-foreground/52">
              {experience.start} — {experience.end}
            </p>
          </div>
        </aside>

        <ProjectShowcase />
      </div>
    </section>
  );
}
