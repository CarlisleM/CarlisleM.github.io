import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { games } from '../src/config/games.ts'
import { site } from '../src/config/site.ts'
import type { DailyPoint, GameStats, StatsFile } from '../src/lib/stats-types.ts'

const outputPath = process.argv[2] ?? 'public/data/stats.json'
const historyDays = 120
const batchSize = 50

type RobloxGame = {
  id: number
  name: string
  playing: number | null
  visits: number
  favoritedCount: number
  created: string
  updated: string
  creator: { name: string }
}

type RobloxVotes = { id: number; upVotes: number; downVotes: number }
type RobloxImage = { targetId: number; state: string; imageUrl: string | null }
type RobloxGameThumbnails = { universeId: number; thumbnails: RobloxImage[] }
type DataResponse<T> = { data: T[] }

async function getJson<T>(url: string): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url, { headers: { accept: 'application/json' } })
    if (response.ok) return (await response.json()) as T
    const retryable = response.status === 429 || response.status >= 500
    if (!retryable || attempt >= 4) throw new Error(`${response.status} ${response.statusText} — ${url}`)
    await new Promise((resolve) => setTimeout(resolve, attempt * 2500))
  }
}

async function optional<T>(request: Promise<T>, fallback: T): Promise<T> {
  try {
    return await request
  } catch (error) {
    console.warn(`Skipping optional data: ${(error as Error).message}`)
    return fallback
  }
}

const approvedUrl = (image?: RobloxImage) => (image?.state === 'Completed' && image.imageUrl ? image.imageUrl : undefined)

function chunks<T>(items: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < items.length; i += size) result.push(items.slice(i, i + size))
  return result
}

async function getBatched<T>(ids: number[], buildUrl: (ids: string) => string): Promise<T[]> {
  const results: T[] = []
  for (const batch of chunks(ids, batchSize)) {
    const response = await getJson<DataResponse<T>>(buildUrl(batch.join(',')))
    results.push(...response.data)
  }
  return results
}

async function readExisting(): Promise<StatsFile> {
  try {
    return JSON.parse(await readFile(outputPath, 'utf8')) as StatsFile
  } catch {
    return { updatedAt: '', games: {} }
  }
}

async function resolveUniverseIds(existing: StatsFile): Promise<Map<number, number>> {
  const universeByPlace = new Map<number, number>()
  for (const { placeId } of games) {
    const cached = existing.games[placeId]?.universeId
    if (cached) {
      universeByPlace.set(placeId, cached)
      continue
    }
    const { universeId } = await getJson<{ universeId: number | null }>(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
    )
    if (universeId) universeByPlace.set(placeId, universeId)
    else console.warn(`No universe found for place ${placeId}`)
  }
  return universeByPlace
}

function upsertHistory(history: DailyPoint[], date: string, playing: number, visits: number): DailyPoint[] {
  const today = history.find((point) => point.date === date)
  const others = history.filter((point) => point.date !== date)
  return [...others, { date, peak: Math.max(today?.peak ?? 0, playing), visits }]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-historyDays)
}

async function main() {
  const now = new Date().toISOString()
  const today = now.slice(0, 10)
  const existing = await readExisting()
  const universeByPlace = await resolveUniverseIds(existing)
  const universeIds = [...new Set(universeByPlace.values())]

  const details = await getBatched<RobloxGame>(universeIds, (ids) => `https://games.roblox.com/v1/games?universeIds=${ids}`)
  const votes = await optional(
    getBatched<RobloxVotes>(universeIds, (ids) => `https://games.roblox.com/v1/games/votes?universeIds=${ids}`),
    [],
  )
  const icons = await optional(
    getBatched<RobloxImage>(
      universeIds,
      (ids) => `https://thumbnails.roblox.com/v1/games/icons?universeIds=${ids}&size=512x512&format=Png&isCircular=false`,
    ),
    [],
  )
  const thumbnails = await optional(
    getBatched<RobloxGameThumbnails>(
      universeIds,
      (ids) =>
        `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${ids}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`,
    ),
    [],
  )
  const avatar = site.robloxUserId
    ? await optional(
        getJson<DataResponse<RobloxImage>>(
          `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${site.robloxUserId}&size=420x420&format=Png&isCircular=false`,
        ),
        { data: [] },
      )
    : { data: [] }

  const detailById = new Map(details.map((game) => [game.id, game]))
  const votesById = new Map(votes.map((vote) => [vote.id, vote]))
  const iconById = new Map(icons.map((icon) => [icon.targetId, approvedUrl(icon)]))
  const thumbnailById = new Map(thumbnails.map((entry) => [entry.universeId, approvedUrl(entry.thumbnails[0])]))

  const nextGames: Record<string, GameStats> = {}
  for (const [placeId, universeId] of universeByPlace) {
    const previous = existing.games[placeId]
    const game = detailById.get(universeId)
    if (!game) {
      if (previous) nextGames[placeId] = previous
      continue
    }
    const playing = game.playing ?? 0
    const isNewPeak = playing > (previous?.peakCcu ?? 0)
    const vote = votesById.get(universeId)
    nextGames[placeId] = {
      universeId,
      name: game.name,
      creator: game.creator.name,
      playing,
      visits: game.visits,
      favorites: game.favoritedCount,
      upVotes: vote?.upVotes ?? previous?.upVotes ?? 0,
      downVotes: vote?.downVotes ?? previous?.downVotes ?? 0,
      created: game.created,
      updated: game.updated,
      iconUrl: iconById.has(universeId) ? iconById.get(universeId) : previous?.iconUrl,
      thumbnailUrl: thumbnailById.has(universeId) ? thumbnailById.get(universeId) : previous?.thumbnailUrl,
      peakCcu: isNewPeak ? playing : (previous?.peakCcu ?? 0),
      peakCcuAt: isNewPeak ? now : (previous?.peakCcuAt ?? now),
      history: upsertHistory(previous?.history ?? [], today, playing, game.visits),
    }
  }

  const stats: StatsFile = {
    updatedAt: now,
    avatarUrl: site.robloxUserId ? (avatar.data[0]?.imageUrl ?? existing.avatarUrl) : undefined,
    games: nextGames,
  }

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(stats, null, 2)}\n`)

  const playingNow = Object.values(nextGames).reduce((sum, game) => sum + game.playing, 0)
  console.log(`Wrote ${Object.keys(nextGames).length} games to ${outputPath} — ${playingNow.toLocaleString()} playing now`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
