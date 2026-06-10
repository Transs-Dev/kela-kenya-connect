
-- ===== CLIENTS =====
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  country text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients TO anon, authenticated;
GRANT ALL ON public.clients TO service_role;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clients_all" ON public.clients FOR ALL USING (true) WITH CHECK (true);

-- ===== SERVICE REQUESTS =====
CREATE TABLE public.service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  client_name text NOT NULL,
  client_email text,
  service text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending',
  assigned_to text,
  internal_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requests TO anon, authenticated;
GRANT ALL ON public.service_requests TO service_role;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_requests_all" ON public.service_requests FOR ALL USING (true) WITH CHECK (true);

-- ===== MESSAGES =====
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL,
  email text,
  phone text,
  subject text,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'unread',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messages TO anon, authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_all" ON public.messages FOR ALL USING (true) WITH CHECK (true);

-- ===== SERVICES MGMT =====
CREATE TABLE public.services_mgmt (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services_mgmt TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services_mgmt TO authenticated;
GRANT ALL ON public.services_mgmt TO service_role;
ALTER TABLE public.services_mgmt ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_public_read" ON public.services_mgmt FOR SELECT USING (true);
CREATE POLICY "services_write" ON public.services_mgmt FOR INSERT WITH CHECK (true);
CREATE POLICY "services_update" ON public.services_mgmt FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "services_delete" ON public.services_mgmt FOR DELETE USING (true);

-- ===== PORTFOLIO =====
CREATE TABLE public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  category text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_items TO authenticated;
GRANT ALL ON public.portfolio_items TO service_role;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "portfolio_public_read" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "portfolio_insert" ON public.portfolio_items FOR INSERT WITH CHECK (true);
CREATE POLICY "portfolio_update" ON public.portfolio_items FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "portfolio_delete" ON public.portfolio_items FOR DELETE USING (true);

-- ===== TESTIMONIALS =====
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  location text,
  service text,
  content text NOT NULL,
  rating int DEFAULT 5,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials_public_read" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "testimonials_admin_read" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "testimonials_insert" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "testimonials_update" ON public.testimonials FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "testimonials_delete" ON public.testimonials FOR DELETE USING (true);

-- ===== PROCESS STAGES =====
CREATE TABLE public.process_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  step_number int NOT NULL DEFAULT 1,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.process_stages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.process_stages TO authenticated;
GRANT ALL ON public.process_stages TO service_role;
ALTER TABLE public.process_stages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "process_public_read" ON public.process_stages FOR SELECT USING (true);
CREATE POLICY "process_insert" ON public.process_stages FOR INSERT WITH CHECK (true);
CREATE POLICY "process_update" ON public.process_stages FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "process_delete" ON public.process_stages FOR DELETE USING (true);

-- ===== SITE SETTINGS =====
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings_insert" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "settings_update" ON public.site_settings FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "settings_delete" ON public.site_settings FOR DELETE USING (true);

INSERT INTO public.site_settings (key, value) VALUES
  ('contact', '{"phone":"+254726285869","email":"info@kelaassistance.com","address":"Nairobi, Kenya","whatsapp":"+254726285869"}'::jsonb),
  ('branding', '{"brandName":"KELA","tagline":"Kenyans Living Abroad"}'::jsonb),
  ('homepage', '{"heroTitle":"Simplifying Life Across Borders","heroSubtitle":"Property, travel and errand services for Kenyans abroad."}'::jsonb),
  ('social', '{"facebook":"","instagram":"","twitter":"","linkedin":""}'::jsonb);

-- ===== HOMEPAGE SLIDES =====
CREATE TABLE public.homepage_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.homepage_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.homepage_slides TO authenticated;
GRANT ALL ON public.homepage_slides TO service_role;
ALTER TABLE public.homepage_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "slides_public_read" ON public.homepage_slides FOR SELECT USING (true);
CREATE POLICY "slides_insert" ON public.homepage_slides FOR INSERT WITH CHECK (true);
CREATE POLICY "slides_update" ON public.homepage_slides FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "slides_delete" ON public.homepage_slides FOR DELETE USING (true);

-- ===== Realtime =====
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.clients;

-- ===== Seed services_mgmt (only if empty) =====
INSERT INTO public.services_mgmt (title, slug, description, icon, sort_order)
SELECT * FROM (VALUES
  ('Property Management', 'property-management', 'Rent collection, maintenance and tenant care while you live abroad.', 'Home', 1),
  ('Construction Management', 'construction-management', 'End-to-end oversight of your build, from foundation to handover.', 'HardHat', 2),
  ('Travel Planning', 'travel-planning', 'Flights, stays and itineraries — planned to feel effortless.', 'Plane', 3),
  ('Daily Task Assistance', 'daily-tasks', 'Errands, appointments and documents handled for you in Kenya.', 'ListChecks', 4),
  ('Tailored Solutions', 'tailored-solutions', 'Custom services designed around your unique needs.', 'Sparkles', 5)
) AS v(title, slug, description, icon, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.services_mgmt);

INSERT INTO public.process_stages (title, description, step_number)
SELECT * FROM (VALUES
  ('Discovery', 'We learn your goals, constraints and timeline.', 1),
  ('Proposal', 'A clear scope with deliverables and pricing.', 2),
  ('Execution', 'Boots-on-the-ground action in Kenya.', 3),
  ('Updates', 'Regular reports with photos and progress.', 4),
  ('Handover', 'Completion review and documentation.', 5),
  ('Aftercare', 'Ongoing support whenever you need us.', 6)
) AS v(title, description, step_number)
WHERE NOT EXISTS (SELECT 1 FROM public.process_stages);
