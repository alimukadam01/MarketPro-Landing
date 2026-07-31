/**
 * Pricing — Section 8
 * ---------------------------------------------------------------------------
 * Scroll narrative: honesty as a selling point. Clear numbers, nothing hidden.
 * Objection resolved: "what will this really cost me?".
 *
 * Layout (payments card): a one-time "Initial Setup" row on top, then a two-
 * column split — Core Modules (highlighted / purple accent, the primary plan)
 * and Add-Ons (neutral) — each listing its modules with a checklist and its
 * monthly price pinned to the bottom.
 *
 * The module lists are derived from `moduleDisplay.groups` (single source of
 * truth) so Pricing never drifts out of sync with the Modules section.
 *
 * GUARDRAILS: no free-trial line (deliberately excluded); no "cheapest" claim.
 * One purple accent = the highlighted Core column.
 */
import { motion } from 'framer-motion'
import { content, type ModuleItem, type PricingPlan } from '@/content/sections'
import { Section } from '@/components/layout'
import { Card, Icon } from '@/components/ui'
import { fadeUp, scaleReveal, staggerContainerTight, reducedFade } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** A single priced plan column. `accent` renders the primary (purple) treatment. */
function PlanColumn({
  plan,
  modules,
  accent,
}: {
  plan: PricingPlan
  modules: ModuleItem[]
  accent?: boolean
}) {
  return (
    <div className={`flex h-full flex-col gap-4 p-6 ${accent ? 'bg-primary/5' : ''}`}>
      <span
        className={
          `text-sm font-semibold uppercase tracking-wide ` +
          (accent ? 'text-primary' : 'text-muted-foreground')
        }
      >
        {plan.title}
      </span>

      {/* Feature checklist — flex-1 so the price pins to the bottom. */}
      <ul className="flex flex-1 flex-col gap-2">
        {modules.map((m) => (
          <li key={m.name} className="flex items-center gap-2 text-sm text-foreground">
            <Icon
              name="check"
              className={`h-4 w-4 shrink-0 ${accent ? 'text-primary' : 'text-muted-foreground'}`}
            />
            {m.name}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-baseline gap-x-1.5 border-t border-border pt-4">
        <span className={`text-2xl font-bold ${accent ? 'text-primary' : 'text-foreground'}`}>
          {plan.price}
        </span>
        <span className="text-sm text-muted-foreground">{plan.per}</span>
        {plan.note && <span className="text-sm text-muted-foreground">· {plan.note}</span>}
      </div>
    </div>
  )
}

export function Pricing() {
  const reduced = useReducedMotion()
  const { heading, setup, core, addOns } = content.pricing
  const pick = (full: typeof fadeUp) => (reduced ? reducedFade : full)

  // Derive the module lists from the Modules section (single source of truth).
  const groups = content.moduleDisplay.groups
  const coreModules = groups.find((g) => /core/i.test(g.title))?.items ?? []
  const addOnModules = groups.find((g) => /add/i.test(g.title))?.items ?? []

  return (
    <Section id="pricing" width="default">
      <motion.h2
        variants={pick(fadeUp)}
        className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl"
      >
        {heading}
      </motion.h2>

      <Card variants={pick(scaleReveal)} className="mx-auto max-w-3xl overflow-hidden">
        <motion.div variants={staggerContainerTight}>
          {/* Top row: one-time Initial Setup. */}
          <motion.div
            variants={pick(fadeUp)}
            className="flex items-center justify-between gap-4 border-b border-border p-6"
          >
            <div className="flex flex-col">
              <span className="text-base font-semibold text-foreground">{setup.label}</span>
              {setup.note && <span className="text-sm text-muted-foreground">{setup.note}</span>}
            </div>
            <span className="text-2xl font-bold text-foreground">{setup.price}</span>
          </motion.div>

          {/* Bottom: two plan columns. */}
          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <motion.div variants={pick(fadeUp)}>
              <PlanColumn plan={core} modules={coreModules} accent />
            </motion.div>
            <motion.div variants={pick(fadeUp)}>
              <PlanColumn plan={addOns} modules={addOnModules} />
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </Section>
  )
}
