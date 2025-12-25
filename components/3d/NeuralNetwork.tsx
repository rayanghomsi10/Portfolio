'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

interface NodeData {
  id: string
  label: string
  category: string
  position: [number, number, number]
  color: string
  link?: string
}

const skills: NodeData[] = [
  { id: 'python', label: 'Python', category: 'language', position: [0, 0, 0], color: '#3776ab', link: '/skills' },
  { id: 'pyspark', label: 'PySpark', category: 'bigdata', position: [3, 1, 2], color: '#e25a1c', link: '/projects' },
  { id: 'tensorflow', label: 'TensorFlow', category: 'ml', position: [-3, 2, 1], color: '#ff6f00', link: '/projects' },
  { id: 'airflow', label: 'Airflow', category: 'bigdata', position: [2, -2, 3], color: '#00d4ff', link: '/projects' },
  { id: 'nifi', label: 'Apache NiFi', category: 'bigdata', position: [-2, -1, -2], color: '#728e9b', link: '/projects' },
  { id: 'sql', label: 'SQL', category: 'data', position: [4, 0, -1], color: '#00758f', link: '/skills' },
  { id: 'hadoop', label: 'Hadoop', category: 'bigdata', position: [-4, 1, -2], color: '#66ccff', link: '/skills' },
  { id: 'pytorch', label: 'PyTorch', category: 'ml', position: [1, 3, -3], color: '#ee4c2c', link: '/skills' },
  { id: 'powerbi', label: 'Power BI', category: 'viz', position: [-1, -3, 2], color: '#f2c811', link: '/skills' },
  { id: 'sklearn', label: 'Scikit-learn', category: 'ml', position: [3, -2, -2], color: '#f89939', link: '/skills' },
]

function NeuralNode({ node, onHover, isHovered }: { 
  node: NodeData
  onHover: (id: string | null) => void
  isHovered: boolean 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const router = useRouter()
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const scale = isHovered ? 1.3 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
      
      if (isHovered) {
        meshRef.current.rotation.y += 0.02
      }
    }
  })

  const handleClick = () => {
    setClicked(true)
    if (node.link) {
      setTimeout(() => router.push(node.link!), 300)
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={node.position}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => onHover(node.id)}
          onPointerLeave={() => onHover(null)}
          onClick={handleClick}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isHovered ? 0.8 : 0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Glow effect */}
        <mesh scale={isHovered ? 1.8 : 1.4}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={isHovered ? 0.3 : 0.1}
          />
        </mesh>

        {/* Label */}
        {isHovered && (
          <Html center distanceFactor={10}>
            <div className="px-3 py-1.5 rounded-lg glass text-white text-sm font-medium whitespace-nowrap neural-glow">
              {node.label}
            </div>
          </Html>
        )}
      </group>
    </Float>
  )
}

function Connections({ nodes, hoveredId }: { nodes: NodeData[], hoveredId: string | null }) {
  const linesRef = useRef<THREE.Group>(null)

  const connections = useMemo(() => {
    const conns: { start: THREE.Vector3, end: THREE.Vector3, color: string }[] = []
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = new THREE.Vector3(...nodes[i].position)
          .distanceTo(new THREE.Vector3(...nodes[j].position))
        
        if (dist < 6) {
          conns.push({
            start: new THREE.Vector3(...nodes[i].position),
            end: new THREE.Vector3(...nodes[j].position),
            color: hoveredId === nodes[i].id || hoveredId === nodes[j].id 
              ? '#00d4ff' 
              : '#ffffff'
          })
        }
      }
    }
    return conns
  }, [nodes, hoveredId])

  return (
    <group ref={linesRef}>
      {connections.map((conn, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                conn.start.x, conn.start.y, conn.start.z,
                conn.end.x, conn.end.y, conn.end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={conn.color} 
            transparent 
            opacity={hoveredId ? 0.6 : 0.2} 
          />
        </line>
      ))}
    </group>
  )
}

function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      particlesRef.current.rotation.x += 0.0005
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      <DataParticles />
      <Connections nodes={skills} hoveredId={hoveredId} />
      
      {skills.map((node) => (
        <NeuralNode
          key={node.id}
          node={node}
          onHover={setHoveredId}
          isHovered={hoveredId === node.id}
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function NeuralNetwork() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
