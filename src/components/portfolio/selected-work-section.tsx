import { ProjectCard } from "@/components/project-card";
import FeaturedProjectCard from "@/components/portfolio/featured-project-card";
import { DATA } from "@/data/resume";
import { LockKeyhole } from "lucide-react";

export default function SelectedWorkSection() {
  const featuredTitles = ["AMR Software Stack", "CtrlKine-AMR"];
  const featuredProjects = featuredTitles
    .map((title) => DATA.projects.find((project) => project.title === title))
    .filter((project): project is Exclude<(typeof DATA.projects)[number], { private: true }> =>
      Boolean(project && !project.private),
    );
  const selectedProjects = DATA.projects.filter(
    (project) => !featuredTitles.includes(project.title),
  );
  const captions: Record<string, string> = {
    "AMR Software Stack": "Fig. 01 — ROS 2 AMR simulation and physical deployment",
    "CtrlKine-AMR": "Fig. 02 — Lightweight 2D AMR simulation environment",
  };

  return (
    <div>
      <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        Two systems that connect simulation, navigation, and real-world robotics constraints.
      </p>
      <div className="mt-8">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard
            key={project.title}
            figure={`Fig. 0${index + 1}`}
            caption={captions[project.title]}
            project={project}
          />
        ))}
      </div>

      <div className="mt-16 flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <h3 className="text-base font-semibold tracking-tight text-foreground">Selected Projects</h3>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
          Additional work
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {selectedProjects.map((project) => {
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
