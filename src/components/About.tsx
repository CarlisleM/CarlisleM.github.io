import { site } from '../config/site'
import { Reveal, SectionHeading } from './ui'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 pt-32">
      <SectionHeading index="05" eyebrow="About" title="What I do." />
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-cream/80">
          {site.bio.slice(1).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="flex flex-wrap gap-2 pt-3">
            {site.skills.map((skill) => (
              <span key={skill} className="border-2 border-line px-2.5 py-1 font-mono text-xs tracking-wider text-muted uppercase">
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="border-t-2 border-line">
          {site.services.map((service, i) => (
            <div key={service.title} className="group grid grid-cols-[3rem_1fr] gap-x-4 border-b-2 border-line py-6">
              <span className="font-mono text-sm text-volt">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-xl font-bold text-cream">{service.title}</h3>
                <p className="mt-2 text-muted">{service.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
