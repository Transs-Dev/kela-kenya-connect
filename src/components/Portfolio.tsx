import { useState } from 'react';
import { usePortfolio } from '@/hooks/useAdminData';
import Lightbox from './Lightbox';

const Portfolio = () => {
  const { data: items = [], isLoading } = usePortfolio();
  const [idx, setIdx] = useState<number | null>(null);
  const withImages = items.filter((p: any) => p.image_url);
  const lbImages = withImages.map((p: any) => ({ src: p.image_url, alt: p.title, title: p.title }));

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
            {items.map((item: any) => {
              const i = withImages.findIndex((x: any) => x.id === item.id);
              return (
                <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
                  {item.image_url && (
                    <button
                      type="button"
                      onClick={() => i >= 0 && setIdx(i)}
                      className="relative overflow-hidden block w-full cursor-zoom-in"
                      aria-label={`Open ${item.title}`}
                    >
                      <img src={item.image_url} alt={item.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                    </button>
                  )}
                  <div className="p-6">
                    {item.category && <span className="text-xs uppercase tracking-wider text-primary font-bold">{item.category}</span>}
                    <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {idx !== null && <Lightbox images={lbImages} index={idx} onClose={() => setIdx(null)} onIndexChange={setIdx} />}
    </section>
  );
};

export default Portfolio;
