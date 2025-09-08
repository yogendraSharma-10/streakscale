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
    ingredients: [
      { name: 'arborio rice', quantity: '1.5 cups' },
      { name: 'mushrooms', quantity: '300 g' },
      { name: 'vegetable stock', quantity: '4 cups' },
      { name: 'parmesan', quantity: '0.5 cup' },
      { name: 'butter', quantity: '2 tbsp' },
    ],
    steps: [
      { instruction: 'Sauté the mushrooms in butter until golden and set aside.' },
      { instruction: 'Toast the rice in the pan for 2 minutes.' },
      { instruction: 'Add warm stock a ladle at a time, stirring until absorbed.' },
      { instruction: 'Fold in the mushrooms and parmesan, season, and serve.' },
    ],
    imageUrl: 'https://example.com/risotto.png',
  },
  {
    id: 'recipe-seed-2',
    title: 'Vegan Buddha Bowl',
    description: 'A colorful bowl of roasted vegetables, quinoa, and tahini dressing.',
    category: 'lunch',
    ingredients: [
      { name: 'quinoa', quantity: '1 cup' },
      { name: 'sweet potato', quantity: '2 medium' },
      { name: 'chickpeas', quantity: '1 can' },
      { name: 'kale', quantity: '2 cups' },
      { name: 'tahini', quantity: '3 tbsp' },
    ],
    steps: [
      { instruction: 'Roast the sweet potato and chickpeas at 200°C for 25 minutes.' },
      { instruction: 'Cook the quinoa according to package directions.' },
      { instruction: 'Massage the kale with a little olive oil.' },
      { instruction: 'Assemble the bowl and drizzle with tahini dressing.' },
    ],
  },
  {
    id: 'recipe-seed-3',
    title: 'Flourless Chocolate Cake',
    description: 'A dense, fudgy dessert that is naturally gluten-free.',
    category: 'dessert',
    ingredients: [
      { name: 'dark chocolate', quantity: '200 g' },
      { name: 'butter', quantity: '150 g' },
      { name: 'eggs', quantity: '4 large' },
      { name: 'sugar', quantity: '0.75 cup' },
      { name: 'cocoa powder', quantity: '0.25 cup' },
    ],
    steps: [
      { instruction: 'Melt the chocolate and butter together.' },
      { instruction: 'Whisk the eggs and sugar until pale and thick.' },
      { instruction: 'Fold the chocolate into the egg mixture.' },
      { instruction: 'Bake at 180°C for 40 minutes and cool before serving.' },
    ],
  },
]
