/**
 * Canonical recipe categories used across the app.
 */
export const CATEGORIES = [
  'breakfast',
  'lunch',
  'dinner',
  'dessert',
  'snack',
] as const

/** A single recipe category. */
export type Category = (typeof CATEGORIES)[number]
