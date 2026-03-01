import React from 'react';
import {
    MessageSquare,
    Users,
    Calendar,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    Clock,
    CheckCircle,
    Brain,
    Bot
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Dashboard: React.FC = () => {
    const { stats, loading } = useDashboardStats();

    const metrics = [
        {
            title: 'Conversas Ativas',
            value: stats.activeConvs,
            change: '+12%',
            trend: 'up',
            icon: MessageSquare,
            color: 'from-blue-500 to-cyan-400',
            bg: 'bg-blue-500/10'
        },
        {
            title: 'Novos Leads (Mês)',
            value: stats.newLeads,
            change: '+25%',
            trend: 'up',
            icon: Users,
            color: 'from-emerald-500 to-green-400',
            bg: 'bg-emerald-500/10'
        },
        {
            title: 'Agendamentos',
            value: stats.appointments,
            change: '-2%',
            trend: 'down',
            icon: Calendar,
            color: 'from-purple-500 to-pink-400',
            bg: 'bg-purple-500/10'
        },
        {
            title: 'Pagamentos Pendentes',
            value: stats.pendingPayments,
            change: '+5%',
            trend: 'up',
            icon: DollarSign,
            color: 'from-amber-500 to-orange-400',
            bg: 'bg-amber-500/10'
        }
    ];

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="text-slate-400 font-medium">Carregando métricas...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-10">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Resumo Operacional</h1>
                        <p className="text-slate-400">
                            Bem-vindo de volta! Aqui está o desempenho da BotNeural hoje, {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center gap-2">
                            <Clock size={16} className="text-slate-400" />
                            <span className="text-sm text-slate-300 font-medium">Última atualização: Agora</span>
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-6 hover:border-slate-700/50 transition-all group relative overflow-hidden"
                        >
                            {/* Decorative background glow */}
                            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 bg-gradient-to-br ${metric.color}`}></div>

                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-2xl ${metric.bg} border border-white/5`}>
                                    <metric.icon className={`w-6 h-6 bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`} style={{ stroke: 'url(#gradient-' + index + ')' }} />
                                    {/* SVG Defs for linear gradient icon (simplified version: using text-transparent class often doesn't work well on lucide stroke, so we use solid color from index) */}
                                    <svg width="0" height="0" className="absolute">
                                        <defs>
                                            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" className="text-blue-500" stopColor="currentColor" />
                                                <stop offset="100%" className="text-cyan-400" stopColor="currentColor" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${metric.trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                                    }`}>
                                    {metric.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {metric.change}
                                </div>
                            </div>

                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-1">{metric.title}</p>
                                <h3 className="text-3xl font-bold text-white tracking-tight">{metric.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Secondary Section: AI Insights & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* AI Insights Card */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-blue-600/10 to-indigo-600/5 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <Brain size={120} className="text-blue-400" />
                        </div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                                <Bot size={14} />
                                <span>IA Insights</span>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-4">Desempenho da Automação</h2>
                            <p className="text-blue-100/70 max-w-xl mb-8 leading-relaxed">
                                Sua inteligência artificial qualificou **14 novos leads** nas últimas 24 horas sem intervenção humana.
                                A taxa de conversão para agendamento aumentou em **8.4%** comparado à semana anterior.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 group">
                                    <span>Ver logs da IA</span>
                                    <TrendingUp size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all">
                                    Otimizar fluxos
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions / Recent Activity */}
                    <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-6">Ações Rápidas</h3>
                        <div className="space-y-3 flex-grow">
                            <button className="w-full flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/30 rounded-2xl transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <Users size={18} className="text-emerald-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-200">Novo Lead Manual</span>
                                </div>
                                <ArrowUpRight size={16} className="text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>

                            <button className="w-full flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/30 rounded-2xl transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Calendar size={18} className="text-blue-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-200">Criar Agendamento</span>
                                </div>
                                <ArrowUpRight size={16} className="text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>

                            <button className="w-full flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/30 rounded-2xl transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/10 rounded-lg">
                                        <DollarSign size={18} className="text-purple-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-200">Emitir Cobrança</span>
                                </div>
                                <ArrowUpRight size={16} className="text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800/50">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>Status do Servidor</span>
                                <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-widest">
                                    <CheckCircle size={10} />
                                    <span>Operacional</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
