
import { Question, QuestionCategory, DiagnosisPattern, EssentialOilRecommendation } from './types';
import type { CombinedDiagnosis } from './App';
import { DiagnosisKey } from './config';

// ==================================
// UI STRINGS
// ==================================

export const uiStrings = {
    ja: {
        appName: '東洋医学理論に基づく精油カウンセリング',
        appSubtitle: 'あなたの体質と心に寄り添う、伝統医学の知恵とアロマテラピー',
        footer: {
            copyright: '東洋医学理論に基づく精油カウンセリング. All rights reserved.',
            disclaimer: 'このアプリは古典東洋医学の考え方に基づくものであり、医学的診断や治療を代替するものではありません。',
            privacyPolicy: 'プライバシーポリシー',
            termsOfService: '利用規約',
            buyMeACoffee: '開発者にコーヒーを奢る ☕',
        },
        questionnaire: {
            title: '体質チェックシート',
            subtitle: 'あなたの今の状態について、直感でお答えください。',
            concernsTitle: 'お悩みについて (任意)',
            physicalDiscomfortsLabel: '身体の不調について詳しく教えてください:',
            physicalDiscomfortsPlaceholder: '例：肩こりがひどい、よく頭痛がする、お腹が張りやすいなど',
            mentalEmotionalStateLabel: '精神・心の状態について詳しく教えてください:',
            mentalEmotionalStatePlaceholder: '例：最近イライラしやすい、なんとなく気分が落ち込む、不安を感じやすいなど',
            submitButton: '診断する',
            validationAlert: 'すべての選択式の質問にお答えください。'
        },
        result: {
            primaryDiagnosisTitle: '【主診断】',
            primaryDiagnosisSubtitle: 'あなたの主な体質パターン',
            aiLoading: 'AIがあなたのためのパーソナル分析を生成中...',
            aiLoadingMessage: '結果を総合的に判断し、あなただけのメッセージを作成しています。少々お待ちください。',
            aiAnalysisTitle: 'AIによるパーソナル分析',
            currentStateTitle: '今のあなたの状態は…',
            causeTitle: 'その原因はもしかすると…',
            hopeTitle: '希望のメッセージ',
            recommendedOilsTitle: 'おすすめの精油 ({diagnosis_name}より)',
            mainActions: '主な作用',
            precautions: '使用上の注意 (クリックして表示)',
            alternativeUses: '代替的な使い方 (クリックして表示)',
            secondaryDiagnosisTitle: '併せて見られる体質の傾向 (兼証)',
            secondaryDiagnosisMessage: 'あなたの体質は主に「{primary_name}」ですが、以下の体質の傾向も併せて見られます。これは漢方でいう「兼証（けんしょう）」や「複合タイプ」と呼ばれる状態です。主診断の養生法を基本としながら、これらの体質の特徴も考慮しケアを取り入れることで、よりバランスの取れた状態を目指しましょう。',
            secondaryOilsTitle: 'この体質の主な精油：',
            secondaryLifestyleTitle: '主な養生アドバイス：',
            secondaryDisclaimer: 'より詳しい情報は、この体質が主診断となった場合の結果をご参照ください。',
            additionalOilsTitle: 'あなたの具体的なお悩みに基づく追加の精油提案',
            additionalOilsMessage: '問診でご記入いただいた内容から、以下の精油もあなたの状態に役立つかもしれません。香りの好みや直感も大切に、選択肢の一つとしてご参考ください。',
            usageAndAcupointsTitle: '精油の使い方とツボ ({diagnosis_name}より)',
            recommendedAcupoint: 'おすすめのツボ',
            otherBenefits: 'このツボのその他の期待できる効能',
            otherUsesTitle: 'その他の精油の楽しみ方',
            lifestyleAdviceTitle: '{diagnosis_name}のための養生法アドバイス',
            startOverButton: 'もう一度診断する',
            saveAsPdfButton: 'PDFとして保存',
            exportPDFButton: 'PDFをダウンロード',
            aiAnalyzingButton: 'AI分析中...',
            pdfGenerating: 'PDF生成中...',
            pdfFileName: '東洋医学精油カウンセリング結果-{primary_name}{others}.pdf',
            pdfFilename: 'aroma-counseling-result',
            pdfError: '申し訳ありません、PDFの生成中にエラーが発生しました。',
            pdfExportError: 'PDFエクスポートに失敗しました。',
        },
        privacyPolicy: {
            backButton: '診断に戻る',
        }
    },
    en: {
        appName: 'Essential Oil Counseling Based on Traditional Medicine Theory',
        appSubtitle: 'Ancient Wisdom Meets Modern Aromatherapy for Your Well-being',
        footer: {
            copyright: 'Essential Oil Counseling Based on Traditional Medicine Theory. All rights reserved.',
            disclaimer: 'This application is based on advanced Traditional Medicine principles and is not a substitute for medical diagnosis or treatment.',
            privacyPolicy: 'Privacy Policy',
            termsOfService: 'Terms of Service',
            buyMeACoffee: 'Buy me a coffee ☕',
        },
        questionnaire: {
            title: 'Constitution Check Sheet',
            subtitle: 'Please answer intuitively about your current condition.',
            concernsTitle: 'About Your Concerns (Optional)',
            physicalDiscomfortsLabel: 'Please tell us more about your physical discomforts:',
            physicalDiscomfortsPlaceholder: 'e.g., severe shoulder stiffness, frequent headaches, bloating, etc.',
            mentalEmotionalStateLabel: 'Please tell us more about your mental and emotional state:',
            mentalEmotionalStatePlaceholder: 'e.g., easily irritated lately, feeling down for no reason, prone to anxiety, etc.',
            submitButton: 'Get Diagnosis',
            validationAlert: 'Please answer all multiple-choice questions.'
        },
        result: {
            primaryDiagnosisTitle: '[Primary Diagnosis]',
            primaryDiagnosisSubtitle: 'Your Main Constitution Pattern',
            aiLoading: 'AI is generating your personal analysis...',
            aiLoadingMessage: 'We are comprehensively analyzing your results to create a message just for you. Please wait a moment.',
            aiAnalysisTitle: 'Personal Analysis by AI',
            currentStateTitle: 'Your current state is like...',
            causeTitle: 'The cause might be...',
            hopeTitle: 'A Message of Hope',
            recommendedOilsTitle: 'Recommended Essential Oils (for {diagnosis_name})',
            mainActions: 'Main Actions',
            precautions: 'Precautions (click to show)',
            alternativeUses: 'Alternative Uses (click to show)',
            secondaryDiagnosisTitle: 'Concurrent Constitutional Tendencies',
            secondaryDiagnosisMessage: 'Your primary constitution is "{primary_name}", but you also show tendencies of the following constitutions. In Kampo, this is known as a "combined pattern" or "complex type." While focusing on the care for your primary diagnosis, considering these aspects can help you achieve a better balance.',
            secondaryOilsTitle: 'Main Essential Oils for this Pattern:',
            secondaryLifestyleTitle: 'Main Lifestyle Advice:',
            secondaryDisclaimer: 'For more detailed information, please refer to the results when this pattern is the primary diagnosis.',
            additionalOilsTitle: 'Additional Oil Suggestions Based on Your Specific Concerns',
            additionalOilsMessage: 'Based on your written answers, the following essential oils might also be helpful. Please consider them as options, valuing your own preferences and intuition.',
            usageAndAcupointsTitle: 'Oil Usage & Acupoints (for {diagnosis_name})',
            recommendedAcupoint: 'Recommended Acupoint',
            otherBenefits: 'Other potential benefits of this acupoint',
            otherUsesTitle: 'Other Ways to Enjoy Essential Oils',
            lifestyleAdviceTitle: 'Lifestyle Advice for {diagnosis_name}',
            startOverButton: 'Diagnose Again',
            saveAsPdfButton: 'Save as PDF',
            exportPDFButton: 'Download PDF',
            aiAnalyzingButton: 'AI Analyzing...',
            pdfGenerating: 'Generating PDF...',
            pdfFileName: 'Kampo-Aroma_Diagnosis-{primary_name}{others}.pdf',
            pdfFilename: 'aroma-counseling-result',
            pdfError: 'Sorry, an error occurred while generating the PDF.',
            pdfExportError: 'PDF export failed.',
        },
        privacyPolicy: {
            backButton: 'Back to Diagnosis',
        }
    }
};

// ==================================
// QUESTIONS DATA
// ==================================

const QUESTIONS_DATA_JA: Question[] = [
  // 寒熱
  { id: 'coldheat1', category: QuestionCategory.ColdHeat, text: '手足の先は、夏でも冷たいですか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'coldheat2', category: QuestionCategory.ColdHeat, text: '顔や体が急にカッと熱くなることがありますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'coldheat3', category: QuestionCategory.ColdHeat, text: '特に下半身やお腹周りが冷えやすいですか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'coldheat4', category: QuestionCategory.ColdHeat, text: '普段、温かい飲み物と冷たい飲み物のどちらを好みますか？', options: [{ label: '温かいもの', value: 'warm' }, { label: '冷たいもの', value: 'cold' }, { label: 'どちらでもない', value: 'neutral' }] },
  // 氣
  { id: 'qi1', category: QuestionCategory.Qi, text: '食後、眠くてたまらなくなりますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'qi2', category: QuestionCategory.Qi, text: 'ため息をよくつきますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'qi3', category: QuestionCategory.Qi, text: '朝、すっきりと起きられますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }, {label: '日による', value: 'sometimes'}] },
  { id: 'qi4', category: QuestionCategory.Qi, text: '疲れやすく、すぐに横になりたいと感じることが多いですか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'qi5', category: QuestionCategory.Qi, text: 'お腹が張ったり、ゲップがよく出たりしますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  // 血
  { id: 'blood1', category: QuestionCategory.Blood, text: '立ちくらみはよくありますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'blood2', category: QuestionCategory.Blood, text: '肌が乾燥しやすく、カサカサしますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'blood3', category: QuestionCategory.Blood, text: '爪が割れやすい、または色が薄いですか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'blood4', category: QuestionCategory.Blood, text: '髪の毛が抜けやすい、またはパサつきやすいですか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  // 津液
  { id: 'fluids1', category: QuestionCategory.Fluids, text: 'のどが渇きやすく、よく水を飲みますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'fluids2', category: QuestionCategory.Fluids, text: '目は乾燥しやすいですか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'fluids3', category: QuestionCategory.Fluids, text: '口の中がネバネバしたり、苦味を感じたりしますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'fluids4', category: QuestionCategory.Fluids, text: '体の重だるさや、むくみを感じやすいですか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  // 五臓と感情
  { id: 'emotions1', category: QuestionCategory.Emotions, text: 'イライラしやすかったり、カッとなりやすいですか？ (怒り)', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'emotions2', category: QuestionCategory.Emotions, text: '同じことをぐるぐる考え込んでしまいますか？ (思い悩み)', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'emotions3', category: QuestionCategory.Emotions, text: '理由もなく悲しくなったり、気分が落ち込んだりしますか？ (悲しみ)', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'emotions4', category: QuestionCategory.Emotions, text: 'ちょっとしたことで驚きやすかったり、不安を感じやすいですか？ (恐れ・驚き)', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  // 睡眠と精神
  { id: 'sleep1', category: QuestionCategory.SleepSpirit, text: '寝つきは良いですか？', options: [{ label: '良い', value: 'good' }, { label: '悪い', value: 'bad' }, { label: '時による', value: 'sometimes'}] },
  { id: 'sleep2', category: QuestionCategory.SleepSpirit, text: '夢をたくさん見ますか？また、その内容をよく覚えていますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'sleep3', category: QuestionCategory.SleepSpirit, text: '夜中に目が覚めやすいですか？また、一度起きると寝付けませんか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
  { id: 'sleep4', category: QuestionCategory.SleepSpirit, text: '日中、集中力が続かなかったり、頭がぼーっとしたりしますか？', options: [{ label: 'はい', value: 'yes' }, { label: 'いいえ', value: 'no' }] },
];

const QUESTIONS_DATA_EN: Question[] = [
    // Cold & Heat
    { id: 'coldheat1', category: QuestionCategory.ColdHeat_EN, text: 'Are the tips of your hands and feet cold, even in summer?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'coldheat2', category: QuestionCategory.ColdHeat_EN, text: 'Do you experience sudden hot flashes in your face or body?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'coldheat3', category: QuestionCategory.ColdHeat_EN, text: 'Do you tend to feel cold, especially in your lower body or abdomen?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'coldheat4', category: QuestionCategory.ColdHeat_EN, text: 'Do you usually prefer hot or cold drinks?', options: [{ label: 'Hot', value: 'warm' }, { label: 'Cold', value: 'cold' }, { label: 'Neither', value: 'neutral' }] },
    // Qi (Energy)
    { id: 'qi1', category: QuestionCategory.Qi_EN, text: 'Do you feel extremely sleepy after meals?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'qi2', category: QuestionCategory.Qi_EN, text: 'Do you sigh frequently?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'qi3', category: QuestionCategory.Qi_EN, text: 'Do you wake up feeling refreshed in the morning?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }, { label: 'Sometimes', value: 'sometimes' }] },
    { id: 'qi4', category: QuestionCategory.Qi_EN, text: 'Do you tire easily and often feel the need to lie down?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'qi5', category: QuestionCategory.Qi_EN, text: 'Do you experience bloating or burp frequently?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    // Blood (Nourishment & Circulation)
    { id: 'blood1', category: QuestionCategory.Blood_EN, text: 'Do you often feel dizzy when standing up?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'blood2', category: QuestionCategory.Blood_EN, text: 'Is your skin dry and flaky?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'blood3', category: QuestionCategory.Blood_EN, text: 'Are your nails brittle or pale?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'blood4', category: QuestionCategory.Blood_EN, text: 'Do you experience hair loss or have dry, brittle hair?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    // Fluids (Body Moisture)
    { id: 'fluids1', category: QuestionCategory.Fluids_EN, text: 'Do you often feel thirsty and drink a lot of water?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'fluids2', category: QuestionCategory.Fluids_EN, text: 'Are your eyes often dry?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'fluids3', category: QuestionCategory.Fluids_EN, text: 'Does your mouth feel sticky or have a bitter taste?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'fluids4', category: QuestionCategory.Fluids_EN, text: 'Do you often feel heavy or bloated/puffy?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    // Organs & Emotions
    { id: 'emotions1', category: QuestionCategory.Emotions_EN, text: 'Are you easily irritated or quick to anger?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'emotions2', category: QuestionCategory.Emotions_EN, text: 'Do you tend to overthink or dwell on the same things?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'emotions3', category: QuestionCategory.Emotions_EN, text: 'Do you feel sad or down for no apparent reason?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'emotions4', category: QuestionCategory.Emotions_EN, text: 'Are you easily startled or prone to anxiety?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    // Sleep & Spirit
    { id: 'sleep1', category: QuestionCategory.SleepSpirit_EN, text: 'Do you fall asleep easily?', options: [{ label: 'Yes', value: 'good' }, { label: 'No', value: 'bad' }, { label: 'Sometimes', value: 'sometimes' }] },
    { id: 'sleep2', category: QuestionCategory.SleepSpirit_EN, text: 'Do you have a lot of dreams and remember them well?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'sleep3', category: QuestionCategory.SleepSpirit_EN, text: 'Do you wake up easily during the night and have trouble falling back asleep?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
    { id: 'sleep4', category: QuestionCategory.SleepSpirit_EN, text: 'Do you have trouble concentrating or feel mentally foggy during the day?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
];

export const getQuestionsData = (lang: 'ja' | 'en'): Question[] => lang === 'ja' ? QUESTIONS_DATA_JA : QUESTIONS_DATA_EN;


// ==================================
// DIAGNOSIS DATA
// ==================================

export const DIAGNOSIS_DATA_JA: { [key: string]: DiagnosisPattern } = {
  KankiUkketsu: {
    name: "肝気鬱結（かんきうっけつ）",
    icon: "🌿",
    metaphor: "あなたの内なるエネルギーは、春の小川が岩でせき止められているような状態です。",
    cause: "やらなければならないことや、周囲への気遣いで、ご自身の感情を伸びやかに表現することを少し忘れていませんか？ もしかしたら、言いたいことを飲み込んだり、感情を抑え込んだりすることが続いているのかもしれません。",
    hope: "大丈夫。植物の力を借りて、その流れをもう一度、緩やかで自由なものに戻していきましょう。心の詰まりが解ければ、エネルギーは自然と巡り始めます。",
    oils: [
      { role: '君', name: 'ベルガモット', scientificName: 'Citrus bergamia', icon: '🍋', description: "柑橘の爽やかさとフローラルの甘さを併せ持つ、繊細なこの香りが、心のバランスを整え、明るく前向きな気持ちへと導きます。「天然の抗うつ剤」とも呼ばれ、不安や緊張を和らげる手助けをしてくれます。太陽の光を浴びたこの果実の魂が、あなたの心を解き放ち、軽やかな風を吹き込みます。", mainActions: ["鎮静", "高揚・リフレッシュ", "抗不安", "消化促進", "抗菌"], precautions: ["光毒性に注意（フロクマリン類を含むため、塗布後4～5時間は直射日光を避ける）", "皮膚刺激を感じる場合があるため、敏感肌の方は少量から試す"], alternativeUses: ["芳香浴（ディフューザー、アロマランプ）", "アロマスプレー（空間やリネンに）", "ハンカチやティッシュに垂らして香りを携帯"], },
      { role: '臣', name: 'ローマン・カモミール', scientificName: 'Chamaemelum nobile / Anthemis nobilis', icon: '🌼', description: "「母なる薬草」とも呼ばれるこの花の優しい香りは、まるで大地に抱かれるような安心感を与えてくれます。リンゴに似たフルーティーで甘い香りが、高ぶった神経を穏やかに鎮め、深いリラックスへと誘います。不安や緊張、怒りといった感情を和らげ、安らかな眠りをもたらすとも言われています。", mainActions: ["鎮静", "抗炎症", "鎮痙", "鎮痛", "精神安定"], precautions: ["キク科アレルギーの方は注意が必要", "妊娠初期は使用を避けるのが望ましい"], alternativeUses: ["芳香浴", "湿布（温湿布・冷湿布）", "部分浴（手浴・足浴）"], },
      { role: '佐', name: 'フランキンセンス (オリバナム/乳香)', scientificName: 'Boswellia carterii / Boswellia sacra', icon: '🪵', description: "古来より瞑想や宗教儀式に用いられてきた、深く落ち着いた樹脂の香り。呼吸を穏やかにし、心の静けさをもたらします。ベルガモットとカモミールの働きを支え、気の巡りをスムーズにし、精神的な安定をより深めます。", mainActions: ["鎮静", "抗うつ", "免疫賦活", "細胞成長促進", "収れん"], precautions: ["特に大きな禁忌はないが、妊娠初期は慎重に使用"], alternativeUses: ["芳香浴（瞑想時にも）", "スキンケア（美容液やクリームに少量加える）", "吸入（蒸気吸入）"], },
      { role: '佐', name: 'ユズ (柚子)', scientificName: 'Citrus junos', icon: '🍊', description: '日本人に馴染み深い、爽やかで温かみのある和の柑橘の香り。滞った気の流れをスムーズにし、心を明るくリラックスさせます。その温かさは、緊張でこわばった心と体を優しく解きほぐし、処方全体の調和を助けます。', mainActions: ['加温', '血行促進', '鎮静', '抗うつ', '消化促進'], precautions: ['光毒性の報告は少ないが、念のため塗布後数時間は直射日光を避けるのが無難。', '皮膚刺激を感じる場合があるため、敏感肌の方は少量から試す。'], alternativeUses: ['芳香浴', 'アロマバス', 'マッサージオイル（キャリアオイルで希釈）'] },
      { role: '佐', name: 'ブルータンジー', scientificName: 'Tanacetum annuum', icon: '💙', description: '美しい藍色のこの精油は、カモミールに似た甘くフルーティーな香りを持ちます。抑圧された怒りやイライラといった「熱」を鎮め、感情の解放を助けます。特に、神経の高ぶりやアレルギー反応を穏やかにする力があります。', mainActions: ['抗ヒスタミン', '抗炎症', '抗アレルギー', '鎮静（神経）', '鎮痒'], precautions: ['妊娠初期、授乳中、てんかんのある方は使用を避ける。', 'キク科アレルギーの方は注意。', '高価な精油。衣類などに付着すると色が落ちにくい。'], alternativeUses: ['芳香浴', 'キャリアオイルで希釈して局所塗布（かゆみ、炎症部位に）', '吸入（花粉症対策）'] },
      { role: '使', name: 'マンダリン', scientificName: 'Citrus reticulata', icon: '🍊', description: "甘く優しい柑橘の香りは、子供から大人まで広く親しまれます。他の精油たちの調和を促し、この処方全体のエネルギーをスムーズに内関のツボへと届けます。消化器系への働きかけも穏やかで、心を明るくする効果も。", mainActions: ["鎮静", "消化促進", "抗不安", "リラックス", "血行促進"], precautions: ["光毒性はベルガモットに比べると弱いですが、念のため塗布後の長時間の直射日光は避けるのが無難"], alternativeUses: ["芳香浴（特に子供部屋や寝室に）", "マッサージオイル（キャリアオイルで希釈）", "アロマバス"], },
      { role: '佐', name: 'ネロリ', scientificName: 'Citrus aurantium var. amara (Flos)', icon: '🌸', description: "ビターオレンジの花から抽出される、優雅でフローラルな香り。深いリラックス効果があり、不安や心配事を和らげ、幸福感をもたらします。特に精神的なストレスによる気の滞りに効果的です。", mainActions: ["抗うつ", "鎮静（神経系）", "抗不安", "細胞再生促進（皮膚）", "消化促進"], precautions: ["非常に高価な精油", "香りが強いので少量から試す"], alternativeUses: ["芳香浴", "スキンケア（化粧水やクリームに1滴）", "アロマバス", "香水として"], },
    ],
    acupointApplication: [
      { point: "内関（ないかん）", instruction: "手首の内側、手首のしわから指３本分ひじに向かって下がったところにあるツボです。ここは「心の扉」とも言われ、気の流れを整え、精神を安定させる重要なポイントです。\n**おすすめの使い方：** キャリアオイル（ホホバオイルなど小さじ1/2程度）に、ベルガモット1滴とローマン・カモミール1滴を希釈します。このブレンドオイルを内関に優しく塗布し、指でゆっくりと円を描くようにマッサージしましょう。塗布する際は、精油の香りを深く吸い込み、心の扉がそっと開かれ、滞っていたエネルギーが解放されるのをイメージしてみてください。", otherBenefits: ["乗り物酔いの予防・緩和", "つわりの軽減", "胸の不快感・動悸の緩和", "不眠の改善"], },
      { point: "太衝（たいしょう）", instruction: "足の甲で、親指と人差し指の骨が交わる手前のくぼみにあるツボです。「肝」の経絡の原穴で、気の流れをスムーズにし、イライラやストレスを和らげるのに効果的です。\n**おすすめの使い方：** 内関と同様のブレンドオイル（ベルガモット1滴＋ローマン・カモミール1滴をキャリアオイルで希釈）を太衝に塗布し、親指でゆっくりと押したり揉んだりしてみましょう。少し痛みを感じるかもしれませんが、それは気が滞っているサインかもしれません。深い呼吸と共に、滞りが解き放たれるイメージで行ってください。", otherBenefits: ["頭痛・めまいの緩和", "目の疲れ", "生理不順・生理痛の改善", "高血圧の予防"], },
      { point: "膻中（だんちゅう）", instruction: "胸の中央、左右の乳首を結んだ線の真ん中にあるツボです。「気の海」とも言われ、胸のつかえや息苦しさを和らげ、感情のバランスを整えます。\n**おすすめの使い方：** 内関や太衝と同様のブレンドオイルを膻中に優しく塗布し、指の腹でゆっくりとマッサージします。ストレスや不安を感じる時に、深い呼吸と共に香りを吸い込みながら行うと効果的です。", otherBenefits: ["動悸・息切れの緩和", "咳・喘息の症状軽減", "精神的な安定", "母乳の出を良くする"], }
    ],
    generalOilApplications: [
      { methodName: "芳香浴 (Aromatic Diffusion)", icon: "💨", description: "日中はベルガモットやマンダリンの明るい香りをディフューザーでお部屋に広げ、気分をリフレッシュ。夜はローマン・カモミールやフランキンセンスで、心を鎮める落ち着いた空間を演出しましょう。" },
      { methodName: "アロマバス (Aroma Bath)", icon: "🛁", description: "ぬるめのお湯に、ローマン・カモミールまたはネロリ（キャリアオイルやバスオイルで希釈推奨）を3〜5滴垂らし、ゆっくりと入浴。心身の緊張を解きほぐし、深いリラックスへと誘います。" },
      { methodName: "簡単吸入 (Simple Inhalation)", icon: "🤧", description: "ハンカチやティッシュにベルガモットやフランキンセンスを1滴。外出先で気分が塞いだ時や、リラックスしたい時にそっと香りを嗅いでみてください。呼吸が深まり、心が穏やかになるのを感じられるでしょう。" },
      { methodName: "大切な注意点", icon: "⚠️", description: "精油を肌に塗布する際は、必ずキャリアオイル（ホホバオイル、スイートアーモンドオイルなどがお勧め）で1%以下（例：キャリアオイル10mlに対し精油2滴）に希釈してください。特にベルガモットやマンダリンなどの柑橘系精油を塗布した後は、光毒性に注意し、4〜5時間は直射日光を避けてください。" }
    ],
    lifestyleAdvice: [ "食事：気の巡りを促す香味野菜（三つ葉、春菊、セロリ、ミント、大葉など）や柑橘類を積極的に取り入れましょう。脂っこいものや甘いものの摂りすぎは控えめに。", "運動：ウォーキングやヨガ、ストレッチなど、ゆったりとした動きで全身の気を巡らせる運動がおすすめです。深呼吸を意識しましょう。", "睡眠：寝る前に考え事をせず、リラックスできる音楽を聴いたり、温かいハーブティーを飲んだりして、質の良い睡眠を心がけましょう。", "精神：感じたことをノートに書き出す、信頼できる人に話すなど、感情を溜め込まない工夫を。趣味や好きなことに没頭する時間も大切です。", "生活：頑張りすぎず、時には休息を。窓を開けて空気を入れ替えたり、公園など緑の多い場所で過ごしたりするのも良いでしょう。", ],
  },
  QiXu: {
    name: "気虚（ききょ）",
    icon: "🌬️",
    metaphor: "あなたのエネルギーは、まるでバッテリー切れ寸前のスマートフォンのようです。",
    cause: "もしかしたら、毎日の忙しさや心労、不規則な生活習慣で、エネルギーを消耗しすぎていませんか？十分な休息や栄養が取れていないのかもしれません。",
    hope: "植物の生命力あふれる香りで、あなたの中に眠る元気の源を呼び覚ましましょう。エネルギーが満ちてくれば、心も体も軽やかになりますよ。",
    oils: [
      { role: '君', name: 'パイン (松)', scientificName: 'Pinus sylvestris', icon: '🌲', description: "森林浴をしているような、清々しく力強い針葉樹の香りが、心身に活力を与え、疲労感を和らげます。呼吸を深くし、エネルギーの巡りをサポートしてくれるでしょう。", mainActions: ["強壮", "刺激（神経系・循環器系）", "抗炎症", "去痰", "抗菌"], precautions: ["皮膚刺激を感じる場合があるため、高濃度での使用や敏感肌の方は注意", "喘息の方は慎重に使用"], alternativeUses: ["芳香浴（特に朝や集中したい時に）", "吸入（風邪の初期症状に）", "マッサージオイル（筋肉疲労時に）"], },
      { role: '臣', name: 'ブラックスプルース', scientificName: 'Picea mariana', icon: '🌲', description: '「森のコルチゾン」とも呼ばれる、力強い針葉樹の香り。副腎をサポートし、心身の深い疲労感や無気力状態に活力を与えます。エネルギーを消耗しきったと感じる時の、頼もしいお守りとなるでしょう。', mainActions: ['副腎強壮（コルチゾン様作用）', '抗炎症', '鎮咳', '去痰', '免疫賦活'], precautions: ['一般的に安全性が高いが、敏感肌の方は希釈推奨。'], alternativeUses: ['芳香浴（特に朝や日中）', '吸入', 'マッサージオイル（副腎のある腰部や胸部に）', 'アロマバス'] },
      { role: '臣', name: 'ジンジャー (生姜)', scientificName: 'Zingiber officinale', icon: '🌶️', description: "スパイシーで温かみのある香りが、体の内側からエネルギーを湧き上がらせ、冷えを改善します。消化器系の働きを助け、気力アップにも繋がります。", mainActions: ["加温", "消化促進", "強壮", "鎮痛", "発汗促進"], precautions: ["皮膚刺激が強いため、必ず低濃度（1%以下）に希釈して使用", "敏感肌の方は特に注意"], alternativeUses: ["芳香浴（特に寒い時期に）", "フットバス（足先の冷えに）", "マッサージオイル（腹部や腰に）"], },
      { role: '佐', name: 'スイートオレンジ', scientificName: 'Citrus sinensis', icon: '🧡', description: "太陽のように明るく甘い香りが、心を元気づけ、前向きな気持ちを引き出します。気の巡りを穏やかにサポートし、消化を助ける働きも。パインとジンジャーのエネルギー補給効果を高めます。", mainActions: ["抗うつ", "鎮静", "消化促進", "強肝", "リンパ系刺激"], precautions: ["光毒性は低いが、念のため塗布後数時間は直射日光を避けるのが無難", "まれに皮膚刺激"], alternativeUses: ["芳香浴（リビングや子供部屋に）", "アロマスプレー", "マッサージオイル", "アロマバス"], },
      { role: '佐', name: 'アンジェリカ・ルート', scientificName: 'Angelica archangelica (radix)', icon: '🌿', description: '「天使のハーブ」の名を持つ、土の力強さを感じさせる香り。心身を深く強壮し、消耗したエネルギーを補います。特に、病後や大きなストレスの後など、心身の芯から疲れきってしまった時に、立ち直る力を与えてくれます。', mainActions: ['強壮（神経・消化器）', '鎮静', '消化促進', '駆風', '利尿'], precautions: ['光毒性が非常に強いため、塗布後12時間以上は直射日光を避ける。', '妊娠中は使用を避ける。', '糖尿病の方は注意（血糖値に影響の可能性）。'], alternativeUses: ['芳香浴（少量で）', 'アロマバス（少量）', 'マッサージオイル（低濃度で、日光に当たらない部位に）'] },
      { role: '使', name: 'カルダモン', scientificName: 'Elettaria cardamomum', icon: '🌱', description: "温かくスパイシーで甘さも感じるエキゾチックな香りが、消化器系を温め、食欲を増進させます。エネルギー源である脾胃の働きを助け、他の精油の効果を消化器系へと導きます。", mainActions: ["消化促進", "駆風（ガスを出す）", "強壮（消化器）", "去痰", "鎮痙"], precautions: ["皮膚刺激の可能性があるので、少量から試す"], alternativeUses: ["芳香浴", "マッサージオイル（腹部に希釈して）", "吸入（咳や痰に）"], }
    ],
    acupointApplication: [
      { point: "気海（きかい）", instruction: "おへそから指２本分真下に下がったところにあるツボです。「気の海」とも呼ばれ、エネルギーを蓄える大切な場所です。\n**おすすめの使い方：** キャリアオイル（セサミオイルなど温める性質のものがおすすめ、小さじ1/2程度）に、パイン1滴とジンジャー1滴（ジンジャーは刺激が強いのでごく少量または省略可）を希釈します。このオイルを気海に優しく塗布し、手のひらでゆっくりと円を描くように温めながらマッサージしましょう。深い呼吸と共に、エネルギーが満ちてくるのを感じてみてください。", otherBenefits: ["下痢・便秘の改善", "月経不順・生理痛の緩和", "全身倦怠感の回復", "免疫力向上"] },
      { point: "足三里（あしさんり）", instruction: "膝のお皿の外側、指4本分下にあるくぼみです。胃腸の働きを高め、全身の気を補う万能のツボと言われています。\n**おすすめの使い方：** 気海と同様のブレンドオイル（パイン1滴＋ジンジャー1滴をキャリアオイルで希釈、ジンジャーが強い場合はパインとスイートオレンジでも可）を足三里に塗布し、親指で心地よい強さで押したり揉んだりしましょう。お灸をするのも効果的です。", otherBenefits: ["胃腸虚弱の改善", "疲労回復", "免疫力向上", "足の疲れ・むくみ解消"] },
      { point: "脾兪（ひゆ）", instruction: "背中側の、第11胸椎棘突起（きょうついきょくとっき）の下から指2本分外側にあるツボです。消化器系の働きを司る「脾」のエネルギーを高めます。\n**おすすめの使い方：** 気海や足三里と同様のブレンドオイルを脾兪に塗布します。自分では押しにくい場所なので、パートナーにマッサージしてもらうか、ゴルフボールなどを床に置いて仰向けになり、脾兪のあたりに当たるようにして刺激するのも良いでしょう。", otherBenefits: ["食欲不振・消化不良の改善", "下痢・軟便の改善", "全身の倦怠感", "内臓下垂の予防"], }
    ],
    generalOilApplications: [
      { methodName: "朝の活力芳香浴", icon: "☀️", description: "朝、パインやブラックスプルース、スイートオレンジをディフューザーで香らせ、一日の始まりに活力をチャージ。ジンジャーを少量加えると、さらに温かみとエネルギーがアップします。" },
      { methodName: "温めフットバス", icon: "🦶", description: "足湯にジンジャー（1滴）とスイートオレンジ（2滴）を垂らし、足元から体を温めます。キャリアオイルやバスソルトで希釈すると肌への刺激が和らぎます。冷えを感じる時や、疲労感が強い時におすすめです。" },
      { methodName: "お腹のマッサージ", icon: "💆‍♀️", description: "キャリアオイルにカルダモン（1滴）とスイートオレンジ（2滴）を希釈し、お腹（特にみぞおち周りや下腹部）を時計回りに優しくマッサージ。消化を助け、気の巡りを促します。" },
      { methodName: "大切な注意点", icon: "⚠️", description: "ジンジャー精油は皮膚刺激が強いため、肌に塗布する際は必ず1%以下の低濃度に希釈し、敏感肌の方は特に注意してください。アンジェリカ・ルートは強い光毒性があるので、肌への使用後は12時間以上、日光を避けてください。" }
    ],
    lifestyleAdvice: [ "食事：エネルギーを補う、消化しやすく温かいものを中心に。お米、芋類、豆類、鶏肉、かぼちゃ、山芋などがおすすめです。冷たいものや生ものは控えめに。", "運動：激しい運動は避け、ウォーキングや太極拳、ヨガなど、ゆっくりとした動きで体力を消耗しすぎない程度の運動を継続しましょう。", "睡眠：夜更かしは禁物です。早めに就寝し、質の良い睡眠を十分にとることでエネルギーを養いましょう。お昼寝も効果的です。", "精神：無理をせず、疲れを感じたら休息を。自分を褒めて、ポジティブな言葉をかけるように心がけましょう。", "生活：体を冷やさないように注意し、特に足元やお腹周りを温かく保ちましょう。規則正しい生活リズムを心がけることが大切です。", ],
  },
  KetsuKyo: {
    name: "血虚（けっきょ）",
    icon: "💧",
    metaphor: "あなたの体は、栄養豊かな水が少し足りなくなった畑のようです。",
    cause: "睡眠不足や食生活の乱れ、過度なダイエット、または出産や月経などで、体を潤し養う「血（けつ）」が不足しているのかもしれません。",
    hope: "花の優しい力とハーブの滋養で、あなたの心と体に豊かな潤いを取り戻しましょう。血が満ちれば、肌艶も良くなり、精神も安定します。",
    oils: [
      { role: '君', name: 'ローズオットー', scientificName: 'Rosa damascena', icon: '🌹', description: "「花の女王」とも称される、深く甘美な香りが、心を癒し、女性特有の悩みを和らげます。血の巡りを促し、肌に潤いと輝きを与えてくれるでしょう。", mainActions: ["強壮（子宮）", "ホルモンバランス調整", "抗うつ", "鎮静", "皮膚再生"], precautions: ["妊娠初期は使用を避けるのが望ましい", "非常に高価な精油のため、大切に使う"], alternativeUses: ["芳香浴（幸福感を高める）", "スキンケア（化粧水や美容液に極少量）", "アロマバス（贅沢な気分に）"], },
      { role: '臣', name: 'ラベンダー (真正ラベンダー)', scientificName: 'Lavandula angustifolia', icon: '💜', description: "清潔感あふれる穏やかなフローラルハーブの香りが、心身の緊張を解きほぐし、質の高い睡眠へと誘います。血を補い、精神を安定させる手助けをします。", mainActions: ["鎮静", "鎮痛", "抗炎症", "抗菌", "細胞成長促進"], precautions: ["一般的に安全性が高いが、ごく稀にアレルギー反応を示す人もいる", "妊娠初期は念のため多量の使用を避ける"], alternativeUses: ["芳香浴（就寝前が特におすすめ）", "アロマスプレー", "マッサージオイル", "湿布（火傷や日焼けに）"], },
      { role: '佐', name: 'ゼラニウム', scientificName: 'Pelargonium graveolens', icon: '🌸', description: "ローズに似たフローラルな香りにミントのような爽やかさが混じり、心身のバランスを整えます。特にホルモンバランスの調整に優れ、血虚による情緒不安定や肌トラブルをサポートします。", mainActions: ["ホルモンバランス調整", "強壮（副腎・神経系）", "リンパ系刺激", "皮膚組織再生", "止血"], precautions: ["妊娠中は使用を避ける", "香りが強いので少量から試す"], alternativeUses: ["芳香浴", "マッサージオイル（むくみやセルライトケアにも）", "スキンケア", "アロマバス"], },
      { role: '佐', name: 'キャロットシード', scientificName: 'Daucus carota', icon: '🥕', description: '土の温かみを感じる独特の香り。血を補い、肝臓を強壮する働きがあります。「若返りのオイル」とも呼ばれ、血虚による肌の乾燥、シミ、しわの改善を助け、血色の良い健康的な肌へと導きます。', mainActions: ['皮膚細胞再生', '肝臓強壮', '利尿', '浄化'], precautions: ['妊娠中は使用を避ける。', '香りが独特なため、少量から試すか、他の精油とブレンドして使用。'], alternativeUses: ['スキンケア（美容オイル、クリーム、ローションに1-2滴）', 'マッサージオイル（デトックス目的で腹部に）', '芳香浴'] },
      { role: '佐', name: 'ミルラ (没薬)', scientificName: 'Commiphora myrrha', icon: '🏺', description: '古来より神聖な香料として用いられてきた、スモーキーで深みのある樹脂の香り。血を巡らせる力と、傷を癒す力に優れます。血虚による精神的な不安定さを鎮め、心に落ち着きと強さをもたらします。', mainActions: ['抗菌', '抗炎症', '鎮痛', '去痰', '収れん', '瘢痕形成'], precautions: ['妊娠中は使用を避ける。', '粘性が高いため、ディフューザーによっては詰まることがある。'], alternativeUses: ['芳香浴', 'うがい薬（コップの水に1滴、飲まない）', 'スキンケア（軟膏やクリームに少量）'] },
      { role: '使', name: 'クラリセージ', scientificName: 'Salvia sclarea', icon: '🌿', description: "甘く温かみのあるハーブ調の香りが、幸福感をもたらし、緊張や不安を和らげます。女性特有の不調に働きかけ、ローズやラベンダーの効果を子宮や精神へと届け、調和させます。", mainActions: ["鎮静", "抗うつ", "ホルモン様作用（エストロゲン様）", "鎮痙", "血圧降下"], precautions: ["妊娠中・授乳中・てんかんのある方・婦人科系疾患のある方は使用を避ける", "運転前など集中力が必要な時は避ける（鎮静作用が強い）", "アルコール摂取との併用は避ける"], alternativeUses: ["芳香浴（リラックスしたい時）", "アロマバス", "マッサージオイル（腹部や腰に）"], }
    ],
    acupointApplication: [
      { point: "三陰交（さんいんこう）", instruction: "内くるぶしの一番高いところから、指４本分すねの骨の際を上がったところにあるツボです。女性の健康にとって非常に重要なツボです。\n**おすすめの使い方：** キャリアオイル（ローズヒップオイルなど美容効果の高いものがおすすめ、小さじ1/2程度）に、ローズオットー1滴（またはゼラニウム1滴）とラベンダー1滴を希釈します。このブレンドオイルを三陰交に優しく塗布し、ゆっくりと押さえるように刺激しましょう。特に生理前や生理中にケアすると効果的です。", otherBenefits: ["冷え性の改善", "むくみの軽減", "生理痛・月経不順の緩和", "更年期症状の緩和", "消化器系の不調改善"] },
      { point: "血海（けっかい）", instruction: "膝のお皿の内側の上、指3本分のところにあるツボです。「血の海」という名前の通り、血の流れを促し、血に関するトラブル全般に効果的です。\n**おすすめの使い方：** 三陰交と同様のブレンドオイル（ローズオットー1滴＋ラベンダー1滴をキャリアオイルで希釈、ゼラニウムも良い）を血海に塗布し、両手の親指でゆっくりと押したり、円を描くようにマッサージしたりしましょう。生理不順や肌の乾燥が気になる時に。", otherBenefits: ["生理不順・生理痛の緩和", "不正出血の改善", "皮膚のかゆみ・湿疹の緩和", "貧血の予防・改善"] },
      { point: "膈兪（かくゆ）", instruction: "背中側の、第7胸椎棘突起（きょうついきょくとっき）の下から指2本分外側にあるツボです。「血の会穴」とも呼ばれ、血に関する様々な問題に対応します。\n**おすすめの使い方：** 三陰交や血海と同様のブレンドオイルを膈兪に塗布します。自分では押しにくい場所なので、パートナーにマッサージしてもらうか、テニスボールなどを使い、床に仰向けになって刺激するのも良いでしょう。", otherBenefits: ["血行促進", "貧血症状の改善", "胸脇部の痛み", "しゃっくり"], }
    ],
    generalOilApplications: [
      { methodName: "美肌スキンケア", icon: "✨", description: "普段お使いの化粧水や乳液、キャリアオイル（ホホバオイル、ローズヒップオイルなど）にローズオットーまたはキャロットシードを1滴加え、顔やデコルテに優しくなじませます。肌に潤いと輝きを与え、血色の良い肌へと導きます。" },
      { methodName: "安眠アロマバス", icon: "🌙", description: "就寝前の入浴時に、ラベンダー（3-5滴）とクラリセージ（1-2滴）をバスタブに。キャリアオイルやバスソルトで希釈すると肌に優しく、香りがより広がります。心身の緊張を解きほぐし、質の高い睡眠をサポートします。" },
      { methodName: "優しい香りの芳香浴", icon: "🌸", description: "ラベンダーやゼラニウム、クラリセージをディフューザーで香らせ、お部屋を穏やかで優しい空間に。ローズオットーを1滴加えると、より幸福感に満ちた香りに包まれます。不安な時や心が疲れた時に。" },
      { methodName: "大切な注意点", icon: "⚠️", description: "ローズオットーは非常に高価な精油です。大切に、少量からお試しください。クラリセージは妊娠中・授乳中の方、婦人科系疾患のある方などは使用を避けてください。ゼラニウムも妊娠中は避けるのが望ましいです。" }
    ],
    lifestyleAdvice: [ "食事：血を補う食材を積極的に。ほうれん草や小松菜などの色の濃い野菜、レバー、赤身の肉、黒豆、黒ゴマ、クコの実、なつめなどがおすすめです。", "運動：激しい運動よりも、ゆったりとしたウォーキングやストレッチ、ヨガなどで、血行を穏やかに促進しましょう。", "睡眠：夜11時までには就寝し、質の高い睡眠を7～8時間確保しましょう。血は夜間に作られます。", "精神：考えすぎたり、思い悩んだりすることを避け、リラックスできる時間を作りましょう。好きな音楽を聴く、温かいお風呂に入るなどがおすすめです。", "生活：目を使いすぎると血を消耗するので、スマートフォンやパソコンの使用時間を減らし、適度に目を休ませましょう。体を冷やさないことも大切です。", ],
  },
  YinXu: {
    name: "陰虚（いんきょ）",
    icon: "🌙",
    metaphor: "あなたの体は、大切な潤いが少しずつ蒸発してしまった湖のようです。",
    cause: "加齢、慢性的な睡眠不足、精神的なストレス、過労、または熱性の飲食物の摂りすぎなどで、体を潤し冷却する「陰液」が消耗しているのかもしれません。",
    hope: "月の光のような優しい植物の力で、あなたの内なる泉に再び清らかな潤いを満たしましょう。陰が満ちれば、心の波も穏やかになり、体は内側から瑞々しく輝き始めます。",
    oils: [
      { role: '君', name: 'サンダルウッド (白檀)', scientificName: 'Santalum album / Santalum spicatum', icon: '🪵', description: "心を鎮め、深くリラックスさせるウッディで甘くエキゾチックな香り。陰液を補い、体の内なる熱を冷ます手助けをします。乾燥した肌や精神的な渇きにも潤いを。", mainActions: ["鎮静（神経系）", "抗炎症", "抗菌", "保湿", "皮膚軟化"], precautions: ["Santalum albumは希少。持続可能な供給源のものを選ぶ。"], alternativeUses: ["芳香浴（瞑想時、就寝前）", "スキンケア（乾燥肌・エイジングケア）", "アロマバス"], },
      { role: '臣', name: 'ネロリ', scientificName: 'Citrus aurantium var. amara (Flos)', icon: '🌸', description: "優雅で繊細なビターオレンジの花の香り。深いリラックス効果で心を落ち着かせ、不安や焦燥感を和らげます。サンダルウッドの働きを助け、陰虚による精神的な不調をケアします。", mainActions: ["抗うつ", "鎮静（神経系）", "抗不安", "細胞再生促進（皮膚）"], precautions: ["非常に高価", "香りが強いので少量から"], alternativeUses: ["芳香浴", "スキンケア（化粧水に1滴）", "アロマバス"], },
      { role: '臣', name: 'ベチバー', scientificName: 'Vetiveria zizanioides', icon: '🌱', description: '大地を思わせる深く重厚な香りは「静寂のオイル」とも呼ばれます。陰虚による焦燥感やのぼせ、心のざわつきを鎮め、深く地に足のついた落ち着きをもたらします。過剰な思考を止め、穏やかな眠りを誘います。', mainActions: ['鎮静（神経系）', '抗不安', '免疫賦活', '循環促進', '抗炎症'], precautions: ['香りが非常に個性的で強いため、少量から試す。', '妊娠初期は使用を避けるのが望ましい。'], alternativeUses: ['芳香浴（特に就寝前）', 'キャリアオイルで希釈して足裏やみぞおちに塗布', 'アロマバス（少量）'] },
      { role: '佐', name: 'ゼラニウム', scientificName: 'Pelargonium graveolens', icon: '🌷', description: "ローズに似たフローラルな香りが心身のバランスを整えます。陰虚によるほてりやイライラを鎮め、ホルモンバランスの乱れもサポート。肌の潤いも保ちます。", mainActions: ["ホルモンバランス調整", "鎮静", "皮膚組織再生", "抗炎症"], precautions: ["妊娠中は避ける", "香りが強いので少量から"], alternativeUses: ["芳香浴", "スキンケア", "マッサージオイル"], },
      { role: '佐', name: 'ホーウッド (リナローウッド)', scientificName: 'Cinnamomum camphora ct. linalool', icon: '🌳', description: 'ローズウッドに似た、フローラルでウッディな優しい香り。豊富なリナロール成分が、陰虚で敏感になった神経と肌を優しく鎮静します。心をなだめ、潤いを与え、穏やかな安心感で包み込んでくれます。', mainActions: ['鎮静（神経系）', '抗菌', '抗ウイルス', '抗真菌', '免疫調整'], precautions: ['一般的に安全性が高いが、ごく稀に皮膚刺激。'], alternativeUses: ['芳香浴', 'スキンケア（化粧品に）', 'アロマバス', 'マッサージオイル'] },
      { role: '使', name: 'ローマン・カモミール', scientificName: 'Chamaemelum nobile', icon: '🌼', description: "リンゴのような優しい甘い香りが、陰虚による神経の高ぶりや不眠を穏やかに鎮めます。他の精油の鎮静効果を高め、心身を深いリラックスへと導きます。", mainActions: ["鎮静", "抗炎症", "鎮痙", "精神安定"], precautions: ["キク科アレルギー注意", "妊娠初期は避ける"], alternativeUses: ["芳香浴（就寝前）", "ハーブティーとして（精油ではない）", "湿布"], },
    ],
    acupointApplication: [
      { point: "照海（しょうかい）", instruction: "内くるぶしの真下、くぼみにあるツボです。「腎」の経絡に属し、陰液を補い、のどの渇きやほてりを和らげるのに効果的です。\n**おすすめの使い方：** キャリアオイル（マカダミアナッツオイルなど保湿力の高いものがおすすめ）に、サンダルウッド1滴とネロリ1滴を希釈します。このオイルを照海に優しく塗布し、ゆっくりと指圧しましょう。", otherBenefits: ["不眠の改善", "月経不順", "耳鳴り", "足腰のだるさ"], },
      { point: "太谿（たいけい）", instruction: "内くるぶしとアキレス腱の間のくぼみにあるツボです。「腎」の原穴で、生命エネルギーの源を補い、陰虚による様々な不調を改善します。\n**おすすめの使い方：** 照海と同様のブレンドオイルを太谿に塗布し、親指でゆっくりと押したり揉んだりします。冷えを感じる場合は温めるのも良いでしょう。", otherBenefits: ["腰痛", "頻尿・夜間尿", "精力減退", "歯のトラブル"], },
      { point: "復溜（ふくりゅう）", instruction: "太谿（たいけい）から指2本分上、アキレス腱の前縁にあるツボです。「腎」の経絡に属し、陰液を補い、体の潤いを調整します。寝汗やほてりにも。\n**おすすめの使い方：** 照海や太谿と同様のブレンドオイルを復溜に塗布し、優しくマッサージします。特に下半身の潤い不足を感じる時に。", otherBenefits: ["むくみの改善", "多汗・寝汗の調整", "腰痛", "下肢の麻痺・脱力感"], }
    ],
    generalOilApplications: [
      { methodName: "潤いスキンケア", icon: "💧", description: "サンダルウッドやネロリ、ホーウッドをホホバオイルなどのキャリアオイルに1%濃度で希釈し、お風呂上がりの保湿に。乾燥が気になる部分に丁寧に塗り込みましょう。" },
      { methodName: "安らぎの芳香浴", icon: "🧘‍♀️", description: "就寝前やリラックスしたい時に、サンダルウッド、ベチバー、ローマン・カモミールをディフューザーで。心が落ち着き、穏やかな眠りへと誘います。" },
      { methodName: "クールダウンミスト", icon: "💨", description: "精製水50mlにゼラニウム1滴とローマン・カモミール1滴（またはペパーミントごく微量）を加え、よく振ってスプレー容器に入れます。ほてりを感じた時に顔や首筋にスプレー（目に入らないように注意）。" },
      { methodName: "大切な注意点", icon: "⚠️", description: "陰虚の方は刺激の強い精油や温める作用の強い精油の多用は避けましょう。サンダルウッドやネロリ、ベチバーは高価なため、大切に使用してください。" }
    ],
    lifestyleAdvice: [ "食事：体の潤いを補う食材（白きくらげ、豆腐、豆乳、梨、れんこん、山芋、豚肉、鴨肉、すっぽんなど）を積極的に。香辛料の強いもの、辛いもの、脂っこいもの、カフェインやアルコールの摂りすぎは控える。", "運動：激しい運動や大量に汗をかく運動は陰液を消耗するため避ける。ヨガ、太極拳、ゆったりとした散歩などがおすすめ。", "睡眠：夜更かしは陰を最も消耗します。夜10時〜11時までには就寝し、7〜8時間の質の良い睡眠を確保する。", "精神：過度な精神活動やストレスは陰を消耗します。瞑想や深呼吸で心を落ち着かせ、リラックスする時間を意識的に作る。", "生活：乾燥に注意し、加湿器などで適度な湿度を保つ。サウナや長風呂など、過度に汗をかく行為は控える。", ],
  },
  TanShitsu: {
    name: "痰湿（たんしつ）",
    icon: " M",
    metaphor: "あなたの体は、梅雨時のようにジメジメとした湿気が溜まり、流れが悪くなった小川のようです。",
    cause: "脂っこいものや甘いもの、冷たいものの摂りすぎ、運動不足、または消化器系の働きの低下により、体内に余分な水分や汚れが処理しきれずに溜まっているのかもしれません。",
    hope: "爽やかな植物の力で、体内の余分な湿気を取り除き、気の流れをスムーズにしましょう。体が軽くなれば、心も晴れやかになり、本来の活力が戻ってきます。",
    oils: [
      { role: '君', name: 'ジュニパーベリー', scientificName: 'Juniperus communis', icon: '🌲', description: "森林のようなクリーンでウッディな香り。強力な利尿作用と浄化作用で、体内の余分な水分や老廃物の排出を促します。「デトックスの精油」とも呼ばれます。", mainActions: ["利尿", "浄化（血液・リンパ）", "発汗", "抗リウマチ", "駆風"], precautions: ["腎臓疾患のある方、妊娠中は使用を避ける。", "長期間・高濃度の使用は腎臓に負担をかける可能性あり。"], alternativeUses: ["芳香浴（デトックスしたい時に）", "アロマバス（むくみケア）", "マッサージオイル（セルライトケア）"], },
      { role: '臣', name: 'グレープフルーツ', scientificName: 'Citrus paradisi', icon: '🍊', description: "爽やかでやや苦味のある柑橘の香り。リンパの流れを促進し、体内の余分な水分や脂肪の排出をサポートします。気分を明るくし、食欲をコントロールするのにも役立ちます。", mainActions: ["リンパ系刺激", "利尿", "脂肪溶解促進", "抗うつ", "食欲抑制"], precautions: ["光毒性に注意（塗布後4～5時間は直射日光を避ける）", "高血圧の薬など一部の薬剤と相互作用の可能性あり。"], alternativeUses: ["芳香浴（ダイエット中やリフレッシュしたい時に）", "マッサージオイル（セルライト・むくみケア）", "アロマスプレー"], },
      { role: '佐', name: 'サイプレス', scientificName: 'Cupressus sempervirens', icon: '🌲', description: "森林を思わせるウッディでスッキリとした香り。体液の循環を促し、余分な水分を排出するのを助けます。ジュニパーとグレープフルーツの働きをサポートし、むくみやセルライトにアプローチ。", mainActions: ["収れん", "利尿", "鎮静（神経系）", "デオドラント", "循環促進（静脈・リンパ）"], precautions: ["妊娠中は避ける", "ホルモン依存型疾患の方は注意"], alternativeUses: ["芳香浴", "マッサージオイル（脚のむくみ）", "フットバス"], },
      { role: '佐', name: 'シダーウッド・アトラス', scientificName: 'Cedrus atlantica', icon: '🌲', description: '甘く温かみのあるウッディな香りは、心を安定させます。リンパの流れを促し、体内の余分な水分や脂肪の排出を助ける力があります。痰湿による体の重だるさや、むくみの解消をサポートします。', mainActions: ['鎮静（神経系）', '去痰', 'リンパ系刺激', '収れん', '防虫'], precautions: ['妊娠中は使用を避ける。'], alternativeUses: ['芳香浴', 'マッサージオイル（リンパマッサージ、頭皮ケア）', 'ヘアトニック'] },
      { role: '佐', name: 'フェンネル・スイート', scientificName: 'Foeniculum vulgare var. dulce', icon: '🌱', description: 'アニスに似た、甘くスパイシーな香り。消化器系の働きを整え、痰湿の原因となる水分の滞りを解消します。お腹の張りや食欲不振を和らげ、体の中からスッキリと軽くする手助けをします。', mainActions: ['駆風', '利尿', '消化促進', '鎮痙', '浄化'], precautions: ['妊娠中、授乳中、てんかんのある方、婦人科系疾患のある方は使用を避ける。', '多量に使用すると、神経系に影響を与える可能性がある。'], alternativeUses: ['芳香浴', 'マッサージオイル（腹部や脚に）', 'アロマバス（少量）'] },
      { role: '使', name: 'ローズマリー (ct. シネオール/カンファー)', scientificName: 'Rosmarinus officinalis', icon: '🌿', description: "クリアでシャープなハーブの香り。気の巡りを良くし、停滞したエネルギーを動かします。他の精油のデトックス効果を高め、全身へと作用を届けます。消化促進や利尿作用も。", mainActions: ["刺激（循環器・神経）", "利尿", "消化促進", "去痰", "強肝"], precautions: ["高血圧、てんかん、妊娠中、授乳中は避ける", "就寝前は避ける"], alternativeUses: ["芳香浴（集中したい時）", "マッサージオイル（冷え・むくみ）", "ヘアケア"], },
    ],
    acupointApplication: [
      { point: "豊隆（ほうりゅう）", instruction: "膝の外側と外くるぶしを結ぶ線の中央、すねの骨の外側にあるツボです。「去痰の要穴」とも言われ、体内の余分な湿や痰を取り除くのに非常に効果的です。\n**おすすめの使い方：** キャリアオイル（グレープシードオイルなど軽いものがおすすめ）に、ジュニパーベリー1滴とグレープフルーツ1滴を希釈します。このオイルを豊隆に塗布し、やや強めに押したり揉んだりしましょう。", otherBenefits: ["咳・痰の緩和", "めまい", "頭痛", "便秘"], },
      { point: "陰陵泉（いんりょうせん）", instruction: "膝の内側、すねの骨を指で上がっていくと骨の角にぶつかる手前のくぼみです。「脾」の経絡に属し、水分代謝を調整し、むくみや体の重だるさを改善します。\n**おすすめの使い方：** 豊隆と同様のブレンドオイルを陰陵泉に塗布し、親指でゆっくりと押したり、円を描くようにマッサージします。", otherBenefits: ["下痢・軟便の改善", "消化不良", "食欲不振", "膝の痛み"], },
      { point: "中脘（ちゅうかん）", instruction: "おへその真上、指4本分のところにあるツボです。「胃の募穴」であり、消化器系全体の働きを高め、痰湿の原因となる水分の滞りを改善します。\n**おすすめの使い方：** 豊隆や陰陵泉と同様のブレンドオイルを中脘に塗布し、手のひらで優しく時計回りにマッサージします。食後や胃が重たいと感じる時に行うと良いでしょう。", otherBenefits: ["胃痛・胃もたれの改善", "食欲増進", "吐き気の緩和", "便秘・下痢の調整"], }
    ],
    generalOilApplications: [
      { methodName: "デトックス芳香浴＆マッサージ", icon: "🚿", description: "ジュニパーベリー、グレープフルーツ、サイプレスをブレンドして芳香浴。キャリアオイルで希釈し、お腹周りや脚など気になる部分をマッサージすると、リンパの流れを促し、デトックスをサポートします。" },
      { methodName: "スッキリフットバス", icon: "🦶", description: "足湯にジュニパーベリー2滴とローズマリー1滴を（バスソルトなどで希釈して）加えます。足のむくみやだるさを和らげ、気分もリフレッシュします。" },
      { methodName: "消化サポート吸入", icon: "🌬️", description: "食後に気分が優れない時、グレープフルーツやフェンネルをハンカチに1滴垂らして香りを嗅ぐと、消化を助け、胃の重さを軽減するのに役立ちます。" },
      { methodName: "大切な注意点", icon: "⚠️", description: "ジュニパーベリーは腎臓に疾患のある方や妊娠中の方は使用を避けてください。グレープフルーツ精油を塗布した後は光毒性に注意が必要です。ローズマリーやフェンネルは高血圧やてんかんのある方、妊娠中の方は使用を避けてください。" }
    ],
    lifestyleAdvice: [ "食事：脂っこいもの、甘いもの、味の濃いもの、乳製品、生もの、冷たいものの摂りすぎを避ける。ハトムギ、小豆、冬瓜、きゅうり、海藻類など、利水作用のある食材や、大根、玉ねぎ、生姜、ネギなど気の巡りを良くする食材を積極的にとる。", "運動：適度な運動で汗をかくことが大切。ウォーキング、ジョギング、水泳など、全身運動で気の巡りを良くし、水分代謝を促す。", "睡眠：夜更かしを避け、規則正しい生活を。寝具や寝室の湿度にも注意し、ジメジメしない環境を保つ。", "精神：思い悩みすぎると脾の働きが弱り、痰湿を生みやすくなります。気分転換を上手に行い、ストレスを溜めないようにする。", "生活：湿気の多い環境を避け、室内の換気をこまめに行う。雨の日に体調が悪化しやすい場合は特に注意。体を冷やさないようにする。", ],
  },
};

const DIAGNOSIS_DATA_EN: { [key: string]: DiagnosisPattern } = {
  KankiUkketsu: {
    name: "Liver Qi Stagnation",
    icon: "🌿",
    metaphor: "Your inner energy is like a spring stream blocked by a rock.",
    cause: "Perhaps with all the things you have to do and the consideration you show for others, you've forgotten to express your own emotions freely? Maybe you've been swallowing your words or suppressing your feelings.",
    hope: "It's okay. With the help of plants, let's restore that flow to be gentle and free again. Once the heart's blockage is cleared, your energy will naturally begin to circulate.",
    oils: [
      { role: 'Emperor', name: 'Bergamot', scientificName: 'Citrus bergamia', icon: '🍋', description: "This delicate scent, combining the freshness of citrus with the sweetness of florals, balances the mind and guides you toward a bright, positive state. Often called a 'natural antidepressant,' it helps alleviate anxiety and tension. The spirit of this sun-kissed fruit will set your mind free and bring in a gentle breeze.", mainActions: ["Sedative", "Uplifting/Refreshing", "Anxiolytic", "Digestive stimulant", "Antibacterial"], precautions: ["Photosensitive (avoid direct sunlight for 4-5 hours after application due to furanocoumarins)", "May cause skin irritation; test on a small area if you have sensitive skin"], alternativeUses: ["Aromatic diffusion (diffuser, aroma lamp)", "Aroma spray (for spaces or linens)", "Carry the scent on a handkerchief or tissue"], },
      { role: 'Minister', name: 'Roman Chamomile', scientificName: 'Chamaemelum nobile / Anthemis nobilis', icon: '🌼', description: "Also known as the 'mother of herbs,' the gentle aroma of this flower provides a sense of security, as if being embraced by the earth. Its sweet, fruity scent, reminiscent of apples, calms overwrought nerves and invites deep relaxation. It is said to soothe emotions like anxiety, tension, and anger, and promote restful sleep.", mainActions: ["Sedative", "Anti-inflammatory", "Antispasmodic", "Analgesic", "Calming"], precautions: ["Use with caution if you have an allergy to the Asteraceae (daisy) family", "Best to avoid during the first trimester of pregnancy"], alternativeUses: ["Aromatic diffusion", "Compress (hot or cold)", "Partial bath (hand or foot bath)"], },
      { role: 'Assistant', name: 'Frankincense (Olibanum)', scientificName: 'Boswellia carterii / Boswellia sacra', icon: '🪵', description: "A deep, calming resinous scent used since ancient times in meditation and religious ceremonies. It slows and deepens the breath, bringing tranquility to the mind. It supports the actions of Bergamot and Chamomile, smoothing the flow of Qi and further enhancing mental stability.", mainActions: ["Sedative", "Antidepressant", "Immunostimulant", "Cytophylactic", "Astringent"], precautions: ["No major contraindications, but use with caution during the first trimester of pregnancy"], alternativeUses: ["Aromatic diffusion (especially during meditation)", "Skincare (add a small amount to serums or creams)", "Inhalation (steam inhalation)"], },
      { role: 'Assistant', name: 'Yuzu', scientificName: 'Citrus junos', icon: '🍊', description: 'A refreshing yet warm Japanese citrus scent, familiar and comforting. It smooths the flow of stagnant Qi and uplifts the mind. Its warmth gently eases a tense mind and body, harmonizing the entire formula.', mainActions: ['Warming', 'Circulation stimulant', 'Sedative', 'Antidepressant', 'Digestive stimulant'], precautions: ['Reports of photosensitivity are rare, but it is best to avoid direct sunlight for several hours after application.', 'May cause skin irritation; test on a small area if you have sensitive skin.'], alternativeUses: ['Aromatic diffusion', 'Aroma bath', 'Massage oil (diluted in a carrier oil)'] },
      { role: 'Assistant', name: 'Blue Tansy', scientificName: 'Tanacetum annuum', icon: '💙', description: 'This beautifully indigo-colored oil has a sweet, fruity scent similar to chamomile. It calms "heat" such as repressed anger and irritation, helping to release emotions. It is especially effective for nervous agitation and allergic reactions.', mainActions: ['Antihistamine', 'Anti-inflammatory', 'Anti-allergic', 'Nervous sedative', 'Antipruritic'], precautions: ['Avoid during early pregnancy, while breastfeeding, and if you have epilepsy.', 'Use with caution if you have an allergy to the Asteraceae family.', 'Expensive oil. The color may stain clothing.'], alternativeUses: ['Aromatic diffusion', 'Topical application (diluted in a carrier oil for itching/inflammation)', 'Inhalation (for hay fever)'] },
      { role: 'Messenger', name: 'Mandarin', scientificName: 'Citrus reticulata', icon: '🍊', description: "A sweet, gentle citrus scent beloved by children and adults alike. It harmonizes the other oils, delivering the formula's energy smoothly to the Neiguan acupoint. It's gentle on the digestive system and has an uplifting effect on the mind.", mainActions: ["Sedative", "Digestive stimulant", "Anxiolytic", "Relaxing", "Circulation stimulant"], precautions: ["Photosensitivity is weaker than Bergamot, but it's still best to avoid prolonged sun exposure after application"], alternativeUses: ["Aromatic diffusion (especially in children's rooms and bedrooms)", "Massage oil (diluted in a carrier oil)", "Aroma bath"], },
      { role: 'Assistant', name: 'Neroli', scientificName: 'Citrus aurantium var. amara (Flos)', icon: '🌸', description: "An elegant, floral scent extracted from the blossoms of the bitter orange tree. It has profound relaxing effects, easing anxiety and worries, and bringing a sense of happiness. It's particularly effective for Qi stagnation caused by mental stress.", mainActions: ["Antidepressant", "Nervous sedative", "Anxiolytic", "Skin cell regeneration", "Digestive stimulant"], precautions: ["Very expensive essential oil", "The scent is strong, so start with a small amount"], alternativeUses: ["Aromatic diffusion", "Skincare (1 drop in toner or cream)", "Aroma bath", "As a perfume"], },
    ],
    acupointApplication: [
      { point: "Neiguan (PC6)", instruction: "Located on the inner side of the forearm, three finger-widths down from the wrist crease. This point is known as the 'Inner Gate' and is crucial for regulating the flow of Qi and calming the spirit.\n**How to use:** Dilute 1 drop of Bergamot and 1 drop of Roman Chamomile in 1/2 teaspoon of a carrier oil (like Jojoba). Gently apply this blend to the Neiguan point and massage in a slow, circular motion. As you apply, deeply inhale the aroma and visualize the 'Inner Gate' gently opening, releasing any stagnant energy.", otherBenefits: ["Prevents/relieves motion sickness", "Eases morning sickness", "Soothes chest discomfort/palpitations", "Improves insomnia"], },
      { point: "Taichong (LV3)", instruction: "Found on the top of the foot in the depression just before the bones of the big toe and second toe meet. This is the source point of the Liver meridian and is effective for smoothing the flow of Qi and relieving irritability and stress.\n**How to use:** Apply the same blend as for Neiguan (1 drop Bergamot + 1 drop Roman Chamomile diluted in carrier oil) to the Taichong point. Use your thumb to slowly press and knead the area. You might feel some tenderness, which can be a sign of Qi stagnation. Perform this with deep breaths, visualizing the stagnation being released.", otherBenefits: ["Relieves headaches/dizziness", "Soothes eye strain", "Improves menstrual irregularities/pain", "Helps manage high blood pressure"], },
      { point: "Danzhong (CV17)", instruction: "Located in the center of the chest, on the midline at the level of the nipples. Known as the 'Sea of Qi,' it relieves chest tightness, shortness of breath, and balances emotions.\n**How to use:** Gently apply the same blend as above to the Danzhong point and massage slowly with the pad of your finger. This is particularly effective when feeling stressed or anxious, combined with deep breathing and inhaling the aroma.", otherBenefits: ["Relieves palpitations/shortness of breath", "Reduces cough/asthma symptoms", "Promotes mental stability", "Can improve lactation"], }
    ],
    generalOilApplications: [
      { methodName: "Aromatic Diffusion", icon: "💨", description: "During the day, diffuse the bright scents of Bergamot or Mandarin to refresh your mood. In the evening, create a calm, soothing atmosphere with Roman Chamomile or Frankincense to quiet the mind." },
      { methodName: "Aroma Bath", icon: "🛁", description: "Add 3-5 drops of Roman Chamomile or Neroli (diluted in a carrier oil or bath oil) to a warm bath. Soak and relax to release physical and mental tension." },
      { methodName: "Simple Inhalation", icon: "🤧", description: "Place a drop of Bergamot or Frankincense on a handkerchief or tissue. When you feel down or want to relax while out, gently inhale the scent. You'll feel your breath deepen and your mind become calm." },
      { methodName: "Important Note", icon: "⚠️", description: "When applying essential oils to the skin, always dilute them to 1% or less (e.g., 2 drops of essential oil in 10ml of carrier oil) in a carrier oil (Jojoba or Sweet Almond oil are recommended). After applying citrus oils like Bergamot or Mandarin, avoid direct sunlight for 4-5 hours due to photosensitivity." }
    ],
    lifestyleAdvice: [ "Diet: Incorporate aromatic vegetables that promote Qi circulation (like parsley, chrysanthemum greens, celery, mint, shiso) and citrus fruits. Reduce intake of greasy and sugary foods.", "Exercise: Gentle, flowing exercises like walking, yoga, or stretching are recommended to circulate Qi throughout the body. Focus on deep breathing.", "Sleep: Avoid overthinking before bed. Try listening to relaxing music or drinking a warm herbal tea to ensure quality sleep.", "Mind: Don't bottle up your feelings. Try journaling or talking to a trusted person. Making time for hobbies and things you love is also important.", "Life: Don't push yourself too hard; take breaks when needed. Opening a window for fresh air or spending time in green spaces like parks can also be beneficial.", ],
  },
  QiXu: {
    name: "Qi Deficiency",
    icon: "🌬️",
    metaphor: "Your energy is like a smartphone with a nearly depleted battery.",
    cause: "Perhaps your daily hustle, mental strain, or irregular lifestyle has depleted your energy reserves? You might not be getting enough rest or nutrition.",
    hope: "Let's awaken the source of vitality within you with the life-affirming scents of plants. When your energy is replenished, your mind and body will feel light and vibrant again.",
    oils: [
      { role: 'Emperor', name: 'Pine', scientificName: 'Pinus sylvestris', icon: '🌲', description: "The refreshing, powerful scent of this conifer, like a walk in the forest, revitalizes the mind and body, easing fatigue. It deepens the breath and supports energy circulation.", mainActions: ["Tonic", "Stimulant (nervous, circulatory)", "Anti-inflammatory", "Expectorant", "Antibacterial"], precautions: ["May cause skin irritation; use with caution in high concentrations or if you have sensitive skin", "Use with caution if you have asthma"], alternativeUses: ["Aromatic diffusion (especially in the morning or for focus)", "Inhalation (for early cold symptoms)", "Massage oil (for muscle fatigue)"], },
      { role: 'Minister', name: 'Black Spruce', scientificName: 'Picea mariana', icon: '🌲', description: 'Known as "forest cortisone," this powerful conifer scent supports the adrenal glands, revitalizing deep physical and mental fatigue and lethargy. It is a reliable ally when you feel completely drained of energy.', mainActions: ['Adrenal tonic (cortisone-like)', 'Anti-inflammatory', 'Antitussive', 'Expectorant', 'Immunostimulant'], precautions: ['Generally considered safe, but dilution is recommended for sensitive skin.'], alternativeUses: ['Aromatic diffusion (especially in the morning/daytime)', 'Inhalation', 'Massage oil (on the lower back/adrenal area or chest)', 'Aroma bath'] },
      { role: 'Minister', name: 'Ginger', scientificName: 'Zingiber officinale', icon: '🌶️', description: "A spicy, warming aroma that sparks energy from within the body and improves coldness. It aids digestion and helps boost vitality.", mainActions: ["Warming", "Digestive stimulant", "Tonic", "Analgesic", "Diaphoretic (promotes sweating)"], precautions: ["Highly irritating to the skin; always dilute to a low concentration (1% or less)", "Use with extreme caution on sensitive skin"], alternativeUses: ["Aromatic diffusion (especially in cold weather)", "Foot bath (for cold feet)", "Massage oil (on the abdomen or lower back)"], },
      { role: 'Assistant', name: 'Sweet Orange', scientificName: 'Citrus sinensis', icon: '🧡', description: "A bright, sweet scent like the sun that uplifts the spirit and encourages a positive outlook. It gently supports Qi circulation and aids digestion, enhancing the energy-boosting effects of Pine and Ginger.", mainActions: ["Antidepressant", "Sedative", "Digestive stimulant", "Liver tonic", "Lymphatic stimulant"], precautions: ["Low photosensitivity, but it's best to avoid sun exposure for a few hours after application", "Rarely causes skin irritation"], alternativeUses: ["Aromatic diffusion (in living rooms or children's rooms)", "Aroma spray", "Massage oil", "Aroma bath"], },
      { role: 'Assistant', name: 'Angelica Root', scientificName: 'Angelica archangelica (radix)', icon: '🌿', description: 'Named the "Herb of the Angels," its earthy, powerful scent deeply strengthens the mind and body, replenishing depleted energy. It is especially helpful for recovery after illness or major stress, when you feel exhausted to the core.', mainActions: ['Tonic (nervous, digestive)', 'Sedative', 'Digestive stimulant', 'Carminative', 'Diuretic'], precautions: ['Highly photosensitive; avoid direct sunlight for at least 12 hours after application.', 'Avoid during pregnancy.', 'Use with caution if you have diabetes (may affect blood sugar).'], alternativeUses: ['Aromatic diffusion (in small amounts)', 'Aroma bath (small amounts)', 'Massage oil (in low concentration on areas not exposed to sun)'] },
      { role: 'Messenger', name: 'Cardamom', scientificName: 'Elettaria cardamomum', icon: '🌱', description: "A warm, spicy, and slightly sweet exotic aroma that warms the digestive system and stimulates appetite. It supports the Spleen and Stomach, the source of energy, and guides the effects of other oils to the digestive system.", mainActions: ["Digestive stimulant", "Carminative (expels gas)", "Tonic (digestive)", "Expectorant", "Antispasmodic"], precautions: ["May cause skin irritation, so test with a small amount first"], alternativeUses: ["Aromatic diffusion", "Massage oil (diluted, on the abdomen)", "Inhalation (for coughs and phlegm)"], }
    ],
    acupointApplication: [
      { point: "Qihai (CV6)", instruction: "Located two finger-widths directly below the navel. Known as the 'Sea of Qi,' it is a vital point for storing energy.\n**How to use:** Dilute 1 drop of Pine and 1 drop of Ginger (or a very tiny amount/omit if too strong) in a warming carrier oil like sesame oil (1/2 tsp). Gently apply this oil to the Qihai point and warm the area by massaging in a slow, circular motion with your palm. Feel the energy replenishing with each deep breath.", otherBenefits: ["Improves diarrhea/constipation", "Eases menstrual irregularities/pain", "Recovers from general fatigue", "Boosts immunity"] },
      { point: "Zusanli (ST36)", instruction: "Located four finger-widths below the outer edge of the kneecap, in a depression. It is known as a panacea point for tonifying Qi throughout the body by strengthening the stomach and intestines.\n**How to use:** Apply the same blend as for Qihai to the Zusanli point and press or knead with your thumb with comfortable pressure. Moxibustion on this point is also very effective.", otherBenefits: ["Improves weak digestion", "Aids fatigue recovery", "Boosts immunity", "Relieves leg fatigue/swelling"] },
      { point: "Pishu (BL20)", instruction: "Located on the back, two finger-widths lateral to the lower border of the 11th thoracic vertebra. It boosts the energy of the 'Spleen,' which governs the digestive system.\n**How to use:** Apply the same blend as above to the Pishu point. Since it's hard to reach yourself, have a partner massage it, or lie on your back with a golf ball placed under the area to stimulate it.", otherBenefits: ["Improves poor appetite/indigestion", "Helps with diarrhea/loose stools", "Relieves general fatigue", "Prevents organ prolapse"], }
    ],
    generalOilApplications: [
      { methodName: "Morning Vitality Diffusion", icon: "☀️", description: "In the morning, diffuse Pine, Black Spruce, and Sweet Orange to charge up for the day. Adding a small amount of Ginger will provide extra warmth and energy." },
      { methodName: "Warming Foot Bath", icon: "🦶", description: "Add Ginger (1 drop) and Sweet Orange (2 drops) to a foot bath to warm your body from the feet up. Diluting in a carrier oil or bath salt makes it gentler on the skin. Recommended when you feel cold or very tired." },
      { methodName: "Tummy Massage", icon: "💆‍♀️", description: "Dilute Cardamom (1 drop) and Sweet Orange (2 drops) in a carrier oil and gently massage your abdomen (especially around the solar plexus and lower belly) in a clockwise direction to aid digestion and promote Qi flow." },
      { methodName: "Important Note", icon: "⚠️", description: "Ginger essential oil is highly irritating to the skin; always dilute to a low concentration (1% or less) and use with extreme caution if you have sensitive skin. Angelica Root is highly photosensitive, so avoid sunlight for at least 12 hours after skin application." }
    ],
    lifestyleAdvice: [ "Diet: Focus on warm, easily digestible foods that replenish energy, such as rice, potatoes, legumes, chicken, squash, and yams. Avoid cold and raw foods.", "Exercise: Avoid strenuous exercise. Engage in moderate, consistent activities like walking, Tai Chi, or yoga that don't excessively deplete your energy.", "Sleep: Avoid staying up late. Go to bed early and get plenty of quality sleep to conserve energy. Naps can also be beneficial.", "Mind: Don't overexert yourself. Rest when you feel tired. Try to praise yourself and use positive affirmations.", "Life: Keep your body warm, especially your feet and abdomen. Maintaining a regular daily rhythm is crucial.", ],
  },
  KetsuKyo: {
    name: "Blood Deficiency",
    icon: "💧",
    metaphor: "Your body is like a field where the nutrient-rich water has become scarce.",
    cause: "A lack of 'Blood' (Xue), which nourishes and moistens the body, may be caused by lack of sleep, poor diet, excessive dieting, or events like childbirth or menstruation.",
    hope: "Let's restore rich moisture to your mind and body with the gentle power of flowers and the nourishment of herbs. When your Blood is plentiful, your skin will glow and your spirit will be calm.",
    oils: [
      { role: 'Emperor', name: 'Rose Otto', scientificName: 'Rosa damascena', icon: '🌹', description: "Known as the 'Queen of Flowers,' its deep, exquisite scent soothes the heart and eases female-specific issues. It promotes blood circulation and gives the skin moisture and radiance.", mainActions: ["Uterine tonic", "Hormone balancing", "Antidepressant", "Sedative", "Skin regeneration"], precautions: ["Best to avoid during the first trimester of pregnancy", "A very expensive essential oil, use sparingly"], alternativeUses: ["Aromatic diffusion (to enhance feelings of happiness)", "Skincare (a tiny amount in toners or serums)", "Aroma bath (for a luxurious experience)"], },
      { role: 'Minister', name: 'Lavender (True)', scientificName: 'Lavandula angustifolia', icon: '💜', description: "The clean, gentle floral-herbaceous scent releases physical and mental tension, inviting quality sleep. It helps to nourish the Blood and stabilize the spirit.", mainActions: ["Sedative", "Analgesic", "Anti-inflammatory", "Antibacterial", "Cytophylactic"], precautions: ["Generally very safe, but rare allergic reactions can occur", "As a precaution, avoid large amounts during the first trimester of pregnancy"], alternativeUses: ["Aromatic diffusion (especially before bed)", "Aroma spray", "Massage oil", "Compress (for burns or sunburns)"], },
      { role: 'Assistant', name: 'Geranium', scientificName: 'Pelargonium graveolens', icon: '🌸', description: "A floral scent similar to Rose with a hint of minty freshness, it balances the mind and body. It's particularly good for regulating hormones and supporting emotional instability and skin issues due to Blood deficiency.", mainActions: ["Hormone balancing", "Tonic (adrenal, nervous)", "Lymphatic stimulant", "Skin tissue regeneration", "Hemostatic (stops bleeding)"], precautions: ["Avoid during pregnancy", "Scent is strong, start with a small amount"], alternativeUses: ["Aromatic diffusion", "Massage oil (for puffiness and cellulite)", "Skincare", "Aroma bath"], },
      { role: 'Assistant', name: 'Carrot Seed', scientificName: 'Daucus carota', icon: '🥕', description: 'A unique scent with the warmth of the earth. It nourishes the Blood and strengthens the liver. Known as a "rejuvenating oil," it helps improve skin dryness, spots, and wrinkles caused by Blood deficiency, leading to a healthy, rosy complexion.', mainActions: ['Skin cell regeneration', 'Liver tonic', 'Diuretic', 'Depurative (purifying)'], precautions: ['Avoid during pregnancy.', 'The scent is unique, so start with a small amount or blend with other oils.'], alternativeUses: ['Skincare (1-2 drops in beauty oils, creams, lotions)', 'Massage oil (on the abdomen for detox purposes)', 'Aromatic diffusion'] },
      { role: 'Assistant', name: 'Myrrh', scientificName: 'Commiphora myrrha', icon: '🏺', description: 'A smoky, deep resinous scent used as a sacred incense since ancient times. It excels at moving blood and healing wounds. It calms the mental instability associated with Blood deficiency, bringing peace and strength to the mind.', mainActions: ['Antibacterial', 'Anti-inflammatory', 'Analgesic', 'Expectorant', 'Astringent', 'Cicatrisant (scar healing)'], precautions: ['Avoid during pregnancy.', 'Its high viscosity may clog some diffusers.'], alternativeUses: ['Aromatic diffusion', 'Gargle (1 drop in a glass of water, do not swallow)', 'Skincare (in ointments or creams)'] },
      { role: 'Messenger', name: 'Clary Sage', scientificName: 'Salvia sclarea', icon: '🌿', description: "A sweet, warm, herbaceous scent that brings a sense of euphoria and eases tension and anxiety. It addresses female-specific complaints and delivers the effects of Rose and Lavender to the uterus and spirit, creating harmony.", mainActions: ["Sedative", "Antidepressant", "Hormone-like (estrogenic)", "Antispasmodic", "Hypotensive (lowers blood pressure)"], precautions: ["Avoid if pregnant, breastfeeding, epileptic, or have gynecological conditions", "Avoid before activities requiring concentration (strong sedative)", "Avoid with alcohol"], alternativeUses: ["Aromatic diffusion (for relaxation)", "Aroma bath", "Massage oil (on abdomen or lower back)"], }
    ],
    acupointApplication: [
      { point: "Sanyinjiao (SP6)", instruction: "Located four finger-widths up from the highest point of the inner ankle, along the back of the shinbone. This is an extremely important point for women's health.\n**How to use:** Dilute 1 drop of Rose Otto (or Geranium) and 1 drop of Lavender in a carrier oil with high cosmetic value like Rosehip oil (1/2 tsp). Gently apply this blend to the Sanyinjiao point and stimulate with gentle pressure. It is especially effective to care for this point before and during menstruation.", otherBenefits: ["Improves poor circulation/coldness", "Reduces swelling/edema", "Eases menstrual pain/irregularities", "Alleviates menopausal symptoms", "Helps with digestive issues"] },
      { point: "Xuehai (SP10)", instruction: "Located on the inner thigh, three finger-widths above the inner top corner of the kneecap. As its name 'Sea of Blood' suggests, it is effective for all blood-related issues by promoting blood flow.\n**How to use:** Apply the same blend as for Sanyinjiao to the Xuehai point. Use both thumbs to press slowly or massage in a circular motion. Useful for irregular periods or dry skin.", otherBenefits: ["Eases menstrual irregularities/pain", "Helps with abnormal uterine bleeding", "Soothes skin itching/eczema", "Prevents/improves anemia"] },
      { point: "Gesu (BL17)", instruction: "Located on the back, two finger-widths lateral to the lower border of the 7th thoracic vertebra. It is the 'Meeting Point of the Blood' and addresses various blood-related problems.\n**How to use:** Apply the same blend as above to the Gesu point. Since it's hard to reach, have a partner massage it, or lie on your back with a tennis ball to stimulate the area.", otherBenefits: ["Promotes blood circulation", "Improves anemia symptoms", "Relieves chest/flank pain", "Helps with hiccups"], }
    ],
    generalOilApplications: [
      { methodName: "Radiant Skincare", icon: "✨", description: "Add 1 drop of Rose Otto or Carrot Seed to your usual toner, moisturizer, or carrier oil (like Jojoba or Rosehip). Gently apply to your face and décolletage to give your skin moisture, radiance, and a healthy glow." },
      { methodName: "Restful Sleep Aroma Bath", icon: "🌙", description: "In your bath before bed, add Lavender (3-5 drops) and Clary Sage (1-2 drops). Diluting in carrier oil or bath salts is gentler on the skin and helps the scent disperse. It releases tension and supports quality sleep." },
      { methodName: "Gentle Scent Diffusion", icon: "🌸", description: "Diffuse Lavender, Geranium, or Clary Sage to create a calm and gentle atmosphere. Adding 1 drop of Rose Otto will envelop you in a more blissful aroma. Perfect for when you're feeling anxious or mentally tired." },
      { methodName: "Important Note", icon: "⚠️", description: "Rose Otto is a very expensive oil; please use it sparingly. Clary Sage should be avoided by those who are pregnant, breastfeeding, or have gynecological conditions. It's also best to avoid Geranium during pregnancy." }
    ],
    lifestyleAdvice: [ "Diet: Actively consume blood-nourishing foods like dark leafy greens (spinach, komatsuna), liver, red meat, black beans, black sesame, goji berries, and dates.", "Exercise: Opt for gentle exercises that promote mild circulation, such as leisurely walking, stretching, and yoga, rather than intense workouts.", "Sleep: Blood is produced at night, so aim to be in bed by 11 PM and get 7-8 hours of quality sleep.", "Mind: Avoid overthinking and worry. Make time to relax by listening to favorite music or taking a warm bath.", "Life: Overusing your eyes consumes Blood, so reduce screen time on phones and computers and rest your eyes regularly. Keeping your body warm is also important.", ],
  },
  YinXu: {
    name: "Yin Deficiency",
    icon: "🌙",
    metaphor: "Your body is like a lake where the precious water has slowly evaporated.",
    cause: "The body's cooling and moistening 'Yin' fluids may be depleted due to aging, chronic lack of sleep, mental stress, overwork, or excessive consumption of 'hot' foods and drinks.",
    hope: "Let's replenish the pure moisture in your inner spring with the gentle, moonlight-like power of plants. When Yin is full, the waves of the mind will calm, and the body will radiate with a dewy glow from within.",
    oils: [
      { role: 'Emperor', name: 'Sandalwood', scientificName: 'Santalum album / Santalum spicatum', icon: '🪵', description: "A woody, sweet, exotic scent that calms the mind and promotes deep relaxation. It helps to replenish Yin fluids and cool the body's internal heat, providing moisture for dry skin and a thirsty spirit.", mainActions: ["Nervous sedative", "Anti-inflammatory", "Antibacterial", "Moisturizing", "Skin-softening"], precautions: ["Santalum album is rare; choose sustainably sourced options."], alternativeUses: ["Aromatic diffusion (during meditation, before bed)", "Skincare (for dry, aging skin)", "Aroma bath"], },
      { role: 'Minister', name: 'Neroli', scientificName: 'Citrus aurantium var. amara (Flos)', icon: '🌸', description: "An elegant, delicate scent from bitter orange blossoms. Its deep relaxing effect calms the mind and soothes anxiety and agitation. It supports Sandalwood's action and cares for the mental-emotional distress of Yin deficiency.", mainActions: ["Antidepressant", "Nervous sedative", "Anxiolytic", "Skin cell regeneration"], precautions: ["Very expensive", "Scent is strong, start with a small amount"], alternativeUses: ["Aromatic diffusion", "Skincare (1 drop in toner)", "Aroma bath"], },
      { role: 'Minister', name: 'Vetiver', scientificName: 'Vetiveria zizanioides', icon: '🌱', description: 'Known as the "Oil of Tranquility," its deep, earthy scent calms the agitation, hot flashes, and mental restlessness of Yin deficiency. It brings a profound sense of groundedness, stops overthinking, and invites peaceful sleep.', mainActions: ['Nervous sedative', 'Anxiolytic', 'Immunostimulant', 'Circulation stimulant', 'Anti-inflammatory'], precautions: ['Scent is very unique and strong; start with a small amount.', 'Best to avoid during the first trimester of pregnancy.'], alternativeUses: ['Aromatic diffusion (especially before bed)', 'Apply diluted to the soles of the feet or solar plexus', 'Aroma bath (small amount)'] },
      { role: 'Assistant', name: 'Geranium', scientificName: 'Pelargonium graveolens', icon: '🌷', description: "A floral scent similar to Rose that balances the mind and body. It calms the hot flashes and irritability of Yin deficiency, supports hormonal imbalances, and helps maintain skin moisture.", mainActions: ["Hormone balancing", "Sedative", "Skin tissue regeneration", "Anti-inflammatory"], precautions: ["Avoid during pregnancy", "Scent is strong, start with a small amount"], alternativeUses: ["Aromatic diffusion", "Skincare", "Massage oil"], },
      { role: 'Assistant', name: 'Ho Wood (Linalool Wood)', scientificName: 'Cinnamomum camphora ct. linalool', icon: '🌳', description: 'A gentle, floral, and woody scent similar to Rosewood. Its high linalool content gently soothes nerves and skin that have become sensitive due to Yin deficiency. It calms the mind, provides moisture, and envelops you in a sense of gentle security.', mainActions: ['Nervous sedative', 'Antibacterial', 'Antiviral', 'Antifungal', 'Immune-modulating'], precautions: ['Generally very safe, but rare skin irritation can occur.'], alternativeUses: ['Aromatic diffusion', 'Skincare (in cosmetics)', 'Aroma bath', 'Massage oil'] },
      { role: 'Messenger', name: 'Roman Chamomile', scientificName: 'Chamaemelum nobile', icon: '🌼', description: "A gentle, sweet, apple-like aroma that calms the nervous agitation and insomnia of Yin deficiency. It enhances the sedative effects of other oils, guiding the mind and body into deep relaxation.", mainActions: ["Sedative", "Anti-inflammatory", "Antispasmodic", "Calming"], precautions: ["Caution for Asteraceae family allergies", "Avoid in first trimester of pregnancy"], alternativeUses: ["Aromatic diffusion (before bed)", "As an herbal tea (not the essential oil)", "Compress"], },
    ],
    acupointApplication: [
      { point: "Zhaohai (KI6)", instruction: "Located in the depression directly below the inner ankle bone. Belonging to the Kidney meridian, it is effective for replenishing Yin fluids and relieving thirst and hot flashes.\n**How to use:** Dilute 1 drop of Sandalwood and 1 drop of Neroli in a highly moisturizing carrier oil (like Macadamia Nut oil). Gently apply this blend to the Zhaohai point and apply slow, steady pressure.", otherBenefits: ["Improves insomnia", "Helps with menstrual irregularities", "Relieves tinnitus", "Eases lower back and leg soreness"], },
      { point: "Taixi (KI3)", instruction: "Located in the depression between the inner ankle bone and the Achilles tendon. As the source point of the Kidney meridian, it replenishes the very source of life energy and improves various symptoms of Yin deficiency.\n**How to use:** Apply the same blend as for Zhaohai to the Taixi point, pressing and kneading slowly with your thumb. Warming the point can also be beneficial if you feel cold.", otherBenefits: ["Relieves lower back pain", "Helps with frequent/nighttime urination", "Improves low libido", "Aids with dental issues"], },
      { point: "Fuliu (KI7)", instruction: "Located two finger-widths above Taixi, on the anterior border of the Achilles tendon. Also on the Kidney meridian, it replenishes Yin and regulates the body's moisture. Also for night sweats and hot flashes.\n**How to use:** Apply the same blend as above to the Fuliu point and massage gently. Especially helpful when feeling a lack of moisture in the lower body.", otherBenefits: ["Improves edema", "Regulates sweating/night sweats", "Relieves lower back pain", "Helps with lower limb paralysis/weakness"], }
    ],
    generalOilApplications: [
      { methodName: "Moisturizing Skincare", icon: "💧", description: "Dilute Sandalwood, Neroli, or Ho Wood to 1% in a carrier oil like Jojoba and use as a post-bath moisturizer. Carefully apply to areas of concern for dryness." },
      { methodName: "Tranquil Diffusion", icon: "🧘‍♀️", description: "Diffuse Sandalwood, Vetiver, and Roman Chamomile before bed or when you want to relax. It will calm your mind and invite peaceful sleep." },
      { methodName: "Cool Down Mist", icon: "💨", description: "In a spray bottle, mix 50ml of purified water with 1 drop of Geranium and 1 drop of Roman Chamomile (or a tiny amount of Peppermint). Shake well. Spray on your face and neck when you feel a hot flash (avoiding eyes)." },
      { methodName: "Important Note", icon: "⚠️", description: "Those with Yin deficiency should avoid overuse of stimulating or strongly warming essential oils. Sandalwood, Neroli, and Vetiver are precious oils; please use them mindfully." }
    ],
    lifestyleAdvice: [ "Diet: Actively eat foods that replenish body fluids (e.g., white fungus, tofu, soy milk, pears, lotus root, yams, pork, duck, turtle). Avoid spicy, pungent, greasy foods, and excessive caffeine and alcohol.", "Exercise: Avoid intense workouts or activities that cause heavy sweating, as this depletes Yin. Yoga, Tai Chi, and leisurely walks are recommended.", "Sleep: Staying up late is the biggest drain on Yin. Aim to be in bed by 10-11 PM and get 7-8 hours of quality sleep.", "Mind: Excessive mental activity and stress deplete Yin. Consciously make time to relax, calm the mind with meditation or deep breathing.", "Life: Protect yourself from dryness by using a humidifier. Avoid activities that cause excessive sweating, like saunas or long, hot baths.", ],
  },
  TanShitsu: {
    name: "Phlegm-Dampness",
    icon: " M",
    metaphor: "Your body is like a sluggish stream in the rainy season, clogged with dampness and poor flow.",
    cause: "Excess moisture and waste may have accumulated in your body due to overconsumption of greasy, sweet, or cold foods, lack of exercise, or a weakened digestive system that can't process them properly.",
    hope: "Let's use the power of refreshing plants to clear out the excess dampness and smooth the flow of Qi. As your body feels lighter, your mind will clear, and your natural vitality will return.",
    oils: [
      { role: 'Emperor', name: 'Juniper Berry', scientificName: 'Juniperus communis', icon: '🌲', description: "A clean, woody scent like a forest. Its powerful diuretic and purifying actions promote the elimination of excess water and waste products from the body. It is often called the 'detox oil.'", mainActions: ["Diuretic", "Depurative (blood, lymph)", "Diaphoretic", "Anti-rheumatic", "Carminative"], precautions: ["Avoid if you have kidney disease or are pregnant.", "Long-term or high-concentration use may strain the kidneys."], alternativeUses: ["Aromatic diffusion (for detox)", "Aroma bath (for edema)", "Massage oil (for cellulite)"], },
      { role: 'Minister', name: 'Grapefruit', scientificName: 'Citrus paradisi', icon: '🍊', description: "A refreshing, slightly bitter citrus scent. It stimulates lymphatic flow and supports the elimination of excess water and fat. It also brightens the mood and can help control appetite.", mainActions: ["Lymphatic stimulant", "Diuretic", "Lipolytic (fat-dissolving)", "Antidepressant", "Appetite suppressant"], precautions: ["Photosensitive (avoid direct sunlight for 4-5 hours after application)", "May interact with certain medications, such as those for high blood pressure."], alternativeUses: ["Aromatic diffusion (during dieting or for refreshment)", "Massage oil (for cellulite/edema)", "Aroma spray"], },
      { role: 'Assistant', name: 'Cypress', scientificName: 'Cupressus sempervirens', icon: '🌲', description: "A clean, woody scent reminiscent of a forest. It promotes the circulation of body fluids and helps to expel excess water. It supports the work of Juniper and Grapefruit in addressing edema and cellulite.", mainActions: ["Astringent", "Diuretic", "Nervous sedative", "Deodorant", "Circulatory stimulant (venous, lymphatic)"], precautions: ["Avoid during pregnancy", "Use with caution if you have hormone-dependent conditions"], alternativeUses: ["Aromatic diffusion", "Massage oil (for leg edema)", "Foot bath"], },
      { role: 'Assistant', name: 'Cedarwood Atlas', scientificName: 'Cedrus atlantica', icon: '🌲', description: 'A sweet, warm woody scent that stabilizes the mind. It has the ability to stimulate lymph flow and help eliminate excess water and fat from the body. It supports the relief of heaviness and swelling caused by phlegm-dampness.', mainActions: ['Nervous sedative', 'Expectorant', 'Lymphatic stimulant', 'Astringent', 'Insect repellent'], precautions: ['Avoid during pregnancy.'], alternativeUses: ['Aromatic diffusion', 'Massage oil (for lymphatic massage, scalp care)', 'Hair tonic'] },
      { role: 'Assistant', name: 'Fennel, Sweet', scientificName: 'Foeniculum vulgare var. dulce', icon: '🌱', description: 'A sweet, spicy scent similar to anise. It regulates the digestive system and resolves water stagnation that can cause phlegm-dampness. It helps to relieve bloating and poor appetite, making the body feel lighter from the inside out.', mainActions: ['Carminative', 'Diuretic', 'Digestive stimulant', 'Antispasmodic', 'Depurative'], precautions: ['Avoid during pregnancy, while breastfeeding, if epileptic, or with gynecological conditions.', 'High doses may affect the nervous system.'], alternativeUses: ['Aromatic diffusion', 'Massage oil (on abdomen or legs)', 'Aroma bath (small amount)'] },
      { role: 'Messenger', name: 'Rosemary (ct. cineole/camphor)', scientificName: 'Rosmarinus officinalis', icon: '🌿', description: "A clear, sharp herbal scent. It improves Qi circulation and moves stagnant energy. It enhances the detoxifying effects of other oils and delivers their action throughout the body. Also has digestive and diuretic properties.", mainActions: ["Stimulant (circulatory, nervous)", "Diuretic", "Digestive stimulant", "Expectorant", "Liver tonic"], precautions: ["Avoid if you have high blood pressure, epilepsy, or are pregnant/breastfeeding", "Avoid before bedtime"], alternativeUses: ["Aromatic diffusion (for concentration)", "Massage oil (for coldness/edema)", "Hair care"], },
    ],
    acupointApplication: [
      { point: "Fenglong (ST40)", instruction: "Located midway between the outer knee and the outer ankle, on the outside of the shin bone. Known as the 'key point for resolving phlegm,' it is highly effective for removing excess dampness and phlegm from the body.\n**How to use:** Dilute 1 drop of Juniper Berry and 1 drop of Grapefruit in a light carrier oil (like Grapeseed). Apply this oil to the Fenglong point and knead or press firmly.", otherBenefits: ["Relieves cough/phlegm", "Eases dizziness", "Soothes headaches", "Helps with constipation"], },
      { point: "Yinlingquan (SP9)", instruction: "Located on the inner side of the leg, in the depression just below the bend of the knee where the shin bone angles. Belonging to the Spleen meridian, it regulates water metabolism and improves edema and body heaviness.\n**How to use:** Apply the same blend as for Fenglong to the Yinlingquan point, pressing slowly with your thumb or massaging in a circular motion.", otherBenefits: ["Improves diarrhea/loose stools", "Helps with indigestion", "Aids poor appetite", "Relieves knee pain"], },
      { point: "Zhongwan (CV12)", instruction: "Located four finger-widths directly above the navel. As the 'Front-Mu point of the Stomach,' it enhances the function of the entire digestive system and improves water stagnation that causes phlegm-dampness.\n**How to use:** Apply the same blend as above to the Zhongwan point and gently massage clockwise with your palm. This is beneficial after meals or when the stomach feels heavy.", otherBenefits: ["Relieves stomach pain/indigestion", "Stimulates appetite", "Eases nausea", "Regulates constipation/diarrhea"], }
    ],
    generalOilApplications: [
      { methodName: "Detox Diffusion & Massage", icon: "🚿", description: "Diffuse a blend of Juniper Berry, Grapefruit, and Cypress. When diluted in a carrier oil, massage onto areas of concern like the abdomen and legs to promote lymph flow and support detoxification." },
      { methodName: "Refreshing Foot Bath", icon: "🦶", description: "Add Juniper Berry (2 drops) and Rosemary (1 drop) to a foot bath (diluted in bath salts). It will relieve foot swelling and fatigue, and refresh your mood." },
      { methodName: "Digestive Support Inhalation", icon: "🌬️", description: "When you feel unwell after a meal, inhaling Grapefruit or Fennel from a handkerchief can help aid digestion and reduce stomach heaviness." },
      { methodName: "Important Note", icon: "⚠️", description: "Juniper Berry should be avoided by those with kidney disease or who are pregnant. Be mindful of photosensitivity after applying Grapefruit oil. Rosemary and Fennel should be avoided by those with high blood pressure, epilepsy, or who are pregnant." }
    ],
    lifestyleAdvice: [ "Diet: Avoid greasy, sweet, salty foods, dairy products, raw foods, and cold drinks. Actively consume diuretic foods like adlay, adzuki beans, winter melon, cucumber, and seaweed, as well as Qi-moving foods like daikon radish, onion, ginger, and scallions.", "Exercise: Moderate exercise that induces sweating is important. Choose whole-body activities like walking, jogging, or swimming to improve Qi circulation and promote water metabolism.", "Sleep: Avoid staying up late and maintain a regular schedule. Pay attention to the humidity of your bedding and bedroom to avoid a damp environment.", "Mind: Overthinking can weaken the Spleen, leading to phlegm-dampness. Find healthy ways to de-stress and avoid bottling up emotions.", "Life: Avoid damp environments and ventilate your home frequently. Be especially careful on rainy days if your condition worsens. Keep your body warm.", ],
  },
};

export const getDiagnosisData = (lang: 'ja' | 'en'): { [key: string]: DiagnosisPattern } => lang === 'ja' ? DIAGNOSIS_DATA_JA : DIAGNOSIS_DATA_EN;

// ==================================
// KEYWORD SETS
// ==================================
const KEYWORD_SETS_JA: { [key in DiagnosisKey]: { physical: string[]; mental: string[]; } } = {
  KankiUkketsu: { physical: ["肩こり", "首こり", "頭痛", "偏頭痛", "お腹の張り", "ガス", "便秘", "下痢と便秘を繰り返す", "喉の詰まり", "胸のつかえ", "息苦しい", "生理不順", "生理痛", "PMS", "胸が張る", "ゲップ"], mental: ["イライラ", "怒りっぽい", "落ち込む", "憂鬱", "情緒不安定", "ヒステリック", "緊張", "ため息", "落ち着かない", "不安", "プレッシャー", "ストレス"], },
  QiXu: { physical: ["疲れ", "だるい", "倦怠感", "無気力", "食欲不振", "声が小さい", "風邪をひきやすい", "汗かき", "息切れ", "めまい", "立ちくらみ", "眠い", "食後眠い", "力が入らない", "むくみ"], mental: ["やる気が出ない", "集中力がない", "物忘れ", "思考がまとまらない", "くよくよ", "落ち込む", "気力がない", "うつ"], },
  KetsuKyo: { physical: ["顔色が悪い", "青白い", "黄色い", "爪がもろい", "爪が割れやすい", "爪に線", "髪のパサつき", "抜け毛", "枝毛", "立ちくらみ", "動悸", "しびれ", "目の乾燥", "目がかすむ", "視力低下", "けいれん", "こむら返り", "皮膚の乾燥", "かゆみ"], mental: ["不安", "眠りが浅い", "夢をよく見る", "不眠", "記憶力低下", "判断力低下", "そわそわ", "驚きやすい", "悲観的", "情緒不安定"], },
  YinXu: { physical: ["ほてり", "のぼせ", "手足の熱感", "寝汗", "微熱", "口の渇き", "喉の乾燥", "空咳", "便秘", "ドライアイ", "肌の乾燥", "舌が赤い", "舌の苔が少ない"], mental: ["イライラ", "落ち着きがない", "不眠", "焦燥感", "集中力低下", "物忘れ", "不安"], },
  TanShitsu: { physical: ["体が重い", "だるい", "むくみ", "頭重感", "めまい", "吐き気", "嘔吐", "食欲不振", "胸のつかえ", "軟便", "下痢", "痰", "舌の苔が厚い", "ネバネバ", "雨の日に調子が悪い", "関節が重い"], mental: ["スッキリしない", "頭がぼーっとする", "思考が鈍い", "眠気", "うつうつ", "決断できない"], },
};

const KEYWORD_SETS_EN: { [key in DiagnosisKey]: { physical: string[]; mental: string[]; } } = {
  KankiUkketsu: { physical: ["shoulder stiffness", "neck pain", "headache", "migraine", "bloating", "gas", "constipation", "alternating diarrhea and constipation", "throat constriction", "chest tightness", "shortness of breath", "irregular periods", "period pain", "pms", "breast tenderness", "burping"], mental: ["irritable", "easily angered", "depressed", "melancholy", "emotionally unstable", "hysterical", "tense", "sighing", "restless", "anxious", "pressure", "stress"], },
  QiXu: { physical: ["tired", "fatigue", "lethargy", "listless", "poor appetite", "weak voice", "catch colds easily", "sweating easily", "shortness of breath", "dizziness", "lightheadedness", "sleepy", "sleepy after meals", "weak limbs", "edema", "puffy"], mental: ["no motivation", "lack of concentration", "forgetful", "muddled thinking", "worrying", "depressed", "no energy", "depressive"], },
  KetsuKyo: { physical: ["pale complexion", "sallow complexion", "brittle nails", "split nails", "lines on nails", "dry hair", "hair loss", "split ends", "dizziness on standing", "palpitations", "numbness", "dry eyes", "blurry vision", "poor eyesight", "cramps", "muscle spasms", "dry skin", "itchy skin"], mental: ["anxious", "light sleep", "dream-disturbed sleep", "insomnia", "poor memory", "indecisive", "restless", "easily startled", "pessimistic", "emotionally unstable"], },
  YinXu: { physical: ["hot flashes", "flushed face", "heat in palms and soles", "night sweats", "low-grade fever", "dry mouth", "dry throat", "dry cough", "constipation", "dry eyes", "dry skin", "red tongue", "scant tongue coating"], mental: ["irritable", "restless", "insomnia", "agitation", "poor concentration", "forgetful", "anxious"], },
  TanShitsu: { physical: ["heavy body", "lethargic", "edema", "puffy", "heavy head", "dizziness", "nausea", "vomiting", "poor appetite", "chest tightness", "loose stools", "diarrhea", "phlegm", "thick tongue coating", "sticky mouth", "worse on rainy days", "heavy joints"], mental: ["fuzzy head", "mental fog", "dull thinking", "sleepiness", "depressed", "indecisive"], },
};

export const getKeywordSets = (lang: 'ja' | 'en') => lang === 'ja' ? KEYWORD_SETS_JA : KEYWORD_SETS_EN;

// ==================================
// INDIVIDUAL OIL SUGGESTIONS
// ==================================

const INDIVIDUAL_OIL_SUGGESTIONS_JA: EssentialOilRecommendation[] = [
  { name: 'ペパーミント', scientificName: 'Mentha piperita', icon: '🍃', description: 'スッとした清涼感のある香りが特徴。頭痛や吐き気、乗り物酔いなどの消化器系の不快感を和らげ、集中力を高めるのに役立ちます。気分をリフレッシュしたい時にも。', keywords: ['頭痛', 'ずつう', '偏頭痛', 'へんずつう', '吐き気', 'はきけ', '乗り物酔い', 'のりものよい', '消化不良', 'しょうかふりょう', '集中力低下', 'しゅうちゅうりょくていか', '眠気覚まし', 'ねむけざまし', '胃のむかつき', 'いのむかつき', '不調', 'ふちょう', 'スッキリしたい', 'リフレッシュ', '集中'], mainActions: ['鎮痛（特に頭痛）', '制吐', '消化促進', '精神高揚', '冷却', '抗菌'], precautions: ['皮膚刺激が強いため、必ず低濃度で使用。広範囲への使用は避ける。', '妊娠中、授乳中、幼児、てんかんのある方は使用を避ける。', 'ホメオパシー治療中は影響を与える可能性がある。', '就寝前の使用は覚醒作用により不眠を招くことがある。'], alternativeUses: ['芳香浴（ディフューザー）', '吸入（ハンカチに1滴）', '冷湿布（頭痛時）', 'キャリアオイルで希釈してこめかみや首筋に少量塗布'], },
  { name: 'ユーカリ・グロブルス', scientificName: 'Eucalyptus globulus', icon: '🌳', description: 'シャープでクリアな、染み透るような強い香り。鼻や喉の不調、咳や痰が絡む時など呼吸器系のトラブルに。空気を浄化し、精神をクリアにして集中力を高めます。', keywords: ['鼻詰まり', 'はなづまり', '咳', 'せき', '痰', 'たん', '喉の痛み', 'のどのいたみ', '気管支炎', 'きかんしえん', '風邪の初期', '花粉症', 'かふんしょう', '呼吸が浅い', 'こきゅうがあさい', '空気清浄', 'クリアにしたい'], mainActions: ['去痰', '抗カタル', '鎮咳', '抗菌', '抗ウイルス', '免疫賦活'], precautions: ['皮膚刺激が強いため、必ず低濃度で使用。特に顔への使用は避ける。', '乳幼児、妊婦、授乳中、てんかんのある方、高血圧の方は使用を避ける。', '香りが強いので少量から試す。'], alternativeUses: ['蒸気吸入（マグカップにお湯と1滴）', '芳香浴', 'ルームスプレー（空気清浄）', 'キャリアオイルで希釈して胸部や背中に塗布'], },
  { name: 'ティートリー', scientificName: 'Melaleuca alternifolia', icon: '🌿', description: '清潔感のあるフレッシュでシャープな香り。強力な抗菌・抗真菌・抗ウイルス作用があり「万能薬」とも。ニキビや吹き出物、水虫、風邪やインフルエンザの予防にも。', keywords: ['ニキビ', 'にきび', '吹き出物', 'ふきでもの', '水虫', 'みずむし', 'ヘルペス', '切り傷', '擦り傷', '虫刺され', '風邪予防', 'インフルエンザ予防', 'デオドラント', '清潔にしたい', 'せいけつ', '免疫力アップ', '感染予防'], mainActions: ['抗菌', '抗真菌', '抗ウイルス', '免疫賦活', '抗炎症'], precautions: ['皮膚への直接塗布は、ごく少量・ピンポイントで可能な場合もあるが、基本的には希釈推奨。', '敏感肌の方は刺激を感じることがある。', '妊娠初期は慎重に使用。'], alternativeUses: ['芳香浴', '部分塗布（綿棒などで希釈してニキビに）', 'うがい（コップ一杯の水に1滴、飲まない）', 'フットバス（水虫ケア）', '掃除用スプレー'], },
  { name: 'レモングラス', scientificName: 'Cymbopogon citratus / flexuosus', icon: '🌾', description: 'レモンのような爽やかさの中に、グリーン調の力強さを感じる香り。心身の疲労回復やリフレッシュに。消化を助け、筋肉痛や肩こりの緩和、虫除けにも。', keywords: ['疲労回復', 'ひろうかいふく', '筋肉痛', 'きんにくつう', '肩こり', 'かたこり', '消化不良', '食欲不振', 'むくみ', '虫除け', 'むしよけ', '気分転換', 'きぶんてんかん', 'リフレッシュしたい', 'だるさ', '元気がないとき'], mainActions: ['鎮痛', '抗炎症', '消化促進', '血管拡張', '抗菌', '防虫'], precautions: ['皮膚刺激が強いため、必ず低濃度（1%以下）で使用。', '妊娠中は使用を避ける。', '緑内障の方は眼圧を上げる可能性があるため使用を避ける。'], alternativeUses: ['芳香浴', 'アロマスプレー（虫除け、ルームフレッシュナー）', 'フットバス', 'スポーツ後のマッサージオイル（低濃度で）'], },
  { name: 'サイプレス', scientificName: 'Cupressus sempervirens', icon: '🌲', description: '森林を思わせる、ウッディでスッキリとした香り。心を引き締め、感情の揺らぎを鎮めます。「変化と変容」をサポートするとも。体液循環を促し、むくみやセルライト、多汗にも。', keywords: ['むくみ', 'セルライト', '多汗', '月経過多', '更年期', '感情の整理', 'かなしみ', '悲しみ', '決断力', '変化', 'へんか', 'デトックス', '心の整理', '足のだるさ', '静脈瘤'], mainActions: ['収れん', '利尿', '鎮静（神経系）', 'デオドラント', '循環促進（静脈・リンパ）'], precautions: ['妊娠中は使用を避ける。', 'ホルモン依存型がん疾患や乳腺症の方は使用を避ける（ホルモン様作用の可能性）。'], alternativeUses: ['芳香浴', 'マッサージオイル（脚のむくみケア）', 'フットバス', 'デオドラントスプレー'], },
  { name: 'ベチバー', scientificName: 'Vetiveria zizanioides', icon: '🌱', description: '大地を思わせる深く落ち着いた土の香りが、心の奥深くまで届き、グラウンディングを促します。不安や緊張、思考過多で落ち着かない夜に。心の揺らぎを鎮め、安定感をもたらします。', keywords: ['不安', 'ふあん', '緊張', 'きんちょう', 'ストレス', '不眠', 'ふみん', '落ち着かない', 'おちつかない', 'グラウンディング', '思考過多', 'しこうかた', 'パニック', '眠れない', 'ねむれない', '地に足をつける', '瞑想'], mainActions: ['鎮静（神経系）', '抗不安', '免疫賦活', '循環促進', '抗炎症'], precautions: ['香りが非常に個性的で強いため、少量から試す。', '妊娠初期は使用を避けるのが望ましい。'], alternativeUses: ['芳香浴（特に就寝前）', 'キャリアオイルで希釈して足裏やみぞおちに塗布', 'アロマバス（少量）'] },
  { name: 'イランイラン', scientificName: 'Cananga odorata genuina', icon: '🌺', description: 'エキゾチックで濃厚な甘い花の香りが、幸福感とリラックス感をもたらします。ストレスや不安を和らげ、心を高揚させ、自信を与えてくれるとも言われます。ロマンティックな気分を高めたい時にも。', keywords: ['ストレス', '不安', 'ふあん', '緊張', 'きんちょう', 'リラックス', '幸福感', 'こうふくかん', '自信', 'じしん', 'ロマンティック', '催淫', '高揚感', 'こうようかん', '落ち込み', 'おちこみ', '官能的', '女性らしさ'], mainActions: ['鎮静', '抗うつ', '血圧降下', '催淫', '神経バランス調整'], precautions: ['香りが非常に濃厚で強いため、少量から試す。多量に使うと頭痛や吐き気を催すことがある。', '敏感肌の方は皮膚刺激の可能性あり。', '低血圧の方は注意。'], alternativeUses: ['芳香浴（少量で）', 'アロマバス（少量）', 'マッサージオイル（キャリアオイルで十分に希釈）', '香水として（ごく少量）'] },
  { name: 'サンダルウッド (白檀)', scientificName: 'Santalum album / Santalum spicatum', icon: '🪵', description: '東洋的な深く甘く、ウッディでエキゾチックな香り。心を鎮め、瞑想を深めるのに最適です。精神的な緊張を和らげ、内なる平和をもたらします。泌尿器系の不調や乾燥肌のケアにも。', keywords: ['瞑想', 'めいそう', '精神統一', '心の静寂', '緊張緩和', 'ストレス', '乾燥肌', '泌尿器トラブル', '神聖な香り', '落ち着き', 'グラウンディング', 'スピリチュアル'], mainActions: ['鎮静（神経系）', '抗炎症', '抗菌', '利尿', '皮膚軟化'], precautions: ['Santalum albumは絶滅危惧種のため、持続可能な供給源からのものを選ぶ。Santalum spicatum（オーストラリア産）などが代替としてよく用いられる。', '妊娠初期は避けるのが望ましい。'], alternativeUses: ['芳香浴（瞑想、ヨガ時）', 'スキンケア（美容オイルやクリームに）', 'アロマバス', '香水'] },
  { name: 'ジャスミン (アブソリュート)', scientificName: 'Jasminum grandiflorum / Jasminum officinale', icon: '🌸', description: '濃厚で甘美、エキゾチックな花の女王。深いリラックス効果と幸福感をもたらし、自信を高めます。特に女性の心と体のバランスを整えるのに優れ、官能的な気分も高めます。', keywords: ['うつ', '自信喪失', '無気力', '不安', 'ストレス', 'リラックス', '幸福感', '女性ホルモン様', '官能的', '悲しみ', '自己肯定感', 'ロマンス'], mainActions: ['抗うつ', '鎮静', '催淫', '精神高揚', '子宮強壮'], precautions: ['アブソリュートは溶剤抽出のため、香りが非常に強く、微量で効果を発揮。高濃度での使用は避ける。', '妊娠初期や敏感肌の方は注意。', '高価な精油。'], alternativeUses: ['芳香浴（極少量）', 'マッサージオイル（極低濃度で）', '香水', 'アロマバス（1-2滴）'] },
  { name: 'マージョラム・スイート', scientificName: 'Origanum majorana', icon: '🌿', description: '温かくややスパイシーなハーブの香り。心身の緊張を和らげ、深いリラックスと安眠を促します。「慰めのハーブ」とも。筋肉痛やこわばり、消化不良にも。', keywords: ['不眠', 'ふみん', 'ストレス', '緊張', '不安', '筋肉痛', '肩こり', '頭痛（緊張型）', '消化不良', '安眠', 'リラックス', '悲しみ', '孤独感', '慰め'], mainActions: ['鎮静（神経系）', '鎮痙', '鎮痛', '消化促進', '血圧降下'], precautions: ['妊娠初期は避ける。', '低血圧の方は注意。', '長期間・高濃度の使用は避ける。'], alternativeUses: ['芳香浴（就寝前）', 'アロマバス', 'マッサージオイル（筋肉痛、肩こりに）', '温湿布'] },
  { name: 'ローズマリー・カンファー/シネオール', scientificName: 'Rosmarinus officinalis ct. camphor / ct. cineole', icon: '🌿', description: 'クリアでシャープなハーブの香り。記憶力や集中力を高め、心を刺激して活気づけます。血行を促進し、筋肉痛や冷え性、無気力感にも。ケモタイプにより作用が異なる。', keywords: ['集中力アップ', '記憶力向上', '無気力', '疲労感', '筋肉痛', '冷え性', '血行不良', '頭がぼーっとする', '活力が欲しい', '頭脳明晰'], mainActions: ['精神高揚', '刺激（神経・循環器）', '鎮痛', '抗炎症', '去痰（シネオール）', '筋肉弛緩（カンファー）'], precautions: ['高血圧、てんかんのある方、妊娠中、授乳中、乳幼児は使用を避ける。', '皮膚刺激の可能性あり。', '就寝前の使用は避ける。'], alternativeUses: ['芳香浴（勉強中、仕事中）', 'マッサージオイル（筋肉痛、肩こりに）', 'ヘアケア（頭皮マッサージ）', '吸入（風邪）'] },
  { name: 'ミルラ (没薬)', scientificName: 'Commiphora myrrha / Commiphora molmol', icon: '🏺', description: 'スモーキーでバルサミック、やや苦味のある樹脂の香り。古くから神聖な儀式や傷の手当てに。心を鎮め、深い瞑想状態へ導きます。抗菌作用に優れ、口腔ケアや皮膚トラブルにも。', keywords: ['瞑想', '精神安定', '傷の手当て', '皮膚炎', '口腔ケア', '歯肉炎', '咳', '気管支炎', 'グラウンディング', '神聖な気持ち', '保護されたい'], mainActions: ['抗菌', '抗炎症', '鎮痛', '去痰', '収れん', '瘢痕形成'], precautions: ['妊娠中は使用を避ける。', '粘性が高いため、ディフューザーによっては詰まることがある。'], alternativeUses: ['芳香浴', 'うがい薬（コップの水に1滴、飲まない）', 'スキンケア（軟膏やクリームに少量）', '吸入'] },
  { name: 'ヘリクリサム (イモーテル)', scientificName: 'Helichrysum italicum', icon: '🌼', description: 'カレーのような独特のスパイシーな香りと蜂蜜のような甘さ。打撲や傷跡、あざのケアに非常に優れ「アロマの万能薬箱」とも。精神的なショックやトラウマを癒す力も。', keywords: ['打撲', 'あざ', '傷跡', '血腫', 'スキンケア', 'アンチエイジング', '精神的ショック', 'トラウマ', '心の傷', '皮膚再生', '血行促進', '痛み'], mainActions: ['血腫抑制', '瘢痕形成促進', '抗炎症', '鎮痛', '細胞再生'], precautions: ['妊娠初期は避ける。', '非常に高価な精油。', '香りが独特なため、少量から試す。'], alternativeUses: ['キャリアオイルで希釈して局所塗布（打撲、傷跡に）', 'スキンケア（美容オイルに）', '芳香浴（心のケア）'] },
   { name: 'シダーウッド・アトラス', scientificName: 'Cedrus atlantica', icon: '🌲', description: '甘く温かみのあるウッディな香り。心を安定させ、地に足をつけるグラウンディングを助けます。呼吸器系の不調や、フケ・抜け毛などの頭皮ケア、リンパの流れを促すのにも。', keywords: ['グラウンディング', '瞑想', '不安', '緊張', '集中', '呼吸器の不調', '咳', 'フケ', '抜け毛', '頭皮ケア', 'リンパドレナージュ', 'むくみ', '安定感'], mainActions: ['鎮静（神経系）', '去痰', 'リンパ系刺激', '収れん', '防虫'], precautions: ['妊娠中は使用を避ける。'], alternativeUses: ['芳香浴', 'マッサージオイル（リンパマッサージ、頭皮ケア）', 'ヘアトニック', '天然の防虫剤としてクローゼットに'] },
  { name: 'ユズ (柚子)', scientificName: 'Citrus junos', icon: '🍊', description: '日本人に馴染み深い、爽やかで温かみのある和の柑橘の香り。心を明るくし、リラックスさせるとともに、血行を促進し体を温めます。冬至の柚子湯のように、心身の邪気を払うとも。', keywords: ['リラックス', '温活', '冷え性', '血行促進', 'ストレス緩和', '気分転換', '和の香り', '柚子湯', '風邪予防', '消化促進', '明るい気持ち', 'おちつき'], mainActions: ['加温', '血行促進', '鎮静', '抗うつ', '消化促進', '抗菌'], precautions: ['光毒性の報告は少ないが、念のため塗布後数時間は直射日光を避けるのが無難。', '皮膚刺激を感じる場合があるため、敏感肌の方は少量から試す。'], alternativeUses: ['芳香浴', 'アロマバス', 'マッサージオイル（キャリアオイルで希釈）', 'アロマスプレー（空間やリネンに）'] },
];

const INDIVIDUAL_OIL_SUGGESTIONS_EN: EssentialOilRecommendation[] = [
  { name: 'Peppermint', scientificName: 'Mentha piperita', icon: '🍃', description: 'Characterized by a cool, refreshing scent. It helps relieve digestive discomforts like headaches, nausea, and motion sickness, and enhances concentration. Also great for when you want to feel refreshed.', keywords: ['headache', 'nausea', 'motion sickness', 'indigestion', 'low concentration', 'staying awake', 'upset stomach', 'discomfort', 'refresh', 'focus'], mainActions: ['Analgesic (especially for headaches)', 'Antiemetic', 'Digestive stimulant', 'Cephalic', 'Cooling', 'Antibacterial'], precautions: ['Strong skin irritant; always use in low dilution and avoid use over large areas.', 'Avoid during pregnancy, while breastfeeding, in young children, and if you have epilepsy.', 'May interfere with homeopathic treatment.', 'Use before bed may cause sleeplessness due to its stimulating effect.'], alternativeUses: ['Aromatic diffusion', 'Inhalation (1 drop on a handkerchief)', 'Cold compress (for headaches)', 'Apply diluted to temples or back of the neck'], },
  { name: 'Eucalyptus Globulus', scientificName: 'Eucalyptus globulus', icon: '🌳', description: 'A sharp, clear, and penetrating strong scent. Excellent for respiratory issues such as nasal and throat discomfort, coughs, and phlegm. It purifies the air, clears the mind, and enhances concentration.', keywords: ['nasal congestion', 'cough', 'phlegm', 'sore throat', 'bronchitis', 'early cold', 'hay fever', 'shallow breathing', 'air purification', 'clear mind'], mainActions: ['Expectorant', 'Anticatarrhal', 'Antitussive', 'Antibacterial', 'Antiviral', 'Immunostimulant'], precautions: ['Strong skin irritant; always use in low dilution and avoid facial application.', 'Avoid with infants, pregnant or breastfeeding women, and those with epilepsy or high blood pressure.', 'The scent is strong; start with a small amount.'], alternativeUses: ['Steam inhalation (1 drop in a mug of hot water)', 'Aromatic diffusion', 'Room spray (for air purification)', 'Apply diluted to chest and back'], },
  { name: 'Tea Tree', scientificName: 'Melaleuca alternifolia', icon: '🌿', description: 'A clean, fresh, and sharp scent. With powerful antibacterial, antifungal, and antiviral properties, it\'s known as a "first aid kit in a bottle." Useful for acne, athlete\'s foot, and preventing colds and flu.', keywords: ['acne', 'pimple', 'athletes foot', 'herpes', 'cuts', 'scrapes', 'insect bites', 'cold prevention', 'flu prevention', 'deodorant', 'cleanliness', 'boost immunity', 'infection prevention'], mainActions: ['Antibacterial', 'Antifungal', 'Antiviral', 'Immunostimulant', 'Anti-inflammatory'], precautions: ['Direct skin application is sometimes possible in very small, targeted amounts, but dilution is generally recommended.', 'May cause irritation on sensitive skin.', 'Use with caution during the first trimester of pregnancy.'], alternativeUses: ['Aromatic diffusion', 'Spot treatment (diluted, on a cotton swab for acne)', 'Gargle (1 drop in a glass of water, do not swallow)', 'Foot bath (for athlete\'s foot)', 'Cleaning spray'], },
  { name: 'Lemongrass', scientificName: 'Cymbopogon citratus / flexuosus', icon: '🌾', description: 'A scent with lemon-like freshness and a strong, green undertone. Great for physical and mental fatigue recovery and refreshment. It aids digestion, relieves muscle pain and stiffness, and repels insects.', keywords: ['fatigue recovery', 'muscle pain', 'stiff shoulders', 'indigestion', 'poor appetite', 'edema', 'insect repellent', 'refresh', 'lethargy', 'low energy'], mainActions: ['Analgesic', 'Anti-inflammatory', 'Digestive stimulant', 'Vasodilator', 'Antibacterial', 'Insect repellent'], precautions: ['Strong skin irritant; always use in low dilution (1% or less).', 'Avoid during pregnancy.', 'Avoid if you have glaucoma, as it may increase eye pressure.'], alternativeUses: ['Aromatic diffusion', 'Aroma spray (insect repellent, room freshener)', 'Foot bath', 'Post-sport massage oil (in low dilution)'], },
  { name: 'Cypress', scientificName: 'Cupressus sempervirens', icon: '🌲', description: 'A woody, clean scent reminiscent of a forest. It helps to ground the mind and calm emotional fluctuations. Said to support "change and transition." It also promotes fluid circulation, addressing edema, cellulite, and excessive sweating.', keywords: ['edema', 'cellulite', 'excessive sweating', 'heavy periods', 'menopause', 'emotional balance', 'grief', 'sadness', 'decisiveness', 'change', 'detox', 'clearing the mind', 'heavy legs', 'varicose veins'], mainActions: ['Astringent', 'Diuretic', 'Nervous sedative', 'Deodorant', 'Circulatory stimulant (venous, lymphatic)'], precautions: ['Avoid during pregnancy.', 'Avoid with hormone-dependent cancers or mastosis due to possible hormone-like action.'], alternativeUses: ['Aromatic diffusion', 'Massage oil (for leg edema)', 'Foot bath', 'Deodorant spray'], },
  { name: 'Vetiver', scientificName: 'Vetiveria zizanioides', icon: '🌱', description: 'A deep, earthy, grounding scent that reaches deep into the soul. For nights when you are anxious, tense, or overthinking. It calms mental fluctuations and brings a sense of stability.', keywords: ['anxiety', 'tension', 'stress', 'insomnia', 'restless', 'grounding', 'overthinking', 'panic', 'sleeplessness', 'get grounded', 'meditation'], mainActions: ['Nervous sedative', 'Anxiolytic', 'Immunostimulant', 'Circulation stimulant', 'Anti-inflammatory'], precautions: ['The scent is very unique and strong; start with a small amount.', 'Best to avoid during the first trimester of pregnancy.'], alternativeUses: ['Aromatic diffusion (especially before bed)', 'Apply diluted to soles of feet or solar plexus', 'Aroma bath (small amount)'] },
  { name: 'Ylang Ylang', scientificName: 'Cananga odorata genuina', icon: '🌺', description: 'An exotic, intensely sweet floral aroma that brings feelings of euphoria and relaxation. It eases stress and anxiety, uplifts the spirit, and is said to boost confidence. Also for creating a romantic mood.', keywords: ['stress', 'anxiety', 'tension', 'relax', 'euphoria', 'confidence', 'romantic', 'aphrodisiac', 'uplifting', 'depression', 'sensual', 'femininity'], mainActions: ['Sedative', 'Antidepressant', 'Hypotensive', 'Aphrodisiac', 'Nervous system balancer'], precautions: ['The scent is very rich and strong; start with a small amount. Overuse can cause headaches or nausea.', 'May cause skin irritation in sensitive individuals.', 'Use with caution if you have low blood pressure.'], alternativeUses: ['Aromatic diffusion (in small amounts)', 'Aroma bath (small amounts)', 'Massage oil (well diluted in a carrier oil)', 'As a perfume (a tiny amount)'] },
  { name: 'Sandalwood', scientificName: 'Santalum album / Santalum spicatum', icon: '🪵', description: 'A deep, sweet, woody, and exotic Eastern scent. Ideal for calming the mind and deepening meditation. It eases mental tension and brings inner peace. Also beneficial for urinary tract issues and dry skin.', keywords: ['meditation', 'mental focus', 'inner peace', 'stress relief', 'dry skin', 'urinary issues', 'sacred scent', 'calm', 'grounding', 'spiritual'], mainActions: ['Nervous sedative', 'Anti-inflammatory', 'Antibacterial', 'Diuretic', 'Skin-softening'], precautions: ['Santalum album is endangered; choose sustainably sourced options like Santalum spicatum (Australian).', 'Best to avoid in the first trimester of pregnancy.'], alternativeUses: ['Aromatic diffusion (during meditation, yoga)', 'Skincare (in beauty oils or creams)', 'Aroma bath', 'Perfume'] },
  { name: 'Jasmine Absolute', scientificName: 'Jasminum grandiflorum / Jasminum officinale', icon: '🌸', description: 'The queen of flowers, with a rich, sweet, and exotic scent. It provides deep relaxation and euphoria, boosting confidence. It excels at balancing the female mind and body and enhances sensual moods.', keywords: ['depression', 'low confidence', 'apathy', 'anxiety', 'stress', 'relax', 'euphoria', 'female hormone-like', 'sensual', 'sadness', 'self-esteem', 'romance'], mainActions: ['Antidepressant', 'Sedative', 'Aphrodisiac', 'Uplifting', 'Uterine tonic'], precautions: ['As an absolute, it is solvent-extracted and very potent; a tiny amount is effective. Avoid high concentrations.', 'Use with caution during early pregnancy and on sensitive skin.', 'Expensive oil.'], alternativeUses: ['Aromatic diffusion (very small amount)', 'Massage oil (very low dilution)', 'Perfume', 'Aroma bath (1-2 drops)'] },
  { name: 'Marjoram, Sweet', scientificName: 'Origanum majorana', icon: '🌿', description: 'A warm, slightly spicy herbal scent. It eases physical and mental tension, promoting deep relaxation and restful sleep. Known as the "herb of consolation." Also for muscle pain, stiffness, and indigestion.', keywords: ['insomnia', 'stress', 'tension', 'anxiety', 'muscle pain', 'stiff shoulders', 'tension headache', 'indigestion', 'sleep aid', 'relax', 'grief', 'loneliness', 'comfort'], mainActions: ['Nervous sedative', 'Antispasmodic', 'Analgesic', 'Digestive stimulant', 'Hypotensive'], precautions: ['Avoid in early pregnancy.', 'Use with caution if you have low blood pressure.', 'Avoid long-term, high-concentration use.'], alternativeUses: ['Aromatic diffusion (before bed)', 'Aroma bath', 'Massage oil (for muscle aches, stiffness)', 'Warm compress'] },
  { name: 'Rosemary (camphor/cineole)', scientificName: 'Rosmarinus officinalis ct. camphor / ct. cineole', icon: '🌿', description: 'A clear, sharp herbal scent. It enhances memory and concentration, stimulating and invigorating the mind. It promotes circulation, helping with muscle pain, poor circulation, and lethargy. Effects vary by chemotype.', keywords: ['focus', 'memory boost', 'lethargy', 'fatigue', 'muscle pain', 'poor circulation', 'coldness', 'mental fog', 'need energy', 'mental clarity'], mainActions: ['Cephalic', 'Stimulant (nervous, circulatory)', 'Analgesic', 'Anti-inflammatory', 'Expectorant (cineole)', 'Muscle relaxant (camphor)'], precautions: ['Avoid with high blood pressure, epilepsy, during pregnancy, while breastfeeding, and with infants.', 'Potential for skin irritation.', 'Avoid before sleep.'], alternativeUses: ['Aromatic diffusion (while studying, working)', 'Massage oil (for muscle pain, stiffness)', 'Hair care (scalp massage)', 'Inhalation (for colds)'] },
  { name: 'Myrrh', scientificName: 'Commiphora myrrha / Commiphora molmol', icon: '🏺', description: 'A smoky, balsamic, slightly bitter resinous scent. Used since antiquity in sacred rituals and for wound healing. It calms the mind, leading to deep meditative states. Excellent antibacterial properties for oral care and skin issues.', keywords: ['meditation', 'mental stability', 'wound care', 'dermatitis', 'oral care', 'gingivitis', 'cough', 'bronchitis', 'grounding', 'sacred feeling', 'protection'], mainActions: ['Antibacterial', 'Anti-inflammatory', 'Analgesic', 'Expectorant', 'Astringent', 'Cicatrisant (scar healing)'], precautions: ['Avoid during pregnancy.', 'High viscosity may clog some diffusers.'], alternativeUses: ['Aromatic diffusion', 'Gargle (1 drop in water, do not swallow)', 'Skincare (in ointments/creams)', 'Inhalation'] },
  { name: 'Helichrysum (Immortelle)', scientificName: 'Helichrysum italicum', icon: '🌼', description: 'A unique spicy scent like curry with honey-like sweetness. Excellent for bruises, scars, and hematomas, it\'s called an "aromatherapy first-aid kit." Also has the power to heal emotional shock and trauma.', keywords: ['bruise', 'hematoma', 'scar', 'skincare', 'anti-aging', 'emotional shock', 'trauma', 'emotional wounds', 'skin regeneration', 'circulation', 'pain'], mainActions: ['Anti-hematoma', 'Cicatrisant', 'Anti-inflammatory', 'Analgesic', 'Cell-regenerating'], precautions: ['Avoid in early pregnancy.', 'Very expensive oil.', 'The scent is unique, so start with a small amount.'], alternativeUses: ['Apply diluted topically (for bruises, scars)', 'Skincare (in beauty oils)', 'Aromatic diffusion (for emotional healing)'] },
  { name: 'Cedarwood, Atlas', scientificName: 'Cedrus atlantica', icon: '🌲', description: 'A sweet, warm woody scent. It stabilizes the mind and helps with grounding. Beneficial for respiratory issues, scalp care for dandruff and hair loss, and promoting lymph flow.', keywords: ['grounding', 'meditation', 'anxiety', 'tension', 'focus', 'respiratory issues', 'cough', 'dandruff', 'hair loss', 'scalp care', 'lymphatic drainage', 'edema', 'stability'], mainActions: ['Nervous sedative', 'Expectorant', 'Lymphatic stimulant', 'Astringent', 'Insect repellent'], precautions: ['Avoid during pregnancy.'], alternativeUses: ['Aromatic diffusion', 'Massage oil (lymphatic massage, scalp care)', 'Hair tonic', 'Natural moth repellent in closets'] },
  { name: 'Yuzu', scientificName: 'Citrus junos', icon: '🍊', description: 'A refreshing yet warm Japanese citrus scent, familiar and comforting. It uplifts the mind and promotes relaxation, while also stimulating circulation and warming the body. Like a winter solstice yuzu bath, it is said to purify the mind and body.', keywords: ['relax', 'warming', 'poor circulation', 'stress relief', 'refresh', 'Japanese scent', 'yuzu bath', 'cold prevention', 'digestion', 'bright mood', 'calm'], mainActions: ['Warming', 'Circulation stimulant', 'Sedative', 'Antidepressant', 'Digestive stimulant', 'Antibacterial'], precautions: ['Reports of photosensitivity are rare, but it is best to avoid direct sunlight for several hours after application.', 'May cause skin irritation; test on a small area if you have sensitive skin.'], alternativeUses: ['Aromatic diffusion', 'Aroma bath', 'Massage oil (diluted in a carrier oil)', 'Aroma spray (for spaces or linens)'] },
];

export const getIndividualOilSuggestions = (lang: 'ja' | 'en') => lang === 'ja' ? INDIVIDUAL_OIL_SUGGESTIONS_JA : INDIVIDUAL_OIL_SUGGESTIONS_EN;

// ==================================
// AI PROMPT
// ==================================

export const getAIPrompt = (
    lang: 'ja' | 'en',
    finalDiagnosis: CombinedDiagnosis,
    submittedAnswers: Record<string, string>,
    questionsData: Question[]
) => {
    const getAnswerLabel = (qId: string, val: string) => {
        const question = questionsData.find(q => q.id === qId);
        if (!question || !val) return lang === 'ja' ? '未回答' : 'Not Answered';
        const option = question.options.find(o => o.value === val);
        return option?.label || val;
    };

    const primaryName = finalDiagnosis.primary.name;
    const primaryMetaphor = finalDiagnosis.primary.metaphor;
    const secondaryNames = finalDiagnosis.secondaries.map(s => s.name).join(lang === 'ja' ? '、' : ', ') || (lang === 'ja' ? 'なし' : 'None');
    
    const physicalTextForPrompt = submittedAnswers.physicalDiscomfortsText || (lang === 'ja' ? '特に記述なし' : 'No specific description');
    const mentalTextForPrompt = submittedAnswers.mentalEmotionalStateText || (lang === 'ja' ? '特に記述なし' : 'No specific description');

    if (lang === 'ja') {
        return `あなたは、古典東洋医学と漢方アロマセラピーの深い知識を持つ、経験豊富なカウンセラーです。
以下の利用者情報を総合的に分析し、必要な情報のみを簡潔に伝えるアドバイスを生成してください。
医学的診断ではなく、あくまでライフスタイルの一部としてのセルフケアの提案に留めてください。専門用語は避け、比喩を交えながら、実用的で具体的なアドバイスを作成してください。

---
### 利用者情報

**【システムによる体質診断結果】**
*   **主診断 (最も強く出ている傾向):** ${primaryName} - ${primaryMetaphor}
*   **兼ねて見られる傾向:** ${secondaryNames}

**【ご本人が気になっていること】**
*   **身体の不調:** ${physicalTextForPrompt}
*   **心や感情の状態:** ${mentalTextForPrompt}

**【問診票の回答から抜粋】**
*   疲れやすく、すぐに横になりたいと感じることが多いですか？: ${getAnswerLabel('qi4', submittedAnswers['qi4'])}
*   イライラしやすかったり、カッとなりやすいですか？: ${getAnswerLabel('emotions1', submittedAnswers['emotions1'])}
*   寝つきは良いですか？: ${getAnswerLabel('sleep1', submittedAnswers['sleep1'])}
*   理由もなく悲しくなったり、気分が落ち込んだりしますか？: ${getAnswerLabel('emotions3', submittedAnswers['emotions3'])}

---
### 生成タスク

上記の情報を統合し、この利用者個人に向けた実用的な分析メッセージを生成してください。

**分析内容:**
1. 診断結果と、ご本人が気にしている不調（身体・心）の関連性を簡潔に説明
2. 最も重要な養生ポイントを1つに絞って、具体的で実践しやすい形で提案

**注意事項:**
- 挨拶的な言葉（「○○さん、こんにちは」「体質診断の結果と問診票から」など）は使用しない
- 必要な情報のみを簡潔に伝える
- 全体として一つの連続したテキストとして生成
- Markdownのヘッダー（#など）は使用しない
`;
    } else {
        return `You are an experienced counselor with deep knowledge of Traditional Chinese Medicine (TCM) and Kampo aromatherapy.
Analyze the following user information comprehensively and generate practical advice that conveys only necessary information.
This is not a medical diagnosis but a self-care suggestion as part of a lifestyle. Avoid technical terms, use metaphors, and create practical, specific advice.

---
### User Information

**[System's Constitutional Diagnosis Result]**
*   **Primary Diagnosis (Strongest Tendency):** ${primaryName} - ${primaryMetaphor}
*   **Concurrent Tendencies:** ${secondaryNames}

**[User's Stated Concerns]**
*   **Physical Discomforts:** ${physicalTextForPrompt}
*   **Mental/Emotional State:** ${mentalTextForPrompt}

**[Excerpts from Questionnaire Answers]**
*   Do you tire easily and often feel the need to lie down?: ${getAnswerLabel('qi4', submittedAnswers['qi4'])}
*   Are you easily irritated or quick to anger?: ${getAnswerLabel('emotions1', submittedAnswers['emotions1'])}
*   Do you fall asleep easily?: ${getAnswerLabel('sleep1', submittedAnswers['sleep1'])}
*   Do you feel sad or down for no apparent reason?: ${getAnswerLabel('emotions3', submittedAnswers['emotions3'])}

---
### Generation Task

Integrate the above information and generate a practical analysis message for this individual user.

**Analysis Content:**
1. Briefly explain the connection between the diagnosis results and the user's stated concerns (physical and mental)
2. Focus on the single most important wellness point and provide specific, practical guidance

**Important Notes:**
- Do not use greeting phrases (like "Hello [name]" or "Based on the constitutional diagnosis results and questionnaire")
- Convey only necessary information concisely
- Generate as a single, continuous block of text
- Do not use Markdown headers (#, ##, etc.)
`;
    }
};

// ==================================
// PRIVACY POLICY
// ==================================

const PRIVACY_POLICY_JA = {
    title: "プライバシーポリシー",
    effectiveDate: "制定日: 2024年7月29日",
    sections: [
        { title: "1. はじめに", content: ["<p>漢方アロマ 精油カウンセリング（以下、「本アプリケーション」といいます）は、お客様のプライバシーを尊重し、個人情報の保護に細心の注意を払っています。本プライバシーポリシーは、本アプリケーションがお客様の情報をどのように取り扱うかについて説明するものです。</p>"] },
        { title: "2. 収集する情報", content: ["<p>本アプリケーションは、お客様の体質診断を行う目的で、以下の情報をお客様に入力していただきます。</p>", "<ul class='list-disc list-inside pl-4'><li>問診票における選択式の回答</li><li>任意でご入力いただく身体の不調や精神・心の状態に関する記述</li></ul>"] },
        { title: "3. 情報の利用目的", content: ["<p>お客様からご提供いただいた情報は、以下の目的でのみ利用されます。</p>", "<ul class='list-disc list-inside pl-4'><li>古典東洋医学の考え方に基づいた体質パターンを診断するため</li><li>診断結果に基づき、お客様におすすめの精油やライフスタイルを提案するため</li><li>AI（Google Gemini API）を利用して、入力情報に基づいたパーソナルな分析メッセージを生成するため</li></ul>"] },
        { title: "4. 情報の保存と送信について【重要】", content: ["<p class='font-bold text-red-600 bg-red-50 p-3 rounded-md border border-red-200'>本アプリケーションは、お客様が入力された情報を当社のサーバーに保存することは一切ありません。</p>", "<p>お客様が入力された情報は、AIによる分析メッセージを生成する目的で、GoogleのGemini APIに一時的に送信されます。Googleのプライバシーポリシーについては、同社のサイトをご確認ください。診断プロセスは、お客様がお使いのデバイスのブラウザ内で完結し、アプリケーションのタブを閉じるか、ブラウザを更新すると、入力された情報はすべて破棄されます。</p>"] },
        { title: "5. 第三者への情報提供", content: ["<p>上記「4.」に記載の通り、本アプリケーションはお客様の情報を保存しないため、GoogleへのAPIリクエストを除き、第三者にお客様の情報を提供することはありません。</p>"] },
        { title: "6. Cookie（クッキー）の使用について", content: ["<p>本アプリケーションは、現在Cookieを使用しておりません。</p>"] },
        { title: "7. 免責事項", content: ["<p>本アプリケーションが提供する診断結果および情報は、古典東洋医学の考え方に基づく体質分析であり、医学的な診断、治療、または予防を目的とするものではありません。健康上の問題については、必ず専門の医療機関にご相談ください。</p>"] },
        { title: "8. プライバシーポリシーの変更", content: ["<p>本アプリケーションは、必要に応じて本プライバシーポリシーを改定することがあります。重要な変更がある場合には、本アプリケーション上でお知らせいたします。</p>"] },
    ]
};

const PRIVACY_POLICY_EN = {
    title: "Privacy Policy",
    effectiveDate: "Effective Date: July 29, 2024",
    sections: [
        { title: "1. Introduction", content: ["<p>Kampo-Aroma Essential Oil Counseling (hereinafter, 'this application') respects your privacy and is committed to protecting your personal information. This privacy policy explains how this application handles your information.</p>"] },
        { title: "2. Information We Collect", content: ["<p>For the purpose of providing a constitutional diagnosis, this application prompts you to enter the following information:</p>", "<ul class='list-disc list-inside pl-4'><li>Your answers to the multiple-choice questionnaire.</li><li>Optional written descriptions of your physical discomforts and mental/emotional state.</li></ul>"] },
        { title: "3. Purpose of Use", content: ["<p>The information you provide is used solely for the following purposes:</p>", "<ul class='list-disc list-inside pl-4'><li>To diagnose your constitutional pattern based on the principles of Traditional Chinese Medicine.</li><li>To suggest recommended essential oils and lifestyle habits based on the diagnosis result.</li><li>To generate a personalized analysis message based on your inputs using an AI (Google Gemini API).</li></ul>"] },
        { title: "4. Data Storage and Transmission [Important]", content: ["<p class='font-bold text-red-600 bg-red-50 p-3 rounded-md border border-red-200'>This application does not save any of the information you enter on our servers.</p>", "<p>The information you enter is temporarily sent to Google's Gemini API for the purpose of generating the AI analysis message. For information on Google's privacy policy, please refer to their website. The diagnosis process is completed within your device's browser, and all entered information is discarded when you close the application tab or refresh the browser.</p>"] },
        { title: "5. Disclosure of Information to Third Parties", content: ["<p>As stated in '4.' above, because this application does not save your information, we will not provide your information to any third party, with the exception of the API request to Google.</p>"] },
        { title: "6. Use of Cookies", content: ["<p>This application does not currently use cookies.</p>"] },
        { title: "7. Disclaimer", content: ["<p>The diagnosis results and information provided by this application are based on constitutional analysis from the perspective of Traditional Chinese Medicine and are not intended for medical diagnosis, treatment, or prevention. For any health concerns, please consult a professional medical institution.</p>"] },
        { title: "8. Changes to this Privacy Policy", content: ["<p>This application may revise this privacy policy as necessary. If there are significant changes, we will notify you within the application.</p>"] },
    ]
};

export const getPrivacyPolicy = (lang: 'ja' | 'en') => lang === 'ja' ? PRIVACY_POLICY_JA : PRIVACY_POLICY_EN;
