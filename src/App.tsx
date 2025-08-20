import { useState } from 'react'
import type { Recipe } from '@/types'
import { RecipeProvider, useRecipes } from '@/context/RecipeProvider'
import { RecipeGrid } from '@/components/RecipeGrid'
import { RecipeDetailModal } from '@/components/RecipeDetailModal'
import './App.css'

function RecipeManager() {
  const { recipes } = useRecipes()
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  return (
    <main className="app">
      <header className="app-header">
        <h1>Interactive Recipe Manager</h1>
        <p>Browse recipes and follow the step-by-step instructions.</p>
      </header>

      <RecipeGrid recipes={recipes} onViewSteps={setSelectedRecipe} />

      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
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
