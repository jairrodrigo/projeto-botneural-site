import React, { useState } from 'react';
import { ExternalLink, Calendar, ArrowRight, Stethoscope, Sparkles, Wrench } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SuccessPopup } from '../components/SuccessPopup';
import { saveContactForm } from '../lib/supabase';
import { X } from 'lucide-react';

const Clients: React.FC = () => {
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
            features: [
                "Qualificação de leads",
                "Agendamento via WhatsApp",
                "Follow-up automático",
                "Cobrança via PIX"
            ],
            color: "pink"
        },
        {
            icon: Wrench,
            title: "Serviços Locais",
            features: [
                "Atendimento automático",
                "Organização de leads",
                "Agendamentos",
                "CRM simples"
            ],
            color: "orange"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-900/10 blur-3xl -z-10"></div>
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Projetos reais criados com a{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                BotNeural
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Conheça empresas que já possuem estrutura digital e automação prontas para crescer.
                        </p>
                    </div>
                </section>

                {/* Real Client Section - Soropel */}
                <section className="py-20 px-4 bg-white/5">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-2 shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500 border border-white/10">
                                    <div className="bg-black rounded-xl overflow-hidden aspect-video relative group">
                                        {/* Placeholder for Soropel Screenshot if available, or just a nice gradient/text */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500">
                                            <span className="text-2xl font-bold text-white opacity-20">Preview do Site</span>
                                        </div>
                                        {/* Ideally we would use an <img> here if we had the asset */}
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                                    Case de Sucesso
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Soropel</h2>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    Desenvolvimento de site profissional com estrutura digital pronta para geração de contatos e crescimento online.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://soropel.com.br"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold"
                                    >
                                        <span>Visitar site</span>
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                                <p className="mt-6 text-sm text-gray-400">
                                    Primeiro projeto entregue com a plataforma BotNeural.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Demo Projects Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Estruturas prontas para diversos nichos
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {demoProjects.map((project, index) => (
                                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group">
                                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${project.color === 'blue' ? 'from-blue-500/20 to-cyan-500/20 text-blue-400' :
                                            project.color === 'pink' ? 'from-pink-500/20 to-rose-500/20 text-pink-400' :
                                                'from-orange-500/20 to-yellow-500/20 text-orange-400'
                                        }`}>
                                        <project.icon size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-6">{project.title}</h3>
                                    <ul className="space-y-3 mb-8">
                                        {project.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-gray-300">
                                                <div className={`w-1.5 h-1.5 rounded-full mr-3 ${project.color === 'blue' ? 'bg-blue-400' :
                                                        project.color === 'pink' ? 'bg-pink-400' :
                                                            'bg-orange-400'
                                                    }`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className="w-full py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group-hover:border-white/40"
                                        onClick={() => setShowContactPopup(true)} // Or link to specific Demo if available, currently sticking to "Ver demonstração" logic -> Contact for now as no demo pages exist
                                    >
                                        <span>Ver demonstração</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Clients Page CTA */}
                <section className="py-20 px-4 bg-gradient-to-t from-blue-900/20 to-black text-center">
                    <div className="container mx-auto max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Quer ser o próximo case?
                        </h2>
                        <p className="text-xl text-gray-300 mb-10">
                            Implantamos a estrutura completa do seu negócio e automatizamos seu atendimento para gerar mais vendas.
                        </p>
                        <button
                            onClick={() => setShowContactPopup(true)}
                            className="inline-flex items-center space-x-3 bg-gradient-primary text-white px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 text-xl font-semibold"
                        >
                            <Calendar className="w-6 h-6" />
                            <span>Agendar diagnóstico gratuito</span>
                        </button>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Contact Popup */}
            {showContactPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 border border-blue-500/30 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto backdrop-blur-md">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-white">Agendar Diagnóstico</h3>
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
                                    Solicitar contato
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <SuccessPopup
                isOpen={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                message="Solicitação enviada com sucesso! Entraremos em contato em breve."
            />
        </div>
    );
};

export default Clients;
