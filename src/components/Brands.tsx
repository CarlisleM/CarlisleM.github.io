import { brands, type Brand } from '../config/brands'
import { Reveal } from './ui'

export function Brands() {
  const loop = [...brands, ...brands, ...brands, ...brands]

  return (
    <section id="brands" className="border-y border-line bg-panel/40 py-16">
      <Reveal>
        <p className="mb-10 text-center font-mono text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
          Brands & studios I’ve worked with
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
            {loop.map((brand, i) => (
              <BrandMark key={`${brand.name}-${i}`} brand={brand} hidden={i >= brands.length} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function BrandMark({ brand, hidden }: { brand: Brand; hidden: boolean }) {
  const content = brand.logo ? (
    <img src={brand.logo} alt={brand.name} className="h-9 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
  ) : (
    <span className="font-display text-2xl font-bold whitespace-nowrap text-zinc-600 transition-colors hover:text-white">{brand.name}</span>
  )

  return (
    <div className="px-10" aria-hidden={hidden || undefined}>
      {brand.href ? (
        <a href={brand.href} target="_blank" rel="noreferrer" tabIndex={hidden ? -1 : undefined}>
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  )
}
