import React from 'react';
import { MessageCircle, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
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
          <span className="text-blue-400">Especialista em Desenvolvimento Web e Automação com IA.</span> Crio sites profissionais e automações inteligentes para WhatsApp que <span className="text-blue-400">trabalham 24h por você</span>.
        </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-8">
            <a
              href="https://wa.me/5515988213309?text=Olá! Gostaria de conhecer seus serviços e agendar uma conversa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gradient-primary text-white px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5 text-xl font-semibold"
            >
              <MessageCircle className="w-7 h-7" />
              <span>Quero Conversar Agora</span>
            </a>
          </div>

          {/* Trust Badge */}
          <div className="mb-12">
            <p className="text-sm text-gray-400 mb-2">✅ Consultoria inicial gratuita</p>
            <p className="text-sm text-gray-400">🤖 Agente de IA disponível 24h no WhatsApp para tirar dúvidas</p>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Hero;