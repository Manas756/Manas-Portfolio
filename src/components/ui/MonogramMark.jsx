import { useId } from 'react'
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from '../../lib/monogram'

/** Flat chrome MK mark for the nav, footer and the mobile intro. */
export default function MonogramMark({ className = 'h-6 w-auto', tone = 'chrome', title, ...props }) {
  const id = useId().replace(/:/g, '')
  const fill = tone === 'chrome' ? `url(#mk-${id})` : 'currentColor'
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      {tone === 'chrome' && (
        <defs>
          <linearGradient id={`mk-${id}`} x1="0" y1="0" x2="0.25" y2="1">
            <stop offset="0" stopColor="#fbfbfc" />
            <stop offset="0.42" stopColor="#b5b9c0" />
            <stop offset="0.5" stopColor="#5f636a" />
            <stop offset="0.6" stopColor="#d4d7dc" />
            <stop offset="1" stopColor="#8d929a" />
          </linearGradient>
        </defs>
      )}
      <path d={MONOGRAM_PATH} fill={fill} />
    </svg>
  )
}
