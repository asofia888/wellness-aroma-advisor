
import React from 'react';
import { uiStrings } from '../i18n';

interface HeaderProps {
    language: 'ja' | 'en';
    setLanguage: (lang: 'ja' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const strings = uiStrings[language];
  const commonButtonClass = "px-3 py-1 text-sm rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-70";
  const activeButtonClass = "bg-white text-emerald-700 font-semibold shadow";
  const inactiveButtonClass = "bg-transparent text-emerald-100 hover:bg-emerald-600";

  return (
    <header className="w-full bg-emerald-700 text-white shadow-lg py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-3 sm:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Shippori Mincho', serif" }}>
            🌿 {strings.appName} 🌿
            </h1>
            <p className="text-emerald-100 mt-1 text-xs md:text-sm" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
            {strings.appSubtitle}
            </p>
        </div>
        <div className="flex space-x-2 border border-emerald-500 rounded-lg p-1">
            <button 
                onClick={() => setLanguage('ja')}
                className={`${commonButtonClass} ${language === 'ja' ? activeButtonClass : inactiveButtonClass}`}
                aria-pressed={language === 'ja'}
            >
                日本語
            </button>
            <button 
                onClick={() => setLanguage('en')}
                className={`${commonButtonClass} ${language === 'en' ? activeButtonClass : inactiveButtonClass}`}
                aria-pressed={language === 'en'}
            >
                English
            </button>
        </div>
      </div>
    </header>
  );
};
