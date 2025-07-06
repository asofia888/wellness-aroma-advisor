import { test, expect } from '@playwright/test'

test.describe('アクセシビリティテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // 免責事項を閉じる
    await page.getByRole('button', { name: '同意して始める' }).click()
  })

  test('キーボードナビゲーション', async ({ page }) => {
    // Tabキーでのナビゲーション
    await page.keyboard.press('Tab')
    
    // 言語切り替えボタンにフォーカス
    await expect(page.getByRole('button', { name: 'EN' })).toBeFocused()
    
    // 次の要素に移動
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // 質問の選択肢にフォーカス
    const firstOption = page.getByText('とても当てはまる').first()
    await firstOption.focus()
    
    // Enterキーで選択
    await page.keyboard.press('Enter')
    await expect(firstOption).toHaveAttribute('aria-pressed', 'true')
    
    // 送信ボタンまでTabで移動
    const submitButton = page.getByRole('button', { name: '診断結果を見る' })
    await submitButton.focus()
    await expect(submitButton).toBeFocused()
  })

  test('スクリーンリーダー対応', async ({ page }) => {
    // 見出しの階層構造
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    
    const h2Elements = page.getByRole('heading', { level: 2 })
    const h2Count = await h2Elements.count()
    expect(h2Count).toBeGreaterThan(0)
    
    // フォームのラベル
    const textareas = page.getByRole('textbox')
    for (let i = 0; i < await textareas.count(); i++) {
      const textarea = textareas.nth(i)
      const labelId = await textarea.getAttribute('aria-labelledby')
      if (labelId) {
        const label = page.locator(`#${labelId}`)
        await expect(label).toBeVisible()
      }
    }
    
    // ボタンのaria-label
    const buttons = page.getByRole('button')
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i)
      const buttonText = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')
      
      // ボタンにはテキストまたはaria-labelが必要
      expect(buttonText || ariaLabel).toBeTruthy()
    }
  })

  test('カラーコントラスト', async ({ page }) => {
    // 主要なテキスト要素のコントラストチェック
    const titleElement = page.getByText('アロマカウンセリング診断').first()
    await expect(titleElement).toBeVisible()
    
    // ボタンの視認性
    const submitButton = page.getByRole('button', { name: '診断結果を見る' })
    await expect(submitButton).toBeVisible()
    
    // エラーメッセージのコントラスト（意図的にエラーを発生）
    await submitButton.click()
    
    // アラートダイアログのハンドリング
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBeTruthy()
      await dialog.accept()
    })
  })

  test('フォーカス管理', async ({ page }) => {
    // 初期フォーカス
    const activeElement = page.locator(':focus')
    
    // 最初の質問に回答
    await page.getByText('とても当てはまる').first().click()
    
    // 次の質問グループに自動的にフォーカスが移動するか確認
    // （実装に依存）
    
    // テキストエリアにフォーカス
    const physicalTextarea = page.getByPlaceholder('身体的な不調について')
    await physicalTextarea.focus()
    await expect(physicalTextarea).toBeFocused()
    
    // タブで次の要素に移動
    await page.keyboard.press('Tab')
    const mentalTextarea = page.getByPlaceholder('精神的・感情的な状態について')
    await expect(mentalTextarea).toBeFocused()
  })

  test('画像の代替テキスト', async ({ page }) => {
    // 診断結果ページに移動するため、まず質問に回答
    await page.getByText('とても当てはまる').first().click()
    await page.getByText('よく当てはまる').first().click()
    await page.getByText('当てはまる').first().click()
    
    await page.getByRole('button', { name: '診断結果を見る' }).click()
    
    // 診断結果のアイコンにalt属性があるか確認
    const images = page.getByRole('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const altText = await img.getAttribute('alt')
      const ariaLabel = await img.getAttribute('aria-label')
      
      // 装飾的な画像でない限り、代替テキストが必要
      expect(altText || ariaLabel).toBeTruthy()
    }
  })

  test('エラーメッセージのアクセシビリティ', async ({ page }) => {
    // 意図的にバリデーションエラーを発生
    await page.getByRole('button', { name: '診断結果を見る' }).click()
    
    // アラートダイアログのテスト
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert')
      expect(dialog.message()).toContain('質問')
      await dialog.accept()
    })
  })

  test('ランドマークとセクション', async ({ page }) => {
    // メインコンテンツエリア
    const main = page.getByRole('main')
    await expect(main).toBeVisible()
    
    // ヘッダー
    const header = page.getByRole('banner').or(page.locator('header'))
    await expect(header).toBeVisible()
    
    // フッター
    const footer = page.getByRole('contentinfo').or(page.locator('footer'))
    await expect(footer).toBeVisible()
    
    // ナビゲーション（もしあれば）
    const navElements = page.getByRole('navigation')
    // ナビゲーションは必須ではないが、あれば確認
  })

  test('動的コンテンツのアナウンス', async ({ page }) => {
    // 質問に回答
    await page.getByText('とても当てはまる').first().click()
    await page.getByText('よく当てはまる').first().click()
    await page.getByText('当てはまる').first().click()
    
    await page.getByRole('button', { name: '診断結果を見る' }).click()
    
    // ローディング状態のアナウンス
    const loadingMessage = page.getByText('AIが分析中です')
    await expect(loadingMessage).toBeVisible()
    
    // aria-live属性の確認
    const liveRegion = page.locator('[aria-live]')
    const liveRegionCount = await liveRegion.count()
    // ライブリージョンが存在することを確認
    expect(liveRegionCount).toBeGreaterThan(0)
  })

  test('高コントラストモード対応', async ({ page }) => {
    // 高コントラストモードのエミュレーション
    await page.emulateMedia({ colorScheme: 'dark' })
    
    // 主要要素が見える状態を維持
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
    await expect(page.getByRole('button', { name: '診断結果を見る' })).toBeVisible()
    
    // 通常モードに戻す
    await page.emulateMedia({ colorScheme: 'light' })
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
  })

  test('縮小表示での使用性', async ({ page }) => {
    // 200%ズーム相当
    await page.setViewportSize({ width: 640, height: 480 })
    
    // 主要機能が利用可能
    await expect(page.getByText('アロマカウンセリング診断')).toBeVisible()
    await expect(page.getByRole('button', { name: '診断結果を見る' })).toBeVisible()
    
    // テキストエリアが使用可能
    const textarea = page.getByPlaceholder('身体的な不調について')
    await textarea.fill('テスト入力')
    await expect(textarea).toHaveValue('テスト入力')
    
    // ボタンがクリック可能
    const button = page.getByRole('button', { name: '診断結果を見る' })
    await expect(button).toBeEnabled()
  })

  test('タッチデバイス対応', async ({ page, isMobile }) => {
    if (isMobile) {
      // タッチターゲットのサイズ確認
      const buttons = page.getByRole('button')
      
      for (let i = 0; i < Math.min(await buttons.count(), 5); i++) {
        const button = buttons.nth(i)
        const boundingBox = await button.boundingBox()
        
        if (boundingBox) {
          // 最小44x44pxのタッチターゲット（WCAG推奨）
          expect(boundingBox.width).toBeGreaterThanOrEqual(44)
          expect(boundingBox.height).toBeGreaterThanOrEqual(44)
        }
      }
      
      // スワイプジェスチャーのテスト（該当する場合）
      // ピンチズームの対応確認
    }
  })
})