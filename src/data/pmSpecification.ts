import { MVPFeature, UserFlowStep, TechStackItem } from '../types';

export const PM_MVP_FEATURES: MVPFeature[] = [
  {
    id: 1,
    title: "1. Registro Ágil de Transações (Receitas & Despesas)",
    badge: "Essencial / Core Loop",
    objective: "Permitir que o usuário registre um gasto em menos de 10 segundos, eliminando o atrito diário que causa o abandono de apps financeiros.",
    userStory: "Como usuário que acabou de fazer uma compra, quero lançar rapidamente o valor, categoria e data para manter meus gastos atualizados sem burocracia.",
    acceptanceCriteria: [
      "Teclado numérico rápido ou campo de valor em destaque instantâneo.",
      "Categorias pré-definidas com ícones visuais (Alimentação, Transporte, Moradia, Lazer, Saúde, etc.) e opção de categoria personalizada.",
      "Seleção automática da data atual com possibilidade de edição retroativa.",
      "Feedback tátil/visual imediato de sucesso no lançamento."
    ],
    kpi: "Tempo médio de registro < 8 segundos; Taxa de retenção D7 > 35%."
  },
  {
    id: 2,
    title: "2. Dashboard Central de Saúde Financeira",
    badge: "Visão Geral em 3 Segundos",
    objective: "Oferecer uma visão imediata e sem ruído do saldo disponível, total de entradas e total de saídas do mês corrente.",
    userStory: "Como usuário abrindo o app pela manhã, quero bater o olho e saber quanto tenho disponível e quanto gastei no mês para não estourar o orçamento.",
    acceptanceCriteria: [
      "Cards de alto contraste: Saldo Atual, Total de Receitas e Total de Despesas do mês.",
      "Indicador visual de tendência (% de variação em relação ao mês anterior).",
      "Gráfico simples de distribuição de gastos por categoria (donut ou barras limpas).",
      "Acesso com um toque ao botão flutuante de novo gasto (+)."
    ],
    kpi: "Frequência de abertura diária (DAU/MAU > 0.40)."
  },
  {
    id: 3,
    title: "3. Orçamento Mensal por Categoria com Alertas de Teto",
    badge: "Prevenção de Endividamento",
    objective: "Capacitar o usuário a planejar limites de gastos por categoria antes que o dinheiro acabe.",
    userStory: "Como alguém que quer economizar, quero definir um teto para categorias flexíveis (ex: R$ 600 em Restaurantes) e ser avisado quando atingir 80% e 100%.",
    acceptanceCriteria: [
      "Definição simples de teto orçamentário mensal para categorias-chave.",
      "Barra de progresso visual colorida (Verde < 70%, Amarelo 70-90%, Vermelho > 100%).",
      "Cálculo de 'gasto diário sugerido' até o final do mês baseado no saldo restante.",
      "Alerta visual discreto na tela inicial quando uma categoria estiver no vermelho."
    ],
    kpi: "% de usuários ativos com ao menos 2 orçamentos ativos (> 60%)."
  },
  {
    id: 4,
    title: "4. Extrato Inteligente com Filtros e Busca",
    badge: "Controle & Rastreabilidade",
    objective: "Garantir total transparência e facilidade para conferir, buscar e corrigir lançamentos passados.",
    userStory: "Como usuário conferindo a fatura do cartão, quero buscar lançamentos por texto, filtrar por mês ou categoria e corrigir valores errados.",
    acceptanceCriteria: [
      "Feed cronológico agrupado por data (Hoje, Ontem, Esta Semana).",
      "Busca textual instantânea (por nome do estabelecimento ou descrição).",
      "Filtros rápidos por Tipo (Receita/Despesa), Categoria e Período.",
      "Ações rápidas de Editar e Excluir com confirmação."
    ],
    kpi: "Taxa de correção/edição de lançamentos concluída com sucesso > 95%."
  },
  {
    id: 5,
    title: "5. Fechamento Mensal com Relatório e Exportação Simples",
    badge: "Engajamento & Insights",
    objective: "Proporcionar a sensação de dever cumprido ao final do mês, mostrando onde o dinheiro foi e estimulando o próximo ciclo.",
    userStory: "Como usuário no último dia do mês, quero ver um resumo simples de onde economizei ou extrapolei, podendo exportar para CSV/PDF.",
    acceptanceCriteria: [
      "Cards de destaque: Maior despesa do mês, Categoria que mais consumiu orçamento e Saldo poupado.",
      "Comparativo de gastos mês a mês.",
      "Exportação em 1 clique para planilha CSV (formato compatível com Excel e Google Sheets).",
      "Opção de duplicar ou ajustar orçamentos automaticamente para o próximo mês."
    ],
    kpi: "Taxa de visualização do relatório de fechamento de mês > 70% dos usuários ativos."
  }
];

export const PM_USER_FLOW: UserFlowStep[] = [
  {
    step: "01",
    title: "Descoberta & Onboarding Rápido",
    screen: "Tela de Boas-Vindas / Login Glassmorphism",
    description: "Usuário acessa a plataforma via web/mobile. Pode criar conta via e-mail ou autenticação social (Google/Apple) em 1 clique. O onboarding faz 2 perguntas rápidas: Qual sua renda estimada e qual sua principal meta (sair das dívidas, guardar dinheiro ou controlar gastos).",
    actions: ["Validação de credenciais", "Configuração de moeda (BRL)", "Geração automática de categorias padrão"]
  },
  {
    step: "02",
    title: "Dashboard Central (Home)",
    screen: "Dashboard Financeiro",
    description: "O usuário visualiza instantaneamente o saldo líquido, despesas do mês e a saúde do orçamento. O botão '+' flutuante fica sempre visível no polegar em dispositivos móveis.",
    actions: ["Consulta de saldo", "Visualização de barras de categoria", "Acesso rápido a novo registro"]
  },
  {
    step: "03",
    title: "Registro de Transação (Core Loop)",
    screen: "Modal / Bottom Sheet de Lançamento",
    description: "Ao tocar no '+', abre-se uma tela focada. O usuário digita o valor, seleciona o ícone da categoria (ex: Alimentação) e toca em 'Salvar'. Duração total: menos de 6 segundos.",
    actions: ["Digitação do valor", "Seleção de categoria rápida", "Data automática", "Persistência em tempo real"]
  },
  {
    step: "04",
    title: "Acompanhamento & Alertas de Metas",
    screen: "Aba de Orçamentos",
    description: "O usuário acompanha se seus gastos estão dentro do planejado. Se a categoria de 'Lazer' atinge 80%, um aviso sutil surge com recomendação de ritmo diário.",
    actions: ["Ajuste de tetos mensais", "Visualização de ritmo diário", "Notificação de proximidade de limite"]
  },
  {
    step: "05",
    title: "Auditoria & Extrato Detalhado",
    screen: "Aba de Extrato / Histórico",
    description: "Usuário pesquisa compras específicas, filtra por período (Este mês, Mês passado, Personalizado) e pode editar ou estornar lançamentos.",
    actions: ["Busca por texto", "Filtro por categoria", "Exclusão / Edição"]
  },
  {
    step: "06",
    title: "Fechamento Mensal & Exportação",
    screen: "Relatório de Fim de Mês",
    description: "No dia 1º, o app parabeniza o usuário pelo fechamento do ciclo, mostra o total economizado e oferece download em CSV para controle avançado.",
    actions: ["Revisão de conquistas", "Exportação para CSV/Excel", "Renovação dos tetos para o novo mês"]
  }
];

export const PM_TECH_STACK: TechStackItem[] = [
  {
    category: "Frontend Web / PWA",
    technology: "React 19 + TypeScript + Vite + Tailwind CSS",
    role: "Interface de usuário ultra rápida, componentizada, tipada e com suporte nativo a dispositivos móveis.",
    rationale: "Vite oferece compilação instantânea e bundle mínimo. Tailwind CSS permite construir layouts modernos com Glassmorphism sem overhead de CSS-in-JS. TypeScript previne erros em cálculos monetários.",
    freeTierStatus: "100% Gratuito (Open Source)"
  },
  {
    category: "Hospedagem & CI/CD",
    technology: "Vercel ou Netlify (Plano Hobby / Free)",
    role: "Hospedagem estática com CDN global (Edge Network), SSL HTTPS automático, deploys automáticos via GitHub.",
    rationale: "100 GB de tráfego/mês grátis, 0 custo de servidor, zero manutenção de infraestrutura, deploys automáticos a cada git push.",
    freeTierStatus: "Gratuito permanente (Hobby Tier)"
  },
  {
    category: "Backend & Autenticação",
    technology: "Supabase ou Firebase Auth (Tier Gratuito)",
    role: "Autenticação por e-mail/senha, Google OAuth, recuperação de senha via e-mail e JWT tokens seguros.",
    rationale: "Ambos oferecem até 50.000 usuários ativos mensais (MAU) totalmente gratuitos, com fluxo de reset de senha pronto e sem necessidade de programar microsserviço de e-mail.",
    freeTierStatus: "Até 50k usuários ativos/mês grátis"
  },
  {
    category: "Banco de Dados",
    technology: "PostgreSQL gerenciado (Supabase) ou Cloud Firestore",
    role: "Armazenamento estruturado de transações, categorias, orçamentos e perfis de usuário com Row-Level Security (RLS).",
    rationale: "O Supabase entrega PostgreSQL com 500MB gratuitos e RLS nativo (usuário só lê seus próprios dados), ideal para conformidade com segurança financeira (LGPD).",
    freeTierStatus: "500MB grátis (armazena milhões de transações)"
  },
  {
    category: "Animações & Ícones",
    technology: "Lucide React + Motion",
    role: "Microinterações suaves na interface, feedback de sucesso e biblioteca de ícones consistente para categorias.",
    rationale: "Melhora drástica na percepção de qualidade do produto (polish) sem degradar o score no Google Lighthouse.",
    freeTierStatus: "100% Gratuito (Open Source)"
  }
];
