# Market Pro — Landing Page

A production-quality, single-page, scroll-driven landing site for **Market Pro**,
shop-management software for local retail shopkeepers in Hyderabad, Pakistan.
The page reads like a salesperson: each of the 11 sections resolves the objection
the previous one raised, ending in lead capture.

- **Frontend only:** React 18 + TypeScript (strict) + Vite, Tailwind (CSS-variable
  tokens), all animation via Framer Motion. Light mode only.
- **Lead form** POSTs directly to the Market Pro app's contact endpoint
  (`https://app.market-pro.pk/contact/`). There is no backend in this repo.

---

## Quick start

```bash
npm install
cp .env.example .env      # set VITE_WHATSAPP_NUMBER (and optionally VITE_LEADS_ENDPOINT)
npm run dev               # http://localhost:5173
```

### Build & typecheck

```bash
npm run typecheck    # tsc --noEmit (strict)
npm run build        # tsc && vite build → dist/
npm run preview      # serve the production build locally
```

`dist/` is a self-contained static site — deploy to any static host (Netlify,
Vercel, S3/CloudFront, Nginx, …).

---

## Lead submission

The form posts JSON to the contact endpoint (client → `lib/api.ts` → endpoint):

`POST https://app.market-pro.pk/contact/`

```json
{ "name": "...", "business_name": "...", "phone": "...", "painpoint": "..." }
```

- **Success:** any `2xx` (the endpoint returns `201 Created`) swaps the form for
  the Urdu confirmation state.
- **Validation is client-side** (`useLeadForm`): required name, required
  business name, valid Pakistani mobile (`03XXXXXXXXX` / `+92…`); `painpoint` is
  optional. Nothing is POSTed unless the fields are valid.
- **Cross-origin:** the landing page and the app are on different origins, so
  `app.market-pro.pk/contact/` **must send CORS headers** allowing the landing
  page's origin (and handle the `OPTIONS` preflight). Otherwise the browser
  blocks the response and the form shows a generic network error.
- **Override the endpoint** for staging/local with `VITE_LEADS_ENDPOINT` in
  `.env`.
- Abuse guards (rate-limiting, bot filtering) live on the contact endpoint —
  there is none in this repo.

The secondary **"WhatsApp pe baat karein"** button is a `wa.me` click-to-chat
deep link to the business number (default `923313689402`, override with
`VITE_WHATSAPP_NUMBER`).

---

## Editing content (no code changes)

**All copy lives in one file:** [`src/content/sections.ts`](src/content/sections.ts).
Every heading, list item, module, the RollingWords list, and screenshot path is
there, typed per section. Components render this config — there is **zero copy in
JSX**. Edit Roman-Urdu copy here and nowhere else.

- **Screenshots** live in `public/screenshots/`: `dashboard`, `inventory`,
  `sales`, `customers`, `purchases` (`suppliers` is available too). The frame
  shows a labelled fallback tile if an image is missing, so nothing breaks.
- **Logo / favicon:** `public/logo.png` (wide wordmark, shown at `sm`+) and
  `public/favicon.png` (square mark, shown in the header on mobile + as the tab
  icon).

### Guardrails (do not change)

- Roman-Urdu body copy is verbatim — never translate or "improve" it.
- No ROI/return claims, no "cheapest" claims.
- The 10–15 min/day data-entry line (Section 7, step 3) stays visible.
- No free-trial line in Pricing.
- Light mode only.

---

## Architecture

| Pattern | Where |
| --- | --- |
| Config-driven content (single source of truth) | `src/content/sections.ts` |
| Composition over inheritance | `src/components/layout/Section.tsx` |
| Compound components | `FeatureRow`, `ModuleCard`, `StepItem`, `PainCard` |
| Custom hooks | `useScrollReveal`, `useParallax`, `useReducedMotion`, `useLeadForm` |
| Shared animation variants | `src/animations/variants.ts` |
| Presentational / container / client split | `LeadCaptureForm` / `useLeadForm` / `lib/api.ts` |
| Barrel exports | `index.ts` in each folder |

Design tokens (colours, radius, gradients) are declared once in `src/index.css`
`:root` and consumed via `hsl(var(--token))` through Tailwind — components never
hardcode hex. `--primary` (purple `#7C3AED`) is reserved for the logo, CTAs,
interactive states, and one accent per section.

All motion is Framer Motion (no CSS keyframes). Every meaningful element —
heading, list item, card, screenshot, form field — is individually animated
within its section's orchestration, and everything degrades to opacity-only
fades under `prefers-reduced-motion`.

---

## Project layout

```
src/
  animations/variants.ts        # all Framer Motion variants
  components/
    layout/   Navbar, Section, Footer
    sections/ Hero … LeadCapture (11, in scroll order)
    ui/       Button, Card, Badge, Input, Select, ScreenshotFrame,
              ModuleCard, RollingWords, Icon
  content/sections.ts           # ← single source of truth for copy
  hooks/                        # useScrollReveal, useParallax, useReducedMotion, useLeadForm
  lib/                          # phone validation, contact-endpoint client
public/                         # logo.png, favicon.png, screenshots/
```
