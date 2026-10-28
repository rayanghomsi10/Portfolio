'use client'

import dynamic from 'next/dynamic'

const EmbeddingField = dynamic(() => import('./EmbeddingField'), { ssr: false })

export default function HeroField() {
  return <EmbeddingField className="absolute inset-0 h-full w-full opacity-40 md:opacity-100" />
}
