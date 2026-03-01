import React, { useState } from 'react';
import { X, MessageCircle, ChevronDown } from 'lucide-react';
import { saveContactForm } from '../lib/supabase';
import { SuccessPopup } from './SuccessPopup';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    source?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, source = 'landing' }) => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        whatsapp: '',
        segment: '',
        service: ''
    });

    const handleContactFormChange = (field: string, value: string) => {
        setContactForm(prev => ({ ...prev, [field]: value }));
    };

    const handleContactSubmit = async () => {
        if (!contactForm.name || !contactForm.whatsapp || !contactForm.segment || !contactForm.service) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setIsSubmitting(true);
        try {
            // Enviar dados para o webhook do n8n
            await saveContactForm({
                name: contactForm.name,
                whatsapp: contactForm.whatsapp,
                segment: contactForm.segment,
                service: contactForm.service
            });

            // Limpar formulário e fechar modal
            setContactForm({ name: '', whatsapp: '', segment: '', service: '' });
            onClose();

            // Mostrar popup de sucesso
            setShowSuccessPopup(true);
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            alert('Erro ao enviar formulário. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // SuccessPopup is always rendered so it shows even after modal closes
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 sm:p-6"
                    onClick={onClose}
                >
                    <div
                        className="bg-gradient-to-br from-gray-900 via-blue-900/40 to-black border border-blue-500/30 rounded-3xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] max-w-md w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 sm:p-10">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="/botneural_logo.png"
                                        alt="BotNeural Logo"
                                        className="w-8 h-8 sm:w-10 sm:h-10"
                                    />
                                    <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                        Botneural
                                    </span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="space-y-5">
                                <div className="group">
                                    <label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 ml-1">Seu Nome</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: João Silva"
                                        value={contactForm.name}
                                        onChange={(e) => handleContactFormChange('name', e.target.value)}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-500 outline-none group-hover:bg-white/[0.07]"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 ml-1">WhatsApp</label>
                                    <input
                                        type="tel"
                                        placeholder="(00) 00000-0000"
                                        value={contactForm.whatsapp}
                                        onChange={(e) => handleContactFormChange('whatsapp', e.target.value)}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-500 outline-none group-hover:bg-white/[0.07]"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 ml-1">Segmento</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: E-commerce, Clínica..."
                                        value={contactForm.segment}
                                        onChange={(e) => handleContactFormChange('segment', e.target.value)}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-500 outline-none group-hover:bg-white/[0.07]"
                                    />
                                </div>

                                <div className="group relative">
                                    <label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 ml-1">Serviço de Interesse</label>
                                    <div className="relative">
                                        <select
                                            value={contactForm.service}
                                            onChange={(e) => handleContactFormChange('service', e.target.value)}
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white appearance-none outline-none group-hover:bg-white/[0.07] cursor-pointer"
                                        >
                                            <option value="" disabled className="bg-gray-900 text-gray-500">Selecione uma opção</option>
                                            <option value="Site/Sistema" className="bg-gray-900 text-white">Site/Sistema</option>
                                            <option value="Automação com IA WhatsApp" className="bg-gray-900 text-white">Automação com IA WhatsApp</option>
                                            <option value="Tráfego Pago" className="bg-gray-900 text-white">Tráfego Pago</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
                                            <ChevronDown size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="mt-10">
                                <button
                                    onClick={handleContactSubmit}
                                    disabled={isSubmitting || !contactForm.name || !contactForm.whatsapp || !contactForm.segment || !contactForm.service}
                                    className="w-full py-5 bg-gradient-primary text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] transition-all disabled:opacity-30 disabled:cursor-not-allowed transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <span>Enviando...</span>
                                    ) : (
                                        <>
                                            <MessageCircle size={22} />
                                            <span>Confirmar Agendamento</span>
                                        </>
                                    )}
                                </button>
                                <p className="text-gray-500 text-[10px] text-center mt-5 uppercase tracking-widest font-bold">
                                    Sua estrutura operacional começa aqui.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <SuccessPopup
                isOpen={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                message="Sua mensagem foi enviada com sucesso! Em breve entraremos em contato."
            />
        </>
    );
};
