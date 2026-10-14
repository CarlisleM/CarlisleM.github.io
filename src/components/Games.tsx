import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import type { Ownership } from '../config/games'
import { formatCompact, formatRating } from '../lib/format'
import type { DailyPoint } from '../lib/stats-types'
import type { GameView } from '../lib/useStats'
import { LiveDot, SectionHeading } from './ui'

type Filter = 'all' | Ownership

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'owned', label: 'My games' },
  { id: 'contributed', label: 'Contributed' },
]

export function Games({ views }: { views: GameView[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const shown = views
    .filter((view) => filter === 'all' || view.ownership === filter)
    .sort((a, b) => (b.stats?.visits ?? 0) - (a.stats?.visits ?? 0))

  return (
    <section id="games" className="mx-auto max-w-6xl px-5 py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Portfolio" title="Games I’ve built & shipped">
          Live numbers pulled straight from Roblox, refreshed automatically.
        </SectionHeading>
        <div className="mb-12 inline-flex self-start rounded-full border border-line bg-panel p-1 md:self-auto">
          {filters.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === option.id ? 'text-ink' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {filter === option.id && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
              )}
              <span className="relative">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((view, index) => (
            <GameCard key={view.placeId} view={view} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

function GameCard({ view, index }: { view: GameView; index: number }) {
  const { stats } = view
  const playing = stats?.playing ?? 0

  return (
    <motion.a
      layout
      href={view.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-zinc-700"
    >
      <div className="relative aspect-video overflow-hidden bg-raised">
        {stats?.thumbnailUrl && (
          <img
            src={stats.thumbnailUrl}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/10 to-transparent" />
        <span className="absolute top-3 left-3 rounded-full border border-white/10 bg-ink/70 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-zinc-200 uppercase backdrop-blur">
          {view.ownership === 'owned' ? 'Owner' : 'Contributor'}
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
          <LiveDot active={playing > 0} />
          {formatCompact(playing)} playing
        </span>
      </div>
      <div className="relative -mt-7 flex flex-1 flex-col px-5 pb-5">
        <div className="flex items-end gap-3">
          <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-raised ring-4 ring-panel">
            {stats?.iconUrl && <img src={stats.iconUrl} alt="" loading="lazy" className="size-full object-cover" />}
          </div>
          <div className="min-w-0 flex-1 pb-0.5">
            <h3 className="truncate font-display text-lg font-bold text-white">{stats?.name ?? 'Loading…'}</h3>
            <p className="truncate text-xs text-zinc-500">{view.role}</p>
          </div>
          <ArrowUpRight className="mb-1 size-5 shrink-0 text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-zinc-400">{view.blurb}</p>
        <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line text-center">
          <Stat label="Visits" value={stats ? formatCompact(stats.visits) : '—'} />
          <Stat label="Peak CCU" value={view.peak ? formatCompact(view.peak) : '—'} />
          <Stat label="Rating" value={stats ? formatRating(stats.upVotes, stats.downVotes) : '—'} />
        </dl>
        {stats && stats.history.length > 1 && <Sparkline points={stats.history} />}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {view.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-raised px-2 py-0.5 text-[11px] text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-panel px-2 py-3">
      <dd className="font-mono text-sm font-bold text-white tabular-nums">{value}</dd>
      <dt className="mt-0.5 text-[11px] text-zinc-500">{label}</dt>
    </div>
  )
}

function Sparkline({ points }: { points: DailyPoint[] }) {
  const width = 300
  const height = 40
  const max = Math.max(...points.map((point) => point.peak), 1)
  const step = width / (points.length - 1)
  const coords = points.map((point, i) => `${(i * step).toFixed(1)},${(height - (point.peak / max) * (height - 4) - 2).toFixed(1)}`)
  const line = `M${coords.join(' L')}`

  return (
    <div className="mt-4">
      <p className="mb-1 text-[11px] text-zinc-600">Daily peak · last {points.length} days</p>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-10 w-full overflow-visible">
        <path d={`${line} L${width},${height} L0,${height} Z`} className="fill-accent/10" />
        <path d={line} fill="none" vectorEffect="non-scaling-stroke" className="stroke-accent" strokeWidth={1.5} />
      </svg>
    </div>
  )
}
