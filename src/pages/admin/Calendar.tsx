import React, { useEffect, useState, useMemo, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Clock, Plus, User, X, Check, Calendar as CalendarIcon, Filter, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { agendaService, Agendamento, CalendarSettings, getSaoPauloDate } from '../../services/agendaService';
import toast from 'react-hot-toast';

// FullCalendar Imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

const CalendarPage: React.FC = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [appointments, setAppointments] = useState<Agendamento[]>([]);
    const [todayAppointments, setTodayAppointments] = useState<Agendamento[]>([]);
    const [settings, setSettings] = useState<CalendarSettings[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newApt, setNewApt] = useState({
        client_name: '',
        client_phone: '',
        appointment_date: getSaoPauloDate(),
        appointment_time: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
        const sub = agendaService.subscribeToAgendamentos(() => {
            loadAgendamentos();
        });
        return () => { sub.unsubscribe(); };
    }, []);

    const loadData = async () => {
        try {
            const [all, today, calendarSettings] = await Promise.all([
                agendaService.getAgendamentos(),
                agendaService.getAgendamentosHoje(),
                agendaService.getCalendarSettings()
            ]);
            setAppointments(all || []);
            setTodayAppointments(today || []);
            setSettings(calendarSettings || []);
        } catch (error) {
            console.error(error);
            toast.error('Erro ao carregar dados da agenda');
        } finally {
            setLoading(false);
        }
    };

    const loadAgendamentos = async () => {
        try {
            const [all, today] = await Promise.all([
                agendaService.getAgendamentos(),
                agendaService.getAgendamentosHoje()
            ]);
            setAppointments(all || []);
            setTodayAppointments(today || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateApt = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newApt.appointment_time) {
            toast.error('Selecione um horário');
            return;
        }

        try {
            await agendaService.createAgendamento({
                ...newApt,
                source: 'manual',
                created_by: 'admin'
            });
            toast.success('Agendamento criado!');
            setIsModalOpen(false);
            setNewApt({
                client_name: '',
                client_phone: '',
                appointment_date: getSaoPauloDate(),
                appointment_time: '',
                description: ''
            });
            loadAgendamentos();
        } catch (error) {
            const err = error as Error;
            console.error(err);
            toast.error(err.message || 'Erro ao criar agendamento');
        }
    };

    const handleDateClick = (arg: DateClickArg) => {
        const dateStr = arg.dateStr;
        if (dateStr.includes('T')) {
            const [date, time] = dateStr.split('T');
            setNewApt(prev => ({
                ...prev,
                appointment_date: date,
                appointment_time: time.substring(0, 8) // HH:mm:ss
            }));
        } else {
            setNewApt(prev => ({
                ...prev,
                appointment_date: dateStr,
                appointment_time: ''
            }));
        }
        setIsModalOpen(true);
    };

    const events = useMemo(() => {
        return appointments.map(apt => ({
            id: apt.id,
            title: apt.client_name,
            start: `${apt.appointment_date}T${apt.appointment_time}`,
            backgroundColor: apt.status === 'confirmed' ? '#10b981' : apt.status === 'canceled' ? '#ef4444' : '#3b82f6',
            borderColor: 'transparent',
            extendedProps: { ...apt }
        }));
    }, [appointments]);

    // Gera slots baseados na data selecionada e settings
    const availableSlots = useMemo(() => {
        if (!newApt.appointment_date) return [];

        const dateObj = new Date(newApt.appointment_date + 'T00:00:00');
        const weekday = dateObj.getDay();
        const daySetting = settings.find(s => s.weekday === weekday);

        if (!daySetting || !daySetting.is_active) return [];

        const slots = [];
        let current = daySetting.start_time;
        const end = daySetting.end_time;

        while (current < end) {
            slots.push(current);
            const [h, m] = current.split(':').map(Number);
            const totalMin = h * 60 + m + daySetting.slot_duration;
            const nextH = Math.floor(totalMin / 60);
            const nextM = totalMin % 60;
            current = `${String(nextH).padStart(2, '0')}:${String(nextM).padStart(2, '0')}:00`;
        }
        return slots;
    }, [newApt.appointment_date, settings]);

    const finalSlots = useMemo(() => {
        const occupied = appointments
            .filter(a => a.appointment_date === newApt.appointment_date && a.status !== 'canceled')
            .map(a => a.appointment_time);

        return availableSlots.map(slot => ({
            time: slot,
            isOccupied: occupied.includes(slot)
        }));
    }, [availableSlots, appointments, newApt.appointment_date]);

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                            Agenda Business
                        </h1>
                        <p className="text-gray-400">Total de {appointments.length} agendamentos registrados.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            to="/admin/calendar/settings"
                            className="bg-slate-800 text-slate-300 py-3 px-6 rounded-xl hover:bg-slate-700 transition-all border border-slate-700/50 flex items-center gap-2 font-bold"
                        >
                            <Settings size={20} />
                            <span className="hidden md:inline">Configurar Horários</span>
                        </Link>
                        <button className="bg-slate-800 text-slate-300 p-3 rounded-xl hover:bg-slate-700 transition-all border border-slate-700/50">
                            <Filter size={20} />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                        >
                            <Plus size={20} />
                            <span>Novo Agendamento</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* FullCalendar Component */}
                    <div className="lg:col-span-3 bg-slate-900/40 border border-slate-800/50 rounded-3xl p-6 shadow-2xl overflow-hidden">
                        <div className="calendar-container h-[700px]">
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="timeGridWeek"
                                firstDay={1}
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                }}
                                events={events}
                                dateClick={handleDateClick}
                                editable={true}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                weekends={true}
                                locale="pt-br"
                                slotMinTime="06:00:00"
                                slotMaxTime="22:00:00"
                                allDaySlot={false}
                                height="100%"
                                themeSystem="standard"
                                slotLabelFormat={{
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                }}
                                eventTimeFormat={{
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                }}
                                buttonText={{
                                    today: 'Hoje',
                                    month: 'Mês',
                                    week: 'Semana',
                                    day: 'Dia'
                                }}
                            />
                        </div>
                    </div>

                    {/* Sidebar: Upcoming & Info */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-6 h-full">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Clock className="text-blue-400" size={20} />
                                Próximos Hoje
                            </h3>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {todayAppointments.map((apt) => (
                                    <div key={apt.id} className="p-4 bg-slate-800/40 border border-slate-700/30 rounded-2xl hover:bg-slate-800/60 transition-all group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-blue-400">{apt.appointment_time.substring(0, 5)}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${apt.status === 'confirmed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                                apt.status === 'canceled' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                                                    'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                                }`}>
                                                {apt.status === 'scheduled' ? 'Agendado' : apt.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors truncate">{apt.client_name}</h4>
                                        <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                                            {apt.source === 'n8n' ? <User size={12} className="text-blue-400" /> : <User size={12} />}
                                            <span>{apt.source === 'n8n' ? 'Via IA' : 'Manual'}</span>
                                        </div>
                                    </div>
                                ))}
                                {todayAppointments.length === 0 && !loading && (
                                    <div className="text-center py-10 opacity-30">
                                        <CalendarIcon className="mx-auto mb-2" size={32} />
                                        <p className="text-sm italic">Vazio por hoje.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Agendamento Profissional */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white">Criar Agendamento</h3>
                                <p className="text-sm text-slate-500 mt-1">Configure os detalhes do novo compromisso.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateApt} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Cliente</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="text"
                                                placeholder="Nome completo"
                                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
                                                value={newApt.client_name}
                                                onChange={e => setNewApt({ ...newApt, client_name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Contato WhatsApp</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Ex: 5511999998888"
                                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
                                            value={newApt.client_phone}
                                            onChange={e => setNewApt({ ...newApt, client_phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Data do Atendimento</label>
                                        <input
                                            required
                                            type="date"
                                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all"
                                            value={newApt.appointment_date}
                                            onChange={e => setNewApt({ ...newApt, appointment_date: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Seleção de Horário (SP)</label>
                                    <div className="grid grid-cols-3 gap-2 h-[260px] overflow-y-auto pr-2 custom-scrollbar p-1">
                                        {finalSlots.map((slot, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                disabled={slot.isOccupied}
                                                onClick={() => setNewApt({ ...newApt, appointment_time: slot.time })}
                                                className={`py-3 rounded-xl text-xs font-bold transition-all border flex flex-col items-center justify-center gap-1 ${newApt.appointment_time === slot.time
                                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                                                    : slot.isOccupied
                                                        ? 'bg-slate-800/20 border-slate-800/50 text-slate-700 cursor-not-allowed'
                                                        : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-blue-500 hover:bg-slate-800'
                                                    }`}
                                            >
                                                <span>{slot.time.substring(0, 5)}</span>
                                                {newApt.appointment_time === slot.time && <Check size={10} />}
                                                {slot.isOccupied && <span className="text-[8px] uppercase">Ocupado</span>}
                                            </button>
                                        ))}
                                        {finalSlots.length === 0 && (
                                            <div className="col-span-3 text-center py-20 text-slate-600 text-[10px] italic">Selecione uma data de atendimento válida</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={!newApt.appointment_time}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.01] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirmar e Notificar Cliente
                                </button>
                                <p className="text-[10px] text-center text-slate-500 mt-4">Ao confirmar, o agendamento será salvo permanentemente no Supabase e sincronizado com a IA.</p>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .fc { --fc-border-color: rgba(255,255,255,0.05); --fc-page-bg-color: transparent; }
                .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: 800; color: white; }
                .fc .fc-button { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-weight: 700; text-transform: capitalize; padding: 0.5rem 1rem; border-radius: 0.75rem; transition: all 0.2s; }
                .fc .fc-button:hover { background: rgba(255,255,255,0.1); color: white; }
                .fc .fc-button-primary:not(:disabled).fc-button-active { background: #2563eb; border-color: #3b82f6; color: white; }
                .fc .fc-col-header-cell { padding: 1rem 0; background: rgba(255,255,255,0.02); }
                .fc .fc-col-header-cell-cushion { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
                .fc .fc-timegrid-slot { height: 3rem !important; border-bottom: 1px solid rgba(255,255,255,0.03) !important; }
                .fc .fc-timegrid-slot-label-cushion { color: #475569; font-size: 0.7rem; font-weight: 600; }
                .fc .fc-event { border-radius: 6px; padding: 2px 4px; font-size: 0.75rem; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); cursor: pointer; }
                .fc .fc-daygrid-day-number { color: #94a3b8; font-weight: 700; padding: 8px; }
                .fc .fc-day-today { background: rgba(59,130,246,0.05) !important; }
                
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            `}</style>
        </AdminLayout>
    );
};

export default CalendarPage;
