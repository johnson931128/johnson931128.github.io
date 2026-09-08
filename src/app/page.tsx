import ExperienceProjectSection from "@/components/portfolio/experience-project-section";
import HeroSection from "@/components/portfolio/hero-section";
import LearningNotesSection from "@/components/portfolio/learning-notes-section";
import PortfolioFooter from "@/components/portfolio/portfolio-footer";

export default function Page() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-2 ring-ring focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <main id="main-content">
        <HeroSection />
        <ExperienceProjectSection />
        <LearningNotesSection />
      </main>
      <PortfolioFooter />
    </>
  );
}
