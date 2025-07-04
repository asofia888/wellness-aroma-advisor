
import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DiagnosisPattern, EssentialOilRecommendation, GeneralOilApplication, AcupointApplication } from '../types';
import { Button } from './Button';
import type { CombinedDiagnosis } from '../App';
import { uiStrings } from '../i18n';

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
    <section id="ai-analysis-section-pdf" className="mt-10 p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-lg shadow-xl border border-purple-200">
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
        <div className={`pdf-capture-oil-card p-4 md:p-6 rounded-lg shadow-md border transform transition-all hover:scale-105 hover:shadow-lg ${isSecondary ? 'bg-indigo-50 border-indigo-200' : 'bg-emerald-50 border-emerald-200'}`}>
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


const applyPdfStylesToClonedElement = (clonedElement: HTMLElement) => {
    // Set root properties for better PDF rendering
    clonedElement.style.setProperty('font-family', "'Noto Sans JP', sans-serif", 'important');
    clonedElement.style.setProperty('background-color', '#ffffff', 'important');
    clonedElement.style.setProperty('overflow', 'visible', 'important');
    clonedElement.style.setProperty('height', 'auto', 'important');
    
    // Remove all transitions and animations
    const allElements = clonedElement.querySelectorAll<HTMLElement>('*');
    allElements.forEach(el => {
        el.style.setProperty('transition', 'none', 'important');
        el.style.setProperty('animation', 'none', 'important');
        el.style.setProperty('transform', 'none', 'important');
        el.style.setProperty('page-break-inside', 'avoid', 'important');
    });

    // Improve text rendering for PDF
    const textBlocks = clonedElement.querySelectorAll<HTMLElement>('p, li, div[class*="text-"], span[class*="text-"], summary, h5, h3, h2, h1');
    textBlocks.forEach(el => {
        if (!el.style.fontFamily || !el.style.fontFamily.includes('Shippori Mincho')) {
            el.style.setProperty('font-family', "'Noto Sans JP', sans-serif", 'important');
        }
        el.style.setProperty('line-height', '1.6', 'important');
        el.style.setProperty('letter-spacing', '0.01em', 'important');
        el.style.setProperty('margin-bottom', '8px', 'important');
        el.style.setProperty('word-wrap', 'break-word', 'important');
        el.style.setProperty('orphans', '2', 'important');
        el.style.setProperty('widows', '2', 'important');
    });
    
    const shipporiHeadings = clonedElement.querySelectorAll<HTMLElement>(
      'h1, h2, h3.text-emerald-700, h4.text-emerald-700, h3.text-indigo-700, h4.text-indigo-700, h3.text-purple-700, h3[style*="font-family: \'Shippori Mincho\'"], .font-bold.text-emerald-700'
    );
    shipporiHeadings.forEach(h => {
        h.style.setProperty('font-family', "'Shippori Mincho', serif", 'important');
        h.style.setProperty('margin-bottom', '8px', 'important');
        h.style.setProperty('letter-spacing', '0.03em', 'important');
    });

    const oilCards = clonedElement.querySelectorAll<HTMLElement>('.pdf-capture-oil-card');
    oilCards.forEach(oilCardEl => {
        oilCardEl.style.setProperty('transform', 'none', 'important');
        oilCardEl.style.setProperty('box-shadow', '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 'important');
        oilCardEl.style.setProperty('padding', '12px', 'important');
        if (oilCardEl.classList.contains('bg-indigo-50')) {
             oilCardEl.style.setProperty('border', '1px solid #c7d2fe', 'important');
        } else {
             oilCardEl.style.setProperty('border', '1px solid #a7f3d0', 'important');
        }
        oilCardEl.style.setProperty('margin-bottom', '16px', 'important');
        oilCardEl.style.setProperty('page-break-inside', 'avoid', 'important');
        oilCardEl.style.setProperty('break-inside', 'avoid', 'important');

        const oilTitle = oilCardEl.querySelector<HTMLElement>('h4');
        if (oilTitle) {
            oilTitle.style.setProperty('font-family', "'Shippori Mincho', serif", 'important');
            oilTitle.style.setProperty('line-height', '1.5', 'important');
            oilTitle.style.setProperty('margin-bottom', '6px', 'important');
        }

        const oilDescription = oilCardEl.querySelector<HTMLElement>('p');
        if (oilDescription) {
            oilDescription.style.setProperty('font-family', "'Noto Sans JP', sans-serif", 'important');
            oilDescription.style.setProperty('margin-bottom', '10px', 'important');
            oilDescription.style.setProperty('line-height', '1.8', 'important');
            oilDescription.style.setProperty('font-size', '10pt', 'important');
        }
        
        const detailLists = oilCardEl.querySelectorAll<HTMLElement>('ul');
        detailLists.forEach(ul => {
            ul.style.setProperty('padding-left', '15px', 'important');
            const listItems = ul.querySelectorAll<HTMLElement>('li');
            listItems.forEach(li => {
                li.style.setProperty('font-family', "'Noto Sans JP', sans-serif", 'important');
                li.style.setProperty('margin-bottom', '5px', 'important');
                li.style.setProperty('line-height', '1.6', 'important');
                li.style.setProperty('font-size', '9.5pt', 'important');
            });
        });

        const detailsElements = oilCardEl.querySelectorAll<HTMLDetailsElement>('details');
        detailsElements.forEach(detailsEl => {
            detailsEl.setAttribute('open', ''); 
            const summaryEl = detailsEl.querySelector<HTMLElement>('summary');
            if (summaryEl) {
                summaryEl.style.setProperty('font-family', "'Noto Sans JP', sans-serif", 'important');
                summaryEl.style.setProperty('margin-bottom', '5px', 'important');
                summaryEl.style.setProperty('font-weight', '500', 'important');
            }
        });
    });

    const aiAnalysisSection = clonedElement.querySelector<HTMLElement>('#ai-analysis-section-pdf');
    if(aiAnalysisSection) {
        aiAnalysisSection.style.setProperty('background', '#fdf4ff', 'important');
        aiAnalysisSection.style.setProperty('border', '1px solid #e9d5ff', 'important');
        aiAnalysisSection.style.setProperty('padding', '15px', 'important');
        aiAnalysisSection.style.setProperty('margin-bottom', '25px', 'important');
        aiAnalysisSection.style.setProperty('margin-top', '25px', 'important');
        aiAnalysisSection.style.setProperty('border-radius', '8px', 'important');
        
        const aiTitle = aiAnalysisSection.querySelector('h3');
        if(aiTitle) {
            aiTitle.style.setProperty('font-family', "'Shippori Mincho', serif", 'important');
            aiTitle.style.setProperty('color', '#6b21a8', 'important');
            aiTitle.style.setProperty('margin-bottom', '10px', 'important');
        }
        const aiContent = aiAnalysisSection.querySelector<HTMLElement>('div');
        if(aiContent) {
            aiContent.style.setProperty('font-family', "'Noto Sans JP', sans-serif", 'important');
            aiContent.style.setProperty('line-height', '1.8', 'important');
            aiContent.style.setProperty('font-size', '10pt', 'important');
            aiContent.style.setProperty('white-space', 'pre-wrap', 'important');
        }
    }

    const secondaryDiagnosisSection = clonedElement.querySelector<HTMLElement>('#secondary-diagnoses-section');
    if (secondaryDiagnosisSection) {
        secondaryDiagnosisSection.style.setProperty('border-top', '1px solid #a7f3d0', 'important');
        secondaryDiagnosisSection.style.setProperty('padding-top', '20px', 'important');
        secondaryDiagnosisSection.style.setProperty('margin-top', '25px', 'important');
        const secondaryTitle = secondaryDiagnosisSection.querySelector<HTMLElement>('h3');
        if (secondaryTitle) {
            secondaryTitle.style.setProperty('font-family', "'Shippori Mincho', serif", 'important');
            secondaryTitle.style.setProperty('color', '#4338ca', 'important');
        }
    }
     const secondaryPatternBlocks = clonedElement.querySelectorAll<HTMLElement>('.secondary-pattern-block');
     secondaryPatternBlocks.forEach(block => {
        block.style.setProperty('background-color', '#e0e7ff', 'important');
        block.style.setProperty('border', '1px solid #a5b4fc', 'important');
        block.style.setProperty('padding', '15px', 'important');
        block.style.setProperty('margin-bottom', '15px', 'important');
        block.style.setProperty('border-radius', '8px', 'important');
     });


    const mainTitleElements = clonedElement.querySelectorAll<HTMLElement>(
      '.text-2xl.md\\:text-3xl.font-bold.text-emerald-700, .text-xl.md\\:text-2xl.font-semibold.text-emerald-700, .text-xl.md\\:text-2xl.font-semibold.text-indigo-700, .text-xl.md\\:text-2xl.font-semibold.text-purple-700'
    );
    mainTitleElements.forEach(el => {
      el.style.setProperty('font-family', "'Shippori Mincho', serif", 'important');
    });
};


export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ diagnosis, onStartOver, aiAnalysis, isAnalyzing, language }) => {
  const { primary, secondaries } = diagnosis;
  const pdfContentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const strings = uiStrings[language].result;

  const handleDownloadPdf = async () => {
    if (!pdfContentRef.current || isAnalyzing) return;
    setIsGeneratingPdf(true);
    
    const originalElement = pdfContentRef.current;
    
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const canvas = await html2canvas(originalElement, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        onclone: (document) => {
            const clonedRoot = document.getElementById("pdf-content-area");
            if(clonedRoot) {
                applyPdfStylesToClonedElement(clonedRoot);
                // Add PDF-specific styling
                clonedRoot.style.pageBreakInside = 'avoid';
                clonedRoot.style.overflow = 'visible';
                clonedRoot.style.height = 'auto';
            }
        }
      });
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const canvasWidth = imgProps.width;
      const canvasHeight = imgProps.height;

      const margin = 40; // Increased margin
      const contentWidth = pdfWidth - (margin * 2);
      const contentHeight = pdfPageHeight - (margin * 2);
      
      const scaleFactor = contentWidth / canvasWidth;
      const scaledHeight = canvasHeight * scaleFactor;
      
      // Calculate optimal page breaks
      const pageBreakBuffer = 50; // Buffer to avoid cutting content
      const effectivePageHeight = contentHeight - pageBreakBuffer;
      
      let yPosition = 0;
      let pageIndex = 0;
      
      while (yPosition < scaledHeight) {
        if (pageIndex > 0) {
          pdf.addPage();
        }
        
        // Calculate slice dimensions
        const remainingHeight = scaledHeight - yPosition;
        const sliceHeight = Math.min(effectivePageHeight, remainingHeight);
        
        // Convert back to canvas coordinates
        const canvasSliceHeight = sliceHeight / scaleFactor;
        const canvasYStart = yPosition / scaleFactor;
        
        // Create temporary canvas for this slice
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvasWidth;
        tempCanvas.height = canvasSliceHeight;
        const tempCtx = tempCanvas.getContext('2d');
        
        if (tempCtx) {
          // Fill with white background
          tempCtx.fillStyle = '#ffffff';
          tempCtx.fillRect(0, 0, canvasWidth, canvasSliceHeight);
          
          // Draw the slice
          tempCtx.drawImage(
            canvas, 
            0, canvasYStart, canvasWidth, canvasSliceHeight,
            0, 0, canvasWidth, canvasSliceHeight
          );
          
          const sliceImgData = tempCanvas.toDataURL('image/png', 1.0);
          pdf.addImage(sliceImgData, 'PNG', margin, margin, contentWidth, sliceHeight);
        }
        
        yPosition += sliceHeight;
        pageIndex++;
        
        // Safety break to avoid infinite loops
        if (pageIndex > 50) break;
      }
      
      let pdfFileName = strings.pdfFileName
        .replace('{primary_name}', primary.name.replace(/[\\/*?"<>|:]/g, '_'))
        .replace('{others}', secondaries.length > 0 ? (language === 'ja' ? '他' : '_etc') : '');
      pdf.save(pdfFileName);

    } catch (error) {
      console.error("PDF generation failed:", error);
      alert(strings.pdfError);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <>
      <div id="pdf-content-area" ref={pdfContentRef} className="p-4 md:p-8 bg-white shadow-2xl rounded-xl border border-emerald-300 max-w-2xl mx-auto">
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
      
      <div className="text-center mt-10 space-x-4">
        <Button onClick={onStartOver} variant="secondary" size="large" disabled={isGeneratingPdf || isAnalyzing}>
          {strings.startOverButton}
        </Button>
        <Button onClick={handleDownloadPdf} variant="primary" size="large" disabled={isGeneratingPdf || isAnalyzing}>
          {isGeneratingPdf ? strings.pdfGenerating : (isAnalyzing ? strings.aiAnalyzingButton : strings.saveAsPdfButton)}
        </Button>
      </div>
    </>
  );
};
