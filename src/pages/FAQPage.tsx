import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import FAQ from '@/components/FAQ';

const FAQPage = () => (
  <>
    <SEO title="FAQ — Kela Assistance" description="Answers to common questions about Kela's services." />
    <PageHero
      eyebrow="FAQ"
      title="Frequently asked questions."
      subtitle="Everything you need to know before getting started."
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
    />
    <FAQ />
    <CTASection title="Still have questions?" subtitle="Reach out and we'll answer within the hour." />
  </>
);

export default FAQPage;
