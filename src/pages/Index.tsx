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
  return (
    <>
      <SEO
        title="Kela — Simplifying Life Across Borders for Kenyans Abroad"
        description="Property management, construction, travel planning and daily assistance in Kenya — trusted by the diaspora worldwide."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 opacity-40 dark:opacity-20 [background-image:radial-gradient(circle_at_30%_20%,#C17A8E_0,transparent_45%),radial-gradient(circle_at_80%_80%,#800024_0,transparent_45%)]" />
        <div className="container mx-auto px-4 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#800024] bg-[#800024]/10 px-3 py-1 rounded-full mb-5">
                <Sparkles className="w-3 h-3" /> Kenyans Living Abroad
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                Simplifying Life
                <span className="block bg-gradient-to-r from-[#800024] to-[#C17A8E] bg-clip-text text-transparent">
                  Across Borders
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl">
                Kela empowers Kenyans abroad with trusted property, construction, travel and daily
                assistance services — back home, handled with care.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-[#800024] hover:bg-[#6a001d] text-white px-7 py-6 text-base font-semibold shadow-lg">
                  <Link to="/services">
                    Explore Services <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button onClick={() => openWhatsApp()} size="lg" variant="outline" className="border-2 border-[#800024] text-[#800024] hover:bg-[#800024] hover:text-white px-7 py-6 text-base font-semibold">
                  <MessageCircle className="mr-2 w-5 h-5" /> Chat on WhatsApp
                </Button>
                <Button onClick={callPhone} size="lg" variant="ghost" className="text-[#800024] hover:bg-[#800024]/5 px-5 py-6 text-base font-semibold">
                  <Phone className="mr-2 w-5 h-5" /> {PHONE_DISPLAY}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/portfolio2.jpeg" alt="Kela services in Kenya" className="w-full h-[420px] md:h-[520px] object-cover" />
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
          </div>
        </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
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

      <CTASection />
    </>
  );
};

export default Index;
