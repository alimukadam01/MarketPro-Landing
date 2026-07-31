/**
 * HowItWorks — Section 7
 * ---------------------------------------------------------------------------
 * Scroll narrative: removes the "this will be hard to start" objection. Setup
 * is on us; you need a laptop, a printer, internet; and a small daily habit.
 *
 * GUARDRAIL: the 10–15 min/day data-entry line (step 3) must stay visible and
 * unsoftened — it renders verbatim from config, never collapsed or hidden.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Section } from '@/components/layout'
import { fadeUp, staggerContainer, reducedFade } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { StepItem } from './StepItem'

export function HowItWorks() {
  const reduced = useReducedMotion()
  const { heading, steps } = content.howItWorks

  return (
    <Section id="how-it-works" width="narrow" containerVariants={staggerContainer}>
      <motion.h2
        variants={reduced ? reducedFade : fadeUp}
        className="mb-10 text-2xl font-bold text-foreground sm:text-3xl"
      >
        {heading}
      </motion.h2>

      <div className="flex flex-col gap-8">
        {steps.map((step, i) => (
          <StepItem key={i} step={step} index={i} reduced={reduced} />
        ))}
      </div>
    </Section>
  )
}
