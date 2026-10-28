import { ImageResponse } from 'next/og'
import { getProject } from '@/lib/data/projects'
import { OG_SIZE, OgCard, loadFraunces } from '@/lib/og'

export const size = OG_SIZE
export const runtime = 'edge'
export const contentType = 'image/png'
export const alt = 'Étude de cas · Rayan Ghomsi Talla'


export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)!
  const metric = project.results[0]
  const fonts = await loadFraunces()
  return new ImageResponse(
    (
      <OgCard
        eyebrow={`Rayan Ghomsi Talla · ${project.domain}`}
        title={project.title}
        footer={`${project.kind} · ${project.period}`}
        metric={metric ? { value: metric.value, label: metric.label } : undefined}
        universe={project.universe}
      />
    ),
    { ...OG_SIZE, fonts }
  )
}
