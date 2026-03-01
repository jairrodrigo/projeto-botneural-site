import React from 'react';
import { Calendar } from 'lucide-react';

interface MidArticleCTAProps { }

const MidArticleCTA: React.FC<MidArticleCTAProps> = () => {
    return (
        <div className="my-12 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
                Quer automatizar seu atendimento?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Agende um diagnóstico gratuito e descubra como a automação pode transformar seu WhatsApp em uma máquina de vendas.
            </p>
            <a
                href="/#hero"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full hover:opacity-90 transition-all font-semibold shadow-lg shadow-blue-500/25"
            >
                <Calendar className="w-5 h-5" />
                <span>Agendar diagnóstico gratuito</span>
            </a>
        </div>
    );
};

export default MidArticleCTA;
