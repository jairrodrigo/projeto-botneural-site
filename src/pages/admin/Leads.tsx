import React, { useEffect, useState } from 'react';
import { Search, Trash2, Phone, Mail } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Lead, STATUS_LABELS, ORIGIN_LABELS } from '../../types/admin';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Leads: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOrigin, setFilterOrigin] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    useEffect(() => {
        fetchLeads();
    }, []);

    useEffect(() => {
        filterLeads();
    }, [leads, searchTerm, filterOrigin, filterStatus]);

    const fetchLeads = async () => {

        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (error) {
            console.error('Error fetching leads:', error);
            toast.error('Erro ao carregar leads');
        } finally {
            setLoading(false);
        }
    };

    const filterLeads = () => {
        let filtered = [...leads];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(lead =>
                lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Origin filter
        if (filterOrigin !== 'all') {
            filtered = filtered.filter(lead => lead.origin === filterOrigin);
        }

        // Status filter
        if (filterStatus !== 'all') {
            filtered = filtered.filter(lead => lead.status === filterStatus);
        }

        setFilteredLeads(filtered);
    };

    const deleteLead = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este lead?')) return;

        try {
            const { error } = await supabase
                .from('contacts')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast.success('Lead excluído com sucesso');
            fetchLeads();
        } catch (error) {
            console.error('Error deleting lead:', error);
            toast.error('Erro ao excluir lead');
        }
    };

    const getStatusBadgeColor = (status: string) => {
        const colors: Record<string, string> = {
            novo: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            em_contato: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            qualificado: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            proposta: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            cliente: 'bg-green-500/20 text-green-400 border-green-500/30'
        };
        return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    const getOriginBadgeColor = (origin: string | undefined) => {
        if (!origin) return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        const colors: Record<string, string> = {
            landing: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            blog: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
            contact: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
        };
        return colors[origin] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-400">Carregando...</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Toaster position="top-right" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Leads</h1>
                    <p className="text-gray-400">Gerencie todos os leads capturados</p>
                </div>

                {/* Filters */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Origin Filter */}
                        <select
                            value={filterOrigin}
                            onChange={(e) => setFilterOrigin(e.target.value)}
                            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="all">Todas as origens</option>
                            <option value="landing">Landing Page</option>
                            <option value="blog">Blog</option>
                            <option value="contact">Contato</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="all">Todos os status</option>
                            <option value="novo">Novo Lead</option>
                            <option value="em_contato">Em Contato</option>
                            <option value="qualificado">Qualificado</option>
                            <option value="proposta">Proposta Enviada</option>
                            <option value="cliente">Cliente</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-gray-400">
                    Mostrando {filteredLeads.length} de {leads.length} leads
                </div>

                {/* Table */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Nome</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Contato</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Origem</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Data</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-white font-medium">{lead.name}</div>
                                            {lead.tags && lead.tags.length > 0 && (
                                                <div className="flex gap-1 mt-1">
                                                    {lead.tags.map(tag => (
                                                        <span key={tag} className="text-xs text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">{tag}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                {(lead.phone || lead.whatsapp) && (
                                                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                                                        <Phone className="w-4 h-4" />
                                                        <span>{lead.phone || lead.whatsapp}</span>
                                                    </div>
                                                )}
                                                {lead.email && (
                                                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                                                        <Mail className="w-4 h-4" />
                                                        <span>{lead.email}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getOriginBadgeColor(lead.origin)}`}>
                                                {lead.origin ? (ORIGIN_LABELS[lead.origin] || lead.origin) : 'Desconhecido'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(lead.status)}`}>
                                                {STATUS_LABELS[lead.status] || lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300">
                                            {format(new Date(lead.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => deleteLead(lead.id)}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Excluir"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredLeads.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                Nenhum lead encontrado
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Leads;
