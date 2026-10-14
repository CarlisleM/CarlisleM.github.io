import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { site } from '../config/site'
import { timeAgo } from '../lib/format'
import { Reveal, SectionHeading, SocialIcon, SocialLink } from './ui'

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pt-32 pb-24">
      <SectionHeading index="06" eyebrow="Contact" title="Let’s talk Roblox.">
        Discord is the fastest way to reach me.
      </SectionHeading>
      <Reveal className="border-t-2 border-line">
        {site.socials.map((social) => (
          <SocialLink
            key={social.kind}
            social={social}
            className="group flex w-full cursor-pointer items-center gap-5 border-b-2 border-line px-2 py-5 text-left transition-colors duration-200 hover:bg-volt sm:px-4"
          >
            {(copied) => (
              <>
                <SocialIcon kind={social.kind} className="size-6 text-muted transition-colors group-hover:text-ink" />
                <span className="flex-1 font-display text-2xl font-bold tracking-tight text-cream transition-colors group-hover:text-ink sm:text-4xl">
                  {social.label}
                </span>
                <span className="hidden font-mono text-sm text-muted transition-colors group-hover:text-ink sm:inline">
                  {copied ? 'Copied!' : social.handle}
                </span>
                {social.copy ? (
                  copied ? (
                    <Check className="size-6 text-ink" />
                  ) : (
                    <Copy className="size-6 text-muted transition-colors group-hover:text-ink" />
                  )
                ) : (
                  <ArrowUpRight className="size-6 text-muted transition group-hover:rotate-45 group-hover:text-ink" />
                )}
              </>
            )}
          </SocialLink>
        ))}
      </Reveal>
    </section>
  )
}

export function Footer({ updatedAt, failed }: { updatedAt?: string; failed: boolean }) {
  return (
    <footer className="border-t-2 border-line">
      <div className="mx-auto max-w-6xl overflow-hidden px-5 pt-12">
        <p className="font-display text-[clamp(4rem,22vw,17rem)] leading-[0.8] font-black tracking-tighter text-panel uppercase select-none">
          {site.name}
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-5 py-6 font-mono text-[11px] tracking-wider text-muted uppercase sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.fullName} · Not affiliated with Roblox
        </p>
        <p>{failed ? 'Stats unavailable' : updatedAt ? `Stats updated ${timeAgo(updatedAt)}` : 'Loading stats…'}</p>
      </div>
    </footer>
  )
}
