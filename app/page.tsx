import Link from 'next/link'
import { ArrowDown, ArrowRight, Github, Linkedin } from 'lucide-react'
import HeroField from '@/components/hero/HeroField'
import EvalReport from '@/components/ui/EvalReport'
import RagPipeline from '@/components/ui/RagPipeline'
import Reveal from '@/components/ui/Reveal'
import { ContactBlock, ProjectIndex, SectionHeader, SkillMatrix, Timeline } from '@/components/sections/Sections'
import { getProject } from '@/lib/data/projects'
import { profile } from '@/lib/data/experience'

const highlights = [
  { value: '0,973', label: 'evidence_hit', source: 'Assistant-RAG' },
  { value: '−30 %', label: 'taux de rebut', source: 'Jumeau numérique' },
  { value: '0,87', label: 'F1-score', source: 'Churn télécom' },
  { value: '1ère', label: 'place', source: 'TSA InnovLab' },
]

export default function HomePage() {
  const rag = getProject('assistant-rag')!

  return (
    <>
      {/* Héros */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <HeroField />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-paper via-paper/75 to-transparent md:via-paper/40"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-page flex-1 flex-col justify-center px-4 pb-10 pt-32 sm:px-6">
          <p className="mb-8 flex items-center gap-3 font-mono text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
            </span>
            MS SIO · CentraleSupélec — stage de 6 mois dès avril 2027
          </p>

          <h1 className="font-serif leading-[0.86] tracking-tight">
            <span className="block text-[clamp(4.2rem,14vw,11.5rem)]">Data</span>
            <span className="block text-[clamp(4.2rem,14vw,11.5rem)]">
              Scientist<span className="text-accent">.</span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-ink/90 md:text-3xl">
            Des modèles, et la preuve qu’ils tiennent leurs promesses.
          </p>
          <p className="mt-5 max-w-lg leading-relaxed text-muted">{profile.pitch}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#projet-phare"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              Voir Assistant-RAG
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/60 px-6 py-3 font-medium backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              Me contacter
            </Link>
            {[
              { href: profile.github, label: 'GitHub', Icon: Github },
              { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper/60 text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-page px-4 pb-8 sm:px-6">
          <p className="caret mb-4 hidden font-mono text-[11px] text-muted md:block">
            bougez la souris : vous êtes la requête, les points allumés sont ses plus proches voisins
          </p>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.source} className="bg-paper/85 px-4 py-4 backdrop-blur">
                <dt className="font-mono text-[11px] text-muted">
                  {h.label} · {h.source}
                </dt>
                <dd className="tabular mt-1 font-serif text-3xl text-ink md:text-4xl">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Projet phare */}
      <section id="projet-phare" className="mx-auto max-w-page scroll-mt-20 px-4 py-28 sm:px-6">
        <SectionHeader
          index="01"
          eyebrow="Projet phare"
          title={
            <>
              Assistant-RAG<span className="text-muted">, </span>
              <em className="text-accent">évalué</em> avant d’être montré.
            </>
          }
          intro={rag.context}
        />

        <div className="grid gap-10 md:grid-cols-[8rem_1fr] md:gap-10">
          <div className="hidden md:block" />
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
            <Reveal>
              <ul className="space-y-4">
                {rag.contributions.map((c) => (
                  <li key={c} className="flex gap-4 leading-relaxed text-ink/90">
                    <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={rag.repoUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-2">
                  <Github className="h-4 w-4" /> Code source
                </a>
                <Link href="/projects/assistant-rag" className="link inline-flex items-center gap-2">
                  Étude de cas complète <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <EvalReport results={rag.results} caption="85 questions : 73 dans le périmètre, 12 hors périmètre. Juge RAGAS : qwen2.5:7b." />
            </Reveal>
          </div>

          <div className="hidden md:block" />
          <Reveal className="rounded-lg border border-line bg-surface/40 p-5 sm:p-8">
            <p className="eyebrow mb-6">Pipeline</p>
            <RagPipeline />
          </Reveal>

          <div className="hidden md:block" />
          <Reveal className="border-l-2 border-accent pl-6">
            <p className="eyebrow mb-3">Ce qui ne marche pas encore</p>
            <ul className="space-y-1.5 text-muted">
              {rag.limits!.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Travaux */}
      <section className="mx-auto max-w-page px-4 py-28 sm:px-6">
        <SectionHeader
          index="02"
          eyebrow="Travaux"
          title={
            <>
              De la donnée brute <em className="text-accent">au modèle</em> en production.
            </>
          }
          intro="IA générative, Machine Learning industriel, Data Engineering : chaque projet a sa page, avec le contexte, ce que j’ai fait et ce que ça a donné."
        />
        <ProjectIndex exclude="assistant-rag" />
      </section>

      {/* Parcours */}
      <section className="mx-auto max-w-page px-4 py-28 sm:px-6">
        <SectionHeader
          index="03"
          eyebrow="Parcours"
          title={
            <>
              Douala, Nantes, <em className="text-accent">Saclay</em>.
            </>
          }
          intro="Ingénieur Data Science (UCAC-ICAM, accrédité CTI), aujourd’hui en Mastère Spécialisé à CentraleSupélec."
        />
        <Timeline />
      </section>

      {/* Compétences */}
      <section className="mx-auto max-w-page px-4 py-28 sm:px-6">
        <SectionHeader
          index="04"
          eyebrow="Boîte à outils"
          title={
            <>
              Les outils, <em className="text-accent">rangés par usage</em>.
            </>
          }
          intro="Pas de jauges ni de pourcentages : chaque outil listé ici a servi dans un projet ou une expérience décrits sur ce site."
        />
        <SkillMatrix />
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-page px-4 py-28 sm:px-6">
        <SectionHeader index="05" eyebrow="Contact" title={<>Parlons de votre <em className="text-accent">prochain modèle</em>.</>} />
        <div className="md:pl-[10.5rem]">
          <ContactBlock />
        </div>
      </section>
    </>
  )
}
