import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating particle field for the project canvas background
const FloatingParticles: React.FC = () => {
    const points = useRef<THREE.Points>(null);

    const [positions, colors] = useMemo(() => {
        const count = 600;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 80;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
            // Cyan / teal / white tones
            const hue = 0.5 + Math.random() * 0.15;
            const c = new THREE.Color().setHSL(hue, 0.9, 0.7);
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        return [pos, col];
    }, []);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.getElapsedTime() * 0.015;
            points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.008) * 0.05;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
            />
        </points>
    );
};

// Glowing grid plane
const HolographicGrid: React.FC = () => {
    const gridRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (gridRef.current) {
            const mat = gridRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.04 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
        }
    });

    return (
        <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[100, 100, 40, 40]} />
            <meshBasicMaterial
                color={new THREE.Color(0x00ffff)}
                wireframe
                transparent
                opacity={0.05}
            />
        </mesh>
    );
};


export const ProjectSceneBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => {
    return (
        <>
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 5, 0]} intensity={2} color={accentColor} distance={30} />
            <pointLight position={[15, -5, -10]} intensity={0.5} color="#4455ff" distance={50} />

            {/* Starfield */}
            <Stars radius={120} depth={60} count={8000} factor={6} saturation={0} fade speed={1} />

            <FloatingParticles />
            <HolographicGrid />
        </>
    );
};
