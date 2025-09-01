import { useState } from 'react'
import type { Recipe } from '@/types'
import { RecipeProvider, useRecipes } from '@/context/RecipeProvider'
import { RecipeGrid } from '@/components/RecipeGrid'
import { RecipeFormModal } from '@/components/RecipeFormModal'
import './App.css'

/**
 * Top-level application shell. Wraps the recipe grid in the provider and
 * handles persisting edits by replacing the updated recipe in the list.
 */

function RecipeManager() {
  const { recipes, addRecipe, updateRecipe } = useRecipes()
  const [showAddModal, setShowAddModal] = useState(false)

  const handleAdd = (recipe: Recipe) => {
    addRecipe(recipe)
    setShowAddModal(false)
  }

  const handleUpdate = (recipe: Recipe) => {
    updateRecipe(recipe.id, recipe)
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Recipe Manager</h1>
        <button type="button" className="button-primary" onClick={() => setShowAddModal(true)}>
          Add Recipe
        </button>
      </header>

      <RecipeGrid recipes={recipes} onSave={handleUpdate} />

      <RecipeFormModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAdd}
      />
    </main>
  )
}

function App() {
  return (
    <RecipeProvider>
      <RecipeManager />
    </RecipeProvider>
  )
}

export default App
