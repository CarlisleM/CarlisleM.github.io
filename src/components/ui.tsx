import { animate, motion, useInView } from 'motion/react'
import { Mail } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Social, SocialKind } from '../config/site'
import { formatFull } from '../lib/format'
import type { GameView } from '../lib/useStats'

export const easeOut = [0.16, 1, 0.3, 1] as const

export function LiveDot({ active = true }: { active?: boolean }) {
  return (
    <span className="relative flex size-2">
      {active && <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-signal opacity-75" />}
      <span className={`relative inline-flex size-2 rounded-full ${active ? 'bg-signal' : 'bg-muted/50'}`} />
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
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  aside?: ReactNode
}

export function SectionHeading({ index, eyebrow, title, children, aside }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 border-t border-line pt-5">
      <p className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
        <span>
          <span className="text-volt">[{index}]</span> {eyebrow}
        </span>
        <span className="hidden sm:inline">Kami / {eyebrow}</span>
      </p>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.05] font-bold tracking-tight text-cream sm:text-5xl">{title}</h2>
          {children && <p className="mt-4 text-lg text-muted">{children}</p>}
        </div>
        {aside}
      </div>
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
      ease: easeOut,
      onUpdate: (latest) => {
        shown.current = latest
        setDisplay(latest)
      },
    })
    return () => controls.stop()
  }, [inView, value])

  return <span ref={ref}>{format(display)}</span>
}

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export function Odometer({ value, className = '' }: { value: number; className?: string }) {
  const text = formatFull(value)
  const chars = [...text]

  return (
    <span className={`inline-flex leading-none tabular-nums ${className}`} aria-label={text} role="text">
      {chars.map((char, i) => {
        const key = chars.length - i
        return /\d/.test(char) ? (
          <Digit key={key} digit={Number(char)} />
        ) : (
          <span key={`sep-${key}`} aria-hidden>
            {char}
          </span>
        )
      })}
    </span>
  )
}

function Digit({ digit }: { digit: number }) {
  return (
    <span aria-hidden className="relative inline-block h-[1em] overflow-hidden">
      <span className="invisible">0</span>
      <span
        className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateY(-${digit * 10}%)` }}
      >
        {digits.map((n) => (
          <span key={n} className="h-[1em] text-center">
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}

export function GameArt({ view, className = '' }: { view: GameView; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string>()
  const thumbnail = view.stats?.thumbnailUrl
  const icon = view.stats?.iconUrl

  if (thumbnail && failedSrc !== thumbnail) {
    return <img src={thumbnail} alt="" loading="lazy" onError={() => setFailedSrc(thumbnail)} className={`size-full object-cover ${className}`} />
  }

  return (
    <div className={`studs relative grid size-full place-items-center overflow-hidden bg-raised ${className}`}>
      {icon && <img src={icon} alt="" aria-hidden className="absolute inset-0 size-full scale-125 object-cover opacity-35 blur-2xl" />}
      {icon ? (
        <img src={icon} alt="" className="relative aspect-square w-[34%] -rotate-3 border-2 border-cream shadow-[5px_5px_0_0_var(--color-volt)]" />
      ) : (
        <span className="relative px-6 text-center font-display text-xl font-bold text-muted">{view.title}</span>
      )}
    </div>
  )
}

type SocialLinkProps = {
  social: Social
  className?: string
  children: (copied: boolean) => ReactNode
}

export function SocialLink({ social, className, children }: SocialLinkProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  if (social.copy) {
    const copy = social.copy
    return (
      <button
        type="button"
        className={className}
        aria-label={`Copy ${social.label} username ${copy}`}
        title={`Copy ${copy}`}
        onClick={() => navigator.clipboard.writeText(copy).then(() => setCopied(true))}
      >
        {children(copied)}
      </button>
    )
  }

  return (
    <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className={className}>
      {children(false)}
    </a>
  )
}

const brandPaths: Record<Exclude<SocialKind, 'email'>, string> = {
  discord:
    'M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.1 14.1 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.099.246.198.373.292a.077.077 0 0 1-.007.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z',
  x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z',
  roblox: 'M5.164 0 .16 18.928 18.836 24 23.84 5.072zm8.747 15.354-5.219-1.417 1.399-5.29 5.22 1.418z',
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
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
