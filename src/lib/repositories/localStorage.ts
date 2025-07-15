import type { Recipe, RecipeDraft, RecipeRepository } from '@/types'
import { MemoryRecipeRepository } from './memory'
import { logger } from '@/lib/logger'

/**
 * Local-storage-backed recipe repository.
 *
 * Persists the recipe collection to `window.localStorage` under a configurable
 * key. Falls back to in-memory behavior when localStorage is unavailable
 * (e.g. private browsing or non-browser environments).
 */
export class LocalStorageRecipeRepository
  extends MemoryRecipeRepository
  implements RecipeRepository
{
  private readonly storageKey: string
  private readonly storage: Storage | null

  constructor(storageKey: string) {
    super()
    this.storageKey = storageKey
    this.storage = typeof window !== 'undefined' ? window.localStorage : null
    this.hydrate()
  }

  private hydrate(): void {
    if (!this.storage) {
      return
    }
    try {
      const raw = this.storage.getItem(this.storageKey)
      if (!raw) {
        return
      }
      const parsed: unknown = JSON.parse(raw)
      if (!Array.isArray(parsed)) {
        logger.warn(`Stored value under "${this.storageKey}" is not an array; ignoring`)
        return
      }
      this.replaceAll(parsed as Recipe[])
    } catch (error) {
      logger.error('Failed to hydrate recipes from local storage', error)
    }
  }

  private persist(): void {
    if (!this.storage) {
      return
    }
    try {
      this.storage.setItem(this.storageKey, JSON.stringify(this.list()))
    } catch (error) {
      logger.error('Failed to persist recipes to local storage', error)
    }
  }

  override create(draft: RecipeDraft): Recipe {
    const recipe = super.create(draft)
    this.persist()
    return recipe
  }

  override update(id: string, draft: RecipeDraft): Recipe | null {
    const recipe = super.update(id, draft)
    if (recipe) {
      this.persist()
    }
    return recipe
  }

  override delete(id: string): boolean {
    const deleted = super.delete(id)
    if (deleted) {
      this.persist()
    }
    return deleted
  }

  override clear(): void {
    super.clear()
    this.persist()
  }

  override replaceAll(recipes: Recipe[]): void {
    super.replaceAll(recipes)
    this.persist()
  }
}
