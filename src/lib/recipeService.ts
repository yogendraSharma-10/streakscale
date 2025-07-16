import type { Recipe, RecipeDraft, RecipeRepository } from '@/types'
import { validateRecipeDraft } from '@/lib/validation'
import { requireRecipe } from '@/lib/repositories/memory'
import { BadRequestError } from '@/lib/errors'

/**
 * Application service layer for recipes.
 *
 * Wraps the repository with validation and domain rules. Feature components
 * (grid, form, modal) call this service rather than touching the repository
 * directly.
 */
export class RecipeService {
  constructor(private readonly repo: RecipeRepository) {}

  list(): Recipe[] {
    return this.repo.list()
  }

  get(id: string): Recipe {
    return requireRecipe(this.repo, id)
  }

  create(input: unknown): Recipe {
    const draft = this.parseDraft(input)
    return this.repo.create(draft)
  }

  update(id: string, input: unknown): Recipe {
    const draft = this.parseDraft(input)
    const updated = this.repo.update(id, draft)
    if (!updated) {
      return requireRecipe(this.repo, id)
    }
    return updated
  }

  delete(id: string): boolean {
    return this.repo.delete(id)
  }

  clear(): void {
    this.repo.clear()
  }

  private parseDraft(input: unknown): RecipeDraft {
    const result = validateRecipeDraft(input)
    if (!result.ok) {
      const firstIssue = result.error.issues[0]
      const message = firstIssue
        ? `${firstIssue.path.join('.')}: ${firstIssue.message}`
        : 'Invalid recipe data'
      throw new BadRequestError(message)
    }
    return result.data
  }
}
