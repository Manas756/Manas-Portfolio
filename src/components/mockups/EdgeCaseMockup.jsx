import { motion, useTransform } from 'motion/react'
import { BrowserFrame, Shot, Step } from './primitives'

// The request path a submission takes, per the project's README.
const pipeline = [
  { k: 'POST', v: '/api/arena/[id]/submit' },
  { k: 'AUTH', v: 'HMAC-signed session verified' },
  { k: 'RULES', v: 'services.ts · timer, entry, block' },
  { k: 'JUDGE', v: 'JudgeAdapter → Judge0 sandbox' },
  { k: 'SCORE', v: 'ICPC penalty · leaderboard' },
]

const verdicts = ['AC', 'WA', 'TLE', 'MLE', 'CE', 'RE']

export default function EdgeCaseMockup({ project, progress }) {
  const line = useTransform(progress, [0.12, 0.5], [0, 1])
  const lift = useTransform(progress, [0, 1], ['0%', '-6%'])

  return (
    <div className="relative pb-16 pt-4 sm:pb-20 lg:pl-10">
      <motion.div style={{ y: lift }}>
        <BrowserFrame url={project.url} tone="light">
          <Shot src={project.shots.primary} alt="EdgeCase landing page: 'Where algorithms meet their breaking points'" />
        </BrowserFrame>
      </motion.div>

      {/* Submission pipeline */}
      <Step
        progress={progress}
        at={0.08}
        x={-24}
        className="absolute -bottom-2 left-0 w-[78%] max-w-[360px] sm:-left-2"
      >
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4 font-mono text-[10.5px] text-white/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:text-[11.5px]">
          <div className="mb-3 flex items-center justify-between">
            <span className="label text-[9px] text-white/45">submission.lifecycle</span>
            <span className="text-white/35">01 → 05</span>
          </div>
          <div className="relative pl-5">
            <span className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10" />
            <motion.span className="absolute left-[5px] top-2 w-px origin-top bg-white" style={{ scaleY: line, bottom: 8 }} />
            {pipeline.map((p, i) => (
              <Step key={p.k} progress={progress} at={0.14 + i * 0.075} y={8} className="relative flex gap-3 py-1">
                <span className="absolute -left-5 top-[9px] size-[11px] rounded-full border border-white/40 bg-[#0d0d0d]" />
                <span className="w-11 shrink-0 text-white/40">{p.k}</span>
                <span className="truncate">{p.v}</span>
              </Step>
            ))}
          </div>
          <Step progress={progress} at={0.56} y={6} className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-white">✓ Accepted</span>
            <span className="text-white/40">hidden tests never leave the server</span>
          </Step>
        </div>
      </Step>

      {/* Verdict legend */}
      <Step progress={progress} at={0.62} y={-14} className="absolute -top-3 right-0 hidden sm:block lg:-right-4">
        <div className="rounded-lg border border-black/10 bg-white px-3 py-2.5 shadow-xl">
          <p className="label mb-1.5 text-[9px] text-black/45">Verdicts</p>
          <div className="flex gap-1">
            {verdicts.map((v, i) => (
              <span
                key={v}
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${i === 0 ? 'bg-black text-white' : 'bg-black/[0.06] text-black/70'}`}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </Step>
    </div>
  )
}
