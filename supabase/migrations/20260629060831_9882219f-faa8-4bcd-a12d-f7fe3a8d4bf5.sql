
-- Gallery items
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT SELECT ON public.gallery_items TO anon;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY gallery_public_read ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY gallery_insert ON public.gallery_items FOR INSERT WITH CHECK (true);
CREATE POLICY gallery_update ON public.gallery_items FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY gallery_delete ON public.gallery_items FOR DELETE USING (true);

-- Podcasts
CREATE TABLE public.podcasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  cover_url TEXT,
  duration_seconds INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.podcasts TO authenticated;
GRANT SELECT ON public.podcasts TO anon;
GRANT ALL ON public.podcasts TO service_role;
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;
CREATE POLICY podcasts_public_read ON public.podcasts FOR SELECT USING (true);
CREATE POLICY podcasts_insert ON public.podcasts FOR INSERT WITH CHECK (true);
CREATE POLICY podcasts_update ON public.podcasts FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY podcasts_delete ON public.podcasts FOR DELETE USING (true);

-- Seed testimonials (short, Kenyan + diaspora, non-famous names)
INSERT INTO public.testimonials (client_name, content, rating, location, service, is_approved) VALUES
('Wanjiru Kamau', 'They managed my Nairobi rental flawlessly while I was in Toronto. Monthly reports were always clear and on time.', 5, 'Toronto, Canada', 'Property Management', true),
('Otieno Achieng', 'Booked travel and pickup for my parents visiting from Kisumu. Smooth, professional and very kind to my family.', 5, 'London, UK', 'Travel Planning', true),
('Mueni Nzioka', 'Kela Link handled construction supervision on my plot in Machakos. Honest updates and photos every week.', 5, 'Dubai, UAE', 'Construction Oversight', true),
('Kiprono Langat', 'They ran errands and paid bills for my mum in Eldoret. Reliable team I can finally trust from far away.', 5, 'Oslo, Norway', 'Daily Assistance', true),
('Amina Hassan', 'Quick responses, fair pricing, and they actually deliver. My go-to for anything I need handled back home.', 5, 'Sydney, Australia', 'General Assistance', true),
('Brian Mwangi', 'Helped me set up a small rental business remotely. Tenant screening was thorough and professional.', 5, 'Berlin, Germany', 'Property Management', true);
