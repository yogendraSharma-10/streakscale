import type { Recipe, RecipeDraft } from './recipe'

/**
 * The persistence contract used by every storage backend (memory, local
 * storage, and future remote backends). Features depend on this interface
 * rather than on a concrete implementation.
 */
export interface RecipeRepository {
  /** Return every stored recipe. */
  list(): Recipe[]
  /** Return a single recipe by id, or null when not found. */
  get(id: string): Recipe | null
  /** Create a new recipe from a draft and return the stored entity. */
  create(draft: RecipeDraft): Recipe
  /** Replace an existing recipe; returns the updated entity or null if missing. */
  update(id: string, draft: RecipeDraft): Recipe | null
  /** Remove a recipe by id; returns true when something was deleted. */
  delete(id: string): boolean
  /** Remove all recipes. */
  clear(): void
}

/**
 * The kind of persistence backend selected by the config loader.
 */
export type StorageBackend = 'memory' | 'local'
