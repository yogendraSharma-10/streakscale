import type { Recipe } from '@/types'
import { RecipeCard } from './RecipeCard'

interface RecipeGridProps {
  recipes: Recipe[]
  onViewSteps: (recipe: Recipe) => void
}

/**
 * Responsive grid of recipe cards. Delegates the "View Steps" interaction up
 * to the parent so it can own the modal state.
 */
export function RecipeGrid({ recipes, onViewSteps }: RecipeGridProps) {
  if (recipes.length === 0) {
    return <p className="recipe-grid-empty">No recipes found.</p>
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onViewSteps={onViewSteps}
        />
      ))}
    </div>
  )
}

export default RecipeGrid
