import React from 'react';
import { Code, Brain, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-white/5 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Conheça{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Jair Rodrigo
                  </span>
                </h2>
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-blue-400 mb-3">Especialista em Automação de Negócios</h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Consultor e desenvolvedor especializado em soluções automatizadas que transformam pequenos e médios negócios através da tecnologia inteligente.
                  </p>
                </div>

                <div className="bg-jair-blue/5 rounded-lg p-6 mb-8">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">🎯 Minha Missão</h4>
                  <p className="text-gray-300">
                    Democratizar o acesso à automação inteligente para empresários que querem crescer sem depender só da força de trabalho manual.
                  </p>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-jair-blue/10 rounded-full flex items-center justify-center mt-1">
                      <Code className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Expertise Profissional</h3>
                      <p className="text-gray-300">5+ anos desenvolvendo soluções automatizadas. Especialista em Inteligência Artificial aplicada a negócios.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-jair-blue/10 rounded-full flex items-center justify-center mt-1">
                      <Brain className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Consultor em Otimização</h3>
                      <p className="text-gray-300">Análise de processos empresariais e desenvolvimento de sistemas integrados com foco total em ROI.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-jair-blue/10 rounded-full flex items-center justify-center mt-1">
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Resultados Mensuráveis</h3>
                      <p className="text-gray-300">Projetos que geram economia de tempo, aumento de vendas e satisfação do cliente. Atendimento personalizado de Sorocaba/SP.</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/5515988213309"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                  >
                    <span>Quero Conhecer o Especialista</span>
                  </a>
                  
                  <a
                    href="https://instagram.com/jair.cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-transparent border border-jair-blue text-jair-blue hover:bg-jair-blue hover:text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                  >
                    <span>@jair.cloud</span>
                  </a>
                  
                  <a
                    href="mailto:jairautomacoes@gmail.com"
                    className="inline-flex items-center space-x-2 bg-transparent border border-jair-blue text-jair-blue hover:bg-jair-blue hover:text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                  >
                    <span>E-mail</span>
                  </a>
                </div>
              </div>

              {/* Photo */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Background gradient circle */}
                  <div className="absolute inset-0 bg-gradient-to-br from-jair-blue/20 to-cyan-500/20 rounded-full blur-xl"></div>
                  
                  {/* Photo container */}
                  <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-jair-blue/30 shadow-2xl shadow-jair-blue/20">
                    <img
                      src="/fotojair.png"
                      alt="Jair Rodrigo - Desenvolvedor especializado em IA e automação"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        // Fallback caso a imagem não carregue
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-jair-blue/20 to-cyan-500/20 flex items-center justify-center" style={{ display: 'none' }}>
                      <div className="w-32 h-32 bg-jair-blue/10 rounded-full flex items-center justify-center">
                        <Code className="w-16 h-16 text-blue-400" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Design clean sem elementos decorativos */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;