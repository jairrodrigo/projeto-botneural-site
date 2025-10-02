import React, { useState } from 'react';
import { MessageCircle, Zap, Bot, ChevronLeft, ChevronRight, ExternalLink, Calendar, X, User, Phone, Building } from 'lucide-react';
import { saveContactForm } from '../lib/supabase';
import { SuccessPopup } from './SuccessPopup';

const AIDemo: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
      
      // Reset form and close popup
      setContactForm({ name: '', whatsapp: '', segment: '' });
      setShowContactPopup(false);
      
      // Mostrar popup de sucesso
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados. Tente novamente.');
    }
  };

  const projects = [
    {
      id: 1,
      title: "Flashback Fest",
      description: "Site de evento musical com design moderno e responsivo",
      category: "Site Corporativo",
      url: "https://flashback.botneural.com/",
      icon: MessageCircle,
      image: "/flashback_capa_demo.png",
      features: ["Design Responsivo", "Animações CSS", "SEO Otimizado"]
    },
    {
      id: 2,
      title: "Dr. Silva",
      description: "Landing page para clínica médica com agendamento online",
      category: "Site Médico",
      url: "https://clinicadrsilva.botneural.com/",
      icon: Zap,
      image: "/clinicadrsilva_capa_demo.png",
      features: ["Agendamento Online", "Interface Limpa", "Mobile First"]
    },
    {
      id: 3,
      title: "Pulseirinhas",
      description: "E-commerce de acessórios com carrinho de compras",
      category: "E-commerce",
      url: "https://pulseirinhas.botneural.com/",
      icon: Bot,
      image: "/pulseirinhas_capa_demo.png",
      features: ["Carrinho de Compras", "Catálogo Dinâmico", "Checkout Integrado"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="demo" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-demo rounded-2xl p-8 md:p-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-jair-blue/10 border border-jair-blue/20 rounded-full px-4 py-2 mb-8">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Projetos Demonstrativos</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nossos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Projetos Demo
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Explore nossos projetos demonstrativos criados para showcases técnicos. Por questões de{' '}
              <span className="text-blue-400">confidencialidade e respeito aos nossos clientes</span>, apresentamos apenas projetos de demonstração que ilustram nossas capacidades.
            </p>

            {/* Carrossel de Projetos */}
            <div className="relative mb-12">
              {/* Navegação */}
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-full hover:border-jair-blue/40 transition-all duration-300 hover:bg-jair-blue/10"
                >
                  <ChevronLeft className="w-6 h-6 text-blue-400" />
                </button>
                
                <div className="flex space-x-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-blue-400' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="p-3 bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-full hover:border-jair-blue/40 transition-all duration-300 hover:bg-jair-blue/10"
                >
                  <ChevronRight className="w-6 h-6 text-blue-400" />
                </button>
              </div>

              {/* Card do Projeto */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {projects.map((project) => {
                    const IconComponent = project.icon;
                    return (
                      <div key={project.id} className="w-full flex-shrink-0 px-4">
                        <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-2xl overflow-hidden hover:border-jair-blue/40 transition-all duration-300 max-w-2xl mx-auto">
                          {/* Imagem de Capa */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={project.image} 
                              alt={`Preview do ${project.title}`}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                                  <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="400" height="200" fill="#f3f4f6"/>
                                    <text x="200" y="100" text-anchor="middle" fill="#9ca3af" font-family="Arial" font-size="16">Imagem não encontrada</text>
                                  </svg>
                                `)}`;
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute top-4 right-4">
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-jair-blue/80 transition-all duration-300"
                              >
                                <ExternalLink className="w-4 h-4 text-white" />
                              </a>
                            </div>
                            <div className="absolute bottom-4 left-4">
                              <span className="px-3 py-1 bg-jair-blue/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                {project.category}
                              </span>
                            </div>
                          </div>
                          
                          {/* Conteúdo do Card */}
                          <div className="p-6">
                            {/* Header do Card */}
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-12 h-12 bg-jair-blue/10 rounded-full flex items-center justify-center">
                                <IconComponent className="w-6 h-6 text-blue-400" />
                              </div>
                              <div className="text-left">
                                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                              </div>
                            </div>

                            {/* Descrição */}
                            <p className="text-gray-300 mb-4 text-left">{project.description}</p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-jair-blue/10 border border-jair-blue/20 rounded-full text-blue-400 text-sm"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>

                            {/* Botão de Visita */}
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 font-semibold w-full justify-center"
                            >
                              <span>Visitar Projeto</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => setShowContactPopup(true)}
                className="inline-flex items-center space-x-2 bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-blue-400 hover:text-white font-semibold"
              >
                <MessageCircle size={24} />
                <span className="text-lg">Agende uma conversa gratuita</span>
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
    </section>
  );
};

export default AIDemo;