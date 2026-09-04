# AGENTS.md

## Project purpose

This repository is a long-term personal engineering portfolio and archive. It should communicate careful engineering work, project context, and technical writing with a calm, editorial presentation. Treat the site as a durable body of work rather than a short-lived marketing landing page.

## Stack and existing architecture

- Keep Next.js, React, TypeScript, and Tailwind CSS.
- Use the existing App Router structure under `src/app/`.
- Use the existing Content Collections and MDX pipeline for content-driven notes and articles. Do not replace it with a database or a hard-coded page-only content model without an explicit request.
- Reuse useful existing components under `src/components/`, including the Magic UI components under `src/components/magicui/`, when they support the design and remain accessible. Do not add effects merely because a component exists.
- Keep shared utilities in `src/lib/` and shared visual primitives in `src/components/ui/`.
- Preserve TypeScript strictness and the current package manager/tooling unless a change is explicitly requested.

## Design direction

The intended portfolio direction is inspired by the clarity and persistent navigation of Brittany Chiang's portfolio, but must be an original implementation and visual system.

- Use a light, warm-white background with restrained ink, muted text, and one deliberate accent color.
- Keep the visual language minimal, clean, modern, and editorial. Favor typography, spacing, rules, and small interaction cues over decoration.
- On desktop, use a two-column structure:
  - The left column is persistent and substantive: name, role, short introduction, section navigation, GitHub/LinkedIn/Email links, and a current project or status note.
  - The right column contains the main content: About, Experience, Selected Work, and Engineering Notes.
- Make the left column feel intentionally composed, not like an empty sidebar. Use meaningful copy, navigation context, status, and social/contact links rather than filler widgets.
- On smaller screens, collapse the layout into a clear single-column reading order while retaining navigation and contact access.
- Do not add a technical statistics panel, skill progress bars, terminal-style UI, glassmorphism, excessive gradients, or a dark-theme-first experience.
- Avoid excessive cards and generic AI-generated portfolio patterns. Use cards only when grouping genuinely related project metadata or content.
- Motion must be subtle, purposeful, and respect `prefers-reduced-motion`.

## Information architecture and initial content

Keep the primary portfolio sections distinct and easy to scan:

- About
- Experience
  - Delta Electronics internship
  - NCKU CtrlKine-AMR project
- Selected Work
  - CtrlKine-AMR
  - EtherCAT Analyzer
- Engineering Notes
  - EtherCAT
  - ROS 2
  - Algorithms
  - Systems
  - Embedded

Do not invent achievements, dates, metrics, employers, responsibilities, links, or technical claims. Use clearly marked placeholders only when necessary and keep them easy to replace.

## Content and case studies

- Engineering Notes must be content-driven through Markdown or MDX, with frontmatter/schema validation where the current Content Collections setup supports it.
- Notes should have stable, readable URLs, metadata, headings, code formatting, accessible images, and related-category navigation where useful.
- Projects should be modeled so each selected work item can later grow into a detailed case-study page without rewriting the portfolio shell. Keep project summaries, links, technologies, outcomes, and case-study content separable.
- Prefer writing that explains the problem, constraints, decisions, implementation, and evidence. Do not reduce engineering work to a list of tools.

## Accessibility and SEO

- Use semantic landmarks and headings with one logical `h1` per page.
- Ensure keyboard navigation, visible focus states, sufficient color contrast, descriptive link text, and accessible labels for icon-only controls.
- Do not rely on color, hover, animation, or a visual-only active state to communicate meaning.
- Provide meaningful page titles, descriptions, canonical URLs where appropriate, Open Graph metadata, and useful `alt` text.
- Keep navigation usable when JavaScript is unavailable or delayed when practical, and avoid unnecessary client components.

## Responsive and maintainable implementation

- Define layout behavior from content needs rather than matching a fixed screenshot.
- Keep the desktop two-column relationship stable, but allow the sidebar and content to reflow naturally on tablet/mobile widths.
- Prefer small, composable components with clear responsibilities over a single large page component.
- Keep content data separate from presentation. Avoid duplicating the same project, experience, or note metadata across components.
- Reuse existing styles and tokens before introducing new one-off values. Keep selectors and component APIs understandable.
- Do not add a new dependency when an existing package or a small local implementation is sufficient.

## Working rules

- Before editing, inspect the relevant current files and preserve unrelated user changes.
- Keep changes narrowly scoped to the requested milestone; do not silently redesign unrelated pages, rewrite the repository, or add deployment/configuration work.
- Do not modify generated output such as `.next/` by hand.
- Do not commit, push, or publish unless explicitly requested.
- When a request conflicts with this file, follow the user's explicit request and update this guidance only if they ask for that as part of the task.

## Verification

For implementation changes, run the smallest relevant checks and report exactly what was verified. Typical checks are:

```powershell
pnpm lint
pnpm build
```

For visual or responsive work, also inspect the page at desktop and mobile widths and verify keyboard focus, reduced-motion behavior, navigation, and metadata. Static checks do not replace a manual browser review; distinguish the two in the handoff.
