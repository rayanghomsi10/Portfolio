'use client'

import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import PageCurtain, { CURTAIN_HOLD } from '@/components/universe/PageCurtain'
import UniverseTransition from '@/components/universe/UniverseTransition'
import { projects } from '@/lib/data/projects'

/*
 * Transitions de page. Elles sont rendues en dehors du conteneur animé :
 * un élément `fixed` placé dans un parent transformé se positionne par rapport à ce parent,
 * pas à l'écran, ce qui décalait le panneau (surtout en arrivant depuis le bas de l'accueil).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const match = pathname.match(/^\/projects\/([^/]+)/)
  const index = match ? projects.findIndex((p) => p.slug === match[1]) : -1
  const project = index >= 0 ? projects[index] : undefined

  return (
    <>
      {!reduce &&
        (project ? (
          <UniverseTransition key={pathname} kind={project.universe} index={index} title={project.title} />
        ) : (
          <PageCurtain key={pathname} pathname={pathname} />
        ))}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: project ? 1.05 : CURTAIN_HOLD + 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
