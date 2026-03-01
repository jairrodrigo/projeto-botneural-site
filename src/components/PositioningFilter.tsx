import React from 'react';
import { Check, X, Building2 } from 'lucide-react';

const PositioningFilter: React.FC = () => {
    return (
        <section className="py-24 md:py-32 px-4 bg-slate-950/40 border-y border-white/[0.02]">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16 md:mb-24">
                    <p className="text-blue-400 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6">Alinhamento Mútuo</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                        A BotNeural é para empresas que
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* For Whom */}
                    <div className="bg-black/40 border border-green-500/15 rounded-[32px] p-10 relative overflow-hidden group shadow-[0_0_30px_rgba(34,197,94,0.03)]">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                            <Building2 size={160} className="text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <Check className="w-5 h-5 text-green-400" />
                            </div>
                            Para quem é
                        </h3>
                        <ul className="space-y-6">
                            {[
                                "Já possuem faturamento contínuo",
                                "Recebem volume de contatos não organizados",
                                "Buscam maturidade e controle operacional",
                                "Precisam de previsibilidade no crescimento",
                                "Desejam profissionalizar sua imagem online"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300 font-medium text-lg leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Not For Whom */}
                    <div className="bg-black/40 border border-red-500/10 rounded-[32px] p-10 relative overflow-hidden group shadow-[0_0_30px_rgba(239,68,68,0.03)]">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                            <X size={160} className="text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                <X className="w-5 h-5 text-red-400" />
                            </div>
                            Não é para quem
                        </h3>
                        <ul className="space-y-6">
                            {[
                                "Apenas curioso sobre testes com IA",
                                "Busca soluções amadoras ou improvisadas",
                                "Ainda não validou seu modelo de negócios",
                                "Procura ferramentas baseadas apenas em preço baixo"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <X className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400 font-medium text-lg leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PositioningFilter;
