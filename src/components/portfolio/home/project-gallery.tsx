import type { Project } from "@/data/portfolio";
import ProjectCard from "./project-card";
import ProjectReel from "./project-reel";
import styles from "./project-gallery.module.css";

export default function ProjectGallery({ projects, githubUrl }: { projects: readonly Project[]; githubUrl: string }) {
  return (
    <section id="work" className={styles.gallery} aria-labelledby="work-heading">
      <div className={styles.arrival} aria-hidden="true" />
      <ProjectReel
        projects={projects.map(({ id, title }) => ({ id, title }))}
        heading={
          <header className={styles.heading}>
            <h2 id="work-heading">Selected Projects</h2>
            <a href={githubUrl}>More on GitHub <span aria-hidden="true">↗</span></a>
          </header>
        }
      >
        {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
      </ProjectReel>
    </section>
  );
}
