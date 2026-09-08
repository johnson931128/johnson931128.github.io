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
      className="full-bleed relative scroll-mt-0 border-y border-border bg-[#f2f0e8]/55"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 sm:px-10 sm:py-28 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(0,1.7fr)] lg:gap-20 lg:px-14 lg:py-36">
        <aside className="lg:sticky lg:top-16 lg:self-start">
          <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-primary">
            Experience / 02
          </p>
          <h2 id="experience-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            In practice
          </h2>

          <div className="mt-10 border-l border-foreground/25 pl-6">
            <BrandMark
              src={experience.logoUrl}
              alt={`${experience.company} logo`}
              className="size-14 bg-white"
            />
            <h3 className="mt-6 text-xl font-semibold tracking-tight">{experience.company}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{experience.title}</p>
            <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden />
              {experience.location}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              {experience.description}
            </p>
            <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              {experience.start} — {experience.end}
            </p>
          </div>
        </aside>

        <ProjectShowcase />
      </div>
    </section>
  );
}
