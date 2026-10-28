import Link from 'next/link'
import LensHero from '@/components/hero/LensHero'
import WorkRail from '@/components/work/WorkRail'
import Notebook from '@/components/work/Notebook'
import Reveal from '@/components/ui/Reveal'
import { projects } from '@/lib/data/projects'
import { education, experiences, profile } from '@/lib/data/experience'

const display = { fontVariationSettings: '"SOFT" 100, "WONK" 1' }

export default function HomePage() {
  const latest = experiences[0]

  return (
    <>
      <LensHero />

      {/* Manifeste : une phrase, décalée */}
      <section className="mx-auto grid max-w-[90rem] grid-cols-1 gap-8 px-4 py-32 sm:px-8 md:grid-cols-12">
        <Reveal className="md:col-span-2">
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Méthode</p>
        </Reveal>
        <Reveal className="md:col-span-9 md:col-start-4" delay={0.05}>
          <p className="font-serif text-3xl font-light leading-[1.15] tracking-[-0.02em] md:text-5xl" style={display}>
            Avant de vous montrer un score, je vous montre comment je l’ai mesuré :{' '}
            <span className="text-muted">le jeu de test, l’intervalle de confiance, et ce qui ne marche pas encore.</span>
          </p>
        </Reveal>
      </section>

      <WorkRail projects={projects} />

      <Notebook />

      {/* En bref : trois blocs de largeurs différentes, pas un CV */}
      <section className="border-y border-ink">
        <div className="mx-auto grid max-w-[90rem] md:grid-cols-12">
          <div className="border-b border-ink p-8 md:col-span-5 md:border-b-0 md:border-r">
            <p className="font-mono text-[11px] uppercase tracking-wide text-accent">03 — En ce moment</p>
            <p className="mt-6 font-serif text-4xl font-light leading-[0.95] md:text-5xl" style={display}>
              {education[0].school}
            </p>
            <p className="mt-3 text-sm text-muted">{education[0].degree}</p>
          </div>
          <div className="border-b border-ink p-8 md:col-span-4 md:border-b-0 md:border-r">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Dernier poste</p>
            <p className="mt-6 font-serif text-3xl font-light leading-tight" style={display}>
              {latest.company}
            </p>
            <p className="mt-3 text-sm text-muted">
              {latest.title} · {latest.period}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-6 p-8 md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Le reste</p>
            <div className="flex flex-col gap-2 font-mono text-sm">
              <Link href="/experience" className="hover:text-accent">Parcours complet →</Link>
              <Link href="/skills" className="hover:text-accent">Outils →</Link>
              <Link href="/projects" className="hover:text-accent">Études de cas →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-[90rem] px-4 py-32 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-wide text-accent">04 — Contact</p>
            <h2 className="mt-4 font-serif text-5xl font-light leading-[0.9] tracking-[-0.03em] md:text-8xl" style={display}>
              Six mois, <em>dès avril 2027.</em>
            </h2>
            <p className="mt-6 max-w-md text-muted">
              Je cherche un stage en IA ou en Data Science. Si vous avez un modèle à construire ou à évaluer, écrivez-moi.
            </p>
          </Reveal>
          <Reveal className="self-end md:col-span-5" delay={0.1}>
            <ul className="divide-y divide-ink border-y border-ink font-mono text-sm">
              {[
                { label: 'E-mail', value: profile.email, href: `mailto:${profile.email}` },
                { label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedin },
                { label: 'GitHub', value: profile.githubHandle, href: profile.github },
                { label: 'Téléphone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
              ].map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:bg-ink hover:px-3 hover:text-paper"
                  >
                    <span className="text-[11px] uppercase tracking-wide text-muted group-hover:text-paper/70">{c.label}</span>
                    <span className="min-w-0 truncate text-right">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
