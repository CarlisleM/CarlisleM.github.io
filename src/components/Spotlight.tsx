import { ArrowUpRight, Trophy } from 'lucide-react'
import { formatCompact, formatRating } from '../lib/format'
import type { GameView } from '../lib/useStats'
import { CountUp, LiveDot, Reveal } from './ui'

export function Spotlight({ views }: { views: GameView[] }) {
  const featured = views.filter((view) => view.spotlight)

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-5 pb-8">
      {featured.map((view) => (
        <SpotlightCard key={view.placeId} view={view} />
      ))}
    </section>
  )
}

function SpotlightCard({ view }: { view: GameView }) {
  const { stats, spotlight } = view
  if (!spotlight) return null

  return (
    <Reveal>
      <div className="relative">
        <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-accent/60 via-line to-accent-2/40" />
        <div className="relative grid overflow-hidden rounded-[2rem] bg-panel lg:grid-cols-[1.1fr_0.9fr]">
          <a href={view.url} target="_blank" rel="noreferrer" className="group relative block aspect-video overflow-hidden bg-raised lg:aspect-auto lg:min-h-[420px]">
            {stats?.thumbnailUrl && (
              <img
                src={stats.thumbnailUrl}
                alt=""
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-panel/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-panel" />
            <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 px-3 py-1.5 font-mono text-xs text-white backdrop-blur">
              <LiveDot active={(stats?.playing ?? 0) > 0} />
              {formatCompact(stats?.playing ?? 0)} playing now
            </span>
          </a>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
              <Trophy className="size-4" /> Spotlight
            </p>
            <div className="mt-4 flex items-center gap-3">
              {stats?.iconUrl && <img src={stats.iconUrl} alt="" className="size-12 rounded-xl" />}
              <h3 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{view.title}</h3>
            </div>
            <p className="mt-8 bg-gradient-to-r from-accent to-accent-2 bg-clip-text font-display text-7xl leading-none font-bold tracking-tight text-transparent tabular-nums sm:text-8xl">
              <CountUp value={spotlight.peakCcu} format={formatCompact} />
            </p>
            <p className="mt-2 text-lg font-semibold text-white">peak concurrent players</p>
            <p className="mt-1 text-zinc-400">{spotlight.note}</p>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line text-center">
              <Metric label="Visits" value={stats ? formatCompact(stats.visits) : '—'} />
              <Metric label="Favorites" value={stats ? formatCompact(stats.favorites) : '—'} />
              <Metric label="Rating" value={stats ? formatRating(stats.upVotes, stats.downVotes) : '—'} />
            </dl>
            <a
              href={view.url}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent"
            >
              Play on Roblox
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-panel px-2 py-3">
      <dd className="font-mono text-base font-bold text-white tabular-nums">{value}</dd>
      <dt className="mt-0.5 text-[11px] text-zinc-500">{label}</dt>
    </div>
  )
}
