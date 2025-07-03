
import React from 'react';
import { uiStrings } from '../i18n';

interface FooterProps {
  onShowPrivacyPolicy: () => void;
  language: 'ja' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onShowPrivacyPolicy, language }) => {
  const strings = uiStrings[language].footer;
  return (
    <footer className="w-full bg-emerald-700 text-emerald-100 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
          &copy; {new Date().getFullYear()} {strings.copyright}
        </p>
        <p className="text-xs mt-1" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
          {strings.disclaimer}
        </p>
        <div className="mt-4 text-sm flex justify-center items-center space-x-4">
            <button 
                onClick={onShowPrivacyPolicy} 
                className="underline hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded px-1"
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
                {strings.privacyPolicy}
            </button>
            <span className="text-emerald-300" aria-hidden="true">|</span>
            <a
                href="https://buymeacoffee.com/asofia"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded px-1"
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
                {strings.buyMeACoffee}
            </a>
        </div>
      </div>
    </footer>
  );
};
