import PageHero from '@/components/layout/PageHero';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import { SERVICES } from '@/data/services';

const Services = () => {
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
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default Services;
