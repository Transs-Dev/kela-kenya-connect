import { useParams, Navigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MessageCircle, Phone } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { SERVICES, getService } from '@/data/services';
import ServiceBookingForm from '@/components/ServiceBookingForm';
import { openWhatsApp, callPhone, PHONE_DISPLAY } from '@/lib/contact';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getService(slug || '');
  if (!service) return <Navigate to="/services" replace />;
  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <SEO title={`${service.title} — Kela Assistance`} description={service.short} />
      <PageHero
        eyebrow="Service"
        title={service.title}
        subtitle={service.short}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      />

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#800024] to-[#C17A8E] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What it is</h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">{service.intro}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Benefits</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 p-4 rounded-xl bg-pink-50/60 dark:bg-gray-800">
                      <CheckCircle2 className="w-5 h-5 text-[#800024] mt-0.5 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">How it works</h2>
                <div className="space-y-4">
                  {service.steps.map((s, i) => (
                    <div key={s.title} className="flex gap-4 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                      <div className="w-10 h-10 rounded-full bg-[#800024] text-white font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="p-7 rounded-2xl bg-gradient-to-br from-[#800024] to-[#C17A8E] text-white shadow-xl">
                <h3 className="text-xl font-bold mb-3">Get started</h3>
                <p className="text-white/90 text-sm mb-6">Talk to a specialist about your {service.title.toLowerCase()} needs.</p>
                <div className="space-y-3">
                  <Button onClick={() => openWhatsApp(service.whatsappMessage)} className="w-full bg-white text-[#800024] hover:bg-white/90 font-semibold">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp us
                  </Button>
                  <Button onClick={callPhone} variant="outline" className="w-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#800024] font-semibold">
                    <Phone className="w-4 h-4 mr-2" /> {PHONE_DISPLAY}
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Other services</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {others.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#C17A8E] transition-colors flex items-center justify-between group">
                  <span className="font-semibold text-gray-900 dark:text-white">{s.title}</span>
                  <ArrowRight className="w-4 h-4 text-[#800024] group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection message={service.whatsappMessage} />
    </>
  );
};

export default ServiceDetail;
