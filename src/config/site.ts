export type SocialKind = 'discord' | 'x' | 'roblox' | 'linkedin' | 'github' | 'email'

export type Social = {
  kind: SocialKind
  label: string
  handle: string
  href?: string
  copy?: string
}

export type Experience = {
  company: string
  role?: string
  period?: string
  summary?: string
  href?: string
  roblox: boolean
}

export type Research = {
  kind: string
  title: string
  href?: string
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
  company: { name: string; href: string }
  location: string
  tagline: string
  bio: string[]
  resumeUrl?: string
  experience: Experience[]
  research: Research[]
  github: { owner: string; repo: string }
  socials: Social[]
  services: Service[]
  skills: string[]
} = {
  name: 'Kami',
  fullName: 'Carlisle Miller',
  robloxUserId: 2249165880,
  role: 'Lead Engineer',
  company: { name: 'Misfits Gaming', href: 'https://misfitsgaming.gg/' },
  location: 'Los Angeles, CA',
  tagline:
    'I’m Kami, Lead Engineer at Misfits Gaming. I jump into Roblox games — mostly acquisitions — and help them grow, from Steal An Egg to brand worlds for Warner Bros., Paramount and Maybelline.',
  bio: [
    'Originally from Brisbane, Australia and now based in Los Angeles, I’m the Lead Engineer at Misfits Gaming.',
    'I’ve worked on more than 25 Roblox games — most of them acquisitions, where I come in as an engineer to help improve and grow them. That includes Steal An Egg, which peaked at 14.3 million concurrent players, the 4th highest CCU in gaming history.',
    'Alongside that I build brand integrations and activations for names like Chupa Chups, Zuru, Maybelline, Paramount, Warner Bros. Pictures, Juicy Drop and Regal Cinemas, and develop my own games including Demonbound and Sea Battle!',
  ],
  experience: [
    {
      company: 'Misfits Gaming',
      role: 'Lead Engineer',
      href: 'https://misfitsgaming.gg/',
      roblox: true,
    },
    { company: 'Coin Crew Games', roblox: false },
    { company: 'Codafication', roblox: false },
  ],
  research: [{ kind: 'Thesis', title: 'Automated droplet systems' }],
  github: {
    owner: 'CarlisleM',
    repo: 'CarlisleM.github.io',
  },
  socials: [
    { kind: 'discord', label: 'Discord', handle: 'kamimelee', copy: 'kamimelee' },
    { kind: 'x', label: 'X', handle: '@KamiMakesGames', href: 'https://x.com/KamiMakesGames' },
    { kind: 'roblox', label: 'Roblox', handle: 'QuestioningCarl', href: 'https://www.roblox.com/users/2249165880/profile' },
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
