/**
 * Small, dependency-free id generation helpers.
 */

/**
 * Generate a reasonably unique id. Uses crypto.randomUUID when available and
 * falls back to a timestamp + random suffix otherwise.
 */
export function createId(prefix = 'id'): string {
  const random =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  return `${prefix}-${random}`
}

/** Generate a unique id specifically for an ingredient. */
export function createIngredientId(): string {
  return createId('ing')
}
