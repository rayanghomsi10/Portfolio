import type { Metadata } from 'next'
import { PageHero, ProjectIndex } from '@/components/sections/Sections'

export const metadata: Metadata = { title: 'Projets · Rayan Ghomsi Talla' }

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="Projets"
        title={<>Travaux <em className="text-accent">choisis</em></>}
        intro="IA générative, Machine Learning industriel et Data Engineering. Chaque page détaille le contexte, ma contribution, les résultats mesurés et, quand il y en a, les limites."
      />
      <section className="mx-auto max-w-page px-4 pb-28 sm:px-6">
        <ProjectIndex />
      </section>
    </>
  )
}
