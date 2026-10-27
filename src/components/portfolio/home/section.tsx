import type { ReactNode } from "react";
import type { PortfolioSectionId } from "@/data/portfolio";
import styles from "./portfolio.module.css";

export default function Section({ id, title, children, aside }: { id: PortfolioSectionId; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={styles.sectionHeading}>
        <h2 id={`${id}-heading`}>{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}
