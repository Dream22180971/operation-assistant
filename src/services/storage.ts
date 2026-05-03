const PREFIX = 'oa_'

export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return defaultValue
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    console.error('Failed to save to localStorage')
  }
}

export function removeItem(key: string): void {
  localStorage.removeItem(PREFIX + key)
}
