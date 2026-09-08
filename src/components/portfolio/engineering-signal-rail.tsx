"use client";

import { useEffect, useState } from "react";
import { usePortfolioInteraction } from "@/components/portfolio/portfolio-interaction-context";
import { PORTFOLIO_SECTIONS } from "@/components/portfolio/portfolio-sections";
import { cn } from "@/lib/utils";

export default function EngineeringSignalRail() {
  const { activeSection, progress } = usePortfolioInteraction();
  const [nodePositions, setNodePositions] = useState<number[]>([]);

  useEffect(() => {
    const content = document.getElementById("portfolio-content");
    if (!content) return;

    const updatePositions = () => {
      const contentRect = content.getBoundingClientRect();
      const height = content.offsetHeight;
      setNodePositions(
        PORTFOLIO_SECTIONS.map(({ id }) => {
          const section = document.getElementById(id);
          if (!section || height === 0) return 0;
          return ((section.getBoundingClientRect().top - contentRect.top + 12) / height) * 100;
        }),
      );
    };

    updatePositions();
    const resizeObserver = new ResizeObserver(updatePositions);
    resizeObserver.observe(content);
    window.addEventListener("resize", updatePositions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  const activeIndex = PORTFOLIO_SECTIONS.findIndex(({ id }) => id === activeSection);

  return (
    <div aria-hidden className="pointer-events-none absolute -left-10 top-0 hidden h-full w-5 xl:block">
      <div className="absolute bottom-0 left-2 top-0 w-px bg-border/80" />
      <div
        className="absolute left-2 top-0 w-px origin-top bg-primary transition-[height] duration-150 motion-reduce:transition-none"
        style={{ height: `${progress * 100}%` }}
      />
      {PORTFOLIO_SECTIONS.map((section, index) => (
        <span
          key={section.id}
          className={cn(
            "absolute left-[5px] size-[7px] rounded-full border bg-background transition-[background-color,border-color,transform] duration-300 motion-reduce:transition-none",
            index < activeIndex && "border-primary/55 bg-primary/35",
            index === activeIndex && "scale-125 border-primary bg-primary motion-reduce:scale-100",
            index > activeIndex && "border-border",
          )}
          style={{ top: `${nodePositions[index] ?? 0}%` }}
        />
      ))}
    </div>
  );
}
