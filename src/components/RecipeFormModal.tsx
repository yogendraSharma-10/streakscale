import { useEffect, useState, type FormEvent } from 'react'
import type { Recipe } from '@/types'
import { createIngredientId } from '@/lib/id'

/**
 * The shape of the data produced by the add-recipe form: a full recipe minus
 * the system-managed `id`. `imageUrl` is an optional extra field surfaced by
 * the form so users can attach a photo.
 */
export type RecipeFormData = Omit<Recipe, 'id'> & { imageUrl?: string }

/** The category options shown in the form's select dropdown. */
const CATEGORY_OPTIONS = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snack',
  'Drink',
  'Other',
] as const

interface IngredientRow {
  id: string
  name: string
  quantity: string
}

interface RecipeFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: RecipeFormData) => void
}

const EMPTY_INGREDIENT = (): IngredientRow => ({
  id: createIngredientId(),
  name: '',
  quantity: '',
})

/**
 * Modal dialog for adding a new recipe. Renders a fixed overlay containing a
 * form with title, description, category, image URL, and dynamic lists of
 * ingredients and steps. Validates that a title plus at least one ingredient
 * and one step are present before calling `onSubmit`.
 */
export default function RecipeFormModal({
  open,
  onClose,
  onSubmit,
}: RecipeFormModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<string>(CATEGORY_OPTIONS[0])
  const [imageUrl, setImageUrl] = useState('')
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    EMPTY_INGREDIENT(),
  ])
  const [steps, setSteps] = useState<string[]>([''])
  const [error, setError] = useState<string | null>(null)

  // Reset the form whenever the modal is (re)opened so stale data never leaks
  // between submissions.
  useEffect(() => {
    if (open) {
      setTitle('')
      setDescription('')
      setCategory(CATEGORY_OPTIONS[0])
      setImageUrl('')
      setIngredients([EMPTY_INGREDIENT()])
      setSteps([''])
      setError(null)
    }
  }, [open])

  if (!open) {
    return null
  }

  const updateIngredient = (id: string, patch: Partial<IngredientRow>) => {
    setIngredients((rows) =>
      rows.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    )
  }

  const addIngredient = () => {
    setIngredients((rows) => [...rows, EMPTY_INGREDIENT()])
  }

  const removeIngredient = (id: string) => {
    setIngredients((rows) => rows.filter((row) => row.id !== id))
  }

  const updateStep = (index: number, value: string) => {
    setSteps((list) => list.map((step, i) => (i === index ? value : step)))
  }

  const addStep = () => {
    setSteps((list) => [...list, ''])
  }

  const removeStep = (index: number) => {
    setSteps((list) => list.filter((_, i) => i !== index))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const validIngredients = ingredients.filter(
      (row) => row.name.trim() !== '' && row.quantity.trim() !== '',
    )
    const validSteps = steps.map((step) => step.trim()).filter((step) => step !== '')

    if (!trimmedTitle) {
      setError('Please provide a title.')
      return
    }
    if (validIngredients.length === 0) {
      setError('Add at least one ingredient with a name and quantity.')
      return
    }
    if (validSteps.length === 0) {
      setError('Add at least one step.')
      return
    }

    const data: RecipeFormData = {
      title: trimmedTitle,
      description: description.trim(),
      category,
      imageUrl: imageUrl.trim(),
      dietaryRestrictions: [],
      servings: 1,
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      ingredients: validIngredients.map((row) => ({
        id: row.id,
        name: row.name.trim(),
        amount: Number.parseFloat(row.quantity) || 0,
        unit: '',
      })),
      steps: validSteps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSubmit(data)
    onClose()
  }

  return (
    <div
      className="recipe-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Add recipe"
      onClick={onClose}
    >
      <div
        className="recipe-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="recipe-modal-header">
          <h2>Add Recipe</h2>
          <button
            type="button"
            className="recipe-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form className="recipe-form" onSubmit={handleSubmit}>
          <label className="recipe-field">
            <span>Title *</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Creamy Mushroom Risotto"
            />
          </label>

          <label className="recipe-field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Short description shown on the card"
              rows={3}
            />
          </label>

          <label className="recipe-field">
            <span>Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="recipe-field">
            <span>Image URL</span>
            <input
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </label>

          <fieldset className="recipe-fieldset">
            <legend>Ingredients *</legend>
            {ingredients.map((row) => (
              <div className="recipe-row" key={row.id}>
                <input
                  type="text"
                  value={row.name}
                  onChange={(event) =>
                    updateIngredient(row.id, { name: event.target.value })
                  }
                  placeholder="Ingredient name"
                />
                <input
                  type="text"
                  value={row.quantity}
                  onChange={(event) =>
                    updateIngredient(row.id, { quantity: event.target.value })
                  }
                  placeholder="Quantity"
                />
                <button
                  type="button"
                  className="recipe-row-remove"
                  onClick={() => removeIngredient(row.id)}
                  disabled={ingredients.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="recipe-add" onClick={addIngredient}>
              + Add ingredient
            </button>
          </fieldset>

          <fieldset className="recipe-fieldset">
            <legend>Steps *</legend>
            {steps.map((step, index) => (
              <div className="recipe-row" key={index}>
                <input
                  type="text"
                  value={step}
                  onChange={(event) => updateStep(index, event.target.value)}
                  placeholder={`Step ${index + 1}`}
                />
                <button
                  type="button"
                  className="recipe-row-remove"
                  onClick={() => removeStep(index)}
                  disabled={steps.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="recipe-add" onClick={addStep}>
              + Add step
            </button>
          </fieldset>

          {error && <p className="recipe-error">{error}</p>}

          <div className="recipe-modal-actions">
            <button type="button" className="recipe-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="recipe-submit">
              Save Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
