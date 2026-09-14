import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  DollarSign, 
  Download, 
  Trash2, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  ShoppingBag, 
  Home, 
  Car, 
  Coffee, 
  Activity, 
  TrendingUp, 
  Calendar,
  X,
  Sparkles,
  Shield,
  RotateCcw,
  Layers
} from 'lucide-react';
import { Transaction, CategoryBudget, User } from '../types';

interface FinanceAppPreviewProps {
  user: User | null;
  onGoToLogin: () => void;
  onGoToPmSpec: () => void;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Supermercado Mensal', amount: 485.60, type: 'expense', category: 'Alimentação', date: 'Hoje, 14:20' },
  { id: '2', title: 'Salário Empresa XYZ', amount: 5400.00, type: 'income', category: 'Salário', date: 'Hoje, 09:00' },
  { id: '3', title: 'Combustível Posto Ipiranga', amount: 180.00, type: 'expense', category: 'Transporte', date: 'Ontem' },
  { id: '4', title: 'Assinaturas Streaming', amount: 55.90, type: 'expense', category: 'Lazer', date: 'Ontem' },
  { id: '5', title: 'Aluguel & Condomínio', amount: 1650.00, type: 'expense', category: 'Moradia', date: '10 Out' },
  { id: '6', title: 'Farmácia Droga Raia', amount: 92.40, type: 'expense', category: 'Saúde', date: '08 Out' },
  { id: '7', title: 'Freelance Design UI/UX', amount: 1200.00, type: 'income', category: 'Renda Extra', date: '05 Out' },
];

const INITIAL_BUDGETS: CategoryBudget[] = [
  { category: 'Alimentação', allocated: 1200, spent: 890, color: 'emerald', iconName: 'ShoppingBag' },
  { category: 'Moradia', allocated: 1800, spent: 1650, color: 'blue', iconName: 'Home' },
  { category: 'Transporte', allocated: 500, spent: 440, color: 'amber', iconName: 'Car' },
  { category: 'Lazer', allocated: 400, spent: 395, color: 'rose', iconName: 'Coffee' },
  { category: 'Saúde', allocated: 300, spent: 92.40, color: 'cyan', iconName: 'Activity' }
];

export const FinanceAppPreview: React.FC<FinanceAppPreviewProps> = ({
  user,
  onGoToLogin,
  onGoToPmSpec
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<CategoryBudget[]>(INITIAL_BUDGETS);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all');

  // New Transaction Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'expense' | 'income'>('expense');
  const [newCategory, setNewCategory] = useState('Alimentação');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  // Filtered transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(newAmount.replace(',', '.'));
    if (!newTitle.trim() || isNaN(amountVal) || amountVal <= 0) return;

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      title: newTitle.trim(),
      amount: amountVal,
      type: newType,
      category: newCategory,
      date: 'Agora mesmo'
    };

    setTransactions([newTx, ...transactions]);

    // Update budget if expense
    if (newType === 'expense') {
      setBudgets(prev => prev.map(b => {
        if (b.category === newCategory) {
          return { ...b, spent: b.spent + amountVal };
        }
        return b;
      }));
    }

    setNewTitle('');
    setNewAmount('');
    setIsModalOpen(false);

    setFeedbackMsg(`✓ Lançamento de R$ ${amountVal.toFixed(2)} registrado com sucesso!`);
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  const handleDeleteTransaction = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (tx && tx.type === 'expense') {
      setBudgets(prev => prev.map(b => {
        if (b.category === tx.category) {
          return { ...b, spent: Math.max(0, b.spent - tx.amount) };
        }
        return b;
      }));
    }
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const exportCSV = () => {
    const headers = 'ID,Título,Tipo,Categoria,Valor,Data\n';
    const rows = transactions.map(t => 
      `"${t.id}","${t.title}","${t.type === 'expense' ? 'Despesa' : 'Receita'}","${t.category}",${t.amount.toFixed(2)},"${t.date}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `gastos_mvp_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Admin exclusive actions
  const handleResetDefaultData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgets(INITIAL_BUDGETS);
    setFeedbackMsg('✓ Base de dados restaurada para os valores padrão pelo Administrador.');
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  const handleClearAllData = () => {
    setTransactions([]);
    setBudgets(prev => prev.map(b => ({ ...b, spent: 0 })));
    setFeedbackMsg('✓ Todos os registros limpos pelo Administrador patrick.');
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  const handleAddSampleAdminBatch = () => {
    const batch: Transaction[] = [
      { id: 'adm_1', title: 'Consultoria Estratégica', amount: 3500, type: 'income', category: 'Salário', date: 'Hoje' },
      { id: 'adm_2', title: 'Servidores & Cloud AWS', amount: 320, type: 'expense', category: 'Moradia', date: 'Hoje' },
      { id: 'adm_3', title: 'Assinatura Software IA', amount: 150, type: 'expense', category: 'Lazer', date: 'Hoje' },
    ];
    setTransactions(prev => [...batch, ...prev]);
    setFeedbackMsg('✓ Lote de testes injetado com sucesso pelo Administrador.');
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Panel Callout if logged in as Admin */}
      {user?.role === 'admin' && (
        <div className="glass-card rounded-2xl p-4 border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-slate-900/60 shadow-lg shadow-amber-500/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/25 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-md shadow-amber-500/20 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                    Modo Administrador Ativo
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/30">
                    ID: patrick
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Você possui privilégios de superusuário: controle da base, injeção de massa de testes e auditoria.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                id="btn-admin-reset"
                onClick={handleResetDefaultData}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Restaurar transações e orçamentos iniciais"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetar Dados</span>
              </button>

              <button
                id="btn-admin-seed"
                onClick={handleAddSampleAdminBatch}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Inserir transações de teste"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>+ Lote de Testes</span>
              </button>

              <button
                id="btn-admin-clear"
                onClick={handleClearAllData}
                className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Limpar todos os lançamentos"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar Tudo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner with User Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card rounded-2xl p-5 border border-white/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold">
              Protótipo Interativo do MVP
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-300">5 Funcionalidades em Ação</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {user ? `Olá, ${user.name} 👋` : 'Controle Financeiro Pessoal'}
          </h2>
          <p className="text-xs text-slate-400">
            {user ? `Logado como ${user.email}` : 'Visualizando dados interativos de demonstração do MVP'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-open-add-modal"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Transação</span>
          </button>
          
          <button
            id="btn-export-csv"
            onClick={exportCSV}
            className="px-3.5 py-2.5 rounded-xl glass-pill hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Exportar para planilha CSV"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Feedback Notification */}
      {feedbackMsg && (
        <div className="glass-card rounded-xl p-3 border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* 1. Dashboard Cards (Funcionalidade 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Saldo Atual */}
        <div className="glass-card rounded-2xl p-5 border border-white/15 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Saldo Líquido Disponível</span>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Saúde orçamentária equilibrada</span>
          </div>
        </div>

        {/* Total Receitas */}
        <div className="glass-card rounded-2xl p-5 border border-white/15 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Entradas do Mês (Receitas)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
            + R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {transactions.filter(t => t.type === 'income').length} lançamentos de entrada
          </div>
        </div>

        {/* Total Despesas */}
        <div className="glass-card rounded-2xl p-5 border border-white/15 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Saídas do Mês (Despesas)</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 tracking-tight">
            - R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {transactions.filter(t => t.type === 'expense').length} despesas contabilizadas
          </div>
        </div>
      </div>

      {/* 2. Orçamentos por Categoria (Funcionalidade 3) */}
      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Metas & Tetos de Gastos por Categoria</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                Alerta de 80% & 100%
              </span>
            </h3>
            <p className="text-xs text-slate-400">Acompanhe visualmente o ritmo de gastos antes de estourar a meta</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {budgets.map((b) => {
            const percentage = Math.min(100, Math.round((b.spent / b.allocated) * 100));
            const isNearLimit = percentage >= 80 && percentage < 100;
            const isOverLimit = b.spent >= b.allocated;

            return (
              <div key={b.category} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{b.category}</span>
                  <span className={`text-xs font-bold ${
                    isOverLimit ? 'text-rose-400' : isNearLimit ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOverLimit 
                        ? 'bg-rose-500' 
                        : isNearLimit 
                        ? 'bg-amber-400' 
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Gasto: R$ {b.spent.toFixed(2)}</span>
                  <span>Teto: R$ {b.allocated.toFixed(2)}</span>
                </div>

                {isOverLimit && (
                  <div className="flex items-center gap-1 text-[11px] text-rose-300 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Teto ultrapassado em R$ {(b.spent - b.allocated).toFixed(2)}!</span>
                  </div>
                )}
                {isNearLimit && (
                  <div className="flex items-center gap-1 text-[11px] text-amber-300 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Atenção: 80% do limite consumido</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Extrato Inteligente e Filtros (Funcionalidade 4) */}
      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">Extrato de Lançamentos Recentes</h3>
            <p className="text-xs text-slate-400">Filtre, pesquise ou exclua transações do histórico</p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="search-transactions-input"
                type="text"
                placeholder="Buscar por descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-8 pr-3 py-1.5 rounded-xl text-xs w-48 sm:w-56"
              />
            </div>

            <select
              id="select-filter-type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="glass-input px-3 py-1.5 rounded-xl text-xs bg-slate-900 text-slate-200 cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">Todos os tipos</option>
              <option value="expense" className="bg-slate-900 text-white">Apenas Despesas</option>
              <option value="income" className="bg-slate-900 text-white">Apenas Receitas</option>
            </select>
          </div>
        </div>

        {/* Transactions Table/List */}
        <div className="space-y-2">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              Nenhuma transação encontrada com os filtros atuais.
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div 
                key={tx.id}
                className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between gap-3 transition-colors text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    tx.type === 'income' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {tx.type === 'income' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>

                  <div>
                    <span className="font-semibold text-white block text-sm">{tx.title}</span>
                    <div className="flex items-center gap-2 text-slate-400 mt-0.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-medium">
                        {tx.category}
                      </span>
                      <span>•</span>
                      <span>{tx.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${
                    tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {tx.type === 'income' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                  </span>

                  <button
                    id={`btn-delete-tx-${tx.id}`}
                    onClick={() => handleDeleteTransaction(tx.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Excluir lançamento"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal: Adicionar Transação (Funcionalidade 1: Core Loop) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="glass-card w-full max-w-md rounded-3xl p-6 relative border border-white/20 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Nova Transação</h3>
            <p className="text-xs text-slate-300 mb-5">Adicione um gasto ou receita em menos de 8 segundos</p>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setNewType('expense')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    newType === 'expense'
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Despesa (-)
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('income')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    newType === 'income'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Receita (+)
                </button>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Valor (R$)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">R$</span>
                  <input
                    id="input-tx-amount"
                    type="number"
                    step="0.01"
                    required
                    autoFocus
                    placeholder="0,00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-base font-bold text-white"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Descrição</label>
                <input
                  id="input-tx-title"
                  type="text"
                  required
                  placeholder="Ex: Almoço, Farmácia, Uber..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="glass-input w-full px-4 py-2.5 rounded-xl text-xs"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Categoria</label>
                <select
                  id="select-tx-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="glass-input w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900 text-white cursor-pointer"
                >
                  {newType === 'expense' ? (
                    <>
                      <option value="Alimentação" className="bg-slate-900 text-white">Alimentação</option>
                      <option value="Transporte" className="bg-slate-900 text-white">Transporte</option>
                      <option value="Moradia" className="bg-slate-900 text-white">Moradia</option>
                      <option value="Lazer" className="bg-slate-900 text-white">Lazer</option>
                      <option value="Saúde" className="bg-slate-900 text-white">Saúde</option>
                      <option value="Educação" className="bg-slate-900 text-white">Educação</option>
                      <option value="Outros" className="bg-slate-900 text-white">Outros</option>
                    </>
                  ) : (
                    <>
                      <option value="Salário" className="bg-slate-900 text-white">Salário</option>
                      <option value="Renda Extra" className="bg-slate-900 text-white">Renda Extra</option>
                      <option value="Investimentos" className="bg-slate-900 text-white">Investimentos</option>
                      <option value="Outros" className="bg-slate-900 text-white">Outros</option>
                    </>
                  )}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 px-3 rounded-xl glass-pill hover:bg-white/10 text-xs text-slate-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  id="btn-confirm-add-tx"
                  type="submit"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Salvar Transação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
