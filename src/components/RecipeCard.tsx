import type { Recipe } from '@/types'
import './RecipeCard.css'

interface RecipeCardProps {
  recipe: Recipe
  /** Called when the user clicks the delete (trash) button on the card. */
  onDelete: (recipe: Recipe) => void
}

/**
 * Displays a single recipe as a card. Includes a trash button that lets the
 * user request deletion; the actual confirmation is handled by the parent.
 */
export default function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <div className="recipe-card-header">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <button
          type="button"
          className="recipe-card-delete"
          aria-label={`Delete ${recipe.title}`}
          title="Delete recipe"
          onClick={() => onDelete(recipe)}
        >
          <svg
            className="recipe-card-delete-icon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="currentColor"
              d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm3 5v8h-2V8h2zm4 0v8h-2V8h2z"
            />
          </svg>
        </button>
      </div>
      {recipe.description && (
        <p className="recipe-card-description">{recipe.description}</p>
      )}
      <div className="recipe-card-meta">
        <span className="recipe-card-category">{recipe.category}</span>
        <span className="recipe-card-time">
          {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
        </span>
      </div>
    </article>
  )
}
