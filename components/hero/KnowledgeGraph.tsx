'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY, type SimulationNodeDatum } from 'd3'
import { links, nodes, type GraphNode } from '@/lib/data/graph'

type SimNode = GraphNode & SimulationNodeDatum
const W = 900
const H = 560

// Mise en page calculée une fois, de façon déterministe (positions initiales en spirale, pas d'aléatoire)
function layout() {
  const sim: SimNode[] = nodes.map((n, i) => {
    const a = i * 2.39996
    const r = 14 * Math.sqrt(i + 1)
    return { ...n, x: W / 2 + r * Math.cos(a), y: H / 2 + r * Math.sin(a) }
  })
  const simLinks = links.map(([source, target]) => ({ source, target }))
  forceSimulation(sim)
    .force('link', forceLink<SimNode, { source: string; target: string }>(simLinks).id((d) => d.id).distance(70).strength(0.7))
    .force('charge', forceManyBody().strength(-380))
    .force('center', forceCenter(W / 2, H / 2))
    .force('x', forceX(W / 2).strength(0.04))
    .force('y', forceY(H / 2).strength(0.11))
    .force('collide', forceCollide<SimNode>((d) => (d.kind === 'project' || d.kind === 'experience' ? 56 : 44)))
    .stop()
    .tick(400)
  const pos = new Map(sim.map((n) => [n.id, { x: Math.max(60, Math.min(W - 60, n.x!)), y: Math.max(30, Math.min(H - 30, n.y!)) }]))
  return pos
}

export default function KnowledgeGraph({ active, pulse }: { active: Set<string> | null; pulse: Set<string> | null }) {
  const pos = useMemo(layout, [])
  const reduce = useReducedMotion()
  const dim = (id: string) => (active && !active.has(id) ? 0.16 : 1)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full overflow-visible" role="img" aria-label="Graphe de mes projets, outils, lieux et résultats. Les réponses ci-contre en surlignent une partie.">
      <g>
        {links.map(([a, b], i) => {
          const pa = pos.get(a)!
          const pb = pos.get(b)!
          const on = active ? active.has(a) && active.has(b) : false
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={on ? 'rgb(var(--accent))' : 'rgb(var(--ink))'}
              strokeWidth={on ? 1.6 : 0.7}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: active ? (on ? 1 : 0.1) : 0.35 }}
              transition={{ pathLength: { duration: 0.9, delay: 0.2 + i * 0.02 }, opacity: { duration: 0.4 } }}
            />
          )
        })}
      </g>

      {nodes.map((n, i) => {
        const p = pos.get(n.id)!
        const hot = active?.has(n.id) ?? false
        const pulsing = pulse?.has(n.id) ?? false
        const big = n.kind === 'project' || n.kind === 'experience'
        const content = (
          <motion.g
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: dim(n.id) }}
            transition={{ duration: 0.4, delay: reduce ? 0 : active ? 0 : 0.5 + i * 0.025 }}
          >
            {pulsing && !reduce && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                fill="none"
                stroke="rgb(var(--accent))"
                initial={{ r: 6, opacity: 0.9 }}
                animate={{ r: 26, opacity: 0 }}
                transition={{ duration: 1.1, repeat: Infinity }}
              />
            )}
            {pulsing && reduce && <circle cx={p.x} cy={p.y} r={14} fill="none" stroke="rgb(var(--accent))" strokeWidth={2} />}

            {n.kind === 'place' ? (
              <rect x={p.x - 4} y={p.y - 4} width={8} height={8} fill="rgb(var(--paper))" stroke="rgb(var(--ink))" />
            ) : n.kind === 'result' ? (
              <rect x={p.x - 4} y={p.y - 4} width={8} height={8} transform={`rotate(45 ${p.x} ${p.y})`} fill="rgb(var(--accent))" />
            ) : (
              <circle
                cx={p.x}
                cy={p.y}
                r={big ? 7 : 3}
                fill={hot && big ? 'rgb(var(--accent))' : big ? 'rgb(var(--ink))' : 'rgb(var(--muted))'}
              />
            )}

            <text
              x={p.x + (big ? 12 : 8)}
              y={p.y + (big ? 5 : 3.5)}
              fill={n.kind === 'result' ? 'rgb(var(--accent))' : hot ? 'rgb(var(--ink))' : big ? 'rgb(var(--ink))' : 'rgb(var(--muted))'}
              className={big ? 'font-serif' : 'font-mono'}
              fontSize={big ? 19 : n.kind === 'result' ? 12 : 11}
              fontWeight={big && hot ? 600 : 400}
              style={{ textTransform: n.kind === 'place' ? 'uppercase' : undefined, letterSpacing: n.kind === 'place' ? '0.06em' : undefined }}
            >
              {n.label}
            </text>
          </motion.g>
        )
        return n.href ? (
          <Link key={n.id} href={n.href} aria-label={`Ouvrir : ${n.label}`}>
            {content}
          </Link>
        ) : (
          <g key={n.id}>{content}</g>
        )
      })}
    </svg>
  )
}
