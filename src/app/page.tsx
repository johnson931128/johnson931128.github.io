import EngineeringNotesSection from "@/components/portfolio/engineering-notes-section";
import PortfolioSidebar from "@/components/portfolio/portfolio-sidebar";
import SelectedWorkSection from "@/components/portfolio/selected-work-section";
import WorkSection from "@/components/section/work-section";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";

export default function Page() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-2 ring-ring focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <main
        id="main-content"
        className="grid min-h-dvh gap-12 lg:grid-cols-[minmax(15rem,0.75fr)_minmax(0,1.6fr)] lg:gap-20"
      >
        <PortfolioSidebar />

        <div className="min-w-0 space-y-24 pb-8 sm:space-y-28">
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-8">
            <h2 id="about-heading" className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              About
            </h2>
            <div className="prose mt-6 max-w-2xl text-pretty font-sans leading-relaxed text-muted-foreground">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </section>

          <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-8">
            <h2 id="experience-heading" className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Experience
            </h2>
            <div className="mt-6">
              <WorkSection />
            </div>
          </section>

          <section id="selected-work" aria-labelledby="selected-work-heading" className="scroll-mt-8">
            <h2 id="selected-work-heading" className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Selected Work
            </h2>
            <div className="mt-6">
              <SelectedWorkSection />
            </div>
          </section>

          <section id="engineering-notes" aria-labelledby="engineering-notes-heading" className="scroll-mt-8">
            <h2 id="engineering-notes-heading" className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Engineering Notes
            </h2>
            <div className="mt-6">
              <EngineeringNotesSection />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
