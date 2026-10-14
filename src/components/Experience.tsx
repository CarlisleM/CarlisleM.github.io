import { ArrowUpRight, Download } from 'lucide-react'
import type { ReactNode } from 'react'
import { site, type Academic, type Experience as Job } from '../config/site'
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
        From AR iPad games and arcade cabinets to Roblox games played by millions.
      </SectionHeading>

      <Reveal className="border-t-2 border-line">
        {site.experience.map((job) => (
          <JobRow key={job.company} job={job} />
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-12 grid gap-px border-2 border-line bg-line sm:grid-cols-2">
        {site.academics.map((item) => (
          <AcademicTile key={item.title} item={item} />
        ))}
      </Reveal>
    </section>
  )
}

function Row({ href, children }: { href?: string; children: ReactNode }) {
  const className = 'group grid gap-3 border-b-2 border-line py-7 md:grid-cols-[11rem_1fr_auto] md:gap-8'
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  )
}

function JobRow({ job }: { job: Job }) {
  return (
    <Row href={job.href}>
      <div className="font-mono text-xs tracking-widest uppercase">
        <p className="text-cream">{job.period}</p>
        <p className="mt-1 text-muted">{job.location}</p>
      </div>
      <div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-cream transition-colors group-hover:text-volt sm:text-3xl">
          {job.company}
        </h3>
        <p className="mt-1 font-mono text-sm text-volt">{job.role}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{job.summary}</p>
      </div>
      <div className="flex items-start gap-3">
        {job.roblox && <span className="bg-volt px-2 py-1 font-mono text-[10px] font-semibold tracking-widest text-ink uppercase">Roblox</span>}
        {job.href && <ArrowUpRight className="size-5 text-muted transition group-hover:text-volt" />}
      </div>
    </Row>
  )
}

function AcademicTile({ item }: { item: Academic }) {
  const content = (
    <>
      <p className="font-mono text-[11px] tracking-[0.2em] text-volt uppercase">{item.kind}</p>
      <p className="mt-3 font-display text-xl font-bold text-cream">{item.title}</p>
      {item.detail && <p className="mt-1 font-mono text-xs tracking-wider text-muted uppercase">{item.detail}</p>}
    </>
  )
  const className = 'studs block bg-panel p-6'
  return item.href ? (
    <a href={item.href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}
