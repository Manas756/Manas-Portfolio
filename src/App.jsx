import { useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { ScrollTrigger } from './lib/gsap'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import About from './components/About'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // intro → reveal (site fades in under the fading intro) → done (intro unmounted)
  const [phase, setPhase] = useState('intro')
  const revealed = phase !== 'intro'

  const onReveal = useCallback(() => setPhase((p) => (p === 'intro' ? 'reveal' : p)), [])
  const onComplete = useCallback(() => setPhase('done'), [])

  // Hold the page still and at the top while the intro plays.
  useEffect(() => {
    const root = document.documentElement
    if (!revealed) {
      window.scrollTo(0, 0)
      root.style.overflow = 'hidden'
    } else {
      root.style.overflow = ''
    }
  }, [revealed])

  // Layout can shift once fonts and images settle, so re-measure scroll animations.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
  useEffect(() => {
    if (phase === 'done') ScrollTrigger.refresh()
  }, [phase])

  return (
    <MotionConfig reducedMotion="user">
      {phase !== 'done' && <IntroAnimation onReveal={onReveal} onComplete={onComplete} />}

      <a
        href="#main"
        className="label sr-only z-[90] rounded-full bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Navbar visible={revealed} />
      <main id="main" aria-hidden={!revealed || undefined}>
        <Hero revealed={revealed} />
        <ProjectShowcase />
        <About />
        <Skills />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
