import type { Recipe } from '@/types'
import { RecipeCard } from './RecipeCard'

/**
 * Renders the collection of recipes as a responsive grid of cards. Owns the
 * state for which recipe (if any) is being edited and renders the form modal.
 */

interface RecipeGridProps {
  recipes: Recipe[]
  onSave: (recipe: Recipe) => void
}

export function RecipeGrid({ recipes, onSave }: RecipeGridProps) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onEdit={onSave} />
      ))}
    </div>
  )
}

export default RecipeGrid
