import { X, Phone, Calendar, Home, Settings } from 'lucide-react';
import { useState } from 'react';
import { openWhatsApp } from '@/lib/contact';

// Official WhatsApp logo (simplified SVG)
const WhatsAppIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.003 3C9.376 3 4 8.376 4 15.003c0 2.116.553 4.184 1.604 6.005L4 29l8.16-1.575a11.96 11.96 0 0 0 3.842.629h.001C22.628 28.054 28 22.679 28 16.052 28 12.84 26.752 9.82 24.485 7.553A11.93 11.93 0 0 0 16.003 3zm6.999 17.144c-.297.836-1.726 1.6-2.408 1.69-.615.082-1.394.116-2.247-.142-.518-.165-1.182-.385-2.032-.752-3.575-1.544-5.91-5.144-6.088-5.381-.178-.237-1.456-1.935-1.456-3.692 0-1.757.923-2.62 1.25-2.978.327-.357.713-.446.95-.446.238 0 .476.002.683.013.218.011.51-.083.799.61.297.713 1.011 2.47 1.1 2.65.089.178.149.386.03.624-.119.238-.179.387-.357.595-.179.207-.376.464-.537.624-.179.178-.365.371-.157.728.208.357.926 1.528 1.99 2.476 1.366 1.218 2.518 1.595 2.875 1.773.357.179.566.149.774-.09.208-.237.892-1.041 1.131-1.398.238-.357.476-.297.804-.178.327.119 2.075.98 2.432 1.159.357.178.595.267.683.416.089.149.089.866-.208 1.702z"/>
  </svg>
);

const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickLinks = [
    { icon: Home, title: 'Property Management', message: 'Hi! I need help with property management.' },
    { icon: Calendar, title: 'Travel Planning', message: 'Hi! I would like to plan my travel to Kenya.' },
    { icon: Settings, title: 'Daily Assistance', message: 'Hi! I need help with daily tasks and errands.' },
    { icon: Phone, title: 'General Inquiry', message: 'Hi! I have a general inquiry about your services.' },
  ];

  const send = (m: string) => {
    openWhatsApp(m);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 w-80 animate-fade-in border border-[#25D366]/30 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-100">Chat on WhatsApp</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {quickLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <button
                  key={i}
                  onClick={() => send(link.message)}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-[#25D366]/10 dark:hover:bg-gray-800 transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-[#25D366]/15 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#128C7E]" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{link.title}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 text-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            We typically reply within an hour.
          </p>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5b] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 ring-4 ring-white dark:ring-gray-900 ${
          isOpen ? 'rotate-180' : ''
        }`}
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <WhatsAppIcon className="w-7 h-7 text-white" />}
      </button>
    </div>
  );
};

export default WhatsAppChatbot;
