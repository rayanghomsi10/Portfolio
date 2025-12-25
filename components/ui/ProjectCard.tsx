'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '@/lib/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative overflow-hidden rounded-2xl glass h-full">
          {/* Gradient Border Effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${project.color}20, transparent)`,
            }}
          />
          
          {/* Image Placeholder */}
          <div 
            className="h-48 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-20 h-20 rounded-2xl opacity-50"
                style={{ backgroundColor: project.color }}
              />
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${project.color}30`,
                  color: project.color,
                }}
              >
                {project.category.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-neural-glow transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Metrics Preview */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              {project.metrics.slice(0, 2).map((metric) => (
                <div key={metric.name} className="text-center">
                  <div 
                    className="text-lg font-bold"
                    style={{ color: project.color }}
                  >
                    {metric.value}{metric.unit}
                  </div>
                  <div className="text-xs text-gray-500">{metric.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hover Actions */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <div className="p-2 rounded-lg glass">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
