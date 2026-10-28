'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { Universe } from '@/lib/data/projects'
import Motif from './Motif'

// À l'entrée d'une étude de cas, le motif du projet couvre l'écran puis se retire vers la droite
export default function UniverseTransition({ kind }: { kind: Universe }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[80] bg-paper"
      initial={{ clipPath: 'inset(0 0 0 0)' }}
      animate={{ clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden
    >
      {kind === 'base' ? <div className="h-full w-full bg-accent" /> : <Motif kind={kind} className="h-full w-full opacity-70" />}
    </motion.div>
  )
}
