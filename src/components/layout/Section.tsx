/**
 * Section — generic layout wrapper (Design pattern #2: composition over inheritance)
 * ---------------------------------------------------------------------------
 * Every section composes this shell instead of extending a base. It owns the
 * three things that must be consistent across all 11 sections:
 *   1. vertical spacing + max-width container (mobile-first),
 *   2. background "tone" from the design tokens (never hardcoded), and
 *   3. the shared scroll-storytelling orchestration (whileInView container that
 *      staggers its children into deliberate reading order).
 *
 * Children supply their own per-element variants (fadeUp, slideIn, scaleReveal),
 * so elements arrive one at a time — the section only orchestrates.
 */
import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

type Tone = 'background' | 'secondary' | 'card' | 'gradient'

const TONES: Record<Tone, string> = {
  background: 'bg-background',
  secondary: 'bg-secondary', // "pain"/differentiator panels
  card: 'bg-card',
  gradient: 'bg-gradient-primary text-primary-foreground', // full-bleed CTA band
}

interface SectionProps {
  id: string
  children: ReactNode
  tone?: Tone
  /** Override the container variant to tune stagger rhythm per section. */
  containerVariants?: Variants
  /** Extra classes for the inner container. */
  className?: string
  /** Narrower inner container for reading-heavy sections. */
  width?: 'default' | 'narrow' | 'wide'
}

const WIDTHS = {
  default: 'max-w-5xl',
  narrow: 'max-w-2xl',
  wide: 'max-w-6xl',
}

export function Section({
  id,
  children,
  tone = 'background',
  containerVariants,
  className = '',
  width = 'default',
}: SectionProps) {
  // Shared whileInView config — reveal once, 15% into view.
  const reveal = useScrollReveal(containerVariants)

  return (
    <section id={id} className={`w-full px-5 py-16 sm:px-8 sm:py-24 ${TONES[tone]}`}>
      <motion.div
        initial={reveal.initial}
        whileInView={reveal.whileInView}
        viewport={reveal.viewport}
        variants={reveal.variants}
        className={`mx-auto w-full ${WIDTHS[width]} ${className}`}
      >
        {children}
      </motion.div>
    </section>
  )
}
