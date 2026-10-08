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
                    height={0.4}
                    curveSegments={32} // High resolution curves
                    bevelEnabled
                    bevelThickness={0.06}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={8} // High resolution bevels
                >
                    {title.toUpperCase()}
                    {/* Stylish Frosted Tech Glass Material - Brightened */}
                    <meshPhysicalMaterial 
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.3} // Increased for a brighter tint
                        transmission={0.7} // Lowered slightly so the base color shows stronger
                        opacity={1}
                        metalness={0.1}
                        roughness={0.15}
                        ior={1.5}
                        thickness={2.0}
                        clearcoat={1.0}
                        clearcoatRoughness={0.1}
                        attenuationColor={color} // Deepens the color inside the glass
                        attenuationDistance={0.5} // Makes the internal color more saturated
                    />
                </Text3D>
            </Center>
        </Float>
    );
};
