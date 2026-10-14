export type Partner = {
  name: string
  work: string
  placeId?: number
}

export type CreatorCollab = {
  creators: string[]
  placeIds: number[]
  summary: string
}

export const brands: Partner[] = [
  { name: 'Warner Bros. Pictures', work: 'Integration & activation' },
  { name: 'Paramount', work: 'Integration & activation' },
  { name: 'Maybelline', work: 'Integration & activation' },
  { name: 'Chupa Chups', work: 'Brand game · Skate & Create', placeId: 14618379101 },
  { name: 'Littlest Pet Shop', work: 'Brand game', placeId: 15536298749 },
  { name: 'Zuru', work: 'Integration & activation' },
  { name: 'Regal Cinemas', work: 'Integration & activation' },
  { name: 'Juicy Drop', work: 'Integration & activation' },
  { name: 'American Egg Board', work: 'Integration & activation' },
  { name: 'Kids Help Phone', work: 'Integration & activation' },
]

export const creatorCollab: CreatorCollab = {
  creators: ['KreekCraft', 'Karl Jacobs'],
  placeIds: [15364195813, 18305220295],
  summary: 'Original Misfits IP built in partnership with two of Roblox’s best-known creators.',
}
