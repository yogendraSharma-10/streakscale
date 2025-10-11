import type { Recipe } from '@/types'

/**
 * Sample recipes used to seed the app on first run so the grid has content
 * to display before the user adds their own.
 */
export const SEED_RECIPES: Recipe[] = [
  {
    id: 'recipe-seed-1',
    title: 'Creamy Mushroom Risotto',
    description: 'A rich, comforting Italian classic made with arborio rice and earthy mushrooms.',
    category: 'dinner',
    dietaryRestrictions: ['vegetarian', 'gluten-free'],
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 35,
    ingredients: [
      { id: 'seed-1-ing-1', name: 'arborio rice', amount: 1.5, unit: 'cups' },
      { id: 'seed-1-ing-2', name: 'mushrooms', amount: 300, unit: 'g' },
      { id: 'seed-1-ing-3', name: 'vegetable stock', amount: 4, unit: 'cups' },
      { id: 'seed-1-ing-4', name: 'parmesan', amount: 0.5, unit: 'cup' },
      { id: 'seed-1-ing-5', name: 'butter', amount: 2, unit: 'tbsp' },
    ],
    steps: [
      'Sauté the mushrooms in butter until golden and set aside.',
      'Toast the rice in the pan for 2 minutes.',
      'Add warm stock a ladle at a time, stirring until absorbed.',
      'Fold in the mushrooms and parmesan, season, and serve.',
    ],
    imageUrl: 'https://example.com/risotto.png',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'recipe-seed-2',
    title: 'Vegan Buddha Bowl',
    description: 'A colorful bowl of roasted vegetables, quinoa, and tahini dressing.',
    category: 'lunch',
    dietaryRestrictions: ['vegan', 'dairy-free'],
    servings: 2,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    ingredients: [
      { id: 'seed-2-ing-1', name: 'quinoa', amount: 1, unit: 'cup' },
      { id: 'seed-2-ing-2', name: 'sweet potato', amount: 2, unit: 'medium' },
      { id: 'seed-2-ing-3', name: 'chickpeas', amount: 1, unit: 'can' },
      { id: 'seed-2-ing-4', name: 'kale', amount: 2, unit: 'cups' },
      { id: 'seed-2-ing-5', name: 'tahini', amount: 3, unit: 'tbsp' },
    ],
    steps: [
      'Roast the sweet potato and chickpeas at 200°C for 25 minutes.',
      'Cook the quinoa according to package directions.',
      'Massage the kale with a little olive oil.',
      'Assemble the bowl and drizzle with tahini dressing.',
    ],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'recipe-seed-3',
    title: 'Flourless Chocolate Cake',
    description: 'A dense, fudgy dessert that is naturally gluten-free.',
    category: 'dessert',
    dietaryRestrictions: ['gluten-free'],
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    ingredients: [
      { id: 'seed-3-ing-1', name: 'dark chocolate', amount: 200, unit: 'g' },
      { id: 'seed-3-ing-2', name: 'butter', amount: 150, unit: 'g' },
      { id: 'seed-3-ing-3', name: 'eggs', amount: 4, unit: 'large' },
      { id: 'seed-3-ing-4', name: 'sugar', amount: 0.75, unit: 'cup' },
      { id: 'seed-3-ing-5', name: 'cocoa powder', amount: 0.25, unit: 'cup' },
    ],
    steps: [
      'Melt the chocolate and butter together.',
      'Whisk the eggs and sugar until pale and thick.',
      'Fold the chocolate into the egg mixture.',
      'Bake at 180°C for 40 minutes and cool before serving.',
    ],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]
