import { motion, useTransform } from 'motion/react'
import { BrowserFrame, Shot, Step } from './primitives'

// Event tracks as listed on chaitanyahptu.dev
const tracks = ['Coding & Tech', 'Design & Innovation', 'Business & Debate', 'Esports', 'Cultural & Fun']

export default function ChaitanyaMockup({ project, progress }) {
  const zoom = useTransform(progress, [0, 1], [1.0, 1.08])
  const second = useTransform(progress, [0.34, 0.44], [0, 1])

  return (
    <div className="relative px-2 pb-10 pt-6 sm:px-6">
      <BrowserFrame url={project.url} tone="light">
        <Shot src={project.shots.primary} alt="Chaitanya 2K26 homepage with its 3D jellyfish hero" style={{ scale: zoom }} />
        <Shot src={project.shots.secondary} alt="Chaitanya 2K26 site scrolled to its typographic section" style={{ opacity: second, scale: zoom }} />
      </BrowserFrame>

      {/* Ticket stub */}
      <Step
        progress={progress}
        at={0.1}
        x={-20}
        className="absolute -bottom-2 left-0 w-[46%] min-w-[190px] max-w-[290px] sm:-left-4"
      >
        <div className="flex overflow-hidden rounded-xl bg-[#0b0b0d] text-[#efeef4] shadow-2xl">
          <div className="flex-1 p-3 sm:p-4">
            <p className="label text-[9px] text-white/50 sm:text-[10px]">Admit one · Chaitanya 2K26</p>
            <p className="font-condensed mt-1.5 text-2xl font-extrabold uppercase leading-none tracking-tight sm:text-3xl">
              21 events
            </p>
            <p className="font-condensed text-lg font-bold uppercase leading-tight text-[#f0a6d4] sm:text-xl">+ 2 workshops</p>
          </div>
          <div className="relative w-12 border-l border-dashed border-white/25 sm:w-14">
            <span className="absolute -left-2 -top-2 size-4 rounded-full bg-[#e3e2ea]" />
            <span className="absolute -bottom-2 -left-2 size-4 rounded-full bg-[#e3e2ea]" />
            <span className="label absolute inset-0 grid place-items-center text-[9px] text-white/60 [writing-mode:vertical-rl]">
              HPTU · HAMIRPUR
            </span>
          </div>
        </div>
      </Step>

      {/* Dates */}
      <Step progress={progress} at={0.2} y={-16} className="absolute -top-1 right-2 sm:-right-2">
        <div className="rounded-full bg-white px-4 py-2 text-[11px] font-medium text-black shadow-xl sm:text-xs">
          30 Oct – 1 Nov 2026
        </div>
      </Step>

      {/* Tracks */}
      <Step progress={progress} at={0.5} x={20} className="absolute -right-1 bottom-12 hidden w-[200px] sm:block xl:-right-6">
        <div className="rounded-xl border border-black/10 bg-white/90 p-3 shadow-xl backdrop-blur">
          <p className="label mb-2 text-[9px] text-black/50">Event tracks</p>
          <ul className="space-y-1">
            {tracks.map((t, i) => (
              <Step as="li" key={t} progress={progress} at={0.52 + i * 0.03} y={6} className="flex items-center justify-between text-[12px] text-black">
                {t}
                <span className="size-1.5 rounded-full bg-[#d24fa0]" style={{ opacity: 1 - i * 0.15 }} />
              </Step>
            ))}
          </ul>
        </div>
      </Step>

      <Step progress={progress} at={0.68} className="absolute bottom-[-6px] right-[40%] hidden sm:block">
        <div className="flex items-center gap-2 rounded-full bg-[#0b0b0d] px-3 py-1.5 text-[11px] text-white shadow-xl">
          <motion.span className="size-1.5 rounded-full bg-emerald-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
          Deployed · live in production
        </div>
      </Step>
    </div>
  )
}
