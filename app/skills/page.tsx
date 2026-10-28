import type { Metadata } from 'next'
import { PageHero, SkillMatrix } from '@/components/sections/Sections'

export const metadata: Metadata = { title: 'Compétences · Rayan Ghomsi Talla' }

export default function SkillsPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Compétences"
        title={<>Les outils, <em className="text-accent">rangés par usage</em></>}
        intro="Pas de jauges ni de pourcentages : chaque outil listé ici a servi dans un projet ou une expérience décrits sur ce site."
      />
      <section className="mx-auto max-w-page px-4 pb-28 sm:px-6">
        <SkillMatrix />
      </section>
    </>
  )
}
