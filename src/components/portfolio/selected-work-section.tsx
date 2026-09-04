import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { LockKeyhole } from "lucide-react";

export default function SelectedWorkSection() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        A selection of projects from the current portfolio data.
      </p>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {DATA.projects.map((project) => {
          if (project.private) {
            return (
              <div
                key={project.title}
                className="flex min-h-full flex-col justify-between rounded-xl border border-border bg-muted/35 p-6 text-muted-foreground"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                      <p className="mt-1 text-sm">{project.subtitle}</p>
                    </div>
                    <LockKeyhole className="mt-0.5 size-4 shrink-0" aria-label="Private project" />
                  </div>
                  <p className="mt-6 text-sm leading-relaxed">{project.description}</p>
                </div>
                <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em]">
                  Private
                </p>
              </div>
            );
          }

          return (
            <ProjectCard
              key={project.title}
              href={project.href}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          );
        })}
      </div>
    </div>
  );
}
