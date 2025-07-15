import { logger } from './logger'
import type { StorageBackend } from '@/types'

/**
 * Application configuration loader.
 *
 * Reads configuration from environment variables (when present) and falls
 * back to sensible defaults. Because this is a client-side Vite app, values
 * are read from `import.meta.env` rather than `process.env`.
 */

export interface AppConfig {
  /** Which storage backend to use: in-memory or browser local storage. */
  storage: StorageBackend
  /** Local storage key used by the local backend. */
  storageKey: string
  /** Minimum log level to emit. */
  logLevel: 'debug' | 'info' | 'warn' | 'error' | 'silent'
  /** Whether to seed sample recipes on first load. */
  seedOnFirstRun: boolean
}

const DEFAULTS: AppConfig = {
  storage: 'local',
  storageKey: 'recipe-manager.recipes.v1',
  logLevel: 'debug',
  seedOnFirstRun: true,
}

function readEnv(): Partial<AppConfig> {
  const env = import.meta.env ?? {}
  const config: Partial<AppConfig> = {}

  const storage = env.VITE_RECIPE_STORAGE as string | undefined
  if (storage === 'memory' || storage === 'local') {
    config.storage = storage
  }

  const storageKey = env.VITE_RECIPE_STORAGE_KEY as string | undefined
  if (storageKey) {
    config.storageKey = storageKey
  }

  const logLevel = env.VITE_LOG_LEVEL as string | undefined
  if (logLevel === 'debug' || logLevel === 'info' || logLevel === 'warn' || logLevel === 'error' || logLevel === 'silent') {
    config.logLevel = logLevel
  }

  const seed = env.VITE_SEED_ON_FIRST_RUN as string | undefined
  if (seed !== undefined) {
    config.seedOnFirstRun = seed !== 'false' && seed !== '0'
  }

  return config
}

/**
 * Load and memoize the application configuration.
 */
export function loadConfig(): AppConfig {
  const config: AppConfig = { ...DEFAULTS, ...readEnv() }
  logger.debug('Configuration loaded', config)
  return config
}
