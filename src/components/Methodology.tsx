import React from 'react';

const Methodology: React.FC = () => {
    const steps = [
        {
            number: "01",
            title: "Diagnóstico",
            description: "Análise profunda da operação para mapear gargalos no atendimento e definir a base da nova estrutura."
        },
        {
            number: "02",
            title: "Arquitetura",
            description: "Desenho da solução ideal, integrando o atendimento automatizado no WhatsApp com sua fundação digital."
        },
        {
            number: "03",
            title: "Implantação",
            description: "Execução técnica refinada, garantindo que a transição seja fluida e o sistema opere sem interrupções."
        },
        {
            number: "04",
            title: "Otimização",
            description: "Acompanhamento dos primeiros ciclos estruturais para ajustes e ganho máximo de previsibilidade."
        }
    ];

    return (
        <section id="methodology" className="py-24 md:py-32 px-4 relative overflow-hidden bg-slate-950/40 border-y border-white/[0.02]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">
                {/* Header */}
                <div className="text-center mb-20 md:mb-28">
                    <p className="text-blue-400 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6">Processo de Implantação</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                        Como estruturamos sua operação
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative bg-black/40 border border-white/5 rounded-[32px] p-10 hover:border-blue-500/20 hover:bg-white/[0.02] transition-all duration-500 group overflow-hidden shadow-lg"
                        >
                            {/* Large number watermark */}
                            <div className="absolute top-6 right-8 text-7xl font-black text-white/[0.03] select-none leading-none group-hover:text-white/[0.06] transition-colors duration-500">
                                {step.number}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 leading-snug tracking-tight">
                                <span className="text-blue-400 font-semibold mr-3">{step.number}.</span>
                                {step.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-lg pr-4">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Methodology;
