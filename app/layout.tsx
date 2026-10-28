import type { Metadata } from 'next'
import { Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { ThemeProvider, themeInitScript } from '@/components/providers/ThemeProvider'

const serif = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['SOFT', 'WONK', 'opsz'], variable: '--font-serif' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

// URL absolue des images de partage : domaine de production Vercel s'il est connu
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Rayan Ghomsi Talla · Data Scientist',
  description:
    'Data Scientist en Mastère Spécialisé à CentraleSupélec : Machine Learning, IA générative (RAG, Graph-RAG) et évaluation de modèles. Stage de 6 mois à partir d’avril 2027.',
  keywords: ['Data Scientist', 'Machine Learning', 'IA générative', 'RAG', 'Graph-RAG', 'MLOps', 'CentraleSupélec', 'Rayan Ghomsi Talla'],
  authors: [{ name: 'Rayan Gabriel Ghomsi Talla' }],
  openGraph: {
    title: 'Rayan Ghomsi Talla · Data Scientist',
    description: 'Machine Learning, IA générative et évaluation de modèles. Stage à partir d’avril 2027.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${serif.variable} ${mono.variable} font-serif antialiased`}>
        <ThemeProvider>
          <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-paper">
            Aller au contenu
          </a>
          <Navigation />
          <main id="contenu" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
