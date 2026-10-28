'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/projects', label: 'Projets', index: '01' },
  { href: '/experience', label: 'Parcours', index: '02' },
  { href: '/skills', label: 'Compétences', index: '03' },
  { href: '/contact', label: 'Contact', index: '04' },
]

export default function Navigation() {
  const pathname = usePathname()
  const { isDark, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        isScrolled ? 'border-b border-line bg-paper/80 backdrop-blur-md' : 'border-b border-transparent'
      )}
    >
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-2xl leading-none">Rayan Ghomsi Talla</span>
          <span className="hidden font-mono text-[11px] text-muted transition-colors group-hover:text-accent sm:inline">
            /data-scientist
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Navigation principale" className="flex items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group flex items-baseline gap-1 rounded px-2 py-2 text-sm transition-colors sm:px-3',
                    isActive ? 'text-accent' : 'text-muted hover:text-ink'
                  )}
                >
                  <span className="hidden font-mono text-[10px] opacity-60 md:inline">{item.index}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <button
            onClick={toggleTheme}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label={isDark ? 'Passer en thème clair' : 'Passer en thème sombre'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
