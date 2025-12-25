'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Code2, Database, Brain, BarChart3 } from 'lucide-react'
import type { Skill } from '@/components/3d/SkillGalaxy'

const SkillGalaxy = dynamic(() => import('@/components/3d/SkillGalaxy'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-neural-glow border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

const skillCategories = [
  { id: 'bigdata', name: 'Big Data', icon: Database, color: '#e25a1c' },
  { id: 'ml', name: 'Machine Learning', icon: Brain, color: '#ff6f00' },
  { id: 'data', name: 'Bases de données', icon: Database, color: '#00758f' },
  { id: 'viz', name: 'Visualisation', icon: BarChart3, color: '#f2c811' },
  { id: 'dev', name: 'Développement', icon: Code2, color: '#3776ab' },
]

const skillsList = [
  // Big Data
  { name: 'PySpark', level: 90, category: 'bigdata' },
  { name: 'Apache Airflow', level: 90, category: 'bigdata' },
  { name: 'Apache NiFi', level: 90, category: 'bigdata' },
  { name: 'Hadoop/HDFS', level: 80, category: 'bigdata' },
  { name: 'Hive', level: 80, category: 'bigdata' },
  { name: 'Superset', level: 75, category: 'bigdata' },
  
  // ML/DL
  { name: 'Scikit-learn', level: 90, category: 'ml' },
  { name: 'TensorFlow', level: 80, category: 'ml' },
  { name: 'Keras', level: 80, category: 'ml' },
  { name: 'PyTorch', level: 75, category: 'ml' },
  { name: 'XGBoost', level: 85, category: 'ml' },
  { name: 'Random Forest', level: 90, category: 'ml' },
  
  // Data & Analysis
  { name: 'Python (Pandas, NumPy)', level: 95, category: 'data' },
  { name: 'SQL (PostgreSQL, MySQL)', level: 90, category: 'data' },
  { name: 'MongoDB', level: 70, category: 'data' },
  { name: 'Excel', level: 85, category: 'data' },
  
  // Visualization
  { name: 'Power BI', level: 85, category: 'viz' },
  { name: 'Tableau', level: 75, category: 'viz' },
  { name: 'Plotly', level: 80, category: 'viz' },
  
  // Dev
  { name: 'Django', level: 75, category: 'dev' },
  { name: 'Laravel', level: 70, category: 'dev' },
  { name: 'HTML/CSS/JavaScript', level: 75, category: 'dev' },
  { name: 'Tailwind CSS', level: 70, category: 'dev' },
]

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredSkills = activeCategory 
    ? skillsList.filter(s => s.category === activeCategory)
    : skillsList

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ma <span className="gradient-text">Galaxie</span> de Compétences
          </h1>
          <p className="text-gray-400">
            Explorez mes compétences en 3D. Chaque planète représente une technologie, 
            sa taille indique mon niveau de maîtrise. Cliquez pour en savoir plus.
          </p>
        </motion.div>
      </div>

      {/* 3D Galaxy */}
      <div className="h-[550px] md:h-[700px] relative">
        <Suspense fallback={null}>
          <SkillGalaxy 
            onSelectSkill={setSelectedSkill} 
            selectedSkill={selectedSkill}
          />
        </Suspense>
        
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 left-4 px-4 py-3 rounded-lg glass text-sm"
        >
          <div className="text-xs text-gray-400 mb-2">Légende :</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-gray-300">Compétence phare</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neural-glow/50 ring-2 ring-neural-glow/30" />
            <span className="text-gray-300">Avec anneau = Expert</span>
          </div>
        </motion.div>

        {/* Instructions overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg glass text-sm text-gray-400"
        >
          🖱️ Cliquez et glissez pour explorer • Cliquez sur une planète pour les détails
        </motion.div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center mb-8"
          >
            Domaines d&apos;expertise
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {skillCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                className={`p-4 rounded-xl glass text-center group cursor-pointer transition-all ${
                  activeCategory === category.id ? 'ring-2 ring-neural-glow' : ''
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <category.icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <div className="text-sm font-medium">{category.name}</div>
              </motion.button>
            ))}
          </div>

          {/* Skills List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl glass"
          >
            <h3 className="text-xl font-semibold mb-6">
              {activeCategory 
                ? `Compétences ${skillCategories.find(c => c.id === activeCategory)?.name}`
                : 'Toutes les compétences'
              }
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.03 }}
                      className="h-full rounded-full bg-gradient-to-r from-neural-glow to-neural-pulse"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl glass"
          >
            <h3 className="text-xl font-semibold mb-6">Certifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Introduction to Data Science', issuer: 'Cisco', year: '2024' },
                { name: 'Data Science Orientation', issuer: 'Coursera', year: '2024' },
                { name: 'Data Engineering Essentials', issuer: 'Coursera', year: '2024' },
                { name: 'Développement Web', issuer: 'Udemy', year: '2023' },
              ].map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="font-medium mb-1 text-sm">{cert.name}</div>
                  <div className="text-xs text-gray-400">{cert.issuer}</div>
                  <div className="text-xs text-neural-glow mt-2">{cert.year}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl glass"
          >
            <h3 className="text-xl font-semibold mb-6">Atouts</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Pensée Analytique', icon: '🧠' },
                { name: 'Résolution de Problèmes', icon: '🔧' },
                { name: 'Esprit d\'Équipe', icon: '🤝' },
                { name: 'Apprentissage Continu', icon: '📚' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 text-center"
                >
                  <div className="text-2xl mb-2">{skill.icon}</div>
                  <div className="text-sm">{skill.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl glass"
          >
            <h3 className="text-xl font-semibold mb-6">Langues</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex justify-between mb-2">
                  <span>Français</span>
                  <span className="text-neural-glow">Natif</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-neural-glow to-neural-pulse" />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex justify-between mb-2">
                  <span>Anglais</span>
                  <span className="text-gray-400">TOEIC - B1</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-neural-glow to-neural-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
