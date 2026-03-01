import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ContactModal } from './ContactModal';

const Header: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm border-b border-blue-500/20' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold text-white relative z-10 flex-shrink-0 overflow-visible flex justify-center items-center space-x-1">
            <img
              src="/botneural_logo.png"
              alt="BotNeural - Automação de WhatsApp"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 inline-block">Botneural</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 relative z-10">
            {isLandingPage ? (
              <>
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
                  onClick={() => scrollToSection('cases')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Cases
                </button>
                <button
                  onClick={() => scrollToSection('methodology')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Processo
                </button>
                <button
                  onClick={() => scrollToSection('investment')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Investimento
                </button>
                <button
                  onClick={() => scrollToSection('contact-section')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Diagnóstico
                </button>
              </>
            ) : null}
            <Link
              to="/blog"
              className="text-gray-300 hover:text-blue-400 transition-colors font-semibold"
            >
              Blog
            </Link>
            <button
              onClick={() => setShowContactPopup(true)}
              className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 text-sm font-bold"
            >
              <span>Diagnóstico gratuito</span>
            </button>
          </nav>



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
                {isLandingPage && (
                  <>
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
                      onClick={() => scrollToSection('cases')}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10"
                    >
                      Cases
                    </button>
                    <button
                      onClick={() => scrollToSection('methodology')}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10"
                    >
                      Processo
                    </button>
                    <button
                      onClick={() => scrollToSection('investment')}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10"
                    >
                      Investimento
                    </button>
                    <button
                      onClick={() => scrollToSection('contact-section')}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10"
                    >
                      Contato
                    </button>
                  </>
                )}
                <Link
                  to="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left py-3 px-2 rounded-lg hover:bg-blue-500/10 font-semibold"
                >
                  Blog
                </Link>
                <div className="pt-4 mt-4 border-t border-blue-500/20">
                  <button
                    onClick={() => setShowContactPopup(true)}
                    className="flex items-center justify-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-jair-blue/25 w-full font-bold"
                  >
                    <span>Agende uma conversa gratuita</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      <ContactModal
        isOpen={showContactPopup}
        onClose={() => setShowContactPopup(false)}
        source="header"
      />
    </header>
  );
};

export default Header;