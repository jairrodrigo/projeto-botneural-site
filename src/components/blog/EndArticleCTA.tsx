import React, { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { ContactModal } from '../ContactModal';

interface EndArticleCTAProps { }

const EndArticleCTA: React.FC<EndArticleCTAProps> = () => {
    const [showContactPopup, setShowContactPopup] = useState(false);

    return (
        <>
            <div className="my-12 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-black border border-white/20 rounded-2xl p-10 text-center backdrop-blur-sm">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                    Transforme seu WhatsApp em um vendedor 24h
                </h3>

                <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                    Pare de perder vendas por falta de atendimento. Automatize agora e comece a vender enquanto dorme.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => setShowContactPopup(true)}
                        className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full hover:opacity-90 hover:scale-105 transition-all font-semibold shadow-lg shadow-blue-500/25"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span>Solicitar diagnóstico gratuito</span>
                    </button>

                    <a
                        href="/#hero"
                        className="inline-flex items-center justify-center space-x-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all font-semibold"
                    >
                        <span>Ver como funciona</span>
                    </a>
                </div>
            </div>

            <ContactModal
                isOpen={showContactPopup}
                onClose={() => setShowContactPopup(false)}
                source="blog-article"
            />
        </>
    );
};

export default EndArticleCTA;
