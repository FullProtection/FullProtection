/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GlassmorphicLogin } from './components/GlassmorphicLogin';
import { PmDocumentView } from './components/PmDocumentView';
import { FinanceAppPreview } from './components/FinanceAppPreview';
import { FreeHostingGuide } from './components/FreeHostingGuide';
import { ScreenView, User, GlassBackgroundTheme } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<GlassBackgroundTheme>('aurora');

  // Check saved session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('fincontrol_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('fincontrol_user', JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
    // Switch to app preview on login
    setCurrentScreen('app-preview');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('fincontrol_user');
    } catch {
      // Ignore storage errors
    }
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {currentScreen === 'login' && (
          <GlassmorphicLogin
            onLoginSuccess={handleLoginSuccess}
            currentTheme={theme}
            setTheme={setTheme}
            onGoToPmSpec={() => setCurrentScreen('pm-spec')}
            onGoToAppPreview={() => setCurrentScreen('app-preview')}
          />
        )}

        {currentScreen === 'pm-spec' && (
          <PmDocumentView
            onGoToLogin={() => setCurrentScreen('login')}
            onGoToAppPreview={() => setCurrentScreen('app-preview')}
            onGoToHosting={() => setCurrentScreen('hosting-guide')}
          />
        )}

        {currentScreen === 'app-preview' && (
          <FinanceAppPreview
            user={currentUser}
            onGoToLogin={() => setCurrentScreen('login')}
            onGoToPmSpec={() => setCurrentScreen('pm-spec')}
          />
        )}

        {currentScreen === 'hosting-guide' && (
          <FreeHostingGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-4 text-center text-xs text-slate-500 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            App de Finanças Pessoais • MVP & Design em Glassmorphism com React + Tailwind CSS
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => setCurrentScreen('hosting-guide')}
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Hospedar de Graça na Vercel/Netlify
            </button>
            <span>•</span>
            <button 
              onClick={() => setCurrentScreen('pm-spec')}
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Documento de PM
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

