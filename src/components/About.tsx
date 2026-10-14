import { BarChart3, Code2, Gamepad2, Users } from 'lucide-react'
import { site, type Service } from '../config/site'
import { Reveal, SectionHeading } from './ui'

const serviceIcons: Record<Service['icon'], typeof Code2> = {
  code: Code2,
  gamepad: Gamepad2,
  chart: BarChart3,
  users: Users,
}

export function About() {
  return (
    <section id="about" className="mx-auto grid max-w-6xl gap-14 px-5 py-28 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <SectionHeading eyebrow="About" title="What I bring to a project" />
        <Reveal delay={0.1} className="-mt-4 space-y-4 text-lg leading-relaxed text-zinc-400">
          {site.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
          {site.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-line bg-panel px-3 py-1 text-sm text-zinc-300">
              {skill}
            </span>
          ))}
        </Reveal>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {site.services.map((service, i) => {
          const Icon = serviceIcons[service.icon]
          return (
            <Reveal key={service.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-zinc-700">
                <div className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-ink">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{service.description}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
