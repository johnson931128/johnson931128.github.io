"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BrandMark from "@/components/portfolio/brand-mark";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {DATA.work.map((work) => (
        <AccordionItem
          key={work.company}
          value={work.company}
          className="grid w-full gap-3 border-b border-border/80 py-5 first:pt-0 last:border-b-0 last:pb-0"
        >
          <AccordionTrigger className="group cursor-pointer rounded-md p-0 text-left transition-colors hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background [&>svg]:hidden">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <BrandMark
                  src={work.logoUrl}
                  alt={`${work.company} logo`}
                  fallback={work.company.slice(0, 2)}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2 font-semibold leading-tight text-foreground">
                    {work.company}
                    <span className="relative inline-flex items-center w-3.5 h-3.5">
                      <ChevronRight
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                          "translate-x-0 opacity-0",
                          "group-hover:translate-x-1 group-hover:opacity-100",
                          "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                          "opacity-0 rotate-0",
                          "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                        )}
                      />
                    </span>
                  </div>
                  <div className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {work.title}
                  </div>
                </div>
              </div>
              {work.start || work.end ? (
                <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                  <span>
                    {work.start ?? ""} {work.start && work.end ? "-" : ""} {work.end ?? "Present"}
                  </span>
                </div>
              ) : null}
            </div>
          </AccordionTrigger>
          <AccordionContent className="ml-[3.75rem] max-w-xl p-0 text-sm leading-relaxed text-muted-foreground">
            {work.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

