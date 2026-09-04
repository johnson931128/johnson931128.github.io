import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

export default function SelectedWorkSection() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        A selection of projects from the current portfolio data.
      </p>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {DATA.projects.map((project) => (
          <ProjectCard
            key={project.title}
            href={project.href}
            title={project.title}
            description={project.description}
            dates={project.dates}
            tags={project.technologies}
            image={project.image}
            video={project.video}
            links={project.links}
          />
        ))}
      </div>
    </div>
  );
}
