export type Ownership = 'owned' | 'contributed' | 'brand'

export type Spotlight = {
  peakCcu: number
  note: string
}

export type GameEntry = {
  placeId: number
  ownership: Ownership
  name?: string
  blurb?: string
  tags?: string[]
  spotlight?: Spotlight
  misfitsIp?: boolean
}

export const games: GameEntry[] = [
  {
    placeId: 107778070777162,
    ownership: 'contributed',
    spotlight: {
      peakCcu: 14_300_000,
      note: 'The 4th highest concurrent player count in gaming history.',
    },
  },

  { placeId: 119965518619123, ownership: 'owned' },
  { placeId: 77780955683759, ownership: 'owned' },
  { placeId: 108442042267736, ownership: 'owned' },
  { placeId: 124822748780975, ownership: 'owned' },

  { placeId: 105011592530400, ownership: 'contributed' },
  { placeId: 94640181989498, ownership: 'contributed' },
  { placeId: 107646426076756, ownership: 'contributed' },
  { placeId: 136764190843219, ownership: 'contributed' },
  { placeId: 136407404714539, ownership: 'contributed' },
  { placeId: 101949297449238, ownership: 'contributed' },
  { placeId: 123921593837160, ownership: 'contributed' },
  { placeId: 70906625936847, ownership: 'contributed' },
  { placeId: 118614517739521, ownership: 'contributed' },
  { placeId: 94725155944518, ownership: 'contributed' },
  { placeId: 72368345999613, ownership: 'contributed' },
  { placeId: 111856384095496, ownership: 'contributed' },
  { placeId: 116605585218149, ownership: 'contributed' },
  { placeId: 85622629241634, ownership: 'contributed' },
  { placeId: 133627020051654, ownership: 'contributed' },
  { placeId: 110404078250920, ownership: 'contributed' },
  { placeId: 18305220295, ownership: 'contributed', misfitsIp: true },
  { placeId: 15364195813, ownership: 'contributed', misfitsIp: true },
  { placeId: 71344980160819, ownership: 'contributed' },
  { placeId: 109243958755522, ownership: 'contributed' },

  { placeId: 15536298749, ownership: 'brand' },
  { placeId: 14618379101, ownership: 'brand' },
  { placeId: 92145969552720, ownership: 'brand' },
  { placeId: 138038324020217, ownership: 'brand' },
]
