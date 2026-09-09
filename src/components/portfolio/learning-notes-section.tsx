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
      className="learning-notes-section full-bleed relative scroll-mt-0 overflow-hidden bg-[#faf8f2]"
    >
      <div className="learning-layout mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-14 lg:py-36">
        <div className="notes-heading-group mb-12 grid gap-6 md:grid-cols-[1fr_minmax(18rem,0.7fr)] md:items-end">
          <div>
            <p className="section-kicker">
              <span>04</span> Learning notes
            </p>
            <h2 id="learning-notes-heading" className="font-display mt-4 max-w-4xl text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              An evolving knowledge index.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-muted-foreground md:justify-self-end">
            Study notes organized around the systems I keep returning to—from processor pipelines to robot navigation.
          </p>
        </div>

        <div className="learning-index notes-rule border-t border-foreground/25">
          {subjects.map((subject, index) => (
            <Link
              key={subject.slug}
              href={`/notes/${subject.slug}`}
              data-subject={subject.slug}
              className="knowledge-row group relative block min-h-48 overflow-hidden border-b border-foreground/25 px-1 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:min-h-56 sm:px-5 sm:py-9"
            >
              <span
                className="knowledge-art absolute inset-0 transition-[opacity,filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] group-focus-visible:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
                aria-hidden
              >
                <LearningSubjectArt subject={subject.slug} />
              </span>
              <span className="knowledge-wash absolute inset-0 transition-colors duration-500 motion-reduce:transition-none" aria-hidden />
              <span className="knowledge-accent-line absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none" aria-hidden />

              <span className="relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-3 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-6">
                <span className="knowledge-number pt-1 font-mono text-sm tabular-nums text-[#d54b22] transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="knowledge-title font-display block text-3xl leading-none tracking-[-0.03em] transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-primary group-focus-visible:translate-x-2 group-focus-visible:text-primary sm:text-5xl motion-reduce:transition-none">
                    {subject.title}
                  </span>
                  <span className="mt-4 block max-w-[22rem] text-sm leading-6 text-foreground/62 sm:hidden">{subject.description}</span>
                  <span className="knowledge-previews mt-7 hidden max-w-xl space-y-1.5 sm:block" aria-hidden="true">
                    {subject.notes.slice(0, 3).map((note, noteIndex) => (
                      <span
                        key={note.slug}
                        className="knowledge-preview block translate-y-1 truncate text-sm text-foreground/55 opacity-40 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
                        style={{ transitionDelay: `${110 + noteIndex * 55}ms` }}
                      >
                        {note.title}
                      </span>
                    ))}
                    <span className="block pt-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-500 delay-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                      View all notes →
                    </span>
                  </span>
                </span>
                <span className="knowledge-meta flex items-center gap-3 pt-1 text-right transition-transform duration-500 delay-75 group-hover:-translate-x-1 group-focus-visible:-translate-x-1 motion-reduce:transition-none">
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-foreground/58 sm:text-sm">
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
