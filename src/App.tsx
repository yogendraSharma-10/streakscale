import { RecipeProvider, useRecipes } from './context/RecipeProvider'
import RecipeGrid from './components/RecipeGrid'
import './App.css'

function RecipeManager() {
  const { recipes, deleteRecipe } = useRecipes()

  return (
    <main className="recipe-manager">
      <header className="recipe-manager-header">
        <h1>Recipes</h1>
      </header>
      <RecipeGrid recipes={recipes} onDelete={deleteRecipe} />
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
