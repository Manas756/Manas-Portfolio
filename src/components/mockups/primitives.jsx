import { motion, useTransform } from 'motion/react'
import { Lock } from 'lucide-react'

/**
 * Fades/slides children in as a shared progress value (0→1) passes `at`.
 * The showcase drives `progress` from scroll on desktop and from a timer on mobile.
 */
export function Step({ progress, at, span = 0.06, y = 18, x = 0, className = '', children, as = 'div', ...rest }) {
  const opacity = useTransform(progress, [at, at + span], [0, 1])
  const ty = useTransform(progress, [at, at + span], [y, 0])
  const tx = useTransform(progress, [at, at + span], [x, 0])
  const Comp = motion[as]
  return (
    <Comp style={{ opacity, y: ty, x: tx }} className={className} {...rest}>
      {children}
    </Comp>
  )
}

const tones = {
  light: {
    frame: 'bg-[#f6f6f4] border-black/10',
    bar: 'bg-[#ececea] border-black/[0.07]',
    url: 'bg-white text-black/55',
    dot: 'bg-black/15',
  },
  dark: {
    frame: 'bg-[#0f0f11] border-white/10',
    bar: 'bg-[#18181b] border-white/[0.06]',
    url: 'bg-white/[0.06] text-white/55',
    dot: 'bg-white/15',
  },
}

export function BrowserFrame({ url, tone = 'dark', className = '', children, aspect = '1425 / 900' }) {
  const t = tones[tone]
  return (
    <div
      className={`overflow-hidden rounded-[12px] border shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)] sm:rounded-[14px] ${t.frame} ${className}`}
    >
      <div className={`flex h-7 items-center gap-3 border-b px-3 sm:h-9 sm:px-4 ${t.bar}`}>
        <div className="flex gap-1.5">
          <span className={`size-2 rounded-full sm:size-2.5 ${t.dot}`} />
          <span className={`size-2 rounded-full sm:size-2.5 ${t.dot}`} />
          <span className={`size-2 rounded-full sm:size-2.5 ${t.dot}`} />
        </div>
        <div className={`mx-auto flex h-4.5 max-w-[60%] items-center gap-1.5 truncate rounded-md px-3 font-mono text-[9px] sm:h-6 sm:text-[11px] ${t.url}`}>
          <Lock className="size-2.5 shrink-0 sm:size-3" strokeWidth={2} />
          <span className="truncate">{url}</span>
        </div>
        <div className="w-10" />
      </div>
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        {children}
      </div>
    </div>
  )
}

export function Shot({ src, alt, className = '', style }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      width={1425}
      height={900}
      loading="lazy"
      decoding="async"
      draggable={false}
      style={style}
      className={`absolute inset-0 size-full object-cover object-top ${className}`}
    />
  )
}

export function IllustrativeTag({ className = '', children = 'Illustrative interface' }) {
  return (
    <span className={`label inline-flex items-center gap-2 text-[10px] opacity-60 ${className}`}>
      <span className="size-1 rounded-full bg-current" />
      {children}
    </span>
  )
}
