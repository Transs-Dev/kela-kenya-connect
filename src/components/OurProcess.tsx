
import { CheckCircle, MessageSquare, Users, RefreshCw, Star, FileText } from 'lucide-react';

const OurProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Client Inquiry",
      description: "You reach out to Kela with your needs—whether it's property management, travel planning, or personal errands. This is where your journey with Kela begins.",
      icon: <MessageSquare className="w-6 h-6 text-emerald-600" />
    },
    {
      number: "02",
      title: "Initial Consultation & Service Agreement",
      description: "Kela schedules a consultation to understand your specific requirements. We then outline expectations, scope, timelines, and fees in a service agreement—ensuring clarity and trust from the start.",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      number: "03",
      title: "Task Assignment & Execution",
      description: "Once agreed, our trained Virtual Assistants begin working on your tasks efficiently. We assign responsibilities to the right team members and ensure everything is handled professionally.",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />
    },
    {
      number: "04",
      title: "Regular Updates & Communication",
      description: "Throughout the process, we keep you informed. You'll receive timely updates via email, WhatsApp, or your preferred channel—so you're never left wondering.",
      icon: <RefreshCw className="w-6 h-6 text-purple-600" />
    },
    {
      number: "05",
      title: "Client Feedback & Adjustments",
      description: "Your feedback matters. We check in to hear your thoughts and make necessary adjustments to ensure the results align with your expectations.",
      icon: <Star className="w-6 h-6 text-orange-600" />
    },
    {
      number: "06",
      title: "Task Completion & Reporting",
      description: "Once tasks are successfully completed, we provide a detailed report. This may include receipts, photos, summaries, or any documentation needed for your records.",
      icon: <FileText className="w-6 h-6 text-red-600" />
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Process Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Process
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-emerald-600 mb-8">
              How Kela Virtual Assistants Simplify Your Needs in Kenya
            </h3>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-bold text-gray-400">Step {step.number}:</span>
                      <h4 className="text-lg font-bold text-gray-900">{step.title}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Image - Resized for better visibility */}
          <div className="relative lg:sticky lg:top-8">
            <img 
              src="/process.jpeg"
              alt="Kela Link Ltd streamlined service process"
              className="rounded-2xl shadow-2xl w-full h-[500px] md:h-[450px] lg:h-[500px] object-cover object-center"
            />
            
            {/* Floating process indicator */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Process Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
