import { z } from 'zod'
import { CATEGORIES, DIETARY_RESTRICTIONS, type DietaryRestriction } from '@/types'

/**
 * Zod schemas for validating recipe input.
 *
 * These are the single source of truth for what constitutes a valid recipe
 * draft. The form, the repository layer, and any future API all validate
 * against these schemas so the rules stay consistent.
 */

const ingredientSchema = z.object({
  id: z.string().min(1, 'Ingredient id is required'),
  name: z.string().trim().min(1, 'Ingredient name is required'),
  amount: z.number().nonnegative('Amount cannot be negative'),
  unit: z.string().trim().min(1, 'Unit is required'),
})

const dietaryRestrictionSchema = z.enum(
  [...DIETARY_RESTRICTIONS] as [DietaryRestriction, ...DietaryRestriction[]],
)

/**
 * Validates a full recipe draft (everything the user can edit).
 */
export const recipeDraftSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(1000).optional(),
  category: z.string().trim().min(1, 'Category is required').max(100),
  dietaryRestrictions: z.array(dietaryRestrictionSchema).default([]),
  servings: z.number().int().positive('Servings must be a positive integer'),
  prepTimeMinutes: z.number().nonnegative('Prep time cannot be negative'),
  cookTimeMinutes: z.number().nonnegative('Cook time cannot be negative'),
  ingredients: z.array(ingredientSchema).min(1, 'At least one ingredient is required'),
  steps: z
    .array(z.string().trim().min(1, 'Step cannot be empty'))
    .min(1, 'At least one step is required'),
  imageUrl: z.string().trim().url('Image URL must be a valid URL').optional(),
})

/**
 * The shape of a validated recipe draft.
 *
 * This is defined explicitly (rather than via `z.infer`) because zod's
 * inferred output type marks every field optional. At runtime the schema's
 * defaults and required fields guarantee a complete draft, so we describe the
 * guaranteed shape here and cast the parsed result to it.
 */
export type RecipeDraftSchema = {
  title: string
  description?: string
  category: string
  dietaryRestrictions: DietaryRestriction[]
  servings: number
  prepTimeMinutes: number
  cookTimeMinutes: number
  ingredients: {
    id: string
    name: string
    amount: number
    unit: string
  }[]
  steps: string[]
  imageUrl?: string
}

/**
 * Validates an unknown value as a recipe draft. Throws a ZodError on failure
 * so callers can surface field-level messages.
 */
export function validateRecipeDraft(value: unknown): RecipeDraftSchema {
  return recipeDraftSchema.parse(value) as RecipeDraftSchema
}

/**
 * Safe variant that returns a result object instead of throwing.
 */
export function tryValidateRecipeDraft(
  value: unknown,
): { ok: true; data: RecipeDraftSchema } | { ok: false; error: z.ZodError } {
  const result = recipeDraftSchema.safeParse(value)
  if (result.success) {
    return { ok: true, data: result.data as RecipeDraftSchema }
  }
  return { ok: false, error: result.error }
}

/** Re-export the category list for convenience. */
export { CATEGORIES }
