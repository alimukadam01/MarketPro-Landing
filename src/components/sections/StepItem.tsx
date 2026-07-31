/**
 * StepItem — compound component (Design pattern #3)
 * ---------------------------------------------------------------------------
 * One numbered step in Section 7. Sequenced reveal INSIDE the item: the number
 * scales in first, then the title, then the body (staggerChildren) — mirroring
 * how you'd count off steps out loud.
 */
import { motion } from 'framer-motion'
import type { StepItemContent } from '@/content/sections'
import { fadeUp, scaleReveal, staggerContainerTight, reducedFade } from '@/animations/variants'

interface StepItemProps {
  step: StepItemContent
  index: number
  reduced?: boolean
}

export function StepItem({ step, index, reduced }: StepItemProps) {
  const pick = (full: typeof fadeUp) => (reduced ? reducedFade : full)

  return (
    <motion.div variants={staggerContainerTight} className="flex gap-4">
      {/* Number badge — the section's single purple accent (set of three). */}
      <motion.span
        variants={pick(scaleReveal)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground"
      >
        {index + 1}
      </motion.span>

      <div className="flex flex-col gap-1.5 pt-1">
        <motion.h3 variants={pick(fadeUp)} className="text-lg font-bold text-foreground">
          {step.title}
        </motion.h3>
        <motion.p variants={pick(fadeUp)} className="text-base leading-relaxed text-muted-foreground">
          {step.body}
        </motion.p>
      </div>
    </motion.div>
  )
}
