
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import EnhancedServices from '@/components/EnhancedServices';
import OurProcess from '@/components/OurProcess';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppChatbot from '@/components/WhatsAppChatbot';
import WelcomePopup from '@/components/WelcomePopup';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <OurStory />
      <EnhancedServices />
      <OurProcess />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppChatbot />
      <WelcomePopup />
    </div>
  );
};

export default Index;
