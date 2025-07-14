import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: 'Como funciona a IA no WhatsApp?',
      answer: 'Nossa IA é integrada diretamente ao WhatsApp Business e funciona 24/7. Ela entende mensagens de texto, áudio e imagens, respondendo de forma natural e humanizada. Pode realizar agendamentos, responder dúvidas frequentes e encaminhar casos complexos para você quando necessário.'
    },
    {
      question: 'Quanto tempo leva para implementar?',
      answer: 'O tempo varia conforme a complexidade do projeto. Um site básico com IA simples pode estar pronto em 7-10 dias. Projetos mais complexos com múltiplas integrações podem levar de 2-4 semanas. Fornecemos cronograma detalhado após análise dos requisitos.'
    },
    {
      question: 'A IA pode agendar consultas automaticamente?',
      answer: 'Sim! Nossa IA pode verificar disponibilidade em tempo real, agendar consultas, enviar confirmações e lembretes automáticos. Ela se integra com calendários existentes e pode até mesmo reagendar quando necessário.'
    },
    {
      question: 'Como é feita a manutenção e suporte?',
      answer: 'Oferecemos suporte contínuo via WhatsApp e e-mail. Atualizações de segurança são automáticas. Melhorias na IA e novas funcionalidades são implementadas mensalmente. Você recebe relatórios detalhados de performance e sugestões de otimização.'
    },
    {
      question: 'Posso personalizar as respostas da IA?',
      answer: 'Absolutamente! Treinamos a IA com informações específicas do seu negócio, tom de voz desejado e conhecimento sobre seus serviços. Você pode solicitar ajustes a qualquer momento para manter a personalidade da marca.'
    }
  ];

  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Perguntas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Frequentes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-jair-blue/20 rounded-xl mb-4 overflow-hidden hover:border-jair-blue/40 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-jair-blue/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;