import { z } from 'zod'
const schema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(1000).optional(),
  dietaryRestrictions: z.array(z.string()).default([]),
})
type S = z.infer<typeof schema>
declare const s: S
const t: { title: string; dietaryRestrictions: string[] } = s
console.log(t)
