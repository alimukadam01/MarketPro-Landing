/**
 * CONTENT — SINGLE SOURCE OF TRUTH (Design pattern #1: config-driven content)
 * ---------------------------------------------------------------------------
 * Every piece of section copy, list item, module datum, rolling-word list and
 * screenshot path lives here. Components render this config; NO copy is
 * hardcoded in JSX. The founder can edit all Roman-Urdu copy in this file
 * without ever touching a component.
 *
 * GUARDRAILS (non-negotiable, do not "improve"):
 *  - All body copy is Roman Urdu, verbatim. Never translate/paraphrase.
 *  - No ROI/return claims, no "cheapest" claims.
 *  - The 10–15 min/day data-entry line (Section 7) stays visible & unsoftened.
 *
 * Each section type has its own interface for strict prop typing (no `any`).
 */

// ---------------------------------------------------------------------------
// Shared / primitive types
// ---------------------------------------------------------------------------

/** A product screenshot reference. Paths resolve from /public. */
export interface Screenshot {
  src: string
  alt: string
}

// ---------------------------------------------------------------------------
// Section 1 — Hero
// ---------------------------------------------------------------------------
export interface HeroContent {
  headline: string
  subhead: string
  cta: string
  screenshot: Screenshot
}

// ---------------------------------------------------------------------------
// Section 2 — The Problem
// ---------------------------------------------------------------------------
export interface PainCardContent {
  title: string
  /** Body may embed the <RollingWords /> slot via `rollingSlot` marker split. */
  body: string
  /** When present, the body's `{rolling}` placeholder is replaced by the ticker. */
  hasRollingWords?: boolean
  /** Text before the rolling slot (only when hasRollingWords). */
  bodyBefore?: string
  /** Text after the rolling slot (only when hasRollingWords). */
  bodyAfter?: string
}

export interface ProblemContent {
  heading: string
  cards: PainCardContent[]
  transition: string
  /** Config-driven, founder-editable rolling word list for <RollingWords />. */
  rollingWords: string[]
}

// ---------------------------------------------------------------------------
// Section 3 — The Solution
// ---------------------------------------------------------------------------
export interface SolutionContent {
  heading: string
  body: string
  questions: string[]
  closer: string
  screenshot: Screenshot
}

// ---------------------------------------------------------------------------
// Section 4 — Features → Benefits
// ---------------------------------------------------------------------------
export interface FeatureRowContent {
  title: string
  body: string
  screenshot: Screenshot
}

export interface FeaturesContent {
  heading: string
  rows: FeatureRowContent[]
}

// ---------------------------------------------------------------------------
// Section 5 — Module Display
// ---------------------------------------------------------------------------
export interface ModuleItem {
  name: string
  /** Icon key resolved to an inline SVG in the Icon component. */
  icon: string
  status: 'available' | 'coming-soon'
}

export interface ModuleGroup {
  title: string
  items: ModuleItem[]
}

export interface ModuleDisplayContent {
  heading: string
  groups: ModuleGroup[]
  /** The flagship AI agent — the section's single highlighted (purple) item. */
  agent: {
    name: string
    tagline: string
    icon: string
    status: 'coming-soon'
  }
}

// ---------------------------------------------------------------------------
// Section 6 — Privacy
// ---------------------------------------------------------------------------
export interface PrivacyStep {
  label: string
  icon: string
}

export interface PrivacyContent {
  heading: string
  body: string
  support: string
  /** Three scroll-linked steps: paper invoice → photo → private record. */
  steps: PrivacyStep[]
}

// ---------------------------------------------------------------------------
// Section 7 — How It Works
// ---------------------------------------------------------------------------
export interface StepItemContent {
  title: string
  body: string
}

export interface HowItWorksContent {
  heading: string
  steps: StepItemContent[]
}

// ---------------------------------------------------------------------------
// Section 8 — Pricing
// ---------------------------------------------------------------------------
/** One priced plan column (Core / Add-Ons). Its module list is derived from
 *  the Module Display groups so the two sections never drift out of sync. */
export interface PricingPlan {
  title: string
  price: string
  /** Billing unit shown next to the price, e.g. "/mahina". */
  per: string
  /** Optional qualifier under the price, e.g. "har module". */
  note?: string
}

export interface PricingContent {
  heading: string
  setup: { label: string; price: string; note?: string }
  core: PricingPlan
  addOns: PricingPlan
}

// ---------------------------------------------------------------------------
// Section 9 — Why Market Pro
// ---------------------------------------------------------------------------
export interface WhyPoint {
  title: string
  body: string
  icon: string
}

export interface WhyMarketProContent {
  heading: string
  points: WhyPoint[]
}

// ---------------------------------------------------------------------------
// Section 10 — Demo Offer
// ---------------------------------------------------------------------------
export interface DemoOfferContent {
  heading: string
  body: string
  cta: string
}

// ---------------------------------------------------------------------------
// Section 11 — Interest Capture (final)
// ---------------------------------------------------------------------------
export interface LeadCaptureContent {
  heading: string
  fields: {
    name: string
    business_name: string
    phone: string
    painpoint: string
  }
  primaryCta: string
  secondaryCta: string
  microcopy: string
  /** Success state shown after a lead is stored (AnimatePresence swap). */
  success: {
    title: string
    body: string
  }
}

// ---------------------------------------------------------------------------
// Navbar / Footer chrome
// ---------------------------------------------------------------------------
export interface ChromeContent {
  brand: string
  navCta: string
  /** Header "Sign in" link → the Market Pro web app. */
  signInLabel: string
  signInUrl: string
  footerTagline: string
  footerRights: string
}

// ---------------------------------------------------------------------------
// Aggregate content type
// ---------------------------------------------------------------------------
export interface SiteContent {
  chrome: ChromeContent
  hero: HeroContent
  problem: ProblemContent
  solution: SolutionContent
  features: FeaturesContent
  moduleDisplay: ModuleDisplayContent
  privacy: PrivacyContent
  howItWorks: HowItWorksContent
  pricing: PricingContent
  whyMarketPro: WhyMarketProContent
  demoOffer: DemoOfferContent
  leadCapture: LeadCaptureContent
}

// ===========================================================================
// CONTENT DATA — copy is FINAL and VERBATIM. Do not edit spellings.
// ===========================================================================
export const content: SiteContent = {
  chrome: {
    brand: 'Market Pro',
    navCta: 'Demo book karein',
    signInLabel: 'Sign in',
    signInUrl: 'https://app.market-pro.pk/',
    footerTagline: 'Market Pro — apni dukaan ka poora hisaab, ek jagah.',
    footerRights: 'Hyderabad, Pakistan.',
  },

  // -- Section 1 : Hero -----------------------------------------------------
  hero: {
    headline: 'Aap ki dukaan mein kya ho raha hai — kya aap ko sab pata hai?',
    subhead:
      'Saalon ka tajurba hai apke pass, lekin kya apke din ka ikhtetam pakki malumat se hota hai ya andaaze se?',
    cta: 'Apni dukaan screen pe dekhein →',
    screenshot: { src: '/screenshots/dashboard.png', alt: 'Market Pro dashboard' },
  },

  // -- Section 2 : The Problem ---------------------------------------------
  problem: {
    heading: 'Kia yeh kahin suna suna lag raha hai?',
    rollingWords: [
      'screws',
      'parts',
      'pumps',
      'bolts',
      'panels',
      'bulbs',
      'tiles',
    ],
    cards: [
      {
        title: '500 items mai se 50 gayab?',
        // The rolling slot occupies the "screw, parts, maal" trio position.
        hasRollingWords: true,
        bodyBefore: 'Hazaaron chhoti cheezein — ',
        bodyAfter:
          ' koi nikaal le jaaye, mahinon baad pata chalta hai, ya bilkul nahi.',
        body: '', // unused when hasRollingWords is true
      },
      {
        title: 'Aap andazey k maalik? Ya andaaza aapka maalik?',
        body: 'Kuch stock purey saal yunhi rakha rehta hai, kuch season shuru hote hi khatam. Jou item running hai, aur jis item se paisey phans rahe hain — dekhne ka zariya moujood nahi.',
      },
      {
        title: 'Sab zehn aur register mein',
        body: 'Udhaar, Supplier ka hisab, Pichle mahino ka hisab sirf apse hai. Jis din aap dukaan pe nahi — sab ruk jaata hai.',
      },
    ],
    transition: 'In mein se ek bhi jaana-pehchana laga? To aage padhein.',
  },

  // -- Section 3 : The Solution --------------------------------------------
  solution: {
    heading: 'Market Pro → aap ke sawaalon ka jawab, ek hi system mai',
    body: 'Apne karobar ki choti se choti cheez pr bhi nazar rakhein. Yeh woh tool hai jo aap ke poochne pe jawab de:',
    questions: [
      'Is hafte kya sab se zyada bika?',
      'Paise kahan phase hue hain?',
      'Kis customer ne abhi tak paise nahi diye?',
      'Kis supplier ke saath sab se ziada business kia is saal?',
    ],
    closer: 'Sab kuch saamne. Andaaza khatam, khabar pakki.',
    screenshot: { src: '/screenshots/dashboard.png', alt: 'Market Pro dashboard — aap ke sawaalon ka jawab' },
  },

  // -- Section 4 : Features → Benefits -------------------------------------
  features: {
    heading: 'Aap ko kya milta hai',
    rows: [
      {
        title: 'Inventory Tracking',
        body: 'Har cheez ka hisaab — kya aaya, kya bika, kya kam hua, kab kam hua.',
        screenshot: { src: '/screenshots/inventory.png', alt: 'Inventory tracking screen' },
      },
      {
        title: 'Sales Tracking',
        body: 'Hafta/mahina — kya chala, kya nahi, kaun sa product munafa de raha hai.',
        screenshot: { src: '/screenshots/sales.png', alt: 'Sales and KPI reports screen' },
      },
      {
        title: 'Customer & Supplier Records',
        body: 'Kis ne kitna udhaar liya ya dena hai — sab ek jagah, saaf.',
        screenshot: { src: '/screenshots/customers.png', alt: 'Customer and supplier records screen' },
      },
      {
        title: 'Purchases Tracking',
        body: 'Kaun sa maal, kis rate pe, kab liya.',
        screenshot: { src: '/screenshots/purchases.png', alt: 'Purchases tracking screen' },
      },
      {
        title: 'Khaata',
        body: 'Cash, bank aur cheque ka poora hisaab — rozana cash in hand aur munafa ek nazar mein.',
        screenshot: { src: '/screenshots/accounting.png', alt: 'Accounting overview screen' },
      },
    ],
  },

  // -- Section 5 : Module Display ------------------------------------------
  // Config-driven: module names/icons/status live here; the component renders
  // them. Icon keys map to inline SVGs in src/components/ui/Icon.tsx.
  moduleDisplay: {
    heading: 'Market Pro Modules',
    groups: [
      {
        title: 'Core Modules',
        items: [
          { name: 'Products', icon: 'package-open', status: 'available' },
          { name: 'Suppliers', icon: 'truck', status: 'available' },
          { name: 'Customers', icon: 'users', status: 'available' },
          { name: 'Inventory', icon: 'archive', status: 'available' },
          { name: 'Sales', icon: 'shopping-cart', status: 'available' },
          { name: 'Purchases', icon: 'package', status: 'available' },
          { name: 'Locations', icon: 'pin', status: 'available' },
        ],
      },
      {
        title: 'Add-On Modules',
        items: [
          { name: 'Expenses', icon: 'wallet', status: 'available' },
          { name: 'Purchase Quotations', icon: 'file-text', status: 'available' },
          { name: 'Projects', icon: 'folder-open', status: 'available' },
          { name: 'Returned Items', icon: 'undo2', status: 'available' },
          { name: 'Backlog Items', icon: 'clipboard-list', status: 'available' },
          { name: 'Employees', icon: 'user-cog', status: 'available' },
          { name: 'Accounting', icon: 'landmark', status: 'available' },
        ],
      },
    ],
    agent: {
      name: 'Right Hand Agent',
      tagline: "Market Pro's AI agent",
      icon: 'sparkles',
      status: 'coming-soon',
    },
  },

  // -- Section 6 : Privacy (differentiator) --------------------------------
  privacy: {
    heading: 'Aap ka data — sirf aap ka',
    body: 'Market Pro mein kya jaayega, faisla sirf aap ka. Chahein to dukaan par kaam kaaghaz pe rakhein — bas invoices ki photo khinchein, aur woh aap ke back-office mein aap ka niji record ban jaata hai. Jab chahein tab system pe update karein. Aap ke siwa aapka system aur koi nahi dekhta.',
    support: 'Poori nazar aap ke haath mein — storefront pr sirf woh dikhayein jou aap chahte hain.',
    steps: [
      { label: 'Kaaghaz ka invoice', icon: 'paper' },
      { label: 'Photo khinchein', icon: 'camera' },
      { label: 'Aap ka niji record', icon: 'lock' },
    ],
  },

  // -- Section 7 : How It Works --------------------------------------------
  howItWorks: {
    heading: 'Shuru karna aasaan — hum saath hain',
    steps: [
      {
        title: 'Setup karna aapki nahi, hamari zimmedari hai',
        body: 'pehli baar setup karna aur Market Pro istemaal kaise karna hai — yeh cheezein installation ka hissa hain.',
      },
      {
        title: 'Zaroori saamaan',
        body: 'Ek laptop aur internet connection.',
      },
      {
        title: 'Rozana ki chhoti aadat',
        // GUARDRAIL: the 10–15 min line stays visible and unsoftened.
        body: 'Har roz kisi ko das-pandrah minute — din ki sale daalne mein. Bas itna. Badle mein mukammal malumat.',
      },
    ],
  },

  // -- Section 8 : Pricing --------------------------------------------------
  // No free-trial line — deliberately excluded. Do not add one.
  // The Core / Add-Ons module lists are NOT repeated here — the Pricing
  // component derives them from `moduleDisplay.groups` (single source of truth).
  pricing: {
    heading: 'Apne karoubaar ke mustaqbil mai invest karein',
    setup: { label: 'Initial Setup', price: 'Rs 30,000', note: 'ek baar' },
    core: { title: 'Core Modules', price: 'Rs 2,500', per: '/mahina' },
    addOns: { title: 'Add-Ons', price: 'Rs 500', per: '/mahina', note: 'har module' },
  },

  // -- Section 9 : Why Market Pro ------------------------------------------
  whyMarketPro: {
    heading: 'Aakhir Market Pro hi kyun?',
    points: [
      {
        title: 'Local, haath se setup',
        body: 'Hum Hyderabad mein hain. Screen pe nahi — aap ki dukaan pe, aap ke saath.',
        icon: 'pin',
      },
      {
        title: 'Aap ka data niji',
        body: 'Aapka data aap ki ijaazat k baghair koi nahi dekh sakta. Hum bhi nahi.',
        icon: 'shield',
      },
      {
        title: 'Khaas Hyderabad ki Market ke liye',
        body: 'Market Pro Hyderabadi shopkeepers ki mushkilaat ko maddenazar rakh kar khaas Hyderabad ki Market ke liye banaya gaya hai. Agar aapkou mazeed features ki zaroorat hou, humse raabta karein. Hum aapke taabedaar hain.',
        icon: 'support',
      },
    ],
  },

  // -- Section 10 : Demo Offer ---------------------------------------------
  demoOffer: {
    heading: 'Ab bhi aitemaad nahi?',
    body: 'Hume apni product list dein aur 15 minutes main apni dukaan screen pe dekhein. Test run k liye neeche dia gaya form fill kar k hum se raabta karein.',
    cta: 'Demo book karein',
  },

  // -- Section 11 : Interest Capture ---------------------------------------
  leadCapture: {
    heading: 'Ek demo book karein — free, bina kisi zimmedari ke',
    fields: {
      name: 'Name',
      business_name: 'Business Name',
      phone: 'Phone',
      painpoint: 'Manual khaate ka sab se bara masla',
    },
    primaryCta: 'Demo ke liye rabta karein',
    secondaryCta: 'WhatsApp pe baat karein →',
    microcopy: 'Koi commitment nahi. Hum call ya WhatsApp karke waqt tay karenge.',
    success: {
      title: 'Shukriya! Raabta ho gaya.',
      body: 'Hum jald hi call ya WhatsApp karke demo ka waqt tay karenge.',
    },
  },
}
