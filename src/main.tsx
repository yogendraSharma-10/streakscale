import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { logger } from '@/lib/logger.ts'
import { toErrorMessage } from '@/lib/errors.ts'

/**
 * Global error safety net.
 *
 * Uncaught exceptions and unhandled promise rejections are logged through the
 * structured logger so that unexpected failures are visible in development and
 * can be surfaced to a monitoring/error-reporting service in production.
 */

function handleUncaughtError(event: ErrorEvent): void {
  logger.error('Uncaught exception', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  })
}

function handleUnhandledRejection(event: PromiseRejectionEvent): void {
  logger.error('Unhandled promise rejection', {
    reason: toErrorMessage(event.reason),
    detail: event.reason,
  })
}

window.addEventListener('error', handleUncaughtError)
window.addEventListener('unhandledrejection', handleUnhandledRejection)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
