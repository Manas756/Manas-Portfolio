import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { useActiveSection, useNavTheme } from '../hooks/useActiveSection'
import { scrollToId } from '../lib/scroll'
import MonogramMark from './ui/MonogramMark'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'

const ids = navItems.map((n) => n.id)

export default function Navbar({ visible }) {
  const active = useActiveSection(ids)
  const theme = useNavTheme()
  const [open, setOpen] = useState(false)
  const light = theme === 'light' && !open

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    // Let the menu close before scrolling so the scroll lock is released.
    setTimeout(() => scrollToId(id), 40)
  }

  const shell = light
    ? 'bg-bone/75 text-ink border-black/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]'
    : 'bg-coal/70 text-paper border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]'

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-4 sm:px-6 lg:justify-center lg:pt-5"
        initial={false}
        animate={visible ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: visible ? 0.5 : 0 }}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        {/* Desktop: one floating pill */}
        <nav
          aria-label="Primary"
          className={`hidden items-center gap-1 rounded-full border p-1.5 backdrop-blur-md transition-colors duration-500 lg:flex ${shell}`}
        >
          <a href="#home" onClick={go('home')} className="grid h-9 w-11 place-items-center rounded-full" aria-label="Manas Kapoor, back to top">
            <MonogramMark className="h-4 w-auto" tone={light ? 'solid' : 'chrome'} />
          </a>
          <span className={`mx-1 h-4 w-px ${light ? 'bg-black/15' : 'bg-white/15'}`} />
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={go(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-[13px] tracking-tight transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className={`absolute inset-0 rounded-full ${light ? 'bg-black/[0.07]' : 'bg-white/[0.09]'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            )
          })}
          <span className={`mx-1 h-4 w-px ${light ? 'bg-black/15' : 'bg-white/15'}`} />
          <span className="flex items-center gap-2 pl-2 pr-4 text-[12px] opacity-70" title={profile.availability}>
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-ember opacity-60 motion-reduce:hidden" />
              <span className="relative size-1.5 rounded-full bg-ember" />
            </span>
            Open to internships
          </span>
        </nav>

        {/* Mobile / tablet */}
        <a
          href="#home"
          onClick={go('home')}
          aria-label="Manas Kapoor, back to top"
          className={`grid h-11 w-14 place-items-center rounded-full border backdrop-blur-md transition-colors duration-500 lg:hidden ${shell}`}
        >
          <MonogramMark className="h-4 w-auto" tone={light ? 'solid' : 'chrome'} />
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`relative z-[56] flex h-11 items-center gap-3 rounded-full border px-5 text-sm backdrop-blur-md transition-colors duration-500 lg:hidden ${shell}`}
        >
          {open ? 'Close' : 'Menu'}
          {open ? <X className="size-4" strokeWidth={1.75} /> : <span className="flex flex-col gap-1"><span className="h-px w-4 bg-current" /><span className="h-px w-4 bg-current" /></span>}
        </button>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} go={go} active={active} />
    </>
  )
}

function MobileMenu({ open, onClose, go, active }) {
  const firstLink = useRef(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[55] flex flex-col bg-ink px-6 pb-8 pt-28 lg:hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1">
            {navItems.map((item, i) => (
              <motion.a
                key={item.id}
                ref={i === 0 ? firstLink : undefined}
                href={`#${item.id}`}
                onClick={go(item.id)}
                className="group flex items-baseline gap-4 py-1.5"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="label text-steel">0{i + 1}</span>
                <span
                  className={`font-wide text-[clamp(1.6rem,7.4vw,3.6rem)] font-semibold uppercase leading-none tracking-tight ${
                    active === item.id ? 'text-chrome' : 'text-paper'
                  }`}
                >
                  {item.label}
                </span>
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-white/10 pt-6 text-sm text-steel">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 text-paper">
              Email me <ArrowUpRight className="size-4" />
            </a>
            <div className="flex gap-5">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon className="size-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon className="size-5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
