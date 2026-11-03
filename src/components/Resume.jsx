import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Download, ExternalLink, FileText } from 'lucide-react'
import { profile } from '../data/profile'
import preview from '../assets/resume-preview.webp'
import Button from './ui/Button'
import RevealText from './ui/RevealText'
import SectionLabel from './ui/SectionLabel'

const inside = [
  ['Experience', 'Chaitanya 2K26 tech lead · InAmigos Foundation intern'],
  ['Projects', 'Chaitanya 2K26 · EdgeCase · CampusPulse · ROG · ShatranjX'],
  ['Leadership', 'Chaitanya 2K26 tech lead · hackathon team lead'],
  ['Activities', 'Hackathon win · e-Yantra · LeetCode contests'],
  ['Skills', 'Node.js · Express · React · Next.js · C++ · SQL & NoSQL'],
]

export default function Resume() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-7, -1.5])
  const y = useTransform(scrollYProgress, [0, 1], [120, 0])
  const shadow = useTransform(scrollYProgress, [0, 1], [0.15, 0.32])
  const boxShadow = useTransform(shadow, (s) => `0 50px 100px -30px rgba(0,0,0,${s}), 0 0 0 1px rgba(0,0,0,0.06)`)

  return (
    <section id="resume" ref={ref} data-nav="light" className="relative overflow-hidden bg-paper text-ink" aria-labelledby="resume-heading">
      <div className="grid-lines-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1680px] gap-16 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-40">
        <div className="lg:col-span-5">
          <SectionLabel index="05" className="text-black/50">
            Résumé
          </SectionLabel>
          <RevealText
            id="resume-heading"
            text="One Page. A Lot of *Building.*"
            className="mt-8 font-wide text-[clamp(2.6rem,5.4vw,5.6rem)] font-[680] leading-[0.92] tracking-[-0.045em]"
          />
          <p className="mt-8 max-w-md text-[16px] leading-relaxed text-black/60">
            Everything above, condensed to a single page. It's ATS-friendly, has no filler, and every line is something I actually did.
          </p>

          <dl className="mt-10 border-t border-black/10">
            {inside.map(([k, v], i) => (
              <motion.div
                key={k}
                className="grid grid-cols-[7rem_1fr] gap-4 border-b border-black/10 py-4 text-[14px]"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <dt className="label pt-0.5 text-black/45">{k}</dt>
                <dd className="text-black/80">{v}</dd>
              </motion.div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={profile.resume} download={profile.resumeFileName} variant="solid-dark" icon={Download}>
              Download résumé
            </Button>
            <Button href={profile.resume} target="_blank" rel="noreferrer" variant="outline-dark" icon={ExternalLink}>
              Open PDF
            </Button>
          </div>
          <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-black/45">
            <FileText className="size-3.5" /> {profile.resumeFileName} · PDF · 1 page
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="relative mx-auto max-w-[620px] [perspective:1400px]">
            {/* The mat */}
            <div className="absolute -inset-4 rounded-[28px] border border-black/[0.07] bg-black/[0.025] sm:-inset-8" aria-hidden="true" />
            <motion.a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Manas Kapoor's résumé (PDF) in a new tab"
              style={{ rotate, y, boxShadow }}
              whileHover={{ rotate: 0, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              className="group relative block overflow-hidden rounded-[6px] bg-white"
            >
              <img
                src={preview}
                alt="Preview of Manas Kapoor's one-page résumé"
                width={1240}
                height={1754}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/[0.04]">
                <span className="label translate-y-2 rounded-full bg-ink px-4 py-2 text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Open full PDF
                </span>
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
