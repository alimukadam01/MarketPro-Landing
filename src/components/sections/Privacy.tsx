/**
 * Privacy — Section 6 (the differentiator — extra visual weight)
 * ---------------------------------------------------------------------------
 * Scroll narrative: the trust turn. Answers the tech-averse shopkeeper's real
 * fear — "who sees my data?" — with "only you". Objection resolved: "putting my
 * business in software means losing control of it".
 *
 * Animation: a distinct `--secondary` panel; a purple shield/lock accent; a
 * three-step sequenced reveal illustrating paper invoice → photo → private
 * record. Each step is its own motion component; the final "lock" step carries
 * the section's single purple accent.
 */
import { motion } from 'framer-motion'
import { content, type PrivacyStep } from '@/content/sections'
import { Section } from '@/components/layout'
import { Icon, type IconName } from '@/components/ui'
import { fadeUp, scaleReveal, staggerContainer, reducedFade } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** One step in the paper → photo → private-record flow. */
function StepChip({ step, isLast, reduced }: { step: PrivacyStep; isLast: boolean; reduced?: boolean }) {
  return (
    <motion.div
      variants={reduced ? reducedFade : scaleReveal}
      className="flex flex-col items-center gap-2 text-center"
    >
      <span
        className={
          `flex h-16 w-16 items-center justify-center rounded-2xl ` +
          // The final step (the private record) — dark-green lock icon on a
          // light green background, with a matching 0.5pt dark-green border.
          (isLast
            ? 'border-[0.5pt] border-green-700 bg-green-300 text-green-700'
            : 'border border-border bg-card text-muted-foreground')
        }
      >
        <Icon name={step.icon as IconName} className="h-8 w-8" />
      </span>
      <span className="max-w-[8rem] text-sm font-medium text-foreground">{step.label}</span>
    </motion.div>
  )
}

export function Privacy() {
  const reduced = useReducedMotion()
  const { heading, body, support, steps } = content.privacy
  const pick = (full: typeof fadeUp) => (reduced ? reducedFade : full)

  return (
    <Section id="privacy" tone="secondary" width="narrow" containerVariants={staggerContainer}>
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Purple shield — the section's accent, paired with the final step. */}
        <motion.span
          variants={pick(scaleReveal)}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"
        >
          <Icon name="shield" className="h-7 w-7" />
        </motion.span>

        <motion.h2 variants={pick(fadeUp)} className="text-2xl font-bold text-foreground sm:text-3xl">
          {heading}
        </motion.h2>

        <motion.p variants={pick(fadeUp)} className="text-base leading-relaxed text-muted-foreground">
          {body}
        </motion.p>
      </div>

      {/* Three-step sequenced reveal: paper → photo → private record. */}
      <motion.div
        variants={staggerContainer}
        className="mt-10 flex items-center justify-center gap-3 sm:gap-6"
      >
        {steps.map((step, i) => (
          <div key={step.icon} className="flex items-center gap-3 sm:gap-6">
            <StepChip step={step} isLast={i === steps.length - 1} reduced={reduced} />
            {i < steps.length - 1 && (
              <motion.span variants={pick(fadeUp)} aria-hidden className="text-2xl text-muted-foreground">
                →
              </motion.span>
            )}
          </div>
        ))}
      </motion.div>

      <motion.p
        variants={pick(fadeUp)}
        className="mt-10 text-center text-base font-medium text-foreground"
      >
        {support}
      </motion.p>
    </Section>
  )
}
