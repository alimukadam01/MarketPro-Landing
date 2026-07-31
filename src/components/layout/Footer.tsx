/**
 * Footer — layout chrome
 * ---------------------------------------------------------------------------
 * Quiet close: brand line + location. No purple flood — neutral surface, one
 * small logo mark. Reveals on scroll like every other block.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { fadeUp, staggerContainer, reducedFade } from '@/animations/variants'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Footer() {
  const reveal = useScrollReveal(staggerContainer)

  return (
    <footer className="w-full border-t border-border bg-background px-5 py-12 sm:px-8">
      <motion.div
        initial={reveal.initial}
        whileInView={reveal.whileInView}
        viewport={reveal.viewport}
        variants={reveal.variants}
        className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center"
      >
        <motion.div variants={reveal.pickVariant(fadeUp)} className="flex items-center">
          {/* Logo image replaces the old "M" mark + wordmark text. */}
          <img src="/logo.png" alt={content.chrome.brand} className="h-8 w-auto" />
        </motion.div>

        <motion.p variants={reveal.pickVariant(fadeUp)} className="text-sm text-muted-foreground">
          {content.chrome.footerTagline}
        </motion.p>
        <motion.p variants={reveal.pickVariant(reducedFade)} className="text-xs text-muted-foreground">
          {content.chrome.footerRights}
        </motion.p>
      </motion.div>
    </footer>
  )
}
