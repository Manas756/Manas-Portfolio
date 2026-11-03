import { motion } from 'motion/react'
import { skillGroups } from '../data/skills'
import RevealText from './ui/RevealText'
import SectionLabel from './ui/SectionLabel'

const EASE = [0.16, 1, 0.3, 1]

export default function Skills() {
  const marquee = skillGroups.flatMap((g) => g.items).filter((s) => !s.startsWith('300+'))
  return (
    <section id="skills" data-nav="dark" className="relative overflow-hidden bg-coal" aria-labelledby="skills-heading">
      {/* Drifting index of everything, in outline */}
      <div className="flex overflow-hidden border-y border-white/[0.06] py-5" aria-hidden="true">
        {[0, 1].map((k) => (
          <div
            key={k}
            className="flex shrink-0 animate-[marquee_60s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none"
          >
            {marquee.map((s) => (
              <span key={s} className="flex items-center gap-10 whitespace-nowrap font-wide text-3xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(236,235,231,0.22)] sm:text-5xl">
                {s}
                <span className="size-1.5 rounded-full bg-white/20" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1680px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03" className="text-steel">
              Skills
            </SectionLabel>
            <RevealText
              id="skills-heading"
              text="The *toolkit.*"
              className="mt-8 font-wide text-[clamp(2.6rem,5.6vw,5.8rem)] font-[650] leading-[0.92] tracking-[-0.045em]"
            />
          </div>
          <p className="max-w-md self-end text-[15px] leading-relaxed text-steel lg:col-span-5 lg:col-start-8">
            No percentage bars, because nobody knows what “80% React” means. This is what I build with, grouped by where it sits in
            the stack.
          </p>
        </div>

        <ul className="mt-16 border-t border-white/10">
          {skillGroups.map((g, gi) => (
            <motion.li
              key={g.id}
              className="group grid gap-4 border-b border-white/10 py-7 transition-colors duration-500 hover:bg-white/[0.02] sm:py-8 lg:grid-cols-12 lg:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.04 * gi }}
            >
              <div className="flex items-baseline gap-4 lg:col-span-4">
                <span className="label text-steel">0{gi + 1}</span>
                <div>
                  <h3 className="font-wide text-xl font-semibold tracking-tight sm:text-2xl">{g.label}</h3>
                  <p className="mt-1 text-[13px] text-steel">{g.note}</p>
                </div>
              </div>
              <ul className="flex flex-wrap items-baseline gap-x-1 gap-y-2 lg:col-span-8">
                {g.items.map((s, i) => (
                  <motion.li
                    key={s}
                    className="flex items-baseline"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.04 }}
                  >
                    <span
                      className={`cursor-default rounded-md px-1.5 py-0.5 text-[clamp(1.15rem,1.8vw,1.6rem)] tracking-tight transition-colors duration-300 hover:bg-white/[0.06] hover:text-paper ${
                        s.startsWith('300+') ? 'text-paper' : 'text-silver/80'
                      }`}
                    >
                      {s.startsWith('300+') ? (
                        <>
                          <span className="text-chrome font-semibold">300+</span> LeetCode problems solved
                        </>
                      ) : (
                        s
                      )}
                    </span>
                    {i < g.items.length - 1 && <span className="px-1 text-white/15">/</span>}
                  </motion.li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-100%)}}`}</style>
    </section>
  )
}
