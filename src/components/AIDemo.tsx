import React from 'react';
import { MessageCircle, Zap, Bot } from 'lucide-react';

const AIDemo: React.FC = () => {
  return (
    <section id="demo" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-demo rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
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

            {/* Demo Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300">
                <div className="w-12 h-12 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Sites Corporativos</h3>
                <p className="text-gray-300 text-sm">Projetos demonstrativos de sites empresariais e institucionais</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300">
                <div className="w-12 h-12 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">E-commerce Demo</h3>
                <p className="text-gray-300 text-sm">Lojas virtuais demonstrativas com funcionalidades completas</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300">
                <div className="w-12 h-12 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Automações IA</h3>
                <p className="text-gray-300 text-sm">Demonstrações de chatbots e automações inteligentes</p>
              </div>
            </div>

            {/* Demo Project Links */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
                <a 
                  href="https://flashback.jair.cloud/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5 font-semibold text-sm"
                >
                  <span>Flashback Fest</span>
                </a>
                <a 
                  href="https://clinicadrsilva.jair.cloud/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5 font-semibold text-sm"
                >
                  <span>Dr. Silva</span>
                </a>
                <a 
                  href="https://pulseirinhas.jair.cloud/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5 font-semibold text-sm"
                >
                  <span>Pulseirinhas</span>
                </a>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://wa.me/5515988213309?text=Olá! Quero saber mais sobre os serviços da Jair Cloud e solicitar um orçamento personalizado."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-blue-400 hover:text-white font-semibold"
              >
                <MessageCircle size={24} />
                <span className="text-lg">Solicitar Orçamento</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemo;