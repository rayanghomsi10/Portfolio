'use client'

import { motion, useReducedMotion, type MotionProps } from 'framer-motion'
import { architectures, type ArchFrame, type ArchNode } from '@/lib/data/architectures'

/*
 * Planche technique : le schéma se trace à l'entrée dans l'écran (cadres, puis nœuds, puis flux),
 * dans la couleur de l'univers courant. Une fois tracés, les flux continuent de circuler.
 */

const W = 1000
const H = 360
const NODE_H = 56
const EASE = [0.22, 1, 0.36, 1] as const

type Box = { x: number; y: number; w: number; h: number }
const box = (n: ArchNode | ArchFrame): Box => ({ x: n.x, y: n.y, w: n.w, h: 'h' in n && n.h ? n.h : NODE_H })

// Relie deux boîtes par une courbe, du côté qui les sépare le plus
function path(a: Box, b: Box) {
  const horizontal = b.x >= a.x + a.w - 1 || b.x + b.w <= a.x + 1
  if (horizontal) {
    const right = b.x >= a.x + a.w - 1
    const x1 = right ? a.x + a.w : a.x
    const x2 = right ? b.x : b.x + b.w
    const y1 = a.y + a.h / 2
    const y2 = b.y + b.h / 2
    const dx = (x2 - x1) / 2
    return `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
  }
  const down = b.y > a.y
  const x1 = a.x + a.w / 2
  const x2 = b.x + b.w / 2
  const y1 = down ? a.y + a.h : a.y
  const y2 = down ? b.y : b.y + b.h
  const dy = (y2 - y1) / 2
  return `M${x1} ${y1} C${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`
}

export default function ArchitectureDiagram({ id }: { id: string }) {
  const reduce = useReducedMotion()
  const arch = architectures[id]
  if (!arch) return null

  const boxes = new Map<string, Box>([
    ...arch.nodes.map((n) => [n.id, box(n)] as const),
    ...(arch.frames ?? []).map((f) => [f.id, box(f)] as const),
  ])
  const nodeDelay = (i: number) => 0.25 + i * 0.07
  const edgeDelay = (i: number) => 0.25 + arch.nodes.length * 0.07 + i * 0.12
  const anim = (from: Record<string, number>, to: Record<string, number>, delay: number, duration = 0.5): MotionProps =>
    reduce
      ? {}
      : { initial: from, whileInView: to, viewport: { once: true, margin: '-80px' }, transition: { duration, delay, ease: EASE } }

  return (
    <figure className="border border-ink bg-surface">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink px-5 py-4 sm:px-8">
        <figcaption className="font-serif text-2xl font-light leading-tight md:text-3xl" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
          {arch.title}
        </figcaption>
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent">Planche technique</span>
      </div>

      <div className="overflow-x-auto px-3 py-6 sm:px-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full min-w-[760px]" role="img" aria-label={`${arch.title}. ${arch.caption}`}>
          <defs>
            <marker id={`arrow-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--accent))" />
            </marker>
          </defs>

          {/* Cadres */}
          {(arch.frames ?? []).map((f) => (
            <motion.g key={f.id} {...anim({ opacity: 0 }, { opacity: 1 }, 0.05, 0.6)}>
              <rect x={f.x} y={f.y} width={f.w} height={f.h} fill="none" stroke="rgb(var(--accent))" strokeWidth={1} strokeDasharray="5 5" />
              <rect x={f.x + 10} y={f.y - 9} width={f.label.length * 6.6 + 14} height={18} fill="rgb(var(--surface))" />
              <text x={f.x + 17} y={f.y + 4} className="font-mono" fontSize={11} fill="rgb(var(--accent))">
                {f.label}
              </text>
            </motion.g>
          ))}

          {/* Flux */}
          {arch.edges.map(([a, b], i) => {
            const d = path(boxes.get(a)!, boxes.get(b)!)
            return (
              <g key={`${a}-${b}`}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="rgb(var(--accent))"
                  strokeWidth={1.5}
                  markerEnd={`url(#arrow-${id})`}
                  {...anim({ pathLength: 0, opacity: 0 }, { pathLength: 1, opacity: 1 }, edgeDelay(i), 0.6)}
                />
                {/* Après le tracé, des tirets circulent le long du flux */}
                <motion.path d={d} fill="none" stroke="rgb(var(--paper))" strokeWidth={1.5} className="flow" {...anim({ opacity: 0 }, { opacity: 0.8 }, edgeDelay(i) + 0.7, 0.4)} />
              </g>
            )
          })}

          {/* Nœuds */}
          {arch.nodes.map((n, i) => {
            const bx = boxes.get(n.id)!
            return (
              <motion.g key={n.id} {...anim({ opacity: 0, y: 10 }, { opacity: 1, y: 0 }, nodeDelay(i))}>
                <rect
                  x={bx.x}
                  y={bx.y}
                  width={bx.w}
                  height={bx.h}
                  fill={n.key ? 'rgb(var(--accent-soft))' : 'rgb(var(--paper))'}
                  stroke={n.key ? 'rgb(var(--accent))' : 'rgb(var(--ink))'}
                  strokeWidth={n.key ? 1.6 : 1}
                />
                <text x={bx.x + 12} y={bx.y + (n.sub ? 24 : bx.h / 2 + 6)} className="font-serif" fontSize={16} fill="rgb(var(--ink))">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={bx.x + 12} y={bx.y + 42} className="font-mono" fontSize={10} fill="rgb(var(--muted))">
                    {n.sub}
                  </text>
                )}
              </motion.g>
            )
          })}
        </svg>
      </div>

      <p className="border-t border-ink px-5 py-4 text-sm leading-relaxed text-muted sm:px-8">{arch.caption}</p>
    </figure>
  )
}
