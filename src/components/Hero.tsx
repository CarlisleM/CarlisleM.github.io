import { motion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { site } from '../config/site'
import { formatCompact, formatFull, timeAgo } from '../lib/format'
import type { GameView, Totals } from '../lib/useStats'
import { CountUp, LiveDot, SocialIcon, SocialLink } from './ui'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
})

type HeroProps = {
  views: GameView[]
  totals: Totals
  avatarUrl?: string
  updatedAt?: string
}

export function Hero({ views, totals, avatarUrl, updatedAt }: HeroProps) {
  const [lead, highlight, tail] = site.headline

  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-14 px-5 pt-32 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:pt-44">
      <div>
        <motion.div
          {...rise(0)}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/80 px-3.5 py-1.5 text-xs text-zinc-400"
        >
          <LiveDot />
          {totals.playing ? `${formatCompact(totals.playing)} players in games I’ve worked on right now` : 'Loading live players…'}
        </motion.div>
        <motion.h1
          {...rise(0.08)}
          className="font-display text-5xl leading-[0.95] font-bold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
        >
          {lead}{' '}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">{highlight}</span> {tail}
        </motion.h1>
        <motion.p {...rise(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          {site.tagline}
        </motion.p>
        <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap gap-3">
          <a
            href="#games"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-ink transition hover:brightness-110"
          >
            See my games
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-line bg-panel px-6 py-3 font-semibold text-white transition hover:border-zinc-600"
          >
            Get in touch
          </a>
        </motion.div>
        <motion.div {...rise(0.32)} className="mt-10 flex items-center gap-4">
          <div className="grid size-12 place-items-center overflow-hidden rounded-full border border-line bg-raised font-display text-lg font-bold text-accent">
            {avatarUrl ? <img src={avatarUrl} alt="" className="size-full object-cover" /> : site.name[0]}
          </div>
          <div className="text-sm">
            <p className="font-semibold text-white">
              {site.name} <span className="font-normal text-zinc-500">· {site.fullName}</span>
            </p>
            <p className="text-zinc-500">
              {site.role} at{' '}
              <a href={site.company.href} target="_blank" rel="noreferrer" className="text-zinc-300 transition hover:text-accent">
                {site.company.name}
              </a>{' '}
              · {site.location}
            </p>
          </div>
          <div className="ml-2 hidden gap-1 sm:flex">
            {site.socials.map((social) => (
              <SocialLink
                key={social.kind}
                social={social}
                className="grid size-9 place-items-center rounded-full text-zinc-500 transition hover:bg-raised hover:text-white"
              >
                {(copied) => (copied ? <Check className="size-4 text-accent" /> : <SocialIcon kind={social.kind} className="size-4" />)}
              </SocialLink>
            ))}
          </div>
        </motion.div>
      </div>
      <LivePanel views={views} totals={totals} updatedAt={updatedAt} />
    </section>
  )
}

function LivePanel({ views, totals, updatedAt }: { views: GameView[]; totals: Totals; updatedAt?: string }) {
  const ranked = views
    .filter((view) => view.stats)
    .sort((a, b) => b.stats!.playing - a.stats!.playing)
    .slice(0, 5)
  const top = ranked[0]?.stats?.playing || 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-accent/40 via-line to-transparent" />
      <div className="relative rounded-3xl bg-panel/95 p-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-zinc-400 uppercase">
            <LiveDot /> Playing now
          </p>
          <p className="font-mono text-xs text-zinc-600">{updatedAt ? timeAgo(updatedAt) : 'loading'}</p>
        </div>
        <p className="mt-3 font-display text-5xl font-bold tracking-tight text-white tabular-nums">
          <CountUp value={totals.playing} format={formatFull} />
        </p>
        <p className="text-sm text-zinc-500">players across {totals.count} games</p>
        <ul className="mt-6 space-y-4">
          {ranked.map((view) => (
            <li key={view.placeId} className="flex items-center gap-3">
              <div className="size-9 shrink-0 overflow-hidden rounded-lg bg-raised">
                {view.stats?.iconUrl && <img src={view.stats.iconUrl} alt="" className="size-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate text-zinc-300">{view.title}</span>
                  <span className="font-mono text-xs text-white tabular-nums">{formatCompact(view.stats!.playing)}</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-raised">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(4, (view.stats!.playing / top) * 100)}%` }}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </li>
          ))}
          {ranked.length === 0 &&
            Array.from({ length: 4 }, (_, i) => <li key={i} className="h-9 animate-pulse rounded-lg bg-raised" />)}
        </ul>
      </div>
    </motion.div>
  )
}
