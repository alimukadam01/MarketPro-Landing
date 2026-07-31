/**
 * scroll.ts — shared section ids + smooth-scroll helper
 * ---------------------------------------------------------------------------
 * One place for the anchor ids so the Navbar CTA, hero CTA and demo-offer CTA
 * all target the same element without magic strings drifting apart.
 */

export const LEAD_CAPTURE_ID = 'lead-capture'

/** Smooth-scroll to a section by id; `'top'` returns to the hero/top of page. */
export function scrollToSection(id: string): void {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
