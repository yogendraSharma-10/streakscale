import type { Recipe } from '@/types'

/**
 * Displays a single recipe as a card in the grid. Includes an edit button so
 * the recipe can be opened in the pre-filled form modal.
 */

interface RecipeCardProps {
  recipe: Recipe
  onEdit: (recipe: Recipe) => void
}

export function RecipeCard({ recipe, onEdit }: RecipeCardProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <article className="recipe-card">
      <div className="recipe-card-header">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <button
          type="button"
          className="recipe-card-edit"
          onClick={() => onEdit(recipe)}
          aria-label={`Edit ${recipe.title}`}
        >
          Edit
        </button>
      </div>
      <p className="recipe-card-description">{recipe.description}</p>
      <div className="recipe-card-meta">
        <span className="recipe-card-category">{recipe.category}</span>
        <span>{recipe.servings} servings</span>
        <span>{totalTime} min</span>
      </div>
      {recipe.dietaryRestrictions.length > 0 && (
        <ul className="recipe-card-tags">
          {recipe.dietaryRestrictions.map((restriction) => (
            <li key={restriction} className="recipe-card-tag">
              {restriction}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default RecipeCard
