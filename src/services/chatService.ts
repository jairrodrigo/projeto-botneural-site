
import { supabase } from '../lib/supabase';

export interface ChatConversation {
    id: string;
    lead_nome: string;
    telefone: string;
    status: string;
    last_message: string;
    unread_count: number;
    created_at: string;
    updated_at: string;
}

export interface ChatMessage {
    id: string;
    conversation_id: string;
    sender_type: 'user' | 'contact' | 'system' | 'ai';
    media_type: 'image' | 'audio' | 'text' | 'file';
    content: string;
    created_at: string;
    media_url?: string;
}

export const chatService = {
    async getConversations() {
        const { data, error } = await supabase
            .from('conversations')
            .select(`
                *,
                contacts (
                    name,
                    phone
                )
            `)
            .order('last_message_at', { ascending: false });

        if (error) throw error;

        return data.map((conv: any) => ({
            id: conv.id,
            lead_nome: conv.contacts?.name || 'Lead sem nome',
            telefone: conv.contacts?.phone || '',
            status: conv.status,
            last_message: conv.last_message,
            unread_count: conv.unread_count,
            created_at: conv.created_at,
            updated_at: conv.last_message_at || conv.created_at
        }));
    },

    async getMessages(conversationId: string) {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        if (error) throw error;

        // Adaptar para o formato esperado pelo frontend se necessário
        return data.map((msg: any) => ({
            id: msg.id,
            conversa_id: msg.conversation_id,
            autor: msg.sender_type === 'user' ? 'humano' : msg.sender_type === 'ai' ? 'ia' : 'lead',
            tipo: msg.media_type === 'image' ? 'imagem' : msg.media_type === 'audio' ? 'audio' : msg.media_type === 'file' ? 'arquivo' : 'texto',
            conteudo: msg.content || msg.media_url,
            created_at: msg.created_at
        }));
    },

    async sendMessage(conversationId: string, content: string, type: 'texto' | 'imagem' | 'audio' | 'arquivo' = 'texto', author: 'humano' | 'ia' | 'lead' = 'humano') {
        const senderType = author === 'humano' ? 'user' : author === 'ia' ? 'ai' : 'contact';
        const mediaType = type === 'imagem' ? 'image' : type === 'audio' ? 'audio' : type === 'arquivo' ? 'file' : 'text';
        const contentField = type === 'texto' ? content : '';
        const mediaUrlField = type !== 'texto' ? content : null;

        const { data, error } = await supabase
            .from('messages')
            .insert([{
                conversation_id: conversationId,
                sender_type: senderType,
                content: contentField,
                media_type: mediaType,
                media_url: mediaUrlField
            }])
            .select()
            .single();

        if (error) throw error;

        // Atualizar timestamp da conversa e última mensagem
        await supabase
            .from('conversations')
            .update({
                last_message_at: new Date().toISOString(),
                last_message: type === 'texto' ? content : `[${type}]`
            })
            .eq('id', conversationId);

        return data;
    },

    async uploadFile(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('chat-files')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('chat-files')
            .getPublicUrl(filePath);

        return data.publicUrl;
    },

    async updateStatus(conversationId: string, status: string) {
        const { data, error } = await supabase
            .from('conversations')
            .update({ status })
            .eq('id', conversationId);
        if (error) throw error;
        return data;
    },

    subscribeToMessages(conversationId: string, callback: (payload: any) => void) {
        return supabase
            .channel(`public:messages:conversation_id=eq.${conversationId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            }, (payload) => {
                // Adaptar payload para frontend
                const msg = payload.new;
                const adapted = {
                    id: msg.id,
                    conversa_id: msg.conversation_id,
                    autor: msg.sender_type === 'user' ? 'humano' : msg.sender_type === 'ai' ? 'ia' : 'lead',
                    tipo: msg.media_type === 'image' ? 'imagem' : msg.media_type === 'audio' ? 'audio' : msg.media_type === 'file' ? 'arquivo' : 'texto',
                    conteudo: msg.content || msg.media_url,
                    created_at: msg.created_at
                };
                callback({ new: adapted });
            })
            .subscribe();
    },

    subscribeToConversations(callback: (payload: any) => void) {
        return supabase
            .channel('public:conversations')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, callback)
            .subscribe();
    }
};
