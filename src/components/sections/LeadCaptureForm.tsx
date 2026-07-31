/**
 * LeadCaptureForm — presentational component (Design pattern #6)
 * ---------------------------------------------------------------------------
 * PURE UI. All state, validation and submission live in `useLeadForm`; this
 * component receives that hook's return value as a prop and renders it. It
 * holds NO logic of its own — the presentational/container/server split.
 *
 * There is deliberately NO native <form>/submit: inputs are controlled and the
 * primary button is an onClick handler (per the brief). Fields fade up in
 * sequence; the whole form swaps to a success card via AnimatePresence.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Button, Input } from '@/components/ui'
import { fadeUp, scaleReveal, staggerContainerTight, reducedFade } from '@/animations/variants'
import type { UseLeadForm } from '@/hooks'

interface LeadCaptureFormProps {
  form: UseLeadForm
  reduced?: boolean
}

export function LeadCaptureForm({ form, reduced }: LeadCaptureFormProps) {
  const { fields, errors, status, setField, submit, whatsappHref } = form
  const c = content.leadCapture
  const pick = (full: typeof fadeUp) => (reduced ? reducedFade : full)
  const isSuccess = status === 'success'

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSuccess ? (
        // --- Success state replaces the form ---
        <motion.div
          key="success"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-8 text-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground">
            ✓
          </span>
          <h3 className="text-xl font-bold text-foreground">{c.success.title}</h3>
          <p className="text-base text-muted-foreground">{c.success.body}</p>
        </motion.div>
      ) : (
        // --- The form (controlled, no native <form>) ---
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          // NOTE: intentionally NO `exit` prop. This node's descendants are a
          // variants-driven stagger container; if the form ran an exit
          // animation, Framer would propagate exit into those variant children,
          // which never signal completion, so `onExitComplete` never fires and
          // the success swap hangs forever (button frozen on "…"). With no exit,
          // the form unmounts instantly and — under mode="wait" — the success
          // card then fades in cleanly.
          className="rounded-lg border border-border bg-card p-6 sm:p-8"
        >
          <motion.div
            variants={staggerContainerTight}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
          {/* Honeypot — off-screen, not for humans. A filled value ⇒ bot. */}
          <div aria-hidden className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={fields.company}
              onChange={(e) => setField('company', e.target.value)}
            />
          </div>

          <motion.div variants={pick(fadeUp)}>
            <Input
              id="name"
              label={c.fields.name}
              value={fields.name}
              onChange={(v) => setField('name', v)}
              error={errors.name}
              autoComplete="name"
            />
          </motion.div>

          <motion.div variants={pick(fadeUp)}>
            <Input
              id="businessName"
              label={c.fields.business_name}
              value={fields.businessName}
              onChange={(v) => setField('businessName', v)}
              error={errors.businessName}
              autoComplete="organization"
            />
          </motion.div>

          <motion.div variants={pick(fadeUp)}>
            <Input
              id="phone"
              label={c.fields.phone}
              type="tel"
              inputMode="tel"
              placeholder="03XXXXXXXXX"
              value={fields.phone}
              onChange={(v) => setField('phone', v)}
              error={errors.phone}
              autoComplete="tel"
            />
          </motion.div>

          <motion.div variants={pick(fadeUp)}>
            <Input
              id="painpoint"
              label={c.fields.painpoint}
              value={fields.painpoint}
              onChange={(v) => setField('painpoint', v)}
              error={errors.painpoint}
              optional
            />
          </motion.div>

          {/* Form-level error (network / rate-limit). */}
          <AnimatePresence>
            {errors.form && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-md bg-primary/5 px-3 py-2 text-sm text-primary"
              >
                {errors.form}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Actions */}
          <motion.div variants={pick(scaleReveal)} className="flex flex-col gap-3 pt-1">
            <Button
              reduced={reduced}
              onClick={submit}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? '…' : c.primaryCta}
            </Button>

            {/* Secondary CTA opens a prefilled WhatsApp chat (new tab). */}
            <Button
              variant="ghost"
              reduced={reduced}
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.secondaryCta}
            </Button>
          </motion.div>

          <motion.p variants={pick(fadeUp)} className="text-center text-sm text-muted-foreground">
            {c.microcopy}
          </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
