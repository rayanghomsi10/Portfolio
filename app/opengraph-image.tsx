import { ImageResponse } from 'next/og'
import { OG_SIZE, OgCard, loadFraunces } from '@/lib/og'

export const size = OG_SIZE
export const runtime = 'edge'
export const contentType = 'image/png'
export const alt = 'Rayan Ghomsi Talla · Data Scientist'

const TITLE = 'Des systèmes qui citent leurs sources.'

export default async function Image() {
  const fonts = await loadFraunces()
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Rayan Ghomsi Talla · Ingénieur IA · Data Scientist"
        title={TITLE}
        footer="MS SIO CentraleSupélec · stage 6 mois dès avril 2027"
        universe="mesh"
      />
    ),
    { ...OG_SIZE, fonts }
  )
}
