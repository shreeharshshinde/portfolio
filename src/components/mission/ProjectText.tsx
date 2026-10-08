import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectTextProps {
    title: string;
    color: string;
}

export const ProjectText: React.FC<ProjectTextProps> = ({ title, color }) => {
    const textRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (textRef.current) {
            // Subtle rotation floating effect
            textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Center>
                <Text3D
                    ref={textRef}
                    font="https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_bold.typeface.json"
                    size={3}
                    height={0.6}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.05}
                    bevelSize={0.03}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    {title.toUpperCase()}
                    {/* Solid metallic material without excessive glow */}
                    <meshStandardMaterial 
                        color={color} 
                        emissive={color} 
                        emissiveIntensity={0.2} 
                        metalness={0.6} 
                        roughness={0.4} 
                    />
                </Text3D>
            </Center>
        </Float>
    );
};
