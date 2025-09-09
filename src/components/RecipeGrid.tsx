import type { Recipe } from '@/types'
import { RecipeCard } from './RecipeCard'
import './RecipeGrid.css'

interface RecipeGridProps {
  recipes: Recipe[]
}

/**
 * Renders a responsive grid of RecipeCard components from a list of recipes.
 */
export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <section className="recipe-grid" aria-label="Recipes">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </section>
  )
}

export default RecipeGrid
