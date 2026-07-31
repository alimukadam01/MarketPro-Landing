/**
 * Badge — UI primitive
 * ---------------------------------------------------------------------------
 * Small pill used for the single purple "Popular" accent on one ModuleCard
 * (Section 5). Pulses once on reveal (badgePulse variant); static under
 * reduced motion.
 */
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { badgePulse, reducedFade } from '@/animations/variants'

interface BadgeProps {
  children: ReactNode
  /** 'accent' = the section's single purple punctuation. */
  tone?: 'accent' | 'neutral'
  reduced?: boolean
  className?: string
}

export function Badge({ children, tone = 'accent', reduced, className = '' }: BadgeProps) {
  const tones = {
    accent: 'bg-primary text-primary-foreground',
    neutral: 'bg-secondary text-secondary-foreground',
  }

  return (
    <motion.span
      variants={reduced ? reducedFade : badgePulse}
      className={
        `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ` +
        `${tones[tone]} ${className}`
      }
    >
      {children}
    </motion.span>
  )
}
