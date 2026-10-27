"use client";

import { useEffect, useState } from "react";
import type { PortfolioLink, PortfolioSection, PortfolioSectionId } from "@/data/portfolio";
import styles from "./portfolio.module.css";

export default function Navigation({ name, nameZh, sections, cv }: { name: string; nameZh: string; sections: readonly PortfolioSection[]; cv?: PortfolioLink }) {
  const [active, setActive] = useState<PortfolioSectionId>("about");
  useEffect(() => {
    // Enhance the indicator only; native anchors, scrolling, and history work without JS.
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id as PortfolioSectionId);
    }, { rootMargin: "-100px 0px -35% 0px", threshold: 0 });
    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [sections]);
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a className={styles.wordmark} href="#about">
          {name} <span lang="zh-Hant">{nameZh}</span>
        </a>
        <nav aria-label="Primary navigation">
          <ul>
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>
              </li>
            ))}
            {cv ? <li><a href={cv.href}>{cv.label}</a></li> : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}
