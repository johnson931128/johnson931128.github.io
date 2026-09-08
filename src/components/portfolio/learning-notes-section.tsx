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
          className="group flex min-h-40 flex-col rounded-lg border border-border/80 bg-card/35 p-5 transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card/70 focus-visible:-translate-y-0.5 focus-visible:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:min-h-72 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-medium tracking-tight text-foreground transition-colors group-hover:text-primary group-focus-visible:text-primary motion-reduce:transition-none">
              {subject.title}
            </h3>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted-foreground transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:text-primary motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              aria-hidden
            />
          </div>
          <div className="mt-8 sm:mt-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {subject.description}
            </p>
            <div className="mt-5 hidden border-t border-border/70 pt-4 sm:block">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                Preview
              </p>
              <ul className="mt-2 space-y-1.5" aria-hidden="true">
                {subject.notes.slice(0, 3).map((note, index) => (
                  <li
                    key={note.slug}
                    className="translate-y-1 truncate text-xs text-muted-foreground opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
                    style={{ transitionDelay: `${index * 45}ms` }}
                  >
                    {note.title}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                View all {subject.notes.length} notes →
              </p>
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:hidden">
              {subject.notes.length} {subject.notes.length === 1 ? "note" : "notes"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
