import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ErrorToast, LoadingToast, SuccessToast } from '../../../components/ErrorToast'
import { ErrorHandler, ErrorType } from '../../../utils/errorHandler'

describe('ErrorToast Component', () => {
  const mockOnDismiss = vi.fn()
  const mockOnRetry = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when error is null', () => {
    render(
      <ErrorToast 
        error={null} 
        language="ja" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    expect(screen.queryByText('エラーが発生しました')).not.toBeInTheDocument()
  })

  it('should render error message in Japanese', () => {
    const error = ErrorHandler.createError('Test error', ErrorType.NETWORK)
    
    render(
      <ErrorToast 
        error={error} 
        language="ja" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
    expect(screen.getByText('インターネット接続を確認してください。')).toBeInTheDocument()
  })

  it('should render error message in English', () => {
    const error = ErrorHandler.createError('Test error', ErrorType.NETWORK)
    
    render(
      <ErrorToast 
        error={error} 
        language="en" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    expect(screen.getByText('An error occurred')).toBeInTheDocument()
    expect(screen.getByText('Please check your internet connection.')).toBeInTheDocument()
  })

  it('should show retry button for retryable errors', () => {
    const error = ErrorHandler.createError('Network error', ErrorType.NETWORK)
    
    render(
      <ErrorToast 
        error={error} 
        language="ja" 
        onDismiss={mockOnDismiss} 
        onRetry={mockOnRetry}
      />
    )
    
    expect(screen.getByText('再試行')).toBeInTheDocument()
    expect(screen.getByText('後で')).toBeInTheDocument()
  })

  it('should not show retry button for non-retryable errors', () => {
    const error = ErrorHandler.createError('Validation error', ErrorType.VALIDATION)
    
    render(
      <ErrorToast 
        error={error} 
        language="ja" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    expect(screen.queryByText('再試行')).not.toBeInTheDocument()
  })

  it('should call onRetry when retry button is clicked', () => {
    const error = ErrorHandler.createError('Network error', ErrorType.NETWORK)
    
    render(
      <ErrorToast 
        error={error} 
        language="ja" 
        onDismiss={mockOnDismiss} 
        onRetry={mockOnRetry}
      />
    )
    
    fireEvent.click(screen.getByText('再試行'))
    expect(mockOnRetry).toHaveBeenCalledTimes(1)
  })

  it('should call onDismiss when close button is clicked', () => {
    const error = ErrorHandler.createError('Test error', ErrorType.API)
    
    render(
      <ErrorToast 
        error={error} 
        language="ja" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    const closeButton = screen.getByLabelText('閉じる')
    fireEvent.click(closeButton)
    
    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })

  it('should auto-dismiss non-retryable errors after timeout', async () => {
    const error = ErrorHandler.createError('Validation error', ErrorType.VALIDATION)
    
    render(
      <ErrorToast 
        error={error} 
        language="ja" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    // Wait for auto-dismiss timeout (should be less than 10 seconds in test)
    await waitFor(() => expect(mockOnDismiss).toHaveBeenCalled(), { timeout: 15000 })
  })

  it('should show error context in development mode', () => {
    const error = ErrorHandler.createError('Test error', ErrorType.API, { context: 'test context' })
    // Mock development environment
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    
    render(
      <ErrorToast 
        error={error} 
        language="ja" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    expect(screen.getByText('詳細情報')).toBeInTheDocument()
    
    // Restore environment
    process.env.NODE_ENV = originalEnv
  })
})

describe('LoadingToast Component', () => {
  it('should not render when not loading', () => {
    render(
      <LoadingToast 
        isLoading={false} 
        message="Loading..." 
        language="ja" 
      />
    )
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('should render loading message when loading', () => {
    render(
      <LoadingToast 
        isLoading={true} 
        message="AIが分析中です..." 
        language="ja" 
      />
    )
    
    expect(screen.getByText('AIが分析中です...')).toBeInTheDocument()
  })

  it('should show loading spinner', () => {
    render(
      <LoadingToast 
        isLoading={true} 
        message="Loading..." 
        language="en" 
      />
    )
    
    const spinner = screen.getByText('Loading...').previousElementSibling
    expect(spinner).toHaveClass('animate-spin')
  })
})

describe('SuccessToast Component', () => {
  const mockOnDismiss = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when not visible', () => {
    render(
      <SuccessToast 
        isVisible={false} 
        message="Success!" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    expect(screen.queryByText('Success!')).not.toBeInTheDocument()
  })

  it('should render success message when visible', () => {
    render(
      <SuccessToast 
        isVisible={true} 
        message="操作が成功しました！" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    expect(screen.getByText('操作が成功しました！')).toBeInTheDocument()
  })

  it('should call onDismiss when close button is clicked', () => {
    render(
      <SuccessToast 
        isVisible={true} 
        message="Success!" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    
    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })

  it('should auto-dismiss after timeout', async () => {
    render(
      <SuccessToast 
        isVisible={true} 
        message="Success!" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    // Wait for auto-dismiss timeout
    await waitFor(() => expect(mockOnDismiss).toHaveBeenCalled(), { timeout: 5000 })
  })

  it('should show success icon', () => {
    render(
      <SuccessToast 
        isVisible={true} 
        message="Success!" 
        onDismiss={mockOnDismiss} 
      />
    )
    
    const successIcon = screen.getByText('Success!').closest('div')?.querySelector('svg')
    expect(successIcon).toBeInTheDocument()
    expect(successIcon).toHaveClass('text-green-400')
  })
})