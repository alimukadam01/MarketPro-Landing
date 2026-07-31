# Market Pro — Landing Page

A production-quality, single-page, scroll-driven landing site for **Market Pro**,
shop-management software for local retail shopkeepers in Hyderabad, Pakistan.
The page reads like a salesperson: each of the 11 sections resolves the objection
the previous one raised, ending in lead capture.

- **Frontend:** React 18 + TypeScript (strict) + Vite, Tailwind (CSS-variable
  tokens), all animation via Framer Motion. Light mode only.
- **Backend:** minimal Django REST Framework — a single `POST /api/leads/`
  endpoint with SQLite storage, IP rate-limiting, and a honeypot.

---

## Quick start

Run the two servers in separate terminals.

### 1. Backend (Django, port 8000)

```bash
cd server
pip install -r requirements.txt      # Django + djangorestframework
python manage.py migrate             # creates leads.sqlite3
python manage.py runserver 127.0.0.1:8000
```

### 2. Frontend (Vite, port 5173)

```bash
npm install
cp .env.example .env                 # set VITE_WHATSAPP_NUMBER
npm run dev
```

Open http://localhost:5173. The Vite dev server proxies `/api` → `http://127.0.0.1:8000`
(see `vite.config.ts`), so the form submits same-origin with no CORS setup.

### Build & typecheck

```bash
npm run typecheck    # tsc --noEmit (strict)
npm run build        # tsc && vite build → dist/
```

---

## Editing content (no code changes)

**All copy lives in one file:** [`src/content/sections.ts`](src/content/sections.ts).
Every heading, list item, module, the RollingWords list, and screenshot path is
there, typed per section. Components render this config — there is **zero copy in
JSX**. The founder edits Roman-Urdu copy here and nowhere else.

- **Section 5 module copy** is placeholder — search for `TODO(FOUNDER)` (exactly
  one, in `sections.ts`) for the spot to drop final names/taglines.
- **Screenshots:** replace the placeholder PNGs in `public/screenshots/`
  (`dashboard`, `inventory`, `reports`, `ledger`, `purchases`). The frame shows a
  labelled fallback tile if an image is missing, so nothing breaks meanwhile.

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
| Presentational / container / server split | `LeadCaptureForm` / `useLeadForm` / `lib/api.ts` |
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

## Backend API

`POST /api/leads/`

```json
{ "name": "...", "business_name": "...", "phone": "03XXXXXXXXX",
  "painpoint": "..." }
```

- **Validation:** required name; required `business_name`; Pakistani-mobile
  phone normalised to `03XXXXXXXXX` (accepts `+92`/`0092`/`92`/`0` forms).
  `painpoint` is optional free text.
- **Storage:** SQLite `leads` table — `id, name, business_name, phone,
  painpoint, created_at, status` (`status` defaults to `new`). Only these lead
  fields are stored; no analytics on form values.
- **Abuse guard:** IP rate-limit (5/hour, DRF `ScopedRateThrottle`) + a
  server-checked honeypot (`company` field).
- **Notification:** `notify_operator(lead)` logs to the console now, with a
  clearly-marked slot in `server/leads/notifications.py` for an email/WhatsApp
  webhook later.
- No auth, no payments, no dashboards — lead-gen only.

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
  lib/                          # phone validation, api client
server/                         # Django project (marketpro) + leads app
```
