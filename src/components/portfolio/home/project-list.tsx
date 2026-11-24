import Image from "next/image";
import type { Project } from "@/data/portfolio";
import ResourceLinks from "./resource-links";
import ProjectVideo from "./project-video";
import styles from "./portfolio.module.css";

function ProjectPreview({ project }: { project: Project }) {
  if (project.image) return <Image src={project.image.src} alt={project.image.alt} width={720} height={450} sizes="(max-width: 640px) 100vw, 360px" className={styles.projectImage} />;
  // Identify projects without inventing a screenshot or downloading a video.
  return <div className={styles.projectCover} aria-hidden="true"><span>{project.technologies.slice(0, 2).join(" / ")}</span><strong>{project.title}</strong><span>{project.subtitle}</span></div>;
}

export default function ProjectList({ projects }: { projects: readonly Project[] }) {
  return <div className={styles.projectList}>{projects.map((project) => {
    const primaryLink = project.caseStudyHref ?? project.links[0]?.href;
    const links = [...(project.caseStudyHref ? [{ label: "Case study", href: project.caseStudyHref }] : []), ...project.links, ...(project.video ? [{ label: "Video", href: project.video }] : [])];
    return <article key={project.id} id={`project-${project.id}`} className={styles.projectRow}>
      {project.video && project.image ? (
        <div className={styles.preview}><ProjectVideo title={project.title} src={project.video} poster={project.image} /></div>
      ) : primaryLink ? (
        <a className={styles.preview} href={primaryLink} aria-label={`Explore ${project.title}`}><ProjectPreview project={project} /></a>
      ) : <div className={styles.preview}><ProjectPreview project={project} /></div>}
      <div className={styles.projectCopy}>
        <h3>{project.title}</h3>
        <p className={styles.projectSubtitle}>{project.subtitle}</p>
        <p>{project.description}</p>
        <p className={styles.technologies}>{project.technologies.join(" · ")}</p>
        <ResourceLinks links={links} label={`${project.title} resources`} />
      </div>
    </article>;
  })}</div>;
}
