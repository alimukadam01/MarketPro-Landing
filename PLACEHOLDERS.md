# Placeholders to replace with real assets/content

Everything below is stand-in content generated during the build. Swap each for
the real thing. File paths and line numbers are included; content changes are
almost all confined to `src/content/sections.ts` (the single source of truth) —
no component edits needed.

---

## 1. Product screenshots (5 images)

Auto-generated mock dashboards live in `public/screenshots/`. Replace each PNG
with a real Market Pro screenshot (keep the **same filename**, ideally ~16:10
aspect ratio). Until replaced, the frame shows a labelled fallback tile, so
nothing breaks.

| File | Used in | Shows |
| --- | --- | --- |
| `public/screenshots/dashboard.png` | Hero (Section 1) **and** Solution (Section 3) | Main dashboard |
| `public/screenshots/inventory.png` | Features (Section 4, row 1) | Inventory tracking |
| `public/screenshots/reports.png` | Features (Section 4, row 2) | Sales & KPI reports |
| `public/screenshots/ledger.png` | Features (Section 4, row 3) | Customer & supplier records |
| `public/screenshots/purchases.png` | Features (Section 4, row 4) | Purchases tracking |

> Paths/alt text are defined in `src/content/sections.ts` (`hero`, `solution`,
> `features`). If you prefer different filenames, change them there.

---

## 2. Section 5 — Module Display (entire section is placeholder)

In `src/content/sections.ts` → `moduleDisplay` (marked with the one
`TODO(FOUNDER)` in the codebase). Needs:

- [ ] **Heading** — currently the English placeholder `"Market Pro Modules"`; needs the final Urdu heading.
- [ ] **6 module cards**, each currently:
  - `name`: `"Module 1"` … `"Module 6"` → real module names
  - `tagline`: `"Placeholder — one-line module ka faida"` → real one-line benefit (Roman Urdu)
  - `icon`: generic icons (`box, chart, users, truck, tag, wallet`) → pick a fitting icon per module (available keys are in `src/components/ui/Icon.tsx`; add new ones there if needed)
  - `status`: all set to `"available"` → set to `"coming-soon"` where applicable
  - `popular`: currently on Module 1 only → move/remove (this is the section's single purple "Popular" badge; keep it on at most one card)

---

## 3. WhatsApp business number (config / env)

- [ ] Set `VITE_WHATSAPP_NUMBER` in `.env` (see `.env.example`) — digits only, incl. country code, e.g. `923001234567`.
  - Used by the secondary CTA **"WhatsApp pe baat karein →"** in the lead form (Section 11).
  - Fallback if unset is the literal `<NUMBER_PLACEHOLDER>` (`src/hooks/useLeadForm.ts:49`), which makes the WhatsApp link a dead end — so this must be set before launch.

---

## 4. Branding / logo

- [ ] **Logo mark** — the Navbar and Footer render a text "M" inside a purple box (`src/components/layout/Navbar.tsx`, `Footer.tsx`), not a real logo. Replace with the real Market Pro logo if there is one.
- [ ] **Favicon** — `public/favicon.svg` is a simple purple "M". Replace with the real brand favicon.
- [ ] **Footer text** (`src/content/sections.ts` → `chrome`) — confirm `footerTagline` and `footerRights` ("Hyderabad, Pakistan.") are the wording you want.

---

## 5. Copy to confirm (not stand-in, but worth a review pass)

These are real Roman-Urdu copy from the brief, not placeholders — listed only so
you can confirm nothing needs updating as things change:

- All Section 1–11 body copy in `src/content/sections.ts`.
- Pricing numbers (Section 8): `Rs 30,000` setup, `Rs 2,500/mahina` core, `Rs 500/mahina` per extra module.
- Lead-form success message and microcopy (Section 11).

---

## NOT placeholders (do not "fix" these)

These look like placeholders but are intentional UI, not stand-in content:

- `placeholder="03XXXXXXXXX"` on the Phone field — a format hint for the user.
- The `(optional)` label on the painpoint/other optional fields.
- `ScreenshotFrame`'s fallback tile — only shows if a screenshot file is missing.
