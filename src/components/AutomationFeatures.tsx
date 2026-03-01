import React from 'react';
import { MessageSquare, Smartphone, Calendar, CreditCard, Users, Bell } from 'lucide-react';

const AutomationFeatures: React.FC = () => {
    const features = [
        {
            icon: MessageSquare,
            title: "Resposta Instantânea",
            description: "Responde novos contatos em segundos, 24/7"
        },
        {
            icon: Users,
            title: "Qualificação Automática",
            description: "Filtra curiosos de clientes reais automaticamente"
        },
        {
            icon: CreditCard,
            title: "Cobrança PIX",
            description: "Envia chaves e confirma pagamentos na hora"
        },
        {
            icon: Calendar,
            title: "Agendamento",
            description: "Agenda reuniões na sua agenda integrada"
        },
        {
            icon: Bell,
            title: "Follow-up",
            description: "Envia lembretes para quem parou de responder"
        },
        {
            icon: Smartphone,
            title: "Transbordo Humano",
            description: "Transfere para você quando necessário"
        }
    ];

    return (
        <section className="py-20 px-4 bg-black/20">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        O que a{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            automação faz na prática
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Uma equipe inteira de atendimento dentro de uma única automação.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AutomationFeatures;
