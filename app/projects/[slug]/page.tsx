'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Code2, Cpu, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { projects } from '@/lib/data/projects'
import TextPredictor from '@/components/ml/TextPredictor'
import ImageClassifier from '@/components/ml/ImageClassifier'
import MetricsChart from '@/components/visualizations/MetricsChart'

export default function ProjectDetailPage() {
  const params = useParams()
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Projet non trouvé</h1>
          <Link href="/projects" className="text-neural-glow hover:underline">
            Retour aux projets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <span 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                style={{ 
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                }}
              >
                {project.category.toUpperCase()}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-gray-400 max-w-2xl">{project.longDescription}</p>
            </div>
            
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl glass hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-neural-glow to-neural-pulse text-white flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Démo live
                </a>
              )}
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-neural-glow" />
              <h2 className="text-xl font-semibold">Démo Interactive</h2>
            </div>
            
            {project.demoType === 'text' && <TextPredictor />}
            {project.demoType === 'image' && <ImageClassifier />}
            {project.demoType === 'chart' && (
              <div className="p-6 rounded-2xl glass">
                <h3 className="text-lg font-semibold mb-4">Visualisation des données</h3>
                <MetricsChart metrics={project.metrics} color={project.color} type="line" />
              </div>
            )}
            {project.demoType === 'none' && (
              <div className="p-6 rounded-2xl glass text-center">
                <p className="text-gray-400">Démo non disponible pour ce projet</p>
              </div>
            )}
          </motion.div>

          {/* Right Column - Metrics & Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Metrics */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-neural-glow" />
                <h2 className="text-xl font-semibold">Métriques de Performance</h2>
              </div>
              <div className="p-6 rounded-2xl glass">
                <MetricsChart metrics={project.metrics} color={project.color} type="radar" />
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                  {project.metrics.map((metric) => (
                    <div key={metric.name} className="text-center">
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: project.color }}
                      >
                        {metric.value}{metric.unit}
                      </div>
                      <div className="text-xs text-gray-400">{metric.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-neural-glow" />
                <h2 className="text-xl font-semibold">Fonctionnalités</h2>
              </div>
              <div className="p-6 rounded-2xl glass">
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Code Snippet Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-neural-glow" />
            <h2 className="text-xl font-semibold">Extrait de Code</h2>
          </div>
          <div className="p-6 rounded-2xl glass overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{`# Exemple de code pour ${project.title}
import torch
from transformers import AutoModelForSequenceClassification

class ${project.slug.replace(/-/g, '_').replace(/\b\w/g, l => l.toUpperCase())}:
    def __init__(self, model_path: str):
        self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)
    
    def predict(self, text: str) -> dict:
        """
        Effectue une prédiction sur le texte donné.
        
        Args:
            text: Le texte à analyser
            
        Returns:
            dict: Les probabilités pour chaque classe
        """
        inputs = self.tokenizer(text, return_tensors="pt").to(self.device)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            probs = torch.softmax(outputs.logits, dim=-1)
        
        return {
            "predictions": probs.cpu().numpy().tolist(),
            "confidence": float(probs.max())
        }`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
