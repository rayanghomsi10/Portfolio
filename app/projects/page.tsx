'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { projects, categories } from '@/lib/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="gradient-text">Projets</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explorez mes projets en Machine Learning, Deep Learning et Data Science. 
            Chaque projet inclut des démos interactives et des métriques détaillées.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl glass bg-white/5 border border-white/10 focus:border-neural-glow/50 focus:outline-none transition-colors text-white placeholder-gray-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 mr-2" />
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-white/10 border border-white/20'
                    : 'glass hover:bg-white/5'
                }`}
                style={{
                  color: selectedCategory === category.id ? category.color : undefined,
                  borderColor: selectedCategory === category.id ? `${category.color}50` : undefined,
                }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-400">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl glass"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text">{projects.length}</div>
              <div className="text-sm text-gray-400">Projets</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">
                {new Set(projects.flatMap(p => p.technologies)).size}
              </div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">
                {Math.round(projects.reduce((acc, p) => acc + (p.metrics[0]?.value || 0), 0) / projects.length)}%
              </div>
              <div className="text-sm text-gray-400">Précision moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-gray-400">Open Source</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
