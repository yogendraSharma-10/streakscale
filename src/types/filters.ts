/**
 * The set of criteria used to narrow down the recipe collection.
 * All fields are optional; an empty filter matches every recipe.
 */
export interface RecipeFilter {
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
  search: string
  category: string
}

/**
 * Builds a stable string key from a filter. Useful as a cache key or for
 * memoization in React components.
 */
export function filterToKey(filter: NormalizedRecipeFilter): string {
  return [
    filter.search.trim().toLowerCase(),
    filter.category.trim().toLowerCase(),
  ].join('::')
}
