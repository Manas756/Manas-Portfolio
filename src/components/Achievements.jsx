import { useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { achievements } from '../data/achievements'
import { certifications, participated } from '../data/certifications'
import { gsap, useGSAP } from '../lib/gsap'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { scrollToId } from '../lib/scroll'
import RevealText from './ui/RevealText'
import SectionLabel from './ui/SectionLabel'

const PIN_QUERY = '(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)'

export default function Achievements() {
  const root = useRef(null)
  const pinned = useMediaQuery(PIN_QUERY)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(PIN_QUERY, () => {
        const track = root.current.querySelector('.js-track')
        const distance = () => track.scrollWidth - window.innerWidth
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            pin: root.current.querySelector('.js-pin'),
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        })
        gsap.fromTo(
          root.current.querySelector('.js-rail'),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: 0.7, invalidateOnRefresh: true },
          },
        )
        // Figures drift a little slower than their cards: depth without noise.
        root.current.querySelectorAll('.js-figure').forEach((fig) => {
          gsap.fromTo(
            fig,
            { xPercent: 4 },
            {
              xPercent: -4,
              ease: 'none',
              scrollTrigger: { trigger: fig.closest('.js-card'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="achievements" ref={root} data-nav="dark" className="relative bg-[#0c0c0d]" aria-labelledby="achievements-heading">
      <div className={`js-pin relative flex flex-col overflow-hidden ${pinned ? 'h-[100svh]' : ''}`}>
        <div className="mx-auto w-full max-w-[1680px] px-5 pt-28 sm:px-8 lg:px-12 lg:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index="04" className="text-steel">
                Achievements
              </SectionLabel>
              <RevealText
                id="achievements-heading"
                text="Beyond the *Code.*"
                className="mt-6 font-wide text-[clamp(2.6rem,5.6vw,5.8rem)] font-[650] leading-[0.92] tracking-[-0.045em]"
              />
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-steel">
              Hackathons, leadership and robotics. The things that taught me how to work with people, not just with code.
            </p>
          </div>
          {pinned && (
            <div className="relative mt-8 h-px bg-white/10" aria-hidden="true">
              <span className="js-rail absolute inset-0 origin-left bg-paper" />
            </div>
          )}
        </div>

        <div className={`${pinned ? 'flex min-h-0 flex-1 py-[clamp(1.25rem,4vh,3rem)]' : ''}`}>
          <ol
            className={`js-track ${
              pinned
                ? 'flex h-full max-h-[600px] gap-5 pl-12 pr-12 will-change-transform'
                : 'mx-auto grid max-w-[1680px] gap-4 px-5 pb-24 pt-12 sm:grid-cols-2 sm:px-8'
            }`}
          >
            {achievements.map((a, i) => (
              <Card key={a.id} a={a} i={i} pinned={pinned} />
            ))}
            <li
              className={`js-card flex flex-col justify-between rounded-3xl border border-dashed border-white/15 p-7 ${
                pinned ? 'w-[340px] shrink-0' : 'sm:col-span-2'
              }`}
            >
              <p className="label text-steel">Next</p>
              <div>
                <p className="font-serif text-3xl italic leading-tight text-paper">
                  An internship where I can build backend systems that matter.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="group mt-6 inline-flex items-center gap-2 text-sm text-paper"
                >
                  Let’s talk
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <Certifications />
    </section>
  )
}

function Certifications() {
  return (
    <div className="mx-auto max-w-[1680px] px-5 pb-28 pt-8 sm:px-8 lg:px-12 lg:pt-20">
      <SectionLabel className="text-steel">Certification</SectionLabel>
      <ul className="mt-6 border-t border-white/10">
        {certifications.map((c, i) => {
          const Tag = c.link ? 'a' : 'div'
          return (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Tag
                {...(c.link ? { href: c.link, target: '_blank', rel: 'noreferrer' } : {})}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-white/10 py-5 transition-colors duration-500 hover:bg-white/[0.02] sm:grid-cols-[2fr_1fr_1fr_auto]"
              >
                <span className="font-wide text-lg font-semibold tracking-tight sm:text-xl">{c.title}</span>
                <span className="text-sm text-silver sm:order-none">{c.issuer}</span>
                <span className="label hidden text-steel sm:block">{c.kind}</span>
                {c.link ? (
                  <ArrowUpRight className="size-4 text-steel transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                ) : (
                  <span className="hidden sm:block" />
                )}
              </Tag>
            </motion.li>
          )
        })}
      </ul>
      <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3">
        <SectionLabel className="text-steel">Also participated in</SectionLabel>
        <ul className="flex flex-wrap gap-2">
          {participated.map((h) => (
            <li key={h} className="rounded-full border border-white/12 px-4 py-1.5 text-sm text-silver">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Card({ a, i, pinned }) {
  const featured = a.featured
  return (
    <motion.li
      className={`js-card group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#161618] to-[#0f0f10] p-6 sm:p-8 ${
        pinned ? (featured ? 'w-[min(58vw,820px)] shrink-0' : 'w-[400px] shrink-0') : featured ? 'sm:col-span-2' : ''
      }`}
      initial={pinned ? false : { opacity: 0, y: 30 }}
      whileInView={pinned ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
    >
      <div className="flex items-center justify-between">
        <span className="label text-steel">{a.kicker}</span>
        <span className="label text-steel/60">0{i + 1}</span>
      </div>

      <div className={`js-figure mt-6 ${featured ? 'lg:mt-auto' : 'mt-auto'} pt-4`}>
        <p
          className={`text-chrome font-wide font-[800] leading-[0.8] tracking-[-0.06em] ${
            featured ? 'text-[clamp(6rem,15vw,13rem)]' : 'text-[clamp(3.6rem,7vw,6rem)]'
          }`}
        >
          {a.figure}
        </p>
        <p className="label mt-3 text-silver">{a.figureLabel}</p>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <h3 className={`font-wide font-semibold tracking-tight ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{a.title}</h3>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-steel">{a.text}</p>
        {a.events && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {a.events.map((e) => (
              <li key={e} className="rounded-full border border-white/12 px-3 py-1 text-[12px] text-silver">
                {e}
              </li>
            ))}
          </ul>
        )}
      </div>
      {featured && (
        <span
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(255,106,61,0.14),transparent_65%)]"
          aria-hidden="true"
        />
      )}
    </motion.li>
  )
}
