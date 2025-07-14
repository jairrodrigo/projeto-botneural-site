import React from 'react';
import { MessageCircle, Zap, Bot } from 'lucide-react';

const AIDemo: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-demo rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-jair-blue/10 border border-jair-blue/20 rounded-full px-4 py-2 mb-8">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Demonstração Interativa</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Teste Nossa{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Automação
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Converse com a IA de demonstração e veja como ela realiza agendamentos, responde dúvidas e entende{' '}
              <span className="text-blue-400">áudio, texto e imagem</span>.
            </p>

            {/* Demo Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300">
                <div className="w-12 h-12 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Conversação Natural</h3>
                <p className="text-gray-300 text-sm">Respostas humanizadas e contextualmente relevantes</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300">
                <div className="w-12 h-12 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Processamento Multimodal</h3>
                <p className="text-gray-300 text-sm">Entende áudio, texto, imagens e documentos</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300">
                <div className="w-12 h-12 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Agendamento Inteligente</h3>
                <p className="text-gray-300 text-sm">Gerencia horários e confirma consultas automaticamente</p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://wa.me/5515988213309"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5"
            >
              <MessageCircle size={24} />
              <span className="text-lg font-semibold">Testar IA no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemo;