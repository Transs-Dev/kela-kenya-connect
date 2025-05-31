
import { Heart, Globe, Users, Award } from 'lucide-react';

const OurStory = () => {
  const keyPoints = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Born from Personal Experience",
      description: "Founded by Kenyans who understand the challenges of managing affairs from abroad"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "Global Reach, Local Expertise",
      description: "Serving Kenyan diaspora worldwide with deep local knowledge and connections"
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      title: "Trusted Network",
      description: "Built on relationships with reliable partners and verified professionals across Kenya"
    },
    {
      icon: <Award className="w-6 h-6 text-purple-500" />,
      title: "Proven Track Record",
      description: "Years of successful service delivery with countless satisfied clients"
    }
  ];

  return (
    <section id="story" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Kela Assistance Services was born from a simple yet profound understanding: Kenyans living abroad 
                shouldn't have to worry about managing their affairs back home. Our founders, themselves members of 
                the Kenyan diaspora, experienced firsthand the stress and anxiety that comes with being thousands 
                of miles away while needing to handle property management, family support, and business operations 
                in Kenya.
              </p>
              
              <p>
                What started as friends helping friends has evolved into a comprehensive assistance service that 
                bridges the gap between distance and care. We've built a network of trusted professionals, reliable 
                partners, and dedicated staff who share our commitment to excellence and integrity. Every service 
                we provide is delivered with the understanding that we're not just handling tasks – we're preserving 
                connections, maintaining legacies, and ensuring peace of mind for families separated by geography 
                but united by love.
              </p>
            </div>

            {/* Key Points */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{point.title}</h3>
                    <p className="text-gray-600 text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Story Image - Made fully visible */}
          <div className="relative">
            <img 
              src="/about.jpeg"
              alt="About Kela Assistance Services - Our team and story"
              className="rounded-2xl shadow-2xl w-full h-[600px] md:h-[550px] lg:h-[600px] object-cover object-top"
            />
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="col-span-2">
                  <div className="text-2xl font-bold text-emerald-600">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
