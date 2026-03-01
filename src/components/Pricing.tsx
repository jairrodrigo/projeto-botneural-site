import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
    const plans = [
        {
            name: "Essencial",
            price: "Sob Consulta",
            description: "Ideal para pequenos negócios que estão começando a automatizar.",
            features: ["Atendimento 24/7", "Qualificação de Leads", "Integração com Agenda", "Até 500 mensagens/mês"]
        },
        {
            name: "Pro",
            price: "Sob Consulta",
            description: "Para empresas que buscam escala e automação completa de vendas.",
            features: ["Tudo do Essencial", "Cobrança via Pix", "Follow-up Automático", "Mensagens Ilimitadas", "Suporte Prioritário"],
            recommended: true
        }
    ];

    return (
        <section id="pricing" className="py-20 px-4 bg-black/40 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Planos que escalam com o seu{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            sucesso
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-3xl border ${plan.recommended ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 bg-white/5'} flex flex-col`}
                        >
                            {plan.recommended && (
                                <span className="bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">Recomendado</span>
                            )}
                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                            <div className="mb-8">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center gap-3 text-gray-300 text-sm">
                                        <Check size={16} className="text-blue-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.recommended ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                Começar Agora
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
