/**
 * Button — UI primitive
 * ---------------------------------------------------------------------------
 * The one button in the system. Carries the brief-mandated micro-interactions
 * (whileHover scale ~1.02, whileTap ~0.98) and input-focus transitions. Purple
 * is reserved for the `primary` variant (CTAs) per the purple-restraint rule.
 *
 * Polymorphic: renders a `motion.a` when `href` is given (WhatsApp deep-link,
 * anchor smooth-scroll), otherwise a `motion.button`.
 */
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '@/animations/variants'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
  /** Reduced-motion callers can disable the scale interactions. */
  reduced?: boolean
}

interface ButtonAsButton extends CommonProps {
  href?: undefined
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

interface ButtonAsAnchor extends CommonProps {
  href: string
  target?: string
  rel?: string
  onClick?: () => void
}

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

const VARIANTS: Record<Variant, string> = {
  // Single strong purple — reserved for primary CTAs.
  primary: 'bg-primary text-primary-foreground shadow-sm hover:brightness-110',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
  ghost: 'bg-transparent text-primary hover:bg-secondary',
}

const SIZES: Record<Size, string> = {
  md: 'px-5 py-3 text-sm',
  // ≥44px tap target for the phone-first audience.
  lg: 'px-6 py-4 text-base min-h-[48px]',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'lg', children, className = '', reduced } = props

  const classes =
    `inline-flex items-center justify-center gap-2 rounded-lg font-semibold ` +
    `transition-[filter,background-color,box-shadow] duration-200 ` +
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ` +
    `focus-visible:ring-offset-background select-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  // Micro-interactions degrade to nothing under reduced motion.
  const interaction = reduced
    ? {}
    : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, transition: { duration: 0.2, ease: EASE } }

  if (props.href !== undefined) {
    return (
      <motion.a
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        className={classes}
        {...interaction}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${classes} disabled:opacity-60 disabled:pointer-events-none`}
      {...interaction}
    >
      {children}
    </motion.button>
  )
}
