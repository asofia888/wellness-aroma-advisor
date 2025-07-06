import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Questionnaire } from '../../../components/Questionnaire'

// Mock the logger
vi.mock('../../../utils/logger', () => ({
  logger: {
    trackUserAction: vi.fn(),
    warn: vi.fn()
  }
}))

// Mock the sanitizer
vi.mock('../../../utils/sanitizer', () => ({
  sanitizeUserInput: vi.fn((input) => input)
}))

// Mock the i18n data
vi.mock('../../../i18n', () => ({
  getQuestionsData: vi.fn(() => [
    {
      id: 'question1',
      text: 'Test Question 1',
      category: 'general',
      options: [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' }
      ]
    },
    {
      id: 'question2',
      text: 'Test Question 2',
      category: 'physical',
      options: [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' }
      ]
    }
  ]),
  uiStrings: {
    ja: {
      questionnaire: {
        title: 'アロマカウンセリング診断',
        submitButton: '診断結果を見る',
        validationAlert: '全ての質問に答えてください。',
        physicalDiscomfortsLabel: '身体的な不調',
        mentalEmotionalStateLabel: '精神的・感情的な状態'
      }
    },
    en: {
      questionnaire: {
        title: 'Aroma Counseling Diagnosis',
        submitButton: 'View Diagnosis Results',
        validationAlert: 'Please answer all questions.',
        physicalDiscomfortsLabel: 'Physical Discomforts',
        mentalEmotionalStateLabel: 'Mental & Emotional State'
      }
    }
  }
}))

describe('Questionnaire Component', () => {
  const mockOnSubmit = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.alert
    window.alert = vi.fn()
  })

  it('should render questionnaire title in Japanese', () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    expect(screen.getByText('アロマカウンセリング診断')).toBeInTheDocument()
  })

  it('should render questionnaire title in English', () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="en" />)
    
    expect(screen.getByText('Aroma Counseling Diagnosis')).toBeInTheDocument()
  })

  it('should render all questions', () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    expect(screen.getByText('Test Question 1')).toBeInTheDocument()
    expect(screen.getByText('Test Question 2')).toBeInTheDocument()
  })

  it('should render question options', () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('should render text input areas', () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    expect(screen.getByText('身体的な不調')).toBeInTheDocument()
    expect(screen.getByText('精神的・感情的な状態')).toBeInTheDocument()
  })

  it('should show validation error when submitting incomplete form', async () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    const submitButton = screen.getByText('診断結果を見る')
    await user.click(submitButton)
    
    expect(window.alert).toHaveBeenCalledWith('全ての質問に答えてください。')
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should allow user to select answers', async () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    // Select answers for both questions
    await user.click(screen.getByText('Option 1'))
    await user.click(screen.getByText('Yes'))
    
    // Verify answers are selected (you might need to check for active states)
    const option1 = screen.getByText('Option 1')
    const yesOption = screen.getByText('Yes')
    
    expect(option1.closest('button')).toHaveAttribute('aria-pressed', 'true')
    expect(yesOption.closest('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('should handle text input for physical discomforts', async () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    const physicalTextarea = screen.getByPlaceholderText(/身体的な不調について/)
    await user.type(physicalTextarea, '頭痛がします')
    
    expect(physicalTextarea).toHaveValue('頭痛がします')
  })

  it('should handle text input for mental state', async () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    const mentalTextarea = screen.getByPlaceholderText(/精神的・感情的な状態について/)
    await user.type(mentalTextarea, 'ストレスを感じています')
    
    expect(mentalTextarea).toHaveValue('ストレスを感じています')
  })

  it('should submit form with all answers', async () => {
    const { sanitizeUserInput } = await import('../../../utils/sanitizer')
    
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    // Select answers for all questions
    await user.click(screen.getByText('Option 1'))
    await user.click(screen.getByText('Yes'))
    
    // Add text inputs
    const physicalTextarea = screen.getByPlaceholderText(/身体的な不調について/)
    const mentalTextarea = screen.getByPlaceholderText(/精神的・感情的な状態について/)
    
    await user.type(physicalTextarea, '頭痛')
    await user.type(mentalTextarea, 'ストレス')
    
    // Submit form
    const submitButton = screen.getByText('診断結果を見る')
    await user.click(submitButton)
    
    // Verify sanitizer was called
    expect(sanitizeUserInput).toHaveBeenCalledWith('頭痛')
    expect(sanitizeUserInput).toHaveBeenCalledWith('ストレス')
    
    // Verify form was submitted
    expect(mockOnSubmit).toHaveBeenCalledWith({
      question1: 'option1',
      question2: 'yes',
      physicalDiscomfortsText: '頭痛',
      mentalEmotionalStateText: 'ストレス'
    })
  })

  it('should track user action when form is submitted', async () => {
    const { logger } = await import('../../../utils/logger')
    
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    // Select answers for all questions
    await user.click(screen.getByText('Option 1'))
    await user.click(screen.getByText('Yes'))
    
    // Submit form
    const submitButton = screen.getByText('診断結果を見る')
    await user.click(submitButton)
    
    expect(logger.trackUserAction).toHaveBeenCalledWith('questionnaire_submitted', {
      language: 'ja',
      answeredQuestions: 2,
      totalQuestions: 2,
      hasPhysicalText: false,
      hasMentalText: false,
      physicalTextLength: 0,
      mentalTextLength: 0
    })
  })

  it('should show English validation message', async () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="en" />)
    
    const submitButton = screen.getByText('View Diagnosis Results')
    await user.click(submitButton)
    
    expect(window.alert).toHaveBeenCalledWith('Please answer all questions.')
  })

  it('should handle question category grouping', () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    // Questions should be grouped by category
    // This test verifies the component renders without crashing with grouped questions
    expect(screen.getByText('Test Question 1')).toBeInTheDocument()
    expect(screen.getByText('Test Question 2')).toBeInTheDocument()
  })

  it('should be accessible', () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    // Check for form element
    const form = screen.getByRole('form') || screen.getByTestId('questionnaire-form')
    expect(form || screen.getByText('診断結果を見る').closest('form')).toBeInTheDocument()
    
    // Check submit button
    const submitButton = screen.getByRole('button', { name: /診断結果を見る/ })
    expect(submitButton).toBeInTheDocument()
  })

  it('should prevent multiple submissions', async () => {
    render(<Questionnaire onSubmit={mockOnSubmit} language="ja" />)
    
    // Select answers
    await user.click(screen.getByText('Option 1'))
    await user.click(screen.getByText('Yes'))
    
    const submitButton = screen.getByText('診断結果を見る')
    
    // Click submit multiple times quickly
    await user.click(submitButton)
    await user.click(submitButton)
    
    // Should only submit once
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })
})