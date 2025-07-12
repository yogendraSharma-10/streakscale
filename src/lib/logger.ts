/**
 * Minimal structured logger.
 *
 * Kept dependency-free so it can be used anywhere. In development it writes
 * to the console with a level prefix; the level can be tuned via the config
 * module. In production builds the debug/info noise can be suppressed.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent'

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 100,
}

let currentLevel: LogLevel = 'debug'

/** Set the minimum level that will be emitted. */
export function setLogLevel(level: LogLevel): void {
  currentLevel = level
}

/** Return the currently configured minimum level. */
export function getLogLevel(): LogLevel {
  return currentLevel
}

function shouldLog(level: LogLevel): boolean {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[currentLevel]
}

function write(level: LogLevel, message: string, meta?: unknown): void {
  if (!shouldLog(level)) {
    return
  }
  const prefix = `[${level.toUpperCase()}]`
  const timestamp = new Date().toISOString()
  const target = level === 'debug' ? 'log' : level
  if (meta === undefined) {
    // eslint-disable-next-line no-console
    console[target](`${timestamp} ${prefix} ${message}`)
    return
  }
  // eslint-disable-next-line no-console
  console[target](`${timestamp} ${prefix} ${message}`, meta)
}

export const logger = {
  debug: (message: string, meta?: unknown) => write('debug', message, meta),
  info: (message: string, meta?: unknown) => write('info', message, meta),
  warn: (message: string, meta?: unknown) => write('warn', message, meta),
  error: (message: string, meta?: unknown) => write('error', message, meta),
}
