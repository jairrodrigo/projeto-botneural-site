# 🚀 Guia Rápido: n8n + Evolution API + BotNeural

## ⚡ Configuração em 10 Minutos

### 1️⃣ **Pré-requisitos**
- [ ] Conta no Supabase (já configurada ✅)
- [ ] Instância do n8n rodando
- [ ] Evolution API configurada
- [ ] WhatsApp Business conectado

### 2️⃣ **Importar Workflow no n8n**

1. Abra seu n8n
2. Clique em **"Import from file"**
3. Selecione o arquivo `n8n-workflow-botneural.json`
4. Clique em **"Import"**

### 3️⃣ **Configurar Credenciais**

#### **Evolution API:**
```bash
# Substitua no workflow:
URL: https://sua-evolution-api.com/message/sendText/INSTANCE_NAME
API Key: SUA_API_KEY_EVOLUTION
Instance: SEU_NOME_DA_INSTANCIA
```

#### **Webhook URL:**
```bash
# URL que o Supabase vai chamar:
https://seu-n8n.com/webhook/botneural-contact
```

### 4️⃣ **Ativar Workflow**

1. No n8n, clique no workflow importado
2. Clique em **"Active"** (toggle no canto superior direito)
3. Copie a URL do webhook gerada

### 5️⃣ **Testar Integração**

#### **Teste Manual:**
```bash
# Execute no terminal ou Postman:
curl -X POST https://seu-n8n.com/webhook/botneural-contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@email.com",
    "whatsapp": "11999999999",
    "segment": "e-commerce"
  }'
```

#### **Teste Real:**
1. Acesse seu site: http://localhost:5173
2. Preencha qualquer formulário de contato
3. Verifique se:
   - ✅ Dados foram salvos no Supabase
   - ✅ Mensagem foi enviada no WhatsApp
   - ✅ Logs aparecem no n8n

---

## 🔧 **Configurações Avançadas**

### **Personalizar Mensagens**

Edite o nó "Process Lead Data" no n8n:

```javascript
// Adicione novos segmentos:
const messages = {
  'seu-novo-segmento': `Sua mensagem personalizada aqui`,
  // ... outros segmentos
};
```

### **Adicionar Follow-up Automático**

1. Adicione um nó **"Wait"** após o envio
2. Configure para aguardar 24 horas
3. Adicione outro nó **"HTTP Request"** para segunda mensagem

### **Integrar com CRM**

1. Adicione nó **"HTTP Request"** após sucesso
2. Configure para enviar dados para seu CRM:
   - Pipedrive
   - HubSpot
   - RD Station
   - Etc.

---

## 🐛 **Troubleshooting**

### **Mensagem não enviada:**
- ✅ Verifique se Evolution API está online
- ✅ Confirme se API Key está correta
- ✅ Teste o endpoint da Evolution API diretamente

### **Webhook não dispara:**
- ✅ Verifique se n8n está acessível externamente
- ✅ Confirme se URL do webhook está correta
- ✅ Teste o webhook manualmente

### **Dados não salvam no Supabase:**
- ✅ Verifique conexão com internet
- ✅ Confirme credenciais do Supabase
- ✅ Verifique console do navegador para erros

---

## 📊 **Métricas Importantes**

### **KPIs para Monitorar:**
- 📈 Taxa de conversão de formulário
- 📱 Taxa de entrega de mensagens WhatsApp
- ⏱️ Tempo de resposta automática
- 🔄 Taxa de follow-up
- 💬 Taxa de resposta dos leads

### **Dashboards Recomendados:**
- Supabase: Dados de leads por período
- n8n: Execuções e erros do workflow
- Evolution API: Status de mensagens enviadas

---

## 🎯 **Próximos Níveis**

### **Nível 2: Qualificação Inteligente**
- Implementar scoring de leads
- Roteamento baseado em perfil
- Mensagens dinâmicas por score

### **Nível 3: Chatbot Completo**
- Respostas automáticas no WhatsApp
- Fluxo de conversação estruturado
- Integração com IA (GPT/Claude)

### **Nível 4: Omnichannel**
- Email marketing automatizado
- SMS para casos urgentes
- Retargeting em redes sociais

---

**🚀 Status:** Pronto para produção!  
**⏱️ Tempo de implementação:** ~10 minutos  
**🎯 ROI esperado:** 300% em automação de leads