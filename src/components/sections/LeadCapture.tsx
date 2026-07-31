/**
 * LeadCapture — Section 11 (final) — CONTAINER (Design pattern #6)
 * ---------------------------------------------------------------------------
 * Scroll narrative: the close. Every prior section resolved an objection; this
 * one asks for the demo. Objection resolved: "what's the risk in trying?" —
 * none: free, no commitment.
 *
 * This is the CONTAINER half of the split: it owns the `useLeadForm` hook and
 * hands its state to the presentational <LeadCaptureForm />. Keeping the hook
 * here (not in the presentational component) is the point of the pattern.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Section, LEAD_CAPTURE_ID } from '@/components/layout'
import { fadeUp, staggerContainer, reducedFade } from '@/animations/variants'
import { useReducedMotion, useLeadForm } from '@/hooks'
import { LeadCaptureForm } from './LeadCaptureForm'

export function LeadCapture() {
  const reduced = useReducedMotion()
  // Container owns the logic; the presentational form renders it.
  const form = useLeadForm()
  const { heading } = content.leadCapture

  return (
    <Section id={LEAD_CAPTURE_ID} width="narrow" containerVariants={staggerContainer}>
      <motion.h2
        variants={reduced ? reducedFade : fadeUp}
        className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl"
      >
        {heading}
      </motion.h2>

      <motion.div variants={reduced ? reducedFade : fadeUp} className="relative">
        <LeadCaptureForm form={form} reduced={reduced} />
      </motion.div>
    </Section>
  )
}
