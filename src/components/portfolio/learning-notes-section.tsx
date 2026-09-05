import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LEARNING_NOTE_SUBJECTS } from "@/data/learning-notes";

export default function LearningNotesSection() {
  return (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      {LEARNING_NOTE_SUBJECTS.map((subject) => (
        <Link
          key={subject.slug}
          href={`/notes/${subject.slug}`}
          className="group flex min-h-40 flex-col justify-between rounded-lg border border-border/80 bg-card/35 p-5 transition-colors hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
              {subject.title}
            </h3>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
          <div className="mt-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {subject.description}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {subject.notes.length} {subject.notes.length === 1 ? "note" : "notes"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
