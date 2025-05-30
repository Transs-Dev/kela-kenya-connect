
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Grace M.",
      date: "04/15/2023",
      text: "Kela Assistance Services made managing my property overseas so much easier. Their attention to detail and prompt communication were truly impressive.",
      rating: 5
    },
    {
      name: "Daniel K.",
      date: "07/22/2023", 
      text: "I relied on Kela to arrange my vacation, and I couldn't have been happier with the seamless experience they provided. Highly recommended!",
      rating: 5
    },
    {
      name: "Sarah N.",
      date: "10/30/2023",
      text: "Kela's assistance with my daily errands was a game-changer. It allowed me to focus on my work without worrying about the small details. Thank you!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Client Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients who trust us with their important needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-4 right-4 text-6xl text-blue-200 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                "
              </div>
              
              {/* Rating stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Testimonial text */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 italic relative z-10">
                "{testimonial.text}"
              </blockquote>
              
              {/* Client info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.date}</div>
                </div>
                
                {/* Client avatar placeholder */}
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Additional trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Join hundreds of satisfied clients worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-sm font-semibold text-gray-500">TRUSTED BY KENYANS IN</div>
            <div className="text-sm font-semibold text-gray-500">USA • UK • CANADA • AUSTRALIA</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
