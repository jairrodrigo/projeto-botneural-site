
import { supabase } from '../lib/supabase';

export const pipelineService = {
    async getLeads() {
        const { data, error } = await supabase
            .from('deals')
            .select(`
                *,
                contacts (
                    name,
                    phone
                )
            `)
            .order('updated_at', { ascending: false });

        if (error) throw error;


        // Map to match frontend expectations
        return data.map((deal: any) => ({
            id: deal.id,
            name: deal.contacts?.name || 'Lead sem nome', // Mapeando para name (interface Lead)
            nome: deal.contacts?.name || 'Lead sem nome', // Manter compatibilidade se necessário
            phone: deal.contacts?.phone,
            whatsapp: deal.contacts?.phone, // Alias
            email: deal.contacts?.email,
            origin: deal.contacts?.origin,
            etapa: deal.stage,
            valor: deal.value,
            created_at: deal.contacts?.created_at, // Kanban usa data do contato ou do deal? Geralmente contato.
            updated_at: deal.updated_at
        }));
    },

    async updateLeadStatus(dealId: string, etapa: string) {
        const { data, error } = await supabase
            .from('deals')
            .update({
                stage: etapa,
                updated_at: new Date().toISOString()
            })
            .eq('id', dealId)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    subscribeToLeads(callback: (payload: any) => void) {
        return supabase
            .channel('public:deals')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'deals' }, callback)
            .subscribe();
    }
};
