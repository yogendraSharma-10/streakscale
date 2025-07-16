import type {
  DietaryRestriction,
  NormalizedRecipeFilter,
  Recipe,
  RecipeFilter,
} from '@/types'

/**
 * Pure filtering helpers. Kept free of React and storage so they are easy to
 * unit test and reuse across the grid and any future list views.
 */

/**
 * Normalize a partial filter into a fully-populated one.
 */
export function normalizeFilter(filter: RecipeFilter = {}): NormalizedRecipeFilter {
  return {
    dietaryRestrictions: filter.dietaryRestrictions ?? [],
    search: filter.search?.trim() ?? '',
    category: filter.category?.trim() ?? '',
  }
}

/**
 * Returns true when a recipe matches the given dietary restrictions. A recipe
 * matches if it is tagged with at least one of the requested restrictions.
 * An empty restriction list matches everything.
 */
export function matchesDietaryRestrictions(
  recipe: Recipe,
  restrictions: DietaryRestriction[],
): boolean {
  if (restrictions.length === 0) {
    return true
  }
  return restrictions.some((restriction) =>
    recipe.dietaryRestrictions.includes(restriction),
  )
}

/**
 * Returns true when a recipe matches the free-text search across its title,
 * description, and category.
 */
export function matchesSearch(recipe: Recipe, search: string): boolean {
  const needle = search.trim().toLowerCase()
  if (!needle) {
    return true
  }
  return [recipe.title, recipe.description, recipe.category]
    .join(' ')
    .toLowerCase()
    .includes(needle)
}

/**
 * Returns true when a recipe belongs to the given category (case-insensitive).
 */
export function matchesCategory(recipe: Recipe, category: string): boolean {
  if (!category) {
    return true
  }
  return recipe.category.toLowerCase() === category.toLowerCase()
}

/**
 * Filter a collection of recipes by the given criteria.
 */
export function filterRecipes(
  recipes: Recipe[],
  filter: RecipeFilter = {},
): Recipe[] {
  const normalized = normalizeFilter(filter)
  return recipes.filter(
    (recipe) =>
      matchesDietaryRestrictions(recipe, normalized.dietaryRestrictions) &&
      matchesSearch(recipe, normalized.search) &&
      matchesCategory(recipe, normalized.category),
  )
}

/**
 * Collect the distinct categories present in a collection, sorted
 * alphabetically. Used to populate the category filter dropdown.
 */
export function collectCategories(recipes: Recipe[]): string[] {
  const categories = new Set(recipes.map((recipe) => recipe.category.trim()))
  categories.delete('')
  return [...categories].sort((a, b) => a.localeCompare(b))
}
