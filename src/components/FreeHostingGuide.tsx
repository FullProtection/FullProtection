import React, { useState } from 'react';
import { 
  Cloud, 
  Terminal, 
  Check, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  Github, 
  Zap, 
  ShieldCheck,
  HelpCircle,
  Server
} from 'lucide-react';

export const FreeHostingGuide: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'vercel' | 'netlify'>('vercel');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const vercelJsonContent = `{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  const netlifyTomlContent = `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

  const copyToClipboard = (text: string, filename: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/20 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>Guia 100% Gratuito (Zero Custos de Hospedagem)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Como Hospedar seu App de Finanças na Vercel ou Netlify
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Tanto a <strong>Vercel</strong> quanto o <strong>Netlify</strong> possuem planos gratuitos extremamente generosos para projetos em React, Vite e TypeScript, incluindo CDN global, certificado SSL automático (HTTPS) e deploy contínuo integrado ao GitHub.
          </p>
        </div>
      </div>

      {/* Platform Switcher */}
      <div className="flex items-center justify-center">
        <div className="glass-pill p-1 rounded-2xl flex gap-1 border border-white/15">
          <button
            id="btn-tab-vercel"
            onClick={() => setActivePlatform('vercel')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activePlatform === 'vercel'
                ? 'bg-white text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 1155 1000">
              <path d="m577.3 0 577.4 1000H0z"/>
            </svg>
            <span>Opção 1: Vercel (Recomendado)</span>
          </button>

          <button
            id="btn-tab-netlify"
            onClick={() => setActivePlatform('netlify')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activePlatform === 'netlify'
                ? 'bg-[#00C7B7] text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Opção 2: Netlify</span>
          </button>
        </div>
      </div>

      {/* Vercel Guide */}
      {activePlatform === 'vercel' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Passo a Passo na Vercel</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Plano Hobby (Gratuito para sempre)
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Tempo estimado: 3 minutos</p>
              </div>
              <a
                href="https://vercel.com/signup"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-300 hover:text-emerald-200 flex items-center gap-1 font-semibold"
              >
                <span>Criar conta na Vercel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <ol className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs border border-emerald-500/30">1</span>
                <div>
                  <strong className="text-white block">Suba o código no seu GitHub:</strong>
                  Crie um repositório no GitHub (público ou privado) e faça push deste projeto.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs border border-emerald-500/30">2</span>
                <div>
                  <strong className="text-white block">Acesse a Vercel e importe o repositório:</strong>
                  No dashboard da Vercel (<a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-emerald-300 underline">vercel.com/new</a>), selecione "Continue with GitHub" e escolha o repositório do app.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs border border-emerald-500/30">3</span>
                <div>
                  <strong className="text-white block">Configuração de Build (Automática):</strong>
                  A Vercel reconhece o Vite automaticamente:
                  <ul className="mt-1 space-y-0.5 text-xs text-slate-400 list-disc list-inside">
                    <li>Framework Preset: <code className="text-emerald-300">Vite</code></li>
                    <li>Build Command: <code className="text-emerald-300">npm run build</code></li>
                    <li>Output Directory: <code className="text-emerald-300">dist</code></li>
                  </ul>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs border border-emerald-500/30">4</span>
                <div>
                  <strong className="text-white block">Clique em "Deploy":</strong>
                  Em cerca de 45 segundos, seu app estará no ar com um domínio seguro <code className="text-emerald-300">https://seu-app.vercel.app</code> e certificado SSL gratuito!
                </div>
              </li>
            </ol>

            {/* vercel.json card */}
            <div className="mt-6 rounded-xl bg-black/40 border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-slate-300">vercel.json (Já incluso no projeto)</span>
                </div>
                <button
                  id="btn-copy-vercel-json"
                  onClick={() => copyToClipboard(vercelJsonContent, 'vercel.json')}
                  className="px-2.5 py-1 rounded-lg glass-pill hover:bg-white/15 text-[11px] text-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedFile === 'vercel.json' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar código</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-300 bg-black/50 p-3 rounded-lg overflow-x-auto">
                {vercelJsonContent}
              </pre>
              <p className="text-[11px] text-slate-400">
                💡 <em>Por que este arquivo é essencial?</em> Ele evita o erro "404 Not Found" quando o usuário recarrega a página em rotas internas do React (Single Page Application).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Netlify Guide */}
      {activePlatform === 'netlify' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Passo a Passo no Netlify</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00C7B7]/20 text-[#00C7B7] border border-[#00C7B7]/30">
                    Starter Plan (100GB/mês grátis)
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Tempo estimado: 3 minutos</p>
              </div>
              <a
                href="https://app.netlify.com/signup"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#00C7B7] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Criar conta no Netlify</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <ol className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C7B7]/20 text-[#00C7B7] font-bold flex items-center justify-center shrink-0 text-xs border border-[#00C7B7]/30">1</span>
                <div>
                  <strong className="text-white block">Suba o código no seu GitHub:</strong>
                  Envie seu repositório com o projeto para o GitHub.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C7B7]/20 text-[#00C7B7] font-bold flex items-center justify-center shrink-0 text-xs border border-[#00C7B7]/30">2</span>
                <div>
                  <strong className="text-white block">No Netlify, clique em "Add new site" &gt; "Import an existing project":</strong>
                  Conecte seu perfil do GitHub e autorize o acesso ao repositório do app financeiro.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C7B7]/20 text-[#00C7B7] font-bold flex items-center justify-center shrink-0 text-xs border border-[#00C7B7]/30">3</span>
                <div>
                  <strong className="text-white block">Defina os comandos de Build:</strong>
                  <ul className="mt-1 space-y-0.5 text-xs text-slate-400 list-disc list-inside">
                    <li>Build command: <code className="text-[#00C7B7]">npm run build</code></li>
                    <li>Publish directory: <code className="text-[#00C7B7]">dist</code></li>
                  </ul>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C7B7]/20 text-[#00C7B7] font-bold flex items-center justify-center shrink-0 text-xs border border-[#00C7B7]/30">4</span>
                <div>
                  <strong className="text-white block">Clique em "Deploy site":</strong>
                  O Netlify criará sua URL <code className="text-[#00C7B7]">https://seu-app.netlify.app</code> com suporte a deploys automáticos em cada commit.
                </div>
              </li>
            </ol>

            {/* netlify.toml card */}
            <div className="mt-6 rounded-xl bg-black/40 border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00C7B7]" />
                  <span className="text-xs font-mono font-semibold text-slate-300">netlify.toml (Já incluso no projeto)</span>
                </div>
                <button
                  id="btn-copy-netlify-toml"
                  onClick={() => copyToClipboard(netlifyTomlContent, 'netlify.toml')}
                  className="px-2.5 py-1 rounded-lg glass-pill hover:bg-white/15 text-[11px] text-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedFile === 'netlify.toml' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar código</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-300 bg-black/50 p-3 rounded-lg overflow-x-auto">
                {netlifyTomlContent}
              </pre>
              <p className="text-[11px] text-slate-400">
                💡 <em>A regra <code>_redirects</code></em> redireciona todas as requisições para o <code>/index.html</code> garantindo roteamento SPA perfeito.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Free Tier Comparison Card */}
      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>O que você ganha no plano gratuito (Vercel & Netlify)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-semibold text-emerald-300 block">100 GB Banda/mês</span>
            <p className="text-slate-400">Suficiente para centenas de milhares de acessos mensais sem pagar nada.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-semibold text-emerald-300 block">Certificado SSL Grátis</span>
            <p className="text-slate-400">HTTPS automático emitido e renovado pela Let's Encrypt sem configuração.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-semibold text-emerald-300 block">Deploy Contínuo (CI/CD)</span>
            <p className="text-slate-400">Atualização instantânea no ar a cada <code>git push</code> no branch main.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-semibold text-emerald-300 block">Domínio Próprio Grátis</span>
            <p className="text-slate-400">Você pode vincular gratuitamente seu próprio domínio (ex: meugasto.com.br).</p>
          </div>
        </div>
      </div>
    </div>
  );
};
