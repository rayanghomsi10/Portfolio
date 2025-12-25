'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react'

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
  const konamiIndexRef = useRef(0)

  // Konami Code: ↑↑↓↓←→←→BA
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

  // Initialiser le thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark
    
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Konami Code listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndexRef.current]) {
        konamiIndexRef.current++
        
        if (konamiIndexRef.current === konamiCode.length) {
          setMatrixMode(true)
          setTimeout(() => setMatrixMode(false), 10000)
          konamiIndexRef.current = 0
        }
      } else {
        konamiIndexRef.current = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    if (newIsDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
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
