/**
 * Core domain types for the Interactive Recipe Manager.
 *
 * These types are shared across every feature (grid, form, detail modal,
 * filtering, editing) so they live in a single source of truth.
 */

/**
 * The set of supported recipe categories. Kept as a string union so it is
 * easy to extend and stays compatible with `erasableSyntaxOnly`.
 */
export type Category =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'dessert'
  | 'snack'
  | 'appetizer'
  | 'side'
  | 'drink'

/** The canonical list of supported categories, in display order. */
export const CATEGORIES: readonly Category[] = [
  'breakfast',
  'lunch',
  'dinner',
  'dessert',
  'snack',
  'appetizer',
  'side',
  'drink',
] as const

/** A single ingredient line within a recipe. */
export interface Ingredient {
  /** The ingredient name, e.g. "olive oil". */
  name: string
  /** The quantity, e.g. "2 cups" or "to taste". */
  quantity: string
}

/** A single step-by-step instruction within a recipe. */
export interface RecipeStep {
  /** The written instruction for this step. */
  instruction: string
}

/** A fully-formed recipe as stored and rendered by the app. */
export interface Recipe {
  /** Stable unique id. */
  id: string
  /** Human-readable title. */
  title: string
  /** Optional short description shown on the card. */
  description?: string
  /** Ordered list of ingredients. */
  ingredients: Ingredient[]
  /** Ordered list of step-by-step instructions. */
  steps: RecipeStep[]
  /** The category this recipe belongs to (see {@link Category}). */
  category: string
  /** Optional URL of an image to display for the recipe. */
  imageUrl?: string
}

/**
 * The shape accepted when creating or updating a recipe. Everything the user
 * can edit, minus the system-managed id.
 */
export type RecipeDraft = Omit<Recipe, 'id'>

/** Convenience alias for the fields that can be edited on an existing recipe. */
export type RecipeInput = RecipeDraft
