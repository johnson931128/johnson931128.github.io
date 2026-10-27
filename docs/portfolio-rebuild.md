# Portfolio rebuild plan

## Direction

Follow the reference at https://xn--zwq108c.tw/research/ closely in composition: a persistent top navigation, compact biography, generous section spacing, fine separators, image-and-text project rows, and aligned experience dates. Use original content and local styles. The user's October 27 request supersedes the older fixed-sidebar direction for this milestone.

## Milestones and commits

1. Record this plan and inspect the current content and routes.
2. Define typed section, project, experience, and optional resource interfaces. Adapt existing content without duplicating the source data. Update WUWAOS from its public documentation. Keep an unset CV resource hidden until a real URL is supplied.
3. Replace the homepage scene controller and carousel with a server-rendered document. Build reusable navigation, section, link, project, experience, and notes components. Preserve public demo, slides, blog, notes, and external links. Keep private internship material excluded.
4. Verify lint, production build, desktop/mobile layout, anchor navigation, keyboard focus, reduced motion, and metadata. Repair observed issues and commit the verified result.

Commit each coherent milestone locally. Do not push or publish.

## Scope and constraints

- Retain Next.js App Router, TypeScript, Tailwind, Content Collections, and MDX.
- No fabricated achievements, dates, CV, portrait, or project results.
- No global wheel/keyboard interception, full-screen scene transitions, or automatic homepage video downloads.
- Optional resources and future case-study URLs are data interfaces, not dead links or placeholder pages.
- Keep existing deep routes working and preserve unrelated files.
- Use scoped homepage styles to avoid changing article, demo, and slide layouts.

## Validation record

Pending implementation. Record actual checks and limitations here before handoff.
