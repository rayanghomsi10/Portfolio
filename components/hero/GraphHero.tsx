'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import { answers, nodes } from '@/lib/data/graph'
import { profile } from '@/lib/data/experience'

// Le graphe n'est qu'un appui visuel : le texte, les questions et les réponses restent en HTML
const KnowledgeGraph = dynamic(() => import('./KnowledgeGraph'), { ssr: false })

const display = { fontVariationSettings: '"SOFT" 100, "WONK" 1' }

export default function GraphHero() {
  const reduce = useReducedMotion()
  const [answerId, setAnswerId] = useState<string | null>(null)
  const [hoverCite, setHoverCite] = useState<number | null>(null)
  const touched = useRef(false)

  // Première réponse lancée seule, une fois le graphe dessiné, tant que le visiteur n'a rien choisi
  useEffect(() => {
    const t = setTimeout(() => {
      if (!touched.current) setAnswerId(answers[0].id)
    }, reduce ? 0 : 1800)
    return () => clearTimeout(t)
  }, [reduce])

  const answer = answers.find((a) => a.id === answerId) ?? null
  const active = useMemo(() => (answer ? new Set(answer.citations.flatMap((c) => c.nodes)) : null), [answer])
  const pulse = useMemo(() => {
    const c = answer?.citations.find((c) => c.n === hoverCite)
    return c ? new Set(c.nodes.slice(0, 1)) : null
  }, [answer, hoverCite])

  const choose = (id: string) => {
    touched.current = true
    setHoverCite(null)
    setAnswerId(id)
  }

  const citedNodes = answer ? nodes.filter((n) => active!.has(n.id)) : []

  return (
    <section className="relative mx-auto grid min-h-[100svh] max-w-[90rem] grid-cols-1 gap-x-8 px-4 pb-12 pt-24 sm:px-8 lg:grid-cols-12">
      {/* Identité : lisible sans aucune interaction */}
      <div className="lg:col-span-4">
        <p className="font-mono text-[11px] uppercase leading-relaxed tracking-wide text-muted">
          {profile.name}
          <br />
          Ingénieur IA · Data Scientist
          <br />
          MS SIO · CentraleSupélec
        </p>
        <p className="mt-4 inline-flex items-center gap-2 border border-ink px-2 py-1 font-mono text-[11px] uppercase tracking-wide">
          <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
          Stage 6 mois · dès avril 2027
        </p>
        <p className="mt-8 max-w-xs text-lg leading-snug text-ink/85">
          Je construis des assistants IA et des pipelines de données, et je mesure s’ils disent vrai.
        </p>
      </div>

      {/* Graphe (desktop) */}
      <div className="relative hidden h-[46vh] min-h-[340px] lg:col-span-8 lg:block">
        <KnowledgeGraph active={active} pulse={pulse} />
      </div>

      {/* Titre */}
      <h1
        className="mt-14 font-serif font-light leading-[0.88] tracking-[-0.035em] lg:col-span-7 lg:mt-4 lg:self-start"
        style={{ ...display, fontSize: 'clamp(2.9rem, 6.2vw, 6.8rem)' }}
      >
        Des systèmes qui citent <em className="text-accent">leurs sources.</em>
      </h1>

      {/* Questions et réponse */}
      <div className="mt-10 lg:col-span-5 lg:mt-4 lg:self-start">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-muted">Posez une question à mon travail</p>
        <ul className="border-t border-ink">
          {answers.map((a, i) => (
            <li key={a.id}>
              <button
                onClick={() => choose(a.id)}
                aria-pressed={a.id === answerId}
                className={`flex w-full items-baseline gap-3 border-b border-ink py-3 text-left text-lg transition-colors ${
                  a.id === answerId ? 'bg-ink px-3 text-paper' : 'hover:px-3 hover:bg-accent-soft'
                }`}
              >
                <span className={`font-mono text-[11px] ${a.id === answerId ? 'text-paper/70' : 'text-muted'}`}>Q{i + 1}</span>
                {a.question}
              </button>
            </li>
          ))}
        </ul>

        <div className="min-h-[13rem] pt-5" aria-live="polite">
          <AnimatePresence mode="wait">
            {answer && (
              <motion.div key={answer.id} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="leading-relaxed">
                  {answer.sentences.map((s, i) => (
                    <motion.span
                      key={i}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: reduce ? 0 : 0.15 + i * 0.45 }}
                    >
                      {s.text}
                      <a
                        href={answer.citations.find((c) => c.n === s.cite)!.href}
                        onMouseEnter={() => setHoverCite(s.cite)}
                        onMouseLeave={() => setHoverCite(null)}
                        onFocus={() => setHoverCite(s.cite)}
                        onBlur={() => setHoverCite(null)}
                        className="ml-0.5 align-super font-mono text-[10px] text-accent underline-offset-2 hover:underline"
                        aria-label={`Source ${s.cite}`}
                      >
                        [{s.cite}]
                      </a>{' '}
                    </motion.span>
                  ))}
                </p>
                <ol className="mt-4 space-y-1 font-mono text-[11px] text-muted">
                  {answer.citations.map((c) => (
                    <li key={c.n}>
                      <Link
                        href={c.href}
                        onMouseEnter={() => setHoverCite(c.n)}
                        onMouseLeave={() => setHoverCite(null)}
                        className="hover:text-accent"
                      >
                        [{c.n}] {c.label} →
                      </Link>
                    </li>
                  ))}
                </ol>
                {/* Mobile : les nœuds cités remplacent le graphe */}
                <ul className="mt-4 flex flex-wrap gap-1.5 lg:hidden">
                  {citedNodes.map((n) => (
                    <li key={n.id} className={`border px-2 py-0.5 font-mono text-[11px] ${n.kind === 'result' ? 'border-accent text-accent' : 'border-line text-muted'}`}>
                      {n.label}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-2 font-mono text-[10px] text-muted">Réponses préparées à partir des pages de ce site, sans modèle en direct.</p>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap items-center gap-3 lg:col-span-12">
        <Link href="/contact" className="bg-ink px-5 py-3 font-mono text-xs uppercase tracking-wide text-paper transition-colors hover:bg-accent">
          Me recruter · stage dès avril 2027
        </Link>
        <Link href="#travaux" className="border border-ink px-5 py-3 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-ink hover:text-paper">
          Voir les projets
        </Link>
        {[
          { href: profile.github, label: 'GitHub', Icon: Github },
          { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </section>
  )
}
