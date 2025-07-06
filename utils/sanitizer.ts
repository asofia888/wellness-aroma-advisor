import DOMPurify from 'dompurify';

/**
 * HTML文字列をサニタイズして安全にする
 * XSS攻撃を防ぐためのユーティリティ関数
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOWED_URI_REGEXP: /^https?:\/\/|^mailto:|^tel:/,
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'iframe'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur']
  });
};

/**
 * ユーザー入力テキストをサニタイズする
 * プレーンテキストとして扱い、HTMLタグを完全に除去
 */
export const sanitizeUserInput = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // HTMLタグを完全に除去
  const withoutHtml = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
  
  // 改行文字以外の制御文字を除去
  const cleanText = withoutHtml.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // 最大長制限
  const maxLength = 5000;
  return cleanText.length > maxLength ? cleanText.substring(0, maxLength) : cleanText;
};

/**
 * プライバシーポリシーなどの静的コンテンツ用サニタイザー
 * より多くのHTMLタグを許可するが、安全性は確保
 */
export const sanitizeStaticContent = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
    ALLOWED_URI_REGEXP: /^https?:\/\/|^mailto:|^tel:/,
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'iframe', 'svg', 'math'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur', 'style']
  });
};

/**
 * CSP (Content Security Policy) 準拠チェック
 * 危険なコンテンツパターンを検出
 */
export const validateContent = (content: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // 危険なパターンを検出
  const dangerousPatterns = [
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /<script/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi
  ];
  
  dangerousPatterns.forEach((pattern, index) => {
    if (pattern.test(content)) {
      errors.push(`Dangerous pattern detected: ${pattern.source}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};