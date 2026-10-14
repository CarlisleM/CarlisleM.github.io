import { ArrowUpRight, Download } from 'lucide-react'
import { site } from '../config/site'
import { Reveal, SectionHeading } from './ui'

export function Experience() {
  const resume = site.resumeUrl && (
    <a
      href={site.resumeUrl}
      target="_blank"
      rel="noreferrer"
      className="brick inline-flex items-center gap-2 self-start border-2 border-ink bg-volt px-5 py-2.5 font-bold text-ink md:self-auto"
    >
      Résumé <Download className="size-4" />
    </a>
  )

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 pt-32">
      <SectionHeading index="04" eyebrow="Experience" title="Roblox and beyond." aside={resume}>
        {site.bio[0]}
      </SectionHeading>

      <Reveal className="border-t-2 border-line">
        {site.experience.map((job) => {
          const row = (
            <>
              <span className="font-mono text-xs tracking-widest text-muted uppercase md:w-40">{job.period ?? (job.roblox ? 'Now' : 'Previously')}</span>
              <span className="flex-1">
                <span className="block font-display text-2xl font-bold tracking-tight text-cream transition-colors group-hover:text-volt sm:text-3xl">
                  {job.company}
                </span>
                {job.summary && <span className="mt-2 block max-w-2xl text-muted">{job.summary}</span>}
              </span>
              {job.role && <span className="font-mono text-sm text-cream/80">{job.role}</span>}
              {job.href && <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:text-volt" />}
            </>
          )
          const className = 'group flex flex-col gap-2 border-b-2 border-line py-6 md:flex-row md:items-center md:gap-8'
          return job.href ? (
            <a key={job.company} href={job.href} target="_blank" rel="noreferrer" className={className}>
              {row}
            </a>
          ) : (
            <div key={job.company} className={className}>
              {row}
            </div>
          )
        })}
        {site.research.map((item) => {
          const row = (
            <>
              <span className="font-mono text-xs tracking-widest text-muted uppercase md:w-40">{item.kind}</span>
              <span className="flex-1 font-display text-2xl font-bold tracking-tight text-cream transition-colors group-hover:text-volt sm:text-3xl">
                {item.title}
              </span>
              {item.href && <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:text-volt" />}
            </>
          )
          const className = 'group flex flex-col gap-2 border-b-2 border-line py-6 md:flex-row md:items-center md:gap-8'
          return item.href ? (
            <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className={className}>
              {row}
            </a>
          ) : (
            <div key={item.title} className={className}>
              {row}
            </div>
          )
        })}
      </Reveal>
    </section>
  )
}
