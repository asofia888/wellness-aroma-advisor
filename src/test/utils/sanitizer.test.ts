import { describe, it, expect, beforeEach } from 'vitest'
import { sanitizeUserInput, sanitizeHtml, sanitizeStaticContent } from '../../../utils/sanitizer'

describe('sanitizer', () => {
  describe('sanitizeUserInput', () => {
    it('should remove all HTML tags', () => {
      const input = '<script>alert("xss")</script><p>Safe content</p>'
      const result = sanitizeUserInput(input)
      expect(result).toBe('Safe content')
    })

    it('should handle empty strings', () => {
      expect(sanitizeUserInput('')).toBe('')
    })

    it('should truncate long inputs', () => {
      const longInput = 'a'.repeat(6000)
      const result = sanitizeUserInput(longInput)
      expect(result).toHaveLength(5003) // 5000 + '...'
      expect(result.endsWith('...')).toBe(true)
    })

    it('should handle special characters', () => {
      const input = '特殊文字 & < > " \' test'
      const result = sanitizeUserInput(input)
      expect(result).toBe('特殊文字 &amp; &lt; &gt; &quot; &#x27; test')
    })

    it('should remove dangerous javascript attributes', () => {
      const input = '<div onclick="alert(\'xss\')" onload="malicious()">content</div>'
      const result = sanitizeUserInput(input)
      expect(result).toBe('content')
    })
  })

  describe('sanitizeHtml', () => {
    it('should allow safe HTML tags', () => {
      const input = '<p>Paragraph</p><strong>Bold</strong><em>Italic</em>'
      const result = sanitizeHtml(input)
      expect(result).toBe('<p>Paragraph</p><strong>Bold</strong><em>Italic</em>')
    })

    it('should remove dangerous tags but keep content', () => {
      const input = '<script>alert("xss")</script><p>Safe content</p>'
      const result = sanitizeHtml(input)
      expect(result).toBe('<p>Safe content</p>')
    })

    it('should remove dangerous attributes', () => {
      const input = '<a href="http://example.com" onclick="alert(\'xss\')">Link</a>'
      const result = sanitizeHtml(input)
      expect(result).toBe('<a href="http://example.com">Link</a>')
    })

    it('should handle lists properly', () => {
      const input = '<ul><li>Item 1</li><li>Item 2</li></ul>'
      const result = sanitizeHtml(input)
      expect(result).toBe('<ul><li>Item 1</li><li>Item 2</li></ul>')
    })

    it('should remove script and object tags completely', () => {
      const input = '<object data="malicious.swf"></object><p>Safe content</p>'
      const result = sanitizeHtml(input)
      expect(result).toBe('<p>Safe content</p>')
    })
  })

  describe('sanitizeStaticContent', () => {
    it('should handle pre-sanitized content', () => {
      const input = '<p>This is static content</p>'
      const result = sanitizeStaticContent(input)
      expect(result).toBe('<p>This is static content</p>')
    })

    it('should remove potential XSS from static content', () => {
      const input = '<p>Safe content</p><script>alert("xss")</script>'
      const result = sanitizeStaticContent(input)
      expect(result).toBe('<p>Safe content</p>')
    })

    it('should handle empty content', () => {
      expect(sanitizeStaticContent('')).toBe('')
    })

    it('should preserve formatting in static content', () => {
      const input = '<div class="content"><p>Paragraph</p><br><span>Span content</span></div>'
      const result = sanitizeStaticContent(input)
      expect(result).toContain('<p>Paragraph</p>')
      expect(result).toContain('<br>')
      expect(result).toContain('<span>Span content</span>')
    })
  })

  describe('edge cases', () => {
    it('should handle null and undefined inputs', () => {
      expect(() => sanitizeUserInput(null as any)).not.toThrow()
      expect(() => sanitizeUserInput(undefined as any)).not.toThrow()
    })

    it('should handle deeply nested malicious content', () => {
      const input = '<div><span><script>alert("deep xss")</script>Safe</span></div>'
      const result = sanitizeUserInput(input)
      expect(result).toBe('Safe')
    })

    it('should handle mixed content with Japanese characters', () => {
      const input = '<p>安全なコンテンツ</p><script>悪意のあるスクリプト</script>'
      const result = sanitizeHtml(input)
      expect(result).toBe('<p>安全なコンテンツ</p>')
    })
  })
})