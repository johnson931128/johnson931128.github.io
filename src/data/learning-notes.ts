export type LearningNoteSubjectSlug =
  | "computer-organization"
  | "ros-2"
  | "operating-systems"
  | "amr";

export type LearningNote = {
  slug: string;
  title: string;
  updatedAt?: string;
  hackmdUrl?: string;
};

export type LearningNoteSubject = {
  slug: LearningNoteSubjectSlug;
  title: string;
  description: string;
  notes: readonly LearningNote[];
};

// Keep this shape stable so a future build-time HackMD sync can replace the
// note arrays without changing the homepage or subject page components.
export const LEARNING_NOTE_SUBJECTS: readonly LearningNoteSubject[] = [
  {
    slug: "computer-organization",
    title: "Computer Organization",
    description: "Foundations of processors, memory, and the systems built around them.",
    notes: [],
  },
  {
    slug: "ros-2",
    title: "ROS 2",
    description: "Robotics middleware, communication, and software composition.",
    notes: [],
  },
  {
    slug: "operating-systems",
    title: "Operating Systems",
    description: "Processes, memory, and the interfaces that make systems useful.",
    notes: [],
  },
  {
    slug: "amr",
    title: "AMR",
    description: "Mobile robot software, simulation, and navigation foundations.",
    notes: [],
  },
];

export function getLearningNoteSubject(slug: string) {
  return LEARNING_NOTE_SUBJECTS.find((subject) => subject.slug === slug);
}
