'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, Smile, Meh, Frown } from 'lucide-react'

interface Prediction {
  label: string
  confidence: number
  icon: typeof Smile
  color: string
}

export default function TextPredictor() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<Prediction | null>(null)

  const analyzeSentiment = async () => {
    if (!text.trim()) return
    
    setIsLoading(true)
    
    // Simulate ML prediction (in real app, call TensorFlow.js or API)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple mock sentiment analysis
    const positiveWords = ['super', 'excellent', 'génial', 'parfait', 'incroyable', 'love', 'great', 'amazing', 'good', 'happy']
    const negativeWords = ['mauvais', 'terrible', 'nul', 'horrible', 'déteste', 'bad', 'awful', 'hate', 'sad', 'angry']
    
    const lowerText = text.toLowerCase()
    const positiveCount = positiveWords.filter(w => lowerText.includes(w)).length
    const negativeCount = negativeWords.filter(w => lowerText.includes(w)).length
    
    let result: Prediction
    if (positiveCount > negativeCount) {
      result = { label: 'Positif', confidence: 0.75 + Math.random() * 0.2, icon: Smile, color: '#22c55e' }
    } else if (negativeCount > positiveCount) {
      result = { label: 'Négatif', confidence: 0.75 + Math.random() * 0.2, icon: Frown, color: '#ef4444' }
    } else {
      result = { label: 'Neutre', confidence: 0.6 + Math.random() * 0.2, icon: Meh, color: '#f59e0b' }
    }
    
    setPrediction(result)
    setIsLoading(false)
  }

  return (
    <div className="p-6 rounded-2xl glass">
      <h3 className="text-lg font-semibold mb-4">Testez l&apos;analyse de sentiments</h3>
      
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Entrez un texte à analyser..."
            className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 focus:border-neural-glow/50 focus:outline-none resize-none text-white placeholder-gray-500"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={analyzeSentiment}
          disabled={isLoading || !text.trim()}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-neural-glow to-neural-pulse text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Analyser
            </>
          )}
        </motion.button>

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${prediction.color}20` }}
              >
                <prediction.icon className="w-6 h-6" style={{ color: prediction.color }} />
              </div>
              <div className="flex-1">
                <div className="font-semibold" style={{ color: prediction.color }}>
                  {prediction.label}
                </div>
                <div className="text-sm text-gray-400">
                  Confiance: {(prediction.confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            
            {/* Confidence Bar */}
            <div className="mt-4">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.confidence * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: prediction.color }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Example texts */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-gray-500 mb-2">Exemples à tester :</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Ce produit est excellent !',
              'Service terrible, très déçu',
              'Livraison correcte',
            ].map((example) => (
              <button
                key={example}
                onClick={() => setText(example)}
                className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-400 hover:bg-white/10 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
