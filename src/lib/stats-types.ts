export type DailyPoint = {
  date: string
  peak: number
  visits: number
}

export type GameStats = {
  universeId: number
  name: string
  creator: string
  playing: number
  visits: number
  favorites: number
  upVotes: number
  downVotes: number
  created: string
  updated: string
  iconUrl?: string
  thumbnailUrl?: string
  peakCcu: number
  peakCcuAt: string
  history: DailyPoint[]
}

export type StatsFile = {
  updatedAt: string
  avatarUrl?: string
  games: Record<string, GameStats>
}
