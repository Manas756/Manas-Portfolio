import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'
import { scrollToId } from '../lib/scroll'
import MonogramMark from './ui/MonogramMark'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer data-nav="dark" className="bg-ink">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-6 border-t border-white/10 px-5 py-8 text-[13px] text-steel sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex items-center gap-3">
          <MonogramMark className="h-3.5 w-auto" />
          <span>© {YEAR} {profile.name}</span>
        </div>
        <p className="font-mono text-[11px]">Built with React, GSAP, Motion & Three.js · Hamirpur, Himachal Pradesh</p>
        <button type="button" onClick={() => scrollToId('home')} className="group flex items-center gap-2 transition-colors hover:text-paper">
          Back to top
          <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  )
}
