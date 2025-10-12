import type { RecipeRepository } from '@/types'
import { SEED_RECIPES } from '@/lib/seed'
import { logger } from '@/lib/logger'

/**
 * Seeds the repository with sample recipes. Only seeds when the repository is
 * empty so it never overwrites user data.
 */
export function seedIfEmpty(repo: RecipeRepository): void {
  if (repo.list().length > 0) {
    return
  }
  for (const recipe of SEED_RECIPES) {
    repo.create({
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      dietaryRestrictions: recipe.dietaryRestrictions,
      servings: recipe.servings,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      imageUrl: recipe.imageUrl,
    })
  }
  logger.info(`Seeded ${SEED_RECIPES.length} sample recipes`)
}
