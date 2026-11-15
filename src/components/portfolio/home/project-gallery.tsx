import Image from "next/image";
import type { Project } from "@/data/portfolio";
import ProjectCard from "./project-card";
import ProjectReel from "./project-reel";
import styles from "./project-gallery.module.css";

export default function ProjectGallery({ projects, githubUrl }: { projects: readonly Project[]; githubUrl: string }) {
  return (
    <section id="work" className={styles.gallery} aria-labelledby="work-heading">
      <div className={styles.arrival} aria-hidden="true" />
      <div className={styles.room}>
        <div className={styles.galleryInner}>
          <header className={styles.heading}>
            <h2 id="work-heading">Selected Projects</h2>
            <a href={githubUrl}>More on GitHub <span aria-hidden="true">↗</span></a>
          </header>
          <ProjectReel projects={projects.map(({ id, title }) => ({ id, title }))}>
            {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
          </ProjectReel>
        </div>
        <div className={styles.foreground} aria-hidden="true">
          <Image
            src="/hero/project-sofa-foreground.webp"
            alt=""
            width={1000}
            height={564}
            sizes="(max-width: 640px) 69vw, 450px"
          />
        </div>
      </div>
    </section>
  );
}
