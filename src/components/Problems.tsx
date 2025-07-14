import React from 'react';
import { X, CheckCircle } from 'lucide-react';

const Problems: React.FC = () => {
  const problems = [
    "Perder clientes de madrugada porque não consegue responder",
    "Site que não vende nada, só fica bonito", 
    "Gastar horas respondendo as mesmas perguntas",
    "Concorrência com chatbots robóticos e frustrantes",
    "Equipe sobrecarregada com tarefas repetitivas"
  ];

  const solutions = [
    "Atendimento 24/7 sem contratar funcionários",
    "Site que realmente vende e converte visitantes",
    "IA que trabalha enquanto você dorme",
    "Clientes satisfeitos com respostas instantâneas e inteligentes",
    "Mais tempo para focar no que realmente importa"
  ];

  return (
    <section id="problems" className="py-20 px-4 bg-gray-900/50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cansado de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                Perder Clientes
              </span>{' '}
              Todos os Dias?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Se você se identifica com esses problemas, chegou a hora de automatizar seu negócio de vez.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-400 mb-8 text-center">❌ Problemas Atuais</h3>
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-red-900/20 rounded-lg border border-red-500/20">
                  <X className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed">{problem}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-400 mb-8 text-center">✅ Sua Nova Realidade</h3>
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed">{solution}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              href="https://wa.me/5515988213309"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5"
            >
              <span className="text-lg font-semibold">Quero Resolver Esses Problemas AGORA</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
