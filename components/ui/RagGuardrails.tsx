'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/*
 * Gros plan Assistant-RAG : le même pipeline face à deux questions.
 * Dans le périmètre, les garde-fous laissent passer une réponse citée ;
 * hors périmètre, ils produisent un refus motivé au lieu d'une réponse inventée.
 * Les questions sont des exemples rédigés pour l'illustration, pas des extraits du jeu de test.
 */

const W = 1000
const H = 300
const NODE_H = 56

type Mode = 'in' | 'out'

const SCENARIOS: Record<Mode, { example: string; checks: (boolean | null)[]; metrics: string; outcome: string }> = {
  in: {
    example: '« Comment planifier un DAG pour qu’il s’exécute chaque jour dans Airflow ? »',
    checks: [true, true, true],
    metrics: '73 questions dans le périmètre · 0 refus à tort · 100 % de citations vérifiées exactes',
    outcome: 'Réponse citée',
  },
  out: {
    example: '« Quel temps fera-t-il demain à Paris ? »',
    checks: [false, null, null],
    metrics: '12 questions hors périmètre dans le jeu de test : l’assistant doit refuser plutôt qu’inventer',
    outcome: 'Refus motivé',
  },
}

const CHECKS = ['Périmètre', 'Citations vérifiées', 'Contrôle NLI']

export default function RagGuardrails() {
  const reduce = useReducedMotion()
  const [mode, setMode] = useState<Mode>('in')
  const sc = SCENARIOS[mode]
  const toAnswer = mode === 'in'

  const lit = 'rgb(var(--accent))'
  const dim = 'rgb(var(--line))'
  const draw = (delay: number) =>
    reduce ? {} : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.5, delay } }

  const node = (x: number, y: number, w: number, label: string, sub: string, on = true, strong = false) => (
    <motion.g animate={{ opacity: on ? 1 : 0.3 }} transition={{ duration: 0.3 }}>
      <rect x={x} y={y} width={w} height={NODE_H} fill={strong ? 'rgb(var(--accent-soft))' : 'rgb(var(--paper))'} stroke={strong ? lit : 'rgb(var(--ink))'} strokeWidth={strong ? 1.6 : 1} />
      <text x={x + 12} y={y + 24} className="font-serif" fontSize={15} fill="rgb(var(--ink))">
        {label}
      </text>
      <text x={x + 12} y={y + 42} className="font-mono" fontSize={9.5} fill="rgb(var(--muted))">
        {sub}
      </text>
    </motion.g>
  )

  return (
    <figure className="border border-ink bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-5 py-4 sm:px-8">
        <div>
          <span className="block font-mono text-[11px] uppercase tracking-wide text-accent">Gros plan · garde-fous</span>
          <figcaption className="mt-1 font-serif text-2xl font-light leading-tight md:text-3xl" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
            Répondre avec ses sources, ou refuser
          </figcaption>
        </div>
        <div className="flex border border-ink" role="group" aria-label="Type de question">
          {(
            [
              ['in', 'Dans le périmètre'],
              ['out', 'Hors périmètre'],
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

      {/* Question d'exemple */}
      <div className="border-b border-line px-5 py-4 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <span className="border border-line px-1.5 font-mono text-[10px] uppercase tracking-wide text-muted">Exemple</span>
            <span className="font-serif text-xl italic">{sc.example}</span>
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="overflow-x-auto px-3 py-6 sm:px-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full min-w-[760px]" role="img" aria-label={`Question ${mode === 'in' ? 'dans le' : 'hors'} périmètre : ${sc.outcome}`}>
          <defs>
            <marker id="rg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill={lit} />
            </marker>
          </defs>

          {/* Tronc commun */}
          {node(20, 122, 140, 'Question', 'utilisateur')}
          {node(190, 122, 175, 'Récupération', 'e5-small · ChromaDB · reranker')}
          {node(395, 122, 150, 'Génération', 'Llama 3.1 8B · Ollama')}
          <path d={`M160 150 L190 150`} stroke={lit} strokeWidth={1.5} markerEnd="url(#rg-arrow)" />
          <path d={`M365 150 L395 150`} stroke={lit} strokeWidth={1.5} markerEnd="url(#rg-arrow)" />
          <path d={`M545 150 L575 150`} stroke={lit} strokeWidth={1.5} markerEnd="url(#rg-arrow)" />

          {/* Garde-fous */}
          <rect x={575} y={36} width={205} height={228} fill="rgb(var(--paper))" stroke={lit} strokeWidth={1.6} />
          <rect x={585} y={27} width={86} height={18} fill="rgb(var(--surface))" />
          <text x={592} y={40} className="font-mono" fontSize={11} fill={lit}>
            Garde-fous
          </text>
          {CHECKS.map((c, i) => {
            const state = sc.checks[i]
            const y = 62 + i * 66
            return (
              <motion.g key={c} animate={{ opacity: state === null ? 0.3 : 1 }} transition={{ duration: 0.3 }}>
                <rect x={588} y={y} width={180} height={48} fill={state === false ? 'rgb(var(--ink))' : 'rgb(var(--surface))'} stroke="rgb(var(--ink))" />
                <text x={600} y={y + 29} className="font-serif" fontSize={14} fill={state === false ? 'rgb(var(--paper))' : 'rgb(var(--ink))'}>
                  {c}
                </text>
                <AnimatePresence mode="wait">
                  {state !== null && (
                    <motion.text
                      key={`${mode}-${i}`}
                      x={754}
                      y={y + 30}
                      textAnchor="end"
                      className="font-mono"
                      fontSize={16}
                      fill={state ? lit : 'rgb(var(--paper))'}
                      initial={reduce ? false : { opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: reduce ? 0 : 0.2 + i * 0.2, duration: 0.25 }}
                    >
                      {state ? '✓' : '✗'}
                    </motion.text>
                  )}
                </AnimatePresence>
              </motion.g>
            )
          })}

          {/* Deux sorties */}
          <motion.path
            key={`a-${mode}`}
            d="M780 120 C 800 120, 800 88, 815 88"
            fill="none"
            stroke={toAnswer ? lit : dim}
            strokeWidth={toAnswer ? 1.8 : 1}
            markerEnd={toAnswer ? 'url(#rg-arrow)' : undefined}
            {...draw(0.7)}
          />
          <motion.path
            key={`r-${mode}`}
            d="M780 180 C 800 180, 800 212, 815 212"
            fill="none"
            stroke={toAnswer ? dim : lit}
            strokeWidth={toAnswer ? 1 : 1.8}
            markerEnd={toAnswer ? undefined : 'url(#rg-arrow)'}
            {...draw(0.7)}
          />
          {node(815, 60, 170, 'Réponse citée', 'passages sources [1] [2]', toAnswer, toAnswer)}
          {node(815, 184, 170, 'Refus motivé', 'hors du corpus documenté', !toAnswer, !toAnswer)}
        </svg>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink px-5 py-4 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            className="max-w-2xl font-mono text-xs leading-relaxed text-muted"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {sc.metrics}
          </motion.p>
        </AnimatePresence>
        <p className="font-serif text-2xl font-light text-accent">{sc.outcome}</p>
      </div>
    </figure>
  )
}
