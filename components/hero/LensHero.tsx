'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { profile } from '@/lib/data/experience'

/*
 * Deux couches superposées et alignées au pixel près :
 * - la surface : le titre éditorial, propre ;
 * - les données brutes : les vrais résultats des projets, en log.
 * Une lentille qui suit le curseur (avec inertie) découpe la surface pour montrer ce qu'il y a dessous.
 */

const RAW_LINES = [
  'assistant-rag      n=85  in=73  out=12  judge=qwen2.5:7b  ci=bootstrap95',
  'assistant-rag      evidence_hit=0.973  faithfulness=0.864  answer_relevancy=0.926',
  'assistant-rag      quotes_faithful=1.0  false_refusal=0  follow_up_failed=4/18',
  'assistant-rag      dpo=écrit  évaluation=en_attente  résultat=non_publié',
  'jumeau-numérique   cycles=10000+  capteurs=20+  précision=0.92  rebut=-30%',
  'churn-telecom      profils=10000+  sources=5  ingest=1Go+/jour  f1=0.87',
  'churn-telecom      traitement=72h→12h  réentraînement=hebdomadaire',
  'orange-dataai      serveurs=RHEL  internet=non  dbt=déployé  airbyte=déployé',
  'orange-dataai      airbyte→airflow→clickhouse  poc=nifi|airbyte|dbt',
  'graph-rag          statut=en_cours  budget=0',
  'tsa-innovlab       classement=1',
]

function Composition({ raw }: { raw?: boolean }) {
  const meta = raw ? 'text-raw-ink/70' : 'text-muted'
  return (
    <div className="relative mx-auto grid h-full max-w-[90rem] grid-cols-12 grid-rows-[auto_1fr_auto] px-4 pb-8 pt-28 sm:px-8">
      {/* Bloc méta, en haut à gauche */}
      <p className={`col-span-12 font-mono text-[11px] uppercase leading-relaxed tracking-wide sm:col-span-5 ${meta}`}>
        {profile.name}
        <br />
        Data Scientist · MS SIO CentraleSupélec
        <br />
        <span className="text-accent">● </span>
        Stage 6 mois, dès avril 2027
      </p>

      {/* Index décalé, en haut à droite */}
      <ol className={`col-span-4 col-start-9 hidden font-mono text-[11px] leading-relaxed lg:block ${meta}`}>
        <li>01 Assistant-RAG</li>
        <li>02 Jumeau numérique</li>
        <li>03 Churn télécom</li>
        <li>04 Graph-RAG</li>
        <li>05 TSA InnovLab</li>
      </ol>

      {/* Titre, ancré en bas à gauche et volontairement décalé */}
      <h1
        className={`col-span-12 self-end font-serif font-light leading-[0.82] tracking-[-0.04em] ${
          raw ? 'text-transparent [-webkit-text-stroke:1px_rgb(var(--raw-ink))]' : 'text-ink'
        }`}
        style={{ fontSize: 'clamp(3.6rem, 12.5vw, 13rem)', fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
        aria-hidden={raw}
      >
        <span className="block">Des modèles</span>
        <span className="block pl-[12vw] italic">mis à</span>
        <span className="block">
          l’épreuve<span className={raw ? '' : 'text-accent'}>.</span>
        </span>
      </h1>

      {/* Accroche, en bas à droite */}
      <div className="col-span-12 mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:col-span-5 lg:col-start-8 lg:-mt-24">
        <p className={`max-w-sm text-base leading-relaxed ${raw ? 'text-raw-ink/80' : 'text-ink/80'}`}>
          Mon assistant RAG préfère dire « je ne sais pas » plutôt qu’inventer. Je l’ai mesuré : zéro refus à tort, 100&nbsp;% de citations exactes.
        </p>
      </div>
    </div>
  )
}

export default function LensHero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const r = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 })
  const sr = useSpring(r, { stiffness: 120, damping: 18 })
  const clip = useMotionTemplate`circle(${sr}px at ${sx}px ${sy}px)`
  const labelX = useMotionTemplate`${sx}px`
  const labelY = useMotionTemplate`${sy}px`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let last = 0
    let raf = 0
    const radius = () => Math.min(200, Math.max(110, el.clientWidth * 0.12))

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
      r.set(radius())
      last = performance.now()
    }

    // Sans pointeur (mobile, ou souris immobile), la lentille se promène seule
    const idle = (t: number) => {
      if (performance.now() - last > 2200) {
        const w = el.clientWidth
        const h = el.clientHeight
        const s = t / 1000
        x.set(w * (0.55 + 0.3 * Math.sin(s * 0.35)))
        y.set(h * (0.62 + 0.18 * Math.sin(s * 0.5 + 1)))
        r.set(radius() * 0.85)
      }
      raf = requestAnimationFrame(idle)
    }

    if (reduce) {
      x.set(el.clientWidth * 0.68)
      y.set(el.clientHeight * 0.62)
      r.set(radius())
    } else {
      raf = requestAnimationFrame(idle)
    }
    el.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
    }
  }, [reduce, x, y, r])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-paper">
      <Composition />

      {/* Couche brute, révélée par la lentille */}
      <motion.div className="absolute inset-0 bg-raw" style={{ clipPath: clip, WebkitClipPath: clip }} aria-hidden>
        <div className="absolute inset-0 overflow-hidden px-4 pt-24 font-mono text-[11px] leading-[1.9] text-raw-ink/55 sm:px-8 sm:text-xs">
          {Array.from({ length: 6 }).flatMap((_, k) =>
            RAW_LINES.map((line, i) => (
              <div key={`${k}-${i}`} className="whitespace-pre">
                <span className="text-accent">{String(k * RAW_LINES.length + i + 1).padStart(3, '0')}</span>  {line}
              </div>
            ))
          )}
        </div>
        <Composition raw />
      </motion.div>

      {/* Étiquette qui suit la lentille */}
      <motion.span
        className="pointer-events-none absolute hidden -translate-y-1/2 translate-x-[130px] font-mono text-[10px] uppercase tracking-wider text-accent md:block"
        style={{ left: labelX, top: labelY }}
        aria-hidden
      >
        ← données brutes
      </motion.span>

      <Link
        href="#travaux"
        className="absolute bottom-8 right-4 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:text-accent sm:right-8"
      >
        Travaux ↓
      </Link>
    </section>
  )
}
