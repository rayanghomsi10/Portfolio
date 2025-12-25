'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { matrixMode } = useTheme()

  useEffect(() => {
    if (!matrixMode) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const charArray = chars.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 16, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00d4ff'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => clearInterval(interval)
  }, [matrixMode])

  if (!matrixMode) return null

  return (
    <canvas
      ref={canvasRef}
      className="matrix-mode"
      style={{ opacity: 0.8 }}
    />
  )
}
