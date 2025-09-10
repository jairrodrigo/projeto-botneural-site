import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({ 
  isOpen, 
  onClose, 
  message = "Mensagem enviada com sucesso!" 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 backdrop-blur-md border border-blue-500/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
            <CheckCircle className="w-8 h-8 text-blue-400" />
          </div>
          
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Sucesso!</span>
          </h3>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            {message}
          </p>
          
          <button
            onClick={onClose}
            className="w-full bg-gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25"
          >
            Entendi
          </button>
        </div>
        
        {/* Decorative elements matching site style */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20"></div>
      </div>
    </div>
  );
};

export default SuccessPopup;