import type { Metadata } from 'next'
import { PageHero, Timeline } from '@/components/sections/Sections'
import ArchitectureDiagram from '@/components/ui/ArchitectureDiagram'

export const metadata: Metadata = { title: 'Parcours · Rayan Ghomsi Talla' }

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Parcours"
        title={<>Douala, Nantes, <em className="text-accent">Saclay</em></>}
        intro="Ingénieur Data Science (UCAC-ICAM, accrédité CTI), aujourd’hui en Mastère Spécialisé à CentraleSupélec."
      />
      <section className="mx-auto max-w-page px-4 pb-16 sm:px-6">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-muted">Dernier poste · janv. – juin 2026</p>
        <ArchitectureDiagram id="orange" />
      </section>
      <section className="mx-auto max-w-page px-4 pb-28 sm:px-6">
        <Timeline />
      </section>
    </>
  )
}
