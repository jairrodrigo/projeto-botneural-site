import React from 'react';
import { Globe, MessageCircle, Calendar, CreditCard } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Globe,
      title: 'Desenvolvimento de Sites Inteligentes',
      description: 'Sites modernos que não só atraem, mas convertem visitantes em clientes através de automações inteligentes.',
      features: ['Design responsivo e otimizado', 'Integração direta com WhatsApp', 'IA que qualifica leads automaticamente', 'Velocidade superior para melhor posicionamento']
    },
    {
      icon: MessageCircle,
      title: 'Automação Inteligente via WhatsApp',
      description: 'Sistemas avançados de atendimento que conversam naturalmente e vendem seus produtos/serviços 24 horas por dia.',
      features: ['Respostas humanizadas e inteligentes', 'Qualificação automática de leads', 'Integração com seus sistemas existentes', 'Relatórios detalhados de performance']
    },
    {
      icon: Calendar,
      title: 'Gestão de Automação Empresarial',
      description: 'Soluções sob medida para automatizar processos e otimizar operações do seu negócio.',
      features: ['Agendamento automático', 'Controle de estoque inteligente', 'Cobrança e lembretes automatizados', 'Dashboards em tempo real']
    },
    {
      icon: CreditCard,
      title: 'Consultoria em Automação',
      description: 'Análise completa do seu negócio para identificar oportunidades de automação e otimização de processos.',
      features: ['Análise de processos atuais', 'Identificação de gargalos', 'Estratégia de implementação', 'Treinamento da equipe']
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
                Automatizam
              </span>{' '}
              seu Negócio
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Especialista em automação de negócios. Transformo processos manuais em sistemas inteligentes que trabalham 24h por você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-8 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group hover:shadow-lg hover:shadow-jair-blue/20"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-jair-blue/10 to-jair-blue/5 border-2 border-jair-blue/20 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-jair-blue/20 group-hover:to-jair-blue/10 group-hover:border-jair-blue/40 transition-all duration-300 shadow-lg shadow-jair-blue/10 group-hover:shadow-jair-blue/20">
                    <service.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
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