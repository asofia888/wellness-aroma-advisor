import { test, expect } from '@playwright/test'

test.describe('アロマカウンセリング診断 - メインユーザーフロー', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('完全な診断フロー: 質問回答→結果表示→PDF生成', async ({ page }) => {
    // 免責事項の確認
    await expect(page.getByText('免責事項')).toBeVisible()
    await page.getByRole('button', { name: '同意して始める' }).click()

    // ヘッダーの確認
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()

    // 質問への回答
    // 最初の質問セクション（一般的な質問）
    await page.getByText('とても当てはまる').first().click()
    
    // 身体的な質問
    await page.getByText('よく当てはまる').first().click()
    
    // 精神的な質問
    await page.getByText('当てはまる').first().click()

    // テキスト入力
    await page.getByPlaceholder('身体的な不調について').fill('ストレスによる頭痛と肩こりがひどいです')
    await page.getByPlaceholder('精神的・感情的な状態について').fill('イライラして不安になることが多いです')

    // 診断結果の表示
    await page.getByRole('button', { name: '診断結果を見る' }).click()

    // 結果ページの確認
    await expect(page.getByText('主要診断')).toBeVisible()
    await expect(page.getByText('肝気鬱結').or(page.getByText('気虚')).or(page.getByText('血虚')).or(page.getByText('陰虚')).or(page.getByText('痰湿'))).toBeVisible()

    // AI分析の読み込み確認
    await expect(page.getByText('AIが分析中です')).toBeVisible()
    
    // AI分析完了の確認（最大30秒待機）
    await expect(page.getByText('AI による詳細分析')).toBeVisible({ timeout: 30000 })

    // 推奨オイルの表示確認
    await expect(page.getByText('推奨エッセンシャルオイル')).toBeVisible()

    // PDF生成テスト
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'PDFをダウンロード' }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/aroma-counseling-result-.*\.pdf/)

    // 最初からやり直すボタンの確認
    await page.getByRole('button', { name: '診断を最初からやり直す' }).click()
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
  })

  test('言語切り替え機能', async ({ page }) => {
    // 免責事項を閉じる
    await page.getByRole('button', { name: '同意して始める' }).click()

    // 英語に切り替え
    await page.getByRole('button', { name: 'EN' }).click()
    await expect(page.getByText('Aroma Counseling Diagnosis')).toBeVisible()

    // 日本語に戻す
    await page.getByRole('button', { name: 'JA' }).click()
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
  })

  test('バリデーション: 未回答での送信', async ({ page }) => {
    // 免責事項を閉じる
    await page.getByRole('button', { name: '同意して始める' }).click()

    // 何も回答せずに送信
    await page.getByRole('button', { name: '診断結果を見る' }).click()

    // アラートの確認（実際のアプリではalertを使用）
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('全ての質問に答えてください')
      await dialog.accept()
    })
  })

  test('プライバシーポリシーとサービス利用規約', async ({ page }) => {
    // 免責事項を閉じる
    await page.getByRole('button', { name: '同意して始める' }).click()

    // プライバシーポリシーへのアクセス
    await page.getByText('プライバシーポリシー').click()
    await expect(page.getByText('個人情報の取り扱いについて')).toBeVisible()
    
    // 戻るボタン
    await page.getByRole('button', { name: '戻る' }).click()
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()

    // サービス利用規約へのアクセス
    await page.getByText('サービス利用規約').click()
    await expect(page.getByText('サービス利用規約')).toBeVisible()
    
    // 戻るボタン
    await page.getByRole('button', { name: '戻る' }).click()
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
  })

  test('エラーハンドリング: ネットワークエラー', async ({ page }) => {
    // 免責事項を閉じる
    await page.getByRole('button', { name: '同意して始める' }).click()

    // 質問に回答
    await page.getByText('とても当てはまる').first().click()
    await page.getByText('よく当てはまる').first().click()
    await page.getByText('当てはまる').first().click()

    // ネットワークを無効にしてAI分析をテスト
    await page.route('/api/ai-analysis', route => {
      route.abort()
    })

    await page.getByRole('button', { name: '診断結果を見る' }).click()

    // エラーメッセージの確認
    await expect(page.getByText('エラーが発生しました')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('再試行')).toBeVisible()
  })

  test('レスポンシブデザイン: モバイル表示', async ({ page, isMobile }) => {
    if (!isMobile) {
      // デスクトップの場合はモバイルビューポートに設定
      await page.setViewportSize({ width: 375, height: 667 })
    }

    // 免責事項を閉じる
    await page.getByRole('button', { name: '同意して始める' }).click()

    // モバイルでのレイアウト確認
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
    
    // ボタンがタップしやすいサイズかチェック
    const submitButton = page.getByRole('button', { name: '診断結果を見る' })
    const buttonBox = await submitButton.boundingBox()
    expect(buttonBox?.height).toBeGreaterThan(40) // 最小タップサイズ
  })

  test('パフォーマンス: ページ読み込み時間', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    // 5秒以内に読み込み完了
    expect(loadTime).toBeLessThan(5000)

    // 主要要素の表示確認
    await expect(page.getByText('免責事項')).toBeVisible()
  })

  test('セキュリティ: XSS攻撃の防御', async ({ page }) => {
    // 免責事項を閉じる
    await page.getByRole('button', { name: '同意して始める' }).click()

    // 悪意のあるスクリプトを入力
    const maliciousScript = '<script>alert("XSS")</script><img src="x" onerror="alert(\'XSS\')">'
    
    await page.getByPlaceholder('身体的な不調について').fill(maliciousScript)
    await page.getByPlaceholder('精神的・感情的な状態について').fill(maliciousScript)

    // スクリプトが実行されないことを確認
    page.on('dialog', async dialog => {
      // XSSが実行された場合のアラートを検出
      throw new Error('XSS vulnerability detected!')
    })

    // 質問に回答して送信
    await page.getByText('とても当てはまる').first().click()
    await page.getByText('よく当てはまる').first().click()
    await page.getByText('当てはまる').first().click()
    
    await page.getByRole('button', { name: '診断結果を見る' }).click()

    // 結果が正常に表示され、スクリプトが無害化されていることを確認
    await expect(page.getByText('主要診断')).toBeVisible()
  })
})