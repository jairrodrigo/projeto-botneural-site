import React, { useState } from 'react';
import { MessageCircle, Calendar, X } from 'lucide-react';

const Hero: React.FC = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    segment: ''
  });

  const handleContactFormChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = () => {
    // Reset form and close popup
    setContactForm({ name: '', email: '', whatsapp: '', segment: '' });
    setShowContactPopup(false);
    
    // Show success message or handle form submission as needed
    alert('Obrigado! Entraremos em contato em breve.');
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 bg-gradient-hero pt-20">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto relative z-0">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Sites
            </span>{' '}
            e{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Automações
            </span>{' '}
            que Vendem 24h
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          <span className="text-blue-400">Botneural - Especialista em Desenvolvimento Web e Automação com IA.</span> Crio sites profissionais e automações inteligentes para WhatsApp que <span className="text-blue-400">trabalham 24h por você</span>.
        </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowContactPopup(true)}
              className="inline-flex items-center space-x-3 bg-gradient-primary text-white px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5 text-xl font-semibold"
            >
              <MessageCircle className="w-7 h-7" />
              <span>Chame no Whatsapp</span>
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mb-12">
            <p className="text-sm text-gray-400 mb-2">✅ Consultoria inicial gratuita</p>
            <p className="text-sm text-gray-400">🤖 Agente de IA disponível 24h no WhatsApp para tirar dúvidas</p>
          </div>
        </div>
      </div>

      {/* Contact Popup Modal */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto backdrop-blur-md">
            <div className="p-8">
              {/* Header */}
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-2xl font-bold">
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Seu melhor email"
                    value={contactForm.email}
                    onChange={(e) => handleContactFormChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  />
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
                   disabled={!contactForm.name || !contactForm.email || !contactForm.whatsapp || !contactForm.segment}
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
    </section>
  );
};

export default Hero;