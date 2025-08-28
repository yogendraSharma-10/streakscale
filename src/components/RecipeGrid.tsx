import { useState } from 'react'
import type { Recipe } from '@/types'
import { RecipeCard } from './RecipeCard'
import { RecipeFormModal } from './RecipeFormModal'

/**
 * Renders the collection of recipes as a responsive grid of cards. Owns the
 * state for which recipe (if any) is being edited and renders the form modal.
 * Saving an edited recipe is delegated to the parent via `onSave`.
 */

interface RecipeGridProps {
  recipes: Recipe[]
  onSave: (recipe: Recipe) => void
}

export function RecipeGrid({ recipes, onSave }: RecipeGridProps) {
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe)
  }

  const handleClose = () => {
    setEditingRecipe(null)
  }

  const handleSave = (recipe: Recipe) => {
    onSave(recipe)
    setEditingRecipe(null)
  }

  return (
    <>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onEdit={handleEdit} />
        ))}
      </div>
      <RecipeFormModal
        open={editingRecipe !== null}
        initialRecipe={editingRecipe ?? undefined}
        onClose={handleClose}
        onSubmit={handleSave}
      />
    </>
  )
}

export default RecipeGrid
