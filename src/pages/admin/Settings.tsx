import AdminLayout from '../../components/admin/AdminLayout';
import { Shield, CreditCard, Bell, Globe, Database, User } from 'lucide-react';

const Settings: React.FC = () => {
    const sections = [
        { icon: User, label: 'Perfil', desc: 'Gerencie suas informações pessoais e credenciais.' },
        { icon: Globe, label: 'Geral', desc: 'Configurações globais da empresa e fuso horário.' },
        { icon: Database, label: 'Integrações', desc: 'Conecte o BotNeural com n8n, WhatsApp e CRMs.' },
        { icon: Bell, label: 'Notificações', desc: 'Configure como você quer ser avisado sobre novos leads.' },
        { icon: CreditCard, label: 'Assinatura', desc: 'Gerencie seu plano SaaS e faturamento.' },
        { icon: Shield, label: 'Segurança', desc: 'Controle de acesso, logs e segurança da conta.' },
    ];

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-gray-200 mb-2">
                        Configurações
                    </h1>
                    <p className="text-gray-400">Personalize sua experiência e gerencie sua estrutura.</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.map((section, i) => (
                        <button key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all text-left flex gap-6 group">
                            <div className="p-4 rounded-2xl bg-slate-500/10 text-slate-400 group-hover:bg-slate-500/20 group-hover:text-white transition-all">
                                <section.icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{section.label}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                    {section.desc}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="pt-12 border-t border-white/10 flex justify-between items-center opacity-30">
                    <div className="flex items-center gap-2">
                        <img src="/botneural_logo.png" alt="Logo" className="w-6 h-6 grayscale" />
                        <span className="text-sm font-bold text-white tracking-widest uppercase">BotNeural Platform v1.0</span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;
