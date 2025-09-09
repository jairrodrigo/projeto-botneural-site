import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, Calendar } from 'lucide-react';

const Problems: React.FC = () => {
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
  const problems = [
    "Perder clientes por demora de atendimento e fora de horário de expediente", 
    "Gastar horas respondendo as mesmas perguntas no WhatsApp",
    "Concorrência com sites mais modernos e automações eficientes",
    "Processos manuais que consomem tempo e geram erros",
    "Dificuldade para analisar documentos e dados importantes"
  ];

  const solutions = [
    "Atendimento inteligente 24/7 no WhatsApp sem contratar ninguém",
    "IA que responde clientes e agenda reuniões automaticamente",
    "Tecnologia de ponta que coloca você à frente da concorrência",
    "Automações que eliminam trabalho repetitivo e aumentam eficiência",
    "Sistemas de IA que analisam imagens, áudio e documentos instantaneamente"
  ];

  return (
    <section id="problems" className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-2xl p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Seu Negócio Está{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                Perdendo Dinheiro
              </span>{' '}
              Todos os Dias?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Empresários inteligentes já descobriram como automatizar vendas e atendimento. E você?
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-6 md:mb-8 text-center">❌ Sua Realidade Atual</h3>
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-red-900/20 rounded-lg border border-red-500/20">
                  <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">{problem}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 md:space-y-6 mt-8 lg:mt-0">
              <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-6 md:mb-8 text-center">✅ Com Nossas Soluções</h3>
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">{solution}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 md:mt-16 px-4">
            <button
              onClick={() => setShowContactPopup(true)}
              className="inline-flex items-center justify-center space-x-2 bg-gradient-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5 w-full max-w-sm md:max-w-none md:w-auto"
            >
              <MessageCircle size={20} className="md:w-6 md:h-6" />
              <span className="text-base md:text-lg font-semibold text-center">Agende uma conversa gratuita</span>
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Contact Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 border border-blue-500/30 rounded-2xl max-w-md w-full shadow-2xl backdrop-blur-lg">
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

export default Problems;
