// Schema.org structured data for SEO

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BotNeural",
    "url": "https://botneural.com",
    "logo": "https://botneural.com/botneural_logo.png",
    "description": "Especialistas em automação de WhatsApp para empresas. Transformamos atendimento manual em vendas automáticas 24/7.",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sorocaba",
        "addressRegion": "SP",
        "addressCountry": "BR"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "email": "contato@botneural.com.br",
        "availableLanguage": "Portuguese"
    },
    "sameAs": [
        "https://www.instagram.com/botneural.ia/"
    ]
};

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BotNeural",
    "image": "https://botneural.com/botneural_logo.png",
    "@id": "https://botneural.com",
    "url": "https://botneural.com",
    "telephone": "+55-15-99999-9999",
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sorocaba",
        "addressLocality": "Sorocaba",
        "addressRegion": "SP",
        "postalCode": "18000-000",
        "addressCountry": "BR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": -23.5015,
        "longitude": -47.4526
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
    }
};

export const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Automação de WhatsApp",
    "provider": {
        "@type": "Organization",
        "name": "BotNeural",
        "url": "https://botneural.com"
    },
    "areaServed": {
        "@type": "Country",
        "name": "Brasil"
    },
    "description": "Automação completa de atendimento, vendas e cobranças via WhatsApp com inteligência artificial. Resposta automática 24/7, qualificação de leads, agendamentos e integração com CRM.",
    "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "BRL"
    }
};

export const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://botneural.com/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Automação de WhatsApp",
            "item": "https://botneural.com/#services"
        }
    ]
};
