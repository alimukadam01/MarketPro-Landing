/**
 * useScrollReveal — custom hook (Design pattern #4)
 * ---------------------------------------------------------------------------
 * The single shared `whileInView` configuration used by every section. It
 * returns the props to spread onto a `motion.*` container so scroll-storytelling
 * is consistent everywhere: reveal once, when the element is 15% into view.
 *
 * It also exposes `pickVariant`, which swaps any full-motion variant for the
 * opacity-only `reducedFade` when the user prefers reduced motion — so callers
 * degrade gracefully without repeating the guard.
 */
import type { Variants } from 'framer-motion'
import { reducedFade, staggerContainer } from '@/animations/variants'
import { useReducedMotion } from './useReducedMotion'

export interface ScrollRevealProps {
  /** Spread onto the orchestrating container motion element. */
  initial: 'hidden'
  whileInView: 'visible'
  viewport: { once: true; margin: string }
  variants: Variants
  /** Choose a child variant honouring reduced motion. */
  pickVariant: (full: Variants) => Variants
  /** True when the user asked for reduced motion — for bespoke cases. */
  reduced: boolean
}

export function useScrollReveal(container: Variants = staggerContainer): ScrollRevealProps {
  const reduced = useReducedMotion()

  return {
    initial: 'hidden',
    whileInView: 'visible',
    // Reveal once, a bit before fully in view — "-15%" per the brief.
    viewport: { once: true, margin: '-15%' },
    // A staggering container still works under reduced motion (children just
    // fade), so we keep the container variant and only swap the children.
    variants: container,
    pickVariant: (full: Variants) => (reduced ? reducedFade : full),
    reduced,
  }
}
