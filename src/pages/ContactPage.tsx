import PageHero from '@/components/layout/PageHero';
import SEO from '@/components/SEO';
import Contact from '@/components/Contact';

const ContactPage = () => (
  <>
    <SEO title="Contact | Kela Link Ltd" description="Get in touch with Kela Link Ltd by WhatsApp, phone or email." />
    <PageHero
      eyebrow="Contact"
      title="Let's Talk."
      subtitle="WhatsApp, call, email or send a message. We usually reply within the hour."
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
    />
    <Contact />
  </>
);

export default ContactPage;
