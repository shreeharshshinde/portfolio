import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function BlackHoleGLB() {
    const { scene } = useGLTF('/assets/black_hole.glb');
    const ref = useRef<THREE.Group>(null);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.1; // Slow rotation
        }
    });

    return (
        <group ref={ref} dispose={null}>
            <primitive object={scene} scale={0.01} />
        </group>
    );
}

useGLTF.preload('/assets/black_hole.glb');
