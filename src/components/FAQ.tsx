import React from 'react';

const FAQ: React.FC = () => {
    const faqs = [
        { q: "A IA entende qualquer áudio ou gíria?", a: "Sim, nossa IA processa áudio, texto e imagens, compreendendo o contexto mesmo com gírias e erros de digitação." },
        { q: "Preciso baixar algum app?", a: "Não. A automação funciona diretamente no seu número de WhatsApp sem necessidade de instalação para os clientes." },
        { q: "Posso intervir na conversa?", a: "Sempre. O sistema permite o transbordo humano para você assumir o controle a qualquer momento." }
    ];

    return (
        <section id="faq" className="py-20 px-4">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Perguntas Frequentes</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                            <p className="text-gray-400 text-sm">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
