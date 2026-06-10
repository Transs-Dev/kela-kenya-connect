# Dynamic Admin Panel — Implementation Plan

A full cloud-backed redesign of the admin system. No mock data anywhere. All reads/writes go through Lovable Cloud (Supabase) with realtime subscriptions where it matters.

## 1. Backend (single migration)

New tables in `public` (all with RLS + GRANTs):

- `clients` — name, email, phone, country, notes
- `service_requests` — client_id, service, status (pending/in_progress/completed/on_hold), assigned_to, internal_notes
- `messages` — sender_name, email, subject, body, status (unread/read/archived)
- `services_mgmt` — title, slug, description, icon, is_published, sort_order
- `portfolio_items` — title, description, image_url, category, sort_order
- `testimonials` — client_name, location, service, content, rating, is_approved
- `process_stages` — title, description, step_number, is_active
- `site_settings` — single-row key/value JSONB (contact info, branding, homepage copy)
- `homepage_slides` — image_url, caption, sort_order, is_active

Keep existing `contact_submissions` — surface it inside Messages.

**Storage buckets** (public, created via tool):
- `homepage-slides` — background slideshow images
- `portfolio` — portfolio project images
- `site-assets` — logos / branding

**RLS strategy** (admin uses PIN-based client gate — no auth users yet):
- Public SELECT on published content (`services_mgmt` where published, active `homepage_slides`, approved `testimonials`, `portfolio_items`, active `process_stages`, `site_settings`)
- All writes + admin reads via SECURITY DEFINER RPCs (`admin_*`) since there's no Supabase auth
- Public INSERT on `messages` (anyone can contact)
- Realtime enabled on `messages`, `service_requests`, `contact_submissions`

## 2. Admin UI (rebuilt, no mock data)

All sections use TanStack Query + Supabase realtime channels:

- **WelcomeBanner** — auto-shows on admin login, dismisses after 20s
- **AdminOverview** — live counts (clients, active requests, completed, new inquiries) + recent activity feed from `service_requests` + `messages`
- **Homepage Slides Manager** — file upload from computer → storage bucket → `homepage_slides` row; reorder, toggle active, delete
- **Service Requests** — list/filter, edit status, assign, add internal notes (live)
- **Messages / Inbox** — unified view of `messages` + `contact_submissions`, realtime, mark read/archive, reply via mailto
- **Services** — create/edit/publish/unpublish, sort
- **Portfolio** — image upload, CRUD, reorder
- **Testimonials** — CRUD + approve toggle
- **Process Stages** — CRUD, reorder, toggle active
- **Settings** — edit `site_settings` JSON (contact phone/email, brand colors, hero copy, social links)

## 3. Public site wiring

Replace hardcoded data in `Hero` (slides), `Services`/`EnhancedServices`, `Portfolio`, `Testimonials`, `OurProcess`, `Contact`, `Footer` with live queries from the new tables. Falls back gracefully when empty.

## 4. Out of scope

- Real Supabase auth for admin (keep existing PIN gate; admin RPCs are intentionally callable — noted as a follow-up to harden with real auth + roles)
- Email sending (reply uses mailto)
- Drag-and-drop reordering polish (use number input for sort_order)

## 5. Files

**Migration:** `supabase/migrations/<timestamp>_admin_dynamic.sql`
**New:** `src/components/admin/WelcomeBanner.tsx`, `AdminHomepageSlides.tsx`, `AdminSettings.tsx`; `src/hooks/useAdminData.ts` (rewritten to use supabase); `src/lib/adminApi.ts`
**Rewritten (remove mock data):** `AdminOverview.tsx`, `AdminClients.tsx`, `AdminRequests.tsx`, `AdminMessages.tsx`, `AdminServices.tsx`, `AdminPortfolio.tsx`, `AdminTestimonials.tsx`, `AdminProcessSettings.tsx`, `AdminSidebar.tsx`, `Admin.tsx`
**Updated public components:** `Hero.tsx`, `Services.tsx`/`EnhancedServices.tsx`, `Portfolio.tsx`, `Testimonials.tsx`, `OurProcess.tsx`, `Contact.tsx`, `Footer.tsx`

Confirm to proceed and I'll ship migration + storage buckets + all admin/public rewiring in parallel.
