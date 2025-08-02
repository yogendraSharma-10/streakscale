import type { Recipe } from '@/types'
import './RecipeCard.css'

interface RecipeCardProps {
  recipe: Recipe
}

/**
 * Displays a single recipe as a card. Shows the recipe image when an
 * imageUrl is present, otherwise falls back to a colored placeholder.
 */
export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      {recipe.imageUrl ? (
        <img
          className="recipe-card__image"
          src={recipe.imageUrl}
          alt={recipe.title}
          loading="lazy"
        />
      ) : (
        <div className="recipe-card__placeholder" aria-hidden="true" />
      )}
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{recipe.title}</h3>
        <p className="recipe-card__description">{recipe.description}</p>
        <div className="recipe-card__meta">
          <span className="recipe-card__category">{recipe.category}</span>
          <span className="recipe-card__servings">
            Serves {recipe.servings}
          </span>
        </div>
      </div>
    </article>
  )
}

export default RecipeCard
