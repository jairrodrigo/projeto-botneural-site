import React, { useState } from 'react';
import { User, Target, Heart, Zap, Calendar, X } from 'lucide-react';
import { saveContactForm } from '../lib/supabase';
import { SuccessPopup } from './SuccessPopup';

const About: React.FC = () => {
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
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
                <span>Sobre </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Botneural
                </span>
              </h2>
              
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-jair-blue/10 to-cyan-500/10 border border-jair-blue/20 rounded-xl p-10 max-w-2xl mx-auto mb-16">
                <div className="text-center">
                  <div className="w-32 h-32 bg-jair-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                    <img 
                      src="/fotojair.png" 
                      alt="Jair Rodrigo" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">Jair Rodrigo</h4>
                  <p className="text-blue-400 mb-6 text-lg">Fundador da Botneural - Especialista em Automação & IA</p>
                  <div className="mt-6">
                    <p className="text-gray-300 mb-4 leading-relaxed text-base">
                      Jair Rodrigo é o fundador da Botneural, empresa sediada em Sorocaba especializada em otimização de processos e 
                      atendimento através de sites, sistemas e automação com IA.
                    </p>
                    <p className="text-gray-300 mb-4 leading-relaxed text-base">
                      A Botneural oferece atenção completa a cada projeto desenvolvido. Mais do que um fornecedor de tecnologia, 
                      somos parceiros dedicados na transformação digital dos negócios de nossos clientes.
                    </p>
                    <p className="text-gray-300 text-base italic">
                      "Otimizo processos e atendimento através de tecnologia inteligente"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-8">
                Entre em{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Contato
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* WhatsApp */}
                <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                    <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">WhatsApp</h4>
                  <p className="text-gray-300 mb-6">Resposta rápida e atendimento personalizado</p>
                  <button
                    onClick={() => setShowContactPopup(true)}
                    className="inline-flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>Entrar em contato</span>
                  </button>
                </div>

                {/* Email */}
                <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                  <div className="w-16 h-16 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-jair-blue/20 transition-colors">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">E-mail</h4>
                  <p className="text-gray-300 mb-6">Para propostas e informações detalhadas</p>
                  <a
                    href="mailto:contato@botneural.com.br"
                    className="inline-flex items-center justify-center space-x-2 bg-jair-blue hover:bg-jair-blue-dark text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Enviar E-mail</span>
                  </a>
                </div>

                {/* Instagram */}
                <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-colors">
                    <svg className="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.02.43a5.105 5.105 0 00-1.852 1.207 5.105 5.105 0 00-1.207 1.852C1.734 4.02 1.612 4.594 1.578 5.541 1.544 6.49 1.53 6.896 1.53 10.518s.013 4.028.048 4.976c.034.947.156 1.521.382 2.021a5.105 5.105 0 001.207 1.852 5.105 5.105 0 001.852 1.207c.5.226 1.074.348 2.021.382.947.035 1.354.048 4.976.048s4.028-.013 4.976-.048c.947-.034 1.521-.156 2.021-.382a5.105 5.105 0 001.852-1.207 5.105 5.105 0 001.207-1.852c.226-.5.348-1.074.382-2.021.035-.947.048-1.354.048-4.976s-.013-4.028-.048-4.976c-.034-.947-.156-1.521-.382-2.021a5.105 5.105 0 00-1.207-1.852A5.105 5.105 0 0016.037.43C15.537.204 14.963.082 14.016.048 13.067.013 12.661 0 12.017 0zm0 2.17c3.304 0 3.648.012 4.93.07.3.055.602.166.822.275a2.678 2.678 0 011.02.66c.311.311.549.677.66 1.02.11.22.22.522.275.822.058 1.281.07 1.625.07 4.93s-.012 3.648-.07 4.93c-.055.3-.166.602-.275.822a2.678 2.678 0 01-.66 1.02c-.311.311-.677.549-1.02.66-.22.11-.522.22-.822.275-1.281.058-1.625.07-4.93.07s-3.648-.012-4.93-.07a2.678 2.678 0 01-.822-.275 2.678 2.678 0 01-1.02-.66 2.678 2.678 0 01-.66-1.02 2.678 2.678 0 01-.275-.822c-.058-1.281-.07-1.625-.07-4.93s.012-3.648.07-4.93c.055-.3.166-.602.275-.822.11-.343.349-.709.66-1.02.311-.311.677-.549 1.02-.66.22-.11.522-.22.822-.275 1.281-.058 1.625-.07 4.93-.07L12.017 2.17zm0 3.405a4.935 4.935 0 100 9.87 4.935 4.935 0 000-9.87zm0 8.14a3.205 3.205 0 110-6.41 3.205 3.205 0 010 6.41zm5.338-8.34a1.154 1.154 0 11-2.308 0 1.154 1.154 0 012.308 0z"/>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Instagram</h4>
                  <p className="text-gray-300 mb-6">Acompanhe projetos e novidades</p>
                  <a
                    href="https://www.instagram.com/botneural.ia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.02.43a5.105 5.105 0 00-1.852 1.207 5.105 5.105 0 00-1.207 1.852C1.734 4.02 1.612 4.594 1.578 5.541 1.544 6.49 1.53 6.896 1.53 10.518s.013 4.028.048 4.976c.034.947.156 1.521.382 2.021a5.105 5.105 0 001.207 1.852 5.105 5.105 0 001.852 1.207c.5.226 1.074.348 2.021.382.947.035 1.354.048 4.976.048s4.028-.013 4.976-.048c.947-.034 1.521-.156 2.021-.382a5.105 5.105 0 001.852-1.207 5.105 5.105 0 001.207-1.852c.226-.5.348-1.074.382-2.021.035-.947.048-1.354.048-4.976s-.013-4.028-.048-4.976c-.034-.947-.156-1.521-.382-2.021a5.105 5.105 0 00-1.207-1.852A5.105 5.105 0 0016.037.43C15.537.204 14.963.082 14.016.048 13.067.013 12.661 0 12.017 0zm0 2.17c3.304 0 3.648.012 4.93.07.3.055.602.166.822.275a2.678 2.678 0 011.02.66c.311.311.549.677.66 1.02.11.22.22.522.275.822.058 1.281.07 1.625.07 4.93s-.012 3.648-.07 4.93c-.055.3-.166.602-.275.822a2.678 2.678 0 01-.66 1.02c-.311.311-.677.549-1.02.66-.22.11-.522.22-.822.275-1.281.058-1.625.07-4.93.07s-3.648-.012-4.93-.07a2.678 2.678 0 01-.822-.275 2.678 2.678 0 01-1.02-.66 2.678 2.678 0 01-.66-1.02 2.678 2.678 0 01-.275-.822c-.058-1.281-.07-1.625-.07-4.93s.012-3.648.07-4.93c.055-.3.166-.602.275-.822.11-.343.349-.709.66-1.02.311-.311.677-.549 1.02-.66.22-.11.522-.22.822-.275 1.281-.058 1.625-.07 4.93-.07L12.017 2.17zm0 3.405a4.935 4.935 0 100 9.87 4.935 4.935 0 000-9.87zm0 8.14a3.205 3.205 0 110-6.41 3.205 3.205 0 010 6.41zm5.338-8.34a1.154 1.154 0 11-2.308 0 1.154 1.154 0 012.308 0z"/>
                    </svg>
                    <span>@botneural</span>
                  </a>
                </div>
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
                    <div className="mt-2 text-xs text-gray-400">
                      ℹ️ Como você gostaria de ser chamado?
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
                    <div className="mt-2 text-xs text-gray-400">
                      📱 Número com DDD para contato direto
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
                    <div className="mt-2 text-xs text-gray-400">
                      🏢 Ex: E-commerce, Consultoria, Clínica, etc.
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
  
  export default About;