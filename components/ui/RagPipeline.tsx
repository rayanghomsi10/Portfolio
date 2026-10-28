import { Fragment } from 'react'

const steps = [
  { name: 'Question', detail: 'utilisateur' },
  { name: 'Reformulation', detail: 'mémoire de conversation' },
  { name: 'Récupération', detail: 'e5-small + ChromaDB' },
  { name: 'Reranking', detail: 'réordonne les passages' },
  { name: 'Génération', detail: 'Llama 3.1 8B · Ollama' },
  { name: 'Garde-fous', detail: 'citations · NLI · hors périmètre', guard: true },
  { name: 'Réponse citée', detail: 'ou refus motivé' },
]

function Connector() {
  return (
    <li aria-hidden className="flex lg:w-5 lg:shrink-0 lg:items-center">
      <svg className="hidden h-3 w-full lg:block" viewBox="0 0 40 6" preserveAspectRatio="none" aria-hidden>
        <line x1="0" y1="3" x2="40" y2="3" className="flow stroke-accent" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="ml-5 h-6 w-3 lg:hidden" viewBox="0 0 6 24" aria-hidden>
        <line x1="3" y1="0" x2="3" y2="24" className="flow stroke-accent" strokeWidth="1.5" />
      </svg>
    </li>
  )
}

export default function RagPipeline() {
  return (
    <figure>
      <ol className="flex flex-col lg:flex-row lg:items-center" aria-label="Étapes du pipeline Assistant-RAG">
        {steps.map((s, i) => (
          <Fragment key={s.name}>
            <li
              className={`rounded-md border px-3 py-2.5 lg:min-w-0 lg:flex-1 lg:self-stretch ${
                s.guard ? 'border-accent/60 bg-accent-soft' : 'border-line bg-surface/70'
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm font-medium text-ink">{s.name}</span>
              </div>
              <div className="mt-0.5 font-mono text-[11px] leading-snug text-muted">{s.detail}</div>
            </li>
            {i < steps.length - 1 && <Connector />}
          </Fragment>
        ))}
      </ol>
      <figcaption className="mt-4 font-mono text-[11px] text-muted">
        Chaque version du pipeline est rejouée sur les 85 questions et comparée à la précédente (comparaisons appariées, IC bootstrap 95 %).
      </figcaption>
    </figure>
  )
}
