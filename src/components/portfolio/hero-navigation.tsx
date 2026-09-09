"use client";

import { useEffect, useState } from "react";

const navigation = [
  { href: "#about", id: "about", label: "About" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#learning-notes", id: "learning-notes", label: "Learning Notes" },
] as const;

export default function HeroNavigation() {
  const [activeId, setActiveId] = useState<(typeof navigation)[number]["id"]>("about");

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id as (typeof navigation)[number]["id"]);
      },
      { rootMargin: "-18% 0px -62%", threshold: [0, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Primary navigation" className="hero-copy-right">
      <ul className="hero-nav-list">
        {navigation.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active ? "location" : undefined}
                className="hero-nav-link"
              >
                <span className="hero-nav-marker" aria-hidden />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
