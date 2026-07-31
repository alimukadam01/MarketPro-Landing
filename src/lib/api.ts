/**
 * api.ts — thin client for the lead-capture endpoint (Design pattern #6)
 * ---------------------------------------------------------------------------
 * The server layer of the presentational/container/server split. `useLeadForm`
 * (logic) calls this; `LeadCaptureForm` (UI) never touches fetch directly.
 *
 * Talks to the Django REST endpoint `POST /api/leads/`. In dev, Vite proxies
 * /api → http://127.0.0.1:8000 (see vite.config.ts).
 */
export interface LeadPayload {
  name: string
  businessName: string
  phone: string
  painpoint?: string
  /** Honeypot — must stay empty; real users never see this field. */
  company?: string
}

export interface LeadResponse {
  ok: boolean
  /** Field-level errors keyed by field name, when the server rejects input. */
  errors?: Partial<Record<keyof LeadPayload | 'detail', string>>
}

/** Endpoint path — kept relative so the Vite proxy / same-origin deploy works. */
const LEADS_ENDPOINT = '/api/leads/'

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const res = await fetch(LEADS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Map camelCase UI fields → snake_case DRF serializer fields.
        name: payload.name,
        business_name: payload.businessName,
        phone: payload.phone,
        painpoint: payload.painpoint ?? '',
        company: payload.company ?? '', // honeypot
      }),
    })

    if (res.status === 429) {
      return { ok: false, errors: { detail: 'Bohat zyada koshishein. Thodi dair baad try karein.' } }
    }

    if (res.ok) return { ok: true }

    // DRF returns field-keyed error arrays; surface the first message per field.
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>
    const errors: LeadResponse['errors'] = {}
    for (const [key, val] of Object.entries(data)) {
      const msg = Array.isArray(val) ? String(val[0]) : String(val)
      // Map snake_case back to the UI field names.
      const uiKey = key === 'business_name' ? 'businessName' : key
      errors[uiKey as keyof NonNullable<LeadResponse['errors']>] = msg
    }
    return { ok: false, errors }
  } catch {
    return { ok: false, errors: { detail: 'Network masla. Internet check karein.' } }
  }
}
