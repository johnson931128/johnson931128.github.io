import LearningSubjectArt from "@/components/portfolio/learning-subject-art";
import { LEARNING_NOTE_SUBJECTS } from "@/data/learning-notes";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const subjectOrder = ["computer-organization", "operating-systems", "ros-2", "amr"];
const subjects = subjectOrder
  .map((slug) => LEARNING_NOTE_SUBJECTS.find((subject) => subject.slug === slug))
  .filter((subject): subject is (typeof LEARNING_NOTE_SUBJECTS)[number] => Boolean(subject));

export default function LearningNotesSection() {
  return (
    <section
      id="learning-notes"
      aria-labelledby="learning-notes-heading"
      className="full-bleed relative scroll-mt-0 bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-14 lg:py-36">
        <div className="mb-12 grid gap-5 md:grid-cols-[1fr_minmax(18rem,0.7fr)] md:items-end">
          <div>
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-primary">
              Learning notes / 04
            </p>
            <h2 id="learning-notes-heading" className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              An evolving knowledge index.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-muted-foreground md:justify-self-end">
            Study notes organized around the systems I keep returning to—from processor pipelines to robot navigation.
          </p>
        </div>

        <div className="border-t border-foreground/20">
          {subjects.map((subject, index) => (
            <Link
              key={subject.slug}
              href={`/notes/${subject.slug}`}
              className="group relative block min-h-44 overflow-hidden border-b border-foreground/20 px-1 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:min-h-52 sm:px-5 sm:py-8"
            >
              <span
                className="absolute inset-0 text-foreground opacity-[0.055] grayscale transition-[opacity,filter,transform] duration-500 ease-out group-hover:scale-[1.025] group-hover:opacity-[0.16] group-hover:grayscale-0 group-focus-visible:scale-[1.025] group-focus-visible:opacity-[0.16] group-focus-visible:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
                aria-hidden
              >
                <LearningSubjectArt subject={subject.slug} />
              </span>
              <span className="absolute inset-0 bg-background/64 transition-colors group-hover:bg-background/44 group-focus-visible:bg-background/44 motion-reduce:transition-none" aria-hidden />

              <span className="relative grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-start gap-3 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-6">
                <span className="pt-1 font-mono text-xs tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-xl font-semibold uppercase tracking-[-0.02em] transition-colors group-hover:text-primary group-focus-visible:text-primary sm:text-3xl motion-reduce:transition-none">
                    {subject.title}
                  </span>
                  <span className="mt-6 hidden max-w-xl space-y-1.5 sm:block" aria-hidden="true">
                    {subject.notes.slice(0, 3).map((note, noteIndex) => (
                      <span
                        key={note.slug}
                        className="block translate-y-1 truncate text-sm text-muted-foreground opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
                        style={{ transitionDelay: `${noteIndex * 45}ms` }}
                      >
                        {note.title}
                      </span>
                    ))}
                    <span className="block pt-2 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                      View all notes →
                    </span>
                  </span>
                </span>
                <span className="flex items-center gap-3 pt-1 text-right">
                  <span className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
                    {subject.notes.length} notes
                  </span>
                  <ArrowUpRight className="hidden size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 sm:block motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" aria-hidden />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
