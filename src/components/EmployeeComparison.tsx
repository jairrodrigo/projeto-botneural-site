import React from 'react';
import { User, DollarSign, Clock, Battery, CheckCircle } from 'lucide-react';

const EmployeeComparison: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Quanto custa continuar no{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                            manual?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Pare de depender apenas de pessoas. Comece a depender de processos estruturados.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Employee Card */}
                    <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <User size={120} className="text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                <User className="text-red-500 w-6 h-6" />
                            </div>
                            Funcionário Tradicional
                        </h3>

                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <DollarSign className="text-red-400 w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block text-lg">Salário + encargos</strong>
                                    <span className="text-gray-400">Alto custo fixo e encargos trabalhistas</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <Clock className="text-red-400 w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block text-lg">Horário limitado</strong>
                                    <span className="text-gray-400">Atendimento manual e dependência humana</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <Battery className="text-red-400 w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block text-lg">Baixa escalabilidade</strong>
                                    <span className="text-gray-400">Crescimento limitado à disponibilidade física</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* BotNeural Card */}
                    <div className="bg-green-900/10 border border-green-500/20 rounded-2xl p-8 relative overflow-hidden transform md:-translate-y-4 shadow-xl shadow-green-900/10">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <CheckCircle size={120} className="text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle className="text-green-500 w-6 h-6" />
                            </div>
                            Automação com IA + Sistema Operacional
                        </h3>

                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <DollarSign className="text-green-400 w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block text-lg">Qualificação automática</strong>
                                    <span className="text-gray-400">Processos inteligentes que operam sem interrupção</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <Clock className="text-green-400 w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block text-lg">Atendimento 24h</strong>
                                    <span className="text-gray-400">Disponibilidade total no WhatsApp em qualquer horário</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <Battery className="text-green-400 w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block text-lg">Dados organizados</strong>
                                    <span className="text-gray-400">Escalável e com implantação personalizada</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-2xl font-bold text-white italic">
                        "Não substituímos pessoas. <span className="text-blue-400">Estruturamos processos.</span>"
                    </p>
                </div>
            </div>
        </section>
    );
};

export default EmployeeComparison;
