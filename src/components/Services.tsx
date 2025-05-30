
import { Home, Plane, ShoppingCart, Settings } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Property Management",
      description: "Rent collection, maintenance coordination, and tenant communication.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Plane,
      title: "Travel Planning",
      description: "Full itinerary support: flights, accommodation, and custom travel packages.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: ShoppingCart,
      title: "Daily Task Assistance",
      description: "Errands like groceries, appointment scheduling, and document handling.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Settings,
      title: "Tailored Solutions",
      description: "Personalized to meet the needs of each individual client.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions designed to make your life easier while you're away from home
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Decorative element */}
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Need a custom solution? We're here to help.
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Discuss Your Needs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
