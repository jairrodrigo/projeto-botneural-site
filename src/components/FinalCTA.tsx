import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ContactModal } from './ContactModal';

const FinalCTA: React.FC = () => {
    const [showContactPopup, setShowContactPopup] = useState(false);

    return (
        <section className="py-24 md:py-32 px-4 relative overflow-hidden bg-black">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-[100%] blur-[150px] opacity-70" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="bg-gradient-to-b from-blue-950/40 to-black border border-blue-500/20 rounded-[48px] p-12 md:p-20 text-center shadow-[0_0_50px_rgba(37,99,235,0.1)]">

                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-4 mb-10 opacity-60">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-500" />
                        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                        <div className="w-16 h-px bg-gradient-to-l from-transparent to-blue-500" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-[56px] font-bold text-white mb-8 leading-[1.1] tracking-tight">
                        Automação é o começo.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            Estrutura é escala.
                        </span>
                    </h2>

                    <p className="text-gray-400 text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                        Inicie o processo para organizar sua operação interativa com solidez técnica.
                    </p>

                    <button
                        onClick={() => setShowContactPopup(true)}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgb(37,99,235,0.25)]"
                    >
                        <span>Quero estruturar minha empresa</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <ContactModal
                isOpen={showContactPopup}
                onClose={() => setShowContactPopup(false)}
                source="final-cta"
            />
        </section>
    );
};

export default FinalCTA;
