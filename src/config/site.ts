export type SocialKind = 'discord' | 'x' | 'roblox' | 'linkedin' | 'email'

export type Social = {
  kind: SocialKind
  label: string
  handle: string
  href: string
}

export type Service = {
  title: string
  description: string
  icon: 'code' | 'gamepad' | 'chart' | 'users'
}

export const site = {
  name: 'Carlisle',
  robloxUsername: 'YourRobloxName',
  robloxUserId: 1,
  role: 'Roblox Developer & Studio Owner',
  headline: ['Building Roblox games', 'millions', 'come back to.'],
  tagline:
    'I design, script and ship Roblox experiences — from core systems and monetization to live ops — for my own studio and for brands.',
  bio: [
    'Placeholder bio. Say how long you have been developing on Roblox, what kinds of games you build, and what you are best known for.',
    'A second paragraph works well for studios, teams and partners you have worked with, and what you are looking for next.',
  ],
  availability: 'Open to commissions & partnerships',
  github: {
    owner: 'YOUR_GITHUB_USERNAME',
    repo: 'YOUR_GITHUB_USERNAME.github.io',
  },
  socials: [
    { kind: 'discord', label: 'Discord', handle: '@yourname', href: 'https://discord.com/users/000000000000000000' },
    { kind: 'x', label: 'X', handle: '@yourname', href: 'https://x.com/yourname' },
    { kind: 'roblox', label: 'Roblox', handle: '@YourRobloxName', href: 'https://www.roblox.com/users/1/profile' },
    { kind: 'linkedin', label: 'LinkedIn', handle: 'in/yourname', href: 'https://www.linkedin.com/in/yourname' },
  ] satisfies Social[],
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
  ] satisfies Service[],
  skills: ['Luau', 'Rojo', 'Knit', 'ProfileStore', 'React-lua', 'Blender', 'Game Design', 'Monetization', 'Analytics', 'Team Lead'],
}
