## KELA Platform — Cloud Media, Audit Log, Messaging, Testimonials, AI Assistant & More

A comprehensive upgrade turning the admin panel and public site into a fully cloud-driven system.

### 1. Cloud Storage for Media
- Create public Supabase Storage bucket `media` with RLS policies (public read, authenticated write).
- New helper `uploadToStorage(file, folder)` in `src/lib/adminApi.ts` replacing `fileToDataUrl`.
- Update `AdminHomepageSlides`, `AdminPortfolio`, and `AdminSettings` (logo/branding) to upload to bucket and store returned public URL.
- Migrate references everywhere (Hero, Portfolio, Settings) to use URLs from DB.

### 2. Admin Activity Audit Log
- New table `audit_logs` (actor, action, entity, entity_id, details JSONB, created_at).
- Helper `logActivity()` called from every admin mutation (services, requests, testimonials, portfolio, messages, slides, settings).
- New admin section "Activity Log" with filterable list, realtime updates.

### 3. Messages / Inquiries Pipeline
- Public `Contact.tsx` form already inserts into `contact_submissions` — verify and ensure realtime visible in `AdminMessages`.
- New `ServiceBookingForm` component on each ServiceDetail page → inserts into `service_requests` AND `messages` so admin sees it.
- Add realtime subscription for `contact_submissions` in admin.

### 4. Public Testimonial Submission
- New `TestimonialForm` component on homepage + Testimonials page.
- Inserts with `is_approved=false` → shows in admin moderation queue.
- Public Testimonials only show approved.

### 5. Portfolio & Services Sync
- Public `Portfolio.tsx` already queries `portfolio_items` — verify queries don't filter incorrectly. Drop hardcoded FALLBACK or only show as last resort.
- Public Services page must query `services_mgmt` where `is_published=true`.

### 6. Website Settings Driving Public Site
- Ensure `site_settings` is consumed by Header (logo), Footer (contact, social), Contact section (phone/email/whatsapp), Hero (tagline) via a `useSiteSettings()` hook.

### 7. Lovable AI Chatbot
- Edge function `ai-assistant` using Lovable AI Gateway (`google/gemini-3-flash-preview`) with system prompt about KELA services.
- Floating chat bubble bottom-right, ABOVE WhatsApp button (stacked vertically).
- New `AIAssistant.tsx` component with chat UI.

### 8. Service Booking Forms
- Add booking form on each service detail page (name, email, phone, preferred date, message).
- Submission inserts into `service_requests` + `messages` for admin notification.

### 9. Welcome Popup
- Re-enable/recreate `WelcomePopup` mounted in `MainLayout`, shows once per session, auto-dismiss after 20s.

### Technical
- Single migration adds `audit_logs` table, storage bucket, updates RLS so anon can insert testimonials/messages, public can read approved testimonials & published content.
- New files: `src/lib/audit.ts`, `src/hooks/useSiteSettings.ts`, `src/components/AIAssistant.tsx`, `src/components/TestimonialForm.tsx`, `src/components/ServiceBookingForm.tsx`, `src/components/admin/AdminAuditLog.tsx`, `supabase/functions/ai-assistant/index.ts`.
- Updated: AdminSidebar, AdminHomepageSlides, AdminPortfolio, AdminSettings, Hero, Portfolio (remove fallback), Services public, Footer, Header, Contact, MainLayout, ServiceDetail.
