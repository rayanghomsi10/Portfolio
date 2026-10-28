'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { skillGroups } from '@/lib/data/experience'
import { skillUsage, usageTargets } from '@/lib/data/skills'

/*
 * Matrice de preuves : projets en lignes (chacun dans la couleur de son univers),
 * outils en colonnes, une case pleine pour chaque usage réel.
 * Survol : viseur ligne/colonne. Clic colonne : preuve de l'outil. Clic ligne : filtre par projet.
 */

const LABEL_W = 190
const COL_W = 24
const GROUP_GAP = 14
const TOP = 132
const ROW_H = 34

// Seuls les outils illustrés sur le site entrent dans la matrice, regroupés par famille
const columns = (() => {
  const cols: { skill: string; group: number; x: number }[] = []
  let x = LABEL_W
  skillGroups.forEach((g, gi) => {
    const proven = g.items.filter((s) => (skillUsage[s] ?? []).length > 0)
    if (!proven.length) return
    proven.forEach((s) => {
      cols.push({ skill: s, group: gi, x })
      x += COL_W
    })
    x += GROUP_GAP
  })
  return { cols, width: x }
})()

const H = TOP + usageTargets.length * ROW_H + 12

interface Props {
  selected: string | null
  hovered: string | null
  target: string | null
  hoverRow: string | null
  onSelect: (skill: string) => void
  onHover: (skill: string | null) => void
  onTarget: (id: string) => void
  onHoverRow: (id: string | null) => void
}

export default function ProofMatrix({ selected, hovered, target, hoverRow, onSelect, onHover, onTarget, onHoverRow }: Props) {
  const reduce = useReducedMotion()
  const activeCol = hovered ?? selected
  const activeRow = hoverRow ?? target

  return (
    <svg
      viewBox={`0 0 ${columns.width} ${H}`}
      className="block w-full min-w-[860px]"
      role="img"
      aria-label="Matrice des outils et des projets où ils ont servi"
      onMouseLeave={() => {
        onHover(null)
        onHoverRow(null)
      }}
    >
      {/* Bandes du viseur */}
      {usageTargets.map((t, ri) =>
        activeRow === t.id ? (
          <rect key={t.id} data-universe={t.universe} x={0} y={TOP + ri * ROW_H} width={columns.width} height={ROW_H} fill="rgb(var(--accent-soft))" />
        ) : null
      )}
      {columns.cols.map((c) =>
        activeCol === c.skill ? (
          <rect key={c.skill} x={c.x} y={0} width={COL_W} height={H} fill="rgb(var(--ink) / 0.07)" />
        ) : null
      )}

      {/* Libellés des outils, inclinés */}
      {columns.cols.map((c) => {
        const on = activeCol === c.skill
        return (
          <text
            key={c.skill}
            transform={`translate(${c.x + COL_W / 2 + 4} ${TOP - 10}) rotate(-58)`}
            className="font-mono"
            fontSize={11}
            fill={on ? 'rgb(var(--ink))' : 'rgb(var(--muted))'}
            fontWeight={on ? 700 : 400}
          >
            {c.skill}
          </text>
        )
      })}

      {/* Lignes : projets et expériences */}
      {usageTargets.map((t, ri) => {
        const y = TOP + ri * ROW_H
        const on = activeRow === t.id
        return (
          <g key={t.id} data-universe={t.universe}>
            <line x1={0} y1={y} x2={columns.width} y2={y} stroke="rgb(var(--line))" strokeWidth={1} />
            <text x={0} y={y + ROW_H / 2 + 6} className="font-serif" fontSize={17} fill={on ? 'rgb(var(--accent))' : 'rgb(var(--ink))'} fontWeight={on ? 600 : 400}>
              {t.label}
            </text>
            {columns.cols.map((c, ci) => {
              const used = skillUsage[c.skill]?.includes(t.id)
              const cx = c.x + COL_W / 2
              const cy = y + ROW_H / 2
              if (!used) return <circle key={c.skill} cx={cx} cy={cy} r={1.4} fill="rgb(var(--line))" />
              const lit = activeCol === c.skill || on
              return (
                <motion.rect
                  key={c.skill}
                  x={cx - 7}
                  y={cy - 7}
                  width={14}
                  height={14}
                  fill="rgb(var(--accent))"
                  stroke={lit ? 'rgb(var(--ink))' : 'none'}
                  strokeWidth={1.5}
                  style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'view-box' }}
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: lit ? 1.15 : 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: reduce ? 0 : ci * 0.025 + ri * 0.04 }}
                />
              )
            })}
            {/* Zone de clic de la ligne (libellé) */}
            <rect
              x={0}
              y={y}
              width={LABEL_W - 8}
              height={ROW_H}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => {
                onHover(null)
                onHoverRow(t.id)
              }}
              onMouseLeave={() => onHoverRow(null)}
              onClick={() => onTarget(t.id)}
            />
          </g>
        )
      })}
      <line x1={0} y1={H - 12} x2={columns.width} y2={H - 12} stroke="rgb(var(--ink))" strokeWidth={1} />

      {/* Zones de clic des colonnes */}
      {columns.cols.map((c) => (
        <rect
          key={c.skill}
          x={c.x}
          y={0}
          width={COL_W}
          height={H}
          fill="transparent"
          className="cursor-pointer"
          onMouseEnter={() => {
            onHoverRow(null)
            onHover(c.skill)
          }}
          onClick={() => onSelect(c.skill)}
        />
      ))}
    </svg>
  )
}
