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

## Implementation

- `src/data/portfolio.ts` defines section, project, experience, optional CV/portrait, and case-study interfaces. Adapters reuse `resume.tsx` rather than copying project descriptions into view components.
- The homepage uses a sticky top navigation and a server-rendered reading layout. Only the active navigation indicator needs client JavaScript. Native anchors retain browser history.
- Six public projects, two experience entries, existing note subjects, MDX article links, and contact links are migrated. WUWAOS links to its public implementation documentation. Missing dates, CV, and portrait remain omitted. Projects without supplied still images use typographic covers; existing videos remain available as links.
- Removed the unused scene controller, carousel, associated homepage components, and legacy CSS. Shared demo/slide full-width styling and global reduced-motion rules remain.
- Existing content pipeline, deployment settings, and demo/slide routes are retained. No push or publication performed.

## Validation record — October 27, 2026

- Final `pnpm lint`: exit 0; 0 errors, 5 existing warnings in generated collection and Open Graph files.
- Final `pnpm build`: exit 0; TypeScript passed and 31 static pages generated. Existing Open Graph font-fetch messages still occur during generation; they did not fail the build.
- Desktop browser review at actual CSS dimensions 1440 × 900 and mobile at 390 × 844. No horizontal overflow (`scrollWidth` 1428 and 378 respectively, accounting for the scrollbar).
- Visually reviewed the biography, project rows, mobile experience entries, contact/footer, and sticky navigation. Verified the Experience anchor clears the mobile header (section top approximately 120px; header bottom approximately 86px), active Experience/Contact indicators, and native Back navigation from Experience to Contact.
- Inspected rendered title, canonical URL, one h1, zero empty links, and zero homepage video elements.
- Parsed the final exported HTML: all 46 anchor links have destinations; 21 unique local route/asset paths resolve to exported files; local fragment targets exist. This checks exported file presence, not live external URL availability or manual acceptance of every deep page.
- Remaining browser checks: keyboard focus/skip-link interaction, reduced-motion emulation, console review, and manual deep-route navigation. Browser automation stopped because it could not confidently identify the current browser URL; no further UI actions were attempted.
- Reduced-motion CSS and visible focus rules are present and statically inspected. This is not a completed browser acceptance check of those behaviors.
- No before/after network or CPU profiling was performed, so no numeric claim of startup speed improvement is made.
