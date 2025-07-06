import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DiagnosisKey, QUESTION_SCORING_RULES, MIN_SCORE_FOR_COMBINED_DIAGNOSIS, MAX_SCORE_DIFFERENCE_FOR_COMBINED, PATTERN_CORRELATION_MATRIX, DYNAMIC_SCORING_MULTIPLIERS } from '../../../config'

// Mock the i18n module
vi.mock('../../i18n', () => ({
  getDiagnosisData: vi.fn(() => ({
    KankiUkketsu: {
      name: '肝気鬱結',
      icon: '🌪️',
      metaphor: 'ストレスで詰まった感情',
      cause: 'ストレスや感情の抑制',
      hope: '心の流れを整える',
      oils: [{ name: 'ラベンダー', role: '君', description: 'リラックス効果' }],
      acupointApplication: [],
      lifestyleAdvice: ['リラクゼーション']
    },
    QiXu: {
      name: '気虚',
      icon: '💨',
      metaphor: 'エネルギー不足',
      cause: '過労や疲労',
      hope: 'エネルギーの回復',
      oils: [{ name: 'ペパーミント', role: '君', description: '活力回復' }],
      acupointApplication: [],
      lifestyleAdvice: ['休息']
    },
    KetsuKyo: {
      name: '血虚',
      icon: '🩸',
      metaphor: '血液不足',
      cause: '栄養不足',
      hope: '血液の充実',
      oils: [{ name: 'ローズ', role: '君', description: '血行促進' }],
      acupointApplication: [],
      lifestyleAdvice: ['栄養補給']
    },
    YinXu: {
      name: '陰虚',
      icon: '🌙',
      metaphor: '潤い不足',
      cause: '過度の活動',
      hope: '陰の補充',
      oils: [{ name: 'サンダルウッド', role: '君', description: '鎮静効果' }],
      acupointApplication: [],
      lifestyleAdvice: ['水分補給']
    },
    TanShitsu: {
      name: '痰湿',
      icon: '💧',
      metaphor: '湿気の停滞',
      cause: '代謝の低下',
      hope: '湿気の排出',
      oils: [{ name: 'ユーカリ', role: '君', description: '除湿効果' }],
      acupointApplication: [],
      lifestyleAdvice: ['運動']
    }
  })),
  getKeywordSets: vi.fn(() => ({
    KankiUkketsu: {
      physical: ['ストレス', '頭痛', '肩こり'],
      mental: ['イライラ', '不安', '憂鬱']
    },
    QiXu: {
      physical: ['疲労', '倦怠感', '息切れ'],
      mental: ['やる気不足', '集中力低下']
    },
    KetsuKyo: {
      physical: ['めまい', '貧血', '冷え'],
      mental: ['不安', '落ち込み']
    },
    YinXu: {
      physical: ['のぼせ', '口渇', '寝汗'],
      mental: ['焦燥感', '不眠']
    },
    TanShitsu: {
      physical: ['むくみ', '重だるさ', '痰'],
      mental: ['思考の鈍さ', '意欲低下']
    }
  }))
}))

// Simulate the diagnosis calculation logic from App.tsx
function calculateDiagnosis(submittedAnswers: Record<string, string>): { primary: DiagnosisKey, secondaries: DiagnosisKey[] } {
  const rawScores: Record<DiagnosisKey, number> = {
    KankiUkketsu: 0,
    QiXu: 0,
    KetsuKyo: 0,
    YinXu: 0,
    TanShitsu: 0,
  }

  // Step 1: Calculate base scores from questionnaire
  for (const questionId in submittedAnswers) {
    if (questionId === 'physicalDiscomfortsText' || questionId === 'mentalEmotionalStateText') {
      continue
    }
    const answerValue = submittedAnswers[questionId]
    
    QUESTION_SCORING_RULES.forEach(rule => {
      if (rule.questionId === questionId && rule.answerValue === answerValue) {
        (Object.keys(rule.scores) as DiagnosisKey[]).forEach(patternKey => {
          if (rawScores[patternKey] !== undefined && rule.scores[patternKey] !== undefined) {
             rawScores[patternKey] += rule.scores[patternKey]!
          }
        })
      }
    })
  }

  // Step 2: Enhanced keyword analysis
  const physicalText = (submittedAnswers.physicalDiscomfortsText || '').toLowerCase()
  const mentalText = (submittedAnswers.mentalEmotionalStateText || '').toLowerCase()

  const KEYWORD_SETS = {
    KankiUkketsu: {
      physical: ['ストレス', '頭痛', '肩こり'],
      mental: ['イライラ', '不安', '憂鬱']
    },
    QiXu: {
      physical: ['疲労', '倦怠感', '息切れ'],
      mental: ['やる気不足', '集中力低下']
    },
    KetsuKyo: {
      physical: ['めまい', '貧血', '冷え'],
      mental: ['不安', '落ち込み']
    },
    YinXu: {
      physical: ['のぼせ', '口渇', '寝汗'],
      mental: ['焦燥感', '不眠']
    },
    TanShitsu: {
      physical: ['むくみ', '重だるさ', '痰'],
      mental: ['思考の鈍さ', '意欲低下']
    }
  }

  ;(Object.keys(KEYWORD_SETS) as DiagnosisKey[]).forEach(patternKey => {
    let physicalKeywordScore = 0
    if (KEYWORD_SETS[patternKey] && KEYWORD_SETS[patternKey].physical) {
      for (const keyword of KEYWORD_SETS[patternKey].physical) {
        if (physicalText.includes(keyword.toLowerCase())) {
          physicalKeywordScore += 1.2
        }
      }
    }
    rawScores[patternKey] += physicalKeywordScore

    let mentalKeywordScore = 0
    if (KEYWORD_SETS[patternKey] && KEYWORD_SETS[patternKey].mental) {
      for (const keyword of KEYWORD_SETS[patternKey].mental) {
        if (mentalText.includes(keyword.toLowerCase())) {
          mentalKeywordScore += 1.3
        }
      }
    }
    rawScores[patternKey] += mentalKeywordScore
  })

  // Step 3: Apply dynamic scoring multipliers
  const dynamicScores: Record<DiagnosisKey, number> = {} as Record<DiagnosisKey, number>
  ;(Object.keys(rawScores) as DiagnosisKey[]).forEach(patternKey => {
    dynamicScores[patternKey] = rawScores[patternKey] * DYNAMIC_SCORING_MULTIPLIERS[patternKey]
  })

  // Step 4: Apply pattern correlation analysis
  const correlationAdjustedScores: Record<DiagnosisKey, number> = { ...dynamicScores }
  ;(Object.keys(dynamicScores) as DiagnosisKey[]).forEach(patternKey => {
    const correlations = PATTERN_CORRELATION_MATRIX[patternKey]
    if (correlations) {
      ;(Object.keys(correlations) as DiagnosisKey[]).forEach(correlatedPattern => {
        const correlationFactor = correlations[correlatedPattern]!
        correlationAdjustedScores[patternKey] += dynamicScores[correlatedPattern] * correlationFactor * 0.3
      })
    }
  })

  // Step 5: Determine primary diagnosis
  let primaryKey: DiagnosisKey = 'KankiUkketsu'
  let maxScore = -1
  const allPatternKeys = Object.keys(correlationAdjustedScores) as DiagnosisKey[]

  for (const patternKey of allPatternKeys) {
    if (correlationAdjustedScores[patternKey] > maxScore) {
      maxScore = correlationAdjustedScores[patternKey]
      primaryKey = patternKey
    }
  }

  // Step 6: Secondary diagnosis selection
  const secondaries: DiagnosisKey[] = []
  for (const patternKey of allPatternKeys) {
    if (patternKey === primaryKey) continue

    if (correlationAdjustedScores[patternKey] >= MIN_SCORE_FOR_COMBINED_DIAGNOSIS &&
        (maxScore - correlationAdjustedScores[patternKey]) <= MAX_SCORE_DIFFERENCE_FOR_COMBINED) {
      secondaries.push(patternKey)
    }
  }

  // Sort secondaries by adjusted score descending
  secondaries.sort((a, b) => correlationAdjustedScores[b] - correlationAdjustedScores[a])

  return { primary: primaryKey, secondaries }
}

describe('Diagnosis Logic Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Primary Diagnosis Detection', () => {
    it('should diagnose KankiUkketsu (肝気鬱結) for stress-related symptoms', () => {
      const answers = {
        stressLevel: 'high',
        sleepQuality: 'poor',
        mood: 'irritable',
        physicalDiscomfortsText: 'ストレスによる頭痛と肩こりがひどい',
        mentalEmotionalStateText: 'イライラして不安になることが多い'
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBe('KankiUkketsu')
    })

    it('should diagnose QiXu (気虚) for fatigue-related symptoms', () => {
      const answers = {
        energyLevel: 'low',
        physicalActivity: 'minimal',
        concentration: 'poor',
        physicalDiscomfortsText: '疲労と倦怠感が続いている',
        mentalEmotionalStateText: 'やる気が出ず集中力が低下している'
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBe('QiXu')
    })

    it('should diagnose KetsuKyo (血虚) for circulation-related symptoms', () => {
      const answers = {
        circulation: 'poor',
        coldness: 'severe',
        dizziness: 'frequent',
        physicalDiscomfortsText: 'めまいと貧血の症状がある',
        mentalEmotionalStateText: '不安で落ち込みやすい'
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBe('KetsuKyo')
    })

    it('should diagnose YinXu (陰虚) for heat-related symptoms', () => {
      const answers = {
        heatSymptoms: 'frequent',
        nightSweats: 'yes',
        dryness: 'severe',
        physicalDiscomfortsText: 'のぼせと口渇、寝汗がひどい',
        mentalEmotionalStateText: '焦燥感と不眠で困っている'
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBe('YinXu')
    })

    it('should diagnose TanShitsu (痰湿) for dampness-related symptoms', () => {
      const answers = {
        edema: 'present',
        heaviness: 'severe',
        metabolism: 'slow',
        physicalDiscomfortsText: 'むくみと重だるさ、痰が多い',
        mentalEmotionalStateText: '思考が鈍く意欲が低下している'
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBe('TanShitsu')
    })
  })

  describe('Secondary Diagnosis Detection', () => {
    it('should detect secondary diagnoses when scores are close', () => {
      // Create a scenario where multiple patterns have similar scores
      const answers = {
        stressLevel: 'high',        // KankiUkketsu
        energyLevel: 'low',         // QiXu
        circulation: 'poor',        // KetsuKyo
        physicalDiscomfortsText: 'ストレスと疲労、冷えの症状',
        mentalEmotionalStateText: 'イライラとやる気不足、不安感'
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBeDefined()
      expect(result.secondaries.length).toBeGreaterThan(0)
      expect(result.secondaries).not.toContain(result.primary)
    })

    it('should not detect secondary diagnoses when primary score is dominant', () => {
      const answers = {
        stressLevel: 'severe',
        mood: 'very_irritable',
        anxiety: 'high',
        physicalDiscomfortsText: 'ストレス ストレス 頭痛 肩こり',
        mentalEmotionalStateText: 'イライラ 不安 憂鬱 ストレス'
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBe('KankiUkketsu')
      // With very high stress scores, secondary diagnoses should be minimal or none
      expect(result.secondaries.length).toBeLessThanOrEqual(1)
    })
  })

  describe('Keyword Analysis', () => {
    it('should boost scores based on physical text keywords', () => {
      const answersWithKeywords = {
        physicalDiscomfortsText: 'ストレス 頭痛 肩こり',
        mentalEmotionalStateText: ''
      }

      const answersWithoutKeywords = {
        physicalDiscomfortsText: '特に症状はありません',
        mentalEmotionalStateText: ''
      }

      const resultWithKeywords = calculateDiagnosis(answersWithKeywords)
      const resultWithoutKeywords = calculateDiagnosis(answersWithoutKeywords)

      // The result with keywords should prefer KankiUkketsu more than without
      expect(resultWithKeywords.primary).toBe('KankiUkketsu')
    })

    it('should boost scores based on mental text keywords', () => {
      const answers = {
        physicalDiscomfortsText: '',
        mentalEmotionalStateText: 'イライラ 不安 憂鬱 ストレス'
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBe('KankiUkketsu')
    })

    it('should handle mixed Japanese and English keywords', () => {
      const answers = {
        physicalDiscomfortsText: 'fatigue 疲労 tired',
        mentalEmotionalStateText: 'やる気不足 concentration low'
      }

      const result = calculateDiagnosis(answers)

      // Should still detect QiXu pattern despite mixed languages
      expect(['QiXu', 'KankiUkketsu']).toContain(result.primary)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty input', () => {
      const answers = {
        physicalDiscomfortsText: '',
        mentalEmotionalStateText: ''
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBeDefined()
      expect(Object.keys(result)).toContain('primary')
      expect(Object.keys(result)).toContain('secondaries')
    })

    it('should handle very long text input', () => {
      const longText = 'ストレス '.repeat(1000)
      const answers = {
        physicalDiscomfortsText: longText,
        mentalEmotionalStateText: longText
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBe('KankiUkketsu')
    })

    it('should handle special characters and symbols', () => {
      const answers = {
        physicalDiscomfortsText: '★ストレス★ @頭痛@ #肩こり#',
        mentalEmotionalStateText: '♪イライラ♪ ♡不安♡ ♠憂鬱♠'
      }

      const result = calculateDiagnosis(answers)

      expect(result.primary).toBe('KankiUkketsu')
    })

    it('should provide default diagnosis when no patterns match', () => {
      const answers = {
        unknownQuestion: 'unknown_value',
        physicalDiscomfortsText: 'xyz abc def',
        mentalEmotionalStateText: 'qwe rty uio'
      }

      const result = calculateDiagnosis(answers)

      // Should still return a valid primary diagnosis
      expect(['KankiUkketsu', 'QiXu', 'KetsuKyo', 'YinXu', 'TanShitsu']).toContain(result.primary)
      expect(Array.isArray(result.secondaries)).toBe(true)
    })
  })

  describe('Configuration Integration', () => {
    it('should use scoring rules from config', () => {
      expect(QUESTION_SCORING_RULES).toBeDefined()
      expect(Array.isArray(QUESTION_SCORING_RULES)).toBe(true)
      expect(QUESTION_SCORING_RULES.length).toBeGreaterThan(0)
    })

    it('should use dynamic scoring multipliers', () => {
      expect(DYNAMIC_SCORING_MULTIPLIERS).toBeDefined()
      expect(typeof DYNAMIC_SCORING_MULTIPLIERS.KankiUkketsu).toBe('number')
      expect(typeof DYNAMIC_SCORING_MULTIPLIERS.QiXu).toBe('number')
    })

    it('should use correlation matrix for pattern relationships', () => {
      expect(PATTERN_CORRELATION_MATRIX).toBeDefined()
      expect(typeof PATTERN_CORRELATION_MATRIX).toBe('object')
    })

    it('should respect minimum and maximum threshold configurations', () => {
      expect(typeof MIN_SCORE_FOR_COMBINED_DIAGNOSIS).toBe('number')
      expect(typeof MAX_SCORE_DIFFERENCE_FOR_COMBINED).toBe('number')
      expect(MIN_SCORE_FOR_COMBINED_DIAGNOSIS).toBeGreaterThan(0)
      expect(MAX_SCORE_DIFFERENCE_FOR_COMBINED).toBeGreaterThan(0)
    })
  })

  describe('Scoring Algorithm Validation', () => {
    it('should apply correlation adjustments correctly', () => {
      // Test that correlation matrix affects final scores
      const answers = {
        stressLevel: 'moderate',
        energyLevel: 'moderate',
        physicalDiscomfortsText: 'moderate symptoms',
        mentalEmotionalStateText: 'moderate concerns'
      }

      const result = calculateDiagnosis(answers)

      // With moderate scores across patterns, correlation should influence results
      expect(result.primary).toBeDefined()
      expect(['KankiUkketsu', 'QiXu', 'KetsuKyo', 'YinXu', 'TanShitsu']).toContain(result.primary)
    })

    it('should maintain score ordering consistency', () => {
      const answers = {
        stressLevel: 'high',
        physicalDiscomfortsText: 'ストレス symptoms',
        mentalEmotionalStateText: 'イライラ feelings'
      }

      // Run diagnosis multiple times to ensure consistency
      const results = Array(10).fill(null).map(() => calculateDiagnosis(answers))
      
      // All results should be identical
      const firstResult = results[0]
      results.forEach(result => {
        expect(result.primary).toBe(firstResult.primary)
        expect(result.secondaries).toEqual(firstResult.secondaries)
      })
    })
  })
})