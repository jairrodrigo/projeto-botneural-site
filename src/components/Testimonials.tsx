import React, { useState } from 'react';
import { Star, Quote, MessageCircle, Send } from 'lucide-react';

interface Testimonial {
  name: string;
  business: string;
  businessType: string;
  result: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Dr. Carlos Silva",
    business: "Clínica Silva",
    businessType: "Saúde",
    result: "50% menos agendamentos manuais",
    quote: "Automação transformou nosso atendimento. Pacientes agendam pelo WhatsApp 24h.",
    rating: 5
  },
  {
    name: "Maria Santos",
    business: "Boutique Elegance",
    businessType: "Moda",
    result: "3x mais vendas online",
    quote: "Site profissional mudou tudo. Recebo pedidos 24h e pagamento é prático.",
    rating: 5
  },
  {
    name: "João Oliveira",
    business: "Advocacia Oliveira",
    businessType: "Jurídico",
    result: "80% atendimento automatizado",
    quote: "Chatbot responde dúvidas e agenda consultas. Mais tempo para casos importantes.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [userBusiness, setUserBusiness] = useState('');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const renderInteractiveStars = (rating: number, hover: number, onRate: (rating: number) => void, onHover: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={24}
        className={`cursor-pointer transition-colors ${
          index < (hover || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-200'
        }`}
        onClick={() => onRate(index + 1)}
        onMouseEnter={() => onHover(index + 1)}
        onMouseLeave={() => onHover(0)}
      />
    ));
  };

  const handleSubmitReview = () => {
    if (userRating && reviewText && userName) {
      const message = `Olá! Quero deixar minha avaliação:\n\n⭐ Avaliação: ${userRating}/5 estrelas\n👤 Nome: ${userName}\n🏢 Empresa: ${userBusiness || 'Não informado'}\n💬 Comentário: ${reviewText}`;
      const whatsappUrl = `https://wa.me/5515988213309?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setUserRating(0);
      setReviewText('');
      setUserName('');
      setUserBusiness('');
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-jair-blue/5 rounded-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Casos de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Sucesso
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Veja como nossos clientes transformaram seus negócios com soluções digitais personalizadas
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                    {testimonial.businessType}
                  </span>
                </div>
                
                {/* Quote */}
                <p className="text-gray-300 text-sm mb-4 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                {/* Result */}
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-2 mb-4">
                  <p className="text-sm font-medium text-green-300">
                    📈 {testimonial.result}
                  </p>
                </div>
                
                {/* Author */}
                <div className="border-t border-white/20 pt-3">
                  <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-400">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Review Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                Avalie Nosso Trabalho
              </h3>
              <p className="text-gray-300">
                Sua opinião é importante!
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Seu nome *"
                />
                <input
                  type="text"
                  value={userBusiness}
                  onChange={(e) => setUserBusiness(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Empresa"
                />
              </div>

              <div className="flex justify-center mb-6">
                {renderInteractiveStars(userRating, hoverRating, setUserRating, setHoverRating)}
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent h-20 resize-none mb-6 backdrop-blur-sm"
                placeholder="Sua experiência... *"
              />

              <div className="text-center">
                <button
                  onClick={handleSubmitReview}
                  disabled={!userName || !reviewText || userRating === 0}
                  className="bg-gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center mx-auto gap-2 shadow-lg shadow-blue-500/25"
                >
                  <Send size={18} />
                  Enviar Avaliação
                </button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para ser o próximo{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                caso de sucesso?
              </span>
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Agende uma consulta gratuita e descubra como podemos transformar seu negócio com soluções digitais personalizadas.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://wa.me/5515988213309?text=Olá! Vi os casos de sucesso e quero agendar uma consulta gratuita para meu negócio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-primary text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 font-semibold text-lg"
              >
                <MessageCircle size={24} />
                <span>Agendar Consulta Gratuita</span>
              </a>
              
              <a
                href="https://wa.me/5515988213309?text=Olá! Quero saber mais sobre como vocês podem ajudar meu negócio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-blue-400 hover:text-white font-semibold text-lg"
              >
                <MessageCircle size={24} />
                <span>Fazer Pergunta</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;