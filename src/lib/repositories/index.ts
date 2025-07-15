import type { RecipeRepository, StorageBackend } from '@/types'
import { MemoryRecipeRepository } from './memory'
import { LocalStorageRecipeRepository } from './localStorage'
import { loadConfig } from '@/lib/config'

/**
 * Factory that builds the recipe repository matching the configured storage
 * backend. Feature code should obtain its repository through this factory so
 * the backend can be swapped without touching call sites.
 */
export function createRecipeRepository(
  backend: StorageBackend = loadConfig().storage,
  storageKey = loadConfig().storageKey,
): RecipeRepository {
  switch (backend) {
    case 'local':
      return new LocalStorageRecipeRepository(storageKey)
    case 'memory':
    default:
      return new MemoryRecipeRepository()
  }
}
