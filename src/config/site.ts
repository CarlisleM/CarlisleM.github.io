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
  role: string
  period: string
  location: string
  summary: string
  href?: string
  roblox: boolean
}

export type Academic = {
  kind: string
  title: string
  detail?: string
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
  academics: Academic[]
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
    'Originally from Brisbane, Australia and now based in Los Angeles. I studied Software Engineering at Griffith University and have shipped everything from AR iPad games and arcade cabinets to full-stack web apps — but Roblox is where I’ve spent the last few years.',
    'I’m the Lead Engineer at Misfits Gaming, and before that led engineering at Splash on a top 100 Roblox game. I’ve worked on more than 25 Roblox games — most of them acquisitions, where I come in as an engineer to help improve and grow them. That includes Steal An Egg, which peaked at 14.3 million concurrent players, the 4th highest CCU in gaming history.',
    'Alongside that I build brand integrations and activations for names like Chupa Chups, Zuru, Maybelline, Paramount, Warner Bros. Pictures, Juicy Drop and Regal Cinemas, and develop my own games including Demonbound and Sea Battle!',
  ],
  resumeUrl: '/carlisle-miller-resume.pdf',
  experience: [
    {
      company: 'Misfits Gaming',
      role: 'Lead Software Engineer',
      period: 'Nov 2023 – Now',
      location: 'Los Angeles',
      summary:
        'Original Roblox IP built with top creators — one passed a million visits in its launch week. Shared telemetry, UI and backend libraries across games, Google Sheets data pipelines for designers, and mentoring the engineering team.',
      href: 'https://misfitsgaming.gg/',
      roblox: true,
    },
    {
      company: 'Splash',
      role: 'Lead Software Engineer',
      period: 'Dec 2021 – Jun 2023',
      location: 'Brisbane / LA',
      summary:
        'Core gameplay, UI and backend for a top 100 Roblox game: multiplayer, queues, shared player data, leaderboards, loot crates, inventory and shops. Weekly production deploys and player analytics.',
      roblox: true,
    },
    {
      company: 'Codafication',
      role: 'Full-stack Software Engineer',
      period: 'Jan – Dec 2021',
      location: 'Brisbane',
      summary: 'Reusable React components and features in JavaScript and TypeScript, Postgres databases, and deployments on Kubernetes and Docker.',
      roblox: false,
    },
    {
      company: 'Coin Crew Games',
      role: 'Junior Software Engineer',
      period: 'Feb – Jun 2020',
      location: 'Los Angeles',
      summary: 'Prototyped arcade games in Unity, worked with clients on concepts, and wired, installed and documented arcade cabinets for manufacturing.',
      roblox: false,
    },
    {
      company: 'Queensland Micro- and Nanotechnology Centre',
      role: 'Junior Software Engineer',
      period: 'Nov 2017 – Jul 2018',
      location: 'Brisbane',
      summary:
        'Built a fully automated MATLAB system that tracks droplet images in batches and calculates advancing and receding contact angles — faster and more accurately than existing methods.',
      roblox: false,
    },
    {
      company: 'Activate Entertainment',
      role: 'Software Developer',
      period: 'Jul – Nov 2016',
      location: 'Brisbane',
      summary: 'Designed and built an augmented reality iPad game in Unity and Vuforia, with research-backed minigames that teach children empathy.',
      roblox: false,
    },
  ],
  academics: [
    { kind: 'Education', title: 'Bachelor of Software Engineering', detail: 'Griffith University · 2013 – 2018' },
    { kind: 'Thesis', title: 'Automated droplet image analysis', detail: 'Griffith University' },
  ],
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
      description: 'Luau architecture with React, Rojo, Lune and Knit — multiplayer, queues, shared data, inventories, shops and leaderboards.',
    },
    {
      icon: 'gamepad',
      title: 'Team Leadership',
      description: 'Mentoring engineers and building shared libraries for UI, telemetry and backend services used across games.',
    },
    {
      icon: 'chart',
      title: 'Live Ops & Data',
      description: 'Weekly production deploys, telemetry events and Google Sheets pipelines that let designers ship content without a developer.',
    },
    {
      icon: 'users',
      title: 'Brand Experiences',
      description: 'Activations and partner games that hit brand goals and still feel native to Roblox.',
    },
  ],
  skills: ['Luau', 'React', 'Rojo', 'Knit', 'Lune', 'TypeScript', 'JavaScript', 'Python', 'C#', 'Unity', 'PostgreSQL', 'Docker', 'Kubernetes'],
}
