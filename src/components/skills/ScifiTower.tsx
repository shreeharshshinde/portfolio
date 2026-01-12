import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function DeepSpace9() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/assets/deep_space_9.glb');
  const scene = gltf.scene;

  useEffect(() => {
    try {
      scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          // Premium Sci-Fi Material
          child.material = new THREE.MeshStandardMaterial({
            color: '#0f172a', // Darker Slate/Black
            metalness: 0.9,
            roughness: 0.2,
            envMapIntensity: 1.5,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      })
      setModelLoaded(true);
    } catch (err) {
      console.error('Error processing 3D model:', err);
      setError(true);
    }
  }, [scene])

  // Rotate continuously
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5 // speed multiplier
    }
  })

  // If there's an error loading the model, return null to prevent rendering issues
  if (error) {
    console.error('Failed to load 3D model, skipping rendering');
    return null;
  }

  // If the model isn't loaded yet, return null
  if (!modelLoaded) {
    return null;
  }

  return (
    <group
      ref={groupRef}
      position={[0, 4, 0]}
      scale={[0.07, 0.07, 0.07]}
    >
      <primitive object={scene} />
    </group>
  )
}
