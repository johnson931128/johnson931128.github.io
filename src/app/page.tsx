import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { portfolioContactLinks, portfolioExperiences, portfolioProjects, portfolioResources, portfolioSections } from "@/data/portfolio";
import Navigation from "@/components/portfolio/home/navigation";
import Section from "@/components/portfolio/home/section";
import ResourceLinks from "@/components/portfolio/home/resource-links";
import ProjectList from "@/components/portfolio/home/project-list";
import ExperienceList from "@/components/portfolio/home/experience-list";
import EngineeringNotes from "@/components/portfolio/home/engineering-notes";
import styles from "@/components/portfolio/home/portfolio.module.css";

export const metadata: Metadata = {
  title: { absolute: `${DATA.name} (${DATA.nameZh}) | Software & Systems Engineering` },
  description: DATA.description,
  alternates: { canonical: "/" },
  openGraph: { title: `${DATA.name} · Engineering Portfolio`, description: DATA.description, url: "/" },
};

export default function Page() {
  return (
    <div className={styles.portfolio}>
      <a href="#main-content" className={styles.skipLink}>Skip to content</a>
      <Navigation name={DATA.name} nameZh={DATA.nameZh} sections={portfolioSections} cv={portfolioResources.cv} />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <section id="about" className={styles.about} aria-labelledby="about-heading">
          <div className={styles.biography}>
            <h1 id="about-heading">{DATA.name} <span lang="zh-Hant">{DATA.nameZh}</span></h1>
            <p className={styles.affiliation}>{DATA.educationLine}</p>
            <p className={styles.tagline}>Software systems, embedded development & robotics.</p>
            <p>{DATA.summary}</p><p>{DATA.currentStatus}</p>
            <ResourceLinks links={[...portfolioContactLinks, ...(portfolioResources.cv ? [portfolioResources.cv] : [])]} label="Contact and profiles" />
          </div>
          {portfolioResources.portrait ? <Image className={styles.portrait} src={portfolioResources.portrait.src} alt={portfolioResources.portrait.alt} width={260} height={320} /> : null}
        </section>
        <Section id="work" title="Selected Projects" aside={<a href={DATA.contact.social.GitHub.url}>More on GitHub <span aria-hidden="true">↗</span></a>}><ProjectList projects={portfolioProjects} /></Section>
        <Section id="experience" title="Experience"><ExperienceList experiences={portfolioExperiences} /></Section>
        <Section id="learning-notes" title="Engineering Notes" aside={<Link href="/blog" prefetch={false}>All articles <span aria-hidden="true">↗</span></Link>}><EngineeringNotes /></Section>
        <Section id="contact" title="Contact"><div className={styles.contact}><p>For conversations about software, systems, and engineering projects.</p><a className={styles.email} href={`mailto:${DATA.contact.email}`}>{DATA.contact.email}</a><ResourceLinks links={portfolioContactLinks.filter((link) => link.label !== "Email")} label="Social profiles" /></div></Section>
      </main>
      <footer className={styles.footer}><span>{DATA.name} <span lang="zh-Hant">· {DATA.nameZh}</span></span><a href="#about">Back to top ↑</a></footer>
    </div>
  );
}
