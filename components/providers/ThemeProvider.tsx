'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
  matrixMode: boolean
  activateMatrix: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true)
  const [matrixMode, setMatrixMode] = useState(false)
  const [konamiIndex, setKonamiIndex] = useState(0)

  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        const newIndex = konamiIndex + 1
        setKonamiIndex(newIndex)
        
        if (newIndex === konamiCode.length) {
          activateMatrix()
          setKonamiIndex(0)
        }
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiIndex])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const activateMatrix = () => {
    setMatrixMode(true)
    setTimeout(() => setMatrixMode(false), 10000)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, matrixMode, activateMatrix }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
