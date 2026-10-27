import Image from "next/image";
import type { Experience } from "@/data/portfolio";
import ResourceLinks from "./resource-links";
import styles from "./portfolio.module.css";

export default function ExperienceList({ experiences }: { experiences: readonly Experience[] }) {
  return <div className={styles.experienceList}>{experiences.map((experience) => <article key={experience.id} className={styles.experienceRow}>
    <div className={styles.organizationLogo}>{experience.logo ? <Image src={experience.logo} alt={`${experience.organization} logo`} width={112} height={72} /> : null}</div>
    <div className={styles.experienceCopy}>
      <div className={styles.experienceTitle}>
        <h3>{experience.organization}</h3>
        {experience.period ? <p className={styles.period}>{experience.period.start}{experience.period.end ? ` – ${experience.period.end}` : ""}</p> : null}
      </div>
      <p className={styles.role}>{experience.role}{experience.location ? ` · ${experience.location}` : ""}</p>
      <p>{experience.description}</p>
      <ResourceLinks links={experience.links} label={`${experience.organization} resources`} />
    </div>
  </article>)}</div>;
}
