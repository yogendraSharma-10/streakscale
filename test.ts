import { z } from 'zod'
const schema = z.object({
  title: z.string(),
  dietaryRestrictions: z.array(z.string()).default([]),
})
type S = z.infer<typeof schema>
const x: S = { title: 'a' }
console.log(x)
