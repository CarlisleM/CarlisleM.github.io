const compactFormatter = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
const fullFormatter = new Intl.NumberFormat('en-US')

export const formatCompact = (value: number) => compactFormatter.format(Math.round(value))

export const formatFull = (value: number) => fullFormatter.format(Math.round(value))

export function formatRating(upVotes: number, downVotes: number) {
  const total = upVotes + downVotes
  return total ? `${Math.round((upVotes / total) * 100)}%` : '—'
}

export function timeAgo(iso: string) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}
