import type { Recipe } from '@/types'

interface RecipeCardProps {
  recipe: Recipe
  onViewSteps: (recipe: Recipe) => void
}

/**
 * Displays a single recipe in the grid with a button that opens the
 * step-by-step detail modal.
 */
export function RecipeCard({ recipe, onViewSteps }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <img
        className="recipe-card-image"
        src={`https://placehold.co/400x220?text=${encodeURIComponent(recipe.title)}`}
        alt={recipe.title}
      />
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-description">{recipe.description}</p>
        <div className="recipe-card-meta">
          <span>{recipe.servings} servings</span>
          <span>
            {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
          </span>
        </div>
        <button
          type="button"
          className="recipe-card-button"
          onClick={() => onViewSteps(recipe)}
        >
          View Steps
        </button>
      </div>
    </article>
  )
}

export default RecipeCard
