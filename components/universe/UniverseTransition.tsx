'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Universe } from '@/lib/data/projects'
import Motif from './Motif'

const EASE = [0.76, 0, 0.24, 1] as const

/*
 * À l'entrée d'une étude de cas : le motif du projet couvre l'écran en reculant doucement,
 * le titre s'affiche dans la couleur de l'univers, puis le panneau se retire vers la droite.
 */
export default function UniverseTransition({ kind, index, title }: { kind: Universe; index: number; title: string }) {
  const reduce = useReducedMotion()
  // Retiré du DOM une fois le panneau sorti : il ne peut plus réapparaître
  const [done, setDone] = useState(false)
  if (reduce || done) return null
  return (
    <motion.div
      // Rendu hors de la page : l'univers est porté par le panneau lui-même
      data-universe={kind}
      onAnimationComplete={() => setDone(true)}
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden bg-paper"
      initial={{ clipPath: 'inset(0 0 0 0)' }}
      animate={{ clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
      aria-hidden
    >
      {kind !== 'base' && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Motif kind={kind} className="h-full w-full" />
        </motion.div>
      )}

      <div className="absolute inset-x-4 bottom-10 sm:inset-x-8">
        <div className="overflow-hidden">
          <motion.p
            className="bg-paper/80 pr-4 font-serif font-light leading-[0.95] tracking-[-0.035em] text-accent sm:inline-block"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 8rem)', fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.p>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-ink/15">
            <motion.div
              className="h-px origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
          <span className="bg-paper/80 font-mono text-[11px] uppercase tracking-wide text-muted">Projet {String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
    </motion.div>
  )
}
