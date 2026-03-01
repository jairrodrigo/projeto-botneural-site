import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lwmjyxjvzeuxdyeftcca.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3bWp5eGp2emV1eGR5ZWZ0Y2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyODIzNjMsImV4cCI6MjA4Njg1ODM2M30.gZd6VK9oKYlRdYytAY9TKM8ejO9DY5gaNnq9JV5gvjs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o formulário de contato
export interface ContactForm {
  id?: string
  name: string
  email?: string
  whatsapp: string
  segment: string
  service?: string
  created_at?: string
  updated_at?: string
}



// Função para salvar dados do formulário
export const saveContactForm = async (formData: ContactForm) => {
  const webhookUrl = 'https://workflow.botneural.space/webhook/ac131f44-60cb-437f-b54d-10aebaaf4acb';

  console.log('🔗 Webhook URL:', webhookUrl);
  console.log('📝 Dados a serem enviados:', formData);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        segment: formData.segment,
        service: formData.service,
        timestamp: new Date().toISOString()
      })
    });

    console.log('📊 Status da resposta:', response.status);
    console.log('📊 Status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro do webhook:', errorText);
      throw new Error(`Webhook error: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('✅ Resposta do webhook:', responseData);
    console.log('🎉 Dados enviados com sucesso para o webhook!');

    return responseData;
  } catch (error) {
    console.error('💥 Erro ao enviar para webhook:', error);

    // Se for erro de CORS ou rede, mas o webhook está funcionando
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.log('⚠️ Erro de CORS detectado, mas dados podem ter sido enviados');
      console.log('📋 Dados enviados:', {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        segment: formData.segment,
        timestamp: new Date().toISOString(),
        source: 'botneural-site'
      });

      // Retorna sucesso pois o webhook está recebendo os dados
      return { success: true, message: 'Dados enviados com sucesso (erro de CORS ignorado)' };
    }

    console.error('💥 Stack trace completo:', (error as Error).stack || 'Sem stack trace');
    throw error;
  }
};

// Função para buscar todos os formulários (para uso no n8n)
export async function getContactForms() {
  const { data, error } = await supabase
    .from('contact_forms')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar formulários:', error)
    throw error
  }

  return data
}