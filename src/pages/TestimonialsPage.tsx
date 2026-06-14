import { Star, MapPin } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import TestimonialForm from '@/components/TestimonialForm';
import { useTestimonials } from '@/hooks/useAdminData';

const TestimonialsPage = () => {
  const { data: cloud = [], isLoading } = useTestimonials();
  const approved = cloud.filter((t: any) => t.is_approved);

  return (
    <>
      <SEO title="Client Stories | Kela Link Ltd" description="Real stories from Kenyans abroad who trust Kela Link Ltd." />
      <PageHero
        eyebrow="Client Stories"
        title="Trusted by Kenyans Across the World."
        subtitle="Real outcomes from real clients in the diaspora."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Client Stories' }]}
      />
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading stories…</p>
          ) : approved.length === 0 ? (
            <div className="text-center max-w-md mx-auto">
              <p className="text-muted-foreground mb-2">No client stories published yet.</p>
              <p className="text-sm text-muted-foreground">Share your experience with Kela Link Ltd using the form below.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {approved.map((t: any) => (
                <article key={t.id} className="p-7 rounded-2xl bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-800 border border-pink-100 dark:border-gray-700 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-yellow-400">{Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                    <span className="text-xs text-gray-500">{new Date(t.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                  {t.service && <span className="inline-block self-start px-3 py-1 text-xs font-semibold rounded-full bg-[#800024]/10 text-[#800024] mb-3">{t.service}</span>}
                  <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed mb-5 flex-1">"{t.content}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-pink-100 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-[#800024] text-white flex items-center justify-center font-bold">{t.client_name?.charAt(0) || 'K'}</div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{t.client_name}</div>
                      {t.location && <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.location}</div>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <TestimonialForm />
      <CTASection />
    </>
  );
};

export default TestimonialsPage;
