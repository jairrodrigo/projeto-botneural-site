import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Save, ArrowLeft, Clock, Calendar, Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { agendaService, CalendarSettings } from '../../services/agendaService';
import toast from 'react-hot-toast';

const CalendarSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<CalendarSettings[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await agendaService.getCalendarSettings(false); // Fetch all days
            setSettings(data);
        } catch (error) {
            console.error(error);
            toast.error('Erro ao carregar configurações');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleDay = (id: string) => {
        setSettings(prev => prev.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s));
    };

    const handleChangeTime = (id: string, field: 'start_time' | 'end_time', value: string) => {
        // Ensure format is HH:mm:ss
        const formatted = value.length === 5 ? `${value}:00` : value;
        setSettings(prev => prev.map(s => s.id === id ? { ...s, [field]: formatted } : s));
    };

    const handleChangeDuration = (id: string, value: number) => {
        setSettings(prev => prev.map(s => s.id === id ? { ...s, slot_duration: value } : s));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await Promise.all(settings.map(s => agendaService.updateCalendarSettings(s)));
            toast.success('Configurações salvas!');
        } catch (error) {
            console.error(error);
            toast.error('Erro ao salvar algumas configurações');
        } finally {
            setSaving(false);
        }
    };

    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    // Sort settings to show Monday (1) to Sunday (0)
    const sortedSettings = [...settings].sort((a, b) => {
        const aVal = a.weekday === 0 ? 7 : a.weekday;
        const bVal = b.weekday === 0 ? 7 : b.weekday;
        return aVal - bVal;
    });

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/calendar" className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-all">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Configurar Janelas de Horário</h1>
                            <p className="text-slate-400 text-sm">Defina seus horários de atendimento recorrentes.</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                    >
                        {saving ? <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" /> : <Save size={20} />}
                        <span>Salvar Alterações</span>
                    </button>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-1 gap-4">
                    {sortedSettings.map((day) => (
                        <div
                            key={day.id}
                            className={`bg-slate-900/40 border transition-all rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 ${day.is_active ? 'border-blue-500/20 shadow-lg shadow-blue-500/5' : 'border-slate-800/50 opacity-60 grayscale'
                                }`}
                        >
                            {/* Day Selector */}
                            <div className="flex items-center gap-4 min-w-[180px]">
                                <button
                                    onClick={() => handleToggleDay(day.id)}
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${day.is_active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'bg-slate-800 text-slate-500'
                                        }`}
                                >
                                    {day.is_active ? <Check size={24} /> : <Calendar size={24} />}
                                </button>
                                <span className={`font-bold text-xl ${day.is_active ? 'text-white' : 'text-slate-500'}`}>
                                    {weekDays[day.weekday]}
                                </span>
                            </div>

                            {/* Range Inputs */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Início</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                        <input
                                            type="time"
                                            disabled={!day.is_active}
                                            value={day.start_time.substring(0, 5)}
                                            onChange={(e) => handleChangeTime(day.id, 'start_time', e.target.value)}
                                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-blue-500 transition-all disabled:opacity-30"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Término</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                        <input
                                            type="time"
                                            disabled={!day.is_active}
                                            value={day.end_time.substring(0, 5)}
                                            onChange={(e) => handleChangeTime(day.id, 'end_time', e.target.value)}
                                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-blue-500 transition-all disabled:opacity-30"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 lg:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Duração do Slot (Minutos)</label>
                                    <select
                                        disabled={!day.is_active}
                                        value={day.slot_duration}
                                        onChange={(e) => handleChangeDuration(day.id, Number(e.target.value))}
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all disabled:opacity-30 appearance-none cursor-pointer"
                                    >
                                        <option value={15}>15 Minutos</option>
                                        <option value={30}>30 Minutos</option>
                                        <option value={45}>45 Minutos</option>
                                        <option value={60}>1 Hora</option>
                                        <option value={90}>1 Hora e 30 Minutos</option>
                                        <option value={120}>2 Horas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Tip */}
                <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex gap-4 items-center">
                    <AlertCircle className="text-blue-400 shrink-0" size={24} />
                    <p className="text-sm text-blue-200/60 leading-relaxed">
                        Estas configurações definem as janelas que aparecem como "Disponíveis" no calendário.
                        Qualquer agendamento realizado fora destas janelas pela IA ou manualmente será aceito se não houver conflito,
                        mas as sugestões seguirão estas regras.
                    </p>
                </div>
            </div>

            <style>{`
                input[type="time"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    opacity: 0.5;
                }
            `}</style>
        </AdminLayout>
    );
};

export default CalendarSettingsPage;
