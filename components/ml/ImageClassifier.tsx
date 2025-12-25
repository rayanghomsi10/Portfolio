'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, Loader2, X } from 'lucide-react'

interface ClassificationResult {
  label: string
  confidence: number
}

export default function ImageClassifier() {
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ClassificationResult[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      processImage(file)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImage(file)
    }
  }

  const processImage = async (file: File) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const imageData = e.target?.result as string
      setImage(imageData)
      await classifyImage()
    }
    reader.readAsDataURL(file)
  }

  const classifyImage = async () => {
    setIsLoading(true)
    
    // Simulate ML classification (in real app, use TensorFlow.js)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock results
    const mockResults: ClassificationResult[] = [
      { label: 'Normal', confidence: 0.92 },
      { label: 'Anomalie Type A', confidence: 0.05 },
      { label: 'Anomalie Type B', confidence: 0.02 },
      { label: 'Autre', confidence: 0.01 },
    ]
    
    setResults(mockResults)
    setIsLoading(false)
  }

  const clearImage = () => {
    setImage(null)
    setResults([])
  }

  return (
    <div className="p-6 rounded-2xl glass">
      <h3 className="text-lg font-semibold mb-4">Testez le classificateur d&apos;images</h3>
      
      <div className="space-y-4">
        {!image ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging 
                ? 'border-neural-glow bg-neural-glow/10' 
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400 mb-2">
              Glissez une image ici ou cliquez pour sélectionner
            </p>
            <p className="text-xs text-gray-500">
              Formats supportés: JPG, PNG, WebP
            </p>
          </div>
        ) : (
          <div className="relative">
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded-xl"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 p-2 rounded-lg glass hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-4">
            <Loader2 className="w-5 h-5 animate-spin text-neural-glow" />
            <span className="text-gray-400">Classification en cours...</span>
          </div>
        )}

        {results.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-medium text-gray-400">Résultats :</h4>
            {results.map((result, index) => (
              <div key={result.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className={index === 0 ? 'text-neural-glow font-medium' : 'text-gray-400'}>
                    {result.label}
                  </span>
                  <span className={index === 0 ? 'text-neural-glow' : 'text-gray-500'}>
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`h-full rounded-full ${
                      index === 0 ? 'bg-neural-glow' : 'bg-white/30'
                    }`}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Demo note */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-gray-500">
            <ImageIcon className="w-3 h-3 inline mr-1" />
            Démo simulée. En production, utilise TensorFlow.js avec un modèle pré-entraîné.
          </p>
        </div>
      </div>
    </div>
  )
}
