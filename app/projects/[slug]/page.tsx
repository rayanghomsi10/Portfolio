import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Github } from 'lucide-react'
import EvalReport from '@/components/ui/EvalReport'
import RagPipeline from '@/components/ui/RagPipeline'
import HeroField from '@/components/hero/HeroField'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'
import { getProject, projects } from '@/lib/data/projects'

type Params = { params: Promise<{ slug: string }> }

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

  return (
    <article className="mx-auto max-w-page px-4 pb-28 pt-32 sm:px-6 md:pt-40">
      <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent">
        <ArrowLeft className="h-3.5 w-3.5" /> tous les projets
      </Link>

      <Reveal className="mt-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span>{project.domain}</span>
          <span>·</span>
          <span>{project.kind}</span>
          <span>·</span>
          <span>{project.period}</span>
          <span className={`rounded-full border px-2 py-0.5 ${project.status === 'En cours' ? 'border-accent/50 text-accent' : 'border-line'}`}>
            {project.status}
          </span>
        </div>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.95] md:text-8xl">{project.title}</h1>
        <p className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-ink/90">{project.summary}</p>
      </Reveal>

      <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-14">
          <Reveal>
            <h2 className="eyebrow mb-4">Contexte</h2>
            <p className="text-lg leading-relaxed text-ink/90">{project.context}</p>
          </Reveal>
          <Reveal>
            <h2 className="eyebrow mb-4">Ce que j’ai fait</h2>
            <ul className="space-y-4">
              {project.contributions.map((c) => (
                <li key={c} className="flex gap-4 leading-relaxed text-ink/90">
                  <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          {project.limits && (
            <Reveal className="border-l-2 border-accent pl-6">
              <h2 className="eyebrow mb-3">Limites connues</h2>
              <ul className="space-y-1.5 text-muted">
                {project.limits.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          {project.results.length > 0 && <EvalReport results={project.results} />}
          <div>
            <h2 className="eyebrow mb-3">Stack</h2>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-2">
              <Github className="h-4 w-4" /> Code source sur GitHub
            </a>
          )}
        </aside>
      </div>

      {project.slug === 'assistant-rag' && (
        <>
          <Reveal className="mt-20 border border-ink bg-surface p-5 sm:p-8">
            <p className="eyebrow mb-6">Pipeline</p>
            <RagPipeline />
          </Reveal>
          <Reveal className="mt-6 grid gap-6 md:grid-cols-12">
            <figure className="relative h-[420px] overflow-hidden border border-ink bg-surface md:col-span-8">
              <HeroField />
            </figure>
            <figcaption className="self-end text-sm leading-relaxed text-muted md:col-span-4">
              <span className="eyebrow mb-3 block">Figure · récupération</span>
              Illustration de l’étape de récupération : chaque point est un passage, regroupé par thème. Bougez la souris : elle joue la requête, et ses sept plus proches voisins s’allument. Schéma pédagogique, pas les vrais embeddings du projet.
            </figcaption>
          </Reveal>
        </>
      )}

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

      <Link
        href={`/projects/${next.slug}`}
        className="group mt-28 flex items-end justify-between gap-6 border-t border-line pt-8"
      >
        <span>
          <span className="eyebrow">Projet suivant</span>
          <span className="mt-2 block font-serif text-4xl transition-colors group-hover:text-accent md:text-6xl">{next.title}</span>
        </span>
        <ArrowRight className="mb-3 h-6 w-6 shrink-0 text-muted transition-transform group-hover:translate-x-2 group-hover:text-accent" />
      </Link>
    </article>
  )
}
