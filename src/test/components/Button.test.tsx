import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../../../components/Button'

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should handle click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled button</Button>)
    const button = screen.getByText('Disabled button')
    
    expect(button).toBeDisabled()
  })

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Disabled button</Button>)
    
    fireEvent.click(screen.getByText('Disabled button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should apply primary variant styles', () => {
    render(<Button variant="primary">Primary button</Button>)
    const button = screen.getByText('Primary button')
    
    expect(button).toHaveClass('bg-emerald-600')
  })

  it('should apply secondary variant styles', () => {
    render(<Button variant="secondary">Secondary button</Button>)
    const button = screen.getByText('Secondary button')
    
    expect(button).toHaveClass('bg-gray-600')
  })

  it('should apply large size styles', () => {
    render(<Button size="large">Large button</Button>)
    const button = screen.getByText('Large button')
    
    expect(button).toHaveClass('px-8', 'py-4', 'text-lg')
  })

  it('should apply medium size styles', () => {
    render(<Button size="medium">Medium button</Button>)
    const button = screen.getByText('Medium button')
    
    expect(button).toHaveClass('px-6', 'py-3', 'text-base')
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom button</Button>)
    const button = screen.getByText('Custom button')
    
    expect(button).toHaveClass('custom-class')
  })

  it('should forward aria-label prop', () => {
    render(<Button aria-label="Accessible button">Button</Button>)
    const button = screen.getByLabelText('Accessible button')
    
    expect(button).toBeInTheDocument()
  })

  it('should be accessible via keyboard', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Keyboard accessible</Button>)
    const button = screen.getByText('Keyboard accessible')
    
    button.focus()
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    
    expect(button).toHaveFocus()
  })

  it('should render as button element by default', () => {
    render(<Button>Default button</Button>)
    const button = screen.getByRole('button')
    
    expect(button.tagName).toBe('BUTTON')
  })

  it('should apply disabled styles when disabled', () => {
    render(<Button disabled>Disabled styling</Button>)
    const button = screen.getByText('Disabled styling')
    
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
  })
})