/**
 * Hero — Section 1
 * ---------------------------------------------------------------------------
 * Scroll narrative: the opening line of the sales conversation. Raises the
 * core anxiety ("do you actually KNOW what's happening in your shop?") that the
 * entire page then resolves. Objection resolved: none yet — it plants the hook.
 *
 * Animation: headline staggers up word-by-word (each word its own motion.span);
 * subhead fades up after; CTA scale-reveals last; hero screenshot parallax-
 * floats over a soft purple gradient glow (the hero's single purple accent,
 * alongside the CTA).
 *
 * Hero animates on MOUNT (initial/animate) rather than whileInView because it's
 * guaranteed in view at load — no need to wait for a scroll trigger.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Button, ScreenshotFrame } from '@/components/ui'
import { staggerContainer, wordUp, fadeUp, scaleReveal, reducedFade } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LEAD_CAPTURE_ID, scrollToSection } from '@/components/layout/scroll'

export function Hero() {
  const reduced = useReducedMotion()
  const { headline, subhead, cta, screenshot } = content.hero

  // Split the headline so each word can arrive on its own beat.
  const words = headline.split(' ')

  const pick = (full: typeof fadeUp) => (reduced ? reducedFade : full)

  return (
    <section id="hero" className="relative w-full overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Copy column */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col gap-6"
        >
          {/* Headline — word-by-word stagger. aria-label carries the full line
              for screen readers so the per-word spans aren't read disjointed. */}
          <h1
            aria-label={headline}
            className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={pick(wordUp)}
                className="inline-block"
                aria-hidden
              >
                {word}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={pick(fadeUp)} className="text-base text-muted-foreground sm:text-lg">
            {subhead}
          </motion.p>

          {/* CTA arrives last. */}
          <motion.div variants={pick(scaleReveal)} className="pt-2">
            <Button reduced={reduced} onClick={() => scrollToSection(LEAD_CAPTURE_ID)}>
              {cta}
            </Button>
          </motion.div>
        </motion.div>

        {/* Visual column — parallax screenshot over a purple glow. */}
        <div className="relative">
          {/* Soft purple gradient glow — the hero's accent moment. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-0 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative z-10">
            <ScreenshotFrame screenshot={screenshot} reduced={reduced} parallaxOffset={50} />
          </div>
        </div>
      </div>
    </section>
  )
}
