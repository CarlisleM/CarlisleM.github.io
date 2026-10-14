import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useState } from 'react'
import type { Ownership } from '../config/games'
import { formatCompact, formatRating } from '../lib/format'
import type { GameView } from '../lib/useStats'
import { LiveDot, SectionHeading, easeOut } from './ui'

type Filter = 'all' | Ownership

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'contributed', label: 'Worked on' },
  { id: 'brand', label: 'Brand' },
  { id: 'owned', label: 'Mine' },
]

const ownershipBadge: Record<Ownership, string> = {
  owned: 'My game',
  contributed: 'Worked on',
  brand: 'Brand',
}

const collapsedCount = 9

export function Games({ views }: { views: GameView[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [expanded, setExpanded] = useState(false)
  const matching = views
    .filter((view) => filter === 'all' || view.ownership === filter)
    .sort((a, b) => (b.stats?.visits ?? 0) - (a.stats?.visits ?? 0))
  const shown = expanded ? matching : matching.slice(0, collapsedCount)

  const filterBar = (
    <div className="flex self-start border-2 border-line md:self-auto">
      {filters.map((option) => (
        <button
          key={option.id}
          onClick={() => setFilter(option.id)}
          className={`relative px-3.5 py-2 font-mono text-xs tracking-widest uppercase transition-colors not-first:border-l-2 not-first:border-line sm:px-4 ${
            filter === option.id ? 'text-ink' : 'text-muted hover:text-cream'
          }`}
        >
          {filter === option.id && (
            <motion.span layoutId="filter-pill" className="absolute inset-0 bg-volt" transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }} />
          )}
          <span className="relative">{option.label}</span>
        </button>
      ))}
    </div>
  )

  return (
    <section id="games" className="mx-auto max-w-6xl px-5 pt-28">
      <SectionHeading index="02" eyebrow="Games" title="Games I’ve worked on." aside={filterBar}>
        Live numbers pulled straight from Roblox every 30 minutes.
      </SectionHeading>
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((view, index) => (
            <GameCard key={view.placeId} view={view} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
      {matching.length > collapsedCount && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setExpanded((value) => !value)}
            className="brick inline-flex items-center gap-2 border-2 border-cream bg-ink px-6 py-3 font-mono text-sm font-semibold tracking-wider text-cream uppercase"
          >
            {expanded ? 'Show fewer' : `Show all ${matching.length}`}
            <Plus className={`size-4 transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`} />
          </button>
        </div>
      )}
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
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.04, ease: easeOut }}
      className="group flex flex-col border-2 border-line bg-panel transition-[translate,box-shadow,border-color] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:border-cream hover:shadow-[6px_6px_0_0_var(--color-volt)]"
    >
      <div className="relative aspect-video overflow-hidden border-b-2 border-line bg-raised transition-colors group-hover:border-cream">
        {stats?.thumbnailUrl ? (
          <img
            src={stats.thumbnailUrl}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="studs grid size-full place-items-center font-display text-xl font-bold text-muted">{view.title}</div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-ink px-2 py-1 font-mono text-[10px] font-semibold tracking-widest text-cream uppercase">
            {ownershipBadge[view.ownership]}
          </span>
          {view.misfitsIp && (
            <span className="bg-volt px-2 py-1 font-mono text-[10px] font-semibold tracking-widest text-ink uppercase">Misfits IP</span>
          )}
        </div>
        {stats && (
          <span className="absolute right-3 bottom-3 flex items-center gap-2 bg-ink/90 px-2 py-1 font-mono text-[11px] text-cream">
            <LiveDot active={playing > 0} />
            {formatCompact(playing)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-3">
          <div className="size-11 shrink-0 overflow-hidden border-2 border-line bg-raised">
            {stats?.iconUrl && <img src={stats.iconUrl} alt="" loading="lazy" className="size-full object-cover" />}
          </div>
          <h3 className="min-w-0 flex-1 truncate font-display text-base font-bold text-cream">{view.title}</h3>
          <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:text-volt" />
        </div>
        {view.blurb && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{view.blurb}</p>}
        <dl className="mt-4 grid grid-cols-3 border-t-2 border-line pt-3">
          <Stat label="Visits" value={stats ? formatCompact(stats.visits) : '—'} />
          <Stat label="Favs" value={stats ? formatCompact(stats.favorites) : '—'} />
          <Stat label="Rating" value={stats ? formatRating(stats.upVotes, stats.downVotes) : '—'} />
        </dl>
      </div>
    </motion.a>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] tracking-widest text-muted uppercase">{label}</dt>
      <dd className="mt-0.5 font-mono text-sm font-semibold text-cream tabular-nums">{value}</dd>
    </div>
  )
}
