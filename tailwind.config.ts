import type { Config } from 'tailwindcss'

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: token('paper'),
        surface: token('surface'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        accent: token('accent'),
        'accent-soft': token('accent-soft'),
        signal: token('signal'),
        positive: token('positive'),
        raw: token('raw'),
        'raw-ink': token('raw-ink'),
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        // Deux familles seulement : Fraunces (titres et texte), JetBrains Mono (données)
        sans: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '68rem',
      },
    },
  },
  plugins: [],
}
export default config
