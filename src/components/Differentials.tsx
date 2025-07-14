import React from 'react';
import { Clock, Heart, Zap, TrendingUp } from 'lucide-react';

const Differentials: React.FC = () => {
  const differentials = [
    {
      icon: Clock,
      title: 'Atendimento 24/7',
      description: 'Sua IA nunca dorme. Atende clientes a qualquer hora, convertendo leads mesmo quando você está dormindo.'
    },
    {
      icon: Heart,
      title: 'Experiência Humanizada',
      description: 'Conversas naturais que fazem seus clientes se sentirem ouvidos e compreendidos, não robotizados.'
    },
    {
      icon: Zap,
      title: 'Entendimento Multimodal',
      description: 'Processa áudio, imagens e texto, oferecendo uma experiência completa e intuitiva para seus clientes.'
    },
    {
      icon: TrendingUp,
      title: 'Foco em Resultados Reais',
      description: 'Cada automação é desenvolvida para gerar mais leads, reduzir custos e aumentar sua receita.'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Por que Escolher{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Jair.cloud
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Diferenciais que fazem a diferença no seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((differential, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl p-6 text-center hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group hover:shadow-lg hover:shadow-jair-blue/20"
            >
              <div className="w-16 h-16 bg-jair-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-jair-blue/20 transition-colors">
                <differential.icon className="w-8 h-8 text-blue-400" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">{differential.title}</h3>
              
              <p className="text-gray-300 leading-relaxed">
                {differential.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;