import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let browser;
  try {
    const { html, title = '診断結果' } = req.body;
    
    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    // Launch Puppeteer with Vercel-optimized settings
    const executablePath = await chromium.executablePath();
    
    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
      timeout: 60000
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 1
    });

    // Create complete HTML document with proper CSS
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic', 'Meiryo', sans-serif;
              line-height: 1.6;
              color: #333;
              background: white;
              padding: 20px;
              font-size: 14px;
            }
            
            .container {
              max-width: 750px;
              margin: 0 auto;
            }
            
            h1, h2, h3 {
              font-family: 'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'MS PMincho', serif;
              margin-bottom: 16px;
              color: #2c3e50;
            }
            
            h1 {
              font-size: 24px;
              text-align: center;
              border-bottom: 3px solid #3498db;
              padding-bottom: 10px;
              margin-bottom: 30px;
            }
            
            h2 {
              font-size: 20px;
              color: #e74c3c;
              margin-top: 30px;
              margin-bottom: 15px;
            }
            
            h3 {
              font-size: 16px;
              color: #8e44ad;
              margin-top: 20px;
              margin-bottom: 10px;
            }
            
            p {
              margin-bottom: 12px;
              text-align: justify;
            }
            
            .diagnosis-section {
              background: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            
            .oil-recommendation {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            
            .oil-recommendation h3 {
              color: white;
            }
            
            .application-method {
              background: #e8f5e8;
              border-left: 4px solid #27ae60;
              padding: 15px;
              margin: 15px 0;
            }
            
            .acupoint-method {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 15px 0;
            }
            
            .ai-analysis {
              background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
              border: 1px solid #d1ecf1;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            
            .detail-item {
              margin: 10px 0;
            }
            
            .detail-item strong {
              color: #2c3e50;
            }
            
            ul {
              margin-left: 20px;
              margin-bottom: 10px;
            }
            
            li {
              margin-bottom: 5px;
            }
            
            .page-break {
              page-break-before: always;
            }
            
            @media print {
              body {
                padding: 0;
              }
              
              .container {
                max-width: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            ${html}
          </div>
        </body>
      </html>
    `;

    await page.setContent(fullHtml, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Generate PDF with optimized settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        bottom: '1cm',
        left: '1cm',
        right: '1cm'
      },
      preferCSSPageSize: true
    });

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.status(200).send(pdfBuffer);

  } catch (error) {
    console.error('PDF generation error:', error);
    return res.status(500).json({
      error: 'PDF generation failed',
      details: error.message
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}