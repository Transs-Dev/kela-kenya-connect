import PageHero from '@/components/layout/PageHero';
import SEO from '@/components/SEO';
import Contact from '@/components/Contact';

const ContactPage = () => (
  <>
    <SEO title="Contact — Kela Assistance" description="Get in touch with Kela by WhatsApp, phone or email." />
    <PageHero
      eyebrow="Contact"
      title="Let's talk."
      subtitle="WhatsApp, call, email or send a message — we usually reply within the hour."
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
    />
    <Contact />
  </>
);

export default ContactPage;
