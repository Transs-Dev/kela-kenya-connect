import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import FAQ from '@/components/FAQ';

const FAQPage = () => (
  <>
    <SEO title="FAQ | Kela Link Ltd" description="Answers to common questions about Kela Link Ltd services." />
    <PageHero
      eyebrow="FAQ"
      title="Frequently Asked Questions."
      subtitle="Everything you need to know before getting started."
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
    />
    <FAQ />
    <CTASection title="Still have questions?" subtitle="Reach out and we'll answer within the hour." />
  </>
);

export default FAQPage;
