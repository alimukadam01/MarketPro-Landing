/**
 * ModuleCard — compound component (Design pattern #3)
 * ---------------------------------------------------------------------------
 * One module tile in the Section 5 grid: a rectangular box with the icon on the
 * LEFT and the module name beside it. Neutral surface (purple stays reserved
 * for the section's single accent — the Right Hand Agent). Hover-lifts via Card.
 * Content is config-driven (sections.ts → ModuleItem).
 */
import type { ModuleItem } from '@/content/sections'
import { fadeUp, reducedFade } from '@/animations/variants'
import { Card } from './Card'
import { Icon, type IconName } from './Icon'

interface ModuleCardProps {
  item: ModuleItem
  reduced?: boolean
}

export function ModuleCard({ item, reduced }: ModuleCardProps) {
  return (
    <Card
      variants={reduced ? reducedFade : fadeUp}
      hoverable
      reduced={reduced}
      className="flex items-center gap-3 p-4"
    >
      {/* Icon slot on the left — neutral tile. */}
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon name={item.icon as IconName} className="h-5 w-5" />
      </span>

      <span className="text-sm font-semibold text-foreground">{item.name}</span>
    </Card>
  )
}
