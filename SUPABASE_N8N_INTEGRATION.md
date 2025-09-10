# Integração Supabase + n8n - Formulário de Contato BotNeural

## 📋 Resumo
Os dados do formulário de contato do site BotNeural agora são automaticamente salvos no Supabase e podem ser facilmente integrados com n8n para automações.

## 🗄️ Estrutura do Banco de Dados

### Tabela: `contact_forms`

| Campo | Tipo | Descrição |
|-------|------|----------|
| `id` | UUID | Identificador único (gerado automaticamente) |
| `name` | VARCHAR(255) | Nome do usuário |
| `email` | VARCHAR(255) | Email do usuário |
| `whatsapp` | VARCHAR(20) | Número do WhatsApp |
| `segment` | VARCHAR(255) | Segmento do negócio |
| `created_at` | TIMESTAMPTZ | Data/hora de criação |
| `updated_at` | TIMESTAMPTZ | Data/hora da última atualização |

## 🔗 Credenciais do Supabase

```
URL: https://gwsfxihujlmujpzswolj.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3c2Z4aWh1amxtdWpwenN3b2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MzIyODAsImV4cCI6MjA3MzEwODI4MH0.1mYwLFgUV_it3JduQXEV7ojBkXygUTI2EFckILIILDg
Project ID: gwsfxihujlmujpzswolj
```

## 🔄 **Integração com n8n + Evolution API**

### **Fluxo Recomendado: Webhook → n8n → Evolution API**

#### **1. Configuração do Webhook no Supabase**
```sql
-- Criar função para notificar n8n
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('new_contact', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger
CREATE TRIGGER contact_form_trigger
  AFTER INSERT ON contact_forms
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();
```

#### **2. Configuração no n8n**

**Nós necessários:**
1. **Webhook Trigger** - Recebe dados do Supabase
2. **Code Node** - Processa dados do formulário
3. **HTTP Request** - Envia para Evolution API

**Exemplo de fluxo n8n:**
```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "botneural-contact",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Process Data",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "// Processar dados do formulário\nconst { name, email, whatsapp, segment } = $json;\n\n// Formatar mensagem\nconst message = `🤖 *Novo Lead BotNeural*\n\n👤 *Nome:* ${name}\n📧 *Email:* ${email}\n📱 *WhatsApp:* ${whatsapp}\n🏢 *Segmento:* ${segment}\n\n⏰ *Data:* ${new Date().toLocaleString('pt-BR')}`;\n\nreturn [{ json: { phone: whatsapp, message } }];"
      }
    },
    {
      "name": "Evolution API",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://sua-evolution-api.com/message/sendText/INSTANCE_NAME",
        "method": "POST",
        "headers": {
          "apikey": "SUA_API_KEY_EVOLUTION",
          "Content-Type": "application/json"
        },
        "body": {
          "number": "={{$json.phone}}",
          "text": "={{$json.message}}"
        }
      }
    }
  ]
}
```

#### **3. Configuração Evolution API**

**Endpoint para envio de mensagem:**
```
POST https://sua-evolution-api.com/message/sendText/INSTANCE_NAME
```

**Headers necessários:**
```json
{
  "apikey": "SUA_API_KEY_EVOLUTION",
  "Content-Type": "application/json"
}
```

**Body da requisição:**
```json
{
  "number": "5511999999999",
  "text": "Sua mensagem aqui"
}
```

### **Opções Alternativas de Integração**

#### **Opção 2: Polling do Supabase**
1. Use o nó "HTTP Request" no n8n
2. Configure para fazer polling da API do Supabase
3. URL: `https://gwsfxihujlmujpzswolj.supabase.co/rest/v1/contact_forms`
4. Headers:
   ```
   apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3c2Z4aWh1amxtdWpwenN3b2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MzIyODAsImV4cCI6MjA3MzEwODI4MH0.1mYwLFgUV_it3JduQXEV7ojBkXygUTI2EFckILIILDg
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3c2Z4aWh1amxtdWpwenN3b2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MzIyODAsImV4cCI6MjA3MzEwODI4MH0.1mYwLFgUV_it3JduQXEV7ojBkXygUTI2EFckILIILDg
   ```

#### **Opção 3: Supabase Realtime**
1. Use o nó "Supabase" no n8n (se disponível)
2. Configure para escutar mudanças na tabela `contact_forms`
3. Processe automaticamente novos registros

## 📊 Exemplos de Queries SQL

### Buscar todos os contatos
```sql
SELECT * FROM contact_forms ORDER BY created_at DESC;
```

### Buscar contatos por segmento
```sql
SELECT * FROM contact_forms WHERE segment ILIKE '%tecnologia%';
```

### Buscar contatos das últimas 24 horas
```sql
SELECT * FROM contact_forms 
WHERE created_at >= NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

## 🔄 Fluxo de Automação Sugerido

1. **Trigger**: Novo registro na tabela `contact_forms`
2. **Processamento**: 
   - Validar dados
   - Enriquecer informações (ex: buscar dados da empresa)
   - Categorizar lead
3. **Ações**:
   - Enviar email de boas-vindas
   - Criar contato no CRM
   - Notificar equipe de vendas
   - Agendar follow-up

## 🛠️ Funcionalidades Implementadas

✅ Salvamento automático no Supabase  
✅ Validação de dados obrigatórios  
✅ Tratamento de erros  
✅ Feedback visual para o usuário  
✅ Integração com WhatsApp (mantida)  
✅ RLS (Row Level Security) configurado  

## 📱 **Configuração do Webhook no Frontend (Opcional)**

Para garantir que o n8n receba os dados imediatamente, você pode também enviar diretamente do frontend:

```typescript
// Adicionar ao arquivo src/lib/supabase.ts
export const sendToN8nWebhook = async (formData: ContactForm) => {
  try {
    await fetch('https://seu-n8n.com/webhook/botneural-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
  } catch (error) {
    console.error('Erro ao enviar para n8n:', error);
  }
};
```

## 🤖 **Exemplo de Automação Completa**

### **Cenário: Lead Qualification + WhatsApp Automation**

1. **Usuário preenche formulário** → Dados salvos no Supabase
2. **Trigger dispara n8n** → Processa dados do lead
3. **Qualificação automática** → Baseada no segmento escolhido
4. **Mensagem personalizada** → Enviada via Evolution API
5. **Follow-up programado** → Mensagens de acompanhamento

### **Template de Mensagem Personalizada:**

```javascript
// No Code Node do n8n
const { name, email, whatsapp, segment } = $json;

// Mensagens personalizadas por segmento
const messages = {
  'e-commerce': `🛒 Olá ${name}! Vi que você tem interesse em automação para e-commerce. Que tal agendar uma conversa de 15min para mostrar como podemos aumentar suas vendas em 300%?`,
  'saude': `🏥 Oi ${name}! Notei seu interesse em soluções para área da saúde. Temos cases incríveis de clínicas que automatizaram 80% do atendimento. Quer ver como funciona?`,
  'educacao': `📚 Olá ${name}! Educação é nossa paixão! Temos soluções que podem automatizar matrículas, suporte aos alunos e muito mais. Vamos conversar?`,
  'default': `🤖 Oi ${name}! Obrigado pelo interesse na BotNeural! Em breve nossa equipe entrará em contato para apresentar as melhores soluções para seu negócio.`
};

const message = messages[segment] || messages.default;

return [{ 
  json: { 
    phone: whatsapp.replace(/\D/g, ''), // Remove caracteres não numéricos
    message,
    name,
    segment
  } 
}];
```

## 🚀 **Próximos Passos**

### **1. Configuração Imediata:**
- [ ] Configurar instância Evolution API
- [ ] Criar workflow no n8n
- [ ] Testar envio de mensagens
- [ ] Configurar webhook URL

### **2. Melhorias Futuras:**
- [ ] Implementar qualificação de leads por IA
- [ ] Adicionar follow-up automático
- [ ] Integrar com CRM (Pipedrive, HubSpot)
- [ ] Criar dashboard de métricas
- [ ] Implementar chatbot no WhatsApp

### **3. Monitoramento:**
- [ ] Configurar alertas de falha
- [ ] Métricas de conversão
- [ ] Relatórios de performance
- [ ] Backup automático dos dados

---

**🎯 Resultado Esperado:** Automação completa do processo de captação e qualificação de leads, com resposta imediata via WhatsApp e acompanhamento personalizado.

**Projeto:** BotNeural - Site Institucional + Automação  
**Data:** Janeiro 2025  
**Status:** ✅ Integração Supabase + n8n + Evolution API documentada