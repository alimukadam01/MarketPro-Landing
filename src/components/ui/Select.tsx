/**
 * Select — UI primitive (controlled)
 * ---------------------------------------------------------------------------
 * Native <select> styled with tokens for the "Dukaan ka type" field. Native is
 * deliberate: it gives phone-first users the OS picker (big tap targets, no
 * custom dropdown to fight). Errors animate like Input.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/animations/variants'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly SelectOption[]
  placeholder: string
  error?: string
}

export function Select({ id, label, value, onChange, options, placeholder, error }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <motion.select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        whileFocus={{ scale: 1.005 }}
        transition={{ duration: 0.2, ease: EASE }}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={
          `min-h-[48px] w-full rounded-lg border bg-card px-4 py-3 text-base ` +
          `text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 ` +
          `focus:ring-ring ${value ? '' : 'text-muted-foreground'} ` +
          (error ? 'border-primary' : 'border-border')
        }
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-foreground">
            {opt.label}
          </option>
        ))}
      </motion.select>

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
