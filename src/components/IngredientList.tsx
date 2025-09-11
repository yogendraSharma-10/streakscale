import type { Ingredient } from '@/types'
import './IngredientList.css'

interface IngredientListProps {
  ingredients: Ingredient[]
}

/**
 * Formats a single ingredient as "quantity name" (e.g. "2 tbsp olive oil").
 * When the unit is empty, only the amount and name are shown.
 */
function formatIngredient(ingredient: Ingredient): string {
  const quantity = `${ingredient.amount}${ingredient.unit ? ` ${ingredient.unit}` : ''}`
  return `${quantity} ${ingredient.name}`
}

/**
 * Renders a recipe's ingredients as a styled list. Each row shows the
 * formatted quantity followed by the ingredient name.
 */
export function IngredientList({ ingredients }: IngredientListProps) {
  if (ingredients.length === 0) {
    return <p className="ingredient-list ingredient-list--empty">No ingredients listed.</p>
  }

  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id} className="ingredient-list__item">
          <span className="ingredient-list__quantity">
            {ingredient.amount}
            {ingredient.unit ? ` ${ingredient.unit}` : ''}
          </span>
          <span className="ingredient-list__name">{ingredient.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default IngredientList
export { formatIngredient }
