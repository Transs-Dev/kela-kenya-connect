import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import { SERVICES } from '@/data/services';
import { useServicesMgmt } from '@/hooks/useAdminData';

const Services = () => {
  const { data: cloudServices = [] } = useServicesMgmt();
  const published = cloudServices.filter((s: any) => s.is_published);

  return (
    <>
      <SEO title="Services — Kela Assistance" description="Property, construction, travel, daily tasks and tailored solutions for Kenyans abroad." />
      <PageHero
        eyebrow="Services"
        title="Everything you need, handled in Kenya."
        subtitle="From property to travel to daily errands — pick a service to see how we deliver it."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {SERVICES.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>

          {published.length > 0 && (
            <div className="mt-16 max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">More from our team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {published.map((s: any) => (
                  <Link key={s.id} to={`/services/${s.slug}`} className="p-6 rounded-2xl border border-pink-100 dark:border-gray-700 hover:border-[#C17A8E] transition-colors group bg-white dark:bg-gray-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{s.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default Services;
