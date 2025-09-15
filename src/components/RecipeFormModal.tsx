import { useEffect, useState, type FormEvent } from 'react'
import type { Recipe, RecipeDraft, Ingredient, DietaryRestriction } from '@/types'
import { DIETARY_RESTRICTIONS } from '@/types'
import { createId, createIngredientId } from '@/lib/id'

/**
 * Modal form for creating and editing recipes.
 *
 * When `initialRecipe` is provided the fields are pre-filled with its data and
 * submitting calls `onSubmit` with the updated recipe (preserving the id and
 * creation timestamp). When omitted the form starts empty and a new id is
 * generated on submit.
 */

interface RecipeFormModalProps {
  open: boolean
  initialRecipe?: Recipe
  onClose: () => void
  onSubmit: (recipe: Recipe) => void
}

function toDraft(recipe?: Recipe): RecipeDraft {
  if (!recipe) {
    return {
      title: '',
      description: '',
      category: '',
      dietaryRestrictions: [],
      servings: 1,
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      ingredients: [{ id: createIngredientId(), name: '', amount: 1, unit: '' }],
      steps: [''],
    }
  }
  return {
    title: recipe.title,
    description: recipe.description,
    category: recipe.category,
    dietaryRestrictions: [...recipe.dietaryRestrictions],
    servings: recipe.servings,
    prepTimeMinutes: recipe.prepTimeMinutes,
    cookTimeMinutes: recipe.cookTimeMinutes,
    ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient })),
    steps: [...recipe.steps],
  }
}

export function RecipeFormModal({
  open,
  initialRecipe,
  onClose,
  onSubmit,
}: RecipeFormModalProps) {
  const [draft, setDraft] = useState<RecipeDraft>(() => toDraft(initialRecipe))

  // Re-sync the form whenever the modal opens so stale state never leaks
  // between editing one recipe and the next (or between add and edit).
  useEffect(() => {
    if (open) {
      setDraft(toDraft(initialRecipe))
    }
  }, [open, initialRecipe])

  if (!open) {
    return null
  }

  const setField = <K extends keyof RecipeDraft>(key: K, value: RecipeDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const toggleRestriction = (restriction: DietaryRestriction) => {
    setDraft((current) => {
      const has = current.dietaryRestrictions.includes(restriction)
      return {
        ...current,
        dietaryRestrictions: has
          ? current.dietaryRestrictions.filter((item) => item !== restriction)
          : [...current.dietaryRestrictions, restriction],
      }
    })
  }

  const updateIngredient = (id: string, patch: Partial<Ingredient>) => {
    setDraft((current) => ({
      ...current,
      ingredients: current.ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, ...patch } : ingredient,
      ),
    }))
  }

  const addIngredient = () => {
    setDraft((current) => ({
      ...current,
      ingredients: [
        ...current.ingredients,
        { id: createIngredientId(), name: '', amount: 1, unit: '' },
      ],
    }))
  }

  const removeIngredient = (id: string) => {
    setDraft((current) => ({
      ...current,
      ingredients: current.ingredients.filter((ingredient) => ingredient.id !== id),
    }))
  }

  const updateStep = (index: number, value: string) => {
    setDraft((current) => ({
      ...current,
      steps: current.steps.map((step, i) => (i === index ? value : step)),
    }))
  }

  const addStep = () => {
    setDraft((current) => ({ ...current, steps: [...current.steps, ''] }))
  }

  const removeStep = (index: number) => {
    setDraft((current) => ({
      ...current,
      steps: current.steps.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const now = new Date().toISOString()
    const recipe: Recipe = {
      ...draft,
      id: initialRecipe?.id ?? createId('recipe'),
      createdAt: initialRecipe?.createdAt ?? now,
      updatedAt: now,
    }
    onSubmit(recipe)
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Recipe form">
      <div className="modal">
        <div className="modal-header">
          <h2>{initialRecipe ? 'Edit Recipe' : 'Add Recipe'}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="recipe-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="recipe-title">Title</label>
            <input
              id="recipe-title"
              type="text"
              value={draft.title}
              onChange={(e) => setField('title', e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="recipe-description">Description</label>
            <textarea
              id="recipe-description"
              value={draft.description}
              onChange={(e) => setField('description', e.target.value)}
              rows={2}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="recipe-category">Category</label>
              <input
                id="recipe-category"
                type="text"
                value={draft.category}
                onChange={(e) => setField('category', e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="recipe-servings">Servings</label>
              <input
                id="recipe-servings"
                type="number"
                min={1}
                value={draft.servings}
                onChange={(e) => setField('servings', Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="recipe-prep">Prep time (min)</label>
              <input
                id="recipe-prep"
                type="number"
                min={0}
                value={draft.prepTimeMinutes}
                onChange={(e) => setField('prepTimeMinutes', Number(e.target.value))}
              />
            </div>
            <div className="form-field">
              <label htmlFor="recipe-cook">Cook time (min)</label>
              <input
                id="recipe-cook"
                type="number"
                min={0}
                value={draft.cookTimeMinutes}
                onChange={(e) => setField('cookTimeMinutes', Number(e.target.value))}
              />
            </div>
          </div>

          <fieldset className="form-field">
            <legend>Dietary restrictions</legend>
            <div className="restriction-options">
              {DIETARY_RESTRICTIONS.map((restriction) => (
                <label key={restriction} className="restriction-option">
                  <input
                    type="checkbox"
                    checked={draft.dietaryRestrictions.includes(restriction)}
                    onChange={() => toggleRestriction(restriction)}
                  />
                  {restriction}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="form-field">
            <legend>Ingredients</legend>
            {draft.ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="ingredient-row">
                <input
                  type="text"
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(ingredient.id, { name: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  min={0}
                  value={ingredient.amount}
                  onChange={(e) =>
                    updateIngredient(ingredient.id, { amount: Number(e.target.value) })
                  }
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(ingredient.id, { unit: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient.id)}
                  disabled={draft.ingredients.length <= 1}
                  aria-label={`Remove ingredient ${index + 1}`}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addIngredient}>
              Add ingredient
            </button>
          </fieldset>

          <fieldset className="form-field">
            <legend>Steps</legend>
            {draft.steps.map((step, index) => (
              <div key={index} className="step-row">
                <span className="step-index">{index + 1}.</span>
                <textarea
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  rows={2}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  disabled={draft.steps.length <= 1}
                  aria-label={`Remove step ${index + 1}`}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addStep}>
              Add step
            </button>
          </fieldset>

          <div className="modal-actions">
            <button type="button" className="button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button-primary">
              {initialRecipe ? 'Save Changes' : 'Add Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecipeFormModal
