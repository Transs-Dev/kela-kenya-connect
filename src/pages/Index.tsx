import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone, ShieldCheck, Globe2, HeartHandshake, Sparkles, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import { SERVICES } from '@/data/services';
import TestimonialForm from '@/components/TestimonialForm';
import Testimonials from '@/components/Testimonials';
import { openWhatsApp, callPhone, PHONE_DISPLAY } from '@/lib/contact';
import { useSlides, useSiteSettings, useServicesMgmt } from '@/hooks/useAdminData';

const stats = [
  { value: '500+', label: 'Clients served' },
  { value: '5+', label: 'Years experience' },
  { value: '15+', label: 'Countries reached' },
  { value: '24/7', label: 'Support availability' },
];

const whyUs = [
  { icon: ShieldCheck, title: 'Trust & Transparency', text: 'Vetted team, clear pricing and reports you can rely on.' },
  { icon: Globe2, title: 'Diaspora-First', text: 'Built by Kenyans abroad, for Kenyans abroad.' },
  { icon: HeartHandshake, title: 'Personal Care', text: 'A dedicated point of contact who knows your story.' },
  { icon: Sparkles, title: 'Local Expertise', text: 'Deep on-the-ground knowledge across Kenya.' },
];

const processPreview = [
  { n: '01', title: 'Reach out', desc: 'Tell us what you need via WhatsApp or call.' },
  { n: '02', title: 'We plan', desc: 'A clear proposal with scope, timeline and price.' },
  { n: '03', title: 'We deliver', desc: 'Execution with regular updates and proof.' },
];

const testimonials = [
  { name: 'Grace M.', location: 'London, UK', text: 'Managing my Nairobi property from abroad finally feels effortless.' },
  { name: 'Daniel K.', location: 'Toronto, Canada', text: 'They planned my entire Kenya trip — every detail was perfect.' },
  { name: 'Sarah N.', location: 'Dallas, USA', text: 'Their daily errands support helps me care for my mom from far.' },
];

const Index = () => {
  const { data: slides = [] } = useSlides();
  const { data: settings = {} } = useSiteSettings();
  const { data: cloudServices = [] } = useServicesMgmt();
  const activeSlides = slides.filter((s: any) => s.is_active);
  const publishedServices = cloudServices.filter((s: any) => s.is_published);
  const homepage = (settings as any).homepage || {};
  const branding = (settings as any).branding || {};
  const heroTitle = homepage.heroTitle || 'Simplifying Life Across Borders';
  const heroSubtitle = homepage.heroSubtitle || 'Kela empowers Kenyans abroad with trusted property, construction, travel and daily assistance services — back home, handled with care.';

  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    if (activeSlides.length < 2) return;
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % activeSlides.length), 5000);
    return () => clearInterval(t);
  }, [activeSlides.length]);

  const heroImage = activeSlides.length === 0 ? (branding.logoUrl || '/portfolio2.jpeg') : null;

  return (
    <>
      <SEO
        title="Kela — Simplifying Life Across Borders for Kenyans Abroad"
        description="Property management, construction, travel planning and daily assistance in Kenya — trusted by the diaspora worldwide."
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
                <Sparkles className="w-3 h-3" /> Kenyans Living Abroad
              </span>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight ${activeSlides.length > 0 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {heroTitle}
              </h1>
              <p className={`text-lg md:text-xl mb-8 leading-relaxed max-w-xl ${activeSlides.length > 0 ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}`}>
                {heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-[#800024] hover:bg-[#6a001d] text-white px-7 py-6 text-base font-semibold shadow-lg">
                  <Link to="/services">
                    Explore Services <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button onClick={() => openWhatsApp()} size="lg" variant="outline" className={`border-2 px-7 py-6 text-base font-semibold ${activeSlides.length > 0 ? 'border-white text-white bg-white/10 hover:bg-white hover:text-[#800024] backdrop-blur' : 'border-[#800024] text-[#800024] hover:bg-[#800024] hover:text-white'}`}>
                  <MessageCircle className="mr-2 w-5 h-5" /> Chat on WhatsApp
                </Button>
                <Button onClick={callPhone} size="lg" variant="ghost" className={`px-5 py-6 text-base font-semibold ${activeSlides.length > 0 ? 'text-white hover:bg-white/10' : 'text-[#800024] hover:bg-[#800024]/5'}`}>
                  <Phone className="mr-2 w-5 h-5" /> {PHONE_DISPLAY}
                </Button>
              </div>
            </div>

            {activeSlides.length === 0 && heroImage && (
              <div className="relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img src={heroImage} alt="Kela services in Kenya" className="w-full h-[420px] md:h-[520px] object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 flex items-center gap-3 z-20">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#800024] to-[#C17A8E] border-2 border-white" />
                    ))}
                  </div>
                  <div>
                    <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Trusted by 500+ clients</p>
                  </div>
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
              Services built for the diaspora
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Tap any service to see how we deliver it, end-to-end.</p>
          </div>
          {publishedServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedServices.map((s: any) => (
                <Link key={s.id} to={`/services/${s.slug}`} className="group p-7 rounded-2xl border border-pink-100 dark:border-gray-700 hover:border-[#C17A8E] hover:shadow-lg transition-all bg-white dark:bg-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#800024] to-[#C17A8E] flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{s.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Book / Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">Why Kela</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">Built on trust, run with care</h2>
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

      {/* Process preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">A simple, transparent process</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {processPreview.map((p) => (
              <div key={p.n} className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
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

      {/* Testimonials preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#800024]">Client stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">Loved by clients worldwide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="p-7 rounded-2xl bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-800 border border-pink-100 dark:border-gray-700">
                <div className="flex text-yellow-400 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-gray-700 dark:text-gray-200 italic mb-5 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#800024] text-white flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-2 border-[#800024] text-[#800024] hover:bg-[#800024] hover:text-white">
              <Link to="/testimonials">Read more stories <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <Testimonials />
      <TestimonialForm />
      <CTASection />
    </>
  );
};

export default Index;
