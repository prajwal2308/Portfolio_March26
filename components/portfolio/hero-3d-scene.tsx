"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Box, Icosahedron } from "@react-three/drei"
import { useRef, useMemo, Suspense } from "react"
import * as THREE from "three"

function Particles({ count = 400 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      s[i] = Math.random() * 2 + 0.5
    }
    return [pos, s]
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4dd9d9"
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <Sphere args={[1.2, 64, 64]} position={[2.5, 0.5, -2]}>
          <MeshDistortMaterial
            color="#1a3a3a"
            emissive="#4dd9d9"
            emissiveIntensity={0.15}
            roughness={0.3}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={0.6}>
        <Torus args={[0.8, 0.05, 16, 100]} position={[-3, 1, -3]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial color="#4dd9d9" emissive="#4dd9d9" emissiveIntensity={0.5} wireframe />
        </Torus>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <Icosahedron args={[0.4]} position={[-2, -1.5, -1]}>
          <MeshWobbleMaterial
            color="#1a4040"
            emissive="#4dd9d9"
            emissiveIntensity={0.3}
            wireframe
            factor={0.5}
            speed={1}
          />
        </Icosahedron>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={0.5}>
        <Box args={[0.5, 0.5, 0.5]} position={[3.5, -1, -2]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial
            color="#0d2626"
            emissive="#4dd9d9"
            emissiveIntensity={0.2}
            wireframe
          />
        </Box>
      </Float>

      {[
        [-4, 2, -4],
        [4, -2, -3],
        [1, 2.5, -5],
        [-1, -2, -4],
        [3, 2, -6],
      ].map((pos, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.5} floatIntensity={1.2}>
          <Sphere args={[0.08 + i * 0.03]} position={pos as [number, number, number]}>
            <meshStandardMaterial
              color="#4dd9d9"
              emissive="#4dd9d9"
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}

      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
        <Torus args={[2, 0.01, 8, 100]} position={[0, 0, -4]} rotation={[Math.PI / 3, 0.2, 0]}>
          <meshStandardMaterial color="#4dd9d9" emissive="#4dd9d9" emissiveIntensity={0.4} transparent opacity={0.3} />
        </Torus>
      </Float>

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
        <Torus args={[3, 0.008, 8, 150]} position={[0, 0, -6]} rotation={[Math.PI / 5, -0.3, 0.1]}>
          <meshStandardMaterial color="#4dd9d9" emissive="#4dd9d9" emissiveIntensity={0.3} transparent opacity={0.2} />
        </Torus>
      </Float>
    </group>
  )
}

function MouseLight() {
  const light = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (!light.current) return
    light.current.position.x = state.pointer.x * 5
    light.current.position.y = state.pointer.y * 5
  })

  return <pointLight ref={light} intensity={2} color="#4dd9d9" distance={15} />
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#0a0f1a", 5, 20]} />
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 5, 5]} intensity={0.3} color="#4dd9d9" />
          <MouseLight />
          <Particles count={400} />
          <FloatingGeometry />
        </Suspense>
      </Canvas>
    </div>
  )
}
