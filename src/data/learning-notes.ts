export type LearningNoteSubjectSlug =
  | "computer-organization"
  | "ros-2"
  | "operating-systems"
  | "amr";

export type LearningNote = {
  slug: string;
  title: string;
  group?: string | null;
  updatedAt?: string;
  hackmdUrl: string;
};

export type LearningNoteSubject = {
  slug: LearningNoteSubjectSlug;
  title: string;
  description: string;
  notes: readonly LearningNote[];
};

const HACKMD_BASE_URL = "https://hackmd.io/@johnson931128/";

const chapterNumber = (title: string) => {
  const match = /^(?:ch(?:apter)?\s*|)(\d+)(?:\.\d+)?/i.exec(title);
  return match ? Number(match[1]) : null;
};

export function sortLearningNotes(notes: readonly LearningNote[]) {
  return notes
    .map((note, index) => ({ note, index, chapter: chapterNumber(note.title) }))
    .sort((a, b) => {
      if (a.chapter !== null && b.chapter !== null) {
        return a.chapter - b.chapter || a.index - b.index;
      }

      if (a.chapter !== null) return -1;
      if (b.chapter !== null) return 1;
      return a.index - b.index;
    })
    .map(({ note }) => note);
}

// Keep this shape stable so a future build-time HackMD sync can replace the
// note arrays without changing the homepage or subject page components.
export const LEARNING_NOTE_SUBJECTS: readonly LearningNoteSubject[] = [
  {
    slug: "computer-organization",
    title: "Computer Organization",
    description: "Foundations of processors, memory, and the systems built around them.",
    notes: [
      { slug: "r18S3BNy-g", title: "ch1", group: null, hackmdUrl: `${HACKMD_BASE_URL}r18S3BNy-g` },
      { slug: "H1Na16eJbl", title: "ch2", group: null, hackmdUrl: `${HACKMD_BASE_URL}H1Na16eJbl` },
      { slug: "SJHI3Saagg", title: "CH2", group: null, hackmdUrl: `${HACKMD_BASE_URL}SJHI3Saagg` },
      { slug: "SJBM9xHkbx", title: "ch3", group: null, hackmdUrl: `${HACKMD_BASE_URL}SJBM9xHkbx` },
      {
        slug: "rkvSyE_Mbx",
        title: "Ch4_single_cycle",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}rkvSyE_Mbx`,
      },
      {
        slug: "BJ65MLeQbx",
        title: "ch4_2_pipeline",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}BJ65MLeQbx`,
      },
      { slug: "Hynti13EWx", title: "分年分", group: null, hackmdUrl: `${HACKMD_BASE_URL}Hynti13EWx` },
      { slug: "HkyYFIi4-x", title: "考古", group: null, hackmdUrl: `${HACKMD_BASE_URL}HkyYFIi4-x` },
    ],
  },
  {
    slug: "ros-2",
    title: "ROS 2",
    description: "Robotics middleware, communication, and software composition.",
    notes: [
      { slug: "rkai7ndAge", title: "tf2 part1", group: "tf2", hackmdUrl: `${HACKMD_BASE_URL}rkai7ndAge` },
      { slug: "BkmIHwLJWe", title: "Other", group: "tf2", hackmdUrl: `${HACKMD_BASE_URL}BkmIHwLJWe` },
      {
        slug: "HyVapUcJ-e",
        title: "TF Marker Manager",
        group: "intermediate",
        hackmdUrl: `${HACKMD_BASE_URL}HyVapUcJ-e`,
      },
      {
        slug: "S1fnvUjeWx",
        title: "URDF",
        group: "intermediate",
        hackmdUrl: `${HACKMD_BASE_URL}S1fnvUjeWx`,
      },
      {
        slug: "S1LKP49J-x",
        title: "Using the Node Interfaces Template Class (C++)",
        group: "intermediate",
        hackmdUrl: `${HACKMD_BASE_URL}S1LKP49J-x`,
      },
      {
        slug: "HkAEVg91Ze",
        title: "Writing a Composable Node (C++)",
        group: "intermediate",
        hackmdUrl: `${HACKMD_BASE_URL}HkAEVg91Ze`,
      },
      {
        slug: "BJvXyx9yZg",
        title: "Composing multiple nodes in a single process",
        group: "intermediate",
        hackmdUrl: `${HACKMD_BASE_URL}BJvXyx9yZg`,
      },
      {
        slug: "BJRMrSA-be",
        title: "Phase 3 操作指南",
        group: "action",
        hackmdUrl: `${HACKMD_BASE_URL}BJRMrSA-be`,
      },
      { slug: "SJRu74L0le", title: "Action", group: "action", hackmdUrl: `${HACKMD_BASE_URL}SJRu74L0le` },
      {
        slug: "S1rLdkhhxg",
        title: "Client Library",
        group: "Client Library",
        hackmdUrl: `${HACKMD_BASE_URL}S1rLdkhhxg`,
      },
      {
        slug: "r11uLHICel",
        title: "CMakeLists.txt & Package.xml 撰寫原則",
        group: "Client Library",
        hackmdUrl: `${HACKMD_BASE_URL}r11uLHICel`,
      },
      {
        slug: "HylOV8qnxWe",
        title: "ORB-slam3 實作(筆電)",
        group: "ORB-slam3",
        hackmdUrl: `${HACKMD_BASE_URL}HylOV8qnxWe`,
      },
      { slug: "Hyiw7yik-e", title: "大方向", group: null, hackmdUrl: `${HACKMD_BASE_URL}Hyiw7yik-e` },
      {
        slug: "HkBGLQ8eWl",
        title: "大方向二 (待修)",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}HkBGLQ8eWl`,
      },
      { slug: "ryTv6Kjxbl", title: "目前進度", group: null, hackmdUrl: `${HACKMD_BASE_URL}ryTv6Kjxbl` },
      { slug: "SyJlV4fCeg", title: "複習用(專題)", group: null, hackmdUrl: `${HACKMD_BASE_URL}SyJlV4fCeg` },
      { slug: "SJftEBApgg", title: "Intermediate", group: null, hackmdUrl: `${HACKMD_BASE_URL}SJftEBApgg` },
      {
        slug: "rJ_IbH10le",
        title: "🧭 Modern C++11–23 全語法大全",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}rJ_IbH10le`,
      },
    ],
  },
  {
    slug: "operating-systems",
    title: "Operating Systems",
    description: "Processes, memory, and the interfaces that make systems useful.",
    notes: [
      { slug: "H1_aLYfhWx", title: "ch1 Introduction", group: null, hackmdUrl: `${HACKMD_BASE_URL}H1_aLYfhWx` },
      {
        slug: "ryunYrrnWe",
        title: "ch2 Operating-System Structures",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}ryunYrrnWe`,
      },
      { slug: "HJi-3fusZe", title: "ch3 Process", group: null, hackmdUrl: `${HACKMD_BASE_URL}HJi-3fusZe` },
      { slug: "HkKNBYiiZg", title: "ch4 Thread", group: null, hackmdUrl: `${HACKMD_BASE_URL}HkKNBYiiZg` },
      {
        slug: "S1ChJcy2We",
        title: "ch5 CPU schedueling",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}S1ChJcy2We`,
      },
      {
        slug: "r1iD2IhTWx",
        title: "ch6 Synchronization Tools",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}r1iD2IhTWx`,
      },
      { slug: "r1Fi0EhCWx", title: "ch8 Deadlocks", group: null, hackmdUrl: `${HACKMD_BASE_URL}r1Fi0EhCWx` },
      { slug: "Hk7_IxaA-e", title: "ch9 Main Memory", group: null, hackmdUrl: `${HACKMD_BASE_URL}Hk7_IxaA-e` },
      {
        slug: "rJ0VOjA1Ge",
        title: "ch10 Virtual Momory",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}rJ0VOjA1Ge`,
      },
      { slug: "rJomMGVffe", title: "ch11", group: null, hackmdUrl: `${HACKMD_BASE_URL}rJomMGVffe` },
      {
        slug: "B1bmwfPbMg",
        title: "chapter 11 Mass-Storage Structure",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}B1bmwfPbMg`,
      },
      { slug: "HkHEAfPbfe", title: "ch12  I/O Systems", group: null, hackmdUrl: `${HACKMD_BASE_URL}HkHEAfPbfe` },
      {
        slug: "BysXwv6WGl",
        title: "Chapter 13 file system Interface",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}BysXwv6WGl`,
      },
      {
        slug: "SkUyDj6bGl",
        title: "chapter 14 File-System Implementation",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}SkUyDj6bGl`,
      },
      {
        slug: "HyHFT-JGze",
        title: "chapter 15  File System  Internals",
        group: null,
        hackmdUrl: `${HACKMD_BASE_URL}HyHFT-JGze`,
      },
      { slug: "r1lvB6mGfl", title: "9.6", group: null, hackmdUrl: `${HACKMD_BASE_URL}r1lvB6mGfl` },
      { slug: "Byt1CQAA-l", title: "名詞百科", group: null, hackmdUrl: `${HACKMD_BASE_URL}Byt1CQAA-l` },
      { slug: "rk5SZG4MMl", title: "期末名詞表", group: null, hackmdUrl: `${HACKMD_BASE_URL}rk5SZG4MMl` },
    ],
  },
  {
    slug: "amr",
    title: "AMR",
    description: "Mobile robot software, simulation, and navigation foundations.",
    notes: [
      { slug: "HkcZ9ny9Wg", title: "專題紀錄 1", group: null, hackmdUrl: `${HACKMD_BASE_URL}HkcZ9ny9Wg` },
      { slug: "B1cCB8uRZx", title: "專題紀錄2", group: null, hackmdUrl: `${HACKMD_BASE_URL}B1cCB8uRZx` },
      { slug: "rk8TX00eGe", title: "專題紀錄3", group: null, hackmdUrl: `${HACKMD_BASE_URL}rk8TX00eGe` },
      { slug: "S1wXQkudZx", title: "軟體模擬開發", group: null, hackmdUrl: `${HACKMD_BASE_URL}S1wXQkudZx` },
      { slug: "H1PDpuJrbe", title: "手持LIDAR進行SLAM", group: null, hackmdUrl: `${HACKMD_BASE_URL}H1PDpuJrbe` },
      { slug: "Hyuv_TtIZe", title: "七日計畫", group: null, hackmdUrl: `${HACKMD_BASE_URL}Hyuv_TtIZe` },
    ],
  },
];

export function getLearningNoteSubject(slug: string) {
  return LEARNING_NOTE_SUBJECTS.find((subject) => subject.slug === slug);
}
