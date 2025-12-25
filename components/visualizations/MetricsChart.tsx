'use client'

import { motion } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts'

interface Metric {
  name: string
  value: number
  unit: string
}

interface MetricsChartProps {
  metrics: Metric[]
  color: string
  type?: 'bar' | 'radar' | 'line'
}

export default function MetricsChart({ metrics, color, type = 'bar' }: MetricsChartProps) {
  const data = metrics.map(m => ({
    name: m.name,
    value: m.unit === '%' ? m.value : m.value * 100,
    fullMark: 100,
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const metric = metrics.find(m => m.name === label)
      return (
        <div className="glass p-3 rounded-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-lg font-bold" style={{ color }}>
            {metric?.value}{metric?.unit}
          </p>
        </div>
      )
    }
    return null
  }

  if (type === 'radar') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis 
              dataKey="name" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#6b7280', fontSize: 10 }}
            />
            <Radar
              name="Performance"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.3}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    )
  }

  if (type === 'line') {
    // Generate fake time series data
    const timeData = Array.from({ length: 10 }, (_, i) => ({
      epoch: i + 1,
      train: 60 + Math.random() * 30 + i * 2,
      val: 55 + Math.random() * 25 + i * 2,
    }))

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="epoch" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              label={{ value: 'Epoch', position: 'bottom', fill: '#6b7280' }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              domain={[50, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10,10,26,0.9)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="train" 
              stroke={color} 
              fill={color}
              fillOpacity={0.2}
              name="Training"
            />
            <Area 
              type="monotone" 
              dataKey="val" 
              stroke="#8b5cf6" 
              fill="#8b5cf6"
              fillOpacity={0.2}
              name="Validation"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            fill={color}
            radius={[0, 4, 4, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
