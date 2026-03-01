# BotNeural Platform — Visão Oficial do Sistema (Source of Truth)

## 🎯 Produto
**BotNeural Platform** é um painel SaaS premium para automação de vendas e atendimento, projetado para empresas que buscam escalar sua operação via WhatsApp com o poder da Inteligência Artificial.

## 🚀 Objetivos Principais
- **Conversar com Leads**: Interface de chat em tempo real estilo Chatwoot.
- **Acompanhar Pipeline**: CRM Kanban visual para gestão de funil de vendas.
- **Gestão de Agenda**: Controle de agendamentos automatizados.
- **Controle Financeiro**: Acompanhamento de cobranças e pagamentos.
- **Escalação Inteligente**: Transição suave entre atendimento IA e Humano.
- **Multi-tenant**: Estrutura preparada para múltiplas empresas e usuários.

## 🛠️ Stack Tecnológica
- **Frontend**: React (Vite), Tailwind CSS, Lucide React (Ícones).
- **Backend/Database**: Supabase (Auth, DB, Realtime, Storage).
- **Gerenciamento de Estado**: React Hooks / Context API.
- **Integração**: Preparado para webhooks via n8n.

## 📐 Estrutura de Dados (Cerne)
- `empresas`: Cadastro de clientes SaaS.
- `usuarios`: Gestores e atendentes vinculados a empresas.
- `conversas`: Sessões de chat entre leads e a plataforma.
- `mensagens`: Histórico completo de envios (Texto, Áudio, Imagem, Arquivo).
- `pagamentos`: Registro de cobranças geradas.
- `agendamentos`: Compromissos marcados no funil.

## 🎨 Design System
- **Estética**: SaaS Premium, Dark Mode Moderno.
- **Paleta**: Roxo Profundo, Azul Neon, Cyan.
- **UX**: Microinterações suaves, Skeleton loadings, Realtime updates obrigatórios.

## 🔗 Roteiro de Automação (n8n)
O frontend emite eventos e consome dados que serão orquestrados por fluxos no n8n para:
1. Processamento de Linguagem Natural (IA).
2. Disparos de mensagens via APIs de WhatsApp.
3. Geração de links de pagamento.
4. Sincronização de calendários.

---
*Este documento é a Referência Única de Verdade para o desenvolvimento da plataforma BotNeural.*
