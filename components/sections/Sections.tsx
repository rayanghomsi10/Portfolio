import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { projects } from '@/lib/data/projects'
import {
  certifications,
  earlierExperiences,
  education,
  experiences,
  languages,
  profile,
} from '@/lib/data/experience'
import Reveal from '@/components/ui/Reveal'

export function SectionHeader({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <Reveal className="mb-12 grid gap-6 md:grid-cols-[8rem_1fr] md:gap-10">
      <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
        <span className="font-mono text-sm text-accent">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div>
        <h2 className="section-title">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
    </Reveal>
  )
}

export function ProjectIndex({ exclude }: { exclude?: string }) {
  const list = projects.filter((p) => p.slug !== exclude)
  return (
    <ul className="border-t border-line">
      {list.map((p, i) => {
        const key = p.results[0]
        return (
          <li key={p.slug}>
            <Reveal delay={i * 0.05}>
              <Link
                href={`/projects/${p.slug}`}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 border-b border-line px-1 py-7 transition-colors hover:bg-accent-soft/40 md:grid-cols-[3rem_1fr_14rem_10rem] md:px-3"
              >
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block font-serif text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                    {p.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm text-muted">{p.summary}</span>
                </span>
                <span className="col-start-2 font-mono text-xs text-muted md:col-start-auto">
                  {p.domain}
                  <br />
                  {p.period}
                  {p.status === 'En cours' && <span className="ml-2 text-accent">● en cours</span>}
                </span>
                <span className="col-start-3 row-start-1 flex items-center justify-end gap-3 md:col-start-auto md:row-start-auto">
                  {key && (
                    <span className="hidden text-right md:block">
                      <span className="tabular block font-mono text-xl text-accent">{key.value}</span>
                      <span className="block font-mono text-[11px] text-muted">{key.label}</span>
                    </span>
                  )}
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </span>
              </Link>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}

export function Timeline() {
  return (
    <div className="grid gap-16 lg:grid-cols-[1fr_20rem]">
      <ol className="relative border-l border-line">
        {experiences.map((e, i) => (
          <li key={e.company} className="relative pb-12 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border border-accent bg-paper" aria-hidden />
            <Reveal delay={i * 0.05}>
              <p className="font-mono text-xs text-muted">
                {e.period} · {e.location}
              </p>
              <h3 className="mt-1 font-serif text-3xl leading-tight">{e.title}</h3>
              <p className="text-accent">{e.company}</p>
              <ul className="mt-4 space-y-2 text-muted">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-3 leading-relaxed">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-line" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {e.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              {e.projectSlug && (
                <Link href={`/projects/${e.projectSlug}`} className="link mt-4 inline-block text-sm">
                  Voir l’étude de cas
                </Link>
              )}
            </Reveal>
          </li>
        ))}
        <li className="relative pl-8">
          <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border border-line bg-paper" aria-hidden />
          <p className="eyebrow">Avant la data</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {earlierExperiences.map((e) => (
              <li key={e.company}>
                {e.title}, {e.company} · <span className="font-mono text-xs">{e.period}</span>
              </li>
            ))}
          </ul>
        </li>
      </ol>

      <aside className="space-y-10">
        <Reveal>
          <h3 className="eyebrow mb-4">Formation</h3>
          <ul className="space-y-5">
            {education.map((ed) => (
              <li key={ed.school}>
                <p className="font-serif text-2xl leading-tight">{ed.school}</p>
                <p className="mt-1 text-sm text-muted">{ed.degree}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {ed.period} · {ed.location}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="eyebrow mb-4">Certifications</h3>
          <ul className="space-y-1 text-sm">
            {certifications.map((c) => (
              <li key={c.name}>
                {c.name} <span className="text-muted">· {c.issuer}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <h3 className="eyebrow mb-4">Langues</h3>
          <ul className="space-y-1 text-sm">
            {languages.map((l) => (
              <li key={l.name}>
                {l.name} <span className="text-muted">· {l.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </aside>
    </div>
  )
}

export function ContactBlock() {
  return (
    <div>
      <Reveal>
        <p className="eyebrow mb-6">{profile.availability}</p>
        <a
          href={`mailto:${profile.email}`}
          className="group inline-block font-serif text-[clamp(1.55rem,6.4vw,3.75rem)] leading-tight transition-colors hover:text-accent"
        >
          {profile.email.split('@')[0]}
          <wbr />@{profile.email.split('@')[1]}
          <span className="block h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
        </a>
      </Reveal>
      <Reveal delay={0.1}>
        <ul className="mt-12 grid gap-4 font-mono text-sm sm:grid-cols-2">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted transition-colors hover:text-accent">
              <Linkedin className="h-4 w-4" /> linkedin.com/in/{profile.linkedinHandle}
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted transition-colors hover:text-accent">
              <Github className="h-4 w-4" /> github.com/{profile.githubHandle}
            </a>
          </li>
          <li>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-muted transition-colors hover:text-accent">
              <Phone className="h-4 w-4" /> {profile.phone}
            </a>
          </li>
          <li className="flex items-center gap-3 text-muted">
            <MapPin className="h-4 w-4" /> {profile.location}
          </li>
          <li className="sm:hidden">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-muted">
              <Mail className="h-4 w-4" /> écrire un e-mail
            </a>
          </li>
        </ul>
      </Reveal>
    </div>
  )
}

export function PageHero({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <div className="mx-auto max-w-page px-4 pb-12 pt-36 sm:px-6 md:pt-44">
      <SectionHeader index={index} eyebrow={eyebrow} title={<span className="text-5xl md:text-7xl">{title}</span>} intro={intro} />
    </div>
  )
}
