'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { skillGroups } from '@/lib/data/experience'
import { skillUsage, usageTargets, usagesOf } from '@/lib/data/skills'
import ProofMatrix from './ProofMatrix'

const display = { fontVariationSettings: '"SOFT" 100, "WONK" 1' }
const allSkills = skillGroups.flatMap((g) => g.items)
const proven = allSkills.filter((s) => (skillUsage[s] ?? []).length > 0).length

/*
 * Chaque outil est une preuve : le choisir montre où il a servi.
 * Filtrer par projet allume les outils de ce projet et passe la page dans la couleur de son univers.
 */
export default function SkillExplorer() {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [target, setTarget] = useState<string | null>(null)
  const [hoverRow, setHoverRow] = useState<string | null>(null)

  const shown = hovered ?? selected
  const targetInfo = usageTargets.find((t) => t.id === target)
  const toolCount = useMemo(
    () => Object.fromEntries(usageTargets.map((t) => [t.id, allSkills.filter((s) => skillUsage[s]?.includes(t.id)).length])),
    []
  )

  const proof = (skill: string | null, onClose?: () => void) => {
    const usages = skill ? usagesOf(skill) : []
    return (
      <div className="overflow-hidden border border-ink bg-paper p-6" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={skill ?? 'vide'}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
        {skill ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-accent">Preuve</p>
              {onClose && (
                <button onClick={onClose} aria-label="Fermer" className="-m-2 p-2 text-muted hover:text-ink">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="mt-3 font-serif text-4xl font-light leading-none tracking-[-0.03em]" style={display}>
              {skill}
            </p>
            {usages.length > 0 ? (
              <>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-muted">
                  Utilisé dans {usages.length} {usages.length > 1 ? 'projets ou expériences' : 'projet ou expérience'}
                </p>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {usages.map((u) => (
                    <li key={u.id} data-universe={u.universe}>
                      <Link href={u.href} className="group flex items-baseline justify-between gap-4 py-3">
                        <span>
                          <span className="block text-lg leading-tight transition-colors group-hover:text-accent">{u.label}</span>
                          <span className="font-mono text-[11px] text-muted">{u.detail}</span>
                        </span>
                        <span className="font-mono text-xs text-accent transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Pas encore illustré par une étude de cas sur ce site.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="font-mono text-[11px] uppercase tracking-wide text-accent">Mode d’emploi</p>
            <p className="mt-3 font-serif text-2xl font-light leading-snug" style={display}>
              Choisissez un outil pour voir où il a servi.
            </p>
            <p className="mt-4 font-mono text-[11px] text-muted">
              {allSkills.length} outils · {proven} illustrés par un projet ou une expérience · {allSkills.length - proven} sans étude de cas ici
            </p>
          </>
        )}
        </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  // Légende du viseur de la matrice
  const caption = (() => {
    const col = hovered ?? selected
    const row = hoverRow ?? target
    if (col) {
      const u = usagesOf(col)
      return { title: col, text: u.map((x) => x.label).join(' · ') }
    }
    if (row) {
      const t = usageTargets.find((x) => x.id === row)!
      const tools = allSkills.filter((x) => skillUsage[x]?.includes(row))
      return { title: t.label, text: `${tools.length} outils : ${tools.join(', ')}` }
    }
    return { title: 'Survolez la matrice', text: 'Une colonne : où l’outil a servi. Un projet : sa stack. Cliquez pour épingler.' }
  })()

  return (
    <div data-universe={targetInfo?.universe} className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      {/* Matrice de preuves */}
      <section className="lg:col-span-12" aria-label="Matrice de preuves">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-wide text-accent">Matrice de preuves</p>
          <p className="font-mono text-[11px] text-muted">{proven} outils illustrés × {usageTargets.length} projets et expériences</p>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ProofMatrix
            selected={selected}
            hovered={hovered}
            target={target}
            hoverRow={hoverRow}
            onSelect={(sk) => setSelected(selected === sk ? null : sk)}
            onHover={setHovered}
            onTarget={(id) => setTarget(target === id ? null : id)}
            onHoverRow={setHoverRow}
          />
        </div>
        <div className="mt-3 flex min-h-[3.5rem] flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink pb-4" aria-live="polite">
          <span className="font-serif text-2xl font-light" style={display}>
            {caption.title}
          </span>
          <span className="font-mono text-xs text-muted">{caption.text}</span>
        </div>
      </section>

      {/* Colonne gauche : preuve + filtre par projet */}
      <aside className="lg:col-span-4">
        <div className="space-y-8 lg:sticky lg:top-24">
          <div className="hidden lg:block">{proof(shown)}</div>

          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-muted">Filtrer par projet</p>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-t lg:border-ink">
              {usageTargets.map((t) => {
                const on = target === t.id
                return (
                  <li key={t.id} data-universe={t.universe}>
                    <button
                      onClick={() => setTarget(on ? null : t.id)}
                      aria-pressed={on}
                      className={`flex w-full items-baseline justify-between gap-3 border px-3 py-2 text-left transition-colors lg:border-x-0 lg:border-t-0 lg:border-b-ink lg:px-2 lg:py-3 ${
                        on ? 'border-accent bg-accent text-paper lg:border-b-accent' : 'border-line hover:bg-accent-soft'
                      }`}
                    >
                      <span className="text-base leading-tight">{t.label}</span>
                      <span className={`font-mono text-[11px] ${on ? 'text-paper/80' : 'text-muted'}`}>{toolCount[t.id]}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            {target && (
              <button onClick={() => setTarget(null)} className="mt-3 font-mono text-[11px] uppercase tracking-wide text-muted hover:text-accent">
                × Retirer le filtre
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Colonne droite : les outils, par famille */}
      <div className="lg:col-span-8">
        {skillGroups.map((g, gi) => {
          const groupHits = target ? g.items.filter((s) => skillUsage[s]?.includes(target)).length : null
          return (
            <motion.section
              key={g.label}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (gi % 3) * 0.06 }}
              className={`grid gap-4 border-t border-ink py-7 transition-opacity duration-500 md:grid-cols-[14rem_1fr]`}
              style={{ filter: groupHits === 0 ? 'opacity(0.35)' : undefined }}>
              <h2 className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-muted">{String(gi + 1).padStart(2, '0')}</span>
                <span className="font-serif text-2xl font-light leading-tight" style={display}>
                  {g.label}
                </span>
              </h2>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => {
                  const n = skillUsage[s]?.length ?? 0
                  const isSel = selected === s
                  const hit = target ? skillUsage[s]?.includes(target) : null
                  return (
                    <li key={s}>
                      <motion.button
                        layout={!reduce}
                        onClick={() => setSelected(isSel ? null : s)}
                        onMouseEnter={() => setHovered(s)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(s)}
                        onBlur={() => setHovered(null)}
                        aria-pressed={isSel}
                        title={n === 0 ? 'Pas d’étude de cas sur ce site' : undefined}
                        className={`relative px-3 py-1.5 font-mono text-sm transition-all duration-300 ${
                          isSel
                            ? 'border border-ink bg-ink text-paper'
                            : hit
                              ? 'border border-accent bg-accent text-paper'
                              : n === 0
                                ? 'border border-dashed border-line text-muted hover:border-ink hover:text-ink'
                                : 'border border-ink/60 hover:-translate-y-0.5 hover:border-ink hover:bg-accent-soft'
                        } ${target && !hit && !isSel ? 'opacity-30' : ''}`}
                      >
                        {s}
                        {n > 0 && <sup className={`ml-1 text-[10px] ${isSel || hit ? 'text-paper/70' : 'text-accent'}`}>{n}</sup>}
                      </motion.button>
                    </li>
                  )
                })}
              </ul>
            </motion.section>
          )
        })}
        <p className="border-t border-ink pt-4 font-mono text-[11px] text-muted">
          Le chiffre en exposant compte les projets ou expériences de ce site où l’outil a servi. Cadre en pointillés : pas d’étude de cas ici.
        </p>
      </div>

      {/* Mobile : la preuve s'ouvre en bas de l'écran */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 p-4 lg:hidden"
            initial={reduce ? false : { y: '100%' }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shadow-[0_-8px_0_rgb(var(--paper))]">{proof(selected, () => setSelected(null))}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
