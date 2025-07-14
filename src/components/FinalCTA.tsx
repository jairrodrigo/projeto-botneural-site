import React from 'react';
import { MessageCircle, Gift, Clock } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Pare de{' '}
              <span className="text-white">
                Perder Oportunidades
              </span>{' '}
              Enquanto Dorme
            </h2>

            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Agende sua consultoria estratégica gratuita e descubra como automatizar seu negócio com inteligência.
            </p>

            {/* Oferta Especial */}
            <div className="bg-white/10 rounded-xl p-6 mb-8 border border-white/20">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Gift className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">BÔNUS EXCLUSIVO</h3>
              </div>
              <p className="text-lg text-white mb-4">
                <span className="font-bold text-yellow-400">Análise de Concorrência Gratuita</span> (R$ 500)
              </p>
              <p className="text-white/80">
                Descubra exatamente o que seus concorrentes estão fazendo e como você pode se destacar no mercado
              </p>
            </div>

            {/* Urgência */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Clock className="w-5 h-5 text-orange-400" />
              <p className="text-orange-400 font-semibold">
                Oferta válida apenas para os próximos 15 dias
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://wa.me/5515988213309?text=Olá! Gostaria de agendar minha consultoria estratégica gratuita e receber a análise de concorrência!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-jair-blue px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-white/30 font-semibold"
              >
                <MessageCircle size={24} />
                <span className="text-lg">Quero Minha Consultoria Gratuita AGORA</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-white mb-2">60 Dias</div>
                  <div className="text-white/70">Garantia total ou reembolso completo</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">Atendimento 24/7</div>
                  <div className="text-white/70">IA trabalhando sem parar por você</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">Sorocaba/SP</div>
                  <div className="text-white/70">Atendimento local + projetos remotos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;