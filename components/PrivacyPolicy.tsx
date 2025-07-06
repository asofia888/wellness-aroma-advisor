
import React from 'react';
import { Button } from './Button';
import { getPrivacyPolicy, uiStrings } from '../i18n';
import { sanitizeStaticContent } from '../utils/sanitizer';

interface PrivacyPolicyProps {
  onBack: () => void;
  language: 'ja' | 'en';
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack, language }) => {
  const policy = getPrivacyPolicy(language);
  const strings = uiStrings[language].privacyPolicy;
    
  const PolicySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-emerald-700 mb-2 border-b-2 border-emerald-100 pb-1" style={{ fontFamily: "'Shippori Mincho', serif" }}>{title}</h3>
      <div className="text-gray-700 space-y-3 leading-relaxed" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border border-emerald-200">
      <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-6 text-center" style={{ fontFamily: "'Shippori Mincho', serif" }}>
        {policy.title}
      </h2>
      
      <p className="text-right text-sm text-gray-500 mb-6" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        {policy.effectiveDate}
      </p>

      {policy.sections.map((section, index) => (
         <PolicySection key={index} title={section.title}>
            {section.content.map((p, pIndex) => (
                <div 
                  key={pIndex} 
                  dangerouslySetInnerHTML={{ 
                    __html: sanitizeStaticContent(p)
                  }} 
                />
            ))}
         </PolicySection>
      ))}

      <div className="text-center mt-10">
        <Button onClick={onBack} variant="secondary" size="large">
          {strings.backButton}
        </Button>
      </div>
    </div>
  );
};
