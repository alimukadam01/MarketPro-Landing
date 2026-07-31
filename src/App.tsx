/**
 * App — scroll composition root
 * ---------------------------------------------------------------------------
 * The landing page IS the sales conversation, rendered as a scroll. Sections
 * are laid out in the exact narrative order: each one resolves the objection
 * the previous raised, ending in lead capture.
 *
 * Composition over inheritance: App simply composes the section components; each
 * section composes the generic <Section> shell with its own children.
 */
import { Navbar, Footer } from '@/components/layout'
import {
  Hero,
  Problem,
  Solution,
  Features,
  ModuleDisplay,
  Privacy,
  HowItWorks,
  Pricing,
  WhyMarketPro,
  DemoOffer,
  LeadCapture,
} from '@/components/sections'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* 1 → 11, in narrative order. */}
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <ModuleDisplay />
        <Privacy />
        <HowItWorks />
        <Pricing />
        <WhyMarketPro />
        <DemoOffer />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  )
}
