import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function SignCard({ position, rotation, size, color, emissive, speed, wireframe }) {
  const ref = useRef(null)

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * speed
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 1.4) * 0.12
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <RoundedBox args={size} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissive ? 0.5 : 0}
          metalness={0.25}
          roughness={0.5}
          wireframe={wireframe}
        />
      </RoundedBox>
    </group>
  )
}

function SceneRig() {
  const parallax = useRef(null)

  useFrame((state) => {
    if (!parallax.current) return
    const { pointer } = state
    parallax.current.rotation.x = THREE.MathUtils.lerp(
      parallax.current.rotation.x,
      pointer.y * 0.18,
      0.04,
    )
    parallax.current.rotation.y = THREE.MathUtils.lerp(
      parallax.current.rotation.y,
      pointer.x * 0.25,
      0.04,
    )
  })

  return (
    <group ref={parallax}>
      <SignCard
        position={[0, 0, 0]}
        rotation={[0.1, -0.3, 0.05]}
        size={[2.6, 1.7, 0.12]}
        color="#3b1b5c"
        speed={0.12}
      />
      <SignCard
        position={[1.7, 0.6, 0.9]}
        rotation={[-0.15, 0.4, -0.08]}
        size={[1.1, 1.1, 0.08]}
        color="#c9a227"
        emissive="#c9a227"
        speed={0.22}
      />
      <SignCard
        position={[-1.6, -0.5, 0.7]}
        rotation={[0.2, 0.5, 0.1]}
        size={[2.7, 1.75, 0.13]}
        color="#c9a227"
        speed={0.16}
        wireframe
      />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={1.2} color="#55298c" />
      <pointLight position={[4, 3, 5]} intensity={2} color="#c9a227" decay={0} />
      <pointLight position={[-5, -2, -3]} intensity={1.1} color="#55298c" decay={0} />
      <directionalLight position={[0, 5, 5]} intensity={0.4} color="#ffffff" />
      <SceneRig />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.5} luminanceThreshold={0.35} luminanceSmoothing={0.25} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
