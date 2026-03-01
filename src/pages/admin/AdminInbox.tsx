import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    MoreVertical,
    Phone,
    Mail,
    Tag,
    Columns,
    ExternalLink,
    Bot,
    User,
    Clock,
    Send,
    Paperclip,
    Mic,
    Smile,
    ShieldAlert,
    MessageSquare,
    Brain,
    CreditCard,
    Calendar as CalendarIcon
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { chatService, ChatConversation, ChatMessage } from '../../services/chatService';
import { Conversation, STATUS_LABELS } from '../../types/admin';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AdminInbox: React.FC = () => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [activeConversation, setActiveConversation] = useState<any | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadConversations();
        const subscription = chatService.subscribeToConversations(() => {
            loadConversations();
        });
        return () => { subscription.unsubscribe(); };
    }, []);

    useEffect(() => {
        if (activeConversation) {
            loadMessages(activeConversation.id);
            const subscription = chatService.subscribeToMessages(activeConversation.id, (payload) => {
                setMessages(prev => [...prev, payload.new]);
            });
            return () => { subscription.unsubscribe(); };
        }
    }, [activeConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadConversations = async () => {
        try {
            const data = await chatService.getConversations();
            setConversations(data || []);
        } catch (error) {
            console.error('Error fetching conversations:', error);
            toast.error('Erro ao carregar conversas');
        }
    };

    const loadMessages = async (id: string) => {
        try {
            const data = await chatService.getMessages(id);
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Erro ao carregar mensagens');
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !activeConversation) return;
        const text = newMessage;
        setNewMessage('');
        try {
            await chatService.sendMessage(activeConversation.id, text);
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Erro ao enviar mensagem');
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !activeConversation) return;

        setIsUploading(true);
        try {
            const publicUrl = await chatService.uploadFile(file);
            let type: ChatMessage['tipo'] = 'arquivo';
            if (file.type.startsWith('image/')) type = 'imagem';
            else if (file.type.startsWith('audio/')) type = 'audio';

            await chatService.sendMessage(activeConversation.id, publicUrl, type);
            toast.success('Arquivo enviado!');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Erro ao enviar arquivo');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleToggleStatus = async (status: string) => {
        if (!activeConversation) return;
        try {
            await chatService.updateStatus(activeConversation.id, status);
            setActiveConversation(prev => prev ? { ...prev, status } : null);
            toast.success('Status atualizado');
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Erro ao atualizar status');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getStatusColor = (status: Conversation['status']) => {
        switch (status) {
            case 'ia_ativa': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'escalado_humano': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'aguardando_pagamento': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
            case 'pagamento_confirmado': return 'bg-green-500/20 text-green-400 border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <AdminLayout>
            <div className="h-[calc(100vh-80px)] lg:h-[calc(100vh-48px)] flex gap-0 -m-8 overflow-hidden">
                {/* Col 1: Conversation List */}
                <div className="w-80 border-r border-white/10 flex flex-col bg-gray-900/40 backdrop-blur-md">
                    <div className="p-4 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white mb-4">Inbox</h2>
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar conversas..."
                                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar">
                        {conversations.map(conv => (
                            <button
                                key={conv.id}
                                onClick={() => setActiveConversation(conv)}
                                className={`w-full p-4 flex gap-3 hover:bg-white/5 border-b border-white/5 transition-all text-left ${activeConversation?.id === conv.id ? 'bg-blue-500/10 border-r-2 border-r-blue-500' : ''}`}
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                                    <User size={20} className="text-blue-400" />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-bold text-white truncate">{conv.lead_nome || 'Lead s/ Nome'}</h4>
                                        <span className="text-[10px] text-gray-500">{format(new Date(conv.updated_at), 'HH:mm')}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 truncate mb-2">{conv.last_message || 'Iniciando conversa...'}</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(conv.status)}`}>
                                        {STATUS_LABELS[conv.status] || conv.status.toUpperCase()}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Col 2: Chat Area */}
                <div className="flex-grow flex flex-col bg-black/20">
                    {activeConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gray-900/40 sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-white/10">
                                        <User size={18} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white leading-none">{activeConversation.lead_nome}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[10px] flex items-center gap-1 ${activeConversation.status === 'ia_ativa' ? 'text-blue-400' : 'text-emerald-400'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeConversation.status === 'ia_ativa' ? 'bg-blue-400' : 'bg-emerald-400'}`}></div>
                                                {activeConversation.status === 'ia_ativa' ? 'IA processando' : 'Atendimento Humano'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        className="bg-black/40 border border-white/10 rounded-lg text-xs py-1.5 px-3 text-white focus:outline-none"
                                        value={activeConversation.status}
                                        onChange={(e) => handleToggleStatus(e.target.value)}
                                    >
                                        <option value="ia_ativa">IA Ativa</option>
                                        <option value="escalado_humano">Humano</option>
                                        <option value="aguardando_pagamento">Aguardando Pagamento</option>
                                        <option value="pagamento_confirmado">Pago</option>
                                    </select>
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Chat History */}
                            <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.autor === 'lead' ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[70%] text-sm p-3 rounded-2xl ${msg.autor === 'lead'
                                            ? 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-sm shadow-lg'
                                            : msg.autor === 'ia'
                                                ? 'bg-blue-600/20 border border-blue-500/30 text-blue-100 rounded-br-sm shadow-blue-500/10'
                                                : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-sm shadow-lg shadow-blue-500/20'
                                            }`}>
                                            {msg.autor === 'ia' && (
                                                <div className="flex items-center gap-1.5 mb-1 text-[10px] text-blue-400 uppercase tracking-wider font-bold">
                                                    <Bot size={12} />
                                                    <span>BotNeural AI</span>
                                                </div>
                                            )}
                                            {msg.tipo === 'imagem' ? (
                                                <img src={msg.conteudo} alt="Anexo" className="rounded-lg max-w-full cursor-pointer hover:opacity-90" onClick={() => window.open(msg.conteudo, '_blank')} />
                                            ) : msg.tipo === 'audio' ? (
                                                <audio controls className="w-full h-8">
                                                    <source src={msg.conteudo} type="audio/mpeg" />
                                                </audio>
                                            ) : msg.tipo === 'arquivo' ? (
                                                <a href={msg.conteudo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline text-blue-400">
                                                    <Paperclip size={14} /> Arquivo Anexo
                                                </a>
                                            ) : (
                                                <p className="whitespace-pre-wrap">{msg.conteudo}</p>
                                            )}
                                            <div className={`text-[10px] mt-1.5 opacity-50 text-right ${msg.autor === 'lead' ? 'text-gray-400' : 'text-white'}`}>
                                                {format(new Date(msg.created_at), 'HH:mm')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 bg-gray-900/40 border-t border-white/10">
                                <div className="bg-black/40 border border-white/10 rounded-xl p-2 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
                                    <textarea
                                        rows={1}
                                        placeholder="Digite sua mensagem..."
                                        className="w-full bg-transparent border-none text-white text-sm focus:outline-none resize-none px-2 py-1 max-h-32"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                    />
                                    <div className="flex justify-between items-center mt-2 px-1">
                                        <div className="flex gap-2">
                                            <input
                                                type="file"
                                                hidden
                                                ref={fileInputRef}
                                                onChange={handleFileUpload}
                                                accept="image/*,audio/*,application/pdf,.doc,.docx,.xls,.xlsx"
                                            />
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={isUploading}
                                                className="p-2 hover:bg-white/10 rounded-lg text-gray-400"
                                                title="Anexar arquivo"
                                            >
                                                <Paperclip size={18} className={isUploading ? 'animate-spin' : ''} />
                                            </button>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400" title="Emoji">
                                                <Smile size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400" title="Gravar áudio">
                                                <Mic size={18} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.trim()}
                                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[10px] text-center text-gray-500 mt-2">Pressione Enter para enviar, Shift+Enter para quebra de linha.</p>
                            </div>
                        </>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-black/10">
                            <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-white/10 flex items-center justify-center mb-6">
                                <MessageSquare size={40} className="text-blue-500/50" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Selecione uma conversa</h3>
                            <p className="text-gray-400 max-w-xs">Escolha um lead na lista à esquerda para iniciar o atendimento ou visualizar o histórico.</p>
                        </div>
                    )}
                </div>

                {/* Col 3: Lead Info Sidebar */}
                <div className="w-80 border-l border-white/10 bg-gray-900/40 backdrop-blur-md flex flex-col">
                    {activeConversation ? (
                        <div className="p-6 flex flex-col h-full">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 mx-auto flex items-center justify-center mb-4">
                                    <User size={32} className="text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">{activeConversation.lead_nome}</h3>
                                <p className="text-sm text-gray-400">Atendimento Ativo</p>
                            </div>

                            <div className="space-y-6 flex-grow">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Informações do CRM</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Phone size={16} className="text-blue-400" />
                                            <span className="text-sm">{activeConversation.telefone || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Mail size={16} className="text-blue-400" />
                                            <span className="text-sm truncate">N/A</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Tag size={16} className="text-blue-400" />
                                            <span className="text-sm">N/A</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Kanban Status</h4>
                                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-gray-400">Etapa Atual</span>
                                            <span className="text-xs font-bold text-blue-400">{(STATUS_LABELS as any)[activeConversation.status] || 'IA Ativa'}</span>
                                        </div>
                                        <button
                                            className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-all"
                                        >
                                            <Columns size={14} />
                                            <span>Mover no Kanban</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 space-y-3">
                                    {activeConversation.status === 'ia_ativa' ? (
                                        <button
                                            onClick={() => {
                                                handleToggleStatus('escalado_humano');
                                            }}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-all"
                                        >
                                            <ShieldAlert size={18} />
                                            <span>Assumir Atendimento</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleToggleStatus('ia_ativa')}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:scale-[1.02] transition-all"
                                        >
                                            <Brain size={18} />
                                            <span>Ativar IA Novamente</span>
                                        </button>
                                    )}

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <button
                                            onClick={() => toast.success('Módulo de cobrança em breve')}
                                            className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs text-white transition-all group"
                                        >
                                            <CreditCard size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
                                            <span>Criar Cobrança</span>
                                        </button>
                                        <button
                                            onClick={() => toast.success('Módulo de agenda em breve')}
                                            className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs text-white transition-all group"
                                        >
                                            <CalendarIcon size={20} className="text-pink-400 group-hover:scale-110 transition-transform" />
                                            <span>Agendar</span>
                                        </button>
                                    </div>

                                    <button
                                        className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white transition-all"
                                    >
                                        <ExternalLink size={16} />
                                        <span>Abrir Card Completo</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                                    <Clock size={12} />
                                    <span>Lead criado em {format(new Date(activeConversation.created_at), 'dd MMM yyyy', { locale: ptBR })}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center p-8 opacity-20 grayscale">
                            <img src="/botneural_logo.png" alt="BotNeural" className="w-24 opacity-50" />
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </AdminLayout>
    );
};

export default AdminInbox;
