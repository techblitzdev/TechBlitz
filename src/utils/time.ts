/**
 * Formats seconds into a human readable string.
 *
 * @param seconds - The number of seconds to format.
 * @param shortForm - Whether to use short form (e.g. "m" instead of "minute").
 * @returns A string representing the formatted time.
 */
export const formatSeconds = (seconds: number, shortForm?: boolean) => {
  if (seconds < 0) {
    return 'Invalid input'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  let result = ''

  if (minutes > 0) {
    result += `${minutes}${shortForm ? 'm' : ` minute${minutes !== 1 ? 's' : ''}`}`
  }

  if (remainingSeconds > 0) {
    if (result) {
      result += ' '
    }
    result += `${remainingSeconds}s`
  }

  if (!result) {
    result = '0s'
  }

  return result
}

// Calculate time difference
export const timeAgo = (createdAt: Date) => {
  const now = new Date()
  const created = new Date(createdAt)
  const diff = now.getTime() - created.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return created.toLocaleDateString()
}
