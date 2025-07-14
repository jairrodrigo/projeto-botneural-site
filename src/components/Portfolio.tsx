import React from 'react';
import { ExternalLink, Zap, TrendingUp } from 'lucide-react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: 'PicoPay - Sistema Financeiro Automatizado',
      description: 'Controle financeiro via WhatsApp - envie foto da conta e seja atualizado automaticamente',
      tech: 'IA + Automação + Interface intuitiva',
      url: 'https://picopay.jair.cloud/',
      image: '/api/placeholder/600/400',
      category: 'Sistema Financeiro'
    },
    {
      title: 'Clínica Dr. Silva - Solução Completa',
      description: 'Landing page para clínicas com agendamento integrado e IA para qualificação de pacientes',
      tech: 'Agendamentos automatizados 24h',
      url: 'https://clinicadrsilva.jair.cloud/',
      image: '/api/placeholder/600/400',
      category: 'Clínica Odontológica'
    },
    {
      title: 'Pulseirinhas - E-commerce Inteligente',
      description: 'Loja online com vendas 24h via WhatsApp e controle de estoque automatizado',
      tech: 'Automação completa de vendas',
      url: 'https://pulseirinhas.jair.cloud/',
      image: '/api/placeholder/600/400',
      category: 'E-commerce'
    }
  ];

  return (
    <section id="portfolio" className="py-20 px-4 bg-gray-900/30">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Projetos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Reais
              </span>{' '}
              Funcionando
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Veja automações que desenvolvi e estão gerando resultados reais para negócios como o seu.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project, index) => (
              <div key={index} className="bg-white/5 rounded-2xl overflow-hidden border border-jair-blue/20 hover:border-jair-blue/40 transition-all duration-300 transform hover:scale-105">
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-jair-blue/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-300">{project.category}</span>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Tech Badge */}
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">{project.tech}</span>
                  </div>
                  
                  {/* CTA */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    <span className="font-medium">Ver Projeto Funcionando</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-jair-blue/10 to-cyan-500/10 rounded-2xl p-8 border border-jair-blue/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Imagine Seu Negócio Funcionando Assim
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Cada projeto foi desenvolvido pensando em <strong>resultados reais</strong>. 
                Quer uma solução personalizada para seu negócio?
              </p>
              <a
                href="https://wa.me/5515988213309"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5"
              >
                <span className="text-lg font-semibold">Quero uma Solução Assim Para Mim</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
