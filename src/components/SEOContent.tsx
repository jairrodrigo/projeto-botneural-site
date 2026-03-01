import React from 'react';
import { Zap, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

const SEOContent: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-black/20 to-black/40">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Implantação de Automação com IA no WhatsApp para Escala Comercial
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Empresas estão transformando o WhatsApp em um vendedor automático que responde, qualifica e agenda clientes 24h.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 space-y-10">

                    {/* Block 1: O que é */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Por que investir em Automação de WhatsApp para Empresas?</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            <strong className="text-white">Automação de WhatsApp</strong> é o uso de <strong className="text-blue-400">IA e integrações</strong> para
                            responder clientes automaticamente, organizar o atendimento e transformar conversas em vendas sem depender de resposta manual.
                            Com <strong className="text-white">automação de atendimento</strong>, sua empresa opera 24/7 sem aumentar custos com equipe.
                        </p>
                    </div>

                    {/* Block 2: Por que empresas estão automatizando */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Por que empresas estão automatizando</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-300 text-lg">Leads querem resposta imediata</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-300 text-lg">Equipes não conseguem atender 24h</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-300 text-lg">Atendimento manual limita o crescimento</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-300 text-lg">Automação aumenta conversão e produtividade</p>
                            </div>
                        </div>
                    </div>

                    {/* Block 3: Principais Benefícios */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Benefícios da Gestão de Contatos com IA e Atendimento Automático</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Benefit 1 */}
                            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/40 transition-colors">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-6 h-6 text-blue-400" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Respostas instantâneas</h4>
                                <p className="text-gray-300 text-sm">Atenda todos os leads em segundos, 24/7</p>
                            </div>

                            {/* Benefit 2 */}
                            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 text-center hover:border-green-500/40 transition-colors">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <DollarSign className="w-6 h-6 text-green-400" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Cobrança e agendamento automáticos</h4>
                                <p className="text-gray-300 text-sm">PIX, links de pagamento e calendário integrado</p>
                            </div>

                            {/* Benefit 3 */}
                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/40 transition-colors">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-6 h-6 text-purple-400" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Mais vendas sem aumentar equipe</h4>
                                <p className="text-gray-300 text-sm">Escale atendimento sem contratar mais pessoas</p>
                            </div>

                        </div>
                    </div>

                    {/* CTA for Blog */}
                    <div className="pt-6 border-t border-white/10">
                        <div className="text-center">
                            <p className="text-gray-300 mb-4">
                                Quer entender todos os detalhes sobre automação comercial?
                            </p>
                            <a
                                href="/blog"
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full hover:opacity-90 transition-all font-semibold shadow-lg shadow-blue-500/25"
                            >
                                <span>Ler guia completo sobre automação</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SEOContent;
