import { motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { labItems, projects } from '../data/projects'
import { scrollToId } from '../lib/scroll'
import ProjectSection from './ProjectSection'
import RevealText from './ui/RevealText'
import SectionLabel from './ui/SectionLabel'

export default function ProjectShowcase() {
  return (
    <div id="projects">
      <ShowcaseIntro />
      {projects.map((p) => (
        <ProjectSection key={p.id} project={p} total={projects.length} />
      ))}
      <Lab />
    </div>
  )
}

function ShowcaseIntro() {
  return (
    <section data-nav="dark" className="relative bg-ink" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[1680px] px-5 pb-24 pt-28 sm:px-8 lg:px-12 lg:pb-32 lg:pt-40">
        <SectionLabel index="01" className="text-steel">
          Selected work
        </SectionLabel>
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <RevealText
            id="work-heading"
            text="Things I've *built,* and what they taught me."
            className="font-wide text-[clamp(2.6rem,6.4vw,6.6rem)] font-[650] leading-[0.92] tracking-[-0.04em] lg:col-span-8"
          />
          <motion.p
            className="max-w-sm self-end text-[15px] leading-relaxed text-steel lg:col-span-4 lg:justify-self-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Five projects, from a festival site that had to hold up under real traffic to a contest judge that has to treat every
            submission fairly.
          </motion.p>
        </div>

        <ol className="mt-16 border-t border-white/10 lg:mt-24">
          {projects.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={`#project-${p.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(`project-${p.id}`)
                }}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-white/10 py-5 sm:grid-cols-[4rem_1.3fr_1fr_auto] sm:py-6"
              >
                <span
                  className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-y-100"
                  style={{ background: p.theme.bg }}
                  aria-hidden="true"
                />
                <span className="label relative text-steel transition-colors duration-500 group-hover:text-[var(--fg)]" style={{ '--fg': p.theme.muted }}>
                  {p.index}
                </span>
                <span
                  className="relative font-wide text-[clamp(1.4rem,3vw,2.6rem)] font-semibold tracking-[-0.03em] transition-[color,transform] duration-500 ease-[var(--ease-expo)] group-hover:translate-x-2 group-hover:text-[var(--fg)]"
                  style={{ '--fg': p.theme.fg }}
                >
                  {p.name}
                </span>
                <span
                  className="relative hidden text-sm text-steel transition-colors duration-500 group-hover:text-[var(--fg)] sm:block"
                  style={{ '--fg': p.theme.muted }}
                >
                  {p.category}
                </span>
                <ArrowDownRight
                  className="relative size-5 text-steel transition-all duration-500 group-hover:-rotate-45 group-hover:text-[var(--fg)]"
                  style={{ '--fg': p.theme.fg }}
                  strokeWidth={1.5}
                />
              </a>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Lab() {
  return (
    <section data-nav="dark" className="bg-ink" aria-labelledby="lab-heading">
      <div className="mx-auto max-w-[1680px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel className="text-steel">Also in the lab</SectionLabel>
            <h3 id="lab-heading" className="mt-5 font-serif text-[clamp(2rem,3.6vw,3.4rem)] italic leading-none">
              Smaller builds & explorations
            </h3>
          </div>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {labItems.map((item, i) => {
            const Tag = item.link ? 'a' : 'div'
            return (
              <motion.li
                key={item.title}
                className="bg-ink"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <Tag
                  {...(item.link ? { href: item.link, target: '_blank', rel: 'noreferrer' } : {})}
                  className="group flex h-full min-h-[220px] flex-col p-6 transition-colors duration-500 hover:bg-coal sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="label text-steel">{item.kind}</span>
                    {item.link && (
                      <ArrowUpRight className="size-4 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                    )}
                  </div>
                  <p className="mt-auto pt-10 font-wide text-xl font-semibold tracking-tight">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{item.text}</p>
                </Tag>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
