import { useState } from 'react';
import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import Lightbox from '@/components/Lightbox';
import { useGallery } from '@/hooks/useAdminData';

const GalleryPage = () => {
  const { data: items = [], isLoading } = useGallery();
  const [idx, setIdx] = useState<number | null>(null);
  const images = items.map((i: any) => ({ src: i.image_url, alt: i.title, title: i.title }));

  return (
    <>
      <SEO title="Gallery | Kela Link Ltd" description="Photo gallery from Kela Link Ltd — moments from our work serving the Kenyan diaspora." />
      <PageHero
        eyebrow="Gallery"
        title="Moments From Our Work"
        subtitle="A visual look at the people, projects and progress we are proud of."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
      />
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading gallery…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-muted-foreground max-w-md mx-auto">No photos yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
              {items.map((it: any, i: number) => (
                <button
                  key={it.id}
                  onClick={() => setIdx(i)}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-muted cursor-zoom-in"
                  aria-label={`Open photo ${i + 1}`}
                >
                  <img
                    src={it.image_url}
                    alt={it.title || `Photo ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      {idx !== null && <Lightbox images={images} index={idx} onClose={() => setIdx(null)} onIndexChange={setIdx} />}
      <CTASection title="Want us to share your story too?" />
    </>
  );
};

export default GalleryPage;
