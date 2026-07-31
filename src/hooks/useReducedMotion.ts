/**
 * useReducedMotion — custom hook (Design pattern #4)
 * ---------------------------------------------------------------------------
 * Tracks the OS-level `prefers-reduced-motion` setting via matchMedia and
 * re-renders on change. This is the single guard the whole app consults to
 * decide whether to serve full motion or opacity-only fades.
 *
 * We roll our own (instead of framer-motion's) so the guard is app-owned and
 * testable, and so every consumer reads the same reactive value.
 */
import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion(): boolean {
  // Lazy initial read so SSR/first paint is correct where matchMedia exists.
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia(QUERY).matches
      : false,
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return
    const mql = window.matchMedia(QUERY)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    // addEventListener is the modern API; guarded for older Safari.
    mql.addEventListener?.('change', onChange)
    return () => mql.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}
