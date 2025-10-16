import { z } from 'zod'
const schema = z.object({
  title: z.string(),
  dietaryRestrictions: z.array(z.string()).default([]),
})
type S = {
  title: string
  dietaryRestrictions: string[]
}
const r = schema.safeParse({ title: 'a' })
if (r.success) {
  const d: S = r.data as S
  console.log(d)
}
