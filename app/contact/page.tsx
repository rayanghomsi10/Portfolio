import type { Metadata } from 'next'
import { ContactBlock, PageHero } from '@/components/sections/Sections'

export const metadata: Metadata = { title: 'Contact · Rayan Ghomsi Talla' }

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Contact"
        title={<>Parlons de votre <em className="text-accent">prochain modèle</em></>}
        intro="Je cherche un stage de 6 mois en IA ou Data Science à partir d’avril 2027. Le plus simple est de m’écrire."
      />
      <section className="mx-auto max-w-page px-4 pb-28 sm:px-6 md:pl-[11.5rem]">
        <ContactBlock />
      </section>
    </>
  )
}
