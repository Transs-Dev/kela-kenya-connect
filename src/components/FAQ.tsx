
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive assistance services including property management, travel coordination, document processing, family support, business assistance, and personal errands. Our goal is to help Kenyans living abroad manage their affairs back home seamlessly."
  },
  {
    question: "How do I get started with your services?",
    answer: "Simply contact us through our website, phone, or email. We'll schedule a consultation to understand your specific needs and create a customized service plan that works for you."
  },
  {
    question: "Are your services available throughout Kenya?",
    answer: "Yes, we provide services across Kenya. Our network of trusted partners and representatives allows us to serve clients nationwide, ensuring consistent quality service regardless of location."
  },
  {
    question: "How do you ensure the security of my property and documents?",
    answer: "We maintain strict security protocols including background checks on all staff, secure document storage, regular property inspections, and comprehensive insurance coverage. Your peace of mind is our priority."
  },
  {
    question: "What are your pricing structures?",
    answer: "Our pricing varies based on the specific services required and frequency of tasks. We offer flexible packages including one-time services, monthly retainers, and annual contracts. Contact us for a personalized quote."
  },
  {
    question: "How do you communicate updates and progress?",
    answer: "We provide regular updates through your preferred communication method - email, WhatsApp, or phone calls. For ongoing services, we send detailed monthly reports with photos and documentation."
  },
  {
    question: "Can you help with emergency situations?",
    answer: "Yes, we offer 24/7 emergency response services for urgent matters such as property issues, family emergencies, or time-sensitive document processing. Emergency services are available for all our registered clients."
  },
  {
    question: "Do you work with other professionals like lawyers or accountants?",
    answer: "Absolutely! We have established relationships with trusted lawyers, accountants, real estate agents, and other professionals across Kenya. We can coordinate with them on your behalf or refer you to reliable partners."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services and how we can help you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqData.map((item, index) => (
            <div key={index} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors"
              >
                <span className="font-semibold text-gray-900">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
