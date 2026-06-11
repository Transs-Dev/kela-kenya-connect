import { usePortfolio } from '@/hooks/useAdminData';

const Portfolio = () => {
  const { data: items = [], isLoading } = usePortfolio();

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A glimpse into our work — from groundbreaking to handover.</p>
        </div>
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading projects…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground">New projects coming soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {items.map((item: any) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
                {item.image_url && (
                  <div className="relative overflow-hidden">
                    <img src={item.image_url} alt={item.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  {item.category && <span className="text-xs uppercase tracking-wider text-primary font-bold">{item.category}</span>}
                  <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
