import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone, ShieldCheck, Globe2, HeartHandshake, Link2, Headphones, Images as ImagesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import Lightbox from '@/components/Lightbox';
import { SERVICES } from '@/data/services';
import TestimonialForm from '@/components/TestimonialForm';
import Testimonials from '@/components/Testimonials';
import { openWhatsApp, callPhone, PHONE_DISPLAY } from '@/lib/contact';
import { useSlides, useSiteSettings, useServicesMgmt, usePortfolio, useGallery, usePodcasts } from '@/hooks/useAdminData';

const countries = [
  { name: 'Kenya', code: 'ke' },
  { name: 'United States', code: 'us' },
  { name: 'Canada', code: 'ca' },
  { name: 'United Kingdom', code: 'gb' },
  { name: 'United Arab Emirates', code: 'ae' },
  { name: 'Australia', code: 'au' },
  { name: 'Norway', code: 'no' },
  { name: 'Germany', code: 'de' },
];

const stats = [
  { value: '500+', label: 'Clients served' },
  { value: '5+', label: 'Years experience' },
  { value: '8', label: 'Countries served' },
  { value: '24/7', label: 'Support availability' },
];

const whyUs = [
  { icon: ShieldCheck, title: 'Trust and Transparency', text: 'Vetted team, clear pricing and reports you can rely on.' },
  { icon: Globe2, title: 'Diaspora First', text: 'Built by Kenyans abroad, for Kenyans abroad.' },
  { icon: HeartHandshake, title: 'Personal Care', text: 'A dedicated point of contact who knows your story.' },
  { icon: Link2, title: 'Local Expertise', text: 'Deep on-the-ground knowledge across Kenya.' },
];

const processPreview = [
  { n: '01', title: 'Reach out', desc: 'Tell us what you need via WhatsApp or call.' },
  { n: '02', title: 'We plan', desc: 'A clear proposal with scope, timeline and price.' },
  { n: '03', title: 'We deliver', desc: 'Execution with regular updates and proof.' },
];

const Index = () => {
  const { data: slides = [] } = useSlides();
  const { data: settings = {} } = useSiteSettings();
  const { data: cloudServices = [] } = useServicesMgmt();
  const { data: portfolio = [] } = usePortfolio();
  const { data: gallery = [] } = useGallery();
  const { data: podcasts = [] } = usePodcasts();

  const activeSlides = slides.filter((s: any) => s.is_active);
  const publishedServices = cloudServices.filter((s: any) => s.is_published);
  const featuredPortfolio = portfolio.slice(0, 6);
  const featuredGallery = (gallery.filter((g: any) => g.is_featured).length > 0
    ? gallery.filter((g: any) => g.is_featured)
    : gallery
  ).slice(0, 5);
  const publishedPodcasts = podcasts.filter((p: any) => p.is_published);

  const homepage = (settings as any).homepage || {};
  const branding = (settings as any).branding || {};
  const heroTitle = homepage.heroTitle || 'Simplifying Life Across Borders';
  const heroSubtitle = homepage.heroSubtitle || 'Kela Link Ltd empowers Kenyans abroad with trusted property, construction, travel and daily assistance services back home, handled with care.';

  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    if (activeSlides.length < 2) return;
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % activeSlides.length), 5000);
    return () => clearInterval(t);
  }, [activeSlides.length]);

  const [lightIdx, setLightIdx] = useState<number | null>(null);
  const galleryLb = featuredGallery.map((g: any) => ({ src: g.image_url, alt: g.title, title: g.title }));

  const [portfolioLightIdx, setPortfolioLightIdx] = useState<number | null>(null);
  const portfolioWithImg = featuredPortfolio.filter((p: any) => p.image_url);
  const portfolioLb = portfolioWithImg.map((p: any) => ({ src: p.image_url, alt: p.title, title: p.title }));

  const heroImage = activeSlides.length === 0 ? (branding.heroImage || '/portfolio2.jpeg') : null;

  return (
    <>
      <SEO
        title="Kela Link Ltd | Property, Travel & Errand Services in Kenya"
        description="Property management, construction, travel planning and daily assistance in Kenya, trusted by the Kenyan diaspora worldwide."
      />

      {/* Hero with dynamic slideshow */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        {activeSlides.length > 0 ? (
          <>
            {activeSlides.map((s: any, i: number) => (
              <div
                key={s.id}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{ backgroundImage: `url(${s.image_url})`, opacity: i === slideIdx ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="absolute inset-0 opacity-40 dark:opacity-20 [background-image:radial-gradient(circle_at_30%_20%,#C17A8E_0,transparent_45%),radial-gradient(circle_at_80%_80%,#800024_0,transparent_45%)]" />
          </div>
        )}

        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full mb-5 ${activeSlides.length > 0 ? 'bg-white/15 text-white backdrop-blur' : 'bg-[#800024]/10 text-[#800024]'}`}>
                <Link2 className="w-3 h-3" /> Kenyans Living Abroad
              </span>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight ${activeSlides.length > 0 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {heroTitle}
              </h1>
              <p className={`text-lg md:text-xl mb-8 leading-relaxed max-w-xl ${activeSlides.length > 0 ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}`}>
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-[#800024] hover:bg-[#6a001d] text-white px-7 py-6 text-base font-semibold shadow-lg">
                  <Link to="/services">
                    Explore Services <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className={`border-2 px-7 py-6 text-base font-semibold ${activeSlides.length > 0 ? 'border-white text-white bg-white/10 hover:bg-white hover:text-[#800024] backdrop-blur' : 'border-[#800024] text-[#800024] hover:bg-[#800024] hover:text-white'}`}>
                  <Link to="/portfolio">
                    <ImagesIcon className="mr-2 w-5 h-5" /> View Portfolio
                  </Link>
                </Button>
                <Button onClick={() => openWhatsApp()} size="lg" variant="ghost" className={`px-5 py-6 text-base font-semibold ${activeSlides.length > 0 ? 'text-white hover:bg-white/10' : 'text-[#800024] hover:bg-[#800024]/5'}`}>
                  <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp
                </Button>
                <Button onClick={callPhone} size="lg" variant="ghost" className={`px-5 py-6 text-base font-semibold ${activeSlides.length > 0 ? 'text-white hover:bg-white/10' : 'text-[#800024] hover:bg-[#800024]/5'}`}>
                  <Phone className="mr-2 w-5 h-5" /> {PHONE_DISPLAY}
                </Button>
              </div>
            </div>

            {activeSlides.length === 0 && heroImage && (
              <div className="relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img src={heroImage} alt="Kela Link Ltd services in Kenya" className="w-full h-[420px] md:h-[520px] object-cover" />
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#C17A8E]/30 rounded-full blur-2xl" />
              </div>
            )}
          </div>
        </div>

        {activeSlides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {activeSlides.map((_: any, i: number) => (
              <button key={i} onClick={() => setSlideIdx(i)} aria-label={`Slide ${i + 1}`} className={`h-2 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
            ))}
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#800024] to-[#C17A8E] bg-clip-text text-transparent">{s.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">What we do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              Services Built for the Diaspora
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Tap any service to see how we deliver it, end to end.</p>
          </div>
          {publishedServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedServices.map((s: any) => (
                <Link key={s.id} to={`/services/${s.slug}`} className="group p-7 rounded-2xl border border-pink-100 dark:border-gray-700 hover:border-[#C17A8E] hover:shadow-lg transition-all bg-white dark:bg-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#800024] to-[#C17A8E] flex items-center justify-center mb-4">
                    <Link2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{s.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Book or Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          )}
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-2 border-[#800024] text-[#800024] hover:bg-[#800024] hover:text-white">
              <Link to="/services">View all services <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Portfolio */}
      {featuredPortfolio.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">Featured Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">Selected Work, Delivered with Care</h2>
              <p className="text-gray-600 dark:text-gray-300">A taste of recent projects. Click any image to view it up close.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 max-w-6xl mx-auto">
              {featuredPortfolio.map((p: any) => {
                const i = portfolioWithImg.findIndex((x: any) => x.id === p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => p.image_url && i >= 0 && setPortfolioLightIdx(i)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted text-left cursor-zoom-in"
                  >
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : null}
                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      {p.category && <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-[#C17A8E]">{p.category}</span>}
                      <h3 className="text-white font-bold text-sm md:text-base line-clamp-1">{p.title}</h3>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-center mt-10 flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg" className="bg-[#800024] hover:bg-[#6a001d] text-white font-semibold">
                <Link to="/portfolio">See Full Portfolio <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">Why Kela Link</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">Built on Trust, Run with Care</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w) => {
              const I = w.icon;
              return (
                <div key={w.title} className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-[#C17A8E] transition-colors bg-white dark:bg-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-[#800024]/10 flex items-center justify-center mb-4">
                    <I className="w-6 h-6 text-[#800024]" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{w.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{w.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Presence — flag images for cross-device reliability */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">Global Presence</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">Serving Kenyans Across the World</h2>
            <p className="text-gray-600 dark:text-gray-300">Real clients, real outcomes, in the countries where the diaspora calls home.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-[#C17A8E] transition-colors">
                <img
                  src={`https://flagcdn.com/w80/${c.code}.png`}
                  srcSet={`https://flagcdn.com/w160/${c.code}.png 2x`}
                  width={40}
                  height={28}
                  alt={`${c.name} flag`}
                  loading="lazy"
                  className="w-10 h-7 object-cover rounded-sm shadow-sm shrink-0"
                />
                <span className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      {featuredGallery.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">Gallery</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">Moments From Our Work</h2>
              <p className="text-gray-600 dark:text-gray-300">A small look at the people and places we serve every day.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
              {featuredGallery.map((g: any, i: number) => (
                <button
                  key={g.id}
                  onClick={() => setLightIdx(i)}
                  className={`group relative aspect-square overflow-hidden rounded-xl cursor-zoom-in bg-muted ${i === 0 ? 'col-span-2 row-span-2 md:row-span-1 md:col-span-2 aspect-[4/3] md:aspect-square' : ''}`}
                  aria-label={`Open gallery photo ${i + 1}`}
                >
                  <img src={g.image_url} alt={g.title || ''} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </button>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild className="bg-[#800024] hover:bg-[#6a001d] text-white font-semibold">
                <Link to="/gallery">View more photos <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Listen — podcasts */}
      {publishedPodcasts.length > 0 && (
        <section id="listen" className="py-20 bg-gradient-to-br from-[#800024]/5 via-white to-[#C17A8E]/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">
                <Headphones className="w-4 h-4" /> Podcast
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
                Listen to Our Live Talks with Clients
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Real conversations, real diaspora stories. Press play on any episode below.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {publishedPodcasts.slice(0, 4).map((p: any) => (
                <article key={p.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-start gap-4 mb-3">
                    {p.cover_url ? (
                      <img src={p.cover_url} alt="" className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#800024] to-[#C17A8E] flex items-center justify-center shrink-0">
                        <Headphones className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2">{p.title}</h3>
                      {p.description && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.description}</p>}
                    </div>
                  </div>
                  <audio src={p.audio_url} controls preload="none" className="w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">A Simple, Transparent Process</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {processPreview.map((p) => (
              <div key={p.n} className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
                <div className="text-5xl font-bold text-[#C17A8E]/40 mb-3">{p.n}</div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="ghost" className="text-[#800024] hover:bg-[#800024]/5 font-semibold">
              <Link to="/process">See the full process <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Real Client Stories (from cloud, approved only) */}
      <Testimonials />
      <TestimonialForm />
      <CTASection />

      {lightIdx !== null && <Lightbox images={galleryLb} index={lightIdx} onClose={() => setLightIdx(null)} onIndexChange={setLightIdx} />}
      {portfolioLightIdx !== null && <Lightbox images={portfolioLb} index={portfolioLightIdx} onClose={() => setPortfolioLightIdx(null)} onIndexChange={setPortfolioLightIdx} />}
    </>
  );
};

export default Index;
