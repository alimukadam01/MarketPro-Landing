/**
 * PainCard — compound component (Design pattern #3)
 * ---------------------------------------------------------------------------
 * One pain point in Section 2. Nested orchestration: the card fades up as one
 * of the three staggered cards, and INSIDE it the heading arrives a beat before
 * the body (staggerChildren) — "the card heading lands, then the body explains".
 *
 * When `hasRollingWords` is set, the body wraps the <RollingWords /> ticker in
 * the "screw, parts, maal" slot.
 */
import { motion } from 'framer-motion'
import type { PainCardContent } from '@/content/sections'
import { Card } from '@/components/ui'
import { RollingWords } from '@/components/ui'
import { fadeUp, staggerContainerTight, reducedFade } from '@/animations/variants'

interface PainCardProps {
  card: PainCardContent
  rollingWords: string[]
  reduced?: boolean
}

export function PainCard({ card, rollingWords, reduced }: PainCardProps) {
  const pick = reduced ? reducedFade : fadeUp

  return (
    <Card variants={pick} className="flex flex-col gap-3 p-6">
      {/* Inner orchestrator: heading before body. */}
      <motion.div variants={staggerContainerTight} className="flex flex-col gap-2">
        <motion.h3 variants={pick} className="text-lg font-bold text-foreground">
          {card.title}
        </motion.h3>

        <motion.p variants={pick} className="text-base leading-relaxed text-muted-foreground">
          {card.hasRollingWords ? (
            <>
              {card.bodyBefore}
              <RollingWords words={rollingWords} />
              {card.bodyAfter}
            </>
          ) : (
            card.body
          )}
        </motion.p>
      </motion.div>
    </Card>
  )
}
