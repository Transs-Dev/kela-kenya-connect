import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ServiceDef } from '@/data/services';

const ServiceCard = ({ service }: { service: ServiceDef }) => {
  const Icon = service.icon;
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#800024] to-[#C17A8E] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-1">{service.short}</p>
      <span className="inline-flex items-center text-[#800024] dark:text-[#C17A8E] font-semibold">
        Learn more
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
};

export default ServiceCard;
