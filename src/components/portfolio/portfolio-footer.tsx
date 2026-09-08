import { DATA } from "@/data/resume";

const links = [DATA.contact.social.GitHub, DATA.contact.social.LinkedIn, DATA.contact.social.email];

export default function PortfolioFooter() {
  return (
    <footer id="contact" className="full-bleed relative border-t border-border bg-[#171815] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-[1fr_auto] md:items-end lg:px-14 lg:py-20">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/45">Contact / signal open</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Continue the conversation.</h2>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="mt-6 inline-block rounded-sm text-sm text-white/65 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#171815] motion-reduce:transition-none"
          >
            {DATA.contact.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((link) => {
            const href = link.name === "Send Email" ? `mailto:${DATA.contact.email}` : link.url;
            const label = link.name === "Send Email" ? "Email" : link.name;
            return (
              <a
                key={link.name}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-sm text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#171815] motion-reduce:transition-none"
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
