import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/** Cycles through lines in place. All lines share one grid cell so the height never jumps. */
export default function RotatingText({ lines, interval = 3400, active = true, className = '' }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!active) return
    const t = setInterval(() => setI((n) => (n + 1) % lines.length), interval)
    return () => clearInterval(t)
  }, [active, interval, lines.length])

  return (
    <span className={`relative grid ${className}`} aria-live="polite">
      {lines.map((l) => (
        <span key={l} className="invisible col-start-1 row-start-1" aria-hidden="true">
          {l}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={lines[i]}
          className="col-start-1 row-start-1"
          initial={{ opacity: 0, y: '0.45em', filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-0.45em', filter: 'blur(8px)' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {lines[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
