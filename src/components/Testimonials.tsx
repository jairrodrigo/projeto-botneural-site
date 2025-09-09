import React, { useState } from 'react';
import { Star, Quote, MessageCircle, Send, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [userBusiness, setUserBusiness] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    segment: ''
  });

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
      const message = `Olá! Queremos deixar nossa avaliação:\n\n⭐ Avaliação: ${userRating}/5 estrelas\n👤 Nome: ${userName}\n🏢 Empresa: ${userBusiness || 'Não informado'}\n💬 Comentário: ${reviewText}`;
      const whatsappUrl = `https://wa.me/5515988213309?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      // Reset form and hide it
      setUserRating(0);
      setHoverRating(0);
      setReviewText('');
      setUserName('');
      setUserBusiness('');
      setShowReviewForm(false);
    }
  };

  const handleContactFormChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleContactSubmit = () => {
    // Reset form and close popup
    setContactForm({ name: '', email: '', whatsapp: '', segment: '' });
    setShowContactPopup(false);
    
    // Show success message or handle form submission as needed
    alert('Obrigado! Entraremos em contato em breve.');
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-jair-blue/5 rounded-2xl p-6 sm:p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Casos de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Sucesso
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Veja como nossos clientes transformaram seus negócios com soluções digitais personalizadas
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative mb-8 sm:mb-12">
            <div className="flex items-center justify-center">
              {/* Previous Button */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 z-10 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-blue-400" />
              </button>

              {/* Testimonial Card */}
              <div className="max-w-2xl mx-auto px-12">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-1">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                      {testimonials[currentTestimonial].businessType}
                    </span>
                  </div>
                  
                  {/* Quote */}
                  <p className="text-gray-300 text-lg mb-6 italic leading-relaxed text-center">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  
                  {/* Result */}
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-3 mb-6 text-center">
                    <p className="text-base font-medium text-green-300">
                      📈 {testimonials[currentTestimonial].result}
                    </p>
                  </div>
                  
                  {/* Author */}
                  <div className="border-t border-white/20 pt-4 text-center">
                    <h4 className="font-semibold text-white text-lg">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-sm text-gray-400">{testimonials[currentTestimonial].business}</p>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextTestimonial}
                className="absolute right-0 z-10 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-blue-400" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-blue-400 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Review Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                Avalie Nosso Trabalho
              </h3>
              <p className="text-gray-300">
                Sua opinião é importante!
              </p>
            </div>

            {!showReviewForm ? (
              <div className="text-center">
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto gap-2 shadow-lg shadow-blue-500/25"
                >
                  <Star size={18} />
                  Avaliar
                </button>
              </div>
            ) : (
              <div className="max-w-lg mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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

                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <button
                    onClick={() => {
                      setShowReviewForm(false);
                      setUserRating(0);
                      setHoverRating(0);
                      setReviewText('');
                      setUserName('');
                      setUserBusiness('');
                    }}
                    className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    disabled={!userName || !reviewText || userRating === 0}
                    className="bg-gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                  >
                    <Send size={18} />
                    Enviar Avaliação
                  </button>
                </div>
              </div>
            )}
          </div>


        </div>
        </div>

        {/* Contact Popup Modal */}
        {showContactPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Chame no Whatsapp</h3>
                  <button
                    onClick={() => setShowContactPopup(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={contactForm.name}
                      onChange={(e) => handleContactFormChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Seu melhor email"
                      value={contactForm.email}
                      onChange={(e) => handleContactFormChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="(11) 91231-2312"
                      value={contactForm.whatsapp}
                      onChange={(e) => handleContactFormChange('whatsapp', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Segmento</label>
                    <input
                      type="text"
                      placeholder="Segmento do seu negócio"
                      value={contactForm.segment}
                      onChange={(e) => handleContactFormChange('segment', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => setShowContactPopup(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleContactSubmit}
                    disabled={!contactForm.name || !contactForm.email || !contactForm.whatsapp || !contactForm.segment}
                    className="flex-1 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
};

export default Testimonials;