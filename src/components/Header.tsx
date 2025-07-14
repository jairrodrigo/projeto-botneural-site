import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm border-b border-blue-500/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">Jair</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500">.cloud</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8 relative z-10">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* CTA Button */}
          <a
            href="https://wa.me/5515988213309"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5 relative z-10"
          >
            <MessageCircle size={20} />
            <span>Agendar Reunião</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white relative z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-500/20 relative z-10 bg-black/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4 mt-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Contato
              </button>
              <a
                href="https://wa.me/5515988213309"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 w-fit shadow-lg shadow-jair-blue/25"
              >
                <MessageCircle size={20} />
                <span>Agendar Reunião</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;