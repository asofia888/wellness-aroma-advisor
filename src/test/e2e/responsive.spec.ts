import { test, expect } from '@playwright/test'

test.describe('レスポンシブデザインテスト', () => {
  const viewports = [
    { name: 'Mobile Portrait', width: 375, height: 667 },
    { name: 'Mobile Landscape', width: 667, height: 375 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop Small', width: 1280, height: 720 },
    { name: 'Desktop Large', width: 1920, height: 1080 },
  ]

  viewports.forEach(({ name, width, height }) => {
    test(`${name} (${width}x${height}) - 基本レイアウト`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto('/')
      
      // 免責事項モーダル
      await expect(page.getByText('免責事項')).toBeVisible()
      await page.getByRole('button', { name: '同意して始める' }).click()

      // ヘッダーの表示確認
      await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
      
      // 言語切り替えボタン
      await expect(page.getByRole('button', { name: 'EN' })).toBeVisible()
      
      // 質問エリア
      await expect(page.getByText('質問').or(page.getByText('Question'))).toBeVisible()
      
      // 送信ボタン
      const submitButton = page.getByRole('button', { name: '診断結果を見る' })
      await expect(submitButton).toBeVisible()
      
      // フッター
      await expect(page.getByText('プライバシーポリシー')).toBeVisible()
    })
  })

  test('モバイル: ハンバーガーメニュー（該当する場合）', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.getByRole('button', { name: '同意して始める' }).click()

    // モバイルでのナビゲーション確認
    // ハンバーガーメニューが存在する場合
    const hamburgerMenu = page.locator('[aria-label="メニュー"]').or(page.locator('.hamburger'))
    const hamburgerExists = await hamburgerMenu.count() > 0
    
    if (hamburgerExists) {
      await hamburgerMenu.click()
      await expect(page.getByText('プライバシーポリシー')).toBeVisible()
    }
  })

  test('タブレット: 中間ブレークポイント', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await page.getByRole('button', { name: '同意して始める' }).click()

    // 質問に回答して結果ページへ
    await page.getByText('とても当てはまる').first().click()
    await page.getByText('よく当てはまる').first().click()
    await page.getByText('当てはまる').first().click()
    
    await page.getByRole('button', { name: '診断結果を見る' }).click()

    // 結果ページのレイアウト確認
    await expect(page.getByText('主要診断')).toBeVisible()
    
    // カードレイアウトが適切に表示されるか
    const oilCards = page.locator('[class*="bg-emerald-50"], [class*="bg-indigo-50"]')
    const cardCount = await oilCards.count()
    expect(cardCount).toBeGreaterThan(0)
    
    // PDFボタンのサイズとクリック可能性
    const pdfButton = page.getByRole('button', { name: 'PDFをダウンロード' })
    await expect(pdfButton).toBeVisible()
    const pdfButtonBox = await pdfButton.boundingBox()
    expect(pdfButtonBox?.height).toBeGreaterThan(40)
  })

  test('デスクトップ: 大画面での表示', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await page.getByRole('button', { name: '同意して始める' }).click()

    // コンテンツが画面中央に適切に配置されているか
    const mainContainer = page.locator('main').or(page.locator('.container'))
    const containerBox = await mainContainer.boundingBox()
    
    if (containerBox) {
      // コンテンツが左右に広がりすぎていないか確認
      expect(containerBox.width).toBeLessThan(1200) // max-widthの確認
      
      // 中央寄せの確認
      const centerX = 1920 / 2
      const containerCenterX = containerBox.x + containerBox.width / 2
      const deviation = Math.abs(centerX - containerCenterX)
      expect(deviation).toBeLessThan(100) // 中央から大きく外れていない
    }
  })

  test('テキストの読みやすさ - 各画面サイズ', async ({ page }) => {
    const testSizes = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1280, height: 720, name: 'Desktop' }
    ]

    for (const { width, height, name } of testSizes) {
      await page.setViewportSize({ width, height })
      await page.goto('/')
      await page.getByRole('button', { name: '同意して始める' }).click()

      // タイトルの可読性
      const title = page.getByText('アロマカウンセリング診断').first()
      const titleBox = await title.boundingBox()
      
      if (titleBox) {
        // 最小フォントサイズの確認（モバイルでも16px以上）
        expect(titleBox.height).toBeGreaterThan(20)
      }

      // 質問テキストの可読性
      const questionText = page.getByText('とても当てはまる').first()
      const questionBox = await questionText.boundingBox()
      
      if (questionBox) {
        expect(questionBox.height).toBeGreaterThan(16)
      }
    }
  })

  test('フォーム要素のタッチフレンドリー性', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // モバイルサイズ
    await page.goto('/')
    await page.getByRole('button', { name: '同意して始める' }).click()

    // ボタンのタッチターゲットサイズ
    const buttons = page.getByRole('button')
    const buttonCount = await buttons.count()
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i)
      const buttonBox = await button.boundingBox()
      
      if (buttonBox) {
        // WCAG推奨の44x44px以上
        expect(buttonBox.width).toBeGreaterThanOrEqual(44)
        expect(buttonBox.height).toBeGreaterThanOrEqual(44)
      }
    }

    // テキストエリアのサイズと使いやすさ
    const textarea = page.getByPlaceholder('身体的な不調について')
    await textarea.click()
    
    const textareaBox = await textarea.boundingBox()
    if (textareaBox) {
      // タッチしやすい高さ
      expect(textareaBox.height).toBeGreaterThan(100)
      
      // 入力のテスト
      await textarea.fill('テスト入力文字列')
      await expect(textarea).toHaveValue('テスト入力文字列')
    }
  })

  test('横画面での表示', async ({ page }) => {
    // モバイル横画面
    await page.setViewportSize({ width: 667, height: 375 })
    await page.goto('/')
    await page.getByRole('button', { name: '同意して始める' }).click()

    // コンテンツが縦にスクロール可能
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
    
    // 送信ボタンまでスクロール可能
    const submitButton = page.getByRole('button', { name: '診断結果を見る' })
    await submitButton.scrollIntoViewIfNeeded()
    await expect(submitButton).toBeVisible()
    
    // フッターまでスクロール可能
    const footer = page.getByText('プライバシーポリシー')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()
  })

  test('画像とメディアのレスポンシブ性', async ({ page }) => {
    const testSizes = [
      { width: 375, height: 667 },
      { width: 1280, height: 720 }
    ]

    for (const { width, height } of testSizes) {
      await page.setViewportSize({ width, height })
      await page.goto('/')
      await page.getByRole('button', { name: '同意して始める' }).click()

      // 質問に回答して結果ページへ
      await page.getByText('とても当てはまる').first().click()
      await page.getByText('よく当てはまる').first().click()
      await page.getByText('当てはまる').first().click()
      
      await page.getByRole('button', { name: '診断結果を見る' }).click()

      // 診断結果のアイコンが適切なサイズで表示
      const icons = page.locator('span').filter({ hasText: /🌪️|💨|🩸|🌙|💧/ })
      const iconCount = await icons.count()
      
      if (iconCount > 0) {
        const icon = icons.first()
        const iconBox = await icon.boundingBox()
        
        if (iconBox) {
          // アイコンが小さすぎず、大きすぎない
          expect(iconBox.width).toBeGreaterThan(20)
          expect(iconBox.width).toBeLessThan(200)
        }
      }
    }
  })

  test('極端な画面サイズでの動作', async ({ page }) => {
    // 極小画面
    await page.setViewportSize({ width: 320, height: 568 })
    await page.goto('/')
    await page.getByRole('button', { name: '同意して始める' }).click()
    
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
    await expect(page.getByRole('button', { name: '診断結果を見る' })).toBeVisible()

    // 極大画面
    await page.setViewportSize({ width: 2560, height: 1440 })
    await page.reload()
    await page.getByRole('button', { name: '同意して始める' }).click()
    
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
    
    // コンテンツが適切な幅に制限されている
    const container = page.locator('main').or(page.locator('.container'))
    const containerBox = await container.boundingBox()
    
    if (containerBox) {
      expect(containerBox.width).toBeLessThan(1400) // 最大幅の制限
    }
  })

  test('プリント用CSS（該当する場合）', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: '同意して始める' }).click()

    // 質問に回答して結果ページへ
    await page.getByText('とても当てはまる').first().click()
    await page.getByText('よく当てはまる').first().click()
    await page.getByText('当てはまる').first().click()
    
    await page.getByRole('button', { name: '診断結果を見る' }).click()

    // プリント用メディアクエリのエミュレーション
    await page.emulateMedia({ media: 'print' })
    
    // プリント時に不要な要素が非表示になっているか
    // （実装に依存）
    
    // 通常メディアに戻す
    await page.emulateMedia({ media: 'screen' })
  })
})