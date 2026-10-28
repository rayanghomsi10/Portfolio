'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { Result } from '@/lib/data/projects'

export default function EvalReport({ results, caption }: { results: Result[]; caption?: string }) {
  const reduce = useReducedMotion()
  return (
    <figure className="rounded-lg border border-line bg-surface/60 p-5 backdrop-blur-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
        <span className="eyebrow">Résultats</span>
        <span className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden />
          mesuré
        </span>
      </div>
      <dl className="space-y-4">
        {results.map((r, i) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-mono text-sm text-ink">{r.label}</dt>
              <dd className="tabular font-mono text-lg text-accent">{r.value}</dd>
            </div>
            {r.score !== undefined && (
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line" aria-hidden>
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-signal to-accent"
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width: `${r.score * 100}%` }}
                  viewport={{ once: true }}
                  style={reduce ? { width: `${r.score * 100}%` } : undefined}
                  transition={{ duration: 1.2, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
            {r.note && <p className="mt-1 text-xs text-muted">{r.note}</p>}
          </div>
        ))}
      </dl>
      {caption && <figcaption className="mt-5 border-t border-line pt-3 text-xs leading-relaxed text-muted">{caption}</figcaption>}
    </figure>
  )
}
