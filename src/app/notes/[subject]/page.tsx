import {
  getLearningNoteSubject,
  LEARNING_NOTE_SUBJECTS,
  sortLearningNotes,
} from "@/data/learning-notes";
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

  const notes = sortLearningNotes(subject.notes);
  const hasGroups = notes.some((note) => note.group);
  const groupOrder = ["tf2", "intermediate", "action", "Client Library", "ORB-slam3", null];
  const noteGroups = hasGroups
    ? groupOrder
        .map((group) => ({
          group,
          notes: notes.filter((note) => (note.group ?? null) === group),
        }))
        .filter(({ notes: groupedNotes }) => groupedNotes.length > 0)
    : [{ group: null, notes }];

  const renderNotes = (groupedNotes: typeof notes) => (
    <div className="divide-y divide-border border-y border-border">
      {groupedNotes.map((note, index) => (
        <a
          key={note.slug}
          href={note.hackmdUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${note.title} on HackMD (opens in a new tab)`}
          className="group flex items-start gap-4 py-5 transition-colors hover:bg-card/45 focus-visible:relative focus-visible:z-10 focus-visible:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:items-center sm:gap-6"
        >
          <span className="mt-0.5 w-8 shrink-0 font-mono text-xs tabular-nums text-muted-foreground sm:mt-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
              {note.title}
            </h3>
            {note.updatedAt ? (
              <time className="mt-1 block text-xs text-muted-foreground">
                Updated {note.updatedAt}
              </time>
            ) : null}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
            HackMD
            <ArrowUpRight className="size-3.5" aria-hidden />
          </span>
        </a>
      ))}
    </div>
  );

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
            {noteGroups.map(({ group, notes: groupedNotes }) => (
              <div key={group ?? "general"} className="space-y-3">
                {hasGroups ? (
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {group ?? "General"}
                  </h3>
                ) : null}
                {renderNotes(groupedNotes)}
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
