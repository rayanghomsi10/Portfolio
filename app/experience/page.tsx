'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap, MapPin, Calendar, TrendingUp, ArrowRight, Award } from 'lucide-react'
import { experiences, certifications } from '@/lib/data/experience'

function MetricCard({ metric }: { metric: { label: string; before?: number; after: number; unit: string } }) {
  return (
    <div className="p-3 rounded-lg bg-white/5">
      <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
      <div className="flex items-center gap-2">
        {metric.before !== undefined && (
          <>
            <span className="text-red-400">{metric.before}{metric.unit}</span>
            <ArrowRight className="w-3 h-3 text-gray-500" />
          </>
        )}
        <span className="text-green-400 font-bold">{metric.after}{metric.unit}</span>
      </div>
    </div>
  )
}

function ExperienceCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0])

  const isWork = experience.type === 'work'
  const Icon = isWork ? Briefcase : GraduationCap

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neural-glow z-10 hidden md:block" />
      
      {/* Card */}
      <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 rounded-2xl glass group"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isWork ? 'bg-neural-glow/20' : 'bg-neural-pulse/20'
              }`}
            >
              <Icon className={`w-6 h-6 ${isWork ? 'text-neural-glow' : 'text-neural-pulse'}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold group-hover:text-neural-glow transition-colors">
                {experience.title}
              </h3>
              <div className="text-gray-400">{experience.company}</div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {experience.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {experience.period}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-4">{experience.description}</p>

          {/* Achievements */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Réalisations clés</h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 text-sm text-gray-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-neural-glow mt-2 flex-shrink-0" />
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          {experience.metrics && experience.metrics.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Impact mesurable
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {experience.metrics.map((metric, i) => (
                  <MetricCard key={i} metric={metric} />
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div className="min-h-screen pt-24 pb-16 px-4" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mon <span className="gradient-text">Parcours</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            De la formation académique aux projets d&apos;entreprise, découvrez mon évolution 
            dans le domaine de la Data Science et du Big Data.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neural-glow via-neural-pulse to-transparent hidden md:block" />
          
          {/* Progress indicator */}
          <motion.div
            className="absolute left-1/2 top-0 w-px bg-neural-glow hidden md:block"
            style={{ 
              height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
              boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
            }}
          />

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl glass"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-neural-glow" />
            Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-medium mb-1">{cert.name}</div>
                <div className="text-sm text-gray-400">{cert.issuer}</div>
                <div className="text-xs text-neural-glow mt-2">{cert.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-8 rounded-2xl glass"
        >
          <h2 className="text-2xl font-bold text-center mb-8">En résumé</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text">4+</div>
              <div className="text-sm text-gray-400">Années de formation</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">4</div>
              <div className="text-sm text-gray-400">Expériences pro</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">4</div>
              <div className="text-sm text-gray-400">Certifications</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">92%</div>
              <div className="text-sm text-gray-400">Précision max atteinte</div>
            </div>
          </div>
        </motion.div>

        {/* Reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 rounded-2xl glass"
        >
          <h2 className="text-xl font-bold mb-4">Référence</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-neural-glow/20 flex items-center justify-center">
              <span className="text-xl">👨‍🏫</span>
            </div>
            <div>
              <div className="font-medium">Jérôme Rocheteau</div>
              <div className="text-sm text-gray-400">Enseignant Chercheur, ICAM Nantes</div>
              <a 
                href="mailto:jerome.rocheteau@icam.fr" 
                className="text-sm text-neural-glow hover:underline"
              >
                jerome.rocheteau@icam.fr
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
