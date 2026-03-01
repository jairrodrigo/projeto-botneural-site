import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { ContactModal } from './ContactModal';

const CasesCarousel: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showContactPopup, setShowContactPopup] = useState(false);

    const cases = [
        {
            title: "JC Construções",
            fullUrl: "https://jcconstrucoes.botneural.com.br/",
            displayLink: "jcconstrucoes.botneural.com.br",
            tag: "Construção Civil",
            description: "Apresentação estratégica de portfólio de serviços, organizada para destacar especialidades e facilitar orçamentos de novos clientes.",
            benefits: [
                "Exibição clara de especialidades",
                "Facilitação de pedidos de orçamento"
            ],
            imageUrl: "/jc_construcoes_new_preview.png"
        },
        {
            title: "Leão Top Team",
            fullUrl: "https://leaoteam.botneural.com.br/",
            displayLink: "leaoteam.botneural.com.br",
            tag: "Artes Marciais",
            description: "Estrutura de site profissional desenvolvida para escalar matrículas e organizar a apresentação de modalidades.",
            benefits: [
                "Apresentação institucional sólida",
                "Captação de alunos otimizada"
            ],
            imageUrl: "/leaotopteam_preview.png"
        },
        {
            title: "Soropel",
            fullUrl: "https://soropel.com.br",
            displayLink: "soropel.com.br",
            tag: "Indústria",
            description: "Plataforma de catálogo digital B2B desenvolvida para facilitar pedidos de cotação e organizar o processamento de compras.",
            benefits: [
                "Sistema de cotação e catálogo online",
                "Processo de compras otimizado"
            ],
            imageUrl: "/site_soropel_catalogo.png"
        }
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth * 0.8;
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="cases" className="py-24 md:py-32 px-4 bg-black overflow-hidden relative">
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="mb-16 md:mb-24 text-center">
                    <p className="text-blue-400 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6">Validação Prática</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Estruturas Implementadas na Prática
                    </h2>
                    <p className="text-gray-500 max-w-2xl text-lg mx-auto font-light">
                        Modelos de controle operacional ativos, integrando atendimento autônomo e sistemas.
                    </p>
                </div>

                {/* Carousel Wrapper */}
                <div className="relative group">
                    {/* Controls */}
                    <div className="absolute -top-[72px] right-0 flex space-x-3">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {cases.map((card, index) => (
                            <a
                                key={index}
                                href={card.fullUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-w-[85vw] sm:min-w-[480px] md:min-w-[540px] snap-center bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden transition-all duration-500 hover:border-blue-500/20 hover:bg-white/[0.04] group/card flex flex-col h-full"
                            >
                                {/* Image Area */}
                                <div className="h-56 sm:h-64 relative overflow-hidden bg-gray-900 border-b border-white/5">
                                    <img
                                        src={card.imageUrl}
                                        alt={card.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105 opacity-90 group-hover/card:opacity-100"
                                    />
                                    <div className="absolute top-5 left-5 z-20">
                                        <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-widest shadow-xl">
                                            {card.tag}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 sm:p-10 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{card.title}</h3>
                                            <span className="text-gray-500 text-sm">{card.displayLink}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover/card:bg-blue-600 group-hover/card:border-blue-500 group-hover/card:text-white transition-all duration-300">
                                            <Eye size={18} />
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-base mb-8 leading-relaxed font-light">{card.description}</p>

                                    <div className="space-y-4 pt-6 border-t border-white/5 mt-auto">
                                        {card.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                                <span className="text-gray-300 text-sm font-medium">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <ContactModal
                isOpen={showContactPopup}
                onClose={() => setShowContactPopup(false)}
                source="cases-carousel"
            />

            <style>{`
                #cases div[ref] { scrollbar-width: none; }
                #cases div::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
};

export default CasesCarousel;
