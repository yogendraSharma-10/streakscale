import { z } from 'zod'
import { CATEGORIES } from '@/types'

/**
 * Zod schemas for validating recipe input.
 *
 * These are the single source of truth for what constitutes a valid recipe
 * draft. The form, the repository layer, and any future API all validate
 * against these schemas so the rules stay consistent.
 */

const ingredientSchema = z.object({
  name: z.string().trim().min(1, 'Ingredient name is required'),
  quantity: z.string().trim().min(1, 'Quantity is required'),
})

const recipeStepSchema = z.object({
  instruction: z.string().trim().min(1, 'Step cannot be empty'),
})

/**
 * Validates a full recipe draft (everything the user can edit).
 */
export const recipeDraftSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(1000).optional(),
  category: z.string().trim().min(1, 'Category is required').max(100),
  ingredients: z.array(ingredientSchema).min(1, 'At least one ingredient is required'),
  steps: z.array(recipeStepSchema).min(1, 'At least one step is required'),
  imageUrl: z.string().trim().url('Image URL must be a valid URL').optional(),
})

/** The inferred type of a validated recipe draft. */
export type RecipeDraftSchema = z.infer<typeof recipeDraftSchema>

/**
 * Validates an unknown value as a recipe draft. Throws a ZodError on failure
 * so callers can surface field-level messages.
 */
export function validateRecipeDraft(value: unknown): RecipeDraftSchema {
  return recipeDraftSchema.parse(value)
}

/**
 * Safe variant that returns a result object instead of throwing.
 */
export function tryValidateRecipeDraft(
  value: unknown,
): { ok: true; data: RecipeDraftSchema } | { ok: false; error: z.ZodError } {
  const result = recipeDraftSchema.safeParse(value)
  if (result.success) {
    return { ok: true, data: result.data }
  }
  return { ok: false, error: result.error }
}

/** Re-export the category list for convenience. */
export { CATEGORIES }
