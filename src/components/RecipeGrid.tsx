import type { Recipe } from '@/types'
import { filterRecipes } from '@/lib/filtering'

interface RecipeGridProps {
  /** The full list of recipes to display. */
  recipes: Recipe[]
  /** Optional category to filter by; empty/undefined shows all recipes. */
  filter?: string
}

/**
 * Renders the recipe collection as a grid. When a category filter is
 * provided, only recipes in that category are shown.
 */
export function RecipeGrid({ recipes, filter = '' }: RecipeGridProps) {
  const visibleRecipes = filterRecipes(recipes, { category: filter })

  if (visibleRecipes.length === 0) {
    return <p className="recipe-grid__empty">No recipes found.</p>
  }

  return (
    <div className="recipe-grid">
      {visibleRecipes.map((recipe) => (
        <article key={recipe.id} className="recipe-card">
          <h3 className="recipe-card__title">{recipe.title}</h3>
          <p className="recipe-card__description">{recipe.description}</p>
          <span className="recipe-card__category">{recipe.category}</span>
        </article>
      ))}
    </div>
  )
}

export default RecipeGrid
