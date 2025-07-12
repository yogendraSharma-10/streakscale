import type { DietaryRestriction } from './recipe'

/**
 * The set of criteria used to narrow down the recipe collection.
 * All fields are optional; an empty filter matches every recipe.
 */
export interface RecipeFilter {
  /** Only include recipes tagged with at least one of these restrictions. */
  dietaryRestrictions?: DietaryRestriction[]
  /** Case-insensitive substring match against title/description/category. */
  search?: string
  /** Only include recipes in this exact category. */
  category?: string
}

/**
 * A normalized filter where every field is always present, making it easy to
 * compare and to derive a stable cache key.
 */
export interface NormalizedRecipeFilter {
  dietaryRestrictions: DietaryRestriction[]
  search: string
  category: string
}

/**
 * Builds a stable string key from a filter. Useful as a cache key or for
 * memoization in React components.
 */
export function filterToKey(filter: NormalizedRecipeFilter): string {
  const restrictions = [...filter.dietaryRestrictions].sort().join(',')
  return [
    restrictions,
    filter.search.trim().toLowerCase(),
    filter.category.trim().toLowerCase(),
  ].join('::')
}
