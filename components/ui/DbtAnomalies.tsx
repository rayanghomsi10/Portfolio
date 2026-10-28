'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/*
 * Gros plan Orange : deux anomalies réelles rencontrées pendant la migration.
 * « Sans tests » reprend le scénario décrit dans le rapport pour l'ancien ordonnanceur
 * (valeurs NULL insérées en silence, repérées plus tard dans les rapports BI) ;
 * « Avec dbt » montre ce qui s'est passé : le test not_null échoue et la correction précède la production.
 */

type Mode = 'before' | 'dbt'

const W = 1000
const H = 290
const ROW_Y = [30, 160]
const BOX_H = 64

const CAUSES = [
  { label: 'Conversion de date', sub: 'TO_TIMESTAMP, comportement changé sous Spark 3' },
  { label: 'Date tirée du nom de fichier', sub: 'motif regex inadapté au format réel' },
]

const OUTCOMES: Record<Mode, { check: string; checkSub: string; end: string; endSub: string; bad: boolean; result: string }> = {
  before: {
    check: 'Aucun contrôle',
    checkSub: 'les NULL sont insérés en silence',
    end: 'Repéré plus tard',
    endSub: 'dans les rapports BI, en aval',
    bad: true,
    result: 'Erreur découverte en aval',
  },
  dbt: {
    check: 'Test not_null en échec',
    checkSub: 'dès la première exécution',
    end: 'Corrigé avant la production',
    endSub: 'correction versionnée dans Git',
    bad: false,
    result: '2 anomalies arrêtées avant la production',
  },
}

export default function DbtAnomalies() {
  const reduce = useReducedMotion()
  const [mode, setMode] = useState<Mode>('dbt')
  const o = OUTCOMES[mode]

  const box = (x: number, y: number, w: number, label: string, sub: string, style: 'plain' | 'bad' | 'good') => (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={BOX_H}
        fill={style === 'bad' ? 'rgb(var(--ink))' : style === 'good' ? 'rgb(var(--accent-soft))' : 'rgb(var(--paper))'}
        stroke={style === 'good' ? 'rgb(var(--accent))' : 'rgb(var(--ink))'}
        strokeWidth={style === 'good' ? 1.6 : 1}
      />
      <text x={x + 12} y={y + 26} className="font-serif" fontSize={15} fill={style === 'bad' ? 'rgb(var(--paper))' : 'rgb(var(--ink))'}>
        {label}
      </text>
      <text x={x + 12} y={y + 46} className="font-mono" fontSize={9.5} fill={style === 'bad' ? 'rgb(var(--paper) / 0.75)' : 'rgb(var(--muted))'}>
        {sub}
      </text>
    </g>
  )

  const arrow = (x1: number, x2: number, y: number) => (
    <path d={`M${x1} ${y} L${x2} ${y}`} stroke="rgb(var(--accent))" strokeWidth={1.5} markerEnd="url(#da-arrow)" />
  )

  return (
    <figure className="border border-ink bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-5 py-4 sm:px-8">
        <div>
          <span className="block font-mono text-[11px] uppercase tracking-wide text-accent">Gros plan · tests</span>
          <figcaption className="mt-1 font-serif text-2xl font-light leading-tight md:text-3xl" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
            Deux anomalies attrapées par un simple not_null
          </figcaption>
        </div>
        <div className="flex border border-ink" role="group" aria-label="Scénario">
          {(
            [
              ['before', 'Sans tests'],
              ['dbt', 'Avec dbt'],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${mode === m ? 'bg-ink text-paper' : 'hover:bg-accent-soft'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto px-3 py-6 sm:px-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full min-w-[760px]" role="img" aria-label={`${mode === 'dbt' ? 'Avec dbt' : 'Sans tests'} : ${o.result}`}>
          <defs>
            <marker id="da-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--accent))" />
            </marker>
          </defs>
          {CAUSES.map((c, i) => {
            const y = ROW_Y[i]
            const mid = y + BOX_H / 2
            return (
              <g key={c.label}>
                {box(10, y, 280, c.label, c.sub, 'plain')}
                {arrow(290, 325, mid)}
                {box(325, y, 150, 'Valeurs NULL', 'sur la colonne de date', 'plain')}
                {arrow(475, 510, mid)}
                <AnimatePresence mode="wait">
                  <motion.g
                    key={`${mode}-${i}`}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: reduce ? 0 : 0.1 + i * 0.15 }}
                  >
                    {box(510, y, 225, o.check, o.checkSub, o.bad ? 'bad' : 'good')}
                    {arrow(735, 770, mid)}
                    {box(770, y, 220, o.end, o.endSub, o.bad ? 'bad' : 'plain')}
                  </motion.g>
                </AnimatePresence>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink px-5 py-4 sm:px-8">
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Deux cas réels de la migration. Sans tests, ces NULL seraient passés en production et la dérive n’aurait été vue qu’en aval, dans les rapports BI ; avec dbt, le test not_null a échoué et chaque correction a précédé la mise en production.
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={o.result}
            className={`font-serif text-2xl font-light ${o.bad ? 'text-ink' : 'text-accent'}`}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {o.result}
          </motion.p>
        </AnimatePresence>
      </div>
    </figure>
  )
}
