import { ArrowUpRight } from 'lucide-react'
import { site } from '../config/site'
import { timeAgo } from '../lib/format'
import { Reveal, SocialIcon } from './ui'

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-panel px-6 py-16 text-center sm:px-12 sm:py-20">
        <div aria-hidden className="absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
        <p className="relative font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">Contact</p>
        <h2 className="relative mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance text-white sm:text-6xl">
          Got a game that needs building?
        </h2>
        <p className="relative mx-auto mt-5 max-w-lg text-lg text-zinc-400">
          Commissions, partnerships and brand experiences. Discord is the fastest way to reach me.
        </p>
        <div className="relative mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {site.socials.map((social) => (
            <a
              key={social.kind}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-line bg-ink/60 p-4 text-left transition hover:border-accent/50"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-raised text-zinc-300 transition group-hover:bg-accent group-hover:text-ink">
                <SocialIcon kind={social.kind} />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-white">{social.label}</span>
                <span className="block text-sm text-zinc-500">{social.handle}</span>
              </span>
              <ArrowUpRight className="size-5 text-zinc-600 transition group-hover:text-accent" />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export function Footer({ updatedAt, failed }: { updatedAt?: string; failed: boolean }) {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-10 text-sm text-zinc-600 sm:flex-row">
      <p>
        © {new Date().getFullYear()} {site.name}. Not affiliated with Roblox Corporation.
      </p>
      <p className="font-mono text-xs">
        {failed ? 'Stats unavailable' : updatedAt ? `Stats updated ${timeAgo(updatedAt)}` : 'Loading stats…'}
      </p>
    </footer>
  )
}
