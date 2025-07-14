// Utilitários e funções auxiliares

export const formatPhoneNumber = (phone: string): string => {
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Formata para WhatsApp (55 + DDD + número)
  if (cleaned.length === 11) {
    return `55${cleaned}`;
  }
  
  return cleaned;
};

export const generateWhatsAppLink = (phone: string, message: string): string => {
  const formattedPhone = formatPhoneNumber(phone);
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
