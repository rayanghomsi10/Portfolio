import type { Result } from '@/lib/data/projects'

// Survol ou focus : la carte montre comment le chiffre a été mesuré (si on le sait)
export default function MetricFlip({ result }: { result: Result }) {
  const hasMethod = Boolean(result.note)
  return (
    <div
      tabIndex={hasMethod ? 0 : undefined}
      className="group relative min-h-[9.5rem] overflow-hidden border border-ink bg-paper p-5 outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className={`transition-all duration-500 ${hasMethod ? 'group-hover:-translate-y-3 group-hover:opacity-0 group-focus:-translate-y-3 group-focus:opacity-0' : ''}`}>
        <p className="tabular font-serif text-5xl font-light leading-none text-accent">{result.value}</p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-muted">{result.label}</p>
        {hasMethod && <p className="mt-4 font-mono text-[10px] text-muted">↻ comment c’est mesuré</p>}
      </div>
      {hasMethod && (
        <div className="absolute inset-0 flex translate-y-3 flex-col justify-between bg-ink p-5 text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
          <p className="font-mono text-[11px] uppercase tracking-wide text-paper/60">{result.label}</p>
          <p className="text-sm leading-snug">{result.note}</p>
        </div>
      )}
    </div>
  )
}
