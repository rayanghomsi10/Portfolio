import type { Metadata } from 'next'
import { PageHero, Timeline } from '@/components/sections/Sections'

export const metadata: Metadata = { title: 'Parcours · Rayan Ghomsi Talla' }

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Parcours"
        title={<>Douala, Nantes, <em className="text-accent">Saclay</em></>}
        intro="Ingénieur informatique en Génie Logiciel & Systèmes d’Information (UCAC-ICAM, accrédité CTI), aujourd’hui en Mastère Spécialisé à CentraleSupélec."
      />
      <section className="mx-auto max-w-page px-4 pb-28 sm:px-6">
        <Timeline />
      </section>
    </>
  )
}
