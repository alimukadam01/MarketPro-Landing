/**
 * ScreenshotFrame — UI primitive
 * ---------------------------------------------------------------------------
 * Wraps every product screenshot with:
 *   - scroll parallax (useParallax → subtle y-translate through the viewport),
 *   - idle-float (small infinite y-oscillation while resting in view),
 *   - a soft browser-chrome frame, and
 *   - a graceful fallback tile if the image is missing (so the page never
 *     shows a broken-image icon before the founder drops real screenshots in).
 *
 * Two nested motion layers keep the two y-animations from fighting: the outer
 * layer owns parallax (style.y = MotionValue), the inner owns idle-float.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Screenshot } from '@/content/sections'
import { idleFloat, scaleReveal, reducedFade } from '@/animations/variants'
import { useParallax } from '@/hooks/useParallax'

interface ScreenshotFrameProps {
  screenshot: Screenshot
  reduced?: boolean
  /** Parallax travel in px. Hero gets more; feature rows less. */
  parallaxOffset?: number
  className?: string
}

export function ScreenshotFrame({
  screenshot,
  reduced,
  parallaxOffset = 40,
  className = '',
}: ScreenshotFrameProps) {
  const { ref, y } = useParallax<HTMLDivElement>(parallaxOffset)
  const [failed, setFailed] = useState(false)

  return (
    // Outer layer: entrance (scaleReveal) + parallax drift.
    <motion.div
      ref={ref}
      style={{ y }}
      variants={reduced ? reducedFade : scaleReveal}
      className={`w-full ${className}`}
    >
      {/* Inner layer: idle float while resting in viewport. */}
      <motion.div
        variants={reduced ? undefined : idleFloat}
        initial="rest"
        animate="rest"
        className="overflow-hidden rounded-xl border border-border bg-card shadow-lg"
      >
        {/* Faux browser chrome — signals "this is your shop, on a screen". */}
        <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
        </div>

        {failed ? (
          // Fallback placeholder — labelled, so the layout reads correctly even
          // before real /screenshots/*.png assets are provided.
          <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-secondary p-6 text-center">
            <span className="text-sm font-medium text-muted-foreground">{screenshot.alt}</span>
          </div>
        ) : (
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            loading="lazy"
            onError={() => setFailed(true)}
            // Natural aspect ratio (w-full, h-auto) so wide app screenshots are
            // never cropped — the frame grows to fit the image.
            className="block h-auto w-full"
          />
        )}
      </motion.div>
    </motion.div>
  )
}
