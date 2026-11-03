import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight, Check, Code2, Copy, Download, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import Button from './ui/Button'
import RevealText from './ui/RevealText'
import SectionLabel from './ui/SectionLabel'
import MonogramMark from './ui/MonogramMark'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'

export default function Contact() {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)

  // The big background mark leans toward the pointer.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 50, damping: 18 })
  const sy = useSpring(py, { stiffness: 50, damping: 18 })
  const rotY = useTransform(sx, [0, 1], [-14, 14])
  const rotX = useTransform(sy, [0, 1], [10, -10])
  const lx = useTransform(sx, [0, 1], [20, 80])
  const ly = useTransform(sy, [0, 1], [20, 80])
  const light = useMotionTemplate`radial-gradient(500px circle at ${lx}% ${ly}%, rgba(255,255,255,0.08), transparent 70%)`

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      onPointerMove={onMove}
      data-nav="dark"
      className="relative isolate overflow-hidden bg-ink"
      aria-labelledby="contact-heading"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ background: light }} aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-1/2 -z-10 w-[70vw] max-w-[900px] -translate-y-1/2 opacity-[0.07] [perspective:1200px] lg:right-[-4%] lg:w-[48vw]"
      >
        <motion.div style={{ rotateY: rotY, rotateX: rotX }}>
          <MonogramMark className="h-auto w-full" />
        </motion.div>
      </motion.div>

      <div className="mx-auto max-w-[1680px] px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <SectionLabel index="06" className="text-steel">
          Contact
        </SectionLabel>
        <RevealText
          id="contact-heading"
          text="Have something *worth* building?"
          className="mt-8 max-w-[14ch] font-wide text-[clamp(2.8rem,7.6vw,8rem)] font-[680] leading-[0.9] tracking-[-0.05em]"
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="max-w-lg text-[17px] leading-relaxed text-steel sm:text-lg">
              I'm always interested in building meaningful software, solving challenging problems, and working with people who care
              about engineering.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={`mailto:${profile.email}?subject=Hello%20Manas`} icon={Mail}>
                Start a conversation
              </Button>
              <Button href={profile.resume} download={profile.resumeFileName} variant="outline" icon={Download}>
                Download résumé
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <ul className="border-t border-white/10">
              <li className="flex items-center justify-between gap-4 border-b border-white/10 py-5">
                <a href={`mailto:${profile.email}`} className="group min-w-0">
                  <span className="label block text-steel">Email</span>
                  <span className="mt-1 block truncate text-lg tracking-tight text-paper transition-colors group-hover:text-white sm:text-xl">
                    {profile.email}
                  </span>
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-steel transition-colors hover:border-white/40 hover:text-paper"
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                  title={copied ? 'Copied' : 'Copy'}
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </button>
              </li>
              <ContactRow href={profile.github} label="GitHub" value={`github.com/${profile.githubHandle}`} icon={GithubIcon} />
              <ContactRow href={profile.linkedin} label="LinkedIn" value="in/manas-kapoor" icon={LinkedinIcon} />
              <ContactRow href={profile.leetcode} label="LeetCode" value={`leetcode.com/u/${profile.leetcodeHandle}`} icon={Code2} />
            </ul>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ href, label, value, icon: Icon }) {
  return (
    <li className="border-b border-white/10">
      <a href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-5">
        <span className="min-w-0">
          <span className="label block text-steel">{label}</span>
          <span className="mt-1 flex items-center gap-2 truncate text-lg tracking-tight text-paper sm:text-xl">
            <Icon className="size-4 shrink-0 text-steel" /> {value}
          </span>
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-steel transition-all duration-300 group-hover:rotate-45 group-hover:border-white/40 group-hover:text-paper">
          <ArrowUpRight className="size-4" />
        </span>
      </a>
    </li>
  )
}
