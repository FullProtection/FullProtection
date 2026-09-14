import React from 'react';
import { 
  Lock, 
  FileText, 
  LayoutDashboard, 
  Cloud, 
  LogOut, 
  Sparkles,
  Shield
} from 'lucide-react';
import { ScreenView, User } from '../types';

interface NavbarProps {
  currentScreen: ScreenView;
  onSelectScreen: (screen: ScreenView) => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onSelectScreen,
  currentUser,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectScreen('login')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/80 to-teal-400/80 border border-white/20 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            ◈
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white tracking-tight text-sm sm:text-base">FinControl</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                MVP
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Finanças Pessoais & Glassmorphism</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 glass-pill p-1 rounded-2xl overflow-x-auto max-w-full">
          <button
            id="nav-tab-login"
            onClick={() => onSelectScreen('login')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              currentScreen === 'login'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Login Glassmorphic</span>
          </button>

          <button
            id="nav-tab-pm-spec"
            onClick={() => onSelectScreen('pm-spec')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              currentScreen === 'pm-spec'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Estrutura do MVP (PM)</span>
          </button>

          <button
            id="nav-tab-app-preview"
            onClick={() => onSelectScreen('app-preview')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              currentScreen === 'app-preview'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>App MVP</span>
          </button>

          <button
            id="nav-tab-hosting"
            onClick={() => onSelectScreen('hosting-guide')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              currentScreen === 'hosting-guide'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Deploy Grátis</span>
          </button>
        </nav>

        {/* User status or quick auth */}
        <div className="shrink-0 flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex flex-col text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-xs font-semibold text-white leading-none">
                    {currentUser.name}
                  </span>
                  {currentUser.role === 'admin' && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/25 text-amber-300 border border-amber-400/40 flex items-center gap-0.5">
                      <Shield className="w-2.5 h-2.5" />
                      ADMIN
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-emerald-400 leading-tight">
                  {currentUser.role === 'admin' ? 'Superusuário patrick' : 'Sessão Ativa'}
                </span>
              </div>
              <button
                id="btn-navbar-logout"
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
                title="Sair da conta"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="btn-navbar-enter"
              onClick={() => onSelectScreen('login')}
              className="text-xs font-bold text-emerald-300 hover:text-emerald-200 px-2.5 py-1.5 rounded-xl glass-pill hover:bg-white/15 transition-all cursor-pointer hidden sm:flex items-center gap-1.5"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
