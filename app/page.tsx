'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, FileText, Phone } from 'lucide-react'
import Link from 'next/link'

const NeuralNetwork = dynamic(() => import('@/components/3d/NeuralNetwork'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-neural-glow border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <NeuralNetwork />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neural-darker/50 to-neural-darker z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">Recherche stage de fin d&apos;études</span>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-neural-glow mb-2"
          >
            Rayan Gabriel GHOMSI TALLA
          </motion.p>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block text-white">Data Scientist</span>
            <span className="block gradient-text">&amp; IA Engineer</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Passionné par l&apos;Intelligence Artificielle et la Data Science. Je conçois des modèles 
            de Machine Learning et Deep Learning pour résoudre des problèmes complexes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-neural-glow to-neural-pulse text-white font-semibold shadow-lg shadow-neural-glow/25 hover:shadow-neural-glow/40 transition-shadow"
              >
                Voir mes projets
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl glass border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Me contacter
              </motion.button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/Yansoki', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/rayan-ghomsi', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:rayan.ghomsi@2026.ucac-icam.com', label: 'Email' },
              { icon: Phone, href: 'tel:+237698340774', label: 'Téléphone' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-neural-glow transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-sm">Explorer</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <section className="relative z-20 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '92%', label: 'Précision modèles' },
              { value: '87%', label: 'F1-Score Churn' },
              { value: '1Go+', label: 'Données/jour traitées' },
              { value: '30%', label: 'Réduction rebut' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl glass text-center group hover:bg-white/5 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative z-20 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Explorez mon <span className="gradient-text">univers</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Projets Big Data & ML',
                description: 'Data Lake, pipelines ETL, modèles prédictifs et jumeaux numériques',
                href: '/projects',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                title: 'Compétences',
                description: 'PySpark, Airflow, TensorFlow, et bien plus en 3D',
                href: '/skills',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Expériences',
                description: 'ICAM Nantes, UCAC-ICAM et projets de recherche',
                href: '/experience',
                gradient: 'from-orange-500 to-red-500',
              },
            ].map((card, index) => (
              <Link key={card.title} href={card.href}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl glass group cursor-pointer h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <div className="w-6 h-6 bg-white/20 rounded-lg" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-neural-glow transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{card.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
