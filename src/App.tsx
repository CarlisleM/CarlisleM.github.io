import { About } from './components/About'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Games } from './components/Games'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Partners } from './components/Partners'
import { Spotlight } from './components/Spotlight'
import { StatsBand } from './components/StatsBand'
import { useStats } from './lib/useStats'

export default function App() {
  const { data, failed, views, totals } = useStats()

  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      <div aria-hidden className="studs pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Nav />
      <main>
        <Hero views={views} totals={totals} avatarUrl={data?.avatarUrl} />
        <StatsBand totals={totals} />
        <Spotlight views={views} />
        <Games views={views} />
        <Partners views={views} />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer updatedAt={data?.updatedAt} failed={failed} />
    </div>
  )
}
