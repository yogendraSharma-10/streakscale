import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Recipe, RecipeDraft } from '@/types'
import { RecipeService } from '@/lib/recipeService'
import { createRecipeRepository } from '@/lib/repositories'
import { seedIfEmpty } from '@/lib/seedIfEmpty'
import { loadConfig } from '@/lib/config'

/**
 * React context that exposes the recipe collection and mutation helpers to
 * the rest of the app. Backed by the configured repository.
 */

interface RecipeContextValue {
  recipes: Recipe[]
  getRecipe: (id: string) => Recipe | undefined
  addRecipe: (draft: RecipeDraft) => Recipe
  updateRecipe: (id: string, draft: RecipeDraft) => Recipe
  deleteRecipe: (id: string) => boolean
  clearRecipes: () => void
}

const RecipeContext = createContext<RecipeContextValue | null>(null)

/**
 * Builds the repository once per provider mount. The config is read lazily so
 * tests can override it before rendering.
 */
function buildService(): RecipeService {
  const config = loadConfig()
  const repo = createRecipeRepository(config.storage, config.storageKey)
  if (config.seedOnFirstRun) {
    seedIfEmpty(repo)
  }
  return new RecipeService(repo)
}

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [service] = useState(buildService)
  const [recipes, setRecipes] = useState<Recipe[]>(() => service.list())

  const refresh = useCallback(() => {
    setRecipes(service.list())
  }, [service])

  const getRecipe = useCallback(
    (id: string) => service.get(id),
    [service],
  )

  const addRecipe = useCallback(
    (draft: RecipeDraft) => {
      const recipe = service.create(draft)
      refresh()
      return recipe
    },
    [service, refresh],
  )

  const updateRecipe = useCallback(
    (id: string, draft: RecipeDraft) => {
      const recipe = service.update(id, draft)
      refresh()
      return recipe
    },
    [service, refresh],
  )

  const deleteRecipe = useCallback(
    (id: string) => {
      const deleted = service.delete(id)
      refresh()
      return deleted
    },
    [service, refresh],
  )

  const clearRecipes = useCallback(() => {
    service.clear()
    refresh()
  }, [service, refresh])

  const value = useMemo<RecipeContextValue>(
    () => ({
      recipes,
      getRecipe,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      clearRecipes,
    }),
    [recipes, getRecipe, addRecipe, updateRecipe, deleteRecipe, clearRecipes],
  )

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}

/**
 * Hook to access the recipe context. Throws when used outside a provider.
 */
export function useRecipes(): RecipeContextValue {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider')
  }
  return context
}
