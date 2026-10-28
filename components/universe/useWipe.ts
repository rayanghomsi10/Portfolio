'use client'

import { useEffect, useState } from 'react'
import { animate, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

const EASE = [0.76, 0, 0.24, 1] as const

/*
 * Découpe animée pour les panneaux de transition.
 * Le clip-path est piloté par une valeur animée en JavaScript, image par image : le style final
 * est donc réellement appliqué avant le retrait du panneau. Animé directement sur l'élément,
 * Framer Motion délègue le clip-path au navigateur et le style de départ (plein écran)
 * réapparaissait une image à la fin, d'où un flash.
 */
export function useWipe(edge: 'top' | 'right', delay: number, duration: number) {
  const reduce = useReducedMotion()
  const progress = useMotionValue(0)
  const clipPath = useTransform(progress, (p) => (edge === 'top' ? `inset(0 0 ${p}% 0)` : `inset(0 0 0 ${p}%)`))
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduce) return
    const controls = animate(progress, 100, { delay, duration, ease: EASE, onComplete: () => setDone(true) })
    return () => controls.stop()
  }, [reduce, progress, delay, duration])

  return { clipPath, done: done || Boolean(reduce) }
}
