
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Questionnaire } from './components/Questionnaire';
import { DiagnosisResult } from './components/DiagnosisResult';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorToast, LoadingToast, SuccessToast } from './components/ErrorToast';
import { Answer, DiagnosisPattern, EssentialOilRecommendation } from './types';
import { 
  QUESTION_SCORING_RULES, 
  DiagnosisKey,
  MIN_SCORE_FOR_COMBINED_DIAGNOSIS,
  MAX_SCORE_DIFFERENCE_FOR_COMBINED,
  PATTERN_CORRELATION_MATRIX,
  DYNAMIC_SCORING_MULTIPLIERS
} from './config';
import { 
  getDiagnosisData, 
  getQuestionsData, 
  getKeywordSets, 
  getIndividualOilSuggestions,
  getAIPrompt
} from './i18n';
import { ErrorHandler, ErrorType, AppError, RetryableRequest } from './utils/errorHandler';
import { logger } from './utils/logger';

export interface CombinedDiagnosis {
  primary: DiagnosisPattern;
  secondaries: DiagnosisPattern[];
}

const App: React.FC = () => {
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');
  const [currentPage, setCurrentPage] = useState<'questionnaire' | 'result' | 'privacy' | 'terms'>('questionnaire');
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [previousPage, setPreviousPage] = useState<'questionnaire' | 'result' | 'privacy' | 'terms'>('questionnaire');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [diagnosis, setDiagnosis] = useState<CombinedDiagnosis | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // エラーハンドリング関連の状態
  const [currentError, setCurrentError] = useState<AppError | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const userLang = navigator.language.split('-')[0];
    const initialLang = userLang === 'ja' ? 'ja' : 'en';
    setLanguage(initialLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const calculateDiagnosis = (submittedAnswers: Record<string, string>): { primary: DiagnosisKey, secondaries: DiagnosisKey[] } => {
    const rawScores: Record<DiagnosisKey, number> = {
      KankiUkketsu: 0,
      QiXu: 0,
      KetsuKyo: 0,
      YinXu: 0,
      TanShitsu: 0,
    };
    
    const KEYWORD_SETS = getKeywordSets(language);

    // Step 1: Calculate base scores from questionnaire
    for (const questionId in submittedAnswers) {
      if (questionId === 'physicalDiscomfortsText' || questionId === 'mentalEmotionalStateText') {
        continue;
      }
      const answerValue = submittedAnswers[questionId];
      
      QUESTION_SCORING_RULES.forEach(rule => {
        if (rule.questionId === questionId && rule.answerValue === answerValue) {
          (Object.keys(rule.scores) as DiagnosisKey[]).forEach(patternKey => {
            if (rawScores[patternKey] !== undefined && rule.scores[patternKey] !== undefined) {
               rawScores[patternKey] += rule.scores[patternKey]!;
            }
          });
        }
      });
    }
    
    // Step 2: Enhanced keyword analysis with weighted scoring
    const physicalText = (submittedAnswers.physicalDiscomfortsText || '').toLowerCase();
    const mentalText = (submittedAnswers.mentalEmotionalStateText || '').toLowerCase();

    (Object.keys(KEYWORD_SETS) as DiagnosisKey[]).forEach(patternKey => {
      let physicalKeywordScore = 0;
      if (KEYWORD_SETS[patternKey] && KEYWORD_SETS[patternKey].physical) {
        for (const keyword of KEYWORD_SETS[patternKey].physical) {
          if (physicalText.includes(keyword.toLowerCase())) {
            physicalKeywordScore += 1.2; // Enhanced keyword weighting
          }
        }
      }
      rawScores[patternKey] += physicalKeywordScore;

      let mentalKeywordScore = 0;
      if (KEYWORD_SETS[patternKey] && KEYWORD_SETS[patternKey].mental) {
        for (const keyword of KEYWORD_SETS[patternKey].mental) {
          if (mentalText.includes(keyword.toLowerCase())) {
            mentalKeywordScore += 1.3; // Enhanced mental keyword weighting
          }
        }
      }
      rawScores[patternKey] += mentalKeywordScore;
    });
    
    // Step 3: Apply Tokyo Medical dynamic scoring multipliers
    const dynamicScores: Record<DiagnosisKey, number> = {} as Record<DiagnosisKey, number>;
    (Object.keys(rawScores) as DiagnosisKey[]).forEach(patternKey => {
      dynamicScores[patternKey] = rawScores[patternKey] * DYNAMIC_SCORING_MULTIPLIERS[patternKey];
    });
    
    // Step 4: Apply pattern correlation analysis
    const correlationAdjustedScores: Record<DiagnosisKey, number> = { ...dynamicScores };
    (Object.keys(dynamicScores) as DiagnosisKey[]).forEach(patternKey => {
      const correlations = PATTERN_CORRELATION_MATRIX[patternKey];
      if (correlations) {
        (Object.keys(correlations) as DiagnosisKey[]).forEach(correlatedPattern => {
          const correlationFactor = correlations[correlatedPattern]!;
          correlationAdjustedScores[patternKey] += dynamicScores[correlatedPattern] * correlationFactor * 0.3;
        });
      }
    });
    
    // Step 5: Determine primary diagnosis with enhanced logic
    let primaryKey: DiagnosisKey = 'KankiUkketsu';
    let maxScore = -1;
    const allPatternKeys = Object.keys(correlationAdjustedScores) as DiagnosisKey[];

    for (const patternKey of allPatternKeys) {
      if (correlationAdjustedScores[patternKey] > maxScore) {
        maxScore = correlationAdjustedScores[patternKey];
        primaryKey = patternKey;
      }
    }
    
    // Enhanced default handling with intelligent pattern selection
    if (maxScore <= 0 && allPatternKeys.length > 0) {
      const symptomBasedDefault = determineSymptomBasedDefault(submittedAnswers);
      primaryKey = symptomBasedDefault || allPatternKeys[0];
      maxScore = correlationAdjustedScores[primaryKey] || 0;
    }

    // Step 6: Enhanced secondary diagnosis selection
    const secondaries: DiagnosisKey[] = [];
    for (const patternKey of allPatternKeys) {
      if (patternKey === primaryKey) continue;

      if (correlationAdjustedScores[patternKey] >= MIN_SCORE_FOR_COMBINED_DIAGNOSIS &&
          (maxScore - correlationAdjustedScores[patternKey]) <= MAX_SCORE_DIFFERENCE_FOR_COMBINED) {
        secondaries.push(patternKey);
      }
    }
    
    // Sort secondaries by adjusted score descending
    secondaries.sort((a, b) => correlationAdjustedScores[b] - correlationAdjustedScores[a]);

    return { primary: primaryKey, secondaries };
  };

  // Helper function for intelligent default pattern selection
  const determineSymptomBasedDefault = (answers: Record<string, string>): DiagnosisKey | null => {
    const symptomPatterns: Record<string, DiagnosisKey> = {
      'stress': 'KankiUkketsu',
      'fatigue': 'QiXu',
      'circulation': 'KetsuKyo',
      'dryness': 'YinXu',
      'heaviness': 'TanShitsu'
    };
    
    const physicalText = (answers.physicalDiscomfortsText || '').toLowerCase();
    const mentalText = (answers.mentalEmotionalStateText || '').toLowerCase();
    const combinedText = physicalText + ' ' + mentalText;
    
    for (const [symptom, pattern] of Object.entries(symptomPatterns)) {
      if (combinedText.includes(symptom)) {
        return pattern;
      }
    }
    
    return null;
  };

  const getAdditionalOilSuggestions = (
    physicalText: string, 
    mentalText: string, 
    diagnosedOilNames: Set<string> // Changed parameter name for clarity
  ): EssentialOilRecommendation[] => {
    const INDIVIDUAL_OIL_SUGGESTIONS = getIndividualOilSuggestions(language);
    const keywordMatchedSuggestions: EssentialOilRecommendation[] = [];
    const lowerPhysicalText = physicalText.toLowerCase();
    const lowerMentalText = mentalText.toLowerCase();
    const addedOilNamesFromKeywords = new Set<string>();

    INDIVIDUAL_OIL_SUGGESTIONS.forEach(oilSuggestion => {
      if (diagnosedOilNames.has(oilSuggestion.name)) { // Check against all diagnosed oils
        return; 
      }
      if (oilSuggestion.keywords && oilSuggestion.keywords.length > 0) {
        for (const keyword of oilSuggestion.keywords) {
          if (lowerPhysicalText.includes(keyword.toLowerCase()) || lowerMentalText.includes(keyword.toLowerCase())) {
            if (!addedOilNamesFromKeywords.has(oilSuggestion.name)) {
              keywordMatchedSuggestions.push({
                ...oilSuggestion,
                role: language === 'ja' ? '個別提案' : 'Personal Suggestion',
              });
              addedOilNamesFromKeywords.add(oilSuggestion.name);
            }
            break; 
          }
        }
      }
    });
    
    let finalSuggestions: EssentialOilRecommendation[] = [...keywordMatchedSuggestions];
    const MINIMUM_SUGGESTIONS = 5;

    if (finalSuggestions.length < MINIMUM_SUGGESTIONS) {
      const numToPad = MINIMUM_SUGGESTIONS - finalSuggestions.length;
      let paddedCount = 0;
      const namesToAvoid = new Set([...diagnosedOilNames, ...finalSuggestions.map(s => s.name)]);

      for (const generalOil of INDIVIDUAL_OIL_SUGGESTIONS) {
        if (paddedCount >= numToPad) break;

        if (!namesToAvoid.has(generalOil.name)) {
          finalSuggestions.push({
            ...generalOil,
            role: language === 'ja' ? '個別提案' : 'Personal Suggestion',
          });
          namesToAvoid.add(generalOil.name); 
          paddedCount++;
        }
      }
    }
    return finalSuggestions;
  };


  const handleAnswersSubmit = useCallback(async (submittedAnswers: Record<string, string>) => {
    // 1. Set loading state & reset previous results
    setIsAnalyzing(true);
    setAiAnalysis('');
    setAnswers(submittedAnswers);
    
    const DIAGNOSIS_DATA = getDiagnosisData(language);
    const QUESTIONS_DATA = getQuestionsData(language);

    // 2. Perform rule-based diagnosis
    logger.trackUserAction('diagnosis_submitted', {
        language,
        hasPhysicalText: !!(submittedAnswers.physicalDiscomfortsText?.length),
        hasMentalText: !!(submittedAnswers.mentalEmotionalStateText?.length),
        answerCount: Object.keys(submittedAnswers).length
    });
    const diagnosisKeys = calculateDiagnosis(submittedAnswers);
    
    const primaryData = DIAGNOSIS_DATA[diagnosisKeys.primary];

    if (!primaryData) {
        logger.error(`Primary diagnosis data for ${diagnosisKeys.primary} not found`, undefined, {
            diagnosisKey: diagnosisKeys.primary,
            availableKeys: Object.keys(DIAGNOSIS_DATA),
            language
        });
        const fallbackKey = (Object.keys(DIAGNOSIS_DATA) as DiagnosisKey[])[0] || 'KankiUkketsu';
        const fallbackDiagnosis: CombinedDiagnosis = {
            primary: {
                ...(DIAGNOSIS_DATA[fallbackKey] || { name: "Error", icon: "⚠️", metaphor: "", cause: "", hope: "", oils: [], acupointApplication: [], lifestyleAdvice: [] }),
                additionalOils: []
            },
            secondaries: []
        };
        setDiagnosis(fallbackDiagnosis);
        setCurrentPage('result');
        setIsAnalyzing(false);
        window.scrollTo(0, 0);
        return;
    }

    const physicalText = submittedAnswers.physicalDiscomfortsText || '';
    const mentalText = submittedAnswers.mentalEmotionalStateText || '';
    
    const allDiagnosedOilNames = new Set(primaryData.oils.map(o => o.name));
    diagnosisKeys.secondaries.forEach(secKey => {
        const secData = DIAGNOSIS_DATA[secKey];
        if (secData) {
            secData.oils.forEach(o => allDiagnosedOilNames.add(o.name));
        }
    });
    
    const additionalOils = getAdditionalOilSuggestions(physicalText, mentalText, allDiagnosedOilNames);

    const finalPrimaryDiagnosis: DiagnosisPattern = {
      ...primaryData,
      additionalOils: additionalOils,
    };

    const finalSecondaryDiagnoses: DiagnosisPattern[] = diagnosisKeys.secondaries.map(key => ({
      ...(DIAGNOSIS_DATA[key] || { name: "Error", icon: "⚠️", metaphor: "", cause: "", hope: "", oils: [], acupointApplication: [], lifestyleAdvice: [] }),
      additionalOils: [],
    }));
    
    const finalDiagnosis: CombinedDiagnosis = {
      primary: finalPrimaryDiagnosis,
      secondaries: finalSecondaryDiagnoses,
    };
    
    setDiagnosis(finalDiagnosis);

    // 3. Switch to result page
    setCurrentPage('result');
    window.scrollTo(0, 0); 

    // 4. Start AI analysis (asynchronously) - using secure API route with retry
    const retryableRequest = new RetryableRequest(3, 2000);
    
    try {
        const prompt = getAIPrompt(language, finalDiagnosis, submittedAnswers, QUESTIONS_DATA);

        const result = await retryableRequest.execute(async () => {
            const response = await fetch('/api/ai-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                const apiError = await ErrorHandler.handleAPIError(response);
                throw new Error(apiError.message);
            }

            const data = await response.json();
            
            if (data.success && data.text) {
                return data.text;
            } else {
                throw new Error(data.error || 'Unknown error occurred');
            }
        });

        setAiAnalysis(result);

    } catch (error) {
        const appError = ErrorHandler.createError(
            error as Error, 
            ErrorType.API, 
            { context: 'AI analysis', language }
        );
        
        ErrorHandler.logError(appError);
        logger.error('AI analysis failed', error as Error, {
            context: 'AI analysis',
            language,
            hasRetryable: appError.retryable,
            diagnosisType: diagnosisKeys.primary
        });
        
        const errorMsg = language === 'ja' 
          ? "AIによる分析中にエラーが発生しました。申し訳ありませんが、診断の他の部分をご参照ください。ページを再読み込みするか、時間をおいて再度お試しください。"
          : "An error occurred during the AI analysis. We apologize for the inconvenience. Please refer to the other parts of your diagnosis. You can try reloading the page or submitting again later.";
        
        setAiAnalysis(errorMsg);
        setCurrentError(appError);
    } finally {
        setIsAnalyzing(false);
    }
  }, [language]);

  const handleStartOver = useCallback(() => {
    logger.trackUserAction('diagnosis_restart', { language });
    setAnswers({});
    setDiagnosis(null);
    setCurrentPage('questionnaire');
    setPreviousPage('questionnaire');
    setAiAnalysis('');
    setIsAnalyzing(false);
    setCurrentError(null); // エラー状態をリセット
    window.scrollTo(0, 0); 
  }, [language]);

  // エラーハンドリング関連の関数
  const handleErrorDismiss = useCallback(() => {
    logger.trackUserAction('error_dismissed', { 
        language,
        errorType: currentError?.type,
        wasRetryable: currentError?.retryable
    });
    setCurrentError(null);
  }, [language, currentError]);

  const handleRetryAIAnalysis = useCallback(() => {
    if (diagnosis) {
      setCurrentError(null);
      setIsAnalyzing(true);
      // AI分析を再実行するロジックをここに追加
      handleAnswersSubmit(answers);
    }
  }, [diagnosis, answers, handleAnswersSubmit]);

  const showSuccess = useCallback((message: string) => {
    logger.info('Success message shown', { message, language });
    setSuccessMessage(message);
    setShowSuccessToast(true);
  }, [language]);

  const handleSuccessToastDismiss = useCallback(() => {
    setShowSuccessToast(false);
    setSuccessMessage('');
  }, []);

  const handleShowPrivacyPolicy = useCallback(() => {
    if (currentPage !== 'privacy') {
        setPreviousPage(currentPage);
    }
    setCurrentPage('privacy');
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleShowTerms = useCallback(() => {
    if (currentPage !== 'terms') {
        setPreviousPage(currentPage);
    }
    setCurrentPage('terms');
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleAcceptDisclaimer = useCallback(() => {
    setShowDisclaimer(false);
  }, []);

  const handleBackFromPrivacy = useCallback(() => {
    setCurrentPage(previousPage);
    window.scrollTo(0, 0);
  }, [previousPage]);


  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col items-center justify-between antialiased" style={{ fontFamily: "'Shippori Mincho', serif" }}>
        <Header language={language} setLanguage={setLanguage} />
        <main className="container mx-auto px-4 py-8 flex-grow w-full max-w-3xl">
          {currentPage === 'questionnaire' && (
            <Questionnaire
              onSubmit={handleAnswersSubmit}
              language={language}
            />
          )}
          {currentPage === 'result' && diagnosis && (
            <DiagnosisResult
              diagnosis={diagnosis}
              onStartOver={handleStartOver}
              aiAnalysis={aiAnalysis}
              isAnalyzing={isAnalyzing}
              language={language}
              onShowSuccess={showSuccess}
              onShowError={setCurrentError}
            />
          )}
          {currentPage === 'privacy' && (
             <PrivacyPolicy onBack={handleBackFromPrivacy} language={language} />
          )}
          {currentPage === 'terms' && (
             <TermsOfService onBack={handleBackFromPrivacy} language={language} />
          )}
        </main>
        <Footer onShowPrivacyPolicy={handleShowPrivacyPolicy} onShowTerms={handleShowTerms} language={language} />
        <DisclaimerModal 
          isOpen={showDisclaimer} 
          onAccept={handleAcceptDisclaimer} 
          language={language} 
        />
        
        {/* エラーハンドリング UI */}
        <ErrorToast
          error={currentError}
          language={language}
          onDismiss={handleErrorDismiss}
          onRetry={currentError?.retryable ? handleRetryAIAnalysis : undefined}
        />
        
        <LoadingToast
          isLoading={isAnalyzing}
          message={language === 'ja' ? 'AIが分析中です...' : 'AI is analyzing...'}
          language={language}
        />
        
        <SuccessToast
          isVisible={showSuccessToast}
          message={successMessage}
          onDismiss={handleSuccessToastDismiss}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
