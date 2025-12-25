'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Html, Stars, Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

interface Skill {
  id: string
  name: string
  level: number // 1-10
  category: string
  color: string
  description: string
  isFeatured?: boolean // Compétence phare
}

const skills: Skill[] = [
  // Core - Python au centre
  { id: 'python', name: 'Python', level: 10, category: 'core', color: '#3776ab', description: 'Pandas, NumPy, Jupyter', isFeatured: true },
  
  // Big Data - Compétences phares
  { id: 'pyspark', name: 'PySpark', level: 9, category: 'bigdata', color: '#e25a1c', description: 'Traitement distribué', isFeatured: true },
  { id: 'airflow', name: 'Airflow', level: 9, category: 'bigdata', color: '#017cee', description: 'Orchestration ETL', isFeatured: true },
  { id: 'nifi', name: 'Apache NiFi', level: 9, category: 'bigdata', color: '#728e9b', description: 'Ingestion données', isFeatured: true },
  { id: 'hadoop', name: 'Hadoop', level: 8, category: 'bigdata', color: '#66ccff', description: 'HDFS, Stockage distribué' },
  { id: 'hive', name: 'Hive', level: 8, category: 'bigdata', color: '#fdee21', description: 'Data Warehouse' },
  
  // ML/DL
  { id: 'sklearn', name: 'Scikit-learn', level: 9, category: 'ml', color: '#f89939', description: 'ML classique', isFeatured: true },
  { id: 'tensorflow', name: 'TensorFlow', level: 8, category: 'ml', color: '#ff6f00', description: 'Deep Learning' },
  { id: 'keras', name: 'Keras', level: 8, category: 'ml', color: '#d00000', description: 'Neural Networks' },
  { id: 'pytorch', name: 'PyTorch', level: 7, category: 'ml', color: '#ee4c2c', description: 'Research & DL' },
  { id: 'xgboost', name: 'XGBoost', level: 9, category: 'ml', color: '#1e88e5', description: 'Gradient Boosting', isFeatured: true },
  
  // Data
  { id: 'sql', name: 'SQL', level: 9, category: 'data', color: '#00758f', description: 'PostgreSQL, MySQL', isFeatured: true },
  { id: 'mongodb', name: 'MongoDB', level: 7, category: 'data', color: '#47a248', description: 'NoSQL' },
  
  // Visualization
  { id: 'powerbi', name: 'Power BI', level: 8, category: 'viz', color: '#f2c811', description: 'Dashboards' },
  { id: 'plotly', name: 'Plotly', level: 8, category: 'viz', color: '#3f4f75', description: 'Charts interactifs' },
  { id: 'superset', name: 'Superset', level: 7, category: 'viz', color: '#20a7c9', description: 'BI Open Source' },
]

const categoryOrbits: Record<string, { radius: number; speed: number; tilt: number; label: string }> = {
  core: { radius: 0, speed: 0, tilt: 0, label: 'Core' },
  bigdata: { radius: 4.5, speed: 0.25, tilt: 0.1, label: 'Big Data' },
  ml: { radius: 7, speed: 0.18, tilt: 0.15, label: 'ML / Deep Learning' },
  data: { radius: 5.5, speed: 0.22, tilt: -0.12, label: 'Databases' },
  viz: { radius: 8.5, speed: 0.12, tilt: 0.2, label: 'Visualisation' },
}

function Planet({ skill, index, onSelect, isSelected }: { 
  skill: Skill
  index: number
  onSelect: (skill: Skill | null) => void
  isSelected: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const orbit = categoryOrbits[skill.category]
  const angle = (index * 137.5 * Math.PI) / 180
  
  // Taille basée sur le niveau + bonus pour les compétences phares
  const baseSize = 0.25 + (skill.level / 10) * 0.35
  const size = skill.isFeatured ? baseSize * 1.2 : baseSize

  useFrame((state) => {
    if (groupRef.current && orbit.radius > 0) {
      const time = state.clock.elapsedTime * orbit.speed
      const x = Math.cos(angle + time) * orbit.radius
      const z = Math.sin(angle + time) * orbit.radius
      const y = Math.sin(angle + time) * orbit.radius * orbit.tilt
      
      groupRef.current.position.set(x, y, z)
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group 
      ref={groupRef}
      position={orbit.radius === 0 ? [0, 0, 0] : undefined}
    >
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Planète principale */}
        <mesh
          ref={meshRef}
          onClick={() => onSelect(isSelected ? null : skill)}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'default'}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={isSelected ? 1 : skill.isFeatured ? 0.5 : 0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Glow effect */}
        <mesh scale={isSelected ? 2.2 : skill.isFeatured ? 1.8 : 1.5}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={isSelected ? 0.4 : skill.isFeatured ? 0.25 : 0.12}
          />
        </mesh>

        {/* Anneau pour compétences phares */}
        {skill.isFeatured && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 1.6, 32]} />
            <meshBasicMaterial 
              color={skill.color} 
              transparent 
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Label permanent avec le nom */}
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <Html
            center
            distanceFactor={12}
            style={{
              transition: 'all 0.2s',
              opacity: 1,
              transform: `translateY(${-size * 60 - 20}px)`,
            }}
          >
            <div className="flex flex-col items-center pointer-events-none">
              {/* Étoile pour compétences phares */}
              {skill.isFeatured && (
                <span className="text-yellow-400 text-xs mb-0.5">⭐</span>
              )}
              {/* Nom de la compétence */}
              <div 
                className="px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap"
                style={{ 
                  backgroundColor: `${skill.color}40`,
                  color: '#ffffff',
                  textShadow: '0 0 10px rgba(0,0,0,0.8)',
                  border: `1px solid ${skill.color}60`,
                }}
              >
                {skill.name}
              </div>
            </div>
          </Html>
        </Billboard>

        {/* Info détaillée au clic */}
        {isSelected && (
          <Html center distanceFactor={10} style={{ transform: 'translateY(60px)' }}>
            <div 
              className="px-4 py-3 rounded-xl text-white text-center whitespace-nowrap neural-glow"
              style={{ 
                backgroundColor: 'rgba(10,10,26,0.95)',
                border: `2px solid ${skill.color}`,
                minWidth: '150px',
              }}
            >
              <div className="font-bold text-sm" style={{ color: skill.color }}>
                {skill.name}
              </div>
              <div className="text-xs text-gray-300 mt-1">{skill.description}</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-xs text-gray-400">Niveau:</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-3 rounded-sm"
                      style={{
                        backgroundColor: i < skill.level ? skill.color : 'rgba(255,255,255,0.2)',
                      }}
                    />
                  ))}
                </div>
              </div>
              {skill.isFeatured && (
                <div className="mt-2 text-xs text-yellow-400 flex items-center justify-center gap-1">
                  ⭐ Compétence phare
                </div>
              )}
            </div>
          </Html>
        )}
      </Float>
    </group>
  )
}

function OrbitRing({ radius, tilt, label }: { radius: number; tilt: number; label: string }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * tilt,
        Math.sin(angle) * radius
      ))
    }
    return pts
  }, [radius, tilt])

  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </line>
      
      {/* Label de l'orbite */}
      <Html
        position={[radius + 0.5, 0, 0]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-[10px] text-gray-500 whitespace-nowrap opacity-50">
          {label}
        </div>
      </Html>
    </group>
  )
}

function CentralSun() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <group>
      {/* Soleil central - Python */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#3776ab"
          emissive="#3776ab"
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Glow du soleil */}
      <mesh scale={1.5}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial
          color="#3776ab"
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Label Python */}
      <Html center distanceFactor={10} style={{ transform: 'translateY(-80px)' }}>
        <div className="flex flex-col items-center">
          <span className="text-yellow-400 text-sm">⭐</span>
          <div 
            className="px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap"
            style={{ 
              backgroundColor: 'rgba(55, 118, 171, 0.5)',
              color: '#ffffff',
              border: '2px solid #3776ab',
              textShadow: '0 0 10px rgba(0,0,0,0.8)',
            }}
          >
            Python
          </div>
          <div className="text-[10px] text-gray-400 mt-1">Core Language</div>
        </div>
      </Html>
    </group>
  )
}

function Scene({ onSelectSkill, selectedSkill }: {
  onSelectSkill: (skill: Skill | null) => void
  selectedSkill: Skill | null
}) {
  // Filtrer Python car il est au centre
  const orbitingSkills = skills.filter(s => s.category !== 'core')

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#3776ab" distance={20} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
      
      <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Orbit rings avec labels */}
      {Object.entries(categoryOrbits)
        .filter(([key]) => key !== 'core')
        .map(([key, orbit]) => (
          <OrbitRing key={key} radius={orbit.radius} tilt={orbit.tilt} label={orbit.label} />
        ))
      }
      
      {/* Soleil central - Python */}
      <CentralSun />
      
      {/* Planètes */}
      {orbitingSkills.map((skill, index) => (
        <Planet
          key={skill.id}
          skill={skill}
          index={index}
          onSelect={onSelectSkill}
          isSelected={selectedSkill?.id === skill.id}
        />
      ))}
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minDistance={6}
        maxDistance={25}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  )
}

export default function SkillGalaxy({ onSelectSkill, selectedSkill }: {
  onSelectSkill: (skill: Skill | null) => void
  selectedSkill: Skill | null
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 6, 14], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene onSelectSkill={onSelectSkill} selectedSkill={selectedSkill} />
      </Canvas>
    </div>
  )
}

export type { Skill }
