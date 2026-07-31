/**
 * Input — UI primitive (controlled)
 * ---------------------------------------------------------------------------
 * Presentational text input for the lead form. Controlled by `useLeadForm`.
 * Focus state animates (ring), and inline errors mount/unmount via
 * AnimatePresence. NOT part of a native <form> — value/onChange only.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/animations/variants'

interface InputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'tel'
  placeholder?: string
  error?: string
  optional?: boolean
  inputMode?: 'text' | 'tel' | 'numeric'
  autoComplete?: string
}

export function Input({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  optional,
  inputMode,
  autoComplete,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {optional && <span className="ml-1 text-muted-foreground">(optional)</span>}
      </label>

      <motion.input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        // Focus transition (component-level micro-interaction).
        whileFocus={{ scale: 1.005 }}
        transition={{ duration: 0.2, ease: EASE }}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={
          `min-h-[48px] w-full rounded-lg border bg-card px-4 py-3 text-base ` +
          `text-foreground placeholder:text-muted-foreground ` +
          `transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring ` +
          (error ? 'border-primary' : 'border-border')
        }
      />

      {/* Inline error mounts/unmounts with AnimatePresence. */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`${id}-error`}
            key={error}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="text-sm text-primary"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
