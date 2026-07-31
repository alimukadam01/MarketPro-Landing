/**
 * Features — Section 4
 * ---------------------------------------------------------------------------
 * Scroll narrative: turns capabilities into concrete benefits the shopkeeper
 * can picture. Objection resolved: "what do I actually GET?" — four plain
 * answers, each shown on screen.
 *
 * Animation: alternating slide-ins per FeatureRow (copy and screenshot enter
 * from opposite edges). Neutral surface — no purple flood here.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Section } from '@/components/layout'
import { fadeUp, reducedFade } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { FeatureRow } from './FeatureRow'

export function Features() {
  const reduced = useReducedMotion()
  const { heading, rows } = content.features

  return (
    <Section id="features" width="wide">
      <motion.h2
        variants={reduced ? reducedFade : fadeUp}
        className="mb-12 text-center text-2xl font-bold text-foreground sm:text-3xl"
      >
        {heading}
      </motion.h2>

      <div className="flex flex-col gap-16">
        {rows.map((row, i) => (
          <FeatureRow key={row.title} row={row} index={i} />
        ))}
      </div>
    </Section>
  )
}
