import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { PHONE_NUMBER } from '@/lib/contact';
import { useSiteSettings } from '@/hooks/useAdminData';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'Our Story' },
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Stories' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: settings = {} } = useSiteSettings();
  const branding = (settings as any).branding || {};
  const logoUrl = branding.logoUrl || '/logo.jpeg';
  const brandName = branding.brandName || 'Kela Link Ltd';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-1 text-sm font-medium transition-colors ${
      isActive
        ? 'text-[#800024] dark:text-[#C17A8E]'
        : 'text-gray-700 dark:text-gray-300 hover:text-[#800024] dark:hover:text-[#C17A8E]'
    }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm'
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm'
      } border-b border-gray-100 dark:border-gray-800`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${brandName} home`}>
            <img
              src={logoUrl}
              alt={`${brandName} logo`}
              className="h-16 md:h-20 w-auto object-contain"
            />
            <span className="hidden md:block leading-tight">
              <span className="block font-extrabold text-lg text-[#800024] dark:text-[#C17A8E] tracking-tight">Kela Link Ltd</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Kenyans Living Abroad</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {navItems.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
                {({ isActive }) => (
                  <span className="relative">
                    {n.label}
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#800024] dark:bg-[#C17A8E] transition-transform ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      } origin-left`}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 bg-[#800024] hover:bg-[#6a001d] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" /> Call us
            </a>
          </div>


          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-3" aria-label="Mobile">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `py-1 font-medium ${
                    isActive
                      ? 'text-[#800024] dark:text-[#C17A8E]'
                      : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-2 bg-[#800024] text-white px-4 py-2 rounded-lg font-semibold mt-2"
            >
              <Phone className="w-4 h-4" /> Call us
            </a>

          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
