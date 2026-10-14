import { games } from '../config/games'
import { formatCompact, formatFull } from '../lib/format'
import type { Totals } from '../lib/useStats'
import { CountUp, Reveal } from './ui'

const recordCcu = Math.max(0, ...games.map((game) => game.spotlight?.peakCcu ?? 0))

export function StatsBand({ totals }: { totals: Totals }) {
  const cells = [
    { label: 'Total visits', value: totals.visits, format: (v: number) => `${formatCompact(v)}+` },
    { label: 'Record CCU', value: recordCcu, format: formatCompact },
    { label: 'Playing right now', value: totals.playing, format: formatCompact },
    { label: 'Games worked on', value: totals.count, format: formatFull },
  ]

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {cells.map((cell) => (
          <div key={cell.label} className="bg-panel px-5 py-7 sm:px-8 sm:py-8">
            <p className="font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-5xl">
              <CountUp value={cell.value} format={cell.format} />
            </p>
            <p className="mt-2 text-sm text-zinc-500">{cell.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
