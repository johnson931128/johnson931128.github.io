import type { PortfolioLink } from "@/data/portfolio";
import styles from "./portfolio.module.css";

export default function ResourceLinks({ links, label }: { links: readonly PortfolioLink[]; label: string }) {
  if (!links.length) return null;
  return (
    <ul className={styles.links} aria-label={label}>
      {links.map((link) => (
        <li key={`${link.label}-${link.href}`}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  );
}
