import { ArrowUpRight } from 'lucide-react'
import { formatCompact, formatRating } from '../lib/format'
import type { GameView } from '../lib/useStats'
import { CountUp, GameArt, LiveDot, Reveal, SectionHeading } from './ui'

export function Spotlight({ views }: { views: GameView[] }) {
  const featured = views.filter((view) => view.spotlight)
  if (featured.length === 0) return null

  return (
    <section id="spotlight" className="mx-auto max-w-6xl px-5 pt-24">
      <SectionHeading index="01" eyebrow="Spotlight" title="One for the history books." />
      <div className="space-y-10">
        {featured.map((view) => (
          <SpotlightCard key={view.placeId} view={view} />
        ))}
      </div>
    </section>
  )
}

function SpotlightCard({ view }: { view: GameView }) {
  const { stats, spotlight } = view
  if (!spotlight) return null

  return (
    <Reveal>
      <div className="grid border-2 border-cream bg-panel shadow-[10px_10px_0_0_var(--color-volt)] lg:grid-cols-[1.15fr_0.85fr]">
        <a href={view.url} target="_blank" rel="noreferrer" className="group relative block aspect-video overflow-hidden bg-raised lg:aspect-auto lg:min-h-[440px]">
          <div className="absolute inset-0">
            <GameArt view={view} className="transition-transform duration-700 group-hover:scale-105" />
          </div>
          <span className="absolute top-4 left-4 flex items-center gap-2 border-2 border-ink bg-cream px-3 py-1 font-mono text-xs font-semibold text-ink">
            <LiveDot active={(stats?.playing ?? 0) > 0} />
            {formatCompact(stats?.playing ?? 0)} playing now
          </span>
        </a>
        <div className="flex flex-col justify-center border-t-2 border-cream p-7 sm:p-10 lg:border-t-0 lg:border-l-2">
          <div className="flex items-center gap-3">
            {stats?.iconUrl && <img src={stats.iconUrl} alt="" className="size-12 border-2 border-cream" />}
            <h3 className="font-display text-2xl font-bold tracking-tight text-cream sm:text-3xl">{view.title}</h3>
          </div>
          <p className="mt-8 font-display text-7xl leading-none font-black tracking-tight text-volt tabular-nums sm:text-8xl">
            <CountUp value={spotlight.peakCcu} format={formatCompact} />
          </p>
          <p className="mt-3 text-lg font-bold text-cream">peak concurrent players</p>
          <p className="mt-1 text-muted">{spotlight.note}</p>
          <dl className="mt-8 grid grid-cols-3 border-2 border-line text-center">
            <Metric label="Visits" value={stats ? formatCompact(stats.visits) : '—'} />
            <Metric label="Favorites" value={stats ? formatCompact(stats.favorites) : '—'} />
            <Metric label="Rating" value={stats ? formatRating(stats.upVotes, stats.downVotes) : '—'} />
          </dl>
          <a
            href={view.url}
            target="_blank"
            rel="noreferrer"
            className="brick mt-8 inline-flex items-center gap-2 self-start border-2 border-ink bg-volt px-5 py-2.5 text-sm font-bold text-ink"
          >
            Play on Roblox <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-line px-2 py-3 not-first:border-l-2">
      <dd className="font-mono text-base font-semibold text-cream tabular-nums">{value}</dd>
      <dt className="mt-0.5 font-mono text-[10px] tracking-widest text-muted uppercase">{label}</dt>
    </div>
  )
}
