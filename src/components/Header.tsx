import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Calendar, User, Phone, Building } from 'lucide-react';
import { saveContactForm } from '../lib/supabase';
import { SuccessPopup } from './SuccessPopup';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    whatsapp: '',
    segment: ''
  });

  const handleContactFormChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = async () => {
    try {
      // Salvar no Supabase
      await saveContactForm({
        name: contactForm.name,
        whatsapp: contactForm.whatsapp,
        segment: contactForm.segment
      });
      
      // Enviar para WhatsApp
      const message = `Olá! Meu nome é ${contactForm.name}. WhatsApp: ${contactForm.whatsapp}. Segmento: ${contactForm.segment}. Gostaria de agendar uma conversa gratuita!`;
      const whatsappUrl = `https://wa.me/5515988213309?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      // Limpar formulário e fechar popup
      setShowContactPopup(false);
      setContactForm({ name: '', whatsapp: '', segment: '' });
      
      // Mostrar popup de sucesso
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados. Tente novamente.');
    }
  };

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
          <div className="text-xl sm:text-2xl font-bold text-white relative z-10 flex-shrink-0 overflow-visible flex justify-center items-center space-x-1">
            <img 
              src="/botneural_logo.png" 
              alt="Botneural Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
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
                  <button
                    onClick={() => setShowContactPopup(true)}
                    className="flex items-center justify-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-jair-blue/25 w-full"
                  >
                    <MessageCircle size={20} />
                    <span>Agende uma conversa gratuita</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Contact Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 border border-blue-500/30 rounded-2xl max-w-md w-full shadow-2xl backdrop-blur-lg">
            <div className="p-8">
              {/* Header */}
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-2xl font-bold flex items-center space-x-1">
                    <img 
                      src="/botneural_logo.png" 
                      alt="Botneural Logo" 
                      className="w-8 h-8"
                    />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 inline-block">Botneural</span>
                  </h3>
                 <button
                    onClick={() => setShowContactPopup(false)}
                    className="text-gray-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  >
                    <X size={24} />
                  </button>
               </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={contactForm.name}
                    onChange={(e) => handleContactFormChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  />
                  <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
                    <User size={14} className="text-blue-400" />
                    Como você gostaria de ser chamado?
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="(11) 91231-2312"
                    value={contactForm.whatsapp}
                    onChange={(e) => handleContactFormChange('whatsapp', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  />
                  <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
                    <Phone size={14} className="text-blue-400" />
                    Número com DDD para contato direto
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Segmento</label>
                  <input
                    type="text"
                    placeholder="Segmento do seu negócio"
                    value={contactForm.segment}
                    onChange={(e) => handleContactFormChange('segment', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  />
                  <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
                    <Building size={14} className="text-blue-400" />
                    Ex: E-commerce, Consultoria, Clínica, etc.
                  </div>
                </div>
              </div>

              {/* Buttons */}
               <div className="flex flex-col sm:flex-row gap-3 mt-6">
                 <button
                   onClick={() => setShowContactPopup(false)}
                   className="flex-1 px-6 py-3 border-2 border-blue-400/50 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all font-medium backdrop-blur-sm"
                 >
                   Cancelar
                 </button>
                 <button
                   onClick={handleContactSubmit}
                   disabled={!contactForm.name || !contactForm.whatsapp || !contactForm.segment}
                   className="flex-1 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-jair-blue/25"
                 >
                   Enviar
                 </button>
               </div>

               {/* Footer Message */}
               <p className="text-gray-300 text-sm text-center mt-4">Preencha os dados abaixo e entraremos em contato</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Popup de sucesso */}
      <SuccessPopup 
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        message="Sua mensagem foi enviada com sucesso! Em breve entraremos em contato."
      />
    </header>
  );
};

export default Header;