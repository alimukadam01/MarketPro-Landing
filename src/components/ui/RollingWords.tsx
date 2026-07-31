/**
 * RollingWords — special UI component (Section 2)
 * ---------------------------------------------------------------------------
 * A ticker that shows ONE word at a time, cycling continuously to evoke the
 * many small items that quietly go missing from a shop. It occupies the
 * "screw, parts, maal" trio slot inside the first PainCard.
 *
 * Behaviour (per brief):
 *  - Words cycle every ~1.6s. Current word rolls UP and out (y:-100%, opacity 0)
 *    as the next rolls IN from below (y:100% → 0). AnimatePresence mode="wait".
 *  - Loops infinitely WHILE in viewport; PAUSES when scrolled out of view
 *    (framer-motion useInView / IntersectionObserver).
 *  - Layout stability: an invisible sizer reserves the width of the LONGEST
 *    word so the sentence never reflows mid-cycle. Fixed height + overflow
 *    hidden gives the roll its mask.
 *  - Styling: carries the section's single purple accent (--primary).
 *  - Reduced motion: renders a STATIC "screw, parts, maal" — no cycling.
 *
 * The word list is config-driven (sections.ts) — founder edits it there only.
 */
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { rollingWord } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface RollingWordsProps {
  words: string[]
  /** Cycle interval in ms. */
  intervalMs?: number
}

export function RollingWords({ words, intervalMs = 1600 }: RollingWordsProps) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLSpanElement>(null)
  // Pause the cycle when the ticker isn't on screen (perf + intent).
  const inView = useInView(containerRef, { margin: '0px' })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced || !inView || words.length === 0) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [reduced, inView, words.length, intervalMs])

  // Longest word reserves the slot width so nothing reflows during the roll.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  // Reduced motion: the brief mandates a static "screw, parts, maal".
  if (reduced) {
    return <span className="font-semibold text-primary">screw, parts, maal</span>
  }

  return (
    <span
      ref={containerRef}
      className="relative inline-flex items-center overflow-hidden align-baseline"
      // Fixed height masks the roll; line-height keeps baseline steady.
      style={{ height: '1.25em' }}
    >
      {/* Invisible sizer: reserves width == longest word. */}
      <span aria-hidden className="invisible whitespace-nowrap font-semibold">
        {longest}
      </span>

      {/* Animated word, absolutely positioned over the sizer. */}
      <span className="absolute inset-0 flex items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            variants={rollingWord}
            initial="enter"
            animate="center"
            exit="exit"
            className="whitespace-nowrap font-semibold text-primary"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
