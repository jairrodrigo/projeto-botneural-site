import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 bg-gradient-hero pt-20">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto relative z-0">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transforme Seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Negócio
            </span>{' '}
            com IA que Atende{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Clientes 24h
            </span>{' '}
            no WhatsApp
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            <span className="text-blue-400">Especialista em Automação de Negócios.</span> Desenvolvo soluções inteligentes que convertem visitantes em clientes enquanto você dorme. Sites modernos + IA no WhatsApp + Sistemas que{' '}
            <span className="text-blue-400">realmente funcionam</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/5515988213309"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5"
            >
              <MessageCircle size={24} />
              <span className="text-lg font-semibold">Quero Minha Consultoria Gratuita</span>
            </a>
            
            <a
              href="https://wa.me/5515988213309"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-transparent border-2 border-jair-blue text-jair-blue hover:bg-jair-blue hover:text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
            >
              <Sparkles size={24} />
              <span className="text-lg font-semibold">Ver Projetos Reais</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-jair-blue/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-jair-blue">24/7</div>
              <div className="text-gray-400">Atendimento IA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-jair-blue">100%</div>
              <div className="text-gray-400">Personalizado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-jair-blue">5+</div>
              <div className="text-gray-400">Anos Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-jair-blue">60</div>
              <div className="text-gray-400">Dias Garantia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;