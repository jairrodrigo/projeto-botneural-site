import React from 'react';
import { X, Check } from 'lucide-react';

const Problems: React.FC = () => {
    return (
        <section id="problems" className="py-24 md:py-32 px-4 bg-slate-950/40 border-y border-white/[0.02]">
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Header with better spacing and contrast */}
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-8 leading-[1.1] tracking-tight max-w-4xl mx-auto">
                            O problema não é o volume de mensagens.<br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 block mt-2">
                                É a falta de estrutura para lidar com elas.
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            Quando o atendimento depende apenas de pessoas e improviso, oportunidades se perdem diariamente sem que a empresa perceba.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 text-left">
                        {/* Left: Disorganized */}
                        <div className="bg-black/40 border border-red-500/10 rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px]" />
                            <div className="relative z-10 space-y-4">
                                <div className="mb-10">
                                    <h3 className="text-2xl font-bold text-white mb-2">Acesso Comum</h3>
                                    <p className="text-gray-500 text-sm">Como a maioria opera hoje</p>
                                </div>
                                {[
                                    "Rotina de resposta manual e exaustiva",
                                    "Caixa de entrada caótica e sobrecarregada",
                                    "Oportunidades esfriam por demora no retorno",
                                    "Processo comercial dependente de memória",
                                    "Teto de crescimento limitado pela equipe"
                                ].map((problem, index) => (
                                    <div key={index} className="flex items-start gap-4 py-3">
                                        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <X className="w-3.5 h-3.5 text-red-400" />
                                        </div>
                                        <p className="text-gray-400 text-base">{problem}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: BotNeural */}
                        <div className="bg-gradient-to-b from-blue-950/20 to-black/40 border border-blue-500/15 rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.05)] group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
                            <div className="relative z-10 space-y-4">
                                <div className="mb-10">
                                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                        Padrão BotNeural
                                    </h3>
                                    <p className="text-blue-400/80 text-sm font-medium">Arquitetura de alta performance</p>
                                </div>
                                {[
                                    "Sistema que atende e filtra contatos 24h",
                                    "Painel centralizado com dados organizados",
                                    "Resposta imediata aos novos interessados",
                                    "Funil de atendimento padronizado",
                                    "Operação preparada para escalar volume"
                                ].map((solution, index) => (
                                    <div key={index} className="flex items-start gap-4 py-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/30">
                                            <Check className="w-3.5 h-3.5 text-blue-400" />
                                        </div>
                                        <p className="text-gray-200 text-base font-medium">{solution}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Problems;
