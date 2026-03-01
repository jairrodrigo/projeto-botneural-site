import React, { useState } from 'react';
import { ArrowRight, Bot, Globe } from 'lucide-react';
import { ContactModal } from './ContactModal';

const Hero: React.FC = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 pt-32 pb-20 overflow-hidden bg-black">
      {/* Ambient glows refined for less noise */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-[100%] blur-[120px] opacity-70" />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow label - More subtle */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-10 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Arquitetura Operacional Digital
          </div>

          {/* Main Title - Adjusted letter spacing and line height for premium feel */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-white mb-8 leading-[1.05] tracking-tight">
            Sua empresa com{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Automação Inteligente
            </span>{' '}
            e Sites Estratégicos.
          </h1>

          {/* Subtitle - Exact matching user request */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Implementamos uma estrutura digital que organiza atendimento, fortalece sua presença online e traz previsibilidade ao crescimento.
          </p>

          {/* CTA Layout */}
          <div className="flex flex-col items-center justify-center gap-8 mb-12">
            <button
              onClick={() => setShowContactPopup(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-5 rounded-2xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:scale-105 shadow-[0_8px_30px_rgb(37,99,235,0.25)] text-lg font-semibold"
            >
              <span>Solicitar Diagnóstico Estratégico</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Bullets - Clearer visual connection */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 opacity-80">
              <div className="flex items-center gap-2.5 text-gray-300 text-sm font-medium tracking-wide">
                <Bot className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>IA no WhatsApp</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-700" />
              <div className="flex items-center gap-2.5 text-gray-300 text-sm font-medium tracking-wide">
                <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Sites Profissionais</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={showContactPopup}
        onClose={() => setShowContactPopup(false)}
        source="hero"
      />
    </section>
  );
};

export default Hero;