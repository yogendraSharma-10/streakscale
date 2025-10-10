import type { Recipe, RecipeDraft, RecipeRepository } from '@/types'
import { createId } from '@/lib/id'
import { NotFoundError } from '@/lib/errors'

/**
 * In-memory recipe repository.
 *
 * Stores recipes in a Map. Useful for tests and for the "memory" storage
 * backend where nothing should be persisted across reloads.
 */
export class MemoryRecipeRepository implements RecipeRepository {
  protected readonly recipes = new Map<string, Recipe>()

  list(): Recipe[] {
    return [...this.recipes.values()]
  }

  get(id: string): Recipe | null {
    return this.recipes.get(id) ?? null
  }

  create(draft: RecipeDraft): Recipe {
    const now = new Date().toISOString()
    const recipe: Recipe = {
      ...draft,
      id: createId('recipe'),
      createdAt: now,
      updatedAt: now,
    }
    this.recipes.set(recipe.id, recipe)
    return recipe
  }

  update(id: string, draft: RecipeDraft): Recipe | null {
    const existing = this.recipes.get(id)
    if (!existing) {
      return null
    }
    const updated: Recipe = {
      ...existing,
      ...draft,
      id,
      updatedAt: new Date().toISOString(),
    }
    this.recipes.set(id, updated)
    return updated
  }

  delete(id: string): boolean {
    return this.recipes.delete(id)
  }

  clear(): void {
    this.recipes.clear()
  }

  /**
   * Replace the entire collection (used by the seed step).
   */
  replaceAll(recipes: Recipe[]): void {
    this.recipes.clear()
    for (const recipe of recipes) {
      this.recipes.set(recipe.id, recipe)
    }
  }
}

/**
 * Convenience wrapper that throws a NotFoundError when a recipe is missing,
 * which is often more ergonomic for feature code than checking for null.
 */
export function requireRecipe(repo: RecipeRepository, id: string): Recipe {
  const recipe = repo.get(id)
  if (!recipe) {
    throw new NotFoundError(`Recipe "${id}" was not found`)
  }
  return recipe
}
