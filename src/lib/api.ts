/**
 * api.ts — thin client for the lead/contact endpoint (Design pattern #6)
 * ---------------------------------------------------------------------------
 * The server layer of the presentational/container/server split. `useLeadForm`
 * (logic) calls this; `LeadCaptureForm` (UI) never touches fetch directly.
 *
 * Posts the form to the Market Pro app's contact endpoint
 * (`POST https://app.market-pro.pk/contact/`). This is a CROSS-ORIGIN request
 * from the landing page's domain, so that endpoint must return CORS headers
 * allowing this origin. A 201 Created response is treated as success. Field
 * validation is enforced client-side (see useLeadForm) before we ever POST.
 * Overridable via VITE_LEADS_ENDPOINT for staging/local testing.
 */
export interface LeadPayload {
  name: string
  businessName: string
  phone: string
  painpoint?: string
}

export interface LeadResponse {
  ok: boolean
  /** Form-level message shown when the request fails. */
  errors?: { detail?: string }
}

/**
 * The contact endpoint on the Market Pro app. Absolute URL because it lives on
 * a different origin (app.market-pro.pk) than the landing page. Override with
 * VITE_LEADS_ENDPOINT if you need to point at staging or a local server.
 */
const LEADS_ENDPOINT =
  (import.meta.env.VITE_LEADS_ENDPOINT as string) || 'https://app.market-pro.pk/contact/'

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const res = await fetch(LEADS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Only these four fields are sent (snake_case for the backend).
        name: payload.name,
        business_name: payload.businessName,
        phone: payload.phone,
        painpoint: payload.painpoint ?? '',
      }),
    })

    // 201 Created (and any 2xx) = success.
    if (res.ok) return { ok: true }

    if (res.status === 429) {
      return { ok: false, errors: { detail: 'Bohat zyada koshishein. Thodi dair baad try karein.' } }
    }

    // Backend is a separate service with an unknown error shape — surface a
    // generic message rather than guessing at field-level errors.
    return { ok: false, errors: { detail: 'Kuch masla ho gaya. Dobara try karein.' } }
  } catch {
    return { ok: false, errors: { detail: 'Network masla. Internet check karein.' } }
  }
}
