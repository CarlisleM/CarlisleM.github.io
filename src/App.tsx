import { About } from './components/About'
import { Brands } from './components/Brands'
import { Contact, Footer } from './components/Contact'
import { Games } from './components/Games'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { StatsBand } from './components/StatsBand'
import { useStats } from './lib/useStats'

export default function App() {
  const { data, failed, views, totals } = useStats()

  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      <Backdrop />
      <Nav />
      <main>
        <Hero views={views} totals={totals} avatarUrl={data?.avatarUrl} updatedAt={data?.updatedAt} />
        <StatsBand totals={totals} />
        <Games views={views} />
        <Brands />
        <About />
        <Contact />
      </main>
      <Footer updatedAt={data?.updatedAt} failed={failed} />
    </div>
  )
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1200px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-48 left-1/2 h-[560px] w-[960px] -translate-x-1/2 rounded-full bg-accent/12 blur-[140px]" />
      <div className="absolute top-72 -right-48 h-[440px] w-[440px] rounded-full bg-accent-2/10 blur-[120px]" />
    </div>
  )
}
