import React from 'react';
import { DiagnosisPattern, EssentialOilRecommendation, GeneralOilApplication, AcupointApplication } from '../types';
import { Button } from './Button';
import type { CombinedDiagnosis } from '../App';
import { uiStrings } from '../i18n';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DetailItemProps {
  label: string;
  items: string[];
  className?: string;
}

export interface DiagnosisResultProps {
  diagnosis: CombinedDiagnosis;
  onStartOver: () => void;
  aiAnalysis: string;
  isAnalyzing: boolean;
  language: 'ja' | 'en';
  onExportPDF?: () => void;
}

const AiAnalysisCard: React.FC<{ analysis: string; isLoading: boolean; language: 'ja' | 'en' }> = ({ analysis, isLoading, language }) => {
  const strings = uiStrings[language].result;
  if (isLoading) {
    return (
      <section className="mt-10 p-6 bg-gradient-to-tr from-sky-100 to-cyan-100 rounded-lg shadow-lg border border-sky-200 text-center">
        <h3 className="text-xl font-semibold text-sky-700 mb-4 flex items-center justify-center" style={{ fontFamily: "'Shippori Mincho', serif" }}>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {strings.aiLoading}
        </h3>
        <p className="text-sm text-gray-600" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
          {strings.aiLoadingMessage}
        </p>
      </section>
    );
  }

  if (!analysis) return null;

  return (
    <section className="mt-10 p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-lg shadow-xl border border-purple-200">
      <h3 className="text-xl md:text-2xl font-semibold text-purple-700 mb-4 text-center" style={{ fontFamily: "'Shippori Mincho', serif" }}>
        💎 {strings.aiAnalysisTitle} 💎
      </h3>
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        {analysis}
      </div>
    </section>
  );
};


const DetailList: React.FC<DetailItemProps> = ({ label, items, className }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className={`mt-2 ${className}`}>
      <h5 className="font-semibold text-emerald-600 text-sm">{label}:</h5>
      <ul className="list-disc list-inside text-xs text-gray-600 pl-2 space-y-0.5" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const OilCard: React.FC<{ oil: EssentialOilRecommendation; isSecondary?: boolean, language: 'ja' | 'en' }> = ({ oil, isSecondary, language }) => {
    const strings = uiStrings[language].result;
    const roleText = oil.role ? (language === 'ja' ? `${oil.role}：` : `${oil.role}: `) : '';
    return (
        <div className={`p-4 md:p-6 rounded-lg shadow-md border transform transition-all hover:scale-105 hover:shadow-lg ${isSecondary ? 'bg-indigo-50 border-indigo-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <h4 className={`text-lg md:text-xl font-semibold mb-2 flex items-center ${isSecondary ? 'text-indigo-700' : 'text-emerald-700'}`}>
            <span className="text-xl md:text-2xl mr-2">{oil.icon || '💧'}</span>
            {roleText}{oil.name}
            {oil.scientificName && <span className="text-xs text-gray-500 ml-2 italic" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>({oil.scientificName})</span>}
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{oil.description}</p>
            
            <DetailList label={strings.mainActions} items={oil.mainActions} />

            {!isSecondary && oil.precautions && oil.precautions.length > 0 && (
            <details className="mt-2 group">
                <summary className="cursor-pointer text-xs font-medium text-amber-700 hover:text-amber-800 group-open:mb-1" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                {strings.precautions}
                </summary>
                <ul className="list-disc list-inside text-xs text-amber-900 bg-amber-50 p-2 rounded-md border border-amber-200 pl-4 space-y-0.5" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                {oil.precautions.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
                </ul>
            </details>
            )}

            {!isSecondary && oil.alternativeUses && oil.alternativeUses.length > 0 && (
            <details className="mt-2 group">
                <summary className="cursor-pointer text-xs font-medium text-sky-700 hover:text-sky-800 group-open:mb-1" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                {strings.alternativeUses}
                </summary>
                <ul className="list-disc list-inside text-xs text-sky-900 bg-sky-50 p-2 rounded-md border border-sky-200 pl-4 space-y-0.5" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                {oil.alternativeUses.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
                </ul>
            </details>
            )}
        </div>
    );
};

const GeneralOilApplicationCard: React.FC<{ application: GeneralOilApplication }> = ({ application }) => (
  <div className="p-4 bg-lime-50 rounded-md border border-lime-200 shadow-sm">
    <h5 className="font-semibold text-lime-700 mb-1 flex items-center">
      {application.icon && <span className="text-lg mr-2">{application.icon}</span>}
      {application.methodName}
    </h5>
    <p className="text-sm text-gray-700" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{application.description}</p>
  </div>
);

const AcupointCard: React.FC<{ acupoint: AcupointApplication, language: 'ja' | 'en' }> = ({ acupoint, language }) => {
    const strings = uiStrings[language].result;
    return (
        <div className="bg-teal-50 p-4 md:p-6 rounded-lg shadow-md border border-teal-200 mb-4">
            <h4 className="text-lg md:text-xl font-medium text-teal-700 mb-2 text-center">{strings.recommendedAcupoint}: {acupoint.point}</h4>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base my-4 whitespace-pre-line" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{acupoint.instruction}</p>
            {acupoint.otherBenefits && acupoint.otherBenefits.length > 0 && (
                <DetailList label={strings.otherBenefits} items={acupoint.otherBenefits} className="text-center" />
            )}
        </div>
    );
};

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ diagnosis, onStartOver, aiAnalysis, isAnalyzing, language, onExportPDF }) => {
  const { primary, secondaries } = diagnosis;
  const strings = uiStrings[language].result;

  const handleExportPDF = async () => {
    const element = document.getElementById('diagnosis-result-content');
    if (!element) return;

    // ローディング状態を表示
    const loadingMessage = language === 'ja' ? 'PDFを生成中...' : 'Generating PDF...';
    alert(loadingMessage);

    try {
      // PDF用のスタイルを適用したクローンを作成
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.width = '800px';
      clonedElement.style.maxWidth = '800px';
      clonedElement.style.margin = '0';
      clonedElement.style.padding = '40px';
      clonedElement.style.backgroundColor = '#ffffff';
      clonedElement.style.fontFamily = "'Noto Sans JP', sans-serif";
      clonedElement.style.fontSize = '14px';
      clonedElement.style.lineHeight = '1.6';
      clonedElement.style.color = '#333333';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.borderRadius = '0';
      clonedElement.style.border = 'none';
      clonedElement.style.transform = 'none';
      clonedElement.style.transformOrigin = 'initial';
      clonedElement.style.backfaceVisibility = 'hidden';
      clonedElement.style.webkitBackfaceVisibility = 'hidden';

      // 詳細要素を開く
      const details = clonedElement.querySelectorAll('details');
      details.forEach(detail => {
        detail.setAttribute('open', 'true');
      });

      // ボタンを非表示
      const buttons = clonedElement.querySelectorAll('button');
      buttons.forEach(button => {
        button.style.display = 'none';
      });

      // セクションの改ページ設定
      const sections = clonedElement.querySelectorAll('section');
      sections.forEach(section => {
        section.style.pageBreakInside = 'avoid';
        section.style.breakInside = 'avoid';
        section.style.marginBottom = '20px';
      });

      // カード要素の改ページ設定
      const cards = clonedElement.querySelectorAll('[class*="bg-emerald-50"], [class*="bg-indigo-50"], [class*="bg-purple-50"], [class*="bg-teal-50"], [class*="bg-lime-50"]');
      cards.forEach(card => {
        (card as HTMLElement).style.pageBreakInside = 'avoid';
        (card as HTMLElement).style.breakInside = 'avoid';
        (card as HTMLElement).style.marginBottom = '15px';
        (card as HTMLElement).style.borderRadius = '8px';
        (card as HTMLElement).style.padding = '15px';
      });

      // リスト要素の改ページ設定
      const lists = clonedElement.querySelectorAll('ul, ol');
      lists.forEach(list => {
        (list as HTMLElement).style.pageBreakInside = 'avoid';
        (list as HTMLElement).style.breakInside = 'avoid';
      });

      // 段落の改ページ設定
      const paragraphs = clonedElement.querySelectorAll('p');
      paragraphs.forEach(p => {
        (p as HTMLElement).style.pageBreakInside = 'avoid';
        (p as HTMLElement).style.breakInside = 'avoid';
        (p as HTMLElement).style.marginBottom = '8px';
      });

      // 見出しの改ページ設定
      const headings = clonedElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        (heading as HTMLElement).style.pageBreakAfter = 'avoid';
        (heading as HTMLElement).style.breakAfter = 'avoid';
        (heading as HTMLElement).style.marginTop = '20px';
        (heading as HTMLElement).style.marginBottom = '10px';
      });

      // 一時的にDOMに追加
      document.body.appendChild(clonedElement);
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      clonedElement.style.visibility = 'hidden';
      clonedElement.style.opacity = '0';

      // 少し待ってからキャンバス生成
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(clonedElement, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: clonedElement.scrollHeight,
        logging: false,
        removeContainer: true,
        foreignObjectRendering: false,
        imageTimeout: 0,
        ignoreElements: (element) => {
          return element.tagName === 'BUTTON' || 
                 element.classList.contains('animate-spin') ||
                 (element as HTMLElement).style.display === 'none';
        }
      });

      // クローン要素を削除
      document.body.removeChild(clonedElement);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const imgWidth = pdfWidth - (margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = margin;
      let pageCount = 1;

      // ヘッダーを追加
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('アロマカウンセリング診断結果', pdfWidth / 2, 10, { align: 'center' });

      // 最初のページを追加
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, position + 10, imgWidth, imgHeight);
      
      // ページ番号を追加
      pdf.setFontSize(10);
      pdf.text(`ページ ${pageCount}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
      
      heightLeft -= (pdfHeight - (margin * 2) - 20);

      // 残りのページを追加（重複を防ぐため、より慎重に計算）
      while (heightLeft > 0) {
        pdf.addPage();
        pageCount++;
        
        // 正確な位置計算
        const pageHeight = pdfHeight - (margin * 2) - 20;
        const remainingHeight = Math.max(0, heightLeft - pageHeight);
        position = heightLeft - remainingHeight - imgHeight + margin;
        
        // ヘッダーを追加
        pdf.setFontSize(12);
        pdf.setTextColor(100, 100, 100);
        pdf.text('アロマカウンセリング診断結果', pdfWidth / 2, 10, { align: 'center' });
        
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, position + 10, imgWidth, imgHeight);
        
        // ページ番号を追加
        pdf.setFontSize(10);
        pdf.text(`ページ ${pageCount}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
        
        heightLeft = remainingHeight;
      }

      const filename = `${strings.pdfFilename || 'diagnosis-result'}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);
      
      // 成功メッセージを表示
      const successMessage = language === 'ja' ? 'PDFが正常に生成されました！' : 'PDF generated successfully!';
      alert(successMessage);
      
      if (onExportPDF) {
        onExportPDF();
      }
    } catch (error) {
      console.error('PDF export failed:', error);
      const errorMessage = language === 'ja' ? 'PDFの生成に失敗しました。もう一度お試しください。' : 'PDF generation failed. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <>
      <div id="diagnosis-result-content" className="p-4 md:p-8 bg-white shadow-2xl rounded-xl border border-emerald-300 max-w-2xl mx-auto" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
        <div style={{ fontFamily: "'Shippori Mincho', serif" }}>
            {/* Primary Diagnosis Section */}
            <div className="text-center mb-8">
              <span className="text-5xl mb-3 inline-block">{primary.icon}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-2">{strings.primaryDiagnosisTitle} {primary.name}</h2>
              <p className="text-md md:text-lg text-emerald-600 italic">{strings.primaryDiagnosisSubtitle}</p>
            </div>
            
            {/* AI Analysis Section */}
            <AiAnalysisCard analysis={aiAnalysis} isLoading={isAnalyzing} language={language}/>

            <div className="space-y-6 text-gray-700 leading-relaxed mt-10" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
              <div className="p-4 bg-green-50 rounded-md border-l-4 border-green-500">
                  <p className="font-semibold text-green-700">{strings.currentStateTitle}</p>
                  <p className="italic text-sm md:text-base">"{primary.metaphor}"</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-md border-l-4 border-yellow-500">
                  <p className="font-semibold text-yellow-700">{strings.causeTitle}</p>
                  <p className="text-sm md:text-base">{primary.cause}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-md border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-700">{strings.hopeTitle}</p>
                  <p className="text-sm md:text-base">{primary.hope}</p>
              </div>

              <section className="mt-8 pt-6 border-t border-emerald-200">
                  <h3 className="text-xl md:text-2xl font-semibold text-emerald-700 mb-6 text-center" style={{ fontFamily: "'Shippori Mincho', serif" }}>{strings.recommendedOilsTitle.replace('{diagnosis_name}', primary.name)}</h3>
                  <div className="space-y-6">
                  {primary.oils.map((oil, index) => (
                      <OilCard key={`${oil.name}-primary-${index}`} oil={oil} language={language} />
                  ))}
                  </div>
              </section>
            </div>
            
            {/* Secondary Diagnoses Section */}
            {secondaries && secondaries.length > 0 && (
              <section id="secondary-diagnoses-section" className="mt-10 pt-8 border-t-2 border-indigo-200">
                <h3 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-6 text-center" style={{ fontFamily: "'Shippori Mincho', serif" }}>
                  🌿 {strings.secondaryDiagnosisTitle} 🌿
                </h3>
                <p className="text-center text-sm text-gray-600 mb-6 px-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {strings.secondaryDiagnosisMessage.replace('{primary_name}', primary.name)}
                </p>
                {secondaries.map((secDiag, index) => (
                  <div key={`${secDiag.name}-${index}`} className="secondary-pattern-block mb-8 p-6 bg-indigo-50 rounded-lg shadow-lg border border-indigo-200">
                    <div className="text-center mb-4">
                      <span className="text-4xl mb-2 inline-block">{secDiag.icon}</span>
                      <h4 className="text-xl font-bold text-indigo-600" style={{ fontFamily: "'Shippori Mincho', serif" }}>{secDiag.name}</h4>
                    </div>
                    <p className="italic text-sm text-center text-gray-700 mb-4" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>"{secDiag.metaphor}"</p>
                    
                    <div className="mb-4">
                      <h5 className="font-semibold text-indigo-700 text-sm mb-1">{strings.secondaryOilsTitle}</h5>
                      <div className="space-y-3">
                        {secDiag.oils.filter(oil => (language === 'ja' ? (oil.role === '君' || oil.role === '臣') : (oil.role === 'Emperor' || oil.role === 'Minister'))).slice(0, 2).map(oil => (
                           <div key={oil.name} className="pl-2">
                             <p className="text-sm text-gray-700" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                                <span className="font-medium">{(oil.role ? (language === 'ja' ? `${oil.role}：` : `${oil.role}: `) : '')}{oil.name}</span>
                                <span className="text-xs text-gray-500 italic ml-1">({oil.scientificName})</span>
                             </p>
                             <p className="text-xs text-gray-600 pl-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{oil.description.substring(0,100)}...</p>
                           </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <h5 className="font-semibold text-indigo-700 text-sm mb-1">{strings.secondaryLifestyleTitle}</h5>
                       <ul className="list-disc list-inside text-xs text-gray-600 pl-2 space-y-0.5" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                        {secDiag.lifestyleAdvice.slice(0, 2).map((advice, idx) => (
                          <li key={idx}>{advice.split('：')[1] || advice.split(': ')[1] || advice}</li> 
                        ))}
                      </ul>
                    </div>
                     <p className="text-xs text-center text-indigo-500 mt-4" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                        {strings.secondaryDisclaimer}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* Additional Oils Section (common based on text input) */}
            {primary.additionalOils && primary.additionalOils.length > 0 && (
                <section className="mt-8 pt-6 border-t border-emerald-200">
                <h3 className="text-xl md:text-2xl font-semibold text-teal-700 mb-6 text-center" style={{ fontFamily: "'Shippori Mincho', serif" }}>
                    💡 {strings.additionalOilsTitle} 💡
                </h3>
                <p className="text-center text-sm text-gray-600 mb-4" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {strings.additionalOilsMessage}
                </p>
                <div className="space-y-6">
                    {primary.additionalOils.map((oil, index) => (
                      <OilCard key={`${oil.name}-additional-${index}`} oil={oil} isSecondary={false} language={language} />
                    ))}
                </div>
                </section>
            )}

            {/* Acupoints and General Applications (from Primary Diagnosis) */}
            <section className="mt-8 pt-6 border-t border-emerald-200">
                <h3 className="text-xl md:text-2xl font-semibold text-emerald-700 mb-4 text-center" style={{ fontFamily: "'Shippori Mincho', serif" }}>{strings.usageAndAcupointsTitle.replace('{diagnosis_name}', primary.name)}</h3>
                {primary.acupointApplication && primary.acupointApplication.length > 0 && (
                primary.acupointApplication.map((acupoint, index) => (
                    <AcupointCard key={`${acupoint.point}-primary-${index}`} acupoint={acupoint} language={language}/>
                ))
                )}
                
                {primary.generalOilApplications && primary.generalOilApplications.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-lg md:text-xl font-medium text-emerald-700 mb-3 text-center" style={{ fontFamily: "'Shippori Mincho', serif" }}>{strings.otherUsesTitle}</h4>
                    <div className="space-y-4">
                    {primary.generalOilApplications.map((app, index) => (
                        <GeneralOilApplicationCard key={`general-app-primary-${index}`} application={app} />
                    ))}
                    </div>
                </div>
                )}
            </section>

            {/* Lifestyle Advice (from Primary Diagnosis) */}
            {primary.lifestyleAdvice && primary.lifestyleAdvice.length > 0 && (
                <section className="mt-8 pt-6 border-t border-emerald-200">
                <h3 className="text-xl md:text-2xl font-semibold text-purple-700 mb-4 text-center" style={{ fontFamily: "'Shippori Mincho', serif" }}>🌿 {strings.lifestyleAdviceTitle.replace('{diagnosis_name}', primary.name)} 🌿</h3>
                <div className="p-4 md:p-6 bg-purple-50 rounded-lg shadow-md border border-purple-200 space-y-3">
                    {primary.lifestyleAdvice.map((advice, index) => (
                    <div key={`lifestyle-primary-${index}`} className="flex items-start">
                        <span className="text-purple-600 mr-2 text-lg">›</span> 
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                        {advice}
                        </p>
                    </div>
                    ))}
                </div>
                </section>
            )}
        </div>
      </div>
      
      <div className="text-center mt-10 space-y-6">
        <Button onClick={handleExportPDF} variant="primary" size="large" disabled={isAnalyzing}>
          {strings.exportPDFButton || 'PDFをエクスポート'}
        </Button>
        <div className="mt-8">
          <Button onClick={onStartOver} variant="secondary" size="large" disabled={isAnalyzing}>
            {strings.startOverButton}
          </Button>
        </div>
      </div>
    </>
  );
};
