
import { supabase } from '../lib/supabase';

export const financeService = {
    async getTransactions() {
        const { data, error } = await supabase
            .from('payments')
            .select(`
                *,
                contacts (
                    name
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map((t: any) => ({
            id: t.id,
            customer: t.contacts?.name || t.description || 'Cliente Desconhecido',
            amount: t.amount,
            status: t.status === 'paid' ? 'pago' : 'pendente',
            date: t.paid_at ? new Date(t.paid_at).toLocaleDateString() : t.created_at ? new Date(t.created_at).toLocaleDateString() : '',
            method: 'N/A' // Not in schema yet
        }));
    },

    subscribeToTransactions(callback: (payload: any) => void) {
        return supabase
            .channel('public:payments')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'payments' }, callback)
            .subscribe();
    }
};
