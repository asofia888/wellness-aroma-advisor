import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ErrorHandler, ErrorType, RetryableRequest } from '../../../utils/errorHandler'

describe('ErrorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createError', () => {
    it('should create AppError from Error object', () => {
      const originalError = new Error('Test error')
      const appError = ErrorHandler.createError(originalError, ErrorType.API)

      expect(appError.type).toBe(ErrorType.API)
      expect(appError.message).toBe('Test error')
      expect(appError.originalError).toBe(originalError)
      expect(appError.retryable).toBe(true)
      expect(appError.timestamp).toBeDefined()
    })

    it('should create AppError from string', () => {
      const appError = ErrorHandler.createError('String error', ErrorType.VALIDATION)

      expect(appError.type).toBe(ErrorType.VALIDATION)
      expect(appError.message).toBe('String error')
      expect(appError.originalError).toBeUndefined()
      expect(appError.retryable).toBe(false)
    })

    it('should include context information', () => {
      const context = { userId: '123', action: 'test' }
      const appError = ErrorHandler.createError('Test error', ErrorType.UNKNOWN, context)

      expect(appError.context).toEqual(context)
    })

    it('should determine retryable status correctly', () => {
      const networkError = ErrorHandler.createError('Network error', ErrorType.NETWORK)
      const apiError = ErrorHandler.createError('API error', ErrorType.API)
      const validationError = ErrorHandler.createError('Validation error', ErrorType.VALIDATION)

      expect(networkError.retryable).toBe(true)
      expect(apiError.retryable).toBe(true)
      expect(validationError.retryable).toBe(false)
    })
  })

  describe('getErrorMessage', () => {
    it('should return Japanese error messages', () => {
      const networkError = ErrorHandler.createError('Test', ErrorType.NETWORK)
      const apiError = ErrorHandler.createError('Test', ErrorType.API)
      const validationError = ErrorHandler.createError('Test', ErrorType.VALIDATION)

      expect(ErrorHandler.getErrorMessage(networkError, 'ja')).toBe('インターネット接続を確認してください。')
      expect(ErrorHandler.getErrorMessage(apiError, 'ja')).toBe('サーバーとの通信でエラーが発生しました。しばらく時間をおいてから再度お試しください。')
      expect(ErrorHandler.getErrorMessage(validationError, 'ja')).toBe('入力内容を確認してください。')
    })

    it('should return English error messages', () => {
      const networkError = ErrorHandler.createError('Test', ErrorType.NETWORK)
      const apiError = ErrorHandler.createError('Test', ErrorType.API)

      expect(ErrorHandler.getErrorMessage(networkError, 'en')).toBe('Please check your internet connection.')
      expect(ErrorHandler.getErrorMessage(apiError, 'en')).toBe('A server communication error occurred. Please try again later.')
    })

    it('should fallback to unknown error message', () => {
      const unknownError = ErrorHandler.createError('Test', 'CUSTOM_ERROR' as ErrorType)
      
      expect(ErrorHandler.getErrorMessage(unknownError, 'ja')).toBe('予期しないエラーが発生しました。')
      expect(ErrorHandler.getErrorMessage(unknownError, 'en')).toBe('An unexpected error occurred.')
    })
  })

  describe('isNetworkError', () => {
    it('should identify network errors correctly', () => {
      const networkError1 = new Error('Network request failed')
      const networkError2 = new Error('fetch error occurred')
      const typeError = new TypeError('Failed to fetch')
      const regularError = new Error('Something else happened')

      expect(ErrorHandler.isNetworkError(networkError1)).toBe(true)
      expect(ErrorHandler.isNetworkError(networkError2)).toBe(true)
      expect(ErrorHandler.isNetworkError(typeError)).toBe(true)
      expect(ErrorHandler.isNetworkError(regularError)).toBe(false)
    })
  })

  describe('handleAPIError', () => {
    it('should handle response with JSON error', async () => {
      const mockResponse = {
        status: 400,
        statusText: 'Bad Request',
        url: 'https://api.example.com',
        json: vi.fn().mockResolvedValue({ message: 'Invalid input' })
      } as any

      const appError = await ErrorHandler.handleAPIError(mockResponse)

      expect(appError.type).toBe(ErrorType.API)
      expect(appError.message).toBe('Invalid input')
      expect(appError.context).toEqual({
        status: 400,
        statusText: 'Bad Request',
        url: 'https://api.example.com'
      })
    })

    it('should handle response without JSON body', async () => {
      const mockResponse = {
        status: 500,
        statusText: 'Internal Server Error',
        url: 'https://api.example.com',
        json: vi.fn().mockRejectedValue(new Error('No JSON'))
      } as any

      const appError = await ErrorHandler.handleAPIError(mockResponse)

      expect(appError.message).toBe('HTTP 500 Internal Server Error')
    })
  })

  describe('logError', () => {
    it('should log critical errors for network and API types', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const networkError = ErrorHandler.createError('Network error', ErrorType.NETWORK)

      ErrorHandler.logError(networkError)

      expect(consoleErrorSpy).toHaveBeenCalledWith('Critical Error:', expect.any(Object))
    })

    it('should log validation errors as warnings', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const validationError = ErrorHandler.createError('Validation error', ErrorType.VALIDATION)

      ErrorHandler.logError(validationError)

      expect(consoleWarnSpy).toHaveBeenCalledWith('Validation Error:', expect.any(Object))
    })
  })
})

describe('RetryableRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should execute request successfully on first try', async () => {
    const retryableRequest = new RetryableRequest(3, 100)
    const mockRequest = vi.fn().mockResolvedValue('success')

    const result = await retryableRequest.execute(mockRequest)

    expect(result).toBe('success')
    expect(mockRequest).toHaveBeenCalledTimes(1)
  })

  it('should retry on network errors', async () => {
    const retryableRequest = new RetryableRequest(2, 50)
    const mockRequest = vi.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce('success')

    const result = await retryableRequest.execute(mockRequest)

    expect(result).toBe('success')
    expect(mockRequest).toHaveBeenCalledTimes(2)
  })

  it('should fail after max retries', async () => {
    const retryableRequest = new RetryableRequest(2, 50)
    const error = new Error('Persistent network error')
    const mockRequest = vi.fn().mockRejectedValue(error)

    await expect(retryableRequest.execute(mockRequest)).rejects.toThrow('Persistent network error')
    expect(mockRequest).toHaveBeenCalledTimes(3) // Initial + 2 retries
  })

  it('should not retry non-network errors', async () => {
    const retryableRequest = new RetryableRequest(3, 50)
    const error = new Error('Validation error')
    const mockRequest = vi.fn().mockRejectedValue(error)
    const shouldRetry = vi.fn().mockReturnValue(false)

    await expect(retryableRequest.execute(mockRequest, shouldRetry)).rejects.toThrow('Validation error')
    expect(mockRequest).toHaveBeenCalledTimes(1)
    expect(shouldRetry).toHaveBeenCalledWith(error)
  })

  it('should implement exponential backoff', async () => {
    const retryableRequest = new RetryableRequest(2, 100)
    const error = new Error('Network error')
    const mockRequest = vi.fn().mockRejectedValue(error)
    
    const start = Date.now()
    
    try {
      await retryableRequest.execute(mockRequest)
    } catch (e) {
      // Expected to fail
    }
    
    const duration = Date.now() - start
    // Should have delays: 100ms + 200ms = 300ms minimum
    expect(duration).toBeGreaterThan(250)
  })
})