import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import { usePortfolio } from '@/hooks/useAdminData';

const PortfolioPage = () => {
  const { data: items = [], isLoading } = usePortfolio();

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
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading projects…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-muted-foreground max-w-md mx-auto">No projects published yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {items.map((p: any) => (
                <article key={p.id} className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                  {p.image_url && (
                    <div className="overflow-hidden">
                      <img src={p.image_url} alt={p.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    {p.category && <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#800024]/10 text-[#800024] mb-3">{p.category}</span>}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTASection title="Ready to be our next success story?" />
    </>
  );
};

export default PortfolioPage;
