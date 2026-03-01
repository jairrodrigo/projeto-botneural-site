import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ContactModal } from './ContactModal';

const InvestmentSection: React.FC = () => {
    const [showContactPopup, setShowContactPopup] = useState(false);

    return (
        <section id="investment" className="py-24 md:py-32 px-4 bg-black relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto max-w-4xl text-center relative z-10">
                <p className="text-blue-400 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6">Viabilidade</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight leading-tight">
                    Implantação personalizada
                </h2>

                <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-12 md:p-16 mb-12 shadow-2xl backdrop-blur-sm">
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6 font-light">
                        Toda empresa possui um fluxo operacional único.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        Por isso, conduzimos uma avaliação técnica da sua operação atual antes de desenhar e orçar o formato ideal de arquitetura para o seu momento.
                    </p>
                </div>

                <button
                    onClick={() => setShowContactPopup(true)}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-5 rounded-2xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:scale-105 shadow-[0_8px_30px_rgb(37,99,235,0.2)] text-lg font-semibold"
                >
                    <span>Solicitar Diagnóstico Estratégico</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            <ContactModal
                isOpen={showContactPopup}
                onClose={() => setShowContactPopup(false)}
                source="investment"
            />
        </section>
    );
};

export default InvestmentSection;
