/* eslint-disable @next/next/no-img-element */
"use client";

import ViewportVideo from "@/components/portfolio/viewport-video";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

type FeaturedProjectCardProps = {
  figure: string;
  caption: string;
  project: {
    title: string;
    subtitle: string;
    href?: string;
    description: string;
    technologies: readonly string[];
    image: string;
    video: string;
    links: readonly {
      icon: React.ReactNode;
      type: string;
      href: string;
      download?: boolean;
    }[];
  };
};

export default function FeaturedProjectCard({ figure, caption, project }: FeaturedProjectCardProps) {
  return (
    <article className="group overflow-hidden border-y border-border py-5 first:border-t-0 first:pt-0 sm:py-7">
      <p className="mb-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {figure}
      </p>
      <Link
        href={project.href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg border border-border bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        aria-label={`Open ${project.title}`}
      >
        {project.video ? (
          <ViewportVideo
            src={project.video}
            className="aspect-[16/9] transition-transform duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
      </Link>
      <p className="mt-3 font-mono text-[0.68rem] leading-relaxed text-muted-foreground">
        {caption}
      </p>

      <div className="mt-6 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-focus-within:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-within:translate-y-0">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <Link
                key={`${project.title}-${link.type}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                download={link.download}
                className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-[color,border-color,transform] hover:-translate-y-px hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {link.icon}
                {link.type}
                <ArrowUpRight className="size-3" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <Markdown>{project.description}</Markdown>
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <Badge key={technology} variant="outline" className="h-6 border-border px-2 text-[0.68rem] font-medium">
              {technology}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
