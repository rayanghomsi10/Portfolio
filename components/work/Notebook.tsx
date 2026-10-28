import Reveal from '@/components/ui/Reveal'
import { notes } from '@/lib/data/notebook'

// Tailles et inclinaisons variées : un carnet, pas une grille de cartes
const LAYOUT = [
  'md:col-span-5 md:-rotate-1',
  'md:col-span-6 md:col-start-7 md:mt-16 md:rotate-[0.6deg]',
  'md:col-span-4 md:col-start-2 md:-mt-6 md:rotate-[0.8deg]',
  'md:col-span-5 md:col-start-7 md:mt-10 md:-rotate-[0.5deg]',
  'md:col-span-6 md:-mt-4 md:rotate-[0.4deg]',
  'md:col-span-4 md:col-start-8 md:mt-12 md:-rotate-1',
]

export default function Notebook() {
  return (
    <section className="mx-auto max-w-[90rem] px-4 py-32 sm:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-wide text-accent">02 — Carnet</p>
          <h2 className="mt-4 font-serif text-5xl font-light leading-[0.9] tracking-[-0.03em] md:text-7xl" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
            Ce qui coince, <em>noté tel quel.</em>
          </h2>
        </Reveal>
        <Reveal className="self-end md:col-span-4 md:col-start-9" delay={0.1}>
          <p className="text-sm leading-relaxed text-muted">
            Les limites, les contraintes et les choix qu’on ne met pas dans un CV. Les notes marquées « ouvert » ne sont pas encore résolues.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-12">
        {notes.map((n, i) => (
          <Reveal key={n.text} delay={(i % 3) * 0.08} className={LAYOUT[i % LAYOUT.length]}>
            <article className="relative border border-line bg-surface p-6 shadow-[6px_6px_0_rgb(var(--line))] transition-transform duration-500 hover:-translate-y-1 hover:rotate-0">
              <header className="mb-6 flex items-center justify-between gap-4 border-b border-dashed border-line pb-3 font-mono text-[11px] uppercase tracking-wide">
                <span className="text-muted">{n.project}</span>
                <span className={n.open ? 'bg-accent px-1.5 text-paper' : 'text-muted'}>
                  {n.tag}
                  {n.open ? ' · ouvert' : ''}
                </span>
              </header>
              <p className="font-serif text-2xl font-light leading-snug md:text-[1.7rem]">{n.text}</p>
              <span className="mt-6 block font-mono text-[10px] text-muted">n°{String(i + 1).padStart(2, '0')}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
