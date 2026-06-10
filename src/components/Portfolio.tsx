import { ExternalLink } from 'lucide-react';
import { usePortfolio } from '@/hooks/useAdminData';

const FALLBACK = [
  { image_url: '/portfolio3.jpeg', title: 'House Construction Initiated', description: 'Foundation phase of a residential property.', category: 'Construction' },
  { image_url: '/portfolio1.jpeg', title: 'Fully Furnished Interior', description: 'Modern interior design and furnishing.', category: 'Interior' },
  { image_url: '/portfolio2.jpeg', title: 'Fully Completed Property', description: 'Turnkey delivery of a residential build.', category: 'Completion' },
];

const Portfolio = () => {
  const { data: items = [] } = usePortfolio();
  const list = items.length > 0 ? items : FALLBACK;

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A glimpse into our work—from groundbreaking to handover.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {list.map((item: any, i: number) => (
            <div key={item.id ?? i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
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
      </div>
    </section>
  );
};

export default Portfolio;
