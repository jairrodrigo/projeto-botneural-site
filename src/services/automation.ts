/**
 * BotNeural Automation Services
 * Mock layer for future n8n integration
 */

export const automationService = {
    /**
     * Envia uma mensagem para o webhook do n8n para processamento
     */
    async sendMessageToN8N(payload: {
        conversationId: string;
        content: string;
        contentType: string;
        senderType: string;
    }) {
        console.log('🔗 [n8n Automation] Sending message:', payload);
        // Futuro: fetch('WEBHOOK_URL', { method: 'POST', body: JSON.stringify(payload) })
        return { success: true, message: 'Message sent to n8n flow' };
    },

    /**
     * Alterna o controle da IA (Liga/Desliga o bot)
     */
    async toggleAgent(conversationId: string, status: 'ia_ativa' | 'escalado_humano') {
        console.log(`🔗 [n8n Automation] Toggling agent for ${conversationId} to ${status}`);
        return { success: true, newStatus: status };
    },

    /**
     * Cria uma cobrança vinculada a uma conversa
     */
    async createPayment(conversationId: string, amount: number) {
        console.log(`🔗 [n8n Automation] Creating payment for ${conversationId}: R$ ${amount}`);
        return { success: true, paymentId: 'PAY-' + Math.random().toString(36).substr(2, 9) };
    },

    /**
     * Cria um agendamento
     */
    async createAppointment(conversationId: string, date: string) {
        console.log(`🔗 [n8n Automation] Creating appointment for ${conversationId} on ${date}`);
        return { success: true, appointmentId: 'APT-' + Math.random().toString(36).substr(2, 9) };
    }
};
