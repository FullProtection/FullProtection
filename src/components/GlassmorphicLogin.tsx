import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  KeyRound,
  X,
  Send,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { User, LoginFormValues, FormErrors, GlassBackgroundTheme } from '../types';

interface GlassmorphicLoginProps {
  onLoginSuccess: (user: User) => void;
  currentTheme: GlassBackgroundTheme;
  setTheme: (theme: GlassBackgroundTheme) => void;
  onGoToPmSpec?: () => void;
  onGoToAppPreview?: () => void;
}

export const GlassmorphicLogin: React.FC<GlassmorphicLoginProps> = ({
  onLoginSuccess,
  currentTheme,
  setTheme,
  onGoToPmSpec,
  onGoToAppPreview
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<LoginFormValues>({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: true
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [isSendingForgot, setIsSendingForgot] = useState(false);

  // Validation function
  const validateField = (name: string, value: string): string | undefined => {
    if (name === 'email') {
      if (!value.trim()) return 'O e-mail ou ID de usuário é obrigatório.';
      const cleanVal = value.trim().toLowerCase();
      // Accepts email format or alphanumeric username ID (like 'patrick')
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanVal);
      const isUsername = /^[a-zA-Z0-9._-]{3,30}$/.test(cleanVal);
      if (!isEmail && !isUsername) {
        return 'Informe um e-mail válido ou ID de usuário (mínimo 3 caracteres).';
      }
    }
    if (name === 'password') {
      if (!value) return 'A senha é obrigatória.';
      if (value.length < 6) return 'A senha deve conter no mínimo 6 caracteres.';
    }
    if (name === 'confirmPassword' && isRegisterMode) {
      if (!value) return 'Confirme sua senha.';
      if (value !== formData.password) return 'As senhas digitadas não coincidem.';
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newVal
    }));

    if (touched[name]) {
      const err = validateField(name, String(newVal));
      setErrors(prev => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const val = formData[field as keyof LoginFormValues];
    const err = validateField(field, String(val ?? ''));
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched
    setTouched({
      email: true,
      password: true,
      confirmPassword: true
    });

    const emailErr = validateField('email', formData.email);
    const passErr = validateField('password', formData.password);
    const confirmErr = isRegisterMode ? validateField('confirmPassword', formData.confirmPassword || '') : undefined;

    if (emailErr || passErr || confirmErr) {
      setErrors({
        email: emailErr,
        password: passErr,
        confirmPassword: confirmErr
      });
      return;
    }

    // Check Admin account credentials: ID: patrick, senha: 143456
    const cleanId = formData.email.trim().toLowerCase();
    const isPatrickAdmin = cleanId === 'patrick' || cleanId === 'patrick@admin.com';

    if (isPatrickAdmin && formData.password !== '143456') {
      setErrors({
        password: 'Senha incorreta para este usuário.'
      });
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate API authentication delay
    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccess(true);

      const isAdmin = isPatrickAdmin;
      const user: User = {
        id: isAdmin ? 'admin_patrick' : 'usr_' + Math.random().toString(36).substring(2, 9),
        username: isAdmin ? 'patrick' : cleanId.split('@')[0],
        name: isAdmin ? 'Patrick (Admin)' : (formData.email.split('@')[0] || 'Investidor'),
        email: isAdmin ? 'patrick@admin.fincontrol' : formData.email,
        role: isAdmin ? 'admin' : 'user',
        avatarUrl: isAdmin 
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };

      setTimeout(() => {
        onLoginSuccess(user);
      }, 900);
    }, 1000);
  };

  // Demo auto-fill
  const fillDemoAccount = () => {
    setIsRegisterMode(false);
    setFormData({
      email: 'demo.financas@exemplo.com',
      password: 'senhaSegura123',
      confirmPassword: 'senhaSegura123',
      rememberMe: true
    });
    setErrors({});
  };

  // Admin auto-fill: ID: patrick, senha: 143456
  const fillAdminAccount = () => {
    setIsRegisterMode(false);
    setFormData({
      email: 'patrick',
      password: '143456',
      confirmPassword: '143456',
      rememberMe: true
    });
    setErrors({});
  };

  // Handle forgot password submission
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotError('Por favor, informe seu e-mail cadastrado.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail.trim())) {
      setForgotError('Insira um e-mail válido.');
      return;
    }

    setForgotError('');
    setIsSendingForgot(true);

    setTimeout(() => {
      setIsSendingForgot(false);
      setForgotSuccess(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background Ambient Glow Orbs - Glassmorphism Backdrops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {currentTheme === 'aurora' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-teal-500/25 rounded-full blur-3xl animate-float-reverse" />
            <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
          </>
        )}
        {currentTheme === 'emerald' && (
          <>
            <div className="absolute top-1/5 left-1/3 w-96 h-96 bg-green-500/25 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-emerald-600/30 rounded-full blur-3xl animate-float-reverse" />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-lime-400/15 rounded-full blur-2xl" />
          </>
        )}
        {currentTheme === 'midnight' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-blue-600/25 rounded-full blur-3xl animate-float-reverse" />
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl" />
          </>
        )}
        {currentTheme === 'sunset' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/25 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-amber-500/25 rounded-full blur-3xl animate-float-reverse" />
            <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl" />
          </>
        )}
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Top Control Bar: Theme switcher & Quick shortcuts */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-full">
            <span className="text-slate-400 font-medium">Tema:</span>
            {(['aurora', 'emerald', 'midnight', 'sunset'] as GlassBackgroundTheme[]).map((t) => (
              <button
                key={t}
                id={`theme-btn-${t}`}
                onClick={() => setTheme(t)}
                className={`px-2 py-0.5 rounded-full capitalize transition-all ${
                  currentTheme === t 
                    ? 'bg-white/25 text-white font-semibold shadow-xs' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t === 'aurora' ? 'Aurora' : t === 'emerald' ? 'Esmeralda' : t === 'midnight' ? 'Noite' : 'Sunset'}
              </button>
            ))}
          </div>

          <button
            id="btn-demo-autofill"
            type="button"
            onClick={fillDemoAccount}
            className="flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full text-emerald-300 hover:text-emerald-200 hover:bg-white/15 transition-all cursor-pointer font-medium"
            title="Preencher com e-mail e senha de demonstração"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Conta Demo</span>
          </button>
        </div>

        {/* The Glassmorphic Card Container */}
        <div 
          id="glass-login-card"
          className="glass-card rounded-3xl p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300"
        >
          {/* Header & Logo */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/40 to-teal-400/20 border border-white/25 shadow-lg shadow-emerald-500/20 mb-3.5">
              <span className="text-2xl font-black tracking-tight text-white font-serif">◈</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-xs">
              {isRegisterMode ? 'Criar sua conta' : 'Acesse suas Finanças'}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300/80 font-normal">
              {isRegisterMode 
                ? 'Comece seu controle financeiro pessoal em menos de 1 minuto' 
                : 'Gerencie receitas, despesas e orçamentos com clareza total'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email or User ID Field */}
            <div>
              <label 
                htmlFor="login-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
              >
                E-mail ou ID de Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="seu@email.com ou usuário"
                  className={`glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium ${
                    errors.email 
                      ? 'border-rose-400/80 focus:border-rose-400 focus:shadow-rose-500/20 bg-rose-500/5' 
                      : touched.email && !errors.email 
                      ? 'border-emerald-400/60 focus:border-emerald-400' 
                      : ''
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-300 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="login-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-200"
                >
                  Senha
                </label>
                {!isRegisterMode && (
                  <button
                    id="btn-forgot-password-trigger"
                    type="button"
                    onClick={() => {
                      setForgotEmail(formData.email);
                      setForgotSuccess(false);
                      setForgotError('');
                      setIsForgotModalOpen(true);
                    }}
                    className="text-xs text-emerald-300 hover:text-emerald-200 hover:underline transition-colors font-medium cursor-pointer"
                  >
                    Esqueci minha senha
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  className={`glass-input w-full pl-10 pr-11 py-2.5 rounded-xl text-sm font-medium ${
                    errors.password 
                      ? 'border-rose-400/80 focus:border-rose-400 focus:shadow-rose-500/20 bg-rose-500/5' 
                      : touched.password && !errors.password 
                      ? 'border-emerald-400/60 focus:border-emerald-400' 
                      : ''
                  }`}
                />
                <button
                  id="btn-toggle-password-visibility"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-300 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Confirm Password (Register mode only) */}
            {isRegisterMode && (
              <div>
                <label 
                  htmlFor="login-confirm-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5"
                >
                  Confirmar Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-confirm-password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword || ''}
                    onChange={handleChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    placeholder="Repita a senha"
                    className={`glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium ${
                      errors.confirmPassword 
                        ? 'border-rose-400/80 focus:border-rose-400 focus:shadow-rose-500/20 bg-rose-500/5' 
                        : ''
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-300 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            )}

            {/* Remember Me & Security notice */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
                <input
                  id="check-remember-me"
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded-md border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-400/30 focus:ring-offset-0 cursor-pointer accent-emerald-500"
                />
                <span>Lembrar meu e-mail</span>
              </label>

              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>SSL 256-bit</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="btn-submit-login"
              type="submit"
              disabled={isLoading || authSuccess}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                authSuccess
                  ? 'bg-emerald-500 text-white shadow-emerald-500/40'
                  : isLoading
                  ? 'bg-emerald-600/70 text-white cursor-wait'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  <span>Validando credenciais...</span>
                </>
              ) : authSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Autenticado com sucesso!</span>
                </>
              ) : (
                <>
                  <span>{isRegisterMode ? 'Criar Conta Gratuita' : 'Entrar na Plataforma'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/15" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-slate-900/60 px-3 py-0.5 rounded-full text-slate-400 backdrop-blur-md">
                ou continue com
              </span>
            </div>
          </div>

          {/* Social Logins styled in Glass */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              id="btn-social-google"
              type="button"
              onClick={fillDemoAccount}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl glass-pill hover:bg-white/15 text-xs text-slate-200 transition-all cursor-pointer font-medium"
              title="Entrar com conta Google"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-1.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              id="btn-social-apple"
              type="button"
              onClick={fillDemoAccount}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl glass-pill hover:bg-white/15 text-xs text-slate-200 transition-all cursor-pointer font-medium"
              title="Entrar com Apple ID"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1.01.08 2.02-.49 2.63-1.24z"/>
              </svg>
              <span>Apple</span>
            </button>

            <button
              id="btn-social-guest"
              type="button"
              onClick={fillDemoAccount}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl glass-pill hover:bg-white/15 text-xs text-slate-200 transition-all cursor-pointer font-medium"
              title="Acesso de visitante"
            >
              <Laptop className="w-3.5 h-3.5 text-emerald-400" />
              <span>Demo</span>
            </button>
          </div>

          {/* Toggle between Login and Register */}
          <div className="mt-6 text-center text-xs text-slate-300">
            {isRegisterMode ? (
              <span>
                Já possui uma conta?{' '}
                <button
                  id="btn-switch-to-login"
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(false);
                    setErrors({});
                  }}
                  className="font-bold text-emerald-300 hover:text-emerald-200 underline cursor-pointer ml-1"
                >
                  Fazer login
                </button>
              </span>
            ) : (
              <span>
                Ainda não tem conta?{' '}
                <button
                  id="btn-switch-to-register"
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(true);
                    setErrors({});
                  }}
                  className="font-bold text-emerald-300 hover:text-emerald-200 underline cursor-pointer ml-1"
                >
                  Cadastre-se grátis
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Quick Links below card for evaluating PM spec & App Prototype */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
          {onGoToPmSpec && (
            <button
              id="btn-link-pm-spec"
              onClick={onGoToPmSpec}
              className="hover:text-emerald-300 transition-colors underline cursor-pointer"
            >
              Ver Estrutura do MVP (PM)
            </button>
          )}
          <span>•</span>
          {onGoToAppPreview && (
            <button
              id="btn-link-preview"
              onClick={onGoToAppPreview}
              className="hover:text-emerald-300 transition-colors underline cursor-pointer"
            >
              Explorar Protótipo do App
            </button>
          )}
        </div>
      </div>

      {/* Forgot Password Modal (Glassmorphism) */}
      {isForgotModalOpen && (
        <div 
          id="forgot-password-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <div 
            id="forgot-password-card"
            className="glass-card w-full max-w-md rounded-3xl p-6 sm:p-7 relative border border-white/20 shadow-2xl"
          >
            {/* Close button */}
            <button
              id="btn-close-forgot-modal"
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Recuperar Senha</h3>
                <p className="text-xs text-slate-300">Redefinição segura de credenciais</p>
              </div>
            </div>

            {forgotSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-white">E-mail Enviado!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enviamos as instruções e o link seguro para redefinir sua senha no e-mail:
                  <br />
                  <strong className="text-emerald-300">{forgotEmail}</strong>.
                </p>
                <p className="text-[11px] text-slate-400">
                  Verifique também sua caixa de spam ou lixo eletrônico.
                </p>
                <button
                  id="btn-close-forgot-success"
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="w-full mt-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Voltar para o Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Digite seu e-mail cadastrado. Você receberá um token temporário com link de redefinição imediata.
                </p>

                <div>
                  <label htmlFor="forgot-email-input" className="block text-xs font-medium text-slate-200 mb-1">
                    Seu E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="forgot-email-input"
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        setForgotError('');
                      }}
                      placeholder="exemplo@email.com"
                      className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                      autoFocus
                    />
                  </div>
                  {forgotError && (
                    <p className="text-xs text-rose-300 mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {forgotError}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    id="btn-cancel-forgot"
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="flex-1 py-2.5 px-3 rounded-xl glass-pill hover:bg-white/10 text-xs text-slate-300 font-medium cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    id="btn-send-reset-link"
                    type="submit"
                    disabled={isSendingForgot}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    {isSendingForgot ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar Link</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
