import { z } from 'zod'
import { DIETARY_RESTRICTIONS } from '@/types'

/**
 * Zod schemas for validating recipe input.
 *
 * These are the single source of truth for what constitutes a valid recipe
 * draft. The form, the repository layer, and any future API all validate
 * against these schemas so the rules stay consistent.
 */

const dietaryRestrictionSchema = z.enum(DIETARY_RESTRICTIONS)

const ingredientSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, 'Ingredient name is required'),
  amount: z.number().finite().nonnegative('Amount must be zero or greater'),
  unit: z.string().trim().min(1, 'Unit is required'),
})

/**
 * Validates a full recipe draft (everything the user can edit).
 */
export const recipeDraftSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(1000).default(''),
  category: z.string().trim().min(1, 'Category is required').max(100),
  dietaryRestrictions: z
    .array(dietaryRestrictionSchema)
    .default([])
    .refine((value) => new Set(value).size === value.length, {
      message: 'Dietary restrictions must be unique',
    }),
  servings: z.coerce.number().int().positive('Servings must be a positive integer'),
  prepTimeMinutes: z.coerce.number().int().nonnegative('Prep time cannot be negative'),
  cookTimeMinutes: z.coerce.number().int().nonnegative('Cook time cannot be negative'),
  ingredients: z.array(ingredientSchema).min(1, 'At least one ingredient is required'),
  steps: z.array(z.string().trim().min(1, 'Step cannot be empty')).min(1, 'At least one step is required'),
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
