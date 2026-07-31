/**
 * useParallax — custom hook (Design pattern #4)
 * ---------------------------------------------------------------------------
 * Wraps `useScroll` + `useTransform` to give an element a subtle y-translate as
 * it passes through the viewport. Used on the hero visual and every product
 * screenshot. Under reduced motion it returns a frozen MotionValue (0) so the
 * element sits still.
 *
 * `offset` controls the travel distance in px (default ±40). A ref must be
 * attached to the tracked element.
 */
import { useRef } from 'react'
import { useScroll, useTransform, useMotionValue, type MotionValue } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface ParallaxResult<T extends HTMLElement> {
  ref: React.RefObject<T>
  /** Bind to `style={{ y }}` on a motion element. */
  y: MotionValue<number>
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  offset = 40,
): ParallaxResult<T> {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  // Track this element's progress from entering to leaving the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Map 0→1 progress to a gentle downward-then-up drift.
  const motion = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  // Frozen value for reduced motion — hooks must run unconditionally.
  const still = useMotionValue(0)

  return { ref, y: reduced ? still : motion }
}
