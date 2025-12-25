'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Linkedin, 
  Github, 
  MapPin, 
  Send, 
  CheckCircle,
  Loader2,
  MessageSquare,
  Phone
} from 'lucide-react'
import AIAssistant from '@/components/chat/AIAssistant'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'rayan.ghomsi@2026.ucac-icam.com', href: 'mailto:rayan.ghomsi@2026.ucac-icam.com' },
    { icon: Phone, label: 'Téléphone', value: '+237 6 98 34 07 74', href: 'tel:+237698340774' },
    { icon: Github, label: 'GitHub', value: 'github.com/Yansoki', href: 'https://github.com/Yansoki' },
    { icon: MapPin, label: 'Localisation', value: 'Douala, Cameroun', href: null },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Me <span className="gradient-text">Contacter</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Vous avez une opportunité de stage ou un projet à discuter ? 
            N&apos;hésitez pas à me contacter via le formulaire ou l&apos;assistant IA.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - AI Assistant */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-neural-glow" />
              <h2 className="text-xl font-semibold">Assistant IA</h2>
            </div>
            <AIAssistant />
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-neural-glow" />
              <h2 className="text-xl font-semibold">Formulaire de contact</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-neural-glow/50 focus:outline-none text-white placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-neural-glow/50 focus:outline-none text-white placeholder-gray-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">
                  Sujet
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-neural-glow/50 focus:outline-none text-white"
                >
                  <option value="" className="bg-neural-dark">Sélectionnez un sujet</option>
                  <option value="stage" className="bg-neural-dark">Proposition de stage</option>
                  <option value="job" className="bg-neural-dark">Opportunité professionnelle</option>
                  <option value="project" className="bg-neural-dark">Projet de collaboration</option>
                  <option value="other" className="bg-neural-dark">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-neural-glow/50 focus:outline-none text-white placeholder-gray-500 resize-none"
                  placeholder="Décrivez votre proposition ou votre demande..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-neural-glow to-neural-pulse text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message envoyé !
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </>
                )}
              </motion.button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="p-4 rounded-xl glass flex items-center gap-3 hover:bg-white/5 transition-colors group"
                    >
                      <info.icon className="w-5 h-5 text-neural-glow group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs text-gray-500">{info.label}</div>
                        <div className="text-sm text-gray-300">{info.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="p-4 rounded-xl glass flex items-center gap-3">
                      <info.icon className="w-5 h-5 text-neural-glow" />
                      <div>
                        <div className="text-xs text-gray-500">{info.label}</div>
                        <div className="text-sm text-gray-300">{info.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Availability Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-neural-glow/20 to-neural-pulse/20 border border-neural-glow/30 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">Recherche stage de fin d&apos;études</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Prêt à collaborer ?</h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Je recherche un stage de fin d&apos;études (6 mois) dans les domaines du 
            Machine Learning, Data Science et Data Engineering pour mettre mes compétences 
            au service de projets innovants.
          </p>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 rounded-2xl glass"
        >
          <h3 className="text-xl font-semibold mb-4">Centres d&apos;intérêt</h3>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'Astronomie', emoji: '🔭' },
              { name: 'Manga', emoji: '📚' },
              { name: 'Basket', emoji: '🏀' },
            ].map((interest) => (
              <div 
                key={interest.name}
                className="px-4 py-2 rounded-xl bg-white/5 flex items-center gap-2"
              >
                <span>{interest.emoji}</span>
                <span>{interest.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
