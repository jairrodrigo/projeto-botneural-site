import React, { useState } from 'react';
import { ExternalLink, Stethoscope, Sparkles, Wrench, ArrowRight, Calendar, CheckCircle, X } from 'lucide-react';
import { SuccessPopup } from './SuccessPopup';
import { saveContactForm } from '../lib/supabase';

const ClientsSection: React.FC = () => {
    const [showContactPopup, setShowContactPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        whatsapp: '',
        segment: ''
    });

    const handleContactFormChange = (field: string, value: string) => {
        setContactForm(prev => ({ ...prev, [field]: value }));
    };

    const handleContactSubmit = async () => {
        try {
            await saveContactForm(contactForm);
            setContactForm({ name: '', whatsapp: '', segment: '' });
            setShowContactPopup(false);
            setShowSuccessPopup(true);
        } catch (error) {
            console.error('Erro ao salvar contato:', error);
            alert('Erro ao enviar formulário. Tente novamente.');
        }
    };

    const demoProjects = [
        {
            icon: Stethoscope,
            title: "Clínica de Saúde",
            description: "Estrutura completa para clínicas que desejam automatizar agendamentos e reduzir ligações.",
            features: [
                "Agendamento automático",
                "Confirmação de consultas",
                "Lembretes automáticos",
                "Organização de pacientes"
            ],
            color: "blue"
        },
        {
            icon: Sparkles,
            title: "Clínica Estética",
            description: "Sistema preparado para captar, qualificar e agendar novos clientes automaticamente.",
            features: [
                "Qualificação de interessados",
                "Agendamento via WhatsApp",
                "Follow-up automático",
                "Cobrança via PIX"
            ],
            color: "pink"
        },
        {
            icon: Wrench,
            title: "Serviços Locais",
            description: "Ideal para empresas que recebem mensagens diariamente e querem organizar o atendimento.",
            features: [
                "Atendimento automático",
                "Organização de contatos",
                "Agendamentos",
                "CRM simples"
            ],
            color: "orange"
        }
    ];

    return (
        <section id="clientes" className="py-20 px-4 bg-gradient-to-b from-gray-900 via-gray-900 to-black relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>

            <div className="container mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Empresas que já automatizaram seu <br className="hidden md:block" />
                        atendimento com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">BotNeural</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                        Veja exemplos de negócios que já possuem estrutura digital pronta para crescer.
                    </p>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
                        Projetos em crescimento constante. Novos cases em breve.
                    </p>
                </div>

                {/* Block 1 - Real Client (Soropel) */}
                <div className="mb-24">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-12 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Image Side */}
                            <div className="order-2 lg:order-1 relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900 aspect-video">
                                    {/* Placeholder or Image - Using instructions to reference the image user sent */}
                                    {/* We will assume the image is saved as public/soropel-preview.png or use a placeholder if missing */}
                                    <img
                                        src="/soropel_final.png"
                                        alt="Preview Site Soropel"
                                        className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://placehold.co/800x450/1e293b/475569?text=Preview+Soropel'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                        <span className="text-white font-medium text-sm">Clique para visitar</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="order-1 lg:order-2">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold mb-6 tracking-wide uppercase">
                                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                                    Cliente Real
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-6">Soropel</h3>
                                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                                    Site profissional desenvolvido para fortalecer a presença digital e gerar novas oportunidades de contato.
                                </p>
                                <p className="text-gray-400 mb-8 font-light border-l-2 border-blue-500/30 pl-4 italic">
                                    "Estrutura online moderna pronta para crescimento e captação de clientes."
                                </p>

                                <a
                                    href="https://soropel.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:-translate-y-1"
                                >
                                    <span>Visitar site</span>
                                    <ExternalLink size={18} />
                                </a>

                                <p className="mt-8 text-xs text-gray-500 font-mono">
                                    &lt; Projeto real desenvolvido pela BotNeural /&gt;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Block 2 - Demo Projects */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Projetos demonstrativos por nicho
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Criamos estruturas prontas para mostrar como a automação funciona na prática em diferentes tipos de negócio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {demoProjects.map((project, index) => (
                            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group flex flex-col h-full hover:border-white/20">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${project.color === 'blue' ? 'from-blue-500/20 to-cyan-500/20 text-blue-400' :
                                    project.color === 'pink' ? 'from-pink-500/20 to-rose-500/20 text-pink-400' :
                                        'from-orange-500/20 to-yellow-500/20 text-orange-400'
                                    }`}>
                                    <project.icon size={28} />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-3">{project.title}</h4>
                                <p className="text-gray-400 mb-6 text-sm flex-grow">
                                    {project.description}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {project.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-gray-300 text-sm">
                                            <CheckCircle className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${project.color === 'blue' ? 'text-blue-400' :
                                                project.color === 'pink' ? 'text-pink-400' :
                                                    'text-orange-400'
                                                }`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => setShowContactPopup(true)} // Linking to contact for demo request
                                    className="w-full py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 group-hover:border-white/40 font-medium text-sm mt-auto"
                                >
                                    <span>Ver demonstração</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Section CTA */}
                <div className="bg-gradient-to-r from-blue-900/30 to-gray-900 border border-blue-500/20 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Sua empresa pode ser o próximo case de sucesso
                        </h3>
                        <p className="text-xl text-gray-300 mb-10">
                            Implantamos a estrutura completa do seu negócio e automatizamos seu atendimento para gerar mais vendas todos os dias.
                        </p>
                        <button
                            onClick={() => setShowContactPopup(true)}
                            className="inline-flex items-center space-x-3 bg-gradient-primary text-white px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 text-lg font-bold"
                        >
                            <Calendar className="w-6 h-6" />
                            <span>Agendar diagnóstico gratuito</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Reuse Contact Popup */}
            {showContactPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 border border-blue-500/30 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto backdrop-blur-md">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-white">Solicitar Demonstração</h3>
                                <button
                                    onClick={() => setShowContactPopup(false)}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                                    <input
                                        type="text"
                                        placeholder="Seu nome"
                                        value={contactForm.name}
                                        onChange={(e) => handleContactFormChange('name', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
                                    <input
                                        type="tel"
                                        placeholder="(11) 91231-2312"
                                        value={contactForm.whatsapp}
                                        onChange={(e) => handleContactFormChange('whatsapp', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Segmento</label>
                                    <input
                                        type="text"
                                        placeholder="Seu segmento"
                                        value={contactForm.segment}
                                        onChange={(e) => handleContactFormChange('segment', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                                    />
                                </div>

                                <button
                                    onClick={handleContactSubmit}
                                    disabled={!contactForm.name || !contactForm.whatsapp || !contactForm.segment}
                                    className="w-full py-4 bg-gradient-primary text-white rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    Ver demonstração
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <SuccessPopup
                isOpen={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                message="Solicitação enviada! Entraremos em contato com a demonstração."
            />
        </section>
    );
};

export default ClientsSection;
