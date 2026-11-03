import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const variants = {
  solid: 'bg-paper text-ink hover:bg-white',
  outline: 'border border-white/20 text-paper hover:border-white/50 hover:bg-white/[0.04]',
  'solid-dark': 'bg-ink text-paper hover:bg-black',
  'outline-dark': 'border border-black/20 text-ink hover:border-black/50 hover:bg-black/[0.03]',
}

/**
 * Pill button/link with a gentle magnetic pull on fine pointers.
 * Renders <a> when href is given, otherwise <button>.
 */
export default function Button({ href, variant = 'solid', icon: Icon, children, className = '', magnetic = true, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (!magnetic || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`group inline-flex h-12 select-none items-center justify-center gap-2.5 rounded-full px-6 text-sm font-medium tracking-tight transition-colors duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {Icon && (
        <Icon className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-px" strokeWidth={1.75} />
      )}
    </Tag>
  )
}
