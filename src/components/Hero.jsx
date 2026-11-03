import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, Code2, Download, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { scrollToId } from '../lib/scroll'
import Button from './ui/Button'
import RotatingText from './RotatingText'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'

const EASE = [0.16, 1, 0.3, 1]

function useIstClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)
}

function NameLine({ text, revealed, delay, className = '' }) {
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className}`} aria-hidden="true">
      <span className="flex">
        {text.split('').map((ch, i) => (
          <motion.span
            key={i}
            className="text-chrome inline-block will-change-transform"
            initial={{ y: '110%' }}
            animate={revealed ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 1.25, ease: EASE, delay: delay + i * 0.05 }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  )
}

export default function Hero({ revealed }) {
  const ref = useRef(null)
  const time = useIstClock()

  // Scroll-away parallax: the name drifts up and dims as the work section arrives.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // A soft spotlight that follows the pointer across the grid.
  const mx = useMotionValue(70)
  const my = useMotionValue(30)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgba(255,255,255,0.07), transparent 65%)`
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1.1, ease: EASE, delay },
  })

  return (
    <section
      id="home"
      ref={ref}
      data-nav="dark"
      onPointerMove={onMove}
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* Backdrop */}
      <div
        className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        aria-hidden="true"
      />
      <motion.div className="absolute inset-0 -z-10" style={{ background: spotlight }} aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-ink"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-[100svh] max-w-[1680px] flex-col px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pt-28">
        {/* Meta row */}
        <motion.div {...fadeUp(0.3)} className="label flex items-start justify-between gap-6 text-steel">
          <span className="hidden sm:block">
            Portfolio <span className="text-paper/40">—</span> ’26
          </span>
          <span className="hidden md:block">31.68° N, 76.52° E</span>
          <span className="tabular-nums">
            Hamirpur, IN <span className="text-paper/40">·</span> {time} IST
          </span>
        </motion.div>

        {/* Name */}
        <motion.div style={{ y: nameY, opacity: fade }} className="relative mt-auto pt-10 lg:pt-6">
          <h1
            aria-label="Manas Kapoor"
            className="font-wide font-[780] uppercase leading-[0.8] tracking-[-0.045em] text-[clamp(3.4rem,15.2vw,16.5rem)]"
          >
            <NameLine text="MANAS" revealed={revealed} delay={0.15} />
            <span className="block text-right">
              <NameLine text="KAPOOR" revealed={revealed} delay={0.3} className="inline-block" />
            </span>
          </h1>

          {/* Roles, tucked beside MANAS on large screens */}
          <motion.ul
            {...fadeUp(0.9)}
            className="label mt-6 flex flex-wrap gap-x-5 gap-y-2 text-silver lg:absolute lg:right-0 lg:top-[clamp(1rem,2.6vw,3rem)] lg:mt-0 lg:flex-col lg:items-end lg:gap-2.5 lg:pt-6"
          >
            {profile.roles.map((r, i) => (
              <li key={r} className="flex items-center gap-3">
                <span className="text-steel/70">0{i + 1}</span>
                {r}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Lower deck */}
        <div className="mt-10 grid gap-10 border-t border-white/10 pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <motion.div {...fadeUp(1.0)} className="lg:col-span-6">
            <p className="font-serif text-[clamp(1.9rem,3.3vw,3.1rem)] italic leading-[1.05] text-paper">
              <RotatingText lines={profile.taglines} active={revealed} />
            </p>
            <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-steel sm:text-base">{profile.intro}</p>
          </motion.div>

          <motion.div {...fadeUp(1.15)} className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-2 text-paper">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-ember opacity-60 motion-reduce:hidden" />
                  <span className="relative size-2 rounded-full bg-ember" />
                </span>
                {profile.availability}
              </span>
              <span className="flex items-center gap-2 text-steel">
                <MapPin className="size-4" strokeWidth={1.5} />
                {profile.location}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                href="#projects"
                icon={ArrowRight}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('projects')
                }}
              >
                Explore my work
              </Button>
              <Button href={profile.resume} download={profile.resumeFileName} variant="outline" icon={Download}>
                Download résumé
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-1 text-steel">
              <SocialLink href={profile.github} label="GitHub" icon={GithubIcon} external />
              <SocialLink href={profile.linkedin} label="LinkedIn" icon={LinkedinIcon} external />
              <SocialLink href={profile.leetcode} label="LeetCode" icon={Code2} external />
              <SocialLink href={`mailto:${profile.email}`} label="Email" icon={Mail} />
            </div>
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={() => scrollToId('projects')}
          {...fadeUp(1.4)}
          className="label mx-auto mt-10 flex flex-col items-center gap-3 text-steel transition-colors hover:text-paper"
          aria-label="Scroll to projects"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-paper motion-reduce:hidden" />
          </span>
          <ArrowDown className="sr-only" />
        </motion.button>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  )
}

function SocialLink({ href, label, icon: Icon, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors hover:bg-white/[0.05] hover:text-paper first:-ml-3"
    >
      <Icon className="size-4" strokeWidth={1.5} />
      {label}
    </a>
  )
}
