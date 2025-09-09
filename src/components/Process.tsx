import React from 'react';
import { MessageCircle, FileText, Code, Rocket } from 'lucide-react';

const Process: React.FC = () => {
  const processSteps = [
    {
      step: "01",
      title: "Consulta Gratuita",
      description: "Conversamos sobre suas necessidades e objetivos",
      icon: MessageCircle,
      details: "Nossa equipe entende seu negócio, público-alvo e metas. Identificamos as melhores soluções para seu caso específico."
    },
    {
      step: "02",
      title: "Proposta Personalizada",
      description: "Criamos uma solução específica para seu negócio",
      icon: FileText,
      details: "Desenvolvemos um plano detalhado com cronograma, funcionalidades e investimento necessário."
    },
    {
      step: "03",
      title: "Desenvolvimento",
      description: "Construímos sua solução com acompanhamento em tempo real",
      icon: Code,
      details: "Desenvolvimento ágil com entregas parciais e seu feedback constante durante todo o processo."
    },
    {
      step: "04",
      title: "Entrega e Suporte",
      description: "Lançamos e oferecemos suporte contínuo",
      icon: Rocket,
      details: "Entrega completa com treinamento e suporte técnico para garantir o sucesso do projeto."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-2xl p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Como{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Trabalhamos
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Um processo simples e transparente para transformar sua ideia em realidade digital.
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={index}
                    className="relative bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 left-6">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 mt-4 group-hover:bg-jair-blue/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-blue-400" />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        {step.description}
                      </p>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {step.details}
                      </p>
                    </div>

                    {/* Connector Line (except for last item) */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-jair-blue/40 to-transparent transform -translate-y-1/2" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Pronto para começar seu projeto?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Agende uma consulta gratuita e descubra como podemos ajudar seu negócio a crescer com tecnologia.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href="https://wa.me/5515988213309?text=Olá! Queremos agendar uma consulta gratuita para discutir nosso projeto."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5 font-semibold"
                  >
                    <MessageCircle size={24} />
                    <span>Agendar Consulta Gratuita</span>
                  </a>
                  <a
                    href="https://wa.me/5515988213309?text=Olá! Temos algumas dúvidas sobre o processo de desenvolvimento. Podem nos ajudar?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-blue-400 hover:text-white font-semibold"
                  >
                    <MessageCircle size={24} />
                    <span>Tirar Dúvidas</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;