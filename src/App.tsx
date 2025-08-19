import { RecipeGrid } from './components/RecipeGrid'
import { mockRecipes } from './data/mockRecipes'
import './App.css'

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>Recipe Manager</h1>
        <p>Browse a collection of delicious recipes.</p>
      </header>
      <RecipeGrid recipes={mockRecipes} />
    </main>
  )
}

export default App
