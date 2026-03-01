
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useDashboardStats = () => {
    const [stats, setStats] = useState({
        activeConvs: 0,
        newLeads: 0,
        appointments: 0,
        pendingPayments: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            // Active Conversations (status not closed/archived, assuming 'ia_ativa' or 'humano' are active)
            const { count: activeConvs } = await supabase
                .from('conversations')
                .select('*', { count: 'exact', head: true })
                .in('status', ['ia_ativa', 'escalado_humano']);

            // New Leads (this month)
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);

            const { count: newLeads } = await supabase
                .from('contacts')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', startOfMonth.toISOString());

            // Appointments (scheduled)
            const { count: appointments } = await supabase
                .from('appointments')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'scheduled');

            // Pending Payments
            const { count: pendingPayments } = await supabase
                .from('payments')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending');

            setStats({
                activeConvs: activeConvs || 0,
                newLeads: newLeads || 0,
                appointments: appointments || 0,
                pendingPayments: pendingPayments || 0
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();

        // Subscribe to changes (optional, for realtime dashboard)
        const subscription = supabase
            .channel('dashboard_stats')
            .on('postgres_changes', { event: '*', schema: 'public' }, () => {
                fetchStats();
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { stats, loading };
};
