import { DATA } from "@/data/resume";

const links = [DATA.contact.social.GitHub, DATA.contact.social.LinkedIn, DATA.contact.social.email];

export default function PortfolioFooter() {
  return (
    <footer id="contact" className="portfolio-footer full-bleed relative overflow-hidden border-t border-white/10 bg-[#15171a] text-white">
      <div className="footer-cobalt-rule absolute inset-x-0 top-0 h-1.5 bg-primary" aria-hidden />
      <div className="footer-figure font-display" aria-hidden>05</div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 md:grid-cols-[1fr_auto] md:items-end lg:px-14 lg:py-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#ff7548]">05 / Contact signal open</p>
          <h2 className="font-display mt-5 max-w-2xl text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">Continue the conversation.</h2>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="footer-link mt-8 inline-block text-base text-white/68"
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
                className="footer-link text-base text-white/58"
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
