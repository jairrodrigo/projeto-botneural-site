import React, { useState } from 'react';
import { Bot, Globe, ArrowRight } from 'lucide-react';
import { ContactModal } from './ContactModal';

const Services: React.FC = () => {
    const [showContactPopup, setShowContactPopup] = useState(false);

    return (
        <section id="services" className="py-24 md:py-32 px-4 bg-black relative overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
                    <p className="text-blue-400 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6">Nossas Soluções</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-8">
                        Estrutura digital para transformar atendimento em processo.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    {/* Card 1: WhatsApp */}
                    <div className="group flex flex-col items-center text-center">
                        <div className="mb-8 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-900/50 to-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_30px_rgb(37,99,235,0.15)] group-hover:scale-110 group-hover:bg-blue-600/30 transition-all duration-500">
                            <Bot size={32} className="text-blue-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-6">IA no WhatsApp</h3>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Implementação de sistema autônomo para triagem, qualificação e direcionamento de novos contatos, funcionando 24 horas por dia com inteligência.
                        </p>
                        <ul className="space-y-4 text-left inline-block w-full max-w-[280px]">
                            {[
                                "Disponibilidade integral",
                                "Triagem inteligente de leads",
                                "Funil de atendimento direto",
                                "Retenção de histórico"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 text-gray-300">
                                    <div className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 2: Sites */}
                    <div className="group flex flex-col items-center text-center">
                        <div className="mb-8 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-900/50 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgb(6,182,212,0.15)] group-hover:scale-110 group-hover:bg-cyan-600/30 transition-all duration-500">
                            <Globe size={32} className="text-cyan-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-6">Sites Profissionais</h3>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Desenvolvimento de plataformas orientadas à conversão e projeção de marca, criando um verdadeiro hub de negócios online.
                        </p>
                        <ul className="space-y-4 text-left inline-block w-full max-w-[280px]">
                            {[
                                "Presença digital sólida",
                                "Captação otimizada",
                                "Performance e velocidade",
                                "Design institucional limpo"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 text-gray-300">
                                    <div className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-cyan-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-24 text-center">
                    <button
                        onClick={() => setShowContactPopup(true)}
                        className="inline-flex items-center gap-3 border border-white/10 text-white hover:bg-white/5 px-10 py-5 rounded-2xl transition-all duration-300 text-base font-semibold group hover:border-blue-500/50"
                    >
                        <span>Solicitar Diagnóstico Estratégico</span>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </button>
                </div>
            </div>

            <ContactModal
                isOpen={showContactPopup}
                onClose={() => setShowContactPopup(false)}
                source="services"
            />
        </section>
    );
};

export default Services;