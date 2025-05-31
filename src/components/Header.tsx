
import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigateToAdmin = () => {
    window.location.href = '/admin';
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Expanded Logo without KELA text */}
          <div className="flex items-center">
            <img 
              src="/logo.jpeg" 
              alt="Company Logo" 
              className="w-24 h-16 rounded-lg object-cover object-center"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('story')}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
            >
              Our Story
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
            >
              Our Process
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
            >
              Client Stories
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
            >
              Contact
            </button>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-pink-800" />
              <button 
                onClick={navigateToAdmin}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
              >
                Admin
              </button>
            </div>
          </nav>

          {/* Theme Toggle and Social Media Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <a 
              href="https://www.instagram.com/kenyanslivingabroad/profilecard/?igsh=cWQxazhlMDIwMmpm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/kenyanslivingabroad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/kela-assistance/people/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 dark:border-gray-800 pt-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('story')}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors text-left"
              >
                Our Story
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('process')}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors text-left"
              >
                Our Process
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors text-left"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors text-left"
              >
                Client Stories
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors text-left"
              >
                Contact
              </button>
              <div className="flex items-center space-x-2 pt-2">
                <Shield className="w-4 h-4 text-pink-800" />
                <button 
                  onClick={navigateToAdmin}
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
                >
                  Admin
                </button>
              </div>
              
              {/* Mobile Social Links */}
              <div className="flex items-center space-x-4 pt-4">
                <a 
                  href="https://www.instagram.com/kenyanslivingabroad/profilecard/?igsh=cWQxazhlMDIwMmpm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/kenyanslivingabroad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/kela-assistance/people/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
