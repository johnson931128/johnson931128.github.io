import { DATA } from "@/data/resume";

export type PortfolioLink = { label: string; href: string };
export type PortfolioSectionId = "about" | "work" | "experience" | "learning-notes" | "contact";
export type PortfolioSection = { id: PortfolioSectionId; label: string };

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: readonly string[];
  links: readonly PortfolioLink[];
  image?: { src: string; alt: string };
  video?: string;
  /** Populate when an independently authored case study is available. */
  caseStudyHref?: string;
};

export type Experience = {
  id: string;
  organization: string;
  role: string;
  description: string;
  location?: string;
  period?: { start: string; end?: string };
  logo?: string;
  links: readonly PortfolioLink[];
};

/** Unset resources are deliberately absent from the rendered navigation. */
export const portfolioResources: { cv?: PortfolioLink; portrait?: { src: string; alt: string } } = {
  cv: { label: "CV", href: "/documents/Fan_Shunjie_Resume.pdf" },
};

export const portfolioSections: readonly PortfolioSection[] = [
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "learning-notes", label: "Notes" },
  { id: "contact", label: "Contact" },
];

const projectOrder = ["AMR Software Stack", "WUWAOS", "CtrlKine-AMR", "作業系統樂觀同步機制", "Verilog FPGA Game", "Java Maze Game"];

export const portfolioProjects: readonly Project[] = projectOrder.map((title) => {
  const source = DATA.projects.find((project) => project.title === title && !project.private);
  if (!source) throw new Error(`Missing public portfolio project: ${title}`);
  return {
    id: title === "作業系統樂觀同步機制" ? "optimistic-synchronization" : title.toLowerCase().replaceAll(" ", "-"),
    title: source.title,
    subtitle: source.subtitle,
    description: source.description,
    technologies: source.technologies,
    links: source.links.map((link) => ({ label: link.type, href: link.href })),
    image: source.image ? { src: source.image, alt: `${source.title} project overview` } : undefined,
    video: source.video || undefined,
  };
});

export const portfolioExperiences: readonly Experience[] = [
  ...DATA.work.map((work) => ({
    id: work.company.toLowerCase().replaceAll(" ", "-"),
    organization: work.company,
    role: work.title,
    description: work.description,
    location: work.location,
    period: { start: work.start, end: work.end },
    logo: work.logoUrl,
    links: work.links.map((link) => ({ label: link.type, href: link.href })),
  })),
  {
    id: "ncku-ctrlkine-amr",
    organization: "National Cheng Kung University",
    role: "CtrlKine-AMR Project",
    description: DATA.projects.find((project) => project.title === "CtrlKine-AMR")!.description,
    logo: "/brands/ncku.jpg",
    links: [{ label: "Project", href: "#project-ctrlkine-amr" }],
  },
];

export const portfolioContactLinks: readonly PortfolioLink[] = [
  { label: "Email", href: `mailto:${DATA.contact.email}` },
  { label: "GitHub", href: DATA.contact.social.GitHub.url },
  { label: "LinkedIn", href: DATA.contact.social.LinkedIn.url },
];
