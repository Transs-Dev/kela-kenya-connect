import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; to?: string }[];
}

const PageHero = ({ eyebrow, title, subtitle, breadcrumb }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#800024] via-[#9a2b48] to-[#C17A8E] text-white">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="container mx-auto px-4 py-20 md:py-28 relative">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center text-sm text-white/80 mb-6">
            {breadcrumb.map((c, i) => (
              <span key={i} className="flex items-center">
                {c.to ? (
                  <Link to={c.to} className="hover:text-white transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
                {i < breadcrumb.length - 1 && <ChevronRight className="w-4 h-4 mx-1" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold bg-white/15 backdrop-blur px-3 py-1 rounded-full mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 mt-5 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
