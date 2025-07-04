import React, { useState } from 'react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
  language: 'ja' | 'en';
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onAccept, language }) => {
  const [hasRead, setHasRead] = useState(false);

  if (!isOpen) return null;

  const content = {
    ja: {
      title: '重要な免責事項',
      subtitle: 'ご利用前に必ずお読みください',
      points: [
        '本サービスは医療機器ではなく、医学的診断や治療を目的とするものではありません',
        '提供される情報は教育・参考目的のみであり、医学的アドバイスの代替ではありません',
        '健康上の問題がある場合は、必ず医師にご相談ください',
        '精油の使用は自己責任で行い、アレルギー反応に注意してください',
        '妊娠中・授乳中・持病のある方は、使用前に専門家にご相談ください',
        '本サービスの利用により生じた損害について、当サービスは責任を負いません'
      ],
      warning: '⚠️ 本診断は参考情報です。医学的判断や治療には使用しないでください。',
      checkboxLabel: '上記の免責事項を理解し、同意します',
      acceptButton: '同意して開始',
      readFirst: '免責事項をお読みください'
    },
    en: {
      title: 'Important Disclaimer',
      subtitle: 'Please read carefully before use',
      points: [
        'This service is not a medical device and is not intended for medical diagnosis or treatment',
        'Information provided is for educational/reference purposes only and not a substitute for medical advice',
        'If you have health concerns, please consult a physician',
        'Use essential oils at your own risk and be aware of potential allergic reactions',
        'Pregnant, nursing, or individuals with medical conditions should consult professionals before use',
        'We assume no responsibility for damages arising from the use of this service'
      ],
      warning: '⚠️ This diagnosis is reference information only. Do not use for medical judgment or treatment.',
      checkboxLabel: 'I understand and agree to the above disclaimer',
      acceptButton: 'Agree & Start',
      readFirst: 'Please read the disclaimer'
    }
  };

  const t = content[language];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="card-header bg-red-500">
          <h2 className="text-xl font-bold text-center">{t.title}</h2>
          <p className="text-center text-red-100 mt-2">{t.subtitle}</p>
        </div>
        
        <div className="p-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-800 font-medium">{t.warning}</p>
          </div>
          
          <div className="space-y-3 mb-6">
            {t.points.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasRead}
                onChange={(e) => setHasRead(e.target.checked)}
                className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{t.checkboxLabel}</span>
            </label>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={onAccept}
              disabled={!hasRead}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                hasRead
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {hasRead ? t.acceptButton : t.readFirst}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};