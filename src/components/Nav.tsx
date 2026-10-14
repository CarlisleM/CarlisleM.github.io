import { useEffect, useState } from 'react'
import { site } from '../config/site'

const links = [
  { label: 'Games', href: '#games' },
  { label: 'Brands', href: '#brands' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-line/80 bg-ink/70 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-white">
          {site.name}
          <span className="text-accent">.</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-accent"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}
