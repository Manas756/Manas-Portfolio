import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent } from 'motion/react'
import { Code2, Music2, Search } from 'lucide-react'
import { IllustrativeTag, Step } from './primitives'

const GOLD = '#e2b04a'

// Voice interactions from the ROG README, played in order as you scroll.
const stages = [
  { at: 0, state: 'idle', said: null, status: 'Listening for “ROG”' },
  { at: 0.1, state: 'heard', said: '“ROG, start LeetCode mode”', status: 'Understanding…' },
  { at: 0.2, state: 'act', said: '“ROG, start LeetCode mode”', status: 'Opening LeetCode and YouTube Music…' },
  { at: 0.38, state: 'heard', said: '“ROG, open my Rocket.Chat project”', status: 'Understanding…' },
  { at: 0.46, state: 'act', said: '“ROG, open my Rocket.Chat project”', status: 'Opening in VS Code…' },
  { at: 0.62, state: 'confirm', said: '“ROG, shut down”', status: 'Shut down in 10 s?' },
  { at: 0.8, state: 'idle', said: null, status: 'Cancelled. Listening for “ROG”' },
]

function useStage(progress) {
  const [i, setI] = useState(0)
  useMotionValueEvent(progress, 'change', (v) => {
    let n = 0
    stages.forEach((s, k) => v >= s.at && (n = k))
    setI((p) => (p === n ? p : n))
  })
  return stages[i]
}

export default function RogMockup({ progress }) {
  const stage = useStage(progress)

  return (
    <div className="relative pb-6 pt-2">
      <div className="rounded-[18px] border border-white/10 bg-[#100e0b] p-2 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] sm:rounded-[22px] sm:p-2.5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] sm:rounded-[14px]">
          {/* Wallpaper */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(110% 80% at 50% -10%, #2a2318 0%, transparent 55%), radial-gradient(80% 70% at 0% 110%, #1b1a17 0%, transparent 60%), linear-gradient(180deg, #0e0d0b, #080807)',
            }}
          />

          {/* Windows ROG opens */}
          <Step progress={progress} at={0.22} y={24} className="absolute left-[5%] top-[30%] w-[46%]">
            <AppWindow title="LeetCode · Brave" icon={Search}>
              <div className="space-y-1.5">
                <div className="h-1.5 w-2/3 rounded bg-white/25" />
                <div className="h-1.5 w-1/2 rounded bg-white/10" />
                <div className="mt-2 grid grid-cols-3 gap-1">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="h-5 rounded bg-white/[0.06]" />
                  ))}
                </div>
              </div>
            </AppWindow>
          </Step>
          <Step progress={progress} at={0.27} y={24} className="absolute right-[6%] top-[42%] w-[30%]">
            <AppWindow title="YouTube Music" icon={Music2}>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded bg-white/10" />
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-3/4 rounded bg-white/25" />
                  <div className="h-1 w-full rounded bg-white/10">
                    <div className="h-1 w-1/3 rounded" style={{ background: GOLD }} />
                  </div>
                </div>
              </div>
            </AppWindow>
          </Step>
          <Step progress={progress} at={0.48} y={24} className="absolute bottom-[7%] left-[20%] w-[52%]">
            <AppWindow title="Rocket.Chat · VS Code" icon={Code2}>
              <div className="space-y-1 font-mono text-[7px] leading-tight text-white/40 sm:text-[9px]">
                <p>
                  <span style={{ color: GOLD }}>import</span> {'{ Meteor }'} from 'meteor/meteor'
                </p>
                <p className="pl-3">…</p>
              </div>
            </AppWindow>
          </Step>

          {/* The orb, top centre */}
          <div className="absolute left-1/2 top-[6%] flex -translate-x-1/2 flex-col items-center">
            <Orb state={stage.state} />
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.status + stage.said}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.3 }}
                className="mt-2 flex flex-col items-center gap-1 text-center"
              >
                {stage.said && <span className="whitespace-nowrap text-[9px] text-white/85 sm:text-[12px]">{stage.said}</span>}
                <span className="whitespace-nowrap font-mono text-[7.5px] text-white/45 sm:text-[10px]">{stage.status}</span>
                {stage.state === 'confirm' && (
                  <span className="mt-1 flex gap-1.5">
                    <span className="rounded-full border border-white/20 px-2 py-0.5 text-[8px] text-white/80 sm:text-[10px]">yes</span>
                    <span className="rounded-full px-2 py-0.5 text-[8px] text-black sm:text-[10px]" style={{ background: GOLD }}>
                      no
                    </span>
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Taskbar */}
          <div className="absolute inset-x-0 bottom-0 flex h-5 items-center justify-center gap-1.5 bg-black/40 sm:h-6">
            {[0, 1, 2, 3, 4].map((k) => (
              <span key={k} className="size-2.5 rounded-[3px] bg-white/15 sm:size-3" />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto h-5 w-[18%] bg-gradient-to-b from-[#1a1712] to-[#0d0c0a] [clip-path:polygon(12%_0,88%_0,100%_100%,0_100%)]" />
      <div className="mx-auto h-1.5 w-[30%] rounded-full bg-[#191712]" />
      <IllustrativeTag className="mt-4">Illustrative recreation · commands from the project README</IllustrativeTag>
    </div>
  )
}

function Orb({ state }) {
  const active = state === 'heard' || state === 'act'
  return (
    <span className="relative grid size-8 place-items-center sm:size-11">
      {active &&
        [0, 1, 2].map((k) => (
          <motion.span
            key={k}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: GOLD }}
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, delay: k * 0.6, ease: 'easeOut' }}
          />
        ))}
      <motion.span
        className="size-3.5 rounded-full sm:size-5"
        style={{ background: `radial-gradient(circle at 35% 30%, #fff6dc, ${GOLD} 55%, #8a6420)` }}
        animate={{ scale: active ? 1.15 : state === 'confirm' ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
      />
      <span className="absolute -bottom-1 size-[3px] rounded-full bg-white/40" />
    </span>
  )
}

function AppWindow({ title, icon: Icon, children }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#141310]/95 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-2 py-1 sm:px-2.5 sm:py-1.5">
        <Icon className="size-2.5 text-white/40 sm:size-3" />
        <span className="truncate text-[7.5px] text-white/50 sm:text-[9px]">{title}</span>
      </div>
      <div className="p-2 sm:p-2.5">{children}</div>
    </div>
  )
}
