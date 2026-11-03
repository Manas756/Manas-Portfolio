import { useEffect, useState } from 'react'

/** Which nav section is in the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

/** Light/dark theme of whatever sits directly under the navbar (elements with data-nav). */
export function useNavTheme() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const els = document.querySelectorAll('[data-nav]')
      let current = 'dark'
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.top <= 36 && r.bottom > 36) current = el.dataset.nav
      }
      setTheme(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return theme
}
