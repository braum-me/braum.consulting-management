'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * Deterministische LCG-RNG. Vorteile gegenüber Math.random():
 * - Particle-Verteilung bleibt über Reloads stabil (UX-Konsistenz)
 * - Pure-Function, kein react-hooks/purity-Konflikt im Render-Pfad
 */
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return ((s >>> 0) % 1_000_000) / 1_000_000
  }
}

function Particles({ count = 480 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const rand = seededRandom(42)

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (rand() - 0.5) * 12
      pos[i * 3 + 1] = (rand() - 0.5) * 7
      pos[i * 3 + 2] = (rand() - 0.5) * 5

      const isAccent = rand() > 0.78
      col[i * 3]     = isAccent ? 0.78 : 0.95
      col[i * 3 + 1] = isAccent ? 0.38 : 0.94
      col[i * 3 + 2] = isAccent ? 0.16 : 0.92
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.015
    mesh.current.rotation.x = state.clock.elapsedTime * 0.005
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

export default function HeroParticles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
