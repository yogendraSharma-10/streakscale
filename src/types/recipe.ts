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
  /** Optional image URL shown on the card when present. */
  imageUrl?: string
  /** ISO timestamp of creation. */
  createdAt: string
  /** ISO timestamp of last update. */
  updatedAt: string
}
