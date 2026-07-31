/**
 * ModuleDisplay — Section 5
 * ---------------------------------------------------------------------------
 * Scroll narrative: after the core features, show the full breadth of Market Pro
 * — grouped into Core and Add-On modules, plus the forward-looking AI agent.
 * Objection resolved: "will it fit MY shop / not overcharge me for things I don't
 * need?" — pick the modules you use (sets up the Rs 500/module line in Pricing).
 *
 * Layout: two grouped grids of rectangular module tiles (icon left, name beside),
 * then the "Right Hand Agent" highlighted box carrying the section's single
 * purple accent. Tiles cascade in with stagger and hover-lift.
 *
 * Content is config-driven — module names/icons/status live in sections.ts.
 */
import { motion } from 'framer-motion'
import { content } from '@/content/sections'
import { Section } from '@/components/layout'
import { ModuleCard, Badge, Icon, type IconName } from '@/components/ui'
import { fadeUp, scaleReveal, staggerContainer, reducedFade } from '@/animations/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ModuleDisplay() {
  const reduced = useReducedMotion()
  const { heading, groups, agent } = content.moduleDisplay
  const pick = (full: typeof fadeUp) => (reduced ? reducedFade : full)

  return (
    <Section id="modules" width="wide" containerVariants={staggerContainer}>
      <motion.h2
        variants={pick(fadeUp)}
        className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl"
      >
        {heading}
      </motion.h2>

      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-4">
            <motion.h3
              variants={pick(fadeUp)}
              className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {group.title}
            </motion.h3>

            {/* Rectangular tiles cascade in. ModuleCards are direct motion
                children so staggerChildren indexes them. */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {group.items.map((item) => (
                <ModuleCard key={item.name} item={item} reduced={reduced} />
              ))}
            </motion.div>
          </div>
        ))}

        {/*
          Right Hand Agent — the section's single purple accent. Reuses the same
          purple-tint panel pattern as the lead-form success state (established
          project style, not a new one).
        */}
        <motion.div
          variants={pick(scaleReveal)}
          className="flex items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 p-5"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Icon name={agent.icon as IconName} className="h-6 w-6" />
          </span>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-bold text-foreground">{agent.name}</span>
              <Badge reduced={reduced}>Coming soon</Badge>
            </div>
            <span className="text-sm text-muted-foreground">{agent.tagline}</span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
