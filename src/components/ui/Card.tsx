/**
 * Card — UI primitive
 * ---------------------------------------------------------------------------
 * Neutral surface used by PainCard, ModuleCard, pricing, etc. `--card` bg on a
 * `--border` edge. Optionally a `motion.div` so parents can orchestrate its
 * entrance; pass `variants` from the shared variants file.
 */
import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** When provided, the card participates in its parent's stagger. */
  variants?: Variants
  /** Optional hover-lift for interactive cards (modules). */
  hoverable?: boolean
  reduced?: boolean
}

export function Card({ children, className = '', variants, hoverable, reduced }: CardProps) {
  const hover = hoverable && !reduced ? { whileHover: { y: -6 } } : {}

  return (
    <motion.div
      variants={variants}
      {...hover}
      className={
        `rounded-lg border border-border bg-card text-card-foreground ` +
        `shadow-sm ${className}`
      }
    >
      {children}
    </motion.div>
  )
}
