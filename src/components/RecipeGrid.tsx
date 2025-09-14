import { useState } from 'react'
import type { Recipe } from '@/types'
import RecipeCard from './RecipeCard'
import ConfirmDialog from './ConfirmDialog'
import './RecipeGrid.css'

interface RecipeGridProps {
  recipes: Recipe[]
  /** Called when the user confirms deletion of a recipe. */
  onDelete: (id: string) => void
}

/**
 * Renders the collection of recipes as a responsive grid. Owns the state of
 * the delete confirmation dialog: clicking a card's trash button opens it and
 * confirming calls the parent's `onDelete` callback.
 */
export default function RecipeGrid({ recipes, onDelete }: RecipeGridProps) {
  const [pendingDelete, setPendingDelete] = useState<Recipe | null>(null)

  const handleConfirm = () => {
    if (pendingDelete) {
      onDelete(pendingDelete.id)
    }
    setPendingDelete(null)
  }

  return (
    <>
      {recipes.length === 0 ? (
        <p className="recipe-grid-empty">No recipes yet.</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={(target) => setPendingDelete(target)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete recipe"
        message={
          pendingDelete
            ? `Are you sure you want to delete "${pendingDelete.title}"? This action cannot be undone.`
            : ''
        }
        onConfirm={handleConfirm}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  )
}
