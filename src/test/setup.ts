import '@testing-library/jest-dom'

// Mock environment variables
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test'
}

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
})

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  value: 'ja',
  writable: true
})

// Mock performance.now for logger tests
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now())
  },
  writable: true
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock fetch for API tests
global.fetch = vi.fn()

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks()
})