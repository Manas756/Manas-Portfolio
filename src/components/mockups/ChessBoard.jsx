import { useMemo, useState } from 'react'
import { motion, useMotionValueEvent } from 'motion/react'

const FILES = 'abcdefgh'
// Glyphs with a text-presentation selector so no platform renders them as emoji.
const GLYPH = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' }
const BACK = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']

// Italian Game, Classical — a quiet, well-known line that reads nicely in motion.
const MOVES = [
  ['e2', 'e4', 'e4'],
  ['e7', 'e5', 'e5'],
  ['g1', 'f3', 'Nf3'],
  ['b8', 'c6', 'Nc6'],
  ['f1', 'c4', 'Bc4'],
  ['f8', 'c5', 'Bc5'],
  ['c2', 'c3', 'c3'],
  ['g8', 'f6', 'Nf6'],
  ['d2', 'd4', 'd4'],
  ['e5', 'd4', 'exd4'],
  ['c3', 'd4', 'cxd4'],
  ['c5', 'b4', 'Bb4+'],
]

function initialPieces() {
  const pieces = []
  for (let f = 0; f < 8; f++) {
    const file = FILES[f]
    pieces.push({ id: `w${BACK[f]}${file}`, color: 'w', type: BACK[f], sq: `${file}1` })
    pieces.push({ id: `wp${file}`, color: 'w', type: 'p', sq: `${file}2` })
    pieces.push({ id: `bp${file}`, color: 'b', type: 'p', sq: `${file}7` })
    pieces.push({ id: `b${BACK[f]}${file}`, color: 'b', type: BACK[f], sq: `${file}8` })
  }
  return pieces
}

function positionAfter(ply) {
  const pieces = initialPieces().map((p) => ({ ...p, alive: true }))
  for (let i = 0; i < ply; i++) {
    const [from, to] = MOVES[i]
    const victim = pieces.find((p) => p.alive && p.sq === to)
    if (victim) victim.alive = false
    const mover = pieces.find((p) => p.alive && p.sq === from)
    if (mover) mover.sq = to
  }
  return pieces
}

const toXY = (sq) => ({ x: FILES.indexOf(sq[0]), y: 8 - Number(sq[1]) })

/** A board that plays through MOVES as `progress` advances. */
export default function ChessBoard({ progress, start = 0.08, end = 0.78 }) {
  const [ply, setPly] = useState(0)
  useMotionValueEvent(progress, 'change', (v) => {
    const n = Math.max(0, Math.min(MOVES.length, Math.floor(((v - start) / (end - start)) * (MOVES.length + 1))))
    setPly((p) => (p === n ? p : n))
  })
  const pieces = useMemo(() => positionAfter(ply), [ply])
  const last = ply > 0 ? MOVES[ply - 1] : null

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-[6px] ring-1 ring-black/20">
        <div className="grid size-full grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }, (_, i) => {
            const x = i % 8
            const y = Math.floor(i / 8)
            const sq = `${FILES[x]}${8 - y}`
            const dark = (x + y) % 2 === 1
            const hl = last && (last[0] === sq || last[1] === sq)
            return (
              <div key={sq} className="relative" style={{ background: dark ? '#7b7973' : '#eeede8' }}>
                {hl && <div className="absolute inset-0 bg-[#d6b247]/55" />}
                {x === 0 && (
                  <span className={`absolute left-[3px] top-[1px] font-mono text-[7px] sm:text-[9px] ${dark ? 'text-white/70' : 'text-black/45'}`}>{8 - y}</span>
                )}
                {y === 7 && (
                  <span className={`absolute bottom-0 right-[3px] font-mono text-[7px] sm:text-[9px] ${dark ? 'text-white/70' : 'text-black/45'}`}>{FILES[x]}</span>
                )}
              </div>
            )
          })}
        </div>
        {pieces.map((p) => {
          const { x, y } = toXY(p.sq)
          return (
            <motion.span
              key={p.id}
              className="absolute grid size-[12.5%] select-none place-items-center leading-none"
              initial={false}
              animate={{ left: `${x * 12.5}%`, top: `${y * 12.5}%`, opacity: p.alive ? 1 : 0, scale: p.alive ? 1 : 0.6 }}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
              style={{
                fontSize: 'min(5.2vw, 2.6rem)',
                fontFamily: '"Segoe UI Symbol","Noto Sans Symbols 2","DejaVu Sans","Apple Symbols",serif',
                color: p.color === 'w' ? '#ffffff' : '#0d0d0d',
                textShadow:
                  p.color === 'w'
                    ? '0 0 1px #000, 0 0 1px #000, 0 1px 1px rgba(0,0,0,.6)'
                    : '0 0 1px rgba(255,255,255,.7), 0 1px 1px rgba(0,0,0,.35)',
              }}
              aria-hidden="true"
            >
              {GLYPH[p.type]}
              {'︎'}
            </motion.span>
          )
        })}
      </div>
      <ol className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10px] sm:text-[11px]" aria-label="Moves played">
        {MOVES.map((m, i) => (
          <li key={i} className={`transition-opacity duration-300 ${i < ply ? 'opacity-100' : 'opacity-25'} ${i === ply - 1 ? 'font-semibold' : ''}`}>
            {i % 2 === 0 && <span className="opacity-50">{i / 2 + 1}.</span>}
            {m[2]}
          </li>
        ))}
      </ol>
    </div>
  )
}
