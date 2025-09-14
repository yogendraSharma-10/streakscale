import { useMemo, useState } from 'react'
import { RecipeProvider, useRecipes } from './context/RecipeProvider'
import { CategoryFilter } from './components/CategoryFilter'
import { RecipeGrid } from './components/RecipeGrid'
import { collectCategories } from './lib/filtering'
import './App.css'

function RecipeBrowser() {
  const { recipes } = useRecipes()
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = useMemo(() => collectCategories(recipes), [recipes])

  return (
    <main className="app">
      <h1>Interactive Recipe Manager</h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />
      <RecipeGrid recipes={recipes} filter={selectedCategory} />
    </main>
  )
}

function App() {
  return (
    <RecipeProvider>
      <RecipeBrowser />
    </RecipeProvider>
  )
}

export default App
