import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

// A request's life, drawn the way I think about systems.
const nodes = [
  { id: 'client', x: 40, y: 60, label: 'client', sub: 'browser · desktop' },
  { id: 'api', x: 200, y: 60, label: 'api', sub: 'node · express' },
  { id: 'queue', x: 200, y: 190, label: 'queue', sub: 'jobs' },
  { id: 'worker', x: 40, y: 190, label: 'workers', sub: '× n' },
  { id: 'db', x: 200, y: 320, label: 'db', sub: 'postgres · mongo' },
  { id: 'cache', x: 40, y: 320, label: 'cache', sub: 'hot reads' },
]
const edges = [
  ['client', 'api'],
  ['api', 'queue'],
  ['queue', 'worker'],
  ['api', 'db'],
  ['worker', 'db'],
  ['db', 'cache'],
]

const pos = Object.fromEntries(nodes.map((n) => [n.id, n]))
const pathFor = ([a, b]) => {
  const A = pos[a]
  const B = pos[b]
  if (A.x === B.x || A.y === B.y) return `M${A.x + 60} ${A.y + 20} L${B.x + 60} ${B.y + 20}`
  const midY = (A.y + B.y) / 2 + 20
  return `M${A.x + 60} ${A.y + 20} L${A.x + 60} ${midY} L${B.x + 60} ${midY} L${B.x + 60} ${B.y + 20}`
}

export default function SystemDiagram() {
  const reduce = usePrefersReducedMotion()
  return (
    <figure className="relative rounded-2xl border border-white/10 bg-coal/60 p-5 sm:p-6">
      <div className="label flex items-center justify-between text-steel">
        <span>system.sketch</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ember" /> live
        </span>
      </div>
      <svg viewBox="0 0 320 380" className="mt-4 w-full" role="img" aria-label="Sketch of a backend: client, API, queue, workers, database and cache, with requests flowing between them.">
        {edges.map((e, i) => (
          <motion.path
            key={i}
            d={pathFor(e)}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            strokeDasharray="3 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: 'easeInOut' }}
          />
        ))}
        {!reduce &&
          edges.map((e, i) => (
            <circle key={`p${i}`} r="2.2" fill={i === 0 ? '#ff6a3d' : '#ecebe7'}>
              <animateMotion dur={`${2.4 + (i % 3) * 0.6}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" path={pathFor(e)} />
            </circle>
          ))}
        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
          >
            <rect x={n.x} y={n.y} width="120" height="40" rx="8" fill="#141416" stroke="rgba(255,255,255,0.14)" />
            <text x={n.x + 12} y={n.y + 17} fill="#ecebe7" fontSize="11" fontFamily="JetBrains Mono Variable, monospace">
              {n.label}
            </text>
            <text x={n.x + 12} y={n.y + 31} fill="#8a8e96" fontSize="8.5" fontFamily="JetBrains Mono Variable, monospace">
              {n.sub}
            </text>
          </motion.g>
        ))}
      </svg>
      <figcaption className="mt-4 border-t border-white/10 pt-4 font-mono text-[11px] leading-relaxed text-steel">
        <span className="text-paper/70">{'// '}</span>
        the interface is the part people see. the rest is where it either holds up or falls over.
      </figcaption>
    </figure>
  )
}
