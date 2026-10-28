import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/Sections'
import SkillExplorer from '@/components/skills/SkillExplorer'

export const metadata: Metadata = { title: 'Compétences · Rayan Ghomsi Talla' }

export default function SkillsPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Compétences"
        title={<>Chaque outil, <em className="text-accent">sa preuve</em></>}
        intro="Pas de jauges ni de pourcentages. Choisissez un outil pour voir dans quels projets il a servi, ou filtrez par projet pour voir sa stack. Les outils sans étude de cas sur ce site sont signalés comme tels."
      />
      <section className="mx-auto max-w-page px-4 pb-28 sm:px-6">
        <SkillExplorer />
      </section>
    </>
  )
}
