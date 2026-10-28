'use client'

import { motion } from 'framer-motion'
import { useWipe } from './useWipe'

const PAGES: Record<string, { index: string; label: string }> = {
  '/': { index: '00', label: 'Index' },
  '/projects': { index: '01', label: 'Projets' },
  '/experience': { index: '02', label: 'Parcours' },
  '/skills': { index: '03', label: 'Compétences' },
  '/contact': { index: '04', label: 'Contact' },
}

const EASE = [0.76, 0, 0.24, 1] as const
// Durée pendant laquelle le rideau reste fermé avant de se lever
export const CURTAIN_HOLD = 0.75

/*
 * Rideau d'encre : le nom de la page s'écrit en grand, un filet minium se trace
 * comme une barre de chargement, puis le rideau se lève vers le haut.
 */
export default function PageCurtain({ pathname }: { pathname: string }) {
  const page = PAGES[pathname] ?? { index: '—', label: 'Page' }
  // Le rideau se lève, puis il est retiré du DOM
  const { clipPath, done } = useWipe('top', CURTAIN_HOLD, 0.8)
  if (done) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[80] flex flex-col justify-between bg-raw px-4 pb-10 pt-8 text-raw-ink sm:px-8"
      style={{ clipPath, WebkitClipPath: clipPath }}
      aria-hidden
    >
      <motion.p
        className="font-mono text-[11px] uppercase tracking-wide opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
      >
        Rayan Ghomsi Talla — {page.index}
      </motion.p>

      <div>
        <div className="overflow-hidden">
          <motion.p
            className="font-serif font-light italic leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(4rem, 15vw, 15rem)', fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
            initial={{ y: '105%' }}
            animate={{ y: ['105%', '0%', '0%', '-30%'] }}
            transition={{ duration: CURTAIN_HOLD + 0.6, times: [0, 0.35, 0.6, 1], ease: EASE }}
          >
            {page.label}
          </motion.p>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-raw-ink/15">
            <motion.div
              className="h-px origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: CURTAIN_HOLD - 0.1, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wide opacity-60">{page.index} / 04</span>
        </div>
      </div>
    </motion.div>
  )
}
