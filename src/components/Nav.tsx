import { useEffect, useState } from 'react'
import { site } from '../config/site'

const links = [
  { label: 'Games', href: '#games' },
  { label: 'Partners', href: '#partners' },
  { label: 'Experience', href: '#experience' },
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
        scrolled ? 'border-line bg-ink/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="size-3.5 rotate-12 bg-volt transition-transform duration-300 group-hover:rotate-[102deg]" />
          <span className="font-display text-lg font-black tracking-tight text-cream uppercase">{site.name}</span>
        </a>
        <div className="hidden items-center gap-8 font-mono text-xs tracking-[0.15em] text-muted uppercase md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-volt">
              {link.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="brick border-2 border-ink bg-volt px-4 py-1.5 text-sm font-bold text-ink">
          Get in touch
        </a>
      </nav>
    </header>
  )
}
