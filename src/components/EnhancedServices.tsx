
import { Home, Plane, ShoppingCart, Settings, MessageCircle, HardHat } from 'lucide-react';
import { useState } from 'react';

const EnhancedServices = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const whatsappNumber = '+254726285869';

  const services = [
    {
      icon: Home,
      title: "Property Management",
      description: "Rent collection, maintenance coordination, and tenant communication.",
      color: "bg-emerald-100 text-emerald-600",
      detailedDescription: "Complete property management solutions for Kenyans abroad",
      keyPoints: [
        "Monthly rent collection and remittance",
        "Property maintenance and repairs coordination", 
        "Tenant screening and management",
        "Property inspections and reports",
        "Legal compliance and documentation"
      ],
      whatsappMessage: "Hi! I'm interested in your property management services. Can you provide more details?"
    },
    {
      icon: HardHat,
      title: "Construction Management",
      description: "Comprehensive oversight of construction projects from planning to completion.",
      color: "bg-yellow-100 text-yellow-600",
      detailedDescription: "Professional construction management services for projects in Kenya",
      keyPoints: [
        "Project planning and timeline management",
        "Quality control and site inspections",
        "Contractor coordination and supervision",
        "Budget management and cost control",
        "Progress reporting with photos and updates"
      ],
      whatsappMessage: "Hi! I need help with construction management services. Can you assist me?"
    },
    {
      icon: Plane,
      title: "Travel Planning",
      description: "Full itinerary support: flights, accommodation, and custom travel packages.",
      color: "bg-blue-100 text-blue-600",
      detailedDescription: "Seamless travel planning from abroad to Kenya",
      keyPoints: [
        "Flight booking and seat selection",
        "Hotel and accommodation reservations",
        "Airport transfers and local transport",
        "Custom itinerary planning",
        "Travel insurance assistance"
      ],
      whatsappMessage: "Hi! I need help planning my travel to Kenya. Can you assist me?"
    },
    {
      icon: ShoppingCart,
      title: "Daily Task Assistance",
      description: "Errands like groceries, appointment scheduling, and document handling.",
      color: "bg-purple-100 text-purple-600",
      detailedDescription: "Personal assistance for daily tasks and errands",
      keyPoints: [
        "Grocery shopping and delivery",
        "Medical appointment scheduling",
        "Document collection and delivery",
        "Bill payments and banking",
        "Emergency assistance services"
      ],
      whatsappMessage: "Hi! I need help with daily tasks and errands. What services do you offer?"
    },
    {
      icon: Settings,
      title: "Tailored Solutions",
      description: "Personalized to meet the needs of each individual client.",
      color: "bg-orange-100 text-orange-600",
      detailedDescription: "Custom solutions designed specifically for your needs",
      keyPoints: [
        "Personalized service packages",
        "Flexible scheduling options",
        "Custom pricing plans",
        "Dedicated account manager",
        "24/7 support availability"
      ],
      whatsappMessage: "Hi! I need a custom solution tailored to my specific needs. Can we discuss?"
    }
  ];

  const sendToWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive solutions designed to make your life easier while you're away from home
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isExpanded = expandedService === index;
            
            return (
              <div 
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group ${
                  isExpanded ? 'md:col-span-2 lg:col-span-3 xl:col-span-5' : ''
                }`}
              >
                <div className="p-8">
                  <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {isExpanded && (
                    <div className="mt-6 animate-fade-in">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {service.detailedDescription}
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-3">Key Features:</h5>
                          <ul className="space-y-2">
                            {service.keyPoints.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 dark:text-gray-300 text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-col justify-center">
                          <button
                            onClick={() => sendToWhatsApp(service.whatsappMessage)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span>Chat on WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setExpandedService(isExpanded ? null : index)}
                    className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    {isExpanded ? 'Show Less' : 'Learn More'}
                  </button>
                  
                  <div className="mt-6 w-12 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Need a custom solution? We're here to help.
          </p>
          <button 
            onClick={() => sendToWhatsApp("Hi! I need a custom solution. Can we discuss my requirements?")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Discuss Your Needs</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;
