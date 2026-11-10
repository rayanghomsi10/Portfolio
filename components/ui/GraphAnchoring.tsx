'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/*
 * Gros plan Graph-RAG : le contrôle anti-hallucination avant l'écriture dans le graphe.
 * Une relation proposée par le LLM n'est écrite que si sa phrase-preuve passe les contrôles
 * du code : figurer telle quelle dans le passage, puis nommer la source et la cible.
 * Exemple neutre, rédigé pour l'illustration (le domaine réel du projet n'est pas affiché).
 */

type Mode = 'ok' | 'absent' | 'offtopic'

const PASSAGE = 'Les auteurs montrent que le procédé X permet d’obtenir le matériau Y avec une densité élevée, contrairement aux méthodes précédentes.'

const SCENARIOS: Record<Mode, { label: string; evidence: string; checks: (boolean | null)[]; outcome: string; reason?: string }> = {
  ok: {
    label: 'Relation ancrée',
    evidence: 'le procédé X permet d’obtenir le matériau Y',
    checks: [true, true],
    outcome: 'Écrite dans le graphe, avec sa phrase-preuve',
  },
  absent: {
    label: 'Preuve absente',
    evidence: 'le procédé X est la méthode la plus utilisée pour le matériau Y',
    checks: [false, null],
    outcome: 'Rejetée',
    reason: 'preuve absente du texte : le LLM a reformulé, ou inventé',
  },
  offtopic: {
    label: 'Preuve hors sujet',
    evidence: 'contrairement aux méthodes précédentes',
    checks: [true, false],
    outcome: 'Rejetée',
    reason: 'la phrase existe, mais ne nomme ni le procédé X ni le matériau Y',
  },
}

const CHECKS = ['La preuve figure telle quelle dans le passage', 'Elle nomme la source et la cible']

export default function GraphAnchoring() {
  const reduce = useReducedMotion()
  const [mode, setMode] = useState<Mode>('ok')
  const sc = SCENARIOS[mode]
  const accepted = mode === 'ok'

  // Surligne la preuve dans le passage quand elle y figure
  const at = PASSAGE.indexOf(sc.evidence)
  const passage =
    at >= 0 ? (
      <>
        {PASSAGE.slice(0, at)}
        <mark className="bg-accent-soft px-0.5 text-ink">{sc.evidence}</mark>
        {PASSAGE.slice(at + sc.evidence.length)}
      </>
    ) : (
      PASSAGE
    )

  return (
    <figure className="border border-ink bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-5 py-4 sm:px-8">
        <div>
          <span className="block font-mono text-[11px] uppercase tracking-wide text-accent">Gros plan · ancrage</span>
          <figcaption className="mt-1 font-serif text-2xl font-light leading-tight md:text-3xl" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
            Aucune relation sans sa phrase-preuve
          </figcaption>
        </div>
        <div className="flex flex-wrap border border-ink" role="group" aria-label="Scénario">
          {(Object.keys(SCENARIOS) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-3 py-2 font-mono text-[11px] uppercase tracking-wide transition-colors sm:px-4 ${mode === m ? 'bg-ink text-paper' : 'hover:bg-accent-soft'}`}
            >
              {SCENARIOS[m].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-px bg-ink md:grid-cols-[1.2fr_1fr]">
        {/* Le passage et la relation proposée */}
        <div className="space-y-5 bg-surface p-5 sm:p-8">
          <div>
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted">
              Passage source <span className="border border-line px-1.5 text-[10px]">Exemple</span>
            </p>
            <p className="font-serif text-lg leading-relaxed">{passage}</p>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-muted">Relation proposée par le LLM</p>
            <p className="font-mono text-sm">
              procédé X <span className="text-accent">─[PRODUCES]→</span> matériau Y
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={mode}
                className="mt-2 font-serif italic text-muted"
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                preuve : « {sc.evidence} »
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Les contrôles et le verdict */}
        <div className="flex flex-col justify-between gap-6 bg-paper p-5 sm:p-8">
          <ol className="space-y-3">
            {CHECKS.map((c, i) => {
              const state = sc.checks[i]
              return (
                <motion.li
                  key={c}
                  className={`flex items-center justify-between gap-4 border px-4 py-3 ${state === false ? 'border-ink bg-ink text-paper' : 'border-line'}`}
                  animate={{ opacity: state === null ? 0.35 : 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="flex gap-3 text-sm">
                    <span className={`font-mono text-[11px] ${state === false ? 'text-paper/60' : 'text-muted'}`}>{i + 1}</span>
                    {c}
                  </span>
                  <AnimatePresence mode="wait">
                    {state !== null && (
                      <motion.span
                        key={`${mode}-${i}`}
                        className={`font-mono text-lg ${state ? 'text-accent' : 'text-paper'}`}
                        initial={reduce ? false : { opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: reduce ? 0 : 0.15 + i * 0.2, duration: 0.2 }}
                      >
                        {state ? '✓' : '✗'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
            <li className="px-4 font-mono text-[11px] leading-relaxed text-muted">
              3 · ensuite, toute entité dont le nom n’apparaît pas dans le passage est supprimée
            </li>
          </ol>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25, delay: reduce ? 0 : 0.4 }}
            >
              <p className={`font-serif text-2xl font-light ${accepted ? 'text-accent' : 'text-ink'}`}>{sc.outcome}</p>
              {sc.reason && <p className="mt-1 font-mono text-xs text-muted">{sc.reason}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </figure>
  )
}
