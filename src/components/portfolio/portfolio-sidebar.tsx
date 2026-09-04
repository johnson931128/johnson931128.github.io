import { DATA } from "@/data/resume";

const navigation = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#selected-work", label: "Selected Work" },
  { href: "#engineering-notes", label: "Engineering Notes" },
];

const socialLinks = [
  DATA.contact.social.GitHub,
  DATA.contact.social.LinkedIn,
  DATA.contact.social.email,
];

export default function PortfolioSidebar() {
  return (
    <aside className="flex flex-col border-b border-border pb-10 lg:sticky lg:top-12 lg:h-[calc(100vh-6rem)] lg:border-b-0 lg:pb-0">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          {DATA.role}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {DATA.name}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">{DATA.nameZh}</p>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
          {DATA.description}
        </p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {DATA.educationLine}
        </p>
      </div>

      <nav aria-label="Section navigation" className="mt-10 hidden lg:block">
        <ul className="space-y-3">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group inline-flex items-center gap-3 rounded-sm py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span className="h-px w-6 bg-border transition-all group-hover:w-10 group-hover:bg-primary" aria-hidden />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5 lg:mt-auto">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          const href = social.name === "Send Email" ? `mailto:${DATA.contact.email}` : social.url;
          const label = social.name === "Send Email" ? "Email" : social.name;

          return (
            <a
              key={social.name}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Icon className="size-4" aria-hidden />
              <span>{label}</span>
            </a>
          );
        })}
      </div>

      <div className="mt-8 border-l-2 border-primary pl-4 text-sm">
        <p className="font-medium text-foreground">Current focus</p>
        <p className="mt-1 leading-relaxed text-muted-foreground">
          {DATA.currentStatus}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {DATA.location}
        </p>
      </div>

      <nav aria-label="Mobile section navigation" className="mt-8 lg:hidden">
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-sm text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
