'use client'

import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import PageCurtain, { CURTAIN_HOLD } from '@/components/universe/PageCurtain'

// Rideau d'encre à chaque changement de page
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const pathname = usePathname()
  // Les études de cas ont leur propre transition, dans la couleur de leur univers
  const isCaseStudy = /^\/projects\/[^/]+/.test(pathname)
  return (
    <>
      {!reduce && !isCaseStudy && <PageCurtain pathname={pathname} />}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: isCaseStudy ? 1.05 : CURTAIN_HOLD + 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
