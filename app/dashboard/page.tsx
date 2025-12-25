'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  GitBranch,
  Star,
  Activity,
  TrendingUp,
  Database,
  Cpu
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'

// Mock data generators
const generateVisitorData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i],
    visitors: Math.floor(30 + Math.random() * 70),
    pageViews: Math.floor(60 + Math.random() * 140),
  }))
}

const techDistribution = [
  { name: 'Python', value: 45, color: '#3776ab' },
  { name: 'PySpark', value: 20, color: '#e25a1c' },
  { name: 'SQL', value: 15, color: '#00758f' },
  { name: 'JavaScript', value: 10, color: '#f7df1e' },
  { name: 'Other', value: 10, color: '#6b7280' },
]

const skillsRadar = [
  { skill: 'Big Data', level: 90 },
  { skill: 'ML/DL', level: 85 },
  { skill: 'ETL', level: 92 },
  { skill: 'Python', level: 95 },
  { skill: 'SQL', level: 88 },
  { skill: 'Viz', level: 80 },
]

const recentProjects = [
  { name: 'Churn Prediction', tech: 'PySpark, Airflow', status: 'Terminé', metric: 'F1: 87%' },
  { name: 'Digital Twin', tech: 'Python, XGBoost', status: 'Terminé', metric: 'Acc: 92%' },
  { name: 'ETL Pipeline', tech: 'NiFi, HDFS', status: 'Terminé', metric: '1Go/jour' },
  { name: 'IoT Dashboard', tech: 'Superset, PostgreSQL', status: 'Terminé', metric: '20+ capteurs' },
]

function StatCard({ icon: Icon, label, value, change, color }: {
  icon: typeof Users
  label: string
  value: string | number
  change?: string
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl glass"
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        {change && (
          <span className={`text-sm flex items-center gap-1 ${
            change.startsWith('+') ? 'text-green-400' : 'text-red-400'
          }`}>
            <TrendingUp className="w-3 h-3" />
            {change}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const [visitorData] = useState(generateVisitorData())
  const [liveVisitors, setLiveVisitors] = useState(5)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Dashboard</span> Analytics
          </h1>
          <p className="text-gray-400">
            Statistiques du portfolio et métriques des projets
          </p>
        </motion.div>

        {/* Live indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-400">
            <span className="text-green-400 font-medium">{liveVisitors}</span> visiteurs en ligne
          </span>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Database}
            label="Données traitées"
            value="1+ Go/jour"
            color="#00d4ff"
          />
          <StatCard
            icon={Cpu}
            label="Précision max"
            value="92%"
            change="+5%"
            color="#8b5cf6"
          />
          <StatCard
            icon={Activity}
            label="F1-Score Churn"
            value="87%"
            color="#22c55e"
          />
          <StatCard
            icon={GitBranch}
            label="Projets réalisés"
            value="6+"
            change="+2"
            color="#f59e0b"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Visitors Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl glass"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-neural-glow" />
              Visiteurs cette semaine
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10,10,26,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#00d4ff"
                    fill="#00d4ff"
                    fillOpacity={0.2}
                    name="Visiteurs"
                  />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                    name="Pages vues"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skills Radar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl glass"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-neural-glow" />
              Profil de compétences
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsRadar}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <Radar
                    name="Niveau"
                    dataKey="level"
                    stroke="#00d4ff"
                    fill="#00d4ff"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10,10,26,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tech Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl glass"
          >
            <h3 className="text-lg font-semibold mb-4">Langages utilisés</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={techDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {techDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10,10,26,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {techDistribution.map((tech) => (
                <div key={tech.name} className="flex items-center gap-2 text-sm">
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className="text-gray-400">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl glass lg:col-span-2"
          >
            <h3 className="text-lg font-semibold mb-4">Projets récents</h3>
            <div className="space-y-3">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neural-glow/20 flex items-center justify-center">
                      <Database className="w-5 h-5 text-neural-glow" />
                    </div>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-gray-500">{project.tech}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400">{project.status}</div>
                    <div className="text-xs text-gray-400">{project.metric}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Project Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 rounded-2xl glass"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-neural-glow" />
            Métriques des projets
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Churn - F1 Score', value: 87, color: '#00d4ff' },
              { label: 'Digital Twin - Précision', value: 92, color: '#8b5cf6' },
              { label: 'Détection risque', value: 85, color: '#22c55e' },
              { label: 'Réduction rebut', value: 30, color: '#f59e0b' },
            ].map((metric) => (
              <div key={metric.label} className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </span>
                  <span className="text-gray-500 mb-1">%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: metric.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
