import { motion, useTransform } from 'motion/react'
import { BrowserFrame, Shot, Step } from './primitives'
import ChessBoard from './ChessBoard'

export default function ShatranjMockup({ project, progress }) {
  const drift = useTransform(progress, [0, 1], ['4%', '-4%'])
  return (
    <div className="relative pb-6 pt-2 sm:pr-4">
      <motion.div style={{ y: drift }} className="w-[88%]">
        <BrowserFrame url={project.url} tone="dark">
          <Shot src={project.shots.primary} alt="ShatranjX landing page: Master the Game, with Play Online and Play vs AI" />
        </BrowserFrame>
      </motion.div>

      <Step
        progress={progress}
        at={0.04}
        y={40}
        className="relative -mt-[22%] ml-auto w-[56%] min-w-[220px] max-w-[420px] sm:-mt-[26%]"
      >
        <div className="rounded-2xl border border-black/10 bg-white p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)] sm:p-4">
          <div className="mb-3 flex items-center justify-between text-[11px] text-black/70 sm:text-xs">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-black" /> Stockfish
            </span>
            <span className="font-mono">vs</span>
            <span className="flex items-center gap-2">
              You <span className="size-2 rounded-full border border-black/40 bg-white" />
            </span>
          </div>
          <ChessBoard progress={progress} />
        </div>
      </Step>
    </div>
  )
}
