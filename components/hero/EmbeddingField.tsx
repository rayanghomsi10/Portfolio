'use client'

import { useEffect, useRef } from 'react'

/*
 * Un espace d'embeddings stylisé : chaque point est un « passage », regroupé par thème.
 * Le pointeur joue le rôle de la requête ; les k plus proches voisins s'allument,
 * comme l'étape de récupération d'un RAG. Sans pointeur, la requête dérive seule.
 */

const TOPICS = ['dbt', 'Airflow', 'PySpark', 'XGBoost', 'capteurs IoT', 'LangChain', 'ClickHouse', 'RAGAS', 'NiFi', 'FastAPI']
const K = 7

interface Point {
  x: number
  y: number
  bx: number
  by: number
  phase: number
  topic: number
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gaussian(rand: () => number) {
  const u = Math.max(rand(), 1e-9)
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand())
}

function readColor(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).join(',')
}

export default function EmbeddingField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let points: Point[] = []
    let centers: { x: number; y: number }[] = []
    let colors = { accent: '245,186,80', signal: '122,162,255', ink: '238,234,225', muted: '150,156,172' }
    const pointer = { x: 0, y: 0, active: false, lastMove: 0 }
    const query = { x: 0, y: 0 }
    let mono = 'ui-monospace, monospace'
    let frame = 0
    let raf = 0
    let visible = true

    const refreshColors = () => {
      colors = {
        accent: readColor('--accent'),
        signal: readColor('--signal'),
        ink: readColor('--ink'),
        muted: readColor('--muted'),
      }
      // next/font déclare la variable sur <body> ; le canvas a besoin du nom réel
      const family = getComputedStyle(document.body).getPropertyValue('--font-mono').trim()
      if (family) mono = `${family}, ui-monospace, monospace`
    }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const rand = mulberry32(42)
      const spreadX = width * 0.9
      // Les thèmes occupent surtout la moitié droite pour laisser respirer le titre
      centers = TOPICS.map((_, i) => {
        const col = i % 5
        const row = Math.floor(i / 5)
        return {
          x: width * 0.08 + (spreadX * (col + 0.5)) / 5 + (rand() - 0.5) * width * 0.08 + (width > 900 ? width * 0.12 * (col / 4) : 0),
          y: height * (0.28 + row * 0.42) + (rand() - 0.5) * height * 0.16,
        }
      })
      const count = Math.round(Math.min(520, Math.max(160, (width * height) / 2400)))
      const sigma = Math.min(width, height) * 0.085
      points = Array.from({ length: count }, () => {
        const topic = Math.floor(rand() * TOPICS.length)
        const c = centers[topic]
        const bx = c.x + gaussian(rand) * sigma
        const by = c.y + gaussian(rand) * sigma * 0.8
        return { x: bx, y: by, bx, by, phase: rand() * Math.PI * 2, topic }
      })
      if (!pointer.active) {
        query.x = width * 0.7
        query.y = height * 0.5
      }
    }

    const draw = (t: number) => {
      const time = t / 1000
      if (frame % 30 === 0) refreshColors()
      frame++

      // Requête : pointeur si actif récemment, sinon dérive en Lissajous
      const idle = !pointer.active || t - pointer.lastMove > 2500
      const tx = idle ? width * (0.62 + 0.26 * Math.sin(time * 0.23)) : pointer.x
      const ty = idle ? height * (0.5 + 0.3 * Math.sin(time * 0.31 + 1.3)) : pointer.y
      const ease = reduceMotion ? 1 : 0.08
      query.x += (tx - query.x) * ease
      query.y += (ty - query.y) * ease

      ctx.clearRect(0, 0, width, height)

      // Distances et top-k
      const amp = reduceMotion ? 0 : 3
      let maxD = 0
      const dists: { i: number; d: number }[] = []
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        p.x = p.bx + Math.sin(time * 0.6 + p.phase) * amp
        p.y = p.by + Math.cos(time * 0.5 + p.phase * 1.3) * amp
        const d = Math.hypot(p.x - query.x, p.y - query.y)
        if (d > maxD) maxD = d
        dists.push({ i, d })
      }
      dists.sort((a, b) => a.d - b.d)
      const top = dists.slice(0, K)
      const topSet = new Set(top.map((n) => n.i))

      // Nuage de points
      for (let i = 0; i < points.length; i++) {
        if (topSet.has(i)) continue
        const p = points[i]
        const near = Math.max(0, 1 - Math.hypot(p.x - query.x, p.y - query.y) / (Math.min(width, height) * 0.45))
        ctx.fillStyle = `rgba(${colors.signal},${0.32 + near * 0.5})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.4 + near * 1.4, 0, Math.PI * 2)
        ctx.fill()
      }

      // Étiquettes de thème
      ctx.font = `11px ${mono}`
      ctx.textAlign = 'center'
      const nearTopic = points[top[0].i].topic
      centers.forEach((c, i) => {
        ctx.fillStyle = i === nearTopic ? `rgba(${colors.accent},0.95)` : `rgba(${colors.muted},0.45)`
        ctx.fillText(TOPICS[i], c.x, c.y - Math.min(width, height) * 0.14)
      })

      // Liens requête → voisins
      top.forEach((n, rank) => {
        const p = points[n.i]
        const w = 1 - rank / K
        const grad = ctx.createLinearGradient(query.x, query.y, p.x, p.y)
        grad.addColorStop(0, `rgba(${colors.accent},${0.15 + w * 0.6})`)
        grad.addColorStop(1, `rgba(${colors.signal},${0.25 + w * 0.5})`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 0.6 + w * 1.2
        ctx.beginPath()
        ctx.moveTo(query.x, query.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        ctx.fillStyle = `rgba(${colors.signal},1)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.6 + w * 1.6, 0, Math.PI * 2)
        ctx.fill()

        if (rank < 3) {
          const sim = (1 - n.d / maxD).toFixed(2).replace('.', ',')
          ctx.fillStyle = `rgba(${colors.ink},0.8)`
          ctx.textAlign = 'left'
          ctx.fillText(sim, p.x + 7, p.y - 6)
        }
      })

      // La requête
      const pulse = reduceMotion ? 0 : (Math.sin(time * 3) + 1) / 2
      ctx.strokeStyle = `rgba(${colors.accent},${0.25 + pulse * 0.25})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(query.x, query.y, 12 + pulse * 6, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = `rgba(${colors.accent},1)`
      ctx.beginPath()
      ctx.arc(query.x, query.y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = `rgba(${colors.accent},0.9)`
      ctx.textAlign = 'left'
      ctx.fillText(`q · top-${K} · ${TOPICS[nearTopic]}`, query.x + 16, query.y + 4)
    }

    const loop = (t: number) => {
      draw(t)
      if (!reduceMotion && visible) raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        pointer.active = false
        return
      }
      pointer.x = x
      pointer.y = y
      pointer.active = true
      pointer.lastMove = performance.now()
      if (reduceMotion) draw(performance.now())
    }

    refreshColors()
    build()
    const ro = new ResizeObserver(() => {
      build()
      if (reduceMotion) draw(performance.now())
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible
      visible = entry.isIntersecting
      if (visible && !wasVisible && !reduceMotion) raf = requestAnimationFrame(loop)
    })
    io.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    const themeObserver = new MutationObserver(() => {
      refreshColors()
      if (reduceMotion) draw(performance.now())
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Visualisation : un nuage de passages regroupés par thème ; la requête relie ses sept plus proches voisins, comme l’étape de récupération d’un système RAG."
    />
  )
}
