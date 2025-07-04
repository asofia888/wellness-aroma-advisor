# 東洋医学理論に基づく精油カウンセリング

あなたの体質と心に寄り添う、伝統医学の知恵とアロマテラピー

## 🌟 特徴

- **高度な診断アルゴリズム**: 動的スコアリングとパターン相関分析
- **AI統合分析**: Google Gemini APIによるパーソナライズド診断
- **多言語対応**: 日本語・英語完全対応
- **PDF出力**: 詳細な診断レポート生成
- **レスポンシブデザイン**: あらゆるデバイスで最適表示

## 🚀 Vercel デプロイ

### 前提条件
- Node.js 18.0.0 以上
- Gemini API キー ([取得方法](https://makersuite.google.com/app/apikey))

### デプロイ手順

1. **リポジトリをVercelにインポート**
   ```bash
   # Vercel CLIを使用する場合
   npx vercel --prod
   ```

2. **環境変数を設定**
   Vercelダッシュボードで以下を設定:
   - `GEMINI_API_KEY`: あなたのGemini APIキー

3. **自動デプロイ**
   - GitHubにプッシュすると自動デプロイされます
   - プロダクション環境では最適化されたビルドが使用されます

### 環境変数設定

```bash
# .env.local ファイルを作成
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🛠️ 開発環境

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# ビルドプレビュー
npm run preview
```

## 📋 技術スタック

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: Google Gemini API
- **PDF Generation**: jsPDF + html2canvas
- **Deployment**: Vercel

## 🔧 最適化設定

- **チャンク分割**: vendor, genai, pdf で自動分割
- **圧縮**: Terser による最適化
- **セキュリティ**: CSP, XSS Protection 等の設定
- **キャッシュ**: 静的アセットの長期キャッシュ

## 📄 ライセンス

All rights reserved - Essential Oil Counseling Based on Traditional Medicine Theory
