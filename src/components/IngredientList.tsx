import type { Ingredient } from '@/types'

interface IngredientListProps {
  ingredients: Ingredient[]
}

/**
 * Renders a recipe's ingredients as a bulleted list. Reused by the recipe
 * detail modal (and any future surfaces that need to show ingredients).
 */
export function IngredientList({ ingredients }: IngredientListProps) {
  if (ingredients.length === 0) {
    return <p className="ingredient-list-empty">No ingredients listed.</p>
  }

  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id} className="ingredient-list-item">
          <span className="ingredient-amount">
            {ingredient.amount} {ingredient.unit}
          </span>
          <span className="ingredient-name">{ingredient.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default IngredientList
