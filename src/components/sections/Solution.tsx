/**
 * Solution — Section 3
 * ---------------------------------------------------------------------------
 * Scroll narrative: the turn from pain to relief. Market Pro is introduced as
 * the one system that answers the shopkeeper's own questions. Objection
 * resolved: "is there even a fix?" — yes, and here are the exact questions it
 * answers.
 *
 * Animation: background lifts to `--card`; the question list staggers in one
 * item at a time (each with a purple check — the section's single strong
 * accent); the dashboard screenshot scale-reveals as "the answer".
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Section } from '@/components/layout'
import { ScreenshotFrame, Icon } from '@/components/ui'
import {
  fadeUp,
  slideInLeft,
  staggerContainer,
  staggerContainerTight,
  reducedFade,
} from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Solution() {
  const reduced = useReducedMotion()
  const { heading, body, questions, closer, screenshot } = content.solution
  const pick = (full: typeof fadeUp) => (reduced ? reducedFade : full)

  return (
    <Section id="solution" tone="card" width="wide" containerVariants={staggerContainer}>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Copy column */}
        <div className="flex flex-col gap-6">
          <motion.h2 variants={pick(fadeUp)} className="text-2xl font-bold text-foreground sm:text-3xl">
            {heading}
          </motion.h2>

          <motion.p variants={pick(fadeUp)} className="text-base text-muted-foreground sm:text-lg">
            {body}
          </motion.p>

          {/* Staggered question list — purple checks are the section accent. */}
          <motion.ul variants={staggerContainerTight} className="flex flex-col gap-3">
            {questions.map((q, i) => (
              <motion.li key={i} variants={pick(fadeUp)} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon name="chart" className="h-3.5 w-3.5" />
                </span>
                <span className="text-base font-medium text-foreground">{q}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p variants={pick(fadeUp)} className="text-base font-semibold text-foreground">
            {closer}
          </motion.p>
        </div>

        {/* The dashboard as the literal "answer" — scale-reveals via ScreenshotFrame. */}
        <motion.div variants={pick(slideInLeft)}>
          <ScreenshotFrame screenshot={screenshot} reduced={reduced} parallaxOffset={30} />
        </motion.div>
      </div>
    </Section>
  )
}
