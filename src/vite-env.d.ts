/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECIPE_STORAGE?: string
  readonly VITE_RECIPE_STORAGE_KEY?: string
  readonly VITE_LOG_LEVEL?: string
  readonly VITE_SEED_ON_FIRST_RUN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
