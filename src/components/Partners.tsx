import { ArrowUpRight } from 'lucide-react'
import { brands, creatorCollab, type Partner } from '../config/partners'
import { formatCompact } from '../lib/format'
import type { GameView } from '../lib/useStats'
import { GameArt, Reveal, SectionHeading } from './ui'

export function Partners({ views }: { views: GameView[] }) {
  const byPlace = new Map(views.map((view) => [view.placeId, view]))
  const collabGames = creatorCollab.placeIds.map((id) => byPlace.get(id)).filter((view): view is GameView => !!view)

  return (
    <section id="partners" className="mx-auto max-w-6xl px-5 pt-32">
      <SectionHeading index="03" eyebrow="Partners" title="Brands & creators I’ve built with." />

      <Reveal className="grid grid-cols-2 border-t-2 border-l-2 border-line md:grid-cols-5">
        {brands.map((brand, i) => (
          <BrandTile key={brand.name} brand={brand} index={i} game={brand.placeId ? byPlace.get(brand.placeId) : undefined} />
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div className="studs grid gap-8 border-2 border-cream bg-panel p-6 shadow-[10px_10px_0_0_var(--color-volt)] sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-volt uppercase">Creator collabs · Misfits IP</p>
            <h3 className="mt-4 font-display text-3xl leading-tight font-black tracking-tight text-cream sm:text-4xl">
              {creatorCollab.creators.map((creator, i) => (
                <span key={creator} className="whitespace-nowrap">
                  {i > 0 && <span className="text-volt"> × </span>}
                  {creator}
                </span>
              ))}
            </h3>
            <p className="mt-4 max-w-md text-muted">{creatorCollab.summary}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {collabGames.map((view) => (
              <a
                key={view.placeId}
                href={view.url}
                target="_blank"
                rel="noreferrer"
                className="group border-2 border-line bg-ink transition-[translate,box-shadow,border-color] hover:-translate-y-1 hover:border-cream hover:shadow-[5px_5px_0_0_var(--color-cream)]"
              >
                <div className="aspect-video overflow-hidden bg-raised">
                  <GameArt view={view} />
                </div>
                <div className="p-3">
                  <span className="block truncate font-display text-sm font-bold text-cream">{view.title}</span>
                  <span className="mt-1 block font-mono text-[11px] text-muted">
                    {view.stats ? `${formatCompact(view.stats.visits)} visits` : ''}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function BrandTile({ brand, index, game }: { brand: Partner; index: number; game?: GameView }) {
  const content = (
    <>
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-widest text-muted transition-colors group-hover:text-ink/60">
          {String(index + 1).padStart(2, '0')}
        </span>
        {game?.stats?.iconUrl ? (
          <img src={game.stats.iconUrl} alt="" className="size-9 border-2 border-line transition-colors group-hover:border-ink" />
        ) : (
          <span className="size-2.5 rotate-12 bg-line transition-colors group-hover:bg-ink" />
        )}
      </div>
      <div>
        <p className="font-display text-lg leading-tight font-bold text-cream transition-colors group-hover:text-ink sm:text-xl">{brand.name}</p>
        <p className="mt-2 flex items-center gap-1 font-mono text-[10px] tracking-widest text-muted uppercase transition-colors group-hover:text-ink/70">
          {brand.work}
          {game && <ArrowUpRight className="size-3" />}
        </p>
      </div>
    </>
  )

  const className =
    'group flex min-h-40 flex-col justify-between border-r-2 border-b-2 border-line bg-panel p-5 transition-colors duration-200 hover:bg-volt'

  return game ? (
    <a href={game.url} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}
