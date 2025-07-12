/**
 * Core domain types for the Interactive Recipe Manager.
 *
 * These types are shared across every feature (grid, form, detail modal,
 * filtering, editing) so they live in a single source of truth.
 */

/**
 * Dietary restrictions a recipe can be tagged with. Kept as a string union
 * (rather than an enum) to stay compatible with `erasableSyntaxOnly` and to
 * make serialization to/from local storage trivial.
 */
export type DietaryRestriction =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'nut-free'
  | 'pescatarian'

/** The canonical list of supported dietary restrictions, in display order. */
export const DIETARY_RESTRICTIONS: readonly DietaryRestriction[] = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
  'nut-free',
  'pescatarian',
] as const

/** A single ingredient line within a recipe. */
export interface Ingredient {
  /** Stable unique id for the ingredient (used as a React key). */
  id: string
  /** The ingredient name, e.g. "olive oil". */
  name: string
  /** The numeric quantity, e.g. 2. */
  amount: number
  /** The unit of measure, e.g. "tbsp", "cup", "g". */
  unit: string
}

/** A fully-formed recipe as stored and rendered by the app. */
export interface Recipe {
  /** Stable unique id. */
  id: string
  /** Human-readable title. */
  title: string
  /** Short description shown on the card. */
  description: string
  /** Free-form category, e.g. "Dinner", "Dessert". */
  category: string
  /** Dietary tags used for filtering. */
  dietaryRestrictions: DietaryRestriction[]
  /** Number of people the recipe serves. */
  servings: number
  /** Active preparation time in minutes. */
  prepTimeMinutes: number
  /** Cooking/baking time in minutes. */
  cookTimeMinutes: number
  /** Ordered list of ingredients. */
  ingredients: Ingredient[]
  /** Ordered list of step-by-step instructions. */
  steps: string[]
  /** ISO timestamp of creation. */
  createdAt: string
  /** ISO timestamp of last update. */
  updatedAt: string
}

/**
 * The shape accepted when creating or updating a recipe. Everything the user
 * can edit, minus the system-managed fields (id, timestamps).
 */
export type RecipeDraft = Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>

/** Convenience alias for the fields that can be edited on an existing recipe. */
export type RecipeInput = RecipeDraft
