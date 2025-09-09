import React from 'react';
import { Globe, MessageCircle, Brain } from 'lucide-react';

const Services: React.FC = () => {
  const mainServices = [
    {
      category: "DESENVOLVIMENTO WEB",
      icon: Globe,
      title: "Sites e Sistemas Profissionais",
      subtitle: "Presença digital que gera resultados",
      features: [
        "Sites responsivos e modernos",
        "E-commerce otimizado para vendas (Loja Online)",
        "Sistemas web personalizados",
        "SEO e velocidade otimizados",
        "Integração opcional com IA"
      ],
      cta: "Quero um Site",
      whatsappText: "Olá! Quero saber mais sobre desenvolvimento de sites profissionais."
    },
    {
      category: "AUTOMAÇÃO INTELIGENTE",
      icon: MessageCircle,
      title: "WhatsApp com IA Avançada",
      subtitle: "Atendimento 24h que entende tudo",
      features: [
        "Entende áudio, imagem e arquivos",
        "Agendamentos automáticos",
        "Processamento de pagamentos",
        "Conversação natural com IA",
        "Conhecimento sobre seu negócio"
      ],
      cta: "Quero Automatizar",
      whatsappText: "Olá! Quero saber mais sobre automação WhatsApp com IA."
    }
  ];

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-jair-blue/5 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Soluções que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Trabalhamos
            </span>{' '}
              seu Negócio
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Especialista em desenvolvimento web e automação com IA. Transformo ideias em soluções digitais que trabalham 24h por você.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-8 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group hover:shadow-lg hover:shadow-jair-blue/20"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center space-x-2 bg-jair-blue/10 border border-jair-blue/20 rounded-full px-4 py-2 mb-4">
                    <service.icon className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-semibold">{service.category}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-xl text-gray-300 mb-6">{service.subtitle}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                

              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
};

export default Services;