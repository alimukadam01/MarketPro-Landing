/**
 * phone.ts — Pakistani mobile validation & normalisation
 * ---------------------------------------------------------------------------
 * Client-side mirror of the server's validation. Accepts the two formats
 * shopkeepers actually type:
 *   - local:         03XXXXXXXXX            (11 digits, leading 0)
 *   - international: +923XXXXXXXXX / 00923… (country code 92)
 * Both normalise to the canonical local form `03XXXXXXXXX`.
 *
 * A valid Pakistani mobile subscriber number is `3` + 9 digits (operator +
 * subscriber), i.e. the national significant number is `3XXXXXXXXX` (10 digits).
 */

/** Strip everything except digits and a single leading '+'. */
function clean(input: string): string {
  const trimmed = input.trim()
  const hasPlus = trimmed.startsWith('+')
  const digits = trimmed.replace(/\D/g, '')
  return hasPlus ? `+${digits}` : digits
}

/**
 * Normalise any accepted format to canonical `03XXXXXXXXX`.
 * Returns null when the input cannot be a Pakistani mobile number.
 */
export function normalizePkMobile(input: string): string | null {
  if (!input) return null
  let s = clean(input)

  // +92 / 0092 / 92 prefixes → strip to the national significant number.
  if (s.startsWith('+92')) s = s.slice(3)
  else if (s.startsWith('0092')) s = s.slice(4)
  else if (s.startsWith('92') && s.length === 12) s = s.slice(2)
  else if (s.startsWith('0')) s = s.slice(1) // local 0-prefix

  // Now `s` should be the 10-digit national number starting with 3.
  if (!/^3\d{9}$/.test(s)) return null

  return `0${s}`
}

/** True when `input` is a valid Pakistani mobile number in any accepted form. */
export function isValidPkMobile(input: string): boolean {
  return normalizePkMobile(input) !== null
}
