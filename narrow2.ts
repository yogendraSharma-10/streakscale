type R = { ok: true; data: string } | { ok: false; error: Error }
declare const result: R
if (result.ok === false) {
  const e = result.error
  console.log(e)
}
