import { profile } from '@/lib/data/experience'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-2 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>
          <a href={`mailto:${profile.email}`} className="hover:text-accent">e-mail</a>
          {' · '}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">github</a>
          {' · '}
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">linkedin</a>
          {' · '}Next.js · canvas 2D
        </span>
      </div>
    </footer>
  )
}
