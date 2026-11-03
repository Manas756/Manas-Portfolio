import { motion, useTransform } from 'motion/react'
import { ImageIcon, ShieldCheck, Sparkles } from 'lucide-react'
import { BrowserFrame, Shot, Step } from './primitives'

const ACCENT = '#a78bfa'

// The escalation chain shown on the live site.
const tiers = [
  { name: 'Teacher', window: 'Hours 0–72' },
  { name: 'Faculty', window: 'Hours 72–144' },
  { name: 'Administration', window: 'Final authority' },
]

export default function CampusPulseMockup({ project, progress }) {
  const scan = useTransform(progress, [0.14, 0.32], ['0%', '100%'])
  const score = useTransform(progress, [0.2, 0.36], [0, 1])
  const chain = useTransform(progress, [0.5, 0.78], [0, 1])

  return (
    <div className="relative pb-24 pt-4 sm:pb-16 lg:pr-6">
      <BrowserFrame url={project.url} tone="dark">
        <Shot src={project.shots.primary} alt="CampusPulse landing page: Your Campus. Your Voice. Real Action." />
      </BrowserFrame>

      {/* AI triage card */}
      <Step progress={progress} at={0.08} x={24} y={0} className="absolute -right-1 top-[8%] w-[44%] max-w-[250px] sm:-right-4 lg:-right-8">
        <div className="rounded-xl border p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur" style={{ borderColor: `${ACCENT}40`, background: '#140f22ee' }}>
          <p className="flex items-center gap-1.5 text-[10px] font-medium sm:text-[11px]" style={{ color: '#d9ccff' }}>
            <Sparkles className="size-3" /> AI triage
          </p>
          <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-md bg-[linear-gradient(135deg,#2a2140,#171225)]">
            <ImageIcon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-white/20" />
            <motion.span className="absolute inset-x-0 h-px" style={{ top: scan, background: ACCENT }} />
          </div>
          <motion.div style={{ opacity: score }} className="mt-2.5">
            <div className="flex items-baseline justify-between text-[9px] text-white/55 sm:text-[10px]">
              <span>Risk score</span>
              <span className="font-mono text-white">0–100</span>
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-white/10">
              <motion.div className="h-1 origin-left rounded-full" style={{ scaleX: score, background: ACCENT }} />
            </div>
            <p className="mt-1.5 text-[9px] text-white/45 sm:text-[10px]">Hazards rise above routine requests</p>
          </motion.div>
        </div>
      </Step>

      {/* Escalation chain */}
      <Step progress={progress} at={0.44} y={24} className="absolute -bottom-2 left-0 w-[86%] max-w-[460px] sm:-left-4">
        <div className="rounded-xl border border-white/10 bg-[#0f0b19]/95 p-3.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:p-4">
          <div className="flex items-center justify-between">
            <p className="label text-[9px] text-white/50">72-hour escalation</p>
            <span className="flex items-center gap-1 text-[9px] text-white/50 sm:text-[10px]">
              <ShieldCheck className="size-3" /> Anonymous to all staff
            </span>
          </div>
          <div className="relative mt-3 grid grid-cols-3 gap-2">
            <span className="absolute left-[8%] right-[8%] top-[5px] h-px bg-white/10" />
            <motion.span className="absolute left-[8%] right-[8%] top-[5px] h-px origin-left" style={{ scaleX: chain, background: ACCENT }} />
            {tiers.map((t, i) => (
              <Step key={t.name} progress={progress} at={0.5 + i * 0.09} y={8} className="relative flex flex-col items-center text-center">
                <span className="size-[11px] rounded-full border-2" style={{ borderColor: ACCENT, background: i === 2 ? ACCENT : '#0f0b19' }} />
                <span className="mt-2 text-[10px] font-medium text-white sm:text-[12px]">{t.name}</span>
                <span className="font-mono text-[8px] text-white/45 sm:text-[9px]">{t.window}</span>
              </Step>
            ))}
          </div>
        </div>
      </Step>
    </div>
  )
}
