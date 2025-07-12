/**
 * Domain error classes shared across the application.
 *
 * Feature code throws these instead of raw `Error`s so that UI layers and
 * error boundaries can distinguish between expected, user-facing failures
 * (bad input, missing resource, conflicts) and unexpected ones.
 */

/** Base class for all application errors. Carries an optional HTTP-like status. */
export class AppError extends Error {
  readonly status: number
  readonly code: string

  constructor(message: string, status = 500, code = 'APP_ERROR') {
    super(message)
    this.name = new.target.name
    this.status = status
    this.code = code
  }
}

/** Thrown when a required resource does not exist (e.g. recipe not found). */
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND')
  }
}

/** Thrown when the caller is not authenticated/authorized. */
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

/** Thrown when a request conflicts with the current state (e.g. duplicate id). */
export class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409, 'CONFLICT')
  }
}

/** Thrown when user-supplied input fails validation. */
export class BadRequestError extends AppError {
  constructor(message = 'Invalid input') {
    super(message, 400, 'BAD_REQUEST')
  }
}

/**
 * Type guard that narrows an unknown thrown value to an AppError.
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

/**
 * Extracts a human-readable message from any thrown value.
 */
export function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unexpected error occurred'
}
