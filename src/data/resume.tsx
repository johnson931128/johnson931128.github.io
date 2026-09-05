import { Icons } from "@/components/icons";

type NavigationItem = {
  href: string;
  icon: typeof Icons.github;
  label: string;
};

type HackathonItem = {
  title: string;
  dates: string;
  location: string;
  description: string;
  image?: string;
  links: { title: string; icon: React.ReactNode; href: string }[];
};

const githubLink = (href: string) => ({
  type: "GitHub",
  href,
  icon: <Icons.github className="size-3" aria-hidden />,
});

const demoLink = (href: string) => ({
  type: "Demo",
  href,
  icon: <Icons.youtube className="size-3" aria-hidden />,
});

export const DATA = {
  name: "Johnson Fan",
  nameZh: "范舜傑",
  initials: "JF",
  role: "Software Engineering / Embedded Systems / Robotics",
  educationLine: "Engineering Science @ National Cheng Kung University",
  url: "https://johnson931128.github.io",
  location: "Tainan, Taiwan",
  description:
    "Engineering Science student focused on software systems, embedded development, robotics, and industrial communication.",
  summary:
    "Engineering Science student at National Cheng Kung University, focused on software systems, embedded development, robotics, and industrial communication. Current work spans EtherCAT-related tooling and agent workflows, AMR simulation and navigation, and systems programming projects. Interested in building maintainable software that connects high-level system design with real hardware constraints.",
  currentStatus:
    "Working across EtherCAT tooling, AMR systems, and systems programming.",
  avatarUrl: "",
  skills: [],
  navbar: [] as NavigationItem[],
  contact: {
    email: "fanj631@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/johnson931128",
        icon: Icons.github,
        navbar: false,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/FAN28",
        icon: Icons.linkedin,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:fanj631@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Delta Electronics",
      href: "",
      badges: [],
      location: "Tainan, Taiwan",
      title: "Software Engineering Intern",
      logoUrl: "/brands/delta-electronics.png",
      start: "",
      end: undefined,
      description:
        "Working on software tooling related to industrial communication, including EtherCAT analysis and agent-assisted engineering workflows.",
    },
  ],
  education: [],
  projects: [
    {
      title: "MDSBU Project",
      subtitle: "Private Internship Project",
      href: undefined,
      dates: "",
      active: false,
      private: true,
      description: "Details intentionally withheld.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "CtrlKine-AMR",
      subtitle: "2D AMR Simulator & Environment Editor",
      href: "https://github.com/johnson931128/CtrlKine-AMR",
      dates: "",
      active: false,
      private: false,
      description:
        "A lightweight 2D AMR simulator and environment editor built from scratch for validating robot motion, collision behavior, and navigation concepts before hardware deployment.",
      technologies: ["C++", "SFML"],
      links: [githubLink("https://github.com/johnson931128/CtrlKine-AMR")],
      image: "",
      video: "/projects/ctrlkine-amr.mp4",
    },
    {
      title: "AMR Software Stack",
      subtitle: "Real-Robot Navigation Stack",
      href: "https://github.com/johnson931128/amr_software_ws",
      dates: "",
      active: false,
      private: false,
      description:
        "A ROS 2 Jazzy AMR software stack spanning simulation and real-robot deployment, integrating LiDAR, Raspberry Pi 5, ESP32/micro-ROS, SLAM, AMCL, Nav2, and mission-level task control.",
      technologies: [
        "ROS 2 Jazzy",
        "Nav2",
        "SLAM",
        "AMCL",
        "RPLIDAR A1M8",
        "Raspberry Pi 5",
        "ESP32",
        "micro-ROS",
      ],
      links: [
        githubLink("https://github.com/johnson931128/amr_software_ws"),
        demoLink("https://www.youtube.com/watch?v=47RL0V7g4iQ"),
      ],
      image: "/projects/amr-software-stack.jpg",
      video: "",
    },
    {
      title: "WUWAOS",
      subtitle: "Linux-like OS Simulator",
      href: "https://github.com/johnson931128/WUWAOS",
      dates: "",
      active: false,
      private: false,
      description: "",
      technologies: ["Systems Programming"],
      links: [githubLink("https://github.com/johnson931128/WUWAOS")],
      image: "",
      video: "",
    },
    {
      title: "Other Projects",
      subtitle: "Experiments, coursework, and smaller engineering projects.",
      href: "https://github.com/johnson931128",
      dates: "",
      active: false,
      private: false,
      description: "",
      technologies: ["Rust", "C++", "ROS 2", "Embedded", "Systems"],
      links: [githubLink("https://github.com/johnson931128")],
      image: "",
      video: "",
    },
  ],
  hackathons: [] as HackathonItem[],
} as const;
