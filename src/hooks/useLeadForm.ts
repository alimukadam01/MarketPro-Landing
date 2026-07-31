/**
 * useLeadForm — custom hook (Design pattern #4 + #6 container half)
 * ---------------------------------------------------------------------------
 * Owns ALL lead-form logic: controlled field state, client-side validation,
 * submission via the api client, and status transitions. The presentational
 * `<LeadCaptureForm />` consumes this and renders — it holds no logic itself.
 *
 * There is NO native <form>/submit: inputs are controlled, submission runs
 * through `submit()` wired to an onClick handler (per the brief).
 */
import { useCallback, useMemo, useState } from 'react'
import { isValidPkMobile } from '@/lib/phone'
import { submitLead, type LeadPayload } from '@/lib/api'

export type LeadStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface LeadFields {
  name: string
  businessName: string
  phone: string
  /** Free-text: the shopkeeper's biggest manual-bookkeeping pain. Optional. */
  painpoint: string
}

export type LeadErrors = Partial<Record<keyof LeadFields | 'form', string>>

const EMPTY: LeadFields = {
  name: '',
  businessName: '',
  phone: '',
  painpoint: '',
}

export interface UseLeadForm {
  fields: LeadFields
  errors: LeadErrors
  status: LeadStatus
  setField: <K extends keyof LeadFields>(key: K, value: LeadFields[K]) => void
  submit: () => Promise<void>
  /** Prefilled WhatsApp deep-link built from current field state. */
  whatsappHref: string
}

// WhatsApp business number for the click-to-chat deep link (wa.me). MUST be in
// international format with NO '+', leading '0', or separators — WhatsApp
// rejects anything else. Local 03313689402 → 92 + 3313689402 = 923313689402.
// Overridable per-environment via VITE_WHATSAPP_NUMBER; the default is the live
// business number so the link works even without a .env file.
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || '923313689402'

export function useLeadForm(): UseLeadForm {
  const [fields, setFields] = useState<LeadFields>(EMPTY)
  const [errors, setErrors] = useState<LeadErrors>({})
  const [status, setStatus] = useState<LeadStatus>('idle')

  const setField = useCallback<UseLeadForm['setField']>((key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    // Clear a field's error the moment the user edits it — responsive UX.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }, [])

  /** Pure client-side validation. Returns an error map (empty = valid). */
  const validate = useCallback((f: LeadFields): LeadErrors => {
    const e: LeadErrors = {}
    if (!f.name.trim()) e.name = 'Naam zaroori hai.'
    if (!f.businessName.trim()) e.businessName = 'Business ka naam zaroori hai.'
    if (!f.phone.trim()) e.phone = 'Phone number zaroori hai.'
    else if (!isValidPkMobile(f.phone)) e.phone = 'Sahih mobile number likhein (03XXXXXXXXX).'
    // painpoint is optional free text — no validation.
    return e
  }, [])

  const submit = useCallback(async () => {
    // Client-side validation gate — nothing is POSTed unless the fields are
    // valid (the separate backend does its own validation too).
    const nextErrors = validate(fields)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrors({})

    const payload: LeadPayload = {
      name: fields.name.trim(),
      businessName: fields.businessName.trim(),
      phone: fields.phone.trim(),
      painpoint: fields.painpoint.trim() || undefined,
    }

    const res = await submitLead(payload)
    if (res.ok) {
      setStatus('success')
      return
    }

    // Map server errors back onto fields; fall back to a form-level message.
    const mapped: LeadErrors = {}
    if (res.errors) {
      for (const [key, msg] of Object.entries(res.errors)) {
        if (!msg) continue
        if (key === 'detail') mapped.form = msg
        else mapped[key as keyof LeadFields] = msg
      }
    }
    if (Object.keys(mapped).length === 0) mapped.form = 'Kuch masla ho gaya. Dobara try karein.'
    setErrors(mapped)
    setStatus('error')
  }, [fields, validate])

  // Prefilled WhatsApp deep-link (secondary CTA). Message is Roman-Urdu and
  // includes the shopkeeper's name when available.
  const whatsappHref = useMemo(() => {
    const namePart = fields.name.trim() ? ` Mera naam ${fields.name.trim()} hai.` : ''
    const text = encodeURIComponent(
      `Assalam-o-alaikum, mujhe Market Pro ka demo chahiye.${namePart}`,
    )
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  }, [fields.name])

  return { fields, errors, status, setField, submit, whatsappHref }
}
