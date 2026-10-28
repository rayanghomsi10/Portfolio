'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/*
 * Gros plan Colorfol : deux notifications de paiement arrivent pour le même achat.
 * « Sans verrou » montre le doublon que le code évite ; « Avec verrou » montre ce qu'il fait :
 * la première prend un verrou sur l'achat, la seconde attend puis trouve le bonus déjà créé.
 */

type Step = { lane: 0 | 1; x: number; label: string; sub?: string; bad?: boolean }

const W = 1000
const H = 300
const LANE_Y = [62, 192]
const BOX_W = 150
const BOX_H = 52

const SCENARIOS: Record<'lock' | 'nolock', { steps: Step[]; result: string; bad: boolean }> = {
  lock: {
    steps: [
      { lane: 0, x: 160, label: 'Paiement notifié' },
      { lane: 0, x: 330, label: 'Prend le verrou', sub: 'sur l’achat' },
      { lane: 0, x: 500, label: 'Aucun bonus', sub: '→ création' },
      { lane: 0, x: 670, label: 'Relâche le verrou' },
      { lane: 0, x: 840, label: 'E-mail du bonus', sub: 'après le verrou' },
      { lane: 1, x: 240, label: 'Même notification', sub: 'reçue en double' },
      { lane: 1, x: 840, label: 'Bonus déjà là', sub: '→ arrêt' },
    ],
    result: '1 bonus, 1 e-mail',
    bad: false,
  },
  nolock: {
    steps: [
      { lane: 0, x: 160, label: 'Paiement notifié' },
      { lane: 0, x: 330, label: 'Aucun bonus trouvé' },
      { lane: 0, x: 500, label: 'Création', sub: 'bonus n° 1' },
      { lane: 0, x: 670, label: 'E-mail du bonus' },
      { lane: 1, x: 240, label: 'Même notification', sub: 'reçue en double' },
      { lane: 1, x: 410, label: 'Aucun bonus trouvé', sub: 'n° 1 pas encore créé' },
      { lane: 1, x: 580, label: 'Création', sub: 'bonus n° 2', bad: true },
      { lane: 1, x: 750, label: 'E-mail en double', bad: true },
    ],
    result: '2 bonus, 2 e-mails',
    bad: true,
  },
}

export default function BonusConcurrency() {
  const reduce = useReducedMotion()
  const [mode, setMode] = useState<'lock' | 'nolock'>('lock')
  const scenario = SCENARIOS[mode]

  return (
    <figure className="border border-ink bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-5 py-4 sm:px-8">
        <div>
          <span className="block font-mono text-[11px] uppercase tracking-wide text-accent">Gros plan · bonus</span>
          <figcaption className="mt-1 font-serif text-2xl font-light leading-tight md:text-3xl" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
            Pourquoi un bonus n’est attribué qu’une fois
          </figcaption>
        </div>
        <div className="flex border border-ink" role="group" aria-label="Scénario">
          {(
            [
              ['nolock', 'Sans verrou'],
              ['lock', 'Avec verrou'],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
                mode === m ? 'bg-ink text-paper' : 'hover:bg-accent-soft'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto px-3 py-6 sm:px-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full min-w-[760px]" role="img" aria-label={`Scénario ${mode === 'lock' ? 'avec' : 'sans'} verrou : ${scenario.result}`}>
          <defs>
            <marker id="bc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--accent))" />
            </marker>
          </defs>

          {/* Axe du temps et couloirs */}
          <line x1={150} y1={H - 18} x2={W - 10} y2={H - 18} stroke="rgb(var(--ink))" markerEnd="url(#bc-arrow)" />
          <text x={W - 14} y={H - 26} textAnchor="end" className="font-mono" fontSize={10} fill="rgb(var(--muted))">
            temps
          </text>
          {['Notification A', 'Notification B'].map((l, i) => (
            <g key={l}>
              <line x1={150} y1={LANE_Y[i] + BOX_H / 2} x2={W - 10} y2={LANE_Y[i] + BOX_H / 2} stroke="rgb(var(--line))" />
              <text x={10} y={LANE_Y[i] + BOX_H / 2 + 5} className="font-serif" fontSize={16} fill="rgb(var(--ink))">
                {l}
              </text>
            </g>
          ))}

          <AnimatePresence mode="wait">
            <motion.g
              key={mode}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {mode === 'lock' && (
                <>
                  {/* Durée du verrou sur la notification A */}
                  <motion.rect
                    x={330}
                    y={LANE_Y[0] - 14}
                    width={670 + BOX_W - 330}
                    height={BOX_H + 28}
                    fill="rgb(var(--accent-soft))"
                    stroke="rgb(var(--accent))"
                    strokeDasharray="5 5"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                  />
                  <text x={338} y={LANE_Y[0] - 20} className="font-mono" fontSize={11} fill="rgb(var(--accent))">
                    verrou sur l’achat
                  </text>
                  {/* B attend la fin du verrou */}
                  <motion.line
                    x1={240 + BOX_W}
                    y1={LANE_Y[1] + BOX_H / 2}
                    x2={840}
                    y2={LANE_Y[1] + BOX_H / 2}
                    stroke="rgb(var(--accent))"
                    strokeWidth={2}
                    strokeDasharray="3 6"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 0.9 }}
                  />
                  <text x={420} y={LANE_Y[1] + BOX_H / 2 - 10} className="font-mono" fontSize={11} fill="rgb(var(--accent))">
                    attend le verrou…
                  </text>
                  {/* Libération du verrou → B reprend */}
                  <motion.path
                    d={`M${670 + BOX_W / 2} ${LANE_Y[0] + BOX_H} C ${670 + BOX_W / 2} ${LANE_Y[0] + BOX_H + 50}, ${840 + 20} ${LANE_Y[1] - 50}, ${840 + 20} ${LANE_Y[1]}`}
                    fill="none"
                    stroke="rgb(var(--accent))"
                    strokeWidth={1.5}
                    markerEnd="url(#bc-arrow)"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  />
                </>
              )}

              {scenario.steps.map((s, i) => {
                const y = LANE_Y[s.lane]
                return (
                  <motion.g
                    key={`${mode}-${i}`}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.1 + (s.x / 1000) * 1.2, duration: 0.35 }}
                  >
                    <rect
                      x={s.x}
                      y={y}
                      width={BOX_W}
                      height={BOX_H}
                      fill={s.bad ? 'rgb(var(--ink))' : 'rgb(var(--paper))'}
                      stroke="rgb(var(--ink))"
                      strokeWidth={1}
                    />
                    <text x={s.x + 10} y={y + (s.sub ? 22 : BOX_H / 2 + 5)} className="font-serif" fontSize={14} fill={s.bad ? 'rgb(var(--paper))' : 'rgb(var(--ink))'}>
                      {s.label}
                    </text>
                    {s.sub && (
                      <text x={s.x + 10} y={y + 39} className="font-mono" fontSize={9.5} fill={s.bad ? 'rgb(var(--paper) / 0.75)' : 'rgb(var(--muted))'}>
                        {s.sub}
                      </text>
                    )}
                  </motion.g>
                )
              })}
            </motion.g>
          </AnimatePresence>
        </svg>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink px-5 py-4 sm:px-8">
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Le paiement peut être notifié deux fois. MySQL n’applique pas la contrainte d’unicité partielle du modèle : la base ne rattraperait pas le doublon. L’attribution verrouille donc l’achat, et les e-mails ne partent qu’une fois le verrou relâché.
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={scenario.result}
            className={`font-serif text-2xl font-light ${scenario.bad ? 'text-ink line-through decoration-accent decoration-2' : 'text-accent'}`}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {scenario.result}
          </motion.p>
        </AnimatePresence>
      </div>
    </figure>
  )
}
