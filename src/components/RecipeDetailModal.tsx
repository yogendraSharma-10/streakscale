import { useEffect } from 'react'
import type { Recipe } from '@/types'
import { IngredientList } from './IngredientList'

interface RecipeDetailModalProps {
  recipe: Recipe
  onClose: () => void
}

/**
 * Full-screen overlay that shows a single recipe's details: title, image,
 * description, ingredients, and a numbered list of step-by-step instructions.
 */
export function RecipeDetailModal({ recipe, onClose }: RecipeDetailModalProps) {
  // Close on Escape for keyboard accessibility.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="recipe-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
      onClick={onClose}
    >
      <div
        className="recipe-modal"
        role="document"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="recipe-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <h2 id="recipe-modal-title" className="recipe-modal-title">
          {recipe.title}
        </h2>

        <img
          className="recipe-modal-image"
          src={`https://placehold.co/800x400?text=${encodeURIComponent(recipe.title)}`}
          alt={recipe.title}
        />

        <p className="recipe-modal-description">{recipe.description}</p>

        <section className="recipe-modal-section">
          <h3>Ingredients</h3>
          <IngredientList ingredients={recipe.ingredients} />
        </section>

        <section className="recipe-modal-section">
          <h3>Steps</h3>
          <ol className="recipe-steps">
            {recipe.steps.map((step, index) => (
              <li key={`${recipe.id}-step-${index}`} className="recipe-step">
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}

export default RecipeDetailModal
