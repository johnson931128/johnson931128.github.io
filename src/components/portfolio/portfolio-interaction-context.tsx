"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PORTFOLIO_SECTIONS } from "@/components/portfolio/portfolio-sections";

type PortfolioInteractionState = {
  activeSection: string;
  progress: number;
};

const PortfolioInteractionContext = createContext<PortfolioInteractionState>({
  activeSection: PORTFOLIO_SECTIONS[0].id,
  progress: 0,
});

export function PortfolioInteractionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>(PORTFOLIO_SECTIONS[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = PORTFOLIO_SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null,
    );

    if (sections.length === 0) return;

    const visibleSections = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        const nextSection = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
        if (nextSection) setActiveSection(nextSection);
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: [0, 0.2, 0.55, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const first = sections[0].getBoundingClientRect();
        const last = sections[sections.length - 1].getBoundingClientRect();
        const start = first.top + window.scrollY;
        const end = last.bottom + window.scrollY;
        const signalPosition = window.scrollY + window.innerHeight * 0.38;
        const nextProgress = Math.min(1, Math.max(0, (signalPosition - start) / (end - start)));
        setProgress(nextProgress);

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
          setActiveSection(sections[sections.length - 1].id);
        }
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const value = useMemo(() => ({ activeSection, progress }), [activeSection, progress]);

  return (
    <PortfolioInteractionContext.Provider value={value}>
      {children}
    </PortfolioInteractionContext.Provider>
  );
}

export function usePortfolioInteraction() {
  return useContext(PortfolioInteractionContext);
}
