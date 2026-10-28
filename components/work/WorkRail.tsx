'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import type { Project } from '@/lib/data/projects'

/*
 * Rail horizontal : le défilement vertical fait glisser les projets de droite à gauche.
 * Les cartes ont des formats différents (un projet n'a pas le même poids qu'un autre)
 * et se penchent légèrement selon la vitesse de défilement.
 */

const FORMATS: Record<string, string> = {
  'assistant-rag': 'lg:w-[44rem] lg:h-[74vh] lg:self-center',
  'jumeau-numerique-extrudeuse': 'lg:w-[34rem] lg:h-[80vh] lg:self-end',
  'churn-telecom': 'lg:w-[30rem] lg:h-[56vh] lg:self-start lg:mt-[12vh]',
  'graph-rag-veille': 'lg:w-[22rem] lg:h-[44vh] lg:self-center',
  'tsa-innovlab': 'lg:w-[24rem] lg:h-[48vh] lg:self-end lg:mb-[8vh]',
}

function Card({ project, index }: { project: Project; index: number }) {
  const key = project.results[0]
  const big = project.slug === 'assistant-rag' || project.slug === 'jumeau-numerique-extrudeuse'
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative flex min-h-[22rem] w-full shrink-0 flex-col justify-between border border-ink bg-paper p-6 transition-colors duration-500 hover:bg-ink hover:text-paper sm:p-8 ${FORMATS[project.slug] ?? 'lg:w-[26rem] lg:h-[50vh]'}`}
    >
      <div className="flex items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-wide">
        <span>
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> / {project.domain}
        </span>
        <span className="text-right opacity-70">
          {project.period}
          {project.status === 'En cours' && (
            <>
              <br />
              <span className="text-accent">en cours</span>
            </>
          )}
        </span>
      </div>

      {project.media?.[0] && (
        <div className="relative my-6 flex-1 overflow-hidden border border-ink/20 group-hover:border-paper/20">
          <Image src={project.media[0].src} alt={project.media[0].alt} fill className="object-cover grayscale transition duration-700 group-hover:grayscale-0" />
        </div>
      )}

      <div>
        <h3
          className={`font-serif font-light leading-[0.9] tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 ${big ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'}`}
          style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
        >
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed opacity-75">{project.summary}</p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-ink/20 pt-4 group-hover:border-paper/20">
        {key ? (
          <span>
            <span className={`tabular block font-serif text-accent ${big ? 'text-6xl md:text-7xl' : 'text-4xl'}`}>{key.value}</span>
            <span className="font-mono text-[11px] uppercase tracking-wide opacity-70">{key.label}</span>
          </span>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-wide opacity-70">Résultats à venir</span>
        )}
        <span className="font-mono text-xs uppercase tracking-wide transition-transform duration-500 group-hover:translate-x-1">Lire →</span>
      </div>
    </Link>
  )
}

export default function WorkRail({ projects }: { projects: Project[] }) {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const dist = useMotionValue(0)
  const x = useTransform(() => -scrollYProgress.get() * dist.get())
  const velocity = useVelocity(scrollYProgress)
  const skew = useSpring(useTransform(velocity, [-1.5, 0, 1.5], [6, 0, -6], { clamp: true }), { stiffness: 260, damping: 40 })
  const progressWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth)
      dist.set(d)
      setDistance(d)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [projects.length, dist])

  const intro = (
    <div className="flex shrink-0 flex-col justify-between lg:h-[74vh] lg:w-[24rem] lg:self-center">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wide text-accent">01 — Travaux</p>
        <h2 className="mt-4 font-serif text-5xl font-light leading-[0.9] tracking-[-0.03em] md:text-6xl" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
          Cinq projets, <em>cinq formats.</em>
        </h2>
        <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
          La taille d’une carte dit le poids du projet. Les chiffres sont mesurés ; les projets en cours le disent.
        </p>
      </div>
      <p className="mt-8 hidden font-mono text-[11px] uppercase tracking-wide text-muted lg:block">Continuez à défiler →</p>
    </div>
  )

  return (
    <div id="travaux" className="scroll-mt-16">
      {/* Mobile et tablette : pile verticale */}
      <section className="px-4 py-24 sm:px-8 lg:hidden">
        {intro}
        <div className="mt-12 space-y-6">
          {projects.map((p, i) => (
            <Card key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Desktop : rail horizontal épinglé */}
      <section ref={section} className="relative hidden lg:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div
            ref={track}
            className="flex h-full items-stretch gap-10 px-8 py-24"
            style={reduce ? { x } : { x, skewX: skew }}
          >
            {intro}
            {projects.map((p, i) => (
              <Card key={p.slug} project={p} index={i} />
            ))}
            <Link
              href="/projects"
              className="group flex w-[20rem] shrink-0 flex-col justify-center self-center font-serif text-4xl font-light leading-tight"
            >
              Toutes les études de cas
              <span className="mt-4 font-mono text-xs uppercase tracking-wide text-accent transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </motion.div>
          <div className="absolute inset-x-8 bottom-8 h-px bg-line">
            <motion.div className="h-px bg-accent" style={{ width: progressWidth }} />
          </div>
        </div>
      </section>
    </div>
  )
}
