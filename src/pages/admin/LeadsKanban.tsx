import React, { useEffect, useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { Phone, Mail, Calendar } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { pipelineService } from '../../services/pipelineService';
import { Lead, STATUS_LABELS, ORIGIN_LABELS } from '../../types/admin';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const LeadsKanban: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        })
    );

    const columns: {
        id: string;
        title: string;
        gradient: string;
        borderColor: string;
        badgeColor: string;
    }[] = [
            {
                id: 'novo',
                title: 'Novo Lead',
                gradient: 'from-blue-500 to-blue-600',
                borderColor: 'border-blue-500/30',
                badgeColor: 'bg-blue-500/20 text-blue-300'
            },
            {
                id: 'em_contato',
                title: 'Em Contato',
                gradient: 'from-yellow-500 to-amber-600',
                borderColor: 'border-yellow-500/30',
                badgeColor: 'bg-yellow-500/20 text-yellow-300'
            },
            {
                id: 'qualificado',
                title: 'Qualificado',
                gradient: 'from-cyan-500 to-teal-600',
                borderColor: 'border-cyan-500/30',
                badgeColor: 'bg-cyan-500/20 text-cyan-300'
            },
            {
                id: 'proposta',
                title: 'Proposta Enviada',
                gradient: 'from-orange-500 to-red-600',
                borderColor: 'border-orange-500/30',
                badgeColor: 'bg-orange-500/20 text-orange-300'
            },
            {
                id: 'cliente',
                title: 'Cliente',
                gradient: 'from-green-500 to-emerald-600',
                borderColor: 'border-green-500/30',
                badgeColor: 'bg-green-500/20 text-green-300'
            }
        ];

    useEffect(() => {
        loadLeads();
        const subscription = pipelineService.subscribeToLeads(() => {
            loadLeads();
        });
        return () => { subscription.unsubscribe(); };
    }, []);

    const loadLeads = async () => {
        try {
            const data = await pipelineService.getLeads();
            setLeads(data || []);
        } catch (error) {
            console.error('Error fetching leads:', error);
            toast.error('Erro ao carregar leads');
        } finally {
            setLoading(false);
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const leadId = active.id as string;
        const newStatus = over.id as string;

        // Find the lead
        const lead = leads.find(l => l.id === leadId);
        if (!lead || lead.etapa === newStatus) return;

        // Optimistic update
        setLeads(prev =>
            prev.map(l => (l.id === leadId ? { ...l, etapa: newStatus } : l))
        );

        // Update in database
        try {
            await pipelineService.updateLeadStatus(leadId, newStatus);
            toast.success(`Lead movido para ${STATUS_LABELS[newStatus] || newStatus}`);
        } catch (error) {
            console.error('Error updating lead status:', error);
            toast.error('Erro ao atualizar status');
            loadLeads();
        }
    };

    const getOriginBadgeColor = (origin: Lead['origin']) => {
        const colors = {
            landing: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            blog: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
            contact: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
        };
        return origin ? colors[origin] : colors.landing;
    };

    const LeadCard: React.FC<{ lead: Lead; isDragging?: boolean }> = ({ lead, isDragging }) => (
        <div
            className={`group bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-sm border border-white/20 rounded-xl p-4 cursor-move hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 ${isDragging ? 'opacity-50 rotate-3 scale-105' : ''
                }`}
        >
            <h3 className="text-white font-bold mb-3 text-base group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
                {lead.nome || lead.name}
            </h3>

            <div className="space-y-2 mb-3">
                {(lead.whatsapp || lead.telefone) && (
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Phone className="w-4 h-4 text-green-400" />
                        <span>{lead.whatsapp || lead.telefone}</span>
                    </div>
                )}
                {lead.email && (
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="truncate">{lead.email}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getOriginBadgeColor(lead.origin)}`}>
                    {lead.origin ? ORIGIN_LABELS[lead.origin] : 'Geral'}
                </span>
                <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lead.created_at ? format(new Date(lead.created_at), 'dd/MM', { locale: ptBR }) : '--/--'}</span>
                </div>
            </div>
        </div>
    );

    const DroppableColumn: React.FC<{ column: typeof columns[0]; leads: Lead[] }> = ({ column, leads }) => (
        <div className="flex-shrink-0 w-80">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl">
                <div className={`bg-gradient-to-r ${column.gradient} p-4`}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-white font-bold text-base">{column.title}</h2>
                        <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
                            {leads.length}
                        </span>
                    </div>
                </div>

                <div
                    id={column.id}
                    className="p-4 space-y-3 min-h-[500px] max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar"
                >
                    {leads.map(lead => (
                        <div key={lead.id} id={lead.id}>
                            <LeadCard lead={lead} isDragging={activeId === lead.id} />
                        </div>
                    ))}
                    {leads.length === 0 && (
                        <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
                            Nenhum lead nesta etapa
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

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

            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-2">
                        Pipeline de Vendas
                    </h1>
                    <p className="text-gray-400">Gerencie o fluxo de conversão dos seus leads.</p>
                </div>

                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-5 overflow-x-auto pb-4 px-1">
                        {columns.map(column => (
                            <DroppableColumn
                                key={column.id}
                                column={column}
                                leads={leads.filter(lead => (lead.etapa || 'novo') === column.id)}
                            />
                        ))}
                    </div>

                    <DragOverlay>
                        {activeId ? (
                            <LeadCard lead={leads.find(l => l.id === activeId)!} />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(96, 165, 250, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(96, 165, 250, 0.5);
                }
            `}</style>
        </AdminLayout>
    );
};

export default LeadsKanban;