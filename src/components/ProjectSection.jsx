import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './ui/BrandIcons'
import { gsap, useGSAP } from '../lib/gsap'
import { useMediaQuery } from '../hooks/useMediaQuery'
import ChaitanyaMockup from './mockups/ChaitanyaMockup'
import EdgeCaseMockup from './mockups/EdgeCaseMockup'
import RogMockup from './mockups/RogMockup'
import ShatranjMockup from './mockups/ShatranjMockup'
import CampusPulseMockup from './mockups/CampusPulseMockup'

const MOCKUPS = {
  chaitanya: ChaitanyaMockup,
  edgecase: EdgeCaseMockup,
  rog: RogMockup,
  shatranjx: ShatranjMockup,
  campuspulse: CampusPulseMockup,
}

// Each project's name gets its own typographic voice.
const NAME_STYLE = {
  chaitanya: 'font-condensed font-[850] uppercase tracking-[-0.02em] leading-[0.82] text-[clamp(3rem,6vw,6.8rem)]',
  edgecase: 'font-serif font-normal tracking-[-0.02em] leading-[0.9] text-[clamp(3.4rem,6.6vw,7rem)]',
  rog: 'font-wide font-[300] uppercase tracking-[0.18em] leading-[0.9] text-[clamp(3.6rem,7.6vw,8.2rem)]',
  shatranjx: 'font-serif font-normal tracking-[-0.03em] leading-[0.9] text-[clamp(3.2rem,6.2vw,6.6rem)]',
  campuspulse: 'font-wide font-[650] tracking-[-0.045em] leading-[0.9] text-[clamp(2.3rem,3.9vw,4.4rem)]',
}

export const SCRUB_QUERY = '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'

export default function ProjectSection({ project: p, total }) {
  const root = useRef(null)
  const scrub = useMediaQuery(SCRUB_QUERY)
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const progress = useMotionValue(0)
  const Mockup = MOCKUPS[p.mockup]
  const t = p.theme

  // Mobile/tablet: play the mockup's little story once when it scrolls into view.
  const mockRef = useRef(null)
  const inView = useInView(mockRef, { once: true, margin: '0px 0px -20% 0px' })
  useEffect(() => {
    if (scrub) return
    if (reduce) {
      progress.set(1)
      return
    }
    if (inView) {
      const c = animate(progress, 1, { duration: 5.5, ease: 'linear' })
      return () => c.stop()
    }
  }, [scrub, reduce, inView, progress])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(SCRUB_QUERY, () => {
        const q = gsap.utils.selector(root)
        // Arrival: the panel opens up from a rounded card as it reaches the top.
        gsap.fromTo(
          q('.js-stage'),
          { clipPath: 'inset(7% 4% 0% 4% round 32px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true },
          },
        )
        gsap.fromTo(
          q('.js-mock'),
          { y: 140, rotateX: 16, scale: 0.88 },
          {
            y: 0,
            rotateX: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top top', scrub: true },
          },
        )
        gsap.fromTo(
          q('.js-a > *'),
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'top top', scrub: true },
          },
        )

        // Pinned story: overview → details while the mockup plays through.
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            onUpdate: (self) => progress.set(self.progress),
          },
        })
        tl.to({}, { duration: 1 }, 0)
          .fromTo(q('.js-word'), { xPercent: 0 }, { xPercent: -38, duration: 1 }, 0)
          .fromTo(q('.js-bar'), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
          .to(q('.js-a'), { autoAlpha: 0, y: -50, duration: 0.12, ease: 'power1.in' }, 0.4)
          .fromTo(q('.js-b'), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0.47)
          .fromTo(q('.js-b-item'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.025, duration: 0.08 }, 0.5)
          .to(q('.js-mock'), { y: -24, scale: 0.97, duration: 0.4 }, 0.6)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id={`project-${p.id}`}
      data-nav={t.nav}
      aria-labelledby={`${p.id}-name`}
      className="relative"
      style={{ height: scrub ? '300vh' : 'auto', color: t.fg }}
    >
      <div
        className={`js-stage relative overflow-hidden ${scrub ? 'sticky top-0 h-[100svh]' : ''}`}
        style={{ background: t.bg }}
      >
        {/* Giant background word */}
        <div
          aria-hidden="true"
          className="js-word pointer-events-none absolute -bottom-[0.12em] left-0 select-none whitespace-nowrap font-wide text-[30vw] font-[900] leading-none tracking-[-0.05em] lg:text-[24vw]"
          style={{ color: t.wordColor }}
        >
          {p.bgWord}
        </div>

        <div
          className={`relative mx-auto grid max-w-[1680px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 ${
            scrub ? 'h-full items-center pb-16 pt-20' : 'py-24 sm:py-28'
          }`}
        >
          {/* Text column: overview and details share one grid cell on desktop */}
          <div className={`min-w-0 lg:col-span-5 xl:col-span-4 ${scrub ? 'grid' : 'flex flex-col gap-12'}`}>
            <Overview p={p} total={total} scrub={scrub} />
            {!scrub && <MockupSlot innerRef={mockRef} Mockup={Mockup} p={p} progress={progress} />}
            <Details p={p} scrub={scrub} />
          </div>

          {scrub && (
            <div className="min-w-0 lg:col-span-7 xl:col-span-8 [perspective:1600px]">
              <div className="js-mock mx-auto w-full max-w-[880px] will-change-transform [transform-style:preserve-3d]">
                <Mockup project={p} progress={progress} />
              </div>
            </div>
          )}
        </div>

        {/* Progress rail */}
        {scrub && (
          <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1680px] items-center gap-4 px-12 pb-6">
            <span className="label shrink-0" style={{ color: t.muted }}>
              {p.index} / {String(total).padStart(2, '0')}
            </span>
            <span className="relative h-px flex-1" style={{ background: t.line }}>
              <span className="js-bar absolute inset-0 origin-left" style={{ background: t.fg }} />
            </span>
            <span className="label shrink-0" style={{ color: t.muted }}>
              {p.name}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

function MockupSlot({ innerRef, Mockup, p, progress }) {
  return (
    <div ref={innerRef} className="-mx-1 sm:mx-0">
      <Mockup project={p} progress={progress} />
    </div>
  )
}

function Overview({ p, total, scrub }) {
  const t = p.theme
  return (
    <div className={`js-a flex flex-col ${scrub ? 'col-start-1 row-start-1 self-center' : ''}`}>
      <div className="label flex flex-wrap items-center gap-x-3 gap-y-1" style={{ color: t.muted }}>
        <span style={{ color: t.fg }}>
          {p.index}
          <span className="opacity-40">/{String(total).padStart(2, '0')}</span>
        </span>
        <span className="h-px w-6" style={{ background: t.line }} />
        <span>{p.category}</span>
        {p.year && <span>· {p.year}</span>}
      </div>

      <h3 id={`${p.id}-name`} className={`mt-6 ${NAME_STYLE[p.id]}`}>
        {p.id === 'edgecase' ? (
          <>
            <span className="opacity-30">&lt;</span>EdgeCase<span className="opacity-30">/&gt;</span>
          </>
        ) : p.id === 'shatranjx' ? (
          <>
            Shatranj<span style={{ color: t.accent }}>X</span>
          </>
        ) : (
          p.name
        )}
      </h3>
      <p className="mt-4 font-serif text-[clamp(1.4rem,2vw,2rem)] italic leading-tight">{p.title}</p>
      <p className="mt-5 max-w-[30rem] text-[15px] leading-relaxed" style={{ color: t.muted }}>
        {p.short}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-[12px]">
        <span className="flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: t.line }}>
          <span className="size-1.5 rounded-full" style={{ background: t.accent }} />
          {p.status}
          {p.statusDetail && <span style={{ color: t.muted }}>· {p.statusDetail}</span>}
        </span>
        <span className="rounded-full border px-3 py-1.5" style={{ borderColor: t.line, color: t.muted }}>
          {p.role}
        </span>
      </div>

      {p.facts?.length > 0 && (
        <dl className="mt-8 flex gap-8 border-t pt-5" style={{ borderColor: t.line }}>
          {p.facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-wide text-2xl font-semibold tracking-tight">{f.value}</dd>
              <dd className="label mt-1 text-[10px]" style={{ color: t.muted }}>
                {f.label}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}

function Details({ p, scrub }) {
  const t = p.theme
  return (
    <div className={`js-b flex flex-col gap-6 ${scrub ? 'invisible col-start-1 row-start-1 self-center' : ''}`}>
      <div className="js-b-item">
        <p className="label mb-2" style={{ color: t.muted }}>
          The problem
        </p>
        <p className="text-[clamp(1.05rem,1.3vw,1.25rem)] leading-snug">{p.problem}</p>
      </div>

      <div className="js-b-item">
        <p className="label mb-3" style={{ color: t.muted }}>
          What I did
        </p>
        <ol className="space-y-2.5">
          {p.contribution.map((c, i) => (
            <li key={c} className="flex gap-4 border-t pt-2.5 text-[14px] leading-snug" style={{ borderColor: t.line }}>
              <span className="font-mono text-[11px] tabular-nums" style={{ color: t.muted }}>
                0{i + 1}
              </span>
              {c}
            </li>
          ))}
        </ol>
      </div>

      <div className="js-b-item">
        <p className="label mb-3" style={{ color: t.muted }}>
          Built with
        </p>
        {p.stack ? (
          <ul className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border px-3 py-1 text-[12px]" style={{ borderColor: t.line }}>
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13px] italic" style={{ color: t.muted }}>
            [Tech stack to be added]
          </p>
        )}
      </div>

      {p.note && (
        <p className="js-b-item text-[12px] leading-relaxed" style={{ color: t.muted }}>
          * {p.note}
        </p>
      )}

      <div className="js-b-item flex flex-wrap gap-2">
        <ProjectLink href={p.links.live} label="Visit live site" t={t} primary />
        <ProjectLink href={p.links.github} label="View on GitHub" t={t} icon={GithubIcon} />
      </div>
    </div>
  )
}

function ProjectLink({ href, label, t, primary, icon: Icon = ArrowUpRight }) {
  if (!href) {
    return (
      <span
        className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-dashed px-5 text-[13px]"
        style={{ borderColor: t.line, color: t.muted }}
        title="Link coming soon"
      >
        {label.replace('Visit live site', 'Live link').replace('View on GitHub', 'Repository')} · coming soon
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex h-11 items-center gap-2 rounded-full border px-5 text-[13px] font-medium transition-transform duration-300 hover:-translate-y-0.5"
      style={primary ? { background: t.fg, color: t.bg, borderColor: t.fg } : { borderColor: t.line }}
    >
      {label}
      <Icon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} />
    </a>
  )
}
