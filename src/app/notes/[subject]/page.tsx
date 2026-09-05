import { getLearningNoteSubject, LEARNING_NOTE_SUBJECTS } from "@/data/learning-notes";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return LEARNING_NOTE_SUBJECTS.map((subject) => ({
    subject: subject.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject: subjectSlug } = await params;
  const subject = getLearningNoteSubject(subjectSlug);

  if (!subject) {
    return { title: "Learning Notes" };
  }

  return {
    title: subject.title,
    description: subject.description,
  };
}

export default async function LearningNoteSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  const subject = getLearningNoteSubject(subjectSlug);

  if (!subject) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl">
      <nav aria-label="Breadcrumb" className="mb-12">
        <Link
          href="/#learning-notes"
          className="group inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          Learning Notes
        </Link>
      </nav>

      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Learning Notes
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {subject.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {subject.description}
        </p>
      </header>

      <section aria-labelledby="chapter-index-heading" className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="chapter-index-heading"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-primary"
          >
            Chapter Index
          </h2>
          <span className="text-xs tabular-nums text-muted-foreground">
            {subject.notes.length} {subject.notes.length === 1 ? "note" : "notes"}
          </span>
        </div>

        {subject.notes.length > 0 ? (
          <div className="mt-5 divide-y divide-border border-y border-border">
            {subject.notes.map((note, index) => (
              <div
                key={note.slug}
                className="flex items-start gap-4 py-5 sm:items-center sm:gap-6"
              >
                <span className="mt-0.5 w-8 shrink-0 font-mono text-xs tabular-nums text-muted-foreground sm:mt-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground">{note.title}</h3>
                  {note.updatedAt ? (
                    <time className="mt-1 block text-xs text-muted-foreground">
                      Updated {note.updatedAt}
                    </time>
                  ) : null}
                </div>
                {note.hackmdUrl ? (
                  <a
                    href={note.hackmdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    HackMD
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 border-y border-border py-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              No notes published yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
