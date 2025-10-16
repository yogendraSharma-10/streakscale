import { tryValidateRecipeDraft } from '@/lib/validation'
function f(input: unknown) {
  const result = tryValidateRecipeDraft(input)
  if (!result.ok) {
    const e = result.error
    console.log(e)
  }
}
console.log(f)
