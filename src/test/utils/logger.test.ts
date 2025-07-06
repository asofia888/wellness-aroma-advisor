import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logger, LogLevel, measurePerformance, measureAsyncPerformance } from '../../../utils/logger'

describe('Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset localStorage mock
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
  })

  describe('log levels', () => {
    it('should log debug messages in development', () => {
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
      // Mock development environment
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' })

      logger.debug('Debug message', { key: 'value' })

      expect(consoleDebugSpy).toHaveBeenCalledWith(
        expect.stringContaining('DEBUG: Debug message'),
        { key: 'value' }
      )
    })

    it('should log info messages', () => {
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})

      logger.info('Info message', { context: 'test' })

      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.stringContaining('INFO: Info message'),
        { context: 'test' }
      )
    })

    it('should log warning messages', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      logger.warn('Warning message')

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('WARN: Warning message'),
        undefined
      )
    })

    it('should log error messages with stack trace', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const error = new Error('Test error')

      logger.error('Error message', error, { context: 'test' })

      expect(consoleErrorSpy).toHaveBeenCalledTimes(2) // Main log + stack trace
      expect(consoleErrorSpy).toHaveBeenNthCalledWith(1, 
        expect.stringContaining('ERROR: Error message'),
        expect.objectContaining({ context: 'test' })
      )
      expect(consoleErrorSpy).toHaveBeenNthCalledWith(2, 
        'Stack trace:', 
        error.stack
      )
    })

    it('should always log critical messages', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      logger.critical('Critical message')

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('CRITICAL: Critical message'),
        undefined
      )
    })
  })

  describe('user action tracking', () => {
    it('should track user actions', () => {
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})

      logger.trackUserAction('button_click', { buttonId: 'submit', page: 'questionnaire' })

      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.stringContaining('INFO: User Action: button_click'),
        expect.objectContaining({
          type: 'user_action',
          action: 'button_click',
          buttonId: 'submit',
          page: 'questionnaire'
        })
      )
    })
  })

  describe('performance tracking', () => {
    it('should track performance metrics', () => {
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})

      logger.performance('api_call', 250, { endpoint: '/diagnosis' })

      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.stringContaining('INFO: Performance: api_call took 250ms'),
        expect.objectContaining({
          type: 'performance',
          operation: 'api_call',
          duration: 250,
          endpoint: '/diagnosis'
        })
      )
    })
  })

  describe('localStorage integration', () => {
    it('should save warning and error logs to localStorage', () => {
      const setItemSpy = vi.spyOn(localStorage, 'setItem')
      const getItemSpy = vi.spyOn(localStorage, 'getItem').mockReturnValue('[]')

      logger.warn('Warning to be stored')

      expect(setItemSpy).toHaveBeenCalledWith(
        'app_error_logs',
        expect.stringContaining('"level":2') // LogLevel.WARN = 2
      )
    })

    it('should limit stored logs to 100 entries', () => {
      // Mock existing 100 logs
      const existingLogs = Array(100).fill(null).map((_, i) => ({
        level: LogLevel.WARN,
        message: `Log ${i}`,
        timestamp: new Date().toISOString()
      }))
      
      vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(existingLogs))
      const setItemSpy = vi.spyOn(localStorage, 'setItem')

      logger.error('New error log')

      // Should call setItem with array of 100 items (removed oldest, added newest)
      expect(setItemSpy).toHaveBeenCalledWith(
        'app_error_logs',
        expect.stringMatching(/"level":3.*"message":"New error log"/)
      )
    })

    it('should handle localStorage errors gracefully', () => {
      vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      // Should not throw
      expect(() => logger.error('Test error')).not.toThrow()
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Logger: Failed to save to localStorage',
        expect.any(Error)
      )
    })
  })

  describe('session management', () => {
    it('should generate unique session IDs', () => {
      const sessionId1 = logger.getSessionId()
      // Create new logger instance
      const { logger: logger2 } = await import('../../utils/logger')
      const sessionId2 = logger2.getSessionId()

      expect(sessionId1).toMatch(/^session_\d+_[a-z0-9]+$/)
      // Different instances should have same session (singleton)
      expect(sessionId1).toBe(sessionId2)
    })
  })

  describe('log management', () => {
    it('should retrieve stored logs', () => {
      const mockLogs = [
        { level: LogLevel.ERROR, message: 'Test error', timestamp: new Date().toISOString() }
      ]
      vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(mockLogs))

      const logs = logger.getLogs()

      expect(logs).toEqual(mockLogs)
    })

    it('should clear logs', () => {
      const removeItemSpy = vi.spyOn(localStorage, 'removeItem')

      logger.clearLogs()

      expect(removeItemSpy).toHaveBeenCalledWith('app_error_logs')
    })

    it('should handle corrupted localStorage data', () => {
      vi.spyOn(localStorage, 'getItem').mockReturnValue('invalid json')

      const logs = logger.getLogs()

      expect(logs).toEqual([])
    })
  })
})

describe('Performance Decorators', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock performance.now
    let time = 0
    vi.spyOn(performance, 'now').mockImplementation(() => time += 100)
  })

  describe('measurePerformance', () => {
    it('should measure synchronous function performance', () => {
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
      const testFunction = vi.fn().mockReturnValue('result')
      
      const decoratedFunction = measurePerformance(testFunction, 'test_operation')
      const result = decoratedFunction('arg1', 'arg2')

      expect(result).toBe('result')
      expect(testFunction).toHaveBeenCalledWith('arg1', 'arg2')
      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.stringContaining('Performance: test_operation took 100ms'),
        expect.objectContaining({
          type: 'performance',
          operation: 'test_operation',
          duration: 100
        })
      )
    })

    it('should handle function errors and still log performance', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const testError = new Error('Test error')
      const testFunction = vi.fn().mockImplementation(() => { throw testError })
      
      const decoratedFunction = measurePerformance(testFunction, 'failing_operation')

      expect(() => decoratedFunction()).toThrow('Test error')
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('failing_operation failed after 100ms'),
        testError
      )
    })
  })

  describe('measureAsyncPerformance', () => {
    it('should measure asynchronous function performance', async () => {
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
      const testFunction = vi.fn().mockResolvedValue('async result')
      
      const decoratedFunction = measureAsyncPerformance(testFunction, 'async_operation')
      const result = await decoratedFunction('arg1')

      expect(result).toBe('async result')
      expect(testFunction).toHaveBeenCalledWith('arg1')
      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.stringContaining('Performance: async_operation took 100ms'),
        expect.objectContaining({
          type: 'performance',
          operation: 'async_operation',
          duration: 100
        })
      )
    })

    it('should handle async function errors', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const testError = new Error('Async error')
      const testFunction = vi.fn().mockRejectedValue(testError)
      
      const decoratedFunction = measureAsyncPerformance(testFunction, 'failing_async_operation')

      await expect(decoratedFunction()).rejects.toThrow('Async error')
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('failing_async_operation failed after 100ms'),
        testError
      )
    })
  })
})