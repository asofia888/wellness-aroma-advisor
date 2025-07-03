
export enum QuestionCategory {
  ColdHeat = "寒熱（冷え・ほてり）",
  Qi = "氣（エネルギー）",
  Blood = "血（栄養・循環）",
  Fluids = "津液（身体の潤い）",
  Emotions = "五臓と感情",
  SleepSpirit = "睡眠と精神（神）",
  // English keys
  ColdHeat_EN = "Cold & Heat",
  Qi_EN = "Qi (Energy)",
  Blood_EN = "Blood (Nourishment & Circulation)",
  Fluids_EN = "Fluids (Body Moisture)",
  Emotions_EN = "Organs & Emotions",
  SleepSpirit_EN = "Sleep & Spirit",
}

export interface Question {
  id: string;
  category: QuestionCategory;
  text: string;
  options: { label: string; value: string }[];
}

export interface Answer {
  questionId: string;
  value: string;
}

export interface EssentialOilRecommendation {
  role?: '君' | '臣' | '佐' | '使' | '個別提案' | 'Emperor' | 'Minister' | 'Assistant' | 'Messenger' | 'Personal Suggestion';
  name:string;
  scientificName: string; // 学名
  description: string;
  mainActions: string[]; // 主な作用
  precautions: string[]; // 使用上の注意
  alternativeUses: string[]; // 代替的な使い方
  icon?: string; // e.g., emoji or path to image
  keywords?: string[]; // Keywords for individual suggestion matching
}

export interface AcupointApplication {
  point: string;
  instruction: string;
  otherBenefits: string[]; // その他の効能
}

export interface GeneralOilApplication {
  methodName: string;
  description: string;
  icon?: string;
}

export interface DiagnosisPattern {
  name: string;
  icon: string;
  metaphor: string;
  cause: string;
  hope: string;
  oils: EssentialOilRecommendation[];
  acupointApplication: AcupointApplication[]; // Changed to array
  generalOilApplications?: GeneralOilApplication[];
  lifestyleAdvice: string[];
  additionalOils?: EssentialOilRecommendation[];
}
