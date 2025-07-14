import React from 'react';
import { Mail, Instagram, MessageCircle, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact-section" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-white/5 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Entre em{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Contato
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Pronto para transformar seu negócio com IA? Vamos conversar sobre como posso ajudar você.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* WhatsApp */}
              <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-300 mb-4">Resposta rápida e atendimento personalizado</p>
                <a
                  href="https://wa.me/5515988213309"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle size={20} />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>

              {/* Email */}
              <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-jair-blue/20 transition-colors">
                  <Mail className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">E-mail</h3>
                <p className="text-gray-300 mb-4">Para propostas e informações detalhadas</p>
                <a
                  href="mailto:jairautomacoes@gmail.com"
                  className="inline-flex items-center space-x-2 bg-jair-blue hover:bg-jair-blue-dark text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Mail size={20} />
                  <span>Enviar E-mail</span>
                </a>
              </div>

              {/* Instagram */}
              <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-colors">
                  <Instagram className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
                <p className="text-gray-300 mb-4">Acompanhe projetos e novidades</p>
                <a
                  href="https://instagram.com/jair.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Instagram size={20} />
                  <span>@jair.cloud</span>
                </a>
              </div>
            </div>

            {/* CTA Final */}
            <div className="bg-gradient-primary rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Pronto para começar seu projeto?
              </h3>
              <p className="text-white/80 mb-6">
                Agende uma reunião gratuita e descubra como a IA pode revolucionar seu negócio.
              </p>
              <a
                href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma reunião para conhecer melhor seus serviços."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-jair-blue px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-white/30 font-semibold"
              >
                <MessageCircle size={24} />
                <span className="text-lg">Agendar Reunião Gratuita</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;