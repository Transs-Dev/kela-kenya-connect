
const OurStory = () => {
  return (
    <section id="story" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Our Story
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="relative bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                "At Kela Assistance Services, we understand the challenges that Kenyans living abroad 
                face when it comes to managing property, organizing travel, and handling everyday tasks 
                back home. We provide reliable, tailored solutions so you can focus on your career or 
                studies while we take care of the rest."
              </p>
              
              <div className="mt-8 flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">K</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Kela Assistance Services</h3>
                  <p className="text-gray-600">Your trusted partner</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional visual elements */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-600">Reliable Service</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
