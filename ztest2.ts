import { z } from 'zod'
const schema = z.object({
  title: z.string(),
  dietaryRestrictions: z.array(z.string()).default([]),
})
type S = z.infer<typeof schema>
declare const s: S
const t: { title: string; dietaryRestrictions: string[] } = s
console.log(t)
