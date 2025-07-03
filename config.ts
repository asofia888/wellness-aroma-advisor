
import { DIAGNOSIS_DATA_JA } from "./i18n";

export type DiagnosisKey = keyof typeof DIAGNOSIS_DATA_JA; // Use one language as the key source

export interface ScoringRule {
  questionId: string;
  answerValue: string;
  scores: Partial<Record<DiagnosisKey, number>>;
}

export const QUESTION_SCORING_RULES: ScoringRule[] = [
  // 寒熱 (Cold-Heat Pattern) - Enhanced Tokyo Medical Scoring
  { questionId: 'coldheat1', answerValue: 'yes', scores: { QiXu: 1.2, KetsuKyo: 0.8, TanShitsu: 0.7 } }, 
  { questionId: 'coldheat2', answerValue: 'yes', scores: { KankiUkketsu: 0.8, KetsuKyo: 0.7, YinXu: 2.3 } }, 
  { questionId: 'coldheat3', answerValue: 'yes', scores: { QiXu: 1.3, TanShitsu: 1.2 } },
  { questionId: 'coldheat4', answerValue: 'warm', scores: { QiXu: 0.7, TanShitsu: 0.8 } },
  { questionId: 'coldheat4', answerValue: 'cold', scores: { KankiUkketsu: 0.8, YinXu: 1.4 } }, 
  // 氣 (Qi Pattern) - Enhanced Dynamic Scoring
  { questionId: 'qi1', answerValue: 'yes', scores: { QiXu: 2.5, TanShitsu: 1.3 } }, 
  { questionId: 'qi2', answerValue: 'yes', scores: { KankiUkketsu: 2.4 } },
  { questionId: 'qi3', answerValue: 'no', scores: { QiXu: 1.4, KankiUkketsu: 0.8, KetsuKyo: 0.7, TanShitsu: 0.6, YinXu: 0.7 } },
  { questionId: 'qi3', answerValue: 'sometimes', scores: { QiXu: 1.2, KankiUkketsu: 0.6, KetsuKyo: 0.6, TanShitsu: 0.5, YinXu: 0.6 } },
  { questionId: 'qi4', answerValue: 'yes', scores: { QiXu: 2.3, TanShitsu: 1.4 } }, 
  { questionId: 'qi5', answerValue: 'yes', scores: { KankiUkketsu: 1.3, QiXu: 0.8, TanShitsu: 1.2 } }, 
  // 血 (Blood Pattern) - Enhanced Circulation Analysis
  { questionId: 'blood1', answerValue: 'yes', scores: { KetsuKyo: 2.4, QiXu: 1.3, TanShitsu: 0.7 } }, 
  { questionId: 'blood2', answerValue: 'yes', scores: { KetsuKyo: 2.5, YinXu: 1.4 } }, 
  { questionId: 'blood3', answerValue: 'yes', scores: { KetsuKyo: 2.3 } },
  { questionId: 'blood4', answerValue: 'yes', scores: { KetsuKyo: 1.3, YinXu: 0.8 } }, 
  // 津液 (Fluid Pattern) - Enhanced Moisture Balance
  { questionId: 'fluids1', answerValue: 'yes', scores: { KetsuKyo: 1.2, YinXu: 2.4 } },
  { questionId: 'fluids2', answerValue: 'yes', scores: { KetsuKyo: 1.3, YinXu: 1.4 } },
  { questionId: 'fluids3', answerValue: 'yes', scores: { KankiUkketsu: 0.7, QiXu: 0.8, TanShitsu: 2.3 } }, 
  { questionId: 'fluids4', answerValue: 'yes', scores: { QiXu: 1.3, TanShitsu: 2.4 } }, 
  // 五臓と感情 (Organ-Emotion Pattern) - Enhanced Psychosomatic Analysis
  { questionId: 'emotions1', answerValue: 'yes', scores: { KankiUkketsu: 2.5, YinXu: 1.3 } }, 
  { questionId: 'emotions2', answerValue: 'yes', scores: { KankiUkketsu: 1.4, QiXu: 0.8, KetsuKyo: 0.7, TanShitsu: 0.6 } },
  { questionId: 'emotions3', answerValue: 'yes', scores: { KankiUkketsu: 1.3, QiXu: 1.2, KetsuKyo: 1.1 } },
  { questionId: 'emotions4', answerValue: 'yes', scores: { KetsuKyo: 1.4, QiXu: 0.8, YinXu: 1.3 } }, 
  // 睡眠と精神 (Sleep-Spirit Pattern) - Enhanced Neurological Assessment
  { questionId: 'sleep1', answerValue: 'bad', scores: { KankiUkketsu: 1.3, KetsuKyo: 1.2, YinXu: 1.4, TanShitsu: 0.7 } },
  { questionId: 'sleep1', answerValue: 'sometimes', scores: { KankiUkketsu: 1.1, KetsuKyo: 1.0, YinXu: 1.2, TanShitsu: 0.6 } },
  { questionId: 'sleep2', answerValue: 'yes', scores: { KankiUkketsu: 1.3, KetsuKyo: 1.2, YinXu: 1.4 } },
  { questionId: 'sleep3', answerValue: 'yes', scores: { KankiUkketsu: 0.8, KetsuKyo: 1.3, YinXu: 2.3 } }, 
  { questionId: 'sleep4', answerValue: 'yes', scores: { QiXu: 1.2, KetsuKyo: 1.3, KankiUkketsu: 0.8, TanShitsu: 1.2, YinXu: 0.7 } },
];

// Enhanced Tokyo Medical Diagnostic Thresholds
export const MIN_SCORE_FOR_COMBINED_DIAGNOSIS = 2.5; // Enhanced threshold for secondary diagnosis consideration
export const MAX_SCORE_DIFFERENCE_FOR_COMBINED = 1.8; // Refined differential threshold for pattern correlation

// Advanced Tokyo Medical Diagnostic Parameters
export const PATTERN_CORRELATION_MATRIX: Record<DiagnosisKey, Partial<Record<DiagnosisKey, number>>> = {
  KankiUkketsu: { KetsuKyo: 0.7, YinXu: 0.6, QiXu: 0.5 },
  QiXu: { TanShitsu: 0.8, KetsuKyo: 0.6, KankiUkketsu: 0.5 },
  KetsuKyo: { YinXu: 0.7, QiXu: 0.6, KankiUkketsu: 0.5 },
  YinXu: { KetsuKyo: 0.7, KankiUkketsu: 0.5, TanShitsu: 0.4 },
  TanShitsu: { QiXu: 0.8, KankiUkketsu: 0.4, YinXu: 0.3 }
};

// Dynamic Scoring Multipliers based on Tokyo Medical Research
export const DYNAMIC_SCORING_MULTIPLIERS: Record<DiagnosisKey, number> = {
  KankiUkketsu: 1.15, // Liver Qi Stagnation - enhanced recognition
  QiXu: 1.20, // Qi Deficiency - increased sensitivity
  KetsuKyo: 1.10, // Blood Deficiency - refined detection
  YinXu: 1.25, // Yin Deficiency - enhanced precision
  TanShitsu: 1.05 // Phlegm-Dampness - baseline adjustment
};
