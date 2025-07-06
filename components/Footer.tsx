
import React from 'react';
import { uiStrings } from '../i18n';

interface FooterProps {
  onShowPrivacyPolicy: () => void;
  onShowTerms: () => void;
  language: 'ja' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onShowPrivacyPolicy, onShowTerms, language }) => {
  const strings = uiStrings[language].footer;
  return (
    <footer className="w-full bg-emerald-700 text-emerald-100 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">

        {/* Copyright */}
        <p className="text-sm mb-2 px-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
          &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs mb-2 px-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
          {strings.copyright}
        </p>

        {/* Disclaimer */}
        <p className="text-xs mb-3 leading-relaxed px-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
          {strings.disclaimer}
        </p>

        {/* Links - Mobile responsive */}
        <div className="text-sm">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onShowPrivacyPolicy} 
              className="underline hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded px-1"
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              {strings.privacyPolicy}
            </button>
            <span className="hidden sm:inline text-emerald-300" aria-hidden="true">|</span>
            <button 
              onClick={onShowTerms} 
              className="underline hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded px-1"
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              {strings.termsOfService}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
