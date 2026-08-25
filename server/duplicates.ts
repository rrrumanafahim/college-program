const WINDOW_MS = 1000 * 60 * 60 * 12
const seen = new Map<string, number>()

function prune(now: number) {
  for (const [key, timestamp] of seen) {
    if (now - timestamp > WINDOW_MS) seen.delete(key)
  }
}

export function takeApplicationSlot(email: string) {
  const now = Date.now()
  prune(now)
  const key = email.trim().toLowerCase()
  const previous = seen.get(key)
  if (previous && now - previous < WINDOW_MS) return false
  seen.set(key, now)
  return true
}
