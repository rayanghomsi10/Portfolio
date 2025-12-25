'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: `Bonjour ! 👋 Je suis l'assistant IA du portfolio de Rayan. Je peux vous renseigner sur :

- **Son parcours** et ses expériences (ICAM Nantes, UCAC-ICAM)
- **Ses projets** en Big Data et Machine Learning
- **Ses compétences** techniques (PySpark, Airflow, TensorFlow...)
- **Comment le contacter** pour un stage de fin d'études

Que souhaitez-vous savoir ?`,
    timestamp: new Date(),
  },
]

// Simulated responses based on keywords
const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('projet') || lowerMessage.includes('travail') || lowerMessage.includes('réalisation')) {
    return `Rayan a travaillé sur plusieurs projets majeurs :

🔹 **Prédiction du Churn Télécom** (UCAC-ICAM, 2025)
- Data Lake centralisant 5 sources de données
- Traitement de +1 Go/jour avec Apache NiFi et Sqoop
- Modèle PySpark avec F1-score de 87%
- Pipeline automatisé avec Airflow (72h → 1h)

🔹 **Jumeau Numérique Extrudeuse** (ICAM Nantes, 2024-2025)
- Prédiction qualité en temps réel
- Précision de 92% sur les paramètres
- Réduction du taux de rebut de 30%
- Pipeline IoT avec 20+ capteurs

Découvrez les détails sur la page [Projets](/projects) !`
  }
  
  if (lowerMessage.includes('compétence') || lowerMessage.includes('skill') || lowerMessage.includes('technologie') || lowerMessage.includes('stack')) {
    return `Voici les compétences principales de Rayan :

**Big Data & ETL**
- PySpark, Apache Airflow, Apache NiFi
- Hadoop/HDFS, Hive, Sqoop, Superset

**Machine Learning & Deep Learning**
- Scikit-learn, TensorFlow, Keras, PyTorch
- XGBoost, Random Forest, Réseaux de neurones

**Data & Visualisation**
- Python (Pandas, NumPy), SQL (PostgreSQL, MySQL)
- Power BI, Tableau, Plotly

**Développement**
- Django, Laravel, JavaScript, Tailwind

Explorez la galaxie 3D sur la page [Compétences](/skills) !`
  }
  
  if (lowerMessage.includes('expérience') || lowerMessage.includes('parcours') || lowerMessage.includes('carrière') || lowerMessage.includes('formation')) {
    return `Le parcours de Rayan :

📍 **Data Engineer / Data Scientist** @ UCAC-ICAM (Mars-Juin 2025)
- Architecture Data Lake télécom, prédiction du churn (F1: 87%)

📍 **Chercheur Data Science** @ ICAM Nantes (Sept 2024 - Jan 2025)
- Jumeau numérique d'extrudeuse, précision 92%

📍 **Développeur Full Stack** @ Digital Experience (Jan-Avr 2024)
- Plateforme de gestion de cantine d'entreprise

📍 **Développeur Web Junior** @ Lab2view (Mai-Juin 2023)
- Plateforme E-commerce avec paiement sécurisé

🎓 **Ingénierie Informatique** - UCAC-ICAM Yansoki (2021-Présent)
- Spécialisation Data Science & Big Data
- Mobilité internationale ICAM Nantes

Plus de détails sur la page [Expérience](/experience) !`
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('joindre') || lowerMessage.includes('stage')) {
    return `Vous pouvez contacter Rayan via :

📧 **Email** : rayan.ghomsi@2026.ucac-icam.com
📱 **Téléphone** : +237 6 98 34 07 74
📍 **Localisation** : Douala, Cameroun

🎯 **Recherche** : Stage de fin d'études en Data Science / Data Engineering

Rayan est actuellement **disponible** pour un stage de fin d'études (6 mois) à partir de 2025.

N'hésitez pas à utiliser le formulaire de contact ci-dessous !`
  }

  if (lowerMessage.includes('churn') || lowerMessage.includes('télécom')) {
    return `Le projet **Prédiction du Churn Télécom** est le projet phare de Rayan :

📊 **Architecture**
- Data Lake centralisant 5 sources : CRM, logs réseau, facturation, support, usage
- Ingestion avec Apache NiFi et Sqoop vers HDFS

🤖 **Modélisation**
- Modèles PySpark : Random Forest, Gradient Boosting
- F1-score de 87% sur 10 000+ profils clients
- Détection de 85% des clients à risque

⚡ **Automatisation**
- Pipeline ETL+ML orchestré avec Airflow
- Réduction du temps de traitement : 72h → 1h
- Ré-entraînement hebdomadaire automatique`
  }

  if (lowerMessage.includes('jumeau') || lowerMessage.includes('extrudeuse') || lowerMessage.includes('icam nantes')) {
    return `Le projet **Jumeau Numérique** réalisé à l'ICAM Nantes :

🏭 **Contexte**
- Extrudeuse de plastique industrielle
- Prédiction de la qualité du produit final en temps réel

📈 **Résultats**
- Précision de 92% sur les paramètres de qualité
- Réduction du taux de rebut de 30%
- Anticipation des défauts avant production

🔧 **Technologies**
- Modèles : Random Forest, XGBoost, Réseaux de neurones
- Pipeline : Apache NiFi, PostgreSQL
- 20+ capteurs IoT en temps réel`
  }
  
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
    return `Bonjour ! 😊 Ravi de vous accueillir sur le portfolio de Rayan ! Comment puis-je vous aider ?`
  }
  
  if (lowerMessage.includes('merci')) {
    return `Avec plaisir ! N'hésitez pas si vous avez d'autres questions sur Rayan. Bonne visite ! 🚀`
  }

  if (lowerMessage.includes('qui') && (lowerMessage.includes('rayan') || lowerMessage.includes('tu'))) {
    return `**Rayan Gabriel GHOMSI TALLA** est un étudiant ingénieur en Data Science passionné par l'IA et le Big Data.

🎓 En dernière année à l'UCAC-ICAM Yansoki (Douala, Cameroun)
💼 Expériences en Data Engineering et recherche en ML
🔬 Spécialisé dans les pipelines Big Data et les modèles prédictifs

Il recherche actuellement un **stage de fin d'études** pour mettre ses compétences au service de projets innovants !`
  }
  
  return `Je comprends votre question ! Voici ce que je peux vous dire sur Rayan :

Rayan est un étudiant ingénieur en Data Science à l'UCAC-ICAM, passionné par le Big Data et le Machine Learning. Il a notamment travaillé sur :
- Un Data Lake télécom avec prédiction du churn (F1: 87%)
- Un jumeau numérique industriel (précision: 92%)

Posez-moi des questions sur :
- Ses **projets** et réalisations
- Ses **compétences** techniques
- Son **parcours** professionnel
- Comment le **contacter** pour un stage

Je serai ravi de vous répondre ! 🤖`
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getAIResponse(input),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestedQuestions = [
    'Quels sont ses projets ?',
    'Parle-moi du projet churn',
    'Quelles sont ses compétences ?',
    'Comment le contacter ?',
  ]

  return (
    <div className="flex flex-col h-[500px] rounded-2xl glass overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neural-glow to-neural-pulse flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-semibold">Assistant IA - Portfolio Rayan</div>
          <div className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            En ligne
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div 
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-neural-pulse/20' 
                    : 'bg-neural-glow/20'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-neural-pulse" />
                ) : (
                  <Sparkles className="w-4 h-4 text-neural-glow" />
                )}
              </div>
              <div 
                className={`max-w-[80%] p-3 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-neural-pulse/20 text-white'
                    : 'bg-white/5 text-gray-200'
                }`}
              >
                <ReactMarkdown
                  className="text-sm prose prose-invert prose-sm max-w-none"
                  components={{
                    a: ({ href, children }) => (
                      <a href={href} className="text-neural-glow hover:underline">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-neural-glow/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-neural-glow" />
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => setInput(question)}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-400 hover:bg-white/10 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question sur Rayan..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-neural-glow/50 focus:outline-none text-white placeholder-gray-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-neural-glow to-neural-pulse text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTyping ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
