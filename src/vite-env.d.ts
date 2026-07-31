/// <reference types="vite/client" />

/** Typed env vars consumed via import.meta.env. */
interface ImportMetaEnv {
  /** WhatsApp business number (digits only, incl. country code) for wa.me links. */
  readonly VITE_WHATSAPP_NUMBER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Allow importing image assets by path. */
declare module '*.png' {
  const src: string
  export default src
}
