import { Star } from 'lucide-react';
import { useTestimonials } from '@/hooks/useAdminData';

const Testimonials = () => {
  const { data: all = [] } = useTestimonials();
  const items = all.filter((t: any) => t.is_approved);

  if (items.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Stories</h2>
          <p className="text-muted-foreground">Testimonials coming soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Hear from our satisfied clients who trust us with their important needs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((t: any) => (
            <div key={t.id} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl text-primary/20">"</div>
              <div className="flex items-center mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 relative z-10">{t.content}</p>
              <div className="border-t pt-4">
                <p className="font-bold">{t.client_name}</p>
                {(t.location || t.service) && <p className="text-xs text-muted-foreground">{[t.location, t.service].filter(Boolean).join(' · ')}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
