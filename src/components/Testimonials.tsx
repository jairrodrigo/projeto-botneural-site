import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Dra. Amanda Costa",
      role: "Dentista",
      image: "/api/placeholder/80/80",
      text: "Depois da automação do Jair, não perco mais nenhum cliente de madrugada. O sistema responde por mim e ainda agenda consultas! Incrível como a IA consegue ser tão humanizada.",
      rating: 5
    },
    {
      name: "Carlos Silva",
      role: "Empresário",
      image: "/api/placeholder/80/80", 
      text: "Incrível como a IA consegue qualificar leads melhor que eu mesmo. Economizo 4 horas por dia com atendimento e as vendas aumentaram 40%. Investimento que se paga sozinho.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 bg-gray-900/50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              O que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Clientes Reais
              </span>{' '}
              Estão Dizendo
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Resultados que falam por si só. Empresários que transformaram seus negócios com automação inteligente.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-8 border border-jair-blue/20 relative">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-blue-400/30 absolute top-6 right-6" />
                
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-jair-blue/40 to-cyan-500/40 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-jair-blue/10 to-cyan-500/10 rounded-2xl p-8 border border-jair-blue/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Quer Ter Resultados Como Estes?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Agende uma consultoria gratuita e descubra como automatizar seu negócio pode transformar seus resultados.
              </p>
              <a
                href="https://wa.me/5515988213309"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-jair-blue/25 hover:shadow-jair-blue/40 hover:-translate-y-0.5"
              >
                <span className="text-lg font-semibold">Quero Resultados Assim Também</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
