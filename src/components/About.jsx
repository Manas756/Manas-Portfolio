import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { stats, timeline } from '../data/timeline'
import RevealText from './ui/RevealText'
import SectionLabel from './ui/SectionLabel'
import SystemDiagram from './SystemDiagram'

const EASE = [0.16, 1, 0.3, 1]

const bio = [
  "I started writing code because I wanted to know how the things on my screen actually worked. That question never went away. It just moved further down the stack. Today I'm most at home on the backend: designing APIs, thinking about what happens when a thousand people hit the same endpoint, and making sure the system behind a nice interface doesn't fall over.",
  "I'm a Computer Science undergraduate at HPTU Hamirpur, and most of what I know I learned by building. A festival website that had to survive real traffic. A contest platform that has to be fair to every participant. A chess server where the backend is the referee. An assistant that works across the whole desktop.",
  "Competitive programming keeps my fundamentals honest: 300+ LeetCode problems so far, and I've started competing in LeetCode contests. Leading teams, first the Chaitanya 2K26 tech team and then hackathon squads at Adobe, Colosseum and SIH, taught me the part nobody grades: scoping, shipping, and keeping people moving when the deadline is close. Separately, I'm taking part in e-Yantra for my college, which pulls me toward robotics and hardware problems.",
]

export default function About() {
  return (
    <section id="about" data-nav="dark" className="relative bg-ink" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1680px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <SectionLabel index="02" className="text-steel">
          About
        </SectionLabel>
        <RevealText
          as="h2"
          id="about-heading"
          text="Engineering is how I turn *curiosity* into something real."
          className="mt-8 max-w-[15ch] font-wide text-[clamp(2.6rem,6.6vw,7rem)] font-[650] leading-[0.92] tracking-[-0.045em]"
        />

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SystemDiagram />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <motion.p
              className="font-serif text-[clamp(1.6rem,2.4vw,2.3rem)] leading-[1.15] text-paper"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: EASE }}
            >
              {bio[0]}
            </motion.p>
            {bio.slice(1).map((para, i) => (
              <motion.p
                key={i}
                className="mt-6 text-[16px] leading-[1.75] text-steel sm:text-[17px]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              >
                {para}
              </motion.p>
            ))}
            <motion.p
              className="mt-6 text-[16px] leading-[1.75] text-paper sm:text-[17px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              What I care about is simple: software that is reliable, fast, and honest about what it does.
            </motion.p>

            <Stats />
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <div className="mt-20">
      <SectionLabel className="text-steel">By the numbers</SectionLabel>
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </div>
  )
}

function StatCard({ value, suffix, label, detail }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])

  // Gentle tilt toward the pointer.
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }

  return (
    <motion.div
      ref={ref}
      tabIndex={0}
      onPointerMove={onMove}
      onPointerLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      className="group relative bg-ink p-5 outline-none transition-colors duration-500 hover:bg-coal focus-visible:bg-coal sm:p-7"
    >
      <p className="text-chrome font-wide text-[clamp(2.4rem,4.4vw,4rem)] font-[750] leading-none tracking-[-0.04em] tabular-nums">
        {n}
        {suffix}
      </p>
      <p className="mt-3 text-[13px] text-paper sm:text-sm">{label}</p>
      <p className="mt-2 text-[12px] leading-relaxed text-steel transition-all duration-500 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
        {detail}
      </p>
    </motion.div>
  )
}

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <div className="mt-20">
      <SectionLabel className="text-steel">Timeline</SectionLabel>
      <ol ref={ref} className="relative mt-8 pl-8">
        <span className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10" aria-hidden="true" />
        <motion.span className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-paper" style={{ scaleY }} aria-hidden="true" />
        {timeline.map((item) => (
          <motion.li
            key={item.title}
            className="relative pb-9 last:pb-0"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          >
            <span
              className={`absolute -left-8 top-1.5 size-[11px] rounded-full border ${
                item.when === 'Now' ? 'border-ember bg-ember' : 'border-white/40 bg-ink'
              }`}
              aria-hidden="true"
            />
            <p className="label text-steel">{item.when}</p>
            <p className="mt-1.5 text-lg font-medium tracking-tight text-paper">{item.title}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-steel">{item.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
