/**
 * ANIMATION VARIANTS — shared constants (Design pattern #5)
 * ---------------------------------------------------------------------------
 * Every Framer Motion variant used across the site is defined ONCE here.
 * Sections and components import these — they never redefine them inline.
 * This keeps the motion language consistent: one easing curve, one duration
 * band, one stagger rhythm — "a salesperson revealing one point at a time".
 *
 * Reduced-motion handling: components call `useReducedMotion()` and, when true,
 * swap these for `reducedFade` (opacity-only). See src/hooks/useReducedMotion.
 */
import type { Variants, Transition } from 'framer-motion'

/** Confident, calm easing — no bouncy springs. Brief-mandated. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Shared transition band: durations 0.5–0.8s. */
export const baseTransition: Transition = {
  duration: 0.6,
  ease: EASE,
}

// ---------------------------------------------------------------------------
// Container orchestrators — stagger children into deliberate reading order.
// ---------------------------------------------------------------------------
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // default rhythm; sections may tune via custom
      delayChildren: 0.05,
    },
  },
}

/** A faster stagger for dense lists (question lists, pricing rows). */
export const staggerContainerTight: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

// ---------------------------------------------------------------------------
// Child entrance variants.
// ---------------------------------------------------------------------------
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
}

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { ...baseTransition, duration: 0.7 } },
}

/** Per-word hero headline stagger — each word its own motion.span. */
export const wordUp: Variants = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

// ---------------------------------------------------------------------------
// Idle / continuous variants.
// ---------------------------------------------------------------------------
/** Small infinite y-oscillation for screenshots resting in viewport. */
export const idleFloat: Variants = {
  rest: {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

/** Badge pulse-once on reveal (scale bump then settle). */
export const badgePulse: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: [0.8, 1.12, 1],
    transition: { duration: 0.6, ease: EASE, times: [0, 0.6, 1] },
  },
}

// ---------------------------------------------------------------------------
// RollingWords ticker variants (Section 2). Word rolls up-and-out while the
// next rolls in from below. Used with AnimatePresence mode="wait".
// ---------------------------------------------------------------------------
export const rollingWord: Variants = {
  enter: { y: '100%', opacity: 0 },
  center: { y: '0%', opacity: 1, transition: { duration: 0.45, ease: EASE } },
  exit: { y: '-100%', opacity: 0, transition: { duration: 0.45, ease: EASE } },
}

// ---------------------------------------------------------------------------
// Reduced-motion fallback — opacity-only. Every variant above degrades to this
// when the user prefers reduced motion (swapped at the component level).
// ---------------------------------------------------------------------------
export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'linear' } },
}
