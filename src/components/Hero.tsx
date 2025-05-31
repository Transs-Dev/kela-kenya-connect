
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/254729218569?text=${encodeURIComponent('Hi! I would like to learn more about your services.')}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="mb-4">
              <span className="text-lg md:text-xl text-emerald-600 dark:text-emerald-400 font-semibold">
              
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Simplifying Life 
              <span className="text-emerald-600 dark:text-emerald-400"> Across Borders</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Kela empowers Kenyans abroad by simplifying property, travel, and digital needs. 
              We ensure convenience, trust, and connection.
            </p>
            
            {/* Animated CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToServices}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 group"
              >
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={openWhatsApp}
                variant="outline"
                size="lg"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group"
              >
                <MessageCircle className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                Chat Now
              </Button>
              
              <Button 
                onClick={scrollToContact}
                variant="ghost"
                size="lg"
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <Phone className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                Call Us
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              <img 
                src="/portfolio2.jpeg"
                alt="Kela Assistance Services - Professional support across borders"
                className="rounded-2xl shadow-2xl w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
            {/* Decorative background elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-200 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
