import { brands } from '../config/partners'
import { formatCompact, formatFull } from '../lib/format'
import type { Totals } from '../lib/useStats'
import { CountUp, Reveal } from './ui'

export function StatsBand({ totals }: { totals: Totals }) {
  const cells = [
    { label: 'Total visits', value: totals.visits, format: (v: number) => `${formatCompact(v)}+` },
    { label: 'Favorites', value: totals.favorites, format: (v: number) => `${formatCompact(v)}+` },
    { label: 'Games worked on', value: totals.count, format: formatFull },
    { label: 'Brand partners', value: brands.length, format: formatFull },
  ]

  return (
    <section className="studs border-y border-line bg-panel">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {cells.map((cell, i) => (
          <div
            key={cell.label}
            className={`border-line px-5 py-9 sm:px-8 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${
              i === 2 ? 'lg:border-l' : ''
            }`}
          >
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{cell.label}</p>
            <p className="mt-3 font-display text-3xl font-black tracking-tight text-cream tabular-nums sm:text-5xl">
              <CountUp value={cell.value} format={cell.format} />
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
