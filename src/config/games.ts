export type Ownership = 'owned' | 'contributed'

export type GameEntry = {
  placeId: number
  ownership: Ownership
  role: string
  blurb: string
  tags: string[]
  peakCcuOverride?: number
}

export const games: GameEntry[] = [
  {
    placeId: 920587237,
    ownership: 'owned',
    role: 'Founder & Lead Developer',
    blurb: 'Placeholder entry. Replace with one of your own games and a sentence on what you built.',
    tags: ['Simulator', 'Live Ops'],
  },
  {
    placeId: 606849621,
    ownership: 'owned',
    role: 'Lead Scripter',
    blurb: 'Placeholder entry. Describe the systems you owned and the results they produced.',
    tags: ['Open World', 'Systems'],
  },
  {
    placeId: 4924922222,
    ownership: 'contributed',
    role: 'Systems Programmer',
    blurb: 'Placeholder entry. Contributed games show what you did on someone else’s project.',
    tags: ['Roleplay'],
  },
  {
    placeId: 142823291,
    ownership: 'contributed',
    role: 'Gameplay Programmer',
    blurb: 'Placeholder entry. Keep blurbs to one or two lines so the cards stay even.',
    tags: ['PvP', 'Monetization'],
  },
  {
    placeId: 192800,
    ownership: 'contributed',
    role: 'Contract Developer',
    blurb: 'Placeholder entry. Set peakCcuOverride if you know a peak from before tracking started.',
    tags: ['Roleplay', 'Classic'],
  },
  {
    placeId: 189707,
    ownership: 'owned',
    role: 'Solo Developer',
    blurb: 'Placeholder entry. Owned and contributed games can be filtered separately on the page.',
    tags: ['Survival', 'Classic'],
  },
]
