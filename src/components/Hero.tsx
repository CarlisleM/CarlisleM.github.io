import { motion } from 'motion/react'
import { ArrowDown, Plane } from 'lucide-react'
import { site } from '../config/site'
import { formatCompact } from '../lib/format'
import type { GameView, Totals } from '../lib/useStats'
import { LiveDot, Odometer, easeOut } from './ui'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: easeOut },
})

type HeroProps = {
  views: GameView[]
  totals: Totals
  avatarUrl?: string
}

export function Hero({ views, totals, avatarUrl }: HeroProps) {
  const record = views.find((view) => view.spotlight)

  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-24 pb-16 sm:pt-28">
      <motion.div
        {...rise(0)}
        className="flex items-center justify-between gap-4 border-y border-line py-3 font-mono text-[11px] tracking-[0.18em] text-muted uppercase"
      >
        <span>Carlisle “Kami” Miller</span>
        <span className="hidden md:inline">
          {site.role} —{' '}
          <a href={site.company.href} target="_blank" rel="noreferrer" className="text-cream transition hover:text-volt">
            {site.company.name}
          </a>
        </span>
        <span className="flex items-center gap-2 text-cream">
          BNE <Plane className="size-3.5 text-volt" /> LAX
        </span>
      </motion.div>

      <div className="mt-14 sm:mt-20">
        <motion.p {...rise(0.05)} className="mb-6 flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-muted uppercase">
          <LiveDot /> Live from Roblox
        </motion.p>
        <motion.h1 {...rise(0.1)} className="font-display font-black tracking-tight">
          <Odometer value={totals.playing} className="text-[clamp(2.9rem,11.5vw,9rem)] text-volt" />
          <span className="mt-6 block max-w-4xl text-[clamp(1.5rem,3.6vw,2.9rem)] leading-[1.08] font-bold text-cream">
            people are playing games I’ve engineered.{' '}
            <span className="relative ml-[0.15em] inline-block text-ink">
              <span className="absolute inset-x-[-0.15em] inset-y-[0.08em] -rotate-1 bg-cream" />
              <span className="relative">Right now.</span>
            </span>
          </span>
        </motion.h1>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <motion.div {...rise(0.25)} className="flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-start">
          <div className="size-20 shrink-0 border-2 border-cream bg-raised shadow-[4px_4px_0_0_var(--color-volt)]">
            {avatarUrl && <img src={avatarUrl} alt={site.name} className="size-full object-cover" />}
          </div>
          <div>
            <p className="text-lg leading-relaxed text-cream/80">{site.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#games" className="brick inline-flex items-center gap-2 border-2 border-ink bg-volt px-5 py-2.5 font-bold text-ink">
                See the games <ArrowDown className="size-4" />
              </a>
              <a href="#experience" className="brick inline-flex items-center border-2 border-cream bg-ink px-5 py-2.5 font-bold text-cream">
                Experience
              </a>
            </div>
          </div>
        </motion.div>

        {record?.spotlight && (
          <motion.a
            href="#spotlight"
            initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
            animate={{ opacity: 1, rotate: -3, scale: 1 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.45 }}
            className="block w-full max-w-sm justify-self-start border-2 border-ink bg-volt p-6 text-ink shadow-[8px_8px_0_0_var(--color-cream)] lg:justify-self-end"
          >
            <p className="flex items-center justify-between font-mono text-[11px] font-semibold tracking-[0.18em] uppercase">
              <span>All-time record</span>
              <span>{record.title}</span>
            </p>
            <p className="mt-3 font-display text-7xl leading-none font-black tracking-tight">
              {formatCompact(record.spotlight.peakCcu)}
            </p>
            <p className="mt-2 text-lg font-bold">concurrent players</p>
            <p className="mt-3 border-t-2 border-ink/80 pt-3 text-sm font-medium">{record.spotlight.note}</p>
          </motion.a>
        )}
      </div>
    </section>
  )
}
