import { useEffect, useMemo, useState } from 'react'
import { games, type GameEntry } from '../config/games'
import { site } from '../config/site'
import type { GameStats, StatsFile } from './stats-types'

const refreshMs = 5 * 60 * 1000

const statsUrl = import.meta.env.DEV
  ? `${import.meta.env.BASE_URL}data/stats.json`
  : `https://raw.githubusercontent.com/${site.github.owner}/${site.github.repo}/data/stats.json`

export type GameView = GameEntry & {
  stats?: GameStats
  peak: number
  url: string
}

export type Totals = {
  visits: number
  peak: number
  playing: number
  favorites: number
  count: number
}

export function useStats() {
  const [data, setData] = useState<StatsFile>()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = () =>
      fetch(statsUrl, { cache: 'no-cache' })
        .then((response) => (response.ok ? (response.json() as Promise<StatsFile>) : Promise.reject(response.status)))
        .then((next) => {
          if (cancelled) return
          setData(next)
          setFailed(false)
        })
        .catch(() => !cancelled && setFailed(true))
    load()
    const timer = window.setInterval(load, refreshMs)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  const views = useMemo<GameView[]>(
    () =>
      games.map((game) => {
        const stats = data?.games[game.placeId]
        return {
          ...game,
          stats,
          peak: Math.max(stats?.peakCcu ?? 0, game.peakCcuOverride ?? 0),
          url: `https://www.roblox.com/games/${game.placeId}`,
        }
      }),
    [data],
  )

  const totals = useMemo<Totals>(
    () =>
      views.reduce(
        (sum, view) => ({
          visits: sum.visits + (view.stats?.visits ?? 0),
          peak: sum.peak + view.peak,
          playing: sum.playing + (view.stats?.playing ?? 0),
          favorites: sum.favorites + (view.stats?.favorites ?? 0),
          count: sum.count + 1,
        }),
        { visits: 0, peak: 0, playing: 0, favorites: 0, count: 0 },
      ),
    [views],
  )

  return { data, failed, views, totals }
}
