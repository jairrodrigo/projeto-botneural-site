export interface Category {
    id: string;
    name: string;
    slug: string;
    color: 'blue' | 'green' | 'purple' | 'cyan';
}

export const categories: Category[] = [
    {
        id: 'automacao-whatsapp',
        name: 'Automação de WhatsApp',
        slug: 'automacao-whatsapp',
        color: 'blue'
    },
    {
        id: 'automacao-atendimento',
        name: 'Automação de Atendimento',
        slug: 'automacao-atendimento',
        color: 'green'
    },
    {
        id: 'vendas-conversao',
        name: 'Vendas e Conversão',
        slug: 'vendas-conversao',
        color: 'purple'
    },
    {
        id: 'ia-negocios',
        name: 'Inteligência Artificial para Negócios',
        slug: 'ia-negocios',
        color: 'cyan'
    }
];
