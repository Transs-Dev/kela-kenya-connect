import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { useSlides, useSiteSettings } from '@/hooks/useAdminData';

const Hero = () => {
  const { data: slides = [] } = useSlides();
  const { data: settings = {} } = useSiteSettings();
  const activeSlides = slides.filter((s: any) => s.is_active);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (activeSlides.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % activeSlides.length), 5000);
    return () => clearInterval(t);
  }, [activeSlides.length]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const phone = (settings as any).contact?.whatsapp || '+254726285869';
  const openWhatsApp = () => window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I would like to learn more about your services.')}`, '_blank');

  const heroTitle = (settings as any).homepage?.heroTitle || 'Simplifying Life Across Borders';
  const heroSubtitle = (settings as any).homepage?.heroSubtitle || 'Kela empowers Kenyans abroad by simplifying property, travel, and digital needs.';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Slideshow backgrounds */}
      {activeSlides.length > 0 ? (
        activeSlides.map((s: any, i: number) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-1000 bg-cover bg-center"
            style={{ backgroundImage: `url(${s.image_url})`, opacity: i === idx ? 1 : 0 }}
          />
        ))
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800" />
      )}
      {activeSlides.length > 0 && <div className="absolute inset-0 bg-black/40" />}

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`text-center lg:text-left animate-fade-in ${activeSlides.length > 0 ? 'text-white' : ''}`}>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${activeSlides.length > 0 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              {heroTitle.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="text-primary">{heroTitle.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${activeSlides.length > 0 ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}`}>
              {heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={() => scrollTo('services')} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold group">
                Explore Services<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button onClick={openWhatsApp} variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold bg-background/80 backdrop-blur">
                <MessageCircle className="mr-2 w-5 h-5" />Chat Now
              </Button>
              <Button onClick={() => scrollTo('contact')} variant="ghost" size="lg" className={`px-8 py-4 text-lg font-semibold ${activeSlides.length > 0 ? 'text-white hover:bg-white/10' : 'text-primary'}`}>
                <Phone className="mr-2 w-5 h-5" />Call Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {activeSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {activeSlides.map((_: any, i: number) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
