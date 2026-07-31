/**
 * Problem — Section 2
 * ---------------------------------------------------------------------------
 * Scroll narrative: names the shopkeeper's daily pains out loud so they feel
 * seen. Objection resolved: "you don't understand my problems" — by describing
 * them precisely (missing stock, guesswork, everything-in-my-head).
 *
 * Animation: a muted `--secondary` panel signals "pain"; each PainCard fades +
 * slides in one at a time; headings arrive a beat before bodies. The first card
 * hosts the <RollingWords /> ticker.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Section } from '@/components/layout'
import { fadeUp, staggerContainer, reducedFade } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { PainCard } from './PainCard'

export function Problem() {
  const reduced = useReducedMotion()
  const { heading, cards, transition, rollingWords } = content.problem
  const pick = reduced ? reducedFade : fadeUp

  return (
    <Section id="problem" tone="secondary" containerVariants={staggerContainer}>
      <motion.h2
        variants={pick}
        className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl"
      >
        {heading}
      </motion.h2>

      {/* One-at-a-time cards. */}
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card, i) => (
          <PainCard key={i} card={card} rollingWords={rollingWords} reduced={reduced} />
        ))}
      </div>

      <motion.p
        variants={pick}
        className="mt-8 text-center text-base font-medium text-foreground"
      >
        {transition}
      </motion.p>
    </Section>
  )
}
