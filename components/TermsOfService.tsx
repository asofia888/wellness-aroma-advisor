import React from 'react';

interface TermsOfServiceProps {
  onBack: () => void;
  language: 'ja' | 'en';
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack, language }) => {
  const content = {
    ja: {
      title: '利用規約',
      backButton: '戻る',
      sections: {
        service: {
          title: '1. サービスについて',
          content: `本サービス「東洋医学統合アロマ診断システム」は、東洋医学の理論に基づいて体質傾向を分析し、アロマテラピーの観点から精油の提案を行うウェブアプリケーションです。本サービスは教育・情報提供を目的としており、医療行為や医学的診断を行うものではありません。`
        },
        disclaimer: {
          title: '2. 免責事項',
          content: `
• 本サービスは医療機器ではなく、医学的診断、治療、予防を目的とするものではありません
• 提供される情報は一般的な教育目的のみであり、個人の医学的状態に関する専門的なアドバイスの代替とはなりません
• 健康上の問題がある場合は、必ず医師や有資格の医療従事者にご相談ください
• 精油の使用に関しては、アレルギー反応や副作用の可能性があります。使用前にパッチテストを行い、妊娠中、授乳中、持病のある方は専門家にご相談ください
• 本サービスの利用により生じた直接的または間接的な損害について、当サービスは一切の責任を負いません`
        },
        usage: {
          title: '3. 利用上の注意',
          content: `
• 本診断結果は参考情報であり、確定的な体質判定ではありません
• 精油の使用は自己責任で行ってください
• 肌に異常を感じた場合は直ちに使用を中止してください
• 3歳未満の乳幼児への精油の使用は推奨されません
• 妊娠中・授乳中の方は使用前に医師にご相談ください`
        },
        dataHandling: {
          title: '4. データの取り扱い',
          content: `
• 入力された診断データは、診断結果の生成のみに使用されます
• 個人を特定できる情報の収集は行いません
• AI分析のためにGoogle Gemini APIを使用しており、プライバシーポリシーはGoogleの規約に準拠します
• セッション終了時にローカルデータは削除されます`
        },
        intellectual: {
          title: '5. 知的財産権',
          content: `本サービスに含まれるコンテンツ、デザイン、プログラムの著作権は当サービス提供者に帰属します。無断での複製、転載、配布を禁止します。`
        },
        changes: {
          title: '6. 規約の変更',
          content: `本利用規約は予告なく変更される場合があります。変更後の規約は本ページに掲載された時点で効力を発します。`
        },
        governing: {
          title: '7. 準拠法',
          content: `本利用規約は日本国法に準拠し、東京地方裁判所を専属的合意管轄裁判所とします。`
        }
      }
    },
    en: {
      title: 'Terms of Service',
      backButton: 'Back',
      sections: {
        service: {
          title: '1. About This Service',
          content: `This service "Traditional Medicine Integrated Aroma Diagnosis System" analyzes constitutional tendencies based on Traditional Chinese Medicine theory and provides essential oil recommendations from an aromatherapy perspective. This service is for educational and informational purposes only and does not provide medical treatment or medical diagnosis.`
        },
        disclaimer: {
          title: '2. Disclaimer',
          content: `
• This service is not a medical device and is not intended for medical diagnosis, treatment, or prevention
• The information provided is for general educational purposes only and is not a substitute for professional medical advice regarding individual medical conditions
• If you have health concerns, please consult a physician or qualified healthcare professional
• Essential oil use may cause allergic reactions or side effects. Perform a patch test before use, and pregnant, nursing, or individuals with medical conditions should consult professionals
• We assume no responsibility for any direct or indirect damages arising from the use of this service`
        },
        usage: {
          title: '3. Usage Guidelines',
          content: `
• Diagnosis results are reference information only and not definitive constitutional determinations
• Use essential oils at your own risk
• Discontinue use immediately if skin irritation occurs
• Essential oil use is not recommended for children under 3 years
• Pregnant and nursing women should consult a physician before use`
        },
        dataHandling: {
          title: '4. Data Handling',
          content: `
• Input diagnostic data is used solely for generating diagnosis results
• We do not collect personally identifiable information
• Google Gemini API is used for AI analysis, and privacy policies comply with Google's terms
• Local data is deleted upon session termination`
        },
        intellectual: {
          title: '5. Intellectual Property',
          content: `Copyright of content, design, and programs included in this service belongs to the service provider. Unauthorized reproduction, redistribution, or distribution is prohibited.`
        },
        changes: {
          title: '6. Changes to Terms',
          content: `These terms of service may be changed without notice. Modified terms take effect when posted on this page.`
        },
        governing: {
          title: '7. Governing Law',
          content: `These terms are governed by Japanese law, with Tokyo District Court as the exclusive agreed jurisdiction.`
        }
      }
    }
  };

  const t = content[language];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="card">
        <div className="card-header">
          <h1 className="text-2xl font-bold text-center">{t.title}</h1>
        </div>
        <div className="card-body">
          <div className="space-y-6">
            {Object.entries(t.sections).map(([key, section]) => (
              <div key={key} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              {language === 'ja' 
                ? '最終更新日: 2024年7月4日' 
                : 'Last updated: July 4, 2024'
              }
            </p>
            <button
              onClick={onBack}
              className="btn-primary"
            >
              {t.backButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};