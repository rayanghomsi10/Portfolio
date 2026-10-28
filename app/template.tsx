'use client'

import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'

// Rideau couleur minium qui se lève à chaque changement de page
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  // Les études de cas ont leur propre transition, dans la couleur de leur univers
  const isCaseStudy = /^\/projects\/[^/]+/.test(usePathname())
  return (
    <>
      {!reduce && !isCaseStudy && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] origin-top bg-accent"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        />
      )}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
