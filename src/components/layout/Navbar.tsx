/**
 * Navbar — layout chrome
 * ---------------------------------------------------------------------------
 * Sticky slim bar: logo left (the one place `--primary` brands the wordmark),
 * one persistent CTA right ("Demo book karein") that smooth-scrolls to the
 * final lead-capture section (Section 11). Nothing else — the page is the pitch.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Button } from '@/components/ui'
import { EASE } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LEAD_CAPTURE_ID, scrollToSection } from './scroll'

export function Navbar() {
  const reduced = useReducedMotion()

  return (
    <motion.header
      // Slides down once on load; static under reduced motion.
      initial={reduced ? { opacity: 1 } : { y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        {/* Logo. The wordmark (logo.png) is wide (~7.6:1), so on small screens
            we show the compact square mark (favicon.png) to leave room for both
            header buttons; the full wordmark returns at sm+. `brand` is the alt. */}
        <a
          href={`#${LEAD_CAPTURE_ID}`}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('top')
          }}
          className="flex shrink-0 items-center"
        >
          <img src="/favicon.png" alt={content.chrome.brand} className="h-8 w-auto sm:hidden" />
          <img src="/logo.png" alt={content.chrome.brand} className="hidden h-7 w-auto sm:block" />
        </a>

        {/* Header actions: neutral Sign in (→ web app) + the primary demo CTA.
            Only the demo CTA carries purple (purple-restraint rule). */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            reduced={reduced}
            href={content.chrome.signInUrl}
          >
            {content.chrome.signInLabel}
          </Button>
          <Button size="md" reduced={reduced} onClick={() => scrollToSection(LEAD_CAPTURE_ID)}>
            {content.chrome.navCta}
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
