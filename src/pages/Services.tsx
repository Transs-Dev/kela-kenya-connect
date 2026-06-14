import { Link } from 'react-router-dom';
import { ArrowRight, Link2 } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import { SERVICES } from '@/data/services';
import { useServicesMgmt } from '@/hooks/useAdminData';

const Services = () => {
  const { data: cloudServices = [], isLoading } = useServicesMgmt();
  const published = cloudServices.filter((s: any) => s.is_published);

  return (
    <>
      <SEO title="Services | Kela Link Ltd" description="Property, construction, travel, daily tasks and tailored solutions for Kenyans abroad." />
      <PageHero
        eyebrow="Services"
        title="Everything You Need, Handled in Kenya."
        subtitle="From property to travel to daily errands, pick a service to see how we deliver it."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading services…</p>
          ) : published.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {published.map((s: any) => (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className="group p-7 rounded-2xl border border-pink-100 dark:border-gray-700 hover:border-[#C17A8E] hover:shadow-lg transition-all bg-white dark:bg-gray-800"
                >
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {SERVICES.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default Services;
