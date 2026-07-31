/**
 * WhyMarketPro — Section 9
 * ---------------------------------------------------------------------------
 * Scroll narrative: the closing argument before the ask. Local, private, and
 * humanly supported. Objection resolved: "why THIS one, and will anyone
 * actually help me?".
 *
 * Animation: three points stagger in, each its own motion item with an icon.
 * The purple-tinted icon tiles are the section's single accent.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Section } from '@/components/layout'
import { Card, Icon, type IconName } from '@/components/ui'
import { fadeUp, staggerContainer, staggerContainerTight, reducedFade } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function WhyMarketPro() {
  const reduced = useReducedMotion()
  const { heading, points } = content.whyMarketPro
  const pick = (full: typeof fadeUp) => (reduced ? reducedFade : full)

  return (
    <Section id="why" width="wide" containerVariants={staggerContainer}>
      <motion.h2
        variants={pick(fadeUp)}
        className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl"
      >
        {heading}
      </motion.h2>

      <div className="grid gap-5 md:grid-cols-3">
        {points.map((point) => (
          <Card key={point.title} variants={pick(fadeUp)} className="p-6">
            <motion.div variants={staggerContainerTight} className="flex flex-col gap-3">
              <motion.span
                variants={pick(fadeUp)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
              >
                <Icon name={point.icon as IconName} className="h-6 w-6" />
              </motion.span>
              <motion.h3 variants={pick(fadeUp)} className="text-lg font-bold text-foreground">
                {point.title}
              </motion.h3>
              <motion.p variants={pick(fadeUp)} className="text-base leading-relaxed text-muted-foreground">
                {point.body}
              </motion.p>
            </motion.div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
