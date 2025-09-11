import type { Recipe } from '@/types'
import { IngredientList } from './IngredientList'
import './RecipeCard.css'

interface RecipeCardProps {
  recipe: Recipe
}

/**
 * Displays a single recipe as a card. Shows the title, a short description,
 * and the list of ingredients below the title.
 */
export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <header className="recipe-card__header">
        <h3 className="recipe-card__title">{recipe.title}</h3>
        {recipe.description ? (
          <p className="recipe-card__description">{recipe.description}</p>
        ) : null}
      </header>

      <section className="recipe-card__ingredients" aria-label="Ingredients">
        <h4 className="recipe-card__section-title">Ingredients</h4>
        <IngredientList ingredients={recipe.ingredients} />
      </section>
    </article>
  )
}

export default RecipeCard
