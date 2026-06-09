
# Kela Assistance — Multi-Page Redesign Plan

Convert the current single-page site into a polished, multi-page React Router app with refreshed UX, while preserving the existing dark pink (#800024) / soft pink (#C17A8E) brand theme.

## 1. Routing & Structure

Refactor `src/App.tsx` to use a shared `MainLayout` (Header + Footer + WhatsApp button) wrapping all public routes:

```
/                      Home
/about                 Our Story
/services              Services overview
/services/property-management
/services/construction-management
/services/travel-planning
/services/daily-tasks
/services/tailored-solutions
/process               Our Process
/portfolio             Portfolio / Projects
/testimonials          Client Stories
/faq                   FAQ
/contact               Contact
/admin                 Admin (existing)
*                      NotFound
```

- Update `Header.tsx` nav to use `react-router-dom` `NavLink`s instead of scroll-to-section anchors. Sticky, with active-state styling in brand pink.
- Footer quick links also become real routes.

## 2. Reusable Layout & UI Primitives

New files:
- `src/components/layout/MainLayout.tsx` — Header + `<Outlet />` + Footer + WhatsAppChatbot
- `src/components/layout/PageHero.tsx` — reusable page header (title, subtitle, breadcrumb, pink gradient band)
- `src/components/CTASection.tsx` — repeated "Talk to us" band with WhatsApp + Call buttons (used on every page)
- `src/components/ServiceCard.tsx` — used on Home preview + Services overview

## 3. Home Page Redesign (`src/pages/Index.tsx`)

Sections, in order:
1. Hero — headline "Simplifying Life Across Borders for Kenyans Abroad", supporting line, three CTAs (Explore Services → /services, Chat on WhatsApp, Call Us). Cleaner two-column layout, more whitespace, subtle gradient.
2. Trust stats strip — "10+ yrs experience", "500+ clients served", "15+ countries", "24/7 support".
3. Services preview — 5 clickable cards linking to each service page.
4. Why Choose Us — 4 value props (Trust, Transparency, Local Expertise, Diaspora-First).
5. Simplified Process preview — 3 condensed steps + link to /process.
6. Testimonials preview — 3 cards + link to /testimonials.
7. Final CTA band.

## 4. Other Pages

- **About** (`pages/About.tsx`): narrative origin story, Mission, Vision, Values grid (Trust / Reliability / Transparency / Care), team/founder note, CTA.
- **Services overview** (`pages/Services.tsx`): intro + grid of 5 ServiceCards linking to detail pages.
- **Service detail pages** (`pages/services/PropertyManagement.tsx`, `ConstructionManagement.tsx`, `TravelPlanning.tsx`, `DailyTasks.tsx`, `TailoredSolutions.tsx`): each with hero, "What it is", "Benefits" list, "How it works" steps, CTA. Driven by a shared `ServiceDetail` component fed by per-page data to keep code small.
- **Process** (`pages/Process.tsx`): wraps existing `OurProcess` content, restyled as a vertical timeline with numbered pink badges.
- **Portfolio** (`pages/PortfolioPage.tsx`): existing Portfolio component, with PageHero.
- **Testimonials** (`pages/TestimonialsPage.tsx`): restructured cards showing name, location, service used, outcome, rating.
- **FAQ** (`pages/FAQPage.tsx`): existing FAQ in new layout.
- **Contact** (`pages/ContactPage.tsx`): existing Contact form + info, with prominent phone/WhatsApp.

## 5. Visual / UX Polish

- Keep `--primary` pink tokens as-is in `index.css`.
- Tighten typography scale, increase section padding (`py-24`), use container max-w-6xl.
- Sticky header with shadow on scroll (already partially in place — verify).
- Active NavLink underline in pink.
- Mobile menu remains; update to route-based.
- SEO: per-page `<title>` + meta description via small `SEO` helper component using `document.title` effect, plus single H1 per page.

## 6. Out of Scope

- No backend/schema changes.
- Admin page logic unchanged (still /admin).
- No new images — reuse existing files in `/public`.
- Color tokens unchanged.

## Technical Notes

- All nav uses `<NavLink>` / `useNavigate`; remove `scrollIntoView` from Header.
- CTA buttons reuse the same `openWhatsApp` and `tel:` helpers; centralize in `src/lib/contact.ts`.
- Existing components (`OurStory`, `EnhancedServices`, `OurProcess`, `Portfolio`, `Testimonials`, `FAQ`, `Contact`) get wrapped/lightly refactored rather than rewritten where possible.
- Index page is rebuilt to use new preview sections instead of full sections.
