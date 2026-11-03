import { lazy, Suspense, useCallback, useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from '../lib/monogram'

const IntroScene = lazy(() => import('./IntroScene'))

const EASE = [0.16, 1, 0.3, 1]
// How long the mark holds before handing over to the homepage (seconds after it starts).
const DURATION = { '3d': 3.7, svg: 2.9, reduced: 0.35 }

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

function pickMode() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduced'
  const simple = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
  if (simple || !hasWebGL()) return 'svg'
  return '3d'
}

/**
 * Black screen → chrome MK emerges → hands over to the site.
 * onReveal fires when the hand-over starts (site fades in underneath),
 * onComplete when the overlay is fully gone and can unmount.
 */
export default function IntroAnimation({ onReveal, onComplete }) {
  const [mode, setMode] = useState(pickMode)
  const [ready, setReady] = useState(mode !== '3d')
  const [leaving, setLeaving] = useState(false)

  const leave = useCallback(() => setLeaving(true), [])

  useEffect(() => {
    if (leaving) onReveal?.()
  }, [leaving, onReveal])

  // Auto-advance once the mark is on screen.
  useEffect(() => {
    if (!ready) return
    const t = setTimeout(leave, DURATION[mode] * 1000)
    return () => clearTimeout(t)
  }, [ready, mode, leave])

  // Slow connection or GPU: if the 3D scene isn't up quickly, show the flat mark instead of a long black screen.
  useEffect(() => {
    if (mode !== '3d' || ready) return
    const t = setTimeout(() => {
      setMode('svg')
      setReady(true)
    }, 2200)
    return () => clearTimeout(t)
  }, [mode, ready])

  // Last-resort safety net: never trap anyone behind the intro.
  useEffect(() => {
    const t = setTimeout(leave, 9000)
    return () => clearTimeout(t)
  }, [leave])

  // Skippable by click, tap or any key. Scroll is deliberately not a skip: leftover
  // trackpad momentum from the previous page would end the intro before it starts.
  useEffect(() => {
    const armedAt = performance.now() + 400
    const skip = () => performance.now() > armedAt && leave()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [leave])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!leaving && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: mode === 'reduced' ? 0.3 : 1.1, ease: [0.65, 0, 0.35, 1] } }}
          aria-label="Intro"
          role="presentation"
        >
          <motion.div
            className="absolute inset-0"
            exit={{ scale: mode === 'reduced' ? 1 : 1.08, transition: { duration: 1.2, ease: EASE } }}
          >
            {mode === '3d' && (
              <Suspense fallback={null}>
                <IntroScene onReady={() => setReady(true)} />
              </Suspense>
            )}
            {mode !== '3d' && <FlatMark animated={mode === 'svg'} />}
          </motion.div>

          <button
            type="button"
            onClick={leave}
            className="label sr-only text-paper/60 focus:not-sr-only focus:absolute focus:bottom-6 focus:right-6"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Lightweight version for phones, tablets and reduced motion: a flat chrome mark with one light sweep. */
function FlatMark({ animated }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        className="pointer-events-none absolute size-[80vmin] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 62%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
      />
      <motion.svg
        viewBox={MONOGRAM_VIEWBOX}
        className="relative w-[34vmin] max-w-[220px]"
        initial={animated ? { opacity: 0, scale: 0.9, filter: 'blur(10px)' } : { opacity: 1 }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`c-${id}`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="#fafbfc" />
            <stop offset="0.4" stopColor="#b7bbc2" />
            <stop offset="0.5" stopColor="#53575e" />
            <stop offset="0.62" stopColor="#d8dbdf" />
            <stop offset="1" stopColor="#7f848c" />
          </linearGradient>
          <linearGradient id={`s-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`k-${id}`}>
            <path d={MONOGRAM_PATH} />
          </clipPath>
        </defs>
        <path d={MONOGRAM_PATH} fill={`url(#c-${id})`} />
        {animated && (
          <g clipPath={`url(#k-${id})`}>
            <motion.rect
              y="-1.5"
              width="0.7"
              height="3"
              fill={`url(#s-${id})`}
              transform="skewX(-18)"
              initial={{ x: -2.6 }}
              animate={{ x: 2.4 }}
              transition={{ duration: 1.5, delay: 1.1, ease: [0.65, 0, 0.35, 1] }}
            />
          </g>
        )}
      </motion.svg>
    </div>
  )
}
