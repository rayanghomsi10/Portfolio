import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Github } from 'lucide-react'
import EvalReport from '@/components/ui/EvalReport'
import RagPipeline from '@/components/ui/RagPipeline'
import ArchitectureDiagram from '@/components/ui/ArchitectureDiagram'
import BonusConcurrency from '@/components/ui/BonusConcurrency'
import RagGuardrails from '@/components/ui/RagGuardrails'
import { architectures } from '@/lib/data/architectures'
import MetricFlip from '@/components/ui/MetricFlip'
import Reveal from '@/components/ui/Reveal'
import HeroField from '@/components/hero/HeroField'
import Motif from '@/components/universe/Motif'
import { getProject, projects } from '@/lib/data/projects'

type Params = { params: Promise<{ slug: string }> }

const display = { fontVariationSettings: '"SOFT" 100, "WONK" 1' }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug)
  return project ? { title: `${project.title} · Rayan Ghomsi Talla`, description: project.summary } : {}
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]
  const scored = project.results.some((r) => r.score !== undefined)

  return (
    <div data-universe={project.universe}>

      {/* En-tête */}
      <header className="relative overflow-hidden border-b border-ink">
        <Motif kind={project.universe} className="absolute inset-y-0 right-0 hidden h-full w-1/2 opacity-25 md:block" />
        <div className="relative mx-auto max-w-[90rem] px-4 pb-16 pt-32 sm:px-8 md:pt-40">
          <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-accent">
            <ArrowLeft className="h-3.5 w-3.5" /> Tous les projets
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-wide text-muted">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
            <span>{project.domain}</span>
            <span>·</span>
            <span>{project.kind}</span>
            <span>·</span>
            <span>{project.period}</span>
            <span className={`border px-2 py-0.5 ${project.status === 'En cours' ? 'border-accent text-accent' : 'border-ink text-ink'}`}>{project.status}</span>
          </div>
          <h1 className="mt-6 max-w-5xl font-serif text-6xl font-light leading-[0.88] tracking-[-0.035em] md:text-9xl" style={display}>
            {project.title}
          </h1>
        </div>
      </header>

      <article className="mx-auto max-w-[90rem] px-4 pb-28 sm:px-8">
        {/* Niveau 1 : pour tous */}
        <section aria-labelledby="en-bref" className="grid grid-cols-1 gap-10 border-b border-ink py-16 md:grid-cols-12">
          <h2 id="en-bref" className="font-mono text-[11px] uppercase tracking-wide text-accent md:col-span-2">
            En bref
          </h2>
          <dl className="space-y-8 md:col-span-9 md:col-start-4">
            {[
              ['Le problème', project.plain.problem],
              ['Ce que j’ai fait', project.plain.did],
              ['Le résultat', project.plain.result],
            ].map(([t, d]) => (
              <Reveal key={t} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
                <dt className="pt-2 font-mono text-[11px] uppercase tracking-wide text-muted">{t}</dt>
                <dd className="font-serif text-2xl font-light leading-snug md:text-4xl" style={display}>
                  {d}
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {project.results.length > 0 && (
          <section className="grid grid-cols-2 gap-4 py-12 md:grid-cols-4 lg:grid-cols-5">
            {project.results.map((r) => (
              <MetricFlip key={r.label} result={r} />
            ))}
          </section>
        )}

        <div className="flex flex-wrap gap-3 py-6">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-ink hover:text-paper"
            >
              <Github className="h-4 w-4" /> Voir le code
            </a>
          )}
          <Link href="/contact" className="bg-ink px-5 py-3 font-mono text-xs uppercase tracking-wide text-paper transition-colors hover:bg-accent">
            Me recruter · stage dès avril 2027
          </Link>
        </div>

        {/* Planche technique : l'architecture réelle, tracée au scroll */}
        {project.slug === 'assistant-rag' ? (
          <div className="mt-10 space-y-6">
            <figure className="border border-ink bg-surface">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink px-5 py-4 sm:px-8">
                <figcaption className="font-serif text-2xl font-light leading-tight md:text-3xl" style={display}>
                  De la question à la réponse citée
                </figcaption>
                <span className="font-mono text-[11px] uppercase tracking-wide text-accent">Planche technique</span>
              </div>
              <div className="p-5 sm:p-8">
                <RagPipeline />
              </div>
            </figure>
            <RagGuardrails />
          </div>
        ) : (
          architectures[project.slug] && (
            <div className="mt-10 space-y-6">
              <ArchitectureDiagram id={project.slug} />
              {project.slug === 'colorfol-backend' && <BonusConcurrency />}
            </div>
          )
        )}

        {/* Niveau 2 : pour les équipes techniques */}
        <details className="group mt-10 border-y border-ink">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-wide text-accent">Pour les équipes techniques</span>
              <span className="mt-1 block font-serif text-3xl font-light md:text-4xl" style={display}>
                Contexte, réalisation, métriques
              </span>
            </span>
            <span className="font-mono text-2xl transition-transform duration-300 group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>

          <div className="space-y-16 pb-16 pt-6">
            <div className="grid gap-14 lg:grid-cols-[1fr_22rem]">
              <div className="space-y-12">
                <div>
                  <h3 className="eyebrow mb-4">Contexte</h3>
                  <p className="text-lg leading-relaxed">{project.context}</p>
                </div>
                <div>
                  <h3 className="eyebrow mb-4">Réalisation</h3>
                  <ul className="space-y-4">
                    {project.contributions.map((c) => (
                      <li key={c} className="flex gap-4 leading-relaxed">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                {project.limits && (
                  <div className="border-l-2 border-accent pl-6">
                    <h3 className="eyebrow mb-3">Limites connues et compromis</h3>
                    <ul className="space-y-1.5 text-muted">
                      {project.limits.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <aside className="space-y-8">
                {scored && <EvalReport results={project.results} />}
                <div>
                  <h3 className="eyebrow mb-3">Stack</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>

            {project.slug === 'assistant-rag' && (
              <div className="grid gap-6 md:grid-cols-12">
                <figure className="relative h-[380px] overflow-hidden border border-ink bg-surface md:col-span-8">
                  <HeroField />
                </figure>
                <figcaption className="self-end text-sm leading-relaxed text-muted md:col-span-4">
                  <span className="eyebrow mb-3 block">Figure · récupération</span>
                  Illustration de l’étape de récupération : chaque point est un passage, regroupé par thème. Bougez la souris : elle joue la requête, et ses sept plus proches voisins s’allument. Schéma pédagogique, pas les vrais embeddings du projet.
                </figcaption>
              </div>
            )}
          </div>
        </details>

        {project.media && project.media.length > 0 && (
          <section className="mt-20">
            <h2 className="eyebrow mb-6">Notes de travail</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {project.media.map((m, i) => (
                <figure key={m.src} className={i % 2 ? 'md:mt-16 md:rotate-[0.6deg]' : 'md:-rotate-[0.6deg]'}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-ink">
                    <Image src={m.src} alt={m.alt} fill className="object-cover" />
                  </div>
                  <figcaption className="mt-3 font-mono text-xs text-muted">{m.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <Link href={`/projects/${next.slug}`} className="group mt-24 flex items-end justify-between gap-6 border-t border-ink pt-8">
          <span>
            <span className="eyebrow">Projet suivant</span>
            <span className="mt-2 block font-serif text-4xl font-light transition-colors group-hover:text-accent md:text-6xl" style={display}>
              {next.title}
            </span>
          </span>
          <ArrowRight className="mb-3 h-6 w-6 shrink-0 text-muted transition-transform group-hover:translate-x-2 group-hover:text-accent" />
        </Link>
      </article>
    </div>
  )
}
