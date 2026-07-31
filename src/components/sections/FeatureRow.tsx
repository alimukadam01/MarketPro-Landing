/**
 * FeatureRow — compound component (Design pattern #3)
 * ---------------------------------------------------------------------------
 * One feature→benefit pairing in Section 4: copy on one side, screenshot on the
 * other. Rows alternate sides by index; the copy and the screenshot slide in
 * from OPPOSITE edges so each row feels like it assembles itself.
 */
import { motion } from 'framer-motion'
import type { FeatureRowContent } from '@/content/sections'
import { ScreenshotFrame } from '@/components/ui'
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  reducedFade,
} from '@/animations/variants'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface FeatureRowProps {
  row: FeatureRowContent
  /** Even rows: copy left / shot right. Odd rows: mirrored. */
  index: number
}

export function FeatureRow({ row, index }: FeatureRowProps) {
  // Each row is its own scroll-reveal unit so it animates when IT enters view,
  // not all four at once.
  const reveal = useScrollReveal(staggerContainer)
  const mirrored = index % 2 === 1

  const copyVariant = reveal.pickVariant(mirrored ? slideInRight : slideInLeft)
  const shotVariant = mirrored ? slideInLeft : slideInRight

  return (
    <motion.div
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      variants={reveal.variants}
      className="grid items-center gap-8 md:grid-cols-2"
    >
      {/* Copy — order swaps on mirrored rows via md:order-* */}
      <motion.div
        variants={copyVariant}
        className={`flex flex-col gap-3 ${mirrored ? 'md:order-2' : 'md:order-1'}`}
      >
        <motion.h3 variants={reveal.pickVariant(fadeUp)} className="text-xl font-bold text-foreground">
          {row.title}
        </motion.h3>
        <motion.p variants={reveal.pickVariant(fadeUp)} className="text-base text-muted-foreground">
          {row.body}
        </motion.p>
      </motion.div>

      {/* Screenshot slides from the opposite edge. */}
      <motion.div
        variants={reveal.reduced ? reducedFade : shotVariant}
        className={mirrored ? 'md:order-1' : 'md:order-2'}
      >
        <ScreenshotFrame screenshot={row.screenshot} reduced={reveal.reduced} parallaxOffset={24} />
      </motion.div>
    </motion.div>
  )
}
