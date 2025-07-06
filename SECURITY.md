# セキュリティ対策

このアプリケーションでは以下のセキュリティ対策を実装しています。

## XSS (Cross-Site Scripting) 対策

### 1. DOMPurify によるサニタイゼーション
- すべてのHTMLコンテンツは DOMPurify ライブラリでサニタイズ
- 悪意のあるスクリプトタグや危険な属性を自動除去

### 2. ユーザー入力の検証
- テキストエリアに最大文字数制限 (5000文字)
- 制御文字の除去
- HTMLタグの完全無効化

### 3. Content Security Policy (CSP) 準拠
- インラインスクリプトの制限
- 外部リソースの制限
- 危険なコンテンツパターンの検出

## 実装されているサニタイザー関数

### `sanitizeUserInput(input: string)`
- ユーザーが入力したテキストを安全にサニタイズ
- HTMLタグを完全除去
- 制御文字の除去
- 最大長制限

### `sanitizeStaticContent(html: string)`
- プライバシーポリシーなどの静的コンテンツ用
- 安全なHTMLタグのみ許可
- 危険な属性やスクリプトを除去

### `sanitizeHtml(html: string)`
- 一般的なHTMLコンテンツのサニタイズ
- 基本的なフォーマットタグのみ許可

## テスト済みの攻撃パターン

以下の攻撃パターンに対する防御を確認済み：

- `<script>alert('XSS')</script>`
- `<img src="x" onerror="alert('XSS')">`
- `javascript:alert('XSS')`
- `<iframe src="javascript:alert('XSS')"></iframe>`
- `<svg onload="alert('XSS')"></svg>`

## API セキュリティ

### サーバーサイド
- 環境変数によるAPIキーの保護
- リクエスト検証
- エラー情報の適切な制限

### クライアントサイド  
- APIキーの非公開
- HTTPS通信の強制
- セキュアなCookie設定

## 定期的なセキュリティチェック

1. 依存関係の脆弱性スキャン: `npm audit`
2. XSS テストパターンの実行
3. Content Security Policy の検証
4. セキュリティヘッダーの確認

## 報告

セキュリティ問題を発見した場合は、GitHub Issues で報告してください。