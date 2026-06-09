import { Star, MapPin } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';

const testimonials = [
  { name: 'Grace M.', location: 'London, UK', service: 'Property Management', date: 'April 2025', text: 'Kela made managing my Nairobi property overseas so much easier. Their attention to detail and prompt communication were truly impressive.', outcome: '12 months of seamless rent collection.' },
  { name: 'Daniel K.', location: 'Toronto, Canada', service: 'Travel Planning', date: 'July 2025', text: "I relied on Kela to arrange my Kenya vacation, and I couldn't have been happier with the seamless experience they provided.", outcome: 'A flawless 14-day family trip.' },
  { name: 'Sarah N.', location: 'Dallas, USA', service: 'Daily Task Assistance', date: 'October 2025', text: "Kela's assistance with my daily errands was a game-changer. It allowed me to focus on my work without worrying about details.", outcome: 'Mom cared for, 5,000 miles away.' },
  { name: 'James O.', location: 'Sydney, Australia', service: 'Construction Management', date: 'February 2026', text: 'They supervised my home build with weekly photo updates and tight budget control. I never had to fly back.', outcome: '4-bedroom home delivered on time.' },
  { name: 'Mary W.', location: 'Berlin, Germany', service: 'Tailored Solutions', date: 'March 2026', text: 'They built a custom package around my unique needs. Communication was always clear and proactive.', outcome: 'Custom monthly retainer that works.' },
  { name: 'Peter K.', location: 'Dubai, UAE', service: 'Property Management', date: 'May 2026', text: 'Tenant issues that used to stress me out are now handled before they reach me. Worth every shilling.', outcome: 'Zero vacant months in 18 months.' },
];

const TestimonialsPage = () => {
  return (
    <>
      <SEO title="Client Stories — Kela Assistance" description="Real stories from Kenyans abroad who trust Kela." />
      <PageHero
        eyebrow="Client stories"
        title="Trusted by Kenyans across the world."
        subtitle="Real outcomes from real clients in the diaspora."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Client Stories' }]}
      />
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <article key={t.name + t.date} className="p-7 rounded-2xl bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-800 border border-pink-100 dark:border-gray-700 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                  <span className="text-xs text-gray-500">{t.date}</span>
                </div>
                <span className="inline-block self-start px-3 py-1 text-xs font-semibold rounded-full bg-[#800024]/10 text-[#800024] mb-3">{t.service}</span>
                <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed mb-5 flex-1">"{t.text}"</p>
                <div className="text-sm font-semibold text-[#800024] mb-4">Outcome: {t.outcome}</div>
                <div className="flex items-center gap-3 pt-4 border-t border-pink-100 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-[#800024] text-white flex items-center justify-center font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.location}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default TestimonialsPage;
