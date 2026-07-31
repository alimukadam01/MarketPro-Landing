/**
 * DemoOffer — Section 10
 * ---------------------------------------------------------------------------
 * Scroll narrative: the last nudge for the still-unconvinced ("Ab bhi aitemaad
 * nahi?"). Offers the concrete 15-minute demo and points straight at the form.
 * Objection resolved: "I'm still not sure" — see it on your own screen first.
 *
 * Animation: a full-width `--gradient-primary` band (this IS the section's
 * purple moment); heading and body stagger; one strong CTA smooth-scrolls to
 * Section 11.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Section } from '@/components/layout'
import { Button } from '@/components/ui'
import { fadeUp, scaleReveal, staggerContainer, reducedFade } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LEAD_CAPTURE_ID, scrollToSection } from '@/components/layout/scroll'

export function DemoOffer() {
  const reduced = useReducedMotion()
  const { heading, body, cta } = content.demoOffer
  const pick = (full: typeof fadeUp) => (reduced ? reducedFade : full)

  return (
    <Section id="demo-offer" tone="gradient" width="narrow" containerVariants={staggerContainer}>
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.h2 variants={pick(fadeUp)} className="text-2xl font-bold sm:text-3xl">
          {heading}
        </motion.h2>
        <motion.p variants={pick(fadeUp)} className="text-base leading-relaxed opacity-95 sm:text-lg">
          {body}
        </motion.p>
        <motion.div variants={pick(scaleReveal)} className="pt-2">
          {/* Secondary (light) button pops against the purple band. */}
          <Button variant="secondary" reduced={reduced} onClick={() => scrollToSection(LEAD_CAPTURE_ID)}>
            {cta}
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}
