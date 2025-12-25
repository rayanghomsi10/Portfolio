import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import MatrixRain from '@/components/effects/MatrixRain'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rayan GHOMSI TALLA | Data Scientist & IA Engineer',
  description: 'Portfolio de Rayan Gabriel GHOMSI TALLA - Étudiant ingénieur en Data Science & Intelligence Artificielle. Projets Machine Learning, Deep Learning, modèles prédictifs avec TensorFlow, PyTorch, Scikit-learn.',
  keywords: ['Data Science', 'Intelligence Artificielle', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Python', 'Portfolio', 'Rayan GHOMSI', 'IA'],
  authors: [{ name: 'Rayan Gabriel GHOMSI TALLA' }],
  openGraph: {
    title: 'Rayan GHOMSI TALLA | Data Scientist & IA Engineer',
    description: 'Découvrez mes projets en Machine Learning et Intelligence Artificielle - Modèles prédictifs, Deep Learning, Data Science',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-neural-darker text-white antialiased`}>
        <ThemeProvider>
          <MatrixRain />
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
