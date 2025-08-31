import React from 'react';
import { Mail, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="py-12 px-4 border-t border-jair-blue/20 bg-black/95 backdrop-blur-sm relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="text-2xl font-bold text-white mb-4 overflow-visible">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 inline-block">Jair</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 inline-block">.cloud</span>
            </div>
            <p className="text-gray-400 mb-6">
              Desenvolvimento de sites inteligentes e automações com IA para transformar seu negócio.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/jair.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-jair-blue/10 rounded-full flex items-center justify-center hover:bg-jair-blue/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="https://wa.me/5515988213309"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-jair-blue/10 rounded-full flex items-center justify-center hover:bg-jair-blue/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="mailto:jairautomacoes@gmail.com"
                className="w-10 h-10 bg-jair-blue/10 rounded-full flex items-center justify-center hover:bg-jair-blue/20 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('hero');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('faq');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('contact-section');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <div className="space-y-2 text-gray-400">
              <p>Entre em contato através dos canais disponíveis na seção de contato acima.</p>
              <p>Resposta rápida garantida em até 24 horas.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-jair-blue/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Jair.cloud. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;