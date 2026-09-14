import React, { useState } from 'react';
import { 
  Target, 
  Layers, 
  GitFork, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  ArrowRight,
  ExternalLink,
  Flame,
  Zap,
  Clock,
  PieChart
} from 'lucide-react';
import { PM_MVP_FEATURES, PM_USER_FLOW, PM_TECH_STACK } from '../data/pmSpecification';

interface PmDocumentViewProps {
  onGoToLogin: () => void;
  onGoToAppPreview: () => void;
  onGoToHosting: () => void;
}

export const PmDocumentView: React.FC<PmDocumentViewProps> = ({
  onGoToLogin,
  onGoToAppPreview,
  onGoToHosting
}) => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(1);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* PM Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 overflow-hidden glass-card border border-white/20 bg-gradient-to-br from-slate-900/80 via-emerald-950/30 to-slate-900/80">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Documento Estratégico de Produto (PM Spec)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Estrutura do MVP: App de Controle de Gastos & Finanças Pessoais
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Visão de Product Management para lançar um produto de alto impacto, focado em resolver a dor número 1 dos usuários em finanças: 
            <strong> o atrito excessivo no registro diário</strong> que leva ao abandono do app nas primeiras duas semanas.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              id="btn-banner-login"
              onClick={onGoToLogin}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <span>Ver Tela de Login Glassmorphism</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="btn-banner-app"
              onClick={onGoToAppPreview}
              className="px-4 py-2.5 rounded-xl glass-pill hover:bg-white/15 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Testar Protótipo do MVP</span>
            </button>
            <button
              id="btn-banner-hosting"
              onClick={onGoToHosting}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Guia de Hospedagem Grátis (Vercel/Netlify)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Value Proposition & North Star Metric */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">1. Proposta de Valor & Métrica Estrela-Guia</h2>
            <p className="text-xs text-slate-400">O que move o produto e como medimos o sucesso real</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="text-emerald-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Proposta de Valor Central
            </div>
            <p className="text-sm text-slate-200 font-medium">
              "Controle seus gastos em menos de 10 segundos por dia, sem planilhas complexas nem burocracia bancária."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Foco obsessivo em simplicidade de entrada de dados e clareza visual de teto orçamentário.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="text-teal-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> North Star Metric (NSM)
            </div>
            <p className="text-sm text-slate-200 font-medium">
              Transações Registradas por Usuário Ativo Semanal (WAU)
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Meta saudável de MVP: pelo menos 5 lançamentos/semana por usuário retido na base.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="text-cyan-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Time to Value (TTV)
            </div>
            <p className="text-sm text-slate-200 font-medium">
              Primeiro gasto lançado em menos de 60 segundos
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero barreiras no onboarding: categorias pré-configuradas e lançamento com 2 toques.
            </p>
          </div>
        </div>
      </section>

      {/* 2. As 5 Funcionalidades Principais do MVP */}
      <section className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">2. As 5 Funcionalidades Principais do MVP</h2>
              <p className="text-xs text-slate-400">Escopo enxuto, de alto impacto e validação rápida</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Clique no card para ver critérios de aceite
          </span>
        </div>

        <div className="space-y-3">
          {PM_MVP_FEATURES.map((feature) => {
            const isExpanded = expandedFeature === feature.id;
            return (
              <div 
                key={feature.id}
                className="glass-card rounded-2xl border border-white/15 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFeature(isExpanded ? null : feature.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-base font-bold text-white">{feature.title}</span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                        {feature.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                      {feature.objective}
                    </p>
                  </div>
                  <div className="shrink-0 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/10 bg-black/20 space-y-4 text-xs">
                    <div>
                      <span className="font-semibold text-slate-300 block mb-1">User Story:</span>
                      <p className="text-slate-300 italic bg-white/5 p-2.5 rounded-lg border border-white/10">
                        "{feature.userStory}"
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-300 block mb-1.5">Critérios de Aceite (Acceptance Criteria):</span>
                      <ul className="space-y-1.5">
                        {feature.acceptanceCriteria.map((crit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-slate-400">
                      <span className="font-medium text-emerald-400">KPI de Sucesso:</span>
                      <span className="font-semibold text-slate-200">{feature.kpi}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Fluxo de Navegação do Usuário (User Flow) */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">3. Fluxo de Navegação do Usuário (User Flow)</h2>
            <p className="text-xs text-slate-400">Mapeamento da jornada de ponta a ponta sem becos sem saída</p>
          </div>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/30 space-y-6">
          {PM_USER_FLOW.map((flow, index) => (
            <div key={flow.step} className="relative group">
              {/* Bullet circle */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-300 shadow-md shadow-emerald-500/20">
                {index + 1}
              </div>

              <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2 hover:border-emerald-400/40 transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">PASSO {flow.step}</span>
                    <span className="text-slate-600">•</span>
                    <h3 className="text-sm font-bold text-white">{flow.title}</h3>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                    Tela: {flow.screen}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {flow.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {flow.actions.map((act, idx) => (
                    <span key={idx} className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">
                      ✓ {act}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Stack Tecnológica Moderna Recomendada */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">4. Stack Tecnológica Moderna Sugerida</h2>
            <p className="text-xs text-slate-400">Produtividade extrema, zero custo de infraestrutura no MVP e escalabilidade</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PM_TECH_STACK.map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-white/15 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{item.category}</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{item.technology}</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0">
                  {item.freeTierStatus}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-slate-200">
                  <strong className="text-slate-300">Papel:</strong> {item.role}
                </p>
                <p className="text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Por que escolher:</strong> {item.rationale}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Segurança & LGPD para Finanças */}
      <section className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/20 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Diretrizes de Segurança & LGPD para Finanças</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Mesmo no estágio de MVP, dados financeiros exigem rigor:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
          <li className="bg-black/30 p-3 rounded-xl border border-white/10">
            <strong className="text-emerald-300 block mb-1">Isolamento com RLS</strong>
            Garantir Row-Level Security no banco para que uma conta jamais acerte ou visualize registros de outro usuário.
          </li>
          <li className="bg-black/30 p-3 rounded-xl border border-white/10">
            <strong className="text-emerald-300 block mb-1">Criptografia em Trânsito</strong>
            Forçar conexão HTTPS e cabeçalhos seguros HSTS através da Vercel/Netlify.
          </li>
          <li className="bg-black/30 p-3 rounded-xl border border-white/10">
            <strong className="text-emerald-300 block mb-1">Direito ao Esquecimento</strong>
            Permitir que o usuário exporte seus dados e exclua sua conta definitivamente em conformidade com a LGPD.
          </li>
        </ul>
      </section>
    </div>
  );
};
