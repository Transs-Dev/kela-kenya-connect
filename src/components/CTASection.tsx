import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp, callPhone, PHONE_DISPLAY } from '@/lib/contact';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  message?: string;
}

const CTASection = ({
  title = 'Ready to make life easier?',
  subtitle = 'Talk to a Kela specialist today — we usually reply within an hour.',
  message,
}: CTASectionProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#800024] to-[#C17A8E] text-white p-10 md:p-16 text-center shadow-xl">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => openWhatsApp(message)}
                className="bg-white text-[#800024] hover:bg-white/90 font-semibold px-8"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={callPhone}
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#800024] font-semibold px-8"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {PHONE_DISPLAY}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
