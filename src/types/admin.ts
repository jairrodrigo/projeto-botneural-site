
export interface Lead {
  id: string;
  name: string;
  phone?: string;
  whatsapp?: string; // Mantido para compatibilidade, será mapeado do phone
  email?: string;
  origin?: string;
  status: string;
  tags?: string[];
  notes?: string;
  etapa?: string; // Stage do Kanban (tabela deals)
  created_at: string;
  updated_at?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  featured_image?: string;
  image_alt?: string;
  author: string;
  published_at?: string;
  reading_time?: number;
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
  is_draft: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  leadsThisMonth: number;
  publishedPosts: number;
  draftPosts: number;
}

export interface LeadsChartData {
  month: string;
  count: number;
}

export const STATUS_LABELS: Record<string, string> = {
  novo: 'Novo Lead',
  em_contato: 'Em Contato',
  qualificado: 'Qualificado',
  proposta: 'Proposta Enviada',
  cliente: 'Cliente',
  ia_ativa: 'IA Ativa',
  escalado_humano: 'Humano',
  aguardando_pagamento: 'Aguardando Pagamento',
  pagamento_confirmado: 'Pago'
};

export const ORIGIN_LABELS: Record<string, string> = {
  landing: 'Landing Page',
  blog: 'Blog',
  contact: 'Contato'
};

export const STATUS_COLORS: Record<string, string> = {
  novo: 'blue',
  em_contato: 'yellow',
  qualificado: 'purple',
  proposta: 'orange',
  cliente: 'green',
  ia_ativa: 'blue',
  escalado_humano: 'emerald'
};

export interface Conversation {
  id: string;
  lead_id: string;
  status: 'ia_ativa' | 'aguardando_pagamento' | 'pagamento_confirmado' | 'escalado_humano';
  last_message?: string;
  created_at: string;
  updated_at: string;
  lead?: Lead;
}

export interface Message {
  id: string;
  conversa_id?: string;
  conversation_id?: string;
  autor?: 'lead' | 'ia' | 'bot' | 'humano' | 'agent';
  sender_type?: 'lead' | 'bot' | 'agent';
  tipo?: 'texto' | 'audio' | 'image' | 'imagem' | 'file' | 'arquivo';
  content_type?: 'text' | 'audio' | 'image' | 'file';
  conteudo?: string;
  content?: string;
  metadata?: any;
  created_at: string;
}

export const CONVERSATION_STATUS_LABELS: Record<Conversation['status'], string> = {
  ia_ativa: '🤖 IA Ativa',
  aguardando_pagamento: '⏳ Aguardando Pagamento',
  pagamento_confirmado: '✅ Pagamento Confirmado',
  escalado_humano: '👨‍💻 Escalado Humano'
};
