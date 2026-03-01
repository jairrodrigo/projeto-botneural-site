
import { supabase } from '../lib/supabase';

export interface Agendamento {
    id: string;
    appointment_date: string;
    appointment_time: string;
    client_name: string;
    client_phone: string;
    description?: string;
    status: 'scheduled' | 'confirmed' | 'canceled' | 'completed';
    source: 'manual' | 'n8n' | 'whatsapp';
    created_by: 'admin' | 'ia';
    created_at: string;
}

export interface CalendarSettings {
    id: string;
    weekday: number;
    start_time: string;
    end_time: string;
    slot_duration: number;
    is_active: boolean;
}

export const getSaoPauloDate = () => {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date());
};

export const agendaService = {
    async getAgendamentos() {
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .order('appointment_date', { ascending: true })
            .order('appointment_time', { ascending: true });

        if (error) throw error;
        return data as Agendamento[];
    },

    async getAgendamentosHoje() {
        const hoje = getSaoPauloDate();
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .eq('appointment_date', hoje)
            .neq('status', 'canceled')
            .order('appointment_time', { ascending: true });

        if (error) throw error;
        return data as Agendamento[];
    },

    async getCalendarSettings(onlyActive = true) {
        let query = supabase
            .from('calendar_settings')
            .select('*')
            .order('weekday', { ascending: true });

        if (onlyActive) {
            query = query.eq('is_active', true);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data as CalendarSettings[];
    },

    async createAgendamento(agendamento: Omit<Agendamento, 'id' | 'created_at' | 'status'>) {
        const { data, error } = await supabase
            .from('appointments')
            .insert([{
                ...agendamento,
                status: 'scheduled'
            }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                throw new Error('Este horário já está ocupado.');
            }
            throw error;
        }
        return data;
    },

    subscribeToAgendamentos(callback: (payload: any) => void) {
        return supabase
            .channel('public:appointments')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, callback)
            .subscribe();
    },

    async updateCalendarSettings(setting: CalendarSettings) {
        const { data, error } = await supabase
            .from('calendar_settings')
            .update({
                start_time: setting.start_time,
                end_time: setting.end_time,
                slot_duration: setting.slot_duration,
                is_active: setting.is_active
            })
            .eq('id', setting.id)
            .select()
            .single();

        if (error) throw error;
        return data as CalendarSettings;
    }
};
