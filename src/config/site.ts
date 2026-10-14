export type SocialKind = 'discord' | 'x' | 'roblox' | 'linkedin' | 'github' | 'email'

export type Social = {
  kind: SocialKind
  label: string
  handle: string
  href?: string
  copy?: string
}

export type Service = {
  title: string
  description: string
  icon: 'code' | 'gamepad' | 'chart' | 'users'
}

export const site: {
  name: string
  fullName: string
  robloxUserId?: number
  role: string
  headline: [string, string, string]
  tagline: string
  bio: string[]
  availability: string
  github: { owner: string; repo: string }
  socials: Social[]
  services: Service[]
  skills: string[]
} = {
  name: 'Kami',
  fullName: 'Carlisle Miller',
  role: 'Roblox Developer',
  headline: ['Building Roblox games', 'millions', 'come back to.'],
  tagline:
    'I’m Kami — a Roblox developer behind hits like Steal An Egg, brand experiences for Warner Bros., Paramount and Maybelline, and a growing slate of my own games.',
  bio: [
    'I’ve worked on more than 25 Roblox games, including Steal An Egg, which peaked at 14.3 million concurrent players — the 4th highest CCU in gaming history.',
    'Alongside that I build brand integrations and activations for names like Chupa Chups, Zuru, Maybelline, Paramount, Warner Bros. Pictures, Juicy Drop and Regal Cinemas, and develop my own games including Demonbound and Sea Battle!',
  ],
  availability: 'Open to commissions & partnerships',
  github: {
    owner: 'CarlisleM',
    repo: 'CarlisleM.github.io',
  },
  socials: [
    { kind: 'discord', label: 'Discord', handle: 'kamimelee', copy: 'kamimelee' },
    { kind: 'x', label: 'X', handle: '@KamiMakesGames', href: 'https://x.com/KamiMakesGames' },
    { kind: 'linkedin', label: 'LinkedIn', handle: 'Carlisle Miller', href: 'https://www.linkedin.com/in/carlisle-miller-b11630172/' },
    { kind: 'github', label: 'GitHub', handle: 'CarlisleM', href: 'https://github.com/CarlisleM' },
  ],
  services: [
    {
      icon: 'code',
      title: 'Systems & Scripting',
      description: 'Scalable Luau architecture, data persistence, combat, inventories and everything players never see break.',
    },
    {
      icon: 'gamepad',
      title: 'Game Design',
      description: 'Core loops, progression and onboarding tuned for retention from the first session.',
    },
    {
      icon: 'chart',
      title: 'Monetization & Live Ops',
      description: 'Gamepasses, products and events built around analytics instead of guesswork.',
    },
    {
      icon: 'users',
      title: 'Brand Experiences',
      description: 'Activations and partner games that hit brand goals and still feel native to Roblox.',
    },
  ],
  skills: ['Luau', 'Rojo', 'Knit', 'ProfileStore', 'React-lua', 'Blender', 'Game Design', 'Monetization', 'Analytics', 'Brand Activations'],
}
