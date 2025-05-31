import { MessageCircle, X, Phone, Calendar, Home, Settings } from 'lucide-react';
import { useState } from 'react';

const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '+254726285869';

  const quickLinks = [
    {
      icon: Home,
      title: 'Property Management',
      message: 'Hi! I need help with property management services.',
    },
    {
      icon: Calendar,
      title: 'Travel Planning',
      message: 'Hi! I would like to plan my travel to Kenya.',
    },
    {
      icon: Settings,
      title: 'Daily Assistance',
      message: 'Hi! I need help with daily tasks and errands.',
    },
    {
      icon: Phone,
      title: 'General Inquiry',
      message: 'Hi! I have a general inquiry about your services.',
    },
  ];

  const sendToWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Links Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-4 w-80 animate-fade-in border border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Quick Links</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <button
                  key={index}
                  onClick={() => sendToWhatsApp(link.message)}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-emerald-50 transition-all duration-200 text-left group"
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <IconComponent className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{link.title}</span>
                </button>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Click any option to start a WhatsApp conversation
            </p>
          </div>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'rotate-180' : 'animate-bounce'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppChatbot;
