export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    categoryId: string;
    featuredImage: string;
    imageAlt: string;
    author: string;
    publishedAt: string;
    readingTime: number;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    isDraft: boolean;
}

export const posts: BlogPost[] = [
    {
        id: '1',
        slug: 'como-automatizar-whatsapp-empresa',
        title: 'Como automatizar o WhatsApp da sua empresa',
        excerpt: 'Descubra como implementar automação de WhatsApp na sua empresa e transformar mensagens em vendas 24 horas por dia.',
        content: '', // Will be filled with actual content
        category: 'Automação de WhatsApp',
        categoryId: 'automacao-whatsapp',
        featuredImage: '/blog/whatsapp-automation.jpg',
        imageAlt: 'Automação de WhatsApp para empresas',
        author: 'BotNeural',
        publishedAt: '2026-02-15',
        readingTime: 8,
        metaTitle: 'Como Automatizar o WhatsApp da Sua Empresa | Guia Completo',
        metaDescription: 'Aprenda passo a passo como automatizar o WhatsApp da sua empresa, reduzir custos e aumentar vendas com automação inteligente.',
        keywords: ['automação de whatsapp', 'whatsapp business api', 'chatbot whatsapp', 'automação empresarial'],
        isDraft: true
    },
    {
        id: '2',
        slug: 'o-que-e-automacao-atendimento',
        title: 'O que é automação de atendimento e como funciona',
        excerpt: 'Entenda o que é automação de atendimento, como funciona na prática e por que sua empresa precisa disso agora.',
        content: '',
        category: 'Automação de Atendimento',
        categoryId: 'automacao-atendimento',
        featuredImage: '/blog/customer-service-automation.jpg',
        imageAlt: 'Automação de atendimento ao cliente',
        author: 'BotNeural',
        publishedAt: '2026-02-14',
        readingTime: 6,
        metaTitle: 'O que é Automação de Atendimento? Guia Completo 2026',
        metaDescription: 'Descubra o que é automação de atendimento, como funciona, benefícios e como implementar na sua empresa para melhorar resultados.',
        keywords: ['automação de atendimento', 'atendimento automático', 'chatbot', 'customer service'],
        isDraft: true
    },
    {
        id: '3',
        slug: 'responder-leads-rapido-aumenta-vendas',
        title: 'Por que responder leads rápido aumenta suas vendas',
        excerpt: 'Dados comprovam: empresas que respondem em até 5 minutos têm 100x mais chances de converter. Saiba como automatizar.',
        content: '',
        category: 'Vendas e Conversão',
        categoryId: 'vendas-conversao',
        featuredImage: '/blog/fast-response-sales.jpg',
        imageAlt: 'Velocidade de resposta aumenta vendas',
        author: 'BotNeural',
        publishedAt: '2026-02-13',
        readingTime: 5,
        metaTitle: 'Responder Leads Rápido Aumenta Vendas em 100x | Dados',
        metaDescription: 'Descubra por que a velocidade de resposta é crucial para vendas e como automatizar para responder leads instantaneamente.',
        keywords: ['conversão de leads', 'velocidade de resposta', 'vendas', 'automação comercial'],
        isDraft: true
    }
];
