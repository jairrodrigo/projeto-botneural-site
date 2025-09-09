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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-white relative z-10 flex-shrink-0 overflow-visible flex justify-center items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 inline-block">Botneural</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 relative z-10">
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
              onClick={() => scrollToSection('demo')}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Demonstração
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Sobre
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
            className="hidden lg:flex items-center space-x-2 bg-gradient-primary text-white px-4 py-2 lg:px-6 lg:py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5 relative z-10 text-sm lg:text-base flex-shrink-0"
          >
            <MessageCircle size={18} className="lg:w-5 lg:h-5" />
            <span className="whitespace-nowrap">Agendar Reunião</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white relative z-10 p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-blue-500/20 relative z-10">
            <div className="container mx-auto px-4 sm:px-6">
              <nav className="flex flex-col py-4 space-y-1">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10"
                >
                  Início
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10"
                >
                  Serviços
                </button>
                <button
                  onClick={() => scrollToSection('demo')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10"
                >
                  Demonstração
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10"
                >
                  Sobre
                </button>
                <button
                  onClick={() => scrollToSection('contact-section')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10"
                >
                  Contato
                </button>
                <div className="pt-4 mt-4 border-t border-blue-500/20">
                  <a
                    href="https://wa.me/5515988213309"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-jair-blue/25 w-full"
                  >
                    <MessageCircle size={20} />
                    <span>Agendar Reunião</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;