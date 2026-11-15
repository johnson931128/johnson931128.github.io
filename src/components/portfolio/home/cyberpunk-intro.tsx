import Image from "next/image";
import { DATA } from "@/data/resume";
import { portfolioContactLinks, portfolioResources } from "@/data/portfolio";
import CyberpunkCity from "./cyberpunk-city";
import ResourceLinks from "./resource-links";
import styles from "./cyberpunk-intro.module.css";

const disciplines = ["Software systems", "Embedded development", "Robotics"];

export default function CyberpunkIntro() {
  const { cv, portrait } = portfolioResources;

  return (
    <section id="about" tabIndex={-1} className={styles.hero} aria-labelledby="about-heading">
      <CyberpunkCity />
      <div className={styles.inner}>
        <div className={styles.biography}>
          <p className={styles.affiliation}>{DATA.educationLine}</p>
          <h1 id="about-heading" className={styles.heading}>
            <span className={styles.name}>
              {DATA.name}
              <span className={styles.arc} aria-hidden="true" />
            </span>
            <span className={styles.nameZh} lang="zh-Hant">{DATA.nameZh}</span>
          </h1>
          <p className="sr-only">Software systems, embedded development, and robotics.</p>
          <div className={styles.disciplines} aria-hidden="true">
            {disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
          </div>
          <div className={styles.introduction}>
            <p className={styles.summary}>{DATA.summary}</p>
            <p className={styles.status}>{DATA.currentStatus}</p>
          </div>
          <ResourceLinks links={[...portfolioContactLinks, ...(cv ? [cv] : [])]} label="Contact and profiles" />
        </div>
        {portrait ? <Image className={styles.portrait} src={portrait.src} alt={portrait.alt} width={260} height={320} /> : null}
      </div>
    </section>
  );
}
