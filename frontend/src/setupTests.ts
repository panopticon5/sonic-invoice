import '@testing-library/jest-dom';

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Add ResizeObserver to window
window.ResizeObserver = ResizeObserver;