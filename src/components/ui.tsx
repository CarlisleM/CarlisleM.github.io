import { animate, motion, useInView } from 'motion/react'
import { Mail } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { SocialKind } from '../config/site'

export function LiveDot({ active = true }: { active?: boolean }) {
  return (
    <span className="relative flex size-2">
      {active && <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-accent opacity-75" />}
      <span className={`relative inline-flex size-2 rounded-full ${active ? 'bg-accent' : 'bg-zinc-600'}`} />
    </span>
  )
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-zinc-400">{children}</p>}
    </Reveal>
  )
}

export function CountUp({ value, format }: { value: number; format: (value: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const shown = useRef(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(shown.current, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        shown.current = latest
        setDisplay(latest)
      },
    })
    return () => controls.stop()
  }, [inView, value])

  return <span ref={ref}>{format(display)}</span>
}

const brandPaths: Record<Exclude<SocialKind, 'email'>, string> = {
  discord:
    'M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.1 14.1 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.099.246.198.373.292a.077.077 0 0 1-.007.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z',
  x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z',
  roblox: 'M5.164 0 .16 18.928 18.836 24 23.84 5.072zm8.747 15.354-5.219-1.417 1.399-5.29 5.22 1.418z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
}

export function SocialIcon({ kind, className = 'size-5' }: { kind: SocialKind; className?: string }) {
  if (kind === 'email') return <Mail className={className} />
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d={brandPaths[kind]} />
    </svg>
  )
}
