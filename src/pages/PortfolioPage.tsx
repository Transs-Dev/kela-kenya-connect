import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';

const projects = [
  { image: '/portfolio3.jpeg', title: 'House Construction Initiated', category: 'Construction Phase', desc: 'The foundation phase of a residential property, marking the beginning of a new home.' },
  { image: '/portfolio1.jpeg', title: 'Fully Furnished Interior', category: 'Interior Design', desc: 'Complete interior design and furnishing for a modern living space.' },
  { image: '/portfolio2.jpeg', title: 'Fully Completed Property', category: 'Project Completion', desc: 'Turnkey delivery of a fully built, furnished and functional residential property.' },
];

const PortfolioPage = () => {
  return (
    <>
      <SEO title="Portfolio — Kela Assistance" description="Recent projects delivered by Kela for clients in the diaspora." />
      <PageHero
        eyebrow="Portfolio"
        title="Recent projects we've delivered."
        subtitle="A glimpse of our work — from groundbreaking to handover."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Portfolio' }]}
      />
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((p) => (
              <article key={p.title} className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#800024]/10 text-[#800024] mb-3">{p.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Ready to be our next success story?" />
    </>
  );
};

export default PortfolioPage;
